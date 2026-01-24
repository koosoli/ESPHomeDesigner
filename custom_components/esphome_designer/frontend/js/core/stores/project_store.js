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
    /** @returns {Object} */
    get protocolHardware() { return this.state.protocolHardware; }

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
        emit(EVENTS.PAGE_CHANGED, { index: this.state.currentPageIndex });
    }

    /**
     * @param {number|null} atIndex 
     */
    addPage(atIndex = null) {
        const newIdNum = this.state.pages.length;
        // Generate a truly unique ID if possible, but keeping consistency with current pattern
        const newPage = {
            id: `page_${Date.now()}_${newIdNum}`,
            name: `Page ${newIdNum + 1}`,
            widgets: []
        };

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
        emit(EVENTS.PAGE_CHANGED, { index: this.state.currentPageIndex });
        return newPage;
    }

    /**
     * @param {number} index 
     */
    deletePage(index) {
        if (index < 0 || index >= this.state.pages.length) return;

        this.state.pages.splice(index, 1);

        // Adjust current index if needed
        if (this.state.currentPageIndex >= this.state.pages.length) {
            this.state.currentPageIndex = Math.max(0, this.state.pages.length - 1);
        }

        this.rebuildWidgetsIndex();
        emit(EVENTS.STATE_CHANGED);
        emit(EVENTS.PAGE_CHANGED, { index: this.state.currentPageIndex });
    }

    /** 
     * @param {import("../../types.js").WidgetConfig} widget 
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
     * Moves a widget from its current page to a target page.
     * @param {string} widgetId 
     * @param {number} targetPageIndex 
     * @param {number|null} x Optional target X coordinate
     * @param {number|null} y Optional target Y coordinate
     */
    moveWidgetToPage(widgetId, targetPageIndex, x = null, y = null) {
        if (targetPageIndex < 0 || targetPageIndex >= this.state.pages.length) return false;

        const targetPage = this.state.pages[targetPageIndex];
        const allMovedIds = new Set();
        const movements = [];

        // 0. Resolve to root group if the widget is part of a group
        let rootWidgetId = widgetId;
        let initialWidget = this.state.widgetsById.get(widgetId);
        if (initialWidget && initialWidget.parentId) {
            let current = initialWidget;
            while (current.parentId) {
                const parent = this.state.widgetsById.get(current.parentId);
                if (parent) {
                    current = parent;
                } else {
                    break;
                }
            }
            rootWidgetId = current.id;
        }

        // 1. Collect all widgets to move (recursively from root)
        const collect = (id) => {
            if (allMovedIds.has(id)) return;

            let found = null;
            let sp = null;
            for (const p of this.state.pages) {
                found = p.widgets.find(w => w.id === id);
                if (found) { sp = p; break; }
            }

            if (!found || !sp || sp === targetPage) return;

            allMovedIds.add(id);
            movements.push({ widget: found, sourcePage: sp });

            // Collect children
            const children = sp.widgets.filter(w => w.parentId === id);
            children.forEach(c => collect(c.id));
        };

        collect(rootWidgetId);

        if (movements.length === 0) return false;

        // 2. Perform movement
        movements.forEach((m, idx) => {
            const { widget, sourcePage } = m;

            // Remove from source
            const sIdx = sourcePage.widgets.indexOf(widget);
            if (sIdx !== -1) sourcePage.widgets.splice(sIdx, 1);

            // Cleanup parentId for the root item if parent isn't moved
            if (idx === 0 && widget.parentId && !allMovedIds.has(widget.parentId)) {
                widget.parentId = null;
            }

            // Update position for root only
            if (idx === 0) {
                // Calculate delta if we have target coordinates
                let dx = 0;
                let dy = 0;

                if (x !== null && y !== null) {
                    dx = x - widget.x;
                    dy = y - widget.y;

                    widget.x = x;
                    widget.y = y;
                }

                // If this is the root and we have a delta, apply it to all OTHER moved widgets (children)
                // Note: 'movements' includes the root at index 0, and children at indices 1..n
                if (dx !== 0 || dy !== 0) {
                    for (let i = 1; i < movements.length; i++) {
                        const child = movements[i].widget;
                        child.x += dx;
                        child.y += dy;
                    }
                }
            }

            // Add to target
            targetPage.widgets.push(widget);
        });

        // 3. Bounds clamping for ROOT widgets only
        // Only clamp roots to preserve relative positioning within groups
        const dims = this.getCanvasDimensions();
        for (const id of allMovedIds) {
            const widget = this.state.widgetsById.get(id);
            if (!widget) continue;

            // Skip children - they maintain relative position to their parent
            if (widget.parentId && allMovedIds.has(widget.parentId)) continue;

            // Clamp the root widget
            const oldX = widget.x;
            const oldY = widget.y;
            widget.x = Math.max(0, Math.min(dims.width - (widget.width || 50), widget.x));
            widget.y = Math.max(0, Math.min(dims.height - (widget.height || 50), widget.y));

            // If root was clamped, propagate the adjustment to its children
            const clampDx = widget.x - oldX;
            const clampDy = widget.y - oldY;
            if (clampDx !== 0 || clampDy !== 0) {
                for (const childId of allMovedIds) {
                    const child = this.state.widgetsById.get(childId);
                    if (child && child.parentId === widget.id) {
                        child.x += clampDx;
                        child.y += clampDy;
                    }
                }
            }
        }

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
            currentLayoutId: this.state.currentLayoutId,
            customHardware: this.state.customHardware
        };
    }

    /** @returns {string} */
    getCanvasShape() {
        const profile = DEVICE_PROFILES[this.state.deviceModel];
        if (profile && profile.shape) return profile.shape;

        if (this.state.customHardware && this.state.customHardware.shape) {
            return this.state.customHardware.shape;
        }

        return "rect";
    }
}
