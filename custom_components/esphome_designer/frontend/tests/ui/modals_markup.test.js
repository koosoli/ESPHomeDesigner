/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest';

import modalsHtml from '../../js/ui/components/modals.html?raw';

describe('settings modal markup', () => {
    it('keeps password inputs inside real forms to avoid browser warnings', () => {
        const container = document.createElement('div');
        container.innerHTML = modalsHtml;

        const haToken = container.querySelector('#haLlatToken');
        const geminiKey = container.querySelector('#aiApiKeyGemini');
        const openaiKey = container.querySelector('#aiApiKeyOpenai');
        const openrouterKey = container.querySelector('#aiApiKeyOpenrouter');
        const haManualUrl = container.querySelector('#haManualUrl');
        const aiModelFilter = container.querySelector('#aiModelFilter');
        const haUsername = container.querySelector('#editorHaSettingsForm input[autocomplete="username"]');
        const aiUsername = container.querySelector('#editorAiSettingsForm input[autocomplete="username"]');

        expect(haToken?.closest('form')?.id).toBe('editorHaSettingsForm');
        expect(geminiKey?.closest('form')?.id).toBe('editorAiSettingsForm');
        expect(openaiKey?.closest('form')?.id).toBe('editorAiSettingsForm');
        expect(openrouterKey?.closest('form')?.id).toBe('editorAiSettingsForm');
        expect(haUsername).not.toBeNull();
        expect(aiUsername).not.toBeNull();
        expect(haToken?.closest('form')?.getAttribute('autocomplete')).toBeNull();
        expect(geminiKey?.closest('form')?.getAttribute('autocomplete')).toBeNull();
        expect(haManualUrl?.getAttribute('autocomplete')).toBe('url');
        expect(haToken?.getAttribute('autocomplete')).toBe('current-password');
        expect(geminiKey?.getAttribute('autocomplete')).toBe('new-password');
        expect(openaiKey?.getAttribute('autocomplete')).toBe('new-password');
        expect(openrouterKey?.getAttribute('autocomplete')).toBe('new-password');
        expect(aiModelFilter?.getAttribute('autocomplete')).toBe('off');
    });
});
