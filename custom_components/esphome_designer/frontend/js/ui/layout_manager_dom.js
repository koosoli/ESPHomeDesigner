/**
 * @typedef {{ id: string, name: string, device_model?: string, device_type?: string, page_count: number }} LayoutRow
 * @typedef {{ name?: string }} DeviceProfileSummary
 */

/**
 * @param {string} text
 * @returns {string}
 */
export function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text || "";
    return div.innerHTML;
}

/**
 * @param {string | undefined} model
 * @param {Record<string, DeviceProfileSummary>} deviceProfiles
 * @param {string[]} supportedIds
 * @returns {string}
 */
export function getDeviceDisplayName(model, deviceProfiles, supportedIds) {
    if (model && deviceProfiles && deviceProfiles[model]) {
        let name = deviceProfiles[model].name || model || "Unknown";
        if (!supportedIds.includes(model)) {
            name += " (untested)";
        }
        return name;
    }

    /** @type {Record<string, string>} */
    const names = {
        reterminal_e1001: "E1001 (Mono)",
        reterminal_e1002: "E1002 (Color)",
        trmnl: "TRMNL",
        esp32_s3_photopainter: "PhotoPainter (7-Color)"
    };

    if (!model) return "Unknown";
    return names[model] || model || "Unknown";
}

/**
 * @param {LayoutRow[]} layouts
 * @param {string} currentLayoutId
 * @param {Record<string, DeviceProfileSummary>} deviceProfiles
 * @param {string[]} supportedIds
 * @returns {string}
 */
export function renderLayoutRows(layouts, currentLayoutId, deviceProfiles, supportedIds) {
    return layouts.map((layout) => {
        const isCurrent = layout.id === currentLayoutId;
        const duplicateNames = layouts.filter((candidate) => candidate.name === layout.name).length > 1;

        return `
                <tr style="border-bottom: 1px solid var(--border-subtle); ${isCurrent ? "background: var(--accent-soft);" : ""}">
                    <td style="padding: 8px 4px;">
                        <span style="font-weight: 500;">${escapeHtml(layout.name)}</span>
                        ${isCurrent ? '<span style="background: var(--accent); color: white; font-size: 9px; padding: 2px 4px; border-radius: 2px; margin-left: 4px;">current</span>' : ""}
                        ${duplicateNames ? '<br><span style="font-size: 9px; color: var(--muted);">' + escapeHtml(layout.id) + "</span>" : ""}
                    </td>
                    <td style="padding: 8px 4px; font-size: 11px; color: var(--muted);">${getDeviceDisplayName(layout.device_model || layout.device_type, deviceProfiles, supportedIds)}</td>
                    <td style="padding: 8px 4px; font-size: 11px; color: var(--muted);">${layout.page_count} pages</td>
                    <td style="padding: 8px 4px; text-align: right;">
                        <div style="display: flex; gap: 4px; justify-content: flex-end;">
                            ${!isCurrent ? `<button type="button" class="btn btn-sm btn-primary" style="font-size: 10px; padding: 4px 8px;" data-action="load" data-id="${layout.id}">Load</button>` : ""}
                            <button type="button" class="btn btn-sm btn-secondary" style="font-size: 10px; padding: 4px 8px;" data-action="export" data-id="${layout.id}">Export</button>
                            ${!isCurrent && layouts.length > 1 ? `<button type="button" class="btn btn-sm btn-secondary" style="font-size: 10px; padding: 4px 8px; color: var(--danger);" data-action="delete" data-id="${layout.id}" data-name="${escapeHtml(layout.name)}">Delete</button>` : ""}
                        </div>
                    </td>
                </tr>
            `;
    }).join("");
}

/**
 * @returns {string}
 */
export function createLayoutManagerModalMarkup() {
    return `
            <div class="modal" style="max-width: 600px;">
                <div class="modal-header">
                    <div>Manage Layouts</div>
                    <button type="button" id="layoutManagerClose" class="btn btn-secondary">x</button>
                </div>
                <div class="modal-body">
                    <div class="layout-manager-current" style="margin-bottom: 12px; padding: 8px; background: var(--bg-subtle); border-radius: 4px;">
                        <span class="prop-label" style="font-size: 11px; color: var(--muted);">Current Layout:</span>
                        <span id="layoutManagerCurrentName" style="font-weight: 500; margin-left: 8px;">Loading...</span>
                    </div>

                    <div class="layout-manager-list-container" style="max-height: 300px; overflow-y: auto; margin-bottom: 12px;">
                        <table class="layout-manager-table" style="width: 100%; border-collapse: collapse;">
                            <thead>
                                <tr style="border-bottom: 1px solid var(--border);">
                                    <th style="text-align: left; padding: 8px 4px; font-size: 11px;">Name</th>
                                    <th style="text-align: left; padding: 8px 4px; font-size: 11px;">Device</th>
                                    <th style="text-align: left; padding: 8px 4px; font-size: 11px;">Pages</th>
                                    <th style="text-align: right; padding: 8px 4px; font-size: 11px;">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="layoutManagerTableBody">
                                <tr><td colspan="4" style="text-align: center; color: var(--muted); padding: 16px;">Loading...</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="layout-manager-actions" style="display: flex; gap: 8px; flex-wrap: wrap;">
                        <button type="button" id="layoutManagerNew" class="btn btn-primary" style="flex: 1;">+ New Layout</button>
                        <button type="button" id="layoutManagerImport" class="btn btn-secondary" style="flex: 1;">Import from File</button>
                        <input type="file" id="layoutManagerFileInput" accept=".json" style="display: none;">
                    </div>

                    <div id="layoutManagerStatus" class="layout-manager-status" style="margin-top: 8px; font-size: 11px; min-height: 20px;"></div>
                </div>
            </div>
        `;
}

/**
 * @param {Record<string, DeviceProfileSummary>} deviceProfiles
 * @param {string[]} supportedIds
 * @returns {string}
 */
export function generateDeviceOptions(deviceProfiles, supportedIds) {
    if (deviceProfiles) {
        return Object.entries(deviceProfiles).map(([key, profile]) => {
            let displayName = profile.name || key;
            if (!supportedIds.includes(key)) {
                displayName += " (untested)";
            }
            return `<option value="${key}">${displayName}</option>`;
        }).join("");
    }

    return '<option value="reterminal_e1001">reTerminal E1001</option>';
}

/**
 * @param {string} deviceOptionsHtml
 * @returns {string}
 */
export function createNewLayoutModalMarkup(deviceOptionsHtml) {
    return `
                <div class="modal" style="max-width: 400px;">
                    <div class="modal-header">
                        <div>Create New Layout</div>
                        <button type="button" id="newLayoutClose" class="btn btn-secondary">x</button>
                    </div>
                    <div class="modal-body">
                        <div class="field" style="margin-bottom: 12px;">
                            <div class="prop-label">Layout Name</div>
                            <input id="newLayoutName" class="prop-input" type="text" placeholder="e.g. Living Room Display" />
                        </div>
                        <div class="field">
                            <div class="prop-label">Device Type</div>
                            <select id="newLayoutDeviceType" class="prop-input">
                                ${deviceOptionsHtml}
                            </select>
                            <p class="hint" style="color: var(--muted); font-size: 11px; margin-top: 4px;">Select the device that will display this layout.</p>
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button type="button" id="newLayoutCancel" class="btn btn-secondary">Cancel</button>
                        <button type="button" id="newLayoutConfirm" class="btn btn-primary">Create Layout</button>
                    </div>
                </div>
            `;
}
