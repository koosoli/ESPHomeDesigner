/**
 * @typedef {Record<string, any>} RawPropMap
 */

/**
 * @param {unknown} c
 * @param {unknown} fallback
 * @returns {unknown}
 */
export function normalizeMappedColor(c, fallback) {
    if (c === undefined || c === null || c === "") return fallback;
    if (typeof c === 'number') {
        const h = String(c.toString(16).toLowerCase());
        return "#" + (h.length <= 3 ? h.padStart(3, '0') : h.padStart(6, '0'));
    }
    const s = String(c).trim().toLowerCase();
    if (s.startsWith("0x")) return "#" + s.substring(2);
    return s;
}

/**
 * @param {string} widgetType
 * @param {RawPropMap} p
 * @param {RawPropMap} props
 * @returns {void}
 */
export function applyCommonLvglProps(widgetType, p, props) {
    if (!widgetType.startsWith("lvgl_")) return;

    Object.entries(p).forEach(([key, val]) => {
        if (["id", "type", "x", "y", "w", "h", "width", "height"].includes(key)) return;

        if (val === "true") props[key] = true;
        else if (val === "false") props[key] = false;
        else if (key.includes("color") || key.includes("bg_") || key.startsWith("line_color")) {
            props[key] = normalizeMappedColor(val, val);
        }
        else if (typeof val === 'string' && val !== "" && !Number.isNaN(Number(val)) && !val.startsWith("0x")) props[key] = parseFloat(val);
        else props[key] = val;
    });

    props.hidden = (p.hidden === "true");
    props.clickable = (p.clickable !== "false");
    props.checkable = (p.checkable === "true");
    props.scrollable = (p.scrollable !== "false");
    props.floating = (p.floating === "true");
    props.ignore_layout = (p.ignore_layout === "true");
    props.scrollbar_mode = p.scrollbar_mode || "AUTO";
    props.opa = parseInt(p.opa || 255, 10);

    const rowPos = p.grid_cell_row_pos ?? p.grid_row;
    const colPos = p.grid_cell_column_pos ?? p.grid_col;
    props.grid_cell_row_pos = rowPos != null ? parseInt(rowPos, 10) : null;
    props.grid_cell_column_pos = colPos != null ? parseInt(colPos, 10) : null;
    props.grid_cell_row_span = parseInt(p.grid_cell_row_span || p.grid_row_span || 1, 10);
    props.grid_cell_column_span = parseInt(p.grid_cell_column_span || p.grid_col_span || 1, 10);
    props.grid_cell_x_align = p.grid_cell_x_align || p.grid_x_align || "STRETCH";
    props.grid_cell_y_align = p.grid_cell_y_align || p.grid_y_align || "STRETCH";
}
