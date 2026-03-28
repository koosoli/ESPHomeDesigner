type Page = Record<string, any>;
type Widget = Record<string, any>;
type ProjectPayload = Record<string, any>;

declare module '*state' {
  export const AppState: any;
}

declare module '*events.js' {
  export const emit: any;
  export const on: any;
  export const EVENTS: any;
}

declare module '*constants' {
  export const DEFAULT_CANVAS_WIDTH: number;
  export const DEFAULT_CANVAS_HEIGHT: number;
  export const ORIENTATIONS: Record<string, string>;
}

declare module '*canvas_renderer.js' {
  export const render: any;
  export const applyZoom: any;
  export const renderContextToolbar: any;
  export const focusPage: any;
  export const zoomToFitAll: any;
}

declare module '*canvas_rulers.js' {
  export class CanvasRulers {
    constructor(canvas: any);
    update(): void;
    setIndicators(...args: any[]): void;
  }
}

declare module '*canvas_interactions.js' {
  export const setupInteractions: any;
  export const setupPanning: any;
  export const setupZoomControls: any;
  export const setupDragAndDrop: any;
  export const zoomIn: any;
  export const zoomOut: any;
  export const zoomReset: any;
  export const onMouseMove: any;
  export const onMouseUp: any;
}

declare module '*canvas_touch.js' {
  export const setupTouchInteractions: any;
}

declare module '*hardware_profile_sources.js' {
  export const fetchDynamicHardwareProfiles: any;
  export const getOfflineProfilesFromStorage: any;
}

declare module '*ha_api_layouts.js' {
  export const loadLayoutFromBackend: any;
  export const saveLayoutToBackend: any;
  export const importSnippetBackend: any;
}
