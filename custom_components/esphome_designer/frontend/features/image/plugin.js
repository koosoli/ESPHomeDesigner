/**
 * Image Plugin
 */
import { AppState } from '@core/state';
import { getHaHeaders } from '../../js/io/ha_api.js';

const isOffline = () => window.location.protocol === 'file:' || !window.location.hostname;
const protectedPreviewCache = new Map();
const hostRenderState = new WeakMap();
const VALID_IMAGE_TYPES = new Set(["BINARY", "GRAYSCALE", "RGB565", "RGB"]);
const COLOR_IMAGE_TYPES = new Set(["RGB565", "RGB"]);
const DITHER_IMAGE_TYPES = new Set(["BINARY", "GRAYSCALE"]);
const VALID_TRANSPARENCY = new Set(["opaque", "chroma_key", "alpha_channel"]);
const RENDER_MODE_TO_IMAGE_TYPE = {
    Binary: "BINARY",
    Grayscale: "GRAYSCALE",
    "Color (RGB565)": "RGB565"
};

let previewCleanupInstalled = false;

const normalizeString = (value) => typeof value === "string" ? value.trim() : "";

const isColorProfile = (profile) => !!(profile?.features?.lcd || (profile?.name && (profile.name.includes("6-Color") || profile.name.includes("Color"))));

const resolveImageType = (props, profile) => {
    const renderModeType = RENDER_MODE_TO_IMAGE_TYPE[normalizeString(props.render_mode)];
    if (renderModeType) return renderModeType;

    const explicitType = normalizeString(props.image_type || props.img_type).toUpperCase();
    if (VALID_IMAGE_TYPES.has(explicitType)) return explicitType;

    return isColorProfile(profile) ? "RGB565" : "BINARY";
};

const resolveTransparency = (props, imageType) => {
    const requested = normalizeString(props.transparency).toLowerCase();
    const defaultTransparency = COLOR_IMAGE_TYPES.has(imageType) ? "opaque" : "";

    if (!requested) return defaultTransparency;
    if (!VALID_TRANSPARENCY.has(requested)) return defaultTransparency;
    if (imageType === "BINARY" && requested === "alpha_channel") return "opaque";

    return requested;
};

const normalizeImagePath = (value) => {
    const path = (value || "").replace(/^"|"$/g, '').trim();
    if (!path) return "";
    if (path.startsWith('/local/')) {
        return `/config/www/${path.slice('/local/'.length)}`;
    }
    return path;
};

const installPreviewCleanup = () => {
    if (previewCleanupInstalled || typeof window === "undefined" || typeof window.addEventListener !== "function") {
        return;
    }

    window.addEventListener("beforeunload", () => {
        protectedPreviewCache.forEach((entry) => {
            if (entry?.objectUrl) {
                URL.revokeObjectURL(entry.objectUrl);
            }
        });
        protectedPreviewCache.clear();
    });

    previewCleanupInstalled = true;
};

const clearProtectedPreviewCache = (path) => {
    const entry = protectedPreviewCache.get(path);
    if (entry?.objectUrl) {
        URL.revokeObjectURL(entry.objectUrl);
    }
    protectedPreviewCache.delete(path);
};

const getProtectedPreviewObjectUrl = async (path) => {
    installPreviewCleanup();

    const cached = protectedPreviewCache.get(path);
    if (cached?.objectUrl) {
        return cached.objectUrl;
    }
    if (cached?.promise) {
        return cached.promise;
    }

    const headers = { ...getHaHeaders() };
    delete headers["Content-Type"];
    delete headers["content-type"];

    const promise = fetch(`/api/esphome_designer/image_proxy?path=${encodeURIComponent(path)}`, {
        headers,
        credentials: "same-origin",
        cache: "no-store"
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`Image preview request failed: ${response.status}`);
        }

        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        protectedPreviewCache.set(path, { objectUrl });
        return objectUrl;
    }).catch((error) => {
        protectedPreviewCache.delete(path);
        throw error;
    });

    protectedPreviewCache.set(path, { promise });
    return promise;
};

