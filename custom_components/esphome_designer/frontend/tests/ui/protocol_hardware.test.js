import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockLogger = {
    log: vi.fn(),
    warn: vi.fn(),
    error: vi.fn()
};

const mockAppState = {
    settings: {
        oeplEntityId: '',
        oeplDither: 2,
        opendisplayDeviceId: '',
        opendisplayEntityId: '',
        opendisplayDither: 2,
        opendisplayTtl: 60,
        lcdEcoStrategy: 'backlight_off',
        renderingMode: 'direct'
    },
    project: {
        protocolHardware: { width: 400, height: 300, colorMode: 'bw' },
        state: {
            customHardware: { tech: 'lcd' }
        }
    },
    updateSettings: vi.fn((updates) => Object.assign(mockAppState.settings, updates)),
    updateProtocolHardware: vi.fn((updates) => {
        mockAppState.project.protocolHardware = {
            ...mockAppState.project.protocolHardware,
            ...updates
        };
    })
};

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/io/devices.js', () => ({
    DEVICE_PROFILES: {
        reterminal_e1001: {
            name: 'reTerminal E1001',
            features: { epaper: true }
        },
        lcd_panel: {
            name: 'LCD Panel',
            features: { lcd: true }
        },
        oled_panel: {
            name: 'OLED Panel',
            features: { oled: true }
        }
    }
}));

vi.mock('../../js/utils/logger.js', () => ({
    Logger: mockLogger
}));

