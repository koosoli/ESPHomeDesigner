"""
Panel and static asset views for ESPHome Designer.

The Home Assistant sidebar entry loads a small custom panel module, which in
turn renders the editor inside a same-origin iframe. The iframe shell and the
bundled frontend assets must remain publicly readable so Home Assistant can
bootstrap the panel, while the real backend API stays authenticated.
"""

from __future__ import annotations

import asyncio
import html
import json
import logging
import mimetypes
import re
from pathlib import Path
from typing import Any

from aiohttp import web
from homeassistant.components.http import HomeAssistantView
from homeassistant.core import HomeAssistant
from homeassistant.helpers.http import KEY_AUTHENTICATED

from .const import API_BASE_PATH

_LOGGER = logging.getLogger(__name__)


PANEL_URL_PATH = "/esphome-designer/editor/index.html"
FRONTEND_DIR = Path(__file__).parent / "frontend"
DIST_DIR = FRONTEND_DIR / "dist"
DIST_MANIFEST_PATH = DIST_DIR / ".vite" / "manifest.json"
PANEL_ENTRY_KEY = "panel/esphome-designer-panel.js"
FONT_CANDIDATES = (
    FRONTEND_DIR / "materialdesignicons-webfont.ttf",
    Path(__file__).parent.parent.parent / "www" / "esphome_designer_panel" / "materialdesignicons-webfont.ttf",
    Path(__file__).parent.parent.parent / "esphome" / "fonts" / "materialdesignicons-webfont.ttf",
)


def _load_dist_manifest() -> dict[str, Any]:
    if not DIST_MANIFEST_PATH.exists():
        return {}

    try:
        return json.loads(DIST_MANIFEST_PATH.read_text(encoding="utf-8"))
    except Exception as err:  # noqa: BLE001
        _LOGGER.warning("Failed to read Vite manifest %s: %s", DIST_MANIFEST_PATH, err)
        return {}


def get_frontend_cache_token() -> str:
    manifest_path = DIST_MANIFEST_PATH if DIST_MANIFEST_PATH.exists() else FRONTEND_DIR / "index.html"
    try:
        return str(manifest_path.stat().st_mtime_ns)
    except FileNotFoundError:
        return "0"


def _append_cache_token(url: str) -> str:
    separator = "&" if "?" in url else "?"
    return f"{url}{separator}v={get_frontend_cache_token()}"


def get_dist_entry_url(entry_key: str) -> str | None:
    manifest = _load_dist_manifest()
    entry = manifest.get(entry_key)
    if not entry:
        return None

    asset_path = entry.get("file")
    if not asset_path:
        return None

    return _append_cache_token(f"/esphome-designer/editor/static/dist/{asset_path}")


def get_panel_module_url() -> str:
    return get_dist_entry_url(PANEL_ENTRY_KEY) or _append_cache_token(
        "/esphome-designer/editor/static/panel/esphome-designer-panel.js"
    )


def _rewrite_editor_asset_path(prefix: str, path: str) -> str:
    if path.startswith(("http://", "https://", "data:", "/")):
        return path

    while path.startswith("./"):
        path = path[2:]

    if prefix == "dist":
        return _append_cache_token(f"/esphome-designer/editor/static/dist/{path}")

    return _append_cache_token(f"/esphome-designer/editor/static/{path}")


def _rewrite_editor_html(prefix: str, html_text: str) -> str:
    def rewrite_attr(match: re.Match[str]) -> str:
        attr = match.group(1)
        path = match.group(2)
        return f'{attr}="{_rewrite_editor_asset_path(prefix, path)}"'

    return re.sub(r'(src|href)="([^"]+)"', rewrite_attr, html_text)


def _static_cache_headers(path: str, is_binary: bool) -> dict[str, str]:
    normalized = path.replace("\\", "/")
    immutable_dist_asset = normalized.startswith("dist/assets/") and bool(re.search(r"-[A-Za-z0-9_-]{6,}\.", normalized))

    headers = {
        "Access-Control-Allow-Private-Network": "true",
    }

    if immutable_dist_asset or is_binary:
        headers["Cache-Control"] = "public, max-age=31536000, immutable"
        return headers

    headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    headers["Pragma"] = "no-cache"
    headers["Expires"] = "0"
    return headers


