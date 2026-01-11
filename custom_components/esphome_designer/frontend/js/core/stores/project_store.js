import { emit, EVENTS } from '../events.js';
import { DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT, ORIENTATIONS } from '../constants.js';
import { DEVICE_PROFILES } from '../../io/devices.js';
import { Logger } from '../../utils/logger.js';
import { hasHaBackend } from '../../utils/env.js';

export class ProjectStore {
    constructor() {
        /**
         * @type {{
         *  pages: import("../../types.js").PageConfig[],
         *  currentPageIndex: number,
         *  deviceName: string,
         *  deviceModel: string,
         *  currentLayoutId: string,
         *  widgetsById: Map<string, import("../../types.js").WidgetConfig>
         * }}
         */
        this.state = {
            pages: [],
            currentPageIndex: 0,
            deviceName: "Layout 1",
            deviceModel: "reterminal_e1001",
            currentLayoutId: "reterminal_e1001",
            customHardware: {},
            widgetsById: new Map()
        };
        this.reset();
    }

    reset() {
        this.state.pages = [{
            id: "page_0",
            name: "Overview",
            layout: null,
            widgets: []
        }];
        this.state.currentPageIndex = 0;
        this.rebuildWidgetsIndex();
    }

    /** @returns {import("../../types.js").PageConfig[]} */
    get pages() { return this.state.pages; }
    /** @returns {number} */
    get currentPageIndex() { return this.state.currentPageIndex; }
    /** @returns {string} */
    get deviceName() { return this.state.deviceName; }
    /** @returns {string} */
    get deviceModel() { return this.state.deviceModel; }
    /** @returns {string} */
    get currentLayoutId() { return this.state.currentLayoutId; }

    /** @returns {import("../../types.js").PageConfig} */
    getCurrentPage() {
        return this.state.pages[this.state.currentPageIndex] || this.state.pages[0];
    }

    /**
     * @param {string} id 
     * @returns {import("../../types.js").WidgetConfig|undefined}
     */
    getWidgetById(id) {
        return this.state.widgetsById.get(id);
    }

    rebuildWidgetsIndex() {
        this.state.widgetsById.clear();
        for (const page of this.state.pages) {
            for (const w of page.widgets) {
                this.state.widgetsById.set(w.id, w);
            }
        }
    }

    /** @param {import("../../types.js").PageConfig[]} pages */
    setPages(pages) {
        this.state.pages = pages;
        this.rebuildWidgetsIndex();
        emit(EVENTS.STATE_CHANGED);
    }

    /** @param {number} index */
    setCurrentPageIndex(index) {
        if (index >= 0 && index < this.state.pages.length) {
            this.state.currentPageIndex = index;
            emit(EVENTS.PAGE_CHANGED, { index });
        }
    }

    /**
     * @param {number} fromIndex 
     * @param {number} toIndex 
     */
    reorderPage(fromIndex, toIndex) {
        if (fromIndex < 0 || fromIndex >= this.state.pages.length ||
            toIndex < 0 || toIndex >= this.state.pages.length) return;

        const [page] = this.state.pages.splice(fromIndex, 1);
        this.state.pages.splice(toIndex, 0, page);

        // Update current page index to follow the moved page if it was the current one
        if (this.state.currentPageIndex === fromIndex) {
            this.state.currentPageIndex = toIndex;
        } else if (fromIndex < this.state.currentPageIndex && toIndex >= this.state.currentPageIndex) {
            this.state.currentPageIndex--;
        } else if (fromIndex > this.state.currentPageIndex && toIndex <= this.state.currentPageIndex) {
            this.state.currentPageIndex++;
        }

        emit(EVENTS.STATE_CHANGED);
        emit(EVENTS.PAGE_CHANGED, { index: this.state.currentPageIndex });
    }

    /** @param {import("../../types.js").WidgetConfig} widget */
    addWidget(widget) {
        const page = this.getCurrentPage();
        page.widgets.push(widget);
        this.state.widgetsById.set(widget.id, widget);
        emit(EVENTS.STATE_CHANGED);
    }

