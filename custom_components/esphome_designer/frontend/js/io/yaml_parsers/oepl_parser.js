import { Logger } from '../../utils/logger.js';

const OEPL_WIDGET_TYPES = [
    'text', 'rectangle', 'circle', 'icon', 'qrcode', 'progress_bar',
    'debug_grid', 'line', 'multiline', 'plot', 'dlimg', 'image',
    'rectangle_pattern', 'polygon', 'ellipse', 'arc', 'icon_sequence'
];

/**
 * Checks if the YAML text represents a bare OEPL/ODP widget array.
 * @param {string} yamlText - The raw YAML text to check
 * @returns {boolean} True if it looks like a bare array
 */
export function isBareOEPLArray(yamlText) {
    const trimmed = yamlText.trim();
    if (!trimmed.startsWith('-')) return false;

    const typeRegex = /^\s*(?:-\s*)?type:\s*["']?([\w_]+)["']?/m;
    const match = yamlText.match(typeRegex);

    if (match) {
        const typeValue = match[1].toLowerCase();
        if (OEPL_WIDGET_TYPES.includes(typeValue)) return true;
    }

    return false;
}

/**
 * Extracts entity and surrounding text from a Home Assistant template.
 * @param {string} template - The template string (e.g. "Temp: {{ states('sensor.temp') }} °C")
 * @returns {Object|null} Object with prefix, entity_id, and postfix, or null
 */
export function extractInfoFromTemplate(template) {
    if (!template || typeof template !== 'string' || !template.includes('{{')) return null;

    const statesMatch = template.match(/^(.*?){{\s*states\(['"]([^'"]+)['"]\)\s*}}(.*)$/s);
    if (statesMatch) {
        return {
            prefix: statesMatch[1],
            entity_id: statesMatch[2].trim(),
            postfix: statesMatch[3]
        };
    }
    return null;
}

/**
 * Parses a bare OEPL/ODP array into a layout object with pages and widgets.
 * 
 * @param {Array<Object>} oeplArray - The raw array of OEPL objects parsed from YAML
 * @returns {import('../../types.js').ProjectPayload} A standard layout structure containing a single page of widgets
 */
export function parseOEPLArrayToLayout(oeplArray) {
    Logger.log("[parseOEPLArrayToLayout] Parsing OEPL array with", oeplArray.length, "items");
    const layout = {
        settings: { orientation: "landscape", dark_mode: false },
        pages: [{ id: "page_0", name: "Main", widgets: [] }]
    };
    const widgets = layout.pages[0].widgets;

    oeplArray.forEach((item, idx) => {
        if (!item || !item.type) return;

        const rawType = item.type.toLowerCase();
        let widget = {
            id: item.id || `oepl_${rawType}_${idx}`,
            type: rawType,
            x: parseInt(item.x ?? 0, 10),
            y: parseInt(item.y ?? 0, 10),
            width: 100,
            height: 30,
            entity_id: '',
            props: {}
        };

        switch (rawType) {
            case 'text':
                const textVal = item.value || item.text || '';
                const templateInfo = extractInfoFromTemplate(textVal);
                const size = parseInt(item.size || 20, 10);

                if (templateInfo) {
                    widget.type = 'sensor_text';
                    widget.entity_id = templateInfo.entity_id;
                    widget.width = size * 8;
                    widget.height = size * 1.5;
                    widget.props = {
                        value_font_size: size,
                        font_family: item.font ? item.font.replace('.ttf', '') : 'Roboto',
                        color: item.fill || item.color || 'black',
                        prefix: templateInfo.prefix,
                        postfix: templateInfo.postfix,
                        value_format: "value_only",
                        hide_unit: true
                    };
                } else {
                    widget.width = size * 6;
                    widget.height = size * 1.5;
                    widget.props = {
                        text: textVal,
                        font_size: size,
                        font_family: item.font ? item.font.replace('.ttf', '') : 'Roboto',
                        color: item.fill || item.color || 'black'
                    };
                }
                break;

            case 'multiline':
                const mDelimiter = item.delimiter || '|';
                const mLines = (item.value || '').split(mDelimiter);
                const mFontSize = parseInt(item.size || 16, 10);
                const offsetY = parseInt(item.offset_y || (mFontSize + 4), 10);

                widget.type = 'odp_multiline';
                widget.width = mFontSize * 10;
                widget.height = offsetY * (mLines.length || 1);
                widget.props = {
                    text: item.value || '',
                    delimiter: mDelimiter,
                    font_size: mFontSize,
                    font_family: item.font ? item.font.replace('.ttf', '') : 'Roboto',
                    color: item.fill || item.color || 'black',
                    line_spacing: Math.max(0, offsetY - mFontSize)
                };
                break;

            case 'rectangle':
                widget.type = 'shape_rect';
                widget.x = parseInt(item.x_start || item.x || 0, 10);
                widget.y = parseInt(item.y_start || item.y || 0, 10);
                widget.width = Math.abs((parseInt(item.x_end || 100, 10)) - widget.x);
                widget.height = Math.abs((parseInt(item.y_end || 50, 10)) - widget.y);
                widget.props = {
                    fill: item.fill ? (item.fill !== 'white' && item.fill !== '#ffffff') : false,
                    border_width: parseInt(item.width || 1, 10),
                    color: item.fill || 'white',
                    border_color: item.outline || 'black',
                    opacity: 100
                };
                break;

            case 'circle':
                widget.type = 'shape_circle';
                const radius = parseInt(item.radius || 25, 10);
                widget.x = parseInt(item.x || 0, 10) - radius;
                widget.y = parseInt(item.y || 0, 10) - radius;
                widget.width = radius * 2;
                widget.height = radius * 2;
                widget.props = {
                    fill: item.fill ? (item.fill !== 'white' && item.fill !== '#ffffff') : false,
                    border_width: parseInt(item.width || 1, 10),
                    color: item.fill || 'black',
                    border_color: item.outline || item.fill || 'black',
                    opacity: 100
                };
                break;

            case 'icon':
                const iSize = parseInt(item.size || 24, 10);
                widget.width = iSize;
                widget.height = iSize;
                widget.props = {
                    code: item.value || 'mdi:home',
                    size: iSize,
                    color: item.fill || item.color || 'black',
                    fit_icon_to_frame: true
                };
                break;

            case 'qrcode':
                const boxsize = parseInt(item.boxsize || 2, 10);
                const border = parseInt(item.border || 1, 10);
                const qrSize = (25 + border * 2) * boxsize;
                widget.type = 'qr_code';
                widget.width = qrSize;
                widget.height = qrSize;
                widget.props = {
                    value: item.data || item.value || 'https://esphome.io',
                    scale: boxsize,
                    ecc: 'LOW',
                    color: item.color || 'black'
                };
                break;

            case 'progress_bar':
                widget.x = parseInt(item.x_start || item.x || 0, 10);
                widget.y = parseInt(item.y_start || item.y || 0, 10);
                widget.width = Math.abs((parseInt(item.x_end || 100, 10)) - widget.x);
                widget.height = Math.abs((parseInt(item.y_end || 20, 10)) - widget.y);
                widget.props = {
                    show_label: false,
                    show_percentage: item.show_percentage === true || item.show_percentage === 'true',
                    bar_height: widget.height,
                    border_width: parseInt(item.width || 1, 10),
                    color: item.fill || 'black',
                    progress_value: parseInt(item.progress || 0, 10),
                    direction: item.direction || 'right'
                };
                break;

            case 'line':
                widget.x = parseInt(item.x_start || item.x || 0, 10);
                widget.y = parseInt(item.y_start || item.y || 0, 10);
                const xEnd = parseInt(item.x_end || 100, 10);
                const yEnd = parseInt(item.y_end || widget.y, 10);
                widget.width = Math.abs(xEnd - widget.x) || 1;
                widget.height = Math.abs(yEnd - widget.y) || 1;
                widget.props = {
                    stroke_width: parseInt(item.width || 1, 10),
                    color: item.fill || item.color || 'black',
                    orientation: Math.abs(yEnd - widget.y) > Math.abs(xEnd - widget.x) ? 'vertical' : 'horizontal'
                };
                break;

            case 'debug_grid':
                widget.type = 'odp_debug_grid';
                widget.x = 0;
                widget.y = 0;
                widget.width = 800;
                widget.height = 480;
                widget.props = {
                    spacing: parseInt(item.spacing || 20, 10),
                    line_color: item.line_color || 'black',
                    dashed: item.dashed !== false,
                    dash_length: parseInt(item.dash_length || 2, 10),
                    space_length: parseInt(item.space_length || 4, 10),
                    show_labels: item.show_labels !== false,
                    label_step: parseInt(item.label_step || 40, 10),
                    label_color: item.label_color || 'black',
                    label_font_size: parseInt(item.label_font_size || 12, 10)
                };
                break;

            case 'dlimg':
            case 'image':
                widget.type = 'online_image';
                widget.width = parseInt(item.xsize || item.width || 100, 10);
                widget.height = parseInt(item.ysize || item.height || 100, 10);
                widget.props = {
                    url: item.url || '',
                    invert: false,
                    interval_s: 300,
                    rotation: parseInt(item.rotate || 0, 10)
                };
                break;

            case 'plot':
                widget.type = 'odp_plot';
                widget.x = parseInt(item.x_start || item.x || 0, 10);
                widget.y = parseInt(item.y_start || item.y || 0, 10);
                widget.width = Math.abs((parseInt(item.x_end || 200, 10)) - widget.x);
                widget.height = Math.abs((parseInt(item.y_end || 100, 10)) - widget.y);
                widget.props = {
                    duration: item.duration || 86400,
                    data: Array.isArray(item.data) ? item.data : (item.data ? [item.data] : []),
                    background: item.background || 'white',
                    outline: item.outline || '#ccc',
                    ylegend: item.ylegend || null
                };
                break;

            case 'rectangle_pattern':
                widget.type = 'odp_rectangle_pattern';
                widget.x = parseInt(item.x_start || item.x || 0, 10);
                widget.y = parseInt(item.y_start || item.y || 0, 10);
                widget.width = Math.abs((parseInt(item.x_end || 120, 10)) - widget.x) || 120;
                widget.height = Math.abs((parseInt(item.y_end || 80, 10)) - widget.y) || 80;
                widget.props = {
                    x_size: parseInt(item.x_size || 30, 10),
                    y_size: parseInt(item.y_size || 15, 10),
                    x_offset: parseInt(item.x_offset || 5, 10),
                    y_offset: parseInt(item.y_offset || 5, 10),
                    x_repeat: parseInt(item.x_repeat || 3, 10),
                    y_repeat: parseInt(item.y_repeat || 2, 10),
                    fill: item.fill || 'white',
                    outline: item.outline || 'black',
                    border_width: parseInt(item.width || 1, 10)
                };
                break;

            case 'polygon':
                widget.type = 'odp_polygon';
                if (Array.isArray(item.points) && item.points.length > 0) {
                    const xs = item.points.map(p => p[0]);
                    const ys = item.points.map(p => p[1]);
                    const minX = Math.min(...xs);
                    const minY = Math.min(...ys);
                    widget.x = minX;
                    widget.y = minY;
                    widget.width = Math.max(...xs) - minX || 100;
                    widget.height = Math.max(...ys) - minY || 100;
                    widget.props = {
                        points: item.points.map(([px, py]) => [px - minX, py - minY]),
                        fill: item.fill || 'red',
                        outline: item.outline || 'black',
                        border_width: parseInt(item.width || 1, 10)
                    };
                }
                break;

            case 'ellipse':
                widget.type = 'odp_ellipse';
                widget.x = parseInt(item.x_start || item.x || 0, 10);
                widget.y = parseInt(item.y_start || item.y || 0, 10);
                widget.width = Math.abs((parseInt(item.x_end || 150, 10)) - widget.x) || 150;
                widget.height = Math.abs((parseInt(item.y_end || 80, 10)) - widget.y) || 80;
                widget.props = {
                    fill: item.fill || null,
                    outline: item.outline || 'black',
                    border_width: parseInt(item.width || 1, 10)
                };
                break;

            case 'arc':
                const arcRadius = parseInt(item.radius || 50, 10);
                widget.type = 'odp_arc';
                widget.x = parseInt(item.x || 0, 10) - arcRadius;
                widget.y = parseInt(item.y || 0, 10) - arcRadius;
                widget.width = arcRadius * 2;
                widget.height = arcRadius * 2;
                widget.props = {
                    radius: arcRadius,
                    start_angle: parseInt(item.start_angle || 0, 10),
                    end_angle: parseInt(item.end_angle || 90, 10),
                    outline: item.outline || 'black',
                    border_width: parseInt(item.width || 2, 10)
                };
                break;

            case 'icon_sequence':
                const iconSize = parseInt(item.size || 24, 10);
                const iSpacing = parseInt(item.spacing || 6, 10);
                const iIcons = item.icons || ['mdi:home', 'mdi:arrow-right', 'mdi:office-building'];
                const isVertical = item.direction === 'down';
                widget.type = 'odp_icon_sequence';
                widget.width = isVertical ? iconSize : (iIcons.length * (iconSize + iSpacing) - iSpacing);
                widget.height = isVertical ? (iIcons.length * (iconSize + iSpacing) - iSpacing) : iconSize;
                widget.props = {
                    icons: iIcons,
                    size: iconSize,
                    direction: item.direction || 'right',
                    spacing: iSpacing,
                    fill: item.fill || 'black'
                };
                break;

            default:
                Logger.warn(`[parseOEPLArrayToLayout] Unknown OEPL type: ${rawType}`);
                return;
        }

        widgets.push(widget);
    });

    return layout;
}
