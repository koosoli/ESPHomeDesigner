from __future__ import annotations
from dataclasses import dataclass
from typing import List

@dataclass
class ParsedWidget:
    """Intermediate structure extracted from lambda lines."""
    # Required fields (no defaults)
    id: str
    type: str
    x: int
    y: int
    width: int
    height: int
    # Optional fields (with defaults)
    title: str | None = None
    entity_id: str | None = None
    text: str | None = None
    code: str | None = None
    url: str | None = None
    path: str | None = None
    format: str | None = None
    invert: bool = False
    # Text widget properties
    font_family: str | None = None
    font_size: int | None = None
    font_style: str | None = None
    font_weight: int | None = None
    italic: bool = False
    # Sensor text properties
    label_font_size: int | None = None
    value_font_size: int | None = None
    value_format: str | None = None
    text_align: str | None = None
    label_align: str | None = None
    value_align: str | None = None
    # Common properties
    color: str | None = None
    # Shape properties
    fill: bool | None = None
    opacity: int | None = None
    border_width: int | None = None
    stroke_width: int | None = None
    # Rounded rect specific properties
    radius: int | None = None
    show_border: bool | None = None
    # Icon/Battery properties
    size: int | None = None
    # Progress bar properties
    bar_height: int | None = None
    show_label: bool | None = None
    show_percentage: bool | None = None
    # Datetime properties
    time_font_size: int | None = None
    date_font_size: int | None = None
    # Local sensor flag
    is_local_sensor: bool = False
    is_text_sensor: bool = False
    # Graph properties
    continuous: bool = True
    duration: str | None = None
    min_value: str | None = None
    max_value: str | None = None
    min_range: str | None = None
    max_range: str | None = None
    x_grid: str | None = None
    y_grid: str | None = None
    line_type: str | None = None
    line_thickness: int | None = None
    show_axis_labels: bool = False
    # Conditional visibility properties
    condition_entity: str | None = None
    condition_operator: str | None = None
    condition_state: str | None = None
    condition_min: float | None = None
    condition_max: float | None = None
    condition_logic: str | None = None
    # Quote/RSS widget properties
    feed_url: str | None = None
    show_author: bool = True
    quote_font_size: int | None = None
    author_font_size: int | None = None
    refresh_interval: str | None = None
    random_quote: bool = True
    word_wrap: bool = True
    italic_quote: bool = True

@dataclass
class ParsedPage:
    """Intermediate structure for a page."""
    widgets: List[ParsedWidget]
    name: str | None = None
