import { ProjectStore } from './project_store.js';
import { EditorStore } from './editor_store.js';
import { PreferencesStore } from './preferences_store.js';
import { SecretsStore } from './secrets_store.js';
import { emit, EVENTS, on } from '../events.js';
import { Logger } from '../../utils/logger.js';
import { hasHaBackend } from '../../utils/env.js';
import { generateId } from '../../utils/helpers.js';
import { showToast } from '../../utils/dom.js';
import { DEVICE_PROFILES } from '../../io/devices.js';

class AppStateFacade {
    constructor() {
        this.project = new ProjectStore();
        this.editor = new EditorStore();
        this.preferences = new PreferencesStore();
        this.secrets = new SecretsStore();

        // Guard flag to prevent history recording during undo/redo
        this._isRestoringHistory = false;

        this.recordHistory();

        // Mode Compatibility Sync
        on(EVENTS.SETTINGS_CHANGED, (settings) => {
            if (settings && settings.renderingMode !== undefined) {
                this.syncWidgetVisibilityWithMode();
            }
        });
    }

    reset() {
        this.project.reset();
        this.editor.state.selectedWidgetIds = [];
        this.recordHistory();
    }

    // --- Geters ---
    get pages() { return this.project.pages; }
    get currentPageIndex() { return this.project.currentPageIndex; }
    get selectedWidgetId() { return this.editor.selectedWidgetIds[0] || null; }
    get selectedWidgetIds() { return this.editor.selectedWidgetIds; }
    get settings() {
        return {
            ...this.preferences.state,
            device_name: this.project.deviceName,
            deviceName: this.project.deviceName,
            device_model: this.project.deviceModel,
            deviceModel: this.project.deviceModel,
            customHardware: this.project.customHardware,
            custom_hardware: this.project.customHardware,
            protocolHardware: this.project.protocolHardware,
            protocol_hardware: this.project.protocolHardware,
            ...this.secrets.keys
        };
    }
    get deviceName() { return this.project.deviceName; }
    get deviceModel() { return this.project.deviceModel; }
    get currentLayoutId() { return this.project.currentLayoutId; }
    get snapEnabled() { return this.preferences.snapEnabled; }
    get showGrid() { return this.preferences.showGrid; }
    get showDebugGrid() { return this.preferences.showDebugGrid; }
    get showRulers() { return this.preferences.showRulers; }
    get zoomLevel() { return this.editor.zoomLevel; }

    getCurrentPage() { return this.project.getCurrentPage(); }
    getWidgetById(id) { return this.project.getWidgetById(id); }
    getSelectedWidget() { return this.project.getWidgetById(this.editor.selectedWidgetIds[0]); }
    getSelectedWidgets() { return this.editor.selectedWidgetIds.map(id => this.getWidgetById(id)).filter(w => !!w); }

    getSelectedProfile() {
        return DEVICE_PROFILES[this.project.deviceModel] || null;
    }

    getCanvasDimensions() {
        const mode = this.preferences.state.renderingMode || 'direct';
        if (mode === 'oepl' || mode === 'opendisplay') {
            const ph = this.project.protocolHardware;
            const orientation = this.preferences.state.orientation;
            if (orientation === 'portrait') {
                return { width: Math.min(ph.width, ph.height), height: Math.max(ph.width, ph.height) };
            }
            return { width: Math.max(ph.width, ph.height), height: Math.min(ph.width, ph.height) };
        }
        return this.project.getCanvasDimensions(this.preferences.state.orientation);
    }

    getCanvasShape() {
        return this.project.getCanvasShape();
    }

    getPagesPayload() {
        const payload = {
            ...this.project.getPagesPayload(),
            currentPageIndex: this.currentPageIndex,
            ...this.settings
        };
        // Ensure snake_case for HA compatibility
        payload.device_model = this.project.deviceModel;
        payload.custom_hardware = this.project.customHardware;
        payload.protocol_hardware = this.project.protocolHardware;
        return payload;
    }

    getSettings() { return this.settings; }
    setSettings(s) { this.updateSettings(s); }

