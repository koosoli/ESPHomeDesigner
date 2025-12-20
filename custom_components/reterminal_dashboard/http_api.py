"""
HTTP API views for the reTerminal Dashboard Designer integration.

Responsibilities:
- Provide layout CRUD for the editor:
    GET  /api/reterminal_dashboard/layout
    POST /api/reterminal_dashboard/layout

- Provide a YAML snippet export endpoint:
    GET /api/reterminal_dashboard/snippet

- Provide a YAML snippet import endpoint:
    POST /api/reterminal_dashboard/import_snippet

Notes:
- All endpoints are local to Home Assistant.
- No WiFi/api/ota/logger/secrets are generated here.
- The YAML snippet is additive and must be pasted below an existing base ESPHome config.
"""

from __future__ import annotations

import logging
from http import HTTPStatus
from typing import Any

from aiohttp import web
from homeassistant.components.http import HomeAssistantView
from homeassistant.core import HomeAssistant
from homeassistant.helpers.json import json_dumps

from .const import (
    API_BASE_PATH,
)
from .models import DeviceConfig
from .storage import DashboardStorage
from .yaml_parser import yaml_to_layout
from .hardware_api import ReTerminalHardwareListView, ReTerminalHardwareUploadView

_LOGGER = logging.getLogger(__name__)


class ReTerminalLayoutView(HomeAssistantView):
    """Provide layout GET/POST for the reTerminal dashboard editor.

    For the MVP we maintain a single logical layout/device.
    """

    url = f"{API_BASE_PATH}/layout"
    name = "api:reterminal_dashboard_layout"
    requires_auth = False  # Temporarily disable for testing
    cors_allowed = True

    def __init__(self, hass: HomeAssistant, storage: DashboardStorage) -> None:
        self.hass = hass
        self.storage = storage

    async def get(self, request) -> Any:  # type: ignore[override]
        """Return the stored layout for the default device."""
        device = await self._async_get_default_device()
        _LOGGER.info("Loading layout: %d pages, %d total widgets", 
                     len(device.pages),
                     sum(len(p.widgets) for p in device.pages))
        return self.json(device.to_dict(), status_code=HTTPStatus.OK)

    async def post(self, request) -> Any:  # type: ignore[override]
        """Update layout for the default device from JSON body."""
        try:
            body = await request.json()
        except Exception as exc:  # noqa: BLE001
            _LOGGER.warning("Invalid JSON in layout update: %s", exc)
            return self.json(
                {"error": "invalid_json"},
                status_code=HTTPStatus.BAD_REQUEST,
            )

        _LOGGER.info("Received layout update with %d pages, %d total widgets", 
                     len(body.get("pages", [])),
                     sum(len(p.get("widgets", [])) for p in body.get("pages", [])))

        updated = await self.storage.async_update_layout_default(body)
        if not isinstance(updated, DeviceConfig):
            # async_update_layout_default should always return a DeviceConfig,
            # but guard to avoid leaking tracebacks to the client.
            _LOGGER.error("Failed to update layout: storage returned invalid result")
            return self.json(
                {"error": "update_failed"},
                status_code=HTTPStatus.BAD_REQUEST,
            )

        _LOGGER.info("Layout saved successfully: %d pages, %d total widgets", 
                     len(updated.pages),
                     sum(len(p.widgets) for p in updated.pages))

        return self.json(updated.to_dict(), status_code=HTTPStatus.OK)

    async def _async_get_default_device(self) -> DeviceConfig:
        """Return the default device/layout, creating if necessary."""
        device = await self.storage.async_get_default_device()
        return device

    # Convenience wrappers for HA's HomeAssistantView API
    def json(self, data: Any, status_code: int = HTTPStatus.OK):
        return web.Response(
            body=json_dumps(data),
            status=status_code,
            content_type="application/json",
        )


# Note: YAML snippet generation is now handled entirely client-side in yaml_export.js
# The /snippet endpoint has been removed as it's no longer needed.


