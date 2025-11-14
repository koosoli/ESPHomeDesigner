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

from dataclasses import dataclass
from typing import Any, Dict, List

import yaml

from .models import DeviceConfig, PageConfig, WidgetConfig


@dataclass
class ParsedWidget:
    """Intermediate structure extracted from lambda lines."""

    id: str
    type: str
    x: int
    y: int
    width: int
    height: int
    title: str | None = None
    entity_id: str | None = None
    text: str | None = None
    code: str | None = None  # For icon widgets


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

    if not pages:
        raise ValueError("no_pages_found")

    device = DeviceConfig(
        device_id="reterminal_e1001",
        api_token="",
        name="reTerminal E1001",
        pages=[],
        current_page=0,
    )

    for page_index, widgets in sorted(pages.items(), key=lambda x: x[0]):
        page = PageConfig(
            id=f"page_{page_index}",
            name=f"Page {page_index + 1}",
            widgets=[],
        )
        for pw in widgets:
            # Build props based on widget type
            props = {}
            if pw.text:
                props["text"] = pw.text
            if pw.code:
                props["code"] = pw.code
                props["font_ref"] = "font_mdi_medium"  # Default
                props["fit_icon_to_frame"] = True
                props["size"] = 40
                props["color"] = "black"
            if pw.type == "sensor_text":
                props["label_font_size"] = 14
                props["value_font_size"] = 20
                props["value_format"] = "label_value"
                props["color"] = "black"
            
            wc = WidgetConfig(
                id=pw.id,
                type=pw.type,
                x=pw.x,
                y=pw.y,
                width=pw.width,
                height=pw.height,
                entity_id=pw.entity_id,
                title=pw.title,
                icon=None,
                props=props,
            )
            wc.clamp_to_canvas()
            page.widgets.append(wc)
        device.pages.append(page)

    device.ensure_pages()
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
    """
    if not isinstance(data, dict):
        return None

    display = data.get("display")
    if isinstance(display, list):
        for block in display:
            if not isinstance(block, dict):
                continue
            if "lambda" in block and block.get("id") == "epaper_display":
                return block
    elif isinstance(display, dict):
        if "lambda" in display and display.get("id") == "epaper_display":
            return display

    return None


def _parse_pages_from_lambda(lines: List[str]) -> Dict[int, List[ParsedWidget]]:
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
    pages: Dict[int, List[ParsedWidget]] = {}
    current_page: int | None = None
    brace_depth = 0

    for raw_line in lines:
        line = raw_line.strip()

        # Track page blocks:
        if line.startswith("if (page ==") and "{" in line:
            try:
                num_str = line.split("==")[1].split(")")[0].strip()
                current_page = int(num_str)
                pages.setdefault(current_page, [])
                brace_depth = 1
            except Exception:  # noqa: BLE001
                current_page = None
                brace_depth = 0
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
            pw = _parse_widget_line(line)
            if pw:
                pages[current_page].append(pw)

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
        parts = line.replace("//", "").strip().split()
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

        wtype = meta.get("type") or parts[0].split(":")[1]
        wid = meta.get("id", f"w_{abs(hash(line)) % 99999}")
        x = int(meta.get("x", "40"))
        y = int(meta.get("y", "40"))
        w = int(meta.get("w", "200"))
        h = int(meta.get("h", "60"))
        ent = meta.get("ent")
        text = meta.get("text")
        code = meta.get("code")
        title = meta.get("title")

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