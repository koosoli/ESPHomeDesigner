export const DEFAULT_DAY_LANGUAGE = "en";
export const AUTO_DAY_LANGUAGE = "auto";

const DAY_LABEL_SETS = Object.freeze({
    en: Object.freeze({
        label: "English",
        today: "Today",
        weekdays: Object.freeze(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"])
    }),
    de: Object.freeze({
        label: "German",
        today: "Heute",
        weekdays: Object.freeze(["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"])
    }),
    nl: Object.freeze({
        label: "Dutch",
        today: "Vandaag",
        weekdays: Object.freeze(["zo", "ma", "di", "wo", "do", "vr", "za"])
    }),
    fr: Object.freeze({
        label: "French",
        today: "Aujourd'hui",
        weekdays: Object.freeze(["dim", "lun", "mar", "mer", "jeu", "ven", "sam"])
    }),
    es: Object.freeze({
        label: "Spanish",
        today: "Hoy",
        weekdays: Object.freeze(["dom", "lun", "mar", "mie", "jue", "vie", "sab"])
    }),
    it: Object.freeze({
        label: "Italian",
        today: "Oggi",
        weekdays: Object.freeze(["dom", "lun", "mar", "mer", "gio", "ven", "sab"])
    }),
    pt: Object.freeze({
        label: "Portuguese",
        today: "Hoje",
        weekdays: Object.freeze(["dom", "seg", "ter", "qua", "qui", "sex", "sab"])
    })
});

/**
 * @param {string | undefined | null} value
 * @returns {string}
 */
const normalizeDayLanguage = (value) => {
    if (typeof value !== "string") return "";
    const normalized = value.trim().toLowerCase().replace(/_/g, "-");
    if (!normalized) return "";
    if (normalized in DAY_LABEL_SETS) return normalized;

    const [baseLanguage] = normalized.split("-");
    return baseLanguage in DAY_LABEL_SETS ? baseLanguage : "";
};

/**
 * @returns {string}
 */
export const getRuntimeDayLanguage = () => {
    try {
        if (typeof navigator !== "undefined" && typeof navigator.language === "string") {
            return navigator.language;
        }
    } catch {
        // Ignore runtime locale access failures and fall back to English.
    }

    try {
        return Intl.DateTimeFormat().resolvedOptions().locale || "";
    } catch {
        return "";
    }
};

/**
 * @param {string | undefined | null} requestedLanguage
 * @param {string | undefined | null} [runtimeLanguage]
 * @returns {string}
 */
export const resolveDayLanguage = (requestedLanguage, runtimeLanguage = getRuntimeDayLanguage()) => {
    const requested = normalizeDayLanguage(requestedLanguage);
    const rawRequested = typeof requestedLanguage === "string" ? requestedLanguage.trim().toLowerCase() : "";
    if (requested) return requested;
    if (rawRequested === AUTO_DAY_LANGUAGE) {
        return normalizeDayLanguage(runtimeLanguage) || DEFAULT_DAY_LANGUAGE;
    }
    return DEFAULT_DAY_LANGUAGE;
};

/**
 * @param {string | undefined | null} requestedLanguage
 * @param {string | undefined | null} [runtimeLanguage]
 * @returns {{ label: string, today: string, weekdays: readonly string[] }}
 */
export const getDayLabelSet = (requestedLanguage, runtimeLanguage) => {
    const language = resolveDayLanguage(requestedLanguage, runtimeLanguage);
    return DAY_LABEL_SETS[language] || DAY_LABEL_SETS[DEFAULT_DAY_LANGUAGE];
};

export const DAY_LANGUAGE_OPTIONS = Object.freeze([
    { value: DEFAULT_DAY_LANGUAGE, label: DAY_LABEL_SETS.en.label },
    { value: "de", label: DAY_LABEL_SETS.de.label },
    { value: "nl", label: DAY_LABEL_SETS.nl.label },
    { value: "fr", label: DAY_LABEL_SETS.fr.label },
    { value: "es", label: DAY_LABEL_SETS.es.label },
    { value: "it", label: DAY_LABEL_SETS.it.label },
    { value: "pt", label: DAY_LABEL_SETS.pt.label },
    { value: AUTO_DAY_LANGUAGE, label: "Auto (Browser)" }
]);
