import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAppState } = vi.hoisted(() => ({
    mockAppState: {
        updateWidget: vi.fn(),
        selectedWidgetIds: [],
        project: {
            pages: [
                { name: 'Main' },
                { name: 'Status' }
            ]
        },
        createDropShadow: vi.fn()
    }
}));

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

import {
    addCommonLVGLProperties,
    addVisibilityConditions,
    addLVGLStateTriggerControls
} from '../../js/ui/components/property_controls_advanced.js';

describe('property_controls_advanced helpers', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = '';
    });

    it('renders common LVGL controls and updates widget props from checkbox and select changes', () => {
        const container = document.createElement('div');
        document.body.appendChild(container);

        const controls = {
            panel: {
                createSection: vi.fn(),
                endSection: vi.fn()
            },
            getContainer: () => container,
            addSelect: vi.fn((_label, _value, _options, onChange) => {
                onChange('OFF');
            })
        };

        addCommonLVGLProperties(controls, {
            id: 'widget_lvgl',
            props: {
                clickable: true
            }
        }, {
            clickable: true
        });

        const checkboxes = container.querySelectorAll('input[type="checkbox"]');
        expect(checkboxes).toHaveLength(6);
        expect(controls.panel.createSection).toHaveBeenCalledWith('Common LVGL', false);
        expect(controls.panel.endSection).toHaveBeenCalled();

        checkboxes[0].checked = true;
        checkboxes[0].dispatchEvent(new Event('change'));

        expect(mockAppState.updateWidget).toHaveBeenCalledWith('widget_lvgl', expect.objectContaining({
            props: expect.objectContaining({
                hidden: true
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('widget_lvgl', expect.objectContaining({
            props: expect.objectContaining({
                scrollbar_mode: 'OFF'
            })
        }));
    });

    it('renders visibility controls, initializes defaults, and clears conditions', () => {
        const container = document.createElement('div');
        document.body.appendChild(container);

        const controls = {
            getContainer: () => container,
            addLabeledInputWithPicker: vi.fn((_label, _type, _value, onChange) => {
                onChange('sensor.door');
            }),
            addSelect: vi.fn((_label, _value, _options, onChange) => {
                onChange('!=');
            }),
            addLabeledInputWithDataList: vi.fn((_label, _type, _value, _suggestions, onChange) => {
                onChange('open');
            }),
            addLabeledInput: vi.fn((label, _type, _value, onChange) => {
                onChange(label.includes('Min') ? '10' : '20');
            })
        };

        const widget = {
            id: 'widget_condition'
        };

        addVisibilityConditions(controls, widget);

        expect(widget.condition_entity).toBe('');
        expect(widget.condition_operator).toBe('==');
        expect(widget.condition_state).toBe('');
        expect(container.textContent).toContain('Show/hide this widget based on an entity');

        expect(mockAppState.updateWidget).toHaveBeenCalledWith('widget_condition', { condition_entity: 'sensor.door' });
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('widget_condition', { condition_operator: '!=' });
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('widget_condition', { condition_state: 'open' });
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('widget_condition', { condition_min: '10' });
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('widget_condition', { condition_max: '20' });

        const clearButton = Array.from(container.querySelectorAll('button')).find((button) => button.textContent === 'Clear Condition');
        clearButton?.click();

        expect(mockAppState.updateWidget).toHaveBeenCalledWith('widget_condition', {
            condition_entity: '',
            condition_operator: '==',
            condition_state: '',
            condition_min: '',
            condition_max: ''
        });
    });

    it('renders LVGL state trigger controls and clears the supported trigger config', () => {
        const container = document.createElement('div');
        document.body.appendChild(container);

        const controls = {
            panel: {
                createSection: vi.fn(),
                endSection: vi.fn()
            },
            getContainer: () => container,
            addLabeledInputWithPicker: vi.fn((_label, _type, _value, onChange) => {
                onChange('binary_sensor.front_door');
            }),
            addSelect: vi.fn((_label, _value, _options, onChange) => {
                onChange('on_state');
            }),
            addLabeledInput: vi.fn((_label, _type, _value, onChange) => {
                onChange('- script.execute: refresh_layout');
            })
        };

        const widget = {
            id: 'widget_state_trigger',
            props: {}
        };

        addLVGLStateTriggerControls(controls, widget);

        expect(controls.panel.createSection).toHaveBeenCalledWith('State Trigger', false);
        expect(container.textContent).toContain('supported Home Assistant trigger');
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('widget_state_trigger', expect.objectContaining({
            props: expect.objectContaining({
                state_trigger_entity: 'binary_sensor.front_door'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('widget_state_trigger', expect.objectContaining({
            props: expect.objectContaining({
                state_trigger_mode: 'on_state'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('widget_state_trigger', expect.objectContaining({
            props: expect.objectContaining({
                state_trigger_actions: '- script.execute: refresh_layout'
            })
        }));

        const clearButton = Array.from(container.querySelectorAll('button')).find((button) => button.textContent === 'Clear State Trigger');
        clearButton?.click();

        expect(mockAppState.updateWidget).toHaveBeenCalledWith('widget_state_trigger', {
            props: {
                state_trigger_entity: '',
                state_trigger_mode: 'auto',
                state_trigger_actions: ''
            }
        });
        expect(controls.panel.endSection).toHaveBeenCalled();
    });
});