class ReTerminalImportSnippetView(HomeAssistantView):
    """Import an ESPHome YAML snippet and reconstruct the layout.

    Accepts a snippet that roughly follows our generated pattern:
    - Known display_page usage
    - display lambda with page branches and widget markers / patterns

    Fails clearly if the structure cannot be parsed safely.
    """

    url = f"{API_BASE_PATH}/import_snippet"
    name = "api:reterminal_dashboard_import_snippet"
    requires_auth = False  # Temporarily disable for testing
    cors_allowed = True

    def __init__(self, hass: HomeAssistant, storage: DashboardStorage) -> None:
        self.hass = hass
        self.storage = storage

    async def post(self, request) -> Any:  # type: ignore[override]
        """Import snippet and update default layout."""
        try:
            body = await request.json()
        except Exception as exc:  # noqa: BLE001
            _LOGGER.warning("Invalid JSON in import_snippet: %s", exc)
            return self._json(
                {"error": "invalid_json"},
                status_code=HTTPStatus.BAD_REQUEST,
            )

        yaml_snippet = body.get("yaml")
        if not isinstance(yaml_snippet, str) or not yaml_snippet.strip():
            return self._json(
                {"error": "missing_yaml"},
                status_code=HTTPStatus.BAD_REQUEST,
            )

        try:
            device = yaml_to_layout(yaml_snippet)
        except ValueError as exc:
            code = str(exc)
            _LOGGER.error("ValueError in yaml_to_layout: %s", exc, exc_info=True)
            if code == "invalid_yaml":
                msg = "Invalid YAML syntax. Check for indentation errors."
            elif code == "unrecognized_display_structure":
                msg = "Could not find display: block with id: epaper_display and lambda."
            elif code == "no_pages_found":
                msg = "No page blocks found. Expected 'if (page == 0) { ... }' structure in lambda."
            else:
                msg = "Snippet does not match expected reterminal_dashboard pattern."
            
            if code in (
                "invalid_yaml",
                "unrecognized_display_structure",
                "no_pages_found",
            ):
                return self._json(
                    {
                        "error": code,
                        "message": msg,
                    },
                    status_code=HTTPStatus.BAD_REQUEST,
                )
            _LOGGER.error("Unexpected error in yaml_to_layout: %s", exc)
            return self._json(
                {"error": "import_failed", "message": str(exc)},
                status_code=HTTPStatus.INTERNAL_SERVER_ERROR,
            )
        except Exception as exc:  # noqa: BLE001
            _LOGGER.error("Snippet import failed: %s", exc, exc_info=True)
            return self._json(
                {"error": "import_failed", "message": str(exc)},
                status_code=HTTPStatus.INTERNAL_SERVER_ERROR,
            )

        try:
            updated = await self.storage.async_update_layout_from_device(device)
        except Exception as exc:  # noqa: BLE001
            _LOGGER.error("Failed to persist imported layout: %s", exc)
            return self._json(
                {"error": "persist_failed"},
                status_code=HTTPStatus.INTERNAL_SERVER_ERROR,
            )

        return self._json(updated.to_dict(), status_code=HTTPStatus.OK)

    def _json(self, data: Any, status_code: int = HTTPStatus.OK):
        return web.Response(
            body=json_dumps(data),
            status=status_code,
            content_type="application/json",
        )


