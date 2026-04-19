"""
Models for the ESPHome Designer Designer integration.

These dataclasses define the internal layout representation used for:
- Storing device and layout configuration.
- Rendering pages to PNG.
- Exposing/consuming layouts via the HTTP API and frontend editor.

All IDs and references are generic and safe for open-source usage.
"""

from __future__ import annotations

from dataclasses import dataclass, field, asdict
from typing import Any, Callable, Dict, List, Optional

from .const import DEFAULT_PAGES


def _coerce_bool(value: Any, default: bool = False) -> bool:
    """Coerce persisted/frontend values into booleans safely."""
    if isinstance(value, bool):
        return value
    if value is None:
        return default

    if isinstance(value, (int, float)) and not isinstance(value, bool):
        return value != 0

    if isinstance(value, str):
        normalized = value.strip().lower()
        if normalized in {"1", "true", "yes", "on", "enabled", "enable"}:
            return True
        if normalized in {"0", "false", "no", "off", "disabled", "disable", ""}:
            return False
        return default

    return default


def _coerce_optional_float(value: Any) -> Optional[float]:
    """Parse optional numeric bounds from persisted/frontend values."""
    try:
        return float(value) if value is not None and value != "" else None
    except (TypeError, ValueError):
        return None


def _coerce_optional_int(value: Any) -> Optional[int]:
    """Parse optional integer fields while treating blank values as missing."""
    try:
        return int(value) if value is not None and value != "" else None
    except (TypeError, ValueError):
        return None


def _coerce_optional_str(value: Any) -> Optional[str]:
    """Parse optional string fields while treating blanks as missing."""
    if value is None:
        return None
    text = str(value).strip()
    return text or None


def _coerce_optional_positive_int(value: Any) -> Optional[int]:
    """Parse optional positive integers while treating zero/negative as missing."""
    parsed = _coerce_optional_int(value)
    if parsed is None or parsed <= 0:
        return None
    return parsed


def _coerce_int(value: Any, default: Optional[int]) -> Optional[int]:
    """Parse integers with a fallback default for invalid values."""
    parsed = _coerce_optional_int(value)
    return default if parsed is None else parsed


def _get_compat_value(
    data: Dict[str, Any], snake_key: str, camel_key: str, default: Any
) -> Any:
    """Prefer frontend camelCase keys over stored snake_case keys."""
    return data.get(camel_key, data.get(snake_key, default))


def _get_compat_int(
    data: Dict[str, Any], snake_key: str, camel_key: str, default: Optional[int]
) -> Optional[int]:
    """Read a compat integer field from mixed frontend/storage payloads."""
    return _coerce_int(_get_compat_value(data, snake_key, camel_key, default), default)


def _get_compat_dict(
    data: Dict[str, Any],
    snake_key: str,
    camel_key: str,
    default_factory: Callable[[], Dict[str, Any]],
) -> Dict[str, Any]:
    """Read a compat mapping field and fall back when the payload is not a dict."""
    value = _get_compat_value(data, snake_key, camel_key, None)
    if value is None or not isinstance(value, dict):
        return default_factory()
    return value


def _normalize_orientation(value: Any) -> str:
    """Normalize orientation values to the supported set."""
    orientation = str(value or "landscape").lower()
    return orientation if orientation in ("landscape", "portrait") else "landscape"


def _normalize_page_dark_mode(value: Any) -> Optional[str]:
    """Normalize per-page dark mode values to known options."""
    return str(value) if value in ("inherit", "light", "dark") else None


_DEVICE_SERIALIZED_FIELDS = (
    "name",
    "current_page",
    "manual_yaml_override",
    "orientation",
    "device_model",
    "model",
    "dark_mode",
    "sleep_enabled",
    "sleep_start_hour",
    "sleep_end_hour",
    "deep_sleep_enabled",
    "deep_sleep_interval",
    "deep_sleep_stay_awake_switch",
    "deep_sleep_stay_awake_entity_id",
    "deep_sleep_firmware_guard",
    "manual_refresh_only",
    "no_refresh_start_hour",
    "no_refresh_end_hour",
    "daily_refresh_enabled",
    "daily_refresh_time",
    "rendering_mode",
    "extended_latin_glyphs",
    "lcd_eco_strategy",
    "oepl_entity_id",
    "oepl_dither",
    "auto_cycle_enabled",
    "auto_cycle_interval_s",
    "refresh_interval",
    "inverted_colors",
    "width",
    "height",
    "shape",
    "custom_hardware",
    "protocol_hardware",
    "glyphsets",
)

