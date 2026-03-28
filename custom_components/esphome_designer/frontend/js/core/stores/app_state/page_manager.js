import { emit, EVENTS } from '../../events.js';

export class PageManager {
    /**
     * @param {import('../index.js').AppStateFacade} app 
     */
    constructor(app) {
        this.app = app;
    }

    /**
     * @param {number} pageIndex 
     * @param {number} fromIndex 
     * @param {number} toIndex 
     */
    reorderWidget(pageIndex, fromIndex, toIndex) {
        this.app.project.reorderWidget(pageIndex, fromIndex, toIndex);
        const widgetManager = /** @type {any} */ (this.app.widgetManager);
        widgetManager.syncWidgetOrderWithHierarchy();
        this.app.recordHistory();
        emit(EVENTS.STATE_CHANGED);
    }

    /**
     * @param {number} index 
     * @param {any} [options] 
     */
    setCurrentPageIndex(index, options = {}) {
        this.app.project.setCurrentPageIndex(index, options);
        this.app.editor.setSelectedWidgetIds([]);
        emit(EVENTS.STATE_CHANGED);
    }

    /**
     * @param {number} fromIndex
     * @param {number} toIndex
     */
    reorderPage(fromIndex, toIndex) {
        this.app.project.reorderPage(fromIndex, toIndex);
        this.app.recordHistory();
    }

    /**
     * @param {number | null | undefined} [atIndex]
     */
    addPage(atIndex = null) {
        const page = this.app.project.addPage(atIndex);
        this.app.recordHistory();
        return page;
    }

    /**
     * @param {number} index
     */
    deletePage(index) {
        this.app.project.deletePage(index);
        this.app.recordHistory();
    }

    /**
     * @param {number} index
     */
    duplicatePage(index) {
        const page = this.app.project.duplicatePage(index);
        this.app.recordHistory();
        return page;
    }

    /**
     * @param {number} index
     * @param {string} newName
     */
    renamePage(index, newName) {
        this.app.project.renamePage(index, newName);
        this.app.recordHistory();
    }

    clearCurrentPage(preserveLocked = false) {
        const result = this.app.project.clearCurrentPage(preserveLocked);
        if (result.deleted > 0) {
            this.app.editor.setSelectedWidgetIds([]);
            this.app.recordHistory();
            emit(EVENTS.STATE_CHANGED);
        }
        return result;
    }
}
