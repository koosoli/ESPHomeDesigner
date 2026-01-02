(() => {
    const render = (el, widget, { getColorStyle }) => {
        const props = widget.props || {};
        const color = props.color || "black";
        let iconSize = props.size || 32;
        const fontSize = props.font_size || 16;
        const labelFontSize = props.label_font_size || 12;
        const unit = props.unit || "°C";
        const showLabel = props.show_label !== false;
        const precision = props.precision ?? 1;

        let temperature = 22.5; // Default preview value

        // Fit icon to frame if enabled
        if (props.fit_icon_to_frame) {
            const padding = 4;
            const maxDim = Math.max(8, Math.min((widget.width || 0) - padding * 2, ((widget.height || 0) / 2) - padding));
            iconSize = Math.round(maxDim);
        }

        // Fetch live state from HA entity if using external sensor
        if (!props.is_local_sensor && widget.entity_id) {
            if (window.AppState && window.AppState.entityStates) {
                const stateObj = window.AppState.entityStates[widget.entity_id];
                if (stateObj && stateObj.state !== undefined) {
                    const val = parseFloat(stateObj.state);
                    if (!isNaN(val)) {
                        temperature = val;
                    }
                }
            }
        }

        // Dynamic thermometer icon based on temperature
        // MDI Icons: thermometer (F050F), thermometer-low (F0E4C), thermometer-high (F10C2)
        let iconCode;
        if (temperature <= 10) {
            iconCode = "F0E4C"; // thermometer-low (cold)
        } else if (temperature <= 25) {
            iconCode = "F050F"; // thermometer (normal)
        } else {
            iconCode = "F10C2"; // thermometer-high (hot)
        }

        // Convert Hex to Char for MDI font (strip "F" prefix like battery_icon does)
        const cp = 0xf0000 + parseInt(iconCode.slice(1), 16);
        const ch = String.fromCodePoint(cp);

        el.style.display = "flex";
        el.style.flexDirection = "column";
        el.style.alignItems = "center";
        el.style.justifyContent = "center";
        el.style.color = getColorStyle(color);

        // Icon
        const iconEl = document.createElement("div");
        iconEl.textContent = ch;
        iconEl.style.fontSize = `${iconSize}px`;
        iconEl.style.fontFamily = "MDI, system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
        iconEl.style.lineHeight = "1";
        el.appendChild(iconEl);

        // Temperature value
        const valueEl = document.createElement("div");
        valueEl.style.fontSize = `${fontSize}px`;
        valueEl.style.fontWeight = "500";
        valueEl.style.marginTop = "2px";

        let displayTemp = temperature;
        if (unit === "°F") {
            displayTemp = (temperature * 9 / 5) + 32;
        }

        valueEl.textContent = displayTemp.toFixed(precision) + unit;
        el.appendChild(valueEl);

        // Label
        if (showLabel) {
            const labelEl = document.createElement("div");
            labelEl.style.fontSize = `${labelFontSize}px`;
            labelEl.style.opacity = "0.7";
            labelEl.style.marginTop = "1px";
            labelEl.textContent = "Temperature";
            el.appendChild(labelEl);
        }
    };

    if (window.FeatureRegistry) {
        window.FeatureRegistry.register("ondevice_temperature", { render });
    }
})();
