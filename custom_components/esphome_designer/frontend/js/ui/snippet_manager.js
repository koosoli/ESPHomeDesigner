import { on, EVENTS } from '../core/events.js';
import { AppState } from '../core/state.js';
import { Logger } from '../utils/logger.js';
import { showToast } from '../utils/dom.js';
import { highlightWidgetInSnippet } from '../io/yaml_export.js';
import { loadLayoutIntoState, parseSnippetYamlOffline } from '../io/yaml_import.js';
import { importSnippetBackend } from '../io/ha_api.js';
import { hasHaBackend } from '../utils/env.js';

export class SnippetManager {
    constructor(adapter) {
        this.adapter = adapter;
        this.suppressSnippetUpdate = false;
        this.snippetDebounceTimer = null;
        this.lastGeneratedYaml = "";

        this.init();
    }

    init() {
        this.bindEvents();
        this.setupAutoUpdate();

        // Initial update
        this.updateSnippetBox();
    }

    bindEvents() {
        // Fullscreen Snippet Button
        const fullscreenSnippetBtn = document.getElementById('fullscreenSnippetBtn');
        if (fullscreenSnippetBtn) {
            fullscreenSnippetBtn.addEventListener('click', () => {
                this.openSnippetModal();
            });
        }

        const snippetFullscreenClose = document.getElementById('snippetFullscreenClose');
        if (snippetFullscreenClose) {
            snippetFullscreenClose.addEventListener('click', () => {
                const modal = document.getElementById('snippetFullscreenModal');
                if (modal) {
                    modal.classList.add('hidden');
                }
            });
        }

        // Import Modal Buttons
        const importSnippetConfirm = document.getElementById('importSnippetConfirm');
        if (importSnippetConfirm) {
            importSnippetConfirm.addEventListener('click', async () => {
                await this.handleImportSnippet();
            });
        }

        // Update Layout from YAML (Snippet Box)
        const updateLayoutBtn = document.getElementById('updateLayoutBtn');
        if (updateLayoutBtn) {
            updateLayoutBtn.addEventListener('click', async () => {
                await this.handleUpdateLayoutFromSnippetBox();
            });
        }

        // Copy Snippet Button
        const copySnippetBtn = document.getElementById('copySnippetBtn');
        if (copySnippetBtn) {
            copySnippetBtn.addEventListener('click', async () => {
                this.copySnippetToClipboard(copySnippetBtn);
            });
        }
    }

    setupAutoUpdate() {
        // Update snippet box whenever state changes
        on(EVENTS.STATE_CHANGED, () => {
            if (!this.suppressSnippetUpdate) {
                this.updateSnippetBox();
            }
        });

        on(EVENTS.SELECTION_CHANGED, (data) => {
            // Updated to pass all selected IDs to support multi-select highlighting
            const widgetIds = (data && data.widgetIds) ? data.widgetIds : [];
            if (widgetIds.length > 0 && typeof highlightWidgetInSnippet === 'function') {
                highlightWidgetInSnippet(widgetIds);
            }
        });
    }

    updateSnippetBox() {
        const snippetBox = document.getElementById('snippetBox');
        if (snippetBox) {
            // Debounce the update
            if (this.snippetDebounceTimer) clearTimeout(this.snippetDebounceTimer);

            this.snippetDebounceTimer = setTimeout(() => {
                // Double-check suppression flag inside callback
                if (this.suppressSnippetUpdate) {
                    return;
                }

                try {
                    const payload = window.AppState ? window.AppState.getPagesPayload() : { pages: [] };
                    this.adapter.generate(payload).then(yaml => {
                        this.lastGeneratedYaml = yaml;
                        snippetBox.value = yaml;

                        // Re-highlight the selected widgets if any
                        const selectedIds = window.AppState ? window.AppState.selectedWidgetIds : [];

                        if (selectedIds.length > 0 && typeof highlightWidgetInSnippet === 'function') {
                            highlightWidgetInSnippet(selectedIds);
                        }
                    }).catch(e => {
                        Logger.error("Error generating snippet via adapter:", e);
                        snippetBox.value = "# Error generating YAML (adapter): " + e.message;
                    });
                } catch (e) {
                    Logger.error("Error generating snippet:", e);
                    snippetBox.value = "# Error generating YAML: " + e.message;
                }
            }, 50);
        }
    }

    openSnippetModal() {
        const modal = document.getElementById('snippetFullscreenModal');
        const content = document.getElementById('snippetFullscreenContent');
        const snippetBox = document.getElementById('snippetBox');

        if (!modal || !content || !snippetBox) return;

        // Use a textarea for editing if it doesn't exist, otherwise update its value
        let textarea = content.querySelector("textarea");
        if (!textarea) {
            content.innerHTML = ""; // Clear existing content
            textarea = document.createElement("textarea");
            textarea.style.width = "100%";
            textarea.style.height = "calc(100vh - 150px)"; // Adjusted for header/footer
            textarea.style.fontFamily = "monospace";
            textarea.style.padding = "10px";
            textarea.style.boxSizing = "border-box";
            textarea.style.resize = "none";
            textarea.style.backgroundColor = "var(--bg-input)";
            textarea.style.color = "var(--text)";
            textarea.style.border = "1px solid var(--border)";
            textarea.style.borderRadius = "4px";
            content.appendChild(textarea);

            // Add a save/update button to the modal footer if not present
            let footer = modal.querySelector(".modal-actions");
            if (!footer) {
                footer = document.createElement("div");
                footer.className = "modal-actions";
                const modalInner = modal.querySelector(".modal");
                if (modalInner) modalInner.appendChild(footer);
            }

            if (!footer.querySelector("#fullscreenUpdateBtn")) {
                const updateBtn = document.createElement("button");
                updateBtn.id = "fullscreenUpdateBtn";
                updateBtn.className = "btn btn-primary";
                updateBtn.textContent = "Update Layout from YAML";
                updateBtn.onclick = () => {
                    snippetBox.value = textarea.value;
                    // Trigger the main update button logic directly
                    this.handleUpdateLayoutFromSnippetBox();
                    modal.classList.add("hidden");
                };
                footer.insertBefore(updateBtn, footer.firstChild);
            }
        }
        textarea.value = snippetBox.value || "";
        modal.style.display = ""; // Clear any inline display: none
        modal.classList.remove('hidden');
    }