    updateProtocolHardware(updates) {
        Object.assign(this.project.state.protocolHardware, updates);
        emit(EVENTS.SETTINGS_CHANGED);
    }

    // --- Persistence ---
    saveToLocalStorage() {
        if (!hasHaBackend()) {
            const payload = this.getPagesPayload();
            console.log('[saveToLocalStorage] DEBUG renderingMode being saved:', payload.renderingMode);
            localStorage.setItem('esphome-designer-layout', JSON.stringify(payload));
        }
    }

    loadFromLocalStorage() {
        try {
            const data = localStorage.getItem('esphome-designer-layout');
            const parsed = data ? JSON.parse(data) : null;
            console.log('[loadFromLocalStorage] DEBUG raw data exists:', !!data);
            console.log('[loadFromLocalStorage] DEBUG parsed renderingMode:', parsed?.renderingMode);
            console.log('[loadFromLocalStorage] DEBUG parsed rendering_mode:', parsed?.rendering_mode);
            return parsed;
        } catch (e) {
            console.error('[loadFromLocalStorage] Parse error:', e);
            return null;
        }
    }

    // --- Actions ---
    setPages(pages) {
        this.project.setPages(pages);
        this.recordHistory();
        emit(EVENTS.STATE_CHANGED);
    }

    reorderWidget(pageIndex, fromIndex, toIndex) {
        this.project.reorderWidget(pageIndex, fromIndex, toIndex);
        this.syncWidgetOrderWithHierarchy();
        this.recordHistory();
        emit(EVENTS.STATE_CHANGED);
    }

    setCurrentPageIndex(index, options = {}) {
        this.project.setCurrentPageIndex(index, options);
        this.editor.setSelectedWidgetIds([]);
        emit(EVENTS.STATE_CHANGED);
    }

    reorderPage(fromIndex, toIndex) {
        this.project.reorderPage(fromIndex, toIndex);
        this.recordHistory();
    }

    addPage(atIndex = null) {
        const page = this.project.addPage(atIndex);
        this.recordHistory();
        return page;
    }

    deletePage(index) {
        this.project.deletePage(index);
        this.recordHistory();
    }

    selectWidget(id, multi) {
        if (!id) {
            this.editor.selectWidget(null, multi);
            return;
        }

        const widget = this.getWidgetById(id);
        const groupId = widget?.parentId || (widget?.type === 'group' ? widget.id : null);

        // If it's part of a group, select the whole group
        if (groupId) {
            const page = this.pages[this.currentPageIndex];
            const groupMembers = page.widgets.filter(w => w.parentId === groupId || w.id === groupId);
            const memberIds = groupMembers.map(w => w.id);

            if (multi) {
                // If any member is already selected, we might want to toggle the whole group?
                // Standard behavior: if any is selected, deselect all. Otherwise select all.
                const anySelected = memberIds.some(mid => this.editor.selectedWidgetIds.includes(mid));
                if (anySelected) {
                    const remainingIds = this.editor.selectedWidgetIds.filter(mid => !memberIds.includes(mid));
                    this.editor.setSelectedWidgetIds(remainingIds);
                } else {
                    this.editor.setSelectedWidgetIds([...new Set([...this.editor.selectedWidgetIds, ...memberIds])]);
                }
            } else {
                this.editor.setSelectedWidgetIds(memberIds);
            }
        } else {
            this.editor.selectWidget(id, multi);
        }
    }
    selectWidgets(ids) { this.editor.setSelectedWidgetIds(ids); }

    selectAllWidgets() {
        const page = this.getCurrentPage();
        if (!page || !page.widgets) return;
        const ids = page.widgets.map(w => w.id);
        this.selectWidgets(ids);
    }

