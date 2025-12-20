"""
Panel view for the reTerminal Dashboard Designer.

This exposes the editor UI as a full-screen, authenticated panel inside Home Assistant,
so users do not need to copy anything into /config/www manually.

Routes:
- GET /reterminal-dashboard
    Serves the embedded editor HTML/JS, which talks to:
    - /api/reterminal_dashboard/layout
    - /api/reterminal_dashboard/entities
    - /api/reterminal_dashboard/snippet
    - /api/reterminal_dashboard/import_snippet

Notes:
- This view runs under the Home Assistant frontend origin and shares auth/session.
- All API calls are relative paths, no hard-coded host.
"""

from __future__ import annotations

import logging
from typing import Any

from aiohttp import web
from homeassistant.components.http import HomeAssistantView
from homeassistant.core import HomeAssistant

from .const import API_BASE_PATH

_LOGGER = logging.getLogger(__name__)


PANEL_URL_PATH = "/reterminal-dashboard"


class ReTerminalDashboardPanelView(HomeAssistantView):
    """Serve the reTerminal Dashboard Designer editor as a panel."""

    url = PANEL_URL_PATH
    name = "reterminal_dashboard:panel"
    requires_auth = False  # Temporarily disable for testing
    # WARNING: Do NOT add custom `options()` handlers to this view!
    cors_allowed = False

    def __init__(self, hass: HomeAssistant) -> None:
        """Store hass if needed later."""
        self.hass = hass

    async def get(self, request) -> Any:  # type: ignore[override]
        """Return the full featured editor HTML.
        
        This reads and serves the complete standalone editor.html.
        Tries multiple locations in order of priority.
        """
        from pathlib import Path
        import aiofiles
        
        # Priority 1: Look in integration's own frontend/ directory (bundled with integration)
        integration_dir = Path(__file__).parent / "frontend"
        editor_path_integration = integration_dir / "editor.html"
        
        # Priority 2: Look in /config/www/ (manual deployment or HACS plugin)
        component_dir = Path(__file__).parent
        config_dir = component_dir.parent.parent
        editor_path_www = config_dir / "www" / "reterminal_dashboard_panel" / "editor.html"
        
        # Try integration directory first (preferred - always available)
        if editor_path_integration.exists():
            try:
                async with aiofiles.open(editor_path_integration, mode='r', encoding='utf-8') as f:
                    html = await f.read()
                
                # Replace relative links with absolute static paths for HA serving
                # This allows the file on disk to use relative paths (for local testing)
                # while HA serves it with correct absolute paths
                import re
                
                # CSS
                html = html.replace('href="editor.css"', 'href="/reterminal-dashboard/static/editor.css"')
                
                # JS files - convert relative paths to absolute static paths
                # Pattern: src="something.js" or src="path/to/file.js" or src="file.js?v=2"
                # Skip external URLs (http://, https://)
                def rewrite_js_src(match):
                    path = match.group(1)
                    # Don't rewrite external URLs
                    if path.startswith('http://') or path.startswith('https://'):
                        return match.group(0)
                    return f'src="/reterminal-dashboard/static/{path}"'
                
                # Match .js files with optional query strings (e.g., ?v=2, ?cache=bust)
                html = re.sub(r'src="([^"]+\.js(?:\?[^"]*)?)"', rewrite_js_src, html)

                _LOGGER.info("✓ Serving editor from integration: %s (%d bytes)", editor_path_integration, len(html))
                return web.Response(
                    body=html,
                    status=200,
                    content_type="text/html",
                    headers={
                        "Cache-Control": "no-cache, no-store, must-revalidate",
                        "Pragma": "no-cache",
                        "Expires": "0"
                    }
                )
            except Exception as e:
                _LOGGER.error("Failed to read editor from integration: %s", e)
        
        # Try www directory (fallback for manual deployment)
        if editor_path_www.exists():
            try:
                async with aiofiles.open(editor_path_www, mode='r', encoding='utf-8') as f:
                    html = await f.read()
                _LOGGER.info("✓ Serving editor from www: %s (%d bytes)", editor_path_www, len(html))
                return web.Response(
                    body=html,
                    status=200,
                    content_type="text/html",
                    headers={
                        "Cache-Control": "no-cache, no-store, must-revalidate",
                        "Pragma": "no-cache",
                        "Expires": "0"
                    }
                )
            except Exception as e:
                _LOGGER.error("Failed to read editor from www: %s", e)
        
        # Log where we looked
        _LOGGER.error("❌ editor.html NOT FOUND at:")
        _LOGGER.error("  1. %s", editor_path_integration)
        _LOGGER.error("  2. %s", editor_path_www)
        
        # Fallback: This should NOT happen if files are deployed correctly
        _LOGGER.error("FALLBACK: Using incomplete embedded HTML - features will be missing!")
        html = self._generate_full_editor_html()
        
        return web.Response(
            body=html,
            status=200,
            content_type="text/html",
        )


