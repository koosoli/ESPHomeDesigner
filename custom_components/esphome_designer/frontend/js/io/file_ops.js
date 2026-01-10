import { AppState } from '../core/state.js';
import { loadLayoutIntoState } from './yaml_import.js';
import { Logger } from '../utils/logger.js';

/**
 * Saves the current layout state to a local JSON file.
 */
export function saveLayoutToFile() {
    // AppState is now imported
    const payload = AppState.getPagesPayload();
    const jsonStr = JSON.stringify(payload, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `reterminal_layout_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * Loads a layout from a local JSON file.
 * @param {File} file - The file object selected by the user.
 */
export function loadLayoutFromFile(file) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const content = e.target.result;
            const layout = JSON.parse(content);
            loadLayoutIntoState(layout);
        } catch (err) {
            Logger.error("Failed to parse layout file:", err);
            alert("Error parsing layout file. Please ensure it is a valid JSON file.");
        }
    };
    reader.readAsText(file);
}

/**
 * Triggered when the hidden file input changes.
 * @param {Event} event 
 */
export function handleFileSelect(event) {
    const file = event.target.files[0];
    loadLayoutFromFile(file);
    // Reset input so the same file can be selected again if needed
    event.target.value = '';
}
