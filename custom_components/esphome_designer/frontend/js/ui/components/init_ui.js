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
import { Logger } from '../../utils/logger.js';

const PLACEHOLDER_IDS = [
    'header-placeholder',
    'sidebar-placeholder',
    'code-panel-placeholder',
    'properties-panel-placeholder',
    'modals-placeholder',
];

const SHELL_SELECTORS = [
    '.header-shell',
    '.sidebar-shell',
    '.code-shell',
    '.properties-shell',
    '.modal-shell',
];

function injectComponent(id, htmlString) {
    const el = document.getElementById(id);
    if (el) {
        // We replace the placeholder div entirely with the real content
        el.outerHTML = htmlString;
    } else {
        console.warn(`[UI Injection] Placeholder #${id} not found in index.html.`);
    }
}

function hasPlaceholders() {
    return PLACEHOLDER_IDS.some((id) => document.getElementById(id));
}

function hasInjectedShell() {
    return SHELL_SELECTORS.some((selector) => document.querySelector(selector));
}

// Ensure execution is synchronous before other modules boot up
export function initUI() {
    Logger.log('[UI Injection] Loading modular UI components...');

    if (!hasPlaceholders() && hasInjectedShell()) {
        Logger.log('[UI Injection] Construction complete.');
        return;
    }

    // Replace hardcoded relative asset path with Vite-resolved URL
    let finalHeaderHtml = headerHtml.replace('assets/logo_header.png', logoUrl);
    injectComponent('header-placeholder', finalHeaderHtml);

    injectComponent('sidebar-placeholder', sidebarHtml);
    injectComponent('code-panel-placeholder', codePanelHtml);
    injectComponent('properties-panel-placeholder', propertiesPanelHtml);
    injectComponent('modals-placeholder', modalsHtml);
    Logger.log('[UI Injection] Construction complete.');
}

if (hasPlaceholders()) {
    initUI();
}
