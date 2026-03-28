import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CustomHardwarePanel } from '../../js/ui/device_settings/custom_hardware.js';

// Mock DEVICE_PROFILES
vi.mock('../../js/io/devices.js', () => ({
    DEVICE_PROFILES: {
        'custom_my_board': {
            id: 'custom_my_board',
            isCustomProfile: true,
            name: 'My Custom Board',
            chip: 'esp32-s3',
            shape: 'round',
            resolution: { width: 480, height: 480 },
            features: {
                psram: true,
                epaper: false,
                lcd: true
            },
            displayModel: 'My Model',
            displayPlatform: 'st7701s',
            content: `
spi:
  clk_pin: GPIO18
  mosi_pin: GPIO23
i2c:
  sda: GPIO8
  scl: GPIO9
display:
  - platform: st7701s
    cs_pin: GPIO10
    dc_pin: GPIO11
    reset_pin: GPIO12
    busy_pin: GPIO13
touchscreen:
  - platform: cst816
    interrupt_pin: GPIO4
    reset_pin: GPIO5
output:
  - platform: gpio
    id: bl_pin
    pin: GPIO45
sensor:
  - platform: adc
    id: battery_v
    pin: GPIO1
switch:
  - platform: gpio
    id: battery_enable
    pin: GPIO21
            `
        }
    }
}));

describe('CustomHardwarePanel.loadFromProfile', () => {
    let panel;

    beforeEach(() => {
        // Create dummy DOM elements
        document.body.innerHTML = `
            <div id="customHardwareSection"></div>
            <input id="customProfileName" />
            <select id="customChip"><option value="esp32-s3">esp32-s3</option></select>
            <select id="customTech"><option value="lcd">lcd</option></select>
            <input id="customRes" />
            <select id="customResPreset"><option value="480x480">480x480</option></select>
            <select id="customShape"><option value="round">round</option></select>
            <input type="checkbox" id="customPsram" />
            <select id="customDisplayDriver"><option value="st7701s">st7701s</option></select>
            <input id="customDisplayModel" />
            <div id="customDisplayModelField"></div>
            <select id="customTouchTech"><option value="cst816">cst816</option></select>
            <div id="touchPinsGrid"></div>
            <div id="customProfileEditIndicator"></div>
            <button id="saveCustomProfileBtn">Save Profile</button>
            
            <input id="pin_cs" />
            <input id="pin_dc" />
            <input id="pin_rst" />
            <input id="pin_busy" />
            <input id="pin_clk" />
            <input id="pin_mosi" />
            <input id="pin_backlight" />
            <input id="pin_sda" />
            <input id="pin_scl" />
            <input id="pin_touch_int" />
            <input id="pin_touch_rst" />
            <input id="pin_battery_adc" />
            <input id="pin_battery_enable" />
        `;

        const mockParent = {
            renderingModeInput: { value: 'direct' },
            modelInput: { value: 'custom_my_board' }
        };

        panel = new CustomHardwarePanel(mockParent);
    });

    it('correctly reverse-parses yaml into form fields', () => {
        panel.loadFromProfile('custom_my_board');

        // Check basic properties
        expect(panel.customProfileNameInput.value).toBe('My Custom Board');
        expect(panel.customChip.value).toBe('esp32-s3');
        expect(panel.customTech.value).toBe('lcd');
        expect(panel.customRes.value).toBe('480x480');
        expect(panel.customShape.value).toBe('round');
        expect(panel.customPsram.checked).toBe(true);
        expect(panel.customDisplayDriver.value).toBe('st7701s');
        expect(panel.customDisplayModel.value).toBe('My Model');
        expect(panel.customTouchTech.value).toBe('cst816');

        // Check pins
        expect(document.getElementById('pin_cs').value).toBe('GPIO10');
        expect(document.getElementById('pin_dc').value).toBe('GPIO11');
        expect(document.getElementById('pin_rst').value).toBe('GPIO12');
        expect(document.getElementById('pin_busy').value).toBe('GPIO13');
        expect(document.getElementById('pin_clk').value).toBe('GPIO18');
        expect(document.getElementById('pin_mosi').value).toBe('GPIO23');
        expect(document.getElementById('pin_backlight').value).toBe('GPIO45');
        expect(document.getElementById('pin_sda').value).toBe('GPIO8');
        expect(document.getElementById('pin_scl').value).toBe('GPIO9');
        expect(document.getElementById('pin_touch_int').value).toBe('GPIO4');
        expect(document.getElementById('pin_touch_rst').value).toBe('GPIO5');
        expect(document.getElementById('pin_battery_adc').value).toBe('GPIO1');
        expect(document.getElementById('pin_battery_enable').value).toBe('GPIO21');
    });

    it('shows edit state for saved custom profiles without emoji label text', () => {
        panel.updateVisibility();

        expect(panel.customProfileEditIndicator.style.display).toBe('block');
        expect(panel.saveCustomProfileBtn.textContent).toBe('Update Profile');
        expect(panel.customProfileNameInput.disabled).toBe(true);
    });

    it('extracts top-level blocks and pin values consistently', async () => {
        const { extractYamlPin, extractYamlTopLevelBlock } = await import('../../js/ui/device_settings/custom_hardware.js');
        const yaml = `
display:
  - platform: st7701s
    cs_pin: GPIO10
touchscreen:
  - platform: cst816
    reset_pin: GPIO5
output:
  - id: bl_pin
    pin: GPIO45
`;

        expect(extractYamlPin(yaml, /cs_pin:\s*(GPIO\d+)/i)).toBe('GPIO10');
        expect(extractYamlTopLevelBlock(yaml, 'touchscreen')).toContain('reset_pin: GPIO5');
        expect(extractYamlTopLevelBlock(yaml, 'output')).toContain('pin: GPIO45');
    });
});
