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

    def test_page_config_round_trip_preserves_page_metadata(self):
        page = self.models.PageConfig.from_dict({
            "id": "page_schedule",
            "name": "Scheduled",
            "refresh_s": 45,
            "refresh_type": "daily",
            "refresh_time": "08:30",
            "dark_mode": "dark",
            "visible_from": "06:00",
            "visible_to": "22:00",
            "layout": "4x4",
            "widgets": [],
        })

        serialized = page.to_dict()

        self.assertEqual(page.refresh_s, 45)
        self.assertEqual(page.refresh_type, "daily")
        self.assertEqual(page.refresh_time, "08:30")
        self.assertEqual(page.dark_mode, "dark")
        self.assertEqual(page.visible_from, "06:00")
        self.assertEqual(page.visible_to, "22:00")
        self.assertEqual(page.layout, "4x4")
        self.assertEqual(serialized["refresh_type"], "daily")
        self.assertEqual(serialized["refresh_time"], "08:30")
        self.assertEqual(serialized["visible_from"], "06:00")
        self.assertEqual(serialized["visible_to"], "22:00")
        self.assertEqual(serialized["layout"], "4x4")

    def test_widget_config_from_dict_clamps_and_serializes_cleanly(self):
        widget = self.models.WidgetConfig.from_dict({
            "id": "widget_roundtrip",
            "type": "image",
            "x": -1,
            "y": -2,
            "width": 0,
            "height": -3,
            "title": "Photo",
            "props": {"path": "/config/picture.png"},
            "condition_min": "1.5",
            "condition_max": "",
        })

        self.assertEqual(widget.x, 0)
        self.assertEqual(widget.y, 0)
        self.assertEqual(widget.width, 10)
        self.assertEqual(widget.height, 10)
        self.assertEqual(widget.condition_min, 1.5)
        self.assertIsNone(widget.condition_max)
        self.assertEqual(widget.to_dict()["props"], {"path": "/config/picture.png"})

    def test_device_config_from_dict_prefers_frontend_keys_and_normalizes_defaults(self):
        device = self.models.DeviceConfig.from_dict({
            "currentLayoutId": "layout_frontend",
            "deviceName": "Frontend Device",
            "deviceModel": "reterminal_e1002",
            "manualYamlOverride": "# persisted override",
            "renderingMode": "lvgl",
            "orientation": "invalid",
            "current_page": 99,
            "pages": [],
        })

        self.assertEqual(device.device_id, "layout_frontend")
        self.assertEqual(device.name, "Frontend Device")
        self.assertEqual(device.device_model, "reterminal_e1002")
        self.assertEqual(device.manual_yaml_override, "# persisted override")
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

    def test_device_config_from_dict_sanitizes_optional_int_and_mapping_fields(self):
        device = self.models.DeviceConfig.from_dict({
            "device_id": "layout_sanitize",
            "noRefreshStartHour": "",
            "noRefreshEndHour": "23",
            "customHardware": ["bad"],
            "protocolHardware": "bad",
            "pages": [],
        })

        self.assertIsNone(device.no_refresh_start_hour)
        self.assertEqual(device.no_refresh_end_hour, 23)
        self.assertEqual(device.custom_hardware, {})
        self.assertEqual(device.protocol_hardware, {})

    def test_device_config_round_trip_preserves_string_and_nested_fields(self):
        source = {
            "device_id": "layout_roundtrip",
            "deviceName": "Roundtrip Device",
            "deviceModel": "reterminal_e1003",
            "manualYamlOverride": "# raw yaml",
            "model": "custom-model",
            "deepSleepStayAwakeEntityId": "input_boolean.keep_awake",
            "dailyRefreshTime": "09:15",
            "renderingMode": "bitmap",
            "lcdEcoStrategy": "dim",
            "oeplEntityId": "sensor.oepl",
            "shape": "circle",
            "glyphsets": ["GF_Latin_Kernel", "GF_Latin_Core"],
            "customHardware": {"driver": "waveshare"},
            "protocolHardware": {"transport": "oepl"},
            "pages": [{
                "id": "page_0",
                "name": "Main",
                "widgets": [{
                    "id": "widget_1",
                    "type": "text",
                    "x": 1,
                    "y": 2,
                    "width": 100,
                    "height": 40,
                    "props": {"text": "Hello"},
                }],
            }],
        }

        device = self.models.DeviceConfig.from_dict(source)
        serialized = device.to_dict()

        self.assertEqual(serialized["name"], "Roundtrip Device")
        self.assertEqual(serialized["device_model"], "reterminal_e1003")
        self.assertEqual(serialized["manual_yaml_override"], "# raw yaml")
        self.assertEqual(serialized["model"], "custom-model")
        self.assertEqual(
            serialized["deep_sleep_stay_awake_entity_id"],
            "input_boolean.keep_awake",
        )
        self.assertEqual(serialized["daily_refresh_time"], "09:15")
        self.assertEqual(serialized["rendering_mode"], "bitmap")
        self.assertEqual(serialized["lcd_eco_strategy"], "dim")
        self.assertEqual(serialized["oepl_entity_id"], "sensor.oepl")
        self.assertEqual(serialized["shape"], "circle")
        self.assertEqual(serialized["glyphsets"], ["GF_Latin_Kernel", "GF_Latin_Core"])
        self.assertEqual(serialized["custom_hardware"], {"driver": "waveshare"})
        self.assertEqual(serialized["protocol_hardware"], {"transport": "oepl"})
        self.assertEqual(
            serialized["pages"][0]["widgets"][0]["props"],
            {"text": "Hello"},
        )
