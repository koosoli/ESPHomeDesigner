import { emit, EVENTS } from '../events.js';
import { DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT, ORIENTATIONS } from '../constants';
import { DEVICE_PROFILES } from '../../io/devices.js';
import { createDefaultPage, normalizePages, clampPageIndex, createPage, duplicatePage } from './project_store_page_helpers.js';
import { moveWidgetToPageState } from './project_store_move_helpers.js';

export class ProjectStore {
    constructor() {
        /**
         * @type {{
         *  pages: Page[],
         *  currentPageIndex: number,
         *  deviceName: string,
         *  deviceModel: string,
         *  currentLayoutId: string,
         *  customHardware: any,
         *  protocolHardware: any,
         *  widgetsById: Map<string, Widget>
         * }}
         */
        this.state = {
            pages: [],
            currentPageIndex: 0,
            deviceName: "Layout 1",
            deviceModel: "reterminal_e1001",
            currentLayoutId: "reterminal_e1001",
            customHardware: {},
            protocolHardware: {
                width: 400,
                height: 300,
                colorMode: 'bw'
            },
            widgetsById: new Map()
        };
        this.reset();
    }

    reset() {
        this.state.pages = [createDefaultPage()];
        this.state.currentPageIndex = 0;
        this.rebuildWidgetsIndex();
    }

    /** @returns {Page[]} */
    get pages() { return this.state.pages; }
    /** @returns {number} */
    get currentPageIndex() { return this.state.currentPageIndex; }
    /** @returns {string} */
    get deviceName() { return this.state.deviceName; }
    /** @returns {string} */
    get deviceModel() { return this.state.deviceModel; }
    /** @returns {string} */
    get currentLayoutId() { return this.state.currentLayoutId; }
    /** @returns {{ width: number, height: number, [key: string]: any }} */
    get protocolHardware() { return this.state.protocolHardware; }
    get customHardware() { return this.state.customHardware; }

    /** @returns {Page} */
    getCurrentPage() {
        if (this.state.pages.length === 0) {
            this.state.pages = [createDefaultPage()];
            this.state.currentPageIndex = 0;
        }
        return this.state.pages[this.state.currentPageIndex] || this.state.pages[0];
    }

    /**
     * @param {string} id 
    * @returns {Widget|undefined}
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

    /** @param {Page[]} pages */
    setPages(pages) {
        this.state.pages = normalizePages(pages);
        this.state.currentPageIndex = clampPageIndex(this.state.currentPageIndex, this.state.pages.length);
        this.rebuildWidgetsIndex();
        emit(EVENTS.STATE_CHANGED);
    }

