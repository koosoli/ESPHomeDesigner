/**
 * Line Shape Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};

    const orientation = props.orientation || "horizontal";
    const strokeWidth = props.stroke_width || 1;

    if (orientation === "vertical") {
        el.style.width = `${strokeWidth}px`;
        el.style.height = `${widget.height}px`;
    } else {
        el.style.width = `${widget.width}px`;
        el.style.height = `${strokeWidth}px`;
    }
    el.style.backgroundColor = getColorStyle(props.color || "black");
};

const exportLVGL = (w, { common, convertColor, formatOpacity }) => {
    const p = w.props || {};
    const w_w = Math.round(w.w || w.width || 100);
    const w_h = Math.round(w.h || w.height || 10);
    let pointsArr;
    const orientation = p.orientation || "horizontal";

    if (orientation === "vertical") pointsArr = [{ x: 0, y: 0 }, { x: 0, y: w_h }];
    else pointsArr = [{ x: 0, y: 0 }, { x: w_w, y: 0 }];

    return {
        line: {
            ...common,
            points: pointsArr,
            style: {
                line_width: p.stroke_width || 3,
                line_color: convertColor(p.color),
                line_rounded: true,
                line_opa: formatOpacity(p.opa || 255)
            }
        }
    };
};

export default {
    id: "line",
    name: "Line",
    category: "Shapes",
    defaults: {
        width: 100,
        height: 10,
        stroke_width: 3,
        color: "black",
        orientation: "horizontal",
        opa: 255
    },
    render,
    exportLVGL,
    export: (w, context) => {
        const {
            lines, getColorConst, getCondProps, getConditionCheck
        } = context;

        const p = w.props || {};
        const strokeWidth = parseInt(p.stroke_width || 3, 10);
        const colorProp = p.color || "black";
        const color = getColorConst(colorProp);
        const orientation = p.orientation || "horizontal";

        const rectX = Math.floor(w.x);
        const rectY = Math.floor(w.y);
        let rectW = Math.floor((orientation === "vertical") ? strokeWidth : w.width);
        let rectH = Math.floor((orientation === "vertical") ? w.height : strokeWidth);

        lines.push(`        // widget:line id:${w.id} type:line x:${rectX} y:${rectY} w:${rectW} h:${rectH} stroke:${strokeWidth} color:${colorProp} orientation:${orientation} ${getCondProps(w)}`);

        const cond = getConditionCheck(w);
        if (cond) lines.push(`        ${cond}`);

        lines.push(`        it.filled_rectangle(${rectX}, ${rectY}, ${rectW}, ${rectH}, ${color});`);

        if (cond) lines.push(`        }`);
    }
};
