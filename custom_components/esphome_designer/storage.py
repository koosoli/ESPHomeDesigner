"""
Persistent storage for the ESPHome Designer Designer.

Uses Home Assistant's Store helper to persist the DashboardState defined in models.py.
This is the single source of truth for all devices, pages, and widgets.
"""

from __future__ import annotations

import logging
from typing import Any, Dict, Optional

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import DOMAIN, STORAGE_KEY, STORAGE_VERSION
from .models import DashboardState, DeviceConfig

_LOGGER = logging.getLogger(__name__)


class DashboardStorage:
    """Wrapper around Store to manage DashboardState."""

    def __init__(self, hass: HomeAssistant, storage_key: str = STORAGE_KEY, version: int = STORAGE_VERSION) -> None:
        self._hass = hass
        self._store = Store(hass, version, storage_key)
        self._state: Optional[DashboardState] = None

    @property
    def state(self) -> DashboardState:
        """Return in-memory state; guaranteed non-None after async_load."""
        if self._state is None:
            # Should not happen after proper setup, but guard against it.
            self._state = DashboardState()
        return self._state

    async def async_load(self) -> None:
        """Load state from disk into memory."""
        data = await self._store.async_load()
        
        # MIGRATION: If new storage is empty, check for legacy 0.8.6.2 storage
        if not data:
            _LOGGER.debug("%s: No new state found, checking for legacy 'reterminal_dashboard' storage", DOMAIN)
            # Legacy store uses exact same format but different key
            legacy_store = Store(self._hass, 1, "reterminal_dashboard")
            legacy_data = await legacy_store.async_load()
            
            if legacy_data:
                _LOGGER.info("%s: Found legacy 0.8.6.2 layouts, migrating to %s...", DOMAIN, DOMAIN)
                data = legacy_data
                # We will save this to the new store automatically on next save, 
                # or we can force it immediately below. For safety, let's just use it as 'data'.

        if data:
            try:
                self._state = DashboardState.from_dict(data)
                _LOGGER.debug("%s: Loaded dashboard state from storage", DOMAIN)
                
                # If we just loaded legacy data (and thus self._state is dirty relative to new store),
                # we should probably persist it to the new store soon.
                # However, to avoid side effects during load, we'll let the user's first action 
                # (or auto-save on change) trigger the save. 
                # But actually, if they never change anything, they might lose it?
                # Let's force a save if we see it was a migration? 
                # No, async_load is often called at startup. Calling async_save here might be risky 
                # if the loop isn't ready or if it causes a loop. 
                # Safe approach: Just load it into memory. It will be saved when they make a change.
            except Exception as exc:  # noqa: BLE001
                _LOGGER.error("%s: Failed to parse stored state, starting fresh: %s", DOMAIN, exc)
                self._state = DashboardState()
        else:
            _LOGGER.debug("%s: No storage found (new or legacy), starting fresh", DOMAIN)
            self._state = DashboardState()

    async def async_save(self) -> None:
        """Persist current state to disk."""
        if self._state is None:
            _LOGGER.warning("%s: async_save called with no state initialized", DOMAIN)
            return
        data = self._state.to_dict()
        await self._store.async_save(data)
        _LOGGER.debug("%s: Dashboard state saved", DOMAIN)

    #
    # Device-level helpers
    #
    
    async def async_get_or_create_device(self, device_id: str, api_token: str) -> DeviceConfig:
        """Get or create a device configuration."""
        device = self.state.get_or_create_device(device_id, api_token)
        await self.async_save()
        return device

    async def async_get_default_device(self) -> DeviceConfig:
        """Return the last active layout, or first available, or create default."""
        # Ensure state is loaded
        if self._state is None:
            await self.async_load()
        
        # Try to load the last active layout first
        last_active_id = self.state.last_active_layout_id
        if last_active_id and last_active_id in self.state.devices:
            _LOGGER.debug("%s: Loading last active layout: %s", DOMAIN, last_active_id)
            return self.state.devices[last_active_id]
        
        # Fallback: use first available device if any exist
        if self.state.devices:
            # Sort keys to ensure deterministic "first" item
            first_id = sorted(self.state.devices.keys())[0]
            _LOGGER.debug("%s: No last active layout, using first available: %s", DOMAIN, first_id)
            return self.state.devices[first_id]
        
        # No devices exist, create default
        device = self.state.get_or_create_device("reterminal_e1001", api_token="")
        await self.async_save()
        return device

    async def async_get_layout_default(self) -> DeviceConfig:
        """Alias for async_get_default_device for API consistency."""
        return await self.async_get_default_device()

    async def async_save_layout_default(self, device: DeviceConfig) -> None:
        """Persist a DeviceConfig as the default device."""
        await self.async_set_device(device)
        self.state.last_active_layout_id = device.device_id
        await self.async_save()

    async def async_get_layout(self, layout_id: str) -> Optional[DeviceConfig]:
        """Get a specific layout by ID."""
        if self._state is None:
            await self.async_load()
        return self.get_device(layout_id)

    async def async_list_layouts(self) -> List[Dict[str, Any]]:
        """List all available layouts with compact info."""
        if self._state is None:
            await self.async_load()
        
        results = []
        for dev_id, device in self.state.devices.items():
            results.append({
                "id": dev_id,
                "name": device.name,
                "page_count": len(device.pages),
                "device_model": device.device_model
            })
        return results

    async def async_save_layout(self, device: DeviceConfig) -> None:
        """Save a new layout or update existing."""
        await self.async_set_device(device)

    async def async_delete_layout(self, layout_id: str) -> None:
        """Remove a layout from storage."""
        if self._state is None:
            await self.async_load()
        if layout_id in self.state.devices:
            del self.state.devices[layout_id]
            if self.state.last_active_layout_id == layout_id:
                self.state.last_active_layout_id = None
            await self.async_save()

    def get_device(self, device_id: str) -> Optional[DeviceConfig]:
        """Get an existing device configuration, or None."""
        return self.state.devices.get(device_id)

    async def async_set_device(self, device: DeviceConfig) -> None:
        """Insert or replace a device configuration."""
        self.state.devices[device.device_id] = device
        await self.async_save()

    async def async_update_device(self, device_id: str, updater) -> Optional[DeviceConfig]:
        """
        Apply an update function to a device config and save.

        updater: Callable[[DeviceConfig], None]
        """
        device = self.get_device(device_id)
        if device is None:
            _LOGGER.warning("%s: Tried to update unknown device_id=%s", DOMAIN, device_id)
            return None

        try:
            updater(device)
        except Exception as exc:  # noqa: BLE001
            _LOGGER.error("%s: Error while updating device %s: %s", DOMAIN, device_id, exc)
            return None

        await self.async_save()
        return device

    #
    # Token / security helpers
    #

    def get_device_by_token(self, device_id: str, token: str) -> Optional[DeviceConfig]:
        """Return device if token matches, else None."""
        device = self.get_device(device_id)
        if not device:
            return None
        if not token:
            return None
        if device.api_token != token:
            _LOGGER.warning(
                "%s: Invalid token for device %s", DOMAIN, device_id
            )
            return None
        return device

    #
    # Layout CRUD helpers for HTTP API / frontend
    #
    # These helpers rely on DeviceConfig.from_dict / to_dict for:
    # - orientation (landscape/portrait)
    # - dark_mode
    # - per-page refresh_s
    # - widget props schema evolution
    #

    async def async_update_layout(self, device_id: str, raw_layout: Dict[str, Any]) -> Optional[DeviceConfig]:
        """
        Replace a device layout from raw layout dict (from editor).

        Expected format is compatible with DeviceConfig.to_dict(), but we:
        - Force device_id/api_token from existing device when missing.
        - Merge with existing data to preserve all fields.
        - Let DeviceConfig.from_dict handle defaults and validation.
        """
        # Ensure state loaded
        if self._state is None:
            await self.async_load()

        existing = self.get_device(device_id)
        
        # Merge logic
        merged: Dict[str, Any] = {}
        if existing:
            merged = existing.to_dict()
        
        if raw_layout:
            merged.update(raw_layout)

        # Force identification
        merged["device_id"] = device_id
        if existing and not merged.get("api_token"):
            merged["api_token"] = existing.api_token

        try:
            device = DeviceConfig.from_dict(merged)
        except Exception as exc:  # noqa: BLE001
            _LOGGER.error("%s: Failed to parse layout for %s: %s", DOMAIN, device_id, exc)
            return None

        device.ensure_pages()
        self.state.devices[device.device_id] = device
        # Track this as the last active layout
        self.state.last_active_layout_id = device.device_id
        await self.async_save()
        return device

    async def async_set_last_active_layout(self, layout_id: str) -> None:
        """Set the last active layout ID."""
        if self._state is None:
            await self.async_load()
        self.state.last_active_layout_id = layout_id
        await self.async_save()
        _LOGGER.debug("%s: Set last active layout to: %s", DOMAIN, layout_id)

    async def async_update_layout_default(self, raw_layout: Dict[str, Any]) -> DeviceConfig:
        """
        Update the default device layout from raw layout dict (from editor).

        This is the primary entrypoint for the editor's POST /layout.
        Uses DeviceConfig.from_dict after merging with existing data to ensure
        all fields (rendering_mode, hardware configs, etc.) are preserved.
        """
        # Ensure state loaded
        if self._state is None:
            await self.async_load()

        # Existing default device (if any)
        existing = self.get_device("reterminal_e1001")
        
        # Start with current state to ensure no fields are lost when frontend omissions occur
        merged_payload: Dict[str, Any] = {}
        if existing:
            merged_payload = existing.to_dict()
        
        # Override with all data from frontend (handles camelCase and snake_case via from_dict)
        if raw_layout:
            merged_payload.update(raw_layout)

        # Ensure critical identification fields are present
        if "device_id" not in merged_payload or not merged_payload["device_id"]:
            merged_payload["device_id"] = "reterminal_e1001"

        try:
            device = DeviceConfig.from_dict(merged_payload)
        except Exception as exc:  # noqa: BLE001
            _LOGGER.error("%s: Failed to parse default layout: %s", DOMAIN, exc)
            # Fall back to existing or a minimal but valid default device
            if existing:
                return existing
                
            device = DeviceConfig(
                device_id=merged_payload.get("device_id", "reterminal_e1001"),
                api_token=merged_payload.get("api_token", ""),
                name=merged_payload.get("name", "Layout 1"),
                pages=[],
                current_page=0,
            )

        device.ensure_pages()
        self.state.devices[device.device_id] = device
        # Track this as the last active layout
        self.state.last_active_layout_id = device.device_id
        await self.async_save()
        return device

    async def async_update_layout_from_device(self, device: DeviceConfig) -> DeviceConfig:
        """
        Persist a DeviceConfig coming from yaml_to_layout (snippet import).

        Ensures pages are valid and merges api_token if missing, while allowing
        orientation/dark_mode/refresh_s to be preserved.
        """
        # Ensure state loaded
        if self._state is None:
            await self.async_load()

        if not device.device_id:
            device.device_id = "reterminal_e1001"

        existing = self.get_device(device.device_id)
        if existing and not device.api_token:
            device.api_token = existing.api_token

        device.ensure_pages()
        self.state.devices[device.device_id] = device
        # Track this as the last active layout
        self.state.last_active_layout_id = device.device_id
        await self.async_save()
        return device