    /**
     * @param {string} widgetId 
     * @param {Partial<import("../../types.js").WidgetConfig>} updates 
     */
    updateWidget(widgetId, updates) {
        const widget = this.getWidgetById(widgetId);
        if (widget) {
            Object.assign(widget, updates);
            emit(EVENTS.STATE_CHANGED);
        }
    }

    /** @param {string[]} idsToDelete */
    deleteWidgets(idsToDelete) {
        const page = this.getCurrentPage();
        let changed = false;
        for (const id of idsToDelete) {
            const idx = page.widgets.findIndex(w => w.id === id);
            if (idx !== -1) {
                page.widgets.splice(idx, 1);
                this.state.widgetsById.delete(id);
                changed = true;
            }
        }
        if (changed) {
            emit(EVENTS.STATE_CHANGED);
        }
    }

    /**
     * @param {number} pageIndex 
     * @param {number} fromIndex 
     * @param {number} toIndex 
     */
    reorderWidget(pageIndex, fromIndex, toIndex) {
        const page = this.state.pages[pageIndex];
        if (!page) return;

        const widgets = page.widgets;
        if (fromIndex < 0 || fromIndex >= widgets.length || toIndex < 0 || toIndex >= widgets.length) {
            return;
        }

        const [movedWidget] = widgets.splice(fromIndex, 1);
        widgets.splice(toIndex, 0, movedWidget);

        emit(EVENTS.STATE_CHANGED);
    }

    /**
     * @param {boolean} preserveLocked 
     * @returns {{deleted: number, preserved: number}}
     */
    clearCurrentPage(preserveLocked = false) {
        const page = this.getCurrentPage();
        if (!page) return { deleted: 0, preserved: 0 };

        const toDelete = [];
        const toPreserve = [];

        page.widgets.forEach(w => {
            if (preserveLocked && w.locked) {
                toPreserve.push(w);
            } else {
                toDelete.push(w);
            }
        });

        page.widgets = toPreserve;
        toDelete.forEach(w => this.state.widgetsById.delete(w.id));

        if (toDelete.length > 0) {
            emit(EVENTS.STATE_CHANGED);
        }

        return {
            deleted: toDelete.length,
            preserved: toPreserve.length
        };
    }

    /**
     * @param {string} name 
     * @param {string} model 
     */
    setDeviceSettings(name, model) {
        if (name) this.state.deviceName = name;
        if (model) {
            this.state.deviceModel = model;
            window.currentDeviceModel = model;
        }
        emit(EVENTS.SETTINGS_CHANGED);
    }

    /**
     * @param {string} orientation 
     * @returns {{width: number, height: number}}
     */
    getCanvasDimensions(orientation) {
        const model = this.state.deviceModel || "reterminal_e1001";
        const profile = (DEVICE_PROFILES && DEVICE_PROFILES[model]) ? DEVICE_PROFILES[model] : null;

        let width = DEFAULT_CANVAS_WIDTH;
        let height = DEFAULT_CANVAS_HEIGHT;

        if (profile) {
            if (profile.resolution) {
                width = profile.resolution.width;
                height = profile.resolution.height;
            }
        } else if (model === 'custom' && this.state.customHardware) {
            const ch = this.state.customHardware;
            if (ch.resWidth && ch.resHeight) {
                width = ch.resWidth;
                height = ch.resHeight;
            }
        }

        if (orientation === ORIENTATIONS.PORTRAIT) {
            return { width: Math.min(width, height), height: Math.max(width, height) };
        } else {
            return { width: Math.max(width, height), height: Math.min(width, height) };
        }
    }

    /** @returns {import("../../types.js").ProjectPayload} */
    getPagesPayload() {
        return {
            pages: this.state.pages,
            deviceName: this.state.deviceName,
            deviceModel: this.state.deviceModel,
            deviceSettings: {
                model: this.state.deviceModel,
                custom_hardware: this.state.customHardware
            }
        };
    }
}
