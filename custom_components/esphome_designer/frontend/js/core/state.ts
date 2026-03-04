import { AppState } from './stores/index';

export { AppState };
window.AppState = AppState;

// Attach to unified namespace
(window as any).ESPHomeDesigner = (window as any).ESPHomeDesigner || {};
(window as any).ESPHomeDesigner.state = AppState;
