(() => {
    const render = (el, widget, { getColorStyle }) => {
        const props = widget.props || {};
        const color = props.color || "black";
        const iconSize = props.icon_size || 20;
        const fontSize = props.font_size || 14;

        el.style.display = "flex";
        el.style.alignItems = "center";
        el.style.justifyContent = "space-around";
        el.style.padding = "0 10px";
        el.style.boxSizing = "border-box";
        el.style.color = getColorStyle(color);
        el.style.overflow = "hidden";

        if (props.show_background) {
            el.style.backgroundColor = getColorStyle(props.background_color || "gray");
            el.style.borderRadius = (props.border_radius || 8) + "px";
        } else {
            el.style.backgroundColor = "transparent";
            el.style.borderRadius = "0";
        }

        const getEntityState = (possibleIds) => {
            if (!window.AppState || !window.AppState.entityStates) return null;
            for (const id of possibleIds) {
                if (window.AppState.entityStates[id]) return window.AppState.entityStates[id].state;
            }
            return null;
        };

        const sensors = [];

        if (props.show_wifi) {
            const state = getEntityState(['wifi_signal_dbm', 'sensor.wifi_signal']);
            sensors.push({
                type: 'wifi',
                icon: 'F0928',
                val: state !== null ? Math.round(state) + 'dB' : '-65dB'
            });
        }

        if (props.show_temperature) {
            // Note: 'profile' is not defined in this scope. Assuming it's meant to be passed or globally available.
            // For now, using the original list of temperature sensors.
            const state = getEntityState(['sht4x_temperature', 'sht3x_temperature', 'shtc3_temperature', 'sensor.temperature']);

            let valStr = "--";
            const unit = props.temperature_unit || "°C";

            if (state !== null) {
                let val = parseFloat(state);
                if (unit === "°F") {
                    val = (val * 9 / 5) + 32;
                }
                valStr = val.toFixed(1);
            } else {
                // Default preview value
                let val = 23.5;
                if (unit === "°F") {
                    val = (val * 9 / 5) + 32;
                }
                valStr = val.toFixed(1);
            }

            sensors.push({
                type: 'temp',
                icon: 'F050F',
                val: valStr + unit
            });
        }

        if (props.show_humidity) {
            const state = getEntityState(['sht4x_humidity', 'sht3x_humidity', 'shtc3_humidity', 'sensor.humidity']);
            sensors.push({
                type: 'hum',
                icon: 'F058E',
                val: state !== null ? Math.round(state) + '%' : '45%'
            });
        }

        if (props.show_battery) {
            const state = getEntityState(['battery_level', 'sensor.battery_level']);
            sensors.push({
                type: 'bat',
                icon: 'F0079',
                val: state !== null ? Math.round(state) + '%' : '85%'
            });
        }

        el.innerHTML = "";

        sensors.forEach(s => {
            const group = document.createElement("div");
            group.style.display = "flex";
            group.style.alignItems = "center";
            group.style.gap = "6px";

            const icon = document.createElement("span");
            const cp = parseInt(s.icon, 16);
            icon.innerText = String.fromCodePoint(cp);
            icon.style.fontFamily = "'Material Design Icons', system-ui, -sans-serif";
            icon.style.fontSize = iconSize + "px";
            icon.style.lineHeight = "1";

            const text = document.createElement("span");
            text.innerText = s.val;
            text.style.fontSize = fontSize + "px";
            text.style.fontFamily = "Roboto, system-ui, -sans-serif";
            text.style.fontWeight = "500";
            text.style.whiteSpace = "nowrap";

            group.appendChild(icon);
            group.appendChild(text);
            el.appendChild(group);
        });
    };

    if (window.FeatureRegistry) {
        window.FeatureRegistry.register("template_sensor_bar", { render });
    }
})();
