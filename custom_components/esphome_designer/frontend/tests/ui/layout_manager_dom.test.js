import { describe, expect, it } from 'vitest';

import {
    createLayoutManagerModalMarkup,
    createNewLayoutModalMarkup,
    escapeHtml,
    generateDeviceOptions,
    getDeviceDisplayName,
    renderLayoutRows
} from '../../js/ui/layout_manager_dom.js';

describe('layout_manager_dom helpers', () => {
    it('escapes markup and resolves device names for supported, unsupported, and fallback models', () => {
        const deviceProfiles = {
            reterminal_e1001: { name: 'E1001' },
            trmnl: { name: 'TRMNL' }
        };

        expect(escapeHtml('<b>Kitchen</b>')).toBe('&lt;b&gt;Kitchen&lt;/b&gt;');
        expect(getDeviceDisplayName('reterminal_e1001', deviceProfiles, ['reterminal_e1001'])).toBe('E1001');
        expect(getDeviceDisplayName('trmnl', deviceProfiles, ['reterminal_e1001'])).toBe('TRMNL (untested)');
        expect(getDeviceDisplayName('esp32_s3_photopainter', {}, [])).toBe('PhotoPainter (7-Color)');
        expect(getDeviceDisplayName(undefined, deviceProfiles, [])).toBe('Unknown');
    });

    it('renders current, duplicate, and deletable layout rows with escaped content', () => {
        const html = renderLayoutRows([
            { id: 'layout_1', name: 'Main <script>', device_model: 'reterminal_e1001', page_count: 2 },
            { id: 'layout_2', name: 'Main <script>', device_model: 'trmnl', page_count: 1 },
            { id: 'layout_3', name: 'Spare', device_type: 'custom', page_count: 4 }
        ], 'layout_1', {
            reterminal_e1001: { name: 'E1001' },
            trmnl: { name: 'TRMNL' }
        }, ['reterminal_e1001']);

        expect(html).toContain('&lt;script&gt;');
        expect(html).toContain('current');
        expect(html).toContain('layout_2');
        expect(html).toContain('TRMNL (untested)');
        expect(html).toContain('custom');
        expect(html).toContain('data-action="load"');
        expect(html).toContain('data-action="delete"');
        expect(html).not.toContain('data-id="layout_1">Delete');
    });

    it('generates modal markup and device option markup for the layout dialogs', () => {
        const deviceOptionsHtml = generateDeviceOptions({
            reterminal_e1001: { name: 'E1001' },
            trmnl: { name: 'TRMNL' }
        }, ['reterminal_e1001']);

        const managerMarkup = createLayoutManagerModalMarkup();
        const newLayoutMarkup = createNewLayoutModalMarkup(deviceOptionsHtml);

        expect(deviceOptionsHtml).toContain('value="reterminal_e1001"');
        expect(deviceOptionsHtml).toContain('TRMNL (untested)');
        expect(managerMarkup).toContain('id="layoutManagerTableBody"');
        expect(managerMarkup).toContain('id="layoutManagerFileInput"');
        expect(newLayoutMarkup).toContain('id="newLayoutName"');
        expect(newLayoutMarkup).toContain(deviceOptionsHtml);
    });
});
