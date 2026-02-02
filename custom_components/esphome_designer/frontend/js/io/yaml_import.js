import { AppState } from '../core/state.js';
import { Logger } from '../utils/logger.js';
import { DEVICE_PROFILES } from './devices.js';

/**
 * Creates a custom js-yaml schema that supports ESPHome tags like !lambda.
 */
function getESPHomeSchema() {
    if (!window.jsyaml) return null;

    // Cache for performance
    if (window._esphomeYamlSchema) return window._esphomeYamlSchema;

    try {
        const LambdaType = new jsyaml.Type('!lambda', {
            kind: 'scalar',
            construct: function (data) { return data; }
        });

        // Handle verbatim tag too just in case js-yaml sees it this way
        const VerbatimLambdaType = new jsyaml.Type('!<!lambda>', {
            kind: 'scalar',
            construct: function (data) { return data; }
        });

        const SecretType = new jsyaml.Type('!secret', {
            kind: 'scalar',
            construct: function (data) { return `!secret ${data}`; }
        });

        // Extend DEFAULT_SCHEMA (works for js-yaml 3.x and 4.x)
        window._esphomeYamlSchema = jsyaml.DEFAULT_SCHEMA.extend([LambdaType, VerbatimLambdaType, SecretType]);
        return window._esphomeYamlSchema;
    } catch (e) {
        Logger.error("[getESPHomeSchema] Error creating schema:", e);
        return jsyaml.DEFAULT_SCHEMA;
    }
}

// Known OEPL/ODP widget types for detection
const OEPL_WIDGET_TYPES = [
    'text', 'rectangle', 'circle', 'icon', 'qrcode', 'progress_bar',
    'debug_grid', 'line', 'multiline', 'plot', 'dlimg', 'image',
    // ODP-specific types
    'rectangle_pattern', 'polygon', 'ellipse', 'arc', 'icon_sequence'
];

/**
 * Checks if the YAML text is a bare OEPL array (starts with "- type: <oepl_type>")
 * @param {string} yamlText - The YAML string to check.
 * @returns {boolean} True if the text represents a bare OEPL array.
 */
export function isBareOEPLArray(yamlText) {
    const trimmed = yamlText.trim();
    // Check if it starts with "- type:" which is OEPL format
    const firstItemMatch = trimmed.match(/^-\s*type:\s*(\w+)/);
    if (firstItemMatch) {
        const typeValue = firstItemMatch[1].toLowerCase();
        return OEPL_WIDGET_TYPES.includes(typeValue);
    }
    return false;
}

/**
 * Parses a bare OEPL YAML array into a layout object.
 * @param {Array} oeplArray - The parsed OEPL array of widget definitions.
 * @returns {Object} The layout object with pages and widgets.
 */
export function parseOEPLArrayToLayout(oeplArray) {
    Logger.log("[parseOEPLArrayToLayout] Parsing OEPL array with", oeplArray.length, "items");

    const widgets = [];
    let widgetIndex = 0;

    for (const item of oeplArray) {
        if (!item || !item.type) continue;

        const oeplType = item.type.toLowerCase();
        let widget = null;

        switch (oeplType) {
            case 'text':
                widget = {
                    id: `oepl_text_${widgetIndex}`,
                    type: 'text',
                    x: parseInt(item.x || 0, 10),
                    y: parseInt(item.y || 0, 10),
                    width: parseInt(item.size || 20, 10) * 6, // Approximate width based on font size
                    height: parseInt(item.size || 20, 10) * 1.5,
                    title: '',
                    entity_id: '',
                    props: {
                        text: item.value || item.text || '',
                        font_size: parseInt(item.size || 20, 10),
                        font_family: item.font ? item.font.replace('.ttf', '') : 'Roboto',
                        color: item.fill || item.color || 'black',
                        parse_colors: item.parse_colors === true || item.parse_colors === 'true'
                    }
                };
                break;

            case 'multiline':
                // ODP multiline text with delimiter
                const delimiter = item.delimiter || '|';
                const lines = (item.value || '').split(delimiter);
                const lineCount = lines.length || 1;
                widget = {
                    id: `odp_multiline_${widgetIndex}`,
                    type: 'odp_multiline',
                    x: parseInt(item.x || 0, 10),
                    y: parseInt(item.y || 0, 10),
                    width: parseInt(item.size || 16, 10) * 10,
                    height: parseInt(item.size || 16, 10) * lineCount * 1.5,
                    title: '',
                    entity_id: '',
                    props: {
                        text: item.value || 'Line 1|Line 2',
                        delimiter: delimiter,
                        font_size: parseInt(item.size || 16, 10),
                        font_family: item.font ? item.font.replace('.ttf', '') : 'Roboto',
                        color: item.fill || item.color || 'black',
                        line_spacing: 4,
                        parse_colors: item.parse_colors === true || item.parse_colors === 'true'
                    }
                };
                break;

            case 'rectangle':
                widget = {
                    id: `oepl_rect_${widgetIndex}`,
                    type: 'shape_rect',
                    x: parseInt(item.x_start || item.x || 0, 10),
                    y: parseInt(item.y_start || item.y || 0, 10),
                    width: Math.abs((parseInt(item.x_end || 100, 10)) - (parseInt(item.x_start || item.x || 0, 10))),
                    height: Math.abs((parseInt(item.y_end || 50, 10)) - (parseInt(item.y_start || item.y || 0, 10))),
                    title: '',
                    entity_id: '',
                    props: {
                        fill: item.fill ? (item.fill !== 'white' && item.fill !== '#ffffff') : false,
                        border_width: parseInt(item.width || 1, 10),
                        color: item.fill || 'white',
                        border_color: item.outline || 'black',
                        opacity: 100
                    }
                };
                break;

            case 'circle':
                const radius = parseInt(item.radius || 25, 10);
                widget = {
                    id: `oepl_circle_${widgetIndex}`,
                    type: 'shape_circle',
                    x: parseInt(item.x || 0, 10) - radius,
                    y: parseInt(item.y || 0, 10) - radius,
                    width: radius * 2,
                    height: radius * 2,
                    title: '',
                    entity_id: '',
                    props: {
                        fill: item.fill ? (item.fill !== 'white' && item.fill !== '#ffffff') : false,
                        border_width: parseInt(item.width || 1, 10),
                        color: item.fill || 'black',
                        border_color: item.outline || item.fill || 'black',
                        opacity: 100
                    }
                };
                break;

            case 'icon':
                widget = {
                    id: `oepl_icon_${widgetIndex}`,
                    type: 'icon',
                    x: parseInt(item.x || 0, 10),
                    y: parseInt(item.y || 0, 10),
                    width: parseInt(item.size || 24, 10),
                    height: parseInt(item.size || 24, 10),
                    title: '',
                    entity_id: '',
                    props: {
                        code: item.value || 'mdi:home',
                        size: parseInt(item.size || 24, 10),
                        color: item.fill || item.color || 'black',
                        fit_icon_to_frame: true
                    }
                };
                break;

            case 'qrcode':
                const boxsize = parseInt(item.boxsize || 2, 10);
                const border = parseInt(item.border || 1, 10);
                // Approximate QR code size: ~25 modules + borders
                const qrSize = (25 + border * 2) * boxsize;
                widget = {
                    id: `oepl_qr_${widgetIndex}`,
                    type: 'qr_code',
                    x: parseInt(item.x || 0, 10),
                    y: parseInt(item.y || 0, 10),
                    width: qrSize,
                    height: qrSize,
                    title: '',
                    entity_id: '',
                    props: {
                        value: item.data || item.value || 'https://esphome.io',
                        scale: boxsize,
                        ecc: 'LOW',
                        color: item.color || 'black'
                    }
                };
                break;

            case 'progress_bar':
                widget = {
                    id: `oepl_progress_${widgetIndex}`,
                    type: 'progress_bar',
                    x: parseInt(item.x_start || item.x || 0, 10),
                    y: parseInt(item.y_start || item.y || 0, 10),
                    width: Math.abs((parseInt(item.x_end || 100, 10)) - (parseInt(item.x_start || item.x || 0, 10))),
                    height: Math.abs((parseInt(item.y_end || 20, 10)) - (parseInt(item.y_start || item.y || 0, 10))),
                    title: '',
                    entity_id: '',
                    props: {
                        show_label: false,
                        show_percentage: item.show_percentage === true || item.show_percentage === 'true',
                        bar_height: Math.abs((parseInt(item.y_end || 20, 10)) - (parseInt(item.y_start || item.y || 0, 10))),
                        border_width: parseInt(item.width || 1, 10),
                        color: item.fill || 'black',
                        progress_value: parseInt(item.progress || 0, 10)
                    }
                };
                break;

            case 'line':
                widget = {
                    id: `oepl_line_${widgetIndex}`,
                    type: 'line',
                    x: parseInt(item.x_start || item.x || 0, 10),
                    y: parseInt(item.y_start || item.y || 0, 10),
                    width: Math.abs((parseInt(item.x_end || 100, 10)) - (parseInt(item.x_start || item.x || 0, 10))) || 1,
                    height: Math.abs((parseInt(item.y_end || 0, 10)) - (parseInt(item.y_start || item.y || 0, 10))) || 1,
                    title: '',
                    entity_id: '',
                    props: {
                        stroke_width: parseInt(item.width || 1, 10),
                        color: item.fill || item.color || 'black',
                        orientation: Math.abs((parseInt(item.y_end || 0, 10)) - (parseInt(item.y_start || item.y || 0, 10))) >
                            Math.abs((parseInt(item.x_end || 100, 10)) - (parseInt(item.x_start || item.x || 0, 10)))
                            ? 'vertical' : 'horizontal'
                    }
                };
                break;

            case 'debug_grid':
                // Debug grid is not a visual widget in the designer, skip it
                Logger.log("[parseOEPLArrayToLayout] Skipping debug_grid widget");
                continue;

            case 'dlimg':
            case 'image':
                widget = {
                    id: `oepl_img_${widgetIndex}`,
                    type: 'online_image',
                    x: parseInt(item.x || 0, 10),
                    y: parseInt(item.y || 0, 10),
                    width: parseInt(item.xsize || item.width || 100, 10),
                    height: parseInt(item.ysize || item.height || 100, 10),
                    title: '',
                    entity_id: '',
                    props: {
                        url: item.url || '',
                        invert: false,
                        interval_s: 300
                    }
                };
                break;

            case 'plot':
                widget = {
                    id: `oepl_graph_${widgetIndex}`,
                    type: 'graph',
                    x: parseInt(item.x_start || item.x || 0, 10),
                    y: parseInt(item.y_start || item.y || 0, 10),
                    width: Math.abs((parseInt(item.x_end || 200, 10)) - (parseInt(item.x_start || item.x || 0, 10))),
                    height: Math.abs((parseInt(item.y_end || 100, 10)) - (parseInt(item.y_start || item.y || 0, 10))),
                    title: '',
                    entity_id: item.sensor || '',
                    props: {
                        duration: item.duration || '24h',
                        border: true,
                        grid: true,
                        color: item.color || 'black'
                    }
                };
                break;

            // ODP-specific widget types
            case 'rectangle_pattern':
                widget = {
                    id: `odp_rectpat_${widgetIndex}`,
                    type: 'odp_rectangle_pattern',
                    x: parseInt(item.x_start || item.x || 0, 10),
                    y: parseInt(item.y_start || item.y || 0, 10),
                    width: Math.abs((parseInt(item.x_end || 120, 10)) - (parseInt(item.x_start || item.x || 0, 10))) || 120,
                    height: Math.abs((parseInt(item.y_end || 80, 10)) - (parseInt(item.y_start || item.y || 0, 10))) || 80,
                    title: '',
                    entity_id: '',
                    props: {
                        x_size: parseInt(item.x_size || 30, 10),
                        y_size: parseInt(item.y_size || 15, 10),
                        x_offset: parseInt(item.x_offset || 5, 10),
                        y_offset: parseInt(item.y_offset || 5, 10),
                        x_repeat: parseInt(item.x_repeat || 3, 10),
                        y_repeat: parseInt(item.y_repeat || 2, 10),
                        fill: item.fill || 'white',
                        outline: item.outline || 'black',
                        border_width: parseInt(item.width || 1, 10)
                    }
                };
                break;

            case 'polygon':
                widget = {
                    id: `odp_polygon_${widgetIndex}`,
                    type: 'odp_polygon',
                    x: parseInt(item.x || 0, 10),
                    y: parseInt(item.y || 0, 10),
                    width: 100,
                    height: 100,
                    title: '',
                    entity_id: '',
                    props: {
                        points: item.points || [[0, 0], [100, 0], [100, 100], [0, 100]],
                        fill: item.fill || 'red',
                        outline: item.outline || 'black',
                        border_width: parseInt(item.width || 1, 10)
                    }
                };
                // Calculate size from points if available
                if (Array.isArray(item.points) && item.points.length) {
                    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
                    item.points.forEach(([px, py]) => {
                        minX = Math.min(minX, px);
                        minY = Math.min(minY, py);
                        maxX = Math.max(maxX, px);
                        maxY = Math.max(maxY, py);
                    });
                    widget.x = minX;
                    widget.y = minY;
                    widget.width = maxX - minX || 100;
                    widget.height = maxY - minY || 100;
                    // Normalize points to be relative to widget position
                    widget.props.points = item.points.map(([px, py]) => [px - minX, py - minY]);
                }
                break;

            case 'ellipse':
                widget = {
                    id: `odp_ellipse_${widgetIndex}`,
                    type: 'odp_ellipse',
                    x: parseInt(item.x_start || item.x || 0, 10),
                    y: parseInt(item.y_start || item.y || 0, 10),
                    width: Math.abs((parseInt(item.x_end || 150, 10)) - (parseInt(item.x_start || item.x || 0, 10))) || 150,
                    height: Math.abs((parseInt(item.y_end || 80, 10)) - (parseInt(item.y_start || item.y || 0, 10))) || 80,
                    title: '',
                    entity_id: '',
                    props: {
                        fill: item.fill || null,
                        outline: item.outline || 'black',
                        border_width: parseInt(item.width || 1, 10)
                    }
                };
                break;

            case 'arc':
                const arcRadius = parseInt(item.radius || 50, 10);
                widget = {
                    id: `odp_arc_${widgetIndex}`,
                    type: 'odp_arc',
                    x: parseInt(item.x || 0, 10) - arcRadius,
                    y: parseInt(item.y || 0, 10) - arcRadius,
                    width: arcRadius * 2,
                    height: arcRadius * 2,
                    title: '',
                    entity_id: '',
                    props: {
                        radius: arcRadius,
                        start_angle: parseInt(item.start_angle || 0, 10),
                        end_angle: parseInt(item.end_angle || 90, 10),
                        outline: item.outline || 'black',
                        border_width: parseInt(item.width || 2, 10)
                    }
                };
                break;

            case 'icon_sequence':
                const iconSize = parseInt(item.size || 24, 10);
                const spacing = parseInt(item.spacing || 6, 10);
                const icons = item.icons || ['mdi:home', 'mdi:arrow-right', 'mdi:office-building'];
                const isVertical = item.direction === 'down';
                widget = {
                    id: `odp_iconseq_${widgetIndex}`,
                    type: 'odp_icon_sequence',
                    x: parseInt(item.x || 0, 10),
                    y: parseInt(item.y || 0, 10),
                    width: isVertical ? iconSize : (icons.length * (iconSize + spacing) - spacing),
                    height: isVertical ? (icons.length * (iconSize + spacing) - spacing) : iconSize,
                    title: '',
                    entity_id: '',
                    props: {
                        icons: icons,
                        size: iconSize,
                        direction: item.direction || 'right',
                        spacing: spacing,
                        fill: item.fill || 'black'
                    }
                };
                break;

            default:
                Logger.warn(`[parseOEPLArrayToLayout] Unknown OEPL type: ${oeplType}`);
                continue;
        }

        if (widget) {
            widgets.push(widget);
            widgetIndex++;
        }
    }

    Logger.log(`[parseOEPLArrayToLayout] Created ${widgets.length} widgets from OEPL array`);

    return {
        settings: {
            orientation: 'landscape',
            dark_mode: false
        },
        pages: [{
            id: 'page_0',
            name: 'Page 1',
            widgets: widgets
        }]
    };
}

