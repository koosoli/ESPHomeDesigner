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
from typing import Any, Dict, List, Optional

from .const import DEFAULT_PAGES, IMAGE_WIDTH, IMAGE_HEIGHT


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

    def to_dict(self) -> Dict[str, Any]:
        data: Dict[str, Any] = {
            "id": self.id,
            "name": self.name,
            "widgets": [asdict(w) for w in self.widgets],
        }
        if self.refresh_s is not None:
            data["refresh_s"] = self.refresh_s
        if self.dark_mode is not None:
            data["dark_mode"] = self.dark_mode
        return data

    @staticmethod
    def from_dict(data: Dict[str, Any]) -> "PageConfig":
        widgets_data = data.get("widgets", []) or []
        widgets: List[WidgetConfig] = []
        for w in widgets_data:
            # Parse min/max safely
            c_min = w.get("condition_min")
            c_max = w.get("condition_max")
            try:
                c_min = float(c_min) if c_min is not None and c_min != "" else None
            except (ValueError, TypeError):
                c_min = None
            try:
                c_max = float(c_max) if c_max is not None and c_max != "" else None
            except (ValueError, TypeError):
                c_max = None

            widget = WidgetConfig(
                id=str(w.get("id", "")),
                type=str(w.get("type", "label")),
                x=int(w.get("x", 0)),
                y=int(w.get("y", 0)),
                width=int(w.get("width", 100)),
                height=int(w.get("height", 40)),
                entity_id=w.get("entity_id"),
                title=w.get("title"),
                icon=w.get("icon"),
                condition_entity=w.get("condition_entity"),
                condition_state=w.get("condition_state"),
                condition_operator=w.get("condition_operator"),
                condition_min=c_min,
                condition_max=c_max,
                condition_logic=w.get("condition_logic"),
                props=w.get("props") or {},
            )
            widget.clamp_to_canvas()
            widgets.append(widget)

        refresh_raw = data.get("refresh_s")
        refresh_s: Optional[int]
        try:
            refresh_s = int(refresh_raw) if refresh_raw is not None else None
            if refresh_s is not None and refresh_s <= 0:
                refresh_s = None
        except (TypeError, ValueError):
            refresh_s = None

        # Parse per-page dark mode setting
        dark_mode_raw = data.get("dark_mode")
        dark_mode: Optional[str] = None
        if dark_mode_raw is not None and dark_mode_raw in ("inherit", "light", "dark"):
            dark_mode = str(dark_mode_raw)

        return PageConfig(
            id=str(data.get("id", "page_0")),
            name=str(data.get("name", "Page")),
            widgets=widgets,
            refresh_s=refresh_s,
            dark_mode=dark_mode,
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
        return {
            "device_id": self.device_id,
            "api_token": self.api_token,
            "name": self.name,
            "current_page": self.current_page,
            "orientation": self.orientation,
            "device_model": self.device_model,
            "model": self.model,
            "dark_mode": self.dark_mode,
            "sleep_enabled": self.sleep_enabled,
            "sleep_start_hour": self.sleep_start_hour,
            "sleep_end_hour": self.sleep_end_hour,
            "deep_sleep_enabled": self.deep_sleep_enabled,
            "deep_sleep_interval": self.deep_sleep_interval,
            "manual_refresh_only": self.manual_refresh_only,
            "no_refresh_start_hour": self.no_refresh_start_hour,
            "no_refresh_end_hour": self.no_refresh_end_hour,
            "daily_refresh_enabled": self.daily_refresh_enabled,
            "daily_refresh_time": self.daily_refresh_time,
            "rendering_mode": self.rendering_mode,
            "extended_latin_glyphs": self.extended_latin_glyphs,
            "lcd_eco_strategy": self.lcd_eco_strategy,
            "oepl_entity_id": self.oepl_entity_id,
            "oepl_dither": self.oepl_dither,
            "auto_cycle_enabled": self.auto_cycle_enabled,
            "auto_cycle_interval_s": self.auto_cycle_interval_s,
            "refresh_interval": self.refresh_interval,
            "inverted_colors": self.inverted_colors,
            "width": self.width,
            "height": self.height,
            "shape": self.shape,
            "custom_hardware": self.custom_hardware,
            "protocol_hardware": self.protocol_hardware,
            "glyphsets": self.glyphsets,
            "pages": [p.to_dict() for p in self.pages],
        }

    @staticmethod
    def from_dict(data: Dict[str, Any]) -> "DeviceConfig":
        """Deserialize DeviceConfig with safe defaults and backward compatibility."""
        pages_data = data.get("pages", []) or []
        pages = [PageConfig.from_dict(p) for p in pages_data]

        # Helper to prioritize camelCase (frontend) over snake_case (storage)
        def get_v(snake, camel, default):
            return data.get(camel, data.get(snake, default))

        def get_i(snake, camel, default):
            val = get_v(snake, camel, default)
            try:
                if val is None or val == "":
                    return default
                return int(val)
            except (TypeError, ValueError):
                return default

        def get_d(snake, camel, default_factory):
            val = get_v(snake, camel, None)
            if val is None or not isinstance(val, dict):
                return default_factory()
            return val

        # Legacy configs may not have orientation/dark_mode; default them.
        orientation = str(data.get("orientation", "landscape")).lower()
        if orientation not in ("landscape", "portrait"):
            orientation = "landscape"

        try:
            current_page = int(data.get("current_page", 0))
        except (TypeError, ValueError):
            current_page = 0

        cfg = DeviceConfig(
            device_id=str(data.get("device_id", data.get("currentLayoutId", ""))),
            api_token=str(data.get("api_token", "")),
            name=str(get_v("name", "deviceName", "reTerminal")),
            pages=pages,
            current_page=current_page,
            orientation=orientation,
            device_model=str(get_v("device_model", "deviceModel", "reterminal_e1001")),
            model=str(data.get("model", "7.50inv2")),
            dark_mode=bool(get_v("dark_mode", "darkMode", False)),
            sleep_enabled=bool(get_v("sleep_enabled", "sleepEnabled", False)),
            sleep_start_hour=get_i("sleep_start_hour", "sleepStartHour", 0),
            sleep_end_hour=get_i("sleep_end_hour", "sleepEndHour", 5),
            deep_sleep_enabled=bool(get_v("deep_sleep_enabled", "deepSleepEnabled", False)),
            deep_sleep_interval=get_i("deep_sleep_interval", "deepSleepInterval", 600),
            manual_refresh_only=bool(get_v("manual_refresh_only", "manualRefreshOnly", False)),
            no_refresh_start_hour=get_i("no_refresh_start_hour", "noRefreshStartHour", None),
            no_refresh_end_hour=get_i("no_refresh_end_hour", "noRefreshEndHour", None),
            daily_refresh_enabled=bool(get_v("daily_refresh_enabled", "dailyRefreshEnabled", False)),
            daily_refresh_time=str(get_v("daily_refresh_time", "dailyRefreshTime", "08:00")),
            rendering_mode=str(get_v("rendering_mode", "renderingMode", "direct")),
            extended_latin_glyphs=bool(get_v("extended_latin_glyphs", "extendedLatinGlyphs", False)),
            lcd_eco_strategy=str(get_v("lcd_eco_strategy", "lcdEcoStrategy", "backlight_off")),
            oepl_entity_id=str(get_v("oepl_entity_id", "oeplEntityId", "")),
            oepl_dither=get_i("oepl_dither", "oeplDither", 2),
            auto_cycle_enabled=bool(get_v("auto_cycle_enabled", "autoCycleEnabled", False)),
            auto_cycle_interval_s=get_i("auto_cycle_interval_s", "autoCycleIntervalS", 30),
            refresh_interval=get_i("refresh_interval", "refreshInterval", 600),
            inverted_colors=bool(get_v("inverted_colors", "invertedColors", False)),
            width=get_i("width", "resWidth", 800),
            height=get_i("height", "resHeight", 480),
            shape=str(get_v("shape", "shape", "rect")),
            custom_hardware=get_d("custom_hardware", "customHardware", dict),
            protocol_hardware=get_d("protocol_hardware", "protocolHardware", dict),
            glyphsets=get_v("glyphsets", "glyphsets", ["GF_Latin_Kernel"]),
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