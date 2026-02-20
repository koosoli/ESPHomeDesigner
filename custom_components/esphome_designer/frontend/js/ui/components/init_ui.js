import headerHtml from './header.html?raw';
import sidebarHtml from './sidebar.html?raw';
import codePanelHtml from './code_panel.html?raw';
import propertiesPanelHtml from './properties_panel.html?raw';
import modalsHtml from './modals.html?raw';

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
    injectComponent('header-placeholder', headerHtml);
    injectComponent('sidebar-placeholder', sidebarHtml);
    injectComponent('code-panel-placeholder', codePanelHtml);
    injectComponent('properties-panel-placeholder', propertiesPanelHtml);
    injectComponent('modals-placeholder', modalsHtml);
    console.log('[UI Injection] Construction complete.');
}

// Auto-execute when imported
initUI();