_DEVICE_STRING_FIELD_SPECS = (
    ("name", "deviceName", "reTerminal"),
    ("manual_yaml_override", "manualYamlOverride", ""),
    ("device_model", "deviceModel", "reterminal_e1001"),
    ("model", "model", "7.50inv2"),
    (
        "deep_sleep_stay_awake_entity_id",
        "deepSleepStayAwakeEntityId",
        "input_boolean.esphome_stay_awake",
    ),
    ("daily_refresh_time", "dailyRefreshTime", "08:00"),
    ("rendering_mode", "renderingMode", "direct"),
    ("lcd_eco_strategy", "lcdEcoStrategy", "backlight_off"),
    ("oepl_entity_id", "oeplEntityId", ""),
    ("shape", "shape", "rect"),
)

_DEVICE_BOOL_FIELD_SPECS = (
    ("dark_mode", "darkMode", False),
    ("sleep_enabled", "sleepEnabled", False),
    ("deep_sleep_enabled", "deepSleepEnabled", False),
    ("deep_sleep_stay_awake_switch", "deepSleepStayAwakeSwitch", False),
    ("deep_sleep_firmware_guard", "deepSleepFirmwareGuard", False),
    ("manual_refresh_only", "manualRefreshOnly", False),
    ("daily_refresh_enabled", "dailyRefreshEnabled", False),
    ("extended_latin_glyphs", "extendedLatinGlyphs", False),
    ("auto_cycle_enabled", "autoCycleEnabled", False),
    ("inverted_colors", "invertedColors", False),
)

_DEVICE_INT_FIELD_SPECS = (
    ("sleep_start_hour", "sleepStartHour", 0),
    ("sleep_end_hour", "sleepEndHour", 5),
    ("deep_sleep_interval", "deepSleepInterval", 600),
    ("no_refresh_start_hour", "noRefreshStartHour", None),
    ("no_refresh_end_hour", "noRefreshEndHour", None),
    ("oepl_dither", "oeplDither", 2),
    ("auto_cycle_interval_s", "autoCycleIntervalS", 30),
    ("refresh_interval", "refreshInterval", 600),
    ("width", "resWidth", 800),
    ("height", "resHeight", 480),
)

_DEVICE_DICT_FIELD_SPECS = (
    ("custom_hardware", "customHardware", dict),
    ("protocol_hardware", "protocolHardware", dict),
)


def _serialize_device_settings(device: "DeviceConfig") -> Dict[str, Any]:
    """Serialize the stable device setting subset used by storage and API responses."""
    return {field_name: getattr(device, field_name) for field_name in _DEVICE_SERIALIZED_FIELDS}


def _deserialize_device_settings(data: Dict[str, Any]) -> Dict[str, Any]:
    """Deserialize device settings using the shared compat field specs."""
    settings = {
        snake_key: str(_get_compat_value(data, snake_key, camel_key, default))
        for snake_key, camel_key, default in _DEVICE_STRING_FIELD_SPECS
    }
    settings.update(
        {
            snake_key: _coerce_bool(
                _get_compat_value(data, snake_key, camel_key, default), default
            )
            for snake_key, camel_key, default in _DEVICE_BOOL_FIELD_SPECS
        }
    )
    settings.update(
        {
            snake_key: _get_compat_int(data, snake_key, camel_key, default)
            for snake_key, camel_key, default in _DEVICE_INT_FIELD_SPECS
        }
    )
    settings.update(
        {
            snake_key: _get_compat_dict(data, snake_key, camel_key, default_factory)
            for snake_key, camel_key, default_factory in _DEVICE_DICT_FIELD_SPECS
        }
    )
    settings["glyphsets"] = _get_compat_value(
        data, "glyphsets", "glyphsets", ["GF_Latin_Kernel"]
    )
    return settings