    /** 
     * @param {number} index 
     * @param {Object} options 
     */
    setCurrentPageIndex(index, options = {}) {
        if (index >= 0 && index < this.state.pages.length) {
            this.state.currentPageIndex = index;
            emit(EVENTS.PAGE_CHANGED, { index, ...options });
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
        emit(EVENTS.PAGE_CHANGED, { index: this.state.currentPageIndex, forceFocus: true });
    }

    /**
     * @param {number|null} atIndex 
     */
    addPage(atIndex = null) {
        const newPage = createPage(this.state.pages);

        const targetIndex = (atIndex !== null) ? atIndex : this.state.pages.length;
        this.state.pages.splice(targetIndex, 0, newPage);

        // If we inserted before or at current index, update current index
        if (atIndex !== null && atIndex <= this.state.currentPageIndex) {
            this.state.currentPageIndex++;
        } else if (atIndex === null) {
            this.state.currentPageIndex = this.state.pages.length - 1;
        }

        this.rebuildWidgetsIndex();
        emit(EVENTS.STATE_CHANGED);
        emit(EVENTS.PAGE_CHANGED, { index: this.state.currentPageIndex, forceFocus: true });
        return newPage;
    }

    /**
     * @param {number} index 
     */
    deletePage(index) {
        if (index < 0 || index >= this.state.pages.length) return;
        if (this.state.pages.length === 1) return;

        this.state.pages.splice(index, 1);

        // Adjust current index if needed
        this.state.currentPageIndex = clampPageIndex(this.state.currentPageIndex, this.state.pages.length);

        this.rebuildWidgetsIndex();
        emit(EVENTS.STATE_CHANGED);
        emit(EVENTS.PAGE_CHANGED, { index: this.state.currentPageIndex, forceFocus: true });
    }

    /** @param {number} index */
    duplicatePage(index) {
        if (index < 0 || index >= this.state.pages.length) return null;

        const sourcePage = this.state.pages[index];
        const newPage = duplicatePage(sourcePage, this.state.pages.length);

        // Insert after the source page
        const targetIndex = index + 1;
        this.state.pages.splice(targetIndex, 0, newPage);
        this.state.currentPageIndex = targetIndex;

        this.rebuildWidgetsIndex();
        emit(EVENTS.STATE_CHANGED);
        emit(EVENTS.PAGE_CHANGED, { index: this.state.currentPageIndex, forceFocus: true });

        return newPage;
    }

    /**
     * @param {number} index 
     * @param {string} newName 
     */
    renamePage(index, newName) {
        if (index < 0 || index >= this.state.pages.length) return;
        if (!newName || newName.trim() === "") return;

        this.state.pages[index].name = newName.trim();
        emit(EVENTS.STATE_CHANGED);
    }

    /** 
    * @param {Widget} widget 
     * @param {number|null} targetPageIndex
     */
    addWidget(widget, targetPageIndex = null) {
        const index = targetPageIndex !== null ? targetPageIndex : this.state.currentPageIndex;
        const page = this.state.pages[index] || this.getCurrentPage();

        page.widgets.push(widget);
        this.state.widgetsById.set(widget.id, widget);
        emit(EVENTS.STATE_CHANGED);
    }

    /**
     * @param {string} widgetId 
    * @param {Partial<Widget>} updates 
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
            const idx = page.widgets.findIndex((/** @type {Widget} */ w) => w.id === id);
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
     * Moves a widget from its current page to a target page.
     * @param {string} widgetId 
     * @param {number} targetPageIndex 
     * @param {number|null} x Optional target X coordinate
     * @param {number|null} y Optional target Y coordinate
     */
    moveWidgetToPage(widgetId, targetPageIndex, x = null, y = null) {
        /** @type {(orientation: string | undefined) => { width: number, height: number }} */
        const getCanvasDimensions = (orientation) => this.getCanvasDimensions(orientation);
        const moved = moveWidgetToPageState(
            this.state,
            widgetId,
            targetPageIndex,
            x,
            y,
            getCanvasDimensions
        );

        if (!moved) return false;

        this.rebuildWidgetsIndex();
        emit(EVENTS.STATE_CHANGED);
        return true;
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

        /** @type {Widget[]} */
        const toDelete = [];
        /** @type {Widget[]} */
        const toPreserve = [];

        page.widgets.forEach((/** @type {Widget} */ w) => {
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
        }
        emit(EVENTS.SETTINGS_CHANGED);
    }

    /**
     * @param {string} orientation 
     * @returns {{width: number, height: number}}
     */
    getCanvasDimensions(orientation = ORIENTATIONS.LANDSCAPE) {
        const model = this.state.deviceModel || "reterminal_e1001";
        const profiles = /** @type {Record<string, any>} */ (DEVICE_PROFILES);
        const profile = profiles && profiles[model] ? profiles[model] : null;

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

    /** @returns {ProjectPayload} */
    getPagesPayload() {
        return {
            name: this.state.deviceName,
            pages: this.state.pages,
            deviceName: this.state.deviceName,
            deviceModel: this.state.deviceModel,
            currentLayoutId: this.state.currentLayoutId,
            customHardware: this.state.customHardware
        };
    }

    /** @returns {string} */
    getCanvasShape() {
        const profiles = /** @type {Record<string, any>} */ (DEVICE_PROFILES);
        const profile = profiles[this.state.deviceModel];
        if (profile && profile.shape) return profile.shape;

        if (this.state.customHardware && this.state.customHardware.shape) {
            return this.state.customHardware.shape;
        }

        return "rect";
    }
}
