/**
 * @file types.d.ts
 * @description Global TypeScript definitions for ESPHome Designer.
 * This file provides JSDoc and IDE intellisense support.
 */

declare global {

    /**
     * Represents a single UI Widget element on the canvas.
     */
    interface Widget {
        /** Unique global identifier for the widget (e.g. "lvgl_button_1") */
        id: string;
        /** The base plugin type (e.g. "lvgl_button", "text", "shape_rect") */
        type: string;
        /** X-coordinate relative to the page/group */
        x: number;
        /** Y-coordinate relative to the page/group */
        y: number;
        /** Width of the bounding box */
        width: number;
        /** Height of the bounding box */
        height: number;
        /** Width alias (legacy/short) */
        w?: number;
        /** Height alias (legacy/short) */
        h?: number;
        /** Indicates if the widget is temporarily hidden in the editor */
        hidden?: boolean;
        /** Indicates if the widget is locked from selection/movement */
        locked?: boolean;

        // Common Optional Properties (Plugins use 'props' for these, but core uses these aliases occasionally)
        text?: string;
        content?: string;
        font_size?: number;
        color?: string;
        bg_color?: string;
        align?: 'left' | 'center' | 'right';

        // Data Binding & Interactivity
        entity_id?: string;
        entity_id_2?: string;

        // Conditional Visibility System
        condition_entity?: string;
        condition_operator?: '==' | '!=' | '>' | '<' | '>=' | '<=' | 'range' | 'compare_entity';
        condition_state?: string;
        condition_value?: string;
        condition_min?: string | number;
        condition_max?: string | number;
        condition_invert?: boolean;

        // Parent Reference (for groups/layouts)
        parentId?: string;

        /** Custom widget properties unique to specific plugins (e.g. icon_size) */
        props?: Record<string, any>;
    }

    /**
     * Represents a single Screen/Page in the UI design.
     */
    interface Page {
        /** Unique page identifier */
        id: string;
        /** Display name of the page */
        name: string;
        /** The children widgets placed directly on this page */
        widgets: Widget[];
        /** Color depth (Bits Per Pixel), usually 16 for RGB565 */
        bpp?: number;
        /** Dark mode setting for this page */
        dark_mode?: 'dark' | 'light' | 'inherit';
        /** Refresh mode ('interval', 'daily', etc.) */
        refresh_type?: string;
        /** Refresh interval/time */
        refresh_time?: number | string;
        /** Page visibility from time */
        visible_from?: string;
        /** Page visibility to time */
        visible_to?: string;
        /** Layout mode (e.g. "4x4", null for absolute) */
        layout?: string | null;
    }

    /**
     * Represents the precise configuration of the physical target display.
     */
    interface HardwareSettings {
        chip: string;
        tech: string;
        resWidth: number;
        resHeight: number;
        displayDriver?: string;
        displayModel?: string;
        memory?: 'psram' | 'none';
        touchTech?: string;
        shape?: string;
        pins?: Record<string, number | string>;
    }

    /**
     * Represents a device profile definition.
     */
    interface DeviceProfile {
        id?: string;
        name: string;
        isUntestedProfile?: boolean;
        model?: string;
        resolution?: { width: number, height: number };
        isPackageBased?: boolean;
        hardwarePackage?: string;
        frameworkHint?: string;
        features?: Record<string, any>;
        isOfflineImport?: boolean;
        content?: string;
        displayPlatform?: string;
        psram_speed?: string;
        battery?: boolean;
        external_components?: string[];
        system_section_overrides?: Record<string, string[]>;
        m5paper?: boolean;
        touch?: boolean;
        pins?: Record<string, any>;
    }

    /**
     * The master blueprint representing an entire ESPHome project.
     */
    interface ProjectPayload {
        /** The human-readable name of the project */
        name: string;
        /** The sanitized internal ESPHome node name */
        device_name?: string;
        /** Legacy camelCase device name used in runtime payloads */
        deviceName?: string;
        /** Array of defined pages */
        pages: Page[];
        /** The specific device profile being targeted (e.g., "reterminal_e1001" or "custom") */
        deviceModel?: string;
        /** Snake-case device model used by HA/backend payloads */
        device_model?: string;
        /** Array of user-uploaded or Google font definitions */
        glyphsets?: Array<{ file: string, weight: number, name: string }>;
        /** Custom hardware configurations (if deviceModel is 'custom') */
        customHardware?: HardwareSettings;
        /** Snake-case custom hardware payload */
        custom_hardware?: HardwareSettings;
        /** Protocol hardware payload for non-direct render modes */
        protocolHardware?: Record<string, any>;
        /** Snake-case protocol hardware payload */
        protocol_hardware?: Record<string, any>;
        /** Current page index persisted with payload */
        currentPageIndex?: number;
        /** Current layout identifier */
        currentLayoutId?: string;
        /** Orientation preference used by protocol adapters */
        orientation?: string;
        /** Nested settings bag for protocol adapters */
        settings?: Record<string, any>;
        /** Flag indicating if this is just a clipboard/snippet export rather than full firmware */
        isSelectionSnippet?: boolean;
        /** Render mode preference */
        renderingMode?: string;
        /** Inverted color flag */
        invertedColors?: boolean;
        /** Is Dark Mode enabled globally */
        darkMode?: boolean;
        /** LCD Economy Strategy */
        lcdEcoStrategy?: 'dim_after_timeout' | 'none';
        /** Timeout for dimming */
        dimTimeout?: number;
        /** Plugin dynamic includes */
        plugin_includes?: string[];
        /** Home Assistant helper used to hold the device awake during deep sleep flows */
        deepSleepStayAwakeEntityId?: string;
    }

    /**
     * Context passed during YAML generation.
     */
    interface GenerationContext {
        /** Output buffer */
        lines: string[];
        /** All widgets in the project or page */
        widgets: Widget[];
        /** Target device profile */
        profile: DeviceProfile;
        /** Parent layout/project payload */
        layout: ProjectPayload;
        /** Font inclusion helper */
        addFont: (family: string, weight: number, size: number, italic?: boolean) => string;
        /** Color parsing helper */
        getColorConst: (color: string) => string;
        /** Current adapter instance */
        adapter: any;
        /** E-paper target flag */
        isEpaper: boolean;
        /** Is Dark Mode active for the current context */
        isDark?: boolean;
        /** Set of already defined sensor IDs to avoid duplicates */
        seenSensorIds?: Set<string>;
        /** Triggers pending registration */
        pendingTriggers?: Map<string, Set<string>>;
    }

    /**
     * Plugin interface definition.
     */
    interface Plugin {
        id: string;
        name?: string;
        category?: string;
        supportedModes?: string[];
        defaults?: Record<string, any>;
        schema?: Array<{ section: string; fields: Array<{ key: string; type: string;[k: string]: any }> }>;
        width?: number;
        height?: number;
        render?: (el: HTMLElement, widget: any, helpers: any) => void;
        renderProperties?: (panel: any, widget: any) => void;
        export?: (widget: any, context: any) => string[] | void;
        exportLVGL?: (widget: any, helpers: any) => any;
        exportOEPL?: (widget: any, context: any) => any;
        exportOpenDisplay?: (widget: any, context: any) => any;
        collectRequirements?: (widget: Widget, helpers: any) => void;
        onExportComponents?: (context: any) => void;
        onExportEsphome?: (context: any) => void;
        onExportGlobals?: (context: any) => void;
        onExportNumericSensors?: (context: any) => void;
        onExportTextSensors?: (context: any) => void;
        onExportBinarySensors?: (context: any) => void;
        onExportHelpers?: (context: { lines: string[], widgets: Widget[], [key: string]: any }) => void;
    }

    interface AppState {
        // Properties from AppStateFacade
        currentPageIndex: number;
        selectedWidgetId: string | null;
        selectedWidgetIds: string[];
        deviceName: string | null;
        deviceModel: string | null;
        currentLayoutId: string | null;
        snapEnabled: boolean;
        showGrid: boolean;
        showDebugGrid: boolean;
        showRulers: boolean;
        zoomLevel: number;
        settings: Record<string, any>;

        // Methods
        reset: () => void;
        getCurrentPage: () => Page | null;
        getWidgetById: (id: string) => Widget | undefined;
        getSelectedWidget: () => Widget | undefined;
        getSelectedWidgets: () => Widget[];
        getSelectedProfile: () => DeviceProfile | null;
        getCanvasDimensions: () => { width: number; height: number };
        getCanvasShape: () => string;
        getPagesPayload: () => ProjectPayload;
        getSettings: () => Record<string, any>;
        setSettings: (s: any) => void;

        // Actions
        setCurrentPageIndex: (index: number, options?: any) => void;
        selectWidget: (id: string, multi?: boolean) => void;
        selectWidgets: (ids: string[]) => void;
        selectAllWidgets: () => void;
        deselectAll: () => void;
        toggleSelection: (id: string) => void;
        isWidgetSelected: (id: string) => boolean;

        // Page Operations
        addPage: (index?: number) => Page | null;
        deletePage: (index: number) => void;
        reorderPage: (from: number, to: number) => void;
        renamePage: (index: number, name: string) => void;
        duplicatePage: (index: number) => void;
        clearCurrentPage: (preserveLocked?: boolean) => { deleted: number, preserved: number };

        // Widget Operations
        addWidget: (w: Widget, pageIndex?: number) => void;
        updateWidget: (id: string, updates: Partial<Widget>) => void;
        updateWidgets: (ids: string[], updates: Partial<Widget>) => void;
        updateWidgetsProps: (ids: string[], propUpdates: any) => void;
        moveWidgetToPage: (widgetId: string, targetPageIndex: number, x?: number | null, y?: number | null) => boolean;
        deleteWidget: (id?: string | null) => void;
        copyWidget: (id?: string | null) => void;
        pasteWidget: () => void;
        createDropShadow: (widgetIdOrIds: string | string[]) => void;

        // Alignment & Grouping
        alignSelectedWidgets: (direction: string) => void;
        distributeSelectedWidgets: (axis: string) => void;
        groupSelection: () => void;
        ungroupSelection: (idOrIds?: string | string[] | null) => void;

        // History
        undo: () => void;
        redo: () => void;
        recordHistory: () => void;

        // Snap
        setSnapEnabled: (enabled: boolean) => void;

        // Visuals
        setShowGrid: (val: boolean) => void;
        setShowDebugGrid: (val: boolean) => void;
        setShowRulers: (val: boolean) => void;
        setZoomLevel: (val: number) => void;

        // Event emitter interface
        emit: (event: string, data?: any) => void;
        on: (event: string, callback: Function) => void;

        // Legacy/Internal
        state: any;
        entityStates: Record<string, any>;
        isUndoRedoInProgress: boolean;
        pages: Page[];
        updateLayoutIndicator?: () => void;
    }

    interface PluginRegistry {
        register: (plugin: Plugin) => void;
        get: (id: string) => Plugin | undefined;
        getAll: () => Plugin[];
        loadAll: () => Promise<void>;
        onExportEsphome: (context: any) => void;
        onExportGlobals: (context: GenerationContext) => void;
        onExportNumericSensors: (context: GenerationContext) => void;
        onExportTextSensors: (context: GenerationContext) => void;
        onExportBinarySensors: (context: GenerationContext) => void;
        onExportComponents: (context: GenerationContext & { displayId: string }) => void;
        onExportHelpers: (context: { lines: string[], widgets: Widget[] }) => void;
        onCollectRequirements?: (context: any) => void;
    }

    interface Window {
        PluginRegistry: PluginRegistry;
        ESPHomeAdapter: any;
        DEVICE_PROFILES: Record<string, DeviceProfile>;
        // Utils: any; // Conflict with utils.ts
        generateDisplaySection?: (profile: DeviceProfile, orientation?: string) => string[];
        generateLVGLSnippet?: (pages: Page[], model: string) => string[];
        ESPHomeDesigner: {
            app: any;
            ui: {
                sidebar: any;
                canvas: any;
                properties: any;
            }
        };
    }

    var PluginRegistry: PluginRegistry;
    var ESPHomeAdapter: any;
    var DEVICE_PROFILES: Record<string, DeviceProfile>;
    var Utils: any;
}

export { };
