import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAppState, mockLoadLayoutIntoState, mockLogger } = vi.hoisted(() => ({
    mockAppState: {
        getPagesPayload: vi.fn()
    },
    mockLoadLayoutIntoState: vi.fn(),
    mockLogger: {
        error: vi.fn()
    }
}));

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/io/yaml_import', () => ({
    loadLayoutIntoState: mockLoadLayoutIntoState
}));

vi.mock('../../js/utils/logger.js', () => ({
    Logger: mockLogger
}));

import * as fileOps from '../../js/io/file_ops.js';

describe('file_ops', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = '';
        mockAppState.getPagesPayload.mockReturnValue({
            pages: [{ id: 'page_1' }]
        });
    });

    it('saves the current layout to a downloadable JSON file', () => {
        const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
        const createObjectURL = vi.fn(() => 'blob:layout');
        const revokeObjectURL = vi.fn();

        vi.stubGlobal('URL', {
            createObjectURL,
            revokeObjectURL
        });
        vi.spyOn(Date, 'now').mockReturnValue(1234567890);

        fileOps.saveLayoutToFile();

        expect(createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
        expect(clickSpy).toHaveBeenCalledTimes(1);
        expect(revokeObjectURL).toHaveBeenCalledWith('blob:layout');
        expect(document.querySelectorAll('a')).toHaveLength(0);
    });

    it('loads a valid JSON layout file into app state', () => {
        class SuccessfulFileReader {
            constructor() {
                this.onload = null;
            }

            readAsText(file) {
                this.onload?.({
                    target: {
                        result: file.content
                    }
                });
            }
        }

        vi.stubGlobal('FileReader', SuccessfulFileReader);

        fileOps.loadLayoutFromFile({
            content: '{"pages":[{"id":"page_1"}]}'
        });

        expect(mockLoadLayoutIntoState).toHaveBeenCalledWith({
            pages: [{ id: 'page_1' }]
        });
    });

    it('reports invalid JSON layout files to the logger and alerts the user', () => {
        class InvalidFileReader {
            constructor() {
                this.onload = null;
            }

            readAsText() {
                this.onload?.({
                    target: {
                        result: '{broken-json'
                    }
                });
            }
        }

        const alertMock = vi.fn();
        vi.stubGlobal('FileReader', InvalidFileReader);
        vi.stubGlobal('alert', alertMock);

        fileOps.loadLayoutFromFile({
            content: '{broken-json'
        });

        expect(mockLoadLayoutIntoState).not.toHaveBeenCalled();
        expect(mockLogger.error).toHaveBeenCalled();
        expect(alertMock).toHaveBeenCalledWith('Error parsing layout file. Please ensure it is a valid JSON file.');
    });

    it('handles file selection events and resets the input value', () => {
        class SuccessfulFileReader {
            constructor() {
                this.onload = null;
            }

            readAsText(file) {
                this.onload?.({
                    target: {
                        result: file.content
                    }
                });
            }
        }

        vi.stubGlobal('FileReader', SuccessfulFileReader);

        const target = {
            files: [{ content: '{"pages":[{"id":"page_2"}]}' }],
            value: 'chosen'
        };

        fileOps.handleFileSelect({ target });

        expect(mockLoadLayoutIntoState).toHaveBeenCalledWith({
            pages: [{ id: 'page_2' }]
        });
        expect(target.value).toBe('');
    });

    it('ignores empty file selections but still clears the input value', () => {
        const target = {
            files: [],
            value: 'chosen'
        };

        fileOps.handleFileSelect({ target });

        expect(mockLoadLayoutIntoState).not.toHaveBeenCalled();
        expect(target.value).toBe('');
    });
});
