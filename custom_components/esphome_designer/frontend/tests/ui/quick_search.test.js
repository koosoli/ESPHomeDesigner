import { describe, it, expect, beforeEach, vi } from 'vitest';

const mockLogger = { log: vi.fn(), warn: vi.fn(), error: vi.fn() };
const mockAddWidget = vi.fn();
const mockShowToast = vi.fn();
const mockCreateWidget = vi.fn((type) => ({ id: `w_${type}`, type }));

vi.mock('../../js/utils/logger.js', () => ({ Logger: mockLogger }));
vi.mock('../../js/core/state', () => ({
    AppState: {
        addWidget: mockAddWidget
    }
}));
vi.mock('../../js/core/widget_factory', () => ({
    WidgetFactory: {
        createWidget: mockCreateWidget
    }
}));
vi.mock('../../js/utils/dom.js', () => ({ showToast: mockShowToast }));

describe('QuickSearch', () => {
    let QuickSearch;
    let quickSearch;

    beforeEach(async () => {
        vi.clearAllMocks();
        if (!HTMLElement.prototype.scrollIntoView) {
            HTMLElement.prototype.scrollIntoView = vi.fn();
        }
        document.body.innerHTML = `
            <div class="widget-category">
                <div class="category-name">Core Widgets</div>
                <div class="item" data-widget-type="label"><span class="label">Floating text</span></div>
                <div class="item" data-widget-type="icon"><span class="label">MDI icon</span></div>
            </div>
            <div class="widget-category">
                <div class="category-name">Shapes</div>
                <div class="item" data-widget-type="shape_rect"><span class="label">Rectangle</span></div>
            </div>
        `;

        ({ QuickSearch } = await import('../../js/ui/quick_search.js'));
        quickSearch = new QuickSearch();
    });

    it('discovers widgets and opens modal', async () => {
        quickSearch.open();

        expect(quickSearch.isOpen).toBe(true);
        expect(quickSearch.allWidgets.length).toBe(3);
        expect(quickSearch.filteredWidgets.length).toBe(3);
        expect(document.getElementById('quick-search-modal').classList.contains('hidden')).toBe(false);
    });

    it('filters results and renders empty state', () => {
        quickSearch.open();
        quickSearch.input.value = 'rectangle';
        quickSearch.handleSearch();

        expect(quickSearch.filteredWidgets).toHaveLength(1);
        expect(quickSearch.resultsContainer.textContent).toContain('Rectangle');

        quickSearch.input.value = 'nope';
        quickSearch.handleSearch();
        expect(quickSearch.filteredWidgets).toHaveLength(0);
        expect(quickSearch.resultsContainer.textContent).toContain('No widgets found');
    });

    it('supports keyboard navigation and enter to add widget', () => {
        quickSearch.open();

        quickSearch.handleKeyDown({ key: 'ArrowDown', preventDefault: vi.fn() });
        expect(quickSearch.selectedIndex).toBe(1);

        quickSearch.handleKeyDown({ key: 'ArrowUp', preventDefault: vi.fn() });
        expect(quickSearch.selectedIndex).toBe(0);

        quickSearch.handleKeyDown({ key: 'Enter', preventDefault: vi.fn() });
        expect(mockCreateWidget).toHaveBeenCalled();
        expect(mockAddWidget).toHaveBeenCalled();
        expect(quickSearch.isOpen).toBe(false);
    });

    it('closes on escape', () => {
        quickSearch.open();
        quickSearch.handleKeyDown({ key: 'Escape', preventDefault: vi.fn() });
        expect(quickSearch.isOpen).toBe(false);
    });

    it('handles add widget failures with toast', () => {
        mockCreateWidget.mockImplementationOnce(() => {
            throw new Error('boom');
        });

        quickSearch.open();
        quickSearch.selectedIndex = 0;
        quickSearch.addSelectedWidget();

        expect(mockLogger.error).toHaveBeenCalled();
        expect(mockShowToast).toHaveBeenCalledWith('Failed to add widget: boom', 'error');
    });

    it('no-ops when no widgets are discovered', () => {
        document.body.innerHTML = '';
        const qs = new QuickSearch();
        qs.discoverWidgets();
        expect(qs.allWidgets).toHaveLength(0);
        expect(mockLogger.warn).toHaveBeenCalled();
    });
});
