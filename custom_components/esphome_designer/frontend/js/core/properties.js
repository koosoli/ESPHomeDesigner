import { PropertyControls } from '../ui/components/property_controls.js';
import { AppState } from './state';
import { registry } from './plugin_registry.js';
import { on, EVENTS } from './events.js';
import { canvasInstance } from './canvas.js';

// Specialized Renderers
import { SchemaRenderer } from './properties/schema_renderer.js';
import { MultiSelectRenderer } from './properties/multi_select_renderer.js';
import { GridRenderer } from './properties/grid_renderer.js';
import { LegacyRenderer } from './properties/legacy_renderer.js';
import { Logger } from '../utils/logger.js';

/**
 * @typedef {{
 *   id: string,
 *   type: string,
 *   x: number,
 *   y: number,
 *   width: number,
 *   height: number,
 *   locked?: boolean,
 *   title?: string,
 *   props?: Record<string, any>
 * }} PropertiesWidget
 */

/**
 * PropertiesPanel is the main orchestrator for the right-hand sidebar.
 * It manages the UI for editing widget properties.
 */
export class PropertiesPanel {
    /** @param {any} appInstance */
    constructor(appInstance = null) {
        /** @type {any} */
        this.app = appInstance;
        /** @type {HTMLElement | null} */
        this.panel = document.getElementById("propertiesPanel");
        this.controls = new PropertyControls(this);
        /** @type {string | null} */
        this.lastRenderedWidgetId = null;
        /** @type {string} */
        this.lastRenderedSelectionKey = "";
        /** @type {PropertiesWidget | null} */
        this.activeWidget = null;
        /** @type {HTMLElement[]} */
        this.containerStack = [];
        /** @type {Record<string, boolean>} */
        this.sectionStates = {};
    }

    init() {
        // Subscribe to events
        on(EVENTS.SELECTION_CHANGED, () => this.render());
        on(EVENTS.STATE_CHANGED, () => this.render());

        // Bind Snap Toggle (Static in sidebar)
        const snapToggle = /** @type {HTMLInputElement | null} */ (document.getElementById("snapToggle"));
        if (snapToggle) {
            snapToggle.checked = AppState.snapEnabled;
            snapToggle.addEventListener("change", (e) => {
                AppState.setSnapEnabled(/** @type {HTMLInputElement} */(e.target).checked);
            });
            on(EVENTS.SETTINGS_CHANGED, (settings) => {
                if (settings.snapEnabled !== undefined) {
                    snapToggle.checked = settings.snapEnabled;
                }
            });
        }

        // Bind Lock Toggle (Static in sidebar)
        const lockToggle = document.getElementById("lockPositionToggle");
        if (lockToggle) {
            lockToggle.addEventListener("change", (e) => {
                const selectedIds = AppState.selectedWidgetIds;
                if (selectedIds.length > 0) {
                    AppState.updateWidgets(selectedIds, { locked: /** @type {HTMLInputElement} */ (e.target).checked });
                }
            });
        }

        this.render();
    }

