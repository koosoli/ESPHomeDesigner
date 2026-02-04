## v1.0.0 RC1 - The "Grand Cleanup" & Modular Renaissance
**Release Date:** January 28, 2026

> [!CAUTION]
> **🚨 CRITICAL UPDATE INSTRUCTION (For HACS Users)**
> 
> HACS caches the old repository domain (`reterminal_dashboard`). To install this update correctly, you **MUST** perform a clean reinstall:
> 1. In HACS, go to Integrations → Find **ESPHome Designer** (or reTerminal Dashboard) → Click **Wait** (three dots) → **Remove**.
> 2. Go to **Integrations** → **Three dots** (top right) → **Custom repositories**.
> 3. Find `https://github.com/koosoli/ESPHomeDesigner` and **delete it** (Trash icon).
> 4. **Restart Home Assistant** (This is critical to clear the cache).
> 5. Go back to HACS → **Custom repositories** → Re-add `https://github.com/koosoli/ESPHomeDesigner`.
> 6. Install **ESPHome Designer** fresh.
> 
> *Failing to do this will cause HACS to re-download the old version!*

### 🚀 Major Architectural Revolution
- **Plugin-Based Widget Ecosystem:** A complete shift from a 3,800+ line monolithic exporter to a modular registry with **55+ independent widget plugins**. Every widget is now its own self-contained module, making the system faster, more stable, and easier to extend.
- **Backend Modularization:** Massive backend refactor splitting the monolithic `http_api.py` and `yaml_parser.py` into dedicated `api/` and `yaml_parser/` directories. This improves stability and enables complex parsing logic for new platforms.
- **Multi-Platform Rendering (Experimental):**
  - **OpenEpaperLink (OEPL) Integration:** Full support for generating MQTT-based payloads for AP-flashed e-paper tags. Includes automated parsing of OEPL YAML arrays.
  - **Open Display (ODP) v1 Protocol:** Initial support for the Open Display JSON standard for MQTT/HTTP based controllers.
  - **Parsing Parity:** Both OEPL and ODP platforms support "Round-Trip" editing—import your existing payloads back into the designer canvas seamlessly.
- **World View Canvas:** All project pages are now rendered as distinct artboards on a unified infinite stage. View your entire multi-page project at once for pixel-perfect cross-page consistency.
- **Codebase Sanitization:** Removed 1450+ legacy files and consolidated 80+ redundant versions into a single, clean production-ready branch.

### 🎨 GUI & Designer Enhancements
- **Atomic Grouping Engine:** Groups now behave as unified containers. Draggable, resizable, and layer-persistent. Transporting a group between pages now preserves the entire internal hierarchy perfectly.
- **Hierarchy Panel & Layer Management:** 
  - **Full Synchronization:** Perfect real-time sync between the Canvas, the Hierarchy Tree View, and the YAML property editor.
  - **Visual Layer Sorting:** Easily reorder widgets and groups via drag-and-drop in the hierarchy panel.
  - **Relocated Layer Controls:** Quick-access "Front/Back" and "Up/Down" layer adjustment buttons integrated directly into the Hierarchy section.
- **Interactive Precision Tools:** 
  - **Canvas Rulers:** Pixel-accurate rulers that scale with zoom and highlight widget focal points.
  - **Smart Spacing Guides:** Hold `Ctrl` to see real-time distance markers between widgets.
  - **Batch Alignment:** New contextual toolbar for rapid Left/Center/Right/Top/Middle/Bottom alignment and distribution of multiple widgets.
- **Focus Mode:** Custom panning algorithm (`focusPage`) that instantly centers any artboard in the viewport with a single click.
- **Advanced Properties Accordion:** Semantic organization of widget settings (Transform, Appearance, Data, Events) with a redesigned UI for better readability.
- **Refined Artboard Aesthetics:** High-fidelity triple-elevation drop shadows and active-page "lift" effects for a premium design feel.

### 📦 New Specialist Widgets (ODP/Experimental)
- **ODP Arc & Ellipse:** Native vector-based rendering for experimental platforms.
- **ODP Polygon:** Define custom multi-point shapes with fill and stroke control.
- **ODP Icon Sequence:** Easily create status bar sets or navigation rows.
- **ODP Rectangle Pattern:** Advanced tiling for complex backgrounds.
- **ODP Plot:** High-performance sensor history visualization for JSON-based displays.

### 🐛 Bug Fixes & Refinements
- **Viewport Scrollbar Cleanup:** Disabled conflicting native scrollbars in favor of 100% transform-based panning for smoother navigation.
- **Display Lambda Indentation:** Resolved long-standing YAML validation errors caused by inconsistent indentation in hardware recipes.


> [!WARNING]
> **BREAKING CHANGES**
> - **Project Compatibility:** Saved projects from versions prior to 0.9.0 will **not be automatically imported**. We strongly recommend backing up your old project JSON files or YAML snippets before updating.
> - **Branding Rename:** The legacy `reterminal_dashboard` domain has been retired. The integration is now officially **`esphome_designer`**.



---

---

## v0.8.6.1 - Hotfix: Custom Recipe Caching

**Release Date:** January 1, 2026

### 🐛 Bug Fixes
- **Custom Hardware Recipe Updates**: Fixed a critical issue where updating a custom hardware recipe (YAML file) and re-importing it would not reflect changes in the generated output. The system now bypasses browser caching when fetching hardware packages and templates, ensuring edits are immediately applied.
- **Custom Hardware Profile Generation**: Fixed missing `id: my_display`, `offset_height: 0`, and `offset_width: 0` properties in the generated YAML for ST7789V displays.
- **YAML Color Export**: Fixed an issue where custom colors selected via the RGB picker always exported as `COLOR_BLACK`. The exporter now correctly parses hex color codes and generates the appropriate `Color(r, g, b)` constructors in the C++ lambda.


## v0.8.6 - Experimental: Custom Hardware Profiles

**Release Date:** January 1, 2026

### 🚀 New Features
- **[Experimental] Custom Hardware Profiles**: A major new capability allowing you to define your own hardware characteristics (Chip, Display, Touch, Pins) directly within the designer.
  - **Visual Configuration**: No more manual YAML hacking to get a new display working. Configure your Chip (ESP32-S3/C3/C6), Tech (LCD or E-Ink), Resolution, and Pin assignments via a new UI.
  - **Browser Persistence**: In offline mode, your custom profiles are now automatically saved to your browser's `localStorage`, ensuring they survive page refreshes.
  - **Snippet-First Philosophy**: The generated hardware YAML is intelligently commented out for infrastructure sections (`esphome`, `esp32`, etc.), allowing you to safely paste the hardware definitions into your existing configuration.
  - **Auto-Selection**: Newly created profiles are automatically selected and applied to the current session.

