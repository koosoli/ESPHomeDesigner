export const UNKNOWN_WEATHER_ICON = Object.freeze({
    condition: 'unknown',
    code: 'F0625',
    protocolIcon: 'help-circle-outline'
});

export const WEATHER_ICON_OPTIONS = Object.freeze([
    Object.freeze({ condition: 'clear-night', code: 'F0594', protocolIcon: 'moon' }),
    Object.freeze({ condition: 'cloudy', code: 'F0590', protocolIcon: 'cloud' }),
    Object.freeze({ condition: 'exceptional', code: 'F0026', protocolIcon: 'alert-circle-outline' }),
    Object.freeze({ condition: 'fog', code: 'F0591', protocolIcon: 'fog' }),
    Object.freeze({ condition: 'hail', code: 'F0592', protocolIcon: 'hail' }),
    Object.freeze({ condition: 'lightning', code: 'F0593', protocolIcon: 'lightning' }),
    Object.freeze({ condition: 'lightning-rainy', code: 'F067E', protocolIcon: 'lightning-rainy' }),
    Object.freeze({ condition: 'partlycloudy', code: 'F0595', protocolIcon: 'partly-cloudy' }),
    Object.freeze({ condition: 'pouring', code: 'F0596', protocolIcon: 'pouring' }),
    Object.freeze({ condition: 'rainy', code: 'F0597', protocolIcon: 'rainy' }),
    Object.freeze({ condition: 'snowy', code: 'F0598', protocolIcon: 'snowy' }),
    Object.freeze({ condition: 'snowy-rainy', code: 'F067F', protocolIcon: 'snowy-rainy' }),
    Object.freeze({ condition: 'sunny', code: 'F0599', protocolIcon: 'sun' }),
    Object.freeze({ condition: 'windy', code: 'F059D', protocolIcon: 'wind' }),
    Object.freeze({ condition: 'windy-variant', code: 'F059E', protocolIcon: 'wind' })
]);

export const WEATHER_ICON_CODES = Object.freeze([
    ...WEATHER_ICON_OPTIONS.map((entry) => entry.code),
    UNKNOWN_WEATHER_ICON.code
]);

/** @type {Map<string, (typeof WEATHER_ICON_OPTIONS)[number]>} */
const weatherIconMap = new Map(WEATHER_ICON_OPTIONS.map((entry) => [entry.condition, entry]));

export function normalizeWeatherState(value) {
    return String(value || '')
        .trim()
        .toLowerCase();
}

export function getWeatherIconMeta(value) {
    return weatherIconMap.get(normalizeWeatherState(value)) || UNKNOWN_WEATHER_ICON;
}

export function toWeatherMdiCharacter(code) {
    return String.fromCodePoint(0xf0000 + parseInt(code.slice(1), 16));
}
