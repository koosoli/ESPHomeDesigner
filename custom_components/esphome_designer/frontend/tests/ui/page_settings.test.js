import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockHasHaBackend = vi.fn(() => true);
const mockSaveLayoutToBackend = vi.fn(() => Promise.resolve());
const mockLogger = {
    log: vi.fn(),
    warn: vi.fn()
};

const mockPages = [
    {
        name: 'Main',
        refresh_type: 'interval',
        refresh_s: 30,
        refresh_time: '09:00',
        dark_mode: 'inherit',
        layout: '4x4',
        visible_from: '06:00',
        visible_to: '22:00'
    }
];

const mockAppState = {
    pages: mockPages,
    setPages: vi.fn()
};

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/utils/env.js', () => ({
    hasHaBackend: mockHasHaBackend
}));

vi.mock('../../js/io/ha_api.js', () => ({
    saveLayoutToBackend: mockSaveLayoutToBackend
}));

vi.mock('../../js/utils/logger.js', () => ({
    Logger: mockLogger
}));

function seedDom() {
    document.body.innerHTML = `
        <div id="pageSettingsModal" class="hidden" style="display:none;">
            <button id="pageSettingsClose">Close</button>
            <button id="pageSettingsSave">Save</button>
            <input id="pageSettingsName" />
            <input id="pageSettingsRefresh" />
            <select id="pageSettingsRefreshMode">
                <option value="interval">interval</option>
                <option value="daily">daily</option>
            </select>
            <input id="pageSettingsRefreshTime" />
            <div id="field-refresh-interval"></div>
            <div id="field-refresh-time"></div>
            <select id="pageSettingsDarkMode">
                <option value="inherit">inherit</option>
                <option value="light">light</option>
            </select>
            <select id="pageSettingsLayoutMode">
                <option value="absolute">absolute</option>
                <option value="grid">grid</option>
            </select>
            <input id="pageSettingsGridSize" />
            <div id="field-grid-size"></div>
            <input id="pageSettingsVisibleFrom" />
            <input id="pageSettingsVisibleTo" />
        </div>
    `;
}

