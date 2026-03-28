import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAppState, mockIsLvglWidget } = vi.hoisted(() => ({
    mockAppState: {
        currentPageIndex: 1,
        getCurrentPage: vi.fn(),
        updateWidget: vi.fn(),
        getWidgetById: vi.fn(),
        getCanvasDimensions: vi.fn()
    },
    mockIsLvglWidget: vi.fn(() => false)
}));

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/core/widget_factory', () => ({
    WidgetFactory: {
        isLvglWidget: mockIsLvglWidget
    }
}));

import { GridRenderer } from '../../js/core/properties/grid_renderer.js';

function createPanel() {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const inputs = new Map();
    const selects = new Map();

    return {
        container,
        inputs,
        selects,
        getContainer() {
            return container;
        },
        addLabeledInput(label, _type, value, onChange) {
            inputs.set(label, { value, onChange });
        },
        addSelect(label, value, options, onChange) {
            selects.set(label, { value, options, onChange });
        }
    };
}

describe('GridRenderer', () => {
    let widgets;

    beforeEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = '';

        widgets = {};
        mockAppState.getWidgetById.mockImplementation((id) => widgets[id] || null);
        mockAppState.updateWidget.mockImplementation((id, patch) => {
            const widget = widgets[id];
            if (!widget) return;
            if (patch.props) {
                widget.props = { ...widget.props, ...patch.props };
            }
            Object.entries(patch).forEach(([key, value]) => {
                if (key !== 'props') widget[key] = value;
            });
        });
        mockAppState.getCanvasDimensions.mockReturnValue({ width: 200, height: 400 });
        mockIsLvglWidget.mockReturnValue(false);
    });

    it('prompts to enable grid layout when the page uses absolute positioning', () => {
        const panel = createPanel();
        const pageSettings = { open: vi.fn() };
        mockAppState.getCurrentPage.mockReturnValue({ layout: 'absolute' });

        GridRenderer.render(panel, { id: 'widget_1', props: {} }, 'text', pageSettings);

        expect(panel.container.textContent).toContain('Absolute Positioning mode');
        const button = panel.container.querySelector('button');
        expect(button?.textContent).toContain('Enable Page Grid Layout');

        button?.click();
        expect(pageSettings.open).toHaveBeenCalledWith(1);
    });

    it('updates widget grid props and absolute bounds for non-LVGL widgets in grid mode', () => {
        const panel = createPanel();
        const widget = { id: 'widget_2', props: {}, x: 0, y: 0, width: 10, height: 10 };
        widgets[widget.id] = widget;
        mockAppState.getCurrentPage.mockReturnValue({ layout: '4x2' });

        GridRenderer.render(panel, widget, 'text', { open: vi.fn() });

        panel.inputs.get('Row (0-indexed)').onChange('1');
        panel.inputs.get('Column (0-indexed)').onChange('1');
        panel.inputs.get('Row Span').onChange('2');
        panel.inputs.get('Column Span').onChange('2');

        expect(widget.props.grid_cell_row_pos).toBe(1);
        expect(widget.props.grid_cell_column_pos).toBe(1);
        expect(widget.props.grid_cell_row_span).toBe(2);
        expect(widget.props.grid_cell_column_span).toBe(2);
        expect(widget.x).toBe(100);
        expect(widget.y).toBe(100);
        expect(widget.width).toBe(200);
        expect(widget.height).toBe(200);
    });

    it('adds LVGL align controls and opens grid settings for grid layouts', () => {
        const panel = createPanel();
        const pageSettings = { open: vi.fn() };
        const widget = { id: 'widget_3', props: {}, x: 0, y: 0, width: 10, height: 10 };
        widgets[widget.id] = widget;
        mockAppState.getCurrentPage.mockReturnValue({ layout: '2x2' });
        mockIsLvglWidget.mockReturnValue(true);

        GridRenderer.render(panel, widget, 'lvgl_label', pageSettings);

        expect(panel.selects.has('X Align')).toBe(true);
        expect(panel.selects.has('Y Align')).toBe(true);

        panel.selects.get('X Align').onChange('CENTER');
        panel.selects.get('Y Align').onChange('END');

        expect(widget.props.grid_cell_x_align).toBe('CENTER');
        expect(widget.props.grid_cell_y_align).toBe('END');

        const button = panel.container.querySelector('button');
        expect(button?.textContent).toContain('Open Page Grid Settings');
        button?.click();
        expect(pageSettings.open).toHaveBeenCalledWith(1);
    });
});
