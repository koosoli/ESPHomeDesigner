import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockOn = vi.fn();
const mockSchemaRender = vi.fn();
const mockMultiRender = vi.fn();
const mockGridRender = vi.fn();
const mockLegacyRender = vi.fn();
const mockProtocolRender = vi.fn();
const mockRegistryGet = vi.fn(() => null);
const mockCanvasInstance = { lassoState: null };

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
        get: mockRegistryGet
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
    canvasInstance: mockCanvasInstance
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
        mockCanvasInstance.lassoState = null;
        mockAppState.snapEnabled = true;
        mockAppState.selectedWidgetId = null;
        mockAppState.selectedWidgetIds = [];
        mockAppState.getSelectedWidgetIds.mockReturnValue([]);
        mockAppState.getSelectedWidget.mockReturnValue(null);
        mockAppState.getSelectedWidgets.mockReturnValue([]);
        mockAppState.settings.renderingMode = 'direct';
        mockRegistryGet.mockReset();
        mockRegistryGet.mockReturnValue(null);

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

    it('renders common LVGL properties before schema-driven LVGL fields', async () => {
        const widget = {
            id: 'w-lvgl',
            type: 'lvgl_button',
            x: 10,
            y: 20,
            width: 100,
            height: 40,
            props: { clickable: true }
        };

        mockRegistryGet.mockReturnValue({
            schema: [{ section: 'Content', fields: [] }]
        });
        mockAppState.selectedWidgetId = 'w-lvgl';
        mockAppState.selectedWidgetIds = ['w-lvgl'];
        mockAppState.getSelectedWidgetIds.mockReturnValue(['w-lvgl']);
        mockAppState.getSelectedWidget.mockReturnValue(widget);
        mockAppState.getSelectedWidgets.mockReturnValue([widget]);

        const { PropertiesPanel } = await import('../../js/core/properties.js');
        const panel = new PropertiesPanel(mockApp);

        panel.render();

        expect(controlsMethods.addCommonLVGLProperties).toHaveBeenCalledWith(widget, widget.props);
        expect(mockSchemaRender).toHaveBeenCalled();
    });

    it('skips rerendering while lasso selection is active', async () => {
        const { PropertiesPanel } = await import('../../js/core/properties.js');
        const panel = new PropertiesPanel(mockApp);
        panel.panel.innerHTML = '<div id="existing-content">keep me</div>';
        mockCanvasInstance.lassoState = { startX: 0, startY: 0 };

        panel.render();

        expect(panel.panel.querySelector('#existing-content')).toBeTruthy();
        expect(mockLegacyRender).not.toHaveBeenCalled();
        expect(mockSchemaRender).not.toHaveBeenCalled();
    });

    it('uses registry renderProperties hooks when schema is not provided', async () => {
        const renderProperties = vi.fn();
        const widget = {
            id: 'w-renderer',
            type: 'custom_widget',
            x: 1,
            y: 2,
            width: 30,
            height: 40,
            props: {}
        };

        mockRegistryGet.mockReturnValue({ renderProperties });
        mockAppState.selectedWidgetId = 'w-renderer';
        mockAppState.selectedWidgetIds = ['w-renderer'];
        mockAppState.getSelectedWidgetIds.mockReturnValue(['w-renderer']);
        mockAppState.getSelectedWidget.mockReturnValue(widget);
        mockAppState.getSelectedWidgets.mockReturnValue([widget]);

        const { PropertiesPanel } = await import('../../js/core/properties.js');
        const panel = new PropertiesPanel(mockApp);

        panel.render();

        expect(renderProperties).toHaveBeenCalledWith(panel, widget);
        expect(mockLegacyRender).not.toHaveBeenCalled();
        expect(mockSchemaRender).not.toHaveBeenCalled();
    });

    it('routes oepl and opendisplay widgets through protocol property rendering', async () => {
        const widget = {
            id: 'w-proto',
            type: 'sensor_text',
            x: 4,
            y: 5,
            width: 60,
            height: 20,
            props: {}
        };

        mockAppState.settings.renderingMode = 'oepl';
        mockAppState.selectedWidgetId = 'w-proto';
        mockAppState.selectedWidgetIds = ['w-proto'];
        mockAppState.getSelectedWidgetIds.mockReturnValue(['w-proto']);
        mockAppState.getSelectedWidget.mockReturnValue(widget);
        mockAppState.getSelectedWidgets.mockReturnValue([widget]);

        const { PropertiesPanel } = await import('../../js/core/properties.js');
        const panel = new PropertiesPanel(mockApp);

        panel.render();

        expect(mockProtocolRender).toHaveBeenCalledWith(panel, widget, 'sensor_text');
        expect(mockLegacyRender).not.toHaveBeenCalled();
    });

    it('preserves focused text inputs inside the panel on no-op rerenders', async () => {
        const widget = {
            id: 'w-focus',
            type: 'sensor_text',
            x: 10,
            y: 20,
            width: 100,
            height: 40,
            props: {}
        };

        mockAppState.selectedWidgetId = 'w-focus';
        mockAppState.selectedWidgetIds = ['w-focus'];
        mockAppState.getSelectedWidgetIds.mockReturnValue(['w-focus']);
        mockAppState.getSelectedWidget.mockReturnValue(widget);
        mockAppState.getSelectedWidgets.mockReturnValue([widget]);

        const { PropertiesPanel } = await import('../../js/core/properties.js');
        const panel = new PropertiesPanel(mockApp);
        panel.render();

        const editor = document.createElement('input');
        editor.className = 'prop-input';
        panel.panel.appendChild(editor);
        editor.focus();

        panel.render();

        expect(mockLegacyRender).toHaveBeenCalledTimes(1);
        expect(panel.panel.contains(editor)).toBe(true);
    });

    it('updates lock toggle state and applies lock changes to the current selection', async () => {
        const selectedWidget = { id: 'w-locked', locked: false };
        mockAppState.selectedWidgetIds = ['w-locked'];
        mockAppState.getSelectedWidgets.mockReturnValue([selectedWidget]);

        const { PropertiesPanel } = await import('../../js/core/properties.js');
        const panel = new PropertiesPanel(mockApp);
        panel.init();

        const lockToggle = /** @type {HTMLInputElement} */ (document.getElementById('lockPositionToggle'));
        panel.render();
        lockToggle.checked = true;
        lockToggle.dispatchEvent(new Event('change', { bubbles: true }));

        expect(lockToggle.disabled).toBe(false);
        expect(mockAppState.updateWidgets).toHaveBeenCalledWith(['w-locked'], { locked: true });
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