    render() {
        if (!this.panel) return;

        // Suppress updates during lasso drag to keep 60fps
        if (canvasInstance && canvasInstance.lassoState) return;

        const selectedIds = AppState.selectedWidgetIds ||
            (AppState.selectedWidgetId ? [AppState.selectedWidgetId] : []);
        const selectionKey = selectedIds.join("|");

        const currentWidgetId = AppState.selectedWidgetId;
        const widgetChanged = this.lastRenderedWidgetId !== currentWidgetId;
        const selectionChanged = this.lastRenderedSelectionKey !== selectionKey;

        if (selectedIds.length > 1) {
            Logger.log(`[PropertiesPanel] Multi-select detected: ${selectedIds.length} widgets. Selection key: ${selectionKey}`);
        }

        // Prevent re-rendering if user is typing in the panel AND same widget
        if (!widgetChanged && !selectionChanged && this.panel && this.panel.isConnected) {
            const active = /** @type {HTMLElement} */ (document.activeElement);
            if (active && this.panel.contains(active)) {
                const tag = active.tagName.toLowerCase();
                const type = /** @type {any} */ (active).type ? /** @type {any} */ (active).type.toLowerCase() : "";
                const isLayoutControl = (tag === "input" && ["checkbox", "radio", "button"].includes(type)) || tag === "select";

                if (!isLayoutControl && (tag === "input" || tag === "textarea" || active.classList.contains("prop-input"))) {
                    return; // Don't steal focus
                }
            }
        }

        this.lastRenderedWidgetId = currentWidgetId;
        this.lastRenderedSelectionKey = selectionKey;
        this.containerStack = [];
        this.panel.innerHTML = "";

        // Update Lock Toggle state
        const lockToggle = document.getElementById("lockPositionToggle");
        if (lockToggle) {
            const selectedWidgets = /** @type {Array<{ locked?: boolean }>} */ (AppState.getSelectedWidgets());
            const allLocked = selectedWidgets.length > 0 && selectedWidgets.every(w => w.locked);
            const someLocked = selectedWidgets.some(w => w.locked);

            const input = /** @type {HTMLInputElement} */ (lockToggle);
            input.checked = allLocked;
            input.indeterminate = someLocked && !allLocked;
            input.disabled = selectedWidgets.length === 0;
        }

        if (selectedIds.length === 0) {
            this.panel.innerHTML = "<div style='padding:16px;color:#aaa;text-align:center;'>Select a widget to edit properties</div>";
            return;
        }

        if (selectedIds.length > 1) {
            MultiSelectRenderer.render(this, selectedIds);
            return;
        }

        const widget = /** @type {PropertiesWidget | null} */ (AppState.getSelectedWidget());
        if (!widget) return;

        const type = widget.type;
        const registryEntry = registry.get(type);

        // Header
        let displayType = type;
        if (type === "nav_next_page") displayType = "next page";
        else if (type === "nav_previous_page") displayType = "previous page";
        else if (type === "nav_reload_page") displayType = "reload page";
        else displayType = type.replace(/_/g, " ");

        const title = document.createElement("div");
        title.className = "sidebar-section-label";
        title.style.marginTop = "0";
        title.style.textTransform = "capitalize";
        title.textContent = `${displayType} Properties`;
        this.panel.appendChild(title);

        // 1. Transform Section (for Absolute layout)
        const page = AppState.getCurrentPage();
        const layout = page?.layout || "absolute";

        if (layout === "absolute") {
            this.createSection("Transform", false);
            /** @param {string} v */
            const updateX = (v) => {
                AppState.updateWidget(widget.id, { x: parseInt(v, 10) || 0 });
            };
            /** @param {string} v */
            const updateY = (v) => {
                AppState.updateWidget(widget.id, { y: parseInt(v, 10) || 0 });
            };
            /** @param {string} v */
            const updateWidth = (v) => {
                AppState.updateWidget(widget.id, { width: parseInt(v, 10) || 10 });
            };
            /** @param {string} v */
            const updateHeight = (v) => {
                AppState.updateWidget(widget.id, { height: parseInt(v, 10) || 10 });
            };
            this.addCompactPropertyRow(() => {
                this.addLabeledInput("Pos X", "number", widget.x, updateX);
                this.addLabeledInput("Pos Y", "number", widget.y, updateY);
            });
            this.addCompactPropertyRow(() => {
                this.addLabeledInput("Width", "number", widget.width, updateWidth);
                this.addLabeledInput("Height", "number", widget.height, updateHeight);
            });
            this.endSection();
        }

        // 2. Grid Properties
        GridRenderer.render(this, widget, type, this.app?.pageSettings);

        // 3. Specialized Rendering
        const mode = AppState.settings?.renderingMode || 'direct';

        if (registryEntry && registryEntry.schema) {
            if (type.startsWith('lvgl_')) {
                this.addCommonLVGLProperties(widget, widget.props || {});
            }
            SchemaRenderer.render(this, widget, registryEntry.schema);
        } else if (registryEntry && registryEntry.renderProperties) {
            registryEntry.renderProperties(this, widget);
        } else if (mode === 'oepl' || mode === 'opendisplay') {
            LegacyRenderer.renderProtocolProperties(this, widget, type);
        } else {
            LegacyRenderer.renderLegacyProperties(this, widget, type);
        }

        // 4. Visibility Conditions (Common for all)
        this.createSection("Visibility Conditions", false);
        this.addVisibilityConditions(widget);
        this.endSection();
    }

    // --- Section Management ---

    /**
     * @param {string} title
     * @param {boolean} [defaultExpanded]
     * @returns {HTMLDivElement}
     */
    createSection(title, defaultExpanded = true) {
        const isCollapsed = this.sectionStates[title] !== undefined ?
            this.sectionStates[title] === false :
            !defaultExpanded;

        const section = document.createElement("div");
        section.className = "properties-section" + (isCollapsed ? " collapsed" : "");

        const header = document.createElement("div");
        header.className = "properties-section-header";
        header.innerHTML = `<span>${title}</span> <span class="icon mdi mdi-chevron-down"></span>`;
        header.onclick = (e) => {
            e.stopPropagation();
            const nowCollapsed = section.classList.toggle("collapsed");
            this.sectionStates[title] = !nowCollapsed;
        };

        const content = document.createElement("div");
        content.className = "properties-section-content";

        section.appendChild(header);
        section.appendChild(content);

        if (this.sectionStates[title] === undefined) {
            this.sectionStates[title] = !isCollapsed;
        }

        const container = this.getContainer();
        if (!container) {
            return content;
        }
        container.appendChild(section);
        this.containerStack.push(content);
        return content;
    }

