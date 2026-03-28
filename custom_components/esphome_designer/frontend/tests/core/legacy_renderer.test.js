import { beforeEach, describe, expect, it, vi } from 'vitest';

const {
    mockPopulateTitle,
    mockRenderProtocolPropertiesImpl,
    mockRenderLegacyPropertiesImpl
} = vi.hoisted(() => ({
    mockPopulateTitle: vi.fn(),
    mockRenderProtocolPropertiesImpl: vi.fn(),
    mockRenderLegacyPropertiesImpl: vi.fn()
}));

vi.mock('../../js/core/properties/legacy_renderer_helpers.js', () => ({
    autoPopulateTitleFromEntity: mockPopulateTitle
}));

vi.mock('../../js/core/properties/legacy_renderer_protocol.js', () => ({
    renderProtocolProperties: mockRenderProtocolPropertiesImpl
}));

vi.mock('../../js/core/properties/legacy_renderer_widget_properties.js', () => ({
    renderLegacyProperties: mockRenderLegacyPropertiesImpl
}));

import { LegacyRenderer } from '../../js/core/properties/legacy_renderer.js';

describe('LegacyRenderer', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('delegates title autopopulation to the shared helper', () => {
        LegacyRenderer.autoPopulateTitleFromEntity('widget-1', 'sensor.kitchen');
        expect(mockPopulateTitle).toHaveBeenCalledWith('widget-1', 'sensor.kitchen');
    });

    it('delegates protocol property rendering to the protocol helper', () => {
        const panel = { panel: document.createElement('div') };
        const widget = { id: 'widget-2', props: {} };

        LegacyRenderer.renderProtocolProperties(panel, widget, 'graph');

        expect(mockRenderProtocolPropertiesImpl).toHaveBeenCalledWith(panel, widget, 'graph');
    });

    it('delegates legacy property rendering to the widget helper', () => {
        const panel = { panel: document.createElement('div') };
        const widget = { id: 'widget-3', props: {} };

        LegacyRenderer.renderLegacyProperties(panel, widget, 'sensor_text');

        expect(mockRenderLegacyPropertiesImpl).toHaveBeenCalledWith(panel, widget, 'sensor_text');
    });
});
