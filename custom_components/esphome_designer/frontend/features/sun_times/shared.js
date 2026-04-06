export const SUN_EVENT_ROWS = [
    { key: 'sunrise', iconCode: 'F059C', iconName: 'weather-sunset-up', label: 'Sunrise' },
    { key: 'sunset', iconCode: 'F059B', iconName: 'weather-sunset-down', label: 'Sunset' }
];

export const DEFAULT_SUN_ENTITY_BY_KEY = {
    sunrise: 'sensor.sun_next_rising',
    sunset: 'sensor.sun_next_setting'
};

export const SUN_ATTRIBUTE_BY_KEY = {
    sunrise: 'next_rising',
    sunset: 'next_setting'
};

const rowMap = new Map(SUN_EVENT_ROWS.map((row) => [row.key, row]));

export function getSunEventRow(key) {
    return rowMap.get(key);
}

export function getVisibleSunRows(props = {}) {
    const rows = [];
    if (props.show_sunrise !== false) rows.push('sunrise');
    if (props.show_sunset !== false) rows.push('sunset');
    return rows.length > 0 ? rows : ['sunrise'];
}

export function makeSafeSunSensorId(entityId, suffix = '_txt') {
    let safe = String(entityId || '').replace(/[^a-zA-Z0-9_]/g, '_');
    const maxBase = 63 - suffix.length;
    if (safe.length > maxBase) {
        safe = safe.substring(0, maxBase);
    }
    return `${safe}${suffix}`;
}

export function resolveSunEntitySource(props = {}, key) {
    const defaultEntity = DEFAULT_SUN_ENTITY_BY_KEY[key] || '';
    const raw = String(props[`${key}_entity`] ?? defaultEntity).trim();
    const mqttTopic = String(props[`${key}_mqtt_topic`] || '').trim();

    if (!raw && !mqttTopic) {
        return { entityId: '', attribute: '', mqttTopic: '' };
    }

    if (mqttTopic) {
        return { entityId: raw, attribute: '', mqttTopic };
    }

    if (raw.toLowerCase().startsWith('mqtt:')) {
        return {
            entityId: raw,
            attribute: '',
            mqttTopic: raw.substring(5).trim()
        };
    }

    if (raw === 'sun.sun') {
        return {
            entityId: raw,
            attribute: SUN_ATTRIBUTE_BY_KEY[key] || '',
            mqttTopic: ''
        };
    }

    if (!raw.includes('.')) {
        return {
            entityId: `sensor.${raw}`,
            attribute: '',
            mqttTopic: ''
        };
    }

    return { entityId: raw, attribute: '', mqttTopic: '' };
}

export function getSunSourceValue(entityStates, props = {}, key) {
    const { entityId, attribute } = resolveSunEntitySource(props, key);
    if (!entityId) return undefined;

    const stateObj = entityStates?.[entityId];
    if (!stateObj) return undefined;

    if (attribute) {
        return stateObj.attributes?.[attribute];
    }

    return stateObj.state;
}

export function resolveForegroundColor(colorProp, getColorConst) {
    if (colorProp === 'theme_auto') return 'color_on';
    if (colorProp === 'white') return 'color_off';
    if (colorProp === 'black') return 'color_on';
    return getColorConst(colorProp || 'black');
}

export function formatSunTimeValue(value, placeholder = 'n.d.') {
    const raw = String(value ?? '').trim();
    if (!raw || raw === 'unknown' || raw === 'unavailable' || raw === 'none') {
        return placeholder;
    }

    const timeMatch = raw.match(/(\d{1,2}:\d{2})/);
    if (timeMatch) {
        return timeMatch[1];
    }

    return raw;
}
