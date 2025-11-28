"""
YAML snippet import utilities for the reTerminal Dashboard Designer integration.

This module provides a BEST-EFFORT, SAFE parser that can reconstruct the internal
layout model (DeviceConfig/PageConfig/WidgetConfig) from an ESPHome YAML snippet.

Goals:
- Allow advanced users to:
  - Start from the visual editor.
  - Tweak the generated YAML snippet by hand.
  - Import that snippet back into the editor for further refinement.
- Support "any YAML that roughly follows our snippet pattern":
  - Known `display_page` global.
  - A `display` lambda using `int page = id(display_page);` and `if (page == N) { ... }`.
  - Widget draw calls emitted in a predictable format.

Non-goals:
- Parsing arbitrary, free-form ESPHome configurations.
- Guessing layouts from unrelated code.

Behavior:
- Only parses structures it recognizes.
- If it cannot parse safely, it raises a ValueError with a clear code:
  - "invalid_yaml"
  - "unrecognized_display_structure"
  - "no_pages_found"
- The caller (HTTP API) should return a clear error response to the UI.
"""

from __future__ import annotations

import logging
from dataclasses import dataclass
from typing import Any, Dict, List

import yaml

from .models import DeviceConfig, PageConfig, WidgetConfig

_LOGGER = logging.getLogger(__name__)


# Add custom constructor for ESPHome YAML tags like !lambda, !secret, etc.
def _esphome_tag_constructor(loader, tag_suffix, node):
    """Handle ESPHome custom tags by returning the value as-is."""
    if isinstance(node, yaml.ScalarNode):
        return loader.construct_scalar(node)
    elif isinstance(node, yaml.SequenceNode):
        return loader.construct_sequence(node)
    elif isinstance(node, yaml.MappingNode):
        return loader.construct_mapping(node)
    return None


# Register multi-constructor for all ESPHome tags
yaml.SafeLoader.add_multi_constructor('!', _esphome_tag_constructor)


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


@dataclass
class ParsedPage:
    """Intermediate structure for a page."""
    widgets: List[ParsedWidget]
    name: str | None = None


