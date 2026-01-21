from __future__ import annotations

import logging
from http import HTTPStatus
from typing import Any

from homeassistant.core import HomeAssistant

from ..const import API_BASE_PATH
from ..models import DeviceConfig
from ..storage import DashboardStorage
from .base import DesignerBaseView
import json

_LOGGER = logging.getLogger(__name__)


async def _parse_json_body(request):
    """Parse JSON body from request, handling any Content-Type.
    
    Reads raw bytes first to avoid stream consumption issues when
    Content-Type is not application/json.
    """
    try:
        # Read raw body bytes to avoid Content-Type detection issues
        body_bytes = await request.read()
        if not body_bytes:
            _LOGGER.debug("Empty request body")
            return {}
        body_text = body_bytes.decode('utf-8')
        result = json.loads(body_text)
        _LOGGER.debug("Parsed JSON body: %s", result)
        return result
    except Exception as e:
        _LOGGER.warning("Failed to parse JSON body: %s", e)
        return {}

class ReTerminalLayoutView(DesignerBaseView):
    """Provide layout GET/POST for the ESPHome Designer editor."""

    url = f"{API_BASE_PATH}/layout"
    name = "api:esphome_designer_layout"

    def __init__(self, hass: HomeAssistant, storage: DashboardStorage) -> None:
        self.hass = hass
        self.storage = storage

    async def get(self, request) -> Any:
        """Return the stored layout for the default device."""
        device = await self._async_get_default_device()
        _LOGGER.info("Loading layout: %d pages, %d total widgets", 
                     len(device.pages),
                     sum(len(p.widgets) for p in device.pages))
        return self.json(device.to_dict(), status_code=HTTPStatus.OK, request=request)

    async def post(self, request) -> Any:
        """Update layout for the default device from JSON body."""
        body = await _parse_json_body(request)
        if not body:
            _LOGGER.warning("Invalid JSON in layout update")
            return self.json(
                {"error": "invalid_json"},
                status_code=HTTPStatus.BAD_REQUEST,
                request=request,
            )

        _LOGGER.info("Received layout update with %d pages, %d total widgets", 
                     len(body.get("pages", [])),
                     sum(len(p.get("widgets", [])) for p in body.get("pages", [])))

        updated = await self.storage.async_update_layout_default(body)
        if not isinstance(updated, DeviceConfig):
            _LOGGER.error("Failed to update layout: storage returned invalid result")
            return self.json(
                {"error": "update_failed"},
                status_code=HTTPStatus.INTERNAL_SERVER_ERROR,
                request=request,
            )

        return self.json({"status": "ok", "layout": updated.to_dict()}, request=request)

    async def _async_get_default_device(self) -> DeviceConfig:
        """Return the default device/layout, creating if necessary."""
        device = await self.storage.async_get_layout_default()
        if device is None:
            device = DeviceConfig(device_id="default", api_token="", name="Default Layout", pages=[])
            await self.storage.async_save_layout_default(device)
        return device

class ReTerminalLayoutsListView(DesignerBaseView):
    """Handle layout list operations."""
    url = f"{API_BASE_PATH}/layouts"
    name = "api:esphome_designer_layouts_list"

    def __init__(self, hass: HomeAssistant, storage: DashboardStorage) -> None:
        self.hass = hass
        self.storage = storage

    async def get(self, request) -> Any:
        """List all layouts."""
        layouts = await self.storage.async_list_layouts()
        last_active = None
        if self.storage._state and self.storage._state.last_active_layout_id:
            last_active = self.storage._state.last_active_layout_id
        return self.json({"layouts": layouts, "last_active_layout_id": last_active}, request=request)

    async def post(self, request) -> Any:
        """Create a new layout."""
        _LOGGER.info("ReTerminalLayoutsListView.post called")
        try:
            body = await _parse_json_body(request)
            _LOGGER.info("Parsed body: %s", body)
            
            layout_id = body.get("id")
            if not layout_id:
                _LOGGER.warning("No layout ID provided")
                return self.json({"error": "id_required"}, HTTPStatus.BAD_REQUEST, request=request)
            
            # Sanitization
            layout_id = "".join(c for c in layout_id if c.isalnum() or c in "-_").lower()
            _LOGGER.info("Sanitized layout_id: %s", layout_id)
            
            # Check if exists
            existing = await self.storage.async_get_layout(layout_id)
            if existing:
                _LOGGER.warning("Layout already exists: %s", layout_id)
                return self.json({"error": "already_exists"}, HTTPStatus.CONFLICT, request=request)

            new_layout = DeviceConfig(
                device_id=layout_id,
                api_token="",
                name=body.get("name", layout_id),
                pages=[]
            )
            await self.storage.async_save_layout(new_layout)
            _LOGGER.info("Created layout: %s", layout_id)
            return self.json(new_layout.to_dict(), request=request)
        except Exception as exc:
            _LOGGER.exception("Error creating layout: %s", exc)
            return self.json({"error": str(exc)}, HTTPStatus.INTERNAL_SERVER_ERROR, request=request)

class ReTerminalLayoutDetailView(DesignerBaseView):
    """Handle individual layout operations."""
    url = f"{API_BASE_PATH}/layouts/{{layout_id}}"
    name = "api:esphome_designer_layout_detail"

    def __init__(self, hass: HomeAssistant, storage: DashboardStorage) -> None:
        self.hass = hass
        self.storage = storage

    async def get(self, request, layout_id: str) -> Any:
        layout = await self.storage.async_get_layout(layout_id)
        if not layout:
            return self.json({"error": "not_found"}, HTTPStatus.NOT_FOUND, request=request)
        return self.json(layout.to_dict(), request=request)

    async def delete(self, request, layout_id: str) -> Any:
        if layout_id == "default":
            return self.json({"error": "cannot_delete_default"}, HTTPStatus.FORBIDDEN, request=request)
        await self.storage.async_delete_layout(layout_id)
        return self.json({"status": "deleted"}, request=request)

    async def post(self, request, layout_id: str) -> Any:
        _LOGGER.info("ReTerminalLayoutDetailView.post called for layout_id: %s", layout_id)
        try:
            body = await _parse_json_body(request)
            _LOGGER.info("Parsed body: %s", body)
            
            # Special case: allow deletion via POST to avoid simple-request preflight issues
            if body.get("action") == "delete":
                _LOGGER.info("Delete action requested for layout: %s", layout_id)
                if layout_id == "default":
                    return self.json({"error": "cannot_delete_default"}, HTTPStatus.FORBIDDEN, request=request)
                await self.storage.async_delete_layout(layout_id)
                _LOGGER.info("Layout deleted: %s", layout_id)
                return self.json({"status": "deleted"}, request=request)

            updated = await self.storage.async_update_layout(layout_id, body)
            if not updated:
                _LOGGER.error("Failed to update layout: %s", layout_id)
                return self.json({"error": "update_failed"}, HTTPStatus.INTERNAL_SERVER_ERROR, request=request)
            _LOGGER.info("Layout updated: %s", layout_id)
            return self.json(updated.to_dict(), request=request)
        except Exception as exc:
            _LOGGER.exception("Error in post for layout %s: %s", layout_id, exc)
            return self.json({"error": str(exc)}, HTTPStatus.INTERNAL_SERVER_ERROR, request=request)
