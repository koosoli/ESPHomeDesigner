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
    let mockApp;

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

        mockApp = {
            canvas: { suppressNextFocus: false },
            pageSettings: { open: vi.fn() },
            deviceSettings: { open: vi.fn() },
            editorSettings: { open: vi.fn() }
        };
    });

    it('initializes and renders pages with current page label', async () => {
        const { Sidebar } = await import('../../js/core/sidebar.js');
        const sidebar = new Sidebar(mockApp);

        sidebar.init();

        const items = document.querySelectorAll('#pageList .item');
        expect(items.length).toBe(2);
        expect(document.getElementById('currentPageName')?.textContent).toBe('Overview');
        expect(mockOn).toHaveBeenCalled();
    });

    it('handles add page and quick search button clicks', async () => {
        const { Sidebar } = await import('../../js/core/sidebar.js');
        const sidebar = new Sidebar(mockApp);
        sidebar.init();

        document.getElementById('addPageBtn')?.click();
        expect(mockAppState.addPage).toHaveBeenCalled();

        document.getElementById('quickSearchBtn')?.click();
        expect(mockQuickSearchOpen).toHaveBeenCalled();
    });

    it('logs global debug clicks while the sidebar is initialized', async () => {
        const { Sidebar } = await import('../../js/core/sidebar.js');
        const sidebar = new Sidebar(mockApp);
        sidebar.init();

        document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(document.getElementById('debug-overlay')?.innerHTML).toContain('Global click: BODY');
    });

    it('toggles the pages section chevron when the header is clicked', async () => {
        const { Sidebar } = await import('../../js/core/sidebar.js');
        const sidebar = new Sidebar(mockApp);
        sidebar.init();

        document.getElementById('pagesHeader')?.click();

        expect(document.getElementById('pagesContent')?.classList.contains('hidden')).toBe(true);
        expect(document.querySelector('#pagesHeader .chevron')?.style.transform).toBe('rotate(-90deg)');
    });

    it('creates widget from palette click and updates state', async () => {
        const { Sidebar } = await import('../../js/core/sidebar.js');
        const sidebar = new Sidebar(mockApp);
        sidebar.init();

        const paletteInner = document.querySelector('#widgetPalette .inner');
        paletteInner?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(mockCreateWidget).toHaveBeenCalledWith('text');
        expect(mockAppState.addWidget).toHaveBeenCalled();
        expect(mockApp.canvas.suppressNextFocus).toBe(true);
    });

    it('handles palette dragstart, empty palette clicks, and widget creation errors', async () => {
        const { Sidebar } = await import('../../js/core/sidebar.js');
        const sidebar = new Sidebar(mockApp);
        sidebar.init();

        const dataTransfer = {
            setData: vi.fn(),
            effectAllowed: ''
        };
        const dragEvent = new Event('dragstart', { bubbles: true });
        Object.defineProperty(dragEvent, 'target', {
            value: document.querySelector('#widgetPalette .item'),
            configurable: true
        });
        Object.defineProperty(dragEvent, 'dataTransfer', {
            value: dataTransfer,
            configurable: true
        });
        document.getElementById('widgetPalette')?.dispatchEvent(dragEvent);

        expect(dataTransfer.setData).toHaveBeenCalledWith('application/widget-type', 'text');
        expect(dataTransfer.effectAllowed).toBe('copy');

        sidebar.handlePaletteClick({ target: document.body });
        expect(mockLogger.log).toHaveBeenCalledWith('Sidebar: No item found');

        mockCreateWidget.mockImplementationOnce(() => {
            throw new Error('bad widget');
        });
        const paletteInner = document.querySelector('#widgetPalette .inner');
        paletteInner?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(mockLogger.error).toHaveBeenCalledWith('Sidebar: Error creating/adding widget', expect.any(Error));
        expect(document.getElementById('debug-overlay')?.innerHTML).toContain('Error: bad widget');
    });

    it('switches pages on widget drag-over and handles widget-id drops', async () => {
        const { Sidebar } = await import('../../js/core/sidebar.js');
        const sidebar = new Sidebar(mockApp);
        sidebar.init();

        const targetItem = /** @type {any} */ (document.querySelectorAll('#pageList .item')[1]);
        vi.spyOn(targetItem, 'getBoundingClientRect').mockReturnValue({ top: 100, height: 40 });

        const dragOverEvent = {
            preventDefault: vi.fn(),
            dataTransfer: {
                types: ['application/widget-id'],
                dropEffect: ''
            },
            clientY: 110
        };
        targetItem.ondragover(dragOverEvent);

        expect(mockAppState.setCurrentPageIndex).toHaveBeenCalledWith(1);
        expect(targetItem.style.backgroundColor).toBe('var(--primary-subtle)');
        expect(dragOverEvent.dataTransfer.dropEffect).toBe('move');

        const dropEvent = {
            preventDefault: vi.fn(),
            dataTransfer: {
                getData: vi.fn((type) => type === 'application/widget-id' ? 'widget-99' : ''),
                types: ['application/widget-id']
            },
            clientY: 110
        };
        targetItem.ondrop(dropEvent);

        expect(mockAppState.moveWidgetToPage).toHaveBeenCalledWith('widget-99', 1);
    });

    it('creates a widget when a widget type is dropped on a page', async () => {
        const { Sidebar } = await import('../../js/core/sidebar.js');
        const sidebar = new Sidebar(mockApp);
        sidebar.init();

        const targetItem = /** @type {any} */ (document.querySelectorAll('#pageList .item')[1]);
        const dropEvent = {
            preventDefault: vi.fn(),
            dataTransfer: {
                getData: vi.fn((type) => type === 'application/widget-type' ? 'text' : ''),
                types: ['application/widget-type']
            },
            clientY: 120
        };

        targetItem.ondrop(dropEvent);

        expect(mockCreateWidget).toHaveBeenCalledWith('text');
        expect(mockAppState.addWidget).toHaveBeenCalledWith(expect.objectContaining({ id: 'w1', x: 40, y: 40 }), 1);
        expect(mockAppState.setCurrentPageIndex).toHaveBeenCalledWith(1);
        expect(mockAppState.selectWidget).toHaveBeenCalledWith('w1', false);
    });

    it('reorders pages based on drop position', async () => {
        const { Sidebar } = await import('../../js/core/sidebar.js');
        const sidebar = new Sidebar(mockApp);

        const target = document.createElement('div');
        vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({
            top: 100,
            height: 40
        });

        sidebar.handlePageReorder(0, 1, 130, target);
        expect(mockAppState.reorderPage).toHaveBeenCalled();
    });

    it('handles page dragstart, dragleave, click, and action buttons', async () => {
        const { Sidebar } = await import('../../js/core/sidebar.js');
        const sidebar = new Sidebar(mockApp);
        sidebar.init();

        const firstItem = /** @type {any} */ (document.querySelector('#pageList .item'));
        const dragTransfer = {
            setData: vi.fn(),
            effectAllowed: ''
        };
        const dragStartEvent = {
            dataTransfer: dragTransfer
        };
        firstItem.ondragstart(dragStartEvent);
        expect(dragTransfer.setData).toHaveBeenCalledWith('text/plain', '0');
        expect(firstItem.style.opacity).toBe('0.5');

        firstItem.style.borderTop = 'x';
        firstItem.style.borderBottom = 'y';
        firstItem.ondragend();
        expect(firstItem.style.opacity).toBe('1');
        expect(firstItem.style.borderTop).toBe('');
        expect(firstItem.style.borderBottom).toBe('');

        sidebar.hoverTimeout = setTimeout(() => {}, 1000);
        sidebar.hoveredPageIndex = 0;
        firstItem.style.backgroundColor = 'red';
        firstItem.ondragleave({ relatedTarget: null });
        expect(sidebar.hoverTimeout).toBeNull();
        expect(sidebar.hoveredPageIndex).toBe(-1);
        expect(firstItem.style.backgroundColor).toBe('');

        firstItem.onclick();
        expect(mockAppState.setCurrentPageIndex).toHaveBeenCalledWith(0, { forceFocus: true });

        const buttons = firstItem.querySelectorAll('button');
        buttons[0]?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        buttons[1]?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        buttons[2]?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(mockApp.pageSettings.open).toHaveBeenCalledWith(0);
        expect(mockAppState.duplicatePage).toHaveBeenCalledWith(0);
        expect(mockAppState.deletePage).not.toHaveBeenCalled();
    });

    it('renames a page from the rendered list on double click', async () => {
        vi.stubGlobal('prompt', vi.fn(() => 'Renamed Page'));
        const { Sidebar } = await import('../../js/core/sidebar.js');
        const sidebar = new Sidebar(mockApp);
        sidebar.init();

        const firstItem = /** @type {any} */ (document.querySelector('#pageList .item'));
        firstItem.ondblclick({ stopPropagation: vi.fn() });

        expect(mockAppState.renamePage).toHaveBeenCalledWith(0, 'Renamed Page');
    });

    it('opens and confirms clear page modal', async () => {
        const { Sidebar } = await import('../../js/core/sidebar.js');
        const sidebar = new Sidebar(mockApp);

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
        const sidebar = new Sidebar(mockApp);

        sidebar.handlePageDelete(1, { name: 'Status' });

        const modal = document.querySelector('.modal-backdrop');
        expect(modal).toBeTruthy();

        const confirm = modal?.querySelector('.confirm-btn');
        confirm?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(mockAppState.deletePage).toHaveBeenCalledWith(1);
    });

    it('falls back to opening the page settings modal when page settings are unavailable', async () => {
        document.body.innerHTML += `<div id="pageSettingsModal" class="hidden"></div>`;
        const { Sidebar } = await import('../../js/core/sidebar.js');
        const sidebar = new Sidebar({});

        sidebar.openPageSettings(0);

        expect(mockLogger.error).toHaveBeenCalled();
        expect(document.getElementById('pageSettingsModal')?.classList.contains('hidden')).toBe(false);
    });

    it('renders current page name as None when there is no active page', async () => {
        mockAppState.getCurrentPage.mockReturnValueOnce(null);
        const { Sidebar } = await import('../../js/core/sidebar.js');
        const sidebar = new Sidebar(mockApp);

        sidebar.render();

        expect(document.getElementById('currentPageName')?.textContent).toBe('None');
    });

    it('toggles mobile panels and opens mobile settings actions', async () => {
        const { Sidebar } = await import('../../js/core/sidebar.js');
        const sidebar = new Sidebar(mockApp);
        sidebar.init();

        document.getElementById('mobileWidgetsBtn')?.click();
        expect(document.querySelector('.sidebar')?.classList.contains('mobile-active')).toBe(true);

        document.getElementById('mobileDeviceBtn')?.click();
        expect(mockApp.deviceSettings.open).toHaveBeenCalled();

        document.getElementById('mobileEditorSettingsBtn')?.click();
        expect(mockApp.editorSettings.open).toHaveBeenCalled();
    });
});
