import { describe, it, expect, beforeEach, vi } from 'vitest';

const mockUpdateWidget = vi.fn();

vi.mock('../../js/core/state', () => ({ AppState: { updateWidget: mockUpdateWidget } }));
vi.mock('../../js/core/constants_icons.js', () => ({
    iconPickerData: [
        { code: 'F0001', name: 'home' },
        { code: 'F0002', name: 'light' },
        { code: 'F0003', name: 'wifi' }
    ]
}));

describe('icon_picker', () => {
    let openIconPickerForWidget;
    let closeIconPicker;

    beforeEach(async () => {
        vi.clearAllMocks();
        vi.resetModules();
        document.body.innerHTML = '';
        ({ openIconPickerForWidget, closeIconPicker } = await import('../../js/ui/icon_picker.js'));
    });

    it('opens modal and renders icon list', () => {
        const input = document.createElement('input');
        openIconPickerForWidget({ id: 'w1', props: {} }, input);

        const modal = document.getElementById('iconPickerModal');
        const list = document.getElementById('iconPickerList');
        expect(modal.classList.contains('hidden')).toBe(false);
        expect(list.querySelectorAll('.icon-item').length).toBe(3);
    });

    it('filters icons through input', () => {
        openIconPickerForWidget({ id: 'w1', props: {} }, document.createElement('input'));

        const filter = document.getElementById('iconPickerFilter');
        const list = document.getElementById('iconPickerList');

        filter.value = 'wifi';
        filter.dispatchEvent(new Event('input'));
        expect(list.querySelectorAll('.icon-item').length).toBe(1);

        filter.value = 'none';
        filter.dispatchEvent(new Event('input'));
        expect(list.textContent).toContain('No icons found');
    });

    it('selects icon into input and closes modal', () => {
        const input = document.createElement('input');
        const widget = { id: 'w1', props: {} };
        openIconPickerForWidget(widget, input);

        const item = document.querySelector('.icon-item');
        item.click();

        expect(input.value).toBe('F0001');
        expect(document.getElementById('iconPickerModal').classList.contains('hidden')).toBe(true);
    });

    it('selects icon directly into widget when input is absent', () => {
        const widget = { id: 'w2', props: {} };
        openIconPickerForWidget(widget, null);

        const items = document.querySelectorAll('.icon-item');
        items[1].click();

        expect(mockUpdateWidget).toHaveBeenCalledWith('w2', expect.objectContaining({
            props: expect.objectContaining({ code: 'F0002' })
        }));
    });

    it('closes on backdrop click and via explicit close function', () => {
        openIconPickerForWidget({ id: 'w3', props: {} }, null);
        const modal = document.getElementById('iconPickerModal');
        modal.click();
        expect(modal.classList.contains('hidden')).toBe(true);

        openIconPickerForWidget({ id: 'w3', props: {} }, null);
        closeIconPicker();
        expect(modal.classList.contains('hidden')).toBe(true);
    });
});
