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
});
