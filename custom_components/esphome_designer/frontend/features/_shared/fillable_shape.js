import { AppState } from '@core/state';

export const THEME_AUTO = "theme_auto";

/**
 * @typedef {{
 *   color?: any,
 *   fill?: any,
 *   bg_color?: any,
 *   border_color?: any,
 *   border_width?: any,
 *   border_radius?: any,
 *   corner_radius?: any,
 *   radius?: any,
 *   show_border?: any,
 *   opacity?: any,
 *   opa?: any
 * }} FillableShapeProps
 */

const parseShapeInteger = (value, fallback = 0) => {
    if (value === "" || value === null || value === undefined) return fallback;
    const parsed = parseInt(value, 10);
    return Number.isNaN(parsed) ? fallback : parsed;
};

export const isExplicitShapeColor = (value) => {
    return value !== undefined && value !== null && value !== "" && value !== THEME_AUTO;
};

export const hasShapeColorValue = (value) => {
    return value !== undefined && value !== null && value !== "";
};

export const isTransparentShapeColor = (value) => {
    if (typeof value !== "string") return false;
    const normalized = value.trim().toLowerCase();
    if (normalized === "transparent") return true;
    return /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*0(?:\.0+)?\s*\)$/.test(normalized);
};

const isLegacyShapeFillEnabled = (value) => {
    return value === true || value === "true" || value === 1 || value === "1";
};

/**
 * @param {FillableShapeProps} [props]
 */
export const resolveFillableShapeFillEnabled = (props = {}) => {
    if (hasShapeColorValue(props.bg_color)) {
        return !isTransparentShapeColor(props.bg_color);
    }
    if (props.fill !== undefined) {
        return isLegacyShapeFillEnabled(props.fill);
    }
    return false;
};

/**
 * @param {FillableShapeProps} [props]
 */
export const resolveFillableShapeColors = (props = {}) => {
    const legacyColor = props.color || THEME_AUTO;
    const fillEnabled = resolveFillableShapeFillEnabled(props);
    const fillColor = hasShapeColorValue(props.bg_color)
        ? props.bg_color
        : (fillEnabled ? legacyColor : "transparent");
    const borderColor = isExplicitShapeColor(props.border_color)
        ? props.border_color
        : (fillEnabled ? fillColor : legacyColor);
    return { legacyColor, fillColor, borderColor, fillEnabled };
};

/**
 * @param {FillableShapeProps} [props]
 */
export const normalizeFillableShapeProps = (props = {}) => {
    const nextProps = { ...props };
    const hadLegacyColor = isExplicitShapeColor(nextProps.color);
    const hadThemeAutoLegacyColor = nextProps.color === THEME_AUTO;
    const hadLegacyFill = nextProps.fill !== undefined;
    const hasBgColor = hasShapeColorValue(nextProps.bg_color);

    if (!hasBgColor) {
        if (hadLegacyFill) {
            nextProps.bg_color = isLegacyShapeFillEnabled(nextProps.fill)
                ? (hadLegacyColor ? nextProps.color : THEME_AUTO)
                : "transparent";
        } else {
            nextProps.bg_color = "transparent";
        }
    }

    if (hadLegacyColor || hadLegacyFill) {
        const { borderColor } = resolveFillableShapeColors(nextProps);
        if (!isExplicitShapeColor(nextProps.border_color)) {
            nextProps.border_color = borderColor;
        }
    }

    if (hadLegacyColor || hadThemeAutoLegacyColor) {
        delete nextProps.color;
    }
    if (hadLegacyFill) {
        delete nextProps.fill;
    }

    return nextProps;
};

/**
 * @param {FillableShapeProps} [props]
 * @param {number} [defaultWidth]
 * @param {{ respectShowBorder?: boolean }} [options]
 */
export const resolveFillableShapeBorderWidth = (props = {}, defaultWidth = 1, options = {}) => {
    const { respectShowBorder = false } = options;
    const borderWidth = Math.max(0, parseShapeInteger(props.border_width ?? defaultWidth, defaultWidth));

    if (respectShowBorder && (props.show_border === false || props.show_border === "false")) {
        return 0;
    }

    return borderWidth;
};

/**
 * @param {FillableShapeProps} props
 * @param {string} key
 * @param {any} value
 */
export const buildFillableShapeColorUpdates = (props = {}, key, value) => {
    const updates = { [key]: value };

    if (!isExplicitShapeColor(props.color)) {
        return updates;
    }

    const { fillColor, borderColor, fillEnabled } = resolveFillableShapeColors(props);

    if (key === "bg_color" && !isExplicitShapeColor(props.border_color) && !fillEnabled) {
        updates.border_color = borderColor;
    }

    if (key === "border_color" && !isExplicitShapeColor(props.bg_color)) {
        updates.bg_color = fillEnabled ? fillColor : "transparent";
    }

    updates.color = THEME_AUTO;
    return updates;
};

export const renderFillableShapeProperties = (panel, widget, options = {}) => {
    const {
        defaultBorderWidth = 1,
        defaultRadius = 0,
        includeRadius = false,
        respectShowBorder = false
    } = options;

    const getProps = () => widget.props || {};
    const updateProps = (updates) => {
        const currentProps = getProps();
        const nextProps = normalizeFillableShapeProps({ ...currentProps, ...updates });
        widget.props = nextProps;
        AppState.updateWidget(widget.id, { props: nextProps });
    };

    const props = getProps();
    const { fillColor, borderColor } = resolveFillableShapeColors(props);
    const borderWidth = resolveFillableShapeBorderWidth(props, defaultBorderWidth, { respectShowBorder });
    const radiusValue = Math.max(
        0,
        parseShapeInteger(props.radius ?? props.corner_radius ?? props.border_radius ?? defaultRadius, defaultRadius)
    );
    const opacityValue = props.opacity !== undefined
        ? props.opacity
        : (props.opa !== undefined ? Math.round(props.opa / 2.55) : 100);

    panel.createSection("Shape Settings", true);
    if (includeRadius) {
        panel.addLabeledInput("Corner Radius", "number", radiusValue, (value) => {
            updateProps({ radius: Math.max(0, parseShapeInteger(value, defaultRadius)) });
        });
    }
    panel.addColorSelector("Fill Color", fillColor, null, (value) => {
        const currentProps = getProps();
        updateProps(buildFillableShapeColorUpdates(currentProps, "bg_color", value));
    });
    panel.endSection();

    panel.createSection("Border Settings", true);
    panel.addLabeledInput("Border Thickness", "number", borderWidth, (value) => {
        const nextWidth = Math.max(0, parseShapeInteger(value, 0));
        const updates = { border_width: nextWidth };
        if (respectShowBorder) updates.show_border = nextWidth > 0;
        updateProps(updates);
    });
    panel.addColorSelector("Border Color", borderColor, null, (value) => {
        const currentProps = getProps();
        updateProps(buildFillableShapeColorUpdates(currentProps, "border_color", value));
    });
    panel.endSection();

    panel.createSection("Appearance", true);
    panel.addNumberWithSlider("Opacity (%)", opacityValue, 0, 100, (value) => {
        updateProps({
            opacity: value,
            opa: Math.round(value * 2.55)
        });
    });
    panel.addDropShadowButton(panel.getContainer(), widget.id);
    panel.endSection();
};
