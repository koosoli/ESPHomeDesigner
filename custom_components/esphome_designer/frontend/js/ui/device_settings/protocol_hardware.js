import { AppState } from '../../core/state';
import { DEVICE_PROFILES } from '../../io/devices.js';
import { Logger } from '../../utils/logger.js';

/**
 * @param {unknown} value
 * @returns {string}
 */
function normalizeOpenDisplayDeviceId(value) {
    const trimmed = typeof value === 'string' ? value.trim() : '';
    if (!trimmed || trimmed.includes('.') || /\s/.test(trimmed)) {
        return '';
    }
    return trimmed;
}

/**
 * Manages protocol-specific hardware settings (OEPL/ODP).
 */
export class ProtocolHardwarePanel {
    constructor(parent) {
        /** @type {any} */
        this.parent = parent;

        /** @type {HTMLSelectElement | null} */
        this.protocolResPreset = /** @type {HTMLSelectElement | null} */ (document.getElementById('protocolResPreset'));
        /** @type {HTMLInputElement | null} */
        this.protocolWidth = /** @type {HTMLInputElement | null} */ (document.getElementById('protocolWidth'));
        /** @type {HTMLInputElement | null} */
        this.protocolHeight = /** @type {HTMLInputElement | null} */ (document.getElementById('protocolHeight'));
        /** @type {HTMLSelectElement | null} */
        this.protocolColorMode = /** @type {HTMLSelectElement | null} */ (document.getElementById('protocolColorMode'));

        /** @type {HTMLInputElement | null} */
        this.oeplEntityIdInput = /** @type {HTMLInputElement | null} */ (document.getElementById('oeplEntityId'));
        /** @type {HTMLInputElement | HTMLSelectElement | null} */
        this.oeplDitherInput = /** @type {HTMLInputElement | HTMLSelectElement | null} */ (document.getElementById('oeplDither'));

        /** @type {HTMLInputElement | null} */
        this.odpDeviceIdInput = /** @type {HTMLInputElement | null} */ (
            document.getElementById('odpDeviceId')
            || document.getElementById('odpEntityId')
            || document.getElementById('opendisplayEntityId')
        );
        /** @type {HTMLInputElement | HTMLSelectElement | null} */
        this.odpDitherInput = /** @type {HTMLInputElement | HTMLSelectElement | null} */ (
            document.getElementById('odpDither')
            || document.getElementById('opendisplayDither')
        );
        /** @type {HTMLInputElement | null} */
        this.odpTtlInput = /** @type {HTMLInputElement | null} */ (
            document.getElementById('odpTtl')
            || document.getElementById('opendisplayTtl')
        );
    }

    init() {
        this.setupListeners();
    }

    setupListeners() {
        /**
         * @param {string} key
         * @param {string | number} value
         */
        const updateSetting = (key, value) => {
            AppState.updateSettings({ [key]: value });
            Logger.log(`[ProtocolHardwarePanel] Auto-saved ${key}:`, value);
            this.parent.persistToBackend();
        };

        const syncProtocol = () => {
            const width = parseInt(this.protocolWidth?.value || '400', 10) || 400;
            const height = parseInt(this.protocolHeight?.value || '300', 10) || 300;
            const colorMode = this.protocolColorMode?.value || 'bw';

            AppState.updateProtocolHardware({ width, height, colorMode });
        };

        if (this.protocolResPreset) {
            this.protocolResPreset.addEventListener('change', () => {
                const val = this.protocolResPreset?.value || 'custom';
                if (val !== 'custom') {
                    const [w, h] = val.split('x').map(Number);
                    if (this.protocolWidth) this.protocolWidth.value = String(w);
                    if (this.protocolHeight) this.protocolHeight.value = String(h);
                    syncProtocol();
                }
            });
        }

        if (this.protocolWidth) this.protocolWidth.addEventListener('input', syncProtocol);
        if (this.protocolHeight) this.protocolHeight.addEventListener('input', syncProtocol);
        if (this.protocolColorMode) this.protocolColorMode.addEventListener('change', syncProtocol);

        if (this.oeplEntityIdInput) {
            this.oeplEntityIdInput.addEventListener('input', () => {
                updateSetting('oeplEntityId', this.oeplEntityIdInput?.value.trim() || '');
            });
        }
        if (this.oeplDitherInput) {
            this.oeplDitherInput.addEventListener('change', () => {
                updateSetting('oeplDither', parseInt(this.oeplDitherInput?.value || '2', 10));
            });
        }

        if (this.odpDeviceIdInput) {
            this.odpDeviceIdInput.addEventListener('input', () => {
                updateSetting('opendisplayDeviceId', this.odpDeviceIdInput?.value.trim() || '');
            });
        }
        if (this.odpDitherInput) {
            this.odpDitherInput.addEventListener('change', () => {
                updateSetting('opendisplayDither', parseInt(this.odpDitherInput?.value || '2', 10));
            });
        }
        if (this.odpTtlInput) {
            this.odpTtlInput.addEventListener('input', () => {
                updateSetting('opendisplayTtl', parseInt(this.odpTtlInput?.value || '0', 10) || 0);
            });
        }
    }

