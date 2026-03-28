import { collectRequirements, exportDoc, exportLVGL, onExportNumericSensors } from './exports.js';
import { defaults, schema } from './properties.js';
import { render } from './render.js';

export default {
    id: "template_sensor_bar",
    name: "Sensor Bar",
    category: "Templates",
    supportedModes: ['lvgl', 'direct'],
    defaults,
    schema,
    render,
    exportLVGL,
    export: exportDoc,
    onExportNumericSensors,
    collectRequirements
};
