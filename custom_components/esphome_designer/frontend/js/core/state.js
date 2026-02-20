import { AppState } from './stores/index.js';

export { AppState };
window.AppState = AppState;

// Attach to unified namespace
window.ESPHomeDesigner = window.ESPHomeDesigner || {};
window.ESPHomeDesigner.state = AppState;