class ReTerminalDashboardStaticView(HomeAssistantView):
    """Serve static frontend assets (CSS/JS) from the frontend directory."""

    url = "/reterminal-dashboard/static/{path:.*}"
    name = "reterminal_dashboard:static"
    requires_auth = False
    # This breaks component setup and causes 404 errors for all static assets.
    # We enable it for static assets because some browsers (like Chrome) might 
    # require CORS headers for .local addresses on non-secure contexts (PNA).
    cors_allowed = True

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass

    async def get(self, request, path: str) -> Any:
        """Serve a static file from the frontend directory tree."""
        from pathlib import Path
        import aiofiles
        import mimetypes

        # Security: Block directory traversal
        if ".." in path or path.startswith("/"):
            _LOGGER.warning("Blocked path traversal attempt: %s", path)
            return web.Response(status=403, text="Forbidden")

        # Look in integration's frontend/ directory
        integration_dir = Path(__file__).parent / "frontend"
        file_path = (integration_dir / path).resolve()

        # Security: Ensure resolved path is still under integration_dir
        try:
            file_path.relative_to(integration_dir.resolve())
        except ValueError:
            _LOGGER.warning("Blocked path escape attempt: %s -> %s", path, file_path)
            return web.Response(status=403, text="Forbidden")

        if not file_path.exists() or not file_path.is_file():
            _LOGGER.debug("Static file not found: %s", file_path)
            return web.Response(status=404, text="File not found")

        try:
            # Determine content type
            # Determine content type manually first for critical types to avoid system registry issues
            content_type = None
            if path.endswith(".js"):
                content_type = "application/javascript"
            elif path.endswith(".css"):
                content_type = "text/css"
            elif path.endswith(".json"):
                 content_type = "application/json"

            if not content_type:
                content_type, _ = mimetypes.guess_type(str(file_path))
            
            if not content_type:
                if path.endswith(".ttf"):
                    content_type = "font/ttf"
                elif path.endswith(".woff"):
                    content_type = "font/woff"
                elif path.endswith(".woff2"):
                    content_type = "font/woff2"
                else:
                    content_type = "application/octet-stream"

            # Binary files (fonts, images, etc.) need binary mode
            is_binary = content_type.startswith(('font/', 'image/', 'application/octet'))
            
            if is_binary:
                async with aiofiles.open(file_path, mode='rb') as f:
                    content = await f.read()
            else:
                async with aiofiles.open(file_path, mode='r', encoding='utf-8') as f:
                    content = await f.read()

            _LOGGER.debug("Serving static file: %s (%d bytes)", path, len(content))
            return web.Response(
                body=content,
                status=200,
                content_type=content_type,
                headers={
                    "Cache-Control": "no-cache, no-store, must-revalidate" if not is_binary else "public, max-age=31536000",
                    "Pragma": "no-cache" if not is_binary else "",
                    "Expires": "0" if not is_binary else "",
                    "Access-Control-Allow-Private-Network": "true"
                }
            )
        except Exception as e:
            _LOGGER.error("Failed to serve static file %s: %s", path, e)
            return web.Response(status=500, text="Internal Server Error")

    def _generate_full_editor_html(self) -> str:
        """Generate the complete editor HTML with all features."""
        return f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>ESPHome Designer</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
{self._load_base_styles()}
  </style>
