import { fetchEntityStates } from '../io/ha_api.js'; // eslint-disable-line no-unused-vars
import { MIXED_VALUE } from '../utils/color_utils.js'; // eslint-disable-line no-unused-vars
import { PropertyControls } from '../ui/components/property_controls.js';
import { AppState } from './state';
import { getAvailableColors, getDeviceModel, isRGBDevice } from '../utils/device.js'; // eslint-disable-line no-unused-vars
import { registry } from './plugin_registry';
import { WidgetFactory } from './widget_factory'; // eslint-disable-line no-unused-vars
import { getWeightsForFont, clampFontWeight } from './font_weights.js'; // eslint-disable-line no-unused-vars
import { on, EVENTS } from './events.js';

// Specialized Renderers
import { SchemaRenderer } from './properties/schema_renderer.js';
import { MultiSelectRenderer } from './properties/multi_select_renderer.js';
import { GridRenderer } from './properties/grid_renderer.js';
import { LegacyRenderer } from './properties/legacy_renderer.js';

/**
 * PropertiesPanel is the main orchestrator for the right-hand sidebar.
 * It manages the UI for editing widget properties.
 */
export class PropertiesPanel {
    constructor() {
        this.panel = document.getElementById("propertiesPanel");
        this.controls = new PropertyControls(this);
        this.lastRenderedWidgetId = null;
        this.activeWidget = null;
        this.containerStack = [];
        this.sectionStates = {};
    }

    init() {
        // Subscribe to events
        on(EVENTS.SELECTION_CHANGED, () => this.render());
        on(EVENTS.STATE_CHANGED, () => this.render());
        on(EVENTS.WIDGET_SELECTED, () => this.render());
        on(EVENTS.WIDGETS_SELECTED, () => this.render());
        on(EVENTS.PAGE_SELECTED, () => this.render());
        on(EVENTS.PAGE_UPDATED, () => this.render());

        // Bind Snap Toggle (Static in sidebar)
        const snapToggle = document.getElementById("snapToggle");
        if (snapToggle) {
            snapToggle.checked = AppState.snapEnabled;
            snapToggle.addEventListener("change", (e) => {
                AppState.setSnapEnabled(e.target.checked);
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
                    AppState.updateWidgets(selectedIds, { locked: e.target.checked });
                }
            });
        }

