import { describe, it, expect, beforeEach, vi } from 'vitest';

const mockUpdateWidget = vi.fn();

vi.mock('../../js/core/state', () => ({ AppState: { updateWidget: mockUpdateWidget } }));
vi.mock('../../js/core/mdi_icon_catalog.js', () => ({
    mdiIconCatalog: [
        { code: 'F0001', name: 'home' },
        { code: 'F0002', name: 'light' },
        { code: 'F0003', name: 'wifi', aliases: ['network'] }
    ]
}));

describe('icon_picker', () => {
    let openIconPickerForWidget;
    let closeIconPicker;
    const flushIconCatalog = () => new Promise(resolve => setTimeout(resolve, 0));

    beforeEach(async () => {
        vi.clearAllMocks();
        vi.resetModules();
        document.body.innerHTML = '';
        ({ openIconPickerForWidget, closeIconPicker } = await import('../../js/ui/icon_picker.js'));
    });

    it('opens modal and renders icon list', async () => {
        const input = document.createElement('input');
        openIconPickerForWidget({ id: 'w1', props: {} }, input);
        await flushIconCatalog();

        const modal = document.getElementById('iconPickerModal');
        const list = document.getElementById('iconPickerList');
        expect(modal.classList.contains('hidden')).toBe(false);
        expect(list.querySelectorAll('.icon-item').length).toBe(3);
    });

    it('filters icons through input', async () => {
        openIconPickerForWidget({ id: 'w1', props: {} }, document.createElement('input'));
        await flushIconCatalog();

        const filter = document.getElementById('iconPickerFilter');
        const list = document.getElementById('iconPickerList');

        filter.value = 'wifi';
        filter.dispatchEvent(new Event('input'));
        expect(list.querySelectorAll('.icon-item').length).toBe(1);

        filter.value = 'network';
        filter.dispatchEvent(new Event('input'));
        expect(list.querySelectorAll('.icon-item').length).toBe(1);

        filter.value = '';
        filter.dispatchEvent(new Event('input'));
        expect(list.querySelectorAll('.icon-item').length).toBe(3);

        filter.value = 'none';
        filter.dispatchEvent(new Event('input'));
        expect(list.textContent).toContain('No icons found');
    });

    it('keeps a typed filter while the catalog is still loading', async () => {
        openIconPickerForWidget({ id: 'w1', props: {} }, document.createElement('input'));

        const filter = document.getElementById('iconPickerFilter');
        const list = document.getElementById('iconPickerList');
        filter.value = 'wifi';
        filter.dispatchEvent(new Event('input'));
        await flushIconCatalog();
        await flushIconCatalog();

        expect(list.querySelectorAll('.icon-item').length).toBe(1);
    });

    it('selects icon into input and closes modal', async () => {
        const input = document.createElement('input');
        const widget = { id: 'w1', props: {} };
        openIconPickerForWidget(widget, input);
        await flushIconCatalog();

        const item = document.querySelector('.icon-item');
        item.click();

        expect(input.value).toBe('F0001');
        expect(document.getElementById('iconPickerModal').classList.contains('hidden')).toBe(true);
    });

    it('selects icon directly into widget when input is absent', async () => {
        const widget = { id: 'w2', props: {} };
        openIconPickerForWidget(widget, null);
        await flushIconCatalog();

        const items = document.querySelectorAll('.icon-item');
        items[1].click();

        expect(mockUpdateWidget).toHaveBeenCalledWith('w2', expect.objectContaining({
            props: expect.objectContaining({ code: 'F0002' })
        }));
    });

    it('reuses the loaded catalog when opened again', async () => {
        const input = document.createElement('input');
        openIconPickerForWidget({ id: 'w4', props: {} }, input);
        await flushIconCatalog();
        closeIconPicker();

        openIconPickerForWidget({ id: 'w4', props: {} }, input);
        await flushIconCatalog();

        expect(document.getElementById('iconPickerList').querySelectorAll('.icon-item').length).toBe(3);
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
