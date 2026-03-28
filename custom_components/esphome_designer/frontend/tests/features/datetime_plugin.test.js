import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAppState } = vi.hoisted(() => ({
    mockAppState: {
        updateWidget: vi.fn(),
        settings: {
            darkMode: true
        }
    }
}));

vi.mock('@core/state', () => ({
    AppState: mockAppState
}));

vi.mock('@core/font_weights.js', () => ({
    getWeightsForFont: vi.fn(() => [400, 700]),
    clampFontWeight: vi.fn((_family, weight) => weight)
}));

import plugin from '../../features/datetime/plugin.js';

describe('datetime plugin', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        mockAppState.settings.darkMode = true;
        mockAppState.updateWidget.mockReset();
    });

    it('renders bordered date previews with theme-aware border colors and alignment', () => {
        const host = document.createElement('div');

        plugin.render(host, {
            id: 'datetime_render',
            width: 140,
            height: 60,
            props: {
                ...plugin.defaults,
                format: 'date_only',
                text_align: 'BOTTOM_RIGHT',
                bg_color: 'navy',
                border_width: 2,
                border_color: 'theme_auto'
            }
        }, {
            getColorStyle: (value) => {
                if (value === 'theme_auto') return 'rgb(255, 255, 255)';
                if (value === 'navy') return 'rgb(0, 0, 128)';
                return value;
            }
        });

        const body = /** @type {HTMLDivElement} */ (host.firstElementChild);
        expect(body.style.alignItems).toBe('flex-end');
        expect(body.style.justifyContent).toBe('flex-end');
        expect(body.style.border).toBe('2px solid white');
        expect(body.style.backgroundColor).toBe('rgb(0, 0, 128)');
        expect(body.textContent).toMatch(/^\d{2}\.\d{2}\.\d{4}$/);
    });

    it('exports OpenDisplay and OEPL payloads with aligned anchors and font selection', () => {
        const openDisplay = plugin.exportOpenDisplay({
            x: 10,
            y: 20,
            width: 100,
            height: 50,
            props: {
                format: 'time_date',
                text_align: 'BOTTOM_RIGHT',
                time_font_size: 30,
                font_family: 'Monospace',
                color: 'theme_auto'
            }
        }, {
            layout: { darkMode: true },
            _page: {}
        });

        expect(openDisplay).toMatchObject({
            type: 'multiline',
            x: 110,
            y: 70,
            color: 'white',
            font: 'mononoki.ttf'
        });

        const oepl = plugin.exportOEPL({
            x: 0,
            y: 5,
            width: 90,
            height: 40,
            props: {
                format: 'time_only',
                text_align: 'TOP_LEFT',
                font_family: 'Roboto'
            }
        }, {
            layout: { darkMode: false },
            _page: {}
        });

        expect(oepl.anchor).toBe('tl');
        expect(oepl.max_width).toBe(90);
        expect(oepl.spacing).toBe(5);
        expect(oepl.font).toBe('ppb.ttf');
    });

    it('collects fonts and emits direct-mode strftime lines with multi-line alignment', () => {
        const addFont = vi.fn((family, weight, size) => `${family}_${weight}_${size}`);

        plugin.collectRequirements({
            props: {
                font_family: 'Open Sans',
                time_font_size: 30,
                date_font_size: 14,
                font_weight_time: 600,
                bold_date: true,
                italic: true
            }
        }, { addFont });

        expect(addFont).toHaveBeenNthCalledWith(1, 'Open Sans', 600, 30, true);
        expect(addFont).toHaveBeenNthCalledWith(2, 'Open Sans', 700, 14, true);

        const lines = [];
        plugin.export({
            id: 'datetime_direct',
            x: 15,
            y: 25,
            width: 120,
            height: 60,
            props: {
                ...plugin.defaults,
                format: 'time_date',
                text_align: 'CENTER_RIGHT',
                bg_color: 'white',
                border_width: 1,
                border_color: 'black'
            }
        }, {
            lines,
            getColorConst: (value) => `Color(${value})`,
            addFont: vi.fn((family, weight, size) => `${family}_${weight}_${size}`),
            getCondProps: () => ({}),
            getConditionCheck: () => 'if (id(show_datetime)) {',
            getAlignY: () => 0
        });

        const output = lines.join('\n');
        expect(output).toContain('it.filled_rectangle(15, 25, 120, 60, Color(white));');
        expect(output).toContain('it.rectangle(15 + 0, 25 + 0, 120 - 2 * 0, 60 - 2 * 0, Color(black));');
        expect(output).toContain('TextAlign::TOP_RIGHT');
        expect(output).toContain('"%H:%M"');
        expect(output).toContain('"%a, %b %d"');
    });

    it('renders properties controls and updates widget props for custom fonts and borders', () => {
        const callbacks = {};
        const panel = {
            createSection: vi.fn(),
            addSelect: vi.fn((label, _value, _options, cb) => { callbacks[label] = cb; }),
            addHint: vi.fn(),
            addLabeledInput: vi.fn((label, _type, _value, cb) => { callbacks[label] = cb; }),
            addCheckbox: vi.fn((label, _value, cb) => { callbacks[label] = cb; }),
            addColorSelector: vi.fn((label, _value, _preset, cb) => { callbacks[label] = cb; }),
            addNumberWithSlider: vi.fn((label, _value, _min, _max, cb) => { callbacks[label] = cb; }),
            addDropShadowButton: vi.fn(),
            getContainer: vi.fn(() => document.body),
            endSection: vi.fn()
        };

        plugin.renderProperties(panel, {
            id: 'datetime_props',
            props: {
                ...plugin.defaults,
                font_family: 'My Font',
                text_align: 'TOP_LEFT'
            }
        });

        callbacks['Display Format']('weekday_day_month');
        callbacks['Alignment']('BOTTOM_LEFT');
        callbacks['Custom Font Name']('Space Mono');
        callbacks['Time Font Size']('32');
        callbacks['Time Weight']('600');
        callbacks['Date Font Size']('18');
        callbacks['Date Weight']('500');
        callbacks['Italic'](true);
        callbacks['Text Color']('blue');
        callbacks['Background']('white');
        callbacks['Opacity (%)'](80);
        callbacks['Border Width']('2');
        callbacks['Border Color']('red');
        callbacks['Corner Radius']('5');

        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'datetime_props' && payload.props?.format === 'weekday_day_month'
        )).toBe(true);
        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'datetime_props' && payload.props?.font_family === 'Space Mono'
        )).toBe(true);
        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'datetime_props' && payload.props?.custom_font_family === 'Space Mono'
        )).toBe(true);
        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'datetime_props' && payload.props?.opacity === 80
        )).toBe(true);
        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'datetime_props' && payload.props?.opa === 204
        )).toBe(true);
        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'datetime_props' && payload.props?.border_radius === 5
        )).toBe(true);
    });

    it('exports single-line date formats and LVGL container variants', () => {
        const openDisplay = plugin.exportOpenDisplay({
            x: 10,
            y: 20,
            width: 100,
            height: 50,
            props: {
                format: 'date_only',
                text_align: 'TOP_LEFT',
                time_font_size: 22,
                color: 'theme_auto'
            }
        }, {
            layout: { darkMode: false },
            _page: {}
        });

        expect(openDisplay).toEqual({
            type: 'text',
            x: 10,
            y: 20,
            value: "{{ now().strftime('%d.%m.%Y') }}",
            size: 22,
            color: 'black',
            anchor: 'tl',
            font: 'ppb.ttf'
        });

        const lvglLabelOnly = plugin.exportLVGL({
            props: {
                format: 'weekday_day_month',
                date_font_size: 18,
                color: 'theme_auto',
                text_align: 'TOP_LEFT'
            }
        }, {
            common: { id: 'dt_1' },
            convertColor: (value) => `Color(${value})`,
            convertAlign: () => 'top_left',
            getLVGLFont: (_family, size, weight) => `font_${size}_${weight}`,
            formatOpacity: (value) => `opa(${value})`
        });

        expect(lvglLabelOnly.label.text).toContain('%A %d %B');
        expect(lvglLabelOnly.label.text_font).toBe('font_18_400');

        const lvglBox = plugin.exportLVGL({
            props: {
                format: 'time_date',
                bg_color: 'white',
                border_width: 1,
                border_color: 'black',
                border_radius: 6,
                text_align: 'BOTTOM_RIGHT',
                opa: 220
            }
        }, {
            common: { id: 'dt_2' },
            convertColor: (value) => `Color(${value})`,
            convertAlign: () => 'bottom_right',
            getLVGLFont: (_family, size, weight) => `font_${size}_${weight}`,
            formatOpacity: (value) => `opa(${value})`
        });

        expect(lvglBox.obj.layout.flex_align_main).toBe('end');
        expect(lvglBox.obj.layout.flex_align_cross).toBe('end');
        expect(lvglBox.obj.radius).toBe(6);
        expect(lvglBox.obj.widgets[0].label.width).toBe('100%');
    });

    it('exports direct date and weekday formats with bottom alignment', () => {
        const weekdayLines = [];
        plugin.export({
            x: 5,
            y: 10,
            width: 80,
            height: 40,
            props: {
                ...plugin.defaults,
                format: 'weekday_day_month',
                text_align: 'BOTTOM_RIGHT'
            }
        }, {
            lines: weekdayLines,
            getColorConst: (value) => `Color(${value})`,
            addFont: vi.fn((family, weight, size) => `${family}_${weight}_${size}`),
            getCondProps: () => ({}),
            getConditionCheck: () => '',
            getAlignY: () => 0
        });

        expect(weekdayLines.join('\n')).toContain('TextAlign::BOTTOM_RIGHT');
        expect(weekdayLines.join('\n')).toContain('"%A %d %B"');

        const dateOnlyLines = [];
        plugin.export({
            x: 0,
            y: 0,
            width: 100,
            height: 30,
            props: {
                ...plugin.defaults,
                format: 'date_only',
                text_align: 'CENTER'
            }
        }, {
            lines: dateOnlyLines,
            getColorConst: (value) => `Color(${value})`,
            addFont: vi.fn((family, weight, size) => `${family}_${weight}_${size}`),
            getCondProps: () => ({}),
            getConditionCheck: () => '',
            getAlignY: () => 0
        });

        expect(dateOnlyLines.join('\n')).toContain('TextAlign::CENTER');
        expect(dateOnlyLines.join('\n')).toContain('"%d.%m.%Y"');
    });
});
