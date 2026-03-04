import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockEmit = vi.fn();
const mockQuickSearchOpen = vi.fn();

const mockAppState = {
    selectedWidgetIds: ['w1'],
    selectedWidgetId: 'w1',
    showGrid: false,
    showDebugGrid: false,
    showRulers: false,
    isUndoRedoInProgress: false,
    getSelectedWidgets: vi.fn(() => [{ id: 'w1', locked: false }]),
    updateWidgets: vi.fn(),
    setShowGrid: vi.fn((v) => { mockAppState.showGrid = v; }),
    setShowDebugGrid: vi.fn((v) => { mockAppState.showDebugGrid = v; }),
    setShowRulers: vi.fn((v) => { mockAppState.showRulers = v; }),
    selectAllWidgets: vi.fn(),
    selectWidgets: vi.fn(),
    deleteWidget: vi.fn(),
    copyWidget: vi.fn(),
    pasteWidget: vi.fn(),
    undo: vi.fn(),
    redo: vi.fn()
};

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/utils/logger.js', () => ({
    Logger: {
        log: vi.fn(),
        warn: vi.fn(),
        error: vi.fn()
    }
}));

vi.mock('../../js/ui/quick_search.js', () => ({
    quickSearchInstance: {
        open: mockQuickSearchOpen
    }
}));

vi.mock('../../js/core/events.js', () => ({
    emit: mockEmit,
    EVENTS: {
        STATE_CHANGED: 'STATE_CHANGED'
    }
}));

function makeKeyEvent(overrides = {}) {
    const ev = {
        key: '',
        code: '',
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
        altKey: false,
        target: document.body,
        preventDefault: vi.fn(),
        ...overrides
    };
    return ev;
}

describe('KeyboardHandler', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers();

        mockAppState.selectedWidgetIds = ['w1'];
        mockAppState.selectedWidgetId = 'w1';
        mockAppState.showGrid = false;
        mockAppState.showDebugGrid = false;
        mockAppState.showRulers = false;

        document.body.innerHTML = `
            <button id="gridToggleBtn"></button>
            <button id="debugGridToggleBtn"></button>
            <button id="rulersToggleBtn"></button>
            <textarea id="snippetBox"></textarea>
            <input id="inputA" />
        `;

        window.isAutoHighlight = true;
        window.lastHighlightRange = { start: 0, end: 5 };
    });

    it('opens quick search on Shift+Space even from input fields', async () => {
        const { KeyboardHandler } = await import('../../js/core/keyboard.js');
        const handler = new KeyboardHandler();

        const input = document.getElementById('inputA');
        const blurSpy = vi.spyOn(input, 'blur');

        const ev = makeKeyEvent({ shiftKey: true, code: 'Space', target: input });
        handler.handleKeyDown(ev);

        expect(ev.preventDefault).toHaveBeenCalled();
        expect(blurSpy).toHaveBeenCalled();
        expect(mockQuickSearchOpen).toHaveBeenCalled();
    });

    it('deletes selection with Delete key outside inputs', async () => {
        const { KeyboardHandler } = await import('../../js/core/keyboard.js');
        const handler = new KeyboardHandler();

        const ev = makeKeyEvent({ key: 'Delete', target: document.body });
        handler.handleKeyDown(ev);

        expect(ev.preventDefault).toHaveBeenCalled();
        expect(mockAppState.deleteWidget).toHaveBeenCalledWith(null);
    });

    it('copies and pastes in snippet box when auto-highlight is active', async () => {
        const { KeyboardHandler } = await import('../../js/core/keyboard.js');
        const handler = new KeyboardHandler();

        const snippet = /** @type {HTMLTextAreaElement} */ (document.getElementById('snippetBox'));

        const copyEv = makeKeyEvent({ key: 'c', ctrlKey: true, target: snippet });
        handler.handleKeyDown(copyEv);
        expect(copyEv.preventDefault).toHaveBeenCalled();
        expect(mockAppState.copyWidget).toHaveBeenCalled();

        const pasteEv = makeKeyEvent({ key: 'v', ctrlKey: true, target: snippet });
        handler.handleKeyDown(pasteEv);
        expect(pasteEv.preventDefault).toHaveBeenCalled();
        expect(mockAppState.pasteWidget).toHaveBeenCalled();
    });

    it('runs undo and redo flows and resets in-progress flag', async () => {
        const { KeyboardHandler } = await import('../../js/core/keyboard.js');
        const handler = new KeyboardHandler();

        const undoEv = makeKeyEvent({ key: 'z', ctrlKey: true, target: document.body });
        handler.handleKeyDown(undoEv);
        expect(mockAppState.undo).toHaveBeenCalled();
        expect(mockAppState.isUndoRedoInProgress).toBe(true);

        vi.advanceTimersByTime(120);
        expect(mockAppState.isUndoRedoInProgress).toBe(false);

        const redoEv = makeKeyEvent({ key: 'y', ctrlKey: true, target: document.body });
        handler.handleKeyDown(redoEv);
        expect(mockAppState.redo).toHaveBeenCalled();
    });

    it('toggles lock/grid/debug/rulers and updates UI button states', async () => {
        const { KeyboardHandler } = await import('../../js/core/keyboard.js');
        const handler = new KeyboardHandler();

        const lockEv = makeKeyEvent({ key: 'l', ctrlKey: true, target: document.body });
        handler.handleKeyDown(lockEv);
        expect(mockAppState.updateWidgets).toHaveBeenCalledWith(['w1'], { locked: true });

        const gridEv = makeKeyEvent({ key: 'g', target: document.body });
        handler.handleKeyDown(gridEv);
        expect(mockAppState.setShowGrid).toHaveBeenCalledWith(true);
        expect(document.getElementById('gridToggleBtn')?.classList.contains('active')).toBe(true);
        expect(mockEmit).toHaveBeenCalledWith('STATE_CHANGED');

        const debugEv = makeKeyEvent({ key: 'd', target: document.body });
        handler.handleKeyDown(debugEv);
        expect(mockAppState.setShowDebugGrid).toHaveBeenCalledWith(true);
        expect(document.getElementById('debugGridToggleBtn')?.classList.contains('active')).toBe(true);

        const rulersEv = makeKeyEvent({ key: 'r', target: document.body });
        handler.handleKeyDown(rulersEv);
        expect(mockAppState.setShowRulers).toHaveBeenCalledWith(true);
        expect(document.getElementById('rulersToggleBtn')?.classList.contains('active')).toBe(true);
    });

    it('handles Escape by blurring input and clearing selection', async () => {
        const { KeyboardHandler } = await import('../../js/core/keyboard.js');
        const handler = new KeyboardHandler();

        const input = document.getElementById('inputA');
        const blurSpy = vi.spyOn(input, 'blur');
        input.focus();

        const escEv = makeKeyEvent({ key: 'Escape', target: input });
        handler.handleKeyDown(escEv);

        expect(blurSpy).toHaveBeenCalled();
        expect(mockAppState.selectWidgets).toHaveBeenCalledWith([]);
        expect(mockEmit).toHaveBeenCalledWith('STATE_CHANGED');
    });
});
