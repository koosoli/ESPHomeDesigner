import { AppState } from '../../core/state';
import { MIXED_VALUE, parseColor, hexToRgb, rgbToHex } from '../../utils/color_utils.js';
import { isRGBDevice, getAvailableColors } from '../../utils/device.js';
import { ENTITY_DATALIST_ID, ensureEntityDatalist } from '../../io/ha_api.js';
import { debounce } from '../../utils/helpers.js';
import { openEntityPickerForWidget } from '../entity_picker.js';
import { openIconPickerForWidget } from '../icon_picker.js';
import { iconPickerData } from '../../core/constants_icons.js';

/**
 * PropertyControls handles the creation of UI elements for the properties panel.
 * Extracted from properties.js to improve maintainability.
 */
export class PropertyControls {
    constructor(panel) {
        this.panel = panel;
    }

    getContainer() {
        return this.panel.getContainer();
    }

    /**
     * @param {string} label
     * @param {string} type
     * @param {any} value
     * @param {(val: string) => void} onChange
     */
    addLabeledInput(label, type, value, onChange) {
        const wrap = document.createElement("div");
        wrap.className = "field";
        const lbl = document.createElement("div");
        lbl.className = "prop-label";
        lbl.textContent = label;

        const isMixed = value === MIXED_VALUE;

        let input;
        if (type === "textarea") {
            input = document.createElement("textarea");
            input.className = "prop-input";
            input.style.minHeight = "60px";
            input.style.resize = "vertical";
            input.style.fontFamily = "inherit";
            input.value = isMixed ? "" : (value || "");
            if (isMixed) input.placeholder = "Mixed Values";
        } else {
            input = document.createElement("input");
            input.className = "prop-input";
            input.type = type;
            input.value = isMixed ? "" : value;
            if (isMixed) {
                input.placeholder = "Mixed";
                input.style.fontStyle = "italic";
                input.style.color = "#888";
            }
        }

        // Use no debounce for numeric inputs to allow real-time feedback when holding arrows
        const debouncedOnChange = (type === 'number' || type === 'range') ? onChange : debounce(onChange, 50);

        input.addEventListener("input", () => {
            if (isMixed) {
                input.style.fontStyle = "normal";
                input.style.color = "inherit";
            }
            const el = /** @type {HTMLInputElement | HTMLTextAreaElement} */ (input);
            debouncedOnChange(el.value);
        });

        input.addEventListener("change", () => {
            const el = /** @type {HTMLInputElement | HTMLTextAreaElement} */ (input);
            onChange(el.value);
        });

        wrap.appendChild(lbl);
        wrap.appendChild(input);
        this.getContainer().appendChild(wrap);
    }

    /**
     * @param {string} label
     * @param {any} value
     * @param {any[]} options
     * @param {(val: string) => void} onChange
     */
    addSelect(label, value, options, onChange) {
        const wrap = document.createElement("div");
        wrap.className = "field";
        const lbl = document.createElement("div");
        lbl.className = "prop-label";
        lbl.textContent = label;
        const select = document.createElement("select");
        select.className = "prop-input";

        const isMixed = value === MIXED_VALUE;
        if (isMixed) {
            const mixedOpt = document.createElement("option");
            mixedOpt.value = MIXED_VALUE;
            mixedOpt.textContent = "(Mixed)";
            mixedOpt.selected = true;
            mixedOpt.disabled = true;
            select.appendChild(mixedOpt);
        }

        options = options || [];
        options.forEach(opt => {
            const o = document.createElement("option");
            if (typeof opt === 'object' && opt !== null) {
                o.value = opt.value;
                o.textContent = opt.label;
                if (!isMixed && String(opt.value) === String(value)) o.selected = true;
            } else {
                o.value = opt;
                o.textContent = opt;
                if (!isMixed && String(opt) === String(value)) o.selected = true;
            }
            select.appendChild(o);
        });
        select.addEventListener("change", () => {
            const el = /** @type {HTMLSelectElement} */ (select);
            onChange(el.value);
        });
        wrap.appendChild(lbl);
        wrap.appendChild(select);
        this.getContainer().appendChild(wrap);
    }

    /**
     * @param {string} label
     * @param {any} value
     * @param {(val: boolean) => void} onChange
     */
    addCheckbox(label, value, onChange) {
        const wrap = document.createElement("div");
        wrap.className = "field";
        wrap.style.marginBottom = "8px";

        const checkboxLabel = document.createElement("label");
        checkboxLabel.style.display = "flex";
        checkboxLabel.style.alignItems = "center";
        checkboxLabel.style.gap = "8px";
        checkboxLabel.style.fontSize = "13px";
        checkboxLabel.style.cursor = "pointer";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const isMixed = value === MIXED_VALUE;
        if (isMixed) {
            checkbox.indeterminate = true;
        } else {
            checkbox.checked = !!value;
        }

        checkbox.style.width = "16px";
        checkbox.style.height = "16px";
        checkbox.style.margin = "0";
        checkbox.style.cursor = "pointer";
        checkbox.addEventListener("change", () => {
            const el = /** @type {HTMLInputElement} */ (checkbox);
            el.indeterminate = false;
            onChange(el.checked);
        });

        const span = document.createElement("span");
        span.textContent = label;

        checkboxLabel.appendChild(checkbox);
        checkboxLabel.appendChild(span);
        wrap.appendChild(checkboxLabel);
        this.getContainer().appendChild(wrap);
    }

