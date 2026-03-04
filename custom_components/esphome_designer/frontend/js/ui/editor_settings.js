import { AppState } from '../core/state';
import { emit, EVENTS } from '../core/events.js';
import { setHaManualUrl, refreshHaBaseUrl, setHaToken, getHaManualUrl, getHaToken, isDeployedInHa } from '../utils/env.js';
import { showToast } from '../utils/dom.js';
import { fetchEntityStates, entityStatesCache } from '../io/ha_api.js';
import { aiService } from '../io/ai_service.js';
import { Logger } from '../utils/logger.js';

export class EditorSettings {
    constructor() {
        const getElement = (id) => /** @type {HTMLElement | null} */ (document.getElementById(id));
        const getInput = (id) => /** @type {HTMLInputElement | null} */ (document.getElementById(id));
        const getSelect = (id) => /** @type {HTMLSelectElement | null} */ (document.getElementById(id));
        const getButton = (id) => /** @type {HTMLButtonElement | null} */ (document.getElementById(id));

        this.modal = getElement('editorSettingsModal');
        this.closeBtn = getElement('editorSettingsClose');
        this.doneBtn = getElement('editorSettingsDone');

        // Inputs
        this.snapToGrid = getInput('editorSnapToGrid');
        this.showGrid = getInput('editorShowGrid');
        this.lightMode = getInput('editorLightMode');
        this.refreshEntitiesBtn = getButton('editorRefreshEntities');
        this.entityCountLabel = getElement('editorEntityCount');
        this.gridOpacity = getInput('editorGridOpacity');
        this.extendedLatinGlyphs = getInput('editorExtendedLatinGlyphs');

        // HA Connection
        this.haManualUrl = getInput('haManualUrl');
        this.haLlatToken = getInput('haLlatToken');
        this.testHaBtn = getButton('editorTestHaBtn');
        this.haTestResult = getElement('haTestResult');
        this.haDeployedWarning = getElement('haDeployedWarning');
        this.haCorsTip = getElement('haCorsTip');


        // AI Settings
        this.aiProvider = getSelect('aiProvider');
        this.aiApiKeyGemini = getInput('aiApiKeyGemini');
        this.aiApiKeyOpenai = getInput('aiApiKeyOpenai');
        this.aiApiKeyOpenrouter = getInput('aiApiKeyOpenrouter');
        this.aiModelFilter = getInput('aiModelFilter');
        this.aiModelSelect = getSelect('aiModelSelect');
        this.aiRefreshModelsBtn = getButton('aiRefreshModelsBtn');
        this.aiTestResult = getElement('aiTestResult');

        this.aiKeyRows = {
            gemini: getElement('aiKeyGeminiRow'),
            openai: getElement('aiKeyOpenaiRow'),
            openrouter: getElement('aiKeyOpenrouterRow')
        };
    }

    init() {
        if (!this.modal) return;

        // Close/Done buttons
        if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.close());
        if (this.doneBtn) this.doneBtn.addEventListener('click', () => this.close());

