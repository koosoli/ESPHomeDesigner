import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { mockEmit } = vi.hoisted(() => ({
    mockEmit: vi.fn()
}));

let backendEnabled = false;

vi.mock('../../js/core/events.js', () => ({
    emit: mockEmit,
    EVENTS: {
        STATE_CHANGED: 'state-changed'
    }
}));

vi.mock('../../js/utils/env.js', () => ({
    hasHaBackend: () => backendEnabled
}));

async function loadModule() {
    vi.resetModules();
    return await import('../../features/quote_rss/render.js');
}

describe('quote_rss render', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.clearAllMocks();
        backendEnabled = false;
        document.body.innerHTML = '';
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    it('renders deterministic offline sample quotes and marks the feed as offline', async () => {
        const { render } = await loadModule();
        const el = document.createElement('div');

        render(el, {
            id: 'quote_1',
            props: {
                item_count: 2,
                feed_url: 'https://quotes.example/rss',
                show_author: true,
                italic_quote: false,
                word_wrap: false,
                text_align: 'CENTER',
                border_width: 1,
                border_color: 'black',
                bg_color: 'white'
            }
        }, {
            getColorStyle: (value) => value || '#000000'
        });

        expect(el.style.border).toContain('1px solid');
        expect(el.style.backgroundColor).toBe('white');
        expect(el.textContent).toContain('OFFLINE - quotes.example');
        expect(el.querySelectorAll('div').length).toBeGreaterThan(2);
        expect(el.textContent).toMatch(/Steve Jobs|Albert Einstein|John Lennon|Eleanor Roosevelt|Winston Churchill|Oscar Wilde|Mahatma Gandhi/);
    });

    it('fetches live quotes, caches them, and emits a state-change refresh', async () => {
        backendEnabled = true;
        const fetchMock = vi.fn().mockResolvedValue({
            json: vi.fn().mockResolvedValue({
                success: true,
                quotes: [
                    { quote: 'Stay focused', author: 'Ada' },
                    { quote: 'Ship it', author: 'Grace' }
                ]
            })
        });
        vi.stubGlobal('fetch', fetchMock);

        const { render } = await loadModule();
        const widget = {
            id: 'quote_2',
            props: {
                item_count: 2,
                feed_url: 'https://quotes.example/rss',
                random: true
            }
        };

        const first = document.createElement('div');
        render(first, widget, {
            getColorStyle: (value) => value || '#000000'
        });

        await vi.advanceTimersByTimeAsync(500);
        await Promise.resolve();

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock.mock.calls[0][0]).toContain('/api/esphome_designer/rss_proxy?');
        expect(fetchMock.mock.calls[0][0]).toContain('count=2');
        expect(fetchMock.mock.calls[0][0]).toContain('random=true');
        expect(mockEmit).toHaveBeenCalledWith('state-changed');

        const second = document.createElement('div');
        render(second, widget, {
            getColorStyle: (value) => value || '#000000'
        });

        expect(second.textContent).toContain('Stay focused');
        expect(second.textContent).toContain('Grace');
        expect(second.textContent).toContain('quotes.example');
        expect(second.textContent).not.toContain('OFFLINE');
    });
});
