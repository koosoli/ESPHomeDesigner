import { on, EVENTS } from '../core/events.js';
import { AppState } from '../core/state.js';
import { Logger } from '../utils/logger.js';
import { showToast } from '../utils/dom.js';
import { highlightWidgetInSnippet } from '../io/yaml_export.js';
import { loadLayoutIntoState, parseSnippetYamlOffline } from '../io/yaml_import.js';
import { importSnippetBackend } from '../io/ha_api.js';
import { hasHaBackend } from '../utils/env.js';
import { YamlHighlighter } from './yaml_highlighter.js';

export class SnippetManager {
    constructor(adapter) {
        this.adapter = adapter;
        this.highlighter = new YamlHighlighter();
        this.suppressSnippetUpdate = false;
        this.snippetDebounceTimer = null;
        this.lastGeneratedYaml = "";

        // Highlighting persistence
        this.isHighlighted = localStorage.getItem('esphome_designer_yaml_highlight') !== 'false';

        this.init();
    }

    init() {
        this.bindEvents();
        this.setupAutoUpdate();
        this.setupScrollSync();

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

        // Toggle YAML Panel
        const toggleYamlBtn = document.getElementById('toggleYamlBtn');
        const codePanel = document.querySelector('.code-panel');
        if (toggleYamlBtn && codePanel) {
            // Restore state from localStorage
            const isCollapsed = localStorage.getItem('esphome_designer_yaml_collapsed') === 'true';
            if (isCollapsed) {
                codePanel.classList.add('collapsed');
            }

            toggleYamlBtn.addEventListener('click', () => {
                const nowCollapsed = codePanel.classList.toggle('collapsed');
                localStorage.setItem('esphome_designer_yaml_collapsed', nowCollapsed);
                // Trigger resize event to ensure canvas adjusts if needed
                window.dispatchEvent(new Event('resize'));
            });
        }

        // Toggle Syntax Highlighting
        const toggleHighlightBtn = document.getElementById('toggleHighlightBtn');
        const snippetContainer = document.querySelector('.snippet-container');
        if (toggleHighlightBtn) {
            // Apply initial state to ALL containers
            document.querySelectorAll('.snippet-container').forEach(c => {
                c.classList.toggle('highlighted', this.isHighlighted);
            });
            document.querySelectorAll('[id*="ToggleHighlightBtn"]').forEach(b => {
                b.classList.toggle('active', this.isHighlighted);
            });

            toggleHighlightBtn.addEventListener('click', () => {
                this.isHighlighted = !this.isHighlighted;
                localStorage.setItem('esphome_designer_yaml_highlight', this.isHighlighted);

                // Update ALL containers
                document.querySelectorAll('.snippet-container').forEach(c => {
                    c.classList.toggle('highlighted', this.isHighlighted);
                });

                document.querySelectorAll('[id*="ToggleHighlightBtn"]').forEach(b => {
                    b.classList.toggle('active', this.isHighlighted);
                });

                if (this.isHighlighted) {
                    this.updateHighlightLayer();
                }
            });
        }

        // Update highlight layer on manual input
        const snippetBox = document.getElementById('snippetBox');
        if (snippetBox) {
            snippetBox.addEventListener('input', () => {
                if (this.isHighlighted) {
                    this.updateHighlightLayer();
                }
            });
        }
    }

