import { beforeEach, describe, expect, it } from 'vitest';

import { syncSnippetModeUi } from '../../js/ui/snippet_manager_ui.js';

function seedDom() {
    document.body.innerHTML = `
        <div id="oeplNotice" class="hidden"></div>
        <div id="odpNotice" class="hidden"><div></div></div>
        <div class="code-panel-title"><button id="title-btn">X</button> Old</div>
        <button id="copyOEPLServiceBtn"></button>
        <button id="copyODPServiceBtn"></button>
        <button id="copyLambdaBtn"></button>
        <button id="updateLayoutBtn"></button>
    `;
}

describe('snippet_manager_ui', () => {
    beforeEach(() => {
        seedDom();
    });

    it('switches the snippet UI into OEPL mode', () => {
        const result = syncSnippetModeUi('OEPLAdapter');

        expect(result).toEqual({ isOEPL: true, isODP: false });
        expect(document.getElementById('oeplNotice')?.classList.contains('hidden')).toBe(false);
        expect(document.getElementById('copyOEPLServiceBtn')?.style.display).toBe('inline-block');
        expect(document.getElementById('copyLambdaBtn')?.style.display).toBe('none');
        expect(document.querySelector('.code-panel-title')?.textContent).toContain('OpenEpaperLink JSON');
    });

    it('switches the snippet UI into OpenDisplay mode and restores the default title otherwise', () => {
        let result = syncSnippetModeUi('OpenDisplayAdapter');

        expect(result).toEqual({ isOEPL: false, isODP: true });
        expect(document.getElementById('odpNotice')?.classList.contains('hidden')).toBe(false);
        expect(document.getElementById('copyODPServiceBtn')?.style.display).toBe('inline-block');
        expect(document.querySelector('#odpNotice div')?.innerHTML).toContain('opendisplay.drawcustom');
        expect(document.querySelector('.code-panel-title')?.textContent).toContain('OpenDisplay YAML (ODP)');

        seedDom();
        result = syncSnippetModeUi('ESPHomeAdapter');

        expect(result).toEqual({ isOEPL: false, isODP: false });
        expect(document.getElementById('oeplNotice')?.classList.contains('hidden')).toBe(true);
        expect(document.getElementById('copyLambdaBtn')?.style.display).toBe('inline-block');
        expect(document.querySelector('.code-panel-title')?.textContent).toContain('ESPHome YAML');
    });
});
