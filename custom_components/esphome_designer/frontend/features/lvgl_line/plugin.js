/**
 * LVGL Line Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const color = getColorStyle(props.line_color || props.color || "black");
    const strokeWidth = props.line_width || 3;
    const opacity = (props.opa !== undefined ? props.opa : 255) / 255;
    const orientation = props.orientation || "horizontal";

    el.innerHTML = "";

    if (props.points && typeof props.points === 'string' && props.points.includes(',')) {
        let pointsArr = [];
        if (typeof props.points === 'string') {
            pointsArr = props.points.split(" ").map(pt => pt.split(",").map(Number));
        } else if (Array.isArray(props.points)) {
            pointsArr = props.points.map(pt => Array.isArray(pt) ? pt : String(pt).split(",").map(Number));
        }

        if (pointsArr.length > 0) {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("width", "100%");
            svg.setAttribute("height", "100%");
            svg.style.overflow = "visible";

            const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
            const pointsStr = pointsArr
                .filter(p => p.length >= 1 && !isNaN(p[0]))
                .map(p => `${p[0]},${p[1] !== undefined && !isNaN(p[1]) ? p[1] : 0}`)
                .join(" ");
            polyline.setAttribute("points", pointsStr);
            polyline.setAttribute("stroke", color);
            polyline.setAttribute("stroke-width", strokeWidth);
            polyline.setAttribute("fill", "none");
            if (props.line_rounded !== false) {
                polyline.setAttribute("stroke-linecap", "round");
                polyline.setAttribute("stroke-linejoin", "round");
            }

            svg.appendChild(polyline);
            el.appendChild(svg);
            el.style.opacity = opacity;
            return;
        }
    }

    if (orientation === "vertical") {
        el.style.width = `${strokeWidth}px`;
        el.style.height = `${widget.height}px`;
    } else {
        el.style.width = `${widget.width}px`;
        el.style.height = `${strokeWidth}px`;
    }
    el.style.backgroundColor = color;
    el.style.opacity = opacity;
    if (props.line_rounded !== false) {
        el.style.borderRadius = `${strokeWidth}px`;
    }
};

const exportLVGL = (w, { common, convertColor, formatOpacity }) => {
    const p = w.props || {};
    const w_w = common.width;
    const w_h = common.height;
    let pointsArr;
    const orientation = p.orientation || "horizontal";

    if (p.points && typeof p.points === 'string' && p.points.includes(',')) {
        pointsArr = p.points.split(" ").map(pt => {
            const [px, py] = pt.split(",").map(Number);
            return { x: Math.round(px || 0), y: Math.round(py || 0) };
        });
    } else {
        if (orientation === "vertical") pointsArr = [{ x: 0, y: 0 }, { x: 0, y: w_h }];
        else pointsArr = [{ x: 0, y: 0 }, { x: w_w, y: 0 }];
    }

    return {
        line: {
            ...common,
            points: pointsArr,
            line_width: p.line_width || 3,
            line_color: convertColor(p.line_color || p.color),
            line_rounded: p.line_rounded !== false,
            opa: formatOpacity(p.opa || 255)
        }
    };
};

export default {
    id: "lvgl_line",
    name: "Line (lv)",
    category: "LVGL",
    defaults: {
        line_width: 3,
        line_color: "black",
        orientation: "horizontal",
        line_rounded: true,
        opa: 255
    },
    render,
    exportLVGL
};
