import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAppState, mockGetAvailableColors } = vi.hoisted(() => ({
    mockAppState: {
        updateWidget: vi.fn(),
        getCurrentPage: vi.fn()
    },
    mockGetAvailableColors: vi.fn(() => ['black', 'white', 'blue'])
}));

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/utils/device.js', () => ({
    getAvailableColors: mockGetAvailableColors
}));

import { SchemaRenderer } from '../../js/core/properties/schema_renderer.js';

function createPanel() {
    return {
        hints: [],
        createSection: vi.fn(),
        endSection: vi.fn(),
        addHint: vi.fn((hint) => {
            panel.hints.push(hint);
        }),
        addLabeledInput: vi.fn((label, _type, _value, onChange) => {
            if (label === 'Width') onChange('not-a-number');
            else if (label === 'Corner Radius') onChange('8');
        }),
        addColorSelector: vi.fn((_label, _value, _colors, onChange) => onChange('blue')),
        addSelect: vi.fn((label, _value, options, onChange) => {
            const choice = label === 'Dynamic'
                ? options[options.length - 1]
                : options[0];
            onChange(typeof choice === 'object' ? choice.value : choice);
        }),
        addCheckbox: vi.fn((_label, _value, onChange) => onChange(true)),
        addLabeledInputWithIconPicker: vi.fn((_label, _type, _value, onChange) => onChange('F0001')),
        addLabeledInputWithPicker: vi.fn((_label, _type, _value, onChange) => onChange('sensor.demo')),
        addDropShadowButton: vi.fn(),
        getContainer() {
            return document.body;
        }
    };
}

let panel;

describe('SchemaRenderer', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = '';
        panel = createPanel();
    });

    it('renders schema fields, updates root and prop targets, and syncs shadow radius', () => {
        const widget = {
            id: 'main_widget',
            type: 'shape_rect',
            x: 10,
            y: 20,
            width: 100,
            height: 40,
            props: {
                name: 'Card',
                mode: 'full'
            }
        };

        mockAppState.getCurrentPage.mockReturnValue({
            widgets: [
                {
                    id: 'shadow_widget',
                    type: 'shape_rect',
                    x: 15,
                    y: 25,
                    width: 100,
                    height: 40,
                    props: { name: 'Card Shadow' }
                }
            ]
        });

        const schema = [
            {
                section: 'General',
                fields: [
                    { type: 'number', label: 'Width', key: 'width', target: 'root', default: 10 },
                    { type: 'number', label: 'Corner Radius', key: 'border_radius', default: 0 },
                    { type: 'color', label: 'Color', key: 'color', default: 'black' },
                    { type: 'select', label: 'Mode', key: 'mode', options: ['compact', 'full'], default: 'compact' },
                    {
                        type: 'select',
                        label: 'Dynamic',
                        key: 'dynamic',
                        dynamicOptions: (props) => props.mode === 'full' ? ['a', 'b'] : ['z'],
                        default: 'a'
                    },
                    { type: 'checkbox', label: 'Enabled', key: 'enabled', default: false },
                    { type: 'icon_picker', label: 'Icon', key: 'icon', default: '' },
                    { type: 'entity_picker', label: 'Entity', key: 'entity_id', default: '' },
                    { type: 'hint', label: 'Helpful schema hint' },
                    { type: 'drop_shadow_button', label: 'Shadow' }
                ]
            }
        ];

        SchemaRenderer.render(panel, widget, schema);

        expect(mockGetAvailableColors).toHaveBeenCalled();
        expect(panel.createSection).toHaveBeenCalledWith('General', true);
        expect(panel.endSection).toHaveBeenCalledTimes(1);
        expect(panel.addDropShadowButton).toHaveBeenCalledWith(panel.getContainer(), 'main_widget');

        expect(mockAppState.updateWidget).toHaveBeenCalledWith('main_widget', { width: 10 });
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('main_widget', expect.objectContaining({
            props: expect.objectContaining({
                border_radius: 8
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('shadow_widget', {
            type: 'rounded_rect',
            props: { name: 'Card Shadow', radius: 8 }
        });
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('main_widget', expect.objectContaining({
            props: expect.objectContaining({
                color: 'blue'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('main_widget', expect.objectContaining({
            props: expect.objectContaining({
                mode: 'compact'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('main_widget', expect.objectContaining({
            props: expect.objectContaining({
                dynamic: 'b'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('main_widget', expect.objectContaining({
            props: expect.objectContaining({
                enabled: true
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('main_widget', expect.objectContaining({
            props: expect.objectContaining({
                icon: 'F0001'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('main_widget', expect.objectContaining({
            props: expect.objectContaining({
                entity_id: 'sensor.demo'
            })
        }));
    });
});
