import { emit, EVENTS } from '../events.js';
import { Logger } from '../../utils/logger.js';
import { DEFAULT_PREFERENCES } from '../constants.js';

export class PreferencesStore {
    constructor() {
        /**
         * @type {{
         *  snapEnabled: boolean,
         *  showGrid: boolean,
         *  gridOpacity: number,
         *  editor_light_mode: boolean,
         *  aiProvider: string,
         *  aiModelGemini: string,
         *  aiModelOpenAI: string,
         *  aiModelOpenRouter: string,
         *  aiModelFilter: string,
         *  extendedLatinGlyphs: boolean,
         *  autoCycleEnabled: boolean,
         *  autoCycleIntervalS: number,
         *  refreshInterval: number,
         *  manualRefreshOnly: boolean,
         *  darkMode: boolean,
         *  sleepEnabled: boolean,
         *  sleepStartHour: number|null,
         *  sleepEndHour: number|null,
         *  deepSleepEnabled: boolean,
         *  deepSleepInterval: number,
         *  dailyRefreshEnabled: boolean,
         *  dailyRefreshTime: string,
         *  noRefreshStartHour: number|null,
         *  noRefreshEndHour: number|null,
         *  glyphsets: string[]
         * }}
         */
        this.state = { ...DEFAULT_PREFERENCES };
    }

    /** @returns {boolean} */
    get snapEnabled() { return this.state.snapEnabled; }
    /** @returns {boolean} */
    get showGrid() { return this.state.showGrid; }
    /** @returns {boolean} */
    get showDebugGrid() { return this.state.showDebugGrid; }
    /** @returns {boolean} */
    get showRulers() { return this.state.showRulers; }
    /** @returns {number} */
    get gridOpacity() { return this.state.gridOpacity; }
    /** @returns {boolean} */
    get editor_light_mode() { return this.state.editor_light_mode; }

    /** @param {Partial<Object>} updates */
    update(updates) {
        this.state = { ...this.state, ...updates };
        emit(EVENTS.SETTINGS_CHANGED, this.state);
        Logger.log("[PreferencesStore] Settings updated");
    }

    /** @param {boolean} enabled */
    setSnapEnabled(enabled) {
        this.state.snapEnabled = enabled;
        emit(EVENTS.SETTINGS_CHANGED, { snapEnabled: enabled });
    }

    /** @param {boolean} enabled */
    setShowGrid(enabled) {
        this.state.showGrid = enabled;
        emit(EVENTS.SETTINGS_CHANGED, { showGrid: enabled });
    }

    /** @param {boolean} enabled */
    setShowDebugGrid(enabled) {
        this.state.showDebugGrid = enabled;
        emit(EVENTS.SETTINGS_CHANGED, { showDebugGrid: enabled });
    }

    /** @param {boolean} enabled */
    setShowRulers(enabled) {
        this.state.showRulers = enabled;
        emit(EVENTS.SETTINGS_CHANGED, { showRulers: enabled });
    }
}
