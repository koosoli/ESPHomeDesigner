import { render } from './render.js';
import { renderProperties } from './properties.js';
import { collectRequirements, exportDirect, exportLVGL, onExportTextSensors } from './exports.js';

export default {
    id: "calendar",
    name: "Calendar",
    category: "Events",
    supportedModes: ['lvgl', 'direct'],
    defaults: {
        entity_id: "sensor.esp_calendar_data",
        border_width: 0,
        show_border: true,
        border_color: "theme_auto",
        border_radius: 0,
        background_color: "transparent",
        text_color: "theme_auto",
        font_size_date: 100,
        font_size_day: 24,
        font_size_grid: 14,
        font_size_event: 18,
        show_header: true,
        show_grid: true,
        show_events: true,
        width: 335,
        height: 340,
        opa: 255,
        font_weight_header_date: 100,
        font_weight_header_day: 700,
        font_weight_month: 400,
        font_weight_grid_header: 700,
        font_weight_dates: 700,
        font_weight_events: 400
    },
    renderProperties,
    render,
    onExportTextSensors,
    exportLVGL,
    export: exportDirect,
    collectRequirements
};
