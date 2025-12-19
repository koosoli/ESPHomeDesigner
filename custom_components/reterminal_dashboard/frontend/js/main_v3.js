
import { Sidebar } from './core/sidebar_debug.js?v=3';
import { Canvas } from './core/canvas.js?v=2';
import { PropertiesPanel } from './core/properties.js?v=2';
import { EVENTS, on } from './core/events.js?v=2';
import { generateSnippetLocally } from './io/yaml_export.js?v=2';
import { parseSnippetYamlOffline, loadLayoutIntoState } from './io/yaml_import.js?v=2';
import { fetchEntityStates, loadHaEntitiesIfNeeded, loadLayoutFromBackend, saveLayoutToBackend, importSnippetBackend } from './io/ha_api.js?v=2';
import { saveLayoutToFile, handleFileSelect } from './io/file_ops.js?v=2';
import { hasHaBackend } from './utils/env.js?v=2';
import { showToast } from './utils/dom.js?v=2';

class App {
    constructor() {
        this.sidebar = new Sidebar();
        this.canvas = new Canvas();
        this.propertiesPanel = new PropertiesPanel();

        this.init();
    }

    async init() {
        console.log("Initializing reTerminal Dashboard Designer...");
        console.log("App: Sidebar instance:", this.sidebar);

        // Initialize UI components
        try {
            const debugDiv = document.createElement('div');
            debugDiv.style.position = 'absolute';
            debugDiv.style.top = '0';
            debugDiv.style.left = '0';
            debugDiv.style.zIndex = '99999';
            debugDiv.style.background = 'red';
            debugDiv.style.color = 'white';
            debugDiv.id = 'debug-overlay';
            debugDiv.innerHTML = 'DEBUG: Starting init<br>';
            document.body.appendChild(debugDiv);

            console.log("App: Calling sidebar.init()");
            debugDiv.innerHTML += 'Calling sidebar.init()<br>';
            this.sidebar.init();
            debugDiv.innerHTML += 'sidebar.init() returned<br>';
            console.log("App: sidebar.init() returned");
        } catch (e) {
            console.error("App: Error initializing sidebar", e);
            const debugDiv = document.getElementById('debug-overlay');
            if (debugDiv) debugDiv.innerHTML += 'Error: ' + e.message + '<br>';
        }
        this.canvas.init();
        this.propertiesPanel.init();

        // Bind global buttons
        this.bindGlobalButtons();

        // Load initial data
        if (hasHaBackend()) {
            console.log("HA Backend detected. Loading layout from backend...");
            await loadLayoutFromBackend();
            await fetchEntityStates();
        } else {
            console.log("Running in standalone/offline mode.");
            // State initializes with default layout automatically
        }

        // Setup auto-save or auto-update snippet
        this.setupAutoUpdate();

        console.log("Initialization complete.");
    }

    bindGlobalButtons() {
        // Top Toolbar Buttons
        const saveLayoutBtn = document.getElementById('saveLayoutBtn');
        if (saveLayoutBtn) {
            saveLayoutBtn.addEventListener('click', async () => {
                if (hasHaBackend()) {
                    const yaml = await generateSnippetLocally();
                    saveLayoutToBackend(yaml)
                        .then(() => showToast("Layout saved to Home Assistant", "success"))
                        .catch(err => showToast(`Save failed: ${err.message}`, "error"));
                } else {
                    saveLayoutToFile();
                }
            });
        }

        const loadLayoutBtn = document.getElementById('loadLayoutBtn'); // Hidden file input
        const loadLayoutTrigger = document.getElementById('loadLayoutTrigger'); // Visible button (if any)

        // If we have a visible button to trigger file load (offline mode)
        // In the current HTML, there might not be a specific "Load File" button visible by default,
        // but let's assume we might add one or reuse an existing one.
        // For now, let's look for the file input.
        if (loadLayoutBtn) {
            loadLayoutBtn.addEventListener('change', handleFileSelect);
        }

        // Generate Snippet Button (Modal)
        const generateSnippetBtn = document.getElementById('generateSnippetBtn');
        if (generateSnippetBtn) {
            generateSnippetBtn.addEventListener('click', () => {
                this.openSnippetModal();
            });
        }

        // Import Snippet Button (Modal)
        const importSnippetBtn = document.getElementById('importSnippetBtn'); // Assuming there is one
        // Check editor.js: it uses `updateLayoutBtn` inside the snippet modal to import.
        // And `fullscreenSnippetBtn` to open the modal.

        const fullscreenSnippetBtn = document.getElementById('fullscreenSnippetBtn');
        if (fullscreenSnippetBtn) {
            fullscreenSnippetBtn.addEventListener('click', () => {
                this.openSnippetModal();
            });
        }

        // Import Modal Buttons
        const importSnippetConfirm = document.getElementById('importSnippetConfirm');
        if (importSnippetConfirm) {
            importSnippetConfirm.addEventListener('click', async () => {
                await this.handleImportSnippet();
            });
        }

        // Device Settings
        const deviceSettingsBtn = document.getElementById('deviceSettingsBtn');
        if (deviceSettingsBtn) {
            deviceSettingsBtn.addEventListener('click', () => {
                // We need to implement openDeviceSettings logic or import it
                // For now, let's assume we can move that logic here or to a settings module.
                // Since it's UI heavy, maybe `frontend/js/ui/settings_modal.js`?
                // For this iteration, I'll keep it simple and maybe just log it.
                console.log("Device settings clicked - TODO: Implement Settings Modal");
                // In a real refactor, we'd move the settings modal logic to a class.
                // Let's try to reuse the existing HTML modal if possible.
                const modal = document.getElementById('deviceSettingsModal');
                if (modal) {
                    modal.classList.remove('hidden');
                    modal.style.display = 'flex';
                    // Populate fields... (TODO)
                }
            });
        }
    }

    setupAutoUpdate() {
        // Update snippet box whenever state changes
        on(EVENTS.STATE_CHANGED, () => {
            this.updateSnippetBox();
        });

        // Initial update
        this.updateSnippetBox();
    }

    updateSnippetBox() {
        const snippetBox = document.getElementById('snippetBox');
        if (snippetBox) {
            generateSnippetLocally().then(yaml => {
                snippetBox.value = yaml;
            });
        }
    }

    openSnippetModal() {
        const modal = document.getElementById('snippetFullscreenModal');
        const content = document.getElementById('snippetFullscreenContent');
        if (modal && content) {
            generateSnippetLocally().then(yaml => {
                content.textContent = yaml;
            });
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
        }
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
            if (hasHaBackend()) {
                layout = await importSnippetBackend(yaml);
            } else {
                layout = parseSnippetYamlOffline(yaml);
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
            console.error("Import failed:", err);
            if (errorBox) errorBox.textContent = `Error: ${err.message}`;
        }
    }
}

// Start the app
// Start the app
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
