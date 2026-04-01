import { describe, it, expect } from 'vitest';
import plugin from '../../features/lvgl_button/plugin.js';

describe('lvgl_button service selection', () => {
    const common = { id: "btn1", x: 10, y: 10 };
    const context = {
        common,
        convertColor: (c) => `color_${c}`,
        formatOpacity: (o) => o,
        getLVGLFont: () => "font_id"
    };

    it('auto-detects cover entities and uses cover.toggle', () => {
        const widget = {
            id: "btn1",
            type: "lvgl_button",
            entity_id: "cover.living_room_blinds",
            props: { service: "auto" }
        };
        const result = plugin.exportLVGL(widget, context);
        expect(result.button.on_click[0]["homeassistant.service"].service).toBe("cover.toggle");
    });

    it('respects service override for cover.close_cover', () => {
        const widget = {
            id: "btn1",
            type: "lvgl_button",
            entity_id: "cover.living_room_blinds",
            props: { service: "cover.close_cover" }
        };
        const result = plugin.exportLVGL(widget, context);
        expect(result.button.on_click[0]["homeassistant.service"].service).toBe("cover.close_cover");
    });

    it('respects service override for script.execute', () => {
        const widget = {
            id: "btn1",
            type: "lvgl_button",
            entity_id: "light.kitchen",
            props: { service: "script.execute" }
        };
        const result = plugin.exportLVGL(widget, context);
        expect(result.button.on_click[0]["homeassistant.service"].service).toBe("script.execute");
    });

    it('auto-detects script entities and uses script.execute payloads', () => {
        const widget = {
            id: 'btn_script_auto',
            type: 'lvgl_button',
            entity_id: 'script.good_night',
            props: { service: 'auto' }
        };

        const result = plugin.exportLVGL(widget, context);
        expect(result.button.on_click[0]['script.execute']).toBe('script.good_night');
    });

    it('falls back to homeassistant.toggle for unknown entities with auto', () => {
        const widget = {
            id: "btn1",
            type: "lvgl_button",
            entity_id: "unknown.entity",
            props: { service: "auto" }
        };
        const result = plugin.exportLVGL(widget, context);
        expect(result.button.on_click[0]["homeassistant.service"].service).toBe("homeassistant.toggle");
    });

    it('renders preview text with italic styling and border color', () => {
        const el = document.createElement('div');
        plugin.render(el, {
            id: 'btn_render',
            props: {
                text: 'Press',
                bg_color: 'white',
                color: 'blue',
                border_width: 3,
                radius: 9,
                font_family: 'Roboto',
                font_size: 16,
                font_weight: 600,
                italic: true
            }
        }, {
            getColorStyle: (value) => value
        });

        const span = el.querySelector('span');
        expect(el.style.border).toBe('3px solid blue');
        expect(el.style.borderRadius).toBe('9px');
        expect(span?.textContent).toBe('Press');
        expect(span?.style.fontStyle).toBe('italic');
        expect(span?.style.fontWeight).toBe('600');
    });

    it('maps scenes and button domains to the expected action payloads', () => {
        const scene = plugin.exportLVGL({
            id: 'scene_btn',
            type: 'lvgl_button',
            entity_id: 'scene.movie',
            props: { service: 'auto' }
        }, context);
        expect(scene.button.on_click[0]['scene.turn_on']).toBe('scene.movie');

        const button = plugin.exportLVGL({
            id: 'button_btn',
            type: 'lvgl_button',
            entity_id: 'button.doorbell',
            props: { service: 'auto' }
        }, context);
        expect(button.button.on_click[0]['homeassistant.service'].service).toBe('button.press');

        const noEntity = plugin.exportLVGL({
            id: 'button_empty',
            type: 'lvgl_button',
            entity_id: '',
            props: { text: 'Empty' }
        }, context);
        expect(noEntity.button.on_click).toBeUndefined();
    });

    it('can mirror binary Home Assistant state onto checkable buttons', () => {
        const result = plugin.exportLVGL({
            id: 'stateful_btn',
            type: 'lvgl_button',
            entity_id: 'switch.kitchen_light',
            props: {
                service: 'auto',
                sync_state: true,
                checkable: false
            }
        }, context);

        expect(result.button.checkable).toBe(true);
        expect(result.button.state.checked).toBe('!lambda return id(switch_kitchen_light).state;');
        expect(result.button.on_click[0]['homeassistant.service'].service).toBe('homeassistant.toggle');
    });

    it('does not attach checked-state sync for non-binary domains', () => {
        const result = plugin.exportLVGL({
            id: 'scene_sync_btn',
            type: 'lvgl_button',
            entity_id: 'scene.movie',
            props: {
                service: 'auto',
                sync_state: true,
                checkable: true
            }
        }, context);

        expect(result.button.state).toBeUndefined();
        expect(result.button.checkable).toBe(true);
    });
});
