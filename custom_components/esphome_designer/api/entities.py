from __future__ import annotations

import logging
from typing import Any

from homeassistant.core import HomeAssistant

from ..const import API_BASE_PATH
from .base import DesignerBaseView

_LOGGER = logging.getLogger(__name__)

class ReTerminalEntitiesView(DesignerBaseView):
    """Expose a filtered list of Home Assistant entities for the editor entity picker."""

    url = f"{API_BASE_PATH}/entities"
    name = "api:esphome_designer_entities"

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass

    async def get(self, request) -> Any:
        """Return a compact list of entities."""
        domains = request.query.get("domains", "").split(",") if request.query.get("domains") else []
        search = request.query.get("search", "").lower()

        entities = []
        for state in self.hass.states.async_all():
            if domains and state.domain not in domains:
                continue
            
            # Simple substring filters
            if search and search not in state.entity_id.lower() and \
               search not in state.attributes.get("friendly_name", "").lower():
                continue

            entities.append({
                "entity_id": state.entity_id,
                "friendly_name": state.attributes.get("friendly_name", state.entity_id),
                "state": state.state,
                "domain": state.domain,
                "unit": state.attributes.get("unit_of_measurement"),
                "icon": state.attributes.get("icon"),
                "attributes": dict(state.attributes)  # Include full attributes for preview
            })

            if len(entities) >= 5000: # Safety cap
                break

        return self.json(entities, request=request)
