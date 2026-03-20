# Copilot Instructions

- Before finishing a change that touches `custom_components/esphome_designer/frontend/**`, `vite.config.js`, `custom_components/esphome_designer/frontend/vite.config.js`, or `package.json`, run `npm run verify:dist` and keep `custom_components/esphome_designer/frontend/dist` in sync with source changes.
- Before finalizing non-trivial changes, run `npm run verify:pre-push -- --skip-hassfest` at minimum.
- If Docker is available, prefer `npm run verify:pre-push` so Hassfest is checked locally before push.