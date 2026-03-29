import { generateId, deepClone } from '../../utils/helpers.js';

/**
 * @returns {Page}
 */
export function createDefaultPage() {
    return {
        id: "page_0",
        name: "Overview",
        layout: null,
        widgets: []
    };
}

/**
 * @param {Page[] | null | undefined} pages
 * @returns {Page[]}
 */
export function normalizePages(pages) {
    return Array.isArray(pages) && pages.length > 0 ? pages : [createDefaultPage()];
}

/**
 * @param {number} index
 * @param {number} pageCount
 * @returns {number}
 */
export function clampPageIndex(index, pageCount) {
    if (pageCount <= 0) return 0;
    return Math.max(0, Math.min(index, pageCount - 1));
}

/**
 * @param {Page[]} pages
 * @returns {Page}
 */
export function createPage(pages) {
    const newIdNum = pages.length;

    let maxPageNum = 0;
    pages.forEach(p => {
        const match = p.name.match(/^Page (\d+)$/);
        if (match) {
            const num = parseInt(match[1], 10);
            if (num > maxPageNum) maxPageNum = num;
        }
    });

    return {
        id: `page_${Date.now()}_${newIdNum}`,
        name: `Page ${maxPageNum + 1}`,
        widgets: []
    };
}

/**
 * @param {Page} sourcePage
 * @param {number} pageCount
 * @returns {Page}
 */
export function duplicatePage(sourcePage, pageCount) {
    const newPage = deepClone(sourcePage);
    newPage.id = `page_${Date.now()}_${pageCount}`;
    newPage.name = `${sourcePage.name} (Copy)`;

    const idMap = new Map();

    newPage.widgets.forEach((/** @type {Widget} */ widget) => {
        const oldId = widget.id;
        const newId = generateId();
        widget.id = newId;
        idMap.set(oldId, newId);
    });

    newPage.widgets.forEach((/** @type {Widget} */ widget) => {
        if (widget.parentId && idMap.has(widget.parentId)) {
            widget.parentId = idMap.get(widget.parentId) || null;
        }
    });

    return newPage;
}