/**
 * Parses an ESPHome YAML snippet offline to extract the layout.
 * @param {string} yamlText - The YAML string to parse.
 * @returns {Object} The parsed layout object containing pages and settings.
 */
export function parseSnippetYamlOffline(yamlText) {
    Logger.log("[parseSnippetYamlOffline] Start parsing with js-yaml...");
    const rawLines = yamlText.split(/\r?\n/);
    const lambdaLines = [];

    let doc = {};
    try {
        if (window.jsyaml) {
            doc = jsyaml.load(yamlText, { schema: getESPHomeSchema() }) || {};
            Logger.log("[parseSnippetYamlOffline] YAML parsed successfully with js-yaml");
        }
    } catch (e) {
        Logger.error("[parseSnippetYamlOffline] YAML parse error:", e);
    }

    // Check for bare OEPL array format (e.g., "- type: text\n  value: ...")
    if (isBareOEPLArray(yamlText) && Array.isArray(doc)) {
        Logger.log("[parseSnippetYamlOffline] Detected bare OEPL array format");
        return parseOEPLArrayToLayout(doc);
    }

    // 1. Extract Display Lambdas or LVGL blocks from the parsed doc
    if (doc.display) {
        const displays = Array.isArray(doc.display) ? doc.display : [doc.display];
        displays.forEach(d => {
            if (d && d.lambda) {
                lambdaLines.push(...d.lambda.split("\n"));
            }
        });
    }

    // 2. Fallback to manual scanning if js-yaml missed the lambda (e.g. malformed YAML or partial snippet)
    // OR if it's an LVGL-based YAML where we need to scan the lvgl: block for widgets.
    if (lambdaLines.length === 0 || yamlText.includes("lvgl:")) {
        let inBlock = false;
        let blockIndent = 0;
        let blockType = null; // 'lambda' or 'lvgl'

        for (const rawLine of rawLines) {
            const line = rawLine.replace(/\t/g, "    ");
            const trimmed = line.trim();

            if (!inBlock) {
                if (line.match(/^\s*lambda:\s*\|\-/)) {
                    inBlock = true;
                    blockType = 'lambda';
                    blockIndent = 0;
                    continue;
                } else if (line.match(/^\s*lvgl:\s*$/)) {
                    inBlock = true;
                    blockType = 'lvgl';
                    blockIndent = 0;
                    continue;
                } else if (line.match(/^\s*"?(?:open_epaper_link\.drawcustom|payload)"?:\s*(?:\[|\|-)?/)) {
                    inBlock = true;
                    blockType = 'oepl';
                    blockIndent = 0;
                    continue;
                } else if (line.match(/^\s*"actions":\s*\[/)) {
                    inBlock = true;
                    blockType = 'odp';
                    blockIndent = 0;
                    continue;
                }
            }

            if (inBlock) {
                const indentMatch = line.match(/^(\s*)/);
                const indentLen = indentMatch ? indentMatch[1].length : 0;

                if (trimmed === "") {
                    lambdaLines.push("");
                    continue;
                }

                if (blockIndent === 0 && trimmed !== "" && !trimmed.startsWith("#") && !trimmed.startsWith("//")) {
                    blockIndent = indentLen;
                }

                // OEPL/ODP can be JSON, so we handle both # and // markers
                if (trimmed.startsWith("#") || trimmed.startsWith("//")) {
                    lambdaLines.push(line);
                    continue;
                }

                if (blockIndent !== 0 && indentLen < blockIndent && trimmed !== "") {
                    // Check if it's a new root key or a lower indent level
                    if (line.match(/^\w+:/) || line.match(/^\s*}/) || indentLen < blockIndent) {
                        inBlock = false;
                        continue;
                    }
                }

                // For LVGL/OEPL/ODP blocks, we keep the indentation to help the sub-block parser
                // For Lambdas, we strip the base indent
                if (blockType === 'lambda') {
                    lambdaLines.push(line.slice(blockIndent));
                } else {
                    lambdaLines.push(line);
                }
            }
        }
    }

    Logger.log(`[parseSnippetYamlOffline] Collected ${lambdaLines.length} info lines`);

    const pageMap = new Map();
    const intervalMap = new Map();
    const nameMap = new Map();
    const darkModeMap = new Map(); // Per-page dark mode setting
    const refreshTypeMap = new Map();
    const refreshTimeMap = new Map();
    const pagePropsMap = new Map(); // Store page-level properties (bg_color, etc)
    const layoutMap = new Map(); // Grid layout (e.g., "4x4")

    // Helper to extract and parse a YAML sub-block starting from a given index
    const parseYamlSubBlock = (linesList, startIdx, baseIndent) => {
        const blockLines = [];
        let j = startIdx;
        while (j < linesList.length) {
            const line = linesList[j];
            if (!line) { j++; continue; }
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith("#")) {
                blockLines.push(line);
                j++;
                continue;
            }
            const indentMatch = line.match(/^(\s*)/);
            const indent = indentMatch ? indentMatch[1].length : 0;
            if (indent < baseIndent) break;
            blockLines.push(line);
            j++;
        }
        try {
            const yamlStr = blockLines.join("\n");
            return { value: jsyaml.load(yamlStr, { schema: getESPHomeSchema() }), nextJ: j };
        } catch (e) {
            Logger.error("Error parsing YAML sub-block:", e);
            return { value: null, nextJ: j };
        }
    };

    // Use rawLines for original line-based scanning
    const lines = rawLines;

    let currentPageIndex = null;
    let inWidgetsBlockLookahead = false;

    const WIDGET_TAGS = [
        "label", "button", "arc", "bar", "slider", "chart", "dropdown",
        "roller", "spinbox", "switch", "textarea", "obj", "img",
        "qrcode", "led", "spinner", "line", "meter", "tabview",
        "tileview", "checkbox", "keyboard", "buttonmatrix", "list", "icon"
    ];

    const TAG_MAP = {
        "label": "lvgl_label", "button": "lvgl_button", "arc": "lvgl_arc", "bar": "lvgl_bar",
        "slider": "lvgl_slider", "chart": "lvgl_chart", "dropdown": "lvgl_dropdown",
        "roller": "lvgl_roller", "spinbox": "lvgl_spinbox", "switch": "lvgl_switch",
        "textarea": "lvgl_textarea", "obj": "lvgl_obj", "img": "lvgl_img",
        "qrcode": "lvgl_qrcode", "led": "lvgl_led", "spinner": "lvgl_spinner",
        "line": "lvgl_line", "meter": "lvgl_meter", "tabview": "lvgl_tabview",
        "tileview": "lvgl_tileview", "checkbox": "lvgl_checkbox", "keyboard": "lvgl_keyboard",
        "buttonmatrix": "lvgl_buttonmatrix", "icon": "icon"
    };

    for (let i = 0; i < lambdaLines.length; i++) {
        const line = lambdaLines[i];
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;
        const cmd = trimmedLine; // For compatibility with legacy matching logic

        // Native Lambda page check
        let pageMatch = line.match(/if\s*\(\s*(?:id\s*\(\s*display_page\s*\)|page|currentPage)\s*==\s*(\d+)\s*\)/);
        if (pageMatch) {
            currentPageIndex = parseInt(pageMatch[1], 10);
            inWidgetsBlockLookahead = false;
            if (!pageMap.has(currentPageIndex)) {
                pageMap.set(currentPageIndex, []);
            }
        }

        // LVGL Page check
        // Looking for: "    - id: main_page" (or page_0, etc.)
        const lvglPageMatch = line.match(/^\s*-\s*id:\s*(\w+)/);
        if (lvglPageMatch) {
            const pageIdStr = lvglPageMatch[1];
            // If it's page_N, use N as index, otherwise use sequential index
            const numMatch = pageIdStr.match(/^page_(\d+)$/);
            let idx = numMatch ? parseInt(numMatch[1], 10) : pageMap.size;

            if (!pageMap.has(idx)) {
                pageMap.set(idx, []);
                nameMap.set(idx, pageIdStr); // Default name to ID
            }
            currentPageIndex = idx;
            inWidgetsBlockLookahead = false;
            Logger.log(`[parseSnippetYamlOffline] Detected LVGL Page: ${pageIdStr} (mapped to idx ${idx})`);
        }

        // Parse grid layout (e.g., "layout: 4x4")
        const layoutMatch = line.match(/^\s*layout:\s*(\d+x\d+)/);
        if (layoutMatch && currentPageIndex !== null) {
            layoutMap.set(currentPageIndex, layoutMatch[1]);
            Logger.log(`[parseSnippetYamlOffline] Detected layout: ${layoutMatch[1]} for page ${currentPageIndex}`);
        }

        if (trimmedLine.startsWith("widgets:")) {
            inWidgetsBlockLookahead = true;
            continue;
        }

        const intervalMatch = line.match(/case\s+(\d+):\s*interval\s*=\s*(\d+);/);
        if (intervalMatch) {
            const idx = parseInt(intervalMatch[1], 10);
            const val = parseInt(intervalMatch[2], 10);
            intervalMap.set(idx, val);
            // Ensure page exists in map even if no widgets yet
            if (!pageMap.has(idx)) {
                pageMap.set(idx, []);
            }
        }

        const nameMatch = line.match(/\/\/\s*page:name\s+"(.+)"/);
        if (nameMatch && currentPageIndex !== null) {
            nameMap.set(currentPageIndex, nameMatch[1]);
        }

        // Parse per-page dark mode setting
        const darkModeMatch = line.match(/\/\/\s*page:dark_mode\s+"(.+)"/);
        if (darkModeMatch && currentPageIndex !== null) {
            darkModeMap.set(currentPageIndex, darkModeMatch[1]);
        }

        const refreshTypeMatch = line.match(/\/\/\s*page:refresh_type\s+"(.+)"/);
        if (refreshTypeMatch && currentPageIndex !== null) {
            refreshTypeMap.set(currentPageIndex, refreshTypeMatch[1]);
        }

        const refreshTimeMatch = line.match(/\/\/\s*page:refresh_time\s+"(.*)"/);
        if (refreshTimeMatch && currentPageIndex !== null) {
            refreshTimeMap.set(currentPageIndex, refreshTimeMatch[1]);
        }

        // Native LVGL Page Properties (Only if NOT in a widgets block to avoid misattribution)
        if (!inWidgetsBlockLookahead) {
            const pgBgColorMatch = line.match(/^\s*bg_color:\s*(.*)/);
            if (pgBgColorMatch && currentPageIndex !== null) {
                let val = pgBgColorMatch[1].trim().replace(/^["']|["']$/g, "");
                if (val.startsWith("0x")) val = "#" + val.substring(2);
                if (!pagePropsMap.has(currentPageIndex)) pagePropsMap.set(currentPageIndex, {});
                pagePropsMap.get(currentPageIndex).bg_color = val;

                // Auto-detect dark mode from background color
                if (val.startsWith("#")) {
                    const hex = val.substring(1);
                    if (hex.length === 6) {
                        const r = parseInt(hex.substring(0, 2), 16);
                        const g = parseInt(hex.substring(2, 4), 16);
                        const b = parseInt(hex.substring(4, 6), 16);
                        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
                        if (brightness < 128) {
                            if (!darkModeMap.has(currentPageIndex)) {
                                darkModeMap.set(currentPageIndex, "dark");
                            }
                        }
                    }
                }
            }

            const pgBgOpaMatch = line.match(/^\s*bg_opa:\s*(.*)/);
            if (pgBgOpaMatch && currentPageIndex !== null) {
                let val = pgBgOpaMatch[1].trim().replace(/^["']|["']$/g, "");
                if (val.endsWith("%")) val = String(Math.round(parseFloat(val) * 2.55));
                if (!pagePropsMap.has(currentPageIndex)) pagePropsMap.set(currentPageIndex, {});
                pagePropsMap.get(currentPageIndex).bg_opa = parseInt(val, 10);
            }
        }
    }

    // --- DEVICE LEVEL SETTINGS PARSING ---
    // Extract settings from the header comments
    const deviceSettings = {
        orientation: "landscape",
        dark_mode: false,
        sleep_enabled: false,
        sleep_start_hour: 0,
        sleep_end_hour: 5,
        manual_refresh_only: false,
        deep_sleep_enabled: false,
        deep_sleep_interval: 600,
        daily_refresh_enabled: false,
        daily_refresh_time: "08:00",
        refresh_interval: 600
    };

    for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line.startsWith("#")) continue;

        let m;
        if (m = line.match(/TARGET DEVICE:\s*(.*)/i)) deviceSettings.target_device = m[1].trim();
        if (m = line.match(/Name:\s*(.*)/i)) deviceSettings.name = m[1].trim();
        if (m = line.match(/Resolution:\s*(\d+)x(\d+)/i)) {
            deviceSettings.width = parseInt(m[1], 10);
            deviceSettings.height = parseInt(m[2], 10);
        }
        if (m = line.match(/Shape:\s*(rect|round|circle)/i)) {
            deviceSettings.shape = m[1].toLowerCase() === "rect" ? "rect" : "round";
        }
        if (m = line.match(/Inverted:\s*(true|false)/i)) deviceSettings.inverted_colors = (m[1].toLowerCase() === "true");
        if (m = line.match(/Orientation:\s*(landscape|portrait)/i)) deviceSettings.orientation = m[1].toLowerCase();
        if (m = line.match(/Dark Mode:\s*(enabled|disabled)/i)) deviceSettings.dark_mode = (m[1].toLowerCase() === "enabled");
        if (m = line.match(/Refresh Interval:\s*(\d+)/i)) deviceSettings.refresh_interval = parseInt(m[1], 10);

        // Handle New Power Strategy format
        if (m = line.match(/Power Strategy:\s*(.*)/i)) {
            const strategy = m[1].trim().toLowerCase();
            deviceSettings.sleep_enabled = strategy.includes("night");
            deviceSettings.manual_refresh_only = strategy.includes("manual");
            deviceSettings.deep_sleep_enabled = strategy.includes("ultra") || strategy.includes("deep");
            deviceSettings.daily_refresh_enabled = strategy.includes("daily");
        }

        // Individual settings (fallback or specific values)
        if (m = line.match(/Sleep Mode:\s*(enabled|disabled)/i)) deviceSettings.sleep_enabled = (m[1].toLowerCase() === "enabled");
        if (m = line.match(/Sleep Start Hour:\s*(\d+)/i)) deviceSettings.sleep_start_hour = parseInt(m[1], 10);
        if (m = line.match(/Sleep End Hour:\s*(\d+)/i)) deviceSettings.sleep_end_hour = parseInt(m[1], 10);
        if (m = line.match(/Manual Refresh:\s*(enabled|disabled)/i)) deviceSettings.manual_refresh_only = (m[1].toLowerCase() === "enabled");
        if (m = line.match(/Deep Sleep:\s*(enabled|disabled)/i)) deviceSettings.deep_sleep_enabled = (m[1].toLowerCase() === "enabled");
        if (m = line.match(/Deep Sleep Interval:\s*(\d+)/i)) deviceSettings.deep_sleep_interval = parseInt(m[1], 10);

        // Daily refresh specific
        if (m = line.match(/Refresh Time:\s*(\d{2}:\d{2})/i)) deviceSettings.daily_refresh_time = m[1];

        // Silent Hours
        if (m = line.match(/Disable updates from\s*(\d+)\s*to\s*(\d+)/i)) {
            deviceSettings.no_refresh_start_hour = parseInt(m[1], 10);
            deviceSettings.no_refresh_end_hour = parseInt(m[2], 10);
        }
    }

    if (pageMap.size === 0) {
        pageMap.set(0, []);
    }

    const layout = {
        settings: deviceSettings,
        pages: Array.from(pageMap.entries()).sort((a, b) => a[0] - b[0]).map(([idx, _]) => ({
            id: `page_${idx}`,
            name: nameMap.has(idx) ? nameMap.get(idx) : `Page ${idx + 1}`,
            refresh_s: intervalMap.has(idx) ? intervalMap.get(idx) : null,
            refresh_type: refreshTypeMap.has(idx) ? refreshTypeMap.get(idx) : "interval",
            refresh_time: refreshTimeMap.has(idx) ? refreshTimeMap.get(idx) : "",
            dark_mode: darkModeMap.has(idx) ? darkModeMap.get(idx) : "inherit",
            layout: layoutMap.has(idx) ? layoutMap.get(idx) : null,
            bg_color: pagePropsMap.has(idx) ? pagePropsMap.get(idx).bg_color : null,
            bg_opa: pagePropsMap.has(idx) ? pagePropsMap.get(idx).bg_opa : null,
            widgets: []
        }))
    };


    currentPageIndex = 0;

    function getCurrentPageWidgets() {
        // Fallback to 0 if page not found (could happen during init)
        const page = layout.pages.find((p, idx) => idx === currentPageIndex);
        return page ? page.widgets : layout.pages[0].widgets;
    }

    function parseWidgetMarker(comment) {
        // Relaxed regex: allow any spacing and both # and // markers
        const match = comment.match(/^(?:#\s*|\/\/\s*)widget:(\w+)\s+(.+)$/);
        if (!match) {
            if (comment.startsWith("// widget:") || comment.startsWith("# widget:")) {
                Logger.warn("[parseWidgetMarker] Regex failed for:", comment);
            }
            return null;
        }

        const widgetType = match[1];
        const propsStr = match[2];
        const props = {};

        Logger.log(`[parseWidgetMarker] Found widget: ${widgetType}`);

        // Improved regex to handle:
        // 1. Quoted strings: key:"value with spaces"
        // 2. Unquoted values: key:value
        // 3. Unquoted values at the end of string: key:value with spaces
        const regex = /(\w+):(?:"([^"]*)"|([^:]*?)(?=\s+\w+:|$))/g;
        let m;
        while ((m = regex.exec(propsStr)) !== null) {
            let value = m[2] !== undefined ? m[2] : m[3];
            if (value) {
                value = value.trim();
            }
            props[m[1]] = value;
        }

        return { widgetType, props };
    }

    let skipRendering = false;

    for (let i = 0; i < lambdaLines.length; i++) {
        const cmd = lambdaLines[i];
        const trimmed = cmd.trim();
        if (!trimmed) continue;
        // Skip pure comments, but NOT widget markers (which start with # widget:)
        if (trimmed.startsWith("#") && !trimmed.match(/^#\s*widget:/)) continue;

        // Native Lambda Page Check
        let pageMatch = trimmed.match(/if\s*\(\s*(?:id\s*\(\s*display_page\s*\)|page|currentPage)\s*==\s*(\d+)\s*\)/);
        if (pageMatch) {
            currentPageIndex = parseInt(pageMatch[1], 10);
            continue;
        }

        // LVGL Page Check
        const lvglPageMatch = trimmed.match(/^-\s*id:\s*(\w+)/);
        if (lvglPageMatch) {
            const pageIdStr = lvglPageMatch[1];
            const numMatch = pageIdStr.match(/^page_(\d+)$/);
            currentPageIndex = numMatch ? parseInt(numMatch[1], 10) : (Array.from(nameMap.entries()).find(([k, v]) => v === pageIdStr)?.[0] || 0);
            Logger.log(`[parseSnippetYamlOffline] Processing widgets for page: ${pageIdStr} (idx ${currentPageIndex})`);
            continue;
        }

        const widgets = getCurrentPageWidgets();

        if (skipRendering) {
            // Stop skipping if we see a new widget marker, a page transition, or a line with 0 indent
            if (trimmed.match(/^(?:#\s*|\/\/\s*)widget:/) || trimmed.match(/^\s*-\s*id:/) || !cmd.match(/^\s/)) {
                skipRendering = false;
            } else {
                continue;
            }
        }

        if (trimmed.startsWith("//") || trimmed.startsWith("#")) {
            const marker = parseWidgetMarker(trimmed);
            if (marker && marker.props.id) {
                const p = marker.props;
                // Use widgetType from marker as primary source of truth to avoid property name collisions (e.g. chart 'type')
                // Only fall back to p.type if marker.widgetType is generic or missing (rare)
                const widgetType = marker.widgetType || p.type;

                // Keep p.type as the property value (e.g. "LINE") if it exists, don't overwrite it with widgetType

                if (!widgetType) {
                    Logger.warn("[parseSnippetYamlOffline] Widget marker found but no type determined:", trimmed);
                    continue;
                }

                // --- Default Dimensions Logic ---
                let defaultW = 100;
                let defaultH = 30;

                if (widgetType === "template_nav_bar") {
                    defaultW = 200;
                    defaultH = 50;
                } else if (widgetType === "touch_area") {
                    defaultW = 100;
                    defaultH = 100;
                } else if (["nav_next_page", "nav_previous_page", "nav_reload_page"].includes(widgetType)) {
                    defaultW = 80;
                    defaultH = 80;
                } else if (widgetType === "battery_icon" || widgetType === "wifi_signal" || widgetType === "icon") {
                    defaultW = 60;
                    defaultH = 60;
                }

                const widget = {
                    id: p.id,
                    type: widgetType,
                    x: parseInt(p.x || 0, 10),
                    y: parseInt(p.y || 0, 10),
                    width: parseInt(p.w || defaultW, 10),
                    height: parseInt(p.h || defaultH, 10),
                    title: p.title || "",
                    entity_id: p.entity || p.ent || "",
                    condition_entity: p.cond_ent || "",
                    condition_operator: p.cond_op || "",
                    condition_state: p.cond_state || "",
                    condition_min: p.cond_min || "",
                    condition_max: p.cond_max || "",
                    locked: (p.locked === "true"),
                    props: {}
                };

                // Common LVGL properties
                if (widgetType.startsWith("lvgl_")) {
                    // Pre-fill generic properties from p to ensure persistence of unhandled props
                    Object.entries(p).forEach(([key, val]) => {
                        if (["id", "type", "x", "y", "w", "h", "width", "height"].includes(key)) return;

                        // Basic normalization
                        if (val === "true") widget.props[key] = true;
                        else if (val === "false") widget.props[key] = false;
                        else widget.props[key] = val;
                    });

                    widget.props.hidden = (p.hidden === "true");
                    widget.props.clickable = (p.clickable !== "false");
                    widget.props.checkable = (p.checkable === "true");
                    widget.props.scrollable = (p.scrollable !== "false");
                    widget.props.floating = (p.floating === "true");
                    widget.props.ignore_layout = (p.ignore_layout === "true");
                    widget.props.scrollbar_mode = p.scrollbar_mode || "AUTO";
                    widget.props.opa = parseInt(p.opa || 255, 10);

                    // Grid cell properties (accept both short and full names)
                    const rowPos = p.grid_cell_row_pos ?? p.grid_row;
                    const colPos = p.grid_cell_column_pos ?? p.grid_col;
                    widget.props.grid_cell_row_pos = rowPos != null ? parseInt(rowPos, 10) : null;
                    widget.props.grid_cell_column_pos = colPos != null ? parseInt(colPos, 10) : null;
                    widget.props.grid_cell_row_span = parseInt(p.grid_cell_row_span || p.grid_row_span || 1, 10);
                    widget.props.grid_cell_column_span = parseInt(p.grid_cell_column_span || p.grid_col_span || 1, 10);
                    widget.props.grid_cell_x_align = p.grid_cell_x_align || p.grid_x_align || "STRETCH";
                    widget.props.grid_cell_y_align = p.grid_cell_y_align || p.grid_y_align || "STRETCH";
                }

                if (widgetType === "icon") {
                    widget.props = {
                        code: p.code || "F0595",
                        size: parseInt(p.size || 48, 10),
                        color: p.color || "black",
                        fit_icon_to_frame: (p.fit === "true" || p.fit === "1")
                    };
                } else if (widgetType === "text" || widgetType === "label") {
                    widget.props = {
                        text: p.text || "",
                        font_size: parseInt(p.font_size || p.size || 20, 10),
                        font_family: p.font_family || p.font || "Roboto",
                        font_weight: parseInt(p.font_weight || p.weight || 400, 10),
                        italic: (p.italic === "true" || p.italic === true),
                        bpp: parseInt(p.bpp || 1, 10),
                        color: p.color || "black",
                        text_align: p.align || p.text_align || "TOP_LEFT"
                    };
                } else if (widgetType === "sensor_text") {
                    widget.props = {
                        label_font_size: parseInt(p.label_font || p.label_font_size || 14, 10),
                        value_font_size: parseInt(p.value_font || p.value_font_size || 20, 10),
                        value_format: p.format || "label_value",
                        color: p.color || "black",
                        italic: (p.italic === "true" || p.italic === true || p.font_style === "italic"),
                        font_family: p.font_family || "Roboto",
                        font_weight: parseInt(p.font_weight || 400, 10),
                        prefix: p.prefix || "",
                        postfix: p.postfix || "",
                        unit: p.unit || "",
                        hide_unit: (p.hide_unit === "true" || p.hide_unit === true),
                        precision: parseInt(p.precision || -1, 10),
                        text_align: p.align || p.text_align || "TOP_LEFT",
                        label_align: p.label_align || p.align || p.text_align || "TOP_LEFT",
                        value_align: p.value_align || p.align || p.text_align || "TOP_LEFT",
                        is_local_sensor: (p.local === "true"),
                        is_text_sensor: (p.text_sensor === "true"),
                        separator: p.separator || " ~ "
                    };
                    widget.entity_id_2 = p.entity_2 || "";
                } else if (widgetType === "datetime") {
                    // Fix size persistence for datetime: use 200x60 defaults if missing, instead of generic 100x30
                    widget.width = parseInt(p.w || 200, 10);
                    widget.height = parseInt(p.h || 60, 10);

                    widget.props = {
                        format: p.format || "time_date",
                        // Support new names (time_font_size, date_font_size) and legacy names (time_size, time_font, date_size, date_font)
                        time_font_size: parseInt(p.time_font_size || p.time_size || p.time_font || 28, 10),
                        date_font_size: parseInt(p.date_font_size || p.date_size || p.date_font || 16, 10),
                        color: p.color || "black",
                        italic: (p.italic === "true" || p.italic === true || p.font_style === "italic"),
                        font_family: p.font_family || "Roboto",
                        text_align: p.align || p.text_align || "CENTER"
                    };
                } else if (widgetType === "progress_bar") {
                    widget.props = {
                        show_label: (p.show_label !== "false"),
                        show_percentage: (p.show_pct !== "false"),
                        bar_height: parseInt(p.bar_h || p.bar_height || 15, 10),
                        border_width: parseInt(p.border_w || p.border || 1, 10),
                        color: p.color || "black",
                        is_local_sensor: (p.local === "true")
                    };
                } else if (widgetType === "battery_icon") {
                    widget.props = {
                        size: parseInt(p.size || 32, 10),
                        font_size: parseInt(p.font_size || 12, 10),
                        color: p.color || "black",
                        is_local_sensor: (p.local === "true"),
                        fit_icon_to_frame: (p.fit === "true" || p.fit === "1")
                    };
                } else if (widgetType === "wifi_signal") {
                    widget.props = {
                        size: parseInt(p.size || 24, 10),
                        font_size: parseInt(p.font_size || 12, 10),
                        color: p.color || "black",
                        is_local_sensor: (p.local !== "false"),
                        show_dbm: (p.show_dbm !== "false"),
                        fit_icon_to_frame: (p.fit === "true" || p.fit === "1")
                    };
                } else if (widgetType === "ondevice_temperature") {
                    widget.props = {
                        size: parseInt(p.size || 32, 10),
                        font_size: parseInt(p.font_size || 16, 10),
                        label_font_size: parseInt(p.label_font_size || 10, 10),
                        color: p.color || "black",
                        unit: p.unit || "°C",
                        precision: parseInt(p.precision || 1, 10),
                        show_label: (p.show_label !== "false"),
                        is_local_sensor: (p.local !== "false"),
                        fit_icon_to_frame: (p.fit === "true" || p.fit === "1")
                    };
                } else if (widgetType === "ondevice_humidity") {
                    widget.props = {
                        size: parseInt(p.size || 32, 10),
                        font_size: parseInt(p.font_size || 16, 10),
                        label_font_size: parseInt(p.label_font_size || 10, 10),
                        color: p.color || "black",
                        unit: p.unit || "%",
                        precision: parseInt(p.precision || 0, 10),
                        show_label: (p.show_label !== "false"),
                        is_local_sensor: (p.local !== "false"),
                        fit_icon_to_frame: (p.fit === "true" || p.fit === "1")
                    };
                } else if (widgetType === "weather_icon") {
                    widget.props = {
                        size: parseInt(p.size || 48, 10),
                        color: p.color || "black"
                    };
                } else if (widgetType === "qr_code") {
                    widget.props = {
                        value: p.value || "https://esphome.io",
                        scale: parseInt(p.scale || 2, 10),
                        ecc: p.ecc || "LOW",
                        color: p.color || "black"
                    };
                } else if (widgetType === "image") {
                    widget.props = {
                        path: (p.path || "").replace(/^"|"$/g, ''),
                        invert: (p.invert === "true" || p.invert === "1"),
                        dither: p.dither || "FLOYDSTEINBERG",
                        transparency: p.transparency || "",
                        image_type: p.img_type || "BINARY",
                        render_mode: p.render_mode || "Auto"
                    };
                } else if (widgetType === "online_image") {
                    widget.props = {
                        url: p.url || "",
                        invert: (p.invert === "true" || p.invert === "1"),
                        interval_s: parseInt(p.interval || 300, 10),
                        render_mode: p.render_mode || "Auto"
                    };
                } else if (widgetType === "puppet") {
                    widget.props = {
                        image_url: p.url || "",
                        invert: (p.invert === "true" || p.invert === "1"),
                        image_type: p.img_type || "RGB565",
                        transparency: p.transparency || "opaque",
                        render_mode: p.render_mode || "Auto"
                    };
                } else if (widgetType === "shape_rect") {
                    widget.props = {
                        fill: (p.fill === "true" || p.fill === "1"),
                        border_width: parseInt(p.border || 1, 10),
                        color: p.color || "black",
                        border_color: p.border_color || p.color || "black",
                        opacity: parseInt(p.opacity || 100, 10)
                    };
                } else if (widgetType === "touch_area") {
                    widget.props = {
                        title: p.title || "Touch Area",
                        color: p.color || "rgba(0, 0, 255, 0.2)",
                        border_color: p.border_color || "#0000ff",
                        icon: p.icon || "",
                        icon_pressed: p.icon_pressed || "",
                        icon_size: parseInt(p.icon_size || 40, 10),
                        icon_color: p.icon_color || "black",
                        nav_action: p.nav_action || "none"
                    };
                } else if (widgetType === "rounded_rect") {
                    widget.props = {
                        fill: (p.fill === "true" || p.fill === "1"),
                        // Robustly parse show_border, defaulting to true if not explicitly false
                        show_border: (p.show_border !== "false" && p.show_border !== "0"),
                        border_width: parseInt(p.border || 4, 10),
                        radius: parseInt(p.radius || 10, 10),
                        color: p.color || "black",
                        border_color: p.border_color || "black",
                        opacity: parseInt(p.opacity || 100, 10)
                    };
                } else if (widgetType === "shape_circle") {
                    widget.props = {
                        fill: (p.fill === "true" || p.fill === "1"),
                        border_width: parseInt(p.border || 1, 10),
                        color: p.color || "black",
                        border_color: p.border_color || p.color || "black",
                        opacity: parseInt(p.opacity || 100, 10)
                    };
                } else if (widgetType === "line") {
                    widget.props = {
                        stroke_width: parseInt(p.stroke || 3, 10),
                        color: p.color || "black",
                        orientation: p.orientation || "horizontal"
                    };
                } else if (widgetType === "graph") {
                    widget.entity_id = p.entity || "";
                    widget.props = {
                        duration: p.duration || "1h",
                        border: (p.border === "true" || p.border === "1" || p.border == null),
                        grid: (p.grid === "true" || p.grid === "1" || p.grid == null),
                        color: p.color || "black",
                        x_grid: p.x_grid || "",
                        y_grid: p.y_grid || "",
                        line_thickness: parseInt(p.line_thickness || 3, 10),
                        line_type: p.line_type || "SOLID",
                        continuous: (p.continuous !== "false" && p.continuous !== "0"),
                        min_value: p.min_value || "",
                        max_value: p.max_value || "",
                        min_range: p.min_range || "",
                        max_range: p.max_range || "",
                        is_local_sensor: (p.local === "true")
                    };
                } else if (widgetType === "quote_rss") {
                    widget.props = {
                        feed_url: p.feed_url || "https://www.brainyquote.com/link/quotebr.rss",
                        show_author: (p.show_author !== "false"),
                        random: (p.random !== "false"),
                        refresh_interval: p.refresh_interval || p.refresh || "24h",
                        quote_font_size: parseInt(p.quote_font_size || p.quote_font || 18, 10),
                        author_font_size: parseInt(p.author_font_size || p.author_font || 14, 10),
                        font_family: p.font_family || p.font || "Roboto",
                        font_weight: parseInt(p.font_weight || p.weight || 400, 10),
                        color: p.color || "black",
                        text_align: p.align || p.text_align || "TOP_LEFT",
                        word_wrap: (p.word_wrap !== "false" && p.wrap !== "false"),
                        italic_quote: (p.italic_quote !== "false")
                    };
                } else if (widgetType === "weather_forecast") {
                    widget.props = {
                        weather_entity: p.weather_entity || "",
                        layout: p.layout || "horizontal",
                        show_high_low: (p.show_high_low !== "false"),
                        day_font_size: parseInt(p.day_font_size || 12, 10),
                        temp_font_size: parseInt(p.temp_font_size || 14, 10),
                        icon_size: parseInt(p.icon_size || 32, 10),
                        font_family: p.font_family || "Roboto",
                        color: p.color || "black"
                    };
                } else if (widgetType === "template_sensor_bar") {
                    widget.props = {
                        show_wifi: (p.wifi !== "false"),
                        show_temperature: (p.temp !== "false"),
                        show_humidity: (p.hum !== "false"),
                        show_battery: (p.bat !== "false"),
                        show_background: (p.bg !== "false"),
                        background_color: p.bg_color || "gray",
                        border_radius: parseInt(p.radius || 8, 10),
                        icon_size: parseInt(p.icon_size || 20, 10),
                        font_size: parseInt(p.font_size || 14, 10),
                        color: p.color || "black"
                    };
                } else if (widgetType === "template_nav_bar") {
                    widget.props = {
                        show_prev: (p.prev !== "false"),
                        show_home: (p.home !== "false"),
                        show_next: (p.next !== "false"),
                        show_background: (p.bg !== "false"),
                        background_color: p.bg_color || "gray",
                        border_radius: parseInt(p.radius || 8, 10),
                        icon_size: parseInt(p.icon_size || 24, 10),
                        color: p.color || "black"
                    };
                } else if (widgetType === "lvgl_button") {

                    Logger.log("[YAML_IMPORT] Parsing lvgl_button", p.id, p);
                    widget.props = {
                        ...widget.props,
                        text: p.text || "BTN",
                        bg_color: p.bg_color || "white",
                        color: p.color || "black",
                        border_width: parseInt(p.border_width || p.border || 2, 10),
                        radius: parseInt(p.radius || 5, 10),
                        checkable: (p.checkable === "true")
                    };
                    if (p.title) widget.title = p.title;
                } else if (widgetType === "lvgl_arc") {
                    widget.props = {
                        ...widget.props,
                        min: parseInt(p.min || 0, 10),
                        max: parseInt(p.max || 100, 10),
                        value: parseInt(p.value || 0, 10),
                        thickness: parseInt(p.thickness || 10, 10),
                        color: p.color || "blue",
                        start_angle: parseInt(p.start_angle || 135, 10),
                        end_angle: parseInt(p.end_angle || 45, 10),
                        mode: p.mode || "NORMAL"
                    };
                    // Ensure title is captured for Arc
                    if (p.title) {
                        widget.title = p.title;
                        widget.props.title = p.title;
                    }
                } else if (widgetType === "lvgl_chart") {
                    widget.props = {
                        ...widget.props,
                        title: p.title || "Graph",
                        type: p.type || "LINE",
                        color: p.color || "black",
                        bg_color: p.bg_color || "white",
                        point_count: parseInt(p.point_count || 10, 10),
                        x_div_lines: parseInt(p.x_div_lines || 3, 10),
                        y_div_lines: parseInt(p.y_div_lines || 3, 10)
                    };
                    if (p.title) widget.title = p.title;

                } else if (widgetType === "lvgl_img") {
                    widget.props = {
                        ...widget.props,
                        src: p.src || "symbol_image",
                        rotation: parseInt(p.rotation || 0, 10),
                        scale: parseInt(p.scale || 256, 10),
                        pivot_x: parseInt(p.pivot_x || 0, 10),
                        pivot_y: parseInt(p.pivot_y || 0, 10),
                        color: p.color || "black"
                    };

                } else if (widgetType === "lvgl_qrcode") {
                    widget.props = {
                        ...widget.props,
                        text: p.text || "https://esphome.io",
                        scale: parseInt(p.scale || 2, 10),
                        color: p.color || "black",
                        bg_color: p.bg_color || "white"
                    };

                } else if (widgetType === "lvgl_bar") {
                    widget.props = {
                        ...widget.props,
                        min: parseInt(p.min || 0, 10),
                        max: parseInt(p.max || 100, 10),
                        value: parseInt(p.value || 0, 10),
                        color: p.color || "blue",
                        bg_color: p.bg_color || "gray",
                        start_value: parseInt(p.start_value || 0, 10),
                        mode: p.mode || "NORMAL"
                    };

                } else if (widgetType === "lvgl_slider") {
                    widget.props = {
                        ...widget.props,
                        min: parseInt(p.min || 0, 10),
                        max: parseInt(p.max || 100, 10),
                        value: parseInt(p.value || 30, 10),
                        border_width: parseInt(p.border_width || 2, 10),
                        color: p.color || "blue",
                        bg_color: p.bg_color || "gray",
                        mode: p.mode || "NORMAL",
                        vertical: (p.vertical === "true" || p.vertical === true)
                    };
                } else if (widgetType === "lvgl_tabview") {
                    widget.props = {
                        ...widget.props,
                        bg_color: p.bg_color || "white",
                        tabs: (p.tabs || "").split(",").map(t => t.trim()).filter(t => t)
                    };
                } else if (widgetType === "lvgl_tileview") {
                    widget.props = {
                        ...widget.props,
                        bg_color: p.bg_color || "white",
                        tiles: [] // tile structure not easily parseable from flat props yet, defaulting empty
                    };
                } else if (widgetType === "lvgl_led") {
                    widget.props = {
                        ...widget.props,
                        color: p.color || "red",
                        brightness: parseInt(p.brightness || 255, 10)
                    };
                } else if (widgetType === "lvgl_spinner") {
                    widget.props = {
                        ...widget.props,
                        spin_time: parseInt(p.spin_time || 1000, 10),
                        arc_length: parseInt(p.arc_length || 60, 10),
                        arc_color: p.arc_color || "blue",
                        track_color: p.track_color || "white"
                    };
                } else if (widgetType === "lvgl_buttonmatrix") {
                    widget.props = {
                        ...widget.props,
                        rows: [] // Complex structure, placeholder for now
                    };
                } else if (widgetType === "lvgl_checkbox") {
                    widget.props = {
                        ...widget.props,
                        text: (p.text || "Checkbox").replace(/^"|"$/g, ''),
                        checked: (p.checked === "true" || p.checked === true),
                        color: p.color || "blue"
                    };
                } else if (widgetType === "lvgl_dropdown") {
                    widget.props = {
                        ...widget.props,
                        options: (p.options || "").replace(/\\n/g, "\n"), // handle escaped newlines
                        selected_index: parseInt(p.selected_index || 0, 10),
                        color: p.color || "white",
                        direction: p.direction || "DOWN",
                        max_height: parseInt(p.max_height || 200, 10)
                    };
                } else if (widgetType === "lvgl_keyboard") {
                    widget.props = {
                        ...widget.props,
                        mode: p.mode || "TEXT_UPPER",
                        textarea_id: p.textarea || ""
                    };
                } else if (widgetType === "lvgl_roller") {
                    widget.props = {
                        ...widget.props,
                        options: (p.options || "").replace(/\\n/g, "\n"),
                        visible_row_count: parseInt(p.visible_row_count || 3, 10),
                        color: p.color || "white",
                        bg_color: p.bg_color || "black",
                        selected_bg_color: p.selected_bg_color || "blue",
                        selected_text_color: p.selected_text_color || "white",
                        mode: p.mode || "NORMAL"
                    };
                } else if (widgetType === "lvgl_spinbox") {
                    widget.props = {
                        ...widget.props,
                        min: parseInt(p.range_from || p.min || 0, 10),
                        max: parseInt(p.range_to || p.max || 100, 10),
                        digit_count: parseInt(p.digits || p.digit_count || 4, 10),
                        step: parseInt(p.step || 1, 10),
                        value: parseInt(p.value || 0, 10)
                    };
                } else if (widgetType === "lvgl_switch") {
                    widget.props = {
                        ...widget.props,
                        checked: (p.state === "true" || p.state === true || p.checked === "true"),
                        bg_color: p.bg_color || "gray",
                        color: p.color || "blue", // indicator
                        knob_color: p.knob_color || "white"
                    };
                } else if (widgetType === "lvgl_textarea") {
                    widget.props = {
                        ...widget.props,
                        placeholder: (p.placeholder_text || p.placeholder || "").replace(/^"|"$/g, ''),
                        text: (p.text || "").replace(/^"|"$/g, ''),
                        one_line: (p.one_line === "true" || p.one_line === true),
                        max_length: parseInt(p.max_length || 0, 10),
                        password_mode: (p.password_mode === "true"),
                        accepted_chars: p.accepted_chars || ""
                    };
                } else if (widgetType === "lvgl_label") {
                    widget.props = {
                        ...widget.props,
                        text: (p.text || "Label").replace(/^"|"$/g, ''),
                        font_size: parseInt(p.font_size || p.size || 20, 10),
                        font_family: p.font_family || "Roboto",
                        font_weight: parseInt(p.font_weight || 400, 10),
                        italic: (p.italic === "true" || p.italic === true),
                        color: p.color || "black",
                        bg_color: p.bg_color || "transparent",
                        text_align: p.text_align || p.align || "CENTER"
                    };
                } else if (widgetType === "lvgl_line") {
                    widget.props = {
                        ...widget.props,
                        orientation: p.orientation || "horizontal",
                        points: p.points || "", // Keep points if present for backward combat, but orientation rules
                        line_width: parseInt(p.line_width || 3, 10),
                        line_color: p.line_color || p.color || "black",
                        line_rounded: (p.line_rounded !== "false")
                    };
                } else if (widgetType === "lvgl_meter") {
                    widget.props = {
                        ...widget.props,
                        min: parseInt(p.min || 0, 10),
                        max: parseInt(p.max || 100, 10),
                        value: parseInt(p.value || 60, 10),
                        color: p.color || "black",
                        indicator_color: p.indicator_color || "red",
                        tick_count: parseInt(p.tick_count || 11, 10),
                        tick_length: parseInt(p.tick_length || 10, 10),
                        label_gap: parseInt(p.label_gap || 10, 10),
                        scale_width: parseInt(p.scale_width || 10, 10),
                        indicator_width: parseInt(p.indicator_width || 4, 10)
                    };
                } else if (widgetType === "lvgl_obj") {
                    widget.props = {
                        ...widget.props,
                        color: p.color || "white",
                        border_width: parseInt(p.border_width || 1, 10),
                        border_color: p.border_color || "gray",
                        radius: parseInt(p.radius || 0, 10)
                    };

                } else if (widgetType.startsWith("lvgl_")) {
                    // Generic fallback for other LVGL widgets
                    // Copy all props from p to widget.props, converting "true"/"false" strings
                    // IMPORTANT: Start with existing widget.props to preserve common LVGL props (hidden, grid, etc.)
                    // AND avoid overwriting them with raw strings from 'p'
                    Logger.log("[YAML_IMPORT] Parsing generic LVGL", widgetType, p.id, p);
                    const existingProps = widget.props || {};
                    widget.props = { ...existingProps };

                    const commonKeys = [
                        "hidden", "clickable", "checkable", "scrollable", "floating",
                        "ignore_layout", "scrollbar_mode", "opa",
                        "grid_cell_row_pos", "grid_cell_column_pos",
                        "grid_cell_row_span", "grid_cell_column_span",
                        "grid_cell_x_align", "grid_cell_y_align"
                    ];

                    Object.entries(p).forEach(([key, val]) => {
                        if (key === "id" || key === "type" || key === "x" || key === "y" || key === "w" || key === "h") return;
                        if (commonKeys.includes(key)) return;

                        if (key === "title") {
                            widget.title = val;
                            return;
                        }
                        if (val === "true") widget.props[key] = true;
                        else if (val === "false") widget.props[key] = false;
                        else if (Array.isArray(val)) {
                            if (key === "options") widget.props[key] = val.join("\n");
                            else if (key === "points") widget.props[key] = val.map(pt => Array.isArray(pt) ? pt.join(",") : String(pt)).join(" ");
                            else widget.props[key] = val;
                        }
                        else widget.props[key] = val;
                    });
                } else if (widgetType === "calendar") {
                    Logger.log("[YAML_IMPORT] Parsing calendar", p.id, p);
                    widget.props = {
                        entity_id: p.entity || "sensor.esp_calendar_data",
                        border_width: parseInt(p.border_width || 2, 10),
                        show_border: (p.show_border !== "false"),
                        border_color: p.border_color || "black",
                        background_color: p.background_color || "white",
                        text_color: p.text_color || "black",
                        font_size_date: parseInt(p.font_size_date || 100, 10),
                        font_size_day: parseInt(p.font_size_day || 24, 10),
                        font_size_grid: parseInt(p.font_size_grid || 14, 10),
                        font_size_event: parseInt(p.font_size_event || 18, 10)
                    };
                }

                widgets.push(widget);
                skipRendering = true;
                continue;
            }
            continue;
        }

        let m;

        m = trimmed.match(/^it\.rectangle\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*COLOR_OFF)?\s*\)\s*;?/);
        if (m) {
            widgets.push({
                id: "w_rect_" + widgets.length,
                type: "shape_rect",
                x: parseInt(m[1], 10),
                y: parseInt(m[2], 10),
                width: parseInt(m[3], 10),
                height: parseInt(m[4], 10),
                title: "",
                entity_id: "",
                props: {
                    fill: false,
                    border_width: 1,
                    color: "black",
                    opacity: 100
                }
            });
            continue;
        }

        m = trimmed.match(/^it\.filled_rectangle\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*COLOR_OFF)?\s*\)\s*;?/);
        if (m) {
            widgets.push({
                id: "w_frect_" + widgets.length,
                type: "shape_rect",
                x: parseInt(m[1], 10),
                y: parseInt(m[2], 10),
                width: parseInt(m[3], 10),
                height: parseInt(m[4], 10),
                title: "",
                entity_id: "",
                props: {
                    fill: true,
                    border_width: 1,
                    color: "black",
                    opacity: 100
                }
            });
            continue;
        }

        m = trimmed.match(/^it\.circle\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*COLOR_OFF)?\s*\)\s*;?/);
        if (m) {
            const r = parseInt(m[3], 10);
            widgets.push({
                id: "w_circle_" + widgets.length,
                type: "shape_circle",
                x: parseInt(m[1], 10) - r,
                y: parseInt(m[2], 10) - r,
                width: r * 2,
                height: r * 2,
                title: "",
                entity_id: "",
                props: {
                    fill: false,
                    border_width: 1,
                    color: "black",
                    opacity: 100
                }
            });
            continue;
        }

        m = trimmed.match(/^it\.filled_circle\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*COLOR_OFF)?\s*\)\s*;?/);
        if (m) {
            const r = parseInt(m[3], 10);
            widgets.push({
                id: "w_fcircle_" + widgets.length,
                type: "shape_circle",
                x: parseInt(m[1], 10) - r,
                y: parseInt(m[2], 10) - r,
                width: r * 2,
                height: r * 2,
                title: "",
                entity_id: "",
                props: {
                    fill: true,
                    border_width: 1,
                    color: "black",
                    opacity: 100
                }
            });
            continue;
        }

        m = trimmed.match(/^it\.line\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*;?/);
        if (m) {
            const x1 = parseInt(m[1], 10);
            const y1 = parseInt(m[2], 10);
            const x2 = parseInt(m[3], 10);
            const y2 = parseInt(m[4], 10);
            widgets.push({
                id: "w_line_" + widgets.length,
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
            });
            continue;
        }

        // --- NATIVE YAML PARSING (FALLBACK) ---
        // If we didn't find a marker or a drawing command, check for native widget tags like "- label:"
        const nativeRegex = new RegExp(`^(\\s*)-?\\s*(${WIDGET_TAGS.join('|')}):\\s*(.*)$`);
        const mNative = cmd.match(nativeRegex);

        if (mNative) {
            const indent = mNative[1].length;
            const nativeTag = mNative[2];
            const inlineValue = mNative[3].trim();

            const widgetType = TAG_MAP[nativeTag] || `lvgl_${nativeTag}`;

            // Start collecting properties for this native widget
            const nativeProps = {};
            if (inlineValue) {
                nativeProps._inline = inlineValue.replace(/^["']|["']$/g, "");
            }

            const res = parseYamlSubBlock(lambdaLines, i + 1, indent + 2);
            Object.assign(nativeProps, res.value);
            i = res.nextJ - 1;

            const widgetId = nativeProps.id || `lv_${nativeTag}_${widgets.length}`;
            const widget = {
                id: widgetId,
                type: widgetType,
                x: parseInt(nativeProps.x || 0, 10),
                y: parseInt(nativeProps.y || 0, 10),
                width: parseInt(nativeProps.width || nativeProps.w || 100, 10),
                height: parseInt(nativeProps.height || nativeProps.h || 30, 10),
                title: nativeProps.title || nativeProps.name || "",
                entity_id: nativeProps.entity_id || nativeProps.entity || nativeProps.sensor || "",
                props: {}
            };

            // Common LVGL properties from native YAML
            widget.props.hidden = (nativeProps.hidden === "true");
            widget.props.clickable = (nativeProps.clickable !== "false");
            widget.props.scrollable = (nativeProps.scrollable !== "false");
            if (nativeProps.bg_color) widget.props.bg_color = nativeProps.bg_color;
            if (nativeProps.bg_opa) {
                let opa = nativeProps.bg_opa;
                if (opa.toString().endsWith("%")) {
                    opa = Math.round(parseFloat(opa) * 2.55);
                }
                widget.props.opa = parseInt(opa, 10);
            }
            if (nativeProps.text) widget.props.text = nativeProps.text;
            else if (nativeProps._inline && nativeTag === "label") widget.props.text = nativeProps._inline;

            // Improved property mapping and data type handling
            Object.entries(nativeProps).forEach(([k, v]) => {
                if (["id", "x", "y", "width", "height", "w", "h", "type", "bg_color", "bg_opa", "_inline", "widgets"].includes(k)) return;

                // Handle nested styles (indicator, knob) by flattening or mapping
                if (k === "indicator" || k === "knob" || k === "selected") {
                    if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
                        Object.entries(v).forEach(([sk, sv]) => {
                            widget.props[`${k}_${sk}`] = sv;
                        });
                        return;
                    }
                }

                // Normalization: Join arrays for internal properties that expect strings
                let val = v;
                if (Array.isArray(v)) {
                    if (k === "options") {
                        val = v.join("\n");
                    } else if (k === "points") {
                        val = v.map(pt => Array.isArray(pt) ? pt.join(",") : String(pt)).join(" ");
                    }
                } else if (typeof v === 'string') {
                    // Strip units from numeric values
                    if (/^-?\d+(\.\d+)?(ms|deg|px|%)$/.test(v)) {
                        val = v.replace(/(ms|deg|px|%)$/, "");
                    }
                }

                if (widget.props[k] === undefined) {
                    if (val === "true") widget.props[k] = true;
                    else if (val === "false") widget.props[k] = false;
                    else if (!isNaN(val) && val !== "" && k !== "text" && k !== "id" && k !== "name" && typeof val !== 'object') {
                        widget.props[k] = parseFloat(val);
                    }
                    else {
                        // Handle potential escaped Unicode in text
                        if (typeof val === 'string' && val.includes("\\u")) {
                            try {
                                widget.props[k] = JSON.parse(`"${val}"`);
                            } catch (e) { widget.props[k] = val; }
                        } else {
                            widget.props[k] = val;
                        }
                    }
                }
            });

            widgets.push(widget);

            // Handle nested widgets (flattening into the page for now)
            if (Array.isArray(nativeProps.widgets)) {
                nativeProps.widgets.forEach(nw => {
                    const tag = Object.keys(nw)[0];
                    const nwProps = nw[tag];
                    if (tag && nwProps) {
                        const nwType = TAG_MAP[tag] || `lvgl_${tag}`;
                        const nestedWidget = {
                            id: nwProps.id || `lv_${tag}_${widgets.length}`,
                            type: nwType,
                            x: widget.x + parseInt(nwProps.x || 0, 10), // Relative to parent
                            y: widget.y + parseInt(nwProps.y || 0, 10),
                            width: parseInt(nwProps.width || nwProps.w || 50, 10),
                            height: parseInt(nwProps.height || nwProps.h || 20, 10),
                            props: { ...nwProps }
                        };
                        widgets.push(nestedWidget);
                    }
                });
            }
        }
    }

    return layout;
}

