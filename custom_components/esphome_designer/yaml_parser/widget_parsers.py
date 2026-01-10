from __future__ import annotations
from typing import Dict
from .models import ParsedWidget

def parse_widget_line(line: str) -> ParsedWidget | None:
    """
    Parse a single line into a ParsedWidget when possible.
    Supported patterns: Marker comments and simple it.printf fallbacks.
    """
    # Pattern 1: comment-based markers
    if line.startswith("// widget:"):
        clean_line = line.strip()
        if clean_line.startswith("//"):
            clean_line = clean_line[2:].strip()
        parts = clean_line.split()
        meta: Dict[str, str] = {}
        
        # Handle quoted values
        i = 1
        while i < len(parts):
            part = parts[i]
            if ":" in part:
                key, val = part.split(":", 1)
                key = key.strip()
                if val.startswith('"'):
                    if val.endswith('"') and len(val) > 1:
                        meta[key] = val.strip('"')
                    else:
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
        ent = meta.get("ent") or meta.get("entity")
        text = meta.get("text")
        code = meta.get("code")
        title = meta.get("title") or meta.get("label")
        url = meta.get("url")
        path = meta.get("path")
        format_val = meta.get("format")
        invert_val = meta.get("invert", "false").lower() in ("true", "1", "yes")
        
        font_family = meta.get("font_family") or meta.get("font")
        font_style = meta.get("font_style")
        italic_raw = meta.get("italic")
        italic_val = italic_raw is not None and italic_raw.lower() in ("true", "1", "yes")
        if not italic_val and font_style and font_style.lower() == "italic":
            italic_val = True
        color = meta.get("color")
        
        def parse_int(val: str | None) -> int | None:
            if val:
                try: return int(val)
                except ValueError: pass
            return None
        
        def parse_float(val: str | None) -> float | None:
            if val:
                try: return float(val)
                except ValueError: pass
            return None
        
        def parse_bool(val: str | None) -> bool | None:
            if val is None: return None
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
        show_border = parse_bool(meta.get("show_border"))
        radius = parse_int(meta.get("radius"))
        show_label = parse_bool(meta.get("show_label"))
        show_percentage = parse_bool(meta.get("show_percentage")) or parse_bool(meta.get("show_pct"))
        is_local_sensor = parse_bool(meta.get("local"))
        is_text_sensor = parse_bool(meta.get("text_sensor"))
        continuous = parse_bool(meta.get("continuous"))
        if continuous is None: continuous = True

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

        condition_entity = meta.get("condition_entity")
        condition_operator = meta.get("condition_operator")
        condition_state = meta.get("condition_state")
        condition_min = parse_float(meta.get("condition_min"))
        condition_max = parse_float(meta.get("condition_max"))
        condition_logic = meta.get("condition_logic")

        feed_url = meta.get("feed_url")
        show_author = parse_bool(meta.get("show_author"))
        if show_author is None: show_author = True
        quote_font_size = parse_int(meta.get("quote_font_size")) or parse_int(meta.get("quote_font"))
        author_font_size = parse_int(meta.get("author_font_size")) or parse_int(meta.get("author_font"))
        refresh_interval = meta.get("refresh_interval") or meta.get("refresh")
        random_quote = parse_bool(meta.get("random"))
        if random_quote is None: random_quote = True
        word_wrap = parse_bool(meta.get("word_wrap")) or parse_bool(meta.get("wrap"))
        if word_wrap is None: word_wrap = True
        italic_quote = parse_bool(meta.get("italic_quote"))
        if italic_quote is None: italic_quote = True

        return ParsedWidget(
            id=wid, type=wtype, x=x, y=y, width=w, height=h,
            title=title or text or None,
            entity_id=ent or None, text=text or None, code=code or None,
            url=url or None, path=path or None, format=format_val or None,
            invert=invert_val, font_family=font_family, font_size=font_size,
            font_style=font_style, font_weight=font_weight, italic=italic_val,
            label_font_size=label_font_size, value_font_size=value_font_size,
            value_format=format_val or None, text_align=text_align,
            label_align=label_align, value_align=value_align, color=color,
            fill=fill, opacity=opacity, border_width=border_width,
            stroke_width=stroke_width, radius=radius, show_border=show_border,
            size=size, bar_height=bar_height, show_label=show_label,
            show_percentage=show_percentage, time_font_size=time_font_size,
            date_font_size=date_font_size, is_local_sensor=is_local_sensor or False,
            is_text_sensor=is_text_sensor or False, continuous=continuous,
            duration=duration, min_value=min_value, max_value=max_value,
            min_range=min_range, max_range=max_range, x_grid=x_grid,
            y_grid=y_grid, line_type=line_type, line_thickness=line_thickness,
            show_axis_labels=show_axis_labels,
            condition_entity=condition_entity, condition_operator=condition_operator,
            condition_state=condition_state, condition_min=condition_min,
            condition_max=condition_max, condition_logic=condition_logic,
            feed_url=feed_url, show_author=show_author,
            quote_font_size=quote_font_size, author_font_size=author_font_size,
            refresh_interval=refresh_interval, random_quote=random_quote,
            word_wrap=word_wrap, italic_quote=italic_quote,
        )

    # Pattern 2: simple printf
    if line.startswith("it.printf(") and ")" in line:
        try:
            args_str = line[len("it.printf(") :].split(")")[0]
            args = [a.strip() for a in args_str.split(",")]
            if len(args) >= 4:
                x = int(args[0])
                y = int(args[1])
                raw_text = args[3].strip()
                text = raw_text.strip('"') if (raw_text.startswith('"') and raw_text.endswith('"')) else None
                return ParsedWidget(
                    id=f"w_{abs(hash(line)) % 99999}", type="label",
                    x=x, y=y, width=200, height=40,
                    title=text or None, text=text,
                )
        except Exception: pass

    return None
