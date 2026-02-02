/**
 * Text / Label Plugin
 */

/**
 * Word-wrap text to fit within a given width
 * @param {string} text - The text to wrap
 * @param {number} maxWidth - Maximum width in pixels
 * @param {number} fontSize - Font size in pixels
 * @param {string} fontFamily - Font family name
 * @returns {string[]} Array of wrapped lines
 */
const wordWrap = (text, maxWidth, fontSize, fontFamily = "Roboto") => {
    // Estimate average character width based on font
    // Proportional fonts (Roboto, etc.): ~0.5-0.55 of font size
    // Monospace fonts: ~0.6 of font size
    const isMonospace = fontFamily.toLowerCase().includes("mono") ||
        fontFamily.toLowerCase().includes("courier") ||
        fontFamily.toLowerCase().includes("consolas");
    const avgCharWidth = fontSize * (isMonospace ? 0.6 : 0.52);
    const maxCharsPerLine = Math.floor(maxWidth / avgCharWidth);

    if (maxCharsPerLine <= 0) return [text];

    const result = [];

    // First split by manual line breaks
    const paragraphs = text.split('\n');

    for (const paragraph of paragraphs) {
        if (paragraph.length <= maxCharsPerLine) {
            result.push(paragraph);
            continue;
        }

        // Word wrap this paragraph
        const words = paragraph.split(/\s+/);
        let currentLine = "";

        for (const word of words) {
            if (!word) continue;

            // If word itself is longer than max, we need to break it
            if (word.length > maxCharsPerLine) {
                // Push current line if any
                if (currentLine) {
                    result.push(currentLine.trim());
                    currentLine = "";
                }
                // Break long word into chunks
                for (let i = 0; i < word.length; i += maxCharsPerLine) {
                    result.push(word.substring(i, i + maxCharsPerLine));
                }
                continue;
            }

            // Check if adding this word exceeds the limit
            const testLine = currentLine ? currentLine + " " + word : word;
            if (testLine.length <= maxCharsPerLine) {
                currentLine = testLine;
            } else {
                // Push current line and start new one
                if (currentLine) {
                    result.push(currentLine.trim());
                }
                currentLine = word;
            }
        }

        // Push remaining text
        if (currentLine) {
            result.push(currentLine.trim());
        }
    }

    return result.length > 0 ? result : [""];
};

