class PageSettings {
    constructor() {
        this.modal = document.getElementById('pageSettingsModal');
        this.closeBtn = document.getElementById('pageSettingsClose');
        this.saveBtn = document.getElementById('pageSettingsSave');
        this.nameInput = document.getElementById('pageSettingsName');
        this.refreshInput = document.getElementById('pageSettingsRefresh');
        this.refreshModeInput = document.getElementById('pageSettingsRefreshMode');
        this.refreshTimeInput = document.getElementById('pageSettingsRefreshTime');
        this.fieldInterval = document.getElementById('field-refresh-interval');
        this.fieldTime = document.getElementById('field-refresh-time');
        this.darkModeInput = document.getElementById('pageSettingsDarkMode');
        this.pageIndex = -1;
    }

    init() {
        if (!this.modal) return;
        if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.close());
        if (this.saveBtn) this.saveBtn.addEventListener('click', () => this.save());
        if (this.refreshModeInput) {
            this.refreshModeInput.addEventListener('change', () => this.updateVisibility());
        }
    }

    updateVisibility() {
        if (!this.refreshModeInput) return;
        const mode = this.refreshModeInput.value;
        if (this.fieldInterval) this.fieldInterval.style.display = (mode === 'interval') ? 'block' : 'none';
        if (this.fieldTime) this.fieldTime.style.display = (mode === 'daily') ? 'block' : 'none';
    }

    open(index) {
        if (!this.modal) return;
        this.pageIndex = index;
        const page = AppState.pages[index];
        if (!page) return;

        if (this.nameInput) this.nameInput.value = page.name || "";

        // Refresh Settings
        const mode = page.refresh_type || 'interval';
        if (this.refreshModeInput) this.refreshModeInput.value = mode;
        if (this.refreshInput) this.refreshInput.value = page.refresh_s || "";
        if (this.refreshTimeInput) this.refreshTimeInput.value = page.refresh_time || "08:00";

        // Dark Mode
        if (this.darkModeInput) {
            this.darkModeInput.value = page.dark_mode || "inherit";
        }

        this.updateVisibility();
        this.modal.classList.remove('hidden');
        this.modal.style.display = 'flex';
    }

    close() {
        if (this.modal) {
            this.modal.classList.add('hidden');
            this.modal.style.display = 'none';
        }
    }

    save() {
        if (this.pageIndex === -1) return;
        const page = AppState.pages[this.pageIndex];
        if (!page) return;

        const name = this.nameInput ? this.nameInput.value : page.name;
        const mode = this.refreshModeInput ? this.refreshModeInput.value : 'interval';
        const refresh = this.refreshInput ? parseInt(this.refreshInput.value, 10) : NaN;
        const time = this.refreshTimeInput ? this.refreshTimeInput.value : "08:00";
        const darkMode = this.darkModeInput ? this.darkModeInput.value : "inherit";

        page.name = name;
        page.refresh_type = mode;

        if (mode === 'interval') {
            if (!isNaN(refresh) && refresh >= 0) {
                // allow 0 for manual
                page.refresh_s = refresh;
            } else {
                delete page.refresh_s;
            }
            delete page.refresh_time;
        } else {
            // Daily
            page.refresh_time = time;
            delete page.refresh_s;
        }

        page.dark_mode = darkMode;

        AppState.setPages(AppState.pages); // Trigger update
        this.close();
    }
}
