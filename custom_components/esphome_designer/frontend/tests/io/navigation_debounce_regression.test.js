import { describe, expect, it } from 'vitest';

import { YamlGenerator } from '../../js/io/adapters/yaml_generator.js';
import { generateBinarySensorSection } from '../../js/io/hardware_generators.js';
import templateNavBarPlugin from '../../features/template_nav_bar/plugin.js';
import touchAreaPlugin from '../../features/touch_area/plugin.js';

const lcdTouchProfile = {
    name: 'Waveshare Touch LCD 7',
    features: { lcd: true },
    touch: { platform: 'gt911' }
};

const epaperTouchProfile = {
    name: 'Touch E-Paper',
    features: { epaper: true },
    touch: { platform: 'cst816' }
};

function createTemplateNavBarWidget() {
    return {
        id: 'nav_bar',
        type: 'template_nav_bar',
        x: 0,
        y: 0,
        width: 180,
        height: 40,
        _pageIndex: 0,
        props: {
            show_prev: true,
            show_home: true,
            show_next: true
        }
    };
}

function createTemplateNavBarWidgetsForTwoPages() {
    return [
        createTemplateNavBarWidget(),
        {
            ...createTemplateNavBarWidget(),
            id: 'nav_bar_page_2',
            _pageIndex: 1
        }
    ];
}

function createTouchAreaWidget() {
    return {
        id: 'touch_next',
        type: 'touch_area',
        x: 10,
        y: 20,
        width: 80,
        height: 80,
        _pageIndex: 0,
        props: {
            nav_action: 'next_page',
            icon_size: 40
        }
    };
}

function createTouchAreaWidgetsForTwoPages() {
    return [
        createTouchAreaWidget(),
        {
            ...createTouchAreaWidget(),
            id: 'touch_page_2',
            _pageIndex: 1,
            props: {
                nav_action: 'none',
                icon_size: 40
            }
        }
    ];
}

describe('navigation debounce regression coverage', () => {
    it('keeps the LCD page-switch debounce at 2000ms in change_page_to', () => {
        const generator = new YamlGenerator();
        const pages = [
            { name: 'Page 1', widgets: [] },
            { name: 'Page 2', widgets: [] }
        ];

        const yaml = generator.generateScriptSection({ refreshInterval: 60 }, pages, lcdTouchProfile).join('\n');

        expect(yaml).toContain('if (now - id(last_page_switch_time) < 2000) {');
    });

    it('uses the same 2000ms debounce for LCD template_nav_bar touch sensors', () => {
        const yaml = generateBinarySensorSection(
            lcdTouchProfile,
            2,
            'my_display',
            createTemplateNavBarWidgetsForTwoPages()
        ).join('\n');

        expect(yaml).toContain('(millis() - id(last_touch_time) > 2000)');
        expect(yaml).not.toContain('(millis() - id(last_touch_time) > 250)');
    });

    it('uses the same 2000ms debounce for LCD touch_area navigation sensors', () => {
        const yaml = generateBinarySensorSection(
            lcdTouchProfile,
            2,
            'my_display',
            createTouchAreaWidgetsForTwoPages()
        ).join('\n');

        expect(yaml).toContain('(millis() - id(last_touch_time) > 2000)');
        expect(yaml).not.toContain('(millis() - id(last_touch_time) > 250)');
    });

    it('keeps the short 250ms touch debounce for non-LCD touch devices', () => {
        const yaml = generateBinarySensorSection(
            epaperTouchProfile,
            2,
            'epaper_display',
            createTemplateNavBarWidgetsForTwoPages()
        ).join('\n');

        expect(yaml).toContain('(millis() - id(last_touch_time) > 250)');
    });

    it('uses the same 2000ms debounce in template_nav_bar plugin binary sensor export for LCD profiles', () => {
        const lines = [];
        templateNavBarPlugin.onExportBinarySensors({
            lines,
            widgets: createTemplateNavBarWidgetsForTwoPages(),
            profile: { ...lcdTouchProfile }
        });

        const yaml = lines.join('\n');
        expect(yaml).toContain('(millis() - id(last_touch_time) > 2000)');
        expect(yaml).not.toContain('(millis() - id(last_touch_time) > 250)');
    });

    it('uses the same 2000ms debounce in touch_area plugin binary sensor export for LCD profiles', () => {
        const lines = [];
        touchAreaPlugin.onExportBinarySensors({
            lines,
            widgets: createTouchAreaWidgetsForTwoPages(),
            profile: { ...lcdTouchProfile }
        });

        const yaml = lines.join('\n');
        expect(yaml).toContain('(millis() - id(last_touch_time) > 2000)');
        expect(yaml).not.toContain('(millis() - id(last_touch_time) > 250)');
    });

    it('keeps only the home action in single-page LVGL nav bars', () => {
        const exported = templateNavBarPlugin.exportLVGL(
            {
                ...createTemplateNavBarWidget(),
                _pageCount: 1
            },
            {
                common: { x: 0, y: 0, width: 180, height: 40 },
                convertColor: (value) => value,
                getLVGLFont: (family, size, weight) => `${family}-${size}-${weight}`
            }
        );

        const widgets = exported.obj.widgets;
        expect(widgets).toHaveLength(1);
        expect(JSON.stringify(widgets)).not.toContain('change_page_to');
        expect(JSON.stringify(widgets)).toContain('manage_run_and_sleep');
    });
});