// Helper to parse color tags: "Text [red]Color[/red]" -> HTML
const parseColorMarkup = (text, defaultColor, getColorStyle) => {
    // Escape HTML first to prevent injection, but we'll rebuild it safely
    // simple parse: split by tags
    // Updated to allow complex HA templates inside tags, e.g. [{{ ... }}]
    const parts = text.split(/(\[\/?[^\]]+\])/g);
    const root = document.createDocumentFragment();

    // Stack to keep track of colors. Start with default.
    const colorStack = [defaultColor];

    parts.forEach(part => {
        if (!part) return;

        // Check if closing tag [/color] - actually we just pop the stack for any closing tag 
        // assuming well-formed or simple nesting
        if (part.startsWith("[/") && part.endsWith("]")) {
            if (colorStack.length > 1) colorStack.pop();
            return;
        }

        // Check if opening tag [color]
        if (part.startsWith("[") && part.endsWith("]")) {
            const colorName = part.substring(1, part.length - 1);
            // Check if it looks like a color (or accent)
            // We'll accept anything as a potential color key, or just raw hex
            // Special handling for HA templates inside tags? The user example showed:
            // [{{ ... }}] - The regex above might not catch complex templates perfectly 
            // if they contain spaces, but standard [red] is caught.
            // For simple visualization, we support basic standard colors
            colorStack.push(colorName);
            return;
        }

        // It's text
        const span = document.createElement("span");
        let currentColor = colorStack[colorStack.length - 1];

        // Handle "accent" mapping if needed, or valid CSS colors
        if (currentColor === 'accent') currentColor = 'red'; // Default accent preview

        // Resolve color using getColorStyle if it's a known theme color, or pass through
        // getColorStyle usually handles palette keys. If raw hex or string, it might return default.
        // We'll try to set color directly if it looks like a color.

        let cssColor = getColorStyle(currentColor);
        // If getColorStyle returns default black/white for unknown strings but we have "red",
        // we want actual red.
        if (["red", "yellow", "blue", "green", "orange", "purple", "gray", "grey"].includes(currentColor)) {
            cssColor = currentColor;
        } else if (currentColor.startsWith("#")) {
            cssColor = currentColor;
        }

        span.style.color = cssColor;
        span.textContent = part;
        root.appendChild(span);
    });

    return root;
};

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    el.innerHTML = "";
    el.style.display = "flex";

    const applyAlign = (align, element = el) => {
        if (!align) return;
        if (align.includes("LEFT")) element.style.justifyContent = "flex-start";
        else if (align.includes("RIGHT")) element.style.justifyContent = "flex-end";
        else element.style.justifyContent = "center";

        if (align.includes("TOP")) element.style.alignItems = "flex-start";
        else if (align.includes("BOTTOM")) element.style.alignItems = "flex-end";
        else element.style.alignItems = "center";
    };

    applyAlign(props.text_align || "TOP_LEFT");

    const fontSize = props.font_size || props.value_font_size || 20;
    const fontFamily = props.font_family || "Roboto";
    const text = props.text || widget.title || "Text";

    // Check if we should parse colors
    const shouldParseColors = !!props.parse_colors;

    // Apply word-wrap based on widget width
    const wrappedLines = wordWrap(text, widget.width || 200, fontSize, fontFamily);

    const body = document.createElement("div");
    // body.style.color = getColorStyle(props.color); // Done via spans if parsing
    const baseColor = getColorStyle(props.color);
    body.style.color = baseColor;

    body.style.fontSize = `${fontSize}px`;
    body.style.fontFamily = fontFamily + ", sans-serif";
    body.style.fontWeight = String(props.font_weight || 400);
    body.style.fontStyle = props.italic ? "italic" : "normal";
    body.style.whiteSpace = "pre-wrap"; // Preserve line breaks in preview
    body.style.lineHeight = `${fontSize + 4}px`;
    body.style.wordBreak = "break-word";
    body.style.overflowWrap = "break-word";

    if (shouldParseColors) {
        // Render each line with parsing
        wrappedLines.forEach((line, i) => {
            if (i > 0) body.appendChild(document.createTextNode("\n"));
            body.appendChild(parseColorMarkup(line, props.color || "black", getColorStyle));
        });
    } else {
        body.textContent = wrappedLines.join('\n');
    }

    el.appendChild(body);
};

const exportLVGL = (w, { common, convertColor, convertAlign, getLVGLFont, formatOpacity }) => {
    const p = w.props || {};
    return {
        label: {
            ...common,
            text: `"${p.text || 'Text'}"`,
            text_font: getLVGLFont(p.font_family, p.font_size, p.font_weight, p.italic),
            text_color: convertColor(p.color || p.text_color),
            text_align: (convertAlign(p.text_align) || "left").replace("top_", "").replace("bottom_", ""),
            bg_color: p.bg_color === "transparent" ? undefined : convertColor(p.bg_color),
            opa: formatOpacity(p.opa)
        }
    };
};

