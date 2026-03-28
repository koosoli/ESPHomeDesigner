import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
    copyText,
    extractDisplayLambda,
    formatOEPLServiceYaml,
    setTemporaryButtonLabel
} from '../../js/ui/snippet_manager_clipboard.js';

describe('snippet_manager_clipboard', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    it('uses the secure clipboard API when available', async () => {
        const writeText = vi.fn().mockResolvedValue(undefined);
        vi.stubGlobal('navigator', {
            clipboard: { writeText }
        });
        Object.defineProperty(window, 'isSecureContext', {
            configurable: true,
            value: true
        });

        await copyText('copied text');

        expect(writeText).toHaveBeenCalledWith('copied text');
        expect(document.querySelector('textarea')).toBeNull();
    });

    it('falls back to execCommand copy when the secure clipboard API is unavailable', async () => {
        vi.stubGlobal('navigator', {});
        Object.defineProperty(window, 'isSecureContext', {
            configurable: true,
            value: false
        });
        Object.defineProperty(document, 'execCommand', {
            configurable: true,
            value: vi.fn(() => true)
        });

        await copyText('fallback text');

        expect(document.execCommand).toHaveBeenCalledWith('copy');
        expect(document.querySelector('textarea')).toBeNull();
    });

    it('throws when the fallback copy command is rejected', async () => {
        vi.stubGlobal('navigator', {});
        Object.defineProperty(window, 'isSecureContext', {
            configurable: true,
            value: false
        });
        Object.defineProperty(document, 'execCommand', {
            configurable: true,
            value: vi.fn(() => false)
        });

        await expect(copyText('denied')).rejects.toThrow('Copy command was rejected');
        expect(document.querySelector('textarea')).toBeNull();
    });

    it('temporarily swaps a button label and restores the original width and text', () => {
        const button = document.createElement('button');
        button.textContent = 'Copy';
        document.body.appendChild(button);
        Object.defineProperty(button, 'offsetWidth', {
            configurable: true,
            value: 82
        });

        setTemporaryButtonLabel(button, 'Copied', 500);
        expect(button.textContent).toBe('Copied');
        expect(button.style.minWidth).toBe('82px');

        vi.advanceTimersByTime(500);
        expect(button.textContent).toBe('Copy');
        expect(button.style.minWidth).toBe('');
    });

    it('extracts and de-indents the display lambda section from YAML output', () => {
        const yaml = `
esphome:
  name: demo
display:
  - platform: waveshare_epaper
    lambda: |-
      it.print(0, 0, id(font_small), "Hello");
      it.printf(10, 20, id(font_small), "%s", "World");
sensor:
  - platform: wifi_signal
`;

        expect(extractDisplayLambda(yaml)).toBe(
            'it.print(0, 0, id(font_small), "Hello");\n' +
            'it.printf(10, 20, id(font_small), "%s", "World");'
        );
    });

    it('rejects YAML outputs without a display section or with an empty lambda', () => {
        expect(() => extractDisplayLambda('sensor:\n  - platform: wifi_signal\n')).toThrow('No display section found in output');
        expect(() => extractDisplayLambda('display:\n  - platform: ssd1306\n    lambda: |-\n')).toThrow('Lambda appears to be empty');
    });

    it('formats OEPL service YAML with defaults and caller overrides', () => {
        const serviceData = {
            service: 'open_epaper_link.drawcustom',
            target: {},
            data: {
                background: 'white',
                rotate: 0,
                ttl: 120,
                payload: {
                    lines: [{ text: 'Hello' }]
                }
            }
        };

        const formatted = formatOEPLServiceYaml(serviceData, {
            oeplEntityId: 'open_epaper_link.1234567890abcdef',
            oeplDither: 1
        });

        expect(serviceData.target.entity_id).toBe('open_epaper_link.1234567890abcdef');
        expect(serviceData.data.dither).toBe(1);
        expect(formatted).toContain('service: open_epaper_link.drawcustom');
        expect(formatted).toContain('entity_id: open_epaper_link.1234567890abcdef');
        expect(formatted).toContain('dither: 1');
        expect(formatted).toContain('"text":"Hello"');
    });
});