    populateFields() {
        const ph = (AppState.project && AppState.project.protocolHardware) || { width: 400, height: 300, colorMode: 'bw' };

        if (this.protocolWidth) this.protocolWidth.value = String(ph.width);
        if (this.protocolHeight) this.protocolHeight.value = String(ph.height);
        if (this.protocolColorMode) this.protocolColorMode.value = ph.colorMode;

        if (this.protocolResPreset) {
            const res = `${ph.width}x${ph.height}`;
            const options = Array.from(this.protocolResPreset.options).map((option) => option.value);
            this.protocolResPreset.value = options.includes(res) ? res : 'custom';
        }

        if (this.oeplEntityIdInput) this.oeplEntityIdInput.value = AppState.settings.oeplEntityId || '';
        if (this.oeplDitherInput) this.oeplDitherInput.value = String(AppState.settings.oeplDither ?? 2);

        const odpDeviceId = (typeof AppState.settings.opendisplayDeviceId === 'string' && AppState.settings.opendisplayDeviceId.trim())
            || normalizeOpenDisplayDeviceId(AppState.settings.opendisplayEntityId)
            || '';
        if (this.odpDeviceIdInput) this.odpDeviceIdInput.value = odpDeviceId;
        if (this.odpDitherInput) this.odpDitherInput.value = String(AppState.settings.opendisplayDither ?? 2);
        if (this.odpTtlInput) this.odpTtlInput.value = String(AppState.settings.opendisplayTtl ?? 60);
    }

    /**
     * Updates visibility of strategy groups based on display technology.
     */
    updateStrategyDisplay() {
        const modelId = this.parent.modelInput ? this.parent.modelInput.value : 'reterminal_e1001';
        let isLcd = false;

        if (modelId === 'custom') {
            const ch = (AppState.project && AppState.project.state && AppState.project.state.customHardware) || {};
            isLcd = ch.tech === 'lcd';
        } else {
            const profile = DEVICE_PROFILES[modelId];
            isLcd = !!(profile && profile.features && (profile.features.lcd || profile.features.oled));
        }

        if (this.parent.strategyEpaperGroup) {
            this.parent.strategyEpaperGroup.style.display = isLcd ? 'none' : 'flex';
        }
        if (this.parent.strategyLcdGroup) {
            this.parent.strategyLcdGroup.style.display = isLcd ? 'flex' : 'none';
            if (isLcd) {
                const currentStrategy = AppState.settings.lcdEcoStrategy || 'backlight_off';
                const radioToSelect = /** @type {HTMLInputElement | null} */ (document.querySelector(`input[name="lcdEcoStrategy"][value="${currentStrategy}"]`));
                if (radioToSelect) radioToSelect.checked = true;
            }

            const currentMode = this.parent.renderingModeInput ? this.parent.renderingModeInput.value : (AppState.settings.renderingMode || 'direct');
            const dimRow = /** @type {HTMLElement | null} */ (document.getElementById('lcd-strategy-dim-row'));
            if (dimRow) {
                dimRow.style.display = currentMode === 'lvgl' ? 'block' : 'none';
                if (currentMode !== 'lvgl' && AppState.settings.lcdEcoStrategy === 'dim_after_timeout') {
                    AppState.updateSettings({ lcdEcoStrategy: 'backlight_off' });
                    const fallbackRadio = /** @type {HTMLInputElement | null} */ (document.querySelector('input[name="lcdEcoStrategy"][value="backlight_off"]'));
                    if (fallbackRadio) fallbackRadio.checked = true;
                    this.parent.updateVisibility();
                }
            }
        }

        const mode = this.parent.renderingModeInput?.value || AppState.settings.renderingMode || 'direct';
        if (this.parent.oeplSettingsSection) {
            this.parent.oeplSettingsSection.style.display = mode === 'oepl' ? 'block' : 'none';
        }
        if (this.parent.odpSettingsSection) {
            this.parent.odpSettingsSection.style.display = mode === 'opendisplay' ? 'block' : 'none';
        }

        if (this.parent.deviceInvertedColorsField) {
            const isESPHome = mode === 'lvgl' || mode === 'direct';
            const profile = modelId ? DEVICE_PROFILES[modelId] : null;
            const isEpaper = !!(profile && profile.features && profile.features.epaper);
            this.parent.deviceInvertedColorsField.style.display = (isESPHome && isEpaper) ? 'block' : 'none';
        }
    }
}
