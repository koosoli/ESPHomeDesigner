const ACTIVE_EPSILON = 0.05;

export const DEFAULTS = {
    width: 220,
    height: 140,
    title: "",
    solar_entity: "",
    solar_to_home_entity: "",
    solar_to_grid_entity: "",
    solar_to_battery_entity: "",
    autoconsumption_percent_entity: "",
    home_entity: "",
    grid_entity: "",
    battery_power_entity: "",
    battery_soc_entity: "",
    gas_entity: "",
    solar_label: "Solar",
    home_label: "Home",
    grid_label: "Grid",
    battery_label: "Battery",
    gas_label: "Gas",
    show_battery: true,
    show_gas: false,
    display_mode: "power_now",
    grid_positive_mode: "import",
    battery_positive_mode: "charging",
    flow_unit: "",
    gas_unit: "m3",
    decimals: 0,
    color: "theme_auto",
    background_color: "transparent",
    border_color: "theme_auto",
    flow_color: "#3b7c3f",
    inactive_flow_color: "#8a8a8a",
    font_family: "Roboto",
    font_weight: 400,
    font_size: 13,
    label_font_size: 11,
    border_width: 1,
    border_radius: 12,
    opacity: 100
};

export function resolveEnergyWidgetProps(input = {}) {
    return {
        ...DEFAULTS,
        ...(input || {})
    };
}

export function normalizeEntityId(entityId) {
    const raw = String(entityId || "").trim();
    if (!raw) return "";
    if (raw.includes(".") || raw.startsWith("mqtt:")) return raw;
    return `sensor.${raw}`;
}

export function makeSafeSensorId(entityId) {
    return normalizeEntityId(entityId).replace(/[^a-zA-Z0-9_]/g, "_");
}

export function getFlowUnit(props) {
    const resolved = resolveEnergyWidgetProps(props);
    if (resolved.flow_unit) return resolved.flow_unit;
    return resolved.display_mode === "energy_today" ? "kWh" : "W";
}

export function getGasUnit(props) {
    const resolved = resolveEnergyWidgetProps(props);
    return resolved.gas_unit || "m3";
}

export function getGridDirection(value, props) {
    const resolved = resolveEnergyWidgetProps(props);
    if (!Number.isFinite(value) || Math.abs(value) <= ACTIVE_EPSILON) return "idle";
    const positiveMeansImport = resolved.grid_positive_mode !== "export";
    if (positiveMeansImport) {
        return value > 0 ? "import" : "export";
    }
    return value > 0 ? "export" : "import";
}

export function getBatteryDirection(value, props) {
    const resolved = resolveEnergyWidgetProps(props);
    if (!Number.isFinite(value) || Math.abs(value) <= ACTIVE_EPSILON) return "idle";
    const positiveMeansCharging = resolved.battery_positive_mode !== "discharging";
    if (positiveMeansCharging) {
        return value > 0 ? "charging" : "discharging";
    }
    return value > 0 ? "discharging" : "charging";
}

export function getGridDirectionLabel(direction) {
    if (direction === "import") return "Import";
    if (direction === "export") return "Export";
    return "Idle";
}

export function getBatteryDirectionLabel(direction) {
    if (direction === "charging") return "Charging";
    if (direction === "discharging") return "Discharging";
    return "Idle";
}

export function formatDisplayValue(value, decimals, unit, placeholder = "--") {
    if (!Number.isFinite(value)) return placeholder;
    const precision = Math.max(0, parseInt(String(decimals || 0), 10) || 0);
    const suffix = unit ? ` ${unit}` : "";
    return `${value.toFixed(precision)}${suffix}`;
}

export function formatPercentValue(value, decimals, placeholder = "--") {
    if (!Number.isFinite(value)) return placeholder;
    const precision = Math.min(1, Math.max(0, parseInt(String(decimals || 0), 10) || 0));
    return `${value.toFixed(precision)}%`;
}

export function readNumericEntityValue(entityId, entityStates = {}) {
    const normalized = normalizeEntityId(entityId);
    if (!normalized) return null;

    const candidates = [normalized];
    const raw = String(entityId || "").trim();
    if (raw && raw !== normalized) candidates.unshift(raw);

    for (const candidate of candidates) {
        const state = entityStates?.[candidate];
        if (!state) continue;
        const parsed = parseFloat(String(state.state ?? ""));
        if (Number.isFinite(parsed)) return parsed;
    }

    return null;
}