const createContentContainer = () => {
    const content = document.createElement("div");
    content.style.width = "100%";
    content.style.height = "100%";
    content.style.overflow = "hidden";
    content.style.display = "flex";
    content.style.alignItems = "center";
    content.style.justifyContent = "center";
    content.style.backgroundColor = "#f5f5f5";
    content.style.backgroundImage = "";
    content.style.position = "relative";
    return content;
};

const getOrCreateContent = (el) => {
    let state = hostRenderState.get(el);
    let content = state?.content;

    if (!content || !content.isConnected) {
        content = createContentContainer();
        el.replaceChildren(content);
        state = { ...(state || {}), content, sourceKey: "" };
        hostRenderState.set(el, state);
        return content;
    }

    if (el.firstChild !== content || el.childNodes.length !== 1) {
        el.replaceChildren(content);
    }

    return content;
};

const setHostSourceKey = (el, sourceKey) => {
    const state = hostRenderState.get(el) || {};
    hostRenderState.set(el, { ...state, sourceKey });
};

const getHostSourceKey = (el) => hostRenderState.get(el)?.sourceKey || "";

const ensureImageElement = (content, sourceKey) => {
    const existing = content.querySelector('img[data-image-preview="true"]');
    if (existing && existing.dataset.sourceKey === sourceKey) {
        if (content.firstChild !== existing) {
            content.replaceChildren(existing);
        }
        return existing;
    }

    const img = document.createElement("img");
    img.dataset.imagePreview = "true";
    img.dataset.sourceKey = sourceKey;
    img.style.maxWidth = "100%";
    img.style.maxHeight = "100%";
    img.style.objectFit = "contain";
    img.draggable = false;
    content.replaceChildren(img);
    return img;
};

const updateOverlay = (content, selected, text) => {
    let overlay = content.querySelector('[data-image-overlay="true"]');

    if (!selected || !text) {
        overlay?.remove();
        return;
    }

    if (!overlay) {
        overlay = document.createElement("div");
        overlay.dataset.imageOverlay = "true";
        overlay.style.position = "absolute";
        overlay.style.bottom = "2px";
        overlay.style.right = "2px";
        overlay.style.background = "rgba(0,0,0,0.6)";
        overlay.style.color = "white";
        overlay.style.padding = "2px 4px";
        overlay.style.fontSize = "8px";
        overlay.style.borderRadius = "2px";
    }

    overlay.textContent = text;
    if (overlay.parentElement !== content) {
        content.appendChild(overlay);
    }
};

const renderStatusMessage = (content, html) => {
    const message = document.createElement("div");
    message.style.textAlign = "center";
    message.style.color = "#666";
    message.style.fontSize = "11px";
    message.style.padding = "8px";
    message.style.lineHeight = "1.4";
    message.innerHTML = html;
    content.replaceChildren(message);
};

const buildLocalImageStatusHtml = (filename, widget, invert, footerHtml = "") => {
    const sizeLine = `${invert ? "(inverted) " : ""}${widget.width}x${widget.height}px`;
    return `<strong>${filename}</strong><br/><span style="color:#999;font-size:9px;">${sizeLine}</span>${footerHtml}`;
};

const applyImageFilter = (img, filter) => {
    img.style.filter = filter ? filter.trim() : "";
};

const loadProtectedPreviewImage = async (img, path, sourceKey, onFailure) => {
    try {
        const objectUrl = await getProtectedPreviewObjectUrl(path);
        if (!img.isConnected || img.dataset.sourceKey !== sourceKey) {
            return;
        }
        if (img.src !== objectUrl) {
            img.src = objectUrl;
        }
    } catch (error) {
        if (!img.isConnected || img.dataset.sourceKey !== sourceKey) {
            return;
        }
        onFailure(error);
    }
};

