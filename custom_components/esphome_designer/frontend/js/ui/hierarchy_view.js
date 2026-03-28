import { AppState } from '../core/state';
import { on, EVENTS } from '../core/events.js';
import { Logger } from '../utils/logger.js';
import { registry } from '../core/plugin_registry';

/**
 * Build the hierarchy traversal structures for the current widget list.
 *
 * @param {any[]} widgets
 * @returns {{ topLevel: any[], childrenMap: Map<string, any[]> }}
 */
export function buildWidgetHierarchy(widgets) {
    const topLevel = widgets.filter((widget) => !widget.parentId).reverse();
    const childrenMap = new Map();

    widgets.forEach((widget) => {
        if (!widget.parentId) return;
        if (!childrenMap.has(widget.parentId)) {
            childrenMap.set(widget.parentId, []);
        }
        childrenMap.get(widget.parentId).push(widget);
    });

    return { topLevel, childrenMap };
}

/**
 * Apply a layer-order move to the page widget array.
 *
 * @param {any[]} widgets
 * @param {string} widgetId
 * @param {'front' | 'back' | 'up' | 'down'} direction
 * @returns {boolean}
 */
export function moveWidgetInLayerOrder(widgets, widgetId, direction) {
    const index = widgets.findIndex((widget) => widget.id === widgetId);
    if (index === -1) {
        return false;
    }

    if (direction === 'front') {
        if (index >= widgets.length - 1) return false;
        const [widget] = widgets.splice(index, 1);
        widgets.push(widget);
        return true;
    }

    if (direction === 'back') {
        if (index === 0) return false;
        const [widget] = widgets.splice(index, 1);
        widgets.unshift(widget);
        return true;
    }

    if (direction === 'up') {
        if (index >= widgets.length - 1) return false;
        [widgets[index], widgets[index + 1]] = [widgets[index + 1], widgets[index]];
        return true;
    }

    if (direction === 'down') {
        if (index === 0) return false;
        [widgets[index], widgets[index - 1]] = [widgets[index - 1], widgets[index]];
        return true;
    }

    return false;
}

export class HierarchyView {
    constructor() {
        /** @type {HTMLElement | null} */
        this.listContainer = null;
        /** @type {HTMLElement | null} */
        this.header = null;
        /** @type {HTMLElement | null} */
        this.panel = null;
        /** @type {HTMLElement | null} */
        this.controlsContainer = null;
        /** @type {number | null} */
        this.draggedIndex = null;

        // Bind methods to this
        this.render = this.render.bind(this);
        this.highlightSelected = this.highlightSelected.bind(this);
    }

    init() {
        this.listContainer = /** @type {HTMLElement | null} */ (document.getElementById('hierarchyList'));
        this.header = /** @type {HTMLElement | null} */ (document.getElementById('hierarchyHeader'));
        this.panel = /** @type {HTMLElement | null} */ (document.getElementById('hierarchyPanel'));

        if (!this.listContainer || !this.header || !this.panel) {
            Logger.error("[HierarchyView] Required DOM elements not found");
            return;
        }

        // Create controls container
        this.controlsContainer = document.createElement('div');
        this.controlsContainer.id = 'hierarchyControls';
        this.controlsContainer.className = 'hierarchy-controls';
        this.controlsContainer.style.padding = '8px 8px';
        this.controlsContainer.style.borderTop = '1px solid var(--border-subtle)';
        this.panel.appendChild(this.controlsContainer);

        this.bindEvents();
        this.render();
        this.renderHeaderActions();
        Logger.log("[HierarchyView] Initialized");
    }