def _no_cache_headers() -> dict[str, str]:
    return {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
    }


def _resolve_frontend_html_candidates() -> tuple[tuple[str, Path], ...]:
    component_dir = Path(__file__).parent
    config_dir = component_dir.parent.parent
    return (
        ("dist", DIST_DIR / "index.html"),
        ("raw", FRONTEND_DIR / "index.html"),
        ("www", config_dir / "www" / "esphome_designer_panel" / "index.html"),
    )


def _resolve_static_asset_path(path: str) -> Path:
    if path.startswith("dist/"):
        candidate = (DIST_DIR / path[5:]).resolve()
        candidate.relative_to(DIST_DIR.resolve())
        return candidate

    dist_candidate = (DIST_DIR / path).resolve()
    raw_candidate = (FRONTEND_DIR / path).resolve()

    if dist_candidate.exists():
        dist_candidate.relative_to(DIST_DIR.resolve())
        return dist_candidate

    raw_candidate.relative_to(FRONTEND_DIR.resolve())
    return raw_candidate


def _resolve_custom_profile_path(hass: HomeAssistant, path: str) -> Path:
    profile_filename = path.removeprefix("esphomedesigner_custom_profiles/").strip("/")
    if ".." in profile_filename or "/" in profile_filename or "\\" in profile_filename:
        raise ValueError("profile_path_escape")

    custom_profiles_dir = Path(hass.config.path("esphomedesigner_custom_profiles"))
    file_path = (custom_profiles_dir / profile_filename).resolve()
    file_path.relative_to(custom_profiles_dir.resolve())
    return file_path


def _guess_content_type(path: str, file_path: Path) -> str:
    if path.endswith(".js"):
        return "application/javascript"
    if path.endswith(".css"):
        return "text/css"
    if path.endswith(".json"):
        return "application/json"

    guessed, _ = mimetypes.guess_type(str(file_path))
    if guessed:
        return guessed

    if path.endswith(".ttf"):
        return "font/ttf"
    if path.endswith(".woff"):
        return "font/woff"
    if path.endswith(".woff2"):
        return "font/woff2"
    return "application/octet-stream"