const render = (el, widget, context) => {
    const { getColorStyle, selected, profile } = context || {};
    const props = widget.props || {};
    const url = (props.url || "").trim();
    const path = normalizeImagePath(props.path);
    const invert = !!props.invert;

    const displayType = profile?.displayType || 'binary';

    let filter = "";
    if (invert) filter += "invert(1) ";
    if (displayType === 'binary') {
        filter += "grayscale(100%) contrast(1.5) ";
    } else if (displayType === 'grayscale') {
        filter += "grayscale(100%) ";
    }

    el.style.boxSizing = "border-box";
    el.style.color = "#666";
    el.style.overflow = "visible";

    const content = getOrCreateContent(el);
    content.style.backgroundColor = "#f5f5f5";
    content.style.backgroundImage = "";

    if (props.border_width) {
        const borderColor = getColorStyle(props.border_color || "black");
        el.style.border = `${props.border_width}px solid ${borderColor}`;
        el.style.borderRadius = `${props.border_radius || 0}px`;
    } else {
        el.style.border = "none";
        el.style.borderRadius = `${props.border_radius || 0}px`;
    }
    if (props.bg_color) {
        el.style.backgroundColor = getColorStyle(props.bg_color);
    } else {
        el.style.backgroundColor = "";
    }

    if (path) {
        const filename = path.split(/[/\\]/).pop() || path;
        const sourceKey = `local:${path}`;
        const imageOverlayText = `${filename} - ${widget.width}x${widget.height}px`;
        const previousSourceKey = getHostSourceKey(el);
        const img = ensureImageElement(content, sourceKey);
        setHostSourceKey(el, sourceKey);

        applyImageFilter(img, filter);

        img.onerror = () => {
            clearProtectedPreviewCache(path);
            updateOverlay(content, false, "");
            const offlineNote = isOffline()
                ? `<br/><span style="color:#e67e22;font-size:8px;">Offline mode - preview in Home Assistant</span>`
                : "";
            renderStatusMessage(content, buildLocalImageStatusHtml(filename, widget, invert, offlineNote));
        };

        img.onload = () => {
            updateOverlay(content, selected, imageOverlayText);
        };

        if (isOffline()) {
            let imgSrc;
            if (path.match(/^[A-Za-z]:\\/)) {
                imgSrc = `file:///${path.replace(/\\/g, '/')}`;
            } else if (path.startsWith('/config/')) {
                imgSrc = null;
            } else {
                imgSrc = path;
            }

            if (imgSrc) {
                if (img.src !== imgSrc) {
                    img.src = imgSrc;
                }
                updateOverlay(content, selected, imageOverlayText);
            } else {
                updateOverlay(content, false, "");
                renderStatusMessage(
                    content,
                    `${buildLocalImageStatusHtml(filename, widget, invert)}<br/><span style="color:#e67e22;font-size:8px;">Preview available in Home Assistant</span>`
                );
            }
            return;
        }

        if (previousSourceKey !== sourceKey || !img.src) {
            void loadProtectedPreviewImage(img, path, sourceKey, () => {
                img.onerror?.(new Event('error'));
            });
        } else {
            updateOverlay(content, selected, imageOverlayText);
        }
        return;
    }

    if (url) {
        const filename = url.split("/").pop() || "Image";
        const sourceKey = `url:${url}`;
        const img = ensureImageElement(content, sourceKey);
        setHostSourceKey(el, sourceKey);

        applyImageFilter(img, filter);

        img.onerror = () => {
            updateOverlay(content, false, "");
            renderStatusMessage(content, "<strong>Image</strong><br/><span style=\"color:#999;font-size:9px;\">Load Failed</span>");
        };

        img.onload = () => {
            updateOverlay(content, selected, filename);
        };

        if (img.src !== url) {
            img.src = url;
        } else {
            updateOverlay(content, selected, filename);
        }
        return;
    }

    setHostSourceKey(el, "");
    updateOverlay(content, false, "");
    const placeholder = document.createElement("div");
    placeholder.style.textAlign = "center";
    placeholder.style.color = "#aaa";
    placeholder.style.fontSize = "11px";
    placeholder.innerHTML = "Image Widget<br/><span style='font-size:9px;color:#ccc;'>Enter valid path to resize -&gt;</span>";
    content.replaceChildren(placeholder);
};

