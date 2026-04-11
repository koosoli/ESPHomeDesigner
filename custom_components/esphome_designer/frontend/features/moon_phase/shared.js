export const MOON_PHASE_OPTIONS = [
    { state: 'waxing_crescent', code: 'F0F67', icon: 'moon-waxing-crescent' },
    { state: 'first_quarter', code: 'F0F61', icon: 'moon-first-quarter' },
    { state: 'waxing_gibbous', code: 'F0F68', icon: 'moon-waxing-gibbous' },
    { state: 'full_moon', code: 'F0F62', icon: 'moon-full' },
    { state: 'waning_gibbous', code: 'F0F66', icon: 'moon-waning-gibbous' },
    { state: 'last_quarter', code: 'F0F63', icon: 'moon-last-quarter' },
    { state: 'waning_crescent', code: 'F0F65', icon: 'moon-waning-crescent' },
    { state: 'new_moon', code: 'F0F64', icon: 'moon-new' }
];

export const UNKNOWN_MOON_PHASE = {
    state: 'unknown',
    code: 'F0625',
    icon: 'help-circle-outline'
};

export const DEFAULT_MOON_PHASE = MOON_PHASE_OPTIONS[0];

const moonPhaseMap = new Map(MOON_PHASE_OPTIONS.map((entry) => [entry.state, entry]));

export function normalizeMoonPhaseState(value) {
    return String(value || '')
        .trim()
        .toLowerCase()
        .replace(/[\s-]+/g, '_');
}

export function getMoonPhaseMeta(value) {
    return moonPhaseMap.get(normalizeMoonPhaseState(value)) || UNKNOWN_MOON_PHASE;
}

export function toMdiCharacter(code) {
    return String.fromCodePoint(0xf0000 + parseInt(code.slice(1), 16));
}

export function makeSafeMoonSensorId(entityId, suffix = '_txt') {
    let safe = String(entityId || '').replace(/[^a-zA-Z0-9_]/g, '_');
    const maxBase = 63 - suffix.length;
    if (safe.length > maxBase) {
        safe = safe.substring(0, maxBase);
    }
    return `${safe}${suffix}`;
}

export function resolveForegroundColor(colorProp, getColorConst) {
    if (colorProp === 'theme_auto') return 'color_on';
    if (colorProp === 'white') return 'color_off';
    if (colorProp === 'black') return 'color_on';
    return getColorConst(colorProp || 'black');
}
