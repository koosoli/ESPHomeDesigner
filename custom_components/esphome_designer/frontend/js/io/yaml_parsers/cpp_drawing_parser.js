/**
 * @typedef {{
 *   id: string,
 *   type: string,
 *   x: number,
 *   y: number,
 *   width: number,
 *   height: number,
 *   title: string,
 *   entity_id: string,
 *   props: Record<string, any>
 * }} ParsedDrawingWidget
 */

/**
 * @param {string} argsText
 * @returns {string[]}
 */
function splitTopLevelArgs(argsText) {
    const args = [];
    let current = "";
    let depth = 0;
    let quote = "";
    let escaped = false;

    for (const char of argsText) {
        if (escaped) {
            current += char;
            escaped = false;
            continue;
        }

        if (quote) {
            current += char;
            if (char === "\\") escaped = true;
            else if (char === quote) quote = "";
            continue;
        }

        if (char === '"' || char === "'") {
            quote = char;
            current += char;
            continue;
        }

        if (char === "(" || char === "<" || char === "[") depth += 1;
        if (char === ")" || char === ">" || char === "]") depth = Math.max(0, depth - 1);

        if (char === "," && depth === 0) {
            args.push(current.trim());
            current = "";
            continue;
        }

        current += char;
    }

    if (current.trim()) args.push(current.trim());
    return args;
}

/**
 * @param {string | undefined} raw
 * @returns {string}
 */
