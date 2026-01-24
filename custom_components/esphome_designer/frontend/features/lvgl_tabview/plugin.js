/**
 * LVGL Tabview Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};

    el.innerHTML = "";
    el.style.display = "flex";
    el.style.flexDirection = "column";
    el.style.boxSizing = "border-box";
    el.style.overflow = "hidden";
    el.style.backgroundColor = getColorStyle(props.bg_color || "white");
    el.style.border = "1px solid #333";

    const header = document.createElement("div");
    header.style.display = "flex";
    header.style.backgroundColor = "#e0e0e0";
    header.style.borderBottom = "1px solid #333";
    header.style.height = "30px";
    header.style.flexShrink = "0";

    let tabs = props.tabs || ["Tab 1", "Tab 2"];
    if (typeof tabs === 'string') {
        tabs = tabs.includes("\n") ? tabs.split("\n") : tabs.split(",").map(t => t.trim());
    } else if (!Array.isArray(tabs)) {
        tabs = ["Tab 1", "Tab 2"];
    }
    tabs.forEach((tabName, i) => {
        const tab = document.createElement("div");
        tab.textContent = tabName;
        tab.style.flex = "1";
        tab.style.display = "flex";
        tab.style.alignItems = "center";
        tab.style.justifyContent = "center";
        tab.style.fontSize = "12px";
        tab.style.fontFamily = "Roboto, sans-serif";
        tab.style.color = "#000";
        tab.style.borderRight = i < tabs.length - 1 ? "1px solid #999" : "none";
        tab.style.backgroundColor = i === 0 ? "#fff" : "#e0e0e0";
        header.appendChild(tab);
    });
    el.appendChild(header);

    const content = document.createElement("div");
    content.style.flex = "1";
    content.style.display = "flex";
    content.style.alignItems = "center";
    content.style.justifyContent = "center";
    content.style.color = "#999";
    content.style.fontSize = "10px";
    content.style.fontFamily = "Roboto, sans-serif";
    content.textContent = "Tab Content Area";
    el.appendChild(content);
};

const exportLVGL = (w, { common }) => {
    const p = w.props || {};
    let tabsRaw = p.tabs || ["Tab 1", "Tab 2"];
    if (typeof tabsRaw === 'string') {
        tabsRaw = tabsRaw.includes("\n") ? tabsRaw.split("\n") : tabsRaw.split(",").map(t => t.trim());
    } else if (!Array.isArray(tabsRaw)) {
        tabsRaw = ["Tab 1", "Tab 2"];
    }

    const tabs = tabsRaw.map(name => ({
        name: String(name),
        widgets: []
    }));

    // Convert tab_size to percentage string if it's a number
    let sizeStr = "10%";
    if (p.tab_size) {
        sizeStr = typeof p.tab_size === 'number' ? `${p.tab_size}%` : p.tab_size;
    }

    return {
        tabview: {
            ...common,
            position: p.tab_pos || "TOP",
            size: sizeStr,
            tabs: tabs
        }
    };
};

export default {
    id: "lvgl_tabview",
    name: "Tabview",
    category: "LVGL",
    defaults: {
        tabs: ["Page 1", "Page 2", "Page 3"],
        tab_pos: "TOP",
        bg_color: "white"
    },
    render,
    exportLVGL
};