    renderHeaderActions() {
        if (!this.header) return;

        let toggles = /** @type {HTMLElement | null} */ (this.header.querySelector('.hierarchy-header-toggles'));
        if (!toggles) {
            toggles = document.createElement('div');
            toggles.className = 'hierarchy-header-toggles';
            // Insert before the chevron
            const chevron = this.header.querySelector('.chevron');
            this.header.insertBefore(toggles, chevron || null);

            const lockAll = this.createHeaderToggle('mdi-lock-outline', 'Toggle All Locks', () => {
                const widgets = AppState.getCurrentPage()?.widgets || [];
                const allLocked = widgets.every(w => w.locked);
                widgets.forEach(w => AppState.updateWidget(w.id, { locked: !allLocked }));
            });

            const hideAll = this.createHeaderToggle('mdi-eye-outline', 'Toggle All Visibility', () => {
                const widgets = AppState.getCurrentPage()?.widgets || [];
                const allHidden = widgets.every(w => w.hidden);
                widgets.forEach(w => AppState.updateWidget(w.id, { hidden: !allHidden }));
            });

            toggles.appendChild(lockAll);
            toggles.appendChild(hideAll);
        }
    }

    createHeaderToggle(iconClass, title, onClick) {
        const div = document.createElement('div');
        div.className = 'h-toggle';
        div.title = title;
        div.innerHTML = `<i class="mdi ${iconClass}"></i>`;
        div.onclick = (e) => {
            e.stopPropagation();
            onClick();
        };
        return div;
    }

    bindEvents() {
        this.header.addEventListener('click', () => this.toggleCollapse());

        on(EVENTS.STATE_CHANGED, this.render);
        on(EVENTS.PAGE_CHANGED, this.render);
        on(EVENTS.SELECTION_CHANGED, this.highlightSelected);
    }

