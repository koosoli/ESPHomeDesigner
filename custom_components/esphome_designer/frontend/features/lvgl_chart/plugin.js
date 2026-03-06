// @ts-nocheck
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
    const width = Math.max(40, parseInt(common.width || w.width || 100, 10) || 100);
    const height = Math.max(30, parseInt(common.height || w.height || 100, 10) || 100);
    const title = p.title || 'Chart';
    const plotTop = title ? 18 : 6;
    const plotHeight = Math.max(12, height - plotTop - 6);
    const pointCount = Math.max(4, Math.min(24, parseInt(p.point_count || 10, 10) || 10));
    const linePoints = Array.from({ length: pointCount }, (_, index) => {
        const x = pointCount === 1 ? 0 : Math.round((index * (width - 1)) / (pointCount - 1));
        const phase = pointCount === 1 ? 0 : index / (pointCount - 1);
        const y = plotTop + Math.round((1 - ((Math.sin(phase * Math.PI * 1.5) + 1) / 2)) * plotHeight);
        return { x, y };
    });
    const gridLines = [];

    for (let i = 1; i < 4; i++) {
        const y = plotTop + Math.round((plotHeight * i) / 4);
        const x = Math.round(((width - 1) * i) / 4);
        gridLines.push({
            line: {
                line_color: convertColor('gray'),
                line_width: 1,
                points: [
                    { x: 0, y },
                    { x: width - 1, y }
                ]
            }
        });
        gridLines.push({
            line: {
                line_color: convertColor('gray'),
                line_width: 1,
                points: [
                    { x, y: plotTop },
                    { x, y: plotTop + plotHeight }
                ]
            }
        });
    }

    return {
        obj: {
            ...common,
            ...(p.bg_color === 'transparent' ? { bg_opa: 'transp' } : { bg_color: convertColor(p.bg_color || 'white') }),
            border_color: convertColor(p.color),
            border_width: 1,
            opa: formatOpacity(p.opa),
            widgets: [
                ...gridLines,
                {
                    line: {
                        id: `${w.id}_line`,
                        line_color: convertColor(p.color),
                        line_width: 2,
                        line_rounded: true,
                        points: linePoints
                    }
                },
                {
                    label: {
                        align: 'top_mid',
                        text: `"${title}"`,
                        text_color: convertColor(p.color)
                    }
                }
            ]
        }
    };
};

export default {
    id: "lvgl_chart",
    name: "Chart",
    category: "LVGL",
    defaults: {
        entity_id: "",
        min: 0,
        max: 100,
        color: "blue",
        title: "Chart",
        type: "line",
        point_count: 10,
        x_div_lines: 3,
        y_div_lines: 3,
        bg_color: "transparent",
        opa: 255,
        opacity: 255
    },
    schema: [
        {
            section: "Content",
            fields: [
                { key: "title", label: "Chart Title", type: "text", default: "Chart" },
                { key: "entity_id", target: "root", label: "Entity ID", type: "entity_picker", default: "" }
            ]
        },
        {
            section: "Data Source",
            fields: [
                { key: "min", label: "Min Value", type: "number", default: 0 },
                { key: "max", label: "Max Value", type: "number", default: 100 },
                { key: "point_count", label: "Points", type: "number", default: 10 }
            ]
        },
        {
            section: "Appearance",
            fields: [
                { key: "type", label: "Chart Type", type: "select", options: ["line", "bar", "scatter"], default: "line" },
                { key: "color", label: "Recolor", type: "color", default: "blue" },
                { key: "bg_color", label: "Background color", type: "color", default: "transparent" },
                { key: "x_div_lines", label: "X Grid Lines", type: "number", default: 3 },
                { key: "y_div_lines", label: "Y Grid Lines", type: "number", default: 3 },
                { key: "opa", label: "Opacity (0 - 255)", type: "number", default: 255 },
                { key: "opacity", label: "Opacity (0 - 255)", type: "number", default: 255 }
            ]
        }
    ],
    render,
    exportLVGL
};
