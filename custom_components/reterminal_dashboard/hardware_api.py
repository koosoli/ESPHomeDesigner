import os
import logging
import yaml
from http import HTTPStatus
from typing import Any
from pathlib import Path

from aiohttp import web
from homeassistant.components.http import HomeAssistantView
from homeassistant.core import HomeAssistant
from homeassistant.helpers.json import json_dumps

from .const import API_BASE_PATH

_LOGGER = logging.getLogger(__name__)

class ReTerminalHardwareListView(HomeAssistantView):
    """List available hardware templates from the frontend/hardware directory."""

    url = f"{API_BASE_PATH}/hardware/templates"
    name = "api:reterminal_dashboard_hardware_templates"
    requires_auth = False
    cors_allowed = True

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass

    async def get(self, request) -> Any:
        """Scan frontend/hardware directory and return metadata-enriched profiles."""
        hardware_dir = Path(__file__).parent / "frontend" / "hardware"
        
        if not hardware_dir.exists():
            return self.json({"templates": []})

        templates = []
        for yaml_file in hardware_dir.glob("*.yaml"):
            try:
                content = yaml_file.read_text(encoding="utf-8")
                # Basic parsing: extract name and resolution
                # For resolution, we look for 'width: XXX' and 'height: YYY'
                # For name, we look for '# TARGET DEVICE: XXX' or 'name: XXX'
                
                name = yaml_file.stem
                width = 800
                height = 480
                shape = "rect"
                features = {"psram": True, "lcd": True}

                # Try to find name in comments
                for line in content.splitlines():
                    if "TARGET DEVICE:" in line:
                        name = line.split("TARGET DEVICE:", 1)[1].strip()
                        break
                
                # Try to parse as YAML to get dimensions and features
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
                except Exception:
                    # Fallback to defaults if YAML is complex or partially invalid
                    pass

                # Unified ID Generation: replace - and . with _ for backward compatibility with JS IDs
                # No 'dynamic_' prefix for bundled templates in frontend/hardware
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
            except Exception as e:
                _LOGGER.error("Failed to parse hardware template %s: %s", yaml_file, e)

        return self.json({"templates": templates})

    def json(self, data: Any, status_code: int = HTTPStatus.OK):
        return web.Response(
            body=json_dumps(data),
            status=status_code,
            content_type="application/json",
        )

class ReTerminalHardwareUploadView(HomeAssistantView):
    """Handle uploading a new hardware template YAML."""

    url = f"{API_BASE_PATH}/hardware/upload"
    name = "api:reterminal_dashboard_hardware_upload"
    requires_auth = False
    cors_allowed = True

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass

    async def post(self, request) -> Any:
        """Save an uploaded YAML file to the hardware directory."""
        try:
            data = await request.post()
            file_field = data.get("file")
            
            if not file_field:
                return self.json({"error": "no_file"}, status_code=HTTPStatus.BAD_REQUEST)

            filename = file_field.filename
            if not filename.endswith(".yaml"):
                return self.json({"error": "invalid_extension"}, status_code=HTTPStatus.BAD_REQUEST)

            # Sanitize filename
            filename = "".join(c for c in filename if c.isalnum() or c in "._-").strip()
            
            hardware_dir = Path(__file__).parent / "frontend" / "hardware"
            hardware_dir.mkdir(parents=True, exist_ok=True)
            
            dest_path = hardware_dir / filename
            
            # Read content
            content = file_field.file.read()
            
            # Validation: Ensure it has __LAMBDA_PLACEHOLDER__
            if b"__LAMBDA_PLACEHOLDER__" not in content:
                 return self.json({
                     "error": "missing_placeholder",
                     "message": "Template must contain '__LAMBDA_PLACEHOLDER__' in the display lambda section."
                 }, status_code=HTTPStatus.BAD_REQUEST)

            with open(dest_path, "wb") as f:
                f.write(content)

            _LOGGER.info("Saved new hardware template: %s", filename)
            return self.json({"success": True, "filename": filename})

        except Exception as e:
            _LOGGER.error("Hardware upload failed: %s", e)
            return self.json({"error": str(e)}, status_code=HTTPStatus.INTERNAL_SERVER_ERROR)

    def json(self, data: Any, status_code: int = HTTPStatus.OK):
        return web.Response(
            body=json_dumps(data),
            status=status_code,
            content_type="application/json",
        )
