import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockRegistry, mockLogger } = vi.hoisted(() => ({
    mockRegistry: {
        get: vi.fn()
    },
    mockLogger: {
        log: vi.fn(),
        error: vi.fn(),
        warn: vi.fn(),
        info: vi.fn()
    }
}));

vi.mock('../../js/core/plugin_registry', () => ({
    registry: mockRegistry
}));

vi.mock('../../js/utils/logger.js', () => ({
    Logger: mockLogger
}));

import { OEPLAdapter } from '../../js/io/adapters/oepl_adapter.js';

describe('OEPLAdapter', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('returns an empty JSON array when layout or page data is missing', async () => {
        const adapter = new OEPLAdapter();

        await expect(adapter.generate(null)).resolves.toBe('[]');
        await expect(adapter.generate({ pages: [] })).resolves.toBe('[]');
        await expect(adapter.generate({ currentPageIndex: 0, pages: [{ id: 'page-1' }] })).resolves.toBe('[]');

        expect(mockLogger.error).toHaveBeenCalledWith('OEPLAdapter: Missing layout');
    });

    it('serializes visible widgets, injects missing ids, and warns only once for unsupported types', async () => {
        mockRegistry.get.mockImplementation((type) => {
            if (type === 'label') {
                return {
                    exportOEPL: () => ({
                        type: 'text',
                        value: 'hello'
                    })
                };
            }
            if (type === 'icon') {
                return {
                    exportOEPL: () => ({
                        id: 'explicit_id',
                        type: 'icon',
                        value: 'mdi:home'
                    })
                };
            }
            return null;
        });

        const adapter = new OEPLAdapter();
        const json = await adapter.generate({
            orientation: 'portrait',
            darkMode: true,
            protocolHardware: { colorMode: 'grayscale' },
            currentPageIndex: 0,
            settings: {},
            pages: [{
                widgets: [
                    { id: 'hidden_widget', hidden: true, type: 'label' },
                    { id: 'group_widget', type: 'group' },
                    { id: 'visible_label', type: 'label' },
                    { id: 'visible_icon', type: 'icon' },
                    { id: 'unknown_1', type: 'unknown_widget' },
                    { id: 'unknown_2', type: 'unknown_widget' }
                ]
            }]
        });

        const payload = JSON.parse(json);
        expect(payload.data.rotate).toBe(90);
        expect(payload.data.background).toBe('black');
        expect(payload.target.entity_id).toBe('open_epaper_link.0000000000000000');
        expect(payload.data.payload).toEqual([
            { id: 'visible_label', type: 'text', value: 'hello' },
            { id: 'explicit_id', type: 'icon', value: 'mdi:home' }
        ]);
        expect(mockLogger.warn).toHaveBeenCalledTimes(1);
        expect(mockLogger.warn).toHaveBeenCalledWith('Widget type "unknown_widget" does not support OEPL export yet.');
    });

    it('logs plugin export failures and returns null from generateWidget', () => {
        mockRegistry.get.mockReturnValue({
            exportOEPL: () => {
                throw new Error('bad export');
            }
        });

        const adapter = new OEPLAdapter();
        const result = adapter.generateWidget({ id: 'broken', type: 'broken_widget' }, { layout: {}, page: {} });

        expect(result).toBeNull();
        expect(mockLogger.error).toHaveBeenCalledWith('Error in exportOEPL for broken_widget:', expect.any(Error));
    });
});