    updateSettings(newSettings) {
        // DEBUG: Track renderingMode changes
        if (newSettings.renderingMode !== undefined) {
            console.log('[updateSettings] DEBUG renderingMode changing to:', newSettings.renderingMode);
            console.trace('[updateSettings] Call stack');
        }

        const secretUpdates = {};
        const prefUpdates = {};

        Object.keys(newSettings).forEach(key => {
            if (key.startsWith('ai_api_key_')) secretUpdates[key] = newSettings[key];
            else prefUpdates[key] = newSettings[key];
        });

        if (Object.keys(secretUpdates).length) {
            Object.entries(secretUpdates).forEach(([k, v]) => this.secrets.set(k, v));
        }

        this.preferences.update(prefUpdates);

        if (newSettings.device_name) this.project.state.deviceName = newSettings.device_name;
        if (newSettings.device_model) this.project.state.deviceModel = newSettings.device_model;

        emit(EVENTS.STATE_CHANGED);
    }

    setDeviceName(name) {
        this.project.state.deviceName = name;
        this.updateLayoutIndicator();
        emit(EVENTS.STATE_CHANGED);
    }
    setDeviceModel(model) {
        this.project.state.deviceModel = model;
        this.updateLayoutIndicator();
        emit(EVENTS.STATE_CHANGED);
    }
    setCurrentLayoutId(id) {
        this.project.state.currentLayoutId = id;
        this.updateLayoutIndicator();
        emit(EVENTS.STATE_CHANGED);
    }

    updateLayoutIndicator() {
        const nameEl = document.getElementById('currentLayoutName');
        if (nameEl) nameEl.textContent = this.project.deviceName || this.project.currentLayoutId || "Unknown";
    }

    setSnapEnabled(e) { this.preferences.setSnapEnabled(e); }
    setShowGrid(e) { this.preferences.setShowGrid(e); }
    setShowDebugGrid(e) { this.preferences.setShowDebugGrid(e); }
    setShowRulers(e) { this.preferences.setShowRulers(e); }
    setZoomLevel(l) { this.editor.setZoomLevel(l); }

    // --- Widget Ops ---
    setCustomHardware(config) {
        this.project.state.customHardware = config;
        emit(EVENTS.STATE_CHANGED);
    }