def yaml_to_layout(snippet: str) -> DeviceConfig:
    """
    Parse a snippet of ESPHome YAML and reconstruct a DeviceConfig.

    Expected pattern:
    - globals: display_page (optional but recommended)
    - display:
        - platform: waveshare_epaper (or similar)
        - id: epaper_display
        - lambda: |-
            int page = id(display_page);
            if (page == 0) { ... }
            if (page == 1) { ... }

    Inside each page block we look for lines in one of our known forms, for example:
    - // widget:label id:w_xxx
      it.printf(x, y, id(font_normal), "Text");
    - // widget:sensor id:w_xxx ent:sensor.entity_id
      it.printf(x, y, id(font_small), "Label: %s", id(some_id).state.c_str());

    If the snippet deviates too far from this pattern, we fail clearly.
    """
    try:
        data = yaml.safe_load(snippet) or {}
    except Exception as exc:  # noqa: BLE001
        raise ValueError("invalid_yaml") from exc

    display_block = _find_display_block(data)
    if not display_block:
        raise ValueError("unrecognized_display_structure")

    lambda_src = display_block.get("lambda")
    if not isinstance(lambda_src, str):
        raise ValueError("unrecognized_display_structure")

    # Normalize lambda lines
    lambda_lines = [line.rstrip("\n") for line in lambda_src.split("\n")]
    pages = _parse_pages_from_lambda(lambda_lines)

    # Allow empty pages - we found page blocks even if they have no widgets
    # But if we found NO page blocks at all, that's an error
    if pages is None:
        raise ValueError("no_pages_found")

    # Extract global settings
    orientation = "landscape"
    model = "7.50inv2"
    dark_mode = False
    
    # Check display platform for model
    display_conf = data.get("display", [])
    if isinstance(display_conf, list):
        for d in display_conf:
            if d.get("platform") == "waveshare_epaper":
                model = str(d.get("model", "7.50inv2"))
                break

    # We don't have explicit orientation/dark_mode in YAML usually, 
    # but we can infer or default.
    
    device = DeviceConfig(
        device_id="imported_device",
        api_token="imported_token",
        name="reTerminal E1001", # Default name for imported devices
        pages=[], # Pages will be populated below
        current_page=0, # Default current page
        orientation=orientation,
        model=model,
        dark_mode=dark_mode
    )

    # Convert parsed pages to PageConfig/WidgetConfig
    sorted_page_nums = sorted(pages.keys())
    for page_num in sorted_page_nums:
        parsed_page = pages[page_num]
        widget_list = parsed_page.widgets
        page_widgets: List[WidgetConfig] = []
        
        for pw in widget_list:
            # Map ParsedWidget to WidgetConfig props
            props = {}
            
            # Text properties
            if pw.text is not None: props["text"] = pw.text
            if pw.font_family is not None: props["font_family"] = pw.font_family
            if pw.font_size is not None: props["font_size"] = pw.font_size
            if pw.font_weight is not None: props["font_weight"] = pw.font_weight
            if pw.font_style is not None: props["font_style"] = pw.font_style
            
            # Sensor properties
            if pw.label_font_size is not None: props["label_font_size"] = pw.label_font_size
            if pw.value_font_size is not None: props["value_font_size"] = pw.value_font_size
            if pw.value_format is not None: props["format"] = pw.value_format
            if pw.value_format is not None: props["value_format"] = pw.value_format # Ensure both keys work
            if pw.text_align is not None: props["text_align"] = pw.text_align
            if pw.label_align is not None: props["label_align"] = pw.label_align
            if pw.value_align is not None: props["value_align"] = pw.value_align
            
            # Common properties
            if pw.color is not None: props["color"] = pw.color
            
            # Shape properties
            if pw.fill is not None: props["fill"] = pw.fill
            if pw.opacity is not None: props["opacity"] = pw.opacity
            if pw.border_width is not None: props["border_width"] = pw.border_width
            if pw.stroke_width is not None: props["stroke_width"] = pw.stroke_width
            
            # Icon/Battery properties
            if pw.size is not None: props["size"] = pw.size
            if pw.code is not None: props["code"] = pw.code
            
            # Progress bar properties
            if pw.bar_height is not None: props["bar_height"] = pw.bar_height
            if pw.show_label is not None: props["show_label"] = pw.show_label
            if pw.show_percentage is not None: props["show_percentage"] = pw.show_percentage
            
            # Datetime properties
            if pw.time_font_size is not None: props["time_font_size"] = pw.time_font_size
            if pw.date_font_size is not None: props["date_font_size"] = pw.date_font_size
            if pw.format is not None: props["format"] = pw.format
            
            # Image/Graph properties
            if pw.path is not None: props["path"] = pw.path
            if pw.invert is not None: props["invert"] = pw.invert
            if pw.url is not None: props["url"] = pw.url
            
            # Local sensor flag
            if pw.is_local_sensor: props["is_local_sensor"] = True
            if pw.is_text_sensor: props["is_text_sensor"] = True
            
            # Graph properties
            # Graph properties
            if pw.continuous is not None: props["continuous"] = pw.continuous
            if pw.duration is not None: props["duration"] = pw.duration
            if pw.min_value is not None: props["min_value"] = pw.min_value
            if pw.max_value is not None: props["max_value"] = pw.max_value
            if pw.min_range is not None: props["min_range"] = pw.min_range
            if pw.max_range is not None: props["max_range"] = pw.max_range
            if pw.x_grid is not None: props["x_grid"] = pw.x_grid
            if pw.y_grid is not None: props["y_grid"] = pw.y_grid
            if pw.line_type is not None: props["line_type"] = pw.line_type
            if pw.line_thickness is not None: props["line_thickness"] = pw.line_thickness
            if pw.show_axis_labels: props["show_axis_labels"] = True
            
            # Conditional visibility properties
            if pw.condition_entity is not None:
                wc.condition_entity = pw.condition_entity
            if pw.condition_operator is not None:
                wc.condition_operator = pw.condition_operator
            if pw.condition_state is not None:
                wc.condition_state = pw.condition_state
            if pw.condition_min is not None:
                wc.condition_min = pw.condition_min
            if pw.condition_max is not None:
                wc.condition_max = pw.condition_max
            if pw.condition_logic is not None:
                wc.condition_logic = pw.condition_logic

            # Handle special cases for text/icon size mapping if needed
            if pw.type == "text" and "font_size" not in props and "size" in props:
                props["font_size"] = props["size"]
            if pw.type == "icon" and "size" not in props and "font_size" in props:
                props["size"] = props["font_size"]
            if pw.type == "puppet" and "url" in props:
                props["image_url"] = props["url"]

            wc = WidgetConfig(
                id=pw.id,
                type=pw.type,
                x=pw.x,
                y=pw.y,
                width=pw.width,
                height=pw.height,
                title=pw.title,
                entity_id=pw.entity_id,
                props=props
            )
            page_widgets.append(wc)

        page_conf = PageConfig(
            id=f"page_{page_num}",
            name=parsed_page.name or f"Page {page_num + 1}",
            widgets=page_widgets
        )
        device.pages.append(page_conf)

    return device


