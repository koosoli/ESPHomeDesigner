# Mock homeassistant before importing models
import sys
from unittest.mock import MagicMock
sys.modules["homeassistant"] = MagicMock()
sys.modules["homeassistant.core"] = MagicMock()

# Import from the parent package
from .models import DeviceConfig, PageConfig

def test_device_config_serialization():
    print("Testing DeviceConfig serialization...")
    
    # Create a dummy config with test data
    cfg = DeviceConfig(
        device_id="test_id",
        api_token="test_token",
        name="Test Device",
        auto_cycle_enabled=True,
        auto_cycle_interval_s=15,
        refresh_interval=300,
        inverted_colors=True,
        width=400,
        height=400,
        shape="round",
        custom_hardware={"foo": "bar"},
        protocol_hardware={"proto": "v1"}
    )
    
    # 1. Test to_dict
    data = cfg.to_dict()
    print("to_dict output:", data)
    
    assert data["device_id"] == "test_id"
    assert data["auto_cycle_enabled"] is True
    assert data["auto_cycle_interval_s"] == 15
    assert data["refresh_interval"] == 300
    assert data["inverted_colors"] is True
    assert data["width"] == 400
    assert data["height"] == 400
    assert data["shape"] == "round"
    assert data["custom_hardware"] == {"foo": "bar"}
    assert data["protocol_hardware"] == {"proto": "v1"}
    
    print("✓ to_dict verification passed")
    
    # 2. Test from_dict (snake_case)
    cfg2 = DeviceConfig.from_dict(data)
    assert cfg2.auto_cycle_enabled is True
    assert cfg2.width == 400
    assert cfg2.custom_hardware == {"foo": "bar"}
    print("✓ from_dict (snake_case) verification passed")
    
    # 3. Test from_dict (camelCase - as sent by frontend)
    frontend_data = {
        "device_id": "test_id",
        "autoCycleEnabled": True,
        "autoCycleInterval": 45,
        "refreshInterval": 900,
        "invertedColors": True,
        "resWidth": 540,
        "resHeight": 960,
        "shape": "rect",
        "customHardware": {"custom": "data"},
        "protocolHardware": {"p": "2"}
    }
    cfg3 = DeviceConfig.from_dict(frontend_data)
    assert cfg3.auto_cycle_enabled is True
    assert cfg3.auto_cycle_interval_s == 45
    assert cfg3.refresh_interval == 900
    assert cfg3.inverted_colors is True
    assert cfg3.width == 540
    assert cfg3.height == 960
    assert cfg3.shape == "rect"
    assert cfg3.custom_hardware == {"custom": "data"}
    assert cfg3.protocol_hardware == {"p": "2"}
    print("✓ from_dict (camelCase) verification passed")
    
    print("\nALL DEVICE_CONFIG SERIALIZATION TESTS PASSED!")

if __name__ == "__main__":
    try:
        test_device_config_serialization()
    except Exception as e:
        print(f"\nTEST FAILED: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
