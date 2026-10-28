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

    it('returns static model lists for MiniMax and GLM without requiring an API key', async () => {
        const service = new AIService();

        const minimax = await service.fetchModels('minimax', '');
        expect(minimax.length).toBeGreaterThan(0);
        expect(minimax[0].id).toContain('MiniMax');

        const glm = await service.fetchModels('glm', '');
        expect(glm.length).toBeGreaterThan(0);
        expect(glm[0].id).toContain('glm');
        expect(fetch).not.toHaveBeenCalled();
    });

    it('builds provider-specific request payloads for MiniMax and GLM', async () => {
        const service = new AIService();

        fetch
            .mockResolvedValueOnce({
                json: vi.fn().mockResolvedValue({
                    choices: [{ message: { content: '<think>reasoning</think>{"widgets":[]}' } }]
                })
            })
            .mockResolvedValueOnce({
                json: vi.fn().mockResolvedValue({
                    choices: [{ message: { content: '{"widgets":[]}' } }]
                })
            });

        await expect(service.callMiniMax('minimax-key', 'MiniMax-M2.7-highspeed', 'system', 'user')).resolves.toBe('{"widgets":[]}');
        expect(fetch.mock.calls[0][0]).toBe('https://api.minimax.io/v1/chat/completions');
        const minimaxBody = JSON.parse(fetch.mock.calls[0][1].body);
        expect(minimaxBody.model).toBe('MiniMax-M2.7-highspeed');
        expect(fetch.mock.calls[0][1].headers.Authorization).toBe('Bearer minimax-key');

        await expect(service.callGLM('glm-key', 'glm-4.6', 'system', 'user')).resolves.toBe('{"widgets":[]}');
        expect(fetch.mock.calls[1][0]).toBe('https://api.z.ai/api/paas/v4/chat/completions');
        const glmBody = JSON.parse(fetch.mock.calls[1][1].body);
        expect(glmBody.model).toBe('glm-4.6');
    });

    it('surfaces MiniMax base_resp errors', async () => {
        const service = new AIService();

        fetch.mockResolvedValueOnce({
            json: vi.fn().mockResolvedValue({
                base_resp: { status_code: 1004, status_msg: 'invalid api key' }
            })
        });

        await expect(service.callMiniMax('bad-key', 'MiniMax-M2.7', 'system', 'user')).rejects.toThrow('invalid api key');
    });

    it('maps Requesty model lists from managed policies and falls back to the full catalog', async () => {
        const service = new AIService();

        fetch
            .mockResolvedValueOnce({
                ok: true,
                json: vi.fn().mockResolvedValue({
                    data: [
                        { id: 'gpt-5.4-mini', api: 'chat', context_window: 400000 },
                        { id: 'text-embedding-3-small', api: 'embedding', context_window: 8192 }
                    ]
                })
            })
            .mockResolvedValueOnce({ ok: false })
            .mockResolvedValueOnce({
                ok: true,
                json: vi.fn().mockResolvedValue({
                    data: [{ id: 'openai/gpt-4o-mini', api: 'chat', context_window: 128000 }]
                })
            });

        await expect(service.fetchModels('requesty', 'requesty-key')).resolves.toEqual([
            { id: 'gpt-5.4-mini', name: 'gpt-5.4-mini', context: 400000 }
        ]);
        expect(fetch.mock.calls[0][0]).toBe('https://router.requesty.ai/v1/models/managed');
        expect(fetch.mock.calls[0][1].headers.Authorization).toBe('Bearer requesty-key');

        await expect(service.fetchModels('requesty', 'requesty-key')).resolves.toEqual([
            { id: 'openai/gpt-4o-mini', name: 'openai/gpt-4o-mini', context: 128000 }
        ]);
        expect(fetch.mock.calls[2][0]).toBe('https://router.requesty.ai/v1/models');
        await expect(service.fetchModels('requesty', '')).resolves.toEqual([]);
    });

    it('dispatches Requesty prompts to the Requesty chat completions endpoint', async () => {
        const service = new AIService();
        mockAppState.settings = {
            ai_provider: 'requesty',
            ai_api_key_requesty: 'requesty-key',
            ai_model_requesty: 'openai/gpt-4o-mini'
        };
        mockAIValidator.validateResponse.mockReturnValue({
            valid: true,
            errors: [],
            sanitized: [{ id: 'w_1', type: 'text' }]
        });
        fetch.mockResolvedValueOnce({
            json: vi.fn().mockResolvedValue({
                choices: [{ message: { content: '{"widgets":[{"id":"w_1","type":"text"}]}' } }]
            })
        });

        const result = await service.processPrompt('Add a label', {
            display_type: 'color_lcd',
            widgets: []
        });

        expect(fetch.mock.calls[0][0]).toBe('https://router.requesty.ai/v1/chat/completions');
        expect(fetch.mock.calls[0][1].headers.Authorization).toBe('Bearer requesty-key');
        expect(JSON.parse(fetch.mock.calls[0][1].body).model).toBe('openai/gpt-4o-mini');
        expect(result).toEqual([{ id: 'w_1', type: 'text' }]);
    });

    describe('LiteLLM proxy', () => {
        const jsonResponse = (body, init = {}) => ({
            ok: init.ok ?? true,
            status: init.status ?? 200,
            json: vi.fn().mockResolvedValue(body)
        });
        const validWidgets = () => mockAIValidator.validateResponse.mockReturnValue({
            valid: true,
            errors: [],
            sanitized: [{ id: 'w_1', type: 'text' }]
        });

        it('discovers chat models from /model/info and skips other modes, wildcards and duplicates', async () => {
            const service = new AIService();
            mockAppState.settings = { ai_base_url_litellm: 'http://proxy.local:4000/v1/' };
            fetch.mockResolvedValueOnce(jsonResponse({
                data: [
                    { model_name: 'gpt-4.1-mini', model_info: { mode: 'chat', max_input_tokens: 1047576 } },
                    { model_name: 'gpt-4.1-mini', model_info: { mode: 'chat', max_input_tokens: 1047576 } },
                    { model_name: 'claude-sonnet', model_info: { mode: 'chat', max_input_tokens: 200000 } },
                    { model_name: 'my-vllm', model_info: { mode: null } },
                    { model_name: 'emb-small', model_info: { mode: 'embedding' } },
                    { model_name: 'gemini-2.5-flash-image', model_info: { mode: 'image_generation' } },
                    { model_name: 'anthropic/*', model_info: { mode: 'chat' } }
                ]
            }));

            await expect(service.fetchModels('litellm', 'sk-virtual')).resolves.toEqual([
                { id: 'gpt-4.1-mini', name: 'gpt-4.1-mini', context: 1047576 },
                { id: 'claude-sonnet', name: 'claude-sonnet', context: 200000 },
                { id: 'my-vllm', name: 'my-vllm', context: undefined }
            ]);
            expect(fetch.mock.calls[0][0]).toBe('http://proxy.local:4000/model/info');
            expect(fetch.mock.calls[0][1].headers.Authorization).toBe('Bearer sk-virtual');
        });

        it('falls back to /v1/models and sends no Authorization header to a keyless proxy', async () => {
            const service = new AIService();
            mockAppState.settings = { ai_base_url_litellm: 'http://proxy.local:4000' };
            fetch
                .mockResolvedValueOnce(jsonResponse({}, { ok: false, status: 404 }))
                .mockResolvedValueOnce(jsonResponse({ data: [{ id: 'gpt-4.1-mini' }, { id: 'openai/*' }] }));

            await expect(service.fetchModels('litellm', '')).resolves.toEqual([
                { id: 'gpt-4.1-mini', name: 'gpt-4.1-mini' }
            ]);
            expect(fetch.mock.calls[1][0]).toBe('http://proxy.local:4000/v1/models');
            expect(fetch.mock.calls[0][1].headers.Authorization).toBeUndefined();
            expect(fetch.mock.calls[1][1].headers.Authorization).toBeUndefined();
        });

        it('surfaces the proxy error message when models cannot be listed', async () => {
            const service = new AIService();
            mockAppState.settings = { ai_base_url_litellm: 'http://proxy.local:4000' };
            const authError = { error: { message: 'Authentication Error, Invalid proxy server token passed.' } };
            fetch
                .mockResolvedValueOnce(jsonResponse(authError, { ok: false, status: 401 }))
                .mockResolvedValueOnce(jsonResponse(authError, { ok: false, status: 401 }));

            await expect(service.fetchModels('litellm', 'sk-wrong')).rejects.toThrow(
                'LiteLLM proxy error: Authentication Error, Invalid proxy server token passed.'
            );
        });

        it('explains an unreachable proxy instead of a bare network error', async () => {
            const service = new AIService();
            mockAppState.settings = { ai_base_url_litellm: 'http://proxy.local:4000' };
            fetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));

            await expect(service.fetchModels('litellm', '')).rejects.toThrow(
                'Could not reach the LiteLLM proxy at http://proxy.local:4000. Check the URL and that the proxy allows requests from this page (CORS).'
            );
        });

        it('lists nothing until a proxy URL is configured', async () => {
            const service = new AIService();

            await expect(service.fetchModels('litellm', 'sk-virtual')).resolves.toEqual([]);
            expect(fetch).not.toHaveBeenCalled();
        });

        it('sends prompts to the proxy with JSON mode and drop_params, without requiring a key', async () => {
            const service = new AIService();
            mockAppState.settings = {
                ai_provider: 'litellm',
                ai_base_url_litellm: 'http://proxy.local:4000/v1',
                ai_model_litellm: 'claude-sonnet'
            };
            validWidgets();
            fetch.mockResolvedValueOnce(jsonResponse({
                choices: [{ message: { content: '{"widgets":[{"id":"w_1","type":"text"}]}' } }]
            }));

            const result = await service.processPrompt('Add a label', { display_type: 'color_lcd', widgets: [] });

            expect(result).toEqual([{ id: 'w_1', type: 'text' }]);
            const [url, init] = fetch.mock.calls[0];
            expect(url).toBe('http://proxy.local:4000/v1/chat/completions');
            expect(init.method).toBe('POST');
            expect(init.headers.Authorization).toBeUndefined();
            const body = JSON.parse(init.body);
            expect(body).toMatchObject({
                model: 'claude-sonnet',
                temperature: 0.1,
                max_tokens: 8192,
                response_format: { type: 'json_object' },
                drop_params: true
            });
            expect(body.messages.map((m) => m.role)).toEqual(['system', 'user']);
        });

        it('forwards a configured key and surfaces proxy errors from completions', async () => {
            const service = new AIService();
            mockAppState.settings = {
                ai_provider: 'litellm',
                ai_base_url_litellm: 'http://proxy.local:4000',
                ai_api_key_litellm: 'sk-virtual',
                ai_model_litellm: 'gpt-4.1-mini'
            };
            fetch.mockResolvedValueOnce(jsonResponse(
                { error: { message: 'Budget has been exceeded' } },
                { ok: false, status: 400 }
            ));

            await expect(service.processPrompt('Add a label', { display_type: 'color_lcd', widgets: [] }))
                .rejects.toThrow('LiteLLM proxy error: Budget has been exceeded');
            expect(fetch.mock.calls[0][1].headers.Authorization).toBe('Bearer sk-virtual');
        });

        it('reports an empty completion and a missing proxy URL clearly', async () => {
            const service = new AIService();
            mockAppState.settings = {
                ai_provider: 'litellm',
                ai_base_url_litellm: 'http://proxy.local:4000',
                ai_model_litellm: 'gpt-4.1-mini'
            };
            fetch.mockResolvedValueOnce(jsonResponse({ choices: [{ message: { content: null } }] }));

            await expect(service.processPrompt('Add a label', { display_type: 'color_lcd', widgets: [] }))
                .rejects.toThrow('LiteLLM proxy returned an empty response for gpt-4.1-mini.');

            mockAppState.settings = { ai_provider: 'litellm', ai_model_litellm: 'gpt-4.1-mini' };
            await expect(service.processPrompt('Add a label', { display_type: 'color_lcd', widgets: [] }))
                .rejects.toThrow('Missing LiteLLM proxy URL');
        });
    });

    it('dispatches GLM prompts with a default model when none is selected', async () => {
        const service = new AIService();
        mockAppState.settings = {
            ai_provider: 'glm',
            ai_api_key_glm: 'glm-key',
            ai_model_glm: ''
        };
        mockAIValidator.validateResponse.mockReturnValue({
            valid: true,
            errors: [],
            sanitized: [{ id: 'w_1', type: 'text' }]
        });
        service.callGLM = vi.fn().mockResolvedValue('{"widgets":[{"id":"w_1","type":"text"}]}');

        const result = await service.processPrompt('Add a label', {
            display_type: 'color_lcd',
            widgets: []
        });

        expect(service.callGLM).toHaveBeenCalledWith('glm-key', 'glm-4.6', expect.any(String), expect.any(String));
        expect(mockAppState.updateSettings).toHaveBeenCalledWith({ ai_model_glm: 'glm-4.6' });
        expect(result).toEqual([{ id: 'w_1', type: 'text' }]);
    });

    it('prefers the newest stable general-purpose model when auto-detecting', () => {
        expect(AIService.pickPreferredModel([
            { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash' },
            { id: 'gemini-3.5-flash-image', name: 'Nano Banana' },
            { id: 'gemini-3.5-flash-lite', name: 'Gemini 3.5 Flash Lite' },
            { id: 'gemini-3.5-flash', name: 'Gemini 3.5 Flash' },
            { id: 'gemini-4-flash-preview', name: 'Gemini 4 Flash Preview' }
        ])).toBe('gemini-3.5-flash');

        expect(AIService.pickPreferredModel([
            { id: 'gemini-3.5-pro', name: 'Gemini 3.5 Pro' },
            { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro' }
        ])).toBe('gemini-3.5-pro');

        expect(AIService.pickPreferredModel([])).toBeNull();
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
            AIService.FALLBACK_MODELS.gemini,
            expect.any(String),
            expect.any(String)
        );
        // Models Google has already retired must never be the fallback.
        expect(['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-2.5-flash'])
            .not.toContain(AIService.FALLBACK_MODELS.gemini);
        expect(result).toEqual([{ id: 'w_2', type: 'text' }]);
    });
});