def _render_unavailable_editor_html(searched_paths: tuple[Path, ...]) -> str:
    escaped_paths = "\n".join(
        f"<li><code>{html.escape(str(path))}</code></li>"
        for path in searched_paths
    )
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ESPHome Designer Unavailable</title>
  <style>
    :root {{
      color-scheme: dark;
      --bg: #0b0e13;
      --panel: #121722;
      --border: rgba(255,255,255,0.08);
      --text: #f5f7fb;
      --muted: rgba(245,247,251,0.7);
      --accent: #6ee7b7;
      --danger: #fb7185;
    }}
    body {{
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: radial-gradient(circle at top, #182033 0%, var(--bg) 60%);
      color: var(--text);
      font-family: system-ui, sans-serif;
    }}
    main {{
      width: min(780px, calc(100vw - 32px));
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 18px;
      padding: 24px;
      box-sizing: border-box;
      box-shadow: 0 28px 80px rgba(0, 0, 0, 0.35);
    }}
    h1 {{
      margin: 0 0 10px;
      font-size: 28px;
    }}
    p {{
      margin: 0 0 14px;
      color: var(--muted);
      line-height: 1.55;
    }}
    .status {{
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 18px;
      color: var(--danger);
      font-weight: 600;
    }}
    ul {{
      margin: 16px 0 0;
      padding-left: 22px;
    }}
    li {{
      margin: 8px 0;
      color: var(--muted);
    }}
    code {{
      color: var(--text);
      background: rgba(255,255,255,0.06);
      padding: 2px 6px;
      border-radius: 6px;
    }}
  </style>
</head>
<body>
  <main>
    <div class="status">Frontend assets are missing</div>
    <h1>ESPHome Designer could not find its editor bundle</h1>
    <p>
      The Home Assistant panel route is working, but the built frontend files are not present
      in any of the expected locations. That usually means the integration was copied without
      its compiled frontend assets.
    </p>
    <p>
      Rebuild the frontend or reinstall the integration package, then reload Home Assistant.
    </p>
    <ul>
      {escaped_paths}
    </ul>
  </main>
</body>
</html>"""


class ESPHomeDesignerPanelView(HomeAssistantView):
    """Serve the editor HTML shell for the panel iframe."""

    url = PANEL_URL_PATH
    name = "esphome_designer:panel"
    requires_auth = False
    cors_allowed = False

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass

    async def get(self, request) -> Any:  # type: ignore[override]
        searched_paths: list[Path] = []
        for prefix, candidate in _resolve_frontend_html_candidates():
            searched_paths.append(candidate)
            if not candidate.exists():
                continue

            try:
                html_text = await asyncio.to_thread(candidate.read_text, encoding="utf-8")
                if prefix != "www":
                    html_text = _rewrite_editor_html(prefix, html_text)

                _LOGGER.info("Serving editor HTML from %s: %s", prefix, candidate)
                return web.Response(
                    body=html_text,
                    status=200,
                    content_type="text/html",
                    headers=_no_cache_headers(),
                )
            except Exception as err:  # noqa: BLE001
                _LOGGER.error("Failed to read editor HTML from %s: %s", candidate, err)

        _LOGGER.error("ESPHome Designer frontend bundle not found; serving diagnostic fallback")
        return web.Response(
            body=_render_unavailable_editor_html(tuple(searched_paths)),
            status=200,
            content_type="text/html",
            headers=_no_cache_headers(),
        )


class ESPHomeDesignerStaticView(HomeAssistantView):
    """Serve static frontend assets for the panel iframe."""

    url = "/esphome-designer/editor/static/{path:.*}"
    name = "esphome_designer:static"
    requires_auth = False
    cors_allowed = False

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass

    async def get(self, request, path: str) -> Any:
        if ".." in path or path.startswith("/"):
            _LOGGER.warning("Blocked path traversal attempt: %s", path)
            return web.Response(status=403, text="Forbidden")

        try:
            if path.startswith("esphomedesigner_custom_profiles/"):
                if not request.get(KEY_AUTHENTICATED):
                    return web.Response(status=401, text="Unauthorized")
                file_path = _resolve_custom_profile_path(self.hass, path)
            else:
                file_path = _resolve_static_asset_path(path)
        except ValueError:
            _LOGGER.warning("Blocked static path escape attempt: %s", path)
            return web.Response(status=403, text="Forbidden")

        if not file_path.exists() or not file_path.is_file():
            _LOGGER.debug("Static file not found: %s", file_path)
            return web.Response(status=404, text="File not found")

        content_type = _guess_content_type(path, file_path)
        is_binary = content_type.startswith(("font/", "image/", "application/octet"))

        try:
            if is_binary:
                content = await asyncio.to_thread(file_path.read_bytes)
            else:
                content = await asyncio.to_thread(file_path.read_text, encoding="utf-8")

            return web.Response(
                body=content,
                status=200,
                content_type=content_type,
                headers=_static_cache_headers(path, is_binary),
            )
        except Exception as err:  # noqa: BLE001
            _LOGGER.error("Failed to serve static file %s: %s", path, err)
            return web.Response(status=500, text="Internal Server Error")


class ESPHomeDesignerFontView(HomeAssistantView):
    """Serve the fallback MDI font file used by the legacy shell."""

    url = f"{PANEL_URL_PATH}/materialdesignicons-webfont.ttf"
    name = "esphome_designer:panel:font"
    requires_auth = False
    cors_allowed = False

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass

    async def get(self, request) -> Any:  # type: ignore[override]
        for candidate in FONT_CANDIDATES:
            if not candidate.exists():
                continue

            try:
                font_data = await asyncio.to_thread(candidate.read_bytes)
                return web.Response(
                    body=font_data,
                    status=200,
                    content_type="font/ttf",
                    headers={"Cache-Control": "public, max-age=31536000"},
                )
            except Exception as err:  # noqa: BLE001
                _LOGGER.error("Failed to read font from %s: %s", candidate, err)

        _LOGGER.error("Font file not found for ESPHome Designer panel fallback")
        return web.Response(
            body=b"Font file not found",
            status=404,
            content_type="text/plain",
        )