function getPositiveFlowValue(value) {
    if (!Number.isFinite(value)) return null;
    return Math.max(0, value);
}

function getAbsoluteFlowValue(value) {
    if (!Number.isFinite(value)) return null;
    return Math.abs(value);
}

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

function formatFlowLabel(prefix, value, decimals, unit) {
    if (!prefix || !Number.isFinite(value)) return prefix || "";
    return `${prefix} ${formatDisplayValue(value, decimals, unit, "").trim()}`.trim();
}

export function getPreviewSnapshot(widget, entityStates = {}) {
    const props = resolveEnergyWidgetProps(widget?.props);
    const decimals = Math.max(0, parseInt(String(props.decimals || 0), 10) || 0);
    const flowUnit = getFlowUnit(props);
    const gasUnit = getGasUnit(props);

    const solar = readNumericEntityValue(props.solar_entity, entityStates);
    const solarToHomeRaw = readNumericEntityValue(props.solar_to_home_entity, entityStates);
    const solarToGridRaw = readNumericEntityValue(props.solar_to_grid_entity, entityStates);
    const solarToBatteryRaw = readNumericEntityValue(props.solar_to_battery_entity, entityStates);
    const autoconsumptionPercentRaw = readNumericEntityValue(props.autoconsumption_percent_entity, entityStates);
    const home = readNumericEntityValue(props.home_entity, entityStates);
    const grid = readNumericEntityValue(props.grid_entity, entityStates);
    const batteryPower = readNumericEntityValue(props.battery_power_entity, entityStates);
    const batterySoc = readNumericEntityValue(props.battery_soc_entity, entityStates);
    const gas = readNumericEntityValue(props.gas_entity, entityStates);

    const gridDirection = getGridDirection(grid, props);
    const batteryDirection = getBatteryDirection(batteryPower, props);
    const solarToBattery = getPositiveFlowValue(solarToBatteryRaw);
    const derivedSolarToGrid = gridDirection === "export" ? getAbsoluteFlowValue(grid) : null;
    const solarToGrid = Number.isFinite(solarToGridRaw) ? getPositiveFlowValue(solarToGridRaw) : derivedSolarToGrid;

    let solarSelfConsumed = null;
    if (Number.isFinite(solar) && solar > ACTIVE_EPSILON) {
        solarSelfConsumed = clamp(solar - (solarToGrid || 0), 0, solar);
    }

    const solarToHome = Number.isFinite(solarToHomeRaw)
        ? getPositiveFlowValue(solarToHomeRaw)
        : (Number.isFinite(solarSelfConsumed) && Number.isFinite(solarToBattery)
            ? Math.max(0, solarSelfConsumed - solarToBattery)
            : null);

    const autoconsumptionPercent = Number.isFinite(autoconsumptionPercentRaw)
        ? clamp(autoconsumptionPercentRaw, 0, 100)
        : (Number.isFinite(solarSelfConsumed) && Number.isFinite(solar) && solar > ACTIVE_EPSILON
            ? clamp((solarSelfConsumed / solar) * 100, 0, 100)
            : null);

    const gridFlowValue = gridDirection === "idle"
        ? null
        : (gridDirection === "export" && Number.isFinite(solarToGrid)
            ? solarToGrid
            : getAbsoluteFlowValue(grid));

    const batteryFlowValue = getAbsoluteFlowValue(batteryPower);
    const solarFlowLabel = Number.isFinite(solarToHome)
        ? formatFlowLabel("Home", solarToHome, decimals, flowUnit)
        : "";
    const gridFlowLabel = gridDirection !== "idle"
        ? formatFlowLabel(getGridDirectionLabel(gridDirection), gridFlowValue, decimals, flowUnit)
        : "";
    const batteryFlowLabel = batteryDirection === "charging" && Number.isFinite(solarToBattery)
        ? formatFlowLabel("Solar", solarToBattery, decimals, flowUnit)
        : (batteryDirection !== "idle"
            ? formatFlowLabel(getBatteryDirectionLabel(batteryDirection), batteryFlowValue, decimals, flowUnit)
            : "");

    return {
        props,
        decimals,
        flowUnit,
        gasUnit,
        solar,
        solarToHome,
        solarToGrid,
        solarToBattery,
        autoconsumptionPercent,
        home,
        grid,
        batteryPower,
        batterySoc,
        gas,
        solarText: formatDisplayValue(solar, decimals, flowUnit),
        homeText: formatDisplayValue(home, decimals, flowUnit),
        gridText: formatDisplayValue(grid, decimals, flowUnit),
        batteryPowerText: formatDisplayValue(batteryPower, decimals, flowUnit),
        gasText: formatDisplayValue(gas, decimals, gasUnit),
        batterySocText: Number.isFinite(batterySoc) ? `${batterySoc.toFixed(0)}% SOC` : "--",
        solarSubvalueText: Number.isFinite(autoconsumptionPercent) ? `Self ${formatPercentValue(autoconsumptionPercent, decimals, "")}` : null,
        solarFlowLabel,
        gridFlowLabel,
        batteryFlowLabel,
        solarActive: Number.isFinite(solar) && Math.abs(solar) > ACTIVE_EPSILON,
        gasActive: props.show_gas && Number.isFinite(gas) && Math.abs(gas) > ACTIVE_EPSILON,
        gridDirection,
        batteryDirection,
        gridDirectionLabel: getGridDirectionLabel(gridDirection),
        batteryDirectionLabel: getBatteryDirectionLabel(batteryDirection)
    };
}