describe('ProtocolHardwarePanel', () => {
    let parent;

    beforeEach(() => {
        vi.clearAllMocks();
        mockAppState.settings.oeplEntityId = '';
        mockAppState.settings.oeplDither = 2;
        mockAppState.settings.opendisplayDeviceId = '';
        mockAppState.settings.opendisplayEntityId = '';
        mockAppState.settings.opendisplayDither = 2;
        mockAppState.settings.opendisplayTtl = 60;
        mockAppState.settings.lcdEcoStrategy = 'backlight_off';
        mockAppState.settings.renderingMode = 'direct';
        mockAppState.project.protocolHardware = { width: 400, height: 300, colorMode: 'bw' };
        mockAppState.project.state.customHardware = { tech: 'lcd' };

        document.body.innerHTML = `
            <select id="protocolResPreset">
                <option value="400x300">400x300</option>
                <option value="800x480">800x480</option>
                <option value="custom">custom</option>
            </select>
            <input id="protocolWidth" value="400" />
            <input id="protocolHeight" value="300" />
            <select id="protocolColorMode">
                <option value="bw">bw</option>
                <option value="gray">gray</option>
            </select>

            <input id="oeplEntityId" value="" />
            <select id="oeplDither">
                <option value="1">1</option>
                <option value="2" selected>2</option>
                <option value="4">4</option>
            </select>

            <input id="odpDeviceId" value="" />
            <select id="odpDither">
                <option value="1">1</option>
                <option value="2" selected>2</option>
                <option value="3">3</option>
            </select>
            <input id="odpTtl" value="60" />

            <div id="lcd-strategy-dim-row"></div>
            <input type="radio" name="lcdEcoStrategy" value="backlight_off" />
            <input type="radio" name="lcdEcoStrategy" value="dim_after_timeout" />
        `;

        parent = {
            persistToBackend: vi.fn(),
            updateVisibility: vi.fn(),
            modelInput: /** @type {HTMLSelectElement} */ ({
                value: 'reterminal_e1001'
            }),
            renderingModeInput: /** @type {HTMLSelectElement} */ ({
                value: 'direct'
            }),
            strategyEpaperGroup: document.createElement('div'),
            strategyLcdGroup: document.createElement('div'),
            oeplSettingsSection: document.createElement('div'),
            odpSettingsSection: document.createElement('div'),
            deviceInvertedColorsField: document.createElement('div')
        };
    });

    it('syncs protocol hardware inputs and persists protocol-specific settings', async () => {
        const { ProtocolHardwarePanel } = await import('../../js/ui/device_settings/protocol_hardware.js');
        const panel = new ProtocolHardwarePanel(parent);
        panel.init();

        const preset = /** @type {HTMLSelectElement} */ (document.getElementById('protocolResPreset'));
        const width = /** @type {HTMLInputElement} */ (document.getElementById('protocolWidth'));
        const height = /** @type {HTMLInputElement} */ (document.getElementById('protocolHeight'));
        const colorMode = /** @type {HTMLSelectElement} */ (document.getElementById('protocolColorMode'));
        const oeplEntity = /** @type {HTMLInputElement} */ (document.getElementById('oeplEntityId'));
        const oeplDither = /** @type {HTMLSelectElement} */ (document.getElementById('oeplDither'));
        const odpDevice = /** @type {HTMLInputElement} */ (document.getElementById('odpDeviceId'));
        const odpDither = /** @type {HTMLSelectElement} */ (document.getElementById('odpDither'));
        const odpTtl = /** @type {HTMLInputElement} */ (document.getElementById('odpTtl'));

        preset.value = '800x480';
        preset.dispatchEvent(new Event('change'));
        expect(width.value).toBe('800');
        expect(height.value).toBe('480');
        expect(mockAppState.updateProtocolHardware).toHaveBeenLastCalledWith({ width: 800, height: 480, colorMode: 'bw' });

        width.value = '640';
        width.dispatchEvent(new Event('input'));
        expect(mockAppState.updateProtocolHardware).toHaveBeenLastCalledWith({ width: 640, height: 480, colorMode: 'bw' });

        colorMode.value = 'gray';
        colorMode.dispatchEvent(new Event('change'));
        expect(mockAppState.updateProtocolHardware).toHaveBeenLastCalledWith({ width: 640, height: 480, colorMode: 'gray' });

        oeplEntity.value = '  sensor.oepl  ';
        oeplEntity.dispatchEvent(new Event('input'));
        expect(mockAppState.updateSettings).toHaveBeenCalledWith({ oeplEntityId: 'sensor.oepl' });

        oeplDither.value = '4';
        oeplDither.dispatchEvent(new Event('change'));
        expect(mockAppState.updateSettings).toHaveBeenCalledWith({ oeplDither: 4 });

        odpDevice.value = ' 95b2d0433f2c26d08088d6296a00a70d ';
        odpDevice.dispatchEvent(new Event('input'));
        expect(mockAppState.updateSettings).toHaveBeenCalledWith({ opendisplayDeviceId: '95b2d0433f2c26d08088d6296a00a70d' });

        odpDither.value = '3';
        odpDither.dispatchEvent(new Event('change'));
        expect(mockAppState.updateSettings).toHaveBeenCalledWith({ opendisplayDither: 3 });

        odpTtl.value = '90';
        odpTtl.dispatchEvent(new Event('input'));
        expect(mockAppState.updateSettings).toHaveBeenCalledWith({ opendisplayTtl: 90 });
        expect(parent.persistToBackend).toHaveBeenCalledTimes(5);
        expect(mockLogger.log).toHaveBeenCalled();
    });

    it('populates fields from protocol hardware state and picks custom presets when needed', async () => {
        const { ProtocolHardwarePanel } = await import('../../js/ui/device_settings/protocol_hardware.js');
        const panel = new ProtocolHardwarePanel(parent);
        mockAppState.project.protocolHardware = { width: 123, height: 456, colorMode: 'gray' };
        mockAppState.settings.oeplEntityId = 'sensor.oepl';
        mockAppState.settings.oeplDither = 4;
        mockAppState.settings.opendisplayDeviceId = '95b2d0433f2c26d08088d6296a00a70d';
        mockAppState.settings.opendisplayDither = 3;
        mockAppState.settings.opendisplayTtl = 90;

        panel.populateFields();

        expect(document.getElementById('protocolWidth')?.value).toBe('123');
        expect(document.getElementById('protocolHeight')?.value).toBe('456');
        expect(document.getElementById('protocolColorMode')?.value).toBe('gray');
        expect(document.getElementById('protocolResPreset')?.value).toBe('custom');
        expect(document.getElementById('oeplEntityId')?.value).toBe('sensor.oepl');
        expect(document.getElementById('oeplDither')?.value).toBe('4');
        expect(document.getElementById('odpDeviceId')?.value).toBe('95b2d0433f2c26d08088d6296a00a70d');
        expect(document.getElementById('odpDither')?.value).toBe('3');
        expect(document.getElementById('odpTtl')?.value).toBe('90');
    });

    it('accepts legacy ODP device ids but ignores legacy entity ids when populating fields', async () => {
        const { ProtocolHardwarePanel } = await import('../../js/ui/device_settings/protocol_hardware.js');
        const panel = new ProtocolHardwarePanel(parent);

        mockAppState.settings.opendisplayDeviceId = '';
        mockAppState.settings.opendisplayEntityId = '95b2d0433f2c26d08088d6296a00a70d';
        panel.populateFields();
        expect(document.getElementById('odpDeviceId')?.value).toBe('95b2d0433f2c26d08088d6296a00a70d');

        mockAppState.settings.opendisplayEntityId = 'opendisplay.e0:72:a1:f9:00:75';
        panel.populateFields();
        expect(document.getElementById('odpDeviceId')?.value).toBe('');
    });

    it('updates strategy visibility for custom LCD hardware and resets invalid dim strategy outside LVGL', async () => {
        const { ProtocolHardwarePanel } = await import('../../js/ui/device_settings/protocol_hardware.js');
        const panel = new ProtocolHardwarePanel(parent);
        parent.modelInput.value = 'custom';
        parent.renderingModeInput.value = 'direct';
        mockAppState.project.state.customHardware = { tech: 'lcd' };
        mockAppState.settings.lcdEcoStrategy = 'dim_after_timeout';

        panel.updateStrategyDisplay();

        expect(parent.strategyEpaperGroup.style.display).toBe('none');
        expect(parent.strategyLcdGroup.style.display).toBe('flex');
        expect(document.getElementById('lcd-strategy-dim-row')?.style.display).toBe('none');
        expect(mockAppState.updateSettings).toHaveBeenCalledWith({ lcdEcoStrategy: 'backlight_off' });
        expect(/** @type {HTMLInputElement} */ (document.querySelector('input[name="lcdEcoStrategy"][value="backlight_off"]')).checked).toBe(true);
        expect(parent.updateVisibility).toHaveBeenCalled();
    });

    it('shows protocol sections and inverted-color settings for the active rendering mode', async () => {
        const { ProtocolHardwarePanel } = await import('../../js/ui/device_settings/protocol_hardware.js');
        const panel = new ProtocolHardwarePanel(parent);
        parent.modelInput.value = 'reterminal_e1001';

        parent.renderingModeInput.value = 'oepl';
        panel.updateStrategyDisplay();
        expect(parent.strategyEpaperGroup.style.display).toBe('flex');
        expect(parent.strategyLcdGroup.style.display).toBe('none');
        expect(parent.oeplSettingsSection.style.display).toBe('block');
        expect(parent.odpSettingsSection.style.display).toBe('none');
        expect(parent.deviceInvertedColorsField.style.display).toBe('none');

        parent.renderingModeInput.value = 'opendisplay';
        panel.updateStrategyDisplay();
        expect(parent.oeplSettingsSection.style.display).toBe('none');
        expect(parent.odpSettingsSection.style.display).toBe('block');

        parent.renderingModeInput.value = 'direct';
        panel.updateStrategyDisplay();
        expect(parent.deviceInvertedColorsField.style.display).toBe('block');
    });
});
