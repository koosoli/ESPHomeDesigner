import { describe, it, expect } from 'vitest';
import { DeviceSettings } from '../../js/ui/device_settings.js';
import { AppStateFacade } from '../../js/core/stores/index.js';
import { AppState } from '../../js/core/state.js';

describe('Invariant Verification - Core Exports', () => {

    it('DeviceSettings should be a valid class constructor', () => {
        expect(typeof DeviceSettings).toBe('function');
        expect(DeviceSettings.prototype.constructor).toBe(DeviceSettings);
    });

    it('AppStateFacade should be a valid class constructor', () => {
        expect(typeof AppStateFacade).toBe('function');
    });

    it('AppState should be an instance of AppStateFacade', () => {
        expect(AppState).toBeDefined();
        // typeof Proxy is 'object'
        expect(typeof AppState).toBe('object');
        expect(AppState instanceof AppStateFacade).toBe(true);
    });

    it('AppState should have all critical core interface members', () => {
        const criticalMethods = [
            'reset',
            'getCurrentPage',
            'getWidgetById',
            'getSelectedWidget',
            'getSelectedWidgets',
            'getCanvasDimensions',
            'getPagesPayload',
            'saveToLocalStorage',
            'loadFromLocalStorage',
            'setPages',
            'addWidget',
            'deleteWidget',
            'updateWidget',
            'undo',
            'redo',
            'copyWidget',
            'pasteWidget'
        ];

        const criticalGetters = [
            'pages',
            'currentPageIndex',
            'selectedWidgetId',
            'selectedWidgetIds',
            'settings',
            'deviceName',
            'deviceModel'
        ];

        criticalMethods.forEach(method => {
            expect(typeof AppState[method]).toBe('function', `Method ${method} missing or not a function on AppState`);
        });

        criticalGetters.forEach(getter => {
            expect(AppState[getter]).toBeDefined(`Getter/Property ${getter} missing from AppState`);
        });
    });

    it('DeviceSettings should have expected public API', () => {
        // We check prototype because creating an instance might require heavy DOM mocking
        const expectedMethods = [
            'init',
            'open',
            'close',
            'handleSaveCustomProfile',
            'reloadHardwareProfiles',
            'updateVisibility'
        ];

        expectedMethods.forEach(method => {
            expect(typeof DeviceSettings.prototype[method]).toBe('function', `Method ${method} missing from DeviceSettings`);
        });
    });
});
