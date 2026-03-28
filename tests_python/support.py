from __future__ import annotations

import importlib.util
import json
import sys
import types
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PACKAGE_ROOT = ROOT / "custom_components" / "esphome_designer"


class FakeResponse:
    def __init__(self, body="", status=200, content_type="application/json", text=None, headers=None):
        self.body = text if text is not None and body == "" else body
        self.status = status
        self.content_type = content_type
        self.headers = headers or {}


class FakeFileResponse(FakeResponse):
    def __init__(self, path, status=200, content_type="application/octet-stream", headers=None):
        super().__init__(body="", status=status, content_type=content_type, headers=headers)
        self.path = str(path)


class FakeSchema:
    def __init__(self, schema):
        self.schema = dict(schema)

    def extend(self, extra):
        return FakeSchema({**self.schema, **dict(extra)})

    def __call__(self, value):
        return value


class FakeServiceRegistry:
    def __init__(self):
        self.registrations = {}

    def async_register(self, domain, service, handler, schema=None):
        self.registrations[(domain, service)] = {
            "handler": handler,
            "schema": schema,
        }

    def has_service(self, domain, service):
        return (domain, service) in self.registrations

    def async_remove(self, domain, service):
        self.registrations.pop((domain, service), None)


class FakeHass:
    def __init__(self, config_dir=None):
        self.data = {}
        self.services = FakeServiceRegistry()
        self.created_tasks = []
        base_dir = Path(config_dir or ROOT)
        self.config = types.SimpleNamespace(
            config_dir=str(base_dir),
            path=lambda *parts: str(base_dir.joinpath(*parts)),
        )
        self.states = types.SimpleNamespace(get=lambda entity_id: None)

    def async_create_task(self, coro):
        self.created_tasks.append(coro)
        return coro

    async def async_add_executor_job(self, func, *args):
        return func(*args)


class FakeServiceCall:
    def __init__(self, data=None):
        self.data = data or {}


class FakeStore:
    load_map = {}
    instances = []

    def __init__(self, hass, version, key):
        self.hass = hass
        self.version = version
        self.key = key
        self.saved_payloads = []
        FakeStore.instances.append(self)

    @classmethod
    def reset(cls):
        cls.load_map = {}
        cls.instances = []

    async def async_load(self):
        return self.load_map.get(self.key)

    async def async_save(self, data):
        self.saved_payloads.append(data)


def _module_from_path(module_name: str, path: Path, *, is_package: bool = False):
    search_locations = [str(path.parent)] if is_package else None
    spec = importlib.util.spec_from_file_location(
        module_name,
        path,
        submodule_search_locations=search_locations,
    )
    module = importlib.util.module_from_spec(spec)
    sys.modules[module_name] = module
    assert spec and spec.loader
    spec.loader.exec_module(module)
    return module


def _install_stub_modules():
    homeassistant = types.ModuleType("homeassistant")
    homeassistant.__path__ = []

    core = types.ModuleType("homeassistant.core")
    core.HomeAssistant = FakeHass
    core.ServiceCall = FakeServiceCall

    helpers = types.ModuleType("homeassistant.helpers")
    helpers.__path__ = []

    storage = types.ModuleType("homeassistant.helpers.storage")
    storage.Store = FakeStore

    config_validation = types.ModuleType("homeassistant.helpers.config_validation")
    config_validation.string = lambda value: value
    config_validation.positive_int = lambda value: value

    json_helpers = types.ModuleType("homeassistant.helpers.json")
    json_helpers.json_dumps = json.dumps

    components = types.ModuleType("homeassistant.components")
    components.__path__ = []

    http = types.ModuleType("homeassistant.components.http")
    http.HomeAssistantView = type("HomeAssistantView", (), {})

    aiohttp = types.ModuleType("aiohttp")
    web = types.ModuleType("aiohttp.web")
    web.Response = FakeResponse
    web.FileResponse = FakeFileResponse
    web.Request = type("Request", (), {})
    aiohttp.web = web
    aiohttp.ClientSession = type("ClientSession", (), {})
    aiohttp.ClientTimeout = lambda total=None: {"total": total}

    voluptuous = types.ModuleType("voluptuous")
    voluptuous.Required = lambda key: key
    voluptuous.Schema = FakeSchema

    sys.modules["homeassistant"] = homeassistant
    sys.modules["homeassistant.core"] = core
    sys.modules["homeassistant.helpers"] = helpers
    sys.modules["homeassistant.helpers.storage"] = storage
    sys.modules["homeassistant.helpers.config_validation"] = config_validation
    sys.modules["homeassistant.helpers.json"] = json_helpers
    sys.modules["homeassistant.components"] = components
    sys.modules["homeassistant.components.http"] = http
    sys.modules["aiohttp"] = aiohttp
    sys.modules["aiohttp.web"] = web
    sys.modules["voluptuous"] = voluptuous


