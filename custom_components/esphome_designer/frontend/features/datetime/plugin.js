/**
 * Date & Time Plugin
 */
import { AppState } from '@core/state';
import { getWeightsForFont, clampFontWeight } from '@core/font_weights.js';

const getClockMode = (props = {}) => props.clock_mode === '12h' ? '12h' : '24h';
const getTimeStrftime = (clockMode) => clockMode === '12h' ? '%I:%M %p' : '%H:%M';
const makeSafeLvglId = (id) => String(id || '').replace(/[^a-zA-Z0-9_]/g, '_');
const getLvglDatetimeLabelId = (widgetId) => `${makeSafeLvglId(widgetId)}_text`;

const hasStyledLvglContainer = (props = {}) => {
    const borderWidth = parseInt(props.border_width ?? 0, 10) || 0;
    const bgColor = props.background_color || props.bg_color || (props.fill ? 'white' : 'transparent');
    const hasBackground = !!(props.fill || (bgColor && bgColor !== 'transparent'));
    return borderWidth > 0 || hasBackground;
};

const getLvglRefreshTarget = (widget) => hasStyledLvglContainer(widget?.props || {}) ? getLvglDatetimeLabelId(widget?.id) : widget?.id;

function insertTopLevelSectionEntries(lines, sectionName, entryLines, commentLine = '') {
    if (!Array.isArray(lines) || entryLines.length === 0) return;

    const sectionHeader = `${sectionName}:`;
    const sectionIndex = lines.findIndex((line) => line.trim() === sectionHeader);
    const linesToInsert = commentLine ? [commentLine, ...entryLines] : entryLines;

    if (sectionIndex === -1) {
        if (lines.length > 0 && lines[lines.length - 1].trim() !== '') {
            lines.push('');
        }
        if (commentLine) lines.push(commentLine);
        lines.push(sectionHeader, ...entryLines);
        return;
    }

    let insertIndex = sectionIndex + 1;
    while (insertIndex < lines.length) {
        const line = lines[insertIndex];
        if (/^[a-z0-9_]+:(\s*#.*)?$/i.test(line)) {
            break;
        }
        insertIndex++;
    }

    lines.splice(insertIndex, 0, ...linesToInsert);
}

const getTemplateConfig = (format, clockMode) => {
    const timeFormat = getTimeStrftime(clockMode);
    if (format === 'time_only') {
        return {
            template: `{{ now().strftime('${timeFormat}') }}`,
            timeFormat
        };
    }

    if (format === 'date_only') {
        return {
            template: "{{ now().strftime('%d.%m.%Y') }}",
            timeFormat
        };
    }

    if (format === 'weekday_day_month') {
        return {
            template: "{{ now().strftime('%A %d %B') }}",
            timeFormat
        };
    }

    return {
        template: `{{ now().strftime('${timeFormat}') }}\n{{ now().strftime('%a, %b %d') }}`,
        timeFormat
    };
};

const formatPreviewTime = (now, clockMode) => {
    const minutes = now.getMinutes().toString().padStart(2, '0');
    if (clockMode === '12h') {
        const hours = now.getHours();
        const hour12 = hours % 12 || 12;
        return `${String(hour12).padStart(2, '0')}:${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
    }

    return `${now.getHours().toString().padStart(2, '0')}:${minutes}`;
};

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    el.innerHTML = "";
    el.style.display = "flex";
    el.style.flexDirection = "column";
    el.style.justifyContent = "center";
    el.style.alignItems = "center";
    // Device output does not clip datetime text to the widget width, so keep the
    // preview visible even when the configured box is narrower than the text.
    el.style.overflow = "visible";

    const color = getColorStyle(props.color);
    const fontFamily = (props.font_family || "Roboto") + ", sans-serif";
    const textAlign = (props.text_align || "CENTER").toUpperCase();

    const applyFlexAlign = (align, element) => {
        if (!align) return;
        // Fix #268: Robust alignment

        // Horizontal (Main Axis -> Justify Content)
        if (align.includes("LEFT")) element.style.alignItems = "flex-start";
        else if (align.includes("RIGHT")) element.style.alignItems = "flex-end";
        else element.style.alignItems = "center"; // CENTER

        // Vertical (Cross Axis -> Align Items)
        if (align.includes("TOP")) element.style.justifyContent = "flex-start";
        else if (align.includes("BOTTOM")) element.style.justifyContent = "flex-end";
        else element.style.justifyContent = "center"; // CENTER
    };
    applyFlexAlign(textAlign, el);

    const format = props.format || "time_date";

    const body = document.createElement("div");
    body.style.display = "flex";
    body.style.flexDirection = "column";
    body.style.justifyContent = "center";
    body.style.alignItems = "center";
    body.style.width = "100%";
    body.style.height = "100%";
    body.style.overflow = "visible";
    applyFlexAlign(textAlign, body);

    // Apply Border & Background
    const borderWidth = props.border_width !== undefined ? props.border_width : 0;
    const hasBackground = props.fill || (props.bg_color && props.bg_color !== "transparent") || (props.background_color && props.background_color !== "transparent");

    if (borderWidth > 0 || hasBackground) {
        let resolvedBorderColor = props.border_color || "theme_auto";
        if (resolvedBorderColor === "theme_auto") {
            resolvedBorderColor = (AppState?.settings?.darkMode) ? "white" : "black";
        }

        if (borderWidth > 0) {
            body.style.border = `${borderWidth}px solid ${getColorStyle(resolvedBorderColor)}`;
        }

        if (hasBackground) {
            const bgCol = props.background_color || props.bg_color || (props.fill ? "white" : "transparent");
            body.style.backgroundColor = getColorStyle(bgCol);
        }

        body.style.borderRadius = `${props.border_radius || 0}px`;
        body.style.boxSizing = "border-box";
    }

    const timeDiv = document.createElement("div");
    timeDiv.style.fontSize = `${props.time_font_size || 28}px`;
    timeDiv.style.color = color;
    timeDiv.style.fontFamily = fontFamily;
    timeDiv.style.fontWeight = props.font_weight_time !== undefined ? props.font_weight_time : (props.bold_time !== false ? 700 : 400);
    timeDiv.style.whiteSpace = "nowrap";

    const dateDiv = document.createElement("div");
    dateDiv.style.fontSize = `${props.date_font_size || 16}px`;
    dateDiv.style.color = color;
    dateDiv.style.fontFamily = fontFamily;
    dateDiv.style.opacity = "0.8";
    dateDiv.style.fontWeight = props.font_weight_date !== undefined ? props.font_weight_date : (props.bold_date ? 700 : 400);
    dateDiv.style.whiteSpace = "nowrap";

    const now = new Date();
    const clockMode = getClockMode(props);
    const dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayNamesFull = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNamesFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const timeStr = formatPreviewTime(now, clockMode);
    const dateStrShort = dayNamesShort[now.getDay()] + ", " + monthNamesShort[now.getMonth()] + " " + now.getDate();
    const dateStrDots = now.getDate().toString().padStart(2, '0') + "." + (now.getMonth() + 1).toString().padStart(2, '0') + "." + now.getFullYear();
    const dateStrFull = dayNamesFull[now.getDay()] + " " + now.getDate().toString().padStart(2, '0') + " " + monthNamesFull[now.getMonth()];

    timeDiv.textContent = timeStr;

    if (format === "time_only") {
        body.appendChild(timeDiv);
    } else if (format === "date_only") {
        dateDiv.textContent = dateStrDots;
        body.appendChild(dateDiv);
    } else if (format === "weekday_day_month") {
        dateDiv.textContent = dateStrFull;
        body.appendChild(dateDiv);
    } else {
        dateDiv.textContent = dateStrShort;
        body.appendChild(timeDiv);
        body.appendChild(dateDiv);
    }

    el.appendChild(body);
};

export default {
    id: "datetime",
    name: "Date & Time",
    category: "Core",
    supportedModes: ['lvgl', 'direct', 'oepl', 'opendisplay'],
    defaults: {
        format: "time_date",
        time_font_size: 28,
        date_font_size: 16,
        color: "black",
        italic: false,
        font_family: "Roboto",
        text_align: "CENTER",
        width: 120,
        height: 50,
        bg_color: "transparent",
        border_width: 0,
        border_color: "theme_auto",
        border_radius: 0,
        opa: 255,
        clock_mode: "24h",
        bold_time: true,
        bold_date: false
    },
    renderProperties: (panel, widget) => {
        const props = widget.props || {};
        const updateProp = (key, val) => {
            const newProps = { ...widget.props, [key]: val };
            AppState.updateWidget(widget.id, { props: newProps });
        };

        panel.createSection("Content", true);
        panel.addSelect("Display Format", props.format || "time_date", [
            { value: "time_date", label: "Time & Date" },
            { value: "time_only", label: "Time Only" },
            { value: "date_only", label: "Date Only" },
            { value: "weekday_day_month", label: "Weekday Day Month" }
        ], (v) => updateProp("format", v));
        panel.addSelect("Clock Mode", getClockMode(props), [
            { value: "24h", label: "24 Hour" },
            { value: "12h", label: "12 Hour (AM/PM)" }
        ], (v) => updateProp("clock_mode", v));
        panel.addHint("Uses ESPHome strftime under the hood.");
        panel.addSelect("Alignment", props.text_align || "CENTER", ["TOP_LEFT", "TOP_CENTER", "TOP_RIGHT", "CENTER_LEFT", "CENTER", "CENTER_RIGHT", "BOTTOM_LEFT", "BOTTOM_CENTER", "BOTTOM_RIGHT"], (v) => updateProp("text_align", v));
        panel.endSection();

        panel.createSection("Typography", true);
        const fontOptions = ["Roboto", "Inter", "Open Sans", "Monospace", "Mononoki", "Custom..."];
        const currentFont = props.font_family || "Roboto";
        const isCustom = !fontOptions.slice(0, -1).includes(currentFont);

        panel.addSelect("Font Family", isCustom ? "Custom..." : currentFont, fontOptions, (v) => {
            if (v !== "Custom...") {
                updateProp("font_family", v);
                updateProp("custom_font_family", "");
            } else {
                updateProp("font_family", "Custom...");
            }
        });

        if (isCustom || props.font_family === "Custom...") {
            panel.addLabeledInput("Custom Font Name", "text", props.custom_font_family || (isCustom ? currentFont : ""), (v) => {
                updateProp("font_family", v || "Roboto");
                updateProp("custom_font_family", v);
            });
            panel.addHint('Browse <a href="https://fonts.google.com" target="_blank">fonts.google.com</a>');
        }

        const fontFam = props.font_family || "Roboto";
        const availableWeights = getWeightsForFont(fontFam);

        panel.addLabeledInput("Time Font Size", "number", props.time_font_size || 28, (v) => updateProp("time_font_size", parseInt(v, 10)));

        let tWeight = props.font_weight_time !== undefined ? props.font_weight_time : (props.bold_time !== false ? 700 : 400);
        tWeight = clampFontWeight(fontFam, tWeight);
        panel.addSelect("Time Weight", tWeight, availableWeights, (v) => updateProp("font_weight_time", parseInt(v, 10)));

        panel.addLabeledInput("Date Font Size", "number", props.date_font_size || 16, (v) => updateProp("date_font_size", parseInt(v, 10)));

        let dWeight = props.font_weight_date !== undefined ? props.font_weight_date : (props.bold_date ? 700 : 400);
        dWeight = clampFontWeight(fontFam, dWeight);
        panel.addSelect("Date Weight", dWeight, availableWeights, (v) => updateProp("font_weight_date", parseInt(v, 10)));

        panel.addCheckbox("Italic", !!props.italic, (v) => updateProp("italic", v));
        panel.endSection();

        panel.createSection("Appearance", false);
        panel.addColorSelector("Text Color", props.color || "black", null, (v) => updateProp("color", v));
        panel.addColorSelector("Background", props.bg_color || "transparent", null, (v) => updateProp("bg_color", v));
        panel.addNumberWithSlider("Opacity (%)", props.opacity !== undefined ? props.opacity : (props.opa !== undefined ? Math.round(props.opa / 2.55) : 100), 0, 100, (v) => {
            updateProp("opacity", v);
            updateProp("opa", Math.round(v * 2.55));
        });
        panel.endSection();

        panel.createSection("Border Style", false);
        panel.addLabeledInput("Border Width", "number", props.border_width || 0, (v) => updateProp("border_width", parseInt(v, 10)));
        panel.addColorSelector("Border Color", props.border_color || "theme_auto", null, (v) => updateProp("border_color", v));
        panel.addLabeledInput("Corner Radius", "number", props.border_radius || 0, (v) => updateProp("border_radius", parseInt(v, 10)));
        panel.addDropShadowButton(panel.getContainer(), widget.id);
        panel.endSection();
    },
    render,
    exportOpenDisplay: (w, { layout, _page }) => {
        const p = w.props || {};
        const format = p.format || "time_date";
        const textAlign = (p.text_align || "CENTER").toUpperCase();
        const { template } = getTemplateConfig(format, getClockMode(p));

        // Convert theme_auto to actual color
        let color = p.color || "black";
        if (color === "theme_auto") {
            color = layout?.darkMode ? "white" : "black";
        }

        // Align Map for ODP anchor
        const xCenter = textAlign.includes("CENTER") || textAlign === "CENTER";
        const xRight = textAlign.includes("RIGHT");
        const yCenter = textAlign.includes("CENTER") || (!textAlign.includes("TOP") && !textAlign.includes("BOTTOM"));
        const yBottom = textAlign.includes("BOTTOM");
        const anchor = (yCenter ? "m" : (yBottom ? "b" : "t")) + (xCenter ? "c" : (xRight ? "r" : "l"));

        if (format === "time_date") {
            return {
                type: "multiline",
                value: template,
                delimiter: "\n",
                x: Math.round(w.x + (xCenter ? w.width / 2 : (xRight ? w.width : 0))),
                y: Math.round(w.y + (yCenter ? w.height / 2 : (yBottom ? w.height : 0))),
                offset_y: (p.time_font_size || 28) + 4,
                size: p.time_font_size || 28,
                color: color,
                font: p.font_family?.includes("Mono") ? "mononoki.ttf" : "ppb.ttf"
            };
        }

        return {
            type: "text",
            x: Math.round(w.x + (xCenter ? w.width / 2 : (xRight ? w.width : 0))),
            y: Math.round(w.y + (yCenter ? w.height / 2 : (yBottom ? w.height : 0))),
            value: template,
            size: p.time_font_size || 28,
            color: color,
            anchor: anchor,
            font: p.font_family?.includes("Mono") ? "mononoki.ttf" : "ppb.ttf"
        };
    },
    exportOEPL: (w, { layout, _page }) => {
        const p = w.props || {};
        const format = p.format || "time_date";
        const textAlign = (p.text_align || "CENTER").toUpperCase();
        const { template } = getTemplateConfig(format, getClockMode(p));

        // Convert theme_auto to actual color
        let color = p.color || "black";
        if (color === "theme_auto") {
            color = layout?.darkMode ? "white" : "black";
        }

        const xCenter = textAlign.includes("CENTER") || textAlign === "CENTER";
        const xRight = textAlign.includes("RIGHT");
        const yCenter = textAlign.includes("CENTER") || (!textAlign.includes("TOP") && !textAlign.includes("BOTTOM"));
        const yBottom = textAlign.includes("BOTTOM");

        const x = Math.round(w.x + (xCenter ? w.width / 2 : (xRight ? w.width : 0)));
        const y = Math.round(w.y + (yCenter ? w.height / 2 : (yBottom ? w.height : 0)));

        const fontSize = p.time_font_size || 28;
        const lineSpacing = 5;

        const result = {
            type: "text",
            value: template,
            x: x,
            y: y,
            size: fontSize,
            font: p.font_family?.includes("Mono") ? "mononoki.ttf" : "ppb.ttf",
            color: color,
            align: textAlign.toLowerCase().replace("top_", "").replace("bottom_", "").replace("_", ""),
            anchor: (yCenter ? "m" : (yBottom ? "b" : "t")) + (xCenter ? "c" : (xRight ? "r" : "l"))
        };

        // Add max_width for automatic text wrapping when widget has width
        if (w.width && w.width > 0) {
            result.max_width = Math.round(w.width);
            result.spacing = lineSpacing;
        }

        return result;
    },
    exportLVGL: (w, { common, convertColor, convertAlign, getLVGLFont, formatOpacity }) => {
        const p = w.props || {};
        const format = p.format || "time_date";
        const { timeFormat } = getTemplateConfig(format, getClockMode(p));

        let fmt = timeFormat; // Default time_only or fallback
        if (format === "date_only") {
            fmt = "%d.%m.%Y";
        } else if (format === "weekday_day_month") {
            fmt = "%A %d %B"; // International: Monday 01 January
        } else if (format === "time_date") {
            fmt = `${timeFormat}\\n%a, %b %d`;
        }

        let lambdaStr = '!lambda |-\n';
        lambdaStr += `              auto now = id(ha_time).now();\n`;
        lambdaStr += `              return now.strftime("${fmt}").c_str();`;

        // Logic fix: use correct font size for date formats
        const isDate = format === "date_only" || format === "weekday_day_month";
        const fontSize = isDate ? (p.date_font_size || 16) : (p.time_font_size || 28);
        const fontWeight = isDate ? 400 : 700;
        const textAlign = String(p.text_align || "CENTER").toUpperCase();
        const borderWidth = parseInt(p.border_width ?? 0, 10) || 0;
        const borderRadius = parseInt(p.border_radius ?? 0, 10) || 0;
        const bgColor = p.background_color || p.bg_color || (p.fill ? "white" : "transparent");
        const hasBackground = !!(p.fill || (bgColor && bgColor !== "transparent"));
        const refreshTargetId = getLvglDatetimeLabelId(w.id);

        const label = {
            text: lambdaStr,
            text_font: getLVGLFont(p.font_family, fontSize, fontWeight, p.italic),
            text_color: convertColor(p.color),
            text_align: (convertAlign(p.text_align) || "center").replace("top_", "").replace("bottom_", ""),
            opa: formatOpacity(p.opa)
        };

        if (borderWidth <= 0 && !hasBackground) {
            return {
                label: {
                    ...common,
                    ...label
                }
            };
        }

        const flexAlignMain = textAlign.includes("TOP") ? "start" : (textAlign.includes("BOTTOM") ? "end" : "center");
        const flexAlignCross = textAlign.includes("LEFT") ? "start" : (textAlign.includes("RIGHT") ? "end" : "center");

        return {
            obj: {
                ...common,
                bg_color: hasBackground ? convertColor(bgColor) : convertColor("transparent"),
                bg_opa: hasBackground ? "cover" : "transp",
                border_width: borderWidth,
                border_color: convertColor(p.border_color || "theme_auto"),
                radius: borderRadius,
                pad_all: 0,
                layout: {
                    type: "flex",
                    flex_flow: "column",
                    flex_align_main: flexAlignMain,
                    flex_align_cross: flexAlignCross
                },
                widgets: [
                    {
                        label: {
                            id: refreshTargetId,
                            ...label,
                            width: "100%"
                        }
                    }
                ]
            }
        };
    },
    onExportComponents: ({ lines, widgets, isLvgl }) => {
        if (!isLvgl || !widgets?.length) return;

        const targets = widgets.filter((widget) => widget.type === 'datetime');
        if (targets.length === 0) return;

        const intervalEntries = [];
        targets.forEach((widget) => {
            intervalEntries.push(
                '  - interval: 10s',
                '    then:',
                `      - lvgl.widget.refresh: ${getLvglRefreshTarget(widget)}`
            );
        });

        insertTopLevelSectionEntries(lines, 'interval', intervalEntries, '# Date & Time LVGL Refresh');
    },
    collectRequirements: (w, context) => {
        const { addFont } = context;
        const p = w.props || {};
        const timeSize = parseInt(p.time_font_size || 28, 10);
        const dateSize = parseInt(p.date_font_size || 16, 10);

        // Register likely fonts
        const tw = p.font_weight_time !== undefined ? p.font_weight_time : (p.bold_time !== false ? 700 : 400);
        const dw = p.font_weight_date !== undefined ? p.font_weight_date : (p.bold_date ? 700 : 400);
        addFont(p.font_family || "Roboto", tw, timeSize, !!p.italic);
        addFont(p.font_family || "Roboto", dw, dateSize, !!p.italic);
    },
    export: (w, context) => {
        const {
            lines, getColorConst, addFont, getCondProps, getConditionCheck, getAlignY // eslint-disable-line no-unused-vars
        } = context;

        const p = w.props || {};
        const colorProp = p.color || "black";
        const timeFormat = getTimeStrftime(getClockMode(p));

        // Dynamic Color Logic
        let color = getColorConst(colorProp);
        if (colorProp === "theme_auto") color = "color_on";
        if (colorProp === "white") color = "color_off"; // Background (Dynamic)
        if (colorProp === "black") color = "color_on";  // Text (Dynamic)
        const timeSize = parseInt(p.time_font_size || 28, 10);
        const dateSize = parseInt(p.date_font_size || 16, 10);
        const tw = p.font_weight_time !== undefined ? p.font_weight_time : (p.bold_time !== false ? 700 : 400);
        const dw = p.font_weight_date !== undefined ? p.font_weight_date : (p.bold_date ? 700 : 400);
        const timeFontId = addFont(p.font_family || "Roboto", tw, timeSize, !!p.italic);
        const dateFontId = addFont(p.font_family || "Roboto", dw, dateSize, !!p.italic);
        const textAlign = (p.text_align || "CENTER").toUpperCase();
        const format = p.format || "time_date";


        // Background fill
        const bgColorProp = p.bg_color || p.background_color || "transparent";
        if (bgColorProp && bgColorProp !== "transparent") {
            const bgColorConst = getColorConst(bgColorProp);
            lines.push(`        it.filled_rectangle(${w.x}, ${w.y}, ${w.width}, ${w.height}, ${bgColorConst});`);
        }

        // Draw Border if defined
        const borderWidth = p.border_width || 0;
        if (borderWidth > 0) {
            const borderColor = getColorConst(p.border_color || "theme_auto");
            for (let i = 0; i < borderWidth; i++) {
                lines.push(`        it.rectangle(${w.x} + ${i}, ${w.y} + ${i}, ${w.width} - 2 * ${i}, ${w.height} - 2 * ${i}, ${borderColor});`);
            }
        }

        const cond = getConditionCheck(w);
        if (cond) lines.push(`        ${cond}`);

        lines.push(`        {`);
        lines.push(`          auto now = id(ha_time).now();`);

        // Alignment Setup (Fix #268: Robust parsing)
        let alignH = "LEFT";
        if (textAlign.includes("RIGHT")) {
            alignH = "RIGHT";
        } else if (textAlign.endsWith("CENTER") || textAlign === "CENTER") {
            alignH = "CENTER";
        }
        // else LEFT

        let alignV = "TOP";
        if (textAlign.includes("BOTTOM")) {
            alignV = "BOTTOM";
        } else if (textAlign.startsWith("CENTER") || textAlign === "CENTER") {
            alignV = "CENTER";
        }
        // else TOP

        // Map to ESPHome constants (explicit)
        const getEspAlign = (h, v) => {
            if (h === "CENTER" && v === "CENTER") return "TextAlign::CENTER";
            return `TextAlign::${v}_${h}`;
        };

        const espAlign = getEspAlign(alignH, alignV);

        // Positioning
        let xVal = w.x;
        if (alignH === "CENTER") xVal = Math.round(w.x + w.width / 2);
        else if (alignH === "RIGHT") xVal = Math.round(w.x + w.width);

        let yVal = w.y;
        if (alignV === "CENTER") yVal = Math.round(w.y + w.height / 2);
        else if (alignV === "BOTTOM") yVal = Math.round(w.y + w.height);

        if (format === "time_only") {
            lines.push(`          it.strftime(${xVal}, ${yVal}, id(${timeFontId}), ${color}, ${espAlign}, "${timeFormat}", now);`);
        } else if (format === "date_only") {
            lines.push(`          it.strftime(${xVal}, ${yVal}, id(${dateFontId}), ${color}, ${espAlign}, "%d.%m.%Y", now);`);
        } else if (format === "weekday_day_month") {
            lines.push(`          it.strftime(${xVal}, ${yVal}, id(${dateFontId}), ${color}, ${espAlign}, "%A %d %B", now);`);
        } else {
            // Multi-line Positioning (Manual Y for consistency)
            const totalH = timeSize + dateSize + 2;
            let startY = w.y; // Default Top
            if (alignV === "CENTER") startY = Math.round(w.y + (w.height - totalH) / 2);
            else if (alignV === "BOTTOM") startY = Math.round(w.y + w.height - totalH);

            const multiAlign = `TextAlign::TOP_${alignH}`;
            lines.push(`          it.strftime(${xVal}, ${startY}, id(${timeFontId}), ${color}, ${multiAlign}, "${timeFormat}", now);`);
            lines.push(`          it.strftime(${xVal}, ${startY} + ${timeSize} + 2, id(${dateFontId}), ${color}, ${multiAlign}, "%a, %b %d", now);`);
        }

        lines.push(`        }`);
        if (cond) lines.push(`        }`);
    }
};
