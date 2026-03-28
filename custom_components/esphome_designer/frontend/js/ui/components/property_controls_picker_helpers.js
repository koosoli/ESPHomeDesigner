import { ENTITY_DATALIST_ID, ensureEntityDatalist } from '../../io/ha_api.js';
import { openEntityPickerForWidget } from '../entity_picker.js';
import { openIconPickerForWidget } from '../icon_picker.js';
import { iconPickerData } from '../../core/constants_icons.js';

/**
 * @typedef {{
 *   getContainer: () => HTMLElement | null
 * }} PickerControls
 */

/**
 * @typedef {{
 *   id: string,
 *   props?: Record<string, any>
 * }} PickerWidget
 */

/**
 * @typedef {{
 *   code: string,
 *   name?: string
 * }} PickerIcon
 */

/**
 * @param {PickerControls} controls
 * @param {string} label
 * @param {string} type
 * @param {string} value
 * @param {(value: string) => void} onChange
 * @param {PickerWidget} widget
 */
export function addLabeledInputWithPickerControl(controls, label, type, value, onChange, widget) {
    const container = controls.getContainer();
    if (!container) return;

    const wrap = document.createElement("div");
    wrap.className = "field";
    const lbl = document.createElement("div");
    lbl.className = "prop-label";
    lbl.textContent = label;

    const inputRow = document.createElement("div");
    inputRow.style.display = "flex";
    inputRow.style.gap = "4px";

    const input = document.createElement("input");
    input.className = "prop-input";
    input.type = type;
    input.value = value;
    input.style.flex = "1";
    const isEntity = label.toLowerCase().includes("entity");
    input.placeholder = isEntity ? "Pick entity or type mqtt:topic..." : "Start typing or browse...";
    input.autocomplete = "off";

    if (ENTITY_DATALIST_ID) {
        input.setAttribute("list", ENTITY_DATALIST_ID);
        ensureEntityDatalist();
    }

    input.addEventListener("input", () => onChange(input.value));

    const pickerBtn = document.createElement("button");
    pickerBtn.className = "btn btn-secondary";
    pickerBtn.textContent = "v";
    pickerBtn.style.padding = "4px 8px";
    pickerBtn.style.fontSize = "10px";
    pickerBtn.style.minWidth = "32px";
    pickerBtn.type = "button";
    pickerBtn.title = "Browse all entities";
    pickerBtn.addEventListener("click", () => {
        openEntityPickerForWidget(widget, input, (/** @type {string} */ selectedEntityId) => {
            input.value = selectedEntityId;
            onChange(selectedEntityId);
        });
    });
    inputRow.appendChild(input);
    inputRow.appendChild(pickerBtn);

    wrap.appendChild(lbl);
    wrap.appendChild(inputRow);
    if (isEntity && !value) {
        const hint = document.createElement("div");
        hint.style.fontSize = "11px";
        hint.style.color = "#666";
        hint.style.marginTop = "4px";
        hint.style.lineHeight = "1.4";
        hint.textContent = "Tip: Use mqtt:topic/path for MQTT sources";
        wrap.appendChild(hint);
    }
    container.appendChild(wrap);
}

/**
 * @param {PickerControls} controls
 * @param {string} label
 * @param {string} currentValue
 * @param {(value: string) => void} onSelect
 * @param {PickerWidget} widget
 */
export function addIconPickerControl(controls, label, currentValue, onSelect, widget) {
    const container = controls.getContainer();
    if (!container) return;

    const wrap = document.createElement("div");
    wrap.className = "field";
    const lbl = document.createElement("div");
    lbl.className = "prop-label";
    lbl.textContent = label;
    wrap.appendChild(lbl);

    const pickerSelect = document.createElement("select");
    pickerSelect.className = "select";
    pickerSelect.style.fontFamily = "MDI, monospace, system-ui";
    pickerSelect.style.fontSize = "16px";
    pickerSelect.style.lineHeight = "1.5";
    pickerSelect.style.width = "100%";
    pickerSelect.style.marginBottom = "4px";

    const placeholderOpt = document.createElement("option");
    placeholderOpt.value = "";
    placeholderOpt.textContent = "-- Quick visual picker --";
    placeholderOpt.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
    pickerSelect.appendChild(placeholderOpt);

    const currentCode = (currentValue || "").replace("mdi:", "").toUpperCase();

    /** @type {PickerIcon[]} */ (iconPickerData).forEach((icon) => {
        const opt = document.createElement("option");
        opt.value = icon.code;
        const cp = 0xf0000 + parseInt(icon.code.slice(1), 16);
        const glyph = String.fromCodePoint(cp);
        opt.textContent = glyph + "  " + icon.code + (icon.name ? ` (${icon.name})` : "");
        opt.style.fontFamily = "MDI, monospace, system-ui";
        if (icon.code === currentCode) {
            opt.selected = true;
        }
        pickerSelect.appendChild(opt);
    });

    pickerSelect.addEventListener("change", () => {
        if (pickerSelect.value) {
            onSelect(pickerSelect.value);
        }
    });

    wrap.appendChild(pickerSelect);

    const inputRow = document.createElement("div");
    inputRow.style.display = "flex";
    inputRow.style.gap = "4px";

    const manualInput = document.createElement("input");
    manualInput.className = "prop-input";
    manualInput.type = "text";
    manualInput.placeholder = "MDI Hex (Fxxxx)";
    manualInput.value = currentCode;
    manualInput.style.flex = "1";
    manualInput.style.fontFamily = "monospace";

    manualInput.addEventListener("input", () => {
        const clean = (manualInput.value || "").trim().toUpperCase().replace(/^0X/, "").replace(/^MDI:/, "");
        if (/^F[0-9A-F]{4}$/i.test(clean)) {
            onSelect(clean);
            const opt = Array.from(pickerSelect.options).find((option) => option.value === clean);
            pickerSelect.value = opt ? clean : "";
        } else if (clean === "") {
            onSelect("");
            pickerSelect.value = "";
        }
    });

    inputRow.appendChild(manualInput);

    const pickerBtn = document.createElement("button");
    pickerBtn.className = "btn btn-secondary";
    pickerBtn.textContent = "*";
    pickerBtn.style.padding = "4px 8px";
    pickerBtn.style.fontSize = "14px";
    pickerBtn.type = "button";
    pickerBtn.title = "Open full icon browser";
    pickerBtn.addEventListener("click", () => {
        openIconPickerForWidget(widget, manualInput);
    });
    inputRow.appendChild(pickerBtn);

    wrap.appendChild(inputRow);

    const hint = document.createElement("div");
    hint.className = "prop-hint";
    hint.innerHTML = 'Browse <a href="https://pictogrammers.com/library/mdi/icon/" target="_blank" style="color: #03a9f4; text-decoration: none;">Pictogrammers MDI</a>';
    wrap.appendChild(hint);

    container.appendChild(wrap);
}

