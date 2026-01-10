/**
 * @file types.js
 * @description Central JSDoc type definitions for ESPHome Designer.
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
 * @property {boolean} [hidden] - Whether the widget is hidden from canvas and export
 * @property {Object} [props] - Widget-specific properties
 */

/**
 * @typedef {Object} PageConfig
 * @property {string} name - Display name
 * @property {WidgetConfig[]} widgets - Widgets on this page
 * @property {string} [dark_mode] - Dark mode setting ("inherit", "always", "never")
 * @property {string} [refresh_type] - Refresh mode ("interval", "smart", "manual")
 * @property {number|string} [refresh_time] - Refresh interval
 */

/**
 * @typedef {Object} ProjectPayload
 * @property {string} deviceName - User-defined device name
 * @property {PageConfig[]} pages - Pages in the project
 * @property {Object} [deviceSettings] - Hardware-specific settings
 */

/**
 * @typedef {Object} DeviceProfile
 * @property {string} name - Display name
 * @property {Object} features - Supported features (e-paper, battery, etc.)
 * @property {Object} pins - IO Pin mappings
 * @property {boolean} [isPackageBased] - Whether to use local package generation
 * @property {Object} [resolution] - Display resolution {width, height}
 */

/**
 * @typedef {Object} GenerationContext
 * @property {string[]} lines - Output buffer for YAML lines
 * @property {function(string, number, number, boolean=): string} addFont - Register a font and return its ID
 * @property {function(string): string} getColorConst - Get C++ color constant (e.g. COLOR_WHITE)
 * @property {function(Object): string} getCondProps - Get condition metadata tags
 * @property {function(Object): string|null} getConditionCheck - Get C++ if-statement for conditions
 * @property {function(string[], string, boolean, number, number, number, number): void} addDitherMask - Apply dither mask
 * @property {boolean} isEpaper - Whether target is an e-paper
 * @property {Object} [profile] - Active device profile
 */

/**
 * @typedef {Object} PluginInterface
 * @property {string} id - Unique plugin identifier
 * @property {string} name - Display name
 * @property {string} category - UI category
 * @property {Object} defaults - Default properties
 * @property {function(HTMLElement, WidgetConfig, Object): void} render - Canvas render function
 * @property {function(WidgetConfig, GenerationContext): any} export - YAML export function
 * @property {function(WidgetConfig, Object): void} [collectRequirements] - Requirement tracking hook
 * @property {function(Object): void} [onExportGlobals] - Global definitions hook
 * @property {function(Object): void} [onExportHelpers] - Helper functions hook
 * @property {function(Object): void} [onExportNumericSensors] - Numeric sensors hook
 * @property {function(Object): void} [onExportTextSensors] - Text sensors hook
 * @property {function(Object): void} [onExportBinarySensors] - Binary sensors hook
 * @property {function(Object): void} [onExportSelects] - Selects hook
 */
