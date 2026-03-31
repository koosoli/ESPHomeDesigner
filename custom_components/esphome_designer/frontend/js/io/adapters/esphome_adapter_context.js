/**
 * @param {any[]} pages
 * @returns {any[]}
 */
export function collectRenderableWidgets(pages) {
    const widgets = [];
    const pageCount = pages.length;

    pages.forEach((page, pageIndex) => {
        if (!page.widgets) return;

        page.widgets.forEach((widget) => {
            if (widget.hidden) return;
            widget._pageIndex = pageIndex;
            widget._pageCount = pageCount;
            widgets.push(widget);
        });
    });

    return widgets;
}

/**
 * @param {{
 *   widgets: any[],
 *   profile: any,
 *   layout: any,
 *   displayId: string,
 *   adapter: any,
 *   isLvgl: boolean,
 *   appState: any
 * }} params
 * @returns {any}
 */
export function createExportContext(params) {
    return {
        widgets: params.widgets,
        profile: params.profile,
        layout: params.layout,
        displayId: params.displayId,
        adapter: params.adapter,
        isLvgl: params.isLvgl,
        seenEntityIds: new Set(),
        seenSensorIds: new Set(),
        seenTextEntityIds: new Set(),
        pendingTriggers: new Map(),
        appState: params.appState
    };
}
