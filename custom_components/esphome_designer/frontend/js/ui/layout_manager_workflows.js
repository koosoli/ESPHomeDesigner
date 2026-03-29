import { Logger } from '../utils/logger.js';
import { AppState } from '../core/state';
import { getHaHeaders, haFetch } from '../io/ha_api.js';
import { hasHaBackend, HA_API_BASE } from '../utils/env.js';
import { loadLayoutIntoState } from '../io/yaml_import';
import { emit, EVENTS } from '../core/events.js';
import { DEVICE_PROFILES } from '../io/devices.js';
import {
    createLayoutRequest,
    deleteLayoutRequest,
    fetchLayout,
    fetchLayouts,
    importLayoutRequest,
    sleep
} from './layout_manager_api.js';

/**
 * @param {unknown} err
 * @returns {string}
 */
function getErrorMessage(err) {
    return err instanceof Error ? err.message : String(err);
}

/** @returns {string} */
function getHaApiBase() {
    return HA_API_BASE || '';
}

/**
 * @param {{ layouts: any[], currentLayoutId: string, setStatus: (message: string, type?: 'success' | 'error' | 'info') => void, renderLayoutList: () => void }} manager
 */
export async function loadLayouts(manager) {
    if (!hasHaBackend()) {
        manager.setStatus('Not connected to Home Assistant', 'error');
        return;
    }

    try {
        const data = await fetchLayouts(getHaApiBase());
        manager.layouts = data.layouts || [];

        if (data.last_active_layout_id && manager.layouts.some((layout) => layout.id === data.last_active_layout_id)) {
            if (!AppState?.currentLayoutId || AppState.currentLayoutId === 'reterminal_e1001') {
                const lastActiveExists = manager.layouts.find((layout) => layout.id === data.last_active_layout_id);
                if (lastActiveExists && data.last_active_layout_id !== AppState?.currentLayoutId) {
                    Logger.log(`[LayoutManager] Syncing to last active layout: ${data.last_active_layout_id}`);
                    manager.currentLayoutId = data.last_active_layout_id;
                    if (AppState && typeof AppState.setCurrentLayoutId === 'function') {
                        AppState.setCurrentLayoutId(data.last_active_layout_id);
                    }
                }
            }
        }

        manager.renderLayoutList();
    } catch (err) {
        Logger.error('[LayoutManager] Error loading layouts:', err);
        manager.setStatus('Failed to load layouts', 'error');
    }
}

/**
 * @param {{ currentLayoutId: string, setStatus: (message: string, type?: 'success' | 'error' | 'info') => void, renderLayoutList: () => void, close: () => void }} manager
 * @param {string} layoutId
 */
export async function loadLayout(manager, layoutId) {
    if (!hasHaBackend()) return;

    try {
        manager.setStatus('Loading layout...', 'info');
        const layout = await fetchLayout(getHaApiBase(), layoutId);

        if (!layout.device_id) {
            layout.device_id = layoutId;
        }

        manager.currentLayoutId = layoutId;
        if (AppState && typeof AppState.setCurrentLayoutId === 'function') {
            AppState.setCurrentLayoutId(layoutId);
            Logger.log(`[LayoutManager] Set currentLayoutId to: ${layoutId}`);
        }

        const canvas = document.getElementById('canvas');
        if (canvas) {
            const grid = canvas.querySelector('.canvas-grid');
            canvas.innerHTML = '';
            if (grid) canvas.appendChild(grid);
            Logger.log('[LayoutManager] Cleared canvas before loading layout');
        }

        document.querySelectorAll('.graph-axis-label').forEach((el) => el.remove());

        if (typeof loadLayoutIntoState === 'function') {
            loadLayoutIntoState(layout);
        }

        if (AppState && AppState.currentLayoutId !== layoutId) {
            AppState.setCurrentLayoutId(layoutId);
            Logger.log(`[LayoutManager] Re-set currentLayoutId to: ${layoutId} (was changed by loadLayoutIntoState)`);
        }

        if (typeof emit === 'function' && typeof EVENTS !== 'undefined') {
            emit(EVENTS.LAYOUT_IMPORTED, layout);
        }

        manager.setStatus(`Loaded: ${layout.name || layoutId}`, 'success');
        manager.renderLayoutList();
        setTimeout(() => manager.close(), 500);
    } catch (err) {
        Logger.error('[LayoutManager] Error loading layout:', err);
        manager.setStatus('Failed to load layout', 'error');
    }
}

