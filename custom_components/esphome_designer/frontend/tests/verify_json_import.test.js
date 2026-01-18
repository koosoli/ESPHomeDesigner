
import { AppState } from '../js/core/state.js';
import { loadLayoutIntoState } from '../js/io/yaml_import.js';
import { Logger } from '../js/utils/logger.js';
import { describe, it, expect, beforeEach } from 'vitest';

// Mock Logger to prevent console spam
Logger.log = () => { };
Logger.warn = () => { };
Logger.error = () => { };

describe('JSON Import Verification', () => {

    beforeEach(() => {
        AppState.reset();
    });

    it('should correctly import legacy JSON format', () => {
        const legacyLayout = {
            pages: [],
            name: "Legacy Device",
            device_model: "reterminal_e1001",
            device_id: "legacy_id_123"
        };

        loadLayoutIntoState(legacyLayout);

        expect(AppState.deviceName).toBe("Legacy Device");
        expect(AppState.deviceModel).toBe("reterminal_e1001");
        expect(AppState.currentLayoutId).toBe("legacy_id_123");
    });

    it('should correctly import modern JSON format with custom hardware', () => {
        const modernLayout = {
            pages: [],
            deviceName: "Modern Device",
            deviceModel: "custom",
            currentLayoutId: "modern_id_456",
            customHardware: {
                resWidth: 800,
                resHeight: 600,
                shape: "round"
            }
        };

        loadLayoutIntoState(modernLayout);

        expect(AppState.deviceName).toBe("Modern Device");
        expect(AppState.deviceModel).toBe("custom");
        expect(AppState.currentLayoutId).toBe("modern_id_456");

        const customHw = AppState.project.state.customHardware;
        expect(customHw.resWidth).toBe(800);
        expect(customHw.resHeight).toBe(600);
        expect(customHw.shape).toBe("round");
    });

    it('should prioritize device_id from layout over current state', () => {
        AppState.setCurrentLayoutId("original_id");

        const layout = {
            pages: [],
            currentLayoutId: "new_imported_id"
        };

        loadLayoutIntoState(layout);

        expect(AppState.currentLayoutId).toBe("new_imported_id");
    });

    it('should correctly import legacy HA storage dump format', () => {
        const haStorageDump = {
            "version": 1,
            "key": "reterminal_dashboard",
            "data": {
                "devices": {
                    "reterminal_e1001": {
                        "device_id": "ha_storage_id",
                        "name": "HA Storage Device",
                        "pages": [],
                        "device_model": "reterminal_e1001"
                    }
                }
            }
        };

        loadLayoutIntoState(haStorageDump);

        expect(AppState.deviceName).toBe("HA Storage Device");
        expect(AppState.currentLayoutId).toBe("ha_storage_id");
        expect(AppState.deviceModel).toBe("reterminal_e1001");
    });
});
