import { AppState } from './stores/index';

export { AppState };

// Attach to unified namespace
(window as any).ESPHomeDesigner = (window as any).ESPHomeDesigner || {};
(window as any).ESPHomeDesigner.state = AppState;