    toggleCollapse() {
        if (!this.panel || !this.header) return;
        const isCollapsed = this.panel.classList.toggle('hidden');
        const chevron = /** @type {HTMLElement | null} */ (this.header.querySelector('.chevron'));
        if (chevron) {
            chevron.style.transform = isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)';
        }
    }

    highlightSelected() {
        if (!this.listContainer) return;
        const selectedIds = AppState.selectedWidgetIds || [];
        const items = /** @type {NodeListOf<HTMLElement>} */ (this.listContainer.querySelectorAll('.hierarchy-item'));
        items.forEach(item => {
            if (selectedIds.includes(item.dataset.id)) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
        this.renderControls();
    }

    render() {
        if (!this.listContainer || !this.controlsContainer) return;
        const page = AppState.getCurrentPage();
        if (!page) return;

        this.listContainer.innerHTML = '';

        if (!page.widgets || page.widgets.length === 0) {
            this.listContainer.innerHTML = '<div style="font-size: 10px; color: var(--muted); text-align: center; padding: 12px;">No widgets on this page</div>';
            this.controlsContainer.style.display = 'none';
            return;
        }

        const { topLevel, childrenMap } = buildWidgetHierarchy(page.widgets);

        // Alphabetical sort for children within groups if needed? 
        // No, keep same order as in main array (z-order)

        const renderRecursive = (widget, level = 0) => {
            const actualIndex = page.widgets.indexOf(widget);
            const item = this.createItem(widget, actualIndex, level);
            this.listContainer.appendChild(item);

            const children = childrenMap.get(widget.id);
            if (children && (widget.expanded !== false)) {
                // Reverse children to match Photoshop/layers logic (front on top)
                [...children].reverse().forEach(child => renderRecursive(child, level + 1));
            }
        };

        topLevel.forEach(w => renderRecursive(w));

        this.highlightSelected();
        this.renderControls();
    }

    createItem(widget, actualIndex, level = 0) {
        const div = document.createElement('div');
        div.className = `hierarchy-item ${widget.hidden ? 'hidden-widget' : ''}`;
        if (level > 0) div.classList.add('child-item');

        const selectedIds = AppState.selectedWidgetIds || [];
        if (selectedIds.includes(widget.id)) div.classList.add('selected');

        div.dataset.id = widget.id;
        div.dataset.index = actualIndex;
        div.draggable = !widget.locked;
        if (widget.locked) div.classList.add('locked');

        div.style.paddingLeft = (12 + level * 20) + "px";

        const typeIcon = this.getWidgetIcon(widget.type);
        const label = this.getWidgetLabel(widget);
        const isGroup = widget.type === 'group';

        div.innerHTML = `
            <div class="hierarchy-item-drag-handle" style="${widget.locked ? 'display:none' : ''}">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="9" cy="5" r="1"></circle><circle cx="9" cy="12" r="1"></circle><circle cx="9" cy="19" r="1"></circle>
                    <circle cx="15" cy="5" r="1"></circle><circle cx="15" cy="12" r="1"></circle><circle cx="15" cy="19" r="1"></circle>
                </svg>
            </div>
            ${isGroup ? `
            <div class="hierarchy-group-toggle ${widget.expanded !== false ? 'expanded' : ''}">
                <i class="mdi mdi-chevron-down"></i>
            </div>
            ` : '<div style="width: 16px;"></div>'}
            <div class="hierarchy-item-icon">${typeIcon}</div>
            <div class="hierarchy-item-label">${label}</div>
            <div class="hierarchy-item-actions">
                <div class="hierarchy-item-action toggle-lock" title="${widget.locked ? 'Unlock' : 'Lock'}">
                     <i class="mdi ${widget.locked ? 'mdi-lock-outline' : 'mdi-lock-open-outline'}"></i>
                </div>
                <div class="hierarchy-item-action toggle-visibility" title="Toggle Visibility">
                    <i class="mdi ${widget.hidden ? 'mdi-eye-off-outline' : 'mdi-eye-outline'}"></i>
                </div>
                <div class="hierarchy-item-action delete-widget danger" title="Delete Widget">
                    <i class="mdi mdi-delete-outline"></i>
                </div>
            </div>
        `;

        // Group toggle
        if (isGroup) {
            const groupToggle = /** @type {HTMLElement | null} */ (div.querySelector('.hierarchy-group-toggle'));
            if (groupToggle) {
                groupToggle.addEventListener('click', (e) => {
                    AppState.updateWidget(widget.id, { expanded: widget.expanded === false });
                    e.stopPropagation();
                });
            }
        }

        // Label rename and selection
        const labelEl = /** @type {HTMLElement | null} */ (div.querySelector('.hierarchy-item-label'));
        if (labelEl) {
            labelEl.addEventListener('click', (e) => {
                // If already selected, allow rename
                if (AppState.selectedWidgetIds.includes(widget.id)) {
                    const newName = prompt('Rename:', label);
                    if (newName !== null && newName !== "" && newName !== label) {
                        AppState.updateWidget(widget.id, { title: newName });
                    }
                    e.stopPropagation();
                    return;
                }
            });
        }

        // Selection
        div.addEventListener('click', (e) => {
            const multi = e.ctrlKey || e.shiftKey;
            AppState.selectWidget(widget.id, multi);
            e.stopPropagation();
        });

        // Lock toggle
        const lockToggle = /** @type {HTMLElement | null} */ (div.querySelector('.toggle-lock'));
        if (lockToggle) {
            lockToggle.addEventListener('click', (e) => {
                AppState.updateWidget(widget.id, { locked: !widget.locked });
                e.stopPropagation();
            });
        }

        // Visibility toggle
        const visibilityToggle = /** @type {HTMLElement | null} */ (div.querySelector('.toggle-visibility'));
        if (visibilityToggle) {
            visibilityToggle.addEventListener('click', (e) => {
                AppState.updateWidget(widget.id, { hidden: !widget.hidden });
                e.stopPropagation();
            });
        }

        // Delete
        const deleteButton = /** @type {HTMLElement | null} */ (div.querySelector('.delete-widget'));
        if (deleteButton) {
            deleteButton.addEventListener('click', (e) => {
                if (confirm(`Delete widget "${label}"?`)) {
                    AppState.deleteWidget(widget.id);
                }
                e.stopPropagation();
            });
        }

        // Drag and Drop
        /** @param {DragEvent} e */
        div.addEventListener('dragstart', (e) => {
            if (!e.dataTransfer) return;
            this.draggedIndex = actualIndex;
            div.classList.add('dragging');
            e.dataTransfer.setData("application/widget-id", widget.id);
            e.dataTransfer.effectAllowed = 'move';
        });

        div.addEventListener('dragend', () => {
            div.classList.remove('dragging');
            this.draggedIndex = null;
            if (!this.listContainer) return;
            const items = /** @type {NodeListOf<HTMLElement>} */ (this.listContainer.querySelectorAll('.hierarchy-item'));
            items.forEach(i => i.classList.remove('drag-over'));
        });

        /** @param {DragEvent} e */
        div.addEventListener('dragover', (e) => {
            if (!e.dataTransfer) return;
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            div.classList.add('drag-over');
        });

        div.addEventListener('dragleave', () => {
            div.classList.remove('drag-over');
        });

        /** @param {DragEvent} e */
        div.addEventListener('drop', (e) => {
            if (!e.dataTransfer) return;
            e.preventDefault();
            const draggedId = e.dataTransfer.getData("application/widget-id");
            const targetId = div.dataset.id;
            if (draggedId === targetId) return;

            const targetWidget = AppState.getWidgetById(targetId);
            if (!targetWidget) return;

            // Update parentId based on target
            if (targetWidget.type === 'group') {
                AppState.updateWidget(draggedId, { parentId: targetId, expanded: true });
            } else {
                AppState.updateWidget(draggedId, { parentId: targetWidget.parentId || null });
            }

            const targetIndex = parseInt(div.dataset.index || '-1', 10);
            if (this.draggedIndex !== null) {
                AppState.reorderWidget(AppState.currentPageIndex, this.draggedIndex, targetIndex);
            }
        });

        return div;
    }

    renderControls() {
        if (!this.controlsContainer) return;
        const selectedWidgets = AppState.getSelectedWidgets();
        if (selectedWidgets.length === 0) {
            this.controlsContainer.style.display = 'none';
            return;
        }

        this.controlsContainer.style.display = 'block';
        this.controlsContainer.innerHTML = '';

        const section = (label) => {
            const l = document.createElement("div");
            l.style.fontSize = "10px";
            l.style.color = "var(--muted)";
            l.style.marginBottom = "6px";
            l.style.fontWeight = "600";
            l.style.marginTop = "8px";
            l.textContent = label;
            this.controlsContainer.appendChild(l);
        };

        const buttonRow = () => {
            const wrap = document.createElement("div");
            wrap.style.display = "flex";
            wrap.style.gap = "4px";
            this.controlsContainer.appendChild(wrap);
            return wrap;
        };

        // --- Grouping Actions ---
        section("GROUPING");
        const gRow = buttonRow();

        const hasGroup = selectedWidgets.some(w => w.type === 'group' || w.parentId);
        const groupBtn = document.createElement("button");
        groupBtn.className = "btn btn-secondary";
        groupBtn.innerHTML = '<i class="mdi mdi-group" style="margin-right:4px"></i>Group';
        groupBtn.style.flex = "1";
        groupBtn.style.fontSize = "10px";
        groupBtn.disabled = selectedWidgets.length < 2 || hasGroup;
        groupBtn.onclick = () => AppState.groupSelection();
        gRow.appendChild(groupBtn);

        const ungroupBtn = document.createElement("button");
        ungroupBtn.className = "btn btn-secondary";
        ungroupBtn.innerHTML = '<i class="mdi mdi-ungroup" style="margin-right:4px"></i>Ungroup';
        ungroupBtn.style.flex = "1";
        ungroupBtn.style.fontSize = "10px";
        ungroupBtn.disabled = !hasGroup;
        ungroupBtn.onclick = () => AppState.ungroupSelection();
        gRow.appendChild(ungroupBtn);

        // --- Layer Order ---
        if (selectedWidgets.length === 1) {
            const widget = selectedWidgets[0];
            section("LAYER ORDER");
            const lRow = buttonRow();

            const buttons = [
                { label: "Front", icon: "mdi-arrange-bring-to-front", action: () => this.moveToFront(widget) },
                { label: "Back", icon: "mdi-arrange-send-to-back", action: () => this.moveToBack(widget) },
                { label: "Up", icon: "mdi-arrow-up", action: () => this.moveUp(widget) },
                { label: "Down", icon: "mdi-arrow-down", action: () => this.moveDown(widget) }
            ];

            buttons.forEach(btn => {
                const button = document.createElement("button");
                button.className = "btn btn-secondary";
                button.innerHTML = `<i class="mdi ${btn.icon}"></i>`;
                button.title = btn.label;
                button.style.flex = "1";
                button.style.fontSize = "12px";
                button.style.padding = "4px";
                button.onclick = () => btn.action();
                lRow.appendChild(button);
            });
        }
    }

    moveToFront(widget) {
        const page = AppState.getCurrentPage();
        if (!page) return;
        if (moveWidgetInLayerOrder(page.widgets, widget.id, 'front')) {
            AppState.setPages(AppState.pages); // Trigger update
        }
    }

    moveToBack(widget) {
        const page = AppState.getCurrentPage();
        if (!page) return;
        if (moveWidgetInLayerOrder(page.widgets, widget.id, 'back')) {
            AppState.setPages(AppState.pages);
        }
    }

    moveUp(widget) {
        const page = AppState.getCurrentPage();
        if (!page) return;
        if (moveWidgetInLayerOrder(page.widgets, widget.id, 'up')) {
            AppState.setPages(AppState.pages);
        }
    }

    moveDown(widget) {
        const page = AppState.getCurrentPage();
        if (!page) return;
        if (moveWidgetInLayerOrder(page.widgets, widget.id, 'down')) {
            AppState.setPages(AppState.pages);
        }
    }

    getWidgetLabel(widget) {
        // Fallback chain for label: props.name -> props.title -> props.text -> widget.title -> plugin name -> id
        let label = widget.props?.name || widget.props?.title || widget.props?.text || widget.title;

        if (!label || label === "") {
            const plugin = registry.get(widget.type);
            label = plugin ? plugin.name : widget.type;
        }

        // If it's still generic, add ID part to make it unique
        if (label === widget.type || (registry.get(widget.type) && label === registry.get(widget.type).name)) {
            const shortId = widget.id.split('_').pop();
            label = `${label} (${shortId})`;
        }

        return label;
    }

    getWidgetIcon(type) {
        const icons = {
            'text': 'mdi-format-text',
            'sensor_text': 'mdi-numeric',
            'icon': 'mdi-emoticon-outline',
            'image': 'mdi-image',
            'qr_code': 'mdi-qrcode',
            'line': 'mdi-vector-line',
            'lvgl_line': 'mdi-vector-line',
            'rect': 'mdi-square-outline',
            'shape_rect': 'mdi-square-outline',
            'arc': 'mdi-circle-outline',
            'shape_circle': 'mdi-circle-outline',
            'bar': 'mdi-chart-gantt',
            'button': 'mdi-gesture-tap-button',
            'checkbox': 'mdi-checkbox-marked-outline',
            'calendar': 'mdi-calendar',
            'weather_forecast': 'mdi-weather-partly-cloudy',
            'datetime': 'mdi-clock-outline',
            'graph': 'mdi-chart-timeline-variant',
            'touch_area': 'mdi-fingerprint',
            'group': 'mdi-folder-outline'
        };
        const iconClass = icons[type] || 'mdi-widgets-outline';
        return `<i class="mdi ${iconClass}"></i>`;
    }
}
