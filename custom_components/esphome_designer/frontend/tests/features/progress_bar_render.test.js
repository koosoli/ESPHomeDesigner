import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { AppState } from '../../js/core/state';
import { renderProgressBar } from '../../features/progress_bar/render.js';

describe('progress_bar render', () => {
    let originalEntityStates;

    beforeEach(() => {
        originalEntityStates = AppState.entityStates;
        AppState.entityStates = {};
        document.body.innerHTML = '';
    });

    afterEach(() => {
        AppState.entityStates = originalEntityStates;
        document.body.innerHTML = '';
    });

    it('renders horizontal bars from entity state with inverted theme-aware colors', () => {
        AppState.entityStates = {
            'sensor.battery': { state: '75%' }
        };

        const el = document.createElement('div');
        renderProgressBar(el, {
            title: 'Battery',
            entity_id: 'sensor.battery',
            props: {
                show_label: true,
                show_percentage: true,
                min: 0,
                max: 100,
                bar_height: 12,
                border_width: 2,
                color: 'theme_auto'
            }
        }, {
            getColorStyle: (value) => value,
            isDark: true
        });

        const labelRow = /** @type {HTMLDivElement} */ (el.children[0]);
        const barContainer = /** @type {HTMLDivElement} */ (el.children[1]);
        const barFill = /** @type {HTMLDivElement} */ (barContainer.firstElementChild);

        expect(labelRow.textContent).toContain('Battery');
        expect(labelRow.textContent).toContain('75%');
        expect(labelRow.style.justifyContent).toBe('space-between');
        expect(el.style.color).toBe('rgb(255, 255, 255)');
        expect(barContainer.style.backgroundColor).toBe('rgb(0, 0, 0)');
        expect(barFill.style.width).toBe('75%');
    });

    it('renders vertical bars with zero-range clamping and hidden labels', () => {
        AppState.entityStates = {
            'sensor.level': { state: '10' }
        };

        const el = document.createElement('div');
        renderProgressBar(el, {
            entity_id: 'sensor.level',
            props: {
                orientation: 'vertical',
                show_label: false,
                show_percentage: true,
                min: 10,
                max: 10,
                color: 'white',
                bar_height: 14
            }
        }, {
            getColorStyle: (value) => value,
            isDark: false
        });

        const labelRow = /** @type {HTMLDivElement} */ (el.children[0]);
        const barContainer = /** @type {HTMLDivElement} */ (el.children[1]);
        const barFill = /** @type {HTMLDivElement} */ (barContainer.firstElementChild);

        expect(el.textContent).toContain('0%');
        expect(labelRow.textContent).not.toContain('Battery');
        expect(labelRow.style.flexDirection).toBe('column');
        expect(barContainer.style.width).toBe('14px');
        expect(barContainer.style.backgroundColor).toBe('rgb(0, 0, 0)');
        expect(barFill.style.height).toBe('0%');
    });
});
