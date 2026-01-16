from __future__ import annotations

import logging
from http import HTTPStatus
from typing import Any

from aiohttp import web
from homeassistant.components.http import HomeAssistantView
from homeassistant.helpers.json import json_dumps

_LOGGER = logging.getLogger(__name__)


class DesignerBaseView(HomeAssistantView):
    """Base class for Designer API views."""

    requires_auth = False
    cors_allowed = True

    def _add_pna_headers(self, response: web.Response, request: web.Request) -> web.Response:
        """Add Private Network Access (PNA) headers for CORS.
        
        This fixes the Chrome error:
        "The request client is not a secure context and the resource 
        is in more-private address space `local`."
        """
        origin = request.headers.get("Origin", "*")
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        response.headers["Access-Control-Allow-Credentials"] = "true"
        # Critical: This header opts-in to Private Network Access
        response.headers["Access-Control-Allow-Private-Network"] = "true"
        return response

    def json(self, data: Any, status_code: int = HTTPStatus.OK, request: web.Request = None) -> web.Response:
        """Return a JSON response using Home Assistant's json_dumps."""
        response = web.Response(
            body=json_dumps(data),
            status=status_code,
            content_type="application/json",
        )
        # Add PNA headers if request is available
        if request:
            self._add_pna_headers(response, request)
        return response

    def json_response(self, data: Any, request: web.Request, status_code: int = HTTPStatus.OK) -> web.Response:
        """Return a JSON response with PNA headers."""
        return self.json(data, status_code, request)
