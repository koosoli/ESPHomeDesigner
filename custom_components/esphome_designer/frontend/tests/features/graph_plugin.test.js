import { beforeEach, describe, expect, it, vi } from 'vitest';

const {
    mockAppState,
    mockRender,
    mockExportLVGL,
    mockExportDoc,
    mockOnExportComponents,
    mockOnExportEsphome,
    mockOnExportGlobals,
    mockOnExportNumericSensors,
    mockOnExportTextSensors
} = vi.hoisted(() => ({
    mockAppState: {
        updateWidget: vi.fn()
    },
    mockRender: vi.fn(),
    mockExportLVGL: vi.fn(),
    mockExportDoc: vi.fn(),
    mockOnExportComponents: vi.fn(),
    mockOnExportEsphome: vi.fn(),
    mockOnExportGlobals: vi.fn(),
    mockOnExportNumericSensors: vi.fn(),
    mockOnExportTextSensors: vi.fn()
}));

vi.mock('@core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../features/graph/render.js', () => ({
    render: mockRender
}));

vi.mock('../../features/graph/exports.js', () => ({
    exportLVGL: mockExportLVGL,
    exportDoc: mockExportDoc,
    onExportComponents: mockOnExportComponents,
    onExportEsphome: mockOnExportEsphome,
    onExportGlobals: mockOnExportGlobals,
    onExportNumericSensors: mockOnExportNumericSensors,
    onExportTextSensors: mockOnExportTextSensors
}));

import graphPlugin from '../../features/graph/plugin.js';

function createPanel() {
    const panel = {
        labels: [],
        hints: [],
        createSection: vi.fn(),
        endSection: vi.fn(),
        addHint: vi.fn((html) => {
            panel.hints.push(html);
        }),
        addCompactPropertyRow(callback) {
            callback();
        },
        addLabeledInputWithPicker(label, _type, _value, onChange) {
            panel.labels.push(label);
            onChange('sensor.energy');
        },
        addLabeledInput(label, type, _value, onChange) {
            panel.labels.push(label);
            onChange(type === 'number' ? '12' : `${label} value`);
        },
        addCheckbox(label, value, onChange) {
            panel.labels.push(label);
            onChange(!value);
        },
        addSelect(label, _value, options, onChange) {
            panel.labels.push(label);
            const choice = options[options.length - 1];
            onChange(typeof choice === 'object' ? choice.value : choice);
        },
        addColorSelector(label, _value, _colors, onChange) {
            panel.labels.push(label);
            onChange('black');
        },
        addNumberWithSlider(label, _value, _min, _max, onChange) {
            panel.labels.push(label);
            onChange(55);
        },
        addDropShadowButton: vi.fn(),
        getContainer() {
            return document.body;
        }
    };

    return panel;
}

describe('graph plugin', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = '';
    });

    it('exposes the expected plugin metadata and export hooks', () => {
        expect(graphPlugin.id).toBe('graph');
        expect(graphPlugin.supportedModes).toEqual(['lvgl', 'direct']);
        expect(graphPlugin.render).toBe(mockRender);
        expect(graphPlugin.exportLVGL).toBe(mockExportLVGL);
        expect(graphPlugin.export).toBe(mockExportDoc);
        expect(graphPlugin.onExportComponents).toBe(mockOnExportComponents);
        expect(graphPlugin.onExportEsphome).toBe(mockOnExportEsphome);
        expect(graphPlugin.onExportGlobals).toBe(mockOnExportGlobals);
        expect(graphPlugin.onExportNumericSensors).toBe(mockOnExportNumericSensors);
        expect(graphPlugin.onExportTextSensors).toBe(mockOnExportTextSensors);
    });

    it('renders HA-history controls and fixed-axis hints when those options are enabled', () => {
        const panel = createPanel();
        graphPlugin.renderProperties(panel, {
            id: 'graph_1',
            entity_id: '',
            title: '',
            props: {
                use_ha_history: true,
                auto_scale: false,
                border: true,
                continuous: true
            }
        });

        expect(panel.labels).toContain('HA Attribute');
        expect(panel.labels).toContain('Points to keep');
        expect(panel.labels).toContain('Smooth Data (Moving Avg)');
        expect(panel.hints.some((hint) => hint.includes('custom HA template sensor'))).toBe(true);
        expect(panel.hints).toContain('Fixed Y-axis bounds.');
        expect(panel.addDropShadowButton).toHaveBeenCalledWith(panel.getContainer(), 'graph_1');

        expect(mockAppState.updateWidget).toHaveBeenCalledWith('graph_1', { entity_id: 'sensor.energy' });
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('graph_1', { title: 'Title value' });
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('graph_1', expect.objectContaining({
            props: expect.objectContaining({
                history_attribute: 'HA Attribute value'
            })
        }));
    });

    it('renders auto-scale controls and omits HA-history fields when not enabled', () => {
        const panel = createPanel();
        graphPlugin.renderProperties(panel, {
            id: 'graph_2',
            entity_id: 'sensor.power',
            title: 'Power',
            props: {
                use_ha_history: false,
                auto_scale: true,
                border: false,
                continuous: false,
                opacity: 80
            }
        });

        expect(panel.labels).not.toContain('HA Attribute');
        expect(panel.labels).not.toContain('Points to keep');
        expect(panel.labels).toContain('Min Range');
        expect(panel.labels).toContain('Max Range');
        expect(panel.labels).toContain('Opacity (%)');
        expect(panel.hints).toContain('Min/Max inputs override auto-scaling for that bound. Min Range ensures minimum spread.');
        expect(panel.hints).not.toContain('Fixed Y-axis bounds.');

        expect(mockAppState.updateWidget).toHaveBeenCalledWith('graph_2', expect.objectContaining({
            props: expect.objectContaining({
                auto_scale: false
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('graph_2', expect.objectContaining({
            props: expect.objectContaining({
                opacity: 55
            })
        }));
    });
});
