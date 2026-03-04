// @ts-ignore - Vite raw HTML import
import headerHtml from './header.html?raw';
// @ts-ignore - Vite raw HTML import
import sidebarHtml from './sidebar.html?raw';
// @ts-ignore - Vite raw HTML import
import codePanelHtml from './code_panel.html?raw';
// @ts-ignore - Vite raw HTML import
import propertiesPanelHtml from './properties_panel.html?raw';
// @ts-ignore - Vite raw HTML import
import modalsHtml from './modals.html?raw';
// @ts-ignore - Vite asset import
import logoUrl from '../../../assets/logo_header.png';

function injectComponent(id, htmlString) {
    const el = document.getElementById(id);
    if (el) {
        // We replace the placeholder div entirely with the real content
        el.outerHTML = htmlString;
    } else {
        console.warn(`[UI Injection] Placeholder #${id} not found in index.html.`);
    }
}

// Ensure execution is synchronous before other modules boot up
export function initUI() {
    console.log('[UI Injection] Loading modular UI components...');

    // Replace hardcoded relative asset path with Vite-resolved URL
    let finalHeaderHtml = headerHtml.replace('assets/logo_header.png', logoUrl);
    injectComponent('header-placeholder', finalHeaderHtml);

    injectComponent('sidebar-placeholder', sidebarHtml);
    injectComponent('code-panel-placeholder', codePanelHtml);
    injectComponent('properties-panel-placeholder', propertiesPanelHtml);
    injectComponent('modals-placeholder', modalsHtml);
    console.log('[UI Injection] Construction complete.');
}

// Auto-execute when imported
initUI();
