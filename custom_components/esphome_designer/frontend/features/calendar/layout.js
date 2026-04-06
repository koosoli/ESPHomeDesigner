/**
 * Estimate how many event-summary characters fit before the right-aligned time
 * block, while letting wider calendar widgets use the extra horizontal space.
 * @param {number} widgetWidth
 * @param {number} [fontSize=18]
 * @returns {number}
 */
export function getCalendarEventSummaryCharLimit(widgetWidth, fontSize = 18) {
    const resolvedWidth = Number.isFinite(widgetWidth) ? widgetWidth : parseInt(String(widgetWidth || 0), 10);
    const resolvedFontSize = Number.isFinite(fontSize) ? fontSize : parseInt(String(fontSize || 18), 10);
    const avgCharWidth = Math.max(6, resolvedFontSize * 0.52);
    const reservedWidth = Math.max(110, Math.round(resolvedFontSize * 5.5));
    const usableWidth = Math.max(0, resolvedWidth - reservedWidth);

    return Math.max(25, Math.floor(usableWidth / avgCharWidth));
}
