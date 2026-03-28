from __future__ import annotations

import json
import unittest

from support import load_integration_modules


class FakeRequest:
    def __init__(self, payload=None, headers=None):
        self._payload = payload
        self.headers = headers or {}

    async def read(self):
        return json.dumps(self._payload or {}).encode("utf-8")


class FakeStorage:
    def __init__(self, existing=None):
        self.layouts = existing or {}
        self.deleted = []
        self._state = None

    async def async_get_layout(self, layout_id):
        return self.layouts.get(layout_id)

    async def async_save_layout(self, layout):
        self.layouts[layout.device_id] = layout

    async def async_delete_layout(self, layout_id):
        self.deleted.append(layout_id)
        self.layouts.pop(layout_id, None)

    async def async_list_layouts(self):
        return [
            {"id": layout.device_id, "name": layout.name}
            for layout in self.layouts.values()
        ]


class LayoutManagementApiTests(unittest.IsolatedAsyncioTestCase):
    def setUp(self):
        modules = load_integration_modules()
        self.layout_module = modules["layout"]
        self.models = modules["models"]

    async def test_layouts_list_post_sanitizes_ids_and_rejects_duplicates(self):
        storage = FakeStorage()
        view = self.layout_module.ReTerminalLayoutsListView(None, storage)

        created = await view.post(FakeRequest({"id": "Kitchen Display!!", "name": "Kitchen"}))
        created_payload = json.loads(created.body)
        self.assertEqual(created_payload["device_id"], "kitchendisplay")
        self.assertIn("kitchendisplay", storage.layouts)

        duplicate = await view.post(FakeRequest({"id": "Kitchen Display!!"}))
        self.assertEqual(duplicate.status, 409)
        self.assertEqual(json.loads(duplicate.body), {"error": "already_exists"})

    async def test_layout_detail_post_delete_action_deletes_non_default_layout(self):
        layout = self.models.DeviceConfig(device_id="kiosk", api_token="", name="Kiosk", pages=[])
        layout.ensure_pages()
        storage = FakeStorage(existing={"kiosk": layout})
        view = self.layout_module.ReTerminalLayoutDetailView(None, storage)

        response = await view.post(FakeRequest({"action": "delete"}), "kiosk")

        self.assertEqual(response.status, 200)
        self.assertEqual(json.loads(response.body), {"status": "deleted"})
        self.assertEqual(storage.deleted, ["kiosk"])

    async def test_layout_detail_post_blocks_default_delete_action(self):
        storage = FakeStorage()
        view = self.layout_module.ReTerminalLayoutDetailView(None, storage)

        response = await view.post(FakeRequest({"action": "delete"}), "default")

        self.assertEqual(response.status, 403)
        self.assertEqual(json.loads(response.body), {"error": "cannot_delete_default"})

    async def test_layouts_list_get_includes_last_active_layout_id(self):
        layout = self.models.DeviceConfig(device_id="kiosk", api_token="", name="Kiosk", pages=[])
        layout.ensure_pages()
        storage = FakeStorage(existing={"kiosk": layout})
        storage._state = type("State", (), {"last_active_layout_id": "kiosk"})()
        view = self.layout_module.ReTerminalLayoutsListView(None, storage)

        response = await view.get(FakeRequest())

        self.assertEqual(response.status, 200)
        payload = json.loads(response.body)
        self.assertEqual(payload["last_active_layout_id"], "kiosk")
        self.assertEqual(payload["layouts"], [{"id": "kiosk", "name": "Kiosk"}])