/**
 * @param {PickerControls} controls
 * @param {string} label
 * @param {string} value
 * @param {(value: string) => void} onChange
 * @param {PickerWidget} widget
 */
export function addIconInputControl(controls, label, value, onChange, widget) {
    const container = controls.getContainer();
    if (!container) return;

    const wrap = document.createElement("div");
    wrap.className = "field";
    const lbl = document.createElement("div");
    lbl.className = "prop-label";
    lbl.textContent = label;

    const inputRow = document.createElement("div");
    inputRow.style.display = "flex";
    inputRow.style.gap = "4px";

    const input = document.createElement("input");
    input.className = "prop-input";
    input.type = "text";
    input.value = value;
    input.style.flex = "1";
    input.addEventListener("input", () => onChange(input.value));

    const pickerBtn = document.createElement("button");
    pickerBtn.className = "btn btn-secondary";
    pickerBtn.textContent = "*";
    pickerBtn.style.padding = "4px 8px";
    pickerBtn.style.fontSize = "14px";
    pickerBtn.type = "button";
    pickerBtn.addEventListener("click", () => {
        openIconPickerForWidget(widget, input);
    });
    inputRow.appendChild(input);
    inputRow.appendChild(pickerBtn);

    wrap.appendChild(lbl);
    wrap.appendChild(inputRow);
    container.appendChild(wrap);
}

/**
 * @param {PickerControls} controls
 * @param {string} label
 * @param {string} type
 * @param {string} value
 * @param {(value: string) => void} onChange
 * @param {PickerWidget} widget
 */
export function addLabeledInputWithIconPickerControl(controls, label, type, value, onChange, widget) {
    const container = controls.getContainer();
    if (!container) return;

    const wrap = document.createElement("div");
    wrap.className = "field";
    const lbl = document.createElement("div");
    lbl.className = "prop-label";
    lbl.textContent = label;

    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.gap = "4px";
    wrapper.style.flex = "1";

    const input = document.createElement("input");
    input.className = "prop-input";
    input.type = type;
    input.value = value;
    input.style.flex = "1";

    input.onchange = (e) => onChange((/** @type {HTMLInputElement} */ (e.target)).value);
    input.oninput = (e) => onChange((/** @type {HTMLInputElement} */ (e.target)).value);

    const btn = document.createElement("button");
    btn.className = "btn btn-secondary";
    btn.innerHTML = '<span class="mdi mdi-emoticon-outline"></span>';
    btn.title = "Pick MDI Icon";
    btn.style.minWidth = "32px";
    btn.style.padding = "0 8px";
    btn.onclick = () => {
        openIconPickerForWidget(widget, input);
    };

    wrapper.appendChild(input);
    wrapper.appendChild(btn);

    wrap.appendChild(lbl);
    wrap.appendChild(wrapper);
    container.appendChild(wrap);
}

/**
 * @param {PickerControls} controls
 * @param {string} label
 * @param {string} type
 * @param {string} value
 * @param {string[]} suggestions
 * @param {(value: string) => void} onChange
 */
export function addLabeledInputWithDataListControl(controls, label, type, value, suggestions, onChange) {
    const container = controls.getContainer();
    if (!container) return;

    const wrap = document.createElement("div");
    wrap.className = "field";
    const lbl = document.createElement("div");
    lbl.className = "prop-label";
    lbl.textContent = label;

    const listId = "datalist_" + Math.random().toString(36).substr(2, 9);
    const dataList = document.createElement("datalist");
    dataList.id = listId;
    suggestions.forEach((suggestion) => {
        const opt = document.createElement("option");
        opt.value = suggestion;
        dataList.appendChild(opt);
    });

    const input = document.createElement("input");
    input.className = "prop-input";
    input.type = type;
    input.value = value;
    input.setAttribute("list", listId);
    input.addEventListener("input", () => onChange(input.value));
    input.addEventListener("change", () => onChange(input.value));

    wrap.appendChild(lbl);
    wrap.appendChild(input);
    wrap.appendChild(dataList);
    container.appendChild(wrap);
}