function buildRect(x, y, width, height) {
    return {
        x: Math.round(x),
        y: Math.round(y),
        width: Math.round(width),
        height: Math.round(height),
        get cx() {
            return this.x + Math.round(this.width / 2);
        },
        get cy() {
            return this.y + Math.round(this.height / 2);
        }
    };
}

export function getEnergyLayout(widget) {
    const props = resolveEnergyWidgetProps(widget?.props);
    const width = Math.max(180, parseInt(String(widget?.width || widget?.w || DEFAULTS.width), 10) || DEFAULTS.width);
    const height = Math.max(120, parseInt(String(widget?.height || widget?.h || DEFAULTS.height), 10) || DEFAULTS.height);
    const padX = Math.max(8, Math.min(18, Math.round(width * 0.06)));
    const padY = Math.max(8, Math.min(18, Math.round(height * 0.06)));
    const titleInset = props.title ? Math.max(12, Math.round(height * 0.1)) : 0;
    const centerX = Math.round(width / 2);
    const centerY = Math.round(height / 2);
    const coreWidth = Math.max(62, Math.min(92, Math.round(width * 0.28)));
    const sideWidth = Math.max(58, Math.min(84, Math.round(width * 0.24)));
    const boxHeight = Math.max(34, Math.min(48, Math.round(height * 0.2)));

    const solar = buildRect(centerX - (coreWidth / 2), padY + titleInset, coreWidth, boxHeight);
    const home = buildRect(centerX - (coreWidth / 2), centerY - (boxHeight / 2), coreWidth, boxHeight);
    const grid = buildRect(padX, centerY - (boxHeight / 2), sideWidth, boxHeight);
    const battery = buildRect(width - padX - sideWidth, centerY - (boxHeight / 2), sideWidth, boxHeight);
    const gas = buildRect(centerX - (sideWidth / 2), height - padY - boxHeight, sideWidth, boxHeight);

    return {
        width,
        height,
        solar,
        home,
        grid,
        battery,
        gas,
        flows: {
            solarToHome: {
                x1: solar.cx,
                y1: solar.y + solar.height,
                x2: home.cx,
                y2: home.y
            },
            gridToHome: {
                x1: grid.x + grid.width,
                y1: grid.cy,
                x2: home.x,
                y2: home.cy
            },
            homeToBattery: {
                x1: home.x + home.width,
                y1: home.cy,
                x2: battery.x,
                y2: battery.cy
            },
            gasToHome: {
                x1: gas.cx,
                y1: gas.y,
                x2: home.cx,
                y2: home.y + home.height
            }
        }
    };
}

export function getRefreshTargetIds(widgetId) {
    return [`- lvgl.widget.refresh: ${widgetId}`];
}
