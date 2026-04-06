from __future__ import annotations

import ipaddress
import logging
import socket
from dataclasses import dataclass
from http import HTTPStatus
from pathlib import Path, PurePosixPath
from typing import Any, Callable
from urllib.parse import urljoin, urlparse

import aiohttp
from aiohttp import web
from homeassistant.core import HomeAssistant

from ..const import API_BASE_PATH
from .base import DesignerBaseView

_LOGGER = logging.getLogger(__name__)
_MAX_RSS_REDIRECTS = 5
_ALLOWED_IMAGE_ROOTS = (
    Path("esphome") / "image",
    Path("esphome") / "images",
    Path("esphome_designer") / "image",
    Path("esphome_designer") / "images",
    Path("www"),
)


def _get_allowed_image_roots(config_dir: str | Path) -> tuple[Path, ...]:
    base_dir = Path(config_dir).resolve()
    return tuple((base_dir / relative_root).resolve() for relative_root in _ALLOWED_IMAGE_ROOTS)


def _resolve_image_path(config_dir: str | Path, raw_path: str | None) -> Path | None:
    """Resolve an image path strictly within known ESPHome image directories."""
    if not raw_path:
        return None

    requested = raw_path.strip()
    if not requested or "\x00" in requested:
        return None

    if requested.startswith("/local/"):
        posix_path = PurePosixPath("www") / PurePosixPath(requested.removeprefix("/local/"))
    elif requested.startswith("/"):
        if not requested.startswith("/config/"):
            return None
        posix_path = PurePosixPath(requested.removeprefix("/config/"))
    else:
        posix_path = PurePosixPath(requested)

    if any(part in ("", ".", "..") for part in posix_path.parts):
        return None

    relative_path = Path(*posix_path.parts)
    config_base = Path(config_dir).resolve()
    allowed_roots = _get_allowed_image_roots(config_base)

    explicit_candidate = (config_base / relative_path).resolve()
    for root in allowed_roots:
        try:
            explicit_candidate.relative_to(root)
        except ValueError:
            continue
        if explicit_candidate.exists() and explicit_candidate.is_file():
            return explicit_candidate

    for root in allowed_roots:
        candidate = (root / relative_path).resolve()
        try:
            candidate.relative_to(root)
        except ValueError:
            continue
        if candidate.exists() and candidate.is_file():
            return candidate

    return None


def _is_public_ip_address(address: str) -> bool:
    ip = ipaddress.ip_address(address)
    return not (
        ip.is_private
        or ip.is_loopback
        or ip.is_link_local
        or ip.is_multicast
        or ip.is_unspecified
        or ip.is_reserved
        or getattr(ip, "is_site_local", False)
    )


@dataclass(frozen=True)
class _ResolvedRssTarget:
    """Resolved public RSS target pinned to validated IP addresses."""

    url: str
    hostname: str
    port: int
    addresses: tuple[str, ...]


class _PinnedResolver:
    """Resolver that only returns the already-validated address set."""

    def __init__(self, hostname: str, addresses: tuple[str, ...]) -> None:
        self._hostname = hostname.lower()
        self._addresses = addresses

    async def resolve(self, host: str, port: int = 0, family: int = socket.AF_UNSPEC) -> list[dict[str, Any]]:
        normalized_host = host.lower()
        if normalized_host != self._hostname:
            raise OSError(f"unexpected_host:{host}")

        results = []
        for address in self._addresses:
            ip = ipaddress.ip_address(address)
            results.append({
                "hostname": host,
                "host": address,
                "port": port,
                "family": socket.AF_INET6 if ip.version == 6 else socket.AF_INET,
                "proto": 0,
                "flags": socket.AI_NUMERICHOST,
            })
        return results

    async def close(self) -> None:
        return None


def _resolve_public_rss_target(
    raw_url: str | None,
    resolver: Callable[..., list[tuple[Any, ...]]] = socket.getaddrinfo,
) -> tuple[_ResolvedRssTarget | None, str]:
    """Resolve a URL to a pinned set of public IP addresses."""
    if not raw_url:
        return None, "missing_url"

    try:
        parsed = urlparse(raw_url)
    except ValueError:
        return None, "invalid_url"

    if parsed.scheme not in ("http", "https"):
        return None, "unsupported_scheme"
    if not parsed.hostname:
        return None, "missing_host"
    if parsed.username or parsed.password:
        return None, "credentials_not_allowed"

    hostname = parsed.hostname.lower()
    if hostname in {"localhost", "localhost.localdomain"} or hostname.endswith(".local") or hostname.endswith(".internal"):
        return None, "private_host_blocked"

    port = parsed.port or (443 if parsed.scheme == "https" else 80)

    try:
        direct_ip = ipaddress.ip_address(hostname)
    except ValueError:
        try:
            addrinfo = resolver(
                hostname,
                port,
                type=socket.SOCK_STREAM,
            )
        except OSError:
            return None, "dns_resolution_failed"

        resolved_addresses = tuple(
            sorted({info[4][0] for info in addrinfo if info and len(info) > 4 and info[4]})
        )
        if not resolved_addresses:
            return None, "dns_resolution_failed"

        for address in resolved_addresses:
            if not _is_public_ip_address(address):
                return None, "private_host_blocked"
    else:
        if not _is_public_ip_address(str(direct_ip)):
            return None, "private_host_blocked"
        resolved_addresses = (str(direct_ip),)

    return _ResolvedRssTarget(
        url=raw_url,
        hostname=hostname,
        port=port,
        addresses=resolved_addresses,
    ), ""