describe('PageSettings', () => {
    const flushAsync = () => new Promise((resolve) => setTimeout(resolve, 0));

    beforeEach(() => {
        vi.clearAllMocks();
        mockPages[0] = {
            name: 'Main',
            refresh_type: 'interval',
            refresh_s: 30,
            refresh_time: '09:00',
            dark_mode: 'inherit',
            layout: '4x4',
            visible_from: '06:00',
            visible_to: '22:00'
        };
        mockAppState.pages = mockPages;
        seedDom();
    });

    it('opens the modal, populates fields, and updates interval/grid visibility', async () => {
        const { PageSettings } = await import('../../js/ui/page_settings.js');
        const settings = new PageSettings();

        settings.open(0);

        expect(settings.nameInput?.value).toBe('Main');
        expect(settings.refreshModeInput?.value).toBe('interval');
        expect(settings.refreshInput?.value).toBe('30');
        expect(settings.refreshTimeInput?.value).toBe('09:00');
        expect(settings.layoutModeInput?.value).toBe('grid');
        expect(settings.gridSizeInput?.value).toBe('4x4');
        expect(settings.fieldInterval?.style.display).toBe('block');
        expect(settings.fieldTime?.style.display).toBe('none');
        expect(settings.fieldGridSize?.style.display).toBe('block');
        expect(settings.modal?.classList.contains('hidden')).toBe(false);
        expect(settings.modal?.style.display).toBe('flex');

        settings.refreshModeInput.value = 'daily';
        settings.updateVisibility();
        expect(settings.fieldInterval?.style.display).toBe('none');
        expect(settings.fieldTime?.style.display).toBe('block');

        settings.layoutModeInput.value = 'absolute';
        settings.updateGridVisibility();
        expect(settings.fieldGridSize?.style.display).toBe('none');
    });

    it('binds close, save, and visibility listeners through init()', async () => {
        const { PageSettings } = await import('../../js/ui/page_settings.js');
        const settings = new PageSettings();
        const closeSpy = vi.spyOn(settings, 'close');
        const saveSpy = vi.spyOn(settings, 'save');
        const visSpy = vi.spyOn(settings, 'updateVisibility');
        const gridSpy = vi.spyOn(settings, 'updateGridVisibility');

        settings.init();

        settings.closeBtn?.click();
        settings.saveBtn?.click();
        settings.refreshModeInput?.dispatchEvent(new Event('change'));
        settings.layoutModeInput?.dispatchEvent(new Event('change'));

        expect(closeSpy).toHaveBeenCalled();
        expect(saveSpy).toHaveBeenCalled();
        expect(visSpy).toHaveBeenCalled();
        expect(gridSpy).toHaveBeenCalled();
    });

    it('saves interval-mode settings, persists to backend, and closes the modal', async () => {
        const { PageSettings } = await import('../../js/ui/page_settings.js');
        const settings = new PageSettings();
        settings.open(0);

        settings.nameInput.value = 'Updated Main';
        settings.refreshModeInput.value = 'interval';
        settings.refreshInput.value = '45';
        settings.darkModeInput.value = 'light';
        settings.layoutModeInput.value = 'grid';
        settings.gridSizeInput.value = '6x3';
        settings.visibleFromInput.value = '07:30';
        settings.visibleToInput.value = '21:15';

        settings.save();
        await flushAsync();
        await flushAsync();

        expect(mockPages[0]).toEqual(expect.objectContaining({
            name: 'Updated Main',
            refresh_type: 'interval',
            refresh_s: 45,
            dark_mode: 'light',
            layout: '6x3',
            visible_from: '07:30',
            visible_to: '21:15'
        }));
        expect(mockPages[0].refresh_time).toBeUndefined();
        expect(mockAppState.setPages).toHaveBeenCalledWith(mockAppState.pages);
        expect(mockSaveLayoutToBackend).toHaveBeenCalled();
        expect(mockLogger.log).toHaveBeenCalled();
        expect(settings.modal?.classList.contains('hidden')).toBe(true);
        expect(settings.modal?.style.display).toBe('none');
    });

    it('saves daily mode, clears invalid interval/grid fields, and skips backend when unavailable', async () => {
        mockHasHaBackend.mockReturnValueOnce(false);
        const { PageSettings } = await import('../../js/ui/page_settings.js');
        const settings = new PageSettings();
        settings.open(0);

        settings.refreshModeInput.value = 'daily';
        settings.refreshInput.value = 'not-a-number';
        settings.refreshTimeInput.value = '08:45';
        settings.layoutModeInput.value = 'grid';
        settings.gridSizeInput.value = 'bad-grid';
        settings.visibleFromInput.value = '';
        settings.visibleToInput.value = '';

        settings.save();
        await flushAsync();

        expect(mockPages[0].refresh_type).toBe('daily');
        expect(mockPages[0].refresh_time).toBe('08:45');
        expect(mockPages[0].refresh_s).toBeUndefined();
        expect(mockPages[0].layout).toBeNull();
        expect(mockPages[0].visible_from).toBeUndefined();
        expect(mockPages[0].visible_to).toBeUndefined();
        expect(mockSaveLayoutToBackend).not.toHaveBeenCalled();
    });

    it('returns early when the modal or selected page is unavailable', async () => {
        const { PageSettings } = await import('../../js/ui/page_settings.js');
        document.body.innerHTML = '';
        const missingModalSettings = new PageSettings();

        expect(() => missingModalSettings.init()).not.toThrow();
        expect(() => missingModalSettings.open(0)).not.toThrow();

        seedDom();
        const settings = new PageSettings();
        expect(() => settings.open(99)).not.toThrow();

        settings.pageIndex = -1;
        settings.save();

        mockAppState.pages = [];
        settings.pageIndex = 0;
        settings.save();

        expect(mockAppState.setPages).not.toHaveBeenCalled();
    });

    it('removes invalid interval values instead of persisting NaN', async () => {
        const { PageSettings } = await import('../../js/ui/page_settings.js');
        const settings = new PageSettings();
        settings.open(0);

        settings.refreshModeInput.value = 'interval';
        settings.refreshInput.value = '-5';

        settings.save();
        await flushAsync();

        expect(mockPages[0].refresh_s).toBeUndefined();
        expect(mockPages[0].refresh_type).toBe('interval');
    });
});
