/**
 * LVGL Tileview Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};

    el.innerHTML = "";
    el.style.display = "grid";
    el.style.gridTemplateColumns = "1fr 1fr";
    el.style.gridTemplateRows = "1fr 1fr";
    el.style.gap = "2px";
    el.style.boxSizing = "border-box";
    el.style.backgroundColor = getColorStyle(props.bg_color || "white");
    el.style.border = "1px solid #333";
    el.style.padding = "2px";

    for (let i = 0; i < 4; i++) {
        const tile = document.createElement("div");
        tile.style.backgroundColor = "#f0f0f0";
        tile.style.border = "1px dashed #999";
        tile.style.display = "flex";
        tile.style.alignItems = "center";
        tile.style.justifyContent = "center";
        tile.style.fontSize = "10px";
        tile.style.fontFamily = "Roboto, sans-serif";
        tile.style.color = "#666";
        tile.textContent = `Tile ${i}`;
        el.appendChild(tile);
    }
};

const exportLVGL = (w, { common }) => {
    const p = w.props || {};
    return {
        tileview: {
            ...common,
            tiles: Array.isArray(p.tiles) && p.tiles.length > 0
                ? p.tiles
                : [
                    {
                        row: 0,
                        column: 0,
                        widgets: []
                    }
                ]
        }
    };
};

export default {
    id: "lvgl_tileview",
    name: "Tileview",
    category: "LVGL",
    defaults: {
        bg_color: "white",
        opa: 255,
        tiles: [{ row: 0, column: 0, widgets: [] }],
        opacity: 255
    },
    schema: [
        {
            section: "Tiles",
            fields: [
                {
                    key: "tiles", label: "Tiles Configuration (JSON)", type: "json", default: [
                        { row: 0, column: 0, widgets: [] }
                    ]
                }
            ]
        },
        {
            section: "Appearance",
            fields: [
                { key: "bg_color", label: "Background", type: "color", default: "white" },
                { key: "opa", label: "Opacity (0 - 255)", type: "number", default: 255 },
                { key: "opacity", label: "Opacity (0 - 255)", type: "number", default: 255 }
            ]
        }
    ],
    render,
    exportLVGL
};