class ReTerminalEntitiesView(HomeAssistantView):
    """Expose a filtered list of Home Assistant entities for the editor entity picker.

    This endpoint is:
    - Authenticated (requires_auth = True)
    - Local to Home Assistant
    - Intended only for use by the reTerminal dashboard editor panel
    """

    url = f"{API_BASE_PATH}/entities"
    name = "api:reterminal_dashboard_entities"
    requires_auth = False  # Temporarily disable for testing
    cors_allowed = True

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass

    async def get(self, request) -> Any:  # type: ignore[override]
        """Return a compact list of entities.

        Optional query parameters:
        - domains: comma-separated domains to include, e.g. "sensor,binary_sensor,weather"
        - search: case-insensitive substring filter on entity_id or friendly_name
        """
        try:
            params = request.rel_url.query  # type: ignore[attr-defined]
        except Exception:  # noqa: BLE001
            params = {}

        # Parse domains filter
        domain_filter: set[str] | None = None
        raw_domains = params.get("domains")
        if raw_domains:
            domain_filter = {
                d.strip().lower()
                for d in raw_domains.split(",")
                if d.strip()
            }
            if not domain_filter:
                domain_filter = None

        # Parse search filter
        raw_search = params.get("search", "")
        search = raw_search.strip().lower()

        results: list[dict[str, str]] = []

        for state in self.hass.states.async_all():
            entity_id = state.entity_id
            domain = entity_id.split(".", 1)[0] if "." in entity_id else ""
            if domain_filter is not None and domain not in domain_filter:
                continue

            name = state.name or entity_id

            if search:
                haystack = f"{entity_id} {name}".lower()
                if search not in haystack:
                    continue

            results.append(
                {
                    "entity_id": entity_id,
                    "name": name,
                    "domain": domain,
                    "state": state.state,
                    "unit": state.attributes.get("unit_of_measurement", ""),
                    "attributes": state.attributes,
                }
            )

            # Hard safety cap; avoid returning an excessively large payload.
            if len(results) >= 5000:
                break

        return self._json(results)

    def _json(self, data: Any, status_code: int = HTTPStatus.OK):
        return web.Response(
            body=json_dumps(data),
            status=status_code,
            content_type="application/json",
        )


class ReTerminalTestView(HomeAssistantView):
    """Simple test endpoint to verify HTTP views are working."""

    url = f"{API_BASE_PATH}/test"
    name = "api:reterminal_dashboard_test"
    requires_auth = False  # Temporarily disable for testing
    cors_allowed = True

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass

    async def get(self, request) -> Any:  # type: ignore[override]
        """Return test response."""
        return self._json({
            "status": "ok", 
            "message": "reTerminal Dashboard API is working",
            "integration": "reterminal_dashboard"
        })

    def _json(self, data: Any, status_code: int = HTTPStatus.OK):
        return web.Response(
            body=json_dumps(data),
            status=status_code,
            content_type="application/json",
        )


class ReTerminalImageProxyView(HomeAssistantView):
    """Proxy ESPHome images from /config/esphome/images/ for editor preview.
    
    This allows the editor to preview images that will be used on the device.
    Only serves files from the ESPHome images directory for security.
    """

    url = f"{API_BASE_PATH}/image_proxy"
    name = "api:reterminal_dashboard_image_proxy"
    requires_auth = False  # Temporarily disable for testing
    cors_allowed = True

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass

    async def get(self, request) -> Any:  # type: ignore[override]
        """Serve an image file from ESPHome directory."""
        import os
        import mimetypes
        from pathlib import Path
        
        # Get the requested path from query parameter
        path = request.rel_url.query.get("path", "")  # type: ignore[attr-defined]
        
        if not path:
            return web.Response(
                text="Missing path parameter",
                status=HTTPStatus.BAD_REQUEST,
            )
        
        # Security: Only allow paths that start with /config/esphome/
        if not path.startswith("/config/esphome/"):
            _LOGGER.warning("Image proxy rejected invalid path: %s", path)
            return web.Response(
                text="Invalid path - must be under /config/esphome/",
                status=HTTPStatus.FORBIDDEN,
            )
        
        # Convert /config to actual Home Assistant config path
        config_dir = self.hass.config.path()
        # Remove /config prefix and join with actual config path
        relative_path = path.replace("/config/", "", 1)
        full_path = Path(config_dir) / relative_path
        
        # Security: Ensure the resolved path is still under config directory
        try:
            full_path = full_path.resolve()
            config_dir_resolved = Path(config_dir).resolve()
            if not str(full_path).startswith(str(config_dir_resolved)):
                _LOGGER.warning("Image proxy rejected path escape attempt: %s", path)
                return web.Response(
                    text="Path escape attempt detected",
                    status=HTTPStatus.FORBIDDEN,
                )
        except Exception as exc:  # noqa: BLE001
            _LOGGER.warning("Image proxy path resolution error: %s", exc)
            return web.Response(
                text="Invalid path",
                status=HTTPStatus.BAD_REQUEST,
            )
        
        # Check if file exists
        if not full_path.is_file():
            _LOGGER.debug("Image proxy: file not found: %s", full_path)
            return web.Response(
                text="File not found",
                status=HTTPStatus.NOT_FOUND,
            )
        
        # Determine content type
        content_type, _ = mimetypes.guess_type(str(full_path))
        if not content_type or (not content_type.startswith("image/") and not content_type.startswith("font/")):
            content_type = "application/octet-stream"
        
        # Read and return the file
        try:
            with open(full_path, "rb") as f:
                image_data = f.read()
            
            return web.Response(
                body=image_data,
                status=HTTPStatus.OK,
                content_type=content_type,
                headers={
                    "Cache-Control": "public, max-age=3600",
                },
            )
        except Exception as exc:  # noqa: BLE001
            _LOGGER.error("Image proxy read error: %s", exc)
            return web.Response(
                text="Error reading file",
                status=HTTPStatus.INTERNAL_SERVER_ERROR,
            )


