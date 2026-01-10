import { AppState } from '../core/state.js';
import { on, EVENTS } from '../core/events.js';
import { Logger } from '../utils/logger.js';
import { registry as PluginRegistry } from '../core/plugin_registry.js';

export class HierarchyView {
    constructor() {
        this.listContainer = null;
        this.header = null;
        this.panel = null;
        this.draggedIndex = null;

        // Bind methods to this
        this.render = this.render.bind(this);
        this.highlightSelected = this.highlightSelected.bind(this);
    }

    init() {
        this.listContainer = document.getElementById('hierarchyList');
        this.header = document.getElementById('hierarchyHeader');
        this.panel = document.getElementById('hierarchyPanel');

        if (!this.listContainer || !this.header || !this.panel) {
            Logger.error("[HierarchyView] Required DOM elements not found");
            return;
        }

        this.bindEvents();
        this.render();
        Logger.log("[HierarchyView] Initialized");
    }

    bindEvents() {
        this.header.addEventListener('click', () => this.toggleCollapse());

        on(EVENTS.STATE_CHANGED, this.render);
        on(EVENTS.PAGE_CHANGED, this.render);
        on(EVENTS.SELECTION_CHANGED, this.highlightSelected);
    }

    toggleCollapse() {
        const isCollapsed = this.panel.classList.toggle('hidden');
        const chevron = this.header.querySelector('.chevron');
        if (chevron) {
            chevron.style.transform = isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)';
        }
    }

    highlightSelected() {
        const selectedIds = AppState.selectedWidgetIds || [];
        const items = this.listContainer.querySelectorAll('.hierarchy-item');
        items.forEach(item => {
            if (selectedIds.includes(item.dataset.id)) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    }

    render() {
        const page = AppState.getCurrentPage();
        if (!page) return;

        // Widgets are listed in reverse order (top-most first in list, which is last in array)
        // This matches Photoshop/layers where top is front.
        const widgets = [...page.widgets].reverse();

        this.listContainer.innerHTML = '';

        if (widgets.length === 0) {
            this.listContainer.innerHTML = '<div style="font-size: 10px; color: var(--muted); text-align: center; padding: 12px;">No widgets on this page</div>';
            return;
        }

        widgets.forEach((widget, index) => {
            const actualIndex = page.widgets.length - 1 - index;
            const item = this.createItem(widget, actualIndex);
            this.listContainer.appendChild(item);
        });

        this.highlightSelected();
    }

    createItem(widget, actualIndex) {
        const div = document.createElement('div');
        div.className = `hierarchy-item ${widget.hidden ? 'hidden-widget' : ''}`;
        const selectedIds = AppState.selectedWidgetIds || [];
        if (selectedIds.includes(widget.id)) div.classList.add('selected');

        div.dataset.id = widget.id;
        div.dataset.index = actualIndex;
        div.draggable = !widget.locked;
        if (widget.locked) div.classList.add('locked');

        const typeIcon = this.getWidgetIcon(widget.type);
        const label = this.getWidgetLabel(widget);

        div.innerHTML = `
            <div class="hierarchy-item-drag-handle" style="${widget.locked ? 'display:none' : ''}">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="9" cy="5" r="1"></circle><circle cx="9" cy="12" r="1"></circle><circle cx="9" cy="19" r="1"></circle>
                    <circle cx="15" cy="5" r="1"></circle><circle cx="15" cy="12" r="1"></circle><circle cx="15" cy="19" r="1"></circle>
                </svg>
            </div>
            <div class="hierarchy-item-icon">${typeIcon}</div>
            <div class="hierarchy-item-label">${label}</div>
            <div class="hierarchy-item-actions">
                <div class="hierarchy-item-action toggle-lock" title="${widget.locked ? 'Unlock' : 'Lock'}">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                        ${widget.locked ?
                '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>' :
                '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path>'
            }
                    </svg>
                </div>
                <div class="hierarchy-item-action toggle-visibility" title="Toggle Visibility">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                        ${widget.hidden ?
                '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>' :
                '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>'
            }
                    </svg>
                </div>
                <div class="hierarchy-item-action delete-widget danger" title="Delete Widget">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </div>
            </div>
        `;

        // Selection
        div.addEventListener('click', (e) => {
            const multi = e.ctrlKey || e.shiftKey;
            AppState.selectWidget(widget.id, multi);
            e.stopPropagation();
        });

        // Lock toggle
        div.querySelector('.toggle-lock').addEventListener('click', (e) => {
            AppState.updateWidget(widget.id, { locked: !widget.locked });
            e.stopPropagation();
        });

        // Visibility toggle
        div.querySelector('.toggle-visibility').addEventListener('click', (e) => {
            AppState.updateWidget(widget.id, { hidden: !widget.hidden });
            e.stopPropagation();
        });

        // Delete
        div.querySelector('.delete-widget').addEventListener('click', (e) => {
            if (confirm(`Delete widget "${label}"?`)) {
                AppState.deleteWidget(widget.id);
            }
            e.stopPropagation();
        });

        // Drag and Drop
        div.addEventListener('dragstart', (e) => {
            this.draggedIndex = actualIndex;
            div.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
        });

        div.addEventListener('dragend', () => {
            div.classList.remove('dragging');
            this.draggedIndex = null;
            const items = this.listContainer.querySelectorAll('.hierarchy-item');
            items.forEach(i => i.classList.remove('drag-over'));
        });

        div.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            div.classList.add('drag-over');
        });

        div.addEventListener('dragleave', () => {
            div.classList.remove('drag-over');
        });

        div.addEventListener('drop', (e) => {
            e.preventDefault();
            const targetIndex = parseInt(div.dataset.index);
            if (this.draggedIndex !== null && this.draggedIndex !== targetIndex) {
                AppState.reorderWidget(AppState.currentPageIndex, this.draggedIndex, targetIndex);
            }
        });

        return div;
    }

    getWidgetLabel(widget) {
        // Fallback chain for label: props.name -> props.title -> props.text -> widget.title -> plugin name -> id
        let label = widget.props?.name || widget.props?.title || widget.props?.text || widget.title;

        if (!label || label === "") {
            const plugin = PluginRegistry.get(widget.type);
            label = plugin ? plugin.name : widget.type;
        }

        // If it's still generic, add ID part to make it unique
        if (label === widget.type || (PluginRegistry.get(widget.type) && label === PluginRegistry.get(widget.type).name)) {
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
            'touch_area': 'mdi-fingerprint'
        };
        const iconClass = icons[type] || 'mdi-widgets-outline';
        return `<i class="mdi ${iconClass}"></i>`;
    }
}
