"""
Services for the ESPHome Designer Designer integration.

Implements:
- esphome_designer.set_page
- esphome_designer.next_page
- esphome_designer.prev_page

These operate purely on the stored DeviceConfig state and do not hard-code
any user-specific entities.

Note: YAML generation (FontManager class) was removed - it's now handled
entirely client-side in frontend/js/io/yaml_export.js
"""

from __future__ import annotations

import logging

import voluptuous as vol

from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.helpers import config_validation as cv

from .const import (
    DOMAIN,
    CONF_DEVICE_ID,
    SERVICE_SET_PAGE,
    SERVICE_NEXT_PAGE,
    SERVICE_PREV_PAGE,
)
from .storage import DashboardStorage

_LOGGER = logging.getLogger(__name__)

# Track registration so we can safely unregister on unload
_REGISTERED = False


def _require_storage(hass: HomeAssistant) -> DashboardStorage:
    storage: DashboardStorage | None = hass.data.get(DOMAIN, {}).get("storage")
    if storage is None:
        raise RuntimeError(f"{DOMAIN}: storage not initialized")
    return storage


async def _handle_set_page(hass: HomeAssistant, call: ServiceCall) -> None:
    storage = _require_storage(hass)
    device_id: str = call.data[CONF_DEVICE_ID]
    page_index: int = call.data["page"]

    _LOGGER.debug("%s: set_page called for device=%s page=%s", DOMAIN, device_id, page_index)

    async def updater(device):
        device.set_page(page_index)

    updated = await storage.async_update_device(device_id, updater)
    if not updated:
        _LOGGER.warning("%s: set_page failed, unknown device_id=%s", DOMAIN, device_id)


async def _handle_next_page(hass: HomeAssistant, call: ServiceCall) -> None:
    storage = _require_storage(hass)
    device_id: str = call.data[CONF_DEVICE_ID]

    _LOGGER.debug("%s: next_page called for device=%s", DOMAIN, device_id)

    async def updater(device):
        device.next_page()

    updated = await storage.async_update_device(device_id, updater)
    if not updated:
        _LOGGER.warning("%s: next_page failed, unknown device_id=%s", DOMAIN, device_id)


async def _handle_prev_page(hass: HomeAssistant, call: ServiceCall) -> None:
    storage = _require_storage(hass)
    device_id: str = call.data[CONF_DEVICE_ID]

    _LOGGER.debug("%s: prev_page called for device=%s", DOMAIN, device_id)

    async def updater(device):
        device.prev_page()

    updated = await storage.async_update_device(device_id, updater)
    if not updated:
        _LOGGER.warning("%s: prev_page failed, unknown device_id=%s", DOMAIN, device_id)


def async_register_services(hass: HomeAssistant, storage: DashboardStorage) -> None:
    """Register integration services (idempotent)."""
    global _REGISTERED

    if _REGISTERED:
        return

    # Basic schema reused by all services
    base_schema = vol.Schema(
        {
            vol.Required(CONF_DEVICE_ID): cv.string,
        }
    )

    hass.services.async_register(
        DOMAIN,
        SERVICE_SET_PAGE,
        lambda call: hass.async_create_task(_handle_set_page(hass, call)),
        schema=base_schema.extend({vol.Required("page"): cv.positive_int}),
    )

    hass.services.async_register(
        DOMAIN,
        SERVICE_NEXT_PAGE,
        lambda call: hass.async_create_task(_handle_next_page(hass, call)),
        schema=base_schema,
    )

    hass.services.async_register(
        DOMAIN,
        SERVICE_PREV_PAGE,
        lambda call: hass.async_create_task(_handle_prev_page(hass, call)),
        schema=base_schema,
    )

    _REGISTERED = True
    _LOGGER.debug("%s: services registered", DOMAIN)


def async_unregister_services(hass: HomeAssistant) -> None:
    """Unregister integration services if they were registered."""
    global _REGISTERED

    if not _REGISTERED:
        return

    for service in (SERVICE_SET_PAGE, SERVICE_NEXT_PAGE, SERVICE_PREV_PAGE):
        if hass.services.has_service(DOMAIN, service):
            hass.services.async_remove(DOMAIN, service)

    _REGISTERED = False
    _LOGGER.debug("%s: services unregistered", DOMAIN)