def _validate_public_rss_url(
    raw_url: str | None,
    resolver: Callable[..., list[tuple[Any, ...]]] = socket.getaddrinfo,
) -> tuple[bool, str]:
    """Allow only http(s) feeds that resolve to public IP space."""
    target, error = _resolve_public_rss_target(raw_url, resolver=resolver)
    return target is not None, error


def _build_pinned_connector(target: _ResolvedRssTarget) -> Any:
    """Build an aiohttp connector pinned to the validated address set."""
    return aiohttp.TCPConnector(
        resolver=_PinnedResolver(target.hostname, target.addresses),
        use_dns_cache=False,
        ttl_dns_cache=0,
        force_close=True,
    )


async def _fetch_rss_text(
    url: str,
    resolver: Callable[..., list[tuple[Any, ...]]] = socket.getaddrinfo,
) -> tuple[int, str]:
    """Fetch RSS text while validating each redirect target."""
    timeout = aiohttp.ClientTimeout(total=10)
    current_url = url

    for _ in range(_MAX_RSS_REDIRECTS + 1):
        target, error = _resolve_public_rss_target(current_url, resolver=resolver)
        if target is None:
            raise ValueError(error)

        connector = _build_pinned_connector(target)
        async with aiohttp.ClientSession(timeout=timeout, connector=connector) as session:
            async with session.get(target.url, timeout=10, allow_redirects=False) as response:
                if response.status in {301, 302, 303, 307, 308}:
                    location = response.headers.get("Location")
                    if not location:
                        raise ValueError("redirect_missing_location")
                    current_url = urljoin(current_url, location)
                    continue

                return response.status, await response.text()

    raise ValueError("too_many_redirects")


class ReTerminalImageProxyView(DesignerBaseView):
    """Proxy ESPHome images from known image roots for editor preview."""

    url = f"{API_BASE_PATH}/image_proxy"
    name = "api:esphome_designer_image_proxy"

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass

    async def get(self, request) -> web.Response:
        """Serve an image file from approved ESPHome image directories."""
        path = request.query.get("path")
        if not path:
            return self._add_pna_headers(web.Response(status=HTTPStatus.BAD_REQUEST), request)

        filepath = _resolve_image_path(self.hass.config.config_dir, path)
        if filepath is None:
            _LOGGER.warning("Blocked image proxy path outside allowed roots: %s", path)
            return self._add_pna_headers(web.Response(status=HTTPStatus.FORBIDDEN), request)

        if not filepath.exists():
            _LOGGER.warning("Image not found for proxy: %s", path)
            return self._add_pna_headers(web.Response(status=HTTPStatus.NOT_FOUND), request)

        return self._add_pna_headers(web.FileResponse(filepath), request)


class ReTerminalRssProxyView(DesignerBaseView):
    """Proxy public RSS feeds and convert them to JSON for ESPHome."""

    url = f"{API_BASE_PATH}/rss_proxy"
    name = "api:esphome_designer_rss_proxy"

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass

    async def get(self, request) -> Any:
        import random
        import xml.etree.ElementTree as ET

        url = request.query.get("url")
        random_quote = request.query.get("random") == "true"
        try:
            count = min(int(request.query.get("count", "1")), 10)
        except ValueError:
            count = 1

        if not url:
            return self._add_pna_headers(web.Response(status=HTTPStatus.BAD_REQUEST), request)

        is_allowed, error = _validate_public_rss_url(url)
        if not is_allowed:
            _LOGGER.warning("Blocked RSS proxy URL '%s': %s", url, error)
            return self.json({"success": False, "error": error}, HTTPStatus.FORBIDDEN, request=request)

        try:
            status_code, content = await _fetch_rss_text(url)
            if status_code != 200:
                return self.json(
                    {"success": False, "error": f"RSS source returned {status_code}"},
                    status_code,
                    request=request,
                )

            # Run XML parsing in executor to avoid blocking the loop.
            def parse_rss(xml_content: str) -> list[dict[str, str]] | dict[str, str] | None:
                try:
                    root = ET.fromstring(xml_content)
                    items = root.findall(".//item")
                    if not items:
                        return None

                    if random_quote:
                        random.shuffle(items)

                    selected_items = items[:count]
                    results = []
                    for item in selected_items:
                        description = item.find("description")
                        title = item.find("title")

                        quote_text = description.text if description is not None else "No quote found"
                        author_text = title.text if title is not None else "Unknown"
                        quote_text = quote_text.strip().strip('"')

                        results.append({
                            "quote": quote_text,
                            "author": author_text,
                        })

                    if not results:
                        return None

                    return results[0] if count == 1 else results
                except Exception as exc:  # noqa: BLE001
                    _LOGGER.error("XML Parse error: %s", exc)
                    return None

            result = await self.hass.async_add_executor_job(parse_rss, content)
            if result is None:
                return self.json(
                    {"success": False, "error": "Failed to parse RSS feed or no items found"},
                    200,
                    request=request,
                )

            response_data = {"success": True}
            if count == 1:
                response_data["quote"] = result
            else:
                response_data["quotes"] = result

            return self.json(response_data, 200, request=request)
        except ValueError as exc:
            _LOGGER.warning("Blocked RSS proxy redirect for '%s': %s", url, exc)
            return self.json({"success": False, "error": str(exc)}, HTTPStatus.FORBIDDEN, request=request)
        except Exception as exc:  # noqa: BLE001
            _LOGGER.error("RSS Proxy error: %s", exc)
            return self.json({"success": False, "error": str(exc)}, 500, request=request)