class ReTerminalLayoutsListView(HomeAssistantView):
    """List all layouts, create new layout, or get a specific layout."""

    url = f"{API_BASE_PATH}/layouts"
    name = "api:reterminal_dashboard_layouts"
    requires_auth = False
    cors_allowed = True

    def __init__(self, hass: HomeAssistant, storage: DashboardStorage) -> None:
        self.hass = hass
        self.storage = storage

    async def get(self, request) -> Any:
        """Return a list of all layouts with summary info."""
        if self.storage._state is None:
            await self.storage.async_load()

        layouts = []
        for device_id, device in self.storage.state.devices.items():
            # Get device type from device settings, fallback to detection from id
            device_type = getattr(device, "device_type", None)
            if not device_type:
                # Check device_model field as well
                device_model = getattr(device, "device_model", device_id)
                if "e1002" in str(device_model).lower() or "e1002" in device_id.lower():
                    device_type = "E1002"
                else:
                    device_type = "E1001"
            
            layouts.append({
                "id": device_id,
                "name": device.name or device_id,
                "device_type": device_type,
                "device_model": getattr(device, "device_model", None) or f"reterminal_{device_type.lower()}",
                "page_count": len(device.pages),
                "widget_count": sum(len(p.widgets) for p in device.pages),
                "orientation": getattr(device, "orientation", "landscape"),
            })

        # Include last active layout ID so frontend knows which to load
        last_active = self.storage.state.last_active_layout_id
        return self.json({"layouts": layouts, "last_active_layout_id": last_active}, status_code=HTTPStatus.OK)

    async def post(self, request) -> Any:
        """Create a new layout."""
        try:
            body = await request.json()
        except Exception:
            return self.json({"error": "invalid_json"}, status_code=HTTPStatus.BAD_REQUEST)

        layout_id = body.get("id", "").strip()
        layout_name = body.get("name", "").strip()
        device_type = body.get("device_type", "E1001").upper()

        if not layout_id:
            return self.json({"error": "id_required"}, status_code=HTTPStatus.BAD_REQUEST)

        # Sanitize ID: lowercase, replace spaces with underscores
        layout_id = layout_id.lower().replace(" ", "_").replace("-", "_")

        # Check if already exists
        if self.storage.get_device(layout_id):
            return self.json({"error": "layout_exists"}, status_code=HTTPStatus.CONFLICT)

        # Determine device_model from device_type
        if device_type == "E1002":
            device_model = "reterminal_e1002"
        else:
            device_model = "reterminal_e1001"

        # Create new device config with proper device_model
        new_device = DeviceConfig(
            device_id=layout_id,
            name=layout_name or layout_id,
            api_token="",
            pages=[],
            current_page=0,
            device_model=device_model,
        )
        new_device.ensure_pages()

        self.storage.state.devices[layout_id] = new_device
        # Also set this as the last active layout so it's loaded on next session
        self.storage.state.last_active_layout_id = layout_id
        await self.storage.async_save()

        _LOGGER.info("Created new layout: %s (device_model=%s)", layout_id, device_model)
        return self.json({"id": layout_id, "name": new_device.name, "device_model": device_model}, status_code=HTTPStatus.CREATED)

    def json(self, data: Any, status_code: int = HTTPStatus.OK):
        return web.Response(
            body=json_dumps(data),
            status=status_code,
            content_type="application/json",
        )


