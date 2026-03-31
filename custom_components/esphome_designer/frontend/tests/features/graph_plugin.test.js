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

async function flushAsyncUi() {
    await Promise.resolve();
    await Promise.resolve();
}

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
        vi.useFakeTimers();
        document.body.innerHTML = '';
        Object.defineProperty(window, 'isSecureContext', { value: true, configurable: true });
        Object.defineProperty(navigator, 'clipboard', {
            value: {
                writeText: vi.fn().mockResolvedValue(undefined)
            },
            configurable: true
        });
        Object.defineProperty(document, 'execCommand', {
            value: vi.fn(() => true),
            configurable: true
        });
        Object.defineProperty(URL, 'createObjectURL', {
            value: vi.fn(() => 'blob:test-url'),
            configurable: true
        });
        Object.defineProperty(URL, 'revokeObjectURL', {
            value: vi.fn(),
            configurable: true
        });
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
            entity_id: 'sensor.energy',
            title: '',
            props: {
                use_ha_history: true,
                auto_scale: false,
                border: true,
                continuous: true,
                duration: '2h',
                history_points: 48
            }
        });

        expect(panel.labels).toContain('HA Attribute');
        expect(panel.labels).toContain('Points to keep');
        expect(panel.labels).toContain('Smooth Data (Moving Avg)');
        expect(panel.hints.some((hint) => hint.includes('custom HA template sensor'))).toBe(true);
        expect(panel.hints).toContain('Fixed Y-axis bounds.');
        expect(panel.hints.some((hint) => hint.includes('sensor.graph_history_sensor_energy'))).toBe(true);
        expect(panel.addDropShadowButton).toHaveBeenCalledWith(panel.getContainer(), 'graph_1');

        const buttons = Array.from(document.body.querySelectorAll('button')).map((node) => node.textContent);
        expect(buttons).toContain('Copy HA YAML');
        expect(buttons).toContain('Download YAML');

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
        expect(panel.labels).toContain('Font Family');
        expect(panel.labels).toContain('Font Weight');
        expect(panel.labels).toContain('Font Size');
        expect(panel.hints).toContain('Min/Max inputs override auto-scaling for that bound. Min Range ensures minimum spread.');
        expect(panel.hints).not.toContain('Fixed Y-axis bounds.');
        expect(Array.from(document.body.querySelectorAll('button')).map((node) => node.textContent)).not.toContain('Copy HA YAML');

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

    it('copies the generated HA helper YAML via the secure clipboard path', async () => {
        const panel = createPanel();
        graphPlugin.renderProperties(panel, {
            id: 'graph_copy_secure',
            entity_id: 'sensor.energy',
            title: '',
            props: {
                use_ha_history: true
            }
        });

        const copyButton = Array.from(document.body.querySelectorAll('button'))
            .find((node) => node.textContent === 'Copy HA YAML');

        copyButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await flushAsyncUi();

        expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expect.stringContaining('sensor.graph_history_sensor_energy'));
        expect(copyButton?.textContent).toBe('Copied');

        await vi.advanceTimersByTimeAsync(2000);
        expect(copyButton?.textContent).toBe('Copy HA YAML');
    });

    it('falls back to the legacy copy path and surfaces copy errors in the button label', async () => {
        const panel = createPanel();
        graphPlugin.renderProperties(panel, {
            id: 'graph_copy_fallback',
            entity_id: 'sensor.energy',
            title: '',
            props: {
                use_ha_history: true
            }
        });

        const copyButton = Array.from(document.body.querySelectorAll('button'))
            .find((node) => node.textContent === 'Copy HA YAML');
        const execCommand = /** @type {ReturnType<typeof vi.fn>} */ (document.execCommand);

        navigator.clipboard.writeText.mockRejectedValueOnce(new Error('clipboard denied'));
        copyButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await flushAsyncUi();
        expect(execCommand).toHaveBeenCalledWith('copy');
        expect(copyButton?.textContent).toBe('Copied');

        await vi.advanceTimersByTimeAsync(2000);
        Object.defineProperty(window, 'isSecureContext', { value: false, configurable: true });
        execCommand.mockReturnValueOnce(false);
        copyButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await flushAsyncUi();
        expect(copyButton?.textContent).toBe('Error');

        await vi.advanceTimersByTimeAsync(2000);
        execCommand.mockImplementationOnce(() => {
            throw new Error('exec failure');
        });
        copyButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await flushAsyncUi();
        expect(copyButton?.textContent).toBe('Error');
    });

    it('downloads the helper YAML package and disables helper actions when generation is unavailable', async () => {
        const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
        const panel = createPanel();
        graphPlugin.renderProperties(panel, {
            id: 'graph_download',
            entity_id: 'sensor.energy',
            title: '',
            props: {
                use_ha_history: true
            }
        });

        const buttons = Array.from(document.body.querySelectorAll('button'));
        const downloadButton = buttons.find((node) => node.textContent === 'Download YAML');
        downloadButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(URL.createObjectURL).toHaveBeenCalledTimes(1);
        expect(clickSpy).toHaveBeenCalledTimes(1);
        expect(URL.revokeObjectURL).not.toHaveBeenCalled();
        await vi.runAllTimersAsync();
        expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:test-url');
        clickSpy.mockRestore();

        document.body.innerHTML = '';
        const disabledPanel = createPanel();
        graphPlugin.renderProperties(disabledPanel, {
            id: 'graph_disabled',
            entity_id: 'mqtt:topic/sensor',
            title: '',
            props: {
                use_ha_history: true
            }
        });

        const disabledButtons = Array.from(document.body.querySelectorAll('button'));
        const disabledCopyButton = disabledButtons.find((node) => node.textContent === 'Copy HA YAML');
        const disabledDownloadButton = disabledButtons.find((node) => node.textContent === 'Download YAML');

        expect(disabledCopyButton?.hasAttribute('disabled')).toBe(true);
        expect(disabledDownloadButton?.hasAttribute('disabled')).toBe(true);
        expect(disabledPanel.hints).toContain('Pick a Home Assistant entity first to generate a history helper package. MQTT topics are not supported for this helper.');
    });
});
