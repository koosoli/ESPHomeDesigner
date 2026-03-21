import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockDeviceProfiles = {
    reterminal_e1001: {
        name: 'reTerminal E1001 Custom',
        features: {}
    },
    lcd_panel: {
        name: 'LCD Panel',
        features: { lcd: true }
    },
    oled_panel: {
        name: 'OLED Panel',
        features: { oled: true }
    }
};

const mockAppState = {
    deviceModel: 'reterminal_e1001',
    settings: {
        renderingMode: 'direct'
    },
    project: {
        protocolHardware: {}
    }
};

const mockWidgetFactory = {
    getEffectiveDarkMode: vi.fn(() => false)
};

vi.mock('../../js/io/devices.js', () => ({
    DEVICE_PROFILES: mockDeviceProfiles
}));

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/core/widget_factory', () => ({
    WidgetFactory: mockWidgetFactory
}));

describe('device utils', () => {
    let deviceUtils;

    beforeEach(async () => {
        vi.clearAllMocks();
        mockAppState.deviceModel = 'reterminal_e1001';
        mockAppState.settings.renderingMode = 'direct';
        mockAppState.project.protocolHardware = {};
        mockWidgetFactory.getEffectiveDarkMode.mockReturnValue(false);
        deviceUtils = await import('../../js/utils/device.js');
    });

    it('reads the current model from AppState and falls back to the default', () => {
        expect(deviceUtils.getDeviceModel()).toBe('reterminal_e1001');

        mockAppState.deviceModel = '';
        expect(deviceUtils.getDeviceModel()).toBe('reterminal_e1001');
    });

    it('resolves display names from profiles and legacy fallbacks', () => {
        expect(deviceUtils.getDeviceDisplayName('reterminal_e1001')).toBe('reTerminal E1001 Custom');
        expect(deviceUtils.getDeviceDisplayName('trmnl')).toBe('Official TRMNL (ESP32-C3)');
        expect(deviceUtils.getDeviceDisplayName('unknown-model')).toBe('reTerminal E1001 (Monochrome)');
    });

    it('detects RGB devices from lcd and oled feature flags', () => {
        mockAppState.deviceModel = 'lcd_panel';
        expect(deviceUtils.isRGBDevice()).toBe(true);

        mockAppState.deviceModel = 'oled_panel';
        expect(deviceUtils.isRGBDevice()).toBe(true);

        mockAppState.deviceModel = 'reterminal_e1001';
        expect(deviceUtils.isRGBDevice()).toBe(false);
    });

    it('returns protocol palettes for full-color, tri-color, and monochrome modes', () => {
        mockAppState.settings.renderingMode = 'oepl';
        mockAppState.project.protocolHardware = { colorMode: 'full_color' };
        expect(deviceUtils.getAvailableColors()).toContain('magenta');

        mockAppState.project.protocolHardware = { colorMode: 'color_3' };
        expect(deviceUtils.getAvailableColors()).toEqual(['black', 'white', 'red', 'yellow', 'gray']);

        mockAppState.settings.renderingMode = 'opendisplay';
        mockAppState.project.protocolHardware = { colorMode: 'bw' };
        expect(deviceUtils.getAvailableColors()).toEqual(['theme_auto', 'black', 'white', 'gray']);
    });

    it('returns ESPHome palettes for RGB, six-color, photo painter, and monochrome devices', () => {
        mockAppState.settings.renderingMode = 'direct';
        mockAppState.deviceModel = 'lcd_panel';
        expect(deviceUtils.getAvailableColors()).toContain('magenta');

        mockAppState.deviceModel = 'reterminal_e1002';
        expect(deviceUtils.getAvailableColors()).toEqual(['theme_auto', 'black', 'white', 'gray', 'red', 'green', 'blue', 'yellow']);

        mockAppState.deviceModel = 'esp32_s3_photopainter';
        expect(deviceUtils.getAvailableColors()).toEqual(['theme_auto', 'black', 'white', 'gray', 'red', 'green', 'blue', 'yellow']);

        mockAppState.deviceModel = 'reterminal_e1001';
        expect(deviceUtils.getAvailableColors()).toEqual(['theme_auto', 'black', 'white', 'gray']);
    });

    it('returns correct palettes for filename-based color modes (PR 338)', () => {
        mockAppState.settings.renderingMode = 'direct';

        mockAppState.deviceModel = 'custom_board_bwr_yaml';
        expect(deviceUtils.getAvailableColors()).toEqual(["black", "white", "red", "yellow", "gray"]);

        mockAppState.deviceModel = 'my_display_fullcolor_yaml';
        expect(deviceUtils.getAvailableColors()).toContain('magenta');

        mockAppState.deviceModel = 'some_primarycolor_yaml';
        expect(deviceUtils.getAvailableColors()).toEqual(['theme_auto', 'black', 'white', 'gray', 'red', 'green', 'blue', 'yellow']);
    });

    it('maps named, hex, and theme colors to CSS values', () => {
        expect(deviceUtils.getColorStyle('#123456')).toBe('#123456');
        expect(deviceUtils.getColorStyle('0xABCDEF')).toBe('#ABCDEF');
        expect(deviceUtils.getColorStyle('red')).toBe('#ff0000');
        expect(deviceUtils.getColorStyle('transparent')).toBe('transparent');
        expect(deviceUtils.getColorStyle()).toBe('#000000');

        mockWidgetFactory.getEffectiveDarkMode.mockReturnValue(false);
        expect(deviceUtils.getColorStyle('theme_auto')).toBe('#000000');
        expect(deviceUtils.getColorStyle('theme_auto_inverse')).toBe('#ffffff');

        mockWidgetFactory.getEffectiveDarkMode.mockReturnValue(true);
        expect(deviceUtils.getColorStyle('theme_auto')).toBe('#ffffff');
        expect(deviceUtils.getColorStyle('theme_auto_inverse')).toBe('#000000');
    });
});