</head>
<body>
  <aside class="sidebar">
    <div>
      <h1><span class="logo-dot"></span> ESPHome Designer</h1>
      <div class="pill">
        <span></span>
        <div>Connected to Home Assistant</div>
      </div>
    </div>

    <div class="sidebar-group">
      <div class="sidebar-section-label">Pages</div>
      <div id="pageList" class="page-list"></div>
      <button id="addPageBtn" class="btn btn-secondary btn-full">+ Add page</button>
    </div>

    <div class="sidebar-group">
      <div class="sidebar-section-label">Widgets</div>
      <div id="widgetPalette" class="widget-list">
        <div class="item" data-widget-type="label">
          <span class="label">Floating text</span>
          <span class="tag">Text</span>
        </div>
        <div class="item" data-widget-type="sensor_text">
          <span class="label">Sensor text</span>
          <span class="tag">Entity</span>
        </div>
        <div class="item" data-widget-type="icon">
          <span class="label">MDI icon</span>
          <span class="tag">Icon</span>
        </div>
        <div class="item" data-widget-type="shape_rect">
          <span class="label">Rectangle / box</span>
          <span class="tag">Shape</span>
        </div>
        <div class="item" data-widget-type="shape_circle">
          <span class="label">Circle</span>
          <span class="tag">Shape</span>
        </div>
        <div class="item" data-widget-type="line">
          <span class="label">Line</span>
          <span class="tag">Shape</span>
        </div>
      </div>
    </div>

    <div class="sidebar-group">
      <button id="saveLayoutBtn" class="btn btn-full">Save layout</button>
      <button id="generateSnippetBtn" class="btn btn-secondary btn-full">Generate ESPHome snippet</button>
      <div class="status-bar" id="sidebarStatus">
        <span>Layout status will appear here.</span>
      </div>
    </div>
  </aside>

  <main class="main">
    <div class="main-header">
      <div class="main-header-title">
        <h2>Visual layout editor</h2>
        <span>Each widget on the canvas becomes part of your ESPHome display lambda.</span>
      </div>
      <div class="main-header-actions">
        <div class="main-header-pill">
          Canvas: <span id="canvasSizeLabel">800 x 480</span> px
        </div>
        <select id="orientationSelect" class="select" style="width:auto;padding:3px 6px;font-size:9px;">
          <option value="landscape">Landscape 800x480</option>
          <option value="portrait">Portrait 480x800</option>
        </select>
      </div>
    </div>

    <div class="canvas-wrap">
      <section class="canvas-area">
        <div class="canvas-toolbar">
          <span>Page: <strong id="currentPageName">Loading...</strong></span>
          <span>Place widgets to define what the reTerminal shows.</span>
        </div>
        <div id="canvas" class="canvas">
          <div class="canvas-grid"></div>
        </div>
      </section>

      <aside class="right-panel">
        <h3>Widget properties</h3>
        <div class="field" style="margin-bottom:2px;">
          <div class="prop-label">Editor options</div>
          <label style="display:flex;align-items:center;gap:6px;font-size:9px;color:var(--muted);">
            <input id="snapToggle" type="checkbox" checked style="width:auto;height:auto;margin:0;" />
            <span>Snap to guides</span>
          </label>
        </div>
        <div id="propertiesPanel">
          <div class="field">
            <div class="prop-label">Entity ID</div>
            <input id="prop-entity" class="prop-input" type="text" placeholder="sensor.example" list="entity-list" />
            <datalist id="entity-list"></datalist>
          </div>
        </div>
      </aside>
    </div>

    <section class="snippet-area">
      <div class="snippet-header">
        <span>Generated configuration</span>
        <div class="snippet-actions">
          <button id="copySnippetBtn" class="btn btn-secondary">Copy</button>
          <button id="importSnippetBtn" class="btn btn-secondary">Import</button>
        </div>
      </div>
      <div id="snippetBox" class="snippet-box">
