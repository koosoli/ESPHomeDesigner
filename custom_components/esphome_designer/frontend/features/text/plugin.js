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
    // Fix #268: Robust alignment for preview (Flex Column: alignItems=Horizontal, justifyContent=Vertical)

    // Horizontal Alignment (Cross Axis)
    if (textAlign.includes("RIGHT")) {
        body.style.alignItems = "flex-end";
        body.style.textAlign = "right";
    } else if (textAlign.includes("LEFT")) {
        body.style.alignItems = "flex-start";
        body.style.textAlign = "left";
    } else {
        // CENTER, TOP_CENTER, BOTTOM_CENTER
        body.style.alignItems = "center";
        body.style.textAlign = "center";
    }

    // Vertical Alignment (Main Axis)
    if (textAlign.includes("BOTTOM")) {
        body.style.justifyContent = "flex-end";
    } else if (textAlign.includes("TOP")) {
        body.style.justifyContent = "flex-start";
    } else {
        // CENTER_*, or just CENTER
        body.style.justifyContent = "center";
    }

    // Check if we should parse colors
    const shouldParseColors = !!props.parse_colors;

    // Calculate wrapping
    const maxWidth = widget.width || 200;
    const wrappedLines = shouldParseColors ? wordWrap(text, maxWidth, fontSize, fontFamily) : text.split("\n");

    // Apply Border & Background
    const borderWidth = props.border_width !== undefined ? props.border_width : 0;
    const hasBackground = props.fill || (props.bg_color && props.bg_color !== "transparent") || (props.background_color && props.background_color !== "transparent");

    if (borderWidth > 0 || hasBackground) {
        // Resolve theme colors manually
        const borderColorProp = props.border_color || "black";
        let resolvedBorderColor = borderColorProp;
        if (borderColorProp === "theme_auto") {
            resolvedBorderColor = (window.AppState?.settings?.darkMode) ? "white" : "black";
        }

        if (borderWidth > 0) {
            body.style.border = `${borderWidth}px solid ${getColorStyle(resolvedBorderColor)}`;
        }

        if (hasBackground) {
            const bgCol = props.background_color || props.bg_color || (props.fill ? (props.color || "white") : "transparent");
            body.style.backgroundColor = getColorStyle(bgCol);
        }

        body.style.borderRadius = `${props.border_radius || 0}px`;
        body.style.boxSizing = "border-box"; // Include border in width/height
    }

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

    // Fix #268: Properly map composite alignments to valid LVGL text_align (LEFT/CENTER/RIGHT)
    let textAlign = "left";
    const rawAlign = p.text_align || "TOP_LEFT";

    if (rawAlign.includes("RIGHT")) {
        textAlign = "right";
    } else if (rawAlign.includes("CENTER") && !rawAlign.includes("LEFT")) {
        // "CENTER_RIGHT" -> right (caught above), "CENTER_LEFT" -> left (default), "CENTER" -> center
        // "TOP_CENTER", "BOTTOM_CENTER" -> center
        textAlign = "center";
    }

    return {
        label: {
            ...common,
            text: `"${p.text || 'Text'}"`,
            text_font: getLVGLFont(p.font_family, p.font_size, p.font_weight, p.italic),
            text_color: convertColor(p.color || p.text_color),
            text_align: textAlign,
            bg_color: p.bg_color === "transparent" ? undefined : convertColor(p.bg_color),
            opa: formatOpacity(p.opa),
            border_width: p.border_width || 0,
            border_color: convertColor(p.border_color || "black"),
            border_side: (p.border_width > 0) ? "full" : "none",
            radius: p.border_radius || 0
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
        opa: 255,
        border_width: 0,
        border_color: "black",
        border_radius: 0
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

        // Mapping for alignment to ODP anchor
        const alignMap = {
            "TOP_LEFT": "lt", "TOP_CENTER": "ct", "TOP_RIGHT": "rt",
            "CENTER_LEFT": "lm", "CENTER_CENTER": "cm", "CENTER_RIGHT": "rm",
            "BOTTOM_LEFT": "lb", "BOTTOM_CENTER": "cb", "BOTTOM_RIGHT": "rb"
        };
        const anchor = alignMap[p.text_align] || "lt";

        // Check if text needs word wrapping based on widget width
        const wrappedLines = wordWrap(text, w.width || 200, fontSize, fontFamily);

        // If multiple lines, use multiline type with \n delimiter
        if (wrappedLines.length > 1) {
            return {
                type: "multiline",
                value: wrappedLines.join('\n'),
                delimiter: "\n",
                x: Math.round(w.x),
                y: Math.round(w.y),
                offset_y: fontSize + 5,
                size: fontSize,
                color: (color === "theme_auto") ? (layout?.darkMode ? "white" : "black") : color,
                font: fontFamily?.includes("Mono") ? "mononoki.ttf" : "ppb.ttf"
            };
        }

        // Single line - use text
        const result = {
            type: "text",
            x: Math.round(w.x),
            y: Math.round(w.y),
            value: text,
            size: fontSize,
            color: color,
            anchor: anchor,
            font: fontFamily?.includes("Mono") ? "mononoki.ttf" : "ppb.ttf",
            parse_colors: !!p.parse_colors
        };

        if (w.width > 0) {
            result.max_width = Math.round(w.width);
            result.spacing = 5;
        }

        return result;
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
        lines.push(`        // widget:text id:${w.id} type:text x:${w.x} y:${w.y} w:${w.width} h:${w.height} align:${textAlign} text:"${safeText.substring(0, 50)}${safeText.length > 50 ? '...' : ''}" ${getCondProps(w)}`);

        const cond = getConditionCheck(w);
        if (cond) lines.push(`        ${cond}`);

        // Robust alignment logic (Fix #268)
        let x = w.x;
        let y = w.y;

        // Background fill
        const bgColorProp = p.bg_color || p.background_color || "transparent";
        if (bgColorProp && bgColorProp !== "transparent") {
            const bgColorConst = getColorConst(bgColorProp);
            lines.push(`        it.filled_rectangle(${w.x}, ${w.y}, ${w.width}, ${w.height}, ${bgColorConst});`);
        }

        // Horizontal Component
        let alignH = "LEFT";
        if (textAlign.includes("RIGHT")) {
            x = Math.round(w.x + w.width);
            alignH = "RIGHT";
        } else if (textAlign.endsWith("CENTER") || textAlign === "CENTER") {
            // "TOP_CENTER", "BOTTOM_CENTER" or just "CENTER"
            x = Math.round(w.x + w.width / 2);
            alignH = "CENTER";
        }

        // Vertical Component
        let alignV = "TOP";
        if (textAlign.includes("BOTTOM")) {
            y = Math.round(w.y + w.height);
            alignV = "BOTTOM";
        } else if (textAlign.startsWith("CENTER") || textAlign === "CENTER") {
            // "CENTER_LEFT", "CENTER_RIGHT" or just "CENTER"
            y = Math.round(w.y + w.height / 2);
            alignV = "CENTER";
        }

        // Construct ESPHome Enum
        let esphomeAlign = `TextAlign::${alignV}_${alignH}`;
        if (esphomeAlign === "TextAlign::CENTER_CENTER") esphomeAlign = "TextAlign::CENTER";

        // Apply word-wrap based on widget width (skip for narrow widgets where wrapping is nonsensical)
        const effectiveWidth = w.width || 200;
        const wrappedLines = effectiveWidth >= fontSize * 3 ? wordWrap(text, effectiveWidth, fontSize, fontFamily) : [text];
        const lineHeight = fontSize + 4; // Font size plus line spacing

        // Output each wrapped line
        let currentY = y;
        for (const line of wrappedLines) {
            const escapedLine = line.replace(/"/g, '\\"').replace(/%/g, '%%');
            lines.push(`        it.printf(${x}, ${currentY}, id(${fontId}), ${color}, ${esphomeAlign}, "${escapedLine}");`);
            currentY += lineHeight;
        }

        // Apply dithering for gray text on e-paper
        if (isGrayOnEpaper) {
            lines.push(`        apply_grey_dither_to_text(${w.x}, ${w.y}, ${w.width}, ${w.height});`);
        }

        // Draw Border if defined
        const borderWidth = p.border_width || 0;
        if (borderWidth > 0) {
            const borderColor = getColorConst(p.border_color || "black");
            for (let i = 0; i < borderWidth; i++) {
                lines.push(`        it.rectangle(${w.x} + ${i}, ${w.y} + ${i}, ${w.width} - 2 * ${i}, ${w.height} - 2 * ${i}, ${borderColor});`);
            }
        }

        if (cond) lines.push(`        }`);
    }
};
