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
    timeDiv.textContent = "12:34"; // Preview value

    const dateDiv = document.createElement("div");
    dateDiv.style.fontSize = `${props.date_font_size || 16}px`;
    dateDiv.style.color = color;
    dateDiv.style.fontFamily = fontFamily;
    dateDiv.style.opacity = "0.8";
    dateDiv.textContent = "Monday, Jan 1"; // Preview value

    if (format === "time_only") {
        el.appendChild(timeDiv);
    } else if (format === "date_only") {
        el.appendChild(dateDiv);
    } else {
        el.appendChild(timeDiv);
        el.appendChild(dateDiv);
    }
};

export default {
    id: "datetime",
    name: "Date & Time",
    category: "Core",
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
    exportLVGL: (w, { common, convertColor, convertAlign, getLVGLFont, formatOpacity }) => {
        const p = w.props || {};
        const format = p.format || "time_date";

        let fmt = "%H:%M"; // Default time_only or fallback
        if (format === "date_only") {
            fmt = "%d.%m.%Y";
        } else if (format === "time_date") {
            fmt = "%H:%M\\n%a, %b %d";
        }

        let lambdaStr = '!lambda |-\n';
        lambdaStr += `              auto now = id(ha_time).now();\n`;
        lambdaStr += `              return now.strftime("${fmt}").c_str();`;

        return {
            label: {
                ...common,
                text: lambdaStr,
                text_font: getLVGLFont(p.font_family, p.time_font_size || 28, p.font_weight, p.italic),
                text_color: convertColor(p.color),
                text_align: (convertAlign(p.text_align) || "CENTER").replace("TOP_", "").replace("BOTTOM_", ""),
                opa: formatOpacity(p.opa)
            }
        };
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
