import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../js/ui/components/header.html?raw', () => ({
    default: '<header class="header-shell"><img src="assets/logo_header.png" /></header>'
}));
vi.mock('../../js/ui/components/sidebar.html?raw', () => ({
    default: '<aside class="sidebar-shell">Sidebar</aside>'
}));
vi.mock('../../js/ui/components/code_panel.html?raw', () => ({
    default: '<section class="code-shell">Code</section>'
}));
vi.mock('../../js/ui/components/properties_panel.html?raw', () => ({
    default: '<section class="properties-shell">Properties</section>'
}));
vi.mock('../../js/ui/components/modals.html?raw', () => ({
    default: '<div class="modal-shell">Modals</div>'
}));
vi.mock('../../assets/logo_header.png', () => ({
    default: '/vite/logo_header.test.png'
}));

describe('ui bootstrap', () => {
    beforeEach(() => {
        vi.resetModules();
        document.body.innerHTML = '';
        delete window.LAYOUT;
    });

    it('publishes frozen layout constants onto window', async () => {
        await import('../../js/core/layout_constants.js');

        expect(window.LAYOUT).toEqual(expect.objectContaining({
            WIDGET: expect.objectContaining({
                SMALL: { W: 100, H: 20 },
                MEDIUM: { W: 200, H: 60 },
                LARGE: { W: 200, H: 100 }
            }),
            FONT: expect.objectContaining({
                SIZE: expect.objectContaining({ XS: 12, XXL: 40 }),
                DEFAULT: expect.objectContaining({ LABEL: 14, VALUE: 20, TITLE: 28, DATE: 16 })
            }),
            GRID: { GAP: 10, MARGIN: 10 }
        }));
        expect(Object.isFrozen(window.LAYOUT)).toBe(true);
    });

    it('injects modular UI fragments on import and rewrites the header logo URL', async () => {
        document.body.innerHTML = `
            <div id="header-placeholder"></div>
            <div id="sidebar-placeholder"></div>
            <div id="code-panel-placeholder"></div>
            <div id="properties-panel-placeholder"></div>
            <div id="modals-placeholder"></div>
        `;

        await import('../../js/ui/components/init_ui.js');

        expect(document.querySelector('.header-shell img')?.getAttribute('src')).toBe('/vite/logo_header.test.png');
        expect(document.querySelector('.sidebar-shell')?.textContent).toBe('Sidebar');
        expect(document.querySelector('.code-shell')?.textContent).toBe('Code');
        expect(document.querySelector('.properties-shell')?.textContent).toBe('Properties');
        expect(document.querySelector('.modal-shell')?.textContent).toBe('Modals');
    });

    it('warns when placeholders are missing and can be re-run explicitly', async () => {
        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        document.body.innerHTML = `
            <div id="header-placeholder"></div>
            <div id="sidebar-placeholder"></div>
            <div id="code-panel-placeholder"></div>
            <div id="properties-panel-placeholder"></div>
            <div id="modals-placeholder"></div>
        `;

        const module = await import('../../js/ui/components/init_ui.js');
        document.body.innerHTML = '';

        module.initUI();

        expect(warnSpy).toHaveBeenCalledTimes(5);
        expect(warnSpy).toHaveBeenCalledWith('[UI Injection] Placeholder #header-placeholder not found in index.html.');
    });

    it('returns early when the shell is already injected and placeholders are gone', async () => {
        document.body.innerHTML = `
            <header class="header-shell"></header>
            <aside class="sidebar-shell"></aside>
            <section class="code-shell"></section>
            <section class="properties-shell"></section>
            <div class="modal-shell"></div>
        `;

        const module = await import('../../js/ui/components/init_ui.js');

        expect(() => module.initUI()).not.toThrow();
        expect(document.querySelectorAll('.header-shell')).toHaveLength(1);
    });
});
