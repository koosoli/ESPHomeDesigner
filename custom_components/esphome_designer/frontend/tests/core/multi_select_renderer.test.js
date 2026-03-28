/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockState } = vi.hoisted(() => ({
    mockState: {
        getWidgetById: vi.fn(),
        updateWidgets: vi.fn(),
        updateWidgetsProps: vi.fn(),
        createDropShadow: vi.fn(),
        deleteWidget: vi.fn()
    }
}));

vi.mock('../../js/core/state', () => ({
    AppState: mockState
}));

vi.mock('../../js/utils/device.js', () => ({
    getAvailableColors: vi.fn(() => ['black', 'white'])
}));

import { MultiSelectRenderer } from '../../js/core/properties/multi_select_renderer.js';

function createPanelStub() {
    const root = document.createElement('div');
    const createdInputs = [];
    const createdCheckboxes = [];
    const createdColorSelectors = [];

    return {
        panel: root,
        createdInputs,
        createdCheckboxes,
        createdColorSelectors,
        createSection: vi.fn(),
        endSection: vi.fn(),
        addCompactPropertyRow: (fn) => fn(),
        addColorSelector: vi.fn((label, value, options, onChange) => {
            createdColorSelectors.push({ label, value, options, onChange });
        }),
        addCheckbox: vi.fn((label, value, onChange) => {
            createdCheckboxes.push({ label, value, onChange });
        }),
        addLabeledInput: (label, type, value, onChange) => {
            createdInputs.push({ label, type, value, onChange });
        },
        getContainer: () => root
    };
}

describe('MultiSelectRenderer', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = '';
    });

    it('allows batch editing radius for rectangle-like widgets', () => {
        const widgets = {
            w1: { id: 'w1', type: 'shape_rect', x: 10, y: 10, width: 80, height: 60, props: { radius: 4 } },
            w2: { id: 'w2', type: 'rounded_rect', x: 20, y: 20, width: 90, height: 70, props: { radius: 8 } }
        };

        mockState.getWidgetById.mockImplementation((id) => widgets[id] || null);

        const panel = createPanelStub();
        MultiSelectRenderer.render(panel, ['w1', 'w2']);

        const radiusInput = panel.createdInputs.find((field) => field.label === 'Radius');
        expect(radiusInput).toBeTruthy();
        expect(radiusInput.type).toBe('number');

        radiusInput.onChange('12');
        expect(mockState.updateWidgetsProps).toHaveBeenCalledWith(
            ['w1', 'w2'],
            expect.objectContaining({ radius: 12 })
        );
    });

    it('surfaces shared text defaults and shared appearance actions', () => {
        const widgets = {
            w1: {
                id: 'w1',
                type: 'sensor_text',
                x: 10,
                y: 10,
                width: 80,
                height: 60,
                props: { color: 'black', locked: true }
            },
            w2: {
                id: 'w2',
                type: 'lvgl_label',
                x: 20,
                y: 20,
                width: 90,
                height: 70,
                props: { color: 'black', locked: true }
            }
        };
        const confirmSpy = vi.spyOn(globalThis, 'confirm').mockReturnValue(true);

        mockState.getWidgetById.mockImplementation((id) => widgets[id] || null);

        const panel = createPanelStub();
        MultiSelectRenderer.render(panel, ['w1', 'w2']);

        const fontSizeInput = panel.createdInputs.find((field) => field.label === 'Font Size');
        expect(fontSizeInput).toBeTruthy();
        fontSizeInput.onChange('16');
        expect(mockState.updateWidgetsProps).toHaveBeenCalledWith(
            ['w1', 'w2'],
            expect.objectContaining({ font_size: 16 })
        );

        const colorSelector = panel.createdColorSelectors.find((field) => field.label === 'Color');
        expect(colorSelector?.options).toEqual(['black', 'white']);
        colorSelector?.onChange('white');
        expect(mockState.updateWidgetsProps).toHaveBeenCalledWith(
            ['w1', 'w2'],
            expect.objectContaining({ color: 'white' })
        );

        const lockedCheckbox = panel.createdCheckboxes.find((field) => field.label === 'Locked');
        expect(lockedCheckbox?.value).toBe(true);
        lockedCheckbox?.onChange(false);
        expect(mockState.updateWidgetsProps).toHaveBeenCalledWith(
            ['w1', 'w2'],
            expect.objectContaining({ locked: false })
        );

        const buttons = Array.from(panel.getContainer().querySelectorAll('button'));
        buttons[0]?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        buttons[1]?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(mockState.createDropShadow).toHaveBeenCalledWith(['w1', 'w2']);
        expect(mockState.deleteWidget).toHaveBeenCalled();
        confirmSpy.mockRestore();
    });

    it('bails out when the selected ids do not resolve to widgets', () => {
        mockState.getWidgetById.mockReturnValue(null);
        const panel = createPanelStub();

        MultiSelectRenderer.render(panel, ['missing']);

        expect(panel.createSection).not.toHaveBeenCalled();
        expect(panel.getContainer().children).toHaveLength(0);
    });
});
