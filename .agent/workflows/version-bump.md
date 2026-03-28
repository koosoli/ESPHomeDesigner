---
description: How to bump the project version for a new release
---

# Version Bump Workflow

// turbo-all

## Steps

1. Update the `version` field in `package.json` to the new version string.

2. Update the `version` field in `custom_components/esphome_designer/manifest.json` to the same version string.

3. Update the GUI version label in `custom_components/esphome_designer/frontend/js/ui/components/header.html` (the `<small>` tag showing e.g. `v1.0.0 RC8.x`).

4. Add a new release entry at the top of `release_notes.md` following the existing format (title, date, sections).

5. Run ESLint on any modified source files to confirm no syntax errors:
```
npx eslint custom_components/esphome_designer/frontend/js/io/adapters/yaml_generator.js
```

6. Run the full test suite to confirm no regressions:
```
npm run test
```

7. **CRITICAL: Rebuild the production bundle.** This step is MANDATORY and must NEVER be skipped. The `dist/` folder must be regenerated so that Home Assistant add-on users receive the updated frontend:
```
npm run build
```

8. Verify the build completed successfully and the `dist/` directory was updated.

9. List all modified files for the user so they know what to commit and push.
