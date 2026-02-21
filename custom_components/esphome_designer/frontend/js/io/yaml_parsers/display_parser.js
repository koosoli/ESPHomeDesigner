import { Logger } from '../../utils/logger.js';

import { buildWidgetProps } from './widget_props_map.js';
import { parseCppDrawingCommand } from './cpp_drawing_parser.js';

/**
 * Parses ESPHome YAML (or LVGL/OpenDisplay C++) blocks into a structured layout object.
 * 
 * @param {string[]} lambdaLines - Array of lines from the lambda/script block containing widgets
 * @param {string[]} rawLines - Array of all lines in the document for YAML sub-block extraction
 * @param {Object} deviceSettings - Base settings for the device layout
 * @param {Object} yaml - The loaded js-yaml module reference
 * @returns {import('../../types.js').ProjectPayload} The complete LayoutObject containing pages and widgets
 */
export function parseDisplayBlocks(lambdaLines, rawLines, deviceSettings, getESPHomeSchema, yaml) {
    const pageMap = new Map();
    const intervalMap = new Map();
    const nameMap = new Map();
    const darkModeMap = new Map();
    const refreshTypeMap = new Map();
    const refreshTimeMap = new Map();
    const visibleFromMap = new Map();
    const visibleToMap = new Map();
    const pagePropsMap = new Map();
    const layoutMap = new Map();

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
            return { value: yaml.load(yamlStr, { schema: getESPHomeSchema() }), nextJ: j };
        } catch (e) {
            Logger.error("Error parsing YAML sub-block:", e);
            return { value: null, nextJ: j };
        }
    };

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

    // First pass: Page Metadata
    for (let i = 0; i < lambdaLines.length; i++) {
        const line = lambdaLines[i];
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;

        let pageMatch = line.match(/if\s*\(\s*(?:id\s*\(\s*display_page\s*\)|page|currentPage)\s*==\s*(\d+)\s*\)/);
        if (pageMatch) {
            currentPageIndex = parseInt(pageMatch[1], 10);
            inWidgetsBlockLookahead = false;
            if (!pageMap.has(currentPageIndex)) pageMap.set(currentPageIndex, []);
        }

        const lvglPageMatch = line.match(/^\s*-\s*id:\s*(\w+)/);
        if (lvglPageMatch) {
            const pageIdStr = lvglPageMatch[1];
            const numMatch = pageIdStr.match(/^page_(\d+)$/);
            let idx = numMatch ? parseInt(numMatch[1], 10) : pageMap.size;
            if (!pageMap.has(idx)) {
                pageMap.set(idx, []);
                nameMap.set(idx, pageIdStr);
            }
            currentPageIndex = idx;
            inWidgetsBlockLookahead = false;
        }

        const layoutMatch = line.match(/^\s*layout:\s*(\d+x\d+)/);
        if (layoutMatch && currentPageIndex !== null) layoutMap.set(currentPageIndex, layoutMatch[1]);

        if (trimmedLine.startsWith("widgets:")) { inWidgetsBlockLookahead = true; continue; }

        const intervalMatch = line.match(/case\s+(\d+):\s*interval\s*=\s*(\d+);/);
        if (intervalMatch) {
            const idx = parseInt(intervalMatch[1], 10);
            intervalMap.set(idx, parseInt(intervalMatch[2], 10));
            if (!pageMap.has(idx)) pageMap.set(idx, []);
        }

        const mName = line.match(/\/\/\s*page:name\s+"(.+)"/);
        if (mName && currentPageIndex !== null) nameMap.set(currentPageIndex, mName[1]);

        const mDM = line.match(/\/\/\s*page:dark_mode\s+"(.+)"/);
        if (mDM && currentPageIndex !== null) darkModeMap.set(currentPageIndex, mDM[1]);

        const mRT = line.match(/\/\/\s*page:refresh_type\s+"(.+)"/);
        if (mRT && currentPageIndex !== null) refreshTypeMap.set(currentPageIndex, mRT[1]);

        const mTime = line.match(/\/\/\s*page:refresh_time\s+"(.*)"/);
        if (mTime && currentPageIndex !== null) refreshTimeMap.set(currentPageIndex, mTime[1]);

        const mVF = line.match(/\/\/\s*page:visible_from\s+"(.*)"/);
        if (mVF && currentPageIndex !== null) visibleFromMap.set(currentPageIndex, mVF[1]);

        const mVT = line.match(/\/\/\s*page:visible_to\s+"(.*)"/);
        if (mVT && currentPageIndex !== null) visibleToMap.set(currentPageIndex, mVT[1]);

        if (!inWidgetsBlockLookahead) {
            const pgBgColorMatch = line.match(/^\s*bg_color:\s*(.*)/);
            if (pgBgColorMatch && currentPageIndex !== null) {
                let val = pgBgColorMatch[1].trim().replace(/^["']|["']$/g, "");
                if (val.startsWith("0x")) val = "#" + val.substring(2);
                if (!pagePropsMap.has(currentPageIndex)) pagePropsMap.set(currentPageIndex, {});
                pagePropsMap.get(currentPageIndex).bg_color = val;
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

    if (pageMap.size === 0) pageMap.set(0, []);

    const layout = {
        settings: deviceSettings,
        pages: Array.from(pageMap.entries()).sort((a, b) => a[0] - b[0]).map(([idx, _]) => ({
            id: `page_${idx}`,
            name: nameMap.has(idx) ? nameMap.get(idx) : `Page ${idx + 1}`,
            refresh_s: intervalMap.has(idx) ? intervalMap.get(idx) : null,
            refresh_type: refreshTypeMap.has(idx) ? refreshTypeMap.get(idx) : "interval",
            refresh_time: refreshTimeMap.has(idx) ? refreshTimeMap.get(idx) : "",
            visible_from: visibleFromMap.has(idx) ? visibleFromMap.get(idx) : "",
            visible_to: visibleToMap.has(idx) ? visibleToMap.get(idx) : "",
            dark_mode: darkModeMap.has(idx) ? darkModeMap.get(idx) : "inherit",
            layout: layoutMap.has(idx) ? layoutMap.get(idx) : null,
            bg_color: pagePropsMap.has(idx) ? pagePropsMap.get(idx).bg_color : null,
            bg_opa: pagePropsMap.has(idx) ? pagePropsMap.get(idx).bg_opa : null,
            widgets: []
        }))
    };

    currentPageIndex = 0;
    const getCurrentPageWidgets = () => {
        const page = layout.pages.find((p, idx) => idx === currentPageIndex);
        return page ? page.widgets : layout.pages[0].widgets;
    };

    const parseWidgetMarker = (comment) => {
        const match = comment.match(/^(?:#\s*|\/\/\s*)widget:(\w+)\s+(.+)$/);
        if (!match) return null;
        const widgetType = match[1];
        const propsStr = match[2];
        const props = {};
        const regex = /(\w+):(?:"([^"]*)"|([^:]*?)(?=\s+\w+:|$))/g;
        let m;
        while ((m = regex.exec(propsStr)) !== null) {
            let value = m[2] !== undefined ? m[2] : m[3];
            if (value) value = value.trim();
            props[m[1]] = value;
        }
        return { widgetType, props };
    };

    let skipRendering = false;
    for (let i = 0; i < lambdaLines.length; i++) {
        const cmd = lambdaLines[i];
        const trimmed = cmd.trim();
        if (!trimmed) continue;
        if (trimmed.startsWith("#") && !trimmed.match(/^#\s*widget:/)) continue;

        let pageMatch = trimmed.match(/if\s*\(\s*(?:id\s*\(\s*display_page\s*\)|page|currentPage)\s*==\s*(\d+)\s*\)/);
        if (pageMatch) { currentPageIndex = parseInt(pageMatch[1], 10); continue; }

        const lvglPageMatch = trimmed.match(/^-\s*id:\s*(\w+)/);
        if (lvglPageMatch) {
            const pageIdStr = lvglPageMatch[1];
            const numMatch = pageIdStr.match(/^page_(\d+)$/);
            currentPageIndex = numMatch ? parseInt(numMatch[1], 10) : (Array.from(nameMap.entries()).find(([k, v]) => v === pageIdStr)?.[0] || 0);
            continue;
        }

        const widgets = getCurrentPageWidgets();
        if (skipRendering) {
            if (trimmed.match(/^(?:#\s*|\/\/\s*)widget:/) || trimmed.match(/^\s*-\s*id:/) || !cmd.match(/^\s/)) skipRendering = false;
            else continue;
        }

        if (trimmed.startsWith("//") || trimmed.startsWith("#")) {
            const marker = parseWidgetMarker(trimmed);
            if (marker && marker.props.id) {
                const p = marker.props;
                const widgetType = marker.widgetType || p.type;
                if (!widgetType) continue;

                const widget = {
                    id: p.id, type: widgetType,
                    x: parseInt(p.x || 0, 10), y: parseInt(p.y || 0, 10),
                    width: parseInt(p.w || 100, 10), height: parseInt(p.h || 30, 10),
                    title: p.title || "", entity_id: p.entity || p.ent || "",
                    props: {}
                };

                // Delegate property reconstruction to mapping module
                widget.props = buildWidgetProps(widgetType, p, widget);

                widgets.push(widget);
                skipRendering = true;
                continue;
            }
            continue;
        }

        // Delegate C++ drawing command parsing to specialized module
        const drawWidget = parseCppDrawingCommand(trimmed, widgets.length);
        if (drawWidget) {
            widgets.push(drawWidget);
            continue;
        }

        // --- NATIVE YAML PARSING (LVGL) ---
        const nativeRegex = new RegExp(`^(\\s*)-?\\s*(${WIDGET_TAGS.join('|')}):\\s*(.*)$`);
        const mNative = cmd.match(nativeRegex);
        if (mNative) {
            const indent = mNative[1].length;
            const nativeTag = mNative[2];
            const inlineValue = mNative[3].trim();
            const widgetType = TAG_MAP[nativeTag] || `lvgl_${nativeTag}`;
            const nativeProps = {};
            if (inlineValue) nativeProps._inline = inlineValue.replace(/^["']|["']$/g, "");
            const res = parseYamlSubBlock(lambdaLines, i + 1, indent + 2);
            Object.assign(nativeProps, res.value);
            i = res.nextJ - 1;

            const widget = {
                id: nativeProps.id || `lv_${nativeTag}_${widgets.length}`,
                type: widgetType,
                x: parseInt(nativeProps.x || 0, 10), y: parseInt(nativeProps.y || 0, 10),
                width: parseInt(nativeProps.width || nativeProps.w || 100, 10),
                height: parseInt(nativeProps.height || nativeProps.h || 30, 10),
                title: nativeProps.title || nativeProps.name || "",
                entity_id: nativeProps.entity_id || nativeProps.entity || nativeProps.sensor || "",
                props: {}
            };

            // Reuse the widget prop builder even for native YAML to avoid duplication
            widget.props = buildWidgetProps(widgetType, nativeProps, widget);
            widgets.push(widget);

            // Handle nested widgets (flattening into the page for now as per backup)
            if (Array.isArray(nativeProps.widgets)) {
                nativeProps.widgets.forEach(nw => {
                    const tag = Object.keys(nw)[0];
                    const nwProps = nw[tag];
                    if (tag && nwProps) {
                        const nwType = TAG_MAP[tag] || `lvgl_${tag}`;
                        const nestedWidget = {
                            id: nwProps.id || `lv_${tag}_${widgets.length}`,
                            type: nwType,
                            x: widget.x + (parseInt(nwProps.x || 0, 10)), // Relative to parent
                            y: widget.y + (parseInt(nwProps.y || 0, 10)),
                            width: parseInt(nwProps.width || nwProps.w || 50, 10),
                            height: parseInt(nwProps.height || nwProps.h || 20, 10),
                            props: {}
                        };
                        nestedWidget.props = buildWidgetProps(nwType, nwProps, nestedWidget);
                        widgets.push(nestedWidget);
                    }
                });
            }
        }
    }
    return layout;
}