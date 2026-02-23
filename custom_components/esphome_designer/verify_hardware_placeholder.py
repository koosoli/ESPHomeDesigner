import sys
import types
import importlib.util
from pathlib import Path
from unittest.mock import MagicMock


sys.modules["homeassistant"] = MagicMock()
sys.modules["homeassistant.core"] = MagicMock()
sys.modules["homeassistant.components"] = MagicMock()
sys.modules["homeassistant.components.http"] = MagicMock()
sys.modules["homeassistant.helpers"] = MagicMock()
sys.modules["homeassistant.helpers.json"] = MagicMock()
sys.modules["yaml"] = MagicMock()
sys.modules["aiohttp"] = MagicMock()

repo_root = Path(__file__).resolve().parents[2]
hardware_file = repo_root / "custom_components" / "esphome_designer" / "api" / "hardware.py"

pkg = types.ModuleType("esphome_designer")
api_pkg = types.ModuleType("esphome_designer.api")
const_mod = types.ModuleType("esphome_designer.const")
base_mod = types.ModuleType("esphome_designer.api.base")

const_mod.API_BASE_PATH = "/api/esphome_designer"


class _DesignerBaseView:  # minimal stub for import-time class inheritance
    pass


base_mod.DesignerBaseView = _DesignerBaseView

sys.modules["esphome_designer"] = pkg
sys.modules["esphome_designer.api"] = api_pkg
sys.modules["esphome_designer.const"] = const_mod
sys.modules["esphome_designer.api.base"] = base_mod

spec = importlib.util.spec_from_file_location("esphome_designer.api.hardware", hardware_file)
hardware_module = importlib.util.module_from_spec(spec)
sys.modules["esphome_designer.api.hardware"] = hardware_module
spec.loader.exec_module(hardware_module)


def test_ensure_lambda_placeholder_in_display_section():
    _ensure_lambda_placeholder_in_display_section = hardware_module._ensure_lambda_placeholder_in_display_section

    list_yaml = "\n".join([
        "display:",
        "  - platform: st7789v",
        "    id: my_display",
        "font:",
        "  - file: \"foo.ttf\"",
    ])
    list_out = _ensure_lambda_placeholder_in_display_section(list_yaml)
    assert "display:\n  - platform: st7789v\n    id: my_display\n    # __LAMBDA_PLACEHOLDER__\nfont:" in list_out

    map_yaml = "\n".join([
        "display:",
        "  platform: st7789v",
        "  id: my_display",
        "spi:",
        "  clk_pin: GPIO1",
    ])
    map_out = _ensure_lambda_placeholder_in_display_section(map_yaml)
    assert "display:\n  platform: st7789v\n  id: my_display\n  # __LAMBDA_PLACEHOLDER__\nspi:" in map_out

    existing_yaml = "\n".join([
        "display:",
        "  - platform: st7789v",
        "    lambda: |-",
        "      # __LAMBDA_PLACEHOLDER__",
    ])
    existing_out = _ensure_lambda_placeholder_in_display_section(existing_yaml)
    assert existing_out.count("__LAMBDA_PLACEHOLDER__") == 1

    no_display_yaml = "\n".join([
        "esp32:",
        "  board: esp32dev",
        "logger:",
    ])
    no_display_out = _ensure_lambda_placeholder_in_display_section(no_display_yaml)
    assert no_display_out == no_display_yaml


if __name__ == "__main__":
    try:
        test_ensure_lambda_placeholder_in_display_section()
        print("ALL HARDWARE PLACEHOLDER TESTS PASSED")
    except Exception as e:
        print(f"TEST FAILED: {e}")
        raise