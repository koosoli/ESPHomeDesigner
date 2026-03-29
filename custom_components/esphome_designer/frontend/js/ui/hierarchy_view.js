import { AppState } from '../core/state';
import { on, EVENTS } from '../core/events.js';
import { Logger } from '../utils/logger.js';
import { renderHierarchyControls } from './hierarchy_view_controls.js';
import { createHierarchyItem } from './hierarchy_view_items.js';

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

        this.render = this.render.bind(this);
        this.highlightSelected = this.highlightSelected.bind(this);
    }

    init() {
        this.listContainer = /** @type {HTMLElement | null} */ (document.getElementById('hierarchyList'));
        this.header = /** @type {HTMLElement | null} */ (document.getElementById('hierarchyHeader'));
        this.panel = /** @type {HTMLElement | null} */ (document.getElementById('hierarchyPanel'));

        if (!this.listContainer || !this.header || !this.panel) {
            Logger.error('[HierarchyView] Required DOM elements not found');
            return;
        }

        this.controlsContainer = document.createElement('div');
        this.controlsContainer.id = 'hierarchyControls';
        this.controlsContainer.className = 'hierarchy-controls';
        this.controlsContainer.style.padding = '8px 8px';
        this.controlsContainer.style.borderTop = '1px solid var(--border-subtle)';
        this.panel.appendChild(this.controlsContainer);

        this.bindEvents();
        this.render();
        this.renderHeaderActions();
        Logger.log('[HierarchyView] Initialized');
    }

    renderHeaderActions() {
        if (!this.header) return;

        let toggles = /** @type {HTMLElement | null} */ (this.header.querySelector('.hierarchy-header-toggles'));
        if (!toggles) {
            toggles = document.createElement('div');
            toggles.className = 'hierarchy-header-toggles';
            const chevron = this.header.querySelector('.chevron');
            this.header.insertBefore(toggles, chevron || null);

            const lockAll = this.createHeaderToggle('mdi-lock-outline', 'Toggle All Locks', () => {
                const widgets = AppState.getCurrentPage()?.widgets || [];
                const allLocked = widgets.every((widget) => widget.locked);
                widgets.forEach((widget) => AppState.updateWidget(widget.id, { locked: !allLocked }));
            });

            const hideAll = this.createHeaderToggle('mdi-eye-outline', 'Toggle All Visibility', () => {
                const widgets = AppState.getCurrentPage()?.widgets || [];
                const allHidden = widgets.every((widget) => widget.hidden);
                widgets.forEach((widget) => AppState.updateWidget(widget.id, { hidden: !allHidden }));
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
        items.forEach((item) => {
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
        const renderRecursive = (widget, level = 0) => {
            const actualIndex = page.widgets.indexOf(widget);
            const item = this.createItem(widget, actualIndex, level);
            this.listContainer.appendChild(item);

            const children = childrenMap.get(widget.id);
            if (children && widget.expanded !== false) {
                [...children].reverse().forEach((child) => renderRecursive(child, level + 1));
            }
        };

        topLevel.forEach((widget) => renderRecursive(widget));

        this.highlightSelected();
        this.renderControls();
    }

    createItem(widget, actualIndex, level = 0) {
        return createHierarchyItem(this, widget, actualIndex, level);
    }

    renderControls() {
        renderHierarchyControls(this, this.controlsContainer);
    }

    moveLayerOrder(widget, direction) {
        const page = AppState.getCurrentPage();
        if (!page) return;
        if (moveWidgetInLayerOrder(page.widgets, widget.id, direction)) {
            AppState.setPages(AppState.pages);
        }
    }

    moveToFront(widget) {
        this.moveLayerOrder(widget, 'front');
    }

    moveToBack(widget) {
        this.moveLayerOrder(widget, 'back');
    }

    moveUp(widget) {
        this.moveLayerOrder(widget, 'up');
    }

    moveDown(widget) {
        this.moveLayerOrder(widget, 'down');
    }
}
