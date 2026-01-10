from __future__ import annotations

import logging
from http import HTTPStatus
from typing import Any

from aiohttp import web
from homeassistant.components.http import HomeAssistantView
from homeassistant.helpers.json import json_dumps

class DesignerBaseView(HomeAssistantView):
    """Base class for Designer API views."""

    requires_auth = False
    cors_allowed = True

    def json(self, data: Any, status_code: int = HTTPStatus.OK) -> web.Response:
        """Return a JSON response using Home Assistant's json_dumps."""
        return web.Response(
            body=json_dumps(data),
            status=status_code,
            content_type="application/json",
        )
