import { Logger } from '../utils/logger.js';
import { emit, EVENTS } from '../core/events.js';
import { showToast } from '../utils/dom.js';
import { AppState } from '../core/state.js';
import { DEVICE_PROFILES } from '../io/devices.js';

class LLMPrompt {
    constructor() {
        this.modal = document.getElementById('aiPromptModal');
        this.closeBtn = document.getElementById('aiPromptClose');
        this.submitBtn = document.getElementById('aiPromptSubmit');
        this.applyBtn = document.getElementById('aiPromptApply');
        this.input = document.getElementById('aiPromptInput');
        this.status = document.getElementById('aiPromptStatus');
        this.diffPanel = document.getElementById('aiPreviewDiff');
        this.diffContent = document.getElementById('aiDiffContent');

        this.generatedWidgets = null;
    }

    init() {
        if (!this.modal) return;

        this.closeBtn.onclick = () => this.close();
        this.submitBtn.onclick = () => this.handleSubmit();
        this.applyBtn.onclick = () => this.handleApply();

        window.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });
    }

    open() {
        if (!this.modal) return;
        this.modal.classList.remove('hidden');
        this.modal.style.display = 'flex';
        this.input.focus();

        // Check if configured
        const provider = window.AppState.settings.ai_provider || "gemini";
        const key = window.AppState.settings[`ai_api_key_${provider}`];
        const warning = document.getElementById('aiConfigWarning');
        if (warning) {
            warning.style.display = key ? 'none' : 'block';
        }

        // Reset state
        this.status.textContent = "";
        this.status.style.color = "";
        this.diffPanel.style.display = "none";
        this.applyBtn.style.display = "none";
        this.generatedWidgets = null;
    }

    close() {
        if (this.modal) {
            this.modal.classList.add('hidden');
            this.modal.style.display = 'none';
        }
    }

    async handleSubmit() {
        const prompt = this.input.value.trim();
        if (!prompt) return;

        this.setLoading(true);
        this.status.textContent = "AI is thinking...";
        this.status.style.color = "var(--accent)";
        this.diffPanel.style.display = "none";
        this.applyBtn.style.display = "none";

        try {
            const currentPage = window.AppState.getCurrentPage();

            // Detect display type from device profile
            const deviceId = AppState.deviceModel;
            const deviceProfile = DEVICE_PROFILES?.[deviceId];
            let displayType = "monochrome"; // default fallback
            if (deviceProfile) {
                if (deviceProfile.features?.lcd) {
                    displayType = "color_lcd";
                } else if (deviceProfile.name?.includes("6-Color") || deviceProfile.name?.includes("Color")) {
                    displayType = "color_epaper";
                } else {
                    displayType = "monochrome";
                }
            }

            const context = {
                canvas: window.AppState.getCanvasDimensions(),
                current_page: currentPage.id,
                widgets: currentPage.widgets,
                selected_widget_id: window.AppState.selectedWidgetId,
                display_type: displayType
            };

            const result = await window.aiService.processPrompt(prompt, context);

            if (result && Array.isArray(result)) {
                this.generatedWidgets = result;
                this.showDiffPreview(currentPage.widgets, result);
                this.status.textContent = "Successfully generated changes!";
                this.status.style.color = "var(--success)";
                this.applyBtn.style.display = "inline-block";
            } else {
                throw new Error("Invalid response format from AI");
            }
        } catch (e) {
            Logger.error(e);
            this.status.textContent = "Error: " + e.message;
            this.status.style.color = "var(--danger)";
        } finally {
            this.setLoading(false);
        }
    }

    handleApply() {
        if (!this.generatedWidgets) return;

        try {
            const currentPage = window.AppState.getCurrentPage();
            currentPage.widgets = this.generatedWidgets;

            // Re-index widgets
            window.AppState.project.rebuildWidgetsIndex();

            // Trigger update
            emit(EVENTS.STATE_CHANGED);

            showToast("AI changes applied!", "success");
            this.close();
        } catch (e) {
            Logger.error(e);
            showToast("Failed to apply changes: " + e.message, "error");
        }
    }

    showDiffPreview(oldWidgets, newWidgets) {
        this.diffPanel.style.display = "block";

        // Simple diff: show widget count and names
        let diffText = `Widgets: ${oldWidgets.length} ➔ ${newWidgets.length}\n\n`;

        const oldIds = oldWidgets.map(w => w.id);
        const newIds = newWidgets.map(w => w.id);

        const added = newWidgets.filter(w => !oldIds.includes(w.id));
        const removed = oldWidgets.filter(w => !newIds.includes(w.id));
        const modified = newWidgets.filter(w => {
            const old = oldWidgets.find(ow => ow.id === w.id);
            return old && JSON.stringify(old) !== JSON.stringify(w);
        });

        if (added.length > 0) {
            diffText += `[ADDED]\n${added.map(w => `+ ${w.type} (${w.id})`).join('\n')}\n\n`;
        }
        if (removed.length > 0) {
            diffText += `[REMOVED]\n${removed.map(w => `- ${w.type} (${w.id})`).join('\n')}\n\n`;
        }
        if (modified.length > 0) {
            diffText += `[MODIFIED]\n${modified.map(w => `~ ${w.type} (${w.id})`).join('\n')}`;
        }

        if (added.length === 0 && removed.length === 0 && modified.length === 0) {
            diffText += "(No changes detected)";
        }

        this.diffContent.textContent = diffText;
    }

    setLoading(isLoading) {
        this.submitBtn.disabled = isLoading;
        this.submitBtn.textContent = isLoading ? "Processing..." : "Generate";
        this.input.disabled = isLoading;
    }
}

window.llmPrompt = new LLMPrompt();
