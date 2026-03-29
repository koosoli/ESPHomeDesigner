type Page = Record<string, any>;
type Widget = Record<string, any>;
type ProjectPayload = Record<string, any>;
type PropertyPanel = Record<string, any>;
type RenderHelpers = Record<string, any>;
type LooseContext = Record<string, any>;

interface ImportMeta {
  glob?: {
    (pattern: string): Record<string, () => Promise<any>>;
    <T = any>(pattern: string, options: Record<string, any>): Record<string, T>;
  };
}

interface Window {
  ESPHomeDesigner: any;
  __ESPHOME_DESIGNER_HASS__?: {
    callApi?: (...args: any[]) => Promise<any>;
  } | null;
}

declare module '*state' {
  export const AppState: any;
}

declare module '*logger.js' {
  export const Logger: {
    log: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
  };
}

declare module '*helpers.js' {
  export function generateId(): string;
  export function deepClone<T>(value: T): T;
}

declare module '*devices.js' {
  export const DEVICE_PROFILES: Record<string, any>;
}

declare module '*events.js' {
  export const emit: any;
  export const on: any;
  export const EVENTS: any;
}

declare module '*text_utils.js' {
  export const wordWrap: any;
  export const parseColorMarkup: any;
  export const evaluateTemplatePreview: any;
}

declare module '*template_converter.js' {
  export class TemplateConverter {
    static toHATemplate(value: any, options?: Record<string, any>): string;
    static toESPHomeID(template: string): string;
  }
}

