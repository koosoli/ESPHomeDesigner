from __future__ import annotations

import json
import unittest

from support import load_integration_modules


class FakeRequest:
    def __init__(self, body: bytes, headers=None):
        self._body = body
        self.headers = headers or {}

    async def read(self):
        return self._body


class FakeStorage:
    def __init__(self, updated_layout):
        self.updated_layout = updated_layout
        self.calls = []
        self.detail_calls = []

    async def async_update_layout_default(self, body):
        self.calls.append(body)
        return self.updated_layout

    async def async_update_layout(self, layout_id, body):
        self.detail_calls.append((layout_id, body))
        return self.updated_layout

    async def async_get_layout_default(self):
        return self.updated_layout

    async def async_save_layout_default(self, device):
        self.updated_layout = device


class LayoutApiTests(unittest.IsolatedAsyncioTestCase):
    def setUp(self):
        modules = load_integration_modules()
        self.layout_module = modules["layout"]
        self.models = modules["models"]

    async def test_parse_json_body_returns_empty_dict_for_invalid_json(self):
        request = FakeRequest(b"{not-json")

        parsed = await self.layout_module._parse_json_body(request)

        self.assertEqual(parsed, {})

    async def test_parse_json_body_rejects_non_object_payloads(self):
        request = FakeRequest(b'["not","an","object"]')

        parsed = await self.layout_module._parse_json_body(request)

        self.assertEqual(parsed, {})

    async def test_parse_json_body_returns_payload_for_valid_json(self):
        request = FakeRequest(b'{"pages":[{"id":"page_0"}]}')

        parsed = await self.layout_module._parse_json_body(request)

        self.assertEqual(parsed["pages"][0]["id"], "page_0")

    async def test_layout_view_rejects_invalid_json(self):
        storage = FakeStorage(None)
        view = self.layout_module.ReTerminalLayoutView(None, storage)

        response = await view.post(FakeRequest(b"{bad-json"))

        self.assertEqual(response.status, 400)
        self.assertEqual(json.loads(response.body), {"error": "invalid_json"})

    async def test_layout_view_returns_updated_layout_payload(self):
        device = self.models.DeviceConfig(device_id="reterminal_e1001", api_token="", name="Demo", pages=[])
        device.ensure_pages()
        storage = FakeStorage(device)
        view = self.layout_module.ReTerminalLayoutView(None, storage)

        response = await view.post(FakeRequest(b'{"name":"Demo","pages":[]}'))

        self.assertEqual(response.status, 200)
        payload = json.loads(response.body)
        self.assertEqual(payload["status"], "ok")
        self.assertEqual(payload["layout"]["device_id"], "reterminal_e1001")
        self.assertEqual(storage.calls, [{"name": "Demo", "pages": []}])

    async def test_layout_view_rejects_invalid_layout_payloads_from_storage_validation(self):
        storage = FakeStorage(None)
        view = self.layout_module.ReTerminalLayoutView(None, storage)

        response = await view.post(FakeRequest(b'{"pages":[1]}'))

        self.assertEqual(response.status, 400)
        self.assertEqual(json.loads(response.body), {"error": "invalid_layout"})

    async def test_layout_detail_view_rejects_invalid_json_without_updating_storage(self):
        device = self.models.DeviceConfig(device_id="kiosk", api_token="", name="Kiosk", pages=[])
        device.ensure_pages()
        storage = FakeStorage(device)
        view = self.layout_module.ReTerminalLayoutDetailView(None, storage)

        response = await view.post(FakeRequest(b"{bad-json"), "kiosk")

        self.assertEqual(response.status, 400)
        self.assertEqual(json.loads(response.body), {"error": "invalid_json"})
        self.assertEqual(storage.detail_calls, [])

    async def test_layout_view_get_creates_default_layout_when_storage_is_empty(self):
        storage = FakeStorage(None)
        view = self.layout_module.ReTerminalLayoutView(None, storage)

        response = await view.get(FakeRequest(b""))

        self.assertEqual(response.status, 200)
        payload = json.loads(response.body)
        self.assertEqual(payload["device_id"], "default")
        self.assertEqual(payload["name"], "Default Layout")
