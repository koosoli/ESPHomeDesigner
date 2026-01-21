"""
ESPHome Designer Designer integration.

Production-ready scaffold:

- Initializes shared storage for device/page layouts.
- Registers HTTP API routes for PNG rendering and layout CRUD.
- Registers services for page navigation.
- No user-specific entities or secrets; all configuration is via config_flow
  and the frontend editor.
"""

from __future__ import annotations

import logging
from typing import Any, Dict

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.typing import ConfigType

from .const import DOMAIN, STORAGE_KEY, STORAGE_VERSION
from .http_api import async_register_http_views
from .panel import ESPHomeDesignerPanelView, ESPHomeDesignerFontView
from .services import async_register_services, async_unregister_services
from .storage import DashboardStorage
from .models import DashboardState, DeviceConfig, PageConfig, WidgetConfig

_LOGGER = logging.getLogger(__name__)


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up via YAML (optional advanced mode).

    If a top-level YAML section for this domain exists, it can define one or more
    devices and their layouts in a declarative way. This is entirely optional:
    the primary path remains config_flow + GUI/editor + HTTP layout API.

    Expected minimal YAML structure:

    esphome_designer:
      devices:
        my_reterminal:
          name: "Hallway reTerminal"
          api_token: "your_token_here"
          pages:
            - id: "page_0"
              name: "Main"
              widgets:
                - id: "clock"
                  type: "clock"
                  x: 0
                  y: 0
                  width: 800
                  height: 80
                - id: "temp"
                  type: "sensor"
                  entity_id: "sensor.outdoor_temperature"
                  x: 20
                  y: 100
                  width: 360
                  height: 80

    Notes:
    - All fields are optional and validated leniently.
    - YAML-defined layouts are merged into the same storage model used by the GUI.
    - Users who prefer full GUI can ignore YAML entirely.
    """
    yaml_cfg: Dict[str, Any] = config.get(DOMAIN, {})
    if not yaml_cfg:
        _LOGGER.debug("%s: async_setup called with no YAML config; skipping", DOMAIN)
        return True

    hass.data.setdefault(DOMAIN, {})

    # Initialize storage if not present yet
    if "storage" not in hass.data[DOMAIN]:
        storage = DashboardStorage(
            hass=hass,
            storage_key=STORAGE_KEY,
            version=STORAGE_VERSION,
        )
        await storage.async_load()
        hass.data[DOMAIN]["storage"] = storage
    else:
        storage = hass.data[DOMAIN]["storage"]

    # Parse YAML devices into DashboardState/DeviceConfig
    devices_cfg = yaml_cfg.get("devices", {}) or {}
    if not isinstance(devices_cfg, dict):
        _LOGGER.error("%s: YAML 'devices' must be a mapping", DOMAIN)
        return True

    state: DashboardState = storage.state

    for device_id, raw in devices_cfg.items():
        if not isinstance(raw, dict):
            _LOGGER.warning("%s: Skipping invalid YAML device '%s' (not a mapping)", DOMAIN, device_id)
            continue

        name = str(raw.get("name", device_id))
        api_token = str(raw.get("api_token", ""))

        # If device already exists in storage, reuse its token when YAML omits it.
        existing = state.devices.get(device_id)
        if not api_token:
            if existing:
                api_token = existing.api_token
            else:
                from secrets import token_hex

                api_token = token_hex(16)

        pages_data = raw.get("pages", []) or []
        pages = []
        if isinstance(pages_data, list):
            for p in pages_data:
                if not isinstance(p, dict):
                    continue
                page = PageConfig.from_dict(p)
                pages.append(page)

        device = DeviceConfig(
            device_id=str(device_id),
            api_token=str(api_token),
            name=name,
            pages=pages,
            current_page=int(raw.get("current_page", 0)),
        )
        device.ensure_pages()
        state.devices[device_id] = device
        _LOGGER.debug("%s: Loaded YAML device '%s' with %d pages", DOMAIN, device_id, len(device.pages))

    await storage.async_save()
    _LOGGER.info("%s: YAML configuration loaded (%d devices)", DOMAIN, len(state.devices))

    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up a config entry."""
    _LOGGER.info("%s: Setting up config entry %s", DOMAIN, entry.entry_id)
    hass.data.setdefault(DOMAIN, {})

    entry.async_on_unload(entry.add_update_listener(update_listener))

    # Initialize shared storage once
    if "storage" not in hass.data[DOMAIN]:
        storage = DashboardStorage(
            hass=hass,
            storage_key=STORAGE_KEY,
            version=STORAGE_VERSION,
        )
        await storage.async_load()
        hass.data[DOMAIN]["storage"] = storage
        _LOGGER.debug("%s: Dashboard storage initialized", DOMAIN)
    else:
        storage = hass.data[DOMAIN]["storage"]

    # Register HTTP views (idempotent)
    await async_register_http_views(hass, storage)
    _LOGGER.info("%s: HTTP API views registered", DOMAIN)

    # Register the embedded editor panel backend view
    hass.http.register_view(ESPHomeDesignerPanelView(hass))
    _LOGGER.info("%s: Panel view registered at /esphome-designer/editor", DOMAIN)

    # Register the font view for MDI icons
    hass.http.register_view(ESPHomeDesignerFontView(hass))
    _LOGGER.info("%s: Font view registered at /esphome-designer/editor/materialdesignicons-webfont.ttf", DOMAIN)

    # Register static view for frontend assets (CSS/JS)
    # This manually serves editor.css and editor.js to avoid issues with register_static_path
    from .panel import ESPHomeDesignerStaticView
    hass.http.register_view(ESPHomeDesignerStaticView(hass))
    _LOGGER.info("%s: Static view registered at /esphome-designer/static/{filename}", DOMAIN)

    # Register the sidebar panel if enabled
    if entry.options.get("show_in_sidebar", True):
        try:
            from homeassistant.components import frontend
            frontend.async_register_built_in_panel(
                hass,
                component_name="iframe",  # Use iframe panel type to load our view
                sidebar_title="ESPHome Designer",
                sidebar_icon="mdi:tablet-dashboard",
                frontend_url_path="esphome-designer",
                config={"url": "/esphome-designer/editor/index.html"},
                require_admin=False,
            )
            _LOGGER.info("%s: Sidebar panel registered", DOMAIN)
        except Exception as e:
            _LOGGER.warning("%s: Failed to register sidebar panel: %s", DOMAIN, e)
    else:
        _LOGGER.info("%s: Sidebar panel disabled by config", DOMAIN)

    return True


async def update_listener(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Update listener."""
    await hass.config_entries.async_reload(entry.entry_id)


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    _LOGGER.info("%s: Unloading config entry %s", DOMAIN, entry.entry_id)

    # For now: if all entries are removed, clean up services.
    entries = hass.config_entries.async_entries(DOMAIN)
    if len(entries) <= 1:
        async_unregister_services(hass)
        _LOGGER.debug("%s: Unregistered services (last entry unloaded)", DOMAIN)
    
    # Remove the sidebar panel
    try:
        from homeassistant.components import frontend
        frontend.async_remove_panel(hass, "esphome-designer")
    except Exception:
        pass

    # Keep storage in memory; if you want to fully unload, you could:
    # hass.data[DOMAIN].pop("storage", None) when last entry is removed.

    return True
