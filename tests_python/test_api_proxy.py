from __future__ import annotations

import json
import tempfile
import unittest
from pathlib import Path
from urllib.parse import urlparse

from support import FakeHass, load_integration_modules


class FakeQueryRequest:
    def __init__(self, query=None, headers=None):
        self.query = query or {}
        self.headers = headers or {}


class FakeRssResponse:
    def __init__(self, status=200, headers=None, text="<rss />"):
        self.status = status
        self.headers = headers or {}
        self._text = text

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc, tb):
        return False

    async def text(self):
        return self._text


class FakeRequestContext:
    def __init__(self, connector, url, request_log):
        self.connector = connector
        self.url = url
        self.request_log = request_log

    async def __aenter__(self):
        parsed = urlparse(self.url)
        port = parsed.port or (443 if parsed.scheme == "https" else 80)
        resolved = await self.connector.resolver.resolve(parsed.hostname, port)
        self.request_log.append(resolved)
        return FakeRssResponse()

    async def __aexit__(self, exc_type, exc, tb):
        return False


class FakeTcpConnector:
    def __init__(self, *, resolver=None, **kwargs):
        self.resolver = resolver
        self.kwargs = kwargs

    async def close(self):
        if self.resolver is not None:
            await self.resolver.close()


class FakeClientSession:
    request_log = []

    def __init__(self, *args, connector=None, **kwargs):
        self.connector = connector

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc, tb):
        if self.connector is not None:
            await self.connector.close()
        return False

    def get(self, url, timeout=None, allow_redirects=False):
        return FakeRequestContext(self.connector, url, self.request_log)


class ProxyApiTests(unittest.IsolatedAsyncioTestCase):
    def setUp(self):
        modules = load_integration_modules()
        self.proxy_module = modules["proxy"]

    def test_resolve_image_path_allows_known_image_roots(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            image_path = Path(tmpdir) / "esphome" / "images" / "logo.png"
            image_path.parent.mkdir(parents=True)
            image_path.write_text("png", encoding="utf-8")

            resolved = self.proxy_module._resolve_image_path(tmpdir, "/config/esphome/images/logo.png")

            self.assertEqual(resolved, image_path.resolve())

    def test_resolve_image_path_rejects_arbitrary_config_reads(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            secret_path = Path(tmpdir) / "secrets.yaml"
            secret_path.write_text("api_key: secret", encoding="utf-8")

            resolved = self.proxy_module._resolve_image_path(tmpdir, "/config/secrets.yaml")

            self.assertIsNone(resolved)

    async def test_image_proxy_returns_forbidden_for_paths_outside_allowed_roots(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            secret_path = Path(tmpdir) / "secrets.yaml"
            secret_path.write_text("api_key: secret", encoding="utf-8")
            hass = FakeHass(config_dir=tmpdir)
            view = self.proxy_module.ReTerminalImageProxyView(hass)

            response = await view.get(FakeQueryRequest(query={"path": "/config/secrets.yaml"}))

            self.assertEqual(response.status, 403)

    def test_validate_public_rss_url_rejects_private_targets(self):
        ok, error = self.proxy_module._validate_public_rss_url("http://127.0.0.1/feed.xml")

        self.assertFalse(ok)
        self.assertEqual(error, "private_host_blocked")

    def test_validate_public_rss_url_allows_public_dns_results(self):
        def resolver(_host, _port, type=None):
            return [(None, None, None, None, ("93.184.216.34", 80))]

        ok, error = self.proxy_module._validate_public_rss_url("https://example.com/feed.xml", resolver=resolver)

        self.assertTrue(ok)
        self.assertEqual(error, "")

    def test_validate_public_rss_url_rejects_private_dns_results(self):
        def resolver(_host, _port, type=None):
            return [(None, None, None, None, ("192.168.1.10", 80))]

        ok, error = self.proxy_module._validate_public_rss_url("https://feeds.example.com/feed.xml", resolver=resolver)

        self.assertFalse(ok)
        self.assertEqual(error, "private_host_blocked")

    async def test_rss_proxy_rejects_private_targets_before_fetch(self):
        hass = FakeHass()
        view = self.proxy_module.ReTerminalRssProxyView(hass)

        response = await view.get(FakeQueryRequest(query={"url": "http://127.0.0.1/feed.xml"}))

        self.assertEqual(response.status, 403)
        self.assertEqual(json.loads(response.body), {"success": False, "error": "private_host_blocked"})

    async def test_fetch_rss_text_pins_validated_dns_results_for_the_actual_request(self):
        dns_calls = []

        def resolver(_host, _port, type=None):
            dns_calls.append((_host, _port))
            if len(dns_calls) == 1:
                return [(None, None, None, None, ("93.184.216.34", _port))]
            return [(None, None, None, None, ("127.0.0.1", _port))]

        original_client_session = self.proxy_module.aiohttp.ClientSession
        original_tcp_connector = getattr(self.proxy_module.aiohttp, "TCPConnector", None)
        FakeClientSession.request_log = []
        self.proxy_module.aiohttp.ClientSession = FakeClientSession
        self.proxy_module.aiohttp.TCPConnector = FakeTcpConnector
        try:
            status, content = await self.proxy_module._fetch_rss_text(
                "https://example.com/feed.xml",
                resolver=resolver,
            )
        finally:
            self.proxy_module.aiohttp.ClientSession = original_client_session
            if original_tcp_connector is None:
                delattr(self.proxy_module.aiohttp, "TCPConnector")
            else:
                self.proxy_module.aiohttp.TCPConnector = original_tcp_connector

        self.assertEqual(status, 200)
        self.assertEqual(content, "<rss />")
        self.assertEqual(dns_calls, [("example.com", 443)])
        self.assertEqual(FakeClientSession.request_log[0][0]["host"], "93.184.216.34")
