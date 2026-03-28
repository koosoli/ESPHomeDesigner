// @ts-check

import { AppState } from './state';
import { appendToDesignerOverlayRoot } from '../utils/runtime_root.js';

/**
 * @param {HTMLElement} element
 * @param {string} layout
 * @param {{ width: number, height: number }} _dims
 * @param {boolean} isDark
 */
export function renderLvglGridOverlayToElement(element, layout, _dims, isDark) {
    const match = layout.match(/^(\d+)x(\d+)$/);
    if (!match) return;

    const rows = parseInt(match[1], 10);
    const cols = parseInt(match[2], 10);

    const gridOverlay = document.createElement("div");
    gridOverlay.className = "lvgl-grid-overlay";
    gridOverlay.style.cssText = `
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    display: grid;
    grid-template-rows: repeat(${rows}, 1fr);
    grid-template-columns: repeat(${cols}, 1fr);
    pointer-events: none;
    z-index: 1;
    `;

    const lineColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
    const labelColor = isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)";

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement("div");
            cell.style.cssText = `border: 1px dashed ${lineColor}; position: relative; box-sizing: border-box;`;
            const label = document.createElement("span");
            label.textContent = `${r},${c}`;
            label.style.cssText = `position: absolute; top: 2px; left: 4px; font-size: 8px; color: ${labelColor}; pointer-events: none;`;
            cell.appendChild(label);
            gridOverlay.appendChild(cell);
        }
    }
    element.appendChild(gridOverlay);
}

/**
 * @param {HTMLElement} el
 */
export function addResizeHandles(el) {
    const handles = ['tl', 'tc', 'tr', 'rc', 'br', 'bc', 'bl', 'lc'];
    handles.forEach(type => {
        const handle = document.createElement("div");
        handle.className = `widget-resize-handle handle-${type}`;
        handle.dataset.handle = type;
        el.appendChild(handle);
    });
}

/**
 * @param {import('./canvas').Canvas} canvasInstance
 */
export function renderContextToolbar(canvasInstance) {
    const selectedIds = AppState.selectedWidgetIds;
    const wrapper = canvasInstance.canvas.querySelector(`.artboard-wrapper[data-index="${AppState.currentPageIndex}"]`);
    const artboard = wrapper ? wrapper.querySelector(".artboard") : null;
    /** @type {HTMLElement|null} */
    let toolbar = canvasInstance.canvas.querySelector(".context-toolbar");

    if (selectedIds.length === 0 || canvasInstance.dragState || canvasInstance.lassoState || !artboard) {
        if (toolbar) toolbar.remove();
        return;
    }

    /** @type {any[]} */
    const widgets = AppState.getSelectedWidgets();
    if (widgets.length === 0 || !wrapper || !artboard) {
        if (toolbar) toolbar.remove();
        return;
    }

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    widgets.forEach((w) => {
        minX = Math.min(minX, w.x);
        minY = Math.min(minY, w.y);
        maxX = Math.max(maxX, w.x + (w.width || 0));
        maxY = Math.max(maxY, w.y + (w.height || 0));
    });

    const targetLeft = minX;
    const hArtboard = /** @type {HTMLElement} */(artboard);
    const targetTop = hArtboard.offsetTop + minY - 45;

    if (!toolbar) {
        toolbar = document.createElement("div");
        toolbar.className = "context-toolbar";
        wrapper.appendChild(toolbar);
    } else if (toolbar.parentElement !== wrapper) {
        wrapper.appendChild(toolbar);
    }

    toolbar.style.left = targetLeft + "px";
    toolbar.style.top = targetTop + "px";
    toolbar.innerHTML = "";

    if (selectedIds.length > 1) {
        const alignTools = [
            { icon: 'mdi-align-horizontal-left', title: 'Align Left', action: 'left' },
            { icon: 'mdi-align-horizontal-center', title: 'Align Center', action: 'center' },
            { icon: 'mdi-align-horizontal-right', title: 'Align Right', action: 'right' },
            { separator: true },
            { icon: 'mdi-align-vertical-top', title: 'Align Top', action: 'top' },
            { icon: 'mdi-align-vertical-center', title: 'Align Middle', action: 'middle' },
            { icon: 'mdi-align-vertical-bottom', title: 'Align Bottom', action: 'bottom' }
        ];

        alignTools.forEach(tool => {
            if (tool.separator) {
                addSeparator(toolbar);
                return;
            }
            addButton(toolbar, tool.icon || '', tool.title || '', () => AppState.alignSelectedWidgets(tool.action || ''));
        });

        if (selectedIds.length >= 3) {
            addSeparator(toolbar);
            addButton(toolbar, 'mdi-distribute-horizontal-center', 'Distribute Horizontally', () => AppState.distributeSelectedWidgets('horizontal'));
            addButton(toolbar, 'mdi-distribute-vertical-center', 'Distribute Vertically', () => AppState.distributeSelectedWidgets('vertical'));
        }
    }

    const hasUngroupable = widgets.some(w => w.type === 'group' || w.parentId);

    if (hasUngroupable) {
        if (toolbar.children.length > 0) addSeparator(toolbar);
        addButton(toolbar, 'mdi-ungroup', 'Ungroup (Ctrl+Shift+G)', () => AppState.ungroupSelection());
    } else if (selectedIds.length > 1) {
        if (toolbar.children.length > 0) addSeparator(toolbar);
        addButton(toolbar, 'mdi-group', 'Group Selection (Ctrl+G)', () => AppState.groupSelection());
    }

    if (toolbar.children.length === 0) {
        toolbar.remove();
    }
}

