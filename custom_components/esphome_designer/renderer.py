"""
PNG renderer for the ESPHome Designer Designer.

This module renders an 800x480 grayscale PNG based on the stored layout
(DeviceConfig/PageConfig/WidgetConfig) and current Home Assistant states.

Goals:
- Deterministic, E-Ink friendly output for the reTerminal E1001.
- No user-specific logic; everything comes from the stored layout & HA states.
- Keep implementation clear and maintainable; can be extended with more widgets.
"""

from __future__ import annotations

import io
import logging
from typing import Any, Tuple

from PIL import Image, ImageDraw, ImageFont

from homeassistant.core import HomeAssistant, State

from .const import IMAGE_WIDTH, IMAGE_HEIGHT
from .models import DeviceConfig, PageConfig, WidgetConfig

_LOGGER = logging.getLogger(__name__)

# Attempt to load a reasonable default font; HA containers usually have DejaVu.
# Fallback to PIL's default if needed.
try:
    DEFAULT_FONT = ImageFont.truetype("DejaVuSans.ttf", 18)
    DEFAULT_FONT_SMALL = ImageFont.truetype("DejaVuSans.ttf", 14)
    DEFAULT_FONT_LARGE = ImageFont.truetype("DejaVuSans.ttf", 24)
except Exception:  # noqa: BLE001
    DEFAULT_FONT = ImageFont.load_default()
    DEFAULT_FONT_SMALL = ImageFont.load_default()
    DEFAULT_FONT_LARGE = ImageFont.load_default()


def _get_font(size: int | None) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    if not size:
        return DEFAULT_FONT
    try:
        return ImageFont.truetype("DejaVuSans.ttf", size)
    except Exception:  # noqa: BLE001
        return DEFAULT_FONT


def _get_state(hass: HomeAssistant, entity_id: str | None) -> State | None:
    if not entity_id:
        return None
    return hass.states.get(entity_id)


def _draw_text_centered(draw: ImageDraw.ImageDraw, box: Tuple[int, int, int, int], text: str, font) -> None:
    x1, y1, x2, y2 = box
    w, h = draw.textsize(text, font=font)
    x = x1 + (x2 - x1 - w) / 2
    y = y1 + (y2 - y1 - h) / 2
    draw.text((x, y), text, fill=0, font=font)


def _draw_widget_sensor(
    hass: HomeAssistant,
    draw: ImageDraw.ImageDraw,
    w_cfg: WidgetConfig,
) -> None:
    state = _get_state(hass, w_cfg.entity_id)
    x1, y1 = w_cfg.x, w_cfg.y
    x2, y2 = x1 + w_cfg.width, y1 + w_cfg.height

    font_size = int(w_cfg.props.get("font_size", 18))
    font = _get_font(font_size)
    title_font = _get_font(int(w_cfg.props.get("title_font_size", font_size - 2)))

    if state is None:
        label = w_cfg.title or (w_cfg.entity_id or "")
        _draw_text_centered(draw, (x1, y1, x2, y2), f"{label}: n/a", font)
        return

    # Resolve friendly label
    label = w_cfg.title or state.attributes.get("friendly_name") or w_cfg.entity_id or ""
    value = state.state
    unit = state.attributes.get("unit_of_measurement", "")

    # Format value (simple)
    try:
        decimals = int(w_cfg.props.get("decimals", 1))
        fval = float(value)
        value_str = f"{fval:.{decimals}f}"
    except Exception:  # noqa: BLE001
        value_str = value

    # Draw label on top, value larger below
    label_y = y1
    value_y = y1 + (y2 - y1) / 2

    # Label
    if label:
        draw.text((x1 + 4, label_y + 2), str(label), fill=0, font=title_font)

    # Value
    text = f"{value_str}{unit}"
    vw, vh = draw.textsize(text, font=font)
    vx = min(x1 + 4, x2 - vw - 2)
    draw.text((vx, value_y - vh / 2), text, fill=0, font=font)


def _draw_widget_label(
    draw: ImageDraw.ImageDraw,
    w_cfg: WidgetConfig,
) -> None:
    x1, y1 = w_cfg.x, w_cfg.y
    x2, y2 = x1 + w_cfg.width, y1 + w_cfg.height
    text = w_cfg.title or w_cfg.props.get("text", "") or ""
    if not text:
        return
    font = _get_font(int(w_cfg.props.get("font_size", 18)))
    _draw_text_centered(draw, (x1, y1, x2, y2), text, font)


