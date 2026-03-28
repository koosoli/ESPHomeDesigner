from __future__ import annotations

import unittest

from support import load_integration_modules


class ModelParsingTests(unittest.TestCase):
    def setUp(self):
        modules = load_integration_modules()
        self.models = modules["models"]

    def test_page_config_from_dict_sanitizes_invalid_condition_bounds_and_refresh(self):
        page = self.models.PageConfig.from_dict({
            "id": "page_custom",
            "name": "Custom",
            "refresh_s": 0,
            "dark_mode": "unsupported",
            "widgets": [{
                "id": "widget_1",
                "type": "text",
                "x": -5,
                "y": -10,
                "width": 0,
                "height": -3,
                "condition_min": "bad",
                "condition_max": "4.5",
            }],
        })

        self.assertEqual(page.id, "page_custom")
        self.assertIsNone(page.refresh_s)
        self.assertIsNone(page.dark_mode)
        self.assertEqual(page.widgets[0].x, 0)
        self.assertEqual(page.widgets[0].y, 0)
        self.assertEqual(page.widgets[0].width, 10)
        self.assertEqual(page.widgets[0].height, 10)
        self.assertIsNone(page.widgets[0].condition_min)
        self.assertEqual(page.widgets[0].condition_max, 4.5)

    def test_device_config_from_dict_prefers_frontend_keys_and_normalizes_defaults(self):
        device = self.models.DeviceConfig.from_dict({
            "currentLayoutId": "layout_frontend",
            "deviceName": "Frontend Device",
            "deviceModel": "reterminal_e1002",
            "renderingMode": "lvgl",
            "orientation": "invalid",
            "current_page": 99,
            "pages": [],
        })

        self.assertEqual(device.device_id, "layout_frontend")
        self.assertEqual(device.name, "Frontend Device")
        self.assertEqual(device.device_model, "reterminal_e1002")
        self.assertEqual(device.rendering_mode, "lvgl")
        self.assertEqual(device.orientation, "landscape")
        self.assertEqual(device.current_page, 0)
        self.assertGreaterEqual(len(device.pages), 1)

    def test_device_config_from_dict_coerces_string_booleans_safely(self):
        device = self.models.DeviceConfig.from_dict({
            "device_id": "layout_bool",
            "darkMode": "false",
            "sleepEnabled": "0",
            "deepSleepEnabled": "yes",
            "deepSleepStayAwakeSwitch": "off",
            "dailyRefreshEnabled": "true",
            "autoCycleEnabled": "1",
            "invertedColors": "no",
            "pages": [],
        })

        self.assertFalse(device.dark_mode)
        self.assertFalse(device.sleep_enabled)
        self.assertTrue(device.deep_sleep_enabled)
        self.assertFalse(device.deep_sleep_stay_awake_switch)
        self.assertTrue(device.daily_refresh_enabled)
        self.assertTrue(device.auto_cycle_enabled)
        self.assertFalse(device.inverted_colors)
