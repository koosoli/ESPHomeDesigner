from __future__ import annotations

import json
import unittest

from support import load_integration_modules


class _FakeRequest:
    def __init__(self, entity_id: str, query: dict[str, str] | None = None):
        self.match_info = {"entity_id": entity_id}
        self.query = query or {}
        self.headers = {}


class HistoryProxyViewTests(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        modules = load_integration_modules()
        self.history = modules["history"]
        self.FakeHass = modules["FakeHass"]

    async def test_history_proxy_returns_empty_list_on_internal_error(self):
        hass = self.FakeHass()
        view = self.history.HistoryProxyView(hass)

        async def boom(*_args, **_kwargs):
            raise RuntimeError("history backend exploded")

        view._get_history_async = boom  # type: ignore[method-assign]
        request = _FakeRequest("sensor.test", {"duration": "1h"})

        response = await view.get(request)

        self.assertEqual(response.status, 200)
        self.assertEqual(json.loads(response.body), [])

    async def test_history_proxy_returns_empty_csv_on_internal_error(self):
        hass = self.FakeHass()
        view = self.history.HistoryProxyView(hass)

        async def boom(*_args, **_kwargs):
            raise RuntimeError("history backend exploded")

        view._get_history_async = boom  # type: ignore[method-assign]
        request = _FakeRequest("sensor.test", {"duration": "1h", "format": "csv"})

        response = await view.get(request)

        self.assertEqual(response.status, 200)
        self.assertEqual(response.body, "")

    async def test_history_proxy_downsamples_to_a_single_csv_point(self):
        hass = self.FakeHass()
        view = self.history.HistoryProxyView(hass)

        async def history_points(*_args, **_kwargs):
            return [
                {"state": "20", "last_changed": "2026-03-28T10:00:00+00:00"},
                {"state": "21", "last_changed": "2026-03-28T10:15:00+00:00"},
                {"state": "22", "last_changed": "2026-03-28T10:30:00+00:00"},
            ]

        view._get_history_async = history_points  # type: ignore[method-assign]
        request = _FakeRequest("sensor.test", {"duration": "1h", "format": "csv", "points": "1"})

        response = await view.get(request)

        self.assertEqual(response.status, 200)
        self.assertEqual(response.body, "22")
