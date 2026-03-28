import { describe, expect, it } from 'vitest';

import { BaseAdapter } from '../../js/io/adapters/base_adapter.js';

describe('BaseAdapter', () => {
    it('rejects direct instantiation and leaves abstract methods throwing by default', async () => {
        expect(() => new BaseAdapter()).toThrow('cannot be instantiated directly');

        class PartialAdapter extends BaseAdapter {}

        const adapter = new PartialAdapter();
        await expect(adapter.generate({})).rejects.toThrow("Method 'generate()' must be implemented.");
        expect(() => adapter.generatePage({}, {})).toThrow("Method 'generatePage()' must be implemented.");
        expect(() => adapter.generateWidget({}, {})).toThrow("Method 'generateWidget()' must be implemented.");
    });

    it('allows subclasses to override generation hooks while keeping sanitize as identity', async () => {
        class TestAdapter extends BaseAdapter {
            async generate(layout) {
                return `pages:${layout.pages.length}`;
            }

            generatePage(page) {
                return [`page:${page.id}`];
            }

            generateWidget(widget) {
                return [`widget:${widget.id}`];
            }
        }

        const adapter = new TestAdapter();
        await expect(adapter.generate({ pages: [{ id: 'page_1' }] })).resolves.toBe('pages:1');
        expect(adapter.generatePage({ id: 'page_1' }, {})).toEqual(['page:page_1']);
        expect(adapter.generateWidget({ id: 'widget_1' }, {})).toEqual(['widget:widget_1']);
        expect(adapter.sanitize('plain text')).toBe('plain text');
    });
});
