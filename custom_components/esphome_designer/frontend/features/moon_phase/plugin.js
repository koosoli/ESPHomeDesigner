import { renderMoonPhase } from './render.js';
import { renderMoonPhaseProperties } from './properties.js';
import {
    collectRequirements,
    exportDirect,
    exportLVGL,
    exportOEPL,
    exportOpenDisplay,
    onExportTextSensors
} from './exports.js';

export default {
    id: 'moon_phase',
    name: 'Moon Phase',
    category: 'Astronomy',
    supportedModes: ['lvgl', 'direct', 'oepl', 'opendisplay'],
    defaults: {
        width: 60,
        height: 60,
        size: 48,
        color: 'theme_auto',
        background_color: 'transparent',
        bg_color: 'transparent',
        entity_id: 'sensor.moon',
        fit_icon_to_frame: true,
        border_width: 0,
        border_color: 'theme_auto',
        border_radius: 0,
        opacity: 100,
        opa: 255
    },
    renderProperties: renderMoonPhaseProperties,
    render: renderMoonPhase,
    export: exportDirect,
    exportLVGL,
    exportOEPL,
    exportOpenDisplay,
    collectRequirements,
    onExportTextSensors
};
