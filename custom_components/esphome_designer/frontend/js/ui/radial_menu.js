import { AppState } from '../core/state.js';
import { forceSnapWidget } from '../core/canvas_snap.js';
import { Logger } from '../utils/logger.js';

export class RadialMenu {
    constructor() {
        this.active = false;
        this.element = null;
        this.targetWidgetId = null;
        this.position = { x: 0, y: 0 };
        this.init();
    }

    init() {
        // Create the menu element if it doesn't exist
        if (!this.element) {
            this.element = document.createElement('div');
            this.element.className = 'radial-menu';
            this.element.innerHTML = `
                <div class="radial-menu-center"></div>
                <div class="radial-menu-items"></div>
            `;
            document.body.appendChild(this.element);

            // Close on click outside
            window.addEventListener('mousedown', (e) => {
                if (this.active && !this.element.contains(e.target)) {
                    this.hide();
                }
            }, true);

            // Close on touch outside (for mobile/touch devices)
            window.addEventListener('touchstart', (e) => {
                if (this.active && !this.element.contains(e.target)) {
                    this.hide();
                }
            }, true);

            // Close on escape
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.active) {
                    this.hide();
                }
            });
        }
    }

    show(x, y, widgetId = null) {
        this.targetWidgetId = widgetId;
        this.position = { x, y };
        this.active = true;

        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
        this.renderItems();

        // Use requestAnimationFrame to ensure the element is positioned before adding the active class for transitions
        requestAnimationFrame(() => {
            this.element.classList.add('active');
        });
    }

    hide() {
        this.active = false;
        this.element.classList.remove('active');
        this.targetWidgetId = null;
    }

    renderItems() {
        const itemsContainer = this.element.querySelector('.radial-menu-items');
        itemsContainer.innerHTML = '';

        const actions = this.getAvailableActions();
        const angleStep = (2 * Math.PI) / actions.length;
        const radius = 70; // Distance from center

        actions.forEach((action, index) => {
            const angle = index * angleStep - Math.PI / 2; // Start from top
            const itemX = Math.cos(angle) * radius;
            const itemY = Math.sin(angle) * radius;

            const item = document.createElement('div');
            item.className = `radial-menu-item ${action.className || ''}`;
            item.style.setProperty('--x', `${itemX}px`);
            item.style.setProperty('--y', `${itemY}px`);
            item.title = action.label;
            item.innerHTML = `<i class="mdi ${action.icon}"></i>`;

            item.addEventListener('click', (e) => {
                e.stopPropagation();
                action.callback();
                this.hide();
            });

            itemsContainer.appendChild(item);
        });
    }

    getAvailableActions() {
        const state = AppState;
        const widget = this.targetWidgetId ? state.getWidgetById(this.targetWidgetId) : null;

        const actions = [];

        if (widget) {
            // Widget specific actions
            actions.push({
                label: 'Copy',
                icon: 'mdi-content-copy',
                callback: () => {
                    state.selectWidget(this.targetWidgetId, false);
                    state.copyWidget();
                }
            });

            // Grouping logic in radial
            const selectedIds = state.selectedWidgetIds;
            const hasGroupInSelection = selectedIds.some(id => {
                const w = state.getWidgetById(id);
                return w && (w.type === 'group' || w.parentId);
            });

            if (selectedIds.length > 1 && !hasGroupInSelection) {
                actions.push({
                    label: 'Group',
                    icon: 'mdi-group',
                    callback: () => state.groupSelection()
                });
            }

            if (widget.type === 'group' || widget.parentId) {
                actions.push({
                    label: 'Ungroup',
                    icon: 'mdi-ungroup',
                    callback: () => state.ungroupSelection(this.targetWidgetId)
                });
            }

            actions.push({
                label: 'Duplicate',
                icon: 'mdi-content-duplicate',
                callback: () => {
                    state.copyWidget();
                    state.pasteWidget();
                }
            });

            actions.push({
                label: widget.locked ? 'Unlock' : 'Lock',
                icon: widget.locked ? 'mdi-lock-open-outline' : 'mdi-lock-outline',
                callback: () => {
                    state.updateWidget(this.targetWidgetId, { locked: !widget.locked });
                }
            });

            actions.push({
                label: 'Snap',
                icon: 'mdi-magnet',
                callback: () => {
                    forceSnapWidget(this.targetWidgetId);
                }
            });

            actions.push({
                label: 'Delete',
                icon: 'mdi-delete-outline',
                className: 'danger',
                callback: () => {
                    state.deleteWidget(this.targetWidgetId);
                }
            });

            const page = state.getCurrentPage();
            const idx = page?.widgets.findIndex(w => w.id === this.targetWidgetId);

            if (idx !== -1) {
                actions.push({
                    label: 'Bring to Front',
                    icon: 'mdi-arrange-bring-to-front',
                    callback: () => {
                        state.reorderWidget(state.currentPageIndex, idx, page.widgets.length - 1);
                    }
                });

                actions.push({
                    label: 'Send to Back',
                    icon: 'mdi-arrange-send-to-back',
                    callback: () => {
                        state.reorderWidget(state.currentPageIndex, idx, 0);
                    }
                });
            }
        } else {
            // Canvas specific actions
            actions.push({
                label: 'Paste',
                icon: 'mdi-content-paste',
                callback: () => {
                    // We might want to paste at the current right-click position
                    // but state.pasteWidget doesn't take coords currently.
                    // For now, just call it.
                    state.pasteWidget();
                }
            });
        }

        return actions;
    }
}

// Global instance
window.RadialMenu = new RadialMenu();