const getSafeImageId = (w) => {
    const props = w.props || {};
    const path = normalizeImagePath(props.path);
    if (!path) return `img_${w.id.replace(/-/g, "_")}`;

    const safePath = path.replace(/[^a-zA-Z0-9]/g, "_").replace(/^_+|_+$/g, "").replace(/_+/g, "_");
    return `img_${safePath}_${w.width}x${w.height}`;
};

const exportDoc = (w, context) => {
    const { lines, getConditionCheck, profile } = context;
    const props = w.props || {};
    const path = normalizeImagePath(props.path);
    const invert = !!props.invert;

    if (!path) return;

    const safeId = getSafeImageId(w);

    const cond = getConditionCheck(w);
    if (cond) lines.push(`        ${cond}`);

    const isColor = profile?.features?.lcd || (profile?.name && (profile.name.includes("6-Color") || profile.name.includes("Color")));

    if (!isColor) {
        if (invert) {
            lines.push(`        it.image(${w.x}, ${w.y}, id(${safeId}), color_off, color_on);`);
        } else {
            lines.push(`        it.image(${w.x}, ${w.y}, id(${safeId}), color_on, color_off);`);
        }
    } else {
        lines.push(`        it.image(${w.x}, ${w.y}, id(${safeId}));`);
    }

    const borderWidth = parseInt(props.border_width || 0, 10);
    if (borderWidth > 0) {
        const borderColorProp = props.border_color || "theme_auto";
        const borderColorConst = context.getColorConst(borderColorProp);
        for (let i = 0; i < borderWidth; i++) {
            lines.push(`        it.rectangle(${w.x} + ${i}, ${w.y} + ${i}, ${w.width} - 2 * ${i}, ${w.height} - 2 * ${i}, ${borderColorConst});`);
        }
    }

    if (cond) lines.push(`        }`);
};

const exportLVGL = (w, { common }) => {
    const p = w.props || {};
    const path = normalizeImagePath(p.path);
    const url = p.url || "";
    let src = path || url || "symbol_image";
    if (path && (path.includes("/") || path.includes("."))) {
        src = getSafeImageId(w);
    }

    return {
        image: {
            ...common,
            src,
            angle: (p.rotation || 0),
            image_recolor_opa: "transp"
        }
    };
};

const onExportComponents = (context) => {
    const { lines, widgets, profile } = context;
    const targets = widgets.filter((w) => w.type === 'image');

    if (targets.length > 0) {
        const processed = new Set();
        const imageLines = [];

        targets.forEach((w) => {
            const props = w.props || {};
            const path = normalizeImagePath(props.path);
            if (!path) return;

            const safeId = getSafeImageId(w);
            if (processed.has(safeId)) return;
            processed.add(safeId);

            const imgType = resolveImageType(props, profile);
            const transparency = resolveTransparency(props, imgType);
            const dither = normalizeString(props.dither) || "FLOYDSTEINBERG";

            imageLines.push(`  - file: "${path}"`);
            imageLines.push(`    id: ${safeId}`);
            imageLines.push(`    type: ${imgType}`);
            imageLines.push(`    resize: ${w.width}x${w.height}`);
            if (transparency) imageLines.push(`    transparency: ${transparency}`);
            if (DITHER_IMAGE_TYPES.has(imgType)) imageLines.push(`    dither: ${dither}`);
        });

        if (imageLines.length > 0) {
            lines.push("image:");
            lines.push(...imageLines);
            lines.push("");
        }
    }
};

