/**
 * Image Plugin
 */

const isOffline = () => window.location.protocol === 'file:' || !window.location.hostname;

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const url = (props.url || "").trim();
    const path = (props.path || "").replace(/^"|"$/g, '').trim();
    const invert = !!props.invert;

    el.style.boxSizing = "border-box";
    el.style.backgroundColor = "#f5f5f5";
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "center";
    el.style.overflow = "hidden";
    el.style.color = "#666";

    el.innerText = "";
    el.style.backgroundImage = "";

    if (path) {
        const filename = path.split(/[/\\]/).pop() || path;
        el.innerHTML = "";

        const img = document.createElement("img");
        img.style.maxWidth = "100%";
        img.style.maxHeight = "100%";
        img.style.objectFit = "contain";
        img.draggable = false;

        if (invert) {
            img.style.filter = "invert(1)";
        }

        img.onerror = () => {
            const offlineNote = isOffline() ? "<br/><span style='color:#e67e22;font-size:8px;'>⚠️ Offline mode - preview in HA</span>" : "";
            el.innerHTML = "<div style='text-align:center;color:#666;font-size:11px;padding:8px;line-height:1.4;'>" +
                "🖼️<br/><strong>" + filename + "</strong><br/>" +
                "<span style='color:#999;font-size:9px;'>" +
                (invert ? "(inverted) " : "") +
                widget.width + "×" + widget.height + "px</span>" + offlineNote + "</div>";
        };

        img.onload = () => {
            const overlay = document.createElement("div");
            overlay.style.position = "absolute";
            overlay.style.bottom = "2px";
            overlay.style.right = "2px";
            overlay.style.background = "rgba(0,0,0,0.6)";
            overlay.style.color = "white";
            overlay.style.padding = "2px 4px";
            overlay.style.fontSize = "8px";
            overlay.style.borderRadius = "2px";
            overlay.textContent = filename + " • " + widget.width + "×" + widget.height + "px";
            el.appendChild(overlay);
        };

        let imgSrc;
        if (isOffline()) {
            if (path.match(/^[A-Za-z]:\\/)) {
                imgSrc = "file:///" + path.replace(/\\/g, '/');
            } else if (path.startsWith('/config/')) {
                imgSrc = null;
            } else {
                imgSrc = path;
            }
        } else {
            imgSrc = "/api/esphome_designer/image_proxy?path=" + encodeURIComponent(path);
        }

        if (imgSrc) {
            img.src = imgSrc;
            el.appendChild(img);
        } else {
            el.innerHTML = "<div style='text-align:center;color:#666;font-size:11px;padding:8px;line-height:1.4;'>" +
                "🖼️<br/><strong>" + filename + "</strong><br/>" +
                "<span style='color:#999;font-size:9px;'>" +
                (invert ? "(inverted) " : "") +
                widget.width + "×" + widget.height + "px</span><br/>" +
                "<span style='color:#e67e22;font-size:8px;'>⚠️ Preview available in Home Assistant</span></div>";
        }
        return;
    }

    if (url) {
        const img = document.createElement("img");
        img.style.maxWidth = "100%";
        img.style.maxHeight = "100%";
        img.style.objectFit = "contain";
        img.draggable = false;

        if (invert) {
            img.style.filter = "invert(1)";
        }

        img.onerror = () => {
            el.innerHTML = "<div style='text-align:center;color:#666;font-size:11px;padding:8px;line-height:1.4;'>" +
                "🖼️<br/><strong>Image</strong><br/>" +
                "<span style='color:#999;font-size:9px;'>" +
                (invert ? "(inverted) " : "") +
                "Load Failed</span></div>";
        };

        img.onload = () => {
            const filename = url.split("/").pop();
            const overlay = document.createElement("div");
            overlay.style.position = "absolute";
            overlay.style.bottom = "2px";
            overlay.style.right = "2px";
            overlay.style.background = "rgba(0,0,0,0.6)";
            overlay.style.color = "white";
            overlay.style.padding = "2px 4px";
            overlay.style.fontSize = "8px";
            overlay.style.borderRadius = "2px";
            overlay.textContent = filename;
            el.appendChild(overlay);
        };

        img.src = url;
        el.appendChild(img);
    } else {
        const placeholder = document.createElement("div");
        placeholder.style.textAlign = "center";
        placeholder.style.color = "#aaa";
        placeholder.style.fontSize = "11px";
        placeholder.innerHTML = "🖼️<br/>Image Widget<br/><span style='font-size:9px;color:#ccc;'>Enter path in properties →</span>";
        el.appendChild(placeholder);
    }
};

export default {
    id: "image",
    name: "Image",
    category: "Graphics",
    defaults: {
        path: "",
        url: "",
        invert: false,
        size: "native"
    },
    render
};
