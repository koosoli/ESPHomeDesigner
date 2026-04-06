from __future__ import annotations

import unittest

from support import load_integration_modules


class DashboardStorageTests(unittest.IsolatedAsyncioTestCase):
    def setUp(self):
        modules = load_integration_modules()
        self.models = modules["models"]
        self.storage_module = modules["storage"]
        self.fake_store = modules["FakeStore"]

    def _device(self, device_id: str, api_token: str, **overrides):
        device = self.models.DeviceConfig(
            device_id=device_id,
            api_token=api_token,
            name=overrides.pop("name", device_id.title()),
            **overrides,
        )
        device.ensure_pages()
        return device

    async def test_get_default_device_prefers_last_active_layout(self):
        storage = self.storage_module.DashboardStorage(object())
        primary = self._device("kitchen", "token-1")
        secondary = self._device("hallway", "token-2")
        storage._state = self.models.DashboardState(
            devices={"kitchen": primary, "hallway": secondary},
            last_active_layout_id="hallway",
        )

        device = await storage.async_get_default_device()

        self.assertEqual(device.device_id, "hallway")

    async def test_get_default_device_creates_default_when_empty(self):
        storage = self.storage_module.DashboardStorage(object())
        storage._state = self.models.DashboardState()

        device = await storage.async_get_default_device()

        self.assertEqual(device.device_id, "reterminal_e1001")
        self.assertEqual(len(storage._store.saved_payloads), 1)
        self.assertIn("reterminal_e1001", storage.state.devices)

    async def test_load_ignores_non_mapping_payloads(self):
        storage = self.storage_module.DashboardStorage(object())
        storage._store.load_map[storage._store.key] = ["not", "a", "mapping"]

        await storage.async_load()

        self.assertEqual(storage.state.devices, {})
        self.assertIsNone(storage.state.last_active_layout_id)

    async def test_update_layout_preserves_existing_token_and_tracks_last_active(self):
        storage = self.storage_module.DashboardStorage(object())
        existing = self._device("kiosk", "secret-token", rendering_mode="lvgl")
        storage._state = self.models.DashboardState(devices={"kiosk": existing})

        updated = await storage.async_update_layout("kiosk", {
            "name": "Updated Layout",
            "pages": [{
                "id": "page_0",
                "name": "Main",
                "widgets": [{
                    "id": "w1",
                    "type": "text",
                    "x": 1,
                    "y": 2,
                    "width": 100,
                    "height": 40,
                    "props": {"text": "Hello"},
                }],
            }],
        })

        self.assertIsNotNone(updated)
        self.assertEqual(updated.api_token, "secret-token")
        self.assertEqual(updated.rendering_mode, "lvgl")
        self.assertEqual(storage.state.last_active_layout_id, "kiosk")
        self.assertEqual(len(storage._store.saved_payloads), 1)

    async def test_update_layout_persists_page_schedule_and_visibility_metadata(self):
        storage = self.storage_module.DashboardStorage(object())
        existing = self._device("kiosk", "secret-token")
        storage._state = self.models.DashboardState(devices={"kiosk": existing})

        updated = await storage.async_update_layout("kiosk", {
            "name": "Scheduled Layout",
            "pages": [{
                "id": "page_0",
                "name": "Morning",
                "refresh_type": "daily",
                "refresh_time": "08:15",
                "visible_from": "06:00",
                "visible_to": "22:00",
                "layout": "4x4",
                "widgets": [],
            }],
        })

        self.assertIsNotNone(updated)
        self.assertEqual(updated.pages[0].refresh_type, "daily")
        self.assertEqual(updated.pages[0].refresh_time, "08:15")
        self.assertEqual(updated.pages[0].visible_from, "06:00")
        self.assertEqual(updated.pages[0].visible_to, "22:00")
        self.assertEqual(updated.pages[0].layout, "4x4")
        saved_page = storage._store.saved_payloads[-1]["devices"]["kiosk"]["pages"][0]
        self.assertEqual(saved_page["refresh_type"], "daily")
        self.assertEqual(saved_page["refresh_time"], "08:15")
        self.assertEqual(saved_page["visible_from"], "06:00")
        self.assertEqual(saved_page["visible_to"], "22:00")
        self.assertEqual(saved_page["layout"], "4x4")

    async def test_update_layout_from_device_preserves_existing_token(self):
        storage = self.storage_module.DashboardStorage(object())
        existing = self._device("kiosk", "secret-token")
        storage._state = self.models.DashboardState(devices={"kiosk": existing})

        imported = self.models.DeviceConfig(device_id="kiosk", api_token="", name="Imported", pages=[])
        imported.ensure_pages()
        updated = await storage.async_update_layout_from_device(imported)

        self.assertEqual(updated.api_token, "secret-token")
        self.assertEqual(storage.state.last_active_layout_id, "kiosk")
        self.assertEqual(len(storage._store.saved_payloads), 1)

    async def test_update_layout_default_rejects_invalid_payloads_instead_of_returning_existing(self):
        storage = self.storage_module.DashboardStorage(object())
        existing = self._device("reterminal_e1001", "secret-token", name="Existing")
        storage._state = self.models.DashboardState(devices={"reterminal_e1001": existing})

        updated = await storage.async_update_layout_default({"pages": [1]})

        self.assertIsNone(updated)
        self.assertEqual(storage.state.devices["reterminal_e1001"].name, "Existing")
        self.assertEqual(len(storage._store.saved_payloads), 0)

    async def test_delete_layout_clears_last_active_layout(self):
        storage = self.storage_module.DashboardStorage(object())
        existing = self._device("kiosk", "secret-token")
        storage._state = self.models.DashboardState(devices={"kiosk": existing}, last_active_layout_id="kiosk")

        await storage.async_delete_layout("kiosk")

        self.assertNotIn("kiosk", storage.state.devices)
        self.assertIsNone(storage.state.last_active_layout_id)
        self.assertEqual(len(storage._store.saved_payloads), 1)
