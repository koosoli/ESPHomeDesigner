import { generateId } from '../../../utils/helpers.js';
import { emit, EVENTS } from '../../events.js';

export class SelectionManager {
    constructor(app) {
        /** @type {import('../index.js').AppStateFacade} */
        this.app = app;
    }

    selectWidget(id, multi = false) {
        if (!id) {
            this.app.editor.selectWidget(null, multi);
            return;
        }

        const widget = this.app.getWidgetById(id);
        if (!widget) return;

        // If it's a group, select all members?
        // Actually, the standard behavior in this app seems to be selecting the group widget itself
        // OR selecting all members if we want to treat it as a collection.
        if (widget.type === 'group') {
            const page = this.app.getCurrentPage();
            const groupMembers = page.widgets.filter(w => w.parentId === id);
            const memberIds = groupMembers.map(w => w.id);

            if (multi) {
                const anySelected = memberIds.some(mid => this.app.editor.selectedWidgetIds.includes(mid));
                if (anySelected) {
                    const remainingIds = this.app.editor.selectedWidgetIds.filter(mid => !memberIds.includes(mid));
                    this.app.editor.setSelectedWidgetIds(remainingIds);
                } else {
                    this.app.editor.setSelectedWidgetIds([...new Set([...this.app.editor.selectedWidgetIds, ...memberIds])]);
                }
            } else {
                this.app.editor.setSelectedWidgetIds(memberIds);
            }
        } else {
            this.app.editor.selectWidget(id, multi);
        }
    }

    selectWidgets(ids) {
        this.app.editor.setSelectedWidgetIds(ids);
    }

    selectAllWidgets() {
        const page = this.app.getCurrentPage();
        if (!page || !page.widgets) return;
        const ids = page.widgets.map(w => w.id);
        this.selectWidgets(ids);
    }

    deselectAll() {
        this.app.editor.setSelectedWidgetIds([]);
    }

    toggleSelection(id) {
        this.selectWidget(id, true);
    }

    isWidgetSelected(id) {
        return this.app.editor.selectedWidgetIds.includes(id);
    }

    groupSelection() {
        const selectedIds = this.app.editor.selectedWidgetIds;
        const widgets = this.app.getSelectedWidgets();

        const hasExistingGroup = widgets.some(w => w.type === 'group' || w.parentId);
        if (selectedIds.length < 2 || hasExistingGroup) return;

        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

        widgets.forEach(w => {
            minX = Math.min(minX, w.x);
            minY = Math.min(minY, w.y);
            maxX = Math.max(maxX, w.x + (w.width || 0));
            maxY = Math.max(maxY, w.y + (w.height || 0));
        });

        const groupId = "group_" + generateId();
        const groupWidget = {
            id: groupId,
            type: 'group',
            title: 'Group',
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY,
            props: {},
            expanded: true
        };

        this.app.project.addWidget(groupWidget);

        widgets.forEach(w => {
            this.app.project.updateWidget(w.id, { parentId: groupId });
        });

        this.selectWidget(groupId);
        this.app.syncWidgetOrderWithHierarchy();
        this.app.recordHistory();
        emit(EVENTS.STATE_CHANGED);
    }

    ungroupSelection(idOrIds = null) {
        let targets = [];
        if (idOrIds) {
            targets = Array.isArray(idOrIds) ? idOrIds : [idOrIds];
        } else {
            const selected = this.app.getSelectedWidgets();
            const foundIds = new Set();
            selected.forEach(w => {
                if (w.type === 'group') foundIds.add(w.id);
                else if (w.parentId) foundIds.add(w.parentId);
            });
            targets = [...foundIds];
        }

        const groupIds = new Set();
        targets.forEach(id => {
            const w = this.app.getWidgetById(id);
            if (!w) return;
            if (w.type === 'group') groupIds.add(w.id);
            else if (w.parentId) groupIds.add(w.parentId);
        });

        const idsToProcess = [...groupIds];
        if (idsToProcess.length === 0) return;

        const allChildren = [];
        idsToProcess.forEach(groupId => {
            const group = this.app.getWidgetById(groupId);
            if (!group || group.type !== 'group') return;

            const page = this.app.getCurrentPage();
            const children = page.widgets.filter(w => w.parentId === groupId);

            children.forEach(c => {
                this.app.project.updateWidget(c.id, { parentId: null });
                allChildren.push(c.id);
            });
        });

        this.app.project.deleteWidgets(idsToProcess);

        const currentPage = this.app.getCurrentPage();
        if (currentPage && currentPage.widgets) {
            currentPage.widgets = currentPage.widgets.filter(w => !idsToProcess.includes(w.id));
        }

        if (allChildren.length > 0) {
            this.selectWidgets(allChildren);
        }

        this.app.syncWidgetOrderWithHierarchy();
        this.app.recordHistory();
        emit(EVENTS.STATE_CHANGED);
    }

