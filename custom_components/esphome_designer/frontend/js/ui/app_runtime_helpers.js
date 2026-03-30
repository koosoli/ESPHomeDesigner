import { hasHaBackend, isDeployedInHa } from '../utils/env.js';
import { Logger } from '../utils/logger.js';
import { showToast } from '../utils/dom.js';
import { fetchEntityStates, loadLayoutFromBackend, saveLayoutToBackend } from '../io/ha_api.js';
import { handleFileSelect, saveLayoutToFile } from '../io/file_ops.js';

/**
 * @typedef {{
 *   applyEditorTheme: (lightMode: boolean) => void,
 *   open: (section?: string) => void
 * }} EditorSettingsLike
 */

/**
 * @typedef {{
 *   editorSettings: EditorSettingsLike | null,
 *   openDeviceSettings: () => Promise<void>,
 *   openAiPrompt: () => Promise<void>,
 *   openLayoutManager: () => Promise<void>
 * }} GlobalButtonBindings
 */

/**
 * @typedef {{
 *   loadFromLocalStorage: () => void,
 *   refreshAdapter: () => void
 * }} InitialLoadOptions
 */

/**
 * @param {import('../core/state').AppState} appState
 * @param {EditorSettingsLike | null} editorSettings
 */
export function restoreEditorThemePreference(appState, editorSettings) {
    if (!editorSettings) {
        return;
    }

    try {
        const savedTheme = localStorage.getItem('reterminal-editor-theme');
        if (savedTheme === 'light') {
            appState.updateSettings({ editor_light_mode: true });
            editorSettings.applyEditorTheme(true);
            return;
        }
        editorSettings.applyEditorTheme(false);
    } catch (error) {
        Logger.log('Could not load theme preference:', error);
    }
}

/**
 * @param {InitialLoadOptions} options
 * @returns {Promise<void>}
 */
export async function loadInitialProjectState({ loadFromLocalStorage, refreshAdapter }) {
    try {
        if (hasHaBackend()) {
            Logger.log('HA Backend detected attempt. Loading layout...');
            await loadLayoutFromBackend();
            await fetchEntityStates();
        } else {
            Logger.log('Running in standalone/offline mode.');
            loadFromLocalStorage();
        }

        refreshAdapter();
    } catch (error) {
        Logger.error('[App] Failed to load from backend, falling back to local storage:', error);
        loadFromLocalStorage();
        refreshAdapter();
    }
}

/**
 * @param {GlobalButtonBindings} options
 * @returns {void}
 */
export function bindGlobalButtons({
    editorSettings,
    openDeviceSettings,
    openAiPrompt,
    openLayoutManager
}) {
    const saveLayoutBtn = document.getElementById('saveLayoutBtn');
    if (saveLayoutBtn) {
        saveLayoutBtn.addEventListener('click', async () => {
            const saveLocally = (message) => {
                saveLayoutToFile();
                showToast(message, 'info');
            };

            if (!hasHaBackend()) {
                saveLocally('Layout downloaded locally');
                return;
            }

            try {
                const saved = await saveLayoutToBackend();
                if (saved) {
                    showToast('Layout saved to Home Assistant', 'success');
                    return;
                }

                if (!isDeployedInHa()) {
                    saveLocally('Home Assistant save unavailable; layout downloaded locally instead');
                    return;
                }

                showToast('Save failed: Home Assistant backend unavailable', 'error');
            } catch (error) {
                if (!isDeployedInHa()) {
                    saveLocally('Home Assistant save failed; layout downloaded locally instead');
                    return;
                }

                showToast(`Save failed: ${error.message}`, 'error');
            }
        });
    }

    const loadLayoutBtn = document.getElementById('loadLayoutBtn');
    if (loadLayoutBtn) {
        loadLayoutBtn.addEventListener('change', handleFileSelect);
    }

    const importLayoutBtn = document.getElementById('importLayoutBtn');
    if (importLayoutBtn && loadLayoutBtn) {
        importLayoutBtn.addEventListener('click', () => {
            loadLayoutBtn.click();
        });
    }

    const deviceSettingsBtn = document.getElementById('deviceSettingsBtn');
    if (deviceSettingsBtn) {
        Logger.log('Device Settings button found, binding click listener.');
        deviceSettingsBtn.addEventListener('click', async () => {
            Logger.log('Device Settings button clicked.');
            await openDeviceSettings();
        });
    } else {
        Logger.error('Device Settings button NOT found in DOM.');
    }

    const editorSettingsBtn = document.getElementById('editorSettingsBtn');
    if (editorSettingsBtn && editorSettings) {
        editorSettingsBtn.addEventListener('click', () => {
            editorSettings.open();
        });
    }

    const aiPromptBtn = document.getElementById('aiPromptBtn');
    if (aiPromptBtn) {
        aiPromptBtn.addEventListener('click', async () => {
            await openAiPrompt();
        });
    }

    const manageLayoutsBtn = document.getElementById('manageLayoutsBtn');
    if (manageLayoutsBtn) {
        manageLayoutsBtn.addEventListener('click', async () => {
            await openLayoutManager();
        });
    }
}

/**
 * @param {{ focusPage: (index: number, smooth: boolean) => void } | null} canvas
 * @param {number} currentPageIndex
 * @returns {void}
 */
export function scheduleInitialCanvasFocus(canvas, currentPageIndex) {
    setTimeout(() => {
        if (canvas) {
            Logger.log('[App] Forcing initial canvas centering...');
            canvas.focusPage(currentPageIndex, false);
        }
    }, 100);
}
