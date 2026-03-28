from __future__ import annotations

import unittest

from support import load_integration_modules


class FakeStorage:
    def __init__(self, device=None):
        self.devices = {}
        self.calls = []
        if device is not None:
            self.devices[device.device_id] = device

    async def async_update_device(self, device_id, updater):
        self.calls.append(device_id)
        device = self.devices.get(device_id)
        if device is None:
            return None
        updater(device)
        return device


class ServiceTests(unittest.IsolatedAsyncioTestCase):
    def setUp(self):
        modules = load_integration_modules()
        self.const = modules["const"]
        self.models = modules["models"]
        self.services_module = modules["services"]
        self.FakeHass = modules["FakeHass"]
        self.FakeServiceCall = modules["FakeServiceCall"]
        self.services_module._REGISTERED = False

    def _device(self, current_page=0, page_count=3):
        device = self.models.DeviceConfig(
            device_id="kiosk",
            api_token="token",
            name="Kiosk",
            pages=[self.models.PageConfig(id=f"page_{index}", name=f"Page {index + 1}", widgets=[]) for index in range(page_count)],
            current_page=current_page,
        )
        device.ensure_pages()
        return device

    async def test_register_services_is_idempotent_and_unregisters(self):
        hass = self.FakeHass()
        hass.data[self.const.DOMAIN] = {"storage": FakeStorage()}

        self.services_module.async_register_services(hass, hass.data[self.const.DOMAIN]["storage"])
        self.services_module.async_register_services(hass, hass.data[self.const.DOMAIN]["storage"])

        self.assertEqual(len(hass.services.registrations), 3)
        self.assertTrue(hass.services.has_service(self.const.DOMAIN, self.const.SERVICE_SET_PAGE))
        self.assertTrue(hass.services.has_service(self.const.DOMAIN, self.const.SERVICE_NEXT_PAGE))
        self.assertTrue(hass.services.has_service(self.const.DOMAIN, self.const.SERVICE_PREV_PAGE))

        self.services_module.async_unregister_services(hass)

        self.assertFalse(hass.services.has_service(self.const.DOMAIN, self.const.SERVICE_SET_PAGE))
        self.assertFalse(hass.services.has_service(self.const.DOMAIN, self.const.SERVICE_NEXT_PAGE))
        self.assertFalse(hass.services.has_service(self.const.DOMAIN, self.const.SERVICE_PREV_PAGE))

    async def test_set_page_service_updates_device_state(self):
        device = self._device(current_page=0, page_count=3)
        storage = FakeStorage(device)
        hass = self.FakeHass()
        hass.data[self.const.DOMAIN] = {"storage": storage}
        self.services_module.async_register_services(hass, storage)

        handler = hass.services.registrations[(self.const.DOMAIN, self.const.SERVICE_SET_PAGE)]["handler"]
        handler(self.FakeServiceCall({self.const.CONF_DEVICE_ID: "kiosk", "page_index": 2}))
        await hass.created_tasks[-1]

        self.assertEqual(device.current_page, 2)

    async def test_next_and_prev_services_wrap_pages(self):
        device = self._device(current_page=2, page_count=3)
        storage = FakeStorage(device)
        hass = self.FakeHass()
        hass.data[self.const.DOMAIN] = {"storage": storage}
        self.services_module.async_register_services(hass, storage)

        next_handler = hass.services.registrations[(self.const.DOMAIN, self.const.SERVICE_NEXT_PAGE)]["handler"]
        prev_handler = hass.services.registrations[(self.const.DOMAIN, self.const.SERVICE_PREV_PAGE)]["handler"]

        next_handler(self.FakeServiceCall({self.const.CONF_DEVICE_ID: "kiosk"}))
        await hass.created_tasks[-1]
        self.assertEqual(device.current_page, 0)

        prev_handler(self.FakeServiceCall({self.const.CONF_DEVICE_ID: "kiosk"}))
        await hass.created_tasks[-1]
        self.assertEqual(device.current_page, 2)

    async def test_service_handlers_ignore_unknown_devices_without_crashing(self):
        storage = FakeStorage()
        hass = self.FakeHass()
        hass.data[self.const.DOMAIN] = {"storage": storage}
        self.services_module.async_register_services(hass, storage)

        handler = hass.services.registrations[(self.const.DOMAIN, self.const.SERVICE_SET_PAGE)]["handler"]
        handler(self.FakeServiceCall({self.const.CONF_DEVICE_ID: "missing", "page_index": 1}))
        await hass.created_tasks[-1]

        self.assertEqual(storage.calls, ["missing"])

    def test_require_storage_raises_when_missing(self):
        with self.assertRaisesRegex(RuntimeError, self.const.DOMAIN):
            self.services_module._require_storage(self.FakeHass())
