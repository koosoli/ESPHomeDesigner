import { AppState } from '../../core/state';
import { MIXED_VALUE, parseColor, hexToRgb, rgbToHex } from '../../utils/color_utils.js';

/**
 * @typedef {{
 *   getContainer: () => HTMLElement | null,
 *   addSelect: (...args: any[]) => any,
 *   panel: { containerStack: HTMLElement[] }
 * }} CompoundControls
 */

/**
 * @typedef {{
 *   value: string,
 *   label?: string,
 *   icon?: string
 * }} SegmentedOption
 */

/**
 * @typedef {{ name?: string }} PageOption
 */

/**
 * @param {CompoundControls} controls
 * @param {string} label
 * @param {string} value
 * @param {(value: string) => void} onChange
 */
export function addColorMixerControl(controls, label, value, onChange) {
    const container = controls.getContainer();
    if (!container) return;

    const wrap = document.createElement("div");
    wrap.className = "field";
    wrap.style.marginBottom = "10px";

    const lbl = document.createElement("div");
    lbl.className = "prop-label";
    lbl.textContent = label;
    wrap.appendChild(lbl);

    let hex = value === MIXED_VALUE ? "" : parseColor(value);
    const rgb = hexToRgb(value === MIXED_VALUE ? "#000000" : hex);
    let r = rgb.r;
    let g = rgb.g;
    let b = rgb.b;

    const mixerContainer = document.createElement("div");
    mixerContainer.style.background = "var(--bg)";
    mixerContainer.style.padding = "8px";
    mixerContainer.style.borderRadius = "6px";
    mixerContainer.style.border = "1px solid var(--border-subtle)";

    const topRow = document.createElement("div");
    topRow.style.display = "flex";
    topRow.style.alignItems = "center";
    topRow.style.marginBottom = "8px";
    topRow.style.gap = "8px";

    const previewBox = document.createElement("div");
    previewBox.style.width = "24px";
    previewBox.style.height = "24px";
    previewBox.style.borderRadius = "4px";
    previewBox.style.border = "1px solid #ccc";
    if (value === MIXED_VALUE) {
        previewBox.style.background = "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)";
        previewBox.style.backgroundSize = "8px 8px";
        previewBox.style.backgroundPosition = "0 0, 0 4px, 4px -4px, -4px 0px";
        previewBox.style.backgroundColor = "white";
    } else {
        previewBox.style.backgroundColor = hex;
    }

    const hexInput = document.createElement("input");
    hexInput.type = "text";
    hexInput.className = "prop-input";
    hexInput.style.flex = "1";
    hexInput.style.textTransform = "uppercase";
    hexInput.value = value === MIXED_VALUE ? "" : hex;
    if (value === MIXED_VALUE) hexInput.placeholder = "Mixed Colors";

    topRow.appendChild(previewBox);
    topRow.appendChild(hexInput);
    mixerContainer.appendChild(topRow);

    /**
     * @param {string} sliderLabel
     * @param {string} sliderValue
     * @param {string} color
     */
    const createSlider = (sliderLabel, sliderValue, color) => {
        const row = document.createElement("div");
        row.style.display = "flex";
        row.style.alignItems = "center";
        row.style.marginBottom = "4px";
        row.style.fontSize = "11px";

        const rowLbl = document.createElement("span");
        rowLbl.textContent = sliderLabel;
        rowLbl.style.width = "15px";
        rowLbl.style.fontWeight = "bold";

        const slider = document.createElement("input");
        slider.type = "range";
        slider.min = "0";
        slider.max = "255";
        slider.value = sliderValue;
        slider.style.flex = "1";
        slider.style.marginLeft = "4px";
        slider.style.accentColor = color;

        const valLbl = document.createElement("span");
        valLbl.textContent = sliderValue;
        valLbl.style.width = "25px";
        valLbl.style.textAlign = "right";
        valLbl.style.marginLeft = "4px";

        row.appendChild(rowLbl);
        row.appendChild(slider);
        row.appendChild(valLbl);
        return { row, slider, valLbl };
    };

    const rSlider = createSlider("R", String(r), "red");
    const gSlider = createSlider("G", String(g), "green");
    const bSlider = createSlider("B", String(b), "blue");

    mixerContainer.appendChild(rSlider.row);
    mixerContainer.appendChild(gSlider.row);
    mixerContainer.appendChild(bSlider.row);

    wrap.appendChild(mixerContainer);
    container.appendChild(wrap);

    const updateFromSliders = () => {
        r = parseInt(rSlider.slider.value, 10);
        g = parseInt(gSlider.slider.value, 10);
        b = parseInt(bSlider.slider.value, 10);

        rSlider.valLbl.textContent = String(r);
        gSlider.valLbl.textContent = String(g);
        bSlider.valLbl.textContent = String(b);

        const newHex = rgbToHex(r, g, b).toUpperCase();
        hexInput.value = newHex;
        previewBox.style.backgroundColor = newHex;
        onChange(newHex);
    };

    const updateFromHex = () => {
        let nextValue = hexInput.value.trim();
        if (!nextValue.startsWith("#")) nextValue = "#" + nextValue;

        if (/^#[0-9A-F]{6}$/i.test(nextValue)) {
            const rgbValue = hexToRgb(nextValue);
            r = rgbValue.r;
            g = rgbValue.g;
            b = rgbValue.b;

            rSlider.slider.value = String(r);
            rSlider.valLbl.textContent = String(r);
            gSlider.slider.value = String(g);
            gSlider.valLbl.textContent = String(g);
            bSlider.slider.value = String(b);
            bSlider.valLbl.textContent = String(b);

            previewBox.style.backgroundColor = nextValue;
            onChange(nextValue);
        }
    };

    rSlider.slider.addEventListener("input", updateFromSliders);
    gSlider.slider.addEventListener("input", updateFromSliders);
    bSlider.slider.addEventListener("input", updateFromSliders);
    hexInput.addEventListener("input", updateFromHex);
    hexInput.addEventListener("change", updateFromHex);
}

