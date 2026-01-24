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
    const textAlign = props.text_align || "CENTER";

    const applyAlign = (align, element) => {
        if (align === "LEFT") element.style.alignItems = "flex-start";
        else if (align === "RIGHT") element.style.alignItems = "flex-end";
        else element.style.alignItems = "center";
    };
    applyAlign(textAlign, el);

    const format = props.format || "time_date";

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
        el.appendChild(timeDiv);
    } else if (format === "date_only") {
        dateDiv.textContent = dateStrDots;
        el.appendChild(dateDiv);
    } else if (format === "weekday_day_month") {
        dateDiv.textContent = dateStrFull;
        el.appendChild(dateDiv);
    } else {
        dateDiv.textContent = dateStrShort;
        el.appendChild(timeDiv);
        el.appendChild(dateDiv);
    }
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
        text_align: "CENTER"
    },
    render,
    exportOpenDisplay: (w, { layout, page }) => {
        const p = w.props || {};
        const format = p.format || "time_date";
        const textAlign = p.text_align || "CENTER";

        let text = "";
        const now = new Date();
        if (format === "time_only") {
            text = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');
        } else if (format === "date_only") {
            text = now.getDate().toString().padStart(2, '0') + "." + (now.getMonth() + 1).toString().padStart(2, '0') + "." + now.getFullYear();
        } else {
            text = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');
        }

        return {
            type: "draw_text",
            x: Math.round(w.x + (textAlign === "CENTER" ? w.width / 2 : (textAlign === "RIGHT" ? w.width : 0))),
            y: Math.round(w.y),
            text: text,
            size: p.time_font_size || 28,
            color: p.color || "black",
            font: p.font_family?.toLowerCase() || "roboto"
        };
    },
    exportOEPL: (w, { layout, page }) => {
        const p = w.props || {};
        const format = p.format || "time_date";
        const color = p.color || "black";
        const textAlign = p.text_align || "CENTER";

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

        return {
            type: "text",
            value: template,
            x: Math.round(w.x + (textAlign === "CENTER" ? w.width / 2 : (textAlign === "RIGHT" ? w.width : 0))),
            y: Math.round(w.y),
            size: p.time_font_size || 28,
            font: p.font_family?.includes("Mono") ? "mononoki.ttf" : "ppb.ttf",
            color: color,
            align: textAlign.toLowerCase(),
            anchor: "lt"
        };
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
        const textAlign = p.text_align || "CENTER";
        const format = p.format || "time_date";

        lines.push(`        // widget:datetime id:${w.id} type:datetime x:${w.x} y:${w.y} w:${w.width} h:${w.height} fmt:${format} ${getCondProps(w)}`);

        const cond = getConditionCheck(w);
        if (cond) lines.push(`        ${cond}`);

        lines.push(`        {`);
        lines.push(`          auto now = id(ha_time).now();`);

        let x = Math.round(w.x + w.width / 2);
        let align = "TextAlign::CENTER";
        if (textAlign === "LEFT") {
            x = w.x;
            align = "TextAlign::TOP_LEFT";
        } else if (textAlign === "RIGHT") {
            x = w.x + w.width;
            align = "TextAlign::TOP_RIGHT";
        }

        if (format === "time_only") {
            const y = getAlignY ? getAlignY(textAlign, w.y, w.height) : w.y;
            lines.push(`          it.strftime(${x}, ${y}, id(${timeFontId}), ${color}, ${align}, "%H:%M", now);`);
        } else if (format === "date_only") {
            const y = getAlignY ? getAlignY(textAlign, w.y, w.height) : w.y;
            lines.push(`          it.strftime(${x}, ${y}, id(${dateFontId}), ${color}, ${align}, "%d.%m.%Y", now);`);
        } else if (format === "weekday_day_month") {
            // International format: "Monday 01 January"
            const y = getAlignY ? getAlignY(textAlign, w.y, w.height) : w.y;
            lines.push(`          it.strftime(${x}, ${y}, id(${dateFontId}), ${color}, ${align}, "%A %d %B", now);`);
        } else {
            // Multi-line
            const totalH = timeSize + dateSize + 2;
            const startY = Math.round(w.y + (w.height - totalH) / 2);
            lines.push(`          it.strftime(${x}, ${startY}, id(${timeFontId}), ${color}, ${align}, "%H:%M", now);`);
            lines.push(`          it.strftime(${x}, ${startY} + ${timeSize} + 2, id(${dateFontId}), ${color}, ${align}, "%a, %b %d", now);`);
        }

        lines.push(`        }`);
        if (cond) lines.push(`        }`);
    }
};