### 🐛 Bug Fixes
- **Pin Input Crash**: Fixed a critical `TypeError` when saving custom profiles caused by a missing Touch Reset pin element in the HTML.
- **Improved Dropdown Stability**: Fixed industrial-strength race conditions where the "Custom Profile..." option would disappear or fail to select after a save. Added a robust retry mechanism for profile loading.
- **Safe Input Retrieval**: Implemented a global helper for safe UI value retrieval to prevent crashes if certain hardware elements are missing from the DOM.

## v0.8.5.1 - Hotfix: Calendar & Build Environment

**Release Date:** January 1, 2026

### � New Features
- **RGB Color Selectors for LCD/OLED**: The designer now intelligently switches between a limited color palette (for E-Ink) and a full RGB color mixer for LCD and OLED devices. This is automatically determined based on the hardware profile features.

### �🐛 Bug Fixes
- **Calendar Widget Compiler Errors**: Fixed C++ compilation errors (`return-statement with a value`) and deprecated warnings (`containsKey`) in the Calendar widget. The generation logic was corrected in both the modular feature file and the main `yaml_export.js`.
- **ESP-IDF Environment Tip**: Added a helpful tip to the generated YAML header recommending `framework: version: 5.4.2` for ESP32-S3 devices. This prevents build failures caused by auto-updates to bleeding-edge ESP-IDF versions (like 5.5.1) which may have broken Python environments.

## v0.8.5 - Round Displays & Hardware Expansion

**Release Date:** December 29, 2025

