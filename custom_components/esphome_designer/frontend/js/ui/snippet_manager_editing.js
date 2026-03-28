import { AppState } from '../core/state';
import { getLastSnippetHighlightRange, isSnippetAutoHighlightActive } from '../core/snippet_selection_bridge.js';
import { Logger } from '../utils/logger.js';
import { showToast } from '../utils/dom.js';
import { loadLayoutIntoState, parseSnippetYamlOffline } from '../io/yaml_import';
import { importSnippetBackend } from '../io/ha_api.js';
import { hasHaBackend } from '../utils/env.js';

/** @param {string} id */
function getButton(id) { return /** @type {HTMLButtonElement | null} */ (document.getElementById(id)); }
/** @param {string} id */
function getTextarea(id) { return /** @type {HTMLTextAreaElement | null} */ (document.getElementById(id)); }
/** @param {string} id */
function getElement(id) { return document.getElementById(id); }

/**
 * @param {unknown} error
 * @returns {string}
 */
function getErrorMessage(error) {
    return error instanceof Error ? error.message : String(error);
}

/** @param {any} manager */
export function openSnippetModalEditor(manager) {
            const modal = getElement('snippetFullscreenModal');
            const container = getElement('snippetFullscreenContainer');
            const content = getElement('snippetFullscreenContent');
            const highlightLayer = getElement('snippetFullscreenHighlight');
            const snippetBox = getTextarea('snippetBox');
            const toggleBtn = /** @type {(HTMLButtonElement & { hasListener?: boolean }) | null} */ (document.getElementById('toggleFullscreenHighlightBtn'));

            if (!modal || !container || !content || !highlightLayer || !snippetBox) return;

            // Sync highlighting state
            container.classList.toggle('highlighted', manager.isHighlighted);
            if (toggleBtn) toggleBtn.classList.toggle('active', manager.isHighlighted);

            // Setup toggle for fullscreen
            if (toggleBtn && !toggleBtn.hasListener) {
                toggleBtn.addEventListener('click', () => {
                    manager.isHighlighted = !manager.isHighlighted;
                    // Sync with main panel and storage
                    localStorage.setItem('esphome_designer_yaml_highlight', String(manager.isHighlighted));
                    const mainContainer = document.querySelector('.snippet-container');
                    const mainToggle = getButton('toggleHighlightBtn');

                    if (mainContainer) mainContainer.classList.toggle('highlighted', manager.isHighlighted);
                    if (mainToggle) mainToggle.classList.toggle('active', manager.isHighlighted);

                    container.classList.toggle('highlighted', manager.isHighlighted);
                    toggleBtn.classList.toggle('active', manager.isHighlighted);

                    if (manager.isHighlighted) {
                        const selectionRange = isSnippetAutoHighlightActive() ? getLastSnippetHighlightRange() : null;
                        highlightLayer.innerHTML = manager.highlighter.highlight(
                            /** @type {HTMLTextAreaElement} */ (textarea).value,
                            selectionRange
                        );
                        manager.updateHighlightLayer(); // Also update main panel
                    }
                });
                toggleBtn.hasListener = true;
            }

            // Use a textarea for editing if it doesn't exist, otherwise update its value
            let textarea = /** @type {HTMLTextAreaElement | null} */ (content.querySelector("textarea"));
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
                    highlightLayer.scrollTop = /** @type {HTMLTextAreaElement} */ (textarea).scrollTop;
                    highlightLayer.scrollLeft = /** @type {HTMLTextAreaElement} */ (textarea).scrollLeft;
                });

                // Update highlight for fullscreen
                textarea.addEventListener('input', () => {
                    if (manager.isHighlighted) {
                        highlightLayer.innerHTML = manager.highlighter.highlight(
                            /** @type {HTMLTextAreaElement} */ (textarea).value
                        );
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
                        snippetBox.value = /** @type {HTMLTextAreaElement} */ (textarea).value;
                        manager.handleUpdateLayoutFromSnippetBox();
                        modal.classList.add("hidden");
                    };
                    footer.insertBefore(updateBtn, footer.firstChild);
                }
            }

            const editorTextarea = textarea;
            if (!editorTextarea) return;

            editorTextarea.value = snippetBox.value || "";

                // Initial highlight for fullscreen
            if (manager.isHighlighted) {
                const selectionRange = isSnippetAutoHighlightActive() ? getLastSnippetHighlightRange() : null;
                highlightLayer.innerHTML = manager.highlighter.highlight(editorTextarea.value, selectionRange);
                setTimeout(() => {
                    highlightLayer.scrollTop = editorTextarea.scrollTop;
                    highlightLayer.scrollLeft = editorTextarea.scrollLeft;
                }, 50);
            }

            modal.style.display = "";
            modal.classList.remove('hidden');
        
}

