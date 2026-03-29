# Contributing to ESPHome Designer

Welcome! This project has been modernized to use a modular **Plugin Architecture**. This guide will help you understand how to add features without breaking legacy behavior.

## Project Structure

- **`0.9/`**: Root of the project (contains `package.json`, `vite.config.js`).
- **`custom_components/esphome_designer/frontend/`**: The actual source code.
    - **`features/`**: Contains all widget plugins (e.g., `features/wifi_signal/`).
    - **`js/io/adapters/`**: Orchestration logic (e.g., `esphome_adapter.js`).
    - **`tests/`**: Regression and unit tests.

The root-level **`vite.config.js`** is the authoritative frontend build and test config.

## Development Workflow

### 1. Installation
Run `npm install` in the root directory (`0.9/`).

If you want the full Python panel/auth test matrix locally, install the optional Python test dependencies into your virtualenv once:

```bash
npm run python:deps
```

The Python helper scripts automatically prefer the repository `.venv` when it exists, then fall back to your active Python environment.

### 2. running Tests
We enforce **Strict YAML Parity** with the legacy system. Always run the regression suite before submitting changes:

```bash
npm test
```

`npm test` now verifies the schema hash without rewriting it. If you intentionally changed a schema or snapshot contract, review the diff with:

```bash
npm run schema:check
```

and only then refresh the committed baseline with:

```bash
npm run schema:update
```

For the Python suite, use the same discovery path as the quality gate:

```bash
npm run python:test
```

Before pushing integration changes, run the full local gate:

```bash
npm run quality
```

`npm run quality` is the canonical gate used by CI and the required `test (...)` status checks. It now runs both the broad frontend config check (`TypeScriptBase`) and the stricter opt-in core check (`TypeScript`). If you want to iterate on those locally without the full suite, use:

```bash
npm run typecheck
npm run typecheck:strict
```

For the broader pre-push flow, also run:

```bash
npm run verify:pre-push
```

That adds baseline governance, the dist freshness check, Home Assistant integration metadata verification, and Hassfest via Docker. To enforce it automatically on every push, enable the repository hook once:

```bash
npm run hooks:install
```

If you changed frontend source, Vite config, or anything that affects the shipped UI bundle, you should also be able to pass:

```bash
npm run verify:dist
```

That command verifies `custom_components/esphome_designer/frontend/dist/build-meta.json` against the current frontend sources and the active manifest-backed dist files. It still catches stale frontend bundles, but it will not fail just because a browser upload left behind an old unreferenced hashed asset or because GitHub Actions checked out an equivalent text file with different workspace line endings.

If the GitHub Actions step `Verify committed dist is current` ever fails again, check in this order:

```bash
npm run verify:dist
npm run verify:pre-push:skip-hassfest
npm run release:prepare:skip-hassfest
```

Then confirm that these files were uploaded together:

- `custom_components/esphome_designer/frontend/dist/`
- `custom_components/esphome_designer/frontend/dist/build-meta.json`
- `scripts/dist_build_meta.cjs`
- `scripts/verify_dist_fresh.cjs`

Important: a real failure usually means the shipped dist is stale or incomplete. A false-positive used to happen when CI checked out text files with different line endings than the local upload. The verifier now cross-checks committed `HEAD` in CI to avoid that, so if the step still fails after the commands above, treat it as a real dist-sync problem first.

For manual GitHub uploads and release/version bumps, use:

```bash
npm run release:prepare:skip-hassfest
```

That single command checks the release version surfaces, rebuilds `custom_components/esphome_designer/frontend/dist`, runs the same core checks as CI, and writes `tmp/release-upload-manifest.txt` with the files you must upload. If Docker is running and you want the full local Actions parity including Hassfest, use:

```bash
npm run release:prepare
```

If you changed panel boot, Home Assistant auth, request plumbing, or shipped frontend assets, also run the manual Home Assistant smoke pass in [docs/ha_smoke_checklist.md](docs/ha_smoke_checklist.md) before release.

### 3. Adding a New Widget
Do not modify core files (`yaml_export.js` or `esphome_adapter.js`). Instead:

1.  Create a new directory in `features/` (e.g., `features/my_widget/`).
2.  Create `my_widget_plugin.js`.
3.  Implement the `WidgetPlugin` interface (see `js/io/adapters/esphome_adapter.js` for JSDoc types).

**Example Structure:**
```javascript
const MyWidgetPlugin = {
    id: "my_widget",
    name: "My Widget",
    category: "Custom",
    defaults: { ... },
    export: (w, context) => {
        // Use context.lines.push(...) to emit C++ code
    }
};

if (window.PluginRegistry) {
    window.PluginRegistry.register(MyWidgetPlugin);
}
```

## layout_constants.js
Avoid "magic numbers". Use the shared registry:
```javascript
// helpers/constants (implicit global in plugin context)
// const { LAYOUT } = window;
```

## Release Process
To build the frontend for production/HACS:
```bash
npm run build
```
This outputs assets to `custom_components/esphome_designer/frontend/dist`.

That build also refreshes `custom_components/esphome_designer/frontend/dist/build-meta.json`, which is what CI uses for the committed-dist freshness check.

## Frontend Test Focus

Direct widget/plugin regression tests live under `custom_components/esphome_designer/frontend/tests/features/`.

When you touch export logic, fallback behavior, or plugin-specific rendering, prefer adding or extending a focused test there instead of relying only on broad integration coverage.