    addWidget(w, pageIndex = null) {
        this._checkRenderingModeForWidget(w);
        this.project.addWidget(w, pageIndex);
        this.recordHistory();
        this.selectWidget(w.id);
        emit(EVENTS.STATE_CHANGED);
    }
    updateWidget(id, u) {
        this.project.updateWidget(id, u);

        // Recursive propagation for certain properties if it's a group
        const widget = this.getWidgetById(id);
        if (widget && widget.type === 'group') {
            const propsToPropagate = ['locked', 'hidden'];
            const childUpdates = {};
            propsToPropagate.forEach(p => {
                if (u[p] !== undefined) childUpdates[p] = u[p];
            });

            if (Object.keys(childUpdates).length > 0) {
                const page = this.pages[this.currentPageIndex];
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
        ids.forEach(id => this.project.updateWidget(id, u));
        emit(EVENTS.STATE_CHANGED);
    }
    deleteWidget(id) {
        const ids = id ? [id] : [...this.editor.selectedWidgetIds];

        // If any selected ID is a group, we should potentially handle children
        // For simplicity now, we just delete everything selected.
        // But we should find all children of these groups and delete them too.
        const allIdsToDelete = [...ids];
        ids.forEach(targetId => {
            const widget = this.getWidgetById(targetId);
            if (widget && widget.type === 'group') {
                const children = this.pages[this.currentPageIndex].widgets.filter(w => w.parentId === targetId);
                children.forEach(c => allIdsToDelete.push(c.id));
            }
        });

        this.project.deleteWidgets([...new Set(allIdsToDelete)]);
        this.editor.setSelectedWidgetIds([]);
        this.recordHistory();
        emit(EVENTS.STATE_CHANGED);
    }

    groupSelection() {
        const selectedIds = this.editor.selectedWidgetIds;
        const widgets = this.getSelectedWidgets();

        // Safety check: Cannot group if it includes existing groups/members
        const hasExistingGroup = widgets.some(w => w.type === 'group' || w.parentId);
        if (selectedIds.length < 2 || hasExistingGroup) return;
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

        widgets.forEach(w => {
            minX = Math.min(minX, w.x);
            minY = Math.min(minY, w.y);
            maxX = Math.max(maxX, w.x + (w.width || 0));
            maxY = Math.max(maxY, w.y + (w.height || 0));
        });

        const groupId = "group_" + generateId();
        const groupWidget = {
            id: groupId,
            type: 'group',
            title: 'Group',
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY,
            props: {},
            expanded: true // For hierarchy view
        };

        // Add group widget
        this.project.addWidget(groupWidget);

        // Assign parentId to children and make coordinates relative? 
        // Actually, let's keep coordinates absolute for now to avoid breaking existing canvas logic,
        // but mark them as part of the group.
        widgets.forEach(w => {
            this.project.updateWidget(w.id, { parentId: groupId });
        });

        this.selectWidget(groupId);
        this.syncWidgetOrderWithHierarchy();
        this.recordHistory();
        emit(EVENTS.STATE_CHANGED);
    }

    ungroupSelection(idOrIds = null) {
        let targets = [];
        if (idOrIds) {
            targets = Array.isArray(idOrIds) ? idOrIds : [idOrIds];
        } else {
            const selected = this.getSelectedWidgets();
            const foundIds = new Set();
            selected.forEach(w => {
                if (w.type === 'group') foundIds.add(w.id);
                else if (w.parentId) foundIds.add(w.parentId);
            });
            targets = [...foundIds];
        }

        const groupIds = new Set();
        targets.forEach(id => {
            const w = this.getWidgetById(id);
            if (!w) return;
            if (w.type === 'group') groupIds.add(w.id);
            else if (w.parentId) groupIds.add(w.parentId);
        });

        const idsToProcess = [...groupIds];
        if (idsToProcess.length === 0) return;

        const allChildren = [];
        idsToProcess.forEach(groupId => {
            const group = this.getWidgetById(groupId);
            if (!group || group.type !== 'group') return;

            const page = this.pages[this.currentPageIndex];
            const children = page.widgets.filter(w => w.parentId === groupId);

            children.forEach(c => {
                this.project.updateWidget(c.id, { parentId: null });
                allChildren.push(c.id);
            });
        });

        // Ensure we delete the groups themselves - both from index and array
        this.project.deleteWidgets(idsToProcess);

        // Safety: Manually filter them out of the current page as well
        const currentPage = this.pages[this.currentPageIndex];
        if (currentPage && currentPage.widgets) {
            currentPage.widgets = currentPage.widgets.filter(w => !idsToProcess.includes(w.id));
        }

        if (allChildren.length > 0) {
            this.selectWidgets(allChildren);
        }

        this.syncWidgetOrderWithHierarchy();
        this.recordHistory();
        emit(EVENTS.STATE_CHANGED);
    }

    /**
     * Aligns selected widgets in a specific direction.
     * @param {'left'|'center'|'right'|'top'|'middle'|'bottom'} direction
     */
    alignSelectedWidgets(direction) {
        const widgets = this.getSelectedWidgets();
        if (widgets.length < 2) return;

        let targetVal;
        switch (direction) {
            case 'left':
                targetVal = Math.min(...widgets.map(w => w.x));
                widgets.forEach(w => this.project.updateWidget(w.id, { x: targetVal }));
                break;
            case 'right':
                targetVal = Math.max(...widgets.map(w => w.x + (w.width || 0)));
                widgets.forEach(w => this.project.updateWidget(w.id, { x: targetVal - (w.width || 0) }));
                break;
            case 'center':
                const centers = widgets.map(w => w.x + (w.width || 0) / 2);
                targetVal = centers.reduce((a, b) => a + b, 0) / centers.length;
                widgets.forEach(w => this.project.updateWidget(w.id, { x: targetVal - (w.width || 0) / 2 }));
                break;
            case 'top':
                targetVal = Math.min(...widgets.map(w => w.y));
                widgets.forEach(w => this.project.updateWidget(w.id, { y: targetVal }));
                break;
            case 'bottom':
                targetVal = Math.max(...widgets.map(w => w.y + (w.height || 0)));
                widgets.forEach(w => this.project.updateWidget(w.id, { y: targetVal - (w.height || 0) }));
                break;
            case 'middle':
                const middles = widgets.map(w => w.y + (w.height || 0) / 2);
                targetVal = middles.reduce((a, b) => a + b, 0) / middles.length;
                widgets.forEach(w => this.project.updateWidget(w.id, { y: targetVal - (w.height || 0) / 2 }));
                break;
        }

        this.recordHistory();
        emit(EVENTS.STATE_CHANGED);
    }

    /**
     * Distributes selected widgets evenly along an axis.
     * @param {'horizontal'|'vertical'} axis
     */
    distributeSelectedWidgets(axis) {
        const widgets = [...this.getSelectedWidgets()];
        if (widgets.length < 3) return;

        if (axis === 'horizontal') {
            widgets.sort((a, b) => a.x - b.x);
            const first = widgets[0];
            const last = widgets[widgets.length - 1];
            const totalWidth = widgets.reduce((sum, w) => sum + (w.width || 0), 0);
            const totalSpan = (last.x + (last.width || 0)) - first.x;
            const totalGap = totalSpan - totalWidth;
            const gap = totalGap / (widgets.length - 1);

            let currentX = first.x;
            for (let i = 0; i < widgets.length; i++) {
                this.project.updateWidget(widgets[i].id, { x: Math.round(currentX) });
                currentX += (widgets[i].width || 0) + gap;
            }
        } else {
            widgets.sort((a, b) => a.y - b.y);
            const first = widgets[0];
            const last = widgets[widgets.length - 1];
            const totalHeight = widgets.reduce((sum, w) => sum + (w.height || 0), 0);
            const totalSpan = (last.y + (last.height || 0)) - first.y;
            const totalGap = totalSpan - totalHeight;
            const gap = totalGap / (widgets.length - 1);

            let currentY = first.y;
            for (let i = 0; i < widgets.length; i++) {
                this.project.updateWidget(widgets[i].id, { y: Math.round(currentY) });
                currentY += (widgets[i].height || 0) + gap;
            }
        }

        this.recordHistory();
        emit(EVENTS.STATE_CHANGED);
    }

    moveWidgetToPage(widgetId, targetPageIndex, x = null, y = null) {
        const success = this.project.moveWidgetToPage(widgetId, targetPageIndex, x, y);
        if (success) {
            this.syncWidgetOrderWithHierarchy();
            this.recordHistory();
            emit(EVENTS.STATE_CHANGED);
        }
        return success;
    }

    clearCurrentPage(preserveLocked = false) {
        const result = this.project.clearCurrentPage(preserveLocked);
        if (result.deleted > 0) {
            this.editor.setSelectedWidgetIds([]);
            this.recordHistory();
            emit(EVENTS.STATE_CHANGED);
        }
        return result;
    }

    copyWidget(id) {
        const targetIds = id ? [id] : this.editor.selectedWidgetIds;
        const widgets = targetIds.map(id => this.getWidgetById(id)).filter(w => !!w);
        if (widgets.length > 0) {
            this.editor.copyWidgets(widgets);
        }
    }

    pasteWidget() {
        const clipboard = this.editor.clipboardWidgets;
        if (!clipboard || clipboard.length === 0) return;

        const newWidgets = clipboard.map(w => {
            const pasted = JSON.parse(JSON.stringify(w)); // Deep clone
            pasted.id = generateId();
            pasted.x += 10;
            pasted.y += 10;
            return pasted;
        });

        newWidgets.forEach(w => {
            this._checkRenderingModeForWidget(w);
            this.project.addWidget(w);
        });
        this.editor.setSelectedWidgetIds(newWidgets.map(w => w.id));
        this.recordHistory();
        emit(EVENTS.STATE_CHANGED);
    }

    createDropShadow(widgetId) {
        const widget = this.getWidgetById(widgetId);
        if (!widget) return;

        // 1. Create Shadow
        const shadow = JSON.parse(JSON.stringify(widget));
        shadow.id = generateId();
        shadow.x = (shadow.x || 0) + 5;
        shadow.y = (shadow.y || 0) + 5;

        if (!shadow.props) shadow.props = {};

        // Determine effective dark mode first (needed for both shadow and original)
        const page = this.project.getCurrentPage();
        const pageDarkMode = page ? page.dark_mode : undefined;
        let isDark = false;
        if (pageDarkMode === "dark") isDark = true;
        else if (pageDarkMode === "light") isDark = false;
        else isDark = !!this.settings.dark_mode;

        // Shadow color: Black in light mode, White in dark mode
        const shadowColor = isDark ? "white" : "black";

        // Configure Shadow: Solid color based on theme
        shadow.props.color = shadowColor;
        shadow.props.border_color = shadowColor;
        shadow.props.background_color = shadowColor;
        shadow.props.bg_color = shadowColor;
        shadow.props.fill = true;

        if (shadow.props.name) shadow.props.name = shadow.props.name + " Shadow";

        this.project.addWidget(shadow);

        // 2. Modify Original Widget (Only for Shapes)
        const shapeTypes = ["shape_rect", "rounded_rect", "shape_circle", "rectangle", "rrect", "circle"];
        if (shapeTypes.includes(widget.type)) {
            // Fill color matches background (opposite of shadow)
            const fillColor = isDark ? "black" : "white";

            if (!widget.props) widget.props = {};

            // Preserve original border color (if it was using 'color' property)
            // In dark mode, undefined color means WHITE (foreground)
            // In light mode, undefined color means BLACK (foreground)
            const defaultForeground = isDark ? "white" : "black";
            const originalColor = widget.props.color || defaultForeground;
            if (!widget.props.border_color) {
                widget.props.border_color = originalColor;
            }

            // Apply Fill
            widget.props.fill = true;
            widget.props.color = fillColor;
            // Also set other common background props to be sure
            widget.props.background_color = fillColor;
            widget.props.bg_color = fillColor;
        }

        // 3. Reorder Logic (Shadow behind)
        // Note: 'page' is already defined above
        const originalIndex = page.widgets.findIndex(w => w.id === widgetId);
        const shadowIndex = page.widgets.findIndex(w => w.id === shadow.id); // Should be last

        if (originalIndex !== -1 && shadowIndex !== -1) {
            // move shadow to originalIndex (which pushes original and subsequent up by 1)
            this.project.reorderWidget(this.project.currentPageIndex, shadowIndex, originalIndex);
        }

        this.recordHistory();
        emit(EVENTS.STATE_CHANGED);
    }

    // --- History ---
    recordHistory() {
        // Skip recording if we're in the middle of restoring history (undo/redo)
        if (this._isRestoringHistory) {
            return;
        }
        this.editor.recordHistory({
            pages: this.project.pages,
            deviceName: this.project.deviceName
        });
    }

    undo() {
        const s = this.editor.undo();
        if (s) {
            this._isRestoringHistory = true;
            this.restoreSnapshot(s);
            // Use setTimeout to ensure flag is cleared after all sync listeners run
            setTimeout(() => { this._isRestoringHistory = false; }, 0);
        }
    }

    redo() {
        const s = this.editor.redo();
        if (s) {
            this._isRestoringHistory = true;
            this.restoreSnapshot(s);
            setTimeout(() => { this._isRestoringHistory = false; }, 0);
        }
    }

    restoreSnapshot(s) {
        // CRITICAL: Deep clone to prevent mutating the history stack object
        this.project.state.pages = JSON.parse(JSON.stringify(s.pages));
        this.project.state.deviceName = s.deviceName;
        this.project.rebuildWidgetsIndex();
        emit(EVENTS.STATE_CHANGED);
    }

    canUndo() { return this.editor.canUndo(); }
    canRedo() { return this.editor.canRedo(); }

    /**
     * Synchronizes the flat widgets array with the hierarchy tree.
     * Ensures that parents are rendered BEFORE (under) their children,
     * and that children are kept adjacent to their parents.
     */
    syncWidgetOrderWithHierarchy() {
        const page = this.getCurrentPage();
        if (!page || !page.widgets) return;

        const widgets = [...page.widgets];

        // Find top level widgets (those with no parentId)
        // We preserve their relative order from the original widgets array
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
        this.project.rebuildWidgetsIndex();
    }

    /**
     * Synchronizes widget visibility based on the current rendering mode.
     * Incompatible widgets are marked as hidden.
     */
    syncWidgetVisibilityWithMode() {
        const mode = this.preferences.state.renderingMode || 'direct';
        Logger.log(`[AppState] Syncing widget visibility for mode: ${mode}`);

        let changeCount = 0;
        this.project.pages.forEach(page => {
            page.widgets.forEach(w => {
                const isCompatible = this._isWidgetCompatibleWithMode(w, mode);

                if (!isCompatible && !w.hidden) {
                    // Auto-hide incompatible widgets
                    w.hidden = true;
                    changeCount++;
                } else if (isCompatible && w.hidden) {
                    // If it was hidden but IS now compatible, should we show it?
                    // User might have manually hidden it. 
                    // However, for mode switching, it's safer to reveal it if it was clearly
                    // hidden due to incompatibility previously.
                    // For now, let's keep the aggressive "auto-show if compatible" behavior
                    // to help users see what's valid in the current mode.
                    w.hidden = false;
                    changeCount++;
                }
            });
        });

        if (changeCount > 0) {
            Logger.log(`[AppState] Updated ${changeCount} widgets due to mode switch.`);
            this.project.rebuildWidgetsIndex();
            emit(EVENTS.STATE_CHANGED);
        }
    }

    /**
     * Internal check for widget compatibility.
     * @private
     */
    _isWidgetCompatibleWithMode(w, mode) {
        const plugin = PluginRegistry.get(w.type);
        if (!plugin) return true; // Default to visible if plugin missing

        if (mode === 'oepl') return !!plugin.exportOEPL;
        if (mode === 'opendisplay') return !!plugin.exportOpenDisplay;
        if (mode === 'lvgl') {
            // Strict Isolation: Only permit native LVGL widgets
            return w.type && w.type.startsWith('lvgl_');
        }
        if (mode === 'direct') {
            // Direct mode uses display.lambda. Compatible if it has 'export' method
            // AND it's not strictly for another protocol.
            const isProtocolSpecific = w.type && (w.type.startsWith('lvgl_') || w.type.startsWith('oepl_'));
            return !!plugin.export && !isProtocolSpecific;
        }

        return true;
    }

    /**
     * Internal check to switch rendering mode if a specific widget is added.
     * @param {Object} w - The widget being added
     * @private
     */
    _checkRenderingModeForWidget(w) {
        if (!w || !w.type) return;

        const currentMode = this.preferences.state.renderingMode || 'direct';

        // Auto-detect if it's an LVGL, OEPL, or ODP widget
        const isLvglWidget = w.type.startsWith('lvgl_');
        const isOEPLWidget = w.type.startsWith('oepl_');
        const isODPWidget = w.type.startsWith('odp_') || w.type.startsWith('opendisplay_');

        if (isLvglWidget && currentMode === 'direct') {
            this.updateSettings({ renderingMode: 'lvgl' });
            Logger.log(`[AppState] Auto-switched to LVGL rendering mode because an LVGL widget (${w.type}) was added.`);
            showToast("Auto-switched to LVGL rendering mode", "info");
        } else if (isOEPLWidget && currentMode !== 'oepl') {
            this.updateSettings({ renderingMode: 'oepl' });
            Logger.log(`[AppState] Auto-switched to OEPL rendering mode because an OEPL widget (${w.type}) was added.`);
            showToast("Auto-switched to OEPL mode", "info");
        } else if (isODPWidget && currentMode !== 'opendisplay') {
            this.updateSettings({ renderingMode: 'opendisplay' });
            Logger.log(`[AppState] Auto-switched to OpenDisplay (ODP) mode because an ODP widget (${w.type}) was added.`);
            showToast("Auto-switched to ODP mode", "info");
        }
    }
}

export const AppState = new AppStateFacade();
window.AppState = AppState;
