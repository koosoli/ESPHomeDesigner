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

    return {
        panel: root,
        createdInputs,
        createSection: vi.fn(),
        endSection: vi.fn(),
        addCompactPropertyRow: (fn) => fn(),
        addColorSelector: vi.fn(),
        addCheckbox: vi.fn(),
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
});
