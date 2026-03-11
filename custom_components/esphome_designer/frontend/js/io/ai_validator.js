import { registry } from '../core/plugin_registry';

export class AIValidator {
    /**
     * Validates an AI-generated widget against the plugin registry.
     * @param {any} widget 
     * @returns {{valid: boolean, errors: string[], sanitized: any}}
     */
    static validateWidget(widget) {
        const errors = [];
        if (!widget || typeof widget !== 'object') {
            return { valid: false, errors: ['Widget must be an object'], sanitized: null };
        }

        if (!widget.type) {
            return { valid: false, errors: ['Widget missing "type" field'], sanitized: null };
        }

        const plugin = registry.get(widget.type);
        if (!plugin) {
            return { valid: false, errors: [`Unknown widget type: "${widget.type}"`], sanitized: null };
        }

        const sanitized = { ...widget };
        const allowedProps = new Set([
            'id', 'type', 'x', 'y', 'width', 'height', 'z_index',
            ...Object.keys(plugin.defaults || {})
        ]);

        // Check for hallucinated properties
        for (const key of Object.keys(widget)) {
            if (!allowedProps.has(key)) {
                errors.push(`Hallucinated property "${key}" in widget type "${widget.type}"`);
                delete sanitized[key];
            }
        }

        // Check for missing required structural properties
        const required = ['id', 'x', 'y', 'width', 'height'];
        for (const req of required) {
            if (widget[req] === undefined || widget[req] === null) {
                errors.push(`Missing required property "${req}" in widget "${widget.id || 'unknown'}"`);
            }
        }

        return {
            valid: errors.length === 0,
            errors,
            sanitized
        };
    }

    /**
     * Validates an entire AI response payload.
     * @param {any} payload 
     * @returns {{valid: boolean, errors: string[], sanitized: any[]}}
     */
    static validateResponse(payload) {
        const errors = [];
        const sanitized = [];

        let widgets = [];
        if (Array.isArray(payload)) {
            widgets = payload;
        } else if (payload && typeof payload === 'object' && Array.isArray(payload.widgets)) {
            widgets = payload.widgets;
        } else {
            return { valid: false, errors: ['AI response must be an array of widgets or an object with a "widgets" array'], sanitized: [] };
        }

        for (const w of widgets) {
            const result = this.validateWidget(w);
            if (!result.valid) {
                errors.push(...result.errors);
            }
            if (result.sanitized) {
                sanitized.push(result.sanitized);
            }
        }

        return {
            valid: errors.length === 0,
            errors,
            sanitized
        };
    }

    /**
     * Applies AI changes to a cloned state and returns the diff.
     * Does NOT modify the real state.
     * @param {any[]} currentWidgets - The current widget list
     * @param {any[]} aiPayload - The AI-generated widget list (already validated/sanitized)
     * @returns {{ cloned: any[], added: any[], modified: any[], removed: string[] }}
     */
    static sandbox(currentWidgets, aiPayload) {
        // Deep clone to prevent mutation
        const cloned = JSON.parse(JSON.stringify(currentWidgets));
        const currentIds = new Set(cloned.map(w => w.id));
        const aiIds = new Set(aiPayload.map(w => w.id));

        const added = aiPayload.filter(w => !currentIds.has(w.id));
        const removed = cloned.filter(w => !aiIds.has(w.id)).map(w => w.id);
        const modified = aiPayload.filter(w => {
            if (!currentIds.has(w.id)) return false;
            const original = cloned.find(o => o.id === w.id);
            return JSON.stringify(original) !== JSON.stringify(w);
        });

        return { cloned, added, modified, removed };
    }
}
