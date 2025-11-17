"""
Models for the reTerminal Dashboard Designer integration.

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

    # Arbitrary widget-specific properties; see type doc above.
    props: Dict[str, Any] = field(default_factory=dict)

    def clamp_to_canvas(self) -> None:
        """Ensure widget stays within the logical canvas bounds.

        NOTE:
        - IMAGE_WIDTH/IMAGE_HEIGHT represent the "landscape" 800x480 space.
        - For portrait orientation, the editor and generator interpret coordinates
          consistently so we still clamp against these logical limits.
        - This preserves backward compatibility for existing layouts.
        """
        if self.x < 0:
            self.x = 0
        if self.y < 0:
            self.y = 0

        if self.width <= 0:
            self.width = 10
        if self.height <= 0:
            self.height = 10

        if self.x + self.width > IMAGE_WIDTH:
            self.width = max(10, IMAGE_WIDTH - self.x)

        if self.y + self.height > IMAGE_HEIGHT:
            self.height = max(10, IMAGE_HEIGHT - self.y)


@dataclass
class PageConfig:
    """Configuration for a single dashboard page."""

    id: str
    name: str
    widgets: List[WidgetConfig] = field(default_factory=list)
    # Optional per-page refresh interval (seconds).
    # If None, the global default is used in the generated YAML snippet.
    refresh_s: Optional[int] = None

    def to_dict(self) -> Dict[str, Any]:
        data: Dict[str, Any] = {
            "id": self.id,
            "name": self.name,
            "widgets": [asdict(w) for w in self.widgets],
        }
        if self.refresh_s is not None:
            data["refresh_s"] = self.refresh_s
        return data

    @staticmethod
    def from_dict(data: Dict[str, Any]) -> "PageConfig":
        widgets_data = data.get("widgets", []) or []
        widgets: List[WidgetConfig] = []
        for w in widgets_data:
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

        return PageConfig(
            id=str(data.get("id", "page_0")),
            name=str(data.get("name", "Page")),
            widgets=widgets,
            refresh_s=refresh_s,
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
    pages: List[PageConfig] = field(default_factory=list)
    current_page: int = 0

    # Layout-wide settings
    orientation: str = "landscape"
    dark_mode: bool = False

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
            "dark_mode": self.dark_mode,
            "pages": [p.to_dict() for p in self.pages],
        }

    @staticmethod
    def from_dict(data: Dict[str, Any]) -> "DeviceConfig":
        """Deserialize DeviceConfig with safe defaults and backward compatibility."""
        pages_data = data.get("pages", []) or []
        pages = [PageConfig.from_dict(p) for p in pages_data]

        # Legacy configs may not have orientation/dark_mode; default them.
        orientation = str(data.get("orientation", "landscape")).lower()
        if orientation not in ("landscape", "portrait"):
            orientation = "landscape"

        dark_mode_raw = data.get("dark_mode", False)
        dark_mode = bool(dark_mode_raw)

        try:
            current_page = int(data.get("current_page", 0))
        except (TypeError, ValueError):
            current_page = 0

        cfg = DeviceConfig(
            device_id=str(data.get("device_id", "")),
            api_token=str(data.get("api_token", "")),
            name=str(data.get("name", "reTerminal")),
            pages=pages,
            current_page=current_page,
            orientation=orientation,
            dark_mode=dark_mode,
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
            }
        }

    @staticmethod
    def from_dict(data: Dict[str, Any]) -> "DashboardState":
        raw_devices = data.get("devices", {}) or {}
        devices: Dict[str, DeviceConfig] = {}
        for dev_id, dev_data in raw_devices.items():
            devices[dev_id] = DeviceConfig.from_dict(dev_data)
        return DashboardState(devices=devices)