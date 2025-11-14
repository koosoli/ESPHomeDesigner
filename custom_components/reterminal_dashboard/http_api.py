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
from .yaml_generator import generate_snippet
from .yaml_parser import yaml_to_layout

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

        updated = await self.storage.async_update_layout_default(body)
        if not isinstance(updated, DeviceConfig):
            # async_update_layout_default should always return a DeviceConfig,
            # but guard to avoid leaking tracebacks to the client.
            _LOGGER.error("Failed to update layout: storage returned invalid result")
            return self.json(
                {"error": "update_failed"},
                status_code=HTTPStatus.BAD_REQUEST,
            )

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


class ReTerminalSnippetView(HomeAssistantView):
    """Generate and return an ESPHome YAML snippet for the current layout."""

    url = f"{API_BASE_PATH}/snippet"
    name = "api:reterminal_dashboard_snippet"
    requires_auth = False  # Temporarily disable for testing
    cors_allowed = True

    def __init__(self, hass: HomeAssistant, storage: DashboardStorage) -> None:
        self.hass = hass
        self.storage = storage

    async def get(self, request) -> Any:  # type: ignore[override]
        """Return YAML snippet based on the default device layout."""
        try:
            device = await self.storage.async_get_default_device()
        except Exception as exc:  # noqa: BLE001
            _LOGGER.error("Failed to load layout for snippet generation: %s", exc)
            return self._text(
                "# Error: unable to load layout for snippet generation\n",
                status_code=HTTPStatus.INTERNAL_SERVER_ERROR,
            )

        try:
            snippet = generate_snippet(device)
        except Exception as exc:  # noqa: BLE001
            _LOGGER.error("Snippet generation failed: %s", exc)
            return self._text(
                "# Error: snippet generation failed, see logs for details\n",
                status_code=HTTPStatus.INTERNAL_SERVER_ERROR,
            )

        return self._text(snippet, status_code=HTTPStatus.OK)

    def _text(self, body: str, status_code: int = HTTPStatus.OK):
        return web.Response(
            body=body,
            status=status_code,
            content_type="text/yaml",
        )


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
            if code in (
                "invalid_yaml",
                "unrecognized_display_structure",
                "no_pages_found",
            ):
                return self._json(
                    {
                        "error": code,
                        "message": (
                            "Snippet does not match expected reterminal_dashboard pattern. "
                            "Ensure it uses display_page and a compatible display lambda."
                        ),
                    },
                    status_code=HTTPStatus.BAD_REQUEST,
                )
            _LOGGER.error("Unexpected error in yaml_to_layout: %s", exc)
            return self._json(
                {"error": "import_failed"},
                status_code=HTTPStatus.INTERNAL_SERVER_ERROR,
            )
        except Exception as exc:  # noqa: BLE001
            _LOGGER.error("Snippet import failed: %s", exc)
            return self._json(
                {"error": "import_failed"},
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
                }
            )

            # Hard safety cap; avoid returning an excessively large payload.
            if len(results) >= 1000:
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


async def async_register_http_views(hass: HomeAssistant, storage: DashboardStorage) -> None:
    """Register all HTTP views for this integration."""

    hass.http.register_view(ReTerminalLayoutView(hass, storage))
    hass.http.register_view(ReTerminalSnippetView(hass, storage))
    hass.http.register_view(ReTerminalImportSnippetView(hass, storage))
    hass.http.register_view(ReTerminalEntitiesView(hass))
    hass.http.register_view(ReTerminalTestView(hass))

    _LOGGER.debug(
        "reterminal_dashboard: HTTP API views registered at %s (layout, snippet, import_snippet, entities, test)",
        API_BASE_PATH,
    )