@dataclass
class WidgetConfig:
    """
    A single widget on a page.

    type is an abstract widget kind rendered by the editor and yaml_generator.

    Supported types (union kept intentionally small and explicit):

    - "label" / "text":
        Floating static text at (x, y).
        Uses props:
          - text: str
          - font_size: int
          - color: "black" | "white" | "gray"
          - invert: bool
          - opacity: int (0-100), visual/editor hint

    - "sensor" / "sensor_text":
        Sensor label/value text.
        Uses:
          - entity_id: str
          - title: str (label)
          - props.font_size, props.color, props.invert

    - "shape_rect":
        Rectangle shape, no implicit wrapper box.
        Uses:
          - props.fill: bool
          - props.border_width: int
          - props.color: "black" | "white" | "gray"
          - props.invert: bool
          - props.opacity: int (0-100) for fill

    - "shape_circle":
        Circle shape based on width/height box.
        Uses same props as shape_rect.

    - "line":
        Line from (x, y) to (x + width, y + height).
        Uses:
          - props.stroke_width: int
          - props.color, props.invert

    - "image":
        Static image reference.
        Uses:
          - props.image_id: str (must match ESPHome image id)

    - "history":
        Simple history/graph placeholder.
        Uses:
          - props.entity_id: str
          - props.time_window: int (e.g. minutes)
          - props.style: str ("bars", "line", etc.)
    """

    id: str
    type: str
    x: int
    y: int
    width: int
    height: int

    # Optional semantic helpers; concrete behavior uses props where appropriate.
    entity_id: Optional[str] = None
    entity_id_2: Optional[str] = None
    parentId: Optional[str] = None
    title: Optional[str] = None
    icon: Optional[str] = None

    # Conditional visibility settings
    condition_entity: Optional[str] = None  # Entity to check for visibility
    condition_state: Optional[str] = None  # Expected state for visibility
    condition_operator: Optional[str] = None  # Comparison operator: "==", "!=", ">", "<", ">=", "<="
    condition_min: Optional[float] = None
    condition_max: Optional[float] = None
    condition_logic: Optional[str] = None

    # Arbitrary widget-specific properties; see type doc above.
    props: Dict[str, Any] = field(default_factory=dict)

    def to_dict(self) -> Dict[str, Any]:
        """Serialize widget configuration for storage and API responses."""
        return asdict(self)

    @staticmethod
    def from_dict(data: Dict[str, Any]) -> "WidgetConfig":
        """Create a widget config from mixed frontend/storage payload data."""
        widget = WidgetConfig(
            id=str(data.get("id", "")),
            type=str(data.get("type", "label")),
            x=int(data.get("x", 0)),
            y=int(data.get("y", 0)),
            width=int(data.get("width", 100)),
            height=int(data.get("height", 40)),
            entity_id=data.get("entity_id"),
            entity_id_2=data.get("entity_id_2"),
            parentId=data.get("parentId", data.get("parent_id")),
            title=data.get("title"),
            icon=data.get("icon"),
            condition_entity=data.get("condition_entity"),
            condition_state=data.get("condition_state"),
            condition_operator=data.get("condition_operator"),
            condition_min=_coerce_optional_float(data.get("condition_min")),
            condition_max=_coerce_optional_float(data.get("condition_max")),
            condition_logic=data.get("condition_logic"),
            props=data.get("props") or {},
        )
        widget.clamp_to_canvas()
        return widget

    def clamp_to_canvas(self) -> None:
        """Ensure widget has valid positive dimensions.

        NOTE:
        - Previously clamped to IMAGE_WIDTH/IMAGE_HEIGHT (800x480 landscape).
        - This caused issues for portrait layouts (480x800) and devices with
          different resolutions (e.g., M5Paper 540x960), where widgets placed
          beyond Y=480 would have their height incorrectly reset to 10px.
        - Now only enforces minimum positive dimensions. Canvas bounds are
          enforced by the frontend editor which knows the actual device resolution.
        """
        if self.x < 0:
            self.x = 0
        if self.y < 0:
            self.y = 0

        if self.width <= 0:
            self.width = 10
        if self.height <= 0:
            self.height = 10

        # NOTE: Canvas boundary clamping removed - the frontend editor handles
        # this correctly based on actual device resolution and orientation.
        # Keeping boundary clamping here with hardcoded 800x480 would break
        # portrait layouts and non-standard device resolutions.