/**
 * @param {CompoundControls} controls
 * @param {string} label
 * @param {SegmentedOption[]} options
 * @param {string} value
 * @param {(value: string) => void} onChange
 */
export function addSegmentedControlHelper(controls, label, options, value, onChange) {
    const container = controls.getContainer();
    if (!container) return;

    const wrap = document.createElement("div");
    wrap.className = "field";
    const lbl = document.createElement("div");
    lbl.className = "prop-label";
    lbl.textContent = label;

    const control = document.createElement("div");
    control.className = "segmented-control";

    options.forEach((opt) => {
        const item = document.createElement("div");
        item.className = "segment-item" + (opt.value === value ? " active" : "");
        item.title = opt.label || opt.value;

        if (opt.icon) {
            item.innerHTML = `<i class="mdi ${opt.icon}"></i>`;
        } else {
            item.textContent = opt.label || opt.value;
        }

        item.onclick = () => {
            control.querySelectorAll(".segment-item").forEach((segment) => segment.classList.remove("active"));
            item.classList.add("active");
            onChange(opt.value);
        };

        control.appendChild(item);
    });

    wrap.appendChild(lbl);
    wrap.appendChild(control);
    container.appendChild(wrap);
}

/**
 * @param {CompoundControls} controls
 * @param {string} label
 * @param {string | number} value
 * @param {number} min
 * @param {number} max
 * @param {(value: number) => void} onChange
 */
export function addNumberWithSliderControl(controls, label, value, min, max, onChange) {
    const container = controls.getContainer();
    if (!container) return;

    const wrap = document.createElement("div");
    wrap.className = "field";
    const lbl = document.createElement("div");
    lbl.className = "prop-label";
    lbl.textContent = label;

    const hybrid = document.createElement("div");
    hybrid.className = "slider-hybrid";

    const isMixed = value === MIXED_VALUE;

    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = String(min);
    slider.max = String(max);
    slider.value = String(isMixed ? min : value);

    const input = document.createElement("input");
    input.className = "prop-input";
    input.type = "number";
    input.value = isMixed ? "" : String(value);
    input.min = String(min);
    input.max = String(max);
    if (isMixed) input.placeholder = "Mixed";

    slider.addEventListener("input", () => {
        if (isMixed) input.placeholder = "";
        input.value = slider.value;
        onChange(parseInt(slider.value, 10));
    });

    input.addEventListener("input", () => {
        slider.value = input.value;
        onChange(parseInt(input.value, 10));
    });

    hybrid.appendChild(slider);
    hybrid.appendChild(input);
    wrap.appendChild(lbl);
    wrap.appendChild(hybrid);
    container.appendChild(wrap);
}

/**
 * @param {CompoundControls} controls
 * @param {() => void} callback
 */
export function addCompactPropertyRowControl(controls, callback) {
    const container = controls.getContainer();
    if (!container) return;

    const grid = document.createElement("div");
    grid.className = "prop-grid-2";
    container.appendChild(grid);

    controls.panel.containerStack.push(grid);
    callback();
    controls.panel.containerStack.pop();
}

/**
 * @param {CompoundControls} controls
 * @param {string} label
 * @param {string} value
 * @param {(value: string) => void} onChange
 */
export function addPageSelectorControl(controls, label, value, onChange) {
    const pages = /** @type {PageOption[]} */ (AppState.project?.pages || []);
    const options = [
        { value: "relative_prev", label: "Previous (Automatic)" },
        { value: "relative_next", label: "Next (Automatic)" },
        { value: "home", label: "Home / Dashboard" }
    ];

    pages.forEach((page, idx) => {
        options.push({
            value: idx.toString(),
            label: `Page ${idx + 1}: ${page.name || 'Untitled'}`
        });
    });

    controls.addSelect(label, value, options, onChange);
}

/**
 * @param {CompoundControls} controls
 * @param {HTMLElement | null} container
 * @param {string} widgetId
 */
export function addDropShadowButtonControl(controls, container, widgetId) {
    const targetContainer = container || controls.getContainer();
    if (!targetContainer) return;

    const wrap = document.createElement("div");
    wrap.className = "field";
    wrap.style.marginTop = "8px";

    const btn = document.createElement("button");
    btn.className = "btn btn-secondary btn-full btn-xs";
    btn.innerHTML = `<span class="mdi mdi-box-shadow"></span> Create Drop Shadow`;
    btn.onclick = () => {
        const selected = AppState.selectedWidgetIds || [];
        if (selected.includes(widgetId)) {
            AppState.createDropShadow(selected);
        } else {
            AppState.createDropShadow(widgetId);
        }
    };

    wrap.appendChild(btn);
    targetContainer.appendChild(wrap);
}

/**
 * @param {CompoundControls} controls
 * @param {string} text
 */
export function addSectionLabelControl(controls, text) {
    const container = controls.getContainer();
    if (!container) return;

    const section = document.createElement("div");
    section.className = "sidebar-section-label";
    section.textContent = text;
    container.appendChild(section);
}
