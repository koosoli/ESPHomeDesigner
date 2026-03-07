import { AppState } from '../state';

/**
 * Creates a floating drag ghost that follows the cursor during widget drags.
 * This enables smooth cross-page dragging without the widget being clamped to artboard bounds.
 * @param {any} canvasInstance
 * @param {any[]} widgets
 * @param {number} clientX
 * @param {number} clientY
 * @param {number} zoom
 * @param {any[]} widgetOffsets
 */
export function createDragGhost(canvasInstance, widgets, clientX, clientY, zoom, widgetOffsets) {
    // Remove any existing ghost
    removeDragGhost(canvasInstance);

    const ghostContainer = document.createElement('div');
    ghostContainer.className = 'drag-ghost-container';
    ghostContainer.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 99999;
        opacity: 1.0; 
        transform-origin: top left;
        transform: scale(${zoom});
        transition: none;
    `;

    // Find the primary widget for relative coordinate calculation
    // FIX: Use the specifically grabbed widget as anchor (primaryOffset.id)
    // instead of defaulting to the first one in the list.
    const grabbedId = canvasInstance.dragState?.id;
    const primaryOffset = widgetOffsets.find(o => o.id === grabbedId) || widgetOffsets[0];
    const primaryWidget = widgets.find(w => w.id === primaryOffset?.id) || widgets[0];
    const primaryEl = document.querySelector(`.widget[data-id="${primaryWidget.id}"]`);

    if (!primaryWidget || !primaryEl) return;

    // 1. Flatten selection: ensure children of groups are also ghosted
    /** @type {any[]} */
    const allWidgetsToGhost = [];
    const currentPage = AppState.getCurrentPage();

    widgets.forEach(w => {
        allWidgetsToGhost.push(w);
        if (w.type === 'group') {
            /** @type {any[]} */
            const pageWidgets = currentPage.widgets || [];
            const children = pageWidgets.filter(child => child.parentId === w.id);
            allWidgetsToGhost.push(...children);
        }
    });

    // 2. Read all widget styles first so cloning can write in one batch.
    const ghostSpecs = allWidgetsToGhost.map(widget => {
        const widgetEl = /** @type {HTMLElement} */ (document.querySelector(`.widget[data-id="${widget.id}"]`));
        if (!widgetEl) return null;

        const sourceArtboard = /** @type {HTMLElement} */ (widgetEl.closest('.artboard'));
        const computed = window.getComputedStyle(widgetEl);

        return {
            widget,
            className: (sourceArtboard ? sourceArtboard.className : 'artboard') + ' ghost-context-sim',
            attrs: Array.from(widgetEl.attributes).map(attr => ({ name: attr.name, value: attr.value })),
            styleCssText: widgetEl.style.cssText,
            innerHTML: widgetEl.innerHTML,
            background: computed.background,
            backgroundColor: computed.backgroundColor,
            border: computed.border,
            borderRadius: computed.borderRadius
        };
    }).filter(Boolean);

    // 3. Clone each widget with full visual context in a write-only pass.
    ghostSpecs.forEach(spec => {
        const contextWrapper = document.createElement('div');
        contextWrapper.className = spec.className;
        contextWrapper.style.cssText = `
                position: absolute;
                left: ${(spec.widget.x - primaryWidget.x)}px;
                top: ${(spec.widget.y - primaryWidget.y)}px;
                width: ${spec.widget.width}px;
                height: ${spec.widget.height}px;
                pointer-events: none;
                background: transparent !important;
                box-shadow: none !important;
                border: none !important;
                transform: none !important;
                overflow: visible;
                display: block;
            `;

        const clone = document.createElement('div');

        spec.attrs.forEach(attr => {
            clone.setAttribute(attr.name, attr.value);
        });

        clone.classList.remove('active', 'dragging-source', 'locked');
        clone.classList.add('drag-ghost-widget');
        clone.style.cssText = spec.styleCssText;
        clone.style.position = 'absolute';
        clone.style.top = '0';
        clone.style.left = '0';
        clone.style.margin = '0';
        clone.style.transform = 'none';
        clone.style.setProperty('background', spec.background, 'important');
        clone.style.setProperty('background-color', spec.backgroundColor, 'important');
        clone.style.setProperty('border', spec.border, 'important');
        clone.style.setProperty('border-radius', spec.borderRadius, 'important');
        clone.innerHTML = spec.innerHTML;

        contextWrapper.appendChild(clone);
        ghostContainer.appendChild(contextWrapper);
    });

    // Store click offset in screen pixels
    if (primaryOffset) {
        canvasInstance.dragGhostOffset = {
            x: primaryOffset.clickOffsetX * zoom,
            y: primaryOffset.clickOffsetY * zoom
        };
    }

    document.body.appendChild(ghostContainer);
    canvasInstance.dragGhostEl = ghostContainer;

    // Initial position
    updateDragGhost(canvasInstance, clientX, clientY);

    // Fade out original widgets during drag
    widgets.forEach(widget => {
        const widgetEl = document.querySelector(`.widget[data-id="${widget.id}"]`);
        if (widgetEl) widgetEl.classList.add('dragging-source');
    });
}

/**
 * Updates the drag ghost position to follow the cursor.
 */
export function updateDragGhost(canvasInstance, clientX, clientY) {
    if (!canvasInstance.dragGhostEl || !canvasInstance.dragGhostOffset) return;

    const offset = canvasInstance.dragGhostOffset;
    const x = clientX - offset.x;
    const y = clientY - offset.y;

    canvasInstance.dragGhostEl.style.left = x + 'px';
    canvasInstance.dragGhostEl.style.top = y + 'px';
}

/**
 * Updates the drag ghost position to an absolute screen position (for snapped positions).
 * The screenX/screenY should be the top-left corner of where the primary widget should appear.
 */
export function updateDragGhostPosition(canvasInstance, screenX, screenY) {
    if (!canvasInstance.dragGhostEl) return;

    canvasInstance.dragGhostEl.style.left = screenX + 'px';
    canvasInstance.dragGhostEl.style.top = screenY + 'px';
}

/**
 * Removes the drag ghost and restores original widget visibility.
 * @param {any} canvasInstance
 */
export function removeDragGhost(canvasInstance) {
    if (canvasInstance.dragGhostEl) {
        canvasInstance.dragGhostEl.remove();
        canvasInstance.dragGhostEl = null;
        canvasInstance.dragGhostOffset = null;
    }

    // Restore original widgets
    document.querySelectorAll('.widget.dragging-source').forEach(el => {
        el.classList.remove('dragging-source');
    });
}


/**
 * Creates a floating ghost of the artboard header for page reordering.
 * @param {any} canvasInstance
 * @param {number} pageIndex
 * @param {number} clientX
 * @param {number} clientY
 */
export function createPageDragGhost(canvasInstance, pageIndex, clientX, clientY) {
    const wrapper = /** @type {HTMLElement} */ (canvasInstance.canvas.querySelector(`.artboard-wrapper[data-index="${pageIndex}"]`));
    if (!wrapper) return;

    const header = /** @type {HTMLElement} */ (wrapper.querySelector('.artboard-header'));
    if (!header) return;

    const ghost = /** @type {HTMLElement} */ (header.cloneNode(true));
    ghost.classList.add('page-drag-ghost');

    const rect = header.getBoundingClientRect();
    const clickOffsetX = clientX - rect.left;
    const clickOffsetY = clientY - rect.top;

    ghost.style.cssText = `
        position: fixed;
        left: ${clientX}px;
        top: ${clientY}px;
        width: ${rect.width}px;
        pointer-events: none;
        z-index: 100000;
        opacity: 0.9;
        box-shadow: 0 12px 40px rgba(0,0,0,0.5);
        border: 2px solid var(--accent);
        border-radius: 10px;
        background: var(--bg-surface);
        transform: translate(-${clickOffsetX}px, -${clickOffsetY}px) scale(1.05);
        transition: none;
    `;

    document.body.appendChild(ghost);
    canvasInstance.pageDragGhost = ghost;
    canvasInstance.pageDragOffset = { x: clickOffsetX, y: clickOffsetY };

    // Dim the original artboard wrapper
    wrapper.classList.add('reordering');
}

/**
 * @param {any} canvasInstance
 * @param {number} clientX
 * @param {number} clientY
 */
export function updatePageDragGhost(canvasInstance, clientX, clientY) {
    if (!canvasInstance.pageDragGhost) return;
    canvasInstance.pageDragGhost.style.left = clientX + 'px';
    canvasInstance.pageDragGhost.style.top = clientY + 'px';
}

/**
 * @param {any} canvasInstance
 * @param {number} pageIndex
 */
export function removePageDragGhost(canvasInstance, pageIndex) {
    if (canvasInstance.pageDragGhost) {
        canvasInstance.pageDragGhost.remove();
        canvasInstance.pageDragGhost = null;
    }
    const wrapper = /** @type {HTMLElement} */ (canvasInstance.canvas.querySelector(`.artboard-wrapper[data-index="${pageIndex}"]`));
    if (wrapper) {
        wrapper.classList.remove('reordering');
    }
}