        this.render();
    }

    render() {
        if (!this.panel) return;

        // Suppress updates during lasso drag to keep 60fps
        if (window.Canvas && window.Canvas.lassoState) return;

        const currentWidgetId = AppState.selectedWidgetId;
        const widgetChanged = this.lastRenderedWidgetId !== currentWidgetId;

        // Prevent re-rendering if user is typing in the panel AND same widget
        if (!widgetChanged && this.panel && this.panel.isConnected) {
            const active = document.activeElement;
            if (active && this.panel.contains(active)) {
                const tag = active.tagName.toLowerCase();
                const type = active.type ? active.type.toLowerCase() : "";
                const isLayoutControl = (tag === "input" && ["checkbox", "radio", "button"].includes(type)) || tag === "select";

                if (!isLayoutControl && (tag === "input" || tag === "textarea" || active.classList.contains("prop-input"))) {
                    return; // Don't steal focus
                }
            }
        }

        this.lastRenderedWidgetId = currentWidgetId;
        this.containerStack = [];
        this.panel.innerHTML = "";

        // Update Lock Toggle state
        const lockToggle = document.getElementById("lockPositionToggle");
        if (lockToggle) {
            const selectedWidgets = AppState.getSelectedWidgets();
            const allLocked = selectedWidgets.length > 0 && selectedWidgets.every(w => w.locked);
            const someLocked = selectedWidgets.some(w => w.locked);

            lockToggle.checked = allLocked;
            lockToggle.indeterminate = someLocked && !allLocked;
            lockToggle.disabled = selectedWidgets.length === 0;
        }

        const selectedIds = AppState.getSelectedWidgetIds ? AppState.getSelectedWidgetIds() :
            (AppState.selectedWidgetId ? [AppState.selectedWidgetId] : []);

        if (selectedIds.length === 0) {
            this.panel.innerHTML = "<div style='padding:16px;color:#aaa;text-align:center;'>Select a widget to edit properties</div>";
            return;
        }

        if (selectedIds.length > 1) {
            MultiSelectRenderer.render(this, selectedIds);
            return;
        }

        const widget = AppState.getSelectedWidget();
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
            this.addCompactPropertyRow(() => {
                this.addLabeledInput("Pos X", "number", widget.x, (v) => {
                    AppState.updateWidget(widget.id, { x: parseInt(v, 10) || 0 });
                });
                this.addLabeledInput("Pos Y", "number", widget.y, (v) => {
                    AppState.updateWidget(widget.id, { y: parseInt(v, 10) || 0 });
                });
            });
            this.addCompactPropertyRow(() => {
                this.addLabeledInput("Width", "number", widget.width, (v) => {
                    AppState.updateWidget(widget.id, { width: parseInt(v, 10) || 10 });
                });
                this.addLabeledInput("Height", "number", widget.height, (v) => {
                    AppState.updateWidget(widget.id, { height: parseInt(v, 10) || 10 });
                });
            });
            this.endSection();
        }

        // 2. Grid Properties
        GridRenderer.render(this, widget, type);

        // 3. Specialized Rendering
        const mode = AppState.settings?.renderingMode || 'direct';

        if (registryEntry && registryEntry.schema) {
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

        this.getContainer().appendChild(section);
        this.containerStack.push(content);
        return content;
    }

    endSection() {
        if (this.containerStack.length > 0) {
            this.containerStack.pop();
        }
    }

    getContainer() {
        return this.containerStack.length > 0 ?
            this.containerStack[this.containerStack.length - 1] :
            this.panel;
    }

    autoPopulateTitleFromEntity(widgetId, entityId) {
        if (!entityId || !window.AppState || !window.AppState.entityStates) return;
        const entity = window.AppState.entityStates[entityId];
        if (entity && entity.attributes && entity.attributes.friendly_name) {
            AppState.updateWidget(widgetId, { title: entity.attributes.friendly_name });
        }
    }

    // --- Delegation Methods (to PropertyControls) ---

    addLabeledInput(...args) { return this.controls.addLabeledInput(...args); }
    addSelect(...args) { return this.controls.addSelect(...args); }
    addCheckbox(...args) { return this.controls.addCheckbox(...args); }
    addHint(...args) { return this.controls.addHint(...args); }
    addLabeledInputWithPicker(...args) { return this.controls.addLabeledInputWithPicker(...args); }
    addColorSelector(...args) { return this.controls.addColorSelector(...args); }
    addColorMixer(...args) { return this.controls.addColorMixer(...args); }
    addSegmentedControl(...args) { return this.controls.addSegmentedControl(...args); }
    addIconPicker(...args) { return this.controls.addIconPicker ? this.controls.addIconPicker(...args) : null; }
    addNumberWithSlider(...args) { return this.controls.addNumberWithSlider(...args); }
    addCompactPropertyRow(...args) { return this.controls.addCompactPropertyRow(...args); }
    addCommonLVGLProperties(...args) { return this.controls.addCommonLVGLProperties(...args); }
    addVisibilityConditions(...args) { return this.controls.addVisibilityConditions(...args); }
    addPageSelector(...args) { return this.controls.addPageSelector(...args); }
    addIconInput(...args) { return this.controls.addIconInput ? this.controls.addIconInput(...args) : null; }
    addLabeledInputWithIconPicker(...args) { return this.controls.addLabeledInputWithIconPicker ? this.controls.addLabeledInputWithIconPicker(...args) : null; }

    // Polyfill for methods lost in refactoring to prevent crashes
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
    addLabeledInputWithDataList(...args) { return this.controls.addLabeledInputWithDataList(...args); }
    addSectionLabel(...args) { return this.controls.addSectionLabel(...args); }
}
