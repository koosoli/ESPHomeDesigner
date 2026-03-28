import { MIXED_VALUE } from '../../utils/color_utils.js';
import { isRGBDevice, getAvailableColors } from '../../utils/device.js';
import { debounce } from '../../utils/helpers.js';
import {
    addCommonLVGLProperties as addCommonLVGLPropertiesHelper,
    addVisibilityConditions as addVisibilityConditionsHelper
} from './property_controls_advanced.js';
import {
    addLabeledInputWithPickerControl,
    addIconPickerControl,
    addIconInputControl,
    addLabeledInputWithIconPickerControl,
    addLabeledInputWithDataListControl
} from './property_controls_picker_helpers.js';
import {
    addColorMixerControl,
    addSegmentedControlHelper,
    addNumberWithSliderControl,
    addCompactPropertyRowControl,
    addPageSelectorControl,
    addDropShadowButtonControl,
    addSectionLabelControl
} from './property_controls_compound_helpers.js';

export class PropertyControls {
    constructor(panel) {
        this.panel = panel;
    }

    getContainer() {
        return this.panel.getContainer();
    }

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
            input.value = isMixed ? "" : String(value ?? "");
            if (isMixed) {
                input.placeholder = "Mixed";
                input.style.fontStyle = "italic";
                input.style.color = "#888";
            }
        }

        const debouncedOnChange = (type === "number" || type === "range") ? onChange : debounce(onChange, 50);

        input.addEventListener("input", () => {
            if (isMixed) {
                input.style.fontStyle = "normal";
                input.style.color = "inherit";
            }
            const element = /** @type {HTMLInputElement | HTMLTextAreaElement} */ (input);
            debouncedOnChange(element.value);
        });

        input.addEventListener("change", () => {
            const element = /** @type {HTMLInputElement | HTMLTextAreaElement} */ (input);
            onChange(element.value);
        });

        wrap.appendChild(lbl);
        wrap.appendChild(input);
        this.getContainer().appendChild(wrap);
    }

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

        (options || []).forEach((opt) => {
            const option = document.createElement("option");
            if (typeof opt === "object" && opt !== null) {
                option.value = opt.value;
                option.textContent = opt.label;
                if (!isMixed && String(opt.value) === String(value)) option.selected = true;
            } else {
                option.value = opt;
                option.textContent = opt;
                if (!isMixed && String(opt) === String(value)) option.selected = true;
            }
            select.appendChild(option);
        });
        select.addEventListener("change", () => {
            const element = /** @type {HTMLSelectElement} */ (select);
            onChange(element.value);
        });
        wrap.appendChild(lbl);
        wrap.appendChild(select);
        this.getContainer().appendChild(wrap);
    }

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

        if (value === MIXED_VALUE) checkbox.indeterminate = true;
        else checkbox.checked = !!value;

        checkbox.style.width = "16px";
        checkbox.style.height = "16px";
        checkbox.style.margin = "0";
        checkbox.style.cursor = "pointer";
        checkbox.addEventListener("change", () => {
            const element = /** @type {HTMLInputElement} */ (checkbox);
            element.indeterminate = false;
            onChange(element.checked);
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
        addLabeledInputWithPickerControl(this, label, type, value, onChange, widget);
    }

    addIconPicker(label, currentValue, onSelect, widget) {
        addIconPickerControl(this, label, currentValue, onSelect, widget);
    }

    addColorMixer(label, value, onChange) {
        addColorMixerControl(this, label, value, onChange);
    }

    addColorSelector(label, value, options, onChange) {
        const palette = options || getAvailableColors();
        if (isRGBDevice()) {
            this.addColorMixer(label, value, onChange);
        } else {
            this.addSelect(label, value, palette, onChange);
        }
    }

    addSegmentedControl(label, options, value, onChange) {
        addSegmentedControlHelper(this, label, options, value, onChange);
    }

    addNumberWithSlider(label, value, min, max, onChange) {
        addNumberWithSliderControl(this, label, value, min, max, onChange);
    }

    addCompactPropertyRow(callback) {
        addCompactPropertyRowControl(this, callback);
    }

    addCommonLVGLProperties(widget, props) {
        addCommonLVGLPropertiesHelper(this, widget, props);
    }

    addVisibilityConditions(widget) {
        addVisibilityConditionsHelper(this, widget);
    }

    addPageSelector(label, value, onChange) {
        addPageSelectorControl(this, label, value, onChange);
    }

    addDropShadowButton(container, widgetId) {
        addDropShadowButtonControl(this, container, widgetId);
    }

    addIconInput(label, value, onChange, widget) {
        addIconInputControl(this, label, value, onChange, widget);
    }

    addLabeledInputWithIconPicker(label, type, value, onChange, widget) {
        addLabeledInputWithIconPickerControl(this, label, type, value, onChange, widget);
    }

    addLabeledInputWithDataList(label, type, value, suggestions, onChange) {
        addLabeledInputWithDataListControl(this, label, type, value, suggestions, onChange);
    }

    addSectionLabel(text) {
        addSectionLabelControl(this, text);
    }
}
