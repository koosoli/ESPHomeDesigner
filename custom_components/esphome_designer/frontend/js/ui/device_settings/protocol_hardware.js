import { AppState } from '../../core/state';
import { DEVICE_PROFILES } from '../../io/devices.js';
import { Logger } from '../../utils/logger.js';

/**
 * Manages protocol-specific hardware settings (OEPL/ODP).
 */
export class ProtocolHardwarePanel {
    constructor(parent) {
        this.parent = parent;

        // Protocol-specific DOM elements
        this.protocolResPreset = document.getElementById('protocolResPreset');
        this.protocolWidth = document.getElementById('protocolWidth');
        this.protocolHeight = document.getElementById('protocolHeight');
        this.protocolColorMode = document.getElementById('protocolColorMode');

        // OEPL settings
        this.oeplEntityIdInput = document.getElementById('oeplEntityId');
        this.oeplDitherInput = document.getElementById('oeplDither');

        // ODP settings
        this.odpEntityIdInput = document.getElementById('odpEntityId');
        this.odpDitherInput = document.getElementById('odpDither');
        this.odpTtlInput = document.getElementById('odpTtl');
    }

    init() {
        this.setupListeners();
    }

    setupListeners() {
        const updateSetting = (key, value) => {
            AppState.updateSettings({ [key]: value });
            Logger.log(`[ProtocolHardwarePanel] Auto-saved ${key}:`, value);
            this.parent.persistToBackend();
        };

        const syncProtocol = () => {
            const width = parseInt(this.protocolWidth?.value) || 400;
            const height = parseInt(this.protocolHeight?.value) || 300;
            const colorMode = this.protocolColorMode?.value || 'bw';

            AppState.updateProtocolHardware({ width, height, colorMode });
        };

        if (this.protocolResPreset) {
            this.protocolResPreset.addEventListener('change', () => {
                const val = this.protocolResPreset.value;
                if (val !== 'custom') {
                    const [w, h] = val.split('x').map(Number);
                    if (this.protocolWidth) this.protocolWidth.value = w;
                    if (this.protocolHeight) this.protocolHeight.value = h;
                    syncProtocol();
                }
            });
        }

        if (this.protocolWidth) this.protocolWidth.addEventListener('input', syncProtocol);
        if (this.protocolHeight) this.protocolHeight.addEventListener('input', syncProtocol);
        if (this.protocolColorMode) this.protocolColorMode.addEventListener('change', syncProtocol);

        // OEPL Settings
        if (this.oeplEntityIdInput) {
            this.oeplEntityIdInput.addEventListener('input', () => {
                updateSetting('oeplEntityId', this.oeplEntityIdInput.value.trim());
            });
        }
        if (this.oeplDitherInput) {
            this.oeplDitherInput.addEventListener('change', () => {
                updateSetting('oeplDither', parseInt(this.oeplDitherInput.value));
            });
        }

        // ODP Settings
        if (this.odpEntityIdInput) {
            this.odpEntityIdInput.addEventListener('input', () => {
                updateSetting('opendisplayEntityId', this.odpEntityIdInput.value.trim());
            });
        }
        if (this.odpDitherInput) {
            this.odpDitherInput.addEventListener('change', () => {
                updateSetting('opendisplayDither', parseInt(this.odpDitherInput.value));
            });
        }
        if (this.odpTtlInput) {
            this.odpTtlInput.addEventListener('input', () => {
                updateSetting('opendisplayTtl', parseInt(this.odpTtlInput.value) || 0);
            });
        }
    }

