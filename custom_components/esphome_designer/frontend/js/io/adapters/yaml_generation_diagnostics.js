/**
 * Build lightweight, human-readable layout diagnostics that can be embedded
 * into generated YAML comments and runtime logs. This makes it easier to spot
 * when a device has rolled back to a previous OTA image and is not actually
 * running the YAML a user attached to an issue.
 */

function getVisibleWidgets(pages = []) {
    return pages.flatMap((page) => (page?.widgets || []).filter((widget) => !widget?.hidden));
}

function detectRenderingMode(layout = {}, pages = []) {
    const explicitMode = String(layout.renderingMode || '').trim().toLowerCase();
    if (explicitMode === 'lvgl' || explicitMode === 'direct') {
        return explicitMode;
    }

    return getVisibleWidgets(pages).some((widget) => String(widget?.type || '').startsWith('lvgl_'))
        ? 'lvgl'
        : 'direct';
}

function summarizeWidgetTypes(widgets = []) {
    const counts = new Map();
    widgets.forEach((widget) => {
        const type = String(widget?.type || 'unknown');
        counts.set(type, (counts.get(type) || 0) + 1);
    });

    return [...counts.entries()]
        .sort((a, b) => a[0].localeCompare(b[0]))
        .slice(0, 6)
        .map(([type, count]) => `${type}:${count}`)
        .join(',');
}

function djb2Hash(input) {
    let hash = 5381;
    for (let i = 0; i < input.length; i += 1) {
        hash = ((hash << 5) + hash + input.charCodeAt(i)) >>> 0;
    }
    return hash.toString(16).padStart(8, '0');
}

export function buildLayoutDiagnostics(layout = {}, pagesOverride = null) {
    const pages = Array.isArray(pagesOverride) ? pagesOverride : (layout.pages || []);
    const visibleWidgets = getVisibleWidgets(pages);
    const widgetTypes = summarizeWidgetTypes(visibleWidgets);
    const mode = detectRenderingMode(layout, pages);
    const pageCount = pages.length;
    const widgetCount = visibleWidgets.length;

    const signaturePayload = {
        deviceModel: layout.deviceModel || 'unknown',
        renderingMode: mode,
        darkMode: !!layout.darkMode,
        refreshInterval: layout.refreshInterval || 600,
        pages: pages.map((page) => ({
            id: page?.id || '',
            name: page?.name || '',
            layout: page?.layout || '',
            visible_from: page?.visible_from || '',
            visible_to: page?.visible_to || '',
            widgets: (page?.widgets || [])
                .filter((widget) => !widget?.hidden)
                .map((widget) => ({
                    id: widget?.id || '',
                    type: widget?.type || '',
                    entity_id: widget?.entity_id || widget?.props?.entity_id || '',
                    x: widget?.x || 0,
                    y: widget?.y || 0,
                    width: widget?.width || 0,
                    height: widget?.height || 0
                }))
        }))
    };

    const signature = djb2Hash(JSON.stringify(signaturePayload));
    const summary = `mode=${mode} pages=${pageCount} widgets=${widgetCount}${widgetTypes ? ` types=${widgetTypes}` : ''}`;

    return {
        signature,
        summary,
        headerLine: `Layout Signature: ${signature}`,
        summaryLine: `Layout Summary: ${summary}`,
        bootLogLine: `ESPHome Designer build: sig=${signature} ${summary}`
    };
}