export default {
    id: "image",
    name: "Image",
    category: "Graphics",
    supportedModes: ['lvgl', 'direct', 'oepl', 'opendisplay'],
    defaults: {
        path: "/config/esphome/images/logo.png",
        url: "",
        invert: false,
        dither: "FLOYDSTEINBERG",
        image_type: "BINARY",
        render_mode: "Auto",
        size: "native",
        width: 200,
        height: 130,
        opa: 255
    },
    renderProperties: (panel, widget) => {
        const props = widget.props || {};
        const updateProp = (key, val) => {
            const newProps = { ...widget.props, [key]: val };
            AppState.updateWidget(widget.id, { props: newProps });
        };

        panel.createSection("Content", true);
        panel.addHint("Static image from ESPHome.<br/><span style='color:#888;font-size:11px;'>Replace the default path with your actual image file path.</span>");
        panel.addHint("<span style='color:#888;font-size:11px;'>Recommended paths: <code>/config/esphome/images/...</code> or <code>/config/www/...</code>. If you paste <code>/local/...</code>, it will be converted to <code>/config/www/...</code>.</span>");
        panel.addLabeledInput("Image Path", "text", props.path || "", (v) => updateProp("path", normalizeImagePath(v)));
        panel.addLabeledInput("Online Image URL", "text", props.url || "", (v) => updateProp("url", v));
        panel.endSection();

        panel.createSection("Appearance", true);
        panel.addCheckbox("Invert colors", props.invert || false, (v) => updateProp("invert", v));
        panel.addSelect("Render Mode", props.render_mode || "Auto", ["Auto", "Binary", "Grayscale", "Color (RGB565)"], (v) => updateProp("render_mode", v));
        panel.addSelect("Transparency", props.transparency || "opaque", ["opaque", "chroma_key", "alpha_channel"], (v) => updateProp("transparency", v));
        panel.addNumberWithSlider("Opacity (%)", props.opacity !== undefined ? props.opacity : 100, 0, 100, (v) => updateProp("opacity", v));

        const fillWrap = document.createElement("div");
        fillWrap.className = "field";
        fillWrap.style.marginTop = "12px";
        const isFullScreen = (widget.x === 0 && widget.y === 0 && (widget.width === 800 || widget.width === 480));
        const fillBtn = document.createElement("button");
        fillBtn.className = "btn " + (isFullScreen ? "btn-primary" : "btn-secondary") + " btn-full";
        fillBtn.textContent = isFullScreen ? "Full Screen (click to restore)" : "Fill Screen";
        fillBtn.type = "button";
        fillBtn.addEventListener("click", () => {
            if (isFullScreen) {
                AppState.updateWidget(widget.id, { x: 50, y: 50, width: 200, height: 150 });
            } else {
                const res = AppState.getCanvasDimensions();
                AppState.updateWidget(widget.id, { x: 0, y: 0, width: res.width, height: res.height });
            }
        });
        fillWrap.appendChild(fillBtn);
        panel.getContainer().appendChild(fillWrap);
        panel.endSection();

        panel.createSection("Border Style", false);
        panel.addLabeledInput("Border Width", "number", props.border_width || 0, (v) => updateProp("border_width", parseInt(v, 10)));
        panel.addColorSelector("Border Color", props.border_color || "theme_auto", null, (v) => updateProp("border_color", v));
        panel.addLabeledInput("Corner Radius", "number", props.border_radius || 0, (v) => updateProp("border_radius", parseInt(v, 10)));
        panel.addDropShadowButton(panel.getContainer(), widget.id);
        panel.endSection();
    },
    render,
    exportOpenDisplay: (w) => {
        const p = w.props || {};
        const url = (p.url || "").trim();
        const path = normalizeImagePath(p.path);

        if (url) {
            return {
                type: "dlimg",
                url,
                x: Math.round(w.x),
                y: Math.round(w.y),
                xsize: Math.round(w.width),
                ysize: Math.round(w.height),
                rotate: p.rotation || 0
            };
        }

        return {
            type: "text",
            value: `[Local Image: ${path}]`,
            x: Math.round(w.x),
            y: Math.round(w.y),
            size: 12,
            color: "red"
        };
    },
    exportOEPL: (w) => {
        const p = w.props || {};
        const url = (p.url || "").trim();
        const path = normalizeImagePath(p.path);

        if (url) {
            return {
                type: "online_image",
                url,
                x: Math.round(w.x),
                y: Math.round(w.y),
                width: Math.round(w.width),
                height: Math.round(w.height)
            };
        }

        if (path) {
            return {
                type: "image",
                file: path,
                x: Math.round(w.x),
                y: Math.round(w.y),
                width: Math.round(w.width),
                height: Math.round(w.height)
            };
        }

        return null;
    },
    export: exportDoc,
    exportLVGL,
    onExportComponents
};
