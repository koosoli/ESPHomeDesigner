import { describe, it, expect, beforeEach, vi } from 'vitest';

const mockUpdateWidget = vi.fn();
const mockCreateDropShadow = vi.fn();
const mockOpenEntityPickerForWidget = vi.fn();
const mockOpenIconPickerForWidget = vi.fn();
const mockEnsureEntityDatalist = vi.fn();
const mockIsRGBDevice = vi.fn(() => true);
const mockGetAvailableColors = vi.fn(() => ['black', 'white']);

const mockAppState = {
    updateWidget: mockUpdateWidget,
    selectedWidgetIds: [],
    project: {
        pages: [
            { name: 'Main' },
            { name: 'Info' }
        ]
    },
    createDropShadow: mockCreateDropShadow
};

vi.mock('../../js/utils/helpers.js', () => ({
    debounce: vi.fn((fn) => fn),
    generateId: vi.fn(() => 'mock-id-123')
}));

vi.mock('../../js/core/state', () => ({ AppState: mockAppState }));
vi.mock('../../js/utils/device.js', () => ({
    isRGBDevice: mockIsRGBDevice,
    getAvailableColors: mockGetAvailableColors
}));
vi.mock('../../js/io/ha_api.js', () => ({
    ENTITY_DATALIST_ID: 'entity-datalist-global',
    ensureEntityDatalist: mockEnsureEntityDatalist
}));
vi.mock('../../js/ui/entity_picker.js', () => ({
    openEntityPickerForWidget: mockOpenEntityPickerForWidget
}));
vi.mock('../../js/ui/icon_picker.js', () => ({
    openIconPickerForWidget: mockOpenIconPickerForWidget
}));
vi.mock('../../js/core/constants_icons.js', () => ({
    iconPickerData: [
        { code: 'F0001', name: 'one' },
        { code: 'F0002', name: 'two' }
    ]
}));

