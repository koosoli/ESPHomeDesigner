import { Logger } from '../utils/logger.js';
import { registry } from '../core/plugin_registry';

/**
 * @param {any} val
 * @returns {string}
 */
function safeYamlValue(val) {
    if (val === undefined || val === null) return "";
    if (typeof val !== 'string') return String(val);

    const trimmed = val.trim();

    if ((val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'")) ||
        trimmed.startsWith('!lambda') ||
        trimmed.startsWith('!secret')) {
        return val;
    }

    const needsQuoting = /^[*&!|>%@,\-{}[\]?#:]/.test(trimmed) ||
        /^(true|false|null|yes|no)$/i.test(trimmed) ||
        /^[A-Z][A-Z0-9_]*$/.test(trimmed) ||
        trimmed.includes(': ') ||
        trimmed.includes(' #');

    if (needsQuoting) {
        return JSON.stringify(val);
    }

    return val;
}

/**
 * @param {Record<string, any>} obj
 * @param {string[]} lines
 * @param {number} indentLevel
 * @returns {void}
 */
export function serializeYamlObject(obj, lines, indentLevel) {
    const spaces = " ".repeat(indentLevel);

    const keys = Object.keys(obj).sort((a, b) => {
        if (a === "id") return -1;
        if (b === "id") return 1;
        if (a === "type") return -1;
        if (b === "type") return 1;
        return a.localeCompare(b);
    });

    keys.forEach((key) => {
        const val = obj[key];
        if (val === undefined || val === null || val === "") return;

        if (Array.isArray(val)) {
            if (val.length === 0) {
                lines.push(`${spaces}${key}: []`);
            } else {
                lines.push(`${spaces}${key}:`);
                val.forEach((item) => {
                    if (typeof item === 'object') {
                        lines.push(`${spaces}  -`);
                        serializeYamlObject(item, lines, indentLevel + 4);
                    } else {
                        lines.push(`${spaces}  - ${safeYamlValue(item)}`);
                    }
                });
            }
        } else if (typeof val === 'object') {
            lines.push(`${spaces}${key}:`);
            serializeYamlObject(val, lines, indentLevel + 2);
        } else if (typeof val === 'string' && val.includes('\n')) {
            const parts = val.split('\n');
            if (val.trim().startsWith('!lambda')) {
                lines.push(`${spaces}${key}: ${parts[0].trim()}`);
                const bodyParts = parts.slice(1);
                const minIndent = bodyParts.reduce((min, line) => {
                    if (!line.trim()) return min;
                    const match = line.match(/^ */);
                    return Math.min(min, match ? match[0].length : 0);
                }, Infinity);
                const safeMin = minIndent === Infinity ? 0 : minIndent;

                for (let i = 1; i < parts.length; i++) {
                    const content = parts[i].trim() === "" ? "" : parts[i].substring(safeMin);
                    lines.push(`${spaces}  ${content}`);
                }
            } else {
                lines.push(`${spaces}${key}: |-`);
                parts.forEach((part) => {
                    lines.push(`${spaces}  ${part}`);
                });
            }
        } else {
            lines.push(`${spaces}${key}: ${safeYamlValue(val)}`);
        }
    });
}

/**
 * @param {Widget} w
 * @returns {string}
 */
export function serializeWidget(w) {
    const parts = [`// widget:${w.type}`];

    parts.push(`id:${w.id}`);
    parts.push(`type:${w.type}`);
    parts.push(`x:${Math.round(w.x)}`);
    parts.push(`y:${Math.round(w.y)}`);
    const width = w.w !== undefined ? w.w : (w.width !== undefined ? w.width : 0);
    const height = w.h !== undefined ? w.h : (w.height !== undefined ? w.height : 0);

    parts.push(`w:${Math.round(width)}`);
    parts.push(`h:${Math.round(height)}`);

    if (w.entity_id) parts.push(`entity:${w.entity_id}`);
    if (w.locked) parts.push(`locked:true`);

    const plugin = registry ? registry.get(w.type) : null;
    const defaults = plugin ? { ...plugin.defaults } : {};

    if (w.type.startsWith("lvgl_")) {
        Object.assign(defaults, {
            hidden: false,
            clickable: true,
            checkable: false,
            scrollable: true,
            floating: false,
            ignore_layout: false,
            scrollbar_mode: "AUTO",
            opa: 255,
            grid_cell_row_pos: null,
            grid_cell_column_pos: null,
            grid_cell_row_span: 1,
            grid_cell_column_span: 1,
            grid_cell_x_align: "STRETCH",
            grid_cell_y_align: "STRETCH"
        });
    }

    if (w.props) {
        Object.entries(w.props).forEach(([k, v]) => {
            if (v === undefined || v === null || v === "") return;
            if (k === 'id' && v === w.id) return;
            if (k === 'type' && v === w.type) return;
            if (k === 'x' && Math.round(v) === Math.round(w.x)) return;
            if (k === 'y' && Math.round(v) === Math.round(w.y)) return;
            if (k === 'w' && Math.round(v) === Math.round(w.width || w.w)) return;
            if (k === 'h' && Math.round(v) === Math.round(w.height || w.h)) return;
            if (k === 'entity_id' && v === w.entity_id) return;

            if (k in defaults) {
                if (defaults[k] === v) return;
                if (typeof v === 'object' && JSON.stringify(defaults[k]) === JSON.stringify(v)) return;
            }

            if (typeof v === 'object') {
                try {
                    parts.push(`${k}:${JSON.stringify(v)}`);
                } catch (e) {
                    Logger.warn(`[serializeWidget] Failed to serialize prop ${k}`, e);
                }
            } else {
                parts.push(`${k}:${JSON.stringify(v)}`);
            }
        });
    }

    return parts.join(" ").replace(/[\r\n]+/g, " ");
}
