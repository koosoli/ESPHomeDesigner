import { generateId } from '../../../utils/helpers.js';
import { emit, EVENTS } from '../../events.js';
import { Logger } from '../../../utils/logger.js';
import { showToast } from '../../../utils/dom.js';
import { registry } from '../../plugin_registry.js';

export class WidgetManager {
    /**
     * @param {any} app
     */
    constructor(app) {
        this.app = app;
    }

    /**
     * @param {string[] | Set<string> | null | undefined} ids
     * @returns {string[]}
     */
    normalizeWidgetIds(ids) {
        if (!ids) return [];
        return Array.isArray(ids) ? ids : [...ids];
    }

    /**
     * @param {any} config
     */
    setCustomHardware(config) {
        this.app.project.state.customHardware = config;
        emit(EVENTS.STATE_CHANGED);
        // Trigger canvas refocus when custom hardware (resolution) changes
        emit(EVENTS.PAGE_CHANGED, { index: this.app.currentPageIndex, forceFocus: true });
    }

    /**
     * @param {Widget} w 
     * @param {number|null} pageIndex 
     */
    addWidget(w, pageIndex = null) {
        this.checkRenderingModeForWidget(w);
        this.app.project.addWidget(w, pageIndex);
        this.app.recordHistory();
        this.app.selectWidget(w.id);
        emit(EVENTS.STATE_CHANGED);
    }

    /**
     * @param {string} id 
     * @param {Partial<Widget>} u 
     */
    updateWidget(id, u) {
        const appAny = /** @type {any} */ (this.app);
        this.app.project.updateWidget(id, u);

        // Recursive propagation for certain properties if it's a group
        const widget = appAny.getWidgetById(id);
        if (widget && widget.type === 'group') {
            /** @type {string[]} */
            const propsToPropagate = ['locked', 'hidden'];
            /** @type {Record<string, any>} */
            const childUpdates = {};
            const updates = /** @type {Record<string, any>} */ (u || {});
            propsToPropagate.forEach(p => {
                if (updates[p] !== undefined) childUpdates[p] = updates[p];
            });

            if (Object.keys(childUpdates).length > 0) {
                const page = appAny.pages[appAny.currentPageIndex];
                if (page && page.widgets) {
                    const children = page.widgets.filter((/** @type {Widget} */ w) => w.parentId === id);
                    children.forEach((/** @type {Widget} */ c) => this.updateWidget(c.id, childUpdates));
                }
            }
        }

        if (u.parentId !== undefined) {
            this.syncWidgetOrderWithHierarchy();
        }

        emit(EVENTS.STATE_CHANGED);
    }

    /**
     * @param {string[]} ids
     * @param {Partial<Widget>} u
     */
    updateWidgets(ids, u) {
        ids.forEach(id => this.app.project.updateWidget(id, u));
        emit(EVENTS.STATE_CHANGED);
    }

    /**
     * @param {string[]} ids
     * @param {Record<string, any>} propUpdates
     */
    updateWidgetsProps(ids, propUpdates) {
        // Keep track of secondary updates
        /** @type {{ id: string, props: Record<string, any> }[]} */
        const additionalUpdates = [];

        ids.forEach(id => {
            const widget = this.app.getWidgetById(id);
            if (widget) {
                const newProps = { ...(widget.props || {}), ...propUpdates };
                this.app.project.updateWidget(id, { props: newProps });

                // Shadow Group Sync Logic: If radius changed and widget is in a shadow group, sync it to the shadow
                if (propUpdates.radius !== undefined && widget.parentId) {
                    const group = this.app.getWidgetById(widget.parentId);
                    if (group && group.type === 'group' && group.title && group.title.endsWith('Group')) {
                        // Find the sibling widget that represents the shadow
                        const siblings = this.app.getCurrentPage()?.widgets.filter((/** @type {Widget} */ w) => w.parentId === group.id) || [];
                        const shadowWidget = siblings.find((/** @type {Widget} */ w) => w.id !== widget.id && w.props?.name && w.props.name.endsWith('Shadow'));
                        if (shadowWidget) {
                            additionalUpdates.push({
                                id: shadowWidget.id,
                                props: { ...(shadowWidget.props || {}), radius: propUpdates.radius }
                            });
                        }
                    }
                }
            }
        });

        // Apply shadow sync updates
        additionalUpdates.forEach(update => {
            this.app.project.updateWidget(update.id, { props: update.props });
        });

        emit(EVENTS.STATE_CHANGED);
    }

