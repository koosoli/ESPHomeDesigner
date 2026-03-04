import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockOn = vi.fn();
const mockSchemaRender = vi.fn();
const mockMultiRender = vi.fn();
const mockGridRender = vi.fn();
const mockLegacyRender = vi.fn();
const mockProtocolRender = vi.fn();

const controlsMethods = {
    addLabeledInput: vi.fn(),
    addSelect: vi.fn(),
    addCheckbox: vi.fn(),
    addHint: vi.fn(),
    addLabeledInputWithPicker: vi.fn(),
    addColorSelector: vi.fn(),
    addColorMixer: vi.fn(),
    addSegmentedControl: vi.fn(),
    addNumberWithSlider: vi.fn(),
    addCompactPropertyRow: vi.fn((fn) => fn()),
    addCommonLVGLProperties: vi.fn(),
    addVisibilityConditions: vi.fn(),
    addPageSelector: vi.fn(),
    addLabeledInputWithDataList: vi.fn(),
    addSectionLabel: vi.fn()
};

const mockAppState = {
    snapEnabled: true,
    selectedWidgetId: null,
    selectedWidgetIds: [],
    settings: { renderingMode: 'direct' },
    entityStates: {
        'sensor.temp': { attributes: { friendly_name: 'Temperature' } }
    },
    setSnapEnabled: vi.fn(),
    updateWidgets: vi.fn(),
    updateWidget: vi.fn(),
    createDropShadow: vi.fn(),
    getSelectedWidgets: vi.fn(() => []),
    getSelectedWidgetIds: vi.fn(() => []),
    getSelectedWidget: vi.fn(() => null),
    getCurrentPage: vi.fn(() => ({ layout: 'absolute' }))
};

vi.mock('../../js/ui/components/property_controls.js', () => ({
    PropertyControls: class {
        constructor() {
            Object.assign(this, controlsMethods);
        }
    }
}));

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/core/plugin_registry', () => ({
    registry: {
        get: vi.fn(() => null)
    }
}));

vi.mock('../../js/core/events.js', () => ({
    on: mockOn,
    EVENTS: {
        SELECTION_CHANGED: 'SELECTION_CHANGED',
        STATE_CHANGED: 'STATE_CHANGED',
        WIDGET_SELECTED: 'WIDGET_SELECTED',
        WIDGETS_SELECTED: 'WIDGETS_SELECTED',
        PAGE_SELECTED: 'PAGE_SELECTED',
        PAGE_UPDATED: 'PAGE_UPDATED',
        SETTINGS_CHANGED: 'SETTINGS_CHANGED'
    }
}));

vi.mock('../../js/core/canvas.js', () => ({
    canvasInstance: null
}));

vi.mock('../../js/core/properties/schema_renderer.js', () => ({
    SchemaRenderer: {
        render: mockSchemaRender
    }
}));

vi.mock('../../js/core/properties/multi_select_renderer.js', () => ({
    MultiSelectRenderer: {
        render: mockMultiRender
    }
}));

vi.mock('../../js/core/properties/grid_renderer.js', () => ({
    GridRenderer: {
        render: mockGridRender
    }
}));

vi.mock('../../js/core/properties/legacy_renderer.js', () => ({
    LegacyRenderer: {
        renderLegacyProperties: mockLegacyRender,
        renderProtocolProperties: mockProtocolRender
    }
}));

