# Plugin Structure

Use this layout for large plugins:

- `plugin.js`: small orchestrator with metadata, defaults, and property-panel wiring
- `render.js`: preview-only DOM rendering
- `exports.js`: YAML/LVGL/export helpers
- `shared.js`: helpers reused by render and export paths

Guidelines:

- Keep `plugin.js` focused on registration and editor wiring.
- Put side-effect-free helpers in `shared.js` so render and export code do not diverge.
- When refactoring an existing monolith, move preview rendering first, then export helpers.
- Avoid adding new `@ts-nocheck` files when splitting modules.
