import { on, EVENTS } from '../core/events.js';
import { AppState } from '../core/state';
import {
    getLastSnippetHighlightRange,
    isSnippetAutoHighlightActive,
    SNIPPET_SELECTION_STATE_EVENT
} from '../core/snippet_selection_bridge.js';
import { Logger } from '../utils/logger.js';
import { showToast } from '../utils/dom.js';
import { highlightWidgetInSnippet } from '../io/yaml_export.js';
import { YamlHighlighter } from './yaml_highlighter.js';
import { copyText, extractDisplayLambda, formatOEPLServiceYaml, setTemporaryButtonLabel } from './snippet_manager_clipboard.js';
import { syncSnippetModeUi } from './snippet_manager_ui.js';
import { openSnippetModalEditor, handleImportSnippetEditor, handleUpdateLayoutFromSnippetBoxEditor } from './snippet_manager_editing.js';
import { addBrowserEventListener, dispatchBrowserEvent } from '../utils/browser_runtime.js';

/**
 * @typedef {{
 *   generate: (payload: any) => Promise<string>,
 *   constructor?: { name?: string }
 * }} SnippetAdapter
 */

/**
 * @param {string} id
 * @returns {HTMLButtonElement | null}
 */
function getButton(id) {
    return /** @type {HTMLButtonElement | null} */ (document.getElementById(id));
}

/**
 * @param {string} id
 * @returns {HTMLTextAreaElement | null}
 */
function getTextarea(id) {
    return /** @type {HTMLTextAreaElement | null} */ (document.getElementById(id));
}

/**
 * @param {string} id
 * @returns {HTMLElement | null}
 */
function getElement(id) {
    return document.getElementById(id);
}

/**
 * @param {unknown} error
 * @returns {string}
 */
function getErrorMessage(error) {
    return error instanceof Error ? error.message : String(error);
}

export class SnippetManager {
    /**
     * @param {SnippetAdapter} adapter
     */
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
        const fullscreenSnippetBtn = getButton('fullscreenSnippetBtn');
        if (fullscreenSnippetBtn) {
            fullscreenSnippetBtn.addEventListener('click', () => {
                this.openSnippetModal();
            });
        }

        const snippetFullscreenClose = getButton('snippetFullscreenClose');
        if (snippetFullscreenClose) {
            snippetFullscreenClose.addEventListener('click', () => {
                const modal = getElement('snippetFullscreenModal');
                if (modal) {
                    modal.classList.add('hidden');
                }
            });
        }

        // Import Modal Buttons
        const importSnippetConfirm = getButton('importSnippetConfirm');
        if (importSnippetConfirm) {
            importSnippetConfirm.addEventListener('click', async () => {
                await this.handleImportSnippet();
            });
        }