describe('PropertiesPanel', () => {
    const mockApp = { pageSettings: {} };

    beforeEach(() => {
        vi.clearAllMocks();
        mockAppState.snapEnabled = true;
        mockAppState.selectedWidgetId = null;
        mockAppState.selectedWidgetIds = [];
        mockAppState.getSelectedWidgetIds.mockReturnValue([]);
        mockAppState.getSelectedWidget.mockReturnValue(null);
        mockAppState.getSelectedWidgets.mockReturnValue([]);
        mockAppState.settings.renderingMode = 'direct';

        document.body.innerHTML = `
            <div id="propertiesPanel"></div>
            <input id="snapToggle" type="checkbox" />
            <input id="lockPositionToggle" type="checkbox" />
        `;
    });

    it('initializes and wires static toggles', async () => {
        const { PropertiesPanel } = await import('../../js/core/properties.js');
        const panel = new PropertiesPanel(mockApp);
        panel.init();

        expect(mockOn).toHaveBeenCalled();

        const snapToggle = document.getElementById('snapToggle');
        expect(snapToggle?.checked).toBe(true);

        snapToggle.checked = false;
        snapToggle.dispatchEvent(new Event('change', { bubbles: true }));
        expect(mockAppState.setSnapEnabled).toHaveBeenCalledWith(false);
    });

    it('renders empty-state message when no widget selected', async () => {
        const { PropertiesPanel } = await import('../../js/core/properties.js');
        const panel = new PropertiesPanel(mockApp);

        panel.render();

        expect(document.getElementById('propertiesPanel')?.textContent).toContain('Select a widget');
    });

    it('uses multi-select renderer when multiple widgets are selected', async () => {
        mockAppState.getSelectedWidgetIds.mockReturnValue(['w1', 'w2']);
        mockAppState.selectedWidgetIds = ['w1', 'w2'];

        const { PropertiesPanel } = await import('../../js/core/properties.js');
        const panel = new PropertiesPanel(mockApp);

        panel.render();

        expect(mockMultiRender).toHaveBeenCalledWith(panel, ['w1', 'w2']);
    });

    it('re-renders into multi-select mode when selection expands but first id stays the same', async () => {
        const widget = {
            id: 'w1',
            type: 'sensor_text',
            x: 10,
            y: 20,
            width: 100,
            height: 40,
            props: {}
        };

        mockAppState.selectedWidgetId = 'w1';
        mockAppState.getSelectedWidget.mockReturnValue(widget);
        mockAppState.getSelectedWidgets.mockReturnValue([widget]);

        const { PropertiesPanel } = await import('../../js/core/properties.js');
        const panel = new PropertiesPanel(mockApp);

        // First render in single-select mode
        mockAppState.getSelectedWidgetIds.mockReturnValue(['w1']);
        mockAppState.selectedWidgetIds = ['w1'];
        panel.render();

        // Expand selection to multi-select while keeping first selected ID
        mockAppState.getSelectedWidgetIds.mockReturnValue(['w1', 'w2']);
        mockAppState.selectedWidgetIds = ['w1', 'w2'];
        panel.render();

        expect(mockMultiRender).toHaveBeenCalledWith(panel, ['w1', 'w2']);
    });

    it('renders single-widget panel and falls back to legacy renderer', async () => {
        const widget = {
            id: 'w1',
            type: 'sensor_text',
            x: 10,
            y: 20,
            width: 100,
            height: 40,
            props: {}
        };

        mockAppState.selectedWidgetId = 'w1';
        mockAppState.selectedWidgetIds = ['w1'];
        mockAppState.getSelectedWidgetIds.mockReturnValue(['w1']);
        mockAppState.getSelectedWidget.mockReturnValue(widget);
        mockAppState.getSelectedWidgets.mockReturnValue([widget]);

        const { PropertiesPanel } = await import('../../js/core/properties.js');
        const panel = new PropertiesPanel(mockApp);

        panel.render();

        const content = document.getElementById('propertiesPanel')?.textContent || '';
        expect(content).toContain('Properties');
        expect(mockGridRender).toHaveBeenCalled();
        expect(mockLegacyRender).toHaveBeenCalled();
        expect(controlsMethods.addVisibilityConditions).toHaveBeenCalled();
    });

    it('auto-populates title from selected entity state', async () => {
        const { PropertiesPanel } = await import('../../js/core/properties.js');
        const panel = new PropertiesPanel(mockApp);

        panel.autoPopulateTitleFromEntity('w1', 'sensor.temp');

        expect(mockAppState.updateWidget).toHaveBeenCalledWith('w1', { title: 'Temperature' });
    });

    it('invokes drop-shadow helper action for selected widgets', async () => {
        const { PropertiesPanel } = await import('../../js/core/properties.js');
        const panel = new PropertiesPanel(mockApp);
        mockAppState.selectedWidgetIds = ['w1'];

        const container = document.createElement('div');
        panel.addDropShadowButton(container, 'w1');

        const btn = container.querySelector('button');
        btn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(mockAppState.createDropShadow).toHaveBeenCalledWith(['w1']);
    });
});