    async handleImportSnippet() {
        const textarea = document.getElementById('importSnippetTextarea');
        const errorBox = document.getElementById('importSnippetError');
        if (!textarea) return;

        const yaml = textarea.value;
        if (!yaml.trim()) return;

        try {
            if (errorBox) errorBox.textContent = "";

            let layout;
            // Always try offline parser first for snippets as it's more robust for native LVGL
            try {
                layout = parseSnippetYamlOffline(yaml);
                Logger.log("[handleImportSnippet] Successfully used offline parser.");
            } catch (offlineErr) {
                Logger.warn("[handleImportSnippet] Offline parser failed, falling back to backend:", offlineErr);
                if (hasHaBackend()) {
                    layout = await importSnippetBackend(yaml);
                } else {
                    throw offlineErr;
                }
            }

            loadLayoutIntoState(layout);

            // Close modal
            const modal = document.getElementById('importSnippetModal');
            if (modal) {
                modal.classList.add('hidden');
                modal.style.display = 'none';
            }

            showToast("Layout imported successfully", "success");

        } catch (err) {
            Logger.error("Import failed:", err);
            if (errorBox) errorBox.textContent = `Error: ${err.message}`;
        }
    }

    async handleUpdateLayoutFromSnippetBox() {
        const snippetBox = document.getElementById('snippetBox');
        if (!snippetBox) return;
        const yaml = snippetBox.value;
        if (!yaml.trim()) return;

        if (this.lastGeneratedYaml && yaml.trim() === this.lastGeneratedYaml.trim()) {
            Logger.log("[handleUpdateLayoutFromSnippetBox] Skipping update: Snippet matches last generated state.");
            return;
        }

        try {
            const currentLayoutId = window.AppState?.currentLayoutId || "reterminal_e1001";
            const currentDeviceName = window.AppState?.deviceName || "Layout 1";
            const currentDeviceModel = window.AppState?.deviceModel || window.AppState?.settings?.device_model || "reterminal_e1001";

            Logger.log(`[handleUpdateLayoutFromSnippetBox] Preserving context - ID: ${currentLayoutId}, Name: ${currentDeviceName}`);

            let layout = parseSnippetYamlOffline(yaml);

            layout.device_id = currentLayoutId;
            layout.name = currentDeviceName;
            layout.device_model = currentDeviceModel;

            if (!layout.settings) {
                layout.settings = {};
            }
            layout.settings.device_model = currentDeviceModel;
            layout.settings.device_name = currentDeviceName;

            // Preserve dark_mode setting from current state
            const currentDarkMode = window.AppState?.settings?.dark_mode || false;
            layout.settings.dark_mode = currentDarkMode;

            this.suppressSnippetUpdate = true;
            if (this.snippetDebounceTimer) {
                clearTimeout(this.snippetDebounceTimer);
                this.snippetDebounceTimer = null;
            }

            loadLayoutIntoState(layout);

            setTimeout(() => {
                this.suppressSnippetUpdate = false;
            }, 1500);

            showToast("Layout updated from YAML", "success");

            if (yaml.includes("lambda:") || yaml.includes("script:")) {
                setTimeout(() => {
                    showToast("Note: Custom C++ (lambda/script) may not fully preview.", "warning", 4000);
                }, 800);
            }

        } catch (err) {
            Logger.error("Update layout failed:", err);
            showToast(`Update failed: ${err.message}`, "error");
            this.suppressSnippetUpdate = false;
        }
    }

    async copySnippetToClipboard(btnElement) {
        const snippetBox = document.getElementById('snippetBox');
        if (!snippetBox) return;

        const text = snippetBox.value || "";
        const originalText = btnElement.textContent;

        const setSuccessState = () => {
            btnElement.textContent = "Copied!";
            btnElement.style.minWidth = btnElement.offsetWidth + "px";
            setTimeout(() => {
                btnElement.textContent = originalText;
                btnElement.style.minWidth = "";
            }, 2000);
        };

        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
                showToast("Snippet copied to clipboard", "success");
                setSuccessState();
            } else {
                const textarea = document.createElement("textarea");
                textarea.value = text;
                textarea.style.position = "fixed";
                textarea.style.left = "-999999px";
                textarea.style.top = "-999999px";
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                try {
                    document.execCommand("copy");
                    showToast("Snippet copied to clipboard", "success");
                    setSuccessState();
                } catch {
                    showToast("Unable to copy. Try selecting and copying manually.", "error");
                }
                document.body.removeChild(textarea);
            }
        } catch (err) {
            Logger.error("Copy failed:", err);
            showToast("Unable to copy snippet", "error");
        }
    }
}
