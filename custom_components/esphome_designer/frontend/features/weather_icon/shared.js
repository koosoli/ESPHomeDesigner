export const UNKNOWN_WEATHER_ICON = Object.freeze({
    condition: 'unknown',
    code: 'F0625',
    protocolIcon: 'help-circle-outline',
    openDisplayIcon: 'help-circle-outline'
});

export const WEATHER_ICON_OPTIONS = Object.freeze([
    Object.freeze({ condition: 'clear-night', code: 'F0594', protocolIcon: 'moon', openDisplayIcon: 'weather-night' }),
    Object.freeze({ condition: 'cloudy', code: 'F0590', protocolIcon: 'cloud', openDisplayIcon: 'weather-cloudy' }),
    Object.freeze({ condition: 'exceptional', code: 'F0026', protocolIcon: 'alert-circle-outline', openDisplayIcon: 'alert-circle-outline' }),
    Object.freeze({ condition: 'fog', code: 'F0591', protocolIcon: 'fog', openDisplayIcon: 'weather-fog' }),
    Object.freeze({ condition: 'hail', code: 'F0592', protocolIcon: 'hail', openDisplayIcon: 'weather-hail' }),
    Object.freeze({ condition: 'lightning', code: 'F0593', protocolIcon: 'lightning', openDisplayIcon: 'weather-lightning' }),
    Object.freeze({ condition: 'lightning-rainy', code: 'F067E', protocolIcon: 'lightning-rainy', openDisplayIcon: 'weather-lightning-rainy' }),
    Object.freeze({ condition: 'partlycloudy', code: 'F0595', protocolIcon: 'partly-cloudy', openDisplayIcon: 'weather-partly-cloudy' }),
    Object.freeze({ condition: 'pouring', code: 'F0596', protocolIcon: 'pouring', openDisplayIcon: 'weather-pouring' }),
    Object.freeze({ condition: 'rainy', code: 'F0597', protocolIcon: 'rainy', openDisplayIcon: 'weather-rainy' }),
    Object.freeze({ condition: 'snowy', code: 'F0598', protocolIcon: 'snowy', openDisplayIcon: 'weather-snowy' }),
    Object.freeze({ condition: 'snowy-rainy', code: 'F067F', protocolIcon: 'snowy-rainy', openDisplayIcon: 'weather-snowy-rainy' }),
    Object.freeze({ condition: 'sunny', code: 'F0599', protocolIcon: 'sun', openDisplayIcon: 'weather-sunny' }),
    Object.freeze({ condition: 'windy', code: 'F059D', protocolIcon: 'wind', openDisplayIcon: 'weather-windy' }),
    Object.freeze({ condition: 'windy-variant', code: 'F059E', protocolIcon: 'wind', openDisplayIcon: 'weather-windy-variant' })
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