        this.setupListeners();
    }

    open() {
        if (!this.modal) return;

        const settings = AppState.settings;

        // Snap to Grid
        if (this.snapToGrid) {
            // snapEnabled is at AppState root
            this.snapToGrid.checked = AppState.snapEnabled !== false;
        }

        // Show Grid
        if (this.showGrid) {
            // showGrid is at AppState root
            this.showGrid.checked = AppState.showGrid !== false;
        }

        // Light Mode
        if (this.lightMode) {
            this.lightMode.checked = !!settings.editor_light_mode;
        }

        // AI Settings
        if (this.aiProvider) this.aiProvider.value = settings.ai_provider || "gemini";
        if (this.aiApiKeyGemini) this.aiApiKeyGemini.value = settings.ai_api_key_gemini || "";
        if (this.aiApiKeyOpenai) this.aiApiKeyOpenai.value = settings.ai_api_key_openai || "";
        if (this.aiApiKeyOpenrouter) this.aiApiKeyOpenrouter.value = settings.ai_api_key_openrouter || "";
        if (this.aiModelFilter) this.aiModelFilter.value = settings.ai_model_filter || "";

        this.updateAIKeyVisibility();
        this.refreshModelSelect();

        // Grid Opacity
        if (this.gridOpacity) {
            this.gridOpacity.value = String(settings.grid_opacity !== undefined ? settings.grid_opacity : 20);
        }

        // Glyphsets
        const selectedGlyphsets = settings.glyphsets || ["GF_Latin_Kernel"];
        const glyphsetCheckboxes = /** @type {NodeListOf<HTMLInputElement>} */ (document.querySelectorAll('.glyphset-checkbox'));
        glyphsetCheckboxes.forEach(cb => {
            cb.checked = selectedGlyphsets.includes(cb.value);
        });

        // Extended Latin Glyphs
        if (this.extendedLatinGlyphs) {
            this.extendedLatinGlyphs.checked = !!settings.extendedLatinGlyphs;
        }

        // HA Connection
        const deployedInHa = isDeployedInHa();
        if (this.haManualUrl) {
            this.haManualUrl.value = getHaManualUrl() || "";
            this.haManualUrl.disabled = deployedInHa;
            this.haManualUrl.style.opacity = deployedInHa ? "0.5" : "1";
        }
        if (this.haLlatToken) {
            this.haLlatToken.value = getHaToken() || "";
            this.haLlatToken.disabled = deployedInHa;
            this.haLlatToken.style.opacity = deployedInHa ? "0.5" : "1";
        }
        if (this.haDeployedWarning) {
            this.haDeployedWarning.classList.toggle('hidden', !deployedInHa);
        }
        if (this.haCorsTip) {
            this.haCorsTip.classList.toggle('hidden', deployedInHa);
        }

        if (this.haTestResult) this.haTestResult.textContent = "";
        if (this.aiTestResult) this.aiTestResult.textContent = "";


        // Dynamically show current origin for CORS tip
        const originPlaceholder = /** @type {HTMLElement | null} */ (document.getElementById('haOriginPlaceholder'));
        if (originPlaceholder) {
            originPlaceholder.textContent = window.location.origin;
        }

        // Entity Count
        this.updateEntityCount();

        // Actually show the modal
        this.modal.classList.remove('hidden');
        this.modal.style.display = 'flex';
    }

    close() {
        if (this.modal) {
            this.modal.classList.add('hidden');
            this.modal.style.display = 'none';
        }
    }

    updateEntityCount() {
        if (this.entityCountLabel && entityStatesCache) {
            const count = Object.keys(entityStatesCache).length;
            this.entityCountLabel.textContent = `${count} entities cached`;
        }
    }

    setupListeners() {
        if (!this.modal) return;

        // Snap to Grid
        if (this.snapToGrid) {
            this.snapToGrid.addEventListener('change', () => {
                AppState.setSnapEnabled(this.snapToGrid.checked);
            });
        }

        // Show Grid
        if (this.showGrid) {
            this.showGrid.addEventListener('change', () => {
                AppState.setShowGrid(this.showGrid.checked);
                // Also toggle DOM immediately for responsiveness
                const gridEl = /** @type {HTMLElement | null} */ (document.querySelector('.canvas-grid'));
                if (gridEl) {
                    gridEl.style.display = this.showGrid.checked ? 'block' : 'none';
                }
            });
        }

        // Light Mode
        if (this.lightMode) {
            this.lightMode.addEventListener('change', () => {
                const isLight = this.lightMode.checked;
                AppState.updateSettings({ editor_light_mode: isLight });
                this.applyEditorTheme(isLight);
                emit(EVENTS.STATE_CHANGED);
            });
        }

        // Grid Opacity
        if (this.gridOpacity) {
            this.gridOpacity.addEventListener('input', () => {
                const val = parseInt(this.gridOpacity.value, 10);
                AppState.updateSettings({ grid_opacity: val });
            });
        }


        // Refresh Entities
        if (this.refreshEntitiesBtn) {
            this.refreshEntitiesBtn.addEventListener('click', async () => {
                this.refreshEntitiesBtn.disabled = true;
                this.refreshEntitiesBtn.textContent = "Refreshing...";

                // Use imported fetchEntityStates
                if (fetchEntityStates) {
                    await fetchEntityStates();
                }

                this.updateEntityCount();
                this.refreshEntitiesBtn.disabled = false;
                this.refreshEntitiesBtn.textContent = "↻ Refresh Entity List";
            });
        }

        // HA Connection Changes
        if (this.haManualUrl) {
            this.haManualUrl.addEventListener('change', () => {
                setHaManualUrl(this.haManualUrl.value.trim());
                refreshHaBaseUrl();
            });
        }

        if (this.haLlatToken) {
            this.haLlatToken.addEventListener('change', () => {
                setHaToken(this.haLlatToken.value.trim());
            });
        }

        if (this.testHaBtn) {
            this.testHaBtn.addEventListener('click', async () => {
                this.testHaBtn.disabled = true;
                this.haTestResult.textContent = "Testing...";
                this.haTestResult.style.color = "var(--muted)";

                try {
                    // Force refresh base URL in case it was just changed
                    refreshHaBaseUrl();
                    // Use imported fetchEntityStates
                    const entities = await fetchEntityStates();
                    if (entities && entities.length > 0) {
                        this.haTestResult.textContent = "✅ Success!";
                        this.haTestResult.style.color = "var(--success)";
                        this.updateEntityCount();
                    } else {
                        // Detailed failure help
                        this.haTestResult.innerHTML = "❌ Failed.<br>Did you add <strong>cors_allowed_origins</strong> to HA and <strong>restart</strong> it?";
                        this.haTestResult.style.color = "var(--danger)";
                    }
                } catch {
                    this.haTestResult.innerHTML = "❌ Connection Error.<br>Check browser console.";
                    this.haTestResult.style.color = "var(--danger)";
                } finally {
                    this.testHaBtn.disabled = false;
                }
            });
        }

        // AI Listeners
        if (this.aiProvider) {
            this.aiProvider.addEventListener('change', () => {
                AppState.updateSettings({ ai_provider: this.aiProvider.value });
                this.updateAIKeyVisibility();
                this.refreshModelSelect();
            });
        }

        const bindAIKey = (id, key) => {
            const el = /** @type {HTMLInputElement | null} */ (document.getElementById(id));
            if (el) el.addEventListener('input', () => AppState.updateSettings({ [key]: el.value.trim() }));
        };
        bindAIKey('aiApiKeyGemini', 'ai_api_key_gemini');
        bindAIKey('aiApiKeyOpenai', 'ai_api_key_openai');
        bindAIKey('aiApiKeyOpenrouter', 'ai_api_key_openrouter');

        if (this.aiModelFilter) {
            this.aiModelFilter.addEventListener('input', () => {
                AppState.updateSettings({ ai_model_filter: this.aiModelFilter.value });
                this.filterModels();
            });
        }

        if (this.aiModelSelect) {
            this.aiModelSelect.addEventListener('change', () => {
                const provider = AppState.settings.ai_provider;
                AppState.updateSettings({ [`ai_model_${provider}`]: this.aiModelSelect.value });
            });
        }

        if (this.aiRefreshModelsBtn) {
            this.aiRefreshModelsBtn.addEventListener('click', async () => {
                const provider = AppState.settings.ai_provider || "gemini";

                // Force read from DOM to ensure we engage with what the user just typed/pasted
                // even if the 'input' event hasn't fully propagated to settings yet.
                let apiKey = AppState.settings[`ai_api_key_${provider}`];
                const inputId = `aiApiKey${provider.charAt(0).toUpperCase() + provider.slice(1)}`;
                const inputEl = /** @type {HTMLInputElement | null} */ (document.getElementById(inputId));

                if (inputEl) {
                    apiKey = inputEl.value.trim();
                    // Sync back to state to be sure
                    AppState.updateSettings({ [`ai_api_key_${provider}`]: apiKey });
                }

                if (!apiKey) {
                    showToast("Please enter an API key first", "error", 3000);
                    return;
                }

                this.aiRefreshModelsBtn.disabled = true;
                this.aiRefreshModelsBtn.textContent = "...";
                if (this.aiTestResult) {
                    this.aiTestResult.textContent = "Testing...";
                    this.aiTestResult.style.color = "var(--muted)";
                }

                try {
                    // Assuming aiService is still attached to window for now until refactored
                    const models = await aiService.fetchModels(provider, apiKey);
                    aiService.cache.models[provider] = models;
                    this.refreshModelSelect();
                    // showToast(`Fetched ${models.length} models`, "success");
                    if (this.aiTestResult) {
                        this.aiTestResult.textContent = `✅ Success! Found ${models.length} models.`;
                        this.aiTestResult.style.color = "var(--success)";
                    }
                } catch {
                    // showToast("Failed to fetch models", "error");
                    if (this.aiTestResult) {
                        this.aiTestResult.textContent = "❌ Failed. Check key/console.";
                        this.aiTestResult.style.color = "var(--danger)";
                    }
                } finally {
                    this.aiRefreshModelsBtn.disabled = false;
                    this.aiRefreshModelsBtn.textContent = "Test & Load Models";
                }
            });
        }

        // Glyphsets
        const glyphsetCheckboxes = /** @type {NodeListOf<HTMLInputElement>} */ (document.querySelectorAll('.glyphset-checkbox'));
        glyphsetCheckboxes.forEach(cb => {
            cb.addEventListener('change', () => {
                const checkedBoxes = /** @type {NodeListOf<HTMLInputElement>} */ (document.querySelectorAll('.glyphset-checkbox:checked'));
                const checked = Array.from(checkedBoxes).map(el => el.value);
                AppState.updateSettings({ glyphsets: checked });
            });
        });

        // Extended Latin Glyphs
        if (this.extendedLatinGlyphs) {
            this.extendedLatinGlyphs.addEventListener('change', () => {
                AppState.updateSettings({ extendedLatinGlyphs: this.extendedLatinGlyphs.checked });
            });
        }

        // Collapsible Categories logic
        const categoryHeaders = /** @type {NodeListOf<HTMLElement>} */ (this.modal.querySelectorAll('.settings-category-header'));
        categoryHeaders.forEach(header => {
            header.addEventListener('click', () => {
            const category = /** @type {HTMLElement | null} */ (header.closest('.settings-category'));
            if (!category) return;
                const isExpanded = category.classList.contains('expanded');

                if (isExpanded) {
                    category.classList.remove('expanded');
                } else {
                    category.classList.add('expanded');
                }
            });
        });
    }

    updateAIKeyVisibility() {
        const provider = AppState.settings.ai_provider || "gemini";
        Object.keys(this.aiKeyRows).forEach(p => {
            if (this.aiKeyRows[p]) {
                this.aiKeyRows[p].style.display = (p === provider) ? "block" : "none";
            }
        });
    }

    async refreshModelSelect() {
        if (!this.aiModelSelect) return;
        const provider = AppState.settings.ai_provider || "gemini";

        // Use imported aiService
        if (!aiService || !aiService.cache) return;

        let models = aiService.cache.models[provider];
        if (!models) {
            // No models in cache...
            models = [];
            models = await aiService.fetchModels(provider, AppState.settings.ai_api_key);
            aiService.cache.models[provider] = models;
        }

        this.filterModels();
    }

    filterModels() {
        if (!this.aiModelSelect) return;
        const provider = AppState.settings.ai_provider || "gemini";
        const filterStr = (AppState.settings.ai_model_filter || "").toLowerCase();

        if (!aiService || !aiService.cache) return;
        const models = aiService.cache.models[provider] || [];

        const filtered = models.filter(m =>
            m.name.toLowerCase().includes(filterStr) ||
            m.id.toLowerCase().includes(filterStr)
        );

        this.aiModelSelect.innerHTML = "";
        filtered.forEach(m => {
            const opt = document.createElement('option');
            opt.value = m.id;
            opt.textContent = m.name;
            this.aiModelSelect.appendChild(opt);
        });

        const currentModel = AppState.settings[`ai_model_${provider}`];
        if (currentModel) {
            this.aiModelSelect.value = currentModel;
        }
    }

    applyEditorTheme(isLightMode) {
        if (isLightMode) {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        // Save preference to localStorage for persistence
        try {
            localStorage.setItem('reterminal-editor-theme', isLightMode ? 'light' : 'dark');
        } catch (e) {
            Logger.log('Could not save theme preference:', e);
        }
    }
}
