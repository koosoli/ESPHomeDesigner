from __future__ import annotations

import logging
import yaml
import re
import json
from http import HTTPStatus
from typing import Any
from pathlib import Path

from aiohttp import web
from homeassistant.core import HomeAssistant

from ..const import API_BASE_PATH
from .base import DesignerBaseView

_LOGGER = logging.getLogger(__name__)

class ReTerminalHardwareListView(DesignerBaseView):
    """List available hardware templates from the frontend/hardware directory."""

    url = f"{API_BASE_PATH}/hardware/templates"
    name = "api:esphome_designer_hardware_templates"

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass

    async def get(self, request) -> Any:
        """Scan frontend/hardware directory and persistent custom profiles directory."""
        # 1. Built-in templates (bundled with the component)
        hardware_dir = Path(__file__).parent.parent / "frontend" / "hardware"
        # 2. Persistent custom profiles (survives reboots/updates)
        custom_profiles_dir = Path(self.hass.config.path("esphomedesigner_custom_profiles"))
        
        # Collect all directories to scan
        dirs_to_scan = []
        if hardware_dir.exists():
            dirs_to_scan.append((hardware_dir, False))  # (path, is_custom)
        if custom_profiles_dir.exists():
            dirs_to_scan.append((custom_profiles_dir, True))  # (path, is_custom)
        
        if not dirs_to_scan:
            return self.json({"templates": []}, request=request)

        templates = []
        seen_ids = set()
        
        for scan_dir, is_custom in dirs_to_scan:
            for yaml_file in scan_dir.glob("*.yaml"):
                try:
                    content = await self.hass.async_add_executor_job(
                        yaml_file.read_text, "utf-8"
                    )
                    
                    name = yaml_file.stem
                    width = 800
                    height = 480
                    shape = "rect"
                    features: dict[str, Any] = {"psram": True, "lcd": True}

                    # Parse metadata from comments
                    name_match = re.search(r"#\s*Name:\s*(.*)", content, re.IGNORECASE)
                    if name_match:
                        name = name_match.group(1).strip()

                    target_device_match = re.search(r"#\s*TARGET DEVICE:\s*(.*)", content, re.IGNORECASE)
                    if target_device_match:
                        name = target_device_match.group(1).strip()

                    res_match = re.search(r"#\s*Resolution:\s*(\d+)x(\d+)", content, re.IGNORECASE)
                    if res_match:
                        width = int(res_match.group(1))
                        height = int(res_match.group(2))

                    shape_match = re.search(r"#\s*Shape:\s*(rect|round)", content, re.IGNORECASE)
                    if shape_match:
                        shape = shape_match.group(1).lower()

                    inv_match = re.search(r"#\s*Inverted:\s*(true|yes|1)", content, re.IGNORECASE)
                    if inv_match:
                        features["inverted_colors"] = True
                    
                    # Detect chip and board from early comments or esp32/esp8266 blocks
                    chip = "esp32-s3"
                    board = None
                    
                    esp8266_match = re.search(r"^\s*esp8266:", content, re.MULTILINE)
                    if esp8266_match:
                        chip = "esp8266"
                    else:
                        esp32_match = re.search(r"^\s*esp32:", content, re.MULTILINE)
                        if esp32_match:
                            # Try to infer specific esp32 variant
                            if "esp32-s3" in content.lower():
                                chip = "esp32-s3"
                            elif "esp32-c3" in content.lower():
                                chip = "esp32-c3"
                            elif "esp32-c6" in content.lower():
                                chip = "esp32-c6"
                            else:
                                chip = "esp32"
                    
                    board_match = re.search(r"^\s*board:\s*([^\n]+)", content, re.MULTILINE)
                    if board_match:
                        board = board_match.group(1).strip()
                        if not esp8266_match:
                            if "s3" in board.lower():
                                chip = "esp32-s3"
                            elif "c3" in board.lower():
                                chip = "esp32-c3"
                            elif "c6" in board.lower():
                                chip = "esp32-c6"
                    
                    # Support explicit comment overrides
                    chip_comment_match = re.search(r"#\s*Chip:\s*(.*)", content, re.IGNORECASE)
                    if chip_comment_match:
                        chip = chip_comment_match.group(1).strip()
                        
                    board_comment_match = re.search(r"#\s*Board:\s*(.*)", content, re.IGNORECASE)
                    if board_comment_match:
                        board = board_comment_match.group(1).strip()
                    
                    is_epaper = "waveshare_epaper" in content or "epaper_spi" in content
                    if is_epaper:
                         features["epaper"] = True
                         features["lcd"] = False
                         features["lvgl"] = "lvgl:" in content
                    else:
                         features["lvgl"] = True

                    try:
                        data = yaml.safe_load(content)
                        if data and "display" in data:
                            display = data["display"]
                            if isinstance(display, list) and len(display) > 0:
                                disp = display[0]
                                if "dimensions" in disp:
                                    width = disp["dimensions"].get("width", width)
                                    height = disp["dimensions"].get("height", height)
                                
                                # Extract display-specific settings
                                if "color_palette" in disp:
                                    features["color_palette"] = disp["color_palette"]
                                if "color_order" in disp:
                                    features["color_order"] = disp["color_order"]
                                if "update_interval" in disp:
                                    features["update_interval"] = disp["update_interval"]
                                if "invert_colors" in disp:
                                    features["invert_colors"] = disp["invert_colors"]
                                
                                platform = disp.get("platform", "")
                                if "epaper" in platform or "waveshare_epaper" in platform:
                                    features["epaper"] = True
                                    features["lcd"] = False
                                    features["inverted_colors"] = True
                    except Exception:  # noqa: BLE001
                        pass

                    clean_id = yaml_file.stem.replace("-", "_").replace(".", "_")
                    
                    # Custom profiles get a prefix to avoid ID collisions with built-in
                    if is_custom:
                        clean_id = f"custom_{clean_id}"
                    
                    # Skip duplicates (custom profiles override built-in if same name)
                    if clean_id in seen_ids:
                        continue
                    seen_ids.add(clean_id)
                    
                    # Determine hardware package path
                    if is_custom:
                        hw_package = f"esphomedesigner_custom_profiles/{yaml_file.name}"
                    else:
                        hw_package = f"hardware/{yaml_file.name}"
                    
                    templates.append({
                        "id": clean_id,
                        "name": name,
                        "isPackageBased": True,
                        "isCustomProfile": is_custom,
                        "hardwarePackage": hw_package,
                        "resolution": {"width": width, "height": height},
                        "shape": shape,
                        "chip": chip,
                        "board": board,
                        "features": features
                    })
                    _LOGGER.debug(f"Loaded profile '{clean_id}' from {yaml_file}")

                except Exception as e:  # noqa: BLE001
                    _LOGGER.error("Failed to parse hardware template %s: %s", yaml_file, e)
            
            _LOGGER.debug(f"Scanned {scan_dir}: found {len([t for t in templates if (t['isCustomProfile'] == is_custom)])} templates")

        return self.json({"templates": templates}, request=request)


