from __future__ import annotations

import logging
import os
import aiohttp
from typing import Any
from http import HTTPStatus

from aiohttp import web
from homeassistant.core import HomeAssistant

from ..const import API_BASE_PATH
from .base import DesignerBaseView

_LOGGER = logging.getLogger(__name__)

class ReTerminalImageProxyView(DesignerBaseView):
    """Proxy ESPHome images from /config/esphome/images/ for editor preview."""

    url = f"{API_BASE_PATH}/image_proxy"
    name = "api:esphome_designer_image_proxy"

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass

    async def get(self, request) -> web.Response:
        """Serve an image file from ESPHome directory."""
        filename = request.query.get("filename")
        if not filename:
            return self._add_pna_headers(web.Response(status=HTTPStatus.BAD_REQUEST), request)

        # Basic path traversal protection
        if ".." in filename or filename.startswith("/") or filename.startswith("\\"):
             return self._add_pna_headers(web.Response(status=HTTPStatus.FORBIDDEN), request)

        # Allow various standard locations for ESPHome images
        base_paths = [
            os.path.join(self.hass.config.config_dir, "esphome", "images"),
            os.path.join(self.hass.config.config_dir, "esphome_designer", "images"),
            os.path.join(self.hass.config.config_dir, "www", "esphome_designer", "images")
        ]
        
        filepath = None
        for base in base_paths:
            candidate = os.path.join(base, filename)
            if os.path.exists(candidate):
                filepath = candidate
                break
        
        if not filepath:
            _LOGGER.warning("Image not found for proxy: %s", filename)
            return self._add_pna_headers(web.Response(status=HTTPStatus.NOT_FOUND), request)

        response = web.FileResponse(filepath)
        self._add_pna_headers(response, request)
        return response

class ReTerminalRssProxyView(DesignerBaseView):
    """Proxy RSS feeds to avoid CORS issues in the frontend."""
    url = f"{API_BASE_PATH}/rss_proxy"
    name = "api:esphome_designer_rss_proxy"

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass

    async def get(self, request) -> Any:
        url = request.query.get("url")
        if not url:
            return self._add_pna_headers(web.Response(status=HTTPStatus.BAD_REQUEST), request)

        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(url, timeout=10) as response:
                    if response.status != 200:
                        return self.json({"error": f"RSS source returned {response.status}"}, response.status, request=request)
                    
                    content = await response.text()
                    resp = web.Response(
                        text=content,
                        content_type=response.content_type or "application/xml"
                    )
                    return self._add_pna_headers(resp, request)
        except Exception as e:
            _LOGGER.error("RSS Proxy error: %s", e)
            return self.json({"error": str(e)}, 500, request=request)
