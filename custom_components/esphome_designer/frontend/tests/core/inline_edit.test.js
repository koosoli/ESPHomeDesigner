import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAppState } = vi.hoisted(() => ({
    mockAppState: {
        zoomLevel: 1.5,
        getWidgetById: vi.fn(),
        updateWidget: vi.fn()
    }
}));

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

import { startInlineEdit } from '../../js/core/interactions/inline_edit.js';

describe('inline_edit', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = '<div id="canvas"></div>';
    });

    it('ignores missing widgets or unsupported widget types', () => {
        const canvas = document.getElementById('canvas');
        mockAppState.getWidgetById.mockReturnValueOnce(null);
        startInlineEdit({ canvas }, 'missing');

        mockAppState.getWidgetById.mockReturnValueOnce({ id: 'shape_1', type: 'shape_rect', props: {} });
        startInlineEdit({ canvas }, 'shape_1');

        expect(document.querySelector('textarea')).toBeNull();
        expect(mockAppState.updateWidget).not.toHaveBeenCalled();
    });

    it('creates a styled overlay editor and commits text updates on enter', () => {
        const canvas = document.getElementById('canvas');
        canvas.innerHTML = '<div class="widget" data-id="text_1"></div>';
        const widgetEl = canvas.querySelector('.widget');
        widgetEl.getBoundingClientRect = () => ({
            left: 10,
            top: 20,
            width: 120,
            height: 40,
            right: 130,
            bottom: 60,
            x: 10,
            y: 20,
            toJSON() {}
        });

        mockAppState.getWidgetById.mockReturnValue({
            id: 'text_1',
            type: 'text',
            title: 'Old title',
            props: {
                text: 'Old title',
                font_size: 18,
                font_family: 'Inter',
                font_weight: 700,
                italic: true,
                text_align: 'BOTTOM_RIGHT',
                color: 'red'
            }
        });

        startInlineEdit({ canvas }, 'text_1');

        const textarea = document.querySelector('textarea');
        expect(textarea).toBeTruthy();
        expect(textarea.value).toBe('Old title');
        expect(textarea.style.left).toBe('10px');
        expect(textarea.style.top).toBe('20px');
        expect(textarea.style.fontSize).toBe('27px');
        expect(textarea.style.fontFamily).toContain('Inter');
        expect(textarea.style.fontWeight).toBe('700');
        expect(textarea.style.fontStyle).toBe('italic');
        expect(textarea.style.textAlign).toBe('right');

        textarea.value = 'Updated title';
        Object.defineProperty(textarea, 'scrollHeight', {
            configurable: true,
            value: 65
        });
        textarea.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));

        expect(mockAppState.updateWidget).toHaveBeenCalledWith('text_1', {
            props: expect.objectContaining({
                text: 'Updated title'
            })
        });
        expect(document.querySelector('textarea')).toBeNull();
    });

    it('supports label widgets, cancels on escape, and leaves unchanged text alone', () => {
        const canvas = document.getElementById('canvas');
        canvas.innerHTML = '<div class="widget" data-id="label_1"></div>';
        const widgetEl = canvas.querySelector('.widget');
        widgetEl.getBoundingClientRect = () => ({
            left: 5,
            top: 8,
            width: 10,
            height: 12,
            right: 15,
            bottom: 20,
            x: 5,
            y: 8,
            toJSON() {}
        });

        mockAppState.getWidgetById.mockReturnValue({
            id: 'label_1',
            type: 'label',
            title: 'Status',
            props: {}
        });

        startInlineEdit({ canvas }, 'label_1');
        let textarea = document.querySelector('textarea');
        expect(textarea.style.width).toBe('50px');
        expect(textarea.style.height).toBe('30px');
        expect(textarea.value).toBe('Status');

        textarea.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        expect(document.querySelector('textarea')).toBeNull();
        expect(mockAppState.updateWidget).not.toHaveBeenCalled();

        startInlineEdit({ canvas }, 'label_1');
        textarea = document.querySelector('textarea');
        textarea.dispatchEvent(new FocusEvent('blur', { bubbles: true }));

        expect(mockAppState.updateWidget).not.toHaveBeenCalled();
        expect(document.querySelector('textarea')).toBeNull();
    });
});
