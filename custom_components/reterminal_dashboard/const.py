"""
Constants for the reTerminal Dashboard Designer integration.
"""

DOMAIN = "reterminal_dashboard"

# Storage
STORAGE_KEY = DOMAIN
STORAGE_VERSION = 1

# Image / layout defaults for reTerminal E1001
IMAGE_WIDTH = 800
IMAGE_HEIGHT = 480

# Config keys
CONF_DEVICE_ID = "device_id"
CONF_DEVICE_NAME = "device_name"
CONF_API_TOKEN = "api_token"
CONF_PAGES = "pages"

# Service names
SERVICE_SET_PAGE = "set_page"
SERVICE_NEXT_PAGE = "next_page"
SERVICE_PREV_PAGE = "prev_page"

# HTTP API paths (joined with /api/)
API_BASE_PATH = f"/api/{DOMAIN}"
API_IMAGE_PATH = f"{API_BASE_PATH}" + "/{device_id}/page/{page_index}/image.png"
API_LAYOUT_PATH = f"{API_BASE_PATH}" + "/{device_id}/layout"
API_LAYOUT_PAGE_PATH = f"{API_BASE_PATH}" + "/{device_id}/page/{page_index}"

# Defaults
DEFAULT_PAGES = 1
MIN_PAGES = 1
MAX_PAGES = 8

# Security / tokens
# Per-device token length; tokens are generated and stored by the integration, not user-provided.
API_TOKEN_BYTES = 16