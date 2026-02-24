import { emit, EVENTS } from '../../events.js';

export class PageManager {
    constructor(app) {
        /** @type {import('../index.js').AppStateFacade} */
        this.app = app;
    }

    reorderWidget(pageIndex, fromIndex, toIndex) {
        this.app.project.reorderWidget(pageIndex, fromIndex, toIndex);
        this.app.widgetManager.syncWidgetOrderWithHierarchy();
        this.app.recordHistory();
        emit(EVENTS.STATE_CHANGED);
    }

    setCurrentPageIndex(index, options = {}) {
        this.app.project.setCurrentPageIndex(index, options);
        this.app.editor.setSelectedWidgetIds([]);
        emit(EVENTS.STATE_CHANGED);
    }

    reorderPage(fromIndex, toIndex) {
        this.app.project.reorderPage(fromIndex, toIndex);
        this.app.recordHistory();
    }

    addPage(atIndex = null) {
        const page = this.app.project.addPage(atIndex);
        this.app.recordHistory();
        return page;
    }

    deletePage(index) {
        this.app.project.deletePage(index);
        this.app.recordHistory();
    }

    duplicatePage(index) {
        const page = this.app.project.duplicatePage(index);
        this.app.recordHistory();
        return page;
    }

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