describe('PropertyControls', () => {
    let PropertyControls;
    let controls;
    let container;
    let panel;

    beforeEach(async () => {
        document.body.innerHTML = '';
        vi.clearAllMocks();

        container = document.createElement('div');
        document.body.appendChild(container);

        panel = {
            containerStack: [],
            getContainer() {
                return this.containerStack[this.containerStack.length - 1] || container;
            },
            createSection: vi.fn(),
            endSection: vi.fn()
        };

        ({ PropertyControls } = await import('../../js/ui/components/property_controls.js'));
        controls = new PropertyControls(panel);
    });

    it('creates labeled text input and emits changes', () => {
        const onChange = vi.fn();
        controls.addLabeledInput('Title', 'text', 'hello', onChange);

        const input = container.querySelector('input.prop-input');
        input.value = 'world';
        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('change'));

        expect(onChange).toHaveBeenCalledWith('world');
        expect(container.textContent).toContain('Title');
    });

    it('creates select and checkbox controls', () => {
        const onSelect = vi.fn();
        controls.addSelect('Mode', 'a', ['a', 'b'], onSelect);
        const select = container.querySelector('select.prop-input');
        select.value = 'b';
        select.dispatchEvent(new Event('change'));
        expect(onSelect).toHaveBeenCalledWith('b');

        const onCheck = vi.fn();
        controls.addCheckbox('Enabled', true, onCheck);
        const checkbox = container.querySelector('input[type="checkbox"]');
        checkbox.checked = false;
        checkbox.dispatchEvent(new Event('change'));
        expect(onCheck).toHaveBeenCalledWith(false);
    });

    it('creates picker-backed input and icon input', () => {
        const onEntity = vi.fn();
        const widget = { id: 'w1' };
        controls.addLabeledInputWithPicker('Entity', 'text', 'sensor.a', onEntity, widget);

        expect(mockEnsureEntityDatalist).toHaveBeenCalled();
        const pickerBtn = container.querySelector('button.btn.btn-secondary');
        pickerBtn.click();
        expect(mockOpenEntityPickerForWidget).toHaveBeenCalled();

        const onIcon = vi.fn();
        controls.addIconInput('Icon', 'mdi:test', onIcon, widget);
        const iconBtns = container.querySelectorAll('button.btn.btn-secondary');
        iconBtns[iconBtns.length - 1].click();
        expect(mockOpenIconPickerForWidget).toHaveBeenCalled();
    });

    it('creates icon picker select and manual input behavior', () => {
        const onSelect = vi.fn();
        controls.addIconPicker('Icon', 'mdi:f0001', onSelect, { id: 'w2' });

        const select = container.querySelector('select.select');
        select.value = 'F0002';
        select.dispatchEvent(new Event('change'));
        expect(onSelect).toHaveBeenCalledWith('F0002');

        const inputs = container.querySelectorAll('input.prop-input');
        const manualInput = inputs[inputs.length - 1];
        manualInput.value = 'f0001';
        manualInput.dispatchEvent(new Event('input'));
        expect(onSelect).toHaveBeenCalledWith('F0001');
    });

    it('creates rgb mixer and updates from slider + hex', () => {
        const onColor = vi.fn();
        controls.addColorMixer('Color', '#112233', onColor);

        const sliders = container.querySelectorAll('input[type="range"]');
        sliders[0].value = '255';
        sliders[0].dispatchEvent(new Event('input'));
        expect(onColor).toHaveBeenCalled();

        const hexInput = container.querySelector('input[type="text"].prop-input');
        hexInput.value = '#00FF00';
        hexInput.dispatchEvent(new Event('change'));
        expect(onColor).toHaveBeenCalledWith('#00FF00');
    });

    it('routes color selector by device mode', () => {
        const onColor = vi.fn();

        mockIsRGBDevice.mockReturnValueOnce(true);
        controls.addColorSelector('Color', '#000000', null, onColor);
        expect(container.querySelectorAll('input[type="range"]').length).toBeGreaterThan(0);

        container.innerHTML = '';
        mockIsRGBDevice.mockReturnValueOnce(false);
        controls.addColorSelector('Color', 'black', ['black', 'white'], onColor);
        expect(container.querySelector('select.prop-input')).toBeTruthy();
    });

    it('creates segmented and slider-number controls', () => {
        const onSegment = vi.fn();
        controls.addSegmentedControl('Align', [
            { value: 'left', label: 'Left' },
            { value: 'right', label: 'Right' }
        ], 'left', onSegment);

        const segmentItems = container.querySelectorAll('.segment-item');
        segmentItems[1].click();
        expect(onSegment).toHaveBeenCalledWith('right');

        const onNumber = vi.fn();
        controls.addNumberWithSlider('Opacity', 30, 0, 100, onNumber);
        const slider = container.querySelector('input[type="range"]');
        slider.value = '55';
        slider.dispatchEvent(new Event('input'));
        expect(onNumber).toHaveBeenCalledWith(55);
    });

    it('supports compact rows and section label', () => {
        controls.addCompactPropertyRow(() => {
            controls.addSectionLabel('Row Header');
        });

        expect(container.querySelector('.prop-grid-2')).toBeTruthy();
        expect(container.textContent).toContain('Row Header');
    });

    it('creates LVGL common properties and updates AppState on interaction', () => {
        const widget = { id: 'w-lvgl', props: { clickable: true } };
        controls.addCommonLVGLProperties(widget, widget.props);

        const checkboxes = container.querySelectorAll('input[type="checkbox"]');
        checkboxes[0].checked = true;
        checkboxes[0].dispatchEvent(new Event('change'));

        const scrollbarSelect = container.querySelector('select.prop-input');
        scrollbarSelect.value = 'OFF';
        scrollbarSelect.dispatchEvent(new Event('change'));

        expect(panel.createSection).toHaveBeenCalled();
        expect(panel.endSection).toHaveBeenCalled();
        expect(mockUpdateWidget).toHaveBeenCalled();
    });

    it('creates visibility conditions and clear action', () => {
        const widget = { id: 'w-cond', condition_entity: '', condition_operator: '==', condition_state: '' };
        controls.addVisibilityConditions(widget);

        const clearBtn = Array.from(container.querySelectorAll('button')).find(b => b.textContent.includes('Clear Condition'));
        expect(clearBtn).toBeTruthy();
        clearBtn.click();

        expect(mockUpdateWidget).toHaveBeenCalledWith('w-cond', expect.objectContaining({
            condition_entity: '',
            condition_operator: '==',
            condition_state: ''
        }));
    });

    it('creates page selector and drop shadow button', () => {
        const onPageChange = vi.fn();
        controls.addPageSelector('Target Page', 'home', onPageChange);

        const select = container.querySelector('select.prop-input');
        expect(select.options.length).toBeGreaterThan(3);

        mockAppState.selectedWidgetIds = ['widget-x'];
        controls.addDropShadowButton(null, 'widget-x');
        const button = Array.from(container.querySelectorAll('button')).find(b => b.textContent.includes('Create Drop Shadow'));
        button.click();

        expect(mockCreateDropShadow).toHaveBeenCalledWith(['widget-x']);
    });

    it('creates icon-picker and datalist inputs with handlers', () => {
        const onIcon = vi.fn();
        const widget = { id: 'w-icon' };
        controls.addLabeledInputWithIconPicker('Icon Code', 'text', 'F0001', onIcon, widget);

        const iconBtn = Array.from(container.querySelectorAll('button')).find(b => b.title === 'Pick MDI Icon');
        iconBtn.click();
        expect(mockOpenIconPickerForWidget).toHaveBeenCalled();

        const onData = vi.fn();
        controls.addLabeledInputWithDataList('State', 'text', 'on', ['on', 'off'], onData);
        const inputs = container.querySelectorAll('input.prop-input');
        const dataInput = inputs[inputs.length - 1];
        dataInput.value = 'off';
        dataInput.dispatchEvent(new Event('input'));
        expect(onData).toHaveBeenCalledWith('off');
    });
});