@dataclass
class PageConfig:
    """Configuration for a single dashboard page."""

    id: str
    name: str
    widgets: List[WidgetConfig] = field(default_factory=list)
    # Optional per-page refresh interval (seconds).
    # If None, the global default is used in the generated YAML snippet.
    refresh_s: Optional[int] = None
    # Per-page dark mode override: "inherit", "light", or "dark"
    # If "inherit" or None, uses the global device dark_mode setting.
    dark_mode: Optional[str] = None
    # Optional per-page refresh mode metadata used by the editor.
    refresh_type: Optional[str] = None
    refresh_time: Optional[str] = None
    visible_from: Optional[str] = None
    visible_to: Optional[str] = None
    # Grid layout string such as "4x4"; None means absolute positioning.
    layout: Optional[str] = None

    def to_dict(self) -> Dict[str, Any]:
        data: Dict[str, Any] = {
            "id": self.id,
            "name": self.name,
            "widgets": [widget.to_dict() for widget in self.widgets],
        }
        if self.refresh_s is not None:
            data["refresh_s"] = self.refresh_s
        if self.dark_mode is not None:
            data["dark_mode"] = self.dark_mode
        if self.refresh_type is not None:
            data["refresh_type"] = self.refresh_type
        if self.refresh_time is not None:
            data["refresh_time"] = self.refresh_time
        if self.visible_from is not None:
            data["visible_from"] = self.visible_from
        if self.visible_to is not None:
            data["visible_to"] = self.visible_to
        if self.layout is not None:
            data["layout"] = self.layout
        return data

    @staticmethod
    def from_dict(data: Dict[str, Any]) -> "PageConfig":
        widgets_data = data.get("widgets", []) or []
        widgets = [WidgetConfig.from_dict(widget_data) for widget_data in widgets_data]

        refresh_s = _coerce_optional_positive_int(data.get("refresh_s"))
        dark_mode = _normalize_page_dark_mode(data.get("dark_mode"))
        refresh_type = _coerce_optional_str(data.get("refresh_type"))
        refresh_time = _coerce_optional_str(data.get("refresh_time"))
        visible_from = _coerce_optional_str(data.get("visible_from"))
        visible_to = _coerce_optional_str(data.get("visible_to"))
        layout = _coerce_optional_str(data.get("layout"))

        return PageConfig(
            id=str(data.get("id", "page_0")),
            name=str(data.get("name", "Page")),
            widgets=widgets,
            refresh_s=refresh_s,
            dark_mode=dark_mode,
            refresh_type=refresh_type,
            refresh_time=refresh_time,
            visible_from=visible_from,
            visible_to=visible_to,
            layout=layout,
        )



