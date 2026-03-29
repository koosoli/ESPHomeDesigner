import { getWeightsForFont, clampFontWeight } from '../font_weights.js';

export const FONT_OPTIONS = [
    "Roboto",
    "Inter",
    "Open Sans",
    "Lato",
    "Montserrat",
    "Poppins",
    "Raleway",
    "Roboto Mono",
    "Ubuntu",
    "Nunito",
    "Playfair Display",
    "Merriweather",
    "Work Sans",
    "Source Sans Pro",
    "Quicksand",
    "Custom..."
];

export const ALIGN_OPTIONS = [
    "TOP_LEFT",
    "TOP_CENTER",
    "TOP_RIGHT",
    "CENTER_LEFT",
    "CENTER",
    "CENTER_RIGHT",
    "BOTTOM_LEFT",
    "BOTTOM_CENTER",
    "BOTTOM_RIGHT"
];

/**
 * @param {any} panel
 * @param {Record<string, any>} props
 * @param {(key: string, value: any) => void} updateProp
 * @param {{
 *   defaultFont?: string,
 *   customFontProp?: string | null,
 *   customFontHint?: string | null
 * }} [options]
 * @returns {string}
 */
export function renderFontFamilyControls(panel, props, updateProp, options = {}) {
    const defaultFont = options.defaultFont || "Roboto";
    const customFontProp = options.customFontProp === undefined ? "custom_font_family" : options.customFontProp;
    const currentFont = props.font_family || defaultFont;
    const isCustom = !FONT_OPTIONS.slice(0, -1).includes(currentFont);

    panel.addSelect("Font", isCustom ? "Custom..." : currentFont, FONT_OPTIONS, (value) => {
        if (value !== "Custom...") {
            updateProp("font_family", value);
            if (customFontProp) {
                updateProp(customFontProp, "");
            }
        } else {
            updateProp("font_family", "Custom...");
        }
    });

    if (isCustom || props.font_family === "Custom...") {
        const customValue = customFontProp ? (props[customFontProp] || (isCustom ? currentFont : "")) : (isCustom ? currentFont : "");
        panel.addLabeledInput("Custom Font Name", "text", customValue, (value) => {
            updateProp("font_family", value || defaultFont);
            if (customFontProp) {
                updateProp(customFontProp, value);
            }
        });
        if (options.customFontHint) {
            panel.addHint(options.customFontHint);
        }
    }

    return currentFont;
}

/**
 * @param {any} panel
 * @param {string} currentFont
 * @param {Record<string, any>} props
 * @param {(key: string, value: any) => void} updateProp
 * @returns {void}
 */
export function renderFontWeightControl(panel, currentFont, props, updateProp) {
    const availableWeights = getWeightsForFont(currentFont);
    let currentWeight = props.font_weight || 400;

    if (!availableWeights.includes(currentWeight)) {
        currentWeight = clampFontWeight(currentFont, currentWeight);
        setTimeout(() => updateProp("font_weight", currentWeight), 0);
    }

    panel.addSelect("Weight", currentWeight, availableWeights, (value) => updateProp("font_weight", parseInt(value, 10)));
}

/**
 * @param {any} panel
 * @param {Record<string, any>} props
 * @param {(key: string, value: any) => void} updateProp
 * @param {string} fallback
 * @returns {void}
 */
export function renderTextAlignControl(panel, props, updateProp, fallback = "TOP_LEFT") {
    panel.addSelect("Align", props.text_align || fallback, ALIGN_OPTIONS, (value) => updateProp("text_align", value));
}

/**
 * @param {any} panel
 * @param {any} widget
 * @param {() => void} restoreWidget
 * @param {() => void} fillWidget
 * @returns {void}
 */
export function appendFillScreenButton(panel, widget, restoreWidget, fillWidget) {
    const fillWrap = document.createElement("div");
    fillWrap.className = "field";
    fillWrap.style.marginTop = "12px";

    const isFullScreen = widget.x === 0 && widget.y === 0 && widget.width === 800 && widget.height === 480;
    const fillBtn = document.createElement("button");
    fillBtn.className = "btn " + (isFullScreen ? "btn-primary" : "btn-secondary") + " btn-full";
    fillBtn.textContent = isFullScreen ? "âœ“ Full Screen (click to restore)" : "â›¶ Fill Screen";
    fillBtn.type = "button";
    fillBtn.addEventListener("click", () => {
        if (isFullScreen) {
            restoreWidget();
        } else {
            fillWidget();
        }
    });

    fillWrap.appendChild(fillBtn);
    panel.getContainer().appendChild(fillWrap);
}