class ReTerminalLayoutDetailView(HomeAssistantView):
    """Get, update, or delete a specific layout."""

    url = f"{API_BASE_PATH}/layouts/{{layout_id}}"
    name = "api:reterminal_dashboard_layout_detail"
    requires_auth = False
    cors_allowed = True

    def __init__(self, hass: HomeAssistant, storage: DashboardStorage) -> None:
        self.hass = hass
        self.storage = storage

    async def get(self, request, layout_id: str) -> Any:
        """Return full layout data for a specific layout."""
        device = self.storage.get_device(layout_id)
        if not device:
            return self.json({"error": "not_found"}, status_code=HTTPStatus.NOT_FOUND)

        return self.json(device.to_dict(), status_code=HTTPStatus.OK)

    async def delete(self, request, layout_id: str) -> Any:
        """Delete a layout."""
        if self.storage._state is None:
            await self.storage.async_load()

        if layout_id not in self.storage.state.devices:
            return self.json({"error": "not_found"}, status_code=HTTPStatus.NOT_FOUND)

        # Don't allow deleting if it's the only layout
        if len(self.storage.state.devices) <= 1:
            return self.json({"error": "cannot_delete_last_layout"}, status_code=HTTPStatus.BAD_REQUEST)

        del self.storage.state.devices[layout_id]
        await self.storage.async_save()

        _LOGGER.info("Deleted layout: %s", layout_id)
        return self.json({"deleted": layout_id}, status_code=HTTPStatus.OK)

    async def post(self, request, layout_id: str) -> Any:
        """Update a specific layout (save layout data to this ID)."""
        try:
            body = await request.json()
        except Exception:
            return self.json({"error": "invalid_json"}, status_code=HTTPStatus.BAD_REQUEST)

        updated = await self.storage.async_update_layout(layout_id, body)
        if not updated:
            return self.json({"error": "update_failed"}, status_code=HTTPStatus.BAD_REQUEST)

        # Track this as the last active layout (already done in async_update_layout)
        _LOGGER.info("Layout '%s' saved and set as last active", layout_id)
        return self.json(updated.to_dict(), status_code=HTTPStatus.OK)

    def json(self, data: Any, status_code: int = HTTPStatus.OK):
        return web.Response(
            body=json_dumps(data),
            status=status_code,
            content_type="application/json",
        )


class ReTerminalLayoutExportView(HomeAssistantView):
    """Export a layout as downloadable JSON."""

    url = f"{API_BASE_PATH}/layouts/{{layout_id}}/export"
    name = "api:reterminal_dashboard_layout_export"
    requires_auth = False
    cors_allowed = True

    def __init__(self, hass: HomeAssistant, storage: DashboardStorage) -> None:
        self.hass = hass
        self.storage = storage

    async def get(self, request, layout_id: str) -> Any:
        """Return layout as downloadable JSON file."""
        import json

        device = self.storage.get_device(layout_id)
        if not device:
            return web.Response(text="Layout not found", status=HTTPStatus.NOT_FOUND)

        data = device.to_dict()
        json_str = json.dumps(data, indent=2)

        return web.Response(
            text=json_str,
            status=HTTPStatus.OK,
            content_type="application/json",
            headers={
                "Content-Disposition": f'attachment; filename="{layout_id}_layout.json"',
            },
        )


