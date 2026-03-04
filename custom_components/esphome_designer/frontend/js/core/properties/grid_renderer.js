import { AppState } from '../state';
import { WidgetFactory } from '../widget_factory';

export class GridRenderer {
    /**
     * Renders grid cell position properties for widgets.
        * @param {any} panel - The main properties panel instance.
     * @param {Object} widget - The widget being edited.
     * @param {string} type - The widget type.
     * @param {any} pageSettings - Injected page settings controller.
     */
    static render(panel, widget, type, pageSettings) {
        const page = AppState.getCurrentPage();
        const layout = page?.layout || "absolute";
        const isGrid = layout !== "absolute";

        if (!page) return;

        // If not in grid mode, show an "Enable Grid" prompt
        if (!isGrid) {
            const container = panel.getContainer();
            const msg = document.createElement("div");
            msg.style.padding = "8px 0";
            msg.style.fontSize = "11px";
            msg.style.color = "var(--muted)";
            msg.textContent = "Page is currently in Absolute Positioning mode.";
            container.appendChild(msg);

            const enableBtn = document.createElement("button");
            enableBtn.className = "btn btn-secondary btn-xs";
            enableBtn.style.width = "100%";
            enableBtn.innerHTML = `<span class="mdi mdi-grid"></span> Enable Page Grid Layout`;
            enableBtn.onclick = () => {
                if (pageSettings) {
                    pageSettings.open(AppState.currentPageIndex);
                }
            };
            container.appendChild(enableBtn);
            return;
        }

        const isLvgl = WidgetFactory.isLvglWidget(type);
        const props = widget.props || {};

        const updateProp = (key, value) => {
            const newProps = { ...widget.props, [key]: value };
            AppState.updateWidget(widget.id, { props: newProps });
        };

        // Helper to calculate x/y from grid position for non-LVGL widgets
        const calculateGridPosition = (row, col, rowSpan, colSpan) => {
            const match = page.layout.match(/^(\d+)x(\d+)$/);
            if (!match) return null;

            const rows = parseInt(match[1], 10);
            const cols = parseInt(match[2], 10);
            const dims = AppState.getCanvasDimensions();
            const cellWidth = dims.width / cols;
            const cellHeight = dims.height / rows;

            return {
                x: Math.round(col * cellWidth),
                y: Math.round(row * cellHeight),
                width: Math.round(cellWidth * colSpan),
                height: Math.round(cellHeight * rowSpan)
            };
        };

        // Row Position
        panel.addLabeledInput("Row (0-indexed)", "number", props.grid_cell_row_pos ?? "", (v) => {
            const val = v === "" ? null : parseInt(v, 10);
            updateProp("grid_cell_row_pos", isNaN(val) ? null : val);

            const freshWidget = AppState.getWidgetById(widget.id);
            const fp = freshWidget?.props || {};
            if (val != null && fp.grid_cell_column_pos != null) {
                const pos = calculateGridPosition(val, fp.grid_cell_column_pos,
                    fp.grid_cell_row_span || 1, fp.grid_cell_column_span || 1);
                if (pos) {
                    AppState.updateWidget(widget.id, { x: pos.x, y: pos.y, width: pos.width, height: pos.height });
                }
            }
        });

        // Column Position
        panel.addLabeledInput("Column (0-indexed)", "number", props.grid_cell_column_pos ?? "", (v) => {
            const val = v === "" ? null : parseInt(v, 10);
            updateProp("grid_cell_column_pos", isNaN(val) ? null : val);

            const freshWidget = AppState.getWidgetById(widget.id);
            const fp = freshWidget?.props || {};
            if (val != null && fp.grid_cell_row_pos != null) {
                const pos = calculateGridPosition(fp.grid_cell_row_pos, val,
                    fp.grid_cell_row_span || 1, fp.grid_cell_column_span || 1);
                if (pos) {
                    AppState.updateWidget(widget.id, { x: pos.x, y: pos.y, width: pos.width, height: pos.height });
                }
            }
        });

        // Row Span
        panel.addLabeledInput("Row Span", "number", props.grid_cell_row_span || 1, (v) => {
            const span = Math.max(1, parseInt(v, 10) || 1);
            updateProp("grid_cell_row_span", span);

            const freshWidget = AppState.getWidgetById(widget.id);
            const fp = freshWidget?.props || {};
            if (fp.grid_cell_row_pos != null && fp.grid_cell_column_pos != null) {
                const pos = calculateGridPosition(fp.grid_cell_row_pos, fp.grid_cell_column_pos,
                    span, fp.grid_cell_column_span || 1);
                if (pos) {
                    AppState.updateWidget(widget.id, { x: pos.x, y: pos.y, width: pos.width, height: pos.height });
                }
            }
        });

        // Column Span
        panel.addLabeledInput("Column Span", "number", props.grid_cell_column_span || 1, (v) => {
            const span = Math.max(1, parseInt(v, 10) || 1);
            updateProp("grid_cell_column_span", span);

            const freshWidget = AppState.getWidgetById(widget.id);
            const fp = freshWidget?.props || {};
            if (fp.grid_cell_row_pos != null && fp.grid_cell_column_pos != null) {
                const pos = calculateGridPosition(fp.grid_cell_row_pos, fp.grid_cell_column_pos,
                    fp.grid_cell_row_span || 1, span);
                if (pos) {
                    AppState.updateWidget(widget.id, { x: pos.x, y: pos.y, width: pos.width, height: pos.height });
                }
            }
        });

        // Alignment options
        if (isLvgl) {
            const alignOptions = ["START", "END", "CENTER", "STRETCH"];
            panel.addSelect("X Align", props.grid_cell_x_align || "STRETCH", alignOptions, (v) => {
                updateProp("grid_cell_x_align", v);
            });
            panel.addSelect("Y Align", props.grid_cell_y_align || "STRETCH", alignOptions, (v) => {
                updateProp("grid_cell_y_align", v);
            });
        }

        const settingsBtn = document.createElement("button");
        settingsBtn.className = "btn btn-secondary btn-xs";
        settingsBtn.style.marginTop = "8px";
        settingsBtn.style.width = "100%";
        settingsBtn.innerHTML = `<span class="mdi mdi-cog"></span> Open Page Grid Settings`;
        settingsBtn.onclick = () => {
            const pageIndex = AppState.currentPageIndex;
            if (pageSettings) {
                pageSettings.open(pageIndex);
            }
        };
        panel.getContainer().appendChild(settingsBtn);
    }
}