    populateFields() {
        const ph = (AppState.project && AppState.project.protocolHardware) || { width: 400, height: 300, colorMode: 'bw' };

        if (this.protocolWidth) this.protocolWidth.value = ph.width;
        if (this.protocolHeight) this.protocolHeight.value = ph.height;
        if (this.protocolColorMode) this.protocolColorMode.value = ph.colorMode;

        // Try to match preset
        if (this.protocolResPreset) {
            const res = `${ph.width}x${ph.height}`;
            const options = Array.from(this.protocolResPreset.options).map(o => o.value);
            if (options.includes(res)) {
                this.protocolResPreset.value = res;
            } else {
                this.protocolResPreset.value = 'custom';
            }
        }

        // OEPL settings
        if (this.oeplEntityIdInput) this.oeplEntityIdInput.value = AppState.settings.oeplEntityId || "";
        if (this.oeplDitherInput) this.oeplDitherInput.value = AppState.settings.oeplDither ?? 2;

        // ODP settings
        if (this.odpEntityIdInput) this.odpEntityIdInput.value = AppState.settings.opendisplayEntityId || "";
        if (this.odpDitherInput) this.odpDitherInput.value = AppState.settings.opendisplayDither ?? 2;
        if (this.odpTtlInput) this.odpTtlInput.value = AppState.settings.opendisplayTtl ?? 60;
    }

    /**
     * Updates visibility of strategy groups based on display technology.
     */
    updateStrategyDisplay() {
        const modelId = this.parent.modelInput ? this.parent.modelInput.value : "reterminal_e1001";
        let isLcd = false;

        if (modelId === 'custom') {
            const ch = (AppState.project && AppState.project.state && AppState.project.state.customHardware) || {};
            isLcd = ch.tech === 'lcd';
        } else {
            const profiles = window.DEVICE_PROFILES || DEVICE_PROFILES || {};
            const profile = profiles[modelId];
            isLcd = !!(profile && profile.features && (profile.features.lcd || profile.features.oled));
        }

        if (this.parent.strategyEpaperGroup) {
            this.parent.strategyEpaperGroup.style.display = isLcd ? 'none' : 'flex';
        }
        if (this.parent.strategyLcdGroup) {
            this.parent.strategyLcdGroup.style.display = isLcd ? 'flex' : 'none';
            if (isLcd) {
                const currentStrategy = AppState.settings.lcdEcoStrategy || 'backlight_off';
                const radioToSelect = document.querySelector(`input[name="lcdEcoStrategy"][value="${currentStrategy}"]`);
                if (radioToSelect) radioToSelect.checked = true;
            }

            // Hide "Dim after timeout" if not in LVGL mode
            const currentMode = this.parent.renderingModeInput ? this.parent.renderingModeInput.value : (AppState.settings.renderingMode || 'direct');
            const dimRow = document.getElementById('lcd-strategy-dim-row');
            if (dimRow) {
                dimRow.style.display = (currentMode === 'lvgl') ? 'block' : 'none';
                if (currentMode !== 'lvgl' && AppState.settings.lcdEcoStrategy === 'dim_after_timeout') {
                    AppState.updateSettings({ lcdEcoStrategy: 'backlight_off' });
                    const fallbackRadio = document.querySelector('input[name="lcdEcoStrategy"][value="backlight_off"]');
                    if (fallbackRadio) fallbackRadio.checked = true;
                    this.parent.updateVisibility();
                }
            }
        }

        // Section visibility based on rendering mode
        const mode = this.parent.renderingModeInput?.value || AppState.settings.renderingMode || 'direct';
        if (this.parent.oeplSettingsSection) {
            this.parent.oeplSettingsSection.style.display = (mode === 'oepl') ? 'block' : 'none';
        }
        if (this.parent.odpSettingsSection) {
            this.parent.odpSettingsSection.style.display = (mode === 'opendisplay') ? 'block' : 'none';
        }

        // Inverted colors visibility (E-Paper only)
        if (this.parent.deviceInvertedColorsField) {
            const isESPHome = mode === 'lvgl' || mode === 'direct';
            const profiles = window.DEVICE_PROFILES || DEVICE_PROFILES || {};
            const profile = modelId ? profiles[modelId] : null;
            const isEpaper = !!(profile && profile.features && profile.features.epaper);
            this.parent.deviceInvertedColorsField.style.display = (isESPHome && isEpaper) ? 'block' : 'none';
        }
    }
}


