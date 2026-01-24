/**
 * LVGL Chart Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const pColor = getColorStyle(props.color || "black");

    el.innerHTML = "";
    el.style.backgroundColor = "white";
    el.style.border = `1px solid ${pColor}`;
    el.style.display = "flex";
    el.style.flexDirection = "column";

    const title = document.createElement("div");
    title.style.textAlign = "center";
    title.style.fontSize = "12px";
    title.style.color = pColor;
    title.textContent = props.title || "Chart";
    el.appendChild(title);

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.style.flex = "1";
    svg.style.width = "100%";
    el.appendChild(svg);

    for (let i = 1; i < 4; i++) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", "0%");
        line.setAttribute("y1", `${i * 25}%`);
        line.setAttribute("x2", "100%");
        line.setAttribute("y2", `${i * 25}%`);
        line.setAttribute("stroke", "#eee");
        line.setAttribute("stroke-width", "1");
        svg.appendChild(line);
    }

    const points = [];
    for (let i = 0; i <= 10; i++) {
        const x = (i / 10) * 100;
        const y = 50 + Math.sin(i) * 30;
        points.push(`${x},${y}`);
    }

    const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    polyline.setAttribute("points", points.join(" "));
    polyline.setAttribute("fill", "none");
    polyline.setAttribute("stroke", pColor);
    polyline.setAttribute("stroke-width", "2");

    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("preserveAspectRatio", "none");

    svg.appendChild(polyline);
};

const exportLVGL = (w, { common, convertColor, formatOpacity }) => {
    const p = w.props || {};
    return {
        lv_chart: {
            ...common,
            type: p.type || "line",
            bg_color: convertColor(p.bg_color || "white"),
            border_color: convertColor(p.color),
            border_width: 1,
            opa: formatOpacity(p.opa),
            point_count: p.point_count || 10,
            div_line_count: p.x_div_lines !== undefined || p.y_div_lines !== undefined ? {
                x: p.x_div_lines,
                y: p.y_div_lines
            } : undefined,
            series: [{ color: convertColor(p.color) }],
            widgets: [{
                label: {
                    align: "top_mid",
                    text: `"${p.title || 'Graph'}"`,
                    text_color: convertColor(p.color)
                }
            }]
        }
    };
};

export default {
    id: "lvgl_chart",
    name: "Chart",
    category: "LVGL",
    defaults: {
        min: 0,
        max: 100,
        color: "blue",
        title: "Chart",
        type: "line",
        point_count: 10,
        x_div_lines: 3,
        y_div_lines: 3
    },
    render,
    exportLVGL
};