class ReTerminalLayoutImportView(HomeAssistantView):
    """Import a layout from uploaded JSON."""

    url = f"{API_BASE_PATH}/layouts/import"
    name = "api:reterminal_dashboard_layout_import"
    requires_auth = False
    cors_allowed = True

    def __init__(self, hass: HomeAssistant, storage: DashboardStorage) -> None:
        self.hass = hass
        self.storage = storage

    async def post(self, request) -> Any:
        """Import a layout from JSON body."""
        try:
            body = await request.json()
        except Exception:
            return self.json({"error": "invalid_json"}, status_code=HTTPStatus.BAD_REQUEST)

        # Get the layout ID from the body, or generate one
        layout_id = body.get("device_id", "").strip()
        if not layout_id:
            layout_id = f"imported_{int(self.hass.loop.time())}"

        # Sanitize ID
        layout_id = layout_id.lower().replace(" ", "_").replace("-", "_")

        # If layout exists, ask for overwrite confirmation via query param
        if self.storage.get_device(layout_id):
            overwrite = request.query.get("overwrite", "false").lower() == "true"
            if not overwrite:
                return self.json({
                    "error": "layout_exists",
                    "existing_id": layout_id,
                    "message": "Layout already exists. Use ?overwrite=true to replace."
                }, status_code=HTTPStatus.CONFLICT)

        # Update the layout
        body["device_id"] = layout_id
        updated = await self.storage.async_update_layout(layout_id, body)

        if not updated:
            return self.json({"error": "import_failed"}, status_code=HTTPStatus.BAD_REQUEST)

        _LOGGER.info("Imported layout: %s", layout_id)
        return self.json({
            "id": layout_id,
            "name": updated.name,
            "imported": True
        }, status_code=HTTPStatus.OK)

    def json(self, data: Any, status_code: int = HTTPStatus.OK):
        return web.Response(
            body=json_dumps(data),
            status=status_code,
            content_type="application/json",
        )


