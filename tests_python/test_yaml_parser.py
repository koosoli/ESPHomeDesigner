from __future__ import annotations

import unittest

from support import load_integration_modules


class YamlParserTests(unittest.TestCase):
    def setUp(self):
        modules = load_integration_modules()
        self.yaml_parser = modules["yaml_parser"]

    def test_yaml_to_layout_rejects_invalid_yaml(self):
        with self.assertRaisesRegex(ValueError, "invalid_yaml"):
            self.yaml_parser.yaml_to_layout("display: [")

    def test_yaml_to_layout_supports_mapping_display_structure(self):
        device = self.yaml_parser.yaml_to_layout(
            """
display:
  id: epaper_display
  lambda: |-
    if (page == 0) {
      // page:name "Status"
      // widget:text id:greeting x:1 y:2 w:50 h:20 text:"Hello"
    }
"""
        )

        self.assertEqual(device.device_model, "reterminal_e1001")
        self.assertEqual(len(device.pages), 1)
        self.assertEqual(device.pages[0].name, "Status")
        self.assertEqual(device.pages[0].widgets[0].props["text"], "Hello")

    def test_yaml_to_layout_parses_epaper_spi_pages_and_condition_props(self):
        device = self.yaml_parser.yaml_to_layout(
            """
display:
  - platform: epaper_spi
    model: Seeed-reTerminal-E1002
    id: epaper_display
    lambda: |-
      if (page == 0) {
        // page:name "Agenda"
        // widget:sensor_text id:temp type:sensor_text x:10 y:20 w:120 h:40 ent:sensor.temperature title:RoomTemp format:%.1f condition_entity:binary_sensor.window condition_operator:gt condition_max:7.5
      }
      if (id(display_page) == 1) {
        // widget:icon id:weather type:icon x:5 y:6 w:24 h:24 font_size:18 color:red
      }
"""
        )

        self.assertEqual(device.device_model, "reterminal_e1002")
        self.assertEqual(device.name, "reTerminal E1002")
        self.assertEqual(len(device.pages), 2)
        self.assertEqual(device.pages[0].name, "Agenda")

        sensor_widget = device.pages[0].widgets[0]
        self.assertEqual(sensor_widget.entity_id, "sensor.temperature")
        self.assertEqual(sensor_widget.props["format"], "%.1f")
        self.assertEqual(sensor_widget.condition_entity, "binary_sensor.window")
        self.assertEqual(sensor_widget.condition_operator, "gt")
        self.assertEqual(sensor_widget.condition_max, 7.5)

        icon_widget = device.pages[1].widgets[0]
        self.assertEqual(icon_widget.props["font_size"], 18)
        self.assertEqual(icon_widget.props["size"], 18)

    def test_yaml_to_layout_rejects_missing_display_lambda_and_missing_pages(self):
        with self.assertRaisesRegex(ValueError, "unrecognized_display_structure"):
            self.yaml_parser.yaml_to_layout(
                """
display:
  - platform: waveshare_epaper
    id: epaper_display
"""
            )

        with self.assertRaisesRegex(ValueError, "no_pages_found"):
            self.yaml_parser.yaml_to_layout(
                """
display:
  - platform: waveshare_epaper
    id: epaper_display
    lambda: |-
      it.printf(10, 20, id(font_roboto_20), "No page guards");
"""
            )

    def test_yaml_to_layout_accepts_common_esphome_tags(self):
        device = self.yaml_parser.yaml_to_layout(
            """
substitutions:
  friendly_name: !secret kitchen_name
font:
  - file: !include fonts/roboto.yaml
display:
  - platform: waveshare_epaper
    id: epaper_display
    lambda: !lambda |-
      if (page == 0) {
        // widget:text id:greeting x:4 y:8 w:80 h:20 text:"Tagged"
      }
"""
        )

        self.assertEqual(device.pages[0].widgets[0].id, "greeting")
        self.assertEqual(device.pages[0].widgets[0].props["text"], "Tagged")

    def test_yaml_to_layout_parses_energy_widget_marker_props(self):
        device = self.yaml_parser.yaml_to_layout(
            """
display:
  - platform: waveshare_epaper
    id: epaper_display
    lambda: |-
      if (page == 0) {
        // widget:energy_widget id:energy type:energy_widget x:10 y:20 w:220 h:140 title:"Energy" solar_entity:sensor.solar_power solar_to_home_entity:sensor.solar_to_home solar_to_grid_entity:sensor.solar_to_grid solar_to_battery_entity:sensor.solar_to_battery autoconsumption_percent_entity:sensor.solar_self_use_pct home_entity:sensor.home_power grid_entity:sensor.grid_power battery_power_entity:sensor.battery_power battery_soc_entity:sensor.battery_soc show_gas:true gas_entity:sensor.gas_today grid_positive_mode:export battery_positive_mode:discharging flow_unit:kW gas_unit:m3 decimals:1
      }
"""
        )

        widget = device.pages[0].widgets[0]
        self.assertEqual(widget.type, "energy_widget")
        self.assertEqual(widget.props["title"], "Energy")
        self.assertEqual(widget.props["solar_entity"], "sensor.solar_power")
        self.assertEqual(widget.props["solar_to_home_entity"], "sensor.solar_to_home")
        self.assertEqual(widget.props["solar_to_grid_entity"], "sensor.solar_to_grid")
        self.assertEqual(widget.props["solar_to_battery_entity"], "sensor.solar_to_battery")
        self.assertEqual(widget.props["autoconsumption_percent_entity"], "sensor.solar_self_use_pct")
        self.assertEqual(widget.props["home_entity"], "sensor.home_power")
        self.assertEqual(widget.props["grid_entity"], "sensor.grid_power")
        self.assertEqual(widget.props["battery_power_entity"], "sensor.battery_power")
        self.assertEqual(widget.props["battery_soc_entity"], "sensor.battery_soc")
        self.assertTrue(widget.props["show_battery"])
        self.assertTrue(widget.props["show_gas"])
        self.assertEqual(widget.props["gas_entity"], "sensor.gas_today")
        self.assertEqual(widget.props["grid_positive_mode"], "export")
        self.assertEqual(widget.props["battery_positive_mode"], "discharging")
        self.assertEqual(widget.props["flow_unit"], "kW")
        self.assertEqual(widget.props["gas_unit"], "m3")
        self.assertEqual(widget.props["decimals"], 1)
