import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockOn = vi.fn();
const mockShowToast = vi.fn();
const mockLogger = {
    log: vi.fn(),
    warn: vi.fn(),
    error: vi.fn()
};

const mockQuickSearchOpen = vi.fn();

const mockWidget = { id: 'w1', type: 'text', x: 40, y: 40 };
const mockCreateWidget = vi.fn(() => ({ ...mockWidget }));

const mockAppState = {
    pages: [
        { id: 'p1', name: 'Overview', widgets: [] },
        { id: 'p2', name: 'Status', widgets: [] }
    ],
    currentPageIndex: 0,
    addPage: vi.fn(),
    setCurrentPageIndex: vi.fn(),
    addWidget: vi.fn(),
    selectWidget: vi.fn(),
    renamePage: vi.fn(),
    reorderPage: vi.fn(),
    moveWidgetToPage: vi.fn(),
    duplicatePage: vi.fn(),
    deletePage: vi.fn(),
    clearCurrentPage: vi.fn(() => ({ deleted: 2, preserved: 1 })),
    getCurrentPage: vi.fn(() => ({ id: 'p1', name: 'Overview', widgets: [] }))
};

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/core/events.js', () => ({
    on: mockOn,
    EVENTS: {
        STATE_CHANGED: 'STATE_CHANGED',
        PAGE_CHANGED: 'PAGE_CHANGED',
        SELECTION_CHANGED: 'SELECTION_CHANGED'
    }
}));

vi.mock('../../js/core/widget_factory', () => ({
    WidgetFactory: {
        createWidget: mockCreateWidget
    }
}));

vi.mock('../../js/utils/dom.js', () => ({
    showToast: mockShowToast
}));

vi.mock('../../js/utils/logger.js', () => ({
    Logger: mockLogger
}));

vi.mock('../../js/ui/quick_search.js', () => ({
    quickSearchInstance: {
        open: mockQuickSearchOpen
    }
}));

describe('Sidebar', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockAppState.currentPageIndex = 0;
        mockAppState.pages = [
            { id: 'p1', name: 'Overview', widgets: [] },
            { id: 'p2', name: 'Status', widgets: [] }
        ];

        document.body.innerHTML = `
            <div id="pagesHeader"><span class="chevron"></span></div>
            <div id="pagesContent"></div>
            <div id="pageList"></div>
            <div id="widgetPalette"><div class="item" data-widget-type="text"><span class="inner">Text</span></div></div>
            <button id="addPageBtn"></button>
            <button id="clearAllBtn"></button>
            <button id="quickSearchBtn"></button>
            <div id="currentPageName"></div>
            <div id="mobileBackdrop"></div>
            <button id="mobileWidgetsBtn"></button>
            <button id="mobilePropsBtn"></button>
            <button id="mobileDeviceBtn"></button>
            <button id="mobileEditorSettingsBtn"></button>
            <div class="sidebar"></div>
            <div class="right-panel"></div>
            <div id="debug-overlay"></div>
        `;

        window.app = {
            canvas: { suppressNextFocus: false },
            pageSettings: { open: vi.fn() },
            deviceSettings: { open: vi.fn() },
            editorSettings: { open: vi.fn() }
        };
    });

    it('initializes and renders pages with current page label', async () => {
        const { Sidebar } = await import('../../js/core/sidebar.js');
        const sidebar = new Sidebar(window.app);

        sidebar.init();

        const items = document.querySelectorAll('#pageList .item');
        expect(items.length).toBe(2);
        expect(document.getElementById('currentPageName')?.textContent).toBe('Overview');
        expect(mockOn).toHaveBeenCalled();
    });

    it('handles add page and quick search button clicks', async () => {
        const { Sidebar } = await import('../../js/core/sidebar.js');
        const sidebar = new Sidebar(window.app);
        sidebar.init();

        document.getElementById('addPageBtn')?.click();
        expect(mockAppState.addPage).toHaveBeenCalled();

        document.getElementById('quickSearchBtn')?.click();
        expect(mockQuickSearchOpen).toHaveBeenCalled();
    });

    it('creates widget from palette click and updates state', async () => {
        const { Sidebar } = await import('../../js/core/sidebar.js');
        const sidebar = new Sidebar(window.app);
        sidebar.init();

        const paletteInner = document.querySelector('#widgetPalette .inner');
        paletteInner?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(mockCreateWidget).toHaveBeenCalledWith('text');
        expect(mockAppState.addWidget).toHaveBeenCalled();
        expect(window.app.canvas.suppressNextFocus).toBe(true);
    });

    it('reorders pages based on drop position', async () => {
        const { Sidebar } = await import('../../js/core/sidebar.js');
        const sidebar = new Sidebar(window.app);

        const target = document.createElement('div');
        vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({
            top: 100,
            height: 40
        });

        sidebar.handlePageReorder(0, 1, 130, target);
        expect(mockAppState.reorderPage).toHaveBeenCalled();
    });

    it('opens and confirms clear page modal', async () => {
        const { Sidebar } = await import('../../js/core/sidebar.js');
        const sidebar = new Sidebar(window.app);

        sidebar.handleClearPage();

        const modal = document.querySelector('.modal-backdrop');
        expect(modal).toBeTruthy();

        const confirm = modal?.querySelector('.confirm-btn');
        confirm?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(mockAppState.clearCurrentPage).toHaveBeenCalledWith(true);
        expect(mockShowToast).toHaveBeenCalled();
    });

    it('opens and confirms delete page modal', async () => {
        const { Sidebar } = await import('../../js/core/sidebar.js');
        const sidebar = new Sidebar(window.app);

        sidebar.handlePageDelete(1, { name: 'Status' });

        const modal = document.querySelector('.modal-backdrop');
        expect(modal).toBeTruthy();

        const confirm = modal?.querySelector('.confirm-btn');
        confirm?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(mockAppState.deletePage).toHaveBeenCalledWith(1);
    });

    it('toggles mobile panels and opens mobile settings actions', async () => {
        const { Sidebar } = await import('../../js/core/sidebar.js');
        const sidebar = new Sidebar(window.app);
        sidebar.init();

        document.getElementById('mobileWidgetsBtn')?.click();
        expect(document.querySelector('.sidebar')?.classList.contains('mobile-active')).toBe(true);

        document.getElementById('mobileDeviceBtn')?.click();
        expect(window.app.deviceSettings.open).toHaveBeenCalled();

        document.getElementById('mobileEditorSettingsBtn')?.click();
        expect(window.app.editorSettings.open).toHaveBeenCalled();
    });
});