class ReTerminalRssProxyView(HomeAssistantView):
    """Proxy RSS feeds for Quote widget.
    
    This endpoint fetches RSS feeds, parses them, and returns quote entries.
    Supports random quote selection from the feed.
    """

    url = f"{API_BASE_PATH}/rss_proxy"
    name = "api:reterminal_dashboard_rss_proxy"
    requires_auth = False
    cors_allowed = True

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._cache: dict[str, dict] = {}  # Simple in-memory cache
        self._cache_ttl = 300  # 5 minutes cache

    async def get(self, request) -> Any:
        """Fetch and parse an RSS feed, return quote entries."""
        import xml.etree.ElementTree as ET
        import aiohttp
        import time
        import random
        
        feed_url = request.query.get("url", "https://www.brainyquote.com/link/quotebr.rss")
        random_pick = request.query.get("random", "true").lower() == "true"
        
        # Check cache first
        cache_key = feed_url
        now = time.time()
        if cache_key in self._cache:
            cached = self._cache[cache_key]
            if now - cached["timestamp"] < self._cache_ttl:
                entries = cached["entries"]
                if random_pick and entries:
                    entry = random.choice(entries)
                    return self._json({"success": True, "quote": entry, "cached": True})
                elif entries:
                    return self._json({"success": True, "quote": entries[0], "cached": True})
        
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(feed_url, timeout=aiohttp.ClientTimeout(total=10)) as resp:
                    if resp.status != 200:
                        return self._json(
                            {"success": False, "error": f"HTTP {resp.status}"},
                            status_code=HTTPStatus.BAD_GATEWAY
                        )
                    content = await resp.text()
                    
        except aiohttp.ClientError as e:
            _LOGGER.warning("RSS fetch error for %s: %s", feed_url, e)
            return self._json(
                {"success": False, "error": str(e)},
                status_code=HTTPStatus.BAD_GATEWAY
            )
        except Exception as e:
            _LOGGER.error("Unexpected RSS fetch error: %s", e)
            return self._json(
                {"success": False, "error": "Failed to fetch feed"},
                status_code=HTTPStatus.INTERNAL_SERVER_ERROR
            )
        
        # Parse RSS XML
        try:
            root = ET.fromstring(content)
            entries = []
            
            # Handle both RSS and Atom formats
            # RSS format: channel/item
            for item in root.findall(".//item"):
                title = item.find("title")
                description = item.find("description")
                
                # Extract quote and author
                # BrainyQuote format: title contains AUTHOR, description contains QUOTE
                title_text = title.text.strip() if title is not None and title.text else ""
                desc_text = description.text.strip() if description is not None and description.text else ""
                
                quote_text = ""
                author = ""
                
                # Try to extract author from dc:creator first
                creator = item.find("{http://purl.org/dc/elements/1.1/}creator")
                if creator is not None and creator.text:
                    author = creator.text.strip()
                
                # BrainyQuote: title = author name, description = quote text
                # Check if description looks like a quote (has quotes or is longer text)
                if desc_text and not desc_text.startswith("<"):
                    # Description has the quote, title has the author
                    quote_text = desc_text
                    if not author:
                        author = title_text
                elif title_text:
                    # Fallback: title might contain "Quote - Author" format
                    if " - " in title_text:
                        parts = title_text.rsplit(" - ", 1)
                        if len(parts) == 2:
                            quote_text = parts[0].strip()
                            if not author:
                                author = parts[1].strip()
                    else:
                        quote_text = title_text
                
                # Strip URLs from quote text
                import re
                quote_text = re.sub(r'https?://\S+', '', quote_text).strip()
                # Remove any trailing punctuation that might be left after URL removal
                quote_text = re.sub(r'\s+', ' ', quote_text).strip()
                
                if quote_text:
                    entries.append({
                        "quote": quote_text,
                        "author": author
                    })
            
            # Atom format fallback: feed/entry
            if not entries:
                for entry in root.findall(".//{http://www.w3.org/2005/Atom}entry"):
                    title = entry.find("{http://www.w3.org/2005/Atom}title")
                    author_elem = entry.find("{http://www.w3.org/2005/Atom}author/{http://www.w3.org/2005/Atom}name")
                    
                    quote_text = title.text if title is not None and title.text else ""
                    author = author_elem.text if author_elem is not None and author_elem.text else ""
                    
                    if quote_text:
                        entries.append({
                            "quote": quote_text,
                            "author": author
                        })
            
            if not entries:
                return self._json(
                    {"success": False, "error": "No entries found in feed"},
                    status_code=HTTPStatus.BAD_REQUEST
                )
            
            # Cache the results
            self._cache[cache_key] = {
                "timestamp": now,
                "entries": entries
            }
            
            # Return result
            if random_pick:
                entry = random.choice(entries)
            else:
                entry = entries[0]
                
            return self._json({
                "success": True, 
                "quote": entry,
                "total_entries": len(entries),
                "cached": False
            })
            
        except ET.ParseError as e:
            _LOGGER.warning("RSS parse error for %s: %s", feed_url, e)
            return self._json(
                {"success": False, "error": "Failed to parse RSS feed"},
                status_code=HTTPStatus.BAD_REQUEST
            )
    
    def _json(self, data: Any, status_code: int = HTTPStatus.OK):
        return web.Response(
            body=json_dumps(data),
            status=status_code,
            content_type="application/json",
        )


async def async_register_http_views(hass: HomeAssistant, storage: DashboardStorage) -> None:
    """Register all HTTP views for this integration."""

    hass.http.register_view(ReTerminalLayoutView(hass, storage))
    # ReTerminalSnippetView removed - YAML generation is now client-side only
    hass.http.register_view(ReTerminalImportSnippetView(hass, storage))
    hass.http.register_view(ReTerminalEntitiesView(hass))
    hass.http.register_view(ReTerminalTestView(hass))
    hass.http.register_view(ReTerminalImageProxyView(hass))
    hass.http.register_view(ReTerminalRssProxyView(hass))
    
    # Layout management endpoints
    hass.http.register_view(ReTerminalLayoutsListView(hass, storage))
    hass.http.register_view(ReTerminalLayoutDetailView(hass, storage))
    hass.http.register_view(ReTerminalLayoutExportView(hass, storage))
    hass.http.register_view(ReTerminalLayoutImportView(hass, storage))

    # Hardware Template management
    hass.http.register_view(ReTerminalHardwareListView(hass))
    hass.http.register_view(ReTerminalHardwareUploadView(hass))

    _LOGGER.debug(
        "reterminal_dashboard: HTTP API views registered at %s (layout, layouts, import_snippet, entities, test, image_proxy, rss_proxy)",
        API_BASE_PATH,
    )
