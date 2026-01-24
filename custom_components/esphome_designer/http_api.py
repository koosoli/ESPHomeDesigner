"""
Main HTTP API entry point for the ESPHome Designer integration.
This module now acts as a facade, importing views from the api/ sub-package.
"""
from __future__ import annotations

import logging
from homeassistant.core import HomeAssistant

from .storage import DashboardStorage
from .api.layout import (
    ReTerminalLayoutView, 
    ReTerminalLayoutsListView, 
    ReTerminalLayoutDetailView
)
from .api.entities import ReTerminalEntitiesView
from .api.proxy import (
    ReTerminalImageProxyView, 
    ReTerminalRssProxyView
)
from .api.import_export import (
    ReTerminalImportSnippetView, 
    ReTerminalLayoutExportView, 
    ReTerminalLayoutImportView
)
from .api.base import DesignerBaseView
from .api.hardware import ReTerminalHardwareListView, ReTerminalHardwareUploadView
from .api.history import HistoryProxyView

_LOGGER = logging.getLogger(__name__)

async def async_register_http_views(hass: HomeAssistant, storage: DashboardStorage) -> None:
    """Register all HTTP views with the Home Assistant application."""
    
    views = [
        # Layouts
        ReTerminalLayoutView(hass, storage),
        ReTerminalLayoutsListView(hass, storage),
        ReTerminalLayoutDetailView(hass, storage),
        
        # Entities & Proxies
        ReTerminalEntitiesView(hass),
        ReTerminalImageProxyView(hass),
        ReTerminalRssProxyView(hass),
        HistoryProxyView(hass),
        
        # Import/Export
        ReTerminalImportSnippetView(hass, storage),
        ReTerminalLayoutExportView(hass, storage),
        ReTerminalLayoutImportView(hass, storage),
        
        # Hardware Profiles
        ReTerminalHardwareListView(hass),
        ReTerminalHardwareUploadView(hass),
    ]

    for view in views:
        hass.http.register_view(view)

    _LOGGER.info("Registered %d ESPHome Designer HTTP views", len(views))
