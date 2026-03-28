import { exportDoc, exportLVGL, onExportComponents, onExportGlobals, onExportTextSensors } from './exports.js';
import { defaults, schema } from './properties.js';
import { render } from './render.js';

export default {
    id: "quote_rss",
    name: "Quote RSS",
    category: "Events",
    supportedModes: ['lvgl', 'direct'],
    defaults,
    schema,
    render,
    onExportGlobals,
    onExportTextSensors,
    onExportComponents,
    exportLVGL,
    export: exportDoc
};
