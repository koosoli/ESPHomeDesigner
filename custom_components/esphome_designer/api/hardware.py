from __future__ import annotations

import logging
import yaml
import re
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
        """Scan frontend/hardware directory and return metadata-enriched profiles."""
        hardware_dir = Path(__file__).parent.parent / "frontend" / "hardware"
        
        if not hardware_dir.exists():
            return self.json({"templates": []}, request=request)

        templates = []
        for yaml_file in hardware_dir.glob("*.yaml"):
            try:
                content = yaml_file.read_text(encoding="utf-8")
                
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
                
                is_epaper = "waveshare_epaper" in content or "epaper_spi" in content
                if is_epaper:
                     features["epaper"] = True
                     features["lcd"] = False
                     features["lvgl"] = "lvgl:" in content # Only enable if explicitly in YAML
                else:
                     features["lvgl"] = True # Default for non-epaper (LCD)

                
                try:
                    data = yaml.safe_load(content)
                    if data and "display" in data:
                        display = data["display"]
                        if isinstance(display, list) and len(display) > 0:
                            disp = display[0]
                            if "dimensions" in disp:
                                width = disp["dimensions"].get("width", width)
                                height = disp["dimensions"].get("height", height)
                            
                            platform = disp.get("platform", "")
                            if "epaper" in platform or "waveshare_epaper" in platform:
                                features["epaper"] = True
                                features["lcd"] = False
                                features["inverted_colors"] = True
                except Exception: # noqa: BLE001
                    pass

                clean_id = yaml_file.stem.replace("-", "_").replace(".", "_")
                
                templates.append({
                    "id": clean_id,
                    "name": name,
                    "isPackageBased": True,
                    "hardwarePackage": f"hardware/{yaml_file.name}",
                    "resolution": {"width": width, "height": height},
                    "shape": shape,
                    "features": features
                })
            except Exception as e: # noqa: BLE001
                _LOGGER.error("Failed to parse hardware template %s: %s", yaml_file, e)

        return self.json({"templates": templates}, request=request)


class ReTerminalHardwareUploadView(DesignerBaseView):
    """Handle uploading a new hardware template YAML."""

    url = f"{API_BASE_PATH}/hardware/upload"
    name = "api:esphome_designer_hardware_upload"

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass

    async def post(self, request) -> Any:
        """Save an uploaded YAML file to the hardware directory."""
        try:
            data = await request.post()
            file_field = data.get("file")
            
            if not file_field:
                return self.json({"error": "no_file"}, status_code=HTTPStatus.BAD_REQUEST, request=request)

            if isinstance(file_field, str):
                 return self.json({"error": "invalid_file_field"}, status_code=HTTPStatus.BAD_REQUEST, request=request)

            filename = file_field.filename
            if not filename.endswith(".yaml"):
                return self.json({"error": "invalid_extension"}, status_code=HTTPStatus.BAD_REQUEST, request=request)

            filename = "".join(c for c in filename if c.isalnum() or c in "._-").strip()
            
            hardware_dir = Path(__file__).parent.parent / "frontend" / "hardware"
            dest_path = hardware_dir / filename
            content = file_field.file.read()
            
            if b"__LAMBDA_PLACEHOLDER__" not in content:
                 return self.json({
                     "error": "missing_placeholder",
                     "message": "Template must contain '__LAMBDA_PLACEHOLDER__' in the display lambda section."
                 }, status_code=HTTPStatus.BAD_REQUEST, request=request)

            def _write_file() -> None:
                hardware_dir.mkdir(parents=True, exist_ok=True)
                with open(dest_path, "wb") as f:
                    f.write(content)

            await self.hass.async_add_executor_job(_write_file)

            _LOGGER.info("Saved new hardware template: %s", filename)
            return self.json({"success": True, "filename": filename}, request=request)

        except Exception as e: # noqa: BLE001
            _LOGGER.error("Hardware upload failed: %s", e)
            return self.json({"error": str(e)}, status_code=HTTPStatus.INTERNAL_SERVER_ERROR, request=request)