### 🚀 New Features
- **Round Display Support**: Introduced support for round/circular display canvases, including correct coordinate mapping and visual boundaries in the designer.
- **Improved Hardware Expansion**: Added dedicated support and tested hardware recipes for the **WaveShare Universal ESP32 e-Paper Driver Board** paired with the **7.5" v2 display**.
- **Dynamic Orientation**: Updated import logic to respect `# Orientation: portrait/landscape` tags, automatically rotating the canvas to match the device's physical mounting.
- **Resolution & Shape Metadata**: Imported YAML files with `# Resolution: WxH` or `# Shape: round/rect` comments will now automatically resize and reshape the designer canvas to match the hardware.
- **Premium Default Theme for Bars**: The `template_nav_bar` and `template_sensor_bar` widgets now default to a high-contrast white-on-black theme for better readability and a more premium aesthetic.
- **New Hardware Support**: Added support for the **WaveShare Universal ESP32 epaper driver board** and **7.5" v2 display** via hardware recipes. Many thanks to **EmilyNerdGirl** for contributing this recipe!
- **Hardware Recipe Documentation**: Expanded the [Hardware Recipes Guide](https://github.com/koosoli/ESPHomeDesigner/blob/main/hardware_recipes_guide.md) with comprehensive documentation for all supported metadata tags, including `# Orientation`, `# Dark Mode`, and `# Refresh Interval`.
- **Full Conditional Visibility Support**: All widget types now support conditional rendering based on Home Assistant entity states (binary, numeric, text, and range). The designer automatically generates the required Home Assistant sensors and optimized C++ `if` blocks in the display lambda.
- **Improved Smart Condition Logic**: Enhanced sensor state detection for both binary and numeric sensors. The generator now recognizes expanded Home Assistant states like `open`, `locked`, `home`, and `active` as positive (true) values, and provides intelligent fallbacks for numeric sensors using common string labels.


### 🐛 Bug Fixes
- **Custom Resolution Import Fix**: Resolved a critical issue where custom resolutions from hardware recipes were ignored during import, resetting the canvas to 800x480.
- **Inverted Color Metadata**: Added support for the `# Inverted: true/false` metadata tag in imported YAML files, ensuring correct color mapping from the first load.
- **E-Paper Page Cycling Logic**: Refactored the `auto_cycle_timer` to use a robust delay-based loop and ensured the countdown resets on manual page interaction, resolving issues where cycling would stall or trigger unpredictably.
- **Global Variable YAML Compliance**: Fixed ESPHome validation errors by wrapping numeric and boolean `initial_value` fields in quotes, ensuring compatibility with ESPHome 2024.11+.
- **Playfair Display Glyph Fix**: Resolved an issue where the "Playfair Display" font caused ESPHome compilation errors (#105) due to a missing "µ" (micro) glyph. The designer now automatically filters out this character specifically for this font while preserving it for other font families.
- **Line Object YAML Export Fix**: Fixed a critical issue where line objects generated invalid ESPHome YAML (#106). Points are now correctly formatted with `x` and `y` keys, and style properties (`line_opa`, `line_width`, etc.) are properly nested within a `style` block to comply with ESPHome LVGL requirements.
- **LVGL Button & Opacity Fix**: Resolved ESPHome compilation errors (#104) by converting LVGL opacity values to percentages (e.g., `100%`) and correcting the `homeassistant.service` call structure for buttons (adding the missing `data:` block).
- **Temperature & Humidity Sensor Fix**: Resolved issues (#102) where selecting a custom Home Assistant entity for on-device widgets caused "ID not found" errors. Standardized ID generation across all sensors to ensure hardware definitions and display lambdas always match.
- **Local Sensor Hardware Support**: Fixed a bug where selecting "Local / On-Device Sensor" on DIY devices (like TRMNL DIY) failed to generate the required `sht4x` hardware platform, resulting in compilation failures. The designer now automatically includes the necessary hardware configuration if local widgets are used.
- **Trmnl Device Fixes**: Fixed compilation errors for "Trmnl DIY" devices where local temperature/humidity sensors were incorrectly referenced. The system now safely handles cases where local sensors are requested but not supported by the hardware, and correctly sanitizes custom sensor IDs to prevent "Couldn't find ID" errors.
- **Display Lambda Header Injection**: Fixed a critical bug where the `lambda: |-` header was incorrectly omitted if the string was found anywhere else in the file (e.g. in comments or other components). The generator now strictly checks for the header specifically preceding the lambda placeholder, ensuring valid YAML syntax for all display configurations.
- **Widget Visibility Logic Fix**: Resolved a long-standing issue where conditional visibility rules were ignored during YAML export. The implementation now correctly generates re-import metadata (shorthand keys) and ensures sanitized sensor IDs are used throughout the C++ rendering logic.
- **Waveshare 7" LCD Orientation Fix**: Implemented a dynamic package override mechanism to allow rotating the Waveshare 7" LCD (Landscape, Portrait, Inverted). Also added automatic touchscreen `transform` mapping to ensure touch inputs align with the rotated display.
- **Quote Widget Regression Fix**: Resolved a regression where quotes failed to fetch and display on-device. Restored the missing `interval` and `http_request` fetch logic, updated to use robust `DynamicJsonDocument` parsing for reliability, and ensuring immediate visual feedback via a forced display update.
- **Calendar Widget Fix**: Resolved a critical issue where calendar events were not displayed on-device. Replaced `json::parse_json` with robust manual `deserializeJson` parsing using a heap-allocated `DynamicJsonDocument` (2KB), and introduced a **"Compact Mode"** layout that aggressively reduces header and grid spacing to maximize event visibility on smaller widgets.

---

## v0.8.4 - Weather Icon Sensor Fix

**Release Date:** December 29, 2025

### 🎉 New Features
- **On-Board Sensor Bar Widget**: A unified status bar for local hardware, combining WiFi signal, Temperature, Humidity, and Battery levels into a single, highly customizable widget.
- **Navigation Bar Widget**: A premium, all-in-one navigation control featuring "Previous", "Home/Reload", and "Next" buttons. Automatically generates the complex touch area logic and C++ rendering required for multi-page dashboards.
- **Batch Widget Locking**: Lasso-selected widgets can now be locked or unlocked simultaneously using the "Lock" toggle in the properties panel. 
- **Lock/Unlock Shortcut (Ctrl+L)**: Quickly toggle the lock status of all selected widgets with a new keyboard shortcut.
- **Locked Widget Preservation**: Locked widgets are now protected from accidental deletion via keyboard shortcuts or the "Clear Page" operation.
- **UI Layout Optimization**: Refined the editor interface with a 3-column keyboard shortcut list and a subtle, relocated AI Assistant button next to the YAML editor.
- **AI Assist Onboarding**: Added a configuration hint and direct settings link within the AI Assistant modal for unconfigured users.

### 🐛 Bug Fixes
- **Weather Icon Sensor Fix**: Addressed an issue where `weather_icon` widgets required manual `text_sensor` entries in ESPHome YAML. The designer now automatically generates these sensors for both `weather.*` and `sensor.*` entities.
- **Unified ID Generation**: Standardized the ESPHome ID generation for weather-related sensors, ensuring that `sensor.*` prefixes are correctly stripped to match the internal C++ lambda references, preventing compilation errors.
- **Calendar Display Optimization**: Optimized the calendar widget layout and C++ rendering logic to resolve an issue where only a single event was displayed. Reduced header and grid spacing and increased the default widget height (to 550px) to accommodate more events.
- **Robust Calendar JSON Parsing**: Refactored the ESPHome lambda to use direct JSON object access instead of redundant parsing, significantly reducing memory overhead and improving parsing reliability for multi-event datasets.
- **Calendar Backend Refinement**: Updated the Python helper script to return data in a standard dictionary format, ensuring full compatibility with ESPHome's JSON component.
- **YAML Lambda Indentation**: Fixed a critical bug in package-based hardware recipes where the display lambda was incorrectly indented by 8 spaces instead of 4, causing "Invalid YAML syntax" and compilation errors in ESPHome.
- **YAML Configuration Duplication**: Fixed a bug where custom hardware recipes were prepended twice in the exported YAML under certain conditions.
- **Custom Hardware Resolution**: Fixed an issue where the resolution specified in custom hardware recipe headers (e.g., `# Resolution: 480x320`) was ignored by the backend, causing the designer to default to 800x480.
- **M5 Touch Area Precision**: Fixed a bug in the coordinate transformation logic for M5 devices (specifically M5Paper) that caused touch inputs to be rotated 90° relative to the display. This ensures navigation buttons align correctly with visual elements. *Note: This fix remains untested on physical hardware.*
- **Navigation Widget Height Persistence**: Fixed a critical bug where `template_nav_bar` and navigation touch buttons would reset their height to 10px on page refresh in the deployed Home Assistant version. The Python backend's `clamp_to_canvas()` function was using hardcoded 800x480 landscape dimensions, incorrectly clamping widget heights for portrait layouts or devices with non-standard resolutions (e.g., M5Paper 540x960).
- **Gray Background Rendering**: Fixed an issue where `template_nav_bar` and `template_sensor_bar` widgets rendered their backgrounds as solid black instead of gray. The export logic was incorrectly using the foreground (icon) color for backgrounds and checking the wrong property for dithering.
- **E-Paper Page Cycling Fix**: Fixed a regression in the `auto_cycle_timer` script generation where the missing `mode: restart` attribute prevented recursive execution, causing auto-cycling to stop after the first page change.
- **Global Variable YAML Compliance**: Refactored the generation of numeric and boolean global variables (e.g., `display_page`, `page_refresh_default_s`) to remove redundant single quotes, improving compliance with strict YAML parsers and ensuring correct type inference in ESPHome.
- **Hardware Profile & PSRAM Safety**: Improved analysis and documentation for hardware profiles. Identified that selecting mismatched profiles (e.g., reTerminal E1001 for generic ESP32-S3 boards) can cause boot loops due to incorrect PSRAM mode settings (`octal` vs `quad`). Added recommendations for the `update_interval: never` setting to prevent display update conflicts.
---

## v0.8.3 - Mobile Touch & Hardware Fixes

**Release Date:** December 28, 2025

### 🎉 New Features
- **Widget Position Locking:** Added a "Lock Position" checkbox to widget properties, preventing accidental movement or resizing on the canvas.
- **Full Touch Support**: Added comprehensive support for dragging, resizing, and moving widgets on touch devices (mobile phones/tablets). Pinch-to-zoom and panning are also optimized for mobile browsers.
- **Standardized SHT Sensor Support**: Enhanced support for SHT3x, SHT4x, and SHTC3 sensors with standardized internal IDs, ensuring compatibility across M5 Paper and other hardware.
- **Default Home Assistant Icon**: Set the default MDI icon for the "icon" widget to the Home Assistant icon (`F07D0`).
- **Lasso Selection**: Added ability to select multiple widgets simultaneously by drawing a selection rectangle on the canvas. Supports group movement, bulk deletion, and multi-widget copy/paste.
- **Auto Page Cycling:** Added support for automatic page switching based on a configurable time interval, perfect for kiosk-style displays. Includes logic to reset the timer on manual user interaction.
- **Navigation Touch Widgets:** Introduced "Next Page", "Previous Page", and "Reload Page" widgets in the Inputs category. These are pre-configured touch areas that automatically generate the required ESPHome scripts for seamless multi-page navigation and display refreshing.
- **Global Variable Refresh Interval**: Users can now configure a global default refresh interval for the entire device. This setting intelligently syncs with Deep Sleep intervals and ensures consistent refresh timing across all pages while preserving battery life. Provisions were made to ensure this setting is persistent across page refreshes and exports.
- **Enhanced Quick Widget Search (Shift+Space)**: The Quick Search command is now global! Pressing `Shift+Space` will now open the widget picker even if you are editing text in the YAML box or properties panel, automatically blurring the input and letting you add widgets instantly.
- **Enhanced YAML Copy Feedback**: The "Copy" button in the YAML editor now provides immediate visual feedback ("Copied!") on click, confirming the action without needing to look at toast notifications.

### 🐛 Bug Fixes
- **YAML Syntax Error**: Fixed "mapping values are not allowed here" error by switching widget marker comments from `//` to standard YAML `#` notation. Maintained full backwards compatibility for importing existing local projects.
- **M5 Paper Temp/Humidity Widgets**: Fixed Temperature and Humidity widgets on M5 Paper by implementing `sht3xd` platform support.
- **YAML Cleanup**: Eliminated redundant/duplicate sensor blocks in generated YAML for devices with on-board sensors.
- **Icon Character Escaping**: Fixed a bug where certain unicode icons (like `thermometer-low`) were improperly escaped in the generated C++ code.
- **UI Refinement**: Updated the properties panel to be more sensor-agnostic and refined various labels for better clarity.
- **YAML Duplication**: Fixed a critical bug where hardware recipes (like Xiao ePaper) were duplicated in the output and had incorrect lambda nesting, causing compilation errors.


---


## v0.8.2 - AI Assistant & Secure API

**Release Date:** December 26, 2025

### 🎉 New Features
- **AI-Powered Dashboard Assistant**: A new AI-driven design assistant that can generate entire dashboards or individual widgets from simple text prompts (e.g., "Make a beautiful weather dashboard with large bold text").
- **Multi-Provider AI Support**: Seamlessly switch between Google Gemini, OpenAI, and OpenRouter.
- **Dynamic Model Discovery**: Real-time fetching and filtering of available models from AI providers with custom model filters.
- **Secure Local-Only API Storage**: AI API keys are stored exclusively in your browser's `localStorage`. They are never included in exported JSON files or sent to the Home Assistant backend, ensuring your credentials stay private.
- **Hyper-Strict AI Compliance**: Engineered system prompts with negative constraints and literal-text handling to ensure the AI follows your instructions perfectly.
- **Bespoke Architect Design Rules**: The AI now follows professional design principles, using `rounded_rect` containers and visual hierarchy for premium-looking dashboards.
- **WiFi Signal Strength Widget**: New drag-and-drop widget displaying WiFi signal strength using MDI icons. Shows dynamic icon based on signal level (Excellent ≥-50dB, Good ≥-60dB, Fair ≥-75dB, Weak ≥-100dB) with optional dBm value. Uses ESPHome's built-in `wifi_signal` sensor platform.
- **On Device Sensors Category**: New widget category consolidating device-related widgets:
  - **Battery Widget** (moved from Core Widgets)
  - **WiFi Signal Widget** (moved from Core Widgets)
  - **Temperature Widget (NEW)**: Displays on-device SHT4x temperature sensor or Home Assistant entity with dynamic thermometer icons (Cold/Normal/Hot).
  - **Humidity Widget (NEW)**: Displays on-device SHT4x humidity sensor or Home Assistant entity with dynamic water-drop icons (Low/Normal/High).
- **Live Sensor Preview**: Battery, WiFi, Temperature, and Humidity widgets now show actual sensor values in the canvas preview when configured with a Home Assistant entity.
- **Quick Widget Search (Shift+Space)**: New command palette for rapidly adding widgets. Press Shift+Space to open a searchable list of all widgets with keyboard navigation (↑↓ to select, Enter to add, Escape to close). Dynamically discovers all widgets from the palette.
- **Optional Diacritic Font Support**: Added support for extended Latin characters (ľ, š, č, ť, ž, etc.) via the `GF_Latin_Core` glyphset. This can be enabled per-device in the Device Settings to support international characters while keeping firmware size small for users who don't need them.
- **Inverted Colors Support for Recipes**: Hardware recipes now support an `# Inverted: true` metadata comment to automatically swap black and white colors for e-paper displays with reversed color mapping.
- **Manual Color Inversion Toggle**: Added a new "Inverted Colors" checkbox in the Device Settings modal, allowing users to manually override color mapping for e-paper displays that appear inverted on-device.
- **Improved Hardware Recipe Parser**: The recipe parser now extracts more metadata, including the inverted flag, ensuring better "out-of-the-box" compatibility for new displays.


### 🐛 Bug Fixes
- **LCD YAML Generation**: Fixed critical issues where E-ink specific rendering code (dithering, inverted colors) was incorrectly applied to LCD devices, causing visual artifacts and black screens.
- **Package Standardization**: Standardized YAML output for "untested" package-based devices. Now, imported hardware packages automatically have conflicting system keys (`esphome`, `wifi`, `api`, etc.) commented out, ensuring a clean "partial YAML" that pastes perfectly without duplicate header errors.
- **Battery Widget Sensor Bug**: Fixed issue where the Battery Entity ID field was not generating the required Home Assistant sensor declaration, causing "Couldn't find ID" errors when compiling in ESPHome.
- **Theme Persistence**: Fixed Light Mode not persisting after page refresh; the theme preference now correctly loads from localStorage on startup.
- **Touchpad Gesture Behavior**: Improved canvas interaction for macOS trackpads. Two-finger scroll now pans the canvas, while pinch-to-zoom and Ctrl+scroll zoom in/out, matching standard design tools like draw.io.
- **LVGL Slider & Light Support**: Fixed issue #87 where light entities could not be selected for sliders, buttons, and switches. Expanded the entity picker to include `light`, `fan`, `cover`, and other domains. Updated the slider to generate brightness control and buttons/switches to use `homeassistant.toggle` for seamless light interaction.
- **M5Paper Color Inversion**: Fixed an issue where "Dark Mode" and "Light Mode" were inverted on M5Paper devices by correctly enabling the `inverted_colors` flag in the hardware profile.
- **Icon Browser & Previews**: Fixed critical mismatch in the icon browser where the previewed icon did not match the file name (e.g., "account" showed a completely different icon). Also fixed rendering for extended Material Design Icons by correctly handling 5-digit hex codes.
- **Orientation-Aware Rotation & Touch Calibration**: Fixed issue where devices with native portrait orientation (like M5Paper) ignored the "Orientation" setting in the generated YAML. The Designer now automatically calculates the correct `rotation` value and swaps touchscreen `calibration` coordinates based on whether the device is natively portrait or landscape.

---

## v0.8.1 - Standalone Mode & LVGL Grid

**Release Date:** December 22, 2025

### 🎉 New Features
- **Standalone & Offline Mode**: The Designer can now be used completely offline or deployed to static hosting platforms like GitHub Pages.
- **Externally Hosted HA Connection**: Users can now manually configure a Home Assistant URL and Long-Lived Access Token (LLAT) in Editor Preferences. This enables the GitHub-hosted or externally deployed versions of the editor to connect to local HA instances for fetching entities and managing layouts without needing the integration installed.
- **Import/Export Projects**: Added a visible "Import Project" button to the sidebar to complement the "Save Project" button. This enables a complete offline workflow where you can save and load your dashboard designs as local JSON files.
- **GitHub Pages Deployment**: A standalone version of the designer is now available at [koosoli.github.io/ESPHomeDesigner/](https://koosoli.github.io/ESPHomeDesigner/).
- **LVGL Grid Support (Phase 1)**: Initial support for LVGL grid layouts on a per-page basis using the `layout: NxM` shorthand.
- **Bidirectional Grid Sync**: A seamless workflow where dragging or resizing widgets on the canvas auto-detects their grid cell, row, and column span.
- **Snap-to-Grid**: Widgets now intelligently snap to grid boundaries during drag and drop for pixel-perfect alignment.
- **Auto-Positioning for All Widgets**: Both LVGL and non-LVGL widgets (Text, Icons, Shapes) now support grid-based positioning. For non-LVGL widgets, the Designer automatically calculates the required absolute X/Y coordinates based on their grid cell.
- **Grid Visualization Overlay**: Added a visual dashed grid overlay with cell coordinate labels (`0,0`, `0,1`, etc.) that automatically adapts to dark/light mode for easier layout design.
- **Smart YAML Export**: 
  - Generates clean `layout: NxM` definitions for pages.
  - Includes `grid_cell_*` properties for LVGL widgets.
  - Automatically omits redundant `x:` and `y:` coordinates when native grid positioning is in use.
- **Round-Trip Import**: Full support for importing grid layouts and cell properties from existing YAML files.

### 🐛 Bug Fixes
- **Display Refresh Loop**: Fixed an issue where the display auto-refresh loop would terminate permanently if time synchronization failed momentarily during the update cycle.
- **YAML Generation**: Fixed a bug where the `text_sensor:` key was duplicated in the generated YAML when using both Home Assistant text sensors and complex widgets (Quotes, Weather Forecast, or Calendar).
- **reTerminal Battery Calibration**: Fixed an issue where the `battery_voltage` sensor incorrectly included a calibration filter, causing it to always display 100%. Raw voltage is now correctly reported in Volts with proper Home Assistant metadata.
- **Missing Glyphs**: Fixed missing unit characters (μ, ³, °, etc.) in generated fonts by explicitly including extended glyphs.

---

## v0.8.0 - Enhanced UI & Modular Profiles

**Release Date:** December 20, 2025

### 🎉 New Features
- **Modern Canvas Interaction**: Complete overhaul of canvas navigation. Now you can use the mouse wheel to zoom into the canvas or drag-move the canvas with the middle mouse button.
- **Drag & Drop Workflow**: Widgets in the sidebar can now be dragged directly onto the canvas for intuitive placement, in addition to being clickable.
- **RGB Color Picker**: Added a full RGB color picker for LVGL widgets, allowing for more precise UI design.
- **Interactive Touch Icons**: The `touch_area` widget now supports dual-state icons (Normal/Pressed). This allows for professional-looking buttons on non-LVGL displays that provide visual feedback when touched.
- **Touch Area Migration**: The `touch_area` widget has been migrated to the modern Feature Registry system, fixing console warnings and improving performance.
- **Advanced Icon Pickers**: A completely refactored icon selection UI featuring a quick-search visual dropdown and a full modal browser for the entire Material Design Icons library.
- **High-Fidelity Canvas Feedback**: Added color accuracy to the canvas preview and an interactive hover effect. Hovering over a touch area now simulates the "pressed" state, allowing you to preview interactions instantly.
- **Border Styling**: Added the possibility to apply border colors for squares and circles.
- **Hardware Recipes & Templates**:
    - **Dynamic Discovery**: Drop a YAML file into `frontend/hardware/` and it will automatically appear in the device selector.
    - **Dynamic Import (GUI)**: Click **"Import Recipe"** in the Device Settings to upload a new template directly through the browser.
    - **Offline Manual Import**: Added support for parsing YAML recipes directly in the browser when running offline.
- **Modular Hardware Profiles**: Implemented support for loading hardware profiles from plain YAML files (package-based). This enables seamless profile sharing with the [esphome-modular-lvgl-buttons](https://github.com/agillis/esphome-modular-lvgl-buttons/) project. Big thank you to [agillis](https://github.com/agillis/) for these awesome profiles!

### 🐛 Bug Fixes
- **Date/Time Widget Improvements**:
    - Fixed an issue where the widget would occasionally insert duplicate code into the YAML.
    - Fixed font size property persistence so settings are correctly restored when updating layout from YAML.
- **Fullscreen YAML Editor**: Fixed a bug where one could only click once on the full screen YAML and never again after opening it.
- **Icon Rendering**: Fixed a bug where gray icons would result in solid squares when flashed on device due to dithering logic issues.
- **Alignment Fixes**: Removed the legacy 15px vertical offset for shapes to ensure they render exactly where they appear on the canvas.
- **Calendar Widget**: Various improvements to rendering, performance, and stability.
- **Major Energy Management Overhaul**: Complete logic rewrite for better reliability and clarity.
    - **Silent Hours (No Refresh Window)**: Added ability to disable display updates during specific hours to prevent ghosting or noise at night. Integrated with both Standard and Ultra Eco modes.
    - **Global Interval Fix**: Fixed a bug where the refresh interval was incorrectly exported to YAML.
- **M5Stack CoreInk Refinements**:
    - Fixed **Dark Mode** rendering issues where the background remained white instead of black.
    - Improved battery calibration and button logic responsiveness.
- **Rounded Rectangles**: Improved the rendering of rounded rectangles to look much nicer when flashed to a physical device.
- **TRMNL DIY Battery**: Fixed incorrect battery level and voltage readings for the TRMNL DIY (ESP32-S3) hardware by implementing a proper 12-point calibration curve.

### 🔧 Architectural Changes
- **Live YAML Generation**: Removed the "Generate YAML" button as it has become redundant; YAML is now generated on the fly as you design.
- **Optimized Device List**: Cleaned up the device list, regrouped by manufacturer with clearer device names.
- **Efficient YAML Output**: Improved the gray dither logic to produce significantly less YAML code by using C++ `for` loops.
- **Mobile Support**: Added support for smaller screens like mobile phones, with a more responsive UI (Note: drag and drop behavior on touch devices is not yet fully tested).
- **Hybrid Profile Solution**: Implemented a hybrid loading system. While new LCD profiles are fetched as YAML packages, legacy E-Ink profiles (M5Paper, CoreInk, TRMNL) are still served via built-in JS definitions.
- **Online/Standalone Warning**: Note that due to browser security restrictions, package-based profiles require the application to be served via a web server (like Home Assistant) and will show a warning in the standalone offline version (`file://`).

---

## v0.7.4 - Trmnl DIY Support

**Release Date:** December 17, 2025

### 🚀 New Hardware Support
- **Seeed Studio Trmnl DIY Kit (ESP32-S3)**: Added full support for the Trmnl DIY Kit, including:
  - Correct pin mappings for display, buttons, battery, and SPI.
  - Support for `7.50inv2p` display model with partial update capabilities.
  - Automatic `inverted` color handling to fix "Dark Mode" logic (Hardware White is treated as logical White).

### 🐛 Bug Fixes
- **QR Code Widget**: Fixed a regression where the `qr_code` component definition was missing from the generated YAML, causing "Couldn't find ID" errors.

---

## v0.7.3 - Hotfix

**Release Date:** December 17, 2025

### 🐛 Bug Fixes
- **Duplicate Weather Entity**: Fixed a bug where using a weather entity in both a generic widget (like `sensor_text`) and a dedicated weather widget caused duplicate entity definitions in the generated YAML, leading to compilation errors.
- **Input Text Filtering**: Fixed entity picker filtering to allow selecting `input_text` entities in widgets like Sensor Text. Also improved the entity picker to search across all supported domains including `input_select`, `switch`, `input_boolean`, etc.

---

## v0.7.2 - Hotfix

**Release Date:** December 15, 2025

### 🐛 Bug Fixes
- **ESP32-S3 PSRAM Mode**: Fixed compilation Error "ESP32S3 requires PSRAM mode selection" by explicitly setting `psram_mode: octal` for reTerminal E1001/E1002.
- **Graph Sensor ID Mismatch**: Fixed "Couldn't find ID" error for graph widgets by ensuring the graph's internal sensor reference matches the correctly sanitized sensor ID (e.g. `sensor_my_entity`).
- **OOM Compilation Support**: Added a helpful tip in the generated YAML setup instructions suggesting `compile_process_limit: 1` if users encounter Out-of-Memory (OOM) errors during compilation on ESP32-S3.

---

## v0.7.1 - Hotfix

**Release Date:** December 15, 2025

### 🐛 Bug Fixes
- **Inverted Options**: Fixed an issue where the `COLOR_WHITE` and `COLOR_BLACK` definitions were inverted for the `reTerminal E1001` device.
- **Ghost Code**: Cleaned up the generated YAML to remove unused helper functions (like `get_calendar_matrix` and `apply_grey_dither_mask`) when they are not needed.
- **Glyph Tracker Regression**: Fixed a critical regression in the glyph tracker.
- **Hide Unit Persistence**: Fixed a bug where "Hide Default Units" was not persistent when using "Update Layout from YAML".

### 📱 Experimental Hardware
- **M5Paper & M5Stack CoreInk**: This build includes experimental support for M5Paper and M5Stack CoreInk. These features are from the development branch and require testing.
- **reTerminal E1001 Model Update**: Default model updated from `7.50inv2` to `7.50inv2p`. This change is untested. If it does not work, please manually revert the model in your YAML back to `7.50inv2`.

---

## v0.7.0 - Experimental LVGL & Enhancements

**Release Date:** December 14, 2025

### 🔧 Architecture Changes
- **Decoupled Hardware Profile**: Hardware definition logic has been moved out of `yaml_export.js` into dedicated `hardware_generators.js` and `devices.js` files, significantly improving code maintainability and safety.

### 🚀 Rebranding & Scope Expansion
- **Project Renamed to ESPHome Designer**: Refleting our broader mission to support all display types.
- **Support for More Displays**: We are moving beyond just e-ink to support OLED, LCD, and Touch displays.
- **New Repository**: `https://github.com/koosoli/ESPHomeDesigner`

### 🎉 New Features
- **Dark Mode Option**: Added a toggle in Device Settings to enable global "Dark Mode" (black background with white widgets). Individual pages can override this setting via Page Settings with options: "Use Global Setting", "Light Mode", or "Dark Mode".
- **Gray Color Support**: Full support for "Gray" color has been implemented for icons, text, and all other widgets.
- **Sensor Text Intelligence**:
  - **Smart Type Handling**: Decoupled text vs. numeric sensor registration. "Is Text Sensor" now forces a unique text-based internal ID, fixing "NaN" issues when an entity is previously registered as a number (e.g. in a graph).
  - **Default Precision**: Sensor text widgets now default to 2 decimal places (e.g. `23.50`) instead of raw float output, improving default legibility. Precision can still be set to `-1` for raw output.

- **Experimental LVGL Widgets**: Added experimental support for LVGL `button`, `arc`, `chart` (Line/Bar), `slider`, `bar`, `image`, and `qrcode` widgets.
- **Text Sensor Enhancements**:
  - **Dual Sensor Support**: Now supports displaying two sensors in one widget.
  - **Prefix & Suffix**: Added settings for custom prefix and suffix text.
  - **Hide Default Unit**: Added checkbox to suppress the default unit, allowing for cleaner custom formatting with Postfix.
- **Time & Date Widget**: Added more formatting options for date display.

#### Calendar Widget
- **Rendering Improvements**: Significant improvements to calendar widget rendering and reliability.
- **Full-Featured Calendar**: Monthly view with upcoming events list
- **Customizable**: Configurable font sizes for all elements (Date, Day, Grid, Events), plus colors and border settings
- **Smart Setup**: Built-in Python helper script downloader simplifies Home Assistant integration
- **Accurate Preview**: What you see is what you get - preview reflects real dates and layout

### 📱 New Hardware Support
- **Waveshare PhotoPainter (ESP32-S3)**: Full support for the Waveshare ESP32-S3 PhotoPainter (7-Color E-Ink).
- **Experimental Support**: Added support for more devices. Note that devices not yet fully verified are explicitly marked as "untested" in the device selector.


### 🐛 Bug Fixes
- **Feature Forecast**: Resolved bug fixes for the weather forecast feature; it should now work correctly.
- **Graph Widget**: Fixed issue where graphs would intersect/overlap incorrectly.
- **Date/Time Alignment Persistence**: Fixed an issue where alignment settings were lost when updating layout from YAML.
- **Duplicate Config Fields**: Resolved an issue where duplicate "Postfix" fields appeared in the Sensor Text widget properties.
- **Disappearing Sensor**: Addressed a root cause where manual YAML editing (required due to UI issues) caused sensor configuration loss.


---

## v0.6.3 - Entity Handling Improvements

**Release Date:** December 7, 2025

### 🐛 Bug Fixes

#### Sensor Text Widget
- **Graceful Empty Entity Handling**: Fixed compilation error when user creates a sensor_text widget without selecting an entity. Now displays "--" placeholder instead of generating invalid `id().state` code
- **Auto Sensor Import**: Sensor text and progress bar widgets using Home Assistant entities (`sensor.*`, `text_sensor.*`) now automatically generate the required `platform: homeassistant` sensor imports in YAML

#### Duplicate Sensor Prevention
- **Shared Sensor Deduplication**: Fixed potential duplicate sensor definitions when the same entity is used across multiple widget types (e.g., using the same sensor in both a graph and sensor_text widget). All numeric sensors now share a single tracking set to prevent duplicates

---

## v0.6.2 - Rendering Fixes

**Release Date:** December 6, 2025

### 🐛 Bug Fixes

#### Rectangle Widget
- **Y Offset Alignment**: Added `RECT_Y_OFFSET` constant (-15px) to align rectangle widget rendering on e-ink display with canvas preview

#### Graph Widget
- **Min/Max Value Regression**: Fixed regression where `min_value` and `max_value` were not being output to the graph component YAML declaration, causing graphs to display empty

---

## v0.6.1

### 🐛 Bug Fixes

#### Quote/RSS Widget
- **Quote & Author Swapped**: Fixed RSS parsing where quote text and author name were incorrectly swapped for BrainyQuote feeds
- **Auto Text Scaling**: Added automatic font scaling for quotes - text now shrinks (100% → 75% → 50%) to fit within widget bounds

#### YAML Generation
- **Duplicate Layouts**: Fixed "Update Layout from YAML" creating duplicate layouts and resetting device model to E1001
- **Cleaned Up HTTP Comments**: Removed confusing duplicate `http_request` comment block from generated YAML

#### Display Rendering
- **Text Vertical Alignment**: Added 11px vertical offset for text widgets to better match canvas preview with actual e-ink display positioning
  - *Note: This adjustment compensates for font baseline differences between browser and ESPHome rendering*

#### Graph Widget
- **Grid Lines**: Fixed X and Y grid lines not generating correctly in YAML output

### ✨ Improvements

#### Online Image Widget
- **Binary Mode for Monochrome**: Remote images now default to BINARY type for monochrome displays (E1001, TRMNL) for sharper rendering
- **Auto Type Detection**: Image type automatically selected based on device (BINARY for monochrome, RGB565 for color E1002)

#### Rounded Rectangle Widget
- **New Widget**: Full support for rounded rectangles with configurable corner radius
- **Border Support**: Optional border with customizable thickness

---

## v0.6.0
> [!NOTE]
> This is a **major release** with significant architectural improvements, new widgets, and hardware support.

### 🎉 Major Features

#### Layout Manager
- **Multi-Device Support**: Manage multiple e-ink devices from a single interface
- **Export/Import Layouts**: Save and share your dashboard designs as files
- Switch between devices seamlessly with persistent configurations

#### Completely Redesigned UI
- **Fresh Modern Interface**: Complete visual overhaul - easier on the eyes
- **Light Mode**: New light theme for users who prefer a brighter workspace
- **Canvas Controls**: Zoom in/out and recenter the canvas for precise editing

#### Template-Free Workflow
- **No More Templates Required**: The generator now produces a complete, standalone configuration
- Simply paste the generated YAML below ESPHome's auto-generated sections
- Makes setup child's play - no manual template merging needed

#### New Widgets
- **Quote / RSS Feed Widget**: Display inspirational quotes or RSS feed content
  - RSS feed URL configuration with popular default (BrainyQuote)
  - Optional author display, random quote selection
  - Configurable refresh interval (15min to 24h)
  - Word wrap, italic styling, full font customization
  - **Zero configuration**: No `configuration.yaml` entries or Home Assistant sensors needed
  - *Note: Functional but formatting not fully respected - unfinished feature*

- **QR Code Widget**: Generate QR codes directly on your e-ink display
  - Configurable content string (URLs, text, etc.)
  - Four error correction levels (LOW, MEDIUM, QUARTILE, HIGH)
  - Auto-scaling to fit widget dimensions

- **Weather Forecast Widget**: Multi-day weather forecast display
  - Shows upcoming weather conditions with dynamic icons
  - Integrates with Home Assistant weather entities
  - *Note: Requires a weather entity configured in Home Assistant*

- **Vertical Lines**: Draw vertical lines (untested)

### 📱 New Hardware Support

#### reTerminal E1002 - Color E-Ink Display
- **Full color e-paper support** for the Seeed Studio reTerminal E1002
- Color rendering for all widgets and shapes
- Same easy workflow as E1001 - just select your device type


#### trmnl (ESP32-C3)
- **New device support**: TRMNL e-paper hardware now fully supported
- Dedicated hardware template (`trmnl_lambda.yaml`)
- Correct SPI and battery sensor configurations
- Proper busy_pin logic

> [!WARNING]
> **Experimental Feature**: Online Image (remote URLs) widget is an initial implementation and may be buggy or broken. Use at your own discretion.

### 🔧 Architecture Overhaul
- **Modular Frontend Architecture**: Complete refactor of the monolithic `editor.js` (276KB) into a modular system:
  - `yaml_export.js` - Clean YAML generation with per-widget handling
  - `yaml_import.js` - Robust YAML parsing and import
  - `canvas.js` - Canvas rendering and interaction
  - `state.js` - Centralized application state management
  - `properties.js` - Widget property panel generation
  - `widget_factory.js` - Standardized widget creation
  - `keyboard.js` - Keyboard shortcuts handling
  - Improved maintainability and extensibility

- **Feature-Based Widget System**: Backend now uses a `features/` directory with:
  - Per-widget `schema.json` for property definitions
  - Per-widget `render.js` for canvas preview rendering
  - Standardized widget registration and discovery

### 🐛 Bug Fixes

#### Widget Rendering
- **Line Widget**: Fixed length synchronization between canvas preview and e-ink display
- **Line Widget**: Fixed drag resize functionality
- **Rectangle Border**: Corrected `border-box` positioning discrepancy between canvas and e-ink
- **Weather Forecast**: Fixed positioning at correct X/Y coordinates
- **Graph Grid Lines**: Fixed `x_grid` values not generating correctly in YAML

#### Sensor & Entity Handling
- **Sensor ID Generation**: Fixed sensor ID stripping for `battery_icon`, `sensor_text`, `progress_bar`, and `weather_icon` widgets
  - Correctly strips `sensor.` and `weather.` prefixes when generating ESPHome `id()` references
- **Quote/RSS Widget**: Added WiFi connection check and startup delay for reliable fetching

#### Font System
- **Italic Font Support**: Fixed italic fonts not being correctly referenced in lambda code
  - Text widgets now use `_italic` suffix (e.g., `font_roboto_900_100_italic`) when italic is enabled
  - Quote RSS widget correctly references italic font IDs
- **Font Validation**: Fixed `font_roboto_400_24` validation warning in battery_icon widget
- **Italic Persistence**: Fixed `italic` property not persisting for `sensor_text` and `datetime` widgets after YAML update

#### Device Settings & Persistence
- **Device Name Sync**: Fixed device name changes not persisting in Device Settings modal and Manage Layouts list
- **Device Settings Modal**: Fixed settings reverting upon re-opening

#### YAML Generation
- **Duplicate SPI Removal**: Fixed duplicate SPI configuration in generated YAML
- **YAML Duplicate Fixes**: Various fixes for duplicate section generation

### 🔄 Technical Improvements
- **Frontend Feature Registry**: Dynamic widget type discovery and registration
- **Schema-Driven Properties**: Widget properties now defined in JSON schemas
- **Improved Error Handling**: Better error messages and AppState.notify integration
- **Code Organization**: Clear separation between core, UI, IO, and utility modules

---

## v0.5.0

> [!WARNING]
> **BREAKING CHANGE**: This version requires the **latest hardware template**.
> Global settings have been moved to the template.
> You **MUST** update your `reterminal_e1001_lambda.yaml` (or equivalent) to the latest version for these features to work.
> Old templates will cause compilation errors or ignore your power settings.

### 🎉 Major Features
- **Page Management**:
  - **Drag & Drop Reordering**: You can now reorder pages in the sidebar by dragging them.
  - **Persistent Page Names**: Custom page names are now saved in the YAML and restored upon import.
- **New Power Management UI**: Complete redesign with radio buttons for clear, mutually exclusive power modes:
  - **Standard (Always On)** - Auto-refresh based on page intervals
  - **Night Mode** - Screen off during specified hours for energy savings
  - **Manual Refresh Only** - Updates only via button or Home Assistant trigger
  - **Deep Sleep (Battery Saver)** - Device offline between updates for maximum power savings
- **Deep Sleep Support**: Full ESPHome deep sleep implementation with configurable intervals (default: 600s)
- **Smart Text Optimization**: Automatically strips unused characters from large static fonts to save massive amounts of RAM, preventing compilation crashes. Dynamic text (sensors) remains untouched.

### 🐛 Bug Fixes
#### Settings & Persistence
- **Device Settings Persistence**: Fixed all device settings (power mode, sleep times, deep sleep interval) not saving and jumping back to defaults on restart.
- **Page Refresh Rates**: Fixed page refresh intervals not persisting and resetting when updating layout from YAML.
- **Power Management Settings**: Fixed settings resetting to "Standard" mode when updating layout from YAML.

#### YAML Generation
- **Script Generation**: Fixed wrong script generated for deep sleep mode (was using auto-refresh loop instead of simple sleep).
- **Display Lambda**: Fixed missing COLOR_ON/COLOR_OFF definitions causing compilation errors.
- **Sensor Text Widget**: Fixed value-only mode (no label) missing critical YAML sections (button:, font:, script:, globals:).
- **Refresh Intervals**: Fixed page refresh intervals < 60 seconds being filtered out.
- **No-Refresh Window**: Fixed invalid conditions generated when window not configured (0-0 case).
- **Manual Refresh Mode**: Fixed manual refresh showing unnecessary page interval logic (now minimal script only).

#### Widget Improvements
- **Line Widget**: Fixed lines not rendering straight on e-paper (right side was ~10px lower).
- **Image Widget**: Fixed missing path property in UI and drag functionality not working.
- **Battery Icon**: Fixed percentage text not centering underneath battery symbol when icon is enlarged.
- **Sensor Text Alignment**: Added separate alignment options for label and value (e.g., label left, value right) with WYSIWYG canvas preview.
- **DateTime Widget**: Verified alignment options working correctly.
- **Progress Bar Widget**: Verified alignment options working correctly.

#### Font System
- **Google Fonts**: Fonts now work correctly - all fonts pre-defined in template (Template-Only approach).
- **Font Selection**: Verified font dropdown shows all 15 supported families.
- **Font Persistence**: Fixed font selections (Family, Weight, Size) for Sensor Text widgets not persisting through YAML updates.


### 🔧 Technical Improvements
- **Frontend/Backend Parity**: Both generators now produce identical output.
- **Robust Import**: `applyImportedLayout()` now merges settings instead of overwriting, preserving user preferences.
- **Smart Parsing**: The YAML parser now intelligently extracts page names and refresh rates from comments and code logic.
- **YAML Highlighting**: Selecting a widget on the canvas now automatically highlights its corresponding YAML definition in the snippet box.


## v0.4.6.1
- **Critical Bug Fix**: Fixed JavaScript error `ReferenceError: isTextSensor is not defined` in snippet generator that prevented YAML generation and caused compilation errors.


## v0.4.6
- **Number Sensor Fix**: Fixed a bug where number sensors were interpreted as text sensors, causing them to show gibberish or fail to compile.
- **Graph Improvements**: X and Y information are now automatically added if the user adds min/max information or time information in the widget settings.
- **Graph Persistence**: Fixed a bug where graph minimum/maximum values and duration were not saving to YAML. These values would reset when "Update Layout from YAML" was pressed.
- **Known Bugs**:
    - Puppet widget is still unstable.
    - Straight lines are not perfectly straight.
    - Visible conditions are not fully tested and might fail to compile.


## v0.4.5
- **Min/Max Visibility**: Added support for numeric range conditions (Min/Max) with AND/OR logic for widget visibility. Perfect for progress bars (e.g., `0 < value < 100`).
- **Boot Stability**: Updated the default hardware template (`reterminal_e1001_lambda.yaml`) to remove the immediate display update from `on_boot`, preventing boot loops on heavy layouts.
- **WiFi Sensor**: Added `wifi_signal_db` to the default hardware template (diagnostic entity).
- **GUI Updates**: Added "Update Layout from YAML" button to the editor for easier round-trip editing.
- **Graph Widget Fixes**: Fixed persistence of `min_value`, `max_value`, `min_range`, and `max_range` properties.
- **Editor Fixes**: Fixed CSS regression and ensured fullscreen editing works correctly.
- **Text Sensor Persistence**: Fixed "Is Text Sensor?" checkbox state not saving to backend.
- **Puppet Widget Fixes**: Fixed Puppet/Online Image widgets not saving to backend, added automatic `http_request` dependency, and fixed URL corruption in parser.
- **Puppet Stability**: Added `on_error` handler and conditional page updates to prevent crashes and unnecessary refreshes.
- **Conditional Visibility**: Fixed C++ compilation error when using conditional visibility with numeric sensors (removed invalid `atof` check).

## v0.4.4
- **Text Sensor Support**: Added "Is Text Sensor?" checkbox to `sensor_text` widget to correctly format string states (fixes `NaN` issue).
- **Entity Picker Limit**: Increased the entity fetch limit from 1000 to 5000 to support larger Home Assistant installations.
- **Default Template Fixes**: Updated `reterminal_e1001_lambda.yaml` to match default dashboard entity IDs (`sensor_reterminal_e1001_...`) and device name.
- **Canvas Responsiveness**: Improved canvas scaling and centering on smaller screens.

## v0.4.3
### New Features
-   **Copy/Paste**: Added support for copying and pasting widgets using `Ctrl+C` and `Ctrl+V`. Pasted widgets are automatically offset for visibility.
-   **Undo/Redo**: Implemented Undo (`Ctrl+Z`) and Redo (`Ctrl+Y` or `Ctrl+Shift+Z`) functionality for widget operations (move, resize, add, delete, property changes).
-   **Fullscreen YAML Editing**: The fullscreen YAML view is now editable and includes an "Update Layout from YAML" button to apply changes directly.
-   **Sidebar Visibility Control**: Added a configuration option to show or hide the integration in the Home Assistant sidebar.
-   **Canvas Responsiveness**: The editor canvas now dynamically scales and centers to fit smaller screens, ensuring the entire layout is visible without scrolling.

### Bug Fixes
-   **Ghost Pages**: Fixed an issue where deleted pages would persist in the generated YAML snippet.
-   **Undo/Redo Stability**: Fixed issues where Undo would jump back multiple steps or become unresponsive due to duplicate history states or missing drag state capture.
-   **Graph Persistence**: Fixed `Continuous: true` setting not saving correctly.
-   **Page Jump**: Fixed editor jumping to the first page after layout updates.
-   **Weather Text Color**: Fixed weather widget text color reverting to black.

## v0.4.2
-   **Graph Widget**: Added automated sensor info (min/max) based on Home Assistant entity attributes.
-   **Circle Widget**: Enforced 1:1 aspect ratio during resize to prevent distortion.
-   **Manifest**: Version bump.
