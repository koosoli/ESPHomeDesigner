from __future__ import annotations

import json
import tempfile
import types
import unittest
import warnings
from pathlib import Path
from urllib.parse import urlparse

try:
    from aiohttp import web
    from aiohttp.test_utils import TestClient, TestServer
    from homeassistant.helpers.http import KEY_AUTHENTICATED

    from custom_components.esphome_designer.api.layout import ReTerminalLayoutsListView
    from custom_components.esphome_designer.panel import (
        ESPHomeDesignerPanelView,
        ESPHomeDesignerStaticView,
        get_panel_module_url,
    )
    from custom_components.esphome_designer.api.hardware import ReTerminalHardwarePackageView
    HAS_HTTP_PANEL_TEST_DEPS = True
except ModuleNotFoundError:
    HAS_HTTP_PANEL_TEST_DEPS = False


class _FakeStorage:
    def __init__(self) -> None:
        self._state = types.SimpleNamespace(last_active_layout_id="layout_1")

    async def async_list_layouts(self):
        return [{"id": "layout_1", "name": "Main", "page_count": 1}]


def _build_hass() -> types.SimpleNamespace:
    tempdir = tempfile.TemporaryDirectory()

    def _path(*parts: str) -> str:
        return str(Path(tempdir.name).joinpath(*parts))

    hass = types.SimpleNamespace(
        is_stopping=False,
        config=types.SimpleNamespace(
            path=_path,
            config_dir=tempdir.name,
        ),
    )
    hass._tempdir = tempdir
    return hass


def _build_app() -> "web.Application":
    @web.middleware
    async def auth_middleware(request: web.Request, handler):
        if request.headers.get("X-Test-Auth") == "1":
            request[KEY_AUTHENTICATED] = True
        return await handler(request)

    app = web.Application(middlewares=[auth_middleware])
    with warnings.catch_warnings():
        warnings.filterwarnings("ignore", category=web.NotAppKeyWarning)
        app["allow_all_cors"] = None
        app["allow_configured_cors"] = None
    return app


@unittest.skipUnless(HAS_HTTP_PANEL_TEST_DEPS, "aiohttp/http test dependencies are unavailable")
class HttpPanelFlowTests(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        self.hass = _build_hass()
        self.addCleanup(self.hass._tempdir.cleanup)

    async def _make_client(self, *views):
        app = _build_app()
        for view in views:
            view.register(self.hass, app, app.router)
        server = TestServer(app)
        client = TestClient(server)
        await client.start_server()
        self.addAsyncCleanup(client.close)
        return client

    async def test_layouts_api_requires_auth_at_request_level(self):
        client = await self._make_client(
            ReTerminalLayoutsListView(self.hass, _FakeStorage())
        )

        unauth = await client.get("/api/esphome_designer/layouts")
        self.assertEqual(unauth.status, 401)

        auth = await client.get(
            "/api/esphome_designer/layouts",
            headers={"X-Test-Auth": "1"},
        )
        self.assertEqual(auth.status, 200)
        payload = await auth.json()
        self.assertEqual(payload["last_active_layout_id"], "layout_1")
        self.assertEqual(payload["layouts"][0]["id"], "layout_1")

    async def test_panel_view_requires_auth_and_rewrites_cache_busted_assets(self):
        client = await self._make_client(ESPHomeDesignerPanelView(self.hass))

        response = await client.get("/esphome-designer/editor/index.html")
        self.assertEqual(response.status, 200)
        html = await response.text()

        self.assertIn("/esphome-designer/editor/static/dist/assets/", html)
        self.assertIn("?v=", html)
        self.assertIn("Cache-Control", response.headers)

    async def test_built_panel_asset_is_public_and_cache_busted(self):
        client = await self._make_client(ESPHomeDesignerStaticView(self.hass))
        asset_path = urlparse(get_panel_module_url()).path

        asset = await client.get(asset_path)
        self.assertEqual(asset.status, 200)
        self.assertEqual(asset.content_type, "application/javascript")
        self.assertEqual(
            asset.headers.get("Cache-Control"),
            "public, max-age=31536000, immutable",
        )

    async def test_custom_profile_assets_require_auth(self):
        custom_profiles_dir = Path(self.hass.config.path("esphomedesigner_custom_profiles"))
        custom_profiles_dir.mkdir(parents=True, exist_ok=True)
        profile_path = custom_profiles_dir / "test_profile.yaml"
        profile_path.write_text("display:\n  - platform: ili9xxx\n", encoding="utf-8")

        client = await self._make_client(ESPHomeDesignerStaticView(self.hass))
        url = "/esphome-designer/editor/static/esphomedesigner_custom_profiles/test_profile.yaml"

        unauth = await client.get(url)
        self.assertEqual(unauth.status, 401)

        auth = await client.get(url, headers={"X-Test-Auth": "1"})
        self.assertEqual(auth.status, 200)
        self.assertEqual((await auth.text()).splitlines(), ["display:", "  - platform: ili9xxx"])

    async def test_hardware_package_api_requires_auth_and_serves_custom_profile(self):
        custom_profiles_dir = Path(self.hass.config.path("esphomedesigner_custom_profiles"))
        custom_profiles_dir.mkdir(parents=True, exist_ok=True)
        profile_path = custom_profiles_dir / "hello_world_3.yaml"
        profile_path.write_text("display:\n  - platform: ili9xxx\n", encoding="utf-8")

        client = await self._make_client(ReTerminalHardwarePackageView(self.hass))
        url = "/api/esphome_designer/hardware/package?path=esphomedesigner_custom_profiles/hello_world_3.yaml"

        unauth = await client.get(url)
        self.assertEqual(unauth.status, 401)

        auth = await client.get(url, headers={"X-Test-Auth": "1"})
        self.assertEqual(auth.status, 200)
        self.assertEqual(await auth.text(), "display:\n  - platform: ili9xxx\n")