/**
 * @param {{ setStatus: (message: string, type?: 'success' | 'error' | 'info') => void }} manager
 * @param {string} layoutId
 */
export async function exportLayout(manager, layoutId) {
    if (!hasHaBackend()) return;

    /** @type {string | null} */
    let objectUrl = null;
    try {
        const url = `${HA_API_BASE}/export?id=${layoutId}`;
        const response = await haFetch(url, {
            headers: getHaHeaders()
        });
        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(data.error || `Export failed: ${response.status}`);
        }

        const layout = await response.json();
        const blob = new Blob([JSON.stringify(layout, null, 2)], {
            type: 'application/json'
        });
        objectUrl = URL.createObjectURL(blob);

        const anchor = document.createElement('a');
        anchor.href = objectUrl;
        anchor.download = `${layoutId}_layout.json`;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        manager.setStatus('Export started...', 'success');
    } catch (err) {
        Logger.error('[LayoutManager] Error exporting layout:', err);
        manager.setStatus('Failed to export layout', 'error');
    } finally {
        if (objectUrl) {
            URL.revokeObjectURL(objectUrl);
        }
    }
}

/**
 * @param {{ setStatus: (message: string, type?: 'success' | 'error' | 'info') => void, loadLayouts: () => Promise<void>, layouts: any[] }} manager
 * @param {string} layoutId
 * @param {string} layoutName
 */
export async function deleteLayout(manager, layoutId, layoutName) {
    if (!hasHaBackend()) return;
    if (!confirm(`Are you sure you want to delete "${layoutName}"?\n\nThis cannot be undone.`)) return;

    manager.setStatus('Deleting layout...', 'info');

    try {
        const resp = await deleteLayoutRequest(getHaApiBase(), layoutId);
        if (!resp.ok) {
            const data = await resp.json().catch(() => ({}));
            if (data.error === 'cannot_delete_last_layout') {
                manager.setStatus('Cannot delete the last layout', 'error');
                return;
            }
            throw new Error(data.error || `Delete failed: ${resp.status}`);
        }

        manager.setStatus(`Deleted: ${layoutName}`, 'success');
        await manager.loadLayouts();
    } catch (err) {
        Logger.warn('[LayoutManager] Network error during delete, verifying if operation completed...');
        await sleep(1500);
        await manager.loadLayouts();

        const stillExists = manager.layouts.some((layout) => layout.id === layoutId);
        if (!stillExists) {
            Logger.log('[LayoutManager] Layout was successfully deleted (verified after refresh)');
            manager.setStatus(`Deleted: ${layoutName}`, 'success');
        } else {
            Logger.error('[LayoutManager] Error deleting layout:', err);
            manager.setStatus('Failed to delete layout', 'error');
        }
    }
}

/**
 * @param {{ layouts: any[], setStatus: (message: string, type?: 'success' | 'error' | 'info') => void, loadLayouts: () => Promise<void>, loadLayout: (layoutId: string) => Promise<void> }} manager
 * @param {string} name
 * @param {string} [deviceModel="reterminal_e1001"]
 */
