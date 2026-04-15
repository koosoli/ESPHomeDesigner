import { beforeEach, describe, expect, it, vi } from 'vitest';

const {
    mockLogger,
    mockAppState,
    mockAIValidator
} = vi.hoisted(() => ({
    mockLogger: {
        log: vi.fn(),
        warn: vi.fn(),
        error: vi.fn()
    },
    mockAppState: {
        settings: {},
        updateSettings: vi.fn(),
        getCanvasDimensions: vi.fn(() => ({ width: 320, height: 240 }))
    },
    mockAIValidator: {
        validateResponse: vi.fn()
    }
}));

vi.mock('../../js/utils/logger.js', () => ({
    Logger: mockLogger
}));

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/io/ai_validator', () => ({
    AIValidator: mockAIValidator
}));

import { AIService } from '../../js/io/ai_service.js';

describe('ai_service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.stubGlobal('fetch', vi.fn());
        mockAppState.settings = {};
    });

    it('maps model lists for OpenRouter, OpenAI, and Gemini providers', async () => {
        const service = new AIService();

        fetch
            .mockResolvedValueOnce({
                json: vi.fn().mockResolvedValue({
                    data: [{ id: 'openrouter/fast', name: 'Fast Model', context_length: 8192 }]
                })
            })
            .mockResolvedValueOnce({
                json: vi.fn().mockResolvedValue({
                    data: [{ id: 'gpt-4o' }, { id: 'text-embedding-3-small' }]
                })
            })
            .mockResolvedValueOnce({
                json: vi.fn().mockResolvedValue({
                    models: [
                        {
                            name: 'models/gemini-1.5-flash',
                            displayName: 'Gemini 1.5 Flash',
                            description: 'Fast',
                            supportedGenerationMethods: ['generateContent']
                        },
                        {
                            name: 'models/embedding-001',
                            supportedGenerationMethods: ['embedContent']
                        }
                    ]
                })
            });

        await expect(service.fetchModels('openrouter', 'router-key')).resolves.toEqual([
            { id: 'openrouter/fast', name: 'Fast Model', context: 8192 }
        ]);
        await expect(service.fetchModels('openai', 'openai-key')).resolves.toEqual([
            { id: 'gpt-4o', name: 'gpt-4o' }
        ]);
        await expect(service.fetchModels('gemini', 'gemini-key')).resolves.toEqual([
            {
                id: 'gemini-1.5-flash',
                name: 'Gemini 1.5 Flash',
                description: 'Fast'
            }
        ]);
        await expect(service.fetchModels('gemini', '')).resolves.toEqual([]);
    });

    it('builds provider-specific request payloads for Gemini, OpenAI, and OpenRouter', async () => {
        const service = new AIService();

        fetch
            .mockResolvedValueOnce({
                status: 200,
                json: vi.fn().mockResolvedValue({
                    candidates: [{ content: { parts: [{ text: '{"widgets":[]}' }] } }]
                })
            })
            .mockResolvedValueOnce({
                json: vi.fn().mockResolvedValue({
                    choices: [{ message: { content: '{"widgets":[]}' } }]
                })
            })
            .mockResolvedValueOnce({
                json: vi.fn().mockResolvedValue({
                    choices: [{ message: { content: '{"widgets":[]}' } }]
                })
            })
            .mockResolvedValueOnce({
                json: vi.fn().mockResolvedValue({
                    choices: [{ message: { content: '{"widgets":[]}' } }]
                })
            });

        await expect(service.callGemini('gem-key', 'gemini-1.5-flash', 'system', 'user')).resolves.toBe('{"widgets":[]}');
        const geminiBody = JSON.parse(fetch.mock.calls[0][1].body);
        expect(geminiBody.generationConfig.responseMimeType).toBe('application/json');

        await expect(service.callOpenAI('openai-key', 'gpt-5-mini', 'system', 'user')).resolves.toBe('{"widgets":[]}');
        const gpt5Body = JSON.parse(fetch.mock.calls[1][1].body);
        expect(gpt5Body.response_format.type).toBe('json_schema');
        expect(gpt5Body.max_completion_tokens).toBe(8192);
        expect(gpt5Body.max_tokens).toBeUndefined();

        await expect(service.callOpenAI('openai-key', 'gpt-4o', 'system', 'user')).resolves.toBe('{"widgets":[]}');
        const gpt4Body = JSON.parse(fetch.mock.calls[2][1].body);
        expect(gpt4Body.response_format.type).toBe('json_object');
        expect(gpt4Body.max_tokens).toBe(8192);
        expect(gpt4Body.max_completion_tokens).toBeUndefined();

        await expect(service.callOpenRouter('router-key', 'openrouter/model', 'system', 'user')).resolves.toBe('{"widgets":[]}');
        const routerBody = JSON.parse(fetch.mock.calls[3][1].body);
        expect(routerBody.model).toBe('openrouter/model');
    });

    it('throws a specific Gemini rate-limit error when the API returns 429', async () => {
        const service = new AIService();

        fetch.mockResolvedValueOnce({
            status: 429,
            json: vi.fn().mockResolvedValue({})
        });

        await expect(service.callGemini('gem-key', 'gemini-1.5-flash', 'system', 'user')).rejects.toThrow('Rate Limit');
    });

    it('auto-detects a Gemini model, strips fenced JSON, and returns validated widgets', async () => {
        const service = new AIService();
        mockAppState.settings = {
            ai_provider: 'gemini',
            ai_api_key_gemini: 'secret-key',
            ai_model_gemini: ''
        };
        mockAIValidator.validateResponse.mockReturnValue({
            valid: true,
            errors: [],
            sanitized: [{ id: 'w_1', type: 'text' }]
        });
        service.fetchModels = vi.fn().mockResolvedValue([
            { id: 'gemini-1.5-flash', name: 'Flash' }
        ]);
        service.callGemini = vi.fn().mockResolvedValue('```json\n{"widgets":[{"id":"w_1","type":"text"}]}\n```');

        const result = await service.processPrompt('Add a status label', {
            display_type: 'monochrome',
            widgets: [{ id: 'w_old', type: 'text', x: 1, y: 2, width: 3, height: 4, runtime_only: true }]
        });

        expect(service.fetchModels).toHaveBeenCalledWith('gemini', 'secret-key');
        expect(mockAppState.updateSettings).toHaveBeenCalledWith({ ai_model_gemini: 'gemini-1.5-flash' });
        expect(service.callGemini).toHaveBeenCalledWith(
            'secret-key',
            'gemini-1.5-flash',
            expect.any(String),
            expect.stringContaining('"widgets"')
        );
        expect(mockAIValidator.validateResponse).toHaveBeenCalledWith({
            widgets: [{ id: 'w_1', type: 'text' }]
        });
        expect(result).toEqual([{ id: 'w_1', type: 'text' }]);
    });

    it('falls back to the default Gemini model and repairs malformed JSON when auto-detection fails', async () => {
        const service = new AIService();
        mockAppState.settings = {
            ai_provider: 'gemini',
            ai_api_key_gemini: 'secret-key',
            ai_model_gemini: ''
        };
        mockAIValidator.validateResponse.mockReturnValue({
            valid: false,
            errors: ['Minor issue'],
            sanitized: [{ id: 'w_2', type: 'text' }]
        });
        service.fetchModels = vi.fn().mockRejectedValue(new Error('bad key'));
        service.callGemini = vi.fn().mockResolvedValue('{"widgets":[{"id":"w_2","type":"text","x":1,"y":2,"width":3,"height":4}');

        const result = await service.processPrompt('Repair this payload', {
            display_type: 'monochrome',
            widgets: []
        });

        expect(mockLogger.error).toHaveBeenCalledWith('Auto-detection failed:', expect.any(Error));
        expect(service.callGemini).toHaveBeenCalledWith(
            'secret-key',
            'gemini-2.0-flash',
            expect.any(String),
            expect.any(String)
        );
        expect(result).toEqual([{ id: 'w_2', type: 'text' }]);
    });
});
