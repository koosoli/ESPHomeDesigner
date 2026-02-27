import { generateId } from '../../../utils/helpers.js';
import { emit, EVENTS } from '../../events.js';
import { Logger } from '../../../utils/logger.js';
import { showToast } from '../../../utils/dom.js';
import { registry } from '../../plugin_registry';

export class WidgetManager {
    constructor(app) {
        /** @type {import('../index.js').AppStateFacade} */
        this.app = app;
    }

    setCustomHardware(config) {
        this.app.project.state.customHardware = config;
        emit(EVENTS.STATE_CHANGED);
        // Trigger canvas refocus when custom hardware (resolution) changes
        emit(EVENTS.PAGE_CHANGED, { index: this.app.currentPageIndex, forceFocus: true });
    }

    /**
     * @param {import('../../../types.js').WidgetConfig} w 
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
     * @param {Partial<import('../../../types.js').WidgetConfig>} u 
     */
    updateWidget(id, u) {
        this.app.project.updateWidget(id, u);

        // Recursive propagation for certain properties if it's a group
        const widget = this.app.getWidgetById(id);
        if (widget && widget.type === 'group') {
            const propsToPropagate = ['locked', 'hidden'];
            const childUpdates = {};
            propsToPropagate.forEach(p => {
                if (u[p] !== undefined) childUpdates[p] = u[p];
            });

            if (Object.keys(childUpdates).length > 0) {
                const page = this.app.pages[this.app.currentPageIndex];
                if (page && page.widgets) {
                    const children = page.widgets.filter(w => w.parentId === id);
                    children.forEach(c => this.updateWidget(c.id, childUpdates));
                }
            }
        }

        if (u.parentId !== undefined) {
            this.syncWidgetOrderWithHierarchy();
        }

        emit(EVENTS.STATE_CHANGED);
    }

    updateWidgets(ids, u) {
        ids.forEach(id => this.app.project.updateWidget(id, u));
        emit(EVENTS.STATE_CHANGED);
    }

    updateWidgetsProps(ids, propUpdates) {
        ids.forEach(id => {
            const widget = this.app.getWidgetById(id);
            if (widget) {
                const newProps = { ...(widget.props || {}), ...propUpdates };
                this.app.project.updateWidget(id, { props: newProps });
            }
        });
        emit(EVENTS.STATE_CHANGED);
    }

    deleteWidget(id) {
        const ids = id ? [id] : [...this.app.editor.selectedWidgetIds];

        // If any selected ID is a group, we should potentially handle children
        const allIdsToDelete = [...ids];
        ids.forEach(targetId => {
            const widget = this.app.getWidgetById(targetId);
            if (widget && widget.type === 'group') {
                const children = this.app.pages[this.app.currentPageIndex].widgets.filter(w => w.parentId === targetId);
                children.forEach(c => allIdsToDelete.push(c.id));
            }
        });

        this.app.project.deleteWidgets([...new Set(allIdsToDelete)]);
        this.app.editor.setSelectedWidgetIds([]);
        this.app.recordHistory();
        emit(EVENTS.STATE_CHANGED);
    }

    moveWidgetToPage(widgetId, targetPageIndex, x = null, y = null) {
        const widget = this.app.getWidgetById(widgetId);
        if (!widget) return;

        const sourcePage = this.app.getCurrentPage();
        const targetPage = this.app.pages[targetPageIndex];
        if (!sourcePage || !targetPage) return;

        // Remove from source
        sourcePage.widgets = sourcePage.widgets.filter(w => w.id !== widgetId);

        // Add to target
        const cloned = JSON.parse(JSON.stringify(widget));
        if (x !== null) cloned.x = x;
        if (y !== null) cloned.y = y;
        targetPage.widgets.push(cloned);

        this.app.project.rebuildWidgetsIndex();
        this.app.recordHistory();
        emit(EVENTS.STATE_CHANGED);
    }

    copyWidget(id) {
        const targetIds = id ? [id] : this.app.editor.selectedWidgetIds;
        const widgets = targetIds.map(id => this.app.getWidgetById(id)).filter(w => !!w);
        if (widgets.length > 0) {
            this.app.editor.copyWidgets(widgets);
        }
    }

    pasteWidget() {
        const clipboard = this.app.editor.clipboardWidgets;
        if (!clipboard || clipboard.length === 0) return;

        const newWidgets = clipboard.map(w => {
            const pasted = JSON.parse(JSON.stringify(w)); // Deep clone
            pasted.id = generateId();
            pasted.x += 10;
            pasted.y += 10;
            return pasted;
        });

        newWidgets.forEach(w => {
            this.checkRenderingModeForWidget(w);
            this.app.project.addWidget(w);
        });
        this.app.editor.setSelectedWidgetIds(newWidgets.map(w => w.id));
        this.app.recordHistory();
        emit(EVENTS.STATE_CHANGED);
    }

    createDropShadow(widgetIdOrIds) {
        const ids = Array.isArray(widgetIdOrIds) ? widgetIdOrIds : [widgetIdOrIds];
        if (ids.length === 0) return;

        // Determine effective dark mode once for the batch
        const page = this.app.project.getCurrentPage();
        const pageDarkMode = page ? page.dark_mode : undefined;
        let isDark = false;
        if (pageDarkMode === "dark") isDark = true;
        else if (pageDarkMode === "light") isDark = false;
        else isDark = !!this.app.settings.dark_mode;

        // Colors for shadow and fills
        const shadowColor = isDark ? "white" : "black";
        const fillColor = isDark ? "black" : "white";
        const defaultForeground = isDark ? "white" : "black";

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
            const shadow = {
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
            };

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
            const originalColor = widget.props.color || defaultForeground;
            if (!widget.props.border_color) {
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
            const currentOriginalIndex = page.widgets.findIndex(w => w.id === id);
            const currentShadowIndex = page.widgets.findIndex(w => w.id === shadow.id);

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
        const topLevel = widgets.filter(w => !w.parentId);

        // Build children map
        const childrenMap = new Map();
        widgets.forEach(w => {
            if (w.parentId) {
                if (!childrenMap.has(w.parentId)) childrenMap.set(w.parentId, []);
                childrenMap.get(w.parentId).push(w);
            }
        });

        const sorted = [];
        const processRecursive = (widget) => {
            sorted.push(widget);
            const children = childrenMap.get(widget.id);
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
        this.app.project.pages.forEach(page => {
            page.widgets.forEach(w => {
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