function unquote(raw) {
    return String(raw || "").trim().replace(/^["']|["']$/g, "");
}

/**
 * @param {string} fontArg
 * @returns {{ family: string, size: number }}
 */
function parseFontArg(fontArg) {
    const idMatch = fontArg.match(/id\(\s*([^)]+?)\s*\)/);
    const fontId = idMatch ? idMatch[1].trim() : "";
    const sizeMatch = fontId.match(/_(\d+)$/);
    const size = sizeMatch ? parseInt(sizeMatch[1], 10) : 20;
    const familyRaw = fontId.replace(/_\d+$/, "").replace(/^font_/, "").replace(/_/g, " ").trim();
    const family = familyRaw
        ? familyRaw.replace(/\b\w/g, (char) => char.toUpperCase())
        : "Roboto";

    return { family, size };
}

/**
 * @param {string} colorArg
 * @returns {string}
 */
function parseColorArg(colorArg) {
    const trimmed = colorArg.trim();
    const rgb = trimmed.match(/^Color\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/);
    if (rgb) {
        return "#" + [rgb[1], rgb[2], rgb[3]]
            .map((part) => Math.max(0, Math.min(255, parseInt(part, 10))).toString(16).padStart(2, "0"))
            .join("")
            .toUpperCase();
    }

    const named = trimmed.match(/^Color::([A-Z_]+)$/);
    if (named) {
        const name = named[1].toLowerCase();
        if (name === "white") return "white";
        if (name === "black") return "black";
        if (name === "red") return "red";
        if (name === "green") return "green";
        if (name === "blue") return "blue";
        if (name === "yellow") return "yellow";
    }

    return "black";
}

/**
 * @param {string | undefined} alignArg
 * @returns {string}
 */
function parseTextAlignArg(alignArg) {
    const align = String(alignArg || "").replace(/^TextAlign::/, "").trim().toUpperCase();
    if (align === "RIGHT") return "TOP_RIGHT";
    if (align === "CENTER") return "TOP_CENTER";
    if (align === "TOP_RIGHT" || align === "CENTER_RIGHT" || align === "BOTTOM_RIGHT") return align;
    if (align === "TOP_CENTER" || align === "CENTER" || align === "BOTTOM_CENTER") return align;
    if (align === "BOTTOM_LEFT" || align === "BOTTOM_RIGHT" || align === "BOTTOM_CENTER") return align;
    return "TOP_LEFT";
}

/**
 * Parses raw C++ drawing commands found in ESPHome lambdas.
 * This is a fallback for layouts that were generated or modified manually without widget markers.
 * 
 * @param {string} trimmed - The trimmed line of code
 * @param {number} widgetCount - Current number of widgets (used for ID generation)
 * @returns {ParsedDrawingWidget|null} - A widget object if matched, or null
 */
export function parseCppDrawingCommand(trimmed, widgetCount) {
    let m;

    m = trimmed.match(/^it\.print\((.*)\)\s*;?$/);
    if (m) {
        const args = splitTopLevelArgs(m[1]);
        if (args.length >= 4) {
            const x = parseInt(args[0], 10);
            const y = parseInt(args[1], 10);
            const font = parseFontArg(args[2]);
            let color = "black";
            let align = "TOP_LEFT";
            let textArg = args[3];

            if (args.length >= 6) {
                color = parseColorArg(args[3]);
                align = parseTextAlignArg(args[4]);
                textArg = args[5];
            } else if (args.length >= 5) {
                color = parseColorArg(args[3]);
                textArg = args[4];
            }

            const text = unquote(textArg);
            if (!Number.isNaN(x) && !Number.isNaN(y) && text) {
                const width = Math.max(80, Math.ceil(text.length * font.size * 0.62));
                const height = Math.max(24, font.size + 8);
                return {
                    id: "w_text_" + widgetCount,
                    type: "text",
                    x,
                    y,
                    width,
                    height,
                    title: "",
                    entity_id: "",
                    props: {
                        text,
                        font_family: font.family,
                        font_size: font.size,
                        color,
                        text_align: align,
                        bg_color: "transparent",
                        opacity: 100
                    }
                };
            }
        }
    }

    m = trimmed.match(/^it\.rectangle\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*COLOR_OFF)?\s*\)\s*;?/);
    if (m) {
        return {
            id: "w_rect_" + widgetCount,
            type: "shape_rect",
            x: parseInt(m[1], 10),
            y: parseInt(m[2], 10),
            width: parseInt(m[3], 10),
            height: parseInt(m[4], 10),
            title: "",
            entity_id: "",
            props: { border_width: 1, bg_color: "transparent", border_color: "black", opacity: 100 }
        };
    }

    m = trimmed.match(/^it\.filled_rectangle\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*COLOR_OFF)?\s*\)\s*;?/);
    if (m) {
        return {
            id: "w_frect_" + widgetCount,
            type: "shape_rect",
            x: parseInt(m[1], 10),
            y: parseInt(m[2], 10),
            width: parseInt(m[3], 10),
            height: parseInt(m[4], 10),
            title: "",
            entity_id: "",
            props: { border_width: 1, bg_color: "black", border_color: "black", opacity: 100 }
        };
    }

    m = trimmed.match(/^it\.circle\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*COLOR_OFF)?\s*\)\s*;?/);
    if (m) {
        const r = parseInt(m[3], 10);
        return {
            id: "w_circle_" + widgetCount,
            type: "shape_circle",
            x: parseInt(m[1], 10) - r,
            y: parseInt(m[2], 10) - r,
            width: r * 2,
            height: r * 2,
            title: "",
            entity_id: "",
            props: { border_width: 1, bg_color: "transparent", border_color: "black", opacity: 100 }
        };
    }

    m = trimmed.match(/^it\.filled_circle\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*COLOR_OFF)?\s*\)\s*;?/);
    if (m) {
        const r = parseInt(m[3], 10);
        return {
            id: "w_fcircle_" + widgetCount,
            type: "shape_circle",
            x: parseInt(m[1], 10) - r,
            y: parseInt(m[2], 10) - r,
            width: r * 2,
            height: r * 2,
            title: "",
            entity_id: "",
            props: { border_width: 1, bg_color: "black", border_color: "black", opacity: 100 }
        };
    }

    m = trimmed.match(/^it\.line\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*;?/);
    if (m) {
        const x1 = parseInt(m[1], 10);
        const y1 = parseInt(m[2], 10);
        const x2 = parseInt(m[3], 10);
        const y2 = parseInt(m[4], 10);
        return {
            id: "w_line_" + widgetCount,
            type: "line",
            x: x1,
            y: y1,
            width: x2 - x1,
            height: y2 - y1,
            title: "",
            entity_id: "",
            props: {
                stroke_width: 1,
                color: "black",
                orientation: (Math.abs(y2 - y1) > Math.abs(x2 - x1)) ? "vertical" : "horizontal"
            }
        };
    }

    return null;
}
