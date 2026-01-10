import { vi, beforeEach } from 'vitest';

// Mock localStorage
const localStorageMock = {
    store: {},
    getItem: vi.fn((key) => localStorageMock.store[key] || null),
    setItem: vi.fn((key, value) => { localStorageMock.store[key] = value.toString(); }),
    clear: vi.fn(() => { localStorageMock.store = {}; }),
    removeItem: vi.fn((key) => { delete localStorageMock.store[key]; }),
};
global.localStorage = localStorageMock;

// Mock custom events if needed (though JSDOM handles EventTarget)
// Mock window/document if not provided by JSDOM
// Mock LVGLExport
global.LVGLExport = {
    generateLVGLSnippet: vi.fn(() => []),
    serializeWidget: vi.fn(() => '')
};
window.LVGLExport = global.LVGLExport;

if (typeof document === 'undefined') {
    global.document = {
        getElementById: vi.fn(),
        querySelector: vi.fn(),
        createElement: vi.fn(() => ({
            style: {},
            appendChild: vi.fn(),
            addEventListener: vi.fn(),
            setAttribute: vi.fn(),
        })),
    };
}

// Reset mocks before each test
beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
});