def _find_display_block(data: Any) -> Dict[str, Any] | None:
    """
    Locate the 'display:' block with an epaper_display and lambda.
    We accept both:
    - display:
        - platform: waveshare_epaper
          id: epaper_display
          lambda: |-
            ...
    
    Fallback: If no block with id 'epaper_display' is found, return the first
    block that has a 'lambda' property.
    """
    if not isinstance(data, dict):
        return None

    display = data.get("display")
    candidate = None

    if isinstance(display, list):
        for block in display:
            if not isinstance(block, dict):
                continue
            if "lambda" in block:
                # Prefer the one with the correct ID
                if block.get("id") == "epaper_display":
                    return block
                # Keep as candidate if we don't find the exact match
                if candidate is None:
                    candidate = block

    elif isinstance(display, dict):
        if "lambda" in display:
            if display.get("id") == "epaper_display":
                return display
            candidate = display

    return candidate


def _parse_pages_from_lambda(lines: List[str]) -> Dict[int, ParsedPage]:
    """
    Extract pages and widgets from the lambda body.

    Strategy:
    - Find 'int page = id(display_page);'
    - For each 'if (page == N) {' block:
      - Collect lines until matching '}'
      - Inside, look for:
        - widget markers in comments, OR
        - recognizable it.printf patterns.
    - If markers are absent, we still try to parse simple patterns safely.

    We use conservative defaults for width/height when not encoded:
    - width: 200
    - height: 60
    """
    pages: Dict[int, ParsedPage] = {}
    current_page: int | None = None
    brace_depth = 0

    for raw_line in lines:
        line = raw_line.strip()

        # Track page blocks - handle both patterns:
        # 1) if (page == 0) {
        # 2) if (id(display_page) == 0) {
        page_match = None
        if line.startswith("if (page ==") and "{" in line:
            # Pattern 1: if (page == 0) {
            try:
                num_str = line.split("==")[1].split(")")[0].strip()
                page_match = int(num_str)
            except Exception:  # noqa: BLE001
                pass
        elif line.startswith("if (id(display_page)") and "==" in line and "{" in line:
            # Pattern 2: if (id(display_page) == 0) {
            try:
                num_str = line.split("==")[1].split(")")[0].strip()
                page_match = int(num_str)
            except Exception:  # noqa: BLE001
                pass
        
        if page_match is not None:
            current_page = page_match
            if current_page not in pages:
                pages[current_page] = ParsedPage(widgets=[])
            brace_depth = 1
            continue

        if current_page is not None:
            # Adjust brace depth to detect block end
            open_count = line.count("{")
            close_count = line.count("}")
            brace_depth += open_count - close_count
            if brace_depth <= 0:
                current_page = None
                brace_depth = 0
                continue

            # Inside page block: look for our widget hints or patterns
            
            # Check for page name comment: // page:name "My Page"
            if "// page:name" in line:
                try:
                    # Extract content between quotes
                    parts = line.split('"', 2)
                    if len(parts) >= 2:
                        pages[current_page].name = parts[1]
                except Exception:
                    pass

            pw = _parse_widget_line(line)
            if pw:
                pages[current_page].widgets.append(pw)

    return pages


