from __future__ import annotations

import json
from typing import Any

from aiohttp import web


class InvalidJsonObjectError(ValueError):
    """Raised when a request body is not a JSON object."""


async def parse_json_object(request: web.Request) -> dict[str, Any]:
    """Parse a request body as JSON and require an object payload."""
    try:
        body_bytes = await request.read()
        if not body_bytes:
            raise InvalidJsonObjectError("empty request body")

        body_text = body_bytes.decode("utf-8")
        parsed = json.loads(body_text)
    except InvalidJsonObjectError:
        raise
    except Exception as exc:
        raise InvalidJsonObjectError("invalid JSON body") from exc

    if not isinstance(parsed, dict):
        raise InvalidJsonObjectError(f"expected JSON object, got {type(parsed).__name__}")

    return parsed


def sanitize_layout_id(layout_id: Any) -> str:
    """Normalize a layout id to the canonical safe storage format."""
    text = "" if layout_id is None else str(layout_id)
    return "".join(ch for ch in text if ch.isalnum() or ch in "-_").lower()
