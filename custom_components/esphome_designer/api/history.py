"""History API proxy for ESPHome Designer."""
from __future__ import annotations

import logging
from datetime import datetime, timedelta, timezone
from typing import Any

from aiohttp import web
from homeassistant.core import HomeAssistant

from ..const import API_BASE_PATH
from .base import DesignerBaseView

_LOGGER = logging.getLogger(__name__)


class HistoryProxyView(DesignerBaseView):
    """Proxy endpoint for fetching entity history.
    
    This allows the frontend to fetch history without needing a separate
    auth token, since the backend has access to Home Assistant internals.
    """

    url = f"{API_BASE_PATH}/history/{{entity_id}}"
    name = "api:esphome_designer_history"

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass

    async def get(self, request: web.Request) -> Any:
        """Fetch history for an entity."""
        entity_id = request.match_info.get("entity_id", "")
        if not entity_id:
            return self.json({"error": "entity_id required"}, status_code=400, request=request)

        # Parse duration from query params (default 24h)
        duration_str = request.query.get("duration", "24h")
        duration_seconds = self._parse_duration(duration_str)
        
        start_time = datetime.now(timezone.utc) - timedelta(seconds=duration_seconds)
        end_time = datetime.now(timezone.utc)

        _LOGGER.debug("Fetching history for %s (duration=%s, start=%s)", entity_id, duration_str, start_time)

        try:
            # Try the new async history API first (HA 2023.5+)
            states = await self._get_history_async(entity_id, start_time, end_time)
            return self.json(states, request=request)

        except Exception as err:
            _LOGGER.error("Fatal error in HistoryProxyView for %s: %s", entity_id, err, exc_info=True)
            return self.json({"error": str(err)}, status_code=500, request=request)

    async def _get_history_async(self, entity_id: str, start_time: datetime, end_time: datetime) -> list:
        """Get history using HA's async history API."""
        try:
            # Try importing from recorder.history (HA 2023+)
            from homeassistant.components.recorder.history import get_significant_states
            from homeassistant.components.recorder import get_instance
            
            recorder = get_instance(self.hass)
            if not recorder:
                _LOGGER.debug("Recorder not found/not ready yet, using fallback for %s", entity_id)
                raise ImportError("Recorder not found")
            
            # Use the async wrapper for get_significant_states
            history_data = await recorder.async_add_executor_job(
                get_significant_states,
                self.hass,
                start_time,
                end_time,
                [entity_id],  # entity_ids as list
                None,  # filters
                True,  # include_start_time_state
                False,  # significant_changes_only  
                True,   # minimal_response
                True,   # no_attributes
            )
            
            return self._format_history(history_data, entity_id)
            
        except (ImportError, TypeError, AttributeError) as err:
            _LOGGER.debug("get_significant_states unavailable or failed (%s), trying alternate method for %s", err, entity_id)
            
            # Fallback: Try state_changes_during_period with newer signature
            try:
                from homeassistant.components.recorder.history import state_changes_during_period
                from homeassistant.components.recorder import get_instance
                
                recorder = get_instance(self.hass)
                if not recorder:
                    raise ImportError("Recorder still missing")

                history_data = await recorder.async_add_executor_job(
                    state_changes_during_period,
                    self.hass,
                    start_time,
                    end_time,
                    entity_id,
                    True,   # no_attributes
                    False,  # descending
                    None,   # limit
                    True,   # include_start_time_state
                )
                
                return self._format_history(history_data, entity_id)
                
            except Exception as inner_err:
                _LOGGER.debug("state_changes_during_period also failed (%s) for %s, using current state fallback", inner_err, entity_id)
                
                # Final fallback: just return current state as single-item history
                try:
                    state = self.hass.states.get(entity_id)
                    if state:
                        return [{
                            "state": state.state,
                            "last_changed": state.last_changed.isoformat() if state.last_changed else None,
                            "last_updated": state.last_updated.isoformat() if state.last_updated else None,
                        }]
                except Exception as final_err:
                    _LOGGER.error("Failed to even get current state for %s: %s", entity_id, final_err)
                
                return []

    def _format_history(self, history_data: dict, entity_id: str) -> list:
        """Format history data to a simple list of state objects."""
        states = []
        if entity_id in history_data:
            for state in history_data[entity_id]:
                states.append({
                    "state": state.state,
                    "last_changed": state.last_changed.isoformat() if state.last_changed else None,
                    "last_updated": state.last_updated.isoformat() if state.last_updated else None,
                })
        return states

    def _parse_duration(self, duration_str: str) -> int:
        """Parse duration string like '24h', '1d', '30m' to seconds."""
        try:
            if duration_str.endswith('s'):
                return int(duration_str[:-1])
            elif duration_str.endswith('m'):
                return int(duration_str[:-1]) * 60
            elif duration_str.endswith('h'):
                return int(duration_str[:-1]) * 3600
            elif duration_str.endswith('d'):
                return int(duration_str[:-1]) * 86400
            else:
                return int(duration_str)
        except (ValueError, TypeError):
            return 86400  # Default to 24 hours
