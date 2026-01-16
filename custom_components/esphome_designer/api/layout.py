from __future__ import annotations

import logging
from http import HTTPStatus
from typing import Any

from homeassistant.core import HomeAssistant

from ..const import API_BASE_PATH
from ..models import DeviceConfig
from ..storage import DashboardStorage
from .base import DesignerBaseView

_LOGGER = logging.getLogger(__name__)

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
        try:
            body = await request.json()
        except Exception as exc:
            _LOGGER.warning("Invalid JSON in layout update: %s", exc)
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
        try:
            body = await request.json()
            layout_id = body.get("id")
            if not layout_id:
                return self.json({"error": "id_required"}, HTTPStatus.BAD_REQUEST, request=request)
            
            # Sanitization
            layout_id = "".join(c for c in layout_id if c.isalnum() or c in "-_").lower()
            
            # Check if exists
            existing = await self.storage.async_get_layout(layout_id)
            if existing:
                 return self.json({"error": "already_exists"}, HTTPStatus.CONFLICT, request=request)

            new_layout = DeviceConfig(
                device_id=layout_id,
                api_token="",
                name=body.get("name", layout_id),
                pages=[]
            )
            await self.storage.async_save_layout(new_layout)
            return self.json(new_layout.to_dict(), request=request)
        except Exception as exc:
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
        try:
            body = await request.json()
            updated = await self.storage.async_update_layout(layout_id, body)
            if not updated:
                 return self.json({"error": "update_failed"}, HTTPStatus.INTERNAL_SERVER_ERROR, request=request)
            return self.json(updated.to_dict(), request=request)
        except Exception as exc:
            return self.json({"error": str(exc)}, HTTPStatus.INTERNAL_SERVER_ERROR, request=request)
