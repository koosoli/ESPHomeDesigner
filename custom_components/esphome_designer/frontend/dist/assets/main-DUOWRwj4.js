const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./plugin-6cDY1hT0.js","./template_converter-Dp-G9w6d.js","./plugin-D1J8NJ4z.js","./text_utils-DPZlj6Oi.js","./plugin-DAgEZ4NU.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function i(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=i(o);fetch(o.href,s)}})();const Wo=`<header class="main-header" role="banner">
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
</header>`,Fo=`    <aside class="sidebar" role="complementary" aria-label="Editor Sidebar">
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
    </aside>`,$o=`      <div class="code-panel">
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
      </div>`,zo=`    <aside class="right-panel" role="complementary" aria-label="Widget Properties">
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
    </aside>`,Uo=`  <!-- Modals -->
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

`,jo=""+new URL("logo_header-CUGdaeC6.png",import.meta.url).href;function We(t,e){const i=document.getElementById(t);i?i.outerHTML=e:console.warn(`[UI Injection] Placeholder #${t} not found in index.html.`)}function Yo(){console.log("[UI Injection] Loading modular UI components...");let t=Wo.replace("assets/logo_header.png",jo);We("header-placeholder",t),We("sidebar-placeholder",Fo),We("code-panel-placeholder",$o),We("properties-panel-placeholder",zo),We("modals-placeholder",Uo),console.log("[UI Injection] Construction complete.")}Yo();const Vo="modulepreload",qo=function(t,e){return new URL(t,e).href},bn={},T=function(e,i,n){let o=Promise.resolve();if(i&&i.length>0){const r=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),l=a?.nonce||a?.getAttribute("nonce");o=Promise.allSettled(i.map(c=>{if(c=qo(c,n),c in bn)return;bn[c]=!0;const d=c.endsWith(".css"),p=d?'[rel="stylesheet"]':"";if(!!n)for(let f=r.length-1;f>=0;f--){const y=r[f];if(y.href===c&&(!d||y.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${p}`))return;const u=document.createElement("link");if(u.rel=d?"stylesheet":Vo,d||(u.as="script"),u.crossOrigin="",u.href=c,l&&u.setAttribute("nonce",l),document.head.appendChild(u),d)return new Promise((f,y)=>{u.addEventListener("load",f),u.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${c}`)))})}))}function s(r){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=r,window.dispatchEvent(a),!a.defaultPrevented)throw r}return o.then(r=>{for(const a of r||[])a.status==="rejected"&&s(a.reason);return e().catch(s)})},ft=new EventTarget,I={STATE_CHANGED:"state-changed",SELECTION_CHANGED:"selection-changed",PAGE_CHANGED:"page-changed",HISTORY_CHANGED:"history-changed",SETTINGS_CHANGED:"settings-changed",LAYOUT_IMPORTED:"layout-imported",ENTITIES_LOADED:"entities-loaded",ZOOM_CHANGED:"zoom-changed"};function P(t,e={}){ft.dispatchEvent(new CustomEvent(t,{detail:e}))}function F(t,e){ft.addEventListener(t,i=>e(i.detail))}function hi(t,e){ft.removeEventListener(t,e)}window.EVENTS=I;window.emit=P;window.on=F;window.off=hi;const Xo=Object.freeze(Object.defineProperty({__proto__:null,EVENTS:I,EventBus:ft,emit:P,off:hi,on:F},Symbol.toStringTag,{value:"Module"})),Vt={WHITE:"#FFFFFF",BLACK:"#000000",GRAY:"#808080",GREY:"#808080",RED:"#FF0000",GREEN:"#00FF00",BLUE:"#0000FF",YELLOW:"#FFFF00",ORANGE:"#FFA500"},gi={GRID_SIZE:10,SNAP_THRESHOLD:10,SIDEBAR_WIDTH:300,PROPERTIES_WIDTH:350},fi={X:40,Y:40,WIDTH:200,HEIGHT:60},qt={TOP_LEFT:"TOP_LEFT",TOP_CENTER:"TOP_CENTER",TOP_RIGHT:"TOP_RIGHT",CENTER_LEFT:"CENTER_LEFT",CENTER:"CENTER",CENTER_RIGHT:"CENTER_RIGHT",BOTTOM_LEFT:"BOTTOM_LEFT",BOTTOM_CENTER:"BOTTOM_CENTER",BOTTOM_RIGHT:"BOTTOM_RIGHT"},Xt={LANDSCAPE:"landscape",PORTRAIT:"portrait"},Kt={snapEnabled:!0,showGrid:!0,showDebugGrid:!1,showRulers:!1,gridOpacity:8,editor_light_mode:!1,aiProvider:"gemini",aiModelGemini:"gemini-1.5-flash",aiModelOpenAI:"gpt-4o",aiModelOpenRouter:"",aiModelFilter:"",extendedLatinGlyphs:!1,autoCycleEnabled:!1,autoCycleIntervalS:30,refreshInterval:600,manualRefreshOnly:!1,darkMode:!1,invertedColors:!1,lcdEcoStrategy:"backlight_off",dimTimeout:10,sleepEnabled:!1,sleepStartHour:0,sleepEndHour:5,deepSleepEnabled:!1,deepSleepInterval:600,dailyRefreshEnabled:!1,dailyRefreshTime:"08:00",noRefreshStartHour:null,noRefreshEndHour:null,renderingMode:"direct",oeplEntityId:"",oeplDither:2,opendisplayEntityId:"",opendisplayDither:2,opendisplayTtl:60,glyphsets:["GF_Latin_Kernel"]},Jt=50,mi={RSS:300,ENTITIES:60},yi=5e3,_e=10,_i=10,Zt={white:"COLOR_WHITE",black:"COLOR_BLACK",gray:"Color(160, 160, 160)",grey:"Color(160, 160, 160)",red:"COLOR_RED",green:"COLOR_GREEN",blue:"COLOR_BLUE",yellow:"COLOR_YELLOW",orange:"COLOR_ORANGE"},Qt=800,en=480;window.ESPHomeDesigner=window.ESPHomeDesigner||{version:"0.9.0",constants:{COLORS:Vt,UI_DEFAULTS:gi,ALIGNMENT:qt,ORIENTATIONS:Xt,DEFAULT_PREFERENCES:Kt,WIDGET_DEFAULTS:fi,HISTORY_LIMIT:Jt,CACHE_TTL:mi,ENTITY_LIMIT:yi,ESPHOME_COLOR_MAPPING:Zt,DEFAULT_CANVAS_WIDTH:Qt,DEFAULT_CANVAS_HEIGHT:en,SNAP_DISTANCE:_e,GRID_SIZE:_i}};window.COLORS=Vt;window.UI_DEFAULTS=gi;window.ALIGNMENT=qt;window.ORIENTATIONS=Xt;window.DEFAULT_PREFERENCES=Kt;window.WIDGET_DEFAULTS=fi;window.HISTORY_LIMIT=Jt;window.CACHE_TTL=mi;window.ENTITY_LIMIT=yi;window.ESPHOME_COLOR_MAPPING=Zt;window.DEFAULT_CANVAS_WIDTH=Qt;window.DEFAULT_CANVAS_HEIGHT=en;window.SNAP_DISTANCE=_e;window.GRID_SIZE=_i;var Ko={};const Jo=(typeof localStorage<"u"?localStorage.getItem("esphome-designer-debug"):Ko.DEBUG)==="true"||typeof window<"u"&&new URLSearchParams(window.location.search).get("debug")==="true",v={log:(...t)=>Jo&&console.log("[ESPHomeDesigner]",...t),warn:(...t)=>console.warn("[ESPHomeDesigner]",...t),error:(...t)=>console.error("[ESPHomeDesigner]",...t)},Zo=`# ============================================================================
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
`,Qo=`# ============================================================================
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
`,es=`# ============================================================================
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
`,ts=`# ============================================================================
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


    # __LAMBDA_PLACEHOLDER__`,ns=`# ============================================================================
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
`,is=`# ============================================================================
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
`,os=`# ============================================================================
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
`,ss=`# ============================================================================
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
`,rs=`# ============================================================================
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
`,as=`# ============================================================================
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
`,ls=`# ============================================================================
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
`,ds=`# ============================================================================
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
`,cs=`# ============================================================================
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
`,ps=`# ============================================================================
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
`,us=`# ============================================================================
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
`;function tn(){let t=nn();if(t)return t=t.trim(),t.includes("reterminal_dashboard")&&(v.log("[Env] Migrating legacy manual URL to new domain"),t=t.replace("reterminal_dashboard","esphome_designer"),on(t)),t.endsWith("/")&&(t=t.slice(0,-1)),t&&!t.includes("/api/")&&(t+="/api/esphome_designer"),t;try{const e=window.location;return e.protocol==="file:"?null:e.hostname==="homeassistant"||e.hostname==="hassio"||e.pathname.includes("/api/")||e.pathname.includes("/local/")||e.pathname.includes("/hacsfiles/")||e.pathname.includes("/esphome-designer")?`${e.origin}/api/esphome_designer`:null}catch{return null}}function nn(){try{return localStorage.getItem("ha_manual_url")}catch{return null}}function on(t){try{if(t){let e=t.trim();e.endsWith("/")&&(e=e.slice(0,-1)),e.includes("/api/")||(e+="/api/esphome_designer"),localStorage.setItem("ha_manual_url",e)}else localStorage.removeItem("ha_manual_url")}catch(e){v.error("Failed to save HA URL:",e)}}function mt(){try{return localStorage.getItem("ha_llat_token")}catch{return null}}function vi(t){try{t?localStorage.setItem("ha_llat_token",t):localStorage.removeItem("ha_llat_token")}catch(e){v.error("Failed to save HA Token:",e)}}let $=tn();function Tt(){$=tn()}function N(){return!!$}function bi(){try{const t=window.location;return t.protocol==="file:"?!1:t.hostname==="homeassistant"||t.hostname==="hassio"||t.pathname.includes("/api/esphome_designer")||t.pathname.includes("/esphome-designer")}catch{return!1}}window.detectHaBackendBaseUrl=tn;window.getHaManualUrl=nn;window.setHaManualUrl=on;window.getHaToken=mt;window.setHaToken=vi;window.HA_API_BASE=$;window.refreshHaBaseUrl=Tt;window.hasHaBackend=N;window.isDeployedInHa=bi;/*! js-yaml 4.1.1 https://github.com/nodeca/js-yaml @license MIT */function xi(t){return typeof t>"u"||t===null}function hs(t){return typeof t=="object"&&t!==null}function gs(t){return Array.isArray(t)?t:xi(t)?[]:[t]}function fs(t,e){var i,n,o,s;if(e)for(s=Object.keys(e),i=0,n=s.length;i<n;i+=1)o=s[i],t[o]=e[o];return t}function ms(t,e){var i="",n;for(n=0;n<e;n+=1)i+=t;return i}function ys(t){return t===0&&Number.NEGATIVE_INFINITY===1/t}var _s=xi,vs=hs,bs=gs,xs=ms,ws=ys,Es=fs,V={isNothing:_s,isObject:vs,toArray:bs,repeat:xs,isNegativeZero:ws,extend:Es};function wi(t,e){var i="",n=t.reason||"(unknown reason)";return t.mark?(t.mark.name&&(i+='in "'+t.mark.name+'" '),i+="("+(t.mark.line+1)+":"+(t.mark.column+1)+")",!e&&t.mark.snippet&&(i+=`

`+t.mark.snippet),n+" "+i):n}function je(t,e){Error.call(this),this.name="YAMLException",this.reason=t,this.mark=e,this.message=wi(this,!1),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack||""}je.prototype=Object.create(Error.prototype);je.prototype.constructor=je;je.prototype.toString=function(e){return this.name+": "+wi(this,e)};var Z=je;function bt(t,e,i,n,o){var s="",r="",a=Math.floor(o/2)-1;return n-e>a&&(s=" ... ",e=n-a+s.length),i-n>a&&(r=" ...",i=n+a-r.length),{str:s+t.slice(e,i).replace(/\t/g,"→")+r,pos:n-e+s.length}}function xt(t,e){return V.repeat(" ",e-t.length)+t}function Ss(t,e){if(e=Object.create(e||null),!t.buffer)return null;e.maxLength||(e.maxLength=79),typeof e.indent!="number"&&(e.indent=1),typeof e.linesBefore!="number"&&(e.linesBefore=3),typeof e.linesAfter!="number"&&(e.linesAfter=2);for(var i=/\r?\n|\r|\0/g,n=[0],o=[],s,r=-1;s=i.exec(t.buffer);)o.push(s.index),n.push(s.index+s[0].length),t.position<=s.index&&r<0&&(r=n.length-2);r<0&&(r=n.length-1);var a="",l,c,d=Math.min(t.line+e.linesAfter,o.length).toString().length,p=e.maxLength-(e.indent+d+3);for(l=1;l<=e.linesBefore&&!(r-l<0);l++)c=bt(t.buffer,n[r-l],o[r-l],t.position-(n[r]-n[r-l]),p),a=V.repeat(" ",e.indent)+xt((t.line-l+1).toString(),d)+" | "+c.str+`
`+a;for(c=bt(t.buffer,n[r],o[r],t.position,p),a+=V.repeat(" ",e.indent)+xt((t.line+1).toString(),d)+" | "+c.str+`
`,a+=V.repeat("-",e.indent+d+3+c.pos)+`^
`,l=1;l<=e.linesAfter&&!(r+l>=o.length);l++)c=bt(t.buffer,n[r+l],o[r+l],t.position-(n[r]-n[r+l]),p),a+=V.repeat(" ",e.indent)+xt((t.line+l+1).toString(),d)+" | "+c.str+`
`;return a.replace(/\n$/,"")}var Is=Ss,Cs=["kind","multi","resolve","construct","instanceOf","predicate","represent","representName","defaultStyle","styleAliases"],ks=["scalar","sequence","mapping"];function Ps(t){var e={};return t!==null&&Object.keys(t).forEach(function(i){t[i].forEach(function(n){e[String(n)]=i})}),e}function Ls(t,e){if(e=e||{},Object.keys(e).forEach(function(i){if(Cs.indexOf(i)===-1)throw new Z('Unknown option "'+i+'" is met in definition of "'+t+'" YAML type.')}),this.options=e,this.tag=t,this.kind=e.kind||null,this.resolve=e.resolve||function(){return!0},this.construct=e.construct||function(i){return i},this.instanceOf=e.instanceOf||null,this.predicate=e.predicate||null,this.represent=e.represent||null,this.representName=e.representName||null,this.defaultStyle=e.defaultStyle||null,this.multi=e.multi||!1,this.styleAliases=Ps(e.styleAliases||null),ks.indexOf(this.kind)===-1)throw new Z('Unknown kind "'+this.kind+'" is specified for "'+t+'" YAML type.')}var q=Ls;function xn(t,e){var i=[];return t[e].forEach(function(n){var o=i.length;i.forEach(function(s,r){s.tag===n.tag&&s.kind===n.kind&&s.multi===n.multi&&(o=r)}),i[o]=n}),i}function Ts(){var t={scalar:{},sequence:{},mapping:{},fallback:{},multi:{scalar:[],sequence:[],mapping:[],fallback:[]}},e,i;function n(o){o.multi?(t.multi[o.kind].push(o),t.multi.fallback.push(o)):t[o.kind][o.tag]=t.fallback[o.tag]=o}for(e=0,i=arguments.length;e<i;e+=1)arguments[e].forEach(n);return t}function Mt(t){return this.extend(t)}Mt.prototype.extend=function(e){var i=[],n=[];if(e instanceof q)n.push(e);else if(Array.isArray(e))n=n.concat(e);else if(e&&(Array.isArray(e.implicit)||Array.isArray(e.explicit)))e.implicit&&(i=i.concat(e.implicit)),e.explicit&&(n=n.concat(e.explicit));else throw new Z("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");i.forEach(function(s){if(!(s instanceof q))throw new Z("Specified list of YAML types (or a single Type object) contains a non-Type object.");if(s.loadKind&&s.loadKind!=="scalar")throw new Z("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");if(s.multi)throw new Z("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.")}),n.forEach(function(s){if(!(s instanceof q))throw new Z("Specified list of YAML types (or a single Type object) contains a non-Type object.")});var o=Object.create(Mt.prototype);return o.implicit=(this.implicit||[]).concat(i),o.explicit=(this.explicit||[]).concat(n),o.compiledImplicit=xn(o,"implicit"),o.compiledExplicit=xn(o,"explicit"),o.compiledTypeMap=Ts(o.compiledImplicit,o.compiledExplicit),o};var Ei=Mt,Si=new q("tag:yaml.org,2002:str",{kind:"scalar",construct:function(t){return t!==null?t:""}}),Ii=new q("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(t){return t!==null?t:[]}}),Ci=new q("tag:yaml.org,2002:map",{kind:"mapping",construct:function(t){return t!==null?t:{}}}),ki=new Ei({explicit:[Si,Ii,Ci]});function Ms(t){if(t===null)return!0;var e=t.length;return e===1&&t==="~"||e===4&&(t==="null"||t==="Null"||t==="NULL")}function As(){return null}function Os(t){return t===null}var Pi=new q("tag:yaml.org,2002:null",{kind:"scalar",resolve:Ms,construct:As,predicate:Os,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"},empty:function(){return""}},defaultStyle:"lowercase"});function Ds(t){if(t===null)return!1;var e=t.length;return e===4&&(t==="true"||t==="True"||t==="TRUE")||e===5&&(t==="false"||t==="False"||t==="FALSE")}function Rs(t){return t==="true"||t==="True"||t==="TRUE"}function Bs(t){return Object.prototype.toString.call(t)==="[object Boolean]"}var Li=new q("tag:yaml.org,2002:bool",{kind:"scalar",resolve:Ds,construct:Rs,predicate:Bs,represent:{lowercase:function(t){return t?"true":"false"},uppercase:function(t){return t?"TRUE":"FALSE"},camelcase:function(t){return t?"True":"False"}},defaultStyle:"lowercase"});function Hs(t){return 48<=t&&t<=57||65<=t&&t<=70||97<=t&&t<=102}function Ns(t){return 48<=t&&t<=55}function Gs(t){return 48<=t&&t<=57}function Ws(t){if(t===null)return!1;var e=t.length,i=0,n=!1,o;if(!e)return!1;if(o=t[i],(o==="-"||o==="+")&&(o=t[++i]),o==="0"){if(i+1===e)return!0;if(o=t[++i],o==="b"){for(i++;i<e;i++)if(o=t[i],o!=="_"){if(o!=="0"&&o!=="1")return!1;n=!0}return n&&o!=="_"}if(o==="x"){for(i++;i<e;i++)if(o=t[i],o!=="_"){if(!Hs(t.charCodeAt(i)))return!1;n=!0}return n&&o!=="_"}if(o==="o"){for(i++;i<e;i++)if(o=t[i],o!=="_"){if(!Ns(t.charCodeAt(i)))return!1;n=!0}return n&&o!=="_"}}if(o==="_")return!1;for(;i<e;i++)if(o=t[i],o!=="_"){if(!Gs(t.charCodeAt(i)))return!1;n=!0}return!(!n||o==="_")}function Fs(t){var e=t,i=1,n;if(e.indexOf("_")!==-1&&(e=e.replace(/_/g,"")),n=e[0],(n==="-"||n==="+")&&(n==="-"&&(i=-1),e=e.slice(1),n=e[0]),e==="0")return 0;if(n==="0"){if(e[1]==="b")return i*parseInt(e.slice(2),2);if(e[1]==="x")return i*parseInt(e.slice(2),16);if(e[1]==="o")return i*parseInt(e.slice(2),8)}return i*parseInt(e,10)}function $s(t){return Object.prototype.toString.call(t)==="[object Number]"&&t%1===0&&!V.isNegativeZero(t)}var Ti=new q("tag:yaml.org,2002:int",{kind:"scalar",resolve:Ws,construct:Fs,predicate:$s,represent:{binary:function(t){return t>=0?"0b"+t.toString(2):"-0b"+t.toString(2).slice(1)},octal:function(t){return t>=0?"0o"+t.toString(8):"-0o"+t.toString(8).slice(1)},decimal:function(t){return t.toString(10)},hexadecimal:function(t){return t>=0?"0x"+t.toString(16).toUpperCase():"-0x"+t.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}}),zs=new RegExp("^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function Us(t){return!(t===null||!zs.test(t)||t[t.length-1]==="_")}function js(t){var e,i;return e=t.replace(/_/g,"").toLowerCase(),i=e[0]==="-"?-1:1,"+-".indexOf(e[0])>=0&&(e=e.slice(1)),e===".inf"?i===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:e===".nan"?NaN:i*parseFloat(e,10)}var Ys=/^[-+]?[0-9]+e/;function Vs(t,e){var i;if(isNaN(t))switch(e){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===t)switch(e){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===t)switch(e){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(V.isNegativeZero(t))return"-0.0";return i=t.toString(10),Ys.test(i)?i.replace("e",".e"):i}function qs(t){return Object.prototype.toString.call(t)==="[object Number]"&&(t%1!==0||V.isNegativeZero(t))}var Mi=new q("tag:yaml.org,2002:float",{kind:"scalar",resolve:Us,construct:js,predicate:qs,represent:Vs,defaultStyle:"lowercase"}),Ai=ki.extend({implicit:[Pi,Li,Ti,Mi]}),Oi=Ai,Di=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),Ri=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function Xs(t){return t===null?!1:Di.exec(t)!==null||Ri.exec(t)!==null}function Ks(t){var e,i,n,o,s,r,a,l=0,c=null,d,p,g;if(e=Di.exec(t),e===null&&(e=Ri.exec(t)),e===null)throw new Error("Date resolve error");if(i=+e[1],n=+e[2]-1,o=+e[3],!e[4])return new Date(Date.UTC(i,n,o));if(s=+e[4],r=+e[5],a=+e[6],e[7]){for(l=e[7].slice(0,3);l.length<3;)l+="0";l=+l}return e[9]&&(d=+e[10],p=+(e[11]||0),c=(d*60+p)*6e4,e[9]==="-"&&(c=-c)),g=new Date(Date.UTC(i,n,o,s,r,a,l)),c&&g.setTime(g.getTime()-c),g}function Js(t){return t.toISOString()}var Bi=new q("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:Xs,construct:Ks,instanceOf:Date,represent:Js});function Zs(t){return t==="<<"||t===null}var Hi=new q("tag:yaml.org,2002:merge",{kind:"scalar",resolve:Zs}),sn=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function Qs(t){if(t===null)return!1;var e,i,n=0,o=t.length,s=sn;for(i=0;i<o;i++)if(e=s.indexOf(t.charAt(i)),!(e>64)){if(e<0)return!1;n+=6}return n%8===0}function er(t){var e,i,n=t.replace(/[\r\n=]/g,""),o=n.length,s=sn,r=0,a=[];for(e=0;e<o;e++)e%4===0&&e&&(a.push(r>>16&255),a.push(r>>8&255),a.push(r&255)),r=r<<6|s.indexOf(n.charAt(e));return i=o%4*6,i===0?(a.push(r>>16&255),a.push(r>>8&255),a.push(r&255)):i===18?(a.push(r>>10&255),a.push(r>>2&255)):i===12&&a.push(r>>4&255),new Uint8Array(a)}function tr(t){var e="",i=0,n,o,s=t.length,r=sn;for(n=0;n<s;n++)n%3===0&&n&&(e+=r[i>>18&63],e+=r[i>>12&63],e+=r[i>>6&63],e+=r[i&63]),i=(i<<8)+t[n];return o=s%3,o===0?(e+=r[i>>18&63],e+=r[i>>12&63],e+=r[i>>6&63],e+=r[i&63]):o===2?(e+=r[i>>10&63],e+=r[i>>4&63],e+=r[i<<2&63],e+=r[64]):o===1&&(e+=r[i>>2&63],e+=r[i<<4&63],e+=r[64],e+=r[64]),e}function nr(t){return Object.prototype.toString.call(t)==="[object Uint8Array]"}var Ni=new q("tag:yaml.org,2002:binary",{kind:"scalar",resolve:Qs,construct:er,predicate:nr,represent:tr}),ir=Object.prototype.hasOwnProperty,or=Object.prototype.toString;function sr(t){if(t===null)return!0;var e=[],i,n,o,s,r,a=t;for(i=0,n=a.length;i<n;i+=1){if(o=a[i],r=!1,or.call(o)!=="[object Object]")return!1;for(s in o)if(ir.call(o,s))if(!r)r=!0;else return!1;if(!r)return!1;if(e.indexOf(s)===-1)e.push(s);else return!1}return!0}function rr(t){return t!==null?t:[]}var Gi=new q("tag:yaml.org,2002:omap",{kind:"sequence",resolve:sr,construct:rr}),ar=Object.prototype.toString;function lr(t){if(t===null)return!0;var e,i,n,o,s,r=t;for(s=new Array(r.length),e=0,i=r.length;e<i;e+=1){if(n=r[e],ar.call(n)!=="[object Object]"||(o=Object.keys(n),o.length!==1))return!1;s[e]=[o[0],n[o[0]]]}return!0}function dr(t){if(t===null)return[];var e,i,n,o,s,r=t;for(s=new Array(r.length),e=0,i=r.length;e<i;e+=1)n=r[e],o=Object.keys(n),s[e]=[o[0],n[o[0]]];return s}var Wi=new q("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:lr,construct:dr}),cr=Object.prototype.hasOwnProperty;function pr(t){if(t===null)return!0;var e,i=t;for(e in i)if(cr.call(i,e)&&i[e]!==null)return!1;return!0}function ur(t){return t!==null?t:{}}var Fi=new q("tag:yaml.org,2002:set",{kind:"mapping",resolve:pr,construct:ur}),rn=Oi.extend({implicit:[Bi,Hi],explicit:[Ni,Gi,Wi,Fi]}),xe=Object.prototype.hasOwnProperty,st=1,$i=2,zi=3,rt=4,wt=1,hr=2,wn=3,gr=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,fr=/[\x85\u2028\u2029]/,mr=/[,\[\]\{\}]/,Ui=/^(?:!|!!|![a-z\-]+!)$/i,ji=/^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;function En(t){return Object.prototype.toString.call(t)}function ae(t){return t===10||t===13}function Ie(t){return t===9||t===32}function Q(t){return t===9||t===32||t===10||t===13}function Me(t){return t===44||t===91||t===93||t===123||t===125}function yr(t){var e;return 48<=t&&t<=57?t-48:(e=t|32,97<=e&&e<=102?e-97+10:-1)}function _r(t){return t===120?2:t===117?4:t===85?8:0}function vr(t){return 48<=t&&t<=57?t-48:-1}function Sn(t){return t===48?"\0":t===97?"\x07":t===98?"\b":t===116||t===9?"	":t===110?`
`:t===118?"\v":t===102?"\f":t===114?"\r":t===101?"\x1B":t===32?" ":t===34?'"':t===47?"/":t===92?"\\":t===78?"":t===95?" ":t===76?"\u2028":t===80?"\u2029":""}function br(t){return t<=65535?String.fromCharCode(t):String.fromCharCode((t-65536>>10)+55296,(t-65536&1023)+56320)}function Yi(t,e,i){e==="__proto__"?Object.defineProperty(t,e,{configurable:!0,enumerable:!0,writable:!0,value:i}):t[e]=i}var Vi=new Array(256),qi=new Array(256);for(var Pe=0;Pe<256;Pe++)Vi[Pe]=Sn(Pe)?1:0,qi[Pe]=Sn(Pe);function xr(t,e){this.input=t,this.filename=e.filename||null,this.schema=e.schema||rn,this.onWarning=e.onWarning||null,this.legacy=e.legacy||!1,this.json=e.json||!1,this.listener=e.listener||null,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=t.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.firstTabInLine=-1,this.documents=[]}function Xi(t,e){var i={name:t.filename,buffer:t.input.slice(0,-1),position:t.position,line:t.line,column:t.position-t.lineStart};return i.snippet=Is(i),new Z(e,i)}function M(t,e){throw Xi(t,e)}function at(t,e){t.onWarning&&t.onWarning.call(null,Xi(t,e))}var In={YAML:function(e,i,n){var o,s,r;e.version!==null&&M(e,"duplication of %YAML directive"),n.length!==1&&M(e,"YAML directive accepts exactly one argument"),o=/^([0-9]+)\.([0-9]+)$/.exec(n[0]),o===null&&M(e,"ill-formed argument of the YAML directive"),s=parseInt(o[1],10),r=parseInt(o[2],10),s!==1&&M(e,"unacceptable YAML version of the document"),e.version=n[0],e.checkLineBreaks=r<2,r!==1&&r!==2&&at(e,"unsupported YAML version of the document")},TAG:function(e,i,n){var o,s;n.length!==2&&M(e,"TAG directive accepts exactly two arguments"),o=n[0],s=n[1],Ui.test(o)||M(e,"ill-formed tag handle (first argument) of the TAG directive"),xe.call(e.tagMap,o)&&M(e,'there is a previously declared suffix for "'+o+'" tag handle'),ji.test(s)||M(e,"ill-formed tag prefix (second argument) of the TAG directive");try{s=decodeURIComponent(s)}catch{M(e,"tag prefix is malformed: "+s)}e.tagMap[o]=s}};function be(t,e,i,n){var o,s,r,a;if(e<i){if(a=t.input.slice(e,i),n)for(o=0,s=a.length;o<s;o+=1)r=a.charCodeAt(o),r===9||32<=r&&r<=1114111||M(t,"expected valid JSON character");else gr.test(a)&&M(t,"the stream contains non-printable characters");t.result+=a}}function Cn(t,e,i,n){var o,s,r,a;for(V.isObject(i)||M(t,"cannot merge mappings; the provided source object is unacceptable"),o=Object.keys(i),r=0,a=o.length;r<a;r+=1)s=o[r],xe.call(e,s)||(Yi(e,s,i[s]),n[s]=!0)}function Ae(t,e,i,n,o,s,r,a,l){var c,d;if(Array.isArray(o))for(o=Array.prototype.slice.call(o),c=0,d=o.length;c<d;c+=1)Array.isArray(o[c])&&M(t,"nested arrays are not supported inside keys"),typeof o=="object"&&En(o[c])==="[object Object]"&&(o[c]="[object Object]");if(typeof o=="object"&&En(o)==="[object Object]"&&(o="[object Object]"),o=String(o),e===null&&(e={}),n==="tag:yaml.org,2002:merge")if(Array.isArray(s))for(c=0,d=s.length;c<d;c+=1)Cn(t,e,s[c],i);else Cn(t,e,s,i);else!t.json&&!xe.call(i,o)&&xe.call(e,o)&&(t.line=r||t.line,t.lineStart=a||t.lineStart,t.position=l||t.position,M(t,"duplicated mapping key")),Yi(e,o,s),delete i[o];return e}function an(t){var e;e=t.input.charCodeAt(t.position),e===10?t.position++:e===13?(t.position++,t.input.charCodeAt(t.position)===10&&t.position++):M(t,"a line break is expected"),t.line+=1,t.lineStart=t.position,t.firstTabInLine=-1}function Y(t,e,i){for(var n=0,o=t.input.charCodeAt(t.position);o!==0;){for(;Ie(o);)o===9&&t.firstTabInLine===-1&&(t.firstTabInLine=t.position),o=t.input.charCodeAt(++t.position);if(e&&o===35)do o=t.input.charCodeAt(++t.position);while(o!==10&&o!==13&&o!==0);if(ae(o))for(an(t),o=t.input.charCodeAt(t.position),n++,t.lineIndent=0;o===32;)t.lineIndent++,o=t.input.charCodeAt(++t.position);else break}return i!==-1&&n!==0&&t.lineIndent<i&&at(t,"deficient indentation"),n}function yt(t){var e=t.position,i;return i=t.input.charCodeAt(e),!!((i===45||i===46)&&i===t.input.charCodeAt(e+1)&&i===t.input.charCodeAt(e+2)&&(e+=3,i=t.input.charCodeAt(e),i===0||Q(i)))}function ln(t,e){e===1?t.result+=" ":e>1&&(t.result+=V.repeat(`
`,e-1))}function wr(t,e,i){var n,o,s,r,a,l,c,d,p=t.kind,g=t.result,u;if(u=t.input.charCodeAt(t.position),Q(u)||Me(u)||u===35||u===38||u===42||u===33||u===124||u===62||u===39||u===34||u===37||u===64||u===96||(u===63||u===45)&&(o=t.input.charCodeAt(t.position+1),Q(o)||i&&Me(o)))return!1;for(t.kind="scalar",t.result="",s=r=t.position,a=!1;u!==0;){if(u===58){if(o=t.input.charCodeAt(t.position+1),Q(o)||i&&Me(o))break}else if(u===35){if(n=t.input.charCodeAt(t.position-1),Q(n))break}else{if(t.position===t.lineStart&&yt(t)||i&&Me(u))break;if(ae(u))if(l=t.line,c=t.lineStart,d=t.lineIndent,Y(t,!1,-1),t.lineIndent>=e){a=!0,u=t.input.charCodeAt(t.position);continue}else{t.position=r,t.line=l,t.lineStart=c,t.lineIndent=d;break}}a&&(be(t,s,r,!1),ln(t,t.line-l),s=r=t.position,a=!1),Ie(u)||(r=t.position+1),u=t.input.charCodeAt(++t.position)}return be(t,s,r,!1),t.result?!0:(t.kind=p,t.result=g,!1)}function Er(t,e){var i,n,o;if(i=t.input.charCodeAt(t.position),i!==39)return!1;for(t.kind="scalar",t.result="",t.position++,n=o=t.position;(i=t.input.charCodeAt(t.position))!==0;)if(i===39)if(be(t,n,t.position,!0),i=t.input.charCodeAt(++t.position),i===39)n=t.position,t.position++,o=t.position;else return!0;else ae(i)?(be(t,n,o,!0),ln(t,Y(t,!1,e)),n=o=t.position):t.position===t.lineStart&&yt(t)?M(t,"unexpected end of the document within a single quoted scalar"):(t.position++,o=t.position);M(t,"unexpected end of the stream within a single quoted scalar")}function Sr(t,e){var i,n,o,s,r,a;if(a=t.input.charCodeAt(t.position),a!==34)return!1;for(t.kind="scalar",t.result="",t.position++,i=n=t.position;(a=t.input.charCodeAt(t.position))!==0;){if(a===34)return be(t,i,t.position,!0),t.position++,!0;if(a===92){if(be(t,i,t.position,!0),a=t.input.charCodeAt(++t.position),ae(a))Y(t,!1,e);else if(a<256&&Vi[a])t.result+=qi[a],t.position++;else if((r=_r(a))>0){for(o=r,s=0;o>0;o--)a=t.input.charCodeAt(++t.position),(r=yr(a))>=0?s=(s<<4)+r:M(t,"expected hexadecimal character");t.result+=br(s),t.position++}else M(t,"unknown escape sequence");i=n=t.position}else ae(a)?(be(t,i,n,!0),ln(t,Y(t,!1,e)),i=n=t.position):t.position===t.lineStart&&yt(t)?M(t,"unexpected end of the document within a double quoted scalar"):(t.position++,n=t.position)}M(t,"unexpected end of the stream within a double quoted scalar")}function Ir(t,e){var i=!0,n,o,s,r=t.tag,a,l=t.anchor,c,d,p,g,u,f=Object.create(null),y,m,_,b;if(b=t.input.charCodeAt(t.position),b===91)d=93,u=!1,a=[];else if(b===123)d=125,u=!0,a={};else return!1;for(t.anchor!==null&&(t.anchorMap[t.anchor]=a),b=t.input.charCodeAt(++t.position);b!==0;){if(Y(t,!0,e),b=t.input.charCodeAt(t.position),b===d)return t.position++,t.tag=r,t.anchor=l,t.kind=u?"mapping":"sequence",t.result=a,!0;i?b===44&&M(t,"expected the node content, but found ','"):M(t,"missed comma between flow collection entries"),m=y=_=null,p=g=!1,b===63&&(c=t.input.charCodeAt(t.position+1),Q(c)&&(p=g=!0,t.position++,Y(t,!0,e))),n=t.line,o=t.lineStart,s=t.position,Be(t,e,st,!1,!0),m=t.tag,y=t.result,Y(t,!0,e),b=t.input.charCodeAt(t.position),(g||t.line===n)&&b===58&&(p=!0,b=t.input.charCodeAt(++t.position),Y(t,!0,e),Be(t,e,st,!1,!0),_=t.result),u?Ae(t,a,f,m,y,_,n,o,s):p?a.push(Ae(t,null,f,m,y,_,n,o,s)):a.push(y),Y(t,!0,e),b=t.input.charCodeAt(t.position),b===44?(i=!0,b=t.input.charCodeAt(++t.position)):i=!1}M(t,"unexpected end of the stream within a flow collection")}function Cr(t,e){var i,n,o=wt,s=!1,r=!1,a=e,l=0,c=!1,d,p;if(p=t.input.charCodeAt(t.position),p===124)n=!1;else if(p===62)n=!0;else return!1;for(t.kind="scalar",t.result="";p!==0;)if(p=t.input.charCodeAt(++t.position),p===43||p===45)wt===o?o=p===43?wn:hr:M(t,"repeat of a chomping mode identifier");else if((d=vr(p))>=0)d===0?M(t,"bad explicit indentation width of a block scalar; it cannot be less than one"):r?M(t,"repeat of an indentation width identifier"):(a=e+d-1,r=!0);else break;if(Ie(p)){do p=t.input.charCodeAt(++t.position);while(Ie(p));if(p===35)do p=t.input.charCodeAt(++t.position);while(!ae(p)&&p!==0)}for(;p!==0;){for(an(t),t.lineIndent=0,p=t.input.charCodeAt(t.position);(!r||t.lineIndent<a)&&p===32;)t.lineIndent++,p=t.input.charCodeAt(++t.position);if(!r&&t.lineIndent>a&&(a=t.lineIndent),ae(p)){l++;continue}if(t.lineIndent<a){o===wn?t.result+=V.repeat(`
`,s?1+l:l):o===wt&&s&&(t.result+=`
`);break}for(n?Ie(p)?(c=!0,t.result+=V.repeat(`
`,s?1+l:l)):c?(c=!1,t.result+=V.repeat(`
`,l+1)):l===0?s&&(t.result+=" "):t.result+=V.repeat(`
`,l):t.result+=V.repeat(`
`,s?1+l:l),s=!0,r=!0,l=0,i=t.position;!ae(p)&&p!==0;)p=t.input.charCodeAt(++t.position);be(t,i,t.position,!1)}return!0}function kn(t,e){var i,n=t.tag,o=t.anchor,s=[],r,a=!1,l;if(t.firstTabInLine!==-1)return!1;for(t.anchor!==null&&(t.anchorMap[t.anchor]=s),l=t.input.charCodeAt(t.position);l!==0&&(t.firstTabInLine!==-1&&(t.position=t.firstTabInLine,M(t,"tab characters must not be used in indentation")),!(l!==45||(r=t.input.charCodeAt(t.position+1),!Q(r))));){if(a=!0,t.position++,Y(t,!0,-1)&&t.lineIndent<=e){s.push(null),l=t.input.charCodeAt(t.position);continue}if(i=t.line,Be(t,e,zi,!1,!0),s.push(t.result),Y(t,!0,-1),l=t.input.charCodeAt(t.position),(t.line===i||t.lineIndent>e)&&l!==0)M(t,"bad indentation of a sequence entry");else if(t.lineIndent<e)break}return a?(t.tag=n,t.anchor=o,t.kind="sequence",t.result=s,!0):!1}function kr(t,e,i){var n,o,s,r,a,l,c=t.tag,d=t.anchor,p={},g=Object.create(null),u=null,f=null,y=null,m=!1,_=!1,b;if(t.firstTabInLine!==-1)return!1;for(t.anchor!==null&&(t.anchorMap[t.anchor]=p),b=t.input.charCodeAt(t.position);b!==0;){if(!m&&t.firstTabInLine!==-1&&(t.position=t.firstTabInLine,M(t,"tab characters must not be used in indentation")),n=t.input.charCodeAt(t.position+1),s=t.line,(b===63||b===58)&&Q(n))b===63?(m&&(Ae(t,p,g,u,f,null,r,a,l),u=f=y=null),_=!0,m=!0,o=!0):m?(m=!1,o=!0):M(t,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),t.position+=1,b=n;else{if(r=t.line,a=t.lineStart,l=t.position,!Be(t,i,$i,!1,!0))break;if(t.line===s){for(b=t.input.charCodeAt(t.position);Ie(b);)b=t.input.charCodeAt(++t.position);if(b===58)b=t.input.charCodeAt(++t.position),Q(b)||M(t,"a whitespace character is expected after the key-value separator within a block mapping"),m&&(Ae(t,p,g,u,f,null,r,a,l),u=f=y=null),_=!0,m=!1,o=!1,u=t.tag,f=t.result;else if(_)M(t,"can not read an implicit mapping pair; a colon is missed");else return t.tag=c,t.anchor=d,!0}else if(_)M(t,"can not read a block mapping entry; a multiline key may not be an implicit key");else return t.tag=c,t.anchor=d,!0}if((t.line===s||t.lineIndent>e)&&(m&&(r=t.line,a=t.lineStart,l=t.position),Be(t,e,rt,!0,o)&&(m?f=t.result:y=t.result),m||(Ae(t,p,g,u,f,y,r,a,l),u=f=y=null),Y(t,!0,-1),b=t.input.charCodeAt(t.position)),(t.line===s||t.lineIndent>e)&&b!==0)M(t,"bad indentation of a mapping entry");else if(t.lineIndent<e)break}return m&&Ae(t,p,g,u,f,null,r,a,l),_&&(t.tag=c,t.anchor=d,t.kind="mapping",t.result=p),_}function Pr(t){var e,i=!1,n=!1,o,s,r;if(r=t.input.charCodeAt(t.position),r!==33)return!1;if(t.tag!==null&&M(t,"duplication of a tag property"),r=t.input.charCodeAt(++t.position),r===60?(i=!0,r=t.input.charCodeAt(++t.position)):r===33?(n=!0,o="!!",r=t.input.charCodeAt(++t.position)):o="!",e=t.position,i){do r=t.input.charCodeAt(++t.position);while(r!==0&&r!==62);t.position<t.length?(s=t.input.slice(e,t.position),r=t.input.charCodeAt(++t.position)):M(t,"unexpected end of the stream within a verbatim tag")}else{for(;r!==0&&!Q(r);)r===33&&(n?M(t,"tag suffix cannot contain exclamation marks"):(o=t.input.slice(e-1,t.position+1),Ui.test(o)||M(t,"named tag handle cannot contain such characters"),n=!0,e=t.position+1)),r=t.input.charCodeAt(++t.position);s=t.input.slice(e,t.position),mr.test(s)&&M(t,"tag suffix cannot contain flow indicator characters")}s&&!ji.test(s)&&M(t,"tag name cannot contain such characters: "+s);try{s=decodeURIComponent(s)}catch{M(t,"tag name is malformed: "+s)}return i?t.tag=s:xe.call(t.tagMap,o)?t.tag=t.tagMap[o]+s:o==="!"?t.tag="!"+s:o==="!!"?t.tag="tag:yaml.org,2002:"+s:M(t,'undeclared tag handle "'+o+'"'),!0}function Lr(t){var e,i;if(i=t.input.charCodeAt(t.position),i!==38)return!1;for(t.anchor!==null&&M(t,"duplication of an anchor property"),i=t.input.charCodeAt(++t.position),e=t.position;i!==0&&!Q(i)&&!Me(i);)i=t.input.charCodeAt(++t.position);return t.position===e&&M(t,"name of an anchor node must contain at least one character"),t.anchor=t.input.slice(e,t.position),!0}function Tr(t){var e,i,n;if(n=t.input.charCodeAt(t.position),n!==42)return!1;for(n=t.input.charCodeAt(++t.position),e=t.position;n!==0&&!Q(n)&&!Me(n);)n=t.input.charCodeAt(++t.position);return t.position===e&&M(t,"name of an alias node must contain at least one character"),i=t.input.slice(e,t.position),xe.call(t.anchorMap,i)||M(t,'unidentified alias "'+i+'"'),t.result=t.anchorMap[i],Y(t,!0,-1),!0}function Be(t,e,i,n,o){var s,r,a,l=1,c=!1,d=!1,p,g,u,f,y,m;if(t.listener!==null&&t.listener("open",t),t.tag=null,t.anchor=null,t.kind=null,t.result=null,s=r=a=rt===i||zi===i,n&&Y(t,!0,-1)&&(c=!0,t.lineIndent>e?l=1:t.lineIndent===e?l=0:t.lineIndent<e&&(l=-1)),l===1)for(;Pr(t)||Lr(t);)Y(t,!0,-1)?(c=!0,a=s,t.lineIndent>e?l=1:t.lineIndent===e?l=0:t.lineIndent<e&&(l=-1)):a=!1;if(a&&(a=c||o),(l===1||rt===i)&&(st===i||$i===i?y=e:y=e+1,m=t.position-t.lineStart,l===1?a&&(kn(t,m)||kr(t,m,y))||Ir(t,y)?d=!0:(r&&Cr(t,y)||Er(t,y)||Sr(t,y)?d=!0:Tr(t)?(d=!0,(t.tag!==null||t.anchor!==null)&&M(t,"alias node should not have any properties")):wr(t,y,st===i)&&(d=!0,t.tag===null&&(t.tag="?")),t.anchor!==null&&(t.anchorMap[t.anchor]=t.result)):l===0&&(d=a&&kn(t,m))),t.tag===null)t.anchor!==null&&(t.anchorMap[t.anchor]=t.result);else if(t.tag==="?"){for(t.result!==null&&t.kind!=="scalar"&&M(t,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+t.kind+'"'),p=0,g=t.implicitTypes.length;p<g;p+=1)if(f=t.implicitTypes[p],f.resolve(t.result)){t.result=f.construct(t.result),t.tag=f.tag,t.anchor!==null&&(t.anchorMap[t.anchor]=t.result);break}}else if(t.tag!=="!"){if(xe.call(t.typeMap[t.kind||"fallback"],t.tag))f=t.typeMap[t.kind||"fallback"][t.tag];else for(f=null,u=t.typeMap.multi[t.kind||"fallback"],p=0,g=u.length;p<g;p+=1)if(t.tag.slice(0,u[p].tag.length)===u[p].tag){f=u[p];break}f||M(t,"unknown tag !<"+t.tag+">"),t.result!==null&&f.kind!==t.kind&&M(t,"unacceptable node kind for !<"+t.tag+'> tag; it should be "'+f.kind+'", not "'+t.kind+'"'),f.resolve(t.result,t.tag)?(t.result=f.construct(t.result,t.tag),t.anchor!==null&&(t.anchorMap[t.anchor]=t.result)):M(t,"cannot resolve a node with !<"+t.tag+"> explicit tag")}return t.listener!==null&&t.listener("close",t),t.tag!==null||t.anchor!==null||d}function Mr(t){var e=t.position,i,n,o,s=!1,r;for(t.version=null,t.checkLineBreaks=t.legacy,t.tagMap=Object.create(null),t.anchorMap=Object.create(null);(r=t.input.charCodeAt(t.position))!==0&&(Y(t,!0,-1),r=t.input.charCodeAt(t.position),!(t.lineIndent>0||r!==37));){for(s=!0,r=t.input.charCodeAt(++t.position),i=t.position;r!==0&&!Q(r);)r=t.input.charCodeAt(++t.position);for(n=t.input.slice(i,t.position),o=[],n.length<1&&M(t,"directive name must not be less than one character in length");r!==0;){for(;Ie(r);)r=t.input.charCodeAt(++t.position);if(r===35){do r=t.input.charCodeAt(++t.position);while(r!==0&&!ae(r));break}if(ae(r))break;for(i=t.position;r!==0&&!Q(r);)r=t.input.charCodeAt(++t.position);o.push(t.input.slice(i,t.position))}r!==0&&an(t),xe.call(In,n)?In[n](t,n,o):at(t,'unknown document directive "'+n+'"')}if(Y(t,!0,-1),t.lineIndent===0&&t.input.charCodeAt(t.position)===45&&t.input.charCodeAt(t.position+1)===45&&t.input.charCodeAt(t.position+2)===45?(t.position+=3,Y(t,!0,-1)):s&&M(t,"directives end mark is expected"),Be(t,t.lineIndent-1,rt,!1,!0),Y(t,!0,-1),t.checkLineBreaks&&fr.test(t.input.slice(e,t.position))&&at(t,"non-ASCII line breaks are interpreted as content"),t.documents.push(t.result),t.position===t.lineStart&&yt(t)){t.input.charCodeAt(t.position)===46&&(t.position+=3,Y(t,!0,-1));return}if(t.position<t.length-1)M(t,"end of the stream or a document separator is expected");else return}function Ki(t,e){t=String(t),e=e||{},t.length!==0&&(t.charCodeAt(t.length-1)!==10&&t.charCodeAt(t.length-1)!==13&&(t+=`
`),t.charCodeAt(0)===65279&&(t=t.slice(1)));var i=new xr(t,e),n=t.indexOf("\0");for(n!==-1&&(i.position=n,M(i,"null byte is not allowed in input")),i.input+="\0";i.input.charCodeAt(i.position)===32;)i.lineIndent+=1,i.position+=1;for(;i.position<i.length-1;)Mr(i);return i.documents}function Ar(t,e,i){e!==null&&typeof e=="object"&&typeof i>"u"&&(i=e,e=null);var n=Ki(t,i);if(typeof e!="function")return n;for(var o=0,s=n.length;o<s;o+=1)e(n[o])}function Or(t,e){var i=Ki(t,e);if(i.length!==0){if(i.length===1)return i[0];throw new Z("expected a single document in the stream, but found more")}}var Dr=Ar,Rr=Or,Ji={loadAll:Dr,load:Rr},Zi=Object.prototype.toString,Qi=Object.prototype.hasOwnProperty,dn=65279,Br=9,Ye=10,Hr=13,Nr=32,Gr=33,Wr=34,At=35,Fr=37,$r=38,zr=39,Ur=42,eo=44,jr=45,lt=58,Yr=61,Vr=62,qr=63,Xr=64,to=91,no=93,Kr=96,io=123,Jr=124,oo=125,K={};K[0]="\\0";K[7]="\\a";K[8]="\\b";K[9]="\\t";K[10]="\\n";K[11]="\\v";K[12]="\\f";K[13]="\\r";K[27]="\\e";K[34]='\\"';K[92]="\\\\";K[133]="\\N";K[160]="\\_";K[8232]="\\L";K[8233]="\\P";var Zr=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"],Qr=/^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;function ea(t,e){var i,n,o,s,r,a,l;if(e===null)return{};for(i={},n=Object.keys(e),o=0,s=n.length;o<s;o+=1)r=n[o],a=String(e[r]),r.slice(0,2)==="!!"&&(r="tag:yaml.org,2002:"+r.slice(2)),l=t.compiledTypeMap.fallback[r],l&&Qi.call(l.styleAliases,a)&&(a=l.styleAliases[a]),i[r]=a;return i}function ta(t){var e,i,n;if(e=t.toString(16).toUpperCase(),t<=255)i="x",n=2;else if(t<=65535)i="u",n=4;else if(t<=4294967295)i="U",n=8;else throw new Z("code point within a string may not be greater than 0xFFFFFFFF");return"\\"+i+V.repeat("0",n-e.length)+e}var na=1,Ve=2;function ia(t){this.schema=t.schema||rn,this.indent=Math.max(1,t.indent||2),this.noArrayIndent=t.noArrayIndent||!1,this.skipInvalid=t.skipInvalid||!1,this.flowLevel=V.isNothing(t.flowLevel)?-1:t.flowLevel,this.styleMap=ea(this.schema,t.styles||null),this.sortKeys=t.sortKeys||!1,this.lineWidth=t.lineWidth||80,this.noRefs=t.noRefs||!1,this.noCompatMode=t.noCompatMode||!1,this.condenseFlow=t.condenseFlow||!1,this.quotingType=t.quotingType==='"'?Ve:na,this.forceQuotes=t.forceQuotes||!1,this.replacer=typeof t.replacer=="function"?t.replacer:null,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function Pn(t,e){for(var i=V.repeat(" ",e),n=0,o=-1,s="",r,a=t.length;n<a;)o=t.indexOf(`
`,n),o===-1?(r=t.slice(n),n=a):(r=t.slice(n,o+1),n=o+1),r.length&&r!==`
`&&(s+=i),s+=r;return s}function Ot(t,e){return`
`+V.repeat(" ",t.indent*e)}function oa(t,e){var i,n,o;for(i=0,n=t.implicitTypes.length;i<n;i+=1)if(o=t.implicitTypes[i],o.resolve(e))return!0;return!1}function dt(t){return t===Nr||t===Br}function qe(t){return 32<=t&&t<=126||161<=t&&t<=55295&&t!==8232&&t!==8233||57344<=t&&t<=65533&&t!==dn||65536<=t&&t<=1114111}function Ln(t){return qe(t)&&t!==dn&&t!==Hr&&t!==Ye}function Tn(t,e,i){var n=Ln(t),o=n&&!dt(t);return(i?n:n&&t!==eo&&t!==to&&t!==no&&t!==io&&t!==oo)&&t!==At&&!(e===lt&&!o)||Ln(e)&&!dt(e)&&t===At||e===lt&&o}function sa(t){return qe(t)&&t!==dn&&!dt(t)&&t!==jr&&t!==qr&&t!==lt&&t!==eo&&t!==to&&t!==no&&t!==io&&t!==oo&&t!==At&&t!==$r&&t!==Ur&&t!==Gr&&t!==Jr&&t!==Yr&&t!==Vr&&t!==zr&&t!==Wr&&t!==Fr&&t!==Xr&&t!==Kr}function ra(t){return!dt(t)&&t!==lt}function $e(t,e){var i=t.charCodeAt(e),n;return i>=55296&&i<=56319&&e+1<t.length&&(n=t.charCodeAt(e+1),n>=56320&&n<=57343)?(i-55296)*1024+n-56320+65536:i}function so(t){var e=/^\n* /;return e.test(t)}var ro=1,Dt=2,ao=3,lo=4,Te=5;function aa(t,e,i,n,o,s,r,a){var l,c=0,d=null,p=!1,g=!1,u=n!==-1,f=-1,y=sa($e(t,0))&&ra($e(t,t.length-1));if(e||r)for(l=0;l<t.length;c>=65536?l+=2:l++){if(c=$e(t,l),!qe(c))return Te;y=y&&Tn(c,d,a),d=c}else{for(l=0;l<t.length;c>=65536?l+=2:l++){if(c=$e(t,l),c===Ye)p=!0,u&&(g=g||l-f-1>n&&t[f+1]!==" ",f=l);else if(!qe(c))return Te;y=y&&Tn(c,d,a),d=c}g=g||u&&l-f-1>n&&t[f+1]!==" "}return!p&&!g?y&&!r&&!o(t)?ro:s===Ve?Te:Dt:i>9&&so(t)?Te:r?s===Ve?Te:Dt:g?lo:ao}function la(t,e,i,n,o){t.dump=function(){if(e.length===0)return t.quotingType===Ve?'""':"''";if(!t.noCompatMode&&(Zr.indexOf(e)!==-1||Qr.test(e)))return t.quotingType===Ve?'"'+e+'"':"'"+e+"'";var s=t.indent*Math.max(1,i),r=t.lineWidth===-1?-1:Math.max(Math.min(t.lineWidth,40),t.lineWidth-s),a=n||t.flowLevel>-1&&i>=t.flowLevel;function l(c){return oa(t,c)}switch(aa(e,a,t.indent,r,l,t.quotingType,t.forceQuotes&&!n,o)){case ro:return e;case Dt:return"'"+e.replace(/'/g,"''")+"'";case ao:return"|"+Mn(e,t.indent)+An(Pn(e,s));case lo:return">"+Mn(e,t.indent)+An(Pn(da(e,r),s));case Te:return'"'+ca(e)+'"';default:throw new Z("impossible error: invalid scalar style")}}()}function Mn(t,e){var i=so(t)?String(e):"",n=t[t.length-1]===`
`,o=n&&(t[t.length-2]===`
`||t===`
`),s=o?"+":n?"":"-";return i+s+`
`}function An(t){return t[t.length-1]===`
`?t.slice(0,-1):t}function da(t,e){for(var i=/(\n+)([^\n]*)/g,n=function(){var c=t.indexOf(`
`);return c=c!==-1?c:t.length,i.lastIndex=c,On(t.slice(0,c),e)}(),o=t[0]===`
`||t[0]===" ",s,r;r=i.exec(t);){var a=r[1],l=r[2];s=l[0]===" ",n+=a+(!o&&!s&&l!==""?`
`:"")+On(l,e),o=s}return n}function On(t,e){if(t===""||t[0]===" ")return t;for(var i=/ [^ ]/g,n,o=0,s,r=0,a=0,l="";n=i.exec(t);)a=n.index,a-o>e&&(s=r>o?r:a,l+=`
`+t.slice(o,s),o=s+1),r=a;return l+=`
`,t.length-o>e&&r>o?l+=t.slice(o,r)+`
`+t.slice(r+1):l+=t.slice(o),l.slice(1)}function ca(t){for(var e="",i=0,n,o=0;o<t.length;i>=65536?o+=2:o++)i=$e(t,o),n=K[i],!n&&qe(i)?(e+=t[o],i>=65536&&(e+=t[o+1])):e+=n||ta(i);return e}function pa(t,e,i){var n="",o=t.tag,s,r,a;for(s=0,r=i.length;s<r;s+=1)a=i[s],t.replacer&&(a=t.replacer.call(i,String(s),a)),(he(t,e,a,!1,!1)||typeof a>"u"&&he(t,e,null,!1,!1))&&(n!==""&&(n+=","+(t.condenseFlow?"":" ")),n+=t.dump);t.tag=o,t.dump="["+n+"]"}function Dn(t,e,i,n){var o="",s=t.tag,r,a,l;for(r=0,a=i.length;r<a;r+=1)l=i[r],t.replacer&&(l=t.replacer.call(i,String(r),l)),(he(t,e+1,l,!0,!0,!1,!0)||typeof l>"u"&&he(t,e+1,null,!0,!0,!1,!0))&&((!n||o!=="")&&(o+=Ot(t,e)),t.dump&&Ye===t.dump.charCodeAt(0)?o+="-":o+="- ",o+=t.dump);t.tag=s,t.dump=o||"[]"}function ua(t,e,i){var n="",o=t.tag,s=Object.keys(i),r,a,l,c,d;for(r=0,a=s.length;r<a;r+=1)d="",n!==""&&(d+=", "),t.condenseFlow&&(d+='"'),l=s[r],c=i[l],t.replacer&&(c=t.replacer.call(i,l,c)),he(t,e,l,!1,!1)&&(t.dump.length>1024&&(d+="? "),d+=t.dump+(t.condenseFlow?'"':"")+":"+(t.condenseFlow?"":" "),he(t,e,c,!1,!1)&&(d+=t.dump,n+=d));t.tag=o,t.dump="{"+n+"}"}function ha(t,e,i,n){var o="",s=t.tag,r=Object.keys(i),a,l,c,d,p,g;if(t.sortKeys===!0)r.sort();else if(typeof t.sortKeys=="function")r.sort(t.sortKeys);else if(t.sortKeys)throw new Z("sortKeys must be a boolean or a function");for(a=0,l=r.length;a<l;a+=1)g="",(!n||o!=="")&&(g+=Ot(t,e)),c=r[a],d=i[c],t.replacer&&(d=t.replacer.call(i,c,d)),he(t,e+1,c,!0,!0,!0)&&(p=t.tag!==null&&t.tag!=="?"||t.dump&&t.dump.length>1024,p&&(t.dump&&Ye===t.dump.charCodeAt(0)?g+="?":g+="? "),g+=t.dump,p&&(g+=Ot(t,e)),he(t,e+1,d,!0,p)&&(t.dump&&Ye===t.dump.charCodeAt(0)?g+=":":g+=": ",g+=t.dump,o+=g));t.tag=s,t.dump=o||"{}"}function Rn(t,e,i){var n,o,s,r,a,l;for(o=i?t.explicitTypes:t.implicitTypes,s=0,r=o.length;s<r;s+=1)if(a=o[s],(a.instanceOf||a.predicate)&&(!a.instanceOf||typeof e=="object"&&e instanceof a.instanceOf)&&(!a.predicate||a.predicate(e))){if(i?a.multi&&a.representName?t.tag=a.representName(e):t.tag=a.tag:t.tag="?",a.represent){if(l=t.styleMap[a.tag]||a.defaultStyle,Zi.call(a.represent)==="[object Function]")n=a.represent(e,l);else if(Qi.call(a.represent,l))n=a.represent[l](e,l);else throw new Z("!<"+a.tag+'> tag resolver accepts not "'+l+'" style');t.dump=n}return!0}return!1}function he(t,e,i,n,o,s,r){t.tag=null,t.dump=i,Rn(t,i,!1)||Rn(t,i,!0);var a=Zi.call(t.dump),l=n,c;n&&(n=t.flowLevel<0||t.flowLevel>e);var d=a==="[object Object]"||a==="[object Array]",p,g;if(d&&(p=t.duplicates.indexOf(i),g=p!==-1),(t.tag!==null&&t.tag!=="?"||g||t.indent!==2&&e>0)&&(o=!1),g&&t.usedDuplicates[p])t.dump="*ref_"+p;else{if(d&&g&&!t.usedDuplicates[p]&&(t.usedDuplicates[p]=!0),a==="[object Object]")n&&Object.keys(t.dump).length!==0?(ha(t,e,t.dump,o),g&&(t.dump="&ref_"+p+t.dump)):(ua(t,e,t.dump),g&&(t.dump="&ref_"+p+" "+t.dump));else if(a==="[object Array]")n&&t.dump.length!==0?(t.noArrayIndent&&!r&&e>0?Dn(t,e-1,t.dump,o):Dn(t,e,t.dump,o),g&&(t.dump="&ref_"+p+t.dump)):(pa(t,e,t.dump),g&&(t.dump="&ref_"+p+" "+t.dump));else if(a==="[object String]")t.tag!=="?"&&la(t,t.dump,e,s,l);else{if(a==="[object Undefined]")return!1;if(t.skipInvalid)return!1;throw new Z("unacceptable kind of an object to dump "+a)}t.tag!==null&&t.tag!=="?"&&(c=encodeURI(t.tag[0]==="!"?t.tag.slice(1):t.tag).replace(/!/g,"%21"),t.tag[0]==="!"?c="!"+c:c.slice(0,18)==="tag:yaml.org,2002:"?c="!!"+c.slice(18):c="!<"+c+">",t.dump=c+" "+t.dump)}return!0}function ga(t,e){var i=[],n=[],o,s;for(Rt(t,i,n),o=0,s=n.length;o<s;o+=1)e.duplicates.push(i[n[o]]);e.usedDuplicates=new Array(s)}function Rt(t,e,i){var n,o,s;if(t!==null&&typeof t=="object")if(o=e.indexOf(t),o!==-1)i.indexOf(o)===-1&&i.push(o);else if(e.push(t),Array.isArray(t))for(o=0,s=t.length;o<s;o+=1)Rt(t[o],e,i);else for(n=Object.keys(t),o=0,s=n.length;o<s;o+=1)Rt(t[n[o]],e,i)}function fa(t,e){e=e||{};var i=new ia(e);i.noRefs||ga(t,i);var n=t;return i.replacer&&(n=i.replacer.call({"":n},"",n)),he(i,0,n,!0,!0)?i.dump+`
`:""}var ma=fa,ya={dump:ma};function cn(t,e){return function(){throw new Error("Function yaml."+t+" is removed in js-yaml 4. Use yaml."+e+" instead, which is now safe by default.")}}var Oe=q,co=Ei,po=ki,uo=Ai,ho=Oi,Ue=rn,ct=Ji.load,go=Ji.loadAll,fo=ya.dump,mo=Z,yo={binary:Ni,float:Mi,map:Ci,null:Pi,pairs:Wi,set:Fi,timestamp:Bi,bool:Li,int:Ti,merge:Hi,omap:Gi,seq:Ii,str:Si},_o=cn("safeLoad","load"),vo=cn("safeLoadAll","loadAll"),bo=cn("safeDump","dump"),_a={Type:Oe,Schema:co,FAILSAFE_SCHEMA:po,JSON_SCHEMA:uo,CORE_SCHEMA:ho,DEFAULT_SCHEMA:Ue,load:ct,loadAll:go,dump:fo,YAMLException:mo,types:yo,safeLoad:_o,safeLoadAll:vo,safeDump:bo};const xo=Object.freeze(Object.defineProperty({__proto__:null,CORE_SCHEMA:ho,DEFAULT_SCHEMA:Ue,FAILSAFE_SCHEMA:po,JSON_SCHEMA:uo,Schema:co,Type:Oe,YAMLException:mo,default:_a,dump:fo,load:ct,loadAll:go,safeDump:bo,safeLoad:_o,safeLoadAll:vo,types:yo},Symbol.toStringTag,{value:"Module"}));function va(t,e){const i={orientation:"landscape",dark_mode:!1,sleep_enabled:!1,sleep_start_hour:0,sleep_end_hour:5,manual_refresh_only:!1,deep_sleep_enabled:!1,deep_sleep_interval:600,daily_refresh_enabled:!1,daily_refresh_time:"08:00",refresh_interval:600};for(const n of t){const o=n.trim();if(!o.startsWith("#"))continue;let s;if(s=o.match(/TARGET DEVICE:\s*(.*)/i),s&&(i.target_device=s[1].trim()),s=o.match(/Name:\s*(.*)/i),s&&(i.name=s[1].trim()),s=o.match(/Resolution:\s*(\d+)x(\d+)/i),s&&(i.width=parseInt(s[1],10),i.height=parseInt(s[2],10)),s=o.match(/Shape:\s*(rect|round|circle)/i),s&&(i.shape=s[1].toLowerCase()==="rect"?"rect":"round"),s=o.match(/Inverted:\s*(true|false)/i),s&&(i.inverted_colors=s[1].toLowerCase()==="true"),s=o.match(/Orientation:\s*(landscape|portrait)/i),s&&(i.orientation=s[1].toLowerCase()),s=o.match(/Dark Mode:\s*(enabled|disabled)/i),s&&(i.dark_mode=s[1].toLowerCase()==="enabled"),s=o.match(/Refresh Interval:\s*(\d+)/i),s&&(i.refresh_interval=parseInt(s[1],10)),s=o.match(/Power Strategy:\s*(.*)/i),s){const r=s[1].trim().toLowerCase();i.sleep_enabled=r.includes("night"),i.manual_refresh_only=r.includes("manual"),i.deep_sleep_enabled=r.includes("ultra")||r.includes("deep"),i.daily_refresh_enabled=r.includes("daily")}s=o.match(/Sleep Mode:\s*(enabled|disabled)/i),s&&(i.sleep_enabled=s[1].toLowerCase()==="enabled"),s=o.match(/Sleep Start Hour:\s*(\d+)/i),s&&(i.sleep_start_hour=parseInt(s[1],10)),s=o.match(/Sleep End Hour:\s*(\d+)/i),s&&(i.sleep_end_hour=parseInt(s[1],10)),s=o.match(/Manual Refresh:\s*(enabled|disabled)/i),s&&(i.manual_refresh_only=s[1].toLowerCase()==="enabled"),s=o.match(/Deep Sleep:\s*(enabled|disabled)/i),s&&(i.deep_sleep_enabled=s[1].toLowerCase()==="enabled"),s=o.match(/Deep Sleep Interval:\s*(\d+)/i),s&&(i.deep_sleep_interval=parseInt(s[1],10)),s=o.match(/Refresh Time:\s*(\d{2}:\d{2})/i),s&&(i.daily_refresh_time=s[1]),s=o.match(/Disable updates from\s*(\d+)\s*to\s*(\d+)/i),s&&(i.no_refresh_start_hour=parseInt(s[1],10),i.no_refresh_end_hour=parseInt(s[2],10))}return e&&e.esphome&&e.esphome.name&&!i.name&&(i.name=e.esphome.name),i}function Et(t,e,i){const n={},o=(s,r)=>{if(s==null||s==="")return r;if(typeof s=="number"){const l=s.toString(16).toLowerCase();return"#"+(l.length<=3?l.padStart(3,"0"):l.padStart(6,"0"))}let a=String(s).trim().toLowerCase();return a.startsWith("0x")?"#"+a.substring(2):a};if(t.startsWith("lvgl_")){Object.entries(e).forEach(([a,l])=>{["id","type","x","y","w","h","width","height"].includes(a)||(l==="true"?n[a]=!0:l==="false"?n[a]=!1:a.includes("color")||a.includes("bg_")||a.startsWith("line_color")?n[a]=o(l,l):typeof l=="string"&&l!==""&&!isNaN(l)&&!l.startsWith("0x")?n[a]=parseFloat(l):n[a]=l)}),n.hidden=e.hidden==="true",n.clickable=e.clickable!=="false",n.checkable=e.checkable==="true",n.scrollable=e.scrollable!=="false",n.floating=e.floating==="true",n.ignore_layout=e.ignore_layout==="true",n.scrollbar_mode=e.scrollbar_mode||"AUTO",n.opa=parseInt(e.opa||255,10);const s=e.grid_cell_row_pos??e.grid_row,r=e.grid_cell_column_pos??e.grid_col;n.grid_cell_row_pos=s!=null?parseInt(s,10):null,n.grid_cell_column_pos=r!=null?parseInt(r,10):null,n.grid_cell_row_span=parseInt(e.grid_cell_row_span||e.grid_row_span||1,10),n.grid_cell_column_span=parseInt(e.grid_cell_column_span||e.grid_col_span||1,10),n.grid_cell_x_align=e.grid_cell_x_align||e.grid_x_align||"STRETCH",n.grid_cell_y_align=e.grid_cell_y_align||e.grid_y_align||"STRETCH"}if(t==="icon")return{code:e.code||"F07D0",size:parseInt(e.size||48,10),color:e.color||"theme_auto",bg_color:e.bg_color||"transparent",fit_icon_to_frame:e.fit_icon_to_frame!=="false"};if(t==="text"||t==="label")return{text:e.text||"",font_size:parseInt(e.font_size||e.size||20,10),font_family:e.font_family||e.font||"Roboto",font_weight:parseInt(e.font_weight||e.weight||400,10),italic:e.italic==="true"||e.italic===!0,bpp:parseInt(e.bpp||1,10),color:e.color||"theme_auto",text_align:e.align||e.text_align||"TOP_LEFT"};if(t==="sensor_text")return e.entity_2&&(i.entity_id_2=e.entity_2),{label_font_size:parseInt(e.label_font||e.label_font_size||14,10),value_font_size:parseInt(e.value_font||e.value_font_size||20,10),value_format:e.format||"label_value",color:e.color||"theme_auto",italic:e.italic==="true"||e.italic===!0||e.font_style==="italic",font_family:e.font_family||"Roboto",font_weight:parseInt(e.font_weight||400,10),prefix:e.prefix||"",postfix:e.postfix||"",unit:e.unit||"",hide_unit:e.hide_unit==="true"||e.hide_unit===!0,precision:parseInt(e.precision||2,10),text_align:e.align||e.text_align||"TOP_LEFT",label_align:e.label_align||e.align||e.text_align||"TOP_LEFT",value_align:e.value_align||e.align||e.text_align||"TOP_LEFT",is_local_sensor:e.is_local_sensor==="true"||e.local==="true",is_text_sensor:e.is_text_sensor==="true"||e.text_sensor==="true",separator:e.separator||" ~ "};if(t==="datetime")return i.width=parseInt(e.w||200,10),i.height=parseInt(e.h||60,10),{format:e.format||"time_date",time_font_size:parseInt(e.time_font_size||e.time_size||e.time_font||28,10),date_font_size:parseInt(e.date_font_size||e.date_size||e.date_font||16,10),color:e.color||"black",italic:e.italic==="true"||e.italic===!0||e.font_style==="italic",font_family:e.font_family||"Roboto",text_align:e.align||e.text_align||"CENTER",bg_color:e.bg_color||"transparent",border_width:parseInt(e.border_width||0,10),border_color:e.border_color||"theme_auto",border_radius:parseInt(e.border_radius||0,10)};if(t==="progress_bar")return{show_label:e.show_label!=="false",show_percentage:e.show_percentage!=="false"&&e.show_pct!=="false",bar_height:parseInt(e.bar_height||e.bar_h||15,10),border_width:parseInt(e.border_width||e.border_w||e.border||1,10),color:e.color||"theme_auto",bg_color:e.bg_color||"white",is_local_sensor:e.is_local_sensor==="true"||e.local==="true"};if(t==="battery_icon")return{size:parseInt(e.size||36,10),font_size:parseInt(e.font_size||14,10),color:e.color||"theme_auto",is_local_sensor:e.is_local_sensor!=="false",fit_icon_to_frame:e.fit_icon_to_frame!=="false"};if(t==="wifi_signal")return{size:parseInt(e.size||24,10),font_size:parseInt(e.font_size||12,10),color:e.color||"theme_auto",is_local_sensor:e.is_local_sensor!=="false",show_dbm:e.show_dbm!=="false",fit_icon_to_frame:e.fit_icon_to_frame==="true"};if(t==="ondevice_temperature")return{size:parseInt(e.size||32,10),font_size:parseInt(e.font_size||16,10),label_font_size:parseInt(e.label_font_size||10,10),color:e.color||"black",unit:e.unit||"°C",precision:parseInt(e.precision||1,10),show_label:e.show_label!=="false",is_local_sensor:e.is_local_sensor!=="false"&&e.local!=="false",fit_icon_to_frame:e.fit_icon_to_frame!=="false"&&e.fit!=="false"};if(t==="ondevice_humidity")return{size:parseInt(e.size||32,10),font_size:parseInt(e.font_size||16,10),label_font_size:parseInt(e.label_font_size||10,10),color:e.color||"black",unit:e.unit||"%",precision:parseInt(e.precision||0,10),show_label:e.show_label!=="false",is_local_sensor:e.is_local_sensor!=="false"&&e.local!=="false",fit_icon_to_frame:e.fit_icon_to_frame!=="false"&&e.fit!=="false"};if(t==="weather_icon")return{size:parseInt(e.size||48,10),color:e.color||"theme_auto"};if(t==="qr_code")return{value:e.value||"https://github.com/koosoli/ESPHomeDesigner/",scale:parseInt(e.scale||2,10),ecc:e.ecc||"LOW",color:e.color||"theme_auto"};if(t==="image")return{path:(e.path||"/config/esphome/images/logo.png").replace(/^"|"$/g,""),invert:e.invert==="true"||e.invert==="1",dither:e.dither||"FLOYDSTEINBERG",transparency:e.transparency||"",image_type:e.img_type||"BINARY",render_mode:e.render_mode||"Auto"};if(t==="online_image")return{url:e.url||"",invert:e.invert==="true"||e.invert==="1",interval_s:parseInt(e.interval||300,10),render_mode:e.render_mode||"Auto"};if(t==="puppet")return{image_url:e.url||"",invert:e.invert==="true"||e.invert==="1",image_type:e.img_type||"RGB565",transparency:e.transparency||"opaque",render_mode:e.render_mode||"Auto"};if(t==="shape_rect")return{fill:e.fill==="true"||e.fill==="1",border_width:parseInt(e.border_width||e.border||1,10),color:e.color||"theme_auto",border_color:e.border_color||e.color||"theme_auto",opacity:parseInt(e.opacity||100,10)};if(t==="touch_area")return{title:e.title||"",color:e.color||"rgba(0, 0, 255, 0.15)",border_color:e.border_color||"#0000ff",icon:e.icon||"",icon_pressed:e.icon_pressed||"",icon_size:parseInt(e.icon_size||40,10),icon_color:e.icon_color||"theme_auto",nav_action:e.nav_action||"none"};if(t==="rounded_rect")return{fill:e.fill==="true"||e.fill==="1",show_border:e.show_border!=="false"&&e.show_border!=="0",border_width:parseInt(e.border_width||e.border||4,10),radius:parseInt(e.radius||10,10),color:e.color||"theme_auto",border_color:e.border_color||"theme_auto",opacity:parseInt(e.opacity||100,10)};if(t==="shape_circle")return{fill:e.fill==="true"||e.fill==="1",border_width:parseInt(e.border_width||e.border||1,10),color:e.color||"theme_auto",border_color:e.border_color||e.color||"theme_auto",opacity:parseInt(e.opacity||100,10)};if(t==="line")return{stroke_width:parseInt(e.stroke_width||e.stroke||3,10),color:e.color||"theme_auto",orientation:e.orientation||"horizontal"};if(t==="graph")return e.entity&&(i.entity_id=e.entity),{duration:e.duration||"1h",border:e.border==="true"||e.border==="1"||e.border==null,grid:e.grid==="true"||e.grid==="1"||e.grid==null,color:e.color||"theme_auto",background_color:e.background_color||"transparent",x_grid:e.x_grid||"",y_grid:e.y_grid||"",line_thickness:parseInt(e.line_thickness||3,10),line_type:e.line_type||"SOLID",continuous:e.continuous!=="false"&&e.continuous!=="0",min_value:e.min_value||"",max_value:e.max_value||"",min_range:e.min_range||"",max_range:e.max_range||"",is_local_sensor:e.is_local_sensor==="true"||e.local==="true"};if(t==="quote_rss")return{feed_url:e.feed_url||"https://www.brainyquote.com/link/quotebr.rss",show_author:e.show_author!=="false",random:e.random!=="false",refresh_interval:e.refresh_interval||e.refresh||"1h",quote_font_size:parseInt(e.quote_font_size||e.quote_font||18,10),author_font_size:parseInt(e.author_font_size||e.author_font||14,10),font_family:e.font_family||e.font||"Roboto",font_weight:parseInt(e.font_weight||e.weight||400,10),color:e.color||"theme_auto",text_align:e.align||e.text_align||"TOP_LEFT",word_wrap:e.word_wrap!=="false"&&e.wrap!=="false",italic_quote:e.italic_quote!=="false"};if(t==="weather_forecast")return{weather_entity:e.weather_entity||"",forecast_mode:e.forecast_mode||"daily",hourly_slots:e.hourly_slots||"06,09,12,15,18,21",start_offset:parseInt(e.start_offset||0,10),layout:e.layout||"horizontal",show_high_low:e.show_high_low!=="false",day_font_size:parseInt(e.day_font_size||12,10),temp_font_size:parseInt(e.temp_font_size||14,10),icon_size:parseInt(e.icon_size||32,10),font_family:e.font_family||"Roboto",color:e.color||"theme_auto"};if(t==="template_sensor_bar")return{show_wifi:e.show_wifi!=="false"&&e.wifi!=="false",show_temperature:e.show_temperature!=="false"&&e.temp!=="false",show_humidity:e.show_humidity!=="false"&&e.hum!=="false",show_battery:e.show_battery!=="false"&&e.bat!=="false",show_background:e.show_background!=="false"&&e.bg!=="false",background_color:e.background_color||e.bg_color||"black",border_radius:parseInt(e.border_radius||e.radius||8,10),icon_size:parseInt(e.icon_size||20,10),font_size:parseInt(e.font_size||14,10),color:e.color||"white"};if(t==="template_nav_bar")return{show_prev:e.show_prev!=="false"&&e.prev!=="false",show_home:e.show_home!=="false"&&e.home!=="false",show_next:e.show_next!=="false"&&e.next!=="false",show_background:e.show_background!=="false"&&e.bg!=="false",background_color:e.background_color||e.bg_color||"black",border_radius:parseInt(e.border_radius||e.radius||8,10),icon_size:parseInt(e.icon_size||24,10),color:e.color||"white"};if(t==="lvgl_button"){e.title&&(i.title=e.title);const s=o(e.text_color||e.color,"theme_auto");return delete n.color,delete n.text_color,{...n,text:e.text||"Button",bg_color:o(e.bg_color,"theme_auto_inverse"),text_color:s,font_size:parseInt(e.font_size||14,10),border_width:parseInt(e.border_width||e.border||2,10),radius:parseInt(e.radius||5,10),checkable:e.checkable==="true"}}else{if(t==="lvgl_arc")return e.title&&(i.title=e.title,n.title=e.title),{...n,min:parseInt(e.min||0,10),max:parseInt(e.max||100,10),value:parseInt(e.value||50,10),thickness:parseInt(e.thickness||10,10),color:e.color||"blue",start_angle:parseInt(e.start_angle||135,10),end_angle:parseInt(e.end_angle||45,10),mode:e.mode||"normal"};if(t==="lvgl_chart")return e.title&&(i.title=e.title),{...n,title:e.title||"Chart",type:e.type&&e.type!=="lvgl_chart"?e.type.toLowerCase():"line",color:e.color||"blue",bg_color:e.bg_color||"transparent",point_count:parseInt(e.point_count||10,10),x_div_lines:parseInt(e.x_div_lines||3,10),y_div_lines:parseInt(e.y_div_lines||3,10)};if(t==="lvgl_img")return{...n,src:e.src||"symbol_image",rotation:parseInt(e.rotation||0,10),scale:parseInt(e.scale||256,10),pivot_x:parseInt(e.pivot_x||0,10),pivot_y:parseInt(e.pivot_y||0,10),color:e.color||"black"};if(t==="lvgl_qrcode")return{...n,text:e.text||"https://github.com/koosoli/ESPHomeDesigner/",scale:parseInt(e.scale||4,10),color:e.color||"black",bg_color:e.bg_color||"white"};if(t==="lvgl_bar")return{...n,min:parseInt(e.min||0,10),max:parseInt(e.max||100,10),value:parseInt(e.value||50,10),color:e.color||"blue",bg_color:e.bg_color||"gray",start_value:parseInt(e.start_value||0,10),mode:e.mode||"normal"};if(t==="lvgl_slider")return{...n,min:parseInt(e.min||0,10),max:parseInt(e.max||100,10),value:parseInt(e.value||30,10),border_width:parseInt(e.border_width||2,10),color:e.color||"blue",bg_color:e.bg_color||"gray",mode:e.mode||"normal",vertical:e.vertical==="true"||e.vertical===!0};if(t==="lvgl_tabview")return{...n,bg_color:e.bg_color||"white",tabs:(e.tabs||"Page 1, Page 2, Page 3").split(",").map(s=>s.trim()).filter(s=>s)};if(t==="lvgl_tileview")return{...n,bg_color:e.bg_color||"white",tiles:[{row:0,column:0,widgets:[]}]};if(t==="lvgl_led")return{...n,color:e.color||"red",brightness:parseInt(e.brightness||255,10)};if(t==="lvgl_spinner")return{...n,time:parseInt(e.time||e.spin_time||1e3,10),arc_length:parseInt(e.arc_length||60,10),arc_color:e.arc_color||"blue",track_color:e.track_color||"white"};if(t==="lvgl_checkbox")return{...n,text:(e.text||"Checkbox").replace(/^"|"$/g,""),checked:e.checked==="true"||e.checked===!0,color:e.color||"blue"};if(t==="lvgl_dropdown")return{...n,options:(e.options||`Option 1
Option 2
Option 3`).replace(/\\n/g,`
`),selected_index:parseInt(e.selected_index||0,10),color:e.color||"black",direction:e.direction||"DOWN",max_height:parseInt(e.max_height||200,10)};if(t==="lvgl_keyboard")return{...n,mode:e.mode||"TEXT_LOWER",textarea_id:e.textarea||""};if(t==="lvgl_roller")return{...n,options:(e.options||`Option A
Option B
Option C`).replace(/\\n/g,`
`),visible_row_count:parseInt(e.visible_row_count||3,10),color:e.color||"black",bg_color:e.bg_color||"white",selected_bg_color:e.selected_bg_color||"blue",selected_text_color:e.selected_text_color||"white",selected_index:parseInt(e.selected_index||0,10),mode:e.mode||"normal"};if(t==="lvgl_spinbox")return{...n,min:parseInt(e.range_from||e.min||0,10),max:parseInt(e.range_to||e.max||100,10),digit_count:parseInt(e.digits||e.digit_count||4,10),step:parseInt(e.step||1,10),value:parseInt(e.value||0,10)};if(t==="lvgl_buttonmatrix"){const s=o(e.bg_color,"#444"),r=o(e.text_color||e.color,"white");return delete n.text_color,delete n.bg_color,delete n.color,{...n,bg_color:s,text_color:r,opa:parseInt(e.opa||255,10)}}else{if(t==="lvgl_switch")return{...n,checked:e.state==="true"||e.state===!0||e.checked==="true",bg_color:e.bg_color||"gray",color:e.color||"blue",knob_color:e.knob_color||"white"};if(t==="lvgl_textarea")return{...n,placeholder_text:(e.placeholder_text||e.placeholder||"").replace(/^"|"$/g,""),text:(e.text||"").replace(/^"|"$/g,""),one_line:e.one_line==="true"||e.one_line===!0,max_length:parseInt(e.max_length||128,10),password_mode:e.password_mode==="true",accepted_chars:e.accepted_chars||""};if(t==="lvgl_label"){const s=o(e.text_color||e.color,"theme_auto"),r=o(e.bg_color,"transparent"),a=o(e.border_color,"theme_auto");return delete n.text_color,delete n.bg_color,delete n.border_color,delete n.color,{...n,text:(e.text||"Label").replace(/^"|"$/g,""),font_size:parseInt(e.font_size||e.size||20,10),font_family:e.font_family||"Roboto",font_weight:parseInt(e.font_weight||400,10),italic:e.italic==="true"||e.italic===!0,text_color:s,border_color:a,bg_color:r,text_align:e.text_align||e.align||"CENTER"}}else if(t==="lvgl_line"){const s=o(e.line_color||e.color,"theme_auto");return delete n.color,delete n.line_color,{...n,orientation:e.orientation||"horizontal",points:e.points||"",line_width:parseInt(e.line_width||3,10),line_color:s,opa:parseInt(e.opa||255,10),line_rounded:e.line_rounded!=="false"}}else{if(t==="lvgl_meter")return{...n,min:parseInt(e.min||0,10),max:parseInt(e.max||100,10),value:parseInt(e.value||0,10),color:e.color||"black",indicator_color:e.indicator_color||"red",tick_count:parseInt(e.tick_count||11,10),tick_length:parseInt(e.tick_length||10,10),label_gap:parseInt(e.label_gap||10,10),indicator_width:parseInt(e.indicator_width||4,10)};if(t==="lvgl_obj"){const s=o(e.bg_color||e.color,"white"),r=o(e.border_color,"gray");return delete n.color,delete n.bg_color,delete n.border_color,{...n,bg_color:s,border_width:parseInt(e.border_width||1,10),border_color:r,radius:parseInt(e.radius||0,10),fill:e.fill!=="false",opacity:parseInt(e.opacity||e.opa||255,10)}}else if(t==="calendar")return{entity_id:e.entity||"sensor.esp_calendar_data",border_width:parseInt(e.border_width||0,10),show_border:e.show_border!=="false",border_color:e.border_color||"theme_auto",background_color:e.background_color||"transparent",text_color:e.text_color||"theme_auto",font_size_date:parseInt(e.font_size_date||100,10),font_size_day:parseInt(e.font_size_day||24,10),font_size_grid:parseInt(e.font_size_grid||14,10),font_size_event:parseInt(e.font_size_event||18,10)}}}}if(t.startsWith("lvgl_")){v.log("[YAML_IMPORT] Parsing generic LVGL",t,e.id,e);const s=["hidden","clickable","checkable","scrollable","floating","ignore_layout","scrollbar_mode","opa","grid_cell_row_pos","grid_cell_column_pos","grid_cell_row_span","grid_cell_column_span","grid_cell_x_align","grid_cell_y_align"];return Object.entries(e).forEach(([r,a])=>{if(r==="id"||r==="type"||r==="x"||r==="y"||r==="w"||r==="h"||s.includes(r))return;if(r==="title"){i.title=a;return}let l=a;if(Array.isArray(a))r==="options"?l=a.join(`
`):r==="points"&&(l=a.map(c=>Array.isArray(c)?c.join(","):String(c)).join(" "));else if(typeof a=="string"&&(/^-?\d+(\.\d+)?(ms|deg|px|%)$/.test(a)&&(l=a.replace(/(ms|deg|px|%)$/,"")),l.includes("\\u")))try{l=JSON.parse(`"${l}"`)}catch{}l==="true"?n[r]=!0:l==="false"?n[r]=!1:typeof l=="string"&&l!==""&&!isNaN(l)&&!l.startsWith("0x")&&r!=="text"&&r!=="id"?n[r]=parseFloat(l):n[r]=l}),n}return n}function ba(t,e){let i;if(i=t.match(/^it\.rectangle\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*COLOR_OFF)?\s*\)\s*;?/),i)return{id:"w_rect_"+e,type:"shape_rect",x:parseInt(i[1],10),y:parseInt(i[2],10),width:parseInt(i[3],10),height:parseInt(i[4],10),title:"",entity_id:"",props:{fill:!1,border_width:1,color:"black",opacity:100}};if(i=t.match(/^it\.filled_rectangle\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*COLOR_OFF)?\s*\)\s*;?/),i)return{id:"w_frect_"+e,type:"shape_rect",x:parseInt(i[1],10),y:parseInt(i[2],10),width:parseInt(i[3],10),height:parseInt(i[4],10),title:"",entity_id:"",props:{fill:!0,border_width:1,color:"black",opacity:100}};if(i=t.match(/^it\.circle\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*COLOR_OFF)?\s*\)\s*;?/),i){const n=parseInt(i[3],10);return{id:"w_circle_"+e,type:"shape_circle",x:parseInt(i[1],10)-n,y:parseInt(i[2],10)-n,width:n*2,height:n*2,title:"",entity_id:"",props:{fill:!1,border_width:1,color:"black",opacity:100}}}if(i=t.match(/^it\.filled_circle\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*COLOR_OFF)?\s*\)\s*;?/),i){const n=parseInt(i[3],10);return{id:"w_fcircle_"+e,type:"shape_circle",x:parseInt(i[1],10)-n,y:parseInt(i[2],10)-n,width:n*2,height:n*2,title:"",entity_id:"",props:{fill:!0,border_width:1,color:"black",opacity:100}}}if(i=t.match(/^it\.line\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*;?/),i){const n=parseInt(i[1],10),o=parseInt(i[2],10),s=parseInt(i[3],10),r=parseInt(i[4],10);return{id:"w_line_"+e,type:"line",x:n,y:o,width:s-n,height:r-o,title:"",entity_id:"",props:{stroke_width:1,color:"black",orientation:Math.abs(r-o)>Math.abs(s-n)?"vertical":"horizontal"}}}return null}function xa(t,e,i,n,o){const s=new Map,r=new Map,a=new Map,l=new Map,c=new Map,d=new Map,p=new Map,g=new Map,u=new Map,f=new Map,y=(k,L,O)=>{const R=[];let B=L;for(;B<k.length;){const W=k[B];if(!W){B++;continue}const z=W.trim();if(!z||z.startsWith("#")){R.push(W),B++;continue}const J=W.match(/^(\s*)/);if((J?J[1].length:0)<O)break;R.push(W),B++}try{const W=R.join(`
`);return{value:o.load(W,{schema:n()}),nextJ:B}}catch(W){return v.error("Error parsing YAML sub-block:",W),{value:null,nextJ:B}}};let m=null,_=!1;const b=["label","button","arc","bar","slider","chart","dropdown","roller","spinbox","switch","textarea","obj","img","qrcode","led","spinner","line","meter","tabview","tileview","checkbox","keyboard","buttonmatrix","list","icon"],S={label:"lvgl_label",button:"lvgl_button",arc:"lvgl_arc",bar:"lvgl_bar",slider:"lvgl_slider",chart:"lvgl_chart",dropdown:"lvgl_dropdown",roller:"lvgl_roller",spinbox:"lvgl_spinbox",switch:"lvgl_switch",textarea:"lvgl_textarea",obj:"lvgl_obj",img:"lvgl_img",qrcode:"lvgl_qrcode",led:"lvgl_led",spinner:"lvgl_spinner",line:"lvgl_line",meter:"lvgl_meter",tabview:"lvgl_tabview",tileview:"lvgl_tileview",checkbox:"lvgl_checkbox",keyboard:"lvgl_keyboard",buttonmatrix:"lvgl_buttonmatrix",icon:"icon"};for(let k=0;k<t.length;k++){const L=t[k],O=L.trim();if(!O)continue;let R=L.match(/if\s*\(\s*(?:id\s*\(\s*display_page\s*\)|page|currentPage)\s*==\s*(\d+)\s*\)/);R&&(m=parseInt(R[1],10),_=!1,s.has(m)||s.set(m,[]));const B=L.match(/^\s*-\s*id:\s*(\w+)/);if(B){const G=B[1],fe=G.match(/^page_(\d+)$/);let j=fe?parseInt(fe[1],10):s.size;s.has(j)||(s.set(j,[]),a.set(j,G)),m=j,_=!1}const W=L.match(/^\s*layout:\s*(\d+x\d+)/);if(W&&m!==null&&f.set(m,W[1]),O.startsWith("widgets:")){_=!0;continue}const z=L.match(/case\s+(\d+):\s*interval\s*=\s*(\d+);/);if(z){const G=parseInt(z[1],10);r.set(G,parseInt(z[2],10)),s.has(G)||s.set(G,[])}const J=L.match(/\/\/\s*page:name\s+"(.+)"/);J&&m!==null&&a.set(m,J[1]);const ge=L.match(/\/\/\s*page:dark_mode\s+"(.+)"/);ge&&m!==null&&l.set(m,ge[1]);const te=L.match(/\/\/\s*page:refresh_type\s+"(.+)"/);te&&m!==null&&c.set(m,te[1]);const U=L.match(/\/\/\s*page:refresh_time\s+"(.*)"/);U&&m!==null&&d.set(m,U[1]);const re=L.match(/\/\/\s*page:visible_from\s+"(.*)"/);re&&m!==null&&p.set(m,re[1]);const ie=L.match(/\/\/\s*page:visible_to\s+"(.*)"/);if(ie&&m!==null&&g.set(m,ie[1]),!_){const G=L.match(/^\s*bg_color:\s*(.*)/);if(G&&m!==null){let j=G[1].trim().replace(/^["']|["']$/g,"");j.startsWith("0x")&&(j="#"+j.substring(2)),u.has(m)||u.set(m,{}),u.get(m).bg_color=j}const fe=L.match(/^\s*bg_opa:\s*(.*)/);if(fe&&m!==null){let j=fe[1].trim().replace(/^["']|["']$/g,"");j.endsWith("%")&&(j=String(Math.round(parseFloat(j)*2.55))),u.has(m)||u.set(m,{}),u.get(m).bg_opa=parseInt(j,10)}}}s.size===0&&s.set(0,[]);const x={settings:i,pages:Array.from(s.entries()).sort((k,L)=>k[0]-L[0]).map(([k,L])=>({id:`page_${k}`,name:a.has(k)?a.get(k):`Page ${k+1}`,refresh_s:r.has(k)?r.get(k):null,refresh_type:c.has(k)?c.get(k):"interval",refresh_time:d.has(k)?d.get(k):"",visible_from:p.has(k)?p.get(k):"",visible_to:g.has(k)?g.get(k):"",dark_mode:l.has(k)?l.get(k):"inherit",layout:f.has(k)?f.get(k):null,bg_color:u.has(k)?u.get(k).bg_color:null,bg_opa:u.has(k)?u.get(k).bg_opa:null,widgets:[]}))};m=0;const E=()=>{const k=x.pages.find((L,O)=>O===m);return k?k.widgets:x.pages[0].widgets},w=k=>{const L=k.match(/^(?:#\s*|\/\/\s*)widget:(\w+)\s+(.+)$/);if(!L)return null;const O=L[1],R=L[2],B={},W=/(\w+):(?:"([^"]*)"|([^:]*?)(?=\s+\w+:|$))/g;let z;for(;(z=W.exec(R))!==null;){let J=z[2]!==void 0?z[2]:z[3];J&&(J=J.trim()),B[z[1]]=J}return{widgetType:O,props:B}};let C=!1;for(let k=0;k<t.length;k++){const L=t[k],O=L.trim();if(!O||O.startsWith("#")&&!O.match(/^#\s*widget:/))continue;let R=O.match(/if\s*\(\s*(?:id\s*\(\s*display_page\s*\)|page|currentPage)\s*==\s*(\d+)\s*\)/);if(R){m=parseInt(R[1],10);continue}const B=O.match(/^-\s*id:\s*(\w+)/);if(B){const te=B[1],U=te.match(/^page_(\d+)$/);m=U?parseInt(U[1],10):Array.from(a.entries()).find(([re,ie])=>ie===te)?.[0]||0;continue}const W=E();if(C)if(O.match(/^(?:#\s*|\/\/\s*)widget:/)||O.match(/^\s*-\s*id:/)||!L.match(/^\s/))C=!1;else continue;if(O.startsWith("//")||O.startsWith("#")){const te=w(O);if(te&&te.props.id){const U=te.props,re=te.widgetType||U.type;if(!re)continue;const ie={id:U.id,type:re,x:parseInt(U.x||0,10),y:parseInt(U.y||0,10),width:parseInt(U.w||100,10),height:parseInt(U.h||30,10),title:U.title||"",entity_id:U.entity||U.ent||"",props:{}};ie.props=Et(re,U,ie),W.push(ie),C=!0;continue}continue}const z=ba(O,W.length);if(z){W.push(z);continue}const J=new RegExp(`^(\\s*)-?\\s*(${b.join("|")}):\\s*(.*)$`),ge=L.match(J);if(ge){const te=ge[1].length,U=ge[2],re=ge[3].trim(),ie=S[U]||`lvgl_${U}`,G={};re&&(G._inline=re.replace(/^["']|["']$/g,""));const fe=y(t,k+1,te+2);Object.assign(G,fe.value),k=fe.nextJ-1;const j={id:G.id||`lv_${U}_${W.length}`,type:ie,x:parseInt(G.x||0,10),y:parseInt(G.y||0,10),width:parseInt(G.width||G.w||100,10),height:parseInt(G.height||G.h||30,10),title:G.title||G.name||"",entity_id:G.entity_id||G.entity||G.sensor||"",props:{}};j.props=Et(ie,G,j),W.push(j),Array.isArray(G.widgets)&&G.widgets.forEach(_n=>{const Ge=Object.keys(_n)[0],de=_n[Ge];if(Ge&&de){const vn=S[Ge]||`lvgl_${Ge}`,vt={id:de.id||`lv_${Ge}_${W.length}`,type:vn,x:j.x+parseInt(de.x||0,10),y:j.y+parseInt(de.y||0,10),width:parseInt(de.width||de.w||50,10),height:parseInt(de.height||de.h||20,10),props:{}};vt.props=Et(vn,de,vt),W.push(vt)}})}}return x}function wa(t,e){const i=[];let n=!1,o=0,s=null;for(const r of t){const a=r.replace(/\t/g,"    "),l=a.trim();if(!n){if(a.match(/^\s*lambda:\s*\|-/)){n=!0,s="lambda",o=0;continue}else if(a.match(/^\s*lvgl:\s*$/)){n=!0,s="lvgl",o=0;continue}else if(a.match(/^\s*"?(?:open_epaper_link\.drawcustom|payload)"?:\s*(?:\[|\|-)?/)){n=!0,s="oepl",o=0;continue}else if(a.match(/^\s*service:\s*opendisplay\.drawcustom/)){n=!0,s="odp_service",o=0;continue}else if(a.match(/^\s*"actions":\s*\[/)){n=!0,s="odp",o=0;continue}}if(n){const c=a.match(/^(\s*)/),d=c?c[1].length:0;if(l===""){i.push("");continue}if(o===0&&l!==""&&!l.startsWith("#")&&!l.startsWith("//")&&(o=d),l.startsWith("#")||l.startsWith("//")){i.push(a);continue}if(o!==0&&d<o&&l!==""&&(a.match(/^\w+:/)||a.match(/^\s*}/)||d<o)){n=!1;continue}s==="lambda"?i.push(a.slice(o)):i.push(a)}}return v.log(`[extractLambdaLines] Collected ${i.length} lines from ${s} block`),i}const Ea=["text","rectangle","circle","icon","qrcode","progress_bar","debug_grid","line","multiline","plot","dlimg","image","rectangle_pattern","polygon","ellipse","arc","icon_sequence"];function Sa(t){if(!t.trim().startsWith("-"))return!1;const i=/^\s*(?:-\s*)?type:\s*["']?([\w_]+)["']?/m,n=t.match(i);if(n){const o=n[1].toLowerCase();if(Ea.includes(o))return!0}return!1}function Ia(t){if(!t||typeof t!="string"||!t.includes("{{"))return null;const e=t.match(/^(.*?){{\s*states\(['"]([^'"]+)['"]\)\s*}}(.*)$/s);return e?{prefix:e[1],entity_id:e[2].trim(),postfix:e[3]}:null}function Bn(t){v.log("[parseOEPLArrayToLayout] Parsing OEPL array with",t.length,"items");const e={settings:{orientation:"landscape",dark_mode:!1},pages:[{id:"page_0",name:"Main",widgets:[]}]},i=e.pages[0].widgets;return t.forEach((n,o)=>{if(!n||!n.type)return;const s=n.type.toLowerCase();let r={id:n.id||`oepl_${s}_${o}`,type:s,x:parseInt(n.x??0,10),y:parseInt(n.y??0,10),width:100,height:30,entity_id:"",props:{}};switch(s){case"text":{const a=n.value||n.text||"",l=Ia(a),c=parseInt(n.size||20,10);l?(r.type="sensor_text",r.entity_id=l.entity_id,r.width=c*8,r.height=c*1.5,r.props={value_font_size:c,font_family:n.font?n.font.replace(".ttf",""):"Roboto",color:n.fill||n.color||"black",prefix:l.prefix,postfix:l.postfix,value_format:"value_only",hide_unit:!0}):(r.width=c*6,r.height=c*1.5,r.props={text:a,font_size:c,font_family:n.font?n.font.replace(".ttf",""):"Roboto",color:n.fill||n.color||"black"});break}case"multiline":{const a=n.delimiter||"|",l=(n.value||"").split(a),c=parseInt(n.size||16,10),d=parseInt(n.offset_y||c+4,10);r.type="odp_multiline",r.width=c*10,r.height=d*(l.length||1),r.props={text:n.value||"",delimiter:a,font_size:c,font_family:n.font?n.font.replace(".ttf",""):"Roboto",color:n.fill||n.color||"black",line_spacing:Math.max(0,d-c)};break}case"rectangle":r.type="shape_rect",r.x=parseInt(n.x_start||n.x||0,10),r.y=parseInt(n.y_start||n.y||0,10),r.width=Math.abs(parseInt(n.x_end||100,10)-r.x),r.height=Math.abs(parseInt(n.y_end||50,10)-r.y),r.props={fill:n.fill?n.fill!=="white"&&n.fill!=="#ffffff":!1,border_width:parseInt(n.width||1,10),color:n.fill||"white",border_color:n.outline||"black",opacity:100};break;case"circle":{r.type="shape_circle";const a=parseInt(n.radius||25,10);r.x=parseInt(n.x||0,10)-a,r.y=parseInt(n.y||0,10)-a,r.width=a*2,r.height=a*2,r.props={fill:n.fill?n.fill!=="white"&&n.fill!=="#ffffff":!1,border_width:parseInt(n.width||1,10),color:n.fill||"black",border_color:n.outline||n.fill||"black",opacity:100};break}case"icon":{const a=parseInt(n.size||24,10);r.width=a,r.height=a,r.props={code:n.value||"mdi:home",size:a,color:n.fill||n.color||"black",fit_icon_to_frame:!0};break}case"qrcode":{const a=parseInt(n.boxsize||2,10),c=(25+parseInt(n.border||1,10)*2)*a;r.type="qr_code",r.width=c,r.height=c,r.props={value:n.data||n.value||"https://esphome.io",scale:a,ecc:"LOW",color:n.color||"black"};break}case"progress_bar":r.x=parseInt(n.x_start||n.x||0,10),r.y=parseInt(n.y_start||n.y||0,10),r.width=Math.abs(parseInt(n.x_end||100,10)-r.x),r.height=Math.abs(parseInt(n.y_end||20,10)-r.y),r.props={show_label:!1,show_percentage:n.show_percentage===!0||n.show_percentage==="true",bar_height:r.height,border_width:parseInt(n.width||1,10),color:n.fill||"black",progress_value:parseInt(n.progress||0,10),direction:n.direction||"right"};break;case"line":{r.x=parseInt(n.x_start||n.x||0,10),r.y=parseInt(n.y_start||n.y||0,10);const a=parseInt(n.x_end||100,10),l=parseInt(n.y_end||r.y,10);r.width=Math.abs(a-r.x)||1,r.height=Math.abs(l-r.y)||1,r.props={stroke_width:parseInt(n.width||1,10),color:n.fill||n.color||"black",orientation:Math.abs(l-r.y)>Math.abs(a-r.x)?"vertical":"horizontal"};break}case"debug_grid":r.type="odp_debug_grid",r.x=0,r.y=0,r.width=800,r.height=480,r.props={spacing:parseInt(n.spacing||20,10),line_color:n.line_color||"black",dashed:n.dashed!==!1,dash_length:parseInt(n.dash_length||2,10),space_length:parseInt(n.space_length||4,10),show_labels:n.show_labels!==!1,label_step:parseInt(n.label_step||40,10),label_color:n.label_color||"black",label_font_size:parseInt(n.label_font_size||12,10)};break;case"dlimg":case"image":r.type="online_image",r.width=parseInt(n.xsize||n.width||100,10),r.height=parseInt(n.ysize||n.height||100,10),r.props={url:n.url||"",invert:!1,interval_s:300,rotation:parseInt(n.rotate||0,10)};break;case"plot":r.type="odp_plot",r.x=parseInt(n.x_start||n.x||0,10),r.y=parseInt(n.y_start||n.y||0,10),r.width=Math.abs(parseInt(n.x_end||200,10)-r.x),r.height=Math.abs(parseInt(n.y_end||100,10)-r.y),r.props={duration:n.duration||86400,data:Array.isArray(n.data)?n.data:n.data?[n.data]:[],background:n.background||"white",outline:n.outline||"#ccc",ylegend:n.ylegend||null};break;case"rectangle_pattern":r.type="odp_rectangle_pattern",r.x=parseInt(n.x_start||n.x||0,10),r.y=parseInt(n.y_start||n.y||0,10),r.width=Math.abs(parseInt(n.x_end||120,10)-r.x)||120,r.height=Math.abs(parseInt(n.y_end||80,10)-r.y)||80,r.props={x_size:parseInt(n.x_size||30,10),y_size:parseInt(n.y_size||15,10),x_offset:parseInt(n.x_offset||5,10),y_offset:parseInt(n.y_offset||5,10),x_repeat:parseInt(n.x_repeat||3,10),y_repeat:parseInt(n.y_repeat||2,10),fill:n.fill||"white",outline:n.outline||"black",border_width:parseInt(n.width||1,10)};break;case"polygon":if(r.type="odp_polygon",Array.isArray(n.points)&&n.points.length>0){const a=n.points.map(p=>p[0]),l=n.points.map(p=>p[1]),c=Math.min(...a),d=Math.min(...l);r.x=c,r.y=d,r.width=Math.max(...a)-c||100,r.height=Math.max(...l)-d||100,r.props={points:n.points.map(([p,g])=>[p-c,g-d]),fill:n.fill||"red",outline:n.outline||"black",border_width:parseInt(n.width||1,10)}}break;case"ellipse":r.type="odp_ellipse",r.x=parseInt(n.x_start||n.x||0,10),r.y=parseInt(n.y_start||n.y||0,10),r.width=Math.abs(parseInt(n.x_end||150,10)-r.x)||150,r.height=Math.abs(parseInt(n.y_end||80,10)-r.y)||80,r.props={fill:n.fill||null,outline:n.outline||"black",border_width:parseInt(n.width||1,10)};break;case"arc":{const a=parseInt(n.radius||50,10);r.type="odp_arc",r.x=parseInt(n.x||0,10)-a,r.y=parseInt(n.y||0,10)-a,r.width=a*2,r.height=a*2,r.props={radius:a,start_angle:parseInt(n.start_angle||0,10),end_angle:parseInt(n.end_angle||90,10),outline:n.outline||"black",border_width:parseInt(n.width||2,10)};break}case"icon_sequence":{const a=parseInt(n.size||24,10),l=parseInt(n.spacing||6,10),c=n.icons||["mdi:home","mdi:arrow-right","mdi:office-building"],d=n.direction==="down";r.type="odp_icon_sequence",r.width=d?a:c.length*(a+l)-l,r.height=d?c.length*(a+l)-l:a,r.props={icons:c,size:a,direction:n.direction||"right",spacing:l,fill:n.fill||"black"};break}default:v.warn(`[parseOEPLArrayToLayout] Unknown OEPL type: ${s}`);return}i.push(r)}),e}function Hn(){if(!xo||!Oe||!Ue)return null;try{const t=new Oe("!lambda",{kind:"scalar",construct:n=>n}),e=new Oe("!secret",{kind:"scalar",construct:n=>n}),i=new Oe("!include",{kind:"scalar",construct:n=>n});return Ue.extend([t,e,i])}catch{return v.warn("[getESPHomeSchema] Could not extend schema, falling back to default."),Ue}}function Nn(t){v.log("[parseSnippetYamlOffline] Start parsing...");const e=t.split(/\r?\n/);let i={};try{const r=Hn();i=ct(t,r?{schema:r}:{})||{}}catch(r){v.error("[parseSnippetYamlOffline] YAML parse error:",r)}if(Sa(t)&&Array.isArray(i))return v.log("[parseSnippetYamlOffline] Detected bare OEPL/ODP array format"),Bn(i);if(i&&i.service&&["opendisplay.drawcustom","open_epaper_link.drawcustom"].includes(i.service)&&i.data&&i.data.payload){let r=i.data.payload;if(typeof r=="string")try{r=ct(r)}catch(a){v.error("[parseSnippetYamlOffline] Failed to re-parse payload string:",a)}if(Array.isArray(r))return v.log("[parseSnippetYamlOffline] Detected full ODP/OEPL service call"),Bn(r)}const n=[];if(i.display&&(Array.isArray(i.display)?i.display:[i.display]).forEach(a=>{a&&a.lambda&&n.push(...a.lambda.split(`
`))}),n.length===0||t.includes("lvgl:")){const r=wa(e);n.push(...r)}const o=va(e,i);return xa(n,e,o,Hn,xo)}function we(t){if(!t)return;v.log("[loadLayoutIntoState] Loading layout...");let e=t;if(t.data&&t.data.devices){const i=Object.keys(t.data.devices)[0];e=t.data.devices[i]}if(e){if(e.name?h.setDeviceName(e.name):e.deviceName&&h.setDeviceName(e.deviceName),e.device_model?h.setDeviceModel(e.device_model):e.deviceModel&&h.setDeviceModel(e.deviceModel),e.device_id?h.setCurrentLayoutId(e.device_id):e.currentLayoutId&&h.setCurrentLayoutId(e.currentLayoutId),e.settings&&h.updateSettings&&h.updateSettings(e.settings),e.customHardware&&h.setCustomHardware&&h.setCustomHardware(e.customHardware),e.pages&&h.setPages){const i=e.pages.map(n=>({...n,widgets:(n.widgets||[]).map(o=>({...o,locked:!!o.locked}))}));h.setPages(i)}v.log("[loadLayoutIntoState] Finished loading state.")}}let me=[],St=!1,Ca=!1,Ke=!1;function se(){const t={"Content-Type":"application/json"},e=mt();return e&&e.trim()!==""&&e!=="null"&&(t.Authorization=`Bearer ${e}`),t}const Bt="entity-datalist-global";let Ee=null;function wo(){return Ee||(Ee=document.getElementById(Bt),Ee||(Ee=document.createElement("datalist"),Ee.id=Bt,document.body.appendChild(Ee))),Ee}function ka(t){const e=wo();e.innerHTML="",!(!t||t.length===0)&&(t.forEach(i=>{const n=document.createElement("option");n.value=i.entity_id,n.label=i.name||i.entity_id,e.appendChild(n)}),v.log(`[EntityDatalist] Updated with ${t.length} entities`))}async function Ce(){if(!N())return[];if(St)return me;St=!0;try{const t=new AbortController,e=setTimeout(()=>t.abort(),1e4),i=$.includes("api/esphome_designer")&&!window.location.pathname.includes("esphome-designer");let n,o=!1;const s=mt();n=`${$}/entities?domains=sensor,binary_sensor,weather,light,switch,fan,cover,climate,media_player,input_number,number,input_boolean,input_text,input_select,button,input_button,calendar,person,device_tracker,sun,update,scene`,v.log("[EntityStates] Fetching from:",n);let r;try{r=await fetch(n,{headers:se(),signal:t.signal})}catch(l){if(s&&$)n=`${$.replace("/api/esphome_designer","")}/api/states`,v.log("[EntityStates] Custom endpoint failed, trying native HA API:",n),o=!0,r=await fetch(n,{headers:se(),signal:t.signal});else throw l}if(clearTimeout(e),!r.ok)return v.warn("[EntityStates] Failed to fetch:",r.status),Ke=!0,[];let a=await r.json();if(o&&Array.isArray(a)){const l=["sensor","binary_sensor","weather","light","switch","fan","cover","climate","media_player","input_number","number","input_boolean","input_text","input_select","button","input_button","calendar","person","device_tracker","sun","update","scene"];a=a.filter(c=>{const d=c.entity_id?.split(".")[0];return l.includes(d)}).map(c=>({entity_id:c.entity_id,name:c.attributes?.friendly_name||c.entity_id,state:c.state,unit:c.attributes?.unit_of_measurement,attributes:c.attributes||{}}))}return Array.isArray(a)?(v.log(`[EntityStates] Received ${a.length} entities`),me=a.map(l=>{const c=l.unit?`${l.state} ${l.unit}`:l.state;return{entity_id:l.entity_id,name:l.name||l.entity_id,state:l.state,unit:l.unit,attributes:l.attributes||{},formatted:c}}),Ca=!0,Ke=!1,v.log(`[EntityStates] Cached ${me.length} entity states`),h&&(h.entityStates={},me.forEach(l=>{h.entityStates[l.entity_id]=l}),v.log(`[EntityStates] Populated AppState.entityStates with ${Object.keys(h.entityStates).length} entries`)),ka(me),P(I.ENTITIES_LOADED,me),me):(v.warn("[EntityStates] Invalid response format"),Ke=!0,[])}catch(t){return t.name==="AbortError"?v.warn("[EntityStates] Request timed out after 10 seconds"):v.warn("[EntityStates] Error fetching:",t),Ke=!0,[]}finally{St=!1}}function vd(t){const e=me.find(i=>i.entity_id===t);return e?e.attributes:null}let Gn=!1;async function bd(t,e="24h"){if(!N()||!t)return[];try{const i=`${$}/history/${encodeURIComponent(t)}?duration=${encodeURIComponent(e)}`,n=await fetch(i,{headers:se()});if(!n.ok){const s=await n.text().catch(()=>"Unknown error");return Gn||(v.log(`[EntityHistory] History fetch failed for ${t}: ${s}`),Gn=!0),[]}const o=await n.json();return Array.isArray(o)?o:[]}catch{return[]}}async function Pa(){if(!N()){v.warn("Cannot load layout from backend: No HA backend detected.");return}try{let t=null;try{const n=await fetch(`${$}/layouts`,{headers:se()});if(n.ok){const o=await n.json();v.log("[loadLayoutFromBackend] Available layouts:",o.layouts?.map(s=>s.id)),v.log(`[loadLayoutFromBackend] Last active layout ID from backend: ${o.last_active_layout_id}`),o.last_active_layout_id&&(o.layouts?.some(r=>r.id===o.last_active_layout_id)?(t=o.last_active_layout_id,v.log(`[loadLayoutFromBackend] Loading last active layout: ${t}`)):v.warn(`[loadLayoutFromBackend] Last active layout '${o.last_active_layout_id}' no longer exists`)),!t&&o.layouts&&o.layouts.length>0&&(t=o.layouts[0].id,v.log(`[loadLayoutFromBackend] No valid last active, using first layout: ${t}`))}}catch(n){v.warn("[loadLayoutFromBackend] Could not fetch layouts list:",n)}let e;if(t?e=await fetch(`${$}/layouts/${t}`,{headers:se()}):e=await fetch(`${$}/layout`,{headers:se()}),!e.ok)throw new Error(`Failed to load layout: ${e.status}`);const i=await e.json();!i.device_id&&t&&(i.device_id=t),v.log(`[loadLayoutFromBackend] Loaded layout '${i.device_id||t||"default"}':`,{name:i.name,device_model:i.device_model,pages:i.pages?.length,widgets:i.pages?.reduce((n,o)=>n+(o.widgets?.length||0),0),renderingMode:i.renderingMode||i.rendering_mode}),h&&(i.device_id||t)&&h.setCurrentLayoutId(i.device_id||t),typeof we=="function"?we(i):v.error("[loadLayoutFromBackend] loadLayoutIntoState function missing!"),P(I.LAYOUT_IMPORTED,i)}catch(t){v.error("Error loading layout from backend:",t),T(()=>Promise.resolve().then(()=>Eo),void 0,import.meta.url).then(e=>e.showToast("Error loading layout from backend",5e3,"error"))}}let It=!1,Ct=!1;async function pe(){if(!N())return!1;if(It)return Ct=!0,v.log("[saveLayoutToBackend] Save already in progress, queuing..."),!1;if(!h)throw new Error("AppState not available");const t=h.currentLayoutId||"reterminal_e1001",e=h.settings.device_model||h.deviceModel||"reterminal_e1001",n={...h.getPagesPayload(),device_id:t,name:h.deviceName||"Layout 1",device_model:e,deviceName:h.deviceName||"Layout 1"};It=!0,Ct=!1;try{v.log(`[saveLayoutToBackend] Saving to layout '${t}':`,{device_model:e,pages:n.pages?.length,widgets:n.pages?.reduce((a,l)=>a+(l.widgets?.length||0),0),renderingMode:n.renderingMode});const o=new AbortController,s=setTimeout(()=>o.abort(),1e4),r=await fetch(`${$}/layouts/${t}`,{method:"POST",headers:se(),body:JSON.stringify(n),signal:o.signal});if(clearTimeout(s),!r.ok){const a=await r.json().catch(()=>({}));throw new Error(a.message||a.error||`Save failed: ${r.status}`)}return v.log(`[saveLayoutToBackend] Layout '${t}' saved successfully`),!0}catch(o){if(o.name==="AbortError")return!0;if(o.message?.includes("Failed to fetch")||o.message?.includes("NetworkError")||o.message?.includes("net::ERR_")||o.message?.includes("ERR_EMPTY_RESPONSE")||o.message?.includes("Load failed"))return!1;throw v.error("Failed to save layout to backend:",o),o}finally{It=!1,Ct&&setTimeout(()=>{pe().catch(()=>{})},500)}}async function La(t){if(!N())throw new Error("No backend");const e=await fetch(`${$}/import_snippet`,{method:"POST",headers:se(),body:JSON.stringify({yaml:t})});if(!e.ok){const i=await e.json().catch(()=>({}));throw new Error(i.message||i.error||`Import failed with status ${e.status}`)}return await e.json()}function Ta(t){const e=document.getElementById("importSnippetError");e&&(e.textContent=t||"")}function A(t,e="info",i=3e3){let n=document.getElementById("toast-container");n||(n=document.createElement("div"),n.id="toast-container",n.style.position="fixed",n.style.bottom="20px",n.style.right="20px",n.style.zIndex="9999",document.body.appendChild(n));const o=document.createElement("div");o.className="toast",e==="error"?o.style.background="rgba(255, 0, 0, 0.8)":e==="success"?o.style.background="rgba(0, 128, 0, 0.8)":o.style.background="rgba(0,0,0,0.8)",o.textContent=t,o.style.color="white",o.style.padding="10px 20px",o.style.borderRadius="4px",o.style.marginTop="10px",o.style.opacity="0",o.style.transition="opacity 0.3s",n.appendChild(o),requestAnimationFrame(()=>{o.style.opacity="1"}),setTimeout(()=>{o.style.opacity="0",setTimeout(()=>{o.remove()},300)},i)}const Eo=Object.freeze(Object.defineProperty({__proto__:null,setImportError:Ta,showToast:A},Symbol.toStringTag,{value:"Module"}));async function Ma(){if(N())try{const i=`${$}/hardware/templates`;v.log("[HardwareDiscovery] Fetching from:",i);const n=await fetch(i,{headers:se(),cache:"no-store"});if(!n.ok)throw new Error(`HTTP ${n.status}`);return(await n.json()).templates||[]}catch(i){v.error("Failed to fetch dynamic hardware templates from HA:",i)}v.log("[HardwareDiscovery] Attempting to load bundled profiles via glob...");const t=[],e=Object.assign({"../../hardware/elecrow-esp32-7inch.yaml":Zo,"../../hardware/guition-esp32-jc4827w543.yaml":Qo,"../../hardware/guition-esp32-jc8048w535.yaml":es,"../../hardware/guition-esp32-jc8048w550.yaml":ts,"../../hardware/guition-esp32-s3-4848s040.yaml":ns,"../../hardware/lilygo-tdisplays3.yaml":is,"../../hardware/seeedstudio-sensecap-indicator.yaml":os,"../../hardware/sunton-esp32-2432s028.yaml":ss,"../../hardware/sunton-esp32-2432s028R.yaml":rs,"../../hardware/sunton-esp32-4827s032R.yaml":as,"../../hardware/sunton-esp32-8048s050.yaml":ls,"../../hardware/sunton-esp32-8048s070.yaml":ds,"../../hardware/waveshare-esp32-s3-touch-lcd-4.3.yaml":cs,"../../hardware/waveshare-esp32-s3-touch-lcd-7.yaml":ps,"../../hardware/waveshare-esp32-universal-epaper-7.5v2.yaml":us});for(const i in e)try{const n=e[i],o=i.split("/").pop(),s=Io(n,o);s.id=o.replace(/\.yaml$/i,"").replace(/[^a-z0-9]/gi,"_").toLowerCase(),s.isPackageBased=!0,s.hardwarePackage=`hardware/${o}`,t.push(s)}catch(n){v.warn(`[HardwareDiscovery] Failed to parse bundled file ${i}:`,n)}return v.log(`[HardwareDiscovery] Loaded ${t.length} bundled fallback profiles.`),t}async function So(t){if(!N())return v.log("[HardwareImport] Offline mode detected. Parsing locally..."),await Aa(t);try{const e=await t.text(),i=`${$}/hardware/upload`,n={filename:t.name,content:e};v.log("[HardwareImport] Uploading via JSON:",t.name);const o=await fetch(i,{method:"POST",headers:se(),body:JSON.stringify(n)});if(!o.ok){const a=await o.json().catch(()=>({}));throw new Error(a.message||a.error||`Upload failed: ${o.status}`)}const s=await o.json();A("Hardware template uploaded successfully!","success");const{loadExternalProfiles:r}=await T(async()=>{const{loadExternalProfiles:a}=await Promise.resolve().then(()=>Ht);return{loadExternalProfiles:a}},void 0,import.meta.url);return r&&await r(),s}catch(e){const i=e.message||"";if(i.includes("Failed to fetch")||i.includes("NetworkError")){v.warn("[HardwareImport] Network error during upload (likely benign):",i),A("Generating profile, refreshing list...","info");try{const{loadExternalProfiles:n}=await T(async()=>{const{loadExternalProfiles:o}=await Promise.resolve().then(()=>Ht);return{loadExternalProfiles:o}},void 0,import.meta.url);n&&await n()}catch(n){v.warn("[HardwareImport] Profile refresh also failed:",n)}return{success:!0,filename:t.name,note:"network_error_suppressed"}}else throw v.error("Hardware upload failed:",e),A(`Upload failed: ${i}`,"error"),e}}async function Aa(t){return new Promise((e,i)=>{const n=new FileReader;n.onload=async o=>{const s=o.target.result;try{if(!s.includes("__LAMBDA_PLACEHOLDER__"))throw new Error("Invalid template: Missing __LAMBDA_PLACEHOLDER__");const r=Io(s,t.name);v.log("[HardwareImport] Parsed offline profile:",r);const{DEVICE_PROFILES:a}=await T(async()=>{const{DEVICE_PROFILES:l}=await Promise.resolve().then(()=>Ht);return{DEVICE_PROFILES:l}},void 0,import.meta.url);a&&(a[r.id]=r),A(`Imported ${r.name} (Offline Mode)`,"success"),window.app&&window.app.deviceSettings&&window.app.deviceSettings.populateDeviceSelect(),Oa(r),e(r)}catch(r){A(r.message,"error"),i(r)}},n.onerror=()=>i(new Error("File read failed")),n.readAsText(t)})}function Io(t,e){const i="dynamic_offline_"+e.replace(/[^a-z0-9]/gi,"_").toLowerCase();let n=e.replace(/\.yaml$/i,""),o=800,s=480,r="rect";const a=t.match(/#\s*Name:\s*(.*)/i);a&&(n=a[1].trim());const l=t.match(/#\s*Resolution:\s*(\d+)x(\d+)/i);l&&(o=parseInt(l[1]),s=parseInt(l[2]));const c=t.match(/#\s*Shape:\s*(rect|round)/i);c&&(r=c[1].toLowerCase());const p=!!t.match(/#\s*Inverted:\s*(true|yes|1)/i),g=t.match(/^\s*-\s*platform:\s*([a-z0-9_]+)/m)||t.match(/^\s*platform:\s*([a-z0-9_]+)/m),u=g?g[1].trim():void 0,f=t.match(/^\s*model:\s*"?([^"\n]+)"?/m),y=f?f[1].trim():void 0;let m="esp32-s3",_;const b=t.match(/^\s*esp8266:/m);b?m="esp8266":t.match(/^\s*esp32:/m)&&(t.toLowerCase().includes("esp32-s3")?m="esp32-s3":t.toLowerCase().includes("esp32-c3")?m="esp32-c3":t.toLowerCase().includes("esp32-c6")?m="esp32-c6":m="esp32");const S=t.match(/^\s*board:\s*([^\n]+)/m);S&&(_=S[1].trim(),b||(_.toLowerCase().includes("s3")?m="esp32-s3":_.toLowerCase().includes("c3")?m="esp32-c3":_.toLowerCase().includes("c6")&&(m="esp32-c6")));const x=t.match(/#\s*Chip:\s*(.*)/i);x&&(m=x[1].trim());const E=t.match(/#\s*Board:\s*(.*)/i);E&&(_=E[1].trim());const w=t.match(/^\s*color_palette:\s*(\S+)/m),C=w?w[1].trim():void 0,k=t.match(/^\s*color_order:\s*(\S+)/m),L=k?k[1].trim():void 0,O=t.match(/^\s*update_interval:\s*(\S+)/m),R=O?O[1].trim():void 0,B=t.match(/^\s*invert_colors:\s*(true|false)/mi),W=B?B[1].toLowerCase()==="true":void 0;return{id:i,name:n,resolution:{width:o,height:s},shape:r,chip:m,board:_,displayPlatform:u,displayModel:y,colorPalette:C,colorOrder:L,updateInterval:R,invertColors:W,isPackageBased:!0,isOfflineImport:!0,content:t,features:{psram:t.includes("psram:"),lcd:!t.includes("waveshare_epaper")&&!t.includes("epaper_spi"),lvgl:t.includes("lvgl:")||!t.includes("waveshare_epaper")&&!t.includes("epaper_spi"),epaper:t.includes("waveshare_epaper")||t.includes("epaper_spi"),touch:t.includes("touchscreen:"),inverted_colors:p}}}function Oa(t){try{const e=JSON.parse(localStorage.getItem("esphome-offline-profiles")||"{}");e[t.id]=t,localStorage.setItem("esphome-offline-profiles",JSON.stringify(e)),v.log("[HardwarePersistence] Saved offline profile to localStorage:",t.id)}catch(e){v.error("Failed to save profile to localStorage:",e)}}function Da(){try{return JSON.parse(localStorage.getItem("esphome-offline-profiles")||"{}")}catch(t){return v.warn("Could not load offline profiles from storage:",t),{}}}const D={reterminal_e1001:{name:"Seeedstudio reTerminal E1001 (Monochrome)",displayType:"binary",chip:"esp32-s3",board:"esp32-s3-devkitc-1",displayModel:"7.50inv2p",displayPlatform:"waveshare_epaper",resolution:{width:800,height:480},shape:"rect",psram_mode:"octal",pins:{display:{cs:"GPIO10",dc:"GPIO11",reset:{number:"GPIO12",inverted:!1},busy:{number:"GPIO13",inverted:!0}},i2c:{sda:"GPIO19",scl:"GPIO20"},spi:{clk:"GPIO7",mosi:"GPIO9"},batteryEnable:"GPIO21",batteryAdc:"GPIO1",buzzer:"GPIO45",buttons:{left:"GPIO5",right:"GPIO4",refresh:"GPIO3",home:"GPIO2"}},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.27,max:4.15}},features:{psram:!0,buzzer:!0,buttons:!0,sht4x:!0,epaper:!0,inverted_colors:!0}},reterminal_e1002:{name:"Seeedstudio reTerminal E1002 (6-Color)",displayType:"color",displayModel:"Seeed-reTerminal-E1002",displayPlatform:"epaper_spi",resolution:{width:800,height:480},shape:"rect",psram_mode:"octal",pins:{display:{cs:null,dc:null,reset:null,busy:null},i2c:{sda:"GPIO19",scl:"GPIO20"},spi:{clk:"GPIO7",mosi:"GPIO9"},batteryEnable:"GPIO21",batteryAdc:"GPIO1",buzzer:"GPIO45",buttons:{left:"GPIO5",right:"GPIO4",refresh:"GPIO3",home:"GPIO2"}},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.27,max:4.15}},features:{psram:!0,buzzer:!0,buttons:!0,sht4x:!0,epaper:!0}},trmnl_diy_esp32s3:{name:"Seeed Studio Trmnl DIY Kit (ESP32-S3)",displayType:"binary",displayModel:"7.50inv2p",displayPlatform:"waveshare_epaper",resolution:{width:800,height:480},shape:"rect",psram_mode:"octal",pins:{display:{cs:"GPIO44",dc:"GPIO10",reset:"GPIO38",busy:{number:"GPIO4",inverted:!0}},i2c:{sda:"GPIO17",scl:"GPIO18"},spi:{clk:"GPIO7",mosi:"GPIO9"},batteryEnable:"GPIO6",batteryAdc:"GPIO1",buzzer:null,buttons:{left:"GPIO2",refresh:"GPIO5"}},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.27,max:4.15},curve:[{from:4.15,to:100},{from:3.96,to:90},{from:3.91,to:80},{from:3.85,to:70},{from:3.8,to:60},{from:3.75,to:50},{from:3.68,to:40},{from:3.58,to:30},{from:3.49,to:20},{from:3.41,to:10},{from:3.3,to:5},{from:3.27,to:0}]},features:{psram:!0,buzzer:!1,buttons:!0,sht4x:!1,epaper:!0,inverted_colors:!0}},trmnl:{name:"TRMNL (ESP32-C3)",displayType:"binary",displayModel:"7.50inv2",displayPlatform:"waveshare_epaper",resolution:{width:800,height:480},shape:"rect",pins:{display:{cs:"GPIO6",dc:"GPIO5",reset:{number:"GPIO10",inverted:!1},busy:{number:"GPIO4",inverted:!0}},i2c:{sda:"GPIO1",scl:"GPIO2"},spi:{clk:"GPIO7",mosi:"GPIO8"},batteryEnable:null,batteryAdc:"GPIO0",buzzer:null,buttons:null},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.3,max:4.15}},features:{psram:!1,buzzer:!1,buttons:!1,sht4x:!1,epaper:!0,inverted_colors:!0},chip:"esp32-c3",board:"esp32-c3-devkitm-1"},seeed_xiao_epaper_75:{name:'Seeed Xiao ESP32C3 - 7.5" E-Paper',displayType:"binary",chip:"esp32-c3",board:"seeed_xiao_esp32c3",displayModel:"7.50inv2p",displayPlatform:"waveshare_epaper",resolution:{width:800,height:480},shape:"rect",pins:{display:{cs:"GPIO3",dc:"GPIO5",reset:"GPIO2",busy:{number:"GPIO4",inverted:!0}},spi:{clk:"GPIO8",mosi:"GPIO10"}},features:{psram:!1,buzzer:!1,buttons:!1,epaper:!0,inverted_colors:!0}},esp32_s3_photopainter:{id:"esp32_s3_photopainter",name:"Waveshare PhotoPainter (6-Color)",displayType:"color",displayModel:"7.30in-f",displayPlatform:"waveshare_epaper",resolution:{width:800,height:480},shape:"rect",psram_mode:"octal",pins:{display:{cs:"GPIO9",dc:"GPIO8",reset:"GPIO12",busy:{number:"GPIO13",inverted:!0}},i2c:{sda:"GPIO47",scl:"GPIO48"},spi:{clk:"GPIO10",mosi:"GPIO11"},batteryEnable:null,batteryAdc:null,buzzer:null,buttons:{left:"GPIO0",right:"GPIO4",refresh:null}},battery:{attenuation:"0db",multiplier:1,calibration:{min:3.3,max:4.2}},features:{psram:!0,buzzer:!1,buttons:!0,sht4x:!1,axp2101:!0,manual_pmic:!0,shtc3:!0,epaper:!0},i2c_config:{scan:!1,frequency:"10kHz"}},waveshare_esp32_s3_touch_lcd_7:{name:'Waveshare Touch LCD 7 7.0" 800x480',displayType:"color",isPackageBased:!0,hardwarePackage:"hardware/waveshare-esp32-s3-touch-lcd-7.yaml",resolution:{width:800,height:480},features:{psram:!0,buzzer:!1,buttons:!1,lcd:!0,lvgl:!0,touch:!0},touch:{platform:"gt911",transformed:!0,transform:{swap_xy:!0}}},waveshare_esp32_s3_touch_lcd_4_3:{name:'Waveshare Touch LCD 4.3 4.3" 800x480',displayType:"color",isPackageBased:!0,hardwarePackage:"hardware/waveshare-esp32-s3-touch-lcd-4.3.yaml",resolution:{width:800,height:480},features:{psram:!0,buzzer:!1,buttons:!1,lcd:!0,touch:!0},touch:{platform:"gt911",transformed:!0,transform:{swap_xy:!0}}},m5stack_coreink:{name:"M5Stack M5Core Ink (200x200)",displayType:"binary",displayModel:"1.54inv2",displayPlatform:"waveshare_epaper",resolution:{width:200,height:200},shape:"rect",features:{psram:!1,buzzer:!0,buttons:!0,lcd:!1,epaper:!0,inverted_colors:!0},chip:"esp32",board:"m5stack-coreink",pins:{display:{cs:"GPIO9",dc:"GPIO15",reset:"GPIO0",busy:null},i2c:{sda:"GPIO21",scl:"GPIO22"},spi:{clk:"GPIO18",mosi:"GPIO23"},batteryEnable:{number:"GPIO12",ignore_strapping_warning:!0},batteryAdc:"GPIO35",buzzer:"GPIO2",buttons:{left:{number:"GPIO39",mode:"INPUT"},right:{number:"GPIO37",mode:"INPUT"},refresh:{number:"GPIO38",mode:"INPUT"}}},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.27,max:4.15}},i2c_config:{scan:!0}},m5stack_paper:{name:"M5Paper (540x960)",displayType:"grayscale",displayModel:"M5Paper",displayPlatform:"it8951e",resolution:{width:960,height:540},shape:"rect",chip:"esp32",board:"m5stack-paper",features:{psram:!0,buzzer:!1,buttons:!0,lcd:!1,epaper:!0,touch:!0,inverted_colors:!0,sht3xd:!0},pins:{display:{cs:"GPIO15",dc:null,reset:"GPIO23",busy:"GPIO27"},i2c:{sda:"GPIO21",scl:"GPIO22"},spi:{clk:"GPIO14",mosi:"GPIO12",miso:"GPIO13"},batteryEnable:null,batteryAdc:"GPIO35",buzzer:null,buttons:{left:{number:"GPIO39",mode:"INPUT"},right:{number:"GPIO37",mode:"INPUT"},refresh:{number:"GPIO38",mode:"INPUT"}}},m5paper:{battery_power_pin:"GPIO5",main_power_pin:"GPIO2"},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.27,max:4.15}},rotation_offset:180,touch:{platform:"gt911",i2c_id:"bus_a",address:93,interrupt_pin:"GPIO36",update_interval:"never",transform:{mirror_x:!1,mirror_y:!1,swap_xy:!0},calibration:{x_min:0,x_max:960,y_min:0,y_max:540}},external_components:["  - source: github://Passific/m5paper_esphome"]}},pt=Object.keys(D);async function ut(){try{const t=await Ma();v.log(`[Devices] Loaded ${t.length} hardware profiles from backend/bundle.`),t.forEach(n=>{if(D[n.id]){const o=D[n.id];D[n.id]={...o,...n,features:{...o.features||{},...n.features||{}}}}else D[n.id]=n});const e=Da(),i=Object.keys(e);i.length>0&&(v.log(`[Devices] Restoring ${i.length} offline profiles from localStorage.`),Object.entries(e).forEach(([n,o])=>{D[n]=o})),window.app&&window.app.deviceSettings&&typeof window.app.deviceSettings.populateDeviceSelect=="function"&&window.app.deviceSettings.populateDeviceSelect()}catch(t){v.error("Failed to load external hardware profiles:",t)}}const Ht=Object.freeze(Object.defineProperty({__proto__:null,DEVICE_PROFILES:D,SUPPORTED_DEVICE_IDS:pt,loadExternalProfiles:ut},Symbol.toStringTag,{value:"Module"}));function ke(){return"w_"+Date.now().toString(36)+Math.random().toString(36).substr(2,5)}typeof crypto<"u"&&!crypto.randomUUID?crypto.randomUUID=function(){return("10000000-1000-4000-8000"+-1e11).replace(/[018]/g,t=>(t^crypto.getRandomValues(new Uint8Array(1))[0]&15>>t/4).toString(16))}:typeof crypto>"u"&&(window.crypto={randomUUID:()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,t=>{const e=Math.random()*16|0;return(t==="x"?e:e&3|8).toString(16)}),getRandomValues:t=>t.map(()=>Math.floor(Math.random()*256))});function Ra(t,e){let i;return function(...o){const s=()=>{clearTimeout(i),t(...o)};clearTimeout(i),i=setTimeout(s,e)}}function ht(t){return JSON.parse(JSON.stringify(t))}const Ba=(t,e)=>{if(!t||!e)return;const i=e.replace(/\[(\w+)\]/g,".$1").replace(/^\./,"").split(".");let n=t;for(const o of i){if(n==null)return;n=n[o]}return n};window.generateId=ke;window.debounce=Ra;window.deepClone=ht;window.getNestedValue=Ba;class Ha{constructor(){this.state={pages:[],currentPageIndex:0,deviceName:"Layout 1",deviceModel:"reterminal_e1001",currentLayoutId:"reterminal_e1001",customHardware:{},protocolHardware:{width:400,height:300,colorMode:"bw"},widgetsById:new Map},this.reset()}reset(){this.state.pages=[{id:"page_0",name:"Overview",layout:null,widgets:[]}],this.state.currentPageIndex=0,this.rebuildWidgetsIndex()}get pages(){return this.state.pages}get currentPageIndex(){return this.state.currentPageIndex}get deviceName(){return this.state.deviceName}get deviceModel(){return this.state.deviceModel}get currentLayoutId(){return this.state.currentLayoutId}get protocolHardware(){return this.state.protocolHardware}get customHardware(){return this.state.customHardware}getCurrentPage(){return this.state.pages[this.state.currentPageIndex]||this.state.pages[0]}getWidgetById(e){return this.state.widgetsById.get(e)}rebuildWidgetsIndex(){this.state.widgetsById.clear();for(const e of this.state.pages)for(const i of e.widgets)this.state.widgetsById.set(i.id,i)}setPages(e){this.state.pages=e,this.rebuildWidgetsIndex(),P(I.STATE_CHANGED)}setCurrentPageIndex(e,i={}){e>=0&&e<this.state.pages.length&&(this.state.currentPageIndex=e,P(I.PAGE_CHANGED,{index:e,...i}))}reorderPage(e,i){if(e<0||e>=this.state.pages.length||i<0||i>=this.state.pages.length)return;const[n]=this.state.pages.splice(e,1);this.state.pages.splice(i,0,n),this.state.currentPageIndex===e?this.state.currentPageIndex=i:e<this.state.currentPageIndex&&i>=this.state.currentPageIndex?this.state.currentPageIndex--:e>this.state.currentPageIndex&&i<=this.state.currentPageIndex&&this.state.currentPageIndex++,P(I.STATE_CHANGED),P(I.PAGE_CHANGED,{index:this.state.currentPageIndex,forceFocus:!0})}addPage(e=null){const i=this.state.pages.length;let n=0;this.state.pages.forEach(a=>{const l=a.name.match(/^Page (\d+)$/);if(l){const c=parseInt(l[1],10);c>n&&(n=c)}});const o=n+1,s={id:`page_${Date.now()}_${i}`,name:`Page ${o}`,widgets:[]},r=e!==null?e:this.state.pages.length;return this.state.pages.splice(r,0,s),e!==null&&e<=this.state.currentPageIndex?this.state.currentPageIndex++:e===null&&(this.state.currentPageIndex=this.state.pages.length-1),this.rebuildWidgetsIndex(),P(I.STATE_CHANGED),P(I.PAGE_CHANGED,{index:this.state.currentPageIndex,forceFocus:!0}),s}deletePage(e){e<0||e>=this.state.pages.length||(this.state.pages.splice(e,1),this.state.currentPageIndex>=this.state.pages.length&&(this.state.currentPageIndex=Math.max(0,this.state.pages.length-1)),this.rebuildWidgetsIndex(),P(I.STATE_CHANGED),P(I.PAGE_CHANGED,{index:this.state.currentPageIndex,forceFocus:!0}))}duplicatePage(e){if(e<0||e>=this.state.pages.length)return null;const i=this.state.pages[e],n=ht(i);n.id=`page_${Date.now()}_${this.state.pages.length}`,n.name=`${i.name} (Copy)`;const o=new Map;n.widgets.forEach(r=>{const a=r.id,l=ke();r.id=l,o.set(a,l)}),n.widgets.forEach(r=>{r.parentId&&o.has(r.parentId)&&(r.parentId=o.get(r.parentId))});const s=e+1;return this.state.pages.splice(s,0,n),this.state.currentPageIndex=s,this.rebuildWidgetsIndex(),P(I.STATE_CHANGED),P(I.PAGE_CHANGED,{index:this.state.currentPageIndex,forceFocus:!0}),n}renamePage(e,i){e<0||e>=this.state.pages.length||!i||i.trim()===""||(this.state.pages[e].name=i.trim(),P(I.STATE_CHANGED))}addWidget(e,i=null){const n=i!==null?i:this.state.currentPageIndex;(this.state.pages[n]||this.getCurrentPage()).widgets.push(e),this.state.widgetsById.set(e.id,e),P(I.STATE_CHANGED)}updateWidget(e,i){const n=this.getWidgetById(e);n&&(Object.assign(n,i),P(I.STATE_CHANGED))}deleteWidgets(e){const i=this.getCurrentPage();let n=!1;for(const o of e){const s=i.widgets.findIndex(r=>r.id===o);s!==-1&&(i.widgets.splice(s,1),this.state.widgetsById.delete(o),n=!0)}n&&P(I.STATE_CHANGED)}moveWidgetToPage(e,i,n=null,o=null){if(i<0||i>=this.state.pages.length)return!1;const s=this.state.pages[i],r=new Set,a=[];let l=e,c=this.state.widgetsById.get(e);if(c&&c.parentId){let g=c;for(;g.parentId;){const u=this.state.widgetsById.get(g.parentId);if(u)g=u;else break}l=g.id}const d=g=>{if(r.has(g))return;let u=null,f=null;for(const m of this.state.pages)if(u=m.widgets.find(_=>_.id===g),u){f=m;break}if(!u||!f||f===s)return;r.add(g),a.push({widget:u,sourcePage:f}),f.widgets.filter(m=>m.parentId===g).forEach(m=>d(m.id))};if(d(l),a.length===0)return!1;a.forEach((g,u)=>{const{widget:f,sourcePage:y}=g,m=y.widgets.indexOf(f);if(m!==-1&&y.widgets.splice(m,1),u===0&&f.parentId&&!r.has(f.parentId)&&(f.parentId=null),u===0){let _=0,b=0;if(n!==null&&o!==null&&(_=n-f.x,b=o-f.y,f.x=n,f.y=o),_!==0||b!==0)for(let S=1;S<a.length;S++){const x=a[S].widget;x.x+=_,x.y+=b}}s.widgets.push(f)});const p=this.getCanvasDimensions();for(const g of r){const u=this.state.widgetsById.get(g);if(!u||u.parentId&&r.has(u.parentId))continue;const f=u.x,y=u.y;u.x=Math.max(0,Math.min(p.width-(u.width||50),u.x)),u.y=Math.max(0,Math.min(p.height-(u.height||50),u.y));const m=u.x-f,_=u.y-y;if(m!==0||_!==0)for(const b of r){const S=this.state.widgetsById.get(b);S&&S.parentId===u.id&&(S.x+=m,S.y+=_)}}return this.rebuildWidgetsIndex(),P(I.STATE_CHANGED),!0}reorderWidget(e,i,n){const o=this.state.pages[e];if(!o)return;const s=o.widgets;if(i<0||i>=s.length||n<0||n>=s.length)return;const[r]=s.splice(i,1);s.splice(n,0,r),P(I.STATE_CHANGED)}clearCurrentPage(e=!1){const i=this.getCurrentPage();if(!i)return{deleted:0,preserved:0};const n=[],o=[];return i.widgets.forEach(s=>{e&&s.locked?o.push(s):n.push(s)}),i.widgets=o,n.forEach(s=>this.state.widgetsById.delete(s.id)),n.length>0&&P(I.STATE_CHANGED),{deleted:n.length,preserved:o.length}}setDeviceSettings(e,i){e&&(this.state.deviceName=e),i&&(this.state.deviceModel=i,window.currentDeviceModel=i),P(I.SETTINGS_CHANGED)}getCanvasDimensions(e){const i=this.state.deviceModel||"reterminal_e1001",n=D&&D[i]?D[i]:null;let o=Qt,s=en;if(n)n.resolution&&(o=n.resolution.width,s=n.resolution.height);else if(i==="custom"&&this.state.customHardware){const r=this.state.customHardware;r.resWidth&&r.resHeight&&(o=r.resWidth,s=r.resHeight)}return e===Xt.PORTRAIT?{width:Math.min(o,s),height:Math.max(o,s)}:{width:Math.max(o,s),height:Math.min(o,s)}}getPagesPayload(){return{pages:this.state.pages,deviceName:this.state.deviceName,deviceModel:this.state.deviceModel,currentLayoutId:this.state.currentLayoutId,customHardware:this.state.customHardware}}getCanvasShape(){const e=D[this.state.deviceModel];return e&&e.shape?e.shape:this.state.customHardware&&this.state.customHardware.shape?this.state.customHardware.shape:"rect"}}class Na{state;historyStack;historyIndex;constructor(){this.state={selectedWidgetIds:[],clipboardWidgets:[],zoomLevel:1,panX:0,panY:0},this.historyStack=[],this.historyIndex=-1}get selectedWidgetIds(){return this.state.selectedWidgetIds}get clipboardWidgets(){return this.state.clipboardWidgets}get zoomLevel(){return this.state.zoomLevel}setZoomLevel(e){this.state.zoomLevel=Math.max(.05,Math.min(5,e)),P(I.ZOOM_CHANGED,{zoomLevel:this.state.zoomLevel})}setSelectedWidgetIds(e){this.state.selectedWidgetIds=e||[],P(I.SELECTION_CHANGED,{widgetIds:this.state.selectedWidgetIds})}selectWidget(e,i=!1){if(i){const n=e?this.state.selectedWidgetIds.indexOf(e):-1;n===-1?e&&this.state.selectedWidgetIds.push(e):this.state.selectedWidgetIds.splice(n,1)}else this.state.selectedWidgetIds=e?[e]:[];P(I.SELECTION_CHANGED,{widgetIds:this.state.selectedWidgetIds})}copyWidgets(e){this.state.clipboardWidgets=e.map(i=>ht(i)),v.log("[EditorStore] Widgets copied to clipboard:",this.state.clipboardWidgets.length)}recordHistory(e){const i=ht(e);if(this.historyIndex>=0){const n=this.historyStack[this.historyIndex];if(JSON.stringify(n)===JSON.stringify(i))return}this.historyIndex<this.historyStack.length-1&&(this.historyStack=this.historyStack.slice(0,this.historyIndex+1)),this.historyStack.push(i),this.historyIndex++,this.historyStack.length>Jt&&(this.historyStack.shift(),this.historyIndex--),P(I.HISTORY_CHANGED,{canUndo:this.canUndo(),canRedo:this.canRedo()})}undo(){return this.canUndo()?(this.historyIndex--,this.historyStack[this.historyIndex]):null}redo(){return this.canRedo()?(this.historyIndex++,this.historyStack[this.historyIndex]):null}canUndo(){return this.historyIndex>0}canRedo(){return this.historyIndex<this.historyStack.length-1}}class Ga{constructor(){this.state={...Kt}}get snapEnabled(){return this.state.snapEnabled}get showGrid(){return this.state.showGrid}get showDebugGrid(){return this.state.showDebugGrid}get showRulers(){return this.state.showRulers}get gridOpacity(){return this.state.gridOpacity}get editor_light_mode(){return this.state.editor_light_mode}update(e){this.state={...this.state,...e},P(I.SETTINGS_CHANGED,this.state),v.log("[PreferencesStore] Settings updated")}setSnapEnabled(e){this.state.snapEnabled=e,P(I.SETTINGS_CHANGED,{snapEnabled:e})}setShowGrid(e){this.state.showGrid=e,P(I.SETTINGS_CHANGED,{showGrid:e})}setShowDebugGrid(e){this.state.showDebugGrid=e,P(I.SETTINGS_CHANGED,{showDebugGrid:e})}setShowRulers(e){this.state.showRulers=e,P(I.SETTINGS_CHANGED,{showRulers:e})}}class Wa{constructor(){this.keys={ai_api_key_gemini:"",ai_api_key_openai:"",ai_api_key_openrouter:""},this.loadFromLocalStorage()}get(e){return this.keys[e]}set(e,i){e in this.keys&&(this.keys[e]=i,this.saveToLocalStorage())}saveToLocalStorage(){try{const e={};Object.keys(this.keys).forEach(i=>{i.startsWith("ai_api_key_")&&(e[i]=this.keys[i])}),localStorage.setItem("esphome-designer-ai-keys",JSON.stringify(e))}catch(e){v.warn("[SecretsStore] Failed to save AI keys to localStorage:",e)}}loadFromLocalStorage(){try{const e=localStorage.getItem("esphome-designer-ai-keys");if(e){const i=JSON.parse(e);this.keys={...this.keys,...i},v.log("[SecretsStore] AI keys loaded from local storage")}}catch(e){v.warn("[SecretsStore] Failed to load AI keys from localStorage:",e)}}}class Fa{constructor(e){this.app=e}selectWidget(e,i=!1){if(!e){this.app.editor.selectWidget(null,i);return}const n=this.app.getWidgetById(e);if(n)if(n.type==="group"){const r=this.app.getCurrentPage().widgets.filter(a=>a.parentId===e).map(a=>a.id);if(i)if(r.some(l=>this.app.editor.selectedWidgetIds.includes(l))){const l=this.app.editor.selectedWidgetIds.filter(c=>!r.includes(c));this.app.editor.setSelectedWidgetIds(l)}else this.app.editor.setSelectedWidgetIds([...new Set([...this.app.editor.selectedWidgetIds,...r])]);else this.app.editor.setSelectedWidgetIds(r)}else this.app.editor.selectWidget(e,i)}selectWidgets(e){this.app.editor.setSelectedWidgetIds(e)}selectAllWidgets(){const e=this.app.getCurrentPage();if(!e||!e.widgets)return;const i=e.widgets.map(n=>n.id);this.selectWidgets(i)}deselectAll(){this.app.editor.setSelectedWidgetIds([])}toggleSelection(e){this.selectWidget(e,!0)}isWidgetSelected(e){return this.app.editor.selectedWidgetIds.includes(e)}groupSelection(){const e=this.app.editor.selectedWidgetIds,i=this.app.getSelectedWidgets(),n=i.some(d=>d.type==="group"||d.parentId);if(e.length<2||n)return;let o=1/0,s=1/0,r=-1/0,a=-1/0;i.forEach(d=>{o=Math.min(o,d.x),s=Math.min(s,d.y),r=Math.max(r,d.x+(d.width||0)),a=Math.max(a,d.y+(d.height||0))});const l="group_"+ke(),c={id:l,type:"group",title:"Group",x:o,y:s,width:r-o,height:a-s,props:{},expanded:!0};this.app.project.addWidget(c),i.forEach(d=>{this.app.project.updateWidget(d.id,{parentId:l})}),this.selectWidget(l),this.app.syncWidgetOrderWithHierarchy(),this.app.recordHistory(),P(I.STATE_CHANGED)}ungroupSelection(e=null){let i=[];if(e)i=Array.isArray(e)?e:[e];else{const a=this.app.getSelectedWidgets(),l=new Set;a.forEach(c=>{c.type==="group"?l.add(c.id):c.parentId&&l.add(c.parentId)}),i=[...l]}const n=new Set;i.forEach(a=>{const l=this.app.getWidgetById(a);l&&(l.type==="group"?n.add(l.id):l.parentId&&n.add(l.parentId))});const o=[...n];if(o.length===0)return;const s=[];o.forEach(a=>{const l=this.app.getWidgetById(a);if(!l||l.type!=="group")return;this.app.getCurrentPage().widgets.filter(p=>p.parentId===a).forEach(p=>{this.app.project.updateWidget(p.id,{parentId:null}),s.push(p.id)})}),this.app.project.deleteWidgets(o);const r=this.app.getCurrentPage();r&&r.widgets&&(r.widgets=r.widgets.filter(a=>!o.includes(a.id))),s.length>0&&this.selectWidgets(s),this.app.syncWidgetOrderWithHierarchy(),this.app.recordHistory(),P(I.STATE_CHANGED)}alignSelectedWidgets(e){const i=this.app.getSelectedWidgets();if(i.length<2)return;let n;switch(e){case"left":n=Math.min(...i.map(o=>o.x)),i.forEach(o=>this.app.project.updateWidget(o.id,{x:n}));break;case"center":{const o=Math.min(...i.map(r=>r.x)),s=Math.max(...i.map(r=>r.x+(r.width||0)));n=o+(s-o)/2,i.forEach(r=>this.app.project.updateWidget(r.id,{x:n-(r.width||0)/2}));break}case"right":n=Math.max(...i.map(o=>o.x+(o.width||0))),i.forEach(o=>this.app.project.updateWidget(o.id,{x:n-(o.width||0)}));break;case"top":n=Math.min(...i.map(o=>o.y)),i.forEach(o=>this.app.project.updateWidget(o.id,{y:n}));break;case"middle":{const o=Math.min(...i.map(r=>r.y)),s=Math.max(...i.map(r=>r.y+(r.height||0)));n=o+(s-o)/2,i.forEach(r=>this.app.project.updateWidget(r.id,{y:n-(r.height||0)/2}));break}case"bottom":n=Math.max(...i.map(o=>o.y+(o.height||0))),i.forEach(o=>this.app.project.updateWidget(o.id,{y:n-(o.height||0)}));break}this.app.recordHistory(),P(I.STATE_CHANGED)}distributeSelectedWidgets(e){const i=this.app.getSelectedWidgets();if(!(i.length<3)){if(e==="horizontal"){const n=[...i].sort((d,p)=>d.x-p.x),o=n[0],r=n[n.length-1].x-(o.x+(o.width||0)),a=n.slice(1,-1).reduce((d,p)=>d+(p.width||0),0),l=(r-a)/(n.length-1);let c=o.x+(o.width||0)+l;for(let d=1;d<n.length-1;d++)this.app.project.updateWidget(n[d].id,{x:c}),c+=(n[d].width||0)+l}else{const n=[...i].sort((d,p)=>d.y-p.y),o=n[0],r=n[n.length-1].y-(o.y+(o.height||0)),a=n.slice(1,-1).reduce((d,p)=>d+(p.height||0),0),l=(r-a)/(n.length-1);let c=o.y+(o.height||0)+l;for(let d=1;d<n.length-1;d++)this.app.project.updateWidget(n[d].id,{y:c}),c+=(n[d].height||0)+l}this.app.recordHistory(),P(I.STATE_CHANGED)}}}class $a{constructor(e){this.app=e}recordHistory(){this.app._isRestoringHistory||this.app.editor.recordHistory({pages:this.app.project.pages,deviceName:this.app.project.deviceName})}undo(){const e=this.app.editor.undo();e&&(this.app.setInternalFlag("_isRestoringHistory",!0),this.restoreSnapshot(e),setTimeout(()=>{this.app.setInternalFlag("_isRestoringHistory",!1)},0))}redo(){const e=this.app.editor.redo();e&&(this.app.setInternalFlag("_isRestoringHistory",!0),this.restoreSnapshot(e),setTimeout(()=>{this.app.setInternalFlag("_isRestoringHistory",!1)},0))}restoreSnapshot(e){this.app.project.state.pages=JSON.parse(JSON.stringify(e.pages)),this.app.project.state.deviceName=e.deviceName,this.app.project.rebuildWidgetsIndex(),P(I.STATE_CHANGED)}canUndo(){return this.app.editor.canUndo()}canRedo(){return this.app.editor.canRedo()}}let Nt={};try{Nt=Object.assign({"../../features/battery_icon/plugin.js":()=>T(()=>import("./plugin-BwSs7WFh.js"),[],import.meta.url),"../../features/calendar/plugin.js":()=>T(()=>import("./plugin-DmXbQKw6.js"),[],import.meta.url),"../../features/datetime/plugin.js":()=>T(()=>import("./plugin-CwlEgl_P.js"),[],import.meta.url),"../../features/debug_grid/plugin.js":()=>T(()=>import("./plugin-PMFdXsmw.js"),[],import.meta.url),"../../features/graph/plugin.js":()=>T(()=>import("./plugin-U91xD2fr.js"),[],import.meta.url),"../../features/icon/plugin.js":()=>T(()=>import("./plugin-B9xEoANS.js"),[],import.meta.url),"../../features/image/plugin.js":()=>T(()=>import("./plugin-BJChmV-s.js"),[],import.meta.url),"../../features/line/plugin.js":()=>T(()=>import("./plugin-C2sDnM_r.js"),[],import.meta.url),"../../features/lvgl_arc/plugin.js":()=>T(()=>import("./plugin-CVpJvkpi.js"),[],import.meta.url),"../../features/lvgl_bar/plugin.js":()=>T(()=>import("./plugin-CN6lT8h5.js"),[],import.meta.url),"../../features/lvgl_button/plugin.js":()=>T(()=>import("./plugin-BSpRk_9W.js"),[],import.meta.url),"../../features/lvgl_buttonmatrix/plugin.js":()=>T(()=>import("./plugin-DEHhPjyW.js"),[],import.meta.url),"../../features/lvgl_chart/plugin.js":()=>T(()=>import("./plugin-B08xXho0.js"),[],import.meta.url),"../../features/lvgl_checkbox/plugin.js":()=>T(()=>import("./plugin-BE_01n-x.js"),[],import.meta.url),"../../features/lvgl_dropdown/plugin.js":()=>T(()=>import("./plugin-DKvu6nsr.js"),[],import.meta.url),"../../features/lvgl_img/plugin.js":()=>T(()=>import("./plugin-De55Pwkg.js"),[],import.meta.url),"../../features/lvgl_keyboard/plugin.js":()=>T(()=>import("./plugin-D1BU2qLG.js"),[],import.meta.url),"../../features/lvgl_label/plugin.js":()=>T(()=>import("./plugin-DEv1opx3.js"),[],import.meta.url),"../../features/lvgl_led/plugin.js":()=>T(()=>import("./plugin-CLnVe9Kd.js"),[],import.meta.url),"../../features/lvgl_line/plugin.js":()=>T(()=>import("./plugin-D471liQ4.js"),[],import.meta.url),"../../features/lvgl_meter/plugin.js":()=>T(()=>import("./plugin-BFX5ceQ9.js"),[],import.meta.url),"../../features/lvgl_obj/plugin.js":()=>T(()=>import("./plugin-Cvfrg4uG.js"),[],import.meta.url),"../../features/lvgl_qrcode/plugin.js":()=>T(()=>import("./plugin-BFqLcXeO.js"),[],import.meta.url),"../../features/lvgl_roller/plugin.js":()=>T(()=>import("./plugin-H8_Cedxq.js"),[],import.meta.url),"../../features/lvgl_slider/plugin.js":()=>T(()=>import("./plugin-DpfH8oTa.js"),[],import.meta.url),"../../features/lvgl_spinbox/plugin.js":()=>T(()=>import("./plugin-CCSLU7VJ.js"),[],import.meta.url),"../../features/lvgl_spinner/plugin.js":()=>T(()=>import("./plugin-pgv6K-gd.js"),[],import.meta.url),"../../features/lvgl_switch/plugin.js":()=>T(()=>import("./plugin-ZiSgt6cy.js"),[],import.meta.url),"../../features/lvgl_tabview/plugin.js":()=>T(()=>import("./plugin-Z-WZZzFC.js"),[],import.meta.url),"../../features/lvgl_textarea/plugin.js":()=>T(()=>import("./plugin-lvh67nIM.js"),[],import.meta.url),"../../features/lvgl_tileview/plugin.js":()=>T(()=>import("./plugin-Rd1hUaWq.js"),[],import.meta.url),"../../features/odp_arc/plugin.js":()=>T(()=>import("./plugin-fLOMRvii.js"),[],import.meta.url),"../../features/odp_ellipse/plugin.js":()=>T(()=>import("./plugin-FRwyy2yN.js"),[],import.meta.url),"../../features/odp_icon_sequence/plugin.js":()=>T(()=>import("./plugin-CciJdC0y.js"),[],import.meta.url),"../../features/odp_multiline/plugin.js":()=>T(()=>import("./plugin-C4VhGPFM.js"),[],import.meta.url),"../../features/odp_plot/plugin.js":()=>T(()=>import("./plugin-CK-qsUG-.js"),[],import.meta.url),"../../features/odp_polygon/plugin.js":()=>T(()=>import("./plugin-C_hkq-qm.js"),[],import.meta.url),"../../features/odp_rectangle_pattern/plugin.js":()=>T(()=>import("./plugin-BMFaRNdP.js"),[],import.meta.url),"../../features/ondevice_humidity/plugin.js":()=>T(()=>import("./plugin-CVTlDvbR.js"),[],import.meta.url),"../../features/ondevice_temperature/plugin.js":()=>T(()=>import("./plugin-CK_Rp9Io.js"),[],import.meta.url),"../../features/online_image/plugin.js":()=>T(()=>import("./plugin-BMLrwOol.js"),[],import.meta.url),"../../features/progress_bar/plugin.js":()=>T(()=>import("./plugin-6cDY1hT0.js"),__vite__mapDeps([0,1]),import.meta.url),"../../features/qr_code/plugin.js":()=>T(()=>import("./plugin-DG7kmKyC.js"),[],import.meta.url),"../../features/quote_rss/plugin.js":()=>T(()=>import("./plugin-CjszQwFO.js"),[],import.meta.url),"../../features/rounded_rect/plugin.js":()=>T(()=>import("./plugin-Dl-6B8cT.js"),[],import.meta.url),"../../features/sensor_text/plugin.js":()=>T(()=>import("./plugin-D1J8NJ4z.js"),__vite__mapDeps([2,1,3]),import.meta.url),"../../features/shape_circle/plugin.js":()=>T(()=>import("./plugin-Drjre0JP.js"),[],import.meta.url),"../../features/shape_rect/plugin.js":()=>T(()=>import("./plugin-YQ7368gY.js"),[],import.meta.url),"../../features/template_nav_bar/plugin.js":()=>T(()=>import("./plugin-5yMIYvKk.js"),[],import.meta.url),"../../features/template_sensor_bar/plugin.js":()=>T(()=>import("./plugin-D1oQcfbJ.js"),[],import.meta.url),"../../features/text/plugin.js":()=>T(()=>import("./plugin-DAgEZ4NU.js"),__vite__mapDeps([4,3]),import.meta.url),"../../features/touch_area/plugin.js":()=>T(()=>import("./plugin-DNGYv9bW.js"),[],import.meta.url),"../../features/weather_forecast/plugin.js":()=>T(()=>import("./plugin-D8qfTnhG.js"),[],import.meta.url),"../../features/weather_icon/plugin.js":()=>T(()=>import("./plugin-OK-RzVh7.js"),[],import.meta.url),"../../features/wifi_signal/plugin.js":()=>T(()=>import("./plugin-D9VhiD_Q.js"),[],import.meta.url)})}catch{}class za{plugins=new Map;loading=new Map;aliases;constructor(){this.aliases={label:"text",rectangle:"shape_rect",rrect:"rounded_rect",circle:"shape_circle",nav_next_page:"touch_area",nav_previous_page:"touch_area",nav_reload_page:"touch_area",puppet:"online_image",multiline:"odp_multiline",rectangle_pattern:"odp_rectangle_pattern",polygon:"odp_polygon",ellipse:"odp_ellipse",icon_sequence:"odp_icon_sequence",weather_forcast:"weather_forecast",odp_debug_grid:"debug_grid"}}register(e){if(!e?.id){v.warn("[Registry] Invalid plugin registration attempt:",e);return}const i=e.id,n=this.plugins.get(i)||{};this.plugins.set(i,{...n,...e}),v.log(`[Registry] Registered: ${i}`)}get(e){const i=this.aliases[e]||e;return this.plugins.get(i)}getAll(){return Array.from(this.plugins.values())}async load(e){const i=this.aliases[e]||e;if(i==="group")return null;if(this.plugins.has(i))return this.plugins.get(i);if(this.loading.has(i))return this.loading.get(i);const n=(async()=>{try{const o=`../../features/${i}/plugin.js`;let s;return Nt[o]?s=await Nt[o]():(v.log(`[Registry] Using dynamic import fallback for: ${i}`),s=await import(o)),s.default?this.register(s.default):this.register({id:i,...s}),this.loading.delete(i),this.plugins.get(i)??null}catch(o){return v.error(`[Registry] Failed to load plugin "${i}" from ESM:`,o),this.loading.delete(i),null}})();return this.loading.set(i,n),n}onExportGlobals(e){this.getAll().forEach(i=>i.onExportGlobals?.call(i,e))}onExportEsphome(e){this.getAll().forEach(i=>i.onExportEsphome?.call(i,e))}onExportNumericSensors(e){this.getAll().forEach(i=>i.onExportNumericSensors?.call(i,e))}onExportTextSensors(e){this.getAll().forEach(i=>i.onExportTextSensors?.call(i,e))}onExportBinarySensors(e){this.getAll().forEach(i=>i.onExportBinarySensors?.call(i,e))}onExportHelpers(e){this.getAll().forEach(i=>i.onExportHelpers?.call(i,e))}onExportComponents(e){this.getAll().forEach(i=>i.onExportComponents?.call(i,e))}onCollectRequirements(e){this.getAll().forEach(i=>i.collectRequirements?.call(i,e))}}const H=new za;v.log("[Registry] Modular system ready.");class Ua{constructor(e){this.app=e}setCustomHardware(e){this.app.project.state.customHardware=e,P(I.STATE_CHANGED),P(I.PAGE_CHANGED,{index:this.app.currentPageIndex,forceFocus:!0})}addWidget(e,i=null){this.checkRenderingModeForWidget(e),this.app.project.addWidget(e,i),this.app.recordHistory(),this.app.selectWidget(e.id),P(I.STATE_CHANGED)}updateWidget(e,i){this.app.project.updateWidget(e,i);const n=this.app.getWidgetById(e);if(n&&n.type==="group"){const o=["locked","hidden"],s={};if(o.forEach(r=>{i[r]!==void 0&&(s[r]=i[r])}),Object.keys(s).length>0){const r=this.app.pages[this.app.currentPageIndex];r&&r.widgets&&r.widgets.filter(l=>l.parentId===e).forEach(l=>this.updateWidget(l.id,s))}}i.parentId!==void 0&&this.syncWidgetOrderWithHierarchy(),P(I.STATE_CHANGED)}updateWidgets(e,i){e.forEach(n=>this.app.project.updateWidget(n,i)),P(I.STATE_CHANGED)}updateWidgetsProps(e,i){e.forEach(n=>{const o=this.app.getWidgetById(n);if(o){const s={...o.props||{},...i};this.app.project.updateWidget(n,{props:s})}}),P(I.STATE_CHANGED)}deleteWidget(e){const i=e?[e]:[...this.app.editor.selectedWidgetIds],n=[...i];i.forEach(o=>{const s=this.app.getWidgetById(o);s&&s.type==="group"&&this.app.pages[this.app.currentPageIndex].widgets.filter(a=>a.parentId===o).forEach(a=>n.push(a.id))}),this.app.project.deleteWidgets([...new Set(n)]),this.app.editor.setSelectedWidgetIds([]),this.app.recordHistory(),P(I.STATE_CHANGED)}moveWidgetToPage(e,i,n=null,o=null){const s=this.app.getWidgetById(e);if(!s)return;const r=this.app.getCurrentPage(),a=this.app.pages[i];if(!r||!a)return;r.widgets=r.widgets.filter(c=>c.id!==e);const l=JSON.parse(JSON.stringify(s));n!==null&&(l.x=n),o!==null&&(l.y=o),a.widgets.push(l),this.app.project.rebuildWidgetsIndex(),this.app.recordHistory(),P(I.STATE_CHANGED)}copyWidget(e){const n=(e?[e]:this.app.editor.selectedWidgetIds).map(o=>this.app.getWidgetById(o)).filter(o=>!!o);n.length>0&&this.app.editor.copyWidgets(n)}pasteWidget(){const e=this.app.editor.clipboardWidgets;if(!e||e.length===0)return;const i=e.map(n=>{const o=JSON.parse(JSON.stringify(n));return o.id=ke(),o.x+=10,o.y+=10,o});i.forEach(n=>{this.checkRenderingModeForWidget(n),this.app.project.addWidget(n)}),this.app.editor.setSelectedWidgetIds(i.map(n=>n.id)),this.app.recordHistory(),P(I.STATE_CHANGED)}createDropShadow(e){const i=Array.isArray(e)?e:[e];if(i.length===0)return;const n=this.app.project.getCurrentPage(),o=n?n.dark_mode:void 0;let s=!1;o==="dark"?s=!0:o==="light"?s=!1:s=!!this.app.settings.dark_mode;const r=s?"white":"black",a=s?"black":"white",l=s?"white":"black",c=[];i.forEach(d=>{const p=this.app.getWidgetById(d);if(!p)return;const g=parseInt(p.props?.border_radius||p.props?.radius||p.props?.corner_radius||0,10);let u="shape_rect";p.type==="shape_circle"||p.type==="circle"?u="shape_circle":g>0&&(u="rounded_rect");const f={id:ke(),type:u,x:(p.x||0)+5,y:(p.y||0)+5,width:p.width,height:p.height,props:{name:(p.props?.name||p.type)+" Shadow",color:r,background_color:r,bg_color:r,fill:!0}};u==="rounded_rect"&&(f.props.radius=g),this.app.project.addWidget(f),p.props||(p.props={});const y=["shape_rect","rounded_rect","shape_circle","rectangle","rrect","circle"].includes(p.type),m=p.props.color||l;p.props.border_color||(p.props.border_color=m),p.props.fill=!0,p.props.background_color=a,p.props.bg_color=a,y&&(p.props.color=a),this.app.project.updateWidget(d,{props:{...p.props}});const _=n.widgets.findIndex(L=>L.id===d),b=n.widgets.findIndex(L=>L.id===f.id);_!==-1&&b!==-1&&this.app.project.reorderWidget(this.app.project.currentPageIndex,b,_);const S="group_"+ke(),x=Math.min(p.x,f.x),E=Math.min(p.y,f.y),w=Math.max(p.x+p.width,f.x+f.width),C=Math.max(p.y+p.height,f.y+f.height),k={id:S,type:"group",title:p.props?.name?`${p.props.name} Group`:"Shadow Group",x,y:E,width:w-x,height:C-E,props:{},expanded:!0};this.app.project.addWidget(k),this.app.project.updateWidget(f.id,{parentId:S}),this.app.project.updateWidget(p.id,{parentId:S}),c.push(S)}),c.length>0&&this.app.selectWidgets(c),this.syncWidgetOrderWithHierarchy(),this.app.recordHistory(),P(I.STATE_CHANGED)}syncWidgetOrderWithHierarchy(){const e=this.app.getCurrentPage();if(!e||!e.widgets)return;const i=[...e.widgets],n=i.filter(a=>!a.parentId),o=new Map;i.forEach(a=>{a.parentId&&(o.has(a.parentId)||o.set(a.parentId,[]),o.get(a.parentId).push(a))});const s=[],r=a=>{s.push(a);const l=o.get(a.id);l&&(l.sort((c,d)=>i.indexOf(c)-i.indexOf(d)),l.forEach(r))};n.forEach(r),e.widgets=s,this.app.project.rebuildWidgetsIndex()}syncWidgetVisibilityWithMode(){const e=this.app.preferences.state.renderingMode||"direct";v.log(`[AppState] Syncing widget visibility for mode: ${e}`);let i=0;this.app.project.pages.forEach(n=>{n.widgets.forEach(o=>{const s=this.isWidgetCompatibleWithMode(o,e);!s&&!o.hidden?(o.hidden=!0,i++):s&&o.hidden&&(o.hidden=!1,i++)})}),i>0&&(v.log(`[AppState] Updated ${i} widgets due to mode switch.`),this.app.project.rebuildWidgetsIndex(),P(I.STATE_CHANGED))}isWidgetCompatibleWithMode(e,i){const n=H.get(e.type);if(!n)return!0;if(i==="oepl")return!!n.exportOEPL;if(i==="opendisplay")return!!n.exportOpenDisplay;if(i==="lvgl"){const o=e.type&&e.type.startsWith("lvgl_"),s=typeof n.exportLVGL=="function";return o||s}if(i==="direct"){const o=e.type&&(e.type.startsWith("lvgl_")||e.type.startsWith("oepl_"));return!!n.export&&!o}return!0}checkRenderingModeForWidget(e){if(!e||!e.type)return;const i=this.app.preferences.state.renderingMode||"direct",n=e.type.startsWith("lvgl_"),o=e.type.startsWith("oepl_"),s=e.type.startsWith("odp_")||e.type.startsWith("opendisplay_");n&&i==="direct"?(this.app.updateSettings({renderingMode:"lvgl"}),v.log(`[AppState] Auto-switched to LVGL rendering mode because an LVGL widget (${e.type}) was added.`),A("Auto-switched to LVGL rendering mode","info")):o&&i!=="oepl"?(this.app.updateSettings({renderingMode:"oepl"}),v.log(`[AppState] Auto-switched to OEPL rendering mode because an OEPL widget (${e.type}) was added.`),A("Auto-switched to OEPL mode","info")):s&&i!=="opendisplay"&&(this.app.updateSettings({renderingMode:"opendisplay"}),v.log(`[AppState] Auto-switched to OpenDisplay (ODP) mode because an ODP widget (${e.type}) was added.`),A("Auto-switched to ODP mode","info"))}}class ja{constructor(e){this.app=e}reorderWidget(e,i,n){this.app.project.reorderWidget(e,i,n),this.app.widgetManager.syncWidgetOrderWithHierarchy(),this.app.recordHistory(),P(I.STATE_CHANGED)}setCurrentPageIndex(e,i={}){this.app.project.setCurrentPageIndex(e,i),this.app.editor.setSelectedWidgetIds([]),P(I.STATE_CHANGED)}reorderPage(e,i){this.app.project.reorderPage(e,i),this.app.recordHistory()}addPage(e=null){const i=this.app.project.addPage(e);return this.app.recordHistory(),i}deletePage(e){this.app.project.deletePage(e),this.app.recordHistory()}duplicatePage(e){const i=this.app.project.duplicatePage(e);return this.app.recordHistory(),i}renamePage(e,i){this.app.project.renamePage(e,i),this.app.recordHistory()}clearCurrentPage(e=!1){const i=this.app.project.clearCurrentPage(e);return i.deleted>0&&(this.app.editor.setSelectedWidgetIds([]),this.app.recordHistory(),P(I.STATE_CHANGED)),i}}class Ya{project;editor;preferences;secrets;selectionManager;historyManager;widgetManager;pageManager;_isRestoringHistory;$raw;constructor(){this.project=new Ha,this.editor=new Na,this.preferences=new Ga,this.secrets=new Wa,this.selectionManager=new Fa(this),this.historyManager=new $a(this),this.widgetManager=new Ua(this),this.pageManager=new ja(this),this._isRestoringHistory=!1,this.recordHistory(),F(I.SETTINGS_CHANGED,e=>{e&&e.renderingMode!==void 0&&this.syncWidgetVisibilityWithMode()})}reset(){this.project.reset(),this.editor.state.selectedWidgetIds=[],this.recordHistory()}get pages(){return this.project.pages}get currentPageIndex(){return this.project.currentPageIndex}get selectedWidgetId(){return this.editor.selectedWidgetIds[0]||null}get selectedWidgetIds(){return this.editor.selectedWidgetIds}get settings(){return{...this.preferences.state,device_name:this.project.deviceName,deviceName:this.project.deviceName,device_model:this.project.deviceModel,deviceModel:this.project.deviceModel,customHardware:this.project.customHardware,custom_hardware:this.project.customHardware,protocolHardware:this.project.protocolHardware,protocol_hardware:this.project.protocolHardware,...this.secrets.keys}}get deviceName(){return this.project.deviceName}get deviceModel(){return this.project.deviceModel}get currentLayoutId(){return this.project.currentLayoutId}get snapEnabled(){return this.preferences.snapEnabled}get showGrid(){return this.preferences.showGrid}get showDebugGrid(){return this.preferences.showDebugGrid}get showRulers(){return this.preferences.showRulers}get zoomLevel(){return this.editor.zoomLevel}getCurrentPage(){return this.project.getCurrentPage()}getWidgetById(e){return this.project.getWidgetById(e)}getSelectedWidget(){return this.project.getWidgetById(this.editor.selectedWidgetIds[0])}getSelectedWidgets(){return this.editor.selectedWidgetIds.map(e=>this.getWidgetById(e)).filter(e=>!!e)}getSelectedProfile(){return D[this.project.deviceModel]||null}getCanvasDimensions(){const e=this.preferences.state.renderingMode||"direct";if(e==="oepl"||e==="opendisplay"){const i=this.project.protocolHardware;return this.preferences.state.orientation==="portrait"?{width:Math.min(i.width,i.height),height:Math.max(i.width,i.height)}:{width:Math.max(i.width,i.height),height:Math.min(i.width,i.height)}}return this.project.getCanvasDimensions(this.preferences.state.orientation)}getCanvasShape(){return this.project.getCanvasShape()}getPagesPayload(){const e={...this.project.getPagesPayload(),currentPageIndex:this.currentPageIndex,...this.settings};return e.deviceModel=this.project.deviceModel,e.customHardware=this.project.customHardware,e.protocolHardware=this.project.protocolHardware,e.device_model=this.project.deviceModel,e.custom_hardware=this.project.customHardware,e.protocol_hardware=this.project.protocolHardware,e}getSettings(){return this.settings}setSettings(e){this.updateSettings(e)}updateProtocolHardware(e){Object.assign(this.project.state.protocolHardware,e),P(I.SETTINGS_CHANGED),P(I.PAGE_CHANGED,{index:this.currentPageIndex,forceFocus:!0})}saveToLocalStorage(){if(!N()){const e=this.getPagesPayload();localStorage.setItem("esphome-designer-layout",JSON.stringify(e))}}loadFromLocalStorage(){try{const e=localStorage.getItem("esphome-designer-layout");return e?JSON.parse(e):null}catch(e){return console.error("[loadFromLocalStorage] Parse error:",e),null}}setPages(e){this.project.setPages(e),P(I.STATE_CHANGED)}reorderWidget(e,i,n){this.pageManager.reorderWidget(e,i,n)}setCurrentPageIndex(e,i={}){this.pageManager.setCurrentPageIndex(e,i)}reorderPage(e,i){this.pageManager.reorderPage(e,i)}addPage(e=null){return this.pageManager.addPage(e)}deletePage(e){this.pageManager.deletePage(e)}duplicatePage(e){return this.pageManager.duplicatePage(e)}renamePage(e,i){this.pageManager.renamePage(e,i)}selectWidget(e,i=!1){this.selectionManager.selectWidget(e,i)}selectWidgets(e){this.selectionManager.selectWidgets(e)}selectAllWidgets(){this.selectionManager.selectAllWidgets()}deselectAll(){this.selectionManager.deselectAll()}toggleSelection(e){this.selectionManager.toggleSelection(e)}isWidgetSelected(e){return this.selectionManager.isWidgetSelected(e)}groupSelection(){this.selectionManager.groupSelection()}ungroupSelection(e=null){this.selectionManager.ungroupSelection(e)}alignSelectedWidgets(e){this.selectionManager.alignSelectedWidgets(e)}distributeSelectedWidgets(e){this.selectionManager.distributeSelectedWidgets(e)}updateSettings(e){const i={},n={};Object.keys(e).forEach(o=>{o.startsWith("ai_api_key_")?i[o]=e[o]:n[o]=e[o]}),Object.keys(i).length&&Object.entries(i).forEach(([o,s])=>this.secrets.set(o,s)),this.preferences.update(n),e.device_name&&(this.project.state.deviceName=e.device_name),e.device_model&&(this.project.state.deviceModel=e.device_model),P(I.STATE_CHANGED),(e.device_model||e.orientation||e.custom_hardware)&&P(I.PAGE_CHANGED,{index:this.currentPageIndex,forceFocus:!0})}setDeviceName(e){this.project.state.deviceName=e,this.updateLayoutIndicator(),P(I.STATE_CHANGED)}setDeviceModel(e){this.project.state.deviceModel=e,this.updateLayoutIndicator(),P(I.STATE_CHANGED),P(I.PAGE_CHANGED,{index:this.currentPageIndex,forceFocus:!0})}setCurrentLayoutId(e){this.project.state.currentLayoutId=e,this.updateLayoutIndicator(),P(I.STATE_CHANGED)}updateLayoutIndicator(){const e=document.getElementById("currentLayoutName");e&&(e.textContent=this.project.deviceName||this.project.currentLayoutId||"Unknown")}setSnapEnabled(e){this.preferences.setSnapEnabled(e)}setShowGrid(e){this.preferences.setShowGrid(e)}setShowDebugGrid(e){this.preferences.setShowDebugGrid(e)}setShowRulers(e){this.preferences.setShowRulers(e)}setZoomLevel(e){this.editor.setZoomLevel(e)}setCustomHardware(e){this.widgetManager.setCustomHardware(e)}addWidget(e,i=null){this.widgetManager.addWidget(e,i)}updateWidget(e,i){this.widgetManager.updateWidget(e,i)}updateWidgets(e,i){this.widgetManager.updateWidgets(e,i)}updateWidgetsProps(e,i){this.widgetManager.updateWidgetsProps(e,i)}deleteWidget(e){this.widgetManager.deleteWidget(e)}moveWidgetToPage(e,i,n=null,o=null){return this.widgetManager.moveWidgetToPage(e,i,n,o)}copyWidget(e){this.widgetManager.copyWidget(e)}pasteWidget(){this.widgetManager.pasteWidget()}createDropShadow(e){this.widgetManager.createDropShadow(e)}clearCurrentPage(e=!1){return this.pageManager.clearCurrentPage(e)}recordHistory(){this.historyManager.recordHistory()}undo(){this.historyManager.undo()}redo(){this.historyManager.redo()}setInternalFlag(e,i){const n=this.$raw||this;n[e]=i}restoreSnapshot(e){this.historyManager.restoreSnapshot(e)}canUndo(){return this.historyManager.canUndo()}canRedo(){return this.historyManager.canRedo()}syncWidgetOrderWithHierarchy(){this.widgetManager.syncWidgetOrderWithHierarchy()}syncWidgetVisibilityWithMode(){this.widgetManager.syncWidgetVisibilityWithMode()}_isWidgetCompatibleWithMode(e,i){return this.widgetManager.isWidgetCompatibleWithMode(e,i)}_checkRenderingModeForWidget(e){this.widgetManager.checkRenderingModeForWidget(e)}}const Va=new Ya,qa={set(t,e,i,n){return e==="snapEnabled"?(v.warn(`[StateProxy] Intercepted illegal write to '${String(e)}'. Automatically rerouting to setSnapEnabled().`),typeof t.setSnapEnabled=="function"&&t.setSnapEnabled(i),!0):(typeof e=="string"&&!["entityStates","_isRestoringHistory"].includes(e)&&typeof t[e]!="function"&&(v.warn(`[StateProxy] 🚨 ILLEGAL STATE MUTATION DETECTED: AppState.${e} = ${i}`),console.trace(`[StateProxy] Trace for illegal mutation of AppState.${e}`)),Reflect.set(t,e,i,n))}},h=new Proxy(Va,qa);window.AppState=h;window.ESPHomeDesigner=window.ESPHomeDesigner||{};window.ESPHomeDesigner.state=h;window.AppState=h;window.ESPHomeDesigner=window.ESPHomeDesigner||{};window.ESPHomeDesigner.state=h;class ee{static getEffectiveDarkMode(){const i=h?.getCurrentPage?.()?.dark_mode;return i==="dark"?!0:i==="light"?!1:!!(h&&h.settings&&h.settings.dark_mode)}static getDefaultColor(){return ee.getEffectiveDarkMode()?"white":"black"}static getDefaultBgColor(){return ee.getEffectiveDarkMode()?"black":"white"}static getGridCellDefaults(){return{grid_cell_row_pos:null,grid_cell_column_pos:null,grid_cell_row_span:1,grid_cell_column_span:1,grid_cell_x_align:"STRETCH",grid_cell_y_align:"STRETCH"}}static isLvglWidget(e){return!!(e&&e.startsWith("lvgl_"))}static createWidget(e){const i=ke(),n=ee.getDefaultBgColor(),o=ee.getDefaultColor();let s={id:i,type:e,x:40,y:40,width:120,height:40,title:"",entity_id:"",locked:!1,props:{}};switch(e){case"nav_next_page":return s.props={title:"Next",color:"rgba(0, 128, 255, 0.2)",border_color:"#0080ff",nav_action:"next_page",icon:"F0142",icon_size:48},s.width=80,s.height=80,s;case"nav_previous_page":return s.props={title:"Previous",color:"rgba(0, 128, 255, 0.2)",border_color:"#0080ff",nav_action:"previous_page",icon:"F0141",icon_size:48},s.width=80,s.height=80,s;case"nav_reload_page":return s.props={title:"Reload",color:"rgba(0, 128, 255, 0.2)",border_color:"#0080ff",nav_action:"reload_page",icon:"F0450",icon_size:48},s.width=80,s.height=80,s}const r=H.get(e);return r&&r.defaults&&(s.props={...r.defaults},(s.props.color==="black"||s.props.color==="white")&&(s.props.color="theme_auto"),(s.props.text_color==="black"||s.props.text_color==="white")&&(s.props.text_color="theme_auto"),(s.props.bg_color==="black"||s.props.bg_color==="white")&&(s.props.bg_color=n),(s.props.background_color==="black"||s.props.background_color==="white")&&(s.props.background_color=n),(s.props.border_color==="black"||s.props.border_color==="white")&&(s.props.border_color=o),r.width&&(s.width=r.width),r.height&&(s.height=r.height),r.defaults.width&&(s.width=r.defaults.width),r.defaults.height&&(s.height=r.defaults.height),r.defaults.w&&(s.width=r.defaults.w),r.defaults.h&&(s.height=r.defaults.h)),ee.isLvglWidget(e)&&(s.props={...ee.getGridCellDefaults(),...s.props}),s}}window.WidgetFactory=ee;class Xa{constructor(){v.log("Sidebar: Constructor called"),this.pageListEl=document.getElementById("pageList"),this.pagesHeader=document.getElementById("pagesHeader"),this.pagesContent=document.getElementById("pagesContent"),this.widgetPaletteEl=document.getElementById("widgetPalette"),v.log("Sidebar: widgetPaletteEl found?",!!this.widgetPaletteEl),this.widgetPaletteEl||v.error("Sidebar: widgetPalette element not found!"),this.addPageBtn=document.getElementById("addPageBtn"),this.currentPageNameEl=document.getElementById("currentPageName"),this.hoverTimeout=null,this.hoveredPageIndex=-1}init(){v.log("Sidebar: init called");const e=document.getElementById("debug-overlay");e&&(e.innerHTML+="Sidebar.init called<br>"),F(I.STATE_CHANGED,()=>this.render()),F(I.PAGE_CHANGED,()=>this.render()),this.pagesHeader&&this.pagesContent&&this.pagesHeader.addEventListener("click",()=>{const o=this.pagesContent.classList.toggle("hidden"),s=this.pagesHeader.querySelector(".chevron");s&&(s.style.transform=o?"rotate(-90deg)":"rotate(0deg)")}),this.addPageBtn&&this.addPageBtn.addEventListener("click",()=>this.handleAddPage()),this.widgetPaletteEl&&(this.widgetPaletteEl.addEventListener("click",o=>this.handlePaletteClick(o)),this.widgetPaletteEl.addEventListener("dragstart",o=>{const s=o.target.closest(".item[data-widget-type]");if(s){const r=s.getAttribute("data-widget-type");v.log("[Sidebar] Drag start:",r),o.dataTransfer.setData("application/widget-type",r),o.dataTransfer.effectAllowed="copy"}})),document.addEventListener("click",o=>{const s=document.getElementById("debug-overlay");s&&(s.innerHTML+="Global click: "+o.target.tagName+"<br>")});const i=document.getElementById("clearAllBtn");i&&i.addEventListener("click",()=>this.handleClearPage());const n=document.getElementById("quickSearchBtn");n&&n.addEventListener("click",o=>{o.stopPropagation(),window.QuickSearch?window.QuickSearch.open():v.warn("Sidebar: QuickSearch instance not found on window")}),this.setupMobileToggles(),this.render()}render(){if(!this.pageListEl)return;this.pageListEl.innerHTML="";const e=h.pages,i=h.currentPageIndex;if(e.forEach((n,o)=>{const s=document.createElement("div");s.className="item"+(o===i?" active":""),s.draggable=!0,s.ondragstart=p=>{p.dataTransfer.setData("text/plain",o),p.dataTransfer.effectAllowed="move",s.style.opacity="0.5"},s.ondragend=()=>{s.style.opacity="1",Array.from(this.pageListEl.children).forEach(p=>{p.style.borderTop="",p.style.borderBottom=""})},s.ondragover=p=>{p.preventDefault();const g=p.dataTransfer.types.includes("application/widget-id"),u=p.dataTransfer.types.includes("application/widget-type");if(g||u){p.dataTransfer.dropEffect=g?"move":"copy",s.style.backgroundColor="var(--primary-subtle)",h.currentPageIndex!==o&&h.setCurrentPageIndex(o);return}const f=s.getBoundingClientRect(),y=f.top+f.height/2;p.clientY<y?(s.style.borderTop="2px solid var(--primary)",s.style.borderBottom=""):(s.style.borderTop="",s.style.borderBottom="2px solid var(--primary)")},s.ondragleave=p=>{const g=p.relatedTarget;s.contains(g)||this.hoveredPageIndex===o&&(this.hoverTimeout&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=null),this.hoveredPageIndex=-1),s.style.borderTop="",s.style.borderBottom="",s.style.backgroundColor=""},s.ondrop=p=>{p.preventDefault(),this.hoverTimeout&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=null),this.hoveredPageIndex=-1,s.style.borderTop="",s.style.borderBottom="",s.style.backgroundColor="";const g=p.dataTransfer.getData("application/widget-id"),u=p.dataTransfer.getData("application/widget-type");if(g){v.log(`[Sidebar] Drop detected on page ${o}. Widget ID:`,g);const m=o;m!==h.currentPageIndex&&(h.moveWidgetToPage(g,m),v.log(`[Sidebar] Moved widget ${g} to page ${m}`));return}if(u){v.log(`[Sidebar] Drop detected on page ${o}. Widget Type:`,u);const m=o;try{const _=ee.createWidget(u);_.x=40,_.y=40,h.addWidget(_,m),h.setCurrentPageIndex(m),h.selectWidget(_.id,!1),v.log(`[Sidebar] Added new ${u} to page ${m}`)}catch(_){v.error("[Sidebar] Error creating widget from drop:",_)}return}const f=parseInt(p.dataTransfer.getData("text/plain"),10),y=o;this.handlePageReorder(f,y,p.clientY,s)},s.onclick=()=>{h.setCurrentPageIndex(o,{forceFocus:!0})},s.ondblclick=p=>{p.stopPropagation();const g=n.name||"",u=prompt("Rename Page:",g);u!==null&&u.trim()!==""&&u!==g&&h.renamePage(o,u)};const r=document.createElement("span");r.className="item-icon",r.innerHTML=`<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>`,s.appendChild(r);const a=document.createElement("span");a.className="label",a.textContent=n.name,s.appendChild(a);const l=document.createElement("div");l.style.marginLeft="auto",l.style.display="flex",l.style.gap="2px";const c=document.createElement("button");c.textContent="⚙",c.className="btn btn-secondary",c.style.padding="1px 4px",c.style.fontSize="8px",c.onclick=p=>{p.stopPropagation(),this.openPageSettings(o)},l.appendChild(c);const d=document.createElement("button");if(d.textContent="⧉",d.className="btn btn-secondary",d.style.padding="1px 4px",d.style.fontSize="8px",d.title="Duplicate Page",d.onclick=p=>{p.stopPropagation(),h.duplicatePage(o)},l.appendChild(d),e.length>1){const p=document.createElement("button");p.textContent="✕",p.className="btn btn-secondary",p.style.padding="1px 4px",p.style.fontSize="8px",p.style.color="var(--danger)",p.onclick=g=>{g.stopPropagation(),this.handlePageDelete(o,n)},l.appendChild(p)}s.appendChild(l),this.pageListEl.appendChild(s)}),this.currentPageNameEl){const n=h.getCurrentPage();this.currentPageNameEl.textContent=n?n.name:"None"}}handleAddPage(){h.addPage()}handlePageReorder(e,i,n,o){if(e===i)return;const s=o.getBoundingClientRect(),r=s.top+s.height/2;let a=i;n>=r&&a++,e<a&&a--,e!==a&&h.reorderPage(e,a)}handlePaletteClick(e){const i=document.getElementById("debug-overlay");i&&(i.innerHTML+="handlePaletteClick triggered<br>"),v.log("Sidebar: handlePaletteClick",e.target);const n=e.target.closest(".item[data-widget-type]");if(!n){v.log("Sidebar: No item found"),i&&(i.innerHTML+="No item found<br>");return}const o=n.getAttribute("data-widget-type");v.log("Sidebar: Creating widget of type",o),i&&(i.innerHTML+="Creating widget: "+o+"<br>");try{const s=ee.createWidget(o);v.log("Sidebar: Widget created",s),i&&(i.innerHTML+="Widget created<br>"),h.addWidget(s),v.log("Sidebar: Widget added to state"),window.app&&window.app.canvas&&(window.app.canvas.suppressNextFocus=!0),i&&(i.innerHTML+="Widget added to state<br>")}catch(s){v.error("Sidebar: Error creating/adding widget",s),i&&(i.innerHTML+="Error: "+s.message+"<br>")}}openPageSettings(e){if(window.app&&window.app.pageSettings)window.app.pageSettings.open(e);else{v.error("Sidebar: PageSettings instance not found on window.app");const i=h.pages[e];window.currentPageSettingsTarget=i;const n=document.getElementById("pageSettingsModal");n&&(n.classList.remove("hidden"),n.style.display="flex")}}handlePageDelete(e,i){const n=document.createElement("div");n.className="modal-backdrop",n.style.display="flex",n.innerHTML=`
            <div class="modal" style="width: 320px; height: auto; min-height: 150px; padding: var(--space-4);">
                <div class="modal-header" style="font-size: var(--fs-md); padding-bottom: var(--space-2);">
                    <div>Delete Page</div>
                </div>
                <div class="modal-body" style="padding: var(--space-2) 0;">
                    <p style="margin-bottom: var(--space-3); font-size: var(--fs-sm);">
                        Are you sure you want to delete the page <b>"${i.name}"</b>?
                        <br><br>
                        This action cannot be undone.
                    </p>
                </div>
                <div class="modal-actions" style="padding-top: var(--space-3); border-top: 1px solid var(--border-subtle);">
                    <button class="btn btn-secondary close-btn btn-xs">Cancel</button>
                    <button class="btn btn-primary confirm-btn btn-xs" style="background: var(--danger); color: white; border: none;">Delete</button>
                </div>
            </div>
        `,document.body.appendChild(n);const o=()=>n.remove(),s=()=>{o();try{typeof h.deletePage=="function"?h.deletePage(e):(console.error("AppState.deletePage is missing"),typeof A=="function"&&A("Error: AppState.deletePage not found","error"))}catch(r){console.error("[Sidebar] Error deleting page:",r),typeof A=="function"&&A("Error deleting page: "+r.message,"error")}};n.querySelectorAll(".close-btn").forEach(r=>r.onclick=o),n.querySelector(".confirm-btn").onclick=s,n.onclick=r=>{r.target===n&&o()}}handleClearPage(){const e=h||h;if(!e){console.error("[Sidebar] AppState is not defined!"),typeof A=="function"&&A("Error: Application State is not ready.","error");return}const i=document.createElement("div");i.className="modal-backdrop",i.style.display="flex",i.innerHTML=`
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
        `,document.body.appendChild(i);const n=()=>{i.remove()},o=()=>{n();try{console.log("[Sidebar] Executing clearCurrentPage...");const a=e.clearCurrentPage(!0);a.preserved>0&&typeof A=="function"?A(`Cleared ${a.deleted} widgets. ${a.preserved} locked widget(s) were preserved.`,"info"):a.deleted>0?A(`Cleared all ${a.deleted} widgets.`,"success"):a.preserved>0?A(`No widgets cleared. ${a.preserved} locked widget(s) preserved.`,"info"):A("Page is already empty.","info"),v.log("Cleared widgets from current page via AppState")}catch(a){console.error("[Sidebar] Error clearing page:",a),typeof A=="function"&&A("Error clearing page: "+a.message,"error")}};i.querySelectorAll(".close-btn").forEach(a=>a.onclick=n);const r=i.querySelector(".confirm-btn");r.onclick=o,i.onclick=a=>{a.target===i&&n()}}setupMobileToggles(){const e=document.getElementById("mobileWidgetsBtn"),i=document.getElementById("mobilePropsBtn"),n=document.getElementById("mobileDeviceBtn"),o=document.getElementById("mobileBackdrop"),s=document.querySelector(".sidebar"),r=document.querySelector(".right-panel"),a=()=>{s?.classList.remove("mobile-active"),r?.classList.remove("mobile-active"),o?.classList.remove("active")};e?.addEventListener("click",()=>{const d=s?.classList.contains("mobile-active");a(),d||(s?.classList.add("mobile-active"),o?.classList.add("active"))}),i?.addEventListener("click",()=>{const d=r?.classList.contains("mobile-active");a(),d||(r?.classList.add("mobile-active"),o?.classList.add("active"))}),n?.addEventListener("click",()=>{a(),window.app?.deviceSettings?.open()}),document.getElementById("mobileEditorSettingsBtn")?.addEventListener("click",()=>{a(),window.app?.editorSettings?.open()}),o?.addEventListener("click",a),F(I.SELECTION_CHANGED,()=>{window.innerWidth<=768&&(s?.classList.remove("mobile-active"),!r?.classList.contains("mobile-active")&&!s?.classList.contains("mobile-active")&&o?.classList.remove("active"))});const c=this.handlePaletteClick.bind(this);this.handlePaletteClick=d=>{c(d),window.innerWidth<=768&&a()}}}function Xe(){return h&&h.deviceModel?h.deviceModel:window.currentDeviceModel||"reterminal_e1001"}function Ka(t){if(D&&D[t])return D[t].name;switch(t){case"reterminal_e1002":return"reTerminal E1002 (6-Color)";case"esp32_s3_photopainter":return"Waveshare PhotoPainter (7-Color)";case"trmnl":return"Official TRMNL (ESP32-C3)";case"reterminal_e1001":default:return"reTerminal E1001 (Monochrome)"}}function pn(){const t=Xe();return!!(D&&D[t]&&(D[t].features?.lcd||D[t].features?.oled))}function He(){const t=h?.settings?.renderingMode||"direct";if(t==="oepl"||t==="opendisplay"){const n=(h?.project?.protocolHardware||{}).colorMode||"bw";return n==="full_color"?["black","white","red","green","blue","yellow","orange","gray","purple","cyan","magenta"]:n==="color_3"?["black","white","red","yellow","gray"]:["theme_auto","black","white","gray"]}if(pn())return["black","white","red","green","blue","yellow","orange","gray","purple","cyan","magenta"];const e=Xe();return e==="reterminal_e1002"?["theme_auto","black","white","gray","red","green","blue","yellow"]:e==="esp32_s3_photopainter"?["theme_auto","black","white","gray","red","green","blue","yellow"]:["theme_auto","black","white","gray"]}function un(t){if(!t)return"#000000";if(t.startsWith("#"))return t;if(t.startsWith("0x"))return"#"+t.substring(2);switch(t.toLowerCase()){case"theme_auto":return window.WidgetFactory?.getEffectiveDarkMode?.()||!1?"#ffffff":"#000000";case"theme_auto_inverse":return window.WidgetFactory?.getEffectiveDarkMode?.()||!1?"#000000":"#ffffff";case"white":return"#ffffff";case"red":return"#ff0000";case"green":return"#00ff00";case"blue":return"#0000ff";case"yellow":return"#ffff00";case"orange":return"#ffa500";case"gray":return"#a0a0a0";case"transparent":return"transparent";case"black":default:return"#000000"}}window.getDeviceModel=Xe;window.getDeviceDisplayName=Ka;window.isRGBDevice=pn;window.getAvailableColors=He;window.getColorStyle=un;function ve(t){if(!t.canvas)return;const e=h.pages,i=h.getCanvasDimensions();t.canvas.querySelectorAll(".snap-guide");const n=t.canvas.querySelector(".lasso-selection");t.canvas.innerHTML="",h.settings.editor_light_mode?t.canvas.classList.add("light-mode"):t.canvas.classList.remove("light-mode");const o=h.getCurrentPage();o&&Wn(o)?t.viewport&&t.viewport.classList.add("device-dark-mode"):t.viewport&&t.viewport.classList.remove("device-dark-mode"),e.forEach((l,c)=>{const d=i.width,p=i.height,g=document.createElement("div");g.className="artboard-wrapper",g.dataset.index=c,c===h.currentPageIndex&&g.classList.add("active-page");const u=document.createElement("div");u.className="artboard-header",u.appendChild(Le("mdi-cog-outline","Page Settings",()=>{window.pageSettings&&window.pageSettings.open(c)}));const f=document.createElement("span");f.className="artboard-name",f.textContent=l.name||`Page ${c+1} `,u.appendChild(f);const y=document.createElement("div");y.className="artboard-actions",c>0&&y.appendChild(Le("mdi-chevron-left","Move Left",()=>{h.reorderPage(c,c-1)})),c<e.length-1&&y.appendChild(Le("mdi-chevron-right","Move Right",()=>{h.reorderPage(c,c+1)})),y.appendChild(Le("mdi-plus","Add Page After",()=>{h.addPage(c+1)})),y.appendChild(Le("mdi-eraser","Clear Current Page",()=>{Fn({title:"Clear Page",message:`Are you sure you want to clear all widgets from < b > "${l.name||`Page ${c+1}`}"</b >? <br><br>This cannot be undone.`,confirmLabel:"Clear Page",confirmClass:"btn-danger",onConfirm:()=>{h.setCurrentPageIndex(c),h.clearCurrentPage()}})})),y.appendChild(Le("mdi-delete-outline","Delete Page",()=>{Fn({title:"Delete Page",message:`Are you sure you want to delete the page <b>"${l.name||`Page ${c+1}`}"</b>?<br><br>All widgets on this page will be lost.`,confirmLabel:"Delete Page",confirmClass:"btn-danger",onConfirm:()=>{h.deletePage(c)}})})),u.appendChild(y);const m=document.createElement("div");m.className="artboard-header-container",m.style.width=d+"px",m.appendChild(u);const _=320;if(d<_){const w=d/_;u.style.width=_+"px",u.style.transform=`scale(${w})`,u.style.transformOrigin="top left",m.style.height=40*w+"px"}else u.style.width="100%",u.style.transform="none",m.style.height="auto";g.appendChild(m);const b=h.getCanvasShape(),S=b==="round"||b==="circle",x=document.createElement("div");x.className="artboard",x.dataset.index=c,x.style.width=`${d}px`,x.style.height=`${p}px`;const E=Wn(l);if(x.classList.toggle("dark",E),x.classList.toggle("round-display",S),h.showGrid){const w=document.createElement("div");w.className="canvas-grid",x.appendChild(w)}h.showDebugGrid&&el(x),l.layout&&/^\d+x\d+$/.test(l.layout)&&Ja(x,l.layout,i,E);for(const w of l.widgets){const C=document.createElement("div");C.className="widget",C.style.left=w.x+"px",C.style.top=w.y+"px",C.style.width=w.width+"px",C.style.height=w.height+"px",C.dataset.id=w.id,C.dataset.pageIndex=c,h.selectedWidgetIds.includes(w.id)&&C.classList.add("active"),w.locked&&C.classList.add("locked"),w.hidden&&C.classList.add("hidden-widget");const k=(w.type||"").toLowerCase(),L=H.get(k);if(k==="group")C.classList.add("widget-group"),C.innerHTML="";else if(L&&L.render)try{const O=z=>{if(z==="theme_auto")return E?"#ffffff":"#000000";if(z==="theme_auto_inverse")return E?"#000000":"#ffffff";const J=z;return J?un(J):E?"#ffffff":"#000000"},R=h.selectedWidgetIds.includes(w.id),B=h.settings.device_model||"reterminal_e1001",W=D?D[B]:null;L.render(C,w,{getColorStyle:O,selected:R,profile:W,isDark:E})}catch{C.textContent=`Error: ${k}`,C.style.border="2px solid red"}else C.innerText=`Missing: ${k}`,C.style.color="red",C.style.border="1px dashed red";k!=="group"&&Qa(C),x.appendChild(C)}g.appendChild(x),t.canvas.appendChild(g)});const s=document.createElement("div");s.className="add-page-placeholder",s.title="Click to add a new page",s.style.width=`${i.width}px`,s.style.height=`${i.height}px`,s.style.marginTop="32px",s.style.position="relative",s.style.zIndex="2000",s.style.pointerEvents="auto",s.innerHTML=`
    <div class="plus-icon">+</div>
    <div class="label">Add Page</div>
    `;const r=h.getCanvasShape();(r==="round"||r==="circle")&&s.classList.add("round-display");const a=l=>{if(v.log("[Canvas] Add Page placeholder clicked"),l.stopPropagation(),l.preventDefault(),h.addPage()){const d=h.pages.length-1;window.app&&window.app.canvas&&(window.app.canvas.suppressNextFocus=!0),h.setCurrentPageIndex(d)}};s.addEventListener("mousedown",l=>l.stopPropagation()),s.addEventListener("click",a),t.canvas.appendChild(s),n&&t.canvas.appendChild(n),hn(t)}function Wn(t){const e=t?.dark_mode;return e==="dark"?!0:e==="light"?!1:!!h.settings.darkMode}function Ja(t,e,i,n){const o=e.match(/^(\d+)x(\d+)$/);if(!o)return;const s=parseInt(o[1],10),r=parseInt(o[2],10),a=document.createElement("div");a.className="lvgl-grid-overlay",a.style.cssText=`
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    display: grid;
    grid-template-rows: repeat(${s}, 1fr);
    grid-template-columns: repeat(${r}, 1fr);
    pointer-events: none;
    z-index: 1;
    `;const l=n?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)",c=n?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.25)";for(let d=0;d<s;d++)for(let p=0;p<r;p++){const g=document.createElement("div");g.style.cssText=`border: 1px dashed ${l}; position: relative; box-sizing: border-box;`;const u=document.createElement("span");u.textContent=`${d},${p}`,u.style.cssText=`position: absolute; top: 2px; left: 4px; font-size: 8px; color: ${c}; pointer-events: none;`,g.appendChild(u),a.appendChild(g)}t.appendChild(a)}function le(t){const e=h.zoomLevel,i=h.settings;t.canvasContainer&&(t.canvasContainer.style.transform=`translate(${t.panX}px, ${t.panY}px) scale(${e})`,t.canvasContainer.style.transformOrigin="0 0");const n=(i.grid_opacity!==void 0?i.grid_opacity:8)/100;document.documentElement.style.setProperty("--grid-opacity",n.toString());const o=document.getElementById("zoomLevel");o&&(o.textContent=Math.round(e*100)+"%")}function _t(t,e,i=!0,n=!1){const s=t.canvas.querySelectorAll(".artboard-wrapper")[e];if(s){const r=t.viewport.getBoundingClientRect(),a=r.width,l=r.height;if(a===0||l===0){requestAnimationFrame(()=>_t(t,e,i,n));return}if(n){const g=Co(t,e);h.setZoomLevel(g)}const c=h.zoomLevel,d=s.offsetLeft+s.offsetWidth/2,p=s.offsetTop+s.offsetHeight/2;t.panX=a/2-d*c,t.panY=l/2-p*c,le(t)}}function Za(t,e=!0){const i=t.canvas.querySelectorAll(".artboard-wrapper");if(i.length===0)return;let n=1/0,o=1/0,s=-1/0,r=-1/0;i.forEach(b=>{const S=b.offsetLeft,x=b.offsetTop,E=b.offsetWidth,w=b.offsetHeight;n=Math.min(n,S),o=Math.min(o,x),s=Math.max(s,S+E),r=Math.max(r,x+w)});const a=t.viewport.getBoundingClientRect(),l=a.width,c=a.height;if(l===0||c===0)return;const d=80,p=s-n+d,g=r-o+d,u=l/p,f=c/g;let y=Math.min(u,f);y=Math.max(.05,Math.min(2,y)),h.setZoomLevel(y);const m=n+(s-n)/2,_=o+(r-o)/2;t.panX=l/2-m*y,t.panY=c/2-_*y,le(t)}function Co(t,e=h.currentPageIndex){const n=t.canvas.querySelectorAll(".artboard-wrapper")[e];if(!n)return 1;const o=t.viewport.getBoundingClientRect(),s=64,r=n.offsetWidth+s,a=n.offsetHeight+s,l=o.width/r,c=o.height/a,d=Math.min(l,c),p=Math.min(o.width,o.height),g=Math.max(.15,Math.min(1,p/800));return Math.max(g,Math.min(4,d))}function ko(t,e,i=!1){if(!e||!e.id)return;const n=t.canvas.querySelector(`.widget[data-id="${e.id}"]`);if(n){n.style.left=e.x+"px",n.style.top=e.y+"px",n.style.width=e.width+"px",n.style.height=e.height+"px";const o=(e.type||"").toLowerCase(),s=H?H.get(o):null;if(o==="group")n.classList.add("widget-group");else if(!i&&s&&s.render)try{const r=d=>d==="theme_auto"?ze()?"#ffffff":"#000000":d==="theme_auto_inverse"?ze()?"#000000":"#ffffff":d?un(d):ze()?"#ffffff":"#000000",a=h.selectedWidgetIds.includes(e.id),l=h.settings.device_model||"reterminal_e1001",c=D?D[l]:null;s.render(n,e,{getColorStyle:r,selected:a,profile:c,isDark:ze()})}catch{}}}function ze(){const e=h.getCurrentPage()?.dark_mode;return e==="dark"?!0:e==="light"?!1:!!h.settings.darkMode}function Qa(t){["tl","tc","tr","rc","br","bc","bl","lc"].forEach(i=>{const n=document.createElement("div");n.className=`widget-resize-handle handle-${i}`,n.dataset.handle=i,t.appendChild(n)})}function hn(t){const e=h.selectedWidgetIds,i=t.canvas.querySelector(`.artboard-wrapper[data-index="${h.currentPageIndex}"]`),n=i?i.querySelector(".artboard"):null;let o=t.canvas.querySelector(".context-toolbar");if(e.length===0||t.dragState||t.lassoState||!n){o&&o.remove();return}const s=h.getSelectedWidgets();if(s.length===0||!i||!n){o&&o.remove();return}let r=1/0,a=1/0,l=-1/0,c=-1/0;s.forEach(u=>{r=Math.min(r,u.x),a=Math.min(a,u.y),l=Math.max(l,u.x+(u.width||0)),c=Math.max(c,u.y+(u.height||0))});const d=r,p=n.offsetTop+a-45;if(o?o.parentElement!==i&&i.appendChild(o):(o=document.createElement("div"),o.className="context-toolbar",i.appendChild(o)),o.style.left=d+"px",o.style.top=p+"px",o.innerHTML="",e.length>1&&([{icon:"mdi-align-horizontal-left",title:"Align Left",action:"left"},{icon:"mdi-align-horizontal-center",title:"Align Center",action:"center"},{icon:"mdi-align-horizontal-right",title:"Align Right",action:"right"},{separator:!0},{icon:"mdi-align-vertical-top",title:"Align Top",action:"top"},{icon:"mdi-align-vertical-center",title:"Align Middle",action:"middle"},{icon:"mdi-align-vertical-bottom",title:"Align Bottom",action:"bottom"}].forEach(f=>{if(f.separator){Je(o);return}Fe(o,f.icon,f.title,()=>h.alignSelectedWidgets(f.action))}),e.length>=3&&(Je(o),Fe(o,"mdi-distribute-horizontal-center","Distribute Horizontally",()=>h.distributeSelectedWidgets("horizontal")),Fe(o,"mdi-distribute-vertical-center","Distribute Vertically",()=>h.distributeSelectedWidgets("vertical")))),s.some(u=>u.type==="group"||u.parentId)?(o.children.length>0&&Je(o),Fe(o,"mdi-ungroup","Ungroup (Ctrl+Shift+G)",()=>h.ungroupSelection())):e.length>1&&(o.children.length>0&&Je(o),Fe(o,"mdi-group","Group Selection (Ctrl+G)",()=>h.groupSelection())),o.children.length===0){o.remove();return}}function Fe(t,e,i,n){const o=document.createElement("button");o.className="btn-icon",o.title=i,o.innerHTML=`<i class="mdi ${e}"></i>`,o.onclick=s=>{s.stopPropagation(),n()},t.appendChild(o)}function Je(t){if(!t.lastElementChild||t.lastElementChild.classList.contains("separator"))return;const e=document.createElement("div");e.className="separator",t.appendChild(e)}function Le(t,e,i){const n=document.createElement("button");return n.className="artboard-btn",n.title=e,n.innerHTML=`<i class="mdi ${t}"></i>`,n.onclick=o=>{o.stopPropagation(),i()},n}function Fn({title:t,message:e,confirmLabel:i,confirmClass:n,onConfirm:o}){const s=document.createElement("div");s.className="modal-backdrop",s.style.display="flex",s.innerHTML=`
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
            <button class="btn ${n} confirm-btn btn-xs" style="border-radius: 6px;">${i||"Confirm"}</button>
        </div>
    </div>
    `,document.body.appendChild(s);const r=s.querySelector(".close-btn"),a=s.querySelector(".confirm-btn");r.onclick=()=>s.remove(),a.onclick=()=>{o(),s.remove()}}function el(t,e,i){const n=document.createElement("div");n.className="debug-grid-overlay",t.appendChild(n)}const $n=Object.freeze(Object.defineProperty({__proto__:null,applyZoom:le,calculateZoomToFit:Co,focusPage:_t,getEffectiveDarkMode:ze,render:ve,renderContextToolbar:hn,updateWidgetDOM:ko,zoomToFitAll:Za},Symbol.toStringTag,{value:"Module"}));class tl{constructor(e){this.canvasInstance=e,this.topRuler=document.getElementById("rulerTop"),this.leftRuler=document.getElementById("rulerLeft"),this.container=document.querySelector(".canvas-rulers"),this.viewport=e.viewport,this.indicators=null,this.init()}init(){!this.topRuler||!this.leftRuler||(this.topCtx=this.createRulerCanvas(this.topRuler),this.leftCtx=this.createRulerCanvas(this.leftRuler),this.update())}createRulerCanvas(e){const i=document.createElement("canvas");return e.appendChild(i),i.getContext("2d")}setIndicators(e){this.indicators=e,this.update()}update(){if(!h.showRulers){this.container&&(this.container.style.display="none"),this.viewport&&this.viewport.classList.remove("with-rulers");return}this.container&&(this.container.style.display="block"),this.viewport&&this.viewport.classList.add("with-rulers");const e=document.querySelector(".artboard-wrapper.active-page .artboard");if(!e)return;const i=this.topRuler.getBoundingClientRect(),n=this.leftRuler.getBoundingClientRect(),o=e.getBoundingClientRect(),s=h.zoomLevel;this.drawHorizontal(i,o,s),this.drawVertical(n,o,s)}drawHorizontal(e,i,n){const o=this.topCtx,s=o.canvas,r=window.devicePixelRatio||1;(s.width!==e.width*r||s.height!==e.height*r)&&(s.width=e.width*r,s.height=e.height*r,o.scale(r,r),s.style.width=e.width+"px",s.style.height=e.height+"px"),o.clearRect(0,0,e.width,e.height);const a=i.left-e.left;if(this.indicators){const d=a+this.indicators.x*n,p=(this.indicators.w||0)*n;o.fillStyle="hsla(var(--accent-h), 85%, 65%, 0.15)",o.fillRect(d,0,p,e.height),o.fillStyle="var(--accent)",o.fillRect(d,e.height-2,p,2)}o.strokeStyle="#4b5563",o.fillStyle="#9ca3af",o.font='9px "JetBrains Mono", monospace',o.lineWidth=1;const l=Math.floor(-a/n/10)*10,c=Math.ceil((e.width-a)/n/10)*10;for(let d=l;d<=c;d+=10){const p=a+d*n;if(p<0||p>e.width)continue;const g=d%100===0,u=d%50===0,f=g?12:u?8:4;o.beginPath(),o.moveTo(p,e.height),o.lineTo(p,e.height-f),o.stroke(),g&&o.fillText(d.toString(),p+2,10)}}drawVertical(e,i,n){const o=this.leftCtx,s=o.canvas,r=window.devicePixelRatio||1;(s.width!==e.width*r||s.height!==e.height*r)&&(s.width=e.width*r,s.height=e.height*r,o.scale(r,r),s.style.width=e.width+"px",s.style.height=e.height+"px"),o.clearRect(0,0,e.width,e.height);const a=i.top-e.top;if(this.indicators){const d=a+this.indicators.y*n,p=(this.indicators.h||0)*n;o.fillStyle="hsla(var(--accent-h), 85%, 65%, 0.15)",o.fillRect(0,d,e.width,p),o.fillStyle="var(--accent)",o.fillRect(e.width-2,d,2,p)}o.strokeStyle="#4b5563",o.fillStyle="#9ca3af",o.font='9px "JetBrains Mono", monospace',o.lineWidth=1;const l=Math.floor(-a/n/10)*10,c=Math.ceil((e.height-a)/n/10)*10;for(let d=l;d<=c;d+=10){const p=a+d*n;if(p<0||p>e.height)continue;const g=d%100===0,u=d%50===0,f=g?12:u?8:4;o.beginPath(),o.moveTo(e.width,p),o.lineTo(e.width-f,p),o.stroke(),g&&(o.save(),o.translate(10,p+2),o.rotate(-Math.PI/2),o.fillText(d.toString(),0,0),o.restore())}}}function nl(t){t.viewport&&(t.viewport.addEventListener("dragenter",e=>{t.dragState||(t.isExternalDragging=!0)}),t.viewport.addEventListener("dragover",e=>{e.preventDefault(),e.dataTransfer.dropEffect="copy",t.dragState||(t.isExternalDragging=!0);const i=e.target.closest(".artboard-wrapper");document.querySelectorAll(".artboard-wrapper.drag-over").forEach(o=>{o!==i&&o.classList.remove("drag-over")}),i&&i.classList.add("drag-over");const n=e.target.closest(".add-page-placeholder");if(n)n.classList.add("drag-over");else{const o=document.querySelector(".add-page-placeholder.drag-over");o&&o.classList.remove("drag-over")}}),t.viewport.addEventListener("dragleave",e=>{(e.relatedTarget===null||!t.viewport.contains(e.relatedTarget))&&(t.isExternalDragging=!1,document.querySelectorAll(".artboard-wrapper.drag-over, .add-page-placeholder.drag-over").forEach(i=>{i.classList.remove("drag-over")}))}),t.viewport.addEventListener("drop",async e=>{e.preventDefault(),e.stopPropagation(),t.isExternalDragging=!1,document.querySelectorAll(".artboard-wrapper.drag-over, .add-page-placeholder.drag-over").forEach(d=>{d.classList.remove("drag-over")});const i=e.dataTransfer.getData("application/widget-type")||e.dataTransfer.getData("text/plain");if(!i)return;const n=e.clientX,o=e.clientY;let s=e.target;s===t.viewport&&(s=document.elementFromPoint(n,o));const r=s?.closest(".artboard-wrapper"),a=s?.closest(".add-page-placeholder");let l=-1,c=null;if(r){l=parseInt(r.dataset.index,10);const d=r.querySelector(".artboard");d&&(c=d.getBoundingClientRect())}else if(a)l=h.pages.length;else{l=h.currentPageIndex;const d=t.canvas.querySelector(`.artboard[data-index="${l}"]`);d&&(c=d.getBoundingClientRect())}v.log("[Canvas] Atomic drop capture - type:",i,"page:",l);try{const d=H.load(i);if(a){if(!h.addPage())return;l=h.pages.length-1,await new Promise(m=>setTimeout(m,50));const y=t.canvas.querySelector(`.artboard[data-index="${l}"]`);y&&(c=y.getBoundingClientRect())}await d;const p=ee.createWidget(i);if(!p){v.error("[Canvas] WidgetFactory.createWidget returned null for type:",i);return}const g=h.zoomLevel,u=h.getCanvasDimensions();if(c){const f=(n-c.left)/g,y=(o-c.top)/g;p.x=Math.round(f-p.width/2),p.y=Math.round(y-p.height/2)}else v.warn("[Canvas] No targetRect, using fallback position"),p.x=40,p.y=40;p.x=Math.max(0,Math.min(u.width-p.width,p.x)),p.y=Math.max(0,Math.min(u.height-p.height,p.y)),t.suppressNextFocus=!0,h.addWidget(p,l),h.currentPageIndex!==l&&h.setCurrentPageIndex(l),h.selectWidget(p.id,!1),v.log(`[Canvas] Successfully added ${i} at (${p.x}, ${p.y})`)}catch(d){v.error("[Canvas] error creating widget from drop:",d)}}))}function il(t){t.viewport&&t.viewport.addEventListener("mousedown",e=>{if(e.button===1){e.preventDefault(),e.stopPropagation(),t.panState={startX:e.clientX,startY:e.clientY,startPanX:t.panX,startPanY:t.panY},t.viewport.style.cursor="grabbing",document.body.classList.add("panning-active");const i=o=>{if(t.panState){const s=o.clientX-t.panState.startX,r=o.clientY-t.panState.startY;t.panX=t.panState.startPanX+s,t.panY=t.panState.startPanY+r,le(t)}},n=()=>{t.panState=null,t.viewport.style.cursor="auto",document.body.classList.remove("panning-active"),window.removeEventListener("mousemove",i),window.removeEventListener("mouseup",n)};window.addEventListener("mousemove",i),window.addEventListener("mouseup",n)}})}function ol(t){const e=document.getElementById("zoomInBtn"),i=document.getElementById("zoomOutBtn"),n=document.getElementById("zoomResetBtn"),o=document.getElementById("gridToggleBtn"),s=document.getElementById("debugGridToggleBtn"),r=document.getElementById("rulersToggleBtn"),a=document.getElementById("editorGridOpacity");e&&e.addEventListener("click",()=>Gt(t)),i&&i.addEventListener("click",()=>Wt(t)),n&&n.addEventListener("click",()=>nt(t)),o&&(o.classList.toggle("active",!!h.showGrid),o.addEventListener("click",()=>{const l=!h.showGrid;h.setShowGrid(l),l&&(h.setShowDebugGrid(!1),s&&s.classList.remove("active")),o.classList.toggle("active",l),P(I.STATE_CHANGED)})),s&&(s.classList.toggle("active",!!h.showDebugGrid),s.addEventListener("click",()=>{const l=!h.showDebugGrid;h.setShowDebugGrid(l),l&&(h.setShowGrid(!1),o&&o.classList.remove("active")),s.classList.toggle("active",l),P(I.STATE_CHANGED)})),r&&(r.classList.toggle("active",!!h.showRulers),r.addEventListener("click",()=>{const l=!h.showRulers;h.setShowRulers(l),r.classList.toggle("active",l),v.log(`[Canvas] Rulers toggled: ${l}`)})),a&&a.addEventListener("input",l=>{h.updateSettings({grid_opacity:parseInt(l.target.value,10)})}),t.canvasContainer&&t.canvasContainer.addEventListener("wheel",l=>{l.preventDefault(),zn(l,t)},{passive:!1}),t.viewport&&t.viewport.addEventListener("wheel",l=>{l.preventDefault(),zn(l,t)},{passive:!1}),document.addEventListener("keydown",l=>{l.ctrlKey&&(l.key==="+"||l.key==="=")?(l.preventDefault(),Gt(t)):l.ctrlKey&&l.key==="-"?(l.preventDefault(),Wt(t)):l.ctrlKey&&l.key==="0"||l.ctrlKey&&l.key.toLowerCase()==="r"?(l.preventDefault(),nt(t)):l.ctrlKey&&l.key.toLowerCase()==="g"&&(l.preventDefault(),l.shiftKey?h.ungroupSelection():h.groupSelection())})}function zn(t,e){const i=h.zoomLevel;let n=0;if(t.ctrlKey)n=t.deltaY>0?-.02:.02;else if(t.deltaMode===0&&t.deltaX===0&&Math.abs(t.deltaY)>=50)n=t.deltaY>0?-.05:.05;else{e.panX-=t.deltaX,e.panY-=t.deltaY,le(e);return}if(n===0)return;const o=Math.min(Math.max(i+n,.1),5);if(o===i)return;const s=e.viewport.getBoundingClientRect(),r=t.clientX-s.left,a=t.clientY-s.top,l=(r-e.panX)/i,c=(a-e.panY)/i;e.panX=r-l*o,e.panY=a-c*o,h.setZoomLevel(o),le(e)}function Gt(t){Po(.05,t)}function Wt(t){Po(-.05,t)}function Po(t,e){const i=h.zoomLevel,n=Math.min(Math.max(i+t,.1),5);if(n!==i){if(e&&e.viewport){const o=e.viewport.getBoundingClientRect(),s=o.width/2,r=o.height/2,a=(s-e.panX)/i,l=(r-e.panY)/i;e.panX=s-a*n,e.panY=r-l*n}h.setZoomLevel(n),e&&le(e)}}function nt(t){h.setZoomLevel(1),t.focusPage(h.currentPageIndex,!0)}function ue(){document.querySelectorAll(".snap-guide").forEach(e=>e.remove())}function Lo(t,e,i){const n=i||t.canvas;if(!n||typeof n.appendChild!="function")return;const o=document.createElement("div");o.className="snap-guide snap-guide-vertical",o.style.left=`${Math.round(e)}px`,n.appendChild(o)}function To(t,e,i){const n=i||t.canvas;if(!n||typeof n.appendChild!="function")return;const o=document.createElement("div");o.className="snap-guide snap-guide-horizontal",o.style.top=`${Math.round(e)}px`,n.appendChild(o)}function Mo(t,e){const i=h.getCurrentPage(),n=[],o=[];if(n.push(0,e.width/2,e.width),o.push(0,e.height/2,e.height),i&&Array.isArray(i.widgets))for(const s of i.widgets){if(!s||s.id===t)continue;const r=s.x,a=s.x+(s.width||0),l=s.y,c=s.y+(s.height||0),d=r+(s.width||0)/2,p=l+(s.height||0)/2;n.push(r,d,a),o.push(l,p,c)}return{vertical:n,horizontal:o}}function Un(t,e,i,n,o){const s=o||t.canvas;if(!s)return;const r=document.createElement("div");r.className=`snap-guide distance-marker distance-marker-${n}`;let a,l,c,d,p;if(n==="h"){const u=e.x<i.x?e.x+e.w:i.x+i.w,f=e.x<i.x?i.x:e.x;if(a=u,l=Math.min(e.y+e.h/2,i.y+i.h/2),c=f-u,c<=0)return;p=Math.round(c),r.style.left=`${a}px`,r.style.top=`${l}px`,r.style.width=`${c}px`,r.style.height="1px";const y=document.createElement("div");y.className="distance-marker-h-tick-start";const m=document.createElement("div");m.className="distance-marker-h-tick-end",r.appendChild(y),r.appendChild(m)}else{const u=e.y<i.y?e.y+e.h:i.y+i.h,f=e.y<i.y?i.y:e.y;if(l=u,a=Math.min(e.x+e.w/2,i.x+i.w/2),d=f-u,d<=0)return;p=Math.round(d),r.style.left=`${a}px`,r.style.top=`${l}px`,r.style.width="1px",r.style.height=`${d}px`;const y=document.createElement("div");y.className="distance-marker-v-tick-start";const m=document.createElement("div");m.className="distance-marker-v-tick-end",r.appendChild(y),r.appendChild(m)}const g=document.createElement("div");g.className="distance-marker-label",g.textContent=p,r.appendChild(g),s.appendChild(r)}function gn(t,e,i,n,o,s,r,a=!1){if(!h.snapEnabled||o)return ue(),{x:Math.round(i),y:Math.round(n)};const c=(h.getCurrentPage()?.widgets||[]).filter(w=>w.id!==e.id&&!w.hidden),d=Mo(e.id,s),p=e.width||0,g=e.height||0;let u=i,f=n,y=null,m=null;const _=[{val:i,apply:w=>u=w},{val:i+p/2,apply:w=>u=w-p/2},{val:i+p,apply:w=>u=w-p}];let b=_e+1;for(const w of _)for(const C of d.vertical){const k=Math.abs(w.val-C);k<=_e&&k<b&&(b=k,y=C,w.apply(C))}const S=[{val:n,apply:w=>f=w},{val:n+g/2,apply:w=>f=w-g/2},{val:n+g,apply:w=>f=w-g}];let x=_e+1;for(const w of S)for(const C of d.horizontal){const k=Math.abs(w.val-C);k<=_e&&k<x&&(x=k,m=C,w.apply(C))}const E={x:u,y:f,w:p,h:g};return ue(),y!=null&&Lo(t,y,r),m!=null&&To(t,m,r),a&&c.forEach(w=>{const C={x:w.x,y:w.y,w:w.width,h:w.height};if(E.y<C.y+C.h&&E.y+E.h>C.y){const O=E.x<C.x?C.x-(E.x+E.w):E.x-(C.x+C.w);O>0&&O<150&&Un(t,E,C,"h",r)}if(E.x<C.x+C.w&&E.x+E.w>C.x){const O=E.y<C.y?C.y-(E.y+E.h):E.y-(C.y+C.h);O>0&&O<150&&Un(t,E,C,"v",r)}}),{x:Math.round(u),y:Math.round(f)}}function fn(t,e,i,n,o,s){const r=o.match(/^(\d+)x(\d+)$/);if(!r)return{x:t,y:e};const a=parseInt(r[1],10),l=parseInt(r[2],10),c=s.width/l,d=s.height/a,p=t+i/2,g=e+n/2,u=Math.round(p/c-.5),f=Math.round(g/d-.5),y=Math.max(0,Math.min(l-1,u)),m=Math.max(0,Math.min(a-1,f));return{x:Math.round(y*c),y:Math.round(m*d)}}function Ao(t){const e=h.getCurrentPage();if(!e||!e.layout)return;const i=e.layout.match(/^(\d+)x(\d+)$/);if(!i)return;const n=h.getWidgetById(t);if(!n)return;const o=parseInt(i[1],10),s=parseInt(i[2],10),r=h.getCanvasDimensions(),a=r.width/s,l=r.height/o,c=n.x+n.width/2,d=n.y+n.height/2,p=Math.floor(c/a),g=Math.floor(d/l),u=Math.max(0,Math.min(o-1,g)),f=Math.max(0,Math.min(s-1,p)),y={...n.props,grid_cell_row_pos:u,grid_cell_column_pos:f},m=Math.max(1,Math.round(n.height/l)),_=Math.max(1,Math.round(n.width/a));y.grid_cell_row_span=m,y.grid_cell_column_span=_,h.updateWidget(t,{props:y})}function sl(t){const e=h.getWidgetById(t);if(!e)return;const i=h.getCanvasDimensions(),n=h.getCurrentPage();let o;if(n?.layout)o=fn(e.x,e.y,e.width,e.height,n.layout,i);else{const s=h.snapEnabled;h.setSnapEnabled(!0),o=gn({canvas:{querySelectorAll:()=>[]}},e,e.x,e.y,!1,i),h.setSnapEnabled(s)}o&&(h.updateWidget(t,{x:o.x,y:o.y}),Ao(t),h.recordHistory())}function Ze(t,e,i,n,o,s){if(!h.snapEnabled||n)return t;const r=Mo(i,o),a=e==="v"?r.vertical:r.horizontal;let l=_e+1,c=t,d=null;for(const p of a){const g=Math.abs(t-p);g<=_e&&g<l&&(l=g,c=p,d=p)}return d!==null&&(e==="v"?Lo({canvas:s},d,s):To({canvas:s},d,s)),c}let kt=0,Pt=null,jn=0,Yn=null;function rl(t,e,i,n,o,s){Ft(t);const r=document.createElement("div");r.className="drag-ghost-container",r.style.cssText=`
        position: fixed;
        pointer-events: none;
        z-index: 99999;
        opacity: 1.0; 
        transform-origin: top left;
        transform: scale(${o});
        transition: none;
    `;const a=t.dragState?.id,l=s.find(u=>u.id===a)||s[0],c=e.find(u=>u.id===l?.id)||e[0],d=document.querySelector(`.widget[data-id="${c.id}"]`);if(!c||!d)return;const p=[],g=h.getCurrentPage();e.forEach(u=>{if(p.push(u),u.type==="group"){const f=g.widgets.filter(y=>y.parentId===u.id);p.push(...f)}}),p.forEach(u=>{const f=document.querySelector(`.widget[data-id="${u.id}"]`);if(f){const y=f.closest(".artboard"),m=document.createElement("div");m.className=(y?y.className:"artboard")+" ghost-context-sim",m.style.cssText=`
                position: absolute;
                left: ${u.x-c.x}px;
                top: ${u.y-c.y}px;
                width: ${u.width}px;
                height: ${u.height}px;
                pointer-events: none;
                background: transparent !important;
                box-shadow: none !important;
                border: none !important;
                transform: none !important;
                overflow: visible;
                display: block;
            `;const _=document.createElement("div");for(const S of f.attributes)_.setAttribute(S.name,S.value);_.classList.remove("active","dragging-source","locked"),_.classList.add("drag-ghost-widget");const b=window.getComputedStyle(f);_.style.cssText=f.style.cssText,_.style.position="absolute",_.style.top="0",_.style.left="0",_.style.margin="0",_.style.transform="none",_.style.setProperty("background",b.background,"important"),_.style.setProperty("background-color",b.backgroundColor,"important"),_.style.setProperty("border",b.border,"important"),_.style.setProperty("border-radius",b.borderRadius,"important"),_.innerHTML=f.innerHTML,m.appendChild(_),r.appendChild(m)}}),l&&(t.dragGhostOffset={x:l.clickOffsetX*o,y:l.clickOffsetY*o}),document.body.appendChild(r),t.dragGhostEl=r,al(t,i,n),e.forEach(u=>{const f=document.querySelector(`.widget[data-id="${u.id}"]`);f&&f.classList.add("dragging-source")})}function al(t,e,i){if(!t.dragGhostEl||!t.dragGhostOffset)return;const n=t.dragGhostOffset,o=e-n.x,s=i-n.y;t.dragGhostEl.style.left=o+"px",t.dragGhostEl.style.top=s+"px"}function ll(t,e,i){t.dragGhostEl&&(t.dragGhostEl.style.left=e+"px",t.dragGhostEl.style.top=i+"px")}function Ft(t){t.dragGhostEl&&(t.dragGhostEl.remove(),t.dragGhostEl=null,t.dragGhostOffset=null),document.querySelectorAll(".widget.dragging-source").forEach(e=>{e.classList.remove("dragging-source")})}function dl(t,e,i,n){const o=t.canvas.querySelector(`.artboard-wrapper[data-index="${e}"]`);if(!o)return;const s=o.querySelector(".artboard-header");if(!s)return;const r=s.cloneNode(!0);r.classList.add("page-drag-ghost");const a=s.getBoundingClientRect(),l=i-a.left,c=n-a.top;r.style.cssText=`
        position: fixed;
        left: ${i}px;
        top: ${n}px;
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
    `,document.body.appendChild(r),t.pageDragGhost=r,t.pageDragOffset={x:l,y:c},o.classList.add("reordering")}function cl(t,e,i){t.pageDragGhost&&(t.pageDragGhost.style.left=e+"px",t.pageDragGhost.style.top=i+"px")}function pl(t,e){t.pageDragGhost&&(t.pageDragGhost.remove(),t.pageDragGhost=null);const i=t.canvas.querySelector(`.artboard-wrapper[data-index="${e}"]`);i&&i.classList.remove("reordering")}function ul(t,e){const i=h.getWidgetById(e);if(!i)return;const n=(i.type||"").toLowerCase();if(n!=="text"&&n!=="label")return;const o=t.canvas.querySelector(`.widget[data-id="${e}"]`);if(!o)return;const s=h.zoomLevel,r=o.getBoundingClientRect(),a=document.createElement("textarea");a.value=i.props.text||i.title||"",a.style.position="absolute",a.style.left=r.left+window.scrollX+"px",a.style.top=r.top+window.scrollY+"px",a.style.width=Math.max(50,r.width)+"px",a.style.height=Math.max(30,r.height)+"px",a.style.zIndex="99999";const l=i.props||{},c=(l.font_size||20)*s;a.style.fontSize=c+"px",a.style.fontFamily=(l.font_family||"Roboto")+", sans-serif",a.style.fontWeight=l.font_weight||400,a.style.fontStyle=l.italic?"italic":"normal",a.style.textAlign=(l.text_align||"LEFT").split("_").pop().toLowerCase(),a.style.color=l.color||"black",a.style.background="rgba(255, 255, 255, 0.9)",a.style.border="1px solid #1a73e8",a.style.padding="0px",a.style.resize="both",a.style.outline="none",a.style.overflow="hidden",a.style.lineHeight="1.2",document.body.appendChild(a),a.focus(),a.select();const d=()=>{if(!a.isConnected&&!a.parentElement)return;a.removeEventListener("blur",p),a.removeEventListener("keydown",g);const u=a.value;u!==(i.props.text||i.title)&&h.updateWidget(e,{props:{...i.props,text:u}}),a.remove()},p=()=>d(),g=u=>{u.key==="Enter"&&!u.shiftKey&&(u.preventDefault(),d()),u.key==="Escape"&&a.remove(),a.style.height=a.scrollHeight+"px"};a.addEventListener("blur",p),a.addEventListener("keydown",g)}function hl(t){t.canvas.addEventListener("mousedown",i=>{if(i.button!==0)return;ue();const n=i.target.closest(".artboard-wrapper");if(!n||i.target.closest(".artboard-btn")||i.target.closest("button")){document.activeElement&&!i.target.closest("button")&&document.activeElement.blur(),!i.target.closest("button")&&!i.target.closest(".artboard-btn")&&(h.selectWidgets([]),ve(t));return}const o=parseInt(n.dataset.index,10),s=n.querySelector(".artboard");let r=s;const a=i.target.closest(".widget");let l=a?.dataset.id;const c=h.currentPageIndex!==o,d=!!i.target.closest(".artboard-header");if(i.target.closest(".artboard"),c){const u=[...h.selectedWidgetIds];h.setCurrentPageIndex(o,{suppressFocus:!0}),l&&h.selectWidgets(u.includes(l)?u:[l]);const f=t.canvas.querySelector(`.artboard[data-index="${o}"]`);f&&(r=f)}else if(d){t.dragState={mode:"reorder-page",pageIndex:o,startX:i.clientX,startY:i.clientY},dl(t,o,i.clientX,i.clientY),window.addEventListener("mousemove",t._boundMouseMove),window.addEventListener("mouseup",t._boundMouseUp),i.preventDefault();return}const p=r.getBoundingClientRect(),g=h.zoomLevel;if(a){const u=a.dataset.id,f=i.shiftKey||i.ctrlKey,y=Date.now();if(u===Pt&&y-kt<300){ul(t,u),kt=0,Pt=null,i.preventDefault(),i.stopPropagation();return}kt=y,Pt=u,f?h.selectWidget(u,!0):h.selectedWidgetIds.includes(u)||h.selectWidget(u,!1);const m=h.getWidgetById(u);if(!m)return;let _=m,b=u;if(m.parentId){const x=h.getWidgetById(m.parentId);x&&(_=x,b=x.id,h.selectWidget(b,f))}if(i.target.classList.contains("widget-resize-handle")){if(m.parentId||_.locked)return;t.dragState={mode:"resize",handle:i.target.dataset.handle||"br",id:b,startX:i.clientX,startY:i.clientY,startW:_.width,startH:_.height,startWidgetX:_.x,startWidgetY:_.y,artboardEl:r,dragStartPanX:t.panX,dragStartPanY:t.panY}}else{if(_.locked)return;const x=h.getSelectedWidgets(),E=x.map(w=>{const C=t.canvas.querySelector(`.widget[data-id="${w.id}"]`);return C&&C.getBoundingClientRect(),p.left+w.x*g,p.top+w.y*g,{id:w.id,startX:w.x,startY:w.y,clickOffsetX:(i.clientX-p.left)/g-w.x,clickOffsetY:(i.clientY-p.top)/g-w.y}});t.dragState={mode:"move",id:b,widgets:E,artboardEl:r,dragStartX:i.clientX,dragStartY:i.clientY,dragStartPanX:t.panX,dragStartPanY:t.panY},rl(t,x,i.clientX,i.clientY,g,E),t.rulers&&t.rulers.setIndicators({x:_.x,y:_.y,w:_.width,h:_.height})}window.addEventListener("mousemove",t._boundMouseMove),window.addEventListener("mouseup",t._boundMouseUp),i.preventDefault()}else{const u=(i.clientX-p.left)/g,f=(i.clientY-p.top)/g,y=Date.now(),m=o===Yn&&y-jn<300;jn=y,Yn=o,t.lassoState={startTime:y,isDoubleClick:m,focusParams:m||c&&!l?{index:o,fitZoom:m}:null,startX:u,startY:f,rect:null,isAdditive:i.shiftKey||i.ctrlKey,initialSelection:[...h.selectedWidgetIds],artboardEl:r},t.lassoEl=document.createElement("div"),t.lassoEl.className="lasso-selection",s.appendChild(t.lassoEl),window.addEventListener("mousemove",t._boundMouseMove),window.addEventListener("mouseup",t._boundMouseUp),i.preventDefault()}}),t.canvas.addEventListener("contextmenu",i=>{if(t.pinchState||t.touchState?.hasMoved||t.dragState?.mode==="resize"||t.lassoState?.rect){i.preventDefault();return}i.preventDefault();const n=i.target.closest(".widget"),o=n?n.dataset.id:null;window.RadialMenu&&window.RadialMenu.show(i.clientX,i.clientY,o)});let e=document.querySelector(".debug-cursor-tooltip");e||(e=document.createElement("div"),e.className="debug-cursor-tooltip",document.body.appendChild(e)),t.canvas.addEventListener("mousemove",i=>{if(!h.showDebugGrid){e.style.display="none";return}const n=i.target.closest(".artboard");if(!n){e.style.display="none";return}const o=n.getBoundingClientRect(),s=h.zoomLevel,r=Math.round((i.clientX-o.left)/s),a=Math.round((i.clientY-o.top)/s);e.style.display="block",e.style.left=i.clientX+"px",e.style.top=i.clientY+"px",e.innerHTML=`<span>X:</span>${r} <span>Y:</span>${a}`}),t.canvas.addEventListener("mouseleave",()=>{e.style.display="none"})}function gl(t,e){const i=h.zoomLevel,n=h.getCanvasDimensions();if(e.dragState){if(e.dragState.mode==="move"){const o=document.querySelector(`.artboard[data-index="${h.currentPageIndex}"]`);if(!o)return;const s=(t.clientX-e.dragState.dragStartX)/i+(e.dragState.dragStartPanX-e.panX)/i,r=(t.clientY-e.dragState.dragStartY)/i+(e.dragState.dragStartPanY-e.panY)/i,a=h.getWidgetById(e.dragState.id);if(!a)return;const l=e.dragState.widgets.find(S=>S.id===e.dragState.id);if(!l)return;let c=l.startX+s,d=l.startY+r;const p=h.getCurrentPage();if(p?.layout&&!t.altKey){ue();const S=fn(c,d,a.width,a.height,p.layout,n);c=S.x,d=S.y}else if(h.snapEnabled&&!t.altKey){const S=gn(e,a,c,d,t.altKey,n,o,t.ctrlKey);c=S.x,d=S.y}else ue();const g=o.getBoundingClientRect(),u=g.left+c*i,f=g.top+d*i;ll(e,u,f);const y=c-l.startX,m=d-l.startY,_=y,b=m;for(const S of e.dragState.widgets){const x=h.getWidgetById(S.id);x&&!x.locked&&(x.x=S.startX+_,x.y=S.startY+b,x.type==="group"&&p.widgets.filter(w=>w.parentId===x.id).forEach(w=>{e.dragState.widgets.find(C=>C.id===w.id)||(w.x+=_-(e.dragState.lastDx||0),w.y+=b-(e.dragState.lastDy||0))}))}e.dragState.lastDx=_,e.dragState.lastDy=b,e.rulers&&e.rulers.setIndicators({x:c,y:d,w:a.width,h:a.height})}else if(e.dragState.mode==="resize"){const o=h.getWidgetById(e.dragState.id);if(!o)return;ue();const s=e.dragState,r=s.handle,a=(s.dragStartPanX-e.panX)/i,l=(s.dragStartPanY-e.panY)/i,c=(t.clientX-s.startX)/i+a,d=(t.clientY-s.startY)/i+l;let p=s.startWidgetX,g=s.startWidgetY,u=s.startW,f=s.startH;if(r.includes("l")){const _=s.startWidgetX+c;p=Ze(_,"v",o.id,t.altKey,n,s.artboardEl),u=s.startWidgetX+s.startW-p}else if(r.includes("r")){const _=s.startWidgetX+s.startW+c;u=Ze(_,"v",o.id,t.altKey,n,s.artboardEl)-s.startWidgetX}if(r.includes("t")){const _=s.startWidgetY+d;g=Ze(_,"h",o.id,t.altKey,n,s.artboardEl),f=s.startWidgetY+s.startH-g}else if(r.includes("b")){const _=s.startWidgetY+s.startH+d;f=Ze(_,"h",o.id,t.altKey,n,s.artboardEl)-s.startWidgetY}const y=4;isNaN(u)&&(u=s.startW),isNaN(f)&&(f=s.startH),u<y&&(r.includes("l")&&(p=s.startWidgetX+s.startW-y),u=y),f<y&&(r.includes("t")&&(g=s.startWidgetY+s.startH-y),f=y);const m=(o.type||"").toLowerCase();if(m==="line"||m==="lvgl_line"){const _=o.props||{},b=_.orientation||"horizontal",S=parseInt(_.stroke_width||_.line_width||3,10);b==="vertical"?(u=S,f=Math.max(10,f)):(f=S,u=Math.max(10,u))}if(p=Math.max(0,Math.min(n.width-u,p)),g=Math.max(0,Math.min(n.height-f,g)),o.x=Math.round(p),o.y=Math.round(g),o.width=Math.round(u),o.height=Math.round(f),m==="icon"||m==="weather_icon"||m==="battery_icon"||m==="wifi_signal"||m==="ondevice_temperature"||m==="ondevice_humidity"){const _=o.props||{};if(_.fit_icon_to_frame){const S=Math.max(8,Math.min(o.width-8,o.height-8));_.size=Math.round(S)}else{const b=Math.max(8,Math.min(o.width,o.height));_.size=Math.round(b)}}else if(m==="shape_circle"){const _=Math.max(o.width,o.height);o.width=_,o.height=_}ko(e,o),e.rulers&&e.rulers.setIndicators({x:o.x,y:o.y,w:o.width,h:o.height})}else if(e.dragState.mode==="reorder-page"){cl(e,t.clientX,t.clientY),document.querySelectorAll(".artboard-wrapper").forEach(r=>r.classList.remove("drag-over"));const s=document.elementFromPoint(t.clientX,t.clientY)?.closest(".artboard-wrapper");s&&parseInt(s.dataset.index,10)!==e.dragState.pageIndex&&s.classList.add("drag-over")}}else if(e.lassoState){const o=e.lassoState.artboardEl;if(!o)return;const s=o.getBoundingClientRect(),r=(t.clientX-s.left)/i,a=(t.clientY-s.top)/i,l=Math.min(e.lassoState.startX,r),c=Math.min(e.lassoState.startY,a),d=Math.abs(r-e.lassoState.startX),p=Math.abs(a-e.lassoState.startY);e.lassoState.rect={x:l,y:c,w:d,h:p},e.lassoEl&&(e.lassoEl.style.left=l+"px",e.lassoEl.style.top=c+"px",e.lassoEl.style.width=d+"px",e.lassoEl.style.height=p+"px");const g=h.getCurrentPage();if(g){const u=new Set(e.lassoState.isAdditive?e.lassoState.initialSelection:[]);e.lassoState.currentSelection=[];const f={x1:l,y1:c,x2:l+d,y2:c+p};for(const y of g.widgets){const m={x1:y.x,y1:y.y,x2:y.x+y.width,y2:y.y+y.height},_=!(m.x2<f.x1||m.x1>f.x2||m.y2<f.y1||m.y1>f.y2),b=e.canvas.querySelector(`.widget[data-id="${y.id}"]`);b&&(_?(b.classList.add("active"),u.add(y.id)):e.lassoState.isAdditive&&e.lassoState.initialSelection.includes(y.id)?b.classList.add("active"):b.classList.remove("active"))}e.lassoState.currentSelection=Array.from(u),h.selectWidgets(e.lassoState.currentSelection)}t.preventDefault(),t.stopPropagation()}}function fl(t,e){if(e.dragState){const i=e.dragState.id,n=e.dragState.mode;if(n==="move"){const r=e.canvas.querySelector(`.widget[data-id="${i}"]`),a=r?r.style.pointerEvents:"";r&&(r.style.pointerEvents="none");const l=document.elementFromPoint(t.clientX,t.clientY);r&&(r.style.pointerEvents=a);const c=l?.closest(".artboard"),d=l?.closest(".add-page-placeholder"),p=h.currentPageIndex;let g=-1;if(c)g=parseInt(c.dataset.index,10);else if(d){e.suppressNextFocus=!0;const u=h.pages.length;h.addPage(u)&&(g=u,v.log(`[Canvas] Created new page ${g} at index ${g}. Source was ${p}`))}else{const u=l?.closest("#pageList .item");if(u){const f=document.getElementById("pageList");g=Array.from(f.querySelectorAll(".item")).indexOf(u)}}if(g!==-1&&g!==p){const u=e.dragState.widgets;d&&ve(e);let f=e.canvas.querySelector(`.artboard[data-index="${g}"]`),y=0;window.removeEventListener("mousemove",e._boundMouseMove),window.removeEventListener("mouseup",e._boundMouseUp),Ft(e),e.dragState=null,ue();let m=null;const _=h.zoomLevel;f&&(m=f.getBoundingClientRect());const b=new Set(u.map(x=>x.id));if(u.filter(x=>{const E=h.getWidgetById(x.id);return!E.parentId||!b.has(E.parentId)}).forEach(x=>{let E=x.startX,w=x.startY;if(m){const C=h.getWidgetById(x.id),k=h.getCanvasDimensions();E=Math.round((t.clientX-m.left)/_-x.clickOffsetX),w=Math.round((t.clientY-m.top)/_-x.clickOffsetY);const L=C?.width||50,O=C?.height||50;E=Math.max(0,Math.min(k.width-L,E)),w=Math.max(0,Math.min(k.height-O,w))}else d&&(E=40,w=40);h.moveWidgetToPage(x.id,g,E,w)&&y++}),y>0){v.log(`[Canvas] Successfully moved ${y} widgets to page ${g}`),h.setCurrentPageIndex(g,{suppressFocus:!0}),ve(e);return}}}else if(n==="reorder-page"){const r=e.dragState.pageIndex,l=document.elementFromPoint(t.clientX,t.clientY)?.closest(".artboard-wrapper");if(pl(e,r),document.querySelectorAll(".artboard-wrapper").forEach(c=>c.classList.remove("drag-over")),l){const c=parseInt(l.dataset.index,10);c!==r&&h.reorderPage(r,c)}}window.removeEventListener("mousemove",e._boundMouseMove),window.removeEventListener("mouseup",e._boundMouseUp),Ft(e);const o=h.getCanvasDimensions();(e.dragState?.widgets||[]).forEach(r=>{const a=h.getWidgetById(r.id);a&&!a.locked&&(a.x=Math.max(0,Math.min(o.width-a.width,a.x)),a.y=Math.max(0,Math.min(o.height-a.height,a.y)))}),e.dragState=null,e.rulers&&e.rulers.setIndicators(null),ue(),Ao(i),h.recordHistory(),P(I.STATE_CHANGED),ve(e)}else if(e.lassoState){if(window.removeEventListener("mousemove",e._boundMouseMove),window.removeEventListener("mouseup",e._boundMouseUp),e.lassoEl&&(e.lassoEl.remove(),e.lassoEl=null),Date.now()-e.lassoState.startTime,!!e.lassoState.rect){const n=e.lassoState.currentSelection||[];h.selectWidgets(n)}else if(e.lassoState.isAdditive||h.selectWidgets([]),e.lassoState.focusParams){const{index:n,fitZoom:o}=e.lassoState.focusParams;o&&_t(e,h.currentPageIndex,!0,!0)}e.lassoState=null,ve(e),t.preventDefault(),t.stopPropagation()}}function ml(t){!t.canvas||!t.canvasContainer||(t._boundTouchMove=e=>yl(e,t),t._boundTouchEnd=e=>_l(e,t),t.canvas.addEventListener("touchstart",e=>{const i=e.touches,n=t.viewport.getBoundingClientRect();if(document.body.classList.add("interaction-active"),e.stopImmediatePropagation(),i.length===2){e.preventDefault();const o=(i[0].clientX+i[1].clientX)/2,s=(i[0].clientY+i[1].clientY)/2;t.pinchState={startDistance:Oo(i[0],i[1]),startZoom:h.zoomLevel,startPanX:t.panX,startPanY:t.panY,startCenterX:o-n.left,startCenterY:s-n.top},t.touchState=null,window.addEventListener("touchmove",t._boundTouchMove,{passive:!1}),window.addEventListener("touchend",t._boundTouchEnd),window.addEventListener("touchcancel",t._boundTouchEnd);return}if(i.length===1){const o=i[0],s=o.target.closest(".widget"),r=s?s.dataset.id:null;if(t.longPressTimer&&clearTimeout(t.longPressTimer),t.longPressTimer=setTimeout(()=>{window.RadialMenu&&window.RadialMenu.show(o.clientX,o.clientY,r),t.touchState=null},500),s){e.preventDefault();const a=h.getWidgetById(r);if(!a)return;o.target.classList.contains("widget-resize-handle")?t.touchState={mode:"resize",id:r,startX:o.clientX,startY:o.clientY,startW:a.width,startH:a.height,el:s}:t.touchState={mode:"move",id:r,startTouchX:o.clientX,startTouchY:o.clientY,startWidgetX:a.x,startWidgetY:a.y,hasMoved:!1,el:s}}else e.preventDefault(),t.touchState={mode:"pan",startTouchX:o.clientX,startTouchY:o.clientY,startX:o.clientX,startY:o.clientY,startPanX:t.panX,startPanY:t.panY};window.addEventListener("touchmove",t._boundTouchMove,{passive:!1}),window.addEventListener("touchend",t._boundTouchEnd),window.addEventListener("touchcancel",t._boundTouchEnd)}},{passive:!1}))}function yl(t,e){const i=t.touches,n=e.viewport.getBoundingClientRect();if(e.pinchState&&i.length===2){t.preventDefault();const s=Oo(i[0],i[1])/e.pinchState.startDistance,r=Math.max(.1,Math.min(10,e.pinchState.startZoom*s)),a=(i[0].clientX+i[1].clientX)/2-n.left,l=(i[0].clientY+i[1].clientY)/2-n.top,c=(e.pinchState.startCenterX-e.pinchState.startPanX)/e.pinchState.startZoom,d=(e.pinchState.startCenterY-e.pinchState.startPanY)/e.pinchState.startZoom;e.panX=a-c*r,e.panY=l-d*r,h.setZoomLevel(r),le(e);return}if(i.length===1&&e.longPressTimer){const o=i[0],s=e.touchState,r=s?.startTouchX??s?.startX??o.clientX,a=s?.startTouchY??s?.startY??o.clientY;Math.hypot(o.clientX-r,o.clientY-a)>10&&(clearTimeout(e.longPressTimer),e.longPressTimer=null)}if(e.touchState&&i.length===1){t.preventDefault();const o=i[0];if(e.touchState.mode==="pan"){const s=o.clientX-e.touchState.startTouchX,r=o.clientY-e.touchState.startTouchY;e.panX=e.touchState.startPanX+s,e.panY=e.touchState.startPanY+r,le(e)}else if(e.touchState.mode==="move"){const s=o.clientX-e.touchState.startTouchX,r=o.clientY-e.touchState.startTouchY;if(!e.touchState.hasMoved&&Math.hypot(s,r)<5)return;e.touchState.hasMoved=!0;const a=h.getWidgetById(e.touchState.id);if(!a)return;const l=h.getCanvasDimensions(),c=h.zoomLevel;let d=e.touchState.startWidgetX+s/c,p=e.touchState.startWidgetY+r/c;d=Math.max(0,Math.min(l.width-a.width,d)),p=Math.max(0,Math.min(l.height-a.height,p)),a.x=d,a.y=p,e.touchState.el&&(e.touchState.el.style.left=d+"px",e.touchState.el.style.top=p+"px")}else if(e.touchState.mode==="resize"){e.touchState.hasMoved=!0;const s=h.getWidgetById(e.touchState.id);if(!s)return;const r=h.getCanvasDimensions(),a=h.zoomLevel;let l=e.touchState.startW+(o.clientX-e.touchState.startX)/a,c=e.touchState.startH+(o.clientY-e.touchState.startY)/a;const d=20;l=Math.max(d,Math.min(r.width-s.x,l)),c=Math.max(d,Math.min(r.height-s.y,c)),s.width=l,s.height=c,e.touchState.el&&(e.touchState.el.style.width=l+"px",e.touchState.el.style.height=c+"px")}}}function _l(t,e){const i=e.touchState,n=Date.now();if(i&&t.changedTouches.length>0){const o=t.changedTouches[0].clientX,s=t.changedTouches[0].clientY;if(!(Math.hypot(o-(i.startTouchX||i.startX),s-(i.startTouchY||i.startY))>10)){const a=t.target.closest(".widget"),l=a?a.dataset.id:null;l?l===e.lastWidgetTapId&&n-e.lastWidgetTapTime<350?(window.RadialMenu&&window.RadialMenu.show(o,s,l),e.lastWidgetTapTime=0):(e.lastWidgetTapId=l,e.lastWidgetTapTime=n,h.selectWidget(l)):n-e.lastCanvasTapTime<350?(h.setZoomLevel(1),_t(e,h.currentPageIndex,!0),e.lastCanvasTapTime=0):(e.lastCanvasTapTime=n,h.selectWidgets([]))}if(i.id&&i.hasMoved){const a=h.getWidgetById(i.id);if(a){if(i.mode==="move"){const l=h.getCanvasDimensions(),c=h.getCurrentPage();if(c?.layout){const d=fn(a.x,a.y,a.width,a.height,c.layout,l);a.x=d.x,a.y=d.y}else{const d=gn(e,a,a.x,a.y,!1,l);a.x=d.x,a.y=d.y}}vl(e,i.id),h.recordHistory(),P(I.STATE_CHANGED)}}}e.touchState=null,e.pinchState=null,e.longPressTimer&&(clearTimeout(e.longPressTimer),e.longPressTimer=null),window.removeEventListener("touchmove",e._boundTouchMove),window.removeEventListener("touchend",e._boundTouchEnd),window.removeEventListener("touchcancel",e._boundTouchEnd),document.body.classList.remove("interaction-active"),ve(e),ue()}function Oo(t,e){return Math.hypot(e.clientX-t.clientX,e.clientY-t.clientY)}function vl(t,e){const i=h.getCurrentPage();if(!i||!i.layout)return;const n=i.layout.match(/^(\d+)x(\d+)$/);if(!n)return;const o=h.getWidgetById(e);if(!o)return;const s=parseInt(n[1],10),r=parseInt(n[2],10),a=h.getCanvasDimensions(),l=a.width/r,c=a.height/s,d=o.x+o.width/2,p=o.y+o.height/2,g=Math.floor(d/l),u=Math.floor(p/c),f=Math.max(0,Math.min(s-1,u)),y=Math.max(0,Math.min(r-1,g)),m={...o.props,grid_cell_row_pos:f,grid_cell_column_pos:y,grid_cell_row_span:Math.max(1,Math.round(o.height/c)),grid_cell_column_span:Math.max(1,Math.round(o.width/l))};h.updateWidget(e,{props:m})}class bl{constructor(){this.canvas=document.getElementById("canvas"),this.canvasContainer=document.getElementById("canvasContainer"),this.viewport=document.querySelector(".canvas-viewport"),this.dragState=null,this.panX=0,this.panY=0,this.touchState=null,this.pinchState=null,this.lastTapTime=0,this.isExternalDragging=!1,this.suppressNextFocus=!1,this._boundMouseMove=e=>gl(e,this),this._boundMouseUp=e=>fl(e,this),this.rulers=new tl(this),this.init()}init(){F(I.STATE_CHANGED,()=>this.render()),F(I.PAGE_CHANGED,i=>{if(this.render(),this.suppressNextFocus){this.suppressNextFocus=!1,this._lastFocusedIndex=i.index;return}i.forceFocus&&this.focusPage(i.index,!0,!0),this._lastFocusedIndex=i.index}),F(I.SELECTION_CHANGED,()=>this.updateSelectionVisuals()),F(I.SETTINGS_CHANGED,()=>{this.render(),this.applyZoom(),this.rulers.update()}),F(I.ZOOM_CHANGED,()=>{this.applyZoom(),this.rulers.update()});const e=document.getElementById("pagesHeader");e&&e.addEventListener("click",i=>{i.target.closest(".chevron")||this.zoomToFitAll()}),this._boundResize=()=>{h.currentPageIndex!==-1&&this.focusPage(h.currentPageIndex,!1,!0)},window.addEventListener("resize",this._boundResize),this.setupInteractions(),this.render(),this.applyZoom(),this.updateInterval&&clearInterval(this.updateInterval),this.updateInterval=setInterval(()=>{if(this.touchState||this.pinchState||this.dragState||this.panState||this.lassoState||this.isExternalDragging)return;const i=h.getCurrentPage();i&&i.widgets.some(n=>n.type==="datetime")&&this.render()},1e3)}render(){ve(this)}applyZoom(){le(this),this.rulers&&this.rulers.update()}updateSelectionVisuals(){const e=h.selectedWidgetIds;this.canvas.querySelectorAll(".widget").forEach(n=>{const o=n.dataset.id;e.includes(o)?n.classList.add("active"):n.classList.remove("active")}),hn(this)}setupInteractions(){il(this),hl(this),ol(this),nl(this),ml(this);const e=document.getElementById("zoomToFitAllBtn");e&&(e.onclick=()=>this.zoomToFitAll())}zoomIn(){Gt(this)}zoomOut(){Wt(this)}zoomReset(){nt(this)}zoomToFit(){h.currentPageIndex!==-1&&this.focusPage(h.currentPageIndex,!0,!0)}zoomToFitAll(e=!0){T(()=>Promise.resolve().then(()=>$n),[],import.meta.url).then(i=>i.zoomToFitAll(this,e))}focusPage(e,i=!0,n=!1){T(()=>Promise.resolve().then(()=>$n),void 0,import.meta.url).then(o=>o.focusPage(this,e,i,n))}destroy(){this.updateInterval&&(clearInterval(this.updateInterval),this.updateInterval=null),this._boundResize&&window.removeEventListener("resize",this._boundResize)}}const ce="__mixed__";function xl(t){const e={black:"#000000",white:"#FFFFFF",red:"#FF0000",green:"#00FF00",blue:"#0000FF",yellow:"#FFFF00",gray:"#808080",grey:"#808080"};return t?e[t.toLowerCase()]?e[t.toLowerCase()]:t.startsWith("0x")?"#"+t.substring(2):t.startsWith("#")?t:"#000000":"#000000"}function Vn(t){const e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:{r:0,g:0,b:0}}function wl(t,e,i){const n=o=>{const s=Math.max(0,Math.min(255,o)).toString(16);return s.length===1?"0"+s:s};return"#"+n(t)+n(e)+n(i)}function El(t,e,i){if(!N()){v.warn("Entity Picker: No HA backend detected.");return}const n=document.getElementById("propertiesPanel")||document.body,o=document.querySelector(".entity-picker-overlay");o&&o.remove();const s=document.createElement("div");s.className="entity-picker-overlay";const r=document.createElement("div");r.className="entity-picker-header",r.textContent="Pick Home Assistant entity";const a=document.createElement("button");a.className="btn btn-secondary",a.textContent="×",a.style.padding="0 4px",a.style.fontSize="9px",a.type="button",a.addEventListener("click",()=>{s.remove()});const l=document.createElement("div");l.style.display="flex",l.style.alignItems="center",l.style.gap="4px",l.appendChild(a);const c=document.createElement("div");c.style.display="flex",c.style.justifyContent="space-between",c.style.alignItems="center",c.style.gap="4px",c.appendChild(r),c.appendChild(l);const d=document.createElement("div");d.style.display="flex",d.style.gap="4px",d.style.alignItems="center";const p=document.createElement("input");p.type="text",p.className="prop-input",p.placeholder="Search name or entity_id",p.style.flex="1";const g=document.createElement("select");g.className="prop-input",g.style.width="80px",["all","sensor","binary_sensor","light","switch","fan","cover","climate","media_player","input_number","number","input_boolean","input_text","input_select","weather","scene","script","button","input_button"].forEach(y=>{const m=document.createElement("option");m.value=y,m.textContent=y,g.appendChild(m)}),d.appendChild(p),d.appendChild(g);const u=document.createElement("div");u.className="entity-picker-list",s.appendChild(c),s.appendChild(d),s.appendChild(u),n.appendChild(s);function f(y){if(u.innerHTML="",!y||y.length===0){const m=document.createElement("div");m.style.color="var(--muted)",m.style.fontSize="var(--fs-xs)",m.textContent="No entities match.",u.appendChild(m);return}y.forEach(m=>{const _=document.createElement("div");_.className="entity-picker-row";const b=document.createElement("div");b.className="entity-picker-name",b.textContent=m.name||m.entity_id;const S=document.createElement("div");S.className="entity-picker-meta",S.textContent=`${m.entity_id} · ${m.domain||m.entity_id.split(".")[0]}`,_.appendChild(b),_.appendChild(S),_.addEventListener("click",()=>{if(i&&i(m.entity_id),e&&(e.value=m.entity_id),t&&h){if(h.updateWidget(t.id,{entity_id:m.entity_id,title:m.name||m.entity_id||""}),t.type==="graph"&&m.attributes){const x=m.attributes,E={};if(x.unit_of_measurement==="%"&&(t.props.min_value||(E.min_value="0"),t.props.max_value||(E.max_value="100")),x.min!==void 0&&!t.props.min_value&&(E.min_value=String(x.min)),x.max!==void 0&&!t.props.max_value&&(E.max_value=String(x.max)),Object.keys(E).length>0){const w={...t.props,...E};h.updateWidget(t.id,{props:w})}}if(t.type==="sensor_text"){const x={...t.props};m.attributes&&m.attributes.unit_of_measurement?x.unit=m.attributes.unit_of_measurement:m.unit&&(x.unit=m.unit);const E=m.state;if(m.entity_id.startsWith("weather.")||m.entity_id.startsWith("text_sensor."))x.is_text_sensor=!0;else if(E!=null&&E!==""){const C=parseFloat(E);isNaN(C)?x.is_text_sensor=!0:x.is_text_sensor=!1}h.updateWidget(t.id,{props:x})}}s.remove()}),u.appendChild(_)})}Ce().then(y=>{if(!y||y.length===0){f([]);return}function m(){const _=(p.value||"").toLowerCase(),b=g.value,S=y.filter(x=>{const E=x.domain||x.entity_id.split(".")[0];return b!=="all"&&E!==b?!1:_?`${x.entity_id} ${x.name||""}`.toLowerCase().includes(_):!0});f(S)}p.addEventListener("input",m),g.addEventListener("change",m),m()})}const Do=[{code:"F0004",name:"account"},{code:"F0026",name:"alert"},{code:"F0028",name:"alert-circle"},{code:"F0045",name:"arrow-down"},{code:"F004D",name:"arrow-left"},{code:"F0054",name:"arrow-right"},{code:"F005D",name:"arrow-up"},{code:"F0079",name:"battery"},{code:"F007C",name:"battery-50"},{code:"F0084",name:"battery-charging"},{code:"F009A",name:"bell"},{code:"F00AF",name:"bluetooth"},{code:"F00D8",name:"brightness-5"},{code:"F00ED",name:"calendar"},{code:"F0100",name:"camera"},{code:"F012C",name:"check"},{code:"F05E0",name:"check-circle"},{code:"F0140",name:"chevron-down"},{code:"F0141",name:"chevron-left"},{code:"F0142",name:"chevron-right"},{code:"F0143",name:"chevron-up"},{code:"F0150",name:"clock"},{code:"F0156",name:"close"},{code:"F015F",name:"cloud"},{code:"F0493",name:"cog"},{code:"F01B4",name:"delete"},{code:"F01D9",name:"dots-vertical"},{code:"F01DA",name:"download"},{code:"F01EE",name:"email"},{code:"F0208",name:"eye"},{code:"F0209",name:"eye-off"},{code:"F0210",name:"fan"},{code:"F0214",name:"file"},{code:"F021E",name:"flash"},{code:"F024B",name:"folder"},{code:"F0279",name:"format-list-bulleted"},{code:"F02D1",name:"heart"},{code:"F02DC",name:"home"},{code:"F07D0",name:"home-assistant"},{code:"F02E9",name:"image"},{code:"F02FC",name:"information"},{code:"F0322",name:"layers"},{code:"F0335",name:"lightbulb"},{code:"F06E8",name:"lightbulb-on"},{code:"F033E",name:"lock"},{code:"F033F",name:"lock-open"},{code:"F0349",name:"magnify"},{code:"F034E",name:"map-marker"},{code:"F035C",name:"menu"},{code:"F036C",name:"microphone"},{code:"F0374",name:"minus"},{code:"F075A",name:"music"},{code:"F03EB",name:"pencil"},{code:"F040A",name:"play"},{code:"F0415",name:"plus"},{code:"F0425",name:"power"},{code:"F0450",name:"refresh"},{code:"F048A",name:"send"},{code:"F0497",name:"share-variant"},{code:"F0565",name:"shield-check"},{code:"F04CE",name:"star"},{code:"F04DB",name:"stop"},{code:"F050F",name:"thermometer"},{code:"F0513",name:"thumb-up"},{code:"F051B",name:"timer-outline"},{code:"F0A79",name:"trash-can"},{code:"F0552",name:"upload"},{code:"F0571",name:"video"},{code:"F057E",name:"volume-high"},{code:"F0581",name:"volume-off"},{code:"F0585",name:"water"},{code:"F05E3",name:"water-percent"},{code:"F0590",name:"weather-cloudy"},{code:"F0591",name:"weather-fog"},{code:"F0592",name:"weather-hail"},{code:"F0593",name:"weather-lightning"},{code:"F0594",name:"weather-night"},{code:"F0595",name:"weather-partly-cloudy"},{code:"F0596",name:"weather-pouring"},{code:"F0597",name:"weather-rainy"},{code:"F0598",name:"weather-snowy"},{code:"F0599",name:"weather-sunny"},{code:"F059D",name:"weather-windy"},{code:"F05A9",name:"wifi"},{code:"F05AD",name:"window-close"}];let X=null,Se=null,De=null,Qe=null,ye=null,Re=null;function Sl(){X||(X=document.getElementById("iconPickerModal"),Se=document.getElementById("iconPickerFilter"),De=document.getElementById("iconPickerList"),Qe=document.getElementById("iconPickerClose"),X||(X=document.createElement("div"),X.id="iconPickerModal",X.className="modal-backdrop hidden",X.style.zIndex="2000",X.innerHTML=`
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
        `,document.body.appendChild(X),Se=document.getElementById("iconPickerFilter"),De=document.getElementById("iconPickerList"),Qe=document.getElementById("iconPickerClose")),Qe&&(Qe.onclick=$t),Se&&(Se.oninput=t=>{const e=t.target;Il(e.value)}),X.onclick=t=>{t.target===X&&$t()})}function Lt(t,e){Sl(),ye=t,Re=e,X.classList.remove("hidden"),X.style.display="flex",Se&&(Se.value="",Se.focus()),zt(Do||[])}function $t(){X&&(X.classList.add("hidden"),X.style.display="none"),ye=null,Re=null}function zt(t){if(!De)return;if(De.innerHTML="",!t||t.length===0){De.innerHTML='<div style="padding: 10px; color: var(--muted); grid-column: 1 / -1; text-align: center;">No icons found.</div>';return}const e=document.createDocumentFragment();t.forEach(i=>{const n=document.createElement("div");n.className="icon-item",n.style.padding="8px",n.style.border="1px solid var(--border-subtle)",n.style.borderRadius="4px",n.style.cursor="pointer",n.style.display="flex",n.style.flexDirection="column",n.style.alignItems="center",n.style.justifyContent="center",n.style.textAlign="center",n.style.background="var(--bg)",n.title=i.name;const o=document.createElement("div");o.className="mdi",o.style.fontSize="24px",o.style.color="var(--accent)";const s=parseInt(i.code,16);o.textContent=String.fromCodePoint(s);const r=document.createElement("div");r.style.fontSize="9px",r.style.marginTop="4px",r.style.overflow="hidden",r.style.textOverflow="ellipsis",r.style.whiteSpace="nowrap",r.style.width="100%",r.style.color="var(--muted)",r.textContent=i.name,n.appendChild(o),n.appendChild(r),n.onclick=()=>Cl(i),n.onmouseenter=()=>{n.style.borderColor="var(--accent)",n.style.background="rgba(110, 68, 255, 0.05)"},n.onmouseleave=()=>{n.style.borderColor="var(--border-subtle)",n.style.background="var(--bg)"},e.appendChild(n)}),De.appendChild(e)}function Il(t){const e=Do||[];if(!t){zt(e);return}const i=t.toLowerCase(),n=e.filter(o=>o.name.toLowerCase().includes(i)||o.code.toLowerCase().includes(i));zt(n)}function Cl(t){ye&&(Re?(Re.value=t.code,Re.dispatchEvent(new Event("input")),Re.dispatchEvent(new Event("change"))):(ye.props||(ye.props={}),ye.props.code=t.code,h&&h.updateWidget(ye.id,ye))),$t()}const kl={Roboto:[100,300,400,500,700,900],Inter:[100,200,300,400,500,600,700,800,900],"Open Sans":[300,400,500,600,700,800],Lato:[100,300,400,700,900],Montserrat:[100,200,300,400,500,600,700,800,900],Poppins:[100,200,300,400,500,600,700,800,900],Raleway:[100,200,300,400,500,600,700,800,900],"Roboto Mono":[100,200,300,400,500,600,700],Ubuntu:[300,400,500,700],Nunito:[200,300,400,500,600,700,800,900],"Playfair Display":[400,500,600,700,800,900],Merriweather:[300,400,700,900],"Work Sans":[100,200,300,400,500,600,700,800,900],"Source Sans Pro":[200,300,400,600,700,900],Quicksand:[300,400,500,600,700]};function it(t){return kl[t]||[100,200,300,400,500,600,700,800,900]}function ot(t,e){const i=parseInt(e,10),n=it(t);return n.includes(i)?i:n.reduce((o,s)=>Math.abs(s-i)<Math.abs(o-i)?s:o)}class Pl{constructor(e){this.panel=e}getContainer(){return this.panel.getContainer()}addLabeledInput(e,i,n,o){const s=document.createElement("div");s.className="field";const r=document.createElement("div");r.className="prop-label",r.textContent=e;const a=n===ce;let l;i==="textarea"?(l=document.createElement("textarea"),l.className="prop-input",l.style.minHeight="60px",l.style.resize="vertical",l.style.fontFamily="inherit",l.value=a?"":n||"",a&&(l.placeholder="Mixed Values")):(l=document.createElement("input"),l.className="prop-input",l.type=i,l.value=a?"":n,a&&(l.placeholder="Mixed",l.style.fontStyle="italic",l.style.color="#888")),l.addEventListener("input",()=>{a&&(l.style.fontStyle="normal",l.style.color="inherit"),o(l.value)}),l.addEventListener("change",()=>{o(l.value)}),s.appendChild(r),s.appendChild(l),this.getContainer().appendChild(s)}addSelect(e,i,n,o){const s=document.createElement("div");s.className="field";const r=document.createElement("div");r.className="prop-label",r.textContent=e;const a=document.createElement("select");a.className="prop-input";const l=i===ce;if(l){const c=document.createElement("option");c.value=ce,c.textContent="(Mixed)",c.selected=!0,c.disabled=!0,a.appendChild(c)}n=n||[],n.forEach(c=>{const d=document.createElement("option");typeof c=="object"&&c!==null?(d.value=c.value,d.textContent=c.label,!l&&String(c.value)===String(i)&&(d.selected=!0)):(d.value=c,d.textContent=c,!l&&String(c)===String(i)&&(d.selected=!0)),a.appendChild(d)}),a.addEventListener("change",()=>o(a.value)),s.appendChild(r),s.appendChild(a),this.getContainer().appendChild(s)}addCheckbox(e,i,n){const o=document.createElement("div");o.className="field",o.style.marginBottom="8px";const s=document.createElement("label");s.style.display="flex",s.style.alignItems="center",s.style.gap="8px",s.style.fontSize="13px",s.style.cursor="pointer";const r=document.createElement("input");r.type="checkbox",i===ce?r.indeterminate=!0:r.checked=!!i,r.style.width="16px",r.style.height="16px",r.style.margin="0",r.style.cursor="pointer",r.addEventListener("change",()=>{r.indeterminate=!1,n(r.checked)});const l=document.createElement("span");l.textContent=e,s.appendChild(r),s.appendChild(l),o.appendChild(s),this.getContainer().appendChild(o)}addHint(e){const i=document.createElement("div");i.style.fontSize="11px",i.style.color="#666",i.style.marginTop="4px",i.style.marginBottom="12px",i.style.lineHeight="1.4",i.innerHTML=e,this.getContainer().appendChild(i)}addLabeledInputWithPicker(e,i,n,o,s){const r=document.createElement("div");r.className="field";const a=document.createElement("div");a.className="prop-label",a.textContent=e;const l=document.createElement("div");l.style.display="flex",l.style.gap="4px";const c=document.createElement("input");c.className="prop-input",c.type=i,c.value=n,c.style.flex="1",c.placeholder="Start typing or click ▼ to pick...",c.autocomplete="off",c.setAttribute("list",Bt),wo(),c.addEventListener("input",()=>o(c.value));const d=document.createElement("button");d.className="btn btn-secondary",d.innerHTML="▼",d.style.padding="4px 8px",d.style.fontSize="10px",d.style.minWidth="32px",d.type="button",d.title="Browse all entities",d.addEventListener("click",()=>{El(s,c,p=>{c.value=p,o(p)})}),l.appendChild(c),l.appendChild(d),r.appendChild(a),r.appendChild(l),this.getContainer().appendChild(r)}addIconPicker(e,i,n,o){const s=window.iconPickerData||[],r=document.createElement("div");r.className="field";const a=document.createElement("div");a.className="prop-label",a.textContent=e,r.appendChild(a);const l=document.createElement("select");l.className="select",l.style.fontFamily="MDI, monospace, system-ui",l.style.fontSize="16px",l.style.lineHeight="1.5",l.style.width="100%",l.style.marginBottom="4px";const c=document.createElement("option");c.value="",c.textContent="-- Quick visual picker --",c.style.fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif",l.appendChild(c);const d=(i||"").replace("mdi:","").toUpperCase();s.forEach(y=>{const m=document.createElement("option");m.value=y.code;const _=983040+parseInt(y.code.slice(1),16),b=String.fromCodePoint(_);m.textContent=b+"  "+y.code+(y.name?` (${y.name})`:""),m.style.fontFamily="MDI, monospace, system-ui",y.code===d&&(m.selected=!0),l.appendChild(m)}),l.addEventListener("change",()=>{l.value&&n(l.value)}),r.appendChild(l);const p=document.createElement("div");p.style.display="flex",p.style.gap="4px";const g=document.createElement("input");g.className="prop-input",g.type="text",g.placeholder="MDI Hex (Fxxxx)",g.value=d,g.style.flex="1",g.style.fontFamily="monospace",g.addEventListener("input",()=>{const y=(g.value||"").trim().toUpperCase().replace(/^0X/,"").replace(/^MDI:/,"");/^F[0-9A-F]{4}$/i.test(y)?(n(y),Array.from(l.options).find(_=>_.value===y)?l.value=y:l.value=""):y===""&&(n(""),l.value="")}),p.appendChild(g);const u=document.createElement("button");u.className="btn btn-secondary",u.textContent="★",u.style.padding="4px 8px",u.style.fontSize="14px",u.type="button",u.title="Open full icon browser",u.addEventListener("click",()=>{Lt(o,g)}),p.appendChild(u),r.appendChild(p);const f=document.createElement("div");f.className="prop-hint",f.innerHTML='Browse <a href="https://pictogrammers.com/library/mdi/icon/" target="_blank" style="color: #03a9f4; text-decoration: none;">Pictogrammers MDI</a>',r.appendChild(f),this.getContainer().appendChild(r)}addColorMixer(e,i,n){const o=document.createElement("div");o.className="field",o.style.marginBottom="10px";const s=document.createElement("div");s.className="prop-label",s.textContent=e,o.appendChild(s);let r=0,a=0,l=0,c="#000000";const d=i===ce;c=d?"":xl(i);const p=Vn(d?"#000000":c);r=p.r,a=p.g,l=p.b;const g=document.createElement("div");g.style.background="var(--bg)",g.style.padding="8px",g.style.borderRadius="6px",g.style.border="1px solid var(--border-subtle)";const u=document.createElement("div");u.style.display="flex",u.style.alignItems="center",u.style.marginBottom="8px",u.style.gap="8px";const f=document.createElement("div");f.style.width="24px",f.style.height="24px",f.style.borderRadius="4px",f.style.border="1px solid #ccc",d?(f.style.background="linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",f.style.backgroundSize="8px 8px",f.style.backgroundPosition="0 0, 0 4px, 4px -4px, -4px 0px",f.style.backgroundColor="white"):f.style.backgroundColor=c;const y=document.createElement("input");y.type="text",y.className="prop-input",y.style.flex="1",y.style.textTransform="uppercase",y.value=d?"":c,d&&(y.placeholder="Mixed Colors"),u.appendChild(f),u.appendChild(y),g.appendChild(u);const m=(w,C,k)=>{const L=document.createElement("div");L.style.display="flex",L.style.alignItems="center",L.style.marginBottom="4px",L.style.fontSize="11px";const O=document.createElement("span");O.textContent=w,O.style.width="15px",O.style.fontWeight="bold";const R=document.createElement("input");R.type="range",R.min="0",R.max="255",R.value=C,R.style.flex="1",R.style.marginLeft="4px",R.style.accentColor=k;const B=document.createElement("span");return B.textContent=C,B.style.width="25px",B.style.textAlign="right",B.style.marginLeft="4px",L.appendChild(O),L.appendChild(R),L.appendChild(B),{row:L,slider:R,valLbl:B}},_=m("R",r,"red"),b=m("G",a,"green"),S=m("B",l,"blue");g.appendChild(_.row),g.appendChild(b.row),g.appendChild(S.row),o.appendChild(g),this.getContainer().appendChild(o);const x=()=>{r=parseInt(_.slider.value),a=parseInt(b.slider.value),l=parseInt(S.slider.value),_.valLbl.textContent=r,b.valLbl.textContent=a,S.valLbl.textContent=l;const w=wl(r,a,l).toUpperCase();y.value=w,f.style.backgroundColor=w,n(w)},E=()=>{let w=y.value.trim();if(w.startsWith("#")||(w="#"+w),/^#[0-9A-F]{6}$/i.test(w)){const C=Vn(w);r=C.r,a=C.g,l=C.b,_.slider.value=r,_.valLbl.textContent=r,b.slider.value=a,b.valLbl.textContent=a,S.slider.value=l,S.valLbl.textContent=l,f.style.backgroundColor=w,n(w)}};_.slider.addEventListener("input",x),b.slider.addEventListener("input",x),S.slider.addEventListener("input",x),y.addEventListener("input",E),y.addEventListener("change",E)}addColorSelector(e,i,n,o){n||(n=He()),pn()?this.addColorMixer(e,i,o):this.addSelect(e,i,n,o)}addSegmentedControl(e,i,n,o){const s=document.createElement("div");s.className="field";const r=document.createElement("div");r.className="prop-label",r.textContent=e;const a=document.createElement("div");a.className="segmented-control",i.forEach(l=>{const c=document.createElement("div");c.className="segment-item"+(l.value===n?" active":""),c.title=l.label||l.value,l.icon?c.innerHTML=`<i class="mdi ${l.icon}"></i>`:c.textContent=l.label||l.value,c.onclick=()=>{a.querySelectorAll(".segment-item").forEach(d=>d.classList.remove("active")),c.classList.add("active"),o(l.value)},a.appendChild(c)}),s.appendChild(r),s.appendChild(a),this.getContainer().appendChild(s)}addNumberWithSlider(e,i,n,o,s){const r=document.createElement("div");r.className="field";const a=document.createElement("div");a.className="prop-label",a.textContent=e;const l=document.createElement("div");l.className="slider-hybrid";const c=i===ce,d=document.createElement("input");d.type="range",d.min=n,d.max=o,d.value=c?n:i;const p=document.createElement("input");p.className="prop-input",p.type="number",p.value=c?"":i,p.min=n,p.max=o,c&&(p.placeholder="Mixed"),d.addEventListener("input",()=>{c&&(p.placeholder=""),p.value=d.value,s(parseInt(d.value,10))}),p.addEventListener("input",()=>{d.value=p.value,s(parseInt(p.value,10))}),l.appendChild(d),l.appendChild(p),r.appendChild(a),r.appendChild(l),this.getContainer().appendChild(r)}addCompactPropertyRow(e){const i=document.createElement("div");i.className="prop-grid-2",this.getContainer().appendChild(i),this.panel.containerStack.push(i),e(),this.panel.containerStack.pop()}addCommonLVGLProperties(e,i){const n=(r,a)=>{const l={...e.props,[r]:a};h.updateWidget(e.id,{props:l})};this.panel.createSection("Common LVGL",!1);const o=document.createElement("div");o.style.display="grid",o.style.gridTemplateColumns="1fr 1fr",o.style.gap="4px",this.getContainer().appendChild(o);const s=(r,a,l=!1)=>{const c=document.createElement("div"),d=document.createElement("input");d.type="checkbox",d.checked=i[a]!==void 0?i[a]:l,d.addEventListener("change",()=>n(a,d.checked));const p=document.createElement("span");p.textContent=" "+r,p.style.fontSize="10px",c.appendChild(d),c.appendChild(p),o.appendChild(c)};s("Hidden","hidden",!1),s("Clickable","clickable",!0),s("Checkable","checkable",!1),s("Scrollable","scrollable",!0),s("Floating","floating",!1),s("Ignore Layout","ignore_layout",!1),this.addSelect("Scrollbar Mode",i.scrollbar_mode||"AUTO",["AUTO","ON","OFF","ACTIVE"],r=>n("scrollbar_mode",r)),this.panel.endSection()}addVisibilityConditions(e){e.condition_entity=e.condition_entity||"",e.condition_operator=e.condition_operator||"==",e.condition_state=e.condition_state||"",e.condition_min=e.condition_min||"",e.condition_max=e.condition_max||"";const i=document.createElement("div");i.className="field",i.style.fontSize="9px",i.style.color="#9499a6",i.style.marginBottom="6px",i.innerHTML="Show/hide this widget based on an entity's state.",this.getContainer().appendChild(i),this.addLabeledInputWithPicker("Condition Entity","text",e.condition_entity,a=>{h.updateWidget(e.id,{condition_entity:a})},e);const n=["==","!=","<",">","<=",">="];this.addSelect("Operator",e.condition_operator,n,a=>{h.updateWidget(e.id,{condition_operator:a})});const o=["on","off","open","closed","true","false","home","not_home","locked","unlocked","active","inactive","detected","clear","occupied"];this.addLabeledInputWithDataList("Condition State","text",e.condition_state,o,a=>{h.updateWidget(e.id,{condition_state:a})}),this.addLabeledInput("Min Value (Range)","text",e.condition_min,a=>{h.updateWidget(e.id,{condition_min:a})}),this.addLabeledInput("Max Value (Range)","text",e.condition_max,a=>{h.updateWidget(e.id,{condition_max:a})});const s=document.createElement("div");s.className="field",s.style.marginTop="8px";const r=document.createElement("button");r.className="btn btn-secondary btn-full",r.textContent="Clear Condition",r.type="button",r.addEventListener("click",()=>{h.updateWidget(e.id,{condition_entity:"",condition_operator:"==",condition_state:"",condition_min:"",condition_max:""})}),s.appendChild(r),this.getContainer().appendChild(s)}addPageSelector(e,i,n){const o=h.project?.pages||[],s=[{value:"relative_prev",label:"« Previous (Automatic)"},{value:"relative_next",label:"Next (Automatic) »"},{value:"home",label:"🏠 Home / Dashboard"}];o.forEach((r,a)=>{s.push({value:a.toString(),label:`Page ${a+1}: ${r.name||"Untitled"}`})}),this.addSelect(e,i,s,n)}addDropShadowButton(e,i){const n=document.createElement("div");n.className="field",n.style.marginTop="8px";const o=document.createElement("button");o.className="btn btn-secondary btn-full btn-xs",o.innerHTML='<span class="mdi mdi-box-shadow"></span> Create Drop Shadow',o.onclick=()=>{const s=h.selectedWidgetIds||[];s.includes(i)?h.createDropShadow(s):h.createDropShadow(i)},n.appendChild(o),(e||this.getContainer()).appendChild(n)}addIconInput(e,i,n,o){const s=document.createElement("div");s.className="field";const r=document.createElement("div");r.className="prop-label",r.textContent=e;const a=document.createElement("div");a.style.display="flex",a.style.gap="4px";const l=document.createElement("input");l.className="prop-input",l.type="text",l.value=i,l.style.flex="1",l.addEventListener("input",()=>n(l.value));const c=document.createElement("button");c.className="btn btn-secondary",c.textContent="★",c.style.padding="4px 8px",c.style.fontSize="14px",c.type="button",c.addEventListener("click",()=>{Lt(o,l)}),a.appendChild(l),a.appendChild(c),s.appendChild(r),s.appendChild(a),this.getContainer().appendChild(s)}addLabeledInputWithIconPicker(e,i,n,o,s){const r=document.createElement("div");r.className="field";const a=document.createElement("div");a.className="prop-label",a.textContent=e;const l=document.createElement("div");l.style.display="flex",l.style.gap="4px",l.style.flex="1";const c=document.createElement("input");c.className="prop-input",c.type=i,c.value=n,c.style.flex="1",c.onchange=p=>o(p.target.value),c.oninput=p=>o(p.target.value);const d=document.createElement("button");d.className="btn btn-secondary",d.innerHTML='<span class="mdi mdi-emoticon-outline"></span>',d.title="Pick MDI Icon",d.style.minWidth="32px",d.style.padding="0 8px",d.onclick=()=>{Lt(s,c)},l.appendChild(c),l.appendChild(d),r.appendChild(a),r.appendChild(l),this.getContainer().appendChild(r)}addLabeledInputWithDataList(e,i,n,o,s){const r=document.createElement("div");r.className="field";const a=document.createElement("div");a.className="prop-label",a.textContent=e;const l="datalist_"+Math.random().toString(36).substr(2,9),c=document.createElement("datalist");c.id=l,o.forEach(p=>{const g=document.createElement("option");g.value=p,c.appendChild(g)});const d=document.createElement("input");d.className="prop-input",d.type=i,d.value=n,d.setAttribute("list",l),d.addEventListener("input",()=>s(d.value)),d.addEventListener("change",()=>s(d.value)),r.appendChild(a),r.appendChild(d),r.appendChild(c),this.getContainer().appendChild(r)}addSectionLabel(e){const i=document.createElement("div");i.className="sidebar-section-label",i.textContent=e,this.getContainer().appendChild(i)}}class Ll{static render(e,i,n){const o=He(),s=i.props||{},r=(a,l)=>{const c={...i.props,[a]:l};if(h.updateWidget(i.id,{props:c}),a==="border_radius"||a==="radius"||a==="corner_radius"){const d=h.getCurrentPage();if(d&&d.widgets){const p=parseInt(l,10)||0,g=(i.props?.name||i.type)+" Shadow",u=d.widgets.find(f=>f.props&&f.props.name===g||f.x===(i.x||0)+5&&f.y===(i.y||0)+5&&f.width===i.width&&f.height===i.height);u&&(u.type==="shape_rect"&&p>0?h.updateWidget(u.id,{type:"rounded_rect",props:{...u.props,radius:p}}):u.type==="rounded_rect"&&h.updateWidget(u.id,{props:{...u.props,radius:p}}))}}};n.forEach(a=>{e.createSection(a.section,a.defaultExpanded!==!1),a.fields.forEach(l=>{const c=l.target==="root",d=c?i[l.key]!==void 0?i[l.key]:l.default:s[l.key]!==void 0?s[l.key]:l.default,p=g=>{let u=g;l.type==="number"&&(u=g===""?null:parseFloat(g),isNaN(u)&&(u=l.default!==void 0?l.default:0)),c?h.updateWidget(i.id,{[l.key]:u}):r(l.key,u)};switch(l.type){case"text":case"textarea":case"number":e.addLabeledInput(l.label,l.type,d,p);break;case"color":e.addColorSelector(l.label,d,o,p);break;case"select":{const g=typeof l.dynamicOptions=="function"?l.dynamicOptions(s):l.options;e.addSelect(l.label,d,g,p);break}case"checkbox":e.addCheckbox(l.label,d,p);break;case"icon_picker":e.addLabeledInputWithIconPicker(l.label,"text",d,p,i);break;case"entity_picker":e.addLabeledInputWithPicker(l.label,"text",d,p,i);break;case"hint":e.addHint(l.label);break;case"drop_shadow_button":e.addDropShadowButton(e.getContainer(),i.id);break}}),e.endSection()})}}class Tl{static render(e,i){const n=i.map(f=>h.getWidgetById(f)).filter(f=>!!f);if(n.length===0)return;e.panel.innerHTML="",e.createSection(`${n.length} Widgets Selected`,!0),e.createSection("Transform",!0);const o=f=>{const y=n[0][f];return n.every(m=>m[f]===y)?y:ce},s=(f,y)=>{h.updateWidgets(i,{[f]:y})};e.addCompactPropertyRow(()=>{e.addLabeledInput("X","number",o("x"),f=>s("x",parseInt(f,10))),e.addLabeledInput("Y","number",o("y"),f=>s("y",parseInt(f,10)))}),e.addCompactPropertyRow(()=>{e.addLabeledInput("Width","number",o("width"),f=>s("width",parseInt(f,10))),e.addLabeledInput("Height","number",o("height"),f=>s("height",parseInt(f,10)))}),e.endSection();const r=["color","bg_color","background_color","border_width","border_color","border_radius","opacity","font_size","font_family","font_weight","text_align","italic","locked","hidden"],a=new Set;n.forEach(f=>Object.keys(f.props||{}).forEach(y=>a.add(y)));const c=n.map(f=>Object.keys(f.props||{})).reduce((f,y)=>f.filter(m=>y.includes(m))),d=new Set([...c,...r]),p=Array.from(d).filter(f=>{if(["border_width","border_color","border_radius"].includes(f)){const y=["text","label","sensor_text","lvgl_label","shape_rect","rounded_rect","shape_circle","datetime"];return n.every(m=>y.includes(m.type))}if(r.includes(f)){if(n.some(m=>m.props&&m.props[f]!==void 0))return!0;if(f.includes("font")||f==="color"){const m=["text","label","sensor_text","lvgl_label","datetime"];return n.every(_=>m.includes(_.type))}}return c.includes(f)});if(p.length>0){e.createSection("Shared Appearance",!0);const f=_=>{const b=n[0].props?n[0].props[_]:void 0;return n.every(S=>(S.props?S.props[_]:void 0)===b)?b:ce},y=(_,b)=>{h.updateWidgetsProps(i,{[_]:b})},m=p.filter(_=>{const b=n.find(x=>x.props&&x.props[_]!==void 0)?.props[_],S=b!==void 0?b:"";return typeof S=="number"||typeof S=="string"||typeof S=="boolean"||S===""});m.sort((_,b)=>_.includes("color")&&!b.includes("color")?-1:b.includes("color")&&!_.includes("color")?1:_.localeCompare(b)),m.forEach(_=>{const b=_.split("_").map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(" "),S=f(_),x=n.find(w=>w.props&&w.props[_]!==void 0)||n[0],E=x.props&&x.props[_]!==void 0?typeof x.props[_]:"string";if(_.includes("color")||_==="bg"||_==="fg")e.addColorSelector(b,S,He(),w=>y(_,w));else if(E==="boolean"||["italic","locked","hidden"].includes(_))e.addCheckbox(b,S===ce?!1:S,w=>y(_,w));else{const w=E==="number"||_.includes("width")||_.includes("size")||_.includes("radius")?"number":"text";e.addLabeledInput(b,w,S,C=>{y(_,w==="number"?parseInt(C,10):C)})}}),e.endSection()}e.createSection("Operations",!0);const g=document.createElement("button");g.className="btn btn-secondary btn-full btn-xs",g.style.width="100%",g.style.marginTop="8px",g.innerHTML='<span class="mdi mdi-box-shadow"></span> Create Shadows for All Selected',g.onclick=()=>h.createDropShadow(i),e.getContainer().appendChild(g);const u=document.createElement("button");u.className="btn btn-secondary btn-xs",u.style.background="var(--danger)",u.style.color="white",u.style.border="none",u.style.width="100%",u.style.marginTop="8px",u.innerHTML="🗑 Delete Selected Widgets",u.onclick=()=>{confirm(`Delete ${i.length} widgets?`)&&h.deleteWidget()},e.getContainer().appendChild(u),e.endSection(),e.endSection()}}class Ml{static render(e,i,n){const o=h.getCurrentPage(),r=(o?.layout||"absolute")!=="absolute";if(!o)return;if(!r){const g=e.getContainer(),u=document.createElement("div");u.style.padding="8px 0",u.style.fontSize="11px",u.style.color="var(--muted)",u.textContent="Page is currently in Absolute Positioning mode.",g.appendChild(u);const f=document.createElement("button");f.className="btn btn-secondary btn-xs",f.style.width="100%",f.innerHTML='<span class="mdi mdi-grid"></span> Enable Page Grid Layout',f.onclick=()=>{window.app&&window.app.pageSettings&&window.app.pageSettings.open(h.currentPageIndex)},g.appendChild(f);return}const a=ee.isLvglWidget(n),l=i.props||{},c=(g,u)=>{const f={...i.props,[g]:u};h.updateWidget(i.id,{props:f})},d=(g,u,f,y)=>{const m=o.layout.match(/^(\d+)x(\d+)$/);if(!m)return null;const _=parseInt(m[1],10),b=parseInt(m[2],10),S=h.getCanvasDimensions(),x=S.width/b,E=S.height/_;return{x:Math.round(u*x),y:Math.round(g*E),width:Math.round(x*y),height:Math.round(E*f)}};if(e.addLabeledInput("Row (0-indexed)","number",l.grid_cell_row_pos??"",g=>{const u=g===""?null:parseInt(g,10);c("grid_cell_row_pos",isNaN(u)?null:u);const y=h.getWidgetById(i.id)?.props||{};if(u!=null&&y.grid_cell_column_pos!=null){const m=d(u,y.grid_cell_column_pos,y.grid_cell_row_span||1,y.grid_cell_column_span||1);m&&h.updateWidget(i.id,{x:m.x,y:m.y,width:m.width,height:m.height})}}),e.addLabeledInput("Column (0-indexed)","number",l.grid_cell_column_pos??"",g=>{const u=g===""?null:parseInt(g,10);c("grid_cell_column_pos",isNaN(u)?null:u);const y=h.getWidgetById(i.id)?.props||{};if(u!=null&&y.grid_cell_row_pos!=null){const m=d(y.grid_cell_row_pos,u,y.grid_cell_row_span||1,y.grid_cell_column_span||1);m&&h.updateWidget(i.id,{x:m.x,y:m.y,width:m.width,height:m.height})}}),e.addLabeledInput("Row Span","number",l.grid_cell_row_span||1,g=>{const u=Math.max(1,parseInt(g,10)||1);c("grid_cell_row_span",u);const y=h.getWidgetById(i.id)?.props||{};if(y.grid_cell_row_pos!=null&&y.grid_cell_column_pos!=null){const m=d(y.grid_cell_row_pos,y.grid_cell_column_pos,u,y.grid_cell_column_span||1);m&&h.updateWidget(i.id,{x:m.x,y:m.y,width:m.width,height:m.height})}}),e.addLabeledInput("Column Span","number",l.grid_cell_column_span||1,g=>{const u=Math.max(1,parseInt(g,10)||1);c("grid_cell_column_span",u);const y=h.getWidgetById(i.id)?.props||{};if(y.grid_cell_row_pos!=null&&y.grid_cell_column_pos!=null){const m=d(y.grid_cell_row_pos,y.grid_cell_column_pos,y.grid_cell_row_span||1,u);m&&h.updateWidget(i.id,{x:m.x,y:m.y,width:m.width,height:m.height})}}),a){const g=["START","END","CENTER","STRETCH"];e.addSelect("X Align",l.grid_cell_x_align||"STRETCH",g,u=>{c("grid_cell_x_align",u)}),e.addSelect("Y Align",l.grid_cell_y_align||"STRETCH",g,u=>{c("grid_cell_y_align",u)})}const p=document.createElement("button");p.className="btn btn-secondary btn-xs",p.style.marginTop="8px",p.style.width="100%",p.innerHTML='<span class="mdi mdi-cog"></span> Open Page Grid Settings',p.onclick=()=>{const g=h.currentPageIndex;window.app&&window.app.pageSettings&&window.app.pageSettings.open(g)},e.getContainer().appendChild(p)}}const Al=`# Dictionary to map calendar keys to their corresponding names
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
`;class qn{static autoPopulateTitleFromEntity(e,i){!i||!h||typeof Ce=="function"&&Ce().then(n=>{if(!n||n.length===0)return;const o=n.find(s=>s.entity_id===i);if(o&&o.name){const s=h.getSelectedWidget();s&&s.id===e&&!s.title&&h.updateWidget(e,{title:o.name})}}).catch(()=>{})}static renderProtocolProperties(e,i,n){const o=He(),s=i.props||{},r=(a,l)=>{const c={...i.props,[a]:l};h.updateWidget(i.id,{props:c})};n==="image"||n==="online_image"?(e.createSection("Image Source",!0),n==="image"?e.addLabeledInput("Asset Path","text",s.path||"",a=>r("path",a)):(e.addLabeledInput("Image URL","text",s.url||"",a=>r("url",a)),e.addLabeledInput("Refresh (s)","number",s.interval_s||300,a=>r("interval_s",parseInt(a,10)))),e.addCheckbox("Invert Colors",!!s.invert,a=>r("invert",a)),e.endSection(),e.createSection("Appearance",!0),e.addColorSelector("Background",s.bg_color||"transparent",o,a=>r("bg_color",a)),e.addDropShadowButton(e.getContainer(),i.id),e.endSection()):n.startsWith("shape_")||n==="line"||n==="rounded_rect"?(e.createSection("Shape Style",!0),e.addColorSelector("Fill/Line Color",s.color||"black",o,a=>r("color",a)),n!=="line"?(e.addCheckbox("Fill",s.fill!==!1,a=>r("fill",a)),e.addColorSelector("Background",s.bg_color||"transparent",o,a=>r("bg_color",a)),e.addLabeledInput("Border Width","number",s.border_width||0,a=>r("border_width",parseInt(a,10)))):e.addLabeledInput("Thickness","number",s.thickness||2,a=>r("thickness",parseInt(a,10))),(n==="rounded_rect"||s.radius!==void 0)&&e.addLabeledInput("Corner Radius","number",s.radius||4,a=>r("radius",parseInt(a,10))),e.addDropShadowButton(e.getContainer(),i.id),e.endSection()):n==="odp_ellipse"||n==="odp_polygon"||n==="odp_rectangle_pattern"||n==="odp_arc"||n==="odp_icon_sequence"?(e.createSection("ODP Style",!0),n!=="odp_icon_sequence"?(e.addColorSelector("Outline",s.outline||"black",o,a=>r("outline",a)),e.addColorSelector("Fill",s.fill||"transparent",o,a=>r("fill",a)),e.addLabeledInput("Border Width","number",s.border_width||1,a=>r("border_width",parseInt(a,10)))):(e.addColorSelector("Color",s.fill||"black",o,a=>r("fill",a)),e.addLabeledInput("Icon Size","number",s.size||24,a=>r("size",parseInt(a,10))),e.addSelect("Direction",s.direction||"right",["right","down"],a=>r("direction",a)),e.addLabeledInput("Spacing","number",s.spacing||6,a=>r("spacing",parseInt(a,10))),e.addLabeledInput("Icons (comma sep)","text",Array.isArray(s.icons)?s.icons.join(", "):s.icons||"",a=>r("icons",a))),n==="odp_rectangle_pattern"&&(e.addLabeledInput("Repeat X","number",s.x_repeat||3,a=>r("x_repeat",parseInt(a,10))),e.addLabeledInput("Repeat Y","number",s.y_repeat||2,a=>r("y_repeat",parseInt(a,10))),e.addLabeledInput("Size X","number",s.x_size||30,a=>r("x_size",parseInt(a,10))),e.addLabeledInput("Size Y","number",s.y_size||15,a=>r("y_size",parseInt(a,10)))),n==="odp_arc"&&(e.addLabeledInput("Start Angle","number",s.start_angle||0,a=>r("start_angle",parseInt(a,10))),e.addLabeledInput("End Angle","number",s.end_angle||90,a=>r("end_angle",parseInt(a,10)))),e.endSection()):n==="odp_plot"?(e.createSection("Plot Config",!0),e.addLabeledInput("Duration (sec)","number",s.duration||36400,a=>r("duration",parseInt(a,10))),e.addColorSelector("Background",s.background||"white",o,a=>r("background",a)),e.addColorSelector("Outline",s.outline||"#ccc",o,a=>r("outline",a)),e.endSection()):n==="odp_multiline"?(e.createSection("Multiline Content",!0),e.addLabeledInput("Text","textarea",s.text||"Line 1|Line 2",a=>r("text",a)),e.addLabeledInput("Delimiter","text",s.delimiter||"|",a=>r("delimiter",a)),e.endSection(),e.createSection("Appearance",!0),e.addLabeledInput("Font Size","number",s.font_size||16,a=>r("font_size",parseInt(a,10))),e.addLabeledInput("Line Spacing","number",s.line_spacing||4,a=>r("line_spacing",parseInt(a,10))),e.addColorSelector("Color",s.color||"black",o,a=>r("color",a)),e.addSelect("Font",s.font_family||"Roboto",["Roboto","Inter","Roboto Mono"],a=>r("font_family",a)),e.endSection()):((i.entity_id!==void 0||s.weather_entity!==void 0||n.includes("sensor")||n.includes("icon"))&&(e.createSection("Data Source",!0),e.addLabeledInputWithPicker("Entity ID","text",i.entity_id||s.weather_entity||"",l=>{s.weather_entity!==void 0?r("weather_entity",l):h.updateWidget(i.id,{entity_id:l})},i),i.title!==void 0&&e.addLabeledInput("Title/Label","text",i.title||"",l=>{h.updateWidget(i.id,{title:l})}),e.endSection()),e.createSection("Appearance",!0),e.addColorSelector("Color",s.color||"black",o,l=>r("color",l)),s.bg_color!==void 0&&e.addColorSelector("Background",s.bg_color||"transparent",o,l=>r("bg_color",l)),s.size!==void 0&&e.addLabeledInput("Size","number",s.size||24,l=>r("size",parseInt(l,10))),e.endSection())}static renderLegacyProperties(e,i,n){const o=He(),s=i.props||{},r=(a,l)=>{const c={...i.props,[a]:l};h.updateWidget(i.id,{props:c})};if(n==="text"||n==="label"||n==="datetime"||n==="sensor_text"||n==="entity_text"){e.createSection("Content",!0),n==="sensor_text"?(e.addLabeledInputWithPicker("Entity ID","text",i.entity_id||"",u=>{h.updateWidget(i.id,{entity_id:u}),this.autoPopulateTitleFromEntity(i.id,u)},i),e.addLabeledInput("Attribute (optional)","text",s.attribute||"",u=>r("attribute",u))):n==="entity_text"?(e.addLabeledInputWithPicker("Entity ID","text",i.entity_id||"",u=>h.updateWidget(i.id,{entity_id:u}),i),e.addLabeledInput("Attribute","text",s.attribute||"",u=>r("attribute",u))):n==="datetime"?(e.addLabeledInput("Format","text",s.format||"%H:%M",u=>r("format",u)),e.addHint("e.g. %H:%M or %A, %B %d")):e.addLabeledInput("Text","text",s.text||"Text",u=>r("text",u)),n==="sensor_text"&&(e.addLabeledInput("Prefix","text",s.prefix||"",u=>r("prefix",u)),e.addLabeledInput("Suffix","text",s.suffix||"",u=>r("suffix",u)),e.addLabeledInput("Decimals","number",s.decimals??1,u=>r("decimals",parseInt(u,10)))),e.endSection(),e.createSection("Typography",!0),e.addLabeledInput("Font Size","number",s.font_size||20,u=>r("font_size",parseInt(u,10)));const a=["Roboto","Inter","Open Sans","Lato","Montserrat","Poppins","Raleway","Roboto Mono","Ubuntu","Nunito","Playfair Display","Merriweather","Work Sans","Source Sans Pro","Quicksand","Custom..."],l=s.font_family||"Roboto",c=!a.slice(0,-1).includes(l);e.addSelect("Font",c?"Custom...":l,a,u=>{u!=="Custom..."?(r("font_family",u),r("custom_font_family","")):r("font_family","Custom...")}),(c||s.font_family==="Custom...")&&(e.addLabeledInput("Custom Font Name","text",s.custom_font_family||(c?l:""),u=>{r("font_family",u||"Roboto"),r("custom_font_family",u)}),e.addHint('Browse <a href="https://fonts.google.com" target="_blank">fonts.google.com</a>'));const d=it(l);let p=s.font_weight||400;d.includes(p)||(p=ot(l,p),setTimeout(()=>r("font_weight",p),0)),e.addSelect("Weight",p,d,u=>r("font_weight",parseInt(u,10))),e.addCheckbox("Italic",s.italic||!1,u=>r("italic",u));const g=["TOP_LEFT","TOP_CENTER","TOP_RIGHT","CENTER_LEFT","CENTER","CENTER_RIGHT","BOTTOM_LEFT","BOTTOM_CENTER","BOTTOM_RIGHT"];e.addSelect("Align",s.text_align||(n==="datetime"?"CENTER":"TOP_LEFT"),g,u=>r("text_align",u)),e.addColorSelector("Color",s.color||"black",o,u=>r("color",u)),e.endSection(),e.createSection("Appearance",!1),e.addColorSelector("Background",s.bg_color||"transparent",o,u=>r("bg_color",u)),e.addLabeledInput("Opacity (0.0 - 1.0)","number",s.opacity??1,u=>r("opacity",parseFloat(u))),e.addCheckbox("Word Wrap",s.word_wrap!==!1,u=>r("word_wrap",u)),n==="sensor_text"&&e.addCheckbox("Show Unit",s.show_unit!==!1,u=>r("show_unit",u)),e.endSection()}else if(n==="weather")e.createSection("Data Source",!0),e.addLabeledInputWithPicker("Weather Entity","text",s.weather_entity||"weather.forecast",a=>r("weather_entity",a),i),e.endSection(),e.createSection("Appearance",!0),e.addLabeledInput("Icon Size","number",s.icon_size||48,a=>r("icon_size",parseInt(a,10))),e.addColorSelector("Icon Color",s.icon_color||"black",o,a=>r("icon_color",a)),e.addCheckbox("Show Temperature",s.show_temp!==!1,a=>r("show_temp",a)),e.addCheckbox("Show Condition",s.show_cond!==!1,a=>r("show_cond",a)),e.endSection();else if(n==="chart"||n==="state_history")e.createSection("Data Source",!0),e.addLabeledInputWithPicker("Entity ID","text",i.entity_id||"",a=>h.updateWidget(i.id,{entity_id:a}),i),e.addLabeledInput("Time Period (hours)","number",s.hours||24,a=>r("hours",parseInt(a,10))),e.endSection(),e.createSection("Appearance",!0),e.addColorSelector("Line Color",s.color||"blue",o,a=>r("color",a)),e.addColorSelector("Fill Color",s.fill_color||"transparent",o,a=>r("fill_color",a)),e.addLabeledInput("Line Width","number",s.line_width||2,a=>r("line_width",parseInt(a,10))),e.addCheckbox("Show Axes",s.show_axes!==!1,a=>r("show_axes",a)),e.endSection();else if(n==="gauge"||n==="progress")e.createSection("Data Source",!0),e.addLabeledInputWithPicker("Entity ID","text",i.entity_id||"",a=>h.updateWidget(i.id,{entity_id:a}),i),e.addLabeledInput("Min Value","number",s.min||0,a=>r("min",parseFloat(a))),e.addLabeledInput("Max Value","number",s.max||100,a=>r("max",parseFloat(a))),e.endSection(),e.createSection("Appearance",!0),e.addColorSelector("Bar Color",s.color||"blue",o,a=>r("color",a)),e.addColorSelector("Background Color",s.bg_color||"#eee",o,a=>r("bg_color",a)),n==="gauge"&&e.addLabeledInput("Thickness","number",s.thickness||10,a=>r("thickness",parseInt(a,10))),e.endSection();else if(n==="switch"||n==="button")e.createSection("Action",!0),e.addLabeledInputWithPicker("Entity ID","text",i.entity_id||"",a=>h.updateWidget(i.id,{entity_id:a}),i),e.addLabeledInput("Label","text",s.text||(n==="button"?"Button":"Switch"),a=>r("text",a)),e.endSection(),e.createSection("Appearance",!0),e.addColorSelector("Color",s.color||"blue",o,a=>r("color",a)),e.addColorSelector("Text Color",s.text_color||"white",o,a=>r("text_color",a)),e.endSection();else if(n==="group"||n==="rectangle"||n==="circle"||n==="line")e.createSection("Appearance",!0),e.addColorSelector("Color",s.color||(n==="group"?"transparent":"black"),o,a=>r("color",a)),n!=="group"&&(e.addLabeledInput("Border Width","number",s.border_width||1,a=>r("border_width",parseInt(a,10))),e.addColorSelector("Border Color",s.border_color||"black",o,a=>r("border_color",a))),n==="rectangle"&&e.addLabeledInput("Corner Radius","number",s.border_radius||0,a=>r("border_radius",parseInt(a,10))),e.endSection();else if(n==="image"){e.createSection("Content",!0),e.addHint("🖼️ Static image from ESPHome.<br/><span style='color:#888;font-size:11px;'>Replace the default path with your actual image file path.</span>"),e.addLabeledInput("Image Path","text",s.path||"",d=>r("path",d)),e.endSection(),e.createSection("Appearance",!0),s.invert===void 0&&r("invert",Xe()==="reterminal_e1001"),e.addCheckbox("Invert colors",s.invert||!1,d=>r("invert",d)),e.addSelect("Render Mode",s.render_mode||"Auto",["Auto","Binary","Grayscale","Color (RGB565)"],d=>r("render_mode",d));const a=document.createElement("div");a.className="field",a.style.marginTop="12px";const l=i.x===0&&i.y===0&&i.width===800&&i.height===480,c=document.createElement("button");c.className="btn "+(l?"btn-primary":"btn-secondary")+" btn-full",c.textContent=l?"✓ Full Screen (click to restore)":"⛶ Fill Screen",c.type="button",c.addEventListener("click",()=>{l?h.updateWidget(i.id,{x:50,y:50,width:200,height:150}):h.updateWidget(i.id,{x:0,y:0,width:800,height:480})}),a.appendChild(c),e.getContainer().appendChild(a),e.endSection()}else if(n==="online_image"){e.createSection("Content",!0),e.addHint("💡 Fetch remote images dynamically (Puppet support):<br/><code style='background:#f0f0f0;padding:2px 4px;border-radius:2px;'>https://example.com/camera/snapshot.jpg </code><br/><span style='color:#4a9eff;'>ℹ️ Images are downloaded at specified intervals</span>"),e.addLabeledInput("Remote URL","text",s.url||"",d=>r("url",d)),e.addLabeledInput("Update interval (seconds)","number",s.interval_s||300,d=>r("interval_s",parseInt(d,10))),e.endSection(),e.createSection("Appearance",!0),s.invert===void 0&&r("invert",Xe()==="reterminal_e1001"),e.addCheckbox("Invert colors",s.invert||!1,d=>r("invert",d)),e.addSelect("Render Mode",s.render_mode||"Auto",["Auto","Binary","Grayscale","Color (RGB565)"],d=>r("render_mode",d));const a=document.createElement("div");a.className="field",a.style.marginTop="12px";const l=i.x===0&&i.y===0&&i.width===800&&i.height===480,c=document.createElement("button");c.className="btn "+(l?"btn-primary":"btn-secondary")+" btn-full",c.textContent=l?"✓ Full Screen (click to restore)":"⛶ Fill Screen",c.type="button",c.addEventListener("click",()=>{l?h.updateWidget(i.id,{x:50,y:50,width:200,height:150}):h.updateWidget(i.id,{x:0,y:0,width:800,height:480})}),a.appendChild(c),e.getContainer().appendChild(a),e.endSection()}else if(n==="qr_code")e.createSection("Content",!0),e.addHint("📱 Generate QR codes that can be scanned by phones/tablets"),e.addLabeledInput("QR Content","text",s.value||"https://esphome.io",a=>r("value",a)),e.addHint("Enter a URL, text, or any string to encode"),e.endSection(),e.createSection("Appearance",!0),e.addLabeledInput("Scale","number",s.scale||2,a=>{let l=parseInt(a||"2",10);(Number.isNaN(l)||l<1)&&(l=1),l>10&&(l=10),r("scale",l)}),e.addHint("Size multiplier (1-10). Larger = bigger QR code"),e.addSelect("Error Correction",s.ecc||"LOW",["LOW","MEDIUM","QUARTILE","HIGH"],a=>r("ecc",a)),e.addHint("Higher = more redundancy, can recover from damage"),e.addSelect("Color",s.color||"black",["black","white"],a=>r("color",a)),e.endSection();else if(n==="quote_rss"){e.createSection("Feed Settings",!0),e.addHint("📰 Display quotes from an RSS feed (Quote of the Day)"),e.addLabeledInput("Feed URL","text",s.feed_url||"https://www.brainyquote.com/link/quotebr.rss",f=>r("feed_url",f)),e.addHint("Enter any RSS feed URL. Default: BrainyQuote daily quotes"),e.addCheckbox("Show Author",s.show_author!==!1,f=>r("show_author",f)),e.addCheckbox("Random Quote",s.random!==!1,f=>r("random",f)),e.addHint("Pick a random quote from the feed, or use the first one");const a=["15min","30min","1h","2h","4h","8h","12h","24h"];e.addSelect("Refresh Interval",s.refresh_interval||"24h",a,f=>r("refresh_interval",f)),e.addLabeledInput("Home Assistant URL","text",s.ha_url||"http://homeassistant.local:8123",f=>r("ha_url",f)),e.addHint("Address of your Home Assistant instance (for Proxy)"),e.endSection(),e.createSection("Typography",!1),e.addLabeledInput("Quote Text Size (Line 1)","number",s.quote_font_size||18,f=>r("quote_font_size",parseInt(f,10))),e.addLabeledInput("Author Size (Line 2)","number",s.author_font_size||14,f=>r("author_font_size",parseInt(f,10)));const l=["Roboto","Inter","Open Sans","Lato","Montserrat","Poppins","Raleway","Roboto Mono","Ubuntu","Nunito","Playfair Display","Merriweather","Work Sans","Source Sans Pro","Quicksand","Custom..."],c=s.font_family||"Roboto",d=!l.slice(0,-1).includes(c);e.addSelect("Font",d?"Custom...":c,l,f=>{f!=="Custom..."?(r("font_family",f),r("custom_font_family","")):r("font_family","Custom...")}),(d||s.font_family==="Custom...")&&(e.addLabeledInput("Custom Font Name","text",s.custom_font_family||(d?c:""),f=>{r("font_family",f||"Roboto"),r("custom_font_family",f)}),e.addHint('Browse <a href="https://fonts.google.com" target="_blank">fonts.google.com</a>'));const p=it(c);let g=s.font_weight||400;p.includes(g)||(g=ot(c,g),setTimeout(()=>r("font_weight",g),0)),e.addSelect("Weight",g,p,f=>r("font_weight",parseInt(f,10)));const u=["TOP_LEFT","TOP_CENTER","TOP_RIGHT","CENTER_LEFT","CENTER","CENTER_RIGHT","BOTTOM_LEFT","BOTTOM_CENTER","BOTTOM_RIGHT"];e.addSelect("Align",s.text_align||"TOP_LEFT",u,f=>r("text_align",f)),e.addColorSelector("Color",s.color||"black",o,f=>r("color",f)),e.endSection(),e.createSection("Display Options",!1),e.addCheckbox("Word Wrap",s.word_wrap!==!1,f=>r("word_wrap",f)),e.addCheckbox("Auto Scale Text",s.auto_scale||!1,f=>r("auto_scale",f)),e.addHint("Automatically reduce font size if text is too long"),e.addCheckbox("Italic Quote",s.italic_quote!==!1,f=>r("italic_quote",f)),e.endSection()}else if(n==="calendar"){e.createSection("Appearance",!0),e.addColorSelector("Text Color",s.text_color||"black",o,c=>r("text_color",c)),e.addColorSelector("Background",s.background_color||"white",o,c=>r("background_color",c)),e.endSection(),e.createSection("Border Style",!1),e.addLabeledInput("Border Width","number",s.border_width||0,c=>r("border_width",parseInt(c,10))),e.addColorSelector("Border Color",s.border_color||"theme_auto",o,c=>r("border_color",c)),e.addLabeledInput("Corner Radius","number",s.border_radius||0,c=>r("border_radius",parseInt(c,10))),e.addDropShadowButton(e.getContainer(),i.id),e.endSection(),e.createSection("Font Sizes",!1),e.addLabeledInput("Big Date Size","number",s.font_size_date||100,c=>r("font_size_date",parseInt(c,10))),e.addLabeledInput("Day Name Size","number",s.font_size_day||24,c=>r("font_size_day",parseInt(c,10))),e.addLabeledInput("Grid Text Size","number",s.font_size_grid||14,c=>r("font_size_grid",parseInt(c,10))),e.addLabeledInput("Event Text Size","number",s.font_size_event||18,c=>r("font_size_event",parseInt(c,10))),e.endSection(),e.createSection("Visibility",!0),e.addCheckbox("Show Header",s.show_header!==!1,c=>r("show_header",c)),e.addCheckbox("Show Grid",s.show_grid!==!1,c=>r("show_grid",c)),e.addCheckbox("Show Events",s.show_events!==!1,c=>r("show_events",c)),e.endSection(),e.createSection("Data Source",!0),e.addLabeledInputWithPicker("Entity ID","text",i.entity_id||"sensor.esp_calendar_data",c=>{h.updateWidget(i.id,{entity_id:c})},i),e.addLabeledInput("Max Events","number",s.max_events||8,c=>r("max_events",parseInt(c,10))),e.addHint("Must be a sensor with attribute 'entries'");const a=document.createElement("button");a.className="btn btn-secondary btn-full btn-xs",a.textContent="Download Helper Script",a.style.marginTop="10px",a.addEventListener("click",()=>{const c=document.createElement("a");c.setAttribute("href","data:text/x-python;charset=utf-8,"+encodeURIComponent(Al)),c.setAttribute("download","esp_calendar_data_conversion.py"),c.style.display="none",document.body.appendChild(c),c.click(),document.body.removeChild(c)}),e.getContainer().appendChild(a),e.addHint("Place in /config/python_scripts/");const l=document.createElement("div");l.style.marginTop="5px",l.style.fontSize="10px",l.style.color="#888",l.style.textAlign="center",l.innerText="Check widget instructions for HA setup.",e.getContainer().appendChild(l),e.endSection()}else if(n==="puppet")e.createSection("Content",!0),e.addLabeledInput("File path / URL","text",s.image_url||"",a=>r("image_url",a)),e.addHint('Tip: Use mdi:icon-name for Material Design Icons. <br><b>Important:</b> Ensure `materialdesignicons - webfont.ttf` is in your ESPHome `fonts / ` folder. <a href="https://pictogrammers.com/library/mdi/" target="_blank" style="color: #52c7ea">MDI Library</a>'),e.endSection(),e.createSection("Appearance",!0),e.addSelect("Image type",s.image_type||"RGB565",["RGB565","RGB","GRAYSCALE","BINARY"],a=>r("image_type",a)),e.addHint("RGB565=2B/px, RGB=3B/px, GRAYSCALE=1B/px, BINARY=1bit/px"),e.addSelect("Transparency",s.transparency||"opaque",["opaque","chroma_key","alpha_channel"],a=>r("transparency",a)),e.addHint("opaque=no transparency, chroma_key=color key, alpha_channel=smooth blend"),e.endSection();else if(n==="lvgl_label"||n.startsWith("lvgl_")){if(e.addCommonLVGLProperties(i,s),e.createSection("Widget Settings",!0),n==="lvgl_label"){e.addLabeledInput("Text","text",s.text||"Label",u=>r("text",u)),e.addLabeledInput("Font Size","number",s.font_size||20,u=>r("font_size",parseInt(u,10))),e.addColorMixer("Text Color",s.color||"black",u=>r("color",u)),e.addColorMixer("Background Color",s.bg_color||"transparent",u=>r("bg_color",u));const a=["Roboto","Inter","Open Sans","Lato","Montserrat","Poppins","Raleway","Roboto Mono","Ubuntu","Nunito","Playfair Display","Merriweather","Work Sans","Source Sans Pro","Quicksand","Custom..."],l=s.font_family||"Roboto",c=!a.slice(0,-1).includes(l);e.addSelect("Font",c?"Custom...":l,a,u=>{u!=="Custom..."?r("font_family",u):r("font_family","Custom...")});const d=it(l);let p=s.font_weight||400;d.includes(p)||(p=ot(l,p),setTimeout(()=>r("font_weight",p),0)),e.addSelect("Weight",p,d,u=>r("font_weight",parseInt(u,10))),e.addCheckbox("Italic",s.italic||!1,u=>r("italic",u));const g=["TOP_LEFT","TOP_CENTER","TOP_RIGHT","CENTER_LEFT","CENTER","CENTER_RIGHT","BOTTOM_LEFT","BOTTOM_CENTER","BOTTOM_RIGHT"];e.addSelect("Align",s.text_align||"CENTER",g,u=>r("text_align",u))}else if(n==="lvgl_line"){const a=s.orientation||"horizontal";e.addSelect("Orientation",a,["horizontal","vertical"],f=>{const y=i.width,m=i.height;h.updateWidget(i.id,{props:{...s,orientation:f},width:m,height:y})}),e.addLabeledInput("Line Width","number",s.line_width||3,f=>r("line_width",parseInt(f,10))),e.addColorMixer("Line Color",s.line_color||s.color||"black",f=>r("line_color",f)),e.addCheckbox("Rounded Ends",s.line_rounded!==!1,f=>r("line_rounded",f)),e.addLabeledInput("Opacity (0-255)","number",s.opa||255,f=>r("opa",parseInt(f,10))),e.createSection("Quick Size",!1);const l=document.createElement("div");l.style.display="flex",l.style.gap="8px",l.style.marginBottom="8px";const c=h.getCanvasDimensions(),d=c.width,p=c.height,g=document.createElement("button");g.className="btn btn-secondary",g.style.flex="1",g.textContent="↔ Fill Horizontal",g.addEventListener("click",()=>{h.updateWidget(i.id,{x:0,y:i.y,width:d,height:s.line_width||3,props:{...s,orientation:"horizontal"}})});const u=document.createElement("button");u.className="btn btn-secondary",u.style.flex="1",u.textContent="↕ Fill Vertical",u.addEventListener("click",()=>{h.updateWidget(i.id,{x:i.x,y:0,width:s.line_width||3,height:p,props:{...s,orientation:"vertical"}})}),l.appendChild(g),l.appendChild(u),e.getContainer().appendChild(l),e.endSection()}else if(n==="lvgl_meter"){e.addLabeledInputWithPicker("Entity ID","text",i.entity_id||"",l=>h.updateWidget(i.id,{entity_id:l}),i),e.createSection("Size",!1);const a=Math.max(i.width,i.height);e.addLabeledInput("Size (px)","number",a,l=>{const c=parseInt(l,10)||100;h.updateWidget(i.id,{width:c,height:c})}),e.addHint("⚠️ Meter widgets must be square. Width and height are locked together."),e.endSection(),e.createSection("Scale",!1),e.addLabeledInput("Min Value","number",s.min||0,l=>r("min",parseInt(l,10))),e.addLabeledInput("Max Value","number",s.max||100,l=>r("max",parseInt(l,10))),e.endSection(),e.createSection("Preview",!1),e.addLabeledInput("Value (Preview)","number",s.value!==void 0?s.value:60,l=>r("value",parseInt(l,10))),e.endSection(),e.createSection("Appearance",!1),e.addColorMixer("Scale Color",s.color||"black",l=>r("color",l)),e.addColorMixer("Needle Color",s.indicator_color||"red",l=>r("indicator_color",l)),e.addLabeledInput("Scale Width","number",s.scale_width||10,l=>r("scale_width",parseInt(l,10))),e.addLabeledInput("Needle Width","number",s.indicator_width||4,l=>r("indicator_width",parseInt(l,10))),e.addLabeledInput("Ticks","number",s.tick_count||11,l=>r("tick_count",parseInt(l,10))),e.addLabeledInput("Tick Length","number",s.tick_length||10,l=>r("tick_length",parseInt(l,10))),e.addLabeledInput("Label Gap","number",s.label_gap||10,l=>r("label_gap",parseInt(l,10))),e.endSection()}else n==="lvgl_button"?(e.addLabeledInputWithPicker("Action Entity ID","text",i.entity_id||"",a=>h.updateWidget(i.id,{entity_id:a}),i),e.addHint("Entity to toggle/trigger when clicked"),e.addLabeledInput("Text","text",s.text||"BTN",a=>r("text",a)),e.addColorMixer("Background Color",s.bg_color||"white",a=>r("bg_color",a)),e.addColorMixer("Text Color",s.color||"black",a=>r("color",a)),e.addLabeledInput("Border Width","number",s.border_width||2,a=>r("border_width",parseInt(a,10))),e.addLabeledInput("Corner Radius","number",s.radius||5,a=>r("radius",parseInt(a,10))),e.addCheckbox("Checkable (Toggle)",s.checkable||!1,a=>r("checkable",a))):n==="lvgl_arc"?(e.addLabeledInputWithPicker("Sensor Entity ID","text",i.entity_id||"",a=>h.updateWidget(i.id,{entity_id:a}),i),e.addHint("Sensor to bind to arc value"),e.addLabeledInput("Title / Label","text",s.title||"",a=>r("title",a)),e.addLabeledInput("Min Value","number",s.min||0,a=>r("min",parseInt(a,10))),e.addLabeledInput("Max Value","number",s.max||100,a=>r("max",parseInt(a,10))),e.addLabeledInput("Default/Preview Value","number",s.value||0,a=>r("value",parseInt(a,10))),e.addLabeledInput("Thickness","number",s.thickness||10,a=>r("thickness",parseInt(a,10))),e.addLabeledInput("Start Angle","number",s.start_angle||135,a=>r("start_angle",parseInt(a,10))),e.addLabeledInput("End Angle","number",s.end_angle||45,a=>r("end_angle",parseInt(a,10))),e.addSelect("Mode",s.mode||"NORMAL",["NORMAL","SYMMETRICAL","REVERSE"],a=>r("mode",a)),e.addColorMixer("Color",s.color||"blue",a=>r("color",a))):n==="lvgl_chart"?(e.addLabeledInputWithPicker("Entity ID","text",i.entity_id||"",a=>h.updateWidget(i.id,{entity_id:a}),i),e.addLabeledInput("Title","text",s.title||"",a=>r("title",a)),e.addSelect("Type",s.type||"LINE",["LINE","SCATTER","BAR"],a=>r("type",a)),e.addLabeledInput("Min Value","number",s.min||0,a=>r("min",parseInt(a,10))),e.addLabeledInput("Max Value","number",s.max||100,a=>r("max",parseInt(a,10))),e.addLabeledInput("Point Count","number",s.point_count||10,a=>r("point_count",parseInt(a,10))),e.addLabeledInput("X Div Lines","number",s.x_div_lines||3,a=>r("x_div_lines",parseInt(a,10))),e.addLabeledInput("Y Div Lines","number",s.y_div_lines||3,a=>r("y_div_lines",parseInt(a,10))),e.addColorMixer("Color",s.color||"black",a=>r("color",a))):n==="lvgl_img"?(e.addLabeledInput("Source (Image/Symbol)","text",s.src||"",a=>r("src",a)),e.addHint("e.g. symbol_ok, symbol_home, or /image.png"),e.addLabeledInput("Rotation (0.1 deg)","number",s.rotation||0,a=>r("rotation",parseInt(a,10))),e.addLabeledInput("Scale (256 = 1x)","number",s.scale||256,a=>r("scale",parseInt(a,10))),e.addColorMixer("Color (Tint)",s.color||"black",a=>r("color",a))):n==="lvgl_qrcode"?(e.addLabeledInput("Content / URL","text",s.text||"",a=>r("text",a)),e.addLabeledInput("Size (px)","number",s.size||100,a=>r("size",parseInt(a,10))),e.addColorMixer("Color",s.color||"black",a=>r("color",a)),e.addColorMixer("Background Color",s.bg_color||"white",a=>r("bg_color",a))):n==="lvgl_bar"?(e.addLabeledInputWithPicker("Entity ID","text",i.entity_id||"",a=>h.updateWidget(i.id,{entity_id:a}),i),e.addLabeledInput("Min","number",s.min||0,a=>r("min",parseInt(a,10))),e.addLabeledInput("Max","number",s.max||100,a=>r("max",parseInt(a,10))),e.addLabeledInput("Value","number",s.value||50,a=>r("value",parseInt(a,10))),e.addColorMixer("Bar Color",s.color||"black",a=>r("color",a)),e.addColorMixer("Background Color",s.bg_color||"gray",a=>r("bg_color",a)),e.addLabeledInput("Start Value","number",s.start_value||0,a=>r("start_value",parseInt(a,10))),e.addSelect("Mode",s.mode||"NORMAL",["NORMAL","SYMMETRICAL","REVERSE"],a=>r("mode",a)),e.addCheckbox("Range Mode",s.range_mode||!1,a=>r("range_mode",a))):n==="lvgl_slider"?(e.addLabeledInputWithPicker("Entity ID","text",i.entity_id||"",a=>h.updateWidget(i.id,{entity_id:a}),i),e.addSegmentedControl("Orientation",[{value:"Horizontal",label:"Horiz",icon:"mdi-arrow-left-right"},{value:"Vertical",label:"Vert",icon:"mdi-arrow-up-down"}],s.vertical?"Vertical":"Horizontal",a=>{const l=a==="Vertical",c=i.width,d=i.height;h.updateWidget(i.id,{props:{...s,vertical:l},width:d,height:c})}),e.addCompactPropertyRow(()=>{e.addLabeledInput("Min","number",s.min||0,a=>r("min",parseInt(a,10))),e.addLabeledInput("Max","number",s.max||100,a=>r("max",parseInt(a,10)))}),e.addNumberWithSlider("Value",s.value||30,s.min||0,s.max||100,a=>r("value",a)),e.addColorMixer("Knob/Bar Color",s.color||"black",a=>r("color",a)),e.addColorMixer("Track Color",s.bg_color||"gray",a=>r("bg_color",a)),e.addLabeledInput("Border Width","number",s.border_width||2,a=>r("border_width",parseInt(a,10))),e.addSelect("Mode",s.mode||"NORMAL",["NORMAL","SYMMETRICAL","REVERSE"],a=>r("mode",a))):n==="lvgl_tabview"?(e.addLabeledInput("Tabs (comma separated)","text",(s.tabs||[]).join(", "),a=>{const l=a.split(",").map(c=>c.trim()).filter(c=>c);r("tabs",l)}),e.addColorMixer("Background Color",s.bg_color||"white",a=>r("bg_color",a))):n==="lvgl_checkbox"?(e.addLabeledInputWithPicker("Entity ID","text",i.entity_id||"",a=>h.updateWidget(i.id,{entity_id:a}),i),e.addLabeledInput("Label","text",s.text||"Checkbox",a=>r("text",a)),e.addCheckbox("Checked",s.checked||!1,a=>r("checked",a)),e.addColorMixer("Color",s.color||"blue",a=>r("color",a))):n==="lvgl_dropdown"?(e.addLabeledInput("Options (one per line)","textarea",s.options||"",a=>r("options",a)),e.addCompactPropertyRow(()=>{e.addLabeledInput("Index","number",s.selected_index||0,a=>r("selected_index",parseInt(a,10))),e.addLabeledInput("Max H","number",s.max_height||200,a=>r("max_height",parseInt(a,10)))}),e.addSegmentedControl("Direction",[{value:"DOWN",icon:"mdi-arrow-down"},{value:"UP",icon:"mdi-arrow-up"},{value:"LEFT",icon:"mdi-arrow-left"},{value:"RIGHT",icon:"mdi-arrow-right"}],s.direction||"DOWN",a=>r("direction",a)),e.addColorMixer("Color",s.color||"white",a=>r("color",a))):n==="lvgl_switch"?(e.addLabeledInputWithPicker("Entity ID","text",i.entity_id||"",a=>h.updateWidget(i.id,{entity_id:a}),i),e.addCheckbox("Checked",s.checked||!1,a=>r("checked",a)),e.addColorMixer("Indicator Color",s.color||"blue",a=>r("color",a)),e.addColorMixer("Background Color",s.bg_color||"gray",a=>r("bg_color",a)),e.addColorMixer("Knob Color",s.knob_color||"white",a=>r("knob_color",a))):n==="lvgl_textarea"&&(e.addLabeledInput("Placeholder","text",s.placeholder||"",a=>r("placeholder",a)),e.addLabeledInput("Text","text",s.text||"",a=>r("text",a)),e.addCheckbox("One Line",s.one_line||!1,a=>r("one_line",a)),e.addCheckbox("Password Mode",s.password_mode||!1,a=>r("password_mode",a)),e.addLabeledInput("Accepted Chars","text",s.accepted_chars||"",a=>r("accepted_chars",a)),e.addLabeledInput("Max Length","number",s.max_length||0,a=>r("max_length",parseInt(a,10))));e.endSection()}}}class Ol{constructor(){this.panel=document.getElementById("propertiesPanel"),this.controls=new Pl(this),this.lastRenderedWidgetId=null,this.activeWidget=null,this.containerStack=[],this.sectionStates={}}init(){F(I.SELECTION_CHANGED,()=>this.render()),F(I.STATE_CHANGED,()=>this.render()),F(I.WIDGET_SELECTED,()=>this.render()),F(I.WIDGETS_SELECTED,()=>this.render()),F(I.PAGE_SELECTED,()=>this.render()),F(I.PAGE_UPDATED,()=>this.render());const e=document.getElementById("snapToggle");e&&(e.checked=h.snapEnabled,e.addEventListener("change",n=>{h.setSnapEnabled(n.target.checked)}),F(I.SETTINGS_CHANGED,n=>{n.snapEnabled!==void 0&&(e.checked=n.snapEnabled)}));const i=document.getElementById("lockPositionToggle");i&&i.addEventListener("change",n=>{const o=h.selectedWidgetIds;o.length>0&&h.updateWidgets(o,{locked:n.target.checked})}),this.render()}render(){if(!this.panel||window.Canvas&&window.Canvas.lassoState)return;const e=h.selectedWidgetId;if(!(this.lastRenderedWidgetId!==e)&&this.panel&&this.panel.isConnected){const u=document.activeElement;if(u&&this.panel.contains(u)){const f=u.tagName.toLowerCase(),y=u.type?u.type.toLowerCase():"";if(!(f==="input"&&["checkbox","radio","button"].includes(y)||f==="select")&&(f==="input"||f==="textarea"||u.classList.contains("prop-input")))return}}this.lastRenderedWidgetId=e,this.containerStack=[],this.panel.innerHTML="";const n=document.getElementById("lockPositionToggle");if(n){const u=h.getSelectedWidgets(),f=u.length>0&&u.every(m=>m.locked),y=u.some(m=>m.locked);n.checked=f,n.indeterminate=y&&!f,n.disabled=u.length===0}const o=h.getSelectedWidgetIds?h.getSelectedWidgetIds():h.selectedWidgetId?[h.selectedWidgetId]:[];if(o.length===0){this.panel.innerHTML="<div style='padding:16px;color:#aaa;text-align:center;'>Select a widget to edit properties</div>";return}if(o.length>1){Tl.render(this,o);return}const s=h.getSelectedWidget();if(!s)return;const r=s.type,a=H.get(r);let l=r;r==="nav_next_page"?l="next page":r==="nav_previous_page"?l="previous page":r==="nav_reload_page"?l="reload page":l=r.replace(/_/g," ");const c=document.createElement("div");c.className="sidebar-section-label",c.style.marginTop="0",c.style.textTransform="capitalize",c.textContent=`${l} Properties`,this.panel.appendChild(c),(h.getCurrentPage()?.layout||"absolute")==="absolute"&&(this.createSection("Transform",!1),this.addCompactPropertyRow(()=>{this.addLabeledInput("Pos X","number",s.x,u=>{h.updateWidget(s.id,{x:parseInt(u,10)||0})}),this.addLabeledInput("Pos Y","number",s.y,u=>{h.updateWidget(s.id,{y:parseInt(u,10)||0})})}),this.addCompactPropertyRow(()=>{this.addLabeledInput("Width","number",s.width,u=>{h.updateWidget(s.id,{width:parseInt(u,10)||10})}),this.addLabeledInput("Height","number",s.height,u=>{h.updateWidget(s.id,{height:parseInt(u,10)||10})})}),this.endSection()),Ml.render(this,s,r);const g=h.settings?.renderingMode||"direct";a&&a.schema?Ll.render(this,s,a.schema):a&&a.renderProperties?a.renderProperties(this,s):g==="oepl"||g==="opendisplay"?qn.renderProtocolProperties(this,s,r):qn.renderLegacyProperties(this,s,r),this.createSection("Visibility Conditions",!1),this.addVisibilityConditions(s),this.endSection()}createSection(e,i=!0){const n=this.sectionStates[e]!==void 0?this.sectionStates[e]===!1:!i,o=document.createElement("div");o.className="properties-section"+(n?" collapsed":"");const s=document.createElement("div");s.className="properties-section-header",s.innerHTML=`<span>${e}</span> <span class="icon mdi mdi-chevron-down"></span>`,s.onclick=a=>{a.stopPropagation();const l=o.classList.toggle("collapsed");this.sectionStates[e]=!l};const r=document.createElement("div");return r.className="properties-section-content",o.appendChild(s),o.appendChild(r),this.sectionStates[e]===void 0&&(this.sectionStates[e]=!n),this.getContainer().appendChild(o),this.containerStack.push(r),r}endSection(){this.containerStack.length>0&&this.containerStack.pop()}getContainer(){return this.containerStack.length>0?this.containerStack[this.containerStack.length-1]:this.panel}autoPopulateTitleFromEntity(e,i){if(!i||!h||!h.entityStates)return;const n=h.entityStates[i];n&&n.attributes&&n.attributes.friendly_name&&h.updateWidget(e,{title:n.attributes.friendly_name})}addLabeledInput(...e){return this.controls.addLabeledInput(...e)}addSelect(...e){return this.controls.addSelect(...e)}addCheckbox(...e){return this.controls.addCheckbox(...e)}addHint(...e){return this.controls.addHint(...e)}addLabeledInputWithPicker(...e){return this.controls.addLabeledInputWithPicker(...e)}addColorSelector(...e){return this.controls.addColorSelector(...e)}addColorMixer(...e){return this.controls.addColorMixer(...e)}addSegmentedControl(...e){return this.controls.addSegmentedControl(...e)}addIconPicker(...e){return this.controls.addIconPicker?this.controls.addIconPicker(...e):null}addNumberWithSlider(...e){return this.controls.addNumberWithSlider(...e)}addCompactPropertyRow(...e){return this.controls.addCompactPropertyRow(...e)}addCommonLVGLProperties(...e){return this.controls.addCommonLVGLProperties(...e)}addVisibilityConditions(...e){return this.controls.addVisibilityConditions(...e)}addPageSelector(...e){return this.controls.addPageSelector(...e)}addIconInput(...e){return this.controls.addIconInput?this.controls.addIconInput(...e):null}addLabeledInputWithIconPicker(...e){return this.controls.addLabeledInputWithIconPicker?this.controls.addLabeledInputWithIconPicker(...e):null}addDropShadowButton(e,i){const n=document.createElement("div");n.className="field",n.style.marginTop="8px";const o=document.createElement("button");o.className="btn btn-secondary btn-full btn-xs",o.innerHTML='<span class="mdi mdi-box-shadow"></span> Create Drop Shadow',o.onclick=()=>{const s=h.selectedWidgetIds||[];s.includes(i)?h.createDropShadow(s):h.createDropShadow(i)},n.appendChild(o),e.appendChild(n)}addLabeledInputWithDataList(...e){return this.controls.addLabeledInputWithDataList(...e)}addSectionLabel(...e){return this.controls.addSectionLabel(...e)}}function Dl(t){const{name:e,chip:i,resWidth:n,resHeight:o,shape:s,psram:r,displayDriver:a,pins:l,touchTech:c}=t,d=[];d.push("# ============================================================================"),d.push(`# TARGET DEVICE: ${e}`),d.push(`# Name: ${e}`),d.push(`# Resolution: ${n}x${o}`),d.push(`# Shape: ${s}`),d.push("#");const g=["esp32-c3","esp32-c6","esp8266"].some(b=>(i||"").toLowerCase().includes(b)),u=r&&!g;d.push(`#         - Display Platform: ${a||"Unknown"}`),d.push(`#         - Touchscreen: ${c||"None"}`),d.push(`#         - PSRAM: ${u?"Yes":"No"}`),d.push("# ============================================================================"),d.push("#"),d.push("# SETUP INSTRUCTIONS:"),d.push("#"),d.push("# STEP 1: Copy the Material Design Icons font file"),d.push("#         - From this repo: font_ttf/font_ttf/materialdesignicons-webfont.ttf"),d.push("#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf"),d.push("#         (Create the fonts folder if it doesn't exist)"),d.push("#"),d.push("# STEP 2: Create a new device in ESPHome"),d.push('#         - Click "New Device"'),d.push("#         - Name: your-device-name"),i==="esp32"?(d.push("#         - Select: ESP32"),d.push("#         - Board: esp32dev (or specific board)"),d.push("#         - Framework: esp-idf (Recommended) or arduino")):i==="esp8266"?(d.push("#         - Select: ESP8266"),d.push("#         - Board: nodemcuv2 (or specific board)"),d.push("#         - Framework: arduino (Default)")):i==="esp32-c3"?(d.push("#         - Select: ESP32-C3"),d.push("#         - Board: esp32-c3-devkitm-1"),d.push("#         - Framework: esp-idf (Recommended) or arduino")):i==="esp32-c6"?(d.push("#         - Select: ESP32-C6"),d.push("#         - Board: esp32-c6-devkitc-1"),d.push("#         - Framework: esp-idf (Recommended)")):(d.push("#         - Select: ESP32-S3"),d.push("#         - Board: esp32-s3-devkitc-1"),d.push("#         - Framework: esp-idf (Recommended) or arduino")),d.push("#"),d.push("# ============================================================================"),d.push(""),d.push("# Infrastructure (Comment out if pasting into existing config)"),d.push("# esphome: # (Auto-commented)"),d.push(`#   name: ${e.toLowerCase().replace(/[^a-z0-9]/g,"-")}`),d.push("#"),i==="esp8266"?d.push("# esp8266: # (Auto-commented)"):d.push("# esp32: # (Auto-commented)"),d.push(`#   board: ${Rl(i)}`),i!=="esp8266"&&(d.push("#   framework:"),d.push("#     type: esp-idf")),u&&i.includes("s3")&&(d.push("#     # For stability on S3 devices with high-res displays/LVGL:"),d.push("#     advanced:"),d.push("#       execute_from_psram: true")),d.push(""),u&&(d.push("# psram: # (Auto-commented)"),i.includes("s3")&&(d.push("#   # Quad or Octal depending on your board"),d.push("#   mode: quad"),d.push("#   speed: 80MHz")),d.push("")),l.clk&&l.mosi&&(d.push("spi:"),d.push(`  clk_pin: ${l.clk}`),d.push(`  mosi_pin: ${l.mosi}`),l.miso&&d.push(`  miso_pin: ${l.miso}`),d.push("")),l.sda&&l.scl&&(d.push("i2c:"),d.push(`  sda: ${l.sda}`),d.push(`  scl: ${l.scl}`),d.push("  scan: true"),d.push("")),d.push("display:"),d.push(`  - platform: ${a}`),l.cs&&d.push(`    cs_pin: ${l.cs}`),l.dc&&d.push(`    dc_pin: ${l.dc}`),l.rst&&d.push(`    reset_pin: ${l.rst}`),l.busy&&d.push(`    busy_pin: ${l.busy}`),t.displayModel&&d.push(`    model: "${t.displayModel}"`),a==="st7789v"&&!t.displayModel?(d.push("    model: Custom"),d.push("    id: my_display"),d.push(`    width: ${n}`),d.push(`    height: ${o}`),d.push("    offset_height: 0"),d.push("    offset_width: 0")):a==="st7789v"&&(d.push("    id: my_display"),d.push(`    width: ${n}`),d.push(`    height: ${o}`));const f=o>n,y=t.orientation==="portrait"||t.orientation==="portrait_inverted",m=t.orientation==="landscape_inverted"||t.orientation==="portrait_inverted";let _=0;if(f?_=y?0:90:_=y?90:0,m&&(_=(_+180)%360),d.push(`    rotation: ${_}`),d.push("    lambda: |-"),d.push("      # __LAMBDA_PLACEHOLDER__"),d.push(""),l.backlight){const b=t.backlightMinPower??.07,S=t.backlightInitial??.8,x=!!t.antiburn;d.push("output:"),d.push("  - platform: ledc"),d.push(`    pin: ${l.backlight}`),d.push("    id: backlight_brightness_output"),d.push(`    min_power: "${b}"`),d.push("    zero_means_zero: true"),d.push(""),d.push("light:"),d.push("  - platform: monochromatic"),d.push("    output: backlight_brightness_output"),d.push("    id: display_backlight"),d.push("    name: LCD Backlight"),d.push("    icon: mdi:wall-sconce-flat-outline"),d.push("    restore_mode: ALWAYS_ON"),d.push("    initial_state:"),d.push(`      brightness: "${S}"`),x&&(d.push("    on_turn_off:"),d.push("      - script.execute: start_antiburn"),d.push("    on_turn_on:"),d.push("      - script.execute: stop_antiburn")),d.push(""),x&&(d.push("script:"),d.push("  - id: start_antiburn"),d.push("    then:"),d.push("      - delay: 5min"),d.push("      - logger.log: Starting automatic antiburn."),d.push("      - switch.turn_on: switch_antiburn"),d.push("  - id: stop_antiburn"),d.push("    then:"),d.push("      - script.stop: start_antiburn"),d.push("      - switch.turn_off: switch_antiburn"),d.push(""),d.push("switch:"),d.push("  - platform: template"),d.push("    name: Antiburn"),d.push("    id: switch_antiburn"),d.push("    icon: mdi:television-shimmer"),d.push("    optimistic: true"),d.push("    entity_category: config"),d.push("    turn_on_action:"),d.push('      - logger.log: "Starting Antiburn"'),d.push("      - if:"),d.push("          condition: lvgl.is_paused"),d.push("          then:"),d.push("            - lvgl.resume:"),d.push("            - lvgl.widget.redraw:"),d.push("      - lvgl.pause:"),d.push("          show_snow: true"),d.push("    turn_off_action:"),d.push('      - logger.log: "Stopping Antiburn"'),d.push("      - if:"),d.push("          condition: lvgl.is_paused"),d.push("          then:"),d.push("            - lvgl.resume:"),d.push("            - lvgl.widget.redraw:"),d.push(""))}return c!=="none"&&(d.push("touchscreen:"),d.push(`  - platform: ${c}`),l.touch_int&&d.push(`    interrupt_pin: ${l.touch_int}`),l.touch_rst&&d.push(`    reset_pin: ${l.touch_rst}`),d.push("    on_release:"),d.push("      - if:"),d.push("          condition: lvgl.is_paused"),d.push("          then:"),d.push("            - lvgl.resume:"),d.push("            - lvgl.widget.redraw:"),d.push("            - light.turn_on: display_backlight"),d.push("")),d.join(`
`)}function Rl(t){switch(t){case"esp32-s3":return"esp32-s3-devkitc-1";case"esp32-c3":return"esp32-c3-devkitm-1";case"esp32-c6":return"esp32-c6-devkitc-1";case"esp32":return"esp32dev";case"esp8266":return"nodemcuv2";default:return"esp32-s3-devkitc-1"}}class Bl{constructor(e){this.parent=e,this._isSavingProfile=!1,this.customHardwareSection=document.getElementById("customHardwareSection"),this.customChip=document.getElementById("customChip"),this.customTech=document.getElementById("customTech"),this.customResPreset=document.getElementById("customResPreset"),this.customRes=document.getElementById("customRes"),this.customShape=document.getElementById("customShape"),this.customPsram=document.getElementById("customPsram"),this.customDisplayDriver=document.getElementById("customDisplayDriver"),this.customDisplayModel=document.getElementById("customDisplayModel"),this.customDisplayModelField=document.getElementById("customDisplayModelField"),this.customTouchTech=document.getElementById("customTouchTech"),this.touchPinsGrid=document.getElementById("touchPinsGrid"),this.customProfileNameInput=document.getElementById("customProfileName"),this.pinInputs={cs:"pin_cs",dc:"pin_dc",rst:"pin_rst",busy:"pin_busy",clk:"pin_clk",mosi:"pin_mosi",backlight:"pin_backlight",sda:"pin_sda",scl:"pin_scl",touch_int:"pin_touch_int",touch_rst:"pin_touch_rst",battery_adc:"pin_battery_adc",battery_enable:"pin_battery_enable"}}init(){this.setupListeners(),this.setupAutoSave()}setupListeners(){this.customTech&&this.customTech.addEventListener("change",()=>{this.parent.updateStrategyGroupVisibility()}),this.customChip&&this.customChip.addEventListener("change",()=>{this.updatePinDatalist()}),this.customDisplayDriver&&this.customDisplayDriver.addEventListener("change",()=>{this.updateDisplayModelVisibility()}),this.customTouchTech&&this.customTouchTech.addEventListener("change",()=>{this.touchPinsGrid&&(this.touchPinsGrid.style.display=this.customTouchTech.value==="none"?"none":"grid")}),this.customShape&&this.customShape.addEventListener("change",()=>{if(this.customShape.value==="round"&&this.customRes){const i=(this.customRes.value||"800x480").split("x"),n=parseInt(i[0])||480,o=parseInt(i[1])||480,s=Math.min(n,o);this.customRes.value=`${s}x${s}`,this.customResPreset&&(this.customResPreset.value="custom"),this.customRes.dispatchEvent(new Event("change"))}}),this.customResPreset&&this.customRes&&(this.customResPreset.addEventListener("change",()=>{const i=this.customResPreset.value;i!=="custom"&&(this.customRes.value=i,this.customRes.dispatchEvent(new Event("change")))}),this.customRes.addEventListener("input",()=>{const i=this.customRes.value,n=Array.from(this.customResPreset.options).some(o=>o.value===i);this.customResPreset.value=n?i:"custom"}));const e=document.getElementById("saveCustomProfileBtn");if(e){const i=e.cloneNode(!0);e.parentNode.replaceChild(i,e),i.addEventListener("click",async n=>{n.preventDefault(),await this.handleSaveCustomProfile()})}}setupAutoSave(){const e=[this.customChip,this.customTech,this.customResPreset,this.customRes,this.customShape,this.customPsram,this.customDisplayDriver,this.customDisplayModel,this.customTouchTech,...Object.values(this.pinInputs)],i=()=>{if(this.parent.modelInput&&this.parent.modelInput.value==="custom"){const n=this.getConfig();h.setCustomHardware(n)}};e.forEach(n=>{const o=typeof n=="string"?document.getElementById(n):n;if(!o)return;const s=o.type==="checkbox"||o.tagName==="SELECT"?"change":"input";o.addEventListener(s,i)})}getConfig(){const e=(this.customRes?.value||"800x480").split("x"),i=n=>document.getElementById(n)?.value||"";return{chip:this.customChip?.value||"esp32-s3",tech:this.customTech?.value||"lcd",resWidth:parseInt(e[0])||800,resHeight:parseInt(e[1])||480,shape:this.customShape?.value||"rect",psram:this.customPsram?.checked??!0,displayDriver:this.customDisplayDriver?.value||"st7789v",displayModel:this.customDisplayModel?.value||"",touchTech:this.customTouchTech?.value||"none",backlightMinPower:parseFloat(i("customBacklightMinPower"))||.07,backlightInitial:parseFloat(i("customBacklightInitial"))||.8,antiburn:!!document.getElementById("customAntiburn")?.checked,pins:{cs:i("pin_cs"),dc:i("pin_dc"),rst:i("pin_rst"),busy:i("pin_busy"),clk:i("pin_clk"),mosi:i("pin_mosi"),backlight:i("pin_backlight"),sda:i("pin_sda"),scl:i("pin_scl"),touch_int:i("pin_touch_int"),touch_rst:i("pin_touch_rst"),batteryAdc:i("pin_battery_adc"),batteryEnable:i("pin_battery_enable")},orientation:this.parent.orientationInput?.value||"landscape"}}updateVisibility(){if(!this.customHardwareSection)return;const e=this.parent.renderingModeInput?.value||h.settings.renderingMode||"direct",i=e==="oepl"||e==="opendisplay",n=this.parent.modelInput&&this.parent.modelInput.value==="custom";this.customHardwareSection.style.display=!i&&n?"block":"none",this.updateDisplayModelVisibility()}updateDisplayModelVisibility(){if(this.customDisplayModelField&&this.customDisplayDriver){const e=this.customDisplayDriver.value==="waveshare_epaper";this.customDisplayModelField.style.display=e?"block":"none"}}updatePinDatalist(){const e=this.customChip?.value||"esp32-s3";let i="gpio-pins-esp32s3";e==="esp32"?i="gpio-pins-esp32":e==="esp8266"&&(i="gpio-pins-esp8266"),Object.values(this.pinInputs).forEach(o=>{document.getElementById(o)?.setAttribute("list",i)});const n=["esp32-c3","esp32-c6","esp8266"];if(this.customPsram){const o=n.some(s=>e.toLowerCase().includes(s));this.customPsram.checked=o?!1:this.customPsram.checked,this.customPsram.disabled=o}}async handleSaveCustomProfile(){if(this._isSavingProfile)return;this._isSavingProfile=!0;const e=document.getElementById("saveCustomProfileBtn"),i=e?.textContent||"Save Profile";try{const n=this.customProfileNameInput?.value.trim()||"";if(!n){A("Please enter a name for your custom profile first.","warning"),this.customProfileNameInput?.focus();return}e&&(e.disabled=!0,e.textContent="Saving...");const o={...this.getConfig(),name:n},s=Dl(o),r=`${n.toLowerCase().replace(/\s+/g,"_")}.yaml`,a=new File([new Blob([s],{type:"text/yaml"})],r);A("Generating hardware recipe...","info");try{await So(a)}catch(p){if(!p.message.includes("Failed to fetch")&&!p.message.includes("NetworkError"))throw p}const l=`custom_${r.replace(".yaml","").replace(/-/g,"_").replace(/\./g,"_")}`;A("Reloading profile list...","info"),await this.parent.reloadHardwareProfiles();let c=0;const d=async()=>{const p=window.DEVICE_PROFILES||D||{},g=Object.keys(p).find(u=>u===l||p[u].name===n);if(g){this.parent.modelInput.value=g,this.parent.modelInput.dispatchEvent(new Event("change")),A(`Profile "${n}" created and loaded!`,"success");return}c<10?(c++,c===5&&await this.parent.reloadHardwareProfiles(),setTimeout(d,800)):A("Profile created, but could not be auto-selected. Please click Reload.","warning")};setTimeout(d,500)}catch(n){v.error("Failed to save custom profile:",n),A("Failed to create profile: "+(n.message||"Unknown error"),"error")}finally{this._isSavingProfile=!1,e&&(e.disabled=!1,e.textContent=i)}}populateFields(){const e=h.project?.state?.customHardware||{};if(!e||Object.keys(e).length===0)return;if(this.customChip&&(this.customChip.value=e.chip||"esp32-s3"),this.customTech&&(this.customTech.value=e.tech||"lcd"),this.customRes){const o=`${e.resWidth||800}x${e.resHeight||480}`;if(this.customRes.value=o,this.customResPreset){const s=Array.from(this.customResPreset.options).map(r=>r.value);this.customResPreset.value=s.includes(o)?o:"custom"}}this.customShape&&(this.customShape.value=e.shape||"rect"),this.customPsram&&(this.customPsram.checked=!!e.psram),this.customDisplayDriver&&(this.customDisplayDriver.value=e.displayDriver||"generic_st7789"),this.customDisplayModel&&(this.customDisplayModel.value=e.displayModel||""),this.updateDisplayModelVisibility(),this.customTouchTech&&(this.customTouchTech.value=e.touchTech||"none",this.touchPinsGrid&&(this.touchPinsGrid.style.display=e.touchTech&&e.touchTech!=="none"?"grid":"none"));const i=e.pins||{},n=(o,s)=>{const r=document.getElementById(o);r&&(r.value=s||"")};n("pin_cs",i.cs),n("pin_dc",i.dc),n("pin_rst",i.rst),n("pin_busy",i.busy),n("pin_clk",i.clk),n("pin_mosi",i.mosi),n("pin_backlight",i.backlight),n("pin_sda",i.sda),n("pin_scl",i.scl),n("pin_touch_int",i.touch_int),n("pin_touch_rst",i.touch_rst),n("pin_battery_adc",i.batteryAdc),n("pin_battery_enable",i.batteryEnable)}}class Hl{constructor(e){this.parent=e,this.protocolResPreset=document.getElementById("protocolResPreset"),this.protocolWidth=document.getElementById("protocolWidth"),this.protocolHeight=document.getElementById("protocolHeight"),this.protocolColorMode=document.getElementById("protocolColorMode"),this.oeplEntityIdInput=document.getElementById("oeplEntityId"),this.oeplDitherInput=document.getElementById("oeplDither"),this.odpEntityIdInput=document.getElementById("odpEntityId"),this.odpDitherInput=document.getElementById("odpDither"),this.odpTtlInput=document.getElementById("odpTtl")}init(){this.setupListeners()}setupListeners(){const e=(n,o)=>{h.updateSettings({[n]:o}),v.log(`[ProtocolHardwarePanel] Auto-saved ${n}:`,o),this.parent.persistToBackend()},i=()=>{const n=parseInt(this.protocolWidth?.value)||400,o=parseInt(this.protocolHeight?.value)||300,s=this.protocolColorMode?.value||"bw";h.updateProtocolHardware({width:n,height:o,colorMode:s})};this.protocolResPreset&&this.protocolResPreset.addEventListener("change",()=>{const n=this.protocolResPreset.value;if(n!=="custom"){const[o,s]=n.split("x").map(Number);this.protocolWidth&&(this.protocolWidth.value=o),this.protocolHeight&&(this.protocolHeight.value=s),i()}}),this.protocolWidth&&this.protocolWidth.addEventListener("input",i),this.protocolHeight&&this.protocolHeight.addEventListener("input",i),this.protocolColorMode&&this.protocolColorMode.addEventListener("change",i),this.oeplEntityIdInput&&this.oeplEntityIdInput.addEventListener("input",()=>{e("oeplEntityId",this.oeplEntityIdInput.value.trim())}),this.oeplDitherInput&&this.oeplDitherInput.addEventListener("change",()=>{e("oeplDither",parseInt(this.oeplDitherInput.value))}),this.odpEntityIdInput&&this.odpEntityIdInput.addEventListener("input",()=>{e("opendisplayEntityId",this.odpEntityIdInput.value.trim())}),this.odpDitherInput&&this.odpDitherInput.addEventListener("change",()=>{e("opendisplayDither",parseInt(this.odpDitherInput.value))}),this.odpTtlInput&&this.odpTtlInput.addEventListener("input",()=>{e("opendisplayTtl",parseInt(this.odpTtlInput.value)||0)})}populateFields(){const e=h.project&&h.project.protocolHardware||{width:400,height:300,colorMode:"bw"};if(this.protocolWidth&&(this.protocolWidth.value=e.width),this.protocolHeight&&(this.protocolHeight.value=e.height),this.protocolColorMode&&(this.protocolColorMode.value=e.colorMode),this.protocolResPreset){const i=`${e.width}x${e.height}`;Array.from(this.protocolResPreset.options).map(o=>o.value).includes(i)?this.protocolResPreset.value=i:this.protocolResPreset.value="custom"}this.oeplEntityIdInput&&(this.oeplEntityIdInput.value=h.settings.oeplEntityId||""),this.oeplDitherInput&&(this.oeplDitherInput.value=h.settings.oeplDither??2),this.odpEntityIdInput&&(this.odpEntityIdInput.value=h.settings.opendisplayEntityId||""),this.odpDitherInput&&(this.odpDitherInput.value=h.settings.opendisplayDither??2),this.odpTtlInput&&(this.odpTtlInput.value=h.settings.opendisplayTtl??60)}updateStrategyDisplay(){const e=this.parent.modelInput?this.parent.modelInput.value:"reterminal_e1001";let i=!1;if(e==="custom")i=(h.project&&h.project.state&&h.project.state.customHardware||{}).tech==="lcd";else{const s=(window.DEVICE_PROFILES||D||{})[e];i=!!(s&&s.features&&(s.features.lcd||s.features.oled))}if(this.parent.strategyEpaperGroup&&(this.parent.strategyEpaperGroup.style.display=i?"none":"flex"),this.parent.strategyLcdGroup){if(this.parent.strategyLcdGroup.style.display=i?"flex":"none",i){const r=h.settings.lcdEcoStrategy||"backlight_off",a=document.querySelector(`input[name="lcdEcoStrategy"][value="${r}"]`);a&&(a.checked=!0)}const o=this.parent.renderingModeInput?this.parent.renderingModeInput.value:h.settings.renderingMode||"direct",s=document.getElementById("lcd-strategy-dim-row");if(s&&(s.style.display=o==="lvgl"?"block":"none",o!=="lvgl"&&h.settings.lcdEcoStrategy==="dim_after_timeout")){h.updateSettings({lcdEcoStrategy:"backlight_off"});const r=document.querySelector('input[name="lcdEcoStrategy"][value="backlight_off"]');r&&(r.checked=!0),this.parent.updateVisibility()}}const n=this.parent.renderingModeInput?.value||h.settings.renderingMode||"direct";if(this.parent.oeplSettingsSection&&(this.parent.oeplSettingsSection.style.display=n==="oepl"?"block":"none"),this.parent.odpSettingsSection&&(this.parent.odpSettingsSection.style.display=n==="opendisplay"?"block":"none"),this.parent.deviceInvertedColorsField){const o=n==="lvgl"||n==="direct",s=window.DEVICE_PROFILES||D||{},r=e?s[e]:null,a=!!(r&&r.features&&r.features.epaper);this.parent.deviceInvertedColorsField.style.display=o&&a?"block":"none"}}}class Nl{constructor(){v.log("[DeviceSettings] Constructor called"),this.modal=document.getElementById("deviceSettingsModal"),this.closeBtn=document.getElementById("deviceSettingsClose"),this.saveBtn=document.getElementById("deviceSettingsSave"),this.nameInput=document.getElementById("deviceName"),this.modelInput=document.getElementById("deviceModel"),this.renderingModeInput=document.getElementById("renderingMode"),this.orientationInput=document.getElementById("deviceOrientation"),this.darkModeInput=document.getElementById("deviceDarkMode"),this.invertedColorsInput=document.getElementById("deviceInvertedColors"),this.modeStandard=document.getElementById("modeStandard"),this.modeSleep=document.getElementById("modeSleep"),this.modeManual=document.getElementById("modeManual"),this.modeDeepSleep=document.getElementById("modeDeepSleep"),this.modeDaily=document.getElementById("modeDaily"),this.sleepStart=document.getElementById("sleepStart"),this.sleepEnd=document.getElementById("sleepEnd"),this.dailyRefreshTime=document.getElementById("dailyRefreshTime"),this.deepSleepInterval=document.getElementById("deepSleepInterval"),this.refreshIntervalInput=document.getElementById("refreshInterval"),this.dimTimeoutInput=document.getElementById("dimTimeout"),this.noRefreshStart=document.getElementById("noRefreshStart"),this.noRefreshEnd=document.getElementById("noRefreshEnd"),this.autoCycleEnabled=document.getElementById("autoCycleEnabled"),this.autoCycleInterval=document.getElementById("autoCycleInterval"),this.sleepRow=document.getElementById("sleep-row"),this.dailyRefreshRow=document.getElementById("daily-refresh-row"),this.deepSleepRow=document.getElementById("deep-sleep-row"),this.refreshIntervalRow=document.getElementById("refresh-interval-row"),this.dimTimeoutRow=document.getElementById("lcd-strategy-dim-row"),this.autoCycleRow=document.getElementById("auto-cycle-row"),this.powerStrategySection=document.getElementById("powerStrategySection"),this.protocolHardwareSection=document.getElementById("protocolHardwareSection"),this.deviceModelField=document.getElementById("deviceModelField"),this.deviceInvertedColorsField=document.getElementById("deviceInvertedColorsField"),this.oeplSettingsSection=document.getElementById("oeplSettingsSection"),this.odpSettingsSection=document.getElementById("odpSettingsSection"),this.strategyEpaperGroup=document.getElementById("strategy-epaper-group"),this.strategyLcdGroup=document.getElementById("strategy-lcd-group"),this.customHardwarePanel=new Bl(this),this.protocolHardwarePanel=new Hl(this),this._isSavingProfile=!1,this.saveDebounceTimer=null}init(){this.closeBtn&&this.closeBtn.addEventListener("click",()=>this.close());const e=document.getElementById("reloadHardwareBtn");e&&e.addEventListener("click",async o=>{o.preventDefault(),await this.reloadHardwareProfiles()}),document.querySelectorAll(".clear-pin-btn").forEach(o=>{o.addEventListener("click",s=>{s.preventDefault();const r=o.getAttribute("data-target"),a=document.getElementById(r);a&&(a.value="",a.dispatchEvent(new Event("input",{bubbles:!0})))})});const i=document.getElementById("importHardwareBtn"),n=document.getElementById("hardwareFileInput");i&&n&&(i.addEventListener("click",o=>{o.preventDefault(),n.click()}),n.addEventListener("change",async o=>{if(o.target.files.length>0){const s=o.target.files[0];try{await So(s)}catch{}n.value=""}})),this.populateDeviceSelect(),this.saveBtn&&this.saveBtn.addEventListener("click",()=>this.close()),this.setupAutoSaveListeners(),this.customHardwarePanel.init(),this.protocolHardwarePanel.init()}async reloadHardwareProfiles(){v.log("Reloading hardware profiles...");try{typeof ut=="function"&&(await ut(!0),this.populateDeviceSelect(),A("Hardware profiles reloaded","success"))}catch(e){v.error("Failed to reload hardware profiles:",e),A("Failed to reload profiles","error")}}open(){if(v.log("Opening Device Settings modal..."),!this.modal)return;const e=h.settings;this.nameInput&&(this.nameInput.value=e.device_name||"My E-Ink Display"),this.modelInput&&(this.modelInput.value=e.device_model||"reterminal_e1001"),this.renderingModeInput&&(this.renderingModeInput.value=e.renderingMode||"direct"),this.orientationInput&&(this.orientationInput.value=e.orientation||"landscape"),this.darkModeInput&&(this.darkModeInput.checked=!!e.darkMode),this.invertedColorsInput&&(this.invertedColorsInput.checked=!!e.invertedColors);const i=!!e.sleepEnabled,n=!!e.manualRefreshOnly,o=!!e.deepSleepEnabled,s=!!e.dailyRefreshEnabled,r=!i&&!n&&!o&&!s;this.modeStandard&&(this.modeStandard.checked=r),this.modeSleep&&(this.modeSleep.checked=i),this.modeManual&&(this.modeManual.checked=n),this.modeDeepSleep&&(this.modeDeepSleep.checked=o),this.modeDaily&&(this.modeDaily.checked=s),this.sleepStart&&(this.sleepStart.value=e.sleepStartHour??0),this.sleepEnd&&(this.sleepEnd.value=e.sleepEndHour??5),this.dailyRefreshTime&&(this.dailyRefreshTime.value=e.dailyRefreshTime||"08:00"),this.deepSleepInterval&&(this.deepSleepInterval.value=e.deepSleepInterval??600),this.refreshIntervalInput&&(this.refreshIntervalInput.value=e.refreshInterval??600),this.dimTimeoutInput&&(this.dimTimeoutInput.value=e.dimTimeout??10),this.noRefreshStart&&(this.noRefreshStart.value=e.noRefreshStartHour??""),this.noRefreshEnd&&(this.noRefreshEnd.value=e.noRefreshEndHour??""),this.autoCycleEnabled&&(this.autoCycleEnabled.checked=!!e.autoCycleEnabled),this.autoCycleInterval&&(this.autoCycleInterval.value=e.autoCycleIntervalS??30),this.customHardwarePanel.populateFields(),this.protocolHardwarePanel.populateFields(),this.updateVisibility(),this.customHardwarePanel.updateVisibility(),this.modal.classList.remove("hidden"),this.modal.style.display="flex"}close(){this.modal&&(this.modal.classList.add("hidden"),this.modal.style.display="none")}populateDeviceSelect(){if(this.modelInput&&D){const e=this.modelInput.value;v.log("[DeviceSettings] Populating dropdown with",Object.keys(D).length,"profiles"),this.modelInput.innerHTML="";const i=pt||[],n=[],o=[];Object.entries(D).forEach(([a,l])=>{l.isCustomProfile||l.isOfflineImport?o.push([a,l]):n.push([a,l])});const s=(a,l)=>{const c=document.createElement("option");c.value=a;let d=l.name||a;d=d.replace(/\s*\(Local\)\s*/gi,"").replace(/\s*\(untested\)\s*/gi,"").trim();const p=[];return(l.isCustomProfile||l.isOfflineImport)&&p.push("Imported"),i.includes(a)||p.push("untested"),p.length>0&&(d+=` (${p.join(", ")})`),c.textContent=d,c};if(n.forEach(([a,l])=>{this.modelInput.appendChild(s(a,l))}),o.length>0&&n.length>0){const a=document.createElement("option");a.disabled=!0,a.textContent="── User-Imported / Custom ──",a.style.fontWeight="bold",a.style.color="var(--text-dim)",this.modelInput.appendChild(a)}o.forEach(([a,l])=>{this.modelInput.appendChild(s(a,l))});const r=document.createElement("option");r.value="custom",r.textContent="Custom Profile...",r.style.fontWeight="bold",r.style.color="var(--accent)",this.modelInput.appendChild(r),e&&(D[e]||e==="custom")?this.modelInput.value=e:this.modelInput.value||(this.modelInput.value="reterminal_e1001"),this.customHardwarePanel.updateVisibility()}}updateVisibility(){const e=this.modeSleep?.checked,i=this.modeDaily?.checked,n=this.modeDeepSleep?.checked,o=this.modeManual?.checked;this.sleepRow&&(this.sleepRow.style.display=e||n?"flex":"none"),this.dailyRefreshRow&&(this.dailyRefreshRow.style.display=i?"flex":"none"),this.deepSleepRow&&(this.deepSleepRow.style.display=n?"block":"none");const s=h.settings.lcdEcoStrategy||"backlight_off";this.dimTimeoutRow&&(this.dimTimeoutRow.style.display=s==="dim_after_timeout"?"flex":"none");const r=this.renderingModeInput?.value||h.settings.renderingMode||"direct",a=r==="lvgl"||r==="direct",l=r==="oepl"||r==="opendisplay";this.powerStrategySection&&(this.powerStrategySection.style.display=a?"block":"none"),this.protocolHardwareSection&&(this.protocolHardwareSection.style.display=l?"block":"none"),this.deviceModelField&&(this.deviceModelField.style.display=l?"none":"block");const c=!i&&!o;this.refreshIntervalRow&&(this.refreshIntervalRow.style.display=c?"block":"none"),this.autoCycleRow&&(this.autoCycleRow.style.display=this.autoCycleEnabled?.checked?"flex":"none"),this.customHardwarePanel.updateVisibility(),this.protocolHardwarePanel.updateStrategyDisplay()}persistToBackend(){if(this._isSavingProfile){this.saveDebounceTimer&&clearTimeout(this.saveDebounceTimer);return}this.saveDebounceTimer&&clearTimeout(this.saveDebounceTimer),this.saveDebounceTimer=setTimeout(async()=>{if(!this._isSavingProfile)if(N()&&typeof pe=="function")try{await pe()}catch(e){v.warn("[DeviceSettings] Failed to auto-save settings:",e)}else try{const e=h.getPagesPayload();e.deviceName=h.deviceName,e.deviceModel=h.deviceModel,localStorage.setItem("esphome-designer-layout",JSON.stringify(e))}catch(e){v.warn("[DeviceSettings] Failed to save to localStorage:",e)}},1e3)}setupAutoSaveListeners(){this._setupBasicSettingsListeners(),this._setupPowerSettingsListeners(),this._setupCycleAndEcoListeners()}_setupBasicSettingsListeners(){const e=(n,o)=>{h.updateSettings({[n]:o}),v.log(`Auto-saved ${n}:`,o),this.persistToBackend()};let i=null;this.nameInput&&this.nameInput.addEventListener("input",()=>{const n=this.nameInput.value.trim();h.setDeviceName(n),P(I.STATE_CHANGED),i&&clearTimeout(i),i=setTimeout(async()=>{if(typeof pe=="function")try{await pe()}catch(o){v.warn("[DeviceSettings] Failed to save device name:",o)}},500)}),this.modelInput&&this.modelInput.addEventListener("change",async()=>{const n=this.modelInput.value;window.currentDeviceModel=n,h.setDeviceModel(n),e("device_model",n),this.updateVisibility(),v.log("Device model changed to:",n)}),this.orientationInput&&this.orientationInput.addEventListener("change",()=>e("orientation",this.orientationInput.value)),this.darkModeInput&&this.darkModeInput.addEventListener("change",()=>e("darkMode",this.darkModeInput.checked)),this.invertedColorsInput&&this.invertedColorsInput.addEventListener("change",()=>e("invertedColors",this.invertedColorsInput.checked)),this.renderingModeInput&&this.renderingModeInput.addEventListener("change",()=>{e("renderingMode",this.renderingModeInput.value),this.updateVisibility(),v.log("Rendering mode changed to:",this.renderingModeInput.value)})}_setupPowerSettingsListeners(){const e=(n,o)=>{h.updateSettings({[n]:o}),this.persistToBackend()};[this.modeStandard,this.modeSleep,this.modeManual,this.modeDeepSleep,this.modeDaily].forEach(n=>{n&&n.addEventListener("change",()=>{n.checked&&(e("sleepEnabled",!!this.modeSleep?.checked),e("manualRefreshOnly",!!this.modeManual?.checked),e("deepSleepEnabled",!!this.modeDeepSleep?.checked),e("dailyRefreshEnabled",!!this.modeDaily?.checked),this.updateVisibility())})}),this.sleepStart&&this.sleepStart.addEventListener("change",()=>e("sleepStartHour",parseInt(this.sleepStart.value)||0)),this.sleepEnd&&this.sleepEnd.addEventListener("change",()=>e("sleepEndHour",parseInt(this.sleepEnd.value)||0)),this.dailyRefreshTime&&this.dailyRefreshTime.addEventListener("change",()=>e("dailyRefreshTime",this.dailyRefreshTime.value)),this.deepSleepInterval&&this.deepSleepInterval.addEventListener("input",()=>{const n=parseInt(this.deepSleepInterval.value)||600;e("deepSleepInterval",n),this.refreshIntervalInput&&(this.refreshIntervalInput.value=n,h.updateSettings({refreshInterval:n}))}),this.refreshIntervalInput&&this.refreshIntervalInput.addEventListener("input",()=>{const n=parseInt(this.refreshIntervalInput.value)||600;e("refreshInterval",n),this.deepSleepInterval&&this.modeDeepSleep?.checked&&(this.deepSleepInterval.value=n,h.updateSettings({deepSleepInterval:n}))}),this.noRefreshStart&&this.noRefreshStart.addEventListener("change",()=>e("noRefreshStartHour",this.noRefreshStart.value===""?null:parseInt(this.noRefreshStart.value))),this.noRefreshEnd&&this.noRefreshEnd.addEventListener("change",()=>e("noRefreshEndHour",this.noRefreshEnd.value===""?null:parseInt(this.noRefreshEnd.value)))}_setupCycleAndEcoListeners(){const e=(n,o)=>{h.updateSettings({[n]:o}),this.persistToBackend()};this.autoCycleEnabled&&this.autoCycleEnabled.addEventListener("change",()=>{e("autoCycleEnabled",this.autoCycleEnabled.checked),this.updateVisibility()}),this.autoCycleInterval&&this.autoCycleInterval.addEventListener("input",()=>e("autoCycleIntervalS",Math.max(5,parseInt(this.autoCycleInterval.value)||30))),document.querySelectorAll('input[name="lcdEcoStrategy"]').forEach(n=>{n.addEventListener("change",()=>{n.checked&&(e("lcdEcoStrategy",n.value),this.sleepRow&&(this.sleepRow.style.display=n.value==="backlight_off"?"flex":"none"),this.dimTimeoutRow&&(this.dimTimeoutRow.style.display=n.value==="dim_after_timeout"?"flex":"none"))})}),this.dimTimeoutInput&&this.dimTimeoutInput.addEventListener("input",()=>e("dimTimeout",parseInt(this.dimTimeoutInput.value)||10))}async handleSaveCustomProfile(){return this.customHardwarePanel.handleSaveCustomProfile()}}class Gl{constructor(){this.cache={models:{}}}getSettings(){return h.settings}async fetchModels(e,i){if(!i)return[];try{if(e==="openrouter")return(await(await fetch("https://openrouter.ai/api/v1/models",{headers:{Authorization:`Bearer ${i}`}})).json()).data.map(s=>({id:s.id,name:s.name,context:s.context_length}));if(e==="openai")return(await(await fetch("https://api.openai.com/v1/models",{headers:{Authorization:`Bearer ${i}`}})).json()).data.filter(s=>s.id.startsWith("gpt-")).map(s=>({id:s.id,name:s.id}));if(e==="gemini"){try{const o=await(await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${i}`)).json();if(o.models&&Array.isArray(o.models))return o.models.filter(s=>s.supportedGenerationMethods.includes("generateContent")).map(s=>({id:s.name.replace("models/",""),name:s.displayName||s.name.replace("models/",""),description:s.description}))}catch(n){throw v.warn("Dynamic Gemini model fetch failed:",n),new Error("Failed to fetch Gemini models. Check your API key.")}return[]}}catch(n){throw v.error(`Error fetching models for ${e}:`,n),n}return[]}async processPrompt(e,i){const n=this.getSettings(),o=n.ai_provider||"gemini",s=n[`ai_api_key_${o}`];let r=n[`ai_model_${o}`];if(!r&&o==="gemini"){v.log("No model selected, attempting to auto-detect...");try{const d=await this.fetchModels(o,s);if(d.length>0)r=(d.find(g=>g.id.includes("flash"))||d.find(g=>g.id.includes("1.5-pro"))||d.find(g=>g.id.includes("gemini-pro"))||d[0]).id,v.log(`Auto-detected model: ${r}`),h.updateSettings({[`ai_model_${o}`]:r});else throw new Error("No models found for this API Key.")}catch(d){v.error("Auto-detection failed:",d),r="gemini-2.0-flash"}}if(!s)throw new Error(`Missing API Key for ${o}. Configure it in Editor Settings → AI.`);if(!r)throw new Error(`No model selected for ${o}. Please pick one in Editor Settings → AI.`);const a=this.getSystemPrompt(),l={...i,widgets:i.widgets.map(d=>this.minifyWidget(d))},c=`
Current Layout Context:
${JSON.stringify(l,null,2)}

User Request:
${e}

Respond ONLY with valid JSON containing the updated "widgets" array for the current page. Do not include any explanation.
`.trim();try{let d="";o==="gemini"?d=await this.callGemini(s,r,a,c):o==="openai"?d=await this.callOpenAI(s,r,a,c):o==="openrouter"&&(d=await this.callOpenRouter(s,r,a,c));let p=d.trim();if(p.includes("```")){const m=p.match(/```(?:json)?\s*([\s\S]*?)\s*```/);m&&m[1]&&(p=m[1].trim())}const g=p.indexOf("["),u=p.indexOf("{");let f=-1,y=-1;g!==-1&&(u===-1||g<u)?(f=g,y=p.lastIndexOf("]")):u!==-1&&(f=u,y=p.lastIndexOf("}")),f!==-1&&y!==-1&&y>f&&(p=p.substring(f,y+1));try{const m=JSON.parse(p);return Array.isArray(m)?m:m.widgets||m}catch(m){v.warn("Fast JSON parse failed, trying repair...",m);try{const _=this.repairJson(p),b=JSON.parse(_);return Array.isArray(b)?b:b.widgets||b}catch(_){throw v.error("JSON repair failed:",_),new Error("AI returned malformed JSON (possibly truncated). Try a shorter prompt or a more powerful model.")}}}catch(d){throw v.error("AI processing failed:",d),d}}async callGemini(e,i,n,o){const s=`https://generativelanguage.googleapis.com/v1beta/models/${i}:generateContent?key=${e}`,r={contents:[{role:"user",parts:[{text:n+`

`+o}]}],generationConfig:{temperature:.1,topP:.95,topK:40,maxOutputTokens:8192,responseMimeType:"application/json"}},a=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}),l=await a.json();if(a.status===429)throw new Error("⚠️ Rate Limit Exceeded: You are sending requests too quickly for the free tier. Please wait a minute and try again.");if(l.error)throw new Error(l.error.message);return l.candidates[0].content.parts[0].text}async callOpenAI(e,i,n,o){const r=i&&i.toLowerCase().includes("gpt-5")?{type:"json_schema",json_schema:{name:"widget_layout",strict:!0,schema:{type:"object",properties:{widgets:{type:"array",items:{type:"object"}}},required:["widgets"],additionalProperties:!1}}}:{type:"json_object"},l=await(await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({model:i,messages:[{role:"system",content:n},{role:"user",content:o}],temperature:.1,max_tokens:8192,response_format:r})})).json();if(l.error)throw new Error(l.error.message);return l.choices[0].message.content}async callOpenRouter(e,i,n,o){const r=await(await fetch("https://openrouter.ai/api/v1/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({model:i,messages:[{role:"system",content:n},{role:"user",content:o}],temperature:.1,max_tokens:4096})})).json();if(r.error)throw new Error(r.error.message);return r.choices[0].message.content}getSystemPrompt(){return`
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
5. CANVAS BOUNDS: Stay within ${JSON.stringify(h.getCanvasDimensions())}.
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
`.trim()}repairJson(e){let i=[],n=!1,o=!1;for(let r=0;r<e.length;r++){const a=e[r];if(o){o=!1;continue}if(a==="\\"){o=!0;continue}if(a==='"'){n=!n;continue}n||(a==="["||a==="{"?i.push(a==="["?"]":"}"):(a==="]"||a==="}")&&i.length>0&&i[i.length-1]===a&&i.pop())}let s=e;for(n&&(s+='"'),s=s.trim().replace(/,\s*$/,"");i.length>0;)s+=i.pop();return s}minifyWidget(e){const{id:i,type:n,x:o,y:s,width:r,height:a,...l}=e;return{id:i,type:n,x:o,y:s,width:r,height:a,...l}}}const oe=new Gl;class Wl{constructor(){this.modal=document.getElementById("editorSettingsModal"),this.closeBtn=document.getElementById("editorSettingsClose"),this.doneBtn=document.getElementById("editorSettingsDone"),this.snapToGrid=document.getElementById("editorSnapToGrid"),this.showGrid=document.getElementById("editorShowGrid"),this.lightMode=document.getElementById("editorLightMode"),this.refreshEntitiesBtn=document.getElementById("editorRefreshEntities"),this.entityCountLabel=document.getElementById("editorEntityCount"),this.gridOpacity=document.getElementById("editorGridOpacity"),this.extendedLatinGlyphs=document.getElementById("editorExtendedLatinGlyphs"),this.haManualUrl=document.getElementById("haManualUrl"),this.haLlatToken=document.getElementById("haLlatToken"),this.testHaBtn=document.getElementById("editorTestHaBtn"),this.haTestResult=document.getElementById("haTestResult"),this.haDeployedWarning=document.getElementById("haDeployedWarning"),this.haCorsTip=document.getElementById("haCorsTip"),this.aiProvider=document.getElementById("aiProvider"),this.aiApiKeyGemini=document.getElementById("aiApiKeyGemini"),this.aiApiKeyOpenai=document.getElementById("aiApiKeyOpenai"),this.aiApiKeyOpenrouter=document.getElementById("aiApiKeyOpenrouter"),this.aiModelFilter=document.getElementById("aiModelFilter"),this.aiModelSelect=document.getElementById("aiModelSelect"),this.aiRefreshModelsBtn=document.getElementById("aiRefreshModelsBtn"),this.aiTestResult=document.getElementById("aiTestResult"),this.aiKeyRows={gemini:document.getElementById("aiKeyGeminiRow"),openai:document.getElementById("aiKeyOpenaiRow"),openrouter:document.getElementById("aiKeyOpenrouterRow")}}init(){this.modal&&(this.closeBtn&&this.closeBtn.addEventListener("click",()=>this.close()),this.doneBtn&&this.doneBtn.addEventListener("click",()=>this.close()),this.setupListeners())}open(){if(!this.modal)return;const e=h.settings;this.snapToGrid&&(this.snapToGrid.checked=h.snapEnabled!==!1),this.showGrid&&(this.showGrid.checked=h.showGrid!==!1),this.lightMode&&(this.lightMode.checked=!!e.editor_light_mode),this.aiProvider&&(this.aiProvider.value=e.ai_provider||"gemini"),this.aiApiKeyGemini&&(this.aiApiKeyGemini.value=e.ai_api_key_gemini||""),this.aiApiKeyOpenai&&(this.aiApiKeyOpenai.value=e.ai_api_key_openai||""),this.aiApiKeyOpenrouter&&(this.aiApiKeyOpenrouter.value=e.ai_api_key_openrouter||""),this.aiModelFilter&&(this.aiModelFilter.value=e.ai_model_filter||""),this.updateAIKeyVisibility(),this.refreshModelSelect(),this.gridOpacity&&(this.gridOpacity.value=e.grid_opacity!==void 0?e.grid_opacity:20);const i=e.glyphsets||["GF_Latin_Kernel"];document.querySelectorAll(".glyphset-checkbox").forEach(s=>{s.checked=i.includes(s.value)}),this.extendedLatinGlyphs&&(this.extendedLatinGlyphs.checked=!!e.extendedLatinGlyphs);const n=bi();this.haManualUrl&&(this.haManualUrl.value=nn()||"",this.haManualUrl.disabled=n,this.haManualUrl.style.opacity=n?"0.5":"1"),this.haLlatToken&&(this.haLlatToken.value=mt()||"",this.haLlatToken.disabled=n,this.haLlatToken.style.opacity=n?"0.5":"1"),this.haDeployedWarning&&this.haDeployedWarning.classList.toggle("hidden",!n),this.haCorsTip&&this.haCorsTip.classList.toggle("hidden",n),this.haTestResult&&(this.haTestResult.textContent=""),this.aiTestResult&&(this.aiTestResult.textContent="");const o=document.getElementById("haOriginPlaceholder");o&&(o.textContent=window.location.origin),this.updateEntityCount(),this.modal.classList.remove("hidden"),this.modal.style.display="flex"}close(){this.modal&&(this.modal.classList.add("hidden"),this.modal.style.display="none")}updateEntityCount(){if(this.entityCountLabel&&window.entityStatesCache){const e=Object.keys(window.entityStatesCache).length;this.entityCountLabel.textContent=`${e} entities cached`}}setupListeners(){this.snapToGrid&&this.snapToGrid.addEventListener("change",()=>{h.setSnapEnabled(this.snapToGrid.checked)}),this.showGrid&&this.showGrid.addEventListener("change",()=>{h.setShowGrid(this.showGrid.checked);const n=document.querySelector(".canvas-grid");n&&(n.style.display=this.showGrid.checked?"block":"none")}),this.lightMode&&this.lightMode.addEventListener("change",()=>{const n=this.lightMode.checked;h.updateSettings({editor_light_mode:n}),this.applyEditorTheme(n),P(I.STATE_CHANGED)}),this.gridOpacity&&this.gridOpacity.addEventListener("input",()=>{const n=parseInt(this.gridOpacity.value,10);h.updateSettings({grid_opacity:n})}),this.refreshEntitiesBtn&&this.refreshEntitiesBtn.addEventListener("click",async()=>{this.refreshEntitiesBtn.disabled=!0,this.refreshEntitiesBtn.textContent="Refreshing...",Ce?await Ce():window.fetchEntityStates&&await window.fetchEntityStates(),this.updateEntityCount(),this.refreshEntitiesBtn.disabled=!1,this.refreshEntitiesBtn.textContent="↻ Refresh Entity List"}),this.haManualUrl&&this.haManualUrl.addEventListener("change",()=>{on(this.haManualUrl.value.trim()),Tt()}),this.haLlatToken&&this.haLlatToken.addEventListener("change",()=>{vi(this.haLlatToken.value.trim())}),this.testHaBtn&&this.testHaBtn.addEventListener("click",async()=>{this.testHaBtn.disabled=!0,this.haTestResult.textContent="Testing...",this.haTestResult.style.color="var(--muted)";try{Tt();const n=await Ce();n&&n.length>0?(this.haTestResult.textContent="✅ Success!",this.haTestResult.style.color="var(--success)",this.updateEntityCount()):(this.haTestResult.innerHTML="❌ Failed.<br>Did you add <strong>cors_allowed_origins</strong> to HA and <strong>restart</strong> it?",this.haTestResult.style.color="var(--danger)")}catch{this.haTestResult.innerHTML="❌ Connection Error.<br>Check browser console.",this.haTestResult.style.color="var(--danger)"}finally{this.testHaBtn.disabled=!1}}),this.aiProvider&&this.aiProvider.addEventListener("change",()=>{h.updateSettings({ai_provider:this.aiProvider.value}),this.updateAIKeyVisibility(),this.refreshModelSelect()});const e=(n,o)=>{const s=document.getElementById(n);s&&s.addEventListener("input",()=>h.updateSettings({[o]:s.value.trim()}))};e("aiApiKeyGemini","ai_api_key_gemini"),e("aiApiKeyOpenai","ai_api_key_openai"),e("aiApiKeyOpenrouter","ai_api_key_openrouter"),this.aiModelFilter&&this.aiModelFilter.addEventListener("input",()=>{h.updateSettings({ai_model_filter:this.aiModelFilter.value}),this.filterModels()}),this.aiModelSelect&&this.aiModelSelect.addEventListener("change",()=>{const n=h.settings.ai_provider;h.updateSettings({[`ai_model_${n}`]:this.aiModelSelect.value})}),this.aiRefreshModelsBtn&&this.aiRefreshModelsBtn.addEventListener("click",async()=>{const n=h.settings.ai_provider||"gemini";let o=h.settings[`ai_api_key_${n}`];const s=`aiApiKey${n.charAt(0).toUpperCase()+n.slice(1)}`,r=document.getElementById(s);if(r&&(o=r.value.trim(),h.updateSettings({[`ai_api_key_${n}`]:o})),!o){A("Please enter an API key first",3e3,"error");return}this.aiRefreshModelsBtn.disabled=!0,this.aiRefreshModelsBtn.textContent="...",this.aiTestResult&&(this.aiTestResult.textContent="Testing...",this.aiTestResult.style.color="var(--muted)");try{const a=await oe.fetchModels(n,o);oe.cache.models[n]=a,this.refreshModelSelect(),this.aiTestResult&&(this.aiTestResult.textContent=`✅ Success! Found ${a.length} models.`,this.aiTestResult.style.color="var(--success)")}catch{this.aiTestResult&&(this.aiTestResult.textContent="❌ Failed. Check key/console.",this.aiTestResult.style.color="var(--danger)")}finally{this.aiRefreshModelsBtn.disabled=!1,this.aiRefreshModelsBtn.textContent="Test & Load Models"}}),document.querySelectorAll(".glyphset-checkbox").forEach(n=>{n.addEventListener("change",()=>{const o=Array.from(document.querySelectorAll(".glyphset-checkbox:checked")).map(s=>s.value);h.updateSettings({glyphsets:o})})}),this.extendedLatinGlyphs&&this.extendedLatinGlyphs.addEventListener("change",()=>{h.updateSettings({extendedLatinGlyphs:this.extendedLatinGlyphs.checked})}),this.modal.querySelectorAll(".settings-category-header").forEach(n=>{n.addEventListener("click",()=>{const o=n.closest(".settings-category");o.classList.contains("expanded")?o.classList.remove("expanded"):o.classList.add("expanded")})})}updateAIKeyVisibility(){const e=h.settings.ai_provider||"gemini";Object.keys(this.aiKeyRows).forEach(i=>{this.aiKeyRows[i]&&(this.aiKeyRows[i].style.display=i===e?"block":"none")})}async refreshModelSelect(){if(!this.aiModelSelect)return;const e=h.settings.ai_provider||"gemini";if(!oe||!oe.cache)return;let i=oe.cache.models[e];i||(i=[],i=await oe.fetchModels(e,h.settings.ai_api_key),oe.cache.models[e]=i),this.filterModels()}filterModels(){if(!this.aiModelSelect)return;const e=h.settings.ai_provider||"gemini",i=(h.settings.ai_model_filter||"").toLowerCase();if(!oe||!oe.cache)return;const o=(oe.cache.models[e]||[]).filter(r=>r.name.toLowerCase().includes(i)||r.id.toLowerCase().includes(i));this.aiModelSelect.innerHTML="",o.forEach(r=>{const a=document.createElement("option");a.value=r.id,a.textContent=r.name,this.aiModelSelect.appendChild(a)});const s=h.settings[`ai_model_${e}`];s&&(this.aiModelSelect.value=s)}applyEditorTheme(e){e?document.documentElement.setAttribute("data-theme","light"):document.documentElement.removeAttribute("data-theme");try{localStorage.setItem("reterminal-editor-theme",e?"light":"dark")}catch(i){v.log("Could not save theme preference:",i)}}}class Fl{constructor(){this.modal=document.getElementById("pageSettingsModal"),this.closeBtn=document.getElementById("pageSettingsClose"),this.saveBtn=document.getElementById("pageSettingsSave"),this.nameInput=document.getElementById("pageSettingsName"),this.refreshInput=document.getElementById("pageSettingsRefresh"),this.refreshModeInput=document.getElementById("pageSettingsRefreshMode"),this.refreshTimeInput=document.getElementById("pageSettingsRefreshTime"),this.fieldInterval=document.getElementById("field-refresh-interval"),this.fieldTime=document.getElementById("field-refresh-time"),this.darkModeInput=document.getElementById("pageSettingsDarkMode"),this.layoutModeInput=document.getElementById("pageSettingsLayoutMode"),this.gridSizeInput=document.getElementById("pageSettingsGridSize"),this.fieldGridSize=document.getElementById("field-grid-size"),this.visibleFromInput=document.getElementById("pageSettingsVisibleFrom"),this.visibleToInput=document.getElementById("pageSettingsVisibleTo"),this.pageIndex=-1}init(){this.modal&&(this.closeBtn&&this.closeBtn.addEventListener("click",()=>this.close()),this.saveBtn&&this.saveBtn.addEventListener("click",()=>this.save()),this.refreshModeInput&&this.refreshModeInput.addEventListener("change",()=>this.updateVisibility()),this.layoutModeInput&&this.layoutModeInput.addEventListener("change",()=>this.updateGridVisibility()))}updateVisibility(){if(!this.refreshModeInput)return;const e=this.refreshModeInput.value;this.fieldInterval&&(this.fieldInterval.style.display=e==="interval"?"block":"none"),this.fieldTime&&(this.fieldTime.style.display=e==="daily"?"block":"none")}updateGridVisibility(){if(!this.layoutModeInput||!this.fieldGridSize)return;const e=this.layoutModeInput.value;this.fieldGridSize.style.display=e==="grid"?"block":"none"}open(e){if(!this.modal)return;this.pageIndex=e;const i=h.pages[e];if(!i)return;this.nameInput&&(this.nameInput.value=i.name||"");const n=i.refresh_type||"interval";this.refreshModeInput&&(this.refreshModeInput.value=n),this.refreshInput&&(this.refreshInput.value=i.refresh_s||""),this.refreshTimeInput&&(this.refreshTimeInput.value=i.refresh_time||"08:00"),this.darkModeInput&&(this.darkModeInput.value=i.dark_mode||"inherit"),this.layoutModeInput&&(this.layoutModeInput.value=i.layout?"grid":"absolute"),this.gridSizeInput&&(this.gridSizeInput.value=i.layout||"4x4"),this.visibleFromInput&&(this.visibleFromInput.value=i.visible_from||""),this.visibleToInput&&(this.visibleToInput.value=i.visible_to||""),this.updateVisibility(),this.updateGridVisibility(),this.modal.classList.remove("hidden"),this.modal.style.display="flex"}close(){this.modal&&(this.modal.classList.add("hidden"),this.modal.style.display="none")}save(){if(this.pageIndex===-1)return;const e=h.pages[this.pageIndex];if(!e)return;const i=this.nameInput?this.nameInput.value:e.name,n=this.refreshModeInput?this.refreshModeInput.value:"interval",o=this.refreshInput?parseInt(this.refreshInput.value,10):NaN,s=this.refreshTimeInput?this.refreshTimeInput.value:"08:00",r=this.darkModeInput?this.darkModeInput.value:"inherit",a=this.layoutModeInput?this.layoutModeInput.value:"absolute",l=this.gridSizeInput?this.gridSizeInput.value.trim():"",c=this.visibleFromInput?this.visibleFromInput.value:"",d=this.visibleToInput?this.visibleToInput.value:"";e.name=i,e.refresh_type=n,n==="interval"?(!isNaN(o)&&o>=0?e.refresh_s=o:delete e.refresh_s,delete e.refresh_time):(e.refresh_time=s,delete e.refresh_s),e.dark_mode=r,a==="grid"&&/^\d+x\d+$/.test(l)?e.layout=l:e.layout=null,c?e.visible_from=c:delete e.visible_from,d?e.visible_to=d:delete e.visible_to,h.setPages(h.pages),N()&&typeof pe=="function"&&pe().then(()=>v.log("[PageSettings] Pages persisted to backend")).catch(p=>v.warn("[PageSettings] Failed to save pages to backend:",p)),this.close()}}let gt=null,Xn=!1;Object.defineProperty(window,"lastHighlightRange",{get:()=>gt,set:function(t){gt=t},configurable:!0});Object.defineProperty(window,"isAutoHighlight",{get:()=>Xn,set:function(t){Xn=t},configurable:!0});function et(t){const e=document.getElementById("snippetBox");if(!e)return;const i=e.value;if(!i)return;let n=Array.isArray(t)?t:t?[t]:[];if(n.length===0){try{e.setSelectionRange(0,0),e.scrollTop=0,gt=null}catch(l){v.error("[highlightWidgetInSnippet] Selection error:",l)}return}const o=document.querySelector(".code-panel-title");if(o&&o.textContent.includes("Selection Snippet")){try{e.setSelectionRange(0,i.length),e.focus(),gt={start:0,end:i.length}}catch(l){v.error("[highlightWidgetInSnippet] Selection error (SnippetMode):",l)}return}let r=-1,a=-1;if(n.forEach(l=>{let c=`id:${l}`,d=i.indexOf(c);if(d===-1&&(c=`id: ${l}`,d=i.indexOf(c)),d===-1&&(c=`"id":"${l}"`,d=i.indexOf(c)),d===-1&&(c=`"id": "${l}"`,d=i.indexOf(c)),d===-1&&(c=`# id: ${l}`,d=i.indexOf(c)),d!==-1){let p=i.lastIndexOf(`
`,d)+1;if(c.includes('":"')||c.includes('": "')){const m=i.lastIndexOf("{",d);m!==-1&&(p=i.lastIndexOf(`
`,m)+1)}if(!c.startsWith("# id:")){let m=p;for(;m>0;){const _=m-1,b=i.lastIndexOf(`
`,_-1)+1;if(i.substring(b,_).trim().startsWith("- type:")){p=b;break}if(p-m>500)break;m=b}}const g=["# widget:","// widget:","// page:","# id:","// ────────────────","// ═══════════════","// ▸ PAGE:"],u=["esphome:","logger:","api:","ota:","wifi:","ethernet:","psram:","substitutions:","external_components:","packages:","globals:","sensor:","binary_sensor:","text_sensor:","time:","script:","font:","image:","animation:","display:","lvgl:","i2c:","spi:","uart:","output:","light:","switch:","button:","number:","select:","climate:","fan:","cover:","  ]","    ]","  }","    }"];let f=-1;if(c.includes('":"')||c.includes('": "')){let m=0,_=!1;for(let b=p;b<i.length;b++){const S=i[b];if(S==="{"?(m++,_=!0):S==="}"&&m--,_&&m===0){f=b+1,i[b+1]===","&&f++;break}}}else{const _=i.indexOf(`
    - type:`,d+c.length);let b=-1;_!==-1&&(b=_),g.forEach(S=>{const x=i.indexOf(S,d+c.length);x!==-1&&(b===-1||x<b)&&(b=x)}),u.forEach(S=>{const x=`
`+S,E=i.indexOf(x,d+c.length);E!==-1&&(b===-1||E<b)&&(b=E+1)}),f=b!==-1?b:i.length}f===-1&&(f=i.length),(r===-1||p<r)&&(r=p),f>a&&(a=f)}}),r!==-1&&a!==-1){const l=document.activeElement?document.activeElement.tagName.toLowerCase():"",c=(l==="input"||l==="textarea")&&document.activeElement!==e,d=window.Canvas&&(window.Canvas.dragState||window.Canvas.lassoState);if(!c&&!d){window.isAutoHighlight=!0;try{e.setSelectionRange(r,a),n.length===1&&!window._undoRedoInProgress&&e.focus()}catch{}}window.lastHighlightRange={start:r,end:a},setTimeout(()=>{if(e.scrollTo){const p=i.substring(0,r).split(`
`),g=i.split(`
`).length,u=p.length,f=e.scrollHeight/g;e.scrollTop=u*f-50,e.scrollLeft=0}},10)}}function Kn(){const t=document.getElementById("snippetBox");if(!t)return;const e=()=>{window.isAutoHighlight&&(window.isAutoHighlight=!1)};t.addEventListener("mousedown",e),t.addEventListener("input",e),t.addEventListener("keydown",i=>{(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Tab","Home","End"].includes(i.key)||!i.ctrlKey&&!i.metaKey)&&e()}),v.log("[YAML Export] Interaction listeners attached to Snippet Box.")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Kn):Kn();class $l{constructor(){this.patterns=[{name:"comment",regex:/(#.*)/g},{name:"key",regex:/^(\s*)([^:\n]+)(:)/gm},{name:"string",regex:/("[^"]*"|'[^']*')/g},{name:"value",regex:/\b(true|false|null|[0-9]+(\.[0-9]+)?)\b/g},{name:"keyword",regex:/\b(lambda|script|on_.*|if|then|else|wait_until|delay)\b/g},{name:"tag",regex:/(![a-z_]+)/g}]}highlight(e){if(!e)return"";let i=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");const n=/^(\s*(?:-\s+)?)([^:\n]+)(:)|(#.*)|("[^"]*"|'[^']*')|(![a-z_]+)|\b(lambda|script|on_[a-z_]+|if|then|else|wait_until|delay)\b|\b(true|false|null|[0-9]+(?:\.[0-9]+)?)\b|(\|[-+]?|>[-+]?)/gm;return i.replace(n,(o,s,r,a,l,c,d,p,g,u)=>s!==void 0?`${s}<span class="hl-key">${r}</span><span class="hl-punc">${a}</span>`:l!==void 0?`<span class="hl-comment">${l}</span>`:c!==void 0?`<span class="hl-string">${c}</span>`:d!==void 0?`<span class="hl-tag">${d}</span>`:u!==void 0?`<span class="hl-punc">${u}</span>`:p!==void 0?`<span class="hl-keyword">${p}</span>`:g!==void 0?`<span class="hl-value">${g}</span>`:o)}}class zl{constructor(e){this.adapter=e,this.highlighter=new $l,this.suppressSnippetUpdate=!1,this.snippetDebounceTimer=null,this.lastGeneratedYaml="",this.isHighlighted=localStorage.getItem("esphome_designer_yaml_highlight")!=="false",this.init()}init(){this.bindEvents(),this.setupAutoUpdate(),this.setupScrollSync(),this.updateSnippetBox()}bindEvents(){const e=document.getElementById("fullscreenSnippetBtn");e&&e.addEventListener("click",()=>{this.openSnippetModal()});const i=document.getElementById("snippetFullscreenClose");i&&i.addEventListener("click",()=>{const u=document.getElementById("snippetFullscreenModal");u&&u.classList.add("hidden")});const n=document.getElementById("importSnippetConfirm");n&&n.addEventListener("click",async()=>{await this.handleImportSnippet()});const o=document.getElementById("updateLayoutBtn");o&&o.addEventListener("click",async()=>{const u=o.querySelector(".mdi"),f=u?.className||"";u&&(u.className="mdi mdi-loading mdi-spin"),o.disabled=!0;try{await this.handleUpdateLayoutFromSnippetBox(),u&&(u.className="mdi mdi-check",setTimeout(()=>{u.className=f},1500))}catch{u&&(u.className="mdi mdi-alert-circle-outline",setTimeout(()=>{u.className=f},1500))}finally{o.disabled=!1}});const s=document.getElementById("copySnippetBtn");s&&s.addEventListener("click",async()=>{this.copySnippetToClipboard(s)});const r=document.getElementById("copyLambdaBtn");r&&r.addEventListener("click",async()=>{this.copyLambdaToClipboard(r)});const a=document.getElementById("copyOEPLServiceBtn");a&&a.addEventListener("click",()=>{this.copyOEPLServiceToClipboard(a)});const l=document.getElementById("copyODPServiceBtn");l&&l.addEventListener("click",()=>{this.copySnippetToClipboard(l)});const c=document.getElementById("toggleYamlBtn"),d=document.querySelector(".code-panel");c&&d&&(localStorage.getItem("esphome_designer_yaml_collapsed")==="true"&&d.classList.add("collapsed"),c.addEventListener("click",()=>{const f=d.classList.toggle("collapsed");localStorage.setItem("esphome_designer_yaml_collapsed",f),window.dispatchEvent(new Event("resize"))}));const p=document.getElementById("toggleHighlightBtn");document.querySelector(".snippet-container"),p&&(document.querySelectorAll(".snippet-container").forEach(u=>{u.classList.toggle("highlighted",this.isHighlighted)}),document.querySelectorAll('[id*="ToggleHighlightBtn"]').forEach(u=>{u.classList.toggle("active",this.isHighlighted)}),p.addEventListener("click",()=>{this.isHighlighted=!this.isHighlighted,localStorage.setItem("esphome_designer_yaml_highlight",this.isHighlighted),document.querySelectorAll(".snippet-container").forEach(u=>{u.classList.toggle("highlighted",this.isHighlighted)}),document.querySelectorAll('[id*="ToggleHighlightBtn"]').forEach(u=>{u.classList.toggle("active",this.isHighlighted)}),this.isHighlighted&&this.updateHighlightLayer()}));const g=document.getElementById("snippetBox");g&&g.addEventListener("input",()=>{this.isHighlighted&&this.updateHighlightLayer()})}setupScrollSync(){const e=document.getElementById("snippetBox"),i=document.getElementById("highlightLayer");e&&i&&e.addEventListener("scroll",()=>{i.scrollTop=e.scrollTop,i.scrollLeft=e.scrollLeft})}setupAutoUpdate(){F(I.STATE_CHANGED,()=>{this.suppressSnippetUpdate||this.updateSnippetBox()}),F(I.SELECTION_CHANGED,e=>{const i=e&&e.widgetIds?e.widgetIds:[];typeof et=="function"&&et(i)})}updateHighlightLayer(){if(!this.isHighlighted)return;const e=document.getElementById("snippetBox"),i=document.getElementById("highlightLayer");e&&i&&(i.innerHTML=this.highlighter.highlight(e.value));const n=document.getElementById("snippetFullscreenHighlight"),o=document.getElementById("snippetFullscreenContent");if(n&&o){const s=o.querySelector("textarea");s&&(n.innerHTML=this.highlighter.highlight(s.value))}}updateSnippetBox(){const e=document.getElementById("snippetBox");e&&(this.snippetDebounceTimer&&clearTimeout(this.snippetDebounceTimer),this.snippetDebounceTimer=setTimeout(()=>{if(!this.suppressSnippetUpdate)try{const n=(h?h.selectedWidgetIds:[]).length>1,o=this.adapter&&this.adapter.constructor.name,s=o==="OEPLAdapter",r=o==="OpenDisplayAdapter",a=document.getElementById("oeplNotice");a&&a.classList.toggle("hidden",!s);const l=document.getElementById("odpNotice");if(l&&(l.classList.toggle("hidden",!r),r)){const m=l.querySelector("div");m&&(m.innerHTML="<strong>OpenDisplay YAML (ODP)</strong> - Copy this to Home Assistant → Developer Tools → Services → <code>opendisplay.drawcustom</code>")}const c=document.querySelector(".code-panel-title");if(c){const m=c.querySelector("button");c.innerHTML="",m&&c.appendChild(m);let _=" ESPHome YAML";s&&(_=" OpenEpaperLink JSON"),r&&(_=" OpenDisplay YAML (ODP)"),c.appendChild(document.createTextNode(_))}const d=document.getElementById("copyOEPLServiceBtn");d&&(d.style.display=s?"inline-block":"none");const p=document.getElementById("copyODPServiceBtn");p&&(p.style.display=r?"inline-block":"none");const g=document.getElementById("copyLambdaBtn");g&&(g.style.display=s||r?"none":"inline-block");const u=document.getElementById("updateLayoutBtn");u&&(u.style.display="inline-block");const f=h?h.getPagesPayload():{pages:[]},y=JSON.parse(JSON.stringify(f));window.currentDeviceModel&&window.currentDeviceModel!==y.deviceModel&&(v.log(`[SnippetManager] Overriding stale deviceModel '${y.deviceModel}' with '${window.currentDeviceModel}'`),y.deviceModel=window.currentDeviceModel,y.device_model=window.currentDeviceModel,y.settings&&(y.settings.device_model=window.currentDeviceModel)),this.adapter.generate(y).then(m=>{this.lastGeneratedYaml=m,e.value=m,this.isHighlighted&&this.updateHighlightLayer();const _=h?h.selectedWidgetIds:[];typeof et=="function"&&et(_)}).catch(m=>{v.error("Error generating snippet via adapter:",m),e.value="# Error generating YAML (adapter): "+m.message,this.isHighlighted&&this.updateHighlightLayer()})}catch(i){v.error("Error generating snippet:",i),e.value="# Error generating YAML: "+i.message,this.isHighlighted&&this.updateHighlightLayer()}},50))}openSnippetModal(){const e=document.getElementById("snippetFullscreenModal"),i=document.getElementById("snippetFullscreenContainer"),n=document.getElementById("snippetFullscreenContent"),o=document.getElementById("snippetFullscreenHighlight"),s=document.getElementById("snippetBox"),r=document.getElementById("toggleFullscreenHighlightBtn");if(!e||!i||!n||!o||!s)return;i.classList.toggle("highlighted",this.isHighlighted),r&&r.classList.toggle("active",this.isHighlighted),r&&!r.hasListener&&(r.addEventListener("click",()=>{this.isHighlighted=!this.isHighlighted,localStorage.setItem("esphome_designer_yaml_highlight",this.isHighlighted);const l=document.querySelector(".snippet-container"),c=document.getElementById("toggleHighlightBtn");l&&l.classList.toggle("highlighted",this.isHighlighted),c&&c.classList.toggle("active",this.isHighlighted),i.classList.toggle("highlighted",this.isHighlighted),r.classList.toggle("active",this.isHighlighted),this.isHighlighted&&(o.innerHTML=this.highlighter.highlight(a.value),this.updateHighlightLayer())}),r.hasListener=!0);let a=n.querySelector("textarea");if(!a){n.innerHTML="",a=document.createElement("textarea"),a.className="snippet-box",a.style.width="100%",a.style.height="100%",a.style.background="transparent",a.spellcheck=!1,n.appendChild(a),a.addEventListener("scroll",()=>{o.scrollTop=a.scrollTop,o.scrollLeft=a.scrollLeft}),a.addEventListener("input",()=>{this.isHighlighted&&(o.innerHTML=this.highlighter.highlight(a.value))});let l=e.querySelector(".modal-actions");if(l&&!l.querySelector("#fullscreenUpdateBtn")){const c=document.createElement("button");c.id="fullscreenUpdateBtn",c.className="btn btn-primary",c.textContent="Update Layout from YAML",c.onclick=()=>{s.value=a.value,this.handleUpdateLayoutFromSnippetBox(),e.classList.add("hidden")},l.insertBefore(c,l.firstChild)}}a.value=s.value||"",this.isHighlighted&&(o.innerHTML=this.highlighter.highlight(a.value),setTimeout(()=>{o.scrollTop=a.scrollTop,o.scrollLeft=a.scrollLeft},50)),e.style.display="",e.classList.remove("hidden")}async handleImportSnippet(){const e=document.getElementById("importSnippetTextarea"),i=document.getElementById("importSnippetError");if(!e)return;const n=e.value;if(n.trim())try{i&&(i.textContent="");let o;try{o=Nn(n),v.log("[handleImportSnippet] Successfully used offline parser.")}catch(r){if(v.warn("[handleImportSnippet] Offline parser failed, falling back to backend:",r),N())o=await La(n);else throw r}we(o);const s=document.getElementById("importSnippetModal");s&&(s.classList.add("hidden"),s.style.display="none"),A("Layout imported successfully","success")}catch(o){v.error("Import failed:",o),i&&(i.textContent=`Error: ${o.message}`)}}async handleUpdateLayoutFromSnippetBox(){const e=document.getElementById("snippetBox");if(!e)return;const i=e.value;if(i.trim()){if(this.lastGeneratedYaml&&i.trim()===this.lastGeneratedYaml.trim()){v.log("[handleUpdateLayoutFromSnippetBox] Skipping update: Snippet matches last generated state.");return}try{const n=h?.currentLayoutId||"reterminal_e1001",o=h?.deviceName||"Layout 1",s=h?.deviceModel||h?.settings?.device_model||"reterminal_e1001";v.log(`[handleUpdateLayoutFromSnippetBox] Preserving context - ID: ${n}, Name: ${o}`);let r=Nn(i);r.device_id=n,r.name=o,r.device_model=s,r.settings||(r.settings={}),r.settings.device_model=s,r.settings.device_name=o;const a=h?.settings?.dark_mode||!1;r.settings.dark_mode=a,this.suppressSnippetUpdate=!0,this.snippetDebounceTimer&&(clearTimeout(this.snippetDebounceTimer),this.snippetDebounceTimer=null),we(r),setTimeout(()=>{this.suppressSnippetUpdate=!1},1500),A("Layout updated from YAML","success"),(i.includes("lambda:")||i.includes("script:"))&&setTimeout(()=>{A("Note: Custom C++ (lambda/script) may not fully preview.","warning",4e3)},800)}catch(n){v.error("Update layout failed:",n),A(`Update failed: ${n.message}`,"error"),this.suppressSnippetUpdate=!1}}}async copySnippetToClipboard(e){const i=document.getElementById("snippetBox");if(!i)return;const n=i.value||"",o=e.textContent,s=()=>{e.textContent="Copied!",e.style.minWidth=e.offsetWidth+"px",setTimeout(()=>{e.textContent=o,e.style.minWidth=""},2e3)};try{if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(n),A("Snippet copied to clipboard","success"),s();else{const r=document.createElement("textarea");r.value=n,r.style.position="fixed",r.style.left="-999999px",r.style.top="-999999px",document.body.appendChild(r),r.focus(),r.select();try{document.execCommand("copy"),A("Snippet copied to clipboard","success"),s()}catch{A("Unable to copy. Try selecting and copying manually.","error")}document.body.removeChild(r)}}catch(r){v.error("Copy failed:",r),A("Unable to copy snippet","error")}}async copyLambdaToClipboard(e){const i=document.getElementById("snippetBox");if(!i)return;const n=i.value||"",o=e.textContent,s=n.search(/^display:\s*$/m);if(s===-1){A("No display section found in output","warning");return}const r=n.substring(s),a=r.match(/\n[a-z_]+:\s*(?:\n|$)/),c=(a?r.substring(0,a.index):r).match(/lambda:\s*\|-\n([\s\S]*?)$/);if(!c){A("No display lambda found in output","warning");return}const p=c[1].split(`
`),g=p.filter(m=>m.trim().length>0);if(g.length===0){A("Lambda appears to be empty","warning");return}const u=Math.min(...g.map(m=>m.match(/^(\s*)/)[1].length)),f=p.map(m=>m.length>=u?m.substring(u):m).join(`
`).trim(),y=()=>{e.textContent="Copied!",e.style.minWidth=e.offsetWidth+"px",setTimeout(()=>{e.textContent=o,e.style.minWidth=""},2e3)};try{if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(f),A("Display lambda copied to clipboard","success"),y();else{const m=document.createElement("textarea");m.value=f,m.style.position="fixed",m.style.left="-999999px",m.style.top="-999999px",document.body.appendChild(m),m.focus(),m.select();try{document.execCommand("copy"),A("Display lambda copied to clipboard","success"),y()}catch{A("Unable to copy. Try selecting and copying manually.","error")}document.body.removeChild(m)}}catch(m){v.error("Copy lambda failed:",m),A("Unable to copy lambda","error")}}async copyOEPLServiceToClipboard(e){const i=document.getElementById("snippetBox");if(!i)return;let n=i.value||"",o="";try{const s=JSON.parse(n),r=h.settings.oeplEntityId||"open_epaper_link.0000000000000000";s.target.entity_id=r,s.data.dither=h.settings.oeplDither??2,o=`service: ${s.service}
`,o+=`target:
  entity_id: ${s.target.entity_id}
`,o+=`data:
`,o+=`  background: ${s.data.background}
`,o+=`  rotate: ${s.data.rotate}
`,o+=`  dither: ${s.data.dither}
`,o+=`  ttl: ${s.data.ttl}
`,o+=`  payload: >
`;const a=JSON.stringify(s.data.payload);o+=`    ${a}`;const l=e.textContent;if(navigator.clipboard)await navigator.clipboard.writeText(o),A("HA Service call copied!","success");else{const c=document.createElement("textarea");c.value=o,document.body.appendChild(c),c.select(),document.execCommand("copy"),document.body.removeChild(c),A("HA Service call copied!","success")}e.textContent="Copied!",setTimeout(()=>{e.textContent=l},2e3)}catch(s){v.error("Failed to format/copy OEPL service:",s),A("Failed to format service call","error")}}}class Ro{constructor(){this.init()}init(){window.addEventListener("keydown",e=>this.handleKeyDown(e))}handleKeyDown(e){const i=h||h;if(!i){v.error("KeyboardHandler: AppState not found!");return}const n=i.selectedWidgetIds.length>0;i.selectedWidgetId;const o=window.isAutoHighlight||!1;if(e.shiftKey&&e.code==="Space"){(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA")&&e.target.blur(),e.preventDefault(),window.QuickSearch&&window.QuickSearch.open();return}if((e.key==="Delete"||e.key==="Backspace")&&n){const s=window.lastHighlightRange;if(e.target.id==="snippetBox"&&s&&e.target.selectionStart===s.start&&e.target.selectionEnd===s.end){e.preventDefault(),this.deleteWidget(null);return}if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA")return;e.preventDefault(),this.deleteWidget(null);return}if((e.ctrlKey||e.metaKey)&&e.key&&e.key.toLowerCase()==="c"){if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"){if(e.target.id==="snippetBox"&&o){e.preventDefault(),this.copyWidget();return}return}e.preventDefault(),this.copyWidget();return}if((e.ctrlKey||e.metaKey)&&e.key&&e.key.toLowerCase()==="v"){if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"){if(e.target.id==="snippetBox"&&o){e.preventDefault(),this.pasteWidget();return}return}e.preventDefault(),this.pasteWidget();return}if((e.ctrlKey||e.metaKey)&&e.key&&e.key.toLowerCase()==="z"&&!e.shiftKey){if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"){if(e.target.id==="snippetBox"&&o){e.preventDefault(),window._undoRedoInProgress=!0,i.undo(),setTimeout(()=>{window._undoRedoInProgress=!1},100);return}return}e.preventDefault(),window._undoRedoInProgress=!0,i.undo(),setTimeout(()=>{window._undoRedoInProgress=!1},100);return}if((e.ctrlKey||e.metaKey)&&e.key&&(e.key.toLowerCase()==="y"||e.key.toLowerCase()==="z"&&e.shiftKey)){if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"){if(e.target.id==="snippetBox"&&o){e.preventDefault(),window._undoRedoInProgress=!0,i.redo(),setTimeout(()=>{window._undoRedoInProgress=!1},100);return}return}e.preventDefault(),window._undoRedoInProgress=!0,i.redo(),setTimeout(()=>{window._undoRedoInProgress=!1},100);return}if((e.ctrlKey||e.metaKey)&&e.key&&e.key.toLowerCase()==="l"&&n){e.preventDefault();const r=i.getSelectedWidgets().every(a=>a.locked);i.updateWidgets(i.selectedWidgetIds,{locked:!r})}if((e.ctrlKey||e.metaKey)&&e.key&&e.key.toLowerCase()==="a"){const s=e.target.id==="snippetBox"&&o;if(e.target.tagName!=="INPUT"&&e.target.tagName!=="TEXTAREA"||s){e.preventDefault(),i.selectAllWidgets();return}}if(e.key&&e.key.toLowerCase()==="g"&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey&&e.target.tagName!=="INPUT"&&e.target.tagName!=="TEXTAREA"){e.preventDefault();const s=!i.showGrid;if(i.setShowGrid(s),s){i.setShowDebugGrid(!1);const a=document.getElementById("debugGridToggleBtn");a&&a.classList.remove("active")}const r=document.getElementById("gridToggleBtn");r&&r.classList.toggle("active",s),P(I.STATE_CHANGED),v.log(`[Keyboard] Grid toggled: ${s}`);return}if(e.key&&e.key.toLowerCase()==="d"&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey&&e.target.tagName!=="INPUT"&&e.target.tagName!=="TEXTAREA"){e.preventDefault();const s=!i.showDebugGrid;if(i.setShowDebugGrid(s),s){i.setShowGrid(!1);const a=document.getElementById("gridToggleBtn");a&&a.classList.remove("active")}const r=document.getElementById("debugGridToggleBtn");r&&r.classList.toggle("active",s),P(I.STATE_CHANGED),v.log(`[Keyboard] Debug mode toggled: ${s}`);return}if(e.key&&e.key.toLowerCase()==="r"&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey&&e.target.tagName!=="INPUT"&&e.target.tagName!=="TEXTAREA"){e.preventDefault();const s=!i.showRulers;i.setShowRulers(s);const r=document.getElementById("rulersToggleBtn");r&&r.classList.toggle("active",s),v.log(`[Keyboard] Rulers toggled: ${s}`);return}e.key==="Escape"&&(document.activeElement&&(document.activeElement.tagName==="INPUT"||document.activeElement.tagName==="TEXTAREA")&&document.activeElement.blur(),i.selectedWidgetIds.length>0&&(i.selectWidgets([]),P(I.STATE_CHANGED)))}static isInput(e){return e.tagName==="INPUT"||e.tagName==="TEXTAREA"}deleteWidget(e){const i=h||h;i&&i.deleteWidget(e)}copyWidget(){const e=h||h;e&&e.copyWidget()}pasteWidget(){const e=h||h;e&&e.pasteWidget()}}window.KeyboardHandler=Ro;class Ne{constructor(){if(this.constructor===Ne)throw new Error("BaseAdapter is abstract and cannot be instantiated directly.")}async generate(e){throw new Error("Method 'generate()' must be implemented.")}generatePage(e,i){throw new Error("Method 'generatePage()' must be implemented.")}generateWidget(e,i){throw new Error("Method 'generateWidget()' must be implemented.")}sanitize(e){return e}}window.BaseAdapter=Ne;function Ul(t,e="my_display",i=0,n={},o=!1){if(!t||!t.touch)return[];const s=t.touch,r=["touchscreen:"];r.push(`  - platform: ${s.platform}`),r.push("    id: my_touchscreen"),r.push(`    display: ${e}`),s.i2c_id&&r.push(`    i2c_id: ${s.i2c_id}`),s.spi_id&&r.push(`    spi_id: ${s.spi_id}`),s.address&&r.push(`    address: ${s.address}`),s.update_interval&&r.push(`    update_interval: ${s.update_interval}`);const a=(d,p)=>{p&&(typeof p=="string"||typeof p=="number"?r.push(`    ${d}: ${p}`):(r.push(`    ${d}:`),Object.entries(p).forEach(([g,u])=>r.push(`      ${g}: ${u}`))))};a("interrupt_pin",s.interrupt_pin),a("reset_pin",s.reset_pin),a("cs_pin",s.cs_pin);const l=s.transform||{};if((s.transform||s.mirror_x||s.mirror_y||s.swap_xy)&&(r.push("    transform:"),s.transform?(s.transform.swap_xy&&r.push("      swap_xy: true"),s.transform.mirror_x&&r.push("      mirror_x: true"),s.transform.mirror_y&&r.push("      mirror_y: true")):((s.mirror_x||l.mirror_x)&&r.push("      mirror_x: true"),(s.mirror_y||l.mirror_y)&&r.push("      mirror_y: true"),(s.swap_xy||l.swap_xy)&&r.push("      swap_xy: true"))),o&&n.lcdEcoStrategy==="dim_after_timeout"&&(r.push("    on_release:"),r.push("      - if:"),r.push("          condition: lvgl.is_paused"),r.push("          then:"),r.push("            - lvgl.resume:"),r.push("            - lvgl.widget.redraw:"),r.push("            - light.turn_on: display_backlight")),s.calibration){r.push("    calibration:");const d=s.calibration;Object.entries(d).forEach(([p,g])=>r.push(`      ${p}: ${g}`))}return r.push(""),r}function Jn(t){const e=[];if(!t||!t.backlight)return e;const i=t.backlight;return(i.platform==="ledc"||i.platform==="gpio"||i.platform==="switch")&&(i.platform==="switch"?(e.push("switch:"),e.push("  - platform: gpio"),e.push("    id: lcdbacklight"),e.push("    name: lcdbacklight"),typeof i.pin=="object"?(e.push("    pin:"),Object.entries(i.pin).forEach(([n,o])=>{typeof o=="object"?(e.push(`      ${n}:`),Object.entries(o).forEach(([s,r])=>e.push(`        ${s}: ${r}`))):e.push(`      ${n}: ${o}`)})):e.push(`    pin: ${i.pin}`),e.push("    restore_mode: ALWAYS_ON"),e.push("")):(e.push("output:"),e.push(`  - platform: ${i.platform}`),e.push("    id: gpio_backlight_pwm"),e.push(`    pin: ${i.pin}`),i.frequency&&e.push(`    frequency: ${i.frequency}`),e.push(""))),e.push("light:"),e.push("  - platform: monochromatic"),e.push("    name: Display Backlight"),e.push("    id: display_backlight"),e.push("    restore_mode: ALWAYS_ON"),i.platform==="switch"?(e.push("    output: fake_backlight_output"),e.push("    default_transition_length: 0s"),e.push(""),e.push("output:"),e.push("  - platform: template"),e.push("    id: fake_backlight_output"),e.push("    type: float"),e.push("    write_action:"),e.push("      - if:"),e.push("          condition:"),e.push("            lambda: 'return state > 0.0;'"),e.push("          then:"),e.push("            - switch.turn_on: lcdbacklight"),e.push("          else:"),e.push("            - switch.turn_off: lcdbacklight")):e.push("    output: gpio_backlight_pwm"),e.push(""),e}function Zn(t){const e=[];return t.external_components&&Array.isArray(t.external_components)&&t.external_components.length>0&&(e.push("external_components:"),e.push(...t.external_components),e.push("")),t.extra_components&&Array.isArray(t.extra_components)&&(e.push(...t.extra_components),e.push("")),t.extra_components_raw&&(e.push(t.extra_components_raw),e.push("")),e}function Qn(t){const e=[];return t&&t.pins&&t.pins.i2c&&(e.push("i2c:"),e.push("  - sda: "+t.pins.i2c.sda),e.push("    scl: "+t.pins.i2c.scl),e.push("    scan: "+(t.i2c_config?.scan!==!1)),e.push("    id: bus_a"),t.i2c_config?.frequency&&e.push("    frequency: "+t.i2c_config.frequency),e.push("")),e}function ei(t){const e=[];if(t&&t.pins&&t.pins.spi){e.push("spi:");const i=t.pins.spi;i.id?e.push(`  - id: ${i.id}`):e.push("  - id: spi_bus"),e.push(`    clk_pin: ${i.clk}`),i.mosi&&e.push(`    mosi_pin: ${i.mosi}`),i.miso&&e.push(`    miso_pin: ${i.miso}`),i.type==="quad"&&(e.push("    interface: triple"),i.data_pins&&e.push(`    data_pins: [${i.data_pins.join(", ")}]`)),e.push(""),t.extra_spi&&(e.push(...t.extra_spi),e.push(""))}return e}function ti(t,e={},i=!1){const n=[];if(!t)return n;const o=e.orientation||"landscape",s=t.resolution||{width:800,height:480},r=s.height>s.width,a=o==="portrait"||o==="portrait_inverted",l=o==="landscape_inverted"||o==="portrait_inverted";let c=0;if(r?c=a?0:90:c=a?90:0,l&&(c=(c+180)%360),t.rotation_offset&&(c=(c+t.rotation_offset)%360),t.display_config){n.push("display:");const p=t.display_config.filter(g=>!g.trim().startsWith("rotation:"));if(n.push(...p),i)for(let g=0;g<n.length;g++)n[g].includes("auto_clear_enabled: true")&&(n[g]=n[g].replace("auto_clear_enabled: true","auto_clear_enabled: false"));n.push(`    rotation: ${c}`),n.push("")}else{const p=!!(t.features&&(t.features.lcd||t.features.oled));n.push("display:"),n.push(`  - platform: ${t.displayPlatform}`),n.push(`    id: ${p?"my_display":"epaper_display"}`),i&&n.push("    auto_clear_enabled: false");const g=t.pins&&t.pins.display?t.pins.display:null;if(g){const y=(m,_)=>{_&&(typeof _=="object"?(n.push(`    ${m}:`),n.push(`      number: ${_.number}`),_.inverted!==void 0&&n.push(`      inverted: ${_.inverted}`)):n.push(`    ${m}: ${_}`))};y("cs_pin",g.cs),y("dc_pin",g.dc),y("reset_pin",g.reset),y("busy_pin",g.busy)}if(t.displayPlatform==="waveshare_epaper"&&t.displayModel&&n.push(`    model: "${t.displayModel}"`),n.push(`    rotation: ${c}`),t.displayModel==="M5Paper"||t.displayPlatform==="it8951e")n.push("    reversed: false"),n.push("    reset_duration: 200ms");else if(t.displayModel&&t.displayPlatform!=="waveshare_epaper"){let y=`    model: "${t.displayModel}"`;t.displayModel==="Seeed-reTerminal-E1002"&&(y+=" #Please update your ESPHome version to 2025.11.1 above"),n.push(y)}const u=e.refreshInterval||1;n.push(`    update_interval: ${p?u+"s":"never"}`);const f=["1.54in","1.54inv2","2.13in","2.13in-ttgo","2.13in-ttgo-b1","2.13in-ttgo-b73","2.13in-ttgo-b74","2.13in-ttgo-dke","2.13inv2","2.13inv3","2.90in","2.90in-dke","2.90inv2","2.90inv2-r2","7.50inv2p","gdew029t5","gdey029t94","gdey042t81","gdey0583t81"];t.displayModel&&f.includes(t.displayModel)&&n.push("    full_update_every: 30"),n.push("")}const d=t.display_config?"my_display":"epaper_display";return n.push(...Ul(t,d,c,e,i)),n}function ni(t,e=[],i="my_display",n=[]){const o=[];if(!t)return o;const s=t.pins||{},r=s.batteryAdc,a=t.features&&t.features.sht4x,l=t.features&&t.features.shtc3,c=e.length>0;if(!r&&!a&&!l&&!c)return o;if(o.push("sensor:"),r&&(o.push("  - platform: adc"),o.push(`    pin: ${s.batteryAdc}`),o.push('    name: "Battery Voltage"'),o.push('    unit_of_measurement: "V"'),o.push("    device_class: voltage"),o.push("    state_class: measurement"),o.push("    id: battery_voltage"),o.push("    update_interval: 60s"),o.push("    attenuation: "+t.battery.attenuation),o.push("    filters:"),o.push("      - multiply: "+t.battery.multiplier)),a&&(o.push("  - platform: sht4x"),o.push("    id: sht4x_sensor"),o.push("    temperature:"),o.push('      name: "Temperature"'),o.push("      id: sht4x_temperature"),o.push("    humidity:"),o.push('      name: "Humidity"'),o.push("      id: sht4x_humidity"),o.push("    address: 0x44"),o.push("    update_interval: 60s")),(t.features.sht3xd||t.displayModel==="M5Paper"||t.name&&t.name.includes("M5Paper"))&&(o.push("  - platform: sht3xd"),o.push("    address: 0x44"),o.push("    temperature:"),o.push('      name: "Temperature"'),o.push("      id: sht3x_temperature"),o.push("    humidity:"),o.push('      name: "Humidity"'),o.push("      id: sht3x_humidity"),o.push("    update_interval: 60s")),l&&(o.push("  - platform: shtcx"),o.push("    id: shtc3_sensor"),o.push("    i2c_id: bus_a"),o.push("    address: 0x70"),o.push("    temperature:"),o.push('      name: "Temperature"'),o.push("      id: shtc3_temperature"),o.push("    humidity:"),o.push('      name: "Humidity"'),o.push("      id: shtc3_humidity"),o.push("    update_interval: 60s")),e.length>0&&o.push(...e),r)if(o.push(""),o.push("  - platform: template"),o.push('    name: "Battery Level"'),o.push("    id: battery_level"),o.push('    unit_of_measurement: "%"'),o.push('    icon: "mdi:battery"'),o.push("    device_class: battery"),o.push("    state_class: measurement"),t.battery.curve)o.push("    lambda: 'return id(battery_voltage).state;'"),o.push("    update_interval: 60s"),o.push("    filters:"),o.push("      - calibrate_linear:"),t.battery.curve.forEach(d=>{o.push(`          - ${d.from} -> ${d.to}`)}),o.push("      - clamp:"),o.push("          min_value: 0"),o.push("          max_value: 100");else{const d=t.battery.calibration?t.battery.calibration.min:3.27,p=t.battery.calibration?t.battery.calibration.max:4.15;o.push("    lambda: |-"),o.push(`      if (id(battery_voltage).state > ${p}) return 100;`),o.push(`      if (id(battery_voltage).state < ${d}) return 0;`),o.push(`      return (id(battery_voltage).state - ${d}) / (${p} - ${d}) * 100.0;`)}return o.push(""),o}function tt(t,e,i="my_display",n=[]){const o=[],s=t&&t.features&&t.features.buttons,r=n.length>0;if(!s&&!r)return o;if(o.push("binary_sensor:"),s){const a=t.name&&t.name.includes("CoreInk"),l=t.pins.buttons||{};if(l.left&&(o.push("  - platform: gpio"),o.push("    pin:"),typeof l.left=="object"?(o.push(`      number: ${l.left.number}`),o.push(`      mode: ${l.left.mode||"INPUT_PULLUP"}`),o.push(`      inverted: ${l.left.inverted!==void 0?l.left.inverted:!0}`)):(o.push(`      number: ${l.left}`),o.push("      mode: INPUT_PULLUP"),o.push("      inverted: true")),o.push('    name: "Left Button"'),o.push("    id: button_left"),o.push("    on_press:"),o.push("      then:"),a?(o.push("        - script.execute:"),o.push("            id: change_page_to"),o.push(`            target_page: !lambda 'return id(display_page) > 0 ? id(display_page) - 1 : ${e-1};'`)):(o.push("        - script.execute:"),o.push("            id: change_page_to"),o.push(`            target_page: !lambda 'return id(display_page) > 0 ? id(display_page) - 1 : ${e-1};'`))),l.right&&(o.push("  - platform: gpio"),o.push("    pin:"),typeof l.right=="object"?(o.push(`      number: ${l.right.number}`),o.push(`      mode: ${l.right.mode||"INPUT_PULLUP"}`),o.push(`      inverted: ${l.right.inverted!==void 0?l.right.inverted:!0}`)):(o.push(`      number: ${l.right}`),o.push("      mode: INPUT_PULLUP"),o.push("      inverted: true")),o.push('    name: "Right Button"'),o.push("    id: button_right"),o.push("    on_press:"),o.push("      then:"),a?(o.push("        - script.execute:"),o.push("            id: change_page_to"),o.push(`            target_page: !lambda 'return id(display_page) < ${e-1} ? id(display_page) + 1 : 0;'`)):(o.push("        - script.execute:"),o.push("            id: change_page_to"),o.push(`            target_page: !lambda 'return id(display_page) < ${e-1} ? id(display_page) + 1 : 0;'`))),l.refresh){o.push("  - platform: gpio"),o.push("    pin:"),typeof l.refresh=="object"?(o.push(`      number: ${l.refresh.number}`),o.push(`      mode: ${l.refresh.mode||"INPUT_PULLUP"}`),o.push(`      inverted: ${l.refresh.inverted!==void 0?l.refresh.inverted:!0}`)):(o.push(`      number: ${l.refresh}`),o.push("      mode: INPUT_PULLUP"),o.push("      inverted: true"));const c=a?"Enter Button":"Refresh Button",d=a?"button_enter":"button_refresh";o.push(`    name: "${c}"`),o.push(`    id: ${d}`),o.push("    on_press:"),o.push("      then:"),o.push(`        - component.update: ${i}`)}l.home&&(o.push("  - platform: gpio"),o.push("    pin:"),typeof l.home=="object"?(o.push(`      number: ${l.home.number}`),o.push(`      mode: ${l.home.mode||"INPUT_PULLUP"}`),o.push(`      inverted: ${l.home.inverted!==void 0?l.home.inverted:!0}`)):(o.push(`      number: ${l.home}`),o.push("      mode: INPUT_PULLUP"),o.push("      inverted: true")),o.push('    name: "Home Button"'),o.push("    id: button_home"),o.push("    on_press:"),o.push("      then:"),o.push("        - script.execute:"),o.push("            id: change_page_to"),o.push("            target_page: 0"),o.push("        - script.execute: manage_run_and_sleep"))}return r&&(o.push("  # Touch Area Binary Sensors"),n.forEach(a=>{const l=(a.type||"").toLowerCase(),c=a.props||{};if(l==="template_nav_bar"){const d=c.show_prev!==!1,p=c.show_home!==!1,g=c.show_next!==!1;let u=0;if(d&&u++,p&&u++,g&&u++,u>0){const f=Math.floor(a.width/u);let y=0;const m=(_,b)=>{const S=a.x+y*f,x=S+f,E=a.y,w=a.y+a.height;o.push("  - platform: touchscreen"),o.push(`    id: nav_${_}_${a.id}`),o.push("    touchscreen_id: my_touchscreen"),o.push(`    x_min: ${S}`),o.push(`    x_max: ${x}`),o.push(`    y_min: ${E}`),o.push(`    y_max: ${w}`),o.push("    on_press:");const C=a._pageIndex!==void 0?a._pageIndex:0;o.push("      - if:"),o.push("          condition:"),o.push(`            lambda: 'return id(display_page) == ${C};'`),o.push("          then:"),_==="prev"?(o.push("            - script.execute:"),o.push("                id: change_page_to"),o.push("                target_page: !lambda 'return id(display_page) - 1;'")):_==="home"?o.push("            - script.execute: manage_run_and_sleep"):_==="next"&&(o.push("            - script.execute:"),o.push("                id: change_page_to"),o.push("                target_page: !lambda 'return id(display_page) + 1;'")),y++};d&&m("prev"),p&&m("home"),g&&m("next")}}else{const d=(a.entity_id||`touch_area_${a.id}`).replace(/[^a-zA-Z0-9_]/g,"_"),p=parseInt(String(c.icon_size||40),10),g=Math.max(a.width,p),u=Math.max(a.height,p);let f=a.x-Math.floor((g-a.width)/2),y=f+g,m=a.y-Math.floor((u-a.height)/2),_=m+u;f=Math.max(0,f),m=Math.max(0,m);const b=c.nav_action||"none",S=a._pageIndex!==void 0?a._pageIndex:0;o.push("  - platform: touchscreen"),o.push(`    id: ${d}`),o.push("    touchscreen_id: my_touchscreen"),o.push(`    x_min: ${f}`),o.push(`    x_max: ${y}`),o.push(`    y_min: ${m}`),o.push(`    y_max: ${_}`),(b!=="none"||a.entity_id)&&(o.push("    on_press:"),o.push("      - if:"),o.push("          condition:"),o.push(`            lambda: 'return id(display_page) == ${S};'`),o.push("          then:"),b==="next_page"?(o.push("            - script.execute:"),o.push("                id: change_page_to"),o.push("                target_page: !lambda 'return id(display_page) + 1;'")):b==="previous_page"?(o.push("            - script.execute:"),o.push("                id: change_page_to"),o.push("                target_page: !lambda 'return id(display_page) - 1;'")):b==="reload_page"?o.push("            - script.execute: manage_run_and_sleep"):a.entity_id&&(o.push("            - homeassistant.service:"),o.push("                service: homeassistant.toggle"),o.push("                data:"),o.push(`                  entity_id: ${a.entity_id}`)))}})),o.push(""),o}function ii(t,e,i="my_display"){const n=[];n.push("button:"),n.push("  - platform: template"),n.push('    name: "Next Page"'),n.push("    on_press:"),n.push("      then:"),n.push("        - script.execute:"),n.push("            id: change_page_to"),n.push("            target_page: !lambda 'return id(display_page) + 1;'"),n.push("  - platform: template"),n.push('    name: "Previous Page"'),n.push("    on_press:"),n.push("      then:"),n.push("        - script.execute:"),n.push("            id: change_page_to"),n.push("            target_page: !lambda 'return id(display_page) - 1;'"),n.push("  - platform: template"),n.push('    name: "Refresh Display"'),n.push("    on_press:"),n.push("      then:"),n.push(`        - component.update: ${i}`);for(let o=0;o<e;o++)n.push("  - platform: template"),n.push(`    name: "Go to Page ${o+1}"`),n.push("    on_press:"),n.push("      then:"),n.push("        - script.execute:"),n.push("            id: change_page_to"),n.push(`            target_page: ${o}`);return t.features&&t.features.buzzer&&(n.push("  # Buzzer Sounds"),n.push("  - platform: template"),n.push('    name: "Play Beep Short"'),n.push('    icon: "mdi:bell-ring"'),n.push("    on_press:"),n.push('      - rtttl.play: "beep:d=32,o=5,b=200:16e6"'),n.push(""),n.push("  - platform: template"),n.push('    name: "Play Beep OK"'),n.push('    icon: "mdi:check-circle-outline"'),n.push("    on_press:"),n.push('      - rtttl.play: "ok:d=16,o=5,b=200:e6"'),n.push(""),n.push("  - platform: template"),n.push('    name: "Play Beep Error"'),n.push('    icon: "mdi:alert-circle-outline"'),n.push("    on_press:"),n.push('      - rtttl.play: "error:d=16,o=5,b=200:c6"'),n.push(""),n.push("  - platform: template"),n.push('    name: "Play Star Wars"'),n.push('    icon: "mdi:music-note"'),n.push("    on_press:"),n.push('      - rtttl.play: "StarWars:d=4,o=5,b=45:32p,32f,32f,32f,8a#.,8f.6,32d#,32d,32c,8a#.6,4f.6,32d#,32d,32c,8a#.6,4f.6,32d#,32d,32d#,8c6"')),n.push(""),n}function oi(t){if(!(t.features&&t.features.psram||t.features&&t.features.features&&t.features.features.psram))return[];const i=(t.chip||"").toLowerCase();if(["esp32-c3","esp32-c6","esp8266"].some(s=>i.includes(s)))return[];const o=["psram:"];return t.psram_mode&&(o.push(`  mode: ${t.psram_mode}`),o.push("  speed: 80MHz")),o.push(""),o}function si(t){return!t.features||!t.features.axp2101||t.features.manual_pmic?[]:["axp2101:","  i2c_id: bus_a","  address: 0x34","  irq_pin: GPIO21","  battery_voltage:",'    name: "Battery Voltage"',"    id: battery_voltage","  battery_level:",'    name: "Battery Level"',"    id: battery_level","  on_setup:","    - axp2101.set_ldo_voltage:","        id: bldo1","        voltage: 3300mv","    - switch.turn_on: bldo1  # EPD_VCC (Screen Power)","    - axp2101.set_ldo_voltage:","        id: aldo1","        voltage: 3300mv","    - switch.turn_on: aldo1  # Peripherals","    - axp2101.set_ldo_voltage:","        id: aldo3","        voltage: 3300mv","    - switch.turn_on: aldo3  # Backlight/Logic",""]}function ri(t){const e=[],i=t.m5paper?.main_power_pin||t.pins?.main_power_pin||t.m5paper?.battery_power_pin||t.pins?.battery_power_pin;return!t||!t.pins||!t.pins.batteryEnable&&!t.pins.buzzer&&!i||(e.push("output:"),t.pins.batteryEnable&&(e.push("  - platform: gpio"),typeof t.pins.batteryEnable=="object"?(e.push("    pin:"),e.push(`      number: ${t.pins.batteryEnable.number}`),t.pins.batteryEnable.ignore_strapping_warning&&e.push("      ignore_strapping_warning: true"),t.pins.batteryEnable.inverted!==void 0&&e.push(`      inverted: ${t.pins.batteryEnable.inverted}`)):e.push(`    pin: ${t.pins.batteryEnable}`),e.push("    id: bsp_battery_enable")),(t.m5paper?.main_power_pin||t.pins?.main_power_pin)&&(t.pins.batteryEnable&&e.push(""),e.push("  - platform: gpio"),e.push(`    pin: ${t.m5paper?.main_power_pin||t.pins.main_power_pin}`),e.push("    id: main_power")),(t.m5paper?.battery_power_pin||t.pins?.battery_power_pin)&&((t.pins.batteryEnable||t.m5paper?.main_power_pin)&&e.push(""),e.push("  - platform: gpio"),e.push(`    pin: ${t.m5paper?.battery_power_pin||t.pins.battery_power_pin}`),e.push("    id: battery_power")),t.pins.buzzer&&(t.pins.batteryEnable&&e.push(""),e.push("  - platform: ledc"),e.push(`    pin: ${t.pins.buzzer}`),e.push("    id: buzzer_output")),e.push("")),e}function ai(t){return!t.features||!t.features.buzzer?[]:["rtttl:","  id: reterminal_buzzer","  output: buzzer_output",""]}function li(t){if(!t||!t.audio)return[];const e=[];return t.audio.i2s_audio&&(e.push("i2s_audio:"),e.push(`  i2s_lrclk_pin: ${t.audio.i2s_audio.i2s_lrclk_pin}`),e.push(`  i2s_bclk_pin: ${t.audio.i2s_audio.i2s_bclk_pin}`),t.audio.i2s_audio.i2s_mclk_pin&&e.push(`  i2s_mclk_pin: ${t.audio.i2s_audio.i2s_mclk_pin}`),e.push("")),t.audio.speaker&&(e.push("speaker:"),e.push(`  - platform: ${t.audio.speaker.platform}`),e.push("    id: my_speaker"),t.audio.speaker.dac_type&&e.push(`    dac_type: ${t.audio.speaker.dac_type}`),t.audio.speaker.i2s_dout_pin&&e.push(`    i2s_dout_pin: ${t.audio.speaker.i2s_dout_pin}`),t.audio.speaker.mode&&e.push(`    mode: ${t.audio.speaker.mode}`),e.push("")),e}function di(t,e=!1){return!t||t==="transparent"?'"0x000000"':t==="theme_auto"?e?'"0xFFFFFF"':'"0x000000"':t==="theme_auto_inverse"?e?'"0x000000"':'"0xFFFFFF"':t.startsWith("#")?'"0x'+t.substring(1).toUpperCase()+'"':`"${t}"`}function jl(t){return t?{left:"top_left",center:"center",right:"top_right"}[t.toLowerCase()]||t.toLowerCase():"top_left"}function Yl(t,e,i,n){return`font_${(t||"Roboto").toLowerCase().replace(/\s+/g,"_")}_${i||400}_${e||20}${n?"_italic":""}`}function Vl(t){return t==null?"cover":typeof t=="number"?t>=255?"cover":t<=0?"transp":Math.round(t/255*100)+"%":t}function ci(t,e,i=null,n={}){const o=[],s=i||(D?D[e]||{}:{});o.push("# ============================================================================"),o.push("# LVGL Configuration"),o.push("# ============================================================================"),o.push(""),o.push("lvgl:"),o.push("  id: my_lvgl"),o.push("  log_level: WARN");const r=!!n.darkMode,a=r?'"0x000000"':'"0xFFFFFF"';o.push(`  bg_color: ${a}`),o.push("  displays:");const l=s.features?.lcd?"my_display":"epaper_display";if(o.push(`    - ${l}`),s.touch&&(o.push("  touchscreens:"),o.push("    - my_touchscreen")),n.lcdEcoStrategy==="dim_after_timeout"){const c=(n.dimTimeout||10)+"s";o.push("  on_idle:"),o.push(`    timeout: ${c}`),o.push("    then:"),o.push("      - light.turn_off: display_backlight"),o.push("      - lvgl.pause:")}return o.push(""),o.push("  pages:"),t.forEach((c,d)=>{o.push(`    - id: page_${d}`),c.layout&&/^\d+x\d+$/.test(c.layout)&&o.push(`      layout: ${c.layout}`),o.push("      widgets:");const p=c.widgets||[];if(p.length===0){o.push("        []");return}p.filter(g=>!g.hidden&&g.type!=="group").forEach(g=>{o.push(`        ${jt(g)}`);const u=ql(g,s,r);if(u){const f=Object.keys(u)[0],y=u[f];o.push(`        - ${f}:`),Ut(y,o,12)}})}),o}function Ut(t,e,i){const n=" ".repeat(i);Object.keys(t).sort((s,r)=>s==="id"?-1:r==="id"?1:s==="type"?-1:r==="type"?1:s.localeCompare(r)).forEach(s=>{const r=t[s];if(!(r==null||r===""))if(Array.isArray(r))r.length===0?e.push(`${n}${s}: []`):(e.push(`${n}${s}:`),r.forEach(a=>{typeof a=="object"?(e.push(`${n}  -`),Ut(a,e,i+4)):e.push(`${n}  - ${pi(a)}`)}));else if(typeof r=="object")e.push(`${n}${s}:`),Ut(r,e,i+2);else if(typeof r=="string"&&r.includes(`
`)){const a=r.split(`
`);if(r.trim().startsWith("!lambda")){e.push(`${n}${s}: ${a[0].trim()}`);const c=a.slice(1).reduce((p,g)=>{if(!g.trim())return p;const u=g.match(/^ */);return Math.min(p,u?u[0].length:0)},1/0),d=c===1/0?0:c;for(let p=1;p<a.length;p++){const g=a[p].trim()===""?"":a[p].substring(d);e.push(`${n}  ${g}`)}}else e.push(`${n}${s}: |-`),a.forEach(l=>{e.push(`${n}  ${l}`)})}else e.push(`${n}${s}: ${pi(r)}`)})}function pi(t){if(t==null)return"";if(typeof t!="string")return String(t);const e=t.trim();return t.startsWith('"')&&t.endsWith('"')||t.startsWith("'")&&t.endsWith("'")||e.startsWith("!lambda")||e.startsWith("!secret")?t:/^[*&!|>%@,\-{}[\]?#:]/.test(e)||/^(true|false|null|yes|no)$/i.test(e)||e.includes(": ")||e.includes(" #")?JSON.stringify(t):t}function jt(t){const e=[`# widget:${t.type}`];e.push(`id:${t.id}`),e.push(`type:${t.type}`),e.push(`x:${Math.round(t.x)}`),e.push(`y:${Math.round(t.y)}`);const i=t.w!==void 0?t.w:t.width!==void 0?t.width:0,n=t.h!==void 0?t.h:t.height!==void 0?t.height:0;e.push(`w:${Math.round(i)}`),e.push(`h:${Math.round(n)}`),t.entity_id&&e.push(`entity:${t.entity_id}`),t.locked&&e.push("locked:true");const o=H?H.get(t.type):null,s=o?{...o.defaults}:{};return t.type.startsWith("lvgl_")&&Object.assign(s,{hidden:!1,clickable:!0,checkable:!1,scrollable:!0,floating:!1,ignore_layout:!1,scrollbar_mode:"AUTO",opa:255,grid_cell_row_pos:null,grid_cell_column_pos:null,grid_cell_row_span:1,grid_cell_column_span:1,grid_cell_x_align:"STRETCH",grid_cell_y_align:"STRETCH"}),t.props&&Object.entries(t.props).forEach(([r,a])=>{if(!(a==null||a==="")&&!(r==="id"&&a===t.id)&&!(r==="type"&&a===t.type)&&!(r==="x"&&Math.round(a)===Math.round(t.x))&&!(r==="y"&&Math.round(a)===Math.round(t.y))&&!(r==="w"&&Math.round(a)===Math.round(t.width||t.w))&&!(r==="h"&&Math.round(a)===Math.round(t.height||t.h))&&!(r==="entity_id"&&a===t.entity_id)&&!(r in s&&(s[r]===a||typeof a=="object"&&JSON.stringify(s[r])===JSON.stringify(a))))if(typeof a=="object")try{e.push(`${r}:${JSON.stringify(a)}`)}catch(l){v.warn(`[serializeWidget] Failed to serialize prop ${r}`,l)}else e.push(`${r}:${JSON.stringify(a)}`)}),e.join(" ").replace(/[\r\n]+/g," ")}function ql(t,e,i=!1){const n=t.props||{};e?.touch||e?.features&&e.features.touch;const o=Math.round(t.x||0),s=Math.round(t.y||0),r=Math.round(t.w||t.width||100),a=Math.round(t.h||t.height||100),l={id:t.id,x:o,y:s,width:r,height:a,hidden:n.hidden||void 0,clickable:n.clickable===!1?!1:void 0,checkable:n.checkable||void 0,scrollable:n.scrollable===!1?!1:void 0,floating:n.floating||void 0,ignore_layout:n.ignore_layout||void 0,scrollbar_mode:n.scrollbar_mode!=="AUTO"?n.scrollbar_mode:void 0};if(H){const c=H.get(t.type);if(c&&typeof c.exportLVGL=="function"){const d=()=>({type:"obj",attrs:{...l}}),p=c.exportLVGL(t,{profile:e,common:l,convertColor:g=>di(g,i),convertAlign:jl,getLVGLFont:Yl,formatOpacity:Vl,getObjectDescriptor:d});return p&&p.type&&p.attrs?{[p.type]:p.attrs}:p}}return t.type&&(t.type.startsWith("lvgl_")||t.type.startsWith("shape_")||t.type==="rounded_rect"||t.type==="line"||t.type==="text"||t.type==="progress_bar"||t.type==="qr_code")?(v.warn(`[transpileToLVGL] Widget type ${t.type} has no exportLVGL function. Falling back to generic obj.`),{obj:{...l,bg_color:di(n.bg_color||n.color||"white",i)}}):null}class Xl{constructor(){this.reset(),this.EXTENDED_GLYPHS=[...Array.from({length:95},(e,i)=>`\\U000000${(i+32).toString(16).toUpperCase().padStart(2,"0")}`),...Array.from({length:96},(e,i)=>`\\U000000${(i+160).toString(16).toUpperCase().padStart(2,"0")}`),"\\U000003BC","\\U000003A9","\\U000020AC","\\U00002122"]}reset(){this.definedFontIds=new Set,this.fontLines=[],this.iconCodesBySize=new Map}addFont(e,i,n,o=!1){const s=e.replace(/\s+/g,"_").toLowerCase();let r=parseInt(i)||400;e!=="Material Design Icons"&&(r=ot(e,r));const a=o?"_italic":"",l=String(n).replace(".","_"),c=`font_${s}_${r}_${l}${a}`;if(this.definedFontIds.has(c))return c;if(this.definedFontIds.add(c),e!=="Material Design Icons"){const d={id:c,file:{type:"gfonts",family:e,weight:r,italic:o},size:n,glyphs:[...this.EXTENDED_GLYPHS]};this.fontLines.push(d)}return c}trackIcon(e,i){if(!e)return;const n=parseInt(i,10);this.iconCodesBySize.has(n)||this.iconCodesBySize.set(n,new Set);let o=e;/^F[0-9A-F]{4}$/i.test(e)?o=e.toUpperCase():o=window.Utils?window.Utils.getIconCode(e):null,o&&this.iconCodesBySize.get(n).add(o)}getLines(e=[],i=!1){this.definedFontIds.size===0&&this.addFont("Roboto",400,20);const n=["font:"];this.fontLines.forEach(o=>{if(n.push("  - file:"),n.push(`      type: ${o.file.type}`),n.push(`      family: "${o.file.family}"`),n.push(`      weight: ${o.file.weight}`),n.push(`      italic: ${o.file.italic?"true":"false"}`),n.push(`    id: ${o.id}`),n.push(`    size: ${Math.round(o.size)}`),e&&e.length>0){const s=e.join(", ");n.push(`    glyphsets: [${s}]`),n.push("    ignore_missing_glyphs: true")}if(i||!e||e.length===0){const s=o.glyphs.map(r=>`"${r}"`).join(", ");n.push(`    glyphs: [${s}]`)}});for(const[o,s]of this.iconCodesBySize.entries()){const r=`font_material_design_icons_400_${o}`;n.push('  - file: "fonts/materialdesignicons-webfont.ttf"'),n.push(`    id: ${r}`),n.push(`    size: ${o}`);const a=Array.from(s).sort().map(l=>`"\\U000${l}"`).join(", ");n.push(`    glyphs: [${a}]`)}return n.length>1?n:[]}}class Kl{generateInstructionHeader(e,i){const n=[];n.push("# ============================================================================"),n.push("# ESPHome YAML - Generated by ESPHome Designer"),n.push("# ============================================================================"),n.push(`# TARGET DEVICE: ${e.name||"Unknown"}`);const o=e.features||{},s=e.displayPlatform||(o.lcd?e.id==="reterminal_e1001"?"reterminal_e1001":"LCD":o.epaper?"waveshare_epaper":"Unknown"),r=e.chip||"esp32-s3",l=["esp32-c3","esp32-c6","esp8266"].some(f=>r.toLowerCase().includes(f)),c=o.psram&&!l;n.push(`#         - Display Platform: ${s}`),n.push(`#         - Touchscreen: ${o.touch?e.touch?.platform||"Yes":"No"}`),n.push(`#         - PSRAM: ${c?"Yes":"No"}`);let d="esp-idf (Recommended)";r==="esp8266"?d="Arduino (Default)":c&&(e.chip?.includes("s3")||e.id?.includes("s3"))&&(d="ESP-IDF (Required for stable PSRAM/LVGL)"),n.push(`#         - Framework: ${d}`),n.push("# ============================================================================"),n.push("#"),n.push("# SETUP INSTRUCTIONS:"),n.push("#"),n.push("# STEP 1: Copy the Material Design Icons font file"),n.push("#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf"),n.push("#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf"),n.push("#"),n.push("# STEP 2: Create a new device in ESPHome"),n.push('#         - Click "New Device"'),r==="esp8266"?(n.push("#         - Select: ESP8266"),n.push("#         - Framework: Arduino (Default)")):r==="esp32"?(n.push("#         - Select: ESP32"),n.push("#         - Framework: ESP-IDF (Recommended) or Arduino")):r.includes("c3")?(n.push("#         - Select: ESP32-C3"),n.push("#         - Framework: ESP-IDF (Recommended) or Arduino")):r.includes("c6")?(n.push("#         - Select: ESP32-C6"),n.push("#         - Framework: ESP-IDF (Recommended)")):(n.push("#         - Select: ESP32-S3 (or appropriate for your board)"),n.push("#         - Framework: ESP-IDF (Essential for S3 stability)")),n.push("#"),n.push("# STEP 3: PASTE this snippet into your device YAML"),n.push("#         - Paste this snippet at the end of your configuration.");const p=r==="esp8266"?"esp8266":"esp32";n.push(`#         - System sections (esphome, ${p}${r!=="esp8266"?", psram":""}) are auto-commented`),n.push("#           to avoid conflicts with your existing base setup."),n.push("#"),n.push("# CAPTIVE PORTAL:"),n.push("#         - If WiFi connection fails, the device will create a hotspot."),n.push("#         - Search for its name in your WiFi settings."),n.push("#         - Connect and go to http://192.168.4.1 to configure WiFi."),n.push("#"),r.includes("s3")&&(n.push("# TIP: For reTerminal / S3 devices, if you cannot see logs via USB,"),n.push("#      add this to your base 'logger:' section:"),n.push("#      hardware_uart: USB_CDC"),n.push("#")),n.push("# ============================================================================"),n.push(""),n.push("# ===================================="),n.push("# Device Settings"),n.push("# ===================================="),n.push(`# Orientation: ${i.orientation||"landscape"}`),n.push(`# Dark Mode: ${i.darkMode?"enabled":"disabled"}`),n.push(`# Refresh Interval: ${i.refreshInterval||600}`);const g=!!(e.features&&(e.features.lcd||e.features.oled));let u;if(i.manualRefreshOnly)u="Manual Refresh Only";else if(g){const f=i.lcdEcoStrategy||"backlight_off";u={always_on:"Always On",backlight_off:"Backlight Off Schedule",halt_updates:"Halt Updates",deep_sleep:"Deep Sleep",dim_after_timeout:"Dim after timeout"}[f]||f}else u=i.deepSleepEnabled?"Ultra Eco (Deep Sleep)":i.sleepEnabled?"Eco (Light Sleep)":"Always On";return n.push(`# Power Strategy: ${u}`),n.push(`# Deep Sleep Interval: ${i.deepSleepInterval||600}`),n.push("# ===================================="),n.push(""),n}generateSystemSections(e,i){const n=[],o=e.chip||"esp32-s3",s=e.board||(o==="esp8266"?"nodemcuv2":o==="esp32"?"esp32dev":o.includes("c3")?"esp32-c3-devkitm-1":o.includes("c6")?"esp32-c6-devkitc-1":"esp32-s3-devkitc-1"),r=!!(e.features&&(e.features.epaper||e.features.epd)),a=e.board==="m5stack-coreink"||e.name&&e.name.toLowerCase().includes("coreink");return n.push("# esphome:"),n.push("#   name: your-device-name"),n.push("#   comment: 'Snippet generated by ESPHome Designer'"),i.plugin_includes&&i.plugin_includes.length>0&&(n.push("#   includes:"),i.plugin_includes.forEach(l=>{n.push(`#     - ${l}`)})),n.push("#   on_boot:"),n.push("#     priority: 300"),n.push("#     then:"),a||(e.id==="esp32_s3_photopainter"&&(n.push("#       - lambda: |-"),n.push("#           auto write_reg = [](uint8_t reg, uint8_t val) {"),n.push("#             uint8_t data[2] = {reg, val};"),n.push("#             id(bus_a)->write(0x34, data, 2);"),n.push("#           };"),n.push("#           write_reg(0x94, 0x1C); // ALDO3 3.3V"),n.push("#           write_reg(0x95, 0x1C); // ALDO4 3.3V"),n.push("#           write_reg(0x90, 0x1F); // Enable rails"),n.push('#           ESP_LOGI("power", "AXP2101 Configured");'),n.push("#       - delay: 200ms"),n.push("#       - component.update: epaper_display")),e.battery&&e.pins&&e.pins.batteryEnable&&n.push("#       - output.turn_on: bsp_battery_enable"),(e.m5paper?.main_power_pin||e.pins?.main_power_pin)&&n.push("#       - output.turn_on: main_power"),(e.m5paper?.battery_power_pin||e.pins?.battery_power_pin)&&n.push("#       - output.turn_on: battery_power"),n.push("#       - delay: 2s")),a?(n.push("#       # 1. HARDWARE POWER LOCK (ESP-IDF Version)"),n.push("#       - lambda: |-"),n.push("#           gpio_set_direction(GPIO_NUM_12, GPIO_MODE_OUTPUT);"),n.push("#           gpio_set_level(GPIO_NUM_12, 1);"),n.push("#           gpio_hold_en(GPIO_NUM_12);"),n.push("#           gpio_deep_sleep_hold_en();"),n.push("#"),n.push("#       # 2. Start the Main Logic Loop"),n.push("#       - script.execute: manage_run_and_sleep"),n.push("#"),n.push("#       # 3. Initial Screen Update"),n.push("#       - component.update: epaper_display")):r&&i.deepSleepEnabled?n.push("#       - script.execute: deep_sleep_cycle"):n.push("#       - script.execute: manage_run_and_sleep"),i.autoCycleEnabled&&n.push("#       - script.execute: auto_cycle_timer"),o==="esp8266"?(n.push("#"),n.push("# esp8266:"),n.push(`#   board: ${s}`)):(n.push("#"),n.push("# esp32:"),n.push(`#   board: ${s}`),n.push("#   framework:"),n.push("#     type: esp-idf"),o.includes("s3")&&(n.push("#     sdkconfig_options:"),n.push("#       CONFIG_ESP32S3_DEFAULT_CPU_FREQ_240: y"),n.push("#       CONFIG_ESP32S3_DATA_CACHE_64KB: y"))),n.push("#"),n.push("# logger:"),o.includes("s3")&&n.push("#   hardware_uart: USB_CDC # Enable for USB debugging on S3"),n.push("#   level: DEBUG"),n.push("#"),n.push("# api:"),n.push("# ota:"),n.push("# wifi:"),n.push("#   # ... your wifi config here"),r&&i.deepSleepEnabled&&(n.push(""),n.push("deep_sleep:"),n.push("  id: deep_sleep_control"),n.push("  run_duration: 120s # Stay awake 120s on boot for OTA"),n.push(`  sleep_duration: ${i.deepSleepInterval||600}s`)),n.push(""),n}generateScriptSection(e,i,n){const o=[],s=n.features?.lcd?"my_display":"epaper_display",r=e.autoCycleEnabled&&i.length>1,a=!!(n.features&&(n.features.lcd||n.features.oled)),l=!!(n.features&&(n.features.epaper||n.features.epd)),c=!!(n.features&&n.features.oled),d=a?500:3e3,p=n.backlight&&n.backlight.pin?n.backlight.pin:n.pins?.backlight||null,g=e.lcdEcoStrategy||"backlight_off",u=a&&g==="backlight_off"&&p,f=l&&e.deepSleepEnabled;if(o.push("script:"),o.push("  - id: change_page_to"),o.push("    parameters:"),o.push("      target_page: int"),o.push("    then:"),o.push("      - lambda: |-"),o.push(`          int pages_count = ${i.length};`),o.push("          int target = target_page;"),o.push("          while (target < 0) target += pages_count;"),o.push("          target %= pages_count;"),o.push(""),o.push(`          // Debounce: Ignore page changes within ${d}ms of last change`),o.push(`          // (adjusted for ${a?"LCD":"e-paper"} display update time)`),o.push("          uint32_t now = millis();"),o.push(`          if (now - id(last_page_switch_time) < ${d}) {`),o.push('            ESP_LOGD("display", "Page change ignored (debounce), last switch was %d ms ago", now - id(last_page_switch_time));'),o.push("            return;"),o.push("          }"),o.push(""),o.push("          if (id(display_page) != target) {"),o.push("            // Set debounce time BEFORE display update (update takes ~1.6s)"),o.push("            id(last_page_switch_time) = now;"),o.push("            id(display_page) = target;"),o.push(`            id(${s}).update();`),o.push('            ESP_LOGI("display", "Switched to page %d", target);'),o.push("            // Restart refresh logic"),o.push("            if (id(manage_run_and_sleep).is_running()) id(manage_run_and_sleep).stop();"),o.push("            id(manage_run_and_sleep).execute();"),u&&(o.push("            // LCD Strategy: Wake up backlight on interaction/page change"),o.push("            id(backlight_pwm).set_level(0.8); // Restore brightness")),o.push("          }"),f){o.push(""),o.push("  - id: deep_sleep_cycle"),o.push("    then:"),o.push('      - logger.log: "Waiting for sync before Deep Sleep..."'),o.push("      - wait_until:"),o.push("          condition:"),o.push("            lambda: 'return id(ha_time).now().is_valid() && api_is_connected();'"),o.push("          timeout: 120s"),o.push("      - delay: 5s");const E=parseInt(e.noRefreshStartHour??e.sleepStartHour)||0,w=parseInt(e.noRefreshEndHour??e.sleepEndHour)||0;e.sleepEnabled===!0||e.sleepEnabled==="true"||e.sleepEnabled===1||e.sleepEnabled==="1"||e.deepSleepEnabled===!0||e.deepSleepEnabled==="true"||e.deepSleepEnabled===1||e.deepSleepEnabled==="1"?(o.push("      - if:"),o.push("          condition:"),o.push("            lambda: |-"),o.push("              auto time = id(ha_time).now();"),o.push("              if (time.is_valid()) {"),o.push("                  int hour = time.hour;"),o.push(`                  int start = ${E};`),o.push(`                  int end = ${w};`),o.push("                  if (start < end) {"),o.push("                      if (hour >= start && hour < end) return false;"),o.push("                  } else {"),o.push("                      if (hour >= start || hour < end) return false;"),o.push("                  }"),o.push("              }"),o.push("              return true;"),o.push("          then:"),o.push(`            - component.update: ${s}`),o.push("            - delay: 5s # Ensure refresh starts before sleep")):(o.push(`      - component.update: ${s}`),o.push("      - delay: 5s # Ensure refresh starts before sleep")),o.push('      - logger.log: "Entering Deep Sleep now..."'),o.push("      - deep_sleep.enter: deep_sleep_control")}o.push(""),o.push("  - id: manage_run_and_sleep","    mode: restart","    then:"),(n.m5paper?.main_power_pin||n.pins?.main_power_pin)&&o.push("      - output.turn_on: main_power"),(n.m5paper?.battery_power_pin||n.pins?.battery_power_pin)&&o.push("      - output.turn_on: battery_power"),o.push('      - logger.log: "Waiting for sync..."'),o.push("      - wait_until:"),o.push("          condition:"),o.push("            lambda: 'return id(ha_time).now().is_valid() && api_is_connected();'"),o.push("          timeout: 120s"),o.push("      - delay: 5s"),o.push("      - lambda: |-"),o.push("          int p = id(display_page);"),o.push("          int interval = id(page_refresh_default_s);"),o.push("          bool is_sleep_time = false;");const y=parseInt(e.noRefreshStartHour??e.sleepStartHour)||0,m=parseInt(e.noRefreshEndHour??e.sleepEndHour)||0,_=e.sleepEnabled===!0||e.sleepEnabled==="true"||e.sleepEnabled===1||e.sleepEnabled==="1"||e.deepSleepEnabled===!0||e.deepSleepEnabled==="true"||e.deepSleepEnabled===1||e.deepSleepEnabled==="1";o.push("          auto time = id(ha_time).now();"),o.push("          if (time.is_valid()) {"),o.push("             int hour = time.hour;"),o.push("             int minute = time.minute;"),o.push("             int curr_min = hour * 60 + minute;"),o.push(`             int start = ${y};`),o.push(`             int end = ${m};`),o.push("             if (start < end) {"),o.push("                 if (hour >= start && hour < end) is_sleep_time = true;"),o.push("             } else if (start > end) {"),o.push("                 if (hour >= start || hour < end) is_sleep_time = true;"),o.push("             } "),o.push(""),o.push("             // Visibility Logic: Find best page for current time"),o.push("             int best_page = -1;");const b=E=>{if(!E)return null;const w=E.split(":");return parseInt(w[0])*60+parseInt(w[1])};if(i.forEach((E,w)=>{const C=b(E.visible_from),k=b(E.visible_to);C!==null&&k!==null&&(C<k?o.push(`             if (best_page == -1 && curr_min >= ${C} && curr_min < ${k}) best_page = ${w};`):o.push(`             if (best_page == -1 && (curr_min >= ${C} || curr_min < ${k})) best_page = ${w};`))}),i.some(E=>E.visible_from||E.visible_to)&&i.forEach((E,w)=>{!E.visible_from&&!E.visible_to&&o.push(`             if (best_page == -1) best_page = ${w};`)}),o.push(""),o.push("             // If current page is invisible OR another should be shown, switch"),o.push("             if (best_page != -1 && best_page != p) {"),o.push('                 ESP_LOGI("display", "Auto-switching to scheduled page %d", best_page);'),o.push("                 id(change_page_to).execute(best_page);"),o.push("                 return;"),o.push("             }"),o.push("          }"),a?u?(o.push("          #ifdef USE_BACKLIGHT"),o.push("          if (is_sleep_time) {"),o.push("              auto call = id(backlight_pwm).make_call();"),o.push("              call.set_brightness(0.0);"),o.push("              call.perform();"),o.push("              interval = 3600; // Check back in an hour"),o.push("          } else {"),o.push("              auto call = id(backlight_pwm).make_call();"),o.push("              call.set_brightness(0.8);"),o.push("              call.perform();"),o.push("          }"),o.push("          #endif")):c&&_&&(o.push("          if (is_sleep_time) {"),o.push("              interval = 3600;"),o.push("          }")):_&&!f&&(o.push("          if (is_sleep_time) {"),o.push("              interval = 3600; // Sleep for an hour (skip updates)"),o.push("          }")),o.push("          if (!is_sleep_time) {"),i.forEach((E,w)=>{if(E.refresh_type==="daily"&&E.refresh_time){const C=b(E.refresh_time);o.push(`            if (p == ${w}) {`),o.push(`               int target_min = ${C};`),o.push("               int diff = target_min - curr_min;"),o.push("               if (diff <= 0) diff += 1440; // Next day"),o.push("               interval = diff * 60;"),o.push("            }")}else{const C=parseInt(E.refresh_s);!isNaN(C)&&C>0&&o.push(`            if (p == ${w}) interval = ${C};`)}}),o.push("          }"),o.push("          id(page_refresh_current_s) = interval;"),o.push(`      - component.update: ${s}`),!!e.manualRefreshOnly?o.push('      - logger.log: "Manual Refresh Only mode: stopping automatic refresh loop."'):(o.push("      - delay: !lambda 'return id(page_refresh_current_s) * 1000;'"),o.push("      - script.execute: manage_run_and_sleep")),r){const E=e.autoCycleIntervalS||30;o.push("  - id: auto_cycle_timer","    mode: restart","    then:"),o.push(`      - delay: ${E}s`),o.push("      - script.execute:"),o.push("          id: change_page_to"),o.push("          target_page: !lambda 'return id(display_page) + 1;'"),o.push("      - script.execute: auto_cycle_timer")}return o}}const ne={getColorConst:t=>{if(!t)return"COLOR_BLACK";const e=t.toLowerCase();if(e==="theme_auto")return"color_on";if(e==="transparent")return"color_off";if(e.startsWith("#")&&e.length===7){const i=parseInt(e.substring(1,3),16),n=parseInt(e.substring(3,5),16),o=parseInt(e.substring(5,7),16);return`Color(${i}, ${n}, ${o})`}return Zt[e]||"COLOR_BLACK"},getAlignX:(t,e,i)=>t.includes("LEFT")?`${e}`:t.includes("RIGHT")?`${e} + ${i}`:`${e} + ${i}/2`,getAlignY:(t,e,i)=>t.includes("TOP")?`${e}`:t.includes("BOTTOM")?`${e} + ${i}`:`${e} + ${i}/2`,sanitize:t=>t?t.replace(/"/g,'\\"'):"",addDitherMask:(t,e,i,n,o,s,r,a=0)=>{if(!i||!e)return;const l=e.toLowerCase();let c=l==="gray"||l==="grey";if(!c&&l.startsWith("#")&&l.length===7){const d=parseInt(l.substring(1,3),16),p=parseInt(l.substring(3,5),16),g=parseInt(l.substring(5,7),16);Math.abs(d-p)<15&&Math.abs(p-g)<15&&d>40&&d<210&&(c=!0)}c&&t.push(`          apply_grey_dither_mask(${Math.round(n)}, ${Math.round(o)}, ${Math.round(s)}, ${Math.round(r)});`)},isGrayColor:t=>{if(!t)return!1;const e=t.toLowerCase();if(e==="gray"||e==="grey")return!0;if(e.startsWith("#")&&e.length===7){const i=parseInt(e.substring(1,3),16),n=parseInt(e.substring(3,5),16),o=parseInt(e.substring(5,7),16);if(Math.abs(i-n)<15&&Math.abs(n-o)<15&&i>40&&i<210)return!0}return!1},addDitherMaskForText:(t,e,i,n,o,s,r)=>!i||!ne.isGrayColor(e)?!1:(t.push(`        apply_grey_dither_to_text(${Math.round(n)}, ${Math.round(o)}, ${Math.round(s)}, ${Math.round(r)});`),!0),getIconCode:t=>{if(!t||!window.iconPickerData)return null;const e=window.iconPickerData.find(i=>i.name===t);return e?e.code:null}};window.Utils=ne;window.ESPHomeDesigner=window.ESPHomeDesigner||{};window.ESPHomeDesigner.utils=ne;function mn(t,e,i=""){if(!t)return"";let o=(e?t+"_"+e:t).replace(/[^a-z0-9_]/gi,"_").toLowerCase();const s=63-i.length;return o.length>s&&(o=o.substring(0,s)),o+i}function yn(t,e=null,i=null){const n=e||h;if(!t||!n?.entityStates)return!1;const o=n.entityStates[t];if(!o)return!1;const s=i?o.attributes?.[i]:o.state;if(s==null)return!1;const r=String(s).trim();return r===""?!1:isNaN(Number(r))}function Jl(t){const e=(t.condition_entity||"").trim();if(!e)return"";const i=t.condition_operator||"==";let n=` cond_ent:"${e}" cond_op:"${i}"`;return t.condition_value&&(n+=` cond_val:"${t.condition_value}"`),t.condition_entity_2&&(n+=` cond_ent_2:"${t.condition_entity_2}"`),n+=` cond_inv:"${!!t.condition_invert}"`,n}function Zl(t){const e=(t.condition_entity||"").trim();if(!e)return null;const i=t.condition_operator||"==",n=e.startsWith("binary_sensor.")||e.startsWith("switch.")||e.startsWith("light."),o=["==","!=",">","<",">=","<="].includes(i),s=t.condition_value||"0.0";let r=`id(${e.replace(/\./g,"_")}).state`;const a=i==="=="||i==="!=",l=yn(e),c=isNaN(parseFloat(s));if(a&&(l||c)){if(r=`std::string(id(${e.replace(/\./g,"_")}).state)`,i==="==")return`${r} == "${s}"`;if(i==="!=")return`${r} != "${s}"`}const d=t.condition_invert?"false":"true";if(n){if(i==="==")return`${r} == ${d}`;if(i==="!=")return`${r} != ${d}`}if(o){if(i==="==")return`${r} == ${s}`;if(i==="!=")return`${r} != ${s}`;if(i===">")return`${r} > ${s}`;if(i==="<")return`${r} < ${s}`;if(i===">=")return`${r} >= ${s}`;if(i==="<=")return`${r} <= ${s}`}if(i==="compare_entity"&&t.condition_entity_2){const p=`id(${e.replace(/\./g,"_")}).state`,g=`id(${t.condition_entity_2.replace(/\./g,"_")}).state`;return`${p} == ${g}`}return null}function Ql(t){return t?t.replace(/\\/g,"\\\\").replace(/"/g,'\\"'):""}function ed(t,e){if(t.type==="group")return[];const i=[],n=H?H.get(t.type):null,o=t.type&&t.type.startsWith("lvgl_");if(n&&typeof n.export=="function"){const s=jt(t);s&&i.push(s);const r={...e,lines:i,addFont:(l,c,d,p)=>e.adapter.fonts.addFont(l,c,d,p),getColorConst:l=>ne?ne.getColorConst(l):`"${l}"`,getAlignX:(l,c,d)=>ne?ne.getAlignX(l,c,d):c,getAlignY:(l,c,d)=>ne?ne.getAlignY(l,c,d):c,addDitherMask:(l,c,d,p,g,u,f,y)=>ne?ne.addDitherMask(l,c,d,p,g,u,f,y||0):null,sanitize:l=>Ql(l),getCondProps:l=>Jl(l),getConditionCheck:l=>Zl(l),Utils:ne,COLORS:Vt,ALIGNMENT:qt,TEXT_Y_OFFSET:0,RECT_Y_OFFSET:0},a=n.export(t,r);a&&Array.isArray(a)?i.push(...a):a&&typeof a=="string"&&i.push(a)}else if(o){const s=jt(t);i.push(s?s.replace(/[\r\n]+/g," "):"")}else i.push(`// widget:${t.type} id:${t.id} status:unsupported`),i.push(`        // Unsupported widget type: ${t.type}`);return i}function td(t,e,i,n,o){const s=[],r=i.features?.inverted_colors||e.invertedColors,a=!!(i.features&&(i.features.epaper||i.features.epd));return r?(s.push("const auto COLOR_WHITE = Color(0, 0, 0); // Inverted for e-ink"),s.push("const auto COLOR_BLACK = Color(255, 255, 255); // Inverted for e-ink")):(s.push("const auto COLOR_WHITE = Color(255, 255, 255);"),s.push("const auto COLOR_BLACK = Color(0, 0, 0);")),i.id==="esp32_s3_photopainter"||i.name&&i.name.includes("PhotoPainter")?(s.push("const auto COLOR_RED = Color(0, 0, 255);"),s.push("const auto COLOR_GREEN = Color(255, 128, 0);"),s.push("const auto COLOR_BLUE = Color(255, 255, 0);"),s.push("const auto COLOR_YELLOW = Color(0, 255, 0);"),s.push("const auto COLOR_ORANGE = Color(0, 0, 255); // Fallback to Red")):(s.push("const auto COLOR_RED = Color(255, 0, 0);"),s.push("const auto COLOR_GREEN = Color(0, 255, 0);"),s.push("const auto COLOR_BLUE = Color(0, 0, 255);"),s.push("const auto COLOR_YELLOW = Color(255, 255, 0);"),s.push("const auto COLOR_ORANGE = Color(255, 165, 0);")),s.push("auto color_off = COLOR_WHITE;"),s.push("auto color_on = COLOR_BLACK;"),s.push(""),s.push("// Helper to print text with word-wrap at widget boundary"),s.push("auto print_wrapped_text = [&](int x, int y, int max_w, int line_h, esphome::font::Font *font, Color color, TextAlign align, const char* text) {"),s.push("  if (!text || max_w <= 0) return;"),s.push("  int cx = x;"),s.push("  int cy = y;"),s.push("  std::string line;"),s.push("  std::string word;"),s.push("  const char* p = text;"),s.push("  while (*p) {"),s.push("    // SANITIZATION: Treat newlines, carriage returns, and tabs as spaces for flow"),s.push("    bool is_space = (*p == ' ' || *p == '\\n' || *p == '\\r' || *p == '\\t');"),s.push("    if (is_space) {"),s.push("      if (!word.empty()) {"),s.push("        int ww, wh, wbl, wx;"),s.push("        font->measure(word.c_str(), &ww, &wx, &wbl, &wh);"),s.push("        int lw = 0, lx;"),s.push('        if (!line.empty()) { font->measure(line.c_str(), &lw, &lx, &wbl, &wh); int sw, sx, sbl, sh; font->measure(" ", &sw, &sx, &sbl, &sh); lw += sw; }'),s.push("        if (lw + ww > max_w && !line.empty()) {"),s.push("          it.print(cx, cy, font, color, align, line.c_str());"),s.push("          cy += line_h;"),s.push("          line = word;"),s.push("        } else {"),s.push('          if (!line.empty()) line += " ";'),s.push("          line += word;"),s.push("        }"),s.push("        word.clear();"),s.push("      }"),s.push("    } else {"),s.push("      word += *p;"),s.push("    }"),s.push("    p++;"),s.push("  }"),s.push("  if (!word.empty()) {"),s.push("    int ww, wh, wbl, wx;"),s.push("    font->measure(word.c_str(), &ww, &wx, &wbl, &wh);"),s.push("    int lw = 0, lx;"),s.push('    if (!line.empty()) { font->measure(line.c_str(), &lw, &lx, &wbl, &wh); int sw, sx, sbl, sh; font->measure(" ", &sw, &sx, &sbl, &sh); lw += sw; }'),s.push("    if (lw + ww > max_w && !line.empty()) {"),s.push("      it.print(cx, cy, font, color, align, line.c_str());"),s.push("      cy += line_h;"),s.push("      line = word;"),s.push("    } else {"),s.push('      if (!line.empty()) line += " ";'),s.push("      line += word;"),s.push("    }"),s.push("  }"),s.push("  if (!line.empty()) {"),s.push("    it.print(cx, cy, font, color, align, line.c_str());"),s.push("  }"),s.push("};"),s.push(""),a&&(s.push("// Helper to apply a simple grey dither mask for e-paper (checkerboard)"),s.push("auto apply_grey_dither_mask = [&](int x_start, int y_start, int w, int h) {"),s.push("  for (int y = y_start; y < y_start + h; y++) {"),s.push("    for (int x = x_start; x < x_start + w; x++) {"),s.push("      if ((x + y) % 2 == 0) it.draw_pixel_at(x, y, COLOR_WHITE);"),s.push("      else it.draw_pixel_at(x, y, COLOR_BLACK);"),s.push("    }"),s.push("  }"),s.push("};"),s.push(""),s.push("// Helper to apply grey dither to text (subtractive - erases every other black pixel)"),s.push("auto apply_grey_dither_to_text = [&](int x_start, int y_start, int w, int h) {"),s.push("  for (int y = y_start; y < y_start + h; y++) {"),s.push("    for (int x = x_start; x < x_start + w; x++) {"),s.push("      if ((x + y) % 2 == 0) it.draw_pixel_at(x, y, COLOR_WHITE);"),s.push("    }"),s.push("  }"),s.push("};")),H&&H.onExportHelpers({lines:s,widgets:t.flatMap(l=>l.widgets||[])}),s.push("int currentPage = id(display_page);"),a||(s.push("static int last_rendered_page = -1;"),s.push("bool page_changed = (last_rendered_page != currentPage);"),s.push("if (page_changed) last_rendered_page = currentPage;")),t.forEach((l,c)=>{const d=l.name||`Page ${c+1}`;s.push("// ═══════════════════════════════════════════════════════════════"),s.push(`// ▸ PAGE: ${d}`),s.push("// ═══════════════════════════════════════════════════════════════"),s.push(`if (currentPage == ${c}) {`),s.push(`  // page:name "${d}"`),s.push(`  // page:dark_mode "${l.dark_mode||"inherit"}"`),s.push(`  // page:refresh_type "${l.refresh_type||"interval"}"`),s.push(`  // page:refresh_time "${l.refresh_time||""}"`),s.push(`  // page:visible_from "${l.visible_from||""}"`),s.push(`  // page:visible_to "${l.visible_to||""}"`);const p=l.dark_mode==="dark"||l.dark_mode==="inherit"&&e.darkMode;if(s.push("  // Clear screen for this page"),a?s.push(`  it.fill(${p?"COLOR_BLACK":"COLOR_WHITE"});`):(s.push("  if (page_changed) {"),s.push("    // Full clear on page change (prevents black artifacts)"),s.push(`    it.filled_rectangle(0, 0, it.get_width(), it.get_height(), ${p?"COLOR_BLACK":"COLOR_WHITE"});`),s.push("  } else {"),s.push("    // Fast clear for same-page updates"),s.push(`    it.fill(${p?"COLOR_BLACK":"COLOR_WHITE"});`),s.push("  }")),s.push(`  color_off = ${p?"COLOR_BLACK":"COLOR_WHITE"};`),s.push(`  color_on = ${p?"COLOR_WHITE":"COLOR_BLACK"};`),l.widgets){const g=l.widgets.filter(u=>!u.hidden&&u.type!=="group");g.forEach((u,f)=>{const y=ed(u,{...n,layout:e,adapter:o,isEpaper:a,isDark:p});if(y.length>0){const m=y.reduce((b,S)=>{if(!S.trim())return b;const x=S.match(/^ */);return Math.min(b,x?x[0].length:0)},1/0),_=m===1/0?0:m;s.push(...y.map(b=>b.trim()?"  "+b.substring(_):"")),f<g.length-1&&s.push("  // ────────────────────────────────────────")}})}s.push("}")}),s}const Bo=["text_sensor.","weather.","calendar.","person.","device_tracker.","sun.","update.","scene."],nd=(t,e)=>{const{seenEntityIds:i,seenSensorIds:n,appState:o}=e,s=t.flatMap(a=>(a.widgets||[]).filter(l=>!l.hidden)),r=[];return s.forEach(a=>{let l=(a.entity_id||"").trim();const c=a.props||{};if(!l||c.is_local_sensor||(["progress_bar","sensor_text","graph","battery_icon","wifi_signal","ondevice_temperature","ondevice_humidity"].includes(a.type)&&!l.includes(".")&&(l=`sensor.${l}`),a.type==="sensor_text"&&(c.is_text_sensor||c.attribute&&yn(l,o,c.attribute)))||a.type==="calendar")return;const p=l.includes(".")&&!l.startsWith("binary_sensor.")&&!Bo.some(f=>l.startsWith(f)),u=["switch.","light.","fan.","input_boolean.","cover.","lock."].some(f=>l.startsWith(f));if(p&&!u){const f=(c.attribute||"").trim(),y=f?`${l}__attr__${f}`:l;if(!i.has(y)){const m=mn(l,f);n.has(m)||(i.add(y),n.add(m),r.push("- platform: homeassistant"),r.push(`  id: ${m}`),r.push(`  entity_id: ${l}`),f&&r.push(`  attribute: ${f}`),r.push("  internal: true"))}}}),r},id=(t,e)=>{const{seenEntityIds:i,seenSensorIds:n,appState:o}=e,s=t.flatMap(a=>(a.widgets||[]).filter(l=>!l.hidden)),r=[];return s.forEach(a=>{const l=(a.condition_entity||"").trim(),c=(a.entity_id||"").trim(),d=(a.entity_id_2||"").trim(),p=a.props||{};[{ent:l,attr:p.attribute},{ent:c,attr:p.attribute},{ent:d,attr:p.attribute2}].forEach(({ent:g,attr:u})=>{if(!g||p.is_local_sensor)return;const f=Bo.some(b=>g.startsWith(b));let y=!1;if(g===l&&a.condition_operator!=="range"){const b=a.condition_state,S=(b||"").toLowerCase(),x=["on","off","true","false","online","offline"];b&&isNaN(Number(b))&&!x.includes(S)&&(y=!0)}const m=(u||"").trim(),_=(g===c||g===d)&&m&&yn(g,o,m);if(f||y||_){const S=m.includes(".")||m.includes("[")?m.split(/[.[]/)[0]:m,x=S?`${g}__attr__${S}`:g;if(!i.has(x)){const E=mn(g,S,"_txt");n.has(E)||(i.add(x),n.add(E),r.push("- platform: homeassistant"),r.push(`  id: ${E}`),r.push(`  entity_id: ${g}`),S&&r.push(`  attribute: ${S}`),r.push("  internal: true"))}}})}),r},od=(t,e)=>{const{seenEntityIds:i,seenSensorIds:n}=e,o=t.flatMap(a=>(a.widgets||[]).filter(l=>!l.hidden)),s=["binary_sensor.","switch.","light.","input_boolean.","fan.","cover.","vacuum.","lock."],r=[];return o.forEach(a=>{const l=(a.condition_entity||"").trim(),c=(a.entity_id||"").trim();[l,c].forEach(d=>{if(!d)return;if(s.some(g=>d.startsWith(g))&&!i.has(d)){const g=mn(d);n.has(g)||(i.add(d),n.add(g),r.push("- platform: homeassistant"),r.push(`  id: ${g}`),r.push(`  entity_id: ${d}`),r.push("  internal: true"))}})}),r};function sd(t,e,i,n=!1,o={}){if(n&&(t=t.replace(/auto_clear_enabled:\s*true/g,"auto_clear_enabled: false")),e.resolution){const s=e.resolution,r=s.height>s.width,a=i==="portrait"||i==="portrait_inverted",l=i==="landscape_inverted"||i==="portrait_inverted",c=r!==a,d=t.match(/display:[\s\S]*?rotation:\s*(\d+)/),p=d?parseInt(d[1],10):0;let g=0;c&&(g+=90),l&&(g+=180);const u=(p+g)%360;if(v.log(`[Adapter] Orientation: ${i}, base rotation: ${p}, offset: ${g}, final: ${u}`),t=t.replace(/(display:[\s\S]*?rotation:\s*)\d+/g,`$1${u}`),e.name&&e.name.toLowerCase().includes("waveshare touch lcd 7")){const y=(e.name||"ESPHome-Device").replace(/["\\]/g,"").split(" ")[0];t=t.replace(/"Waveshare-7-Inch"/g,`"${y}-Hotspot"`)}const f=t.match(/^(\s*)id:\s*my_touchscreen/m);if(f){const y=f[1];let m="";if(u===0?m=`transform:
${y}  swap_xy: false
${y}  mirror_x: false
${y}  mirror_y: false`:u===90?m=`transform:
${y}  swap_xy: true
${y}  mirror_x: false
${y}  mirror_y: true`:u===180?m=`transform:
${y}  swap_xy: false
${y}  mirror_x: true
${y}  mirror_y: true`:u===270&&(m=`transform:
${y}  swap_xy: true
${y}  mirror_x: true
${y}  mirror_y: false`),m)if(new RegExp(`^${y}transform:`,"m").test(t)){const b=new RegExp(`^${y}transform:\\n(${y}  (swap_xy|mirror_x|mirror_y):.*\\n?)+`,"m");b.test(t)&&(t=t.replace(b,`${y}${m}
`))}else t=t.replace(f[0],`${f[0]}
${y}${m}`);if(n&&o.lcdEcoStrategy==="dim_after_timeout"&&!t.includes("on_release:")){const _=`
${y}on_release:
${y}  - if:
${y}      condition: lvgl.is_paused
${y}      then:
${y}        - lvgl.resume:
${y}        - lvgl.widget.redraw:
${y}        - light.turn_on: display_backlight`,b=t.search(/^touchscreen:/m);if(b!==-1){const x=t.slice(b).slice(12).match(/^\w/m);if(x){const E=b+12+x.index;t=t.slice(0,E)+_+`

`+t.slice(E)}else t=t.trimEnd()+_+`
`}}}}return t}function rd(t,e){if(!e||e.trim()==="")return t;if(!t||t.trim()==="")return e;const i=["sensor:","binary_sensor:","text_sensor:","font:","image:","output:","light:","switch:","button:","script:","globals:","i2c:","spi:","external_components:","time:","interval:","fan:","cover:","climate:","number:","select:","datetime:","lock:","alarm_control_panel:","siren:","media_player:"],n=l=>{const c=new Map,d=l.split(`
`);let p=null,g=[],u=[];for(const f of d){const y=f.trim(),m=f.match(/^([a-z0-9_]+:)(\s*#.*)?$/),_=m&&!f.startsWith(" ")&&!f.startsWith("	"),b=_?m[1]:y;_&&i.includes(b)?(p&&c.set(p,g),p=b,g=[]):_&&!i.includes(b)?(p&&(c.set(p,g),p=null,g=[]),u.push(f)):p?g.push(f):u.push(f)}return p&&c.set(p,g),{sections:c,nonSectionLines:u}},o=n(t),s=n(e),r=new Map(o.sections);for(const[l,c]of s.sections)if(r.has(l)){const d=r.get(l);r.set(l,[...d,...c])}else r.set(l,c);const a=[];a.push(...o.nonSectionLines);for(const[l,c]of r)a.length>0&&a[a.length-1].trim()!==""&&a.push(""),a.push(l),a.push(...c);for(const l of s.nonSectionLines){const c=l.trim();if(c===""||c.startsWith("#"))continue;let d=!1;const p=l.match(/^([a-z0-9_]+:)(\s*#.*)?$/);if(p&&!l.startsWith(" ")){const g=p[1];d=o.nonSectionLines.some(u=>{const f=u.match(/^([a-z0-9_]+:)(\s*#.*)?$/);return f&&f[1]===g})}d||a.push(l)}return a.map(l=>l.trimEnd()).join(`
`)}const ad=t=>{if(!t)return"";const e=["esphome:","esp32:","psram:","wifi:","api:","ota:","logger:","web_server:","captive_portal:","platformio_options:","preferences:","substitutions:","deep_sleep:"],i=t.split(`
`),n=[];let o=!1;for(let s of i){const r=s.trim();if(r.length===0){n.push(s);continue}(s.match(/^\s*/)||[""])[0].length===0&&r.endsWith(":")?(o=e.some(l=>r.startsWith(l)),o?n.push("# "+s+" # (Auto-commented)"):n.push(s)):o?n.push("# "+s):n.push(s)}return n.join(`
`)},ld=(t,e,i,n,o,s,r)=>{const a=/^(\s*)# __LAMBDA_PLACEHOLDER__/m,l=t.match(a),c=s;if(l){const y=l[1],m="# __LAMBDA_PLACEHOLDER__",_=new RegExp(`lambda:\\s*\\|-\\s*[\\r\\n]+\\s*${m.replace("#","\\#")}`).test(t);if(c)t=t.replace(a,"");else{const b=(_?"":y+`lambda: |-
`)+e.map(S=>S.trim()?y+"  "+S:"").join(`
`);t=t.replace(a,b)}}const d=/^(\s*)# __TOUCH_SENSORS_PLACEHOLDER__/m,p=t.match(d);if(p&&i&&i.length>0){const y=i.filter(m=>m.trim()!=="").join(`
`);t=t.replace(d,y)}else p&&(t=t.replace(d,""));t=sd(t,n,o.orientation,c,o);const g=ad(t),u=[];let f=!1;for(const y of r){const m=y.trim();m.endsWith(":")&&!y.startsWith(" ")&&(f=m==="display:"),f||u.push(y)}return rd(g,u.join(`
`))};class dd extends Ne{fonts;yaml;usedPlugins=new Set;preProcessWidgetsPromise;_pendingTouchSensors=[];constructor(){super(),this.fonts=new Xl,this.yaml=new Kl,this.reset()}reset(){this.fonts&&this.fonts.reset(),this.usedPlugins=new Set}async generate(e){if(!e)return console.error("ESPHomeAdapter: Missing layout"),"";this.reset();const i=e.pages||[],n=e.deviceModel||(h?h.deviceModel:null)||window.currentDeviceModel||"reterminal_e1001",o=this._resolveProfile(n,e),s=this._detectRenderingMode(e,o,i),r=[];e.isSelectionSnippet||(r.push(...this.yaml.generateInstructionHeader(o,e)),r.push(...this.yaml.generateSystemSections(o,e)),r.push(""));const a=o.features?.lcd?"my_display":"epaper_display";this.preProcessWidgetsPromise=this.preProcessWidgets(i),await this.preProcessWidgetsPromise;let l=null;o.isPackageBased&&(o.isOfflineImport&&o.content?l=o.content:o.hardwarePackage&&(l=await this.fetchHardwarePackage(o.hardwarePackage)));const c=[];i.forEach((L,O)=>{L.widgets&&L.widgets.forEach(R=>{R.hidden||(R._pageIndex=O,c.push(R))})});const d=new Set,p=new Set,f={widgets:c,profile:o,layout:e,displayId:a,adapter:this,isLvgl:s,seenEntityIds:d,seenSensorIds:p,seenTextEntityIds:new Set,pendingTriggers:new Map,appState:h},y=[],m=[];H.onExportEsphome({...f,lines:m}),y.push("- id: display_page","  type: int","  restore_value: false","  initial_value: '0'");const _=!!(o.features&&(o.features.epaper||o.features.epd)),b=!!(o.features&&o.features.lcd)||!_,S=e.refreshInterval||(b?60:e.deepSleepInterval||600);y.push("- id: page_refresh_default_s","  type: int","  restore_value: true",`  initial_value: '${S}'`),y.push("- id: page_refresh_current_s","  type: int","  restore_value: false","  initial_value: '60'"),y.push("- id: last_page_switch_time","  type: uint32_t","  restore_value: false","  initial_value: '0'"),H.onExportGlobals({...f,lines:y}),m.length>0&&(e.plugin_includes=m),o.isPackageBased||(r.length=0,e.isSelectionSnippet||(r.push(...this.yaml.generateInstructionHeader(o,e)),r.push(...this.yaml.generateSystemSections(o,e)),r.push(""))),y.length>0&&!e.isSelectionSnippet&&(r.push("globals:"),r.push(...y.map(L=>"  "+L))),this._buildInfrastructureLines(o,e,r,l,p),this._buildSensorSections(f,r);const x=H.getAll(),E=["image","online_image","graph","qr_code"];x.sort((L,O)=>{const R=E.indexOf(L.id),B=E.indexOf(O.id);return R!==-1&&B!==-1?R-B:R!==-1?-1:B!==-1?1:L.id.localeCompare(O.id)}),x.forEach(L=>L.onExportComponents&&L.onExportComponents({...f,lines:r}));const w=td(i,e,o,f,this);r.push(...this.fonts.getLines(e.glyphsets,e.extendedLatinGlyphs));const C=this.yaml.generateScriptSection(e,i,o);C.length>0&&r.push(...C);let k=!1;if(s&&ci){const L=ci(i,n,o,e);L&&L.length>0&&(r.push(...L),k=!0)}if(o.isPackageBased){if(l)return ld(l,w,this._pendingTouchSensors,o,e,s,r)}else{const L=ti?ti(o,e,s):[];r.push(...L);for(let O=0;O<r.length;O++)if(r[O].trim()==="display:"){let R=O+1;for(;R<r.length&&(r[R].startsWith("  ")||r[R].trim()==="");)R++;k||r.splice(R,0,"    lambda: |-",...w.map(B=>B.trim()?"      "+B:""));break}}return r.map(L=>L.trimEnd()).join(`
`)}async preProcessWidgets(e){for(const i of e)if(i.widgets)for(const n of i.widgets.filter(o=>!o.hidden&&o.type!=="group")){const o=n.type,s=H?await H.load(o):null;s&&(this.usedPlugins.add(s),typeof s.collectRequirements=="function"&&s.collectRequirements(n,{trackIcon:(r,a)=>this.fonts.trackIcon(r,a),addFont:(r,a,l,c)=>this.fonts.addFont(r,a,l,c)}))}}processPendingTriggers(e,i,n,o="on_value"){if(!n||!i||i.size===0)return e;const s=[];let r=null;for(let a=0;a<e.length;a++){const l=e[a],c=l.trim();s.push(l);const d=l.match(/^\s*(entity_id|id):\s*"?([^"]+)"?/);if(d){const p=d[2].trim();if(i.has(p)){let u=!1;const f=(l.match(/^\s*/)||[""])[0].length;for(let y=a+1;y<e.length;y++){const m=e[y],_=m.trim();if(!_)continue;if((m.match(/^\s*/)||[""])[0].length<=f&&_.startsWith("-"))break;if(_===`${o}:`){u=!0;break}}if(u)r={triggers:i.get(p),active:!0};else{const y=" ".repeat(f);s.push(`${y}${o}:`),s.push(`${y}  then:`);for(const m of i.get(p))m.split(`
`).forEach(b=>{s.push(`${y}    ${b}`)})}}}if(r&&r.active){if(c===`${o}:`)r.foundKey=!0;else if(r.foundKey){if(c==="then:"){const p=" ".repeat((l.match(/^\s*/)||[""])[0].length+2);for(const g of r.triggers)g.split(`
`).forEach(f=>{s.push(`${p}${f}`)});r=null}else if(c.startsWith("-")){const p=" ".repeat((l.match(/^\s*/)||[""])[0].length);for(const g of r.triggers)g.split(`
`).forEach(f=>{s.push(`${p}${f}`)});r=null}}}}return s}async fetchHardwarePackage(e){let i=e;window.location.pathname.includes("/esphome-designer/editor")&&!e.startsWith("http")&&!e.startsWith("/")&&(i="/esphome-designer/editor/static/"+e);try{const n=await fetch(i,{cache:"no-store"});if(!n.ok)throw new Error(`HTTP ${n.status}`);return await n.text()}catch(n){return v.error("Failed to fetch hardware package:",n),`# ERROR LOADING PROFILE: ${n.message}`}}_resolveProfile(e,i){const n=D||{},o=window.DEVICE_PROFILES||{};let r={...n,...o}[e]||{};if(e==="custom"&&i.customHardware){const a=i.customHardware;r={id:"custom",name:"Custom Device",chip:a.chip||"esp32-s3",displayPlatform:a.displayDriver||"generic_st7789",displayModel:a.displayModel,resolution:{width:a.resWidth||800,height:a.resHeight||480},shape:a.shape||"rect",pins:{i2c:a.pins?.sda?{sda:a.pins.sda,scl:a.pins.scl}:null,spi:a.pins?.clk?{clk:a.pins.clk,mosi:a.pins.mosi}:null,display:{cs:a.pins?.cs,dc:a.pins?.dc,reset:a.pins?.rst,busy:a.pins?.busy}},features:{psram:!!a.psram,lcd:a.tech==="lcd",epaper:a.tech==="epaper",touch:a.touchTech&&a.touchTech!=="none"},backlight:a.pins?.backlight?{platform:"gpio",pin:a.pins.backlight}:null,touch:a.touchTech&&a.touchTech!=="none"?{platform:a.touchTech,sda:a.pins?.sda,scl:a.pins?.scl,interrupt_pin:a.pins?.touch_int,reset_pin:a.pins?.touch_rst}:null}}return r}_detectRenderingMode(e,i,n){let o=!!(i.features&&(i.features.lvgl||i.features.lv_display));const s=e.renderingMode||(h?h.settings?.renderingMode:null);if(s==="direct"?(o=!1,v.log("[ESPHomeAdapter] Rendering mode set to 'direct', skipping LVGL generation")):s==="lvgl"&&(o=!0,v.log("[ESPHomeAdapter] Rendering mode set to 'lvgl', forcing LVGL generation")),!o)for(const r of n){if(r.widgets){for(const a of r.widgets.filter(l=>!l.hidden))if(a.type.startsWith("lvgl_")){o=!0;break}}if(o)break}return o}_buildInfrastructureLines(e,i,n,o,s){!(o&&o.includes("psram:"))&&e.features?.psram&&oi&&n.push(...oi(e)),!e.isPackageBased&&!i.isSelectionSnippet?(n.push("http_request:","  verify_ssl: false","  timeout: 20s","  buffer_size_rx: 4096"),Qn&&n.push(...Qn(e)),ei&&n.push(...ei(e)),Zn&&n.push(...Zn(e)),si&&n.push(...si(e)),ri&&n.push(...ri(e)),Jn&&n.push(...Jn(e)),ai&&n.push(...ai(e)),li&&n.push(...li(e)),n.some(l=>String(l).split(`
`).some(c=>c.trim()==="time:"))||(n.push("time:","  - platform: homeassistant","    id: ha_time"),s.add("ha_time"))):i.isSelectionSnippet||n.some(l=>String(l).split(`
`).some(c=>c.trim()==="time:"))||(n.push("time:","  - platform: homeassistant","    id: ha_time"),s.add("ha_time")),e.features&&(e.pins?.batteryAdc&&(s.add("battery_voltage"),s.add("battery_level")),e.features.sht4x&&(s.add("sht4x_sensor"),s.add("sht4x_temperature"),s.add("sht4x_humidity")),(e.features.sht3x||e.features.sht3xd)&&(s.add("sht3x_sensor"),s.add("sht3x_temperature"),s.add("sht3x_humidity")),e.features.shtc3&&(s.add("shtc3_sensor"),s.add("shtc3_temperature"),s.add("shtc3_humidity")))}_buildSensorSections(e,i){const{widgets:n,displayId:o,profile:s,isLvgl:r,pendingTriggers:a}=e,l=e.layout.pages||[];ni&&i.push(...ni(s,[],o,n));const c=[];H.onExportNumericSensors({...e,lines:c,mainLines:i});const d=this.processPendingTriggers(c,a,r,"on_value");d.length>0&&(i.some(x=>x==="sensor:")||i.push("sensor:"),i.push(...d.flatMap(x=>x.split(`
`).map(E=>"  "+E))));const p=nd(l,e);if(p.length>0){i.some(E=>E==="sensor:")||i.push("sensor:");const x=this.processPendingTriggers(p,a,r,"on_value");i.push(...x.flatMap(E=>E.split(`
`).map(w=>"  "+w)))}const g=id(l,e),u=[];H.onExportTextSensors({...e,lines:u}),g.length>0&&u.push(...g);const f=this.processPendingTriggers(u,a,r,"on_value");f.length>0&&(i.push("text_sensor:"),i.push(...f.flatMap(x=>x.split(`
`).map(E=>"  "+E))));const y=[];if(!s.isPackageBased&&tt){const x=tt(s,l.length,o,[]);x.length>0&&x[0].trim()==="binary_sensor:"?y.push(...x.slice(1).map(E=>E.startsWith("  ")?E.slice(2):E)):y.push(...x)}const m=n.filter(x=>x.type==="touch_area"||x.type==="template_nav_bar");let _=[];if(m.length>0&&tt){const x=tt({features:{}},l.length,o,m);if(x.length>0){const E=x[0]?.trim()==="binary_sensor:"?1:0;x.length>E&&(s.isPackageBased?_=x.slice(E):(y.push("# Touch Area Binary Sensors"),y.push(...x.slice(E).map(w=>w.startsWith("  ")?w.slice(2):w))))}}this._pendingTouchSensors=_,H.onExportBinarySensors({...e,lines:y});const b=this.processPendingTriggers(y,a,r,"on_state");b.length>0&&!s.isPackageBased&&(i.push("binary_sensor:"),i.push(...b.flatMap(x=>x.split(`
`).map(E=>"  "+E))));const S=od(l,e);if(S.length>0){i.some(E=>E==="binary_sensor:")||i.push("binary_sensor:");const x=this.processPendingTriggers(S,a,r,"on_state");i.push(...x.flatMap(E=>E.split(`
`).map(w=>"  "+w)))}if(!s.isPackageBased&&ii){const x=ii(s,l.length,o);x.length>0&&i.push(...x)}}}class Ho extends Ne{constructor(){super()}async generate(e){if(!e)return console.error("OEPLAdapter: Missing layout"),"[]";const i=e.pages||[],n=e.currentPageIndex||0,o=i[n];if(!o||!o.widgets)return"[]";const s=[];o.widgets.forEach(u=>{if(u.hidden||u.type==="group")return;const f=this.generateWidget(u,{layout:e,page:o});f&&(Array.isArray(f)?f:[f]).forEach(m=>{m&&typeof m=="object"&&!m.id&&(m.id=u.id),s.push(m)})});const a=(e.orientation||"landscape")==="portrait"?90:0,l=e.protocolHardware||{},c=(l.colorMode==="bw"||l.colorMode==="grayscale",e.darkMode?"black":"white"),g={service:"open_epaper_link.drawcustom",target:{entity_id:(e.settings||{}).oeplEntityId||"open_epaper_link.0000000000000000"},data:{background:c,rotate:a,dither:2,ttl:60,payload:s}};return JSON.stringify(g,null,2)}generateWidget(e,i){const n=H.get(e.type);if(n&&typeof n.exportOEPL=="function")try{return n.exportOEPL(e,i)}catch(o){return v.error(`Error in exportOEPL for ${e.type}:`,o),null}else return this._warnedTypes||(this._warnedTypes=new Set),this._warnedTypes.has(e.type)||(v.warn(`Widget type "${e.type}" does not support OEPL export yet.`),this._warnedTypes.add(e.type)),null}}window.OEPLAdapter=Ho;class No extends Ne{constructor(){super()}async generate(e){if(!e)return v.error("OpenDisplayAdapter: Missing layout"),"";const i=e.pages||[],n=e.currentPageIndex||0,o=i[n];if(!o||!o.widgets)return"";const s=[];e.protocolHardware;const a=o.dark_mode==="dark"||o.dark_mode==="inherit"&&e.darkMode?"black":"white";o.widgets.forEach(u=>{if(u.hidden||u.type==="group")return;const f=this.generateWidget(u,{layout:e,page:o});f&&(Array.isArray(f)?f:[f]).forEach(m=>{m&&typeof m=="object"&&!m.id&&(m.id=u.id),s.push(m)})});const c=(e.orientation||"landscape")==="portrait"?90:0,d=e.settings||{},p=d.opendisplayEntityId||"opendisplay.0000000000000000";let g=`service: opendisplay.drawcustom
`;return g+=`target:
  entity_id: ${p}
`,g+=`data:
`,g+=`  background: "${a}"
`,g+=`  rotate: ${c}
`,g+=`  dither: ${d.opendisplayDither??2}
`,g+=`  ttl: ${d.opendisplayTtl||60}
`,g+=`  payload: |-
`,s.forEach(u=>{const f=u.id?`
    # id: ${u.id}`:"";g+=`${f}
    - type: ${u.type}
`,Object.entries(u).forEach(([y,m])=>{if(y==="type"||y==="id")return;let _=m;typeof m=="string"?(m.includes(`
`)||m.includes(":"))&&(_=`"${m.replace(/"/g,'\\"')}"`):(Array.isArray(m)||typeof m=="object"&&m!==null)&&(_=JSON.stringify(m)),g+=`      ${y}: ${_}
`})}),g}generateWidget(e,i){const n=H.get(e.type);if(n&&typeof n.exportOpenDisplay=="function")try{return n.exportOpenDisplay(e,i)}catch(o){return v.error(`Error in exportOpenDisplay for ${e.type}:`,o),null}else return this._warnedTypes||(this._warnedTypes=new Set),this._warnedTypes.has(e.type)||(v.warn(`Widget type "${e.type}" does not support OpenDisplay export yet.`),this._warnedTypes.add(e.type)),null}}window.OpenDisplayAdapter=No;window.LAYOUT={WIDGET:{SMALL:{W:100,H:20},MEDIUM:{W:200,H:60},LARGE:{W:200,H:100}},FONT:{SIZE:{XS:12,S:14,M:16,L:20,XL:28,XXL:40},DEFAULT:{LABEL:14,VALUE:20,TITLE:28,DATE:16}},GRID:{GAP:10,MARGIN:10}};Object.freeze(window.LAYOUT);const ui=[{id:"core",name:"Core Widgets",expanded:!0,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><rect x="4" y="4" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="14" y="4" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="4" y="14" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="14" y="14" width="6" height="6" rx="1" fill="currentColor"/></svg>',widgets:[{type:"label",label:"Floating text",tag:"Text",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><text x="4" y="17" font-size="14" font-weight="bold" fill="currentColor">Aa</text></svg>'},{type:"sensor_text",label:"Sensor text",tag:"Entity",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="8" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2" /><path d="M11 12h9M14 9l3 3-3 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"datetime",label:"Date & Time",tag:"Time",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2" /><path d="M12 7v5l3 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"icon",label:"MDI icon",tag:"Icon",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 2L9 9H2l6 4.5L5.5 22 12 17l6.5 5-2.5-8.5L22 9h-7z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" /></svg>'},{type:"weather_icon",label:"Weather icon",tag:"Icon",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="10" r="4" fill="none" stroke="currentColor" stroke-width="2" /><path d="M12 2v2M12 16v2M4 10H2M22 10h-2M5.6 4.6l1.4 1.4M17 6l1.4-1.4M5.6 15.4l1.4-1.4M17 14l1.4 1.4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"image",label:"Image",tag:"Media",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="3" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" /><path d="M21 15l-5-5L11 15l-3-3-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"online_image",label:"Puppet image",tag:"Remote",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="14" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M17 10l4-4M21 10V6h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><circle cx="7" cy="8" r="1.5" fill="currentColor" /><path d="M17 13l-4-4-4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'}]},{id:"shapes",name:"Shapes",expanded:!0,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><circle cx="7" cy="7" r="4" fill="none" stroke="currentColor" stroke-width="2"/><rect x="13" y="13" width="7" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><path d="M17 4l3 5h-6z" fill="none" stroke="currentColor" stroke-width="2"/></svg>',widgets:[{type:"shape_rect",label:"Rectangle",tag:"Shape",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"rounded_rect",label:"Rounded Rect",tag:"Shape",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="6" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"shape_circle",label:"Circle",tag:"Shape",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"line",label:"Line",tag:"Shape",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'}]},{id:"opendisplay",name:"OpenDisplay / OEPL",expanded:!1,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><rect x="3" y="4" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" stroke-width="1" /><circle cx="6" cy="6.5" r="1" fill="currentColor" /><circle cx="9" cy="6.5" r="1" fill="currentColor" /></svg>',widgets:[{type:"odp_multiline",label:"Multiline Text",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><line x1="4" y1="12" x2="18" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><line x1="4" y1="17" x2="14" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"odp_rectangle_pattern",label:"Rectangle Pattern",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5" /><rect x="11" y="4" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5" /><rect x="3" y="12" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5" /><rect x="11" y="12" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5" /></svg>'},{type:"odp_polygon",label:"Polygon",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><polygon points="12,3 21,10 18,20 6,20 3,10" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"odp_ellipse",label:"Ellipse",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="9" ry="6" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"odp_arc",label:"Arc",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M6 18 A 9 9 0 0 1 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"odp_icon_sequence",label:"Icon Sequence",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="5" cy="12" r="3" fill="currentColor" /><circle cx="12" cy="12" r="3" fill="currentColor" /><circle cx="19" cy="12" r="3" fill="currentColor" /></svg>'},{type:"odp_plot",label:"Sensor Plot",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M3 3v18h18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M6 15l4-6 4 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"odp_debug_grid",label:"Debug Grid",tag:"Debug",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M3 3v18h18M3 9h18M3 15h18M9 3v18M15 3v18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'}]},{id:"advanced",name:"Advanced",expanded:!0,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" fill="none" stroke="currentColor" stroke-width="2"/></svg>',widgets:[{type:"graph",label:"Graph / Chart",tag:"Data",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M3 3v18h18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M7 14l4-4 4 4 5-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"progress_bar",label:"Progress bar",tag:"Entity",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="9" width="20" height="6" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><rect x="3" y="10" width="12" height="4" rx="1" fill="currentColor" /></svg>'},{type:"qr_code",label:"QR Code",tag:"Tools",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" fill="currentColor" /><rect x="14" y="3" width="7" height="7" fill="currentColor" /><rect x="3" y="14" width="7" height="7" fill="currentColor" /><rect x="14" y="14" width="3" height="3" fill="currentColor" /></svg>'},{type:"calendar",label:"Calendar",tag:"Events",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" stroke-width="2" /></svg>'},{type:"weather_forecast",label:"Weather Forecast",tag:"Forecast",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="10" r="4" fill="none" stroke="currentColor" stroke-width="2" /><path d="M12 2v2M12 16v2M4 10H2M22 10h-2M5.6 4.6l1.4 1.4M17 6l1.4-1.4M5.6 15.4l1.4-1.4M17 14l1.4 1.4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"quote_rss",label:"Quote / RSS",tag:"Info",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M6 17h3l2-4V7H5v6h3M13 17h3l2-4V7h-6v6h3" fill="none" stroke="currentColor" stroke-width="2" /></svg>'}]},{id:"inputs",name:"Inputs",expanded:!1,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><path d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zM16.06 17H15v-1l-1-1h-6l-1 1v1H5.94c-.58 0-1.06-.48-1.06-1.06V7.5c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5v8.44c0 .58-.48 1.06-1.06 1.06z" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="12" cy="13" r="1.5" fill="currentColor" /></svg>',widgets:[{type:"touch_area",label:"Touch Area",tag:"Input",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="5" y="5" width="14" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="2,2" /><circle cx="12" cy="12" r="3" fill="currentColor" /></svg>'},{type:"nav_next_page",label:"Next Page",tag:"Nav",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M10 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"nav_previous_page",label:"Prev Page",tag:"Nav",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M14 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"nav_reload_page",label:"Reload Page",tag:"Nav",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M23 4v6h-6M1 20v-6h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"template_nav_bar",label:"Navigation Bar",tag:"Template",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M6 10l-2 2 2 2M18 10l2 2-2 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 12h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'}]},{id:"ondevice",name:"On Device Sensors",expanded:!0,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 9h6v6H9z" fill="currentColor"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M7 2v2M7 20v2M17 2v2M17 20v2M2 7h2M20 7h2M2 17h2M20 17h2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',widgets:[{type:"battery_icon",label:"Battery",tag:"Sensor",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="7" width="18" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><rect x="4" y="9" width="8" height="6" fill="currentColor" /><path d="M20 10h2v4h-2" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"wifi_signal",label:"WiFi Signal",tag:"Sensor",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 3C7.5 3 3.8 5.4 2 9l2 2c1.3-2.5 4-4.2 8-4.2s6.7 1.7 8 4.2l2-2c-1.8-3.6-5.5-6-10-6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M12 9c-2.7 0-5.1 1.4-6.5 3.5L7 14c1-1.4 2.8-2.3 5-2.3s4 .9 5 2.3l1.5-1.5C17.1 10.4 14.7 9 12 9z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><circle cx="12" cy="18" r="2" fill="currentColor" /></svg>'},{type:"ondevice_temperature",label:"Temperature",tag:"SHT4x",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 2a2 2 0 00-2 2v10.1a4 4 0 104 0V4a2 2 0 00-2-2z" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="12" cy="18" r="2" fill="currentColor" /></svg>'},{type:"ondevice_humidity",label:"Humidity",tag:"SHT4x",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"template_sensor_bar",label:"On-Board Sensor Bar",tag:"New",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M5 12h2M10 12h2M15 12h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'}]},{id:"lvgl",name:"LVGL Components",expanded:!1,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" /></svg>',widgets:[{type:"lvgl_obj",label:"Base Object",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_label",label:"Label",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><text x="4" y="17" font-size="14" font-weight="bold" fill="currentColor">Aa</text></svg>'},{type:"lvgl_line",label:"LVGL Line",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"lvgl_button",label:"Button",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="8" rx="2" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="2" /><text x="12" y="16.5" font-size="8" text-anchor="middle" fill="currentColor">BTN</text></svg>'},{type:"lvgl_switch",label:"Switch",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="8" rx="4" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="16" cy="12" r="3" fill="currentColor" /></svg>'},{type:"lvgl_checkbox",label:"Checkbox",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><polyline points="9 12 11 14 15 10" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_slider",label:"Slider",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><circle cx="12" cy="12" r="3" fill="currentColor" /></svg>'},{type:"lvgl_bar",label:"Bar",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="9" width="20" height="6" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><rect x="3" y="10" width="12" height="4" rx="1" fill="currentColor" /></svg>'},{type:"lvgl_arc",label:"Arc",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M4 18 A 10 10 0 1 1 20 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"lvgl_meter",label:"Meter",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M4 18 A 10 10 0 1 1 20 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><line x1="12" y1="18" x2="16" y2="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"lvgl_spinner",label:"Spinner",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_led",label:"LED",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" fill="currentColor" /><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_chart",label:"Chart",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M3 3v18h18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M7 14l4-4 4 4 5-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"lvgl_img",label:"Image",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="3" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" /><path d="M21 15l-5-5L11 15l-3-3-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"lvgl_qrcode",label:"QR Code",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" fill="currentColor" /><rect x="14" y="3" width="7" height="7" fill="currentColor" /><rect x="3" y="14" width="7" height="7" fill="currentColor" /><rect x="14" y="14" width="3" height="3" fill="currentColor" /></svg>'},{type:"lvgl_dropdown",label:"Dropdown",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="8" width="20" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><polyline points="16 11 18 13 20 11" fill="currentColor" /></svg>'},{type:"lvgl_roller",label:"Roller",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="20" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><line x1="6" y1="10" x2="18" y2="10" stroke="currentColor" stroke-width="1" /><line x1="6" y1="14" x2="18" y2="14" stroke="currentColor" stroke-width="1" /></svg>'},{type:"lvgl_spinbox",label:"Spinbox",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M6 12l2-2 2 2" fill="none" stroke="currentColor" stroke-width="1" /><path d="M14 12l2 2 2-2" fill="none" stroke="currentColor" stroke-width="1" /></svg>'},{type:"lvgl_textarea",label:"Textarea",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" fill="none" stroke="currentColor" stroke-width="2" /><line x1="6" y1="8" x2="14" y2="8" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_keyboard",label:"Keyboard",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><line x1="6" y1="10" x2="8" y2="10" stroke="currentColor" stroke-width="2" /><line x1="10" y1="10" x2="12" y2="10" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_buttonmatrix",label:"Btn Matrix",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="7" width="9" height="4" fill="none" stroke="currentColor" stroke-width="1" /><rect x="13" y="7" width="9" height="4" fill="none" stroke="currentColor" stroke-width="1" /><rect x="2" y="13" width="9" height="4" fill="none" stroke="currentColor" stroke-width="1" /><rect x="13" y="13" width="9" height="4" fill="none" stroke="currentColor" stroke-width="1" /></svg>'},{type:"lvgl_tabview",label:"Tabview",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><line x1="2" y1="8" x2="22" y2="8" stroke="currentColor" stroke-width="1" /></svg>'},{type:"lvgl_tileview",label:"Tileview",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="2" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2" /><rect x="13" y="2" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2" /><rect x="2" y="13" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2" /><rect x="13" y="13" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"template_nav_bar",label:"Nav Bar (Template)",tag:"Nav",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M6 10l-2 2 2 2M18 10l2 2-2 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 12h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'}]}];async function Go(t){const e=document.getElementById(t);if(!e)return;const i=h?.settings?.renderingMode||"direct";v.log(`[Palette] Rendering palette for mode: ${i}`),e.innerHTML='<div class="palette-loading" style="padding: 20px; color: #999; text-align: center; font-size: 13px;">Loading widgets...</div>';const n=[];ui.forEach(o=>{o.widgets.forEach(s=>{n.includes(s.type)||n.push(s.type)})}),v.log(`[Palette] Pre-loading ${n.length} widget plugins...`);try{await Promise.all(n.map(o=>H.load(o)))}catch(o){v.error("[Palette] Failed to load some plugins:",o)}e.innerHTML="",ui.forEach(o=>{let s=o.expanded;i==="lvgl"?s=o.id==="lvgl":(i==="oepl"||i==="opendisplay")&&(s=o.id==="opendisplay"||o.id==="core"||o.id==="shapes");const r=document.createElement("div");r.className=`widget-category ${s?"expanded":""}`,r.dataset.category=o.id;const a=document.createElement("div");a.className="widget-category-header";let l='<span class="category-icon">›</span>';o.icon&&(l+=o.icon),a.innerHTML=`
            ${l}
            <span class="category-name">${o.name}</span>
            ${o.widgets.length>0&&!s?`<span class="category-count">${o.widgets.length}</span>`:""}
        `,a.addEventListener("click",()=>{r.classList.toggle("expanded")});const c=document.createElement("div");c.className="widget-category-items",o.widgets.forEach(d=>{const p=document.createElement("div"),g=H.get(d.type);let u=!0,f="";if(g?.supportedModes)u=g.supportedModes.includes(i),f=`Not supported in ${i} mode`;else if(i==="oepl"||i==="opendisplay"){const _=i==="oepl"?!!g?.exportOEPL:!!g?.exportOpenDisplay,b=o.id==="ondevice"||o.id==="lvgl",S=d.type==="calendar"||d.type==="weather_forecast"||d.type==="graph"||d.type==="quote_rss";u=_&&!b&&!S,f=`Not supported in ${i==="oepl"?"OpenEpaperLink":"OpenDisplay"} mode`}else if(i==="lvgl"){const _=d.type.startsWith("lvgl_"),b=o.id==="inputs",S=typeof g?.exportLVGL=="function";u=_||b||S,f="Widget not compatible with LVGL mode"}else if(i==="direct"){const _=d.type.startsWith("lvgl_")||d.type.startsWith("oepl_");g?u=!!g.export&&!_:u=!_,f="Not supported in Direct rendering mode"}p.className="item"+(u?"":" incompatible"),p.draggable=u,p.dataset.widgetType=d.type;const y=d.label||g?.name;let m="";d.tag&&(m=`<span class="tag">${d.tag}</span>`),p.innerHTML=`
                ${d.icon}
                <span class="label">${y}</span>
                ${m}
            `,p.title=u?`Add ${y} to canvas`:f,u?p.addEventListener("dragstart",_=>{_.dataTransfer.setData("application/widget-type",d.type),_.dataTransfer.setData("text/plain",d.type),_.dataTransfer.effectAllowed="copy"}):p.addEventListener("click",_=>{_.stopPropagation(),T(()=>Promise.resolve().then(()=>Eo),void 0,import.meta.url).then(b=>{b.showToast(f,"warning")})}),c.appendChild(p)}),r.appendChild(a),r.appendChild(c),e.appendChild(r)})}F(I.SETTINGS_CHANGED,t=>{t&&t.renderingMode!==void 0&&(v.log(`[Palette] Settings changed, refreshing palette for mode: ${t.renderingMode}`),Go("widgetPalette"))});class cd{constructor(){this.modal=null,this.currentLayoutId="reterminal_e1001",this.layouts=[]}init(){this.createModal(),this.bindButton(),v.log("[LayoutManager] Initialized")}bindButton(){const e=document.getElementById("manageLayoutsBtn");e&&e.addEventListener("click",()=>this.open())}createModal(){if(document.getElementById("layoutManagerModal")){this.modal=document.getElementById("layoutManagerModal");return}const e=document.createElement("div");e.id="layoutManagerModal",e.className="modal-backdrop hidden",e.innerHTML=`
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
        `,document.body.appendChild(e),this.modal=e,document.getElementById("layoutManagerClose").addEventListener("click",()=>this.close()),document.getElementById("layoutManagerNew").addEventListener("click",()=>this.showNewLayoutDialog()),document.getElementById("layoutManagerImport").addEventListener("click",()=>{document.getElementById("layoutManagerFileInput").click()}),document.getElementById("layoutManagerFileInput").addEventListener("change",i=>this.handleFileImport(i)),e.addEventListener("click",i=>{i.target===e&&this.close()})}async open(){this.modal||this.createModal(),this.modal.classList.remove("hidden"),await this.loadLayouts()}close(){this.modal&&this.modal.classList.add("hidden")}setStatus(e,i="info"){const n=document.getElementById("layoutManagerStatus");if(n){const o={success:"var(--success, #22c55e)",error:"var(--danger, #ef4444)",info:"var(--muted, #888)"};n.textContent=e,n.style.color=o[i]||o.info,e&&setTimeout(()=>{n.textContent=""},5e3)}}async loadLayouts(){if(typeof N!="function"||!N()){this.setStatus("Not connected to Home Assistant","error");return}try{const e=await fetch(`${$}/layouts`);if(!e.ok)throw new Error(`Failed to load layouts: ${e.status}`);const i=await e.json();this.layouts=i.layouts||[],i.last_active_layout_id&&this.layouts.some(n=>n.id===i.last_active_layout_id)&&(!h?.currentLayoutId||h.currentLayoutId==="reterminal_e1001")&&this.layouts.find(o=>o.id===i.last_active_layout_id)&&i.last_active_layout_id!==h?.currentLayoutId&&(v.log(`[LayoutManager] Syncing to last active layout: ${i.last_active_layout_id}`),this.currentLayoutId=i.last_active_layout_id,h&&typeof h.setCurrentLayoutId=="function"&&h.setCurrentLayoutId(i.last_active_layout_id)),this.renderLayoutList()}catch(e){v.error("[LayoutManager] Error loading layouts:",e),this.setStatus("Failed to load layouts","error")}}renderLayoutList(){const e=document.getElementById("layoutManagerTableBody"),i=document.getElementById("layoutManagerCurrentName");if(!e)return;h&&h.currentLayoutId&&(this.currentLayoutId=h.currentLayoutId);const n=this.layouts.find(o=>o.id===this.currentLayoutId);if(i&&(i.textContent=n?n.name:this.currentLayoutId),this.layouts.length===0){e.innerHTML='<tr><td colspan="4" style="text-align: center; color: var(--muted); padding: 16px;">No layouts found</td></tr>';return}e.innerHTML=this.layouts.map(o=>{const s=o.id===this.currentLayoutId,r=this.layouts.filter(a=>a.name===o.name).length>1;return`
                <tr style="border-bottom: 1px solid var(--border-subtle); ${s?"background: var(--accent-soft);":""}">
                    <td style="padding: 8px 4px;">
                        <span style="font-weight: 500;">${this.escapeHtml(o.name)}</span>
                        ${s?'<span style="background: var(--accent); color: white; font-size: 9px; padding: 2px 4px; border-radius: 2px; margin-left: 4px;">current</span>':""}
                        ${r?'<br><span style="font-size: 9px; color: var(--muted);">'+this.escapeHtml(o.id)+"</span>":""}
                    </td>
                    <td style="padding: 8px 4px; font-size: 11px; color: var(--muted);">${this.getDeviceDisplayName(o.device_model||o.device_type)}</td>
                    <td style="padding: 8px 4px; font-size: 11px; color: var(--muted);">${o.page_count} pages</td>
                    <td style="padding: 8px 4px; text-align: right;">
                        <div style="display: flex; gap: 4px; justify-content: flex-end;">
                            ${s?"":`<button class="btn btn-sm btn-primary" style="font-size: 10px; padding: 4px 8px;" onclick="window.layoutManager.loadLayout('${o.id}')">Load</button>`}
                            <button class="btn btn-sm btn-secondary" style="font-size: 10px; padding: 4px 8px;" onclick="window.layoutManager.exportLayout('${o.id}')">📤</button>
                            ${!s&&this.layouts.length>1?`<button class="btn btn-sm btn-secondary" style="font-size: 10px; padding: 4px 8px; color: var(--danger);" onclick="window.layoutManager.deleteLayout('${o.id}', '${this.escapeHtml(o.name)}')">🗑</button>`:""}
                        </div>
                    </td>
                </tr>
            `}).join("")}escapeHtml(e){const i=document.createElement("div");return i.textContent=e||"",i.innerHTML}getDeviceDisplayName(e){if(D&&D[e]){let o=D[e].name;return(pt||[]).includes(e)||(o+=" (untested)"),o}return{reterminal_e1001:"E1001 (Mono)",reterminal_e1002:"E1002 (Color)",trmnl:"TRMNL",esp32_s3_photopainter:"PhotoPainter (7-Color)"}[e]||e||"Unknown"}async loadLayout(e){if(!(typeof N!="function"||!N()))try{this.setStatus("Loading layout...","info");const i=await fetch(`${$}/layouts/${e}`);if(!i.ok)throw new Error(`Failed to load layout: ${i.status}`);const n=await i.json();n.device_id||(n.device_id=e),this.currentLayoutId=e,h&&typeof h.setCurrentLayoutId=="function"&&(h.setCurrentLayoutId(e),v.log(`[LayoutManager] Set currentLayoutId to: ${e}`));const o=document.getElementById("canvas");if(o){const s=o.querySelector(".canvas-grid");o.innerHTML="",s&&o.appendChild(s),v.log("[LayoutManager] Cleared canvas before loading layout")}document.querySelectorAll(".graph-axis-label").forEach(s=>s.remove()),typeof we=="function"&&we(n),h&&h.currentLayoutId!==e&&(h.setCurrentLayoutId(e),v.log(`[LayoutManager] Re-set currentLayoutId to: ${e} (was changed by loadLayoutIntoState)`)),typeof P=="function"&&typeof I<"u"&&P(I.LAYOUT_IMPORTED,n),this.setStatus(`Loaded: ${n.name||e}`,"success"),this.renderLayoutList(),setTimeout(()=>this.close(),500)}catch(i){v.error("[LayoutManager] Error loading layout:",i),this.setStatus("Failed to load layout","error")}}async exportLayout(e){if(!(typeof N!="function"||!N()))try{const i=`${$}/export?id=${e}`,n=document.createElement("a");n.href=i,n.download=`${e}_layout.json`,document.body.appendChild(n),n.click(),document.body.removeChild(n),this.setStatus("Export started...","success")}catch(i){v.error("[LayoutManager] Error exporting layout:",i),this.setStatus("Failed to export layout","error")}}async deleteLayout(e,i){if(!(typeof N!="function"||!N()||!confirm(`Are you sure you want to delete "${i}"?

This cannot be undone.`))){this.setStatus("Deleting layout...","info");try{const o=await fetch(`${$}/layouts/${e}`,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify({action:"delete"})});if(!o.ok){const s=await o.json().catch(()=>({}));if(s.error==="cannot_delete_last_layout"){this.setStatus("Cannot delete the last layout","error");return}throw new Error(s.error||`Delete failed: ${o.status}`)}this.setStatus(`Deleted: ${i}`,"success"),await this.loadLayouts()}catch(o){v.warn("[LayoutManager] Network error during delete, verifying if operation completed..."),await new Promise(r=>setTimeout(r,1500)),await this.loadLayouts(),this.layouts.some(r=>r.id===e)?(v.error("[LayoutManager] Error deleting layout:",o),this.setStatus("Failed to delete layout","error")):(v.log("[LayoutManager] Layout was successfully deleted (verified after refresh)"),this.setStatus(`Deleted: ${i}`,"success"))}}}showNewLayoutDialog(){if(!document.getElementById("newLayoutModal")){const s=document.createElement("div");s.id="newLayoutModal",s.className="modal-backdrop hidden",s.innerHTML=`
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
            `,document.body.appendChild(s),document.getElementById("newLayoutClose").addEventListener("click",()=>{s.classList.add("hidden")}),document.getElementById("newLayoutCancel").addEventListener("click",()=>{s.classList.add("hidden")}),document.getElementById("newLayoutConfirm").addEventListener("click",()=>{this.handleCreateLayoutConfirm()}),document.getElementById("newLayoutName").addEventListener("keydown",r=>{r.key==="Enter"?(r.preventDefault(),this.handleCreateLayoutConfirm()):r.key==="Escape"&&s.classList.add("hidden"),r.stopPropagation()}),s.addEventListener("click",r=>{if(r.target===s){const a=document.getElementById("newLayoutName");document.activeElement!==a&&s.classList.add("hidden")}})}const e=document.getElementById("newLayoutName"),n=`Layout ${this.layouts.length+1}`;e.value=n,h.deviceModel||h.settings&&h.settings.device_model;const o=D?Object.keys(D)[0]:"reterminal_e1001";document.getElementById("newLayoutDeviceType").value=o,document.getElementById("newLayoutModal").classList.remove("hidden"),setTimeout(()=>e.focus(),100)}handleCreateLayoutConfirm(){const e=document.getElementById("newLayoutName").value.trim(),i=document.getElementById("newLayoutDeviceType").value;if(!e){alert("Please enter a layout name.");return}document.getElementById("newLayoutModal").classList.add("hidden"),this.createLayout(e,i)}generateDeviceOptions(){if(D){const e=pt||[];return Object.entries(D).map(([i,n])=>{let o=n.name;return e.includes(i)||(o+=" (untested)"),`<option value="${i}">${o}</option>`}).join("")}return'<option value="reterminal_e1001">reTerminal E1001</option>'}async createLayout(e,i="reterminal_e1001"){if(typeof N!="function"||!N())return;let n=e.toLowerCase().replace(/\s+/g,"_").replace(/[^a-z0-9_]/g,"");n||(n="layout");const o=n+"_"+Date.now();this.setStatus("Creating layout...","info");let s=!1;try{const r=await fetch(`${$}/layouts`,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify({id:o,name:e,device_type:i,device_model:i})});if(!r.ok){const a=await r.json().catch(()=>({}));throw new Error(a.error||`Create failed: ${r.status}`)}s=!0}catch(r){if(v.warn("[LayoutManager] Network error during create, verifying if operation completed..."),await new Promise(l=>setTimeout(l,1500)),await this.loadLayouts(),this.layouts.some(l=>l.id===o))v.log("[LayoutManager] Layout was successfully created (verified after refresh)"),s=!0;else{v.error("[LayoutManager] Error creating layout:",r),this.setStatus("Failed to create layout","error");return}}if(s){this.setStatus(`Created: ${e}`,"success"),await this.loadLayouts();const r=D[i],a=r&&r.features&&r.features.epaper,l=r&&r.features&&r.features.lvgl,c=a&&!l?"direct":"lvgl";v.log(`[LayoutManager] New layout ${o} detected device type. isEpaper=${a}, hasLvgl=${l}. Setting initial renderingMode to: ${c}`),h&&(h.setPages([{id:"page_0",name:"Page 1",widgets:[]}]),h.setCurrentPageIndex(0),h.updateSettings({renderingMode:c,device_model:i}),v.log("[LayoutManager] Cleared state and set initial settings before loading new layout")),await this.loadLayout(o),h&&(h.setDeviceModel(i),window.currentDeviceModel=i,typeof P=="function"&&typeof I<"u"&&P(I.STATE_CHANGED),v.log(`[LayoutManager] Created layout '${o}' with device_model: ${i}, pages: ${h.pages?.length}, widgets: ${h.getCurrentPage()?.widgets?.length||0}`))}}async handleFileImport(e){const i=e.target.files[0];if(i){try{const n=await i.text(),o=JSON.parse(n);if(!o.pages&&!o.device_id){this.setStatus("Invalid layout file","error");return}await this.importLayout(o)}catch(n){v.error("[LayoutManager] Error importing file:",n),this.setStatus("Failed to import file: "+n.message,"error")}e.target.value=""}}async importLayout(e,i=!1){if(!(typeof N!="function"||!N()))try{const n=`${$}/import${i?"?overwrite=true":""}`,o=await fetch(n,{method:"POST",headers:se(),body:JSON.stringify(e)}),s=await o.json();if(!o.ok){if(s.error==="layout_exists"){if(confirm(`A layout with ID "${s.existing_id}" already exists.

Do you want to overwrite it?`)){await this.importLayout(e,!0);return}return}throw new Error(s.error||`Import failed: ${o.status}`)}this.setStatus(`Imported: ${s.name||s.id}`,"success"),await this.loadLayouts()}catch(n){v.error("[LayoutManager] Error importing layout:",n),this.setStatus("Failed to import layout","error")}}}window.layoutManager=new cd;function Yt(){const t=document.getElementById("resizer-left"),e=document.getElementById("resizer-right"),i=document.querySelector(".sidebar"),n=document.querySelector(".right-panel");if(document.querySelector(".app-content"),!t||!e||!i||!n){v.warn("[Splitters] Layout elements not found, retrying..."),setTimeout(Yt,500);return}v.log("[Splitters] Initializing draggable panels...");function o(a,l,c){let d,p;a.addEventListener("mousedown",function(g){c==="vertical"?(d=g.clientX,p=l.offsetWidth,document.body.style.cursor="col-resize"):(d=g.clientY,p=l.offsetHeight,document.body.style.cursor="row-resize"),a.classList.add("dragging"),document.body.style.userSelect="none";function u(y){let m;if(c==="vertical"){m=y.clientX-d,a.id==="resizer-right"&&(m=-m);const _=p+m,b=parseInt(getComputedStyle(l).minWidth)||100,S=parseInt(getComputedStyle(l).maxWidth)||800;_>=b&&_<=S&&(l.style.width=_+"px")}else{m=d-y.clientY;const _=p+m,b=parseInt(getComputedStyle(l).minHeight)||50,S=parseInt(getComputedStyle(l).maxHeight)||800;_>=b&&_<=S&&(l.style.height=_+"px")}window.dispatchEvent&&window.dispatchEvent(new Event("resize"))}function f(){a.classList.remove("dragging"),document.body.style.cursor="default",document.body.style.userSelect="",window.removeEventListener("mousemove",u),window.removeEventListener("mouseup",f)}window.addEventListener("mousemove",u),window.addEventListener("mouseup",f)})}const s=document.getElementById("resizer-bottom"),r=document.querySelector(".code-panel");o(t,i,"vertical"),o(e,n,"vertical"),s&&r&&o(s,r,"horizontal")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Yt):Yt();class pd{constructor(){this.active=!1,this.element=null,this.targetWidgetId=null,this.position={x:0,y:0},this.init()}init(){this.element||(this.element=document.createElement("div"),this.element.className="radial-menu",this.element.innerHTML=`
                <div class="radial-menu-center"></div>
                <div class="radial-menu-items"></div>
            `,document.body.appendChild(this.element),window.addEventListener("mousedown",e=>{this.active&&!this.element.contains(e.target)&&this.hide()},!0),window.addEventListener("touchstart",e=>{this.active&&!this.element.contains(e.target)&&this.hide()},!0),window.addEventListener("keydown",e=>{e.key==="Escape"&&this.active&&this.hide()}))}show(e,i,n=null){this.targetWidgetId=n,this.position={x:e,y:i},this.active=!0,this.element.style.left=`${e}px`,this.element.style.top=`${i}px`,this.renderItems(),requestAnimationFrame(()=>{this.element.classList.add("active")})}hide(){this.active=!1,this.element.classList.remove("active"),this.targetWidgetId=null}renderItems(){const e=this.element.querySelector(".radial-menu-items");e.innerHTML="";const i=this.getAvailableActions(),n=2*Math.PI/i.length,o=70;i.forEach((s,r)=>{const a=r*n-Math.PI/2,l=Math.cos(a)*o,c=Math.sin(a)*o,d=document.createElement("div");d.className=`radial-menu-item ${s.className||""}`,d.style.setProperty("--x",`${l}px`),d.style.setProperty("--y",`${c}px`),d.title=s.label,d.innerHTML=`<i class="mdi ${s.icon}"></i>`,d.addEventListener("click",p=>{p.stopPropagation(),s.callback(),this.hide()}),e.appendChild(d)})}getAvailableActions(){const e=h,i=this.targetWidgetId?e.getWidgetById(this.targetWidgetId):null,n=[];if(i){n.push({label:"Copy",icon:"mdi-content-copy",callback:()=>{e.selectWidget(this.targetWidgetId,!1),e.copyWidget()}});const o=e.selectedWidgetIds,s=o.some(l=>{const c=e.getWidgetById(l);return c&&(c.type==="group"||c.parentId)});o.length>1&&!s&&n.push({label:"Group",icon:"mdi-group",callback:()=>e.groupSelection()}),(i.type==="group"||i.parentId)&&n.push({label:"Ungroup",icon:"mdi-ungroup",callback:()=>e.ungroupSelection(this.targetWidgetId)}),n.push({label:"Duplicate",icon:"mdi-content-duplicate",callback:()=>{e.copyWidget(),e.pasteWidget()}}),n.push({label:i.locked?"Unlock":"Lock",icon:i.locked?"mdi-lock-open-outline":"mdi-lock-outline",callback:()=>{e.updateWidget(this.targetWidgetId,{locked:!i.locked})}}),n.push({label:"Snap",icon:"mdi-magnet",callback:()=>{sl(this.targetWidgetId)}}),n.push({label:"Delete",icon:"mdi-delete-outline",className:"danger",callback:()=>{e.deleteWidget(this.targetWidgetId)}});const r=e.getCurrentPage(),a=r?.widgets.findIndex(l=>l.id===this.targetWidgetId);a!==-1&&(n.push({label:"Bring to Front",icon:"mdi-arrange-bring-to-front",callback:()=>{e.reorderWidget(e.currentPageIndex,a,r.widgets.length-1)}}),n.push({label:"Send to Back",icon:"mdi-arrange-send-to-back",callback:()=>{e.reorderWidget(e.currentPageIndex,a,0)}}))}else n.push({label:"Paste",icon:"mdi-content-paste",callback:()=>{e.pasteWidget()}});return n}}window.RadialMenu=new pd;class ud{constructor(){this.modal=document.getElementById("aiPromptModal"),this.closeBtn=document.getElementById("aiPromptClose"),this.submitBtn=document.getElementById("aiPromptSubmit"),this.applyBtn=document.getElementById("aiPromptApply"),this.input=document.getElementById("aiPromptInput"),this.status=document.getElementById("aiPromptStatus"),this.diffPanel=document.getElementById("aiPreviewDiff"),this.diffContent=document.getElementById("aiDiffContent"),this.generatedWidgets=null}init(){this.modal&&(this.closeBtn.onclick=()=>this.close(),this.submitBtn.onclick=()=>this.handleSubmit(),this.applyBtn.onclick=()=>this.handleApply(),window.addEventListener("click",e=>{e.target===this.modal&&this.close()}))}open(){if(!this.modal)return;this.modal.classList.remove("hidden"),this.modal.style.display="flex",this.input.focus();const e=h.settings.ai_provider||"gemini",i=h.settings[`ai_api_key_${e}`],n=document.getElementById("aiConfigWarning");n&&(n.style.display=i?"none":"block"),this.status.textContent="",this.status.style.color="",this.diffPanel.style.display="none",this.applyBtn.style.display="none",this.generatedWidgets=null}close(){this.modal&&(this.modal.classList.add("hidden"),this.modal.style.display="none")}async handleSubmit(){const e=this.input.value.trim();if(e){this.setLoading(!0),this.status.textContent="AI is thinking...",this.status.style.color="var(--accent)",this.diffPanel.style.display="none",this.applyBtn.style.display="none";try{const i=h.getCurrentPage(),n=h.deviceModel,o=D?.[n];let s="monochrome";o&&(o.features?.lcd?s="color_lcd":o.name?.includes("6-Color")||o.name?.includes("Color")?s="color_epaper":s="monochrome");const r={canvas:h.getCanvasDimensions(),current_page:i.id,widgets:i.widgets,selected_widget_id:h.selectedWidgetId,display_type:s},a=await oe.processPrompt(e,r);if(a&&Array.isArray(a))this.generatedWidgets=a,this.showDiffPreview(i.widgets,a),this.status.textContent="Successfully generated changes!",this.status.style.color="var(--success)",this.applyBtn.style.display="inline-block";else throw new Error("Invalid response format from AI")}catch(i){v.error(i),this.status.textContent="Error: "+i.message,this.status.style.color="var(--danger)"}finally{this.setLoading(!1)}}}handleApply(){if(this.generatedWidgets)try{const e=h.getCurrentPage();e.widgets=this.generatedWidgets,h.project.rebuildWidgetsIndex(),P(I.STATE_CHANGED),A("AI changes applied!","success"),this.close()}catch(e){v.error(e),A("Failed to apply changes: "+e.message,"error")}}showDiffPreview(e,i){this.diffPanel.style.display="block";let n=`Widgets: ${e.length} ➔ ${i.length}

`;const o=e.map(c=>c.id),s=i.map(c=>c.id),r=i.filter(c=>!o.includes(c.id)),a=e.filter(c=>!s.includes(c.id)),l=i.filter(c=>{const d=e.find(p=>p.id===c.id);return d&&JSON.stringify(d)!==JSON.stringify(c)});r.length>0&&(n+=`[ADDED]
${r.map(c=>`+ ${c.type} (${c.id})`).join(`
`)}

`),a.length>0&&(n+=`[REMOVED]
${a.map(c=>`- ${c.type} (${c.id})`).join(`
`)}

`),l.length>0&&(n+=`[MODIFIED]
${l.map(c=>`~ ${c.type} (${c.id})`).join(`
`)}`),r.length===0&&a.length===0&&l.length===0&&(n+="(No changes detected)"),this.diffContent.textContent=n}setLoading(e){this.submitBtn.disabled=e,this.submitBtn.textContent=e?"Processing...":"Generate",this.input.disabled=e}}window.llmPrompt=new ud;function hd(){const t=h.getPagesPayload(),e=JSON.stringify(t,null,2),i=new Blob([e],{type:"application/json"}),n=URL.createObjectURL(i),o=document.createElement("a");o.href=n,o.download=`reterminal_layout_${Date.now()}.json`,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(n)}function gd(t){if(!t)return;const e=new FileReader;e.onload=i=>{try{const n=i.target.result,o=JSON.parse(n);we(o)}catch(n){v.error("Failed to parse layout file:",n),alert("Error parsing layout file. Please ensure it is a valid JSON file.")}},e.readAsText(t)}function fd(t){const e=t.target.files[0];gd(e),t.target.value=""}class md{constructor(){this.isOpen=!1,this.selectedIndex=0,this.filteredWidgets=[],this.allWidgets=[],this.modal=null,this.input=null,this.resultsContainer=null,this.init()}init(){this.createModal(),this.bindEvents()}discoverWidgets(){this.allWidgets=[];const e=document.querySelectorAll(".widget-category .item[data-widget-type]");if(e.length===0){v.warn("[QuickSearch] No widgets found in palette");return}e.forEach(i=>{const n=i.getAttribute("data-widget-type"),o=i.querySelector(".label"),s=o?o.textContent.trim():n,r=i.closest(".widget-category"),a=r?r.querySelector(".category-name"):null,l=a?a.textContent.trim():"Widgets";this.allWidgets.push({type:n,label:s,category:l,searchText:`${s} ${n} ${l}`.toLowerCase()})}),v.log(`[QuickSearch] Discovered ${this.allWidgets.length} widgets`)}createModal(){this.modal=document.createElement("div"),this.modal.id="quick-search-modal",this.modal.className="quick-search-modal hidden",this.modal.innerHTML=`
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
        `,document.body.appendChild(this.modal),this.input=this.modal.querySelector(".quick-search-input"),this.resultsContainer=this.modal.querySelector(".quick-search-results")}bindEvents(){this.modal.querySelector(".quick-search-backdrop").addEventListener("click",()=>this.close()),this.input.addEventListener("input",()=>this.handleSearch()),this.input.addEventListener("keydown",e=>this.handleKeyDown(e))}open(){this.discoverWidgets(),this.isOpen=!0,this.modal.classList.remove("hidden"),this.input.value="",this.selectedIndex=0,this.handleSearch(),setTimeout(()=>this.input.focus(),50)}close(){this.isOpen=!1,this.modal.classList.add("hidden"),this.input.blur()}handleSearch(){const e=this.input.value.toLowerCase().trim();e===""?this.filteredWidgets=[...this.allWidgets]:this.filteredWidgets=this.allWidgets.filter(i=>i.searchText.includes(e)),this.selectedIndex=0,this.renderResults()}renderResults(){if(this.filteredWidgets.length===0){this.resultsContainer.innerHTML=`
                <div class="quick-search-empty">No widgets found</div>
            `;return}this.resultsContainer.innerHTML=this.filteredWidgets.map((i,n)=>`
            <div class="quick-search-item ${n===this.selectedIndex?"selected":""}" 
                 data-index="${n}" data-type="${i.type}">
                <span class="quick-search-item-label">${i.label}</span>
                <span class="quick-search-item-category">${i.category}</span>
            </div>
        `).join(""),this.resultsContainer.querySelectorAll(".quick-search-item").forEach(i=>{i.addEventListener("click",()=>{const n=parseInt(i.getAttribute("data-index"),10);this.selectedIndex=n,this.addSelectedWidget()})});const e=this.resultsContainer.querySelector(".quick-search-item.selected");e&&e.scrollIntoView({block:"nearest"})}handleKeyDown(e){switch(e.key){case"ArrowDown":e.preventDefault(),this.selectedIndex=Math.min(this.selectedIndex+1,this.filteredWidgets.length-1),this.renderResults();break;case"ArrowUp":e.preventDefault(),this.selectedIndex=Math.max(this.selectedIndex-1,0),this.renderResults();break;case"Enter":e.preventDefault(),this.addSelectedWidget();break;case"Escape":e.preventDefault(),this.close();break}}addSelectedWidget(){if(this.filteredWidgets.length===0)return;const e=this.filteredWidgets[this.selectedIndex];if(e)try{const i=ee.createWidget(e.type);h.addWidget(i),v.log(`[QuickSearch] Added widget: ${e.label}`),this.close()}catch(i){v.error("[QuickSearch] Error adding widget:",i),A("Failed to add widget: "+i.message,"error")}}}class yd{constructor(){this.listContainer=null,this.header=null,this.panel=null,this.draggedIndex=null,this.render=this.render.bind(this),this.highlightSelected=this.highlightSelected.bind(this)}init(){if(this.listContainer=document.getElementById("hierarchyList"),this.header=document.getElementById("hierarchyHeader"),this.panel=document.getElementById("hierarchyPanel"),!this.listContainer||!this.header||!this.panel){v.error("[HierarchyView] Required DOM elements not found");return}this.controlsContainer=document.createElement("div"),this.controlsContainer.id="hierarchyControls",this.controlsContainer.className="hierarchy-controls",this.controlsContainer.style.padding="8px 8px",this.controlsContainer.style.borderTop="1px solid var(--border-subtle)",this.panel.appendChild(this.controlsContainer),this.bindEvents(),this.render(),this.renderHeaderActions(),v.log("[HierarchyView] Initialized")}renderHeaderActions(){if(!this.header)return;let e=this.header.querySelector(".hierarchy-header-toggles");if(!e){e=document.createElement("div"),e.className="hierarchy-header-toggles";const i=this.header.querySelector(".chevron");this.header.insertBefore(e,i);const n=this.createHeaderToggle("mdi-lock-outline","Toggle All Locks",()=>{const s=h.getCurrentPage()?.widgets||[],r=s.every(a=>a.locked);s.forEach(a=>h.updateWidget(a.id,{locked:!r}))}),o=this.createHeaderToggle("mdi-eye-outline","Toggle All Visibility",()=>{const s=h.getCurrentPage()?.widgets||[],r=s.every(a=>a.hidden);s.forEach(a=>h.updateWidget(a.id,{hidden:!r}))});e.appendChild(n),e.appendChild(o)}}createHeaderToggle(e,i,n){const o=document.createElement("div");return o.className="h-toggle",o.title=i,o.innerHTML=`<i class="mdi ${e}"></i>`,o.onclick=s=>{s.stopPropagation(),n()},o}bindEvents(){this.header.addEventListener("click",()=>this.toggleCollapse()),F(I.STATE_CHANGED,this.render),F(I.PAGE_CHANGED,this.render),F(I.SELECTION_CHANGED,this.highlightSelected)}toggleCollapse(){const e=this.panel.classList.toggle("hidden"),i=this.header.querySelector(".chevron");i&&(i.style.transform=e?"rotate(-90deg)":"rotate(0deg)")}highlightSelected(){const e=h.selectedWidgetIds||[];this.listContainer.querySelectorAll(".hierarchy-item").forEach(n=>{e.includes(n.dataset.id)?n.classList.add("selected"):n.classList.remove("selected")}),this.renderControls()}render(){const e=h.getCurrentPage();if(!e)return;if(this.listContainer.innerHTML="",!e.widgets||e.widgets.length===0){this.listContainer.innerHTML='<div style="font-size: 10px; color: var(--muted); text-align: center; padding: 12px;">No widgets on this page</div>',this.controlsContainer.style.display="none";return}const i=e.widgets.filter(s=>!s.parentId).reverse(),n=new Map;e.widgets.forEach(s=>{s.parentId&&(n.has(s.parentId)||n.set(s.parentId,[]),n.get(s.parentId).push(s))});const o=(s,r=0)=>{const a=e.widgets.indexOf(s),l=this.createItem(s,a,r);this.listContainer.appendChild(l);const c=n.get(s.id);c&&s.expanded!==!1&&[...c].reverse().forEach(d=>o(d,r+1))};i.forEach(s=>o(s)),this.highlightSelected(),this.renderControls()}createItem(e,i,n=0){const o=document.createElement("div");o.className=`hierarchy-item ${e.hidden?"hidden-widget":""}`,n>0&&o.classList.add("child-item"),(h.selectedWidgetIds||[]).includes(e.id)&&o.classList.add("selected"),o.dataset.id=e.id,o.dataset.index=i,o.draggable=!e.locked,e.locked&&o.classList.add("locked"),o.style.paddingLeft=12+n*20+"px";const r=this.getWidgetIcon(e.type),a=this.getWidgetLabel(e),l=e.type==="group";return o.innerHTML=`
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
        `,l&&o.querySelector(".hierarchy-group-toggle").addEventListener("click",d=>{h.updateWidget(e.id,{expanded:e.expanded===!1}),d.stopPropagation()}),o.querySelector(".hierarchy-item-label").addEventListener("click",d=>{if(h.selectedWidgetIds.includes(e.id)){const p=prompt("Rename:",a);p!==null&&p!==""&&p!==a&&h.updateWidget(e.id,{title:p}),d.stopPropagation();return}}),o.addEventListener("click",d=>{const p=d.ctrlKey||d.shiftKey;h.selectWidget(e.id,p),d.stopPropagation()}),o.querySelector(".toggle-lock").addEventListener("click",d=>{h.updateWidget(e.id,{locked:!e.locked}),d.stopPropagation()}),o.querySelector(".toggle-visibility").addEventListener("click",d=>{h.updateWidget(e.id,{hidden:!e.hidden}),d.stopPropagation()}),o.querySelector(".delete-widget").addEventListener("click",d=>{confirm(`Delete widget "${a}"?`)&&h.deleteWidget(e.id),d.stopPropagation()}),o.addEventListener("dragstart",d=>{this.draggedIndex=i,o.classList.add("dragging"),d.dataTransfer.setData("application/widget-id",e.id),d.dataTransfer.effectAllowed="move"}),o.addEventListener("dragend",()=>{o.classList.remove("dragging"),this.draggedIndex=null,this.listContainer.querySelectorAll(".hierarchy-item").forEach(p=>p.classList.remove("drag-over"))}),o.addEventListener("dragover",d=>{d.preventDefault(),d.dataTransfer.dropEffect="move",o.classList.add("drag-over")}),o.addEventListener("dragleave",()=>{o.classList.remove("drag-over")}),o.addEventListener("drop",d=>{d.preventDefault();const p=d.dataTransfer.getData("application/widget-id"),g=o.dataset.id;if(p===g)return;const u=h.getWidgetById(g);if(!u)return;u.type==="group"?h.updateWidget(p,{parentId:g,expanded:!0}):h.updateWidget(p,{parentId:u.parentId||null});const f=parseInt(o.dataset.index);this.draggedIndex!==null&&h.reorderWidget(h.currentPageIndex,this.draggedIndex,f)}),o}renderControls(){const e=h.getSelectedWidgets();if(e.length===0){this.controlsContainer.style.display="none";return}this.controlsContainer.style.display="block",this.controlsContainer.innerHTML="";const i=l=>{const c=document.createElement("div");c.style.fontSize="10px",c.style.color="var(--muted)",c.style.marginBottom="6px",c.style.fontWeight="600",c.style.marginTop="8px",c.textContent=l,this.controlsContainer.appendChild(c)},n=()=>{const l=document.createElement("div");return l.style.display="flex",l.style.gap="4px",this.controlsContainer.appendChild(l),l};i("GROUPING");const o=n(),s=e.some(l=>l.type==="group"||l.parentId),r=document.createElement("button");r.className="btn btn-secondary",r.innerHTML='<i class="mdi mdi-group" style="margin-right:4px"></i>Group',r.style.flex="1",r.style.fontSize="10px",r.disabled=e.length<2||s,r.onclick=()=>h.groupSelection(),o.appendChild(r);const a=document.createElement("button");if(a.className="btn btn-secondary",a.innerHTML='<i class="mdi mdi-ungroup" style="margin-right:4px"></i>Ungroup',a.style.flex="1",a.style.fontSize="10px",a.disabled=!s,a.onclick=()=>h.ungroupSelection(),o.appendChild(a),e.length===1){const l=e[0];i("LAYER ORDER");const c=n();[{label:"Front",icon:"mdi-arrange-bring-to-front",action:()=>this.moveToFront(l)},{label:"Back",icon:"mdi-arrange-send-to-back",action:()=>this.moveToBack(l)},{label:"Up",icon:"mdi-arrow-up",action:()=>this.moveUp(l)},{label:"Down",icon:"mdi-arrow-down",action:()=>this.moveDown(l)}].forEach(p=>{const g=document.createElement("button");g.className="btn btn-secondary",g.innerHTML=`<i class="mdi ${p.icon}"></i>`,g.title=p.label,g.style.flex="1",g.style.fontSize="12px",g.style.padding="4px",g.onclick=()=>p.action(),c.appendChild(g)})}}moveToFront(e){const i=h.getCurrentPage(),n=i.widgets.findIndex(o=>o.id===e.id);n>-1&&n<i.widgets.length-1&&(i.widgets.splice(n,1),i.widgets.push(e),h.setPages(h.pages))}moveToBack(e){const i=h.getCurrentPage(),n=i.widgets.findIndex(o=>o.id===e.id);n>0&&(i.widgets.splice(n,1),i.widgets.unshift(e),h.setPages(h.pages))}moveUp(e){const i=h.getCurrentPage(),n=i.widgets.findIndex(o=>o.id===e.id);n>-1&&n<i.widgets.length-1&&([i.widgets[n],i.widgets[n+1]]=[i.widgets[n+1],i.widgets[n]],h.setPages(h.pages))}moveDown(e){const i=h.getCurrentPage(),n=i.widgets.findIndex(o=>o.id===e.id);n>0&&([i.widgets[n],i.widgets[n-1]]=[i.widgets[n-1],i.widgets[n]],h.setPages(h.pages))}getWidgetLabel(e){let i=e.props?.name||e.props?.title||e.props?.text||e.title;if(!i||i===""){const n=H.get(e.type);i=n?n.name:e.type}if(i===e.type||H.get(e.type)&&i===H.get(e.type).name){const n=e.id.split("_").pop();i=`${i} (${n})`}return i}getWidgetIcon(e){return`<i class="mdi ${{text:"mdi-format-text",sensor_text:"mdi-numeric",icon:"mdi-emoticon-outline",image:"mdi-image",qr_code:"mdi-qrcode",line:"mdi-vector-line",lvgl_line:"mdi-vector-line",rect:"mdi-square-outline",shape_rect:"mdi-square-outline",arc:"mdi-circle-outline",shape_circle:"mdi-circle-outline",bar:"mdi-chart-gantt",button:"mdi-gesture-tap-button",checkbox:"mdi-checkbox-marked-outline",calendar:"mdi-calendar",weather_forecast:"mdi-weather-partly-cloudy",datetime:"mdi-clock-outline",graph:"mdi-chart-timeline-variant",touch_area:"mdi-fingerprint",group:"mdi-folder-outline"}[e]||"mdi-widgets-outline"}"></i>`}}class _d{constructor(){try{v.log("[App] Constructor started"),this.sidebar=new Xa,v.log("[App] Sidebar created"),this.canvas=new bl,v.log("[App] Canvas created"),this.propertiesPanel=new Ol,v.log("[App] PropertiesPanel created"),this.hierarchyView=new yd,v.log("[App] HierarchyView created"),this.deviceSettings=new Nl,v.log("[App] DeviceSettings created"),this.editorSettings=new Wl,v.log("[App] EditorSettings created"),this.pageSettings=new Fl,v.log("[App] PageSettings created"),this.keyboardHandler=new Ro,v.log("[App] KeyboardHandler created"),this.llmPrompt=window.llmPrompt,v.log("[App] LLMPrompt linked"),this.quickSearch=new md,window.QuickSearch=this.quickSearch,v.log("[App] QuickSearch initialized"),this.adapter=this.createAdapter(),v.log("[App] Adapter initialized:",this.adapter.constructor.name),this.snippetManager=new zl(this.adapter),v.log("[App] SnippetManager initialized"),window.layoutManager&&(this.layoutManager=window.layoutManager,v.log("[App] LayoutManager linked"))}catch(e){v.error("[App] Critical Error in Constructor:",e)}}async init(){v.log("[App] Initializing ESPHome Designer Designer..."),v.log("[App] AppState:",h),this.isInitializing=!0,await Go("widgetPalette"),this.sidebar.init(),this.propertiesPanel.init(),this.hierarchyView.init(),this.deviceSettings.init(),this.editorSettings.init(),this.quickSearch.discoverWidgets(),await ut();try{localStorage.getItem("reterminal-editor-theme")==="light"?(h.updateSettings({editor_light_mode:!0}),this.editorSettings.applyEditorTheme(!0)):this.editorSettings.applyEditorTheme(!1)}catch(e){v.log("Could not load theme preference:",e)}this.pageSettings.init(),this.llmPrompt&&this.llmPrompt.init(),this.layoutManager&&this.layoutManager.init(),this.setupAutoSave(),this.bindGlobalButtons();try{N()?(v.log("HA Backend detected attempt. Loading layout..."),await Pa(),await Ce()):(v.log("Running in standalone/offline mode."),this.loadFromLocalStorage()),this.refreshAdapter()}catch(e){v.error("[App] Failed to load from backend, falling back to local storage:",e),this.loadFromLocalStorage(),this.refreshAdapter()}h&&typeof h.updateLayoutIndicator=="function"&&h.updateLayoutIndicator(),setTimeout(()=>{this.canvas&&(v.log("[App] Forcing initial canvas centering..."),this.canvas.focusPage(h.currentPageIndex,!1))},100),v.log("Initialization complete."),this.isInitializing=!1}bindGlobalButtons(){const e=document.getElementById("saveLayoutBtn");e&&e.addEventListener("click",()=>{N()?pe().then(()=>A("Layout saved to Home Assistant","success")).catch(a=>A(`Save failed: ${a.message}`,"error")):hd()});const i=document.getElementById("loadLayoutBtn");i&&i.addEventListener("change",fd);const n=document.getElementById("importLayoutBtn");n&&i&&n.addEventListener("click",()=>{i.click()});const o=document.getElementById("deviceSettingsBtn");o?(v.log("Device Settings button found, binding click listener."),o.addEventListener("click",()=>{v.log("Device Settings button clicked."),this.deviceSettings?this.deviceSettings.open():v.error("DeviceSettings instance not found on App.")})):v.error("Device Settings button NOT found in DOM.");const s=document.getElementById("editorSettingsBtn");s&&s.addEventListener("click",()=>{this.editorSettings.open()});const r=document.getElementById("aiPromptBtn");r&&r.addEventListener("click",()=>{this.llmPrompt?this.llmPrompt.open():v.error("LLMPrompt instance not found.")})}loadFromLocalStorage(){try{const e=h.loadFromLocalStorage();e?(v.log("[App] Found saved layout in localStorage, loading..."),we(e)):v.log("[App] No saved layout in localStorage, starting fresh.")}catch(e){v.error("[App] Error loading from local storage:",e)}}setupAutoSave(){let e=null;const i=2e3;T(async()=>{const{on:n,EVENTS:o}=await Promise.resolve().then(()=>Xo);return{on:n,EVENTS:o}},void 0,import.meta.url).then(({on:n,EVENTS:o})=>{n(o.STATE_CHANGED,()=>{this.refreshAdapter(),e&&clearTimeout(e),e=setTimeout(()=>{N()?(v.log("[AutoSave] Triggering background save to HA..."),pe().catch(()=>{})):(v.log("[AutoSave] Saving to local storage..."),h.saveToLocalStorage())},i)})})}createAdapter(){const e=h.settings.renderingMode||"direct";let i;return e==="oepl"?i=new Ho:e==="opendisplay"?i=new No:i=new dd,i.mode=e,i}refreshAdapter(){const e=h.settings.renderingMode||"direct";this.adapter&&this.adapter.mode===e||(v.log(`[App] Refreshing adapter: ${this.adapter?.mode} -> ${e}`),this.adapter=this.createAdapter(),this.snippetManager&&(this.snippetManager.adapter=this.adapter,this.snippetManager.updateSnippetBox()))}}document.addEventListener("DOMContentLoaded",async()=>{const t=new _d;window.app=t,window.openDeviceSettings=()=>t.deviceSettings?.open(),window.openEditorSettingsModal=e=>t.editorSettings?.open(e),window.pageSettings=t.pageSettings,window.ESPHomeDesigner=window.ESPHomeDesigner||{},window.ESPHomeDesigner.app=t,window.ESPHomeDesigner.ui={sidebar:t.sidebar,canvas:t.canvas,properties:t.propertiesPanel};try{await t.init()}catch(e){v.error("[App] Failed to initialize:",e)}});export{h as A,I as E,it as a,Ba as b,ot as c,P as e,bd as f,vd as g,Do as i};
