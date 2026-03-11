import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockEmit = vi.fn();
const mockShowToast = vi.fn();
const mockProcessPrompt = vi.fn();

const mockAppState = {
    settings: {
        ai_provider: 'gemini',
        ai_api_key_gemini: ''
    },
    deviceModel: 'reterminal_e1001',
    selectedWidgetId: 'w1',
    project: {
        rebuildWidgetsIndex: vi.fn()
    },
    getCurrentPage: vi.fn(() => ({
        id: 'page-1',
        widgets: [{ id: 'w1', type: 'text', props: { text: 'Hello' } }]
    })),
    getCanvasDimensions: vi.fn(() => ({ width: 800, height: 480 }))
};

vi.mock('../../js/core/state', () => ({ AppState: mockAppState }));
vi.mock('../../js/utils/logger.js', () => ({ Logger: { error: vi.fn(), log: vi.fn() } }));
vi.mock('../../js/core/events.js', () => ({
    emit: mockEmit,
    EVENTS: { STATE_CHANGED: 'STATE_CHANGED' }
}));
vi.mock('../../js/utils/dom.js', () => ({ showToast: mockShowToast }));
vi.mock('../../js/io/ai_service.js', () => ({
    aiService: {
        processPrompt: mockProcessPrompt
    }
}));
vi.mock('../../js/io/devices.js', () => ({
    DEVICE_PROFILES: {
        reterminal_e1001: {
            name: 'reTerminal',
            features: { epaper: true }
        }
    }
}));

describe('LLMPrompt', () => {
    let LLMPrompt;
    let prompt;
    let currentPage;

    function seedDom() {
        document.body.innerHTML = `
            <div id="aiPromptModal" class="modal-backdrop hidden" style="display:none;">
              <div class="modal-card">
                <button id="aiPromptClose"></button>
                <button id="aiPromptSubmit"></button>
                <button id="aiPromptApply"></button>
                <textarea id="aiPromptInput"></textarea>
                <div id="aiPromptStatus"></div>
                <div id="aiPreviewDiff" style="display:none;"></div>
                <pre id="aiDiffContent"></pre>
                <div id="aiConfigWarning" style="display:none;">
                  <button id="aiOpenEditorSettingsBtn"></button>
                </div>
              </div>
            </div>
        `;
    }

    beforeEach(async () => {
        vi.clearAllMocks();
        currentPage = {
            id: 'page-1',
            widgets: [{ id: 'w1', type: 'text', props: { text: 'Hello' } }]
        };
        mockAppState.getCurrentPage.mockReturnValue(currentPage);
        seedDom();
        ({ LLMPrompt } = await import('../../js/ui/llm_prompt.js'));
        prompt = new LLMPrompt();
    });

    it('opens the editor settings callback without relying on a window global', () => {
        const onOpenEditorSettings = vi.fn();
        prompt.onOpenEditorSettings = onOpenEditorSettings;

        prompt.init();
        prompt.open();
        document.getElementById('aiOpenEditorSettingsBtn').click();

        expect(onOpenEditorSettings).toHaveBeenCalledWith('ai');
        expect(prompt.modal.classList.contains('hidden')).toBe(true);
        expect(prompt.modal.style.display).toBe('none');
    });

    it('submits a prompt, builds a diff preview, and enables apply', async () => {
        mockAppState.settings.ai_api_key_gemini = 'token';
        mockProcessPrompt.mockResolvedValue([
            { id: 'w1', type: 'text', props: { text: 'Updated' } },
            { id: 'w2', type: 'icon', props: { icon: 'mdi:home' } }
        ]);

        prompt.init();
        prompt.open();
        prompt.input.value = 'make it better';

        await prompt.handleSubmit();

        expect(mockProcessPrompt).toHaveBeenCalledWith('make it better', expect.objectContaining({
            current_page: 'page-1',
            selected_widget_id: 'w1',
            display_type: 'monochrome'
        }));
        expect(prompt.diffPanel.style.display).toBe('block');
        expect(prompt.diffContent.textContent).toContain('[ADDED]');
        expect(prompt.status.textContent).toContain('Successfully generated changes');
        expect(prompt.applyBtn.style.display).toBe('inline-block');
        expect(prompt.submitBtn.disabled).toBe(false);
        expect(prompt.input.disabled).toBe(false);
    });

    it('applies generated widgets and emits a state change', () => {
        prompt.init();
        prompt.open();
        prompt.generatedWidgets = [
            { id: 'w1', type: 'text', props: { text: 'Updated' } }
        ];

        prompt.handleApply();

        expect(currentPage.widgets).toEqual(prompt.generatedWidgets);
        expect(mockAppState.project.rebuildWidgetsIndex).toHaveBeenCalled();
        expect(mockEmit).toHaveBeenCalledWith('STATE_CHANGED');
        expect(mockShowToast).toHaveBeenCalledWith('AI changes applied!', 'success');
        expect(prompt.modal.classList.contains('hidden')).toBe(true);
    });
});
