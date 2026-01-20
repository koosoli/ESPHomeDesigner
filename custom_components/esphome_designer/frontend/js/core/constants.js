/**
 * Shared constants for ESPHome Designer.
 */

export const COLORS = {
    WHITE: "#FFFFFF",
    BLACK: "#000000",
    GRAY: "#808080",
    GREY: "#808080",
    RED: "#FF0000",
    GREEN: "#00FF00",
    BLUE: "#0000FF",
    YELLOW: "#FFFF00",
    ORANGE: "#FFA500"
};

export const UI_DEFAULTS = {
    GRID_SIZE: 10,
    SNAP_THRESHOLD: 10,
    SIDEBAR_WIDTH: 300,
    PROPERTIES_WIDTH: 350
};

// Alignment options match ESPHome TextAlign enum
export const ALIGNMENT = {
    TOP_LEFT: "TOP_LEFT",
    TOP_CENTER: "TOP_CENTER",
    TOP_RIGHT: "TOP_RIGHT",
    CENTER_LEFT: "CENTER_LEFT",
    CENTER: "CENTER",
    CENTER_RIGHT: "CENTER_RIGHT",
    BOTTOM_LEFT: "BOTTOM_LEFT",
    BOTTOM_CENTER: "BOTTOM_CENTER",
    BOTTOM_RIGHT: "BOTTOM_RIGHT"
};

export const ORIENTATIONS = {
    LANDSCAPE: "landscape",
    PORTRAIT: "portrait"
};

export const DEFAULT_PREFERENCES = {
    snapEnabled: true,
    showGrid: true,
    showRulers: false,
    gridOpacity: 8,
    editor_light_mode: false,
    aiProvider: "gemini",
    aiModelGemini: "gemini-1.5-flash",
    aiModelOpenAI: "gpt-4o",
    aiModelOpenRouter: "",
    aiModelFilter: "",
    extendedLatinGlyphs: false,
    autoCycleEnabled: false,
    autoCycleIntervalS: 30,
    refreshInterval: 600,
    manualRefreshOnly: false,
    darkMode: false,
    invertedColors: false,
    lcdEcoStrategy: "backlight_off",
    sleepEnabled: false,
    sleepStartHour: 0,
    sleepEndHour: 5,
    deepSleepEnabled: false,
    deepSleepInterval: 600,
    dailyRefreshEnabled: false,
    dailyRefreshTime: "08:00",
    noRefreshStartHour: null,
    noRefreshEndHour: null,
    renderingMode: "lvgl"
};

export const WIDGET_DEFAULTS = {
    X: 40,
    Y: 40,
    WIDTH: 200,
    HEIGHT: 60
};

export const HISTORY_LIMIT = 50;

export const CACHE_TTL = {
    RSS: 300,      // 5 minutes
    ENTITIES: 60,  // 1 minute
};

export const ENTITY_LIMIT = 5000;

export const ESPHOME_COLOR_MAPPING = {
    "white": "COLOR_WHITE",
    "black": "COLOR_BLACK",
    "gray": "Color(128, 128, 128)",
    "grey": "Color(128, 128, 128)",
    "red": "COLOR_RED",
    "green": "COLOR_GREEN",
    "blue": "COLOR_BLUE",
    "yellow": "COLOR_YELLOW",
    "orange": "COLOR_ORANGE"
};

export const DEFAULT_CANVAS_WIDTH = 800;
export const DEFAULT_CANVAS_HEIGHT = 480;

export const SNAP_DISTANCE = 10;
export const GRID_SIZE = 10;

// Initialize global namespace
window.ESPHomeDesigner = window.ESPHomeDesigner || {
    version: "0.9.0",
    constants: {
        COLORS,
        UI_DEFAULTS,
        ALIGNMENT,
        ORIENTATIONS,
        DEFAULT_PREFERENCES,
        WIDGET_DEFAULTS,
        HISTORY_LIMIT,
        CACHE_TTL,
        ENTITY_LIMIT,
        ESPHOME_COLOR_MAPPING,
        DEFAULT_CANVAS_WIDTH,
        DEFAULT_CANVAS_HEIGHT,
        SNAP_DISTANCE,
        GRID_SIZE
    }
};

// Expose to window for global access (Transition phase)
window.COLORS = COLORS;
window.UI_DEFAULTS = UI_DEFAULTS;
window.ALIGNMENT = ALIGNMENT;
window.ORIENTATIONS = ORIENTATIONS;
window.DEFAULT_PREFERENCES = DEFAULT_PREFERENCES;
window.WIDGET_DEFAULTS = WIDGET_DEFAULTS;
window.HISTORY_LIMIT = HISTORY_LIMIT;
window.CACHE_TTL = CACHE_TTL;
window.ENTITY_LIMIT = ENTITY_LIMIT;
window.ESPHOME_COLOR_MAPPING = ESPHOME_COLOR_MAPPING;
window.DEFAULT_CANVAS_WIDTH = DEFAULT_CANVAS_WIDTH;
window.DEFAULT_CANVAS_HEIGHT = DEFAULT_CANVAS_HEIGHT;
window.SNAP_DISTANCE = SNAP_DISTANCE;
window.GRID_SIZE = GRID_SIZE;