declare module '*constants' {
  export const COLORS: Record<string, string>;
  export const ALIGNMENT: Record<string, string>;
  export const UI_DEFAULTS: Record<string, number>;
  export const WIDGET_DEFAULTS: Record<string, number>;
  export const DEFAULT_CANVAS_WIDTH: number;
  export const DEFAULT_CANVAS_HEIGHT: number;
  export const ORIENTATIONS: Record<string, string>;
  export const DEFAULT_PREFERENCES: Record<string, any>;
  export const ESPHOME_COLOR_MAPPING: Record<string, string>;
  export const HISTORY_LIMIT: number;
  export const CACHE_TTL: Record<string, number>;
  export const ENTITY_LIMIT: number;
  export const SNAP_DISTANCE: number;
  export const GRID_SIZE: number;
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

declare module '*hardware_generators_display.js' {
  export const generateTouchscreenSection: any;
  export const generateBacklightSection: any;
  export const generateExtraComponents: any;
  export const generateI2CSection: any;
  export const generateSPISection: any;
  export const generatePSRAMSection: any;
  export const generateAXP2101Section: any;
  export const generateOutputSection: any;
  export const generateRTTTLSection: any;
  export const generateAudioSection: any;
}

declare module '*font_weights.js' {
  export const FONT_WEIGHTS: Record<string, number[]>;
  export function getWeightsForFont(family: string): number[];
  export function clampFontWeight(family: string, weight: number): number;
}

declare module '*ha_api_layouts.js' {
  export const loadLayoutFromBackend: any;
  export const saveLayoutToBackend: any;
  export const importSnippetBackend: any;
}

declare module '*runtime_root.js' {
  export const DESIGNER_PANEL_ROOT_ATTR: string;
  export const DESIGNER_PANEL_OVERLAY_ATTR: string;
  export function getDesignerRuntimeRoot(): HTMLElement;
  export function getDesignerOverlayRoot(): HTMLElement;
  export function appendToDesignerRoot<T extends Node>(node: T): T;
  export function appendToDesignerOverlayRoot<T extends Node>(node: T): T;
}

declare module '*yaml_import' {
  export const loadLayoutIntoState: any;
}

declare module '*device.js' {
  export const getColorStyle: any;
  export const getAvailableColors: any;
  export const isRGBDevice: any;
}

declare module '*property_controls.js' {
  export class PropertyControls {
    constructor(panel: any);
    [key: string]: any;
  }
}

declare module '*schema_renderer.js' {
  export const SchemaRenderer: any;
}

declare module '*grid_renderer.js' {
  export const GridRenderer: any;
}

declare module '*legacy_renderer_protocol.js' {
  export const renderProtocolProperties: any;
}

declare module '*legacy_renderer_widget_properties.js' {
  export const renderLegacyProperties: any;
}

declare module '*protocol_hardware.js' {
  export class ProtocolHardwarePanel {
    constructor(parent: any);
    init(): void;
    populateFields(): void;
    updateStrategyDisplay(): void;
  }
}

declare module '*plugin_registry' {
  export const registry: any;
}

declare module '@core/properties/calendar_python_template.js' {
  export const CALENDAR_HELPER_SCRIPT: string;
  export const buildCalendarPythonTemplate: any;
  export default any;
}

declare module '*constants_icons.js' {
  export const iconPickerData: Array<{ name: string; code: string }>;
}

declare module '*radial_menu.js' {
  export const radialMenu: any;
}

declare module '*sidebar.js' {
  export class Sidebar {
    constructor(app: any);
    init(): void;
  }
}

declare module '*canvas.js' {
  export class Canvas {
    constructor(app: any);
    focusPage(index: number, smooth: boolean): void;
  }
}

declare module '*properties.js' {
  export class PropertiesPanel {
    constructor(app: any);
    init(): void;
  }
}

declare module '*quick_search.js' {
  export class QuickSearch {
    discoverWidgets(): void;
  }
  export const quickSearchInstance: any;
}

declare module '*hierarchy_view.js' {
  export class HierarchyView {
    init(): void;
  }
}

declare module '*editor_settings.js' {
  export class EditorSettings {
    init(): void;
    open(section?: string): void;
    applyEditorTheme(lightMode: boolean): void;
  }
}

declare module '*snippet_manager.js' {
  export class SnippetManager {
    constructor(adapter: any);
    adapter: any;
    updateSnippetBox(): void;
  }
}

declare module '*device_settings.js' {
  export class DeviceSettings {
    init(): void;
    open(): void;
    populateDeviceSelect(): void;
  }
}

declare module '*page_settings.js' {
  export class PageSettings {
    init(): void;
    open(index: number): void;
  }
}

declare module '*layout_manager.js' {
  export class LayoutManager {
    open(): Promise<void>;
  }
}

declare module '*llm_prompt.js' {
  export class LLMPrompt {
    init(): void;
    open(): void;
    onOpenEditorSettings: ((source: string) => void) | null;
  }
}

declare module '*ignorable_rejections.js' {
  export function installIgnorableRejectionHandler(): void;
}

declare module '*init_ui.js' {
  export function initUI(): void;
}

declare module '*entity_picker.js' {
  export const openEntityPickerForWidget: any;
}

declare module '*widget_factory' {
  export const WidgetFactory: any;
}

declare module '*snippet_selection_bridge.js' {
  export const clearSnippetAutoHighlight: any;
  export const getLastSnippetHighlightRange: any;
  export const isSnippetAutoHighlightActive: any;
  export const SNIPPET_SELECTION_STATE_EVENT: string;
  export const setLastSnippetHighlightRange: any;
  export const setSnippetAutoHighlight: any;
}

declare module '*yaml_export_lvgl_transpile.js' {
  export const transpilePageWidget: any;
  export const hasLVGLWidgets: any;
  export const stripDefaults: any;
}

declare module '*ai_service.js' {
  export const aiService: any;
}

declare module '*yaml_import' {
  export const loadLayoutIntoState: any;
  export const parseSnippetYamlOffline: any;
}

declare module '*yaml_export.js' {
  export const highlightWidgetInSnippet: any;
}

declare module '*features/sensor_text/exports.js' {
  export const exportLVGL: any;
  export const exportOpenDisplay: any;
  export const exportOEPL: any;
  export const collectRequirements: any;
  export const exportDirect: any;
  export const onExportTextSensors: any;
  export const onExportNumericSensors: any;
}

declare module '*features/graph/exports.js' {
  export const exportLVGL: any;
  export const exportDoc: any;
  export const onExportComponents: any;
  export const onExportGlobals: any;
  export const onExportEsphome: any;
  export const onExportNumericSensors: any;
  export const onExportTextSensors: any;
}

declare module '*features/weather_forecast/export_direct.js' {
  export const exportDoc: any;
}

declare module '*features/weather_forecast/export_protocols.js' {
  export const exportLVGL: any;
  export const exportOEPL: any;
  export const exportOpenDisplay: any;
}

declare module 'js-yaml' {
  export interface Schema {
    extend(types: any[]): Schema;
  }

  export class Type {
    constructor(tag: string, options: Record<string, any>);
  }

  export const DEFAULT_SCHEMA: Schema;
  export function load(text: string, options?: Record<string, any>): any;
}