    /**
     * @param {string | null | undefined} id
     */
    deleteWidget(id) {
        const ids = id ? [id] : this.normalizeWidgetIds(this.app.editor.selectedWidgetIds);

        // If any selected ID is a group, we should potentially handle children
        const allIdsToDelete = [...ids];
        ids.forEach(targetId => {
            const widget = this.app.getWidgetById(targetId);
            if (widget && widget.type === 'group') {
                const children = this.app.pages[this.app.currentPageIndex].widgets.filter((/** @type {Widget} */ w) => w.parentId === targetId);
                children.forEach((/** @type {Widget} */ c) => allIdsToDelete.push(c.id));
            }
        });

        this.app.project.deleteWidgets([...new Set(allIdsToDelete)]);
        this.app.editor.setSelectedWidgetIds([]);
        this.app.recordHistory();
        emit(EVENTS.STATE_CHANGED);
    }

    /**
     * @param {string} widgetId
     * @param {number} targetPageIndex
     * @param {number | null} [x]
     * @param {number | null} [y]
     * @returns {boolean}
     */
    moveWidgetToPage(widgetId, targetPageIndex, x = null, y = null) {
        const widget = this.app.getWidgetById(widgetId);
        if (!widget) return false;

        const sourcePage = this.app.getCurrentPage();
        const targetPage = this.app.pages[targetPageIndex];
        if (!sourcePage || !targetPage) return false;

        // Collect all widgets to move (widget + group children when moving a group)
        const widgetsToMove = [widget];
        if (widget.type === 'group') {
            const children = sourcePage.widgets.filter((/** @type {Widget} */ w) => w.parentId === widgetId);
            widgetsToMove.push(...children);
        }

        // Calculate position delta so children maintain relative placement
        const dx = (x !== null) ? x - widget.x : 0;
        const dy = (y !== null) ? y - widget.y : 0;

        // Remove all moved widgets from source
        const idsToMove = new Set(widgetsToMove.map((/** @type {Widget} */ w) => w.id));
        sourcePage.widgets = sourcePage.widgets.filter((/** @type {Widget} */ w) => !idsToMove.has(w.id));

        // Add cloned widgets to target
        widgetsToMove.forEach((/** @type {Widget} */ w) => {
            const cloned = JSON.parse(JSON.stringify(w));
            if (w.id === widgetId) {
                if (x !== null) cloned.x = x;
                if (y !== null) cloned.y = y;
            } else {
                cloned.x += dx;
                cloned.y += dy;
            }
            targetPage.widgets.push(cloned);
        });

        this.app.project.rebuildWidgetsIndex();
        this.app.recordHistory();
        emit(EVENTS.STATE_CHANGED);
        return true;
    }

    /**
     * @param {string | null | undefined} id
     */
    copyWidget(id) {
        const targetIds = id ? [id] : this.normalizeWidgetIds(this.app.editor.selectedWidgetIds);
        const widgets = targetIds
            .map((widgetId) => this.app.getWidgetById(widgetId))
            .filter((/** @type {Widget | null | undefined} */ w) => !!w);
        if (widgets.length > 0) {
            this.app.editor.copyWidgets(widgets);
        }
    }

    pasteWidget() {
        const editorAny = /** @type {any} */ (this.app.editor);
        const clipboard = /** @type {Widget[] | null | undefined} */ (editorAny.clipboardWidgets);
        if (!clipboard || clipboard.length === 0) return;

        const newWidgets = clipboard.map((/** @type {Widget} */ w) => {
            const pasted = JSON.parse(JSON.stringify(w)); // Deep clone
            pasted.id = generateId();
            pasted.x += 10;
            pasted.y += 10;
            return pasted;
        });

        newWidgets.forEach((/** @type {Widget} */ w) => {
            this.checkRenderingModeForWidget(w);
            this.app.project.addWidget(w);
        });
        editorAny.setSelectedWidgetIds(newWidgets.map(w => w.id));
        this.app.recordHistory();
        emit(EVENTS.STATE_CHANGED);
    }

