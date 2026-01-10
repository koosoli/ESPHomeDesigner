import { emit, EVENTS } from '../events.js';
import { deepClone } from '../../utils/helpers.js';
import { Logger } from '../../utils/logger.js';
import { HISTORY_LIMIT } from '../constants.js';

export class EditorStore {
    constructor() {
        /**
         * @type {{
         *  selectedWidgetIds: string[],
         *  clipboardWidgets: import("../../types.js").WidgetConfig[],
         *  zoomLevel: number,
         *  panX: number,
         *  panY: number
         * }}
         */
        this.state = {
            selectedWidgetIds: [],
            clipboardWidgets: [],
            zoomLevel: 1.0,
            panX: 0,
            panY: 0
        };
        /** @type {import("../../types.js").ProjectPayload[]} */
        this.historyStack = [];
        /** @type {number} */
        this.historyIndex = -1;
    }

    /** @returns {string[]} */
    get selectedWidgetIds() { return this.state.selectedWidgetIds; }
    /** @returns {import("../../types.js").WidgetConfig[]} */
    get clipboardWidgets() { return this.state.clipboardWidgets; }
    /** @returns {number} */
    get zoomLevel() { return this.state.zoomLevel; }

    /** @param {number} level */
    setZoomLevel(level) {
        this.state.zoomLevel = Math.max(0.05, Math.min(5.0, level));
        emit(EVENTS.ZOOM_CHANGED, { zoomLevel: this.state.zoomLevel });
    }

    /** @param {string[]} ids */
    setSelectedWidgetIds(ids) {
        this.state.selectedWidgetIds = ids || [];
        emit(EVENTS.SELECTION_CHANGED, { widgetIds: this.state.selectedWidgetIds });
    }

    /**
     * @param {string} widgetId 
     * @param {boolean} multi 
     */
    selectWidget(widgetId, multi = false) {
        if (multi) {
            const idx = this.state.selectedWidgetIds.indexOf(widgetId);
            if (idx === -1) {
                if (widgetId) this.state.selectedWidgetIds.push(widgetId);
            } else {
                this.state.selectedWidgetIds.splice(idx, 1);
            }
        } else {
            this.state.selectedWidgetIds = widgetId ? [widgetId] : [];
        }
        emit(EVENTS.SELECTION_CHANGED, { widgetIds: this.state.selectedWidgetIds });
    }

    /** @param {import("../../types.js").WidgetConfig[]} widgets */
    copyWidgets(widgets) {
        this.state.clipboardWidgets = widgets.map(w => deepClone(w));
        Logger.log("[EditorStore] Widgets copied to clipboard:", this.state.clipboardWidgets.length);
    }

    /**
     * Record a project state snapshot for undo/redo.
     * @param {import("../../types.js").ProjectPayload} currentProjectState 
     */
    recordHistory(currentProjectState) {
        const snapshot = deepClone(currentProjectState);

        // Deduplicate
        if (this.historyIndex >= 0) {
            const lastSnapshot = this.historyStack[this.historyIndex];
            if (JSON.stringify(lastSnapshot) === JSON.stringify(snapshot)) {
                return;
            }
        }

        // Truncate future
        if (this.historyIndex < this.historyStack.length - 1) {
            this.historyStack = this.historyStack.slice(0, this.historyIndex + 1);
        }

        this.historyStack.push(snapshot);
        this.historyIndex++;

        // Limit stack
        if (this.historyStack.length > HISTORY_LIMIT) {
            this.historyStack.shift();
            this.historyIndex--;
        }

        emit(EVENTS.HISTORY_CHANGED, { canUndo: this.canUndo(), canRedo: this.canRedo() });
    }

    /** @returns {import("../../types.js").ProjectPayload|null} */
    undo() {
        if (this.canUndo()) {
            this.historyIndex--;
            return this.historyStack[this.historyIndex];
        }
        return null;
    }

    /** @returns {import("../../types.js").ProjectPayload|null} */
    redo() {
        if (this.canRedo()) {
            this.historyIndex++;
            return this.historyStack[this.historyIndex];
        }
        return null;
    }

    canUndo() { return this.historyIndex > 0; }
    canRedo() { return this.historyIndex < this.historyStack.length - 1; }
}
