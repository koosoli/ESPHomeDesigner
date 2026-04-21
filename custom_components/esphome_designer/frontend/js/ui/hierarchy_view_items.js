import { AppState } from '../core/state';
import { registry } from '../core/plugin_registry.js';

/**
 * @param {any} widget
 * @returns {string}
 */
export function getHierarchyWidgetLabel(widget) {
    let label = widget.props?.name || widget.props?.title || widget.props?.text || widget.title;

    if (!label || label === '') {
        const plugin = registry.get(widget.type);
        label = plugin ? plugin.name : widget.type;
    }

    const pluginName = registry.get(widget.type)?.name;
    if (label === widget.type || (pluginName && label === pluginName)) {
        const shortId = widget.id.split('_').pop();
        label = `${label} (${shortId})`;
    }

    return label;
}

/**
 * @param {string} type
 * @returns {string}
 */
export function getHierarchyWidgetIcon(type) {
    const icons = {
        text: 'mdi-format-text',
        sensor_text: 'mdi-numeric',
        icon: 'mdi-emoticon-outline',
        image: 'mdi-image',
        weather_icon: 'mdi-weather-partly-cloudy',
        qr_code: 'mdi-qrcode',
        line: 'mdi-vector-line',
        lvgl_line: 'mdi-vector-line',
        rect: 'mdi-square-outline',
        shape_rect: 'mdi-square-outline',
        arc: 'mdi-circle-outline',
        shape_circle: 'mdi-circle-outline',
        bar: 'mdi-chart-gantt',
        button: 'mdi-gesture-tap-button',
        checkbox: 'mdi-checkbox-marked-outline',
        calendar: 'mdi-calendar',
        weather_forecast: 'mdi-weather-partly-cloudy',
        datetime: 'mdi-clock-outline',
        graph: 'mdi-chart-timeline-variant',
        touch_area: 'mdi-fingerprint',
        group: 'mdi-folder-outline'
    };
    const iconClass = icons[type] || 'mdi-widgets-outline';
    return `<i class="mdi ${iconClass}"></i>`;
}

/**
 * @param {any} view
 * @param {any} widget
 * @param {number} actualIndex
 * @param {number} [level]
 * @returns {HTMLElement}
 */
export function createHierarchyItem(view, widget, actualIndex, level = 0) {
    const div = document.createElement('div');
    div.className = `hierarchy-item ${widget.hidden ? 'hidden-widget' : ''}`;
    if (level > 0) div.classList.add('child-item');

    const selectedIds = AppState.selectedWidgetIds || [];
    if (selectedIds.includes(widget.id)) div.classList.add('selected');

    div.dataset.id = widget.id;
    div.dataset.index = String(actualIndex);
    div.draggable = !widget.locked;
    if (widget.locked) div.classList.add('locked');

    div.style.paddingLeft = `${12 + level * 20}px`;

    const typeIcon = getHierarchyWidgetIcon(widget.type);
    const label = getHierarchyWidgetLabel(widget);
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

    if (isGroup) {
        const groupToggle = /** @type {HTMLElement | null} */ (div.querySelector('.hierarchy-group-toggle'));
        if (groupToggle) {
            groupToggle.addEventListener('click', (e) => {
                AppState.updateWidget(widget.id, { expanded: widget.expanded === false });
                e.stopPropagation();
            });
        }
    }

    const labelEl = /** @type {HTMLElement | null} */ (div.querySelector('.hierarchy-item-label'));
    if (labelEl) {
        labelEl.addEventListener('click', (e) => {
            if ((AppState.selectedWidgetIds || []).includes(widget.id)) {
                const newName = prompt('Rename:', label);
                if (newName !== null && newName !== '' && newName !== label) {
                    AppState.updateWidget(widget.id, { title: newName });
                }
                e.stopPropagation();
            }
        });
    }

    div.addEventListener('click', (e) => {
        const multi = e.ctrlKey || e.shiftKey;
        AppState.selectWidget(widget.id, multi);
        e.stopPropagation();
    });

    const lockToggle = /** @type {HTMLElement | null} */ (div.querySelector('.toggle-lock'));
    if (lockToggle) {
        lockToggle.addEventListener('click', (e) => {
            AppState.updateWidget(widget.id, { locked: !widget.locked });
            e.stopPropagation();
        });
    }

    const visibilityToggle = /** @type {HTMLElement | null} */ (div.querySelector('.toggle-visibility'));
    if (visibilityToggle) {
        visibilityToggle.addEventListener('click', (e) => {
            AppState.updateWidget(widget.id, { hidden: !widget.hidden });
            e.stopPropagation();
        });
    }

    const deleteButton = /** @type {HTMLElement | null} */ (div.querySelector('.delete-widget'));
    if (deleteButton) {
        deleteButton.addEventListener('click', (e) => {
            if (confirm(`Delete widget "${label}"?`)) {
                AppState.deleteWidget(widget.id);
            }
            e.stopPropagation();
        });
    }

    /** @param {DragEvent} e */
    div.addEventListener('dragstart', (e) => {
        if (!e.dataTransfer) return;
        view.draggedIndex = actualIndex;
        div.classList.add('dragging');
        e.dataTransfer.setData('application/widget-id', widget.id);
        e.dataTransfer.effectAllowed = 'move';
    });

    div.addEventListener('dragend', () => {
        div.classList.remove('dragging');
        view.draggedIndex = null;
        if (!view.listContainer) return;
        const items = /** @type {NodeListOf<HTMLElement>} */ (view.listContainer.querySelectorAll('.hierarchy-item'));
        items.forEach((item) => item.classList.remove('drag-over'));
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
        const draggedId = e.dataTransfer.getData('application/widget-id');
        const targetId = div.dataset.id;
        if (draggedId === targetId) return;

        const draggedWidget = AppState.getWidgetById(draggedId);
        const targetWidget = AppState.getWidgetById(targetId);
        if (!draggedWidget || !targetWidget) return;

        const nextParentId = draggedWidget.type === 'group'
            ? null
            : (targetWidget.type === 'group' ? targetId : (targetWidget.parentId || null));

        if (draggedWidget.parentId !== nextParentId) {
            const parentUpdate = { parentId: nextParentId };
            if (nextParentId && targetWidget.type === 'group') {
                AppState.updateWidget(draggedId, { ...parentUpdate, expanded: true });
            } else {
                AppState.updateWidget(draggedId, parentUpdate);
            }
        }

        const targetIndex = parseInt(div.dataset.index || '-1', 10);
        if (view.draggedIndex !== null) {
            AppState.reorderWidget(AppState.currentPageIndex, view.draggedIndex, targetIndex);
        }
    });

    return div;
}
