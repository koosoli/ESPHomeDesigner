import { renderSunTimes } from './render.js';
import { renderSunTimesProperties } from './properties.js';
import {
    collectRequirements,
    exportDirect,
    exportLVGL,
    exportOEPL,
    exportOpenDisplay,
    onExportTextSensors
} from './exports.js';

export default {
    id: 'sun_times',
    name: 'Sunrise / Sunset',
    category: 'Astronomy',
    supportedModes: ['lvgl', 'direct', 'oepl', 'opendisplay'],
    defaults: {
        width: 140,
        height: 60,
        sunrise_entity: 'sensor.sun_next_rising',
        sunset_entity: 'sensor.sun_next_setting',
        show_sunrise: true,
        show_sunset: true,
        placeholder: 'n.d.',
        icon_size: 18,
        font_size: 16,
        font_family: 'Roboto',
        font_weight: 400,
        color: 'theme_auto',
        background_color: 'transparent',
        bg_color: 'transparent',
        row_gap: 6,
        icon_gap: 8,
        padding: 6,
        border_width: 0,
        border_color: 'theme_auto',
        border_radius: 0,
        opacity: 100,
        opa: 255
    },
    renderProperties: renderSunTimesProperties,
    render: renderSunTimes,
    export: exportDirect,
    exportLVGL,
    exportOEPL,
    exportOpenDisplay,
    collectRequirements,
    onExportTextSensors
};
