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
        this.hasPendingManualSnippetChanges = false;

        // Highlighting persistence
        this.isHighlighted = localStorage.getItem('esphome_designer_yaml_highlight') !== 'false';

        this.init();
    }

    /**
     * @returns {string}
     */
    getPersistedManualYamlOverride() {
        if (typeof AppState?.getManualYamlOverride === 'function') {
            return AppState.getManualYamlOverride() || "";
        }

        return AppState?.project?.state?.manualYamlOverride || "";
    }

    /**
     * @param {boolean} isActive
     */
    refreshManualOverrideUi(isActive) {
        const clearOverrideBtn = getButton('clearYamlOverrideBtn');
        if (clearOverrideBtn) {
            clearOverrideBtn.style.display = isActive ? 'inline-block' : 'none';
        }
    }

    /**
     * @param {string} value
     */
    setSnippetText(value) {
        const snippetBox = getTextarea('snippetBox');
        if (snippetBox && snippetBox.value !== value) {
            snippetBox.value = value;
        }

        const fullscreenContent = getElement('snippetFullscreenContent');
        const fullscreenTextarea = /** @type {HTMLTextAreaElement | null} */ (fullscreenContent?.querySelector('textarea'));
        if (fullscreenTextarea && fullscreenTextarea.value !== value) {
            fullscreenTextarea.value = value;
        }
    }

    /**
     * @param {string | null | undefined} value
     * @returns {string}
     */
    normalizeSnippetText(value) {
        return String(value || '').replace(/\r\n/g, '\n');
    }

    /**
     * @returns {any}
     */
    clonePagesPayload() {
        const rawPayload = AppState ? AppState.getPagesPayload() : { pages: [] };
        return JSON.parse(JSON.stringify(rawPayload));
    }

    /**
     * @returns {Promise<string>}
     */
    async generateCurrentSnippetYaml() {
        const payload = this.clonePagesPayload();
        const yaml = await this.adapter.generate(payload);
        return this.normalizeSnippetText(yaml);
    }

    /**
     * Rebuild the generated-YAML baseline from current AppState after importing
     * custom YAML back into the canvas, so future snippet merges stay aligned.
     *
     * @returns {Promise<void>}
     */
    async syncGeneratedSnippetBaseline() {
        try {
            this.lastGeneratedYaml = await this.generateCurrentSnippetYaml();
        } catch (error) {
            Logger.warn('[SnippetManager] Failed to rebuild generated YAML baseline after import.', error);
        }
    }

    /**
     * Break a snippet into top-level blocks so we can preserve custom sections
     * even after manual edits change the generated section text.
     *
     * @param {string} value
     * @returns {{ type: 'preamble' | 'section', key: string | null, text: string }[]}
     */
    parseTopLevelSnippetBlocks(value) {
        const normalized = this.normalizeSnippetText(value);
        if (!normalized.trim()) {
            return [];
        }

        const blocks = [];
        const lines = normalized.split('\n');
        /** @type {{ type: 'preamble' | 'section', key: string | null, lines: string[] } | null} */
        let currentBlock = null;

        const flushBlock = () => {
            if (!currentBlock || currentBlock.lines.length === 0) {
                currentBlock = null;
                return;
            }

            const text = currentBlock.lines.join('\n').replace(/\n+$/g, '').trimEnd();
            if (text.trim()) {
                blocks.push({
                    type: currentBlock.type,
                    key: currentBlock.key,
                    text
                });
            }

            currentBlock = null;
        };

        lines.forEach((line) => {
            const isTopLevel = !line.startsWith(' ') && !line.startsWith('\t');
            const sectionMatch = isTopLevel
                ? line.match(/^([A-Za-z0-9_]+:)(?:\s+#.*)?\s*$/)
                : null;

            if (sectionMatch) {
                flushBlock();
                currentBlock = {
                    type: 'section',
                    key: sectionMatch[1],
                    lines: [line]
                };
                return;
            }

            if (!currentBlock) {
                currentBlock = {
                    type: 'preamble',
                    key: null,
                    lines: []
                };
            }

            currentBlock.lines.push(line);
        });

        flushBlock();
        return blocks;
    }

    /**
     * @param {...string} yamlTexts
     * @returns {Set<string>}
     */
    getManagedSnippetSectionKeys(...yamlTexts) {
        const managedKeys = new Set();

        yamlTexts.forEach((yamlText) => {
            this.parseTopLevelSnippetBlocks(yamlText).forEach((block) => {
                if (block.type === 'section' && block.key) {
                    managedKeys.add(block.key);
                }
            });
        });

        return managedKeys;
    }

    /**
     * Fall back to a top-level section merge when inline manual edits, such as
     * comments inside the generated block, prevent an exact string replacement.
     *
     * Managed sections are refreshed from the canvas state while genuinely
     * custom sections are preserved before/after the generated YAML.
     *
     * @param {string} generatedYaml
     * @param {string} manualYamlOverride
     * @param {string} lastGeneratedYaml
     * @returns {{ text: string, usesManualOverride: boolean } | null}
     */
    reconcileManualSnippetOverrideBySections(generatedYaml, manualYamlOverride, lastGeneratedYaml) {
        const managedSectionKeys = this.getManagedSnippetSectionKeys(generatedYaml, lastGeneratedYaml);
        if (managedSectionKeys.size === 0) {
            return null;
        }

        const manualBlocks = this.parseTopLevelSnippetBlocks(manualYamlOverride);
        const containsManagedSections = manualBlocks.some((block) => block.type === 'section' && block.key && managedSectionKeys.has(block.key));
        if (!containsManagedSections) {
            return null;
        }

        const prefixBlocks = [];
        const suffixBlocks = [];
        let seenManagedSection = false;

        manualBlocks.forEach((block) => {
            const isManagedSection = block.type === 'section' && block.key && managedSectionKeys.has(block.key);
            if (!isManagedSection) {
                if (seenManagedSection) {
                    suffixBlocks.push(block.text);
                } else {
                    prefixBlocks.push(block.text);
                }
            }

            if (isManagedSection) {
                seenManagedSection = true;
            }
        });

        const mergedParts = [...prefixBlocks, generatedYaml, ...suffixBlocks]
            .map((part) => this.normalizeSnippetText(part).replace(/^\n+|\n+$/g, '').trimEnd())
            .filter((part) => part.trim());

        if (mergedParts.length === 0) {
            return null;
        }

        const mergedText = mergedParts.join('\n\n');
        return {
            text: mergedText,
            usesManualOverride: mergedText.trim() !== generatedYaml.trim()
        };
    }

    /**
     * Replace the previously generated block inside a manually edited snippet.
     * This keeps user-added YAML before/after the generated block while allowing
     * widget changes on the canvas to refresh the generated portion.
     *
     * @param {string} generatedYaml
     * @param {string} manualYamlOverride
     * @returns {{ text: string, usesManualOverride: boolean }}
     */
    reconcileManualSnippetOverride(generatedYaml, manualYamlOverride) {
        const normalizedGenerated = this.normalizeSnippetText(generatedYaml);
        const normalizedManualOverride = this.normalizeSnippetText(manualYamlOverride);
        const normalizedLastGenerated = this.normalizeSnippetText(this.lastGeneratedYaml);

        if (!normalizedManualOverride.trim()) {
            return {
                text: normalizedGenerated,
                usesManualOverride: false
            };
        }

        if (!normalizedLastGenerated.trim()) {
            return {
                text: normalizedManualOverride,
                usesManualOverride: true
            };
        }

        if (normalizedManualOverride.includes(normalizedLastGenerated)) {
            const mergedText = normalizedManualOverride.replace(normalizedLastGenerated, normalizedGenerated);
            return {
                text: mergedText,
                usesManualOverride: mergedText.trim() !== normalizedGenerated.trim()
            };
        }

        const sectionFallback = this.reconcileManualSnippetOverrideBySections(
            normalizedGenerated,
            normalizedManualOverride,
            normalizedLastGenerated
        );
        if (sectionFallback) {
            Logger.log('[SnippetManager] Falling back to section-based YAML merge after manual edits changed the generated block.');
            return sectionFallback;
        }

        if (normalizedManualOverride.trim() === normalizedGenerated.trim()) {
            return {
                text: normalizedGenerated,
                usesManualOverride: false
            };
        }

        Logger.warn('[SnippetManager] Unable to merge manual YAML override with regenerated snippet; preserving manual YAML verbatim.');
        return {
            text: normalizedManualOverride,
            usesManualOverride: true
        };
    }

    /**
     * @param {string} value
     */
    persistManualYamlOverride(value) {
        if (typeof AppState?.setManualYamlOverride === 'function') {
            AppState.setManualYamlOverride(value, { emitStateChange: false });
            return;
        }

        if (AppState?.project?.state) {
            AppState.project.state.manualYamlOverride = value;
        }
    }

    clearManualYamlOverride() {
        if (typeof AppState?.clearManualYamlOverride === 'function') {
            AppState.clearManualYamlOverride();
        } else if (AppState?.project?.state) {
            AppState.project.state.manualYamlOverride = "";
        }

        this.refreshManualOverrideUi(false);
        this.updateSnippetBox();
    }

    /**
     * @param {string} value
     */
    handleSnippetTextInput(value) {
        this.setSnippetText(value);
        this.hasPendingManualSnippetChanges = value.trim() !== this.lastGeneratedYaml.trim();

        if (this.hasPendingManualSnippetChanges) {
            this.persistManualYamlOverride(value);
        } else {
            this.clearManualYamlOverride();
        }

        this.refreshManualOverrideUi(!!this.getPersistedManualYamlOverride() || this.hasPendingManualSnippetChanges);

        if (this.isHighlighted) {
            this.updateHighlightLayer();
        }
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

        const clearOverrideBtn = getButton('clearYamlOverrideBtn');
        if (clearOverrideBtn) {
            clearOverrideBtn.addEventListener('click', () => {
                this.hasPendingManualSnippetChanges = false;
                this.clearManualYamlOverride();
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
        const snippetBox = getTextarea('snippetBox');
        if (snippetBox) {
            snippetBox.addEventListener('input', () => {
                this.handleSnippetTextInput(snippetBox.value);
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

                const adapterName = this.adapter?.constructor?.name || '';
                syncSnippetModeUi(adapterName);

                const manualYamlOverride = this.getPersistedManualYamlOverride();

                if (this.hasPendingManualSnippetChanges && !manualYamlOverride) {
                    Logger.log("[SnippetManager] Preserving pending YAML edits; skipping auto-regeneration.");
                    return;
                }

                try {
                    const selectedIds = AppState ? AppState.selectedWidgetIds : [];
                    const _isMultiSelect = selectedIds.length > 1;

                    // IMPORTANT: Deep clone to prevent mutating AppState
                    this.generateCurrentSnippetYaml().then((/** @type {string} */ normalizedGeneratedYaml) => {
                        const nextSnippet = this.reconcileManualSnippetOverride(normalizedGeneratedYaml, manualYamlOverride);

                        this.lastGeneratedYaml = normalizedGeneratedYaml;
                        this.hasPendingManualSnippetChanges = false;
                        this.setSnippetText(nextSnippet.text);

                        if (nextSnippet.usesManualOverride) {
                            this.persistManualYamlOverride(nextSnippet.text);
                        } else {
                            this.persistManualYamlOverride("");
                        }

                        this.refreshManualOverrideUi(nextSnippet.usesManualOverride);

                        if (this.isHighlighted) {
                            this.updateHighlightLayer();
                        }

                        const selectedIds = AppState ? AppState.selectedWidgetIds : [];

                        if (typeof highlightWidgetInSnippet === 'function') {
                            highlightWidgetInSnippet(selectedIds);
                        }
                    }).catch((/** @type {unknown} */ e) => {
                        Logger.error("Error generating snippet via adapter:", e);
                        this.setSnippetText("# Error generating YAML (adapter): " + getErrorMessage(e));
                        if (this.isHighlighted) this.updateHighlightLayer();
                    });
                } catch (e) {
                    Logger.error("Error generating snippet:", e);
                    this.setSnippetText("# Error generating YAML: " + getErrorMessage(e));
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

