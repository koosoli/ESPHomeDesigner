import { describe, expect, it } from 'vitest';

import progressBarPlugin from '../../features/progress_bar/plugin.js';

function createPanelRecorder() {
    const labels = [];

    return {
        labels,
        createSection() {},
        endSection() {},
        addHint() {},
        addCheckbox(label) { labels.push(label); },
        addSelect(label) { labels.push(label); },
        addNumberWithSlider(label) { labels.push(label); },
        addColorSelector(label) { labels.push(label); },
        addCompactPropertyRow(fn) { fn(); },
        addLabeledInput(label) { labels.push(label); },
        addLabeledInputWithPicker(label) { labels.push(label); },
        addDropShadowButton() {},
        getContainer() { return {}; }
    };
}

describe('progress_bar properties regression', () => {
    it('renders a title field in the labels section', () => {
        const panel = createPanelRecorder();

        progressBarPlugin.renderProperties(panel, {
            id: 'bar_1',
            type: 'progress_bar',
            title: 'Battery',
            props: {}
        });

        expect(panel.labels).toContain('Title');
    });
});