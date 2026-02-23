const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./plugin-Df8WYhNz.js","./text_utils-DPZlj6Oi.js","./plugin-CCJiZ1ha.js","./template_converter-Dp-G9w6d.js","./plugin-Z2cktzak.js","./plugin-rQiWESPh.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();const Wo=`<header class="main-header" role="banner">
  <div class="main-header-title">
    <img src="assets/logo_header.png" alt="ESPHome Designer" class="logo-image">
    <span><small style="opacity: 0.5; margin-left: 8px;">v1.0.0 RC8</small> <span id="currentLayoutDevice"
        style="margin-left:8px; color:var(--accent);"></span></span>
  </div>
  <div class="main-header-actions desktop-only">
    <a href="https://github.com/koosoli/ESPHomeDesigner/" target="_blank" class="btn btn-secondary"
      style="font-size: 11px;">
      <svg height="14" width="14" viewBox="0 0 16 16" fill="currentColor"
        style="vertical-align: middle; margin-right: 4px;">
        <path
          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z">
        </path>
      </svg>
      GitHub
    </a>
    <a href="https://buymeacoffee.com/koosoli" target="_blank" class="btn btn-secondary" title="Buy me a coffee">
      <span class="mdi mdi-coffee" style="font-size: 16px;"></span>
    </a>
    <button id="deviceSettingsBtn" class="btn btn-secondary">📱 Device Settings</button>
    <button id="editorSettingsBtn" class="btn btn-secondary">⚙ Editor Settings</button>
  </div>
  <div class="main-header-actions mobile-only">
    <button id="mobileWidgetsBtn" class="btn btn-secondary"><svg viewBox="0 0 24 24" width="18" height="18" fill="none"
        stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
      </svg></button>
    <button id="mobileDeviceBtn" class="btn btn-secondary">📱</button>
    <button id="mobileEditorSettingsBtn" class="btn btn-secondary">⚙</button>
    <a href="https://buymeacoffee.com/koosoli" target="_blank" class="btn btn-secondary" title="Buy me a coffee">
      <span class="mdi mdi-coffee" style="font-size: 18px;"></span>
    </a>
    <button id="mobilePropsBtn" class="btn btn-secondary"><svg viewBox="0 0 24 24" width="18" height="18" fill="none"
        stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="3"></circle>
        <path
          d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z">
        </path>
      </svg></button>
  </div>
</header>`,$o=`    <aside class="sidebar" role="complementary" aria-label="Editor Sidebar">
      <div id="pagesSection" class="sidebar-section collapsible expanded">
        <div class="sidebar-section-label" id="pagesHeader"
          style="padding: 12px 16px 8px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: background 0.2s; border-radius: 4px;"
          title="Click to view all pages">
          <div style="display: flex; align-items: center; gap: 8px;">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            <span style="font-weight: 600;">PAGES</span>
          </div>
          <svg class="chevron" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor"
            stroke-width="3" style="transition: transform 0.2s; transform: rotate(0deg);">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

        <div id="pagesContent" class="collapsible-content" style="padding: 0 16px 12px;">
          <div id="pageList" class="page-list"></div>
          <button id="addPageBtn" class="btn btn-secondary btn-full" style="margin-top: 8px;">+ Add page</button>
          <button id="clearAllBtn" class="btn btn-secondary btn-full" style="margin-top: 4px;"
            title="Remove all widgets from current page">Clear Current Page</button>
        </div>
      </div>

      <div class="sidebar-section" style="flex: 1; overflow-y: auto;">
        <div class="sidebar-section-label" style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
            </svg>
            <span>Widgets</span>
          </div>
          <button id="quickSearchBtn" class="btn-icon btn-xs" title="Quick Search (Shift+Space)" style="opacity: 0.6;">
            <span class="mdi mdi-magnify" style="font-size: 14px;"></span>
          </button>
        </div>
        <div id="widgetPalette" class="widget-list"></div>
      </div>

      <div class="sidebar-section">
        <div id="currentLayoutIndicator"
          style="background: rgba(255,255,255,0.03); padding: 6px 10px; border-radius: 6px; margin-bottom: 6px; font-size: 10px;">
          <div style="color: var(--muted); margin-bottom: 4px; display: flex; justify-content: space-between;">
            <span>LAYOUT</span>
            <span id="sidebarStatus" style="font-size: 10px; opacity: 0.6;">Ready</span>
          </div>
          <strong id="currentLayoutName">Loading...</strong>
        </div>
        <div style="display: flex; gap: 4px;">
          <button id="saveLayoutBtn" class="btn btn-secondary" style="flex: 1;">Save Layout</button>
          <button id="importLayoutBtn" class="btn btn-secondary" style="flex: 1;">Import Layout</button>
        </div>
        <input type="file" id="loadLayoutBtn" accept=".json" style="display:none;" />
        <button id="manageLayoutsBtn" class="btn btn-secondary btn-full" style="margin-top: 4px;">📁 Layout
          Manager</button>
      </div>
    </aside>`,zo=`      <div class="code-panel">
        <div class="code-panel-header">
          <div class="code-panel-title">
            <button id="toggleYamlBtn" class="btn-icon btn-xs code-toggle-btn" title="Toggle YAML Panel">
              <svg class="chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor"
                stroke-width="3">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            ESPHome YAML
          </div>
          <div class="code-panel-actions">
            <button id="toggleHighlightBtn" class="btn btn-secondary btn-xs btn-icon" title="Toggle Syntax Highlighting"
              style="width: auto; padding: 0 6px; border-radius: 4px;">
              <span class="mdi mdi-palette-outline" style="font-size: 14px;"></span>
            </button>
            <button id="aiPromptBtn" class="btn btn-secondary btn-xs btn-icon" title="AI Assistant"
              style="width: auto; padding: 0 6px; border-radius: 4px;">
              <span class="mdi mdi-robot-outline" style="font-size: 14px;"></span>
            </button>
            <button id="copySnippetBtn" class="btn btn-secondary btn-xs" title="Copy full YAML output">
              <span class="mdi mdi-content-copy" style="font-size: 12px; margin-right: 4px;"></span>All
            </button>
            <button id="copyLambdaBtn" class="btn btn-secondary btn-xs" title="Copy display lambda only (C++ code)">
              <span class="mdi mdi-content-copy" style="font-size: 12px; margin-right: 4px;"></span>λ
            </button>
            <button id="copyOEPLServiceBtn" class="btn btn-secondary btn-xs" style="display:none;"
              title="Copy full HA Service Call">
              <span class="mdi mdi-content-copy" style="font-size: 12px; margin-right: 4px;"></span>OEPL
            </button>
            <button id="copyODPServiceBtn" class="btn btn-secondary btn-xs" style="display:none;"
              title="Copy full HA Service Call">
              <span class="mdi mdi-content-copy" style="font-size: 12px; margin-right: 4px;"></span>ODP
            </button>
            <button id="fullscreenSnippetBtn" class="btn btn-secondary btn-xs btn-icon" title="Expand code panel"
              style="width: auto; padding: 0 6px; border-radius: 4px;">
              <span class="mdi mdi-fullscreen" style="font-size: 14px;"></span>
            </button>
            <button id="updateLayoutBtn" class="btn btn-secondary btn-xs btn-icon" title="Import YAML back to canvas"
              style="width: auto; padding: 0 6px; border-radius: 4px;">
              <span class="mdi mdi-import" style="font-size: 14px;"></span>
            </button>
          </div>
        </div>
        <div id="oeplNotice" class="oepl-notice hidden"
          style="background: rgba(255, 159, 67, 0.1); border-bottom: 1px solid rgba(255, 159, 67, 0.2); padding: 8px 12px; font-size: 10px; color: #ff9f43; display: flex; align-items: center; gap: 8px;">
          <span class="mdi mdi-alert-circle-outline" style="font-size: 14px;"></span>
          <div>
            <strong>OpenEpaperLink JSON (Beta)</strong> - Copy this to Home Assistant → Developer Tools → Services →
            <code>open_epaper_link.drawcustom</code>
          </div>
        </div>
        <div id="odpNotice" class="odp-notice hidden"
          style="background: rgba(82, 199, 234, 0.1); border-bottom: 1px solid rgba(82, 199, 234, 0.2); padding: 8px 12px; font-size: 10px; color: var(--accent); display: flex; align-items: center; gap: 8px;">
          <span class="mdi mdi-informational" style="font-size: 14px;"></span>
          <div>
            <strong>OpenDisplay JSON (ODP)</strong> - Compatible with ODP v1 primitives.
          </div>
        </div>
        <div class="snippet-container">
          <pre id="highlightLayer" class="highlight-layer" aria-hidden="true"></pre>
          <textarea id="snippetBox" class="snippet-box" spellcheck="false"
            placeholder="# Click 'Generate' to see the ESPHome configuration..."></textarea>
        </div>
      </div>`,Uo=`    <aside class="right-panel" role="complementary" aria-label="Widget Properties">
      <!-- Hierarchy Panel -->
      <div class="sidebar-section" style="border-bottom: 1px solid var(--border-subtle);">
        <div class="sidebar-section-label"
          style="padding: 12px 16px 8px; display: flex; justify-content: space-between; align-items: center; cursor: pointer;"
          id="hierarchyHeader">
          <div style="display: flex; align-items: center; gap: 8px;">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="2" width="18" height="18" rx="2"></rect>
              <line x1="7" y1="8" x2="17" y2="8"></line>
              <line x1="7" y1="12" x2="17" y2="12"></line>
              <line x1="7" y1="16" x2="17" y2="16"></line>
            </svg>
            <span>Hierarchy</span>
          </div>
          <svg class="chevron" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor"
            stroke-width="3" style="transition: transform 0.2s; transform: rotate(0deg);">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        <div id="hierarchyPanel" class="hierarchy-content"
          style="max-height: 250px; overflow-y: auto; padding: 0 8px 8px;">
          <div id="hierarchyList" class="hierarchy-list"></div>
        </div>
      </div>

      <div class="sidebar-section-label"
        style="padding: 12px 16px 0; display: flex; justify-content: space-between; align-items: center;">
        <span>Properties</span>
        <label style="display:flex; align-items:center; gap:4px; font-size:10px; cursor:pointer;" title="Snap to grid">
          <input id="snapToggle" type="checkbox" checked style="width:12px; height:12px;" />
          <span>Snap</span>
        </label>
        <label style="display:flex; align-items:center; gap:4px; font-size:10px; cursor:pointer;"
          title="Lock position (Ctrl+L)">
          <input id="lockPositionToggle" type="checkbox" style="width:12px; height:12px;" />
          <span>Lock</span>
        </label>
      </div>
      <div id="propertiesPanel" class="properties-content">
        <div class="empty-state">
          Select a widget on the canvas to edit its properties.
        </div>
      </div>
    </aside>`,jo=`  <!-- Modals -->
  <!-- Fullscreen Modal -->
  <div id="snippetFullscreenModal" class="modal-backdrop hidden">
    <div class="modal">
      <div class="modal-header">
        <div style="display: flex; align-items: center; gap: 12px;">
          ESPHome YAML (Fullscreen)
          <button id="toggleFullscreenHighlightBtn" class="btn btn-secondary btn-xs btn-icon"
            title="Toggle Syntax Highlighting" style="width: auto; padding: 0 6px; border-radius: 4px;">
            <span class="mdi mdi-palette-outline" style="font-size: 14px;"></span>
          </button>
        </div>
        <button id="snippetFullscreenClose" class="btn btn-secondary">Close</button>
      </div>
      <div class="modal-body">
        <div class="snippet-container" id="snippetFullscreenContainer" style="height: 100%;">
          <pre id="snippetFullscreenHighlight" class="highlight-layer" aria-hidden="true"></pre>
          <div id="snippetFullscreenContent" style="width: 100%; height: 100%;"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Import Modal -->
  <div id="importSnippetModal" class="modal-backdrop hidden">
    <div class="modal">
      <div class="modal-header">
        <div>Import Layout from YAML</div>
        <button id="importSnippetCancel" class="btn btn-secondary">Cancel</button>
      </div>
      <div class="modal-body">
        <textarea id="importSnippetTextarea" class="prop-input" style="height:400px; font-family:monospace;"
          placeholder="# Paste ESPHome YAML here..."></textarea>
        <div id="importSnippetError" style="color:var(--danger); font-size:11px; margin-top:8px;"></div>
      </div>
      <div class="modal-actions">
        <button id="importSnippetConfirm" class="btn btn-secondary">Import</button>
      </div>
    </div>
  </div>

  <!-- Page Settings Modal -->
  <div id="pageSettingsModal" class="modal-backdrop hidden">
    <div class="modal">
      <div class="modal-header">
        <div>Page Settings</div>
        <button id="pageSettingsClose" class="btn btn-secondary">Close</button>
      </div>
      <div class="modal-body">
        <div class="field">
          <div class="prop-label">Page Name</div>
          <input id="pageSettingsName" class="prop-input" type="text" />
        </div>
        <div class="field">
          <div class="prop-label">Refresh Mode</div>
          <select id="pageSettingsRefreshMode" class="prop-input">
            <option value="interval">Periodic Interval</option>
            <option value="daily">Daily at specific time</option>
          </select>
        </div>
        <div class="field" id="field-refresh-interval">
          <div class="prop-label">Interval (seconds)</div>
          <input id="pageSettingsRefresh" class="prop-input" type="number" min="0" placeholder="60" />
        </div>
        <div class="field" id="field-refresh-time" style="display:none;">
          <div class="prop-label">Wake-up Time (HH:MM)</div>
          <input id="pageSettingsRefreshTime" class="prop-input" type="time" />
        </div>
        <div class="field">
          <div class="prop-label">Visibility Window</div>
          <div style="display: flex; gap: 8px;">
            <div style="flex: 1;">
              <div style="font-size: 10px; color: var(--muted); margin-bottom: 2px;">Start (Optional)</div>
              <input id="pageSettingsVisibleFrom" class="prop-input" type="time" />
            </div>
            <div style="flex: 1;">
              <div style="font-size: 10px; color: var(--muted); margin-bottom: 2px;">End (Optional)</div>
              <input id="pageSettingsVisibleTo" class="prop-input" type="time" />
            </div>
          </div>
        </div>
        <div class="field">
          <div class="prop-label">Visual Style</div>
          <select id="pageSettingsDarkMode" class="prop-input">
            <option value="inherit">Inherit Global</option>
            <option value="light">Always Light</option>
            <option value="dark">Always Dark</option>
          </select>
        </div>
        <div class="field">
          <div class="prop-label">Layout Mode (LVGL)</div>
          <select id="pageSettingsLayoutMode" class="prop-input">
            <option value="absolute">Absolute Positioning</option>
            <option value="grid">Grid Layout</option>
          </select>
          <div id="field-grid-size" style="display:none; margin-top:8px;">
            <div class="prop-label">Grid Size (RxC)</div>
            <input id="pageSettingsGridSize" class="prop-input" type="text" placeholder="4x4" pattern="[0-9]+x[0-9]+" />
            <div style="font-size:10px; color:var(--muted); margin-top:4px;">Format: rows×columns, e.g. 2x3, 4x4</div>
          </div>
        </div>
      </div>
      <div class="modal-actions">
        <button id="pageSettingsSave" class="btn btn-secondary">Save Changes</button>
      </div>
    </div>
  </div>

  <!-- Device Settings Modal -->
  <div id="deviceSettingsModal" class="modal-backdrop hidden">
    <div class="modal">
      <div class="modal-header">
        <div>Device Settings</div>
        <button id="deviceSettingsClose" class="btn btn-secondary">Close</button>
      </div>
      <div class="modal-body">
        <div class="settings-grid">
          <!-- PRIMARY SETTINGS (Top 2x2 Grid) -->
          <div class="primary-settings-grid">
            <div class="field">
              <div class="prop-label">Friendly Name</div>
              <input id="deviceName" class="prop-input" type="text" placeholder="My E-Ink Device" />
            </div>

            <div class="field" id="renderingModeField">
              <div class="prop-label">Rendering Mode</div>
              <select id="renderingMode" class="prop-input">
                <option value="direct">Direct (Display Lambda)</option>
                <option value="lvgl">LVGL (Recommended for LCD)</option>
                <option value="oepl">OpenEpaperLink JSON (Drawing Protocol)</option>
                <option value="opendisplay">OpenDisplay JSON (ODP)</option>
              </select>
            </div>

            <div class="field">
              <div class="prop-label">Screen Orientation</div>
              <select id="deviceOrientation" class="prop-input">
                <option value="landscape">Landscape</option>
                <option value="portrait">Portrait</option>
              </select>
            </div>
          </div>

          <!-- SECONDARY SETTINGS (Left Column) -->
          <div class="settings-column">
            <!-- Dynamic Hardware Profile Section (ESPHome Only) -->
            <div class="field" id="deviceModelField"
              style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px; margin-bottom: 8px;">
              <div class="prop-label" style="display:flex; justify-content:space-between; align-items:center;">
                <span>Hardware Profile</span>
                <div style="display: flex; gap: 4px;">
                  <button id="reloadHardwareBtn" class="btn btn-secondary btn-xs"
                    style="font-size: 10px; padding: 2px 6px;" title="Reload hardware profiles from server">⟳
                    Reload</button>
                  <button id="importHardwareBtn" class="btn btn-secondary btn-xs"
                    style="font-size: 10px; padding: 2px 6px;">Import Recipe</button>
                </div>
              </div>
              <select id="deviceModel" class="prop-input">
                <option value="custom">Custom Profile...</option>
              </select>
              <input type="file" id="hardwareFileInput" accept=".yaml" style="display:none;" />
            </div>

            <!-- OpenEpaperLink Settings -->
            <div id="oeplSettingsSection" style="display:none;">
              <div style="font-size: 11px; font-weight: bold; color: var(--accent); margin-bottom: 8px;">
                OpenEpaperLink Configuration</div>
              <div class="field">
                <div class="prop-label">OEPL Tag Entity ID</div>
                <input id="oeplEntityId" class="prop-input" type="text"
                  placeholder="open_epaper_link.0000000000000000" />
              </div>
              <div class="field">
                <div class="prop-label">Dithering Algorithm</div>
                <select id="oeplDither" class="prop-input">
                  <option value="0">None (Faster)</option>
                  <option value="1">Ordered</option>
                  <option value="2" selected>Burkes (Recommended)</option>
                  <option value="3">Atkinson</option>
                  <option value="4">Floyd-Steinberg</option>
                  <option value="5">Jarvis-Judice-Ninke</option>
                  <option value="6">Stucki</option>
                  <option value="7">Sierra</option>
                </select>
              </div>
            </div>

            <!-- OpenDisplay Settings -->
            <div id="odpSettingsSection" style="display:none;">
              <div style="font-size: 11px; font-weight: bold; color: var(--accent); margin-bottom: 8px;">
                OpenDisplay Configuration (ODP)</div>
              <div class="field">
                <div class="prop-label">ODP Display Entity ID</div>
                <input id="opendisplayEntityId" class="prop-input" type="text"
                  placeholder="opendisplay.0000000000000000" />
              </div>
              <div class="field">
                <div class="prop-label">Dithering Algorithm</div>
                <select id="opendisplayDither" class="prop-input">
                  <option value="0">None (Faster)</option>
                  <option value="1">Ordered</option>
                  <option value="2" selected>Burkes (Recommended)</option>
                  <option value="3">Atkinson</option>
                  <option value="4">Floyd-Steinberg</option>
                  <option value="5">Jarvis-Judice-Ninke</option>
                  <option value="6">Stucki</option>
                  <option value="7">Sierra</option>
                </select>
              </div>
              <div class="field">
                <div class="prop-label">Update Interval (TTL)</div>
                <input id="opendisplayTtl" class="prop-input" type="number" min="0" placeholder="60" />
                <div style="font-size:9px; color:var(--muted); margin-top:4px;">In seconds. 0 = never expires.</div>
              </div>
            </div>

            <!-- Custom Hardware Section -->
            <div id="customHardwareSection"
              style="display:none; border:1px solid var(--accent); border-radius:8px; padding:12px; background: rgba(82, 199, 234, 0.03);">
              <div
                style="font-size:11px; font-weight:bold; color:var(--accent); margin-bottom:12px; display:flex; align-items:center; gap:8px;">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                  <path
                    d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z">
                  </path>
                </svg>
                Custom Hardware Pinout
              </div>

              <div class="hardware-group" style="border:none; margin:0; padding:0;">
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                  <div class="field">
                    <div class="prop-label" style="font-size:10px;">Chip Type</div>
                    <select id="customChip" class="prop-input-sm">
                      <option value="esp32-s3">ESP32-S3</option>
                      <option value="esp32">ESP32</option>
                      <option value="esp32-c3">ESP32-C3</option>
                      <option value="esp32-c6">ESP32-C6</option>
                      <option value="esp8266">ESP8266 (Experimental)</option>
                    </select>
                  </div>
                  <div class="field">
                    <div class="prop-label" style="font-size:10px;">Tech</div>
                    <select id="customTech" class="prop-input-sm">
                      <option value="lcd">LCD / OLED</option>
                      <option value="epaper">E-Paper</option>
                    </select>
                  </div>
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                  <div class="field">
                    <div class="prop-label" style="font-size:10px;">Resolution Preset</div>
                    <select id="customResPreset" class="prop-input-sm">
                      <option value="custom">Manual...</option>
                      <!-- LCD / OLED -->
                      <optgroup label="LCD / OLED">
                        <option value="128x64">128x64 (0.96")</option>
                        <option value="128x128">128x128 (1.44")</option>
                        <option value="240x240">240x240 (1.3/1.54")</option>
                        <option value="320x240">320x240 (2.4/2.8")</option>
                        <option value="320x480">320x480 (3.5")</option>
                        <option value="480x320">480x320 (3.5" alt)</option>
                        <option value="480x480">480x480 (Round/Square)</option>
                        <option value="800x480">800x480 (4-7")</option>
                        <option value="1024x600">1024x600 (7-10")</option>
                      </optgroup>
                      <!-- E-Paper -->
                      <optgroup label="E-Paper">
                        <option value="250x122">2.13" (250x122)</option>
                        <option value="296x128">2.9" (296x128)</option>
                        <option value="400x300">4.2" (400x300)</option>
                        <option value="600x448">5.65" (600x448 7-Color)</option>
                        <option value="640x384">5.83" (640x384)</option>
                        <option value="800x480">7.5" (800x480)</option>
                        <option value="880x528">7.5" HD (880x528)</option>
                      </optgroup>
                    </select>
                  </div>
                  <div class="field">
                    <div class="prop-label" style="font-size:10px;">Shape</div>
                    <select id="customShape" class="prop-input-sm">
                      <option value="rect">Rectangle</option>
                      <option value="round">Round</option>
                    </select>
                  </div>
                </div>
                <div class="field">
                  <div class="prop-label" style="font-size:10px;">Manual Resolution</div>
                  <input id="customRes" class="prop-input-sm" type="text" placeholder="800x480" value="800x480" />
                </div>
                <div style="display:flex; gap:16px; margin-top:8px;">
                  <label style="display:flex; align-items:center; gap:6px; font-size:10px; cursor:pointer;">
                    <input id="customPsram" type="checkbox" checked />
                    <span>PSRAM</span>
                  </label>
                  <label style="display:flex; align-items:center; gap:6px; font-size:10px; cursor:pointer;">
                    <input id="customAntiburn" type="checkbox" />
                    <span>Anti-burn (LCD)</span>
                  </label>
                </div>
              </div>

              <!-- GPIO Pin Datalists (allows dropdown + free text) -->
              <datalist id="gpio-pins-esp32">
                <option value="">— None —</option>
                <option value="GPIO0">GPIO0 (boot)</option>
                <option value="GPIO1">GPIO1 (TX)</option>
                <option value="GPIO2">GPIO2</option>
                <option value="GPIO3">GPIO3 (RX)</option>
                <option value="GPIO4">GPIO4</option>
                <option value="GPIO5">GPIO5</option>
                <option value="GPIO12">GPIO12</option>
                <option value="GPIO13">GPIO13</option>
                <option value="GPIO14">GPIO14</option>
                <option value="GPIO15">GPIO15</option>
                <option value="GPIO16">GPIO16</option>
                <option value="GPIO17">GPIO17</option>
                <option value="GPIO18">GPIO18 (VSPI CLK)</option>
                <option value="GPIO19">GPIO19 (VSPI MISO)</option>
                <option value="GPIO21">GPIO21 (I2C SDA)</option>
                <option value="GPIO22">GPIO22 (I2C SCL)</option>
                <option value="GPIO23">GPIO23 (VSPI MOSI)</option>
                <option value="GPIO25">GPIO25</option>
                <option value="GPIO26">GPIO26</option>
                <option value="GPIO27">GPIO27</option>
                <option value="GPIO32">GPIO32</option>
                <option value="GPIO33">GPIO33</option>
                <option value="GPIO34">GPIO34 (input only)</option>
                <option value="GPIO35">GPIO35 (input only)</option>
                <option value="GPIO36">GPIO36 (input only)</option>
                <option value="GPIO39">GPIO39 (input only)</option>
              </datalist>
              <datalist id="gpio-pins-esp32s3">
                <option value="">— None —</option>
                <option value="GPIO0">GPIO0</option>
                <option value="GPIO1">GPIO1</option>
                <option value="GPIO2">GPIO2</option>
                <option value="GPIO3">GPIO3</option>
                <option value="GPIO4">GPIO4</option>
                <option value="GPIO5">GPIO5</option>
                <option value="GPIO6">GPIO6</option>
                <option value="GPIO7">GPIO7</option>
                <option value="GPIO8">GPIO8</option>
                <option value="GPIO9">GPIO9</option>
                <option value="GPIO10">GPIO10</option>
                <option value="GPIO11">GPIO11</option>
                <option value="GPIO12">GPIO12</option>
                <option value="GPIO13">GPIO13</option>
                <option value="GPIO14">GPIO14</option>
                <option value="GPIO15">GPIO15</option>
                <option value="GPIO16">GPIO16</option>
                <option value="GPIO17">GPIO17</option>
                <option value="GPIO18">GPIO18</option>
                <option value="GPIO19">GPIO19</option>
                <option value="GPIO20">GPIO20</option>
                <option value="GPIO21">GPIO21</option>
                <option value="GPIO38">GPIO38</option>
                <option value="GPIO39">GPIO39</option>
                <option value="GPIO40">GPIO40</option>
                <option value="GPIO41">GPIO41</option>
                <option value="GPIO42">GPIO42</option>
                <option value="GPIO45">GPIO45</option>
                <option value="GPIO46">GPIO46</option>
                <option value="GPIO47">GPIO47</option>
                <option value="GPIO48">GPIO48</option>
              </datalist>
              <datalist id="gpio-pins-esp8266">
                <option value="">— None —</option>
                <option value="GPIO16">GPIO16 (D0 - Wake)</option>
                <option value="GPIO5">GPIO5 (D1 - SCL)</option>
                <option value="GPIO4">GPIO4 (D2 - SDA)</option>
                <option value="GPIO0">GPIO0 (D3 - Flash)</option>
                <option value="GPIO2">GPIO2 (D4 - LED)</option>
                <option value="GPIO14">GPIO14 (D5 - SCK)</option>
                <option value="GPIO12">GPIO12 (D6 - MISO)</option>
                <option value="GPIO13">GPIO13 (D7 - MOSI)</option>
                <option value="GPIO15">GPIO15 (D8 - CS)</option>
                <option value="GPIO3">GPIO3 (RX)</option>
                <option value="GPIO1">GPIO1 (TX)</option>
                <option value="GPIO10">GPIO10 (SD3 - Flash)</option>
                <option value="GPIO9">GPIO9 (SD2 - Flash)</option>
              </datalist>

              <div class="hardware-group" style="margin-top:12px;">
                <div class="prop-label" style="font-size:10px; margin-bottom:4px;">Display (SPI)</div>
                <select id="customDisplayDriver" class="prop-input-sm" style="margin-bottom:8px;">
                  <option value="st7789v">ST7789 (LCD)</option>
                  <option value="ili9341">ILI9341 (LCD)</option>
                  <option value="ili9342">ILI9342 (LCD)</option>
                  <option value="ili9488">ILI9488 (LCD)</option>
                  <option value="waveshare_epaper">Waveshare E-Paper</option>
                  <option value="epaper_spi">Generic SPI E-Paper</option>
                  <option value="custom">Other (Custom YAML)</option>
                </select>

                <div id="customDisplayModelField" class="field" style="display:none; margin-bottom:8px;">
                  <div class="prop-label" style="font-size:10px;">Display Model</div>
                  <input id="customDisplayModel" class="prop-input-sm" type="text" placeholder="e.g. 7.50inV2"
                    list="waveshare_models" />
                  <div style="font-size:9px; color:var(--muted);">Required for Waveshare E-Paper</div>

                  <datalist id="waveshare_models">
                    <option value="1.54in">1.54"</option>
                    <option value="1.54inv2">1.54" V2</option>
                    <option value="2.13in">2.13"</option>
                    <option value="2.13inv2">2.13" V2</option>
                    <option value="2.13inv3">2.13" V3</option>
                    <option value="2.13in-ttgo">2.13" TTGO</option>
                    <option value="2.66in">2.66"</option>
                    <option value="2.70in">2.70"</option>
                    <option value="2.90in">2.90"</option>
                    <option value="2.90inv2">2.90" V2</option>
                    <option value="2.90in-dke">2.90" DKE</option>
                    <option value="3.52in">3.52"</option>
                    <option value="3.70in">3.70"</option>
                    <option value="4.20in">4.20"</option>
                    <option value="4.20inv2">4.20" V2</option>
                    <option value="5.65in">5.65" (Color)</option>
                    <option value="5.83in">5.83"</option>
                    <option value="5.83inv2">5.83" V2</option>
                    <option value="7.50in">7.50"</option>
                    <option value="7.50inv2">7.50" V2</option>
                    <option value="7.50inv2p">7.50" V2 (Partial Refresh)</option>
                    <option value="7.50hd">7.50" HD</option>
                  </datalist>
                </div>

                <div id="spiPinsGrid" style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px;">
                  <div class="field">
                    <div class="prop-label" style="font-size:9px;">CS</div>
                    <input id="pin_cs" class="prop-input-sm" type="text" list="gpio-pins-esp32s3"
                      placeholder="GPIO10" />
                  </div>
                  <div class="field">
                    <div class="prop-label" style="font-size:9px;">DC</div>
                    <input id="pin_dc" class="prop-input-sm" type="text" list="gpio-pins-esp32s3"
                      placeholder="GPIO11" />
                  </div>
                  <div class="field">
                    <div class="prop-label" style="font-size:9px;">RST <span style="opacity:0.5">(opt)</span></div>
                    <div style="display:flex; gap:2px;">
                      <input id="pin_rst" class="prop-input-sm" type="text" list="gpio-pins-esp32s3"
                        placeholder="(optional)" style="flex:1;" />
                      <button type="button" class="clear-pin-btn" data-target="pin_rst" title="Clear"
                        style="padding:0 4px; font-size:10px; background:#eee; border:1px solid #ccc; border-radius:3px; cursor:pointer;">×</button>
                    </div>
                  </div>
                  <div class="field">
                    <div class="prop-label" style="font-size:9px;">BUSY <span style="opacity:0.5">(opt)</span></div>
                    <div style="display:flex; gap:2px;">
                      <input id="pin_busy" class="prop-input-sm" type="text" list="gpio-pins-esp32s3"
                        placeholder="(optional)" style="flex:1;" />
                      <button type="button" class="clear-pin-btn" data-target="pin_busy" title="Clear"
                        style="padding:0 4px; font-size:10px; background:#eee; border:1px solid #ccc; border-radius:3px; cursor:pointer;">×</button>
                    </div>
                  </div>
                  <div class="field">
                    <div class="prop-label" style="font-size:9px;">CLK</div>
                    <input id="pin_clk" class="prop-input-sm" type="text" list="gpio-pins-esp32s3"
                      placeholder="GPIO18" />
                  </div>
                  <div class="field">
                    <div class="prop-label" style="font-size:9px;">MOSI</div>
                    <input id="pin_mosi" class="prop-input-sm" type="text" list="gpio-pins-esp32s3"
                      placeholder="GPIO23" />
                  </div>
                </div>
              </div>

              <!-- Backlight & I2C Pins -->
              <div class="hardware-group" style="margin-top:12px;">
                <div class="prop-label" style="font-size:10px; margin-bottom:4px;">Backlight & I2C</div>
                <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px;">
                  <div class="field">
                    <div class="prop-label" style="font-size:9px;">Backlight</div>
                    <input id="pin_backlight" class="prop-input-sm" type="text" list="gpio-pins-esp32s3"
                      placeholder="GPIO45" />
                  </div>
                  <div class="field">
                    <div class="prop-label" style="font-size:9px;">I2C SDA</div>
                    <input id="pin_sda" class="prop-input-sm" type="text" list="gpio-pins-esp32s3"
                      placeholder="GPIO21" />
                  </div>
                  <div class="field">
                    <div class="prop-label" style="font-size:9px;">I2C SCL</div>
                    <input id="pin_scl" class="prop-input-sm" type="text" list="gpio-pins-esp32s3"
                      placeholder="GPIO22" />
                  </div>
                </div>
              </div>

              <!-- Touch Controller -->
              <div class="hardware-group" style="margin-top:12px;">
                <div class="prop-label" style="font-size:10px; margin-bottom:4px;">Touch Controller</div>
                <select id="customTouchTech" class="prop-input-sm" style="margin-bottom:8px;">
                  <option value="none">None</option>
                  <option value="gt911">GT911 (I2C)</option>
                  <option value="cst816">CST816 (I2C)</option>
                  <option value="ft5x06">FT5x06 (I2C)</option>
                  <option value="xpt2046">XPT2046 (SPI)</option>
                </select>
                <div id="touchPinsGrid" style="display:none; grid-template-columns:1fr 1fr; gap:6px;">
                  <div class="field">
                    <div class="prop-label" style="font-size:9px;">Touch INT</div>
                    <input id="pin_touch_int" class="prop-input-sm" type="text" list="gpio-pins-esp32s3"
                      placeholder="GPIO4" />
                  </div>
                  <div class="field">
                    <div class="prop-label" style="font-size:9px;">Touch RST</div>
                    <input id="pin_touch_rst" class="prop-input-sm" type="text" list="gpio-pins-esp32s3"
                      placeholder="GPIO5" />
                  </div>
                </div>
              </div>

              <!-- Power / Battery -->
              <div class="hardware-group" style="margin-top:12px;">
                <div class="prop-label" style="font-size:10px; margin-bottom:4px;">Power / Battery</div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
                  <div class="field">
                    <div class="prop-label" style="font-size:9px;">Battery ADC <span style="opacity:0.5">(opt)</span>
                    </div>
                    <div style="display:flex; gap:2px;">
                      <input id="pin_battery_adc" class="prop-input-sm" type="text" list="gpio-pins-esp32s3"
                        placeholder="e.g. GPIO1" style="flex:1;" />
                      <button type="button" class="clear-pin-btn" data-target="pin_battery_adc" title="Clear"
                        style="padding:0 4px; font-size:10px; background:#eee; border:1px solid #ccc; border-radius:3px; cursor:pointer;">×</button>
                    </div>
                  </div>
                  <div class="field">
                    <div class="prop-label" style="font-size:9px;">Battery Enable <span style="opacity:0.5">(opt)</span>
                    </div>
                    <div style="display:flex; gap:2px;">
                      <input id="pin_battery_enable" class="prop-input-sm" type="text" list="gpio-pins-esp32s3"
                        placeholder="e.g. GPIO21" style="flex:1;" />
                      <button type="button" class="clear-pin-btn" data-target="pin_battery_enable" title="Clear"
                        style="padding:0 4px; font-size:10px; background:#eee; border:1px solid #ccc; border-radius:3px; cursor:pointer;">×</button>
                    </div>
                  </div>
                </div>
                <div style="font-size:9px; color:var(--muted); margin-top:4px;">ADC pin reads battery voltage. Enable
                  pin powers battery circuit (optional).</div>
              </div>

              <div class="field" style="margin-top:12px; border-top:1px solid var(--border-subtle); padding-top:8px;">
                <div class="prop-label" style="font-size:10px;">Recipe Name</div>
                <input id="customProfileName" class="prop-input-sm" type="text" placeholder="e.g. My Custom S3" />
              </div>

              <button id="saveCustomProfileBtn" class="btn btn-primary btn-full" type="button" style="margin-top:12px;">
                🚀 Save Profile
              </button>
            </div>

            <!-- Protocol Hardware Section (OEPL / ODP) -->
            <div id="protocolHardwareSection"
              style="display:none; border:1px solid var(--accent); border-radius:8px; padding:12px; background: rgba(82, 199, 234, 0.03);">
              <div
                style="font-size:11px; font-weight:bold; color:var(--accent); margin-bottom:12px; display:flex; align-items:center; gap:8px;">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
                Protocol Hardware Specs
              </div>

              <div class="field">
                <div class="prop-label">Resolution Preset</div>
                <select id="protocolResPreset" class="prop-input">
                  <option value="custom">Manual...</option>
                  <option value="296x128">2.9" (296x128)</option>
                  <option value="400x300">4.2" (400x300)</option>
                  <option value="800x480">7.5" (800x480)</option>
                  <option value="640x384">5.83" (640x384)</option>
                  <option value="250x122">2.13" (250x122)</option>
                </select>
              </div>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                <div class="field">
                  <div class="prop-label">Width</div>
                  <input id="protocolWidth" class="prop-input" type="number" value="400" />
                </div>
                <div class="field">
                  <div class="prop-label">Height</div>
                  <input id="protocolHeight" class="prop-input" type="number" value="300" />
                </div>
              </div>

              <div class="field">
                <div class="prop-label">Color Mode</div>
                <select id="protocolColorMode" class="prop-input">
                  <option value="bw">Monochrome (B/W)</option>
                  <option value="grayscale">Grayscale</option>
                  <option value="color_3">3-Color (BWR / BWY)</option>
                  <option value="full_color">Full Color</option>
                </select>
              </div>
            </div>

            <!-- Global Preferences -->
            <div class="field" style="margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border-subtle);">
              <label style="display:flex; align-items:center; gap:8px; cursor:pointer;">
                <input id="deviceDarkMode" type="checkbox" />
                <span style="font-size:var(--fs-xs); font-weight:600;">Dark Mode</span>
              </label>
            </div>

            <div class="field" id="deviceInvertedColorsField">
              <label style="display:flex; align-items:center; gap:8px; cursor:pointer;">
                <input id="deviceInvertedColors" type="checkbox" />
                <span style="font-size:var(--fs-xs); font-weight:600;">Inverted Colors (E-Paper)</span>
              </label>
            </div>
          </div>
        </div>

        <div id="powerStrategySection"
          style="border-top:1px solid var(--border-subtle); margin-top:16px; padding-top:16px;">
          <div class="prop-label">Power & Refresh Strategy</div>

          <div id="global-refresh-row"
            style="margin-top: 12px; margin-bottom: 16px; background: rgba(82, 199, 234, 0.05); padding: 10px; border-radius: 6px; border-left: 3px solid var(--accent);">
            <div class="prop-label" style="font-size: 11px; margin-bottom: 4px;">Global Refresh Interval</div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <input type="number" id="setting-refresh-interval" class="prop-input" placeholder="600"
                style="width: 80px;" min="5">
              <span style="font-size: 11px; opacity: 0.7;">seconds</span>
            </div>
            <div style="font-size: 10px; opacity: 0.6; margin-top: 4px;">Default time between updates. Can be overridden
              on individual pages.</div>
          </div>

          <!-- E-Paper Specific Strategies -->
          <div id="strategy-epaper-group" style="display:flex; flex-direction:column; gap:12px; margin-top:8px;">
            <div
              style="font-size:10px; font-weight:bold; text-transform:uppercase; color:var(--muted); margin-bottom:4px;">
              E-Paper Options</div>

            <!-- Standard -->
            <div>
              <label
                style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:var(--fs-sm); font-weight: 500;">
                <input type="radio" id="mode-standard" name="powerStrategy" value="standard"
                  onchange="togglePowerSettings()">
                Full Power (Always On)
              </label>
              <div style="font-size:10px; opacity:0.6; margin-left:24px;">Device stays connected to Wi-Fi. Fast
                response, but high battery drain.</div>
            </div>

            <!-- Night Mode -->
            <div>
              <label
                style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:var(--fs-sm); font-weight: 500;">
                <input type="radio" id="setting-sleep-enabled" name="powerStrategy" value="night"
                  onchange="togglePowerSettings()">
                Eco (Scheduled Night Sleep)
              </label>
              <div style="font-size:10px; opacity:0.6; margin-left:24px; margin-bottom:4px;">Stops refreshing during
                these hours to save energy.</div>
            </div>

            <!-- Daily Refresh -->
            <div>
              <label
                style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:var(--fs-sm); font-weight: 500;">
                <input type="radio" id="setting-daily-refresh-enabled" name="powerStrategy" value="daily"
                  onchange="togglePowerSettings()">
                Daily Scheduled Refresh
              </label>
              <div style="font-size:10px; opacity:0.6; margin-left:24px; margin-bottom:4px;">Wakes up once per day at a
                specific time.</div>
            </div>

            <!-- Manual Only -->
            <div>
              <label
                style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:var(--fs-sm); font-weight: 500;">
                <input type="radio" id="setting-manual-refresh" name="powerStrategy" value="manual"
                  onchange="togglePowerSettings()">
                Manual Refresh Only
              </label>
              <div style="font-size:10px; opacity:0.6; margin-left:24px;">Never updates automatically. Only refreshes
                when a button is pressed.</div>
            </div>

            <!-- Deep Sleep -->
            <div>
              <label
                style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:var(--fs-sm); font-weight: 500;">
                <input type="radio" id="setting-deep-sleep-enabled" name="powerStrategy" value="deepsleep"
                  onchange="togglePowerSettings()">
                Ultra Eco (Deep Sleep)
              </label>
              <div style="font-size:10px; opacity:0.6; margin-left:24px; margin-bottom:4px;">Shuts down completely
                between updates. Best for battery life.</div>
            </div>
          </div>

          <div id="strategy-lcd-group" style="display:none; flex-direction:column; gap:12px; margin-top:8px;">
            <div
              style="font-size:10px; font-weight:bold; text-transform:uppercase; color:var(--muted); margin-bottom:4px;">
              LCD / OLED Options</div>

            <div>
              <label
                style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:var(--fs-sm); font-weight: 500;">
                <input type="radio" name="lcdEcoStrategy" value="always_on" onchange="togglePowerSettings()">
                Always On (Full Brightness)
              </label>
            </div>

            <div>
              <label
                style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:var(--fs-sm); font-weight: 500;">
                <input type="radio" name="lcdEcoStrategy" value="backlight_off" onchange="togglePowerSettings()">
                Eco (Backlight Off Schedule)
              </label>
              <div style="font-size:10px; opacity:0.6; margin-left:24px;">Turns off backlight during sleep hours
                (recommended for LCD).</div>
            </div>

            <div id="lcd-strategy-dim-row">
              <label
                style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:var(--fs-sm); font-weight: 500;">
                <input type="radio" name="lcdEcoStrategy" value="dim_after_timeout" onchange="togglePowerSettings()">
                Eco (Dim after timeout)
              </label>
              <div style="font-size:10px; opacity:0.6; margin-left:24px;">Turns off backlight and pauses LVGL after
                period of inactivity. Resume on touch.</div>
            </div>

            <div>
              <label
                style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:var(--fs-sm); font-weight: 500;">
                <input type="radio" name="lcdEcoStrategy" value="halt_updates" onchange="togglePowerSettings()">
                Eco (Halt Loop)
              </label>
              <div style="font-size:10px; opacity:0.6; margin-left:24px;">Stops update cycle but leaves screen powered.
              </div>
            </div>

            <div>
              <label
                style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:var(--fs-sm); font-weight: 500;">
                <input type="radio" name="lcdEcoStrategy" value="deep_sleep" onchange="togglePowerSettings()">
                Ultra Eco (Deep Sleep)
              </label>
              <div style="font-size:10px; opacity:0.6; margin-left:24px;">Power down between updates.</div>
            </div>
          </div>

          <!-- Dim Timeout (Used by LCD Dim after timeout) -->
          <div id="dim-timeout-row"
            style="display:none; align-items:center; gap:8px; margin-left:24px; margin-top:8px; background: rgba(0,0,0,0.03); padding: 4px 8px; border-radius: 4px;">
            <span style="font-size: 11px; opacity: 0.7;">Dim after</span>
            <input type="number" id="setting-dim-timeout" class="prop-input" placeholder="10" style="width:80px;"
              min="1" value="10">
            <span style="font-size: 11px; opacity: 0.7;">seconds</span>
          </div>

          <!-- Common Sleep Times (Used by both) -->
          <div id="sleep-times-row"
            style="display:none; flex-direction:column; gap:8px; margin-left:24px; margin-top:8px; background: rgba(0,0,0,0.03); padding: 8px; border-radius: 4px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size: 11px; opacity: 0.7;">Sleep from</span>
              <select id="setting-sleep-start" class="prop-input" style="width:70px;">
                <option value="0">00:00</option>
                <option value="1">01:00</option>
                <option value="2">02:00</option>
                <option value="3">03:00</option>
                <option value="4">04:00</option>
                <option value="5">05:00</option>
                <option value="6">06:00</option>
                <option value="7">07:00</option>
                <option value="8">08:00</option>
                <option value="9">09:00</option>
                <option value="10">10:00</option>
                <option value="11">11:00</option>
                <option value="12">12:00</option>
                <option value="13">13:00</option>
                <option value="14">14:00</option>
                <option value="15">15:00</option>
                <option value="16">16:00</option>
                <option value="17">17:00</option>
                <option value="18">18:00</option>
                <option value="19">19:00</option>
                <option value="20">20:00</option>
                <option value="21">21:00</option>
                <option value="22">22:00</option>
                <option value="23">23:00</option>
              </select>
              <span style="font-size: 11px; opacity: 0.7;">to</span>
              <select id="setting-sleep-end" class="prop-input" style="width:70px;">
                <option value="0">00:00</option>
                <option value="1">01:00</option>
                <option value="2">02:00</option>
                <option value="3">03:00</option>
                <option value="4">04:00</option>
                <option value="5">05:00</option>
                <option value="6">06:00</option>
                <option value="7">07:00</option>
                <option value="8">08:00</option>
                <option value="9">09:00</option>
                <option value="10">10:00</option>
                <option value="11">11:00</option>
                <option value="12">12:00</option>
                <option value="13">13:00</option>
                <option value="14">14:00</option>
                <option value="15">15:00</option>
                <option value="16">16:00</option>
                <option value="17">17:00</option>
                <option value="18">18:00</option>
                <option value="19">19:00</option>
                <option value="20">20:00</option>
                <option value="21">21:00</option>
                <option value="22">22:00</option>
                <option value="23">23:00</option>
              </select>
            </div>
          </div>

          <div id="daily-refresh-row"
            style="display:none; align-items:center; gap:8px; margin-left:24px; margin-top:8px; background: rgba(0,0,0,0.03); padding: 4px 8px; border-radius: 4px;">
            <span style="font-size: 11px; opacity: 0.7;">Refresh at</span>
            <input type="time" id="setting-daily-refresh-time" class="prop-input" value="08:00" style="width:100px;">
          </div>

          <div id="deep-sleep-interval-row"
            style="display:none; align-items:center; gap:8px; margin-left:24px; margin-top:8px; background: rgba(0,0,0,0.03); padding: 4px 8px; border-radius: 4px;">
            <span style="font-size: 11px; opacity: 0.7;">Update every</span>
            <input type="number" id="setting-deep-sleep-interval" class="prop-input" placeholder="Seconds"
              style="width:80px;">
            <span style="font-size: 11px; opacity: 0.7;">sec</span>
          </div>

          <!-- Silent Hours -->
          <div style="border-top:1px solid var(--border-subtle); margin-top:8px; padding-top:12px;">
            <div
              style="display:flex; align-items:center; gap:8px; font-size:var(--fs-sm); font-weight: 500; color: var(--accent);">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <path
                  d="M17.22 17.22L2 2M12 2v2M4.93 4.93l1.41 1.41M2 12h2M6.34 17.66l-1.41 1.41M12 22v-2m7.07-2.93l-1.41-1.41M22 12h-2m-3.34-5.66l1.41-1.41M12 7a5 5 0 015 5 4.94 4.94 0 01-.46 2.06M12 17a5 5 0 01-5-5 4.94 4.94 0 01.46-2.06">
                </path>
              </svg>
              Silent Hours (No Refresh Window)
            </div>
            <div style="font-size:10px; opacity:0.6; margin-left:24px; margin-bottom:8px;">Prevent all display
              updates
              during this time window. Used to avoid night-time ghosts/noise.</div>
            <div
              style="display:flex; align-items:center; gap:8px; margin-left:24px; background: rgba(0,0,0,0.03); padding: 4px 8px; border-radius: 4px;">
              <span style="font-size: 11px; opacity: 0.7;">Disable updates from</span>
              <select id="setting-no-refresh-start" class="prop-input" style="width:70px;">
                <option value="">None</option>
                <option value="0">00:00</option>
                <option value="1">01:00</option>
                <option value="2">02:00</option>
                <option value="3">03:00</option>
                <option value="4">04:00</option>
                <option value="5">05:00</option>
                <option value="6">06:00</option>
                <option value="7">07:00</option>
                <option value="8">08:00</option>
                <option value="9">09:00</option>
                <option value="10">10:00</option>
                <option value="11">11:00</option>
                <option value="12">12:00</option>
                <option value="13">13:00</option>
                <option value="14">14:00</option>
                <option value="15">15:00</option>
                <option value="16">16:00</option>
                <option value="17">17:00</option>
                <option value="18">18:00</option>
                <option value="19">19:00</option>
                <option value="20">20:00</option>
                <option value="21">21:00</option>
                <option value="22">22:00</option>
                <option value="23">23:00</option>
              </select>
              <span style="font-size: 11px; opacity: 0.7;">to</span>
              <select id="setting-no-refresh-end" class="prop-input" style="width:70px;">
                <option value="">None</option>
                <option value="0">00:00</option>
                <option value="1">01:00</option>
                <option value="2">02:00</option>
                <option value="3">03:00</option>
                <option value="4">04:00</option>
                <option value="5">05:00</option>
                <option value="6">06:00</option>
                <option value="7">07:00</option>
                <option value="8">08:00</option>
                <option value="9">09:00</option>
                <option value="10">10:00</option>
                <option value="11">11:00</option>
                <option value="12">12:00</option>
                <option value="13">13:00</option>
                <option value="14">14:00</option>
                <option value="15">15:00</option>
                <option value="16">16:00</option>
                <option value="17">17:00</option>
                <option value="18">18:00</option>
                <option value="19">19:00</option>
                <option value="20">20:00</option>
                <option value="21">21:00</option>
                <option value="22">22:00</option>
                <option value="23">23:00</option>
              </select>
            </div>
          </div>

          <!-- Page Auto-Cycling -->
          <div style="border-top:1px solid var(--border-subtle); margin-top:8px; padding-top:12px;">
            <div
              style="display:flex; align-items:center; gap:8px; font-size:var(--fs-sm); font-weight: 600; color: var(--accent);">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="23 4 23 10 17 10"></polyline>
                <polyline points="1 20 1 14 7 14"></polyline>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
              </svg>
              Page Auto-Cycling
            </div>
            <div style="font-size:10px; opacity:0.6; margin-left:24px; margin-bottom:8px;">Automatically cycle
              through
              pages on a timer.</div>
            <div style="margin-left: 24px; display: flex; flex-direction: column; gap: 8px;">
              <label style="display:flex; align-items:center; gap:8px; cursor:pointer;">
                <input id="setting-auto-cycle" type="checkbox" />
                <span style="font-size:var(--fs-xs); font-weight:500;">Enable Automatic Page Cycling</span>
              </label>
              <div id="field-auto-cycle-interval"
                style="display:none; align-items:center; gap:8px; background: rgba(0,0,0,0.03); padding: 4px 8px; border-radius: 4px;">
                <span style="font-size: 11px; opacity: 0.7;">Cycle every</span>
                <input type="number" id="setting-auto-cycle-interval" class="prop-input" min="5" placeholder="30"
                  style="width:80px;">
                <span style="font-size: 11px; opacity: 0.7;">seconds</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-actions">
        <button id="deviceSettingsSave" class="btn btn-secondary">Apply Settings</button>
      </div>
    </div>
  </div>

  <!-- Save Profile Modal -->
  <div id="saveProfileModal" class="modal-backdrop hidden" style="z-index: 2000;">
    <div class="modal" style="max-width: 400px;">
      <div class="modal-header">
        <div>Save Hardware Profile</div>
        <button id="saveProfileClose" class="btn btn-secondary">Cancel</button>
      </div>
      <div class="modal-body">
        <div style="font-size: 11px; opacity: 0.7; margin-bottom: 12px;">
          Give your custom hardware configuration a unique name. It will be saved as a reusable recipe.
        </div>
        <div class="field">
          <div class="prop-label">Profile Name</div>
          <input id="saveProfileName" class="prop-input" type="text" placeholder="e.g. Living Room Display" />
        </div>
      </div>
      <div class="modal-actions">
        <button id="saveProfileConfirm" class="btn btn-secondary"
          style="background: var(--accent); color: white; border: none;">Save Profile</button>
      </div>
    </div>
  </div>

  <!-- Editor Settings Modal -->
  <div id="editorSettingsModal" class="modal-backdrop hidden">
    <div class="modal">
      <div class="modal-header">
        <div>Editor Preferences</div>
        <button id="editorSettingsClose" class="btn btn-secondary">Close</button>
      </div>
      <div class="modal-body">
        <!-- CATEGORY: VIEW & THEME -->
        <div class="settings-category collapsible expanded" data-category="view">
          <div class="settings-category-header">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="mdi mdi-eye-outline"></span>
              <span>View & Theme</span>
            </div>
            <span class="mdi mdi-chevron-down category-chevron"></span>
          </div>
          <div class="settings-category-content">
            <div class="field">
              <label style="display:flex; align-items:center; gap:8px; cursor: pointer;">
                <input type="checkbox" id="editorShowGrid" checked> <span>Show Grid</span>
              </label>
              <label style="display:flex; align-items:center; gap:8px; cursor: pointer;">
                <input type="checkbox" id="editorSnapToGrid" checked> <span>Enable Snapping</span>
              </label>
              <div style="margin-top:12px;">
                <div class="prop-label">Grid Opacity</div>
                <input type="range" id="editorGridOpacity" min="0" max="100" step="1" value="8" style="width:100%;">
              </div>
            </div>
            <div class="field">
              <div class="prop-label">Interface Theme</div>
              <label style="display:flex; align-items:center; gap:8px; cursor: pointer;">
                <input type="checkbox" id="editorLightMode"> <span>Use Light Mode interface</span>
              </label>
            </div>
          </div>
        </div>

        <!-- CATEGORY: FONT SETTINGS -->
        <div class="settings-category collapsible" data-category="fonts">
          <div class="settings-category-header">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="mdi mdi-format-font"></span>
              <span>Font Settings</span>
            </div>
            <span class="mdi mdi-chevron-down category-chevron"></span>
          </div>
          <div class="settings-category-content">
            <div class="field">
              <div class="prop-label">Global Glyphsets</div>
              <div style="font-size:10px; opacity:0.6; margin-bottom:8px;">Select glyphsets to include language specific
                characters (like å, ö, ä) in the generated YAML for all fonts.</div>
              <div id="editorGlyphsets"
                style="display:grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px;">
                <label style="display:flex; align-items:center; gap:8px; font-size: 11px; cursor: pointer;">
                  <input type="checkbox" class="glyphset-checkbox" value="GF_Latin_Kernel"> <span>Latin Kernel <small
                      style="opacity:0.6">(Basic A-Z, 0-9)</small></span>
                </label>
                <label style="display:flex; align-items:center; gap:8px; font-size: 11px; cursor: pointer;">
                  <input type="checkbox" class="glyphset-checkbox" value="GF_Latin_Core"> <span>Latin Core <small
                      style="opacity:0.6">(å, ö, ä, é, ß...)</small></span>
                </label>
                <label style="display:flex; align-items:center; gap:8px; font-size: 11px; cursor: pointer;">
                  <input type="checkbox" class="glyphset-checkbox" value="GF_Arabic_Core"> <span>Arabic Core <small
                      style="opacity:0.6">(ا, ب, ت...)</small></span>
                </label>
                <label style="display:flex; align-items:center; gap:8px; font-size: 11px; cursor: pointer;">
                  <input type="checkbox" class="glyphset-checkbox" value="GF_Cyrillic_Core"> <span>Cyrillic <small
                      style="opacity:0.6">(А, Б, В...)</small></span>
                </label>
                <label style="display:flex; align-items:center; gap:8px; font-size: 11px; cursor: pointer;">
                  <input type="checkbox" class="glyphset-checkbox" value="GF_Greek_Core"> <span>Greek <small
                      style="opacity:0.6">(α, β, γ...)</small></span>
                </label>
                <label style="display:flex; align-items:center; gap:8px; font-size: 11px; cursor: pointer;">
                  <input type="checkbox" class="glyphset-checkbox" value="GF_Latin_African"> <span>Latin African</span>
                </label>
                <label style="display:flex; align-items:center; gap:8px; font-size: 11px; cursor: pointer;">
                  <input type="checkbox" class="glyphset-checkbox" value="GF_Latin_PriAfrican"> <span>Latin
                    PriAfrican</span>
                </label>
                <label style="display:flex; align-items:center; gap:8px; font-size: 11px; cursor: pointer;">
                  <input type="checkbox" class="glyphset-checkbox" value="GF_Latin_Vietnamese"> <span>Vietnamese <small
                      style="opacity:0.6">(à, á, ả...)</small></span>
                </label>
              </div>
              <div style="margin-top:8px; padding-top:8px; border-top:1px dashed rgba(255,255,255,0.08);">
                <label style="display:flex; align-items:center; gap:8px; font-size: 11px; cursor: pointer;">
                  <input type="checkbox" id="editorExtendedLatinGlyphs">
                  <span>Extended Latin Glyphs <small style="opacity:0.6">(Manual fallback: €, µ, Ω, ™ + full
                      Latin-1)</small></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- CATEGORY: CONNECTIVITY -->
        <div class="settings-category collapsible" data-category="ha">
          <div class="settings-category-header">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="mdi mdi-home-assistant"></span>
              <span>Home Assistant</span>
            </div>
            <span class="mdi mdi-chevron-down category-chevron"></span>
          </div>
          <div class="settings-category-content">
            <div class="field">
              <div class="prop-label">Resources</div>
              <button id="editorRefreshEntities" class="btn btn-secondary btn-xs">Refresh Entity List</button>
              <span id="editorEntityCount" style="font-size:var(--fs-xs); opacity:0.6; margin-left:8px;"></span>
            </div>
            <div class="field">
              <div class="prop-label">Connection Settings</div>
              <div style="font-size:10px; opacity:0.6; margin-bottom:8px;">Configure this if you are using the
                GitHub-hosted version or an external URL.</div>
              <div style="display:flex; flex-direction:column; gap:8px;">
                <div id="haCorsTip"
                  style="background: rgba(82, 199, 234, 0.1); border-left: 3px solid var(--accent); padding: 10px; border-radius: 4px; font-size: 10px; line-height: 1.4;">
                  <strong>💡 Connection Tip:</strong><br>
                  If requests are blocked, you may need to add <code
                    id="haOriginPlaceholder">http://localhost:8000</code> to <code>cors_allowed_origins</code> and
                  <strong>restart HA</strong>.
                </div>
                <div>
                  <div class="prop-label" style="font-size: 10px;">Base URL</div>
                  <input type="text" id="haManualUrl" class="prop-input"
                    placeholder="https://your-ha.duckdns.org:8123" />
                </div>
                <div>
                  <div class="prop-label" style="font-size: 10px;">Long-Lived Access Token</div>
                  <input type="password" id="haLlatToken" class="prop-input" placeholder="Paste your token here..." />
                </div>
                <!-- Warning shown only when deployed within HA -->
                <div id="haDeployedWarning" class="hidden"
                  style="background: rgba(46, 204, 113, 0.1); border-left: 3px solid #2ecc71; padding: 10px; border-radius: 4px; font-size: 10px; line-height: 1.4; color: #2ecc71;">
                  <strong>✅ Deployed in Home Assistant:</strong><br>
                  Connection is handled automatically. These settings are locked to prevent configuration errors.
                </div>
                <div style="display:flex; gap:8px; align-items:center;">
                  <button id="editorTestHaBtn" class="btn btn-secondary btn-xs" style="flex:1;">Test Connection</button>
                  <div id="haTestResult" style="font-size:10px; line-height: 1.2;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CATEGORY: AI ASSISTANT -->
        <div class="settings-category collapsible" data-category="ai">
          <div class="settings-category-header">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="mdi mdi-robot-outline"></span>
              <span>AI Integration (LLM)</span>
            </div>
            <span class="mdi mdi-chevron-down category-chevron"></span>
          </div>
          <div class="settings-category-content">
            <div style="font-size:10px; opacity:0.6; margin-bottom:8px;">Configure Gemini, OpenAI or OpenRouter to use
              natural language prompts.</div>
            <div class="field" style="display:flex; flex-direction:column; gap:8px;">
              <div>
                <div class="prop-label" style="font-size: 10px;">Provider</div>
                <select id="aiProvider" class="prop-input">
                  <option value="gemini">Google Gemini</option>
                  <option value="openai">OpenAI</option>
                  <option value="openrouter">OpenRouter</option>
                </select>
              </div>
              <div id="aiKeyGeminiRow">
                <div class="prop-label" style="font-size: 10px;">Gemini API Key</div>
                <input type="password" id="aiApiKeyGemini" class="prop-input" placeholder="Paste Gemini key..." />
              </div>
              <div id="aiKeyOpenaiRow" style="display:none;">
                <div class="prop-label" style="font-size: 10px;">OpenAI API Key</div>
                <input type="password" id="aiApiKeyOpenai" class="prop-input" placeholder="Paste OpenAI key..." />
              </div>
              <div id="aiKeyOpenrouterRow" style="display:none;">
                <div class="prop-label" style="font-size: 10px;">OpenRouter API Key</div>
                <input type="password" id="aiApiKeyOpenrouter" class="prop-input"
                  placeholder="Paste OpenRouter key..." />
              </div>
              <div>
                <div class="prop-label" style="font-size: 10px;">Model Filter (e.g. "free", "flash", "gpt-4")</div>
                <div style="display:flex; gap:4px; align-items: center;">
                  <input type="text" id="aiModelFilter" class="prop-input" placeholder="Filter models..."
                    style="flex:1;" />
                  <button id="aiRefreshModelsBtn" class="btn btn-secondary btn-xs">Test & Load Models</button>
                  <div id="aiTestResult" style="font-size:10px; line-height: 1.2;"></div>
                </div>
              </div>
              <div>
                <div class="prop-label" style="font-size: 10px;">Selected Model</div>
                <select id="aiModelSelect" class="prop-input"></select>
              </div>
            </div>
          </div>
        </div>

        <!-- CATEGORY: SHORTCUTS -->
        <div class="settings-category collapsible" data-category="shortcuts">
          <div class="settings-category-header">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="mdi mdi-keyboard-outline"></span>
              <span>Keyboard Shortcuts</span>
            </div>
            <span class="mdi mdi-chevron-down category-chevron"></span>
          </div>
          <div class="settings-category-content">
            <div class="shortcuts-grid">
              <div class="shortcut-item"><span class="shortcut-label">Undo</span><span
                  class="shortcut-key"><kbd>Ctrl+Z</kbd></span></div>
              <div class="shortcut-item"><span class="shortcut-label">Redo</span><span
                  class="shortcut-key"><kbd>Ctrl+Y</kbd></span></div>
              <div class="shortcut-item"><span class="shortcut-label">Copy</span><span
                  class="shortcut-key"><kbd>Ctrl+C</kbd></span></div>
              <div class="shortcut-item"><span class="shortcut-label">Paste</span><span
                  class="shortcut-key"><kbd>Ctrl+V</kbd></span></div>
              <div class="shortcut-item"><span class="shortcut-label">Delete</span><span
                  class="shortcut-key"><kbd>DEL</kbd></span></div>
              <div class="shortcut-item"><span class="shortcut-label">Lock/Unlock</span><span
                  class="shortcut-key"><kbd>Ctrl+L</kbd></span></div>
              <div class="shortcut-item"><span class="shortcut-label">Search</span><span
                  class="shortcut-key"><kbd>Shift+Space</kbd></span></div>
              <div class="shortcut-item"><span class="shortcut-label">Debug Mode</span><span
                  class="shortcut-key"><kbd>D</kbd></span></div>
              <div class="shortcut-item"><span class="shortcut-label">Design Grid</span><span
                  class="shortcut-key"><kbd>G</kbd></span></div>
              <div class="shortcut-item"><span class="shortcut-label">Rulers</span><span
                  class="shortcut-key"><kbd>R</kbd></span></div>
              <div class="shortcut-item"><span class="shortcut-label">Zoom Reset</span><span
                  class="shortcut-key"><kbd>Ctrl+R</kbd></span></div>
              <div class="shortcut-item"><span class="shortcut-label">Snap Off</span><span
                  class="shortcut-key"><kbd>ALT</kbd></span></div>
              <div class="shortcut-item"><span class="shortcut-label">Distances</span><span
                  class="shortcut-key"><kbd>CTRL Drag</kbd></span></div>
              <div class="shortcut-item"><span class="shortcut-label">Group</span><span
                  class="shortcut-key"><kbd>Ctrl+G</kbd></span></div>
              <div class="shortcut-item"><span class="shortcut-label">Ungroup</span><span
                  class="shortcut-key"><kbd>Ctrl+Shift+G</kbd></span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-actions">
        <button id="editorSettingsDone" class="btn btn-secondary">Done</button>
      </div>
    </div>
  </div>

  <!-- AI Prompt Modal -->
  <div id="aiPromptModal" class="modal-backdrop hidden">
    <div class="modal" style="max-width: 600px;">
      <div class="modal-header">
        <div>AI Design Assistant</div>
        <button id="aiPromptClose" class="btn btn-secondary">Close</button>
      </div>
      <div class="modal-body">
        <div id="aiConfigWarning"
          style="background: rgba(82, 199, 234, 0.1); border-left: 3px solid var(--accent); padding: 10px; border-radius: 4px; font-size: 11px; margin-bottom: 12px; line-height: 1.4;">
          <strong>💡 Configuration Required:</strong><br>
          An API provider and key must be configured in <strong>Editor Settings</strong> before using the AI
          Assistant.
          <button
            onclick="window.openEditorSettingsModal('ai'); document.getElementById('aiPromptModal').classList.add('hidden');"
            class="btn btn-secondary btn-xs" style="margin-top:8px; display:block;">⚙ Open Editor
            Settings</button>
        </div>
        <div style="font-size: 11px; color: var(--muted); margin-bottom: 12px;">
          Describe what you want to change. Example: "Move the selected widget 50px right" or "Make a nice weather
          layout with 4 days forecast".
        </div>
        <textarea id="aiPromptInput" class="prop-input"
          style="height: 120px; font-size: 14px; line-height: 1.5; padding: 12px;"
          placeholder="I want to..."></textarea>

        <div id="aiPromptStatus" style="margin-top: 12px; font-size: 11px; min-height: 1.2em;"></div>

        <div id="aiPreviewDiff"
          style="display:none; margin-top:16px; border: 1px solid var(--border-subtle); border-radius: 8px; overflow: hidden;">
          <div
            style="background: rgba(255,255,255,0.03); padding: 8px 12px; font-size: 10px; font-weight: 600; border-bottom: 1px solid var(--border-subtle);">
            PREVIEW CHANGES</div>
          <div id="aiDiffContent"
            style="padding: 12px; font-family: monospace; font-size: 11px; max-height: 200px; overflow-y: auto; white-space: pre-wrap; background: var(--bg-input);">
          </div>
        </div>
      </div>
      <div class="modal-actions">
        <button id="aiPromptSubmit" class="btn btn-primary"
          style="background: var(--accent); color: white; border: none;">Generate</button>
        <button id="aiPromptApply" class="btn btn-success" style="display:none;">Apply</button>
      </div>
    </div>
  </div>

`,Yo=""+new URL("logo_header-CUGdaeC6.png",import.meta.url).href;function ze(t,e){const n=document.getElementById(t);n?n.outerHTML=e:console.warn(`[UI Injection] Placeholder #${t} not found in index.html.`)}function Vo(){console.log("[UI Injection] Loading modular UI components...");let t=Wo.replace("assets/logo_header.png",Yo);ze("header-placeholder",t),ze("sidebar-placeholder",$o),ze("code-panel-placeholder",zo),ze("properties-panel-placeholder",Uo),ze("modals-placeholder",jo),console.log("[UI Injection] Construction complete.")}Vo();const qo="modulepreload",Xo=function(t,e){return new URL(t,e).href},bn={},T=function(e,n,o){let i=Promise.resolve();if(n&&n.length>0){const r=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),l=a?.nonce||a?.getAttribute("nonce");i=Promise.allSettled(n.map(c=>{if(c=Xo(c,o),c in bn)return;bn[c]=!0;const d=c.endsWith(".css"),u=d?'[rel="stylesheet"]':"";if(!!o)for(let f=r.length-1;f>=0;f--){const y=r[f];if(y.href===c&&(!d||y.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${u}`))return;const p=document.createElement("link");if(p.rel=d?"stylesheet":qo,d||(p.as="script"),p.crossOrigin="",p.href=c,l&&p.setAttribute("nonce",l),document.head.appendChild(p),d)return new Promise((f,y)=>{p.addEventListener("load",f),p.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${c}`)))})}))}function s(r){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=r,window.dispatchEvent(a),!a.defaultPrevented)throw r}return i.then(r=>{for(const a of r||[])a.status==="rejected"&&s(a.reason);return e().catch(s)})},_t=new EventTarget,C={STATE_CHANGED:"state-changed",SELECTION_CHANGED:"selection-changed",PAGE_CHANGED:"page-changed",HISTORY_CHANGED:"history-changed",SETTINGS_CHANGED:"settings-changed",LAYOUT_IMPORTED:"layout-imported",ENTITIES_LOADED:"entities-loaded",ZOOM_CHANGED:"zoom-changed"};function L(t,e={}){_t.dispatchEvent(new CustomEvent(t,{detail:e}))}function Y(t,e){_t.addEventListener(t,n=>e(n.detail))}function gi(t,e){_t.removeEventListener(t,e)}window.EVENTS=C;window.emit=L;window.on=Y;window.off=gi;const Ko=Object.freeze(Object.defineProperty({__proto__:null,EVENTS:C,EventBus:_t,emit:L,off:gi,on:Y},Symbol.toStringTag,{value:"Module"})),qt={WHITE:"#FFFFFF",BLACK:"#000000",GRAY:"#808080",GREY:"#808080",RED:"#FF0000",GREEN:"#00FF00",BLUE:"#0000FF",YELLOW:"#FFFF00",ORANGE:"#FFA500"},fi={GRID_SIZE:10,SNAP_THRESHOLD:10,SIDEBAR_WIDTH:300,PROPERTIES_WIDTH:350},mi={X:40,Y:40,WIDTH:200,HEIGHT:60},Xt={TOP_LEFT:"TOP_LEFT",TOP_CENTER:"TOP_CENTER",TOP_RIGHT:"TOP_RIGHT",CENTER_LEFT:"CENTER_LEFT",CENTER:"CENTER",CENTER_RIGHT:"CENTER_RIGHT",BOTTOM_LEFT:"BOTTOM_LEFT",BOTTOM_CENTER:"BOTTOM_CENTER",BOTTOM_RIGHT:"BOTTOM_RIGHT"},Kt={LANDSCAPE:"landscape",PORTRAIT:"portrait"},Jt={snapEnabled:!0,showGrid:!0,showDebugGrid:!1,showRulers:!1,gridOpacity:8,editor_light_mode:!1,aiProvider:"gemini",aiModelGemini:"gemini-1.5-flash",aiModelOpenAI:"gpt-4o",aiModelOpenRouter:"",aiModelFilter:"",extendedLatinGlyphs:!1,autoCycleEnabled:!1,autoCycleIntervalS:30,refreshInterval:600,manualRefreshOnly:!1,darkMode:!1,invertedColors:!1,lcdEcoStrategy:"backlight_off",dimTimeout:10,sleepEnabled:!1,sleepStartHour:0,sleepEndHour:5,deepSleepEnabled:!1,deepSleepInterval:600,dailyRefreshEnabled:!1,dailyRefreshTime:"08:00",noRefreshStartHour:null,noRefreshEndHour:null,renderingMode:"direct",oeplEntityId:"",oeplDither:2,opendisplayEntityId:"",opendisplayDither:2,opendisplayTtl:60,glyphsets:["GF_Latin_Kernel"]},Zt=50,yi={RSS:300,ENTITIES:60},_i=5e3,be=10,vi=10,Qt={white:"COLOR_WHITE",black:"COLOR_BLACK",gray:"Color(160, 160, 160)",grey:"Color(160, 160, 160)",red:"COLOR_RED",green:"COLOR_GREEN",blue:"COLOR_BLUE",yellow:"COLOR_YELLOW",orange:"COLOR_ORANGE"},en=800,tn=480;window.ESPHomeDesigner=window.ESPHomeDesigner||{version:"0.9.0",constants:{COLORS:qt,UI_DEFAULTS:fi,ALIGNMENT:Xt,ORIENTATIONS:Kt,DEFAULT_PREFERENCES:Jt,WIDGET_DEFAULTS:mi,HISTORY_LIMIT:Zt,CACHE_TTL:yi,ENTITY_LIMIT:_i,ESPHOME_COLOR_MAPPING:Qt,DEFAULT_CANVAS_WIDTH:en,DEFAULT_CANVAS_HEIGHT:tn,SNAP_DISTANCE:be,GRID_SIZE:vi}};window.COLORS=qt;window.UI_DEFAULTS=fi;window.ALIGNMENT=Xt;window.ORIENTATIONS=Kt;window.DEFAULT_PREFERENCES=Jt;window.WIDGET_DEFAULTS=mi;window.HISTORY_LIMIT=Zt;window.CACHE_TTL=yi;window.ENTITY_LIMIT=_i;window.ESPHOME_COLOR_MAPPING=Qt;window.DEFAULT_CANVAS_WIDTH=en;window.DEFAULT_CANVAS_HEIGHT=tn;window.SNAP_DISTANCE=be;window.GRID_SIZE=vi;var Jo={};const Zo=(typeof localStorage<"u"?localStorage.getItem("esphome-designer-debug"):Jo.DEBUG)==="true"||typeof window<"u"&&new URLSearchParams(window.location.search).get("debug")==="true",v={log:(...t)=>Zo&&console.log("[ESPHomeDesigner]",...t),warn:(...t)=>console.warn("[ESPHomeDesigner]",...t),error:(...t)=>console.error("[ESPHomeDesigner]",...t)},Qo=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Elecrow 7.0" HMI 800x480
#         - Display Platform: rpi_dpi_rgb (RGB LCD)
#         - PSRAM: Yes (Octal, 80MHz)
#         - Touchscreen: GT911 (I2C)
#         - Framework: ESP-IDF with execute_from_psram
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  platformio_options:
    build_flags: "-DBOARD_HAS_PSRAM"
    board_build.esp-idf.memory_type: qio_opi
    board_build.flash_mode: dio
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  board: esp32-s3-devkitc-1
  variant: esp32s3
  flash_size: 16MB
  framework:
    type: esp-idf
    advanced:
       execute_from_psram: true
    sdkconfig_options:
      CONFIG_ESP32S3_DEFAULT_CPU_FREQ_240: y
      CONFIG_ESP32S3_DATA_CACHE_64KB: y
      CONFIG_SPIRAM_FETCH_INSTRUCTIONS: y
      CONFIG_SPIRAM_RODATA: y

psram:
  mode: octal
  speed: 80MHz

preferences:
  flash_write_interval: 5min

output:
  - platform: ledc
    pin: GPIO2
    frequency: 1220
    id: gpio_backlight_pwm

light:
  - platform: monochromatic
    output: gpio_backlight_pwm
    name: Display Backlight
    icon: mdi:lightbulb-on
    id: display_backlight
    restore_mode: ALWAYS_ON

i2c:
  - id: bus_a
    sda: GPIO19
    scl: GPIO20
    scan: true

touchscreen:
  - platform: gt911
    id: my_touchscreen
    i2c_id: bus_a
    transform:
      mirror_x: false
      mirror_y: false
    update_interval: 50ms
    address: 0x5D
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight

display:
  - platform: rpi_dpi_rgb
    id: my_display
    data_pins:
      red:
        - 14
        - 21
        - 47
        - 48
        - 45
      green:
        - 9
        - 46
        - 3
        - 8
        - 16
        - 1
      blue:
        - 15
        - 7
        - 6
        - 5
        - 4
    de_pin: GPIO41
    hsync_pin: 39
    vsync_pin: 40
    pclk_pin: 0
    hsync_front_porch: 40
    hsync_pulse_width: 48
    hsync_back_porch: 13
    vsync_front_porch: 1
    vsync_pulse_width: 31
    vsync_back_porch: 13
    pclk_inverted: true
    color_order: RGB
    auto_clear_enabled: false
    update_interval: never
    dimensions:
      width: 800
      height: 480
    # __LAMBDA_PLACEHOLDER__
`,es=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Guition jc4827w543 4.3" IPS 480x272
#         - Display Platform: qspi_dbi (NV3041A)
#         - PSRAM: Yes (Octal, 80MHz)
#         - Touchscreen: GT911 (I2C)
#         - Framework: ESP-IDF with execute_from_psram
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  project:
    name: "Guition.ESP32-jc4827w543"
    version: "1.0"
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  variant: esp32s3
  flash_size: 4MB
  framework:
    type: esp-idf
    advanced:
       execute_from_psram: true

psram:
  mode: octal
  speed: 80MHz

preferences:
  flash_write_interval: 5min

output:
  - platform: ledc
    pin: 1
    id: gpio_backlight_pwm
    frequency: 1000Hz

light:
  - platform: monochromatic
    output: gpio_backlight_pwm
    name: Display Backlight
    icon: mdi:lightbulb-on
    id: display_backlight
    restore_mode: ALWAYS_ON

i2c:
  - id: bus_a
    sda: GPIO8
    scl: GPIO4
    scan: true

touchscreen:
  - platform: gt911
    id: my_touchscreen
    i2c_id: bus_a
    interrupt_pin:
      number: 3
      ignore_strapping_warning: true
    reset_pin: GPIO38
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight

spi:
  id: quad_spi
  type: quad
  clk_pin: GPIO47
  data_pins: [21,48,40,39]

display:
  - platform: qspi_dbi
    id: my_display
    update_interval: never
    auto_clear_enabled: False
    model: CUSTOM
    data_rate: 20MHz
    dimensions:
      width: 480
      height: 272
    cs_pin:
      number: 45
      ignore_strapping_warning: true
    invert_colors: true
    rotation: 180
    init_sequence:
      - [0xff,0xa5]
      - [0x36,0xc0]
      - [0x3A,0x01]
      - [0x41,0x03]
      - [0x44,0x15]
      - [0x45,0x15]
      - [0x7d,0x03]
      - [0xc1,0xbb]
      - [0xc2,0x05]
      - [0xc3,0x10]
      - [0xc6,0x3e]
      - [0xc7,0x25]
      - [0xc8,0x11]
      - [0x7a,0x5f]
      - [0x6f,0x44]
      - [0x78,0x70]
      - [0xc9,0x00]
      - [0x67,0x21]
      - [0x51,0x0a]
      - [0x52,0x76]
      - [0x53,0x0a]
      - [0x54,0x76]
      - [0x46,0x0a]
      - [0x47,0x2a]
      - [0x48,0x0a]
      - [0x49,0x1a]
      - [0x56,0x43]
      - [0x57,0x42]
      - [0x58,0x3c]
      - [0x59,0x64]
      - [0x5a,0x41]
      - [0x5b,0x3c]
      - [0x5c,0x02]
      - [0x5d,0x3c]
      - [0x5e,0x1f]
      - [0x60,0x80]
      - [0x61,0x3f]
      - [0x62,0x21]
      - [0x63,0x07]
      - [0x64,0xe0]
      - [0x65,0x02]
      - [0xca,0x20]
      - [0xcb,0x52]
      - [0xcc,0x10]
      - [0xcd,0x42]
      - [0xd0,0x20]
      - [0xd1,0x52]
      - [0xd2,0x10]
      - [0xd3,0x42]
      - [0xd4,0x0a]
      - [0xd5,0x32]
      - [0x80,0x00]
      - [0xa0,0x00]
      - [0x81,0x07]
      - [0xa1,0x06]
      - [0x82,0x02]
      - [0xa2,0x01]
      - [0x86,0x11]
      - [0xa6,0x10]
      - [0x87,0x27]
      - [0xa7,0x27]
      - [0x83,0x37]
      - [0xa3,0x37]
      - [0x84,0x35]
      - [0xa4,0x35]
      - [0x85,0x3f]
      - [0xa5,0x3f]
      - [0x88,0x0b]
      - [0xa8,0x0b]
      - [0x89,0x14]
      - [0xa9,0x14]
      - [0x8a,0x1a]
      - [0xaa,0x1a]
      - [0x8b,0x0a]
      - [0xab,0x0a]
      - [0x8c,0x14]
      - [0xac,0x08]
      - [0x8d,0x17]
      - [0xad,0x07]
      - [0x8e,0x16]
      - [0xae,0x06]
      - [0x8f,0x1B]
      - [0xaf,0x07]
      - [0x90,0x04]
      - [0xb0,0x04]
      - [0x91,0x0a]
      - [0xb1,0x0a]
      - [0x92,0x16]
      - [0xb2,0x15]
      - [0xff,0x00]
      - [0x11,0x00]
      - [0x29,0x00]
    # __LAMBDA_PLACEHOLDER__
`,ts=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Guition jc8048w535 3.5" IPS 480x320
#         - Display Platform: qspi_dbi
#         - PSRAM: Yes (Octal, 80MHz)
#         - Touchscreen: AXS15231 (I2C)
#         - Framework: ESP-IDF with execute_from_psram
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  project:
    name: "Guition.ESP32-jc8048w535"
    version: "1.0"
  platformio_options:
    upload_speed: 921600
    board_build.flash_mode: dio
    board_build.f_flash: 80000000L
    board_build.f_cpu: 240000000L
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  variant: esp32s3
  flash_size: 16MB
  framework:
    type: esp-idf
    advanced:
       execute_from_psram: true

psram:
  mode: octal
  speed: 80MHz

preferences:
  flash_write_interval: 5min

output:
  - platform: ledc
    pin: 1
    id: gpio_backlight_pwm

light:
  - platform: monochromatic
    output: gpio_backlight_pwm
    name: Display Backlight
    icon: mdi:lightbulb-on
    id: display_backlight
    restore_mode: ALWAYS_ON

i2c:
  - id: bus_a
    sda: GPIO4
    scl: GPIO8
    scan: true

touchscreen:
  - platform: axs15231
    id: my_touchscreen
    i2c_id: bus_a
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight

spi:
  - type: quad
    clk_pin: GPIO47
    data_pins: [21, 48, 40, 39]
    
display:
  - id: my_display
    platform: qspi_dbi
    dimensions:
      height: 480
      width: 320
    model: CUSTOM
    data_rate: 40MHz
    cs_pin:
      number: 45
      ignore_strapping_warning: true
    draw_from_origin: true
    update_interval: never
    auto_clear_enabled: false
    # __LAMBDA_PLACEHOLDER__
`,ns=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Guition JC8048W550 5.0" 800x480
#         - Display Platform: rpi_dpi_rgb (RGB 565)
#         - PSRAM: Yes (Octal)
#         - Touch: GT911 (I2C)
#         - Framework: ESP-IDF
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  project:
    name: "Guition.ESP32-jc8048w550"
    version: "1.0"
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  variant: esp32s3
  flash_size: 16MB
  framework:
    type: esp-idf
    advanced:
       execute_from_psram: true

psram:
  mode: octal
  speed: 80MHz

preferences:
  flash_write_interval: 5min

# -------------------------------------------
# Internal outputs
# -------------------------------------------
output:
  # Backlight LED
  - platform: ledc
    pin:
      number: GPIO02
    id: gpio_backlight_pwm
    frequency: 1220Hz

light:
  - platform: monochromatic
    output: gpio_backlight_pwm
    name: Display Backlight
    icon: mdi:lightbulb-on
    id: display_backlight
    restore_mode: ALWAYS_ON

#-------------------------------------------
# Touchscreen gt911 i2c
#-------------------------------------------
i2c:
  - id: bus_a
    sda: GPIO19
    scl: GPIO20
    scan: true

touchscreen:
  - platform: gt911
    id: my_touchscreen
    i2c_id: bus_a
    address: 0x5D
    update_interval: 16ms
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight

#-------------------------------------------
# Display
#-------------------------------------------
display:
  - platform: rpi_dpi_rgb
    id: my_display
    color_order: RGB
    invert_colors: True
    update_interval: never
    auto_clear_enabled: false # takes 2.8 seconds to clear the display
    dimensions:
      width: 800
      height: 480
    de_pin: GPIO40
    hsync_pin: GPIO39
    vsync_pin: GPIO41
    pclk_pin: GPIO42
    pclk_frequency: 16MHz
    data_pins:
      red:
        - 45
        - 48
        - 47
        - 21
        - 14
      green:
        - 5
        - 6
        - 7
        - 15
        - 16
        - 4
      blue:
        - 8
        - 3
        - 46
        - 9
        - 1


    # __LAMBDA_PLACEHOLDER__`,is=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Guition jc4848s040 4.0" IPS 480x480
#         - Display Platform: st7701s (SPI/RGB)
#         - PSRAM: Yes (Octal, 80MHz)
#         - Touchscreen: GT911
#         - Framework: ESP-IDF with execute_from_psram
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  project:
    name: "Guition.ESP32-S3-4848S040"
    version: "1.0"
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  variant: esp32s3
  flash_size: 16MB
  framework:
    type: esp-idf
    advanced:
       execute_from_psram: true

psram:
  mode: octal
  speed: 80MHz

preferences:
  flash_write_interval: 5min

output:
  - platform: ledc
    pin: GPIO38  
    id: gpio_backlight_pwm
    frequency: 100Hz
  - id: internal_relay_1
    platform: gpio
    pin: GPIO40
  - id: internal_relay_2
    platform: gpio
    pin: GPIO02
  - id: internal_relay_3
    platform: gpio
    pin: GPIO01

light:
  - platform: monochromatic
    output: gpio_backlight_pwm
    name: Display Backlight
    icon: mdi:lightbulb-on
    id: display_backlight
    restore_mode: ALWAYS_ON

i2c:
  - id: bus_a
    sda: GPIO19
    scl: GPIO45
    scan: true

touchscreen:
  platform: gt911
  id: my_touchscreen
  i2c_id: bus_a
  transform:
    mirror_x: false
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight

spi:
  - id: lcd_spi
    clk_pin: GPIO48
    mosi_pin: GPIO47

display:
  - platform: st7701s
    id: my_display
    update_interval: never
    auto_clear_enabled: False
    spi_mode: MODE3
    data_rate: 2MHz
    color_order: RGB
    invert_colors: False
    dimensions:
      width: 480
      height: 480
    cs_pin: GPIO39
    de_pin: GPIO18
    hsync_pin: GPIO16
    vsync_pin: GPIO17
    pclk_pin: GPIO21
    pclk_frequency: 12MHz
    pclk_inverted: False
    hsync_pulse_width: 8
    hsync_front_porch: 10
    hsync_back_porch: 20
    vsync_pulse_width: 8
    vsync_front_porch: 10
    vsync_back_porch: 10
    init_sequence:
      - 1
      - [ 0xFF, 0x77, 0x01, 0x00, 0x00, 0x10 ]
      - [ 0xCD, 0x00 ]
    data_pins:
      red: [11, 12, 13, 14, 0]
      green: [8, 20, 3, 46, 9, 10]
      blue: [4, 5, 6, 7, 15]
    # __LAMBDA_PLACEHOLDER__
`,os=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: LilyGo T-Display S3 170x320
#         - Display Platform: ili9xxx (ST7789V via I80)
#         - PSRAM: Yes (Octal)
#         - Buttons: GPIO0, GPIO14
#         - Framework: ESP-IDF
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  platformio_options:
    build_unflags: -Werror=all
    board_build.flash_mode: dio
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

external_components:
 - source: github://clydebarrow/esphome@i8080
   components: [ i80, io_bus, ili9xxx, spi ]

esp32:
  board: esp32-s3-devkitc-1
  variant: esp32s3
  framework:
    type: esp-idf

psram:
  speed: 80MHz
  mode: octal

preferences:
  flash_write_interval: 5min

power_supply:
  - id: lcd_pwr
    enable_on_boot: true
    pin: GPIO15

i80:
  dc_pin: 7
  wr_pin: 8
  rd_pin: 9
  data_pins:
    - 39
    - 40
    - 41
    - 42
    -
      ignore_strapping_warning: true
      number: 45
    -
      ignore_strapping_warning: true
      number: 46
    - 47
    - 48

i2c:
  - id: bus_a
    sda: 17
    scl: 18

display:
  - platform: ili9xxx
    id: my_display
    rotation: 270
    bus_type: i80
    cs_pin: 6
    reset_pin: 5
    model: st7789v
    data_rate: 2MHz
    dimensions:
      height: 320
      width: 170
      offset_width: 35
      offset_height: 0
    color_order: bgr
    invert_colors: true
    auto_clear_enabled: false
    update_interval: never
    # __LAMBDA_PLACEHOLDER__

binary_sensor:
  - platform: gpio
    pin:
      number: GPIO0
      inverted: true
    name: "Button 1"
  - platform: gpio
    pin:
      number: GPIO14
      inverted: true
    name: "Button 2"

output:
  - platform: ledc
    pin: GPIO38
    id: GPIO38
    frequency: 2000

light:
  - platform: monochromatic
    output: GPIO38
    name: Display Backlight
    icon: mdi:lightbulb-on
    id: display_backlight
    restore_mode: ALWAYS_ON
`,ss=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Seeedstudio SenseCAP Indicator
# Name: Seeedstudio SenseCAP Indicator
# Resolution: 480x480
# Shape: rect
# Orientation: landscape
# Inverted: false
# Dark Mode: enabled
# Refresh Interval: 300
#
# Hardware Details:
# - MCU: ESP32-S3 (WIFI/BLE/Display/Touch) + RP2040 (Sensors/Audio/LoRa)
# - Display: ST7701 4.0" 480x480 IPS (3-wire SPI + RGB)
# - Touch: FT5x06 (I2C) - FT6336
# - IO Expander: PCA9535 (I2C-0x20)
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE everything below into your device YAML
#
# ============================================================================

esphome:
  name: seeedstudio-sensecap-indicator
  friendly_name: Seeedstudio SenseCAP Indicator
  min_version: 2024.11.0

esp32:
  variant: esp32s3
  flash_size: 8MB
  framework:
    type: esp-idf
    sdkconfig_options:
      CONFIG_ESPTOOLPY_FLASHSIZE_8MB: y
      CONFIG_ESP32S3_DEFAULT_CPU_FREQ_240: y
      CONFIG_ESP32S3_DATA_CACHE_64KB: y
      CONFIG_SPIRAM_FETCH_INSTRUCTIONS: y
      CONFIG_SPIRAM_RODATA: y

psram:
  mode: octal
  speed: 80MHz

logger:
  hardware_uart: UART0
  level: DEBUG

# I2C Bus for IO Expander and Touchscreen
i2c:
  - id: bus_a
    sda: GPIO39
    scl: GPIO40
    scan: false

# SPI Bus for Display and LoRa (if present)
spi:
  - id: lcd_spi
    clk_pin: GPIO41
    mosi_pin: GPIO48
    miso_pin: GPIO47

# IO Expander (16-bit PCA9535)
pca9554:
  - id: pca9554a_device
    address: 0x20
    pin_count: 16

# Display Backlight
output:
  - platform: ledc
    pin:
      number: GPIO45
      ignore_strapping_warning: true
    id: ledc_gpio45
    frequency: 100Hz

light:
  - platform: monochromatic
    name: "Backlight"
    id: backlight
    output: ledc_gpio45
    restore_mode: ALWAYS_ON

# User Button
binary_sensor:
  - platform: gpio
    pin:
      number: GPIO38
      inverted: true
    name: "User Button"
  # __TOUCH_SENSORS_PLACEHOLDER__

# Display - Using mipi_rgb platform (recommended, pre-configured)
display:
  - platform: mipi_rgb
    model: SEEED-INDICATOR-D1
    id: my_display
    auto_clear_enabled: true
    lambda: |-
      # __LAMBDA_PLACEHOLDER__

# Touchscreen
touchscreen:
  platform: ft5x06
  id: my_touchscreen
  transform:
    mirror_x: true
    mirror_y: true

# Enable Home Assistant API
api:

# HA Control Buttons for page navigation
button:
  - platform: template
    name: "Next Page"
    icon: "mdi:arrow-right"
    on_press:
      then:
        - script.execute:
            id: change_page_to
            target_page: !lambda 'return id(display_page) + 1;'
  - platform: template
    name: "Previous Page"
    icon: "mdi:arrow-left"
    on_press:
      then:
        - script.execute:
            id: change_page_to
            target_page: !lambda 'return id(display_page) - 1;'
  - platform: template
    name: "Refresh Display"
    icon: "mdi:refresh"
    on_press:
      then:
        - component.update: my_display
  - platform: template
    name: "Go to Page 1"
    icon: "mdi:home"
    on_press:
      then:
        - script.execute:
            id: change_page_to
            target_page: 0
`,rs=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Sunton 2432s028 2.8" 240x320
#         - Display Platform: ili9xxx (TFT 2.4R)
#         - Touchscreen: XPT2046 (SPI)
#         - RGB LED: Yes
#         - Framework: Arduino
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32
#         - Framework: Arduino
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  board: esp32dev
  framework:
    type: arduino

preferences:
  flash_write_interval: 5min

i2c:
  - sda: 27
    scl: 22

output:
  - platform: ledc
    pin: 21
    id: gpio_backlight_pwm
  - id: output_red
    platform: ledc
    pin: 4
    inverted: true
  - id: output_green
    platform: ledc
    pin: 16
    inverted: true
  - id: output_blue
    platform: ledc
    pin: 17
    inverted: true

light:
  - platform: monochromatic
    output: gpio_backlight_pwm
    name: Display Backlight
    icon: mdi:lightbulb-on
    id: display_backlight
    restore_mode: ALWAYS_ON
  - platform: rgb
    id: rgb_led
    name: RGB LED
    red: output_red
    green: output_green
    blue: output_blue
    restore_mode: ALWAYS_OFF

spi:
  - id: tft
    clk_pin: 14
    mosi_pin: 13
    miso_pin:
      number: 12
      ignore_strapping_warning: true
  - id: touch
    clk_pin: 25
    mosi_pin: 32
    miso_pin: 39

touchscreen:
  - id: my_touchscreen
    platform: xpt2046
    spi_id: touch
    cs_pin: 33
    interrupt_pin: 36
    threshold: 400
    calibration:
      x_min: 280
      x_max: 3860
      y_min: 340
      y_max: 3860
    transform:
      mirror_x: false
      mirror_y: true
      swap_xy: false
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight

display:
  - id: my_display
    platform: ili9xxx
    model: TFT 2.4R
    spi_id: tft
    cs_pin:
      number: 15
      ignore_strapping_warning: true
    dc_pin:
      number: 2
      ignore_strapping_warning: true
    invert_colors: true
    color_palette: 8BIT
    update_interval: never
    auto_clear_enabled: false
    transform:
      swap_xy: true
      mirror_x: false
    dimensions:
      height: 320
      width: 240
    # __LAMBDA_PLACEHOLDER__
`,as=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Sunton 2432s028R 2.8" 240x320 (Resistive)
#         - Display Platform: ili9xxx (ILI9341)
#         - Touchscreen: XPT2046 (SPI Resistive)
#         - RGB LED: Yes
#         - Framework: ESP-IDF
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32
#         - Framework: ESP-IDF
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  board: esp32dev
  framework:
    type: esp-idf

preferences:
  flash_write_interval: 5min

i2c:
  - sda: 27
    scl: 22

output:
  - platform: ledc
    pin: 21
    frequency: 1000hz
    id: gpio_backlight_pwm
  - id: output_red
    platform: ledc
    pin: 4
    inverted: true
  - id: output_green
    platform: ledc
    pin: 16
    inverted: true
  - id: output_blue
    platform: ledc
    pin: 17
    inverted: true

light:
  - platform: monochromatic
    output: gpio_backlight_pwm
    name: Display Backlight
    icon: mdi:lightbulb-on    
    id: display_backlight
    restore_mode: ALWAYS_ON
  - platform: rgb
    id: rgb_led
    name: RGB LED
    red: output_red
    green: output_green
    blue: output_blue
    restore_mode: ALWAYS_OFF

spi:
  - id: tft
    clk_pin: 14
    mosi_pin: 13
    miso_pin:
      number: 12
      ignore_strapping_warning: true
  - id: touch
    clk_pin: 25
    mosi_pin: 32
    miso_pin: 39

touchscreen:
  - id: my_touchscreen
    platform: xpt2046
    spi_id: touch
    cs_pin: 33
    interrupt_pin: 36
    threshold: 400
    calibration:
      x_min: 280
      x_max: 3860
      y_min: 340
      y_max: 3860
    transform:
      mirror_x: true
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight

display:
  - id: my_display
    platform: ili9xxx
    model: ILI9341
    spi_id: tft
    cs_pin:
      number: 15
      ignore_strapping_warning: true
    dc_pin:
      number: 2
      ignore_strapping_warning: true
    invert_colors: false
    update_interval: never
    auto_clear_enabled: false
    # __LAMBDA_PLACEHOLDER__
`,ls=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Sunton 4827s032R 4.3" 480x272 (Resistive)
#         - Display Platform: rpi_dpi_rgb (RGB LCD)
#         - PSRAM: Yes (Octal, 80MHz)
#         - Touchscreen: XPT2046 (SPI)
#         - Framework: ESP-IDF with execute_from_psram
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  platformio_options:
    build_flags: "-DBOARD_HAS_PSRAM"
    board_build.esp-idf.memory_type: qio_opi
    board_build.flash_mode: dio
    board_upload.maximum_ram_size: 524288
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  board: esp32-s3-devkitc-1
  variant: esp32s3
  flash_size: 16MB
  framework:
    type: esp-idf
    advanced:
       execute_from_psram: true
    sdkconfig_options:
      COMPILER_OPTIMIZATION_SIZE: y
      CONFIG_ESP32S3_DEFAULT_CPU_FREQ_240: y
      CONFIG_ESP32S3_DATA_CACHE_64KB: y
      CONFIG_ESP32S3_DATA_CACHE_LINE_64B: y
      CONFIG_SPIRAM_FETCH_INSTRUCTIONS: y
      CONFIG_SPIRAM_RODATA: y
      CONFIG_ESPTOOLPY_FLASHSIZE_16MB: y 
      
preferences:
  flash_write_interval: 5min      

psram:
  mode: octal
  speed: 80MHz

i2c:
  - id: bus_a
    sda: 19
    scl: 20

output:
  - platform: ledc
    pin: 2
    frequency: 1220
    id: gpio_backlight_pwm

light:
  - platform: monochromatic 
    output: gpio_backlight_pwm
    name: Display Backlight
    id: display_backlight
    restore_mode: ALWAYS_ON
    
spi:
  - id: spi_touch
    clk_pin: 12
    mosi_pin: 11
    miso_pin: 13 

touchscreen:
  - id: my_touchscreen
    platform: xpt2046
    spi_id: spi_touch
    cs_pin: 38
    interrupt_pin: 18
    update_interval: 100ms
    threshold: 400
    calibration:
      x_min: 300 
      x_max: 3700
      y_min: 300 
      y_max: 3700 
    transform:
      swap_xy: true 
      mirror_x: false
      mirror_y: true
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight

display:
  - id: my_display
    platform: rpi_dpi_rgb
    dimensions:
      width: 480 
      height: 280
    rotation: 90
    color_order: RGB
    de_pin: 40
    hsync_pin: 39
    vsync_pin: 41
    pclk_pin: 42
    pclk_inverted: true
    pclk_frequency: 14MHz 
    hsync_front_porch: 8
    hsync_pulse_width: 4
    hsync_back_porch: 43
    vsync_front_porch: 8
    vsync_pulse_width: 4
    vsync_back_porch: 12
    data_pins:
      red: [45, 48, 47, 21, 14]
      green: [5, 6, 7, 15, 16, 4]
      blue: [8, 3, 46, 9, 1]
    update_interval: never
    auto_clear_enabled: false
    # __LAMBDA_PLACEHOLDER__
`,ds=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Sunton 8048s050 5.0" 800x480
#         - Display Platform: rpi_dpi_rgb (RGB LCD)
#         - PSRAM: Yes (Octal, 80MHz)
#         - Touchscreen: GT911 (I2C)
#         - Framework: ESP-IDF with execute_from_psram
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  project:
    name: "Sunton.ESP32-S3-8048S050"
    version: "1.0"
  platformio_options:
    build_flags: "-DBOARD_HAS_PSRAM"
    board_build.esp-idf.memory_type: qio_opi
    board_build.flash_mode: dio
    board_upload.maximum_ram_size: 524288
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  board: esp32-s3-devkitc-1
  variant: esp32s3
  flash_size: 16MB
  framework:
    type: esp-idf
    advanced:
       execute_from_psram: true

preferences:
  flash_write_interval: 5min

psram:
  mode: octal
  speed: 80MHz

output:
  - platform: ledc
    pin: 2
    frequency: 1220
    id: gpio_backlight_pwm

light:
  - platform: monochromatic
    output: gpio_backlight_pwm
    name: Display Backlight
    icon: mdi:lightbulb-on
    id: display_backlight
    restore_mode: ALWAYS_ON

i2c:
  - id: bus_a
    sda: 19
    scl: 20
    scan: true

touchscreen:
  - platform: gt911
    id: my_touchscreen
    i2c_id: bus_a
    address: 0x5D
    update_interval: 16ms
    transform:
      mirror_x: true
      swap_xy: true
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight

display:
  - platform: rpi_dpi_rgb
    id: my_display
    dimensions:
      width: 800
      height: 480
    rotation: 90
    color_order: RGB
    de_pin: 40
    hsync_pin: 39
    vsync_pin: 41
    pclk_pin: 42
    pclk_inverted: true
    pclk_frequency: 14MHz
    hsync_front_porch: 8
    hsync_pulse_width: 4
    hsync_back_porch: 8
    vsync_front_porch: 8
    vsync_pulse_width: 4
    vsync_back_porch: 8
    data_pins:
      red: [45, 48, 47, 21, 14]
      green: [5, 6, 7, 15, 16, 4]
      blue: [8, 3, 46, 9, 1]
    update_interval: never
    auto_clear_enabled: false
    # __LAMBDA_PLACEHOLDER__
`,cs=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Sunton 8048s070 7.0" 800x480
#         - Display Platform: rpi_dpi_rgb (RGB LCD)
#         - PSRAM: Yes (Octal, 80MHz)
#         - Touchscreen: GT911 (I2C)
#         - Audio: I2S Speaker
#         - Framework: ESP-IDF with execute_from_psram
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  project:
    name: "Sunton.ESP32-S3-8048S070"
    version: "1.0"
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  variant: esp32s3
  flash_size: 16MB
  framework:
    type: esp-idf
    advanced:
       execute_from_psram: true

psram:
  mode: octal
  speed: 80MHz

preferences:
  flash_write_interval: 5min

i2s_audio:
    i2s_lrclk_pin: 18
    i2s_bclk_pin:
      number: 0
      ignore_strapping_warning: true

output:
  - platform: ledc
    id: gpio_backlight_pwm
    pin: GPIO02
    frequency: 1220

light:
  - platform: monochromatic
    output: gpio_backlight_pwm
    name: Display Backlight
    icon: mdi:lightbulb-on
    id: display_backlight
    restore_mode: ALWAYS_ON

i2c:
  - id: bus_a
    sda: 19
    scl: 20

touchscreen:
  platform: gt911
  id: my_touchscreen
  i2c_id: bus_a
  transform:
    mirror_x: false
    mirror_y: false
  on_release:
    - if:
        condition: lvgl.is_paused
        then:
          - lvgl.resume:
          - lvgl.widget.redraw:
          - light.turn_on: display_backlight

display:
  - platform: rpi_dpi_rgb
    id: my_display
    color_order: RGB
    invert_colors: True
    update_interval: never
    auto_clear_enabled: false
    dimensions:
      width: 800
      height: 480
    de_pin: 41
    hsync_pin: 39
    vsync_pin: 40
    pclk_pin: 42
    pclk_frequency: 16MHz
    pclk_inverted: True
    hsync_pulse_width: 30
    hsync_front_porch: 210
    hsync_back_porch: 16
    vsync_pulse_width: 13
    vsync_front_porch: 22
    vsync_back_porch: 10
    data_pins:
      red: [14, 21, 47, 48, 45]
      green: [9, 46, 3, 8, 16, 1]
      blue: [15, 7, 6, 5, 4]
    # __LAMBDA_PLACEHOLDER__
`,ps=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Waveshare Touch LCD 4.3 4.3" 800x480
#         - Display Platform: rpi_dpi_rgb
#         - PSRAM: Yes (Octal, 80MHz)
#         - Touchscreen: GT911 (I2C via CH422G)
#         - Framework: ESP-IDF with execute_from_psram
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  platformio_options:
    board_build.flash_mode: dio
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  board: esp32-s3-devkitc-1
  variant: esp32s3
  flash_size: 16MB
  framework:
    type: esp-idf
    advanced:
       execute_from_psram: true
    sdkconfig_options:
      CONFIG_ESP32S3_DEFAULT_CPU_FREQ_240: "y"
      CONFIG_ESP32S3_DATA_CACHE_64KB: "y"
      CONFIG_SPIRAM_FETCH_INSTRUCTIONS: y
      CONFIG_SPIRAM_RODATA: y

psram:
  mode: octal
  speed: 80MHz

preferences:
  flash_write_interval: 5min

ch422g:
  - id: ch422g_hub

switch:
  - platform: gpio
    id: lcdbacklight
    name: lcdbacklight
    pin:
      ch422g: ch422g_hub
      number: 2
      mode:
        output: true
      inverted: false
    restore_mode: ALWAYS_ON

light:
  - platform: monochromatic
    name: "Display Backlight"
    output: fake_backlight_output
    id: display_backlight
    default_transition_length: 1s
    gamma_correct: 2.8

output:
  - platform: template
    id: fake_backlight_output
    type: float
    write_action:
      - lambda: |-
          ESP_LOGD("fake_light", "Fake brightness level: %.2f", state);

i2c:
  - id: bus_a
    sda: 8
    scl: 9

touchscreen:
  - platform: gt911
    id: my_touchscreen
    i2c_id: bus_a
    interrupt_pin: 4
    reset_pin:
      ch422g: ch422g_hub
      number: 1
    transform:
      swap_xy: true
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight

display:
  - platform: rpi_dpi_rgb
    id: my_display
    update_interval: 1s
    auto_clear_enabled: true
    color_order: RGB
    pclk_frequency: 16MHz
    dimensions:
      width: 800
      height: 480
    reset_pin:
      ch422g: ch422g_hub
      number: 3
    enable_pin:
      ch422g: ch422g_hub
      number: 2
    de_pin:
      number: 5
    hsync_pin:
      number: 46
      ignore_strapping_warning: true
    vsync_pin:
      number: 3
      ignore_strapping_warning: true
    pclk_pin: 7
    hsync_back_porch: 30
    hsync_front_porch: 210
    hsync_pulse_width: 30
    vsync_back_porch: 4
    vsync_front_porch: 4
    vsync_pulse_width: 4
    data_pins:
      red: [1, 2, 42, 41, 40]
      blue: [14, 38, 18, 17, 10]
      green: [39, 0, 45, 48, 47, 21]
    # __LAMBDA_PLACEHOLDER__
`,us=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Waveshare Touch LCD 7 7.0" 800x480
#         - Display Platform: mipi_rgb (RGB LCD)
#         - PSRAM: Yes (Octal, 80MHz)
#         - Touchscreen: GT911 (I2C via CH422G)
#         - Framework: ESP-IDF with execute_from_psram
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# CAPTIVE PORTAL:
#         - If WiFi connection fails, look for a hotspot named:
#           "Waveshare-7-Inch"
#         - Connect and go to http://192.168.4.1 to configure WiFi.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  project:
    name: "Waveshare.ESP32-S3-touch-lcd-7"
    version: "1.0"
  platformio_options:
    board_upload.maximum_ram_size: 524288
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  variant: esp32s3
  flash_size: 16MB
  framework:
    type: esp-idf
    advanced:
       execute_from_psram: true

psram:
  mode: octal
  speed: 80Mhz

preferences:
  flash_write_interval: 5min

ch422g:
  - id: ch422g_hub

switch:
  - platform: gpio
    id: lcdbacklight
    name: lcdbacklight
    pin:
      ch422g: ch422g_hub
      number: 2
      mode:
        output: true
      inverted: false
    restore_mode: ALWAYS_ON

light:
  - platform: monochromatic
    name: "Display Backlight"
    output: fake_backlight_output
    id: display_backlight
    default_transition_length: 1s
    gamma_correct: 2.8

output:
  - platform: template
    id: fake_backlight_output
    type: float
    write_action:
      - lambda: |-
          ESP_LOGD("fake_light", "Fake brightness level: %.2f", state);

i2c:
  - id: bus_a
    sda: GPIO8
    scl: GPIO9
    scan: true

touchscreen:
  platform: gt911
  id: my_touchscreen
  i2c_id: bus_a
  interrupt_pin: GPIO4
  reset_pin:
    ch422g: ch422g_hub
    number: 1
    mode: OUTPUT
  transform:
    swap_xy: true
  on_release:
    - if:
        condition: lvgl.is_paused
        then:
          - lvgl.resume:
          - lvgl.widget.redraw:
          - light.turn_on: display_backlight

display:
  - platform: mipi_rgb
    model: ESP32-S3-TOUCH-LCD-7-800X480
    id: my_display
    rotation: 0
    update_interval: 1s
    auto_clear_enabled: true
    color_order: RGB
    pclk_frequency: 16MHZ
    dimensions:
      width: 800
      height: 480
    reset_pin:
      ch422g: ch422g_hub
      number: 3
    de_pin:
      number: GPIO5
    hsync_pin:
      number: GPIO46
      ignore_strapping_warning: true
    vsync_pin:
      number: GPIO3
      ignore_strapping_warning: true
    pclk_pin: GPIO7
    pclk_inverted: true
    hsync_back_porch: 8
    hsync_front_porch: 8
    hsync_pulse_width: 4
    vsync_back_porch: 8
    vsync_front_porch: 8
    vsync_pulse_width: 4
    data_pins:
      red: [1, 2, 42, 41, 40]
      blue: [14, 38, 18, 17, 10]
      green: [39, 0, 45, 48, 47, 21]
    # __LAMBDA_PLACEHOLDER__
`,hs=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Waveshare Universal e-Paper Raw Panel Driver Board
# Display: 7.5" e-Paper (V2)
# Resolution: 800x480
# Shape: rect
# Orientation: landscape
# Framework: ESP-IDF
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  project:
    name: "Waveshare.ESP32-Universal-epaper-7.5v2"
    version: "1.0"

esp32:
  board: esp32dev
  framework:
    type: esp-idf

spi:
  clk_pin: GPIO13
  mosi_pin: GPIO14

display:
  - platform: waveshare_epaper
    cs_pin: GPIO15
    dc_pin: GPIO27
    busy_pin: 
      number: GPIO25
      inverted: true
    reset_pin: GPIO26
    reset_duration: 10ms
    model: 7.50inv2p
    rotation: 0°
    update_interval: 5min
    id: my_display

    # __LAMBDA_PLACEHOLDER__
`;function nn(){let t=on();if(t)return t=t.trim(),t.includes("reterminal_dashboard")&&(v.log("[Env] Migrating legacy manual URL to new domain"),t=t.replace("reterminal_dashboard","esphome_designer"),sn(t)),t.endsWith("/")&&(t=t.slice(0,-1)),t&&!t.includes("/api/")&&(t+="/api/esphome_designer"),t;try{const e=window.location;return e.protocol==="file:"?null:e.hostname==="homeassistant"||e.hostname==="hassio"||e.pathname.includes("/api/")||e.pathname.includes("/local/")||e.pathname.includes("/hacsfiles/")||e.pathname.includes("/esphome-designer")?`${e.origin}/api/esphome_designer`:null}catch{return null}}function on(){try{return localStorage.getItem("ha_manual_url")}catch{return null}}function sn(t){try{if(t){let e=t.trim();e.endsWith("/")&&(e=e.slice(0,-1)),e.includes("/api/")||(e+="/api/esphome_designer"),localStorage.setItem("ha_manual_url",e)}else localStorage.removeItem("ha_manual_url")}catch(e){v.error("Failed to save HA URL:",e)}}function vt(){try{return localStorage.getItem("ha_llat_token")}catch{return null}}function bi(t){try{t?localStorage.setItem("ha_llat_token",t):localStorage.removeItem("ha_llat_token")}catch(e){v.error("Failed to save HA Token:",e)}}let X=nn();function Mt(){X=nn()}function z(){return!!X}function xi(){try{const t=window.location;return t.protocol==="file:"?!1:t.hostname==="homeassistant"||t.hostname==="hassio"||t.pathname.includes("/api/esphome_designer")||t.pathname.includes("/esphome-designer")}catch{return!1}}window.detectHaBackendBaseUrl=nn;window.getHaManualUrl=on;window.setHaManualUrl=sn;window.getHaToken=vt;window.setHaToken=bi;window.HA_API_BASE=X;window.refreshHaBaseUrl=Mt;window.hasHaBackend=z;window.isDeployedInHa=xi;/*! js-yaml 4.1.1 https://github.com/nodeca/js-yaml @license MIT */function wi(t){return typeof t>"u"||t===null}function gs(t){return typeof t=="object"&&t!==null}function fs(t){return Array.isArray(t)?t:wi(t)?[]:[t]}function ms(t,e){var n,o,i,s;if(e)for(s=Object.keys(e),n=0,o=s.length;n<o;n+=1)i=s[n],t[i]=e[i];return t}function ys(t,e){var n="",o;for(o=0;o<e;o+=1)n+=t;return n}function _s(t){return t===0&&Number.NEGATIVE_INFINITY===1/t}var vs=wi,bs=gs,xs=fs,ws=ys,Ss=_s,Es=ms,J={isNothing:vs,isObject:bs,toArray:xs,repeat:ws,isNegativeZero:Ss,extend:Es};function Si(t,e){var n="",o=t.reason||"(unknown reason)";return t.mark?(t.mark.name&&(n+='in "'+t.mark.name+'" '),n+="("+(t.mark.line+1)+":"+(t.mark.column+1)+")",!e&&t.mark.snippet&&(n+=`

`+t.mark.snippet),o+" "+n):o}function qe(t,e){Error.call(this),this.name="YAMLException",this.reason=t,this.mark=e,this.message=Si(this,!1),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack||""}qe.prototype=Object.create(Error.prototype);qe.prototype.constructor=qe;qe.prototype.toString=function(e){return this.name+": "+Si(this,e)};var ne=qe;function wt(t,e,n,o,i){var s="",r="",a=Math.floor(i/2)-1;return o-e>a&&(s=" ... ",e=o-a+s.length),n-o>a&&(r=" ...",n=o+a-r.length),{str:s+t.slice(e,n).replace(/\t/g,"→")+r,pos:o-e+s.length}}function St(t,e){return J.repeat(" ",e-t.length)+t}function Is(t,e){if(e=Object.create(e||null),!t.buffer)return null;e.maxLength||(e.maxLength=79),typeof e.indent!="number"&&(e.indent=1),typeof e.linesBefore!="number"&&(e.linesBefore=3),typeof e.linesAfter!="number"&&(e.linesAfter=2);for(var n=/\r?\n|\r|\0/g,o=[0],i=[],s,r=-1;s=n.exec(t.buffer);)i.push(s.index),o.push(s.index+s[0].length),t.position<=s.index&&r<0&&(r=o.length-2);r<0&&(r=o.length-1);var a="",l,c,d=Math.min(t.line+e.linesAfter,i.length).toString().length,u=e.maxLength-(e.indent+d+3);for(l=1;l<=e.linesBefore&&!(r-l<0);l++)c=wt(t.buffer,o[r-l],i[r-l],t.position-(o[r]-o[r-l]),u),a=J.repeat(" ",e.indent)+St((t.line-l+1).toString(),d)+" | "+c.str+`
`+a;for(c=wt(t.buffer,o[r],i[r],t.position,u),a+=J.repeat(" ",e.indent)+St((t.line+1).toString(),d)+" | "+c.str+`
`,a+=J.repeat("-",e.indent+d+3+c.pos)+`^
`,l=1;l<=e.linesAfter&&!(r+l>=i.length);l++)c=wt(t.buffer,o[r+l],i[r+l],t.position-(o[r]-o[r+l]),u),a+=J.repeat(" ",e.indent)+St((t.line+l+1).toString(),d)+" | "+c.str+`
`;return a.replace(/\n$/,"")}var Cs=Is,ks=["kind","multi","resolve","construct","instanceOf","predicate","represent","representName","defaultStyle","styleAliases"],Ps=["scalar","sequence","mapping"];function Ls(t){var e={};return t!==null&&Object.keys(t).forEach(function(n){t[n].forEach(function(o){e[String(o)]=n})}),e}function Ts(t,e){if(e=e||{},Object.keys(e).forEach(function(n){if(ks.indexOf(n)===-1)throw new ne('Unknown option "'+n+'" is met in definition of "'+t+'" YAML type.')}),this.options=e,this.tag=t,this.kind=e.kind||null,this.resolve=e.resolve||function(){return!0},this.construct=e.construct||function(n){return n},this.instanceOf=e.instanceOf||null,this.predicate=e.predicate||null,this.represent=e.represent||null,this.representName=e.representName||null,this.defaultStyle=e.defaultStyle||null,this.multi=e.multi||!1,this.styleAliases=Ls(e.styleAliases||null),Ps.indexOf(this.kind)===-1)throw new ne('Unknown kind "'+this.kind+'" is specified for "'+t+'" YAML type.')}var Z=Ts;function xn(t,e){var n=[];return t[e].forEach(function(o){var i=n.length;n.forEach(function(s,r){s.tag===o.tag&&s.kind===o.kind&&s.multi===o.multi&&(i=r)}),n[i]=o}),n}function As(){var t={scalar:{},sequence:{},mapping:{},fallback:{},multi:{scalar:[],sequence:[],mapping:[],fallback:[]}},e,n;function o(i){i.multi?(t.multi[i.kind].push(i),t.multi.fallback.push(i)):t[i.kind][i.tag]=t.fallback[i.tag]=i}for(e=0,n=arguments.length;e<n;e+=1)arguments[e].forEach(o);return t}function Dt(t){return this.extend(t)}Dt.prototype.extend=function(e){var n=[],o=[];if(e instanceof Z)o.push(e);else if(Array.isArray(e))o=o.concat(e);else if(e&&(Array.isArray(e.implicit)||Array.isArray(e.explicit)))e.implicit&&(n=n.concat(e.implicit)),e.explicit&&(o=o.concat(e.explicit));else throw new ne("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");n.forEach(function(s){if(!(s instanceof Z))throw new ne("Specified list of YAML types (or a single Type object) contains a non-Type object.");if(s.loadKind&&s.loadKind!=="scalar")throw new ne("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");if(s.multi)throw new ne("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.")}),o.forEach(function(s){if(!(s instanceof Z))throw new ne("Specified list of YAML types (or a single Type object) contains a non-Type object.")});var i=Object.create(Dt.prototype);return i.implicit=(this.implicit||[]).concat(n),i.explicit=(this.explicit||[]).concat(o),i.compiledImplicit=xn(i,"implicit"),i.compiledExplicit=xn(i,"explicit"),i.compiledTypeMap=As(i.compiledImplicit,i.compiledExplicit),i};var Ei=Dt,Ii=new Z("tag:yaml.org,2002:str",{kind:"scalar",construct:function(t){return t!==null?t:""}}),Ci=new Z("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(t){return t!==null?t:[]}}),ki=new Z("tag:yaml.org,2002:map",{kind:"mapping",construct:function(t){return t!==null?t:{}}}),Pi=new Ei({explicit:[Ii,Ci,ki]});function Ms(t){if(t===null)return!0;var e=t.length;return e===1&&t==="~"||e===4&&(t==="null"||t==="Null"||t==="NULL")}function Ds(){return null}function Os(t){return t===null}var Li=new Z("tag:yaml.org,2002:null",{kind:"scalar",resolve:Ms,construct:Ds,predicate:Os,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"},empty:function(){return""}},defaultStyle:"lowercase"});function Rs(t){if(t===null)return!1;var e=t.length;return e===4&&(t==="true"||t==="True"||t==="TRUE")||e===5&&(t==="false"||t==="False"||t==="FALSE")}function Bs(t){return t==="true"||t==="True"||t==="TRUE"}function Hs(t){return Object.prototype.toString.call(t)==="[object Boolean]"}var Ti=new Z("tag:yaml.org,2002:bool",{kind:"scalar",resolve:Rs,construct:Bs,predicate:Hs,represent:{lowercase:function(t){return t?"true":"false"},uppercase:function(t){return t?"TRUE":"FALSE"},camelcase:function(t){return t?"True":"False"}},defaultStyle:"lowercase"});function Ns(t){return 48<=t&&t<=57||65<=t&&t<=70||97<=t&&t<=102}function Gs(t){return 48<=t&&t<=55}function Fs(t){return 48<=t&&t<=57}function Ws(t){if(t===null)return!1;var e=t.length,n=0,o=!1,i;if(!e)return!1;if(i=t[n],(i==="-"||i==="+")&&(i=t[++n]),i==="0"){if(n+1===e)return!0;if(i=t[++n],i==="b"){for(n++;n<e;n++)if(i=t[n],i!=="_"){if(i!=="0"&&i!=="1")return!1;o=!0}return o&&i!=="_"}if(i==="x"){for(n++;n<e;n++)if(i=t[n],i!=="_"){if(!Ns(t.charCodeAt(n)))return!1;o=!0}return o&&i!=="_"}if(i==="o"){for(n++;n<e;n++)if(i=t[n],i!=="_"){if(!Gs(t.charCodeAt(n)))return!1;o=!0}return o&&i!=="_"}}if(i==="_")return!1;for(;n<e;n++)if(i=t[n],i!=="_"){if(!Fs(t.charCodeAt(n)))return!1;o=!0}return!(!o||i==="_")}function $s(t){var e=t,n=1,o;if(e.indexOf("_")!==-1&&(e=e.replace(/_/g,"")),o=e[0],(o==="-"||o==="+")&&(o==="-"&&(n=-1),e=e.slice(1),o=e[0]),e==="0")return 0;if(o==="0"){if(e[1]==="b")return n*parseInt(e.slice(2),2);if(e[1]==="x")return n*parseInt(e.slice(2),16);if(e[1]==="o")return n*parseInt(e.slice(2),8)}return n*parseInt(e,10)}function zs(t){return Object.prototype.toString.call(t)==="[object Number]"&&t%1===0&&!J.isNegativeZero(t)}var Ai=new Z("tag:yaml.org,2002:int",{kind:"scalar",resolve:Ws,construct:$s,predicate:zs,represent:{binary:function(t){return t>=0?"0b"+t.toString(2):"-0b"+t.toString(2).slice(1)},octal:function(t){return t>=0?"0o"+t.toString(8):"-0o"+t.toString(8).slice(1)},decimal:function(t){return t.toString(10)},hexadecimal:function(t){return t>=0?"0x"+t.toString(16).toUpperCase():"-0x"+t.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}}),Us=new RegExp("^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function js(t){return!(t===null||!Us.test(t)||t[t.length-1]==="_")}function Ys(t){var e,n;return e=t.replace(/_/g,"").toLowerCase(),n=e[0]==="-"?-1:1,"+-".indexOf(e[0])>=0&&(e=e.slice(1)),e===".inf"?n===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:e===".nan"?NaN:n*parseFloat(e,10)}var Vs=/^[-+]?[0-9]+e/;function qs(t,e){var n;if(isNaN(t))switch(e){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===t)switch(e){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===t)switch(e){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(J.isNegativeZero(t))return"-0.0";return n=t.toString(10),Vs.test(n)?n.replace("e",".e"):n}function Xs(t){return Object.prototype.toString.call(t)==="[object Number]"&&(t%1!==0||J.isNegativeZero(t))}var Mi=new Z("tag:yaml.org,2002:float",{kind:"scalar",resolve:js,construct:Ys,predicate:Xs,represent:qs,defaultStyle:"lowercase"}),Di=Pi.extend({implicit:[Li,Ti,Ai,Mi]}),Oi=Di,Ri=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),Bi=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function Ks(t){return t===null?!1:Ri.exec(t)!==null||Bi.exec(t)!==null}function Js(t){var e,n,o,i,s,r,a,l=0,c=null,d,u,h;if(e=Ri.exec(t),e===null&&(e=Bi.exec(t)),e===null)throw new Error("Date resolve error");if(n=+e[1],o=+e[2]-1,i=+e[3],!e[4])return new Date(Date.UTC(n,o,i));if(s=+e[4],r=+e[5],a=+e[6],e[7]){for(l=e[7].slice(0,3);l.length<3;)l+="0";l=+l}return e[9]&&(d=+e[10],u=+(e[11]||0),c=(d*60+u)*6e4,e[9]==="-"&&(c=-c)),h=new Date(Date.UTC(n,o,i,s,r,a,l)),c&&h.setTime(h.getTime()-c),h}function Zs(t){return t.toISOString()}var Hi=new Z("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:Ks,construct:Js,instanceOf:Date,represent:Zs});function Qs(t){return t==="<<"||t===null}var Ni=new Z("tag:yaml.org,2002:merge",{kind:"scalar",resolve:Qs}),rn=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function er(t){if(t===null)return!1;var e,n,o=0,i=t.length,s=rn;for(n=0;n<i;n++)if(e=s.indexOf(t.charAt(n)),!(e>64)){if(e<0)return!1;o+=6}return o%8===0}function tr(t){var e,n,o=t.replace(/[\r\n=]/g,""),i=o.length,s=rn,r=0,a=[];for(e=0;e<i;e++)e%4===0&&e&&(a.push(r>>16&255),a.push(r>>8&255),a.push(r&255)),r=r<<6|s.indexOf(o.charAt(e));return n=i%4*6,n===0?(a.push(r>>16&255),a.push(r>>8&255),a.push(r&255)):n===18?(a.push(r>>10&255),a.push(r>>2&255)):n===12&&a.push(r>>4&255),new Uint8Array(a)}function nr(t){var e="",n=0,o,i,s=t.length,r=rn;for(o=0;o<s;o++)o%3===0&&o&&(e+=r[n>>18&63],e+=r[n>>12&63],e+=r[n>>6&63],e+=r[n&63]),n=(n<<8)+t[o];return i=s%3,i===0?(e+=r[n>>18&63],e+=r[n>>12&63],e+=r[n>>6&63],e+=r[n&63]):i===2?(e+=r[n>>10&63],e+=r[n>>4&63],e+=r[n<<2&63],e+=r[64]):i===1&&(e+=r[n>>2&63],e+=r[n<<4&63],e+=r[64],e+=r[64]),e}function ir(t){return Object.prototype.toString.call(t)==="[object Uint8Array]"}var Gi=new Z("tag:yaml.org,2002:binary",{kind:"scalar",resolve:er,construct:tr,predicate:ir,represent:nr}),or=Object.prototype.hasOwnProperty,sr=Object.prototype.toString;function rr(t){if(t===null)return!0;var e=[],n,o,i,s,r,a=t;for(n=0,o=a.length;n<o;n+=1){if(i=a[n],r=!1,sr.call(i)!=="[object Object]")return!1;for(s in i)if(or.call(i,s))if(!r)r=!0;else return!1;if(!r)return!1;if(e.indexOf(s)===-1)e.push(s);else return!1}return!0}function ar(t){return t!==null?t:[]}var Fi=new Z("tag:yaml.org,2002:omap",{kind:"sequence",resolve:rr,construct:ar}),lr=Object.prototype.toString;function dr(t){if(t===null)return!0;var e,n,o,i,s,r=t;for(s=new Array(r.length),e=0,n=r.length;e<n;e+=1){if(o=r[e],lr.call(o)!=="[object Object]"||(i=Object.keys(o),i.length!==1))return!1;s[e]=[i[0],o[i[0]]]}return!0}function cr(t){if(t===null)return[];var e,n,o,i,s,r=t;for(s=new Array(r.length),e=0,n=r.length;e<n;e+=1)o=r[e],i=Object.keys(o),s[e]=[i[0],o[i[0]]];return s}var Wi=new Z("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:dr,construct:cr}),pr=Object.prototype.hasOwnProperty;function ur(t){if(t===null)return!0;var e,n=t;for(e in n)if(pr.call(n,e)&&n[e]!==null)return!1;return!0}function hr(t){return t!==null?t:{}}var $i=new Z("tag:yaml.org,2002:set",{kind:"mapping",resolve:ur,construct:hr}),an=Oi.extend({implicit:[Hi,Ni],explicit:[Gi,Fi,Wi,$i]}),Se=Object.prototype.hasOwnProperty,dt=1,zi=2,Ui=3,ct=4,Et=1,gr=2,wn=3,fr=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,mr=/[\x85\u2028\u2029]/,yr=/[,\[\]\{\}]/,ji=/^(?:!|!!|![a-z\-]+!)$/i,Yi=/^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;function Sn(t){return Object.prototype.toString.call(t)}function ue(t){return t===10||t===13}function Le(t){return t===9||t===32}function oe(t){return t===9||t===32||t===10||t===13}function Oe(t){return t===44||t===91||t===93||t===123||t===125}function _r(t){var e;return 48<=t&&t<=57?t-48:(e=t|32,97<=e&&e<=102?e-97+10:-1)}function vr(t){return t===120?2:t===117?4:t===85?8:0}function br(t){return 48<=t&&t<=57?t-48:-1}function En(t){return t===48?"\0":t===97?"\x07":t===98?"\b":t===116||t===9?"	":t===110?`
`:t===118?"\v":t===102?"\f":t===114?"\r":t===101?"\x1B":t===32?" ":t===34?'"':t===47?"/":t===92?"\\":t===78?"":t===95?" ":t===76?"\u2028":t===80?"\u2029":""}function xr(t){return t<=65535?String.fromCharCode(t):String.fromCharCode((t-65536>>10)+55296,(t-65536&1023)+56320)}function Vi(t,e,n){e==="__proto__"?Object.defineProperty(t,e,{configurable:!0,enumerable:!0,writable:!0,value:n}):t[e]=n}var qi=new Array(256),Xi=new Array(256);for(var Ae=0;Ae<256;Ae++)qi[Ae]=En(Ae)?1:0,Xi[Ae]=En(Ae);function wr(t,e){this.input=t,this.filename=e.filename||null,this.schema=e.schema||an,this.onWarning=e.onWarning||null,this.legacy=e.legacy||!1,this.json=e.json||!1,this.listener=e.listener||null,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=t.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.firstTabInLine=-1,this.documents=[]}function Ki(t,e){var n={name:t.filename,buffer:t.input.slice(0,-1),position:t.position,line:t.line,column:t.position-t.lineStart};return n.snippet=Cs(n),new ne(e,n)}function M(t,e){throw Ki(t,e)}function pt(t,e){t.onWarning&&t.onWarning.call(null,Ki(t,e))}var In={YAML:function(e,n,o){var i,s,r;e.version!==null&&M(e,"duplication of %YAML directive"),o.length!==1&&M(e,"YAML directive accepts exactly one argument"),i=/^([0-9]+)\.([0-9]+)$/.exec(o[0]),i===null&&M(e,"ill-formed argument of the YAML directive"),s=parseInt(i[1],10),r=parseInt(i[2],10),s!==1&&M(e,"unacceptable YAML version of the document"),e.version=o[0],e.checkLineBreaks=r<2,r!==1&&r!==2&&pt(e,"unsupported YAML version of the document")},TAG:function(e,n,o){var i,s;o.length!==2&&M(e,"TAG directive accepts exactly two arguments"),i=o[0],s=o[1],ji.test(i)||M(e,"ill-formed tag handle (first argument) of the TAG directive"),Se.call(e.tagMap,i)&&M(e,'there is a previously declared suffix for "'+i+'" tag handle'),Yi.test(s)||M(e,"ill-formed tag prefix (second argument) of the TAG directive");try{s=decodeURIComponent(s)}catch{M(e,"tag prefix is malformed: "+s)}e.tagMap[i]=s}};function we(t,e,n,o){var i,s,r,a;if(e<n){if(a=t.input.slice(e,n),o)for(i=0,s=a.length;i<s;i+=1)r=a.charCodeAt(i),r===9||32<=r&&r<=1114111||M(t,"expected valid JSON character");else fr.test(a)&&M(t,"the stream contains non-printable characters");t.result+=a}}function Cn(t,e,n,o){var i,s,r,a;for(J.isObject(n)||M(t,"cannot merge mappings; the provided source object is unacceptable"),i=Object.keys(n),r=0,a=i.length;r<a;r+=1)s=i[r],Se.call(e,s)||(Vi(e,s,n[s]),o[s]=!0)}function Re(t,e,n,o,i,s,r,a,l){var c,d;if(Array.isArray(i))for(i=Array.prototype.slice.call(i),c=0,d=i.length;c<d;c+=1)Array.isArray(i[c])&&M(t,"nested arrays are not supported inside keys"),typeof i=="object"&&Sn(i[c])==="[object Object]"&&(i[c]="[object Object]");if(typeof i=="object"&&Sn(i)==="[object Object]"&&(i="[object Object]"),i=String(i),e===null&&(e={}),o==="tag:yaml.org,2002:merge")if(Array.isArray(s))for(c=0,d=s.length;c<d;c+=1)Cn(t,e,s[c],n);else Cn(t,e,s,n);else!t.json&&!Se.call(n,i)&&Se.call(e,i)&&(t.line=r||t.line,t.lineStart=a||t.lineStart,t.position=l||t.position,M(t,"duplicated mapping key")),Vi(e,i,s),delete n[i];return e}function ln(t){var e;e=t.input.charCodeAt(t.position),e===10?t.position++:e===13?(t.position++,t.input.charCodeAt(t.position)===10&&t.position++):M(t,"a line break is expected"),t.line+=1,t.lineStart=t.position,t.firstTabInLine=-1}function K(t,e,n){for(var o=0,i=t.input.charCodeAt(t.position);i!==0;){for(;Le(i);)i===9&&t.firstTabInLine===-1&&(t.firstTabInLine=t.position),i=t.input.charCodeAt(++t.position);if(e&&i===35)do i=t.input.charCodeAt(++t.position);while(i!==10&&i!==13&&i!==0);if(ue(i))for(ln(t),i=t.input.charCodeAt(t.position),o++,t.lineIndent=0;i===32;)t.lineIndent++,i=t.input.charCodeAt(++t.position);else break}return n!==-1&&o!==0&&t.lineIndent<n&&pt(t,"deficient indentation"),o}function bt(t){var e=t.position,n;return n=t.input.charCodeAt(e),!!((n===45||n===46)&&n===t.input.charCodeAt(e+1)&&n===t.input.charCodeAt(e+2)&&(e+=3,n=t.input.charCodeAt(e),n===0||oe(n)))}function dn(t,e){e===1?t.result+=" ":e>1&&(t.result+=J.repeat(`
`,e-1))}function Sr(t,e,n){var o,i,s,r,a,l,c,d,u=t.kind,h=t.result,p;if(p=t.input.charCodeAt(t.position),oe(p)||Oe(p)||p===35||p===38||p===42||p===33||p===124||p===62||p===39||p===34||p===37||p===64||p===96||(p===63||p===45)&&(i=t.input.charCodeAt(t.position+1),oe(i)||n&&Oe(i)))return!1;for(t.kind="scalar",t.result="",s=r=t.position,a=!1;p!==0;){if(p===58){if(i=t.input.charCodeAt(t.position+1),oe(i)||n&&Oe(i))break}else if(p===35){if(o=t.input.charCodeAt(t.position-1),oe(o))break}else{if(t.position===t.lineStart&&bt(t)||n&&Oe(p))break;if(ue(p))if(l=t.line,c=t.lineStart,d=t.lineIndent,K(t,!1,-1),t.lineIndent>=e){a=!0,p=t.input.charCodeAt(t.position);continue}else{t.position=r,t.line=l,t.lineStart=c,t.lineIndent=d;break}}a&&(we(t,s,r,!1),dn(t,t.line-l),s=r=t.position,a=!1),Le(p)||(r=t.position+1),p=t.input.charCodeAt(++t.position)}return we(t,s,r,!1),t.result?!0:(t.kind=u,t.result=h,!1)}function Er(t,e){var n,o,i;if(n=t.input.charCodeAt(t.position),n!==39)return!1;for(t.kind="scalar",t.result="",t.position++,o=i=t.position;(n=t.input.charCodeAt(t.position))!==0;)if(n===39)if(we(t,o,t.position,!0),n=t.input.charCodeAt(++t.position),n===39)o=t.position,t.position++,i=t.position;else return!0;else ue(n)?(we(t,o,i,!0),dn(t,K(t,!1,e)),o=i=t.position):t.position===t.lineStart&&bt(t)?M(t,"unexpected end of the document within a single quoted scalar"):(t.position++,i=t.position);M(t,"unexpected end of the stream within a single quoted scalar")}function Ir(t,e){var n,o,i,s,r,a;if(a=t.input.charCodeAt(t.position),a!==34)return!1;for(t.kind="scalar",t.result="",t.position++,n=o=t.position;(a=t.input.charCodeAt(t.position))!==0;){if(a===34)return we(t,n,t.position,!0),t.position++,!0;if(a===92){if(we(t,n,t.position,!0),a=t.input.charCodeAt(++t.position),ue(a))K(t,!1,e);else if(a<256&&qi[a])t.result+=Xi[a],t.position++;else if((r=vr(a))>0){for(i=r,s=0;i>0;i--)a=t.input.charCodeAt(++t.position),(r=_r(a))>=0?s=(s<<4)+r:M(t,"expected hexadecimal character");t.result+=xr(s),t.position++}else M(t,"unknown escape sequence");n=o=t.position}else ue(a)?(we(t,n,o,!0),dn(t,K(t,!1,e)),n=o=t.position):t.position===t.lineStart&&bt(t)?M(t,"unexpected end of the document within a double quoted scalar"):(t.position++,o=t.position)}M(t,"unexpected end of the stream within a double quoted scalar")}function Cr(t,e){var n=!0,o,i,s,r=t.tag,a,l=t.anchor,c,d,u,h,p,f=Object.create(null),y,m,_,b;if(b=t.input.charCodeAt(t.position),b===91)d=93,p=!1,a=[];else if(b===123)d=125,p=!0,a={};else return!1;for(t.anchor!==null&&(t.anchorMap[t.anchor]=a),b=t.input.charCodeAt(++t.position);b!==0;){if(K(t,!0,e),b=t.input.charCodeAt(t.position),b===d)return t.position++,t.tag=r,t.anchor=l,t.kind=p?"mapping":"sequence",t.result=a,!0;n?b===44&&M(t,"expected the node content, but found ','"):M(t,"missed comma between flow collection entries"),m=y=_=null,u=h=!1,b===63&&(c=t.input.charCodeAt(t.position+1),oe(c)&&(u=h=!0,t.position++,K(t,!0,e))),o=t.line,i=t.lineStart,s=t.position,Ge(t,e,dt,!1,!0),m=t.tag,y=t.result,K(t,!0,e),b=t.input.charCodeAt(t.position),(h||t.line===o)&&b===58&&(u=!0,b=t.input.charCodeAt(++t.position),K(t,!0,e),Ge(t,e,dt,!1,!0),_=t.result),p?Re(t,a,f,m,y,_,o,i,s):u?a.push(Re(t,null,f,m,y,_,o,i,s)):a.push(y),K(t,!0,e),b=t.input.charCodeAt(t.position),b===44?(n=!0,b=t.input.charCodeAt(++t.position)):n=!1}M(t,"unexpected end of the stream within a flow collection")}function kr(t,e){var n,o,i=Et,s=!1,r=!1,a=e,l=0,c=!1,d,u;if(u=t.input.charCodeAt(t.position),u===124)o=!1;else if(u===62)o=!0;else return!1;for(t.kind="scalar",t.result="";u!==0;)if(u=t.input.charCodeAt(++t.position),u===43||u===45)Et===i?i=u===43?wn:gr:M(t,"repeat of a chomping mode identifier");else if((d=br(u))>=0)d===0?M(t,"bad explicit indentation width of a block scalar; it cannot be less than one"):r?M(t,"repeat of an indentation width identifier"):(a=e+d-1,r=!0);else break;if(Le(u)){do u=t.input.charCodeAt(++t.position);while(Le(u));if(u===35)do u=t.input.charCodeAt(++t.position);while(!ue(u)&&u!==0)}for(;u!==0;){for(ln(t),t.lineIndent=0,u=t.input.charCodeAt(t.position);(!r||t.lineIndent<a)&&u===32;)t.lineIndent++,u=t.input.charCodeAt(++t.position);if(!r&&t.lineIndent>a&&(a=t.lineIndent),ue(u)){l++;continue}if(t.lineIndent<a){i===wn?t.result+=J.repeat(`
`,s?1+l:l):i===Et&&s&&(t.result+=`
`);break}for(o?Le(u)?(c=!0,t.result+=J.repeat(`
`,s?1+l:l)):c?(c=!1,t.result+=J.repeat(`
`,l+1)):l===0?s&&(t.result+=" "):t.result+=J.repeat(`
`,l):t.result+=J.repeat(`
`,s?1+l:l),s=!0,r=!0,l=0,n=t.position;!ue(u)&&u!==0;)u=t.input.charCodeAt(++t.position);we(t,n,t.position,!1)}return!0}function kn(t,e){var n,o=t.tag,i=t.anchor,s=[],r,a=!1,l;if(t.firstTabInLine!==-1)return!1;for(t.anchor!==null&&(t.anchorMap[t.anchor]=s),l=t.input.charCodeAt(t.position);l!==0&&(t.firstTabInLine!==-1&&(t.position=t.firstTabInLine,M(t,"tab characters must not be used in indentation")),!(l!==45||(r=t.input.charCodeAt(t.position+1),!oe(r))));){if(a=!0,t.position++,K(t,!0,-1)&&t.lineIndent<=e){s.push(null),l=t.input.charCodeAt(t.position);continue}if(n=t.line,Ge(t,e,Ui,!1,!0),s.push(t.result),K(t,!0,-1),l=t.input.charCodeAt(t.position),(t.line===n||t.lineIndent>e)&&l!==0)M(t,"bad indentation of a sequence entry");else if(t.lineIndent<e)break}return a?(t.tag=o,t.anchor=i,t.kind="sequence",t.result=s,!0):!1}function Pr(t,e,n){var o,i,s,r,a,l,c=t.tag,d=t.anchor,u={},h=Object.create(null),p=null,f=null,y=null,m=!1,_=!1,b;if(t.firstTabInLine!==-1)return!1;for(t.anchor!==null&&(t.anchorMap[t.anchor]=u),b=t.input.charCodeAt(t.position);b!==0;){if(!m&&t.firstTabInLine!==-1&&(t.position=t.firstTabInLine,M(t,"tab characters must not be used in indentation")),o=t.input.charCodeAt(t.position+1),s=t.line,(b===63||b===58)&&oe(o))b===63?(m&&(Re(t,u,h,p,f,null,r,a,l),p=f=y=null),_=!0,m=!0,i=!0):m?(m=!1,i=!0):M(t,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),t.position+=1,b=o;else{if(r=t.line,a=t.lineStart,l=t.position,!Ge(t,n,zi,!1,!0))break;if(t.line===s){for(b=t.input.charCodeAt(t.position);Le(b);)b=t.input.charCodeAt(++t.position);if(b===58)b=t.input.charCodeAt(++t.position),oe(b)||M(t,"a whitespace character is expected after the key-value separator within a block mapping"),m&&(Re(t,u,h,p,f,null,r,a,l),p=f=y=null),_=!0,m=!1,i=!1,p=t.tag,f=t.result;else if(_)M(t,"can not read an implicit mapping pair; a colon is missed");else return t.tag=c,t.anchor=d,!0}else if(_)M(t,"can not read a block mapping entry; a multiline key may not be an implicit key");else return t.tag=c,t.anchor=d,!0}if((t.line===s||t.lineIndent>e)&&(m&&(r=t.line,a=t.lineStart,l=t.position),Ge(t,e,ct,!0,i)&&(m?f=t.result:y=t.result),m||(Re(t,u,h,p,f,y,r,a,l),p=f=y=null),K(t,!0,-1),b=t.input.charCodeAt(t.position)),(t.line===s||t.lineIndent>e)&&b!==0)M(t,"bad indentation of a mapping entry");else if(t.lineIndent<e)break}return m&&Re(t,u,h,p,f,null,r,a,l),_&&(t.tag=c,t.anchor=d,t.kind="mapping",t.result=u),_}function Lr(t){var e,n=!1,o=!1,i,s,r;if(r=t.input.charCodeAt(t.position),r!==33)return!1;if(t.tag!==null&&M(t,"duplication of a tag property"),r=t.input.charCodeAt(++t.position),r===60?(n=!0,r=t.input.charCodeAt(++t.position)):r===33?(o=!0,i="!!",r=t.input.charCodeAt(++t.position)):i="!",e=t.position,n){do r=t.input.charCodeAt(++t.position);while(r!==0&&r!==62);t.position<t.length?(s=t.input.slice(e,t.position),r=t.input.charCodeAt(++t.position)):M(t,"unexpected end of the stream within a verbatim tag")}else{for(;r!==0&&!oe(r);)r===33&&(o?M(t,"tag suffix cannot contain exclamation marks"):(i=t.input.slice(e-1,t.position+1),ji.test(i)||M(t,"named tag handle cannot contain such characters"),o=!0,e=t.position+1)),r=t.input.charCodeAt(++t.position);s=t.input.slice(e,t.position),yr.test(s)&&M(t,"tag suffix cannot contain flow indicator characters")}s&&!Yi.test(s)&&M(t,"tag name cannot contain such characters: "+s);try{s=decodeURIComponent(s)}catch{M(t,"tag name is malformed: "+s)}return n?t.tag=s:Se.call(t.tagMap,i)?t.tag=t.tagMap[i]+s:i==="!"?t.tag="!"+s:i==="!!"?t.tag="tag:yaml.org,2002:"+s:M(t,'undeclared tag handle "'+i+'"'),!0}function Tr(t){var e,n;if(n=t.input.charCodeAt(t.position),n!==38)return!1;for(t.anchor!==null&&M(t,"duplication of an anchor property"),n=t.input.charCodeAt(++t.position),e=t.position;n!==0&&!oe(n)&&!Oe(n);)n=t.input.charCodeAt(++t.position);return t.position===e&&M(t,"name of an anchor node must contain at least one character"),t.anchor=t.input.slice(e,t.position),!0}function Ar(t){var e,n,o;if(o=t.input.charCodeAt(t.position),o!==42)return!1;for(o=t.input.charCodeAt(++t.position),e=t.position;o!==0&&!oe(o)&&!Oe(o);)o=t.input.charCodeAt(++t.position);return t.position===e&&M(t,"name of an alias node must contain at least one character"),n=t.input.slice(e,t.position),Se.call(t.anchorMap,n)||M(t,'unidentified alias "'+n+'"'),t.result=t.anchorMap[n],K(t,!0,-1),!0}function Ge(t,e,n,o,i){var s,r,a,l=1,c=!1,d=!1,u,h,p,f,y,m;if(t.listener!==null&&t.listener("open",t),t.tag=null,t.anchor=null,t.kind=null,t.result=null,s=r=a=ct===n||Ui===n,o&&K(t,!0,-1)&&(c=!0,t.lineIndent>e?l=1:t.lineIndent===e?l=0:t.lineIndent<e&&(l=-1)),l===1)for(;Lr(t)||Tr(t);)K(t,!0,-1)?(c=!0,a=s,t.lineIndent>e?l=1:t.lineIndent===e?l=0:t.lineIndent<e&&(l=-1)):a=!1;if(a&&(a=c||i),(l===1||ct===n)&&(dt===n||zi===n?y=e:y=e+1,m=t.position-t.lineStart,l===1?a&&(kn(t,m)||Pr(t,m,y))||Cr(t,y)?d=!0:(r&&kr(t,y)||Er(t,y)||Ir(t,y)?d=!0:Ar(t)?(d=!0,(t.tag!==null||t.anchor!==null)&&M(t,"alias node should not have any properties")):Sr(t,y,dt===n)&&(d=!0,t.tag===null&&(t.tag="?")),t.anchor!==null&&(t.anchorMap[t.anchor]=t.result)):l===0&&(d=a&&kn(t,m))),t.tag===null)t.anchor!==null&&(t.anchorMap[t.anchor]=t.result);else if(t.tag==="?"){for(t.result!==null&&t.kind!=="scalar"&&M(t,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+t.kind+'"'),u=0,h=t.implicitTypes.length;u<h;u+=1)if(f=t.implicitTypes[u],f.resolve(t.result)){t.result=f.construct(t.result),t.tag=f.tag,t.anchor!==null&&(t.anchorMap[t.anchor]=t.result);break}}else if(t.tag!=="!"){if(Se.call(t.typeMap[t.kind||"fallback"],t.tag))f=t.typeMap[t.kind||"fallback"][t.tag];else for(f=null,p=t.typeMap.multi[t.kind||"fallback"],u=0,h=p.length;u<h;u+=1)if(t.tag.slice(0,p[u].tag.length)===p[u].tag){f=p[u];break}f||M(t,"unknown tag !<"+t.tag+">"),t.result!==null&&f.kind!==t.kind&&M(t,"unacceptable node kind for !<"+t.tag+'> tag; it should be "'+f.kind+'", not "'+t.kind+'"'),f.resolve(t.result,t.tag)?(t.result=f.construct(t.result,t.tag),t.anchor!==null&&(t.anchorMap[t.anchor]=t.result)):M(t,"cannot resolve a node with !<"+t.tag+"> explicit tag")}return t.listener!==null&&t.listener("close",t),t.tag!==null||t.anchor!==null||d}function Mr(t){var e=t.position,n,o,i,s=!1,r;for(t.version=null,t.checkLineBreaks=t.legacy,t.tagMap=Object.create(null),t.anchorMap=Object.create(null);(r=t.input.charCodeAt(t.position))!==0&&(K(t,!0,-1),r=t.input.charCodeAt(t.position),!(t.lineIndent>0||r!==37));){for(s=!0,r=t.input.charCodeAt(++t.position),n=t.position;r!==0&&!oe(r);)r=t.input.charCodeAt(++t.position);for(o=t.input.slice(n,t.position),i=[],o.length<1&&M(t,"directive name must not be less than one character in length");r!==0;){for(;Le(r);)r=t.input.charCodeAt(++t.position);if(r===35){do r=t.input.charCodeAt(++t.position);while(r!==0&&!ue(r));break}if(ue(r))break;for(n=t.position;r!==0&&!oe(r);)r=t.input.charCodeAt(++t.position);i.push(t.input.slice(n,t.position))}r!==0&&ln(t),Se.call(In,o)?In[o](t,o,i):pt(t,'unknown document directive "'+o+'"')}if(K(t,!0,-1),t.lineIndent===0&&t.input.charCodeAt(t.position)===45&&t.input.charCodeAt(t.position+1)===45&&t.input.charCodeAt(t.position+2)===45?(t.position+=3,K(t,!0,-1)):s&&M(t,"directives end mark is expected"),Ge(t,t.lineIndent-1,ct,!1,!0),K(t,!0,-1),t.checkLineBreaks&&mr.test(t.input.slice(e,t.position))&&pt(t,"non-ASCII line breaks are interpreted as content"),t.documents.push(t.result),t.position===t.lineStart&&bt(t)){t.input.charCodeAt(t.position)===46&&(t.position+=3,K(t,!0,-1));return}if(t.position<t.length-1)M(t,"end of the stream or a document separator is expected");else return}function Ji(t,e){t=String(t),e=e||{},t.length!==0&&(t.charCodeAt(t.length-1)!==10&&t.charCodeAt(t.length-1)!==13&&(t+=`
`),t.charCodeAt(0)===65279&&(t=t.slice(1)));var n=new wr(t,e),o=t.indexOf("\0");for(o!==-1&&(n.position=o,M(n,"null byte is not allowed in input")),n.input+="\0";n.input.charCodeAt(n.position)===32;)n.lineIndent+=1,n.position+=1;for(;n.position<n.length-1;)Mr(n);return n.documents}function Dr(t,e,n){e!==null&&typeof e=="object"&&typeof n>"u"&&(n=e,e=null);var o=Ji(t,n);if(typeof e!="function")return o;for(var i=0,s=o.length;i<s;i+=1)e(o[i])}function Or(t,e){var n=Ji(t,e);if(n.length!==0){if(n.length===1)return n[0];throw new ne("expected a single document in the stream, but found more")}}var Rr=Dr,Br=Or,Zi={loadAll:Rr,load:Br},Qi=Object.prototype.toString,eo=Object.prototype.hasOwnProperty,cn=65279,Hr=9,Xe=10,Nr=13,Gr=32,Fr=33,Wr=34,Ot=35,$r=37,zr=38,Ur=39,jr=42,to=44,Yr=45,ut=58,Vr=61,qr=62,Xr=63,Kr=64,no=91,io=93,Jr=96,oo=123,Zr=124,so=125,ee={};ee[0]="\\0";ee[7]="\\a";ee[8]="\\b";ee[9]="\\t";ee[10]="\\n";ee[11]="\\v";ee[12]="\\f";ee[13]="\\r";ee[27]="\\e";ee[34]='\\"';ee[92]="\\\\";ee[133]="\\N";ee[160]="\\_";ee[8232]="\\L";ee[8233]="\\P";var Qr=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"],ea=/^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;function ta(t,e){var n,o,i,s,r,a,l;if(e===null)return{};for(n={},o=Object.keys(e),i=0,s=o.length;i<s;i+=1)r=o[i],a=String(e[r]),r.slice(0,2)==="!!"&&(r="tag:yaml.org,2002:"+r.slice(2)),l=t.compiledTypeMap.fallback[r],l&&eo.call(l.styleAliases,a)&&(a=l.styleAliases[a]),n[r]=a;return n}function na(t){var e,n,o;if(e=t.toString(16).toUpperCase(),t<=255)n="x",o=2;else if(t<=65535)n="u",o=4;else if(t<=4294967295)n="U",o=8;else throw new ne("code point within a string may not be greater than 0xFFFFFFFF");return"\\"+n+J.repeat("0",o-e.length)+e}var ia=1,Ke=2;function oa(t){this.schema=t.schema||an,this.indent=Math.max(1,t.indent||2),this.noArrayIndent=t.noArrayIndent||!1,this.skipInvalid=t.skipInvalid||!1,this.flowLevel=J.isNothing(t.flowLevel)?-1:t.flowLevel,this.styleMap=ta(this.schema,t.styles||null),this.sortKeys=t.sortKeys||!1,this.lineWidth=t.lineWidth||80,this.noRefs=t.noRefs||!1,this.noCompatMode=t.noCompatMode||!1,this.condenseFlow=t.condenseFlow||!1,this.quotingType=t.quotingType==='"'?Ke:ia,this.forceQuotes=t.forceQuotes||!1,this.replacer=typeof t.replacer=="function"?t.replacer:null,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function Pn(t,e){for(var n=J.repeat(" ",e),o=0,i=-1,s="",r,a=t.length;o<a;)i=t.indexOf(`
`,o),i===-1?(r=t.slice(o),o=a):(r=t.slice(o,i+1),o=i+1),r.length&&r!==`
`&&(s+=n),s+=r;return s}function Rt(t,e){return`
`+J.repeat(" ",t.indent*e)}function sa(t,e){var n,o,i;for(n=0,o=t.implicitTypes.length;n<o;n+=1)if(i=t.implicitTypes[n],i.resolve(e))return!0;return!1}function ht(t){return t===Gr||t===Hr}function Je(t){return 32<=t&&t<=126||161<=t&&t<=55295&&t!==8232&&t!==8233||57344<=t&&t<=65533&&t!==cn||65536<=t&&t<=1114111}function Ln(t){return Je(t)&&t!==cn&&t!==Nr&&t!==Xe}function Tn(t,e,n){var o=Ln(t),i=o&&!ht(t);return(n?o:o&&t!==to&&t!==no&&t!==io&&t!==oo&&t!==so)&&t!==Ot&&!(e===ut&&!i)||Ln(e)&&!ht(e)&&t===Ot||e===ut&&i}function ra(t){return Je(t)&&t!==cn&&!ht(t)&&t!==Yr&&t!==Xr&&t!==ut&&t!==to&&t!==no&&t!==io&&t!==oo&&t!==so&&t!==Ot&&t!==zr&&t!==jr&&t!==Fr&&t!==Zr&&t!==Vr&&t!==qr&&t!==Ur&&t!==Wr&&t!==$r&&t!==Kr&&t!==Jr}function aa(t){return!ht(t)&&t!==ut}function je(t,e){var n=t.charCodeAt(e),o;return n>=55296&&n<=56319&&e+1<t.length&&(o=t.charCodeAt(e+1),o>=56320&&o<=57343)?(n-55296)*1024+o-56320+65536:n}function ro(t){var e=/^\n* /;return e.test(t)}var ao=1,Bt=2,lo=3,co=4,De=5;function la(t,e,n,o,i,s,r,a){var l,c=0,d=null,u=!1,h=!1,p=o!==-1,f=-1,y=ra(je(t,0))&&aa(je(t,t.length-1));if(e||r)for(l=0;l<t.length;c>=65536?l+=2:l++){if(c=je(t,l),!Je(c))return De;y=y&&Tn(c,d,a),d=c}else{for(l=0;l<t.length;c>=65536?l+=2:l++){if(c=je(t,l),c===Xe)u=!0,p&&(h=h||l-f-1>o&&t[f+1]!==" ",f=l);else if(!Je(c))return De;y=y&&Tn(c,d,a),d=c}h=h||p&&l-f-1>o&&t[f+1]!==" "}return!u&&!h?y&&!r&&!i(t)?ao:s===Ke?De:Bt:n>9&&ro(t)?De:r?s===Ke?De:Bt:h?co:lo}function da(t,e,n,o,i){t.dump=function(){if(e.length===0)return t.quotingType===Ke?'""':"''";if(!t.noCompatMode&&(Qr.indexOf(e)!==-1||ea.test(e)))return t.quotingType===Ke?'"'+e+'"':"'"+e+"'";var s=t.indent*Math.max(1,n),r=t.lineWidth===-1?-1:Math.max(Math.min(t.lineWidth,40),t.lineWidth-s),a=o||t.flowLevel>-1&&n>=t.flowLevel;function l(c){return sa(t,c)}switch(la(e,a,t.indent,r,l,t.quotingType,t.forceQuotes&&!o,i)){case ao:return e;case Bt:return"'"+e.replace(/'/g,"''")+"'";case lo:return"|"+An(e,t.indent)+Mn(Pn(e,s));case co:return">"+An(e,t.indent)+Mn(Pn(ca(e,r),s));case De:return'"'+pa(e)+'"';default:throw new ne("impossible error: invalid scalar style")}}()}function An(t,e){var n=ro(t)?String(e):"",o=t[t.length-1]===`
`,i=o&&(t[t.length-2]===`
`||t===`
`),s=i?"+":o?"":"-";return n+s+`
`}function Mn(t){return t[t.length-1]===`
`?t.slice(0,-1):t}function ca(t,e){for(var n=/(\n+)([^\n]*)/g,o=function(){var c=t.indexOf(`
`);return c=c!==-1?c:t.length,n.lastIndex=c,Dn(t.slice(0,c),e)}(),i=t[0]===`
`||t[0]===" ",s,r;r=n.exec(t);){var a=r[1],l=r[2];s=l[0]===" ",o+=a+(!i&&!s&&l!==""?`
`:"")+Dn(l,e),i=s}return o}function Dn(t,e){if(t===""||t[0]===" ")return t;for(var n=/ [^ ]/g,o,i=0,s,r=0,a=0,l="";o=n.exec(t);)a=o.index,a-i>e&&(s=r>i?r:a,l+=`
`+t.slice(i,s),i=s+1),r=a;return l+=`
`,t.length-i>e&&r>i?l+=t.slice(i,r)+`
`+t.slice(r+1):l+=t.slice(i),l.slice(1)}function pa(t){for(var e="",n=0,o,i=0;i<t.length;n>=65536?i+=2:i++)n=je(t,i),o=ee[n],!o&&Je(n)?(e+=t[i],n>=65536&&(e+=t[i+1])):e+=o||na(n);return e}function ua(t,e,n){var o="",i=t.tag,s,r,a;for(s=0,r=n.length;s<r;s+=1)a=n[s],t.replacer&&(a=t.replacer.call(n,String(s),a)),(ye(t,e,a,!1,!1)||typeof a>"u"&&ye(t,e,null,!1,!1))&&(o!==""&&(o+=","+(t.condenseFlow?"":" ")),o+=t.dump);t.tag=i,t.dump="["+o+"]"}function On(t,e,n,o){var i="",s=t.tag,r,a,l;for(r=0,a=n.length;r<a;r+=1)l=n[r],t.replacer&&(l=t.replacer.call(n,String(r),l)),(ye(t,e+1,l,!0,!0,!1,!0)||typeof l>"u"&&ye(t,e+1,null,!0,!0,!1,!0))&&((!o||i!=="")&&(i+=Rt(t,e)),t.dump&&Xe===t.dump.charCodeAt(0)?i+="-":i+="- ",i+=t.dump);t.tag=s,t.dump=i||"[]"}function ha(t,e,n){var o="",i=t.tag,s=Object.keys(n),r,a,l,c,d;for(r=0,a=s.length;r<a;r+=1)d="",o!==""&&(d+=", "),t.condenseFlow&&(d+='"'),l=s[r],c=n[l],t.replacer&&(c=t.replacer.call(n,l,c)),ye(t,e,l,!1,!1)&&(t.dump.length>1024&&(d+="? "),d+=t.dump+(t.condenseFlow?'"':"")+":"+(t.condenseFlow?"":" "),ye(t,e,c,!1,!1)&&(d+=t.dump,o+=d));t.tag=i,t.dump="{"+o+"}"}function ga(t,e,n,o){var i="",s=t.tag,r=Object.keys(n),a,l,c,d,u,h;if(t.sortKeys===!0)r.sort();else if(typeof t.sortKeys=="function")r.sort(t.sortKeys);else if(t.sortKeys)throw new ne("sortKeys must be a boolean or a function");for(a=0,l=r.length;a<l;a+=1)h="",(!o||i!=="")&&(h+=Rt(t,e)),c=r[a],d=n[c],t.replacer&&(d=t.replacer.call(n,c,d)),ye(t,e+1,c,!0,!0,!0)&&(u=t.tag!==null&&t.tag!=="?"||t.dump&&t.dump.length>1024,u&&(t.dump&&Xe===t.dump.charCodeAt(0)?h+="?":h+="? "),h+=t.dump,u&&(h+=Rt(t,e)),ye(t,e+1,d,!0,u)&&(t.dump&&Xe===t.dump.charCodeAt(0)?h+=":":h+=": ",h+=t.dump,i+=h));t.tag=s,t.dump=i||"{}"}function Rn(t,e,n){var o,i,s,r,a,l;for(i=n?t.explicitTypes:t.implicitTypes,s=0,r=i.length;s<r;s+=1)if(a=i[s],(a.instanceOf||a.predicate)&&(!a.instanceOf||typeof e=="object"&&e instanceof a.instanceOf)&&(!a.predicate||a.predicate(e))){if(n?a.multi&&a.representName?t.tag=a.representName(e):t.tag=a.tag:t.tag="?",a.represent){if(l=t.styleMap[a.tag]||a.defaultStyle,Qi.call(a.represent)==="[object Function]")o=a.represent(e,l);else if(eo.call(a.represent,l))o=a.represent[l](e,l);else throw new ne("!<"+a.tag+'> tag resolver accepts not "'+l+'" style');t.dump=o}return!0}return!1}function ye(t,e,n,o,i,s,r){t.tag=null,t.dump=n,Rn(t,n,!1)||Rn(t,n,!0);var a=Qi.call(t.dump),l=o,c;o&&(o=t.flowLevel<0||t.flowLevel>e);var d=a==="[object Object]"||a==="[object Array]",u,h;if(d&&(u=t.duplicates.indexOf(n),h=u!==-1),(t.tag!==null&&t.tag!=="?"||h||t.indent!==2&&e>0)&&(i=!1),h&&t.usedDuplicates[u])t.dump="*ref_"+u;else{if(d&&h&&!t.usedDuplicates[u]&&(t.usedDuplicates[u]=!0),a==="[object Object]")o&&Object.keys(t.dump).length!==0?(ga(t,e,t.dump,i),h&&(t.dump="&ref_"+u+t.dump)):(ha(t,e,t.dump),h&&(t.dump="&ref_"+u+" "+t.dump));else if(a==="[object Array]")o&&t.dump.length!==0?(t.noArrayIndent&&!r&&e>0?On(t,e-1,t.dump,i):On(t,e,t.dump,i),h&&(t.dump="&ref_"+u+t.dump)):(ua(t,e,t.dump),h&&(t.dump="&ref_"+u+" "+t.dump));else if(a==="[object String]")t.tag!=="?"&&da(t,t.dump,e,s,l);else{if(a==="[object Undefined]")return!1;if(t.skipInvalid)return!1;throw new ne("unacceptable kind of an object to dump "+a)}t.tag!==null&&t.tag!=="?"&&(c=encodeURI(t.tag[0]==="!"?t.tag.slice(1):t.tag).replace(/!/g,"%21"),t.tag[0]==="!"?c="!"+c:c.slice(0,18)==="tag:yaml.org,2002:"?c="!!"+c.slice(18):c="!<"+c+">",t.dump=c+" "+t.dump)}return!0}function fa(t,e){var n=[],o=[],i,s;for(Ht(t,n,o),i=0,s=o.length;i<s;i+=1)e.duplicates.push(n[o[i]]);e.usedDuplicates=new Array(s)}function Ht(t,e,n){var o,i,s;if(t!==null&&typeof t=="object")if(i=e.indexOf(t),i!==-1)n.indexOf(i)===-1&&n.push(i);else if(e.push(t),Array.isArray(t))for(i=0,s=t.length;i<s;i+=1)Ht(t[i],e,n);else for(o=Object.keys(t),i=0,s=o.length;i<s;i+=1)Ht(t[o[i]],e,n)}function ma(t,e){e=e||{};var n=new oa(e);n.noRefs||fa(t,n);var o=t;return n.replacer&&(o=n.replacer.call({"":o},"",o)),ye(n,0,o,!0,!0)?n.dump+`
`:""}var ya=ma,_a={dump:ya};function pn(t,e){return function(){throw new Error("Function yaml."+t+" is removed in js-yaml 4. Use yaml."+e+" instead, which is now safe by default.")}}var Be=Z,po=Ei,uo=Pi,ho=Di,go=Oi,Ve=an,gt=Zi.load,fo=Zi.loadAll,mo=_a.dump,yo=ne,_o={binary:Gi,float:Mi,map:ki,null:Li,pairs:Wi,set:$i,timestamp:Hi,bool:Ti,int:Ai,merge:Ni,omap:Fi,seq:Ci,str:Ii},vo=pn("safeLoad","load"),bo=pn("safeLoadAll","loadAll"),xo=pn("safeDump","dump"),va={Type:Be,Schema:po,FAILSAFE_SCHEMA:uo,JSON_SCHEMA:ho,CORE_SCHEMA:go,DEFAULT_SCHEMA:Ve,load:gt,loadAll:fo,dump:mo,YAMLException:yo,types:_o,safeLoad:vo,safeLoadAll:bo,safeDump:xo};const wo=Object.freeze(Object.defineProperty({__proto__:null,CORE_SCHEMA:go,DEFAULT_SCHEMA:Ve,FAILSAFE_SCHEMA:uo,JSON_SCHEMA:ho,Schema:po,Type:Be,YAMLException:yo,default:va,dump:mo,load:gt,loadAll:fo,safeDump:xo,safeLoad:vo,safeLoadAll:bo,types:_o},Symbol.toStringTag,{value:"Module"}));function ba(t,e){const n={orientation:"landscape",dark_mode:!1,sleep_enabled:!1,sleep_start_hour:0,sleep_end_hour:5,manual_refresh_only:!1,deep_sleep_enabled:!1,deep_sleep_interval:600,daily_refresh_enabled:!1,daily_refresh_time:"08:00",refresh_interval:600};for(const o of t){const i=o.trim();if(!i.startsWith("#"))continue;let s;if((s=i.match(/TARGET DEVICE:\s*(.*)/i))&&(n.target_device=s[1].trim()),(s=i.match(/Name:\s*(.*)/i))&&(n.name=s[1].trim()),(s=i.match(/Resolution:\s*(\d+)x(\d+)/i))&&(n.width=parseInt(s[1],10),n.height=parseInt(s[2],10)),(s=i.match(/Shape:\s*(rect|round|circle)/i))&&(n.shape=s[1].toLowerCase()==="rect"?"rect":"round"),(s=i.match(/Inverted:\s*(true|false)/i))&&(n.inverted_colors=s[1].toLowerCase()==="true"),(s=i.match(/Orientation:\s*(landscape|portrait)/i))&&(n.orientation=s[1].toLowerCase()),(s=i.match(/Dark Mode:\s*(enabled|disabled)/i))&&(n.dark_mode=s[1].toLowerCase()==="enabled"),(s=i.match(/Refresh Interval:\s*(\d+)/i))&&(n.refresh_interval=parseInt(s[1],10)),s=i.match(/Power Strategy:\s*(.*)/i)){const r=s[1].trim().toLowerCase();n.sleep_enabled=r.includes("night"),n.manual_refresh_only=r.includes("manual"),n.deep_sleep_enabled=r.includes("ultra")||r.includes("deep"),n.daily_refresh_enabled=r.includes("daily")}(s=i.match(/Sleep Mode:\s*(enabled|disabled)/i))&&(n.sleep_enabled=s[1].toLowerCase()==="enabled"),(s=i.match(/Sleep Start Hour:\s*(\d+)/i))&&(n.sleep_start_hour=parseInt(s[1],10)),(s=i.match(/Sleep End Hour:\s*(\d+)/i))&&(n.sleep_end_hour=parseInt(s[1],10)),(s=i.match(/Manual Refresh:\s*(enabled|disabled)/i))&&(n.manual_refresh_only=s[1].toLowerCase()==="enabled"),(s=i.match(/Deep Sleep:\s*(enabled|disabled)/i))&&(n.deep_sleep_enabled=s[1].toLowerCase()==="enabled"),(s=i.match(/Deep Sleep Interval:\s*(\d+)/i))&&(n.deep_sleep_interval=parseInt(s[1],10)),(s=i.match(/Refresh Time:\s*(\d{2}:\d{2})/i))&&(n.daily_refresh_time=s[1]),(s=i.match(/Disable updates from\s*(\d+)\s*to\s*(\d+)/i))&&(n.no_refresh_start_hour=parseInt(s[1],10),n.no_refresh_end_hour=parseInt(s[2],10))}return e&&e.esphome&&e.esphome.name&&!n.name&&(n.name=e.esphome.name),n}function It(t,e,n){const o={};if(t.startsWith("lvgl_")){Object.entries(e).forEach(([r,a])=>{["id","type","x","y","w","h","width","height"].includes(r)||(a==="true"?o[r]=!0:a==="false"?o[r]=!1:o[r]=a)}),o.hidden=e.hidden==="true",o.clickable=e.clickable!=="false",o.checkable=e.checkable==="true",o.scrollable=e.scrollable!=="false",o.floating=e.floating==="true",o.ignore_layout=e.ignore_layout==="true",o.scrollbar_mode=e.scrollbar_mode||"AUTO",o.opa=parseInt(e.opa||255,10);const i=e.grid_cell_row_pos??e.grid_row,s=e.grid_cell_column_pos??e.grid_col;o.grid_cell_row_pos=i!=null?parseInt(i,10):null,o.grid_cell_column_pos=s!=null?parseInt(s,10):null,o.grid_cell_row_span=parseInt(e.grid_cell_row_span||e.grid_row_span||1,10),o.grid_cell_column_span=parseInt(e.grid_cell_column_span||e.grid_col_span||1,10),o.grid_cell_x_align=e.grid_cell_x_align||e.grid_x_align||"STRETCH",o.grid_cell_y_align=e.grid_cell_y_align||e.grid_y_align||"STRETCH"}if(t==="icon")return{code:e.code||"F0595",size:parseInt(e.size||48,10),color:e.color||"black",fit_icon_to_frame:e.fit==="true"||e.fit==="1"};if(t==="text"||t==="label")return{text:e.text||"",font_size:parseInt(e.font_size||e.size||20,10),font_family:e.font_family||e.font||"Roboto",font_weight:parseInt(e.font_weight||e.weight||400,10),italic:e.italic==="true"||e.italic===!0,bpp:parseInt(e.bpp||1,10),color:e.color||"black",text_align:e.align||e.text_align||"TOP_LEFT"};if(t==="sensor_text")return e.entity_2&&(n.entity_id_2=e.entity_2),{label_font_size:parseInt(e.label_font||e.label_font_size||14,10),value_font_size:parseInt(e.value_font||e.value_font_size||20,10),value_format:e.format||"label_value",color:e.color||"black",italic:e.italic==="true"||e.italic===!0||e.font_style==="italic",font_family:e.font_family||"Roboto",font_weight:parseInt(e.font_weight||400,10),prefix:e.prefix||"",postfix:e.postfix||"",unit:e.unit||"",hide_unit:e.hide_unit==="true"||e.hide_unit===!0,precision:parseInt(e.precision||-1,10),text_align:e.align||e.text_align||"TOP_LEFT",label_align:e.label_align||e.align||e.text_align||"TOP_LEFT",value_align:e.value_align||e.align||e.text_align||"TOP_LEFT",is_local_sensor:e.local==="true",is_text_sensor:e.text_sensor==="true",separator:e.separator||" ~ "};if(t==="datetime")return n.width=parseInt(e.w||200,10),n.height=parseInt(e.h||60,10),{format:e.format||"time_date",time_font_size:parseInt(e.time_font_size||e.time_size||e.time_font||28,10),date_font_size:parseInt(e.date_font_size||e.date_size||e.date_font||16,10),color:e.color||"black",italic:e.italic==="true"||e.italic===!0||e.font_style==="italic",font_family:e.font_family||"Roboto",text_align:e.align||e.text_align||"CENTER"};if(t==="progress_bar")return{show_label:e.show_label!=="false",show_percentage:e.show_pct!=="false",bar_height:parseInt(e.bar_h||e.bar_height||15,10),border_width:parseInt(e.border_w||e.border||1,10),color:e.color||"black",is_local_sensor:e.local==="true"};if(t==="battery_icon")return{size:parseInt(e.size||32,10),font_size:parseInt(e.font_size||12,10),color:e.color||"black",is_local_sensor:e.local==="true",fit_icon_to_frame:e.fit==="true"||e.fit==="1"};if(t==="wifi_signal")return{size:parseInt(e.size||24,10),font_size:parseInt(e.font_size||12,10),color:e.color||"black",is_local_sensor:e.local!=="false",show_dbm:e.show_dbm!=="false",fit_icon_to_frame:e.fit==="true"||e.fit==="1"};if(t==="ondevice_temperature")return{size:parseInt(e.size||32,10),font_size:parseInt(e.font_size||16,10),label_font_size:parseInt(e.label_font_size||10,10),color:e.color||"black",unit:e.unit||"°C",precision:parseInt(e.precision||1,10),show_label:e.show_label!=="false",is_local_sensor:e.local!=="false",fit_icon_to_frame:e.fit==="true"||e.fit==="1"};if(t==="ondevice_humidity")return{size:parseInt(e.size||32,10),font_size:parseInt(e.font_size||16,10),label_font_size:parseInt(e.label_font_size||10,10),color:e.color||"black",unit:e.unit||"%",precision:parseInt(e.precision||0,10),show_label:e.show_label!=="false",is_local_sensor:e.local!=="false",fit_icon_to_frame:e.fit==="true"||e.fit==="1"};if(t==="weather_icon")return{size:parseInt(e.size||48,10),color:e.color||"black"};if(t==="qr_code")return{value:e.value||"https://esphome.io",scale:parseInt(e.scale||2,10),ecc:e.ecc||"LOW",color:e.color||"black"};if(t==="image")return{path:(e.path||"").replace(/^"|"$/g,""),invert:e.invert==="true"||e.invert==="1",dither:e.dither||"FLOYDSTEINBERG",transparency:e.transparency||"",image_type:e.img_type||"BINARY",render_mode:e.render_mode||"Auto"};if(t==="online_image")return{url:e.url||"",invert:e.invert==="true"||e.invert==="1",interval_s:parseInt(e.interval||300,10),render_mode:e.render_mode||"Auto"};if(t==="puppet")return{image_url:e.url||"",invert:e.invert==="true"||e.invert==="1",image_type:e.img_type||"RGB565",transparency:e.transparency||"opaque",render_mode:e.render_mode||"Auto"};if(t==="shape_rect")return{fill:e.fill==="true"||e.fill==="1",border_width:parseInt(e.border||1,10),color:e.color||"black",border_color:e.border_color||e.color||"black",opacity:parseInt(e.opacity||100,10)};if(t==="touch_area")return{title:e.title||"Touch Area",color:e.color||"rgba(0, 0, 255, 0.2)",border_color:e.border_color||"#0000ff",icon:e.icon||"",icon_pressed:e.icon_pressed||"",icon_size:parseInt(e.icon_size||40,10),icon_color:e.icon_color||"black",nav_action:e.nav_action||"none"};if(t==="rounded_rect")return{fill:e.fill==="true"||e.fill==="1",show_border:e.show_border!=="false"&&e.show_border!=="0",border_width:parseInt(e.border||4,10),radius:parseInt(e.radius||10,10),color:e.color||"black",border_color:e.border_color||"black",opacity:parseInt(e.opacity||100,10)};if(t==="shape_circle")return{fill:e.fill==="true"||e.fill==="1",border_width:parseInt(e.border||1,10),color:e.color||"black",border_color:e.border_color||e.color||"black",opacity:parseInt(e.opacity||100,10)};if(t==="line")return{stroke_width:parseInt(e.stroke||3,10),color:e.color||"black",orientation:e.orientation||"horizontal"};if(t==="graph")return e.entity&&(n.entity_id=e.entity),{duration:e.duration||"1h",border:e.border==="true"||e.border==="1"||e.border==null,grid:e.grid==="true"||e.grid==="1"||e.grid==null,color:e.color||"black",x_grid:e.x_grid||"",y_grid:e.y_grid||"",line_thickness:parseInt(e.line_thickness||3,10),line_type:e.line_type||"SOLID",continuous:e.continuous!=="false"&&e.continuous!=="0",min_value:e.min_value||"",max_value:e.max_value||"",min_range:e.min_range||"",max_range:e.max_range||"",is_local_sensor:e.local==="true"};if(t==="quote_rss")return{feed_url:e.feed_url||"https://www.brainyquote.com/link/quotebr.rss",show_author:e.show_author!=="false",random:e.random!=="false",refresh_interval:e.refresh_interval||e.refresh||"24h",quote_font_size:parseInt(e.quote_font_size||e.quote_font||18,10),author_font_size:parseInt(e.author_font_size||e.author_font||14,10),font_family:e.font_family||e.font||"Roboto",font_weight:parseInt(e.font_weight||e.weight||400,10),color:e.color||"black",text_align:e.align||e.text_align||"TOP_LEFT",word_wrap:e.word_wrap!=="false"&&e.wrap!=="false",italic_quote:e.italic_quote!=="false"};if(t==="weather_forecast")return{weather_entity:e.weather_entity||"",forecast_mode:e.forecast_mode||"daily",hourly_slots:e.hourly_slots||"06,09,12,15,18,21",start_offset:parseInt(e.start_offset||0,10),layout:e.layout||"horizontal",show_high_low:e.show_high_low!=="false",day_font_size:parseInt(e.day_font_size||12,10),temp_font_size:parseInt(e.temp_font_size||14,10),icon_size:parseInt(e.icon_size||32,10),font_family:e.font_family||"Roboto",color:e.color||"black"};if(t==="template_sensor_bar")return{show_wifi:e.wifi!=="false",show_temperature:e.temp!=="false",show_humidity:e.hum!=="false",show_battery:e.bat!=="false",show_background:e.bg!=="false",background_color:e.bg_color||"gray",border_radius:parseInt(e.radius||8,10),icon_size:parseInt(e.icon_size||20,10),font_size:parseInt(e.font_size||14,10),color:e.color||"black"};if(t==="template_nav_bar")return{show_prev:e.prev!=="false",show_home:e.home!=="false",show_next:e.next!=="false",show_background:e.bg!=="false",background_color:e.bg_color||"gray",border_radius:parseInt(e.radius||8,10),icon_size:parseInt(e.icon_size||24,10),color:e.color||"black"};if(t==="lvgl_button")return e.title&&(n.title=e.title),{...o,text:e.text||"BTN",bg_color:e.bg_color||"white",color:e.color||"black",border_width:parseInt(e.border_width||e.border||2,10),radius:parseInt(e.radius||5,10),checkable:e.checkable==="true"};if(t==="lvgl_arc")return e.title&&(n.title=e.title,o.title=e.title),{...o,min:parseInt(e.min||0,10),max:parseInt(e.max||100,10),value:parseInt(e.value||0,10),thickness:parseInt(e.thickness||10,10),color:e.color||"blue",start_angle:parseInt(e.start_angle||135,10),end_angle:parseInt(e.end_angle||45,10),mode:e.mode||"NORMAL"};if(t==="lvgl_chart")return e.title&&(n.title=e.title),{...o,title:e.title||"Graph",type:e.type||"LINE",color:e.color||"black",bg_color:e.bg_color||"white",point_count:parseInt(e.point_count||10,10),x_div_lines:parseInt(e.x_div_lines||3,10),y_div_lines:parseInt(e.y_div_lines||3,10)};if(t==="lvgl_img")return{...o,src:e.src||"symbol_image",rotation:parseInt(e.rotation||0,10),scale:parseInt(e.scale||256,10),pivot_x:parseInt(e.pivot_x||0,10),pivot_y:parseInt(e.pivot_y||0,10),color:e.color||"black"};if(t==="lvgl_qrcode")return{...o,text:e.text||"https://esphome.io",scale:parseInt(e.scale||2,10),color:e.color||"black",bg_color:e.bg_color||"white"};if(t==="lvgl_bar")return{...o,min:parseInt(e.min||0,10),max:parseInt(e.max||100,10),value:parseInt(e.value||0,10),color:e.color||"blue",bg_color:e.bg_color||"gray",start_value:parseInt(e.start_value||0,10),mode:e.mode||"NORMAL"};if(t==="lvgl_slider")return{...o,min:parseInt(e.min||0,10),max:parseInt(e.max||100,10),value:parseInt(e.value||30,10),border_width:parseInt(e.border_width||2,10),color:e.color||"blue",bg_color:e.bg_color||"gray",mode:e.mode||"NORMAL",vertical:e.vertical==="true"||e.vertical===!0};if(t==="lvgl_tabview")return{...o,bg_color:e.bg_color||"white",tabs:(e.tabs||"").split(",").map(i=>i.trim()).filter(i=>i)};if(t==="lvgl_tileview")return{...o,bg_color:e.bg_color||"white",tiles:[]};if(t==="lvgl_led")return{...o,color:e.color||"red",brightness:parseInt(e.brightness||255,10)};if(t==="lvgl_spinner")return{...o,spin_time:parseInt(e.spin_time||1e3,10),arc_length:parseInt(e.arc_length||60,10),arc_color:e.arc_color||"blue",track_color:e.track_color||"white"};if(t==="lvgl_checkbox")return{...o,text:(e.text||"Checkbox").replace(/^"|"$/g,""),checked:e.checked==="true"||e.checked===!0,color:e.color||"blue"};if(t==="lvgl_dropdown")return{...o,options:(e.options||"").replace(/\\n/g,`
`),selected_index:parseInt(e.selected_index||0,10),color:e.color||"white",direction:e.direction||"DOWN",max_height:parseInt(e.max_height||200,10)};if(t==="lvgl_keyboard")return{...o,mode:e.mode||"TEXT_UPPER",textarea_id:e.textarea||""};if(t==="lvgl_roller")return{...o,options:(e.options||"").replace(/\\n/g,`
`),visible_row_count:parseInt(e.visible_row_count||3,10),color:e.color||"white",bg_color:e.bg_color||"black",selected_bg_color:e.selected_bg_color||"blue",selected_text_color:e.selected_text_color||"white",mode:e.mode||"NORMAL"};if(t==="lvgl_spinbox")return{...o,min:parseInt(e.range_from||e.min||0,10),max:parseInt(e.range_to||e.max||100,10),digit_count:parseInt(e.digits||e.digit_count||4,10),step:parseInt(e.step||1,10),value:parseInt(e.value||0,10)};if(t==="lvgl_switch")return{...o,checked:e.state==="true"||e.state===!0||e.checked==="true",bg_color:e.bg_color||"gray",color:e.color||"blue",knob_color:e.knob_color||"white"};if(t==="lvgl_textarea")return{...o,placeholder:(e.placeholder_text||e.placeholder||"").replace(/^"|"$/g,""),text:(e.text||"").replace(/^"|"$/g,""),one_line:e.one_line==="true"||e.one_line===!0,max_length:parseInt(e.max_length||0,10),password_mode:e.password_mode==="true",accepted_chars:e.accepted_chars||""};if(t==="lvgl_label")return{...o,text:(e.text||"Label").replace(/^"|"$/g,""),font_size:parseInt(e.font_size||e.size||20,10),font_family:e.font_family||"Roboto",font_weight:parseInt(e.font_weight||400,10),italic:e.italic==="true"||e.italic===!0,color:e.color||"black",bg_color:e.bg_color||"transparent",text_align:e.text_align||e.align||"CENTER"};if(t==="lvgl_line")return{...o,orientation:e.orientation||"horizontal",points:e.points||"",line_width:parseInt(e.line_width||3,10),line_color:e.line_color||e.color||"black",line_rounded:e.line_rounded!=="false"};if(t==="lvgl_meter")return{...o,min:parseInt(e.min||0,10),max:parseInt(e.max||100,10),value:parseInt(e.value||60,10),color:e.color||"black",indicator_color:e.indicator_color||"red",tick_count:parseInt(e.tick_count||11,10),tick_length:parseInt(e.tick_length||10,10),label_gap:parseInt(e.label_gap||10,10),scale_width:parseInt(e.scale_width||10,10),indicator_width:parseInt(e.indicator_width||4,10)};if(t==="lvgl_obj")return{...o,color:e.color||"white",border_width:parseInt(e.border_width||1,10),border_color:e.border_color||"gray",radius:parseInt(e.radius||0,10)};if(t==="calendar")return{entity_id:e.entity||"sensor.esp_calendar_data",border_width:parseInt(e.border_width||2,10),show_border:e.show_border!=="false",border_color:e.border_color||"black",background_color:e.background_color||"white",text_color:e.text_color||"black",font_size_date:parseInt(e.font_size_date||100,10),font_size_day:parseInt(e.font_size_day||24,10),font_size_grid:parseInt(e.font_size_grid||14,10),font_size_event:parseInt(e.font_size_event||18,10)};if(t.startsWith("lvgl_")){v.log("[YAML_IMPORT] Parsing generic LVGL",t,e.id,e);const i=["hidden","clickable","checkable","scrollable","floating","ignore_layout","scrollbar_mode","opa","grid_cell_row_pos","grid_cell_column_pos","grid_cell_row_span","grid_cell_column_span","grid_cell_x_align","grid_cell_y_align"];return Object.entries(e).forEach(([s,r])=>{if(s==="id"||s==="type"||s==="x"||s==="y"||s==="w"||s==="h"||i.includes(s))return;if(s==="title"){n.title=r;return}let a=r;if(Array.isArray(r))s==="options"?a=r.join(`
`):s==="points"&&(a=r.map(l=>Array.isArray(l)?l.join(","):String(l)).join(" "));else if(typeof r=="string"&&(/^-?\d+(\.\d+)?(ms|deg|px|%)$/.test(r)&&(a=r.replace(/(ms|deg|px|%)$/,"")),a.includes("\\u")))try{a=JSON.parse(`"${a}"`)}catch{}a==="true"?o[s]=!0:a==="false"?o[s]=!1:typeof a=="string"&&!isNaN(a)&&a!==""&&s!=="text"&&s!=="id"?o[s]=parseFloat(a):o[s]=a}),o}return o}function xa(t,e){let n;if(n=t.match(/^it\.rectangle\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*COLOR_OFF)?\s*\)\s*;?/),n)return{id:"w_rect_"+e,type:"shape_rect",x:parseInt(n[1],10),y:parseInt(n[2],10),width:parseInt(n[3],10),height:parseInt(n[4],10),title:"",entity_id:"",props:{fill:!1,border_width:1,color:"black",opacity:100}};if(n=t.match(/^it\.filled_rectangle\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*COLOR_OFF)?\s*\)\s*;?/),n)return{id:"w_frect_"+e,type:"shape_rect",x:parseInt(n[1],10),y:parseInt(n[2],10),width:parseInt(n[3],10),height:parseInt(n[4],10),title:"",entity_id:"",props:{fill:!0,border_width:1,color:"black",opacity:100}};if(n=t.match(/^it\.circle\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*COLOR_OFF)?\s*\)\s*;?/),n){const o=parseInt(n[3],10);return{id:"w_circle_"+e,type:"shape_circle",x:parseInt(n[1],10)-o,y:parseInt(n[2],10)-o,width:o*2,height:o*2,title:"",entity_id:"",props:{fill:!1,border_width:1,color:"black",opacity:100}}}if(n=t.match(/^it\.filled_circle\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*COLOR_OFF)?\s*\)\s*;?/),n){const o=parseInt(n[3],10);return{id:"w_fcircle_"+e,type:"shape_circle",x:parseInt(n[1],10)-o,y:parseInt(n[2],10)-o,width:o*2,height:o*2,title:"",entity_id:"",props:{fill:!0,border_width:1,color:"black",opacity:100}}}if(n=t.match(/^it\.line\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*;?/),n){const o=parseInt(n[1],10),i=parseInt(n[2],10),s=parseInt(n[3],10),r=parseInt(n[4],10);return{id:"w_line_"+e,type:"line",x:o,y:i,width:s-o,height:r-i,title:"",entity_id:"",props:{stroke_width:1,color:"black",orientation:Math.abs(r-i)>Math.abs(s-o)?"vertical":"horizontal"}}}return null}function wa(t,e,n,o,i){const s=new Map,r=new Map,a=new Map,l=new Map,c=new Map,d=new Map,u=new Map,h=new Map,p=new Map,f=new Map,y=(P,D,R)=>{const G=[];let H=D;for(;H<P.length;){const N=P[H];if(!N){H++;continue}const $=N.trim();if(!$||$.startsWith("#")){G.push(N),H++;continue}const j=N.match(/^(\s*)/);if((j?j[1].length:0)<R)break;G.push(N),H++}try{const N=G.join(`
`);return{value:i.load(N,{schema:o()}),nextJ:H}}catch(N){return v.error("Error parsing YAML sub-block:",N),{value:null,nextJ:H}}};let m=null,_=!1;const b=["label","button","arc","bar","slider","chart","dropdown","roller","spinbox","switch","textarea","obj","img","qrcode","led","spinner","line","meter","tabview","tileview","checkbox","keyboard","buttonmatrix","list","icon"],x={label:"lvgl_label",button:"lvgl_button",arc:"lvgl_arc",bar:"lvgl_bar",slider:"lvgl_slider",chart:"lvgl_chart",dropdown:"lvgl_dropdown",roller:"lvgl_roller",spinbox:"lvgl_spinbox",switch:"lvgl_switch",textarea:"lvgl_textarea",obj:"lvgl_obj",img:"lvgl_img",qrcode:"lvgl_qrcode",led:"lvgl_led",spinner:"lvgl_spinner",line:"lvgl_line",meter:"lvgl_meter",tabview:"lvgl_tabview",tileview:"lvgl_tileview",checkbox:"lvgl_checkbox",keyboard:"lvgl_keyboard",buttonmatrix:"lvgl_buttonmatrix",icon:"icon"};for(let P=0;P<t.length;P++){const D=t[P],R=D.trim();if(!R)continue;let G=D.match(/if\s*\(\s*(?:id\s*\(\s*display_page\s*\)|page|currentPage)\s*==\s*(\d+)\s*\)/);G&&(m=parseInt(G[1],10),_=!1,s.has(m)||s.set(m,[]));const H=D.match(/^\s*-\s*id:\s*(\w+)/);if(H){const F=H[1],le=F.match(/^page_(\d+)$/);let q=le?parseInt(le[1],10):s.size;s.has(q)||(s.set(q,[]),a.set(q,F)),m=q,_=!1}const N=D.match(/^\s*layout:\s*(\d+x\d+)/);if(N&&m!==null&&f.set(m,N[1]),R.startsWith("widgets:")){_=!0;continue}const $=D.match(/case\s+(\d+):\s*interval\s*=\s*(\d+);/);if($){const F=parseInt($[1],10);r.set(F,parseInt($[2],10)),s.has(F)||s.set(F,[])}const j=D.match(/\/\/\s*page:name\s+"(.+)"/);j&&m!==null&&a.set(m,j[1]);const ae=D.match(/\/\/\s*page:dark_mode\s+"(.+)"/);ae&&m!==null&&l.set(m,ae[1]);const te=D.match(/\/\/\s*page:refresh_type\s+"(.+)"/);te&&m!==null&&c.set(m,te[1]);const V=D.match(/\/\/\s*page:refresh_time\s+"(.*)"/);V&&m!==null&&d.set(m,V[1]);const se=D.match(/\/\/\s*page:visible_from\s+"(.*)"/);se&&m!==null&&u.set(m,se[1]);const ie=D.match(/\/\/\s*page:visible_to\s+"(.*)"/);if(ie&&m!==null&&h.set(m,ie[1]),!_){const F=D.match(/^\s*bg_color:\s*(.*)/);if(F&&m!==null){let q=F[1].trim().replace(/^["']|["']$/g,"");q.startsWith("0x")&&(q="#"+q.substring(2)),p.has(m)||p.set(m,{}),p.get(m).bg_color=q}const le=D.match(/^\s*bg_opa:\s*(.*)/);if(le&&m!==null){let q=le[1].trim().replace(/^["']|["']$/g,"");q.endsWith("%")&&(q=String(Math.round(parseFloat(q)*2.55))),p.has(m)||p.set(m,{}),p.get(m).bg_opa=parseInt(q,10)}}}s.size===0&&s.set(0,[]);const S={settings:n,pages:Array.from(s.entries()).sort((P,D)=>P[0]-D[0]).map(([P,D])=>({id:`page_${P}`,name:a.has(P)?a.get(P):`Page ${P+1}`,refresh_s:r.has(P)?r.get(P):null,refresh_type:c.has(P)?c.get(P):"interval",refresh_time:d.has(P)?d.get(P):"",visible_from:u.has(P)?u.get(P):"",visible_to:h.has(P)?h.get(P):"",dark_mode:l.has(P)?l.get(P):"inherit",layout:f.has(P)?f.get(P):null,bg_color:p.has(P)?p.get(P).bg_color:null,bg_opa:p.has(P)?p.get(P).bg_opa:null,widgets:[]}))};m=0;const E=()=>{const P=S.pages.find((D,R)=>R===m);return P?P.widgets:S.pages[0].widgets},w=P=>{const D=P.match(/^(?:#\s*|\/\/\s*)widget:(\w+)\s+(.+)$/);if(!D)return null;const R=D[1],G=D[2],H={},N=/(\w+):(?:"([^"]*)"|([^:]*?)(?=\s+\w+:|$))/g;let $;for(;($=N.exec(G))!==null;){let j=$[2]!==void 0?$[2]:$[3];j&&(j=j.trim()),H[$[1]]=j}return{widgetType:R,props:H}};let I=!1;for(let P=0;P<t.length;P++){const D=t[P],R=D.trim();if(!R||R.startsWith("#")&&!R.match(/^#\s*widget:/))continue;let G=R.match(/if\s*\(\s*(?:id\s*\(\s*display_page\s*\)|page|currentPage)\s*==\s*(\d+)\s*\)/);if(G){m=parseInt(G[1],10);continue}const H=R.match(/^-\s*id:\s*(\w+)/);if(H){const te=H[1],V=te.match(/^page_(\d+)$/);m=V?parseInt(V[1],10):Array.from(a.entries()).find(([se,ie])=>ie===te)?.[0]||0;continue}const N=E();if(I)if(R.match(/^(?:#\s*|\/\/\s*)widget:/)||R.match(/^\s*-\s*id:/)||!D.match(/^\s/))I=!1;else continue;if(R.startsWith("//")||R.startsWith("#")){const te=w(R);if(te&&te.props.id){const V=te.props,se=te.widgetType||V.type;if(!se)continue;const ie={id:V.id,type:se,x:parseInt(V.x||0,10),y:parseInt(V.y||0,10),width:parseInt(V.w||100,10),height:parseInt(V.h||30,10),title:V.title||"",entity_id:V.entity||V.ent||"",props:{}};ie.props=It(se,V,ie),N.push(ie),I=!0;continue}continue}const $=xa(R,N.length);if($){N.push($);continue}const j=new RegExp(`^(\\s*)-?\\s*(${b.join("|")}):\\s*(.*)$`),ae=D.match(j);if(ae){const te=ae[1].length,V=ae[2],se=ae[3].trim(),ie=x[V]||`lvgl_${V}`,F={};se&&(F._inline=se.replace(/^["']|["']$/g,""));const le=y(t,P+1,te+2);Object.assign(F,le.value),P=le.nextJ-1;const q={id:F.id||`lv_${V}_${N.length}`,type:ie,x:parseInt(F.x||0,10),y:parseInt(F.y||0,10),width:parseInt(F.width||F.w||100,10),height:parseInt(F.height||F.h||30,10),title:F.title||F.name||"",entity_id:F.entity_id||F.entity||F.sensor||"",props:{}};q.props=It(ie,F,q),N.push(q),Array.isArray(F.widgets)&&F.widgets.forEach($e=>{const k=Object.keys($e)[0],O=$e[k];if(k&&O){const W=x[k]||`lvgl_${k}`,pe={id:O.id||`lv_${k}_${N.length}`,type:W,x:q.x+parseInt(O.x||0,10),y:q.y+parseInt(O.y||0,10),width:parseInt(O.width||O.w||50,10),height:parseInt(O.height||O.h||20,10),props:{}};pe.props=It(W,O,pe),N.push(pe)}})}}return S}function Sa(t,e){const n=[];let o=!1,i=0,s=null;for(const r of t){const a=r.replace(/\t/g,"    "),l=a.trim();if(!o){if(a.match(/^\s*lambda:\s*\|\-/)){o=!0,s="lambda",i=0;continue}else if(a.match(/^\s*lvgl:\s*$/)){o=!0,s="lvgl",i=0;continue}else if(a.match(/^\s*"?(?:open_epaper_link\.drawcustom|payload)"?:\s*(?:\[|\|-)?/)){o=!0,s="oepl",i=0;continue}else if(a.match(/^\s*service:\s*opendisplay\.drawcustom/)){o=!0,s="odp_service",i=0;continue}else if(a.match(/^\s*"actions":\s*\[/)){o=!0,s="odp",i=0;continue}}if(o){const c=a.match(/^(\s*)/),d=c?c[1].length:0;if(l===""){n.push("");continue}if(i===0&&l!==""&&!l.startsWith("#")&&!l.startsWith("//")&&(i=d),l.startsWith("#")||l.startsWith("//")){n.push(a);continue}if(i!==0&&d<i&&l!==""&&(a.match(/^\w+:/)||a.match(/^\s*}/)||d<i)){o=!1;continue}s==="lambda"?n.push(a.slice(i)):n.push(a)}}return v.log(`[extractLambdaLines] Collected ${n.length} lines from ${s} block`),n}const Ea=["text","rectangle","circle","icon","qrcode","progress_bar","debug_grid","line","multiline","plot","dlimg","image","rectangle_pattern","polygon","ellipse","arc","icon_sequence"];function Ia(t){if(!t.trim().startsWith("-"))return!1;const n=/^\s*(?:-\s*)?type:\s*["']?([\w_]+)["']?/m,o=t.match(n);if(o){const i=o[1].toLowerCase();if(Ea.includes(i))return!0}return!1}function Ca(t){if(!t||typeof t!="string"||!t.includes("{{"))return null;const e=t.match(/^(.*?){{\s*states\(['"]([^'"]+)['"]\)\s*}}(.*)$/s);return e?{prefix:e[1],entity_id:e[2].trim(),postfix:e[3]}:null}function Bn(t){v.log("[parseOEPLArrayToLayout] Parsing OEPL array with",t.length,"items");const e={settings:{orientation:"landscape",dark_mode:!1},pages:[{id:"page_0",name:"Main",widgets:[]}]},n=e.pages[0].widgets;return t.forEach((o,i)=>{if(!o||!o.type)return;const s=o.type.toLowerCase();let r={id:o.id||`oepl_${s}_${i}`,type:s,x:parseInt(o.x??0,10),y:parseInt(o.y??0,10),width:100,height:30,entity_id:"",props:{}};switch(s){case"text":const a=o.value||o.text||"",l=Ca(a),c=parseInt(o.size||20,10);l?(r.type="sensor_text",r.entity_id=l.entity_id,r.width=c*8,r.height=c*1.5,r.props={value_font_size:c,font_family:o.font?o.font.replace(".ttf",""):"Roboto",color:o.fill||o.color||"black",prefix:l.prefix,postfix:l.postfix,value_format:"value_only",hide_unit:!0}):(r.width=c*6,r.height=c*1.5,r.props={text:a,font_size:c,font_family:o.font?o.font.replace(".ttf",""):"Roboto",color:o.fill||o.color||"black"});break;case"multiline":const d=o.delimiter||"|",u=(o.value||"").split(d),h=parseInt(o.size||16,10),p=parseInt(o.offset_y||h+4,10);r.type="odp_multiline",r.width=h*10,r.height=p*(u.length||1),r.props={text:o.value||"",delimiter:d,font_size:h,font_family:o.font?o.font.replace(".ttf",""):"Roboto",color:o.fill||o.color||"black",line_spacing:Math.max(0,p-h)};break;case"rectangle":r.type="shape_rect",r.x=parseInt(o.x_start||o.x||0,10),r.y=parseInt(o.y_start||o.y||0,10),r.width=Math.abs(parseInt(o.x_end||100,10)-r.x),r.height=Math.abs(parseInt(o.y_end||50,10)-r.y),r.props={fill:o.fill?o.fill!=="white"&&o.fill!=="#ffffff":!1,border_width:parseInt(o.width||1,10),color:o.fill||"white",border_color:o.outline||"black",opacity:100};break;case"circle":r.type="shape_circle";const f=parseInt(o.radius||25,10);r.x=parseInt(o.x||0,10)-f,r.y=parseInt(o.y||0,10)-f,r.width=f*2,r.height=f*2,r.props={fill:o.fill?o.fill!=="white"&&o.fill!=="#ffffff":!1,border_width:parseInt(o.width||1,10),color:o.fill||"black",border_color:o.outline||o.fill||"black",opacity:100};break;case"icon":const y=parseInt(o.size||24,10);r.width=y,r.height=y,r.props={code:o.value||"mdi:home",size:y,color:o.fill||o.color||"black",fit_icon_to_frame:!0};break;case"qrcode":const m=parseInt(o.boxsize||2,10),b=(25+parseInt(o.border||1,10)*2)*m;r.type="qr_code",r.width=b,r.height=b,r.props={value:o.data||o.value||"https://esphome.io",scale:m,ecc:"LOW",color:o.color||"black"};break;case"progress_bar":r.x=parseInt(o.x_start||o.x||0,10),r.y=parseInt(o.y_start||o.y||0,10),r.width=Math.abs(parseInt(o.x_end||100,10)-r.x),r.height=Math.abs(parseInt(o.y_end||20,10)-r.y),r.props={show_label:!1,show_percentage:o.show_percentage===!0||o.show_percentage==="true",bar_height:r.height,border_width:parseInt(o.width||1,10),color:o.fill||"black",progress_value:parseInt(o.progress||0,10),direction:o.direction||"right"};break;case"line":r.x=parseInt(o.x_start||o.x||0,10),r.y=parseInt(o.y_start||o.y||0,10);const x=parseInt(o.x_end||100,10),S=parseInt(o.y_end||r.y,10);r.width=Math.abs(x-r.x)||1,r.height=Math.abs(S-r.y)||1,r.props={stroke_width:parseInt(o.width||1,10),color:o.fill||o.color||"black",orientation:Math.abs(S-r.y)>Math.abs(x-r.x)?"vertical":"horizontal"};break;case"debug_grid":r.type="odp_debug_grid",r.x=0,r.y=0,r.width=800,r.height=480,r.props={spacing:parseInt(o.spacing||20,10),line_color:o.line_color||"black",dashed:o.dashed!==!1,dash_length:parseInt(o.dash_length||2,10),space_length:parseInt(o.space_length||4,10),show_labels:o.show_labels!==!1,label_step:parseInt(o.label_step||40,10),label_color:o.label_color||"black",label_font_size:parseInt(o.label_font_size||12,10)};break;case"dlimg":case"image":r.type="online_image",r.width=parseInt(o.xsize||o.width||100,10),r.height=parseInt(o.ysize||o.height||100,10),r.props={url:o.url||"",invert:!1,interval_s:300,rotation:parseInt(o.rotate||0,10)};break;case"plot":r.type="odp_plot",r.x=parseInt(o.x_start||o.x||0,10),r.y=parseInt(o.y_start||o.y||0,10),r.width=Math.abs(parseInt(o.x_end||200,10)-r.x),r.height=Math.abs(parseInt(o.y_end||100,10)-r.y),r.props={duration:o.duration||86400,data:Array.isArray(o.data)?o.data:o.data?[o.data]:[],background:o.background||"white",outline:o.outline||"#ccc",ylegend:o.ylegend||null};break;case"rectangle_pattern":r.type="odp_rectangle_pattern",r.x=parseInt(o.x_start||o.x||0,10),r.y=parseInt(o.y_start||o.y||0,10),r.width=Math.abs(parseInt(o.x_end||120,10)-r.x)||120,r.height=Math.abs(parseInt(o.y_end||80,10)-r.y)||80,r.props={x_size:parseInt(o.x_size||30,10),y_size:parseInt(o.y_size||15,10),x_offset:parseInt(o.x_offset||5,10),y_offset:parseInt(o.y_offset||5,10),x_repeat:parseInt(o.x_repeat||3,10),y_repeat:parseInt(o.y_repeat||2,10),fill:o.fill||"white",outline:o.outline||"black",border_width:parseInt(o.width||1,10)};break;case"polygon":if(r.type="odp_polygon",Array.isArray(o.points)&&o.points.length>0){const R=o.points.map($=>$[0]),G=o.points.map($=>$[1]),H=Math.min(...R),N=Math.min(...G);r.x=H,r.y=N,r.width=Math.max(...R)-H||100,r.height=Math.max(...G)-N||100,r.props={points:o.points.map(([$,j])=>[$-H,j-N]),fill:o.fill||"red",outline:o.outline||"black",border_width:parseInt(o.width||1,10)}}break;case"ellipse":r.type="odp_ellipse",r.x=parseInt(o.x_start||o.x||0,10),r.y=parseInt(o.y_start||o.y||0,10),r.width=Math.abs(parseInt(o.x_end||150,10)-r.x)||150,r.height=Math.abs(parseInt(o.y_end||80,10)-r.y)||80,r.props={fill:o.fill||null,outline:o.outline||"black",border_width:parseInt(o.width||1,10)};break;case"arc":const E=parseInt(o.radius||50,10);r.type="odp_arc",r.x=parseInt(o.x||0,10)-E,r.y=parseInt(o.y||0,10)-E,r.width=E*2,r.height=E*2,r.props={radius:E,start_angle:parseInt(o.start_angle||0,10),end_angle:parseInt(o.end_angle||90,10),outline:o.outline||"black",border_width:parseInt(o.width||2,10)};break;case"icon_sequence":const w=parseInt(o.size||24,10),I=parseInt(o.spacing||6,10),P=o.icons||["mdi:home","mdi:arrow-right","mdi:office-building"],D=o.direction==="down";r.type="odp_icon_sequence",r.width=D?w:P.length*(w+I)-I,r.height=D?P.length*(w+I)-I:w,r.props={icons:P,size:w,direction:o.direction||"right",spacing:I,fill:o.fill||"black"};break;default:v.warn(`[parseOEPLArrayToLayout] Unknown OEPL type: ${s}`);return}n.push(r)}),e}function Hn(){if(!wo||!Be||!Ve)return null;try{const t=new Be("!lambda",{kind:"scalar",construct:o=>o}),e=new Be("!secret",{kind:"scalar",construct:o=>o}),n=new Be("!include",{kind:"scalar",construct:o=>o});return Ve.extend([t,e,n])}catch{return v.warn("[getESPHomeSchema] Could not extend schema, falling back to default."),Ve}}function Nn(t){v.log("[parseSnippetYamlOffline] Start parsing...");const e=t.split(/\r?\n/);let n={};try{const r=Hn();n=gt(t,r?{schema:r}:{})||{}}catch(r){v.error("[parseSnippetYamlOffline] YAML parse error:",r)}if(Ia(t)&&Array.isArray(n))return v.log("[parseSnippetYamlOffline] Detected bare OEPL/ODP array format"),Bn(n);if(n&&n.service&&["opendisplay.drawcustom","open_epaper_link.drawcustom"].includes(n.service)&&n.data&&n.data.payload){let r=n.data.payload;if(typeof r=="string")try{r=gt(r)}catch(a){v.error("[parseSnippetYamlOffline] Failed to re-parse payload string:",a)}if(Array.isArray(r))return v.log("[parseSnippetYamlOffline] Detected full ODP/OEPL service call"),Bn(r)}const o=[];if(n.display&&(Array.isArray(n.display)?n.display:[n.display]).forEach(a=>{a&&a.lambda&&o.push(...a.lambda.split(`
`))}),o.length===0||t.includes("lvgl:")){const r=Sa(e);o.push(...r)}const i=ba(e,n);return wa(o,e,i,Hn,wo)}function Ee(t){if(!t)return;v.log("[loadLayoutIntoState] Loading layout...");let e=t;if(t.data&&t.data.devices){const n=Object.keys(t.data.devices)[0];e=t.data.devices[n]}if(e.name?g.setDeviceName(e.name):e.deviceName&&g.setDeviceName(e.deviceName),e.device_model?g.setDeviceModel(e.device_model):e.deviceModel&&g.setDeviceModel(e.deviceModel),e.device_id?g.setCurrentLayoutId(e.device_id):e.currentLayoutId&&g.setCurrentLayoutId(e.currentLayoutId),e.settings&&g.updateSettings&&g.updateSettings(e.settings),e.customHardware&&g.setCustomHardware&&g.setCustomHardware(e.customHardware),e.pages&&g.setPages){const n=e.pages.map(o=>({...o,widgets:(o.widgets||[]).map(i=>({...i,locked:!!i.locked}))}));g.setPages(n)}v.log("[loadLayoutIntoState] Finished loading state.")}let _e=[],Ct=!1,ka=!1,et=!1;function ce(){const t={"Content-Type":"application/json"},e=vt();return e&&e.trim()!==""&&e!=="null"&&(t.Authorization=`Bearer ${e}`),t}const Nt="entity-datalist-global";let Ie=null;function So(){return Ie||(Ie=document.getElementById(Nt),Ie||(Ie=document.createElement("datalist"),Ie.id=Nt,document.body.appendChild(Ie))),Ie}function Pa(t){const e=So();e.innerHTML="",!(!t||t.length===0)&&(t.forEach(n=>{const o=document.createElement("option");o.value=n.entity_id,o.label=n.name||n.entity_id,e.appendChild(o)}),v.log(`[EntityDatalist] Updated with ${t.length} entities`))}async function Te(){if(!z())return[];if(Ct)return _e;Ct=!0;try{const t=new AbortController,e=setTimeout(()=>t.abort(),1e4),n=X.includes("api/esphome_designer")&&!window.location.pathname.includes("esphome-designer");let o,i=!1;const s=vt();o=`${X}/entities?domains=sensor,binary_sensor,weather,light,switch,fan,cover,climate,media_player,input_number,number,input_boolean,input_text,input_select,button,input_button,calendar,person,device_tracker,sun,update,scene`,v.log("[EntityStates] Fetching from:",o);let r;try{r=await fetch(o,{headers:ce(),signal:t.signal})}catch(l){if(s&&X)o=`${X.replace("/api/esphome_designer","")}/api/states`,v.log("[EntityStates] Custom endpoint failed, trying native HA API:",o),i=!0,r=await fetch(o,{headers:ce(),signal:t.signal});else throw l}if(clearTimeout(e),!r.ok)return v.warn("[EntityStates] Failed to fetch:",r.status),et=!0,[];let a=await r.json();if(i&&Array.isArray(a)){const l=["sensor","binary_sensor","weather","light","switch","fan","cover","climate","media_player","input_number","number","input_boolean","input_text","input_select","button","input_button","calendar","person","device_tracker","sun","update","scene"];a=a.filter(c=>{const d=c.entity_id?.split(".")[0];return l.includes(d)}).map(c=>({entity_id:c.entity_id,name:c.attributes?.friendly_name||c.entity_id,state:c.state,unit:c.attributes?.unit_of_measurement,attributes:c.attributes||{}}))}return Array.isArray(a)?(v.log(`[EntityStates] Received ${a.length} entities`),_e=a.map(l=>{const c=l.unit?`${l.state} ${l.unit}`:l.state;return{entity_id:l.entity_id,name:l.name||l.entity_id,state:l.state,unit:l.unit,attributes:l.attributes||{},formatted:c}}),ka=!0,et=!1,v.log(`[EntityStates] Cached ${_e.length} entity states`),g&&(g.entityStates={},_e.forEach(l=>{g.entityStates[l.entity_id]=l}),v.log(`[EntityStates] Populated AppState.entityStates with ${Object.keys(g.entityStates).length} entries`)),Pa(_e),L(C.ENTITIES_LOADED,_e),_e):(v.warn("[EntityStates] Invalid response format"),et=!0,[])}catch(t){return t.name==="AbortError"?v.warn("[EntityStates] Request timed out after 10 seconds"):v.warn("[EntityStates] Error fetching:",t),et=!0,[]}finally{Ct=!1}}function gd(t){const e=_e.find(n=>n.entity_id===t);return e?e.attributes:null}let Gn=!1;async function fd(t,e="24h"){if(!z()||!t)return[];try{const n=`${X}/history/${encodeURIComponent(t)}?duration=${encodeURIComponent(e)}`,o=await fetch(n,{headers:ce()});if(!o.ok){const s=await o.text().catch(()=>"Unknown error");return Gn||(v.log(`[EntityHistory] History fetch failed for ${t}: ${s}`),Gn=!0),[]}const i=await o.json();return Array.isArray(i)?i:[]}catch{return[]}}async function La(){if(!z()){v.warn("Cannot load layout from backend: No HA backend detected.");return}try{let t=null;try{const o=await fetch(`${X}/layouts`,{headers:ce()});if(o.ok){const i=await o.json();v.log("[loadLayoutFromBackend] Available layouts:",i.layouts?.map(s=>s.id)),v.log(`[loadLayoutFromBackend] Last active layout ID from backend: ${i.last_active_layout_id}`),i.last_active_layout_id&&(i.layouts?.some(r=>r.id===i.last_active_layout_id)?(t=i.last_active_layout_id,v.log(`[loadLayoutFromBackend] Loading last active layout: ${t}`)):v.warn(`[loadLayoutFromBackend] Last active layout '${i.last_active_layout_id}' no longer exists`)),!t&&i.layouts&&i.layouts.length>0&&(t=i.layouts[0].id,v.log(`[loadLayoutFromBackend] No valid last active, using first layout: ${t}`))}}catch(o){v.warn("[loadLayoutFromBackend] Could not fetch layouts list:",o)}let e;if(t?e=await fetch(`${X}/layouts/${t}`,{headers:ce()}):e=await fetch(`${X}/layout`,{headers:ce()}),!e.ok)throw new Error(`Failed to load layout: ${e.status}`);const n=await e.json();!n.device_id&&t&&(n.device_id=t),v.log(`[loadLayoutFromBackend] Loaded layout '${n.device_id||t||"default"}':`,{name:n.name,device_model:n.device_model,pages:n.pages?.length,widgets:n.pages?.reduce((o,i)=>o+(i.widgets?.length||0),0),renderingMode:n.renderingMode||n.rendering_mode}),g&&(n.device_id||t)&&g.setCurrentLayoutId(n.device_id||t),typeof Ee=="function"?Ee(n):v.error("[loadLayoutFromBackend] loadLayoutIntoState function missing!"),L(C.LAYOUT_IMPORTED,n)}catch(t){v.error("Error loading layout from backend:",t),T(()=>Promise.resolve().then(()=>Eo),void 0,import.meta.url).then(e=>e.showToast("Error loading layout from backend",5e3,"error"))}}let kt=!1,Pt=!1;async function fe(){if(!z())return!1;if(kt)return Pt=!0,v.log("[saveLayoutToBackend] Save already in progress, queuing..."),!1;if(!g)throw new Error("AppState not available");const t=g.currentLayoutId||"reterminal_e1001",e=g.settings.device_model||g.deviceModel||"reterminal_e1001",o={...g.getPagesPayload(),device_id:t,name:g.deviceName||"Layout 1",device_model:e,deviceName:g.deviceName||"Layout 1"};kt=!0,Pt=!1;try{v.log(`[saveLayoutToBackend] Saving to layout '${t}':`,{device_model:e,pages:o.pages?.length,widgets:o.pages?.reduce((a,l)=>a+(l.widgets?.length||0),0),renderingMode:o.renderingMode});const i=new AbortController,s=setTimeout(()=>i.abort(),1e4),r=await fetch(`${X}/layouts/${t}`,{method:"POST",headers:ce(),body:JSON.stringify(o),signal:i.signal});if(clearTimeout(s),!r.ok){const a=await r.json().catch(()=>({}));throw new Error(a.message||a.error||`Save failed: ${r.status}`)}return v.log(`[saveLayoutToBackend] Layout '${t}' saved successfully`),!0}catch(i){if(i.name==="AbortError")return!0;if(i.message?.includes("Failed to fetch")||i.message?.includes("NetworkError")||i.message?.includes("net::ERR_")||i.message?.includes("ERR_EMPTY_RESPONSE")||i.message?.includes("Load failed"))return!1;throw v.error("Failed to save layout to backend:",i),i}finally{kt=!1,Pt&&setTimeout(()=>{fe().catch(()=>{})},500)}}async function Ta(t){if(!z())throw new Error("No backend");const e=await fetch(`${X}/import_snippet`,{method:"POST",headers:ce(),body:JSON.stringify({yaml:t})});if(!e.ok){const n=await e.json().catch(()=>({}));throw new Error(n.message||n.error||`Import failed with status ${e.status}`)}return await e.json()}function Aa(t){const e=document.getElementById("importSnippetError");e&&(e.textContent=t||"")}function A(t,e="info",n=3e3){let o=document.getElementById("toast-container");o||(o=document.createElement("div"),o.id="toast-container",o.style.position="fixed",o.style.bottom="20px",o.style.right="20px",o.style.zIndex="9999",document.body.appendChild(o));const i=document.createElement("div");i.className="toast",e==="error"?i.style.background="rgba(255, 0, 0, 0.8)":e==="success"?i.style.background="rgba(0, 128, 0, 0.8)":i.style.background="rgba(0,0,0,0.8)",i.textContent=t,i.style.color="white",i.style.padding="10px 20px",i.style.borderRadius="4px",i.style.marginTop="10px",i.style.opacity="0",i.style.transition="opacity 0.3s",o.appendChild(i),requestAnimationFrame(()=>{i.style.opacity="1"}),setTimeout(()=>{i.style.opacity="0",setTimeout(()=>{i.remove()},300)},n)}const Eo=Object.freeze(Object.defineProperty({__proto__:null,setImportError:Aa,showToast:A},Symbol.toStringTag,{value:"Module"}));async function Ma(){if(z())try{const n=`${X}/hardware/templates`;v.log("[HardwareDiscovery] Fetching from:",n);const o=await fetch(n,{headers:ce(),cache:"no-store"});if(!o.ok)throw new Error(`HTTP ${o.status}`);return(await o.json()).templates||[]}catch(n){v.error("Failed to fetch dynamic hardware templates from HA:",n)}v.log("[HardwareDiscovery] Attempting to load bundled profiles via glob...");const t=[],e=Object.assign({"../../hardware/elecrow-esp32-7inch.yaml":Qo,"../../hardware/guition-esp32-jc4827w543.yaml":es,"../../hardware/guition-esp32-jc8048w535.yaml":ts,"../../hardware/guition-esp32-jc8048w550.yaml":ns,"../../hardware/guition-esp32-s3-4848s040.yaml":is,"../../hardware/lilygo-tdisplays3.yaml":os,"../../hardware/seeedstudio-sensecap-indicator.yaml":ss,"../../hardware/sunton-esp32-2432s028.yaml":rs,"../../hardware/sunton-esp32-2432s028R.yaml":as,"../../hardware/sunton-esp32-4827s032R.yaml":ls,"../../hardware/sunton-esp32-8048s050.yaml":ds,"../../hardware/sunton-esp32-8048s070.yaml":cs,"../../hardware/waveshare-esp32-s3-touch-lcd-4.3.yaml":ps,"../../hardware/waveshare-esp32-s3-touch-lcd-7.yaml":us,"../../hardware/waveshare-esp32-universal-epaper-7.5v2.yaml":hs});for(const n in e)try{const o=e[n],i=n.split("/").pop(),s=Io(o,i);s.id=i.replace(/\.yaml$/i,"").replace(/[^a-z0-9]/gi,"_").toLowerCase(),s.isPackageBased=!0,s.hardwarePackage=`hardware/${i}`,t.push(s)}catch(o){v.warn(`[HardwareDiscovery] Failed to parse bundled file ${n}:`,o)}return v.log(`[HardwareDiscovery] Loaded ${t.length} bundled fallback profiles.`),t}async function Fn(t){if(!z())return v.log("[HardwareImport] Offline mode detected. Parsing locally..."),await Da(t);try{const e=await t.text(),n=`${X}/hardware/upload`,o={filename:t.name,content:e};v.log("[HardwareImport] Uploading via JSON:",t.name);const i=await fetch(n,{method:"POST",headers:ce(),body:JSON.stringify(o)});if(!i.ok){const a=await i.json().catch(()=>({}));throw new Error(a.message||a.error||`Upload failed: ${i.status}`)}const s=await i.json();A("Hardware template uploaded successfully!","success");const{loadExternalProfiles:r}=await T(async()=>{const{loadExternalProfiles:a}=await Promise.resolve().then(()=>Gt);return{loadExternalProfiles:a}},void 0,import.meta.url);return r&&await r(),s}catch(e){const n=e.message||"";if(n.includes("Failed to fetch")||n.includes("NetworkError")){v.warn("[HardwareImport] Network error during upload (likely benign):",n),A("Generating profile, refreshing list...","info");try{const{loadExternalProfiles:o}=await T(async()=>{const{loadExternalProfiles:i}=await Promise.resolve().then(()=>Gt);return{loadExternalProfiles:i}},void 0,import.meta.url);o&&await o()}catch(o){v.warn("[HardwareImport] Profile refresh also failed:",o)}return{success:!0,filename:t.name,note:"network_error_suppressed"}}else throw v.error("Hardware upload failed:",e),A(`Upload failed: ${n}`,"error"),e}}async function Da(t){return new Promise((e,n)=>{const o=new FileReader;o.onload=async i=>{const s=i.target.result;try{if(!s.includes("__LAMBDA_PLACEHOLDER__"))throw new Error("Invalid template: Missing __LAMBDA_PLACEHOLDER__");const r=Io(s,t.name);v.log("[HardwareImport] Parsed offline profile:",r);const{DEVICE_PROFILES:a}=await T(async()=>{const{DEVICE_PROFILES:l}=await Promise.resolve().then(()=>Gt);return{DEVICE_PROFILES:l}},void 0,import.meta.url);a&&(a[r.id]=r),A(`Imported ${r.name} (Offline Mode)`,"success"),window.app&&window.app.deviceSettings&&window.app.deviceSettings.populateDeviceSelect(),Oa(r),e(r)}catch(r){A(r.message,"error"),n(r)}},o.onerror=()=>n(new Error("File read failed")),o.readAsText(t)})}function Io(t,e){const n="dynamic_offline_"+e.replace(/[^a-z0-9]/gi,"_").toLowerCase();let o=e.replace(/\.yaml$/i,""),i=800,s=480,r="rect";const a=t.match(/#\s*Name:\s*(.*)/i);a&&(o=a[1].trim());const l=t.match(/#\s*Resolution:\s*(\d+)x(\d+)/i);l&&(i=parseInt(l[1]),s=parseInt(l[2]));const c=t.match(/#\s*Shape:\s*(rect|round)/i);c&&(r=c[1].toLowerCase());const u=!!t.match(/#\s*Inverted:\s*(true|yes|1)/i),h=t.match(/^\s*-\s*platform:\s*([a-z0-9_]+)/m)||t.match(/^\s*platform:\s*([a-z0-9_]+)/m),p=h?h[1].trim():void 0,f=t.match(/^\s*model:\s*"?([^"\n]+)"?/m),y=f?f[1].trim():void 0;let m="esp32-s3",_;const b=t.match(/^\s*esp8266:/m);b?m="esp8266":t.match(/^\s*esp32:/m)&&(t.toLowerCase().includes("esp32-s3")?m="esp32-s3":t.toLowerCase().includes("esp32-c3")?m="esp32-c3":t.toLowerCase().includes("esp32-c6")?m="esp32-c6":m="esp32");const x=t.match(/^\s*board:\s*([^\n]+)/m);x&&(_=x[1].trim(),b||(_.toLowerCase().includes("s3")?m="esp32-s3":_.toLowerCase().includes("c3")?m="esp32-c3":_.toLowerCase().includes("c6")&&(m="esp32-c6")));const S=t.match(/#\s*Chip:\s*(.*)/i);S&&(m=S[1].trim());const E=t.match(/#\s*Board:\s*(.*)/i);E&&(_=E[1].trim());const w=t.match(/^\s*color_palette:\s*(\S+)/m),I=w?w[1].trim():void 0,P=t.match(/^\s*color_order:\s*(\S+)/m),D=P?P[1].trim():void 0,R=t.match(/^\s*update_interval:\s*(\S+)/m),G=R?R[1].trim():void 0,H=t.match(/^\s*invert_colors:\s*(true|false)/mi),N=H?H[1].toLowerCase()==="true":void 0;return{id:n,name:o,resolution:{width:i,height:s},shape:r,chip:m,board:_,displayPlatform:p,displayModel:y,colorPalette:I,colorOrder:D,updateInterval:G,invertColors:N,isPackageBased:!0,isOfflineImport:!0,content:t,features:{psram:t.includes("psram:"),lcd:!t.includes("waveshare_epaper")&&!t.includes("epaper_spi"),lvgl:t.includes("lvgl:")||!t.includes("waveshare_epaper")&&!t.includes("epaper_spi"),epaper:t.includes("waveshare_epaper")||t.includes("epaper_spi"),touch:t.includes("touchscreen:"),inverted_colors:u}}}function Oa(t){try{const e=JSON.parse(localStorage.getItem("esphome-offline-profiles")||"{}");e[t.id]=t,localStorage.setItem("esphome-offline-profiles",JSON.stringify(e)),v.log("[HardwarePersistence] Saved offline profile to localStorage:",t.id)}catch(e){v.error("Failed to save profile to localStorage:",e)}}function Ra(){try{return JSON.parse(localStorage.getItem("esphome-offline-profiles")||"{}")}catch(t){return v.warn("Could not load offline profiles from storage:",t),{}}}const B={reterminal_e1001:{name:"Seeedstudio reTerminal E1001 (Monochrome)",displayType:"binary",chip:"esp32-s3",board:"esp32-s3-devkitc-1",displayModel:"7.50inv2p",displayPlatform:"waveshare_epaper",resolution:{width:800,height:480},shape:"rect",psram_mode:"octal",pins:{display:{cs:"GPIO10",dc:"GPIO11",reset:{number:"GPIO12",inverted:!1},busy:{number:"GPIO13",inverted:!0}},i2c:{sda:"GPIO19",scl:"GPIO20"},spi:{clk:"GPIO7",mosi:"GPIO9"},batteryEnable:"GPIO21",batteryAdc:"GPIO1",buzzer:"GPIO45",buttons:{left:"GPIO5",right:"GPIO4",refresh:"GPIO3",home:"GPIO2"}},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.27,max:4.15}},features:{psram:!0,buzzer:!0,buttons:!0,sht4x:!0,epaper:!0,inverted_colors:!0}},reterminal_e1002:{name:"Seeedstudio reTerminal E1002 (6-Color)",displayType:"color",displayModel:"Seeed-reTerminal-E1002",displayPlatform:"epaper_spi",resolution:{width:800,height:480},shape:"rect",psram_mode:"octal",pins:{display:{cs:null,dc:null,reset:null,busy:null},i2c:{sda:"GPIO19",scl:"GPIO20"},spi:{clk:"GPIO7",mosi:"GPIO9"},batteryEnable:"GPIO21",batteryAdc:"GPIO1",buzzer:"GPIO45",buttons:{left:"GPIO5",right:"GPIO4",refresh:"GPIO3",home:"GPIO2"}},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.27,max:4.15}},features:{psram:!0,buzzer:!0,buttons:!0,sht4x:!0,epaper:!0}},trmnl_diy_esp32s3:{name:"Seeed Studio Trmnl DIY Kit (ESP32-S3)",displayType:"binary",displayModel:"7.50inv2p",displayPlatform:"waveshare_epaper",resolution:{width:800,height:480},shape:"rect",psram_mode:"octal",pins:{display:{cs:"GPIO44",dc:"GPIO10",reset:"GPIO38",busy:{number:"GPIO4",inverted:!0}},i2c:{sda:"GPIO17",scl:"GPIO18"},spi:{clk:"GPIO7",mosi:"GPIO9"},batteryEnable:"GPIO6",batteryAdc:"GPIO1",buzzer:null,buttons:{left:"GPIO2",refresh:"GPIO5"}},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.27,max:4.15},curve:[{from:4.15,to:100},{from:3.96,to:90},{from:3.91,to:80},{from:3.85,to:70},{from:3.8,to:60},{from:3.75,to:50},{from:3.68,to:40},{from:3.58,to:30},{from:3.49,to:20},{from:3.41,to:10},{from:3.3,to:5},{from:3.27,to:0}]},features:{psram:!0,buzzer:!1,buttons:!0,sht4x:!1,epaper:!0,inverted_colors:!0}},trmnl:{name:"TRMNL (ESP32-C3)",displayType:"binary",displayModel:"7.50inv2",displayPlatform:"waveshare_epaper",resolution:{width:800,height:480},shape:"rect",pins:{display:{cs:"GPIO6",dc:"GPIO5",reset:{number:"GPIO10",inverted:!1},busy:{number:"GPIO4",inverted:!0}},i2c:{sda:"GPIO1",scl:"GPIO2"},spi:{clk:"GPIO7",mosi:"GPIO8"},batteryEnable:null,batteryAdc:"GPIO0",buzzer:null,buttons:null},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.3,max:4.15}},features:{psram:!1,buzzer:!1,buttons:!1,sht4x:!1,epaper:!0,inverted_colors:!0},chip:"esp32-c3",board:"esp32-c3-devkitm-1"},seeed_xiao_epaper_75:{name:'Seeed Xiao ESP32C3 - 7.5" E-Paper',displayType:"binary",chip:"esp32-c3",board:"seeed_xiao_esp32c3",displayModel:"7.50inv2p",displayPlatform:"waveshare_epaper",resolution:{width:800,height:480},shape:"rect",pins:{display:{cs:"GPIO3",dc:"GPIO5",reset:"GPIO2",busy:{number:"GPIO4",inverted:!0}},spi:{clk:"GPIO8",mosi:"GPIO10"}},features:{psram:!1,buzzer:!1,buttons:!1,epaper:!0,inverted_colors:!0}},esp32_s3_photopainter:{id:"esp32_s3_photopainter",name:"Waveshare PhotoPainter (6-Color)",displayType:"color",displayModel:"7.30in-f",displayPlatform:"waveshare_epaper",resolution:{width:800,height:480},shape:"rect",psram_mode:"octal",pins:{display:{cs:"GPIO9",dc:"GPIO8",reset:"GPIO12",busy:{number:"GPIO13",inverted:!0}},i2c:{sda:"GPIO47",scl:"GPIO48"},spi:{clk:"GPIO10",mosi:"GPIO11"},batteryEnable:null,batteryAdc:null,buzzer:null,buttons:{left:"GPIO0",right:"GPIO4",refresh:null}},battery:{attenuation:"0db",multiplier:1,calibration:{min:3.3,max:4.2}},features:{psram:!0,buzzer:!1,buttons:!0,sht4x:!1,axp2101:!0,manual_pmic:!0,shtc3:!0,epaper:!0},i2c_config:{scan:!1,frequency:"10kHz"}},waveshare_esp32_s3_touch_lcd_7:{name:'Waveshare Touch LCD 7 7.0" 800x480',displayType:"color",isPackageBased:!0,hardwarePackage:"hardware/waveshare-esp32-s3-touch-lcd-7.yaml",resolution:{width:800,height:480},features:{psram:!0,buzzer:!1,buttons:!1,lcd:!0,lvgl:!0,touch:!0},touch:{platform:"gt911",transformed:!0,transform:{swap_xy:!0}}},waveshare_esp32_s3_touch_lcd_4_3:{name:'Waveshare Touch LCD 4.3 4.3" 800x480',displayType:"color",isPackageBased:!0,hardwarePackage:"hardware/waveshare-esp32-s3-touch-lcd-4.3.yaml",resolution:{width:800,height:480},features:{psram:!0,buzzer:!1,buttons:!1,lcd:!0,touch:!0},touch:{platform:"gt911",transformed:!0,transform:{swap_xy:!0}}},m5stack_coreink:{name:"M5Stack M5Core Ink (200x200)",displayType:"binary",displayModel:"1.54inv2",displayPlatform:"waveshare_epaper",resolution:{width:200,height:200},shape:"rect",features:{psram:!1,buzzer:!0,buttons:!0,lcd:!1,epaper:!0,inverted_colors:!0},chip:"esp32",board:"m5stack-coreink",pins:{display:{cs:"GPIO9",dc:"GPIO15",reset:"GPIO0",busy:null},i2c:{sda:"GPIO21",scl:"GPIO22"},spi:{clk:"GPIO18",mosi:"GPIO23"},batteryEnable:{number:"GPIO12",ignore_strapping_warning:!0},batteryAdc:"GPIO35",buzzer:"GPIO2",buttons:{left:{number:"GPIO39",mode:"INPUT"},right:{number:"GPIO37",mode:"INPUT"},refresh:{number:"GPIO38",mode:"INPUT"}}},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.27,max:4.15}},i2c_config:{scan:!0}},m5stack_paper:{name:"M5Paper (540x960)",displayType:"grayscale",displayModel:"M5Paper",displayPlatform:"it8951e",resolution:{width:960,height:540},shape:"rect",chip:"esp32",board:"m5stack-paper",features:{psram:!0,buzzer:!1,buttons:!0,lcd:!1,epaper:!0,touch:!0,inverted_colors:!0,sht3xd:!0},pins:{display:{cs:"GPIO15",dc:null,reset:"GPIO23",busy:"GPIO27"},i2c:{sda:"GPIO21",scl:"GPIO22"},spi:{clk:"GPIO14",mosi:"GPIO12",miso:"GPIO13"},batteryEnable:null,batteryAdc:"GPIO35",buzzer:null,buttons:{left:{number:"GPIO39",mode:"INPUT"},right:{number:"GPIO37",mode:"INPUT"},refresh:{number:"GPIO38",mode:"INPUT"}}},m5paper:{battery_power_pin:"GPIO5",main_power_pin:"GPIO2"},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.27,max:4.15}},rotation_offset:180,touch:{platform:"gt911",i2c_id:"bus_a",address:93,interrupt_pin:"GPIO36",update_interval:"never",transform:{mirror_x:!1,mirror_y:!1,swap_xy:!0},calibration:{x_min:0,x_max:960,y_min:0,y_max:540}},external_components:["  - source: github://Passific/m5paper_esphome"]}},ft=Object.keys(B);async function un(){try{const t=await Ma();v.log(`[Devices] Loaded ${t.length} hardware profiles from backend/bundle.`),t.forEach(o=>{if(B[o.id]){const i=B[o.id];B[o.id]={...i,...o,features:{...i.features||{},...o.features||{}}}}else B[o.id]=o});const e=Ra(),n=Object.keys(e);n.length>0&&(v.log(`[Devices] Restoring ${n.length} offline profiles from localStorage.`),Object.entries(e).forEach(([o,i])=>{B[o]=i})),window.app&&window.app.deviceSettings&&typeof window.app.deviceSettings.populateDeviceSelect=="function"&&window.app.deviceSettings.populateDeviceSelect()}catch(t){v.error("Failed to load external hardware profiles:",t)}}const Gt=Object.freeze(Object.defineProperty({__proto__:null,DEVICE_PROFILES:B,SUPPORTED_DEVICE_IDS:ft,loadExternalProfiles:un},Symbol.toStringTag,{value:"Module"}));function ke(){return"w_"+Date.now().toString(36)+Math.random().toString(36).substr(2,5)}typeof crypto<"u"&&!crypto.randomUUID?crypto.randomUUID=function(){return("10000000-1000-4000-8000"+-1e11).replace(/[018]/g,t=>(t^crypto.getRandomValues(new Uint8Array(1))[0]&15>>t/4).toString(16))}:typeof crypto>"u"&&(window.crypto={randomUUID:()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,t=>{const e=Math.random()*16|0;return(t==="x"?e:e&3|8).toString(16)}),getRandomValues:t=>t.map(()=>Math.floor(Math.random()*256))});function Ba(t,e){let n;return function(...i){const s=()=>{clearTimeout(n),t(...i)};clearTimeout(n),n=setTimeout(s,e)}}function mt(t){return JSON.parse(JSON.stringify(t))}const Ha=(t,e)=>{if(!t||!e)return;const n=e.replace(/\[(\w+)\]/g,".$1").replace(/^\./,"").split(".");let o=t;for(const i of n){if(o==null)return;o=o[i]}return o};window.generateId=ke;window.debounce=Ba;window.deepClone=mt;window.getNestedValue=Ha;class Na{constructor(){this.state={pages:[],currentPageIndex:0,deviceName:"Layout 1",deviceModel:"reterminal_e1001",currentLayoutId:"reterminal_e1001",customHardware:{},protocolHardware:{width:400,height:300,colorMode:"bw"},widgetsById:new Map},this.reset()}reset(){this.state.pages=[{id:"page_0",name:"Overview",layout:null,widgets:[]}],this.state.currentPageIndex=0,this.rebuildWidgetsIndex()}get pages(){return this.state.pages}get currentPageIndex(){return this.state.currentPageIndex}get deviceName(){return this.state.deviceName}get deviceModel(){return this.state.deviceModel}get currentLayoutId(){return this.state.currentLayoutId}get protocolHardware(){return this.state.protocolHardware}get customHardware(){return this.state.customHardware}getCurrentPage(){return this.state.pages[this.state.currentPageIndex]||this.state.pages[0]}getWidgetById(e){return this.state.widgetsById.get(e)}rebuildWidgetsIndex(){this.state.widgetsById.clear();for(const e of this.state.pages)for(const n of e.widgets)this.state.widgetsById.set(n.id,n)}setPages(e){this.state.pages=e,this.rebuildWidgetsIndex(),L(C.STATE_CHANGED)}setCurrentPageIndex(e,n={}){e>=0&&e<this.state.pages.length&&(this.state.currentPageIndex=e,L(C.PAGE_CHANGED,{index:e,...n}))}reorderPage(e,n){if(e<0||e>=this.state.pages.length||n<0||n>=this.state.pages.length)return;const[o]=this.state.pages.splice(e,1);this.state.pages.splice(n,0,o),this.state.currentPageIndex===e?this.state.currentPageIndex=n:e<this.state.currentPageIndex&&n>=this.state.currentPageIndex?this.state.currentPageIndex--:e>this.state.currentPageIndex&&n<=this.state.currentPageIndex&&this.state.currentPageIndex++,L(C.STATE_CHANGED),L(C.PAGE_CHANGED,{index:this.state.currentPageIndex,forceFocus:!0})}addPage(e=null){const n=this.state.pages.length;let o=0;this.state.pages.forEach(a=>{const l=a.name.match(/^Page (\d+)$/);if(l){const c=parseInt(l[1],10);c>o&&(o=c)}});const i=o+1,s={id:`page_${Date.now()}_${n}`,name:`Page ${i}`,widgets:[]},r=e!==null?e:this.state.pages.length;return this.state.pages.splice(r,0,s),e!==null&&e<=this.state.currentPageIndex?this.state.currentPageIndex++:e===null&&(this.state.currentPageIndex=this.state.pages.length-1),this.rebuildWidgetsIndex(),L(C.STATE_CHANGED),L(C.PAGE_CHANGED,{index:this.state.currentPageIndex,forceFocus:!0}),s}deletePage(e){e<0||e>=this.state.pages.length||(this.state.pages.splice(e,1),this.state.currentPageIndex>=this.state.pages.length&&(this.state.currentPageIndex=Math.max(0,this.state.pages.length-1)),this.rebuildWidgetsIndex(),L(C.STATE_CHANGED),L(C.PAGE_CHANGED,{index:this.state.currentPageIndex,forceFocus:!0}))}duplicatePage(e){if(e<0||e>=this.state.pages.length)return null;const n=this.state.pages[e],o=mt(n);o.id=`page_${Date.now()}_${this.state.pages.length}`,o.name=`${n.name} (Copy)`;const i=new Map;o.widgets.forEach(r=>{const a=r.id,l=ke();r.id=l,i.set(a,l)}),o.widgets.forEach(r=>{r.parentId&&i.has(r.parentId)&&(r.parentId=i.get(r.parentId))});const s=e+1;return this.state.pages.splice(s,0,o),this.state.currentPageIndex=s,this.rebuildWidgetsIndex(),L(C.STATE_CHANGED),L(C.PAGE_CHANGED,{index:this.state.currentPageIndex,forceFocus:!0}),o}renamePage(e,n){e<0||e>=this.state.pages.length||!n||n.trim()===""||(this.state.pages[e].name=n.trim(),L(C.STATE_CHANGED))}addWidget(e,n=null){const o=n!==null?n:this.state.currentPageIndex;(this.state.pages[o]||this.getCurrentPage()).widgets.push(e),this.state.widgetsById.set(e.id,e),L(C.STATE_CHANGED)}updateWidget(e,n){const o=this.getWidgetById(e);o&&(Object.assign(o,n),L(C.STATE_CHANGED))}deleteWidgets(e){const n=this.getCurrentPage();let o=!1;for(const i of e){const s=n.widgets.findIndex(r=>r.id===i);s!==-1&&(n.widgets.splice(s,1),this.state.widgetsById.delete(i),o=!0)}o&&L(C.STATE_CHANGED)}moveWidgetToPage(e,n,o=null,i=null){if(n<0||n>=this.state.pages.length)return!1;const s=this.state.pages[n],r=new Set,a=[];let l=e,c=this.state.widgetsById.get(e);if(c&&c.parentId){let h=c;for(;h.parentId;){const p=this.state.widgetsById.get(h.parentId);if(p)h=p;else break}l=h.id}const d=h=>{if(r.has(h))return;let p=null,f=null;for(const m of this.state.pages)if(p=m.widgets.find(_=>_.id===h),p){f=m;break}if(!p||!f||f===s)return;r.add(h),a.push({widget:p,sourcePage:f}),f.widgets.filter(m=>m.parentId===h).forEach(m=>d(m.id))};if(d(l),a.length===0)return!1;a.forEach((h,p)=>{const{widget:f,sourcePage:y}=h,m=y.widgets.indexOf(f);if(m!==-1&&y.widgets.splice(m,1),p===0&&f.parentId&&!r.has(f.parentId)&&(f.parentId=null),p===0){let _=0,b=0;if(o!==null&&i!==null&&(_=o-f.x,b=i-f.y,f.x=o,f.y=i),_!==0||b!==0)for(let x=1;x<a.length;x++){const S=a[x].widget;S.x+=_,S.y+=b}}s.widgets.push(f)});const u=this.getCanvasDimensions();for(const h of r){const p=this.state.widgetsById.get(h);if(!p||p.parentId&&r.has(p.parentId))continue;const f=p.x,y=p.y;p.x=Math.max(0,Math.min(u.width-(p.width||50),p.x)),p.y=Math.max(0,Math.min(u.height-(p.height||50),p.y));const m=p.x-f,_=p.y-y;if(m!==0||_!==0)for(const b of r){const x=this.state.widgetsById.get(b);x&&x.parentId===p.id&&(x.x+=m,x.y+=_)}}return this.rebuildWidgetsIndex(),L(C.STATE_CHANGED),!0}reorderWidget(e,n,o){const i=this.state.pages[e];if(!i)return;const s=i.widgets;if(n<0||n>=s.length||o<0||o>=s.length)return;const[r]=s.splice(n,1);s.splice(o,0,r),L(C.STATE_CHANGED)}clearCurrentPage(e=!1){const n=this.getCurrentPage();if(!n)return{deleted:0,preserved:0};const o=[],i=[];return n.widgets.forEach(s=>{e&&s.locked?i.push(s):o.push(s)}),n.widgets=i,o.forEach(s=>this.state.widgetsById.delete(s.id)),o.length>0&&L(C.STATE_CHANGED),{deleted:o.length,preserved:i.length}}setDeviceSettings(e,n){e&&(this.state.deviceName=e),n&&(this.state.deviceModel=n,window.currentDeviceModel=n),L(C.SETTINGS_CHANGED)}getCanvasDimensions(e){const n=this.state.deviceModel||"reterminal_e1001",o=B&&B[n]?B[n]:null;let i=en,s=tn;if(o)o.resolution&&(i=o.resolution.width,s=o.resolution.height);else if(n==="custom"&&this.state.customHardware){const r=this.state.customHardware;r.resWidth&&r.resHeight&&(i=r.resWidth,s=r.resHeight)}return e===Kt.PORTRAIT?{width:Math.min(i,s),height:Math.max(i,s)}:{width:Math.max(i,s),height:Math.min(i,s)}}getPagesPayload(){return{pages:this.state.pages,deviceName:this.state.deviceName,deviceModel:this.state.deviceModel,currentLayoutId:this.state.currentLayoutId,customHardware:this.state.customHardware}}getCanvasShape(){const e=B[this.state.deviceModel];return e&&e.shape?e.shape:this.state.customHardware&&this.state.customHardware.shape?this.state.customHardware.shape:"rect"}}class Ga{constructor(){this.state={selectedWidgetIds:[],clipboardWidgets:[],zoomLevel:1,panX:0,panY:0},this.historyStack=[],this.historyIndex=-1}get selectedWidgetIds(){return this.state.selectedWidgetIds}get clipboardWidgets(){return this.state.clipboardWidgets}get zoomLevel(){return this.state.zoomLevel}setZoomLevel(e){this.state.zoomLevel=Math.max(.05,Math.min(5,e)),L(C.ZOOM_CHANGED,{zoomLevel:this.state.zoomLevel})}setSelectedWidgetIds(e){this.state.selectedWidgetIds=e||[],L(C.SELECTION_CHANGED,{widgetIds:this.state.selectedWidgetIds})}selectWidget(e,n=!1){if(n){const o=this.state.selectedWidgetIds.indexOf(e);o===-1?e&&this.state.selectedWidgetIds.push(e):this.state.selectedWidgetIds.splice(o,1)}else this.state.selectedWidgetIds=e?[e]:[];L(C.SELECTION_CHANGED,{widgetIds:this.state.selectedWidgetIds})}copyWidgets(e){this.state.clipboardWidgets=e.map(n=>mt(n)),v.log("[EditorStore] Widgets copied to clipboard:",this.state.clipboardWidgets.length)}recordHistory(e){const n=mt(e);if(this.historyIndex>=0){const o=this.historyStack[this.historyIndex];if(JSON.stringify(o)===JSON.stringify(n))return}this.historyIndex<this.historyStack.length-1&&(this.historyStack=this.historyStack.slice(0,this.historyIndex+1)),this.historyStack.push(n),this.historyIndex++,this.historyStack.length>Zt&&(this.historyStack.shift(),this.historyIndex--),L(C.HISTORY_CHANGED,{canUndo:this.canUndo(),canRedo:this.canRedo()})}undo(){return this.canUndo()?(this.historyIndex--,this.historyStack[this.historyIndex]):null}redo(){return this.canRedo()?(this.historyIndex++,this.historyStack[this.historyIndex]):null}canUndo(){return this.historyIndex>0}canRedo(){return this.historyIndex<this.historyStack.length-1}}class Fa{constructor(){this.state={...Jt}}get snapEnabled(){return this.state.snapEnabled}get showGrid(){return this.state.showGrid}get showDebugGrid(){return this.state.showDebugGrid}get showRulers(){return this.state.showRulers}get gridOpacity(){return this.state.gridOpacity}get editor_light_mode(){return this.state.editor_light_mode}update(e){this.state={...this.state,...e},L(C.SETTINGS_CHANGED,this.state),v.log("[PreferencesStore] Settings updated")}setSnapEnabled(e){this.state.snapEnabled=e,L(C.SETTINGS_CHANGED,{snapEnabled:e})}setShowGrid(e){this.state.showGrid=e,L(C.SETTINGS_CHANGED,{showGrid:e})}setShowDebugGrid(e){this.state.showDebugGrid=e,L(C.SETTINGS_CHANGED,{showDebugGrid:e})}setShowRulers(e){this.state.showRulers=e,L(C.SETTINGS_CHANGED,{showRulers:e})}}class Wa{constructor(){this.keys={ai_api_key_gemini:"",ai_api_key_openai:"",ai_api_key_openrouter:""},this.loadFromLocalStorage()}get(e){return this.keys[e]}set(e,n){e in this.keys&&(this.keys[e]=n,this.saveToLocalStorage())}saveToLocalStorage(){try{const e={};Object.keys(this.keys).forEach(n=>{n.startsWith("ai_api_key_")&&(e[n]=this.keys[n])}),localStorage.setItem("esphome-designer-ai-keys",JSON.stringify(e))}catch(e){v.warn("[SecretsStore] Failed to save AI keys to localStorage:",e)}}loadFromLocalStorage(){try{const e=localStorage.getItem("esphome-designer-ai-keys");if(e){const n=JSON.parse(e);this.keys={...this.keys,...n},v.log("[SecretsStore] AI keys loaded from local storage")}}catch(e){v.warn("[SecretsStore] Failed to load AI keys from localStorage:",e)}}}let Ft={};try{Ft=Object.assign({"../../features/battery_icon/plugin.js":()=>T(()=>import("./plugin-Bw0wbyPl.js"),[],import.meta.url),"../../features/calendar/plugin.js":()=>T(()=>import("./plugin-CjeUKOiG.js"),[],import.meta.url),"../../features/datetime/plugin.js":()=>T(()=>import("./plugin-CMalz96F.js"),[],import.meta.url),"../../features/debug_grid/plugin.js":()=>T(()=>import("./plugin-fk55zUs4.js"),[],import.meta.url),"../../features/graph/plugin.js":()=>T(()=>import("./plugin-BBYG6DAP.js"),[],import.meta.url),"../../features/icon/plugin.js":()=>T(()=>import("./plugin-Df8WYhNz.js"),__vite__mapDeps([0,1]),import.meta.url),"../../features/image/plugin.js":()=>T(()=>import("./plugin-Bwb_cAAV.js"),[],import.meta.url),"../../features/line/plugin.js":()=>T(()=>import("./plugin-CUiPI6mf.js"),[],import.meta.url),"../../features/lvgl_arc/plugin.js":()=>T(()=>import("./plugin-DpX_eOsM.js"),[],import.meta.url),"../../features/lvgl_bar/plugin.js":()=>T(()=>import("./plugin-CN6lT8h5.js"),[],import.meta.url),"../../features/lvgl_button/plugin.js":()=>T(()=>import("./plugin-gODs_hsL.js"),[],import.meta.url),"../../features/lvgl_buttonmatrix/plugin.js":()=>T(()=>import("./plugin-Db9UYArC.js"),[],import.meta.url),"../../features/lvgl_chart/plugin.js":()=>T(()=>import("./plugin-C7II9R5U.js"),[],import.meta.url),"../../features/lvgl_checkbox/plugin.js":()=>T(()=>import("./plugin-DOMNv2RT.js"),[],import.meta.url),"../../features/lvgl_dropdown/plugin.js":()=>T(()=>import("./plugin-B8IGEgbh.js"),[],import.meta.url),"../../features/lvgl_img/plugin.js":()=>T(()=>import("./plugin-De55Pwkg.js"),[],import.meta.url),"../../features/lvgl_keyboard/plugin.js":()=>T(()=>import("./plugin-d2-lAQdZ.js"),[],import.meta.url),"../../features/lvgl_label/plugin.js":()=>T(()=>import("./plugin-_VxsD353.js"),[],import.meta.url),"../../features/lvgl_led/plugin.js":()=>T(()=>import("./plugin-CLnVe9Kd.js"),[],import.meta.url),"../../features/lvgl_line/plugin.js":()=>T(()=>import("./plugin-D471liQ4.js"),[],import.meta.url),"../../features/lvgl_meter/plugin.js":()=>T(()=>import("./plugin-BFX5ceQ9.js"),[],import.meta.url),"../../features/lvgl_obj/plugin.js":()=>T(()=>import("./plugin-Dj61WG1m.js"),[],import.meta.url),"../../features/lvgl_qrcode/plugin.js":()=>T(()=>import("./plugin-BFqLcXeO.js"),[],import.meta.url),"../../features/lvgl_roller/plugin.js":()=>T(()=>import("./plugin-H8_Cedxq.js"),[],import.meta.url),"../../features/lvgl_slider/plugin.js":()=>T(()=>import("./plugin-DpfH8oTa.js"),[],import.meta.url),"../../features/lvgl_spinbox/plugin.js":()=>T(()=>import("./plugin-BfVrC9k5.js"),[],import.meta.url),"../../features/lvgl_spinner/plugin.js":()=>T(()=>import("./plugin-pgv6K-gd.js"),[],import.meta.url),"../../features/lvgl_switch/plugin.js":()=>T(()=>import("./plugin-9bwX90YL.js"),[],import.meta.url),"../../features/lvgl_tabview/plugin.js":()=>T(()=>import("./plugin-Z-WZZzFC.js"),[],import.meta.url),"../../features/lvgl_textarea/plugin.js":()=>T(()=>import("./plugin-BHNwpxo-.js"),[],import.meta.url),"../../features/lvgl_tileview/plugin.js":()=>T(()=>import("./plugin-Rd1hUaWq.js"),[],import.meta.url),"../../features/odp_arc/plugin.js":()=>T(()=>import("./plugin-VtHk49zm.js"),[],import.meta.url),"../../features/odp_ellipse/plugin.js":()=>T(()=>import("./plugin-BW3KBBjl.js"),[],import.meta.url),"../../features/odp_icon_sequence/plugin.js":()=>T(()=>import("./plugin-DlAbENrg.js"),[],import.meta.url),"../../features/odp_multiline/plugin.js":()=>T(()=>import("./plugin-ktuOq9Yf.js"),[],import.meta.url),"../../features/odp_plot/plugin.js":()=>T(()=>import("./plugin-C8K11rLM.js"),[],import.meta.url),"../../features/odp_polygon/plugin.js":()=>T(()=>import("./plugin-Q8fHNnFv.js"),[],import.meta.url),"../../features/odp_rectangle_pattern/plugin.js":()=>T(()=>import("./plugin-DgYoGnpW.js"),[],import.meta.url),"../../features/ondevice_humidity/plugin.js":()=>T(()=>import("./plugin-BwyQiyTL.js"),[],import.meta.url),"../../features/ondevice_temperature/plugin.js":()=>T(()=>import("./plugin-DJPmt1HX.js"),[],import.meta.url),"../../features/online_image/plugin.js":()=>T(()=>import("./plugin-Dn_ONJ-l.js"),[],import.meta.url),"../../features/progress_bar/plugin.js":()=>T(()=>import("./plugin-CCJiZ1ha.js"),__vite__mapDeps([2,3]),import.meta.url),"../../features/qr_code/plugin.js":()=>T(()=>import("./plugin-POvdjotB.js"),[],import.meta.url),"../../features/quote_rss/plugin.js":()=>T(()=>import("./plugin-Cg6ovgs-.js"),[],import.meta.url),"../../features/rounded_rect/plugin.js":()=>T(()=>import("./plugin-DxcfG1uZ.js"),[],import.meta.url),"../../features/sensor_text/plugin.js":()=>T(()=>import("./plugin-Z2cktzak.js"),__vite__mapDeps([4,3,1]),import.meta.url),"../../features/shape_circle/plugin.js":()=>T(()=>import("./plugin-Bgq7tMyI.js"),[],import.meta.url),"../../features/shape_rect/plugin.js":()=>T(()=>import("./plugin-XFu3_fXc.js"),[],import.meta.url),"../../features/template_nav_bar/plugin.js":()=>T(()=>import("./plugin-B0gENgYB.js"),[],import.meta.url),"../../features/template_sensor_bar/plugin.js":()=>T(()=>import("./plugin-Ch0FJKlW.js"),[],import.meta.url),"../../features/text/plugin.js":()=>T(()=>import("./plugin-rQiWESPh.js"),__vite__mapDeps([5,1]),import.meta.url),"../../features/touch_area/plugin.js":()=>T(()=>import("./plugin-DP6iws0g.js"),[],import.meta.url),"../../features/weather_forecast/plugin.js":()=>T(()=>import("./plugin-C_R0ZD0Q.js"),[],import.meta.url),"../../features/weather_icon/plugin.js":()=>T(()=>import("./plugin-CSt5nbUe.js"),[],import.meta.url),"../../features/wifi_signal/plugin.js":()=>T(()=>import("./plugin-4ddksTrB.js"),[],import.meta.url)})}catch{}let $a=class{constructor(){this.plugins=new Map,this.loading=new Map,this.aliases={label:"text",rectangle:"shape_rect",rrect:"rounded_rect",circle:"shape_circle",nav_next_page:"touch_area",nav_previous_page:"touch_area",nav_reload_page:"touch_area",puppet:"online_image",multiline:"odp_multiline",rectangle_pattern:"odp_rectangle_pattern",polygon:"odp_polygon",ellipse:"odp_ellipse",icon_sequence:"odp_icon_sequence",weather_forcast:"weather_forecast",odp_debug_grid:"debug_grid"}}register(e){if(!e||!e.id){v.warn("[Registry] Invalid plugin registration attempt:",e);return}const n=e.id,o=this.plugins.get(n)||{};this.plugins.set(n,{...o,...e}),v.log(`[Registry] Registered: ${n}`)}get(e){const n=this.aliases[e]||e;return this.plugins.get(n)}getAll(){return Array.from(this.plugins.values())}async load(e){const n=this.aliases[e]||e;if(n==="group")return null;if(this.plugins.has(n))return this.plugins.get(n);if(this.loading.has(n))return this.loading.get(n);const o=(async()=>{try{const i=`../../features/${n}/plugin.js`;let s;return Ft[i]?s=await Ft[i]():(v.log(`[Registry] Using dynamic import fallback for: ${n}`),s=await import(i)),s.default?this.register(s.default):this.register({id:n,...s}),this.loading.delete(n),this.plugins.get(n)}catch(i){return v.error(`[Registry] Failed to load plugin "${n}" from ESM:`,i),this.loading.delete(n),null}})();return this.loading.set(n,o),o}onExportGlobals(e){this.getAll().forEach(n=>n.onExportGlobals&&n.onExportGlobals(e))}onExportEsphome(e){this.getAll().forEach(n=>n.onExportEsphome&&n.onExportEsphome(e))}onExportNumericSensors(e){this.getAll().forEach(n=>n.onExportNumericSensors&&n.onExportNumericSensors(e))}onExportTextSensors(e){this.getAll().forEach(n=>n.onExportTextSensors&&n.onExportTextSensors(e))}onExportBinarySensors(e){this.getAll().forEach(n=>n.onExportBinarySensors&&n.onExportBinarySensors(e))}onExportHelpers(e){this.getAll().forEach(n=>n.onExportHelpers&&n.onExportHelpers(e))}onExportComponents(e){this.getAll().forEach(n=>n.onExportComponents&&n.onExportComponents(e))}onCollectRequirements(e){this.getAll().forEach(n=>n.collectRequirements&&n.collectRequirements(e))}};const U=new $a;v.log("[Registry] Modular system ready.");class za{constructor(){this.project=new Na,this.editor=new Ga,this.preferences=new Fa,this.secrets=new Wa,this._isRestoringHistory=!1,this.recordHistory(),Y(C.SETTINGS_CHANGED,e=>{e&&e.renderingMode!==void 0&&this.syncWidgetVisibilityWithMode()})}reset(){this.project.reset(),this.editor.state.selectedWidgetIds=[],this.recordHistory()}get pages(){return this.project.pages}get currentPageIndex(){return this.project.currentPageIndex}get selectedWidgetId(){return this.editor.selectedWidgetIds[0]||null}get selectedWidgetIds(){return this.editor.selectedWidgetIds}get settings(){return{...this.preferences.state,device_name:this.project.deviceName,deviceName:this.project.deviceName,device_model:this.project.deviceModel,deviceModel:this.project.deviceModel,customHardware:this.project.customHardware,custom_hardware:this.project.customHardware,protocolHardware:this.project.protocolHardware,protocol_hardware:this.project.protocolHardware,...this.secrets.keys}}get deviceName(){return this.project.deviceName}get deviceModel(){return this.project.deviceModel}get currentLayoutId(){return this.project.currentLayoutId}get snapEnabled(){return this.preferences.snapEnabled}get showGrid(){return this.preferences.showGrid}get showDebugGrid(){return this.preferences.showDebugGrid}get showRulers(){return this.preferences.showRulers}get zoomLevel(){return this.editor.zoomLevel}getCurrentPage(){return this.project.getCurrentPage()}getWidgetById(e){return this.project.getWidgetById(e)}getSelectedWidget(){return this.project.getWidgetById(this.editor.selectedWidgetIds[0])}getSelectedWidgets(){return this.editor.selectedWidgetIds.map(e=>this.getWidgetById(e)).filter(e=>!!e)}getSelectedProfile(){return B[this.project.deviceModel]||null}getCanvasDimensions(){const e=this.preferences.state.renderingMode||"direct";if(e==="oepl"||e==="opendisplay"){const n=this.project.protocolHardware;return this.preferences.state.orientation==="portrait"?{width:Math.min(n.width,n.height),height:Math.max(n.width,n.height)}:{width:Math.max(n.width,n.height),height:Math.min(n.width,n.height)}}return this.project.getCanvasDimensions(this.preferences.state.orientation)}getCanvasShape(){return this.project.getCanvasShape()}getPagesPayload(){const e={...this.project.getPagesPayload(),currentPageIndex:this.currentPageIndex,...this.settings};return e.deviceModel=this.project.deviceModel,e.customHardware=this.project.customHardware,e.protocolHardware=this.project.protocolHardware,e.device_model=this.project.deviceModel,e.custom_hardware=this.project.customHardware,e.protocol_hardware=this.project.protocolHardware,e}getSettings(){return this.settings}setSettings(e){this.updateSettings(e)}updateProtocolHardware(e){Object.assign(this.project.state.protocolHardware,e),L(C.SETTINGS_CHANGED),L(C.PAGE_CHANGED,{index:this.currentPageIndex,forceFocus:!0})}saveToLocalStorage(){if(!z()){const e=this.getPagesPayload();console.log("[saveToLocalStorage] DEBUG renderingMode being saved:",e.renderingMode),localStorage.setItem("esphome-designer-layout",JSON.stringify(e))}}loadFromLocalStorage(){try{const e=localStorage.getItem("esphome-designer-layout"),n=e?JSON.parse(e):null;return console.log("[loadFromLocalStorage] DEBUG raw data exists:",!!e),console.log("[loadFromLocalStorage] DEBUG parsed renderingMode:",n?.renderingMode),console.log("[loadFromLocalStorage] DEBUG parsed rendering_mode:",n?.rendering_mode),n}catch(e){return console.error("[loadFromLocalStorage] Parse error:",e),null}}setPages(e){this.project.setPages(e),this.recordHistory(),L(C.STATE_CHANGED)}reorderWidget(e,n,o){this.project.reorderWidget(e,n,o),this.syncWidgetOrderWithHierarchy(),this.recordHistory(),L(C.STATE_CHANGED)}setCurrentPageIndex(e,n={}){this.project.setCurrentPageIndex(e,n),this.editor.setSelectedWidgetIds([]),L(C.STATE_CHANGED)}reorderPage(e,n){this.project.reorderPage(e,n),this.recordHistory()}addPage(e=null){const n=this.project.addPage(e);return this.recordHistory(),n}deletePage(e){this.project.deletePage(e),this.recordHistory()}duplicatePage(e){const n=this.project.duplicatePage(e);return this.recordHistory(),n}renamePage(e,n){this.project.renamePage(e,n),this.recordHistory()}selectWidget(e,n){if(!e){this.editor.selectWidget(null,n);return}const o=this.getWidgetById(e),i=o?.parentId||(o?.type==="group"?o.id:null);if(i){const a=this.pages[this.currentPageIndex].widgets.filter(l=>l.parentId===i||l.id===i).map(l=>l.id);if(n)if(a.some(c=>this.editor.selectedWidgetIds.includes(c))){const c=this.editor.selectedWidgetIds.filter(d=>!a.includes(d));this.editor.setSelectedWidgetIds(c)}else this.editor.setSelectedWidgetIds([...new Set([...this.editor.selectedWidgetIds,...a])]);else this.editor.setSelectedWidgetIds(a)}else this.editor.selectWidget(e,n)}selectWidgets(e){this.editor.setSelectedWidgetIds(e)}selectAllWidgets(){const e=this.getCurrentPage();if(!e||!e.widgets)return;const n=e.widgets.map(o=>o.id);this.selectWidgets(n)}updateSettings(e){e.renderingMode!==void 0&&(console.log("[updateSettings] DEBUG renderingMode changing to:",e.renderingMode),console.trace("[updateSettings] Call stack"));const n={},o={};Object.keys(e).forEach(i=>{i.startsWith("ai_api_key_")?n[i]=e[i]:o[i]=e[i]}),Object.keys(n).length&&Object.entries(n).forEach(([i,s])=>this.secrets.set(i,s)),this.preferences.update(o),e.device_name&&(this.project.state.deviceName=e.device_name),e.device_model&&(this.project.state.deviceModel=e.device_model),L(C.STATE_CHANGED),(e.device_model||e.orientation||e.custom_hardware)&&L(C.PAGE_CHANGED,{index:this.currentPageIndex,forceFocus:!0})}setDeviceName(e){this.project.state.deviceName=e,this.updateLayoutIndicator(),L(C.STATE_CHANGED)}setDeviceModel(e){this.project.state.deviceModel=e,this.updateLayoutIndicator(),L(C.STATE_CHANGED),L(C.PAGE_CHANGED,{index:this.currentPageIndex,forceFocus:!0})}setCurrentLayoutId(e){this.project.state.currentLayoutId=e,this.updateLayoutIndicator(),L(C.STATE_CHANGED)}updateLayoutIndicator(){const e=document.getElementById("currentLayoutName");e&&(e.textContent=this.project.deviceName||this.project.currentLayoutId||"Unknown")}setSnapEnabled(e){this.preferences.setSnapEnabled(e)}setShowGrid(e){this.preferences.setShowGrid(e)}setShowDebugGrid(e){this.preferences.setShowDebugGrid(e)}setShowRulers(e){this.preferences.setShowRulers(e)}setZoomLevel(e){this.editor.setZoomLevel(e)}setCustomHardware(e){this.project.state.customHardware=e,L(C.STATE_CHANGED),L(C.PAGE_CHANGED,{index:this.currentPageIndex,forceFocus:!0})}addWidget(e,n=null){this._checkRenderingModeForWidget(e),this.project.addWidget(e,n),this.recordHistory(),this.selectWidget(e.id),L(C.STATE_CHANGED)}updateWidget(e,n){this.project.updateWidget(e,n);const o=this.getWidgetById(e);if(o&&o.type==="group"){const i=["locked","hidden"],s={};if(i.forEach(r=>{n[r]!==void 0&&(s[r]=n[r])}),Object.keys(s).length>0){const r=this.pages[this.currentPageIndex];r&&r.widgets&&r.widgets.filter(l=>l.parentId===e).forEach(l=>this.updateWidget(l.id,s))}}n.parentId!==void 0&&this.syncWidgetOrderWithHierarchy(),L(C.STATE_CHANGED)}updateWidgets(e,n){e.forEach(o=>this.project.updateWidget(o,n)),L(C.STATE_CHANGED)}updateWidgetsProps(e,n){e.forEach(o=>{const i=this.getWidgetById(o);if(i){const s={...i.props||{},...n};this.project.updateWidget(o,{props:s})}}),L(C.STATE_CHANGED)}deleteWidget(e){const n=e?[e]:[...this.editor.selectedWidgetIds],o=[...n];n.forEach(i=>{const s=this.getWidgetById(i);s&&s.type==="group"&&this.pages[this.currentPageIndex].widgets.filter(a=>a.parentId===i).forEach(a=>o.push(a.id))}),this.project.deleteWidgets([...new Set(o)]),this.editor.setSelectedWidgetIds([]),this.recordHistory(),L(C.STATE_CHANGED)}groupSelection(){const e=this.editor.selectedWidgetIds,n=this.getSelectedWidgets(),o=n.some(d=>d.type==="group"||d.parentId);if(e.length<2||o)return;let i=1/0,s=1/0,r=-1/0,a=-1/0;n.forEach(d=>{i=Math.min(i,d.x),s=Math.min(s,d.y),r=Math.max(r,d.x+(d.width||0)),a=Math.max(a,d.y+(d.height||0))});const l="group_"+ke(),c={id:l,type:"group",title:"Group",x:i,y:s,width:r-i,height:a-s,props:{},expanded:!0};this.project.addWidget(c),n.forEach(d=>{this.project.updateWidget(d.id,{parentId:l})}),this.selectWidget(l),this.syncWidgetOrderWithHierarchy(),this.recordHistory(),L(C.STATE_CHANGED)}ungroupSelection(e=null){let n=[];if(e)n=Array.isArray(e)?e:[e];else{const a=this.getSelectedWidgets(),l=new Set;a.forEach(c=>{c.type==="group"?l.add(c.id):c.parentId&&l.add(c.parentId)}),n=[...l]}const o=new Set;n.forEach(a=>{const l=this.getWidgetById(a);l&&(l.type==="group"?o.add(l.id):l.parentId&&o.add(l.parentId))});const i=[...o];if(i.length===0)return;const s=[];i.forEach(a=>{const l=this.getWidgetById(a);if(!l||l.type!=="group")return;this.pages[this.currentPageIndex].widgets.filter(u=>u.parentId===a).forEach(u=>{this.project.updateWidget(u.id,{parentId:null}),s.push(u.id)})}),this.project.deleteWidgets(i);const r=this.pages[this.currentPageIndex];r&&r.widgets&&(r.widgets=r.widgets.filter(a=>!i.includes(a.id))),s.length>0&&this.selectWidgets(s),this.syncWidgetOrderWithHierarchy(),this.recordHistory(),L(C.STATE_CHANGED)}alignSelectedWidgets(e){const n=this.getSelectedWidgets();if(n.length<2)return;let o;switch(e){case"left":o=Math.min(...n.map(i=>i.x)),n.forEach(i=>this.project.updateWidget(i.id,{x:o}));break;case"right":o=Math.max(...n.map(i=>i.x+(i.width||0))),n.forEach(i=>this.project.updateWidget(i.id,{x:o-(i.width||0)}));break;case"center":{const i=n.map(s=>s.x+(s.width||0)/2);o=i.reduce((s,r)=>s+r,0)/i.length,n.forEach(s=>this.project.updateWidget(s.id,{x:o-(s.width||0)/2}));break}case"top":o=Math.min(...n.map(i=>i.y)),n.forEach(i=>this.project.updateWidget(i.id,{y:o}));break;case"bottom":o=Math.max(...n.map(i=>i.y+(i.height||0))),n.forEach(i=>this.project.updateWidget(i.id,{y:o-(i.height||0)}));break;case"middle":{const i=n.map(s=>s.y+(s.height||0)/2);o=i.reduce((s,r)=>s+r,0)/i.length,n.forEach(s=>this.project.updateWidget(s.id,{y:o-(s.height||0)/2}));break}}this.recordHistory(),L(C.STATE_CHANGED)}distributeSelectedWidgets(e){const n=[...this.getSelectedWidgets()];if(!(n.length<3)){if(e==="horizontal"){n.sort((d,u)=>d.x-u.x);const o=n[0],i=n[n.length-1],s=n.reduce((d,u)=>d+(u.width||0),0),l=(i.x+(i.width||0)-o.x-s)/(n.length-1);let c=o.x;for(let d=0;d<n.length;d++)this.project.updateWidget(n[d].id,{x:Math.round(c)}),c+=(n[d].width||0)+l}else{n.sort((d,u)=>d.y-u.y);const o=n[0],i=n[n.length-1],s=n.reduce((d,u)=>d+(u.height||0),0),l=(i.y+(i.height||0)-o.y-s)/(n.length-1);let c=o.y;for(let d=0;d<n.length;d++)this.project.updateWidget(n[d].id,{y:Math.round(c)}),c+=(n[d].height||0)+l}this.recordHistory(),L(C.STATE_CHANGED)}}moveWidgetToPage(e,n,o=null,i=null){const s=this.project.moveWidgetToPage(e,n,o,i);return s&&(this.syncWidgetOrderWithHierarchy(),this.recordHistory(),L(C.STATE_CHANGED)),s}clearCurrentPage(e=!1){const n=this.project.clearCurrentPage(e);return n.deleted>0&&(this.editor.setSelectedWidgetIds([]),this.recordHistory(),L(C.STATE_CHANGED)),n}copyWidget(e){const o=(e?[e]:this.editor.selectedWidgetIds).map(i=>this.getWidgetById(i)).filter(i=>!!i);o.length>0&&this.editor.copyWidgets(o)}pasteWidget(){const e=this.editor.clipboardWidgets;if(!e||e.length===0)return;const n=e.map(o=>{const i=JSON.parse(JSON.stringify(o));return i.id=ke(),i.x+=10,i.y+=10,i});n.forEach(o=>{this._checkRenderingModeForWidget(o),this.project.addWidget(o)}),this.editor.setSelectedWidgetIds(n.map(o=>o.id)),this.recordHistory(),L(C.STATE_CHANGED)}createDropShadow(e){const n=Array.isArray(e)?e:[e];if(n.length===0)return;const o=this.project.getCurrentPage(),i=o?o.dark_mode:void 0;let s=!1;i==="dark"?s=!0:i==="light"?s=!1:s=!!this.settings.dark_mode;const r=s?"white":"black",a=s?"black":"white",l=s?"white":"black",c=[];n.forEach(d=>{const u=this.getWidgetById(d);if(!u)return;const h=parseInt(u.props?.border_radius||u.props?.radius||u.props?.corner_radius||0,10);let p="shape_rect";u.type==="shape_circle"||u.type==="circle"?p="shape_circle":h>0&&(p="rounded_rect");const f={id:ke(),type:p,x:(u.x||0)+5,y:(u.y||0)+5,width:u.width,height:u.height,props:{name:(u.props?.name||u.type)+" Shadow",color:r,background_color:r,bg_color:r,fill:!0}};p==="rounded_rect"&&(f.props.radius=h),this.project.addWidget(f),u.props||(u.props={});const y=["shape_rect","rounded_rect","shape_circle","rectangle","rrect","circle"].includes(u.type),m=u.props.color||l;u.props.border_color||(u.props.border_color=m),u.props.fill=!0,u.props.background_color=a,u.props.bg_color=a,y&&(u.props.color=a),this.project.updateWidget(d,{props:{...u.props}});const _=o.widgets.findIndex(D=>D.id===d),b=o.widgets.findIndex(D=>D.id===f.id);_!==-1&&b!==-1&&this.project.reorderWidget(this.project.currentPageIndex,b,_);const x="group_"+ke(),S=Math.min(u.x,f.x),E=Math.min(u.y,f.y),w=Math.max(u.x+u.width,f.x+f.width),I=Math.max(u.y+u.height,f.y+f.height),P={id:x,type:"group",title:u.props?.name?`${u.props.name} Group`:"Shadow Group",x:S,y:E,width:w-S,height:I-E,props:{},expanded:!0};this.project.addWidget(P),this.project.updateWidget(f.id,{parentId:x}),this.project.updateWidget(u.id,{parentId:x}),c.push(x)}),c.length>0&&this.selectWidgets(c),this.syncWidgetOrderWithHierarchy(),this.recordHistory(),L(C.STATE_CHANGED)}recordHistory(){this._isRestoringHistory||this.editor.recordHistory({pages:this.project.pages,deviceName:this.project.deviceName})}undo(){const e=this.editor.undo();e&&(this.setInternalFlag("_isRestoringHistory",!0),this.restoreSnapshot(e),setTimeout(()=>{this.setInternalFlag("_isRestoringHistory",!1)},0))}redo(){const e=this.editor.redo();e&&(this.setInternalFlag("_isRestoringHistory",!0),this.restoreSnapshot(e),setTimeout(()=>{this.setInternalFlag("_isRestoringHistory",!1)},0))}setInternalFlag(e,n){const o=this.$raw||this;o[e]=n}restoreSnapshot(e){this.project.state.pages=JSON.parse(JSON.stringify(e.pages)),this.project.state.deviceName=e.deviceName,this.project.rebuildWidgetsIndex(),L(C.STATE_CHANGED)}canUndo(){return this.editor.canUndo()}canRedo(){return this.editor.canRedo()}syncWidgetOrderWithHierarchy(){const e=this.getCurrentPage();if(!e||!e.widgets)return;const n=[...e.widgets],o=n.filter(a=>!a.parentId),i=new Map;n.forEach(a=>{a.parentId&&(i.has(a.parentId)||i.set(a.parentId,[]),i.get(a.parentId).push(a))});const s=[],r=a=>{s.push(a);const l=i.get(a.id);l&&(l.sort((c,d)=>n.indexOf(c)-n.indexOf(d)),l.forEach(r))};o.forEach(r),e.widgets=s,this.project.rebuildWidgetsIndex()}syncWidgetVisibilityWithMode(){const e=this.preferences.state.renderingMode||"direct";v.log(`[AppState] Syncing widget visibility for mode: ${e}`);let n=0;this.project.pages.forEach(o=>{o.widgets.forEach(i=>{const s=this._isWidgetCompatibleWithMode(i,e);!s&&!i.hidden?(i.hidden=!0,n++):s&&i.hidden&&(i.hidden=!1,n++)})}),n>0&&(v.log(`[AppState] Updated ${n} widgets due to mode switch.`),this.project.rebuildWidgetsIndex(),L(C.STATE_CHANGED))}_isWidgetCompatibleWithMode(e,n){const o=U.get(e.type);if(!o)return!0;if(n==="oepl")return!!o.exportOEPL;if(n==="opendisplay")return!!o.exportOpenDisplay;if(n==="lvgl"){const i=e.type&&e.type.startsWith("lvgl_"),s=typeof o.exportLVGL=="function";return i||s}if(n==="direct"){const i=e.type&&(e.type.startsWith("lvgl_")||e.type.startsWith("oepl_"));return!!o.export&&!i}return!0}_checkRenderingModeForWidget(e){if(!e||!e.type)return;const n=this.preferences.state.renderingMode||"direct",o=e.type.startsWith("lvgl_"),i=e.type.startsWith("oepl_"),s=e.type.startsWith("odp_")||e.type.startsWith("opendisplay_");o&&n==="direct"?(this.updateSettings({renderingMode:"lvgl"}),v.log(`[AppState] Auto-switched to LVGL rendering mode because an LVGL widget (${e.type}) was added.`),A("Auto-switched to LVGL rendering mode","info")):i&&n!=="oepl"?(this.updateSettings({renderingMode:"oepl"}),v.log(`[AppState] Auto-switched to OEPL rendering mode because an OEPL widget (${e.type}) was added.`),A("Auto-switched to OEPL mode","info")):s&&n!=="opendisplay"&&(this.updateSettings({renderingMode:"opendisplay"}),v.log(`[AppState] Auto-switched to OpenDisplay (ODP) mode because an ODP widget (${e.type}) was added.`),A("Auto-switched to ODP mode","info"))}}const Ua=new za,ja={set(t,e,n,o){return e==="snapEnabled"?(v.warn(`[StateProxy] Intercepted illegal write to '${e}'. Automatically rerouting to setSnapEnabled().`),typeof t.setSnapEnabled=="function"&&t.setSnapEnabled(n),!0):(!["entityStates","_isRestoringHistory"].includes(e)&&typeof t[e]!="function"&&(v.warn(`[StateProxy] 🚨 ILLEGAL STATE MUTATION DETECTED: AppState.${e} = ${n}`),console.trace(`[StateProxy] Trace for illegal mutation of AppState.${e}`)),Reflect.set(t,e,n,o))}},g=new Proxy(Ua,ja);window.AppState=g;window.ESPHomeDesigner=window.ESPHomeDesigner||{};window.ESPHomeDesigner.state=g;window.AppState=g;window.ESPHomeDesigner=window.ESPHomeDesigner||{};window.ESPHomeDesigner.state=g;function Ze(){return window.AppState&&window.AppState.deviceModel?window.AppState.deviceModel:window.currentDeviceModel||"reterminal_e1001"}function Ya(t){if(B&&B[t])return B[t].name;switch(t){case"reterminal_e1002":return"reTerminal E1002 (6-Color)";case"esp32_s3_photopainter":return"Waveshare PhotoPainter (7-Color)";case"trmnl":return"Official TRMNL (ESP32-C3)";case"reterminal_e1001":default:return"reTerminal E1001 (Monochrome)"}}function hn(){const t=Ze();return!!(B&&B[t]&&(B[t].features?.lcd||B[t].features?.oled))}function Fe(){const t=window.AppState,e=t?.settings?.renderingMode||"direct";if(e==="oepl"||e==="opendisplay"){const i=(t?.project?.protocolHardware||{}).colorMode||"bw";return i==="full_color"?["black","white","red","green","blue","yellow","orange","gray","purple","cyan","magenta"]:i==="color_3"?["black","white","red","yellow","gray"]:["theme_auto","black","white","gray"]}if(hn())return["black","white","red","green","blue","yellow","orange","gray","purple","cyan","magenta"];const n=Ze();return n==="reterminal_e1002"?["theme_auto","black","white","gray","red","green","blue","yellow"]:n==="esp32_s3_photopainter"?["theme_auto","black","white","gray","red","green","blue","yellow"]:["theme_auto","black","white","gray"]}function gn(t){if(!t)return"#000000";if(t.startsWith("#"))return t;if(t.startsWith("0x"))return"#"+t.substring(2);switch(t.toLowerCase()){case"theme_auto":return window.WidgetFactory?.getEffectiveDarkMode?.()||!1?"#ffffff":"#000000";case"theme_auto_inverse":return window.WidgetFactory?.getEffectiveDarkMode?.()||!1?"#000000":"#ffffff";case"white":return"#ffffff";case"red":return"#ff0000";case"green":return"#00ff00";case"blue":return"#0000ff";case"yellow":return"#ffff00";case"orange":return"#ffa500";case"gray":return"#a0a0a0";case"transparent":return"transparent";case"black":default:return"#000000"}}window.getDeviceModel=Ze;window.getDeviceDisplayName=Ya;window.isRGBDevice=hn;window.getAvailableColors=Fe;window.getColorStyle=gn;let Qe=class Ce{static getEffectiveDarkMode(){const n=g?.getCurrentPage?.()?.dark_mode;return n==="dark"?!0:n==="light"?!1:!!(g&&g.settings&&g.settings.dark_mode)}static getDefaultColor(){return Ce.getEffectiveDarkMode()?"white":"black"}static getDefaultBgColor(){return Ce.getEffectiveDarkMode()?"black":"white"}static getGridCellDefaults(){return{grid_cell_row_pos:null,grid_cell_column_pos:null,grid_cell_row_span:1,grid_cell_column_span:1,grid_cell_x_align:"STRETCH",grid_cell_y_align:"STRETCH"}}static isLvglWidget(e){return e&&e.startsWith("lvgl_")}static createWidget(e){const n=ke(),o=Ce.getDefaultColor(),i=Ce.getDefaultBgColor();let s={id:n,type:e,x:40,y:40,width:120,height:40,title:"",entity_id:"",locked:!1,props:{}};switch(e){case"nav_next_page":return s.props={title:"Next",color:"rgba(0, 128, 255, 0.2)",border_color:"#0080ff",nav_action:"next_page",icon:"F0142",icon_size:48},s.width=80,s.height=80,s;case"nav_previous_page":return s.props={title:"Previous",color:"rgba(0, 128, 255, 0.2)",border_color:"#0080ff",nav_action:"previous_page",icon:"F0141",icon_size:48},s.width=80,s.height=80,s;case"nav_reload_page":return s.props={title:"Reload",color:"rgba(0, 128, 255, 0.2)",border_color:"#0080ff",nav_action:"reload_page",icon:"F0450",icon_size:48},s.width=80,s.height=80,s}const r=U.get(e);return r&&r.defaults?(s.props={...r.defaults},(s.props.color==="black"||s.props.color==="white")&&(s.props.color="theme_auto"),(s.props.text_color==="black"||s.props.text_color==="white")&&(s.props.text_color="theme_auto"),(s.props.bg_color==="black"||s.props.bg_color==="white")&&(s.props.bg_color=i),(s.props.background_color==="black"||s.props.background_color==="white")&&(s.props.background_color=i),(s.props.border_color==="black"||s.props.border_color==="white")&&(s.props.border_color=o),r.width&&(s.width=r.width),r.height&&(s.height=r.height),r.defaults.width&&(s.width=r.defaults.width),r.defaults.height&&(s.height=r.defaults.height),r.defaults.w&&(s.width=r.defaults.w),r.defaults.h&&(s.height=r.defaults.h),s):(Ce.isLvglWidget(e)&&(s.props={...Ce.getGridCellDefaults(),...s.props}),s)}};window.WidgetFactory=Qe;class Va{constructor(){v.log("Sidebar: Constructor called"),this.pageListEl=document.getElementById("pageList"),this.pagesHeader=document.getElementById("pagesHeader"),this.pagesContent=document.getElementById("pagesContent"),this.widgetPaletteEl=document.getElementById("widgetPalette"),v.log("Sidebar: widgetPaletteEl found?",!!this.widgetPaletteEl),this.widgetPaletteEl||v.error("Sidebar: widgetPalette element not found!"),this.addPageBtn=document.getElementById("addPageBtn"),this.currentPageNameEl=document.getElementById("currentPageName"),this.hoverTimeout=null,this.hoveredPageIndex=-1}init(){v.log("Sidebar: init called");const e=document.getElementById("debug-overlay");e&&(e.innerHTML+="Sidebar.init called<br>"),Y(C.STATE_CHANGED,()=>this.render()),Y(C.PAGE_CHANGED,()=>this.render()),this.pagesHeader&&this.pagesContent&&this.pagesHeader.addEventListener("click",()=>{const i=this.pagesContent.classList.toggle("hidden"),s=this.pagesHeader.querySelector(".chevron");s&&(s.style.transform=i?"rotate(-90deg)":"rotate(0deg)")}),this.addPageBtn&&this.addPageBtn.addEventListener("click",()=>this.handleAddPage()),this.widgetPaletteEl&&(this.widgetPaletteEl.addEventListener("click",i=>this.handlePaletteClick(i)),this.widgetPaletteEl.addEventListener("dragstart",i=>{const s=i.target.closest(".item[data-widget-type]");if(s){const r=s.getAttribute("data-widget-type");v.log("[Sidebar] Drag start:",r),i.dataTransfer.setData("application/widget-type",r),i.dataTransfer.effectAllowed="copy"}})),document.addEventListener("click",i=>{const s=document.getElementById("debug-overlay");s&&(s.innerHTML+="Global click: "+i.target.tagName+"<br>")});const n=document.getElementById("clearAllBtn");n&&n.addEventListener("click",()=>this.handleClearPage());const o=document.getElementById("quickSearchBtn");o&&o.addEventListener("click",i=>{i.stopPropagation(),window.QuickSearch?window.QuickSearch.open():v.warn("Sidebar: QuickSearch instance not found on window")}),this.setupMobileToggles(),this.render()}render(){if(!this.pageListEl)return;this.pageListEl.innerHTML="";const e=g.pages,n=g.currentPageIndex;if(e.forEach((o,i)=>{const s=document.createElement("div");s.className="item"+(i===n?" active":""),s.draggable=!0,s.ondragstart=u=>{u.dataTransfer.setData("text/plain",i),u.dataTransfer.effectAllowed="move",s.style.opacity="0.5"},s.ondragend=()=>{s.style.opacity="1",Array.from(this.pageListEl.children).forEach(u=>{u.style.borderTop="",u.style.borderBottom=""})},s.ondragover=u=>{u.preventDefault();const h=u.dataTransfer.types.includes("application/widget-id"),p=u.dataTransfer.types.includes("application/widget-type");if(h||p){u.dataTransfer.dropEffect=h?"move":"copy",s.style.backgroundColor="var(--primary-subtle)",g.currentPageIndex!==i&&g.setCurrentPageIndex(i);return}const f=s.getBoundingClientRect(),y=f.top+f.height/2;u.clientY<y?(s.style.borderTop="2px solid var(--primary)",s.style.borderBottom=""):(s.style.borderTop="",s.style.borderBottom="2px solid var(--primary)")},s.ondragleave=u=>{const h=u.relatedTarget;s.contains(h)||this.hoveredPageIndex===i&&(this.hoverTimeout&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=null),this.hoveredPageIndex=-1),s.style.borderTop="",s.style.borderBottom="",s.style.backgroundColor=""},s.ondrop=u=>{u.preventDefault(),this.hoverTimeout&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=null),this.hoveredPageIndex=-1,s.style.borderTop="",s.style.borderBottom="",s.style.backgroundColor="";const h=u.dataTransfer.getData("application/widget-id"),p=u.dataTransfer.getData("application/widget-type");if(h){v.log(`[Sidebar] Drop detected on page ${i}. Widget ID:`,h);const m=i;m!==g.currentPageIndex&&(g.moveWidgetToPage(h,m),v.log(`[Sidebar] Moved widget ${h} to page ${m}`));return}if(p){v.log(`[Sidebar] Drop detected on page ${i}. Widget Type:`,p);const m=i;try{const _=Qe.createWidget(p);_.x=40,_.y=40,g.addWidget(_,m),g.setCurrentPageIndex(m),g.selectWidget(_.id,!1),v.log(`[Sidebar] Added new ${p} to page ${m}`)}catch(_){v.error("[Sidebar] Error creating widget from drop:",_)}return}const f=parseInt(u.dataTransfer.getData("text/plain"),10),y=i;this.handlePageReorder(f,y,u.clientY,s)},s.onclick=()=>{g.setCurrentPageIndex(i,{forceFocus:!0})},s.ondblclick=u=>{u.stopPropagation();const h=o.name||"",p=prompt("Rename Page:",h);p!==null&&p.trim()!==""&&p!==h&&g.renamePage(i,p)};const r=document.createElement("span");r.className="item-icon",r.innerHTML=`<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>`,s.appendChild(r);const a=document.createElement("span");a.className="label",a.textContent=o.name,s.appendChild(a);const l=document.createElement("div");l.style.marginLeft="auto",l.style.display="flex",l.style.gap="2px";const c=document.createElement("button");c.textContent="⚙",c.className="btn btn-secondary",c.style.padding="1px 4px",c.style.fontSize="8px",c.onclick=u=>{u.stopPropagation(),this.openPageSettings(i)},l.appendChild(c);const d=document.createElement("button");if(d.textContent="⧉",d.className="btn btn-secondary",d.style.padding="1px 4px",d.style.fontSize="8px",d.title="Duplicate Page",d.onclick=u=>{u.stopPropagation(),g.duplicatePage(i)},l.appendChild(d),e.length>1){const u=document.createElement("button");u.textContent="✕",u.className="btn btn-secondary",u.style.padding="1px 4px",u.style.fontSize="8px",u.style.color="var(--danger)",u.onclick=h=>{h.stopPropagation(),this.handlePageDelete(i,o)},l.appendChild(u)}s.appendChild(l),this.pageListEl.appendChild(s)}),this.currentPageNameEl){const o=g.getCurrentPage();this.currentPageNameEl.textContent=o?o.name:"None"}}handleAddPage(){g.addPage()}handlePageReorder(e,n,o,i){if(e===n)return;const s=i.getBoundingClientRect(),r=s.top+s.height/2;let a=n;o>=r&&a++,e<a&&a--,e!==a&&g.reorderPage(e,a)}handlePaletteClick(e){const n=document.getElementById("debug-overlay");n&&(n.innerHTML+="handlePaletteClick triggered<br>"),v.log("Sidebar: handlePaletteClick",e.target);const o=e.target.closest(".item[data-widget-type]");if(!o){v.log("Sidebar: No item found"),n&&(n.innerHTML+="No item found<br>");return}const i=o.getAttribute("data-widget-type");v.log("Sidebar: Creating widget of type",i),n&&(n.innerHTML+="Creating widget: "+i+"<br>");try{const s=Qe.createWidget(i);v.log("Sidebar: Widget created",s),n&&(n.innerHTML+="Widget created<br>"),g.addWidget(s),v.log("Sidebar: Widget added to state"),window.app&&window.app.canvas&&(window.app.canvas.suppressNextFocus=!0),n&&(n.innerHTML+="Widget added to state<br>")}catch(s){v.error("Sidebar: Error creating/adding widget",s),n&&(n.innerHTML+="Error: "+s.message+"<br>")}}openPageSettings(e){if(window.app&&window.app.pageSettings)window.app.pageSettings.open(e);else{v.error("Sidebar: PageSettings instance not found on window.app");const n=g.pages[e];window.currentPageSettingsTarget=n;const o=document.getElementById("pageSettingsModal");o&&(o.classList.remove("hidden"),o.style.display="flex")}}handlePageDelete(e,n){const o=document.createElement("div");o.className="modal-backdrop",o.style.display="flex",o.innerHTML=`
            <div class="modal" style="width: 320px; height: auto; min-height: 150px; padding: var(--space-4);">
                <div class="modal-header" style="font-size: var(--fs-md); padding-bottom: var(--space-2);">
                    <div>Delete Page</div>
                </div>
                <div class="modal-body" style="padding: var(--space-2) 0;">
                    <p style="margin-bottom: var(--space-3); font-size: var(--fs-sm);">
                        Are you sure you want to delete the page <b>"${n.name}"</b>?
                        <br><br>
                        This action cannot be undone.
                    </p>
                </div>
                <div class="modal-actions" style="padding-top: var(--space-3); border-top: 1px solid var(--border-subtle);">
                    <button class="btn btn-secondary close-btn btn-xs">Cancel</button>
                    <button class="btn btn-primary confirm-btn btn-xs" style="background: var(--danger); color: white; border: none;">Delete</button>
                </div>
            </div>
        `,document.body.appendChild(o);const i=()=>o.remove(),s=()=>{i();try{typeof g.deletePage=="function"?g.deletePage(e):(console.error("AppState.deletePage is missing"),typeof A=="function"&&A("Error: AppState.deletePage not found","error"))}catch(r){console.error("[Sidebar] Error deleting page:",r),typeof A=="function"&&A("Error deleting page: "+r.message,"error")}};o.querySelectorAll(".close-btn").forEach(r=>r.onclick=i),o.querySelector(".confirm-btn").onclick=s,o.onclick=r=>{r.target===o&&i()}}handleClearPage(){const e=g||window.AppState;if(!e){console.error("[Sidebar] AppState is not defined!"),typeof A=="function"&&A("Error: Application State is not ready.","error");return}const n=document.createElement("div");n.className="modal-backdrop",n.style.display="flex",n.innerHTML=`
            <div class="modal" style="width: 320px; height: auto; min-height: 180px; padding: var(--space-4);">
                <div class="modal-header" style="font-size: var(--fs-md); padding-bottom: var(--space-2);">
                    <div>Clear Page</div>
                </div>
                <div class="modal-body" style="padding: var(--space-2) 0;">
                    <p style="margin-bottom: var(--space-3); font-size: var(--fs-sm);">Are you sure you want to clear all widgets? <b>Locked</b> widgets will stay.</p>
                </div>
                <div class="modal-actions" style="padding-top: var(--space-3); border-top: 1px solid var(--border-subtle);">
                    <button class="btn btn-secondary close-btn btn-xs">Cancel</button>
                    <button class="btn btn-primary confirm-btn btn-xs" style="background: var(--danger); color: white; border: none;">Clear All</button>
                </div>
            </div>
        `,document.body.appendChild(n);const o=()=>{n.remove()},i=()=>{o();try{console.log("[Sidebar] Executing clearCurrentPage...");const a=e.clearCurrentPage(!0);a.preserved>0&&typeof A=="function"?A(`Cleared ${a.deleted} widgets. ${a.preserved} locked widget(s) were preserved.`,"info"):a.deleted>0?A(`Cleared all ${a.deleted} widgets.`,"success"):a.preserved>0?A(`No widgets cleared. ${a.preserved} locked widget(s) preserved.`,"info"):A("Page is already empty.","info"),v.log("Cleared widgets from current page via AppState")}catch(a){console.error("[Sidebar] Error clearing page:",a),typeof A=="function"&&A("Error clearing page: "+a.message,"error")}};n.querySelectorAll(".close-btn").forEach(a=>a.onclick=o);const r=n.querySelector(".confirm-btn");r.onclick=i,n.onclick=a=>{a.target===n&&o()}}setupMobileToggles(){const e=document.getElementById("mobileWidgetsBtn"),n=document.getElementById("mobilePropsBtn"),o=document.getElementById("mobileDeviceBtn"),i=document.getElementById("mobileBackdrop"),s=document.querySelector(".sidebar"),r=document.querySelector(".right-panel"),a=()=>{s?.classList.remove("mobile-active"),r?.classList.remove("mobile-active"),i?.classList.remove("active")};e?.addEventListener("click",()=>{const d=s?.classList.contains("mobile-active");a(),d||(s?.classList.add("mobile-active"),i?.classList.add("active"))}),n?.addEventListener("click",()=>{const d=r?.classList.contains("mobile-active");a(),d||(r?.classList.add("mobile-active"),i?.classList.add("active"))}),o?.addEventListener("click",()=>{a(),window.app?.deviceSettings?.open()}),document.getElementById("mobileEditorSettingsBtn")?.addEventListener("click",()=>{a(),window.app?.editorSettings?.open()}),i?.addEventListener("click",a),Y(C.SELECTION_CHANGED,()=>{window.innerWidth<=768&&(s?.classList.remove("mobile-active"),!r?.classList.contains("mobile-active")&&!s?.classList.contains("mobile-active")&&i?.classList.remove("active"))});const c=this.handlePaletteClick.bind(this);this.handlePaletteClick=d=>{c(d),window.innerWidth<=768&&a()}}}function xe(t){if(!t.canvas)return;const e=g.pages,n=g.getCanvasDimensions();t.canvas.querySelectorAll(".snap-guide");const o=t.canvas.querySelector(".lasso-selection");t.canvas.innerHTML="",g.settings.editor_light_mode?t.canvas.classList.add("light-mode"):t.canvas.classList.remove("light-mode");const i=g.getCurrentPage();i&&Wn(i)?t.viewport&&t.viewport.classList.add("device-dark-mode"):t.viewport&&t.viewport.classList.remove("device-dark-mode"),e.forEach((l,c)=>{const d=n.width,u=n.height,h=document.createElement("div");h.className="artboard-wrapper",h.dataset.index=c,c===g.currentPageIndex&&h.classList.add("active-page");const p=document.createElement("div");p.className="artboard-header",p.appendChild(Me("mdi-cog-outline","Page Settings",()=>{window.pageSettings&&window.pageSettings.open(c)}));const f=document.createElement("span");f.className="artboard-name",f.textContent=l.name||`Page ${c+1} `,p.appendChild(f);const y=document.createElement("div");y.className="artboard-actions",c>0&&y.appendChild(Me("mdi-chevron-left","Move Left",()=>{g.reorderPage(c,c-1)})),c<e.length-1&&y.appendChild(Me("mdi-chevron-right","Move Right",()=>{g.reorderPage(c,c+1)})),y.appendChild(Me("mdi-plus","Add Page After",()=>{g.addPage(c+1)})),y.appendChild(Me("mdi-eraser","Clear Current Page",()=>{$n({title:"Clear Page",message:`Are you sure you want to clear all widgets from < b > "${l.name||`Page ${c+1}`}"</b >? <br><br>This cannot be undone.`,confirmLabel:"Clear Page",confirmClass:"btn-danger",onConfirm:()=>{g.setCurrentPageIndex(c),g.clearCurrentPage()}})})),y.appendChild(Me("mdi-delete-outline","Delete Page",()=>{$n({title:"Delete Page",message:`Are you sure you want to delete the page <b>"${l.name||`Page ${c+1}`}"</b>?<br><br>All widgets on this page will be lost.`,confirmLabel:"Delete Page",confirmClass:"btn-danger",onConfirm:()=>{g.deletePage(c)}})})),p.appendChild(y);const m=document.createElement("div");m.className="artboard-header-container",m.style.width=d+"px",m.appendChild(p);const _=320;if(d<_){const w=d/_;p.style.width=_+"px",p.style.transform=`scale(${w})`,p.style.transformOrigin="top left",m.style.height=40*w+"px"}else p.style.width="100%",p.style.transform="none",m.style.height="auto";h.appendChild(m);const b=g.getCanvasShape(),x=b==="round"||b==="circle",S=document.createElement("div");S.className="artboard",S.dataset.index=c,S.style.width=`${d}px`,S.style.height=`${u}px`;const E=Wn(l);if(S.classList.toggle("dark",E),S.classList.toggle("round-display",x),g.showGrid){const w=document.createElement("div");w.className="canvas-grid",S.appendChild(w)}g.showDebugGrid&&Ja(S),l.layout&&/^\d+x\d+$/.test(l.layout)&&qa(S,l.layout,n,E);for(const w of l.widgets){const I=document.createElement("div");I.className="widget",I.style.left=w.x+"px",I.style.top=w.y+"px",I.style.width=w.width+"px",I.style.height=w.height+"px",I.dataset.id=w.id,I.dataset.pageIndex=c,g.selectedWidgetIds.includes(w.id)&&I.classList.add("active"),w.locked&&I.classList.add("locked"),w.hidden&&I.classList.add("hidden-widget");const P=(w.type||"").toLowerCase(),D=U.get(P);if(P==="group")I.classList.add("widget-group"),I.innerHTML="";else if(D&&D.render)try{const R=$=>{if($==="theme_auto")return E?"#ffffff":"#000000";if($==="theme_auto_inverse")return E?"#000000":"#ffffff";const j=$;return j?gn(j):E?"#ffffff":"#000000"},G=g.selectedWidgetIds.includes(w.id),H=g.settings.device_model||"reterminal_e1001",N=B?B[H]:null;D.render(I,w,{getColorStyle:R,selected:G,profile:N,isDark:E})}catch{I.textContent=`Error: ${P}`,I.style.border="2px solid red"}else I.innerText=`Missing: ${P}`,I.style.color="red",I.style.border="1px dashed red";P!=="group"&&Ka(I),S.appendChild(I)}h.appendChild(S),t.canvas.appendChild(h)});const s=document.createElement("div");s.className="add-page-placeholder",s.title="Click to add a new page",s.style.width=`${n.width}px`,s.style.height=`${n.height}px`,s.style.marginTop="32px",s.style.position="relative",s.style.zIndex="2000",s.style.pointerEvents="auto",s.innerHTML=`
    <div class="plus-icon">+</div>
    <div class="label">Add Page</div>
    `;const r=g.getCanvasShape();(r==="round"||r==="circle")&&s.classList.add("round-display");const a=l=>{if(v.log("[Canvas] Add Page placeholder clicked"),l.stopPropagation(),l.preventDefault(),g.addPage()){const d=g.pages.length-1;window.app&&window.app.canvas&&(window.app.canvas.suppressNextFocus=!0),g.setCurrentPageIndex(d)}};s.addEventListener("mousedown",l=>l.stopPropagation()),s.addEventListener("click",a),t.canvas.appendChild(s),o&&t.canvas.appendChild(o),fn(t)}function Wn(t){const e=t?.dark_mode;return e==="dark"?!0:e==="light"?!1:!!g.settings.darkMode}function qa(t,e,n,o){const i=e.match(/^(\d+)x(\d+)$/);if(!i)return;const s=parseInt(i[1],10),r=parseInt(i[2],10),a=document.createElement("div");a.className="lvgl-grid-overlay",a.style.cssText=`
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    display: grid;
    grid-template-rows: repeat(${s}, 1fr);
    grid-template-columns: repeat(${r}, 1fr);
    pointer-events: none;
    z-index: 1;
    `;const l=o?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)",c=o?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.25)";for(let d=0;d<s;d++)for(let u=0;u<r;u++){const h=document.createElement("div");h.style.cssText=`border: 1px dashed ${l}; position: relative; box-sizing: border-box;`;const p=document.createElement("span");p.textContent=`${d},${u}`,p.style.cssText=`position: absolute; top: 2px; left: 4px; font-size: 8px; color: ${c}; pointer-events: none;`,h.appendChild(p),a.appendChild(h)}t.appendChild(a)}function he(t){const e=g.zoomLevel,n=g.settings;t.canvasContainer&&(t.canvasContainer.style.transform=`translate(${t.panX}px, ${t.panY}px) scale(${e})`,t.canvasContainer.style.transformOrigin="0 0");const o=(n.grid_opacity!==void 0?n.grid_opacity:8)/100;document.documentElement.style.setProperty("--grid-opacity",o.toString());const i=document.getElementById("zoomLevel");i&&(i.textContent=Math.round(e*100)+"%")}function xt(t,e,n=!0,o=!1){const s=t.canvas.querySelectorAll(".artboard-wrapper")[e];if(s){const r=t.viewport.getBoundingClientRect(),a=r.width,l=r.height;if(a===0||l===0){requestAnimationFrame(()=>xt(t,e,n,o));return}if(o){const h=Co(t,e);g.setZoomLevel(h)}const c=g.zoomLevel,d=s.offsetLeft+s.offsetWidth/2,u=s.offsetTop+s.offsetHeight/2;t.panX=a/2-d*c,t.panY=l/2-u*c,he(t)}}function Xa(t,e=!0){const n=t.canvas.querySelectorAll(".artboard-wrapper");if(n.length===0)return;let o=1/0,i=1/0,s=-1/0,r=-1/0;n.forEach(b=>{const x=b.offsetLeft,S=b.offsetTop,E=b.offsetWidth,w=b.offsetHeight;o=Math.min(o,x),i=Math.min(i,S),s=Math.max(s,x+E),r=Math.max(r,S+w)});const a=t.viewport.getBoundingClientRect(),l=a.width,c=a.height;if(l===0||c===0)return;const d=80,u=s-o+d,h=r-i+d,p=l/u,f=c/h;let y=Math.min(p,f);y=Math.max(.05,Math.min(2,y)),g.setZoomLevel(y);const m=o+(s-o)/2,_=i+(r-i)/2;t.panX=l/2-m*y,t.panY=c/2-_*y,he(t)}function Co(t,e=g.currentPageIndex){const o=t.canvas.querySelectorAll(".artboard-wrapper")[e];if(!o)return 1;const i=t.viewport.getBoundingClientRect(),s=64,r=o.offsetWidth+s,a=o.offsetHeight+s,l=i.width/r,c=i.height/a,d=Math.min(l,c),u=Math.min(i.width,i.height),h=Math.max(.15,Math.min(1,u/800));return Math.max(h,Math.min(4,d))}function ko(t,e,n=!1){if(!e||!e.id)return;const o=t.canvas.querySelector(`.widget[data-id="${e.id}"]`);if(o){o.style.left=e.x+"px",o.style.top=e.y+"px",o.style.width=e.width+"px",o.style.height=e.height+"px";const i=(e.type||"").toLowerCase(),s=U?U.get(i):null;if(i==="group")o.classList.add("widget-group");else if(!n&&s&&s.render)try{const r=d=>d==="theme_auto"?Ye()?"#ffffff":"#000000":d==="theme_auto_inverse"?Ye()?"#000000":"#ffffff":d?gn(d):Ye()?"#ffffff":"#000000",a=g.selectedWidgetIds.includes(e.id),l=g.settings.device_model||"reterminal_e1001",c=B?B[l]:null;s.render(o,e,{getColorStyle:r,selected:a,profile:c,isDark:Ye()})}catch{}}}function Ye(){const e=g.getCurrentPage()?.dark_mode;return e==="dark"?!0:e==="light"?!1:!!g.settings.darkMode}function Ka(t){["tl","tc","tr","rc","br","bc","bl","lc"].forEach(n=>{const o=document.createElement("div");o.className=`widget-resize-handle handle-${n}`,o.dataset.handle=n,t.appendChild(o)})}function fn(t){const e=g.selectedWidgetIds,n=t.canvas.querySelector(`.artboard-wrapper[data-index="${g.currentPageIndex}"]`),o=n?n.querySelector(".artboard"):null;let i=t.canvas.querySelector(".context-toolbar");if(e.length===0||t.dragState||t.lassoState||!o){i&&i.remove();return}const s=g.getSelectedWidgets();if(s.length===0||!n||!o){i&&i.remove();return}let r=1/0,a=1/0,l=-1/0,c=-1/0;s.forEach(p=>{r=Math.min(r,p.x),a=Math.min(a,p.y),l=Math.max(l,p.x+(p.width||0)),c=Math.max(c,p.y+(p.height||0))});const d=r,u=o.offsetTop+a-45;if(i?i.parentElement!==n&&n.appendChild(i):(i=document.createElement("div"),i.className="context-toolbar",n.appendChild(i)),i.style.left=d+"px",i.style.top=u+"px",i.innerHTML="",e.length>1&&([{icon:"mdi-align-horizontal-left",title:"Align Left",action:"left"},{icon:"mdi-align-horizontal-center",title:"Align Center",action:"center"},{icon:"mdi-align-horizontal-right",title:"Align Right",action:"right"},{separator:!0},{icon:"mdi-align-vertical-top",title:"Align Top",action:"top"},{icon:"mdi-align-vertical-center",title:"Align Middle",action:"middle"},{icon:"mdi-align-vertical-bottom",title:"Align Bottom",action:"bottom"}].forEach(f=>{if(f.separator){tt(i);return}Ue(i,f.icon,f.title,()=>g.alignSelectedWidgets(f.action))}),e.length>=3&&(tt(i),Ue(i,"mdi-distribute-horizontal-center","Distribute Horizontally",()=>g.distributeSelectedWidgets("horizontal")),Ue(i,"mdi-distribute-vertical-center","Distribute Vertically",()=>g.distributeSelectedWidgets("vertical")))),s.some(p=>p.type==="group"||p.parentId)?(i.children.length>0&&tt(i),Ue(i,"mdi-ungroup","Ungroup (Ctrl+Shift+G)",()=>g.ungroupSelection())):e.length>1&&(i.children.length>0&&tt(i),Ue(i,"mdi-group","Group Selection (Ctrl+G)",()=>g.groupSelection())),i.children.length===0){i.remove();return}}function Ue(t,e,n,o){const i=document.createElement("button");i.className="btn-icon",i.title=n,i.innerHTML=`<i class="mdi ${e}"></i>`,i.onclick=s=>{s.stopPropagation(),o()},t.appendChild(i)}function tt(t){if(!t.lastElementChild||t.lastElementChild.classList.contains("separator"))return;const e=document.createElement("div");e.className="separator",t.appendChild(e)}function Me(t,e,n){const o=document.createElement("button");return o.className="artboard-btn",o.title=e,o.innerHTML=`<i class="mdi ${t}"></i>`,o.onclick=i=>{i.stopPropagation(),n()},o}function $n({title:t,message:e,confirmLabel:n,confirmClass:o,onConfirm:i}){const s=document.createElement("div");s.className="modal-backdrop",s.style.display="flex",s.innerHTML=`
    <div class="modal" style="width: 340px; height: auto; padding: var(--space-4); border-radius: 12px; border: 1px solid var(--glass-border);">
        <div class="modal-header" style="font-size: var(--fs-md); font-weight: 600; padding-bottom: var(--space-3); border-bottom: 1px solid var(--border-subtle);">
            <div>${t}</div>
        </div>
        <div class="modal-body" style="padding: var(--space-4) 0;">
            <p style="font-size: var(--fs-sm); line-height: 1.5; color: var(--text-dim);">
                ${e}
            </p>
        </div>
        <div class="modal-actions" style="display: flex; gap: 8px; justify-content: flex-end; padding-top: var(--space-3);">
            <button class="btn btn-secondary close-btn btn-xs" style="border-radius: 6px;">Cancel</button>
            <button class="btn ${o} confirm-btn btn-xs" style="border-radius: 6px;">${n||"Confirm"}</button>
        </div>
    </div>
    `,document.body.appendChild(s);const r=s.querySelector(".close-btn"),a=s.querySelector(".confirm-btn");r.onclick=()=>s.remove(),a.onclick=()=>{i(),s.remove()}}function Ja(t,e,n){const o=document.createElement("div");o.className="debug-grid-overlay",t.appendChild(o)}const zn=Object.freeze(Object.defineProperty({__proto__:null,applyZoom:he,calculateZoomToFit:Co,focusPage:xt,getEffectiveDarkMode:Ye,render:xe,renderContextToolbar:fn,updateWidgetDOM:ko,zoomToFitAll:Xa},Symbol.toStringTag,{value:"Module"}));class Za{constructor(e){this.canvasInstance=e,this.topRuler=document.getElementById("rulerTop"),this.leftRuler=document.getElementById("rulerLeft"),this.container=document.querySelector(".canvas-rulers"),this.viewport=e.viewport,this.indicators=null,this.init()}init(){!this.topRuler||!this.leftRuler||(this.topCtx=this.createRulerCanvas(this.topRuler),this.leftCtx=this.createRulerCanvas(this.leftRuler),this.update())}createRulerCanvas(e){const n=document.createElement("canvas");return e.appendChild(n),n.getContext("2d")}setIndicators(e){this.indicators=e,this.update()}update(){if(!g.showRulers){this.container&&(this.container.style.display="none"),this.viewport&&this.viewport.classList.remove("with-rulers");return}this.container&&(this.container.style.display="block"),this.viewport&&this.viewport.classList.add("with-rulers");const e=document.querySelector(".artboard-wrapper.active-page .artboard");if(!e)return;const n=this.topRuler.getBoundingClientRect(),o=this.leftRuler.getBoundingClientRect(),i=e.getBoundingClientRect(),s=g.zoomLevel;this.drawHorizontal(n,i,s),this.drawVertical(o,i,s)}drawHorizontal(e,n,o){const i=this.topCtx,s=i.canvas,r=window.devicePixelRatio||1;(s.width!==e.width*r||s.height!==e.height*r)&&(s.width=e.width*r,s.height=e.height*r,i.scale(r,r),s.style.width=e.width+"px",s.style.height=e.height+"px"),i.clearRect(0,0,e.width,e.height);const a=n.left-e.left;if(this.indicators){const d=a+this.indicators.x*o,u=(this.indicators.w||0)*o;i.fillStyle="hsla(var(--accent-h), 85%, 65%, 0.15)",i.fillRect(d,0,u,e.height),i.fillStyle="var(--accent)",i.fillRect(d,e.height-2,u,2)}i.strokeStyle="#4b5563",i.fillStyle="#9ca3af",i.font='9px "JetBrains Mono", monospace',i.lineWidth=1;const l=Math.floor(-a/o/10)*10,c=Math.ceil((e.width-a)/o/10)*10;for(let d=l;d<=c;d+=10){const u=a+d*o;if(u<0||u>e.width)continue;const h=d%100===0,p=d%50===0,f=h?12:p?8:4;i.beginPath(),i.moveTo(u,e.height),i.lineTo(u,e.height-f),i.stroke(),h&&i.fillText(d.toString(),u+2,10)}}drawVertical(e,n,o){const i=this.leftCtx,s=i.canvas,r=window.devicePixelRatio||1;(s.width!==e.width*r||s.height!==e.height*r)&&(s.width=e.width*r,s.height=e.height*r,i.scale(r,r),s.style.width=e.width+"px",s.style.height=e.height+"px"),i.clearRect(0,0,e.width,e.height);const a=n.top-e.top;if(this.indicators){const d=a+this.indicators.y*o,u=(this.indicators.h||0)*o;i.fillStyle="hsla(var(--accent-h), 85%, 65%, 0.15)",i.fillRect(0,d,e.width,u),i.fillStyle="var(--accent)",i.fillRect(e.width-2,d,2,u)}i.strokeStyle="#4b5563",i.fillStyle="#9ca3af",i.font='9px "JetBrains Mono", monospace',i.lineWidth=1;const l=Math.floor(-a/o/10)*10,c=Math.ceil((e.height-a)/o/10)*10;for(let d=l;d<=c;d+=10){const u=a+d*o;if(u<0||u>e.height)continue;const h=d%100===0,p=d%50===0,f=h?12:p?8:4;i.beginPath(),i.moveTo(e.width,u),i.lineTo(e.width-f,u),i.stroke(),h&&(i.save(),i.translate(10,u+2),i.rotate(-Math.PI/2),i.fillText(d.toString(),0,0),i.restore())}}}function Qa(t){t.viewport&&(t.viewport.addEventListener("dragenter",e=>{t.dragState||(t.isExternalDragging=!0)}),t.viewport.addEventListener("dragover",e=>{e.preventDefault(),e.dataTransfer.dropEffect="copy",t.dragState||(t.isExternalDragging=!0);const n=e.target.closest(".artboard-wrapper");document.querySelectorAll(".artboard-wrapper.drag-over").forEach(i=>{i!==n&&i.classList.remove("drag-over")}),n&&n.classList.add("drag-over");const o=e.target.closest(".add-page-placeholder");if(o)o.classList.add("drag-over");else{const i=document.querySelector(".add-page-placeholder.drag-over");i&&i.classList.remove("drag-over")}}),t.viewport.addEventListener("dragleave",e=>{(e.relatedTarget===null||!t.viewport.contains(e.relatedTarget))&&(t.isExternalDragging=!1,document.querySelectorAll(".artboard-wrapper.drag-over, .add-page-placeholder.drag-over").forEach(n=>{n.classList.remove("drag-over")}))}),t.viewport.addEventListener("drop",async e=>{e.preventDefault(),e.stopPropagation(),t.isExternalDragging=!1,document.querySelectorAll(".artboard-wrapper.drag-over, .add-page-placeholder.drag-over").forEach(d=>{d.classList.remove("drag-over")});const n=e.dataTransfer.getData("application/widget-type")||e.dataTransfer.getData("text/plain");if(!n)return;const o=e.clientX,i=e.clientY;let s=e.target;s===t.viewport&&(s=document.elementFromPoint(o,i));const r=s?.closest(".artboard-wrapper"),a=s?.closest(".add-page-placeholder");let l=-1,c=null;if(r){l=parseInt(r.dataset.index,10);const d=r.querySelector(".artboard");d&&(c=d.getBoundingClientRect())}else if(a)l=g.pages.length;else{l=g.currentPageIndex;const d=t.canvas.querySelector(`.artboard[data-index="${l}"]`);d&&(c=d.getBoundingClientRect())}v.log("[Canvas] Atomic drop capture - type:",n,"page:",l);try{const d=U.load(n);if(a){if(!g.addPage())return;l=g.pages.length-1,await new Promise(m=>setTimeout(m,50));const y=t.canvas.querySelector(`.artboard[data-index="${l}"]`);y&&(c=y.getBoundingClientRect())}await d;const u=Qe.createWidget(n);if(!u){v.error("[Canvas] WidgetFactory.createWidget returned null for type:",n);return}const h=g.zoomLevel,p=g.getCanvasDimensions();if(c){const f=(o-c.left)/h,y=(i-c.top)/h;u.x=Math.round(f-u.width/2),u.y=Math.round(y-u.height/2)}else v.warn("[Canvas] No targetRect, using fallback position"),u.x=40,u.y=40;u.x=Math.max(0,Math.min(p.width-u.width,u.x)),u.y=Math.max(0,Math.min(p.height-u.height,u.y)),t.suppressNextFocus=!0,g.addWidget(u,l),g.currentPageIndex!==l&&g.setCurrentPageIndex(l),g.selectWidget(u.id,!1),v.log(`[Canvas] Successfully added ${n} at (${u.x}, ${u.y})`)}catch(d){v.error("[Canvas] error creating widget from drop:",d)}}))}function el(t){t.viewport&&t.viewport.addEventListener("mousedown",e=>{if(e.button===1){e.preventDefault(),e.stopPropagation(),t.panState={startX:e.clientX,startY:e.clientY,startPanX:t.panX,startPanY:t.panY},t.viewport.style.cursor="grabbing",document.body.classList.add("panning-active");const n=i=>{if(t.panState){const s=i.clientX-t.panState.startX,r=i.clientY-t.panState.startY;t.panX=t.panState.startPanX+s,t.panY=t.panState.startPanY+r,he(t)}},o=()=>{t.panState=null,t.viewport.style.cursor="auto",document.body.classList.remove("panning-active"),window.removeEventListener("mousemove",n),window.removeEventListener("mouseup",o)};window.addEventListener("mousemove",n),window.addEventListener("mouseup",o)}})}function tl(t){const e=document.getElementById("zoomInBtn"),n=document.getElementById("zoomOutBtn"),o=document.getElementById("zoomResetBtn"),i=document.getElementById("gridToggleBtn"),s=document.getElementById("debugGridToggleBtn"),r=document.getElementById("rulersToggleBtn"),a=document.getElementById("editorGridOpacity");e&&e.addEventListener("click",()=>Wt(t)),n&&n.addEventListener("click",()=>$t(t)),o&&o.addEventListener("click",()=>rt(t)),i&&(i.classList.toggle("active",!!g.showGrid),i.addEventListener("click",()=>{const l=!g.showGrid;g.setShowGrid(l),l&&(g.setShowDebugGrid(!1),s&&s.classList.remove("active")),i.classList.toggle("active",l),L(C.STATE_CHANGED)})),s&&(s.classList.toggle("active",!!g.showDebugGrid),s.addEventListener("click",()=>{const l=!g.showDebugGrid;g.setShowDebugGrid(l),l&&(g.setShowGrid(!1),i&&i.classList.remove("active")),s.classList.toggle("active",l),L(C.STATE_CHANGED)})),r&&(r.classList.toggle("active",!!g.showRulers),r.addEventListener("click",()=>{const l=!g.showRulers;g.setShowRulers(l),r.classList.toggle("active",l),v.log(`[Canvas] Rulers toggled: ${l}`)})),a&&a.addEventListener("input",l=>{g.updateSettings({grid_opacity:parseInt(l.target.value,10)})}),t.canvasContainer&&t.canvasContainer.addEventListener("wheel",l=>{l.preventDefault(),Un(l,t)},{passive:!1}),t.viewport&&t.viewport.addEventListener("wheel",l=>{l.preventDefault(),Un(l,t)},{passive:!1}),document.addEventListener("keydown",l=>{l.ctrlKey&&(l.key==="+"||l.key==="=")?(l.preventDefault(),Wt(t)):l.ctrlKey&&l.key==="-"?(l.preventDefault(),$t(t)):l.ctrlKey&&l.key==="0"||l.ctrlKey&&l.key.toLowerCase()==="r"?(l.preventDefault(),rt(t)):l.ctrlKey&&l.key.toLowerCase()==="g"&&(l.preventDefault(),l.shiftKey?g.ungroupSelection():g.groupSelection())})}function Un(t,e){const n=g.zoomLevel;let o=0;if(t.ctrlKey)o=t.deltaY>0?-.02:.02;else if(t.deltaMode===0&&t.deltaX===0&&Math.abs(t.deltaY)>=50)o=t.deltaY>0?-.05:.05;else{e.panX-=t.deltaX,e.panY-=t.deltaY,he(e);return}if(o===0)return;const i=Math.min(Math.max(n+o,.1),5);if(i===n)return;const s=e.viewport.getBoundingClientRect(),r=t.clientX-s.left,a=t.clientY-s.top,l=(r-e.panX)/n,c=(a-e.panY)/n;e.panX=r-l*i,e.panY=a-c*i,g.setZoomLevel(i),he(e)}function Wt(t){Po(.05,t)}function $t(t){Po(-.05,t)}function Po(t,e){const n=g.zoomLevel,o=Math.min(Math.max(n+t,.1),5);if(o!==n){if(e&&e.viewport){const i=e.viewport.getBoundingClientRect(),s=i.width/2,r=i.height/2,a=(s-e.panX)/n,l=(r-e.panY)/n;e.panX=s-a*o,e.panY=r-l*o}g.setZoomLevel(o),e&&he(e)}}function rt(t){g.setZoomLevel(1),t.focusPage(g.currentPageIndex,!0)}function me(){document.querySelectorAll(".snap-guide").forEach(e=>e.remove())}function Lo(t,e,n){const o=n||t.canvas;if(!o||typeof o.appendChild!="function")return;const i=document.createElement("div");i.className="snap-guide snap-guide-vertical",i.style.left=`${Math.round(e)}px`,o.appendChild(i)}function To(t,e,n){const o=n||t.canvas;if(!o||typeof o.appendChild!="function")return;const i=document.createElement("div");i.className="snap-guide snap-guide-horizontal",i.style.top=`${Math.round(e)}px`,o.appendChild(i)}function Ao(t,e){const n=g.getCurrentPage(),o=[],i=[];if(o.push(0,e.width/2,e.width),i.push(0,e.height/2,e.height),n&&Array.isArray(n.widgets))for(const s of n.widgets){if(!s||s.id===t)continue;const r=s.x,a=s.x+(s.width||0),l=s.y,c=s.y+(s.height||0),d=r+(s.width||0)/2,u=l+(s.height||0)/2;o.push(r,d,a),i.push(l,u,c)}return{vertical:o,horizontal:i}}function jn(t,e,n,o,i){const s=i||t.canvas;if(!s)return;const r=document.createElement("div");r.className=`snap-guide distance-marker distance-marker-${o}`;let a,l,c,d,u;if(o==="h"){const p=e.x<n.x?e.x+e.w:n.x+n.w,f=e.x<n.x?n.x:e.x;if(a=p,l=Math.min(e.y+e.h/2,n.y+n.h/2),c=f-p,c<=0)return;u=Math.round(c),r.style.left=`${a}px`,r.style.top=`${l}px`,r.style.width=`${c}px`,r.style.height="1px";const y=document.createElement("div");y.className="distance-marker-h-tick-start";const m=document.createElement("div");m.className="distance-marker-h-tick-end",r.appendChild(y),r.appendChild(m)}else{const p=e.y<n.y?e.y+e.h:n.y+n.h,f=e.y<n.y?n.y:e.y;if(l=p,a=Math.min(e.x+e.w/2,n.x+n.w/2),d=f-p,d<=0)return;u=Math.round(d),r.style.left=`${a}px`,r.style.top=`${l}px`,r.style.width="1px",r.style.height=`${d}px`;const y=document.createElement("div");y.className="distance-marker-v-tick-start";const m=document.createElement("div");m.className="distance-marker-v-tick-end",r.appendChild(y),r.appendChild(m)}const h=document.createElement("div");h.className="distance-marker-label",h.textContent=u,r.appendChild(h),s.appendChild(r)}function mn(t,e,n,o,i,s,r,a=!1){if(!g.snapEnabled||i)return me(),{x:Math.round(n),y:Math.round(o)};const c=(g.getCurrentPage()?.widgets||[]).filter(w=>w.id!==e.id&&!w.hidden),d=Ao(e.id,s),u=e.width||0,h=e.height||0;let p=n,f=o,y=null,m=null;const _=[{val:n,apply:w=>p=w},{val:n+u/2,apply:w=>p=w-u/2},{val:n+u,apply:w=>p=w-u}];let b=be+1;for(const w of _)for(const I of d.vertical){const P=Math.abs(w.val-I);P<=be&&P<b&&(b=P,y=I,w.apply(I))}const x=[{val:o,apply:w=>f=w},{val:o+h/2,apply:w=>f=w-h/2},{val:o+h,apply:w=>f=w-h}];let S=be+1;for(const w of x)for(const I of d.horizontal){const P=Math.abs(w.val-I);P<=be&&P<S&&(S=P,m=I,w.apply(I))}const E={x:p,y:f,w:u,h};return me(),y!=null&&Lo(t,y,r),m!=null&&To(t,m,r),a&&c.forEach(w=>{const I={x:w.x,y:w.y,w:w.width,h:w.height};if(E.y<I.y+I.h&&E.y+E.h>I.y){const R=E.x<I.x?I.x-(E.x+E.w):E.x-(I.x+I.w);R>0&&R<150&&jn(t,E,I,"h",r)}if(E.x<I.x+I.w&&E.x+E.w>I.x){const R=E.y<I.y?I.y-(E.y+E.h):E.y-(I.y+I.h);R>0&&R<150&&jn(t,E,I,"v",r)}}),{x:Math.round(p),y:Math.round(f)}}function yn(t,e,n,o,i,s){const r=i.match(/^(\d+)x(\d+)$/);if(!r)return{x:t,y:e};const a=parseInt(r[1],10),l=parseInt(r[2],10),c=s.width/l,d=s.height/a,u=t+n/2,h=e+o/2,p=Math.round(u/c-.5),f=Math.round(h/d-.5),y=Math.max(0,Math.min(l-1,p)),m=Math.max(0,Math.min(a-1,f));return{x:Math.round(y*c),y:Math.round(m*d)}}function Mo(t){const e=g.getCurrentPage();if(!e||!e.layout)return;const n=e.layout.match(/^(\d+)x(\d+)$/);if(!n)return;const o=g.getWidgetById(t);if(!o)return;const i=parseInt(n[1],10),s=parseInt(n[2],10),r=g.getCanvasDimensions(),a=r.width/s,l=r.height/i,c=o.x+o.width/2,d=o.y+o.height/2,u=Math.floor(c/a),h=Math.floor(d/l),p=Math.max(0,Math.min(i-1,h)),f=Math.max(0,Math.min(s-1,u)),y={...o.props,grid_cell_row_pos:p,grid_cell_column_pos:f},m=Math.max(1,Math.round(o.height/l)),_=Math.max(1,Math.round(o.width/a));y.grid_cell_row_span=m,y.grid_cell_column_span=_,g.updateWidget(t,{props:y})}function nl(t){const e=g.getWidgetById(t);if(!e)return;const n=g.getCanvasDimensions(),o=g.getCurrentPage();let i;if(o?.layout)i=yn(e.x,e.y,e.width,e.height,o.layout,n);else{const s=g.snapEnabled;g.setSnapEnabled(!0),i=mn({canvas:{querySelectorAll:()=>[]}},e,e.x,e.y,!1,n),g.setSnapEnabled(s)}i&&(g.updateWidget(t,{x:i.x,y:i.y}),Mo(t),g.recordHistory())}function nt(t,e,n,o,i,s){if(!g.snapEnabled||o)return t;const r=Ao(n,i),a=e==="v"?r.vertical:r.horizontal;let l=be+1,c=t,d=null;for(const u of a){const h=Math.abs(t-u);h<=be&&h<l&&(l=h,c=u,d=u)}return d!==null&&(e==="v"?Lo({canvas:s},d,s):To({canvas:s},d,s)),c}let Lt=0,Tt=null,Yn=0,Vn=null;function il(t,e,n,o,i,s){zt(t);const r=document.createElement("div");r.className="drag-ghost-container",r.style.cssText=`
        position: fixed;
        pointer-events: none;
        z-index: 99999;
        opacity: 1.0; 
        transform-origin: top left;
        transform: scale(${i});
        transition: none;
    `;const a=t.dragState?.id,l=s.find(p=>p.id===a)||s[0],c=e.find(p=>p.id===l?.id)||e[0],d=document.querySelector(`.widget[data-id="${c.id}"]`);if(!c||!d)return;const u=[],h=g.getCurrentPage();e.forEach(p=>{if(u.push(p),p.type==="group"){const f=h.widgets.filter(y=>y.parentId===p.id);u.push(...f)}}),u.forEach(p=>{const f=document.querySelector(`.widget[data-id="${p.id}"]`);if(f){const y=f.closest(".artboard"),m=document.createElement("div");m.className=(y?y.className:"artboard")+" ghost-context-sim",m.style.cssText=`
                position: absolute;
                left: ${p.x-c.x}px;
                top: ${p.y-c.y}px;
                width: ${p.width}px;
                height: ${p.height}px;
                pointer-events: none;
                background: transparent !important;
                box-shadow: none !important;
                border: none !important;
                transform: none !important;
                overflow: visible;
                display: block;
            `;const _=document.createElement("div");for(const x of f.attributes)_.setAttribute(x.name,x.value);_.classList.remove("active","dragging-source","locked"),_.classList.add("drag-ghost-widget");const b=window.getComputedStyle(f);_.style.cssText=f.style.cssText,_.style.position="absolute",_.style.top="0",_.style.left="0",_.style.margin="0",_.style.transform="none",_.style.setProperty("background",b.background,"important"),_.style.setProperty("background-color",b.backgroundColor,"important"),_.style.setProperty("border",b.border,"important"),_.style.setProperty("border-radius",b.borderRadius,"important"),_.innerHTML=f.innerHTML,m.appendChild(_),r.appendChild(m)}}),l&&(t.dragGhostOffset={x:l.clickOffsetX*i,y:l.clickOffsetY*i}),document.body.appendChild(r),t.dragGhostEl=r,ol(t,n,o),e.forEach(p=>{const f=document.querySelector(`.widget[data-id="${p.id}"]`);f&&f.classList.add("dragging-source")})}function ol(t,e,n){if(!t.dragGhostEl||!t.dragGhostOffset)return;const o=t.dragGhostOffset,i=e-o.x,s=n-o.y;t.dragGhostEl.style.left=i+"px",t.dragGhostEl.style.top=s+"px"}function sl(t,e,n){t.dragGhostEl&&(t.dragGhostEl.style.left=e+"px",t.dragGhostEl.style.top=n+"px")}function zt(t){t.dragGhostEl&&(t.dragGhostEl.remove(),t.dragGhostEl=null,t.dragGhostOffset=null),document.querySelectorAll(".widget.dragging-source").forEach(e=>{e.classList.remove("dragging-source")})}function rl(t,e,n,o){const i=t.canvas.querySelector(`.artboard-wrapper[data-index="${e}"]`);if(!i)return;const s=i.querySelector(".artboard-header");if(!s)return;const r=s.cloneNode(!0);r.classList.add("page-drag-ghost");const a=s.getBoundingClientRect(),l=n-a.left,c=o-a.top;r.style.cssText=`
        position: fixed;
        left: ${n}px;
        top: ${o}px;
        width: ${a.width}px;
        pointer-events: none;
        z-index: 100000;
        opacity: 0.9;
        box-shadow: 0 12px 40px rgba(0,0,0,0.5);
        border: 2px solid var(--accent);
        border-radius: 10px;
        background: var(--bg-surface);
        transform: translate(-${l}px, -${c}px) scale(1.05);
        transition: none;
    `,document.body.appendChild(r),t.pageDragGhost=r,t.pageDragOffset={x:l,y:c},i.classList.add("reordering")}function al(t,e,n){t.pageDragGhost&&(t.pageDragGhost.style.left=e+"px",t.pageDragGhost.style.top=n+"px")}function ll(t,e){t.pageDragGhost&&(t.pageDragGhost.remove(),t.pageDragGhost=null);const n=t.canvas.querySelector(`.artboard-wrapper[data-index="${e}"]`);n&&n.classList.remove("reordering")}function dl(t,e){const n=g.getWidgetById(e);if(!n)return;const o=(n.type||"").toLowerCase();if(o!=="text"&&o!=="label")return;const i=t.canvas.querySelector(`.widget[data-id="${e}"]`);if(!i)return;const s=g.zoomLevel,r=i.getBoundingClientRect(),a=document.createElement("textarea");a.value=n.props.text||n.title||"",a.style.position="absolute",a.style.left=r.left+window.scrollX+"px",a.style.top=r.top+window.scrollY+"px",a.style.width=Math.max(50,r.width)+"px",a.style.height=Math.max(30,r.height)+"px",a.style.zIndex="99999";const l=n.props||{},c=(l.font_size||20)*s;a.style.fontSize=c+"px",a.style.fontFamily=(l.font_family||"Roboto")+", sans-serif",a.style.fontWeight=l.font_weight||400,a.style.fontStyle=l.italic?"italic":"normal",a.style.textAlign=(l.text_align||"LEFT").split("_").pop().toLowerCase(),a.style.color=l.color||"black",a.style.background="rgba(255, 255, 255, 0.9)",a.style.border="1px solid #1a73e8",a.style.padding="0px",a.style.resize="both",a.style.outline="none",a.style.overflow="hidden",a.style.lineHeight="1.2",document.body.appendChild(a),a.focus(),a.select();const d=()=>{if(!a.isConnected&&!a.parentElement)return;a.removeEventListener("blur",u),a.removeEventListener("keydown",h);const p=a.value;p!==(n.props.text||n.title)&&g.updateWidget(e,{props:{...n.props,text:p}}),a.remove()},u=()=>d(),h=p=>{p.key==="Enter"&&!p.shiftKey&&(p.preventDefault(),d()),p.key==="Escape"&&a.remove(),a.style.height=a.scrollHeight+"px"};a.addEventListener("blur",u),a.addEventListener("keydown",h)}function cl(t){t.canvas.addEventListener("mousedown",n=>{if(n.button!==0)return;me();const o=n.target.closest(".artboard-wrapper");if(!o||n.target.closest(".artboard-btn")||n.target.closest("button")){document.activeElement&&!n.target.closest("button")&&document.activeElement.blur(),!n.target.closest("button")&&!n.target.closest(".artboard-btn")&&(g.selectWidgets([]),xe(t));return}const i=parseInt(o.dataset.index,10),s=o.querySelector(".artboard");let r=s;const a=n.target.closest(".widget");let l=a?.dataset.id;const c=g.currentPageIndex!==i,d=!!n.target.closest(".artboard-header");if(n.target.closest(".artboard"),c){const p=[...g.selectedWidgetIds];g.setCurrentPageIndex(i,{suppressFocus:!0}),l&&g.selectWidgets(p.includes(l)?p:[l]);const f=t.canvas.querySelector(`.artboard[data-index="${i}"]`);f&&(r=f)}else if(d){t.dragState={mode:"reorder-page",pageIndex:i,startX:n.clientX,startY:n.clientY},rl(t,i,n.clientX,n.clientY),window.addEventListener("mousemove",t._boundMouseMove),window.addEventListener("mouseup",t._boundMouseUp),n.preventDefault();return}const u=r.getBoundingClientRect(),h=g.zoomLevel;if(a){const p=a.dataset.id,f=n.shiftKey||n.ctrlKey,y=Date.now();if(p===Tt&&y-Lt<300){dl(t,p),Lt=0,Tt=null,n.preventDefault(),n.stopPropagation();return}Lt=y,Tt=p,f?g.selectWidget(p,!0):g.selectedWidgetIds.includes(p)||g.selectWidget(p,!1);const m=g.getWidgetById(p);if(!m)return;let _=m,b=p;if(m.parentId){const S=g.getWidgetById(m.parentId);S&&(_=S,b=S.id,g.selectWidget(b,f))}if(n.target.classList.contains("widget-resize-handle")){if(m.parentId||_.locked)return;t.dragState={mode:"resize",handle:n.target.dataset.handle||"br",id:b,startX:n.clientX,startY:n.clientY,startW:_.width,startH:_.height,startWidgetX:_.x,startWidgetY:_.y,artboardEl:r,dragStartPanX:t.panX,dragStartPanY:t.panY}}else{if(_.locked)return;const S=g.getSelectedWidgets(),E=S.map(w=>{const I=t.canvas.querySelector(`.widget[data-id="${w.id}"]`);return I&&I.getBoundingClientRect(),u.left+w.x*h,u.top+w.y*h,{id:w.id,startX:w.x,startY:w.y,clickOffsetX:(n.clientX-u.left)/h-w.x,clickOffsetY:(n.clientY-u.top)/h-w.y}});t.dragState={mode:"move",id:b,widgets:E,artboardEl:r,dragStartX:n.clientX,dragStartY:n.clientY,dragStartPanX:t.panX,dragStartPanY:t.panY},il(t,S,n.clientX,n.clientY,h,E),t.rulers&&t.rulers.setIndicators({x:_.x,y:_.y,w:_.width,h:_.height})}window.addEventListener("mousemove",t._boundMouseMove),window.addEventListener("mouseup",t._boundMouseUp),n.preventDefault()}else{const p=(n.clientX-u.left)/h,f=(n.clientY-u.top)/h,y=Date.now(),m=i===Vn&&y-Yn<300;Yn=y,Vn=i,t.lassoState={startTime:y,isDoubleClick:m,focusParams:m||c&&!l?{index:i,fitZoom:m}:null,startX:p,startY:f,rect:null,isAdditive:n.shiftKey||n.ctrlKey,initialSelection:[...g.selectedWidgetIds],artboardEl:r},t.lassoEl=document.createElement("div"),t.lassoEl.className="lasso-selection",s.appendChild(t.lassoEl),window.addEventListener("mousemove",t._boundMouseMove),window.addEventListener("mouseup",t._boundMouseUp),n.preventDefault()}}),t.canvas.addEventListener("contextmenu",n=>{if(t.pinchState||t.touchState?.hasMoved||t.dragState?.mode==="resize"||t.lassoState?.rect){n.preventDefault();return}n.preventDefault();const o=n.target.closest(".widget"),i=o?o.dataset.id:null;window.RadialMenu&&window.RadialMenu.show(n.clientX,n.clientY,i)});let e=document.querySelector(".debug-cursor-tooltip");e||(e=document.createElement("div"),e.className="debug-cursor-tooltip",document.body.appendChild(e)),t.canvas.addEventListener("mousemove",n=>{if(!g.showDebugGrid){e.style.display="none";return}const o=n.target.closest(".artboard");if(!o){e.style.display="none";return}const i=o.getBoundingClientRect(),s=g.zoomLevel,r=Math.round((n.clientX-i.left)/s),a=Math.round((n.clientY-i.top)/s);e.style.display="block",e.style.left=n.clientX+"px",e.style.top=n.clientY+"px",e.innerHTML=`<span>X:</span>${r} <span>Y:</span>${a}`}),t.canvas.addEventListener("mouseleave",()=>{e.style.display="none"})}function pl(t,e){const n=g.zoomLevel,o=g.getCanvasDimensions();if(e.dragState){if(e.dragState.mode==="move"){const i=document.querySelector(`.artboard[data-index="${g.currentPageIndex}"]`);if(!i)return;const s=(t.clientX-e.dragState.dragStartX)/n+(e.dragState.dragStartPanX-e.panX)/n,r=(t.clientY-e.dragState.dragStartY)/n+(e.dragState.dragStartPanY-e.panY)/n,a=g.getWidgetById(e.dragState.id);if(!a)return;const l=e.dragState.widgets.find(x=>x.id===e.dragState.id);if(!l)return;let c=l.startX+s,d=l.startY+r;const u=g.getCurrentPage();if(u?.layout&&!t.altKey){me();const x=yn(c,d,a.width,a.height,u.layout,o);c=x.x,d=x.y}else if(g.snapEnabled&&!t.altKey){const x=mn(e,a,c,d,t.altKey,o,i,t.ctrlKey);c=x.x,d=x.y}else me();const h=i.getBoundingClientRect(),p=h.left+c*n,f=h.top+d*n;sl(e,p,f);const y=c-l.startX,m=d-l.startY,_=y,b=m;for(const x of e.dragState.widgets){const S=g.getWidgetById(x.id);S&&!S.locked&&(S.x=x.startX+_,S.y=x.startY+b,S.type==="group"&&u.widgets.filter(w=>w.parentId===S.id).forEach(w=>{e.dragState.widgets.find(I=>I.id===w.id)||(w.x+=_-(e.dragState.lastDx||0),w.y+=b-(e.dragState.lastDy||0))}))}e.dragState.lastDx=_,e.dragState.lastDy=b,e.rulers&&e.rulers.setIndicators({x:c,y:d,w:a.width,h:a.height})}else if(e.dragState.mode==="resize"){const i=g.getWidgetById(e.dragState.id);if(!i)return;me();const s=e.dragState,r=s.handle,a=(s.dragStartPanX-e.panX)/n,l=(s.dragStartPanY-e.panY)/n,c=(t.clientX-s.startX)/n+a,d=(t.clientY-s.startY)/n+l;let u=s.startWidgetX,h=s.startWidgetY,p=s.startW,f=s.startH;if(r.includes("l")){const _=s.startWidgetX+c;u=nt(_,"v",i.id,t.altKey,o,s.artboardEl),p=s.startWidgetX+s.startW-u}else if(r.includes("r")){const _=s.startWidgetX+s.startW+c;p=nt(_,"v",i.id,t.altKey,o,s.artboardEl)-s.startWidgetX}if(r.includes("t")){const _=s.startWidgetY+d;h=nt(_,"h",i.id,t.altKey,o,s.artboardEl),f=s.startWidgetY+s.startH-h}else if(r.includes("b")){const _=s.startWidgetY+s.startH+d;f=nt(_,"h",i.id,t.altKey,o,s.artboardEl)-s.startWidgetY}const y=4;isNaN(p)&&(p=s.startW),isNaN(f)&&(f=s.startH),p<y&&(r.includes("l")&&(u=s.startWidgetX+s.startW-y),p=y),f<y&&(r.includes("t")&&(h=s.startWidgetY+s.startH-y),f=y);const m=(i.type||"").toLowerCase();if(m==="line"||m==="lvgl_line"){const _=i.props||{},b=_.orientation||"horizontal",x=parseInt(_.stroke_width||_.line_width||3,10);b==="vertical"?(p=x,f=Math.max(10,f)):(f=x,p=Math.max(10,p))}if(u=Math.max(0,Math.min(o.width-p,u)),h=Math.max(0,Math.min(o.height-f,h)),i.x=Math.round(u),i.y=Math.round(h),i.width=Math.round(p),i.height=Math.round(f),m==="icon"||m==="weather_icon"||m==="battery_icon"||m==="wifi_signal"||m==="ondevice_temperature"||m==="ondevice_humidity"){const _=i.props||{};if(_.fit_icon_to_frame){const x=Math.max(8,Math.min(i.width-8,i.height-8));_.size=Math.round(x)}else{const b=Math.max(8,Math.min(i.width,i.height));_.size=Math.round(b)}}else if(m==="shape_circle"){const _=Math.max(i.width,i.height);i.width=_,i.height=_}ko(e,i),e.rulers&&e.rulers.setIndicators({x:i.x,y:i.y,w:i.width,h:i.height})}else if(e.dragState.mode==="reorder-page"){al(e,t.clientX,t.clientY),document.querySelectorAll(".artboard-wrapper").forEach(r=>r.classList.remove("drag-over"));const s=document.elementFromPoint(t.clientX,t.clientY)?.closest(".artboard-wrapper");s&&parseInt(s.dataset.index,10)!==e.dragState.pageIndex&&s.classList.add("drag-over")}}else if(e.lassoState){const i=e.lassoState.artboardEl;if(!i)return;const s=i.getBoundingClientRect(),r=(t.clientX-s.left)/n,a=(t.clientY-s.top)/n,l=Math.min(e.lassoState.startX,r),c=Math.min(e.lassoState.startY,a),d=Math.abs(r-e.lassoState.startX),u=Math.abs(a-e.lassoState.startY);e.lassoState.rect={x:l,y:c,w:d,h:u},e.lassoEl&&(e.lassoEl.style.left=l+"px",e.lassoEl.style.top=c+"px",e.lassoEl.style.width=d+"px",e.lassoEl.style.height=u+"px");const h=g.getCurrentPage();if(h){const p=new Set(e.lassoState.isAdditive?e.lassoState.initialSelection:[]);e.lassoState.currentSelection=[];const f={x1:l,y1:c,x2:l+d,y2:c+u};for(const y of h.widgets){const m={x1:y.x,y1:y.y,x2:y.x+y.width,y2:y.y+y.height},_=!(m.x2<f.x1||m.x1>f.x2||m.y2<f.y1||m.y1>f.y2),b=e.canvas.querySelector(`.widget[data-id="${y.id}"]`);b&&(_?(b.classList.add("active"),p.add(y.id)):e.lassoState.isAdditive&&e.lassoState.initialSelection.includes(y.id)?b.classList.add("active"):b.classList.remove("active"))}e.lassoState.currentSelection=Array.from(p),g.selectWidgets(e.lassoState.currentSelection)}t.preventDefault(),t.stopPropagation()}}function ul(t,e){if(e.dragState){const n=e.dragState.id,o=e.dragState.mode;if(o==="move"){const r=e.canvas.querySelector(`.widget[data-id="${n}"]`),a=r?r.style.pointerEvents:"";r&&(r.style.pointerEvents="none");const l=document.elementFromPoint(t.clientX,t.clientY);r&&(r.style.pointerEvents=a);const c=l?.closest(".artboard"),d=l?.closest(".add-page-placeholder"),u=g.currentPageIndex;let h=-1;if(c)h=parseInt(c.dataset.index,10);else if(d){e.suppressNextFocus=!0;const p=g.pages.length;g.addPage(p)&&(h=p,v.log(`[Canvas] Created new page ${h} at index ${h}. Source was ${u}`))}else{const p=l?.closest("#pageList .item");if(p){const f=document.getElementById("pageList");h=Array.from(f.querySelectorAll(".item")).indexOf(p)}}if(h!==-1&&h!==u){const p=e.dragState.widgets;d&&xe(e);let f=e.canvas.querySelector(`.artboard[data-index="${h}"]`),y=0;window.removeEventListener("mousemove",e._boundMouseMove),window.removeEventListener("mouseup",e._boundMouseUp),zt(e),e.dragState=null,me();let m=null;const _=g.zoomLevel;f&&(m=f.getBoundingClientRect());const b=new Set(p.map(S=>S.id));if(p.filter(S=>{const E=g.getWidgetById(S.id);return!E.parentId||!b.has(E.parentId)}).forEach(S=>{let E=S.startX,w=S.startY;if(m){const I=g.getWidgetById(S.id),P=g.getCanvasDimensions();E=Math.round((t.clientX-m.left)/_-S.clickOffsetX),w=Math.round((t.clientY-m.top)/_-S.clickOffsetY);const D=I?.width||50,R=I?.height||50;E=Math.max(0,Math.min(P.width-D,E)),w=Math.max(0,Math.min(P.height-R,w))}else d&&(E=40,w=40);g.moveWidgetToPage(S.id,h,E,w)&&y++}),y>0){v.log(`[Canvas] Successfully moved ${y} widgets to page ${h}`),g.setCurrentPageIndex(h,{suppressFocus:!0}),xe(e);return}}}else if(o==="reorder-page"){const r=e.dragState.pageIndex,l=document.elementFromPoint(t.clientX,t.clientY)?.closest(".artboard-wrapper");if(ll(e,r),document.querySelectorAll(".artboard-wrapper").forEach(c=>c.classList.remove("drag-over")),l){const c=parseInt(l.dataset.index,10);c!==r&&g.reorderPage(r,c)}}window.removeEventListener("mousemove",e._boundMouseMove),window.removeEventListener("mouseup",e._boundMouseUp),zt(e);const i=g.getCanvasDimensions();(e.dragState?.widgets||[]).forEach(r=>{const a=g.getWidgetById(r.id);a&&!a.locked&&(a.x=Math.max(0,Math.min(i.width-a.width,a.x)),a.y=Math.max(0,Math.min(i.height-a.height,a.y)))}),e.dragState=null,e.rulers&&e.rulers.setIndicators(null),me(),Mo(n),g.recordHistory(),L(C.STATE_CHANGED),xe(e)}else if(e.lassoState){if(window.removeEventListener("mousemove",e._boundMouseMove),window.removeEventListener("mouseup",e._boundMouseUp),e.lassoEl&&(e.lassoEl.remove(),e.lassoEl=null),Date.now()-e.lassoState.startTime,!!e.lassoState.rect){const o=e.lassoState.currentSelection||[];g.selectWidgets(o)}else if(e.lassoState.isAdditive||g.selectWidgets([]),e.lassoState.focusParams){const{index:o,fitZoom:i}=e.lassoState.focusParams;i&&xt(e,g.currentPageIndex,!0,!0)}e.lassoState=null,xe(e),t.preventDefault(),t.stopPropagation()}}function hl(t){!t.canvas||!t.canvasContainer||(t._boundTouchMove=e=>gl(e,t),t._boundTouchEnd=e=>fl(e,t),t.canvas.addEventListener("touchstart",e=>{const n=e.touches,o=t.viewport.getBoundingClientRect();if(document.body.classList.add("interaction-active"),e.stopImmediatePropagation(),n.length===2){e.preventDefault();const i=(n[0].clientX+n[1].clientX)/2,s=(n[0].clientY+n[1].clientY)/2;t.pinchState={startDistance:Do(n[0],n[1]),startZoom:g.zoomLevel,startPanX:t.panX,startPanY:t.panY,startCenterX:i-o.left,startCenterY:s-o.top},t.touchState=null,window.addEventListener("touchmove",t._boundTouchMove,{passive:!1}),window.addEventListener("touchend",t._boundTouchEnd),window.addEventListener("touchcancel",t._boundTouchEnd);return}if(n.length===1){const i=n[0],s=i.target.closest(".widget"),r=s?s.dataset.id:null;if(t.longPressTimer&&clearTimeout(t.longPressTimer),t.longPressTimer=setTimeout(()=>{window.RadialMenu&&window.RadialMenu.show(i.clientX,i.clientY,r),t.touchState=null},500),s){e.preventDefault();const a=g.getWidgetById(r);if(!a)return;i.target.classList.contains("widget-resize-handle")?t.touchState={mode:"resize",id:r,startX:i.clientX,startY:i.clientY,startW:a.width,startH:a.height,el:s}:t.touchState={mode:"move",id:r,startTouchX:i.clientX,startTouchY:i.clientY,startWidgetX:a.x,startWidgetY:a.y,hasMoved:!1,el:s}}else e.preventDefault(),t.touchState={mode:"pan",startTouchX:i.clientX,startTouchY:i.clientY,startX:i.clientX,startY:i.clientY,startPanX:t.panX,startPanY:t.panY};window.addEventListener("touchmove",t._boundTouchMove,{passive:!1}),window.addEventListener("touchend",t._boundTouchEnd),window.addEventListener("touchcancel",t._boundTouchEnd)}},{passive:!1}))}function gl(t,e){const n=t.touches,o=e.viewport.getBoundingClientRect();if(e.pinchState&&n.length===2){t.preventDefault();const s=Do(n[0],n[1])/e.pinchState.startDistance,r=Math.max(.1,Math.min(10,e.pinchState.startZoom*s)),a=(n[0].clientX+n[1].clientX)/2-o.left,l=(n[0].clientY+n[1].clientY)/2-o.top,c=(e.pinchState.startCenterX-e.pinchState.startPanX)/e.pinchState.startZoom,d=(e.pinchState.startCenterY-e.pinchState.startPanY)/e.pinchState.startZoom;e.panX=a-c*r,e.panY=l-d*r,g.setZoomLevel(r),he(e);return}if(n.length===1&&e.longPressTimer){const i=n[0],s=e.touchState,r=s?.startTouchX??s?.startX??i.clientX,a=s?.startTouchY??s?.startY??i.clientY;Math.hypot(i.clientX-r,i.clientY-a)>10&&(clearTimeout(e.longPressTimer),e.longPressTimer=null)}if(e.touchState&&n.length===1){t.preventDefault();const i=n[0];if(e.touchState.mode==="pan"){const s=i.clientX-e.touchState.startTouchX,r=i.clientY-e.touchState.startTouchY;e.panX=e.touchState.startPanX+s,e.panY=e.touchState.startPanY+r,he(e)}else if(e.touchState.mode==="move"){const s=i.clientX-e.touchState.startTouchX,r=i.clientY-e.touchState.startTouchY;if(!e.touchState.hasMoved&&Math.hypot(s,r)<5)return;e.touchState.hasMoved=!0;const a=g.getWidgetById(e.touchState.id);if(!a)return;const l=g.getCanvasDimensions(),c=g.zoomLevel;let d=e.touchState.startWidgetX+s/c,u=e.touchState.startWidgetY+r/c;d=Math.max(0,Math.min(l.width-a.width,d)),u=Math.max(0,Math.min(l.height-a.height,u)),a.x=d,a.y=u,e.touchState.el&&(e.touchState.el.style.left=d+"px",e.touchState.el.style.top=u+"px")}else if(e.touchState.mode==="resize"){e.touchState.hasMoved=!0;const s=g.getWidgetById(e.touchState.id);if(!s)return;const r=g.getCanvasDimensions(),a=g.zoomLevel;let l=e.touchState.startW+(i.clientX-e.touchState.startX)/a,c=e.touchState.startH+(i.clientY-e.touchState.startY)/a;const d=20;l=Math.max(d,Math.min(r.width-s.x,l)),c=Math.max(d,Math.min(r.height-s.y,c)),s.width=l,s.height=c,e.touchState.el&&(e.touchState.el.style.width=l+"px",e.touchState.el.style.height=c+"px")}}}function fl(t,e){const n=e.touchState,o=Date.now();if(n&&t.changedTouches.length>0){const i=t.changedTouches[0].clientX,s=t.changedTouches[0].clientY;if(!(Math.hypot(i-(n.startTouchX||n.startX),s-(n.startTouchY||n.startY))>10)){const a=t.target.closest(".widget"),l=a?a.dataset.id:null;l?l===e.lastWidgetTapId&&o-e.lastWidgetTapTime<350?(window.RadialMenu&&window.RadialMenu.show(i,s,l),e.lastWidgetTapTime=0):(e.lastWidgetTapId=l,e.lastWidgetTapTime=o,g.selectWidget(l)):o-e.lastCanvasTapTime<350?(g.setZoomLevel(1),xt(e,g.currentPageIndex,!0),e.lastCanvasTapTime=0):(e.lastCanvasTapTime=o,g.selectWidgets([]))}if(n.id&&n.hasMoved){const a=g.getWidgetById(n.id);if(a){if(n.mode==="move"){const l=g.getCanvasDimensions(),c=g.getCurrentPage();if(c?.layout){const d=yn(a.x,a.y,a.width,a.height,c.layout,l);a.x=d.x,a.y=d.y}else{const d=mn(e,a,a.x,a.y,!1,l);a.x=d.x,a.y=d.y}}ml(e,n.id),g.recordHistory(),L(C.STATE_CHANGED)}}}e.touchState=null,e.pinchState=null,e.longPressTimer&&(clearTimeout(e.longPressTimer),e.longPressTimer=null),window.removeEventListener("touchmove",e._boundTouchMove),window.removeEventListener("touchend",e._boundTouchEnd),window.removeEventListener("touchcancel",e._boundTouchEnd),document.body.classList.remove("interaction-active"),xe(e),me()}function Do(t,e){return Math.hypot(e.clientX-t.clientX,e.clientY-t.clientY)}function ml(t,e){const n=g.getCurrentPage();if(!n||!n.layout)return;const o=n.layout.match(/^(\d+)x(\d+)$/);if(!o)return;const i=g.getWidgetById(e);if(!i)return;const s=parseInt(o[1],10),r=parseInt(o[2],10),a=g.getCanvasDimensions(),l=a.width/r,c=a.height/s,d=i.x+i.width/2,u=i.y+i.height/2,h=Math.floor(d/l),p=Math.floor(u/c),f=Math.max(0,Math.min(s-1,p)),y=Math.max(0,Math.min(r-1,h)),m={...i.props,grid_cell_row_pos:f,grid_cell_column_pos:y,grid_cell_row_span:Math.max(1,Math.round(i.height/c)),grid_cell_column_span:Math.max(1,Math.round(i.width/l))};g.updateWidget(e,{props:m})}class yl{constructor(){this.canvas=document.getElementById("canvas"),this.canvasContainer=document.getElementById("canvasContainer"),this.viewport=document.querySelector(".canvas-viewport"),this.dragState=null,this.panX=0,this.panY=0,this.touchState=null,this.pinchState=null,this.lastTapTime=0,this.isExternalDragging=!1,this.suppressNextFocus=!1,this._boundMouseMove=e=>pl(e,this),this._boundMouseUp=e=>ul(e,this),this.rulers=new Za(this),this.init()}init(){Y(C.STATE_CHANGED,()=>this.render()),Y(C.PAGE_CHANGED,n=>{if(this.render(),this.suppressNextFocus){this.suppressNextFocus=!1,this._lastFocusedIndex=n.index;return}n.forceFocus&&this.focusPage(n.index,!0,!0),this._lastFocusedIndex=n.index}),Y(C.SELECTION_CHANGED,()=>this.updateSelectionVisuals()),Y(C.SETTINGS_CHANGED,()=>{this.render(),this.applyZoom(),this.rulers.update()}),Y(C.ZOOM_CHANGED,()=>{this.applyZoom(),this.rulers.update()});const e=document.getElementById("pagesHeader");e&&e.addEventListener("click",n=>{n.target.closest(".chevron")||this.zoomToFitAll()}),this._boundResize=()=>{g.currentPageIndex!==-1&&this.focusPage(g.currentPageIndex,!1,!0)},window.addEventListener("resize",this._boundResize),this.setupInteractions(),this.render(),this.applyZoom(),this.updateInterval&&clearInterval(this.updateInterval),this.updateInterval=setInterval(()=>{if(this.touchState||this.pinchState||this.dragState||this.panState||this.lassoState||this.isExternalDragging)return;const n=g.getCurrentPage();n&&n.widgets.some(o=>o.type==="datetime")&&this.render()},1e3)}render(){xe(this)}applyZoom(){he(this),this.rulers&&this.rulers.update()}updateSelectionVisuals(){const e=g.selectedWidgetIds;this.canvas.querySelectorAll(".widget").forEach(o=>{const i=o.dataset.id;e.includes(i)?o.classList.add("active"):o.classList.remove("active")}),fn(this)}setupInteractions(){el(this),cl(this),tl(this),Qa(this),hl(this);const e=document.getElementById("zoomToFitAllBtn");e&&(e.onclick=()=>this.zoomToFitAll())}zoomIn(){Wt(this)}zoomOut(){$t(this)}zoomReset(){rt(this)}zoomToFit(){g.currentPageIndex!==-1&&this.focusPage(g.currentPageIndex,!0,!0)}zoomToFitAll(e=!0){T(()=>Promise.resolve().then(()=>zn),[],import.meta.url).then(n=>n.zoomToFitAll(this,e))}focusPage(e,n=!0,o=!1){T(()=>Promise.resolve().then(()=>zn),void 0,import.meta.url).then(i=>i.focusPage(this,e,n,o))}destroy(){this.updateInterval&&(clearInterval(this.updateInterval),this.updateInterval=null),this._boundResize&&window.removeEventListener("resize",this._boundResize)}}const ge="__mixed__";function _l(t){const e={black:"#000000",white:"#FFFFFF",red:"#FF0000",green:"#00FF00",blue:"#0000FF",yellow:"#FFFF00",gray:"#808080",grey:"#808080"};return t?e[t.toLowerCase()]?e[t.toLowerCase()]:t.startsWith("0x")?"#"+t.substring(2):t.startsWith("#")?t:"#000000":"#000000"}function qn(t){const e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:{r:0,g:0,b:0}}function vl(t,e,n){const o=i=>{const s=Math.max(0,Math.min(255,i)).toString(16);return s.length===1?"0"+s:s};return"#"+o(t)+o(e)+o(n)}function bl(t,e,n){if(!z()){v.warn("Entity Picker: No HA backend detected.");return}const o=document.getElementById("propertiesPanel")||document.body,i=document.querySelector(".entity-picker-overlay");i&&i.remove();const s=document.createElement("div");s.className="entity-picker-overlay";const r=document.createElement("div");r.className="entity-picker-header",r.textContent="Pick Home Assistant entity";const a=document.createElement("button");a.className="btn btn-secondary",a.textContent="×",a.style.padding="0 4px",a.style.fontSize="9px",a.type="button",a.addEventListener("click",()=>{s.remove()});const l=document.createElement("div");l.style.display="flex",l.style.alignItems="center",l.style.gap="4px",l.appendChild(a);const c=document.createElement("div");c.style.display="flex",c.style.justifyContent="space-between",c.style.alignItems="center",c.style.gap="4px",c.appendChild(r),c.appendChild(l);const d=document.createElement("div");d.style.display="flex",d.style.gap="4px",d.style.alignItems="center";const u=document.createElement("input");u.type="text",u.className="prop-input",u.placeholder="Search name or entity_id",u.style.flex="1";const h=document.createElement("select");h.className="prop-input",h.style.width="80px",["all","sensor","binary_sensor","light","switch","fan","cover","climate","media_player","input_number","number","input_boolean","input_text","input_select","weather","scene","script","button","input_button"].forEach(y=>{const m=document.createElement("option");m.value=y,m.textContent=y,h.appendChild(m)}),d.appendChild(u),d.appendChild(h);const p=document.createElement("div");p.className="entity-picker-list",s.appendChild(c),s.appendChild(d),s.appendChild(p),o.appendChild(s);function f(y){if(p.innerHTML="",!y||y.length===0){const m=document.createElement("div");m.style.color="var(--muted)",m.style.fontSize="var(--fs-xs)",m.textContent="No entities match.",p.appendChild(m);return}y.forEach(m=>{const _=document.createElement("div");_.className="entity-picker-row";const b=document.createElement("div");b.className="entity-picker-name",b.textContent=m.name||m.entity_id;const x=document.createElement("div");x.className="entity-picker-meta",x.textContent=`${m.entity_id} · ${m.domain||m.entity_id.split(".")[0]}`,_.appendChild(b),_.appendChild(x),_.addEventListener("click",()=>{if(n&&n(m.entity_id),e&&(e.value=m.entity_id),t&&g){if(g.updateWidget(t.id,{entity_id:m.entity_id,title:m.name||m.entity_id||""}),t.type==="graph"&&m.attributes){const S=m.attributes,E={};if(S.unit_of_measurement==="%"&&(t.props.min_value||(E.min_value="0"),t.props.max_value||(E.max_value="100")),S.min!==void 0&&!t.props.min_value&&(E.min_value=String(S.min)),S.max!==void 0&&!t.props.max_value&&(E.max_value=String(S.max)),Object.keys(E).length>0){const w={...t.props,...E};g.updateWidget(t.id,{props:w})}}if(t.type==="sensor_text"){const S={...t.props};m.attributes&&m.attributes.unit_of_measurement?S.unit=m.attributes.unit_of_measurement:m.unit&&(S.unit=m.unit);const E=m.state;if(m.entity_id.startsWith("weather.")||m.entity_id.startsWith("text_sensor."))S.is_text_sensor=!0;else if(E!=null&&E!==""){const I=parseFloat(E);isNaN(I)?S.is_text_sensor=!0:S.is_text_sensor=!1}g.updateWidget(t.id,{props:S})}}s.remove()}),p.appendChild(_)})}Te().then(y=>{if(!y||y.length===0){f([]);return}function m(){const _=(u.value||"").toLowerCase(),b=h.value,x=y.filter(S=>{const E=S.domain||S.entity_id.split(".")[0];return b!=="all"&&E!==b?!1:_?`${S.entity_id} ${S.name||""}`.toLowerCase().includes(_):!0});f(x)}u.addEventListener("input",m),h.addEventListener("change",m),m()})}const Oo=[{code:"F0004",name:"account"},{code:"F0026",name:"alert"},{code:"F0028",name:"alert-circle"},{code:"F0045",name:"arrow-down"},{code:"F004D",name:"arrow-left"},{code:"F0054",name:"arrow-right"},{code:"F005D",name:"arrow-up"},{code:"F0079",name:"battery"},{code:"F007C",name:"battery-50"},{code:"F0084",name:"battery-charging"},{code:"F009A",name:"bell"},{code:"F00AF",name:"bluetooth"},{code:"F00D8",name:"brightness-5"},{code:"F00ED",name:"calendar"},{code:"F0100",name:"camera"},{code:"F012C",name:"check"},{code:"F05E0",name:"check-circle"},{code:"F0140",name:"chevron-down"},{code:"F0141",name:"chevron-left"},{code:"F0142",name:"chevron-right"},{code:"F0143",name:"chevron-up"},{code:"F0150",name:"clock"},{code:"F0156",name:"close"},{code:"F015F",name:"cloud"},{code:"F0493",name:"cog"},{code:"F01B4",name:"delete"},{code:"F01D9",name:"dots-vertical"},{code:"F01DA",name:"download"},{code:"F01EE",name:"email"},{code:"F0208",name:"eye"},{code:"F0209",name:"eye-off"},{code:"F0210",name:"fan"},{code:"F0214",name:"file"},{code:"F021E",name:"flash"},{code:"F024B",name:"folder"},{code:"F0279",name:"format-list-bulleted"},{code:"F02D1",name:"heart"},{code:"F02DC",name:"home"},{code:"F07D0",name:"home-assistant"},{code:"F02E9",name:"image"},{code:"F02FC",name:"information"},{code:"F0322",name:"layers"},{code:"F0335",name:"lightbulb"},{code:"F06E8",name:"lightbulb-on"},{code:"F033E",name:"lock"},{code:"F033F",name:"lock-open"},{code:"F0349",name:"magnify"},{code:"F034E",name:"map-marker"},{code:"F035C",name:"menu"},{code:"F036C",name:"microphone"},{code:"F0374",name:"minus"},{code:"F075A",name:"music"},{code:"F03EB",name:"pencil"},{code:"F040A",name:"play"},{code:"F0415",name:"plus"},{code:"F0425",name:"power"},{code:"F0450",name:"refresh"},{code:"F048A",name:"send"},{code:"F0497",name:"share-variant"},{code:"F0565",name:"shield-check"},{code:"F04CE",name:"star"},{code:"F04DB",name:"stop"},{code:"F050F",name:"thermometer"},{code:"F0513",name:"thumb-up"},{code:"F051B",name:"timer-outline"},{code:"F0A79",name:"trash-can"},{code:"F0552",name:"upload"},{code:"F0571",name:"video"},{code:"F057E",name:"volume-high"},{code:"F0581",name:"volume-off"},{code:"F0585",name:"water"},{code:"F05E3",name:"water-percent"},{code:"F0590",name:"weather-cloudy"},{code:"F0591",name:"weather-fog"},{code:"F0592",name:"weather-hail"},{code:"F0593",name:"weather-lightning"},{code:"F0594",name:"weather-night"},{code:"F0595",name:"weather-partly-cloudy"},{code:"F0596",name:"weather-pouring"},{code:"F0597",name:"weather-rainy"},{code:"F0598",name:"weather-snowy"},{code:"F0599",name:"weather-sunny"},{code:"F059D",name:"weather-windy"},{code:"F05A9",name:"wifi"},{code:"F05AD",name:"window-close"}];let Q=null,Pe=null,He=null,it=null,ve=null,Ne=null;function xl(){Q||(Q=document.getElementById("iconPickerModal"),Pe=document.getElementById("iconPickerFilter"),He=document.getElementById("iconPickerList"),it=document.getElementById("iconPickerClose"),Q||(Q=document.createElement("div"),Q.id="iconPickerModal",Q.className="modal-backdrop hidden",Q.style.zIndex="2000",Q.innerHTML=`
            <div class="modal" style="max-width: 500px; height: 80vh; display: flex; flex-direction: column;">
                <div class="modal-header">
                    <div>Select Icon</div>
                    <button id="iconPickerClose" class="btn btn-secondary">×</button>
                </div>
                <div class="modal-body" style="flex: 1; overflow: hidden; display: flex; flex-direction: column; padding: 15px;">
                    <input type="text" id="iconPickerFilter" class="prop-input" placeholder="Filter icons..." style="width: 100%; margin-bottom: 12px;">
                    <div id="iconPickerList" style="flex: 1; overflow-y: auto; border: 1px solid var(--border-subtle); border-radius: 4px; display: grid; grid-template-columns: repeat(auto-fill, minmax(60px, 1fr)); gap: 8px; padding: 10px; background: var(--bg-canvas);"></div>
                </div>
            </div>
        `,document.body.appendChild(Q),Pe=document.getElementById("iconPickerFilter"),He=document.getElementById("iconPickerList"),it=document.getElementById("iconPickerClose")),it&&(it.onclick=Ut),Pe&&(Pe.oninput=t=>{const e=t.target;wl(e.value)}),Q.onclick=t=>{t.target===Q&&Ut()})}function At(t,e){xl(),ve=t,Ne=e,Q.classList.remove("hidden"),Q.style.display="flex",Pe&&(Pe.value="",Pe.focus()),jt(Oo||[])}function Ut(){Q&&(Q.classList.add("hidden"),Q.style.display="none"),ve=null,Ne=null}function jt(t){if(!He)return;if(He.innerHTML="",!t||t.length===0){He.innerHTML='<div style="padding: 10px; color: var(--muted); grid-column: 1 / -1; text-align: center;">No icons found.</div>';return}const e=document.createDocumentFragment();t.forEach(n=>{const o=document.createElement("div");o.className="icon-item",o.style.padding="8px",o.style.border="1px solid var(--border-subtle)",o.style.borderRadius="4px",o.style.cursor="pointer",o.style.display="flex",o.style.flexDirection="column",o.style.alignItems="center",o.style.justifyContent="center",o.style.textAlign="center",o.style.background="var(--bg)",o.title=n.name;const i=document.createElement("div");i.className="mdi",i.style.fontSize="24px",i.style.color="var(--accent)";const s=parseInt(n.code,16);i.textContent=String.fromCodePoint(s);const r=document.createElement("div");r.style.fontSize="9px",r.style.marginTop="4px",r.style.overflow="hidden",r.style.textOverflow="ellipsis",r.style.whiteSpace="nowrap",r.style.width="100%",r.style.color="var(--muted)",r.textContent=n.name,o.appendChild(i),o.appendChild(r),o.onclick=()=>Sl(n),o.onmouseenter=()=>{o.style.borderColor="var(--accent)",o.style.background="rgba(110, 68, 255, 0.05)"},o.onmouseleave=()=>{o.style.borderColor="var(--border-subtle)",o.style.background="var(--bg)"},e.appendChild(o)}),He.appendChild(e)}function wl(t){const e=Oo||[];if(!t){jt(e);return}const n=t.toLowerCase(),o=e.filter(i=>i.name.toLowerCase().includes(n)||i.code.toLowerCase().includes(n));jt(o)}function Sl(t){ve&&(Ne?(Ne.value=t.code,Ne.dispatchEvent(new Event("input")),Ne.dispatchEvent(new Event("change"))):(ve.props||(ve.props={}),ve.props.code=t.code,g&&g.updateWidget(ve.id,ve))),Ut()}const El={Roboto:[100,300,400,500,700,900],Inter:[100,200,300,400,500,600,700,800,900],"Open Sans":[300,400,500,600,700,800],Lato:[100,300,400,700,900],Montserrat:[100,200,300,400,500,600,700,800,900],Poppins:[100,200,300,400,500,600,700,800,900],Raleway:[100,200,300,400,500,600,700,800,900],"Roboto Mono":[100,200,300,400,500,600,700],Ubuntu:[300,400,500,700],Nunito:[200,300,400,500,600,700,800,900],"Playfair Display":[400,500,600,700,800,900],Merriweather:[300,400,700,900],"Work Sans":[100,200,300,400,500,600,700,800,900],"Source Sans Pro":[200,300,400,600,700,900],Quicksand:[300,400,500,600,700]};function at(t){return El[t]||[100,200,300,400,500,600,700,800,900]}function lt(t,e){const n=parseInt(e,10),o=at(t);return o.includes(n)?n:o.reduce((i,s)=>Math.abs(s-n)<Math.abs(i-n)?s:i)}class Il{constructor(e){this.panel=e}getContainer(){return this.panel.getContainer()}addLabeledInput(e,n,o,i){const s=document.createElement("div");s.className="field";const r=document.createElement("div");r.className="prop-label",r.textContent=e;const a=o===ge;let l;n==="textarea"?(l=document.createElement("textarea"),l.className="prop-input",l.style.minHeight="60px",l.style.resize="vertical",l.style.fontFamily="inherit",l.value=a?"":o||"",a&&(l.placeholder="Mixed Values")):(l=document.createElement("input"),l.className="prop-input",l.type=n,l.value=a?"":o,a&&(l.placeholder="Mixed",l.style.fontStyle="italic",l.style.color="#888")),l.addEventListener("input",()=>{a&&(l.style.fontStyle="normal",l.style.color="inherit"),i(l.value)}),l.addEventListener("change",()=>{i(l.value)}),s.appendChild(r),s.appendChild(l),this.getContainer().appendChild(s)}addSelect(e,n,o,i){const s=document.createElement("div");s.className="field";const r=document.createElement("div");r.className="prop-label",r.textContent=e;const a=document.createElement("select");a.className="prop-input";const l=n===ge;if(l){const c=document.createElement("option");c.value=ge,c.textContent="(Mixed)",c.selected=!0,c.disabled=!0,a.appendChild(c)}o=o||[],o.forEach(c=>{const d=document.createElement("option");typeof c=="object"&&c!==null?(d.value=c.value,d.textContent=c.label,!l&&String(c.value)===String(n)&&(d.selected=!0)):(d.value=c,d.textContent=c,!l&&String(c)===String(n)&&(d.selected=!0)),a.appendChild(d)}),a.addEventListener("change",()=>i(a.value)),s.appendChild(r),s.appendChild(a),this.getContainer().appendChild(s)}addCheckbox(e,n,o){const i=document.createElement("div");i.className="field",i.style.marginBottom="8px";const s=document.createElement("label");s.style.display="flex",s.style.alignItems="center",s.style.gap="8px",s.style.fontSize="13px",s.style.cursor="pointer";const r=document.createElement("input");r.type="checkbox",n===ge?r.indeterminate=!0:r.checked=!!n,r.style.width="16px",r.style.height="16px",r.style.margin="0",r.style.cursor="pointer",r.addEventListener("change",()=>{r.indeterminate=!1,o(r.checked)});const l=document.createElement("span");l.textContent=e,s.appendChild(r),s.appendChild(l),i.appendChild(s),this.getContainer().appendChild(i)}addHint(e){const n=document.createElement("div");n.style.fontSize="11px",n.style.color="#666",n.style.marginTop="4px",n.style.marginBottom="12px",n.style.lineHeight="1.4",n.innerHTML=e,this.getContainer().appendChild(n)}addLabeledInputWithPicker(e,n,o,i,s){const r=document.createElement("div");r.className="field";const a=document.createElement("div");a.className="prop-label",a.textContent=e;const l=document.createElement("div");l.style.display="flex",l.style.gap="4px";const c=document.createElement("input");c.className="prop-input",c.type=n,c.value=o,c.style.flex="1",c.placeholder="Start typing or click ▼ to pick...",c.autocomplete="off",c.setAttribute("list",Nt),So(),c.addEventListener("input",()=>i(c.value));const d=document.createElement("button");d.className="btn btn-secondary",d.innerHTML="▼",d.style.padding="4px 8px",d.style.fontSize="10px",d.style.minWidth="32px",d.type="button",d.title="Browse all entities",d.addEventListener("click",()=>{bl(s,c,u=>{c.value=u,i(u)})}),l.appendChild(c),l.appendChild(d),r.appendChild(a),r.appendChild(l),this.getContainer().appendChild(r)}addIconPicker(e,n,o,i){const s=window.iconPickerData||[],r=document.createElement("div");r.className="field";const a=document.createElement("div");a.className="prop-label",a.textContent=e,r.appendChild(a);const l=document.createElement("select");l.className="select",l.style.fontFamily="MDI, monospace, system-ui",l.style.fontSize="16px",l.style.lineHeight="1.5",l.style.width="100%",l.style.marginBottom="4px";const c=document.createElement("option");c.value="",c.textContent="-- Quick visual picker --",c.style.fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif",l.appendChild(c);const d=(n||"").replace("mdi:","").toUpperCase();s.forEach(y=>{const m=document.createElement("option");m.value=y.code;const _=983040+parseInt(y.code.slice(1),16),b=String.fromCodePoint(_);m.textContent=b+"  "+y.code+(y.name?` (${y.name})`:""),m.style.fontFamily="MDI, monospace, system-ui",y.code===d&&(m.selected=!0),l.appendChild(m)}),l.addEventListener("change",()=>{l.value&&o(l.value)}),r.appendChild(l);const u=document.createElement("div");u.style.display="flex",u.style.gap="4px";const h=document.createElement("input");h.className="prop-input",h.type="text",h.placeholder="MDI Hex (Fxxxx)",h.value=d,h.style.flex="1",h.style.fontFamily="monospace",h.addEventListener("input",()=>{const y=(h.value||"").trim().toUpperCase().replace(/^0X/,"").replace(/^MDI:/,"");/^F[0-9A-F]{4}$/i.test(y)?(o(y),Array.from(l.options).find(_=>_.value===y)?l.value=y:l.value=""):y===""&&(o(""),l.value="")}),u.appendChild(h);const p=document.createElement("button");p.className="btn btn-secondary",p.textContent="★",p.style.padding="4px 8px",p.style.fontSize="14px",p.type="button",p.title="Open full icon browser",p.addEventListener("click",()=>{At(i,h)}),u.appendChild(p),r.appendChild(u);const f=document.createElement("div");f.className="prop-hint",f.innerHTML='Browse <a href="https://pictogrammers.com/library/mdi/icon/" target="_blank" style="color: #03a9f4; text-decoration: none;">Pictogrammers MDI</a>',r.appendChild(f),this.getContainer().appendChild(r)}addColorMixer(e,n,o){const i=document.createElement("div");i.className="field",i.style.marginBottom="10px";const s=document.createElement("div");s.className="prop-label",s.textContent=e,i.appendChild(s);let r=0,a=0,l=0,c="#000000";const d=n===ge;c=d?"":_l(n);const u=qn(d?"#000000":c);r=u.r,a=u.g,l=u.b;const h=document.createElement("div");h.style.background="var(--bg)",h.style.padding="8px",h.style.borderRadius="6px",h.style.border="1px solid var(--border-subtle)";const p=document.createElement("div");p.style.display="flex",p.style.alignItems="center",p.style.marginBottom="8px",p.style.gap="8px";const f=document.createElement("div");f.style.width="24px",f.style.height="24px",f.style.borderRadius="4px",f.style.border="1px solid #ccc",d?(f.style.background="linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",f.style.backgroundSize="8px 8px",f.style.backgroundPosition="0 0, 0 4px, 4px -4px, -4px 0px",f.style.backgroundColor="white"):f.style.backgroundColor=c;const y=document.createElement("input");y.type="text",y.className="prop-input",y.style.flex="1",y.style.textTransform="uppercase",y.value=d?"":c,d&&(y.placeholder="Mixed Colors"),p.appendChild(f),p.appendChild(y),h.appendChild(p);const m=(w,I,P)=>{const D=document.createElement("div");D.style.display="flex",D.style.alignItems="center",D.style.marginBottom="4px",D.style.fontSize="11px";const R=document.createElement("span");R.textContent=w,R.style.width="15px",R.style.fontWeight="bold";const G=document.createElement("input");G.type="range",G.min="0",G.max="255",G.value=I,G.style.flex="1",G.style.marginLeft="4px",G.style.accentColor=P;const H=document.createElement("span");return H.textContent=I,H.style.width="25px",H.style.textAlign="right",H.style.marginLeft="4px",D.appendChild(R),D.appendChild(G),D.appendChild(H),{row:D,slider:G,valLbl:H}},_=m("R",r,"red"),b=m("G",a,"green"),x=m("B",l,"blue");h.appendChild(_.row),h.appendChild(b.row),h.appendChild(x.row),i.appendChild(h),this.getContainer().appendChild(i);const S=()=>{r=parseInt(_.slider.value),a=parseInt(b.slider.value),l=parseInt(x.slider.value),_.valLbl.textContent=r,b.valLbl.textContent=a,x.valLbl.textContent=l;const w=vl(r,a,l).toUpperCase();y.value=w,f.style.backgroundColor=w,o(w)},E=()=>{let w=y.value.trim();if(w.startsWith("#")||(w="#"+w),/^#[0-9A-F]{6}$/i.test(w)){const I=qn(w);r=I.r,a=I.g,l=I.b,_.slider.value=r,_.valLbl.textContent=r,b.slider.value=a,b.valLbl.textContent=a,x.slider.value=l,x.valLbl.textContent=l,f.style.backgroundColor=w,o(w)}};_.slider.addEventListener("input",S),b.slider.addEventListener("input",S),x.slider.addEventListener("input",S),y.addEventListener("input",E),y.addEventListener("change",E)}addColorSelector(e,n,o,i){o||(o=Fe()),hn()?this.addColorMixer(e,n,i):this.addSelect(e,n,o,i)}addSegmentedControl(e,n,o,i){const s=document.createElement("div");s.className="field";const r=document.createElement("div");r.className="prop-label",r.textContent=e;const a=document.createElement("div");a.className="segmented-control",n.forEach(l=>{const c=document.createElement("div");c.className="segment-item"+(l.value===o?" active":""),c.title=l.label||l.value,l.icon?c.innerHTML=`<i class="mdi ${l.icon}"></i>`:c.textContent=l.label||l.value,c.onclick=()=>{a.querySelectorAll(".segment-item").forEach(d=>d.classList.remove("active")),c.classList.add("active"),i(l.value)},a.appendChild(c)}),s.appendChild(r),s.appendChild(a),this.getContainer().appendChild(s)}addNumberWithSlider(e,n,o,i,s){const r=document.createElement("div");r.className="field";const a=document.createElement("div");a.className="prop-label",a.textContent=e;const l=document.createElement("div");l.className="slider-hybrid";const c=n===ge,d=document.createElement("input");d.type="range",d.min=o,d.max=i,d.value=c?o:n;const u=document.createElement("input");u.className="prop-input",u.type="number",u.value=c?"":n,u.min=o,u.max=i,c&&(u.placeholder="Mixed"),d.addEventListener("input",()=>{c&&(u.placeholder=""),u.value=d.value,s(parseInt(d.value,10))}),u.addEventListener("input",()=>{d.value=u.value,s(parseInt(u.value,10))}),l.appendChild(d),l.appendChild(u),r.appendChild(a),r.appendChild(l),this.getContainer().appendChild(r)}addCompactPropertyRow(e){const n=document.createElement("div");n.className="prop-grid-2",this.getContainer().appendChild(n),this.panel.containerStack.push(n),e(),this.panel.containerStack.pop()}addCommonLVGLProperties(e,n){const o=(r,a)=>{const l={...e.props,[r]:a};g.updateWidget(e.id,{props:l})};this.panel.createSection("Common LVGL",!1);const i=document.createElement("div");i.style.display="grid",i.style.gridTemplateColumns="1fr 1fr",i.style.gap="4px",this.getContainer().appendChild(i);const s=(r,a,l=!1)=>{const c=document.createElement("div"),d=document.createElement("input");d.type="checkbox",d.checked=n[a]!==void 0?n[a]:l,d.addEventListener("change",()=>o(a,d.checked));const u=document.createElement("span");u.textContent=" "+r,u.style.fontSize="10px",c.appendChild(d),c.appendChild(u),i.appendChild(c)};s("Hidden","hidden",!1),s("Clickable","clickable",!0),s("Checkable","checkable",!1),s("Scrollable","scrollable",!0),s("Floating","floating",!1),s("Ignore Layout","ignore_layout",!1),this.addSelect("Scrollbar Mode",n.scrollbar_mode||"AUTO",["AUTO","ON","OFF","ACTIVE"],r=>o("scrollbar_mode",r)),this.panel.endSection()}addVisibilityConditions(e){e.condition_entity=e.condition_entity||"",e.condition_operator=e.condition_operator||"==",e.condition_state=e.condition_state||"",e.condition_min=e.condition_min||"",e.condition_max=e.condition_max||"";const n=document.createElement("div");n.className="field",n.style.fontSize="9px",n.style.color="#9499a6",n.style.marginBottom="6px",n.innerHTML="Show/hide this widget based on an entity's state.",this.getContainer().appendChild(n),this.addLabeledInputWithPicker("Condition Entity","text",e.condition_entity,a=>{g.updateWidget(e.id,{condition_entity:a})},e);const o=["==","!=","<",">","<=",">="];this.addSelect("Operator",e.condition_operator,o,a=>{g.updateWidget(e.id,{condition_operator:a})});const i=["on","off","open","closed","true","false","home","not_home","locked","unlocked","active","inactive","detected","clear","occupied"];this.addLabeledInputWithDataList("Condition State","text",e.condition_state,i,a=>{g.updateWidget(e.id,{condition_state:a})}),this.addLabeledInput("Min Value (Range)","text",e.condition_min,a=>{g.updateWidget(e.id,{condition_min:a})}),this.addLabeledInput("Max Value (Range)","text",e.condition_max,a=>{g.updateWidget(e.id,{condition_max:a})});const s=document.createElement("div");s.className="field",s.style.marginTop="8px";const r=document.createElement("button");r.className="btn btn-secondary btn-full",r.textContent="Clear Condition",r.type="button",r.addEventListener("click",()=>{g.updateWidget(e.id,{condition_entity:"",condition_operator:"==",condition_state:"",condition_min:"",condition_max:""})}),s.appendChild(r),this.getContainer().appendChild(s)}addPageSelector(e,n,o){const i=g.project?.pages||[],s=[{value:"relative_prev",label:"« Previous (Automatic)"},{value:"relative_next",label:"Next (Automatic) »"},{value:"home",label:"🏠 Home / Dashboard"}];i.forEach((r,a)=>{s.push({value:a.toString(),label:`Page ${a+1}: ${r.name||"Untitled"}`})}),this.addSelect(e,n,s,o)}addDropShadowButton(e,n){const o=document.createElement("div");o.className="field",o.style.marginTop="8px";const i=document.createElement("button");i.className="btn btn-secondary btn-full btn-xs",i.innerHTML='<span class="mdi mdi-box-shadow"></span> Create Drop Shadow',i.onclick=()=>{const s=g.selectedWidgetIds||[];s.includes(n)?g.createDropShadow(s):g.createDropShadow(n)},o.appendChild(i),(e||this.getContainer()).appendChild(o)}addIconInput(e,n,o,i){const s=document.createElement("div");s.className="field";const r=document.createElement("div");r.className="prop-label",r.textContent=e;const a=document.createElement("div");a.style.display="flex",a.style.gap="4px";const l=document.createElement("input");l.className="prop-input",l.type="text",l.value=n,l.style.flex="1",l.addEventListener("input",()=>o(l.value));const c=document.createElement("button");c.className="btn btn-secondary",c.textContent="★",c.style.padding="4px 8px",c.style.fontSize="14px",c.type="button",c.addEventListener("click",()=>{At(i,l)}),a.appendChild(l),a.appendChild(c),s.appendChild(r),s.appendChild(a),this.getContainer().appendChild(s)}addLabeledInputWithIconPicker(e,n,o,i,s){const r=document.createElement("div");r.className="field";const a=document.createElement("div");a.className="prop-label",a.textContent=e;const l=document.createElement("div");l.style.display="flex",l.style.gap="4px",l.style.flex="1";const c=document.createElement("input");c.className="prop-input",c.type=n,c.value=o,c.style.flex="1",c.onchange=u=>i(u.target.value),c.oninput=u=>i(u.target.value);const d=document.createElement("button");d.className="btn btn-secondary",d.innerHTML='<span class="mdi mdi-emoticon-outline"></span>',d.title="Pick MDI Icon",d.style.minWidth="32px",d.style.padding="0 8px",d.onclick=()=>{At(s,c)},l.appendChild(c),l.appendChild(d),r.appendChild(a),r.appendChild(l),this.getContainer().appendChild(r)}addLabeledInputWithDataList(e,n,o,i,s){const r=document.createElement("div");r.className="field";const a=document.createElement("div");a.className="prop-label",a.textContent=e;const l="datalist_"+Math.random().toString(36).substr(2,9),c=document.createElement("datalist");c.id=l,i.forEach(u=>{const h=document.createElement("option");h.value=u,c.appendChild(h)});const d=document.createElement("input");d.className="prop-input",d.type=n,d.value=o,d.setAttribute("list",l),d.addEventListener("input",()=>s(d.value)),d.addEventListener("change",()=>s(d.value)),r.appendChild(a),r.appendChild(d),r.appendChild(c),this.getContainer().appendChild(r)}addSectionLabel(e){const n=document.createElement("div");n.className="sidebar-section-label",n.textContent=e,this.getContainer().appendChild(n)}}class Cl{static render(e,n,o){const i=Fe(),s=n.props||{},r=(a,l)=>{const c={...n.props,[a]:l};if(g.updateWidget(n.id,{props:c}),a==="border_radius"||a==="radius"||a==="corner_radius"){const d=g.getCurrentPage();if(d&&d.widgets){const u=parseInt(l,10)||0,h=(n.props?.name||n.type)+" Shadow",p=d.widgets.find(f=>f.props&&f.props.name===h||f.x===(n.x||0)+5&&f.y===(n.y||0)+5&&f.width===n.width&&f.height===n.height);p&&(p.type==="shape_rect"&&u>0?g.updateWidget(p.id,{type:"rounded_rect",props:{...p.props,radius:u}}):p.type==="rounded_rect"&&g.updateWidget(p.id,{props:{...p.props,radius:u}}))}}};o.forEach(a=>{e.createSection(a.section,a.defaultExpanded!==!1),a.fields.forEach(l=>{const c=l.target==="root",d=c?n[l.key]!==void 0?n[l.key]:l.default:s[l.key]!==void 0?s[l.key]:l.default,u=h=>{let p=h;l.type==="number"&&(p=h===""?null:parseFloat(h),isNaN(p)&&(p=l.default!==void 0?l.default:0)),c?g.updateWidget(n.id,{[l.key]:p}):r(l.key,p)};switch(l.type){case"text":case"textarea":case"number":e.addLabeledInput(l.label,l.type,d,u);break;case"color":e.addColorSelector(l.label,d,i,u);break;case"select":{const h=typeof l.dynamicOptions=="function"?l.dynamicOptions(s):l.options;e.addSelect(l.label,d,h,u);break}case"checkbox":e.addCheckbox(l.label,d,u);break;case"icon_picker":e.addLabeledInputWithIconPicker(l.label,"text",d,u,n);break;case"entity_picker":e.addLabeledInputWithPicker(l.label,"text",d,u,n);break;case"hint":e.addHint(l.label);break;case"drop_shadow_button":e.addDropShadowButton(e.getContainer(),n.id);break}}),e.endSection()})}}class kl{static render(e,n){const o=n.map(f=>g.getWidgetById(f)).filter(f=>!!f);if(o.length===0)return;e.panel.innerHTML="",e.createSection(`${o.length} Widgets Selected`,!0),e.createSection("Transform",!0);const i=f=>{const y=o[0][f];return o.every(m=>m[f]===y)?y:ge},s=(f,y)=>{g.updateWidgets(n,{[f]:y})};e.addCompactPropertyRow(()=>{e.addLabeledInput("X","number",i("x"),f=>s("x",parseInt(f,10))),e.addLabeledInput("Y","number",i("y"),f=>s("y",parseInt(f,10)))}),e.addCompactPropertyRow(()=>{e.addLabeledInput("Width","number",i("width"),f=>s("width",parseInt(f,10))),e.addLabeledInput("Height","number",i("height"),f=>s("height",parseInt(f,10)))}),e.endSection();const r=["color","bg_color","background_color","border_width","border_color","border_radius","opacity","font_size","font_family","font_weight","text_align","italic","locked","hidden"],a=new Set;o.forEach(f=>Object.keys(f.props||{}).forEach(y=>a.add(y)));const c=o.map(f=>Object.keys(f.props||{})).reduce((f,y)=>f.filter(m=>y.includes(m))),d=new Set([...c,...r]),u=Array.from(d).filter(f=>{if(["border_width","border_color","border_radius"].includes(f)){const y=["text","label","sensor_text","lvgl_label","shape_rect","rounded_rect","shape_circle","datetime"];return o.every(m=>y.includes(m.type))}if(r.includes(f)){if(o.some(m=>m.props&&m.props[f]!==void 0))return!0;if(f.includes("font")||f==="color"){const m=["text","label","sensor_text","lvgl_label","datetime"];return o.every(_=>m.includes(_.type))}}return c.includes(f)});if(u.length>0){e.createSection("Shared Appearance",!0);const f=_=>{const b=o[0].props?o[0].props[_]:void 0;return o.every(x=>(x.props?x.props[_]:void 0)===b)?b:ge},y=(_,b)=>{g.updateWidgetsProps(n,{[_]:b})},m=u.filter(_=>{const b=o.find(S=>S.props&&S.props[_]!==void 0)?.props[_],x=b!==void 0?b:"";return typeof x=="number"||typeof x=="string"||typeof x=="boolean"||x===""});m.sort((_,b)=>_.includes("color")&&!b.includes("color")?-1:b.includes("color")&&!_.includes("color")?1:_.localeCompare(b)),m.forEach(_=>{const b=_.split("_").map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(" "),x=f(_),S=o.find(w=>w.props&&w.props[_]!==void 0)||o[0],E=S.props&&S.props[_]!==void 0?typeof S.props[_]:"string";if(_.includes("color")||_==="bg"||_==="fg")e.addColorSelector(b,x,Fe(),w=>y(_,w));else if(E==="boolean"||["italic","locked","hidden"].includes(_))e.addCheckbox(b,x===ge?!1:x,w=>y(_,w));else{const w=E==="number"||_.includes("width")||_.includes("size")||_.includes("radius")?"number":"text";e.addLabeledInput(b,w,x,I=>{y(_,w==="number"?parseInt(I,10):I)})}}),e.endSection()}e.createSection("Operations",!0);const h=document.createElement("button");h.className="btn btn-secondary btn-full btn-xs",h.style.width="100%",h.style.marginTop="8px",h.innerHTML='<span class="mdi mdi-box-shadow"></span> Create Shadows for All Selected',h.onclick=()=>g.createDropShadow(n),e.getContainer().appendChild(h);const p=document.createElement("button");p.className="btn btn-secondary btn-xs",p.style.background="var(--danger)",p.style.color="white",p.style.border="none",p.style.width="100%",p.style.marginTop="8px",p.innerHTML="🗑 Delete Selected Widgets",p.onclick=()=>{confirm(`Delete ${n.length} widgets?`)&&g.deleteWidget()},e.getContainer().appendChild(p),e.endSection(),e.endSection()}}class Pl{static render(e,n,o){const i=g.getCurrentPage(),r=(i?.layout||"absolute")!=="absolute";if(!i)return;if(!r){const h=e.getContainer(),p=document.createElement("div");p.style.padding="8px 0",p.style.fontSize="11px",p.style.color="var(--muted)",p.textContent="Page is currently in Absolute Positioning mode.",h.appendChild(p);const f=document.createElement("button");f.className="btn btn-secondary btn-xs",f.style.width="100%",f.innerHTML='<span class="mdi mdi-grid"></span> Enable Page Grid Layout',f.onclick=()=>{window.app&&window.app.pageSettings&&window.app.pageSettings.open(g.currentPageIndex)},h.appendChild(f);return}const a=Qe.isLvglWidget(o),l=n.props||{},c=(h,p)=>{const f={...n.props,[h]:p};g.updateWidget(n.id,{props:f})},d=(h,p,f,y)=>{const m=i.layout.match(/^(\d+)x(\d+)$/);if(!m)return null;const _=parseInt(m[1],10),b=parseInt(m[2],10),x=g.getCanvasDimensions(),S=x.width/b,E=x.height/_;return{x:Math.round(p*S),y:Math.round(h*E),width:Math.round(S*y),height:Math.round(E*f)}};if(e.addLabeledInput("Row (0-indexed)","number",l.grid_cell_row_pos??"",h=>{const p=h===""?null:parseInt(h,10);c("grid_cell_row_pos",isNaN(p)?null:p);const y=g.getWidgetById(n.id)?.props||{};if(p!=null&&y.grid_cell_column_pos!=null){const m=d(p,y.grid_cell_column_pos,y.grid_cell_row_span||1,y.grid_cell_column_span||1);m&&g.updateWidget(n.id,{x:m.x,y:m.y,width:m.width,height:m.height})}}),e.addLabeledInput("Column (0-indexed)","number",l.grid_cell_column_pos??"",h=>{const p=h===""?null:parseInt(h,10);c("grid_cell_column_pos",isNaN(p)?null:p);const y=g.getWidgetById(n.id)?.props||{};if(p!=null&&y.grid_cell_row_pos!=null){const m=d(y.grid_cell_row_pos,p,y.grid_cell_row_span||1,y.grid_cell_column_span||1);m&&g.updateWidget(n.id,{x:m.x,y:m.y,width:m.width,height:m.height})}}),e.addLabeledInput("Row Span","number",l.grid_cell_row_span||1,h=>{const p=Math.max(1,parseInt(h,10)||1);c("grid_cell_row_span",p);const y=g.getWidgetById(n.id)?.props||{};if(y.grid_cell_row_pos!=null&&y.grid_cell_column_pos!=null){const m=d(y.grid_cell_row_pos,y.grid_cell_column_pos,p,y.grid_cell_column_span||1);m&&g.updateWidget(n.id,{x:m.x,y:m.y,width:m.width,height:m.height})}}),e.addLabeledInput("Column Span","number",l.grid_cell_column_span||1,h=>{const p=Math.max(1,parseInt(h,10)||1);c("grid_cell_column_span",p);const y=g.getWidgetById(n.id)?.props||{};if(y.grid_cell_row_pos!=null&&y.grid_cell_column_pos!=null){const m=d(y.grid_cell_row_pos,y.grid_cell_column_pos,y.grid_cell_row_span||1,p);m&&g.updateWidget(n.id,{x:m.x,y:m.y,width:m.width,height:m.height})}}),a){const h=["START","END","CENTER","STRETCH"];e.addSelect("X Align",l.grid_cell_x_align||"STRETCH",h,p=>{c("grid_cell_x_align",p)}),e.addSelect("Y Align",l.grid_cell_y_align||"STRETCH",h,p=>{c("grid_cell_y_align",p)})}const u=document.createElement("button");u.className="btn btn-secondary btn-xs",u.style.marginTop="8px",u.style.width="100%",u.innerHTML='<span class="mdi mdi-cog"></span> Open Page Grid Settings',u.onclick=()=>{const h=g.currentPageIndex;window.app&&window.app.pageSettings&&window.app.pageSettings.open(h)},e.getContainer().appendChild(u)}}const Ll=`# Dictionary to map calendar keys to their corresponding names
# One word calandars don't need to be added calendar.jobs would map to Jobs by default without adding it here
# calendar.hello_world should be added on the other hand
CALENDAR_NAMES = {"calendar.x": "X", "calendar.Y": "Y"}
# Day names (which are displayed in the calendar event list) can be translated here if required
DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
# How many entries to send to the ESPHome device
MAX_ENTRIES = 8

def convert_calendar_format(data, today):
    # Initialize a dictionary to store events grouped by date
    events_by_date = {}
    entrie_count = 0
    
    # Variable to store the end time of the closest event that will end
    closest_end_time = None
    
    # Iterate through calendar keys and events
    for calendar_key, events_list in data.items():
        for event in events_list['events']:
            if 'description' in event:
                event.pop('description')
                
            # Attempt to split the 'event[start]' into date and time parts
            parts = event['start'].split("T")
            event_date = parts[0]
            event_time = parts[1] if len(parts) > 1 else None  # event_time might not be present
            
            # Compare the event_date with today's date
            if event_date < today:
                # If the event's date is before today, update it to today's date (in case of multi day event starting before today)
                event['start'] = today if event_time is None else f"{today}T{event_time}"
                event_date = today
            
            # Add calendar name to event
            # If calendar key exists in CALENDAR_NAMES, use its value, otherwise capitalize the second part of the key
            event['calendar_name'] = CALENDAR_NAMES.get(calendar_key, calendar_key.split(".")[1].capitalize())
            
            # Parse location_name and location_address
            if 'location' in event:
                # Split the 'location' string into lines based on the newline character
                location_lines = event['location'].split('\\\\n')
                if len(location_lines) >= 2:
                    # If there are at least two lines, consider the first line as 'location_name' and the second line as 'location_address'
                    event['location_name'] = location_lines[0]
                    # event['location_address'] = location_lines[1]
                elif len(location_lines) == 1:
                    # If there's only one line, consider it as 'location_name'
                    event['location_name'] = location_lines[0]
                    
                # Remove the 'location' key from the event since it's been parsed into 'location_name' and 'location_address'
                event.pop('location')
                    
            # Add event to events_by_date dictionary
            if event_date in events_by_date:
                events_by_date[event_date].append(event)
            else:
                events_by_date[event_date] = [event]
                
    # Sort events by date
    sorted_dates = sorted(events_by_date.keys())
    
    # Initialize a list to store the final date objects
    result = []
    
    # Iterate through sorted dates
    for date in sorted_dates:
        all_day_events = []
        other_events = []
        for event in events_by_date[date]:
            if entrie_count == MAX_ENTRIES:
                break
            
            # Check if the event lasts for the whole day
            start_date = event['start']
            end_date = event['end']
            if 'T' not in event['start']:
                all_day_events.append(event)
            else:
                other_events.append(event)
                
            entrie_count = entrie_count + 1
        
        if other_events and date == today:
            closest_end_time = sorted(other_events, key=lambda item:dt_util.parse_datetime(item['end']), reverse=False)[0]["end"]
        
        if all_day_events or other_events:
            # Sort other_events by start time
            other_events.sort(key=lambda item:dt_util.parse_datetime(item['start']), reverse=False)
            
            # Construct dictionary for the date
            # is_today cast to int because a bool somehow crashes my esphome config
            day_item = {
                'date': date,
                'day': dt_util.parse_datetime(date).day,
                'is_today': int(date == dt_util.now().isoformat().split("T")[0]),
                'day_name': DAY_NAMES[dt_util.parse_datetime(date).weekday()],
                'all_day': all_day_events,
                'other': other_events
            }
            result.append(day_item)
        
    return (result, closest_end_time)

# Access the data received from the Home Assistant service call
input_data = data["calendar"]
today = data["now"]

# Convert the received data into the format expected by the epaper display
converted_data = convert_calendar_format(input_data, today)

# Pass the output back to Home Assistant
output["entries"] = {"days": converted_data[0]}
output["closest_end_time"] = converted_data[1]
`;class Xn{static autoPopulateTitleFromEntity(e,n){!n||!g||typeof Te=="function"&&Te().then(o=>{if(!o||o.length===0)return;const i=o.find(s=>s.entity_id===n);if(i&&i.name){const s=g.getSelectedWidget();s&&s.id===e&&!s.title&&g.updateWidget(e,{title:i.name})}}).catch(()=>{})}static renderProtocolProperties(e,n,o){const i=Fe(),s=n.props||{},r=(a,l)=>{const c={...n.props,[a]:l};g.updateWidget(n.id,{props:c})};o==="image"||o==="online_image"?(e.createSection("Image Source",!0),o==="image"?e.addLabeledInput("Asset Path","text",s.path||"",a=>r("path",a)):(e.addLabeledInput("Image URL","text",s.url||"",a=>r("url",a)),e.addLabeledInput("Refresh (s)","number",s.interval_s||300,a=>r("interval_s",parseInt(a,10)))),e.addCheckbox("Invert Colors",!!s.invert,a=>r("invert",a)),e.endSection(),e.createSection("Appearance",!0),e.addColorSelector("Background",s.bg_color||"transparent",i,a=>r("bg_color",a)),e.addDropShadowButton(e.getContainer(),n.id),e.endSection()):o.startsWith("shape_")||o==="line"||o==="rounded_rect"?(e.createSection("Shape Style",!0),e.addColorSelector("Fill/Line Color",s.color||"black",i,a=>r("color",a)),o!=="line"?(e.addCheckbox("Fill",s.fill!==!1,a=>r("fill",a)),e.addColorSelector("Background",s.bg_color||"transparent",i,a=>r("bg_color",a)),e.addLabeledInput("Border Width","number",s.border_width||0,a=>r("border_width",parseInt(a,10)))):e.addLabeledInput("Thickness","number",s.thickness||2,a=>r("thickness",parseInt(a,10))),(o==="rounded_rect"||s.radius!==void 0)&&e.addLabeledInput("Corner Radius","number",s.radius||4,a=>r("radius",parseInt(a,10))),e.addDropShadowButton(e.getContainer(),n.id),e.endSection()):o==="odp_ellipse"||o==="odp_polygon"||o==="odp_rectangle_pattern"||o==="odp_arc"||o==="odp_icon_sequence"?(e.createSection("ODP Style",!0),o!=="odp_icon_sequence"?(e.addColorSelector("Outline",s.outline||"black",i,a=>r("outline",a)),e.addColorSelector("Fill",s.fill||"transparent",i,a=>r("fill",a)),e.addLabeledInput("Border Width","number",s.border_width||1,a=>r("border_width",parseInt(a,10)))):(e.addColorSelector("Color",s.fill||"black",i,a=>r("fill",a)),e.addLabeledInput("Icon Size","number",s.size||24,a=>r("size",parseInt(a,10))),e.addSelect("Direction",s.direction||"right",["right","down"],a=>r("direction",a)),e.addLabeledInput("Spacing","number",s.spacing||6,a=>r("spacing",parseInt(a,10))),e.addLabeledInput("Icons (comma sep)","text",Array.isArray(s.icons)?s.icons.join(", "):s.icons||"",a=>r("icons",a))),o==="odp_rectangle_pattern"&&(e.addLabeledInput("Repeat X","number",s.x_repeat||3,a=>r("x_repeat",parseInt(a,10))),e.addLabeledInput("Repeat Y","number",s.y_repeat||2,a=>r("y_repeat",parseInt(a,10))),e.addLabeledInput("Size X","number",s.x_size||30,a=>r("x_size",parseInt(a,10))),e.addLabeledInput("Size Y","number",s.y_size||15,a=>r("y_size",parseInt(a,10)))),o==="odp_arc"&&(e.addLabeledInput("Start Angle","number",s.start_angle||0,a=>r("start_angle",parseInt(a,10))),e.addLabeledInput("End Angle","number",s.end_angle||90,a=>r("end_angle",parseInt(a,10)))),e.endSection()):o==="odp_plot"?(e.createSection("Plot Config",!0),e.addLabeledInput("Duration (sec)","number",s.duration||36400,a=>r("duration",parseInt(a,10))),e.addColorSelector("Background",s.background||"white",i,a=>r("background",a)),e.addColorSelector("Outline",s.outline||"#ccc",i,a=>r("outline",a)),e.endSection()):o==="odp_multiline"?(e.createSection("Multiline Content",!0),e.addLabeledInput("Text","textarea",s.text||"Line 1|Line 2",a=>r("text",a)),e.addLabeledInput("Delimiter","text",s.delimiter||"|",a=>r("delimiter",a)),e.endSection(),e.createSection("Appearance",!0),e.addLabeledInput("Font Size","number",s.font_size||16,a=>r("font_size",parseInt(a,10))),e.addLabeledInput("Line Spacing","number",s.line_spacing||4,a=>r("line_spacing",parseInt(a,10))),e.addColorSelector("Color",s.color||"black",i,a=>r("color",a)),e.addSelect("Font",s.font_family||"Roboto",["Roboto","Inter","Roboto Mono"],a=>r("font_family",a)),e.endSection()):((n.entity_id!==void 0||s.weather_entity!==void 0||o.includes("sensor")||o.includes("icon"))&&(e.createSection("Data Source",!0),e.addLabeledInputWithPicker("Entity ID","text",n.entity_id||s.weather_entity||"",l=>{s.weather_entity!==void 0?r("weather_entity",l):g.updateWidget(n.id,{entity_id:l})},n),n.title!==void 0&&e.addLabeledInput("Title/Label","text",n.title||"",l=>{g.updateWidget(n.id,{title:l})}),e.endSection()),e.createSection("Appearance",!0),e.addColorSelector("Color",s.color||"black",i,l=>r("color",l)),s.bg_color!==void 0&&e.addColorSelector("Background",s.bg_color||"transparent",i,l=>r("bg_color",l)),s.size!==void 0&&e.addLabeledInput("Size","number",s.size||24,l=>r("size",parseInt(l,10))),e.endSection())}static renderLegacyProperties(e,n,o){const i=Fe(),s=n.props||{},r=(a,l)=>{const c={...n.props,[a]:l};g.updateWidget(n.id,{props:c})};if(o==="text"||o==="label"||o==="datetime"||o==="sensor_text"||o==="entity_text"){e.createSection("Content",!0),o==="sensor_text"?(e.addLabeledInputWithPicker("Entity ID","text",n.entity_id||"",p=>{g.updateWidget(n.id,{entity_id:p}),this.autoPopulateTitleFromEntity(n.id,p)},n),e.addLabeledInput("Attribute (optional)","text",s.attribute||"",p=>r("attribute",p))):o==="entity_text"?(e.addLabeledInputWithPicker("Entity ID","text",n.entity_id||"",p=>g.updateWidget(n.id,{entity_id:p}),n),e.addLabeledInput("Attribute","text",s.attribute||"",p=>r("attribute",p))):o==="datetime"?(e.addLabeledInput("Format","text",s.format||"%H:%M",p=>r("format",p)),e.addHint("e.g. %H:%M or %A, %B %d")):e.addLabeledInput("Text","text",s.text||"Text",p=>r("text",p)),o==="sensor_text"&&(e.addLabeledInput("Prefix","text",s.prefix||"",p=>r("prefix",p)),e.addLabeledInput("Suffix","text",s.suffix||"",p=>r("suffix",p)),e.addLabeledInput("Decimals","number",s.decimals??1,p=>r("decimals",parseInt(p,10)))),e.endSection(),e.createSection("Typography",!0),e.addLabeledInput("Font Size","number",s.font_size||20,p=>r("font_size",parseInt(p,10)));const a=["Roboto","Inter","Open Sans","Lato","Montserrat","Poppins","Raleway","Roboto Mono","Ubuntu","Nunito","Playfair Display","Merriweather","Work Sans","Source Sans Pro","Quicksand","Custom..."],l=s.font_family||"Roboto",c=!a.slice(0,-1).includes(l);e.addSelect("Font",c?"Custom...":l,a,p=>{p!=="Custom..."?(r("font_family",p),r("custom_font_family","")):r("font_family","Custom...")}),(c||s.font_family==="Custom...")&&(e.addLabeledInput("Custom Font Name","text",s.custom_font_family||(c?l:""),p=>{r("font_family",p||"Roboto"),r("custom_font_family",p)}),e.addHint('Browse <a href="https://fonts.google.com" target="_blank">fonts.google.com</a>'));const d=at(l);let u=s.font_weight||400;d.includes(u)||(u=lt(l,u),setTimeout(()=>r("font_weight",u),0)),e.addSelect("Weight",u,d,p=>r("font_weight",parseInt(p,10))),e.addCheckbox("Italic",s.italic||!1,p=>r("italic",p));const h=["TOP_LEFT","TOP_CENTER","TOP_RIGHT","CENTER_LEFT","CENTER","CENTER_RIGHT","BOTTOM_LEFT","BOTTOM_CENTER","BOTTOM_RIGHT"];e.addSelect("Align",s.text_align||(o==="datetime"?"CENTER":"TOP_LEFT"),h,p=>r("text_align",p)),e.addColorSelector("Color",s.color||"black",i,p=>r("color",p)),e.endSection(),e.createSection("Appearance",!1),e.addColorSelector("Background",s.bg_color||"transparent",i,p=>r("bg_color",p)),e.addLabeledInput("Opacity (0.0 - 1.0)","number",s.opacity??1,p=>r("opacity",parseFloat(p))),e.addCheckbox("Word Wrap",s.word_wrap!==!1,p=>r("word_wrap",p)),o==="sensor_text"&&e.addCheckbox("Show Unit",s.show_unit!==!1,p=>r("show_unit",p)),e.endSection()}else if(o==="weather")e.createSection("Data Source",!0),e.addLabeledInputWithPicker("Weather Entity","text",s.weather_entity||"weather.forecast",a=>r("weather_entity",a),n),e.endSection(),e.createSection("Appearance",!0),e.addLabeledInput("Icon Size","number",s.icon_size||48,a=>r("icon_size",parseInt(a,10))),e.addColorSelector("Icon Color",s.icon_color||"black",i,a=>r("icon_color",a)),e.addCheckbox("Show Temperature",s.show_temp!==!1,a=>r("show_temp",a)),e.addCheckbox("Show Condition",s.show_cond!==!1,a=>r("show_cond",a)),e.endSection();else if(o==="chart"||o==="state_history")e.createSection("Data Source",!0),e.addLabeledInputWithPicker("Entity ID","text",n.entity_id||"",a=>g.updateWidget(n.id,{entity_id:a}),n),e.addLabeledInput("Time Period (hours)","number",s.hours||24,a=>r("hours",parseInt(a,10))),e.endSection(),e.createSection("Appearance",!0),e.addColorSelector("Line Color",s.color||"blue",i,a=>r("color",a)),e.addColorSelector("Fill Color",s.fill_color||"transparent",i,a=>r("fill_color",a)),e.addLabeledInput("Line Width","number",s.line_width||2,a=>r("line_width",parseInt(a,10))),e.addCheckbox("Show Axes",s.show_axes!==!1,a=>r("show_axes",a)),e.endSection();else if(o==="gauge"||o==="progress")e.createSection("Data Source",!0),e.addLabeledInputWithPicker("Entity ID","text",n.entity_id||"",a=>g.updateWidget(n.id,{entity_id:a}),n),e.addLabeledInput("Min Value","number",s.min||0,a=>r("min",parseFloat(a))),e.addLabeledInput("Max Value","number",s.max||100,a=>r("max",parseFloat(a))),e.endSection(),e.createSection("Appearance",!0),e.addColorSelector("Bar Color",s.color||"blue",i,a=>r("color",a)),e.addColorSelector("Background Color",s.bg_color||"#eee",i,a=>r("bg_color",a)),o==="gauge"&&e.addLabeledInput("Thickness","number",s.thickness||10,a=>r("thickness",parseInt(a,10))),e.endSection();else if(o==="switch"||o==="button")e.createSection("Action",!0),e.addLabeledInputWithPicker("Entity ID","text",n.entity_id||"",a=>g.updateWidget(n.id,{entity_id:a}),n),e.addLabeledInput("Label","text",s.text||(o==="button"?"Button":"Switch"),a=>r("text",a)),e.endSection(),e.createSection("Appearance",!0),e.addColorSelector("Color",s.color||"blue",i,a=>r("color",a)),e.addColorSelector("Text Color",s.text_color||"white",i,a=>r("text_color",a)),e.endSection();else if(o==="group"||o==="rectangle"||o==="circle"||o==="line")e.createSection("Appearance",!0),e.addColorSelector("Color",s.color||(o==="group"?"transparent":"black"),i,a=>r("color",a)),o!=="group"&&(e.addLabeledInput("Border Width","number",s.border_width||1,a=>r("border_width",parseInt(a,10))),e.addColorSelector("Border Color",s.border_color||"black",i,a=>r("border_color",a))),o==="rectangle"&&e.addLabeledInput("Corner Radius","number",s.border_radius||0,a=>r("border_radius",parseInt(a,10))),e.endSection();else if(o==="image"){e.createSection("Content",!0),e.addHint("🖼️ Static image from ESPHome.<br/><span style='color:#888;font-size:11px;'>Replace the default path with your actual image file path.</span>"),e.addLabeledInput("Image Path","text",s.path||"",d=>r("path",d)),e.endSection(),e.createSection("Appearance",!0),s.invert===void 0&&r("invert",Ze()==="reterminal_e1001"),e.addCheckbox("Invert colors",s.invert||!1,d=>r("invert",d)),e.addSelect("Render Mode",s.render_mode||"Auto",["Auto","Binary","Grayscale","Color (RGB565)"],d=>r("render_mode",d));const a=document.createElement("div");a.className="field",a.style.marginTop="12px";const l=n.x===0&&n.y===0&&n.width===800&&n.height===480,c=document.createElement("button");c.className="btn "+(l?"btn-primary":"btn-secondary")+" btn-full",c.textContent=l?"✓ Full Screen (click to restore)":"⛶ Fill Screen",c.type="button",c.addEventListener("click",()=>{l?g.updateWidget(n.id,{x:50,y:50,width:200,height:150}):g.updateWidget(n.id,{x:0,y:0,width:800,height:480})}),a.appendChild(c),e.getContainer().appendChild(a),e.endSection()}else if(o==="online_image"){e.createSection("Content",!0),e.addHint("💡 Fetch remote images dynamically (Puppet support):<br/><code style='background:#f0f0f0;padding:2px 4px;border-radius:2px;'>https://example.com/camera/snapshot.jpg </code><br/><span style='color:#4a9eff;'>ℹ️ Images are downloaded at specified intervals</span>"),e.addLabeledInput("Remote URL","text",s.url||"",d=>r("url",d)),e.addLabeledInput("Update interval (seconds)","number",s.interval_s||300,d=>r("interval_s",parseInt(d,10))),e.endSection(),e.createSection("Appearance",!0),s.invert===void 0&&r("invert",Ze()==="reterminal_e1001"),e.addCheckbox("Invert colors",s.invert||!1,d=>r("invert",d)),e.addSelect("Render Mode",s.render_mode||"Auto",["Auto","Binary","Grayscale","Color (RGB565)"],d=>r("render_mode",d));const a=document.createElement("div");a.className="field",a.style.marginTop="12px";const l=n.x===0&&n.y===0&&n.width===800&&n.height===480,c=document.createElement("button");c.className="btn "+(l?"btn-primary":"btn-secondary")+" btn-full",c.textContent=l?"✓ Full Screen (click to restore)":"⛶ Fill Screen",c.type="button",c.addEventListener("click",()=>{l?g.updateWidget(n.id,{x:50,y:50,width:200,height:150}):g.updateWidget(n.id,{x:0,y:0,width:800,height:480})}),a.appendChild(c),e.getContainer().appendChild(a),e.endSection()}else if(o==="qr_code")e.createSection("Content",!0),e.addHint("📱 Generate QR codes that can be scanned by phones/tablets"),e.addLabeledInput("QR Content","text",s.value||"https://esphome.io",a=>r("value",a)),e.addHint("Enter a URL, text, or any string to encode"),e.endSection(),e.createSection("Appearance",!0),e.addLabeledInput("Scale","number",s.scale||2,a=>{let l=parseInt(a||"2",10);(Number.isNaN(l)||l<1)&&(l=1),l>10&&(l=10),r("scale",l)}),e.addHint("Size multiplier (1-10). Larger = bigger QR code"),e.addSelect("Error Correction",s.ecc||"LOW",["LOW","MEDIUM","QUARTILE","HIGH"],a=>r("ecc",a)),e.addHint("Higher = more redundancy, can recover from damage"),e.addSelect("Color",s.color||"black",["black","white"],a=>r("color",a)),e.endSection();else if(o==="quote_rss"){e.createSection("Feed Settings",!0),e.addHint("📰 Display quotes from an RSS feed (Quote of the Day)"),e.addLabeledInput("Feed URL","text",s.feed_url||"https://www.brainyquote.com/link/quotebr.rss",f=>r("feed_url",f)),e.addHint("Enter any RSS feed URL. Default: BrainyQuote daily quotes"),e.addCheckbox("Show Author",s.show_author!==!1,f=>r("show_author",f)),e.addCheckbox("Random Quote",s.random!==!1,f=>r("random",f)),e.addHint("Pick a random quote from the feed, or use the first one");const a=["15min","30min","1h","2h","4h","8h","12h","24h"];e.addSelect("Refresh Interval",s.refresh_interval||"24h",a,f=>r("refresh_interval",f)),e.addLabeledInput("Home Assistant URL","text",s.ha_url||"http://homeassistant.local:8123",f=>r("ha_url",f)),e.addHint("Address of your Home Assistant instance (for Proxy)"),e.endSection(),e.createSection("Typography",!1),e.addLabeledInput("Quote Text Size (Line 1)","number",s.quote_font_size||18,f=>r("quote_font_size",parseInt(f,10))),e.addLabeledInput("Author Size (Line 2)","number",s.author_font_size||14,f=>r("author_font_size",parseInt(f,10)));const l=["Roboto","Inter","Open Sans","Lato","Montserrat","Poppins","Raleway","Roboto Mono","Ubuntu","Nunito","Playfair Display","Merriweather","Work Sans","Source Sans Pro","Quicksand","Custom..."],c=s.font_family||"Roboto",d=!l.slice(0,-1).includes(c);e.addSelect("Font",d?"Custom...":c,l,f=>{f!=="Custom..."?(r("font_family",f),r("custom_font_family","")):r("font_family","Custom...")}),(d||s.font_family==="Custom...")&&(e.addLabeledInput("Custom Font Name","text",s.custom_font_family||(d?c:""),f=>{r("font_family",f||"Roboto"),r("custom_font_family",f)}),e.addHint('Browse <a href="https://fonts.google.com" target="_blank">fonts.google.com</a>'));const u=at(c);let h=s.font_weight||400;u.includes(h)||(h=lt(c,h),setTimeout(()=>r("font_weight",h),0)),e.addSelect("Weight",h,u,f=>r("font_weight",parseInt(f,10)));const p=["TOP_LEFT","TOP_CENTER","TOP_RIGHT","CENTER_LEFT","CENTER","CENTER_RIGHT","BOTTOM_LEFT","BOTTOM_CENTER","BOTTOM_RIGHT"];e.addSelect("Align",s.text_align||"TOP_LEFT",p,f=>r("text_align",f)),e.addColorSelector("Color",s.color||"black",i,f=>r("color",f)),e.endSection(),e.createSection("Display Options",!1),e.addCheckbox("Word Wrap",s.word_wrap!==!1,f=>r("word_wrap",f)),e.addCheckbox("Auto Scale Text",s.auto_scale||!1,f=>r("auto_scale",f)),e.addHint("Automatically reduce font size if text is too long"),e.addCheckbox("Italic Quote",s.italic_quote!==!1,f=>r("italic_quote",f)),e.endSection()}else if(o==="calendar"){e.createSection("Appearance",!0),e.addColorSelector("Text Color",s.text_color||"black",i,c=>r("text_color",c)),e.addColorSelector("Background",s.background_color||"white",i,c=>r("background_color",c)),e.endSection(),e.createSection("Border Style",!1),e.addLabeledInput("Border Width","number",s.border_width||0,c=>r("border_width",parseInt(c,10))),e.addColorSelector("Border Color",s.border_color||"theme_auto",i,c=>r("border_color",c)),e.addLabeledInput("Corner Radius","number",s.border_radius||0,c=>r("border_radius",parseInt(c,10))),e.addDropShadowButton(e.getContainer(),n.id),e.endSection(),e.createSection("Font Sizes",!1),e.addLabeledInput("Big Date Size","number",s.font_size_date||100,c=>r("font_size_date",parseInt(c,10))),e.addLabeledInput("Day Name Size","number",s.font_size_day||24,c=>r("font_size_day",parseInt(c,10))),e.addLabeledInput("Grid Text Size","number",s.font_size_grid||14,c=>r("font_size_grid",parseInt(c,10))),e.addLabeledInput("Event Text Size","number",s.font_size_event||18,c=>r("font_size_event",parseInt(c,10))),e.endSection(),e.createSection("Visibility",!0),e.addCheckbox("Show Header",s.show_header!==!1,c=>r("show_header",c)),e.addCheckbox("Show Grid",s.show_grid!==!1,c=>r("show_grid",c)),e.addCheckbox("Show Events",s.show_events!==!1,c=>r("show_events",c)),e.endSection(),e.createSection("Data Source",!0),e.addLabeledInputWithPicker("Entity ID","text",n.entity_id||"sensor.esp_calendar_data",c=>{g.updateWidget(n.id,{entity_id:c})},n),e.addLabeledInput("Max Events","number",s.max_events||8,c=>r("max_events",parseInt(c,10))),e.addHint("Must be a sensor with attribute 'entries'");const a=document.createElement("button");a.className="btn btn-secondary btn-full btn-xs",a.textContent="Download Helper Script",a.style.marginTop="10px",a.addEventListener("click",()=>{const c=document.createElement("a");c.setAttribute("href","data:text/x-python;charset=utf-8,"+encodeURIComponent(Ll)),c.setAttribute("download","esp_calendar_data_conversion.py"),c.style.display="none",document.body.appendChild(c),c.click(),document.body.removeChild(c)}),e.getContainer().appendChild(a),e.addHint("Place in /config/python_scripts/");const l=document.createElement("div");l.style.marginTop="5px",l.style.fontSize="10px",l.style.color="#888",l.style.textAlign="center",l.innerText="Check widget instructions for HA setup.",e.getContainer().appendChild(l),e.endSection()}else if(o==="puppet")e.createSection("Content",!0),e.addLabeledInput("File path / URL","text",s.image_url||"",a=>r("image_url",a)),e.addHint('Tip: Use mdi:icon-name for Material Design Icons. <br><b>Important:</b> Ensure `materialdesignicons - webfont.ttf` is in your ESPHome `fonts / ` folder. <a href="https://pictogrammers.com/library/mdi/" target="_blank" style="color: #52c7ea">MDI Library</a>'),e.endSection(),e.createSection("Appearance",!0),e.addSelect("Image type",s.image_type||"RGB565",["RGB565","RGB","GRAYSCALE","BINARY"],a=>r("image_type",a)),e.addHint("RGB565=2B/px, RGB=3B/px, GRAYSCALE=1B/px, BINARY=1bit/px"),e.addSelect("Transparency",s.transparency||"opaque",["opaque","chroma_key","alpha_channel"],a=>r("transparency",a)),e.addHint("opaque=no transparency, chroma_key=color key, alpha_channel=smooth blend"),e.endSection();else if(o==="lvgl_label"||o.startsWith("lvgl_")){if(e.addCommonLVGLProperties(n,s),e.createSection("Widget Settings",!0),o==="lvgl_label"){e.addLabeledInput("Text","text",s.text||"Label",p=>r("text",p)),e.addLabeledInput("Font Size","number",s.font_size||20,p=>r("font_size",parseInt(p,10))),e.addColorMixer("Text Color",s.color||"black",p=>r("color",p)),e.addColorMixer("Background Color",s.bg_color||"transparent",p=>r("bg_color",p));const a=["Roboto","Inter","Open Sans","Lato","Montserrat","Poppins","Raleway","Roboto Mono","Ubuntu","Nunito","Playfair Display","Merriweather","Work Sans","Source Sans Pro","Quicksand","Custom..."],l=s.font_family||"Roboto",c=!a.slice(0,-1).includes(l);e.addSelect("Font",c?"Custom...":l,a,p=>{p!=="Custom..."?r("font_family",p):r("font_family","Custom...")});const d=at(l);let u=s.font_weight||400;d.includes(u)||(u=lt(l,u),setTimeout(()=>r("font_weight",u),0)),e.addSelect("Weight",u,d,p=>r("font_weight",parseInt(p,10))),e.addCheckbox("Italic",s.italic||!1,p=>r("italic",p));const h=["TOP_LEFT","TOP_CENTER","TOP_RIGHT","CENTER_LEFT","CENTER","CENTER_RIGHT","BOTTOM_LEFT","BOTTOM_CENTER","BOTTOM_RIGHT"];e.addSelect("Align",s.text_align||"CENTER",h,p=>r("text_align",p))}else if(o==="lvgl_line"){const a=s.orientation||"horizontal";e.addSelect("Orientation",a,["horizontal","vertical"],f=>{const y=n.width,m=n.height;g.updateWidget(n.id,{props:{...s,orientation:f},width:m,height:y})}),e.addLabeledInput("Line Width","number",s.line_width||3,f=>r("line_width",parseInt(f,10))),e.addColorMixer("Line Color",s.line_color||s.color||"black",f=>r("line_color",f)),e.addCheckbox("Rounded Ends",s.line_rounded!==!1,f=>r("line_rounded",f)),e.addLabeledInput("Opacity (0-255)","number",s.opa||255,f=>r("opa",parseInt(f,10))),e.createSection("Quick Size",!1);const l=document.createElement("div");l.style.display="flex",l.style.gap="8px",l.style.marginBottom="8px";const c=g.getCanvasDimensions(),d=c.width,u=c.height,h=document.createElement("button");h.className="btn btn-secondary",h.style.flex="1",h.textContent="↔ Fill Horizontal",h.addEventListener("click",()=>{g.updateWidget(n.id,{x:0,y:n.y,width:d,height:s.line_width||3,props:{...s,orientation:"horizontal"}})});const p=document.createElement("button");p.className="btn btn-secondary",p.style.flex="1",p.textContent="↕ Fill Vertical",p.addEventListener("click",()=>{g.updateWidget(n.id,{x:n.x,y:0,width:s.line_width||3,height:u,props:{...s,orientation:"vertical"}})}),l.appendChild(h),l.appendChild(p),e.getContainer().appendChild(l),e.endSection()}else if(o==="lvgl_meter"){e.addLabeledInputWithPicker("Entity ID","text",n.entity_id||"",l=>g.updateWidget(n.id,{entity_id:l}),n),e.createSection("Size",!1);const a=Math.max(n.width,n.height);e.addLabeledInput("Size (px)","number",a,l=>{const c=parseInt(l,10)||100;g.updateWidget(n.id,{width:c,height:c})}),e.addHint("⚠️ Meter widgets must be square. Width and height are locked together."),e.endSection(),e.createSection("Scale",!1),e.addLabeledInput("Min Value","number",s.min||0,l=>r("min",parseInt(l,10))),e.addLabeledInput("Max Value","number",s.max||100,l=>r("max",parseInt(l,10))),e.endSection(),e.createSection("Preview",!1),e.addLabeledInput("Value (Preview)","number",s.value!==void 0?s.value:60,l=>r("value",parseInt(l,10))),e.endSection(),e.createSection("Appearance",!1),e.addColorMixer("Scale Color",s.color||"black",l=>r("color",l)),e.addColorMixer("Needle Color",s.indicator_color||"red",l=>r("indicator_color",l)),e.addLabeledInput("Scale Width","number",s.scale_width||10,l=>r("scale_width",parseInt(l,10))),e.addLabeledInput("Needle Width","number",s.indicator_width||4,l=>r("indicator_width",parseInt(l,10))),e.addLabeledInput("Ticks","number",s.tick_count||11,l=>r("tick_count",parseInt(l,10))),e.addLabeledInput("Tick Length","number",s.tick_length||10,l=>r("tick_length",parseInt(l,10))),e.addLabeledInput("Label Gap","number",s.label_gap||10,l=>r("label_gap",parseInt(l,10))),e.endSection()}else o==="lvgl_button"?(e.addLabeledInputWithPicker("Action Entity ID","text",n.entity_id||"",a=>g.updateWidget(n.id,{entity_id:a}),n),e.addHint("Entity to toggle/trigger when clicked"),e.addLabeledInput("Text","text",s.text||"BTN",a=>r("text",a)),e.addColorMixer("Background Color",s.bg_color||"white",a=>r("bg_color",a)),e.addColorMixer("Text Color",s.color||"black",a=>r("color",a)),e.addLabeledInput("Border Width","number",s.border_width||2,a=>r("border_width",parseInt(a,10))),e.addLabeledInput("Corner Radius","number",s.radius||5,a=>r("radius",parseInt(a,10))),e.addCheckbox("Checkable (Toggle)",s.checkable||!1,a=>r("checkable",a))):o==="lvgl_arc"?(e.addLabeledInputWithPicker("Sensor Entity ID","text",n.entity_id||"",a=>g.updateWidget(n.id,{entity_id:a}),n),e.addHint("Sensor to bind to arc value"),e.addLabeledInput("Title / Label","text",s.title||"",a=>r("title",a)),e.addLabeledInput("Min Value","number",s.min||0,a=>r("min",parseInt(a,10))),e.addLabeledInput("Max Value","number",s.max||100,a=>r("max",parseInt(a,10))),e.addLabeledInput("Default/Preview Value","number",s.value||0,a=>r("value",parseInt(a,10))),e.addLabeledInput("Thickness","number",s.thickness||10,a=>r("thickness",parseInt(a,10))),e.addLabeledInput("Start Angle","number",s.start_angle||135,a=>r("start_angle",parseInt(a,10))),e.addLabeledInput("End Angle","number",s.end_angle||45,a=>r("end_angle",parseInt(a,10))),e.addSelect("Mode",s.mode||"NORMAL",["NORMAL","SYMMETRICAL","REVERSE"],a=>r("mode",a)),e.addColorMixer("Color",s.color||"blue",a=>r("color",a))):o==="lvgl_chart"?(e.addLabeledInputWithPicker("Entity ID","text",n.entity_id||"",a=>g.updateWidget(n.id,{entity_id:a}),n),e.addLabeledInput("Title","text",s.title||"",a=>r("title",a)),e.addSelect("Type",s.type||"LINE",["LINE","SCATTER","BAR"],a=>r("type",a)),e.addLabeledInput("Min Value","number",s.min||0,a=>r("min",parseInt(a,10))),e.addLabeledInput("Max Value","number",s.max||100,a=>r("max",parseInt(a,10))),e.addLabeledInput("Point Count","number",s.point_count||10,a=>r("point_count",parseInt(a,10))),e.addLabeledInput("X Div Lines","number",s.x_div_lines||3,a=>r("x_div_lines",parseInt(a,10))),e.addLabeledInput("Y Div Lines","number",s.y_div_lines||3,a=>r("y_div_lines",parseInt(a,10))),e.addColorMixer("Color",s.color||"black",a=>r("color",a))):o==="lvgl_img"?(e.addLabeledInput("Source (Image/Symbol)","text",s.src||"",a=>r("src",a)),e.addHint("e.g. symbol_ok, symbol_home, or /image.png"),e.addLabeledInput("Rotation (0.1 deg)","number",s.rotation||0,a=>r("rotation",parseInt(a,10))),e.addLabeledInput("Scale (256 = 1x)","number",s.scale||256,a=>r("scale",parseInt(a,10))),e.addColorMixer("Color (Tint)",s.color||"black",a=>r("color",a))):o==="lvgl_qrcode"?(e.addLabeledInput("Content / URL","text",s.text||"",a=>r("text",a)),e.addLabeledInput("Size (px)","number",s.size||100,a=>r("size",parseInt(a,10))),e.addColorMixer("Color",s.color||"black",a=>r("color",a)),e.addColorMixer("Background Color",s.bg_color||"white",a=>r("bg_color",a))):o==="lvgl_bar"?(e.addLabeledInputWithPicker("Entity ID","text",n.entity_id||"",a=>g.updateWidget(n.id,{entity_id:a}),n),e.addLabeledInput("Min","number",s.min||0,a=>r("min",parseInt(a,10))),e.addLabeledInput("Max","number",s.max||100,a=>r("max",parseInt(a,10))),e.addLabeledInput("Value","number",s.value||50,a=>r("value",parseInt(a,10))),e.addColorMixer("Bar Color",s.color||"black",a=>r("color",a)),e.addColorMixer("Background Color",s.bg_color||"gray",a=>r("bg_color",a)),e.addLabeledInput("Start Value","number",s.start_value||0,a=>r("start_value",parseInt(a,10))),e.addSelect("Mode",s.mode||"NORMAL",["NORMAL","SYMMETRICAL","REVERSE"],a=>r("mode",a)),e.addCheckbox("Range Mode",s.range_mode||!1,a=>r("range_mode",a))):o==="lvgl_slider"?(e.addLabeledInputWithPicker("Entity ID","text",n.entity_id||"",a=>g.updateWidget(n.id,{entity_id:a}),n),e.addSegmentedControl("Orientation",[{value:"Horizontal",label:"Horiz",icon:"mdi-arrow-left-right"},{value:"Vertical",label:"Vert",icon:"mdi-arrow-up-down"}],s.vertical?"Vertical":"Horizontal",a=>{const l=a==="Vertical",c=n.width,d=n.height;g.updateWidget(n.id,{props:{...s,vertical:l},width:d,height:c})}),e.addCompactPropertyRow(()=>{e.addLabeledInput("Min","number",s.min||0,a=>r("min",parseInt(a,10))),e.addLabeledInput("Max","number",s.max||100,a=>r("max",parseInt(a,10)))}),e.addNumberWithSlider("Value",s.value||30,s.min||0,s.max||100,a=>r("value",a)),e.addColorMixer("Knob/Bar Color",s.color||"black",a=>r("color",a)),e.addColorMixer("Track Color",s.bg_color||"gray",a=>r("bg_color",a)),e.addLabeledInput("Border Width","number",s.border_width||2,a=>r("border_width",parseInt(a,10))),e.addSelect("Mode",s.mode||"NORMAL",["NORMAL","SYMMETRICAL","REVERSE"],a=>r("mode",a))):o==="lvgl_tabview"?(e.addLabeledInput("Tabs (comma separated)","text",(s.tabs||[]).join(", "),a=>{const l=a.split(",").map(c=>c.trim()).filter(c=>c);r("tabs",l)}),e.addColorMixer("Background Color",s.bg_color||"white",a=>r("bg_color",a))):o==="lvgl_checkbox"?(e.addLabeledInputWithPicker("Entity ID","text",n.entity_id||"",a=>g.updateWidget(n.id,{entity_id:a}),n),e.addLabeledInput("Label","text",s.text||"Checkbox",a=>r("text",a)),e.addCheckbox("Checked",s.checked||!1,a=>r("checked",a)),e.addColorMixer("Color",s.color||"blue",a=>r("color",a))):o==="lvgl_dropdown"?(e.addLabeledInput("Options (one per line)","textarea",s.options||"",a=>r("options",a)),e.addCompactPropertyRow(()=>{e.addLabeledInput("Index","number",s.selected_index||0,a=>r("selected_index",parseInt(a,10))),e.addLabeledInput("Max H","number",s.max_height||200,a=>r("max_height",parseInt(a,10)))}),e.addSegmentedControl("Direction",[{value:"DOWN",icon:"mdi-arrow-down"},{value:"UP",icon:"mdi-arrow-up"},{value:"LEFT",icon:"mdi-arrow-left"},{value:"RIGHT",icon:"mdi-arrow-right"}],s.direction||"DOWN",a=>r("direction",a)),e.addColorMixer("Color",s.color||"white",a=>r("color",a))):o==="lvgl_switch"?(e.addLabeledInputWithPicker("Entity ID","text",n.entity_id||"",a=>g.updateWidget(n.id,{entity_id:a}),n),e.addCheckbox("Checked",s.checked||!1,a=>r("checked",a)),e.addColorMixer("Indicator Color",s.color||"blue",a=>r("color",a)),e.addColorMixer("Background Color",s.bg_color||"gray",a=>r("bg_color",a)),e.addColorMixer("Knob Color",s.knob_color||"white",a=>r("knob_color",a))):o==="lvgl_textarea"&&(e.addLabeledInput("Placeholder","text",s.placeholder||"",a=>r("placeholder",a)),e.addLabeledInput("Text","text",s.text||"",a=>r("text",a)),e.addCheckbox("One Line",s.one_line||!1,a=>r("one_line",a)),e.addCheckbox("Password Mode",s.password_mode||!1,a=>r("password_mode",a)),e.addLabeledInput("Accepted Chars","text",s.accepted_chars||"",a=>r("accepted_chars",a)),e.addLabeledInput("Max Length","number",s.max_length||0,a=>r("max_length",parseInt(a,10))));e.endSection()}}}class Tl{constructor(){this.panel=document.getElementById("propertiesPanel"),this.controls=new Il(this),this.lastRenderedWidgetId=null,this.activeWidget=null,this.containerStack=[],this.sectionStates={}}init(){Y(C.SELECTION_CHANGED,()=>this.render()),Y(C.STATE_CHANGED,()=>this.render()),Y(C.WIDGET_SELECTED,()=>this.render()),Y(C.WIDGETS_SELECTED,()=>this.render()),Y(C.PAGE_SELECTED,()=>this.render()),Y(C.PAGE_UPDATED,()=>this.render());const e=document.getElementById("snapToggle");e&&(e.checked=g.snapEnabled,e.addEventListener("change",o=>{g.setSnapEnabled(o.target.checked)}),Y(C.SETTINGS_CHANGED,o=>{o.snapEnabled!==void 0&&(e.checked=o.snapEnabled)}));const n=document.getElementById("lockPositionToggle");n&&n.addEventListener("change",o=>{const i=g.selectedWidgetIds;i.length>0&&g.updateWidgets(i,{locked:o.target.checked})}),this.render()}render(){if(!this.panel||window.Canvas&&window.Canvas.lassoState)return;const e=g.selectedWidgetId;if(!(this.lastRenderedWidgetId!==e)&&this.panel&&this.panel.isConnected){const p=document.activeElement;if(p&&this.panel.contains(p)){const f=p.tagName.toLowerCase(),y=p.type?p.type.toLowerCase():"";if(!(f==="input"&&["checkbox","radio","button"].includes(y)||f==="select")&&(f==="input"||f==="textarea"||p.classList.contains("prop-input")))return}}this.lastRenderedWidgetId=e,this.containerStack=[],this.panel.innerHTML="";const o=document.getElementById("lockPositionToggle");if(o){const p=g.getSelectedWidgets(),f=p.length>0&&p.every(m=>m.locked),y=p.some(m=>m.locked);o.checked=f,o.indeterminate=y&&!f,o.disabled=p.length===0}const i=g.getSelectedWidgetIds?g.getSelectedWidgetIds():g.selectedWidgetId?[g.selectedWidgetId]:[];if(i.length===0){this.panel.innerHTML="<div style='padding:16px;color:#aaa;text-align:center;'>Select a widget to edit properties</div>";return}if(i.length>1){kl.render(this,i);return}const s=g.getSelectedWidget();if(!s)return;const r=s.type,a=U.get(r);let l=r;r==="nav_next_page"?l="next page":r==="nav_previous_page"?l="previous page":r==="nav_reload_page"?l="reload page":l=r.replace(/_/g," ");const c=document.createElement("div");c.className="sidebar-section-label",c.style.marginTop="0",c.style.textTransform="capitalize",c.textContent=`${l} Properties`,this.panel.appendChild(c),(g.getCurrentPage()?.layout||"absolute")==="absolute"&&(this.createSection("Transform",!1),this.addCompactPropertyRow(()=>{this.addLabeledInput("Pos X","number",s.x,p=>{g.updateWidget(s.id,{x:parseInt(p,10)||0})}),this.addLabeledInput("Pos Y","number",s.y,p=>{g.updateWidget(s.id,{y:parseInt(p,10)||0})})}),this.addCompactPropertyRow(()=>{this.addLabeledInput("Width","number",s.width,p=>{g.updateWidget(s.id,{width:parseInt(p,10)||10})}),this.addLabeledInput("Height","number",s.height,p=>{g.updateWidget(s.id,{height:parseInt(p,10)||10})})}),this.endSection()),Pl.render(this,s,r);const h=g.settings?.renderingMode||"direct";a&&a.schema?Cl.render(this,s,a.schema):a&&a.renderProperties?a.renderProperties(this,s):h==="oepl"||h==="opendisplay"?Xn.renderProtocolProperties(this,s,r):Xn.renderLegacyProperties(this,s,r),this.createSection("Visibility Conditions",!1),this.addVisibilityConditions(s),this.endSection()}createSection(e,n=!0){const o=this.sectionStates[e]!==void 0?this.sectionStates[e]===!1:!n,i=document.createElement("div");i.className="properties-section"+(o?" collapsed":"");const s=document.createElement("div");s.className="properties-section-header",s.innerHTML=`<span>${e}</span> <span class="icon mdi mdi-chevron-down"></span>`,s.onclick=a=>{a.stopPropagation();const l=i.classList.toggle("collapsed");this.sectionStates[e]=!l};const r=document.createElement("div");return r.className="properties-section-content",i.appendChild(s),i.appendChild(r),this.sectionStates[e]===void 0&&(this.sectionStates[e]=!o),this.getContainer().appendChild(i),this.containerStack.push(r),r}endSection(){this.containerStack.length>0&&this.containerStack.pop()}getContainer(){return this.containerStack.length>0?this.containerStack[this.containerStack.length-1]:this.panel}autoPopulateTitleFromEntity(e,n){if(!n||!window.AppState||!window.AppState.entityStates)return;const o=window.AppState.entityStates[n];o&&o.attributes&&o.attributes.friendly_name&&g.updateWidget(e,{title:o.attributes.friendly_name})}addLabeledInput(...e){return this.controls.addLabeledInput(...e)}addSelect(...e){return this.controls.addSelect(...e)}addCheckbox(...e){return this.controls.addCheckbox(...e)}addHint(...e){return this.controls.addHint(...e)}addLabeledInputWithPicker(...e){return this.controls.addLabeledInputWithPicker(...e)}addColorSelector(...e){return this.controls.addColorSelector(...e)}addColorMixer(...e){return this.controls.addColorMixer(...e)}addSegmentedControl(...e){return this.controls.addSegmentedControl(...e)}addIconPicker(...e){return this.controls.addIconPicker?this.controls.addIconPicker(...e):null}addNumberWithSlider(...e){return this.controls.addNumberWithSlider(...e)}addCompactPropertyRow(...e){return this.controls.addCompactPropertyRow(...e)}addCommonLVGLProperties(...e){return this.controls.addCommonLVGLProperties(...e)}addVisibilityConditions(...e){return this.controls.addVisibilityConditions(...e)}addPageSelector(...e){return this.controls.addPageSelector(...e)}addIconInput(...e){return this.controls.addIconInput?this.controls.addIconInput(...e):null}addLabeledInputWithIconPicker(...e){return this.controls.addLabeledInputWithIconPicker?this.controls.addLabeledInputWithIconPicker(...e):null}addDropShadowButton(e,n){const o=document.createElement("div");o.className="field",o.style.marginTop="8px";const i=document.createElement("button");i.className="btn btn-secondary btn-full btn-xs",i.innerHTML='<span class="mdi mdi-box-shadow"></span> Create Drop Shadow',i.onclick=()=>{const s=g.selectedWidgetIds||[];s.includes(n)?g.createDropShadow(s):g.createDropShadow(n)},o.appendChild(i),e.appendChild(o)}addLabeledInputWithDataList(...e){return this.controls.addLabeledInputWithDataList(...e)}addSectionLabel(...e){return this.controls.addSectionLabel(...e)}}function Al(t){const{name:e,chip:n,resWidth:o,resHeight:i,shape:s,psram:r,displayDriver:a,pins:l,touchTech:c}=t,d=[];d.push("# ============================================================================"),d.push(`# TARGET DEVICE: ${e}`),d.push(`# Name: ${e}`),d.push(`# Resolution: ${o}x${i}`),d.push(`# Shape: ${s}`),d.push("#");const h=["esp32-c3","esp32-c6","esp8266"].some(b=>(n||"").toLowerCase().includes(b)),p=r&&!h;d.push(`#         - Display Platform: ${a||"Unknown"}`),d.push(`#         - Touchscreen: ${c||"None"}`),d.push(`#         - PSRAM: ${p?"Yes":"No"}`),d.push("# ============================================================================"),d.push("#"),d.push("# SETUP INSTRUCTIONS:"),d.push("#"),d.push("# STEP 1: Copy the Material Design Icons font file"),d.push("#         - From this repo: font_ttf/font_ttf/materialdesignicons-webfont.ttf"),d.push("#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf"),d.push("#         (Create the fonts folder if it doesn't exist)"),d.push("#"),d.push("# STEP 2: Create a new device in ESPHome"),d.push('#         - Click "New Device"'),d.push("#         - Name: your-device-name"),n==="esp32"?(d.push("#         - Select: ESP32"),d.push("#         - Board: esp32dev (or specific board)"),d.push("#         - Framework: esp-idf (Recommended) or arduino")):n==="esp8266"?(d.push("#         - Select: ESP8266"),d.push("#         - Board: nodemcuv2 (or specific board)"),d.push("#         - Framework: arduino (Default)")):n==="esp32-c3"?(d.push("#         - Select: ESP32-C3"),d.push("#         - Board: esp32-c3-devkitm-1"),d.push("#         - Framework: esp-idf (Recommended) or arduino")):n==="esp32-c6"?(d.push("#         - Select: ESP32-C6"),d.push("#         - Board: esp32-c6-devkitc-1"),d.push("#         - Framework: esp-idf (Recommended)")):(d.push("#         - Select: ESP32-S3"),d.push("#         - Board: esp32-s3-devkitc-1"),d.push("#         - Framework: esp-idf (Recommended) or arduino")),d.push("#"),d.push("# ============================================================================"),d.push(""),d.push("# Infrastructure (Comment out if pasting into existing config)"),d.push("# esphome: # (Auto-commented)"),d.push(`#   name: ${e.toLowerCase().replace(/[^a-z0-9]/g,"-")}`),d.push("#"),n==="esp8266"?d.push("# esp8266: # (Auto-commented)"):d.push("# esp32: # (Auto-commented)"),d.push(`#   board: ${Ml(n)}`),n!=="esp8266"&&(d.push("#   framework:"),d.push("#     type: esp-idf")),p&&n.includes("s3")&&(d.push("#     # For stability on S3 devices with high-res displays/LVGL:"),d.push("#     advanced:"),d.push("#       execute_from_psram: true")),d.push(""),p&&(d.push("# psram: # (Auto-commented)"),n.includes("s3")&&(d.push("#   # Quad or Octal depending on your board"),d.push("#   mode: quad"),d.push("#   speed: 80MHz")),d.push("")),l.clk&&l.mosi&&(d.push("spi:"),d.push(`  clk_pin: ${l.clk}`),d.push(`  mosi_pin: ${l.mosi}`),l.miso&&d.push(`  miso_pin: ${l.miso}`),d.push("")),l.sda&&l.scl&&(d.push("i2c:"),d.push(`  sda: ${l.sda}`),d.push(`  scl: ${l.scl}`),d.push("  scan: true"),d.push("")),d.push("display:"),d.push(`  - platform: ${a}`),l.cs&&d.push(`    cs_pin: ${l.cs}`),l.dc&&d.push(`    dc_pin: ${l.dc}`),l.rst&&d.push(`    reset_pin: ${l.rst}`),l.busy&&d.push(`    busy_pin: ${l.busy}`),t.displayModel&&d.push(`    model: "${t.displayModel}"`),a==="st7789v"&&!t.displayModel?(d.push("    model: Custom"),d.push("    id: my_display"),d.push(`    width: ${o}`),d.push(`    height: ${i}`),d.push("    offset_height: 0"),d.push("    offset_width: 0")):a==="st7789v"&&(d.push("    id: my_display"),d.push(`    width: ${o}`),d.push(`    height: ${i}`));const f=i>o,y=t.orientation==="portrait"||t.orientation==="portrait_inverted",m=t.orientation==="landscape_inverted"||t.orientation==="portrait_inverted";let _=0;if(f?_=y?0:90:_=y?90:0,m&&(_=(_+180)%360),d.push(`    rotation: ${_}`),d.push("    lambda: |-"),d.push("      # __LAMBDA_PLACEHOLDER__"),d.push(""),l.backlight){const b=t.backlightMinPower??.07,x=t.backlightInitial??.8,S=!!t.antiburn;d.push("output:"),d.push("  - platform: ledc"),d.push(`    pin: ${l.backlight}`),d.push("    id: backlight_brightness_output"),d.push(`    min_power: "${b}"`),d.push("    zero_means_zero: true"),d.push(""),d.push("light:"),d.push("  - platform: monochromatic"),d.push("    output: backlight_brightness_output"),d.push("    id: display_backlight"),d.push("    name: LCD Backlight"),d.push("    icon: mdi:wall-sconce-flat-outline"),d.push("    restore_mode: ALWAYS_ON"),d.push("    initial_state:"),d.push(`      brightness: "${x}"`),S&&(d.push("    on_turn_off:"),d.push("      - script.execute: start_antiburn"),d.push("    on_turn_on:"),d.push("      - script.execute: stop_antiburn")),d.push(""),S&&(d.push("script:"),d.push("  - id: start_antiburn"),d.push("    then:"),d.push("      - delay: 5min"),d.push("      - logger.log: Starting automatic antiburn."),d.push("      - switch.turn_on: switch_antiburn"),d.push("  - id: stop_antiburn"),d.push("    then:"),d.push("      - script.stop: start_antiburn"),d.push("      - switch.turn_off: switch_antiburn"),d.push(""),d.push("switch:"),d.push("  - platform: template"),d.push("    name: Antiburn"),d.push("    id: switch_antiburn"),d.push("    icon: mdi:television-shimmer"),d.push("    optimistic: true"),d.push("    entity_category: config"),d.push("    turn_on_action:"),d.push('      - logger.log: "Starting Antiburn"'),d.push("      - if:"),d.push("          condition: lvgl.is_paused"),d.push("          then:"),d.push("            - lvgl.resume:"),d.push("            - lvgl.widget.redraw:"),d.push("      - lvgl.pause:"),d.push("          show_snow: true"),d.push("    turn_off_action:"),d.push('      - logger.log: "Stopping Antiburn"'),d.push("      - if:"),d.push("          condition: lvgl.is_paused"),d.push("          then:"),d.push("            - lvgl.resume:"),d.push("            - lvgl.widget.redraw:"),d.push(""))}return c!=="none"&&(d.push("touchscreen:"),d.push(`  - platform: ${c}`),l.touch_int&&d.push(`    interrupt_pin: ${l.touch_int}`),l.touch_rst&&d.push(`    reset_pin: ${l.touch_rst}`),d.push("    on_release:"),d.push("      - if:"),d.push("          condition: lvgl.is_paused"),d.push("          then:"),d.push("            - lvgl.resume:"),d.push("            - lvgl.widget.redraw:"),d.push("            - light.turn_on: display_backlight"),d.push("")),d.join(`
`)}function Ml(t){switch(t){case"esp32-s3":return"esp32-s3-devkitc-1";case"esp32-c3":return"esp32-c3-devkitm-1";case"esp32-c6":return"esp32-c6-devkitc-1";case"esp32":return"esp32dev";case"esp8266":return"nodemcuv2";default:return"esp32-s3-devkitc-1"}}class Dl{constructor(){v.log("[DeviceSettings] Constructor called - Instance ID check"),this.modal=document.getElementById("deviceSettingsModal"),this.closeBtn=document.getElementById("deviceSettingsClose"),this.saveBtn=document.getElementById("deviceSettingsSave"),this.nameInput=document.getElementById("deviceName"),this.modelInput=document.getElementById("deviceModel"),this.orientationInput=document.getElementById("deviceOrientation"),this.darkModeInput=document.getElementById("deviceDarkMode"),this.invertedColorsInput=document.getElementById("deviceInvertedColors"),this.modeStandard=document.getElementById("mode-standard"),this.modeSleep=document.getElementById("setting-sleep-enabled"),this.modeManual=document.getElementById("setting-manual-refresh"),this.modeDeepSleep=document.getElementById("setting-deep-sleep-enabled"),this.modeDaily=document.getElementById("setting-daily-refresh-enabled"),this.sleepStart=document.getElementById("setting-sleep-start"),this.sleepEnd=document.getElementById("setting-sleep-end"),this.sleepRow=document.getElementById("sleep-times-row"),this.dailyRefreshTime=document.getElementById("setting-daily-refresh-time"),this.dailyRefreshRow=document.getElementById("daily-refresh-row"),this.deepSleepInterval=document.getElementById("setting-deep-sleep-interval"),this.deepSleepRow=document.getElementById("deep-sleep-interval-row"),this.refreshIntervalInput=document.getElementById("setting-refresh-interval"),this.refreshIntervalRow=document.getElementById("global-refresh-row"),this.noRefreshStart=document.getElementById("setting-no-refresh-start"),this.noRefreshEnd=document.getElementById("setting-no-refresh-end"),this.dimTimeoutInput=document.getElementById("setting-dim-timeout"),this.dimTimeoutRow=document.getElementById("dim-timeout-row"),this.autoCycleEnabled=document.getElementById("setting-auto-cycle"),this.autoCycleInterval=document.getElementById("setting-auto-cycle-interval"),this.autoCycleRow=document.getElementById("field-auto-cycle-interval"),this.customHardwareSection=document.getElementById("customHardwareSection"),this.customFieldsContainer=this.customHardwareSection,this.customChip=document.getElementById("customChip"),this.customTech=document.getElementById("customTech"),this.customResPreset=document.getElementById("customResPreset"),this.customRes=document.getElementById("customRes"),this.customShape=document.getElementById("customShape"),this.customPsram=document.getElementById("customPsram"),this.customDisplayDriver=document.getElementById("customDisplayDriver"),this.customDisplayModel=document.getElementById("customDisplayModel"),this.customDisplayModelField=document.getElementById("customDisplayModelField"),this.customTouchTech=document.getElementById("customTouchTech"),this.touchPinsGrid=document.getElementById("touchPinsGrid"),this.customProfileNameInput=document.getElementById("customProfileName"),this.strategyEpaperGroup=document.getElementById("strategy-epaper-group"),this.strategyLcdGroup=document.getElementById("strategy-lcd-group"),this.renderingModeInput=document.getElementById("renderingMode"),this.renderingModeField=document.getElementById("renderingModeField"),this.oeplSettingsSection=document.getElementById("oeplSettingsSection"),this.oeplEntityIdInput=document.getElementById("oeplEntityId"),this.oeplDitherInput=document.getElementById("oeplDither"),this.odpSettingsSection=document.getElementById("odpSettingsSection"),this.odpEntityIdInput=document.getElementById("opendisplayEntityId"),this.odpDitherInput=document.getElementById("opendisplayDither"),this.odpTtlInput=document.getElementById("opendisplayTtl"),this.protocolHardwareSection=document.getElementById("protocolHardwareSection"),this.protocolResPreset=document.getElementById("protocolResPreset"),this.protocolWidth=document.getElementById("protocolWidth"),this.protocolHeight=document.getElementById("protocolHeight"),this.protocolColorMode=document.getElementById("protocolColorMode"),this.deviceModelField=document.getElementById("deviceModelField"),this.powerStrategySection=document.getElementById("powerStrategySection"),this.deviceInvertedColorsField=document.getElementById("deviceInvertedColorsField")}init(){this.closeBtn&&this.closeBtn.addEventListener("click",()=>this.close());const e=document.getElementById("reloadHardwareBtn");e&&e.addEventListener("click",async i=>{i.preventDefault(),await this.reloadHardwareProfiles()}),document.querySelectorAll(".clear-pin-btn").forEach(i=>{i.addEventListener("click",s=>{s.preventDefault();const r=i.getAttribute("data-target"),a=document.getElementById(r);a&&(a.value="",a.dispatchEvent(new Event("input",{bubbles:!0})))})});const n=document.getElementById("importHardwareBtn"),o=document.getElementById("hardwareFileInput");n&&o&&(n.addEventListener("click",i=>{i.preventDefault(),o.click()}),o.addEventListener("change",async i=>{if(i.target.files.length>0){const s=i.target.files[0];try{await Fn(s)}catch{}o.value=""}})),this.populateDeviceSelect(),this.saveBtn&&this.saveBtn.addEventListener("click",()=>this.close()),this.setupAutoSaveListeners(),this.setupCustomHardwareListeners(),this.setupProtocolHardwareListeners()}setupCustomHardwareListeners(){if(!this.modelInput)return;this.modelInput.addEventListener("change",()=>{this.updateCustomSectionVisibility()}),this.customTech&&this.customTech.addEventListener("change",()=>{this.updateStrategyGroupVisibility()}),this.customChip&&this.customChip.addEventListener("change",()=>{this.updatePinDatalist()}),this.customDisplayDriver&&this.customDisplayDriver.addEventListener("change",()=>{this.updateDisplayModelVisibility()}),this.customTouchTech&&this.customTouchTech.addEventListener("change",()=>{this.touchPinsGrid&&(this.touchPinsGrid.style.display=this.customTouchTech.value==="none"?"none":"grid")}),this.customShape&&this.customShape.addEventListener("change",()=>{if(this.customShape.value==="round"&&this.customRes){const n=(this.customRes.value||"800x480").split("x"),o=parseInt(n[0])||480,i=parseInt(n[1])||480,s=Math.min(o,i);this.customRes.value=`${s}x${s}`,v.log(`[DeviceSettings] Auto-set square resolution for round display: ${s}x${s}`),this.customResPreset&&(this.customResPreset.value="custom"),this.customRes.dispatchEvent(new Event("change"))}}),this.customResPreset&&this.customRes&&(this.customResPreset.addEventListener("change",()=>{const n=this.customResPreset.value;n!=="custom"&&(this.customRes.value=n,v.log(`[DeviceSettings] Applied resolution preset: ${n}`),this.customRes.dispatchEvent(new Event("change")))}),this.customRes.addEventListener("input",()=>{const n=this.customRes.value;Array.from(this.customResPreset.options).some(i=>i.value===n)?this.customResPreset.value=n:this.customResPreset.value="custom"}));const e=document.getElementById("saveCustomProfileBtn");if(e){const n=e.cloneNode(!0);e.parentNode.replaceChild(n,e),n.addEventListener("click",async o=>{o.preventDefault(),!this._isSavingProfile&&(v.log("[DeviceSettings] Save button clicked"),await this.handleSaveCustomProfile())})}else{const n=document.getElementById("deviceSettingsModal");n&&n.addEventListener("click",async o=>{if(o.target&&o.target.id==="saveCustomProfileBtn"){if(o.preventDefault(),this._isSavingProfile)return;v.log("[DeviceSettings] Save button clicked (Delegate)"),await this.handleSaveCustomProfile()}})}this.setupCustomHardwareAutoSave()}setupProtocolHardwareListeners(){const e=()=>{const n=parseInt(this.protocolWidth.value)||400,o=parseInt(this.protocolHeight.value)||300,i=this.protocolColorMode.value||"bw";g.updateProtocolHardware({width:n,height:o,colorMode:i})};this.protocolResPreset&&this.protocolResPreset.addEventListener("change",()=>{const n=this.protocolResPreset.value;if(n!=="custom"){const[o,i]=n.split("x").map(Number);this.protocolWidth.value=o,this.protocolHeight.value=i,e()}}),this.protocolWidth&&this.protocolWidth.addEventListener("input",e),this.protocolHeight&&this.protocolHeight.addEventListener("input",e),this.protocolColorMode&&this.protocolColorMode.addEventListener("change",e)}setupCustomHardwareAutoSave(){const e=[this.customChip,this.customTech,this.customResPreset,this.customRes,this.customShape,this.customPsram,this.customDisplayDriver,this.customDisplayModel,this.customTouchTech,"pin_cs","pin_dc","pin_rst","pin_busy","pin_clk","pin_mosi","pin_backlight","pin_sda","pin_scl","pin_touch_int","pin_touch_rst","pin_battery_adc","pin_battery_enable"],n=()=>{if(this.modelInput.value==="custom"){const o=this.getCustomHardwareConfig();g.setCustomHardware(o)}};e.forEach(o=>{const i=typeof o=="string"?document.getElementById(o):o;if(!i)return;const s=i.type==="checkbox"||i.tagName==="SELECT"?"change":"input";i.addEventListener(s,n)})}getCustomHardwareConfig(){const e=(this.customRes?.value||"800x480").split("x"),n=o=>{const i=document.getElementById(o);return i?i.value:""};return{chip:this.customChip?.value||"esp32-s3",tech:this.customTech?.value||"lcd",resWidth:parseInt(e[0])||800,resHeight:parseInt(e[1])||480,shape:this.customShape?.value||"rect",psram:this.customPsram?.checked??!0,displayDriver:this.customDisplayDriver?.value||"st7789v",displayModel:this.customDisplayModel?.value||"",touchTech:this.customTouchTech?.value||"none",backlightMinPower:parseFloat(n("customBacklightMinPower"))||.07,backlightInitial:parseFloat(n("customBacklightInitial"))||.8,antiburn:!!document.getElementById("customAntiburn")?.checked,pins:{cs:n("pin_cs"),dc:n("pin_dc"),rst:n("pin_rst"),busy:n("pin_busy"),clk:n("pin_clk"),mosi:n("pin_mosi"),backlight:n("pin_backlight"),sda:n("pin_sda"),scl:n("pin_scl"),touch_int:n("pin_touch_int"),touch_rst:n("pin_touch_rst"),batteryAdc:n("pin_battery_adc"),batteryEnable:n("pin_battery_enable")},orientation:this.orientationInput?.value||"landscape"}}updateCustomSectionVisibility(){if(!this.customHardwareSection)return;const e=this.renderingModeInput?this.renderingModeInput.value:g.settings.renderingMode||"direct",n=e==="oepl"||e==="opendisplay",o=this.modelInput&&this.modelInput.value==="custom";this.customHardwareSection.style.display=!n&&o?"block":"none",this.updateDisplayModelVisibility()}updateDisplayModelVisibility(){if(this.customDisplayModelField&&this.customDisplayDriver){const e=this.customDisplayDriver.value==="waveshare_epaper";this.customDisplayModelField.style.display=e?"block":"none"}}updatePinDatalist(){const e=this.customChip?.value||"esp32-s3";let n="gpio-pins-esp32s3";e==="esp32"?n="gpio-pins-esp32":e==="esp8266"&&(n="gpio-pins-esp8266"),["pin_cs","pin_dc","pin_rst","pin_busy","pin_clk","pin_mosi","pin_backlight","pin_sda","pin_scl","pin_touch_int","pin_touch_rst","pin_battery_adc","pin_battery_enable"].forEach(s=>{const r=document.getElementById(s);r&&r.setAttribute("list",n)});const i=["esp32-c3","esp32-c6","esp8266"];this.customPsram&&(i.some(r=>e.toLowerCase().includes(r))?(this.customPsram.checked=!1,this.customPsram.disabled=!0):this.customPsram.disabled=!1),v.log(`[DeviceSettings] Updated pin datalists to: ${n}`)}async handleSaveCustomProfile(){if(this._isSavingProfile)return;this._isSavingProfile=!0,this.saveDebounceTimer&&(clearTimeout(this.saveDebounceTimer),this.saveDebounceTimer=null),v.log("[DeviceSettings] handleSaveCustomProfile called (Auto-save blocked)");const e=document.getElementById("saveCustomProfileBtn"),n=e?e.textContent:"Save Profile";try{const o=this.customProfileNameInput?this.customProfileNameInput.value.trim():"";if(!o){A("Please enter a name for your custom profile first.","warning"),this.customProfileNameInput&&this.customProfileNameInput.focus();return}e&&(e.disabled=!0,e.textContent="Saving...");const i=(this.customRes?.value||"800x480").split("x"),s=h=>{const p=document.getElementById(h);return p?p.value:""},r={name:o,chip:this.customChip?.value||"esp32-s3",tech:this.customTech?.value||"lcd",resWidth:parseInt(i[0])||800,resHeight:parseInt(i[1])||480,shape:this.customShape?.value||"rect",psram:this.customPsram?.checked??!0,displayDriver:this.customDisplayDriver?.value||"st7789v",displayModel:this.customDisplayModel?.value||"",touchTech:this.customTouchTech?.value||"none",pins:{cs:s("pin_cs"),dc:s("pin_dc"),rst:s("pin_rst"),busy:s("pin_busy"),clk:s("pin_clk"),mosi:s("pin_mosi"),backlight:s("pin_backlight"),sda:s("pin_sda"),scl:s("pin_scl"),touch_int:s("pin_touch_int"),touch_rst:s("pin_touch_rst"),batteryAdc:s("pin_battery_adc"),batteryEnable:s("pin_battery_enable")},orientation:this.orientationInput?.value||"landscape"},a=Al(r),l=new Blob([a],{type:"text/yaml"}),c=`${o.toLowerCase().replace(/\s+/g,"_")}.yaml`,d=new File([l],c);A("Generating hardware recipe...","info");let u=!1;try{await Fn(d),u=!0}catch(h){const p=h.message||"";if(p.includes("Failed to fetch")||p.includes("NetworkError"))v.warn("[DeviceSettings] Upload network error (likely benign):",p),u=!0;else throw h}if(u){const p=`custom_${c.replace(".yaml","").replace(/-/g,"_").replace(/\./g,"_")}`;A("Reloading profile list...","info"),await this.reloadHardwareProfiles();let f=0;const y=10,m=async()=>{const _=window.DEVICE_PROFILES||B||{},b=Object.keys(_);v.log(`[DeviceSettings] Looking for '${p}' in ${b.length} profiles...`);const x=b.find(E=>E===p);if(x){this.modelInput.value=x,this.modelInput.dispatchEvent(new Event("change")),A(`Profile "${o}" created and loaded!`,"success");return}const S=b.find(E=>{const w=_[E];return w.name===o||w.name&&w.name.includes(o)});if(S){this.modelInput.value=S,this.modelInput.dispatchEvent(new Event("change")),A(`Profile "${o}" created and loaded!`,"success");return}f<y?(f++,v.log(`[DeviceSettings] Profile '${p}' not found (attempt ${f})...`),f===5&&await this.reloadHardwareProfiles(),setTimeout(m,800)):(v.error("[DeviceSettings] Failed to find newly created profile."),A("Profile created, but could not be auto-selected. Please click Reload.","warning"))};setTimeout(m,500)}}catch(o){v.error("Failed to save custom profile:",o),A("Failed to create profile: "+(o.message||"Unknown error"),"error")}finally{this._isSavingProfile=!1,e&&(e.disabled=!1,e.textContent=n)}}async reloadHardwareProfiles(){const e=document.getElementById("reloadHardwareBtn"),n=e?e.textContent:"";try{e&&(e.disabled=!0,e.textContent="⟳ Loading..."),A("Reloading hardware profiles...","info"),v.log("[DeviceSettings] Force reloading hardware profiles..."),await un(),this.populateDeviceSelect(),this.modelInput&&this.modelInput.dispatchEvent(new Event("change"));const o=Object.keys(B||{}).length;A(`Reloaded ${o} hardware profiles successfully!`,"success"),v.log("[DeviceSettings] Hardware profiles reloaded, dropdown refreshed")}catch(o){v.error("[DeviceSettings] Failed to reload hardware profiles:",o),A("Failed to reload profiles: "+o.message,"error")}finally{e&&(e.disabled=!1,e.textContent=n)}}open(){if(v.log("DeviceSettings.open() called"),!this.modal){v.error("DeviceSettings modal element not found!");return}v.log("Opening Device Settings modal..."),this.nameInput&&(this.nameInput.value=g.settings.device_name||"My E-Ink Display"),this.modelInput&&(this.modelInput.value=g.settings.device_model||"reterminal_e1001"),this.renderingModeInput&&(this.renderingModeInput.value=g.settings.renderingMode||"direct"),this.orientationInput&&(this.orientationInput.value=g.settings.orientation||"landscape"),this.darkModeInput&&(this.darkModeInput.checked=!!g.settings.darkMode),this.invertedColorsInput&&(this.invertedColorsInput.checked=!!g.settings.invertedColors);const e=g.settings,n=!!e.sleepEnabled,o=!!e.manualRefreshOnly,i=!!e.deepSleepEnabled,s=!!e.dailyRefreshEnabled,r=!n&&!o&&!i&&!s;this.modeStandard&&(this.modeStandard.checked=r),this.modeSleep&&(this.modeSleep.checked=n),this.modeManual&&(this.modeManual.checked=o),this.modeDeepSleep&&(this.modeDeepSleep.checked=i),this.modeDaily&&(this.modeDaily.checked=s),this.sleepStart&&(this.sleepStart.value=e.sleepStartHour??0),this.sleepEnd&&(this.sleepEnd.value=e.sleepEndHour??5),this.dailyRefreshTime&&(this.dailyRefreshTime.value=e.dailyRefreshTime||"08:00"),this.deepSleepInterval&&(this.deepSleepInterval.value=e.deepSleepInterval??600),this.refreshIntervalInput&&(this.refreshIntervalInput.value=e.refreshInterval??600),this.dimTimeoutInput&&(this.dimTimeoutInput.value=e.dimTimeout??10),this.noRefreshStart&&(this.noRefreshStart.value=e.noRefreshStartHour??""),this.noRefreshEnd&&(this.noRefreshEnd.value=e.noRefreshEndHour??""),this.autoCycleEnabled&&(this.autoCycleEnabled.checked=!!e.autoCycleEnabled),this.autoCycleInterval&&(this.autoCycleInterval.value=e.autoCycleIntervalS??30),this.oeplEntityIdInput&&(this.oeplEntityIdInput.value=e.oeplEntityId||""),this.oeplDitherInput&&(this.oeplDitherInput.value=e.oeplDither??2),this.odpEntityIdInput&&(this.odpEntityIdInput.value=e.opendisplayEntityId||""),this.odpDitherInput&&(this.odpDitherInput.value=e.opendisplayDither??2),this.odpTtlInput&&(this.odpTtlInput.value=e.opendisplayTtl??60),this.updateVisibility(),this.updateStrategyGroupVisibility(),this.populateCustomFields(),this.populateProtocolFields(),this.updateCustomSectionVisibility(),this.modal.classList.remove("hidden"),this.modal.style.display="flex",v.log("Device Settings modal should be visible now.")}close(){this.modal&&(this.modal.classList.add("hidden"),this.modal.style.display="none")}populateCustomFields(){const e=g.project&&g.project.state&&g.project.state.customHardware||{};if(!e||Object.keys(e).length===0)return;if(this.customChip&&(this.customChip.value=e.chip||"esp32-s3"),this.customTech&&(this.customTech.value=e.tech||"lcd"),this.customRes){const i=`${e.resWidth||800}x${e.resHeight||480}`;this.customRes.value=i,this.customResPreset&&(Array.from(this.customResPreset.options).map(r=>r.value).includes(i)?this.customResPreset.value=i:this.customResPreset.value="custom")}this.customShape&&(this.customShape.value=e.shape||"rect"),this.customPsram&&(this.customPsram.checked=!!e.psram),this.customDisplayDriver&&(this.customDisplayDriver.value=e.displayDriver||"generic_st7789"),this.customDisplayModel&&(this.customDisplayModel.value=e.displayModel||""),this.updateDisplayModelVisibility(),this.customTouchTech&&(this.customTouchTech.value=e.touchTech||"none",this.touchPinsGrid&&(this.touchPinsGrid.style.display=e.touchTech&&e.touchTech!=="none"?"grid":"none"));const n=e.pins||{},o=(i,s)=>{const r=document.getElementById(i);r&&(r.value=s||"")};o("pin_cs",n.cs),o("pin_dc",n.dc),o("pin_rst",n.rst),o("pin_busy",n.busy),o("pin_clk",n.clk),o("pin_mosi",n.mosi),o("pin_backlight",n.backlight),o("pin_sda",n.sda),o("pin_scl",n.scl),o("pin_touch_int",n.touch_int),o("pin_touch_rst",n.touch_rst),o("pin_battery_adc",n.batteryAdc),o("pin_battery_enable",n.batteryEnable)}populateProtocolFields(){const e=g.project&&g.project.protocolHardware||{width:400,height:300,colorMode:"bw"};if(this.protocolWidth&&(this.protocolWidth.value=e.width),this.protocolHeight&&(this.protocolHeight.value=e.height),this.protocolColorMode&&(this.protocolColorMode.value=e.colorMode),this.protocolResPreset){const n=`${e.width}x${e.height}`;Array.from(this.protocolResPreset.options).map(i=>i.value).includes(n)?this.protocolResPreset.value=n:this.protocolResPreset.value="custom"}}populateDeviceSelect(){if(this.modelInput&&B){const e=this.modelInput.value;v.log("[DeviceSettings] Populating dropdown with",Object.keys(B).length,"profiles"),this.modelInput.innerHTML="";const n=ft||[],o=[],i=[];Object.entries(B).forEach(([a,l])=>{l.isCustomProfile||l.isOfflineImport?i.push([a,l]):o.push([a,l])});const s=(a,l)=>{const c=document.createElement("option");c.value=a;let d=l.name||a;d=d.replace(/\s*\(Local\)\s*/gi,"").replace(/\s*\(untested\)\s*/gi,"").trim();const u=[];return(l.isCustomProfile||l.isOfflineImport)&&u.push("Imported"),n.includes(a)||u.push("untested"),u.length>0&&(d+=` (${u.join(", ")})`),c.textContent=d,c};if(o.forEach(([a,l])=>{this.modelInput.appendChild(s(a,l))}),i.length>0&&o.length>0){const a=document.createElement("option");a.disabled=!0,a.textContent="── User-Imported / Custom ──",a.style.fontWeight="bold",a.style.color="var(--text-dim)",this.modelInput.appendChild(a)}i.forEach(([a,l])=>{this.modelInput.appendChild(s(a,l))});const r=document.createElement("option");r.value="custom",r.textContent="Custom Profile...",r.style.fontWeight="bold",r.style.color="var(--accent)",this.modelInput.appendChild(r),e&&(B[e]||e==="custom")?this.modelInput.value=e:this.modelInput.value||(this.modelInput.value="reterminal_e1001"),this.updateCustomSectionVisibility()}}updateVisibility(){const e=this.modeSleep&&this.modeSleep.checked,n=this.modeDaily&&this.modeDaily.checked,o=this.modeDeepSleep&&this.modeDeepSleep.checked,i=this.modeManual&&this.modeManual.checked;this.sleepRow&&(this.sleepRow.style.display=e||o?"flex":"none"),this.dailyRefreshRow&&(this.dailyRefreshRow.style.display=n?"flex":"none"),this.deepSleepRow&&(this.deepSleepRow.style.display=o?"block":"none");const s=g.settings.lcdEcoStrategy||"backlight_off",r=s==="dim_after_timeout",a=s==="backlight_off";this.dimTimeoutRow&&(this.dimTimeoutRow.style.display=r?"flex":"none");const l=this.modelInput?this.modelInput.value:null,c=window.DEVICE_PROFILES||B||{},d=l?c[l]:null,u=!!(d&&d.features&&(d.features.lcd||d.features.oled));this.sleepRow&&u&&(this.sleepRow.style.display=a?"flex":"none");const h=!n&&!i;this.refreshIntervalRow&&(this.refreshIntervalRow.style.display=h?"block":"none"),this.autoCycleRow&&(this.autoCycleRow.style.display=this.autoCycleEnabled&&this.autoCycleEnabled.checked?"flex":"none");const p=this.renderingModeInput?this.renderingModeInput.value:g.settings.renderingMode||"direct",f=p==="oepl"||p==="opendisplay",y=p==="lvgl"||p==="direct";if(this.protocolHardwareSection&&(this.protocolHardwareSection.style.display=f?"block":"none"),this.deviceModelField&&(this.deviceModelField.style.display=f?"none":"block"),this.updateCustomSectionVisibility(),this.powerStrategySection&&(this.powerStrategySection.style.display=y?"block":"none"),this.deviceInvertedColorsField){const m=this.modelInput?this.modelInput.value:null,_=window.DEVICE_PROFILES||B||{},b=m?_[m]:null,x=!!(b&&b.features&&b.features.epaper);this.deviceInvertedColorsField.style.display=y&&x?"block":"none"}}persistToBackend(){if(this._isSavingProfile){v.log("[DeviceSettings] Auto-save skipped because a manual profile save is in progress."),this.saveDebounceTimer&&clearTimeout(this.saveDebounceTimer);return}this.saveDebounceTimer&&clearTimeout(this.saveDebounceTimer),this.saveDebounceTimer=setTimeout(async()=>{if(!this._isSavingProfile)if(z()&&typeof fe=="function")try{await fe(),v.log("[DeviceSettings] All settings persisted to backend")}catch(e){v.warn("[DeviceSettings] Failed to auto-save settings:",e)}else try{const e=g.getPagesPayload();e.deviceName=g.deviceName,e.deviceModel=g.deviceModel,localStorage.setItem("esphome-designer-layout",JSON.stringify(e)),v.log("[DeviceSettings] Settings persisted to localStorage (offline mode)")}catch(e){v.warn("[DeviceSettings] Failed to save to localStorage:",e)}},1e3)}setupAutoSaveListeners(){const e=(s,r)=>{g.updateSettings({[s]:r}),v.log(`Auto-saved ${s}:`,r),this.persistToBackend()};let n=null;this.nameInput&&this.nameInput.addEventListener("input",()=>{const s=this.nameInput.value.trim();g.setDeviceName(s),L(C.STATE_CHANGED),n&&clearTimeout(n),n=setTimeout(async()=>{if(typeof fe=="function")try{await fe(),v.log("[DeviceSettings] Device name saved to backend")}catch(r){v.warn("[DeviceSettings] Failed to save device name:",r)}},500)}),this.modelInput&&this.modelInput.addEventListener("change",async()=>{const s=this.modelInput.value;window.currentDeviceModel=s,g.setDeviceModel(s),e("device_model",s),this.updateStrategyGroupVisibility(),v.log("Device model changed to:",s)}),this.orientationInput&&this.orientationInput.addEventListener("change",()=>{e("orientation",this.orientationInput.value)}),this.darkModeInput&&this.darkModeInput.addEventListener("change",()=>{e("darkMode",this.darkModeInput.checked)}),this.invertedColorsInput&&this.invertedColorsInput.addEventListener("change",()=>{e("invertedColors",this.invertedColorsInput.checked)}),this.renderingModeInput&&this.renderingModeInput.addEventListener("change",()=>{e("renderingMode",this.renderingModeInput.value),this.updateVisibility(),this.updateStrategyGroupVisibility(),v.log("Rendering mode changed to:",this.renderingModeInput.value)}),this.oeplEntityIdInput&&this.oeplEntityIdInput.addEventListener("input",()=>{e("oeplEntityId",this.oeplEntityIdInput.value.trim())}),this.oeplDitherInput&&this.oeplDitherInput.addEventListener("change",()=>{e("oeplDither",parseInt(this.oeplDitherInput.value))}),this.odpEntityIdInput&&this.odpEntityIdInput.addEventListener("input",()=>{e("opendisplayEntityId",this.odpEntityIdInput.value.trim())}),this.odpDitherInput&&this.odpDitherInput.addEventListener("change",()=>{e("opendisplayDither",parseInt(this.odpDitherInput.value))}),this.odpTtlInput&&this.odpTtlInput.addEventListener("input",()=>{e("opendisplayTtl",parseInt(this.odpTtlInput.value)||0)}),[this.modeStandard,this.modeSleep,this.modeManual,this.modeDeepSleep,this.modeDaily].forEach(s=>{s&&s.addEventListener("change",()=>{s.checked&&(e("sleepEnabled",!!(this.modeSleep&&this.modeSleep.checked)),e("manualRefreshOnly",!!(this.modeManual&&this.modeManual.checked)),e("deepSleepEnabled",!!(this.modeDeepSleep&&this.modeDeepSleep.checked)),e("dailyRefreshEnabled",!!(this.modeDaily&&this.modeDaily.checked)),this.updateVisibility())})}),this.sleepStart&&this.sleepStart.addEventListener("change",()=>{e("sleepStartHour",parseInt(this.sleepStart.value)||0)}),this.sleepEnd&&this.sleepEnd.addEventListener("change",()=>{e("sleepEndHour",parseInt(this.sleepEnd.value)||0)}),this.dailyRefreshTime&&this.dailyRefreshTime.addEventListener("change",()=>{e("dailyRefreshTime",this.dailyRefreshTime.value)}),this.deepSleepInterval&&this.deepSleepInterval.addEventListener("input",()=>{const s=parseInt(this.deepSleepInterval.value)||600;e("deepSleepInterval",s),this.refreshIntervalInput&&(this.refreshIntervalInput.value=s,g.updateSettings({refreshInterval:s}))}),this.refreshIntervalInput&&this.refreshIntervalInput.addEventListener("input",()=>{const s=parseInt(this.refreshIntervalInput.value)||600;e("refreshInterval",s),this.deepSleepInterval&&this.modeDeepSleep&&this.modeDeepSleep.checked&&(this.deepSleepInterval.value=s,g.updateSettings({deepSleepInterval:s}))}),this.noRefreshStart&&this.noRefreshStart.addEventListener("change",()=>{const s=this.noRefreshStart.value===""?null:parseInt(this.noRefreshStart.value);e("noRefreshStartHour",s)}),this.noRefreshEnd&&this.noRefreshEnd.addEventListener("change",()=>{const s=this.noRefreshEnd.value===""?null:parseInt(this.noRefreshEnd.value);e("noRefreshEndHour",s)}),this.autoCycleEnabled&&this.autoCycleEnabled.addEventListener("change",()=>{e("autoCycleEnabled",this.autoCycleEnabled.checked),this.updateVisibility()}),this.autoCycleInterval&&this.autoCycleInterval.addEventListener("input",()=>{const s=Math.max(5,parseInt(this.autoCycleInterval.value)||30);e("autoCycleIntervalS",s)}),document.querySelectorAll('input[name="lcdEcoStrategy"]').forEach(s=>{s.addEventListener("change",()=>{s.checked&&(e("lcdEcoStrategy",s.value),this.sleepRow&&(this.sleepRow.style.display=s.value==="backlight_off"?"flex":"none"),this.dimTimeoutRow&&(this.dimTimeoutRow.style.display=s.value==="dim_after_timeout"?"flex":"none"))})}),this.dimTimeoutInput&&this.dimTimeoutInput.addEventListener("input",()=>{const s=parseInt(this.dimTimeoutInput.value)||10;e("dimTimeout",s)})}updateStrategyGroupVisibility(){const e=this.modelInput?this.modelInput.value:"reterminal_e1001";let n=!1;if(e==="custom")n=(g.project&&g.project.state&&g.project.state.customHardware||{}).tech==="lcd";else{const i=(window.DEVICE_PROFILES||B||{})[e];n=!!(i&&i.features&&(i.features.lcd||i.features.oled)),i&&i.features&&(i.features.lvgl||i.features.lv_display)}if(this.strategyEpaperGroup&&(this.strategyEpaperGroup.style.display=n?"none":"flex"),this.strategyLcdGroup){if(this.strategyLcdGroup.style.display=n?"flex":"none",n){const s=g.settings.lcdEcoStrategy||"backlight_off",r=document.querySelector(`input[name="lcdEcoStrategy"][value="${s}"]`);r&&(r.checked=!0)}const o=this.renderingModeInput?this.renderingModeInput.value:g.settings.renderingMode||"direct",i=document.getElementById("lcd-strategy-dim-row");if(i&&(i.style.display=o==="lvgl"?"block":"none",o!=="lvgl"&&g.settings.lcdEcoStrategy==="dim_after_timeout")){g.updateSettings({lcdEcoStrategy:"backlight_off"});const s=document.querySelector('input[name="lcdEcoStrategy"][value="backlight_off"]');s&&(s.checked=!0),this.updateVisibility()}}if(this.renderingModeField&&(this.renderingModeField.style.display="block",this.renderingModeInput&&(this.renderingModeInput.value=g.settings.renderingMode||"direct")),this.oeplSettingsSection){const o=this.renderingModeInput&&this.renderingModeInput.value==="oepl"||g.settings.renderingMode==="oepl";this.oeplSettingsSection.style.display=o?"block":"none"}if(this.odpSettingsSection){const o=this.renderingModeInput&&this.renderingModeInput.value==="opendisplay"||g.settings.renderingMode==="opendisplay";this.odpSettingsSection.style.display=o?"block":"none"}this.updateCustomSectionVisibility()}openSaveProfileModal(){return new Promise(e=>{if(!this.saveProfileModal){v.error("Save Profile Modal not found in DOM"),e(null);return}this.saveProfileResolve=e,this.saveProfileNameInput.value="My Custom Device",this.saveProfileModal.classList.remove("hidden"),this.saveProfileModal.style.display="flex",this.saveProfileNameInput.focus(),this.saveProfileNameInput.select();const n=()=>{this.saveProfileModal.classList.add("hidden"),this.saveProfileModal.style.display="none",this.saveProfileResolve&&(this.saveProfileResolve(null),this.saveProfileResolve=null),s()},o=()=>{const r=this.saveProfileNameInput.value.trim();if(!r){A("Please enter a profile name","warning"),this.saveProfileNameInput.focus();return}this.saveProfileModal.classList.add("hidden"),this.saveProfileModal.style.display="none",this.saveProfileResolve&&(this.saveProfileResolve(r),this.saveProfileResolve=null),s()},i=r=>{r.key==="Enter"&&o(),r.key==="Escape"&&n()},s=()=>{this.saveProfileCloseBtn.removeEventListener("click",n),this.saveProfileConfirmBtn.removeEventListener("click",o),this.saveProfileNameInput.removeEventListener("keyup",i)};this.saveProfileCloseBtn.addEventListener("click",n),this.saveProfileConfirmBtn.addEventListener("click",o),this.saveProfileNameInput.addEventListener("keyup",i)})}}class Ol{constructor(){this.cache={models:{}}}getSettings(){return window.AppState.settings}async fetchModels(e,n){if(!n)return[];try{if(e==="openrouter")return(await(await fetch("https://openrouter.ai/api/v1/models",{headers:{Authorization:`Bearer ${n}`}})).json()).data.map(s=>({id:s.id,name:s.name,context:s.context_length}));if(e==="openai")return(await(await fetch("https://api.openai.com/v1/models",{headers:{Authorization:`Bearer ${n}`}})).json()).data.filter(s=>s.id.startsWith("gpt-")).map(s=>({id:s.id,name:s.id}));if(e==="gemini"){try{const i=await(await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${n}`)).json();if(i.models&&Array.isArray(i.models))return i.models.filter(s=>s.supportedGenerationMethods.includes("generateContent")).map(s=>({id:s.name.replace("models/",""),name:s.displayName||s.name.replace("models/",""),description:s.description}))}catch(o){throw v.warn("Dynamic Gemini model fetch failed:",o),new Error("Failed to fetch Gemini models. Check your API key.")}return[]}}catch(o){throw v.error(`Error fetching models for ${e}:`,o),o}return[]}async processPrompt(e,n){const o=this.getSettings(),i=o.ai_provider||"gemini",s=o[`ai_api_key_${i}`];let r=o[`ai_model_${i}`];if(!r&&i==="gemini"){v.log("No model selected, attempting to auto-detect...");try{const d=await this.fetchModels(i,s);if(d.length>0)r=(d.find(h=>h.id.includes("flash"))||d.find(h=>h.id.includes("1.5-pro"))||d.find(h=>h.id.includes("gemini-pro"))||d[0]).id,v.log(`Auto-detected model: ${r}`),window.AppState.updateSettings({[`ai_model_${i}`]:r});else throw new Error("No models found for this API Key.")}catch(d){v.error("Auto-detection failed:",d),r="gemini-2.0-flash"}}if(!s)throw new Error(`Missing API Key for ${i}. Configure it in Editor Settings → AI.`);if(!r)throw new Error(`No model selected for ${i}. Please pick one in Editor Settings → AI.`);const a=this.getSystemPrompt(),l={...n,widgets:n.widgets.map(d=>this.minifyWidget(d))},c=`
Current Layout Context:
${JSON.stringify(l,null,2)}

User Request:
${e}

Respond ONLY with valid JSON containing the updated "widgets" array for the current page. Do not include any explanation.
`.trim();try{let d="";i==="gemini"?d=await this.callGemini(s,r,a,c):i==="openai"?d=await this.callOpenAI(s,r,a,c):i==="openrouter"&&(d=await this.callOpenRouter(s,r,a,c));let u=d.trim();if(u.includes("```")){const m=u.match(/```(?:json)?\s*([\s\S]*?)\s*```/);m&&m[1]&&(u=m[1].trim())}const h=u.indexOf("["),p=u.indexOf("{");let f=-1,y=-1;h!==-1&&(p===-1||h<p)?(f=h,y=u.lastIndexOf("]")):p!==-1&&(f=p,y=u.lastIndexOf("}")),f!==-1&&y!==-1&&y>f&&(u=u.substring(f,y+1));try{const m=JSON.parse(u);return Array.isArray(m)?m:m.widgets||m}catch(m){v.warn("Fast JSON parse failed, trying repair...",m);try{const _=this.repairJson(u),b=JSON.parse(_);return Array.isArray(b)?b:b.widgets||b}catch(_){throw v.error("JSON repair failed:",_),new Error("AI returned malformed JSON (possibly truncated). Try a shorter prompt or a more powerful model.")}}}catch(d){throw v.error("AI processing failed:",d),d}}async callGemini(e,n,o,i){const s=`https://generativelanguage.googleapis.com/v1beta/models/${n}:generateContent?key=${e}`,r={contents:[{role:"user",parts:[{text:o+`

`+i}]}],generationConfig:{temperature:.1,topP:.95,topK:40,maxOutputTokens:8192,responseMimeType:"application/json"}},a=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}),l=await a.json();if(a.status===429)throw new Error("⚠️ Rate Limit Exceeded: You are sending requests too quickly for the free tier. Please wait a minute and try again.");if(l.error)throw new Error(l.error.message);return l.candidates[0].content.parts[0].text}async callOpenAI(e,n,o,i){const r=n&&n.toLowerCase().includes("gpt-5")?{type:"json_schema",json_schema:{name:"widget_layout",strict:!0,schema:{type:"object",properties:{widgets:{type:"array",items:{type:"object"}}},required:["widgets"],additionalProperties:!1}}}:{type:"json_object"},l=await(await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({model:n,messages:[{role:"system",content:o},{role:"user",content:i}],temperature:.1,max_tokens:8192,response_format:r})})).json();if(l.error)throw new Error(l.error.message);return l.choices[0].message.content}async callOpenRouter(e,n,o,i){const r=await(await fetch("https://openrouter.ai/api/v1/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({model:n,messages:[{role:"system",content:o},{role:"user",content:i}],temperature:.1,max_tokens:4096})})).json();if(r.error)throw new Error(r.error.message);return r.choices[0].message.content}getSystemPrompt(){return`
You are an expert UI designer and developer for ESPHome devices. 
Your task is to modify or create a widget list based on user instructions.

WIDGET TYPES & PROPS:
- text: { x, y, width, height, text, font_size, font_family, font_weight (400 or 700), color, align }
- sensor_text: { x, y, width, height, entity, prefix, suffix, font_size, color }
- datetime: { x, y, width, height, format, time_font_size, date_font_size, color }
- weather_forecast: { x, y, width, height, entity, layout ("horizontal"/"vertical"), icon_size, temp_font_size, day_font_size }
- weather_icon: { x, y, width, height, entity, size, color }
- icon: { x, y, width, height, icon, icon_size, color }
- battery_icon: { x, y, width, height, entity, color }
- progress_bar: { x, y, width, height, color, bar_height }
- graph: { x, y, width, height, entity, color, duration }
- shape_rect / rounded_rect / shape_circle: { x, y, width, height, color, fill (bool), border_width, opacity }
- lvgl_*: Advanced widgets (lvgl_button, lvgl_switch, lvgl_slider, lvgl_arc, etc).

STRICT OPERATIONAL RULES:
1. CONTENT ACCURACY: If the user says "reads 'X'", the 'text' property MUST BE "X". NEVER use generic placeholders like "Text".
2. TYPOGRAPHY: "Bold" = font_weight: 700. "Normal/Regular" = font_weight: 400. "Large" = font_size: 28+.
3. VISUAL HIERARCHY: Use 'shape_rect' or 'rounded_rect' to create headers, footers, or background cards for groups of widgets. Use small thin shapes as dividers.
4. UNIQUE IDS: Every new widget MUST have a unique ID like "w_" + timestamp or a short descriptive string. Never leave ID as null or undefined.
5. CANVAS BOUNDS: Stay within ${JSON.stringify(window.AppState.getCanvasDimensions())}.
6. COLOR USAGE: Check "display_type" in context:
   - "monochrome": Use ONLY "black" or "white". No grays, no colors.
   - "color_epaper": Use limited palette: black, white, red, green, blue, yellow, orange. No gradients.
   - "color_lcd": Full RGB colors allowed. Use hex codes like "#FF5722" or CSS names.
7. LVGL WIDGETS: If "display_type" is "monochrome" or "color_epaper", do NOT use lvgl_* widgets unless the user explicitly requests LVGL. Use standard widgets (text, shape_rect, icon, etc.) instead. LVGL is designed for LCDs with fast refresh.

FEW-SHOT EXAMPLE:
User: "Add a large bold title that reads 'Home Status' at the top with a separator line."
Response: [
  {"id": "w_title", "type": "text", "x": 20, "y": 10, "width": 760, "height": 50, "text": "Home Status", "font_size": 32, "font_weight": 700, "align": "CENTER"},
  {"id": "w_sep", "type": "shape_rect", "x": 20, "y": 65, "width": 760, "height": 2, "color": "black", "fill": true}
]

8. DROP SHADOWS: For LCD displays ("color_lcd"), add subtle drop shadows to shapes and cards.
   HOW TO: Create a DUPLICATE of the widget to be shadowed.
           - ID: [original_id]_shadow
           - X/Y: original.x + 4, original.y + 4
           - Color: "black" (or "white" if background is dark)
           - Z-Order: Place the shadow widget BEFORE the main widget in the list so it renders behind.
           - Opacity: If supported by the widget type ('shape_rect'), set opacity to 0.4. If not, use a gray color like "#333333".

DESIGN GOAL: Create "Beautiful" layouts. Use whitespace, professional alignment, and decorative shapes to make the UI look premium.
`.trim()}repairJson(e){let n=[],o=!1,i=!1;for(let r=0;r<e.length;r++){const a=e[r];if(i){i=!1;continue}if(a==="\\"){i=!0;continue}if(a==='"'){o=!o;continue}o||(a==="["||a==="{"?n.push(a==="["?"]":"}"):(a==="]"||a==="}")&&n.length>0&&n[n.length-1]===a&&n.pop())}let s=e;for(o&&(s+='"'),s=s.trim().replace(/,\s*$/,"");n.length>0;)s+=n.pop();return s}minifyWidget(e){const{id:n,type:o,x:i,y:s,width:r,height:a,...l}=e;return{id:n,type:o,x:i,y:s,width:r,height:a,...l}}}const de=new Ol;class Rl{constructor(){this.modal=document.getElementById("editorSettingsModal"),this.closeBtn=document.getElementById("editorSettingsClose"),this.doneBtn=document.getElementById("editorSettingsDone"),this.snapToGrid=document.getElementById("editorSnapToGrid"),this.showGrid=document.getElementById("editorShowGrid"),this.lightMode=document.getElementById("editorLightMode"),this.refreshEntitiesBtn=document.getElementById("editorRefreshEntities"),this.entityCountLabel=document.getElementById("editorEntityCount"),this.gridOpacity=document.getElementById("editorGridOpacity"),this.extendedLatinGlyphs=document.getElementById("editorExtendedLatinGlyphs"),this.haManualUrl=document.getElementById("haManualUrl"),this.haLlatToken=document.getElementById("haLlatToken"),this.testHaBtn=document.getElementById("editorTestHaBtn"),this.haTestResult=document.getElementById("haTestResult"),this.haDeployedWarning=document.getElementById("haDeployedWarning"),this.haCorsTip=document.getElementById("haCorsTip"),this.aiProvider=document.getElementById("aiProvider"),this.aiApiKeyGemini=document.getElementById("aiApiKeyGemini"),this.aiApiKeyOpenai=document.getElementById("aiApiKeyOpenai"),this.aiApiKeyOpenrouter=document.getElementById("aiApiKeyOpenrouter"),this.aiModelFilter=document.getElementById("aiModelFilter"),this.aiModelSelect=document.getElementById("aiModelSelect"),this.aiRefreshModelsBtn=document.getElementById("aiRefreshModelsBtn"),this.aiTestResult=document.getElementById("aiTestResult"),this.aiKeyRows={gemini:document.getElementById("aiKeyGeminiRow"),openai:document.getElementById("aiKeyOpenaiRow"),openrouter:document.getElementById("aiKeyOpenrouterRow")}}init(){this.modal&&(this.closeBtn&&this.closeBtn.addEventListener("click",()=>this.close()),this.doneBtn&&this.doneBtn.addEventListener("click",()=>this.close()),this.setupListeners())}open(){if(!this.modal)return;const e=g.settings;this.snapToGrid&&(this.snapToGrid.checked=g.snapEnabled!==!1),this.showGrid&&(this.showGrid.checked=g.showGrid!==!1),this.lightMode&&(this.lightMode.checked=!!e.editor_light_mode),this.aiProvider&&(this.aiProvider.value=e.ai_provider||"gemini"),this.aiApiKeyGemini&&(this.aiApiKeyGemini.value=e.ai_api_key_gemini||""),this.aiApiKeyOpenai&&(this.aiApiKeyOpenai.value=e.ai_api_key_openai||""),this.aiApiKeyOpenrouter&&(this.aiApiKeyOpenrouter.value=e.ai_api_key_openrouter||""),this.aiModelFilter&&(this.aiModelFilter.value=e.ai_model_filter||""),this.updateAIKeyVisibility(),this.refreshModelSelect(),this.gridOpacity&&(this.gridOpacity.value=e.grid_opacity!==void 0?e.grid_opacity:20);const n=e.glyphsets||["GF_Latin_Kernel"];document.querySelectorAll(".glyphset-checkbox").forEach(s=>{s.checked=n.includes(s.value)}),this.extendedLatinGlyphs&&(this.extendedLatinGlyphs.checked=!!e.extendedLatinGlyphs);const o=xi();this.haManualUrl&&(this.haManualUrl.value=on()||"",this.haManualUrl.disabled=o,this.haManualUrl.style.opacity=o?"0.5":"1"),this.haLlatToken&&(this.haLlatToken.value=vt()||"",this.haLlatToken.disabled=o,this.haLlatToken.style.opacity=o?"0.5":"1"),this.haDeployedWarning&&this.haDeployedWarning.classList.toggle("hidden",!o),this.haCorsTip&&this.haCorsTip.classList.toggle("hidden",o),this.haTestResult&&(this.haTestResult.textContent=""),this.aiTestResult&&(this.aiTestResult.textContent="");const i=document.getElementById("haOriginPlaceholder");i&&(i.textContent=window.location.origin),this.updateEntityCount(),this.modal.classList.remove("hidden"),this.modal.style.display="flex"}close(){this.modal&&(this.modal.classList.add("hidden"),this.modal.style.display="none")}updateEntityCount(){if(this.entityCountLabel&&window.entityStatesCache){const e=Object.keys(window.entityStatesCache).length;this.entityCountLabel.textContent=`${e} entities cached`}}setupListeners(){this.snapToGrid&&this.snapToGrid.addEventListener("change",()=>{g.setSnapEnabled(this.snapToGrid.checked)}),this.showGrid&&this.showGrid.addEventListener("change",()=>{g.setShowGrid(this.showGrid.checked);const o=document.querySelector(".canvas-grid");o&&(o.style.display=this.showGrid.checked?"block":"none")}),this.lightMode&&this.lightMode.addEventListener("change",()=>{const o=this.lightMode.checked;g.updateSettings({editor_light_mode:o}),this.applyEditorTheme(o),L(C.STATE_CHANGED)}),this.gridOpacity&&this.gridOpacity.addEventListener("input",()=>{const o=parseInt(this.gridOpacity.value,10);g.updateSettings({grid_opacity:o})}),this.refreshEntitiesBtn&&this.refreshEntitiesBtn.addEventListener("click",async()=>{this.refreshEntitiesBtn.disabled=!0,this.refreshEntitiesBtn.textContent="Refreshing...",Te?await Te():window.fetchEntityStates&&await window.fetchEntityStates(),this.updateEntityCount(),this.refreshEntitiesBtn.disabled=!1,this.refreshEntitiesBtn.textContent="↻ Refresh Entity List"}),this.haManualUrl&&this.haManualUrl.addEventListener("change",()=>{sn(this.haManualUrl.value.trim()),Mt()}),this.haLlatToken&&this.haLlatToken.addEventListener("change",()=>{bi(this.haLlatToken.value.trim())}),this.testHaBtn&&this.testHaBtn.addEventListener("click",async()=>{this.testHaBtn.disabled=!0,this.haTestResult.textContent="Testing...",this.haTestResult.style.color="var(--muted)";try{Mt();const o=await Te();o&&o.length>0?(this.haTestResult.textContent="✅ Success!",this.haTestResult.style.color="var(--success)",this.updateEntityCount()):(this.haTestResult.innerHTML="❌ Failed.<br>Did you add <strong>cors_allowed_origins</strong> to HA and <strong>restart</strong> it?",this.haTestResult.style.color="var(--danger)")}catch{this.haTestResult.innerHTML="❌ Connection Error.<br>Check browser console.",this.haTestResult.style.color="var(--danger)"}finally{this.testHaBtn.disabled=!1}}),this.aiProvider&&this.aiProvider.addEventListener("change",()=>{g.updateSettings({ai_provider:this.aiProvider.value}),this.updateAIKeyVisibility(),this.refreshModelSelect()});const e=(o,i)=>{const s=document.getElementById(o);s&&s.addEventListener("input",()=>g.updateSettings({[i]:s.value.trim()}))};e("aiApiKeyGemini","ai_api_key_gemini"),e("aiApiKeyOpenai","ai_api_key_openai"),e("aiApiKeyOpenrouter","ai_api_key_openrouter"),this.aiModelFilter&&this.aiModelFilter.addEventListener("input",()=>{g.updateSettings({ai_model_filter:this.aiModelFilter.value}),this.filterModels()}),this.aiModelSelect&&this.aiModelSelect.addEventListener("change",()=>{const o=g.settings.ai_provider;g.updateSettings({[`ai_model_${o}`]:this.aiModelSelect.value})}),this.aiRefreshModelsBtn&&this.aiRefreshModelsBtn.addEventListener("click",async()=>{const o=g.settings.ai_provider||"gemini";let i=g.settings[`ai_api_key_${o}`];const s=`aiApiKey${o.charAt(0).toUpperCase()+o.slice(1)}`,r=document.getElementById(s);if(r&&(i=r.value.trim(),g.updateSettings({[`ai_api_key_${o}`]:i})),!i){A("Please enter an API key first",3e3,"error");return}this.aiRefreshModelsBtn.disabled=!0,this.aiRefreshModelsBtn.textContent="...",this.aiTestResult&&(this.aiTestResult.textContent="Testing...",this.aiTestResult.style.color="var(--muted)");try{const a=await de.fetchModels(o,i);de.cache.models[o]=a,this.refreshModelSelect(),this.aiTestResult&&(this.aiTestResult.textContent=`✅ Success! Found ${a.length} models.`,this.aiTestResult.style.color="var(--success)")}catch{this.aiTestResult&&(this.aiTestResult.textContent="❌ Failed. Check key/console.",this.aiTestResult.style.color="var(--danger)")}finally{this.aiRefreshModelsBtn.disabled=!1,this.aiRefreshModelsBtn.textContent="Test & Load Models"}}),document.querySelectorAll(".glyphset-checkbox").forEach(o=>{o.addEventListener("change",()=>{const i=Array.from(document.querySelectorAll(".glyphset-checkbox:checked")).map(s=>s.value);g.updateSettings({glyphsets:i})})}),this.extendedLatinGlyphs&&this.extendedLatinGlyphs.addEventListener("change",()=>{g.updateSettings({extendedLatinGlyphs:this.extendedLatinGlyphs.checked})}),this.modal.querySelectorAll(".settings-category-header").forEach(o=>{o.addEventListener("click",()=>{const i=o.closest(".settings-category");i.classList.contains("expanded")?i.classList.remove("expanded"):i.classList.add("expanded")})})}updateAIKeyVisibility(){const e=g.settings.ai_provider||"gemini";Object.keys(this.aiKeyRows).forEach(n=>{this.aiKeyRows[n]&&(this.aiKeyRows[n].style.display=n===e?"block":"none")})}async refreshModelSelect(){if(!this.aiModelSelect)return;const e=g.settings.ai_provider||"gemini";if(!de||!de.cache)return;let n=de.cache.models[e];n||(n=[],n=await de.fetchModels(e,g.settings.ai_api_key),de.cache.models[e]=n),this.filterModels()}filterModels(){if(!this.aiModelSelect)return;const e=g.settings.ai_provider||"gemini",n=(g.settings.ai_model_filter||"").toLowerCase();if(!de||!de.cache)return;const i=(de.cache.models[e]||[]).filter(r=>r.name.toLowerCase().includes(n)||r.id.toLowerCase().includes(n));this.aiModelSelect.innerHTML="",i.forEach(r=>{const a=document.createElement("option");a.value=r.id,a.textContent=r.name,this.aiModelSelect.appendChild(a)});const s=g.settings[`ai_model_${e}`];s&&(this.aiModelSelect.value=s)}applyEditorTheme(e){e?document.documentElement.setAttribute("data-theme","light"):document.documentElement.removeAttribute("data-theme");try{localStorage.setItem("reterminal-editor-theme",e?"light":"dark")}catch(n){v.log("Could not save theme preference:",n)}}}class Bl{constructor(){this.modal=document.getElementById("pageSettingsModal"),this.closeBtn=document.getElementById("pageSettingsClose"),this.saveBtn=document.getElementById("pageSettingsSave"),this.nameInput=document.getElementById("pageSettingsName"),this.refreshInput=document.getElementById("pageSettingsRefresh"),this.refreshModeInput=document.getElementById("pageSettingsRefreshMode"),this.refreshTimeInput=document.getElementById("pageSettingsRefreshTime"),this.fieldInterval=document.getElementById("field-refresh-interval"),this.fieldTime=document.getElementById("field-refresh-time"),this.darkModeInput=document.getElementById("pageSettingsDarkMode"),this.layoutModeInput=document.getElementById("pageSettingsLayoutMode"),this.gridSizeInput=document.getElementById("pageSettingsGridSize"),this.fieldGridSize=document.getElementById("field-grid-size"),this.visibleFromInput=document.getElementById("pageSettingsVisibleFrom"),this.visibleToInput=document.getElementById("pageSettingsVisibleTo"),this.pageIndex=-1}init(){this.modal&&(this.closeBtn&&this.closeBtn.addEventListener("click",()=>this.close()),this.saveBtn&&this.saveBtn.addEventListener("click",()=>this.save()),this.refreshModeInput&&this.refreshModeInput.addEventListener("change",()=>this.updateVisibility()),this.layoutModeInput&&this.layoutModeInput.addEventListener("change",()=>this.updateGridVisibility()))}updateVisibility(){if(!this.refreshModeInput)return;const e=this.refreshModeInput.value;this.fieldInterval&&(this.fieldInterval.style.display=e==="interval"?"block":"none"),this.fieldTime&&(this.fieldTime.style.display=e==="daily"?"block":"none")}updateGridVisibility(){if(!this.layoutModeInput||!this.fieldGridSize)return;const e=this.layoutModeInput.value;this.fieldGridSize.style.display=e==="grid"?"block":"none"}open(e){if(!this.modal)return;this.pageIndex=e;const n=g.pages[e];if(!n)return;this.nameInput&&(this.nameInput.value=n.name||"");const o=n.refresh_type||"interval";this.refreshModeInput&&(this.refreshModeInput.value=o),this.refreshInput&&(this.refreshInput.value=n.refresh_s||""),this.refreshTimeInput&&(this.refreshTimeInput.value=n.refresh_time||"08:00"),this.darkModeInput&&(this.darkModeInput.value=n.dark_mode||"inherit"),this.layoutModeInput&&(this.layoutModeInput.value=n.layout?"grid":"absolute"),this.gridSizeInput&&(this.gridSizeInput.value=n.layout||"4x4"),this.visibleFromInput&&(this.visibleFromInput.value=n.visible_from||""),this.visibleToInput&&(this.visibleToInput.value=n.visible_to||""),this.updateVisibility(),this.updateGridVisibility(),this.modal.classList.remove("hidden"),this.modal.style.display="flex"}close(){this.modal&&(this.modal.classList.add("hidden"),this.modal.style.display="none")}save(){if(this.pageIndex===-1)return;const e=g.pages[this.pageIndex];if(!e)return;const n=this.nameInput?this.nameInput.value:e.name,o=this.refreshModeInput?this.refreshModeInput.value:"interval",i=this.refreshInput?parseInt(this.refreshInput.value,10):NaN,s=this.refreshTimeInput?this.refreshTimeInput.value:"08:00",r=this.darkModeInput?this.darkModeInput.value:"inherit",a=this.layoutModeInput?this.layoutModeInput.value:"absolute",l=this.gridSizeInput?this.gridSizeInput.value.trim():"",c=this.visibleFromInput?this.visibleFromInput.value:"",d=this.visibleToInput?this.visibleToInput.value:"";e.name=n,e.refresh_type=o,o==="interval"?(!isNaN(i)&&i>=0?e.refresh_s=i:delete e.refresh_s,delete e.refresh_time):(e.refresh_time=s,delete e.refresh_s),e.dark_mode=r,a==="grid"&&/^\d+x\d+$/.test(l)?e.layout=l:e.layout=null,c?e.visible_from=c:delete e.visible_from,d?e.visible_to=d:delete e.visible_to,g.setPages(g.pages),z()&&typeof fe=="function"&&fe().then(()=>v.log("[PageSettings] Pages persisted to backend")).catch(u=>v.warn("[PageSettings] Failed to save pages to backend:",u)),this.close()}}let yt=null,Kn=!1;Object.defineProperty(window,"lastHighlightRange",{get:()=>yt,set:function(t){yt=t},configurable:!0});Object.defineProperty(window,"isAutoHighlight",{get:()=>Kn,set:function(t){Kn=t},configurable:!0});function ot(t){const e=document.getElementById("snippetBox");if(!e)return;const n=e.value;if(!n)return;let o=Array.isArray(t)?t:t?[t]:[];if(o.length===0){try{e.setSelectionRange(0,0),e.scrollTop=0,yt=null}catch{}return}const i=document.querySelector(".code-panel-title");if(i&&i.textContent.includes("Selection Snippet")){try{e.setSelectionRange(0,n.length),e.focus(),yt={start:0,end:n.length}}catch{}return}let r=-1,a=-1;if(o.forEach(l=>{let c=`id:${l}`,d=n.indexOf(c);if(d===-1&&(c=`id: ${l}`,d=n.indexOf(c)),d===-1&&(c=`"id":"${l}"`,d=n.indexOf(c)),d===-1&&(c=`"id": "${l}"`,d=n.indexOf(c)),d===-1&&(c=`# id: ${l}`,d=n.indexOf(c)),d!==-1){let u=n.lastIndexOf(`
`,d)+1;if(c.includes('":"')||c.includes('": "')){const m=n.lastIndexOf("{",d);m!==-1&&(u=n.lastIndexOf(`
`,m)+1)}if(!c.startsWith("# id:")){let m=u;for(;m>0;){const _=m-1,b=n.lastIndexOf(`
`,_-1)+1;if(n.substring(b,_).trim().startsWith("- type:")){u=b;break}if(u-m>500)break;m=b}}const h=["# widget:","// widget:","// page:","# id:","// ────────────────","// ═══════════════","// ▸ PAGE:"],p=["esphome:","logger:","api:","ota:","wifi:","ethernet:","psram:","substitutions:","external_components:","packages:","globals:","sensor:","binary_sensor:","text_sensor:","time:","script:","font:","image:","animation:","display:","lvgl:","i2c:","spi:","uart:","output:","light:","switch:","button:","number:","select:","climate:","fan:","cover:","  ]","    ]","  }","    }"];let f=-1;if(c.includes('":"')||c.includes('": "')){let m=0,_=!1;for(let b=u;b<n.length;b++){const x=n[b];if(x==="{"?(m++,_=!0):x==="}"&&m--,_&&m===0){f=b+1,n[b+1]===","&&f++;break}}}else{const _=n.indexOf(`
    - type:`,d+c.length);let b=-1;_!==-1&&(b=_),h.forEach(x=>{const S=n.indexOf(x,d+c.length);S!==-1&&(b===-1||S<b)&&(b=S)}),p.forEach(x=>{const S=`
`+x,E=n.indexOf(S,d+c.length);E!==-1&&(b===-1||E<b)&&(b=E+1)}),f=b!==-1?b:n.length}f===-1&&(f=n.length),(r===-1||u<r)&&(r=u),f>a&&(a=f)}}),r!==-1&&a!==-1){const l=document.activeElement?document.activeElement.tagName.toLowerCase():"",c=(l==="input"||l==="textarea")&&document.activeElement!==e,d=window.Canvas&&(window.Canvas.dragState||window.Canvas.lassoState);if(!c&&!d){window.isAutoHighlight=!0;try{e.setSelectionRange(r,a),o.length===1&&!window._undoRedoInProgress&&e.focus()}catch{}}window.lastHighlightRange={start:r,end:a},setTimeout(()=>{if(e.scrollTo){const u=n.substring(0,r).split(`
`),h=n.split(`
`).length,p=u.length,f=e.scrollHeight/h;e.scrollTop=p*f-50,e.scrollLeft=0}},10)}}function Jn(){const t=document.getElementById("snippetBox");if(!t)return;const e=()=>{window.isAutoHighlight&&(window.isAutoHighlight=!1)};t.addEventListener("mousedown",e),t.addEventListener("input",e),t.addEventListener("keydown",n=>{(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Tab","Home","End"].includes(n.key)||!n.ctrlKey&&!n.metaKey)&&e()}),v.log("[YAML Export] Interaction listeners attached to Snippet Box.")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Jn):Jn();class Hl{constructor(){this.patterns=[{name:"comment",regex:/(#.*)/g},{name:"key",regex:/^(\s*)([^:\n]+)(:)/gm},{name:"string",regex:/("[^"]*"|'[^']*')/g},{name:"value",regex:/\b(true|false|null|[0-9]+(\.[0-9]+)?)\b/g},{name:"keyword",regex:/\b(lambda|script|on_.*|if|then|else|wait_until|delay)\b/g},{name:"tag",regex:/(![a-z_]+)/g}]}highlight(e){if(!e)return"";let n=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");const o=/^(\s*(?:-\s+)?)([^:\n]+)(:)|(#.*)|("[^"]*"|'[^']*')|(![a-z_]+)|\b(lambda|script|on_[a-z_]+|if|then|else|wait_until|delay)\b|\b(true|false|null|[0-9]+(?:\.[0-9]+)?)\b|(\|[-+]?|>[-+]?)/gm;return n.replace(o,(i,s,r,a,l,c,d,u,h,p)=>s!==void 0?`${s}<span class="hl-key">${r}</span><span class="hl-punc">${a}</span>`:l!==void 0?`<span class="hl-comment">${l}</span>`:c!==void 0?`<span class="hl-string">${c}</span>`:d!==void 0?`<span class="hl-tag">${d}</span>`:p!==void 0?`<span class="hl-punc">${p}</span>`:u!==void 0?`<span class="hl-keyword">${u}</span>`:h!==void 0?`<span class="hl-value">${h}</span>`:i)}}class Nl{constructor(e){this.adapter=e,this.highlighter=new Hl,this.suppressSnippetUpdate=!1,this.snippetDebounceTimer=null,this.lastGeneratedYaml="",this.isHighlighted=localStorage.getItem("esphome_designer_yaml_highlight")!=="false",this.init()}init(){this.bindEvents(),this.setupAutoUpdate(),this.setupScrollSync(),this.updateSnippetBox()}bindEvents(){const e=document.getElementById("fullscreenSnippetBtn");e&&e.addEventListener("click",()=>{this.openSnippetModal()});const n=document.getElementById("snippetFullscreenClose");n&&n.addEventListener("click",()=>{const p=document.getElementById("snippetFullscreenModal");p&&p.classList.add("hidden")});const o=document.getElementById("importSnippetConfirm");o&&o.addEventListener("click",async()=>{await this.handleImportSnippet()});const i=document.getElementById("updateLayoutBtn");i&&i.addEventListener("click",async()=>{const p=i.querySelector(".mdi"),f=p?.className||"";p&&(p.className="mdi mdi-loading mdi-spin"),i.disabled=!0;try{await this.handleUpdateLayoutFromSnippetBox(),p&&(p.className="mdi mdi-check",setTimeout(()=>{p.className=f},1500))}catch{p&&(p.className="mdi mdi-alert-circle-outline",setTimeout(()=>{p.className=f},1500))}finally{i.disabled=!1}});const s=document.getElementById("copySnippetBtn");s&&s.addEventListener("click",async()=>{this.copySnippetToClipboard(s)});const r=document.getElementById("copyLambdaBtn");r&&r.addEventListener("click",async()=>{this.copyLambdaToClipboard(r)});const a=document.getElementById("copyOEPLServiceBtn");a&&a.addEventListener("click",()=>{this.copyOEPLServiceToClipboard(a)});const l=document.getElementById("copyODPServiceBtn");l&&l.addEventListener("click",()=>{this.copySnippetToClipboard(l)});const c=document.getElementById("toggleYamlBtn"),d=document.querySelector(".code-panel");c&&d&&(localStorage.getItem("esphome_designer_yaml_collapsed")==="true"&&d.classList.add("collapsed"),c.addEventListener("click",()=>{const f=d.classList.toggle("collapsed");localStorage.setItem("esphome_designer_yaml_collapsed",f),window.dispatchEvent(new Event("resize"))}));const u=document.getElementById("toggleHighlightBtn");document.querySelector(".snippet-container"),u&&(document.querySelectorAll(".snippet-container").forEach(p=>{p.classList.toggle("highlighted",this.isHighlighted)}),document.querySelectorAll('[id*="ToggleHighlightBtn"]').forEach(p=>{p.classList.toggle("active",this.isHighlighted)}),u.addEventListener("click",()=>{this.isHighlighted=!this.isHighlighted,localStorage.setItem("esphome_designer_yaml_highlight",this.isHighlighted),document.querySelectorAll(".snippet-container").forEach(p=>{p.classList.toggle("highlighted",this.isHighlighted)}),document.querySelectorAll('[id*="ToggleHighlightBtn"]').forEach(p=>{p.classList.toggle("active",this.isHighlighted)}),this.isHighlighted&&this.updateHighlightLayer()}));const h=document.getElementById("snippetBox");h&&h.addEventListener("input",()=>{this.isHighlighted&&this.updateHighlightLayer()})}setupScrollSync(){const e=document.getElementById("snippetBox"),n=document.getElementById("highlightLayer");e&&n&&e.addEventListener("scroll",()=>{n.scrollTop=e.scrollTop,n.scrollLeft=e.scrollLeft})}setupAutoUpdate(){Y(C.STATE_CHANGED,()=>{this.suppressSnippetUpdate||this.updateSnippetBox()}),Y(C.SELECTION_CHANGED,e=>{const n=e&&e.widgetIds?e.widgetIds:[];typeof ot=="function"&&ot(n)})}updateHighlightLayer(){if(!this.isHighlighted)return;const e=document.getElementById("snippetBox"),n=document.getElementById("highlightLayer");e&&n&&(n.innerHTML=this.highlighter.highlight(e.value));const o=document.getElementById("snippetFullscreenHighlight"),i=document.getElementById("snippetFullscreenContent");if(o&&i){const s=i.querySelector("textarea");s&&(o.innerHTML=this.highlighter.highlight(s.value))}}updateSnippetBox(){const e=document.getElementById("snippetBox");e&&(this.snippetDebounceTimer&&clearTimeout(this.snippetDebounceTimer),this.snippetDebounceTimer=setTimeout(()=>{if(!this.suppressSnippetUpdate)try{const o=(window.AppState?window.AppState.selectedWidgetIds:[]).length>1,i=this.adapter&&this.adapter.constructor.name,s=i==="OEPLAdapter",r=i==="OpenDisplayAdapter",a=document.getElementById("oeplNotice");a&&a.classList.toggle("hidden",!s);const l=document.getElementById("odpNotice");if(l&&(l.classList.toggle("hidden",!r),r)){const m=l.querySelector("div");m&&(m.innerHTML="<strong>OpenDisplay YAML (ODP)</strong> - Copy this to Home Assistant → Developer Tools → Services → <code>opendisplay.drawcustom</code>")}const c=document.querySelector(".code-panel-title");if(c){const m=c.querySelector("button");c.innerHTML="",m&&c.appendChild(m);let _=" ESPHome YAML";s&&(_=" OpenEpaperLink JSON"),r&&(_=" OpenDisplay YAML (ODP)"),c.appendChild(document.createTextNode(_))}const d=document.getElementById("copyOEPLServiceBtn");d&&(d.style.display=s?"inline-block":"none");const u=document.getElementById("copyODPServiceBtn");u&&(u.style.display=r?"inline-block":"none");const h=document.getElementById("copyLambdaBtn");h&&(h.style.display=s||r?"none":"inline-block");const p=document.getElementById("updateLayoutBtn");p&&(p.style.display="inline-block");const f=window.AppState?window.AppState.getPagesPayload():{pages:[]},y=JSON.parse(JSON.stringify(f));window.currentDeviceModel&&window.currentDeviceModel!==y.deviceModel&&(v.log(`[SnippetManager] Overriding stale deviceModel '${y.deviceModel}' with '${window.currentDeviceModel}'`),y.deviceModel=window.currentDeviceModel,y.device_model=window.currentDeviceModel,y.settings&&(y.settings.device_model=window.currentDeviceModel)),this.adapter.generate(y).then(m=>{this.lastGeneratedYaml=m,e.value=m,this.isHighlighted&&this.updateHighlightLayer();const _=window.AppState?window.AppState.selectedWidgetIds:[];typeof ot=="function"&&ot(_)}).catch(m=>{v.error("Error generating snippet via adapter:",m),e.value="# Error generating YAML (adapter): "+m.message,this.isHighlighted&&this.updateHighlightLayer()})}catch(n){v.error("Error generating snippet:",n),e.value="# Error generating YAML: "+n.message,this.isHighlighted&&this.updateHighlightLayer()}},50))}openSnippetModal(){const e=document.getElementById("snippetFullscreenModal"),n=document.getElementById("snippetFullscreenContainer"),o=document.getElementById("snippetFullscreenContent"),i=document.getElementById("snippetFullscreenHighlight"),s=document.getElementById("snippetBox"),r=document.getElementById("toggleFullscreenHighlightBtn");if(!e||!n||!o||!i||!s)return;n.classList.toggle("highlighted",this.isHighlighted),r&&r.classList.toggle("active",this.isHighlighted),r&&!r.hasListener&&(r.addEventListener("click",()=>{this.isHighlighted=!this.isHighlighted,localStorage.setItem("esphome_designer_yaml_highlight",this.isHighlighted);const l=document.querySelector(".snippet-container"),c=document.getElementById("toggleHighlightBtn");l&&l.classList.toggle("highlighted",this.isHighlighted),c&&c.classList.toggle("active",this.isHighlighted),n.classList.toggle("highlighted",this.isHighlighted),r.classList.toggle("active",this.isHighlighted),this.isHighlighted&&(i.innerHTML=this.highlighter.highlight(a.value),this.updateHighlightLayer())}),r.hasListener=!0);let a=o.querySelector("textarea");if(!a){o.innerHTML="",a=document.createElement("textarea"),a.className="snippet-box",a.style.width="100%",a.style.height="100%",a.style.background="transparent",a.spellcheck=!1,o.appendChild(a),a.addEventListener("scroll",()=>{i.scrollTop=a.scrollTop,i.scrollLeft=a.scrollLeft}),a.addEventListener("input",()=>{this.isHighlighted&&(i.innerHTML=this.highlighter.highlight(a.value))});let l=e.querySelector(".modal-actions");if(l&&!l.querySelector("#fullscreenUpdateBtn")){const c=document.createElement("button");c.id="fullscreenUpdateBtn",c.className="btn btn-primary",c.textContent="Update Layout from YAML",c.onclick=()=>{s.value=a.value,this.handleUpdateLayoutFromSnippetBox(),e.classList.add("hidden")},l.insertBefore(c,l.firstChild)}}a.value=s.value||"",this.isHighlighted&&(i.innerHTML=this.highlighter.highlight(a.value),setTimeout(()=>{i.scrollTop=a.scrollTop,i.scrollLeft=a.scrollLeft},50)),e.style.display="",e.classList.remove("hidden")}async handleImportSnippet(){const e=document.getElementById("importSnippetTextarea"),n=document.getElementById("importSnippetError");if(!e)return;const o=e.value;if(o.trim())try{n&&(n.textContent="");let i;try{i=Nn(o),v.log("[handleImportSnippet] Successfully used offline parser.")}catch(r){if(v.warn("[handleImportSnippet] Offline parser failed, falling back to backend:",r),z())i=await Ta(o);else throw r}Ee(i);const s=document.getElementById("importSnippetModal");s&&(s.classList.add("hidden"),s.style.display="none"),A("Layout imported successfully","success")}catch(i){v.error("Import failed:",i),n&&(n.textContent=`Error: ${i.message}`)}}async handleUpdateLayoutFromSnippetBox(){const e=document.getElementById("snippetBox");if(!e)return;const n=e.value;if(n.trim()){if(this.lastGeneratedYaml&&n.trim()===this.lastGeneratedYaml.trim()){v.log("[handleUpdateLayoutFromSnippetBox] Skipping update: Snippet matches last generated state.");return}try{const o=window.AppState?.currentLayoutId||"reterminal_e1001",i=window.AppState?.deviceName||"Layout 1",s=window.AppState?.deviceModel||window.AppState?.settings?.device_model||"reterminal_e1001";v.log(`[handleUpdateLayoutFromSnippetBox] Preserving context - ID: ${o}, Name: ${i}`);let r=Nn(n);r.device_id=o,r.name=i,r.device_model=s,r.settings||(r.settings={}),r.settings.device_model=s,r.settings.device_name=i;const a=window.AppState?.settings?.dark_mode||!1;r.settings.dark_mode=a,this.suppressSnippetUpdate=!0,this.snippetDebounceTimer&&(clearTimeout(this.snippetDebounceTimer),this.snippetDebounceTimer=null),Ee(r),setTimeout(()=>{this.suppressSnippetUpdate=!1},1500),A("Layout updated from YAML","success"),(n.includes("lambda:")||n.includes("script:"))&&setTimeout(()=>{A("Note: Custom C++ (lambda/script) may not fully preview.","warning",4e3)},800)}catch(o){v.error("Update layout failed:",o),A(`Update failed: ${o.message}`,"error"),this.suppressSnippetUpdate=!1}}}async copySnippetToClipboard(e){const n=document.getElementById("snippetBox");if(!n)return;const o=n.value||"",i=e.textContent,s=()=>{e.textContent="Copied!",e.style.minWidth=e.offsetWidth+"px",setTimeout(()=>{e.textContent=i,e.style.minWidth=""},2e3)};try{if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(o),A("Snippet copied to clipboard","success"),s();else{const r=document.createElement("textarea");r.value=o,r.style.position="fixed",r.style.left="-999999px",r.style.top="-999999px",document.body.appendChild(r),r.focus(),r.select();try{document.execCommand("copy"),A("Snippet copied to clipboard","success"),s()}catch{A("Unable to copy. Try selecting and copying manually.","error")}document.body.removeChild(r)}}catch(r){v.error("Copy failed:",r),A("Unable to copy snippet","error")}}async copyLambdaToClipboard(e){const n=document.getElementById("snippetBox");if(!n)return;const o=n.value||"",i=e.textContent,s=o.search(/^display:\s*$/m);if(s===-1){A("No display section found in output","warning");return}const r=o.substring(s),a=r.match(/\n[a-z_]+:\s*(?:\n|$)/),c=(a?r.substring(0,a.index):r).match(/lambda:\s*\|-\n([\s\S]*?)$/);if(!c){A("No display lambda found in output","warning");return}const u=c[1].split(`
`),h=u.filter(m=>m.trim().length>0);if(h.length===0){A("Lambda appears to be empty","warning");return}const p=Math.min(...h.map(m=>m.match(/^(\s*)/)[1].length)),f=u.map(m=>m.length>=p?m.substring(p):m).join(`
`).trim(),y=()=>{e.textContent="Copied!",e.style.minWidth=e.offsetWidth+"px",setTimeout(()=>{e.textContent=i,e.style.minWidth=""},2e3)};try{if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(f),A("Display lambda copied to clipboard","success"),y();else{const m=document.createElement("textarea");m.value=f,m.style.position="fixed",m.style.left="-999999px",m.style.top="-999999px",document.body.appendChild(m),m.focus(),m.select();try{document.execCommand("copy"),A("Display lambda copied to clipboard","success"),y()}catch{A("Unable to copy. Try selecting and copying manually.","error")}document.body.removeChild(m)}}catch(m){v.error("Copy lambda failed:",m),A("Unable to copy lambda","error")}}async copyOEPLServiceToClipboard(e){const n=document.getElementById("snippetBox");if(!n)return;let o=n.value||"",i="";try{const s=JSON.parse(o),r=g.settings.oeplEntityId||"open_epaper_link.0000000000000000";s.target.entity_id=r,s.data.dither=g.settings.oeplDither??2,i=`service: ${s.service}
`,i+=`target:
  entity_id: ${s.target.entity_id}
`,i+=`data:
`,i+=`  background: ${s.data.background}
`,i+=`  rotate: ${s.data.rotate}
`,i+=`  dither: ${s.data.dither}
`,i+=`  ttl: ${s.data.ttl}
`,i+=`  payload: >
`;const a=JSON.stringify(s.data.payload);i+=`    ${a}`;const l=e.textContent;if(navigator.clipboard)await navigator.clipboard.writeText(i),A("HA Service call copied!","success");else{const c=document.createElement("textarea");c.value=i,document.body.appendChild(c),c.select(),document.execCommand("copy"),document.body.removeChild(c),A("HA Service call copied!","success")}e.textContent="Copied!",setTimeout(()=>{e.textContent=l},2e3)}catch(s){v.error("Failed to format/copy OEPL service:",s),A("Failed to format service call","error")}}}class Ro{constructor(){this.init()}init(){window.addEventListener("keydown",e=>this.handleKeyDown(e))}handleKeyDown(e){const n=g||window.AppState;if(!n){v.error("KeyboardHandler: AppState not found!");return}const o=n.selectedWidgetIds.length>0;n.selectedWidgetId;const i=window.isAutoHighlight||!1;if(e.shiftKey&&e.code==="Space"){(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA")&&e.target.blur(),e.preventDefault(),window.QuickSearch&&window.QuickSearch.open();return}if((e.key==="Delete"||e.key==="Backspace")&&o){const s=window.lastHighlightRange;if(e.target.id==="snippetBox"&&s&&e.target.selectionStart===s.start&&e.target.selectionEnd===s.end){e.preventDefault(),this.deleteWidget(null);return}if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA")return;e.preventDefault(),this.deleteWidget(null);return}if((e.ctrlKey||e.metaKey)&&e.key&&e.key.toLowerCase()==="c"){if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"){if(e.target.id==="snippetBox"&&i){e.preventDefault(),this.copyWidget();return}return}e.preventDefault(),this.copyWidget();return}if((e.ctrlKey||e.metaKey)&&e.key&&e.key.toLowerCase()==="v"){if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"){if(e.target.id==="snippetBox"&&i){e.preventDefault(),this.pasteWidget();return}return}e.preventDefault(),this.pasteWidget();return}if((e.ctrlKey||e.metaKey)&&e.key&&e.key.toLowerCase()==="z"&&!e.shiftKey){if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"){if(e.target.id==="snippetBox"&&i){e.preventDefault(),window._undoRedoInProgress=!0,n.undo(),setTimeout(()=>{window._undoRedoInProgress=!1},100);return}return}e.preventDefault(),window._undoRedoInProgress=!0,n.undo(),setTimeout(()=>{window._undoRedoInProgress=!1},100);return}if((e.ctrlKey||e.metaKey)&&e.key&&(e.key.toLowerCase()==="y"||e.key.toLowerCase()==="z"&&e.shiftKey)){if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"){if(e.target.id==="snippetBox"&&i){e.preventDefault(),window._undoRedoInProgress=!0,n.redo(),setTimeout(()=>{window._undoRedoInProgress=!1},100);return}return}e.preventDefault(),window._undoRedoInProgress=!0,n.redo(),setTimeout(()=>{window._undoRedoInProgress=!1},100);return}if((e.ctrlKey||e.metaKey)&&e.key&&e.key.toLowerCase()==="l"&&o){e.preventDefault();const r=n.getSelectedWidgets().every(a=>a.locked);n.updateWidgets(n.selectedWidgetIds,{locked:!r})}if((e.ctrlKey||e.metaKey)&&e.key&&e.key.toLowerCase()==="a"){const s=e.target.id==="snippetBox"&&i;if(e.target.tagName!=="INPUT"&&e.target.tagName!=="TEXTAREA"||s){e.preventDefault(),n.selectAllWidgets();return}}if(e.key&&e.key.toLowerCase()==="g"&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey&&e.target.tagName!=="INPUT"&&e.target.tagName!=="TEXTAREA"){e.preventDefault();const s=!n.showGrid;if(n.setShowGrid(s),s){n.setShowDebugGrid(!1);const a=document.getElementById("debugGridToggleBtn");a&&a.classList.remove("active")}const r=document.getElementById("gridToggleBtn");r&&r.classList.toggle("active",s),L(C.STATE_CHANGED),v.log(`[Keyboard] Grid toggled: ${s}`);return}if(e.key&&e.key.toLowerCase()==="d"&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey&&e.target.tagName!=="INPUT"&&e.target.tagName!=="TEXTAREA"){e.preventDefault();const s=!n.showDebugGrid;if(n.setShowDebugGrid(s),s){n.setShowGrid(!1);const a=document.getElementById("gridToggleBtn");a&&a.classList.remove("active")}const r=document.getElementById("debugGridToggleBtn");r&&r.classList.toggle("active",s),L(C.STATE_CHANGED),v.log(`[Keyboard] Debug mode toggled: ${s}`);return}if(e.key&&e.key.toLowerCase()==="r"&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey&&e.target.tagName!=="INPUT"&&e.target.tagName!=="TEXTAREA"){e.preventDefault();const s=!n.showRulers;n.setShowRulers(s);const r=document.getElementById("rulersToggleBtn");r&&r.classList.toggle("active",s),v.log(`[Keyboard] Rulers toggled: ${s}`);return}e.key==="Escape"&&(document.activeElement&&(document.activeElement.tagName==="INPUT"||document.activeElement.tagName==="TEXTAREA")&&document.activeElement.blur(),n.selectedWidgetIds.length>0&&(n.selectWidgets([]),L(C.STATE_CHANGED)))}static isInput(e){return e.tagName==="INPUT"||e.tagName==="TEXTAREA"}deleteWidget(e){const n=g||window.AppState;n&&n.deleteWidget(e)}copyWidget(){const e=g||window.AppState;e&&e.copyWidget()}pasteWidget(){const e=g||window.AppState;e&&e.pasteWidget()}}window.KeyboardHandler=Ro;class We{constructor(){if(this.constructor===We)throw new Error("BaseAdapter is abstract and cannot be instantiated directly.")}async generate(e){throw new Error("Method 'generate()' must be implemented.")}generatePage(e,n){throw new Error("Method 'generatePage()' must be implemented.")}generateWidget(e,n){throw new Error("Method 'generateWidget()' must be implemented.")}sanitize(e){return e}}window.BaseAdapter=We;const re={getColorConst:t=>{if(!t)return"COLOR_BLACK";const e=t.toLowerCase();if(e==="theme_auto")return"color_on";if(e==="transparent")return"color_off";if(e.startsWith("#")&&e.length===7){const n=parseInt(e.substring(1,3),16),o=parseInt(e.substring(3,5),16),i=parseInt(e.substring(5,7),16);return`Color(${n}, ${o}, ${i})`}return Qt[e]||"COLOR_BLACK"},getAlignX:(t,e,n)=>t.includes("LEFT")?`${e}`:t.includes("RIGHT")?`${e} + ${n}`:`${e} + ${n}/2`,getAlignY:(t,e,n)=>t.includes("TOP")?`${e}`:t.includes("BOTTOM")?`${e} + ${n}`:`${e} + ${n}/2`,sanitize:t=>t?t.replace(/"/g,'\\"'):"",addDitherMask:(t,e,n,o,i,s,r,a=0)=>{if(!n||!e)return;const l=e.toLowerCase();let c=l==="gray"||l==="grey";if(!c&&l.startsWith("#")&&l.length===7){const d=parseInt(l.substring(1,3),16),u=parseInt(l.substring(3,5),16),h=parseInt(l.substring(5,7),16);Math.abs(d-u)<15&&Math.abs(u-h)<15&&d>40&&d<210&&(c=!0)}c&&t.push(`          apply_grey_dither_mask(${Math.round(o)}, ${Math.round(i)}, ${Math.round(s)}, ${Math.round(r)});`)},isGrayColor:t=>{if(!t)return!1;const e=t.toLowerCase();if(e==="gray"||e==="grey")return!0;if(e.startsWith("#")&&e.length===7){const n=parseInt(e.substring(1,3),16),o=parseInt(e.substring(3,5),16),i=parseInt(e.substring(5,7),16);if(Math.abs(n-o)<15&&Math.abs(o-i)<15&&n>40&&n<210)return!0}return!1},addDitherMaskForText:(t,e,n,o,i,s,r)=>!n||!re.isGrayColor(e)?!1:(t.push(`        apply_grey_dither_to_text(${Math.round(o)}, ${Math.round(i)}, ${Math.round(s)}, ${Math.round(r)});`),!0),getIconCode:t=>{if(!t||!window.iconPickerData)return null;const e=window.iconPickerData.find(n=>n.name===t);return e?e.code:null}};window.Utils=re;window.ESPHomeDesigner=window.ESPHomeDesigner||{};window.ESPHomeDesigner.utils=re;function Gl(t,e="my_display",n=0,o={},i=!1){if(!t||!t.touch)return[];const s=t.touch,r=["touchscreen:"];r.push(`  - platform: ${s.platform}`),r.push("    id: my_touchscreen"),r.push(`    display: ${e}`),s.i2c_id&&r.push(`    i2c_id: ${s.i2c_id}`),s.spi_id&&r.push(`    spi_id: ${s.spi_id}`),s.address&&r.push(`    address: ${s.address}`),s.update_interval&&r.push(`    update_interval: ${s.update_interval}`);const a=(d,u)=>{u&&(typeof u=="string"||typeof u=="number"?r.push(`    ${d}: ${u}`):(r.push(`    ${d}:`),Object.entries(u).forEach(([h,p])=>r.push(`      ${h}: ${p}`))))};a("interrupt_pin",s.interrupt_pin),a("reset_pin",s.reset_pin),a("cs_pin",s.cs_pin);const l=s.transform||{};if((s.transform||s.mirror_x||s.mirror_y||s.swap_xy)&&(r.push("    transform:"),s.transform?(s.transform.swap_xy&&r.push("      swap_xy: true"),s.transform.mirror_x&&r.push("      mirror_x: true"),s.transform.mirror_y&&r.push("      mirror_y: true")):((s.mirror_x||l.mirror_x)&&r.push("      mirror_x: true"),(s.mirror_y||l.mirror_y)&&r.push("      mirror_y: true"),(s.swap_xy||l.swap_xy)&&r.push("      swap_xy: true"))),i&&o.lcdEcoStrategy==="dim_after_timeout"&&(r.push("    on_release:"),r.push("      - if:"),r.push("          condition: lvgl.is_paused"),r.push("          then:"),r.push("            - lvgl.resume:"),r.push("            - lvgl.widget.redraw:"),r.push("            - light.turn_on: display_backlight")),s.calibration){r.push("    calibration:");const d=s.calibration;Object.entries(d).forEach(([u,h])=>r.push(`      ${u}: ${h}`))}return r.push(""),r}function Zn(t){const e=[];if(!t||!t.backlight)return e;const n=t.backlight;return(n.platform==="ledc"||n.platform==="gpio"||n.platform==="switch")&&(n.platform==="switch"?(e.push("switch:"),e.push("  - platform: gpio"),e.push("    id: lcdbacklight"),e.push("    name: lcdbacklight"),typeof n.pin=="object"?(e.push("    pin:"),Object.entries(n.pin).forEach(([o,i])=>{typeof i=="object"?(e.push(`      ${o}:`),Object.entries(i).forEach(([s,r])=>e.push(`        ${s}: ${r}`))):e.push(`      ${o}: ${i}`)})):e.push(`    pin: ${n.pin}`),e.push("    restore_mode: ALWAYS_ON"),e.push("")):(e.push("output:"),e.push(`  - platform: ${n.platform}`),e.push("    id: gpio_backlight_pwm"),e.push(`    pin: ${n.pin}`),n.frequency&&e.push(`    frequency: ${n.frequency}`),e.push(""))),e.push("light:"),e.push("  - platform: monochromatic"),e.push("    name: Display Backlight"),e.push("    id: display_backlight"),e.push("    restore_mode: ALWAYS_ON"),n.platform==="switch"?(e.push("    output: fake_backlight_output"),e.push("    default_transition_length: 0s"),e.push(""),e.push("output:"),e.push("  - platform: template"),e.push("    id: fake_backlight_output"),e.push("    type: float"),e.push("    write_action:"),e.push("      - if:"),e.push("          condition:"),e.push("            lambda: 'return state > 0.0;'"),e.push("          then:"),e.push("            - switch.turn_on: lcdbacklight"),e.push("          else:"),e.push("            - switch.turn_off: lcdbacklight")):e.push("    output: gpio_backlight_pwm"),e.push(""),e}function Qn(t){const e=[];return t.external_components&&Array.isArray(t.external_components)&&t.external_components.length>0&&(e.push("external_components:"),e.push(...t.external_components),e.push("")),t.extra_components&&Array.isArray(t.extra_components)&&(e.push(...t.extra_components),e.push("")),t.extra_components_raw&&(e.push(t.extra_components_raw),e.push("")),e}function ei(t){const e=[];return t&&t.pins&&t.pins.i2c&&(e.push("i2c:"),e.push("  - sda: "+t.pins.i2c.sda),e.push("    scl: "+t.pins.i2c.scl),e.push("    scan: "+(t.i2c_config?.scan!==!1)),e.push("    id: bus_a"),t.i2c_config?.frequency&&e.push("    frequency: "+t.i2c_config.frequency),e.push("")),e}function ti(t){const e=[];if(t&&t.pins&&t.pins.spi){e.push("spi:");const n=t.pins.spi;n.id?e.push(`  - id: ${n.id}`):e.push("  - id: spi_bus"),e.push(`    clk_pin: ${n.clk}`),n.mosi&&e.push(`    mosi_pin: ${n.mosi}`),n.miso&&e.push(`    miso_pin: ${n.miso}`),n.type==="quad"&&(e.push("    interface: triple"),n.data_pins&&e.push(`    data_pins: [${n.data_pins.join(", ")}]`)),e.push(""),t.extra_spi&&(e.push(...t.extra_spi),e.push(""))}return e}function ni(t,e={},n=!1){const o=[];if(!t)return o;const i=e.orientation||"landscape",s=t.resolution||{width:800,height:480},r=s.height>s.width,a=i==="portrait"||i==="portrait_inverted",l=i==="landscape_inverted"||i==="portrait_inverted";let c=0;if(r?c=a?0:90:c=a?90:0,l&&(c=(c+180)%360),t.rotation_offset&&(c=(c+t.rotation_offset)%360),t.display_config){o.push("display:");const u=t.display_config.filter(h=>!h.trim().startsWith("rotation:"));if(o.push(...u),n)for(let h=0;h<o.length;h++)o[h].includes("auto_clear_enabled: true")&&(o[h]=o[h].replace("auto_clear_enabled: true","auto_clear_enabled: false"));o.push(`    rotation: ${c}`),o.push("")}else{const u=!!(t.features&&(t.features.lcd||t.features.oled));o.push("display:"),o.push(`  - platform: ${t.displayPlatform}`),o.push(`    id: ${u?"my_display":"epaper_display"}`),n&&o.push("    auto_clear_enabled: false");const h=t.pins&&t.pins.display?t.pins.display:null;if(h){const y=(m,_)=>{_&&(typeof _=="object"?(o.push(`    ${m}:`),o.push(`      number: ${_.number}`),_.inverted!==void 0&&o.push(`      inverted: ${_.inverted}`)):o.push(`    ${m}: ${_}`))};y("cs_pin",h.cs),y("dc_pin",h.dc),y("reset_pin",h.reset),y("busy_pin",h.busy)}if(t.displayPlatform==="waveshare_epaper"&&t.displayModel&&o.push(`    model: "${t.displayModel}"`),o.push(`    rotation: ${c}`),t.displayModel==="M5Paper"||t.displayPlatform==="it8951e")o.push("    reversed: false"),o.push("    reset_duration: 200ms");else if(t.displayModel&&t.displayPlatform!=="waveshare_epaper"){let y=`    model: "${t.displayModel}"`;t.displayModel==="Seeed-reTerminal-E1002"&&(y+=" #Please update your ESPHome version to 2025.11.1 above"),o.push(y)}const p=e.refreshInterval||1;o.push(`    update_interval: ${u?p+"s":"never"}`);const f=["1.54in","1.54inv2","2.13in","2.13in-ttgo","2.13in-ttgo-b1","2.13in-ttgo-b73","2.13in-ttgo-b74","2.13in-ttgo-dke","2.13inv2","2.13inv3","2.90in","2.90in-dke","2.90inv2","2.90inv2-r2","7.50inv2p","gdew029t5","gdey029t94","gdey042t81","gdey0583t81"];t.displayModel&&f.includes(t.displayModel)&&o.push("    full_update_every: 30"),o.push("")}const d=t.display_config?"my_display":"epaper_display";return o.push(...Gl(t,d,c,e,n)),o}function ii(t,e=[],n="my_display",o=[]){const i=[];if(!t)return i;const s=t.pins||{},r=s.batteryAdc,a=t.features&&t.features.sht4x,l=t.features&&t.features.shtc3,c=e.length>0;if(!r&&!a&&!l&&!c)return i;if(i.push("sensor:"),r&&(i.push("  - platform: adc"),i.push(`    pin: ${s.batteryAdc}`),i.push('    name: "Battery Voltage"'),i.push('    unit_of_measurement: "V"'),i.push("    device_class: voltage"),i.push("    state_class: measurement"),i.push("    id: battery_voltage"),i.push("    update_interval: 60s"),i.push("    attenuation: "+t.battery.attenuation),i.push("    filters:"),i.push("      - multiply: "+t.battery.multiplier)),a&&(i.push("  - platform: sht4x"),i.push("    id: sht4x_sensor"),i.push("    temperature:"),i.push('      name: "Temperature"'),i.push("      id: sht4x_temperature"),i.push("    humidity:"),i.push('      name: "Humidity"'),i.push("      id: sht4x_humidity"),i.push("    address: 0x44"),i.push("    update_interval: 60s")),(t.features.sht3xd||t.displayModel==="M5Paper"||t.name&&t.name.includes("M5Paper"))&&(i.push("  - platform: sht3xd"),i.push("    address: 0x44"),i.push("    temperature:"),i.push('      name: "Temperature"'),i.push("      id: sht3x_temperature"),i.push("    humidity:"),i.push('      name: "Humidity"'),i.push("      id: sht3x_humidity"),i.push("    update_interval: 60s")),l&&(i.push("  - platform: shtcx"),i.push("    id: shtc3_sensor"),i.push("    i2c_id: bus_a"),i.push("    address: 0x70"),i.push("    temperature:"),i.push('      name: "Temperature"'),i.push("      id: shtc3_temperature"),i.push("    humidity:"),i.push('      name: "Humidity"'),i.push("      id: shtc3_humidity"),i.push("    update_interval: 60s")),e.length>0&&i.push(...e),r)if(i.push(""),i.push("  - platform: template"),i.push('    name: "Battery Level"'),i.push("    id: battery_level"),i.push('    unit_of_measurement: "%"'),i.push('    icon: "mdi:battery"'),i.push("    device_class: battery"),i.push("    state_class: measurement"),t.battery.curve)i.push("    lambda: 'return id(battery_voltage).state;'"),i.push("    update_interval: 60s"),i.push("    filters:"),i.push("      - calibrate_linear:"),t.battery.curve.forEach(d=>{i.push(`          - ${d.from} -> ${d.to}`)}),i.push("      - clamp:"),i.push("          min_value: 0"),i.push("          max_value: 100");else{const d=t.battery.calibration?t.battery.calibration.min:3.27,u=t.battery.calibration?t.battery.calibration.max:4.15;i.push("    lambda: |-"),i.push(`      if (id(battery_voltage).state > ${u}) return 100;`),i.push(`      if (id(battery_voltage).state < ${d}) return 0;`),i.push(`      return (id(battery_voltage).state - ${d}) / (${u} - ${d}) * 100.0;`)}return i.push(""),i}function st(t,e,n="my_display",o=[]){const i=[],s=t&&t.features&&t.features.buttons,r=o.length>0;if(!s&&!r)return i;if(i.push("binary_sensor:"),s){const a=t.name&&t.name.includes("CoreInk"),l=t.pins.buttons||{};if(l.left&&(i.push("  - platform: gpio"),i.push("    pin:"),typeof l.left=="object"?(i.push(`      number: ${l.left.number}`),i.push(`      mode: ${l.left.mode||"INPUT_PULLUP"}`),i.push(`      inverted: ${l.left.inverted!==void 0?l.left.inverted:!0}`)):(i.push(`      number: ${l.left}`),i.push("      mode: INPUT_PULLUP"),i.push("      inverted: true")),i.push('    name: "Left Button"'),i.push("    id: button_left"),i.push("    on_press:"),i.push("      then:"),a?(i.push("        - script.execute:"),i.push("            id: change_page_to"),i.push(`            target_page: !lambda 'return id(display_page) > 0 ? id(display_page) - 1 : ${e-1};'`)):(i.push("        - script.execute:"),i.push("            id: change_page_to"),i.push(`            target_page: !lambda 'return id(display_page) > 0 ? id(display_page) - 1 : ${e-1};'`))),l.right&&(i.push("  - platform: gpio"),i.push("    pin:"),typeof l.right=="object"?(i.push(`      number: ${l.right.number}`),i.push(`      mode: ${l.right.mode||"INPUT_PULLUP"}`),i.push(`      inverted: ${l.right.inverted!==void 0?l.right.inverted:!0}`)):(i.push(`      number: ${l.right}`),i.push("      mode: INPUT_PULLUP"),i.push("      inverted: true")),i.push('    name: "Right Button"'),i.push("    id: button_right"),i.push("    on_press:"),i.push("      then:"),a?(i.push("        - script.execute:"),i.push("            id: change_page_to"),i.push(`            target_page: !lambda 'return id(display_page) < ${e-1} ? id(display_page) + 1 : 0;'`)):(i.push("        - script.execute:"),i.push("            id: change_page_to"),i.push(`            target_page: !lambda 'return id(display_page) < ${e-1} ? id(display_page) + 1 : 0;'`))),l.refresh){i.push("  - platform: gpio"),i.push("    pin:"),typeof l.refresh=="object"?(i.push(`      number: ${l.refresh.number}`),i.push(`      mode: ${l.refresh.mode||"INPUT_PULLUP"}`),i.push(`      inverted: ${l.refresh.inverted!==void 0?l.refresh.inverted:!0}`)):(i.push(`      number: ${l.refresh}`),i.push("      mode: INPUT_PULLUP"),i.push("      inverted: true"));const c=a?"Enter Button":"Refresh Button",d=a?"button_enter":"button_refresh";i.push(`    name: "${c}"`),i.push(`    id: ${d}`),i.push("    on_press:"),i.push("      then:"),i.push(`        - component.update: ${n}`)}l.home&&(i.push("  - platform: gpio"),i.push("    pin:"),typeof l.home=="object"?(i.push(`      number: ${l.home.number}`),i.push(`      mode: ${l.home.mode||"INPUT_PULLUP"}`),i.push(`      inverted: ${l.home.inverted!==void 0?l.home.inverted:!0}`)):(i.push(`      number: ${l.home}`),i.push("      mode: INPUT_PULLUP"),i.push("      inverted: true")),i.push('    name: "Home Button"'),i.push("    id: button_home"),i.push("    on_press:"),i.push("      then:"),i.push("        - script.execute:"),i.push("            id: change_page_to"),i.push("            target_page: 0"),i.push("        - script.execute: manage_run_and_sleep"))}return r&&(i.push("  # Touch Area Binary Sensors"),o.forEach(a=>{const l=(a.type||"").toLowerCase(),c=a.props||{};if(l==="template_nav_bar"){const d=c.show_prev!==!1,u=c.show_home!==!1,h=c.show_next!==!1;let p=0;if(d&&p++,u&&p++,h&&p++,p>0){const f=Math.floor(a.width/p);let y=0;const m=(_,b)=>{const x=a.x+y*f,S=x+f,E=a.y,w=a.y+a.height;i.push("  - platform: touchscreen"),i.push(`    id: nav_${_}_${a.id}`),i.push("    touchscreen_id: my_touchscreen"),i.push(`    x_min: ${x}`),i.push(`    x_max: ${S}`),i.push(`    y_min: ${E}`),i.push(`    y_max: ${w}`),i.push("    on_press:");const I=a._pageIndex!==void 0?a._pageIndex:0;i.push("      - if:"),i.push("          condition:"),i.push(`            lambda: 'return id(display_page) == ${I};'`),i.push("          then:"),_==="prev"?(i.push("            - script.execute:"),i.push("                id: change_page_to"),i.push("                target_page: !lambda 'return id(display_page) - 1;'")):_==="home"?i.push("            - script.execute: manage_run_and_sleep"):_==="next"&&(i.push("            - script.execute:"),i.push("                id: change_page_to"),i.push("                target_page: !lambda 'return id(display_page) + 1;'")),y++};d&&m("prev"),u&&m("home"),h&&m("next")}}else{const d=(a.entity_id||`touch_area_${a.id}`).replace(/[^a-zA-Z0-9_]/g,"_"),u=parseInt(String(c.icon_size||40),10),h=Math.max(a.width,u),p=Math.max(a.height,u);let f=a.x-Math.floor((h-a.width)/2),y=f+h,m=a.y-Math.floor((p-a.height)/2),_=m+p;f=Math.max(0,f),m=Math.max(0,m);const b=c.nav_action||"none",x=a._pageIndex!==void 0?a._pageIndex:0;i.push("  - platform: touchscreen"),i.push(`    id: ${d}`),i.push("    touchscreen_id: my_touchscreen"),i.push(`    x_min: ${f}`),i.push(`    x_max: ${y}`),i.push(`    y_min: ${m}`),i.push(`    y_max: ${_}`),(b!=="none"||a.entity_id)&&(i.push("    on_press:"),i.push("      - if:"),i.push("          condition:"),i.push(`            lambda: 'return id(display_page) == ${x};'`),i.push("          then:"),b==="next_page"?(i.push("            - script.execute:"),i.push("                id: change_page_to"),i.push("                target_page: !lambda 'return id(display_page) + 1;'")):b==="previous_page"?(i.push("            - script.execute:"),i.push("                id: change_page_to"),i.push("                target_page: !lambda 'return id(display_page) - 1;'")):b==="reload_page"?i.push("            - script.execute: manage_run_and_sleep"):a.entity_id&&(i.push("            - homeassistant.service:"),i.push("                service: homeassistant.toggle"),i.push("                data:"),i.push(`                  entity_id: ${a.entity_id}`)))}})),i.push(""),i}function oi(t,e,n="my_display"){const o=[];o.push("button:"),o.push("  - platform: template"),o.push('    name: "Next Page"'),o.push("    on_press:"),o.push("      then:"),o.push("        - script.execute:"),o.push("            id: change_page_to"),o.push("            target_page: !lambda 'return id(display_page) + 1;'"),o.push("  - platform: template"),o.push('    name: "Previous Page"'),o.push("    on_press:"),o.push("      then:"),o.push("        - script.execute:"),o.push("            id: change_page_to"),o.push("            target_page: !lambda 'return id(display_page) - 1;'"),o.push("  - platform: template"),o.push('    name: "Refresh Display"'),o.push("    on_press:"),o.push("      then:"),o.push(`        - component.update: ${n}`);for(let i=0;i<e;i++)o.push("  - platform: template"),o.push(`    name: "Go to Page ${i+1}"`),o.push("    on_press:"),o.push("      then:"),o.push("        - script.execute:"),o.push("            id: change_page_to"),o.push(`            target_page: ${i}`);return t.features&&t.features.buzzer&&(o.push("  # Buzzer Sounds"),o.push("  - platform: template"),o.push('    name: "Play Beep Short"'),o.push('    icon: "mdi:bell-ring"'),o.push("    on_press:"),o.push('      - rtttl.play: "beep:d=32,o=5,b=200:16e6"'),o.push(""),o.push("  - platform: template"),o.push('    name: "Play Beep OK"'),o.push('    icon: "mdi:check-circle-outline"'),o.push("    on_press:"),o.push('      - rtttl.play: "ok:d=16,o=5,b=200:e6"'),o.push(""),o.push("  - platform: template"),o.push('    name: "Play Beep Error"'),o.push('    icon: "mdi:alert-circle-outline"'),o.push("    on_press:"),o.push('      - rtttl.play: "error:d=16,o=5,b=200:c6"'),o.push(""),o.push("  - platform: template"),o.push('    name: "Play Star Wars"'),o.push('    icon: "mdi:music-note"'),o.push("    on_press:"),o.push('      - rtttl.play: "StarWars:d=4,o=5,b=45:32p,32f,32f,32f,8a#.,8f.6,32d#,32d,32c,8a#.6,4f.6,32d#,32d,32c,8a#.6,4f.6,32d#,32d,32d#,8c6"')),o.push(""),o}function si(t){if(!(t.features&&t.features.psram||t.features&&t.features.features&&t.features.features.psram))return[];const n=(t.chip||"").toLowerCase();if(["esp32-c3","esp32-c6","esp8266"].some(s=>n.includes(s)))return[];const i=["psram:"];return t.psram_mode&&(i.push(`  mode: ${t.psram_mode}`),i.push("  speed: 80MHz")),i.push(""),i}function ri(t){return!t.features||!t.features.axp2101||t.features.manual_pmic?[]:["axp2101:","  i2c_id: bus_a","  address: 0x34","  irq_pin: GPIO21","  battery_voltage:",'    name: "Battery Voltage"',"    id: battery_voltage","  battery_level:",'    name: "Battery Level"',"    id: battery_level","  on_setup:","    - axp2101.set_ldo_voltage:","        id: bldo1","        voltage: 3300mv","    - switch.turn_on: bldo1  # EPD_VCC (Screen Power)","    - axp2101.set_ldo_voltage:","        id: aldo1","        voltage: 3300mv","    - switch.turn_on: aldo1  # Peripherals","    - axp2101.set_ldo_voltage:","        id: aldo3","        voltage: 3300mv","    - switch.turn_on: aldo3  # Backlight/Logic",""]}function ai(t){const e=[],n=t.m5paper?.main_power_pin||t.pins?.main_power_pin||t.m5paper?.battery_power_pin||t.pins?.battery_power_pin;return!t||!t.pins||!t.pins.batteryEnable&&!t.pins.buzzer&&!n||(e.push("output:"),t.pins.batteryEnable&&(e.push("  - platform: gpio"),typeof t.pins.batteryEnable=="object"?(e.push("    pin:"),e.push(`      number: ${t.pins.batteryEnable.number}`),t.pins.batteryEnable.ignore_strapping_warning&&e.push("      ignore_strapping_warning: true"),t.pins.batteryEnable.inverted!==void 0&&e.push(`      inverted: ${t.pins.batteryEnable.inverted}`)):e.push(`    pin: ${t.pins.batteryEnable}`),e.push("    id: bsp_battery_enable")),(t.m5paper?.main_power_pin||t.pins?.main_power_pin)&&(t.pins.batteryEnable&&e.push(""),e.push("  - platform: gpio"),e.push(`    pin: ${t.m5paper?.main_power_pin||t.pins.main_power_pin}`),e.push("    id: main_power")),(t.m5paper?.battery_power_pin||t.pins?.battery_power_pin)&&((t.pins.batteryEnable||t.m5paper?.main_power_pin)&&e.push(""),e.push("  - platform: gpio"),e.push(`    pin: ${t.m5paper?.battery_power_pin||t.pins.battery_power_pin}`),e.push("    id: battery_power")),t.pins.buzzer&&(t.pins.batteryEnable&&e.push(""),e.push("  - platform: ledc"),e.push(`    pin: ${t.pins.buzzer}`),e.push("    id: buzzer_output")),e.push("")),e}function li(t){return!t.features||!t.features.buzzer?[]:["rtttl:","  id: reterminal_buzzer","  output: buzzer_output",""]}function di(t){if(!t||!t.audio)return[];const e=[];return t.audio.i2s_audio&&(e.push("i2s_audio:"),e.push(`  i2s_lrclk_pin: ${t.audio.i2s_audio.i2s_lrclk_pin}`),e.push(`  i2s_bclk_pin: ${t.audio.i2s_audio.i2s_bclk_pin}`),t.audio.i2s_audio.i2s_mclk_pin&&e.push(`  i2s_mclk_pin: ${t.audio.i2s_audio.i2s_mclk_pin}`),e.push("")),t.audio.speaker&&(e.push("speaker:"),e.push(`  - platform: ${t.audio.speaker.platform}`),e.push("    id: my_speaker"),t.audio.speaker.dac_type&&e.push(`    dac_type: ${t.audio.speaker.dac_type}`),t.audio.speaker.i2s_dout_pin&&e.push(`    i2s_dout_pin: ${t.audio.speaker.i2s_dout_pin}`),t.audio.speaker.mode&&e.push(`    mode: ${t.audio.speaker.mode}`),e.push("")),e}function ci(t,e=!1){return!t||t==="transparent"?'"0x000000"':t==="theme_auto"?e?'"0xFFFFFF"':'"0x000000"':t==="theme_auto_inverse"?e?'"0x000000"':'"0xFFFFFF"':t.startsWith("#")?'"0x'+t.substring(1).toUpperCase()+'"':`"${t}"`}function Fl(t){return t?{left:"top_left",center:"center",right:"top_right"}[t.toLowerCase()]||t.toLowerCase():"top_left"}function Wl(t,e,n,o){return`font_${(t||"Roboto").toLowerCase().replace(/\s+/g,"_")}_${n||400}_${e||20}${o?"_italic":""}`}function $l(t){return t==null?"cover":typeof t=="number"?t>=255?"cover":t<=0?"transp":Math.round(t/255*100)+"%":t}function pi(t,e,n=null,o={}){const i=[],s=n||(B?B[e]||{}:{});i.push("# ============================================================================"),i.push("# LVGL Configuration"),i.push("# ============================================================================"),i.push(""),i.push("lvgl:"),i.push("  id: my_lvgl"),i.push("  log_level: WARN");const r=!!o.darkMode,a=r?'"0x000000"':'"0xFFFFFF"';i.push(`  bg_color: ${a}`),i.push("  displays:");const l=s.features?.lcd?"my_display":"epaper_display";if(i.push(`    - ${l}`),s.touch&&(i.push("  touchscreens:"),i.push("    - my_touchscreen")),o.lcdEcoStrategy==="dim_after_timeout"){const c=(o.dimTimeout||10)+"s";i.push("  on_idle:"),i.push(`    timeout: ${c}`),i.push("    then:"),i.push("      - light.turn_off: display_backlight"),i.push("      - lvgl.pause:")}return i.push(""),i.push("  pages:"),t.forEach((c,d)=>{i.push(`    - id: page_${d}`),c.layout&&/^\d+x\d+$/.test(c.layout)&&i.push(`      layout: ${c.layout}`),i.push("      widgets:");const u=c.widgets||[];if(u.length===0){i.push("        []");return}u.filter(h=>!h.hidden&&h.type!=="group").forEach(h=>{i.push(`        ${Bo(h)}`);const p=zl(h,s,r);if(p){const f=Object.keys(p)[0],y=p[f];i.push(`        - ${f}:`),Yt(y,i,12)}})}),i}function Yt(t,e,n){const o=" ".repeat(n);Object.entries(t).forEach(([i,s])=>{if(!(s==null||s===""))if(Array.isArray(s))s.length===0?e.push(`${o}${i}: []`):(e.push(`${o}${i}:`),s.forEach(r=>{typeof r=="object"?(e.push(`${o}  -`),Yt(r,e,n+4)):e.push(`${o}  - ${ui(r)}`)}));else if(typeof s=="object")e.push(`${o}${i}:`),Yt(s,e,n+2);else if(typeof s=="string"&&s.includes(`
`)){const r=s.split(`
`);if(s.trim().startsWith("!lambda")){e.push(`${o}${i}: ${r[0].trim()}`);const l=r.slice(1).reduce((d,u)=>{if(!u.trim())return d;const h=u.match(/^ */);return Math.min(d,h?h[0].length:0)},1/0),c=l===1/0?0:l;for(let d=1;d<r.length;d++){const u=r[d].trim()===""?"":r[d].substring(c);e.push(`${o}  ${u}`)}}else e.push(`${o}${i}: |-`),r.forEach(a=>{e.push(`${o}  ${a}`)})}else e.push(`${o}${i}: ${ui(s)}`)})}function ui(t){if(t==null)return"";if(typeof t!="string")return String(t);const e=t.trim();return t.startsWith('"')&&t.endsWith('"')||t.startsWith("'")&&t.endsWith("'")||e.startsWith("!lambda")||e.startsWith("!secret")?t:/^[*&!|>%@,\-{}[\]?#:]/.test(e)||/^(true|false|null|yes|no)$/i.test(e)||e.includes(": ")||e.includes(" #")?JSON.stringify(t):t}function Bo(t){const e=[`# widget:${t.type}`];e.push(`id:${t.id}`),e.push(`type:${t.type}`),e.push(`x:${Math.round(t.x)}`),e.push(`y:${Math.round(t.y)}`);const n=t.w!==void 0?t.w:t.width!==void 0?t.width:0,o=t.h!==void 0?t.h:t.height!==void 0?t.height:0;return e.push(`w:${Math.round(n)}`),e.push(`h:${Math.round(o)}`),t.entity_id&&e.push(`entity:${t.entity_id}`),t.locked&&e.push("locked:true"),t.props&&Object.entries(t.props).forEach(([i,s])=>{if(!(s==null||s==="")&&!(i==="id"||i==="type"||i==="x"||i==="y"||i==="w"||i==="h"||i==="entity_id"))if(typeof s=="object")try{e.push(`${i}:${JSON.stringify(s)}`)}catch(r){v.warn(`[serializeWidget] Failed to serialize prop ${i}`,r)}else e.push(`${i}:${JSON.stringify(s)}`)}),e.join(" ").replace(/[\r\n]+/g," ")}function zl(t,e,n=!1){const o=t.props||{};e?.touch||e?.features&&e.features.touch;const i=Math.round(t.x||0),s=Math.round(t.y||0),r=Math.round(t.w||t.width||100),a=Math.round(t.h||t.height||100),l={id:t.id,x:i,y:s,width:r,height:a,hidden:o.hidden||void 0,clickable:o.clickable===!1?!1:void 0,checkable:o.checkable||void 0,scrollable:o.scrollable===!1?!1:void 0,floating:o.floating||void 0,ignore_layout:o.ignore_layout||void 0,scrollbar_mode:o.scrollbar_mode!=="AUTO"?o.scrollbar_mode:void 0};if(U){const c=U.get(t.type);if(c&&typeof c.exportLVGL=="function"){const d=()=>({type:"obj",attrs:{...l}}),u=c.exportLVGL(t,{profile:e,common:l,convertColor:h=>ci(h,n),convertAlign:Fl,getLVGLFont:Wl,formatOpacity:$l,getObjectDescriptor:d});return u&&u.type&&u.attrs?{[u.type]:u.attrs}:u}}return t.type&&(t.type.startsWith("lvgl_")||t.type.startsWith("shape_")||t.type==="rounded_rect"||t.type==="line"||t.type==="text"||t.type==="progress_bar"||t.type==="qr_code")?(v.warn(`[transpileToLVGL] Widget type ${t.type} has no exportLVGL function. Falling back to generic obj.`),{obj:{...l,bg_color:ci(o.bg_color||o.color||"white",n)}}):null}class Ul{constructor(){this.reset(),this.EXTENDED_GLYPHS=[...Array.from({length:95},(e,n)=>`\\U000000${(n+32).toString(16).toUpperCase().padStart(2,"0")}`),...Array.from({length:96},(e,n)=>`\\U000000${(n+160).toString(16).toUpperCase().padStart(2,"0")}`),"\\U000003BC","\\U000003A9","\\U000020AC","\\U00002122"]}reset(){this.definedFontIds=new Set,this.fontLines=[],this.iconCodesBySize=new Map}addFont(e,n,o,i=!1){const s=e.replace(/\s+/g,"_").toLowerCase();let r=parseInt(n)||400;e!=="Material Design Icons"&&(r=lt(e,r));const a=i?"_italic":"",l=String(o).replace(".","_"),c=`font_${s}_${r}_${l}${a}`;if(this.definedFontIds.has(c))return c;if(this.definedFontIds.add(c),e!=="Material Design Icons"){const d={id:c,file:{type:"gfonts",family:e,weight:r,italic:i},size:o,glyphs:[...this.EXTENDED_GLYPHS]};this.fontLines.push(d)}return c}trackIcon(e,n){if(!e)return;const o=parseInt(n,10);this.iconCodesBySize.has(o)||this.iconCodesBySize.set(o,new Set);let i=e;/^F[0-9A-F]{4}$/i.test(e)?i=e.toUpperCase():i=window.Utils?window.Utils.getIconCode(e):null,i&&this.iconCodesBySize.get(o).add(i)}getLines(e=[],n=!1){this.definedFontIds.size===0&&this.addFont("Roboto",400,20);const o=["font:"];this.fontLines.forEach(i=>{if(o.push("  - file:"),o.push(`      type: ${i.file.type}`),o.push(`      family: "${i.file.family}"`),o.push(`      weight: ${i.file.weight}`),o.push(`      italic: ${i.file.italic?"true":"false"}`),o.push(`    id: ${i.id}`),o.push(`    size: ${Math.round(i.size)}`),e&&e.length>0){const s=e.join(", ");o.push(`    glyphsets: [${s}]`),o.push("    ignore_missing_glyphs: true")}if(n||!e||e.length===0){const s=i.glyphs.map(r=>`"${r}"`).join(", ");o.push(`    glyphs: [${s}]`)}});for(const[i,s]of this.iconCodesBySize.entries()){const r=`font_material_design_icons_400_${i}`;o.push('  - file: "fonts/materialdesignicons-webfont.ttf"'),o.push(`    id: ${r}`),o.push(`    size: ${i}`);const a=Array.from(s).sort().map(l=>`"\\U000${l}"`).join(", ");o.push(`    glyphs: [${a}]`)}return o.length>1?o:[]}}class jl{generateInstructionHeader(e,n){const o=[];o.push("# ============================================================================"),o.push("# ESPHome YAML - Generated by ESPHome Designer"),o.push("# ============================================================================"),o.push(`# TARGET DEVICE: ${e.name||"Unknown"}`);const i=e.features||{},s=e.displayPlatform||(i.lcd?e.id==="reterminal_e1001"?"reterminal_e1001":"LCD":i.epaper?"waveshare_epaper":"Unknown"),r=e.chip||"esp32-s3",l=["esp32-c3","esp32-c6","esp8266"].some(f=>r.toLowerCase().includes(f)),c=i.psram&&!l;o.push(`#         - Display Platform: ${s}`),o.push(`#         - Touchscreen: ${i.touch?e.touch?.platform||"Yes":"No"}`),o.push(`#         - PSRAM: ${c?"Yes":"No"}`);let d="esp-idf (Recommended)";r==="esp8266"?d="Arduino (Default)":c&&(e.chip?.includes("s3")||e.id?.includes("s3"))&&(d="ESP-IDF (Required for stable PSRAM/LVGL)"),o.push(`#         - Framework: ${d}`),o.push("# ============================================================================"),o.push("#"),o.push("# SETUP INSTRUCTIONS:"),o.push("#"),o.push("# STEP 1: Copy the Material Design Icons font file"),o.push("#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf"),o.push("#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf"),o.push("#"),o.push("# STEP 2: Create a new device in ESPHome"),o.push('#         - Click "New Device"'),r==="esp8266"?(o.push("#         - Select: ESP8266"),o.push("#         - Framework: Arduino (Default)")):r==="esp32"?(o.push("#         - Select: ESP32"),o.push("#         - Framework: ESP-IDF (Recommended) or Arduino")):r.includes("c3")?(o.push("#         - Select: ESP32-C3"),o.push("#         - Framework: ESP-IDF (Recommended) or Arduino")):r.includes("c6")?(o.push("#         - Select: ESP32-C6"),o.push("#         - Framework: ESP-IDF (Recommended)")):(o.push("#         - Select: ESP32-S3 (or appropriate for your board)"),o.push("#         - Framework: ESP-IDF (Essential for S3 stability)")),o.push("#"),o.push("# STEP 3: PASTE this snippet into your device YAML"),o.push("#         - Paste this snippet at the end of your configuration.");const u=r==="esp8266"?"esp8266":"esp32";o.push(`#         - System sections (esphome, ${u}${r!=="esp8266"?", psram":""}) are auto-commented`),o.push("#           to avoid conflicts with your existing base setup."),o.push("#"),o.push("# CAPTIVE PORTAL:"),o.push("#         - If WiFi connection fails, the device will create a hotspot."),o.push("#         - Search for its name in your WiFi settings."),o.push("#         - Connect and go to http://192.168.4.1 to configure WiFi."),o.push("#"),r.includes("s3")&&(o.push("# TIP: For reTerminal / S3 devices, if you cannot see logs via USB,"),o.push("#      add this to your base 'logger:' section:"),o.push("#      hardware_uart: USB_CDC"),o.push("#")),o.push("# ============================================================================"),o.push(""),o.push("# ===================================="),o.push("# Device Settings"),o.push("# ===================================="),o.push(`# Orientation: ${n.orientation||"landscape"}`),o.push(`# Dark Mode: ${n.darkMode?"enabled":"disabled"}`),o.push(`# Refresh Interval: ${n.refreshInterval||600}`);const h=!!(e.features&&(e.features.lcd||e.features.oled));let p;if(n.manualRefreshOnly)p="Manual Refresh Only";else if(h){const f=n.lcdEcoStrategy||"backlight_off";p={always_on:"Always On",backlight_off:"Backlight Off Schedule",halt_updates:"Halt Updates",deep_sleep:"Deep Sleep",dim_after_timeout:"Dim after timeout"}[f]||f}else p=n.deepSleepEnabled?"Ultra Eco (Deep Sleep)":n.sleepEnabled?"Eco (Light Sleep)":"Always On";return o.push(`# Power Strategy: ${p}`),o.push(`# Deep Sleep Interval: ${n.deepSleepInterval||600}`),o.push("# ===================================="),o.push(""),o}generateSystemSections(e,n){const o=[],i=e.chip||"esp32-s3",s=e.board||(i==="esp8266"?"nodemcuv2":i==="esp32"?"esp32dev":i.includes("c3")?"esp32-c3-devkitm-1":i.includes("c6")?"esp32-c6-devkitc-1":"esp32-s3-devkitc-1"),r=!!(e.features&&(e.features.epaper||e.features.epd)),a=e.board==="m5stack-coreink"||e.name&&e.name.toLowerCase().includes("coreink");return o.push("# esphome:"),o.push("#   name: your-device-name"),o.push("#   comment: 'Snippet generated by ESPHome Designer'"),n.plugin_includes&&n.plugin_includes.length>0&&(o.push("#   includes:"),n.plugin_includes.forEach(l=>{o.push(`#     - ${l}`)})),o.push("#   on_boot:"),o.push("#     priority: 300"),o.push("#     then:"),a||(e.id==="esp32_s3_photopainter"&&(o.push("#       - lambda: |-"),o.push("#           auto write_reg = [](uint8_t reg, uint8_t val) {"),o.push("#             uint8_t data[2] = {reg, val};"),o.push("#             id(bus_a)->write(0x34, data, 2);"),o.push("#           };"),o.push("#           write_reg(0x94, 0x1C); // ALDO3 3.3V"),o.push("#           write_reg(0x95, 0x1C); // ALDO4 3.3V"),o.push("#           write_reg(0x90, 0x1F); // Enable rails"),o.push('#           ESP_LOGI("power", "AXP2101 Configured");'),o.push("#       - delay: 200ms"),o.push("#       - component.update: epaper_display")),e.battery&&e.pins&&e.pins.batteryEnable&&o.push("#       - output.turn_on: bsp_battery_enable"),(e.m5paper?.main_power_pin||e.pins?.main_power_pin)&&o.push("#       - output.turn_on: main_power"),(e.m5paper?.battery_power_pin||e.pins?.battery_power_pin)&&o.push("#       - output.turn_on: battery_power"),o.push("#       - delay: 2s")),a?(o.push("#       # 1. HARDWARE POWER LOCK (ESP-IDF Version)"),o.push("#       - lambda: |-"),o.push("#           gpio_set_direction(GPIO_NUM_12, GPIO_MODE_OUTPUT);"),o.push("#           gpio_set_level(GPIO_NUM_12, 1);"),o.push("#           gpio_hold_en(GPIO_NUM_12);"),o.push("#           gpio_deep_sleep_hold_en();"),o.push("#"),o.push("#       # 2. Start the Main Logic Loop"),o.push("#       - script.execute: manage_run_and_sleep"),o.push("#"),o.push("#       # 3. Initial Screen Update"),o.push("#       - component.update: epaper_display")):r&&n.deepSleepEnabled?o.push("#       - script.execute: deep_sleep_cycle"):o.push("#       - script.execute: manage_run_and_sleep"),n.autoCycleEnabled&&o.push("#       - script.execute: auto_cycle_timer"),i==="esp8266"?(o.push("#"),o.push("# esp8266:"),o.push(`#   board: ${s}`)):(o.push("#"),o.push("# esp32:"),o.push(`#   board: ${s}`),o.push("#   framework:"),o.push("#     type: esp-idf"),i.includes("s3")&&(o.push("#     sdkconfig_options:"),o.push("#       CONFIG_ESP32S3_DEFAULT_CPU_FREQ_240: y"),o.push("#       CONFIG_ESP32S3_DATA_CACHE_64KB: y"))),o.push("#"),o.push("# logger:"),i.includes("s3")&&o.push("#   hardware_uart: USB_CDC # Enable for USB debugging on S3"),o.push("#   level: DEBUG"),o.push("#"),o.push("# api:"),o.push("# ota:"),o.push("# wifi:"),o.push("#   # ... your wifi config here"),r&&n.deepSleepEnabled&&(o.push(""),o.push("deep_sleep:"),o.push("  id: deep_sleep_control"),o.push("  run_duration: 120s # Stay awake 120s on boot for OTA"),o.push(`  sleep_duration: ${n.deepSleepInterval||600}s`)),o.push(""),o}generateScriptSection(e,n,o){const i=[],s=o.features?.lcd?"my_display":"epaper_display",r=e.autoCycleEnabled&&n.length>1,a=!!(o.features&&(o.features.lcd||o.features.oled)),l=!!(o.features&&(o.features.epaper||o.features.epd)),c=!!(o.features&&o.features.oled),d=a?500:3e3,u=o.backlight&&o.backlight.pin?o.backlight.pin:o.pins?.backlight||null,h=e.lcdEcoStrategy||"backlight_off",p=a&&h==="backlight_off"&&u,f=l&&e.deepSleepEnabled;if(i.push("script:"),i.push("  - id: change_page_to"),i.push("    parameters:"),i.push("      target_page: int"),i.push("    then:"),i.push("      - lambda: |-"),i.push(`          int pages_count = ${n.length};`),i.push("          int target = target_page;"),i.push("          while (target < 0) target += pages_count;"),i.push("          target %= pages_count;"),i.push(""),i.push(`          // Debounce: Ignore page changes within ${d}ms of last change`),i.push(`          // (adjusted for ${a?"LCD":"e-paper"} display update time)`),i.push("          uint32_t now = millis();"),i.push(`          if (now - id(last_page_switch_time) < ${d}) {`),i.push('            ESP_LOGD("display", "Page change ignored (debounce), last switch was %d ms ago", now - id(last_page_switch_time));'),i.push("            return;"),i.push("          }"),i.push(""),i.push("          if (id(display_page) != target) {"),i.push("            // Set debounce time BEFORE display update (update takes ~1.6s)"),i.push("            id(last_page_switch_time) = now;"),i.push("            id(display_page) = target;"),i.push(`            id(${s}).update();`),i.push('            ESP_LOGI("display", "Switched to page %d", target);'),i.push("            // Restart refresh logic"),i.push("            if (id(manage_run_and_sleep).is_running()) id(manage_run_and_sleep).stop();"),i.push("            id(manage_run_and_sleep).execute();"),p&&(i.push("            // LCD Strategy: Wake up backlight on interaction/page change"),i.push("            id(backlight_pwm).set_level(0.8); // Restore brightness")),i.push("          }"),f){i.push(""),i.push("  - id: deep_sleep_cycle"),i.push("    then:"),i.push('      - logger.log: "Waiting for sync before Deep Sleep..."'),i.push("      - wait_until:"),i.push("          condition:"),i.push("            lambda: 'return id(ha_time).now().is_valid() && api_is_connected();'"),i.push("          timeout: 120s"),i.push("      - delay: 5s");const E=parseInt(e.noRefreshStartHour??e.sleepStartHour)||0,w=parseInt(e.noRefreshEndHour??e.sleepEndHour)||0;e.sleepEnabled===!0||e.sleepEnabled==="true"||e.sleepEnabled===1||e.sleepEnabled==="1"||e.deepSleepEnabled===!0||e.deepSleepEnabled==="true"||e.deepSleepEnabled===1||e.deepSleepEnabled==="1"?(i.push("      - if:"),i.push("          condition:"),i.push("            lambda: |-"),i.push("              auto time = id(ha_time).now();"),i.push("              if (time.is_valid()) {"),i.push("                  int hour = time.hour;"),i.push(`                  int start = ${E};`),i.push(`                  int end = ${w};`),i.push("                  if (start < end) {"),i.push("                      if (hour >= start && hour < end) return false;"),i.push("                  } else {"),i.push("                      if (hour >= start || hour < end) return false;"),i.push("                  }"),i.push("              }"),i.push("              return true;"),i.push("          then:"),i.push(`            - component.update: ${s}`),i.push("            - delay: 5s # Ensure refresh starts before sleep")):(i.push(`      - component.update: ${s}`),i.push("      - delay: 5s # Ensure refresh starts before sleep")),i.push('      - logger.log: "Entering Deep Sleep now..."'),i.push("      - deep_sleep.enter: deep_sleep_control")}i.push(""),i.push("  - id: manage_run_and_sleep","    mode: restart","    then:"),(o.m5paper?.main_power_pin||o.pins?.main_power_pin)&&i.push("      - output.turn_on: main_power"),(o.m5paper?.battery_power_pin||o.pins?.battery_power_pin)&&i.push("      - output.turn_on: battery_power"),i.push('      - logger.log: "Waiting for sync..."'),i.push("      - wait_until:"),i.push("          condition:"),i.push("            lambda: 'return id(ha_time).now().is_valid() && api_is_connected();'"),i.push("          timeout: 120s"),i.push("      - delay: 5s"),i.push("      - lambda: |-"),i.push("          int p = id(display_page);"),i.push("          int interval = id(page_refresh_default_s);"),i.push("          bool is_sleep_time = false;");const y=parseInt(e.noRefreshStartHour??e.sleepStartHour)||0,m=parseInt(e.noRefreshEndHour??e.sleepEndHour)||0,_=e.sleepEnabled===!0||e.sleepEnabled==="true"||e.sleepEnabled===1||e.sleepEnabled==="1"||e.deepSleepEnabled===!0||e.deepSleepEnabled==="true"||e.deepSleepEnabled===1||e.deepSleepEnabled==="1";i.push("          auto time = id(ha_time).now();"),i.push("          if (time.is_valid()) {"),i.push("             int hour = time.hour;"),i.push("             int minute = time.minute;"),i.push("             int curr_min = hour * 60 + minute;"),i.push(`             int start = ${y};`),i.push(`             int end = ${m};`),i.push("             if (start < end) {"),i.push("                 if (hour >= start && hour < end) is_sleep_time = true;"),i.push("             } else if (start > end) {"),i.push("                 if (hour >= start || hour < end) is_sleep_time = true;"),i.push("             } "),i.push(""),i.push("             // Visibility Logic: Find best page for current time"),i.push("             int best_page = -1;");const b=E=>{if(!E)return null;const w=E.split(":");return parseInt(w[0])*60+parseInt(w[1])};if(n.forEach((E,w)=>{const I=b(E.visible_from),P=b(E.visible_to);I!==null&&P!==null&&(I<P?i.push(`             if (best_page == -1 && curr_min >= ${I} && curr_min < ${P}) best_page = ${w};`):i.push(`             if (best_page == -1 && (curr_min >= ${I} || curr_min < ${P})) best_page = ${w};`))}),n.some(E=>E.visible_from||E.visible_to)&&n.forEach((E,w)=>{!E.visible_from&&!E.visible_to&&i.push(`             if (best_page == -1) best_page = ${w};`)}),i.push(""),i.push("             // If current page is invisible OR another should be shown, switch"),i.push("             if (best_page != -1 && best_page != p) {"),i.push('                 ESP_LOGI("display", "Auto-switching to scheduled page %d", best_page);'),i.push("                 id(change_page_to).execute(best_page);"),i.push("                 return;"),i.push("             }"),i.push("          }"),a?p?(i.push("          #ifdef USE_BACKLIGHT"),i.push("          if (is_sleep_time) {"),i.push("              auto call = id(backlight_pwm).make_call();"),i.push("              call.set_brightness(0.0);"),i.push("              call.perform();"),i.push("              interval = 3600; // Check back in an hour"),i.push("          } else {"),i.push("              auto call = id(backlight_pwm).make_call();"),i.push("              call.set_brightness(0.8);"),i.push("              call.perform();"),i.push("          }"),i.push("          #endif")):c&&_&&(i.push("          if (is_sleep_time) {"),i.push("              interval = 3600;"),i.push("          }")):_&&!f&&(i.push("          if (is_sleep_time) {"),i.push("              interval = 3600; // Sleep for an hour (skip updates)"),i.push("          }")),i.push("          if (!is_sleep_time) {"),n.forEach((E,w)=>{if(E.refresh_type==="daily"&&E.refresh_time){const I=b(E.refresh_time);i.push(`            if (p == ${w}) {`),i.push(`               int target_min = ${I};`),i.push("               int diff = target_min - curr_min;"),i.push("               if (diff <= 0) diff += 1440; // Next day"),i.push("               interval = diff * 60;"),i.push("            }")}else{const I=parseInt(E.refresh_s);!isNaN(I)&&I>0&&i.push(`            if (p == ${w}) interval = ${I};`)}}),i.push("          }"),i.push("          id(page_refresh_current_s) = interval;"),i.push(`      - component.update: ${s}`),!!e.manualRefreshOnly?i.push('      - logger.log: "Manual Refresh Only mode: stopping automatic refresh loop."'):(i.push("      - delay: !lambda 'return id(page_refresh_current_s) * 1000;'"),i.push("      - script.execute: manage_run_and_sleep")),r){const E=e.autoCycleIntervalS||30;i.push("  - id: auto_cycle_timer","    mode: restart","    then:"),i.push(`      - delay: ${E}s`),i.push("      - script.execute:"),i.push("          id: change_page_to"),i.push("          target_page: !lambda 'return id(display_page) + 1;'"),i.push("      - script.execute: auto_cycle_timer")}return i}}function Yl(t,e,n,o=!1,i={}){if(o&&(t=t.replace(/auto_clear_enabled:\s*true/g,"auto_clear_enabled: false")),e.resolution){const s=e.resolution,r=s.height>s.width,a=n==="portrait"||n==="portrait_inverted",l=n==="landscape_inverted"||n==="portrait_inverted",c=r!==a,d=t.match(/display:[\s\S]*?rotation:\s*(\d+)/),u=d?parseInt(d[1],10):0;let h=0;c&&(h+=90),l&&(h+=180);const p=(u+h)%360;if(v.log(`[Adapter] Orientation: ${n}, base rotation: ${u}, offset: ${h}, final: ${p}`),t=t.replace(/(display:[\s\S]*?rotation:\s*)\d+/g,`$1${p}`),e.name&&e.name.toLowerCase().includes("waveshare touch lcd 7")){const y=(e.name||"ESPHome-Device").replace(/["\\]/g,"").split(" ")[0];t=t.replace(/"Waveshare-7-Inch"/g,`"${y}-Hotspot"`)}const f=t.match(/^(\s*)id:\s*my_touchscreen/m);if(f){const y=f[1];let m="";if(p===0?m=`transform:
${y}  swap_xy: false
${y}  mirror_x: false
${y}  mirror_y: false`:p===90?m=`transform:
${y}  swap_xy: true
${y}  mirror_x: false
${y}  mirror_y: true`:p===180?m=`transform:
${y}  swap_xy: false
${y}  mirror_x: true
${y}  mirror_y: true`:p===270&&(m=`transform:
${y}  swap_xy: true
${y}  mirror_x: true
${y}  mirror_y: false`),m)if(new RegExp(`^${y}transform:`,"m").test(t)){const b=new RegExp(`^${y}transform:\\n(${y}  (swap_xy|mirror_x|mirror_y):.*\\n?)+`,"m");b.test(t)&&(t=t.replace(b,`${y}${m}
`))}else t=t.replace(f[0],`${f[0]}
${y}${m}`);if(o&&i.lcdEcoStrategy==="dim_after_timeout"&&!t.includes("on_release:")){const _=`
${y}on_release:
${y}  - if:
${y}      condition: lvgl.is_paused
${y}      then:
${y}        - lvgl.resume:
${y}        - lvgl.widget.redraw:
${y}        - light.turn_on: display_backlight`,b=t.search(/^touchscreen:/m);if(b!==-1){const S=t.slice(b).slice(12).match(/^\w/m);if(S){const E=b+12+S.index;t=t.slice(0,E)+_+`

`+t.slice(E)}else t=t.trimEnd()+_+`
`}}}}return t}function Vl(t,e){if(!e||e.trim()==="")return t;if(!t||t.trim()==="")return e;const n=["sensor:","binary_sensor:","text_sensor:","font:","image:","output:","light:","switch:","button:","script:","globals:","i2c:","spi:","external_components:","time:","interval:","fan:","cover:","climate:","number:","select:","datetime:","lock:","alarm_control_panel:","siren:","media_player:"],o=l=>{const c=new Map,d=l.split(`
`);let u=null,h=[],p=[];for(const f of d){const y=f.trim(),m=f.match(/^([a-z0-9_]+:)(\s*#.*)?$/),_=m&&!f.startsWith(" ")&&!f.startsWith("	"),b=_?m[1]:y;_&&n.includes(b)?(u&&c.set(u,h),u=b,h=[]):_&&!n.includes(b)?(u&&(c.set(u,h),u=null,h=[]),p.push(f)):u?h.push(f):p.push(f)}return u&&c.set(u,h),{sections:c,nonSectionLines:p}},i=o(t),s=o(e),r=new Map(i.sections);for(const[l,c]of s.sections)if(r.has(l)){const d=r.get(l);r.set(l,[...d,...c])}else r.set(l,c);const a=[];a.push(...i.nonSectionLines);for(const[l,c]of r)a.length>0&&a[a.length-1].trim()!==""&&a.push(""),a.push(l),a.push(...c);for(const l of s.nonSectionLines){const c=l.trim();if(c===""||c.startsWith("#"))continue;let d=!1;const u=l.match(/^([a-z0-9_]+:)(\s*#.*)?$/);if(u&&!l.startsWith(" ")){const h=u[1];d=i.nonSectionLines.some(p=>{const f=p.match(/^([a-z0-9_]+:)(\s*#.*)?$/);return f&&f[1]===h})}d||a.push(l)}return a.map(l=>l.trimEnd()).join(`
`)}function _n(t,e,n=""){if(!t)return"";let i=(e?t+"_"+e:t).replace(/[^a-z0-9_]/gi,"_").toLowerCase();const s=63-n.length;return i.length>s&&(i=i.substring(0,s)),i+n}function vn(t,e=null,n=null){const o=e||window.AppState;if(!t||!o?.entityStates)return!1;const i=o.entityStates[t];if(!i)return!1;const s=n?i.attributes?.[n]:i.state;if(s==null)return!1;const r=String(s).trim();return r===""?!1:isNaN(Number(r))}function ql(t){const e=(t.condition_entity||"").trim();if(!e)return"";const n=t.condition_operator||"==";let o=` cond_ent:"${e}" cond_op:"${n}"`;return t.condition_value&&(o+=` cond_val:"${t.condition_value}"`),t.condition_entity_2&&(o+=` cond_ent_2:"${t.condition_entity_2}"`),o+=` cond_inv:"${!!t.condition_invert}"`,o}function Xl(t){const e=(t.condition_entity||"").trim();if(!e)return null;const n=t.condition_operator||"==",o=e.startsWith("binary_sensor.")||e.startsWith("switch.")||e.startsWith("light."),i=["==","!=",">","<",">=","<="].includes(n),s=t.condition_value||"0.0";let r=`id(${e.replace(/\./g,"_")}).state`;const a=n==="=="||n==="!=",l=vn(e),c=isNaN(parseFloat(s));if(a&&(l||c)){if(r=`std::string(id(${e.replace(/\./g,"_")}).state)`,n==="==")return`${r} == "${s}"`;if(n==="!=")return`${r} != "${s}"`}const d=t.condition_invert?"false":"true";if(o){if(n==="==")return`${r} == ${d}`;if(n==="!=")return`${r} != ${d}`}if(i){if(n==="==")return`${r} == ${s}`;if(n==="!=")return`${r} != ${s}`;if(n===">")return`${r} > ${s}`;if(n==="<")return`${r} < ${s}`;if(n===">=")return`${r} >= ${s}`;if(n==="<=")return`${r} <= ${s}`}if(n==="compare_entity"&&t.condition_entity_2){const u=`id(${e.replace(/\./g,"_")}).state`,h=`id(${t.condition_entity_2.replace(/\./g,"_")}).state`;return`${u} == ${h}`}return null}function Kl(t){return t?t.replace(/\\/g,"\\\\").replace(/"/g,'\\"'):""}function Jl(t,e){if(t.type==="group")return[];const n=[],o=U?U.get(t.type):null,i=t.type&&t.type.startsWith("lvgl_");if(o&&typeof o.export=="function"){const s={...e,lines:n,addFont:(a,l,c,d)=>e.adapter.fonts.addFont(a,l,c,d),getColorConst:a=>re?re.getColorConst(a):`"${a}"`,getAlignX:(a,l,c)=>re?re.getAlignX(a,l,c):l,getAlignY:(a,l,c)=>re?re.getAlignY(a,l,c):l,addDitherMask:(a,l,c,d,u,h,p,f)=>re?re.addDitherMask(a,l,c,d,u,h,p,f||0):null,sanitize:a=>Kl(a),getCondProps:a=>ql(a),getConditionCheck:a=>Xl(a),Utils:re,COLORS:qt,ALIGNMENT:Xt,TEXT_Y_OFFSET:0,RECT_Y_OFFSET:0},r=o.export(t,s);r&&Array.isArray(r)?n.push(...r):r&&typeof r=="string"&&n.push(r)}else if(i){const s=Bo(t);n.push(s?s.replace(/[\r\n]+/g," "):"")}else n.push(`// widget:${t.type} id:${t.id} status:unsupported`),n.push(`        // Unsupported widget type: ${t.type}`);return n}function Zl(t,e,n,o,i){const s=[],r=n.features?.inverted_colors||e.invertedColors,a=!!(n.features&&(n.features.epaper||n.features.epd));return r?(s.push("const auto COLOR_WHITE = Color(0, 0, 0); // Inverted for e-ink"),s.push("const auto COLOR_BLACK = Color(255, 255, 255); // Inverted for e-ink")):(s.push("const auto COLOR_WHITE = Color(255, 255, 255);"),s.push("const auto COLOR_BLACK = Color(0, 0, 0);")),n.id==="esp32_s3_photopainter"||n.name&&n.name.includes("PhotoPainter")?(s.push("const auto COLOR_RED = Color(0, 0, 255);"),s.push("const auto COLOR_GREEN = Color(255, 128, 0);"),s.push("const auto COLOR_BLUE = Color(255, 255, 0);"),s.push("const auto COLOR_YELLOW = Color(0, 255, 0);"),s.push("const auto COLOR_ORANGE = Color(0, 0, 255); // Fallback to Red")):(s.push("const auto COLOR_RED = Color(255, 0, 0);"),s.push("const auto COLOR_GREEN = Color(0, 255, 0);"),s.push("const auto COLOR_BLUE = Color(0, 0, 255);"),s.push("const auto COLOR_YELLOW = Color(255, 255, 0);"),s.push("const auto COLOR_ORANGE = Color(255, 165, 0);")),s.push("auto color_off = COLOR_WHITE;"),s.push("auto color_on = COLOR_BLACK;"),s.push(""),s.push("// Helper to print text with word-wrap at widget boundary"),s.push("auto print_wrapped_text = [&](int x, int y, int max_w, int line_h, esphome::font::Font *font, Color color, TextAlign align, const char* text) {"),s.push("  if (!text || max_w <= 0) return;"),s.push("  int cx = x;"),s.push("  int cy = y;"),s.push("  std::string line;"),s.push("  std::string word;"),s.push("  const char* p = text;"),s.push("  while (*p) {"),s.push("    // SANITIZATION: Treat newlines, carriage returns, and tabs as spaces for flow"),s.push("    bool is_space = (*p == ' ' || *p == '\\n' || *p == '\\r' || *p == '\\t');"),s.push("    if (is_space) {"),s.push("      if (!word.empty()) {"),s.push("        int ww, wh, wbl, wx;"),s.push("        font->measure(word.c_str(), &ww, &wx, &wbl, &wh);"),s.push("        int lw = 0, lx;"),s.push('        if (!line.empty()) { font->measure(line.c_str(), &lw, &lx, &wbl, &wh); int sw, sx, sbl, sh; font->measure(" ", &sw, &sx, &sbl, &sh); lw += sw; }'),s.push("        if (lw + ww > max_w && !line.empty()) {"),s.push("          it.print(cx, cy, font, color, align, line.c_str());"),s.push("          cy += line_h;"),s.push("          line = word;"),s.push("        } else {"),s.push('          if (!line.empty()) line += " ";'),s.push("          line += word;"),s.push("        }"),s.push("        word.clear();"),s.push("      }"),s.push("    } else {"),s.push("      word += *p;"),s.push("    }"),s.push("    p++;"),s.push("  }"),s.push("  if (!word.empty()) {"),s.push("    int ww, wh, wbl, wx;"),s.push("    font->measure(word.c_str(), &ww, &wx, &wbl, &wh);"),s.push("    int lw = 0, lx;"),s.push('    if (!line.empty()) { font->measure(line.c_str(), &lw, &lx, &wbl, &wh); int sw, sx, sbl, sh; font->measure(" ", &sw, &sx, &sbl, &sh); lw += sw; }'),s.push("    if (lw + ww > max_w && !line.empty()) {"),s.push("      it.print(cx, cy, font, color, align, line.c_str());"),s.push("      cy += line_h;"),s.push("      line = word;"),s.push("    } else {"),s.push('      if (!line.empty()) line += " ";'),s.push("      line += word;"),s.push("    }"),s.push("  }"),s.push("  if (!line.empty()) {"),s.push("    it.print(cx, cy, font, color, align, line.c_str());"),s.push("  }"),s.push("};"),s.push(""),a&&(s.push("// Helper to apply a simple grey dither mask for e-paper (checkerboard)"),s.push("auto apply_grey_dither_mask = [&](int x_start, int y_start, int w, int h) {"),s.push("  for (int y = y_start; y < y_start + h; y++) {"),s.push("    for (int x = x_start; x < x_start + w; x++) {"),s.push("      if ((x + y) % 2 == 0) it.draw_pixel_at(x, y, COLOR_WHITE);"),s.push("      else it.draw_pixel_at(x, y, COLOR_BLACK);"),s.push("    }"),s.push("  }"),s.push("};"),s.push(""),s.push("// Helper to apply grey dither to text (subtractive - erases every other black pixel)"),s.push("auto apply_grey_dither_to_text = [&](int x_start, int y_start, int w, int h) {"),s.push("  for (int y = y_start; y < y_start + h; y++) {"),s.push("    for (int x = x_start; x < x_start + w; x++) {"),s.push("      if ((x + y) % 2 == 0) it.draw_pixel_at(x, y, COLOR_WHITE);"),s.push("    }"),s.push("  }"),s.push("};")),U&&U.onExportHelpers({lines:s,widgets:t.flatMap(l=>l.widgets||[])}),s.push("int currentPage = id(display_page);"),a||(s.push("static int last_rendered_page = -1;"),s.push("bool page_changed = (last_rendered_page != currentPage);"),s.push("if (page_changed) last_rendered_page = currentPage;")),t.forEach((l,c)=>{const d=l.name||`Page ${c+1}`;s.push("// ═══════════════════════════════════════════════════════════════"),s.push(`// ▸ PAGE: ${d}`),s.push("// ═══════════════════════════════════════════════════════════════"),s.push(`if (currentPage == ${c}) {`),s.push(`  // page:name "${d}"`),s.push(`  // page:dark_mode "${l.dark_mode||"inherit"}"`),s.push(`  // page:refresh_type "${l.refresh_type||"interval"}"`),s.push(`  // page:refresh_time "${l.refresh_time||""}"`),s.push(`  // page:visible_from "${l.visible_from||""}"`),s.push(`  // page:visible_to "${l.visible_to||""}"`);const u=l.dark_mode==="dark"||l.dark_mode==="inherit"&&e.darkMode;if(s.push("  // Clear screen for this page"),a?s.push(`  it.fill(${u?"COLOR_BLACK":"COLOR_WHITE"});`):(s.push("  if (page_changed) {"),s.push("    // Full clear on page change (prevents black artifacts)"),s.push(`    it.filled_rectangle(0, 0, it.get_width(), it.get_height(), ${u?"COLOR_BLACK":"COLOR_WHITE"});`),s.push("  } else {"),s.push("    // Fast clear for same-page updates"),s.push(`    it.fill(${u?"COLOR_BLACK":"COLOR_WHITE"});`),s.push("  }")),s.push(`  color_off = ${u?"COLOR_BLACK":"COLOR_WHITE"};`),s.push(`  color_on = ${u?"COLOR_WHITE":"COLOR_BLACK"};`),l.widgets){const h=l.widgets.filter(p=>!p.hidden&&p.type!=="group");h.forEach((p,f)=>{const y=Jl(p,{...o,layout:e,adapter:i,isEpaper:a,isDark:u});if(y.length>0){const m=y.reduce((b,x)=>{if(!x.trim())return b;const S=x.match(/^ */);return Math.min(b,S?S[0].length:0)},1/0),_=m===1/0?0:m;s.push(...y.map(b=>b.trim()?"  "+b.substring(_):"")),f<h.length-1&&s.push("  // ────────────────────────────────────────")}})}s.push("}")}),s}const Ho=["text_sensor.","weather.","calendar.","person.","device_tracker.","sun.","update.","scene."],Ql=(t,e)=>{const{seenEntityIds:n,seenSensorIds:o,appState:i}=e,s=t.flatMap(a=>(a.widgets||[]).filter(l=>!l.hidden)),r=[];return s.forEach(a=>{let l=(a.entity_id||"").trim();const c=a.props||{};if(!l||c.is_local_sensor||(["progress_bar","sensor_text","graph","battery_icon","wifi_signal","ondevice_temperature","ondevice_humidity"].includes(a.type)&&!l.includes(".")&&(l=`sensor.${l}`),a.type==="sensor_text"&&(c.is_text_sensor||c.attribute&&vn(l,i,c.attribute)))||a.type==="calendar")return;const u=l.includes(".")&&!l.startsWith("binary_sensor.")&&!Ho.some(f=>l.startsWith(f)),p=["switch.","light.","fan.","input_boolean.","cover.","lock."].some(f=>l.startsWith(f));if(u&&!p){const f=(c.attribute||"").trim(),y=f?`${l}__attr__${f}`:l;if(!n.has(y)){const m=_n(l,f);o.has(m)||(n.add(y),o.add(m),r.push("- platform: homeassistant"),r.push(`  id: ${m}`),r.push(`  entity_id: ${l}`),f&&r.push(`  attribute: ${f}`),r.push("  internal: true"))}}}),r},ed=(t,e)=>{const{seenEntityIds:n,seenSensorIds:o,appState:i}=e,s=t.flatMap(a=>(a.widgets||[]).filter(l=>!l.hidden)),r=[];return s.forEach(a=>{const l=(a.condition_entity||"").trim(),c=(a.entity_id||"").trim(),d=(a.entity_id_2||"").trim(),u=a.props||{};[{ent:l,attr:u.attribute},{ent:c,attr:u.attribute},{ent:d,attr:u.attribute2}].forEach(({ent:h,attr:p})=>{if(!h||u.is_local_sensor)return;const f=Ho.some(b=>h.startsWith(b));let y=!1;if(h===l&&a.condition_operator!=="range"){const b=a.condition_state,x=(b||"").toLowerCase(),S=["on","off","true","false","online","offline"];b&&isNaN(Number(b))&&!S.includes(x)&&(y=!0)}const m=(p||"").trim(),_=(h===c||h===d)&&m&&vn(h,i,m);if(f||y||_){const x=m.includes(".")||m.includes("[")?m.split(/[.\[]/)[0]:m,S=x?`${h}__attr__${x}`:h;if(!n.has(S)){const E=_n(h,x,"_txt");o.has(E)||(n.add(S),o.add(E),r.push("- platform: homeassistant"),r.push(`  id: ${E}`),r.push(`  entity_id: ${h}`),x&&r.push(`  attribute: ${x}`),r.push("  internal: true"))}}})}),r},td=(t,e)=>{const{seenEntityIds:n,seenSensorIds:o}=e,i=t.flatMap(a=>(a.widgets||[]).filter(l=>!l.hidden)),s=["binary_sensor.","switch.","light.","input_boolean.","fan.","cover.","vacuum.","lock."],r=[];return i.forEach(a=>{const l=(a.condition_entity||"").trim(),c=(a.entity_id||"").trim();[l,c].forEach(d=>{if(!d)return;if(s.some(h=>d.startsWith(h))&&!n.has(d)){const h=_n(d);o.has(h)||(n.add(d),o.add(h),r.push("- platform: homeassistant"),r.push(`  id: ${h}`),r.push(`  entity_id: ${d}`),r.push("  internal: true"))}})}),r},nd=t=>{if(!t)return"";const e=["esphome:","esp32:","psram:","wifi:","api:","ota:","logger:","web_server:","captive_portal:","platformio_options:","preferences:","substitutions:","deep_sleep:"],n=t.split(`
`),o=[];let i=!1;for(let s of n){const r=s.trim();if(r.length===0){o.push(s);continue}(s.match(/^\s*/)||[""])[0].length===0&&r.endsWith(":")?(i=e.some(l=>r.startsWith(l)),i?o.push("# "+s+" # (Auto-commented)"):o.push(s)):i?o.push("# "+s):o.push(s)}return o.join(`
`)},id=(t,e,n,o,i,s,r)=>{const a=/^(\s*)# __LAMBDA_PLACEHOLDER__/m,l=t.match(a),c=s;if(l){const y=l[1],m="# __LAMBDA_PLACEHOLDER__",_=new RegExp(`lambda:\\s*\\|-\\s*[\\r\\n]+\\s*${m.replace("#","\\#")}`).test(t);if(c)t=t.replace(a,"");else{const b=(_?"":y+`lambda: |-
`)+e.map(x=>x.trim()?y+"  "+x:"").join(`
`);t=t.replace(a,b)}}const d=/^(\s*)# __TOUCH_SENSORS_PLACEHOLDER__/m,u=t.match(d);if(u&&n&&n.length>0){const y=n.filter(m=>m.trim()!=="").join(`
`);t=t.replace(d,y)}else u&&(t=t.replace(d,""));t=Yl(t,o,i.orientation,c,i);const h=nd(t),p=[];let f=!1;for(const y of r){const m=y.trim();m.endsWith(":")&&!y.startsWith(" ")&&(f=m==="display:"),f||p.push(y)}return Vl(h,p.join(`
`))};class od extends We{constructor(){super(),this.fonts=new Ul,this.yaml=new jl,this.reset()}reset(){this.fonts&&this.fonts.reset(),this.usedPlugins=new Set}async generate(e){if(!e)return console.error("ESPHomeAdapter: Missing layout"),"";this.reset();const n=e.pages||[],o=e.deviceModel||(g?g.deviceModel:null)||window.currentDeviceModel||"reterminal_e1001",i=B||{},s=window.DEVICE_PROFILES||{};let a={...i,...s}[o]||{};if(o==="custom"&&e.customHardware){const k=e.customHardware;a={id:"custom",name:"Custom Device",chip:k.chip||"esp32-s3",displayPlatform:k.displayDriver||"generic_st7789",displayModel:k.displayModel,resolution:{width:k.resWidth||800,height:k.resHeight||480},shape:k.shape||"rect",pins:{i2c:k.pins?.sda?{sda:k.pins.sda,scl:k.pins.scl}:null,spi:k.pins?.clk?{clk:k.pins.clk,mosi:k.pins.mosi}:null,display:{cs:k.pins?.cs,dc:k.pins?.dc,reset:k.pins?.rst,busy:k.pins?.busy}},features:{psram:!!k.psram,lcd:k.tech==="lcd",epaper:k.tech==="epaper",touch:k.touchTech&&k.touchTech!=="none"},backlight:k.pins?.backlight?{platform:"gpio",pin:k.pins.backlight}:null,touch:k.touchTech&&k.touchTech!=="none"?{platform:k.touchTech,sda:k.pins?.sda,scl:k.pins?.scl,interrupt_pin:k.pins?.touch_int,reset_pin:k.pins?.touch_rst}:null}}let l=!!(a.features&&(a.features.lvgl||a.features.lv_display));const c=e.renderingMode||(g?g.settings?.renderingMode:null);if(c==="direct"?(l=!1,v.log("[ESPHomeAdapter] Rendering mode set to 'direct', skipping LVGL generation")):c==="lvgl"&&(l=!0,v.log("[ESPHomeAdapter] Rendering mode set to 'lvgl', forcing LVGL generation")),!l)for(const k of n){if(k.widgets){for(const O of k.widgets.filter(W=>!W.hidden))if(O.type.startsWith("lvgl_")){l=!0;break}}if(l)break}const d=[];e.isSelectionSnippet||(d.push(...this.yaml.generateInstructionHeader(a,e)),d.push(...this.yaml.generateSystemSections(a,e)),d.push(""));const u=a.features?.lcd?"my_display":"epaper_display";this.preProcessWidgetsPromise=this.preProcessWidgets(n),await this.preProcessWidgetsPromise;let h=null;a.isPackageBased&&(a.isOfflineImport&&a.content?h=a.content:a.hardwarePackage&&(h=await this.fetchHardwarePackage(a.hardwarePackage)));const p=[];n.forEach((k,O)=>{k.widgets&&k.widgets.forEach(W=>{W.hidden||(W._pageIndex=O,p.push(W))})});const f=new Set,y=new Set,m=new Set,_=new Map,b={widgets:p,profile:a,layout:e,displayId:u,adapter:this,isLvgl:l,seenEntityIds:f,seenSensorIds:y,seenTextEntityIds:m,pendingTriggers:_,appState:g},x=[],S=[];U.onExportEsphome({...b,lines:S}),x.push("- id: display_page","  type: int","  restore_value: false","  initial_value: '0'");const E=!!(a.features&&(a.features.epaper||a.features.epd)),w=!!(a.features&&a.features.lcd)||!E,I=e.refreshInterval||(w?60:e.deepSleepInterval||600);x.push("- id: page_refresh_default_s","  type: int","  restore_value: true",`  initial_value: '${I}'`),x.push("- id: page_refresh_current_s","  type: int","  restore_value: false","  initial_value: '60'"),x.push("- id: last_page_switch_time","  type: uint32_t","  restore_value: false","  initial_value: '0'"),U.onExportGlobals({...b,lines:x}),S.length>0&&(e.plugin_includes=S),a.isPackageBased||(d.length=0,e.isSelectionSnippet||(d.push(...this.yaml.generateInstructionHeader(a,e)),d.push(...this.yaml.generateSystemSections(a,e)),d.push(""))),x.length>0&&!e.isSelectionSnippet&&(d.push("globals:"),d.push(...x.map(k=>"  "+k))),!(h&&h.includes("psram:"))&&a.features?.psram&&si&&d.push(...si(a)),!a.isPackageBased&&!e.isSelectionSnippet?(d.push("http_request:","  verify_ssl: false","  timeout: 20s","  buffer_size_rx: 4096"),ei&&d.push(...ei(a)),ti&&d.push(...ti(a)),Qn&&d.push(...Qn(a)),ri&&d.push(...ri(a)),ai&&d.push(...ai(a)),Zn&&d.push(...Zn(a)),li&&d.push(...li(a)),di&&d.push(...di(a)),d.some(O=>String(O).split(`
`).some(W=>W.trim()==="time:"))||(d.push("time:","  - platform: homeassistant","    id: ha_time"),y.add("ha_time"))):e.isSelectionSnippet||d.some(O=>String(O).split(`
`).some(W=>W.trim()==="time:"))||(d.push("time:","  - platform: homeassistant","    id: ha_time"),y.add("ha_time")),a.features&&(a.pins?.batteryAdc&&(y.add("battery_voltage"),y.add("battery_level")),a.features.sht4x&&(y.add("sht4x_sensor"),y.add("sht4x_temperature"),y.add("sht4x_humidity")),(a.features.sht3x||a.features.sht3xd)&&(y.add("sht3x_sensor"),y.add("sht3x_temperature"),y.add("sht3x_humidity")),a.features.shtc3&&(y.add("shtc3_sensor"),y.add("shtc3_temperature"),y.add("shtc3_humidity"))),ii&&d.push(...ii(a,[],u,p));const D=[];U.onExportNumericSensors({...b,lines:D,mainLines:d});const R=this.processPendingTriggers(D,_,l,"on_value");R.length>0&&(d.some(k=>k==="sensor:")||d.push("sensor:"),d.push(...R.flatMap(k=>k.split(`
`).map(O=>"  "+O))));const G=Ql(n,b);if(G.length>0){d.some(O=>O==="sensor:")||d.push("sensor:");const k=this.processPendingTriggers(G,_,l,"on_value");d.push(...k.flatMap(O=>O.split(`
`).map(W=>"  "+W)))}const H=ed(n,b),N=[];U.onExportTextSensors({...b,lines:N}),H.length>0&&N.push(...H);const $=this.processPendingTriggers(N,_,l,"on_value");$.length>0&&(d.push("text_sensor:"),d.push(...$.flatMap(k=>k.split(`
`).map(O=>"  "+O))));const j=[];if(!a.isPackageBased&&st){const k=st(a,n.length,u,[]);k.length>0&&k[0].trim()==="binary_sensor:"?j.push(...k.slice(1).map(O=>O.startsWith("  ")?O.slice(2):O)):j.push(...k)}const ae=p.filter(k=>k.type==="touch_area"||k.type==="template_nav_bar");let te=[];if(ae.length>0&&st){const k=st({features:{}},n.length,u,ae);if(k.length>0){const O=k[0]?.trim()==="binary_sensor:"?1:0;k.length>O&&(a.isPackageBased?te=k.slice(O):(j.push("# Touch Area Binary Sensors"),j.push(...k.slice(O).map(W=>W.startsWith("  ")?W.slice(2):W))))}}this._pendingTouchSensors=te,U.onExportBinarySensors({...b,lines:j});const V=this.processPendingTriggers(j,_,l,"on_state");V.length>0&&!a.isPackageBased&&(d.push("binary_sensor:"),d.push(...V.flatMap(k=>k.split(`
`).map(O=>"  "+O))));const se=td(n,b);if(se.length>0){d.some(O=>O==="binary_sensor:")||d.push("binary_sensor:");const k=this.processPendingTriggers(se,_,l,"on_state");d.push(...k.flatMap(O=>O.split(`
`).map(W=>"  "+W)))}if(!a.isPackageBased&&oi){const k=oi(a,n.length,u);k.length>0&&d.push(...k)}const ie=U.getAll(),F=["image","online_image","graph","qr_code"];ie.sort((k,O)=>{const W=F.indexOf(k.id),pe=F.indexOf(O.id);return W!==-1&&pe!==-1?W-pe:W!==-1?-1:pe!==-1?1:k.id.localeCompare(O.id)}),ie.forEach(k=>k.onExportComponents&&k.onExportComponents({...b,lines:d}));const le=Zl(n,e,a,b,this);d.push(...this.fonts.getLines(e.glyphsets,e.extendedLatinGlyphs));const q=this.yaml.generateScriptSection(e,n,a);q.length>0&&d.push(...q);let $e=!1;if(l&&pi){const k=pi(n,o,a,e);k&&k.length>0&&(d.push(...k),$e=!0)}if(a.isPackageBased){if(h)return id(h,le,this._pendingTouchSensors,a,e,l,d)}else{const k=ni?ni(a,e,l):[];d.push(...k);for(let O=0;O<d.length;O++)if(d[O].trim()==="display:"){let W=O+1;for(;W<d.length&&(d[W].startsWith("  ")||d[W].trim()==="");)W++;$e||d.splice(W,0,"    lambda: |-",...le.map(pe=>pe.trim()?"      "+pe:""));break}}return d.map(k=>k.trimEnd()).join(`
`)}async preProcessWidgets(e){for(const n of e)if(n.widgets)for(const o of n.widgets.filter(i=>!i.hidden&&i.type!=="group")){const i=o.type,s=U?await U.load(i):null;s&&(this.usedPlugins.add(s),typeof s.collectRequirements=="function"&&s.collectRequirements(o,{trackIcon:(r,a)=>this.fonts.trackIcon(r,a),addFont:(r,a,l,c)=>this.fonts.addFont(r,a,l,c)}))}}processPendingTriggers(e,n,o,i="on_value"){if(!o||!n||n.size===0)return e;const s=[];let r=null;for(let a=0;a<e.length;a++){const l=e[a],c=l.trim();s.push(l);const d=l.match(/^\s*(entity_id|id):\s*"?([^"]+)"?/);if(d){const u=d[2].trim();if(n.has(u)){let p=!1;const f=(l.match(/^\s*/)||[""])[0].length;for(let y=a+1;y<e.length;y++){const m=e[y],_=m.trim();if(!_)continue;if((m.match(/^\s*/)||[""])[0].length<=f&&_.startsWith("-"))break;if(_===`${i}:`){p=!0;break}}if(p)r={triggers:n.get(u),active:!0};else{const y=" ".repeat(f);s.push(`${y}${i}:`),s.push(`${y}  then:`);for(const m of n.get(u))m.split(`
`).forEach(b=>{s.push(`${y}    ${b}`)})}}}if(r&&r.active){if(c===`${i}:`)r.foundKey=!0;else if(r.foundKey){if(c==="then:"){const u=" ".repeat((l.match(/^\s*/)||[""])[0].length+2);for(const h of r.triggers)h.split(`
`).forEach(f=>{s.push(`${u}${f}`)});r=null}else if(c.startsWith("-")){const u=" ".repeat((l.match(/^\s*/)||[""])[0].length);for(const h of r.triggers)h.split(`
`).forEach(f=>{s.push(`${u}${f}`)});r=null}}}}return s}async fetchHardwarePackage(e){let n=e;window.location.pathname.includes("/esphome-designer/editor")&&!e.startsWith("http")&&!e.startsWith("/")&&(n="/esphome-designer/editor/static/"+e);try{const o=await fetch(n,{cache:"no-store"});if(!o.ok)throw new Error(`HTTP ${o.status}`);return await o.text()}catch(o){return v.error("Failed to fetch hardware package:",o),`# ERROR LOADING PROFILE: ${o.message}`}}}class No extends We{constructor(){super()}async generate(e){if(!e)return console.error("OEPLAdapter: Missing layout"),"[]";const n=e.pages||[],o=e.currentPageIndex||0,i=n[o];if(!i||!i.widgets)return"[]";const s=[];i.widgets.forEach(p=>{if(p.hidden||p.type==="group")return;const f=this.generateWidget(p,{layout:e,page:i});f&&(Array.isArray(f)?f:[f]).forEach(m=>{m&&typeof m=="object"&&!m.id&&(m.id=p.id),s.push(m)})});const a=(e.orientation||"landscape")==="portrait"?90:0,l=e.protocolHardware||{},c=(l.colorMode==="bw"||l.colorMode==="grayscale",e.darkMode?"black":"white"),h={service:"open_epaper_link.drawcustom",target:{entity_id:(e.settings||{}).oeplEntityId||"open_epaper_link.0000000000000000"},data:{background:c,rotate:a,dither:2,ttl:60,payload:s}};return JSON.stringify(h,null,2)}generateWidget(e,n){const o=PluginRegistry?PluginRegistry.get(e.type):null;if(o&&typeof o.exportOEPL=="function")try{return o.exportOEPL(e,n)}catch(i){return v.error(`Error in exportOEPL for ${e.type}:`,i),null}else return this._warnedTypes||(this._warnedTypes=new Set),this._warnedTypes.has(e.type)||(v.warn(`Widget type "${e.type}" does not support OEPL export yet.`),this._warnedTypes.add(e.type)),null}}window.OEPLAdapter=No;class Go extends We{constructor(){super()}async generate(e){if(!e)return v.error("OpenDisplayAdapter: Missing layout"),"";const n=e.pages||[],o=e.currentPageIndex||0,i=n[o];if(!i||!i.widgets)return"";const s=[];e.protocolHardware;const a=i.dark_mode==="dark"||i.dark_mode==="inherit"&&e.darkMode?"black":"white";i.widgets.forEach(p=>{if(p.hidden||p.type==="group")return;const f=this.generateWidget(p,{layout:e,page:i});f&&(Array.isArray(f)?f:[f]).forEach(m=>{m&&typeof m=="object"&&!m.id&&(m.id=p.id),s.push(m)})});const c=(e.orientation||"landscape")==="portrait"?90:0,d=e.settings||{},u=d.opendisplayEntityId||"opendisplay.0000000000000000";let h=`service: opendisplay.drawcustom
`;return h+=`target:
  entity_id: ${u}
`,h+=`data:
`,h+=`  background: "${a}"
`,h+=`  rotate: ${c}
`,h+=`  dither: ${d.opendisplayDither??2}
`,h+=`  ttl: ${d.opendisplayTtl||60}
`,h+=`  payload: |-
`,s.forEach(p=>{const f=p.id?`
    # id: ${p.id}`:"";h+=`${f}
    - type: ${p.type}
`,Object.entries(p).forEach(([y,m])=>{if(y==="type"||y==="id")return;let _=m;typeof m=="string"?(m.includes(`
`)||m.includes(":"))&&(_=`"${m.replace(/"/g,'\\"')}"`):(Array.isArray(m)||typeof m=="object"&&m!==null)&&(_=JSON.stringify(m)),h+=`      ${y}: ${_}
`})}),h}generateWidget(e,n){const o=PluginRegistry?PluginRegistry.get(e.type):null;if(o&&typeof o.exportOpenDisplay=="function")try{return o.exportOpenDisplay(e,n)}catch(i){return v.error(`Error in exportOpenDisplay for ${e.type}:`,i),null}else return this._warnedTypes||(this._warnedTypes=new Set),this._warnedTypes.has(e.type)||(v.warn(`Widget type "${e.type}" does not support OpenDisplay export yet.`),this._warnedTypes.add(e.type)),null}}window.OpenDisplayAdapter=Go;window.LAYOUT={WIDGET:{SMALL:{W:100,H:20},MEDIUM:{W:200,H:60},LARGE:{W:200,H:100}},FONT:{SIZE:{XS:12,S:14,M:16,L:20,XL:28,XXL:40},DEFAULT:{LABEL:14,VALUE:20,TITLE:28,DATE:16}},GRID:{GAP:10,MARGIN:10}};Object.freeze(window.LAYOUT);class sd{constructor(){this.modal=null,this.currentLayoutId="reterminal_e1001",this.layouts=[]}init(){this.createModal(),this.bindButton(),v.log("[LayoutManager] Initialized")}bindButton(){const e=document.getElementById("manageLayoutsBtn");e&&e.addEventListener("click",()=>this.open())}createModal(){if(document.getElementById("layoutManagerModal")){this.modal=document.getElementById("layoutManagerModal");return}const e=document.createElement("div");e.id="layoutManagerModal",e.className="modal-backdrop hidden",e.innerHTML=`
            <div class="modal" style="max-width: 600px;">
                <div class="modal-header">
                    <div>📁 Manage Layouts</div>
                    <button id="layoutManagerClose" class="btn btn-secondary">×</button>
                </div>
                <div class="modal-body">
                    <div class="layout-manager-current" style="margin-bottom: 12px; padding: 8px; background: var(--bg-subtle); border-radius: 4px;">
                        <span class="prop-label" style="font-size: 11px; color: var(--muted);">Current Layout:</span>
                        <span id="layoutManagerCurrentName" style="font-weight: 500; margin-left: 8px;">Loading...</span>
                    </div>
                    
                    <div class="layout-manager-list-container" style="max-height: 300px; overflow-y: auto; margin-bottom: 12px;">
                        <table class="layout-manager-table" style="width: 100%; border-collapse: collapse;">
                            <thead>
                                <tr style="border-bottom: 1px solid var(--border);">
                                    <th style="text-align: left; padding: 8px 4px; font-size: 11px;">Name</th>
                                    <th style="text-align: left; padding: 8px 4px; font-size: 11px;">Device</th>
                                    <th style="text-align: left; padding: 8px 4px; font-size: 11px;">Pages</th>
                                    <th style="text-align: right; padding: 8px 4px; font-size: 11px;">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="layoutManagerTableBody">
                                <tr><td colspan="4" style="text-align: center; color: var(--muted); padding: 16px;">Loading...</td></tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="layout-manager-actions" style="display: flex; gap: 8px; flex-wrap: wrap;">
                        <button id="layoutManagerNew" class="btn btn-primary" style="flex: 1;">+ New Layout</button>
                        <button id="layoutManagerImport" class="btn btn-secondary" style="flex: 1;">📥 Import from File</button>
                        <input type="file" id="layoutManagerFileInput" accept=".json" style="display: none;">
                    </div>
                    
                    <div id="layoutManagerStatus" class="layout-manager-status" style="margin-top: 8px; font-size: 11px; min-height: 20px;"></div>
                </div>
            </div>
        `,document.body.appendChild(e),this.modal=e,document.getElementById("layoutManagerClose").addEventListener("click",()=>this.close()),document.getElementById("layoutManagerNew").addEventListener("click",()=>this.showNewLayoutDialog()),document.getElementById("layoutManagerImport").addEventListener("click",()=>{document.getElementById("layoutManagerFileInput").click()}),document.getElementById("layoutManagerFileInput").addEventListener("change",n=>this.handleFileImport(n)),e.addEventListener("click",n=>{n.target===e&&this.close()})}async open(){this.modal||this.createModal(),this.modal.classList.remove("hidden"),await this.loadLayouts()}close(){this.modal&&this.modal.classList.add("hidden")}setStatus(e,n="info"){const o=document.getElementById("layoutManagerStatus");if(o){const i={success:"var(--success, #22c55e)",error:"var(--danger, #ef4444)",info:"var(--muted, #888)"};o.textContent=e,o.style.color=i[n]||i.info,e&&setTimeout(()=>{o.textContent=""},5e3)}}async loadLayouts(){if(typeof z!="function"||!z()){this.setStatus("Not connected to Home Assistant","error");return}try{const e=await fetch(`${X}/layouts`);if(!e.ok)throw new Error(`Failed to load layouts: ${e.status}`);const n=await e.json();this.layouts=n.layouts||[],n.last_active_layout_id&&this.layouts.some(o=>o.id===n.last_active_layout_id)&&(!window.AppState?.currentLayoutId||window.AppState.currentLayoutId==="reterminal_e1001")&&this.layouts.find(i=>i.id===n.last_active_layout_id)&&n.last_active_layout_id!==window.AppState?.currentLayoutId&&(v.log(`[LayoutManager] Syncing to last active layout: ${n.last_active_layout_id}`),this.currentLayoutId=n.last_active_layout_id,window.AppState&&typeof window.AppState.setCurrentLayoutId=="function"&&window.AppState.setCurrentLayoutId(n.last_active_layout_id)),this.renderLayoutList()}catch(e){v.error("[LayoutManager] Error loading layouts:",e),this.setStatus("Failed to load layouts","error")}}renderLayoutList(){const e=document.getElementById("layoutManagerTableBody"),n=document.getElementById("layoutManagerCurrentName");if(!e)return;window.AppState&&window.AppState.currentLayoutId&&(this.currentLayoutId=window.AppState.currentLayoutId);const o=this.layouts.find(i=>i.id===this.currentLayoutId);if(n&&(n.textContent=o?o.name:this.currentLayoutId),this.layouts.length===0){e.innerHTML='<tr><td colspan="4" style="text-align: center; color: var(--muted); padding: 16px;">No layouts found</td></tr>';return}e.innerHTML=this.layouts.map(i=>{const s=i.id===this.currentLayoutId,r=this.layouts.filter(a=>a.name===i.name).length>1;return`
                <tr style="border-bottom: 1px solid var(--border-subtle); ${s?"background: var(--accent-soft);":""}">
                    <td style="padding: 8px 4px;">
                        <span style="font-weight: 500;">${this.escapeHtml(i.name)}</span>
                        ${s?'<span style="background: var(--accent); color: white; font-size: 9px; padding: 2px 4px; border-radius: 2px; margin-left: 4px;">current</span>':""}
                        ${r?'<br><span style="font-size: 9px; color: var(--muted);">'+this.escapeHtml(i.id)+"</span>":""}
                    </td>
                    <td style="padding: 8px 4px; font-size: 11px; color: var(--muted);">${this.getDeviceDisplayName(i.device_model||i.device_type)}</td>
                    <td style="padding: 8px 4px; font-size: 11px; color: var(--muted);">${i.page_count} pages</td>
                    <td style="padding: 8px 4px; text-align: right;">
                        <div style="display: flex; gap: 4px; justify-content: flex-end;">
                            ${s?"":`<button class="btn btn-sm btn-primary" style="font-size: 10px; padding: 4px 8px;" onclick="window.layoutManager.loadLayout('${i.id}')">Load</button>`}
                            <button class="btn btn-sm btn-secondary" style="font-size: 10px; padding: 4px 8px;" onclick="window.layoutManager.exportLayout('${i.id}')">📤</button>
                            ${!s&&this.layouts.length>1?`<button class="btn btn-sm btn-secondary" style="font-size: 10px; padding: 4px 8px; color: var(--danger);" onclick="window.layoutManager.deleteLayout('${i.id}', '${this.escapeHtml(i.name)}')">🗑</button>`:""}
                        </div>
                    </td>
                </tr>
            `}).join("")}escapeHtml(e){const n=document.createElement("div");return n.textContent=e||"",n.innerHTML}getDeviceDisplayName(e){if(B&&B[e]){let i=B[e].name;return(ft||[]).includes(e)||(i+=" (untested)"),i}return{reterminal_e1001:"E1001 (Mono)",reterminal_e1002:"E1002 (Color)",trmnl:"TRMNL",esp32_s3_photopainter:"PhotoPainter (7-Color)"}[e]||e||"Unknown"}async loadLayout(e){if(!(typeof z!="function"||!z()))try{this.setStatus("Loading layout...","info");const n=await fetch(`${X}/layouts/${e}`);if(!n.ok)throw new Error(`Failed to load layout: ${n.status}`);const o=await n.json();o.device_id||(o.device_id=e),this.currentLayoutId=e,window.AppState&&typeof window.AppState.setCurrentLayoutId=="function"&&(window.AppState.setCurrentLayoutId(e),v.log(`[LayoutManager] Set currentLayoutId to: ${e}`));const i=document.getElementById("canvas");if(i){const s=i.querySelector(".canvas-grid");i.innerHTML="",s&&i.appendChild(s),v.log("[LayoutManager] Cleared canvas before loading layout")}document.querySelectorAll(".graph-axis-label").forEach(s=>s.remove()),typeof Ee=="function"&&Ee(o),window.AppState&&window.AppState.currentLayoutId!==e&&(window.AppState.setCurrentLayoutId(e),v.log(`[LayoutManager] Re-set currentLayoutId to: ${e} (was changed by loadLayoutIntoState)`)),typeof L=="function"&&typeof C<"u"&&L(C.LAYOUT_IMPORTED,o),this.setStatus(`Loaded: ${o.name||e}`,"success"),this.renderLayoutList(),setTimeout(()=>this.close(),500)}catch(n){v.error("[LayoutManager] Error loading layout:",n),this.setStatus("Failed to load layout","error")}}async exportLayout(e){if(!(typeof z!="function"||!z()))try{const n=`${X}/export?id=${e}`,o=document.createElement("a");o.href=n,o.download=`${e}_layout.json`,document.body.appendChild(o),o.click(),document.body.removeChild(o),this.setStatus("Export started...","success")}catch(n){v.error("[LayoutManager] Error exporting layout:",n),this.setStatus("Failed to export layout","error")}}async deleteLayout(e,n){if(!(typeof z!="function"||!z()||!confirm(`Are you sure you want to delete "${n}"?

This cannot be undone.`))){this.setStatus("Deleting layout...","info");try{const i=await fetch(`${X}/layouts/${e}`,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify({action:"delete"})});if(!i.ok){const s=await i.json().catch(()=>({}));if(s.error==="cannot_delete_last_layout"){this.setStatus("Cannot delete the last layout","error");return}throw new Error(s.error||`Delete failed: ${i.status}`)}this.setStatus(`Deleted: ${n}`,"success"),await this.loadLayouts()}catch(i){v.warn("[LayoutManager] Network error during delete, verifying if operation completed..."),await new Promise(r=>setTimeout(r,1500)),await this.loadLayouts(),this.layouts.some(r=>r.id===e)?(v.error("[LayoutManager] Error deleting layout:",i),this.setStatus("Failed to delete layout","error")):(v.log("[LayoutManager] Layout was successfully deleted (verified after refresh)"),this.setStatus(`Deleted: ${n}`,"success"))}}}showNewLayoutDialog(){if(!document.getElementById("newLayoutModal")){const s=document.createElement("div");s.id="newLayoutModal",s.className="modal-backdrop hidden",s.innerHTML=`
                <div class="modal" style="max-width: 400px;">
                    <div class="modal-header">
                        <div>Create New Layout</div>
                        <button id="newLayoutClose" class="btn btn-secondary">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="field" style="margin-bottom: 12px;">
                            <div class="prop-label">Layout Name</div>
                            <input id="newLayoutName" class="prop-input" type="text" placeholder="e.g. Living Room Display" />
                        </div>
                        <div class="field">
                            <div class="prop-label">Device Type</div>
                            <select id="newLayoutDeviceType" class="prop-input">
                                ${this.generateDeviceOptions()}
                            </select>
                            <p class="hint" style="color: var(--muted); font-size: 11px; margin-top: 4px;">Select the device that will display this layout.</p>
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button id="newLayoutCancel" class="btn btn-secondary">Cancel</button>
                        <button id="newLayoutConfirm" class="btn btn-primary">Create Layout</button>
                    </div>
                </div>
            `,document.body.appendChild(s),document.getElementById("newLayoutClose").addEventListener("click",()=>{s.classList.add("hidden")}),document.getElementById("newLayoutCancel").addEventListener("click",()=>{s.classList.add("hidden")}),document.getElementById("newLayoutConfirm").addEventListener("click",()=>{this.handleCreateLayoutConfirm()}),document.getElementById("newLayoutName").addEventListener("keydown",r=>{r.key==="Enter"?(r.preventDefault(),this.handleCreateLayoutConfirm()):r.key==="Escape"&&s.classList.add("hidden"),r.stopPropagation()}),s.addEventListener("click",r=>{if(r.target===s){const a=document.getElementById("newLayoutName");document.activeElement!==a&&s.classList.add("hidden")}})}const e=document.getElementById("newLayoutName"),o=`Layout ${this.layouts.length+1}`;e.value=o,g.deviceModel||g.settings&&g.settings.device_model;const i=B?Object.keys(B)[0]:"reterminal_e1001";document.getElementById("newLayoutDeviceType").value=i,document.getElementById("newLayoutModal").classList.remove("hidden"),setTimeout(()=>e.focus(),100)}handleCreateLayoutConfirm(){const e=document.getElementById("newLayoutName").value.trim(),n=document.getElementById("newLayoutDeviceType").value;if(!e){alert("Please enter a layout name.");return}document.getElementById("newLayoutModal").classList.add("hidden"),this.createLayout(e,n)}generateDeviceOptions(){if(B){const e=ft||[];return Object.entries(B).map(([n,o])=>{let i=o.name;return e.includes(n)||(i+=" (untested)"),`<option value="${n}">${i}</option>`}).join("")}return'<option value="reterminal_e1001">reTerminal E1001</option>'}async createLayout(e,n="reterminal_e1001"){if(typeof z!="function"||!z())return;let o=e.toLowerCase().replace(/\s+/g,"_").replace(/[^a-z0-9_]/g,"");o||(o="layout");const i=o+"_"+Date.now();this.setStatus("Creating layout...","info");let s=!1;try{const r=await fetch(`${X}/layouts`,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify({id:i,name:e,device_type:n,device_model:n})});if(!r.ok){const a=await r.json().catch(()=>({}));throw new Error(a.error||`Create failed: ${r.status}`)}s=!0}catch(r){if(v.warn("[LayoutManager] Network error during create, verifying if operation completed..."),await new Promise(l=>setTimeout(l,1500)),await this.loadLayouts(),this.layouts.some(l=>l.id===i))v.log("[LayoutManager] Layout was successfully created (verified after refresh)"),s=!0;else{v.error("[LayoutManager] Error creating layout:",r),this.setStatus("Failed to create layout","error");return}}if(s){this.setStatus(`Created: ${e}`,"success"),await this.loadLayouts();const r=B[n],a=r&&r.features&&r.features.epaper,l=r&&r.features&&r.features.lvgl,c=a&&!l?"direct":"lvgl";v.log(`[LayoutManager] New layout ${i} detected device type. isEpaper=${a}, hasLvgl=${l}. Setting initial renderingMode to: ${c}`),window.AppState&&(window.AppState.setPages([{id:"page_0",name:"Page 1",widgets:[]}]),window.AppState.setCurrentPageIndex(0),window.AppState.updateSettings({renderingMode:c,device_model:n}),v.log("[LayoutManager] Cleared state and set initial settings before loading new layout")),await this.loadLayout(i),window.AppState&&(window.AppState.setDeviceModel(n),window.currentDeviceModel=n,typeof L=="function"&&typeof C<"u"&&L(C.STATE_CHANGED),v.log(`[LayoutManager] Created layout '${i}' with device_model: ${n}, pages: ${window.AppState.pages?.length}, widgets: ${window.AppState.getCurrentPage()?.widgets?.length||0}`))}}async handleFileImport(e){const n=e.target.files[0];if(n){try{const o=await n.text(),i=JSON.parse(o);if(!i.pages&&!i.device_id){this.setStatus("Invalid layout file","error");return}await this.importLayout(i)}catch(o){v.error("[LayoutManager] Error importing file:",o),this.setStatus("Failed to import file: "+o.message,"error")}e.target.value=""}}async importLayout(e,n=!1){if(!(typeof z!="function"||!z()))try{const o=`${X}/import${n?"?overwrite=true":""}`,i=await fetch(o,{method:"POST",headers:ce(),body:JSON.stringify(e)}),s=await i.json();if(!i.ok){if(s.error==="layout_exists"){if(confirm(`A layout with ID "${s.existing_id}" already exists.

Do you want to overwrite it?`)){await this.importLayout(e,!0);return}return}throw new Error(s.error||`Import failed: ${i.status}`)}this.setStatus(`Imported: ${s.name||s.id}`,"success"),await this.loadLayouts()}catch(o){v.error("[LayoutManager] Error importing layout:",o),this.setStatus("Failed to import layout","error")}}}window.layoutManager=new sd;function Vt(){const t=document.getElementById("resizer-left"),e=document.getElementById("resizer-right"),n=document.querySelector(".sidebar"),o=document.querySelector(".right-panel");if(document.querySelector(".app-content"),!t||!e||!n||!o){v.warn("[Splitters] Layout elements not found, retrying..."),setTimeout(Vt,500);return}v.log("[Splitters] Initializing draggable panels...");function i(a,l,c){let d,u;a.addEventListener("mousedown",function(h){c==="vertical"?(d=h.clientX,u=l.offsetWidth,document.body.style.cursor="col-resize"):(d=h.clientY,u=l.offsetHeight,document.body.style.cursor="row-resize"),a.classList.add("dragging"),document.body.style.userSelect="none";function p(y){let m;if(c==="vertical"){m=y.clientX-d,a.id==="resizer-right"&&(m=-m);const _=u+m,b=parseInt(getComputedStyle(l).minWidth)||100,x=parseInt(getComputedStyle(l).maxWidth)||800;_>=b&&_<=x&&(l.style.width=_+"px")}else{m=d-y.clientY;const _=u+m,b=parseInt(getComputedStyle(l).minHeight)||50,x=parseInt(getComputedStyle(l).maxHeight)||800;_>=b&&_<=x&&(l.style.height=_+"px")}window.dispatchEvent&&window.dispatchEvent(new Event("resize"))}function f(){a.classList.remove("dragging"),document.body.style.cursor="default",document.body.style.userSelect="",window.removeEventListener("mousemove",p),window.removeEventListener("mouseup",f)}window.addEventListener("mousemove",p),window.addEventListener("mouseup",f)})}const s=document.getElementById("resizer-bottom"),r=document.querySelector(".code-panel");i(t,n,"vertical"),i(e,o,"vertical"),s&&r&&i(s,r,"horizontal")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Vt):Vt();class rd{constructor(){this.active=!1,this.element=null,this.targetWidgetId=null,this.position={x:0,y:0},this.init()}init(){this.element||(this.element=document.createElement("div"),this.element.className="radial-menu",this.element.innerHTML=`
                <div class="radial-menu-center"></div>
                <div class="radial-menu-items"></div>
            `,document.body.appendChild(this.element),window.addEventListener("mousedown",e=>{this.active&&!this.element.contains(e.target)&&this.hide()},!0),window.addEventListener("touchstart",e=>{this.active&&!this.element.contains(e.target)&&this.hide()},!0),window.addEventListener("keydown",e=>{e.key==="Escape"&&this.active&&this.hide()}))}show(e,n,o=null){this.targetWidgetId=o,this.position={x:e,y:n},this.active=!0,this.element.style.left=`${e}px`,this.element.style.top=`${n}px`,this.renderItems(),requestAnimationFrame(()=>{this.element.classList.add("active")})}hide(){this.active=!1,this.element.classList.remove("active"),this.targetWidgetId=null}renderItems(){const e=this.element.querySelector(".radial-menu-items");e.innerHTML="";const n=this.getAvailableActions(),o=2*Math.PI/n.length,i=70;n.forEach((s,r)=>{const a=r*o-Math.PI/2,l=Math.cos(a)*i,c=Math.sin(a)*i,d=document.createElement("div");d.className=`radial-menu-item ${s.className||""}`,d.style.setProperty("--x",`${l}px`),d.style.setProperty("--y",`${c}px`),d.title=s.label,d.innerHTML=`<i class="mdi ${s.icon}"></i>`,d.addEventListener("click",u=>{u.stopPropagation(),s.callback(),this.hide()}),e.appendChild(d)})}getAvailableActions(){const e=g,n=this.targetWidgetId?e.getWidgetById(this.targetWidgetId):null,o=[];if(n){o.push({label:"Copy",icon:"mdi-content-copy",callback:()=>{e.selectWidget(this.targetWidgetId,!1),e.copyWidget()}});const i=e.selectedWidgetIds,s=i.some(l=>{const c=e.getWidgetById(l);return c&&(c.type==="group"||c.parentId)});i.length>1&&!s&&o.push({label:"Group",icon:"mdi-group",callback:()=>e.groupSelection()}),(n.type==="group"||n.parentId)&&o.push({label:"Ungroup",icon:"mdi-ungroup",callback:()=>e.ungroupSelection(this.targetWidgetId)}),o.push({label:"Duplicate",icon:"mdi-content-duplicate",callback:()=>{e.copyWidget(),e.pasteWidget()}}),o.push({label:n.locked?"Unlock":"Lock",icon:n.locked?"mdi-lock-open-outline":"mdi-lock-outline",callback:()=>{e.updateWidget(this.targetWidgetId,{locked:!n.locked})}}),o.push({label:"Snap",icon:"mdi-magnet",callback:()=>{nl(this.targetWidgetId)}}),o.push({label:"Delete",icon:"mdi-delete-outline",className:"danger",callback:()=>{e.deleteWidget(this.targetWidgetId)}});const r=e.getCurrentPage(),a=r?.widgets.findIndex(l=>l.id===this.targetWidgetId);a!==-1&&(o.push({label:"Bring to Front",icon:"mdi-arrange-bring-to-front",callback:()=>{e.reorderWidget(e.currentPageIndex,a,r.widgets.length-1)}}),o.push({label:"Send to Back",icon:"mdi-arrange-send-to-back",callback:()=>{e.reorderWidget(e.currentPageIndex,a,0)}}))}else o.push({label:"Paste",icon:"mdi-content-paste",callback:()=>{e.pasteWidget()}});return o}}window.RadialMenu=new rd;class ad{constructor(){this.modal=document.getElementById("aiPromptModal"),this.closeBtn=document.getElementById("aiPromptClose"),this.submitBtn=document.getElementById("aiPromptSubmit"),this.applyBtn=document.getElementById("aiPromptApply"),this.input=document.getElementById("aiPromptInput"),this.status=document.getElementById("aiPromptStatus"),this.diffPanel=document.getElementById("aiPreviewDiff"),this.diffContent=document.getElementById("aiDiffContent"),this.generatedWidgets=null}init(){this.modal&&(this.closeBtn.onclick=()=>this.close(),this.submitBtn.onclick=()=>this.handleSubmit(),this.applyBtn.onclick=()=>this.handleApply(),window.addEventListener("click",e=>{e.target===this.modal&&this.close()}))}open(){if(!this.modal)return;this.modal.classList.remove("hidden"),this.modal.style.display="flex",this.input.focus();const e=window.AppState.settings.ai_provider||"gemini",n=window.AppState.settings[`ai_api_key_${e}`],o=document.getElementById("aiConfigWarning");o&&(o.style.display=n?"none":"block"),this.status.textContent="",this.status.style.color="",this.diffPanel.style.display="none",this.applyBtn.style.display="none",this.generatedWidgets=null}close(){this.modal&&(this.modal.classList.add("hidden"),this.modal.style.display="none")}async handleSubmit(){const e=this.input.value.trim();if(e){this.setLoading(!0),this.status.textContent="AI is thinking...",this.status.style.color="var(--accent)",this.diffPanel.style.display="none",this.applyBtn.style.display="none";try{const n=window.AppState.getCurrentPage(),o=g.deviceModel,i=B?.[o];let s="monochrome";i&&(i.features?.lcd?s="color_lcd":i.name?.includes("6-Color")||i.name?.includes("Color")?s="color_epaper":s="monochrome");const r={canvas:window.AppState.getCanvasDimensions(),current_page:n.id,widgets:n.widgets,selected_widget_id:window.AppState.selectedWidgetId,display_type:s},a=await de.processPrompt(e,r);if(a&&Array.isArray(a))this.generatedWidgets=a,this.showDiffPreview(n.widgets,a),this.status.textContent="Successfully generated changes!",this.status.style.color="var(--success)",this.applyBtn.style.display="inline-block";else throw new Error("Invalid response format from AI")}catch(n){v.error(n),this.status.textContent="Error: "+n.message,this.status.style.color="var(--danger)"}finally{this.setLoading(!1)}}}handleApply(){if(this.generatedWidgets)try{const e=window.AppState.getCurrentPage();e.widgets=this.generatedWidgets,window.AppState.project.rebuildWidgetsIndex(),L(C.STATE_CHANGED),A("AI changes applied!","success"),this.close()}catch(e){v.error(e),A("Failed to apply changes: "+e.message,"error")}}showDiffPreview(e,n){this.diffPanel.style.display="block";let o=`Widgets: ${e.length} ➔ ${n.length}

`;const i=e.map(c=>c.id),s=n.map(c=>c.id),r=n.filter(c=>!i.includes(c.id)),a=e.filter(c=>!s.includes(c.id)),l=n.filter(c=>{const d=e.find(u=>u.id===c.id);return d&&JSON.stringify(d)!==JSON.stringify(c)});r.length>0&&(o+=`[ADDED]
${r.map(c=>`+ ${c.type} (${c.id})`).join(`
`)}

`),a.length>0&&(o+=`[REMOVED]
${a.map(c=>`- ${c.type} (${c.id})`).join(`
`)}

`),l.length>0&&(o+=`[MODIFIED]
${l.map(c=>`~ ${c.type} (${c.id})`).join(`
`)}`),r.length===0&&a.length===0&&l.length===0&&(o+="(No changes detected)"),this.diffContent.textContent=o}setLoading(e){this.submitBtn.disabled=e,this.submitBtn.textContent=e?"Processing...":"Generate",this.input.disabled=e}}window.llmPrompt=new ad;function ld(){const t=g.getPagesPayload(),e=JSON.stringify(t,null,2),n=new Blob([e],{type:"application/json"}),o=URL.createObjectURL(n),i=document.createElement("a");i.href=o,i.download=`reterminal_layout_${Date.now()}.json`,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(o)}function dd(t){if(!t)return;const e=new FileReader;e.onload=n=>{try{const o=n.target.result,i=JSON.parse(o);Ee(i)}catch(o){v.error("Failed to parse layout file:",o),alert("Error parsing layout file. Please ensure it is a valid JSON file.")}},e.readAsText(t)}function cd(t){const e=t.target.files[0];dd(e),t.target.value=""}const hi=[{id:"core",name:"Core Widgets",expanded:!0,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><rect x="4" y="4" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="14" y="4" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="4" y="14" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="14" y="14" width="6" height="6" rx="1" fill="currentColor"/></svg>',widgets:[{type:"label",label:"Floating text",tag:"Text",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><text x="4" y="17" font-size="14" font-weight="bold" fill="currentColor">Aa</text></svg>'},{type:"sensor_text",label:"Sensor text",tag:"Entity",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="8" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2" /><path d="M11 12h9M14 9l3 3-3 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"datetime",label:"Date & Time",tag:"Time",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2" /><path d="M12 7v5l3 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"icon",label:"MDI icon",tag:"Icon",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 2L9 9H2l6 4.5L5.5 22 12 17l6.5 5-2.5-8.5L22 9h-7z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" /></svg>'},{type:"weather_icon",label:"Weather icon",tag:"Icon",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="10" r="4" fill="none" stroke="currentColor" stroke-width="2" /><path d="M12 2v2M12 16v2M4 10H2M22 10h-2M5.6 4.6l1.4 1.4M17 6l1.4-1.4M5.6 15.4l1.4-1.4M17 14l1.4 1.4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"image",label:"Image",tag:"Media",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="3" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" /><path d="M21 15l-5-5L11 15l-3-3-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"online_image",label:"Puppet image",tag:"Remote",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="14" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M17 10l4-4M21 10V6h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><circle cx="7" cy="8" r="1.5" fill="currentColor" /><path d="M17 13l-4-4-4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'}]},{id:"shapes",name:"Shapes",expanded:!0,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><circle cx="7" cy="7" r="4" fill="none" stroke="currentColor" stroke-width="2"/><rect x="13" y="13" width="7" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><path d="M17 4l3 5h-6z" fill="none" stroke="currentColor" stroke-width="2"/></svg>',widgets:[{type:"shape_rect",label:"Rectangle",tag:"Shape",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"rounded_rect",label:"Rounded Rect",tag:"Shape",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="6" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"shape_circle",label:"Circle",tag:"Shape",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"line",label:"Line",tag:"Shape",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'}]},{id:"opendisplay",name:"OpenDisplay / OEPL",expanded:!1,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><rect x="3" y="4" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" stroke-width="1" /><circle cx="6" cy="6.5" r="1" fill="currentColor" /><circle cx="9" cy="6.5" r="1" fill="currentColor" /></svg>',widgets:[{type:"odp_multiline",label:"Multiline Text",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><line x1="4" y1="12" x2="18" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><line x1="4" y1="17" x2="14" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"odp_rectangle_pattern",label:"Rectangle Pattern",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5" /><rect x="11" y="4" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5" /><rect x="3" y="12" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5" /><rect x="11" y="12" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5" /></svg>'},{type:"odp_polygon",label:"Polygon",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><polygon points="12,3 21,10 18,20 6,20 3,10" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"odp_ellipse",label:"Ellipse",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="9" ry="6" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"odp_arc",label:"Arc",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M6 18 A 9 9 0 0 1 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"odp_icon_sequence",label:"Icon Sequence",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="5" cy="12" r="3" fill="currentColor" /><circle cx="12" cy="12" r="3" fill="currentColor" /><circle cx="19" cy="12" r="3" fill="currentColor" /></svg>'},{type:"odp_plot",label:"Sensor Plot",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M3 3v18h18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M6 15l4-6 4 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"odp_debug_grid",label:"Debug Grid",tag:"Debug",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M3 3v18h18M3 9h18M3 15h18M9 3v18M15 3v18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'}]},{id:"advanced",name:"Advanced",expanded:!0,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" fill="none" stroke="currentColor" stroke-width="2"/></svg>',widgets:[{type:"graph",label:"Graph / Chart",tag:"Data",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M3 3v18h18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M7 14l4-4 4 4 5-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"progress_bar",label:"Progress bar",tag:"Entity",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="9" width="20" height="6" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><rect x="3" y="10" width="12" height="4" rx="1" fill="currentColor" /></svg>'},{type:"qr_code",label:"QR Code",tag:"Tools",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" fill="currentColor" /><rect x="14" y="3" width="7" height="7" fill="currentColor" /><rect x="3" y="14" width="7" height="7" fill="currentColor" /><rect x="14" y="14" width="3" height="3" fill="currentColor" /></svg>'},{type:"calendar",label:"Calendar",tag:"Events",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" stroke-width="2" /></svg>'},{type:"weather_forecast",label:"Weather Forecast",tag:"Forecast",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="10" r="4" fill="none" stroke="currentColor" stroke-width="2" /><path d="M12 2v2M12 16v2M4 10H2M22 10h-2M5.6 4.6l1.4 1.4M17 6l1.4-1.4M5.6 15.4l1.4-1.4M17 14l1.4 1.4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"quote_rss",label:"Quote / RSS",tag:"Info",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M6 17h3l2-4V7H5v6h3M13 17h3l2-4V7h-6v6h3" fill="none" stroke="currentColor" stroke-width="2" /></svg>'}]},{id:"inputs",name:"Inputs",expanded:!1,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><path d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zM16.06 17H15v-1l-1-1h-6l-1 1v1H5.94c-.58 0-1.06-.48-1.06-1.06V7.5c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5v8.44c0 .58-.48 1.06-1.06 1.06z" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="12" cy="13" r="1.5" fill="currentColor" /></svg>',widgets:[{type:"touch_area",label:"Touch Area",tag:"Input",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="5" y="5" width="14" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="2,2" /><circle cx="12" cy="12" r="3" fill="currentColor" /></svg>'},{type:"nav_next_page",label:"Next Page",tag:"Nav",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M10 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"nav_previous_page",label:"Prev Page",tag:"Nav",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M14 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"nav_reload_page",label:"Reload Page",tag:"Nav",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M23 4v6h-6M1 20v-6h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"template_nav_bar",label:"Navigation Bar",tag:"Template",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M6 10l-2 2 2 2M18 10l2 2-2 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 12h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'}]},{id:"ondevice",name:"On Device Sensors",expanded:!0,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 9h6v6H9z" fill="currentColor"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M7 2v2M7 20v2M17 2v2M17 20v2M2 7h2M20 7h2M2 17h2M20 17h2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',widgets:[{type:"battery_icon",label:"Battery",tag:"Sensor",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="7" width="18" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><rect x="4" y="9" width="8" height="6" fill="currentColor" /><path d="M20 10h2v4h-2" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"wifi_signal",label:"WiFi Signal",tag:"Sensor",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 3C7.5 3 3.8 5.4 2 9l2 2c1.3-2.5 4-4.2 8-4.2s6.7 1.7 8 4.2l2-2c-1.8-3.6-5.5-6-10-6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M12 9c-2.7 0-5.1 1.4-6.5 3.5L7 14c1-1.4 2.8-2.3 5-2.3s4 .9 5 2.3l1.5-1.5C17.1 10.4 14.7 9 12 9z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><circle cx="12" cy="18" r="2" fill="currentColor" /></svg>'},{type:"ondevice_temperature",label:"Temperature",tag:"SHT4x",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 2a2 2 0 00-2 2v10.1a4 4 0 104 0V4a2 2 0 00-2-2z" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="12" cy="18" r="2" fill="currentColor" /></svg>'},{type:"ondevice_humidity",label:"Humidity",tag:"SHT4x",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"template_sensor_bar",label:"On-Board Sensor Bar",tag:"New",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M5 12h2M10 12h2M15 12h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'}]},{id:"lvgl",name:"LVGL Components",expanded:!1,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" /></svg>',widgets:[{type:"lvgl_obj",label:"Base Object",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_label",label:"Label",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><text x="4" y="17" font-size="14" font-weight="bold" fill="currentColor">Aa</text></svg>'},{type:"lvgl_line",label:"LVGL Line",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"lvgl_button",label:"Button",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="8" rx="2" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="2" /><text x="12" y="16.5" font-size="8" text-anchor="middle" fill="currentColor">BTN</text></svg>'},{type:"lvgl_switch",label:"Switch",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="8" rx="4" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="16" cy="12" r="3" fill="currentColor" /></svg>'},{type:"lvgl_checkbox",label:"Checkbox",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><polyline points="9 12 11 14 15 10" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_slider",label:"Slider",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><circle cx="12" cy="12" r="3" fill="currentColor" /></svg>'},{type:"lvgl_bar",label:"Bar",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="9" width="20" height="6" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><rect x="3" y="10" width="12" height="4" rx="1" fill="currentColor" /></svg>'},{type:"lvgl_arc",label:"Arc",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M4 18 A 10 10 0 1 1 20 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"lvgl_meter",label:"Meter",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M4 18 A 10 10 0 1 1 20 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><line x1="12" y1="18" x2="16" y2="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"lvgl_spinner",label:"Spinner",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_led",label:"LED",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" fill="currentColor" /><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_chart",label:"Chart",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M3 3v18h18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M7 14l4-4 4 4 5-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"lvgl_img",label:"Image",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="3" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" /><path d="M21 15l-5-5L11 15l-3-3-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"lvgl_qrcode",label:"QR Code",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" fill="currentColor" /><rect x="14" y="3" width="7" height="7" fill="currentColor" /><rect x="3" y="14" width="7" height="7" fill="currentColor" /><rect x="14" y="14" width="3" height="3" fill="currentColor" /></svg>'},{type:"lvgl_dropdown",label:"Dropdown",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="8" width="20" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><polyline points="16 11 18 13 20 11" fill="currentColor" /></svg>'},{type:"lvgl_roller",label:"Roller",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="20" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><line x1="6" y1="10" x2="18" y2="10" stroke="currentColor" stroke-width="1" /><line x1="6" y1="14" x2="18" y2="14" stroke="currentColor" stroke-width="1" /></svg>'},{type:"lvgl_spinbox",label:"Spinbox",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M6 12l2-2 2 2" fill="none" stroke="currentColor" stroke-width="1" /><path d="M14 12l2 2 2-2" fill="none" stroke="currentColor" stroke-width="1" /></svg>'},{type:"lvgl_textarea",label:"Textarea",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" fill="none" stroke="currentColor" stroke-width="2" /><line x1="6" y1="8" x2="14" y2="8" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_keyboard",label:"Keyboard",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><line x1="6" y1="10" x2="8" y2="10" stroke="currentColor" stroke-width="2" /><line x1="10" y1="10" x2="12" y2="10" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_buttonmatrix",label:"Btn Matrix",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="7" width="9" height="4" fill="none" stroke="currentColor" stroke-width="1" /><rect x="13" y="7" width="9" height="4" fill="none" stroke="currentColor" stroke-width="1" /><rect x="2" y="13" width="9" height="4" fill="none" stroke="currentColor" stroke-width="1" /><rect x="13" y="13" width="9" height="4" fill="none" stroke="currentColor" stroke-width="1" /></svg>'},{type:"lvgl_tabview",label:"Tabview",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><line x1="2" y1="8" x2="22" y2="8" stroke="currentColor" stroke-width="1" /></svg>'},{type:"lvgl_tileview",label:"Tileview",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="2" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2" /><rect x="13" y="2" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2" /><rect x="2" y="13" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2" /><rect x="13" y="13" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"template_nav_bar",label:"Nav Bar (Template)",tag:"Nav",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M6 10l-2 2 2 2M18 10l2 2-2 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 12h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'}]}];async function Fo(t){const e=document.getElementById(t);if(!e)return;const n=window.AppState?.settings?.renderingMode||"direct";v.log(`[Palette] Rendering palette for mode: ${n}`),e.innerHTML='<div class="palette-loading" style="padding: 20px; color: #999; text-align: center; font-size: 13px;">Loading widgets...</div>';const o=[];hi.forEach(i=>{i.widgets.forEach(s=>{o.includes(s.type)||o.push(s.type)})}),v.log(`[Palette] Pre-loading ${o.length} widget plugins...`);try{await Promise.all(o.map(i=>U.load(i)))}catch(i){v.error("[Palette] Failed to load some plugins:",i)}e.innerHTML="",hi.forEach(i=>{let s=i.expanded;n==="lvgl"?s=i.id==="lvgl":(n==="oepl"||n==="opendisplay")&&(s=i.id==="opendisplay"||i.id==="core"||i.id==="shapes");const r=document.createElement("div");r.className=`widget-category ${s?"expanded":""}`,r.dataset.category=i.id;const a=document.createElement("div");a.className="widget-category-header";let l='<span class="category-icon">›</span>';i.icon&&(l+=i.icon),a.innerHTML=`
            ${l}
            <span class="category-name">${i.name}</span>
            ${i.widgets.length>0&&!s?`<span class="category-count">${i.widgets.length}</span>`:""}
        `,a.addEventListener("click",()=>{r.classList.toggle("expanded")});const c=document.createElement("div");c.className="widget-category-items",i.widgets.forEach(d=>{const u=document.createElement("div"),h=U.get(d.type);let p=!0,f="";if(h?.supportedModes)p=h.supportedModes.includes(n),f=`Not supported in ${n} mode`;else if(n==="oepl"||n==="opendisplay"){const _=n==="oepl"?!!h?.exportOEPL:!!h?.exportOpenDisplay,b=i.id==="ondevice"||i.id==="lvgl",x=d.type==="calendar"||d.type==="weather_forecast"||d.type==="graph"||d.type==="quote_rss";p=_&&!b&&!x,f=`Not supported in ${n==="oepl"?"OpenEpaperLink":"OpenDisplay"} mode`}else if(n==="lvgl"){const _=d.type.startsWith("lvgl_"),b=i.id==="inputs",x=typeof h?.exportLVGL=="function";p=_||b||x,f="Widget not compatible with LVGL mode"}else if(n==="direct"){const _=d.type.startsWith("lvgl_")||d.type.startsWith("oepl_");h?p=!!h.export&&!_:p=!_,f="Not supported in Direct rendering mode"}u.className="item"+(p?"":" incompatible"),u.draggable=p,u.dataset.widgetType=d.type;const y=d.label||h?.name;let m="";d.tag&&(m=`<span class="tag">${d.tag}</span>`),u.innerHTML=`
                ${d.icon}
                <span class="label">${y}</span>
                ${m}
            `,u.title=p?`Add ${y} to canvas`:f,p?u.addEventListener("dragstart",_=>{_.dataTransfer.setData("application/widget-type",d.type),_.dataTransfer.setData("text/plain",d.type),_.dataTransfer.effectAllowed="copy"}):u.addEventListener("click",_=>{_.stopPropagation(),T(()=>Promise.resolve().then(()=>Eo),void 0,import.meta.url).then(b=>{b.showToast(f,"warning")})}),c.appendChild(u)}),r.appendChild(a),r.appendChild(c),e.appendChild(r)})}Y(C.SETTINGS_CHANGED,t=>{t&&t.renderingMode!==void 0&&(v.log(`[Palette] Settings changed, refreshing palette for mode: ${t.renderingMode}`),Fo("widgetPalette"))});class pd{constructor(){this.isOpen=!1,this.selectedIndex=0,this.filteredWidgets=[],this.allWidgets=[],this.modal=null,this.input=null,this.resultsContainer=null,this.init()}init(){this.createModal(),this.bindEvents()}discoverWidgets(){this.allWidgets=[];const e=document.querySelectorAll(".widget-category .item[data-widget-type]");if(e.length===0){v.warn("[QuickSearch] No widgets found in palette");return}e.forEach(n=>{const o=n.getAttribute("data-widget-type"),i=n.querySelector(".label"),s=i?i.textContent.trim():o,r=n.closest(".widget-category"),a=r?r.querySelector(".category-name"):null,l=a?a.textContent.trim():"Widgets";this.allWidgets.push({type:o,label:s,category:l,searchText:`${s} ${o} ${l}`.toLowerCase()})}),v.log(`[QuickSearch] Discovered ${this.allWidgets.length} widgets`)}createModal(){this.modal=document.createElement("div"),this.modal.id="quick-search-modal",this.modal.className="quick-search-modal hidden",this.modal.innerHTML=`
            <div class="quick-search-backdrop"></div>
            <div class="quick-search-container">
                <div class="quick-search-header">
                    <span class="quick-search-icon">🔍</span>
                    <input type="text" class="quick-search-input" placeholder="Search widgets..." autocomplete="off" />
                </div>
                <div class="quick-search-results"></div>
                <div class="quick-search-hint">
                    <span>↑↓ Navigate</span>
                    <span>↵ Add Widget</span>
                    <span>Esc Close</span>
                </div>
            </div>
        `,document.body.appendChild(this.modal),this.input=this.modal.querySelector(".quick-search-input"),this.resultsContainer=this.modal.querySelector(".quick-search-results")}bindEvents(){this.modal.querySelector(".quick-search-backdrop").addEventListener("click",()=>this.close()),this.input.addEventListener("input",()=>this.handleSearch()),this.input.addEventListener("keydown",e=>this.handleKeyDown(e))}open(){this.discoverWidgets(),this.isOpen=!0,this.modal.classList.remove("hidden"),this.input.value="",this.selectedIndex=0,this.handleSearch(),setTimeout(()=>this.input.focus(),50)}close(){this.isOpen=!1,this.modal.classList.add("hidden"),this.input.blur()}handleSearch(){const e=this.input.value.toLowerCase().trim();e===""?this.filteredWidgets=[...this.allWidgets]:this.filteredWidgets=this.allWidgets.filter(n=>n.searchText.includes(e)),this.selectedIndex=0,this.renderResults()}renderResults(){if(this.filteredWidgets.length===0){this.resultsContainer.innerHTML=`
                <div class="quick-search-empty">No widgets found</div>
            `;return}this.resultsContainer.innerHTML=this.filteredWidgets.map((n,o)=>`
            <div class="quick-search-item ${o===this.selectedIndex?"selected":""}" 
                 data-index="${o}" data-type="${n.type}">
                <span class="quick-search-item-label">${n.label}</span>
                <span class="quick-search-item-category">${n.category}</span>
            </div>
        `).join(""),this.resultsContainer.querySelectorAll(".quick-search-item").forEach(n=>{n.addEventListener("click",()=>{const o=parseInt(n.getAttribute("data-index"),10);this.selectedIndex=o,this.addSelectedWidget()})});const e=this.resultsContainer.querySelector(".quick-search-item.selected");e&&e.scrollIntoView({block:"nearest"})}handleKeyDown(e){switch(e.key){case"ArrowDown":e.preventDefault(),this.selectedIndex=Math.min(this.selectedIndex+1,this.filteredWidgets.length-1),this.renderResults();break;case"ArrowUp":e.preventDefault(),this.selectedIndex=Math.max(this.selectedIndex-1,0),this.renderResults();break;case"Enter":e.preventDefault(),this.addSelectedWidget();break;case"Escape":e.preventDefault(),this.close();break}}addSelectedWidget(){if(this.filteredWidgets.length===0)return;const e=this.filteredWidgets[this.selectedIndex];if(e)try{const n=WidgetFactory.createWidget(e.type);AppState.addWidget(n),v.log(`[QuickSearch] Added widget: ${e.label}`),this.close()}catch(n){v.error("[QuickSearch] Error adding widget:",n),AppState.notify("Failed to add widget: "+n.message,"error")}}}class ud{constructor(){this.listContainer=null,this.header=null,this.panel=null,this.draggedIndex=null,this.render=this.render.bind(this),this.highlightSelected=this.highlightSelected.bind(this)}init(){if(this.listContainer=document.getElementById("hierarchyList"),this.header=document.getElementById("hierarchyHeader"),this.panel=document.getElementById("hierarchyPanel"),!this.listContainer||!this.header||!this.panel){v.error("[HierarchyView] Required DOM elements not found");return}this.controlsContainer=document.createElement("div"),this.controlsContainer.id="hierarchyControls",this.controlsContainer.className="hierarchy-controls",this.controlsContainer.style.padding="8px 8px",this.controlsContainer.style.borderTop="1px solid var(--border-subtle)",this.panel.appendChild(this.controlsContainer),this.bindEvents(),this.render(),this.renderHeaderActions(),v.log("[HierarchyView] Initialized")}renderHeaderActions(){if(!this.header)return;let e=this.header.querySelector(".hierarchy-header-toggles");if(!e){e=document.createElement("div"),e.className="hierarchy-header-toggles";const n=this.header.querySelector(".chevron");this.header.insertBefore(e,n);const o=this.createHeaderToggle("mdi-lock-outline","Toggle All Locks",()=>{const s=g.getCurrentPage()?.widgets||[],r=s.every(a=>a.locked);s.forEach(a=>g.updateWidget(a.id,{locked:!r}))}),i=this.createHeaderToggle("mdi-eye-outline","Toggle All Visibility",()=>{const s=g.getCurrentPage()?.widgets||[],r=s.every(a=>a.hidden);s.forEach(a=>g.updateWidget(a.id,{hidden:!r}))});e.appendChild(o),e.appendChild(i)}}createHeaderToggle(e,n,o){const i=document.createElement("div");return i.className="h-toggle",i.title=n,i.innerHTML=`<i class="mdi ${e}"></i>`,i.onclick=s=>{s.stopPropagation(),o()},i}bindEvents(){this.header.addEventListener("click",()=>this.toggleCollapse()),Y(C.STATE_CHANGED,this.render),Y(C.PAGE_CHANGED,this.render),Y(C.SELECTION_CHANGED,this.highlightSelected)}toggleCollapse(){const e=this.panel.classList.toggle("hidden"),n=this.header.querySelector(".chevron");n&&(n.style.transform=e?"rotate(-90deg)":"rotate(0deg)")}highlightSelected(){const e=g.selectedWidgetIds||[];this.listContainer.querySelectorAll(".hierarchy-item").forEach(o=>{e.includes(o.dataset.id)?o.classList.add("selected"):o.classList.remove("selected")}),this.renderControls()}render(){const e=g.getCurrentPage();if(!e)return;if(this.listContainer.innerHTML="",!e.widgets||e.widgets.length===0){this.listContainer.innerHTML='<div style="font-size: 10px; color: var(--muted); text-align: center; padding: 12px;">No widgets on this page</div>',this.controlsContainer.style.display="none";return}const n=e.widgets.filter(s=>!s.parentId).reverse(),o=new Map;e.widgets.forEach(s=>{s.parentId&&(o.has(s.parentId)||o.set(s.parentId,[]),o.get(s.parentId).push(s))});const i=(s,r=0)=>{const a=e.widgets.indexOf(s),l=this.createItem(s,a,r);this.listContainer.appendChild(l);const c=o.get(s.id);c&&s.expanded!==!1&&[...c].reverse().forEach(d=>i(d,r+1))};n.forEach(s=>i(s)),this.highlightSelected(),this.renderControls()}createItem(e,n,o=0){const i=document.createElement("div");i.className=`hierarchy-item ${e.hidden?"hidden-widget":""}`,o>0&&i.classList.add("child-item"),(g.selectedWidgetIds||[]).includes(e.id)&&i.classList.add("selected"),i.dataset.id=e.id,i.dataset.index=n,i.draggable=!e.locked,e.locked&&i.classList.add("locked"),i.style.paddingLeft=12+o*20+"px";const r=this.getWidgetIcon(e.type),a=this.getWidgetLabel(e),l=e.type==="group";return i.innerHTML=`
            <div class="hierarchy-item-drag-handle" style="${e.locked?"display:none":""}">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="9" cy="5" r="1"></circle><circle cx="9" cy="12" r="1"></circle><circle cx="9" cy="19" r="1"></circle>
                    <circle cx="15" cy="5" r="1"></circle><circle cx="15" cy="12" r="1"></circle><circle cx="15" cy="19" r="1"></circle>
                </svg>
            </div>
            ${l?`
            <div class="hierarchy-group-toggle ${e.expanded!==!1?"expanded":""}">
                <i class="mdi mdi-chevron-down"></i>
            </div>
            `:'<div style="width: 16px;"></div>'}
            <div class="hierarchy-item-icon">${r}</div>
            <div class="hierarchy-item-label">${a}</div>
            <div class="hierarchy-item-actions">
                <div class="hierarchy-item-action toggle-lock" title="${e.locked?"Unlock":"Lock"}">
                     <i class="mdi ${e.locked?"mdi-lock-outline":"mdi-lock-open-outline"}"></i>
                </div>
                <div class="hierarchy-item-action toggle-visibility" title="Toggle Visibility">
                    <i class="mdi ${e.hidden?"mdi-eye-off-outline":"mdi-eye-outline"}"></i>
                </div>
                <div class="hierarchy-item-action delete-widget danger" title="Delete Widget">
                    <i class="mdi mdi-delete-outline"></i>
                </div>
            </div>
        `,l&&i.querySelector(".hierarchy-group-toggle").addEventListener("click",d=>{g.updateWidget(e.id,{expanded:e.expanded===!1}),d.stopPropagation()}),i.querySelector(".hierarchy-item-label").addEventListener("click",d=>{if(g.selectedWidgetIds.includes(e.id)){const u=prompt("Rename:",a);u!==null&&u!==""&&u!==a&&g.updateWidget(e.id,{title:u}),d.stopPropagation();return}}),i.addEventListener("click",d=>{const u=d.ctrlKey||d.shiftKey;g.selectWidget(e.id,u),d.stopPropagation()}),i.querySelector(".toggle-lock").addEventListener("click",d=>{g.updateWidget(e.id,{locked:!e.locked}),d.stopPropagation()}),i.querySelector(".toggle-visibility").addEventListener("click",d=>{g.updateWidget(e.id,{hidden:!e.hidden}),d.stopPropagation()}),i.querySelector(".delete-widget").addEventListener("click",d=>{confirm(`Delete widget "${a}"?`)&&g.deleteWidget(e.id),d.stopPropagation()}),i.addEventListener("dragstart",d=>{this.draggedIndex=n,i.classList.add("dragging"),d.dataTransfer.setData("application/widget-id",e.id),d.dataTransfer.effectAllowed="move"}),i.addEventListener("dragend",()=>{i.classList.remove("dragging"),this.draggedIndex=null,this.listContainer.querySelectorAll(".hierarchy-item").forEach(u=>u.classList.remove("drag-over"))}),i.addEventListener("dragover",d=>{d.preventDefault(),d.dataTransfer.dropEffect="move",i.classList.add("drag-over")}),i.addEventListener("dragleave",()=>{i.classList.remove("drag-over")}),i.addEventListener("drop",d=>{d.preventDefault();const u=d.dataTransfer.getData("application/widget-id"),h=i.dataset.id;if(u===h)return;const p=g.getWidgetById(h);if(!p)return;p.type==="group"?g.updateWidget(u,{parentId:h,expanded:!0}):g.updateWidget(u,{parentId:p.parentId||null});const f=parseInt(i.dataset.index);this.draggedIndex!==null&&g.reorderWidget(g.currentPageIndex,this.draggedIndex,f)}),i}renderControls(){const e=g.getSelectedWidgets();if(e.length===0){this.controlsContainer.style.display="none";return}this.controlsContainer.style.display="block",this.controlsContainer.innerHTML="";const n=l=>{const c=document.createElement("div");c.style.fontSize="10px",c.style.color="var(--muted)",c.style.marginBottom="6px",c.style.fontWeight="600",c.style.marginTop="8px",c.textContent=l,this.controlsContainer.appendChild(c)},o=()=>{const l=document.createElement("div");return l.style.display="flex",l.style.gap="4px",this.controlsContainer.appendChild(l),l};n("GROUPING");const i=o(),s=e.some(l=>l.type==="group"||l.parentId),r=document.createElement("button");r.className="btn btn-secondary",r.innerHTML='<i class="mdi mdi-group" style="margin-right:4px"></i>Group',r.style.flex="1",r.style.fontSize="10px",r.disabled=e.length<2||s,r.onclick=()=>g.groupSelection(),i.appendChild(r);const a=document.createElement("button");if(a.className="btn btn-secondary",a.innerHTML='<i class="mdi mdi-ungroup" style="margin-right:4px"></i>Ungroup',a.style.flex="1",a.style.fontSize="10px",a.disabled=!s,a.onclick=()=>g.ungroupSelection(),i.appendChild(a),e.length===1){const l=e[0];n("LAYER ORDER");const c=o();[{label:"Front",icon:"mdi-arrange-bring-to-front",action:()=>this.moveToFront(l)},{label:"Back",icon:"mdi-arrange-send-to-back",action:()=>this.moveToBack(l)},{label:"Up",icon:"mdi-arrow-up",action:()=>this.moveUp(l)},{label:"Down",icon:"mdi-arrow-down",action:()=>this.moveDown(l)}].forEach(u=>{const h=document.createElement("button");h.className="btn btn-secondary",h.innerHTML=`<i class="mdi ${u.icon}"></i>`,h.title=u.label,h.style.flex="1",h.style.fontSize="12px",h.style.padding="4px",h.onclick=()=>u.action(),c.appendChild(h)})}}moveToFront(e){const n=g.getCurrentPage(),o=n.widgets.findIndex(i=>i.id===e.id);o>-1&&o<n.widgets.length-1&&(n.widgets.splice(o,1),n.widgets.push(e),g.setPages(g.pages))}moveToBack(e){const n=g.getCurrentPage(),o=n.widgets.findIndex(i=>i.id===e.id);o>0&&(n.widgets.splice(o,1),n.widgets.unshift(e),g.setPages(g.pages))}moveUp(e){const n=g.getCurrentPage(),o=n.widgets.findIndex(i=>i.id===e.id);o>-1&&o<n.widgets.length-1&&([n.widgets[o],n.widgets[o+1]]=[n.widgets[o+1],n.widgets[o]],g.setPages(g.pages))}moveDown(e){const n=g.getCurrentPage(),o=n.widgets.findIndex(i=>i.id===e.id);o>0&&([n.widgets[o],n.widgets[o-1]]=[n.widgets[o-1],n.widgets[o]],g.setPages(g.pages))}getWidgetLabel(e){let n=e.props?.name||e.props?.title||e.props?.text||e.title;if(!n||n===""){const o=U.get(e.type);n=o?o.name:e.type}if(n===e.type||U.get(e.type)&&n===U.get(e.type).name){const o=e.id.split("_").pop();n=`${n} (${o})`}return n}getWidgetIcon(e){return`<i class="mdi ${{text:"mdi-format-text",sensor_text:"mdi-numeric",icon:"mdi-emoticon-outline",image:"mdi-image",qr_code:"mdi-qrcode",line:"mdi-vector-line",lvgl_line:"mdi-vector-line",rect:"mdi-square-outline",shape_rect:"mdi-square-outline",arc:"mdi-circle-outline",shape_circle:"mdi-circle-outline",bar:"mdi-chart-gantt",button:"mdi-gesture-tap-button",checkbox:"mdi-checkbox-marked-outline",calendar:"mdi-calendar",weather_forecast:"mdi-weather-partly-cloudy",datetime:"mdi-clock-outline",graph:"mdi-chart-timeline-variant",touch_area:"mdi-fingerprint",group:"mdi-folder-outline"}[e]||"mdi-widgets-outline"}"></i>`}}class hd{constructor(){try{v.log("[App] Constructor started"),this.sidebar=new Va,v.log("[App] Sidebar created"),this.canvas=new yl,v.log("[App] Canvas created"),this.propertiesPanel=new Tl,v.log("[App] PropertiesPanel created"),this.hierarchyView=new ud,v.log("[App] HierarchyView created"),this.deviceSettings=new Dl,v.log("[App] DeviceSettings created"),this.editorSettings=new Rl,v.log("[App] EditorSettings created"),this.pageSettings=new Bl,v.log("[App] PageSettings created"),this.keyboardHandler=new Ro,v.log("[App] KeyboardHandler created"),this.llmPrompt=window.llmPrompt,v.log("[App] LLMPrompt linked"),this.quickSearch=new pd,window.QuickSearch=this.quickSearch,v.log("[App] QuickSearch initialized"),this.adapter=this.createAdapter(),v.log("[App] Adapter initialized:",this.adapter.constructor.name),this.snippetManager=new Nl(this.adapter),v.log("[App] SnippetManager initialized"),window.layoutManager&&(this.layoutManager=window.layoutManager,v.log("[App] LayoutManager linked"))}catch(e){v.error("[App] Critical Error in Constructor:",e)}}async init(){v.log("[App] Initializing ESPHome Designer Designer..."),v.log("[App] AppState:",window.AppState),this.isInitializing=!0,await Fo("widgetPalette"),this.sidebar.init(),this.propertiesPanel.init(),this.hierarchyView.init(),this.deviceSettings.init(),this.editorSettings.init(),this.quickSearch.discoverWidgets(),await un();try{localStorage.getItem("reterminal-editor-theme")==="light"?(g.updateSettings({editor_light_mode:!0}),this.editorSettings.applyEditorTheme(!0)):this.editorSettings.applyEditorTheme(!1)}catch(e){v.log("Could not load theme preference:",e)}this.pageSettings.init(),this.llmPrompt&&this.llmPrompt.init(),this.layoutManager&&this.layoutManager.init(),this.setupAutoSave(),this.bindGlobalButtons();try{z()?(v.log("HA Backend detected attempt. Loading layout..."),await La(),await Te()):(v.log("Running in standalone/offline mode."),this.loadFromLocalStorage()),this.refreshAdapter()}catch(e){v.error("[App] Failed to load from backend, falling back to local storage:",e),this.loadFromLocalStorage(),this.refreshAdapter()}window.AppState&&typeof window.AppState.updateLayoutIndicator=="function"&&window.AppState.updateLayoutIndicator(),setTimeout(()=>{this.canvas&&(v.log("[App] Forcing initial canvas centering..."),this.canvas.focusPage(g.currentPageIndex,!1))},100),v.log("Initialization complete."),this.isInitializing=!1}bindGlobalButtons(){const e=document.getElementById("saveLayoutBtn");e&&e.addEventListener("click",()=>{z()?fe().then(()=>A("Layout saved to Home Assistant","success")).catch(a=>A(`Save failed: ${a.message}`,"error")):ld()});const n=document.getElementById("loadLayoutBtn");n&&n.addEventListener("change",cd);const o=document.getElementById("importLayoutBtn");o&&n&&o.addEventListener("click",()=>{n.click()});const i=document.getElementById("deviceSettingsBtn");i?(v.log("Device Settings button found, binding click listener."),i.addEventListener("click",()=>{v.log("Device Settings button clicked."),this.deviceSettings?this.deviceSettings.open():v.error("DeviceSettings instance not found on App.")})):v.error("Device Settings button NOT found in DOM.");const s=document.getElementById("editorSettingsBtn");s&&s.addEventListener("click",()=>{this.editorSettings.open()});const r=document.getElementById("aiPromptBtn");r&&r.addEventListener("click",()=>{this.llmPrompt?this.llmPrompt.open():v.error("LLMPrompt instance not found.")})}loadFromLocalStorage(){try{const e=g.loadFromLocalStorage();e?(v.log("[App] Found saved layout in localStorage, loading..."),Ee(e)):v.log("[App] No saved layout in localStorage, starting fresh.")}catch(e){v.error("[App] Error loading from local storage:",e)}}setupAutoSave(){let e=null;const n=2e3;T(async()=>{const{on:o,EVENTS:i}=await Promise.resolve().then(()=>Ko);return{on:o,EVENTS:i}},void 0,import.meta.url).then(({on:o,EVENTS:i})=>{o(i.STATE_CHANGED,()=>{this.refreshAdapter(),e&&clearTimeout(e),e=setTimeout(()=>{z()?(v.log("[AutoSave] Triggering background save to HA..."),fe().catch(()=>{})):(v.log("[AutoSave] Saving to local storage..."),g.saveToLocalStorage())},n)})})}createAdapter(){const e=g.settings.renderingMode||"direct";let n;return e==="oepl"?n=new No:e==="opendisplay"?n=new Go:n=new od,n.mode=e,n}refreshAdapter(){const e=g.settings.renderingMode||"direct";this.adapter&&this.adapter.mode===e||(v.log(`[App] Refreshing adapter: ${this.adapter?.mode} -> ${e}`),this.adapter=this.createAdapter(),this.snippetManager&&(this.snippetManager.adapter=this.adapter,this.snippetManager.updateSnippetBox()))}}document.addEventListener("DOMContentLoaded",async()=>{const t=new hd;window.app=t,window.openDeviceSettings=()=>t.deviceSettings?.open(),window.openEditorSettingsModal=e=>t.editorSettings?.open(e),window.pageSettings=t.pageSettings,window.ESPHomeDesigner=window.ESPHomeDesigner||{},window.ESPHomeDesigner.app=t,window.ESPHomeDesigner.ui={sidebar:t.sidebar,canvas:t.canvas,properties:t.propertiesPanel};try{await t.init()}catch(e){v.error("[App] Failed to initialize:",e)}});export{C as E,at as a,Ha as b,lt as c,L as e,fd as f,gd as g,Oo as i};
