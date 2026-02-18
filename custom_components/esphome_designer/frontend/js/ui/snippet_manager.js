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
                const iconSpan = updateLayoutBtn.querySelector('.mdi');
                const originalClass = iconSpan?.className || '';

                // Show loading state
                if (iconSpan) {
                    iconSpan.className = 'mdi mdi-loading mdi-spin';
                }
                updateLayoutBtn.disabled = true;

                try {
                    await this.handleUpdateLayoutFromSnippetBox();

                    // Show success state
                    if (iconSpan) {
                        iconSpan.className = 'mdi mdi-check';
                        setTimeout(() => {
                            iconSpan.className = originalClass;
                        }, 1500);
                    }
                } catch (err) {
                    // Show error state
                    if (iconSpan) {
                        iconSpan.className = 'mdi mdi-alert-circle-outline';
                        setTimeout(() => {
                            iconSpan.className = originalClass;
                        }, 1500);
                    }
                } finally {
                    updateLayoutBtn.disabled = false;
                }
            });
        }

        // Copy Snippet Button
        const copySnippetBtn = document.getElementById('copySnippetBtn');
        if (copySnippetBtn) {
            copySnippetBtn.addEventListener('click', async () => {
                this.copySnippetToClipboard(copySnippetBtn);
            });
        }

        // Copy Lambda Only Button
        const copyLambdaBtn = document.getElementById('copyLambdaBtn');
        if (copyLambdaBtn) {
            copyLambdaBtn.addEventListener('click', async () => {
                this.copyLambdaToClipboard(copyLambdaBtn);
            });
        }

        // Copy OEPL Service Button
        const copyOEPLServiceBtn = document.getElementById('copyOEPLServiceBtn');
        if (copyOEPLServiceBtn) {
            copyOEPLServiceBtn.addEventListener('click', () => {
                this.copyOEPLServiceToClipboard(copyOEPLServiceBtn);
            });
        }

        // Copy ODP Service Button
        const copyODPServiceBtn = document.getElementById('copyODPServiceBtn');
        if (copyODPServiceBtn) {
            copyODPServiceBtn.addEventListener('click', () => {
                // Since ODP adapter already returns full YAML, this is same as copy snippet
                this.copySnippetToClipboard(copyODPServiceBtn);
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
                    const selectedIds = window.AppState ? window.AppState.selectedWidgetIds : [];
                    const isMultiSelect = selectedIds.length > 1;

                    const mode = this.adapter && this.adapter.constructor.name;
                    const isOEPL = mode === 'OEPLAdapter';
                    const isODP = mode === 'OpenDisplayAdapter';

                    const oeplNotice = document.getElementById('oeplNotice');
                    if (oeplNotice) oeplNotice.classList.toggle('hidden', !isOEPL);

                    const odpNotice = document.getElementById('odpNotice');
                    if (odpNotice) {
                        odpNotice.classList.toggle('hidden', !isODP);
                        if (isODP) {
                            const noticeText = odpNotice.querySelector('div');
                            if (noticeText) {
                                noticeText.innerHTML = `<strong>OpenDisplay YAML (ODP)</strong> - Copy this to Home Assistant → Developer Tools → Services → <code>opendisplay.drawcustom</code>`;
                            }
                        }
                    }

                    const titleEl = document.querySelector('.code-panel-title');
                    if (titleEl) {
                        // Keep the icon but change the text
                        const b = titleEl.querySelector('button');
                        titleEl.innerHTML = '';
                        if (b) titleEl.appendChild(b);

                        let titleText = ' ESPHome YAML';
                        if (isOEPL) titleText = ' OpenEpaperLink JSON';
                        if (isODP) titleText = ' OpenDisplay YAML (ODP)';

                        titleEl.appendChild(document.createTextNode(titleText));
                    }

                    const copyOEPLBtn = document.getElementById('copyOEPLServiceBtn');
                    if (copyOEPLBtn) copyOEPLBtn.style.display = isOEPL ? 'inline-block' : 'none';

                    const copyODPBtn = document.getElementById('copyODPServiceBtn');
                    if (copyODPBtn) copyODPBtn.style.display = isODP ? 'inline-block' : 'none';

                    // Lambda button only makes sense for ESPHome (C++ lambda), not OEPL/ODP (JSON)
                    const copyLambdaBtn = document.getElementById('copyLambdaBtn');
                    if (copyLambdaBtn) copyLambdaBtn.style.display = (isOEPL || isODP) ? 'none' : 'inline-block';

                    const importBtn = document.getElementById('updateLayoutBtn');
                    if (importBtn) importBtn.style.display = 'inline-block';

                    // IMPORTANT: Deep clone to prevent mutating AppState
                    const rawPayload = window.AppState ? window.AppState.getPagesPayload() : { pages: [] };
                    const payload = JSON.parse(JSON.stringify(rawPayload));

                    // FORCE SYNC: Ensure the generator uses the latest UI selection
                    // This fixes an issue where AppState might be momentarily stale
                    if (window.currentDeviceModel && window.currentDeviceModel !== payload.deviceModel) {
                        Logger.log(`[SnippetManager] Overriding stale deviceModel '${payload.deviceModel}' with '${window.currentDeviceModel}'`);
                        payload.deviceModel = window.currentDeviceModel;
                        payload.device_model = window.currentDeviceModel;
                        if (payload.settings) {
                            payload.settings.device_model = window.currentDeviceModel;
                        }
                    }

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

    /**
     * Copies only the display lambda (C++ code) to clipboard.
     * Useful for users who want to paste just the drawing code into their existing config.
     */
    async copyLambdaToClipboard(btnElement) {
        const snippetBox = document.getElementById('snippetBox');
        if (!snippetBox) return;

        const yaml = snippetBox.value || "";
        const originalText = btnElement.textContent;

        // Find the display section, then locate the lambda within it
        // The display section ends at the next top-level key (no leading whitespace)
        const displayIdx = yaml.search(/^display:\s*$/m);

        if (displayIdx === -1) {
            showToast("No display section found in output", "warning");
            return;
        }

        // Get everything after 'display:' until the end or next top-level section
        const afterDisplay = yaml.substring(displayIdx);

        // Find where the display section ends (next unindented key or end of file)
        const nextSectionMatch = afterDisplay.match(/\n[a-z_]+:\s*(?:\n|$)/);
        const displaySection = nextSectionMatch
            ? afterDisplay.substring(0, nextSectionMatch.index)
            : afterDisplay;

        // Now find the lambda within the display section
        const lambdaMatch = displaySection.match(/lambda:\s*\|-\n([\s\S]*?)$/);

        if (!lambdaMatch) {
            showToast("No display lambda found in output", "warning");
            return;
        }

        // Get the indented lambda content and remove consistent indentation
        let lambdaContent = lambdaMatch[1];

        // Find minimum indentation (excluding empty lines)
        const lines = lambdaContent.split('\n');
        const nonEmptyLines = lines.filter(l => l.trim().length > 0);
        if (nonEmptyLines.length === 0) {
            showToast("Lambda appears to be empty", "warning");
            return;
        }

        const minIndent = Math.min(...nonEmptyLines.map(l => l.match(/^(\s*)/)[1].length));

        // Remove the consistent indentation
        const cleanedLambda = lines
            .map(l => l.length >= minIndent ? l.substring(minIndent) : l)
            .join('\n')
            .trim();

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
                await navigator.clipboard.writeText(cleanedLambda);
                showToast("Display lambda copied to clipboard", "success");
                setSuccessState();
            } else {
                const textarea = document.createElement("textarea");
                textarea.value = cleanedLambda;
                textarea.style.position = "fixed";
                textarea.style.left = "-999999px";
                textarea.style.top = "-999999px";
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                try {
                    document.execCommand("copy");
                    showToast("Display lambda copied to clipboard", "success");
                    setSuccessState();
                } catch {
                    showToast("Unable to copy. Try selecting and copying manually.", "error");
                }
                document.body.removeChild(textarea);
            }
        } catch (err) {
            Logger.error("Copy lambda failed:", err);
            showToast("Unable to copy lambda", "error");
        }
    }

    async copyOEPLServiceToClipboard(btnElement) {
        const snippetBox = document.getElementById('snippetBox');
        if (!snippetBox) return;

        let jsonText = snippetBox.value || "";
        let finalYaml = "";

        try {
            // Re-generate or parse to ensure we have the full structure
            const serviceData = JSON.parse(jsonText);

            // Apply project settings if possible
            const entityId = AppState.settings.oeplEntityId || "open_epaper_link.0000000000000000";
            serviceData.target.entity_id = entityId;
            serviceData.data.dither = AppState.settings.oeplDither ?? 2;

            // Simple manually formatted YAML for HA service call
            finalYaml = `service: ${serviceData.service}\n`;
            finalYaml += `target:\n  entity_id: ${serviceData.target.entity_id}\n`;
            finalYaml += `data:\n`;
            finalYaml += `  background: ${serviceData.data.background}\n`;
            finalYaml += `  rotate: ${serviceData.data.rotate}\n`;
            finalYaml += `  dither: ${serviceData.data.dither}\n`;
            finalYaml += `  ttl: ${serviceData.data.ttl}\n`;
            finalYaml += `  payload: >\n`;

            // Format payload as a JSON string for the HA field (single line or nicely escapable)
            const payloadJson = JSON.stringify(serviceData.data.payload);
            finalYaml += `    ${payloadJson}`;

            // Helper for copy
            const originalText = btnElement.textContent;
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(finalYaml);
                showToast("HA Service call copied!", "success");
            } else {
                // Fallback for non-secure contexts
                const textarea = document.createElement("textarea");
                textarea.value = finalYaml;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand("copy");
                document.body.removeChild(textarea);
                showToast("HA Service call copied!", "success");
            }

            btnElement.textContent = "Copied!";
            setTimeout(() => { btnElement.textContent = originalText; }, 2000);

        } catch (err) {
            Logger.error("Failed to format/copy OEPL service:", err);
            showToast("Failed to format service call", "error");
        }
    }
}