/**
 * @param {HTMLElement} container
 * @param {string} icon
 * @param {string} title
 * @param {() => void} onClick
 */
function addButton(container, icon, title, onClick) {
    const btn = document.createElement("button");
    btn.className = "btn-icon";
    btn.title = title;
    btn.innerHTML = `<i class="mdi ${icon}"></i>`;
    btn.onclick = (e) => {
        e.stopPropagation();
        onClick();
    };
    container.appendChild(btn);
}

/**
 * @param {HTMLElement} container
 */
function addSeparator(container) {
    if (!container.lastElementChild || container.lastElementChild.classList.contains('separator')) return;

    const sep = document.createElement("div");
    sep.className = "separator";
    container.appendChild(sep);
}

/**
 * @param {string} iconClass
 * @param {string} title
 * @param {() => void} onClick
 * @returns {HTMLButtonElement}
 */
export function createMdiIconButton(iconClass, title, onClick) {
    const btn = document.createElement("button");
    btn.className = "artboard-btn";
    btn.title = title;
    btn.innerHTML = `<i class="mdi ${iconClass}"></i>`;
    btn.onclick = (e) => {
        e.stopPropagation();
        onClick();
    };
    return btn;
}

/**
 * @param {{
 *  title: string,
 *  message: string,
 *  confirmLabel?: string,
 *  confirmClass?: string,
 *  onConfirm: () => void
 * }} options
 */
export function confirmAction({ title, message, confirmLabel, confirmClass, onConfirm }) {
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop';
    modal.style.display = 'flex';
    modal.innerHTML = `
    <div class="modal" style="width: 340px; height: auto; padding: var(--space-4); border-radius: 12px; border: 1px solid var(--glass-border);">
        <div class="modal-header" style="font-size: var(--fs-md); font-weight: 600; padding-bottom: var(--space-3); border-bottom: 1px solid var(--border-subtle);">
            <div>${title}</div>
        </div>
        <div class="modal-body" style="padding: var(--space-4) 0;">
            <p style="font-size: var(--fs-sm); line-height: 1.5; color: var(--text-dim);">
                ${message}
            </p>
        </div>
        <div class="modal-actions" style="display: flex; gap: 8px; justify-content: flex-end; padding-top: var(--space-3);">
            <button class="btn btn-secondary close-btn btn-xs" style="border-radius: 6px;">Cancel</button>
            <button class="btn ${confirmClass || 'btn-primary'} confirm-btn btn-xs" style="border-radius: 6px;">${confirmLabel || 'Confirm'}</button>
        </div>
    </div>
    `;
    appendToDesignerOverlayRoot(modal);

    const closeBtn = modal.querySelector('.close-btn');
    const confirmBtn = modal.querySelector('.confirm-btn');
    const hClose = /** @type {HTMLElement} */(closeBtn);
    const hConfirm = /** @type {HTMLElement} */(confirmBtn);

    hClose.onclick = () => modal.remove();
    hConfirm.onclick = () => {
        onConfirm();
        modal.remove();
    };
}

/**
 * @param {HTMLElement} element
 * @param {{ width: number, height: number }} _dims
 * @param {boolean} _isDark
 */
export function renderDebugGridOverlay(element, _dims, _isDark) {
    const overlay = document.createElement("div");
    overlay.className = "debug-grid-overlay";
    element.appendChild(overlay);
}