        // Update Layout from YAML (Snippet Box)
        const updateLayoutBtn = getButton('updateLayoutBtn');
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
                } catch {
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
        const copySnippetBtn = getButton('copySnippetBtn');
        if (copySnippetBtn) {
            copySnippetBtn.addEventListener('click', async () => {
                this.copySnippetToClipboard(copySnippetBtn);
            });
        }

        // Copy Lambda Only Button
        const copyLambdaBtn = getButton('copyLambdaBtn');
        if (copyLambdaBtn) {
            copyLambdaBtn.addEventListener('click', async () => {
                this.copyLambdaToClipboard(copyLambdaBtn);
            });
        }

        // Copy OEPL Service Button
        const copyOEPLServiceBtn = getButton('copyOEPLServiceBtn');
        if (copyOEPLServiceBtn) {
            copyOEPLServiceBtn.addEventListener('click', () => {
                this.copyOEPLServiceToClipboard(copyOEPLServiceBtn);
            });
        }

        // Copy ODP Service Button
        const copyODPServiceBtn = getButton('copyODPServiceBtn');
        if (copyODPServiceBtn) {
            copyODPServiceBtn.addEventListener('click', () => {
                // Since ODP adapter already returns full YAML, this is same as copy snippet
                this.copySnippetToClipboard(copyODPServiceBtn);
            });
        }

        // Toggle YAML Panel
        const toggleYamlBtn = getButton('toggleYamlBtn');
        const codePanel = document.querySelector('.code-panel');
        if (toggleYamlBtn && codePanel) {
            // Restore state from localStorage
            const isCollapsed = localStorage.getItem('esphome_designer_yaml_collapsed') === 'true';
            if (isCollapsed) {
                codePanel.classList.add('collapsed');
            }

            toggleYamlBtn.addEventListener('click', () => {
                const nowCollapsed = codePanel.classList.toggle('collapsed');
                localStorage.setItem('esphome_designer_yaml_collapsed', String(nowCollapsed));
                // Trigger resize event to ensure canvas adjusts if needed
                dispatchBrowserEvent(new Event('resize'));
            });
        }

        // Toggle Syntax Highlighting
        const toggleHighlightBtn = getButton('toggleHighlightBtn');
        const _snippetContainer = document.querySelector('.snippet-container');
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
                localStorage.setItem('esphome_designer_yaml_highlight', String(this.isHighlighted));

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

        addBrowserEventListener(SNIPPET_SELECTION_STATE_EVENT, () => {
            if (this.isHighlighted) {
                this.updateHighlightLayer();
            }
        });
    }

    setupScrollSync() {
        const snippetBox = getTextarea('snippetBox');
        const highlightLayer = getElement('highlightLayer');
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

        on(EVENTS.SELECTION_CHANGED, (/** @type {{ widgetIds?: string[] } | null | undefined} */ data) => {
            const widgetIds = (data && data.widgetIds) ? data.widgetIds : [];
            if (typeof highlightWidgetInSnippet === 'function') {
                highlightWidgetInSnippet(widgetIds);
            }
        });
    }

    updateHighlightLayer() {
        if (!this.isHighlighted) return;

        const mainBox = getTextarea('snippetBox');
        const mainLayer = getElement('highlightLayer');
        if (mainBox && mainLayer) {
            const selectionRange = isSnippetAutoHighlightActive() ? getLastSnippetHighlightRange() : null;
            mainLayer.innerHTML = this.highlighter.highlight(mainBox.value, selectionRange);
        }

        // Also update fullscreen if active
        const modalLayer = getElement('snippetFullscreenHighlight');
        const modalContent = getElement('snippetFullscreenContent');
        if (modalLayer && modalContent) {
            const textarea = /** @type {HTMLTextAreaElement | null} */ (modalContent.querySelector('textarea'));
            if (textarea) {
                const selectionRange = isSnippetAutoHighlightActive() ? getLastSnippetHighlightRange() : null;
                modalLayer.innerHTML = this.highlighter.highlight(textarea.value, selectionRange);
            }
        }
    }

    updateSnippetBox() {
        const snippetBox = getTextarea('snippetBox');
        if (snippetBox) {
            // Debounce the update
            if (this.snippetDebounceTimer) clearTimeout(this.snippetDebounceTimer);

            this.snippetDebounceTimer = setTimeout(() => {
                // Double-check suppression flag inside callback
                if (this.suppressSnippetUpdate) {
                    return;
                }

                try {
                    const selectedIds = AppState ? AppState.selectedWidgetIds : [];
                    const _isMultiSelect = selectedIds.length > 1;

                    const adapterName = this.adapter?.constructor?.name || '';
                    syncSnippetModeUi(adapterName);

                    // IMPORTANT: Deep clone to prevent mutating AppState
                    const rawPayload = AppState ? AppState.getPagesPayload() : { pages: [] };
                    const payload = JSON.parse(JSON.stringify(rawPayload));

                    // Using AppState directly without global overrides

                    this.adapter.generate(payload).then((/** @type {string} */ yaml) => {
                        this.lastGeneratedYaml = yaml;
                        snippetBox.value = yaml;

                        if (this.isHighlighted) {
                            this.updateHighlightLayer();
                        }

                        const selectedIds = AppState ? AppState.selectedWidgetIds : [];

                        if (typeof highlightWidgetInSnippet === 'function') {
                            highlightWidgetInSnippet(selectedIds);
                        }
                    }).catch((/** @type {unknown} */ e) => {
                        Logger.error("Error generating snippet via adapter:", e);
                        snippetBox.value = "# Error generating YAML (adapter): " + getErrorMessage(e);
                        if (this.isHighlighted) this.updateHighlightLayer();
                    });
                } catch (e) {
                    Logger.error("Error generating snippet:", e);
                    snippetBox.value = "# Error generating YAML: " + getErrorMessage(e);
                    if (this.isHighlighted) this.updateHighlightLayer();
                }
            }, 50);
        }
    }

    openSnippetModal() {
        return openSnippetModalEditor(this);
    }

    async handleImportSnippet() {
        return handleImportSnippetEditor(this);
    }

    async handleUpdateLayoutFromSnippetBox() {
        return handleUpdateLayoutFromSnippetBoxEditor(this);
    }

    /**
     * @param {HTMLButtonElement} btnElement
     */
    async copySnippetToClipboard(btnElement) {
        const snippetBox = getTextarea('snippetBox');
        if (!snippetBox) return;

        const text = snippetBox.value || "";

        try {
            await copyText(text);
            showToast("Snippet copied to clipboard", "success");
            setTemporaryButtonLabel(btnElement, "Copied!");
        } catch (err) {
            Logger.error("Copy failed:", err);
            showToast("Unable to copy snippet", "error");
        }
    }

    /**
     * Copies only the display lambda (C++ code) to clipboard.
     * Useful for users who want to paste just the drawing code into their existing config.
     */
    /**
     * @param {HTMLButtonElement} btnElement
     */
    async copyLambdaToClipboard(btnElement) {
        const snippetBox = getTextarea('snippetBox');
        if (!snippetBox) return;

        const yaml = snippetBox.value || "";

        try {
            const cleanedLambda = extractDisplayLambda(yaml);
            await copyText(cleanedLambda);
            showToast("Display lambda copied to clipboard", "success");
            setTemporaryButtonLabel(btnElement, "Copied!");
        } catch (err) {
            Logger.error("Copy lambda failed:", err);
            showToast(getErrorMessage(err) || "Unable to copy lambda", "error");
        }
    }

    /**
     * @param {HTMLButtonElement} btnElement
     */
    async copyOEPLServiceToClipboard(btnElement) {
        const snippetBox = getTextarea('snippetBox');
        if (!snippetBox) return;

        const jsonText = snippetBox.value || "";

        try {
            const serviceData = JSON.parse(jsonText);
            const finalYaml = formatOEPLServiceYaml(serviceData, AppState.settings);
            await copyText(finalYaml);
            showToast("HA Service call copied!", "success");
            setTemporaryButtonLabel(btnElement, "Copied!", 2000);
        } catch (err) {
            Logger.error("Failed to format/copy OEPL service:", err);
            showToast("Failed to format service call", "error");
        }
    }
}

