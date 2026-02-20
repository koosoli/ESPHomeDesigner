/**
 * Core Type Definitions for ESPHome Designer Frontend
 * Using JSDoc strictly to enhance type safety without requiring full TypeScript build step yet.
 */

/**
 * @typedef {Object} WidgetConfig
 * @property {string} id - Unique widget identifier
 * @property {string} type - Widget type (text, icon, sensor_text, etc.)
 * @property {number} x - X position in pixels
 * @property {number} y - Y position in pixels
 * @property {number} width - Width in pixels
 * @property {number} height - Height in pixels
 * @property {string} [entity_id] - Home Assistant entity ID
 * @property {Object} [props] - Widget-specific properties
 */

/**
 * @typedef {Object} PageConfig
 * @property {string} id - Page identifier
 * @property {string} name - Display name
 * @property {WidgetConfig[]} widgets - Widgets on this page
 * @property {string|null} [layout] - Layout mode (e.g. "4x4", null for absolute)
 * @property {string} [refresh_type] - Refresh mode ('interval' or 'daily')
 * @property {number} [refresh_s] - Refresh interval in seconds
 * @property {string} [refresh_time] - Daily refresh time
 */

/**
 * @typedef {Object} DeviceProfile
 * @property {string} id - Profile identifier
 * @property {string} name - Display name
 * @property {{width: number, height: number}} resolution - Display resolution
 * @property {Object} features - Supported hardware features (e.g., epaper, lcd)
 */

/**
 * @typedef {Object} GenerationContext
 * @property {string[]} lines - Output buffer
 * @property {WidgetConfig[]} widgets - All widgets
 * @property {DeviceProfile} profile - Target device profile
 * @property {function(string, number, number, boolean): string} addFont - Font inclusion helper
 * @property {function(string): string} getColorConst - Color parsing helper
 * @property {boolean} isEpaper - E-paper target flag
 */

/**
 * @typedef {Object} ProjectPayload
 * @property {PageConfig[]} pages - Project pages
 * @property {string} deviceName - Friendly name
 * @property {string} deviceModel - Hardware profile ID
 * @property {string} currentLayoutId - Currently loaded layout
 * @property {Object} customHardware - Custom hardware pinouts
 * @property {string} [renderingMode] - Render mode preference
 * @property {boolean} [invertedColors] - Inverted color flag
 * @property {number} [refreshInterval] - Global interval
 * @property {number} [deepSleepInterval] - Deep sleep interval
 * @property {boolean} [isSelectionSnippet] - Is partial generate
 * @property {string[]} [plugin_includes] - Dynamic includes
 * @property {string[]} [glyphsets] - Required char ranges
 * @property {boolean} [extendedLatinGlyphs] - Extended chars
 */