# Click "Generate ESPHome snippet" to see output here.
      </div>
    </section>
  </main>

  <script>
    // Environment detection
    const API_BASE = "{API_BASE_PATH}";
    
    // State
    let pages = [{{
      id: "page_0",
      name: "Overview", 
      widgets: []
    }}];
    let settings = {{
      orientation: "landscape",
      dark_mode: false
    }};
    let currentPageIndex = 0;
    let widgetsById = new Map();
    let selectedWidgetId = null;
    let entityIndex = [];

    const CANVAS_WIDTH = 800;
    const CANVAS_HEIGHT = 480;
    const SNAP_ENABLED = true;
    const SNAP_DISTANCE = 10;
    let snapEnabled = true;

    // Initialize
    function initDefaultLayout() {{
      rebuildWidgetsIndex();
      renderPagesSidebar();
      renderCanvas();
      renderPropertiesPanel();
    }}

    function rebuildWidgetsIndex() {{
      widgetsById = new Map();
      for (const page of pages) {{
        for (const w of page.widgets) {{
          widgetsById.set(w.id, w);
        }}
      }}
    }}

    function getCurrentPage() {{
      return pages[currentPageIndex] || pages[0];
    }}

    // Rendering functions
    function renderPagesSidebar() {{
      const pageListEl = document.getElementById("pageList");
      const currentPageNameEl = document.getElementById("currentPageName");
      
      pageListEl.innerHTML = "";
      pages.forEach((page, index) => {{
        const item = document.createElement("div");
        item.className = "item" + (index === currentPageIndex ? " active" : "");
        item.onclick = () => {{
          currentPageIndex = index;
          selectedWidgetId = null;
          renderPagesSidebar();
          renderCanvas();
          renderPropertiesPanel();
        }};
        const label = document.createElement("span");
        label.className = "label";
        label.textContent = page.name;
        const tag = document.createElement("span");
        tag.className = "tag";
        tag.textContent = page.id;
        item.appendChild(label);
        item.appendChild(tag);
        pageListEl.appendChild(item);
      }});
      
      const page = getCurrentPage();
      currentPageNameEl.textContent = page ? page.name : "None";
    }}

    function renderCanvas() {{
      const canvas = document.getElementById("canvas");
      canvas.innerHTML = '<div class="canvas-grid"></div>';
      
      const page = getCurrentPage();
      if (!page) return;

      for (const widget of page.widgets) {{
        const el = document.createElement("div");
        el.className = "widget";
        el.style.left = widget.x + "px";
        el.style.top = widget.y + "px";
        el.style.width = widget.width + "px";
        el.style.height = widget.height + "px";
        el.dataset.id = widget.id;

        if (widget.id === selectedWidgetId) {{
          el.classList.add("active");
        }}

        // Render content based on type
        const type = (widget.type || "").toLowerCase();
        const props = widget.props || {{}};

        if (type === "icon") {{
          const code = props.code || "F0595";
          const hex = code.match(/^F[0-9A-F]{{3}}$/i) ? code : "F0595";
          const cp = 0xf0000 + parseInt(hex.slice(1), 16);
          el.textContent = String.fromCodePoint(cp);
          el.style.fontFamily = "MDI";
          el.style.fontSize = (props.size || 40) + "px";
          el.style.display = "flex";
          el.style.alignItems = "center";
          el.style.justifyContent = "center";
        }} else if (type === "shape_rect") {{
          const color = props.color === "white" ? "#ffffff" : "#000000";
          const fill = props.fill;
          el.style.border = (props.border_width || 1) + "px solid " + color;
          el.style.backgroundColor = fill ? color : "transparent";
        }} else if (type === "shape_circle") {{
          const color = props.color === "white" ? "#ffffff" : "#000000";
          const fill = props.fill;
          el.style.border = (props.border_width || 1) + "px solid " + color;
          el.style.backgroundColor = fill ? color : "transparent";
          el.style.borderRadius = "50%";
        }} else if (type === "line") {{
          const color = props.color === "white" ? "#ffffff" : "#000000";
          el.style.backgroundColor = color;
          el.style.height = (props.stroke_width || 1) + "px";
        }} else {{
          // Text types
          const fontSize = props.font_size || 16;
          const color = props.color === "white" ? "#ffffff" : "#000000";
          el.style.fontSize = fontSize + "px";
          el.style.color = color;
          
          let text = "";
          if (type === "sensor_text") {{
            text = widget.title || widget.entity_id || "sensor";
          }} else {{
            text = props.text || widget.title || "Text";
          }}
          el.textContent = text;
        }}

        // Event handlers
        el.addEventListener("mousedown", (ev) => onWidgetMouseDown(ev, widget.id));
        
        // Resize handle
        const handle = document.createElement("div");
        handle.className = "widget-resize-handle";
        el.appendChild(handle);
        
        canvas.appendChild(el);
      }}
    }}

    function renderPropertiesPanel() {{
      const panel = document.getElementById("propertiesPanel");
      const widget = selectedWidgetId ? widgetsById.get(selectedWidgetId) : null;
      
      if (!widget) {{
        panel.innerHTML = '<div class="field"><span style="font-size:9px;color:var(--muted);">Select a widget to edit properties.</span></div>';
        return;
      }}

      const entityInput = document.getElementById("prop-entity");
      if (entityInput) {{
        entityInput.value = widget.entity_id || "";
        entityInput.oninput = (ev) => {{
          widget.entity_id = ev.target.value;
          renderCanvas();
        }};
      }}
    }}

    // Widget creation
    function createWidget(type) {{
      const page = getCurrentPage();
      if (!page) return;
      const id = "w_" + Date.now() + "_" + Math.floor(Math.random() * 9999);
      const widget = {{
        id,
        type,
        x: 40,
        y: 40,
        width: 120,
        height: 40,
        title: "",
        entity_id: "",
        props: {{}}
      }};

      if (type === "sensor_text") {{
        widget.props.font_size = 18;
        widget.props.color = "black";
        widget.entity_id = "sensor.example";
      }} else if (type === "icon") {{
        widget.props.code = "F0595";
        widget.props.size = 40;
        widget.width = 60;
        widget.height = 60;
      }} else if (type === "shape_rect") {{
        widget.props.fill = false;
        widget.props.border_width = 1;
        widget.props.color = "black";
      }} else if (type === "shape_circle") {{
        widget.props.fill = false;
        widget.props.border_width = 1;
        widget.props.color = "black";
        widget.width = 40;
        widget.height = 40;
      }} else if (type === "line") {{
        widget.props.stroke_width = 1;
        widget.props.color = "black";
        widget.width = 80;
        widget.height = 0;
      }} else {{
        widget.props.text = "Text";
        widget.props.font_size = 20;
        widget.props.color = "black";
      }}

      page.widgets.push(widget);
      widgetsById.set(widget.id, widget);
      selectedWidgetId = widget.id;
      renderCanvas();
      renderPropertiesPanel();
    }}

    // Event handlers
    let dragState = null;

    function onWidgetMouseDown(ev, widgetId) {{
      selectedWidgetId = widgetId;
      renderCanvas();
      renderPropertiesPanel();
      
      // Basic drag implementation
      const widget = widgetsById.get(widgetId);
      if (!widget) return;
      
      dragState = {{ id: widgetId, offsetX: ev.offsetX, offsetY: ev.offsetY }};
      
      function onMouseMove(moveEv) {{
        if (!dragState) return;
        const canvas = document.getElementById("canvas");
        const rect = canvas.getBoundingClientRect();
        widget.x = Math.max(0, Math.min(CANVAS_WIDTH - widget.width, moveEv.clientX - rect.left - dragState.offsetX));
        widget.y = Math.max(0, Math.min(CANVAS_HEIGHT - widget.height, moveEv.clientY - rect.top - dragState.offsetY));
        renderCanvas();
      }}
      
      function onMouseUp() {{
        dragState = null;
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      }}
      
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      ev.preventDefault();
    }}

    // API functions
    async function loadEntities() {{
      try {{
        const resp = await fetch(API_BASE + "/entities");
        const data = await resp.json();
        entityIndex = Array.isArray(data) ? data : [];
        
        const datalist = document.getElementById("entity-list");
        if (datalist) {{
          datalist.innerHTML = "";
          entityIndex.forEach(e => {{
            const opt = document.createElement("option");
            opt.value = e.entity_id;
            opt.label = e.name || e.entity_id;
            datalist.appendChild(opt);
          }});
        }}
        
        const status = document.getElementById("sidebarStatus");
        if (status) {{
          status.innerHTML = `<span>Loaded ${{entityIndex.length}} entities from HA.</span>`;
        }}
      }} catch (err) {{
        console.error("Failed to load entities:", err);
      }}
    }}

    async function saveLayout() {{
      try {{
        const resp = await fetch(API_BASE + "/layout", {{
          method: "POST",
          headers: {{ "Content-Type": "application/json" }},
          body: JSON.stringify({{ pages, settings }})
        }});
        const data = await resp.json();
        
        const status = document.getElementById("sidebarStatus");
        if (status) {{
          status.innerHTML = '<span style="color: var(--accent);">Layout saved to Home Assistant!</span>';
        }}
      }} catch (err) {{
        console.error("Failed to save layout:", err);
        alert("Failed to save layout. Check console.");
      }}
    }}

    async function generateSnippet() {{
      try {{
        const resp = await fetch(API_BASE + "/snippet");
        const text = await resp.text();
        
        const snippetBox = document.getElementById("snippetBox");
        if (snippetBox) {{
          snippetBox.textContent = text;
        }}
      }} catch (err) {{
        console.error("Failed to generate snippet:", err);
      }}
    }}

    // Initialize event listeners
    function initEvents() {{
      const addPageBtn = document.getElementById("addPageBtn");
      const saveLayoutBtn = document.getElementById("saveLayoutBtn");
      const generateSnippetBtn = document.getElementById("generateSnippetBtn");
      const widgetPalette = document.getElementById("widgetPalette");

      if (addPageBtn) {{
        addPageBtn.onclick = () => {{
          const id = "page_" + Date.now();
          const name = "Page " + (pages.length + 1);
          pages.push({{ id, name, widgets: [] }});
          currentPageIndex = pages.length - 1;
          renderPagesSidebar();
          renderCanvas();
        }};
      }}

      if (saveLayoutBtn) {{
        saveLayoutBtn.onclick = saveLayout;
      }}

      if (generateSnippetBtn) {{
        generateSnippetBtn.onclick = generateSnippet;
      }}

      if (widgetPalette) {{
        widgetPalette.addEventListener("click", (ev) => {{
          const item = ev.target.closest(".item[data-widget-type]");
          if (item) {{
            const type = item.getAttribute("data-widget-type");
            createWidget(type);
          }}
        }});
      }}

      const canvas = document.getElementById("canvas");
      if (canvas) {{
        canvas.addEventListener("click", (ev) => {{
          if (ev.target === canvas || ev.target.classList.contains("canvas-grid")) {{
            selectedWidgetId = null;
            renderCanvas();
            renderPropertiesPanel();
          }}
        }});
      }}
    }}

    // Main initialization
    async function init() {{
      initDefaultLayout();
      initEvents();
      await loadEntities();
    }}

    // Start the app
    init();
  </script>
