from __future__ import annotations

import json
import unittest

from support import load_integration_modules


class FakeJsonRequest:
    def __init__(self, payload=None, headers=None, query=None, error=None):
        self._payload = payload
        self.headers = headers or {}
        self.query = query or {}
        self._error = error

    async def json(self):
        if self._error:
            raise self._error
        return self._payload


class FakeStorage:
    def __init__(self, layout=None):
        self.layout = layout
        self.saved_layouts = []
        self.saved_default_layouts = []

    async def async_get_layout(self, layout_id):
        if self.layout and self.layout.device_id == layout_id:
            return self.layout
        return None

    async def async_save_layout(self, layout):
        self.saved_layouts.append(layout)
        self.layout = layout

    async def async_save_layout_default(self, layout):
        self.saved_default_layouts.append(layout)
        self.layout = layout


class ImportExportApiTests(unittest.IsolatedAsyncioTestCase):
    def setUp(self):
        modules = load_integration_modules()
        self.base_module = modules["base"]
        self.import_export_module = modules["import_export"]
        self.models = modules["models"]

    async def test_json_response_adds_private_network_access_header(self):
        view = self.base_module.DesignerBaseView()
        request = FakeJsonRequest(headers={"Origin": "http://localhost:8123"})

        response = view.json_response({"status": "ok"}, request)

        self.assertEqual(response.headers["Access-Control-Allow-Private-Network"], "true")
        self.assertEqual(json.loads(response.body), {"status": "ok"})

    async def test_export_view_returns_not_found_for_missing_layout(self):
        storage = FakeStorage()
        view = self.import_export_module.ReTerminalLayoutExportView(None, storage)

        response = await view.get(FakeJsonRequest(query={"id": "missing"}))

        self.assertEqual(response.status, 404)
        self.assertEqual(json.loads(response.body), {"error": "not_found"})

    async def test_import_view_returns_device_id_after_saving_layout(self):
        storage = FakeStorage()
        view = self.import_export_module.ReTerminalLayoutImportView(None, storage)

        response = await view.post(FakeJsonRequest(payload={
            "device_id": "kitchen_display",
            "name": "Kitchen",
            "pages": [],
        }))

        self.assertEqual(response.status, 200)
        self.assertEqual(json.loads(response.body), {"status": "ok", "id": "kitchen_display"})
        self.assertEqual(storage.saved_layouts[0].device_id, "kitchen_display")

    async def test_import_snippet_view_requires_yaml_body(self):
        storage = FakeStorage()
        view = self.import_export_module.ReTerminalImportSnippetView(None, storage)

        response = await view.post(FakeJsonRequest(payload={}))

        self.assertEqual(response.status, 400)
        self.assertEqual(json.loads(response.body), {"error": "yaml_required"})

    async def test_import_snippet_view_saves_reconstructed_layout(self):
        device = self.models.DeviceConfig(device_id="snippet_layout", api_token="", name="Snippet Demo", pages=[])
        device.ensure_pages()
        storage = FakeStorage()
        view = self.import_export_module.ReTerminalImportSnippetView(None, storage)
        self.import_export_module.yaml_to_layout = lambda _: device

        response = await view.post(FakeJsonRequest(payload={"yaml": "display:\n  - lambda: |-"}))

        self.assertEqual(response.status, 200)
        payload = json.loads(response.body)
        self.assertEqual(payload["status"], "ok")
        self.assertEqual(payload["layout"]["device_id"], "snippet_layout")
        self.assertEqual(storage.saved_default_layouts[0].device_id, "snippet_layout")