    addHint(htmlContent) {
        const hint = document.createElement("div");
        hint.style.fontSize = "11px";
        hint.style.color = "#666";
        hint.style.marginTop = "4px";
        hint.style.marginBottom = "12px";
        hint.style.lineHeight = "1.4";
        hint.innerHTML = htmlContent;
        this.getContainer().appendChild(hint);
    }

    addLabeledInputWithPicker(label, type, value, onChange, widget) {
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
        input.placeholder = "Start typing or click ▼ to pick...";
        input.autocomplete = "off";

        if (ENTITY_DATALIST_ID) {
            input.setAttribute('list', ENTITY_DATALIST_ID);
            ensureEntityDatalist();
        }

        input.addEventListener("input", () => onChange(input.value));

        const pickerBtn = document.createElement("button");
        pickerBtn.className = "btn btn-secondary";
        pickerBtn.innerHTML = "▼";
        pickerBtn.style.padding = "4px 8px";
        pickerBtn.style.fontSize = "10px";
        pickerBtn.style.minWidth = "32px";
        pickerBtn.type = "button";
        pickerBtn.title = "Browse all entities";
        pickerBtn.addEventListener("click", () => {
            openEntityPickerForWidget(widget, input, (selectedEntityId) => {
                input.value = selectedEntityId;
                onChange(selectedEntityId);
            });
        });
        inputRow.appendChild(input);
        inputRow.appendChild(pickerBtn);

        wrap.appendChild(lbl);
        wrap.appendChild(inputRow);
        this.getContainer().appendChild(wrap);
    }

    addIconPicker(label, currentValue, onSelect, widget) {
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

        iconPickerData.forEach(icon => {
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
                const opt = Array.from(pickerSelect.options).find(o => o.value === clean);
                if (opt) pickerSelect.value = clean;
                else pickerSelect.value = "";
            } else if (clean === "") {
                onSelect("");
                pickerSelect.value = "";
            }
        });

        inputRow.appendChild(manualInput);

        const pickerBtn = document.createElement("button");
        pickerBtn.className = "btn btn-secondary";
        pickerBtn.textContent = "★";
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

