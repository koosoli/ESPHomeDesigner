import { describe, it, expect, vi } from 'vitest';
import plugin from '../../features/qr_code/plugin.js';

const mockExportContext = {
    lines: [],
    addFont: vi.fn(() => 'font_id'),
    getColorConst: vi.fn((c) => `Color(${c})`),
    sanitize: vi.fn((s) => s),
    addDitherMask: vi.fn(),
    getConditionCheck: vi.fn(() => ''),
    isEpaper: false,
    widgets: []
};

describe('QR Code WiFi Export', () => {
    it('should export correctly formatted WiFi string', () => {
        const widget = {
            id: 'test_qr',
            type: 'qr_code',
            x: 10, y: 10, width: 100, height: 100,
            props: {
                ...plugin.defaults,
                mode: 'wifi',
                ssid: 'MyNetwork',
                password: 'SecretPassword',
                security: 'WPA'
            }
        };

        // Simulating the updateProp logic that normally happens in the UI
        const s = widget.props.ssid;
        const p = widget.props.password;
        const t = widget.props.security;
        widget.props.value = `WIFI:S:${s};T:${t};P:${p};;`;

        const ctx = { ...mockExportContext, lines: [] };
        plugin.export(widget, ctx);

        expect(ctx.lines).toContain('        it.qr_code(10, 10, id(qr_test_qr), Color(theme_auto), 3);');
    });

    it('should handle onExportComponents for WiFi QR', () => {
        const widget = {
            id: 'test_qr',
            type: 'qr_code',
            props: {
                mode: 'wifi',
                ssid: 'MyNetwork',
                password: 'SecretPassword',
                security: 'WPA',
                value: 'WIFI:S:MyNetwork;T:WPA;P:SecretPassword;;'
            }
        };

        const ctx = { lines: [], widgets: [widget] };
        plugin.onExportComponents(ctx);

        expect(ctx.lines).toContain('qr_code:');
        expect(ctx.lines).toContain('    value: "WIFI:S:MyNetwork;T:WPA;P:SecretPassword;;"');
    });
});