/** @param {any} _manager */
export async function handleImportSnippetEditor(_manager) {
            const textarea = getTextarea('importSnippetTextarea');
            const errorBox = getElement('importSnippetError');
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
                const modal = getElement('importSnippetModal');
                if (modal) {
                    modal.classList.add('hidden');
                    modal.style.display = 'none';
                }

                showToast("Layout imported successfully", "success");

            } catch (err) {
                Logger.error("Import failed:", err);
                if (errorBox) errorBox.textContent = `Error: ${getErrorMessage(err)}`;
            }
        
}

/** @param {any} manager */
export async function handleUpdateLayoutFromSnippetBoxEditor(manager) {
            const snippetBox = getTextarea('snippetBox');
            if (!snippetBox) return;
            const yaml = snippetBox.value;
            if (!yaml.trim()) return;

            if (manager.lastGeneratedYaml && yaml.trim() === manager.lastGeneratedYaml.trim()) {
                Logger.log("[handleUpdateLayoutFromSnippetBox] Skipping update: Snippet matches last generated state.");
                return;
            }

            try {
                const currentLayoutId = AppState?.currentLayoutId || "reterminal_e1001";
                const currentDeviceName = AppState?.deviceName || "Layout 1";
                const currentDeviceModel = AppState?.deviceModel || AppState?.settings?.device_model || "reterminal_e1001";

                Logger.log(`[handleUpdateLayoutFromSnippetBox] Preserving context - ID: ${currentLayoutId}, Name: ${currentDeviceName}`);

                const layout = parseSnippetYamlOffline(yaml);
                if (!layout) {
                    throw new Error("Could not parse layout from YAML");
                }

                layout.device_id = currentLayoutId;
                layout.name = currentDeviceName;
                layout.device_model = currentDeviceModel;

                if (!layout.settings) {
                    layout.settings = {};
                }
                layout.settings.device_model = currentDeviceModel;
                layout.settings.device_name = currentDeviceName;

                // Preserve dark_mode setting from current state
                const currentDarkMode = AppState?.settings?.dark_mode || false;
                layout.settings.dark_mode = currentDarkMode;

                manager.suppressSnippetUpdate = true;
                if (manager.snippetDebounceTimer) {
                    clearTimeout(manager.snippetDebounceTimer);
                    manager.snippetDebounceTimer = null;
                }

                loadLayoutIntoState(layout);

                setTimeout(() => {
                    manager.suppressSnippetUpdate = false;
                }, 1500);

                showToast("Layout updated from YAML", "success");

                if (yaml.includes("lambda:") || yaml.includes("script:")) {
                    setTimeout(() => {
                        showToast("Note: Custom C++ (lambda/script) may not fully preview.", "warning", 4000);
                    }, 800);
                }

            } catch (err) {
                Logger.error("Update layout failed:", err);
                showToast(`Update failed: ${getErrorMessage(err)}`, "error");
                manager.suppressSnippetUpdate = false;
            }
        
}