async def _parse_json_body(request):
    """Parse JSON body from request, handling any Content-Type."""
    try:
        body_bytes = await request.read()
        if not body_bytes:
            return {}
        body_text = body_bytes.decode('utf-8')
        return json.loads(body_text)
    except Exception as e:
        _LOGGER.warning("Failed to parse JSON body: %s", e)
        return {}


class ReTerminalHardwareUploadView(DesignerBaseView):
    """Handle uploading a new hardware template YAML."""

    url = f"{API_BASE_PATH}/hardware/upload"
    name = "api:esphome_designer_hardware_upload"

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass

    async def post(self, request) -> Any:
        """Save an uploaded YAML template from JSON body."""
        try:
            body = await _parse_json_body(request)
            filename = body.get("filename")
            content_str = body.get("content")
            
            if not filename or not content_str:
                return self.json({"error": "missing_fields"}, status_code=HTTPStatus.BAD_REQUEST, request=request)

            if not filename.endswith(".yaml"):
                return self.json({"error": "invalid_extension"}, status_code=HTTPStatus.BAD_REQUEST, request=request)

            filename = "".join(c for c in filename if c.isalnum() or c in "._-").strip()
            
            # Save to persistent config directory (survives reboots and updates)
            custom_profiles_dir = Path(self.hass.config.path("esphomedesigner_custom_profiles"))
            dest_path = custom_profiles_dir / filename
            content = content_str.encode("utf-8")
            
            if b"__LAMBDA_PLACEHOLDER__" not in content:
                 return self.json({
                     "error": "missing_placeholder",
                     "message": "Template must contain '__LAMBDA_PLACEHOLDER__' in the display lambda section."
                 }, status_code=HTTPStatus.BAD_REQUEST, request=request)

            custom_profiles_dir.mkdir(parents=True, exist_ok=True)
            
            def _save_file():
                with open(dest_path, "wb") as f:
                    f.write(content)

            await self.hass.async_add_executor_job(_save_file)

            _LOGGER.info("Saved new hardware template: %s", filename)
            return self.json({"success": True, "filename": filename}, request=request)

        except Exception as e: # noqa: BLE001
            _LOGGER.error("Hardware upload failed: %s", e)
            return self.json({"error": str(e)}, status_code=HTTPStatus.INTERNAL_SERVER_ERROR, request=request)
