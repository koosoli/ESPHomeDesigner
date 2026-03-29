/**
 * @typedef {{ widget: Widget, sourcePage: Page }} WidgetMovement
 */

/**
 * @typedef {{
 *   pages: Page[],
 *   widgetsById: Map<string, Widget>,
 *   protocolHardware?: { orientation?: string }
 * }} ProjectStoreMoveState
 */

/**
 * @param {ProjectStoreMoveState} state
 * @param {string} widgetId
 * @param {number} targetPageIndex
 * @param {number|null} x
 * @param {number|null} y
 * @param {(orientation: string | undefined) => { width: number, height: number }} getCanvasDimensions
 * @returns {boolean}
 */
export function moveWidgetToPageState(state, widgetId, targetPageIndex, x = null, y = null, getCanvasDimensions) {
    if (targetPageIndex < 0 || targetPageIndex >= state.pages.length) return false;

    const targetPage = state.pages[targetPageIndex];
    const allMovedIds = new Set();
    /** @type {WidgetMovement[]} */
    const movements = [];

    let rootWidgetId = widgetId;
    const initialWidget = state.widgetsById.get(widgetId);
    if (initialWidget && initialWidget.parentId) {
        let current = initialWidget;
        while (current.parentId) {
            const parent = state.widgetsById.get(current.parentId);
            if (!parent) break;
            current = parent;
        }
        rootWidgetId = current.id;
    }

    /**
     * @param {string} id
     * @returns {void}
     */
    const collect = (id) => {
        if (allMovedIds.has(id)) return;

        /** @type {Widget | null} */
        let found = null;
        /** @type {Page | null} */
        let sourcePage = null;
        for (const page of state.pages) {
            found = page.widgets.find((/** @type {Widget} */ widget) => widget.id === id) || null;
            if (found) {
                sourcePage = page;
                break;
            }
        }

        if (!found || !sourcePage || sourcePage === targetPage) return;

        allMovedIds.add(id);
        movements.push({ widget: found, sourcePage });

        const children = sourcePage.widgets.filter((/** @type {Widget} */ widget) => widget.parentId === id);
        children.forEach((/** @type {Widget} */ child) => collect(child.id));
    };

    collect(rootWidgetId);

    if (movements.length === 0) return false;

    movements.forEach((movement, index) => {
        const { widget, sourcePage } = movement;
        const sourceIndex = sourcePage.widgets.indexOf(widget);
        if (sourceIndex !== -1) {
            sourcePage.widgets.splice(sourceIndex, 1);
        }

        if (index === 0 && widget.parentId && !allMovedIds.has(widget.parentId)) {
            widget.parentId = null;
        }

        if (index === 0) {
            let dx = 0;
            let dy = 0;

            if (x !== null && y !== null) {
                dx = x - widget.x;
                dy = y - widget.y;
                widget.x = x;
                widget.y = y;
            }

            if (dx !== 0 || dy !== 0) {
                for (let i = 1; i < movements.length; i++) {
                    const child = movements[i].widget;
                    child.x += dx;
                    child.y += dy;
                }
            }
        }

        targetPage.widgets.push(widget);
    });

    const dims = getCanvasDimensions(state.protocolHardware?.orientation);
    for (const id of allMovedIds) {
        const widget = state.widgetsById.get(id);
        if (!widget) continue;

        if (widget.parentId && allMovedIds.has(widget.parentId)) continue;

        const oldX = widget.x;
        const oldY = widget.y;
        widget.x = Math.max(0, Math.min(dims.width - (widget.width || 50), widget.x));
        widget.y = Math.max(0, Math.min(dims.height - (widget.height || 50), widget.y));

        const clampDx = widget.x - oldX;
        const clampDy = widget.y - oldY;
        if (clampDx !== 0 || clampDy !== 0) {
            for (const childId of allMovedIds) {
                const child = state.widgetsById.get(childId);
                if (child && child.parentId === widget.id) {
                    child.x += clampDx;
                    child.y += clampDy;
                }
            }
        }
    }

    return true;
}
