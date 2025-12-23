class EditorSettings {
    constructor() {
        this.modal = document.getElementById('editorSettingsModal');
        this.closeBtn = document.getElementById('editorSettingsClose');
        this.doneBtn = document.getElementById('editorSettingsDone');

        // Inputs
        this.snapToGrid = document.getElementById('editorSnapToGrid');
        this.showGrid = document.getElementById('editorShowGrid');
        this.lightMode = document.getElementById('editorLightMode');
        this.refreshEntitiesBtn = document.getElementById('editorRefreshEntities');
        this.entityCountLabel = document.getElementById('editorEntityCount');
        this.gridOpacity = document.getElementById('editorGridOpacity');

        // HA Connection
        this.haManualUrl = document.getElementById('haManualUrl');
        this.haLlatToken = document.getElementById('haLlatToken');
        this.testHaBtn = document.getElementById('editorTestHaBtn');
        this.haTestResult = document.getElementById('haTestResult');
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

        // Grid Opacity
        if (this.gridOpacity) {
            this.gridOpacity.value = settings.grid_opacity !== undefined ? settings.grid_opacity : 20;
        }

        // HA Connection
        if (this.haManualUrl) this.haManualUrl.value = getHaManualUrl() || "";
        if (this.haLlatToken) this.haLlatToken.value = getHaToken() || "";
        if (this.haTestResult) this.haTestResult.textContent = "";

        // Dynamically show current origin for CORS tip
        const originPlaceholder = document.getElementById('haOriginPlaceholder');
        if (originPlaceholder) {
            originPlaceholder.textContent = window.location.origin;
        }

        // Entity Count
        this.updateEntityCount();

        this.modal.classList.remove('hidden');
        this.modal.style.display = 'flex';
        console.log("Editor Settings opened");
    }

    close() {
        if (this.modal) {
            this.modal.classList.add('hidden');
            this.modal.style.display = 'none';
        }
    }

    updateEntityCount() {
        if (this.entityCountLabel && window.entityStatesCache) {
            const count = Object.keys(window.entityStatesCache).length;
            this.entityCountLabel.textContent = `${count} entities cached`;
        }
    }

    setupListeners() {
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
                const gridEl = document.querySelector('.canvas-grid');
                if (gridEl) {
                    gridEl.style.display = this.showGrid.checked ? 'block' : 'none';
                }
            });
        }

        // Light Mode
        if (this.lightMode) {
            this.lightMode.addEventListener('change', () => {
                const isLight = this.lightMode.checked;
                AppState.settings.editor_light_mode = isLight;
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

                if (window.fetchEntityStates) {
                    await window.fetchEntityStates();
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
                } catch (e) {
                    this.haTestResult.innerHTML = "❌ Connection Error.<br>Check browser console.";
                    this.haTestResult.style.color = "var(--danger)";
                } finally {
                    this.testHaBtn.disabled = false;
                }
            });
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
            console.log('Could not save theme preference:', e);
        }
    }
}
