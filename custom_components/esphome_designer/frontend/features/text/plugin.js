import { wordWrap, parseColorMarkup, evaluateTemplatePreview } from '../../js/utils/text_utils.js';

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    el.innerHTML = "";
    el.style.display = "flex";
    el.style.flexDirection = "column";
    el.style.overflow = "visible"; // Ensure widget frame doesn't clip

    const textRaw = props.text || props.value || widget.title || "Text";
    // Evaluate template for designer preview
    const text = evaluateTemplatePreview(textRaw, window.AppState?.entityStates);

    const fontSize = props.font_size || 20;
    const fontFamily = props.font_family || "Roboto";
    const textAlign = props.text_align || "TOP_LEFT";

    // Handle template colors in preview
    let effectiveColor = props.color || "black";
    if (typeof effectiveColor === 'string' && effectiveColor.includes('{{')) {
        effectiveColor = 'black';
    }

    const body = document.createElement("div");
    body.style.fontSize = `${fontSize}px`;
    body.style.fontFamily = `${fontFamily}, sans-serif`;
    body.style.fontWeight = String(props.font_weight || 400);
    body.style.fontStyle = props.italic ? "italic" : "normal";
    body.style.whiteSpace = "pre-wrap"; // Preserve line breaks in preview
    body.style.width = "100%";
    body.style.minHeight = "100%";
    body.style.display = "flex";
    body.style.flexDirection = "column";
    body.style.overflow = "visible"; // Ensure inner body doesn't clip
    body.style.flexShrink = "0";

    // Set alignment
    if (textAlign.includes("CENTER")) body.style.alignItems = "center";
    else if (textAlign.includes("RIGHT")) body.style.alignItems = "flex-end";
    else body.style.alignItems = "flex-start";

    if (textAlign.startsWith("CENTER")) body.style.justifyContent = "center";
    else if (textAlign.startsWith("BOTTOM")) body.style.justifyContent = "flex-end";
    else body.style.justifyContent = "flex-start";

    // Text alignment
    if (textAlign.includes("CENTER")) body.style.textAlign = "center";
    else if (textAlign.includes("RIGHT")) body.style.textAlign = "right";
    else body.style.textAlign = "left";

    // Check if we should parse colors
    const shouldParseColors = !!props.parse_colors;

    // Calculate wrapping
    const maxWidth = widget.width || 200;
    const wrappedLines = shouldParseColors ? wordWrap(text, maxWidth, fontSize, fontFamily) : text.split("\n");

    if (shouldParseColors) {
        wrappedLines.forEach((line, i) => {
            if (i > 0) body.appendChild(document.createTextNode("\n"));
            body.appendChild(parseColorMarkup(line, effectiveColor, getColorStyle));
        });
    } else {
        const span = document.createElement("span");
        span.style.color = getColorStyle(effectiveColor);
        span.textContent = wrappedLines.join('\n');
        body.appendChild(span);
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