    setupScrollSync() {
        const snippetBox = document.getElementById('snippetBox');
        const highlightLayer = document.getElementById('highlightLayer');
        if (snippetBox && highlightLayer) {
            snippetBox.addEventListener('scroll', () => {
                highlightLayer.scrollTop = snippetBox.scrollTop;
                highlightLayer.scrollLeft = snippetBox.scrollLeft;
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
            const widgetIds = (data && data.widgetIds) ? data.widgetIds : [];
            if (typeof highlightWidgetInSnippet === 'function') {
                highlightWidgetInSnippet(widgetIds);
            }
        });
    }

    updateHighlightLayer() {
        if (!this.isHighlighted) return;

        const mainBox = document.getElementById('snippetBox');
        const mainLayer = document.getElementById('highlightLayer');
        if (mainBox && mainLayer) {
            mainLayer.innerHTML = this.highlighter.highlight(mainBox.value);
        }

        // Also update fullscreen if active
        const modalLayer = document.getElementById('snippetFullscreenHighlight');
        const modalContent = document.getElementById('snippetFullscreenContent');
        if (modalLayer && modalContent) {
            const textarea = modalContent.querySelector('textarea');
            if (textarea) {
                modalLayer.innerHTML = this.highlighter.highlight(textarea.value);
            }
        }
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

                        if (this.isHighlighted) {
                            this.updateHighlightLayer();
                        }

                        const selectedIds = window.AppState ? window.AppState.selectedWidgetIds : [];

                        if (typeof highlightWidgetInSnippet === 'function') {
                            highlightWidgetInSnippet(selectedIds);
                        }
                    }).catch(e => {
                        Logger.error("Error generating snippet via adapter:", e);
                        snippetBox.value = "# Error generating YAML (adapter): " + e.message;
                        if (this.isHighlighted) this.updateHighlightLayer();
                    });
                } catch (e) {
                    Logger.error("Error generating snippet:", e);
                    snippetBox.value = "# Error generating YAML: " + e.message;
                    if (this.isHighlighted) this.updateHighlightLayer();
                }
            }, 50);
        }
    }

    openSnippetModal() {
        const modal = document.getElementById('snippetFullscreenModal');
        const container = document.getElementById('snippetFullscreenContainer');
        const content = document.getElementById('snippetFullscreenContent');
        const highlightLayer = document.getElementById('snippetFullscreenHighlight');
        const snippetBox = document.getElementById('snippetBox');
        const toggleBtn = document.getElementById('toggleFullscreenHighlightBtn');

        if (!modal || !container || !content || !highlightLayer || !snippetBox) return;

        // Sync highlighting state
        container.classList.toggle('highlighted', this.isHighlighted);
        if (toggleBtn) toggleBtn.classList.toggle('active', this.isHighlighted);

        // Setup toggle for fullscreen
        if (toggleBtn && !toggleBtn.hasListener) {
            toggleBtn.addEventListener('click', () => {
                this.isHighlighted = !this.isHighlighted;
                // Sync with main panel and storage
                localStorage.setItem('esphome_designer_yaml_highlight', this.isHighlighted);
                const mainContainer = document.querySelector('.snippet-container');
                const mainToggle = document.getElementById('toggleHighlightBtn');

                if (mainContainer) mainContainer.classList.toggle('highlighted', this.isHighlighted);
                if (mainToggle) mainToggle.classList.toggle('active', this.isHighlighted);

                container.classList.toggle('highlighted', this.isHighlighted);
                toggleBtn.classList.toggle('active', this.isHighlighted);

                if (this.isHighlighted) {
                    highlightLayer.innerHTML = this.highlighter.highlight(textarea.value);
                    this.updateHighlightLayer(); // Also update main panel
                }
            });
            toggleBtn.hasListener = true;
        }

        // Use a textarea for editing if it doesn't exist, otherwise update its value
        let textarea = content.querySelector("textarea");
        if (!textarea) {
            content.innerHTML = ""; // Clear existing content
            textarea = document.createElement("textarea");
            textarea.className = "snippet-box"; // Reuse snippet-box styles
            textarea.style.width = "100%";
            textarea.style.height = "100%";
            textarea.style.background = "transparent"; // Ensure transparency
            textarea.spellcheck = false;
            content.appendChild(textarea);

            // Sync scroll for fullscreen
            textarea.addEventListener('scroll', () => {
                highlightLayer.scrollTop = textarea.scrollTop;
                highlightLayer.scrollLeft = textarea.scrollLeft;
            });

            // Update highlight for fullscreen
            textarea.addEventListener('input', () => {
                if (this.isHighlighted) {
                    highlightLayer.innerHTML = this.highlighter.highlight(textarea.value);
                }
            });

            // Add a save/update button to the modal footer
            let footer = modal.querySelector(".modal-actions");
            if (footer && !footer.querySelector("#fullscreenUpdateBtn")) {
                const updateBtn = document.createElement("button");
                updateBtn.id = "fullscreenUpdateBtn";
                updateBtn.className = "btn btn-primary";
                updateBtn.textContent = "Update Layout from YAML";
                updateBtn.onclick = () => {
                    snippetBox.value = textarea.value;
                    this.handleUpdateLayoutFromSnippetBox();
                    modal.classList.add("hidden");
                };
                footer.insertBefore(updateBtn, footer.firstChild);
            }
        }

        textarea.value = snippetBox.value || "";

        // Initial highlight for fullscreen
        if (this.isHighlighted) {
            highlightLayer.innerHTML = this.highlighter.highlight(textarea.value);
            setTimeout(() => {
                highlightLayer.scrollTop = textarea.scrollTop;
                highlightLayer.scrollLeft = textarea.scrollLeft;
            }, 50);
        }

        modal.style.display = "";
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