    alignSelectedWidgets(direction) {
        const widgets = this.app.getSelectedWidgets();
        if (widgets.length < 2) return;

        let targetVal;
        switch (direction) {
            case 'left':
                targetVal = Math.min(...widgets.map(w => w.x));
                widgets.forEach(w => this.app.project.updateWidget(w.id, { x: targetVal }));
                break;
            case 'center': {
                const left = Math.min(...widgets.map(w => w.x));
                const right = Math.max(...widgets.map(w => w.x + (w.width || 0)));
                targetVal = left + (right - left) / 2;
                widgets.forEach(w => this.app.project.updateWidget(w.id, { x: targetVal - (w.width || 0) / 2 }));
                break;
            }
            case 'right':
                targetVal = Math.max(...widgets.map(w => w.x + (w.width || 0)));
                widgets.forEach(w => this.app.project.updateWidget(w.id, { x: targetVal - (w.width || 0) }));
                break;
            case 'top':
                targetVal = Math.min(...widgets.map(w => w.y));
                widgets.forEach(w => this.app.project.updateWidget(w.id, { y: targetVal }));
                break;
            case 'middle': {
                const top = Math.min(...widgets.map(w => w.y));
                const bottom = Math.max(...widgets.map(w => w.y + (w.height || 0)));
                targetVal = top + (bottom - top) / 2;
                widgets.forEach(w => this.app.project.updateWidget(w.id, { y: targetVal - (w.height || 0) / 2 }));
                break;
            }
            case 'bottom':
                targetVal = Math.max(...widgets.map(w => w.y + (w.height || 0)));
                widgets.forEach(w => this.app.project.updateWidget(w.id, { y: targetVal - (w.height || 0) }));
                break;
        }

        this.app.recordHistory();
        emit(EVENTS.STATE_CHANGED);
    }

    distributeSelectedWidgets(axis) {
        const widgets = this.app.getSelectedWidgets();
        if (widgets.length < 3) return;

        if (axis === 'horizontal') {
            const sorted = [...widgets].sort((a, b) => a.x - b.x);
            const first = sorted[0];
            const last = sorted[sorted.length - 1];
            const totalWidth = last.x - (first.x + (first.width || 0));
            const sumWidths = sorted.slice(1, -1).reduce((acc, w) => acc + (w.width || 0), 0);
            const gap = (totalWidth - sumWidths) / (sorted.length - 1);

            let currentX = first.x + (first.width || 0) + gap;
            for (let i = 1; i < sorted.length - 1; i++) {
                this.app.project.updateWidget(sorted[i].id, { x: currentX });
                currentX += (sorted[i].width || 0) + gap;
            }
        } else {
            const sorted = [...widgets].sort((a, b) => a.y - b.y);
            const first = sorted[0];
            const last = sorted[sorted.length - 1];
            const totalHeight = last.y - (first.y + (first.height || 0));
            const sumHeights = sorted.slice(1, -1).reduce((acc, w) => acc + (w.height || 0), 0);
            const gap = (totalHeight - sumHeights) / (sorted.length - 1);

            let currentY = first.y + (first.height || 0) + gap;
            for (let i = 1; i < sorted.length - 1; i++) {
                this.app.project.updateWidget(sorted[i].id, { y: currentY });
                currentY += (sorted[i].height || 0) + gap;
            }
        }

        this.app.recordHistory();
        emit(EVENTS.STATE_CHANGED);
    }
}