    endSection() {
        if (this.containerStack.length > 0) {
            this.containerStack.pop();
        }
    }

    /**
     * @returns {HTMLElement | null}
     */
    getContainer() {
        return this.containerStack.length > 0 ?
            this.containerStack[this.containerStack.length - 1] :
            this.panel;
    }

    /**
     * @param {string} widgetId
     * @param {string} entityId
     */
    autoPopulateTitleFromEntity(widgetId, entityId) {
        if (!entityId || !AppState || !AppState.entityStates) return;
        const entity = AppState.entityStates[entityId];
        if (entity && entity.attributes && entity.attributes.friendly_name) {
            AppState.updateWidget(widgetId, { title: entity.attributes.friendly_name });
        }
    }

    // --- Delegation Methods (to PropertyControls) ---
    /** @param {...any} args */
    addLabeledInput(...args) { return this.controls.addLabeledInput.apply(this.controls, args); }
    /** @param {...any} args */
    addSelect(...args) { return this.controls.addSelect.apply(this.controls, args); }
    /** @param {...any} args */
    addCheckbox(...args) { return this.controls.addCheckbox.apply(this.controls, args); }
    /** @param {...any} args */
    addHint(...args) { return this.controls.addHint.apply(this.controls, args); }
    /** @param {...any} args */
    addLabeledInputWithPicker(...args) { return this.controls.addLabeledInputWithPicker.apply(this.controls, args); }
    /** @param {...any} args */
    addColorSelector(...args) { return this.controls.addColorSelector.apply(this.controls, args); }
    /** @param {...any} args */
    addColorMixer(...args) { return this.controls.addColorMixer.apply(this.controls, args); }
    /** @param {...any} args */
    addSegmentedControl(...args) { return this.controls.addSegmentedControl.apply(this.controls, args); }
    /** @param {...any} args */
    addIconPicker(...args) { return this.controls.addIconPicker ? this.controls.addIconPicker.apply(this.controls, args) : null; }
    /** @param {...any} args */
    addNumberWithSlider(...args) { return this.controls.addNumberWithSlider.apply(this.controls, args); }
    /** @param {...any} args */
    addCompactPropertyRow(...args) { return this.controls.addCompactPropertyRow.apply(this.controls, args); }
    /** @param {...any} args */
    addCommonLVGLProperties(...args) { return this.controls.addCommonLVGLProperties.apply(this.controls, args); }
    /** @param {...any} args */
    addVisibilityConditions(...args) { return this.controls.addVisibilityConditions.apply(this.controls, args); }
    /** @param {...any} args */
    addPageSelector(...args) { return this.controls.addPageSelector.apply(this.controls, args); }
    /** @param {...any} args */
    addIconInput(...args) { return this.controls.addIconInput ? this.controls.addIconInput.apply(this.controls, args) : null; }
    /** @param {...any} args */
    addLabeledInputWithIconPicker(...args) { return this.controls.addLabeledInputWithIconPicker ? this.controls.addLabeledInputWithIconPicker.apply(this.controls, args) : null; }

    // Polyfill for methods lost in refactoring to prevent crashes
    /**
     * @param {HTMLElement} container
     * @param {string} widgetId
     */
    addDropShadowButton(container, widgetId) {
        const wrap = document.createElement("div");
        wrap.className = "field";
        wrap.style.marginTop = "8px";

        const btn = document.createElement("button");
        btn.className = "btn btn-secondary btn-full btn-xs";
        btn.innerHTML = `<span class="mdi mdi-box-shadow"></span> Create Drop Shadow`;
        btn.onclick = () => {
            const selected = AppState.selectedWidgetIds || [];
            if (selected.includes(widgetId)) {
                AppState.createDropShadow(selected);
            } else {
                AppState.createDropShadow(widgetId);
            }
        };

        wrap.appendChild(btn);
        container.appendChild(wrap);
    }
    /** @param {...any} args */
    addLabeledInputWithDataList(...args) { return this.controls.addLabeledInputWithDataList(...args); }
    /** @param {...any} args */
    addSectionLabel(...args) { return this.controls.addSectionLabel(...args); }
}
