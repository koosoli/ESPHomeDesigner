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
        path = request.query.get("path")
        if not path:
             return self._add_pna_headers(web.Response(status=HTTPStatus.BAD_REQUEST), request)

        # Basic path traversal protection
        if ".." in path:
             return self._add_pna_headers(web.Response(status=HTTPStatus.FORBIDDEN), request)

        # Handle absolute paths starting with /config/
        if path.startswith("/config/"):
            # specific handling for /config/ path to map to actual config dir
            relative_path = path[len("/config/"):]
            if relative_path.startswith("/"):
                relative_path = relative_path[1:]
            
            filepath = os.path.join(self.hass.config.config_dir, relative_path)
        else:
            # Legacy/Fallback: try finding searching in standart image dirs
            # Allow various standard locations for ESPHome images
            base_paths = [
                os.path.join(self.hass.config.config_dir, "esphome", "images"),
                os.path.join(self.hass.config.config_dir, "esphome_designer", "images"),
                os.path.join(self.hass.config.config_dir, "www", "esphome_designer", "images")
            ]
            
            filepath = None
            for base in base_paths:
                candidate = os.path.join(base, path)
                if os.path.exists(candidate):
                    filepath = candidate
                    break

        if not filepath or not os.path.exists(filepath):
            _LOGGER.warning("Image not found for proxy: %s", path)
            return self._add_pna_headers(web.Response(status=HTTPStatus.NOT_FOUND), request)

        return self._add_pna_headers(web.FileResponse(filepath), request)

class ReTerminalRssProxyView(DesignerBaseView):
    """Proxy RSS feeds and convert to JSON for ESPHome."""
    url = f"{API_BASE_PATH}/rss_proxy"
    name = "api:esphome_designer_rss_proxy"

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass

    async def get(self, request) -> Any:
        import xml.etree.ElementTree as ET
        import random

        url = request.query.get("url")
        random_quote = request.query.get("random") == "true"
        
        if not url:
            return self._add_pna_headers(web.Response(status=HTTPStatus.BAD_REQUEST), request)

        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(url, timeout=10) as response:
                    if response.status != 200:
                        return self.json({"success": False, "error": f"RSS source returned {response.status}"}, response.status, request=request)
                    
                    content = await response.text()
            
            # Run XML parsing in executor to avoid blocking the loop
            def parse_rss(xml_content):
                try:
                    root = ET.fromstring(xml_content)
                    # Support standard RSS 2.0 item lists
                    # BrainyQuote: <description>=Quote, <title>=Author
                    items = root.findall(".//item")
                    if not items:
                        return None
                    
                    if random_quote:
                        item = random.choice(items)
                    else:
                        item = items[0]
                        
                    description = item.find("description")
                    title = item.find("title")
                    
                    quote_text = description.text if description is not None else "No quote found"
                    author_text = title.text if title is not None else "Unknown"
                    
                    # Basic cleanup (BrainyQuote descriptions are usually clean but just in case)
                    quote_text = quote_text.strip().strip('"')
                    
                    return {
                        "quote": quote_text,
                        "author": author_text
                    }
                except Exception as e:
                    _LOGGER.error("XML Parse error: %s", e)
                    return None

            result = await self.hass.async_add_executor_job(parse_rss, content)
            
            if result:
                return self.json({
                    "success": True,
                    "quote": result
                }, 200, request=request)
            else:
                 return self.json({"success": False, "error": "Failed to parse RSS feed or no items found"}, 200, request=request)

        except Exception as e:
            _LOGGER.error("RSS Proxy error: %s", e)
            return self.json({"success": False, "error": str(e)}, 500, request=request)