export async function createLayout(manager, name, deviceModel = 'reterminal_e1001') {
    if (!hasHaBackend()) return;

    let baseId = name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
    if (!baseId) baseId = 'layout';
    const id = `${baseId}_${Date.now()}`;

    manager.setStatus('Creating layout...', 'info');
    let createSucceeded = false;

    try {
        const resp = await createLayoutRequest(getHaApiBase(), {
            id,
            name,
            device_type: deviceModel,
            device_model: deviceModel
        });
        if (!resp.ok) {
            const data = await resp.json().catch(() => ({}));
            throw new Error(data.error || `Create failed: ${resp.status}`);
        }
        createSucceeded = true;
    } catch (err) {
        Logger.warn('[LayoutManager] Network error during create, verifying if operation completed...');
        await sleep(1500);
        await manager.loadLayouts();

        const nowExists = manager.layouts.some((layout) => layout.id === id);
        if (nowExists) {
            Logger.log(`[LayoutManager] Layout was successfully created (verified after refresh)`);
            createSucceeded = true;
        } else {
            Logger.error('[LayoutManager] Error creating layout:', err);
            manager.setStatus('Failed to create layout', 'error');
            return;
        }
    }

    if (!createSucceeded) return;

    manager.setStatus(`Created: ${name}`, 'success');
    await manager.loadLayouts();

    const profile = DEVICE_PROFILES[deviceModel];
    const isEpaper = profile && profile.features && profile.features.epaper;
    const hasLvgl = profile && profile.features && profile.features.lvgl;
    const initialRenderingMode = (isEpaper && !hasLvgl) ? 'direct' : 'lvgl';

    Logger.log(`[LayoutManager] New layout ${id} detected device type. isEpaper=${isEpaper}, hasLvgl=${hasLvgl}. Setting initial renderingMode to: ${initialRenderingMode}`);

    if (AppState) {
        AppState.setPages([{ id: 'page_0', name: 'Page 1', widgets: [] }]);
        AppState.setCurrentPageIndex(0);
        AppState.updateSettings({
            renderingMode: initialRenderingMode,
            device_model: deviceModel
        });
        Logger.log('[LayoutManager] Cleared state and set initial settings before loading new layout');
    }

    await manager.loadLayout(id);

    if (AppState) {
        AppState.setDeviceModel(deviceModel);
        if (typeof emit === 'function' && typeof EVENTS !== 'undefined') {
            emit(EVENTS.STATE_CHANGED);
        }
        Logger.log(`[LayoutManager] Created layout '${id}' with device_model: ${deviceModel}, pages: ${AppState.pages?.length}, widgets: ${AppState.getCurrentPage()?.widgets?.length || 0}`);
    }
}

/**
 * @param {{ setStatus: (message: string, type?: 'success' | 'error' | 'info') => void, importLayout: (data: any, overwrite?: boolean) => Promise<void> }} manager
 * @param {Event} event
 */
export async function handleFileImport(manager, event) {
    const input = event.target instanceof HTMLInputElement ? event.target : null;
    const file = input?.files?.[0];
    if (!file) return;

    try {
        const text = await file.text();
        const data = JSON.parse(text);

        if (!data.pages && !data.device_id) {
            manager.setStatus('Invalid layout file', 'error');
            return;
        }

        await manager.importLayout(data);
    } catch (err) {
        Logger.error('[LayoutManager] Error importing file:', err);
        manager.setStatus(`Failed to import file: ${getErrorMessage(err)}`, 'error');
    }

    if (input) {
        input.value = '';
    }
}

/**
 * @param {{ setStatus: (message: string, type?: 'success' | 'error' | 'info') => void, loadLayouts: () => Promise<void>, importLayout: (data: any, overwrite?: boolean) => Promise<void> }} manager
 * @param {any} data
 * @param {boolean} [overwrite=false]
 */
export async function importLayout(manager, data, overwrite = false) {
    if (!hasHaBackend()) return;

    try {
        const resp = await importLayoutRequest(getHaApiBase(), data, overwrite, getHaHeaders);
        const result = await resp.json();

        if (!resp.ok) {
            if (result.error === 'layout_exists') {
                const doOverwrite = confirm(
                    `A layout with ID "${result.existing_id}" already exists.\n\nDo you want to overwrite it?`
                );
                if (doOverwrite) {
                    await manager.importLayout(data, true);
                }
                return;
            }
            throw new Error(result.error || `Import failed: ${resp.status}`);
        }

        manager.setStatus(`Imported: ${result.name || result.id}`, 'success');
        await manager.loadLayouts();
    } catch (err) {
        Logger.error('[LayoutManager] Error importing layout:', err);
        manager.setStatus('Failed to import layout', 'error');
    }
}
