import { AppState } from '../../js/core/state';

/** @typedef {{ props?: Record<string, any> }} TemplateSensorBarWidget */
/** @typedef {{ getColorStyle: (value: string | undefined) => string, isDark: boolean }} TemplateSensorBarHelpers */
/** @typedef {{ icon: string, val: string }} SensorEntry */

/**
 * @param {HTMLElement} el
 * @param {TemplateSensorBarWidget} widget
 * @param {TemplateSensorBarHelpers} helpers
 */
export function render(el, widget, helpers) {
    const { getColorStyle, isDark } = helpers;
    const props = widget.props || {};
    const color = props.color || "black";
    const iconSize = props.icon_size || 20;
    const fontSize = props.font_size || 14;
    const borderWidth = props.border_thickness || 0;

    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "space-around";
    el.style.padding = "0 10px";
    el.style.boxSizing = "border-box";

    /** @param {string | undefined} c */
    const getBgColorRender = (c) => {
        if (c === "white" || c === "#ffffff") return isDark ? "#000000" : "#ffffff";
        if (c === "black" || c === "#000000") return isDark ? "#ffffff" : "#000000";
        return getColorStyle(c);
    };

    /** @param {string | undefined} c */
    const getTextColorRender = (c) => {
        if (c === "black" || c === "#000000") return isDark ? "#ffffff" : "#000000";
        if (c === "white" || c === "#ffffff") return isDark ? "#000000" : "#ffffff";
        return getColorStyle(c);
    };

    el.style.color = getTextColorRender(color);
    el.style.overflow = "hidden";

    if (props.show_background) {
        el.style.backgroundColor = getBgColorRender(props.background_color || "white");
        el.style.borderRadius = (props.border_radius || 8) + "px";
        el.style.border = borderWidth > 0
            ? `${borderWidth}px solid ${getBgColorRender(props.border_color || "white")}`
            : "none";

        if (!props.background_color || props.background_color === "transparent") {
            el.style.border = "1px dashed #444";
        }
    } else {
        el.style.backgroundColor = "transparent";
        el.style.borderRadius = "0";
        el.style.border = "none";
    }

    /** @param {Array<string | undefined>} possibleIds */
    const getEntityState = (possibleIds) => {
        const entityStates = AppState?.entityStates;
        if (!entityStates) return null;
        for (const id of possibleIds) {
            if (id && entityStates[id]) return entityStates[id].state;
        }
        return null;
    };

    /** @type {SensorEntry[]} */
    const sensors = [];

    if (props.show_wifi) {
        const state = getEntityState([props.wifi_entity, 'wifi_signal_dbm', 'sensor.wifi_signal']);
        sensors.push({ icon: 'F0928', val: state !== null ? Math.round(state) + 'dB' : '-65dB' });
    }

    if (props.show_temperature) {
        const state = getEntityState([props.temp_entity, 'sht4x_temperature', 'sht3x_temperature', 'shtc3_temperature', 'sensor.temperature']);
        const unit = props.temp_unit || "\u00B0C";
        let tempVal = state !== null ? parseFloat(state) : 23.5;
        if (unit === "\u00B0F") tempVal = (tempVal * 9 / 5) + 32;
        sensors.push({ icon: 'F050F', val: tempVal.toFixed(1) + unit });
    }

    if (props.show_humidity) {
        const state = getEntityState([props.hum_entity, 'sht4x_humidity', 'shtc3_humidity', 'sensor.humidity']);
        sensors.push({ icon: 'F058E', val: state !== null ? Math.round(state) + '%' : '45%' });
    }

    if (props.show_battery) {
        const state = getEntityState(
            props.bat_is_local ? ['battery_level'] : [props.bat_entity, 'battery_level', 'sensor.battery_level']
        );
        const batteryLevel = state !== null ? parseFloat(state) : 85;

        let batIcon = 'F0079';
        if (batteryLevel >= 95) batIcon = "F0079";
        else if (batteryLevel >= 85) batIcon = "F0082";
        else if (batteryLevel >= 75) batIcon = "F0081";
        else if (batteryLevel >= 65) batIcon = "F0080";
        else if (batteryLevel >= 55) batIcon = "F007F";
        else if (batteryLevel >= 45) batIcon = "F007E";
        else if (batteryLevel >= 35) batIcon = "F007D";
        else if (batteryLevel >= 25) batIcon = "F007C";
        else if (batteryLevel >= 15) batIcon = "F007B";
        else if (batteryLevel >= 5) batIcon = "F007A";
        else batIcon = "F0083";

        sensors.push({ icon: batIcon, val: Math.round(batteryLevel) + '%' });
    }

    el.innerHTML = "";

    sensors.forEach((sensor) => {
        const group = document.createElement("div");
        group.style.display = "flex";
        group.style.alignItems = "center";
        group.style.gap = "6px";

        const icon = document.createElement("span");
        icon.innerText = String.fromCodePoint(parseInt(sensor.icon, 16));
        icon.style.fontFamily = "'Material Design Icons', 'MDI', system-ui, -sans-serif";
        icon.style.fontSize = iconSize + "px";
        icon.style.lineHeight = "1";

        const text = document.createElement("span");
        text.innerText = sensor.val;
        text.style.fontSize = fontSize + "px";
        text.style.fontFamily = "Roboto, system-ui, -sans-serif";
        text.style.fontWeight = "500";
        text.style.whiteSpace = "nowrap";

        group.appendChild(icon);
        group.appendChild(text);
        el.appendChild(group);
    });
}