/**
 * Loads a parsed layout into the application state.
 * @param {Object} layout - The parsed layout object.
 */
export function loadLayoutIntoState(layout) {
    if (!layout) {
        Logger.error("Invalid layout - null or undefined");
        throw new Error("invalid_layout");
    }

    // --- Legacy HA Storage Adapter ---
    // Check if this is a raw HA storage dump (e.g. from .storage/esphome_designer)
    // Format: { version: 1, key: "...", data: { devices: { "device_id": { ... } } } }
    if (layout.data && layout.data.devices) {
        const deviceIds = Object.keys(layout.data.devices);
        if (deviceIds.length > 0) {
            const firstDeviceId = deviceIds[0];
            Logger.log(`[loadLayoutIntoState] Detected legacy HA storage format. unwrapping device: ${firstDeviceId}`);
            // Swap the wrapper for the actual inner layout object
            layout = layout.data.devices[firstDeviceId];
        }
    }
    // ---------------------------------

    if (!Array.isArray(layout.pages)) {
        Logger.error("Invalid layout - missing pages array");
        throw new Error("invalid_layout");
    }

    const pages = layout.pages.map((p, idx) => ({
        ...p,  // Preserve all properties from imported page
        id: p.id || `page_${idx}`,
        name: p.name || `Page ${idx + 1}`,
        widgets: Array.isArray(p.widgets) ? p.widgets : []
    }));

    if (!pages.length) {
        Logger.warn("No pages, creating default empty page");
        pages.push({
            id: "page_0",
            name: "Imported",
            widgets: []
        });
    }

    // Set current layout ID from the layout data
    // Only update if the layout has a device_id or currentLayoutId - don't reset an existing valid ID
    const importedLayoutId = layout.device_id || layout.currentLayoutId;
    if (importedLayoutId) {
        const currentId = AppState.currentLayoutId;
        if (currentId !== importedLayoutId) {
            Logger.log(`[loadLayoutIntoState] Updating currentLayoutId: ${currentId} -> ${importedLayoutId}`);
            AppState.setCurrentLayoutId(importedLayoutId);
        }
    } else {
        Logger.log(`[loadLayoutIntoState] No device_id in layout, keeping currentLayoutId: ${AppState.currentLayoutId}`);
    }

    // Set device name from layout
    const importedName = layout.name || layout.deviceName;
    if (importedName) {
        AppState.setDeviceName(importedName);
    }

    // Set device model from layout (check multiple possible locations)
    const deviceModel = layout.device_model || layout.deviceModel || (layout.settings ? (layout.settings.device_model || layout.settings.deviceModel) : null);
    if (deviceModel) {
        AppState.setDeviceModel(deviceModel);
    }

    // Set custom hardware if present
    const customHardware = layout.custom_hardware || layout.customHardware;
    if (customHardware) {
        AppState.setCustomHardware(customHardware);
    }

    // Set protocol hardware if present
    const protocolHardware = layout.protocol_hardware || layout.protocolHardware;
    if (protocolHardware) {
        AppState.updateProtocolHardware(protocolHardware);
    }

    // Merge imported settings with existing settings
    // IMPORTANT: Settings might be at the root (flattened by saveLayoutToBackend) 
    // or in a nested .settings object.
    const currentSettings = AppState.getSettings();
    const importedSettings = layout.settings || {};

    // Map of root keys to their AppState (camelCase) equivalents
    const rootMapping = {
        "orientation": "orientation",
        "dark_mode": "darkMode",
        "darkMode": "darkMode",
        "sleep_enabled": "sleepEnabled",
        "sleepEnabled": "sleepEnabled",
        "sleep_start_hour": "sleepStartHour",
        "sleepStartHour": "sleepStartHour",
        "sleep_end_hour": "sleepEndHour",
        "sleepEndHour": "sleepEndHour",
        "manual_refresh_only": "manualRefreshOnly",
        "manualRefreshOnly": "manualRefreshOnly",
        "deep_sleep_enabled": "deepSleepEnabled",
        "deepSleepEnabled": "deepSleepEnabled",
        "deep_sleep_interval": "deepSleepInterval",
        "deepSleepInterval": "deepSleepInterval",
        "daily_refresh_enabled": "dailyRefreshEnabled",
        "dailyRefreshEnabled": "dailyRefreshEnabled",
        "daily_refresh_time": "dailyRefreshTime",
        "dailyRefreshTime": "dailyRefreshTime",
        "no_refresh_start_hour": "noRefreshStartHour",
        "noRefreshStartHour": "noRefreshStartHour",
        "no_refresh_end_hour": "noRefreshEndHour",
        "noRefreshEndHour": "noRefreshEndHour",
        "auto_cycle_enabled": "autoCycleEnabled",
        "autoCycleEnabled": "autoCycleEnabled",
        "auto_cycle_interval_s": "autoCycleIntervalS",
        "autoCycleIntervalS": "autoCycleIntervalS",
        "refresh_interval": "refreshInterval",
        "refreshInterval": "refreshInterval",
        "rendering_mode": "renderingMode",
        "renderingMode": "renderingMode",
        "lcd_eco_strategy": "lcdEcoStrategy",
        "lcdEcoStrategy": "lcdEcoStrategy",
        "extended_latin_glyphs": "extendedLatinGlyphs",
        "extendedLatinGlyphs": "extendedLatinGlyphs",
        "inverted_colors": "invertedColors",
        "invertedColors": "invertedColors",
        "width": "width",
        "resWidth": "width",
        "height": "height",
        "resHeight": "height",
        "shape": "shape",
        "oepl_entity_id": "oeplEntityId",
        "oeplEntityId": "oeplEntityId",
        "oepl_dither": "oeplDither",
        "oeplDither": "oeplDither",
        "glyphsets": "glyphsets"
    };

    // Extract root settings and normalize to camelCase
    const rootSettings = {};
    Object.entries(rootMapping).forEach(([layoutKey, appStateKey]) => {
        if (layout[layoutKey] !== undefined) {
            rootSettings[appStateKey] = layout[layoutKey];
        }
    });

    // Also normalize importedSettings if they were nested
    const normalizedImported = {};
    Object.entries(importedSettings).forEach(([key, val]) => {
        const mappedKey = rootMapping[key] || key;
        normalizedImported[mappedKey] = val;
    });

    const newSettings = { ...currentSettings, ...normalizedImported, ...rootSettings };

    // DEBUG: Log renderingMode sources
    console.log('[loadLayoutIntoState] DEBUG renderingMode:', {
        fromLayout: layout.renderingMode || layout.rendering_mode,
        currentSettings: currentSettings.renderingMode,
        normalizedImported: normalizedImported.renderingMode,
        rootSettings: rootSettings.renderingMode,
        finalNewSettings: newSettings.renderingMode
    });

    // Ensure device_name is in settings too (for Device Settings modal)
    if (importedName) {
        newSettings.device_name = importedName;
        newSettings.deviceName = importedName;
    }

    // Ensure device_model is in settings too
    if (deviceModel) {
        newSettings.device_model = deviceModel;
        newSettings.deviceModel = deviceModel;
    }

    // --- LVGL Safety Fix for E-Paper ---
    // If the device is detected as E-Paper and doesn't explicitly support LVGL in its profile,
    // force it back to 'direct' mode to prevent generating invalid LVGL config.
    const activeProfile = DEVICE_PROFILES[deviceModel];
    if (activeProfile && activeProfile.features) {
        const isEpaper = !!activeProfile.features.epaper;
        const hasLvgl = !!(activeProfile.features.lvgl || activeProfile.features.lv_display);

        // Only repair if explicitly set to 'lvgl' but profile doesn't support it
        if (isEpaper && !hasLvgl && newSettings.renderingMode === 'lvgl') {
            // Smart Check: Only repair if NO LVGL widgets are actually used.
            // This preserves user intent if they intentionally added LVGL widgets to e-paper.
            const hasLvglWidgets = pages.some(p =>
                p.widgets && p.widgets.some(w => w.type && w.type.startsWith('lvgl_'))
            );

            if (!hasLvglWidgets) {
                Logger.log(`[loadLayoutIntoState] E-Paper detected without LVGL support and NO LVGL widgets found. Repairing renderingMode: lvgl -> direct`);
                newSettings.renderingMode = 'direct';
            }
        }
    }

    // Update State
    AppState.setPages(pages);
    AppState.setSettings(newSettings);
    // Preserve current page index if valid, otherwise reset to 0
    const currentIndex = AppState.currentPageIndex;
    if (currentIndex >= 0 && currentIndex < pages.length) {
        AppState.setCurrentPageIndex(currentIndex);
    } else {
        AppState.setCurrentPageIndex(0);
    }

    // Note: AppState emits EVENTS.STATE_CHANGED and EVENTS.PAGE_CHANGED,
    // which should trigger UI updates in Sidebar, Canvas, and PropertiesPanel.
    // The legacy editor.js has a sync mechanism that listens for these events
    // to update its own 'pages' array for renderCanvas() compatibility.
    Logger.log(`[loadLayoutIntoState] Layout loaded with ${pages.length} pages. Current Layout ID: ${AppState.currentLayoutId}`);
    Logger.log(`[loadLayoutIntoState] Rendering mode after merge: ${newSettings.renderingMode}`);
}
