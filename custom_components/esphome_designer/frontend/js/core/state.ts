import { AppState } from './stores/index';

export { AppState };

// Attach to unified namespace
const rootWindow = globalThis as typeof window;
rootWindow.ESPHomeDesigner = rootWindow.ESPHomeDesigner || {};
rootWindow.ESPHomeDesigner.state = AppState;
