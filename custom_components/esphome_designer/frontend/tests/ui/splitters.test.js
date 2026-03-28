import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockLogger = {
    log: vi.fn(),
    warn: vi.fn()
};

vi.mock('../../js/utils/logger.js', () => ({
    Logger: mockLogger
}));

function setReadyState(value) {
    Object.defineProperty(document, 'readyState', {
        configurable: true,
        value
    });
}

async function loadSplittersModule() {
    vi.resetModules();
    await import('../../js/ui/splitters.js');
}

describe('splitters', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = '';
        setReadyState('complete');
    });

    it('retries when the splitter layout is not available yet', async () => {
        const timeoutSpy = vi.spyOn(global, 'setTimeout');

        await loadSplittersModule();

        expect(mockLogger.warn).not.toHaveBeenCalled();
        expect(timeoutSpy).toHaveBeenCalledWith(expect.any(Function), 100);
    });

    it('warns and retries when the app shell exists but splitter elements are still missing', async () => {
        document.body.innerHTML = `<div class="app-content"></div>`;
        const timeoutSpy = vi.spyOn(global, 'setTimeout');

        await loadSplittersModule();

        expect(mockLogger.warn).toHaveBeenCalledWith('[Splitters] Layout elements not found, retrying...');
        expect(timeoutSpy).toHaveBeenCalledWith(expect.any(Function), 500);
    });

    it('resizes sidebar, right panel, and code panel from drag events', async () => {
        document.body.innerHTML = `
            <div class="app-content">
              <div class="sidebar" style="min-width:100px; max-width:800px;"></div>
              <div id="resizer-left"></div>
              <div class="right-panel" style="min-width:120px; max-width:700px;"></div>
              <div id="resizer-right"></div>
              <div class="code-panel" style="min-height:50px; max-height:600px;"></div>
              <div id="resizer-bottom"></div>
            </div>
        `;

        const sidebar = document.querySelector('.sidebar');
        const rightPanel = document.querySelector('.right-panel');
        const codePanel = document.querySelector('.code-panel');
        const leftResizer = document.getElementById('resizer-left');
        const rightResizer = document.getElementById('resizer-right');
        const bottomResizer = document.getElementById('resizer-bottom');
        const dispatchSpy = vi.spyOn(window, 'dispatchEvent');

        Object.defineProperty(sidebar, 'offsetWidth', { configurable: true, value: 300 });
        Object.defineProperty(rightPanel, 'offsetWidth', { configurable: true, value: 320 });
        Object.defineProperty(codePanel, 'offsetHeight', { configurable: true, value: 200 });

        await loadSplittersModule();

        leftResizer.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: 100 }));
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 160 }));
        expect(sidebar.style.width).toBe('360px');

        window.dispatchEvent(new MouseEvent('mouseup'));
        expect(document.body.style.cursor).toBe('default');
        expect(document.body.style.userSelect).toBe('');

        rightResizer.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: 400 }));
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 350 }));
        expect(rightPanel.style.width).toBe('370px');

        bottomResizer.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientY: 500 }));
        window.dispatchEvent(new MouseEvent('mousemove', { clientY: 450 }));
        expect(codePanel.style.height).toBe('250px');

        expect(mockLogger.log).toHaveBeenCalledWith('[Splitters] Initializing draggable panels...');
        expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({ type: 'resize' }));
    });

    it('waits for DOMContentLoaded when the document is still loading', async () => {
        document.body.innerHTML = `
            <div class="app-content">
              <div class="sidebar" style="min-width:100px; max-width:800px;"></div>
              <div id="resizer-left"></div>
              <div class="right-panel" style="min-width:120px; max-width:700px;"></div>
              <div id="resizer-right"></div>
            </div>
        `;
        setReadyState('loading');

        await loadSplittersModule();

        document.dispatchEvent(new Event('DOMContentLoaded'));
        expect(mockLogger.log).toHaveBeenCalledWith('[Splitters] Initializing draggable panels...');
    });
});