export default {
    id: "text", // also used for 'label'
    name: "Text",
    category: "Core",
    supportedModes: ['lvgl', 'direct', 'oepl', 'opendisplay'],
    defaults: {
        text: "Text",
        font_size: 20,
        font_family: "Roboto",
        color: "theme_auto",
        font_weight: 400,
        italic: false,
        bpp: 1,
        text_align: "TOP_LEFT",
        bg_color: "transparent",
        opa: 255
    },
    render,
    exportOpenDisplay: (w, { layout, page }) => {
        const p = w.props || {};
        const text = p.text || w.title || "Text";
        const fontSize = p.font_size || 20;
        const fontFamily = p.font_family || "Roboto";

        // Convert theme_auto and internal colors to actual colors
        let color = p.color || "black";
        if (color === "theme_auto") {
            color = layout?.darkMode ? "white" : "black";
        }

        // Check if text needs word wrapping based on widget width
        const wrappedLines = wordWrap(text, w.width || 200, fontSize, fontFamily);

        // If multiple lines, use multiline type with \n delimiter
        if (wrappedLines.length > 1) {
            return {
                type: "multiline",
                value: wrappedLines.join('\n'),
                delimiter: "\n",
                x: Math.round(w.x),
                offset_y: fontSize + 5, // Line height
                size: fontSize,
                color: color,
                font: fontFamily?.includes("Mono") ? "mononoki.ttf" : "ppb.ttf"
            };
        }

        // Single line - use text
        return {
            type: "text",
            x: Math.round(w.x),
            y: Math.round(w.y),
            value: text,
            size: fontSize,
            color: color,
            font: fontFamily?.includes("Mono") ? "mononoki.ttf" : "ppb.ttf",
            parse_colors: !!p.parse_colors
        };
    },
    exportLVGL,
    exportOEPL: (w, { layout, page }) => {
        const p = w.props || {};
        const text = p.text || w.title || "Text";
        const fontSize = p.font_size || 20;
        const lineSpacing = 5; // Default spacing between lines

        // Convert theme_auto and internal colors to actual colors
        let color = p.color || "black";
        if (color === "theme_auto") {
            color = layout?.darkMode ? "white" : "black";
        }

        // OEPL supports max_width for automatic text wrapping
        // and \n characters for explicit line breaks
        const result = {
            type: "text",
            value: text, // OEPL handles \n natively when max_width is set
            x: Math.round(w.x),
            y: Math.round(w.y),
            size: fontSize,
            font: p.font_family?.includes("Mono") ? "mononoki.ttf" : "ppb.ttf",
            color: color,
            align: (p.text_align || "TOP_LEFT").toLowerCase().replace("top_", "").replace("bottom_", "").replace("_", ""),
            anchor: "lt", // Start with left-top for simplicity
            parse_colors: !!p.parse_colors
        };

        // Add max_width for automatic text wrapping when widget has width
        if (w.width && w.width > 0) {
            result.max_width = Math.round(w.width);
            result.spacing = lineSpacing; // Line spacing for wrapped text
        }

        return result;
    },
    export: (w, context) => {
        const {
            lines, getColorConst, addFont, getAlignX, getAlignY, getCondProps, getConditionCheck, Utils, isEpaper
        } = context;

        const p = w.props || {};
        const colorProp = p.color || "theme_auto";
        const fontSize = p.font_size || p.value_font_size || 20;
        const fontFamily = p.font_family || "Roboto";
        const fontId = addFont(fontFamily, p.font_weight || 400, fontSize, p.italic);
        const text = p.text || w.title || "Text";
        const textAlign = p.text_align || "TOP_LEFT";

        // Check if gray text on e-paper - use dithering
        const isGrayOnEpaper = isEpaper && Utils && Utils.isGrayColor && Utils.isGrayColor(colorProp);
        const color = isGrayOnEpaper ? "COLOR_BLACK" : getColorConst(colorProp);

        // Sanitize text for comment (replace newlines to prevent YAML breakage)
        const safeText = text.replace(/[\r\n]+/g, '\\n');
        lines.push(`        // widget:text id:${w.id} type:text x:${w.x} y:${w.y} w:${w.width} h:${w.height} text:"${safeText.substring(0, 50)}${safeText.length > 50 ? '...' : ''}" ${getCondProps(w)}`);

        const cond = getConditionCheck(w);
        if (cond) lines.push(`        ${cond}`);

        // Handle simple alignment for printf
        let x = w.x;
        let y = w.y;
        let align = "TextAlign::TOP_LEFT";

        if (textAlign.includes("CENTER")) {
            x = Math.round(w.x + w.width / 2);
            align = "TextAlign::TOP_CENTER";
        } else if (textAlign.includes("RIGHT")) {
            x = Math.round(w.x + w.width);
            align = "TextAlign::TOP_RIGHT";
        }

        if (textAlign.includes("BOTTOM")) {
            y = Math.round(w.y + w.height);
            align = align.replace("TOP_", "BOTTOM_");
        } else if (!textAlign.includes("TOP")) {
            // V-Center
            y = Math.round(w.y + w.height / 2);
            align = align.replace("TOP_", "CENTER_");
        }

        if (align === "TextAlign::CENTER_CENTER") align = "TextAlign::CENTER";

        // Apply word-wrap based on widget width
        const wrappedLines = wordWrap(text, w.width || 200, fontSize, fontFamily);
        const lineHeight = fontSize + 4; // Font size plus line spacing

        // Output each wrapped line
        let currentY = y;
        for (const line of wrappedLines) {
            const escapedLine = line.replace(/"/g, '\\"').replace(/%/g, '%%');
            lines.push(`        it.printf(${x}, ${currentY}, id(${fontId}), ${color}, ${align}, "${escapedLine}");`);
            currentY += lineHeight;
        }

        // Apply dithering for gray text on e-paper
        if (isGrayOnEpaper) {
            lines.push(`        apply_grey_dither_to_text(${w.x}, ${w.y}, ${w.width}, ${w.height});`);
        }

        if (cond) lines.push(`        }`);
    }
};