        this.getContainer().appendChild(wrap);
    }

    addColorMixer(label, value, onChange) {
        const wrap = document.createElement("div");
        wrap.className = "field";
        wrap.style.marginBottom = "10px";

        const lbl = document.createElement("div");
        lbl.className = "prop-label";
        lbl.textContent = label;
        wrap.appendChild(lbl);

        let r = 0, g = 0, b = 0;
        let hex = "#000000";

        const isMixed = value === MIXED_VALUE;

        hex = isMixed ? "" : parseColor(value);
        const rgb = hexToRgb(isMixed ? "#000000" : hex);
        r = rgb.r; g = rgb.g; b = rgb.b;

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
        if (isMixed) {
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
        hexInput.value = isMixed ? "" : hex;
        if (isMixed) hexInput.placeholder = "Mixed Colors";

        topRow.appendChild(previewBox);
        topRow.appendChild(hexInput);
        mixerContainer.appendChild(topRow);

        const createSlider = (sliderLabel, val, color) => {
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
            slider.value = val;
            slider.style.flex = "1";
            slider.style.marginLeft = "4px";
            slider.style.accentColor = color;

            const valLbl = document.createElement("span");
            valLbl.textContent = val;
            valLbl.style.width = "25px";
            valLbl.style.textAlign = "right";
            valLbl.style.marginLeft = "4px";

            row.appendChild(rowLbl);
            row.appendChild(slider);
            row.appendChild(valLbl);
            return { row, slider, valLbl };
        };

        const rSlider = createSlider("R", r, "red");
        const gSlider = createSlider("G", g, "green");
        const bSlider = createSlider("B", b, "blue");

        mixerContainer.appendChild(rSlider.row);
        mixerContainer.appendChild(gSlider.row);
        mixerContainer.appendChild(bSlider.row);

        wrap.appendChild(mixerContainer);
        this.getContainer().appendChild(wrap);

        const updateFromSliders = () => {
            r = parseInt(rSlider.slider.value);
            g = parseInt(gSlider.slider.value);
            b = parseInt(bSlider.slider.value);

            rSlider.valLbl.textContent = String(r);
            gSlider.valLbl.textContent = String(g);
            bSlider.valLbl.textContent = String(b);

            const newHex = rgbToHex(r, g, b).toUpperCase();
            hexInput.value = newHex;
            previewBox.style.backgroundColor = newHex;

            onChange(newHex);
        };

        const updateFromHex = () => {
            let val = hexInput.value.trim();
            if (!val.startsWith("#")) val = "#" + val;

            if (/^#[0-9A-F]{6}$/i.test(val)) {
                const rgbVal = hexToRgb(val);
                r = rgbVal.r; g = rgbVal.g; b = rgbVal.b;

                rSlider.slider.value = String(r); rSlider.valLbl.textContent = String(r);
                gSlider.slider.value = String(g); gSlider.valLbl.textContent = String(g);
                bSlider.slider.value = String(b); bSlider.valLbl.textContent = String(b);

                previewBox.style.backgroundColor = val;
                onChange(val);
            }
        };

        rSlider.slider.addEventListener("input", updateFromSliders);
        gSlider.slider.addEventListener("input", updateFromSliders);
        bSlider.slider.addEventListener("input", updateFromSliders);

        hexInput.addEventListener("input", updateFromHex);
        hexInput.addEventListener("change", updateFromHex);
    }

    addColorSelector(label, value, options, onChange) {
        if (!options) {
            options = getAvailableColors();
        }
        if (isRGBDevice()) {
            this.addColorMixer(label, value, onChange);
        } else {
            this.addSelect(label, value, options, onChange);
        }
    }

    addSegmentedControl(label, options, value, onChange) {
        const wrap = document.createElement("div");
        wrap.className = "field";
        const lbl = document.createElement("div");
        lbl.className = "prop-label";
        lbl.textContent = label;

        const control = document.createElement("div");
        control.className = "segmented-control";

        options.forEach(opt => {
            const item = document.createElement("div");
            item.className = "segment-item" + (opt.value === value ? " active" : "");
            item.title = opt.label || opt.value;

            if (opt.icon) {
                item.innerHTML = `<i class="mdi ${opt.icon}"></i>`;
            } else {
                item.textContent = opt.label || opt.value;
            }

            item.onclick = () => {
                control.querySelectorAll(".segment-item").forEach(i => i.classList.remove("active"));
                item.classList.add("active");
                onChange(opt.value);
            };
            control.appendChild(item);
        });

        wrap.appendChild(lbl);
        wrap.appendChild(control);
        this.getContainer().appendChild(wrap);
    }

    addNumberWithSlider(label, value, min, max, onChange) {
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
        slider.min = min;
        slider.max = max;
        slider.value = isMixed ? min : value;

        const input = document.createElement("input");
        input.className = "prop-input";
        input.type = "number";
        input.value = isMixed ? "" : value;
        input.min = min;
        input.max = max;
        if (isMixed) input.placeholder = "Mixed";

        // Numeric inputs with sliders should be immediate for maximum fluidity
        const debouncedOnChange = onChange;

        slider.addEventListener("input", () => {
            if (isMixed) input.placeholder = "";
            input.value = slider.value;
            debouncedOnChange(parseInt(slider.value, 10));
        });

        input.addEventListener("input", () => {
            slider.value = input.value;
            debouncedOnChange(parseInt(input.value, 10));
        });

        hybrid.appendChild(slider);
        hybrid.appendChild(input);
        wrap.appendChild(lbl);
        wrap.appendChild(hybrid);
        this.getContainer().appendChild(wrap);
    }

    addCompactPropertyRow(callback) {
        const grid = document.createElement("div");
        grid.className = "prop-grid-2";
        this.getContainer().appendChild(grid);

        this.panel.containerStack.push(grid);
        callback();
        this.panel.containerStack.pop();
    }

    addCommonLVGLProperties(widget, props) {
        const updateProp = (key, value) => {
            const newProps = { ...widget.props, [key]: value };
            AppState.updateWidget(widget.id, { props: newProps });
        };

        this.panel.createSection("Common LVGL", false);

        const flagContainer = document.createElement("div");
        flagContainer.style.display = "grid";
        flagContainer.style.gridTemplateColumns = "1fr 1fr";
        flagContainer.style.gap = "4px";

        this.getContainer().appendChild(flagContainer);

        const addFlag = (label, key, def = false) => {
            const wrap = document.createElement("div");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = props[key] !== undefined ? props[key] : def;
            checkbox.addEventListener("change", () => updateProp(key, checkbox.checked));
            const lbl = document.createElement("span");
            lbl.textContent = " " + label;
            lbl.style.fontSize = "10px";
            wrap.appendChild(checkbox);
            wrap.appendChild(lbl);
            flagContainer.appendChild(wrap);
        };

        addFlag("Hidden", "hidden", false);
        addFlag("Clickable", "clickable", true);
        addFlag("Checkable", "checkable", false);
        addFlag("Scrollable", "scrollable", true);
        addFlag("Floating", "floating", false);
        addFlag("Ignore Layout", "ignore_layout", false);

        this.addSelect("Scrollbar Mode", props.scrollbar_mode || "AUTO", ["AUTO", "ON", "OFF", "ACTIVE"], (v) => updateProp("scrollbar_mode", v));
        this.panel.endSection();
    }

    addVisibilityConditions(widget) {
        widget.condition_entity = widget.condition_entity || "";
        widget.condition_operator = widget.condition_operator || "==";
        widget.condition_state = widget.condition_state || "";
        widget.condition_min = widget.condition_min || "";
        widget.condition_max = widget.condition_max || "";

        const helpWrap = document.createElement("div");
        helpWrap.className = "field";
        helpWrap.style.fontSize = "9px";
        helpWrap.style.color = "#9499a6";
        helpWrap.style.marginBottom = "6px";
        helpWrap.innerHTML = "Show/hide this widget based on an entity's state.";
        this.getContainer().appendChild(helpWrap);

        this.addLabeledInputWithPicker("Condition Entity", "text", widget.condition_entity, (v) => {
            AppState.updateWidget(widget.id, { condition_entity: v });
        }, widget);

        const operators = ["==", "!=", "<", ">", "<=", ">="];
        this.addSelect("Operator", widget.condition_operator, operators, (v) => {
            AppState.updateWidget(widget.id, { condition_operator: v });
        });

        const commonStates = ["on", "off", "open", "closed", "true", "false", "home", "not_home", "locked", "unlocked", "active", "inactive", "detected", "clear", "occupied"];
        this.addLabeledInputWithDataList("Condition State", "text", widget.condition_state, commonStates, (v) => {
            AppState.updateWidget(widget.id, { condition_state: v });
        });

        this.addLabeledInput("Min Value (Range)", "text", widget.condition_min, (v) => {
            AppState.updateWidget(widget.id, { condition_min: v });
        });

        this.addLabeledInput("Max Value (Range)", "text", widget.condition_max, (v) => {
            AppState.updateWidget(widget.id, { condition_max: v });
        });

        const clearWrap = document.createElement("div");
        clearWrap.className = "field";
        clearWrap.style.marginTop = "8px";
        const clearBtn = document.createElement("button");
        clearBtn.className = "btn btn-secondary btn-full";
        clearBtn.textContent = "Clear Condition";
        clearBtn.type = "button";
        clearBtn.addEventListener("click", () => {
            AppState.updateWidget(widget.id, {
                condition_entity: "",
                condition_operator: "==",
                condition_state: "",
                condition_min: "",
                condition_max: ""
            });
        });
        clearWrap.appendChild(clearBtn);
        this.getContainer().appendChild(clearWrap);
    }

    addPageSelector(label, value, onChange) {
        const pages = AppState.project?.pages || [];
        const options = [
            { value: "relative_prev", label: "« Previous (Automatic)" },
            { value: "relative_next", label: "Next (Automatic) »" },
            { value: "home", label: "🏠 Home / Dashboard" }
        ];

        pages.forEach((page, idx) => {
            options.push({
                value: idx.toString(),
                label: `Page ${idx + 1}: ${page.name || 'Untitled'}`
            });
        });

        this.addSelect(label, value, options, onChange);
    }

    addDropShadowButton(container, widgetId) {
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
        (container || this.getContainer()).appendChild(wrap);
    }

    addIconInput(label, value, onChange, widget) {
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
        pickerBtn.textContent = "★";
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
        this.getContainer().appendChild(wrap);
    }

    addLabeledInputWithIconPicker(label, type, value, onChange, widget) {
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

        input.onchange = (e) => onChange((/** @type {HTMLInputElement} */(e.target)).value);
        input.oninput = (e) => onChange((/** @type {HTMLInputElement} */(e.target)).value);

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
        this.getContainer().appendChild(wrap);
    }

    addLabeledInputWithDataList(label, type, value, suggestions, onChange) {
        const wrap = document.createElement("div");
        wrap.className = "field";
        const lbl = document.createElement("div");
        lbl.className = "prop-label";
        lbl.textContent = label;

        const listId = "datalist_" + Math.random().toString(36).substr(2, 9);
        const dataList = document.createElement("datalist");
        dataList.id = listId;
        suggestions.forEach(s => {
            const opt = document.createElement("option");
            opt.value = s;
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
        this.getContainer().appendChild(wrap);
    }

    addSectionLabel(text) {
        const section = document.createElement("div");
        section.className = "sidebar-section-label";
        section.textContent = text;
        this.getContainer().appendChild(section);
    }
}
