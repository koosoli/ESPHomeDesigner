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

    // Apply word-wrap based on widget width
    const wrappedLines = wordWrap(text, widget.width || 200, fontSize, fontFamily);

    const body = document.createElement("div");
    body.style.color = getColorStyle(props.color);
    body.style.fontSize = `${fontSize}px`;
    body.style.fontFamily = fontFamily + ", sans-serif";
    body.style.fontWeight = String(props.font_weight || 400);
    body.style.fontStyle = props.italic ? "italic" : "normal";
    body.style.whiteSpace = "pre-wrap"; // Preserve line breaks in preview
    body.style.lineHeight = `${fontSize + 4}px`;
    body.style.wordBreak = "break-word";
    body.style.overflowWrap = "break-word";
    body.textContent = wrappedLines.join('\n');

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

        // Single line - use draw_text
        return {
            type: "draw_text",
            x: Math.round(w.x),
            y: Math.round(w.y),
            text: text,
            size: fontSize,
            color: color,
            font: fontFamily?.toLowerCase() || "roboto"
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
            anchor: "lt" // Start with left-top for simplicity
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
