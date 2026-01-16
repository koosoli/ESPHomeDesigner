from __future__ import annotations

import logging
from http import HTTPStatus
from typing import Any

from homeassistant.core import HomeAssistant

from ..const import API_BASE_PATH
from ..models import DeviceConfig
from ..storage import DashboardStorage
from ..yaml_parser import yaml_to_layout
from .base import DesignerBaseView

_LOGGER = logging.getLogger(__name__)

class ReTerminalImportSnippetView(DesignerBaseView):
    """Import an ESPHome YAML snippet and reconstruct the layout."""

    url = f"{API_BASE_PATH}/import_snippet"
    name = "api:esphome_designer_import_snippet"

    def __init__(self, hass: HomeAssistant, storage: DashboardStorage) -> None:
        self.hass = hass
        self.storage = storage

    async def post(self, request) -> Any:
        """Import snippet and update default layout."""
        try:
            body = await request.json()
            yaml_content = body.get("yaml")
            if not yaml_content:
                return self.json({"error": "yaml_required"}, HTTPStatus.BAD_REQUEST, request=request)

            # Reconstruct model from YAML
            layout = yaml_to_layout(yaml_content)
            
            # Save as default
            await self.storage.async_save_layout_default(layout)
            
            return self.json({
                "status": "ok",
                "layout": layout.to_dict()
            }, request=request)
        except ValueError as exc:
            return self.json({"error": str(exc)}, HTTPStatus.BAD_REQUEST, request=request)
        except Exception as exc:
            _LOGGER.exception("Unexpected error during snippet import")
            return self.json({"error": "internal_error"}, HTTPStatus.INTERNAL_SERVER_ERROR, request=request)

class ReTerminalLayoutExportView(DesignerBaseView):
    """Provide a JSON export of a layout."""
    url = f"{API_BASE_PATH}/export"
    name = "api:esphome_designer_export"

    def __init__(self, hass: HomeAssistant, storage: DashboardStorage) -> None:
        self.hass = hass
        self.storage = storage

    async def get(self, request) -> Any:
        layout_id = request.query.get("id", "default")
        layout = await self.storage.async_get_layout(layout_id)
        if not layout:
            return self.json({"error": "not_found"}, HTTPStatus.NOT_FOUND, request=request)
        
        return self.json(layout.to_dict(), request=request)

class ReTerminalLayoutImportView(DesignerBaseView):
    """Import a JSON layout file."""
    url = f"{API_BASE_PATH}/import"
    name = "api:esphome_designer_import"

    def __init__(self, hass: HomeAssistant, storage: DashboardStorage) -> None:
        self.hass = hass
        self.storage = storage

    async def post(self, request) -> Any:
        try:
            body = await request.json()
            # Convert dict to model and back to validate
            layout = DeviceConfig.from_dict(body)
            await self.storage.async_save_layout(layout)
            return self.json({"status": "ok", "id": layout.id}, request=request)
        except Exception as exc:
            return self.json({"error": str(exc)}, HTTPStatus.BAD_REQUEST, request=request)
