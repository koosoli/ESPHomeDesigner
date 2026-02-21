/**
 * Parses raw C++ drawing commands found in ESPHome lambdas.
 * This is a fallback for layouts that were generated or modified manually without widget markers.
 * 
 * @param {string} trimmed - The trimmed line of code
 * @param {number} widgetCount - Current number of widgets (used for ID generation)
 * @returns {Object|null} - A widget object if matched, or null
 */
export function parseCppDrawingCommand(trimmed, widgetCount) {
    let m;

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
            props: { fill: false, border_width: 1, color: "black", opacity: 100 }
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
            props: { fill: true, border_width: 1, color: "black", opacity: 100 }
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
            props: { fill: false, border_width: 1, color: "black", opacity: 100 }
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
            props: { fill: true, border_width: 1, color: "black", opacity: 100 }
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
