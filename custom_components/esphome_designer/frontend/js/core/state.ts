import { AppState } from './stores/index';

declare global {
    interface Window {
        AppState: typeof AppState;
        ESPHomeDesigner: any;
    }
}

export { AppState };
window.AppState = AppState;

// Attach to unified namespace
(window as any).ESPHomeDesigner = (window as any).ESPHomeDesigner || {};
(window as any).ESPHomeDesigner.state = AppState;
