import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockHasHaBackend = vi.fn();
const mockIsDeployedInHa = vi.fn();
const mockLogger = { log: vi.fn(), error: vi.fn() };
const mockShowToast = vi.fn();
const mockFetchEntityStates = vi.fn();
const mockLoadLayoutFromBackend = vi.fn();
const mockSaveLayoutToBackend = vi.fn();
const mockHandleFileSelect = vi.fn();
const mockSaveLayoutToFile = vi.fn();

vi.mock('../../js/utils/env.js', () => ({
    hasHaBackend: mockHasHaBackend,
    isDeployedInHa: mockIsDeployedInHa
}));

vi.mock('../../js/utils/logger.js', () => ({
    Logger: mockLogger
}));

vi.mock('../../js/utils/dom.js', () => ({
    showToast: mockShowToast
}));

vi.mock('../../js/io/ha_api.js', () => ({
    fetchEntityStates: mockFetchEntityStates,
    loadLayoutFromBackend: mockLoadLayoutFromBackend,
    saveLayoutToBackend: mockSaveLayoutToBackend
}));

vi.mock('../../js/io/file_ops.js', () => ({
    handleFileSelect: mockHandleFileSelect,
    saveLayoutToFile: mockSaveLayoutToFile
}));

describe('app_runtime_helpers', () => {
    const flushClick = () => new Promise((resolve) => setTimeout(resolve, 0));

    beforeEach(() => {
        vi.clearAllMocks();
        vi.resetModules();
        document.body.innerHTML = `
            <button id="saveLayoutBtn">Save</button>
            <input id="loadLayoutBtn" type="file" />
            <button id="importLayoutBtn">Import</button>
        `;
    });

    it('falls back to a local download when a standalone HA save is unavailable', async () => {
        mockHasHaBackend.mockReturnValue(true);
        mockIsDeployedInHa.mockReturnValue(false);
        mockSaveLayoutToBackend.mockResolvedValue(false);

        const { bindGlobalButtons } = await import('../../js/ui/app_runtime_helpers.js');
        bindGlobalButtons({
            editorSettings: null,
            openDeviceSettings: vi.fn(),
            openAiPrompt: vi.fn(),
            openLayoutManager: vi.fn()
        });

        document.getElementById('saveLayoutBtn')?.click();
        await flushClick();

        expect(mockSaveLayoutToBackend).toHaveBeenCalled();
        expect(mockSaveLayoutToFile).toHaveBeenCalled();
        expect(mockShowToast).toHaveBeenCalledWith(
            'Home Assistant save unavailable; layout downloaded locally instead',
            'info'
        );
    });

    it('keeps successful Home Assistant saves on the HA path', async () => {
        mockHasHaBackend.mockReturnValue(true);
        mockIsDeployedInHa.mockReturnValue(true);
        mockSaveLayoutToBackend.mockResolvedValue(true);

        const { bindGlobalButtons } = await import('../../js/ui/app_runtime_helpers.js');
        bindGlobalButtons({
            editorSettings: null,
            openDeviceSettings: vi.fn(),
            openAiPrompt: vi.fn(),
            openLayoutManager: vi.fn()
        });

        document.getElementById('saveLayoutBtn')?.click();
        await flushClick();

        expect(mockSaveLayoutToBackend).toHaveBeenCalled();
        expect(mockSaveLayoutToFile).not.toHaveBeenCalled();
        expect(mockShowToast).toHaveBeenCalledWith('Layout saved to Home Assistant', 'success');
    });

    it('falls back to a local download when standalone HA saves throw', async () => {
        mockHasHaBackend.mockReturnValue(true);
        mockIsDeployedInHa.mockReturnValue(false);
        mockSaveLayoutToBackend.mockRejectedValue(new Error('boom'));

        const { bindGlobalButtons } = await import('../../js/ui/app_runtime_helpers.js');
        bindGlobalButtons({
            editorSettings: null,
            openDeviceSettings: vi.fn(),
            openAiPrompt: vi.fn(),
            openLayoutManager: vi.fn()
        });

        document.getElementById('saveLayoutBtn')?.click();
        await flushClick();

        expect(mockSaveLayoutToBackend).toHaveBeenCalled();
        expect(mockSaveLayoutToFile).toHaveBeenCalled();
        expect(mockShowToast).toHaveBeenCalledWith(
            'Home Assistant save failed; layout downloaded locally instead',
            'info'
        );
    });
});
