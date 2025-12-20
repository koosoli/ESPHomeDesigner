# Release Notes





## v0.7.5 - Enhanced UI & Modular Profiles

**Release Date:** December 20, 2025

### 🎉 New Features
- **Modern Canvas Interaction**: Complete overhaul of canvas navigation. Now you can use the mouse wheel to zoom into the canvas or drag-move the canvas with the middle mouse button.
- **Drag & Drop Workflow**: Widgets in the sidebar can now be dragged directly onto the canvas for intuitive placement, in addition to being clickable.
- **RGB Color Picker**: Added a full RGB color picker for LVGL widgets, allowing for more precise UI design.
- **Interactive Touch Icons**: The `touch_area` widget now supports dual-state icons (Normal/Pressed). This allows for professional-looking buttons on non-LVGL displays that provide visual feedback when touched.
- **Advanced Icon Pickers**: A completely refactored icon selection UI featuring a quick-search visual dropdown and a full modal browser for the entire Material Design Icons library.
- **High-Fidelity Canvas Feedback**: Added color accuracy to the canvas preview and an interactive hover effect. Hovering over a touch area now simulates the "pressed" state, allowing you to preview interactions instantly.
- **Transparent Font Management**: The YAML generator now automatically handles glyph registration. Any icon you select is tracked and added to the `glyphs:` list in the font configuration, eliminating "missing icon" issues on hardware.
- **Border Styling**: Added the possibility to apply border colors for squares and circles.
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