    /**
     * @param {string | string[]} widgetIdOrIds
     */
    createDropShadow(widgetIdOrIds) {
        const ids = Array.isArray(widgetIdOrIds) ? widgetIdOrIds : [widgetIdOrIds];
        if (ids.length === 0) return;

        // Determine effective dark mode once for the batch
        const page = this.app.project.getCurrentPage();
        if (!page || !page.widgets) return;
        const pageDarkMode = page ? page.dark_mode : undefined;
        let isDark = false;
        if (pageDarkMode === "dark") isDark = true;
        else if (pageDarkMode === "light") isDark = false;
        else isDark = !!this.app.settings.dark_mode;

        // Colors for shadow and fills
        const shadowColor = isDark ? "white" : "black";
        const fillColor = isDark ? "black" : "white";
        const defaultForeground = isDark ? "white" : "black";

        /** @type {string[]} */
        const newGroupIds = [];

        ids.forEach(id => {
            const widget = this.app.getWidgetById(id);
            if (!widget) return;

            // 1. Dynamic Shape Detection
            const radius = parseInt(widget.props?.border_radius || widget.props?.radius || widget.props?.corner_radius || 0, 10);
            let shadowType = "shape_rect";

            if (widget.type === "shape_circle" || widget.type === "circle") {
                shadowType = "shape_circle";
            } else if (radius > 0) {
                shadowType = "rounded_rect";
            }

            // 2. Create Shadow Widget
            const shadow = /** @type {any} */ ({
                id: generateId(),
                type: shadowType,
                x: (widget.x || 0) + 5,
                y: (widget.y || 0) + 5,
                width: widget.width,
                height: widget.height,
                props: {
                    name: (widget.props?.name || widget.type) + " Shadow",
                    color: shadowColor,
                    background_color: shadowColor,
                    bg_color: shadowColor,
                    fill: true,
                }
            });

            // Add radius for rounded rects
            if (shadowType === "rounded_rect") {
                shadow.props.radius = radius;
            }

            this.app.project.addWidget(shadow);

            // 3. Modify Original Widget (Apply fill so it blocks the shadow behind it)
            if (!widget.props) widget.props = {};

            // Determine if this is a "shape" widget vs a "content" widget
            const isPureShape = ["shape_rect", "rounded_rect", "shape_circle", "rectangle", "rrect", "circle"].includes(widget.type);

            // Preserve original border color (if it was using 'color' property)
            const originalColor = (widget.props.color && widget.props.color !== 'theme_auto')
                ? widget.props.color
                : defaultForeground;
            if (!widget.props.border_color || widget.props.border_color === 'theme_auto') {
                widget.props.border_color = originalColor;
            }

            // Apply Infill to original
            widget.props.fill = true;
            widget.props.background_color = fillColor;
            widget.props.bg_color = fillColor;

            // If it's a pure shape, the main 'color' IS the fill color
            if (isPureShape) {
                widget.props.color = fillColor;
            }

            // EXPLICIT UPDATE: Ensure the project store knows the original widget changed
            this.app.project.updateWidget(id, { props: { ...widget.props } });

            // 4. Reorder Logic (Shadow behind Widget)
            const currentOriginalIndex = page.widgets.findIndex((/** @type {Widget} */ w) => w.id === id);
            const currentShadowIndex = page.widgets.findIndex((/** @type {Widget} */ w) => w.id === shadow.id);

            if (currentOriginalIndex !== -1 && currentShadowIndex !== -1) {
                this.app.project.reorderWidget(this.app.project.currentPageIndex, currentShadowIndex, currentOriginalIndex);
            }

            // 5. Create Group for this pair
            const groupId = "group_" + generateId();
            const minX = Math.min(widget.x, shadow.x);
            const minY = Math.min(widget.y, shadow.y);
            const maxX = Math.max(widget.x + widget.width, shadow.x + shadow.width);
            const maxY = Math.max(widget.y + widget.height, shadow.y + shadow.height);

            const group = {
                id: groupId,
                type: 'group',
                title: widget.props?.name ? `${widget.props.name} Group` : 'Shadow Group',
                x: minX,
                y: minY,
                width: maxX - minX,
                height: maxY - minY,
                props: {},
                expanded: true
            };

            this.app.project.addWidget(group);

            // Assign members
            this.app.project.updateWidget(shadow.id, { parentId: groupId });
            this.app.project.updateWidget(widget.id, { parentId: groupId });

            newGroupIds.push(groupId);
        });

        // 6. Select the new group(s)
        if (newGroupIds.length > 0) {
            this.app.selectWidgets(newGroupIds);
        }

        this.syncWidgetOrderWithHierarchy();
        this.app.recordHistory();
        emit(EVENTS.STATE_CHANGED);
    }

