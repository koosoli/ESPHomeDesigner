const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./plugin-CP3SjZnj.js","./text_utils-DPZlj6Oi.js","./plugin-Bvmi5kcV.js","./template_converter-Dp-G9w6d.js","./plugin-DRdbYd23.js","./plugin-BFzoUmss.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function i(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(t){if(t.ep)return;t.ep=!0;const s=i(t);fetch(t.href,s)}})();const Ho=`<header class="main-header" role="banner">
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
    </aside>`,Go=`      <div class="code-panel">
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
      </div>`,Wo=`    <aside class="right-panel" role="complementary" aria-label="Widget Properties">
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
    </aside>`,$o=`  <!-- Modals -->
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

`;function $e(n,e){const i=document.getElementById(n);i?i.outerHTML=e:console.warn(`[UI Injection] Placeholder #${n} not found in index.html.`)}function zo(){console.log("[UI Injection] Loading modular UI components..."),$e("header-placeholder",Ho),$e("sidebar-placeholder",Fo),$e("code-panel-placeholder",Go),$e("properties-panel-placeholder",Wo),$e("modals-placeholder",$o),console.log("[UI Injection] Construction complete.")}zo();const Uo="modulepreload",jo=function(n,e){return new URL(n,e).href},mn={},T=function(e,i,o){let t=Promise.resolve();if(i&&i.length>0){const r=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),l=a?.nonce||a?.getAttribute("nonce");t=Promise.allSettled(i.map(c=>{if(c=jo(c,o),c in mn)return;mn[c]=!0;const d=c.endsWith(".css"),p=d?'[rel="stylesheet"]':"";if(!!o)for(let m=r.length-1;m>=0;m--){const y=r[m];if(y.href===c&&(!d||y.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${p}`))return;const u=document.createElement("link");if(u.rel=d?"stylesheet":Uo,d||(u.as="script"),u.crossOrigin="",u.href=c,l&&u.setAttribute("nonce",l),document.head.appendChild(u),d)return new Promise((m,y)=>{u.addEventListener("load",m),u.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${c}`)))})}))}function s(r){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=r,window.dispatchEvent(a),!a.defaultPrevented)throw r}return t.then(r=>{for(const a of r||[])a.status==="rejected"&&s(a.reason);return e().catch(s)})},ft=new EventTarget,C={STATE_CHANGED:"state-changed",SELECTION_CHANGED:"selection-changed",PAGE_CHANGED:"page-changed",HISTORY_CHANGED:"history-changed",SETTINGS_CHANGED:"settings-changed",LAYOUT_IMPORTED:"layout-imported",ENTITIES_LOADED:"entities-loaded",ZOOM_CHANGED:"zoom-changed"};function L(n,e={}){ft.dispatchEvent(new CustomEvent(n,{detail:e}))}function q(n,e){ft.addEventListener(n,i=>e(i.detail))}function li(n,e){ft.removeEventListener(n,e)}window.EVENTS=C;window.emit=L;window.on=q;window.off=li;const Yo=Object.freeze(Object.defineProperty({__proto__:null,EVENTS:C,EventBus:ft,emit:L,off:li,on:q},Symbol.toStringTag,{value:"Module"})),Vt={WHITE:"#FFFFFF",BLACK:"#000000",GRAY:"#808080",GREY:"#808080",RED:"#FF0000",GREEN:"#00FF00",BLUE:"#0000FF",YELLOW:"#FFFF00",ORANGE:"#FFA500"},di={GRID_SIZE:10,SNAP_THRESHOLD:10,SIDEBAR_WIDTH:300,PROPERTIES_WIDTH:350},ci={X:40,Y:40,WIDTH:200,HEIGHT:60},qt={TOP_LEFT:"TOP_LEFT",TOP_CENTER:"TOP_CENTER",TOP_RIGHT:"TOP_RIGHT",CENTER_LEFT:"CENTER_LEFT",CENTER:"CENTER",CENTER_RIGHT:"CENTER_RIGHT",BOTTOM_LEFT:"BOTTOM_LEFT",BOTTOM_CENTER:"BOTTOM_CENTER",BOTTOM_RIGHT:"BOTTOM_RIGHT"},Xt={LANDSCAPE:"landscape",PORTRAIT:"portrait"},Kt={snapEnabled:!0,showGrid:!0,showDebugGrid:!1,showRulers:!1,gridOpacity:8,editor_light_mode:!1,aiProvider:"gemini",aiModelGemini:"gemini-1.5-flash",aiModelOpenAI:"gpt-4o",aiModelOpenRouter:"",aiModelFilter:"",extendedLatinGlyphs:!1,autoCycleEnabled:!1,autoCycleIntervalS:30,refreshInterval:600,manualRefreshOnly:!1,darkMode:!1,invertedColors:!1,lcdEcoStrategy:"backlight_off",dimTimeout:10,sleepEnabled:!1,sleepStartHour:0,sleepEndHour:5,deepSleepEnabled:!1,deepSleepInterval:600,dailyRefreshEnabled:!1,dailyRefreshTime:"08:00",noRefreshStartHour:null,noRefreshEndHour:null,renderingMode:"direct",oeplEntityId:"",oeplDither:2,opendisplayEntityId:"",opendisplayDither:2,opendisplayTtl:60,glyphsets:["GF_Latin_Kernel"]},Jt=50,pi={RSS:300,ENTITIES:60},ui=5e3,_e=10,hi=10,Zt={white:"COLOR_WHITE",black:"COLOR_BLACK",gray:"Color(160, 160, 160)",grey:"Color(160, 160, 160)",red:"COLOR_RED",green:"COLOR_GREEN",blue:"COLOR_BLUE",yellow:"COLOR_YELLOW",orange:"COLOR_ORANGE"},Qt=800,en=480;window.ESPHomeDesigner=window.ESPHomeDesigner||{version:"0.9.0",constants:{COLORS:Vt,UI_DEFAULTS:di,ALIGNMENT:qt,ORIENTATIONS:Xt,DEFAULT_PREFERENCES:Kt,WIDGET_DEFAULTS:ci,HISTORY_LIMIT:Jt,CACHE_TTL:pi,ENTITY_LIMIT:ui,ESPHOME_COLOR_MAPPING:Zt,DEFAULT_CANVAS_WIDTH:Qt,DEFAULT_CANVAS_HEIGHT:en,SNAP_DISTANCE:_e,GRID_SIZE:hi}};window.COLORS=Vt;window.UI_DEFAULTS=di;window.ALIGNMENT=qt;window.ORIENTATIONS=Xt;window.DEFAULT_PREFERENCES=Kt;window.WIDGET_DEFAULTS=ci;window.HISTORY_LIMIT=Jt;window.CACHE_TTL=pi;window.ENTITY_LIMIT=ui;window.ESPHOME_COLOR_MAPPING=Zt;window.DEFAULT_CANVAS_WIDTH=Qt;window.DEFAULT_CANVAS_HEIGHT=en;window.SNAP_DISTANCE=_e;window.GRID_SIZE=hi;var Vo={};const qo=(typeof localStorage<"u"?localStorage.getItem("esphome-designer-debug"):Vo.DEBUG)==="true"||typeof window<"u"&&new URLSearchParams(window.location.search).get("debug")==="true",b={log:(...n)=>qo&&console.log("[ESPHomeDesigner]",...n),warn:(...n)=>console.warn("[ESPHomeDesigner]",...n),error:(...n)=>console.error("[ESPHomeDesigner]",...n)},Xo=`# ============================================================================
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
`,Ko=`# ============================================================================
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
`,Jo=`# ============================================================================
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
`,Zo=`# ============================================================================
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


    # __LAMBDA_PLACEHOLDER__`,Qo=`# ============================================================================
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
`,es=`# ============================================================================
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
`,ts=`# ============================================================================
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
`,ns=`# ============================================================================
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
`,is=`# ============================================================================
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
`,os=`# ============================================================================
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
`,ss=`# ============================================================================
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
`,rs=`# ============================================================================
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
`,as=`# ============================================================================
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
`,ls=`# ============================================================================
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
`,ds=`# ============================================================================
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
`;function tn(){let n=nn();if(n)return n=n.trim(),n.includes("reterminal_dashboard")&&(b.log("[Env] Migrating legacy manual URL to new domain"),n=n.replace("reterminal_dashboard","esphome_designer"),on(n)),n.endsWith("/")&&(n=n.slice(0,-1)),n&&!n.includes("/api/")&&(n+="/api/esphome_designer"),n;try{const e=window.location;return e.protocol==="file:"?null:e.hostname==="homeassistant"||e.hostname==="hassio"||e.pathname.includes("/api/")||e.pathname.includes("/local/")||e.pathname.includes("/hacsfiles/")||e.pathname.includes("/esphome-designer")?`${e.origin}/api/esphome_designer`:null}catch{return null}}function nn(){try{return localStorage.getItem("ha_manual_url")}catch{return null}}function on(n){try{if(n){let e=n.trim();e.endsWith("/")&&(e=e.slice(0,-1)),e.includes("/api/")||(e+="/api/esphome_designer"),localStorage.setItem("ha_manual_url",e)}else localStorage.removeItem("ha_manual_url")}catch(e){b.error("Failed to save HA URL:",e)}}function mt(){try{return localStorage.getItem("ha_llat_token")}catch{return null}}function gi(n){try{n?localStorage.setItem("ha_llat_token",n):localStorage.removeItem("ha_llat_token")}catch(e){b.error("Failed to save HA Token:",e)}}let V=tn();function Lt(){V=tn()}function z(){return!!V}function fi(){try{const n=window.location;return n.protocol==="file:"?!1:n.hostname==="homeassistant"||n.hostname==="hassio"||n.pathname.includes("/api/esphome_designer")||n.pathname.includes("/esphome-designer")}catch{return!1}}window.detectHaBackendBaseUrl=tn;window.getHaManualUrl=nn;window.setHaManualUrl=on;window.getHaToken=mt;window.setHaToken=gi;window.HA_API_BASE=V;window.refreshHaBaseUrl=Lt;window.hasHaBackend=z;window.isDeployedInHa=fi;/*! js-yaml 4.1.1 https://github.com/nodeca/js-yaml @license MIT */function mi(n){return typeof n>"u"||n===null}function cs(n){return typeof n=="object"&&n!==null}function ps(n){return Array.isArray(n)?n:mi(n)?[]:[n]}function us(n,e){var i,o,t,s;if(e)for(s=Object.keys(e),i=0,o=s.length;i<o;i+=1)t=s[i],n[t]=e[t];return n}function hs(n,e){var i="",o;for(o=0;o<e;o+=1)i+=n;return i}function gs(n){return n===0&&Number.NEGATIVE_INFINITY===1/n}var fs=mi,ms=cs,ys=ps,_s=hs,bs=gs,vs=us,K={isNothing:fs,isObject:ms,toArray:ys,repeat:_s,isNegativeZero:bs,extend:vs};function yi(n,e){var i="",o=n.reason||"(unknown reason)";return n.mark?(n.mark.name&&(i+='in "'+n.mark.name+'" '),i+="("+(n.mark.line+1)+":"+(n.mark.column+1)+")",!e&&n.mark.snippet&&(i+=`

`+n.mark.snippet),o+" "+i):o}function Ve(n,e){Error.call(this),this.name="YAMLException",this.reason=n,this.mark=e,this.message=yi(this,!1),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack||""}Ve.prototype=Object.create(Error.prototype);Ve.prototype.constructor=Ve;Ve.prototype.toString=function(e){return this.name+": "+yi(this,e)};var ne=Ve;function bt(n,e,i,o,t){var s="",r="",a=Math.floor(t/2)-1;return o-e>a&&(s=" ... ",e=o-a+s.length),i-o>a&&(r=" ...",i=o+a-r.length),{str:s+n.slice(e,i).replace(/\t/g,"→")+r,pos:o-e+s.length}}function vt(n,e){return K.repeat(" ",e-n.length)+n}function xs(n,e){if(e=Object.create(e||null),!n.buffer)return null;e.maxLength||(e.maxLength=79),typeof e.indent!="number"&&(e.indent=1),typeof e.linesBefore!="number"&&(e.linesBefore=3),typeof e.linesAfter!="number"&&(e.linesAfter=2);for(var i=/\r?\n|\r|\0/g,o=[0],t=[],s,r=-1;s=i.exec(n.buffer);)t.push(s.index),o.push(s.index+s[0].length),n.position<=s.index&&r<0&&(r=o.length-2);r<0&&(r=o.length-1);var a="",l,c,d=Math.min(n.line+e.linesAfter,t.length).toString().length,p=e.maxLength-(e.indent+d+3);for(l=1;l<=e.linesBefore&&!(r-l<0);l++)c=bt(n.buffer,o[r-l],t[r-l],n.position-(o[r]-o[r-l]),p),a=K.repeat(" ",e.indent)+vt((n.line-l+1).toString(),d)+" | "+c.str+`
`+a;for(c=bt(n.buffer,o[r],t[r],n.position,p),a+=K.repeat(" ",e.indent)+vt((n.line+1).toString(),d)+" | "+c.str+`
`,a+=K.repeat("-",e.indent+d+3+c.pos)+`^
`,l=1;l<=e.linesAfter&&!(r+l>=t.length);l++)c=bt(n.buffer,o[r+l],t[r+l],n.position-(o[r]-o[r+l]),p),a+=K.repeat(" ",e.indent)+vt((n.line+l+1).toString(),d)+" | "+c.str+`
`;return a.replace(/\n$/,"")}var ws=xs,Ss=["kind","multi","resolve","construct","instanceOf","predicate","represent","representName","defaultStyle","styleAliases"],Es=["scalar","sequence","mapping"];function Is(n){var e={};return n!==null&&Object.keys(n).forEach(function(i){n[i].forEach(function(o){e[String(o)]=i})}),e}function Cs(n,e){if(e=e||{},Object.keys(e).forEach(function(i){if(Ss.indexOf(i)===-1)throw new ne('Unknown option "'+i+'" is met in definition of "'+n+'" YAML type.')}),this.options=e,this.tag=n,this.kind=e.kind||null,this.resolve=e.resolve||function(){return!0},this.construct=e.construct||function(i){return i},this.instanceOf=e.instanceOf||null,this.predicate=e.predicate||null,this.represent=e.represent||null,this.representName=e.representName||null,this.defaultStyle=e.defaultStyle||null,this.multi=e.multi||!1,this.styleAliases=Is(e.styleAliases||null),Es.indexOf(this.kind)===-1)throw new ne('Unknown kind "'+this.kind+'" is specified for "'+n+'" YAML type.')}var Z=Cs;function yn(n,e){var i=[];return n[e].forEach(function(o){var t=i.length;i.forEach(function(s,r){s.tag===o.tag&&s.kind===o.kind&&s.multi===o.multi&&(t=r)}),i[t]=o}),i}function ks(){var n={scalar:{},sequence:{},mapping:{},fallback:{},multi:{scalar:[],sequence:[],mapping:[],fallback:[]}},e,i;function o(t){t.multi?(n.multi[t.kind].push(t),n.multi.fallback.push(t)):n[t.kind][t.tag]=n.fallback[t.tag]=t}for(e=0,i=arguments.length;e<i;e+=1)arguments[e].forEach(o);return n}function Tt(n){return this.extend(n)}Tt.prototype.extend=function(e){var i=[],o=[];if(e instanceof Z)o.push(e);else if(Array.isArray(e))o=o.concat(e);else if(e&&(Array.isArray(e.implicit)||Array.isArray(e.explicit)))e.implicit&&(i=i.concat(e.implicit)),e.explicit&&(o=o.concat(e.explicit));else throw new ne("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");i.forEach(function(s){if(!(s instanceof Z))throw new ne("Specified list of YAML types (or a single Type object) contains a non-Type object.");if(s.loadKind&&s.loadKind!=="scalar")throw new ne("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");if(s.multi)throw new ne("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.")}),o.forEach(function(s){if(!(s instanceof Z))throw new ne("Specified list of YAML types (or a single Type object) contains a non-Type object.")});var t=Object.create(Tt.prototype);return t.implicit=(this.implicit||[]).concat(i),t.explicit=(this.explicit||[]).concat(o),t.compiledImplicit=yn(t,"implicit"),t.compiledExplicit=yn(t,"explicit"),t.compiledTypeMap=ks(t.compiledImplicit,t.compiledExplicit),t};var _i=Tt,bi=new Z("tag:yaml.org,2002:str",{kind:"scalar",construct:function(n){return n!==null?n:""}}),vi=new Z("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(n){return n!==null?n:[]}}),xi=new Z("tag:yaml.org,2002:map",{kind:"mapping",construct:function(n){return n!==null?n:{}}}),wi=new _i({explicit:[bi,vi,xi]});function Ps(n){if(n===null)return!0;var e=n.length;return e===1&&n==="~"||e===4&&(n==="null"||n==="Null"||n==="NULL")}function Ls(){return null}function Ts(n){return n===null}var Si=new Z("tag:yaml.org,2002:null",{kind:"scalar",resolve:Ps,construct:Ls,predicate:Ts,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"},empty:function(){return""}},defaultStyle:"lowercase"});function As(n){if(n===null)return!1;var e=n.length;return e===4&&(n==="true"||n==="True"||n==="TRUE")||e===5&&(n==="false"||n==="False"||n==="FALSE")}function Ms(n){return n==="true"||n==="True"||n==="TRUE"}function Ds(n){return Object.prototype.toString.call(n)==="[object Boolean]"}var Ei=new Z("tag:yaml.org,2002:bool",{kind:"scalar",resolve:As,construct:Ms,predicate:Ds,represent:{lowercase:function(n){return n?"true":"false"},uppercase:function(n){return n?"TRUE":"FALSE"},camelcase:function(n){return n?"True":"False"}},defaultStyle:"lowercase"});function Os(n){return 48<=n&&n<=57||65<=n&&n<=70||97<=n&&n<=102}function Rs(n){return 48<=n&&n<=55}function Bs(n){return 48<=n&&n<=57}function Ns(n){if(n===null)return!1;var e=n.length,i=0,o=!1,t;if(!e)return!1;if(t=n[i],(t==="-"||t==="+")&&(t=n[++i]),t==="0"){if(i+1===e)return!0;if(t=n[++i],t==="b"){for(i++;i<e;i++)if(t=n[i],t!=="_"){if(t!=="0"&&t!=="1")return!1;o=!0}return o&&t!=="_"}if(t==="x"){for(i++;i<e;i++)if(t=n[i],t!=="_"){if(!Os(n.charCodeAt(i)))return!1;o=!0}return o&&t!=="_"}if(t==="o"){for(i++;i<e;i++)if(t=n[i],t!=="_"){if(!Rs(n.charCodeAt(i)))return!1;o=!0}return o&&t!=="_"}}if(t==="_")return!1;for(;i<e;i++)if(t=n[i],t!=="_"){if(!Bs(n.charCodeAt(i)))return!1;o=!0}return!(!o||t==="_")}function Hs(n){var e=n,i=1,o;if(e.indexOf("_")!==-1&&(e=e.replace(/_/g,"")),o=e[0],(o==="-"||o==="+")&&(o==="-"&&(i=-1),e=e.slice(1),o=e[0]),e==="0")return 0;if(o==="0"){if(e[1]==="b")return i*parseInt(e.slice(2),2);if(e[1]==="x")return i*parseInt(e.slice(2),16);if(e[1]==="o")return i*parseInt(e.slice(2),8)}return i*parseInt(e,10)}function Fs(n){return Object.prototype.toString.call(n)==="[object Number]"&&n%1===0&&!K.isNegativeZero(n)}var Ii=new Z("tag:yaml.org,2002:int",{kind:"scalar",resolve:Ns,construct:Hs,predicate:Fs,represent:{binary:function(n){return n>=0?"0b"+n.toString(2):"-0b"+n.toString(2).slice(1)},octal:function(n){return n>=0?"0o"+n.toString(8):"-0o"+n.toString(8).slice(1)},decimal:function(n){return n.toString(10)},hexadecimal:function(n){return n>=0?"0x"+n.toString(16).toUpperCase():"-0x"+n.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}}),Gs=new RegExp("^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function Ws(n){return!(n===null||!Gs.test(n)||n[n.length-1]==="_")}function $s(n){var e,i;return e=n.replace(/_/g,"").toLowerCase(),i=e[0]==="-"?-1:1,"+-".indexOf(e[0])>=0&&(e=e.slice(1)),e===".inf"?i===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:e===".nan"?NaN:i*parseFloat(e,10)}var zs=/^[-+]?[0-9]+e/;function Us(n,e){var i;if(isNaN(n))switch(e){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===n)switch(e){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===n)switch(e){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(K.isNegativeZero(n))return"-0.0";return i=n.toString(10),zs.test(i)?i.replace("e",".e"):i}function js(n){return Object.prototype.toString.call(n)==="[object Number]"&&(n%1!==0||K.isNegativeZero(n))}var Ci=new Z("tag:yaml.org,2002:float",{kind:"scalar",resolve:Ws,construct:$s,predicate:js,represent:Us,defaultStyle:"lowercase"}),ki=wi.extend({implicit:[Si,Ei,Ii,Ci]}),Pi=ki,Li=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),Ti=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function Ys(n){return n===null?!1:Li.exec(n)!==null||Ti.exec(n)!==null}function Vs(n){var e,i,o,t,s,r,a,l=0,c=null,d,p,h;if(e=Li.exec(n),e===null&&(e=Ti.exec(n)),e===null)throw new Error("Date resolve error");if(i=+e[1],o=+e[2]-1,t=+e[3],!e[4])return new Date(Date.UTC(i,o,t));if(s=+e[4],r=+e[5],a=+e[6],e[7]){for(l=e[7].slice(0,3);l.length<3;)l+="0";l=+l}return e[9]&&(d=+e[10],p=+(e[11]||0),c=(d*60+p)*6e4,e[9]==="-"&&(c=-c)),h=new Date(Date.UTC(i,o,t,s,r,a,l)),c&&h.setTime(h.getTime()-c),h}function qs(n){return n.toISOString()}var Ai=new Z("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:Ys,construct:Vs,instanceOf:Date,represent:qs});function Xs(n){return n==="<<"||n===null}var Mi=new Z("tag:yaml.org,2002:merge",{kind:"scalar",resolve:Xs}),sn=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function Ks(n){if(n===null)return!1;var e,i,o=0,t=n.length,s=sn;for(i=0;i<t;i++)if(e=s.indexOf(n.charAt(i)),!(e>64)){if(e<0)return!1;o+=6}return o%8===0}function Js(n){var e,i,o=n.replace(/[\r\n=]/g,""),t=o.length,s=sn,r=0,a=[];for(e=0;e<t;e++)e%4===0&&e&&(a.push(r>>16&255),a.push(r>>8&255),a.push(r&255)),r=r<<6|s.indexOf(o.charAt(e));return i=t%4*6,i===0?(a.push(r>>16&255),a.push(r>>8&255),a.push(r&255)):i===18?(a.push(r>>10&255),a.push(r>>2&255)):i===12&&a.push(r>>4&255),new Uint8Array(a)}function Zs(n){var e="",i=0,o,t,s=n.length,r=sn;for(o=0;o<s;o++)o%3===0&&o&&(e+=r[i>>18&63],e+=r[i>>12&63],e+=r[i>>6&63],e+=r[i&63]),i=(i<<8)+n[o];return t=s%3,t===0?(e+=r[i>>18&63],e+=r[i>>12&63],e+=r[i>>6&63],e+=r[i&63]):t===2?(e+=r[i>>10&63],e+=r[i>>4&63],e+=r[i<<2&63],e+=r[64]):t===1&&(e+=r[i>>2&63],e+=r[i<<4&63],e+=r[64],e+=r[64]),e}function Qs(n){return Object.prototype.toString.call(n)==="[object Uint8Array]"}var Di=new Z("tag:yaml.org,2002:binary",{kind:"scalar",resolve:Ks,construct:Js,predicate:Qs,represent:Zs}),er=Object.prototype.hasOwnProperty,tr=Object.prototype.toString;function nr(n){if(n===null)return!0;var e=[],i,o,t,s,r,a=n;for(i=0,o=a.length;i<o;i+=1){if(t=a[i],r=!1,tr.call(t)!=="[object Object]")return!1;for(s in t)if(er.call(t,s))if(!r)r=!0;else return!1;if(!r)return!1;if(e.indexOf(s)===-1)e.push(s);else return!1}return!0}function ir(n){return n!==null?n:[]}var Oi=new Z("tag:yaml.org,2002:omap",{kind:"sequence",resolve:nr,construct:ir}),or=Object.prototype.toString;function sr(n){if(n===null)return!0;var e,i,o,t,s,r=n;for(s=new Array(r.length),e=0,i=r.length;e<i;e+=1){if(o=r[e],or.call(o)!=="[object Object]"||(t=Object.keys(o),t.length!==1))return!1;s[e]=[t[0],o[t[0]]]}return!0}function rr(n){if(n===null)return[];var e,i,o,t,s,r=n;for(s=new Array(r.length),e=0,i=r.length;e<i;e+=1)o=r[e],t=Object.keys(o),s[e]=[t[0],o[t[0]]];return s}var Ri=new Z("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:sr,construct:rr}),ar=Object.prototype.hasOwnProperty;function lr(n){if(n===null)return!0;var e,i=n;for(e in i)if(ar.call(i,e)&&i[e]!==null)return!1;return!0}function dr(n){return n!==null?n:{}}var Bi=new Z("tag:yaml.org,2002:set",{kind:"mapping",resolve:lr,construct:dr}),rn=Pi.extend({implicit:[Ai,Mi],explicit:[Di,Oi,Ri,Bi]}),xe=Object.prototype.hasOwnProperty,rt=1,Ni=2,Hi=3,at=4,xt=1,cr=2,_n=3,pr=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,ur=/[\x85\u2028\u2029]/,hr=/[,\[\]\{\}]/,Fi=/^(?:!|!!|![a-z\-]+!)$/i,Gi=/^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;function bn(n){return Object.prototype.toString.call(n)}function ce(n){return n===10||n===13}function Pe(n){return n===9||n===32}function oe(n){return n===9||n===32||n===10||n===13}function Oe(n){return n===44||n===91||n===93||n===123||n===125}function gr(n){var e;return 48<=n&&n<=57?n-48:(e=n|32,97<=e&&e<=102?e-97+10:-1)}function fr(n){return n===120?2:n===117?4:n===85?8:0}function mr(n){return 48<=n&&n<=57?n-48:-1}function vn(n){return n===48?"\0":n===97?"\x07":n===98?"\b":n===116||n===9?"	":n===110?`
`:n===118?"\v":n===102?"\f":n===114?"\r":n===101?"\x1B":n===32?" ":n===34?'"':n===47?"/":n===92?"\\":n===78?"":n===95?" ":n===76?"\u2028":n===80?"\u2029":""}function yr(n){return n<=65535?String.fromCharCode(n):String.fromCharCode((n-65536>>10)+55296,(n-65536&1023)+56320)}function Wi(n,e,i){e==="__proto__"?Object.defineProperty(n,e,{configurable:!0,enumerable:!0,writable:!0,value:i}):n[e]=i}var $i=new Array(256),zi=new Array(256);for(var Te=0;Te<256;Te++)$i[Te]=vn(Te)?1:0,zi[Te]=vn(Te);function _r(n,e){this.input=n,this.filename=e.filename||null,this.schema=e.schema||rn,this.onWarning=e.onWarning||null,this.legacy=e.legacy||!1,this.json=e.json||!1,this.listener=e.listener||null,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=n.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.firstTabInLine=-1,this.documents=[]}function Ui(n,e){var i={name:n.filename,buffer:n.input.slice(0,-1),position:n.position,line:n.line,column:n.position-n.lineStart};return i.snippet=ws(i),new ne(e,i)}function D(n,e){throw Ui(n,e)}function lt(n,e){n.onWarning&&n.onWarning.call(null,Ui(n,e))}var xn={YAML:function(e,i,o){var t,s,r;e.version!==null&&D(e,"duplication of %YAML directive"),o.length!==1&&D(e,"YAML directive accepts exactly one argument"),t=/^([0-9]+)\.([0-9]+)$/.exec(o[0]),t===null&&D(e,"ill-formed argument of the YAML directive"),s=parseInt(t[1],10),r=parseInt(t[2],10),s!==1&&D(e,"unacceptable YAML version of the document"),e.version=o[0],e.checkLineBreaks=r<2,r!==1&&r!==2&&lt(e,"unsupported YAML version of the document")},TAG:function(e,i,o){var t,s;o.length!==2&&D(e,"TAG directive accepts exactly two arguments"),t=o[0],s=o[1],Fi.test(t)||D(e,"ill-formed tag handle (first argument) of the TAG directive"),xe.call(e.tagMap,t)&&D(e,'there is a previously declared suffix for "'+t+'" tag handle'),Gi.test(s)||D(e,"ill-formed tag prefix (second argument) of the TAG directive");try{s=decodeURIComponent(s)}catch{D(e,"tag prefix is malformed: "+s)}e.tagMap[t]=s}};function ve(n,e,i,o){var t,s,r,a;if(e<i){if(a=n.input.slice(e,i),o)for(t=0,s=a.length;t<s;t+=1)r=a.charCodeAt(t),r===9||32<=r&&r<=1114111||D(n,"expected valid JSON character");else pr.test(a)&&D(n,"the stream contains non-printable characters");n.result+=a}}function wn(n,e,i,o){var t,s,r,a;for(K.isObject(i)||D(n,"cannot merge mappings; the provided source object is unacceptable"),t=Object.keys(i),r=0,a=t.length;r<a;r+=1)s=t[r],xe.call(e,s)||(Wi(e,s,i[s]),o[s]=!0)}function Re(n,e,i,o,t,s,r,a,l){var c,d;if(Array.isArray(t))for(t=Array.prototype.slice.call(t),c=0,d=t.length;c<d;c+=1)Array.isArray(t[c])&&D(n,"nested arrays are not supported inside keys"),typeof t=="object"&&bn(t[c])==="[object Object]"&&(t[c]="[object Object]");if(typeof t=="object"&&bn(t)==="[object Object]"&&(t="[object Object]"),t=String(t),e===null&&(e={}),o==="tag:yaml.org,2002:merge")if(Array.isArray(s))for(c=0,d=s.length;c<d;c+=1)wn(n,e,s[c],i);else wn(n,e,s,i);else!n.json&&!xe.call(i,t)&&xe.call(e,t)&&(n.line=r||n.line,n.lineStart=a||n.lineStart,n.position=l||n.position,D(n,"duplicated mapping key")),Wi(e,t,s),delete i[t];return e}function an(n){var e;e=n.input.charCodeAt(n.position),e===10?n.position++:e===13?(n.position++,n.input.charCodeAt(n.position)===10&&n.position++):D(n,"a line break is expected"),n.line+=1,n.lineStart=n.position,n.firstTabInLine=-1}function X(n,e,i){for(var o=0,t=n.input.charCodeAt(n.position);t!==0;){for(;Pe(t);)t===9&&n.firstTabInLine===-1&&(n.firstTabInLine=n.position),t=n.input.charCodeAt(++n.position);if(e&&t===35)do t=n.input.charCodeAt(++n.position);while(t!==10&&t!==13&&t!==0);if(ce(t))for(an(n),t=n.input.charCodeAt(n.position),o++,n.lineIndent=0;t===32;)n.lineIndent++,t=n.input.charCodeAt(++n.position);else break}return i!==-1&&o!==0&&n.lineIndent<i&&lt(n,"deficient indentation"),o}function yt(n){var e=n.position,i;return i=n.input.charCodeAt(e),!!((i===45||i===46)&&i===n.input.charCodeAt(e+1)&&i===n.input.charCodeAt(e+2)&&(e+=3,i=n.input.charCodeAt(e),i===0||oe(i)))}function ln(n,e){e===1?n.result+=" ":e>1&&(n.result+=K.repeat(`
`,e-1))}function br(n,e,i){var o,t,s,r,a,l,c,d,p=n.kind,h=n.result,u;if(u=n.input.charCodeAt(n.position),oe(u)||Oe(u)||u===35||u===38||u===42||u===33||u===124||u===62||u===39||u===34||u===37||u===64||u===96||(u===63||u===45)&&(t=n.input.charCodeAt(n.position+1),oe(t)||i&&Oe(t)))return!1;for(n.kind="scalar",n.result="",s=r=n.position,a=!1;u!==0;){if(u===58){if(t=n.input.charCodeAt(n.position+1),oe(t)||i&&Oe(t))break}else if(u===35){if(o=n.input.charCodeAt(n.position-1),oe(o))break}else{if(n.position===n.lineStart&&yt(n)||i&&Oe(u))break;if(ce(u))if(l=n.line,c=n.lineStart,d=n.lineIndent,X(n,!1,-1),n.lineIndent>=e){a=!0,u=n.input.charCodeAt(n.position);continue}else{n.position=r,n.line=l,n.lineStart=c,n.lineIndent=d;break}}a&&(ve(n,s,r,!1),ln(n,n.line-l),s=r=n.position,a=!1),Pe(u)||(r=n.position+1),u=n.input.charCodeAt(++n.position)}return ve(n,s,r,!1),n.result?!0:(n.kind=p,n.result=h,!1)}function vr(n,e){var i,o,t;if(i=n.input.charCodeAt(n.position),i!==39)return!1;for(n.kind="scalar",n.result="",n.position++,o=t=n.position;(i=n.input.charCodeAt(n.position))!==0;)if(i===39)if(ve(n,o,n.position,!0),i=n.input.charCodeAt(++n.position),i===39)o=n.position,n.position++,t=n.position;else return!0;else ce(i)?(ve(n,o,t,!0),ln(n,X(n,!1,e)),o=t=n.position):n.position===n.lineStart&&yt(n)?D(n,"unexpected end of the document within a single quoted scalar"):(n.position++,t=n.position);D(n,"unexpected end of the stream within a single quoted scalar")}function xr(n,e){var i,o,t,s,r,a;if(a=n.input.charCodeAt(n.position),a!==34)return!1;for(n.kind="scalar",n.result="",n.position++,i=o=n.position;(a=n.input.charCodeAt(n.position))!==0;){if(a===34)return ve(n,i,n.position,!0),n.position++,!0;if(a===92){if(ve(n,i,n.position,!0),a=n.input.charCodeAt(++n.position),ce(a))X(n,!1,e);else if(a<256&&$i[a])n.result+=zi[a],n.position++;else if((r=fr(a))>0){for(t=r,s=0;t>0;t--)a=n.input.charCodeAt(++n.position),(r=gr(a))>=0?s=(s<<4)+r:D(n,"expected hexadecimal character");n.result+=yr(s),n.position++}else D(n,"unknown escape sequence");i=o=n.position}else ce(a)?(ve(n,i,o,!0),ln(n,X(n,!1,e)),i=o=n.position):n.position===n.lineStart&&yt(n)?D(n,"unexpected end of the document within a double quoted scalar"):(n.position++,o=n.position)}D(n,"unexpected end of the stream within a double quoted scalar")}function wr(n,e){var i=!0,o,t,s,r=n.tag,a,l=n.anchor,c,d,p,h,u,m=Object.create(null),y,f,_,v;if(v=n.input.charCodeAt(n.position),v===91)d=93,u=!1,a=[];else if(v===123)d=125,u=!0,a={};else return!1;for(n.anchor!==null&&(n.anchorMap[n.anchor]=a),v=n.input.charCodeAt(++n.position);v!==0;){if(X(n,!0,e),v=n.input.charCodeAt(n.position),v===d)return n.position++,n.tag=r,n.anchor=l,n.kind=u?"mapping":"sequence",n.result=a,!0;i?v===44&&D(n,"expected the node content, but found ','"):D(n,"missed comma between flow collection entries"),f=y=_=null,p=h=!1,v===63&&(c=n.input.charCodeAt(n.position+1),oe(c)&&(p=h=!0,n.position++,X(n,!0,e))),o=n.line,t=n.lineStart,s=n.position,Fe(n,e,rt,!1,!0),f=n.tag,y=n.result,X(n,!0,e),v=n.input.charCodeAt(n.position),(h||n.line===o)&&v===58&&(p=!0,v=n.input.charCodeAt(++n.position),X(n,!0,e),Fe(n,e,rt,!1,!0),_=n.result),u?Re(n,a,m,f,y,_,o,t,s):p?a.push(Re(n,null,m,f,y,_,o,t,s)):a.push(y),X(n,!0,e),v=n.input.charCodeAt(n.position),v===44?(i=!0,v=n.input.charCodeAt(++n.position)):i=!1}D(n,"unexpected end of the stream within a flow collection")}function Sr(n,e){var i,o,t=xt,s=!1,r=!1,a=e,l=0,c=!1,d,p;if(p=n.input.charCodeAt(n.position),p===124)o=!1;else if(p===62)o=!0;else return!1;for(n.kind="scalar",n.result="";p!==0;)if(p=n.input.charCodeAt(++n.position),p===43||p===45)xt===t?t=p===43?_n:cr:D(n,"repeat of a chomping mode identifier");else if((d=mr(p))>=0)d===0?D(n,"bad explicit indentation width of a block scalar; it cannot be less than one"):r?D(n,"repeat of an indentation width identifier"):(a=e+d-1,r=!0);else break;if(Pe(p)){do p=n.input.charCodeAt(++n.position);while(Pe(p));if(p===35)do p=n.input.charCodeAt(++n.position);while(!ce(p)&&p!==0)}for(;p!==0;){for(an(n),n.lineIndent=0,p=n.input.charCodeAt(n.position);(!r||n.lineIndent<a)&&p===32;)n.lineIndent++,p=n.input.charCodeAt(++n.position);if(!r&&n.lineIndent>a&&(a=n.lineIndent),ce(p)){l++;continue}if(n.lineIndent<a){t===_n?n.result+=K.repeat(`
`,s?1+l:l):t===xt&&s&&(n.result+=`
`);break}for(o?Pe(p)?(c=!0,n.result+=K.repeat(`
`,s?1+l:l)):c?(c=!1,n.result+=K.repeat(`
`,l+1)):l===0?s&&(n.result+=" "):n.result+=K.repeat(`
`,l):n.result+=K.repeat(`
`,s?1+l:l),s=!0,r=!0,l=0,i=n.position;!ce(p)&&p!==0;)p=n.input.charCodeAt(++n.position);ve(n,i,n.position,!1)}return!0}function Sn(n,e){var i,o=n.tag,t=n.anchor,s=[],r,a=!1,l;if(n.firstTabInLine!==-1)return!1;for(n.anchor!==null&&(n.anchorMap[n.anchor]=s),l=n.input.charCodeAt(n.position);l!==0&&(n.firstTabInLine!==-1&&(n.position=n.firstTabInLine,D(n,"tab characters must not be used in indentation")),!(l!==45||(r=n.input.charCodeAt(n.position+1),!oe(r))));){if(a=!0,n.position++,X(n,!0,-1)&&n.lineIndent<=e){s.push(null),l=n.input.charCodeAt(n.position);continue}if(i=n.line,Fe(n,e,Hi,!1,!0),s.push(n.result),X(n,!0,-1),l=n.input.charCodeAt(n.position),(n.line===i||n.lineIndent>e)&&l!==0)D(n,"bad indentation of a sequence entry");else if(n.lineIndent<e)break}return a?(n.tag=o,n.anchor=t,n.kind="sequence",n.result=s,!0):!1}function Er(n,e,i){var o,t,s,r,a,l,c=n.tag,d=n.anchor,p={},h=Object.create(null),u=null,m=null,y=null,f=!1,_=!1,v;if(n.firstTabInLine!==-1)return!1;for(n.anchor!==null&&(n.anchorMap[n.anchor]=p),v=n.input.charCodeAt(n.position);v!==0;){if(!f&&n.firstTabInLine!==-1&&(n.position=n.firstTabInLine,D(n,"tab characters must not be used in indentation")),o=n.input.charCodeAt(n.position+1),s=n.line,(v===63||v===58)&&oe(o))v===63?(f&&(Re(n,p,h,u,m,null,r,a,l),u=m=y=null),_=!0,f=!0,t=!0):f?(f=!1,t=!0):D(n,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),n.position+=1,v=o;else{if(r=n.line,a=n.lineStart,l=n.position,!Fe(n,i,Ni,!1,!0))break;if(n.line===s){for(v=n.input.charCodeAt(n.position);Pe(v);)v=n.input.charCodeAt(++n.position);if(v===58)v=n.input.charCodeAt(++n.position),oe(v)||D(n,"a whitespace character is expected after the key-value separator within a block mapping"),f&&(Re(n,p,h,u,m,null,r,a,l),u=m=y=null),_=!0,f=!1,t=!1,u=n.tag,m=n.result;else if(_)D(n,"can not read an implicit mapping pair; a colon is missed");else return n.tag=c,n.anchor=d,!0}else if(_)D(n,"can not read a block mapping entry; a multiline key may not be an implicit key");else return n.tag=c,n.anchor=d,!0}if((n.line===s||n.lineIndent>e)&&(f&&(r=n.line,a=n.lineStart,l=n.position),Fe(n,e,at,!0,t)&&(f?m=n.result:y=n.result),f||(Re(n,p,h,u,m,y,r,a,l),u=m=y=null),X(n,!0,-1),v=n.input.charCodeAt(n.position)),(n.line===s||n.lineIndent>e)&&v!==0)D(n,"bad indentation of a mapping entry");else if(n.lineIndent<e)break}return f&&Re(n,p,h,u,m,null,r,a,l),_&&(n.tag=c,n.anchor=d,n.kind="mapping",n.result=p),_}function Ir(n){var e,i=!1,o=!1,t,s,r;if(r=n.input.charCodeAt(n.position),r!==33)return!1;if(n.tag!==null&&D(n,"duplication of a tag property"),r=n.input.charCodeAt(++n.position),r===60?(i=!0,r=n.input.charCodeAt(++n.position)):r===33?(o=!0,t="!!",r=n.input.charCodeAt(++n.position)):t="!",e=n.position,i){do r=n.input.charCodeAt(++n.position);while(r!==0&&r!==62);n.position<n.length?(s=n.input.slice(e,n.position),r=n.input.charCodeAt(++n.position)):D(n,"unexpected end of the stream within a verbatim tag")}else{for(;r!==0&&!oe(r);)r===33&&(o?D(n,"tag suffix cannot contain exclamation marks"):(t=n.input.slice(e-1,n.position+1),Fi.test(t)||D(n,"named tag handle cannot contain such characters"),o=!0,e=n.position+1)),r=n.input.charCodeAt(++n.position);s=n.input.slice(e,n.position),hr.test(s)&&D(n,"tag suffix cannot contain flow indicator characters")}s&&!Gi.test(s)&&D(n,"tag name cannot contain such characters: "+s);try{s=decodeURIComponent(s)}catch{D(n,"tag name is malformed: "+s)}return i?n.tag=s:xe.call(n.tagMap,t)?n.tag=n.tagMap[t]+s:t==="!"?n.tag="!"+s:t==="!!"?n.tag="tag:yaml.org,2002:"+s:D(n,'undeclared tag handle "'+t+'"'),!0}function Cr(n){var e,i;if(i=n.input.charCodeAt(n.position),i!==38)return!1;for(n.anchor!==null&&D(n,"duplication of an anchor property"),i=n.input.charCodeAt(++n.position),e=n.position;i!==0&&!oe(i)&&!Oe(i);)i=n.input.charCodeAt(++n.position);return n.position===e&&D(n,"name of an anchor node must contain at least one character"),n.anchor=n.input.slice(e,n.position),!0}function kr(n){var e,i,o;if(o=n.input.charCodeAt(n.position),o!==42)return!1;for(o=n.input.charCodeAt(++n.position),e=n.position;o!==0&&!oe(o)&&!Oe(o);)o=n.input.charCodeAt(++n.position);return n.position===e&&D(n,"name of an alias node must contain at least one character"),i=n.input.slice(e,n.position),xe.call(n.anchorMap,i)||D(n,'unidentified alias "'+i+'"'),n.result=n.anchorMap[i],X(n,!0,-1),!0}function Fe(n,e,i,o,t){var s,r,a,l=1,c=!1,d=!1,p,h,u,m,y,f;if(n.listener!==null&&n.listener("open",n),n.tag=null,n.anchor=null,n.kind=null,n.result=null,s=r=a=at===i||Hi===i,o&&X(n,!0,-1)&&(c=!0,n.lineIndent>e?l=1:n.lineIndent===e?l=0:n.lineIndent<e&&(l=-1)),l===1)for(;Ir(n)||Cr(n);)X(n,!0,-1)?(c=!0,a=s,n.lineIndent>e?l=1:n.lineIndent===e?l=0:n.lineIndent<e&&(l=-1)):a=!1;if(a&&(a=c||t),(l===1||at===i)&&(rt===i||Ni===i?y=e:y=e+1,f=n.position-n.lineStart,l===1?a&&(Sn(n,f)||Er(n,f,y))||wr(n,y)?d=!0:(r&&Sr(n,y)||vr(n,y)||xr(n,y)?d=!0:kr(n)?(d=!0,(n.tag!==null||n.anchor!==null)&&D(n,"alias node should not have any properties")):br(n,y,rt===i)&&(d=!0,n.tag===null&&(n.tag="?")),n.anchor!==null&&(n.anchorMap[n.anchor]=n.result)):l===0&&(d=a&&Sn(n,f))),n.tag===null)n.anchor!==null&&(n.anchorMap[n.anchor]=n.result);else if(n.tag==="?"){for(n.result!==null&&n.kind!=="scalar"&&D(n,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+n.kind+'"'),p=0,h=n.implicitTypes.length;p<h;p+=1)if(m=n.implicitTypes[p],m.resolve(n.result)){n.result=m.construct(n.result),n.tag=m.tag,n.anchor!==null&&(n.anchorMap[n.anchor]=n.result);break}}else if(n.tag!=="!"){if(xe.call(n.typeMap[n.kind||"fallback"],n.tag))m=n.typeMap[n.kind||"fallback"][n.tag];else for(m=null,u=n.typeMap.multi[n.kind||"fallback"],p=0,h=u.length;p<h;p+=1)if(n.tag.slice(0,u[p].tag.length)===u[p].tag){m=u[p];break}m||D(n,"unknown tag !<"+n.tag+">"),n.result!==null&&m.kind!==n.kind&&D(n,"unacceptable node kind for !<"+n.tag+'> tag; it should be "'+m.kind+'", not "'+n.kind+'"'),m.resolve(n.result,n.tag)?(n.result=m.construct(n.result,n.tag),n.anchor!==null&&(n.anchorMap[n.anchor]=n.result)):D(n,"cannot resolve a node with !<"+n.tag+"> explicit tag")}return n.listener!==null&&n.listener("close",n),n.tag!==null||n.anchor!==null||d}function Pr(n){var e=n.position,i,o,t,s=!1,r;for(n.version=null,n.checkLineBreaks=n.legacy,n.tagMap=Object.create(null),n.anchorMap=Object.create(null);(r=n.input.charCodeAt(n.position))!==0&&(X(n,!0,-1),r=n.input.charCodeAt(n.position),!(n.lineIndent>0||r!==37));){for(s=!0,r=n.input.charCodeAt(++n.position),i=n.position;r!==0&&!oe(r);)r=n.input.charCodeAt(++n.position);for(o=n.input.slice(i,n.position),t=[],o.length<1&&D(n,"directive name must not be less than one character in length");r!==0;){for(;Pe(r);)r=n.input.charCodeAt(++n.position);if(r===35){do r=n.input.charCodeAt(++n.position);while(r!==0&&!ce(r));break}if(ce(r))break;for(i=n.position;r!==0&&!oe(r);)r=n.input.charCodeAt(++n.position);t.push(n.input.slice(i,n.position))}r!==0&&an(n),xe.call(xn,o)?xn[o](n,o,t):lt(n,'unknown document directive "'+o+'"')}if(X(n,!0,-1),n.lineIndent===0&&n.input.charCodeAt(n.position)===45&&n.input.charCodeAt(n.position+1)===45&&n.input.charCodeAt(n.position+2)===45?(n.position+=3,X(n,!0,-1)):s&&D(n,"directives end mark is expected"),Fe(n,n.lineIndent-1,at,!1,!0),X(n,!0,-1),n.checkLineBreaks&&ur.test(n.input.slice(e,n.position))&&lt(n,"non-ASCII line breaks are interpreted as content"),n.documents.push(n.result),n.position===n.lineStart&&yt(n)){n.input.charCodeAt(n.position)===46&&(n.position+=3,X(n,!0,-1));return}if(n.position<n.length-1)D(n,"end of the stream or a document separator is expected");else return}function ji(n,e){n=String(n),e=e||{},n.length!==0&&(n.charCodeAt(n.length-1)!==10&&n.charCodeAt(n.length-1)!==13&&(n+=`
`),n.charCodeAt(0)===65279&&(n=n.slice(1)));var i=new _r(n,e),o=n.indexOf("\0");for(o!==-1&&(i.position=o,D(i,"null byte is not allowed in input")),i.input+="\0";i.input.charCodeAt(i.position)===32;)i.lineIndent+=1,i.position+=1;for(;i.position<i.length-1;)Pr(i);return i.documents}function Lr(n,e,i){e!==null&&typeof e=="object"&&typeof i>"u"&&(i=e,e=null);var o=ji(n,i);if(typeof e!="function")return o;for(var t=0,s=o.length;t<s;t+=1)e(o[t])}function Tr(n,e){var i=ji(n,e);if(i.length!==0){if(i.length===1)return i[0];throw new ne("expected a single document in the stream, but found more")}}var Ar=Lr,Mr=Tr,Yi={loadAll:Ar,load:Mr},Vi=Object.prototype.toString,qi=Object.prototype.hasOwnProperty,dn=65279,Dr=9,qe=10,Or=13,Rr=32,Br=33,Nr=34,At=35,Hr=37,Fr=38,Gr=39,Wr=42,Xi=44,$r=45,dt=58,zr=61,Ur=62,jr=63,Yr=64,Ki=91,Ji=93,Vr=96,Zi=123,qr=124,Qi=125,ee={};ee[0]="\\0";ee[7]="\\a";ee[8]="\\b";ee[9]="\\t";ee[10]="\\n";ee[11]="\\v";ee[12]="\\f";ee[13]="\\r";ee[27]="\\e";ee[34]='\\"';ee[92]="\\\\";ee[133]="\\N";ee[160]="\\_";ee[8232]="\\L";ee[8233]="\\P";var Xr=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"],Kr=/^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;function Jr(n,e){var i,o,t,s,r,a,l;if(e===null)return{};for(i={},o=Object.keys(e),t=0,s=o.length;t<s;t+=1)r=o[t],a=String(e[r]),r.slice(0,2)==="!!"&&(r="tag:yaml.org,2002:"+r.slice(2)),l=n.compiledTypeMap.fallback[r],l&&qi.call(l.styleAliases,a)&&(a=l.styleAliases[a]),i[r]=a;return i}function Zr(n){var e,i,o;if(e=n.toString(16).toUpperCase(),n<=255)i="x",o=2;else if(n<=65535)i="u",o=4;else if(n<=4294967295)i="U",o=8;else throw new ne("code point within a string may not be greater than 0xFFFFFFFF");return"\\"+i+K.repeat("0",o-e.length)+e}var Qr=1,Xe=2;function ea(n){this.schema=n.schema||rn,this.indent=Math.max(1,n.indent||2),this.noArrayIndent=n.noArrayIndent||!1,this.skipInvalid=n.skipInvalid||!1,this.flowLevel=K.isNothing(n.flowLevel)?-1:n.flowLevel,this.styleMap=Jr(this.schema,n.styles||null),this.sortKeys=n.sortKeys||!1,this.lineWidth=n.lineWidth||80,this.noRefs=n.noRefs||!1,this.noCompatMode=n.noCompatMode||!1,this.condenseFlow=n.condenseFlow||!1,this.quotingType=n.quotingType==='"'?Xe:Qr,this.forceQuotes=n.forceQuotes||!1,this.replacer=typeof n.replacer=="function"?n.replacer:null,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function En(n,e){for(var i=K.repeat(" ",e),o=0,t=-1,s="",r,a=n.length;o<a;)t=n.indexOf(`
`,o),t===-1?(r=n.slice(o),o=a):(r=n.slice(o,t+1),o=t+1),r.length&&r!==`
`&&(s+=i),s+=r;return s}function Mt(n,e){return`
`+K.repeat(" ",n.indent*e)}function ta(n,e){var i,o,t;for(i=0,o=n.implicitTypes.length;i<o;i+=1)if(t=n.implicitTypes[i],t.resolve(e))return!0;return!1}function ct(n){return n===Rr||n===Dr}function Ke(n){return 32<=n&&n<=126||161<=n&&n<=55295&&n!==8232&&n!==8233||57344<=n&&n<=65533&&n!==dn||65536<=n&&n<=1114111}function In(n){return Ke(n)&&n!==dn&&n!==Or&&n!==qe}function Cn(n,e,i){var o=In(n),t=o&&!ct(n);return(i?o:o&&n!==Xi&&n!==Ki&&n!==Ji&&n!==Zi&&n!==Qi)&&n!==At&&!(e===dt&&!t)||In(e)&&!ct(e)&&n===At||e===dt&&t}function na(n){return Ke(n)&&n!==dn&&!ct(n)&&n!==$r&&n!==jr&&n!==dt&&n!==Xi&&n!==Ki&&n!==Ji&&n!==Zi&&n!==Qi&&n!==At&&n!==Fr&&n!==Wr&&n!==Br&&n!==qr&&n!==zr&&n!==Ur&&n!==Gr&&n!==Nr&&n!==Hr&&n!==Yr&&n!==Vr}function ia(n){return!ct(n)&&n!==dt}function Ue(n,e){var i=n.charCodeAt(e),o;return i>=55296&&i<=56319&&e+1<n.length&&(o=n.charCodeAt(e+1),o>=56320&&o<=57343)?(i-55296)*1024+o-56320+65536:i}function eo(n){var e=/^\n* /;return e.test(n)}var to=1,Dt=2,no=3,io=4,Me=5;function oa(n,e,i,o,t,s,r,a){var l,c=0,d=null,p=!1,h=!1,u=o!==-1,m=-1,y=na(Ue(n,0))&&ia(Ue(n,n.length-1));if(e||r)for(l=0;l<n.length;c>=65536?l+=2:l++){if(c=Ue(n,l),!Ke(c))return Me;y=y&&Cn(c,d,a),d=c}else{for(l=0;l<n.length;c>=65536?l+=2:l++){if(c=Ue(n,l),c===qe)p=!0,u&&(h=h||l-m-1>o&&n[m+1]!==" ",m=l);else if(!Ke(c))return Me;y=y&&Cn(c,d,a),d=c}h=h||u&&l-m-1>o&&n[m+1]!==" "}return!p&&!h?y&&!r&&!t(n)?to:s===Xe?Me:Dt:i>9&&eo(n)?Me:r?s===Xe?Me:Dt:h?io:no}function sa(n,e,i,o,t){n.dump=function(){if(e.length===0)return n.quotingType===Xe?'""':"''";if(!n.noCompatMode&&(Xr.indexOf(e)!==-1||Kr.test(e)))return n.quotingType===Xe?'"'+e+'"':"'"+e+"'";var s=n.indent*Math.max(1,i),r=n.lineWidth===-1?-1:Math.max(Math.min(n.lineWidth,40),n.lineWidth-s),a=o||n.flowLevel>-1&&i>=n.flowLevel;function l(c){return ta(n,c)}switch(oa(e,a,n.indent,r,l,n.quotingType,n.forceQuotes&&!o,t)){case to:return e;case Dt:return"'"+e.replace(/'/g,"''")+"'";case no:return"|"+kn(e,n.indent)+Pn(En(e,s));case io:return">"+kn(e,n.indent)+Pn(En(ra(e,r),s));case Me:return'"'+aa(e)+'"';default:throw new ne("impossible error: invalid scalar style")}}()}function kn(n,e){var i=eo(n)?String(e):"",o=n[n.length-1]===`
`,t=o&&(n[n.length-2]===`
`||n===`
`),s=t?"+":o?"":"-";return i+s+`
`}function Pn(n){return n[n.length-1]===`
`?n.slice(0,-1):n}function ra(n,e){for(var i=/(\n+)([^\n]*)/g,o=function(){var c=n.indexOf(`
`);return c=c!==-1?c:n.length,i.lastIndex=c,Ln(n.slice(0,c),e)}(),t=n[0]===`
`||n[0]===" ",s,r;r=i.exec(n);){var a=r[1],l=r[2];s=l[0]===" ",o+=a+(!t&&!s&&l!==""?`
`:"")+Ln(l,e),t=s}return o}function Ln(n,e){if(n===""||n[0]===" ")return n;for(var i=/ [^ ]/g,o,t=0,s,r=0,a=0,l="";o=i.exec(n);)a=o.index,a-t>e&&(s=r>t?r:a,l+=`
`+n.slice(t,s),t=s+1),r=a;return l+=`
`,n.length-t>e&&r>t?l+=n.slice(t,r)+`
`+n.slice(r+1):l+=n.slice(t),l.slice(1)}function aa(n){for(var e="",i=0,o,t=0;t<n.length;i>=65536?t+=2:t++)i=Ue(n,t),o=ee[i],!o&&Ke(i)?(e+=n[t],i>=65536&&(e+=n[t+1])):e+=o||Zr(i);return e}function la(n,e,i){var o="",t=n.tag,s,r,a;for(s=0,r=i.length;s<r;s+=1)a=i[s],n.replacer&&(a=n.replacer.call(i,String(s),a)),(fe(n,e,a,!1,!1)||typeof a>"u"&&fe(n,e,null,!1,!1))&&(o!==""&&(o+=","+(n.condenseFlow?"":" ")),o+=n.dump);n.tag=t,n.dump="["+o+"]"}function Tn(n,e,i,o){var t="",s=n.tag,r,a,l;for(r=0,a=i.length;r<a;r+=1)l=i[r],n.replacer&&(l=n.replacer.call(i,String(r),l)),(fe(n,e+1,l,!0,!0,!1,!0)||typeof l>"u"&&fe(n,e+1,null,!0,!0,!1,!0))&&((!o||t!=="")&&(t+=Mt(n,e)),n.dump&&qe===n.dump.charCodeAt(0)?t+="-":t+="- ",t+=n.dump);n.tag=s,n.dump=t||"[]"}function da(n,e,i){var o="",t=n.tag,s=Object.keys(i),r,a,l,c,d;for(r=0,a=s.length;r<a;r+=1)d="",o!==""&&(d+=", "),n.condenseFlow&&(d+='"'),l=s[r],c=i[l],n.replacer&&(c=n.replacer.call(i,l,c)),fe(n,e,l,!1,!1)&&(n.dump.length>1024&&(d+="? "),d+=n.dump+(n.condenseFlow?'"':"")+":"+(n.condenseFlow?"":" "),fe(n,e,c,!1,!1)&&(d+=n.dump,o+=d));n.tag=t,n.dump="{"+o+"}"}function ca(n,e,i,o){var t="",s=n.tag,r=Object.keys(i),a,l,c,d,p,h;if(n.sortKeys===!0)r.sort();else if(typeof n.sortKeys=="function")r.sort(n.sortKeys);else if(n.sortKeys)throw new ne("sortKeys must be a boolean or a function");for(a=0,l=r.length;a<l;a+=1)h="",(!o||t!=="")&&(h+=Mt(n,e)),c=r[a],d=i[c],n.replacer&&(d=n.replacer.call(i,c,d)),fe(n,e+1,c,!0,!0,!0)&&(p=n.tag!==null&&n.tag!=="?"||n.dump&&n.dump.length>1024,p&&(n.dump&&qe===n.dump.charCodeAt(0)?h+="?":h+="? "),h+=n.dump,p&&(h+=Mt(n,e)),fe(n,e+1,d,!0,p)&&(n.dump&&qe===n.dump.charCodeAt(0)?h+=":":h+=": ",h+=n.dump,t+=h));n.tag=s,n.dump=t||"{}"}function An(n,e,i){var o,t,s,r,a,l;for(t=i?n.explicitTypes:n.implicitTypes,s=0,r=t.length;s<r;s+=1)if(a=t[s],(a.instanceOf||a.predicate)&&(!a.instanceOf||typeof e=="object"&&e instanceof a.instanceOf)&&(!a.predicate||a.predicate(e))){if(i?a.multi&&a.representName?n.tag=a.representName(e):n.tag=a.tag:n.tag="?",a.represent){if(l=n.styleMap[a.tag]||a.defaultStyle,Vi.call(a.represent)==="[object Function]")o=a.represent(e,l);else if(qi.call(a.represent,l))o=a.represent[l](e,l);else throw new ne("!<"+a.tag+'> tag resolver accepts not "'+l+'" style');n.dump=o}return!0}return!1}function fe(n,e,i,o,t,s,r){n.tag=null,n.dump=i,An(n,i,!1)||An(n,i,!0);var a=Vi.call(n.dump),l=o,c;o&&(o=n.flowLevel<0||n.flowLevel>e);var d=a==="[object Object]"||a==="[object Array]",p,h;if(d&&(p=n.duplicates.indexOf(i),h=p!==-1),(n.tag!==null&&n.tag!=="?"||h||n.indent!==2&&e>0)&&(t=!1),h&&n.usedDuplicates[p])n.dump="*ref_"+p;else{if(d&&h&&!n.usedDuplicates[p]&&(n.usedDuplicates[p]=!0),a==="[object Object]")o&&Object.keys(n.dump).length!==0?(ca(n,e,n.dump,t),h&&(n.dump="&ref_"+p+n.dump)):(da(n,e,n.dump),h&&(n.dump="&ref_"+p+" "+n.dump));else if(a==="[object Array]")o&&n.dump.length!==0?(n.noArrayIndent&&!r&&e>0?Tn(n,e-1,n.dump,t):Tn(n,e,n.dump,t),h&&(n.dump="&ref_"+p+n.dump)):(la(n,e,n.dump),h&&(n.dump="&ref_"+p+" "+n.dump));else if(a==="[object String]")n.tag!=="?"&&sa(n,n.dump,e,s,l);else{if(a==="[object Undefined]")return!1;if(n.skipInvalid)return!1;throw new ne("unacceptable kind of an object to dump "+a)}n.tag!==null&&n.tag!=="?"&&(c=encodeURI(n.tag[0]==="!"?n.tag.slice(1):n.tag).replace(/!/g,"%21"),n.tag[0]==="!"?c="!"+c:c.slice(0,18)==="tag:yaml.org,2002:"?c="!!"+c.slice(18):c="!<"+c+">",n.dump=c+" "+n.dump)}return!0}function pa(n,e){var i=[],o=[],t,s;for(Ot(n,i,o),t=0,s=o.length;t<s;t+=1)e.duplicates.push(i[o[t]]);e.usedDuplicates=new Array(s)}function Ot(n,e,i){var o,t,s;if(n!==null&&typeof n=="object")if(t=e.indexOf(n),t!==-1)i.indexOf(t)===-1&&i.push(t);else if(e.push(n),Array.isArray(n))for(t=0,s=n.length;t<s;t+=1)Ot(n[t],e,i);else for(o=Object.keys(n),t=0,s=o.length;t<s;t+=1)Ot(n[o[t]],e,i)}function ua(n,e){e=e||{};var i=new ea(e);i.noRefs||pa(n,i);var o=n;return i.replacer&&(o=i.replacer.call({"":o},"",o)),fe(i,0,o,!0,!0)?i.dump+`
`:""}var ha=ua,ga={dump:ha};function cn(n,e){return function(){throw new Error("Function yaml."+n+" is removed in js-yaml 4. Use yaml."+e+" instead, which is now safe by default.")}}var Be=Z,oo=_i,so=wi,ro=ki,ao=Pi,Ye=rn,pt=Yi.load,lo=Yi.loadAll,co=ga.dump,po=ne,uo={binary:Di,float:Ci,map:xi,null:Si,pairs:Ri,set:Bi,timestamp:Ai,bool:Ei,int:Ii,merge:Mi,omap:Oi,seq:vi,str:bi},ho=cn("safeLoad","load"),go=cn("safeLoadAll","loadAll"),fo=cn("safeDump","dump"),fa={Type:Be,Schema:oo,FAILSAFE_SCHEMA:so,JSON_SCHEMA:ro,CORE_SCHEMA:ao,DEFAULT_SCHEMA:Ye,load:pt,loadAll:lo,dump:co,YAMLException:po,types:uo,safeLoad:ho,safeLoadAll:go,safeDump:fo};const mo=Object.freeze(Object.defineProperty({__proto__:null,CORE_SCHEMA:ao,DEFAULT_SCHEMA:Ye,FAILSAFE_SCHEMA:so,JSON_SCHEMA:ro,Schema:oo,Type:Be,YAMLException:po,default:fa,dump:co,load:pt,loadAll:lo,safeDump:fo,safeLoad:ho,safeLoadAll:go,types:uo},Symbol.toStringTag,{value:"Module"}));function ma(n,e){const i={orientation:"landscape",dark_mode:!1,sleep_enabled:!1,sleep_start_hour:0,sleep_end_hour:5,manual_refresh_only:!1,deep_sleep_enabled:!1,deep_sleep_interval:600,daily_refresh_enabled:!1,daily_refresh_time:"08:00",refresh_interval:600};for(const o of n){const t=o.trim();if(!t.startsWith("#"))continue;let s;if((s=t.match(/TARGET DEVICE:\s*(.*)/i))&&(i.target_device=s[1].trim()),(s=t.match(/Name:\s*(.*)/i))&&(i.name=s[1].trim()),(s=t.match(/Resolution:\s*(\d+)x(\d+)/i))&&(i.width=parseInt(s[1],10),i.height=parseInt(s[2],10)),(s=t.match(/Shape:\s*(rect|round|circle)/i))&&(i.shape=s[1].toLowerCase()==="rect"?"rect":"round"),(s=t.match(/Inverted:\s*(true|false)/i))&&(i.inverted_colors=s[1].toLowerCase()==="true"),(s=t.match(/Orientation:\s*(landscape|portrait)/i))&&(i.orientation=s[1].toLowerCase()),(s=t.match(/Dark Mode:\s*(enabled|disabled)/i))&&(i.dark_mode=s[1].toLowerCase()==="enabled"),(s=t.match(/Refresh Interval:\s*(\d+)/i))&&(i.refresh_interval=parseInt(s[1],10)),s=t.match(/Power Strategy:\s*(.*)/i)){const r=s[1].trim().toLowerCase();i.sleep_enabled=r.includes("night"),i.manual_refresh_only=r.includes("manual"),i.deep_sleep_enabled=r.includes("ultra")||r.includes("deep"),i.daily_refresh_enabled=r.includes("daily")}(s=t.match(/Sleep Mode:\s*(enabled|disabled)/i))&&(i.sleep_enabled=s[1].toLowerCase()==="enabled"),(s=t.match(/Sleep Start Hour:\s*(\d+)/i))&&(i.sleep_start_hour=parseInt(s[1],10)),(s=t.match(/Sleep End Hour:\s*(\d+)/i))&&(i.sleep_end_hour=parseInt(s[1],10)),(s=t.match(/Manual Refresh:\s*(enabled|disabled)/i))&&(i.manual_refresh_only=s[1].toLowerCase()==="enabled"),(s=t.match(/Deep Sleep:\s*(enabled|disabled)/i))&&(i.deep_sleep_enabled=s[1].toLowerCase()==="enabled"),(s=t.match(/Deep Sleep Interval:\s*(\d+)/i))&&(i.deep_sleep_interval=parseInt(s[1],10)),(s=t.match(/Refresh Time:\s*(\d{2}:\d{2})/i))&&(i.daily_refresh_time=s[1]),(s=t.match(/Disable updates from\s*(\d+)\s*to\s*(\d+)/i))&&(i.no_refresh_start_hour=parseInt(s[1],10),i.no_refresh_end_hour=parseInt(s[2],10))}return e&&e.esphome&&e.esphome.name&&!i.name&&(i.name=e.esphome.name),i}function wt(n,e,i){const o={};if(n.startsWith("lvgl_")){Object.entries(e).forEach(([r,a])=>{["id","type","x","y","w","h","width","height"].includes(r)||(a==="true"?o[r]=!0:a==="false"?o[r]=!1:o[r]=a)}),o.hidden=e.hidden==="true",o.clickable=e.clickable!=="false",o.checkable=e.checkable==="true",o.scrollable=e.scrollable!=="false",o.floating=e.floating==="true",o.ignore_layout=e.ignore_layout==="true",o.scrollbar_mode=e.scrollbar_mode||"AUTO",o.opa=parseInt(e.opa||255,10);const t=e.grid_cell_row_pos??e.grid_row,s=e.grid_cell_column_pos??e.grid_col;o.grid_cell_row_pos=t!=null?parseInt(t,10):null,o.grid_cell_column_pos=s!=null?parseInt(s,10):null,o.grid_cell_row_span=parseInt(e.grid_cell_row_span||e.grid_row_span||1,10),o.grid_cell_column_span=parseInt(e.grid_cell_column_span||e.grid_col_span||1,10),o.grid_cell_x_align=e.grid_cell_x_align||e.grid_x_align||"STRETCH",o.grid_cell_y_align=e.grid_cell_y_align||e.grid_y_align||"STRETCH"}if(n==="icon")return{code:e.code||"F0595",size:parseInt(e.size||48,10),color:e.color||"black",fit_icon_to_frame:e.fit==="true"||e.fit==="1"};if(n==="text"||n==="label")return{text:e.text||"",font_size:parseInt(e.font_size||e.size||20,10),font_family:e.font_family||e.font||"Roboto",font_weight:parseInt(e.font_weight||e.weight||400,10),italic:e.italic==="true"||e.italic===!0,bpp:parseInt(e.bpp||1,10),color:e.color||"black",text_align:e.align||e.text_align||"TOP_LEFT"};if(n==="sensor_text")return e.entity_2&&(i.entity_id_2=e.entity_2),{label_font_size:parseInt(e.label_font||e.label_font_size||14,10),value_font_size:parseInt(e.value_font||e.value_font_size||20,10),value_format:e.format||"label_value",color:e.color||"black",italic:e.italic==="true"||e.italic===!0||e.font_style==="italic",font_family:e.font_family||"Roboto",font_weight:parseInt(e.font_weight||400,10),prefix:e.prefix||"",postfix:e.postfix||"",unit:e.unit||"",hide_unit:e.hide_unit==="true"||e.hide_unit===!0,precision:parseInt(e.precision||-1,10),text_align:e.align||e.text_align||"TOP_LEFT",label_align:e.label_align||e.align||e.text_align||"TOP_LEFT",value_align:e.value_align||e.align||e.text_align||"TOP_LEFT",is_local_sensor:e.local==="true",is_text_sensor:e.text_sensor==="true",separator:e.separator||" ~ "};if(n==="datetime")return i.width=parseInt(e.w||200,10),i.height=parseInt(e.h||60,10),{format:e.format||"time_date",time_font_size:parseInt(e.time_font_size||e.time_size||e.time_font||28,10),date_font_size:parseInt(e.date_font_size||e.date_size||e.date_font||16,10),color:e.color||"black",italic:e.italic==="true"||e.italic===!0||e.font_style==="italic",font_family:e.font_family||"Roboto",text_align:e.align||e.text_align||"CENTER"};if(n==="progress_bar")return{show_label:e.show_label!=="false",show_percentage:e.show_pct!=="false",bar_height:parseInt(e.bar_h||e.bar_height||15,10),border_width:parseInt(e.border_w||e.border||1,10),color:e.color||"black",is_local_sensor:e.local==="true"};if(n==="battery_icon")return{size:parseInt(e.size||32,10),font_size:parseInt(e.font_size||12,10),color:e.color||"black",is_local_sensor:e.local==="true",fit_icon_to_frame:e.fit==="true"||e.fit==="1"};if(n==="wifi_signal")return{size:parseInt(e.size||24,10),font_size:parseInt(e.font_size||12,10),color:e.color||"black",is_local_sensor:e.local!=="false",show_dbm:e.show_dbm!=="false",fit_icon_to_frame:e.fit==="true"||e.fit==="1"};if(n==="ondevice_temperature")return{size:parseInt(e.size||32,10),font_size:parseInt(e.font_size||16,10),label_font_size:parseInt(e.label_font_size||10,10),color:e.color||"black",unit:e.unit||"°C",precision:parseInt(e.precision||1,10),show_label:e.show_label!=="false",is_local_sensor:e.local!=="false",fit_icon_to_frame:e.fit==="true"||e.fit==="1"};if(n==="ondevice_humidity")return{size:parseInt(e.size||32,10),font_size:parseInt(e.font_size||16,10),label_font_size:parseInt(e.label_font_size||10,10),color:e.color||"black",unit:e.unit||"%",precision:parseInt(e.precision||0,10),show_label:e.show_label!=="false",is_local_sensor:e.local!=="false",fit_icon_to_frame:e.fit==="true"||e.fit==="1"};if(n==="weather_icon")return{size:parseInt(e.size||48,10),color:e.color||"black"};if(n==="qr_code")return{value:e.value||"https://esphome.io",scale:parseInt(e.scale||2,10),ecc:e.ecc||"LOW",color:e.color||"black"};if(n==="image")return{path:(e.path||"").replace(/^"|"$/g,""),invert:e.invert==="true"||e.invert==="1",dither:e.dither||"FLOYDSTEINBERG",transparency:e.transparency||"",image_type:e.img_type||"BINARY",render_mode:e.render_mode||"Auto"};if(n==="online_image")return{url:e.url||"",invert:e.invert==="true"||e.invert==="1",interval_s:parseInt(e.interval||300,10),render_mode:e.render_mode||"Auto"};if(n==="puppet")return{image_url:e.url||"",invert:e.invert==="true"||e.invert==="1",image_type:e.img_type||"RGB565",transparency:e.transparency||"opaque",render_mode:e.render_mode||"Auto"};if(n==="shape_rect")return{fill:e.fill==="true"||e.fill==="1",border_width:parseInt(e.border||1,10),color:e.color||"black",border_color:e.border_color||e.color||"black",opacity:parseInt(e.opacity||100,10)};if(n==="touch_area")return{title:e.title||"Touch Area",color:e.color||"rgba(0, 0, 255, 0.2)",border_color:e.border_color||"#0000ff",icon:e.icon||"",icon_pressed:e.icon_pressed||"",icon_size:parseInt(e.icon_size||40,10),icon_color:e.icon_color||"black",nav_action:e.nav_action||"none"};if(n==="rounded_rect")return{fill:e.fill==="true"||e.fill==="1",show_border:e.show_border!=="false"&&e.show_border!=="0",border_width:parseInt(e.border||4,10),radius:parseInt(e.radius||10,10),color:e.color||"black",border_color:e.border_color||"black",opacity:parseInt(e.opacity||100,10)};if(n==="shape_circle")return{fill:e.fill==="true"||e.fill==="1",border_width:parseInt(e.border||1,10),color:e.color||"black",border_color:e.border_color||e.color||"black",opacity:parseInt(e.opacity||100,10)};if(n==="line")return{stroke_width:parseInt(e.stroke||3,10),color:e.color||"black",orientation:e.orientation||"horizontal"};if(n==="graph")return e.entity&&(i.entity_id=e.entity),{duration:e.duration||"1h",border:e.border==="true"||e.border==="1"||e.border==null,grid:e.grid==="true"||e.grid==="1"||e.grid==null,color:e.color||"black",x_grid:e.x_grid||"",y_grid:e.y_grid||"",line_thickness:parseInt(e.line_thickness||3,10),line_type:e.line_type||"SOLID",continuous:e.continuous!=="false"&&e.continuous!=="0",min_value:e.min_value||"",max_value:e.max_value||"",min_range:e.min_range||"",max_range:e.max_range||"",is_local_sensor:e.local==="true"};if(n==="quote_rss")return{feed_url:e.feed_url||"https://www.brainyquote.com/link/quotebr.rss",show_author:e.show_author!=="false",random:e.random!=="false",refresh_interval:e.refresh_interval||e.refresh||"24h",quote_font_size:parseInt(e.quote_font_size||e.quote_font||18,10),author_font_size:parseInt(e.author_font_size||e.author_font||14,10),font_family:e.font_family||e.font||"Roboto",font_weight:parseInt(e.font_weight||e.weight||400,10),color:e.color||"black",text_align:e.align||e.text_align||"TOP_LEFT",word_wrap:e.word_wrap!=="false"&&e.wrap!=="false",italic_quote:e.italic_quote!=="false"};if(n==="weather_forecast")return{weather_entity:e.weather_entity||"",forecast_mode:e.forecast_mode||"daily",hourly_slots:e.hourly_slots||"06,09,12,15,18,21",start_offset:parseInt(e.start_offset||0,10),layout:e.layout||"horizontal",show_high_low:e.show_high_low!=="false",day_font_size:parseInt(e.day_font_size||12,10),temp_font_size:parseInt(e.temp_font_size||14,10),icon_size:parseInt(e.icon_size||32,10),font_family:e.font_family||"Roboto",color:e.color||"black"};if(n==="template_sensor_bar")return{show_wifi:e.wifi!=="false",show_temperature:e.temp!=="false",show_humidity:e.hum!=="false",show_battery:e.bat!=="false",show_background:e.bg!=="false",background_color:e.bg_color||"gray",border_radius:parseInt(e.radius||8,10),icon_size:parseInt(e.icon_size||20,10),font_size:parseInt(e.font_size||14,10),color:e.color||"black"};if(n==="template_nav_bar")return{show_prev:e.prev!=="false",show_home:e.home!=="false",show_next:e.next!=="false",show_background:e.bg!=="false",background_color:e.bg_color||"gray",border_radius:parseInt(e.radius||8,10),icon_size:parseInt(e.icon_size||24,10),color:e.color||"black"};if(n==="lvgl_button")return e.title&&(i.title=e.title),{...o,text:e.text||"BTN",bg_color:e.bg_color||"white",color:e.color||"black",border_width:parseInt(e.border_width||e.border||2,10),radius:parseInt(e.radius||5,10),checkable:e.checkable==="true"};if(n==="lvgl_arc")return e.title&&(i.title=e.title,o.title=e.title),{...o,min:parseInt(e.min||0,10),max:parseInt(e.max||100,10),value:parseInt(e.value||0,10),thickness:parseInt(e.thickness||10,10),color:e.color||"blue",start_angle:parseInt(e.start_angle||135,10),end_angle:parseInt(e.end_angle||45,10),mode:e.mode||"NORMAL"};if(n==="lvgl_chart")return e.title&&(i.title=e.title),{...o,title:e.title||"Graph",type:e.type||"LINE",color:e.color||"black",bg_color:e.bg_color||"white",point_count:parseInt(e.point_count||10,10),x_div_lines:parseInt(e.x_div_lines||3,10),y_div_lines:parseInt(e.y_div_lines||3,10)};if(n==="lvgl_img")return{...o,src:e.src||"symbol_image",rotation:parseInt(e.rotation||0,10),scale:parseInt(e.scale||256,10),pivot_x:parseInt(e.pivot_x||0,10),pivot_y:parseInt(e.pivot_y||0,10),color:e.color||"black"};if(n==="lvgl_qrcode")return{...o,text:e.text||"https://esphome.io",scale:parseInt(e.scale||2,10),color:e.color||"black",bg_color:e.bg_color||"white"};if(n==="lvgl_bar")return{...o,min:parseInt(e.min||0,10),max:parseInt(e.max||100,10),value:parseInt(e.value||0,10),color:e.color||"blue",bg_color:e.bg_color||"gray",start_value:parseInt(e.start_value||0,10),mode:e.mode||"NORMAL"};if(n==="lvgl_slider")return{...o,min:parseInt(e.min||0,10),max:parseInt(e.max||100,10),value:parseInt(e.value||30,10),border_width:parseInt(e.border_width||2,10),color:e.color||"blue",bg_color:e.bg_color||"gray",mode:e.mode||"NORMAL",vertical:e.vertical==="true"||e.vertical===!0};if(n==="lvgl_tabview")return{...o,bg_color:e.bg_color||"white",tabs:(e.tabs||"").split(",").map(t=>t.trim()).filter(t=>t)};if(n==="lvgl_tileview")return{...o,bg_color:e.bg_color||"white",tiles:[]};if(n==="lvgl_led")return{...o,color:e.color||"red",brightness:parseInt(e.brightness||255,10)};if(n==="lvgl_spinner")return{...o,spin_time:parseInt(e.spin_time||1e3,10),arc_length:parseInt(e.arc_length||60,10),arc_color:e.arc_color||"blue",track_color:e.track_color||"white"};if(n==="lvgl_checkbox")return{...o,text:(e.text||"Checkbox").replace(/^"|"$/g,""),checked:e.checked==="true"||e.checked===!0,color:e.color||"blue"};if(n==="lvgl_dropdown")return{...o,options:(e.options||"").replace(/\\n/g,`
`),selected_index:parseInt(e.selected_index||0,10),color:e.color||"white",direction:e.direction||"DOWN",max_height:parseInt(e.max_height||200,10)};if(n==="lvgl_keyboard")return{...o,mode:e.mode||"TEXT_UPPER",textarea_id:e.textarea||""};if(n==="lvgl_roller")return{...o,options:(e.options||"").replace(/\\n/g,`
`),visible_row_count:parseInt(e.visible_row_count||3,10),color:e.color||"white",bg_color:e.bg_color||"black",selected_bg_color:e.selected_bg_color||"blue",selected_text_color:e.selected_text_color||"white",mode:e.mode||"NORMAL"};if(n==="lvgl_spinbox")return{...o,min:parseInt(e.range_from||e.min||0,10),max:parseInt(e.range_to||e.max||100,10),digit_count:parseInt(e.digits||e.digit_count||4,10),step:parseInt(e.step||1,10),value:parseInt(e.value||0,10)};if(n==="lvgl_switch")return{...o,checked:e.state==="true"||e.state===!0||e.checked==="true",bg_color:e.bg_color||"gray",color:e.color||"blue",knob_color:e.knob_color||"white"};if(n==="lvgl_textarea")return{...o,placeholder:(e.placeholder_text||e.placeholder||"").replace(/^"|"$/g,""),text:(e.text||"").replace(/^"|"$/g,""),one_line:e.one_line==="true"||e.one_line===!0,max_length:parseInt(e.max_length||0,10),password_mode:e.password_mode==="true",accepted_chars:e.accepted_chars||""};if(n==="lvgl_label")return{...o,text:(e.text||"Label").replace(/^"|"$/g,""),font_size:parseInt(e.font_size||e.size||20,10),font_family:e.font_family||"Roboto",font_weight:parseInt(e.font_weight||400,10),italic:e.italic==="true"||e.italic===!0,color:e.color||"black",bg_color:e.bg_color||"transparent",text_align:e.text_align||e.align||"CENTER"};if(n==="lvgl_line")return{...o,orientation:e.orientation||"horizontal",points:e.points||"",line_width:parseInt(e.line_width||3,10),line_color:e.line_color||e.color||"black",line_rounded:e.line_rounded!=="false"};if(n==="lvgl_meter")return{...o,min:parseInt(e.min||0,10),max:parseInt(e.max||100,10),value:parseInt(e.value||60,10),color:e.color||"black",indicator_color:e.indicator_color||"red",tick_count:parseInt(e.tick_count||11,10),tick_length:parseInt(e.tick_length||10,10),label_gap:parseInt(e.label_gap||10,10),scale_width:parseInt(e.scale_width||10,10),indicator_width:parseInt(e.indicator_width||4,10)};if(n==="lvgl_obj")return{...o,color:e.color||"white",border_width:parseInt(e.border_width||1,10),border_color:e.border_color||"gray",radius:parseInt(e.radius||0,10)};if(n==="calendar")return{entity_id:e.entity||"sensor.esp_calendar_data",border_width:parseInt(e.border_width||2,10),show_border:e.show_border!=="false",border_color:e.border_color||"black",background_color:e.background_color||"white",text_color:e.text_color||"black",font_size_date:parseInt(e.font_size_date||100,10),font_size_day:parseInt(e.font_size_day||24,10),font_size_grid:parseInt(e.font_size_grid||14,10),font_size_event:parseInt(e.font_size_event||18,10)};if(n.startsWith("lvgl_")){b.log("[YAML_IMPORT] Parsing generic LVGL",n,e.id,e);const t=["hidden","clickable","checkable","scrollable","floating","ignore_layout","scrollbar_mode","opa","grid_cell_row_pos","grid_cell_column_pos","grid_cell_row_span","grid_cell_column_span","grid_cell_x_align","grid_cell_y_align"];return Object.entries(e).forEach(([s,r])=>{if(s==="id"||s==="type"||s==="x"||s==="y"||s==="w"||s==="h"||t.includes(s))return;if(s==="title"){i.title=r;return}let a=r;if(Array.isArray(r))s==="options"?a=r.join(`
`):s==="points"&&(a=r.map(l=>Array.isArray(l)?l.join(","):String(l)).join(" "));else if(typeof r=="string"&&(/^-?\d+(\.\d+)?(ms|deg|px|%)$/.test(r)&&(a=r.replace(/(ms|deg|px|%)$/,"")),a.includes("\\u")))try{a=JSON.parse(`"${a}"`)}catch{}a==="true"?o[s]=!0:a==="false"?o[s]=!1:typeof a=="string"&&!isNaN(a)&&a!==""&&s!=="text"&&s!=="id"?o[s]=parseFloat(a):o[s]=a}),o}return o}function ya(n,e){let i;if(i=n.match(/^it\.rectangle\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*COLOR_OFF)?\s*\)\s*;?/),i)return{id:"w_rect_"+e,type:"shape_rect",x:parseInt(i[1],10),y:parseInt(i[2],10),width:parseInt(i[3],10),height:parseInt(i[4],10),title:"",entity_id:"",props:{fill:!1,border_width:1,color:"black",opacity:100}};if(i=n.match(/^it\.filled_rectangle\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*COLOR_OFF)?\s*\)\s*;?/),i)return{id:"w_frect_"+e,type:"shape_rect",x:parseInt(i[1],10),y:parseInt(i[2],10),width:parseInt(i[3],10),height:parseInt(i[4],10),title:"",entity_id:"",props:{fill:!0,border_width:1,color:"black",opacity:100}};if(i=n.match(/^it\.circle\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*COLOR_OFF)?\s*\)\s*;?/),i){const o=parseInt(i[3],10);return{id:"w_circle_"+e,type:"shape_circle",x:parseInt(i[1],10)-o,y:parseInt(i[2],10)-o,width:o*2,height:o*2,title:"",entity_id:"",props:{fill:!1,border_width:1,color:"black",opacity:100}}}if(i=n.match(/^it\.filled_circle\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*COLOR_OFF)?\s*\)\s*;?/),i){const o=parseInt(i[3],10);return{id:"w_fcircle_"+e,type:"shape_circle",x:parseInt(i[1],10)-o,y:parseInt(i[2],10)-o,width:o*2,height:o*2,title:"",entity_id:"",props:{fill:!0,border_width:1,color:"black",opacity:100}}}if(i=n.match(/^it\.line\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*;?/),i){const o=parseInt(i[1],10),t=parseInt(i[2],10),s=parseInt(i[3],10),r=parseInt(i[4],10);return{id:"w_line_"+e,type:"line",x:o,y:t,width:s-o,height:r-t,title:"",entity_id:"",props:{stroke_width:1,color:"black",orientation:Math.abs(r-t)>Math.abs(s-o)?"vertical":"horizontal"}}}return null}function _a(n,e,i,o,t){const s=new Map,r=new Map,a=new Map,l=new Map,c=new Map,d=new Map,p=new Map,h=new Map,u=new Map,m=new Map,y=(k,P,A)=>{const j=[];let N=P;for(;N<k.length;){const H=k[N];if(!H){N++;continue}const B=H.trim();if(!B||B.startsWith("#")){j.push(H),N++;continue}const $=H.match(/^(\s*)/);if(($?$[1].length:0)<A)break;j.push(H),N++}try{const H=j.join(`
`);return{value:t.load(H,{schema:o()}),nextJ:N}}catch(H){return b.error("Error parsing YAML sub-block:",H),{value:null,nextJ:N}}};let f=null,_=!1;const v=["label","button","arc","bar","slider","chart","dropdown","roller","spinbox","switch","textarea","obj","img","qrcode","led","spinner","line","meter","tabview","tileview","checkbox","keyboard","buttonmatrix","list","icon"],S={label:"lvgl_label",button:"lvgl_button",arc:"lvgl_arc",bar:"lvgl_bar",slider:"lvgl_slider",chart:"lvgl_chart",dropdown:"lvgl_dropdown",roller:"lvgl_roller",spinbox:"lvgl_spinbox",switch:"lvgl_switch",textarea:"lvgl_textarea",obj:"lvgl_obj",img:"lvgl_img",qrcode:"lvgl_qrcode",led:"lvgl_led",spinner:"lvgl_spinner",line:"lvgl_line",meter:"lvgl_meter",tabview:"lvgl_tabview",tileview:"lvgl_tileview",checkbox:"lvgl_checkbox",keyboard:"lvgl_keyboard",buttonmatrix:"lvgl_buttonmatrix",icon:"icon"};for(let k=0;k<n.length;k++){const P=n[k],A=P.trim();if(!A)continue;let j=P.match(/if\s*\(\s*(?:id\s*\(\s*display_page\s*\)|page|currentPage)\s*==\s*(\d+)\s*\)/);j&&(f=parseInt(j[1],10),_=!1,s.has(f)||s.set(f,[]));const N=P.match(/^\s*-\s*id:\s*(\w+)/);if(N){const G=N[1],le=G.match(/^page_(\d+)$/);let Y=le?parseInt(le[1],10):s.size;s.has(Y)||(s.set(Y,[]),a.set(Y,G)),f=Y,_=!1}const H=P.match(/^\s*layout:\s*(\d+x\d+)/);if(H&&f!==null&&m.set(f,H[1]),A.startsWith("widgets:")){_=!0;continue}const B=P.match(/case\s+(\d+):\s*interval\s*=\s*(\d+);/);if(B){const G=parseInt(B[1],10);r.set(G,parseInt(B[2],10)),s.has(G)||s.set(G,[])}const $=P.match(/\/\/\s*page:name\s+"(.+)"/);$&&f!==null&&a.set(f,$[1]);const re=P.match(/\/\/\s*page:dark_mode\s+"(.+)"/);re&&f!==null&&l.set(f,re[1]);const te=P.match(/\/\/\s*page:refresh_type\s+"(.+)"/);te&&f!==null&&c.set(f,te[1]);const U=P.match(/\/\/\s*page:refresh_time\s+"(.*)"/);U&&f!==null&&d.set(f,U[1]);const se=P.match(/\/\/\s*page:visible_from\s+"(.*)"/);se&&f!==null&&p.set(f,se[1]);const ie=P.match(/\/\/\s*page:visible_to\s+"(.*)"/);if(ie&&f!==null&&h.set(f,ie[1]),!_){const G=P.match(/^\s*bg_color:\s*(.*)/);if(G&&f!==null){let Y=G[1].trim().replace(/^["']|["']$/g,"");Y.startsWith("0x")&&(Y="#"+Y.substring(2)),u.has(f)||u.set(f,{}),u.get(f).bg_color=Y}const le=P.match(/^\s*bg_opa:\s*(.*)/);if(le&&f!==null){let Y=le[1].trim().replace(/^["']|["']$/g,"");Y.endsWith("%")&&(Y=String(Math.round(parseFloat(Y)*2.55))),u.has(f)||u.set(f,{}),u.get(f).bg_opa=parseInt(Y,10)}}}s.size===0&&s.set(0,[]);const w={settings:i,pages:Array.from(s.entries()).sort((k,P)=>k[0]-P[0]).map(([k,P])=>({id:`page_${k}`,name:a.has(k)?a.get(k):`Page ${k+1}`,refresh_s:r.has(k)?r.get(k):null,refresh_type:c.has(k)?c.get(k):"interval",refresh_time:d.has(k)?d.get(k):"",visible_from:p.has(k)?p.get(k):"",visible_to:h.has(k)?h.get(k):"",dark_mode:l.has(k)?l.get(k):"inherit",layout:m.has(k)?m.get(k):null,bg_color:u.has(k)?u.get(k).bg_color:null,bg_opa:u.has(k)?u.get(k).bg_opa:null,widgets:[]}))};f=0;const E=()=>{const k=w.pages.find((P,A)=>A===f);return k?k.widgets:w.pages[0].widgets},x=k=>{const P=k.match(/^(?:#\s*|\/\/\s*)widget:(\w+)\s+(.+)$/);if(!P)return null;const A=P[1],j=P[2],N={},H=/(\w+):(?:"([^"]*)"|([^:]*?)(?=\s+\w+:|$))/g;let B;for(;(B=H.exec(j))!==null;){let $=B[2]!==void 0?B[2]:B[3];$&&($=$.trim()),N[B[1]]=$}return{widgetType:A,props:N}};let I=!1;for(let k=0;k<n.length;k++){const P=n[k],A=P.trim();if(!A||A.startsWith("#")&&!A.match(/^#\s*widget:/))continue;let j=A.match(/if\s*\(\s*(?:id\s*\(\s*display_page\s*\)|page|currentPage)\s*==\s*(\d+)\s*\)/);if(j){f=parseInt(j[1],10);continue}const N=A.match(/^-\s*id:\s*(\w+)/);if(N){const te=N[1],U=te.match(/^page_(\d+)$/);f=U?parseInt(U[1],10):Array.from(a.entries()).find(([se,ie])=>ie===te)?.[0]||0;continue}const H=E();if(I)if(A.match(/^(?:#\s*|\/\/\s*)widget:/)||A.match(/^\s*-\s*id:/)||!P.match(/^\s/))I=!1;else continue;if(A.startsWith("//")||A.startsWith("#")){const te=x(A);if(te&&te.props.id){const U=te.props,se=te.widgetType||U.type;if(!se)continue;const ie={id:U.id,type:se,x:parseInt(U.x||0,10),y:parseInt(U.y||0,10),width:parseInt(U.w||100,10),height:parseInt(U.h||30,10),title:U.title||"",entity_id:U.entity||U.ent||"",props:{}};ie.props=wt(se,U,ie),H.push(ie),I=!0;continue}continue}const B=ya(A,H.length);if(B){H.push(B);continue}const $=new RegExp(`^(\\s*)-?\\s*(${v.join("|")}):\\s*(.*)$`),re=P.match($);if(re){const te=re[1].length,U=re[2],se=re[3].trim(),ie=S[U]||`lvgl_${U}`,G={};se&&(G._inline=se.replace(/^["']|["']$/g,""));const le=y(n,k+1,te+2);Object.assign(G,le.value),k=le.nextJ-1;const Y={id:G.id||`lv_${U}_${H.length}`,type:ie,x:parseInt(G.x||0,10),y:parseInt(G.y||0,10),width:parseInt(G.width||G.w||100,10),height:parseInt(G.height||G.h||30,10),title:G.title||G.name||"",entity_id:G.entity_id||G.entity||G.sensor||"",props:{}};Y.props=wt(ie,G,Y),H.push(Y),Array.isArray(G.widgets)&&G.widgets.forEach(We=>{const O=Object.keys(We)[0],F=We[O];if(O&&F){const J=S[O]||`lvgl_${O}`,Se={id:F.id||`lv_${O}_${H.length}`,type:J,x:Y.x+parseInt(F.x||0,10),y:Y.y+parseInt(F.y||0,10),width:parseInt(F.width||F.w||50,10),height:parseInt(F.height||F.h||20,10),props:{}};Se.props=wt(J,F,Se),H.push(Se)}})}}return w}function ba(n,e){const i=[];let o=!1,t=0,s=null;for(const r of n){const a=r.replace(/\t/g,"    "),l=a.trim();if(!o){if(a.match(/^\s*lambda:\s*\|\-/)){o=!0,s="lambda",t=0;continue}else if(a.match(/^\s*lvgl:\s*$/)){o=!0,s="lvgl",t=0;continue}else if(a.match(/^\s*"?(?:open_epaper_link\.drawcustom|payload)"?:\s*(?:\[|\|-)?/)){o=!0,s="oepl",t=0;continue}else if(a.match(/^\s*service:\s*opendisplay\.drawcustom/)){o=!0,s="odp_service",t=0;continue}else if(a.match(/^\s*"actions":\s*\[/)){o=!0,s="odp",t=0;continue}}if(o){const c=a.match(/^(\s*)/),d=c?c[1].length:0;if(l===""){i.push("");continue}if(t===0&&l!==""&&!l.startsWith("#")&&!l.startsWith("//")&&(t=d),l.startsWith("#")||l.startsWith("//")){i.push(a);continue}if(t!==0&&d<t&&l!==""&&(a.match(/^\w+:/)||a.match(/^\s*}/)||d<t)){o=!1;continue}s==="lambda"?i.push(a.slice(t)):i.push(a)}}return b.log(`[extractLambdaLines] Collected ${i.length} lines from ${s} block`),i}const va=["text","rectangle","circle","icon","qrcode","progress_bar","debug_grid","line","multiline","plot","dlimg","image","rectangle_pattern","polygon","ellipse","arc","icon_sequence"];function xa(n){if(!n.trim().startsWith("-"))return!1;const i=/^\s*(?:-\s*)?type:\s*["']?([\w_]+)["']?/m,o=n.match(i);if(o){const t=o[1].toLowerCase();if(va.includes(t))return!0}return!1}function wa(n){if(!n||typeof n!="string"||!n.includes("{{"))return null;const e=n.match(/^(.*?){{\s*states\(['"]([^'"]+)['"]\)\s*}}(.*)$/s);return e?{prefix:e[1],entity_id:e[2].trim(),postfix:e[3]}:null}function Mn(n){b.log("[parseOEPLArrayToLayout] Parsing OEPL array with",n.length,"items");const e={settings:{orientation:"landscape",dark_mode:!1},pages:[{id:"page_0",name:"Main",widgets:[]}]},i=e.pages[0].widgets;return n.forEach((o,t)=>{if(!o||!o.type)return;const s=o.type.toLowerCase();let r={id:o.id||`oepl_${s}_${t}`,type:s,x:parseInt(o.x??0,10),y:parseInt(o.y??0,10),width:100,height:30,entity_id:"",props:{}};switch(s){case"text":const a=o.value||o.text||"",l=wa(a),c=parseInt(o.size||20,10);l?(r.type="sensor_text",r.entity_id=l.entity_id,r.width=c*8,r.height=c*1.5,r.props={value_font_size:c,font_family:o.font?o.font.replace(".ttf",""):"Roboto",color:o.fill||o.color||"black",prefix:l.prefix,postfix:l.postfix,value_format:"value_only",hide_unit:!0}):(r.width=c*6,r.height=c*1.5,r.props={text:a,font_size:c,font_family:o.font?o.font.replace(".ttf",""):"Roboto",color:o.fill||o.color||"black"});break;case"multiline":const d=o.delimiter||"|",p=(o.value||"").split(d),h=parseInt(o.size||16,10),u=parseInt(o.offset_y||h+4,10);r.type="odp_multiline",r.width=h*10,r.height=u*(p.length||1),r.props={text:o.value||"",delimiter:d,font_size:h,font_family:o.font?o.font.replace(".ttf",""):"Roboto",color:o.fill||o.color||"black",line_spacing:Math.max(0,u-h)};break;case"rectangle":r.type="shape_rect",r.x=parseInt(o.x_start||o.x||0,10),r.y=parseInt(o.y_start||o.y||0,10),r.width=Math.abs(parseInt(o.x_end||100,10)-r.x),r.height=Math.abs(parseInt(o.y_end||50,10)-r.y),r.props={fill:o.fill?o.fill!=="white"&&o.fill!=="#ffffff":!1,border_width:parseInt(o.width||1,10),color:o.fill||"white",border_color:o.outline||"black",opacity:100};break;case"circle":r.type="shape_circle";const m=parseInt(o.radius||25,10);r.x=parseInt(o.x||0,10)-m,r.y=parseInt(o.y||0,10)-m,r.width=m*2,r.height=m*2,r.props={fill:o.fill?o.fill!=="white"&&o.fill!=="#ffffff":!1,border_width:parseInt(o.width||1,10),color:o.fill||"black",border_color:o.outline||o.fill||"black",opacity:100};break;case"icon":const y=parseInt(o.size||24,10);r.width=y,r.height=y,r.props={code:o.value||"mdi:home",size:y,color:o.fill||o.color||"black",fit_icon_to_frame:!0};break;case"qrcode":const f=parseInt(o.boxsize||2,10),v=(25+parseInt(o.border||1,10)*2)*f;r.type="qr_code",r.width=v,r.height=v,r.props={value:o.data||o.value||"https://esphome.io",scale:f,ecc:"LOW",color:o.color||"black"};break;case"progress_bar":r.x=parseInt(o.x_start||o.x||0,10),r.y=parseInt(o.y_start||o.y||0,10),r.width=Math.abs(parseInt(o.x_end||100,10)-r.x),r.height=Math.abs(parseInt(o.y_end||20,10)-r.y),r.props={show_label:!1,show_percentage:o.show_percentage===!0||o.show_percentage==="true",bar_height:r.height,border_width:parseInt(o.width||1,10),color:o.fill||"black",progress_value:parseInt(o.progress||0,10),direction:o.direction||"right"};break;case"line":r.x=parseInt(o.x_start||o.x||0,10),r.y=parseInt(o.y_start||o.y||0,10);const S=parseInt(o.x_end||100,10),w=parseInt(o.y_end||r.y,10);r.width=Math.abs(S-r.x)||1,r.height=Math.abs(w-r.y)||1,r.props={stroke_width:parseInt(o.width||1,10),color:o.fill||o.color||"black",orientation:Math.abs(w-r.y)>Math.abs(S-r.x)?"vertical":"horizontal"};break;case"debug_grid":r.type="odp_debug_grid",r.x=0,r.y=0,r.width=800,r.height=480,r.props={spacing:parseInt(o.spacing||20,10),line_color:o.line_color||"black",dashed:o.dashed!==!1,dash_length:parseInt(o.dash_length||2,10),space_length:parseInt(o.space_length||4,10),show_labels:o.show_labels!==!1,label_step:parseInt(o.label_step||40,10),label_color:o.label_color||"black",label_font_size:parseInt(o.label_font_size||12,10)};break;case"dlimg":case"image":r.type="online_image",r.width=parseInt(o.xsize||o.width||100,10),r.height=parseInt(o.ysize||o.height||100,10),r.props={url:o.url||"",invert:!1,interval_s:300,rotation:parseInt(o.rotate||0,10)};break;case"plot":r.type="odp_plot",r.x=parseInt(o.x_start||o.x||0,10),r.y=parseInt(o.y_start||o.y||0,10),r.width=Math.abs(parseInt(o.x_end||200,10)-r.x),r.height=Math.abs(parseInt(o.y_end||100,10)-r.y),r.props={duration:o.duration||86400,data:Array.isArray(o.data)?o.data:o.data?[o.data]:[],background:o.background||"white",outline:o.outline||"#ccc",ylegend:o.ylegend||null};break;case"rectangle_pattern":r.type="odp_rectangle_pattern",r.x=parseInt(o.x_start||o.x||0,10),r.y=parseInt(o.y_start||o.y||0,10),r.width=Math.abs(parseInt(o.x_end||120,10)-r.x)||120,r.height=Math.abs(parseInt(o.y_end||80,10)-r.y)||80,r.props={x_size:parseInt(o.x_size||30,10),y_size:parseInt(o.y_size||15,10),x_offset:parseInt(o.x_offset||5,10),y_offset:parseInt(o.y_offset||5,10),x_repeat:parseInt(o.x_repeat||3,10),y_repeat:parseInt(o.y_repeat||2,10),fill:o.fill||"white",outline:o.outline||"black",border_width:parseInt(o.width||1,10)};break;case"polygon":if(r.type="odp_polygon",Array.isArray(o.points)&&o.points.length>0){const A=o.points.map(B=>B[0]),j=o.points.map(B=>B[1]),N=Math.min(...A),H=Math.min(...j);r.x=N,r.y=H,r.width=Math.max(...A)-N||100,r.height=Math.max(...j)-H||100,r.props={points:o.points.map(([B,$])=>[B-N,$-H]),fill:o.fill||"red",outline:o.outline||"black",border_width:parseInt(o.width||1,10)}}break;case"ellipse":r.type="odp_ellipse",r.x=parseInt(o.x_start||o.x||0,10),r.y=parseInt(o.y_start||o.y||0,10),r.width=Math.abs(parseInt(o.x_end||150,10)-r.x)||150,r.height=Math.abs(parseInt(o.y_end||80,10)-r.y)||80,r.props={fill:o.fill||null,outline:o.outline||"black",border_width:parseInt(o.width||1,10)};break;case"arc":const E=parseInt(o.radius||50,10);r.type="odp_arc",r.x=parseInt(o.x||0,10)-E,r.y=parseInt(o.y||0,10)-E,r.width=E*2,r.height=E*2,r.props={radius:E,start_angle:parseInt(o.start_angle||0,10),end_angle:parseInt(o.end_angle||90,10),outline:o.outline||"black",border_width:parseInt(o.width||2,10)};break;case"icon_sequence":const x=parseInt(o.size||24,10),I=parseInt(o.spacing||6,10),k=o.icons||["mdi:home","mdi:arrow-right","mdi:office-building"],P=o.direction==="down";r.type="odp_icon_sequence",r.width=P?x:k.length*(x+I)-I,r.height=P?k.length*(x+I)-I:x,r.props={icons:k,size:x,direction:o.direction||"right",spacing:I,fill:o.fill||"black"};break;default:b.warn(`[parseOEPLArrayToLayout] Unknown OEPL type: ${s}`);return}i.push(r)}),e}function Dn(){if(!mo||!Be||!Ye)return null;try{const n=new Be("!lambda",{kind:"scalar",construct:o=>o}),e=new Be("!secret",{kind:"scalar",construct:o=>o}),i=new Be("!include",{kind:"scalar",construct:o=>o});return Ye.extend([n,e,i])}catch{return b.warn("[getESPHomeSchema] Could not extend schema, falling back to default."),Ye}}function On(n){b.log("[parseSnippetYamlOffline] Start parsing...");const e=n.split(/\r?\n/);let i={};try{const r=Dn();i=pt(n,r?{schema:r}:{})||{}}catch(r){b.error("[parseSnippetYamlOffline] YAML parse error:",r)}if(xa(n)&&Array.isArray(i))return b.log("[parseSnippetYamlOffline] Detected bare OEPL/ODP array format"),Mn(i);if(i&&i.service&&["opendisplay.drawcustom","open_epaper_link.drawcustom"].includes(i.service)&&i.data&&i.data.payload){let r=i.data.payload;if(typeof r=="string")try{r=pt(r)}catch(a){b.error("[parseSnippetYamlOffline] Failed to re-parse payload string:",a)}if(Array.isArray(r))return b.log("[parseSnippetYamlOffline] Detected full ODP/OEPL service call"),Mn(r)}const o=[];if(i.display&&(Array.isArray(i.display)?i.display:[i.display]).forEach(a=>{a&&a.lambda&&o.push(...a.lambda.split(`
`))}),o.length===0||n.includes("lvgl:")){const r=ba(e);o.push(...r)}const t=ma(e,i);return _a(o,e,t,Dn,mo)}function we(n){if(!n)return;b.log("[loadLayoutIntoState] Loading layout...");let e=n;if(n.data&&n.data.devices){const i=Object.keys(n.data.devices)[0];e=n.data.devices[i]}if(e.name?g.setDeviceName(e.name):e.deviceName&&g.setDeviceName(e.deviceName),e.device_model?g.setDeviceModel(e.device_model):e.deviceModel&&g.setDeviceModel(e.deviceModel),e.device_id?g.setCurrentLayoutId(e.device_id):e.currentLayoutId&&g.setCurrentLayoutId(e.currentLayoutId),e.settings&&g.updateSettings&&g.updateSettings(e.settings),e.customHardware&&g.setCustomHardware&&g.setCustomHardware(e.customHardware),e.pages&&g.setPages){const i=e.pages.map(o=>({...o,widgets:(o.widgets||[]).map(t=>({...t,locked:!!t.locked}))}));g.setPages(i)}b.log("[loadLayoutIntoState] Finished loading state.")}let me=[],St=!1,Sa=!1,Qe=!1;function de(){const n={"Content-Type":"application/json"},e=mt();return e&&e.trim()!==""&&e!=="null"&&(n.Authorization=`Bearer ${e}`),n}const Rt="entity-datalist-global";let Ee=null;function yo(){return Ee||(Ee=document.getElementById(Rt),Ee||(Ee=document.createElement("datalist"),Ee.id=Rt,document.body.appendChild(Ee))),Ee}function Ea(n){const e=yo();e.innerHTML="",!(!n||n.length===0)&&(n.forEach(i=>{const o=document.createElement("option");o.value=i.entity_id,o.label=i.name||i.entity_id,e.appendChild(o)}),b.log(`[EntityDatalist] Updated with ${n.length} entities`))}async function Le(){if(!z())return[];if(St)return me;St=!0;try{const n=new AbortController,e=setTimeout(()=>n.abort(),1e4),i=V.includes("api/esphome_designer")&&!window.location.pathname.includes("esphome-designer");let o,t=!1;const s=mt();o=`${V}/entities?domains=sensor,binary_sensor,weather,light,switch,fan,cover,climate,media_player,input_number,number,input_boolean,input_text,input_select,button,input_button,calendar,person,device_tracker,sun,update,scene`,b.log("[EntityStates] Fetching from:",o);let r;try{r=await fetch(o,{headers:de(),signal:n.signal})}catch(l){if(s&&V)o=`${V.replace("/api/esphome_designer","")}/api/states`,b.log("[EntityStates] Custom endpoint failed, trying native HA API:",o),t=!0,r=await fetch(o,{headers:de(),signal:n.signal});else throw l}if(clearTimeout(e),!r.ok)return b.warn("[EntityStates] Failed to fetch:",r.status),Qe=!0,[];let a=await r.json();if(t&&Array.isArray(a)){const l=["sensor","binary_sensor","weather","light","switch","fan","cover","climate","media_player","input_number","number","input_boolean","input_text","input_select","button","input_button","calendar","person","device_tracker","sun","update","scene"];a=a.filter(c=>{const d=c.entity_id?.split(".")[0];return l.includes(d)}).map(c=>({entity_id:c.entity_id,name:c.attributes?.friendly_name||c.entity_id,state:c.state,unit:c.attributes?.unit_of_measurement,attributes:c.attributes||{}}))}return Array.isArray(a)?(b.log(`[EntityStates] Received ${a.length} entities`),me=a.map(l=>{const c=l.unit?`${l.state} ${l.unit}`:l.state;return{entity_id:l.entity_id,name:l.name||l.entity_id,state:l.state,unit:l.unit,attributes:l.attributes||{},formatted:c}}),Sa=!0,Qe=!1,b.log(`[EntityStates] Cached ${me.length} entity states`),g&&(g.entityStates={},me.forEach(l=>{g.entityStates[l.entity_id]=l}),b.log(`[EntityStates] Populated AppState.entityStates with ${Object.keys(g.entityStates).length} entries`)),Ea(me),L(C.ENTITIES_LOADED,me),me):(b.warn("[EntityStates] Invalid response format"),Qe=!0,[])}catch(n){return n.name==="AbortError"?b.warn("[EntityStates] Request timed out after 10 seconds"):b.warn("[EntityStates] Error fetching:",n),Qe=!0,[]}finally{St=!1}}function od(n){const e=me.find(i=>i.entity_id===n);return e?e.attributes:null}let Rn=!1;async function sd(n,e="24h"){if(!z()||!n)return[];try{const i=`${V}/history/${encodeURIComponent(n)}?duration=${encodeURIComponent(e)}`,o=await fetch(i,{headers:de()});if(!o.ok){const s=await o.text().catch(()=>"Unknown error");return Rn||(b.log(`[EntityHistory] History fetch failed for ${n}: ${s}`),Rn=!0),[]}const t=await o.json();return Array.isArray(t)?t:[]}catch{return[]}}async function Ia(){if(!z()){b.warn("Cannot load layout from backend: No HA backend detected.");return}try{let n=null;try{const o=await fetch(`${V}/layouts`,{headers:de()});if(o.ok){const t=await o.json();b.log("[loadLayoutFromBackend] Available layouts:",t.layouts?.map(s=>s.id)),b.log(`[loadLayoutFromBackend] Last active layout ID from backend: ${t.last_active_layout_id}`),t.last_active_layout_id&&(t.layouts?.some(r=>r.id===t.last_active_layout_id)?(n=t.last_active_layout_id,b.log(`[loadLayoutFromBackend] Loading last active layout: ${n}`)):b.warn(`[loadLayoutFromBackend] Last active layout '${t.last_active_layout_id}' no longer exists`)),!n&&t.layouts&&t.layouts.length>0&&(n=t.layouts[0].id,b.log(`[loadLayoutFromBackend] No valid last active, using first layout: ${n}`))}}catch(o){b.warn("[loadLayoutFromBackend] Could not fetch layouts list:",o)}let e;if(n?e=await fetch(`${V}/layouts/${n}`,{headers:de()}):e=await fetch(`${V}/layout`,{headers:de()}),!e.ok)throw new Error(`Failed to load layout: ${e.status}`);const i=await e.json();!i.device_id&&n&&(i.device_id=n),b.log(`[loadLayoutFromBackend] Loaded layout '${i.device_id||n||"default"}':`,{name:i.name,device_model:i.device_model,pages:i.pages?.length,widgets:i.pages?.reduce((o,t)=>o+(t.widgets?.length||0),0),renderingMode:i.renderingMode||i.rendering_mode}),g&&(i.device_id||n)&&g.setCurrentLayoutId(i.device_id||n),typeof we=="function"?we(i):b.error("[loadLayoutFromBackend] loadLayoutIntoState function missing!"),L(C.LAYOUT_IMPORTED,i)}catch(n){b.error("Error loading layout from backend:",n),T(()=>Promise.resolve().then(()=>_o),void 0,import.meta.url).then(e=>e.showToast("Error loading layout from backend",5e3,"error"))}}let Et=!1,It=!1;async function he(){if(!z())return!1;if(Et)return It=!0,b.log("[saveLayoutToBackend] Save already in progress, queuing..."),!1;if(!g)throw new Error("AppState not available");const n=g.currentLayoutId||"reterminal_e1001",e=g.settings.device_model||g.deviceModel||"reterminal_e1001",o={...g.getPagesPayload(),device_id:n,name:g.deviceName||"Layout 1",device_model:e,deviceName:g.deviceName||"Layout 1"};Et=!0,It=!1;try{b.log(`[saveLayoutToBackend] Saving to layout '${n}':`,{device_model:e,pages:o.pages?.length,widgets:o.pages?.reduce((a,l)=>a+(l.widgets?.length||0),0),renderingMode:o.renderingMode});const t=new AbortController,s=setTimeout(()=>t.abort(),1e4),r=await fetch(`${V}/layouts/${n}`,{method:"POST",headers:de(),body:JSON.stringify(o),signal:t.signal});if(clearTimeout(s),!r.ok){const a=await r.json().catch(()=>({}));throw new Error(a.message||a.error||`Save failed: ${r.status}`)}return b.log(`[saveLayoutToBackend] Layout '${n}' saved successfully`),!0}catch(t){if(t.name==="AbortError")return!0;if(t.message?.includes("Failed to fetch")||t.message?.includes("NetworkError")||t.message?.includes("net::ERR_")||t.message?.includes("ERR_EMPTY_RESPONSE")||t.message?.includes("Load failed"))return!1;throw b.error("Failed to save layout to backend:",t),t}finally{Et=!1,It&&setTimeout(()=>{he().catch(()=>{})},500)}}async function Ca(n){if(!z())throw new Error("No backend");const e=await fetch(`${V}/import_snippet`,{method:"POST",headers:de(),body:JSON.stringify({yaml:n})});if(!e.ok){const i=await e.json().catch(()=>({}));throw new Error(i.message||i.error||`Import failed with status ${e.status}`)}return await e.json()}function ka(n){const e=document.getElementById("importSnippetError");e&&(e.textContent=n||"")}function M(n,e="info",i=3e3){let o=document.getElementById("toast-container");o||(o=document.createElement("div"),o.id="toast-container",o.style.position="fixed",o.style.bottom="20px",o.style.right="20px",o.style.zIndex="9999",document.body.appendChild(o));const t=document.createElement("div");t.className="toast",e==="error"?t.style.background="rgba(255, 0, 0, 0.8)":e==="success"?t.style.background="rgba(0, 128, 0, 0.8)":t.style.background="rgba(0,0,0,0.8)",t.textContent=n,t.style.color="white",t.style.padding="10px 20px",t.style.borderRadius="4px",t.style.marginTop="10px",t.style.opacity="0",t.style.transition="opacity 0.3s",o.appendChild(t),requestAnimationFrame(()=>{t.style.opacity="1"}),setTimeout(()=>{t.style.opacity="0",setTimeout(()=>{t.remove()},300)},i)}const _o=Object.freeze(Object.defineProperty({__proto__:null,setImportError:ka,showToast:M},Symbol.toStringTag,{value:"Module"}));function bo(n){if(!n||typeof n!="string"||n.includes("__LAMBDA_PLACEHOLDER__"))return n;const e=n.split(`
`),i=e.findIndex(l=>/^\s*display:\s*(#.*)?$/.test(l));if(i===-1)return n;const o=(e[i].match(/^\s*/)||[""])[0].length;let t=e.length;for(let l=i+1;l<e.length;l++){const c=e[l];if(!c.trim())continue;if((c.match(/^\s*/)||[""])[0].length<=o){t=l;break}}let s=o+2;for(let l=i+1;l<t;l++){const c=e[l],d=c.trim();if(!d||d.startsWith("#"))continue;const p=(c.match(/^\s*/)||[""])[0].length;if(p>o){s=d.startsWith("-")?p+2:p;break}}let r=t;for(;r>i+1&&e[r-1].trim()==="";)r-=1;const a=`${" ".repeat(s)}# __LAMBDA_PLACEHOLDER__`;return e.splice(r,0,a),e.join(`
`)}async function Pa(){if(z())try{const i=`${V}/hardware/templates`;b.log("[HardwareDiscovery] Fetching from:",i);const o=await fetch(i,{headers:de(),cache:"no-store"});if(!o.ok)throw new Error(`HTTP ${o.status}`);return(await o.json()).templates||[]}catch(i){b.error("Failed to fetch dynamic hardware templates from HA:",i)}b.log("[HardwareDiscovery] Attempting to load bundled profiles via glob...");const n=[],e=Object.assign({"../../hardware/elecrow-esp32-7inch.yaml":Xo,"../../hardware/guition-esp32-jc4827w543.yaml":Ko,"../../hardware/guition-esp32-jc8048w535.yaml":Jo,"../../hardware/guition-esp32-jc8048w550.yaml":Zo,"../../hardware/guition-esp32-s3-4848s040.yaml":Qo,"../../hardware/lilygo-tdisplays3.yaml":es,"../../hardware/seeedstudio-sensecap-indicator.yaml":ts,"../../hardware/sunton-esp32-2432s028.yaml":ns,"../../hardware/sunton-esp32-2432s028R.yaml":is,"../../hardware/sunton-esp32-4827s032R.yaml":os,"../../hardware/sunton-esp32-8048s050.yaml":ss,"../../hardware/sunton-esp32-8048s070.yaml":rs,"../../hardware/waveshare-esp32-s3-touch-lcd-4.3.yaml":as,"../../hardware/waveshare-esp32-s3-touch-lcd-7.yaml":ls,"../../hardware/waveshare-esp32-universal-epaper-7.5v2.yaml":ds});for(const i in e)try{const o=e[i],t=i.split("/").pop(),s=vo(o,t);s.id=t.replace(/\.yaml$/i,"").replace(/[^a-z0-9]/gi,"_").toLowerCase(),s.isPackageBased=!0,s.hardwarePackage=`hardware/${t}`,n.push(s)}catch(o){b.warn(`[HardwareDiscovery] Failed to parse bundled file ${i}:`,o)}return b.log(`[HardwareDiscovery] Loaded ${n.length} bundled fallback profiles.`),n}async function Bn(n){if(!z())return b.log("[HardwareImport] Offline mode detected. Parsing locally..."),await La(n);try{const e=await n.text(),i=bo(e),o=`${V}/hardware/upload`,t={filename:n.name,content:i};b.log("[HardwareImport] Uploading via JSON:",n.name);const s=await fetch(o,{method:"POST",headers:de(),body:JSON.stringify(t)});if(!s.ok){const l=await s.json().catch(()=>({}));throw new Error(l.message||l.error||`Upload failed: ${s.status}`)}const r=await s.json();M("Hardware template uploaded successfully!","success");const{loadExternalProfiles:a}=await T(async()=>{const{loadExternalProfiles:l}=await Promise.resolve().then(()=>Bt);return{loadExternalProfiles:l}},void 0,import.meta.url);return a&&await a(),r}catch(e){const i=e.message||"";if(i.includes("Failed to fetch")||i.includes("NetworkError")){b.warn("[HardwareImport] Network error during upload (likely benign):",i),M("Generating profile, refreshing list...","info");try{const{loadExternalProfiles:o}=await T(async()=>{const{loadExternalProfiles:t}=await Promise.resolve().then(()=>Bt);return{loadExternalProfiles:t}},void 0,import.meta.url);o&&await o()}catch(o){b.warn("[HardwareImport] Profile refresh also failed:",o)}return{success:!0,filename:n.name,note:"network_error_suppressed"}}else throw b.error("Hardware upload failed:",e),M(`Upload failed: ${i}`,"error"),e}}async function La(n){return new Promise((e,i)=>{const o=new FileReader;o.onload=async t=>{const s=t.target.result,r=bo(s);try{if(!r.includes("__LAMBDA_PLACEHOLDER__"))throw new Error("Invalid template: Missing display: section or __LAMBDA_PLACEHOLDER__");const a=vo(r,n.name);b.log("[HardwareImport] Parsed offline profile:",a);const{DEVICE_PROFILES:l}=await T(async()=>{const{DEVICE_PROFILES:c}=await Promise.resolve().then(()=>Bt);return{DEVICE_PROFILES:c}},void 0,import.meta.url);l&&(l[a.id]=a),M(`Imported ${a.name} (Offline Mode)`,"success"),window.app&&window.app.deviceSettings&&window.app.deviceSettings.populateDeviceSelect(),Ta(a),e(a)}catch(a){M(a.message,"error"),i(a)}},o.onerror=()=>i(new Error("File read failed")),o.readAsText(n)})}function vo(n,e){const i="dynamic_offline_"+e.replace(/[^a-z0-9]/gi,"_").toLowerCase();let o=e.replace(/\.yaml$/i,""),t=800,s=480,r="rect";const a=n.match(/#\s*Name:\s*(.*)/i);a&&(o=a[1].trim());const l=n.match(/#\s*Resolution:\s*(\d+)x(\d+)/i);l&&(t=parseInt(l[1]),s=parseInt(l[2]));const c=n.match(/#\s*Shape:\s*(rect|round)/i);c&&(r=c[1].toLowerCase());const p=!!n.match(/#\s*Inverted:\s*(true|yes|1)/i),h=n.match(/^\s*-\s*platform:\s*([a-z0-9_]+)/m)||n.match(/^\s*platform:\s*([a-z0-9_]+)/m),u=h?h[1].trim():void 0,m=n.match(/^\s*model:\s*"?([^"\n]+)"?/m),y=m?m[1].trim():void 0;let f="esp32-s3",_;const v=n.match(/^\s*esp8266:/m);v?f="esp8266":n.match(/^\s*esp32:/m)&&(n.toLowerCase().includes("esp32-s3")?f="esp32-s3":n.toLowerCase().includes("esp32-c3")?f="esp32-c3":n.toLowerCase().includes("esp32-c6")?f="esp32-c6":f="esp32");const S=n.match(/^\s*board:\s*([^\n]+)/m);S&&(_=S[1].trim(),v||(_.toLowerCase().includes("s3")?f="esp32-s3":_.toLowerCase().includes("c3")?f="esp32-c3":_.toLowerCase().includes("c6")&&(f="esp32-c6")));const w=n.match(/#\s*Chip:\s*(.*)/i);w&&(f=w[1].trim());const E=n.match(/#\s*Board:\s*(.*)/i);E&&(_=E[1].trim());const x=n.match(/^\s*color_palette:\s*(\S+)/m),I=x?x[1].trim():void 0,k=n.match(/^\s*color_order:\s*(\S+)/m),P=k?k[1].trim():void 0,A=n.match(/^\s*update_interval:\s*(\S+)/m),j=A?A[1].trim():void 0,N=n.match(/^\s*invert_colors:\s*(true|false)/mi),H=N?N[1].toLowerCase()==="true":void 0;return{id:i,name:o,resolution:{width:t,height:s},shape:r,chip:f,board:_,displayPlatform:u,displayModel:y,colorPalette:I,colorOrder:P,updateInterval:j,invertColors:H,isPackageBased:!0,isOfflineImport:!0,content:n,features:{psram:n.includes("psram:"),lcd:!n.includes("waveshare_epaper")&&!n.includes("epaper_spi"),lvgl:n.includes("lvgl:")||!n.includes("waveshare_epaper")&&!n.includes("epaper_spi"),epaper:n.includes("waveshare_epaper")||n.includes("epaper_spi"),touch:n.includes("touchscreen:"),inverted_colors:p}}}function Ta(n){try{const e=JSON.parse(localStorage.getItem("esphome-offline-profiles")||"{}");e[n.id]=n,localStorage.setItem("esphome-offline-profiles",JSON.stringify(e)),b.log("[HardwarePersistence] Saved offline profile to localStorage:",n.id)}catch(e){b.error("Failed to save profile to localStorage:",e)}}function Aa(){try{return JSON.parse(localStorage.getItem("esphome-offline-profiles")||"{}")}catch(n){return b.warn("Could not load offline profiles from storage:",n),{}}}const R={reterminal_e1001:{name:"Seeedstudio reTerminal E1001 (Monochrome)",displayType:"binary",chip:"esp32-s3",board:"esp32-s3-devkitc-1",displayModel:"7.50inv2p",displayPlatform:"waveshare_epaper",resolution:{width:800,height:480},shape:"rect",psram_mode:"octal",pins:{display:{cs:"GPIO10",dc:"GPIO11",reset:{number:"GPIO12",inverted:!1},busy:{number:"GPIO13",inverted:!0}},i2c:{sda:"GPIO19",scl:"GPIO20"},spi:{clk:"GPIO7",mosi:"GPIO9"},batteryEnable:"GPIO21",batteryAdc:"GPIO1",buzzer:"GPIO45",buttons:{left:"GPIO5",right:"GPIO4",refresh:"GPIO3",home:"GPIO2"}},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.27,max:4.15}},features:{psram:!0,buzzer:!0,buttons:!0,sht4x:!0,epaper:!0,inverted_colors:!0}},reterminal_e1002:{name:"Seeedstudio reTerminal E1002 (6-Color)",displayType:"color",displayModel:"Seeed-reTerminal-E1002",displayPlatform:"epaper_spi",resolution:{width:800,height:480},shape:"rect",psram_mode:"octal",pins:{display:{cs:null,dc:null,reset:null,busy:null},i2c:{sda:"GPIO19",scl:"GPIO20"},spi:{clk:"GPIO7",mosi:"GPIO9"},batteryEnable:"GPIO21",batteryAdc:"GPIO1",buzzer:"GPIO45",buttons:{left:"GPIO5",right:"GPIO4",refresh:"GPIO3",home:"GPIO2"}},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.27,max:4.15}},features:{psram:!0,buzzer:!0,buttons:!0,sht4x:!0,epaper:!0}},trmnl_diy_esp32s3:{name:"Seeed Studio Trmnl DIY Kit (ESP32-S3)",displayType:"binary",displayModel:"7.50inv2p",displayPlatform:"waveshare_epaper",resolution:{width:800,height:480},shape:"rect",psram_mode:"octal",pins:{display:{cs:"GPIO44",dc:"GPIO10",reset:"GPIO38",busy:{number:"GPIO4",inverted:!0}},i2c:{sda:"GPIO17",scl:"GPIO18"},spi:{clk:"GPIO7",mosi:"GPIO9"},batteryEnable:"GPIO6",batteryAdc:"GPIO1",buzzer:null,buttons:{left:"GPIO2",refresh:"GPIO5"}},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.27,max:4.15},curve:[{from:4.15,to:100},{from:3.96,to:90},{from:3.91,to:80},{from:3.85,to:70},{from:3.8,to:60},{from:3.75,to:50},{from:3.68,to:40},{from:3.58,to:30},{from:3.49,to:20},{from:3.41,to:10},{from:3.3,to:5},{from:3.27,to:0}]},features:{psram:!0,buzzer:!1,buttons:!0,sht4x:!1,epaper:!0,inverted_colors:!0}},trmnl:{name:"TRMNL (ESP32-C3)",displayType:"binary",displayModel:"7.50inv2",displayPlatform:"waveshare_epaper",resolution:{width:800,height:480},shape:"rect",pins:{display:{cs:"GPIO6",dc:"GPIO5",reset:{number:"GPIO10",inverted:!1},busy:{number:"GPIO4",inverted:!0}},i2c:{sda:"GPIO1",scl:"GPIO2"},spi:{clk:"GPIO7",mosi:"GPIO8"},batteryEnable:null,batteryAdc:"GPIO0",buzzer:null,buttons:null},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.3,max:4.15}},features:{psram:!1,buzzer:!1,buttons:!1,sht4x:!1,epaper:!0,inverted_colors:!0},chip:"esp32-c3",board:"esp32-c3-devkitm-1"},seeed_xiao_epaper_75:{name:'Seeed Xiao ESP32C3 - 7.5" E-Paper',displayType:"binary",chip:"esp32-c3",board:"seeed_xiao_esp32c3",displayModel:"7.50inv2p",displayPlatform:"waveshare_epaper",resolution:{width:800,height:480},shape:"rect",pins:{display:{cs:"GPIO3",dc:"GPIO5",reset:"GPIO2",busy:{number:"GPIO4",inverted:!0}},spi:{clk:"GPIO8",mosi:"GPIO10"}},features:{psram:!1,buzzer:!1,buttons:!1,epaper:!0,inverted_colors:!0}},esp32_s3_photopainter:{id:"esp32_s3_photopainter",name:"Waveshare PhotoPainter (6-Color)",displayType:"color",displayModel:"7.30in-f",displayPlatform:"waveshare_epaper",resolution:{width:800,height:480},shape:"rect",psram_mode:"octal",pins:{display:{cs:"GPIO9",dc:"GPIO8",reset:"GPIO12",busy:{number:"GPIO13",inverted:!0}},i2c:{sda:"GPIO47",scl:"GPIO48"},spi:{clk:"GPIO10",mosi:"GPIO11"},batteryEnable:null,batteryAdc:null,buzzer:null,buttons:{left:"GPIO0",right:"GPIO4",refresh:null}},battery:{attenuation:"0db",multiplier:1,calibration:{min:3.3,max:4.2}},features:{psram:!0,buzzer:!1,buttons:!0,sht4x:!1,axp2101:!0,manual_pmic:!0,shtc3:!0,epaper:!0},i2c_config:{scan:!1,frequency:"10kHz"}},waveshare_esp32_s3_touch_lcd_7:{name:'Waveshare Touch LCD 7 7.0" 800x480',displayType:"color",isPackageBased:!0,hardwarePackage:"hardware/waveshare-esp32-s3-touch-lcd-7.yaml",resolution:{width:800,height:480},features:{psram:!0,buzzer:!1,buttons:!1,lcd:!0,lvgl:!0,touch:!0},touch:{platform:"gt911",transformed:!0,transform:{swap_xy:!0}}},waveshare_esp32_s3_touch_lcd_4_3:{name:'Waveshare Touch LCD 4.3 4.3" 800x480',displayType:"color",isPackageBased:!0,hardwarePackage:"hardware/waveshare-esp32-s3-touch-lcd-4.3.yaml",resolution:{width:800,height:480},features:{psram:!0,buzzer:!1,buttons:!1,lcd:!0,touch:!0},touch:{platform:"gt911",transformed:!0,transform:{swap_xy:!0}}},m5stack_coreink:{name:"M5Stack M5Core Ink (200x200)",displayType:"binary",displayModel:"1.54inv2",displayPlatform:"waveshare_epaper",resolution:{width:200,height:200},shape:"rect",features:{psram:!1,buzzer:!0,buttons:!0,lcd:!1,epaper:!0,inverted_colors:!0},chip:"esp32",board:"m5stack-coreink",pins:{display:{cs:"GPIO9",dc:"GPIO15",reset:"GPIO0",busy:null},i2c:{sda:"GPIO21",scl:"GPIO22"},spi:{clk:"GPIO18",mosi:"GPIO23"},batteryEnable:{number:"GPIO12",ignore_strapping_warning:!0},batteryAdc:"GPIO35",buzzer:"GPIO2",buttons:{left:{number:"GPIO39",mode:"INPUT"},right:{number:"GPIO37",mode:"INPUT"},refresh:{number:"GPIO38",mode:"INPUT"}}},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.27,max:4.15}},i2c_config:{scan:!0}},m5stack_paper:{name:"M5Paper (540x960)",displayType:"grayscale",displayModel:"M5Paper",displayPlatform:"it8951e",resolution:{width:960,height:540},shape:"rect",chip:"esp32",board:"m5stack-paper",features:{psram:!0,buzzer:!1,buttons:!0,lcd:!1,epaper:!0,touch:!0,inverted_colors:!0,sht3xd:!0},pins:{display:{cs:"GPIO15",dc:null,reset:"GPIO23",busy:"GPIO27"},i2c:{sda:"GPIO21",scl:"GPIO22"},spi:{clk:"GPIO14",mosi:"GPIO12",miso:"GPIO13"},batteryEnable:null,batteryAdc:"GPIO35",buzzer:null,buttons:{left:{number:"GPIO39",mode:"INPUT"},right:{number:"GPIO37",mode:"INPUT"},refresh:{number:"GPIO38",mode:"INPUT"}}},m5paper:{battery_power_pin:"GPIO5",main_power_pin:"GPIO2"},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.27,max:4.15}},rotation_offset:180,touch:{platform:"gt911",i2c_id:"bus_a",address:93,interrupt_pin:"GPIO36",update_interval:"never",transform:{mirror_x:!1,mirror_y:!1,swap_xy:!0},calibration:{x_min:0,x_max:960,y_min:0,y_max:540}},external_components:["  - source: github://Passific/m5paper_esphome"]}},ut=Object.keys(R);async function pn(){try{const n=await Pa();b.log(`[Devices] Loaded ${n.length} hardware profiles from backend/bundle.`),n.forEach(o=>{if(R[o.id]){const t=R[o.id];R[o.id]={...t,...o,features:{...t.features||{},...o.features||{}}}}else R[o.id]=o});const e=Aa(),i=Object.keys(e);i.length>0&&(b.log(`[Devices] Restoring ${i.length} offline profiles from localStorage.`),Object.entries(e).forEach(([o,t])=>{R[o]=t})),window.app&&window.app.deviceSettings&&typeof window.app.deviceSettings.populateDeviceSelect=="function"&&window.app.deviceSettings.populateDeviceSelect()}catch(n){b.error("Failed to load external hardware profiles:",n)}}const Bt=Object.freeze(Object.defineProperty({__proto__:null,DEVICE_PROFILES:R,SUPPORTED_DEVICE_IDS:ut,loadExternalProfiles:pn},Symbol.toStringTag,{value:"Module"}));function Ce(){return"w_"+Date.now().toString(36)+Math.random().toString(36).substr(2,5)}typeof crypto<"u"&&!crypto.randomUUID?crypto.randomUUID=function(){return("10000000-1000-4000-8000"+-1e11).replace(/[018]/g,n=>(n^crypto.getRandomValues(new Uint8Array(1))[0]&15>>n/4).toString(16))}:typeof crypto>"u"&&(window.crypto={randomUUID:()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,n=>{const e=Math.random()*16|0;return(n==="x"?e:e&3|8).toString(16)}),getRandomValues:n=>n.map(()=>Math.floor(Math.random()*256))});function Ma(n,e){let i;return function(...t){const s=()=>{clearTimeout(i),n(...t)};clearTimeout(i),i=setTimeout(s,e)}}function ht(n){return JSON.parse(JSON.stringify(n))}const Da=(n,e)=>{if(!n||!e)return;const i=e.replace(/\[(\w+)\]/g,".$1").replace(/^\./,"").split(".");let o=n;for(const t of i){if(o==null)return;o=o[t]}return o};window.generateId=Ce;window.debounce=Ma;window.deepClone=ht;window.getNestedValue=Da;class Oa{constructor(){this.state={pages:[],currentPageIndex:0,deviceName:"Layout 1",deviceModel:"reterminal_e1001",currentLayoutId:"reterminal_e1001",customHardware:{},protocolHardware:{width:400,height:300,colorMode:"bw"},widgetsById:new Map},this.reset()}reset(){this.state.pages=[{id:"page_0",name:"Overview",layout:null,widgets:[]}],this.state.currentPageIndex=0,this.rebuildWidgetsIndex()}get pages(){return this.state.pages}get currentPageIndex(){return this.state.currentPageIndex}get deviceName(){return this.state.deviceName}get deviceModel(){return this.state.deviceModel}get currentLayoutId(){return this.state.currentLayoutId}get protocolHardware(){return this.state.protocolHardware}get customHardware(){return this.state.customHardware}getCurrentPage(){return this.state.pages[this.state.currentPageIndex]||this.state.pages[0]}getWidgetById(e){return this.state.widgetsById.get(e)}rebuildWidgetsIndex(){this.state.widgetsById.clear();for(const e of this.state.pages)for(const i of e.widgets)this.state.widgetsById.set(i.id,i)}setPages(e){this.state.pages=e,this.rebuildWidgetsIndex(),L(C.STATE_CHANGED)}setCurrentPageIndex(e,i={}){e>=0&&e<this.state.pages.length&&(this.state.currentPageIndex=e,L(C.PAGE_CHANGED,{index:e,...i}))}reorderPage(e,i){if(e<0||e>=this.state.pages.length||i<0||i>=this.state.pages.length)return;const[o]=this.state.pages.splice(e,1);this.state.pages.splice(i,0,o),this.state.currentPageIndex===e?this.state.currentPageIndex=i:e<this.state.currentPageIndex&&i>=this.state.currentPageIndex?this.state.currentPageIndex--:e>this.state.currentPageIndex&&i<=this.state.currentPageIndex&&this.state.currentPageIndex++,L(C.STATE_CHANGED),L(C.PAGE_CHANGED,{index:this.state.currentPageIndex,forceFocus:!0})}addPage(e=null){const i=this.state.pages.length;let o=0;this.state.pages.forEach(a=>{const l=a.name.match(/^Page (\d+)$/);if(l){const c=parseInt(l[1],10);c>o&&(o=c)}});const t=o+1,s={id:`page_${Date.now()}_${i}`,name:`Page ${t}`,widgets:[]},r=e!==null?e:this.state.pages.length;return this.state.pages.splice(r,0,s),e!==null&&e<=this.state.currentPageIndex?this.state.currentPageIndex++:e===null&&(this.state.currentPageIndex=this.state.pages.length-1),this.rebuildWidgetsIndex(),L(C.STATE_CHANGED),L(C.PAGE_CHANGED,{index:this.state.currentPageIndex,forceFocus:!0}),s}deletePage(e){e<0||e>=this.state.pages.length||(this.state.pages.splice(e,1),this.state.currentPageIndex>=this.state.pages.length&&(this.state.currentPageIndex=Math.max(0,this.state.pages.length-1)),this.rebuildWidgetsIndex(),L(C.STATE_CHANGED),L(C.PAGE_CHANGED,{index:this.state.currentPageIndex,forceFocus:!0}))}duplicatePage(e){if(e<0||e>=this.state.pages.length)return null;const i=this.state.pages[e],o=ht(i);o.id=`page_${Date.now()}_${this.state.pages.length}`,o.name=`${i.name} (Copy)`;const t=new Map;o.widgets.forEach(r=>{const a=r.id,l=Ce();r.id=l,t.set(a,l)}),o.widgets.forEach(r=>{r.parentId&&t.has(r.parentId)&&(r.parentId=t.get(r.parentId))});const s=e+1;return this.state.pages.splice(s,0,o),this.state.currentPageIndex=s,this.rebuildWidgetsIndex(),L(C.STATE_CHANGED),L(C.PAGE_CHANGED,{index:this.state.currentPageIndex,forceFocus:!0}),o}renamePage(e,i){e<0||e>=this.state.pages.length||!i||i.trim()===""||(this.state.pages[e].name=i.trim(),L(C.STATE_CHANGED))}addWidget(e,i=null){const o=i!==null?i:this.state.currentPageIndex;(this.state.pages[o]||this.getCurrentPage()).widgets.push(e),this.state.widgetsById.set(e.id,e),L(C.STATE_CHANGED)}updateWidget(e,i){const o=this.getWidgetById(e);o&&(Object.assign(o,i),L(C.STATE_CHANGED))}deleteWidgets(e){const i=this.getCurrentPage();let o=!1;for(const t of e){const s=i.widgets.findIndex(r=>r.id===t);s!==-1&&(i.widgets.splice(s,1),this.state.widgetsById.delete(t),o=!0)}o&&L(C.STATE_CHANGED)}moveWidgetToPage(e,i,o=null,t=null){if(i<0||i>=this.state.pages.length)return!1;const s=this.state.pages[i],r=new Set,a=[];let l=e,c=this.state.widgetsById.get(e);if(c&&c.parentId){let h=c;for(;h.parentId;){const u=this.state.widgetsById.get(h.parentId);if(u)h=u;else break}l=h.id}const d=h=>{if(r.has(h))return;let u=null,m=null;for(const f of this.state.pages)if(u=f.widgets.find(_=>_.id===h),u){m=f;break}if(!u||!m||m===s)return;r.add(h),a.push({widget:u,sourcePage:m}),m.widgets.filter(f=>f.parentId===h).forEach(f=>d(f.id))};if(d(l),a.length===0)return!1;a.forEach((h,u)=>{const{widget:m,sourcePage:y}=h,f=y.widgets.indexOf(m);if(f!==-1&&y.widgets.splice(f,1),u===0&&m.parentId&&!r.has(m.parentId)&&(m.parentId=null),u===0){let _=0,v=0;if(o!==null&&t!==null&&(_=o-m.x,v=t-m.y,m.x=o,m.y=t),_!==0||v!==0)for(let S=1;S<a.length;S++){const w=a[S].widget;w.x+=_,w.y+=v}}s.widgets.push(m)});const p=this.getCanvasDimensions();for(const h of r){const u=this.state.widgetsById.get(h);if(!u||u.parentId&&r.has(u.parentId))continue;const m=u.x,y=u.y;u.x=Math.max(0,Math.min(p.width-(u.width||50),u.x)),u.y=Math.max(0,Math.min(p.height-(u.height||50),u.y));const f=u.x-m,_=u.y-y;if(f!==0||_!==0)for(const v of r){const S=this.state.widgetsById.get(v);S&&S.parentId===u.id&&(S.x+=f,S.y+=_)}}return this.rebuildWidgetsIndex(),L(C.STATE_CHANGED),!0}reorderWidget(e,i,o){const t=this.state.pages[e];if(!t)return;const s=t.widgets;if(i<0||i>=s.length||o<0||o>=s.length)return;const[r]=s.splice(i,1);s.splice(o,0,r),L(C.STATE_CHANGED)}clearCurrentPage(e=!1){const i=this.getCurrentPage();if(!i)return{deleted:0,preserved:0};const o=[],t=[];return i.widgets.forEach(s=>{e&&s.locked?t.push(s):o.push(s)}),i.widgets=t,o.forEach(s=>this.state.widgetsById.delete(s.id)),o.length>0&&L(C.STATE_CHANGED),{deleted:o.length,preserved:t.length}}setDeviceSettings(e,i){e&&(this.state.deviceName=e),i&&(this.state.deviceModel=i,window.currentDeviceModel=i),L(C.SETTINGS_CHANGED)}getCanvasDimensions(e){const i=this.state.deviceModel||"reterminal_e1001",o=R&&R[i]?R[i]:null;let t=Qt,s=en;if(o)o.resolution&&(t=o.resolution.width,s=o.resolution.height);else if(i==="custom"&&this.state.customHardware){const r=this.state.customHardware;r.resWidth&&r.resHeight&&(t=r.resWidth,s=r.resHeight)}return e===Xt.PORTRAIT?{width:Math.min(t,s),height:Math.max(t,s)}:{width:Math.max(t,s),height:Math.min(t,s)}}getPagesPayload(){return{pages:this.state.pages,deviceName:this.state.deviceName,deviceModel:this.state.deviceModel,currentLayoutId:this.state.currentLayoutId,customHardware:this.state.customHardware}}getCanvasShape(){const e=R[this.state.deviceModel];return e&&e.shape?e.shape:this.state.customHardware&&this.state.customHardware.shape?this.state.customHardware.shape:"rect"}}class Ra{constructor(){this.state={selectedWidgetIds:[],clipboardWidgets:[],zoomLevel:1,panX:0,panY:0},this.historyStack=[],this.historyIndex=-1}get selectedWidgetIds(){return this.state.selectedWidgetIds}get clipboardWidgets(){return this.state.clipboardWidgets}get zoomLevel(){return this.state.zoomLevel}setZoomLevel(e){this.state.zoomLevel=Math.max(.05,Math.min(5,e)),L(C.ZOOM_CHANGED,{zoomLevel:this.state.zoomLevel})}setSelectedWidgetIds(e){this.state.selectedWidgetIds=e||[],L(C.SELECTION_CHANGED,{widgetIds:this.state.selectedWidgetIds})}selectWidget(e,i=!1){if(i){const o=this.state.selectedWidgetIds.indexOf(e);o===-1?e&&this.state.selectedWidgetIds.push(e):this.state.selectedWidgetIds.splice(o,1)}else this.state.selectedWidgetIds=e?[e]:[];L(C.SELECTION_CHANGED,{widgetIds:this.state.selectedWidgetIds})}copyWidgets(e){this.state.clipboardWidgets=e.map(i=>ht(i)),b.log("[EditorStore] Widgets copied to clipboard:",this.state.clipboardWidgets.length)}recordHistory(e){const i=ht(e);if(this.historyIndex>=0){const o=this.historyStack[this.historyIndex];if(JSON.stringify(o)===JSON.stringify(i))return}this.historyIndex<this.historyStack.length-1&&(this.historyStack=this.historyStack.slice(0,this.historyIndex+1)),this.historyStack.push(i),this.historyIndex++,this.historyStack.length>Jt&&(this.historyStack.shift(),this.historyIndex--),L(C.HISTORY_CHANGED,{canUndo:this.canUndo(),canRedo:this.canRedo()})}undo(){return this.canUndo()?(this.historyIndex--,this.historyStack[this.historyIndex]):null}redo(){return this.canRedo()?(this.historyIndex++,this.historyStack[this.historyIndex]):null}canUndo(){return this.historyIndex>0}canRedo(){return this.historyIndex<this.historyStack.length-1}}class Ba{constructor(){this.state={...Kt}}get snapEnabled(){return this.state.snapEnabled}get showGrid(){return this.state.showGrid}get showDebugGrid(){return this.state.showDebugGrid}get showRulers(){return this.state.showRulers}get gridOpacity(){return this.state.gridOpacity}get editor_light_mode(){return this.state.editor_light_mode}update(e){this.state={...this.state,...e},L(C.SETTINGS_CHANGED,this.state),b.log("[PreferencesStore] Settings updated")}setSnapEnabled(e){this.state.snapEnabled=e,L(C.SETTINGS_CHANGED,{snapEnabled:e})}setShowGrid(e){this.state.showGrid=e,L(C.SETTINGS_CHANGED,{showGrid:e})}setShowDebugGrid(e){this.state.showDebugGrid=e,L(C.SETTINGS_CHANGED,{showDebugGrid:e})}setShowRulers(e){this.state.showRulers=e,L(C.SETTINGS_CHANGED,{showRulers:e})}}class Na{constructor(){this.keys={ai_api_key_gemini:"",ai_api_key_openai:"",ai_api_key_openrouter:""},this.loadFromLocalStorage()}get(e){return this.keys[e]}set(e,i){e in this.keys&&(this.keys[e]=i,this.saveToLocalStorage())}saveToLocalStorage(){try{const e={};Object.keys(this.keys).forEach(i=>{i.startsWith("ai_api_key_")&&(e[i]=this.keys[i])}),localStorage.setItem("esphome-designer-ai-keys",JSON.stringify(e))}catch(e){b.warn("[SecretsStore] Failed to save AI keys to localStorage:",e)}}loadFromLocalStorage(){try{const e=localStorage.getItem("esphome-designer-ai-keys");if(e){const i=JSON.parse(e);this.keys={...this.keys,...i},b.log("[SecretsStore] AI keys loaded from local storage")}}catch(e){b.warn("[SecretsStore] Failed to load AI keys from localStorage:",e)}}}class Ha{constructor(){this.project=new Oa,this.editor=new Ra,this.preferences=new Ba,this.secrets=new Na,this._isRestoringHistory=!1,this.recordHistory(),q(C.SETTINGS_CHANGED,e=>{e&&e.renderingMode!==void 0&&this.syncWidgetVisibilityWithMode()})}reset(){this.project.reset(),this.editor.state.selectedWidgetIds=[],this.recordHistory()}get pages(){return this.project.pages}get currentPageIndex(){return this.project.currentPageIndex}get selectedWidgetId(){return this.editor.selectedWidgetIds[0]||null}get selectedWidgetIds(){return this.editor.selectedWidgetIds}get settings(){return{...this.preferences.state,device_name:this.project.deviceName,deviceName:this.project.deviceName,device_model:this.project.deviceModel,deviceModel:this.project.deviceModel,customHardware:this.project.customHardware,custom_hardware:this.project.customHardware,protocolHardware:this.project.protocolHardware,protocol_hardware:this.project.protocolHardware,...this.secrets.keys}}get deviceName(){return this.project.deviceName}get deviceModel(){return this.project.deviceModel}get currentLayoutId(){return this.project.currentLayoutId}get snapEnabled(){return this.preferences.snapEnabled}get showGrid(){return this.preferences.showGrid}get showDebugGrid(){return this.preferences.showDebugGrid}get showRulers(){return this.preferences.showRulers}get zoomLevel(){return this.editor.zoomLevel}getCurrentPage(){return this.project.getCurrentPage()}getWidgetById(e){return this.project.getWidgetById(e)}getSelectedWidget(){return this.project.getWidgetById(this.editor.selectedWidgetIds[0])}getSelectedWidgets(){return this.editor.selectedWidgetIds.map(e=>this.getWidgetById(e)).filter(e=>!!e)}getSelectedProfile(){return R[this.project.deviceModel]||null}getCanvasDimensions(){const e=this.preferences.state.renderingMode||"direct";if(e==="oepl"||e==="opendisplay"){const i=this.project.protocolHardware;return this.preferences.state.orientation==="portrait"?{width:Math.min(i.width,i.height),height:Math.max(i.width,i.height)}:{width:Math.max(i.width,i.height),height:Math.min(i.width,i.height)}}return this.project.getCanvasDimensions(this.preferences.state.orientation)}getCanvasShape(){return this.project.getCanvasShape()}getPagesPayload(){const e={...this.project.getPagesPayload(),currentPageIndex:this.currentPageIndex,...this.settings};return e.deviceModel=this.project.deviceModel,e.customHardware=this.project.customHardware,e.protocolHardware=this.project.protocolHardware,e.device_model=this.project.deviceModel,e.custom_hardware=this.project.customHardware,e.protocol_hardware=this.project.protocolHardware,e}getSettings(){return this.settings}setSettings(e){this.updateSettings(e)}updateProtocolHardware(e){Object.assign(this.project.state.protocolHardware,e),L(C.SETTINGS_CHANGED),L(C.PAGE_CHANGED,{index:this.currentPageIndex,forceFocus:!0})}saveToLocalStorage(){if(!z()){const e=this.getPagesPayload();console.log("[saveToLocalStorage] DEBUG renderingMode being saved:",e.renderingMode),localStorage.setItem("esphome-designer-layout",JSON.stringify(e))}}loadFromLocalStorage(){try{const e=localStorage.getItem("esphome-designer-layout"),i=e?JSON.parse(e):null;return console.log("[loadFromLocalStorage] DEBUG raw data exists:",!!e),console.log("[loadFromLocalStorage] DEBUG parsed renderingMode:",i?.renderingMode),console.log("[loadFromLocalStorage] DEBUG parsed rendering_mode:",i?.rendering_mode),i}catch(e){return console.error("[loadFromLocalStorage] Parse error:",e),null}}setPages(e){this.project.setPages(e),this.recordHistory(),L(C.STATE_CHANGED)}reorderWidget(e,i,o){this.project.reorderWidget(e,i,o),this.syncWidgetOrderWithHierarchy(),this.recordHistory(),L(C.STATE_CHANGED)}setCurrentPageIndex(e,i={}){this.project.setCurrentPageIndex(e,i),this.editor.setSelectedWidgetIds([]),L(C.STATE_CHANGED)}reorderPage(e,i){this.project.reorderPage(e,i),this.recordHistory()}addPage(e=null){const i=this.project.addPage(e);return this.recordHistory(),i}deletePage(e){this.project.deletePage(e),this.recordHistory()}duplicatePage(e){const i=this.project.duplicatePage(e);return this.recordHistory(),i}renamePage(e,i){this.project.renamePage(e,i),this.recordHistory()}selectWidget(e,i){if(!e){this.editor.selectWidget(null,i);return}const o=this.getWidgetById(e),t=o?.parentId||(o?.type==="group"?o.id:null);if(t){const a=this.pages[this.currentPageIndex].widgets.filter(l=>l.parentId===t||l.id===t).map(l=>l.id);if(i)if(a.some(c=>this.editor.selectedWidgetIds.includes(c))){const c=this.editor.selectedWidgetIds.filter(d=>!a.includes(d));this.editor.setSelectedWidgetIds(c)}else this.editor.setSelectedWidgetIds([...new Set([...this.editor.selectedWidgetIds,...a])]);else this.editor.setSelectedWidgetIds(a)}else this.editor.selectWidget(e,i)}selectWidgets(e){this.editor.setSelectedWidgetIds(e)}selectAllWidgets(){const e=this.getCurrentPage();if(!e||!e.widgets)return;const i=e.widgets.map(o=>o.id);this.selectWidgets(i)}updateSettings(e){e.renderingMode!==void 0&&(console.log("[updateSettings] DEBUG renderingMode changing to:",e.renderingMode),console.trace("[updateSettings] Call stack"));const i={},o={};Object.keys(e).forEach(t=>{t.startsWith("ai_api_key_")?i[t]=e[t]:o[t]=e[t]}),Object.keys(i).length&&Object.entries(i).forEach(([t,s])=>this.secrets.set(t,s)),this.preferences.update(o),e.device_name&&(this.project.state.deviceName=e.device_name),e.device_model&&(this.project.state.deviceModel=e.device_model),L(C.STATE_CHANGED),(e.device_model||e.orientation||e.custom_hardware)&&L(C.PAGE_CHANGED,{index:this.currentPageIndex,forceFocus:!0})}setDeviceName(e){this.project.state.deviceName=e,this.updateLayoutIndicator(),L(C.STATE_CHANGED)}setDeviceModel(e){this.project.state.deviceModel=e,this.updateLayoutIndicator(),L(C.STATE_CHANGED),L(C.PAGE_CHANGED,{index:this.currentPageIndex,forceFocus:!0})}setCurrentLayoutId(e){this.project.state.currentLayoutId=e,this.updateLayoutIndicator(),L(C.STATE_CHANGED)}updateLayoutIndicator(){const e=document.getElementById("currentLayoutName");e&&(e.textContent=this.project.deviceName||this.project.currentLayoutId||"Unknown")}setSnapEnabled(e){this.preferences.setSnapEnabled(e)}setShowGrid(e){this.preferences.setShowGrid(e)}setShowDebugGrid(e){this.preferences.setShowDebugGrid(e)}setShowRulers(e){this.preferences.setShowRulers(e)}setZoomLevel(e){this.editor.setZoomLevel(e)}setCustomHardware(e){this.project.state.customHardware=e,L(C.STATE_CHANGED),L(C.PAGE_CHANGED,{index:this.currentPageIndex,forceFocus:!0})}addWidget(e,i=null){this._checkRenderingModeForWidget(e),this.project.addWidget(e,i),this.recordHistory(),this.selectWidget(e.id),L(C.STATE_CHANGED)}updateWidget(e,i){this.project.updateWidget(e,i);const o=this.getWidgetById(e);if(o&&o.type==="group"){const t=["locked","hidden"],s={};if(t.forEach(r=>{i[r]!==void 0&&(s[r]=i[r])}),Object.keys(s).length>0){const r=this.pages[this.currentPageIndex];r&&r.widgets&&r.widgets.filter(l=>l.parentId===e).forEach(l=>this.updateWidget(l.id,s))}}i.parentId!==void 0&&this.syncWidgetOrderWithHierarchy(),L(C.STATE_CHANGED)}updateWidgets(e,i){e.forEach(o=>this.project.updateWidget(o,i)),L(C.STATE_CHANGED)}updateWidgetsProps(e,i){e.forEach(o=>{const t=this.getWidgetById(o);if(t){const s={...t.props||{},...i};this.project.updateWidget(o,{props:s})}}),L(C.STATE_CHANGED)}deleteWidget(e){const i=e?[e]:[...this.editor.selectedWidgetIds],o=[...i];i.forEach(t=>{const s=this.getWidgetById(t);s&&s.type==="group"&&this.pages[this.currentPageIndex].widgets.filter(a=>a.parentId===t).forEach(a=>o.push(a.id))}),this.project.deleteWidgets([...new Set(o)]),this.editor.setSelectedWidgetIds([]),this.recordHistory(),L(C.STATE_CHANGED)}groupSelection(){const e=this.editor.selectedWidgetIds,i=this.getSelectedWidgets(),o=i.some(d=>d.type==="group"||d.parentId);if(e.length<2||o)return;let t=1/0,s=1/0,r=-1/0,a=-1/0;i.forEach(d=>{t=Math.min(t,d.x),s=Math.min(s,d.y),r=Math.max(r,d.x+(d.width||0)),a=Math.max(a,d.y+(d.height||0))});const l="group_"+Ce(),c={id:l,type:"group",title:"Group",x:t,y:s,width:r-t,height:a-s,props:{},expanded:!0};this.project.addWidget(c),i.forEach(d=>{this.project.updateWidget(d.id,{parentId:l})}),this.selectWidget(l),this.syncWidgetOrderWithHierarchy(),this.recordHistory(),L(C.STATE_CHANGED)}ungroupSelection(e=null){let i=[];if(e)i=Array.isArray(e)?e:[e];else{const a=this.getSelectedWidgets(),l=new Set;a.forEach(c=>{c.type==="group"?l.add(c.id):c.parentId&&l.add(c.parentId)}),i=[...l]}const o=new Set;i.forEach(a=>{const l=this.getWidgetById(a);l&&(l.type==="group"?o.add(l.id):l.parentId&&o.add(l.parentId))});const t=[...o];if(t.length===0)return;const s=[];t.forEach(a=>{const l=this.getWidgetById(a);if(!l||l.type!=="group")return;this.pages[this.currentPageIndex].widgets.filter(p=>p.parentId===a).forEach(p=>{this.project.updateWidget(p.id,{parentId:null}),s.push(p.id)})}),this.project.deleteWidgets(t);const r=this.pages[this.currentPageIndex];r&&r.widgets&&(r.widgets=r.widgets.filter(a=>!t.includes(a.id))),s.length>0&&this.selectWidgets(s),this.syncWidgetOrderWithHierarchy(),this.recordHistory(),L(C.STATE_CHANGED)}alignSelectedWidgets(e){const i=this.getSelectedWidgets();if(i.length<2)return;let o;switch(e){case"left":o=Math.min(...i.map(t=>t.x)),i.forEach(t=>this.project.updateWidget(t.id,{x:o}));break;case"right":o=Math.max(...i.map(t=>t.x+(t.width||0))),i.forEach(t=>this.project.updateWidget(t.id,{x:o-(t.width||0)}));break;case"center":{const t=i.map(s=>s.x+(s.width||0)/2);o=t.reduce((s,r)=>s+r,0)/t.length,i.forEach(s=>this.project.updateWidget(s.id,{x:o-(s.width||0)/2}));break}case"top":o=Math.min(...i.map(t=>t.y)),i.forEach(t=>this.project.updateWidget(t.id,{y:o}));break;case"bottom":o=Math.max(...i.map(t=>t.y+(t.height||0))),i.forEach(t=>this.project.updateWidget(t.id,{y:o-(t.height||0)}));break;case"middle":{const t=i.map(s=>s.y+(s.height||0)/2);o=t.reduce((s,r)=>s+r,0)/t.length,i.forEach(s=>this.project.updateWidget(s.id,{y:o-(s.height||0)/2}));break}}this.recordHistory(),L(C.STATE_CHANGED)}distributeSelectedWidgets(e){const i=[...this.getSelectedWidgets()];if(!(i.length<3)){if(e==="horizontal"){i.sort((d,p)=>d.x-p.x);const o=i[0],t=i[i.length-1],s=i.reduce((d,p)=>d+(p.width||0),0),l=(t.x+(t.width||0)-o.x-s)/(i.length-1);let c=o.x;for(let d=0;d<i.length;d++)this.project.updateWidget(i[d].id,{x:Math.round(c)}),c+=(i[d].width||0)+l}else{i.sort((d,p)=>d.y-p.y);const o=i[0],t=i[i.length-1],s=i.reduce((d,p)=>d+(p.height||0),0),l=(t.y+(t.height||0)-o.y-s)/(i.length-1);let c=o.y;for(let d=0;d<i.length;d++)this.project.updateWidget(i[d].id,{y:Math.round(c)}),c+=(i[d].height||0)+l}this.recordHistory(),L(C.STATE_CHANGED)}}moveWidgetToPage(e,i,o=null,t=null){const s=this.project.moveWidgetToPage(e,i,o,t);return s&&(this.syncWidgetOrderWithHierarchy(),this.recordHistory(),L(C.STATE_CHANGED)),s}clearCurrentPage(e=!1){const i=this.project.clearCurrentPage(e);return i.deleted>0&&(this.editor.setSelectedWidgetIds([]),this.recordHistory(),L(C.STATE_CHANGED)),i}copyWidget(e){const o=(e?[e]:this.editor.selectedWidgetIds).map(t=>this.getWidgetById(t)).filter(t=>!!t);o.length>0&&this.editor.copyWidgets(o)}pasteWidget(){const e=this.editor.clipboardWidgets;if(!e||e.length===0)return;const i=e.map(o=>{const t=JSON.parse(JSON.stringify(o));return t.id=Ce(),t.x+=10,t.y+=10,t});i.forEach(o=>{this._checkRenderingModeForWidget(o),this.project.addWidget(o)}),this.editor.setSelectedWidgetIds(i.map(o=>o.id)),this.recordHistory(),L(C.STATE_CHANGED)}createDropShadow(e){const i=Array.isArray(e)?e:[e];if(i.length===0)return;const o=this.project.getCurrentPage(),t=o?o.dark_mode:void 0;let s=!1;t==="dark"?s=!0:t==="light"?s=!1:s=!!this.settings.dark_mode;const r=s?"white":"black",a=s?"black":"white",l=s?"white":"black",c=[];i.forEach(d=>{const p=this.getWidgetById(d);if(!p)return;const h=parseInt(p.props?.border_radius||p.props?.radius||p.props?.corner_radius||0,10);let u="shape_rect";p.type==="shape_circle"||p.type==="circle"?u="shape_circle":h>0&&(u="rounded_rect");const m={id:Ce(),type:u,x:(p.x||0)+5,y:(p.y||0)+5,width:p.width,height:p.height,props:{name:(p.props?.name||p.type)+" Shadow",color:r,background_color:r,bg_color:r,fill:!0}};u==="rounded_rect"&&(m.props.radius=h),this.project.addWidget(m),p.props||(p.props={});const y=["shape_rect","rounded_rect","shape_circle","rectangle","rrect","circle"].includes(p.type),f=p.props.color||l;p.props.border_color||(p.props.border_color=f),p.props.fill=!0,p.props.background_color=a,p.props.bg_color=a,y&&(p.props.color=a),this.project.updateWidget(d,{props:{...p.props}});const _=o.widgets.findIndex(P=>P.id===d),v=o.widgets.findIndex(P=>P.id===m.id);_!==-1&&v!==-1&&this.project.reorderWidget(this.project.currentPageIndex,v,_);const S="group_"+Ce(),w=Math.min(p.x,m.x),E=Math.min(p.y,m.y),x=Math.max(p.x+p.width,m.x+m.width),I=Math.max(p.y+p.height,m.y+m.height),k={id:S,type:"group",title:p.props?.name?`${p.props.name} Group`:"Shadow Group",x:w,y:E,width:x-w,height:I-E,props:{},expanded:!0};this.project.addWidget(k),this.project.updateWidget(m.id,{parentId:S}),this.project.updateWidget(p.id,{parentId:S}),c.push(S)}),c.length>0&&this.selectWidgets(c),this.syncWidgetOrderWithHierarchy(),this.recordHistory(),L(C.STATE_CHANGED)}recordHistory(){this._isRestoringHistory||this.editor.recordHistory({pages:this.project.pages,deviceName:this.project.deviceName})}undo(){const e=this.editor.undo();e&&(this.setInternalFlag("_isRestoringHistory",!0),this.restoreSnapshot(e),setTimeout(()=>{this.setInternalFlag("_isRestoringHistory",!1)},0))}redo(){const e=this.editor.redo();e&&(this.setInternalFlag("_isRestoringHistory",!0),this.restoreSnapshot(e),setTimeout(()=>{this.setInternalFlag("_isRestoringHistory",!1)},0))}setInternalFlag(e,i){const o=this.$raw||this;o[e]=i}restoreSnapshot(e){this.project.state.pages=JSON.parse(JSON.stringify(e.pages)),this.project.state.deviceName=e.deviceName,this.project.rebuildWidgetsIndex(),L(C.STATE_CHANGED)}canUndo(){return this.editor.canUndo()}canRedo(){return this.editor.canRedo()}syncWidgetOrderWithHierarchy(){const e=this.getCurrentPage();if(!e||!e.widgets)return;const i=[...e.widgets],o=i.filter(a=>!a.parentId),t=new Map;i.forEach(a=>{a.parentId&&(t.has(a.parentId)||t.set(a.parentId,[]),t.get(a.parentId).push(a))});const s=[],r=a=>{s.push(a);const l=t.get(a.id);l&&(l.sort((c,d)=>i.indexOf(c)-i.indexOf(d)),l.forEach(r))};o.forEach(r),e.widgets=s,this.project.rebuildWidgetsIndex()}syncWidgetVisibilityWithMode(){const e=this.preferences.state.renderingMode||"direct";b.log(`[AppState] Syncing widget visibility for mode: ${e}`);let i=0;this.project.pages.forEach(o=>{o.widgets.forEach(t=>{const s=this._isWidgetCompatibleWithMode(t,e);!s&&!t.hidden?(t.hidden=!0,i++):s&&t.hidden&&(t.hidden=!1,i++)})}),i>0&&(b.log(`[AppState] Updated ${i} widgets due to mode switch.`),this.project.rebuildWidgetsIndex(),L(C.STATE_CHANGED))}_isWidgetCompatibleWithMode(e,i){const o=PluginRegistry.get(e.type);if(!o)return!0;if(i==="oepl")return!!o.exportOEPL;if(i==="opendisplay")return!!o.exportOpenDisplay;if(i==="lvgl"){const t=e.type&&e.type.startsWith("lvgl_"),s=typeof o.exportLVGL=="function";return t||s}if(i==="direct"){const t=e.type&&(e.type.startsWith("lvgl_")||e.type.startsWith("oepl_"));return!!o.export&&!t}return!0}_checkRenderingModeForWidget(e){if(!e||!e.type)return;const i=this.preferences.state.renderingMode||"direct",o=e.type.startsWith("lvgl_"),t=e.type.startsWith("oepl_"),s=e.type.startsWith("odp_")||e.type.startsWith("opendisplay_");o&&i==="direct"?(this.updateSettings({renderingMode:"lvgl"}),b.log(`[AppState] Auto-switched to LVGL rendering mode because an LVGL widget (${e.type}) was added.`),M("Auto-switched to LVGL rendering mode","info")):t&&i!=="oepl"?(this.updateSettings({renderingMode:"oepl"}),b.log(`[AppState] Auto-switched to OEPL rendering mode because an OEPL widget (${e.type}) was added.`),M("Auto-switched to OEPL mode","info")):s&&i!=="opendisplay"&&(this.updateSettings({renderingMode:"opendisplay"}),b.log(`[AppState] Auto-switched to OpenDisplay (ODP) mode because an ODP widget (${e.type}) was added.`),M("Auto-switched to ODP mode","info"))}}const Fa=new Ha,Ga={set(n,e,i,o){return e==="snapEnabled"?(b.warn(`[StateProxy] Intercepted illegal write to '${e}'. Automatically rerouting to setSnapEnabled().`),typeof n.setSnapEnabled=="function"&&n.setSnapEnabled(i),!0):(!["entityStates","_isRestoringHistory"].includes(e)&&typeof n[e]!="function"&&(b.warn(`[StateProxy] 🚨 ILLEGAL STATE MUTATION DETECTED: AppState.${e} = ${i}`),console.trace(`[StateProxy] Trace for illegal mutation of AppState.${e}`)),Reflect.set(n,e,i,o))}},g=new Proxy(Fa,Ga);window.AppState=g;window.ESPHomeDesigner=window.ESPHomeDesigner||{};window.ESPHomeDesigner.state=g;window.AppState=g;window.ESPHomeDesigner=window.ESPHomeDesigner||{};window.ESPHomeDesigner.state=g;function Je(){return window.AppState&&window.AppState.deviceModel?window.AppState.deviceModel:window.currentDeviceModel||"reterminal_e1001"}function Wa(n){if(R&&R[n])return R[n].name;switch(n){case"reterminal_e1002":return"reTerminal E1002 (6-Color)";case"esp32_s3_photopainter":return"Waveshare PhotoPainter (7-Color)";case"trmnl":return"Official TRMNL (ESP32-C3)";case"reterminal_e1001":default:return"reTerminal E1001 (Monochrome)"}}function xo(){const n=Je();return!!(R&&R[n]&&(R[n].features?.lcd||R[n].features?.oled))}function De(){const n=window.AppState,e=n?.settings?.renderingMode||"direct";if(e==="oepl"||e==="opendisplay"){const t=(n?.project?.protocolHardware||{}).colorMode||"bw";return t==="full_color"?["black","white","red","green","blue","yellow","orange","gray","purple","cyan","magenta"]:t==="color_3"?["black","white","red","yellow","gray"]:["theme_auto","black","white","gray"]}if(xo())return["black","white","red","green","blue","yellow","orange","gray","purple","cyan","magenta"];const i=Je();return i==="reterminal_e1002"?["theme_auto","black","white","gray","red","green","blue","yellow"]:i==="esp32_s3_photopainter"?["theme_auto","black","white","gray","red","green","blue","yellow"]:["theme_auto","black","white","gray"]}function un(n){if(!n)return"#000000";if(n.startsWith("#"))return n;if(n.startsWith("0x"))return"#"+n.substring(2);switch(n.toLowerCase()){case"theme_auto":return window.WidgetFactory?.getEffectiveDarkMode?.()||!1?"#ffffff":"#000000";case"theme_auto_inverse":return window.WidgetFactory?.getEffectiveDarkMode?.()||!1?"#000000":"#ffffff";case"white":return"#ffffff";case"red":return"#ff0000";case"green":return"#00ff00";case"blue":return"#0000ff";case"yellow":return"#ffff00";case"orange":return"#ffa500";case"gray":return"#a0a0a0";case"transparent":return"transparent";case"black":default:return"#000000"}}window.getDeviceModel=Je;window.getDeviceDisplayName=Wa;window.isRGBDevice=xo;window.getAvailableColors=De;window.getColorStyle=un;let Nt={};try{Nt=Object.assign({"../../features/battery_icon/plugin.js":()=>T(()=>import("./plugin-BH_Pxr8u.js"),[],import.meta.url),"../../features/calendar/plugin.js":()=>T(()=>import("./plugin-S3V4flt8.js"),[],import.meta.url),"../../features/datetime/plugin.js":()=>T(()=>import("./plugin-QFj7_QKS.js"),[],import.meta.url),"../../features/debug_grid/plugin.js":()=>T(()=>import("./plugin-CvgA3hVX.js"),[],import.meta.url),"../../features/graph/plugin.js":()=>T(()=>import("./plugin-JEuxgVRl.js"),[],import.meta.url),"../../features/icon/plugin.js":()=>T(()=>import("./plugin-CP3SjZnj.js"),__vite__mapDeps([0,1]),import.meta.url),"../../features/image/plugin.js":()=>T(()=>import("./plugin-DgdTPz86.js"),[],import.meta.url),"../../features/line/plugin.js":()=>T(()=>import("./plugin-CtkwmmCu.js"),[],import.meta.url),"../../features/lvgl_arc/plugin.js":()=>T(()=>import("./plugin-BaLQtIqC.js"),[],import.meta.url),"../../features/lvgl_bar/plugin.js":()=>T(()=>import("./plugin-CVWAoy6Z.js"),[],import.meta.url),"../../features/lvgl_button/plugin.js":()=>T(()=>import("./plugin-C4pgOk-0.js"),[],import.meta.url),"../../features/lvgl_buttonmatrix/plugin.js":()=>T(()=>import("./plugin-DtT_tKeS.js"),[],import.meta.url),"../../features/lvgl_chart/plugin.js":()=>T(()=>import("./plugin-R5o1nSZe.js"),[],import.meta.url),"../../features/lvgl_checkbox/plugin.js":()=>T(()=>import("./plugin-BRVTPE6T.js"),[],import.meta.url),"../../features/lvgl_dropdown/plugin.js":()=>T(()=>import("./plugin-L0eEHvUV.js"),[],import.meta.url),"../../features/lvgl_img/plugin.js":()=>T(()=>import("./plugin-f57OwwD8.js"),[],import.meta.url),"../../features/lvgl_keyboard/plugin.js":()=>T(()=>import("./plugin-DeB-lHQz.js"),[],import.meta.url),"../../features/lvgl_label/plugin.js":()=>T(()=>import("./plugin-9cI4aa6d.js"),[],import.meta.url),"../../features/lvgl_led/plugin.js":()=>T(()=>import("./plugin-C0pzB8KN.js"),[],import.meta.url),"../../features/lvgl_line/plugin.js":()=>T(()=>import("./plugin-CIJpTQBC.js"),[],import.meta.url),"../../features/lvgl_meter/plugin.js":()=>T(()=>import("./plugin-N7Qsoa78.js"),[],import.meta.url),"../../features/lvgl_obj/plugin.js":()=>T(()=>import("./plugin-C9NtUHZv.js"),[],import.meta.url),"../../features/lvgl_qrcode/plugin.js":()=>T(()=>import("./plugin-DDonTtnh.js"),[],import.meta.url),"../../features/lvgl_roller/plugin.js":()=>T(()=>import("./plugin-BOaP5PSU.js"),[],import.meta.url),"../../features/lvgl_slider/plugin.js":()=>T(()=>import("./plugin-DReFujad.js"),[],import.meta.url),"../../features/lvgl_spinbox/plugin.js":()=>T(()=>import("./plugin-BW1ApCZ9.js"),[],import.meta.url),"../../features/lvgl_spinner/plugin.js":()=>T(()=>import("./plugin-DtLA1P9z.js"),[],import.meta.url),"../../features/lvgl_switch/plugin.js":()=>T(()=>import("./plugin-B4S7fS5o.js"),[],import.meta.url),"../../features/lvgl_tabview/plugin.js":()=>T(()=>import("./plugin-DaGcPuSC.js"),[],import.meta.url),"../../features/lvgl_textarea/plugin.js":()=>T(()=>import("./plugin-DaifM060.js"),[],import.meta.url),"../../features/lvgl_tileview/plugin.js":()=>T(()=>import("./plugin-DGvnqI6n.js"),[],import.meta.url),"../../features/odp_arc/plugin.js":()=>T(()=>import("./plugin-B6NitfGO.js"),[],import.meta.url),"../../features/odp_ellipse/plugin.js":()=>T(()=>import("./plugin-BW3KBBjl.js"),[],import.meta.url),"../../features/odp_icon_sequence/plugin.js":()=>T(()=>import("./plugin-DlAbENrg.js"),[],import.meta.url),"../../features/odp_multiline/plugin.js":()=>T(()=>import("./plugin-C1r9ymxd.js"),[],import.meta.url),"../../features/odp_plot/plugin.js":()=>T(()=>import("./plugin-BhZ7eZih.js"),[],import.meta.url),"../../features/odp_polygon/plugin.js":()=>T(()=>import("./plugin-Q8fHNnFv.js"),[],import.meta.url),"../../features/odp_rectangle_pattern/plugin.js":()=>T(()=>import("./plugin-DkzfAmKe.js"),[],import.meta.url),"../../features/ondevice_humidity/plugin.js":()=>T(()=>import("./plugin-3EhbHUOs.js"),[],import.meta.url),"../../features/ondevice_temperature/plugin.js":()=>T(()=>import("./plugin-C8LmJBDo.js"),[],import.meta.url),"../../features/online_image/plugin.js":()=>T(()=>import("./plugin-DnezKQ5p.js"),[],import.meta.url),"../../features/progress_bar/plugin.js":()=>T(()=>import("./plugin-Bvmi5kcV.js"),__vite__mapDeps([2,3]),import.meta.url),"../../features/qr_code/plugin.js":()=>T(()=>import("./plugin-BjehXpMH.js"),[],import.meta.url),"../../features/quote_rss/plugin.js":()=>T(()=>import("./plugin-0UsHhqoi.js"),[],import.meta.url),"../../features/rounded_rect/plugin.js":()=>T(()=>import("./plugin-CJla1PBE.js"),[],import.meta.url),"../../features/sensor_text/plugin.js":()=>T(()=>import("./plugin-DRdbYd23.js"),__vite__mapDeps([4,3,1]),import.meta.url),"../../features/shape_circle/plugin.js":()=>T(()=>import("./plugin-DFwQ0fom.js"),[],import.meta.url),"../../features/shape_rect/plugin.js":()=>T(()=>import("./plugin-CJ96h1Ag.js"),[],import.meta.url),"../../features/template_nav_bar/plugin.js":()=>T(()=>import("./plugin-R2HVg-OM.js"),[],import.meta.url),"../../features/template_sensor_bar/plugin.js":()=>T(()=>import("./plugin-Bs-nurMN.js"),[],import.meta.url),"../../features/text/plugin.js":()=>T(()=>import("./plugin-BFzoUmss.js"),__vite__mapDeps([5,1]),import.meta.url),"../../features/touch_area/plugin.js":()=>T(()=>import("./plugin-xrzIxdG0.js"),[],import.meta.url),"../../features/weather_forecast/plugin.js":()=>T(()=>import("./plugin-DCP-mFKe.js"),[],import.meta.url),"../../features/weather_icon/plugin.js":()=>T(()=>import("./plugin-CS-08bZ9.js"),[],import.meta.url),"../../features/wifi_signal/plugin.js":()=>T(()=>import("./plugin-Br23tr4M.js"),[],import.meta.url)})}catch{}let $a=class{constructor(){this.plugins=new Map,this.loading=new Map,this.aliases={label:"text",rectangle:"shape_rect",rrect:"rounded_rect",circle:"shape_circle",nav_next_page:"touch_area",nav_previous_page:"touch_area",nav_reload_page:"touch_area",puppet:"online_image",multiline:"odp_multiline",rectangle_pattern:"odp_rectangle_pattern",polygon:"odp_polygon",ellipse:"odp_ellipse",icon_sequence:"odp_icon_sequence",weather_forcast:"weather_forecast",odp_debug_grid:"debug_grid"}}register(e){if(!e||!e.id){b.warn("[Registry] Invalid plugin registration attempt:",e);return}const i=e.id,o=this.plugins.get(i)||{};this.plugins.set(i,{...o,...e}),b.log(`[Registry] Registered: ${i}`)}get(e){const i=this.aliases[e]||e;return this.plugins.get(i)}getAll(){return Array.from(this.plugins.values())}async load(e){const i=this.aliases[e]||e;if(i==="group")return null;if(this.plugins.has(i))return this.plugins.get(i);if(this.loading.has(i))return this.loading.get(i);const o=(async()=>{try{const t=`../../features/${i}/plugin.js`;let s;return Nt[t]?s=await Nt[t]():(b.log(`[Registry] Using dynamic import fallback for: ${i}`),s=await import(t)),s.default?this.register(s.default):this.register({id:i,...s}),this.loading.delete(i),this.plugins.get(i)}catch(t){return b.error(`[Registry] Failed to load plugin "${i}" from ESM:`,t),this.loading.delete(i),null}})();return this.loading.set(i,o),o}onExportGlobals(e){this.getAll().forEach(i=>i.onExportGlobals&&i.onExportGlobals(e))}onExportEsphome(e){this.getAll().forEach(i=>i.onExportEsphome&&i.onExportEsphome(e))}onExportNumericSensors(e){this.getAll().forEach(i=>i.onExportNumericSensors&&i.onExportNumericSensors(e))}onExportTextSensors(e){this.getAll().forEach(i=>i.onExportTextSensors&&i.onExportTextSensors(e))}onExportBinarySensors(e){this.getAll().forEach(i=>i.onExportBinarySensors&&i.onExportBinarySensors(e))}onExportHelpers(e){this.getAll().forEach(i=>i.onExportHelpers&&i.onExportHelpers(e))}onExportComponents(e){this.getAll().forEach(i=>i.onExportComponents&&i.onExportComponents(e))}onCollectRequirements(e){this.getAll().forEach(i=>i.collectRequirements&&i.collectRequirements(e))}};const W=new $a;window.PluginRegistry=W;window.FeatureRegistry=W;b.log("[Registry] Modular system ready.");let Ze=class Ie{static getEffectiveDarkMode(){const i=g?.getCurrentPage?.()?.dark_mode;return i==="dark"?!0:i==="light"?!1:!!(g&&g.settings&&g.settings.dark_mode)}static getDefaultColor(){return Ie.getEffectiveDarkMode()?"white":"black"}static getDefaultBgColor(){return Ie.getEffectiveDarkMode()?"black":"white"}static getGridCellDefaults(){return{grid_cell_row_pos:null,grid_cell_column_pos:null,grid_cell_row_span:1,grid_cell_column_span:1,grid_cell_x_align:"STRETCH",grid_cell_y_align:"STRETCH"}}static isLvglWidget(e){return e&&e.startsWith("lvgl_")}static createWidget(e){const i=Ce(),o=Ie.getDefaultColor(),t=Ie.getDefaultBgColor();let s={id:i,type:e,x:40,y:40,width:120,height:40,title:"",entity_id:"",locked:!1,props:{}};switch(e){case"nav_next_page":return s.props={title:"Next",color:"rgba(0, 128, 255, 0.2)",border_color:"#0080ff",nav_action:"next_page",icon:"F0142",icon_size:48},s.width=80,s.height=80,s;case"nav_previous_page":return s.props={title:"Previous",color:"rgba(0, 128, 255, 0.2)",border_color:"#0080ff",nav_action:"previous_page",icon:"F0141",icon_size:48},s.width=80,s.height=80,s;case"nav_reload_page":return s.props={title:"Reload",color:"rgba(0, 128, 255, 0.2)",border_color:"#0080ff",nav_action:"reload_page",icon:"F0450",icon_size:48},s.width=80,s.height=80,s}const r=W.get(e);return r&&r.defaults?(s.props={...r.defaults},(s.props.color==="black"||s.props.color==="white")&&(s.props.color="theme_auto"),(s.props.text_color==="black"||s.props.text_color==="white")&&(s.props.text_color="theme_auto"),(s.props.bg_color==="black"||s.props.bg_color==="white")&&(s.props.bg_color=t),(s.props.background_color==="black"||s.props.background_color==="white")&&(s.props.background_color=t),(s.props.border_color==="black"||s.props.border_color==="white")&&(s.props.border_color=o),r.width&&(s.width=r.width),r.height&&(s.height=r.height),r.defaults.width&&(s.width=r.defaults.width),r.defaults.height&&(s.height=r.defaults.height),r.defaults.w&&(s.width=r.defaults.w),r.defaults.h&&(s.height=r.defaults.h),s):(Ie.isLvglWidget(e)&&(s.props={...Ie.getGridCellDefaults(),...s.props}),s)}};window.WidgetFactory=Ze;class za{constructor(){b.log("Sidebar: Constructor called"),this.pageListEl=document.getElementById("pageList"),this.pagesHeader=document.getElementById("pagesHeader"),this.pagesContent=document.getElementById("pagesContent"),this.widgetPaletteEl=document.getElementById("widgetPalette"),b.log("Sidebar: widgetPaletteEl found?",!!this.widgetPaletteEl),this.widgetPaletteEl||b.error("Sidebar: widgetPalette element not found!"),this.addPageBtn=document.getElementById("addPageBtn"),this.currentPageNameEl=document.getElementById("currentPageName"),this.hoverTimeout=null,this.hoveredPageIndex=-1}init(){b.log("Sidebar: init called");const e=document.getElementById("debug-overlay");e&&(e.innerHTML+="Sidebar.init called<br>"),q(C.STATE_CHANGED,()=>this.render()),q(C.PAGE_CHANGED,()=>this.render()),this.pagesHeader&&this.pagesContent&&this.pagesHeader.addEventListener("click",()=>{const t=this.pagesContent.classList.toggle("hidden"),s=this.pagesHeader.querySelector(".chevron");s&&(s.style.transform=t?"rotate(-90deg)":"rotate(0deg)")}),this.addPageBtn&&this.addPageBtn.addEventListener("click",()=>this.handleAddPage()),this.widgetPaletteEl&&(this.widgetPaletteEl.addEventListener("click",t=>this.handlePaletteClick(t)),this.widgetPaletteEl.addEventListener("dragstart",t=>{const s=t.target.closest(".item[data-widget-type]");if(s){const r=s.getAttribute("data-widget-type");b.log("[Sidebar] Drag start:",r),t.dataTransfer.setData("application/widget-type",r),t.dataTransfer.effectAllowed="copy"}})),document.addEventListener("click",t=>{const s=document.getElementById("debug-overlay");s&&(s.innerHTML+="Global click: "+t.target.tagName+"<br>")});const i=document.getElementById("clearAllBtn");i&&i.addEventListener("click",()=>this.handleClearPage());const o=document.getElementById("quickSearchBtn");o&&o.addEventListener("click",t=>{t.stopPropagation(),window.QuickSearch?window.QuickSearch.open():b.warn("Sidebar: QuickSearch instance not found on window")}),this.setupMobileToggles(),this.render()}render(){if(!this.pageListEl)return;this.pageListEl.innerHTML="";const e=g.pages,i=g.currentPageIndex;if(e.forEach((o,t)=>{const s=document.createElement("div");s.className="item"+(t===i?" active":""),s.draggable=!0,s.ondragstart=p=>{p.dataTransfer.setData("text/plain",t),p.dataTransfer.effectAllowed="move",s.style.opacity="0.5"},s.ondragend=()=>{s.style.opacity="1",Array.from(this.pageListEl.children).forEach(p=>{p.style.borderTop="",p.style.borderBottom=""})},s.ondragover=p=>{p.preventDefault();const h=p.dataTransfer.types.includes("application/widget-id"),u=p.dataTransfer.types.includes("application/widget-type");if(h||u){p.dataTransfer.dropEffect=h?"move":"copy",s.style.backgroundColor="var(--primary-subtle)",g.currentPageIndex!==t&&g.setCurrentPageIndex(t);return}const m=s.getBoundingClientRect(),y=m.top+m.height/2;p.clientY<y?(s.style.borderTop="2px solid var(--primary)",s.style.borderBottom=""):(s.style.borderTop="",s.style.borderBottom="2px solid var(--primary)")},s.ondragleave=p=>{const h=p.relatedTarget;s.contains(h)||this.hoveredPageIndex===t&&(this.hoverTimeout&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=null),this.hoveredPageIndex=-1),s.style.borderTop="",s.style.borderBottom="",s.style.backgroundColor=""},s.ondrop=p=>{p.preventDefault(),this.hoverTimeout&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=null),this.hoveredPageIndex=-1,s.style.borderTop="",s.style.borderBottom="",s.style.backgroundColor="";const h=p.dataTransfer.getData("application/widget-id"),u=p.dataTransfer.getData("application/widget-type");if(h){b.log(`[Sidebar] Drop detected on page ${t}. Widget ID:`,h);const f=t;f!==g.currentPageIndex&&(g.moveWidgetToPage(h,f),b.log(`[Sidebar] Moved widget ${h} to page ${f}`));return}if(u){b.log(`[Sidebar] Drop detected on page ${t}. Widget Type:`,u);const f=t;try{const _=Ze.createWidget(u);_.x=40,_.y=40,g.addWidget(_,f),g.setCurrentPageIndex(f),g.selectWidget(_.id,!1),b.log(`[Sidebar] Added new ${u} to page ${f}`)}catch(_){b.error("[Sidebar] Error creating widget from drop:",_)}return}const m=parseInt(p.dataTransfer.getData("text/plain"),10),y=t;this.handlePageReorder(m,y,p.clientY,s)},s.onclick=()=>{g.setCurrentPageIndex(t,{forceFocus:!0})},s.ondblclick=p=>{p.stopPropagation();const h=o.name||"",u=prompt("Rename Page:",h);u!==null&&u.trim()!==""&&u!==h&&g.renamePage(t,u)};const r=document.createElement("span");r.className="item-icon",r.innerHTML=`<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>`,s.appendChild(r);const a=document.createElement("span");a.className="label",a.textContent=o.name,s.appendChild(a);const l=document.createElement("div");l.style.marginLeft="auto",l.style.display="flex",l.style.gap="2px";const c=document.createElement("button");c.textContent="⚙",c.className="btn btn-secondary",c.style.padding="1px 4px",c.style.fontSize="8px",c.onclick=p=>{p.stopPropagation(),this.openPageSettings(t)},l.appendChild(c);const d=document.createElement("button");if(d.textContent="⧉",d.className="btn btn-secondary",d.style.padding="1px 4px",d.style.fontSize="8px",d.title="Duplicate Page",d.onclick=p=>{p.stopPropagation(),g.duplicatePage(t)},l.appendChild(d),e.length>1){const p=document.createElement("button");p.textContent="✕",p.className="btn btn-secondary",p.style.padding="1px 4px",p.style.fontSize="8px",p.style.color="var(--danger)",p.onclick=h=>{h.stopPropagation(),this.handlePageDelete(t,o)},l.appendChild(p)}s.appendChild(l),this.pageListEl.appendChild(s)}),this.currentPageNameEl){const o=g.getCurrentPage();this.currentPageNameEl.textContent=o?o.name:"None"}}handleAddPage(){g.addPage()}handlePageReorder(e,i,o,t){if(e===i)return;const s=t.getBoundingClientRect(),r=s.top+s.height/2;let a=i;o>=r&&a++,e<a&&a--,e!==a&&g.reorderPage(e,a)}handlePaletteClick(e){const i=document.getElementById("debug-overlay");i&&(i.innerHTML+="handlePaletteClick triggered<br>"),b.log("Sidebar: handlePaletteClick",e.target);const o=e.target.closest(".item[data-widget-type]");if(!o){b.log("Sidebar: No item found"),i&&(i.innerHTML+="No item found<br>");return}const t=o.getAttribute("data-widget-type");b.log("Sidebar: Creating widget of type",t),i&&(i.innerHTML+="Creating widget: "+t+"<br>");try{const s=Ze.createWidget(t);b.log("Sidebar: Widget created",s),i&&(i.innerHTML+="Widget created<br>"),g.addWidget(s),b.log("Sidebar: Widget added to state"),window.app&&window.app.canvas&&(window.app.canvas.suppressNextFocus=!0),i&&(i.innerHTML+="Widget added to state<br>")}catch(s){b.error("Sidebar: Error creating/adding widget",s),i&&(i.innerHTML+="Error: "+s.message+"<br>")}}openPageSettings(e){if(window.app&&window.app.pageSettings)window.app.pageSettings.open(e);else{b.error("Sidebar: PageSettings instance not found on window.app");const i=g.pages[e];window.currentPageSettingsTarget=i;const o=document.getElementById("pageSettingsModal");o&&(o.classList.remove("hidden"),o.style.display="flex")}}handlePageDelete(e,i){const o=document.createElement("div");o.className="modal-backdrop",o.style.display="flex",o.innerHTML=`
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
        `,document.body.appendChild(o);const t=()=>o.remove(),s=()=>{t();try{typeof g.deletePage=="function"?g.deletePage(e):(console.error("AppState.deletePage is missing"),typeof M=="function"&&M("Error: AppState.deletePage not found","error"))}catch(r){console.error("[Sidebar] Error deleting page:",r),typeof M=="function"&&M("Error deleting page: "+r.message,"error")}};o.querySelectorAll(".close-btn").forEach(r=>r.onclick=t),o.querySelector(".confirm-btn").onclick=s,o.onclick=r=>{r.target===o&&t()}}handleClearPage(){const e=g||window.AppState;if(!e){console.error("[Sidebar] AppState is not defined!"),typeof M=="function"&&M("Error: Application State is not ready.","error");return}const i=document.createElement("div");i.className="modal-backdrop",i.style.display="flex",i.innerHTML=`
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
        `,document.body.appendChild(i);const o=()=>{i.remove()},t=()=>{o();try{console.log("[Sidebar] Executing clearCurrentPage...");const a=e.clearCurrentPage(!0);a.preserved>0&&typeof M=="function"?M(`Cleared ${a.deleted} widgets. ${a.preserved} locked widget(s) were preserved.`,"info"):a.deleted>0?M(`Cleared all ${a.deleted} widgets.`,"success"):a.preserved>0?M(`No widgets cleared. ${a.preserved} locked widget(s) preserved.`,"info"):M("Page is already empty.","info"),b.log("Cleared widgets from current page via AppState")}catch(a){console.error("[Sidebar] Error clearing page:",a),typeof M=="function"&&M("Error clearing page: "+a.message,"error")}};i.querySelectorAll(".close-btn").forEach(a=>a.onclick=o);const r=i.querySelector(".confirm-btn");r.onclick=t,i.onclick=a=>{a.target===i&&o()}}setupMobileToggles(){const e=document.getElementById("mobileWidgetsBtn"),i=document.getElementById("mobilePropsBtn"),o=document.getElementById("mobileDeviceBtn"),t=document.getElementById("mobileBackdrop"),s=document.querySelector(".sidebar"),r=document.querySelector(".right-panel"),a=()=>{s?.classList.remove("mobile-active"),r?.classList.remove("mobile-active"),t?.classList.remove("active")};e?.addEventListener("click",()=>{const d=s?.classList.contains("mobile-active");a(),d||(s?.classList.add("mobile-active"),t?.classList.add("active"))}),i?.addEventListener("click",()=>{const d=r?.classList.contains("mobile-active");a(),d||(r?.classList.add("mobile-active"),t?.classList.add("active"))}),o?.addEventListener("click",()=>{a(),window.app?.deviceSettings?.open()}),document.getElementById("mobileEditorSettingsBtn")?.addEventListener("click",()=>{a(),window.app?.editorSettings?.open()}),t?.addEventListener("click",a),q(C.SELECTION_CHANGED,()=>{window.innerWidth<=768&&(s?.classList.remove("mobile-active"),!r?.classList.contains("mobile-active")&&!s?.classList.contains("mobile-active")&&t?.classList.remove("active"))});const c=this.handlePaletteClick.bind(this);this.handlePaletteClick=d=>{c(d),window.innerWidth<=768&&a()}}}function be(n){if(!n.canvas)return;const e=g.pages,i=g.getCanvasDimensions();n.canvas.querySelectorAll(".snap-guide");const o=n.canvas.querySelector(".lasso-selection");n.canvas.innerHTML="",g.settings.editor_light_mode?n.canvas.classList.add("light-mode"):n.canvas.classList.remove("light-mode");const t=g.getCurrentPage();t&&Nn(t)?n.viewport&&n.viewport.classList.add("device-dark-mode"):n.viewport&&n.viewport.classList.remove("device-dark-mode"),e.forEach((l,c)=>{const d=i.width,p=i.height,h=document.createElement("div");h.className="artboard-wrapper",h.dataset.index=c,c===g.currentPageIndex&&h.classList.add("active-page");const u=document.createElement("div");u.className="artboard-header",u.appendChild(Ae("mdi-cog-outline","Page Settings",()=>{window.pageSettings&&window.pageSettings.open(c)}));const m=document.createElement("span");m.className="artboard-name",m.textContent=l.name||`Page ${c+1}`,u.appendChild(m);const y=document.createElement("div");y.className="artboard-actions",c>0&&y.appendChild(Ae("mdi-chevron-left","Move Left",()=>{g.reorderPage(c,c-1)})),c<e.length-1&&y.appendChild(Ae("mdi-chevron-right","Move Right",()=>{g.reorderPage(c,c+1)})),y.appendChild(Ae("mdi-plus","Add Page After",()=>{g.addPage(c+1)})),y.appendChild(Ae("mdi-eraser","Clear Current Page",()=>{Hn({title:"Clear Page",message:`Are you sure you want to clear all widgets from <b>"${l.name||`Page ${c+1}`}"</b>?<br><br>This cannot be undone.`,confirmLabel:"Clear Page",confirmClass:"btn-danger",onConfirm:()=>{g.setCurrentPageIndex(c),g.clearCurrentPage()}})})),y.appendChild(Ae("mdi-delete-outline","Delete Page",()=>{Hn({title:"Delete Page",message:`Are you sure you want to delete the page <b>"${l.name||`Page ${c+1}`}"</b>?<br><br>All widgets on this page will be lost.`,confirmLabel:"Delete Page",confirmClass:"btn-danger",onConfirm:()=>{g.deletePage(c)}})})),u.appendChild(y);const f=document.createElement("div");f.className="artboard-header-container",f.style.width=d+"px",f.appendChild(u);const _=320;if(d<_){const x=d/_;u.style.width=_+"px",u.style.transform=`scale(${x})`,u.style.transformOrigin="top left",f.style.height=40*x+"px"}else u.style.width="100%",u.style.transform="none",f.style.height="auto";h.appendChild(f);const v=g.getCanvasShape(),S=v==="round"||v==="circle",w=document.createElement("div");w.className="artboard",w.dataset.index=c,w.style.width=`${d}px`,w.style.height=`${p}px`;const E=Nn(l);if(w.classList.toggle("dark",E),w.classList.toggle("round-display",S),g.showGrid){const x=document.createElement("div");x.className="canvas-grid",w.appendChild(x)}g.showDebugGrid&&Va(w),l.layout&&/^\d+x\d+$/.test(l.layout)&&Ua(w,l.layout,i,E);for(const x of l.widgets){const I=document.createElement("div");I.className="widget",I.style.left=x.x+"px",I.style.top=x.y+"px",I.style.width=x.width+"px",I.style.height=x.height+"px",I.dataset.id=x.id,I.dataset.pageIndex=c,g.selectedWidgetIds.includes(x.id)&&I.classList.add("active"),x.locked&&I.classList.add("locked"),x.hidden&&I.classList.add("hidden-widget");const k=(x.type||"").toLowerCase(),P=W?W.get(k):null;if(k==="group")I.classList.add("widget-group"),I.innerHTML="";else if(P&&P.render)try{const A=B=>{if(B==="theme_auto")return E?"#ffffff":"#000000";if(B==="theme_auto_inverse")return E?"#000000":"#ffffff";const $=B;return $?un($):E?"#ffffff":"#000000"},j=g.selectedWidgetIds.includes(x.id),N=g.settings.device_model||"reterminal_e1001",H=R?R[N]:null;P.render(I,x,{getColorStyle:A,selected:j,profile:H,isDark:E})}catch{I.textContent=`Error: ${k}`,I.style.border="2px solid red"}else I.innerText=`Missing: ${k}`,I.style.color="red",I.style.border="1px dashed red";k!=="group"&&Ya(I),w.appendChild(I)}h.appendChild(w),n.canvas.appendChild(h)});const s=document.createElement("div");s.className="add-page-placeholder",s.title="Click to add a new page",s.style.width=`${i.width}px`,s.style.height=`${i.height}px`,s.style.marginTop="32px",s.style.position="relative",s.style.zIndex="2000",s.style.pointerEvents="auto",s.innerHTML=`
        <div class="plus-icon">+</div>
        <div class="label">Add Page</div>
    `;const r=g.getCanvasShape();(r==="round"||r==="circle")&&s.classList.add("round-display");const a=l=>{if(b.log("[Canvas] Add Page placeholder clicked"),l.stopPropagation(),l.preventDefault(),g.addPage()){const d=g.pages.length-1;window.app&&window.app.canvas&&(window.app.canvas.suppressNextFocus=!0),g.setCurrentPageIndex(d)}};s.addEventListener("mousedown",l=>l.stopPropagation()),s.addEventListener("click",a),n.canvas.appendChild(s),o&&n.canvas.appendChild(o),hn(n)}function Nn(n){const e=n?.dark_mode;return e==="dark"?!0:e==="light"?!1:!!g.settings.darkMode}function Ua(n,e,i,o){const t=e.match(/^(\d+)x(\d+)$/);if(!t)return;const s=parseInt(t[1],10),r=parseInt(t[2],10),a=document.createElement("div");a.className="lvgl-grid-overlay",a.style.cssText=`
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        display: grid;
        grid-template-rows: repeat(${s}, 1fr);
        grid-template-columns: repeat(${r}, 1fr);
        pointer-events: none;
        z-index: 1;
    `;const l=o?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)",c=o?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.25)";for(let d=0;d<s;d++)for(let p=0;p<r;p++){const h=document.createElement("div");h.style.cssText=`border: 1px dashed ${l}; position: relative; box-sizing: border-box;`;const u=document.createElement("span");u.textContent=`${d},${p}`,u.style.cssText=`position: absolute; top: 2px; left: 4px; font-size: 8px; color: ${c}; pointer-events: none;`,h.appendChild(u),a.appendChild(h)}n.appendChild(a)}function pe(n){const e=g.zoomLevel,i=g.settings;n.canvasContainer&&(n.canvasContainer.style.transform=`translate(${n.panX}px, ${n.panY}px) scale(${e})`,n.canvasContainer.style.transformOrigin="0 0");const o=(i.grid_opacity!==void 0?i.grid_opacity:8)/100;document.documentElement.style.setProperty("--grid-opacity",o.toString());const t=document.getElementById("zoomLevel");t&&(t.textContent=Math.round(e*100)+"%")}function _t(n,e,i=!0,o=!1){const s=n.canvas.querySelectorAll(".artboard-wrapper")[e];if(s){const r=n.viewport.getBoundingClientRect(),a=r.width,l=r.height;if(a===0||l===0){requestAnimationFrame(()=>_t(n,e,i,o));return}if(o){const h=wo(n,e);g.setZoomLevel(h)}const c=g.zoomLevel,d=s.offsetLeft+s.offsetWidth/2,p=s.offsetTop+s.offsetHeight/2;n.panX=a/2-d*c,n.panY=l/2-p*c,pe(n)}}function ja(n,e=!0){const i=n.canvas.querySelectorAll(".artboard-wrapper");if(i.length===0)return;let o=1/0,t=1/0,s=-1/0,r=-1/0;i.forEach(v=>{const S=v.offsetLeft,w=v.offsetTop,E=v.offsetWidth,x=v.offsetHeight;o=Math.min(o,S),t=Math.min(t,w),s=Math.max(s,S+E),r=Math.max(r,w+x)});const a=n.viewport.getBoundingClientRect(),l=a.width,c=a.height;if(l===0||c===0)return;const d=80,p=s-o+d,h=r-t+d,u=l/p,m=c/h;let y=Math.min(u,m);y=Math.max(.05,Math.min(2,y)),g.setZoomLevel(y);const f=o+(s-o)/2,_=t+(r-t)/2;n.panX=l/2-f*y,n.panY=c/2-_*y,pe(n)}function wo(n,e=g.currentPageIndex){const o=n.canvas.querySelectorAll(".artboard-wrapper")[e];if(!o)return 1;const t=n.viewport.getBoundingClientRect(),s=64,r=o.offsetWidth+s,a=o.offsetHeight+s,l=t.width/r,c=t.height/a,d=Math.min(l,c),p=Math.min(t.width,t.height),h=Math.max(.15,Math.min(1,p/800));return Math.max(h,Math.min(4,d))}function So(n,e,i=!1){if(!e||!e.id)return;const o=n.canvas.querySelector(`.widget[data-id="${e.id}"]`);if(o){o.style.left=e.x+"px",o.style.top=e.y+"px",o.style.width=e.width+"px",o.style.height=e.height+"px";const t=(e.type||"").toLowerCase(),s=W?W.get(t):null;if(t==="group")o.classList.add("widget-group");else if(!i&&s&&s.render)try{const r=d=>d==="theme_auto"?je()?"#ffffff":"#000000":d==="theme_auto_inverse"?je()?"#000000":"#ffffff":d?un(d):je()?"#ffffff":"#000000",a=g.selectedWidgetIds.includes(e.id),l=g.settings.device_model||"reterminal_e1001",c=R?R[l]:null;s.render(o,e,{getColorStyle:r,selected:a,profile:c,isDark:je()})}catch{}}}function je(){const e=g.getCurrentPage()?.dark_mode;return e==="dark"?!0:e==="light"?!1:!!g.settings.darkMode}function Ya(n){["tl","tc","tr","rc","br","bc","bl","lc"].forEach(i=>{const o=document.createElement("div");o.className=`widget-resize-handle handle-${i}`,o.dataset.handle=i,n.appendChild(o)})}function hn(n){const e=g.selectedWidgetIds,i=n.canvas.querySelector(`.artboard-wrapper[data-index="${g.currentPageIndex}"]`),o=i?i.querySelector(".artboard"):null;let t=n.canvas.querySelector(".context-toolbar");if(e.length===0||n.dragState||n.lassoState||!o){t&&t.remove();return}const s=g.getSelectedWidgets();if(s.length===0||!i||!o){t&&t.remove();return}let r=1/0,a=1/0,l=-1/0,c=-1/0;s.forEach(u=>{r=Math.min(r,u.x),a=Math.min(a,u.y),l=Math.max(l,u.x+(u.width||0)),c=Math.max(c,u.y+(u.height||0))});const d=r,p=o.offsetTop+a-45;if(t?t.parentElement!==i&&i.appendChild(t):(t=document.createElement("div"),t.className="context-toolbar",i.appendChild(t)),t.style.left=d+"px",t.style.top=p+"px",t.innerHTML="",e.length>1&&([{icon:"mdi-align-horizontal-left",title:"Align Left",action:"left"},{icon:"mdi-align-horizontal-center",title:"Align Center",action:"center"},{icon:"mdi-align-horizontal-right",title:"Align Right",action:"right"},{separator:!0},{icon:"mdi-align-vertical-top",title:"Align Top",action:"top"},{icon:"mdi-align-vertical-center",title:"Align Middle",action:"middle"},{icon:"mdi-align-vertical-bottom",title:"Align Bottom",action:"bottom"}].forEach(m=>{if(m.separator){et(t);return}ze(t,m.icon,m.title,()=>g.alignSelectedWidgets(m.action))}),e.length>=3&&(et(t),ze(t,"mdi-distribute-horizontal-center","Distribute Horizontally",()=>g.distributeSelectedWidgets("horizontal")),ze(t,"mdi-distribute-vertical-center","Distribute Vertically",()=>g.distributeSelectedWidgets("vertical")))),s.some(u=>u.type==="group"||u.parentId)?(t.children.length>0&&et(t),ze(t,"mdi-ungroup","Ungroup (Ctrl+Shift+G)",()=>g.ungroupSelection())):e.length>1&&(t.children.length>0&&et(t),ze(t,"mdi-group","Group Selection (Ctrl+G)",()=>g.groupSelection())),t.children.length===0){t.remove();return}}function ze(n,e,i,o){const t=document.createElement("button");t.className="btn-icon",t.title=i,t.innerHTML=`<i class="mdi ${e}"></i>`,t.onclick=s=>{s.stopPropagation(),o()},n.appendChild(t)}function et(n){if(!n.lastElementChild||n.lastElementChild.classList.contains("separator"))return;const e=document.createElement("div");e.className="separator",n.appendChild(e)}function Ae(n,e,i){const o=document.createElement("button");return o.className="artboard-btn",o.title=e,o.innerHTML=`<i class="mdi ${n}"></i>`,o.onclick=t=>{t.stopPropagation(),i()},o}function Hn({title:n,message:e,confirmLabel:i,confirmClass:o,onConfirm:t}){const s=document.createElement("div");s.className="modal-backdrop",s.style.display="flex",s.innerHTML=`
        <div class="modal" style="width: 340px; height: auto; padding: var(--space-4); border-radius: 12px; border: 1px solid var(--glass-border);">
            <div class="modal-header" style="font-size: var(--fs-md); font-weight: 600; padding-bottom: var(--space-3); border-bottom: 1px solid var(--border-subtle);">
                <div>${n}</div>
            </div>
            <div class="modal-body" style="padding: var(--space-4) 0;">
                <p style="font-size: var(--fs-sm); line-height: 1.5; color: var(--text-dim);">
                    ${e}
                </p>
            </div>
            <div class="modal-actions" style="display: flex; gap: 8px; justify-content: flex-end; padding-top: var(--space-3);">
                <button class="btn btn-secondary close-btn btn-xs" style="border-radius: 6px;">Cancel</button>
                <button class="btn ${o} confirm-btn btn-xs" style="border-radius: 6px;">${i||"Confirm"}</button>
            </div>
        </div>
    `,document.body.appendChild(s);const r=s.querySelector(".close-btn"),a=s.querySelector(".confirm-btn");r.onclick=()=>s.remove(),a.onclick=()=>{t(),s.remove()}}function Va(n,e,i){const o=document.createElement("div");o.className="debug-grid-overlay",n.appendChild(o)}const Fn=Object.freeze(Object.defineProperty({__proto__:null,applyZoom:pe,calculateZoomToFit:wo,focusPage:_t,getEffectiveDarkMode:je,render:be,renderContextToolbar:hn,updateWidgetDOM:So,zoomToFitAll:ja},Symbol.toStringTag,{value:"Module"}));class qa{constructor(e){this.canvasInstance=e,this.topRuler=document.getElementById("rulerTop"),this.leftRuler=document.getElementById("rulerLeft"),this.container=document.querySelector(".canvas-rulers"),this.viewport=e.viewport,this.indicators=null,this.init()}init(){!this.topRuler||!this.leftRuler||(this.topCtx=this.createRulerCanvas(this.topRuler),this.leftCtx=this.createRulerCanvas(this.leftRuler),this.update())}createRulerCanvas(e){const i=document.createElement("canvas");return e.appendChild(i),i.getContext("2d")}setIndicators(e){this.indicators=e,this.update()}update(){if(!g.showRulers){this.container&&(this.container.style.display="none"),this.viewport&&this.viewport.classList.remove("with-rulers");return}this.container&&(this.container.style.display="block"),this.viewport&&this.viewport.classList.add("with-rulers");const e=document.querySelector(".artboard-wrapper.active-page .artboard");if(!e)return;const i=this.topRuler.getBoundingClientRect(),o=this.leftRuler.getBoundingClientRect(),t=e.getBoundingClientRect(),s=g.zoomLevel;this.drawHorizontal(i,t,s),this.drawVertical(o,t,s)}drawHorizontal(e,i,o){const t=this.topCtx,s=t.canvas,r=window.devicePixelRatio||1;(s.width!==e.width*r||s.height!==e.height*r)&&(s.width=e.width*r,s.height=e.height*r,t.scale(r,r),s.style.width=e.width+"px",s.style.height=e.height+"px"),t.clearRect(0,0,e.width,e.height);const a=i.left-e.left;if(this.indicators){const d=a+this.indicators.x*o,p=(this.indicators.w||0)*o;t.fillStyle="hsla(var(--accent-h), 85%, 65%, 0.15)",t.fillRect(d,0,p,e.height),t.fillStyle="var(--accent)",t.fillRect(d,e.height-2,p,2)}t.strokeStyle="#4b5563",t.fillStyle="#9ca3af",t.font='9px "JetBrains Mono", monospace',t.lineWidth=1;const l=Math.floor(-a/o/10)*10,c=Math.ceil((e.width-a)/o/10)*10;for(let d=l;d<=c;d+=10){const p=a+d*o;if(p<0||p>e.width)continue;const h=d%100===0,u=d%50===0,m=h?12:u?8:4;t.beginPath(),t.moveTo(p,e.height),t.lineTo(p,e.height-m),t.stroke(),h&&t.fillText(d.toString(),p+2,10)}}drawVertical(e,i,o){const t=this.leftCtx,s=t.canvas,r=window.devicePixelRatio||1;(s.width!==e.width*r||s.height!==e.height*r)&&(s.width=e.width*r,s.height=e.height*r,t.scale(r,r),s.style.width=e.width+"px",s.style.height=e.height+"px"),t.clearRect(0,0,e.width,e.height);const a=i.top-e.top;if(this.indicators){const d=a+this.indicators.y*o,p=(this.indicators.h||0)*o;t.fillStyle="hsla(var(--accent-h), 85%, 65%, 0.15)",t.fillRect(0,d,e.width,p),t.fillStyle="var(--accent)",t.fillRect(e.width-2,d,2,p)}t.strokeStyle="#4b5563",t.fillStyle="#9ca3af",t.font='9px "JetBrains Mono", monospace',t.lineWidth=1;const l=Math.floor(-a/o/10)*10,c=Math.ceil((e.height-a)/o/10)*10;for(let d=l;d<=c;d+=10){const p=a+d*o;if(p<0||p>e.height)continue;const h=d%100===0,u=d%50===0,m=h?12:u?8:4;t.beginPath(),t.moveTo(e.width,p),t.lineTo(e.width-m,p),t.stroke(),h&&(t.save(),t.translate(10,p+2),t.rotate(-Math.PI/2),t.fillText(d.toString(),0,0),t.restore())}}}function Xa(n){n.viewport&&(n.viewport.addEventListener("dragenter",e=>{n.dragState||(n.isExternalDragging=!0)}),n.viewport.addEventListener("dragover",e=>{e.preventDefault(),e.dataTransfer.dropEffect="copy",n.dragState||(n.isExternalDragging=!0);const i=e.target.closest(".artboard-wrapper");document.querySelectorAll(".artboard-wrapper.drag-over").forEach(t=>{t!==i&&t.classList.remove("drag-over")}),i&&i.classList.add("drag-over");const o=e.target.closest(".add-page-placeholder");if(o)o.classList.add("drag-over");else{const t=document.querySelector(".add-page-placeholder.drag-over");t&&t.classList.remove("drag-over")}}),n.viewport.addEventListener("dragleave",e=>{(e.relatedTarget===null||!n.viewport.contains(e.relatedTarget))&&(n.isExternalDragging=!1,document.querySelectorAll(".artboard-wrapper.drag-over, .add-page-placeholder.drag-over").forEach(i=>{i.classList.remove("drag-over")}))}),n.viewport.addEventListener("drop",async e=>{e.preventDefault(),e.stopPropagation(),n.isExternalDragging=!1,document.querySelectorAll(".artboard-wrapper.drag-over, .add-page-placeholder.drag-over").forEach(d=>{d.classList.remove("drag-over")});const i=e.dataTransfer.getData("application/widget-type")||e.dataTransfer.getData("text/plain");if(!i)return;const o=e.clientX,t=e.clientY;let s=e.target;s===n.viewport&&(s=document.elementFromPoint(o,t));const r=s?.closest(".artboard-wrapper"),a=s?.closest(".add-page-placeholder");let l=-1,c=null;if(r){l=parseInt(r.dataset.index,10);const d=r.querySelector(".artboard");d&&(c=d.getBoundingClientRect())}else if(a)l=g.pages.length;else{l=g.currentPageIndex;const d=n.canvas.querySelector(`.artboard[data-index="${l}"]`);d&&(c=d.getBoundingClientRect())}b.log("[Canvas] Atomic drop capture - type:",i,"page:",l);try{const d=W.load(i);if(a){if(!g.addPage())return;l=g.pages.length-1,await new Promise(f=>setTimeout(f,50));const y=n.canvas.querySelector(`.artboard[data-index="${l}"]`);y&&(c=y.getBoundingClientRect())}await d;const p=Ze.createWidget(i);if(!p){b.error("[Canvas] WidgetFactory.createWidget returned null for type:",i);return}const h=g.zoomLevel,u=g.getCanvasDimensions();if(c){const m=(o-c.left)/h,y=(t-c.top)/h;p.x=Math.round(m-p.width/2),p.y=Math.round(y-p.height/2)}else b.warn("[Canvas] No targetRect, using fallback position"),p.x=40,p.y=40;p.x=Math.max(0,Math.min(u.width-p.width,p.x)),p.y=Math.max(0,Math.min(u.height-p.height,p.y)),n.suppressNextFocus=!0,g.addWidget(p,l),g.currentPageIndex!==l&&g.setCurrentPageIndex(l),g.selectWidget(p.id,!1),b.log(`[Canvas] Successfully added ${i} at (${p.x}, ${p.y})`)}catch(d){b.error("[Canvas] error creating widget from drop:",d)}}))}function Ka(n){n.viewport&&n.viewport.addEventListener("mousedown",e=>{if(e.button===1){e.preventDefault(),e.stopPropagation(),n.panState={startX:e.clientX,startY:e.clientY,startPanX:n.panX,startPanY:n.panY},n.viewport.style.cursor="grabbing",document.body.classList.add("panning-active");const i=t=>{if(n.panState){const s=t.clientX-n.panState.startX,r=t.clientY-n.panState.startY;n.panX=n.panState.startPanX+s,n.panY=n.panState.startPanY+r,pe(n)}},o=()=>{n.panState=null,n.viewport.style.cursor="auto",document.body.classList.remove("panning-active"),window.removeEventListener("mousemove",i),window.removeEventListener("mouseup",o)};window.addEventListener("mousemove",i),window.addEventListener("mouseup",o)}})}function Ja(n){const e=document.getElementById("zoomInBtn"),i=document.getElementById("zoomOutBtn"),o=document.getElementById("zoomResetBtn"),t=document.getElementById("gridToggleBtn"),s=document.getElementById("debugGridToggleBtn"),r=document.getElementById("rulersToggleBtn"),a=document.getElementById("editorGridOpacity");e&&e.addEventListener("click",()=>Ht(n)),i&&i.addEventListener("click",()=>Ft(n)),o&&o.addEventListener("click",()=>st(n)),t&&(t.classList.toggle("active",!!g.showGrid),t.addEventListener("click",()=>{const l=!g.showGrid;g.setShowGrid(l),l&&(g.setShowDebugGrid(!1),s&&s.classList.remove("active")),t.classList.toggle("active",l),L(C.STATE_CHANGED)})),s&&(s.classList.toggle("active",!!g.showDebugGrid),s.addEventListener("click",()=>{const l=!g.showDebugGrid;g.setShowDebugGrid(l),l&&(g.setShowGrid(!1),t&&t.classList.remove("active")),s.classList.toggle("active",l),L(C.STATE_CHANGED)})),r&&(r.classList.toggle("active",!!g.showRulers),r.addEventListener("click",()=>{const l=!g.showRulers;g.setShowRulers(l),r.classList.toggle("active",l),b.log(`[Canvas] Rulers toggled: ${l}`)})),a&&a.addEventListener("input",l=>{g.updateSettings({grid_opacity:parseInt(l.target.value,10)})}),n.canvasContainer&&n.canvasContainer.addEventListener("wheel",l=>{l.preventDefault(),Gn(l,n)},{passive:!1}),n.viewport&&n.viewport.addEventListener("wheel",l=>{l.preventDefault(),Gn(l,n)},{passive:!1}),document.addEventListener("keydown",l=>{l.ctrlKey&&(l.key==="+"||l.key==="=")?(l.preventDefault(),Ht(n)):l.ctrlKey&&l.key==="-"?(l.preventDefault(),Ft(n)):l.ctrlKey&&l.key==="0"||l.ctrlKey&&l.key.toLowerCase()==="r"?(l.preventDefault(),st(n)):l.ctrlKey&&l.key.toLowerCase()==="g"&&(l.preventDefault(),l.shiftKey?g.ungroupSelection():g.groupSelection())})}function Gn(n,e){const i=g.zoomLevel;let o=0;if(n.ctrlKey)o=n.deltaY>0?-.02:.02;else if(n.deltaMode===0&&n.deltaX===0&&Math.abs(n.deltaY)>=50)o=n.deltaY>0?-.05:.05;else{e.panX-=n.deltaX,e.panY-=n.deltaY,pe(e);return}if(o===0)return;const t=Math.min(Math.max(i+o,.1),5);if(t===i)return;const s=e.viewport.getBoundingClientRect(),r=n.clientX-s.left,a=n.clientY-s.top,l=(r-e.panX)/i,c=(a-e.panY)/i;e.panX=r-l*t,e.panY=a-c*t,g.setZoomLevel(t),pe(e)}function Ht(n){Eo(.05,n)}function Ft(n){Eo(-.05,n)}function Eo(n,e){const i=g.zoomLevel,o=Math.min(Math.max(i+n,.1),5);if(o!==i){if(e&&e.viewport){const t=e.viewport.getBoundingClientRect(),s=t.width/2,r=t.height/2,a=(s-e.panX)/i,l=(r-e.panY)/i;e.panX=s-a*o,e.panY=r-l*o}g.setZoomLevel(o),e&&pe(e)}}function st(n){g.setZoomLevel(1),n.focusPage(g.currentPageIndex,!0)}function ge(){document.querySelectorAll(".snap-guide").forEach(e=>e.remove())}function Io(n,e,i){const o=i||n.canvas;if(!o||typeof o.appendChild!="function")return;const t=document.createElement("div");t.className="snap-guide snap-guide-vertical",t.style.left=`${Math.round(e)}px`,o.appendChild(t)}function Co(n,e,i){const o=i||n.canvas;if(!o||typeof o.appendChild!="function")return;const t=document.createElement("div");t.className="snap-guide snap-guide-horizontal",t.style.top=`${Math.round(e)}px`,o.appendChild(t)}function ko(n,e){const i=g.getCurrentPage(),o=[],t=[];if(o.push(0,e.width/2,e.width),t.push(0,e.height/2,e.height),i&&Array.isArray(i.widgets))for(const s of i.widgets){if(!s||s.id===n)continue;const r=s.x,a=s.x+(s.width||0),l=s.y,c=s.y+(s.height||0),d=r+(s.width||0)/2,p=l+(s.height||0)/2;o.push(r,d,a),t.push(l,p,c)}return{vertical:o,horizontal:t}}function Wn(n,e,i,o,t){const s=t||n.canvas;if(!s)return;const r=document.createElement("div");r.className=`snap-guide distance-marker distance-marker-${o}`;let a,l,c,d,p;if(o==="h"){const u=e.x<i.x?e.x+e.w:i.x+i.w,m=e.x<i.x?i.x:e.x;if(a=u,l=Math.min(e.y+e.h/2,i.y+i.h/2),c=m-u,c<=0)return;p=Math.round(c),r.style.left=`${a}px`,r.style.top=`${l}px`,r.style.width=`${c}px`,r.style.height="1px";const y=document.createElement("div");y.className="distance-marker-h-tick-start";const f=document.createElement("div");f.className="distance-marker-h-tick-end",r.appendChild(y),r.appendChild(f)}else{const u=e.y<i.y?e.y+e.h:i.y+i.h,m=e.y<i.y?i.y:e.y;if(l=u,a=Math.min(e.x+e.w/2,i.x+i.w/2),d=m-u,d<=0)return;p=Math.round(d),r.style.left=`${a}px`,r.style.top=`${l}px`,r.style.width="1px",r.style.height=`${d}px`;const y=document.createElement("div");y.className="distance-marker-v-tick-start";const f=document.createElement("div");f.className="distance-marker-v-tick-end",r.appendChild(y),r.appendChild(f)}const h=document.createElement("div");h.className="distance-marker-label",h.textContent=p,r.appendChild(h),s.appendChild(r)}function gn(n,e,i,o,t,s,r,a=!1){if(!g.snapEnabled||t)return ge(),{x:Math.round(i),y:Math.round(o)};const c=(g.getCurrentPage()?.widgets||[]).filter(x=>x.id!==e.id&&!x.hidden),d=ko(e.id,s),p=e.width||0,h=e.height||0;let u=i,m=o,y=null,f=null;const _=[{val:i,apply:x=>u=x},{val:i+p/2,apply:x=>u=x-p/2},{val:i+p,apply:x=>u=x-p}];let v=_e+1;for(const x of _)for(const I of d.vertical){const k=Math.abs(x.val-I);k<=_e&&k<v&&(v=k,y=I,x.apply(I))}const S=[{val:o,apply:x=>m=x},{val:o+h/2,apply:x=>m=x-h/2},{val:o+h,apply:x=>m=x-h}];let w=_e+1;for(const x of S)for(const I of d.horizontal){const k=Math.abs(x.val-I);k<=_e&&k<w&&(w=k,f=I,x.apply(I))}const E={x:u,y:m,w:p,h};return ge(),y!=null&&Io(n,y,r),f!=null&&Co(n,f,r),a&&c.forEach(x=>{const I={x:x.x,y:x.y,w:x.width,h:x.height};if(E.y<I.y+I.h&&E.y+E.h>I.y){const A=E.x<I.x?I.x-(E.x+E.w):E.x-(I.x+I.w);A>0&&A<150&&Wn(n,E,I,"h",r)}if(E.x<I.x+I.w&&E.x+E.w>I.x){const A=E.y<I.y?I.y-(E.y+E.h):E.y-(I.y+I.h);A>0&&A<150&&Wn(n,E,I,"v",r)}}),{x:Math.round(u),y:Math.round(m)}}function fn(n,e,i,o,t,s){const r=t.match(/^(\d+)x(\d+)$/);if(!r)return{x:n,y:e};const a=parseInt(r[1],10),l=parseInt(r[2],10),c=s.width/l,d=s.height/a,p=n+i/2,h=e+o/2,u=Math.round(p/c-.5),m=Math.round(h/d-.5),y=Math.max(0,Math.min(l-1,u)),f=Math.max(0,Math.min(a-1,m));return{x:Math.round(y*c),y:Math.round(f*d)}}function Po(n){const e=g.getCurrentPage();if(!e||!e.layout)return;const i=e.layout.match(/^(\d+)x(\d+)$/);if(!i)return;const o=g.getWidgetById(n);if(!o)return;const t=parseInt(i[1],10),s=parseInt(i[2],10),r=g.getCanvasDimensions(),a=r.width/s,l=r.height/t,c=o.x+o.width/2,d=o.y+o.height/2,p=Math.floor(c/a),h=Math.floor(d/l),u=Math.max(0,Math.min(t-1,h)),m=Math.max(0,Math.min(s-1,p)),y={...o.props,grid_cell_row_pos:u,grid_cell_column_pos:m},f=Math.max(1,Math.round(o.height/l)),_=Math.max(1,Math.round(o.width/a));y.grid_cell_row_span=f,y.grid_cell_column_span=_,g.updateWidget(n,{props:y})}function Za(n){const e=g.getWidgetById(n);if(!e)return;const i=g.getCanvasDimensions(),o=g.getCurrentPage();let t;if(o?.layout)t=fn(e.x,e.y,e.width,e.height,o.layout,i);else{const s=g.snapEnabled;g.setSnapEnabled(!0),t=gn({canvas:{querySelectorAll:()=>[]}},e,e.x,e.y,!1,i),g.setSnapEnabled(s)}t&&(g.updateWidget(n,{x:t.x,y:t.y}),Po(n),g.recordHistory())}function tt(n,e,i,o,t,s){if(!g.snapEnabled||o)return n;const r=ko(i,t),a=e==="v"?r.vertical:r.horizontal;let l=_e+1,c=n,d=null;for(const p of a){const h=Math.abs(n-p);h<=_e&&h<l&&(l=h,c=p,d=p)}return d!==null&&(e==="v"?Io({canvas:s},d,s):Co({canvas:s},d,s)),c}let Ct=0,kt=null,$n=0,zn=null;function Qa(n,e,i,o,t,s){Gt(n);const r=document.createElement("div");r.className="drag-ghost-container",r.style.cssText=`
        position: fixed;
        pointer-events: none;
        z-index: 99999;
        opacity: 1.0; 
        transform-origin: top left;
        transform: scale(${t});
        transition: none;
    `;const a=n.dragState?.id,l=s.find(u=>u.id===a)||s[0],c=e.find(u=>u.id===l?.id)||e[0],d=document.querySelector(`.widget[data-id="${c.id}"]`);if(!c||!d)return;const p=[],h=g.getCurrentPage();e.forEach(u=>{if(p.push(u),u.type==="group"){const m=h.widgets.filter(y=>y.parentId===u.id);p.push(...m)}}),p.forEach(u=>{const m=document.querySelector(`.widget[data-id="${u.id}"]`);if(m){const y=m.closest(".artboard"),f=document.createElement("div");f.className=(y?y.className:"artboard")+" ghost-context-sim",f.style.cssText=`
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
            `;const _=document.createElement("div");for(const S of m.attributes)_.setAttribute(S.name,S.value);_.classList.remove("active","dragging-source","locked"),_.classList.add("drag-ghost-widget");const v=window.getComputedStyle(m);_.style.cssText=m.style.cssText,_.style.position="absolute",_.style.top="0",_.style.left="0",_.style.margin="0",_.style.transform="none",_.style.setProperty("background",v.background,"important"),_.style.setProperty("background-color",v.backgroundColor,"important"),_.style.setProperty("border",v.border,"important"),_.style.setProperty("border-radius",v.borderRadius,"important"),_.innerHTML=m.innerHTML,f.appendChild(_),r.appendChild(f)}}),l&&(n.dragGhostOffset={x:l.clickOffsetX*t,y:l.clickOffsetY*t}),document.body.appendChild(r),n.dragGhostEl=r,el(n,i,o),e.forEach(u=>{const m=document.querySelector(`.widget[data-id="${u.id}"]`);m&&m.classList.add("dragging-source")})}function el(n,e,i){if(!n.dragGhostEl||!n.dragGhostOffset)return;const o=n.dragGhostOffset,t=e-o.x,s=i-o.y;n.dragGhostEl.style.left=t+"px",n.dragGhostEl.style.top=s+"px"}function tl(n,e,i){n.dragGhostEl&&(n.dragGhostEl.style.left=e+"px",n.dragGhostEl.style.top=i+"px")}function Gt(n){n.dragGhostEl&&(n.dragGhostEl.remove(),n.dragGhostEl=null,n.dragGhostOffset=null),document.querySelectorAll(".widget.dragging-source").forEach(e=>{e.classList.remove("dragging-source")})}function nl(n,e,i,o){const t=n.canvas.querySelector(`.artboard-wrapper[data-index="${e}"]`);if(!t)return;const s=t.querySelector(".artboard-header");if(!s)return;const r=s.cloneNode(!0);r.classList.add("page-drag-ghost");const a=s.getBoundingClientRect(),l=i-a.left,c=o-a.top;r.style.cssText=`
        position: fixed;
        left: ${i}px;
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
    `,document.body.appendChild(r),n.pageDragGhost=r,n.pageDragOffset={x:l,y:c},t.classList.add("reordering")}function il(n,e,i){n.pageDragGhost&&(n.pageDragGhost.style.left=e+"px",n.pageDragGhost.style.top=i+"px")}function ol(n,e){n.pageDragGhost&&(n.pageDragGhost.remove(),n.pageDragGhost=null);const i=n.canvas.querySelector(`.artboard-wrapper[data-index="${e}"]`);i&&i.classList.remove("reordering")}function sl(n,e){const i=g.getWidgetById(e);if(!i)return;const o=(i.type||"").toLowerCase();if(o!=="text"&&o!=="label")return;const t=n.canvas.querySelector(`.widget[data-id="${e}"]`);if(!t)return;const s=g.zoomLevel,r=t.getBoundingClientRect(),a=document.createElement("textarea");a.value=i.props.text||i.title||"",a.style.position="absolute",a.style.left=r.left+window.scrollX+"px",a.style.top=r.top+window.scrollY+"px",a.style.width=Math.max(50,r.width)+"px",a.style.height=Math.max(30,r.height)+"px",a.style.zIndex="99999";const l=i.props||{},c=(l.font_size||20)*s;a.style.fontSize=c+"px",a.style.fontFamily=(l.font_family||"Roboto")+", sans-serif",a.style.fontWeight=l.font_weight||400,a.style.fontStyle=l.italic?"italic":"normal",a.style.textAlign=(l.text_align||"LEFT").split("_").pop().toLowerCase(),a.style.color=l.color||"black",a.style.background="rgba(255, 255, 255, 0.9)",a.style.border="1px solid #1a73e8",a.style.padding="0px",a.style.resize="both",a.style.outline="none",a.style.overflow="hidden",a.style.lineHeight="1.2",document.body.appendChild(a),a.focus(),a.select();const d=()=>{if(!a.isConnected&&!a.parentElement)return;a.removeEventListener("blur",p),a.removeEventListener("keydown",h);const u=a.value;u!==(i.props.text||i.title)&&g.updateWidget(e,{props:{...i.props,text:u}}),a.remove()},p=()=>d(),h=u=>{u.key==="Enter"&&!u.shiftKey&&(u.preventDefault(),d()),u.key==="Escape"&&a.remove(),a.style.height=a.scrollHeight+"px"};a.addEventListener("blur",p),a.addEventListener("keydown",h)}function rl(n){n.canvas.addEventListener("mousedown",i=>{if(i.button!==0)return;ge();const o=i.target.closest(".artboard-wrapper");if(!o||i.target.closest(".artboard-btn")||i.target.closest("button")){document.activeElement&&!i.target.closest("button")&&document.activeElement.blur(),!i.target.closest("button")&&!i.target.closest(".artboard-btn")&&(g.selectWidgets([]),be(n));return}const t=parseInt(o.dataset.index,10),s=o.querySelector(".artboard");let r=s;const a=i.target.closest(".widget");let l=a?.dataset.id;const c=g.currentPageIndex!==t,d=!!i.target.closest(".artboard-header");if(i.target.closest(".artboard"),c){const u=[...g.selectedWidgetIds];g.setCurrentPageIndex(t,{suppressFocus:!0}),l&&g.selectWidgets(u.includes(l)?u:[l]);const m=n.canvas.querySelector(`.artboard[data-index="${t}"]`);m&&(r=m)}else if(d){n.dragState={mode:"reorder-page",pageIndex:t,startX:i.clientX,startY:i.clientY},nl(n,t,i.clientX,i.clientY),window.addEventListener("mousemove",n._boundMouseMove),window.addEventListener("mouseup",n._boundMouseUp),i.preventDefault();return}const p=r.getBoundingClientRect(),h=g.zoomLevel;if(a){const u=a.dataset.id,m=i.shiftKey||i.ctrlKey,y=Date.now();if(u===kt&&y-Ct<300){sl(n,u),Ct=0,kt=null,i.preventDefault(),i.stopPropagation();return}Ct=y,kt=u,m?g.selectWidget(u,!0):g.selectedWidgetIds.includes(u)||g.selectWidget(u,!1);const f=g.getWidgetById(u);if(!f)return;let _=f,v=u;if(f.parentId){const w=g.getWidgetById(f.parentId);w&&(_=w,v=w.id,g.selectWidget(v,m))}if(i.target.classList.contains("widget-resize-handle")){if(f.parentId||_.locked)return;n.dragState={mode:"resize",handle:i.target.dataset.handle||"br",id:v,startX:i.clientX,startY:i.clientY,startW:_.width,startH:_.height,startWidgetX:_.x,startWidgetY:_.y,artboardEl:r,dragStartPanX:n.panX,dragStartPanY:n.panY}}else{if(_.locked)return;const w=g.getSelectedWidgets(),E=w.map(x=>{const I=n.canvas.querySelector(`.widget[data-id="${x.id}"]`);return I&&I.getBoundingClientRect(),p.left+x.x*h,p.top+x.y*h,{id:x.id,startX:x.x,startY:x.y,clickOffsetX:(i.clientX-p.left)/h-x.x,clickOffsetY:(i.clientY-p.top)/h-x.y}});n.dragState={mode:"move",id:v,widgets:E,artboardEl:r,dragStartX:i.clientX,dragStartY:i.clientY,dragStartPanX:n.panX,dragStartPanY:n.panY},Qa(n,w,i.clientX,i.clientY,h,E),n.rulers&&n.rulers.setIndicators({x:_.x,y:_.y,w:_.width,h:_.height})}window.addEventListener("mousemove",n._boundMouseMove),window.addEventListener("mouseup",n._boundMouseUp),i.preventDefault()}else{const u=(i.clientX-p.left)/h,m=(i.clientY-p.top)/h,y=Date.now(),f=t===zn&&y-$n<300;$n=y,zn=t,n.lassoState={startTime:y,isDoubleClick:f,focusParams:f||c&&!l?{index:t,fitZoom:f}:null,startX:u,startY:m,rect:null,isAdditive:i.shiftKey||i.ctrlKey,initialSelection:[...g.selectedWidgetIds],artboardEl:r},n.lassoEl=document.createElement("div"),n.lassoEl.className="lasso-selection",s.appendChild(n.lassoEl),window.addEventListener("mousemove",n._boundMouseMove),window.addEventListener("mouseup",n._boundMouseUp),i.preventDefault()}}),n.canvas.addEventListener("contextmenu",i=>{if(n.pinchState||n.touchState?.hasMoved||n.dragState?.mode==="resize"||n.lassoState?.rect){i.preventDefault();return}i.preventDefault();const o=i.target.closest(".widget"),t=o?o.dataset.id:null;window.RadialMenu&&window.RadialMenu.show(i.clientX,i.clientY,t)});let e=document.querySelector(".debug-cursor-tooltip");e||(e=document.createElement("div"),e.className="debug-cursor-tooltip",document.body.appendChild(e)),n.canvas.addEventListener("mousemove",i=>{if(!g.showDebugGrid){e.style.display="none";return}const o=i.target.closest(".artboard");if(!o){e.style.display="none";return}const t=o.getBoundingClientRect(),s=g.zoomLevel,r=Math.round((i.clientX-t.left)/s),a=Math.round((i.clientY-t.top)/s);e.style.display="block",e.style.left=i.clientX+"px",e.style.top=i.clientY+"px",e.innerHTML=`<span>X:</span>${r} <span>Y:</span>${a}`}),n.canvas.addEventListener("mouseleave",()=>{e.style.display="none"})}function al(n,e){const i=g.zoomLevel,o=g.getCanvasDimensions();if(e.dragState){if(e.dragState.mode==="move"){const t=document.querySelector(`.artboard[data-index="${g.currentPageIndex}"]`);if(!t)return;const s=(n.clientX-e.dragState.dragStartX)/i+(e.dragState.dragStartPanX-e.panX)/i,r=(n.clientY-e.dragState.dragStartY)/i+(e.dragState.dragStartPanY-e.panY)/i,a=g.getWidgetById(e.dragState.id);if(!a)return;const l=e.dragState.widgets.find(S=>S.id===e.dragState.id);if(!l)return;let c=l.startX+s,d=l.startY+r;const p=g.getCurrentPage();if(p?.layout&&!n.altKey){ge();const S=fn(c,d,a.width,a.height,p.layout,o);c=S.x,d=S.y}else if(g.snapEnabled&&!n.altKey){const S=gn(e,a,c,d,n.altKey,o,t,n.ctrlKey);c=S.x,d=S.y}else ge();const h=t.getBoundingClientRect(),u=h.left+c*i,m=h.top+d*i;tl(e,u,m);const y=c-l.startX,f=d-l.startY,_=y,v=f;for(const S of e.dragState.widgets){const w=g.getWidgetById(S.id);w&&!w.locked&&(w.x=S.startX+_,w.y=S.startY+v,w.type==="group"&&p.widgets.filter(x=>x.parentId===w.id).forEach(x=>{e.dragState.widgets.find(I=>I.id===x.id)||(x.x+=_-(e.dragState.lastDx||0),x.y+=v-(e.dragState.lastDy||0))}))}e.dragState.lastDx=_,e.dragState.lastDy=v,e.rulers&&e.rulers.setIndicators({x:c,y:d,w:a.width,h:a.height})}else if(e.dragState.mode==="resize"){const t=g.getWidgetById(e.dragState.id);if(!t)return;ge();const s=e.dragState,r=s.handle,a=(s.dragStartPanX-e.panX)/i,l=(s.dragStartPanY-e.panY)/i,c=(n.clientX-s.startX)/i+a,d=(n.clientY-s.startY)/i+l;let p=s.startWidgetX,h=s.startWidgetY,u=s.startW,m=s.startH;if(r.includes("l")){const _=s.startWidgetX+c;p=tt(_,"v",t.id,n.altKey,o,s.artboardEl),u=s.startWidgetX+s.startW-p}else if(r.includes("r")){const _=s.startWidgetX+s.startW+c;u=tt(_,"v",t.id,n.altKey,o,s.artboardEl)-s.startWidgetX}if(r.includes("t")){const _=s.startWidgetY+d;h=tt(_,"h",t.id,n.altKey,o,s.artboardEl),m=s.startWidgetY+s.startH-h}else if(r.includes("b")){const _=s.startWidgetY+s.startH+d;m=tt(_,"h",t.id,n.altKey,o,s.artboardEl)-s.startWidgetY}const y=4;isNaN(u)&&(u=s.startW),isNaN(m)&&(m=s.startH),u<y&&(r.includes("l")&&(p=s.startWidgetX+s.startW-y),u=y),m<y&&(r.includes("t")&&(h=s.startWidgetY+s.startH-y),m=y);const f=(t.type||"").toLowerCase();if(f==="line"||f==="lvgl_line"){const _=t.props||{},v=_.orientation||"horizontal",S=parseInt(_.stroke_width||_.line_width||3,10);v==="vertical"?(u=S,m=Math.max(10,m)):(m=S,u=Math.max(10,u))}if(p=Math.max(0,Math.min(o.width-u,p)),h=Math.max(0,Math.min(o.height-m,h)),t.x=Math.round(p),t.y=Math.round(h),t.width=Math.round(u),t.height=Math.round(m),f==="icon"||f==="weather_icon"||f==="battery_icon"||f==="wifi_signal"||f==="ondevice_temperature"||f==="ondevice_humidity"){const _=t.props||{};if(_.fit_icon_to_frame){const S=Math.max(8,Math.min(t.width-8,t.height-8));_.size=Math.round(S)}else{const v=Math.max(8,Math.min(t.width,t.height));_.size=Math.round(v)}}else if(f==="shape_circle"){const _=Math.max(t.width,t.height);t.width=_,t.height=_}So(e,t),e.rulers&&e.rulers.setIndicators({x:t.x,y:t.y,w:t.width,h:t.height})}else if(e.dragState.mode==="reorder-page"){il(e,n.clientX,n.clientY),document.querySelectorAll(".artboard-wrapper").forEach(r=>r.classList.remove("drag-over"));const s=document.elementFromPoint(n.clientX,n.clientY)?.closest(".artboard-wrapper");s&&parseInt(s.dataset.index,10)!==e.dragState.pageIndex&&s.classList.add("drag-over")}}else if(e.lassoState){const t=e.lassoState.artboardEl;if(!t)return;const s=t.getBoundingClientRect(),r=(n.clientX-s.left)/i,a=(n.clientY-s.top)/i,l=Math.min(e.lassoState.startX,r),c=Math.min(e.lassoState.startY,a),d=Math.abs(r-e.lassoState.startX),p=Math.abs(a-e.lassoState.startY);e.lassoState.rect={x:l,y:c,w:d,h:p},e.lassoEl&&(e.lassoEl.style.left=l+"px",e.lassoEl.style.top=c+"px",e.lassoEl.style.width=d+"px",e.lassoEl.style.height=p+"px");const h=g.getCurrentPage();if(h){const u=new Set(e.lassoState.isAdditive?e.lassoState.initialSelection:[]);e.lassoState.currentSelection=[];const m={x1:l,y1:c,x2:l+d,y2:c+p};for(const y of h.widgets){const f={x1:y.x,y1:y.y,x2:y.x+y.width,y2:y.y+y.height},_=!(f.x2<m.x1||f.x1>m.x2||f.y2<m.y1||f.y1>m.y2),v=e.canvas.querySelector(`.widget[data-id="${y.id}"]`);v&&(_?(v.classList.add("active"),u.add(y.id)):e.lassoState.isAdditive&&e.lassoState.initialSelection.includes(y.id)?v.classList.add("active"):v.classList.remove("active"))}e.lassoState.currentSelection=Array.from(u),g.selectWidgets(e.lassoState.currentSelection)}n.preventDefault(),n.stopPropagation()}}function ll(n,e){if(e.dragState){const i=e.dragState.id,o=e.dragState.mode;if(o==="move"){const r=e.canvas.querySelector(`.widget[data-id="${i}"]`),a=r?r.style.pointerEvents:"";r&&(r.style.pointerEvents="none");const l=document.elementFromPoint(n.clientX,n.clientY);r&&(r.style.pointerEvents=a);const c=l?.closest(".artboard"),d=l?.closest(".add-page-placeholder"),p=g.currentPageIndex;let h=-1;if(c)h=parseInt(c.dataset.index,10);else if(d){e.suppressNextFocus=!0;const u=g.pages.length;g.addPage(u)&&(h=u,b.log(`[Canvas] Created new page ${h} at index ${h}. Source was ${p}`))}else{const u=l?.closest("#pageList .item");if(u){const m=document.getElementById("pageList");h=Array.from(m.querySelectorAll(".item")).indexOf(u)}}if(h!==-1&&h!==p){const u=e.dragState.widgets;d&&be(e);let m=e.canvas.querySelector(`.artboard[data-index="${h}"]`),y=0;window.removeEventListener("mousemove",e._boundMouseMove),window.removeEventListener("mouseup",e._boundMouseUp),Gt(e),e.dragState=null,ge();let f=null;const _=g.zoomLevel;m&&(f=m.getBoundingClientRect());const v=new Set(u.map(w=>w.id));if(u.filter(w=>{const E=g.getWidgetById(w.id);return!E.parentId||!v.has(E.parentId)}).forEach(w=>{let E=w.startX,x=w.startY;if(f){const I=g.getWidgetById(w.id),k=g.getCanvasDimensions();E=Math.round((n.clientX-f.left)/_-w.clickOffsetX),x=Math.round((n.clientY-f.top)/_-w.clickOffsetY);const P=I?.width||50,A=I?.height||50;E=Math.max(0,Math.min(k.width-P,E)),x=Math.max(0,Math.min(k.height-A,x))}else d&&(E=40,x=40);g.moveWidgetToPage(w.id,h,E,x)&&y++}),y>0){b.log(`[Canvas] Successfully moved ${y} widgets to page ${h}`),g.setCurrentPageIndex(h,{suppressFocus:!0}),be(e);return}}}else if(o==="reorder-page"){const r=e.dragState.pageIndex,l=document.elementFromPoint(n.clientX,n.clientY)?.closest(".artboard-wrapper");if(ol(e,r),document.querySelectorAll(".artboard-wrapper").forEach(c=>c.classList.remove("drag-over")),l){const c=parseInt(l.dataset.index,10);c!==r&&g.reorderPage(r,c)}}window.removeEventListener("mousemove",e._boundMouseMove),window.removeEventListener("mouseup",e._boundMouseUp),Gt(e);const t=g.getCanvasDimensions();(e.dragState?.widgets||[]).forEach(r=>{const a=g.getWidgetById(r.id);a&&!a.locked&&(a.x=Math.max(0,Math.min(t.width-a.width,a.x)),a.y=Math.max(0,Math.min(t.height-a.height,a.y)))}),e.dragState=null,e.rulers&&e.rulers.setIndicators(null),ge(),Po(i),g.recordHistory(),L(C.STATE_CHANGED),be(e)}else if(e.lassoState){if(window.removeEventListener("mousemove",e._boundMouseMove),window.removeEventListener("mouseup",e._boundMouseUp),e.lassoEl&&(e.lassoEl.remove(),e.lassoEl=null),Date.now()-e.lassoState.startTime,!!e.lassoState.rect){const o=e.lassoState.currentSelection||[];g.selectWidgets(o)}else if(e.lassoState.isAdditive||g.selectWidgets([]),e.lassoState.focusParams){const{index:o,fitZoom:t}=e.lassoState.focusParams;t&&_t(e,g.currentPageIndex,!0,!0)}e.lassoState=null,be(e),n.preventDefault(),n.stopPropagation()}}function dl(n){!n.canvas||!n.canvasContainer||(n._boundTouchMove=e=>cl(e,n),n._boundTouchEnd=e=>pl(e,n),n.canvas.addEventListener("touchstart",e=>{const i=e.touches,o=n.viewport.getBoundingClientRect();if(document.body.classList.add("interaction-active"),e.stopImmediatePropagation(),i.length===2){e.preventDefault();const t=(i[0].clientX+i[1].clientX)/2,s=(i[0].clientY+i[1].clientY)/2;n.pinchState={startDistance:Lo(i[0],i[1]),startZoom:g.zoomLevel,startPanX:n.panX,startPanY:n.panY,startCenterX:t-o.left,startCenterY:s-o.top},n.touchState=null,window.addEventListener("touchmove",n._boundTouchMove,{passive:!1}),window.addEventListener("touchend",n._boundTouchEnd),window.addEventListener("touchcancel",n._boundTouchEnd);return}if(i.length===1){const t=i[0],s=t.target.closest(".widget"),r=s?s.dataset.id:null;if(n.longPressTimer&&clearTimeout(n.longPressTimer),n.longPressTimer=setTimeout(()=>{window.RadialMenu&&window.RadialMenu.show(t.clientX,t.clientY,r),n.touchState=null},500),s){e.preventDefault();const a=g.getWidgetById(r);if(!a)return;t.target.classList.contains("widget-resize-handle")?n.touchState={mode:"resize",id:r,startX:t.clientX,startY:t.clientY,startW:a.width,startH:a.height,el:s}:n.touchState={mode:"move",id:r,startTouchX:t.clientX,startTouchY:t.clientY,startWidgetX:a.x,startWidgetY:a.y,hasMoved:!1,el:s}}else e.preventDefault(),n.touchState={mode:"pan",startTouchX:t.clientX,startTouchY:t.clientY,startX:t.clientX,startY:t.clientY,startPanX:n.panX,startPanY:n.panY};window.addEventListener("touchmove",n._boundTouchMove,{passive:!1}),window.addEventListener("touchend",n._boundTouchEnd),window.addEventListener("touchcancel",n._boundTouchEnd)}},{passive:!1}))}function cl(n,e){const i=n.touches,o=e.viewport.getBoundingClientRect();if(e.pinchState&&i.length===2){n.preventDefault();const s=Lo(i[0],i[1])/e.pinchState.startDistance,r=Math.max(.1,Math.min(10,e.pinchState.startZoom*s)),a=(i[0].clientX+i[1].clientX)/2-o.left,l=(i[0].clientY+i[1].clientY)/2-o.top,c=(e.pinchState.startCenterX-e.pinchState.startPanX)/e.pinchState.startZoom,d=(e.pinchState.startCenterY-e.pinchState.startPanY)/e.pinchState.startZoom;e.panX=a-c*r,e.panY=l-d*r,g.setZoomLevel(r),pe(e);return}if(i.length===1&&e.longPressTimer){const t=i[0],s=e.touchState,r=s?.startTouchX??s?.startX??t.clientX,a=s?.startTouchY??s?.startY??t.clientY;Math.hypot(t.clientX-r,t.clientY-a)>10&&(clearTimeout(e.longPressTimer),e.longPressTimer=null)}if(e.touchState&&i.length===1){n.preventDefault();const t=i[0];if(e.touchState.mode==="pan"){const s=t.clientX-e.touchState.startTouchX,r=t.clientY-e.touchState.startTouchY;e.panX=e.touchState.startPanX+s,e.panY=e.touchState.startPanY+r,pe(e)}else if(e.touchState.mode==="move"){const s=t.clientX-e.touchState.startTouchX,r=t.clientY-e.touchState.startTouchY;if(!e.touchState.hasMoved&&Math.hypot(s,r)<5)return;e.touchState.hasMoved=!0;const a=g.getWidgetById(e.touchState.id);if(!a)return;const l=g.getCanvasDimensions(),c=g.zoomLevel;let d=e.touchState.startWidgetX+s/c,p=e.touchState.startWidgetY+r/c;d=Math.max(0,Math.min(l.width-a.width,d)),p=Math.max(0,Math.min(l.height-a.height,p)),a.x=d,a.y=p,e.touchState.el&&(e.touchState.el.style.left=d+"px",e.touchState.el.style.top=p+"px")}else if(e.touchState.mode==="resize"){e.touchState.hasMoved=!0;const s=g.getWidgetById(e.touchState.id);if(!s)return;const r=g.getCanvasDimensions(),a=g.zoomLevel;let l=e.touchState.startW+(t.clientX-e.touchState.startX)/a,c=e.touchState.startH+(t.clientY-e.touchState.startY)/a;const d=20;l=Math.max(d,Math.min(r.width-s.x,l)),c=Math.max(d,Math.min(r.height-s.y,c)),s.width=l,s.height=c,e.touchState.el&&(e.touchState.el.style.width=l+"px",e.touchState.el.style.height=c+"px")}}}function pl(n,e){const i=e.touchState,o=Date.now();if(i&&n.changedTouches.length>0){const t=n.changedTouches[0].clientX,s=n.changedTouches[0].clientY;if(!(Math.hypot(t-(i.startTouchX||i.startX),s-(i.startTouchY||i.startY))>10)){const a=n.target.closest(".widget"),l=a?a.dataset.id:null;l?l===e.lastWidgetTapId&&o-e.lastWidgetTapTime<350?(window.RadialMenu&&window.RadialMenu.show(t,s,l),e.lastWidgetTapTime=0):(e.lastWidgetTapId=l,e.lastWidgetTapTime=o,g.selectWidget(l)):o-e.lastCanvasTapTime<350?(g.setZoomLevel(1),_t(e,g.currentPageIndex,!0),e.lastCanvasTapTime=0):(e.lastCanvasTapTime=o,g.selectWidgets([]))}if(i.id&&i.hasMoved){const a=g.getWidgetById(i.id);if(a){if(i.mode==="move"){const l=g.getCanvasDimensions(),c=g.getCurrentPage();if(c?.layout){const d=fn(a.x,a.y,a.width,a.height,c.layout,l);a.x=d.x,a.y=d.y}else{const d=gn(e,a,a.x,a.y,!1,l);a.x=d.x,a.y=d.y}}ul(e,i.id),g.recordHistory(),L(C.STATE_CHANGED)}}}e.touchState=null,e.pinchState=null,e.longPressTimer&&(clearTimeout(e.longPressTimer),e.longPressTimer=null),window.removeEventListener("touchmove",e._boundTouchMove),window.removeEventListener("touchend",e._boundTouchEnd),window.removeEventListener("touchcancel",e._boundTouchEnd),document.body.classList.remove("interaction-active"),be(e),ge()}function Lo(n,e){return Math.hypot(e.clientX-n.clientX,e.clientY-n.clientY)}function ul(n,e){const i=g.getCurrentPage();if(!i||!i.layout)return;const o=i.layout.match(/^(\d+)x(\d+)$/);if(!o)return;const t=g.getWidgetById(e);if(!t)return;const s=parseInt(o[1],10),r=parseInt(o[2],10),a=g.getCanvasDimensions(),l=a.width/r,c=a.height/s,d=t.x+t.width/2,p=t.y+t.height/2,h=Math.floor(d/l),u=Math.floor(p/c),m=Math.max(0,Math.min(s-1,u)),y=Math.max(0,Math.min(r-1,h)),f={...t.props,grid_cell_row_pos:m,grid_cell_column_pos:y,grid_cell_row_span:Math.max(1,Math.round(t.height/c)),grid_cell_column_span:Math.max(1,Math.round(t.width/l))};g.updateWidget(e,{props:f})}class hl{constructor(){this.canvas=document.getElementById("canvas"),this.canvasContainer=document.getElementById("canvasContainer"),this.viewport=document.querySelector(".canvas-viewport"),this.dragState=null,this.panX=0,this.panY=0,this.touchState=null,this.pinchState=null,this.lastTapTime=0,this.isExternalDragging=!1,this.suppressNextFocus=!1,this._boundMouseMove=e=>al(e,this),this._boundMouseUp=e=>ll(e,this),this.rulers=new qa(this),this.init()}init(){q(C.STATE_CHANGED,()=>this.render()),q(C.PAGE_CHANGED,i=>{if(this.render(),this.suppressNextFocus){this.suppressNextFocus=!1,this._lastFocusedIndex=i.index;return}i.forceFocus&&this.focusPage(i.index,!0,!0),this._lastFocusedIndex=i.index}),q(C.SELECTION_CHANGED,()=>this.updateSelectionVisuals()),q(C.SETTINGS_CHANGED,()=>{this.render(),this.applyZoom(),this.rulers.update()}),q(C.ZOOM_CHANGED,()=>{this.applyZoom(),this.rulers.update()});const e=document.getElementById("pagesHeader");e&&e.addEventListener("click",i=>{i.target.closest(".chevron")||this.zoomToFitAll()}),this._boundResize=()=>{g.currentPageIndex!==-1&&this.focusPage(g.currentPageIndex,!1,!0)},window.addEventListener("resize",this._boundResize),this.setupInteractions(),this.render(),this.applyZoom(),this.updateInterval&&clearInterval(this.updateInterval),this.updateInterval=setInterval(()=>{if(this.touchState||this.pinchState||this.dragState||this.panState||this.lassoState||this.isExternalDragging)return;const i=g.getCurrentPage();i&&i.widgets.some(o=>o.type==="datetime")&&this.render()},1e3)}render(){be(this)}applyZoom(){pe(this),this.rulers&&this.rulers.update()}updateSelectionVisuals(){const e=g.selectedWidgetIds;this.canvas.querySelectorAll(".widget").forEach(o=>{const t=o.dataset.id;e.includes(t)?o.classList.add("active"):o.classList.remove("active")}),hn(this)}setupInteractions(){Ka(this),rl(this),Ja(this),Xa(this),dl(this);const e=document.getElementById("zoomToFitAllBtn");e&&(e.onclick=()=>this.zoomToFitAll())}zoomIn(){Ht(this)}zoomOut(){Ft(this)}zoomReset(){st(this)}zoomToFit(){g.currentPageIndex!==-1&&this.focusPage(g.currentPageIndex,!0,!0)}zoomToFitAll(e=!0){T(()=>Promise.resolve().then(()=>Fn),[],import.meta.url).then(i=>i.zoomToFitAll(this,e))}focusPage(e,i=!0,o=!1){T(()=>Promise.resolve().then(()=>Fn),void 0,import.meta.url).then(t=>t.focusPage(this,e,i,o))}destroy(){this.updateInterval&&(clearInterval(this.updateInterval),this.updateInterval=null),this._boundResize&&window.removeEventListener("resize",this._boundResize)}}function gl(n,e,i){if(!z()){b.warn("Entity Picker: No HA backend detected.");return}const o=document.getElementById("propertiesPanel")||document.body,t=document.querySelector(".entity-picker-overlay");t&&t.remove();const s=document.createElement("div");s.className="entity-picker-overlay";const r=document.createElement("div");r.className="entity-picker-header",r.textContent="Pick Home Assistant entity";const a=document.createElement("button");a.className="btn btn-secondary",a.textContent="×",a.style.padding="0 4px",a.style.fontSize="9px",a.type="button",a.addEventListener("click",()=>{s.remove()});const l=document.createElement("div");l.style.display="flex",l.style.alignItems="center",l.style.gap="4px",l.appendChild(a);const c=document.createElement("div");c.style.display="flex",c.style.justifyContent="space-between",c.style.alignItems="center",c.style.gap="4px",c.appendChild(r),c.appendChild(l);const d=document.createElement("div");d.style.display="flex",d.style.gap="4px",d.style.alignItems="center";const p=document.createElement("input");p.type="text",p.className="prop-input",p.placeholder="Search name or entity_id",p.style.flex="1";const h=document.createElement("select");h.className="prop-input",h.style.width="80px",["all","sensor","binary_sensor","light","switch","fan","cover","climate","media_player","input_number","number","input_boolean","input_text","input_select","weather","scene","script","button","input_button"].forEach(y=>{const f=document.createElement("option");f.value=y,f.textContent=y,h.appendChild(f)}),d.appendChild(p),d.appendChild(h);const u=document.createElement("div");u.className="entity-picker-list",s.appendChild(c),s.appendChild(d),s.appendChild(u),o.appendChild(s);function m(y){if(u.innerHTML="",!y||y.length===0){const f=document.createElement("div");f.style.color="var(--muted)",f.style.fontSize="var(--fs-xs)",f.textContent="No entities match.",u.appendChild(f);return}y.forEach(f=>{const _=document.createElement("div");_.className="entity-picker-row";const v=document.createElement("div");v.className="entity-picker-name",v.textContent=f.name||f.entity_id;const S=document.createElement("div");S.className="entity-picker-meta",S.textContent=`${f.entity_id} · ${f.domain||f.entity_id.split(".")[0]}`,_.appendChild(v),_.appendChild(S),_.addEventListener("click",()=>{if(i&&i(f.entity_id),e&&(e.value=f.entity_id),n&&g){if(g.updateWidget(n.id,{entity_id:f.entity_id,title:f.name||f.entity_id||""}),n.type==="graph"&&f.attributes){const w=f.attributes,E={};if(w.unit_of_measurement==="%"&&(n.props.min_value||(E.min_value="0"),n.props.max_value||(E.max_value="100")),w.min!==void 0&&!n.props.min_value&&(E.min_value=String(w.min)),w.max!==void 0&&!n.props.max_value&&(E.max_value=String(w.max)),Object.keys(E).length>0){const x={...n.props,...E};g.updateWidget(n.id,{props:x})}}if(n.type==="sensor_text"){const w={...n.props};f.attributes&&f.attributes.unit_of_measurement?w.unit=f.attributes.unit_of_measurement:f.unit&&(w.unit=f.unit);const E=f.state;if(f.entity_id.startsWith("weather.")||f.entity_id.startsWith("text_sensor."))w.is_text_sensor=!0;else if(E!=null&&E!==""){const I=parseFloat(E);isNaN(I)?w.is_text_sensor=!0:w.is_text_sensor=!1}g.updateWidget(n.id,{props:w})}}s.remove()}),u.appendChild(_)})}Le().then(y=>{if(!y||y.length===0){m([]);return}function f(){const _=(p.value||"").toLowerCase(),v=h.value,S=y.filter(w=>{const E=w.domain||w.entity_id.split(".")[0];return v!=="all"&&E!==v?!1:_?`${w.entity_id} ${w.name||""}`.toLowerCase().includes(_):!0});m(S)}p.addEventListener("input",f),h.addEventListener("change",f),f()})}const To=[{code:"F0004",name:"account"},{code:"F0026",name:"alert"},{code:"F0028",name:"alert-circle"},{code:"F0045",name:"arrow-down"},{code:"F004D",name:"arrow-left"},{code:"F0054",name:"arrow-right"},{code:"F005D",name:"arrow-up"},{code:"F0079",name:"battery"},{code:"F007C",name:"battery-50"},{code:"F0084",name:"battery-charging"},{code:"F009A",name:"bell"},{code:"F00AF",name:"bluetooth"},{code:"F00D8",name:"brightness-5"},{code:"F00ED",name:"calendar"},{code:"F0100",name:"camera"},{code:"F012C",name:"check"},{code:"F05E0",name:"check-circle"},{code:"F0140",name:"chevron-down"},{code:"F0141",name:"chevron-left"},{code:"F0142",name:"chevron-right"},{code:"F0143",name:"chevron-up"},{code:"F0150",name:"clock"},{code:"F0156",name:"close"},{code:"F015F",name:"cloud"},{code:"F0493",name:"cog"},{code:"F01B4",name:"delete"},{code:"F01D9",name:"dots-vertical"},{code:"F01DA",name:"download"},{code:"F01EE",name:"email"},{code:"F0208",name:"eye"},{code:"F0209",name:"eye-off"},{code:"F0210",name:"fan"},{code:"F0214",name:"file"},{code:"F021E",name:"flash"},{code:"F024B",name:"folder"},{code:"F0279",name:"format-list-bulleted"},{code:"F02D1",name:"heart"},{code:"F02DC",name:"home"},{code:"F07D0",name:"home-assistant"},{code:"F02E9",name:"image"},{code:"F02FC",name:"information"},{code:"F0322",name:"layers"},{code:"F0335",name:"lightbulb"},{code:"F06E8",name:"lightbulb-on"},{code:"F033E",name:"lock"},{code:"F033F",name:"lock-open"},{code:"F0349",name:"magnify"},{code:"F034E",name:"map-marker"},{code:"F035C",name:"menu"},{code:"F036C",name:"microphone"},{code:"F0374",name:"minus"},{code:"F075A",name:"music"},{code:"F03EB",name:"pencil"},{code:"F040A",name:"play"},{code:"F0415",name:"plus"},{code:"F0425",name:"power"},{code:"F0450",name:"refresh"},{code:"F048A",name:"send"},{code:"F0497",name:"share-variant"},{code:"F0565",name:"shield-check"},{code:"F04CE",name:"star"},{code:"F04DB",name:"stop"},{code:"F050F",name:"thermometer"},{code:"F0513",name:"thumb-up"},{code:"F051B",name:"timer-outline"},{code:"F0A79",name:"trash-can"},{code:"F0552",name:"upload"},{code:"F0571",name:"video"},{code:"F057E",name:"volume-high"},{code:"F0581",name:"volume-off"},{code:"F0585",name:"water"},{code:"F05E3",name:"water-percent"},{code:"F0590",name:"weather-cloudy"},{code:"F0591",name:"weather-fog"},{code:"F0592",name:"weather-hail"},{code:"F0593",name:"weather-lightning"},{code:"F0594",name:"weather-night"},{code:"F0595",name:"weather-partly-cloudy"},{code:"F0596",name:"weather-pouring"},{code:"F0597",name:"weather-rainy"},{code:"F0598",name:"weather-snowy"},{code:"F0599",name:"weather-sunny"},{code:"F059D",name:"weather-windy"},{code:"F05A9",name:"wifi"},{code:"F05AD",name:"window-close"}];let Q=null,ke=null,Ne=null,nt=null,ye=null,He=null;function fl(){Q||(Q=document.getElementById("iconPickerModal"),ke=document.getElementById("iconPickerFilter"),Ne=document.getElementById("iconPickerList"),nt=document.getElementById("iconPickerClose"),Q||(Q=document.createElement("div"),Q.id="iconPickerModal",Q.className="modal-backdrop hidden",Q.style.zIndex="2000",Q.innerHTML=`
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
        `,document.body.appendChild(Q),ke=document.getElementById("iconPickerFilter"),Ne=document.getElementById("iconPickerList"),nt=document.getElementById("iconPickerClose")),nt&&(nt.onclick=Wt),ke&&(ke.oninput=n=>{const e=n.target;ml(e.value)}),Q.onclick=n=>{n.target===Q&&Wt()})}function Pt(n,e){fl(),ye=n,He=e,Q.classList.remove("hidden"),Q.style.display="flex",ke&&(ke.value="",ke.focus()),$t(To||[])}function Wt(){Q&&(Q.classList.add("hidden"),Q.style.display="none"),ye=null,He=null}function $t(n){if(!Ne)return;if(Ne.innerHTML="",!n||n.length===0){Ne.innerHTML='<div style="padding: 10px; color: var(--muted); grid-column: 1 / -1; text-align: center;">No icons found.</div>';return}const e=document.createDocumentFragment();n.forEach(i=>{const o=document.createElement("div");o.className="icon-item",o.style.padding="8px",o.style.border="1px solid var(--border-subtle)",o.style.borderRadius="4px",o.style.cursor="pointer",o.style.display="flex",o.style.flexDirection="column",o.style.alignItems="center",o.style.justifyContent="center",o.style.textAlign="center",o.style.background="var(--bg)",o.title=i.name;const t=document.createElement("div");t.className="mdi",t.style.fontSize="24px",t.style.color="var(--accent)";const s=parseInt(i.code,16);t.textContent=String.fromCodePoint(s);const r=document.createElement("div");r.style.fontSize="9px",r.style.marginTop="4px",r.style.overflow="hidden",r.style.textOverflow="ellipsis",r.style.whiteSpace="nowrap",r.style.width="100%",r.style.color="var(--muted)",r.textContent=i.name,o.appendChild(t),o.appendChild(r),o.onclick=()=>yl(i),o.onmouseenter=()=>{o.style.borderColor="var(--accent)",o.style.background="rgba(110, 68, 255, 0.05)"},o.onmouseleave=()=>{o.style.borderColor="var(--border-subtle)",o.style.background="var(--bg)"},e.appendChild(o)}),Ne.appendChild(e)}function ml(n){const e=To||[];if(!n){$t(e);return}const i=n.toLowerCase(),o=e.filter(t=>t.name.toLowerCase().includes(i)||t.code.toLowerCase().includes(i));$t(o)}function yl(n){ye&&(He?(He.value=n.code,He.dispatchEvent(new Event("input")),He.dispatchEvent(new Event("change"))):(ye.props||(ye.props={}),ye.props.code=n.code,g&&g.updateWidget(ye.id,ye))),Wt()}const _l={Roboto:[100,300,400,500,700,900],Inter:[100,200,300,400,500,600,700,800,900],"Open Sans":[300,400,500,600,700,800],Lato:[100,300,400,700,900],Montserrat:[100,200,300,400,500,600,700,800,900],Poppins:[100,200,300,400,500,600,700,800,900],Raleway:[100,200,300,400,500,600,700,800,900],"Roboto Mono":[100,200,300,400,500,600,700],Ubuntu:[300,400,500,700],Nunito:[200,300,400,500,600,700,800,900],"Playfair Display":[400,500,600,700,800,900],Merriweather:[300,400,700,900],"Work Sans":[100,200,300,400,500,600,700,800,900],"Source Sans Pro":[200,300,400,600,700,900],Quicksand:[300,400,500,600,700]};function zt(n){return _l[n]||[100,200,300,400,500,600,700,800,900]}function Ut(n,e){const i=parseInt(e,10),o=zt(n);return o.includes(i)?i:o.reduce((t,s)=>Math.abs(s-i)<Math.abs(t-i)?s:t)}const bl=`# Dictionary to map calendar keys to their corresponding names
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
`,ue="__mixed__";class vl{constructor(){this.panel=document.getElementById("propertiesPanel"),this.lastRenderedWidgetId=null,this.containerStack=[],this.sectionStates={},this.init()}init(){q(C.SELECTION_CHANGED,()=>this.render()),q(C.STATE_CHANGED,()=>this.render());const e=document.getElementById("snapToggle");e&&(e.checked=g.snapEnabled,e.addEventListener("change",o=>{g.setSnapEnabled(o.target.checked)}),q(C.SETTINGS_CHANGED,o=>{o.snapEnabled!==void 0&&(e.checked=o.snapEnabled)}));const i=document.getElementById("lockPositionToggle");i&&i.addEventListener("change",o=>{const t=g.selectedWidgetIds;t.length>0&&g.updateWidgets(t,{locked:o.target.checked})}),this.render()}render(){if(!this.panel||window.Canvas&&window.Canvas.lassoState)return;const e=g.selectedWidgetId;if(!(this.lastRenderedWidgetId!==e)&&this.panel&&this.panel.isConnected){const c=document.activeElement;if(c&&this.panel.contains(c)){const d=c.tagName.toLowerCase(),p=c.type?c.type.toLowerCase():"";if(!(d==="input"&&["checkbox","radio","button"].includes(p)||d==="select")&&(d==="input"||d==="textarea"||c.classList.contains("prop-input")))return}}this.lastRenderedWidgetId=e,this.containerStack=[],this.panel.innerHTML="";const o=document.getElementById("lockPositionToggle");if(o){const c=g.getSelectedWidgets(),d=c.length>0&&c.every(h=>h.locked),p=c.some(h=>h.locked);o.checked=d,o.indeterminate=p&&!d,o.disabled=c.length===0}if(g.selectedWidgetIds.length===0){this.panel.innerHTML="<div style='padding:16px;color:#aaa;text-align:center;'>Select a widget to edit properties</div>";return}if(g.selectedWidgetIds.length>1){this.renderMultiSelectProperties(g.selectedWidgetIds);return}const t=g.getSelectedWidget();if(!t)return;const s=t.type;t.props,De();let r=s;s==="nav_next_page"?r="next page":s==="nav_previous_page"?r="previous page":s==="nav_reload_page"?r="reload page":r=s.replace(/_/g," ");const a=document.createElement("div");a.className="sidebar-section-label",a.style.marginTop="0",a.style.textTransform="capitalize",a.textContent=`${r} Properties`,this.panel.appendChild(a),this.createSection("Transform",!1),this.addCompactPropertyRow(()=>{this.addLabeledInput("Pos X","number",t.x,c=>{g.updateWidget(t.id,{x:parseInt(c,10)||0})}),this.addLabeledInput("Pos Y","number",t.y,c=>{g.updateWidget(t.id,{y:parseInt(c,10)||0})})}),this.addCompactPropertyRow(()=>{this.addLabeledInput("Width","number",t.width,c=>{g.updateWidget(t.id,{width:parseInt(c,10)||10})}),this.addLabeledInput("Height","number",t.height,c=>{g.updateWidget(t.id,{height:parseInt(c,10)||10})})}),this.endSection();let l=!1;if(W){const c=W.get(s);c&&c.schema&&(this.renderFromSchema(t,c.schema),l=!0)}if(!l){const c=g.settings.renderingMode||"direct";c==="oepl"||c==="opendisplay"?this.renderProtocolProperties(t,s):this.renderLegacyProperties(t,s)}this.createSection("Grid Layout",!1),this.renderGridCellProperties(t,s),this.endSection(),this.createSection("Visibility Conditions",!1),this.addVisibilityConditions(t),this.endSection()}renderMultiSelectProperties(e){const i=e.map(u=>g.getWidgetById(u)).filter(u=>!!u);if(i.length===0)return;this.panel.innerHTML="",this.createSection(`${i.length} Widgets Selected`,!0),this.createSection("Transform",!0);const o=u=>{const m=i[0][u];return i.every(y=>y[u]===m)?m:ue},t=(u,m)=>{g.updateWidgets(e,{[u]:m})};this.addCompactPropertyRow(()=>{this.addLabeledInput("X","number",o("x"),u=>t("x",parseInt(u,10))),this.addLabeledInput("Y","number",o("y"),u=>t("y",parseInt(u,10)))}),this.addCompactPropertyRow(()=>{this.addLabeledInput("Width","number",o("width"),u=>t("width",parseInt(u,10))),this.addLabeledInput("Height","number",o("height"),u=>t("height",parseInt(u,10)))}),this.endSection();const s=["color","bg_color","background_color","border_width","border_color","border_radius","opacity","font_size","font_family","font_weight","text_align","italic","locked","hidden"],r=new Set;i.forEach(u=>Object.keys(u.props||{}).forEach(m=>r.add(m)));const l=i.map(u=>Object.keys(u.props||{})).reduce((u,m)=>u.filter(y=>m.includes(y))),c=new Set([...l,...s]),d=Array.from(c).filter(u=>{if(["border_width","border_color","border_radius"].includes(u)){const m=["text","label","sensor_text","lvgl_label","shape_rect","rounded_rect","shape_circle","datetime"];return i.every(y=>m.includes(y.type))}if(s.includes(u)){if(i.some(y=>y.props&&y.props[u]!==void 0))return!0;if(u.includes("font")||u==="color"){const y=["text","label","sensor_text","lvgl_label","datetime"];return i.every(f=>y.includes(f.type))}}return l.includes(u)});if(d.length>0){this.createSection("Shared Appearance",!0);const u=f=>{const _=i[0].props?i[0].props[f]:void 0;return i.every(v=>(v.props?v.props[f]:void 0)===_)?_:ue},m=(f,_)=>{g.updateWidgetsProps(e,{[f]:_})},y=d.filter(f=>{const _=i.find(S=>S.props&&S.props[f]!==void 0)?.props[f],v=_!==void 0?_:"";return typeof v=="number"||typeof v=="string"||typeof v=="boolean"||v===""});y.sort((f,_)=>f.includes("color")&&!_.includes("color")?-1:_.includes("color")&&!f.includes("color")?1:f.localeCompare(_)),y.forEach(f=>{const _=f.split("_").map(E=>E.charAt(0).toUpperCase()+E.slice(1)).join(" "),v=u(f),S=i.find(E=>E.props&&E.props[f]!==void 0)||i[0],w=S.props&&S.props[f]!==void 0?typeof S.props[f]:"string";if(f.includes("color")||f==="bg"||f==="fg")this.addColorSelector(_,v,De(),E=>m(f,E));else if(w==="boolean"||["italic","locked","hidden"].includes(f))this.addCheckbox(_,v===ue?!1:v,E=>m(f,E));else{const E=w==="number"||f.includes("width")||f.includes("size")||f.includes("radius")?"number":"text";this.addLabeledInput(_,E,v,x=>{m(f,E==="number"?parseInt(x,10):x)})}}),this.endSection()}this.createSection("Operations",!0);const p=document.createElement("button");p.className="btn btn-secondary btn-full btn-xs",p.style.width="100%",p.style.marginTop="8px",p.innerHTML='<span class="mdi mdi-box-shadow"></span> Create Shadows for All Selected',p.onclick=()=>g.createDropShadow(e),this.getContainer().appendChild(p);const h=document.createElement("button");h.className="btn btn-secondary btn-xs",h.style.background="var(--danger)",h.style.color="white",h.style.border="none",h.style.width="100%",h.style.marginTop="8px",h.innerHTML="🗑 Delete Selected Widgets",h.onclick=()=>{confirm(`Delete ${e.length} widgets?`)&&g.deleteWidget()},this.getContainer().appendChild(h),this.endSection(),this.endSection()}createSection(e,i=!0){const o=this.sectionStates[e]!==void 0?this.sectionStates[e]===!1:!i,t=document.createElement("div");t.className="properties-section"+(o?" collapsed":"");const s=document.createElement("div");s.className="properties-section-header",s.innerHTML=`<span > ${e}</span> <span class="icon mdi mdi-chevron-down"></span>`,s.onclick=a=>{a.stopPropagation();const l=t.classList.toggle("collapsed");this.sectionStates[e]=!l};const r=document.createElement("div");r.className="properties-section-content",t.appendChild(s),t.appendChild(r),this.sectionStates[e]===void 0&&(this.sectionStates[e]=!o),this.getContainer().appendChild(t),this.containerStack.push(r)}endSection(){this.containerStack.length>0&&this.containerStack.pop()}getContainer(){return this.containerStack.length>0?this.containerStack[this.containerStack.length-1]:this.panel}renderGridCellProperties(e,i){const o=g.getCurrentPage(),s=(o?.layout||"absolute")!=="absolute";if(!o)return;if(!s){const p=this.getContainer(),h=document.createElement("div");h.style.padding="8px 0",h.style.fontSize="11px",h.style.color="var(--muted)",h.textContent="Page is currently in Absolute Positioning mode.",p.appendChild(h);const u=document.createElement("button");u.className="btn btn-secondary btn-xs",u.style.width="100%",u.innerHTML='<span class="mdi mdi-grid"></span> Enable Page Grid Layout',u.onclick=()=>{window.app&&window.app.pageSettings&&window.app.pageSettings.open(g.currentPageIndex)},p.appendChild(u);return}const r=Ze.isLvglWidget(i),a=e.props||{},l=(p,h)=>{const u={...e.props,[p]:h};g.updateWidget(e.id,{props:u})},c=(p,h,u,m)=>{const y=o.layout.match(/^(\d+)x(\d+)$/);if(!y)return null;const f=parseInt(y[1],10),_=parseInt(y[2],10),v=g.getCanvasDimensions(),S=v.width/_,w=v.height/f;return{x:Math.round(h*S),y:Math.round(p*w),width:Math.round(S*m),height:Math.round(w*u)}};if(this.addLabeledInput("Row (0-indexed)","number",a.grid_cell_row_pos??"",p=>{const h=p===""?null:parseInt(p,10);l("grid_cell_row_pos",isNaN(h)?null:h);const m=g.getWidgetById(e.id)?.props||{};if(h!=null&&m.grid_cell_column_pos!=null){const y=c(h,m.grid_cell_column_pos,m.grid_cell_row_span||1,m.grid_cell_column_span||1);y&&g.updateWidget(e.id,{x:y.x,y:y.y,width:y.width,height:y.height})}}),this.addLabeledInput("Column (0-indexed)","number",a.grid_cell_column_pos??"",p=>{const h=p===""?null:parseInt(p,10);l("grid_cell_column_pos",isNaN(h)?null:h);const m=g.getWidgetById(e.id)?.props||{};if(h!=null&&m.grid_cell_row_pos!=null){const y=c(m.grid_cell_row_pos,h,m.grid_cell_row_span||1,m.grid_cell_column_span||1);y&&g.updateWidget(e.id,{x:y.x,y:y.y,width:y.width,height:y.height})}}),this.addLabeledInput("Row Span","number",a.grid_cell_row_span||1,p=>{const h=Math.max(1,parseInt(p,10)||1);l("grid_cell_row_span",h);const m=g.getWidgetById(e.id)?.props||{};if(m.grid_cell_row_pos!=null&&m.grid_cell_column_pos!=null){const y=c(m.grid_cell_row_pos,m.grid_cell_column_pos,h,m.grid_cell_column_span||1);y&&g.updateWidget(e.id,{x:y.x,y:y.y,width:y.width,height:y.height})}}),this.addLabeledInput("Column Span","number",a.grid_cell_column_span||1,p=>{const h=Math.max(1,parseInt(p,10)||1);l("grid_cell_column_span",h);const m=g.getWidgetById(e.id)?.props||{};if(m.grid_cell_row_pos!=null&&m.grid_cell_column_pos!=null){const y=c(m.grid_cell_row_pos,m.grid_cell_column_pos,m.grid_cell_row_span||1,h);y&&g.updateWidget(e.id,{x:y.x,y:y.y,width:y.width,height:y.height})}}),r){const p=["START","END","CENTER","STRETCH"];this.addSelect("X Align",a.grid_cell_x_align||"STRETCH",p,h=>{l("grid_cell_x_align",h)}),this.addSelect("Y Align",a.grid_cell_y_align||"STRETCH",p,h=>{l("grid_cell_y_align",h)})}const d=document.createElement("button");d.className="btn btn-secondary btn-xs",d.style.marginTop="8px",d.style.width="100%",d.innerHTML='<span class="mdi mdi-cog"></span> Open Page Grid Settings',d.onclick=()=>{const p=g.currentPageIndex;window.app&&window.app.pageSettings&&window.app.pageSettings.open(p)},this.getContainer().appendChild(d)}renderFromSchema(e,i){const o=De(),t=e.props||{},s=(r,a)=>{const l={...e.props,[r]:a};if(g.updateWidget(e.id,{props:l}),r==="border_radius"||r==="radius"||r==="corner_radius"){const c=g.getCurrentPage();if(c&&c.widgets){const d=parseInt(a,10)||0,p=(e.props?.name||e.type)+" Shadow",h=c.widgets.find(u=>u.props&&u.props.name===p||u.x===(e.x||0)+5&&u.y===(e.y||0)+5&&u.width===e.width&&u.height===e.height);h&&(h.type==="shape_rect"&&d>0?g.updateWidget(h.id,{type:"rounded_rect",props:{...h.props,radius:d}}):h.type==="rounded_rect"&&g.updateWidget(h.id,{props:{...h.props,radius:d}}))}}};i.forEach(r=>{this.createSection(r.section,r.defaultExpanded!==!1),r.fields.forEach(a=>{const l=a.target==="root",c=l?e[a.key]!==void 0?e[a.key]:a.default:t[a.key]!==void 0?t[a.key]:a.default,d=p=>{let h=p;a.type==="number"&&(h=p===""?null:parseFloat(p),isNaN(h)&&(h=a.default!==void 0?a.default:0)),l?g.updateWidget(e.id,{[a.key]:h}):s(a.key,h)};switch(a.type){case"text":case"textarea":case"number":this.addLabeledInput(a.label,a.type,c,d);break;case"color":this.addColorSelector(a.label,c,o,d);break;case"select":{const p=typeof a.dynamicOptions=="function"?a.dynamicOptions(t):a.options;this.addSelect(a.label,c,p,d);break}case"checkbox":this.addCheckbox(a.label,c,d);break;case"icon_picker":this.addLabeledInputWithIconPicker(a.label,"text",c,d,e);break;case"entity_picker":this.addLabeledInputWithPicker(a.label,"text",c,d,e);break;case"hint":this.addHint(a.label);break;case"drop_shadow_button":this.addDropShadowButton(this.getContainer(),e.id);break}}),this.endSection()})}renderProtocolProperties(e,i){const o=De(),t=e.props||{},s=(r,a)=>{const l={...e.props,[r]:a};g.updateWidget(e.id,{props:l})};i==="image"||i==="online_image"?(this.createSection("Image Source",!0),i==="image"?this.addLabeledInput("Asset Path","text",t.path||"",r=>s("path",r)):(this.addLabeledInput("Image URL","text",t.url||"",r=>s("url",r)),this.addLabeledInput("Refresh (s)","number",t.interval_s||300,r=>s("interval_s",parseInt(r,10)))),this.addCheckbox("Invert Colors",!!t.invert,r=>s("invert",r)),this.endSection(),this.createSection("Appearance",!0),this.addColorSelector("Background",t.bg_color||"transparent",o,r=>s("bg_color",r)),this.addDropShadowButton(this.getContainer(),e.id),this.endSection()):i.startsWith("shape_")||i==="line"||i==="rounded_rect"?(this.createSection("Shape Style",!0),this.addColorSelector("Fill/Line Color",t.color||"black",o,r=>s("color",r)),i!=="line"?(this.addCheckbox("Fill",t.fill!==!1,r=>s("fill",r)),this.addColorSelector("Background",t.bg_color||"transparent",o,r=>s("bg_color",r)),this.addLabeledInput("Border Width","number",t.border_width||0,r=>s("border_width",parseInt(r,10)))):this.addLabeledInput("Thickness","number",t.thickness||2,r=>s("thickness",parseInt(r,10))),(i==="rounded_rect"||t.radius!==void 0)&&this.addLabeledInput("Corner Radius","number",t.radius||4,r=>s("radius",parseInt(r,10))),this.addDropShadowButton(this.getContainer(),e.id),this.endSection()):i==="odp_ellipse"||i==="odp_polygon"||i==="odp_rectangle_pattern"||i==="odp_arc"||i==="odp_icon_sequence"?(this.createSection("ODP Style",!0),i!=="odp_icon_sequence"?(this.addColorSelector("Outline",t.outline||"black",o,r=>s("outline",r)),this.addColorSelector("Fill",t.fill||"transparent",o,r=>s("fill",r)),this.addLabeledInput("Border Width","number",t.border_width||1,r=>s("border_width",parseInt(r,10)))):(this.addColorSelector("Color",t.fill||"black",o,r=>s("fill",r)),this.addLabeledInput("Icon Size","number",t.size||24,r=>s("size",parseInt(r,10))),this.addSelect("Direction",t.direction||"right",["right","down"],r=>s("direction",r)),this.addLabeledInput("Spacing","number",t.spacing||6,r=>s("spacing",parseInt(r,10))),this.addLabeledInput("Icons (comma sep)","text",Array.isArray(t.icons)?t.icons.join(", "):t.icons||"",r=>s("icons",r))),i==="odp_rectangle_pattern"&&(this.addLabeledInput("Repeat X","number",t.x_repeat||3,r=>s("x_repeat",parseInt(r,10))),this.addLabeledInput("Repeat Y","number",t.y_repeat||2,r=>s("y_repeat",parseInt(r,10))),this.addLabeledInput("Size X","number",t.x_size||30,r=>s("x_size",parseInt(r,10))),this.addLabeledInput("Size Y","number",t.y_size||15,r=>s("y_size",parseInt(r,10)))),i==="odp_arc"&&(this.addLabeledInput("Start Angle","number",t.start_angle||0,r=>s("start_angle",parseInt(r,10))),this.addLabeledInput("End Angle","number",t.end_angle||90,r=>s("end_angle",parseInt(r,10)))),this.endSection()):i==="odp_plot"?(this.createSection("Plot Config",!0),this.addLabeledInput("Duration (sec)","number",t.duration||36400,r=>s("duration",parseInt(r,10))),this.addColorSelector("Background",t.background||"white",o,r=>s("background",r)),this.addColorSelector("Outline",t.outline||"#ccc",o,r=>s("outline",r)),this.endSection()):i==="odp_multiline"?(this.createSection("Multiline Content",!0),this.addLabeledInput("Text","textarea",t.text||"Line 1|Line 2",r=>s("text",r)),this.addLabeledInput("Delimiter","text",t.delimiter||"|",r=>s("delimiter",r)),this.endSection(),this.createSection("Appearance",!0),this.addLabeledInput("Font Size","number",t.font_size||16,r=>s("font_size",parseInt(r,10))),this.addLabeledInput("Line Spacing","number",t.line_spacing||4,r=>s("line_spacing",parseInt(r,10))),this.addColorSelector("Color",t.color||"black",o,r=>s("color",r)),this.addSelect("Font",t.font_family||"Roboto",["Roboto","Inter","Roboto Mono"],r=>s("font_family",r)),this.endSection()):((e.entity_id!==void 0||t.weather_entity!==void 0||i.includes("sensor")||i.includes("icon"))&&(this.createSection("Data Source",!0),this.addLabeledInputWithPicker("Entity ID","text",e.entity_id||t.weather_entity||"",a=>{t.weather_entity!==void 0?s("weather_entity",a):g.updateWidget(e.id,{entity_id:a})},e),e.title!==void 0&&this.addLabeledInput("Title/Label","text",e.title||"",a=>{g.updateWidget(e.id,{title:a})}),this.endSection()),this.createSection("Appearance",!0),this.addColorSelector("Color",t.color||"black",o,a=>s("color",a)),t.bg_color!==void 0&&this.addColorSelector("Background",t.bg_color||"transparent",o,a=>s("bg_color",a)),t.size!==void 0&&this.addLabeledInput("Size","number",t.size||24,a=>s("size",parseInt(a,10))),this.endSection())}renderLegacyProperties(e,i){const o=De(),t=e.props||{},s=(r,a)=>{const l={...e.props,[r]:a};if(g.updateWidget(e.id,{props:l}),r==="border_radius"||r==="radius"||r==="corner_radius"){const c=g.getCurrentPage();if(c&&c.widgets){const d=parseInt(a,10)||0,p=(e.props?.name||e.type)+" Shadow",h=c.widgets.find(u=>u.props&&u.props.name===p||u.x===(e.x||0)+5&&u.y===(e.y||0)+5&&u.width===e.width&&u.height===e.height);h&&(h.type==="shape_rect"&&d>0?g.updateWidget(h.id,{type:"rounded_rect",props:{...h.props,radius:d}}):h.type==="rounded_rect"&&g.updateWidget(h.id,{props:{...h.props,radius:d}}))}}};if(i==="shape_rect"||i==="shape_circle")this.createSection("Appearance",!0),this.addNumberWithSlider("Opacity (%)",t.opacity!==void 0?t.opacity:100,0,100,r=>{s("opacity",r)}),this.addCheckbox("Fill",t.fill||!1,r=>s("fill",r)),this.addLabeledInput("Border Width","number",t.border_width||1,r=>s("border_width",parseInt(r,10))),this.addColorSelector("Color",t.color||"black",o,r=>s("color",r)),this.addColorSelector("Border Color",t.border_color||"black",o,r=>s("border_color",r)),this.addDropShadowButton(this.getContainer(),e.id),this.endSection();else if(i==="rounded_rect")this.createSection("Appearance",!0),this.addNumberWithSlider("Opacity (%)",t.opacity!==void 0?t.opacity:100,0,100,r=>{s("opacity",r)}),this.addCheckbox("Fill",t.fill||!1,r=>s("fill",r)),t.fill&&this.addCheckbox("Show Border",t.show_border||!1,r=>s("show_border",r)),this.addCompactPropertyRow(()=>{this.addLabeledInput("Border Width","number",t.border_width||4,r=>s("border_width",parseInt(r,10))),this.addLabeledInput("Corner Radius","number",t.radius||10,r=>s("radius",parseInt(r,10)))}),this.addColorSelector("Color",t.color||"black",o,r=>s("color",r)),this.addColorSelector("Border Color",t.border_color||"black",o,r=>s("border_color",r)),this.addDropShadowButton(this.getContainer(),e.id),this.endSection();else if(i==="line"){this.createSection("Appearance",!0),this.addLabeledInput("Opacity (%)","number",t.opacity!==void 0?t.opacity:100,l=>{s("opacity",parseInt(l,10))}),this.addSegmentedControl("Orientation",[{value:"horizontal",label:"Horiz",icon:"mdi-arrow-left-right"},{value:"vertical",label:"Vert",icon:"mdi-arrow-up-down"}],t.orientation||"horizontal",l=>{const c=parseInt(t.stroke_width||3,10),d=e.width,p=e.height;l==="vertical"?g.updateWidget(e.id,{width:c,height:Math.max(d,p,20)}):g.updateWidget(e.id,{width:Math.max(d,p,20),height:c}),s("orientation",l)});const r=(t.orientation||"horizontal")==="vertical";this.addLabeledInput("Line Length (px)","number",r?e.height:e.width,l=>{const c=parseInt(l,10)||20;r?g.updateWidget(e.id,{height:c}):g.updateWidget(e.id,{width:c})}),this.addLabeledInput("Stroke Width (px)","number",t.stroke_width||3,l=>{const c=parseInt(l,10)||1;s("stroke_width",c),(t.orientation||"horizontal")==="vertical"?g.updateWidget(e.id,{width:c}):g.updateWidget(e.id,{height:c})});const a=document.createElement("button");a.textContent="Fill Canvas Length",a.className="btn btn-secondary",a.style.marginTop="8px",a.style.width="100%",a.onclick=()=>{const l=g.getCanvasDimensions();(t.orientation||"horizontal")==="vertical"?g.updateWidget(e.id,{y:0,height:l.height}):g.updateWidget(e.id,{x:0,width:l.width})},this.getContainer().appendChild(a),this.addColorSelector("Color",t.color||"black",o,l=>s("color",l)),this.endSection()}else if(i==="sensor_text")this.createSection("Data Source",!0),this.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",r=>{g.updateWidget(e.id,{entity_id:r}),r&&!e.title&&window.AppState&&window.AppState.entityStates&&this.autoPopulateTitleFromEntity(e.id,r)},e),this.addLabeledInput("Attribute (optional)","text",t.attribute||"",r=>s("attribute",r.trim())),this.addHint("Read a specific attribute, supports nested paths (e.g. 'entries.days.0.day')."),this.addCheckbox("Text Sensor (string value)",t.is_text_sensor||!1,r=>s("is_text_sensor",r)),this.addHint("Enable if entity returns text instead of numbers."),this.addCheckbox("Local / On-Device Sensor",!!t.is_local_sensor,r=>s("is_local_sensor",r)),this.addHint("Use internal battery_level/signal sensor."),this.addLabeledInputWithPicker("Secondary Entity ID","text",e.entity_id_2||"",r=>{g.updateWidget(e.id,{entity_id_2:r})},e),this.addLabeledInput("Secondary Attribute","text",t.attribute2||"",r=>s("attribute2",r.trim())),this.addHint("Optional attribute for the secondary entity."),this.addLabeledInput("Title/Label","text",e.title||"",r=>{g.updateWidget(e.id,{title:r})}),this.endSection(),this.createSection("Format",!1),this.addSelect("Display Format",t.value_format||"label_value",[{value:"label_value",label:"Label: Value & Unit"},{value:"label_value_no_unit",label:"Label: Value Only"},{value:"label_newline_value",label:"Label [newline] Value & Unit"},{value:"label_newline_value_no_unit",label:"Label [newline] Value Only"},{value:"value_only",label:"Value & Unit"},{value:"value_only_no_unit",label:"Value Only"}],r=>s("value_format",r)),this.addLabeledInput("Precision","number",t.precision!==void 0?t.precision:2,r=>s("precision",parseInt(r,10))),this.addLabeledInputWithDataList("Prefix","text",t.prefix||"",["€","$","£","¥","CHF","kr"],r=>s("prefix",r)),this.addLabeledInputWithDataList("Postfix","text",t.postfix||"",[" kWh"," W"," V"," A"," °C"," %"," ppm"," lx"],r=>s("postfix",r)),this.addLabeledInput("Unit (Manual helper)","text",t.unit||"",r=>s("unit",r)),this.addCheckbox("Hide default unit",t.hide_unit||!1,r=>s("hide_unit",r)),this.endSection(),this.createSection("Appearance",!0),this.addNumberWithSlider("Opacity (%)",t.opacity!==void 0?t.opacity:100,0,100,r=>{s("opacity",r)}),this.addCompactPropertyRow(()=>{this.addLabeledInput("Label Size","number",t.label_font_size||14,r=>s("label_font_size",parseInt(r,10))),this.addLabeledInput("Value Size","number",t.value_font_size||20,r=>s("value_font_size",parseInt(r,10)))}),this.addColorSelector("Color",t.color||"black",o,r=>s("color",r));else if(i==="progress_bar")this.createSection("Data Source",!0),this.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",r=>{g.updateWidget(e.id,{entity_id:r}),r&&!e.title&&window.AppState&&window.AppState.entityStates&&this.autoPopulateTitleFromEntity(e.id,r)},e),this.addCompactPropertyRow(()=>{this.addLabeledInput("Min Value","number",t.min!==void 0?t.min:0,r=>s("min",parseFloat(r))),this.addLabeledInput("Max Value","number",t.max!==void 0?t.max:100,r=>s("max",parseFloat(r)))}),this.addCheckbox("Local / On-Device Sensor",!!t.is_local_sensor,r=>s("is_local_sensor",r)),this.addHint("Use internal battery_level/signal sensor."),this.addLabeledInput("Title/Label","text",e.title||"",r=>{g.updateWidget(e.id,{title:r})}),this.endSection(),this.createSection("Appearance",!0),this.addSelect("Orientation",t.orientation||"horizontal",[{value:"horizontal",label:"Horizontal"},{value:"vertical",label:"Vertical"}],r=>s("orientation",r)),this.addNumberWithSlider("Opacity (%)",t.opacity!==void 0?t.opacity:100,0,100,r=>{s("opacity",r)}),this.addCheckbox("Show Label",t.show_label!==!1,r=>s("show_label",r)),this.addCheckbox("Show Percentage",t.show_percentage!==!1,r=>s("show_percentage",r)),this.addCompactPropertyRow(()=>{this.addLabeledInput("Font Size","number",t.font_size||12,r=>s("font_size",parseInt(r,10))),this.addSelect("Text Align",t.text_align||"CENTER",["LEFT","CENTER","RIGHT"],r=>s("text_align",r))}),this.addCompactPropertyRow(()=>{this.addLabeledInput("Bar Height/Width","number",t.bar_height||15,r=>{const a=parseInt(r,10);s("bar_height",isNaN(a)?15:a)}),this.addLabeledInput("Border W","number",t.border_width||1,r=>{const a=parseInt(r,10);s("border_width",isNaN(a)?1:a)})}),this.addColorSelector("Color",t.color||"black",o,r=>s("color",r)),this.addColorSelector("Background",t.bg_color||"white",o,r=>s("bg_color",r)),this.endSection();else if(i==="graph")this.createSection("Data Source",!0),this.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",r=>{g.updateWidget(e.id,{entity_id:r})},e),this.addLabeledInput("Title","text",e.title||"",r=>{g.updateWidget(e.id,{title:r})}),this.addLabeledInput("Duration","text",t.duration||"1h",r=>s("duration",r)),this.addHint("The device collects data from boot. The graph fills up over the configured duration."),this.endSection(),this.createSection("Advanced: HA History Attribute",!1),this.addCheckbox("Read History from HA Attribute",!!t.use_ha_history,r=>s("use_ha_history",r)),t.use_ha_history&&(this.addLabeledInput("HA Attribute","text",t.history_attribute||"history",r=>s("history_attribute",r)),this.addLabeledInput("Points to keep","number",t.history_points||100,r=>s("history_points",parseInt(r,10))),this.addCheckbox("Smooth Data (Moving Avg)",!!t.history_smoothing,r=>s("history_smoothing",r)),this.addHint('⚠️ <span style="color:orange">Requires a custom HA template sensor that exposes history as a JSON array attribute.</span> Standard HA entities do not have this attribute by default.')),this.endSection(),this.createSection("Appearance",!0),this.addCheckbox("Auto-scale Y Axis",t.auto_scale!==!1,r=>s("auto_scale",r)),this.addCompactPropertyRow(()=>{const r=t.auto_scale!==!1;this.addLabeledInput(r?"Min (Override)":"Min Value","number",t.min_value!==void 0?t.min_value:"",a=>s("min_value",a)),this.addLabeledInput(r?"Max (Override)":"Max Value","number",t.max_value!==void 0?t.max_value:"",a=>s("max_value",a))}),t.auto_scale!==!1?(this.addLabeledInput("Min Range","number",t.min_range||"10",r=>s("min_range",r)),this.addHint("Min/Max inputs override auto-scaling for that bound. Min Range ensures minimum spread.")):this.addHint("Fixed Y-axis bounds."),this.addColorSelector("Line Color",t.color||"black",o,r=>s("color",r)),this.addSelect("Line Type",t.line_type||"SOLID",["SOLID","DASHED","DOTTED"],r=>s("line_type",r)),this.addLabeledInput("Line Thickness","number",t.line_thickness||3,r=>s("line_thickness",parseInt(r,10))),this.addCheckbox("Show Border",t.border!==!1,r=>s("border",r)),this.addCheckbox("Show Grid",t.grid!==!1,r=>s("grid",r)),this.addLabeledInput("X Grid Interval","text",t.x_grid||"1h",r=>s("x_grid",r)),this.addLabeledInput("Y Grid Step","text",t.y_grid||"auto",r=>s("y_grid",r)),this.endSection();else if(i==="icon")this.createSection("Appearance",!0),this.addCheckbox("Fit icon to frame",t.fit_icon_to_frame||!1,r=>s("fit_icon_to_frame",r)),this.addIconPicker("Select Icon",t.code||"F07D0",r=>s("code",r),e),this.addLabeledInput("Icon Size (px)","number",t.size||40,r=>{let a=parseInt(r||"40",10);(Number.isNaN(a)||a<8)&&(a=8),a>260&&(a=260),s("size",a)}),this.addSelect("Font Reference",t.font_ref||"font_mdi_medium",["font_mdi_medium","font_mdi_large"],r=>s("font_ref",r)),this.addColorSelector("Color",t.color||"black",o,r=>s("color",r)),this.addColorSelector("Background",t.bg_color||"transparent",o,r=>s("bg_color",r)),this.createSection("Border Style",!1),this.addLabeledInput("Border Width","number",t.border_width||0,r=>s("border_width",parseInt(r,10))),this.addColorSelector("Border Color",t.border_color||"theme_auto",o,r=>s("border_color",r)),this.addLabeledInput("Corner Radius","number",t.border_radius||0,r=>s("border_radius",parseInt(r,10))),this.addDropShadowButton(this.getContainer(),e.id),this.endSection(),this.endSection();else if(i==="battery_icon")this.createSection("Data Source",!0),this.addLabeledInputWithPicker("Battery Entity ID","text",e.entity_id||"",r=>{g.updateWidget(e.id,{entity_id:r})},e),this.addCheckbox("Local / On-Device Sensor",!!t.is_local_sensor,r=>s("is_local_sensor",r)),this.endSection(),this.createSection("Appearance",!0),this.addCheckbox("Fit icon to frame",t.fit_icon_to_frame||!1,r=>s("fit_icon_to_frame",r)),this.addLabeledInput("Icon Size (px)","number",t.size||48,r=>{let a=parseInt(r||"48",10);(Number.isNaN(a)||a<16)&&(a=16),a>200&&(a=200),s("size",a)}),this.addLabeledInput("Percentage Font Size (px)","number",t.font_size||12,r=>{let a=parseInt(r||"12",10);(Number.isNaN(a)||a<8)&&(a=8),a>100&&(a=100),s("font_size",a)}),this.addColorSelector("Color",t.color||"black",o,r=>s("color",r)),this.endSection();else if(i==="wifi_signal")this.createSection("Data Source",!0),this.addLabeledInputWithPicker("WiFi Signal Entity ID","text",e.entity_id||"",r=>{g.updateWidget(e.id,{entity_id:r})},e),this.addCheckbox("Local / On-Device Sensor",t.is_local_sensor!==!1,r=>s("is_local_sensor",r)),this.endSection(),this.createSection("Appearance",!0),this.addCheckbox("Show dBm value",t.show_dbm!==!1,r=>s("show_dbm",r)),this.addCheckbox("Fit icon to frame",t.fit_icon_to_frame||!1,r=>s("fit_icon_to_frame",r)),this.addLabeledInput("Icon Size (px)","number",t.size||24,r=>{let a=parseInt(r||"24",10);(Number.isNaN(a)||a<16)&&(a=16),a>200&&(a=200),s("size",a)}),this.addLabeledInput("dBm Font Size (px)","number",t.font_size||12,r=>{let a=parseInt(r||"12",10);(Number.isNaN(a)||a<8)&&(a=8),a>100&&(a=100),s("font_size",a)}),this.addColorSelector("Color",t.color||"black",o,r=>s("color",r)),this.endSection();else if(i==="quote_rss")this.createSection("Data Source",!0),this.addLabeledInput("Feed URL","text",t.feed_url||"https://www.brainyquote.com/link/quotebr.rss",r=>s("feed_url",r)),this.addLabeledInput("Refresh","text",t.refresh_interval||"1h",r=>s("refresh_interval",r)),this.addCheckbox("Randomize",t.random!==!1,r=>s("random",r)),this.endSection(),this.createSection("Appearance",!0),this.addCheckbox("Show Author",t.show_author!==!1,r=>s("show_author",r)),this.addCheckbox("Italic Quote",t.italic_quote!==!1,r=>s("italic_quote",r)),this.addLabeledInput("Quote Font Size","number",t.quote_font_size||18,r=>s("quote_font_size",parseInt(r,10))),this.addLabeledInput("Author Font Size","number",t.author_font_size||14,r=>s("author_font_size",parseInt(r,10))),this.addColorSelector("Color",t.color||"black",o,r=>s("color",r)),this.addColorSelector("Background",t.bg_color||"transparent",o,r=>s("bg_color",r)),this.createSection("Border Style",!1),this.addLabeledInput("Border Width","number",t.border_width||0,r=>s("border_width",parseInt(r,10))),this.addColorSelector("Border Color",t.border_color||"theme_auto",o,r=>s("border_color",r)),this.addLabeledInput("Corner Radius","number",t.border_radius||0,r=>s("border_radius",parseInt(r,10))),this.addDropShadowButton(this.getContainer(),e.id),this.endSection(),this.endSection();else if(i==="ondevice_temperature"){this.createSection("Data Source",!0),this.addLabeledInputWithPicker("Temperature Entity ID","text",e.entity_id||"",l=>{g.updateWidget(e.id,{entity_id:l})},e),this.addCheckbox("Local / On-Device Sensor",t.is_local_sensor!==!1,l=>s("is_local_sensor",l));let r=!1;const a=g.getSelectedProfile();a&&a.features&&(r=!!(a.features.sht4x||a.features.sht3x||a.features.shtc3)),t.is_local_sensor!==!1&&!r&&(this.addHint('⚠️ <span style="color:orange">This hardware profile has no onboard temperature sensor.</span><br/>Uncheck this or select an HA entity.'),e.props&&e.props.is_local_sensor===void 0&&setTimeout(()=>s("is_local_sensor",!1),0)),this.endSection(),this.createSection("Appearance",!0),this.addCheckbox("Fit icon to frame",t.fit_icon_to_frame||!1,l=>s("fit_icon_to_frame",l)),this.addCheckbox("Show Label",t.show_label!==!1,l=>s("show_label",l)),this.addLabeledInput("Icon Size (px)","number",t.size||32,l=>{let c=parseInt(l||"32",10);(Number.isNaN(c)||c<16)&&(c=16),c>200&&(c=200),s("size",c)}),this.addLabeledInput("Value Font Size (px)","number",t.font_size||16,l=>{let c=parseInt(l||"16",10);(Number.isNaN(c)||c<8)&&(c=8),c>200&&(c=200),s("font_size",c)}),this.addLabeledInput("Label Font Size (px)","number",t.label_font_size||10,l=>{let c=parseInt(l||"10",10);(Number.isNaN(c)||c<8)&&(c=8),c>100&&(c=100),s("label_font_size",c)}),this.addSelect("Unit",t.unit||"°C",["°C","°F"],l=>s("unit",l)),this.addLabeledInput("Precision","number",t.precision??1,l=>s("precision",parseInt(l,10))),this.addColorSelector("Color",t.color||"black",o,l=>s("color",l)),this.endSection()}else if(i==="ondevice_humidity"){this.createSection("Data Source",!0),this.addLabeledInputWithPicker("Humidity Entity ID","text",e.entity_id||"",l=>{g.updateWidget(e.id,{entity_id:l})},e),this.addCheckbox("Local / On-Device Sensor",t.is_local_sensor!==!1,l=>s("is_local_sensor",l));let r=!1;const a=g.getSelectedProfile();a&&a.features&&(r=!!(a.features.sht4x||a.features.sht3x||a.features.shtc3)),t.is_local_sensor!==!1&&!r&&(this.addHint('⚠️ <span style="color:orange">This hardware profile has no onboard humidity sensor.</span><br/>Uncheck this or select an HA entity.'),e.props&&e.props.is_local_sensor===void 0&&setTimeout(()=>s("is_local_sensor",!1),0)),this.endSection(),this.createSection("Appearance",!0),this.addCheckbox("Fit icon to frame",t.fit_icon_to_frame||!1,l=>s("fit_icon_to_frame",l)),this.addCheckbox("Show Label",t.show_label!==!1,l=>s("show_label",l)),this.addLabeledInput("Icon Size (px)","number",t.size||32,l=>{let c=parseInt(l||"32",10);(Number.isNaN(c)||c<16)&&(c=16),c>200&&(c=200),s("size",c)}),this.addLabeledInput("Value Font Size (px)","number",t.font_size||16,l=>{let c=parseInt(l||"16",10);(Number.isNaN(c)||c<8)&&(c=8),c>200&&(c=200),s("font_size",c)}),this.addLabeledInput("Label Font Size (px)","number",t.label_font_size||10,l=>{let c=parseInt(l||"10",10);(Number.isNaN(c)||c<8)&&(c=8),c>100&&(c=100),s("label_font_size",c)}),this.addLabeledInput("Unit","text",t.unit||"%",l=>s("unit",l)),this.addLabeledInput("Precision","number",t.precision??0,l=>s("precision",parseInt(l,10))),this.addColorSelector("Color",t.color||"black",o,l=>s("color",l)),this.endSection()}else if(i==="weather_icon")this.createSection("Data Source",!0),this.addLabeledInputWithPicker("Weather Entity ID","text",e.entity_id||t.weather_entity||"weather.forecast_home",r=>{g.updateWidget(e.id,{entity_id:r})},e),this.addLabeledInput("Attribute (optional)","text",t.attribute||"",r=>s("attribute",r.trim())),this.addHint("Read a specific attribute for weather state (e.g. forecast)."),this.endSection(),this.createSection("Appearance",!0),this.addCheckbox("Fit icon to frame",t.fit_icon_to_frame||!1,r=>s("fit_icon_to_frame",r)),this.addLabeledInput("Icon Size (px)","number",t.size||48,r=>{let a=parseInt(r||"48",10);(Number.isNaN(a)||a<8)&&(a=8),a>260&&(a=260),s("size",a)}),this.addColorSelector("Color",t.color||"black",o,r=>s("color",r)),this.addColorSelector("Background",t.bg_color||"transparent",o,r=>s("bg_color",r)),this.createSection("Border Style",!1),this.addLabeledInput("Border Width","number",t.border_width||0,r=>s("border_width",parseInt(r,10))),this.addColorSelector("Border Color",t.border_color||"theme_auto",o,r=>s("border_color",r)),this.addLabeledInput("Corner Radius","number",t.border_radius||0,r=>s("border_radius",parseInt(r,10))),this.addDropShadowButton(this.getContainer(),e.id),this.endSection(),this.endSection();else if(i==="weather_forecast"){this.createSection("Data Source",!0),this.addLabeledInputWithPicker("Weather Entity ID","text",e.entity_id||t.weather_entity||"weather.forecast_home",c=>{g.updateWidget(e.id,{entity_id:c})},e),this.endSection(),this.createSection("Forecast Settings",!0),this.addSelect("Forecast Mode",t.forecast_mode||"daily",[{value:"daily",label:"Daily"},{value:"hourly",label:"Hourly"}],c=>s("forecast_mode",c)),(t.forecast_mode||"daily")==="hourly"?(this.addLabeledInput("Hour Slots (comma-sep)","text",t.hourly_slots||"06,09,12,15,18,21",c=>s("hourly_slots",c)),this.addHint("e.g. 06,09,12,15,18,21 for 6-hour intervals")):this.addNumberWithSlider("Forecast Days",t.days||5,1,7,c=>s("days",c)),this.addLabeledInput("Start Offset","number",t.start_offset||0,c=>s("start_offset",parseInt(c,10)||0)),this.addHint("Skip the first N hours/days (e.g. 1 to skip 'Today')"),this.addSelect("Layout",t.layout||"horizontal",["horizontal","vertical"],c=>s("layout",c)),this.endSection(),this.createSection("Appearance",!0),(t.forecast_mode||"daily")==="daily"&&this.addCheckbox("Show High/Low Temp",t.show_high_low!==!1,c=>s("show_high_low",c)),this.addSelect("Temperature Unit",t.temp_unit||"C",["C","F"],c=>s("temp_unit",c)),this.addLabeledInput("Day Font Size","number",t.day_font_size||14,c=>s("day_font_size",parseInt(c,10))),this.addLabeledInput("Temp Font Size","number",t.temp_font_size||14,c=>s("temp_font_size",parseInt(c,10))),this.addLabeledInput("Icon Size","number",t.icon_size||24,c=>s("icon_size",parseInt(c,10))),this.addLabeledInput("Precision","number",t.precision!==void 0?t.precision:1,c=>s("precision",parseInt(c,10)));const r=["Roboto","Inter","Open Sans","Lato","Montserrat","Poppins","Raleway","Roboto Mono","Ubuntu","Nunito","Playfair Display","Merriweather","Work Sans","Source Sans Pro","Quicksand","Custom..."],a=t.font_family||"Roboto",l=!r.slice(0,-1).includes(a);this.addSelect("Font",l?"Custom...":a,r,c=>{c!=="Custom..."?(s("font_family",c),s("custom_font_family","")):s("font_family","Custom...")}),(l||t.font_family==="Custom...")&&(this.addLabeledInput("Custom Font Name","text",t.custom_font_family||(l?a:""),c=>{s("font_family",c||"Roboto"),s("custom_font_family",c)}),this.addHint('Browse <a href="https://fonts.google.com" target="_blank">fonts.google.com</a>')),this.addColorSelector("Color",t.color||"black",o,c=>s("color",c)),this.addColorSelector("Background Color",t.background_color||"transparent",o,c=>s("background_color",c)),this.endSection(),this.createSection("Border Style",!1),this.addLabeledInput("Border Width","number",t.border_width||0,c=>s("border_width",parseInt(c,10))),this.addColorSelector("Border Color",t.border_color||"theme_auto",o,c=>s("border_color",c)),this.addLabeledInput("Corner Radius","number",t.border_radius||0,c=>s("border_radius",parseInt(c,10))),this.addDropShadowButton(this.getContainer(),e.id),this.endSection()}else if(i==="template_sensor_bar")this.createSection("Sensor Visibility",!0),this.addCheckbox("Show WiFi",t.show_wifi!==!1,r=>s("show_wifi",r)),this.addCheckbox("Show Temperature",t.show_temperature!==!1,r=>s("show_temperature",r)),this.addCheckbox("Show Humidity",t.show_humidity!==!1,r=>s("show_humidity",r)),this.addCheckbox("Show Battery",t.show_battery!==!1,r=>s("show_battery",r)),this.endSection(),this.createSection("Sensor Data Sources",!1),this.addCompactPropertyRow(()=>{this.addLabeledInput("WiFi Entity","text",t.wifi_entity||"",r=>s("wifi_entity",r)),this.addCheckbox("Local",!!t.wifi_is_local,r=>s("wifi_is_local",r))}),this.addCompactPropertyRow(()=>{this.addLabeledInput("Temp Entity","text",t.temp_entity||"",r=>s("temp_entity",r)),this.addCheckbox("Local",!!t.temp_is_local,r=>s("temp_is_local",r))}),this.addSelect("Temperature Unit",t.temp_unit||"°C",["°C","°F"],r=>s("temp_unit",r)),this.addCompactPropertyRow(()=>{this.addLabeledInput("Hum Entity","text",t.hum_entity||"",r=>s("hum_entity",r)),this.addCheckbox("Local",!!t.hum_is_local,r=>s("hum_is_local",r))}),this.addCompactPropertyRow(()=>{this.addLabeledInput("Battery Entity","text",t.bat_entity||"",r=>s("bat_entity",r)),this.addCheckbox("Local",!!t.bat_is_local,r=>s("bat_is_local",r))}),this.endSection(),this.createSection("Appearance",!0),this.addCheckbox("Show Background",t.show_background!==!1,r=>s("show_background",r)),t.show_background!==!1&&(this.addColorSelector("Background Color",t.background_color||"black",o,r=>{s("background_color",r);const a=["black","gray","grey","#000000","#808080"],l=["white","#ffffff","#fff"],c=t.color||"white";a.includes(r.toLowerCase())&&a.includes(c.toLowerCase())?s("color","white"):l.includes(r.toLowerCase())&&l.includes(c.toLowerCase())&&s("color","black")}),this.addLabeledInput("Border Radius","number",t.border_radius||8,r=>s("border_radius",parseInt(r,10))),this.addLabeledInput("Border Thickness","number",t.border_thickness||0,r=>s("border_thickness",parseInt(r,10))),this.addColorSelector("Border Color",t.border_color||"white",o,r=>s("border_color",r))),this.endSection(),this.createSection("Sizes & Color",!1),this.addLabeledInput("Icon Size","number",t.icon_size||20,r=>s("icon_size",parseInt(r,10))),this.addLabeledInput("Font Size","number",t.font_size||14,r=>s("font_size",parseInt(r,10))),this.addColorSelector("Foreground Color",t.color||"white",o,r=>s("color",r)),this.endSection();else if(i==="template_nav_bar")this.createSection("Button Visibility",!0),this.addCheckbox("Show Previous",t.show_prev!==!1,r=>s("show_prev",r)),this.addCheckbox("Show Home",t.show_home!==!1,r=>s("show_home",r)),this.addCheckbox("Show Next",t.show_next!==!1,r=>s("show_next",r)),this.endSection(),this.createSection("Page Targets",!1),t.show_prev!==!1&&this.addPageSelector("Prev Button Target",t.prev_target||"relative_prev",r=>s("prev_target",r)),t.show_home!==!1&&this.addPageSelector("Home Button Target",t.home_target||"home",r=>s("home_target",r)),t.show_next!==!1&&this.addPageSelector("Next Button Target",t.next_target||"relative_next",r=>s("next_target",r)),this.endSection(),this.createSection("Appearance",!0),this.addCheckbox("Show Background",t.show_background!==!1,r=>s("show_background",r)),t.show_background!==!1&&(this.addColorSelector("Background Color",t.background_color||"black",o,r=>{s("background_color",r);const a=["black","gray","grey","#000000","#808080"],l=["white","#ffffff","#fff"],c=t.color||"white";a.includes(r.toLowerCase())&&a.includes(c.toLowerCase())?s("color","white"):l.includes(r.toLowerCase())&&l.includes(c.toLowerCase())&&s("color","black")}),this.addLabeledInput("Border Radius","number",t.border_radius||8,r=>s("border_radius",parseInt(r,10))),this.addLabeledInput("Border Thickness","number",t.border_thickness||0,r=>s("border_thickness",parseInt(r,10))),this.addColorSelector("Border Color",t.border_color||"white",o,r=>s("border_color",r))),this.endSection(),this.createSection("Sizes & Color",!1),this.addLabeledInput("Icon Size","number",t.icon_size||24,r=>s("icon_size",parseInt(r,10))),this.addColorSelector("Foreground Color",t.color||"white",o,r=>s("color",r)),this.endSection();else if(i==="touch_area"||i==="nav_next_page"||i==="nav_previous_page"||i==="nav_reload_page"){this.createSection("Action",!0),this.addSelect("Navigation Action",t.nav_action||"none",[{value:"none",label:"None (Entity Toggle)"},{value:"next_page",label:"Next Page"},{value:"previous_page",label:"Previous Page"},{value:"reload_page",label:"Reload Page"}],c=>{s("nav_action",c),(t.icon==="F0142"||t.icon==="F0141"||t.icon==="F0450"||!t.icon)&&(c==="next_page"?s("icon","F0142"):c==="previous_page"?s("icon","F0141"):c==="reload_page"&&s("icon","F0450"))}),(t.nav_action||"none")==="none"&&this.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",c=>{g.updateWidget(e.id,{entity_id:c})},e),this.endSection(),this.createSection("Content",!0),this.addLabeledInput("Title","text",t.title||"",c=>s("title",c)),this.addIconPicker("Normal Icon",t.icon||"",c=>s("icon",c),e),this.addIconPicker("Pressed Icon",t.icon_pressed||"",c=>s("icon_pressed",c),e),this.addLabeledInput("Icon Size","number",t.icon_size||40,c=>s("icon_size",parseInt(c,10))),this.addColorSelector("Icon Color",t.icon_color||"black",o,c=>s("icon_color",c)),this.endSection(),this.createSection("Appearance",!0);const r=t.color||"rgba(0, 0, 255, 0.2)";let a="#0000ff",l=.2;if(r.startsWith("#"))a=r,l=1;else if(r.startsWith("rgba")){const c=r.match(/([\d\.]+)/g);if(c&&c.length>=4){const d=parseInt(c[0]),p=parseInt(c[1]),h=parseInt(c[2]);l=parseFloat(c[3]),a="#"+((1<<24)+(d<<16)+(p<<8)+h).toString(16).slice(1)}}this.addLabeledInput("Preview Color","color",a,c=>{const d=parseInt(c.slice(1,3),16),p=parseInt(c.slice(3,5),16),h=parseInt(c.slice(5,7),16);s("color",`rgba(${d}, ${p}, ${h}, ${l})`),s("border_color",c)}),this.addLabeledInput("Opacity (0.0 - 1.0)","number",l,c=>{let d=parseFloat(c);d<0&&(d=0),d>1&&(d=1);const p=parseInt(a.slice(1,3),16),h=parseInt(a.slice(3,5),16),u=parseInt(a.slice(5,7),16);s("color",`rgba(${p}, ${h}, ${u}, ${d})`)}),this.addColorSelector("Border Color",t.border_color||"#0000ff",o,c=>s("border_color",c)),this.endSection()}else if(i==="image"){this.createSection("Content",!0),this.addHint("🖼️ Static image from ESPHome.<br/><span style='color:#888;font-size:11px;'>Replace the default path with your actual image file path.</span>"),this.addLabeledInput("Image Path","text",t.path||"",c=>s("path",c)),this.endSection(),this.createSection("Appearance",!0),t.invert===void 0&&s("invert",Je()==="reterminal_e1001"),this.addCheckbox("Invert colors",t.invert||!1,c=>s("invert",c)),this.addSelect("Render Mode",t.render_mode||"Auto",["Auto","Binary","Grayscale","Color (RGB565)"],c=>s("render_mode",c));const r=document.createElement("div");r.className="field",r.style.marginTop="12px";const a=e.x===0&&e.y===0&&e.width===800&&e.height===480,l=document.createElement("button");l.className="btn "+(a?"btn-primary":"btn-secondary")+" btn-full",l.textContent=a?"✓ Full Screen (click to restore)":"⛶ Fill Screen",l.type="button",l.addEventListener("click",()=>{a?g.updateWidget(e.id,{x:50,y:50,width:200,height:150}):g.updateWidget(e.id,{x:0,y:0,width:800,height:480})}),r.appendChild(l),this.getContainer().appendChild(r),this.endSection()}else if(i==="online_image"){this.createSection("Content",!0),this.addHint("💡 Fetch remote images dynamically (Puppet support):<br/><code style='background:#f0f0f0;padding:2px 4px;border-radius:2px;'>https://example.com/camera/snapshot.jpg </code><br/><span style='color:#4a9eff;'>ℹ️ Images are downloaded at specified intervals</span>"),this.addLabeledInput("Remote URL","text",t.url||"",c=>s("url",c)),this.addLabeledInput("Update interval (seconds)","number",t.interval_s||300,c=>s("interval_s",parseInt(c,10))),this.endSection(),this.createSection("Appearance",!0),t.invert===void 0&&s("invert",Je()==="reterminal_e1001"),this.addCheckbox("Invert colors",t.invert||!1,c=>s("invert",c)),this.addSelect("Render Mode",t.render_mode||"Auto",["Auto","Binary","Grayscale","Color (RGB565)"],c=>s("render_mode",c));const r=document.createElement("div");r.className="field",r.style.marginTop="12px";const a=e.x===0&&e.y===0&&e.width===800&&e.height===480,l=document.createElement("button");l.className="btn "+(a?"btn-primary":"btn-secondary")+" btn-full",l.textContent=a?"✓ Full Screen (click to restore)":"⛶ Fill Screen",l.type="button",l.addEventListener("click",()=>{a?g.updateWidget(e.id,{x:50,y:50,width:200,height:150}):g.updateWidget(e.id,{x:0,y:0,width:800,height:480})}),r.appendChild(l),this.getContainer().appendChild(r),this.endSection()}else if(i==="qr_code")this.createSection("Content",!0),this.addHint("📱 Generate QR codes that can be scanned by phones/tablets"),this.addLabeledInput("QR Content","text",t.value||"https://esphome.io",r=>s("value",r)),this.addHint("Enter a URL, text, or any string to encode"),this.endSection(),this.createSection("Appearance",!0),this.addLabeledInput("Scale","number",t.scale||2,r=>{let a=parseInt(r||"2",10);(Number.isNaN(a)||a<1)&&(a=1),a>10&&(a=10),s("scale",a)}),this.addHint("Size multiplier (1-10). Larger = bigger QR code"),this.addSelect("Error Correction",t.ecc||"LOW",["LOW","MEDIUM","QUARTILE","HIGH"],r=>s("ecc",r)),this.addHint("Higher = more redundancy, can recover from damage"),this.addSelect("Color",t.color||"black",["black","white"],r=>s("color",r)),this.endSection();else if(i==="quote_rss"){this.createSection("Feed Settings",!0),this.addHint("📰 Display quotes from an RSS feed (Quote of the Day)"),this.addLabeledInput("Feed URL","text",t.feed_url||"https://www.brainyquote.com/link/quotebr.rss",u=>s("feed_url",u)),this.addHint("Enter any RSS feed URL. Default: BrainyQuote daily quotes"),this.addCheckbox("Show Author",t.show_author!==!1,u=>s("show_author",u)),this.addCheckbox("Random Quote",t.random!==!1,u=>s("random",u)),this.addHint("Pick a random quote from the feed, or use the first one");const r=["15min","30min","1h","2h","4h","8h","12h","24h"];this.addSelect("Refresh Interval",t.refresh_interval||"24h",r,u=>s("refresh_interval",u)),this.addLabeledInput("Home Assistant URL","text",t.ha_url||"http://homeassistant.local:8123",u=>s("ha_url",u)),this.addHint("Address of your Home Assistant instance (for Proxy)"),this.endSection(),this.createSection("Typography",!1),this.addLabeledInput("Quote Text Size (Line 1)","number",t.quote_font_size||18,u=>s("quote_font_size",parseInt(u,10))),this.addLabeledInput("Author Size (Line 2)","number",t.author_font_size||14,u=>s("author_font_size",parseInt(u,10)));const a=["Roboto","Inter","Open Sans","Lato","Montserrat","Poppins","Raleway","Roboto Mono","Ubuntu","Nunito","Playfair Display","Merriweather","Work Sans","Source Sans Pro","Quicksand","Custom..."],l=t.font_family||"Roboto",c=!a.slice(0,-1).includes(l);this.addSelect("Font",c?"Custom...":l,a,u=>{u!=="Custom..."?(s("font_family",u),s("custom_font_family","")):s("font_family","Custom...")}),(c||t.font_family==="Custom...")&&(this.addLabeledInput("Custom Font Name","text",t.custom_font_family||(c?l:""),u=>{s("font_family",u||"Roboto"),s("custom_font_family",u)}),this.addHint('Browse <a href="https://fonts.google.com" target="_blank">fonts.google.com</a>'));const d=zt(l);let p=t.font_weight||400;d.includes(p)||(p=Ut(l,p),setTimeout(()=>s("font_weight",p),0)),this.addSelect("Weight",p,d,u=>s("font_weight",parseInt(u,10)));const h=["TOP_LEFT","TOP_CENTER","TOP_RIGHT","CENTER_LEFT","CENTER","CENTER_RIGHT","BOTTOM_LEFT","BOTTOM_CENTER","BOTTOM_RIGHT"];this.addSelect("Align",t.text_align||"TOP_LEFT",h,u=>s("text_align",u)),this.addColorSelector("Color",t.color||"black",o,u=>s("color",u)),this.endSection(),this.createSection("Display Options",!1),this.addCheckbox("Word Wrap",t.word_wrap!==!1,u=>s("word_wrap",u)),this.addCheckbox("Auto Scale Text",t.auto_scale||!1,u=>s("auto_scale",u)),this.addHint("Automatically reduce font size if text is too long"),this.addCheckbox("Italic Quote",t.italic_quote!==!1,u=>s("italic_quote",u)),this.endSection()}else if(i==="calendar"){this.createSection("Appearance",!0),this.addColorSelector("Text Color",t.text_color||"black",o,l=>s("text_color",l)),this.addColorSelector("Background",t.background_color||"white",o,l=>s("background_color",l)),this.endSection(),this.createSection("Border Style",!1),this.addLabeledInput("Border Width","number",t.border_width||0,l=>s("border_width",parseInt(l,10))),this.addColorSelector("Border Color",t.border_color||"theme_auto",o,l=>s("border_color",l)),this.addLabeledInput("Corner Radius","number",t.border_radius||0,l=>s("border_radius",parseInt(l,10))),this.addDropShadowButton(this.getContainer(),e.id),this.endSection(),this.createSection("Font Sizes",!1),this.addLabeledInput("Big Date Size","number",t.font_size_date||100,l=>s("font_size_date",parseInt(l,10))),this.addLabeledInput("Day Name Size","number",t.font_size_day||24,l=>s("font_size_day",parseInt(l,10))),this.addLabeledInput("Grid Text Size","number",t.font_size_grid||14,l=>s("font_size_grid",parseInt(l,10))),this.addLabeledInput("Event Text Size","number",t.font_size_event||18,l=>s("font_size_event",parseInt(l,10))),this.endSection(),this.createSection("Visibility",!0),this.addCheckbox("Show Header",t.show_header!==!1,l=>s("show_header",l)),this.addCheckbox("Show Grid",t.show_grid!==!1,l=>s("show_grid",l)),this.addCheckbox("Show Events",t.show_events!==!1,l=>s("show_events",l)),this.endSection(),this.createSection("Data Source",!0),this.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"sensor.esp_calendar_data",l=>{g.updateWidget(e.id,{entity_id:l})},e),this.addLabeledInput("Max Events","number",t.max_events||8,l=>s("max_events",parseInt(l,10))),this.addHint("Must be a sensor with attribute 'entries'");const r=document.createElement("button");r.className="btn btn-secondary btn-full btn-xs",r.textContent="Download Helper Script",r.style.marginTop="10px",r.addEventListener("click",()=>{const l=document.createElement("a");l.setAttribute("href","data:text/x-python;charset=utf-8,"+encodeURIComponent(bl)),l.setAttribute("download","esp_calendar_data_conversion.py"),l.style.display="none",document.body.appendChild(l),l.click(),document.body.removeChild(l)}),this.getContainer().appendChild(r),this.addHint("Place in /config/python_scripts/");const a=document.createElement("div");a.style.marginTop="5px",a.style.fontSize="10px",a.style.color="#888",a.style.textAlign="center",a.innerText="Check widget instructions for HA setup.",this.getContainer().appendChild(a),this.endSection()}else if(i==="puppet")this.createSection("Content",!0),this.addLabeledInput("File path / URL","text",t.image_url||"",r=>s("image_url",r)),this.addHint('Tip: Use mdi:icon-name for Material Design Icons. <br><b>Important:</b> Ensure `materialdesignicons - webfont.ttf` is in your ESPHome `fonts / ` folder. <a href="https://pictogrammers.com/library/mdi/" target="_blank" style="color: #52c7ea">MDI Library</a>'),this.endSection(),this.createSection("Appearance",!0),this.addSelect("Image type",t.image_type||"RGB565",["RGB565","RGB","GRAYSCALE","BINARY"],r=>s("image_type",r)),this.addHint("RGB565=2B/px, RGB=3B/px, GRAYSCALE=1B/px, BINARY=1bit/px"),this.addSelect("Transparency",t.transparency||"opaque",["opaque","chroma_key","alpha_channel"],r=>s("transparency",r)),this.addHint("opaque=no transparency, chroma_key=color key, alpha_channel=smooth blend"),this.endSection();else if(i==="lvgl_label"||i.startsWith("lvgl_")){if(this.addCommonLVGLProperties(e,t),this.createSection("Widget Settings",!0),i==="lvgl_label"){this.addLabeledInput("Text","text",t.text||"Label",h=>s("text",h)),this.addLabeledInput("Font Size","number",t.font_size||20,h=>s("font_size",parseInt(h,10))),this.addColorMixer("Text Color",t.color||"black",h=>s("color",h)),this.addColorMixer("Background Color",t.bg_color||"transparent",h=>s("bg_color",h));const r=["Roboto","Inter","Open Sans","Lato","Montserrat","Poppins","Raleway","Roboto Mono","Ubuntu","Nunito","Playfair Display","Merriweather","Work Sans","Source Sans Pro","Quicksand","Custom..."],a=t.font_family||"Roboto",l=!r.slice(0,-1).includes(a);this.addSelect("Font",l?"Custom...":a,r,h=>{h!=="Custom..."?s("font_family",h):s("font_family","Custom...")});const c=zt(a);let d=t.font_weight||400;c.includes(d)||(d=Ut(a,d),setTimeout(()=>s("font_weight",d),0)),this.addSelect("Weight",d,c,h=>s("font_weight",parseInt(h,10))),this.addCheckbox("Italic",t.italic||!1,h=>s("italic",h));const p=["TOP_LEFT","TOP_CENTER","TOP_RIGHT","CENTER_LEFT","CENTER","CENTER_RIGHT","BOTTOM_LEFT","BOTTOM_CENTER","BOTTOM_RIGHT"];this.addSelect("Align",t.text_align||"CENTER",p,h=>s("text_align",h))}else if(i==="lvgl_line"){const r=t.orientation||"horizontal";this.addSelect("Orientation",r,["horizontal","vertical"],u=>{const m=e.width,y=e.height;g.updateWidget(e.id,{props:{...t,orientation:u},width:y,height:m})}),this.addLabeledInput("Line Width","number",t.line_width||3,u=>s("line_width",parseInt(u,10))),this.addColorMixer("Line Color",t.line_color||t.color||"black",u=>s("line_color",u)),this.addCheckbox("Rounded Ends",t.line_rounded!==!1,u=>s("line_rounded",u)),this.addLabeledInput("Opacity (0-255)","number",t.opa||255,u=>s("opa",parseInt(u,10))),this.createSection("Quick Size",!1);const a=document.createElement("div");a.style.display="flex",a.style.gap="8px",a.style.marginBottom="8px";const l=g.getCanvasDimensions(),c=l.width,d=l.height,p=document.createElement("button");p.className="btn btn-secondary",p.style.flex="1",p.textContent="↔ Fill Horizontal",p.addEventListener("click",()=>{const u=t.line_width||3;g.updateWidget(e.id,{x:0,y:e.y,width:c,height:u,props:{...t,orientation:"horizontal"}})});const h=document.createElement("button");h.className="btn btn-secondary",h.style.flex="1",h.textContent="↕ Fill Vertical",h.addEventListener("click",()=>{const u=t.line_width||3;g.updateWidget(e.id,{x:e.x,y:0,width:u,height:d,props:{...t,orientation:"vertical"}})}),a.appendChild(h),this.getContainer().appendChild(a),this.endSection()}else if(i==="lvgl_meter"){this.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",a=>{g.updateWidget(e.id,{entity_id:a})},e),this.createSection("Size",!1);const r=Math.max(e.width,e.height);this.addLabeledInput("Size (px)","number",r,a=>{const l=parseInt(a,10)||100;g.updateWidget(e.id,{width:l,height:l})}),this.addHint("⚠️ Meter widgets must be square. Width and height are locked together."),this.endSection(),this.createSection("Scale",!1),this.addLabeledInput("Min Value","number",t.min||0,a=>s("min",parseInt(a,10))),this.addLabeledInput("Max Value","number",t.max||100,a=>s("max",parseInt(a,10))),this.endSection(),this.createSection("Preview",!1),this.addLabeledInput("Value (Preview)","number",t.value!==void 0?t.value:60,a=>s("value",parseInt(a,10))),this.endSection(),this.createSection("Appearance",!1),this.addColorMixer("Scale Color",t.color||"black",a=>s("color",a)),this.addColorMixer("Needle Color",t.indicator_color||"red",a=>s("indicator_color",a)),this.addLabeledInput("Scale Width","number",t.scale_width||10,a=>s("scale_width",parseInt(a,10))),this.addLabeledInput("Needle Width","number",t.indicator_width||4,a=>s("indicator_width",parseInt(a,10))),this.addLabeledInput("Ticks","number",t.tick_count||11,a=>s("tick_count",parseInt(a,10))),this.addLabeledInput("Tick Length","number",t.tick_length||10,a=>s("tick_length",parseInt(a,10))),this.addLabeledInput("Label Gap","number",t.label_gap||10,a=>s("label_gap",parseInt(a,10))),this.endSection()}else i==="lvgl_button"?(this.addLabeledInputWithPicker("Action Entity ID","text",e.entity_id||"",r=>{g.updateWidget(e.id,{entity_id:r})},e),this.addHint("Entity to toggle/trigger when clicked"),this.addLabeledInput("Text","text",t.text||"BTN",r=>s("text",r)),this.addColorMixer("Background Color",t.bg_color||"white",r=>s("bg_color",r)),this.addColorMixer("Text Color",t.color||"black",r=>s("color",r)),this.addLabeledInput("Border Width","number",t.border_width||2,r=>s("border_width",parseInt(r,10))),this.addLabeledInput("Corner Radius","number",t.radius||5,r=>s("radius",parseInt(r,10))),this.addCheckbox("Checkable (Toggle)",t.checkable||!1,r=>s("checkable",r))):i==="lvgl_arc"?(this.addLabeledInputWithPicker("Sensor Entity ID","text",e.entity_id||"",r=>{g.updateWidget(e.id,{entity_id:r})},e),this.addHint("Sensor to bind to arc value"),this.addLabeledInput("Title / Label","text",t.title||"",r=>{const a={...e.props,title:r};g.updateWidget(e.id,{props:a})}),this.addLabeledInput("Min Value","number",t.min||0,r=>s("min",parseInt(r,10))),this.addLabeledInput("Max Value","number",t.max||100,r=>s("max",parseInt(r,10))),this.addLabeledInput("Default/Preview Value","number",t.value||0,r=>s("value",parseInt(r,10))),this.addLabeledInput("Thickness","number",t.thickness||10,r=>s("thickness",parseInt(r,10))),this.addLabeledInput("Start Angle","number",t.start_angle||135,r=>s("start_angle",parseInt(r,10))),this.addLabeledInput("End Angle","number",t.end_angle||45,r=>s("end_angle",parseInt(r,10))),this.addSelect("Mode",t.mode||"NORMAL",["NORMAL","SYMMETRICAL","REVERSE"],r=>s("mode",r)),this.addColorMixer("Color",t.color||"blue",r=>s("color",r))):i==="lvgl_chart"?(this.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",r=>{g.updateWidget(e.id,{entity_id:r})},e),this.addLabeledInput("Title","text",t.title||"",r=>s("title",r)),this.addSelect("Type",t.type||"LINE",["LINE","SCATTER","BAR"],r=>s("type",r)),this.addLabeledInput("Min Value","number",t.min||0,r=>s("min",parseInt(r,10))),this.addLabeledInput("Max Value","number",t.max||100,r=>s("max",parseInt(r,10))),this.addLabeledInput("Point Count","number",t.point_count||10,r=>s("point_count",parseInt(r,10))),this.addLabeledInput("X Div Lines","number",t.x_div_lines||3,r=>s("x_div_lines",parseInt(r,10))),this.addLabeledInput("Y Div Lines","number",t.y_div_lines||3,r=>s("y_div_lines",parseInt(r,10))),this.addColorMixer("Color",t.color||"black",r=>s("color",r))):i==="lvgl_img"?(this.addLabeledInput("Source (Image/Symbol)","text",t.src||"",r=>s("src",r)),this.addHint("e.g. symbol_ok, symbol_home, or /image.png"),this.addLabeledInput("Rotation (0.1 deg)","number",t.rotation||0,r=>s("rotation",parseInt(r,10))),this.addLabeledInput("Scale (256 = 1x)","number",t.scale||256,r=>s("scale",parseInt(r,10))),this.addColorMixer("Color (Tint)",t.color||"black",r=>s("color",r))):i==="lvgl_qrcode"?(this.createSection("Content",!0),this.addLabeledInput("Content / URL","text",t.text||"",r=>s("text",r)),this.addLabeledInput("Size (px)","number",t.size||100,r=>s("size",parseInt(r,10))),this.addColorMixer("Color",t.color||"black",r=>s("color",r)),this.addColorMixer("Background Color",t.bg_color||"white",r=>s("bg_color",r)),this.endSection()):i==="lvgl_bar"?(this.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",r=>{g.updateWidget(e.id,{entity_id:r})},e),this.addLabeledInput("Min Value","number",t.min||0,r=>s("min",parseInt(r,10))),this.addLabeledInput("Max Value","number",t.max||100,r=>s("max",parseInt(r,10))),this.addLabeledInput("Preview Value","number",t.value||50,r=>s("value",parseInt(r,10))),this.addColorMixer("Bar Color",t.color||"black",r=>s("color",r)),this.addColorMixer("Background Color",t.bg_color||"gray",r=>s("bg_color",r)),this.addLabeledInput("Start Value","number",t.start_value||0,r=>s("start_value",parseInt(r,10))),this.addSelect("Mode",t.mode||"NORMAL",["NORMAL","SYMMETRICAL","REVERSE"],r=>s("mode",r)),this.addCheckbox("Range Mode",t.range_mode||!1,r=>s("range_mode",r))):i==="lvgl_slider"?(this.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",r=>{g.updateWidget(e.id,{entity_id:r})},e),this.addHint("Controls this entity number/level"),this.addSegmentedControl("Orientation",[{value:"Horizontal",label:"Horiz",icon:"mdi-arrow-left-right"},{value:"Vertical",label:"Vert",icon:"mdi-arrow-up-down"}],t.vertical?"Vertical":"Horizontal",r=>{const a=r==="Vertical",l=e.width,c=e.height;g.updateWidget(e.id,{props:{...t,vertical:a},width:c,height:l})}),this.addCompactPropertyRow(()=>{this.addLabeledInput("Min","number",t.min||0,r=>s("min",parseInt(r,10))),this.addLabeledInput("Max","number",t.max||100,r=>s("max",parseInt(r,10)))}),this.addNumberWithSlider("Value",t.value||30,t.min||0,t.max||100,r=>s("value",r)),this.addColorMixer("Knob/Bar Color",t.color||"black",r=>s("color",r)),this.addColorMixer("Track Color",t.bg_color||"gray",r=>s("bg_color",r)),this.addLabeledInput("Border Width","number",t.border_width||2,r=>s("border_width",parseInt(r,10))),this.addSelect("Mode",t.mode||"NORMAL",["NORMAL","SYMMETRICAL","REVERSE"],r=>s("mode",r))):i==="lvgl_tabview"?(this.addLabeledInput("Tabs (comma separated)","text",(t.tabs||[]).join(", "),r=>{const a=r.split(",").map(l=>l.trim()).filter(l=>l);s("tabs",a)}),this.addColorMixer("Background Color",t.bg_color||"white",r=>s("bg_color",r))):i==="lvgl_tileview"?(this.addHint("Tiles are currently configured via YAML or advanced properties."),this.addColorMixer("Background Color",t.bg_color||"white",r=>s("bg_color",r))):i==="lvgl_led"?(this.addColorMixer("Color",t.color||"red",r=>s("color",r)),this.addLabeledInput("Brightness (0-255)","number",t.brightness||255,r=>s("brightness",parseInt(r,10)))):i==="lvgl_spinner"?(this.addLabeledInput("Spin Time (ms)","number",t.spin_time||1e3,r=>s("spin_time",parseInt(r,10))),this.addLabeledInput("Arc Length (deg)","number",t.arc_length||60,r=>s("arc_length",parseInt(r,10))),this.addColorMixer("Arc Color",t.arc_color||"blue",r=>s("arc_color",r)),this.addColorMixer("Track Color",t.track_color||"white",r=>s("track_color",r))):i==="lvgl_buttonmatrix"?(this.addHint("Edit rows via YAML or simple comma-separated lists per row."),t.rows):i==="lvgl_checkbox"?(this.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",r=>{g.updateWidget(e.id,{entity_id:r})},e),this.addHint("Toggle input_boolean when tapped"),this.addLabeledInput("Label","text",t.text||"Checkbox",r=>s("text",r)),this.addCheckbox("Checked",t.checked||!1,r=>s("checked",r)),this.addColorMixer("Color",t.color||"blue",r=>s("color",r))):i==="lvgl_dropdown"?(this.addLabeledInput("Options (one per line)","textarea",t.options||"",r=>s("options",r)),this.addCompactPropertyRow(()=>{this.addLabeledInput("Index","number",t.selected_index||0,r=>s("selected_index",parseInt(r,10))),this.addLabeledInput("Max H","number",t.max_height||200,r=>s("max_height",parseInt(r,10)))}),this.addSegmentedControl("Direction",[{value:"DOWN",icon:"mdi-arrow-down"},{value:"UP",icon:"mdi-arrow-up"},{value:"LEFT",icon:"mdi-arrow-left"},{value:"RIGHT",icon:"mdi-arrow-right"}],t.direction||"DOWN",r=>s("direction",r)),this.addColorMixer("Color",t.color||"white",r=>s("color",r))):i==="lvgl_keyboard"?(this.addSelect("Mode",t.mode||"TEXT_UPPER",["TEXT_LOWER","TEXT_UPPER","SPECIAL","NUMBER"],r=>s("mode",r)),this.addLabeledInput("Textarea ID Link","text",t.textarea_id||"",r=>s("textarea_id",r))):i==="lvgl_roller"?(this.addLabeledInput("Options (one per line)","textarea",t.options||"",r=>s("options",r)),this.addLabeledInput("Visible Rows","number",t.visible_row_count||3,r=>s("visible_row_count",parseInt(r,10))),this.addColorMixer("Color",t.color||"white",r=>s("color",r)),this.addColorMixer("Background Color",t.bg_color||"black",r=>s("bg_color",r)),this.addColorMixer("Selected BG Color",t.selected_bg_color||"blue",r=>s("selected_bg_color",r)),this.addColorMixer("Selected Text Color",t.selected_text_color||"white",r=>s("selected_text_color",r)),this.addSelect("Mode",t.mode||"NORMAL",["NORMAL","INFINITE"],r=>s("mode",r))):i==="lvgl_spinbox"?(this.addLabeledInput("Min","number",t.min||0,r=>s("min",parseInt(r,10))),this.addLabeledInput("Max","number",t.max||100,r=>s("max",parseInt(r,10))),this.addLabeledInput("Value","number",t.value||0,r=>s("value",parseInt(r,10))),this.addLabeledInput("Digits","number",t.digit_count||4,r=>s("digit_count",parseInt(r,10))),this.addLabeledInput("Step","number",t.step||1,r=>s("step",parseInt(r,10)))):i==="lvgl_switch"?(this.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",r=>{g.updateWidget(e.id,{entity_id:r})},e),this.addHint("Toggle switch/light/input_boolean when tapped"),this.addCheckbox("Checked",t.checked||!1,r=>s("checked",r)),this.addColorMixer("Indicator Color",t.color||"blue",r=>s("color",r)),this.addColorMixer("Background Color",t.bg_color||"gray",r=>s("bg_color",r)),this.addColorMixer("Knob Color",t.knob_color||"white",r=>s("knob_color",r))):i==="lvgl_textarea"?(this.addLabeledInput("Placeholder","text",t.placeholder||"",r=>s("placeholder",r)),this.addLabeledInput("Text","text",t.text||"",r=>s("text",r)),this.addCheckbox("One Line",t.one_line||!1,r=>s("one_line",r)),this.addCheckbox("Password Mode",t.password_mode||!1,r=>s("password_mode",r)),this.addLabeledInput("Accepted Chars","text",t.accepted_chars||"",r=>s("accepted_chars",r)),this.addLabeledInput("Max Length","number",t.max_length||0,r=>s("max_length",parseInt(r,10)))):i==="lvgl_obj"&&(this.addColorMixer("Color",t.color||"white",r=>s("color",r)),this.addLabeledInput("Border Width","number",t.border_width||1,r=>s("border_width",parseInt(r,10))),this.addColorMixer("Border Color",t.border_color||"gray",r=>s("border_color",r)),this.addLabeledInput("Radius","number",t.radius||0,r=>s("radius",parseInt(r,10))));this.endSection()}}addCommonLVGLProperties(e,i){const o=(r,a)=>{const l={...e.props,[r]:a};g.updateWidget(e.id,{props:l})};this.createSection("Common LVGL",!1);const t=document.createElement("div");t.style.display="grid",t.style.gridTemplateColumns="1fr 1fr",t.style.gap="4px",this.getContainer().appendChild(t);const s=(r,a,l=!1)=>{const c=document.createElement("div"),d=document.createElement("input");d.type="checkbox",d.checked=i[a]!==void 0?i[a]:l,d.addEventListener("change",()=>o(a,d.checked));const p=document.createElement("span");p.textContent=" "+r,p.style.fontSize="10px",c.appendChild(d),c.appendChild(p),t.appendChild(c)};s("Hidden","hidden",!1),s("Clickable","clickable",!0),s("Checkable","checkable",!1),s("Scrollable","scrollable",!0),s("Floating","floating",!1),s("Ignore Layout","ignore_layout",!1),this.addSelect("Scrollbar Mode",i.scrollbar_mode||"AUTO",["AUTO","ON","OFF","ACTIVE"],r=>o("scrollbar_mode",r)),this.endSection()}addNumberWithSlider(e,i,o,t,s){const r=document.createElement("div");r.className="field";const a=document.createElement("div");a.className="prop-label",a.textContent=e;const l=document.createElement("div");l.className="slider-hybrid";const c=i===ue,d=document.createElement("input");d.type="range",d.min=o,d.max=t,d.value=c?o:i;const p=document.createElement("input");p.className="prop-input",p.type="number",p.value=c?"":i,p.min=o,p.max=t,c&&(p.placeholder="Mixed"),d.addEventListener("input",()=>{c&&(p.placeholder=""),p.value=d.value,s(parseInt(d.value,10))}),p.addEventListener("input",()=>{d.value=p.value,s(parseInt(p.value,10))}),l.appendChild(d),l.appendChild(p),r.appendChild(a),r.appendChild(l),this.getContainer().appendChild(r)}addSegmentedControl(e,i,o,t){const s=document.createElement("div");s.className="field";const r=document.createElement("div");r.className="prop-label",r.textContent=e;const a=document.createElement("div");a.className="segmented-control",i.forEach(l=>{const c=document.createElement("div");c.className="segment-item"+(l.value===o?" active":""),c.title=l.label||l.value,l.icon?c.innerHTML=`< i class="mdi ${l.icon}" ></i > `:c.textContent=l.label||l.value,c.onclick=()=>{a.querySelectorAll(".segment-item").forEach(d=>d.classList.remove("active")),c.classList.add("active"),t(l.value)},a.appendChild(c)}),s.appendChild(r),s.appendChild(a),this.getContainer().appendChild(s)}addCompactPropertyRow(e){const i=document.createElement("div");i.className="prop-grid-2",this.getContainer().appendChild(i),this.containerStack.push(i),e(),this.containerStack.pop()}addLabeledInput(e,i,o,t){const s=document.createElement("div");s.className="field";const r=document.createElement("div");r.className="prop-label",r.textContent=e;const a=o===ue;let l;i==="textarea"?(l=document.createElement("textarea"),l.className="prop-input",l.style.minHeight="60px",l.style.resize="vertical",l.style.fontFamily="inherit",l.value=a?"":o||"",a&&(l.placeholder="Mixed Values")):(l=document.createElement("input"),l.className="prop-input",l.type=i,l.value=a?"":o,a&&(l.placeholder="Mixed",l.style.fontStyle="italic",l.style.color="#888")),l.addEventListener("input",()=>{a&&(l.style.fontStyle="normal",l.style.color="inherit"),t(l.value)}),l.addEventListener("change",()=>{t(l.value)}),s.appendChild(r),s.appendChild(l),this.getContainer().appendChild(s)}addSelect(e,i,o,t){const s=document.createElement("div");s.className="field";const r=document.createElement("div");r.className="prop-label",r.textContent=e;const a=document.createElement("select");a.className="prop-input";const l=i===ue;if(l){const c=document.createElement("option");c.value=ue,c.textContent="(Mixed)",c.selected=!0,c.disabled=!0,a.appendChild(c)}o.forEach(c=>{const d=document.createElement("option");typeof c=="object"&&c!==null?(d.value=c.value,d.textContent=c.label,!l&&String(c.value)===String(i)&&(d.selected=!0)):(d.value=c,d.textContent=c,!l&&String(c)===String(i)&&(d.selected=!0)),a.appendChild(d)}),a.addEventListener("change",()=>t(a.value)),s.appendChild(r),s.appendChild(a),this.getContainer().appendChild(s)}addPageSelector(e,i,o){const t=g.project?.pages||[],s=[{value:"relative_prev",label:"« Previous (Automatic)"},{value:"relative_next",label:"Next (Automatic) »"},{value:"home",label:"🏠 Home / Dashboard"}];t.forEach((r,a)=>{s.push({value:a.toString(),label:`Page ${a+1}: ${r.name||"Untitled"}`})}),this.addSelect(e,i,s,o)}addDropShadowButton(e,i){const o=document.createElement("div");o.className="field",o.style.marginTop="8px";const t=document.createElement("button");t.className="btn btn-secondary btn-full btn-xs",t.innerHTML='<span class="mdi mdi-box-shadow"></span> Create Drop Shadow',t.onclick=()=>{const s=g.selectedWidgetIds||[];s.includes(i)?g.createDropShadow(s):g.createDropShadow(i)},o.appendChild(t),e.appendChild(o)}addCheckbox(e,i,o){const t=document.createElement("div");t.className="field",t.style.marginBottom="8px";const s=document.createElement("label");s.style.display="flex",s.style.alignItems="center",s.style.gap="8px",s.style.fontSize="13px",s.style.cursor="pointer";const r=document.createElement("input");r.type="checkbox",i===ue?r.indeterminate=!0:r.checked=!!i,r.style.width="16px",r.style.height="16px",r.style.margin="0",r.style.cursor="pointer",r.addEventListener("change",()=>{r.indeterminate=!1,o(r.checked)});const l=document.createElement("span");l.textContent=e,s.appendChild(r),s.appendChild(l),t.appendChild(s),this.getContainer().appendChild(t)}addHint(e){const i=document.createElement("div");i.style.fontSize="11px",i.style.color="#666",i.style.marginTop="4px",i.style.marginBottom="12px",i.style.lineHeight="1.4",i.innerHTML=e,this.getContainer().appendChild(i)}addLabeledInputWithDataList(e,i,o,t,s){const r=document.createElement("div");r.className="field";const a=document.createElement("div");a.className="prop-label",a.textContent=e;const l="datalist_"+Math.random().toString(36).substr(2,9),c=document.createElement("datalist");c.id=l,t.forEach(p=>{const h=document.createElement("option");h.value=p,c.appendChild(h)});const d=document.createElement("input");d.className="prop-input",d.type=i,d.value=o,d.setAttribute("list",l),d.addEventListener("input",()=>s(d.value)),d.addEventListener("change",()=>s(d.value)),r.appendChild(a),r.appendChild(d),r.appendChild(c),this.getContainer().appendChild(r)}addSectionLabel(e){const i=document.createElement("div");i.className="sidebar-section-label",i.textContent=e,this.getContainer().appendChild(i)}autoPopulateTitleFromEntity(e,i){!i||!window.AppState||typeof Le=="function"&&Le().then(o=>{if(!o||o.length===0)return;const t=o.find(s=>s.entity_id===i);if(t&&t.name){const s=g.getSelectedWidget();s&&s.id===e&&!s.title&&g.updateWidget(e,{title:t.name})}}).catch(()=>{})}addVisibilityConditions(e){e.condition_entity=e.condition_entity||"",e.condition_operator=e.condition_operator||"==",e.condition_state=e.condition_state||"",e.condition_min=e.condition_min||"",e.condition_max=e.condition_max||"";const i=document.createElement("div");i.className="field",i.style.fontSize="9px",i.style.color="#9499a6",i.style.marginBottom="6px",i.innerHTML="Show/hide this widget based on an entity's state.",this.getContainer().appendChild(i),this.addLabeledInputWithPicker("Condition Entity","text",e.condition_entity,a=>{g.updateWidget(e.id,{condition_entity:a})},e);const o=["==","!=","<",">","<=",">="];this.addSelect("Operator",e.condition_operator,o,a=>{g.updateWidget(e.id,{condition_operator:a})});const t=["on","off","open","closed","true","false","home","not_home","locked","unlocked","active","inactive","detected","clear","occupied"];this.addLabeledInputWithDataList("Condition State","text",e.condition_state,t,a=>{g.updateWidget(e.id,{condition_state:a})}),this.addLabeledInput("Min Value (Range)","text",e.condition_min,a=>{g.updateWidget(e.id,{condition_min:a})}),this.addLabeledInput("Max Value (Range)","text",e.condition_max,a=>{g.updateWidget(e.id,{condition_max:a})});const s=document.createElement("div");s.className="field",s.style.marginTop="8px";const r=document.createElement("button");r.className="btn btn-secondary btn-full",r.textContent="Clear Condition",r.type="button",r.addEventListener("click",()=>{g.updateWidget(e.id,{condition_entity:"",condition_operator:"==",condition_state:"",condition_min:"",condition_max:""})}),s.appendChild(r),this.getContainer().appendChild(s)}addLabeledInputWithIconPicker(e,i,o,t,s){const r=document.createElement("div");r.className="field";const a=document.createElement("div");a.className="prop-label",a.textContent=e;const l=document.createElement("div");l.style.display="flex",l.style.gap="4px",l.style.flex="1";const c=document.createElement("input");c.className="prop-input",c.type=i,c.value=o,c.style.flex="1",c.onchange=p=>t(p.target.value),c.oninput=p=>t(p.target.value);const d=document.createElement("button");d.className="btn btn-secondary",d.innerHTML='<span class="mdi mdi-emoticon-outline"></span>',d.title="Pick MDI Icon",d.style.minWidth="32px",d.style.padding="0 8px",d.onclick=()=>{Pt(s,c)},l.appendChild(c),l.appendChild(d),r.appendChild(a),r.appendChild(l),this.getContainer().appendChild(r)}addLabeledInputWithPicker(e,i,o,t,s){const r=document.createElement("div");r.className="field";const a=document.createElement("div");a.className="prop-label",a.textContent=e;const l=document.createElement("div");l.style.display="flex",l.style.gap="4px";const c=document.createElement("input");c.className="prop-input",c.type=i,c.value=o,c.style.flex="1",c.placeholder="Start typing or click ▼ to pick...",c.autocomplete="off",c.setAttribute("list",Rt),yo(),c.addEventListener("input",()=>t(c.value));const d=document.createElement("button");d.className="btn btn-secondary",d.innerHTML="▼",d.style.padding="4px 8px",d.style.fontSize="10px",d.style.minWidth="32px",d.type="button",d.title="Browse all entities",d.addEventListener("click",()=>{gl(s,c,p=>{c.value=p,t(p)})}),l.appendChild(c),l.appendChild(d),r.appendChild(a),r.appendChild(l),this.getContainer().appendChild(r)}addIconPicker(e,i,o,t){const s=window.iconPickerData||[],r=document.createElement("div");r.className="field";const a=document.createElement("div");a.className="prop-label",a.textContent=e,r.appendChild(a);const l=document.createElement("select");l.className="select",l.style.fontFamily="MDI, monospace, system-ui",l.style.fontSize="16px",l.style.lineHeight="1.5",l.style.width="100%",l.style.marginBottom="4px";const c=document.createElement("option");c.value="",c.textContent="-- Quick visual picker --",c.style.fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif",l.appendChild(c);const d=(i||"").replace("mdi:","").toUpperCase();s.forEach(y=>{const f=document.createElement("option");f.value=y.code;const _=983040+parseInt(y.code.slice(1),16),v=String.fromCodePoint(_);f.textContent=v+"  "+y.code+(y.name?` (${y.name})`:""),f.style.fontFamily="MDI, monospace, system-ui",y.code===d&&(f.selected=!0),l.appendChild(f)}),l.addEventListener("change",()=>{l.value&&(h.value=l.value,o(l.value))}),r.appendChild(l);const p=document.createElement("div");p.style.display="flex",p.style.gap="4px";const h=document.createElement("input");h.className="prop-input",h.type="text",h.placeholder="MDI Hex (Fxxxx)",h.value=d,h.style.flex="1",h.style.fontFamily="monospace",h.addEventListener("input",()=>{const y=(h.value||"").trim().toUpperCase().replace(/^0X/,"").replace(/^MDI:/,"");/^F[0-9A-F]{4}$/i.test(y)?(o(y),Array.from(l.options).find(_=>_.value===y)?l.value=y:l.value=""):y===""&&(o(""),l.value="")}),p.appendChild(h);const u=document.createElement("button");u.className="btn btn-secondary",u.textContent="★",u.style.padding="4px 8px",u.style.fontSize="14px",u.type="button",u.title="Open full icon browser",u.addEventListener("click",()=>{Pt(t,h)}),p.appendChild(u),r.appendChild(p);const m=document.createElement("div");m.className="prop-hint",m.innerHTML='Browse <a href="https://pictogrammers.com/library/mdi/icon/" target="_blank" style="color: #03a9f4; text-decoration: none;">Pictogrammers MDI</a>',r.appendChild(m),this.getContainer().appendChild(r)}addIconInput(e,i,o,t){const s=document.createElement("div");s.className="field";const r=document.createElement("div");r.className="prop-label",r.textContent=e;const a=document.createElement("div");a.style.display="flex",a.style.gap="4px";const l=document.createElement("input");l.className="prop-input",l.type="text",l.value=i,l.style.flex="1",l.addEventListener("input",()=>o(l.value));const c=document.createElement("button");c.className="btn btn-secondary",c.textContent="★",c.style.padding="4px 8px",c.style.fontSize="14px",c.type="button",c.addEventListener("click",()=>{Pt(t,l)}),a.appendChild(l),a.appendChild(c),s.appendChild(r),s.appendChild(a),this.getContainer().appendChild(s)}addColorSelector(e,i,o,t){typeof isRGBDevice=="function"&&isRGBDevice()?this.addColorMixer(e,i,t):this.addSelect(e,i,o,t)}addColorMixer(e,i,o){const t=document.createElement("div");t.className="field",t.style.marginBottom="10px";const s=document.createElement("div");s.className="prop-label",s.textContent=e,t.appendChild(s);let r=0,a=0,l=0,c="#000000";const d=P=>{const A={black:"#000000",white:"#FFFFFF",red:"#FF0000",green:"#00FF00",blue:"#0000FF",yellow:"#FFFF00",gray:"#808080",grey:"#808080"};return P?A[P.toLowerCase()]?A[P.toLowerCase()]:P.startsWith("0x")?"#"+P.substring(2):P.startsWith("#")?P:"#000000":"#000000"},p=P=>{const A=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(P);return A?{r:parseInt(A[1],16),g:parseInt(A[2],16),b:parseInt(A[3],16)}:{r:0,g:0,b:0}},h=(P,A,j)=>{const N=H=>{const B=Math.max(0,Math.min(255,H)).toString(16);return B.length===1?"0"+B:B};return"#"+N(P)+N(A)+N(j)},u=i===ue;c=u?"":d(i);const m=p(u?"#000000":c);r=m.r,a=m.g,l=m.b;const y=document.createElement("div");y.style.background="var(--bg)",y.style.padding="8px",y.style.borderRadius="6px",y.style.border="1px solid var(--border-subtle)";const f=document.createElement("div");f.style.display="flex",f.style.alignItems="center",f.style.marginBottom="8px",f.style.gap="8px";const _=document.createElement("div");_.style.width="24px",_.style.height="24px",_.style.borderRadius="4px",_.style.border="1px solid #ccc",u?(_.style.background="linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",_.style.backgroundSize="8px 8px",_.style.backgroundPosition="0 0, 0 4px, 4px -4px, -4px 0px",_.style.backgroundColor="white"):_.style.backgroundColor=c;const v=document.createElement("input");v.type="text",v.className="prop-input",v.style.flex="1",v.style.textTransform="uppercase",v.value=u?"":c,u&&(v.placeholder="Mixed Colors"),f.appendChild(_),f.appendChild(v),y.appendChild(f);const S=(P,A,j)=>{const N=document.createElement("div");N.style.display="flex",N.style.alignItems="center",N.style.marginBottom="4px",N.style.fontSize="11px";const H=document.createElement("span");H.textContent=P,H.style.width="15px",H.style.fontWeight="bold",H.style.color="var(--text)";const B=document.createElement("input");B.type="range",B.min="0",B.max="255",B.value=A,B.style.flex="1",B.style.marginLeft="4px",B.style.accentColor=j;const $=document.createElement("span");return $.textContent=A,$.style.width="25px",$.style.textAlign="right",$.style.marginLeft="4px",$.style.color="var(--muted)",N.appendChild(H),N.appendChild(B),N.appendChild($),{row:N,slider:B,valLbl:$}},w=S("R",r,"red"),E=S("G",a,"green"),x=S("B",l,"blue");y.appendChild(w.row),y.appendChild(E.row),y.appendChild(x.row),t.appendChild(y),this.getContainer().appendChild(t);const I=()=>{r=parseInt(w.slider.value),a=parseInt(E.slider.value),l=parseInt(x.slider.value),w.valLbl.textContent=r,E.valLbl.textContent=a,x.valLbl.textContent=l;const P=h(r,a,l).toUpperCase();v.value=P,_.style.backgroundColor=P,o(P)},k=()=>{let P=v.value.trim();if(P.startsWith("#")||(P="#"+P),/^#[0-9A-F]{6}$/i.test(P)){const A=p(P);r=A.r,a=A.g,l=A.b,w.slider.value=r,w.valLbl.textContent=r,E.slider.value=a,E.valLbl.textContent=a,x.slider.value=l,x.valLbl.textContent=l,_.style.backgroundColor=P,o(P)}};w.slider.addEventListener("input",I),E.slider.addEventListener("input",I),x.slider.addEventListener("input",I),v.addEventListener("input",k),v.addEventListener("change",k)}}function xl(n){const{name:e,chip:i,resWidth:o,resHeight:t,shape:s,psram:r,displayDriver:a,pins:l,touchTech:c}=n,d=[];d.push("# ============================================================================"),d.push(`# TARGET DEVICE: ${e}`),d.push(`# Name: ${e}`),d.push(`# Resolution: ${o}x${t}`),d.push(`# Shape: ${s}`),d.push("#");const h=["esp32-c3","esp32-c6","esp8266"].some(v=>(i||"").toLowerCase().includes(v)),u=r&&!h;d.push(`#         - Display Platform: ${a||"Unknown"}`),d.push(`#         - Touchscreen: ${c||"None"}`),d.push(`#         - PSRAM: ${u?"Yes":"No"}`),d.push("# ============================================================================"),d.push("#"),d.push("# SETUP INSTRUCTIONS:"),d.push("#"),d.push("# STEP 1: Copy the Material Design Icons font file"),d.push("#         - From this repo: font_ttf/font_ttf/materialdesignicons-webfont.ttf"),d.push("#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf"),d.push("#         (Create the fonts folder if it doesn't exist)"),d.push("#"),d.push("# STEP 2: Create a new device in ESPHome"),d.push('#         - Click "New Device"'),d.push("#         - Name: your-device-name"),i==="esp32"?(d.push("#         - Select: ESP32"),d.push("#         - Board: esp32dev (or specific board)"),d.push("#         - Framework: esp-idf (Recommended) or arduino")):i==="esp8266"?(d.push("#         - Select: ESP8266"),d.push("#         - Board: nodemcuv2 (or specific board)"),d.push("#         - Framework: arduino (Default)")):i==="esp32-c3"?(d.push("#         - Select: ESP32-C3"),d.push("#         - Board: esp32-c3-devkitm-1"),d.push("#         - Framework: esp-idf (Recommended) or arduino")):i==="esp32-c6"?(d.push("#         - Select: ESP32-C6"),d.push("#         - Board: esp32-c6-devkitc-1"),d.push("#         - Framework: esp-idf (Recommended)")):(d.push("#         - Select: ESP32-S3"),d.push("#         - Board: esp32-s3-devkitc-1"),d.push("#         - Framework: esp-idf (Recommended) or arduino")),d.push("#"),d.push("# ============================================================================"),d.push(""),d.push("# Infrastructure (Comment out if pasting into existing config)"),d.push("# esphome: # (Auto-commented)"),d.push(`#   name: ${e.toLowerCase().replace(/[^a-z0-9]/g,"-")}`),d.push("#"),i==="esp8266"?d.push("# esp8266: # (Auto-commented)"):d.push("# esp32: # (Auto-commented)"),d.push(`#   board: ${wl(i)}`),i!=="esp8266"&&(d.push("#   framework:"),d.push("#     type: esp-idf")),u&&i.includes("s3")&&(d.push("#     # For stability on S3 devices with high-res displays/LVGL:"),d.push("#     advanced:"),d.push("#       execute_from_psram: true")),d.push(""),u&&(d.push("# psram: # (Auto-commented)"),i.includes("s3")&&(d.push("#   # Quad or Octal depending on your board"),d.push("#   mode: quad"),d.push("#   speed: 80MHz")),d.push("")),l.clk&&l.mosi&&(d.push("spi:"),d.push(`  clk_pin: ${l.clk}`),d.push(`  mosi_pin: ${l.mosi}`),l.miso&&d.push(`  miso_pin: ${l.miso}`),d.push("")),l.sda&&l.scl&&(d.push("i2c:"),d.push(`  sda: ${l.sda}`),d.push(`  scl: ${l.scl}`),d.push("  scan: true"),d.push("")),d.push("display:"),d.push(`  - platform: ${a}`),l.cs&&d.push(`    cs_pin: ${l.cs}`),l.dc&&d.push(`    dc_pin: ${l.dc}`),l.rst&&d.push(`    reset_pin: ${l.rst}`),l.busy&&d.push(`    busy_pin: ${l.busy}`),n.displayModel&&d.push(`    model: "${n.displayModel}"`),a==="st7789v"&&!n.displayModel?(d.push("    model: Custom"),d.push("    id: my_display"),d.push(`    width: ${o}`),d.push(`    height: ${t}`),d.push("    offset_height: 0"),d.push("    offset_width: 0")):a==="st7789v"&&(d.push("    id: my_display"),d.push(`    width: ${o}`),d.push(`    height: ${t}`));const m=t>o,y=n.orientation==="portrait"||n.orientation==="portrait_inverted",f=n.orientation==="landscape_inverted"||n.orientation==="portrait_inverted";let _=0;if(m?_=y?0:90:_=y?90:0,f&&(_=(_+180)%360),d.push(`    rotation: ${_}`),d.push("    lambda: |-"),d.push("      # __LAMBDA_PLACEHOLDER__"),d.push(""),l.backlight){const v=n.backlightMinPower??.07,S=n.backlightInitial??.8,w=!!n.antiburn;d.push("output:"),d.push("  - platform: ledc"),d.push(`    pin: ${l.backlight}`),d.push("    id: backlight_brightness_output"),d.push(`    min_power: "${v}"`),d.push("    zero_means_zero: true"),d.push(""),d.push("light:"),d.push("  - platform: monochromatic"),d.push("    output: backlight_brightness_output"),d.push("    id: display_backlight"),d.push("    name: LCD Backlight"),d.push("    icon: mdi:wall-sconce-flat-outline"),d.push("    restore_mode: ALWAYS_ON"),d.push("    initial_state:"),d.push(`      brightness: "${S}"`),w&&(d.push("    on_turn_off:"),d.push("      - script.execute: start_antiburn"),d.push("    on_turn_on:"),d.push("      - script.execute: stop_antiburn")),d.push(""),w&&(d.push("script:"),d.push("  - id: start_antiburn"),d.push("    then:"),d.push("      - delay: 5min"),d.push("      - logger.log: Starting automatic antiburn."),d.push("      - switch.turn_on: switch_antiburn"),d.push("  - id: stop_antiburn"),d.push("    then:"),d.push("      - script.stop: start_antiburn"),d.push("      - switch.turn_off: switch_antiburn"),d.push(""),d.push("switch:"),d.push("  - platform: template"),d.push("    name: Antiburn"),d.push("    id: switch_antiburn"),d.push("    icon: mdi:television-shimmer"),d.push("    optimistic: true"),d.push("    entity_category: config"),d.push("    turn_on_action:"),d.push('      - logger.log: "Starting Antiburn"'),d.push("      - if:"),d.push("          condition: lvgl.is_paused"),d.push("          then:"),d.push("            - lvgl.resume:"),d.push("            - lvgl.widget.redraw:"),d.push("      - lvgl.pause:"),d.push("          show_snow: true"),d.push("    turn_off_action:"),d.push('      - logger.log: "Stopping Antiburn"'),d.push("      - if:"),d.push("          condition: lvgl.is_paused"),d.push("          then:"),d.push("            - lvgl.resume:"),d.push("            - lvgl.widget.redraw:"),d.push(""))}return c!=="none"&&(d.push("touchscreen:"),d.push(`  - platform: ${c}`),l.touch_int&&d.push(`    interrupt_pin: ${l.touch_int}`),l.touch_rst&&d.push(`    reset_pin: ${l.touch_rst}`),d.push("    on_release:"),d.push("      - if:"),d.push("          condition: lvgl.is_paused"),d.push("          then:"),d.push("            - lvgl.resume:"),d.push("            - lvgl.widget.redraw:"),d.push("            - light.turn_on: display_backlight"),d.push("")),d.join(`
`)}function wl(n){switch(n){case"esp32-s3":return"esp32-s3-devkitc-1";case"esp32-c3":return"esp32-c3-devkitm-1";case"esp32-c6":return"esp32-c6-devkitc-1";case"esp32":return"esp32dev";case"esp8266":return"nodemcuv2";default:return"esp32-s3-devkitc-1"}}class Sl{constructor(){b.log("[DeviceSettings] Constructor called - Instance ID check"),this.modal=document.getElementById("deviceSettingsModal"),this.closeBtn=document.getElementById("deviceSettingsClose"),this.saveBtn=document.getElementById("deviceSettingsSave"),this.nameInput=document.getElementById("deviceName"),this.modelInput=document.getElementById("deviceModel"),this.orientationInput=document.getElementById("deviceOrientation"),this.darkModeInput=document.getElementById("deviceDarkMode"),this.invertedColorsInput=document.getElementById("deviceInvertedColors"),this.modeStandard=document.getElementById("mode-standard"),this.modeSleep=document.getElementById("setting-sleep-enabled"),this.modeManual=document.getElementById("setting-manual-refresh"),this.modeDeepSleep=document.getElementById("setting-deep-sleep-enabled"),this.modeDaily=document.getElementById("setting-daily-refresh-enabled"),this.sleepStart=document.getElementById("setting-sleep-start"),this.sleepEnd=document.getElementById("setting-sleep-end"),this.sleepRow=document.getElementById("sleep-times-row"),this.dailyRefreshTime=document.getElementById("setting-daily-refresh-time"),this.dailyRefreshRow=document.getElementById("daily-refresh-row"),this.deepSleepInterval=document.getElementById("setting-deep-sleep-interval"),this.deepSleepRow=document.getElementById("deep-sleep-interval-row"),this.refreshIntervalInput=document.getElementById("setting-refresh-interval"),this.refreshIntervalRow=document.getElementById("global-refresh-row"),this.noRefreshStart=document.getElementById("setting-no-refresh-start"),this.noRefreshEnd=document.getElementById("setting-no-refresh-end"),this.dimTimeoutInput=document.getElementById("setting-dim-timeout"),this.dimTimeoutRow=document.getElementById("dim-timeout-row"),this.autoCycleEnabled=document.getElementById("setting-auto-cycle"),this.autoCycleInterval=document.getElementById("setting-auto-cycle-interval"),this.autoCycleRow=document.getElementById("field-auto-cycle-interval"),this.customHardwareSection=document.getElementById("customHardwareSection"),this.customFieldsContainer=this.customHardwareSection,this.customChip=document.getElementById("customChip"),this.customTech=document.getElementById("customTech"),this.customResPreset=document.getElementById("customResPreset"),this.customRes=document.getElementById("customRes"),this.customShape=document.getElementById("customShape"),this.customPsram=document.getElementById("customPsram"),this.customDisplayDriver=document.getElementById("customDisplayDriver"),this.customDisplayModel=document.getElementById("customDisplayModel"),this.customDisplayModelField=document.getElementById("customDisplayModelField"),this.customTouchTech=document.getElementById("customTouchTech"),this.touchPinsGrid=document.getElementById("touchPinsGrid"),this.customProfileNameInput=document.getElementById("customProfileName"),this.strategyEpaperGroup=document.getElementById("strategy-epaper-group"),this.strategyLcdGroup=document.getElementById("strategy-lcd-group"),this.renderingModeInput=document.getElementById("renderingMode"),this.renderingModeField=document.getElementById("renderingModeField"),this.oeplSettingsSection=document.getElementById("oeplSettingsSection"),this.oeplEntityIdInput=document.getElementById("oeplEntityId"),this.oeplDitherInput=document.getElementById("oeplDither"),this.odpSettingsSection=document.getElementById("odpSettingsSection"),this.odpEntityIdInput=document.getElementById("opendisplayEntityId"),this.odpDitherInput=document.getElementById("opendisplayDither"),this.odpTtlInput=document.getElementById("opendisplayTtl"),this.protocolHardwareSection=document.getElementById("protocolHardwareSection"),this.protocolResPreset=document.getElementById("protocolResPreset"),this.protocolWidth=document.getElementById("protocolWidth"),this.protocolHeight=document.getElementById("protocolHeight"),this.protocolColorMode=document.getElementById("protocolColorMode"),this.deviceModelField=document.getElementById("deviceModelField"),this.powerStrategySection=document.getElementById("powerStrategySection"),this.deviceInvertedColorsField=document.getElementById("deviceInvertedColorsField")}init(){this.closeBtn&&this.closeBtn.addEventListener("click",()=>this.close());const e=document.getElementById("reloadHardwareBtn");e&&e.addEventListener("click",async t=>{t.preventDefault(),await this.reloadHardwareProfiles()}),document.querySelectorAll(".clear-pin-btn").forEach(t=>{t.addEventListener("click",s=>{s.preventDefault();const r=t.getAttribute("data-target"),a=document.getElementById(r);a&&(a.value="",a.dispatchEvent(new Event("input",{bubbles:!0})))})});const i=document.getElementById("importHardwareBtn"),o=document.getElementById("hardwareFileInput");i&&o&&(i.addEventListener("click",t=>{t.preventDefault(),o.click()}),o.addEventListener("change",async t=>{if(t.target.files.length>0){const s=t.target.files[0];try{await Bn(s)}catch{}o.value=""}})),this.populateDeviceSelect(),this.saveBtn&&this.saveBtn.addEventListener("click",()=>this.close()),this.setupAutoSaveListeners(),this.setupCustomHardwareListeners(),this.setupProtocolHardwareListeners()}setupCustomHardwareListeners(){if(!this.modelInput)return;this.modelInput.addEventListener("change",()=>{this.updateCustomSectionVisibility()}),this.customTech&&this.customTech.addEventListener("change",()=>{this.updateStrategyGroupVisibility()}),this.customChip&&this.customChip.addEventListener("change",()=>{this.updatePinDatalist()}),this.customDisplayDriver&&this.customDisplayDriver.addEventListener("change",()=>{this.updateDisplayModelVisibility()}),this.customTouchTech&&this.customTouchTech.addEventListener("change",()=>{this.touchPinsGrid&&(this.touchPinsGrid.style.display=this.customTouchTech.value==="none"?"none":"grid")}),this.customShape&&this.customShape.addEventListener("change",()=>{if(this.customShape.value==="round"&&this.customRes){const i=(this.customRes.value||"800x480").split("x"),o=parseInt(i[0])||480,t=parseInt(i[1])||480,s=Math.min(o,t);this.customRes.value=`${s}x${s}`,b.log(`[DeviceSettings] Auto-set square resolution for round display: ${s}x${s}`),this.customResPreset&&(this.customResPreset.value="custom"),this.customRes.dispatchEvent(new Event("change"))}}),this.customResPreset&&this.customRes&&(this.customResPreset.addEventListener("change",()=>{const i=this.customResPreset.value;i!=="custom"&&(this.customRes.value=i,b.log(`[DeviceSettings] Applied resolution preset: ${i}`),this.customRes.dispatchEvent(new Event("change")))}),this.customRes.addEventListener("input",()=>{const i=this.customRes.value;Array.from(this.customResPreset.options).some(t=>t.value===i)?this.customResPreset.value=i:this.customResPreset.value="custom"}));const e=document.getElementById("saveCustomProfileBtn");if(e){const i=e.cloneNode(!0);e.parentNode.replaceChild(i,e),i.addEventListener("click",async o=>{o.preventDefault(),!this._isSavingProfile&&(b.log("[DeviceSettings] Save button clicked"),await this.handleSaveCustomProfile())})}else{const i=document.getElementById("deviceSettingsModal");i&&i.addEventListener("click",async o=>{if(o.target&&o.target.id==="saveCustomProfileBtn"){if(o.preventDefault(),this._isSavingProfile)return;b.log("[DeviceSettings] Save button clicked (Delegate)"),await this.handleSaveCustomProfile()}})}this.setupCustomHardwareAutoSave()}setupProtocolHardwareListeners(){const e=()=>{const i=parseInt(this.protocolWidth.value)||400,o=parseInt(this.protocolHeight.value)||300,t=this.protocolColorMode.value||"bw";g.updateProtocolHardware({width:i,height:o,colorMode:t})};this.protocolResPreset&&this.protocolResPreset.addEventListener("change",()=>{const i=this.protocolResPreset.value;if(i!=="custom"){const[o,t]=i.split("x").map(Number);this.protocolWidth.value=o,this.protocolHeight.value=t,e()}}),this.protocolWidth&&this.protocolWidth.addEventListener("input",e),this.protocolHeight&&this.protocolHeight.addEventListener("input",e),this.protocolColorMode&&this.protocolColorMode.addEventListener("change",e)}setupCustomHardwareAutoSave(){const e=[this.customChip,this.customTech,this.customResPreset,this.customRes,this.customShape,this.customPsram,this.customDisplayDriver,this.customDisplayModel,this.customTouchTech,"pin_cs","pin_dc","pin_rst","pin_busy","pin_clk","pin_mosi","pin_backlight","pin_sda","pin_scl","pin_touch_int","pin_touch_rst","pin_battery_adc","pin_battery_enable"],i=()=>{if(this.modelInput.value==="custom"){const o=this.getCustomHardwareConfig();g.setCustomHardware(o)}};e.forEach(o=>{const t=typeof o=="string"?document.getElementById(o):o;if(!t)return;const s=t.type==="checkbox"||t.tagName==="SELECT"?"change":"input";t.addEventListener(s,i)})}getCustomHardwareConfig(){const e=(this.customRes?.value||"800x480").split("x"),i=o=>{const t=document.getElementById(o);return t?t.value:""};return{chip:this.customChip?.value||"esp32-s3",tech:this.customTech?.value||"lcd",resWidth:parseInt(e[0])||800,resHeight:parseInt(e[1])||480,shape:this.customShape?.value||"rect",psram:this.customPsram?.checked??!0,displayDriver:this.customDisplayDriver?.value||"st7789v",displayModel:this.customDisplayModel?.value||"",touchTech:this.customTouchTech?.value||"none",backlightMinPower:parseFloat(i("customBacklightMinPower"))||.07,backlightInitial:parseFloat(i("customBacklightInitial"))||.8,antiburn:!!document.getElementById("customAntiburn")?.checked,pins:{cs:i("pin_cs"),dc:i("pin_dc"),rst:i("pin_rst"),busy:i("pin_busy"),clk:i("pin_clk"),mosi:i("pin_mosi"),backlight:i("pin_backlight"),sda:i("pin_sda"),scl:i("pin_scl"),touch_int:i("pin_touch_int"),touch_rst:i("pin_touch_rst"),batteryAdc:i("pin_battery_adc"),batteryEnable:i("pin_battery_enable")},orientation:this.orientationInput?.value||"landscape"}}updateCustomSectionVisibility(){if(!this.customHardwareSection)return;const e=this.renderingModeInput?this.renderingModeInput.value:g.settings.renderingMode||"direct",i=e==="oepl"||e==="opendisplay",o=this.modelInput&&this.modelInput.value==="custom";this.customHardwareSection.style.display=!i&&o?"block":"none",this.updateDisplayModelVisibility()}updateDisplayModelVisibility(){if(this.customDisplayModelField&&this.customDisplayDriver){const e=this.customDisplayDriver.value==="waveshare_epaper";this.customDisplayModelField.style.display=e?"block":"none"}}updatePinDatalist(){const e=this.customChip?.value||"esp32-s3";let i="gpio-pins-esp32s3";e==="esp32"?i="gpio-pins-esp32":e==="esp8266"&&(i="gpio-pins-esp8266"),["pin_cs","pin_dc","pin_rst","pin_busy","pin_clk","pin_mosi","pin_backlight","pin_sda","pin_scl","pin_touch_int","pin_touch_rst","pin_battery_adc","pin_battery_enable"].forEach(s=>{const r=document.getElementById(s);r&&r.setAttribute("list",i)});const t=["esp32-c3","esp32-c6","esp8266"];this.customPsram&&(t.some(r=>e.toLowerCase().includes(r))?(this.customPsram.checked=!1,this.customPsram.disabled=!0):this.customPsram.disabled=!1),b.log(`[DeviceSettings] Updated pin datalists to: ${i}`)}async handleSaveCustomProfile(){if(this._isSavingProfile)return;this._isSavingProfile=!0,this.saveDebounceTimer&&(clearTimeout(this.saveDebounceTimer),this.saveDebounceTimer=null),b.log("[DeviceSettings] handleSaveCustomProfile called (Auto-save blocked)");const e=document.getElementById("saveCustomProfileBtn"),i=e?e.textContent:"Save Profile";try{const o=this.customProfileNameInput?this.customProfileNameInput.value.trim():"";if(!o){M("Please enter a name for your custom profile first.","warning"),this.customProfileNameInput&&this.customProfileNameInput.focus();return}e&&(e.disabled=!0,e.textContent="Saving...");const t=(this.customRes?.value||"800x480").split("x"),s=h=>{const u=document.getElementById(h);return u?u.value:""},r={name:o,chip:this.customChip?.value||"esp32-s3",tech:this.customTech?.value||"lcd",resWidth:parseInt(t[0])||800,resHeight:parseInt(t[1])||480,shape:this.customShape?.value||"rect",psram:this.customPsram?.checked??!0,displayDriver:this.customDisplayDriver?.value||"st7789v",displayModel:this.customDisplayModel?.value||"",touchTech:this.customTouchTech?.value||"none",pins:{cs:s("pin_cs"),dc:s("pin_dc"),rst:s("pin_rst"),busy:s("pin_busy"),clk:s("pin_clk"),mosi:s("pin_mosi"),backlight:s("pin_backlight"),sda:s("pin_sda"),scl:s("pin_scl"),touch_int:s("pin_touch_int"),touch_rst:s("pin_touch_rst"),batteryAdc:s("pin_battery_adc"),batteryEnable:s("pin_battery_enable")},orientation:this.orientationInput?.value||"landscape"},a=xl(r),l=new Blob([a],{type:"text/yaml"}),c=`${o.toLowerCase().replace(/\s+/g,"_")}.yaml`,d=new File([l],c);M("Generating hardware recipe...","info");let p=!1;try{await Bn(d),p=!0}catch(h){const u=h.message||"";if(u.includes("Failed to fetch")||u.includes("NetworkError"))b.warn("[DeviceSettings] Upload network error (likely benign):",u),p=!0;else throw h}if(p){const u=`custom_${c.replace(".yaml","").replace(/-/g,"_").replace(/\./g,"_")}`;M("Reloading profile list...","info"),await this.reloadHardwareProfiles();let m=0;const y=10,f=async()=>{const _=window.DEVICE_PROFILES||R||{},v=Object.keys(_);b.log(`[DeviceSettings] Looking for '${u}' in ${v.length} profiles...`);const S=v.find(E=>E===u);if(S){this.modelInput.value=S,this.modelInput.dispatchEvent(new Event("change")),M(`Profile "${o}" created and loaded!`,"success");return}const w=v.find(E=>{const x=_[E];return x.name===o||x.name&&x.name.includes(o)});if(w){this.modelInput.value=w,this.modelInput.dispatchEvent(new Event("change")),M(`Profile "${o}" created and loaded!`,"success");return}m<y?(m++,b.log(`[DeviceSettings] Profile '${u}' not found (attempt ${m})...`),m===5&&await this.reloadHardwareProfiles(),setTimeout(f,800)):(b.error("[DeviceSettings] Failed to find newly created profile."),M("Profile created, but could not be auto-selected. Please click Reload.","warning"))};setTimeout(f,500)}}catch(o){b.error("Failed to save custom profile:",o),M("Failed to create profile: "+(o.message||"Unknown error"),"error")}finally{this._isSavingProfile=!1,e&&(e.disabled=!1,e.textContent=i)}}async reloadHardwareProfiles(){const e=document.getElementById("reloadHardwareBtn"),i=e?e.textContent:"";try{e&&(e.disabled=!0,e.textContent="⟳ Loading..."),M("Reloading hardware profiles...","info"),b.log("[DeviceSettings] Force reloading hardware profiles..."),await pn(),this.populateDeviceSelect(),this.modelInput&&this.modelInput.dispatchEvent(new Event("change"));const o=Object.keys(R||{}).length;M(`Reloaded ${o} hardware profiles successfully!`,"success"),b.log("[DeviceSettings] Hardware profiles reloaded, dropdown refreshed")}catch(o){b.error("[DeviceSettings] Failed to reload hardware profiles:",o),M("Failed to reload profiles: "+o.message,"error")}finally{e&&(e.disabled=!1,e.textContent=i)}}open(){if(b.log("DeviceSettings.open() called"),!this.modal){b.error("DeviceSettings modal element not found!");return}b.log("Opening Device Settings modal..."),this.nameInput&&(this.nameInput.value=g.settings.device_name||"My E-Ink Display"),this.modelInput&&(this.modelInput.value=g.settings.device_model||"reterminal_e1001"),this.renderingModeInput&&(this.renderingModeInput.value=g.settings.renderingMode||"direct"),this.orientationInput&&(this.orientationInput.value=g.settings.orientation||"landscape"),this.darkModeInput&&(this.darkModeInput.checked=!!g.settings.darkMode),this.invertedColorsInput&&(this.invertedColorsInput.checked=!!g.settings.invertedColors);const e=g.settings,i=!!e.sleepEnabled,o=!!e.manualRefreshOnly,t=!!e.deepSleepEnabled,s=!!e.dailyRefreshEnabled,r=!i&&!o&&!t&&!s;this.modeStandard&&(this.modeStandard.checked=r),this.modeSleep&&(this.modeSleep.checked=i),this.modeManual&&(this.modeManual.checked=o),this.modeDeepSleep&&(this.modeDeepSleep.checked=t),this.modeDaily&&(this.modeDaily.checked=s),this.sleepStart&&(this.sleepStart.value=e.sleepStartHour??0),this.sleepEnd&&(this.sleepEnd.value=e.sleepEndHour??5),this.dailyRefreshTime&&(this.dailyRefreshTime.value=e.dailyRefreshTime||"08:00"),this.deepSleepInterval&&(this.deepSleepInterval.value=e.deepSleepInterval??600),this.refreshIntervalInput&&(this.refreshIntervalInput.value=e.refreshInterval??600),this.dimTimeoutInput&&(this.dimTimeoutInput.value=e.dimTimeout??10),this.noRefreshStart&&(this.noRefreshStart.value=e.noRefreshStartHour??""),this.noRefreshEnd&&(this.noRefreshEnd.value=e.noRefreshEndHour??""),this.autoCycleEnabled&&(this.autoCycleEnabled.checked=!!e.autoCycleEnabled),this.autoCycleInterval&&(this.autoCycleInterval.value=e.autoCycleIntervalS??30),this.oeplEntityIdInput&&(this.oeplEntityIdInput.value=e.oeplEntityId||""),this.oeplDitherInput&&(this.oeplDitherInput.value=e.oeplDither??2),this.odpEntityIdInput&&(this.odpEntityIdInput.value=e.opendisplayEntityId||""),this.odpDitherInput&&(this.odpDitherInput.value=e.opendisplayDither??2),this.odpTtlInput&&(this.odpTtlInput.value=e.opendisplayTtl??60),this.updateVisibility(),this.updateStrategyGroupVisibility(),this.populateCustomFields(),this.populateProtocolFields(),this.updateCustomSectionVisibility(),this.modal.classList.remove("hidden"),this.modal.style.display="flex",b.log("Device Settings modal should be visible now.")}close(){this.modal&&(this.modal.classList.add("hidden"),this.modal.style.display="none")}populateCustomFields(){const e=g.project&&g.project.state&&g.project.state.customHardware||{};if(!e||Object.keys(e).length===0)return;if(this.customChip&&(this.customChip.value=e.chip||"esp32-s3"),this.customTech&&(this.customTech.value=e.tech||"lcd"),this.customRes){const t=`${e.resWidth||800}x${e.resHeight||480}`;this.customRes.value=t,this.customResPreset&&(Array.from(this.customResPreset.options).map(r=>r.value).includes(t)?this.customResPreset.value=t:this.customResPreset.value="custom")}this.customShape&&(this.customShape.value=e.shape||"rect"),this.customPsram&&(this.customPsram.checked=!!e.psram),this.customDisplayDriver&&(this.customDisplayDriver.value=e.displayDriver||"generic_st7789"),this.customDisplayModel&&(this.customDisplayModel.value=e.displayModel||""),this.updateDisplayModelVisibility(),this.customTouchTech&&(this.customTouchTech.value=e.touchTech||"none",this.touchPinsGrid&&(this.touchPinsGrid.style.display=e.touchTech&&e.touchTech!=="none"?"grid":"none"));const i=e.pins||{},o=(t,s)=>{const r=document.getElementById(t);r&&(r.value=s||"")};o("pin_cs",i.cs),o("pin_dc",i.dc),o("pin_rst",i.rst),o("pin_busy",i.busy),o("pin_clk",i.clk),o("pin_mosi",i.mosi),o("pin_backlight",i.backlight),o("pin_sda",i.sda),o("pin_scl",i.scl),o("pin_touch_int",i.touch_int),o("pin_touch_rst",i.touch_rst),o("pin_battery_adc",i.batteryAdc),o("pin_battery_enable",i.batteryEnable)}populateProtocolFields(){const e=g.project&&g.project.protocolHardware||{width:400,height:300,colorMode:"bw"};if(this.protocolWidth&&(this.protocolWidth.value=e.width),this.protocolHeight&&(this.protocolHeight.value=e.height),this.protocolColorMode&&(this.protocolColorMode.value=e.colorMode),this.protocolResPreset){const i=`${e.width}x${e.height}`;Array.from(this.protocolResPreset.options).map(t=>t.value).includes(i)?this.protocolResPreset.value=i:this.protocolResPreset.value="custom"}}populateDeviceSelect(){if(this.modelInput&&R){const e=this.modelInput.value;b.log("[DeviceSettings] Populating dropdown with",Object.keys(R).length,"profiles"),this.modelInput.innerHTML="";const i=ut||[],o=[],t=[];Object.entries(R).forEach(([a,l])=>{l.isCustomProfile||l.isOfflineImport?t.push([a,l]):o.push([a,l])});const s=(a,l)=>{const c=document.createElement("option");c.value=a;let d=l.name||a;d=d.replace(/\s*\(Local\)\s*/gi,"").replace(/\s*\(untested\)\s*/gi,"").trim();const p=[];return(l.isCustomProfile||l.isOfflineImport)&&p.push("Imported"),i.includes(a)||p.push("untested"),p.length>0&&(d+=` (${p.join(", ")})`),c.textContent=d,c};if(o.forEach(([a,l])=>{this.modelInput.appendChild(s(a,l))}),t.length>0&&o.length>0){const a=document.createElement("option");a.disabled=!0,a.textContent="── User-Imported / Custom ──",a.style.fontWeight="bold",a.style.color="var(--text-dim)",this.modelInput.appendChild(a)}t.forEach(([a,l])=>{this.modelInput.appendChild(s(a,l))});const r=document.createElement("option");r.value="custom",r.textContent="Custom Profile...",r.style.fontWeight="bold",r.style.color="var(--accent)",this.modelInput.appendChild(r),e&&(R[e]||e==="custom")?this.modelInput.value=e:this.modelInput.value||(this.modelInput.value="reterminal_e1001"),this.updateCustomSectionVisibility()}}updateVisibility(){const e=this.modeSleep&&this.modeSleep.checked,i=this.modeDaily&&this.modeDaily.checked,o=this.modeDeepSleep&&this.modeDeepSleep.checked,t=this.modeManual&&this.modeManual.checked;this.sleepRow&&(this.sleepRow.style.display=e||o?"flex":"none"),this.dailyRefreshRow&&(this.dailyRefreshRow.style.display=i?"flex":"none"),this.deepSleepRow&&(this.deepSleepRow.style.display=o?"block":"none");const s=g.settings.lcdEcoStrategy||"backlight_off",r=s==="dim_after_timeout",a=s==="backlight_off";this.dimTimeoutRow&&(this.dimTimeoutRow.style.display=r?"flex":"none");const l=this.modelInput?this.modelInput.value:null,c=window.DEVICE_PROFILES||R||{},d=l?c[l]:null,p=!!(d&&d.features&&(d.features.lcd||d.features.oled));this.sleepRow&&p&&(this.sleepRow.style.display=a?"flex":"none");const h=!i&&!t;this.refreshIntervalRow&&(this.refreshIntervalRow.style.display=h?"block":"none"),this.autoCycleRow&&(this.autoCycleRow.style.display=this.autoCycleEnabled&&this.autoCycleEnabled.checked?"flex":"none");const u=this.renderingModeInput?this.renderingModeInput.value:g.settings.renderingMode||"direct",m=u==="oepl"||u==="opendisplay",y=u==="lvgl"||u==="direct";if(this.protocolHardwareSection&&(this.protocolHardwareSection.style.display=m?"block":"none"),this.deviceModelField&&(this.deviceModelField.style.display=m?"none":"block"),this.updateCustomSectionVisibility(),this.powerStrategySection&&(this.powerStrategySection.style.display=y?"block":"none"),this.deviceInvertedColorsField){const f=this.modelInput?this.modelInput.value:null,_=window.DEVICE_PROFILES||R||{},v=f?_[f]:null,S=!!(v&&v.features&&v.features.epaper);this.deviceInvertedColorsField.style.display=y&&S?"block":"none"}}persistToBackend(){if(this._isSavingProfile){b.log("[DeviceSettings] Auto-save skipped because a manual profile save is in progress."),this.saveDebounceTimer&&clearTimeout(this.saveDebounceTimer);return}this.saveDebounceTimer&&clearTimeout(this.saveDebounceTimer),this.saveDebounceTimer=setTimeout(async()=>{if(!this._isSavingProfile)if(z()&&typeof he=="function")try{await he(),b.log("[DeviceSettings] All settings persisted to backend")}catch(e){b.warn("[DeviceSettings] Failed to auto-save settings:",e)}else try{const e=g.getPagesPayload();e.deviceName=g.deviceName,e.deviceModel=g.deviceModel,localStorage.setItem("esphome-designer-layout",JSON.stringify(e)),b.log("[DeviceSettings] Settings persisted to localStorage (offline mode)")}catch(e){b.warn("[DeviceSettings] Failed to save to localStorage:",e)}},1e3)}setupAutoSaveListeners(){const e=(s,r)=>{g.updateSettings({[s]:r}),b.log(`Auto-saved ${s}:`,r),this.persistToBackend()};let i=null;this.nameInput&&this.nameInput.addEventListener("input",()=>{const s=this.nameInput.value.trim();g.setDeviceName(s),L(C.STATE_CHANGED),i&&clearTimeout(i),i=setTimeout(async()=>{if(typeof he=="function")try{await he(),b.log("[DeviceSettings] Device name saved to backend")}catch(r){b.warn("[DeviceSettings] Failed to save device name:",r)}},500)}),this.modelInput&&this.modelInput.addEventListener("change",async()=>{const s=this.modelInput.value;window.currentDeviceModel=s,g.setDeviceModel(s),e("device_model",s),this.updateStrategyGroupVisibility(),b.log("Device model changed to:",s)}),this.orientationInput&&this.orientationInput.addEventListener("change",()=>{e("orientation",this.orientationInput.value)}),this.darkModeInput&&this.darkModeInput.addEventListener("change",()=>{e("darkMode",this.darkModeInput.checked)}),this.invertedColorsInput&&this.invertedColorsInput.addEventListener("change",()=>{e("invertedColors",this.invertedColorsInput.checked)}),this.renderingModeInput&&this.renderingModeInput.addEventListener("change",()=>{e("renderingMode",this.renderingModeInput.value),this.updateVisibility(),this.updateStrategyGroupVisibility(),b.log("Rendering mode changed to:",this.renderingModeInput.value)}),this.oeplEntityIdInput&&this.oeplEntityIdInput.addEventListener("input",()=>{e("oeplEntityId",this.oeplEntityIdInput.value.trim())}),this.oeplDitherInput&&this.oeplDitherInput.addEventListener("change",()=>{e("oeplDither",parseInt(this.oeplDitherInput.value))}),this.odpEntityIdInput&&this.odpEntityIdInput.addEventListener("input",()=>{e("opendisplayEntityId",this.odpEntityIdInput.value.trim())}),this.odpDitherInput&&this.odpDitherInput.addEventListener("change",()=>{e("opendisplayDither",parseInt(this.odpDitherInput.value))}),this.odpTtlInput&&this.odpTtlInput.addEventListener("input",()=>{e("opendisplayTtl",parseInt(this.odpTtlInput.value)||0)}),[this.modeStandard,this.modeSleep,this.modeManual,this.modeDeepSleep,this.modeDaily].forEach(s=>{s&&s.addEventListener("change",()=>{s.checked&&(e("sleepEnabled",!!(this.modeSleep&&this.modeSleep.checked)),e("manualRefreshOnly",!!(this.modeManual&&this.modeManual.checked)),e("deepSleepEnabled",!!(this.modeDeepSleep&&this.modeDeepSleep.checked)),e("dailyRefreshEnabled",!!(this.modeDaily&&this.modeDaily.checked)),this.updateVisibility())})}),this.sleepStart&&this.sleepStart.addEventListener("change",()=>{e("sleepStartHour",parseInt(this.sleepStart.value)||0)}),this.sleepEnd&&this.sleepEnd.addEventListener("change",()=>{e("sleepEndHour",parseInt(this.sleepEnd.value)||0)}),this.dailyRefreshTime&&this.dailyRefreshTime.addEventListener("change",()=>{e("dailyRefreshTime",this.dailyRefreshTime.value)}),this.deepSleepInterval&&this.deepSleepInterval.addEventListener("input",()=>{const s=parseInt(this.deepSleepInterval.value)||600;e("deepSleepInterval",s),this.refreshIntervalInput&&(this.refreshIntervalInput.value=s,g.updateSettings({refreshInterval:s}))}),this.refreshIntervalInput&&this.refreshIntervalInput.addEventListener("input",()=>{const s=parseInt(this.refreshIntervalInput.value)||600;e("refreshInterval",s),this.deepSleepInterval&&this.modeDeepSleep&&this.modeDeepSleep.checked&&(this.deepSleepInterval.value=s,g.updateSettings({deepSleepInterval:s}))}),this.noRefreshStart&&this.noRefreshStart.addEventListener("change",()=>{const s=this.noRefreshStart.value===""?null:parseInt(this.noRefreshStart.value);e("noRefreshStartHour",s)}),this.noRefreshEnd&&this.noRefreshEnd.addEventListener("change",()=>{const s=this.noRefreshEnd.value===""?null:parseInt(this.noRefreshEnd.value);e("noRefreshEndHour",s)}),this.autoCycleEnabled&&this.autoCycleEnabled.addEventListener("change",()=>{e("autoCycleEnabled",this.autoCycleEnabled.checked),this.updateVisibility()}),this.autoCycleInterval&&this.autoCycleInterval.addEventListener("input",()=>{const s=Math.max(5,parseInt(this.autoCycleInterval.value)||30);e("autoCycleIntervalS",s)}),document.querySelectorAll('input[name="lcdEcoStrategy"]').forEach(s=>{s.addEventListener("change",()=>{s.checked&&(e("lcdEcoStrategy",s.value),this.sleepRow&&(this.sleepRow.style.display=s.value==="backlight_off"?"flex":"none"),this.dimTimeoutRow&&(this.dimTimeoutRow.style.display=s.value==="dim_after_timeout"?"flex":"none"))})}),this.dimTimeoutInput&&this.dimTimeoutInput.addEventListener("input",()=>{const s=parseInt(this.dimTimeoutInput.value)||10;e("dimTimeout",s)})}updateStrategyGroupVisibility(){const e=this.modelInput?this.modelInput.value:"reterminal_e1001";let i=!1;if(e==="custom")i=(g.project&&g.project.state&&g.project.state.customHardware||{}).tech==="lcd";else{const t=(window.DEVICE_PROFILES||R||{})[e];i=!!(t&&t.features&&(t.features.lcd||t.features.oled)),t&&t.features&&(t.features.lvgl||t.features.lv_display)}if(this.strategyEpaperGroup&&(this.strategyEpaperGroup.style.display=i?"none":"flex"),this.strategyLcdGroup){if(this.strategyLcdGroup.style.display=i?"flex":"none",i){const s=g.settings.lcdEcoStrategy||"backlight_off",r=document.querySelector(`input[name="lcdEcoStrategy"][value="${s}"]`);r&&(r.checked=!0)}const o=this.renderingModeInput?this.renderingModeInput.value:g.settings.renderingMode||"direct",t=document.getElementById("lcd-strategy-dim-row");if(t&&(t.style.display=o==="lvgl"?"block":"none",o!=="lvgl"&&g.settings.lcdEcoStrategy==="dim_after_timeout")){g.updateSettings({lcdEcoStrategy:"backlight_off"});const s=document.querySelector('input[name="lcdEcoStrategy"][value="backlight_off"]');s&&(s.checked=!0),this.updateVisibility()}}if(this.renderingModeField&&(this.renderingModeField.style.display="block",this.renderingModeInput&&(this.renderingModeInput.value=g.settings.renderingMode||"direct")),this.oeplSettingsSection){const o=this.renderingModeInput&&this.renderingModeInput.value==="oepl"||g.settings.renderingMode==="oepl";this.oeplSettingsSection.style.display=o?"block":"none"}if(this.odpSettingsSection){const o=this.renderingModeInput&&this.renderingModeInput.value==="opendisplay"||g.settings.renderingMode==="opendisplay";this.odpSettingsSection.style.display=o?"block":"none"}this.updateCustomSectionVisibility()}openSaveProfileModal(){return new Promise(e=>{if(!this.saveProfileModal){b.error("Save Profile Modal not found in DOM"),e(null);return}this.saveProfileResolve=e,this.saveProfileNameInput.value="My Custom Device",this.saveProfileModal.classList.remove("hidden"),this.saveProfileModal.style.display="flex",this.saveProfileNameInput.focus(),this.saveProfileNameInput.select();const i=()=>{this.saveProfileModal.classList.add("hidden"),this.saveProfileModal.style.display="none",this.saveProfileResolve&&(this.saveProfileResolve(null),this.saveProfileResolve=null),s()},o=()=>{const r=this.saveProfileNameInput.value.trim();if(!r){M("Please enter a profile name","warning"),this.saveProfileNameInput.focus();return}this.saveProfileModal.classList.add("hidden"),this.saveProfileModal.style.display="none",this.saveProfileResolve&&(this.saveProfileResolve(r),this.saveProfileResolve=null),s()},t=r=>{r.key==="Enter"&&o(),r.key==="Escape"&&i()},s=()=>{this.saveProfileCloseBtn.removeEventListener("click",i),this.saveProfileConfirmBtn.removeEventListener("click",o),this.saveProfileNameInput.removeEventListener("keyup",t)};this.saveProfileCloseBtn.addEventListener("click",i),this.saveProfileConfirmBtn.addEventListener("click",o),this.saveProfileNameInput.addEventListener("keyup",t)})}}class El{constructor(){this.modal=document.getElementById("editorSettingsModal"),this.closeBtn=document.getElementById("editorSettingsClose"),this.doneBtn=document.getElementById("editorSettingsDone"),this.snapToGrid=document.getElementById("editorSnapToGrid"),this.showGrid=document.getElementById("editorShowGrid"),this.lightMode=document.getElementById("editorLightMode"),this.refreshEntitiesBtn=document.getElementById("editorRefreshEntities"),this.entityCountLabel=document.getElementById("editorEntityCount"),this.gridOpacity=document.getElementById("editorGridOpacity"),this.extendedLatinGlyphs=document.getElementById("editorExtendedLatinGlyphs"),this.haManualUrl=document.getElementById("haManualUrl"),this.haLlatToken=document.getElementById("haLlatToken"),this.testHaBtn=document.getElementById("editorTestHaBtn"),this.haTestResult=document.getElementById("haTestResult"),this.haDeployedWarning=document.getElementById("haDeployedWarning"),this.haCorsTip=document.getElementById("haCorsTip"),this.aiProvider=document.getElementById("aiProvider"),this.aiApiKeyGemini=document.getElementById("aiApiKeyGemini"),this.aiApiKeyOpenai=document.getElementById("aiApiKeyOpenai"),this.aiApiKeyOpenrouter=document.getElementById("aiApiKeyOpenrouter"),this.aiModelFilter=document.getElementById("aiModelFilter"),this.aiModelSelect=document.getElementById("aiModelSelect"),this.aiRefreshModelsBtn=document.getElementById("aiRefreshModelsBtn"),this.aiTestResult=document.getElementById("aiTestResult"),this.aiKeyRows={gemini:document.getElementById("aiKeyGeminiRow"),openai:document.getElementById("aiKeyOpenaiRow"),openrouter:document.getElementById("aiKeyOpenrouterRow")}}init(){this.modal&&(this.closeBtn&&this.closeBtn.addEventListener("click",()=>this.close()),this.doneBtn&&this.doneBtn.addEventListener("click",()=>this.close()),this.setupListeners())}open(){if(!this.modal)return;const e=g.settings;this.snapToGrid&&(this.snapToGrid.checked=g.snapEnabled!==!1),this.showGrid&&(this.showGrid.checked=g.showGrid!==!1),this.lightMode&&(this.lightMode.checked=!!e.editor_light_mode),this.aiProvider&&(this.aiProvider.value=e.ai_provider||"gemini"),this.aiApiKeyGemini&&(this.aiApiKeyGemini.value=e.ai_api_key_gemini||""),this.aiApiKeyOpenai&&(this.aiApiKeyOpenai.value=e.ai_api_key_openai||""),this.aiApiKeyOpenrouter&&(this.aiApiKeyOpenrouter.value=e.ai_api_key_openrouter||""),this.aiModelFilter&&(this.aiModelFilter.value=e.ai_model_filter||""),this.updateAIKeyVisibility(),this.refreshModelSelect(),this.gridOpacity&&(this.gridOpacity.value=e.grid_opacity!==void 0?e.grid_opacity:20);const i=e.glyphsets||["GF_Latin_Kernel"];document.querySelectorAll(".glyphset-checkbox").forEach(s=>{s.checked=i.includes(s.value)}),this.extendedLatinGlyphs&&(this.extendedLatinGlyphs.checked=!!e.extendedLatinGlyphs);const o=fi();this.haManualUrl&&(this.haManualUrl.value=nn()||"",this.haManualUrl.disabled=o,this.haManualUrl.style.opacity=o?"0.5":"1"),this.haLlatToken&&(this.haLlatToken.value=mt()||"",this.haLlatToken.disabled=o,this.haLlatToken.style.opacity=o?"0.5":"1"),this.haDeployedWarning&&this.haDeployedWarning.classList.toggle("hidden",!o),this.haCorsTip&&this.haCorsTip.classList.toggle("hidden",o),this.haTestResult&&(this.haTestResult.textContent=""),this.aiTestResult&&(this.aiTestResult.textContent="");const t=document.getElementById("haOriginPlaceholder");t&&(t.textContent=window.location.origin),this.updateEntityCount(),this.modal.classList.remove("hidden"),this.modal.style.display="flex"}close(){this.modal&&(this.modal.classList.add("hidden"),this.modal.style.display="none")}updateEntityCount(){if(this.entityCountLabel&&window.entityStatesCache){const e=Object.keys(window.entityStatesCache).length;this.entityCountLabel.textContent=`${e} entities cached`}}setupListeners(){this.snapToGrid&&this.snapToGrid.addEventListener("change",()=>{g.setSnapEnabled(this.snapToGrid.checked)}),this.showGrid&&this.showGrid.addEventListener("change",()=>{g.setShowGrid(this.showGrid.checked);const o=document.querySelector(".canvas-grid");o&&(o.style.display=this.showGrid.checked?"block":"none")}),this.lightMode&&this.lightMode.addEventListener("change",()=>{const o=this.lightMode.checked;g.updateSettings({editor_light_mode:o}),this.applyEditorTheme(o),L(C.STATE_CHANGED)}),this.gridOpacity&&this.gridOpacity.addEventListener("input",()=>{const o=parseInt(this.gridOpacity.value,10);g.updateSettings({grid_opacity:o})}),this.refreshEntitiesBtn&&this.refreshEntitiesBtn.addEventListener("click",async()=>{this.refreshEntitiesBtn.disabled=!0,this.refreshEntitiesBtn.textContent="Refreshing...",Le?await Le():window.fetchEntityStates&&await window.fetchEntityStates(),this.updateEntityCount(),this.refreshEntitiesBtn.disabled=!1,this.refreshEntitiesBtn.textContent="↻ Refresh Entity List"}),this.haManualUrl&&this.haManualUrl.addEventListener("change",()=>{on(this.haManualUrl.value.trim()),Lt()}),this.haLlatToken&&this.haLlatToken.addEventListener("change",()=>{gi(this.haLlatToken.value.trim())}),this.testHaBtn&&this.testHaBtn.addEventListener("click",async()=>{this.testHaBtn.disabled=!0,this.haTestResult.textContent="Testing...",this.haTestResult.style.color="var(--muted)";try{Lt();const o=await Le();o&&o.length>0?(this.haTestResult.textContent="✅ Success!",this.haTestResult.style.color="var(--success)",this.updateEntityCount()):(this.haTestResult.innerHTML="❌ Failed.<br>Did you add <strong>cors_allowed_origins</strong> to HA and <strong>restart</strong> it?",this.haTestResult.style.color="var(--danger)")}catch{this.haTestResult.innerHTML="❌ Connection Error.<br>Check browser console.",this.haTestResult.style.color="var(--danger)"}finally{this.testHaBtn.disabled=!1}}),this.aiProvider&&this.aiProvider.addEventListener("change",()=>{g.updateSettings({ai_provider:this.aiProvider.value}),this.updateAIKeyVisibility(),this.refreshModelSelect()});const e=(o,t)=>{const s=document.getElementById(o);s&&s.addEventListener("input",()=>g.updateSettings({[t]:s.value.trim()}))};e("aiApiKeyGemini","ai_api_key_gemini"),e("aiApiKeyOpenai","ai_api_key_openai"),e("aiApiKeyOpenrouter","ai_api_key_openrouter"),this.aiModelFilter&&this.aiModelFilter.addEventListener("input",()=>{g.updateSettings({ai_model_filter:this.aiModelFilter.value}),this.filterModels()}),this.aiModelSelect&&this.aiModelSelect.addEventListener("change",()=>{const o=g.settings.ai_provider;g.updateSettings({[`ai_model_${o}`]:this.aiModelSelect.value})}),this.aiRefreshModelsBtn&&this.aiRefreshModelsBtn.addEventListener("click",async()=>{const o=g.settings.ai_provider||"gemini";let t=g.settings[`ai_api_key_${o}`];const s=`aiApiKey${o.charAt(0).toUpperCase()+o.slice(1)}`,r=document.getElementById(s);if(r&&(t=r.value.trim(),g.updateSettings({[`ai_api_key_${o}`]:t})),!t){M("Please enter an API key first",3e3,"error");return}this.aiRefreshModelsBtn.disabled=!0,this.aiRefreshModelsBtn.textContent="...",this.aiTestResult&&(this.aiTestResult.textContent="Testing...",this.aiTestResult.style.color="var(--muted)");try{const a=await window.aiService.fetchModels(o,t);window.aiService.cache.models[o]=a,this.refreshModelSelect(),this.aiTestResult&&(this.aiTestResult.textContent=`✅ Success! Found ${a.length} models.`,this.aiTestResult.style.color="var(--success)")}catch{this.aiTestResult&&(this.aiTestResult.textContent="❌ Failed. Check key/console.",this.aiTestResult.style.color="var(--danger)")}finally{this.aiRefreshModelsBtn.disabled=!1,this.aiRefreshModelsBtn.textContent="Test & Load Models"}}),document.querySelectorAll(".glyphset-checkbox").forEach(o=>{o.addEventListener("change",()=>{const t=Array.from(document.querySelectorAll(".glyphset-checkbox:checked")).map(s=>s.value);g.updateSettings({glyphsets:t})})}),this.extendedLatinGlyphs&&this.extendedLatinGlyphs.addEventListener("change",()=>{g.updateSettings({extendedLatinGlyphs:this.extendedLatinGlyphs.checked})}),this.modal.querySelectorAll(".settings-category-header").forEach(o=>{o.addEventListener("click",()=>{const t=o.closest(".settings-category");t.classList.contains("expanded")?t.classList.remove("expanded"):t.classList.add("expanded")})})}updateAIKeyVisibility(){const e=g.settings.ai_provider||"gemini";Object.keys(this.aiKeyRows).forEach(i=>{this.aiKeyRows[i]&&(this.aiKeyRows[i].style.display=i===e?"block":"none")})}async refreshModelSelect(){if(!this.aiModelSelect)return;const e=g.settings.ai_provider||"gemini";if(!window.aiService||!window.aiService.cache)return;let i=window.aiService.cache.models[e];i||(i=[],window.aiService.cache.models[e]=i),this.filterModels()}filterModels(){if(!this.aiModelSelect)return;const e=g.settings.ai_provider||"gemini",i=(g.settings.ai_model_filter||"").toLowerCase();if(!window.aiService||!window.aiService.cache)return;const t=(window.aiService.cache.models[e]||[]).filter(r=>r.name.toLowerCase().includes(i)||r.id.toLowerCase().includes(i));this.aiModelSelect.innerHTML="",t.forEach(r=>{const a=document.createElement("option");a.value=r.id,a.textContent=r.name,this.aiModelSelect.appendChild(a)});const s=g.settings[`ai_model_${e}`];s&&(this.aiModelSelect.value=s)}applyEditorTheme(e){e?document.documentElement.setAttribute("data-theme","light"):document.documentElement.removeAttribute("data-theme");try{localStorage.setItem("reterminal-editor-theme",e?"light":"dark")}catch(i){b.log("Could not save theme preference:",i)}}}class Il{constructor(){this.modal=document.getElementById("pageSettingsModal"),this.closeBtn=document.getElementById("pageSettingsClose"),this.saveBtn=document.getElementById("pageSettingsSave"),this.nameInput=document.getElementById("pageSettingsName"),this.refreshInput=document.getElementById("pageSettingsRefresh"),this.refreshModeInput=document.getElementById("pageSettingsRefreshMode"),this.refreshTimeInput=document.getElementById("pageSettingsRefreshTime"),this.fieldInterval=document.getElementById("field-refresh-interval"),this.fieldTime=document.getElementById("field-refresh-time"),this.darkModeInput=document.getElementById("pageSettingsDarkMode"),this.layoutModeInput=document.getElementById("pageSettingsLayoutMode"),this.gridSizeInput=document.getElementById("pageSettingsGridSize"),this.fieldGridSize=document.getElementById("field-grid-size"),this.visibleFromInput=document.getElementById("pageSettingsVisibleFrom"),this.visibleToInput=document.getElementById("pageSettingsVisibleTo"),this.pageIndex=-1}init(){this.modal&&(this.closeBtn&&this.closeBtn.addEventListener("click",()=>this.close()),this.saveBtn&&this.saveBtn.addEventListener("click",()=>this.save()),this.refreshModeInput&&this.refreshModeInput.addEventListener("change",()=>this.updateVisibility()),this.layoutModeInput&&this.layoutModeInput.addEventListener("change",()=>this.updateGridVisibility()))}updateVisibility(){if(!this.refreshModeInput)return;const e=this.refreshModeInput.value;this.fieldInterval&&(this.fieldInterval.style.display=e==="interval"?"block":"none"),this.fieldTime&&(this.fieldTime.style.display=e==="daily"?"block":"none")}updateGridVisibility(){if(!this.layoutModeInput||!this.fieldGridSize)return;const e=this.layoutModeInput.value;this.fieldGridSize.style.display=e==="grid"?"block":"none"}open(e){if(!this.modal)return;this.pageIndex=e;const i=g.pages[e];if(!i)return;this.nameInput&&(this.nameInput.value=i.name||"");const o=i.refresh_type||"interval";this.refreshModeInput&&(this.refreshModeInput.value=o),this.refreshInput&&(this.refreshInput.value=i.refresh_s||""),this.refreshTimeInput&&(this.refreshTimeInput.value=i.refresh_time||"08:00"),this.darkModeInput&&(this.darkModeInput.value=i.dark_mode||"inherit"),this.layoutModeInput&&(this.layoutModeInput.value=i.layout?"grid":"absolute"),this.gridSizeInput&&(this.gridSizeInput.value=i.layout||"4x4"),this.visibleFromInput&&(this.visibleFromInput.value=i.visible_from||""),this.visibleToInput&&(this.visibleToInput.value=i.visible_to||""),this.updateVisibility(),this.updateGridVisibility(),this.modal.classList.remove("hidden"),this.modal.style.display="flex"}close(){this.modal&&(this.modal.classList.add("hidden"),this.modal.style.display="none")}save(){if(this.pageIndex===-1)return;const e=g.pages[this.pageIndex];if(!e)return;const i=this.nameInput?this.nameInput.value:e.name,o=this.refreshModeInput?this.refreshModeInput.value:"interval",t=this.refreshInput?parseInt(this.refreshInput.value,10):NaN,s=this.refreshTimeInput?this.refreshTimeInput.value:"08:00",r=this.darkModeInput?this.darkModeInput.value:"inherit",a=this.layoutModeInput?this.layoutModeInput.value:"absolute",l=this.gridSizeInput?this.gridSizeInput.value.trim():"",c=this.visibleFromInput?this.visibleFromInput.value:"",d=this.visibleToInput?this.visibleToInput.value:"";e.name=i,e.refresh_type=o,o==="interval"?(!isNaN(t)&&t>=0?e.refresh_s=t:delete e.refresh_s,delete e.refresh_time):(e.refresh_time=s,delete e.refresh_s),e.dark_mode=r,a==="grid"&&/^\d+x\d+$/.test(l)?e.layout=l:e.layout=null,c?e.visible_from=c:delete e.visible_from,d?e.visible_to=d:delete e.visible_to,g.setPages(g.pages),z()&&typeof he=="function"&&he().then(()=>b.log("[PageSettings] Pages persisted to backend")).catch(p=>b.warn("[PageSettings] Failed to save pages to backend:",p)),this.close()}}let gt=null,Un=!1;Object.defineProperty(window,"lastHighlightRange",{get:()=>gt,set:function(n){gt=n},configurable:!0});Object.defineProperty(window,"isAutoHighlight",{get:()=>Un,set:function(n){Un=n},configurable:!0});function it(n){const e=document.getElementById("snippetBox");if(!e)return;const i=e.value;if(!i)return;let o=Array.isArray(n)?n:n?[n]:[];if(o.length===0){try{e.setSelectionRange(0,0),e.scrollTop=0,gt=null}catch{}return}const t=document.querySelector(".code-panel-title");if(t&&t.textContent.includes("Selection Snippet")){try{e.setSelectionRange(0,i.length),e.focus(),gt={start:0,end:i.length}}catch{}return}let r=-1,a=-1;if(o.forEach(l=>{let c=`id:${l}`,d=i.indexOf(c);if(d===-1&&(c=`id: ${l}`,d=i.indexOf(c)),d===-1&&(c=`"id":"${l}"`,d=i.indexOf(c)),d===-1&&(c=`"id": "${l}"`,d=i.indexOf(c)),d===-1&&(c=`# id: ${l}`,d=i.indexOf(c)),d!==-1){let p=i.lastIndexOf(`
`,d)+1;if(c.includes('":"')||c.includes('": "')){const f=i.lastIndexOf("{",d);f!==-1&&(p=i.lastIndexOf(`
`,f)+1)}if(!c.startsWith("# id:")){let f=p;for(;f>0;){const _=f-1,v=i.lastIndexOf(`
`,_-1)+1;if(i.substring(v,_).trim().startsWith("- type:")){p=v;break}if(p-f>500)break;f=v}}const h=["# widget:","// widget:","// page:","# id:","// ────────────────","// ═══════════════","// ▸ PAGE:"],u=["esphome:","logger:","api:","ota:","wifi:","ethernet:","psram:","substitutions:","external_components:","packages:","globals:","sensor:","binary_sensor:","text_sensor:","time:","script:","font:","image:","animation:","display:","lvgl:","i2c:","spi:","uart:","output:","light:","switch:","button:","number:","select:","climate:","fan:","cover:","  ]","    ]","  }","    }"];let m=-1;if(c.includes('":"')||c.includes('": "')){let f=0,_=!1;for(let v=p;v<i.length;v++){const S=i[v];if(S==="{"?(f++,_=!0):S==="}"&&f--,_&&f===0){m=v+1,i[v+1]===","&&m++;break}}}else{const _=i.indexOf(`
    - type:`,d+c.length);let v=-1;_!==-1&&(v=_),h.forEach(S=>{const w=i.indexOf(S,d+c.length);w!==-1&&(v===-1||w<v)&&(v=w)}),u.forEach(S=>{const w=`
`+S,E=i.indexOf(w,d+c.length);E!==-1&&(v===-1||E<v)&&(v=E+1)}),m=v!==-1?v:i.length}m===-1&&(m=i.length),(r===-1||p<r)&&(r=p),m>a&&(a=m)}}),r!==-1&&a!==-1){const l=document.activeElement?document.activeElement.tagName.toLowerCase():"",c=(l==="input"||l==="textarea")&&document.activeElement!==e,d=window.Canvas&&(window.Canvas.dragState||window.Canvas.lassoState);if(!c&&!d){window.isAutoHighlight=!0;try{e.setSelectionRange(r,a),o.length===1&&!window._undoRedoInProgress&&e.focus()}catch{}}window.lastHighlightRange={start:r,end:a},setTimeout(()=>{if(e.scrollTo){const p=i.substring(0,r).split(`
`),h=i.split(`
`).length,u=p.length,m=e.scrollHeight/h;e.scrollTop=u*m-50,e.scrollLeft=0}},10)}}function jn(){const n=document.getElementById("snippetBox");if(!n)return;const e=()=>{window.isAutoHighlight&&(window.isAutoHighlight=!1)};n.addEventListener("mousedown",e),n.addEventListener("input",e),n.addEventListener("keydown",i=>{(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Tab","Home","End"].includes(i.key)||!i.ctrlKey&&!i.metaKey)&&e()}),b.log("[YAML Export] Interaction listeners attached to Snippet Box.")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",jn):jn();class Cl{constructor(){this.patterns=[{name:"comment",regex:/(#.*)/g},{name:"key",regex:/^(\s*)([^:\n]+)(:)/gm},{name:"string",regex:/("[^"]*"|'[^']*')/g},{name:"value",regex:/\b(true|false|null|[0-9]+(\.[0-9]+)?)\b/g},{name:"keyword",regex:/\b(lambda|script|on_.*|if|then|else|wait_until|delay)\b/g},{name:"tag",regex:/(![a-z_]+)/g}]}highlight(e){if(!e)return"";let i=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");const o=/^(\s*(?:-\s+)?)([^:\n]+)(:)|(#.*)|("[^"]*"|'[^']*')|(![a-z_]+)|\b(lambda|script|on_[a-z_]+|if|then|else|wait_until|delay)\b|\b(true|false|null|[0-9]+(?:\.[0-9]+)?)\b|(\|[-+]?|>[-+]?)/gm;return i.replace(o,(t,s,r,a,l,c,d,p,h,u)=>s!==void 0?`${s}<span class="hl-key">${r}</span><span class="hl-punc">${a}</span>`:l!==void 0?`<span class="hl-comment">${l}</span>`:c!==void 0?`<span class="hl-string">${c}</span>`:d!==void 0?`<span class="hl-tag">${d}</span>`:u!==void 0?`<span class="hl-punc">${u}</span>`:p!==void 0?`<span class="hl-keyword">${p}</span>`:h!==void 0?`<span class="hl-value">${h}</span>`:t)}}class kl{constructor(e){this.adapter=e,this.highlighter=new Cl,this.suppressSnippetUpdate=!1,this.snippetDebounceTimer=null,this.lastGeneratedYaml="",this.isHighlighted=localStorage.getItem("esphome_designer_yaml_highlight")!=="false",this.init()}init(){this.bindEvents(),this.setupAutoUpdate(),this.setupScrollSync(),this.updateSnippetBox()}bindEvents(){const e=document.getElementById("fullscreenSnippetBtn");e&&e.addEventListener("click",()=>{this.openSnippetModal()});const i=document.getElementById("snippetFullscreenClose");i&&i.addEventListener("click",()=>{const u=document.getElementById("snippetFullscreenModal");u&&u.classList.add("hidden")});const o=document.getElementById("importSnippetConfirm");o&&o.addEventListener("click",async()=>{await this.handleImportSnippet()});const t=document.getElementById("updateLayoutBtn");t&&t.addEventListener("click",async()=>{const u=t.querySelector(".mdi"),m=u?.className||"";u&&(u.className="mdi mdi-loading mdi-spin"),t.disabled=!0;try{await this.handleUpdateLayoutFromSnippetBox(),u&&(u.className="mdi mdi-check",setTimeout(()=>{u.className=m},1500))}catch{u&&(u.className="mdi mdi-alert-circle-outline",setTimeout(()=>{u.className=m},1500))}finally{t.disabled=!1}});const s=document.getElementById("copySnippetBtn");s&&s.addEventListener("click",async()=>{this.copySnippetToClipboard(s)});const r=document.getElementById("copyLambdaBtn");r&&r.addEventListener("click",async()=>{this.copyLambdaToClipboard(r)});const a=document.getElementById("copyOEPLServiceBtn");a&&a.addEventListener("click",()=>{this.copyOEPLServiceToClipboard(a)});const l=document.getElementById("copyODPServiceBtn");l&&l.addEventListener("click",()=>{this.copySnippetToClipboard(l)});const c=document.getElementById("toggleYamlBtn"),d=document.querySelector(".code-panel");c&&d&&(localStorage.getItem("esphome_designer_yaml_collapsed")==="true"&&d.classList.add("collapsed"),c.addEventListener("click",()=>{const m=d.classList.toggle("collapsed");localStorage.setItem("esphome_designer_yaml_collapsed",m),window.dispatchEvent(new Event("resize"))}));const p=document.getElementById("toggleHighlightBtn");document.querySelector(".snippet-container"),p&&(document.querySelectorAll(".snippet-container").forEach(u=>{u.classList.toggle("highlighted",this.isHighlighted)}),document.querySelectorAll('[id*="ToggleHighlightBtn"]').forEach(u=>{u.classList.toggle("active",this.isHighlighted)}),p.addEventListener("click",()=>{this.isHighlighted=!this.isHighlighted,localStorage.setItem("esphome_designer_yaml_highlight",this.isHighlighted),document.querySelectorAll(".snippet-container").forEach(u=>{u.classList.toggle("highlighted",this.isHighlighted)}),document.querySelectorAll('[id*="ToggleHighlightBtn"]').forEach(u=>{u.classList.toggle("active",this.isHighlighted)}),this.isHighlighted&&this.updateHighlightLayer()}));const h=document.getElementById("snippetBox");h&&h.addEventListener("input",()=>{this.isHighlighted&&this.updateHighlightLayer()})}setupScrollSync(){const e=document.getElementById("snippetBox"),i=document.getElementById("highlightLayer");e&&i&&e.addEventListener("scroll",()=>{i.scrollTop=e.scrollTop,i.scrollLeft=e.scrollLeft})}setupAutoUpdate(){q(C.STATE_CHANGED,()=>{this.suppressSnippetUpdate||this.updateSnippetBox()}),q(C.SELECTION_CHANGED,e=>{const i=e&&e.widgetIds?e.widgetIds:[];typeof it=="function"&&it(i)})}updateHighlightLayer(){if(!this.isHighlighted)return;const e=document.getElementById("snippetBox"),i=document.getElementById("highlightLayer");e&&i&&(i.innerHTML=this.highlighter.highlight(e.value));const o=document.getElementById("snippetFullscreenHighlight"),t=document.getElementById("snippetFullscreenContent");if(o&&t){const s=t.querySelector("textarea");s&&(o.innerHTML=this.highlighter.highlight(s.value))}}updateSnippetBox(){const e=document.getElementById("snippetBox");e&&(this.snippetDebounceTimer&&clearTimeout(this.snippetDebounceTimer),this.snippetDebounceTimer=setTimeout(()=>{if(!this.suppressSnippetUpdate)try{const o=(window.AppState?window.AppState.selectedWidgetIds:[]).length>1,t=this.adapter&&this.adapter.constructor.name,s=t==="OEPLAdapter",r=t==="OpenDisplayAdapter",a=document.getElementById("oeplNotice");a&&a.classList.toggle("hidden",!s);const l=document.getElementById("odpNotice");if(l&&(l.classList.toggle("hidden",!r),r)){const f=l.querySelector("div");f&&(f.innerHTML="<strong>OpenDisplay YAML (ODP)</strong> - Copy this to Home Assistant → Developer Tools → Services → <code>opendisplay.drawcustom</code>")}const c=document.querySelector(".code-panel-title");if(c){const f=c.querySelector("button");c.innerHTML="",f&&c.appendChild(f);let _=" ESPHome YAML";s&&(_=" OpenEpaperLink JSON"),r&&(_=" OpenDisplay YAML (ODP)"),c.appendChild(document.createTextNode(_))}const d=document.getElementById("copyOEPLServiceBtn");d&&(d.style.display=s?"inline-block":"none");const p=document.getElementById("copyODPServiceBtn");p&&(p.style.display=r?"inline-block":"none");const h=document.getElementById("copyLambdaBtn");h&&(h.style.display=s||r?"none":"inline-block");const u=document.getElementById("updateLayoutBtn");u&&(u.style.display="inline-block");const m=window.AppState?window.AppState.getPagesPayload():{pages:[]},y=JSON.parse(JSON.stringify(m));window.currentDeviceModel&&window.currentDeviceModel!==y.deviceModel&&(b.log(`[SnippetManager] Overriding stale deviceModel '${y.deviceModel}' with '${window.currentDeviceModel}'`),y.deviceModel=window.currentDeviceModel,y.device_model=window.currentDeviceModel,y.settings&&(y.settings.device_model=window.currentDeviceModel)),this.adapter.generate(y).then(f=>{this.lastGeneratedYaml=f,e.value=f,this.isHighlighted&&this.updateHighlightLayer();const _=window.AppState?window.AppState.selectedWidgetIds:[];typeof it=="function"&&it(_)}).catch(f=>{b.error("Error generating snippet via adapter:",f),e.value="# Error generating YAML (adapter): "+f.message,this.isHighlighted&&this.updateHighlightLayer()})}catch(i){b.error("Error generating snippet:",i),e.value="# Error generating YAML: "+i.message,this.isHighlighted&&this.updateHighlightLayer()}},50))}openSnippetModal(){const e=document.getElementById("snippetFullscreenModal"),i=document.getElementById("snippetFullscreenContainer"),o=document.getElementById("snippetFullscreenContent"),t=document.getElementById("snippetFullscreenHighlight"),s=document.getElementById("snippetBox"),r=document.getElementById("toggleFullscreenHighlightBtn");if(!e||!i||!o||!t||!s)return;i.classList.toggle("highlighted",this.isHighlighted),r&&r.classList.toggle("active",this.isHighlighted),r&&!r.hasListener&&(r.addEventListener("click",()=>{this.isHighlighted=!this.isHighlighted,localStorage.setItem("esphome_designer_yaml_highlight",this.isHighlighted);const l=document.querySelector(".snippet-container"),c=document.getElementById("toggleHighlightBtn");l&&l.classList.toggle("highlighted",this.isHighlighted),c&&c.classList.toggle("active",this.isHighlighted),i.classList.toggle("highlighted",this.isHighlighted),r.classList.toggle("active",this.isHighlighted),this.isHighlighted&&(t.innerHTML=this.highlighter.highlight(a.value),this.updateHighlightLayer())}),r.hasListener=!0);let a=o.querySelector("textarea");if(!a){o.innerHTML="",a=document.createElement("textarea"),a.className="snippet-box",a.style.width="100%",a.style.height="100%",a.style.background="transparent",a.spellcheck=!1,o.appendChild(a),a.addEventListener("scroll",()=>{t.scrollTop=a.scrollTop,t.scrollLeft=a.scrollLeft}),a.addEventListener("input",()=>{this.isHighlighted&&(t.innerHTML=this.highlighter.highlight(a.value))});let l=e.querySelector(".modal-actions");if(l&&!l.querySelector("#fullscreenUpdateBtn")){const c=document.createElement("button");c.id="fullscreenUpdateBtn",c.className="btn btn-primary",c.textContent="Update Layout from YAML",c.onclick=()=>{s.value=a.value,this.handleUpdateLayoutFromSnippetBox(),e.classList.add("hidden")},l.insertBefore(c,l.firstChild)}}a.value=s.value||"",this.isHighlighted&&(t.innerHTML=this.highlighter.highlight(a.value),setTimeout(()=>{t.scrollTop=a.scrollTop,t.scrollLeft=a.scrollLeft},50)),e.style.display="",e.classList.remove("hidden")}async handleImportSnippet(){const e=document.getElementById("importSnippetTextarea"),i=document.getElementById("importSnippetError");if(!e)return;const o=e.value;if(o.trim())try{i&&(i.textContent="");let t;try{t=On(o),b.log("[handleImportSnippet] Successfully used offline parser.")}catch(r){if(b.warn("[handleImportSnippet] Offline parser failed, falling back to backend:",r),z())t=await Ca(o);else throw r}we(t);const s=document.getElementById("importSnippetModal");s&&(s.classList.add("hidden"),s.style.display="none"),M("Layout imported successfully","success")}catch(t){b.error("Import failed:",t),i&&(i.textContent=`Error: ${t.message}`)}}async handleUpdateLayoutFromSnippetBox(){const e=document.getElementById("snippetBox");if(!e)return;const i=e.value;if(i.trim()){if(this.lastGeneratedYaml&&i.trim()===this.lastGeneratedYaml.trim()){b.log("[handleUpdateLayoutFromSnippetBox] Skipping update: Snippet matches last generated state.");return}try{const o=window.AppState?.currentLayoutId||"reterminal_e1001",t=window.AppState?.deviceName||"Layout 1",s=window.AppState?.deviceModel||window.AppState?.settings?.device_model||"reterminal_e1001";b.log(`[handleUpdateLayoutFromSnippetBox] Preserving context - ID: ${o}, Name: ${t}`);let r=On(i);r.device_id=o,r.name=t,r.device_model=s,r.settings||(r.settings={}),r.settings.device_model=s,r.settings.device_name=t;const a=window.AppState?.settings?.dark_mode||!1;r.settings.dark_mode=a,this.suppressSnippetUpdate=!0,this.snippetDebounceTimer&&(clearTimeout(this.snippetDebounceTimer),this.snippetDebounceTimer=null),we(r),setTimeout(()=>{this.suppressSnippetUpdate=!1},1500),M("Layout updated from YAML","success"),(i.includes("lambda:")||i.includes("script:"))&&setTimeout(()=>{M("Note: Custom C++ (lambda/script) may not fully preview.","warning",4e3)},800)}catch(o){b.error("Update layout failed:",o),M(`Update failed: ${o.message}`,"error"),this.suppressSnippetUpdate=!1}}}async copySnippetToClipboard(e){const i=document.getElementById("snippetBox");if(!i)return;const o=i.value||"",t=e.textContent,s=()=>{e.textContent="Copied!",e.style.minWidth=e.offsetWidth+"px",setTimeout(()=>{e.textContent=t,e.style.minWidth=""},2e3)};try{if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(o),M("Snippet copied to clipboard","success"),s();else{const r=document.createElement("textarea");r.value=o,r.style.position="fixed",r.style.left="-999999px",r.style.top="-999999px",document.body.appendChild(r),r.focus(),r.select();try{document.execCommand("copy"),M("Snippet copied to clipboard","success"),s()}catch{M("Unable to copy. Try selecting and copying manually.","error")}document.body.removeChild(r)}}catch(r){b.error("Copy failed:",r),M("Unable to copy snippet","error")}}async copyLambdaToClipboard(e){const i=document.getElementById("snippetBox");if(!i)return;const o=i.value||"",t=e.textContent,s=o.search(/^display:\s*$/m);if(s===-1){M("No display section found in output","warning");return}const r=o.substring(s),a=r.match(/\n[a-z_]+:\s*(?:\n|$)/),c=(a?r.substring(0,a.index):r).match(/lambda:\s*\|-\n([\s\S]*?)$/);if(!c){M("No display lambda found in output","warning");return}const p=c[1].split(`
`),h=p.filter(f=>f.trim().length>0);if(h.length===0){M("Lambda appears to be empty","warning");return}const u=Math.min(...h.map(f=>f.match(/^(\s*)/)[1].length)),m=p.map(f=>f.length>=u?f.substring(u):f).join(`
`).trim(),y=()=>{e.textContent="Copied!",e.style.minWidth=e.offsetWidth+"px",setTimeout(()=>{e.textContent=t,e.style.minWidth=""},2e3)};try{if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(m),M("Display lambda copied to clipboard","success"),y();else{const f=document.createElement("textarea");f.value=m,f.style.position="fixed",f.style.left="-999999px",f.style.top="-999999px",document.body.appendChild(f),f.focus(),f.select();try{document.execCommand("copy"),M("Display lambda copied to clipboard","success"),y()}catch{M("Unable to copy. Try selecting and copying manually.","error")}document.body.removeChild(f)}}catch(f){b.error("Copy lambda failed:",f),M("Unable to copy lambda","error")}}async copyOEPLServiceToClipboard(e){const i=document.getElementById("snippetBox");if(!i)return;let o=i.value||"",t="";try{const s=JSON.parse(o),r=g.settings.oeplEntityId||"open_epaper_link.0000000000000000";s.target.entity_id=r,s.data.dither=g.settings.oeplDither??2,t=`service: ${s.service}
`,t+=`target:
  entity_id: ${s.target.entity_id}
`,t+=`data:
`,t+=`  background: ${s.data.background}
`,t+=`  rotate: ${s.data.rotate}
`,t+=`  dither: ${s.data.dither}
`,t+=`  ttl: ${s.data.ttl}
`,t+=`  payload: >
`;const a=JSON.stringify(s.data.payload);t+=`    ${a}`;const l=e.textContent;if(navigator.clipboard)await navigator.clipboard.writeText(t),M("HA Service call copied!","success");else{const c=document.createElement("textarea");c.value=t,document.body.appendChild(c),c.select(),document.execCommand("copy"),document.body.removeChild(c),M("HA Service call copied!","success")}e.textContent="Copied!",setTimeout(()=>{e.textContent=l},2e3)}catch(s){b.error("Failed to format/copy OEPL service:",s),M("Failed to format service call","error")}}}class Ao{constructor(){this.init()}init(){window.addEventListener("keydown",e=>this.handleKeyDown(e))}handleKeyDown(e){const i=g||window.AppState;if(!i){b.error("KeyboardHandler: AppState not found!");return}const o=i.selectedWidgetIds.length>0;i.selectedWidgetId;const t=window.isAutoHighlight||!1;if(e.shiftKey&&e.code==="Space"){(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA")&&e.target.blur(),e.preventDefault(),window.QuickSearch&&window.QuickSearch.open();return}if((e.key==="Delete"||e.key==="Backspace")&&o){const s=window.lastHighlightRange;if(e.target.id==="snippetBox"&&s&&e.target.selectionStart===s.start&&e.target.selectionEnd===s.end){e.preventDefault(),this.deleteWidget(null);return}if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA")return;e.preventDefault(),this.deleteWidget(null);return}if((e.ctrlKey||e.metaKey)&&e.key&&e.key.toLowerCase()==="c"){if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"){if(e.target.id==="snippetBox"&&t){e.preventDefault(),this.copyWidget();return}return}e.preventDefault(),this.copyWidget();return}if((e.ctrlKey||e.metaKey)&&e.key&&e.key.toLowerCase()==="v"){if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"){if(e.target.id==="snippetBox"&&t){e.preventDefault(),this.pasteWidget();return}return}e.preventDefault(),this.pasteWidget();return}if((e.ctrlKey||e.metaKey)&&e.key&&e.key.toLowerCase()==="z"&&!e.shiftKey){if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"){if(e.target.id==="snippetBox"&&t){e.preventDefault(),window._undoRedoInProgress=!0,i.undo(),setTimeout(()=>{window._undoRedoInProgress=!1},100);return}return}e.preventDefault(),window._undoRedoInProgress=!0,i.undo(),setTimeout(()=>{window._undoRedoInProgress=!1},100);return}if((e.ctrlKey||e.metaKey)&&e.key&&(e.key.toLowerCase()==="y"||e.key.toLowerCase()==="z"&&e.shiftKey)){if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"){if(e.target.id==="snippetBox"&&t){e.preventDefault(),window._undoRedoInProgress=!0,i.redo(),setTimeout(()=>{window._undoRedoInProgress=!1},100);return}return}e.preventDefault(),window._undoRedoInProgress=!0,i.redo(),setTimeout(()=>{window._undoRedoInProgress=!1},100);return}if((e.ctrlKey||e.metaKey)&&e.key&&e.key.toLowerCase()==="l"&&o){e.preventDefault();const r=i.getSelectedWidgets().every(a=>a.locked);i.updateWidgets(i.selectedWidgetIds,{locked:!r})}if((e.ctrlKey||e.metaKey)&&e.key&&e.key.toLowerCase()==="a"){const s=e.target.id==="snippetBox"&&t;if(e.target.tagName!=="INPUT"&&e.target.tagName!=="TEXTAREA"||s){e.preventDefault(),i.selectAllWidgets();return}}if(e.key&&e.key.toLowerCase()==="g"&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey&&e.target.tagName!=="INPUT"&&e.target.tagName!=="TEXTAREA"){e.preventDefault();const s=!i.showGrid;if(i.setShowGrid(s),s){i.setShowDebugGrid(!1);const a=document.getElementById("debugGridToggleBtn");a&&a.classList.remove("active")}const r=document.getElementById("gridToggleBtn");r&&r.classList.toggle("active",s),L(C.STATE_CHANGED),b.log(`[Keyboard] Grid toggled: ${s}`);return}if(e.key&&e.key.toLowerCase()==="d"&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey&&e.target.tagName!=="INPUT"&&e.target.tagName!=="TEXTAREA"){e.preventDefault();const s=!i.showDebugGrid;if(i.setShowDebugGrid(s),s){i.setShowGrid(!1);const a=document.getElementById("gridToggleBtn");a&&a.classList.remove("active")}const r=document.getElementById("debugGridToggleBtn");r&&r.classList.toggle("active",s),L(C.STATE_CHANGED),b.log(`[Keyboard] Debug mode toggled: ${s}`);return}if(e.key&&e.key.toLowerCase()==="r"&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey&&e.target.tagName!=="INPUT"&&e.target.tagName!=="TEXTAREA"){e.preventDefault();const s=!i.showRulers;i.setShowRulers(s);const r=document.getElementById("rulersToggleBtn");r&&r.classList.toggle("active",s),b.log(`[Keyboard] Rulers toggled: ${s}`);return}e.key==="Escape"&&(document.activeElement&&(document.activeElement.tagName==="INPUT"||document.activeElement.tagName==="TEXTAREA")&&document.activeElement.blur(),i.selectedWidgetIds.length>0&&(i.selectWidgets([]),L(C.STATE_CHANGED)))}static isInput(e){return e.tagName==="INPUT"||e.tagName==="TEXTAREA"}deleteWidget(e){const i=g||window.AppState;i&&i.deleteWidget(e)}copyWidget(){const e=g||window.AppState;e&&e.copyWidget()}pasteWidget(){const e=g||window.AppState;e&&e.pasteWidget()}}window.KeyboardHandler=Ao;class Ge{constructor(){if(this.constructor===Ge)throw new Error("BaseAdapter is abstract and cannot be instantiated directly.")}async generate(e){throw new Error("Method 'generate()' must be implemented.")}generatePage(e,i){throw new Error("Method 'generatePage()' must be implemented.")}generateWidget(e,i){throw new Error("Method 'generateWidget()' must be implemented.")}sanitize(e){return e}}window.BaseAdapter=Ge;const ae={getColorConst:n=>{if(!n)return"COLOR_BLACK";const e=n.toLowerCase();if(e==="theme_auto")return"color_on";if(e==="transparent")return"color_off";if(e.startsWith("#")&&e.length===7){const i=parseInt(e.substring(1,3),16),o=parseInt(e.substring(3,5),16),t=parseInt(e.substring(5,7),16);return`Color(${i}, ${o}, ${t})`}return Zt[e]||"COLOR_BLACK"},getAlignX:(n,e,i)=>n.includes("LEFT")?`${e}`:n.includes("RIGHT")?`${e} + ${i}`:`${e} + ${i}/2`,getAlignY:(n,e,i)=>n.includes("TOP")?`${e}`:n.includes("BOTTOM")?`${e} + ${i}`:`${e} + ${i}/2`,sanitize:n=>n?n.replace(/"/g,'\\"'):"",addDitherMask:(n,e,i,o,t,s,r,a=0)=>{if(!i||!e)return;const l=e.toLowerCase();let c=l==="gray"||l==="grey";if(!c&&l.startsWith("#")&&l.length===7){const d=parseInt(l.substring(1,3),16),p=parseInt(l.substring(3,5),16),h=parseInt(l.substring(5,7),16);Math.abs(d-p)<15&&Math.abs(p-h)<15&&d>40&&d<210&&(c=!0)}c&&n.push(`          apply_grey_dither_mask(${Math.round(o)}, ${Math.round(t)}, ${Math.round(s)}, ${Math.round(r)});`)},isGrayColor:n=>{if(!n)return!1;const e=n.toLowerCase();if(e==="gray"||e==="grey")return!0;if(e.startsWith("#")&&e.length===7){const i=parseInt(e.substring(1,3),16),o=parseInt(e.substring(3,5),16),t=parseInt(e.substring(5,7),16);if(Math.abs(i-o)<15&&Math.abs(o-t)<15&&i>40&&i<210)return!0}return!1},addDitherMaskForText:(n,e,i,o,t,s,r)=>!i||!ae.isGrayColor(e)?!1:(n.push(`        apply_grey_dither_to_text(${Math.round(o)}, ${Math.round(t)}, ${Math.round(s)}, ${Math.round(r)});`),!0),getIconCode:n=>{if(!n||!window.iconPickerData)return null;const e=window.iconPickerData.find(i=>i.name===n);return e?e.code:null}};window.Utils=ae;window.ESPHomeDesigner=window.ESPHomeDesigner||{};window.ESPHomeDesigner.utils=ae;function Pl(n,e="my_display",i=0,o={},t=!1){if(!n||!n.touch)return[];const s=n.touch,r=["touchscreen:"];r.push(`  - platform: ${s.platform}`),r.push("    id: my_touchscreen"),r.push(`    display: ${e}`),s.i2c_id&&r.push(`    i2c_id: ${s.i2c_id}`),s.spi_id&&r.push(`    spi_id: ${s.spi_id}`),s.address&&r.push(`    address: ${s.address}`),s.update_interval&&r.push(`    update_interval: ${s.update_interval}`);const a=(d,p)=>{p&&(typeof p=="string"||typeof p=="number"?r.push(`    ${d}: ${p}`):(r.push(`    ${d}:`),Object.entries(p).forEach(([h,u])=>r.push(`      ${h}: ${u}`))))};a("interrupt_pin",s.interrupt_pin),a("reset_pin",s.reset_pin),a("cs_pin",s.cs_pin);const l=s.transform||{};if((s.transform||s.mirror_x||s.mirror_y||s.swap_xy)&&(r.push("    transform:"),s.transform?(s.transform.swap_xy&&r.push("      swap_xy: true"),s.transform.mirror_x&&r.push("      mirror_x: true"),s.transform.mirror_y&&r.push("      mirror_y: true")):((s.mirror_x||l.mirror_x)&&r.push("      mirror_x: true"),(s.mirror_y||l.mirror_y)&&r.push("      mirror_y: true"),(s.swap_xy||l.swap_xy)&&r.push("      swap_xy: true"))),t&&o.lcdEcoStrategy==="dim_after_timeout"&&(r.push("    on_release:"),r.push("      - if:"),r.push("          condition: lvgl.is_paused"),r.push("          then:"),r.push("            - lvgl.resume:"),r.push("            - lvgl.widget.redraw:"),r.push("            - light.turn_on: display_backlight")),s.calibration){r.push("    calibration:");const d=s.calibration;Object.entries(d).forEach(([p,h])=>r.push(`      ${p}: ${h}`))}return r.push(""),r}function Yn(n){const e=[];if(!n||!n.backlight)return e;const i=n.backlight;return(i.platform==="ledc"||i.platform==="gpio"||i.platform==="switch")&&(i.platform==="switch"?(e.push("switch:"),e.push("  - platform: gpio"),e.push("    id: lcdbacklight"),e.push("    name: lcdbacklight"),typeof i.pin=="object"?(e.push("    pin:"),Object.entries(i.pin).forEach(([o,t])=>{typeof t=="object"?(e.push(`      ${o}:`),Object.entries(t).forEach(([s,r])=>e.push(`        ${s}: ${r}`))):e.push(`      ${o}: ${t}`)})):e.push(`    pin: ${i.pin}`),e.push("    restore_mode: ALWAYS_ON"),e.push("")):(e.push("output:"),e.push(`  - platform: ${i.platform}`),e.push("    id: gpio_backlight_pwm"),e.push(`    pin: ${i.pin}`),i.frequency&&e.push(`    frequency: ${i.frequency}`),e.push(""))),e.push("light:"),e.push("  - platform: monochromatic"),e.push("    name: Display Backlight"),e.push("    id: display_backlight"),e.push("    restore_mode: ALWAYS_ON"),i.platform==="switch"?(e.push("    output: fake_backlight_output"),e.push("    default_transition_length: 0s"),e.push(""),e.push("output:"),e.push("  - platform: template"),e.push("    id: fake_backlight_output"),e.push("    type: float"),e.push("    write_action:"),e.push("      - if:"),e.push("          condition:"),e.push("            lambda: 'return state > 0.0;'"),e.push("          then:"),e.push("            - switch.turn_on: lcdbacklight"),e.push("          else:"),e.push("            - switch.turn_off: lcdbacklight")):e.push("    output: gpio_backlight_pwm"),e.push(""),e}function Vn(n){const e=[];return n.external_components&&Array.isArray(n.external_components)&&n.external_components.length>0&&(e.push("external_components:"),e.push(...n.external_components),e.push("")),n.extra_components&&Array.isArray(n.extra_components)&&(e.push(...n.extra_components),e.push("")),n.extra_components_raw&&(e.push(n.extra_components_raw),e.push("")),e}function qn(n){const e=[];return n&&n.pins&&n.pins.i2c&&(e.push("i2c:"),e.push("  - sda: "+n.pins.i2c.sda),e.push("    scl: "+n.pins.i2c.scl),e.push("    scan: "+(n.i2c_config?.scan!==!1)),e.push("    id: bus_a"),n.i2c_config?.frequency&&e.push("    frequency: "+n.i2c_config.frequency),e.push("")),e}function Xn(n){const e=[];if(n&&n.pins&&n.pins.spi){e.push("spi:");const i=n.pins.spi;i.id?e.push(`  - id: ${i.id}`):e.push("  - id: spi_bus"),e.push(`    clk_pin: ${i.clk}`),i.mosi&&e.push(`    mosi_pin: ${i.mosi}`),i.miso&&e.push(`    miso_pin: ${i.miso}`),i.type==="quad"&&(e.push("    interface: triple"),i.data_pins&&e.push(`    data_pins: [${i.data_pins.join(", ")}]`)),e.push(""),n.extra_spi&&(e.push(...n.extra_spi),e.push(""))}return e}function Kn(n,e={},i=!1){const o=[];if(!n)return o;const t=e.orientation||"landscape",s=n.resolution||{width:800,height:480},r=s.height>s.width,a=t==="portrait"||t==="portrait_inverted",l=t==="landscape_inverted"||t==="portrait_inverted";let c=0;if(r?c=a?0:90:c=a?90:0,l&&(c=(c+180)%360),n.rotation_offset&&(c=(c+n.rotation_offset)%360),n.display_config){o.push("display:");const p=n.display_config.filter(h=>!h.trim().startsWith("rotation:"));if(o.push(...p),i)for(let h=0;h<o.length;h++)o[h].includes("auto_clear_enabled: true")&&(o[h]=o[h].replace("auto_clear_enabled: true","auto_clear_enabled: false"));o.push(`    rotation: ${c}`),o.push("")}else{const p=!!(n.features&&(n.features.lcd||n.features.oled));o.push("display:"),o.push(`  - platform: ${n.displayPlatform}`),o.push(`    id: ${p?"my_display":"epaper_display"}`),i&&o.push("    auto_clear_enabled: false");const h=n.pins&&n.pins.display?n.pins.display:null;if(h){const y=(f,_)=>{_&&(typeof _=="object"?(o.push(`    ${f}:`),o.push(`      number: ${_.number}`),_.inverted!==void 0&&o.push(`      inverted: ${_.inverted}`)):o.push(`    ${f}: ${_}`))};y("cs_pin",h.cs),y("dc_pin",h.dc),y("reset_pin",h.reset),y("busy_pin",h.busy)}if(n.displayPlatform==="waveshare_epaper"&&n.displayModel&&o.push(`    model: "${n.displayModel}"`),o.push(`    rotation: ${c}`),n.displayModel==="M5Paper"||n.displayPlatform==="it8951e")o.push("    reversed: false"),o.push("    reset_duration: 200ms");else if(n.displayModel&&n.displayPlatform!=="waveshare_epaper"){let y=`    model: "${n.displayModel}"`;n.displayModel==="Seeed-reTerminal-E1002"&&(y+=" #Please update your ESPHome version to 2025.11.1 above"),o.push(y)}const u=e.refreshInterval||1;o.push(`    update_interval: ${p?u+"s":"never"}`);const m=["1.54in","1.54inv2","2.13in","2.13in-ttgo","2.13in-ttgo-b1","2.13in-ttgo-b73","2.13in-ttgo-b74","2.13in-ttgo-dke","2.13inv2","2.13inv3","2.90in","2.90in-dke","2.90inv2","2.90inv2-r2","7.50inv2p","gdew029t5","gdey029t94","gdey042t81","gdey0583t81"];n.displayModel&&m.includes(n.displayModel)&&o.push("    full_update_every: 30"),o.push("")}const d=n.display_config?"my_display":"epaper_display";return o.push(...Pl(n,d,c,e,i)),o}function Jn(n,e=[],i="my_display",o=[]){const t=[];if(!n)return t;const s=n.pins||{},r=s.batteryAdc,a=n.features&&n.features.sht4x,l=n.features&&n.features.shtc3,c=e.length>0;if(!r&&!a&&!l&&!c)return t;if(t.push("sensor:"),r&&(t.push("  - platform: adc"),t.push(`    pin: ${s.batteryAdc}`),t.push('    name: "Battery Voltage"'),t.push('    unit_of_measurement: "V"'),t.push("    device_class: voltage"),t.push("    state_class: measurement"),t.push("    id: battery_voltage"),t.push("    update_interval: 60s"),t.push("    attenuation: "+n.battery.attenuation),t.push("    filters:"),t.push("      - multiply: "+n.battery.multiplier)),a&&(t.push("  - platform: sht4x"),t.push("    id: sht4x_sensor"),t.push("    temperature:"),t.push('      name: "Temperature"'),t.push("      id: sht4x_temperature"),t.push("    humidity:"),t.push('      name: "Humidity"'),t.push("      id: sht4x_humidity"),t.push("    address: 0x44"),t.push("    update_interval: 60s")),(n.features.sht3xd||n.displayModel==="M5Paper"||n.name&&n.name.includes("M5Paper"))&&(t.push("  - platform: sht3xd"),t.push("    address: 0x44"),t.push("    temperature:"),t.push('      name: "Temperature"'),t.push("      id: sht3x_temperature"),t.push("    humidity:"),t.push('      name: "Humidity"'),t.push("      id: sht3x_humidity"),t.push("    update_interval: 60s")),l&&(t.push("  - platform: shtcx"),t.push("    id: shtc3_sensor"),t.push("    i2c_id: bus_a"),t.push("    address: 0x70"),t.push("    temperature:"),t.push('      name: "Temperature"'),t.push("      id: shtc3_temperature"),t.push("    humidity:"),t.push('      name: "Humidity"'),t.push("      id: shtc3_humidity"),t.push("    update_interval: 60s")),e.length>0&&t.push(...e),r)if(t.push(""),t.push("  - platform: template"),t.push('    name: "Battery Level"'),t.push("    id: battery_level"),t.push('    unit_of_measurement: "%"'),t.push('    icon: "mdi:battery"'),t.push("    device_class: battery"),t.push("    state_class: measurement"),n.battery.curve)t.push("    lambda: 'return id(battery_voltage).state;'"),t.push("    update_interval: 60s"),t.push("    filters:"),t.push("      - calibrate_linear:"),n.battery.curve.forEach(d=>{t.push(`          - ${d.from} -> ${d.to}`)}),t.push("      - clamp:"),t.push("          min_value: 0"),t.push("          max_value: 100");else{const d=n.battery.calibration?n.battery.calibration.min:3.27,p=n.battery.calibration?n.battery.calibration.max:4.15;t.push("    lambda: |-"),t.push(`      if (id(battery_voltage).state > ${p}) return 100;`),t.push(`      if (id(battery_voltage).state < ${d}) return 0;`),t.push(`      return (id(battery_voltage).state - ${d}) / (${p} - ${d}) * 100.0;`)}return t.push(""),t}function ot(n,e,i="my_display",o=[]){const t=[],s=n&&n.features&&n.features.buttons,r=o.length>0;if(!s&&!r)return t;if(t.push("binary_sensor:"),s){const a=n.name&&n.name.includes("CoreInk"),l=n.pins.buttons||{};if(l.left&&(t.push("  - platform: gpio"),t.push("    pin:"),typeof l.left=="object"?(t.push(`      number: ${l.left.number}`),t.push(`      mode: ${l.left.mode||"INPUT_PULLUP"}`),t.push(`      inverted: ${l.left.inverted!==void 0?l.left.inverted:!0}`)):(t.push(`      number: ${l.left}`),t.push("      mode: INPUT_PULLUP"),t.push("      inverted: true")),t.push('    name: "Left Button"'),t.push("    id: button_left"),t.push("    on_press:"),t.push("      then:"),a?(t.push("        - script.execute:"),t.push("            id: change_page_to"),t.push(`            target_page: !lambda 'return id(display_page) > 0 ? id(display_page) - 1 : ${e-1};'`)):(t.push("        - script.execute:"),t.push("            id: change_page_to"),t.push(`            target_page: !lambda 'return id(display_page) > 0 ? id(display_page) - 1 : ${e-1};'`))),l.right&&(t.push("  - platform: gpio"),t.push("    pin:"),typeof l.right=="object"?(t.push(`      number: ${l.right.number}`),t.push(`      mode: ${l.right.mode||"INPUT_PULLUP"}`),t.push(`      inverted: ${l.right.inverted!==void 0?l.right.inverted:!0}`)):(t.push(`      number: ${l.right}`),t.push("      mode: INPUT_PULLUP"),t.push("      inverted: true")),t.push('    name: "Right Button"'),t.push("    id: button_right"),t.push("    on_press:"),t.push("      then:"),a?(t.push("        - script.execute:"),t.push("            id: change_page_to"),t.push(`            target_page: !lambda 'return id(display_page) < ${e-1} ? id(display_page) + 1 : 0;'`)):(t.push("        - script.execute:"),t.push("            id: change_page_to"),t.push(`            target_page: !lambda 'return id(display_page) < ${e-1} ? id(display_page) + 1 : 0;'`))),l.refresh){t.push("  - platform: gpio"),t.push("    pin:"),typeof l.refresh=="object"?(t.push(`      number: ${l.refresh.number}`),t.push(`      mode: ${l.refresh.mode||"INPUT_PULLUP"}`),t.push(`      inverted: ${l.refresh.inverted!==void 0?l.refresh.inverted:!0}`)):(t.push(`      number: ${l.refresh}`),t.push("      mode: INPUT_PULLUP"),t.push("      inverted: true"));const c=a?"Enter Button":"Refresh Button",d=a?"button_enter":"button_refresh";t.push(`    name: "${c}"`),t.push(`    id: ${d}`),t.push("    on_press:"),t.push("      then:"),t.push(`        - component.update: ${i}`)}l.home&&(t.push("  - platform: gpio"),t.push("    pin:"),typeof l.home=="object"?(t.push(`      number: ${l.home.number}`),t.push(`      mode: ${l.home.mode||"INPUT_PULLUP"}`),t.push(`      inverted: ${l.home.inverted!==void 0?l.home.inverted:!0}`)):(t.push(`      number: ${l.home}`),t.push("      mode: INPUT_PULLUP"),t.push("      inverted: true")),t.push('    name: "Home Button"'),t.push("    id: button_home"),t.push("    on_press:"),t.push("      then:"),t.push("        - script.execute:"),t.push("            id: change_page_to"),t.push("            target_page: 0"),t.push("        - script.execute: manage_run_and_sleep"))}return r&&(t.push("  # Touch Area Binary Sensors"),o.forEach(a=>{const l=(a.type||"").toLowerCase(),c=a.props||{};if(l==="template_nav_bar"){const d=c.show_prev!==!1,p=c.show_home!==!1,h=c.show_next!==!1;let u=0;if(d&&u++,p&&u++,h&&u++,u>0){const m=Math.floor(a.width/u);let y=0;const f=(_,v)=>{const S=a.x+y*m,w=S+m,E=a.y,x=a.y+a.height;t.push("  - platform: touchscreen"),t.push(`    id: nav_${_}_${a.id}`),t.push("    touchscreen_id: my_touchscreen"),t.push(`    x_min: ${S}`),t.push(`    x_max: ${w}`),t.push(`    y_min: ${E}`),t.push(`    y_max: ${x}`),t.push("    on_press:");const I=a._pageIndex!==void 0?a._pageIndex:0;t.push("      - if:"),t.push("          condition:"),t.push(`            lambda: 'return id(display_page) == ${I};'`),t.push("          then:"),_==="prev"?(t.push("            - script.execute:"),t.push("                id: change_page_to"),t.push("                target_page: !lambda 'return id(display_page) - 1;'")):_==="home"?t.push("            - script.execute: manage_run_and_sleep"):_==="next"&&(t.push("            - script.execute:"),t.push("                id: change_page_to"),t.push("                target_page: !lambda 'return id(display_page) + 1;'")),y++};d&&f("prev"),p&&f("home"),h&&f("next")}}else{const d=(a.entity_id||`touch_area_${a.id}`).replace(/[^a-zA-Z0-9_]/g,"_"),p=parseInt(String(c.icon_size||40),10),h=Math.max(a.width,p),u=Math.max(a.height,p);let m=a.x-Math.floor((h-a.width)/2),y=m+h,f=a.y-Math.floor((u-a.height)/2),_=f+u;m=Math.max(0,m),f=Math.max(0,f);const v=c.nav_action||"none",S=a._pageIndex!==void 0?a._pageIndex:0;t.push("  - platform: touchscreen"),t.push(`    id: ${d}`),t.push("    touchscreen_id: my_touchscreen"),t.push(`    x_min: ${m}`),t.push(`    x_max: ${y}`),t.push(`    y_min: ${f}`),t.push(`    y_max: ${_}`),(v!=="none"||a.entity_id)&&(t.push("    on_press:"),t.push("      - if:"),t.push("          condition:"),t.push(`            lambda: 'return id(display_page) == ${S};'`),t.push("          then:"),v==="next_page"?(t.push("            - script.execute:"),t.push("                id: change_page_to"),t.push("                target_page: !lambda 'return id(display_page) + 1;'")):v==="previous_page"?(t.push("            - script.execute:"),t.push("                id: change_page_to"),t.push("                target_page: !lambda 'return id(display_page) - 1;'")):v==="reload_page"?t.push("            - script.execute: manage_run_and_sleep"):a.entity_id&&(t.push("            - homeassistant.service:"),t.push("                service: homeassistant.toggle"),t.push("                data:"),t.push(`                  entity_id: ${a.entity_id}`)))}})),t.push(""),t}function Zn(n,e,i="my_display"){const o=[];o.push("button:"),o.push("  - platform: template"),o.push('    name: "Next Page"'),o.push("    on_press:"),o.push("      then:"),o.push("        - script.execute:"),o.push("            id: change_page_to"),o.push("            target_page: !lambda 'return id(display_page) + 1;'"),o.push("  - platform: template"),o.push('    name: "Previous Page"'),o.push("    on_press:"),o.push("      then:"),o.push("        - script.execute:"),o.push("            id: change_page_to"),o.push("            target_page: !lambda 'return id(display_page) - 1;'"),o.push("  - platform: template"),o.push('    name: "Refresh Display"'),o.push("    on_press:"),o.push("      then:"),o.push(`        - component.update: ${i}`);for(let t=0;t<e;t++)o.push("  - platform: template"),o.push(`    name: "Go to Page ${t+1}"`),o.push("    on_press:"),o.push("      then:"),o.push("        - script.execute:"),o.push("            id: change_page_to"),o.push(`            target_page: ${t}`);return n.features&&n.features.buzzer&&(o.push("  # Buzzer Sounds"),o.push("  - platform: template"),o.push('    name: "Play Beep Short"'),o.push('    icon: "mdi:bell-ring"'),o.push("    on_press:"),o.push('      - rtttl.play: "beep:d=32,o=5,b=200:16e6"'),o.push(""),o.push("  - platform: template"),o.push('    name: "Play Beep OK"'),o.push('    icon: "mdi:check-circle-outline"'),o.push("    on_press:"),o.push('      - rtttl.play: "ok:d=16,o=5,b=200:e6"'),o.push(""),o.push("  - platform: template"),o.push('    name: "Play Beep Error"'),o.push('    icon: "mdi:alert-circle-outline"'),o.push("    on_press:"),o.push('      - rtttl.play: "error:d=16,o=5,b=200:c6"'),o.push(""),o.push("  - platform: template"),o.push('    name: "Play Star Wars"'),o.push('    icon: "mdi:music-note"'),o.push("    on_press:"),o.push('      - rtttl.play: "StarWars:d=4,o=5,b=45:32p,32f,32f,32f,8a#.,8f.6,32d#,32d,32c,8a#.6,4f.6,32d#,32d,32c,8a#.6,4f.6,32d#,32d,32d#,8c6"')),o.push(""),o}function Qn(n){if(!(n.features&&n.features.psram||n.features&&n.features.features&&n.features.features.psram))return[];const i=(n.chip||"").toLowerCase();if(["esp32-c3","esp32-c6","esp8266"].some(s=>i.includes(s)))return[];const t=["psram:"];return n.psram_mode&&(t.push(`  mode: ${n.psram_mode}`),t.push("  speed: 80MHz")),t.push(""),t}function ei(n){return!n.features||!n.features.axp2101||n.features.manual_pmic?[]:["axp2101:","  i2c_id: bus_a","  address: 0x34","  irq_pin: GPIO21","  battery_voltage:",'    name: "Battery Voltage"',"    id: battery_voltage","  battery_level:",'    name: "Battery Level"',"    id: battery_level","  on_setup:","    - axp2101.set_ldo_voltage:","        id: bldo1","        voltage: 3300mv","    - switch.turn_on: bldo1  # EPD_VCC (Screen Power)","    - axp2101.set_ldo_voltage:","        id: aldo1","        voltage: 3300mv","    - switch.turn_on: aldo1  # Peripherals","    - axp2101.set_ldo_voltage:","        id: aldo3","        voltage: 3300mv","    - switch.turn_on: aldo3  # Backlight/Logic",""]}function ti(n){const e=[],i=n.m5paper?.main_power_pin||n.pins?.main_power_pin||n.m5paper?.battery_power_pin||n.pins?.battery_power_pin;return!n||!n.pins||!n.pins.batteryEnable&&!n.pins.buzzer&&!i||(e.push("output:"),n.pins.batteryEnable&&(e.push("  - platform: gpio"),typeof n.pins.batteryEnable=="object"?(e.push("    pin:"),e.push(`      number: ${n.pins.batteryEnable.number}`),n.pins.batteryEnable.ignore_strapping_warning&&e.push("      ignore_strapping_warning: true"),n.pins.batteryEnable.inverted!==void 0&&e.push(`      inverted: ${n.pins.batteryEnable.inverted}`)):e.push(`    pin: ${n.pins.batteryEnable}`),e.push("    id: bsp_battery_enable")),(n.m5paper?.main_power_pin||n.pins?.main_power_pin)&&(n.pins.batteryEnable&&e.push(""),e.push("  - platform: gpio"),e.push(`    pin: ${n.m5paper?.main_power_pin||n.pins.main_power_pin}`),e.push("    id: main_power")),(n.m5paper?.battery_power_pin||n.pins?.battery_power_pin)&&((n.pins.batteryEnable||n.m5paper?.main_power_pin)&&e.push(""),e.push("  - platform: gpio"),e.push(`    pin: ${n.m5paper?.battery_power_pin||n.pins.battery_power_pin}`),e.push("    id: battery_power")),n.pins.buzzer&&(n.pins.batteryEnable&&e.push(""),e.push("  - platform: ledc"),e.push(`    pin: ${n.pins.buzzer}`),e.push("    id: buzzer_output")),e.push("")),e}function ni(n){return!n.features||!n.features.buzzer?[]:["rtttl:","  id: reterminal_buzzer","  output: buzzer_output",""]}function ii(n){if(!n||!n.audio)return[];const e=[];return n.audio.i2s_audio&&(e.push("i2s_audio:"),e.push(`  i2s_lrclk_pin: ${n.audio.i2s_audio.i2s_lrclk_pin}`),e.push(`  i2s_bclk_pin: ${n.audio.i2s_audio.i2s_bclk_pin}`),n.audio.i2s_audio.i2s_mclk_pin&&e.push(`  i2s_mclk_pin: ${n.audio.i2s_audio.i2s_mclk_pin}`),e.push("")),n.audio.speaker&&(e.push("speaker:"),e.push(`  - platform: ${n.audio.speaker.platform}`),e.push("    id: my_speaker"),n.audio.speaker.dac_type&&e.push(`    dac_type: ${n.audio.speaker.dac_type}`),n.audio.speaker.i2s_dout_pin&&e.push(`    i2s_dout_pin: ${n.audio.speaker.i2s_dout_pin}`),n.audio.speaker.mode&&e.push(`    mode: ${n.audio.speaker.mode}`),e.push("")),e}function oi(n,e=!1){return!n||n==="transparent"?'"0x000000"':n==="theme_auto"?e?'"0xFFFFFF"':'"0x000000"':n==="theme_auto_inverse"?e?'"0x000000"':'"0xFFFFFF"':n.startsWith("#")?'"0x'+n.substring(1).toUpperCase()+'"':`"${n}"`}function Ll(n){return n?{left:"top_left",center:"center",right:"top_right"}[n.toLowerCase()]||n.toLowerCase():"top_left"}function Tl(n,e,i,o){return`font_${(n||"Roboto").toLowerCase().replace(/\s+/g,"_")}_${i||400}_${e||20}${o?"_italic":""}`}function Al(n){return n==null?"cover":typeof n=="number"?n>=255?"cover":n<=0?"transp":Math.round(n/255*100)+"%":n}function si(n,e,i=null,o={}){const t=[],s=i||(R?R[e]||{}:{});t.push("# ============================================================================"),t.push("# LVGL Configuration"),t.push("# ============================================================================"),t.push(""),t.push("lvgl:"),t.push("  id: my_lvgl"),t.push("  log_level: WARN");const r=!!o.darkMode,a=r?'"0x000000"':'"0xFFFFFF"';t.push(`  bg_color: ${a}`),t.push("  displays:");const l=s.features?.lcd?"my_display":"epaper_display";if(t.push(`    - ${l}`),s.touch&&(t.push("  touchscreens:"),t.push("    - my_touchscreen")),o.lcdEcoStrategy==="dim_after_timeout"){const c=(o.dimTimeout||10)+"s";t.push("  on_idle:"),t.push(`    timeout: ${c}`),t.push("    then:"),t.push("      - light.turn_off: display_backlight"),t.push("      - lvgl.pause:")}return t.push(""),t.push("  pages:"),n.forEach((c,d)=>{t.push(`    - id: page_${d}`),c.layout&&/^\d+x\d+$/.test(c.layout)&&t.push(`      layout: ${c.layout}`),t.push("      widgets:");const p=c.widgets||[];if(p.length===0){t.push("        []");return}p.filter(h=>!h.hidden&&h.type!=="group").forEach(h=>{t.push(`        ${Ml(h)}`);const u=Dl(h,s,r);if(u){const m=Object.keys(u)[0],y=u[m];t.push(`        - ${m}:`),jt(y,t,12)}})}),t}function jt(n,e,i){const o=" ".repeat(i);Object.entries(n).forEach(([t,s])=>{if(!(s==null||s===""))if(Array.isArray(s))s.length===0?e.push(`${o}${t}: []`):(e.push(`${o}${t}:`),s.forEach(r=>{typeof r=="object"?(e.push(`${o}  -`),jt(r,e,i+4)):e.push(`${o}  - ${ri(r)}`)}));else if(typeof s=="object")e.push(`${o}${t}:`),jt(s,e,i+2);else if(typeof s=="string"&&s.includes(`
`)){const r=s.split(`
`);if(s.trim().startsWith("!lambda")){e.push(`${o}${t}: ${r[0].trim()}`);const l=r.slice(1).reduce((d,p)=>{if(!p.trim())return d;const h=p.match(/^ */);return Math.min(d,h?h[0].length:0)},1/0),c=l===1/0?0:l;for(let d=1;d<r.length;d++){const p=r[d].trim()===""?"":r[d].substring(c);e.push(`${o}  ${p}`)}}else e.push(`${o}${t}: |-`),r.forEach(a=>{e.push(`${o}  ${a}`)})}else e.push(`${o}${t}: ${ri(s)}`)})}function ri(n){if(n==null)return"";if(typeof n!="string")return String(n);const e=n.trim();return n.startsWith('"')&&n.endsWith('"')||n.startsWith("'")&&n.endsWith("'")||e.startsWith("!lambda")||e.startsWith("!secret")?n:/^[*&!|>%@,\-{}[\]?#:]/.test(e)||/^(true|false|null|yes|no)$/i.test(e)||e.includes(": ")||e.includes(" #")?JSON.stringify(n):n}function Ml(n){const e=[`# widget:${n.type}`];e.push(`id:${n.id}`),e.push(`type:${n.type}`),e.push(`x:${Math.round(n.x)}`),e.push(`y:${Math.round(n.y)}`);const i=n.w!==void 0?n.w:n.width!==void 0?n.width:0,o=n.h!==void 0?n.h:n.height!==void 0?n.height:0;return e.push(`w:${Math.round(i)}`),e.push(`h:${Math.round(o)}`),n.entity_id&&e.push(`entity:${n.entity_id}`),n.locked&&e.push("locked:true"),n.props&&Object.entries(n.props).forEach(([t,s])=>{if(!(s==null||s==="")&&!(t==="id"||t==="type"||t==="x"||t==="y"||t==="w"||t==="h"||t==="entity_id"))if(typeof s=="object")try{e.push(`${t}:${JSON.stringify(s)}`)}catch(r){b.warn(`[serializeWidget] Failed to serialize prop ${t}`,r)}else e.push(`${t}:${JSON.stringify(s)}`)}),e.join(" ").replace(/[\r\n]+/g," ")}function Dl(n,e,i=!1){const o=n.props||{};e?.touch||e?.features&&e.features.touch;const t=Math.round(n.x||0),s=Math.round(n.y||0),r=Math.round(n.w||n.width||100),a=Math.round(n.h||n.height||100),l={id:n.id,x:t,y:s,width:r,height:a,hidden:o.hidden||void 0,clickable:o.clickable===!1?!1:void 0,checkable:o.checkable||void 0,scrollable:o.scrollable===!1?!1:void 0,floating:o.floating||void 0,ignore_layout:o.ignore_layout||void 0,scrollbar_mode:o.scrollbar_mode!=="AUTO"?o.scrollbar_mode:void 0},c=window.PluginRegistry;if(c){const d=c.get(n.type);if(d&&typeof d.exportLVGL=="function"){const p=()=>({type:"obj",attrs:{...l}}),h=d.exportLVGL(n,{profile:e,common:l,convertColor:u=>oi(u,i),convertAlign:Ll,getLVGLFont:Tl,formatOpacity:Al,getObjectDescriptor:p});return h&&h.type&&h.attrs?{[h.type]:h.attrs}:h}}return n.type&&(n.type.startsWith("lvgl_")||n.type.startsWith("shape_")||n.type==="rounded_rect"||n.type==="line"||n.type==="text"||n.type==="progress_bar"||n.type==="qr_code")?(b.warn(`[transpileToLVGL] Widget type ${n.type} has no exportLVGL function. Falling back to generic obj.`),{obj:{...l,bg_color:oi(o.bg_color||o.color||"white",i)}}):null}class Ol{constructor(){this.reset(),this.EXTENDED_GLYPHS=[...Array.from({length:95},(e,i)=>`\\U000000${(i+32).toString(16).toUpperCase().padStart(2,"0")}`),...Array.from({length:96},(e,i)=>`\\U000000${(i+160).toString(16).toUpperCase().padStart(2,"0")}`),"\\U000003BC","\\U000003A9","\\U000020AC","\\U00002122"]}reset(){this.definedFontIds=new Set,this.fontLines=[],this.iconCodesBySize=new Map}addFont(e,i,o,t=!1){const s=e.replace(/\s+/g,"_").toLowerCase();let r=parseInt(i)||400;e!=="Material Design Icons"&&(r=Ut(e,r));const a=t?"_italic":"",l=String(o).replace(".","_"),c=`font_${s}_${r}_${l}${a}`;if(this.definedFontIds.has(c))return c;if(this.definedFontIds.add(c),e!=="Material Design Icons"){const d={id:c,file:{type:"gfonts",family:e,weight:r,italic:t},size:o,glyphs:[...this.EXTENDED_GLYPHS]};this.fontLines.push(d)}return c}trackIcon(e,i){if(!e)return;const o=parseInt(i,10);this.iconCodesBySize.has(o)||this.iconCodesBySize.set(o,new Set);let t=e;/^F[0-9A-F]{4}$/i.test(e)?t=e.toUpperCase():t=window.Utils?window.Utils.getIconCode(e):null,t&&this.iconCodesBySize.get(o).add(t)}getLines(e=[],i=!1){this.definedFontIds.size===0&&this.addFont("Roboto",400,20);const o=["font:"];this.fontLines.forEach(t=>{if(o.push("  - file:"),o.push(`      type: ${t.file.type}`),o.push(`      family: "${t.file.family}"`),o.push(`      weight: ${t.file.weight}`),o.push(`      italic: ${t.file.italic?"true":"false"}`),o.push(`    id: ${t.id}`),o.push(`    size: ${Math.round(t.size)}`),e&&e.length>0){const s=e.join(", ");o.push(`    glyphsets: [${s}]`),o.push("    ignore_missing_glyphs: true")}if(i||!e||e.length===0){const s=t.glyphs.map(r=>`"${r}"`).join(", ");o.push(`    glyphs: [${s}]`)}});for(const[t,s]of this.iconCodesBySize.entries()){const r=`font_material_design_icons_400_${t}`;o.push('  - file: "fonts/materialdesignicons-webfont.ttf"'),o.push(`    id: ${r}`),o.push(`    size: ${t}`);const a=Array.from(s).sort().map(l=>`"\\U000${l}"`).join(", ");o.push(`    glyphs: [${a}]`)}return o.length>1?o:[]}}class Rl{generateInstructionHeader(e,i){const o=[];o.push("# ============================================================================"),o.push("# ESPHome YAML - Generated by ESPHome Designer"),o.push("# ============================================================================"),o.push(`# TARGET DEVICE: ${e.name||"Unknown"}`);const t=e.features||{},s=e.displayPlatform||(t.lcd?e.id==="reterminal_e1001"?"reterminal_e1001":"LCD":t.epaper?"waveshare_epaper":"Unknown"),r=e.chip||"esp32-s3",l=["esp32-c3","esp32-c6","esp8266"].some(m=>r.toLowerCase().includes(m)),c=t.psram&&!l;o.push(`#         - Display Platform: ${s}`),o.push(`#         - Touchscreen: ${t.touch?e.touch?.platform||"Yes":"No"}`),o.push(`#         - PSRAM: ${c?"Yes":"No"}`);let d="esp-idf (Recommended)";r==="esp8266"?d="Arduino (Default)":c&&(e.chip?.includes("s3")||e.id?.includes("s3"))&&(d="ESP-IDF (Required for stable PSRAM/LVGL)"),o.push(`#         - Framework: ${d}`),o.push("# ============================================================================"),o.push("#"),o.push("# SETUP INSTRUCTIONS:"),o.push("#"),o.push("# STEP 1: Copy the Material Design Icons font file"),o.push("#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf"),o.push("#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf"),o.push("#"),o.push("# STEP 2: Create a new device in ESPHome"),o.push('#         - Click "New Device"'),r==="esp8266"?(o.push("#         - Select: ESP8266"),o.push("#         - Framework: Arduino (Default)")):r==="esp32"?(o.push("#         - Select: ESP32"),o.push("#         - Framework: ESP-IDF (Recommended) or Arduino")):r.includes("c3")?(o.push("#         - Select: ESP32-C3"),o.push("#         - Framework: ESP-IDF (Recommended) or Arduino")):r.includes("c6")?(o.push("#         - Select: ESP32-C6"),o.push("#         - Framework: ESP-IDF (Recommended)")):(o.push("#         - Select: ESP32-S3 (or appropriate for your board)"),o.push("#         - Framework: ESP-IDF (Essential for S3 stability)")),o.push("#"),o.push("# STEP 3: PASTE this snippet into your device YAML"),o.push("#         - Paste this snippet at the end of your configuration.");const p=r==="esp8266"?"esp8266":"esp32";o.push(`#         - System sections (esphome, ${p}${r!=="esp8266"?", psram":""}) are auto-commented`),o.push("#           to avoid conflicts with your existing base setup."),o.push("#"),o.push("# CAPTIVE PORTAL:"),o.push("#         - If WiFi connection fails, the device will create a hotspot."),o.push("#         - Search for its name in your WiFi settings."),o.push("#         - Connect and go to http://192.168.4.1 to configure WiFi."),o.push("#"),r.includes("s3")&&(o.push("# TIP: For reTerminal / S3 devices, if you cannot see logs via USB,"),o.push("#      add this to your base 'logger:' section:"),o.push("#      hardware_uart: USB_CDC"),o.push("#")),o.push("# ============================================================================"),o.push(""),o.push("# ===================================="),o.push("# Device Settings"),o.push("# ===================================="),o.push(`# Orientation: ${i.orientation||"landscape"}`),o.push(`# Dark Mode: ${i.darkMode?"enabled":"disabled"}`),o.push(`# Refresh Interval: ${i.refreshInterval||600}`);const h=!!(e.features&&(e.features.lcd||e.features.oled));let u;if(i.manualRefreshOnly)u="Manual Refresh Only";else if(h){const m=i.lcdEcoStrategy||"backlight_off";u={always_on:"Always On",backlight_off:"Backlight Off Schedule",halt_updates:"Halt Updates",deep_sleep:"Deep Sleep",dim_after_timeout:"Dim after timeout"}[m]||m}else u=i.deepSleepEnabled?"Ultra Eco (Deep Sleep)":i.sleepEnabled?"Eco (Light Sleep)":"Always On";return o.push(`# Power Strategy: ${u}`),o.push(`# Deep Sleep Interval: ${i.deepSleepInterval||600}`),o.push("# ===================================="),o.push(""),o}generateSystemSections(e,i){const o=[],t=e.chip||"esp32-s3",s=e.board||(t==="esp8266"?"nodemcuv2":t==="esp32"?"esp32dev":t.includes("c3")?"esp32-c3-devkitm-1":t.includes("c6")?"esp32-c6-devkitc-1":"esp32-s3-devkitc-1"),r=!!(e.features&&(e.features.epaper||e.features.epd)),a=e.board==="m5stack-coreink"||e.name&&e.name.toLowerCase().includes("coreink");return o.push("# esphome:"),o.push("#   name: your-device-name"),o.push("#   comment: 'Snippet generated by ESPHome Designer'"),i.plugin_includes&&i.plugin_includes.length>0&&(o.push("#   includes:"),i.plugin_includes.forEach(l=>{o.push(`#     - ${l}`)})),o.push("#   on_boot:"),o.push("#     priority: 300"),o.push("#     then:"),a||(e.id==="esp32_s3_photopainter"&&(o.push("#       - lambda: |-"),o.push("#           auto write_reg = [](uint8_t reg, uint8_t val) {"),o.push("#             uint8_t data[2] = {reg, val};"),o.push("#             id(bus_a)->write(0x34, data, 2);"),o.push("#           };"),o.push("#           write_reg(0x94, 0x1C); // ALDO3 3.3V"),o.push("#           write_reg(0x95, 0x1C); // ALDO4 3.3V"),o.push("#           write_reg(0x90, 0x1F); // Enable rails"),o.push('#           ESP_LOGI("power", "AXP2101 Configured");'),o.push("#       - delay: 200ms"),o.push("#       - component.update: epaper_display")),e.battery&&e.pins&&e.pins.batteryEnable&&o.push("#       - output.turn_on: bsp_battery_enable"),(e.m5paper?.main_power_pin||e.pins?.main_power_pin)&&o.push("#       - output.turn_on: main_power"),(e.m5paper?.battery_power_pin||e.pins?.battery_power_pin)&&o.push("#       - output.turn_on: battery_power"),o.push("#       - delay: 2s")),a?(o.push("#       # 1. HARDWARE POWER LOCK (ESP-IDF Version)"),o.push("#       - lambda: |-"),o.push("#           gpio_set_direction(GPIO_NUM_12, GPIO_MODE_OUTPUT);"),o.push("#           gpio_set_level(GPIO_NUM_12, 1);"),o.push("#           gpio_hold_en(GPIO_NUM_12);"),o.push("#           gpio_deep_sleep_hold_en();"),o.push("#"),o.push("#       # 2. Start the Main Logic Loop"),o.push("#       - script.execute: manage_run_and_sleep"),o.push("#"),o.push("#       # 3. Initial Screen Update"),o.push("#       - component.update: epaper_display")):r&&i.deepSleepEnabled?o.push("#       - script.execute: deep_sleep_cycle"):o.push("#       - script.execute: manage_run_and_sleep"),i.autoCycleEnabled&&o.push("#       - script.execute: auto_cycle_timer"),t==="esp8266"?(o.push("#"),o.push("# esp8266:"),o.push(`#   board: ${s}`)):(o.push("#"),o.push("# esp32:"),o.push(`#   board: ${s}`),o.push("#   framework:"),o.push("#     type: esp-idf"),t.includes("s3")&&(o.push("#     sdkconfig_options:"),o.push("#       CONFIG_ESP32S3_DEFAULT_CPU_FREQ_240: y"),o.push("#       CONFIG_ESP32S3_DATA_CACHE_64KB: y"))),o.push("#"),o.push("# logger:"),t.includes("s3")&&o.push("#   hardware_uart: USB_CDC # Enable for USB debugging on S3"),o.push("#   level: DEBUG"),o.push("#"),o.push("# api:"),o.push("# ota:"),o.push("# wifi:"),o.push("#   # ... your wifi config here"),r&&i.deepSleepEnabled&&(o.push(""),o.push("deep_sleep:"),o.push("  id: deep_sleep_control"),o.push("  run_duration: 120s # Stay awake 120s on boot for OTA"),o.push(`  sleep_duration: ${i.deepSleepInterval||600}s`)),o.push(""),o}generateScriptSection(e,i,o){const t=[],s=o.features?.lcd?"my_display":"epaper_display",r=e.autoCycleEnabled&&i.length>1,a=!!(o.features&&(o.features.lcd||o.features.oled)),l=!!(o.features&&(o.features.epaper||o.features.epd)),c=!!(o.features&&o.features.oled),d=a?500:3e3,p=o.backlight&&o.backlight.pin?o.backlight.pin:o.pins?.backlight||null,h=e.lcdEcoStrategy||"backlight_off",u=a&&h==="backlight_off"&&p,m=l&&e.deepSleepEnabled;if(t.push("script:"),t.push("  - id: change_page_to"),t.push("    parameters:"),t.push("      target_page: int"),t.push("    then:"),t.push("      - lambda: |-"),t.push(`          int pages_count = ${i.length};`),t.push("          int target = target_page;"),t.push("          while (target < 0) target += pages_count;"),t.push("          target %= pages_count;"),t.push(""),t.push(`          // Debounce: Ignore page changes within ${d}ms of last change`),t.push(`          // (adjusted for ${a?"LCD":"e-paper"} display update time)`),t.push("          uint32_t now = millis();"),t.push(`          if (now - id(last_page_switch_time) < ${d}) {`),t.push('            ESP_LOGD("display", "Page change ignored (debounce), last switch was %d ms ago", now - id(last_page_switch_time));'),t.push("            return;"),t.push("          }"),t.push(""),t.push("          if (id(display_page) != target) {"),t.push("            // Set debounce time BEFORE display update (update takes ~1.6s)"),t.push("            id(last_page_switch_time) = now;"),t.push("            id(display_page) = target;"),t.push(`            id(${s}).update();`),t.push('            ESP_LOGI("display", "Switched to page %d", target);'),t.push("            // Restart refresh logic"),t.push("            if (id(manage_run_and_sleep).is_running()) id(manage_run_and_sleep).stop();"),t.push("            id(manage_run_and_sleep).execute();"),u&&(t.push("            // LCD Strategy: Wake up backlight on interaction/page change"),t.push("            id(backlight_pwm).set_level(0.8); // Restore brightness")),t.push("          }"),m){t.push(""),t.push("  - id: deep_sleep_cycle"),t.push("    then:"),t.push('      - logger.log: "Waiting for sync before Deep Sleep..."'),t.push("      - wait_until:"),t.push("          condition:"),t.push("            lambda: 'return id(ha_time).now().is_valid() && api_is_connected();'"),t.push("          timeout: 120s"),t.push("      - delay: 5s");const w=parseInt(e.noRefreshStartHour??e.sleepStartHour)||0,E=parseInt(e.noRefreshEndHour??e.sleepEndHour)||0;e.sleepEnabled===!0||e.sleepEnabled==="true"||e.sleepEnabled===1||e.sleepEnabled==="1"||e.deepSleepEnabled===!0||e.deepSleepEnabled==="true"||e.deepSleepEnabled===1||e.deepSleepEnabled==="1"?(t.push("      - if:"),t.push("          condition:"),t.push("            lambda: |-"),t.push("              auto time = id(ha_time).now();"),t.push("              if (time.is_valid()) {"),t.push("                  int hour = time.hour;"),t.push(`                  int start = ${w};`),t.push(`                  int end = ${E};`),t.push("                  if (start < end) {"),t.push("                      if (hour >= start && hour < end) return false;"),t.push("                  } else {"),t.push("                      if (hour >= start || hour < end) return false;"),t.push("                  }"),t.push("              }"),t.push("              return true;"),t.push("          then:"),t.push(`            - component.update: ${s}`),t.push("            - delay: 5s # Ensure refresh starts before sleep")):(t.push(`      - component.update: ${s}`),t.push("      - delay: 5s # Ensure refresh starts before sleep")),t.push('      - logger.log: "Entering Deep Sleep now..."'),t.push("      - deep_sleep.enter: deep_sleep_control")}t.push(""),t.push("  - id: manage_run_and_sleep","    mode: restart","    then:"),(o.m5paper?.main_power_pin||o.pins?.main_power_pin)&&t.push("      - output.turn_on: main_power"),(o.m5paper?.battery_power_pin||o.pins?.battery_power_pin)&&t.push("      - output.turn_on: battery_power"),t.push('      - logger.log: "Waiting for sync..."'),t.push("      - wait_until:"),t.push("          condition:"),t.push("            lambda: 'return id(ha_time).now().is_valid() && api_is_connected();'"),t.push("          timeout: 120s"),t.push("      - delay: 5s"),t.push("      - lambda: |-"),t.push("          int p = id(display_page);"),t.push("          int interval = id(page_refresh_default_s);"),t.push("          bool is_sleep_time = false;");const y=parseInt(e.noRefreshStartHour??e.sleepStartHour)||0,f=parseInt(e.noRefreshEndHour??e.sleepEndHour)||0,_=e.sleepEnabled===!0||e.sleepEnabled==="true"||e.sleepEnabled===1||e.sleepEnabled==="1"||e.deepSleepEnabled===!0||e.deepSleepEnabled==="true"||e.deepSleepEnabled===1||e.deepSleepEnabled==="1";t.push("          auto time = id(ha_time).now();"),t.push("          if (time.is_valid()) {"),t.push("             int hour = time.hour;"),t.push("             int minute = time.minute;"),t.push("             int curr_min = hour * 60 + minute;"),t.push(`             int start = ${y};`),t.push(`             int end = ${f};`),t.push("             if (start < end) {"),t.push("                 if (hour >= start && hour < end) is_sleep_time = true;"),t.push("             } else if (start > end) {"),t.push("                 if (hour >= start || hour < end) is_sleep_time = true;"),t.push("             } "),t.push(""),t.push("             // Visibility Logic: Find best page for current time"),t.push("             int best_page = -1;");const v=w=>{if(!w)return null;const E=w.split(":");return parseInt(E[0])*60+parseInt(E[1])};if(i.forEach((w,E)=>{const x=v(w.visible_from),I=v(w.visible_to);x!==null&&I!==null&&(x<I?t.push(`             if (best_page == -1 && curr_min >= ${x} && curr_min < ${I}) best_page = ${E};`):t.push(`             if (best_page == -1 && (curr_min >= ${x} || curr_min < ${I})) best_page = ${E};`))}),i.forEach((w,E)=>{!w.visible_from&&!w.visible_to&&t.push(`             if (best_page == -1) best_page = ${E};`)}),t.push(""),t.push("             // If current page is invisible OR another should be shown, switch"),t.push("             if (best_page != -1 && best_page != p) {"),t.push('                 ESP_LOGI("display", "Auto-switching to scheduled page %d", best_page);'),t.push("                 id(change_page_to).execute(best_page);"),t.push("                 return;"),t.push("             }"),t.push("          }"),a?u?(t.push("          #ifdef USE_BACKLIGHT"),t.push("          if (is_sleep_time) {"),t.push("              auto call = id(backlight_pwm).make_call();"),t.push("              call.set_brightness(0.0);"),t.push("              call.perform();"),t.push("              interval = 3600; // Check back in an hour"),t.push("          } else {"),t.push("              auto call = id(backlight_pwm).make_call();"),t.push("              call.set_brightness(0.8);"),t.push("              call.perform();"),t.push("          }"),t.push("          #endif")):c&&_&&(t.push("          if (is_sleep_time) {"),t.push("              interval = 3600;"),t.push("          }")):_&&!m&&(t.push("          if (is_sleep_time) {"),t.push("              interval = 3600; // Sleep for an hour (skip updates)"),t.push("          }")),t.push("          if (!is_sleep_time) {"),i.forEach((w,E)=>{if(w.refresh_type==="daily"&&w.refresh_time){const x=v(w.refresh_time);t.push(`            if (p == ${E}) {`),t.push(`               int target_min = ${x};`),t.push("               int diff = target_min - curr_min;"),t.push("               if (diff <= 0) diff += 1440; // Next day"),t.push("               interval = diff * 60;"),t.push("            }")}else{const x=parseInt(w.refresh_s);!isNaN(x)&&x>0&&t.push(`            if (p == ${E}) interval = ${x};`)}}),t.push("          }"),t.push("          id(page_refresh_current_s) = interval;"),t.push(`      - component.update: ${s}`),!!e.manualRefreshOnly?t.push('      - logger.log: "Manual Refresh Only mode: stopping automatic refresh loop."'):(t.push("      - delay: !lambda 'return id(page_refresh_current_s) * 1000;'"),t.push("      - script.execute: manage_run_and_sleep")),r){const w=e.autoCycleIntervalS||30;t.push("  - id: auto_cycle_timer","    mode: restart","    then:"),t.push(`      - delay: ${w}s`),t.push("      - script.execute:"),t.push("          id: change_page_to"),t.push("          target_page: !lambda 'return id(display_page) + 1;'"),t.push("      - script.execute: auto_cycle_timer")}return t}}function Bl(n,e,i,o=!1,t={}){if(o&&(n=n.replace(/auto_clear_enabled:\s*true/g,"auto_clear_enabled: false")),e.resolution){const s=e.resolution,r=s.height>s.width,a=i==="portrait"||i==="portrait_inverted",l=i==="landscape_inverted"||i==="portrait_inverted",c=r!==a,d=n.match(/display:[\s\S]*?rotation:\s*(\d+)/),p=d?parseInt(d[1],10):0;let h=0;c&&(h+=90),l&&(h+=180);const u=(p+h)%360;if(b.log(`[Adapter] Orientation: ${i}, base rotation: ${p}, offset: ${h}, final: ${u}`),n=n.replace(/(display:[\s\S]*?rotation:\s*)\d+/g,`$1${u}`),e.name&&e.name.toLowerCase().includes("waveshare touch lcd 7")){const y=(e.name||"ESPHome-Device").replace(/["\\]/g,"").split(" ")[0];n=n.replace(/"Waveshare-7-Inch"/g,`"${y}-Hotspot"`)}const m=n.match(/^(\s*)id:\s*my_touchscreen/m);if(m){const y=m[1];let f="";if(u===0?f=`transform:
${y}  swap_xy: false
${y}  mirror_x: false
${y}  mirror_y: false`:u===90?f=`transform:
${y}  swap_xy: true
${y}  mirror_x: false
${y}  mirror_y: true`:u===180?f=`transform:
${y}  swap_xy: false
${y}  mirror_x: true
${y}  mirror_y: true`:u===270&&(f=`transform:
${y}  swap_xy: true
${y}  mirror_x: true
${y}  mirror_y: false`),f)if(new RegExp(`^${y}transform:`,"m").test(n)){const v=new RegExp(`^${y}transform:\\n(${y}  (swap_xy|mirror_x|mirror_y):.*\\n?)+`,"m");v.test(n)&&(n=n.replace(v,`${y}${f}
`))}else n=n.replace(m[0],`${m[0]}
${y}${f}`);if(o&&t.lcdEcoStrategy==="dim_after_timeout"&&!n.includes("on_release:")){const _=`
${y}on_release:
${y}  - if:
${y}      condition: lvgl.is_paused
${y}      then:
${y}        - lvgl.resume:
${y}        - lvgl.widget.redraw:
${y}        - light.turn_on: display_backlight`,v=n.search(/^touchscreen:/m);if(v!==-1){const w=n.slice(v).slice(12).match(/^\w/m);if(w){const E=v+12+w.index;n=n.slice(0,E)+_+`

`+n.slice(E)}else n=n.trimEnd()+_+`
`}}}}return n}function Nl(n,e){if(!e||e.trim()==="")return n;if(!n||n.trim()==="")return e;const i=["sensor:","binary_sensor:","text_sensor:","font:","image:","output:","light:","switch:","button:","script:","globals:","i2c:","spi:","external_components:","time:","interval:","fan:","cover:","climate:","number:","select:","datetime:","lock:","alarm_control_panel:","siren:","media_player:"],o=l=>{const c=new Map,d=l.split(`
`);let p=null,h=[],u=[];for(const m of d){const y=m.trim(),f=m.match(/^([a-z0-9_]+:)(\s*#.*)?$/),_=f&&!m.startsWith(" ")&&!m.startsWith("	"),v=_?f[1]:y;_&&i.includes(v)?(p&&c.set(p,h),p=v,h=[]):_&&!i.includes(v)?(p&&(c.set(p,h),p=null,h=[]),u.push(m)):p?h.push(m):u.push(m)}return p&&c.set(p,h),{sections:c,nonSectionLines:u}},t=o(n),s=o(e),r=new Map(t.sections);for(const[l,c]of s.sections)if(r.has(l)){const d=r.get(l);r.set(l,[...d,...c])}else r.set(l,c);const a=[];a.push(...t.nonSectionLines);for(const[l,c]of r)a.length>0&&a[a.length-1].trim()!==""&&a.push(""),a.push(l),a.push(...c);for(const l of s.nonSectionLines){const c=l.trim();if(c===""||c.startsWith("#"))continue;let d=!1;const p=l.match(/^([a-z0-9_]+:)(\s*#.*)?$/);if(p&&!l.startsWith(" ")){const h=p[1];d=t.nonSectionLines.some(u=>{const m=u.match(/^([a-z0-9_]+:)(\s*#.*)?$/);return m&&m[1]===h})}d||a.push(l)}return a.map(l=>l.trimEnd()).join(`
`)}function Hl(n){const e=(n.condition_entity||"").trim();if(!e)return"";const i=n.condition_operator||"==";let o=` cond_ent:"${e}" cond_op:"${i}"`;return n.condition_value&&(o+=` cond_val:"${n.condition_value}"`),n.condition_entity_2&&(o+=` cond_ent_2:"${n.condition_entity_2}"`),o+=` cond_inv:"${!!n.condition_invert}"`,o}function Fl(n){const e=(n.condition_entity||"").trim();if(!e)return null;const i=n.condition_operator||"==",o=e.startsWith("binary_sensor.")||e.startsWith("switch.")||e.startsWith("light."),t=["==","!=",">","<",">=","<="].includes(i),s=n.condition_value||"0.0";let r=`id(${e.replace(/\./g,"_")}).state`;const a=i==="=="||i==="!=",l=window.ESPHomeAdapter&&window.ESPHomeAdapter.isEntityStateNonNumeric?window.ESPHomeAdapter.isEntityStateNonNumeric(e):!0,c=isNaN(parseFloat(s));if(a&&(l||c)){if(r=`std::string(id(${e.replace(/\./g,"_")}).state)`,i==="==")return`${r} == "${s}"`;if(i==="!=")return`${r} != "${s}"`}const d=n.condition_invert?"false":"true";if(o){if(i==="==")return`${r} == ${d}`;if(i==="!=")return`${r} != ${d}`}if(t){if(i==="==")return`${r} == ${s}`;if(i==="!=")return`${r} != ${s}`;if(i===">")return`${r} > ${s}`;if(i==="<")return`${r} < ${s}`;if(i===">=")return`${r} >= ${s}`;if(i==="<=")return`${r} <= ${s}`}if(i==="compare_entity"&&n.condition_entity_2){const p=`id(${e.replace(/\./g,"_")}).state`,h=`id(${n.condition_entity_2.replace(/\./g,"_")}).state`;return`${p} == ${h}`}return null}function Gl(n){return n?n.replace(/\\/g,"\\\\").replace(/"/g,'\\"'):""}function Wl(n,e){if(n.type==="group")return[];const i=[],o=W?W.get(n.type):null,t=n.type&&n.type.startsWith("lvgl_");if(o&&typeof o.export=="function"){const s={...e,lines:i,addFont:(a,l,c,d)=>e.adapter.fonts.addFont(a,l,c,d),getColorConst:a=>ae?ae.getColorConst(a):`"${a}"`,getAlignX:(a,l,c)=>ae?ae.getAlignX(a,l,c):l,getAlignY:(a,l,c)=>ae?ae.getAlignY(a,l,c):l,addDitherMask:(a,l,c,d,p,h,u,m)=>ae?ae.addDitherMask(a,l,c,d,p,h,u,m||0):null,sanitize:a=>Gl(a),getCondProps:a=>Hl(a),getConditionCheck:a=>Fl(a),Utils:ae,COLORS:Vt,ALIGNMENT:qt,TEXT_Y_OFFSET:0,RECT_Y_OFFSET:0},r=o.export(n,s);r&&Array.isArray(r)?i.push(...r):r&&typeof r=="string"&&i.push(r)}else if(t)if(window.ESPHomeAdapter&&window.ESPHomeAdapter.serializeWidgetForFallback){const s=window.ESPHomeAdapter.serializeWidgetForFallback(n);i.push(s?s.replace(/[\r\n]+/g," "):"")}else{const s=`// widget:${n.type} id:${n.id} x:${n.x} y:${n.y} w:${n.width} h:${n.height}`;i.push(s.replace(/[\r\n]+/g," "))}else i.push(`// widget:${n.type} id:${n.id} status:unsupported`),i.push(`        // Unsupported widget type: ${n.type}`);return i}function $l(n,e,i,o,t){const s=[],r=i.features?.inverted_colors||e.invertedColors,a=!!(i.features&&(i.features.epaper||i.features.epd));return r?(s.push("const auto COLOR_WHITE = Color(0, 0, 0); // Inverted for e-ink"),s.push("const auto COLOR_BLACK = Color(255, 255, 255); // Inverted for e-ink")):(s.push("const auto COLOR_WHITE = Color(255, 255, 255);"),s.push("const auto COLOR_BLACK = Color(0, 0, 0);")),i.id==="esp32_s3_photopainter"||i.name&&i.name.includes("PhotoPainter")?(s.push("const auto COLOR_RED = Color(0, 0, 255);"),s.push("const auto COLOR_GREEN = Color(255, 128, 0);"),s.push("const auto COLOR_BLUE = Color(255, 255, 0);"),s.push("const auto COLOR_YELLOW = Color(0, 255, 0);"),s.push("const auto COLOR_ORANGE = Color(0, 0, 255); // Fallback to Red")):(s.push("const auto COLOR_RED = Color(255, 0, 0);"),s.push("const auto COLOR_GREEN = Color(0, 255, 0);"),s.push("const auto COLOR_BLUE = Color(0, 0, 255);"),s.push("const auto COLOR_YELLOW = Color(255, 255, 0);"),s.push("const auto COLOR_ORANGE = Color(255, 165, 0);")),s.push("auto color_off = COLOR_WHITE;"),s.push("auto color_on = COLOR_BLACK;"),s.push(""),s.push("// Helper to print text with word-wrap at widget boundary"),s.push("auto print_wrapped_text = [&](int x, int y, int max_w, int line_h, esphome::font::Font *font, Color color, TextAlign align, const char* text) {"),s.push("  if (!text || max_w <= 0) return;"),s.push("  int cx = x;"),s.push("  int cy = y;"),s.push("  std::string line;"),s.push("  std::string word;"),s.push("  const char* p = text;"),s.push("  while (*p) {"),s.push("    // SANITIZATION: Treat newlines, carriage returns, and tabs as spaces for flow"),s.push("    bool is_space = (*p == ' ' || *p == '\\n' || *p == '\\r' || *p == '\\t');"),s.push("    if (is_space) {"),s.push("      if (!word.empty()) {"),s.push("        int ww, wh, wbl, wx;"),s.push("        font->measure(word.c_str(), &ww, &wx, &wbl, &wh);"),s.push("        int lw = 0, lx;"),s.push('        if (!line.empty()) { font->measure(line.c_str(), &lw, &lx, &wbl, &wh); int sw, sx, sbl, sh; font->measure(" ", &sw, &sx, &sbl, &sh); lw += sw; }'),s.push("        if (lw + ww > max_w && !line.empty()) {"),s.push("          it.print(cx, cy, font, color, align, line.c_str());"),s.push("          cy += line_h;"),s.push("          line = word;"),s.push("        } else {"),s.push('          if (!line.empty()) line += " ";'),s.push("          line += word;"),s.push("        }"),s.push("        word.clear();"),s.push("      }"),s.push("    } else {"),s.push("      word += *p;"),s.push("    }"),s.push("    p++;"),s.push("  }"),s.push("  if (!word.empty()) {"),s.push("    int ww, wh, wbl, wx;"),s.push("    font->measure(word.c_str(), &ww, &wx, &wbl, &wh);"),s.push("    int lw = 0, lx;"),s.push('    if (!line.empty()) { font->measure(line.c_str(), &lw, &lx, &wbl, &wh); int sw, sx, sbl, sh; font->measure(" ", &sw, &sx, &sbl, &sh); lw += sw; }'),s.push("    if (lw + ww > max_w && !line.empty()) {"),s.push("      it.print(cx, cy, font, color, align, line.c_str());"),s.push("      cy += line_h;"),s.push("      line = word;"),s.push("    } else {"),s.push('      if (!line.empty()) line += " ";'),s.push("      line += word;"),s.push("    }"),s.push("  }"),s.push("  if (!line.empty()) {"),s.push("    it.print(cx, cy, font, color, align, line.c_str());"),s.push("  }"),s.push("};"),s.push(""),a&&(s.push("// Helper to apply a simple grey dither mask for e-paper (checkerboard)"),s.push("auto apply_grey_dither_mask = [&](int x_start, int y_start, int w, int h) {"),s.push("  for (int y = y_start; y < y_start + h; y++) {"),s.push("    for (int x = x_start; x < x_start + w; x++) {"),s.push("      if ((x + y) % 2 == 0) it.draw_pixel_at(x, y, COLOR_WHITE);"),s.push("      else it.draw_pixel_at(x, y, COLOR_BLACK);"),s.push("    }"),s.push("  }"),s.push("};"),s.push(""),s.push("// Helper to apply grey dither to text (subtractive - erases every other black pixel)"),s.push("auto apply_grey_dither_to_text = [&](int x_start, int y_start, int w, int h) {"),s.push("  for (int y = y_start; y < y_start + h; y++) {"),s.push("    for (int x = x_start; x < x_start + w; x++) {"),s.push("      if ((x + y) % 2 == 0) it.draw_pixel_at(x, y, COLOR_WHITE);"),s.push("    }"),s.push("  }"),s.push("};")),window.PluginRegistry&&window.PluginRegistry.onExportHelpers({lines:s,widgets:n.flatMap(l=>l.widgets||[])}),s.push("int currentPage = id(display_page);"),a||(s.push("static int last_rendered_page = -1;"),s.push("bool page_changed = (last_rendered_page != currentPage);"),s.push("if (page_changed) last_rendered_page = currentPage;")),n.forEach((l,c)=>{const d=l.name||`Page ${c+1}`;s.push("// ═══════════════════════════════════════════════════════════════"),s.push(`// ▸ PAGE: ${d}`),s.push("// ═══════════════════════════════════════════════════════════════"),s.push(`if (currentPage == ${c}) {`),s.push(`  // page:name "${d}"`),s.push(`  // page:dark_mode "${l.dark_mode||"inherit"}"`),s.push(`  // page:refresh_type "${l.refresh_type||"interval"}"`),s.push(`  // page:refresh_time "${l.refresh_time||""}"`),s.push(`  // page:visible_from "${l.visible_from||""}"`),s.push(`  // page:visible_to "${l.visible_to||""}"`);const p=l.dark_mode==="dark"||l.dark_mode==="inherit"&&e.darkMode;if(s.push("  // Clear screen for this page"),a?s.push(`  it.fill(${p?"COLOR_BLACK":"COLOR_WHITE"});`):(s.push("  if (page_changed) {"),s.push("    // Full clear on page change (prevents black artifacts)"),s.push(`    it.filled_rectangle(0, 0, it.get_width(), it.get_height(), ${p?"COLOR_BLACK":"COLOR_WHITE"});`),s.push("  } else {"),s.push("    // Fast clear for same-page updates"),s.push(`    it.fill(${p?"COLOR_BLACK":"COLOR_WHITE"});`),s.push("  }")),s.push(`  color_off = ${p?"COLOR_BLACK":"COLOR_WHITE"};`),s.push(`  color_on = ${p?"COLOR_WHITE":"COLOR_BLACK"};`),l.widgets){const h=l.widgets.filter(u=>!u.hidden&&u.type!=="group");h.forEach((u,m)=>{const y=Wl(u,{...o,layout:e,adapter:t,isEpaper:a,isDark:p});if(y.length>0){const f=y.reduce((v,S)=>{if(!S.trim())return v;const w=S.match(/^ */);return Math.min(v,w?w[0].length:0)},1/0),_=f===1/0?0:f;s.push(...y.map(v=>v.trim()?"  "+v.substring(_):"")),m<h.length-1&&s.push("  // ────────────────────────────────────────")}})}s.push("}")}),s}const Mo=["text_sensor.","weather.","calendar.","person.","device_tracker.","sun.","update.","scene."],Do=(n,e,i=null)=>{if(!n||!e?.entityStates)return!1;const o=e.entityStates[n];if(!o)return!1;const t=i?o.attributes?.[i]:o.state;if(t==null)return!1;const s=String(t).trim();return s===""?!1:isNaN(Number(s))},zl=(n,e)=>{const{seenEntityIds:i,seenSensorIds:o,appState:t}=e,s=n.flatMap(a=>(a.widgets||[]).filter(l=>!l.hidden)),r=[];return s.forEach(a=>{let l=(a.entity_id||"").trim();const c=a.props||{};if(!l||c.is_local_sensor||(["progress_bar","sensor_text","graph","battery_icon","wifi_signal","ondevice_temperature","ondevice_humidity"].includes(a.type)&&!l.includes(".")&&(l=`sensor.${l}`),a.type==="sensor_text"&&(c.is_text_sensor||c.attribute&&Do(l,t,c.attribute)))||a.type==="calendar")return;const p=l.includes(".")&&!l.startsWith("binary_sensor.")&&!Mo.some(m=>l.startsWith(m)),u=["switch.","light.","fan.","input_boolean.","cover.","lock."].some(m=>l.startsWith(m));if(p&&!u){const m=(c.attribute||"").trim(),y=m?`${l}__attr__${m}`:l;if(!i.has(y)){let f=m?(l+"_"+m).replace(/[^a-zA-Z0-9_]/g,"_"):l.replace(/[^a-zA-Z0-9_]/g,"_");f.length>63&&(f=f.substring(0,63)),o.has(f)||(i.add(y),o.add(f),r.push("- platform: homeassistant"),r.push(`  id: ${f}`),r.push(`  entity_id: ${l}`),m&&r.push(`  attribute: ${m}`),r.push("  internal: true"))}}}),r},Ul=(n,e)=>{const{seenEntityIds:i,seenSensorIds:o,appState:t}=e,s=n.flatMap(a=>(a.widgets||[]).filter(l=>!l.hidden)),r=[];return s.forEach(a=>{const l=(a.condition_entity||"").trim(),c=(a.entity_id||"").trim(),d=(a.entity_id_2||"").trim(),p=a.props||{};[{ent:l,attr:p.attribute},{ent:c,attr:p.attribute},{ent:d,attr:p.attribute2}].forEach(({ent:h,attr:u})=>{if(!h||p.is_local_sensor)return;const m=Mo.some(v=>h.startsWith(v));let y=!1;if(h===l&&a.condition_operator!=="range"){const v=a.condition_state,S=(v||"").toLowerCase(),w=["on","off","true","false","online","offline"];v&&isNaN(Number(v))&&!w.includes(S)&&(y=!0)}const f=(u||"").trim(),_=(h===c||h===d)&&f&&Do(h,t,f);if(m||y||_){const S=f.includes(".")||f.includes("[")?f.split(/[.\[]/)[0]:f,w=S?`${h}__attr__${S}`:h;if(!i.has(w)){const x=(S?h+"_"+S:h).replace(/[^a-zA-Z0-9_]/g,"_")+"_txt";o.has(x)||(i.add(w),o.add(x),r.push("- platform: homeassistant"),r.push(`  id: ${x}`),r.push(`  entity_id: ${h}`),S&&r.push(`  attribute: ${S}`),r.push("  internal: true"))}}})}),r},jl=(n,e)=>{const{seenEntityIds:i,seenSensorIds:o}=e,t=n.flatMap(a=>(a.widgets||[]).filter(l=>!l.hidden)),s=["binary_sensor.","switch.","light.","input_boolean.","fan.","cover.","vacuum.","lock."],r=[];return t.forEach(a=>{const l=(a.condition_entity||"").trim(),c=(a.entity_id||"").trim();[l,c].forEach(d=>{if(!d)return;if(s.some(h=>d.startsWith(h))&&!i.has(d)){const h=d.replace(/[^a-zA-Z0-9_]/g,"_");o.has(h)||(i.add(d),o.add(h),r.push("- platform: homeassistant"),r.push(`  id: ${h}`),r.push(`  entity_id: ${d}`),r.push("  internal: true"))}})}),r},Yl=n=>{if(!n)return"";const e=["esphome:","esp32:","psram:","wifi:","api:","ota:","logger:","web_server:","captive_portal:","platformio_options:","preferences:","substitutions:","deep_sleep:"],i=n.split(`
`),o=[];let t=!1;for(let s of i){const r=s.trim();if(r.length===0){o.push(s);continue}(s.match(/^\s*/)||[""])[0].length===0&&r.endsWith(":")?(t=e.some(l=>r.startsWith(l)),t?o.push("# "+s+" # (Auto-commented)"):o.push(s)):t?o.push("# "+s):o.push(s)}return o.join(`
`)},Vl=(n,e,i,o,t,s,r)=>{const a=/^(\s*)# __LAMBDA_PLACEHOLDER__/m,l=n.match(a),c=s;if(l){const y=l[1],f="# __LAMBDA_PLACEHOLDER__",_=new RegExp(`lambda:\\s*\\|-\\s*[\\r\\n]+\\s*${f.replace("#","\\#")}`).test(n);if(c)n=n.replace(a,"");else{const v=(_?"":y+`lambda: |-
`)+e.map(S=>S.trim()?y+"  "+S:"").join(`
`);n=n.replace(a,v)}}const d=/^(\s*)# __TOUCH_SENSORS_PLACEHOLDER__/m,p=n.match(d);if(p&&i&&i.length>0){const y=i.filter(f=>f.trim()!=="").join(`
`);n=n.replace(d,y)}else p&&(n=n.replace(d,""));n=Bl(n,o,t.orientation,c,t);const h=Yl(n),u=[];let m=!1;for(const y of r){const f=y.trim();f.endsWith(":")&&!y.startsWith(" ")&&(m=f==="display:"),m||u.push(y)}return Nl(h,u.join(`
`))};class Oo extends Ge{constructor(){super(),this.fonts=new Ol,this.yaml=new Rl,this.reset()}reset(){this.fonts&&this.fonts.reset(),this.usedPlugins=new Set}async generate(e){if(!e)return console.error("ESPHomeAdapter: Missing layout"),"";this.reset();const i=e.pages||[],o=e.deviceModel||(g?g.deviceModel:null)||window.currentDeviceModel||"reterminal_e1001",t=R||{},s=window.DEVICE_PROFILES||{};let a={...t,...s}[o]||{};if(o==="custom"&&e.customHardware){const x=e.customHardware;a={id:"custom",name:"Custom Device",chip:x.chip||"esp32-s3",displayPlatform:x.displayDriver||"generic_st7789",displayModel:x.displayModel,resolution:{width:x.resWidth||800,height:x.resHeight||480},shape:x.shape||"rect",pins:{i2c:x.pins?.sda?{sda:x.pins.sda,scl:x.pins.scl}:null,spi:x.pins?.clk?{clk:x.pins.clk,mosi:x.pins.mosi}:null,display:{cs:x.pins?.cs,dc:x.pins?.dc,reset:x.pins?.rst,busy:x.pins?.busy}},features:{psram:!!x.psram,lcd:x.tech==="lcd",epaper:x.tech==="epaper",touch:x.touchTech&&x.touchTech!=="none"},backlight:x.pins?.backlight?{platform:"gpio",pin:x.pins.backlight}:null,touch:x.touchTech&&x.touchTech!=="none"?{platform:x.touchTech,sda:x.pins?.sda,scl:x.pins?.scl,interrupt_pin:x.pins?.touch_int,reset_pin:x.pins?.touch_rst}:null}}let l=!!(a.features&&(a.features.lvgl||a.features.lv_display));const c=e.renderingMode||(g?g.settings?.renderingMode:null);if(c==="direct"?(l=!1,b.log("[ESPHomeAdapter] Rendering mode set to 'direct', skipping LVGL generation")):c==="lvgl"&&(l=!0,b.log("[ESPHomeAdapter] Rendering mode set to 'lvgl', forcing LVGL generation")),!l)for(const x of i){if(x.widgets){for(const I of x.widgets.filter(k=>!k.hidden))if(I.type.startsWith("lvgl_")){l=!0;break}}if(l)break}const d=[];e.isSelectionSnippet||(d.push(...this.yaml.generateInstructionHeader(a,e)),d.push(...this.yaml.generateSystemSections(a,e)),d.push(""));const p=a.features?.lcd?"my_display":"epaper_display";this.preProcessWidgetsPromise=this.preProcessWidgets(i),await this.preProcessWidgetsPromise;let h=null;a.isPackageBased&&(a.isOfflineImport&&a.content?h=a.content:a.hardwarePackage&&(h=await this.fetchHardwarePackage(a.hardwarePackage)));const u=[];i.forEach((x,I)=>{x.widgets&&x.widgets.forEach(k=>{k.hidden||(k._pageIndex=I,u.push(k))})});const m=new Set,y=new Set,f=new Set,_=new Map,v={widgets:u,profile:a,layout:e,displayId:p,adapter:this,isLvgl:l,seenEntityIds:m,seenSensorIds:y,seenTextEntityIds:f,pendingTriggers:_,appState:window.AppState};if(W){const x=[],I=[];W.onExportEsphome({...v,lines:I}),x.push("- id: display_page","  type: int","  restore_value: false","  initial_value: '0'");const k=!!(a.features&&(a.features.epaper||a.features.epd)),P=!!(a.features&&a.features.lcd)||!k,A=e.refreshInterval||(P?60:e.deepSleepInterval||600);x.push("- id: page_refresh_default_s","  type: int","  restore_value: true",`  initial_value: '${A}'`),x.push("- id: page_refresh_current_s","  type: int","  restore_value: false","  initial_value: '60'"),x.push("- id: last_page_switch_time","  type: uint32_t","  restore_value: false","  initial_value: '0'"),W.onExportGlobals({...v,lines:x}),I.length>0&&(e.plugin_includes=I),a.isPackageBased||(d.length=0,e.isSelectionSnippet||(d.push(...this.yaml.generateInstructionHeader(a,e)),d.push(...this.yaml.generateSystemSections(a,e)),d.push(""))),x.length>0&&!e.isSelectionSnippet&&(d.push("globals:"),d.push(...x.map(O=>"  "+O))),!(h&&h.includes("psram:"))&&a.features?.psram&&Qn&&d.push(...Qn(a)),!a.isPackageBased&&!e.isSelectionSnippet?(d.push("http_request:","  verify_ssl: false","  timeout: 20s","  buffer_size_rx: 4096"),qn&&d.push(...qn(a)),Xn&&d.push(...Xn(a)),Vn&&d.push(...Vn(a)),ei&&d.push(...ei(a)),ti&&d.push(...ti(a)),Yn&&d.push(...Yn(a)),ni&&d.push(...ni(a)),ii&&d.push(...ii(a)),d.some(F=>String(F).split(`
`).some(J=>J.trim()==="time:"))||(d.push("time:","  - platform: homeassistant","    id: ha_time"),y.add("ha_time"))):e.isSelectionSnippet||d.some(F=>String(F).split(`
`).some(J=>J.trim()==="time:"))||(d.push("time:","  - platform: homeassistant","    id: ha_time"),y.add("ha_time")),a.features&&(a.pins?.batteryAdc&&(y.add("battery_voltage"),y.add("battery_level")),a.features.sht4x&&(y.add("sht4x_sensor"),y.add("sht4x_temperature"),y.add("sht4x_humidity")),(a.features.sht3x||a.features.sht3xd)&&(y.add("sht3x_sensor"),y.add("sht3x_temperature"),y.add("sht3x_humidity")),a.features.shtc3&&(y.add("shtc3_sensor"),y.add("shtc3_temperature"),y.add("shtc3_humidity"))),Jn&&d.push(...Jn(a,[],p,u));const N=[];W.onExportNumericSensors({...v,lines:N,mainLines:d});const H=this.processPendingTriggers(N,_,l,"on_value");H.length>0&&(d.some(O=>O==="sensor:")||d.push("sensor:"),d.push(...H.flatMap(O=>O.split(`
`).map(F=>"  "+F))));const B=zl(i,v);if(B.length>0){d.some(F=>F==="sensor:")||d.push("sensor:");const O=this.processPendingTriggers(B,_,l,"on_value");d.push(...O.flatMap(F=>F.split(`
`).map(J=>"  "+J)))}const $=Ul(i,v),re=[];W.onExportTextSensors({...v,lines:re}),$.length>0&&re.push(...$);const te=this.processPendingTriggers(re,_,l,"on_value");te.length>0&&(d.push("text_sensor:"),d.push(...te.flatMap(O=>O.split(`
`).map(F=>"  "+F))));const U=[];if(!a.isPackageBased&&ot){const O=ot(a,i.length,p,[]);O.length>0&&O[0].trim()==="binary_sensor:"?U.push(...O.slice(1).map(F=>F.startsWith("  ")?F.slice(2):F)):U.push(...O)}const se=u.filter(O=>O.type==="touch_area"||O.type==="template_nav_bar");let ie=[];if(se.length>0&&ot){const O=ot({features:{}},i.length,p,se);if(O.length>0){const F=O[0]?.trim()==="binary_sensor:"?1:0;O.length>F&&(a.isPackageBased?ie=O.slice(F):(U.push("# Touch Area Binary Sensors"),U.push(...O.slice(F).map(J=>J.startsWith("  ")?J.slice(2):J))))}}this._pendingTouchSensors=ie,W.onExportBinarySensors({...v,lines:U});const G=this.processPendingTriggers(U,_,l,"on_state");G.length>0&&!a.isPackageBased&&(d.push("binary_sensor:"),d.push(...G.flatMap(O=>O.split(`
`).map(F=>"  "+F))));const le=jl(i,v);if(le.length>0){d.some(F=>F==="binary_sensor:")||d.push("binary_sensor:");const O=this.processPendingTriggers(le,_,l,"on_state");d.push(...O.flatMap(F=>F.split(`
`).map(J=>"  "+J)))}if(!a.isPackageBased&&Zn){const O=Zn(a,i.length,p);O.length>0&&d.push(...O)}const Y=W.getAll(),We=["image","online_image","graph","qr_code"];Y.sort((O,F)=>{const J=We.indexOf(O.id),Se=We.indexOf(F.id);return J!==-1&&Se!==-1?J-Se:J!==-1?-1:Se!==-1?1:O.id.localeCompare(F.id)}),Y.forEach(O=>O.onExportComponents&&O.onExportComponents({...v,lines:d}))}const S=$l(i,e,a,v,this);d.push(...this.fonts.getLines(e.glyphsets,e.extendedLatinGlyphs));const w=this.yaml.generateScriptSection(e,i,a);w.length>0&&d.push(...w);let E=!1;if(l&&si){const x=si(i,o,a,e);x&&x.length>0&&(d.push(...x),E=!0)}if(a.isPackageBased){if(h)return Vl(h,S,this._pendingTouchSensors,a,e,l,d)}else{const x=Kn?Kn(a,e,l):[];d.push(...x);for(let I=0;I<d.length;I++)if(d[I].trim()==="display:"){let k=I+1;for(;k<d.length&&(d[k].startsWith("  ")||d[k].trim()==="");)k++;E||d.splice(k,0,"    lambda: |-",...S.map(P=>P.trim()?"      "+P:""));break}}return d.map(x=>x.trimEnd()).join(`
`)}async preProcessWidgets(e){for(const i of e)if(i.widgets)for(const o of i.widgets.filter(t=>!t.hidden&&t.type!=="group")){const t=o.type,s=W?await W.load(t):null;s&&(this.usedPlugins.add(s),typeof s.collectRequirements=="function"&&s.collectRequirements(o,{trackIcon:(r,a)=>this.fonts.trackIcon(r,a),addFont:(r,a,l,c)=>this.fonts.addFont(r,a,l,c)}))}}processPendingTriggers(e,i,o,t="on_value"){if(!o||!i||i.size===0)return e;const s=[];let r=null;for(let a=0;a<e.length;a++){const l=e[a],c=l.trim();s.push(l);const d=l.match(/^\s*(entity_id|id):\s*"?([^"]+)"?/);if(d){const p=d[2].trim();if(i.has(p)){let u=!1;const m=(l.match(/^\s*/)||[""])[0].length;for(let y=a+1;y<e.length;y++){const f=e[y],_=f.trim();if(!_)continue;if((f.match(/^\s*/)||[""])[0].length<=m&&_.startsWith("-"))break;if(_===`${t}:`){u=!0;break}}if(u)r={triggers:i.get(p),active:!0};else{const y=" ".repeat(m);s.push(`${y}${t}:`),s.push(`${y}  then:`);for(const f of i.get(p))f.split(`
`).forEach(v=>{s.push(`${y}    ${v}`)})}}}if(r&&r.active){if(c===`${t}:`)r.foundKey=!0;else if(r.foundKey){if(c==="then:"){const p=" ".repeat((l.match(/^\s*/)||[""])[0].length+2);for(const h of r.triggers)h.split(`
`).forEach(m=>{s.push(`${p}${m}`)});r=null}else if(c.startsWith("-")){const p=" ".repeat((l.match(/^\s*/)||[""])[0].length);for(const h of r.triggers)h.split(`
`).forEach(m=>{s.push(`${p}${m}`)});r=null}}}}return s}async fetchHardwarePackage(e){let i=e;window.location.pathname.includes("/esphome-designer/editor")&&!e.startsWith("http")&&!e.startsWith("/")&&(i="/esphome-designer/editor/static/"+e);try{const o=await fetch(i,{cache:"no-store"});if(!o.ok)throw new Error(`HTTP ${o.status}`);return await o.text()}catch(o){return b.error("Failed to fetch hardware package:",o),`# ERROR LOADING PROFILE: ${o.message}`}}}window.ESPHomeAdapter=Oo;class Ro extends Ge{constructor(){super()}async generate(e){if(!e)return console.error("OEPLAdapter: Missing layout"),"[]";const i=e.pages||[],o=e.currentPageIndex||0,t=i[o];if(!t||!t.widgets)return"[]";const s=[];t.widgets.forEach(u=>{if(u.hidden||u.type==="group")return;const m=this.generateWidget(u,{layout:e,page:t});m&&(Array.isArray(m)?m:[m]).forEach(f=>{f&&typeof f=="object"&&!f.id&&(f.id=u.id),s.push(f)})});const a=(e.orientation||"landscape")==="portrait"?90:0,l=e.protocolHardware||{},c=(l.colorMode==="bw"||l.colorMode==="grayscale",e.darkMode?"black":"white"),h={service:"open_epaper_link.drawcustom",target:{entity_id:(e.settings||{}).oeplEntityId||"open_epaper_link.0000000000000000"},data:{background:c,rotate:a,dither:2,ttl:60,payload:s}};return JSON.stringify(h,null,2)}generateWidget(e,i){const o=W?W.get(e.type):null;if(o&&typeof o.exportOEPL=="function")try{return o.exportOEPL(e,i)}catch(t){return b.error(`Error in exportOEPL for ${e.type}:`,t),null}else return this._warnedTypes||(this._warnedTypes=new Set),this._warnedTypes.has(e.type)||(b.warn(`Widget type "${e.type}" does not support OEPL export yet.`),this._warnedTypes.add(e.type)),null}}window.OEPLAdapter=Ro;class Bo extends Ge{constructor(){super()}async generate(e){if(!e)return b.error("OpenDisplayAdapter: Missing layout"),"";const i=e.pages||[],o=e.currentPageIndex||0,t=i[o];if(!t||!t.widgets)return"";const s=[];e.protocolHardware;const a=t.dark_mode==="dark"||t.dark_mode==="inherit"&&e.darkMode?"black":"white";t.widgets.forEach(u=>{if(u.hidden||u.type==="group")return;const m=this.generateWidget(u,{layout:e,page:t});m&&(Array.isArray(m)?m:[m]).forEach(f=>{f&&typeof f=="object"&&!f.id&&(f.id=u.id),s.push(f)})});const c=(e.orientation||"landscape")==="portrait"?90:0,d=e.settings||{},p=d.opendisplayEntityId||"opendisplay.0000000000000000";let h=`service: opendisplay.drawcustom
`;return h+=`target:
  entity_id: ${p}
`,h+=`data:
`,h+=`  background: "${a}"
`,h+=`  rotate: ${c}
`,h+=`  dither: ${d.opendisplayDither??2}
`,h+=`  ttl: ${d.opendisplayTtl||60}
`,h+=`  payload: |-
`,s.forEach(u=>{const m=u.id?`
    # id: ${u.id}`:"";h+=`${m}
    - type: ${u.type}
`,Object.entries(u).forEach(([y,f])=>{if(y==="type"||y==="id")return;let _=f;typeof f=="string"?(f.includes(`
`)||f.includes(":"))&&(_=`"${f.replace(/"/g,'\\"')}"`):(Array.isArray(f)||typeof f=="object"&&f!==null)&&(_=JSON.stringify(f)),h+=`      ${y}: ${_}
`})}),h}generateWidget(e,i){const o=W?W.get(e.type):null;if(o&&typeof o.exportOpenDisplay=="function")try{return o.exportOpenDisplay(e,i)}catch(t){return b.error(`Error in exportOpenDisplay for ${e.type}:`,t),null}else return this._warnedTypes||(this._warnedTypes=new Set),this._warnedTypes.has(e.type)||(b.warn(`Widget type "${e.type}" does not support OpenDisplay export yet.`),this._warnedTypes.add(e.type)),null}}window.OpenDisplayAdapter=Bo;window.LAYOUT={WIDGET:{SMALL:{W:100,H:20},MEDIUM:{W:200,H:60},LARGE:{W:200,H:100}},FONT:{SIZE:{XS:12,S:14,M:16,L:20,XL:28,XXL:40},DEFAULT:{LABEL:14,VALUE:20,TITLE:28,DATE:16}},GRID:{GAP:10,MARGIN:10}};Object.freeze(window.LAYOUT);class ql{constructor(){this.modal=null,this.currentLayoutId="reterminal_e1001",this.layouts=[]}init(){this.createModal(),this.bindButton(),b.log("[LayoutManager] Initialized")}bindButton(){const e=document.getElementById("manageLayoutsBtn");e&&e.addEventListener("click",()=>this.open())}createModal(){if(document.getElementById("layoutManagerModal")){this.modal=document.getElementById("layoutManagerModal");return}const e=document.createElement("div");e.id="layoutManagerModal",e.className="modal-backdrop hidden",e.innerHTML=`
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
        `,document.body.appendChild(e),this.modal=e,document.getElementById("layoutManagerClose").addEventListener("click",()=>this.close()),document.getElementById("layoutManagerNew").addEventListener("click",()=>this.showNewLayoutDialog()),document.getElementById("layoutManagerImport").addEventListener("click",()=>{document.getElementById("layoutManagerFileInput").click()}),document.getElementById("layoutManagerFileInput").addEventListener("change",i=>this.handleFileImport(i)),e.addEventListener("click",i=>{i.target===e&&this.close()})}async open(){this.modal||this.createModal(),this.modal.classList.remove("hidden"),await this.loadLayouts()}close(){this.modal&&this.modal.classList.add("hidden")}setStatus(e,i="info"){const o=document.getElementById("layoutManagerStatus");if(o){const t={success:"var(--success, #22c55e)",error:"var(--danger, #ef4444)",info:"var(--muted, #888)"};o.textContent=e,o.style.color=t[i]||t.info,e&&setTimeout(()=>{o.textContent=""},5e3)}}async loadLayouts(){if(typeof z!="function"||!z()){this.setStatus("Not connected to Home Assistant","error");return}try{const e=await fetch(`${V}/layouts`);if(!e.ok)throw new Error(`Failed to load layouts: ${e.status}`);const i=await e.json();this.layouts=i.layouts||[],i.last_active_layout_id&&this.layouts.some(o=>o.id===i.last_active_layout_id)&&(!window.AppState?.currentLayoutId||window.AppState.currentLayoutId==="reterminal_e1001")&&this.layouts.find(t=>t.id===i.last_active_layout_id)&&i.last_active_layout_id!==window.AppState?.currentLayoutId&&(b.log(`[LayoutManager] Syncing to last active layout: ${i.last_active_layout_id}`),this.currentLayoutId=i.last_active_layout_id,window.AppState&&typeof window.AppState.setCurrentLayoutId=="function"&&window.AppState.setCurrentLayoutId(i.last_active_layout_id)),this.renderLayoutList()}catch(e){b.error("[LayoutManager] Error loading layouts:",e),this.setStatus("Failed to load layouts","error")}}renderLayoutList(){const e=document.getElementById("layoutManagerTableBody"),i=document.getElementById("layoutManagerCurrentName");if(!e)return;window.AppState&&window.AppState.currentLayoutId&&(this.currentLayoutId=window.AppState.currentLayoutId);const o=this.layouts.find(t=>t.id===this.currentLayoutId);if(i&&(i.textContent=o?o.name:this.currentLayoutId),this.layouts.length===0){e.innerHTML='<tr><td colspan="4" style="text-align: center; color: var(--muted); padding: 16px;">No layouts found</td></tr>';return}e.innerHTML=this.layouts.map(t=>{const s=t.id===this.currentLayoutId,r=this.layouts.filter(a=>a.name===t.name).length>1;return`
                <tr style="border-bottom: 1px solid var(--border-subtle); ${s?"background: var(--accent-soft);":""}">
                    <td style="padding: 8px 4px;">
                        <span style="font-weight: 500;">${this.escapeHtml(t.name)}</span>
                        ${s?'<span style="background: var(--accent); color: white; font-size: 9px; padding: 2px 4px; border-radius: 2px; margin-left: 4px;">current</span>':""}
                        ${r?'<br><span style="font-size: 9px; color: var(--muted);">'+this.escapeHtml(t.id)+"</span>":""}
                    </td>
                    <td style="padding: 8px 4px; font-size: 11px; color: var(--muted);">${this.getDeviceDisplayName(t.device_model||t.device_type)}</td>
                    <td style="padding: 8px 4px; font-size: 11px; color: var(--muted);">${t.page_count} pages</td>
                    <td style="padding: 8px 4px; text-align: right;">
                        <div style="display: flex; gap: 4px; justify-content: flex-end;">
                            ${s?"":`<button class="btn btn-sm btn-primary" style="font-size: 10px; padding: 4px 8px;" onclick="window.layoutManager.loadLayout('${t.id}')">Load</button>`}
                            <button class="btn btn-sm btn-secondary" style="font-size: 10px; padding: 4px 8px;" onclick="window.layoutManager.exportLayout('${t.id}')">📤</button>
                            ${!s&&this.layouts.length>1?`<button class="btn btn-sm btn-secondary" style="font-size: 10px; padding: 4px 8px; color: var(--danger);" onclick="window.layoutManager.deleteLayout('${t.id}', '${this.escapeHtml(t.name)}')">🗑</button>`:""}
                        </div>
                    </td>
                </tr>
            `}).join("")}escapeHtml(e){const i=document.createElement("div");return i.textContent=e||"",i.innerHTML}getDeviceDisplayName(e){if(R&&R[e]){let t=R[e].name;return(ut||[]).includes(e)||(t+=" (untested)"),t}return{reterminal_e1001:"E1001 (Mono)",reterminal_e1002:"E1002 (Color)",trmnl:"TRMNL",esp32_s3_photopainter:"PhotoPainter (7-Color)"}[e]||e||"Unknown"}async loadLayout(e){if(!(typeof z!="function"||!z()))try{this.setStatus("Loading layout...","info");const i=await fetch(`${V}/layouts/${e}`);if(!i.ok)throw new Error(`Failed to load layout: ${i.status}`);const o=await i.json();o.device_id||(o.device_id=e),this.currentLayoutId=e,window.AppState&&typeof window.AppState.setCurrentLayoutId=="function"&&(window.AppState.setCurrentLayoutId(e),b.log(`[LayoutManager] Set currentLayoutId to: ${e}`));const t=document.getElementById("canvas");if(t){const s=t.querySelector(".canvas-grid");t.innerHTML="",s&&t.appendChild(s),b.log("[LayoutManager] Cleared canvas before loading layout")}document.querySelectorAll(".graph-axis-label").forEach(s=>s.remove()),typeof we=="function"&&we(o),window.AppState&&window.AppState.currentLayoutId!==e&&(window.AppState.setCurrentLayoutId(e),b.log(`[LayoutManager] Re-set currentLayoutId to: ${e} (was changed by loadLayoutIntoState)`)),typeof L=="function"&&typeof C<"u"&&L(C.LAYOUT_IMPORTED,o),this.setStatus(`Loaded: ${o.name||e}`,"success"),this.renderLayoutList(),setTimeout(()=>this.close(),500)}catch(i){b.error("[LayoutManager] Error loading layout:",i),this.setStatus("Failed to load layout","error")}}async exportLayout(e){if(!(typeof z!="function"||!z()))try{const i=`${V}/export?id=${e}`,o=document.createElement("a");o.href=i,o.download=`${e}_layout.json`,document.body.appendChild(o),o.click(),document.body.removeChild(o),this.setStatus("Export started...","success")}catch(i){b.error("[LayoutManager] Error exporting layout:",i),this.setStatus("Failed to export layout","error")}}async deleteLayout(e,i){if(!(typeof z!="function"||!z()||!confirm(`Are you sure you want to delete "${i}"?

This cannot be undone.`))){this.setStatus("Deleting layout...","info");try{const t=await fetch(`${V}/layouts/${e}`,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify({action:"delete"})});if(!t.ok){const s=await t.json().catch(()=>({}));if(s.error==="cannot_delete_last_layout"){this.setStatus("Cannot delete the last layout","error");return}throw new Error(s.error||`Delete failed: ${t.status}`)}this.setStatus(`Deleted: ${i}`,"success"),await this.loadLayouts()}catch(t){b.warn("[LayoutManager] Network error during delete, verifying if operation completed..."),await new Promise(r=>setTimeout(r,1500)),await this.loadLayouts(),this.layouts.some(r=>r.id===e)?(b.error("[LayoutManager] Error deleting layout:",t),this.setStatus("Failed to delete layout","error")):(b.log("[LayoutManager] Layout was successfully deleted (verified after refresh)"),this.setStatus(`Deleted: ${i}`,"success"))}}}showNewLayoutDialog(){if(!document.getElementById("newLayoutModal")){const s=document.createElement("div");s.id="newLayoutModal",s.className="modal-backdrop hidden",s.innerHTML=`
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
            `,document.body.appendChild(s),document.getElementById("newLayoutClose").addEventListener("click",()=>{s.classList.add("hidden")}),document.getElementById("newLayoutCancel").addEventListener("click",()=>{s.classList.add("hidden")}),document.getElementById("newLayoutConfirm").addEventListener("click",()=>{this.handleCreateLayoutConfirm()}),document.getElementById("newLayoutName").addEventListener("keydown",r=>{r.key==="Enter"?(r.preventDefault(),this.handleCreateLayoutConfirm()):r.key==="Escape"&&s.classList.add("hidden"),r.stopPropagation()}),s.addEventListener("click",r=>{if(r.target===s){const a=document.getElementById("newLayoutName");document.activeElement!==a&&s.classList.add("hidden")}})}const e=document.getElementById("newLayoutName"),o=`Layout ${this.layouts.length+1}`;e.value=o,g.deviceModel||g.settings&&g.settings.device_model;const t=R?Object.keys(R)[0]:"reterminal_e1001";document.getElementById("newLayoutDeviceType").value=t,document.getElementById("newLayoutModal").classList.remove("hidden"),setTimeout(()=>e.focus(),100)}handleCreateLayoutConfirm(){const e=document.getElementById("newLayoutName").value.trim(),i=document.getElementById("newLayoutDeviceType").value;if(!e){alert("Please enter a layout name.");return}document.getElementById("newLayoutModal").classList.add("hidden"),this.createLayout(e,i)}generateDeviceOptions(){if(R){const e=ut||[];return Object.entries(R).map(([i,o])=>{let t=o.name;return e.includes(i)||(t+=" (untested)"),`<option value="${i}">${t}</option>`}).join("")}return'<option value="reterminal_e1001">reTerminal E1001</option>'}async createLayout(e,i="reterminal_e1001"){if(typeof z!="function"||!z())return;let o=e.toLowerCase().replace(/\s+/g,"_").replace(/[^a-z0-9_]/g,"");o||(o="layout");const t=o+"_"+Date.now();this.setStatus("Creating layout...","info");let s=!1;try{const r=await fetch(`${V}/layouts`,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify({id:t,name:e,device_type:i,device_model:i})});if(!r.ok){const a=await r.json().catch(()=>({}));throw new Error(a.error||`Create failed: ${r.status}`)}s=!0}catch(r){if(b.warn("[LayoutManager] Network error during create, verifying if operation completed..."),await new Promise(l=>setTimeout(l,1500)),await this.loadLayouts(),this.layouts.some(l=>l.id===t))b.log("[LayoutManager] Layout was successfully created (verified after refresh)"),s=!0;else{b.error("[LayoutManager] Error creating layout:",r),this.setStatus("Failed to create layout","error");return}}if(s){this.setStatus(`Created: ${e}`,"success"),await this.loadLayouts();const r=R[i],a=r&&r.features&&r.features.epaper,l=r&&r.features&&r.features.lvgl,c=a&&!l?"direct":"lvgl";b.log(`[LayoutManager] New layout ${t} detected device type. isEpaper=${a}, hasLvgl=${l}. Setting initial renderingMode to: ${c}`),window.AppState&&(window.AppState.setPages([{id:"page_0",name:"Page 1",widgets:[]}]),window.AppState.setCurrentPageIndex(0),window.AppState.updateSettings({renderingMode:c,device_model:i}),b.log("[LayoutManager] Cleared state and set initial settings before loading new layout")),await this.loadLayout(t),window.AppState&&(window.AppState.setDeviceModel(i),window.currentDeviceModel=i,typeof L=="function"&&typeof C<"u"&&L(C.STATE_CHANGED),b.log(`[LayoutManager] Created layout '${t}' with device_model: ${i}, pages: ${window.AppState.pages?.length}, widgets: ${window.AppState.getCurrentPage()?.widgets?.length||0}`))}}async handleFileImport(e){const i=e.target.files[0];if(i){try{const o=await i.text(),t=JSON.parse(o);if(!t.pages&&!t.device_id){this.setStatus("Invalid layout file","error");return}await this.importLayout(t)}catch(o){b.error("[LayoutManager] Error importing file:",o),this.setStatus("Failed to import file: "+o.message,"error")}e.target.value=""}}async importLayout(e,i=!1){if(!(typeof z!="function"||!z()))try{const o=`${V}/import${i?"?overwrite=true":""}`,t=await fetch(o,{method:"POST",headers:de(),body:JSON.stringify(e)}),s=await t.json();if(!t.ok){if(s.error==="layout_exists"){if(confirm(`A layout with ID "${s.existing_id}" already exists.

Do you want to overwrite it?`)){await this.importLayout(e,!0);return}return}throw new Error(s.error||`Import failed: ${t.status}`)}this.setStatus(`Imported: ${s.name||s.id}`,"success"),await this.loadLayouts()}catch(o){b.error("[LayoutManager] Error importing layout:",o),this.setStatus("Failed to import layout","error")}}}window.layoutManager=new ql;function Yt(){const n=document.getElementById("resizer-left"),e=document.getElementById("resizer-right"),i=document.querySelector(".sidebar"),o=document.querySelector(".right-panel");if(document.querySelector(".app-content"),!n||!e||!i||!o){b.warn("[Splitters] Layout elements not found, retrying..."),setTimeout(Yt,500);return}b.log("[Splitters] Initializing draggable panels...");function t(a,l,c){let d,p;a.addEventListener("mousedown",function(h){c==="vertical"?(d=h.clientX,p=l.offsetWidth,document.body.style.cursor="col-resize"):(d=h.clientY,p=l.offsetHeight,document.body.style.cursor="row-resize"),a.classList.add("dragging"),document.body.style.userSelect="none";function u(y){let f;if(c==="vertical"){f=y.clientX-d,a.id==="resizer-right"&&(f=-f);const _=p+f,v=parseInt(getComputedStyle(l).minWidth)||100,S=parseInt(getComputedStyle(l).maxWidth)||800;_>=v&&_<=S&&(l.style.width=_+"px")}else{f=d-y.clientY;const _=p+f,v=parseInt(getComputedStyle(l).minHeight)||50,S=parseInt(getComputedStyle(l).maxHeight)||800;_>=v&&_<=S&&(l.style.height=_+"px")}window.dispatchEvent&&window.dispatchEvent(new Event("resize"))}function m(){a.classList.remove("dragging"),document.body.style.cursor="default",document.body.style.userSelect="",window.removeEventListener("mousemove",u),window.removeEventListener("mouseup",m)}window.addEventListener("mousemove",u),window.addEventListener("mouseup",m)})}const s=document.getElementById("resizer-bottom"),r=document.querySelector(".code-panel");t(n,i,"vertical"),t(e,o,"vertical"),s&&r&&t(s,r,"horizontal")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Yt):Yt();class Xl{constructor(){this.active=!1,this.element=null,this.targetWidgetId=null,this.position={x:0,y:0},this.init()}init(){this.element||(this.element=document.createElement("div"),this.element.className="radial-menu",this.element.innerHTML=`
                <div class="radial-menu-center"></div>
                <div class="radial-menu-items"></div>
            `,document.body.appendChild(this.element),window.addEventListener("mousedown",e=>{this.active&&!this.element.contains(e.target)&&this.hide()},!0),window.addEventListener("touchstart",e=>{this.active&&!this.element.contains(e.target)&&this.hide()},!0),window.addEventListener("keydown",e=>{e.key==="Escape"&&this.active&&this.hide()}))}show(e,i,o=null){this.targetWidgetId=o,this.position={x:e,y:i},this.active=!0,this.element.style.left=`${e}px`,this.element.style.top=`${i}px`,this.renderItems(),requestAnimationFrame(()=>{this.element.classList.add("active")})}hide(){this.active=!1,this.element.classList.remove("active"),this.targetWidgetId=null}renderItems(){const e=this.element.querySelector(".radial-menu-items");e.innerHTML="";const i=this.getAvailableActions(),o=2*Math.PI/i.length,t=70;i.forEach((s,r)=>{const a=r*o-Math.PI/2,l=Math.cos(a)*t,c=Math.sin(a)*t,d=document.createElement("div");d.className=`radial-menu-item ${s.className||""}`,d.style.setProperty("--x",`${l}px`),d.style.setProperty("--y",`${c}px`),d.title=s.label,d.innerHTML=`<i class="mdi ${s.icon}"></i>`,d.addEventListener("click",p=>{p.stopPropagation(),s.callback(),this.hide()}),e.appendChild(d)})}getAvailableActions(){const e=g,i=this.targetWidgetId?e.getWidgetById(this.targetWidgetId):null,o=[];if(i){o.push({label:"Copy",icon:"mdi-content-copy",callback:()=>{e.selectWidget(this.targetWidgetId,!1),e.copyWidget()}});const t=e.selectedWidgetIds,s=t.some(l=>{const c=e.getWidgetById(l);return c&&(c.type==="group"||c.parentId)});t.length>1&&!s&&o.push({label:"Group",icon:"mdi-group",callback:()=>e.groupSelection()}),(i.type==="group"||i.parentId)&&o.push({label:"Ungroup",icon:"mdi-ungroup",callback:()=>e.ungroupSelection(this.targetWidgetId)}),o.push({label:"Duplicate",icon:"mdi-content-duplicate",callback:()=>{e.copyWidget(),e.pasteWidget()}}),o.push({label:i.locked?"Unlock":"Lock",icon:i.locked?"mdi-lock-open-outline":"mdi-lock-outline",callback:()=>{e.updateWidget(this.targetWidgetId,{locked:!i.locked})}}),o.push({label:"Snap",icon:"mdi-magnet",callback:()=>{Za(this.targetWidgetId)}}),o.push({label:"Delete",icon:"mdi-delete-outline",className:"danger",callback:()=>{e.deleteWidget(this.targetWidgetId)}});const r=e.getCurrentPage(),a=r?.widgets.findIndex(l=>l.id===this.targetWidgetId);a!==-1&&(o.push({label:"Bring to Front",icon:"mdi-arrange-bring-to-front",callback:()=>{e.reorderWidget(e.currentPageIndex,a,r.widgets.length-1)}}),o.push({label:"Send to Back",icon:"mdi-arrange-send-to-back",callback:()=>{e.reorderWidget(e.currentPageIndex,a,0)}}))}else o.push({label:"Paste",icon:"mdi-content-paste",callback:()=>{e.pasteWidget()}});return o}}window.RadialMenu=new Xl;class Kl{constructor(){this.modal=document.getElementById("aiPromptModal"),this.closeBtn=document.getElementById("aiPromptClose"),this.submitBtn=document.getElementById("aiPromptSubmit"),this.applyBtn=document.getElementById("aiPromptApply"),this.input=document.getElementById("aiPromptInput"),this.status=document.getElementById("aiPromptStatus"),this.diffPanel=document.getElementById("aiPreviewDiff"),this.diffContent=document.getElementById("aiDiffContent"),this.generatedWidgets=null}init(){this.modal&&(this.closeBtn.onclick=()=>this.close(),this.submitBtn.onclick=()=>this.handleSubmit(),this.applyBtn.onclick=()=>this.handleApply(),window.addEventListener("click",e=>{e.target===this.modal&&this.close()}))}open(){if(!this.modal)return;this.modal.classList.remove("hidden"),this.modal.style.display="flex",this.input.focus();const e=window.AppState.settings.ai_provider||"gemini",i=window.AppState.settings[`ai_api_key_${e}`],o=document.getElementById("aiConfigWarning");o&&(o.style.display=i?"none":"block"),this.status.textContent="",this.status.style.color="",this.diffPanel.style.display="none",this.applyBtn.style.display="none",this.generatedWidgets=null}close(){this.modal&&(this.modal.classList.add("hidden"),this.modal.style.display="none")}async handleSubmit(){const e=this.input.value.trim();if(e){this.setLoading(!0),this.status.textContent="AI is thinking...",this.status.style.color="var(--accent)",this.diffPanel.style.display="none",this.applyBtn.style.display="none";try{const i=window.AppState.getCurrentPage(),o=g.deviceModel,t=R?.[o];let s="monochrome";t&&(t.features?.lcd?s="color_lcd":t.name?.includes("6-Color")||t.name?.includes("Color")?s="color_epaper":s="monochrome");const r={canvas:window.AppState.getCanvasDimensions(),current_page:i.id,widgets:i.widgets,selected_widget_id:window.AppState.selectedWidgetId,display_type:s},a=await window.aiService.processPrompt(e,r);if(a&&Array.isArray(a))this.generatedWidgets=a,this.showDiffPreview(i.widgets,a),this.status.textContent="Successfully generated changes!",this.status.style.color="var(--success)",this.applyBtn.style.display="inline-block";else throw new Error("Invalid response format from AI")}catch(i){b.error(i),this.status.textContent="Error: "+i.message,this.status.style.color="var(--danger)"}finally{this.setLoading(!1)}}}handleApply(){if(this.generatedWidgets)try{const e=window.AppState.getCurrentPage();e.widgets=this.generatedWidgets,window.AppState.project.rebuildWidgetsIndex(),L(C.STATE_CHANGED),M("AI changes applied!","success"),this.close()}catch(e){b.error(e),M("Failed to apply changes: "+e.message,"error")}}showDiffPreview(e,i){this.diffPanel.style.display="block";let o=`Widgets: ${e.length} ➔ ${i.length}

`;const t=e.map(c=>c.id),s=i.map(c=>c.id),r=i.filter(c=>!t.includes(c.id)),a=e.filter(c=>!s.includes(c.id)),l=i.filter(c=>{const d=e.find(p=>p.id===c.id);return d&&JSON.stringify(d)!==JSON.stringify(c)});r.length>0&&(o+=`[ADDED]
${r.map(c=>`+ ${c.type} (${c.id})`).join(`
`)}

`),a.length>0&&(o+=`[REMOVED]
${a.map(c=>`- ${c.type} (${c.id})`).join(`
`)}

`),l.length>0&&(o+=`[MODIFIED]
${l.map(c=>`~ ${c.type} (${c.id})`).join(`
`)}`),r.length===0&&a.length===0&&l.length===0&&(o+="(No changes detected)"),this.diffContent.textContent=o}setLoading(e){this.submitBtn.disabled=e,this.submitBtn.textContent=e?"Processing...":"Generate",this.input.disabled=e}}window.llmPrompt=new Kl;function Jl(){const n=g.getPagesPayload(),e=JSON.stringify(n,null,2),i=new Blob([e],{type:"application/json"}),o=URL.createObjectURL(i),t=document.createElement("a");t.href=o,t.download=`reterminal_layout_${Date.now()}.json`,document.body.appendChild(t),t.click(),document.body.removeChild(t),URL.revokeObjectURL(o)}function Zl(n){if(!n)return;const e=new FileReader;e.onload=i=>{try{const o=i.target.result,t=JSON.parse(o);we(t)}catch(o){b.error("Failed to parse layout file:",o),alert("Error parsing layout file. Please ensure it is a valid JSON file.")}},e.readAsText(n)}function Ql(n){const e=n.target.files[0];Zl(e),n.target.value=""}class ed{constructor(){this.cache={models:{}}}getSettings(){return window.AppState.settings}async fetchModels(e,i){if(!i)return[];try{if(e==="openrouter")return(await(await fetch("https://openrouter.ai/api/v1/models",{headers:{Authorization:`Bearer ${i}`}})).json()).data.map(s=>({id:s.id,name:s.name,context:s.context_length}));if(e==="openai")return(await(await fetch("https://api.openai.com/v1/models",{headers:{Authorization:`Bearer ${i}`}})).json()).data.filter(s=>s.id.startsWith("gpt-")).map(s=>({id:s.id,name:s.id}));if(e==="gemini"){try{const t=await(await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${i}`)).json();if(t.models&&Array.isArray(t.models))return t.models.filter(s=>s.supportedGenerationMethods.includes("generateContent")).map(s=>({id:s.name.replace("models/",""),name:s.displayName||s.name.replace("models/",""),description:s.description}))}catch(o){throw b.warn("Dynamic Gemini model fetch failed:",o),new Error("Failed to fetch Gemini models. Check your API key.")}return[]}}catch(o){throw b.error(`Error fetching models for ${e}:`,o),o}return[]}async processPrompt(e,i){const o=this.getSettings(),t=o.ai_provider||"gemini",s=o[`ai_api_key_${t}`];let r=o[`ai_model_${t}`];if(!r&&t==="gemini"){b.log("No model selected, attempting to auto-detect...");try{const d=await this.fetchModels(t,s);if(d.length>0)r=(d.find(h=>h.id.includes("flash"))||d.find(h=>h.id.includes("1.5-pro"))||d.find(h=>h.id.includes("gemini-pro"))||d[0]).id,b.log(`Auto-detected model: ${r}`),window.AppState.updateSettings({[`ai_model_${t}`]:r});else throw new Error("No models found for this API Key.")}catch(d){b.error("Auto-detection failed:",d),r="gemini-1.5-flash"}}if(!s)throw new Error(`Missing API Key for ${t}`);if(!r)throw new Error(`No model selected for ${t}`);const a=this.getSystemPrompt(),l={...i,widgets:i.widgets.map(d=>this.minifyWidget(d))},c=`
Current Layout Context:
${JSON.stringify(l,null,2)}

User Request:
${e}

Respond ONLY with valid JSON containing the updated "widgets" array for the current page. Do not include any explanation.
`.trim();try{let d="";t==="gemini"?d=await this.callGemini(s,r,a,c):t==="openai"?d=await this.callOpenAI(s,r,a,c):t==="openrouter"&&(d=await this.callOpenRouter(s,r,a,c));let p=d.trim();if(p.includes("```")){const f=p.match(/```(?:json)?\s*([\s\S]*?)\s*```/);f&&f[1]&&(p=f[1].trim())}const h=p.indexOf("["),u=p.indexOf("{");let m=-1,y=-1;h!==-1&&(u===-1||h<u)?(m=h,y=p.lastIndexOf("]")):u!==-1&&(m=u,y=p.lastIndexOf("}")),m!==-1&&y!==-1&&y>m&&(p=p.substring(m,y+1));try{const f=JSON.parse(p);return Array.isArray(f)?f:f.widgets||f}catch(f){b.warn("Fast JSON parse failed, trying repair...",f);try{const _=this.repairJson(p),v=JSON.parse(_);return Array.isArray(v)?v:v.widgets||v}catch(_){throw b.error("JSON repair failed:",_),new Error("AI returned malformed JSON (possibly truncated). Try a shorter prompt or a more powerful model.")}}}catch(d){throw b.error("AI processing failed:",d),d}}async callGemini(e,i,o,t){const s=`https://generativelanguage.googleapis.com/v1beta/models/${i}:generateContent?key=${e}`,r={contents:[{role:"user",parts:[{text:o+`

`+t}]}],generationConfig:{temperature:.1,topP:.95,topK:40,maxOutputTokens:8192,responseMimeType:"application/json"}},a=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}),l=await a.json();if(a.status===429)throw new Error("⚠️ Rate Limit Exceeded: You are sending requests too quickly for the free tier. Please wait a minute and try again.");if(l.error)throw new Error(l.error.message);return l.candidates[0].content.parts[0].text}async callOpenAI(e,i,o,t){const r=i&&i.toLowerCase().includes("gpt-5")?{type:"json_schema",json_schema:{name:"widget_layout",strict:!0,schema:{type:"object",properties:{widgets:{type:"array",items:{type:"object"}}},required:["widgets"],additionalProperties:!1}}}:{type:"json_object"},l=await(await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({model:i,messages:[{role:"system",content:o},{role:"user",content:t}],temperature:.1,max_tokens:8192,response_format:r})})).json();if(l.error)throw new Error(l.error.message);return l.choices[0].message.content}async callOpenRouter(e,i,o,t){const r=await(await fetch("https://openrouter.ai/api/v1/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({model:i,messages:[{role:"system",content:o},{role:"user",content:t}],temperature:.1,max_tokens:4096})})).json();if(r.error)throw new Error(r.error.message);return r.choices[0].message.content}getSystemPrompt(){return`
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
`.trim()}repairJson(e){let i=[],o=!1,t=!1;for(let r=0;r<e.length;r++){const a=e[r];if(t){t=!1;continue}if(a==="\\"){t=!0;continue}if(a==='"'){o=!o;continue}o||(a==="["||a==="{"?i.push(a==="["?"]":"}"):(a==="]"||a==="}")&&i.length>0&&i[i.length-1]===a&&i.pop())}let s=e;for(o&&(s+='"'),s=s.trim().replace(/,\s*$/,"");i.length>0;)s+=i.pop();return s}minifyWidget(e){const{id:i,type:o,x:t,y:s,width:r,height:a,...l}=e;return{id:i,type:o,x:t,y:s,width:r,height:a,...l}}}const ai=[{id:"core",name:"Core Widgets",expanded:!0,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><rect x="4" y="4" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="14" y="4" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="4" y="14" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="14" y="14" width="6" height="6" rx="1" fill="currentColor"/></svg>',widgets:[{type:"label",label:"Floating text",tag:"Text",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><text x="4" y="17" font-size="14" font-weight="bold" fill="currentColor">Aa</text></svg>'},{type:"sensor_text",label:"Sensor text",tag:"Entity",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="8" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2" /><path d="M11 12h9M14 9l3 3-3 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"datetime",label:"Date & Time",tag:"Time",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2" /><path d="M12 7v5l3 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"icon",label:"MDI icon",tag:"Icon",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 2L9 9H2l6 4.5L5.5 22 12 17l6.5 5-2.5-8.5L22 9h-7z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" /></svg>'},{type:"weather_icon",label:"Weather icon",tag:"Icon",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="10" r="4" fill="none" stroke="currentColor" stroke-width="2" /><path d="M12 2v2M12 16v2M4 10H2M22 10h-2M5.6 4.6l1.4 1.4M17 6l1.4-1.4M5.6 15.4l1.4-1.4M17 14l1.4 1.4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"image",label:"Image",tag:"Media",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="3" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" /><path d="M21 15l-5-5L11 15l-3-3-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"online_image",label:"Puppet image",tag:"Remote",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="14" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M17 10l4-4M21 10V6h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><circle cx="7" cy="8" r="1.5" fill="currentColor" /><path d="M17 13l-4-4-4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'}]},{id:"shapes",name:"Shapes",expanded:!0,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><circle cx="7" cy="7" r="4" fill="none" stroke="currentColor" stroke-width="2"/><rect x="13" y="13" width="7" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><path d="M17 4l3 5h-6z" fill="none" stroke="currentColor" stroke-width="2"/></svg>',widgets:[{type:"shape_rect",label:"Rectangle",tag:"Shape",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"rounded_rect",label:"Rounded Rect",tag:"Shape",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="6" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"shape_circle",label:"Circle",tag:"Shape",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"line",label:"Line",tag:"Shape",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'}]},{id:"opendisplay",name:"OpenDisplay / OEPL",expanded:!1,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><rect x="3" y="4" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" stroke-width="1" /><circle cx="6" cy="6.5" r="1" fill="currentColor" /><circle cx="9" cy="6.5" r="1" fill="currentColor" /></svg>',widgets:[{type:"odp_multiline",label:"Multiline Text",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><line x1="4" y1="12" x2="18" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><line x1="4" y1="17" x2="14" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"odp_rectangle_pattern",label:"Rectangle Pattern",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5" /><rect x="11" y="4" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5" /><rect x="3" y="12" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5" /><rect x="11" y="12" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5" /></svg>'},{type:"odp_polygon",label:"Polygon",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><polygon points="12,3 21,10 18,20 6,20 3,10" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"odp_ellipse",label:"Ellipse",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="9" ry="6" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"odp_arc",label:"Arc",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M6 18 A 9 9 0 0 1 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"odp_icon_sequence",label:"Icon Sequence",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="5" cy="12" r="3" fill="currentColor" /><circle cx="12" cy="12" r="3" fill="currentColor" /><circle cx="19" cy="12" r="3" fill="currentColor" /></svg>'},{type:"odp_plot",label:"Sensor Plot",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M3 3v18h18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M6 15l4-6 4 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"odp_debug_grid",label:"Debug Grid",tag:"Debug",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M3 3v18h18M3 9h18M3 15h18M9 3v18M15 3v18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'}]},{id:"advanced",name:"Advanced",expanded:!0,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" fill="none" stroke="currentColor" stroke-width="2"/></svg>',widgets:[{type:"graph",label:"Graph / Chart",tag:"Data",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M3 3v18h18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M7 14l4-4 4 4 5-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"progress_bar",label:"Progress bar",tag:"Entity",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="9" width="20" height="6" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><rect x="3" y="10" width="12" height="4" rx="1" fill="currentColor" /></svg>'},{type:"qr_code",label:"QR Code",tag:"Tools",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" fill="currentColor" /><rect x="14" y="3" width="7" height="7" fill="currentColor" /><rect x="3" y="14" width="7" height="7" fill="currentColor" /><rect x="14" y="14" width="3" height="3" fill="currentColor" /></svg>'},{type:"calendar",label:"Calendar",tag:"Events",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" stroke-width="2" /></svg>'},{type:"weather_forecast",label:"Weather Forecast",tag:"Forecast",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="10" r="4" fill="none" stroke="currentColor" stroke-width="2" /><path d="M12 2v2M12 16v2M4 10H2M22 10h-2M5.6 4.6l1.4 1.4M17 6l1.4-1.4M5.6 15.4l1.4-1.4M17 14l1.4 1.4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"quote_rss",label:"Quote / RSS",tag:"Info",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M6 17h3l2-4V7H5v6h3M13 17h3l2-4V7h-6v6h3" fill="none" stroke="currentColor" stroke-width="2" /></svg>'}]},{id:"inputs",name:"Inputs",expanded:!1,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><path d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zM16.06 17H15v-1l-1-1h-6l-1 1v1H5.94c-.58 0-1.06-.48-1.06-1.06V7.5c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5v8.44c0 .58-.48 1.06-1.06 1.06z" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="12" cy="13" r="1.5" fill="currentColor" /></svg>',widgets:[{type:"touch_area",label:"Touch Area",tag:"Input",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="5" y="5" width="14" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="2,2" /><circle cx="12" cy="12" r="3" fill="currentColor" /></svg>'},{type:"nav_next_page",label:"Next Page",tag:"Nav",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M10 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"nav_previous_page",label:"Prev Page",tag:"Nav",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M14 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"nav_reload_page",label:"Reload Page",tag:"Nav",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M23 4v6h-6M1 20v-6h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"template_nav_bar",label:"Navigation Bar",tag:"Template",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M6 10l-2 2 2 2M18 10l2 2-2 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 12h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'}]},{id:"ondevice",name:"On Device Sensors",expanded:!0,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 9h6v6H9z" fill="currentColor"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M7 2v2M7 20v2M17 2v2M17 20v2M2 7h2M20 7h2M2 17h2M20 17h2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',widgets:[{type:"battery_icon",label:"Battery",tag:"Sensor",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="7" width="18" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><rect x="4" y="9" width="8" height="6" fill="currentColor" /><path d="M20 10h2v4h-2" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"wifi_signal",label:"WiFi Signal",tag:"Sensor",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 3C7.5 3 3.8 5.4 2 9l2 2c1.3-2.5 4-4.2 8-4.2s6.7 1.7 8 4.2l2-2c-1.8-3.6-5.5-6-10-6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M12 9c-2.7 0-5.1 1.4-6.5 3.5L7 14c1-1.4 2.8-2.3 5-2.3s4 .9 5 2.3l1.5-1.5C17.1 10.4 14.7 9 12 9z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><circle cx="12" cy="18" r="2" fill="currentColor" /></svg>'},{type:"ondevice_temperature",label:"Temperature",tag:"SHT4x",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 2a2 2 0 00-2 2v10.1a4 4 0 104 0V4a2 2 0 00-2-2z" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="12" cy="18" r="2" fill="currentColor" /></svg>'},{type:"ondevice_humidity",label:"Humidity",tag:"SHT4x",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"template_sensor_bar",label:"On-Board Sensor Bar",tag:"New",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M5 12h2M10 12h2M15 12h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'}]},{id:"lvgl",name:"LVGL Components",expanded:!1,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" /></svg>',widgets:[{type:"lvgl_obj",label:"Base Object",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_label",label:"Label",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><text x="4" y="17" font-size="14" font-weight="bold" fill="currentColor">Aa</text></svg>'},{type:"lvgl_line",label:"LVGL Line",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"lvgl_button",label:"Button",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="8" rx="2" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="2" /><text x="12" y="16.5" font-size="8" text-anchor="middle" fill="currentColor">BTN</text></svg>'},{type:"lvgl_switch",label:"Switch",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="8" rx="4" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="16" cy="12" r="3" fill="currentColor" /></svg>'},{type:"lvgl_checkbox",label:"Checkbox",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><polyline points="9 12 11 14 15 10" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_slider",label:"Slider",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><circle cx="12" cy="12" r="3" fill="currentColor" /></svg>'},{type:"lvgl_bar",label:"Bar",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="9" width="20" height="6" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><rect x="3" y="10" width="12" height="4" rx="1" fill="currentColor" /></svg>'},{type:"lvgl_arc",label:"Arc",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M4 18 A 10 10 0 1 1 20 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"lvgl_meter",label:"Meter",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M4 18 A 10 10 0 1 1 20 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><line x1="12" y1="18" x2="16" y2="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"lvgl_spinner",label:"Spinner",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_led",label:"LED",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" fill="currentColor" /><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_chart",label:"Chart",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M3 3v18h18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M7 14l4-4 4 4 5-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"lvgl_img",label:"Image",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="3" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" /><path d="M21 15l-5-5L11 15l-3-3-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"lvgl_qrcode",label:"QR Code",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" fill="currentColor" /><rect x="14" y="3" width="7" height="7" fill="currentColor" /><rect x="3" y="14" width="7" height="7" fill="currentColor" /><rect x="14" y="14" width="3" height="3" fill="currentColor" /></svg>'},{type:"lvgl_dropdown",label:"Dropdown",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="8" width="20" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><polyline points="16 11 18 13 20 11" fill="currentColor" /></svg>'},{type:"lvgl_roller",label:"Roller",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="20" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><line x1="6" y1="10" x2="18" y2="10" stroke="currentColor" stroke-width="1" /><line x1="6" y1="14" x2="18" y2="14" stroke="currentColor" stroke-width="1" /></svg>'},{type:"lvgl_spinbox",label:"Spinbox",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M6 12l2-2 2 2" fill="none" stroke="currentColor" stroke-width="1" /><path d="M14 12l2 2 2-2" fill="none" stroke="currentColor" stroke-width="1" /></svg>'},{type:"lvgl_textarea",label:"Textarea",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" fill="none" stroke="currentColor" stroke-width="2" /><line x1="6" y1="8" x2="14" y2="8" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_keyboard",label:"Keyboard",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><line x1="6" y1="10" x2="8" y2="10" stroke="currentColor" stroke-width="2" /><line x1="10" y1="10" x2="12" y2="10" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_buttonmatrix",label:"Btn Matrix",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="7" width="9" height="4" fill="none" stroke="currentColor" stroke-width="1" /><rect x="13" y="7" width="9" height="4" fill="none" stroke="currentColor" stroke-width="1" /><rect x="2" y="13" width="9" height="4" fill="none" stroke="currentColor" stroke-width="1" /><rect x="13" y="13" width="9" height="4" fill="none" stroke="currentColor" stroke-width="1" /></svg>'},{type:"lvgl_tabview",label:"Tabview",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><line x1="2" y1="8" x2="22" y2="8" stroke="currentColor" stroke-width="1" /></svg>'},{type:"lvgl_tileview",label:"Tileview",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="2" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2" /><rect x="13" y="2" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2" /><rect x="2" y="13" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2" /><rect x="13" y="13" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"template_nav_bar",label:"Nav Bar (Template)",tag:"Nav",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M6 10l-2 2 2 2M18 10l2 2-2 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 12h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'}]}];async function No(n){const e=document.getElementById(n);if(!e)return;const i=window.AppState?.settings?.renderingMode||"direct";b.log(`[Palette] Rendering palette for mode: ${i}`),e.innerHTML='<div class="palette-loading" style="padding: 20px; color: #999; text-align: center; font-size: 13px;">Loading widgets...</div>';const o=[];ai.forEach(t=>{t.widgets.forEach(s=>{o.includes(s.type)||o.push(s.type)})}),b.log(`[Palette] Pre-loading ${o.length} widget plugins...`);try{await Promise.all(o.map(t=>W.load(t)))}catch(t){b.error("[Palette] Failed to load some plugins:",t)}e.innerHTML="",ai.forEach(t=>{let s=t.expanded;i==="lvgl"?s=t.id==="lvgl":(i==="oepl"||i==="opendisplay")&&(s=t.id==="opendisplay"||t.id==="core"||t.id==="shapes");const r=document.createElement("div");r.className=`widget-category ${s?"expanded":""}`,r.dataset.category=t.id;const a=document.createElement("div");a.className="widget-category-header";let l='<span class="category-icon">›</span>';t.icon&&(l+=t.icon),a.innerHTML=`
            ${l}
            <span class="category-name">${t.name}</span>
            ${t.widgets.length>0&&!s?`<span class="category-count">${t.widgets.length}</span>`:""}
        `,a.addEventListener("click",()=>{r.classList.toggle("expanded")});const c=document.createElement("div");c.className="widget-category-items",t.widgets.forEach(d=>{const p=document.createElement("div"),h=W.get(d.type);let u=!0,m="";if(h?.supportedModes)u=h.supportedModes.includes(i),m=`Not supported in ${i} mode`;else if(i==="oepl"||i==="opendisplay"){const _=i==="oepl"?!!h?.exportOEPL:!!h?.exportOpenDisplay,v=t.id==="ondevice"||t.id==="lvgl",S=d.type==="calendar"||d.type==="weather_forecast"||d.type==="graph"||d.type==="quote_rss";u=_&&!v&&!S,m=`Not supported in ${i==="oepl"?"OpenEpaperLink":"OpenDisplay"} mode`}else if(i==="lvgl"){const _=d.type.startsWith("lvgl_"),v=t.id==="inputs",S=typeof h?.exportLVGL=="function";u=_||v||S,m="Widget not compatible with LVGL mode"}else if(i==="direct"){const _=d.type.startsWith("lvgl_")||d.type.startsWith("oepl_");h?u=!!h.export&&!_:u=!_,m="Not supported in Direct rendering mode"}p.className="item"+(u?"":" incompatible"),p.draggable=u,p.dataset.widgetType=d.type;const y=d.label||h?.name;let f="";d.tag&&(f=`<span class="tag">${d.tag}</span>`),p.innerHTML=`
                ${d.icon}
                <span class="label">${y}</span>
                ${f}
            `,p.title=u?`Add ${y} to canvas`:m,u?p.addEventListener("dragstart",_=>{_.dataTransfer.setData("application/widget-type",d.type),_.dataTransfer.setData("text/plain",d.type),_.dataTransfer.effectAllowed="copy"}):p.addEventListener("click",_=>{_.stopPropagation(),T(()=>Promise.resolve().then(()=>_o),void 0,import.meta.url).then(v=>{v.showToast(m,"warning")})}),c.appendChild(p)}),r.appendChild(a),r.appendChild(c),e.appendChild(r)})}q(C.SETTINGS_CHANGED,n=>{n&&n.renderingMode!==void 0&&(b.log(`[Palette] Settings changed, refreshing palette for mode: ${n.renderingMode}`),No("widgetPalette"))});class td{constructor(){this.isOpen=!1,this.selectedIndex=0,this.filteredWidgets=[],this.allWidgets=[],this.modal=null,this.input=null,this.resultsContainer=null,this.init()}init(){this.createModal(),this.bindEvents()}discoverWidgets(){this.allWidgets=[];const e=document.querySelectorAll(".widget-category .item[data-widget-type]");if(e.length===0){b.warn("[QuickSearch] No widgets found in palette");return}e.forEach(i=>{const o=i.getAttribute("data-widget-type"),t=i.querySelector(".label"),s=t?t.textContent.trim():o,r=i.closest(".widget-category"),a=r?r.querySelector(".category-name"):null,l=a?a.textContent.trim():"Widgets";this.allWidgets.push({type:o,label:s,category:l,searchText:`${s} ${o} ${l}`.toLowerCase()})}),b.log(`[QuickSearch] Discovered ${this.allWidgets.length} widgets`)}createModal(){this.modal=document.createElement("div"),this.modal.id="quick-search-modal",this.modal.className="quick-search-modal hidden",this.modal.innerHTML=`
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
            `;return}this.resultsContainer.innerHTML=this.filteredWidgets.map((i,o)=>`
            <div class="quick-search-item ${o===this.selectedIndex?"selected":""}" 
                 data-index="${o}" data-type="${i.type}">
                <span class="quick-search-item-label">${i.label}</span>
                <span class="quick-search-item-category">${i.category}</span>
            </div>
        `).join(""),this.resultsContainer.querySelectorAll(".quick-search-item").forEach(i=>{i.addEventListener("click",()=>{const o=parseInt(i.getAttribute("data-index"),10);this.selectedIndex=o,this.addSelectedWidget()})});const e=this.resultsContainer.querySelector(".quick-search-item.selected");e&&e.scrollIntoView({block:"nearest"})}handleKeyDown(e){switch(e.key){case"ArrowDown":e.preventDefault(),this.selectedIndex=Math.min(this.selectedIndex+1,this.filteredWidgets.length-1),this.renderResults();break;case"ArrowUp":e.preventDefault(),this.selectedIndex=Math.max(this.selectedIndex-1,0),this.renderResults();break;case"Enter":e.preventDefault(),this.addSelectedWidget();break;case"Escape":e.preventDefault(),this.close();break}}addSelectedWidget(){if(this.filteredWidgets.length===0)return;const e=this.filteredWidgets[this.selectedIndex];if(e)try{const i=WidgetFactory.createWidget(e.type);AppState.addWidget(i),b.log(`[QuickSearch] Added widget: ${e.label}`),this.close()}catch(i){b.error("[QuickSearch] Error adding widget:",i),AppState.notify("Failed to add widget: "+i.message,"error")}}}class nd{constructor(){this.listContainer=null,this.header=null,this.panel=null,this.draggedIndex=null,this.render=this.render.bind(this),this.highlightSelected=this.highlightSelected.bind(this)}init(){if(this.listContainer=document.getElementById("hierarchyList"),this.header=document.getElementById("hierarchyHeader"),this.panel=document.getElementById("hierarchyPanel"),!this.listContainer||!this.header||!this.panel){b.error("[HierarchyView] Required DOM elements not found");return}this.controlsContainer=document.createElement("div"),this.controlsContainer.id="hierarchyControls",this.controlsContainer.className="hierarchy-controls",this.controlsContainer.style.padding="8px 8px",this.controlsContainer.style.borderTop="1px solid var(--border-subtle)",this.panel.appendChild(this.controlsContainer),this.bindEvents(),this.render(),this.renderHeaderActions(),b.log("[HierarchyView] Initialized")}renderHeaderActions(){if(!this.header)return;let e=this.header.querySelector(".hierarchy-header-toggles");if(!e){e=document.createElement("div"),e.className="hierarchy-header-toggles";const i=this.header.querySelector(".chevron");this.header.insertBefore(e,i);const o=this.createHeaderToggle("mdi-lock-outline","Toggle All Locks",()=>{const s=g.getCurrentPage()?.widgets||[],r=s.every(a=>a.locked);s.forEach(a=>g.updateWidget(a.id,{locked:!r}))}),t=this.createHeaderToggle("mdi-eye-outline","Toggle All Visibility",()=>{const s=g.getCurrentPage()?.widgets||[],r=s.every(a=>a.hidden);s.forEach(a=>g.updateWidget(a.id,{hidden:!r}))});e.appendChild(o),e.appendChild(t)}}createHeaderToggle(e,i,o){const t=document.createElement("div");return t.className="h-toggle",t.title=i,t.innerHTML=`<i class="mdi ${e}"></i>`,t.onclick=s=>{s.stopPropagation(),o()},t}bindEvents(){this.header.addEventListener("click",()=>this.toggleCollapse()),q(C.STATE_CHANGED,this.render),q(C.PAGE_CHANGED,this.render),q(C.SELECTION_CHANGED,this.highlightSelected)}toggleCollapse(){const e=this.panel.classList.toggle("hidden"),i=this.header.querySelector(".chevron");i&&(i.style.transform=e?"rotate(-90deg)":"rotate(0deg)")}highlightSelected(){const e=g.selectedWidgetIds||[];this.listContainer.querySelectorAll(".hierarchy-item").forEach(o=>{e.includes(o.dataset.id)?o.classList.add("selected"):o.classList.remove("selected")}),this.renderControls()}render(){const e=g.getCurrentPage();if(!e)return;if(this.listContainer.innerHTML="",!e.widgets||e.widgets.length===0){this.listContainer.innerHTML='<div style="font-size: 10px; color: var(--muted); text-align: center; padding: 12px;">No widgets on this page</div>',this.controlsContainer.style.display="none";return}const i=e.widgets.filter(s=>!s.parentId).reverse(),o=new Map;e.widgets.forEach(s=>{s.parentId&&(o.has(s.parentId)||o.set(s.parentId,[]),o.get(s.parentId).push(s))});const t=(s,r=0)=>{const a=e.widgets.indexOf(s),l=this.createItem(s,a,r);this.listContainer.appendChild(l);const c=o.get(s.id);c&&s.expanded!==!1&&[...c].reverse().forEach(d=>t(d,r+1))};i.forEach(s=>t(s)),this.highlightSelected(),this.renderControls()}createItem(e,i,o=0){const t=document.createElement("div");t.className=`hierarchy-item ${e.hidden?"hidden-widget":""}`,o>0&&t.classList.add("child-item"),(g.selectedWidgetIds||[]).includes(e.id)&&t.classList.add("selected"),t.dataset.id=e.id,t.dataset.index=i,t.draggable=!e.locked,e.locked&&t.classList.add("locked"),t.style.paddingLeft=12+o*20+"px";const r=this.getWidgetIcon(e.type),a=this.getWidgetLabel(e),l=e.type==="group";return t.innerHTML=`
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
        `,l&&t.querySelector(".hierarchy-group-toggle").addEventListener("click",d=>{g.updateWidget(e.id,{expanded:e.expanded===!1}),d.stopPropagation()}),t.querySelector(".hierarchy-item-label").addEventListener("click",d=>{if(g.selectedWidgetIds.includes(e.id)){const p=prompt("Rename:",a);p!==null&&p!==""&&p!==a&&g.updateWidget(e.id,{title:p}),d.stopPropagation();return}}),t.addEventListener("click",d=>{const p=d.ctrlKey||d.shiftKey;g.selectWidget(e.id,p),d.stopPropagation()}),t.querySelector(".toggle-lock").addEventListener("click",d=>{g.updateWidget(e.id,{locked:!e.locked}),d.stopPropagation()}),t.querySelector(".toggle-visibility").addEventListener("click",d=>{g.updateWidget(e.id,{hidden:!e.hidden}),d.stopPropagation()}),t.querySelector(".delete-widget").addEventListener("click",d=>{confirm(`Delete widget "${a}"?`)&&g.deleteWidget(e.id),d.stopPropagation()}),t.addEventListener("dragstart",d=>{this.draggedIndex=i,t.classList.add("dragging"),d.dataTransfer.setData("application/widget-id",e.id),d.dataTransfer.effectAllowed="move"}),t.addEventListener("dragend",()=>{t.classList.remove("dragging"),this.draggedIndex=null,this.listContainer.querySelectorAll(".hierarchy-item").forEach(p=>p.classList.remove("drag-over"))}),t.addEventListener("dragover",d=>{d.preventDefault(),d.dataTransfer.dropEffect="move",t.classList.add("drag-over")}),t.addEventListener("dragleave",()=>{t.classList.remove("drag-over")}),t.addEventListener("drop",d=>{d.preventDefault();const p=d.dataTransfer.getData("application/widget-id"),h=t.dataset.id;if(p===h)return;const u=g.getWidgetById(h);if(!u)return;u.type==="group"?g.updateWidget(p,{parentId:h,expanded:!0}):g.updateWidget(p,{parentId:u.parentId||null});const m=parseInt(t.dataset.index);this.draggedIndex!==null&&g.reorderWidget(g.currentPageIndex,this.draggedIndex,m)}),t}renderControls(){const e=g.getSelectedWidgets();if(e.length===0){this.controlsContainer.style.display="none";return}this.controlsContainer.style.display="block",this.controlsContainer.innerHTML="";const i=l=>{const c=document.createElement("div");c.style.fontSize="10px",c.style.color="var(--muted)",c.style.marginBottom="6px",c.style.fontWeight="600",c.style.marginTop="8px",c.textContent=l,this.controlsContainer.appendChild(c)},o=()=>{const l=document.createElement("div");return l.style.display="flex",l.style.gap="4px",this.controlsContainer.appendChild(l),l};i("GROUPING");const t=o(),s=e.some(l=>l.type==="group"||l.parentId),r=document.createElement("button");r.className="btn btn-secondary",r.innerHTML='<i class="mdi mdi-group" style="margin-right:4px"></i>Group',r.style.flex="1",r.style.fontSize="10px",r.disabled=e.length<2||s,r.onclick=()=>g.groupSelection(),t.appendChild(r);const a=document.createElement("button");if(a.className="btn btn-secondary",a.innerHTML='<i class="mdi mdi-ungroup" style="margin-right:4px"></i>Ungroup',a.style.flex="1",a.style.fontSize="10px",a.disabled=!s,a.onclick=()=>g.ungroupSelection(),t.appendChild(a),e.length===1){const l=e[0];i("LAYER ORDER");const c=o();[{label:"Front",icon:"mdi-arrange-bring-to-front",action:()=>this.moveToFront(l)},{label:"Back",icon:"mdi-arrange-send-to-back",action:()=>this.moveToBack(l)},{label:"Up",icon:"mdi-arrow-up",action:()=>this.moveUp(l)},{label:"Down",icon:"mdi-arrow-down",action:()=>this.moveDown(l)}].forEach(p=>{const h=document.createElement("button");h.className="btn btn-secondary",h.innerHTML=`<i class="mdi ${p.icon}"></i>`,h.title=p.label,h.style.flex="1",h.style.fontSize="12px",h.style.padding="4px",h.onclick=()=>p.action(),c.appendChild(h)})}}moveToFront(e){const i=g.getCurrentPage(),o=i.widgets.findIndex(t=>t.id===e.id);o>-1&&o<i.widgets.length-1&&(i.widgets.splice(o,1),i.widgets.push(e),g.setPages(g.pages))}moveToBack(e){const i=g.getCurrentPage(),o=i.widgets.findIndex(t=>t.id===e.id);o>0&&(i.widgets.splice(o,1),i.widgets.unshift(e),g.setPages(g.pages))}moveUp(e){const i=g.getCurrentPage(),o=i.widgets.findIndex(t=>t.id===e.id);o>-1&&o<i.widgets.length-1&&([i.widgets[o],i.widgets[o+1]]=[i.widgets[o+1],i.widgets[o]],g.setPages(g.pages))}moveDown(e){const i=g.getCurrentPage(),o=i.widgets.findIndex(t=>t.id===e.id);o>0&&([i.widgets[o],i.widgets[o-1]]=[i.widgets[o-1],i.widgets[o]],g.setPages(g.pages))}getWidgetLabel(e){let i=e.props?.name||e.props?.title||e.props?.text||e.title;if(!i||i===""){const o=W.get(e.type);i=o?o.name:e.type}if(i===e.type||W.get(e.type)&&i===W.get(e.type).name){const o=e.id.split("_").pop();i=`${i} (${o})`}return i}getWidgetIcon(e){return`<i class="mdi ${{text:"mdi-format-text",sensor_text:"mdi-numeric",icon:"mdi-emoticon-outline",image:"mdi-image",qr_code:"mdi-qrcode",line:"mdi-vector-line",lvgl_line:"mdi-vector-line",rect:"mdi-square-outline",shape_rect:"mdi-square-outline",arc:"mdi-circle-outline",shape_circle:"mdi-circle-outline",bar:"mdi-chart-gantt",button:"mdi-gesture-tap-button",checkbox:"mdi-checkbox-marked-outline",calendar:"mdi-calendar",weather_forecast:"mdi-weather-partly-cloudy",datetime:"mdi-clock-outline",graph:"mdi-chart-timeline-variant",touch_area:"mdi-fingerprint",group:"mdi-folder-outline"}[e]||"mdi-widgets-outline"}"></i>`}}window.aiService=new ed;class id{constructor(){try{b.log("[App] Constructor started"),this.sidebar=new za,b.log("[App] Sidebar created"),this.canvas=new hl,b.log("[App] Canvas created"),this.propertiesPanel=new vl,b.log("[App] PropertiesPanel created"),this.hierarchyView=new nd,b.log("[App] HierarchyView created"),this.deviceSettings=new Sl,b.log("[App] DeviceSettings created"),this.editorSettings=new El,b.log("[App] EditorSettings created"),this.pageSettings=new Il,b.log("[App] PageSettings created"),this.keyboardHandler=new Ao,b.log("[App] KeyboardHandler created"),this.llmPrompt=window.llmPrompt,b.log("[App] LLMPrompt linked"),this.quickSearch=new td,window.QuickSearch=this.quickSearch,b.log("[App] QuickSearch initialized"),this.adapter=this.createAdapter(),b.log("[App] Adapter initialized:",this.adapter.constructor.name),this.snippetManager=new kl(this.adapter),b.log("[App] SnippetManager initialized"),window.layoutManager&&(this.layoutManager=window.layoutManager,b.log("[App] LayoutManager linked"))}catch(e){b.error("[App] Critical Error in Constructor:",e)}}async init(){b.log("[App] Initializing ESPHome Designer Designer..."),b.log("[App] AppState:",window.AppState),this.isInitializing=!0,await No("widgetPalette"),this.sidebar.init(),this.propertiesPanel.init(),this.hierarchyView.init(),this.deviceSettings.init(),this.editorSettings.init(),this.quickSearch.discoverWidgets(),await pn();try{localStorage.getItem("reterminal-editor-theme")==="light"?(g.updateSettings({editor_light_mode:!0}),this.editorSettings.applyEditorTheme(!0)):this.editorSettings.applyEditorTheme(!1)}catch(e){b.log("Could not load theme preference:",e)}this.pageSettings.init(),this.llmPrompt&&this.llmPrompt.init(),this.layoutManager&&this.layoutManager.init(),this.setupAutoSave(),this.bindGlobalButtons();try{z()?(b.log("HA Backend detected attempt. Loading layout..."),await Ia(),await Le()):(b.log("Running in standalone/offline mode."),this.loadFromLocalStorage()),this.refreshAdapter()}catch(e){b.error("[App] Failed to load from backend, falling back to local storage:",e),this.loadFromLocalStorage(),this.refreshAdapter()}window.AppState&&typeof window.AppState.updateLayoutIndicator=="function"&&window.AppState.updateLayoutIndicator(),setTimeout(()=>{this.canvas&&(b.log("[App] Forcing initial canvas centering..."),this.canvas.focusPage(g.currentPageIndex,!1))},100),b.log("Initialization complete."),this.isInitializing=!1}bindGlobalButtons(){const e=document.getElementById("saveLayoutBtn");e&&e.addEventListener("click",()=>{z()?he().then(()=>M("Layout saved to Home Assistant","success")).catch(a=>M(`Save failed: ${a.message}`,"error")):Jl()});const i=document.getElementById("loadLayoutBtn");i&&i.addEventListener("change",Ql);const o=document.getElementById("importLayoutBtn");o&&i&&o.addEventListener("click",()=>{i.click()});const t=document.getElementById("deviceSettingsBtn");t?(b.log("Device Settings button found, binding click listener."),t.addEventListener("click",()=>{b.log("Device Settings button clicked."),this.deviceSettings?this.deviceSettings.open():b.error("DeviceSettings instance not found on App.")})):b.error("Device Settings button NOT found in DOM.");const s=document.getElementById("editorSettingsBtn");s&&s.addEventListener("click",()=>{this.editorSettings.open()});const r=document.getElementById("aiPromptBtn");r&&r.addEventListener("click",()=>{this.llmPrompt?this.llmPrompt.open():b.error("LLMPrompt instance not found.")})}loadFromLocalStorage(){try{const e=g.loadFromLocalStorage();e?(b.log("[App] Found saved layout in localStorage, loading..."),we(e)):b.log("[App] No saved layout in localStorage, starting fresh.")}catch(e){b.error("[App] Error loading from local storage:",e)}}setupAutoSave(){let e=null;const i=2e3;T(async()=>{const{on:o,EVENTS:t}=await Promise.resolve().then(()=>Yo);return{on:o,EVENTS:t}},void 0,import.meta.url).then(({on:o,EVENTS:t})=>{o(t.STATE_CHANGED,()=>{this.refreshAdapter(),e&&clearTimeout(e),e=setTimeout(()=>{z()?(b.log("[AutoSave] Triggering background save to HA..."),he().catch(()=>{})):(b.log("[AutoSave] Saving to local storage..."),g.saveToLocalStorage())},i)})})}createAdapter(){const e=g.settings.renderingMode||"direct";let i;return e==="oepl"?i=new Ro:e==="opendisplay"?i=new Bo:i=new Oo,i.mode=e,i}refreshAdapter(){const e=g.settings.renderingMode||"direct";this.adapter&&this.adapter.mode===e||(b.log(`[App] Refreshing adapter: ${this.adapter?.mode} -> ${e}`),this.adapter=this.createAdapter(),this.snippetManager&&(this.snippetManager.adapter=this.adapter,this.snippetManager.updateSnippetBox()))}}document.addEventListener("DOMContentLoaded",async()=>{const n=new id;window.app=n,window.openDeviceSettings=()=>n.deviceSettings?.open(),window.openEditorSettingsModal=e=>n.editorSettings?.open(e),window.pageSettings=n.pageSettings,window.ESPHomeDesigner=window.ESPHomeDesigner||{},window.ESPHomeDesigner.app=n,window.ESPHomeDesigner.ui={sidebar:n.sidebar,canvas:n.canvas,properties:n.propertiesPanel};try{await n.init()}catch(e){b.error("[App] Failed to initialize:",e)}});export{C as E,Da as a,zt as b,L as e,sd as f,od as g,To as i};
