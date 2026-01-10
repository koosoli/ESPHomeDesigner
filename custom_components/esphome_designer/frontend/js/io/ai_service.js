class AIService {
    constructor() {
        this.cache = {
            models: {}
        };
    }

    getSettings() {
        return window.AppState.settings;
    }

    async fetchModels(provider, apiKey) {
        if (!apiKey) return [];

        try {
            if (provider === 'openrouter') {
                const response = await fetch('https://openrouter.ai/api/v1/models', {
                    headers: { 'Authorization': `Bearer ${apiKey}` }
                });
                const data = await response.json();
                return data.data.map(m => ({ id: m.id, name: m.name, context: m.context_length }));
            } else if (provider === 'openai') {
                const response = await fetch('https://api.openai.com/v1/models', {
                    headers: { 'Authorization': `Bearer ${apiKey}` }
                });
                const data = await response.json();
                return data.data.filter(m => m.id.startsWith('gpt-')).map(m => ({ id: m.id, name: m.id }));
            } else if (provider === 'gemini') {
                try {
                    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
                    const data = await response.json();
                    if (data.models && Array.isArray(data.models)) {
                        return data.models
                            .filter(m => m.supportedGenerationMethods.includes('generateContent'))
                            .map(m => ({
                                id: m.name.replace('models/', ''),
                                name: m.displayName || m.name.replace('models/', ''),
                                description: m.description
                            }));
                    }
                } catch (geminiError) {
                    Logger.warn("Dynamic Gemini model fetch failed:", geminiError);
                    throw new Error("Failed to fetch Gemini models. Check your API key.");
                }

                return [];
            }
        } catch (e) {
            Logger.error(`Error fetching models for ${provider}:`, e);
            throw e;
        }
        return [];
    }

    async processPrompt(prompt, context) {
        const settings = this.getSettings();
        const provider = settings.ai_provider;
        const apiKey = settings[`ai_api_key_${provider}`];
        const model = settings[`ai_model_${provider}`];

        if (!apiKey) throw new Error(`Missing API Key for ${provider}`);
        if (!model && provider !== 'gemini') throw new Error(`No model selected for ${provider}`);

        const systemPrompt = this.getSystemPrompt();
        const userPrompt = `
Current Layout Context:
${JSON.stringify(context, null, 2)}

User Request:
${prompt}

Respond ONLY with valid JSON containing the updated "widgets" array for the current page. Do not include any explanation.
`.trim();

        try {
            let responseText = "";
            if (provider === 'gemini') {
                responseText = await this.callGemini(apiKey, model, systemPrompt, userPrompt);
            } else if (provider === 'openai') {
                responseText = await this.callOpenAI(apiKey, model, systemPrompt, userPrompt);
            } else if (provider === 'openrouter') {
                responseText = await this.callOpenRouter(apiKey, model, systemPrompt, userPrompt);
            }

            // Improved JSON extraction
            let jsonText = responseText.trim();

            // 1. Remove markdown code blocks if present
            if (jsonText.includes('```')) {
                const matches = jsonText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
                if (matches && matches[1]) {
                    jsonText = matches[1].trim();
                }
            }

            // 2. Try to find the first [ and last ] or first { and last }
            const firstBracket = jsonText.indexOf('[');
            const firstBrace = jsonText.indexOf('{');
            let start = -1;
            let end = -1;

            if (firstBracket !== -1 && (firstBrace === -1 || firstBracket < firstBrace)) {
                start = firstBracket;
                end = jsonText.lastIndexOf(']');
            } else if (firstBrace !== -1) {
                start = firstBrace;
                end = jsonText.lastIndexOf('}');
            }

            if (start !== -1 && end !== -1 && end > start) {
                jsonText = jsonText.substring(start, end + 1);
            }

            try {
                const parsed = JSON.parse(jsonText);
                return Array.isArray(parsed) ? parsed : (parsed.widgets || parsed);
            } catch (innerErr) {
                Logger.warn("Fast JSON parse failed, trying repair...", innerErr);
                try {
                    const repaired = this.repairJson(jsonText);
                    const parsed = JSON.parse(repaired);
                    return Array.isArray(parsed) ? parsed : (parsed.widgets || parsed);
                } catch (repairErr) {
                    Logger.error("JSON repair failed:", repairErr);
                    throw new Error("AI returned malformed JSON (possibly truncated). Try a shorter prompt or a more powerful model.");
                }
            }
        } catch (e) {
            Logger.error("AI processing failed:", e);
            throw e;
        }
    }

    async callGemini(apiKey, model, system, user) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const body = {
            contents: [{
                role: "user",
                parts: [{ text: system + "\n\n" + user }]
            }],
            generationConfig: {
                temperature: 0.1, // Lower temperature for more consistent JSON
                topP: 0.95,
                topK: 40,
                maxOutputTokens: 8192,
                responseMimeType: "application/json"
            }
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        return data.candidates[0].content.parts[0].text;
    }

    async callOpenAI(apiKey, model, system, user) {
        // Check if this is a GPT-5 model (uses newer API features)
        const isGpt5 = model && model.toLowerCase().includes('gpt-5');

        // GPT-5 and newer models support json_schema, older models use json_object
        const responseFormat = isGpt5
            ? {
                type: "json_schema",
                json_schema: {
                    name: "widget_layout",
                    strict: true,
                    schema: {
                        type: "object",
                        properties: {
                            widgets: {
                                type: "array",
                                items: { type: "object" }
                            }
                        },
                        required: ["widgets"],
                        additionalProperties: false
                    }
                }
            }
            : { type: "json_object" };

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    { role: "system", content: system },
                    { role: "user", content: user }
                ],
                temperature: 0.1,
                max_tokens: 8192,
                response_format: responseFormat
            })
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        return data.choices[0].message.content;
    }

    async callOpenRouter(apiKey, model, system, user) {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    { role: "system", content: system },
                    { role: "user", content: user }
                ],
                temperature: 0.1,
                max_tokens: 4096
            })
        });
        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        return data.choices[0].message.content;
    }

    getSystemPrompt() {
        return `
You are an expert UI designer and developer for ESPHome devices. 
Your task is to modify or create a widget list based on user instructions.

WIDGET TYPES & PROPS:
- text: { x, y, width, height, text, font_size, font_family, font_weight (400 or 700), color, align }
- sensor_text: { x, y, width, height, entity, prefix, suffix, font_size, color }
- datetime: { x, y, width, height, format, time_font_size, date_font_size, color }
- weather_forecast: { x, y, width, height, entity, layout ("horizontal"/"vertical"), icon_size, temp_font_size, day_font_size }
- weather_icon: { x, y, width, height, entity, size, color }
- icon: { x, y, width, height, icon, icon_size, color }
- battery_icon: { x, y, width, height, entity, color }
- progress_bar: { x, y, width, height, color, bar_height }
- graph: { x, y, width, height, entity, color, duration }
- shape_rect / rounded_rect / shape_circle: { x, y, width, height, color, fill (bool), border_width, opacity }
- lvgl_*: Advanced widgets (lvgl_button, lvgl_switch, lvgl_slider, lvgl_arc, etc).

STRICT OPERATIONAL RULES:
1. CONTENT ACCURACY: If the user says "reads 'X'", the 'text' property MUST BE "X". NEVER use generic placeholders like "Text".
2. TYPOGRAPHY: "Bold" = font_weight: 700. "Normal/Regular" = font_weight: 400. "Large" = font_size: 28+.
3. VISUAL HIERARCHY: Use 'shape_rect' or 'rounded_rect' to create headers, footers, or background cards for groups of widgets. Use small thin shapes as dividers.
4. UNIQUE IDS: Every new widget MUST have a unique ID like "w_" + timestamp or a short descriptive string. Never leave ID as null or undefined.
5. CANVAS BOUNDS: Stay within ${JSON.stringify(window.AppState.getCanvasDimensions())}.
6. COLOR USAGE: Check "display_type" in context:
   - "monochrome": Use ONLY "black" or "white". No grays, no colors.
   - "color_epaper": Use limited palette: black, white, red, green, blue, yellow, orange. No gradients.
   - "color_lcd": Full RGB colors allowed. Use hex codes like "#FF5722" or CSS names.
7. LVGL WIDGETS: If "display_type" is "monochrome" or "color_epaper", do NOT use lvgl_* widgets unless the user explicitly requests LVGL. Use standard widgets (text, shape_rect, icon, etc.) instead. LVGL is designed for LCDs with fast refresh.

FEW-SHOT EXAMPLE:
User: "Add a large bold title that reads 'Home Status' at the top with a separator line."
Response: [
  {"id": "w_title", "type": "text", "x": 20, "y": 10, "width": 760, "height": 50, "text": "Home Status", "font_size": 32, "font_weight": 700, "align": "CENTER"},
  {"id": "w_sep", "type": "shape_rect", "x": 20, "y": 65, "width": 760, "height": 2, "color": "black", "fill": true}
]

DESIGN GOAL: Create "Beautiful" layouts. Use whitespace, professional alignment, and decorative shapes to make the UI look premium.
`.trim();
    }

    /**
     * Minimal recursive JSON repair for truncated strings
     */
    repairJson(json) {
        let stack = [];
        let inString = false;
        let escaped = false;

        for (let i = 0; i < json.length; i++) {
            const char = json[i];

            if (escaped) {
                escaped = false;
                continue;
            }

            if (char === '\\') {
                escaped = true;
                continue;
            }

            if (char === '"') {
                inString = !inString;
                continue;
            }

            if (!inString) {
                if (char === '[' || char === '{') {
                    stack.push(char === '[' ? ']' : '}');
                } else if (char === ']' || char === '}') {
                    if (stack.length > 0 && stack[stack.length - 1] === char) {
                        stack.pop();
                    }
                }
            }
        }

        let repaired = json;
        if (inString) repaired += '"';

        // Remove trailing commas before closing
        repaired = repaired.trim().replace(/,\s*$/, '');

        while (stack.length > 0) {
            repaired += stack.pop();
        }

        return repaired;
    }
}

window.aiService = new AIService();