@dataclass
class DeviceConfig:
    """
    Configuration for a single reTerminal device.

    device_id:
      - Unique identifier used in API URLs and services.
    api_token:
      - Per-device token used to secure PNG and layout endpoints.
    pages:
      - List of PageConfig definitions; index is page_number.
    current_page:
      - Index of the page currently selected (for services & rendering).
    orientation:
      - "landscape" (800x480) or "portrait" (480x800) for editor and snippet.
    dark_mode:
      - If true, editor uses dark preview and docs explain inverted color usage.
    """

    device_id: str
    api_token: str
    name: str = "reTerminal"
    deep_sleep_start: int = 0
    deep_sleep_end: int = 5
    wifi_power_save: bool = False
    pages: List[PageConfig] = field(default_factory=list)
    current_page: int = 0
    manual_yaml_override: str = ""

    # Layout-wide settings
    orientation: str = "landscape"
    device_model: str = "reterminal_e1001"
    model: str = "7.50inv2"
    dark_mode: bool = False
    
    # Energy Saving / Night Mode
    sleep_enabled: bool = False
    sleep_start_hour: int = 0
    sleep_end_hour: int = 5

    # Deep Sleep / Battery Saver
    deep_sleep_enabled: bool = False
    deep_sleep_interval: int = 600  # Default 10 minutes
    deep_sleep_stay_awake_switch: bool = False
    deep_sleep_stay_awake_entity_id: str = "input_boolean.esphome_stay_awake"
    deep_sleep_firmware_guard: bool = False
    
    # Refresh Strategy
    manual_refresh_only: bool = False
    no_refresh_start_hour: int | None = None
    no_refresh_end_hour: int | None = None
    
    # Daily Scheduled Refresh
    daily_refresh_enabled: bool = False
    daily_refresh_time: str = "08:00"
    
    # Rendering and UI Settings
    rendering_mode: str = "direct"
    extended_latin_glyphs: bool = False
    lcd_eco_strategy: str = "backlight_off"
    oepl_entity_id: str = ""
    oepl_dither: int = 2

    # --- New Fields for Hardware Profile Persistence ---
    auto_cycle_enabled: bool = False
    auto_cycle_interval_s: int = 30
    refresh_interval: int = 600
    inverted_colors: bool = False
    width: int = 800
    height: int = 480
    shape: str = "rect"
    custom_hardware: Dict[str, Any] = field(default_factory=dict)
    protocol_hardware: Dict[str, Any] = field(default_factory=dict)
    glyphsets: List[str] = field(default_factory=lambda: ["GF_Latin_Kernel"])
    # ----------------------------------------------------

    def ensure_pages(self, min_pages: int = DEFAULT_PAGES) -> None:
        """Ensure at least min_pages exist; add simple default pages if missing."""
        if not self.pages:
            self.pages = []

        while len(self.pages) < min_pages:
            idx = len(self.pages)
            self.pages.append(
                PageConfig(
                    id=f"page_{idx}",
                    name=f"Page {idx + 1}",
                    widgets=[],
                )
            )

        # Clamp current_page
        if self.current_page < 0:
            self.current_page = 0
        if self.current_page >= len(self.pages):
            self.current_page = 0

        # Normalize orientation after pages exist
        if self.orientation not in ("landscape", "portrait"):
            self.orientation = "landscape"

    def set_page(self, page_index: int) -> None:
        """Set active page index safely."""
        if 0 <= page_index < len(self.pages):
            self.current_page = page_index

    def next_page(self) -> None:
        """Switch to next page (wrap-around)."""
        if self.pages:
            self.current_page = (self.current_page + 1) % len(self.pages)

    def prev_page(self) -> None:
        """Switch to previous page (wrap-around)."""
        if self.pages:
            self.current_page = (self.current_page - 1) % len(self.pages)

    def to_dict(self) -> Dict[str, Any]:
        """Serialize device configuration for the HTTP API and storage."""
        self.ensure_pages()
        data = {
            "device_id": self.device_id,
            "api_token": self.api_token,
            "pages": [p.to_dict() for p in self.pages],
        }
        data.update(_serialize_device_settings(self))
        return data

    @staticmethod
    def from_dict(data: Dict[str, Any]) -> "DeviceConfig":
        """Deserialize DeviceConfig with safe defaults and backward compatibility."""
        pages_data = data.get("pages", []) or []
        pages = [PageConfig.from_dict(p) for p in pages_data]

        orientation = _normalize_orientation(data.get("orientation"))
        current_page = _coerce_int(data.get("current_page", 0), 0) or 0
        settings = _deserialize_device_settings(data)

        cfg = DeviceConfig(
            device_id=str(data.get("device_id", data.get("currentLayoutId", ""))),
            api_token=str(data.get("api_token", "")),
            pages=pages,
            current_page=current_page,
            orientation=orientation,
            **settings,
        )
        cfg.ensure_pages()
        return cfg


@dataclass
class DashboardState:
    """
    Root persisted state.

    This is stored in hass.data[DOMAIN]["storage"] and persisted via Store.
    It maps device_ids to DeviceConfig structures.
    """

    devices: Dict[str, DeviceConfig] = field(default_factory=dict)
    last_active_layout_id: Optional[str] = None  # Tracks the last saved/active layout

    def get_or_create_device(self, device_id: str, api_token: str) -> DeviceConfig:
        if device_id not in self.devices:
            self.devices[device_id] = DeviceConfig(
                device_id=device_id,
                api_token=api_token,
            )
            self.devices[device_id].ensure_pages()
        return self.devices[device_id]

    def to_dict(self) -> Dict[str, Any]:
        return {
            "devices": {
                dev_id: dev_cfg.to_dict() for dev_id, dev_cfg in self.devices.items()
            },
            "last_active_layout_id": self.last_active_layout_id,
        }

    @staticmethod
    def from_dict(data: Dict[str, Any]) -> "DashboardState":
        raw_devices = data.get("devices", {}) or {}
        devices: Dict[str, DeviceConfig] = {}
        for dev_id, dev_data in raw_devices.items():
            devices[dev_id] = DeviceConfig.from_dict(dev_data)
        return DashboardState(
            devices=devices,
            last_active_layout_id=data.get("last_active_layout_id"),
        )
