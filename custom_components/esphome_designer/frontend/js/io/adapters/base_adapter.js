export class BaseAdapter {
    constructor() {
        if (this.constructor === BaseAdapter) {
            throw new Error("BaseAdapter is abstract and cannot be instantiated directly.");
        }
    }

    /**
     * The main entry point for generating output from a layout state.
     * @param {Object} layout - The full layout state object.
     * @returns {Promise<string>} The generated output string.
     */
    async generate(layout) {
        throw new Error("Method 'generate()' must be implemented.");
    }

    /**
     * Generates output for a single page.
     * @param {Object} page - The page object from the state.
     * @param {Object} context - Shared context and utilities.
     * @returns {string[]} Array of output lines.
     */
    generatePage(page, context) {
        throw new Error("Method 'generatePage()' must be implemented.");
    }

    /**
     * Generates output for a single widget.
     * @param {Object} widget - The widget object from the state.
     * @param {Object} context - Shared context and utilities.
     * @returns {string[]} Array of output lines.
     */
    generateWidget(widget, context) {
        throw new Error("Method 'generateWidget()' must be implemented.");
    }

    /**
     * Sanitizes strings for the target output format.
     * @param {string} str - The input string.
     * @returns {string} The sanitized string.
     */
    sanitize(str) {
        return str; // Default identity, override in subclasses
    }
}

// Expose globally for now to match the project's architecture
window.BaseAdapter = BaseAdapter;