def load_integration_modules():
    FakeStore.reset()

    prefixes = [
        "custom_components.esphome_designer.api.import_export",
        "custom_components.esphome_designer.api.layout",
        "custom_components.esphome_designer.api.proxy",
        "custom_components.esphome_designer.api.history",
        "custom_components.esphome_designer.api.base",
        "custom_components.esphome_designer.services",
        "custom_components.esphome_designer.storage",
        "custom_components.esphome_designer.models",
        "custom_components.esphome_designer.yaml_parser",
        "custom_components.esphome_designer.const",
        "custom_components.esphome_designer.api",
        "custom_components.esphome_designer",
        "custom_components",
    ]
    for name in list(sys.modules):
        if any(name == prefix or name.startswith(f"{prefix}.") for prefix in prefixes):
            sys.modules.pop(name, None)

    _install_stub_modules()

    custom_components = types.ModuleType("custom_components")
    custom_components.__path__ = [str(ROOT / "custom_components")]
    integration_pkg = types.ModuleType("custom_components.esphome_designer")
    integration_pkg.__path__ = [str(PACKAGE_ROOT)]
    api_pkg = types.ModuleType("custom_components.esphome_designer.api")
    api_pkg.__path__ = [str(PACKAGE_ROOT / "api")]

    sys.modules["custom_components"] = custom_components
    sys.modules["custom_components.esphome_designer"] = integration_pkg
    sys.modules["custom_components.esphome_designer.api"] = api_pkg

    const = _module_from_path("custom_components.esphome_designer.const", PACKAGE_ROOT / "const.py")
    models = _module_from_path("custom_components.esphome_designer.models", PACKAGE_ROOT / "models.py")
    yaml_parser = _module_from_path(
        "custom_components.esphome_designer.yaml_parser",
        PACKAGE_ROOT / "yaml_parser" / "__init__.py",
        is_package=True,
    )
    storage = _module_from_path("custom_components.esphome_designer.storage", PACKAGE_ROOT / "storage.py")
    services = _module_from_path("custom_components.esphome_designer.services", PACKAGE_ROOT / "services.py")
    base = _module_from_path("custom_components.esphome_designer.api.base", PACKAGE_ROOT / "api" / "base.py")
    layout = _module_from_path("custom_components.esphome_designer.api.layout", PACKAGE_ROOT / "api" / "layout.py")
    import_export = _module_from_path("custom_components.esphome_designer.api.import_export", PACKAGE_ROOT / "api" / "import_export.py")
    proxy = _module_from_path("custom_components.esphome_designer.api.proxy", PACKAGE_ROOT / "api" / "proxy.py")
    history = _module_from_path("custom_components.esphome_designer.api.history", PACKAGE_ROOT / "api" / "history.py")

    return {
        "const": const,
        "models": models,
        "yaml_parser": yaml_parser,
        "storage": storage,
        "services": services,
        "base": base,
        "layout": layout,
        "import_export": import_export,
        "proxy": proxy,
        "history": history,
        "FakeStore": FakeStore,
        "FakeResponse": FakeResponse,
        "FakeHass": FakeHass,
        "FakeServiceCall": FakeServiceCall,
    }
