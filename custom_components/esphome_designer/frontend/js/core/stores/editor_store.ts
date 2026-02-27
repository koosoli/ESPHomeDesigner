import { emit, EVENTS } from '../events.js';
import { deepClone } from '../../utils/helpers.js';
import { Logger } from '../../utils/logger.js';
import { HISTORY_LIMIT } from '../constants';

export interface EditorState {
    selectedWidgetIds: string[];
    clipboardWidgets: any[];
    zoomLevel: number;
    panX: number;
    panY: number;
}

export class EditorStore {
    state: EditorState;
    historyStack: any[];
    historyIndex: number;

    constructor() {
        this.state = {
            selectedWidgetIds: [],
            clipboardWidgets: [],
            zoomLevel: 1.0,
            panX: 0,
            panY: 0
        };
        this.historyStack = [];
        this.historyIndex = -1;
    }

    get selectedWidgetIds(): string[] { return this.state.selectedWidgetIds; }
    get clipboardWidgets(): any[] { return this.state.clipboardWidgets; }
    get zoomLevel(): number { return this.state.zoomLevel; }

    setZoomLevel(level: number): void {
        this.state.zoomLevel = Math.max(0.05, Math.min(5.0, level));
        emit(EVENTS.ZOOM_CHANGED, { zoomLevel: this.state.zoomLevel });
    }

    setSelectedWidgetIds(ids: string[] | null | undefined): void {
        this.state.selectedWidgetIds = ids || [];
        emit(EVENTS.SELECTION_CHANGED, { widgetIds: this.state.selectedWidgetIds });
    }

    selectWidget(widgetId: string | null | undefined, multi: boolean = false): void {
        if (multi) {
            const idx = widgetId ? this.state.selectedWidgetIds.indexOf(widgetId) : -1;
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

    copyWidgets(widgets: any[]): void {
        this.state.clipboardWidgets = widgets.map(w => deepClone(w));
        Logger.log("[EditorStore] Widgets copied to clipboard:", this.state.clipboardWidgets.length);
    }

    recordHistory(currentProjectState: any): void {
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

    undo(): any | null {
        if (this.canUndo()) {
            this.historyIndex--;
            return this.historyStack[this.historyIndex];
        }
        return null;
    }

    redo(): any | null {
        if (this.canRedo()) {
            this.historyIndex++;
            return this.historyStack[this.historyIndex];
        }
        return null;
    }

    canUndo(): boolean { return this.historyIndex > 0; }
    canRedo(): boolean { return this.historyIndex < this.historyStack.length - 1; }
}
