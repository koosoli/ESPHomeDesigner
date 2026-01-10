import { hasHaBackend } from '../utils/env.js';
import { Logger } from '../utils/logger.js';
import { fetchEntityStates } from '../io/ha_api.js';
import { AppState } from '../core/state.js';

/**
 * Opens the entity picker for a widget.
 * @param {Object} widget - The widget object.
 * @param {HTMLInputElement} inputEl - The input element to update.
 * @param {Function} callback - Success callback.
 */
export function openEntityPickerForWidget(widget, inputEl, callback) {
    if (!hasHaBackend()) {
        Logger.warn("Entity Picker: No HA backend detected.");
        return;
    }

    const container = document.getElementById("propertiesPanel") || document.body;
    const existing = document.querySelector(".entity-picker-overlay");
    if (existing) {
        existing.remove();
    }

    const overlay = document.createElement("div");
    overlay.className = "entity-picker-overlay";

    const header = document.createElement("div");
    header.className = "entity-picker-header";
    header.textContent = "Pick Home Assistant entity";

    const closeBtn = document.createElement("button");
    closeBtn.className = "btn btn-secondary";
    closeBtn.textContent = "×";
    closeBtn.style.padding = "0 4px";
    closeBtn.style.fontSize = "9px";
    closeBtn.type = "button";
    closeBtn.addEventListener("click", () => {
        overlay.remove();
    });

    const headerRight = document.createElement("div");
    headerRight.style.display = "flex";
    headerRight.style.alignItems = "center";
    headerRight.style.gap = "4px";
    headerRight.appendChild(closeBtn);

    const headerWrap = document.createElement("div");
    headerWrap.style.display = "flex";
    headerWrap.style.justifyContent = "space-between";
    headerWrap.style.alignItems = "center";
    headerWrap.style.gap = "4px";
    headerWrap.appendChild(header);
    headerWrap.appendChild(headerRight);

    const searchRow = document.createElement("div");
    searchRow.style.display = "flex";
    searchRow.style.gap = "4px";
    searchRow.style.alignItems = "center";

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.className = "prop-input";
    searchInput.placeholder = "Search name or entity_id";
    searchInput.style.flex = "1";

    const domainSelect = document.createElement("select");
    domainSelect.className = "prop-input";
    domainSelect.style.width = "80px";
    ["all", "sensor", "binary_sensor", "light", "switch", "fan", "cover", "climate", "media_player", "input_number", "number", "input_boolean", "input_text", "input_select", "weather", "scene", "script", "button", "input_button"].forEach((d) => {
        const opt = document.createElement("option");
        opt.value = d;
        opt.textContent = d;
        domainSelect.appendChild(opt);
    });

    searchRow.appendChild(searchInput);
    searchRow.appendChild(domainSelect);

    const list = document.createElement("div");
    list.className = "entity-picker-list";

    overlay.appendChild(headerWrap);
    overlay.appendChild(searchRow);
    overlay.appendChild(list);
    container.appendChild(overlay);

    function renderList(entities) {
        list.innerHTML = "";
        if (!entities || entities.length === 0) {
            const empty = document.createElement("div");
            empty.style.color = "var(--muted)";
            empty.style.fontSize = "var(--fs-xs)";
            empty.textContent = "No entities match.";
            list.appendChild(empty);
            return;
        }
        entities.forEach((e) => {
            const row = document.createElement("div");
            row.className = "entity-picker-row";

            const name = document.createElement("div");
            name.className = "entity-picker-name";
            name.textContent = e.name || e.entity_id;

            const meta = document.createElement("div");
            meta.className = "entity-picker-meta";
            meta.textContent = `${e.entity_id} · ${e.domain || e.entity_id.split('.')[0]}`;

            row.appendChild(name);
            row.appendChild(meta);

            row.addEventListener("click", () => {
                // If callback provided, call it with entity_id
                if (callback) {
                    callback(e.entity_id);
                }

                // Update input element if provided
                if (inputEl) {
                    inputEl.value = e.entity_id;
                }

                // Update widget if provided
                if (widget && AppState) {
                    // Update entity_id and title
                    AppState.updateWidget(widget.id, {
                        entity_id: e.entity_id,
                        title: e.name || e.entity_id || ""
                    });

                    // Automate Graph settings based on attributes
                    if (widget.type === "graph" && e.attributes) {
                        const attrs = e.attributes;
                        const updates = {};
                        if (attrs.unit_of_measurement === "%") {
                            if (!widget.props.min_value) updates.min_value = "0";
                            if (!widget.props.max_value) updates.max_value = "100";
                        }
                        if (attrs.min !== undefined && !widget.props.min_value) updates.min_value = String(attrs.min);
                        if (attrs.max !== undefined && !widget.props.max_value) updates.max_value = String(attrs.max);

                        if (Object.keys(updates).length > 0) {
                            const newProps = { ...widget.props, ...updates };
                            AppState.updateWidget(widget.id, { props: newProps });
                        }
                    }

                    // Automate Unit for Sensor Text AND auto-detect text sensors
                    if (widget.type === "sensor_text") {
                        const newProps = { ...widget.props };

                        if (e.attributes && e.attributes.unit_of_measurement) {
                            newProps.unit = e.attributes.unit_of_measurement;
                        } else if (e.unit) {
                            newProps.unit = e.unit;
                        }

                        const stateVal = e.state;
                        const isExplicitTextDomain = e.entity_id.startsWith("weather.") || e.entity_id.startsWith("text_sensor.");

                        if (isExplicitTextDomain) {
                            newProps.is_text_sensor = true;
                        } else if (stateVal !== undefined && stateVal !== null && stateVal !== "") {
                            const numVal = parseFloat(stateVal);
                            const isTextValue = isNaN(numVal);
                            if (isTextValue) {
                                newProps.is_text_sensor = true;
                            } else {
                                newProps.is_text_sensor = false;
                            }
                        }

                        AppState.updateWidget(widget.id, { props: newProps });
                    }
                }

                overlay.remove();
            });

            list.appendChild(row);
        });
    }

    // Load entities
    fetchEntityStates().then((entities) => {
        if (!entities || entities.length === 0) {
            renderList([]);
            return;
        }

        function applyFilter() {
            const q = (searchInput.value || "").toLowerCase();
            const dom = domainSelect.value;
            const filtered = entities.filter((e) => {
                const domain = e.domain || e.entity_id.split('.')[0];
                if (dom !== "all" && domain !== dom) {
                    return false;
                }
                if (!q) return true;
                const hay = `${e.entity_id} ${e.name || ""}`.toLowerCase();
                return hay.includes(q);
            });
            renderList(filtered);
        }

        searchInput.addEventListener("input", applyFilter);
        domainSelect.addEventListener("change", applyFilter);
        applyFilter();
    });
}