    /**
     * Synchronizes the flat widgets array with the hierarchy tree.
     */
    syncWidgetOrderWithHierarchy() {
        const page = this.app.getCurrentPage();
        if (!page || !page.widgets) return;

        const widgets = [...page.widgets];

        // Find top level widgets (those with no parentId)
        const topLevel = widgets.filter((/** @type {Widget} */ w) => !w.parentId);

        // Build children map
        /** @type {Map<string, Widget[]>} */
        const childrenMap = new Map();
        widgets.forEach((/** @type {Widget} */ w) => {
            if (w.parentId) {
                if (!childrenMap.has(w.parentId)) childrenMap.set(w.parentId, []);
                const children = childrenMap.get(w.parentId);
                if (children) children.push(w);
            }
        });

        /** @type {Widget[]} */
        const sorted = [];
        /** @param {Widget} widget */
        const processRecursive = (widget) => {
            sorted.push(widget);
            const children = /** @type {Widget[] | undefined} */ (childrenMap.get(widget.id));
            if (children) {
                // Keep relative order of siblings as they were in the original array
                children.sort((a, b) => widgets.indexOf(a) - widgets.indexOf(b));
                children.forEach(processRecursive);
            }
        };

        topLevel.forEach(processRecursive);

        // Update the project's widget array
        page.widgets = sorted;
        this.app.project.rebuildWidgetsIndex();
    }

    /**
     * Synchronizes widget visibility based on the current rendering mode.
     */
    syncWidgetVisibilityWithMode() {
        const mode = this.app.preferences.state.renderingMode || 'direct';
        Logger.log(`[AppState] Syncing widget visibility for mode: ${mode}`);

        let changeCount = 0;
        this.app.project.pages.forEach((/** @type {any} */ page) => {
            page.widgets.forEach((/** @type {Widget} */ w) => {
                const isCompatible = this.isWidgetCompatibleWithMode(w, mode);

                if (!isCompatible && !w.hidden) {
                    w.hidden = true;
                    changeCount++;
                } else if (isCompatible && w.hidden) {
                    w.hidden = false;
                    changeCount++;
                }
            });
        });

        if (changeCount > 0) {
            Logger.log(`[AppState] Updated ${changeCount} widgets due to mode switch.`);
            this.app.project.rebuildWidgetsIndex();
            emit(EVENTS.STATE_CHANGED);
        }
    }

    /**
     * Internal check for widget compatibility.
     * @param {Widget} w
     * @param {string} mode
     * @returns {boolean}
     */
    isWidgetCompatibleWithMode(w, mode) {
        const plugin = registry.get(w.type);
        if (!plugin) return true;

        if (mode === 'oepl') return !!plugin.exportOEPL;
        if (mode === 'opendisplay') return !!plugin.exportOpenDisplay;
        if (mode === 'lvgl') {
            const isNativeLVGL = w.type && w.type.startsWith('lvgl_');
            const hasLVGLExport = typeof plugin.exportLVGL === 'function';
            return isNativeLVGL || hasLVGLExport;
        }
        if (mode === 'direct') {
            const isProtocolSpecific = w.type && (w.type.startsWith('lvgl_') || w.type.startsWith('oepl_'));
            return !!plugin.export && !isProtocolSpecific;
        }

        return true;
    }

    /**
     * Internal check to switch rendering mode if a specific widget is added.
     * @param {Widget | null | undefined} w
     */
    checkRenderingModeForWidget(w) {
        if (!w || !w.type) return;

        const currentMode = this.app.preferences.state.renderingMode || 'direct';

        const isLvglWidget = w.type.startsWith('lvgl_');
        const isOEPLWidget = w.type.startsWith('oepl_');
        const isODPWidget = w.type.startsWith('odp_') || w.type.startsWith('opendisplay_');

        if (isLvglWidget && currentMode === 'direct') {
            this.app.updateSettings({ renderingMode: 'lvgl' });
            Logger.log(`[AppState] Auto-switched to LVGL rendering mode because an LVGL widget (${w.type}) was added.`);
            showToast("Auto-switched to LVGL rendering mode", "info");
        } else if (isOEPLWidget && currentMode !== 'oepl') {
            this.app.updateSettings({ renderingMode: 'oepl' });
            Logger.log(`[AppState] Auto-switched to OEPL rendering mode because an OEPL widget (${w.type}) was added.`);
            showToast("Auto-switched to OEPL mode", "info");
        } else if (isODPWidget && currentMode !== 'opendisplay') {
            this.app.updateSettings({ renderingMode: 'opendisplay' });
            Logger.log(`[AppState] Auto-switched to OpenDisplay (ODP) mode because an ODP widget (${w.type}) was added.`);
            showToast("Auto-switched to ODP mode", "info");
        }
    }
}