def _parse_widget_line(line: str) -> ParsedWidget | None:
    """
    Parse a single line into a ParsedWidget when possible.

    Supported patterns (best-effort):

    1) Explicit marker comments (strongly recommended in generator):

       // widget:label id:w_x type:label x:10 y:20 w:200 h:40 text:Title
       // widget:sensor id:w_y type:sensor x:10 y:20 w:200 h:40 ent:sensor.entity

    2) Simple it.printf fallback (less precise):

       it.printf(10, 20, id(font_normal), "Text");

    If we cannot confidently parse, return None.
    """
    # Pattern 1: comment-based markers
    if line.startswith("// widget:"):
        # Example:
        # // widget:label id:w_x type:label x:10 y:20 w:200 h:40 text:Title
        # // widget:icon id:w_x type:icon x:10 y:20 w:60 h:60 code:F0595
        # // widget:sensor_text id:w_x type:sensor_text x:10 y:20 w:200 h:60 ent:sensor.entity title:"Label"
        # CRITICAL: Do NOT use replace("//", "") as it breaks URLs (http:// -> http:)
        parts = line[len("// widget:"):].strip().split()
        # Re-insert the type which was part of the marker we just stripped, or rely on type: key
        # The original code expected parts[0] to be 'widget:type', but we stripped it.
        # Let's adjust to robustly handle the parts.
        # Actually, the original code did: line.replace("//", "").strip().split()
        # which resulted in "widget:label id:..."
        # So parts[0] was "widget:label".
        
        # Let's do it safely:
        clean_line = line.strip()
        if clean_line.startswith("//"):
            clean_line = clean_line[2:].strip()
        parts = clean_line.split()
        meta: Dict[str, str] = {}
        
        # Handle quoted values (e.g., title:"My Label")
        i = 1
        while i < len(parts):
            part = parts[i]
            if ":" in part:
                key, val = part.split(":", 1)
                key = key.strip()
                # Check if value is quoted and spans multiple parts
                if val.startswith('"'):
                    if val.endswith('"') and len(val) > 1:
                        # Complete quoted value in one part
                        meta[key] = val.strip('"')
                    else:
                        # Quote spans multiple parts
                        quote_parts = [val.lstrip('"')]
                        i += 1
                        while i < len(parts):
                            if parts[i].endswith('"'):
                                quote_parts.append(parts[i].rstrip('"'))
                                break
                            quote_parts.append(parts[i])
                            i += 1
                        meta[key] = " ".join(quote_parts)
                else:
                    meta[key] = val.strip()
            i += 1

        # ============================================================================
        # CRITICAL: Widget coordinate and dimension parsing
        # DO NOT CHANGE: These extract x, y, width, height from YAML marker comments
        # These values MUST be preserved exactly as generated to maintain widget positions
        # ============================================================================
        wtype = meta.get("type") or parts[0].split(":")[1]
        wid = meta.get("id", f"w_{abs(hash(line)) % 99999}")
        x = int(meta.get("x", "40"))
        y = int(meta.get("y", "40"))
        w = int(meta.get("w", "200"))
        h = int(meta.get("h", "60"))
        ent = meta.get("ent") or meta.get("entity")  # Support both ent: and entity:
        text = meta.get("text")
        code = meta.get("code")
        title = meta.get("title") or meta.get("label")  # Support both title: and label:
        url = meta.get("url")
        path = meta.get("path")
        format_val = meta.get("format")
        invert_val = meta.get("invert", "false").lower() in ("true", "1", "yes")
        
        # ============================================================================
        # CRITICAL: Widget property extraction from markers
        # DO NOT CHANGE: These preserve widget styling (color, size, opacity, etc.)
        # ============================================================================
        font_family = meta.get("font_family") or meta.get("font")
        font_style = meta.get("font_style")
        color = meta.get("color")
        
        # Parse integer properties with fallback
        def parse_int(val: str | None) -> int | None:
            if val:
                try:
                    return int(val)
                except ValueError:
                    pass
            return None
        
        def parse_float(val: str | None) -> float | None:
            if val:
                try:
                    return float(val)
                except ValueError:
                    pass
            return None
        
        # Parse boolean properties
        def parse_bool(val: str | None) -> bool | None:
            if val is None:
                return None
            return val.lower() in ("true", "1", "yes")
        
        font_size = parse_int(meta.get("font_size")) or parse_int(meta.get("size"))
        font_weight = parse_int(meta.get("font_weight")) or parse_int(meta.get("weight"))
        label_font_size = parse_int(meta.get("label_font_size")) or parse_int(meta.get("label_font"))
        value_font_size = parse_int(meta.get("value_font_size")) or parse_int(meta.get("value_font"))
        size = parse_int(meta.get("size"))
        opacity = parse_int(meta.get("opacity"))
        border_width = parse_int(meta.get("border_width")) or parse_int(meta.get("border"))
        stroke_width = parse_int(meta.get("stroke_width")) or parse_int(meta.get("stroke"))
        bar_height = parse_int(meta.get("bar_height"))
        time_font_size = parse_int(meta.get("time_font"))
        date_font_size = parse_int(meta.get("date_font"))
        
        text_align = meta.get("align") or meta.get("text_align")
        label_align = meta.get("label_align")
        value_align = meta.get("value_align")
        
        fill = parse_bool(meta.get("fill"))
        show_label = parse_bool(meta.get("show_label"))
        show_percentage = parse_bool(meta.get("show_percentage")) or parse_bool(meta.get("show_pct"))
        is_local_sensor = parse_bool(meta.get("local"))
        is_text_sensor = parse_bool(meta.get("text_sensor"))
        continuous = parse_bool(meta.get("continuous"))
        if continuous is None:
            continuous = True

        # Graph properties
        duration = meta.get("duration")
        min_value = meta.get("min_value")
        max_value = meta.get("max_value")
        min_range = meta.get("min_range")
        max_range = meta.get("max_range")
        x_grid = meta.get("x_grid")
        y_grid = meta.get("y_grid")
        line_type = meta.get("line_type")
        line_thickness = parse_int(meta.get("line_thickness"))
        show_axis_labels = parse_bool(meta.get("show_axis_labels")) or False

        # Conditional visibility parsing
        condition_entity = meta.get("condition_entity")
        condition_operator = meta.get("condition_operator")
        condition_state = meta.get("condition_state")
        condition_min = parse_float(meta.get("condition_min"))
        condition_max = parse_float(meta.get("condition_max"))
        condition_logic = meta.get("condition_logic")

        return ParsedWidget(
            id=wid,
            type=wtype,
            x=x,
            y=y,
            width=w,
            height=h,
            title=title or text or None,
            entity_id=ent or None,
            text=text or None,
            code=code or None,
            url=url or None,
            path=path or None,
            format=format_val or None,
            invert=invert_val,
            font_family=font_family,
            font_size=font_size,
            font_style=font_style,
            font_weight=font_weight,
            label_font_size=label_font_size,
            value_font_size=value_font_size,
            value_format=format_val or None,
            text_align=text_align,
            label_align=label_align,
            value_align=value_align,
            color=color,
            fill=fill,
            opacity=opacity,
            border_width=border_width,
            stroke_width=stroke_width,
            size=size,
            bar_height=bar_height,
            show_label=show_label,
            show_percentage=show_percentage,
            time_font_size=time_font_size,
            date_font_size=date_font_size,
            is_local_sensor=is_local_sensor or False,
            is_text_sensor=is_text_sensor or False,
            continuous=continuous,
            duration=duration,
            min_value=min_value,
            max_value=max_value,
            min_range=min_range,
            max_range=max_range,
            x_grid=x_grid,
            y_grid=y_grid,
            line_type=line_type,
            line_thickness=line_thickness,
            show_axis_labels=show_axis_labels,
            condition_entity=condition_entity,
            condition_operator=condition_operator,
            condition_state=condition_state,
            condition_min=condition_min,
            condition_max=condition_max,
            condition_logic=condition_logic,
        )

    # Pattern 2: simple printf (VERY conservative)
    if line.startswith("it.printf(") and ")" in line:
        # it.printf(x, y, id(font), "Text");
        try:
            args_str = line[len("it.printf(") :].split(")")[0]
            args = [a.strip() for a in args_str.split(",")]
            if len(args) >= 4:
                x = int(args[0])
                y = int(args[1])
                raw_text = args[3].strip()
                if raw_text.startswith('"') and raw_text.endswith('"'):
                    text = raw_text.strip('"')
                else:
                    text = None
                return ParsedWidget(
                    id=f"w_{abs(hash(line)) % 99999}",
                    type="label",
                    x=x,
                    y=y,
                    width=200,
                    height=40,
                    title=text or None,
                    text=text,
                )
        except Exception:  # noqa: BLE001
            return None

    return None