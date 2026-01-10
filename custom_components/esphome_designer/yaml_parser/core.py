from __future__ import annotations
import logging
import yaml
from typing import Any, Dict, List

from ..models import DeviceConfig, PageConfig, WidgetConfig
from .models import ParsedWidget, ParsedPage
from .widget_parsers import parse_widget_line

_LOGGER = logging.getLogger(__name__)

def yaml_to_layout(snippet: str) -> DeviceConfig:
    """Parse a snippet of ESPHome YAML and reconstruct a DeviceConfig."""
    try:
        # Register custom constructor for ESPHome tags
        def _esphome_tag_constructor(loader, tag_suffix, node):
            if isinstance(node, yaml.ScalarNode): return loader.construct_scalar(node)
            if isinstance(node, yaml.SequenceNode): return loader.construct_sequence(node)
            if isinstance(node, yaml.MappingNode): return loader.construct_mapping(node)
            return None
        yaml.SafeLoader.add_multi_constructor('!', _esphome_tag_constructor)
        
        data = yaml.safe_load(snippet) or {}
    except Exception as exc:
        raise ValueError("invalid_yaml") from exc

    display_block = _find_display_block(data)
    if not display_block:
        raise ValueError("unrecognized_display_structure")

    lambda_src = display_block.get("lambda")
    if not isinstance(lambda_src, str):
        raise ValueError("unrecognized_display_structure")

    lambda_lines = [line.rstrip("\n") for line in lambda_src.split("\n")]
    pages = _parse_pages_from_lambda(lambda_lines)

    if pages is None:
        raise ValueError("no_pages_found")

    # Metadata extraction
    orientation = "landscape"
    model = "7.50inv2"
    device_model = "reterminal_e1001"
    
    display_conf = data.get("display", [])
    if isinstance(display_conf, list):
        for d in display_conf:
            platform = d.get("platform", "")
            if platform == "waveshare_epaper":
                model = str(d.get("model", "7.50inv2"))
                device_model = "reterminal_e1001"
                break
            elif platform == "epaper_spi":
                model = str(d.get("model", "Seeed-reTerminal-E1002"))
                device_model = "reterminal_e1002"
                break

    device = DeviceConfig(
        device_id="imported_device",
        api_token="imported_token",
        name="reTerminal E1001" if device_model == "reterminal_e1001" else "reTerminal E1002",
        pages=[],
        current_page=0,
        orientation=orientation,
        model=model,
        device_model=device_model,
        dark_mode=False
    )

    # Convert intermediate models to final PageConfig/WidgetConfig
    sorted_page_nums = sorted(pages.keys())
    for page_num in sorted_page_nums:
        parsed_page = pages[page_num]
        page_widgets: List[WidgetConfig] = []
        
        for pw in parsed_page.widgets:
            props = _map_parsed_widget_to_props(pw)
            wc = WidgetConfig(
                id=pw.id, type=pw.type, x=pw.x, y=pw.y,
                width=pw.width, height=pw.height,
                title=pw.title, entity_id=pw.entity_id,
                props=props
            )
            
            # Conditional visibility
            if pw.condition_entity: wc.condition_entity = pw.condition_entity
            if pw.condition_operator: wc.condition_operator = pw.condition_operator
            if pw.condition_state: wc.condition_state = pw.condition_state
            if pw.condition_min is not None: wc.condition_min = pw.condition_min
            if pw.condition_max is not None: wc.condition_max = pw.condition_max
            if pw.condition_logic: wc.condition_logic = pw.condition_logic
                
            page_widgets.append(wc)

        device.pages.append(PageConfig(
            id=f"page_{page_num}",
            name=parsed_page.name or f"Page {page_num + 1}",
            widgets=page_widgets
        ))

    return device

def _map_parsed_widget_to_props(pw: ParsedWidget) -> Dict[str, Any]:
    """Extracted mapping logic from ParsedWidget to WidgetConfig props."""
    props = {}
    
    # Generic property collection
    fields = [
        "text", "font_family", "font_size", "font_weight", "font_style", "italic",
        "label_font_size", "value_font_size", "value_format", "text_align", "label_align", "value_align",
        "color", "fill", "opacity", "border_width", "stroke_width", "radius", "show_border",
        "size", "code", "bar_height", "show_label", "show_percentage",
        "time_font_size", "date_font_size", "format", "path", "invert", "url",
        "is_local_sensor", "is_text_sensor", "continuous", "duration", "min_value", "max_value",
        "min_range", "max_range", "x_grid", "y_grid", "line_type", "line_thickness", "show_axis_labels",
        "feed_url", "show_author", "quote_font_size", "author_font_size", "refresh_interval",
        "random_quote", "word_wrap", "italic_quote"
    ]
    
    for f in fields:
        val = getattr(pw, f, None)
        if val is not None:
            # Handle some remapping for compatibility
            if f == "value_format": props["format"] = val
            if f == "random_quote": props["random"] = val
            props[f] = val

    # Special case mappings
    if pw.type == "text" and "font_size" not in props and "size" in props:
        props["font_size"] = props["size"]
    if pw.type == "icon" and "size" not in props and "font_size" in props:
        props["size"] = props["font_size"]
    if pw.type == "puppet" and "url" in props:
        props["image_url"] = props["url"]

    return props

def _find_display_block(data: Any) -> Dict[str, Any] | None:
    """Locate the 'display:' block with an epaper_display and lambda."""
    if not isinstance(data, dict): return None
    display = data.get("display")
    candidate = None
    if isinstance(display, list):
        for block in display:
            if not isinstance(block, dict): continue
            if "lambda" in block:
                if block.get("id") == "epaper_display": return block
                if candidate is None: candidate = block
    elif isinstance(display, dict):
        if "lambda" in display:
            if display.get("id") == "epaper_display": return display
            candidate = display
    return candidate

def _parse_pages_from_lambda(lines: List[str]) -> Dict[int, ParsedPage]:
    """Extract pages and widgets from the lambda body."""
    pages: Dict[int, ParsedPage] = {}
    current_page: int | None = None
    brace_depth = 0

    for raw_line in lines:
        line = raw_line.strip()
        page_match = None
        if line.startswith("if (page ==") and "{" in line:
            try: page_match = int(line.split("==")[1].split(")")[0].strip())
            except: pass
        elif line.startswith("if (id(display_page)") and "==" in line and "{" in line:
            try: page_match = int(line.split("==")[1].split(")")[0].strip())
            except: pass
        
        if page_match is not None:
            current_page = page_match
            if current_page not in pages: pages[current_page] = ParsedPage(widgets=[])
            brace_depth = 1
            continue

        if current_page is not None:
            brace_depth += line.count("{") - line.count("}")
            if brace_depth <= 0:
                current_page = None
                brace_depth = 0
                continue
            
            if "// page:name" in line:
                try:
                    parts = line.split('"', 2)
                    if len(parts) >= 2: pages[current_page].name = parts[1]
                except: pass

            pw = parse_widget_line(line)
            if pw: pages[current_page].widgets.append(pw)

    return pages
