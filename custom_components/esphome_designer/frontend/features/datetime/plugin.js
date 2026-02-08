/**
 * Date & Time Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    el.innerHTML = "";
    el.style.display = "flex";
    el.style.flexDirection = "column";
    el.style.justifyContent = "center";
    el.style.alignItems = "center";

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

    // Apply Border & Background
    const borderWidth = props.border_width !== undefined ? props.border_width : 0;
    const hasBackground = props.fill || (props.bg_color && props.bg_color !== "transparent") || (props.background_color && props.background_color !== "transparent");

    if (borderWidth > 0 || hasBackground) {
        let resolvedBorderColor = props.border_color || "theme_auto";
        if (resolvedBorderColor === "theme_auto") {
            resolvedBorderColor = (window.AppState?.settings?.darkMode) ? "white" : "black";
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
    timeDiv.style.fontWeight = "bold";

    const dateDiv = document.createElement("div");
    dateDiv.style.fontSize = `${props.date_font_size || 16}px`;
    dateDiv.style.color = color;
    dateDiv.style.fontFamily = fontFamily;
    dateDiv.style.opacity = "0.8";

    const now = new Date();
    const dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayNamesFull = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNamesFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const timeStr = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');
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
        height: 50
    },
    render,
    exportOpenDisplay: (w, { layout, page }) => {
        const p = w.props || {};
        const format = p.format || "time_date";
        const textAlign = (p.text_align || "CENTER").toUpperCase();

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

        let template = "";
        if (format === "time_only") {
            template = "{{ now().strftime('%H:%M') }}";
        } else if (format === "date_only") {
            template = "{{ now().strftime('%d.%m.%Y') }}";
        } else if (format === "weekday_day_month") {
            template = "{{ now().strftime('%A %d %B') }}";
        } else {
            // "time_date" - using multiline for ODP
            return {
                type: "multiline",
                value: "{{ now().strftime('%H:%M') }}\n{{ now().strftime('%a, %b %d') }}",
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
    exportOEPL: (w, { layout, page }) => {
        const p = w.props || {};
        const format = p.format || "time_date";
        const textAlign = (p.text_align || "CENTER").toUpperCase();

        // Convert theme_auto to actual color
        let color = p.color || "black";
        if (color === "theme_auto") {
            color = layout?.darkMode ? "white" : "black";
        }

        let template = "";
        if (format === "time_only") {
            template = "{{ now().strftime('%H:%M') }}";
        } else if (format === "date_only") {
            template = "{{ now().strftime('%d.%m.%Y') }}";
        } else if (format === "weekday_day_month") {
            template = "{{ now().strftime('%A %d %B') }}";
        } else {
            // "time_date" - needs to be multi-line or split. OEPL supports \n in text.
            template = "{{ now().strftime('%H:%M') }}\n{{ now().strftime('%a, %b %d') }}";
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

        let fmt = "%H:%M"; // Default time_only or fallback
        if (format === "date_only") {
            fmt = "%d.%m.%Y";
        } else if (format === "weekday_day_month") {
            fmt = "%A %d %B"; // International: Monday 01 January
        } else if (format === "time_date") {
            fmt = "%H:%M\\n%a, %b %d";
        }

        let lambdaStr = '!lambda |-\n';
        lambdaStr += `              auto now = id(ha_time).now();\n`;
        lambdaStr += `              return now.strftime("${fmt}").c_str();`;

        // Logic fix: use correct font size for date formats
        const isDate = format === "date_only" || format === "weekday_day_month";
        const fontSize = isDate ? (p.date_font_size || 16) : (p.time_font_size || 28);
        const fontWeight = isDate ? 400 : 700;

        return {
            label: {
                ...common,
                text: lambdaStr,
                text_font: getLVGLFont(p.font_family, fontSize, fontWeight, p.italic),
                text_color: convertColor(p.color),
                text_align: (convertAlign(p.text_align) || "center").replace("top_", "").replace("bottom_", ""),
                opa: formatOpacity(p.opa)
            }
        };
    },
    collectRequirements: (w, context) => {
        const { addFont } = context;
        const p = w.props || {};
        const timeSize = parseInt(p.time_font_size || 28, 10);
        const dateSize = parseInt(p.date_font_size || 16, 10);

        // Register likely fonts
        addFont(p.font_family || "Roboto", 700, timeSize, !!p.italic);
        addFont(p.font_family || "Roboto", 400, dateSize, !!p.italic);
    },
    export: (w, context) => {
        const {
            lines, getColorConst, addFont, getCondProps, getConditionCheck, getAlignY
        } = context;

        const p = w.props || {};
        const color = getColorConst(p.color || "black");
        const timeSize = parseInt(p.time_font_size || 28, 10);
        const dateSize = parseInt(p.date_font_size || 16, 10);
        const timeFontId = addFont(p.font_family || "Roboto", 700, timeSize, !!p.italic);
        const dateFontId = addFont(p.font_family || "Roboto", 400, dateSize, !!p.italic);
        const textAlign = (p.text_align || "CENTER").toUpperCase();
        const format = p.format || "time_date";

        lines.push(`        // widget:datetime id:${w.id} type:datetime x:${w.x} y:${w.y} w:${w.width} h:${w.height} align:${textAlign} fmt:${format} ${getCondProps(w)}`);

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
            lines.push(`          it.strftime(${xVal}, ${yVal}, id(${timeFontId}), ${color}, ${espAlign}, "%H:%M", now);`);
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
            lines.push(`          it.strftime(${xVal}, ${startY}, id(${timeFontId}), ${color}, ${multiAlign}, "%H:%M", now);`);
            lines.push(`          it.strftime(${xVal}, ${startY} + ${timeSize} + 2, id(${dateFontId}), ${color}, ${multiAlign}, "%a, %b %d", now);`);
        }

        lines.push(`        }`);
        if (cond) lines.push(`        }`);
    }
};