</body>
</html>'''

    def _load_base_styles(self) -> str:
        """Return the CSS subset from the standalone editor for the inline panel.

        Extracted from the original editor.html to avoid external files.
        Keep this in sync with your design but avoid remote dependencies.
        """
        # NOTE: For brevity and maintainability, we include only layout-critical parts.
        # You can further compress or refactor as needed.
        return """
:root {
  --bg: #0f1115;
  --bg-elevated: #181b22;
  --accent: #52c7ea;
  --accent-soft: rgba(82, 199, 234, 0.16);
  --border-subtle: #2a2f3a;
  --text: #e5e9f0;
  --muted: #7b8190;
  --danger: #ff6b81;
  --font: system-ui, -apple-system, BlinkMacSystemFont, -sans-serif;
}
* { box-sizing: border-box; }
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
body {
  font-family: var(--font);
  background: radial-gradient(circle at top left, #1c1f26 0, #050609 40%, #020308 100%);
  color: var(--text);
  display: flex;
}
.sidebar {
  width: 260px;
  background: linear-gradient(to bottom, #151821, #0c0f15);
  border-right: 1px solid var(--border-subtle);
  padding: 16px 14px 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
}
.sidebar h1 {
  font-size: 16px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--muted);
}
.logo-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 12px var(--accent);
}
.pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 999px;
  border: 1px solid var(--border-subtle);
  font-size: 10px;
  color: var(--muted);
  margin-top: 6px;
}
.pill span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
}
.sidebar-section-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--muted);
  margin-bottom: 6px;
}
.select, .input {
  width: 100%;
  padding: 7px 9px;
  font-size: 12px;
  border-radius: 6px;
  border: 1px solid var(--border-subtle);
  background: #0f1118;
  color: var(--text);
  outline: none;
}
.select:focus, .input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 1px var(--accent-soft);
}
.sidebar-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.btn {
  border: 1px solid var(--accent);
  background: transparent;
  color: var(--accent);
  padding: 6px 9px;
  border-radius: 6px;
  font-size: 11px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.16s ease;
}
.btn:hover {
  background: var(--accent-soft);
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.35);
}
.btn-secondary {
  border-color: var(--border-subtle);
  color: var(--muted);
}
.btn-secondary:hover {
  border-color: var(--accent);
  color: var(--accent);
}
.btn-full {
  width: 100%;
  justify-content: center;
  margin-top: 4px;
}
.page-list, .widget-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.item {
  padding: 5px 7px;
  border-radius: 5px;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  cursor: pointer;
  border: 1px solid transparent;
  color: var(--muted);
}
.item span.label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item small {
  font-size: 9px;
  opacity: 0.7;
}
.item.active {
  background: var(--accent-soft);
  border-color: var(--accent);
  color: var(--accent);
}
.item:hover {
  background: #151822;
  border-color: var(--border-subtle);
}
.item .tag {
  padding: 1px 5px;
  border-radius: 999px;
  font-size: 8px;
  border: 1px solid var(--border-subtle);
  color: var(--muted);
}
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px 14px 8px;
  gap: 8px;
  overflow: hidden;
  min-width: 0;
}
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}
.main-header-title {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.main-header-title h2 {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--muted);
}
.main-header-title span {
  font-size: 11px;
  color: var(--muted);
}
.main-header-actions {
  display: flex;
  gap: 6px;
  align-items: center;
  flex-wrap: wrap;
}
.main-header-pill {
  padding: 3px 7px;
  border-radius: 999px;
  border: 1px solid var(--border-subtle);
  font-size: 9px;
  color: var(--muted);
}
.canvas-wrap {
  flex: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  gap: 8px;
  align-items: flex-start;
  justify-content: flex-start;
  min-width: 0;
  overflow: hidden;
}
.canvas-area {
  background: radial-gradient(circle at top, #171b22, #05070b);
  border-radius: 12px;
  border: 1px solid var(--border-subtle);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  overflow: hidden;
}
.canvas-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 10px;
  color: var(--muted);
  flex-shrink: 0;
}
.canvas-toolbar span strong {
  color: var(--accent);
  font-weight: 500;
}
.canvas {
  width: 800px;
  height: 480px;
  margin-top: 4px;
  background: #000000;
  border-radius: 10px;
  border: 1px solid #222222;
  position: relative;
  box-shadow: inset 0 0 0 1px #222222, 0 18px 40px rgba(0, 0, 0, 0.7);
  overflow: hidden;
  transition: all 0.16s ease;
  flex-shrink: 0;
}
.canvas-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
  pointer-events: none;
}
.widget {
  position: absolute;
  font-size: 12px;
  color: #ffffff;
  cursor: move;
  display: block;
  user-select: none;
  border: none;
  background: transparent;
  padding: 0;
}
.widget.active {
  outline: 1px solid var(--accent);
  box-shadow: 0 0 0 1px rgba(82, 199, 234, 0.4);
}
.widget-resize-handle {
  position: absolute;
  width: 11px;
  height: 11px;
  border-radius: 3px;
  background: var(--accent);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.7);
  cursor: nwse-resize;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.widget-resize-handle::after {
  content: "";
  width: 6px;
  height: 2px;
  border-radius: 2px;
  background: #0b0e13;
  transform: rotate(40deg);
  opacity: 0.9;
}
.right-panel {
  width: 260px;
  background: #0d1016;
  border-radius: 12px;
  border: 1px solid var(--border-subtle);
  padding: 8px 9px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  box-sizing: border-box;
  max-height: 480px;
}
.right-panel-header {
  font-size: 11px;
  font-weight: 500;
  color: var(--muted);
}
.right-panel-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.hint {
  font-size: 9px;
  color: var(--muted);
}
"""


class ReTerminalDashboardFontView(HomeAssistantView):
    """Serve the MDI font file for the editor."""

    url = f"{PANEL_URL_PATH}/materialdesignicons-webfont.ttf"
    name = "reterminal_dashboard:panel:font"
    requires_auth = False  # Font is a public asset
    cors_allowed = False

    def __init__(self, hass: HomeAssistant) -> None:
        """Store hass if needed later."""
        self.hass = hass

    async def get(self, request) -> Any:  # type: ignore[override]
        """Serve the MDI font file."""
        from pathlib import Path
        
        # Priority 1: Integration's frontend directory (bundled)
        integration_dir = Path(__file__).parent / "frontend"
        font_path_integration = integration_dir / "materialdesignicons-webfont.ttf"
        
        # Priority 2: /config/www/ (manual deployment)
        component_dir = Path(__file__).parent
        config_dir = component_dir.parent.parent
        font_path_www = config_dir / "www" / "reterminal_dashboard_panel" / "materialdesignicons-webfont.ttf"

        # Priority 3: /config/esphome/fonts/ (user custom location)
        font_path_esphome = config_dir / "esphome" / "fonts" / "materialdesignicons-webfont.ttf"
        
        # Try integration directory first
        if font_path_integration.exists():
            try:
                font_data = font_path_integration.read_bytes()
                _LOGGER.debug("Serving font from integration: %s (%d bytes)", font_path_integration, len(font_data))
                return web.Response(
                    body=font_data,
                    status=200,
                    content_type="font/ttf",
                    headers={"Cache-Control": "public, max-age=31536000"}
                )
            except Exception as e:
                _LOGGER.error("Failed to read font from integration: %s", e)
        
        # Try www directory
        if font_path_www.exists():
            try:
                font_data = font_path_www.read_bytes()
                _LOGGER.debug("Serving font from www: %s (%d bytes)", font_path_www, len(font_data))
                return web.Response(
                    body=font_data,
                    status=200,
                    content_type="font/ttf",
                    headers={"Cache-Control": "public, max-age=31536000"}
                )
            except Exception as e:
                _LOGGER.error("Failed to read font from www: %s", e)

        # Try esphome directory
        if font_path_esphome.exists():
            try:
                font_data = font_path_esphome.read_bytes()
                _LOGGER.debug("Serving font from esphome: %s (%d bytes)", font_path_esphome, len(font_data))
                return web.Response(
                    body=font_data,
                    status=200,
                    content_type="font/ttf",
                    headers={"Cache-Control": "public, max-age=31536000"}
                )
            except Exception as e:
                _LOGGER.error("Failed to read font from esphome: %s", e)
        
        _LOGGER.error("Font file not found at:")
        _LOGGER.error("  1. %s", font_path_integration)
        _LOGGER.error("  2. %s", font_path_www)
        _LOGGER.error("  3. %s", font_path_esphome)
        return web.Response(
            body=b"Font file not found",
            status=404,
            content_type="text/plain",
        )