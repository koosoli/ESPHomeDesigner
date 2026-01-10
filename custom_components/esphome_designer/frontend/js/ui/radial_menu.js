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