def _draw_widget_clock(
    hass: HomeAssistant,
    draw: ImageDraw.ImageDraw,
    w_cfg: WidgetConfig,
) -> None:
    # Use HA's time, falling back to system if needed.
    now = hass.states.get("sensor.time")  # optional; for simplicity
    x1, y1 = w_cfg.x, w_cfg.y
    x2, y2 = x1 + w_cfg.width, y1 + w_cfg.height

    font_time = _get_font(int(w_cfg.props.get("time_font_size", 28)))
    font_date = _get_font(int(w_cfg.props.get("date_font_size", 16)))

    if now:
        time_str = now.state
    else:
        from datetime import datetime

        time_str = datetime.now().strftime("%H:%M")

    # Date from system since no specific entity is enforced
    from datetime import datetime

    date_str = datetime.now().strftime("%a, %b %d")

    # Time top, date below
    tw, th = draw.textsize(time_str, font=font_time)
    dw, dh = draw.textsize(date_str, font=font_date)

    cx = x1 + (w_cfg.width - tw) / 2
    cy = y1 + (w_cfg.height - (th + dh + 4)) / 2

    draw.text((cx, cy), time_str, fill=0, font=font_time)
    draw.text((x1 + (w_cfg.width - dw) / 2, cy + th + 4), date_str, fill=0, font=font_date)


def _draw_widget_list(
    hass: HomeAssistant,
    draw: ImageDraw.ImageDraw,
    w_cfg: WidgetConfig,
) -> None:
    state = _get_state(hass, w_cfg.entity_id)
    x = w_cfg.x + 4
    y = w_cfg.y + 4
    max_y = w_cfg.y + w_cfg.height - 4

    font = _get_font(int(w_cfg.props.get("font_size", 14)))
    line_height = font.size + 4 if hasattr(font, "size") else 18

    items = []

    if state:
        # If it's a string, split by newline; if list-like, iterate.
        if isinstance(state.state, str):
            # If it looks like CSV or newline separated, split.
            text = state.state.strip()
            if "\n" in text:
                items = [line.strip() for line in text.splitlines() if line.strip()]
            else:
                items = [text]
        elif isinstance(state.state, (list, tuple)):
            items = [str(v) for v in state.state]
    else:
        placeholder = w_cfg.props.get("placeholder", "")
        if placeholder:
            items = [placeholder]

    for i, item in enumerate(items):
        item_y = y + i * line_height
        if item_y + line_height > max_y:
            break
        draw.text((x, item_y), f"- {item}", fill=0, font=font)


def render_page_to_png(
    hass: HomeAssistant,
    device: DeviceConfig,
    page: PageConfig,
) -> bytes:
    """
    Render a single page to PNG bytes.

    - Creates an 800x480 white canvas.
    - Draws each widget based on its type.
    - Returns PNG bytes suitable for direct response to the device.
    """

    # Use dimensions from device config, falling back to defaults
    width = device.width or IMAGE_WIDTH
    height = device.height or IMAGE_HEIGHT

    # Base white canvas, 1-channel (L) for grayscale. E-ink can dither this.
    image = Image.new("L", (width, height), color=255)
    draw = ImageDraw.Draw(image)

    # Optional: draw a subtle border
    draw.rectangle((0, 0, width - 1, height - 1), outline=0)

    for w_cfg in page.widgets:
        # Ensure widget is in bounds
        w_cfg.clamp_to_canvas()

        wtype = (w_cfg.type or "label").lower()

        try:
            if wtype in ("sensor", "sensor_text"):
                _draw_widget_sensor(hass, draw, w_cfg)
            elif wtype in ("label", "text"):
                _draw_widget_label(draw, w_cfg)
            elif wtype == "clock":
                _draw_widget_clock(hass, draw, w_cfg)
            elif wtype == "list":
                _draw_widget_list(hass, draw, w_cfg)
            else:
                _LOGGER.debug("Skipping unknown widget type: %s", wtype)
        except Exception as exc: # noqa: BLE001
            _LOGGER.error(
                "Error rendering widget %s in device %s: %s",
                w_cfg.id,
                device.device_id,
                exc,
            )

    # Export as PNG
    output = io.BytesIO()
    image.save(output, format="PNG", optimize=True)
    return output.getvalue()