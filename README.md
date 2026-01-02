# ESPHome Designer

**A visual drag-and-drop editor for ESPHome displays (E-Ink, OLED, LCD, Touch), running as a Home Assistant integration or a standalone web app.**

<div align="center">
  <a href="https://github.com/sponsors/koosoli">
    <img src="https://img.shields.io/badge/Sponsor-❤️-ff69b4?style=for-the-badge&logo=github-sponsors" alt="Sponsor Project">
  </a>
  <a href="https://buymeacoffee.com/koosoli">
    <img src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me a Coffee">
  </a>
  <br>
  <strong>If you find this project useful, consider <a href="https://github.com/sponsors/koosoli">supporting its development!</a></strong>
</div>

<div align="center">
  <a href="https://youtu.be/BLkzDYYQJcQ">
    <img src="https://img.youtube.com/vi/BLkzDYYQJcQ/maxresdefault.jpg" alt="Watch the v0.8.6 Feature Walkthrough" width="600">
  </a>
  <br>
  <a href="https://youtu.be/BLkzDYYQJcQ">
    <img src="https://img.shields.io/badge/YouTube-Watch%20v0.8.6%20Overview-red?style=for-the-badge&logo=youtube&logoColor=white" alt="Watch Video">
  </a>
  <a href="https://koosoli.github.io/ESPHomeDesigner/">
    <img src="https://img.shields.io/badge/Live%20Demo-Try%20it%20now-blue?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Live Demo">
  </a>
  <br>
  <strong>▶️ Click to watch the latest feature walkthrough or try the demo!</strong>
</div>

**No more hand-coding ESPHome display lambdas! 🎉**

---


---


Building a custom smart display for Home Assistant? Frustrated with manually writing C++ lambdas and guessing coordinates?

Design ESPHome displays right inside Home Assistant or via a standalone web browser. While available as a HACS integration, you can also use the [GitHub-hosted version](https://koosoli.github.io/ESPHomeDesigner/) with a Long-Lived Access Token to access your entities.

It enables you to build premium, touch-interactive dashboards for various ESP32-based devices (like the Seeed reTerminal, TRMNL, standard touch screens, and more) without writing a single line of display code.

## What Does It Do?

- **Visual drag-and-drop editor** - Design layouts in your browser, see your actual HA entities update live on the canvas
  <p align="center"><img src="screenshots/draganddrop.gif" width="800" alt="Drag & Drop Editor"></p>
- **Multiple pages** - Navigate with hardware buttons, set different refresh rates per page
- **Auto-generates ESPHome config** - Clean, readable YAML that you can paste into your existing ESPHome setup
- **Round-trip editing** - Import existing ESPHome configs back into the editor
- **AI-Powered Dashboard Assistant** - Generate entire layouts or individual widgets from simple text prompts (e.g., "Add a weather widget with bold large text")
- **Full device integration** - Exposes buttons, buzzer, temperature, humidity sensors back to HA for automations
- **Smart power management** - Battery monitoring, configurable refresh intervals, deep sleep support

**Use case:** Display a weather page when you wake up, switch to a sensor dashboard during the day, show a specific alert page when the doorbell rings - all automated through Home Assistant.

## Quick Start

### 1. Try the Live Web Version (Easiest)

You can use the designer without installing anything! 

1. Go to [koosoli.github.io/ESPHomeDesigner/](https://koosoli.github.io/ESPHomeDesigner/)
2. Open **Editor Settings** (gear icon)
3. Enter your Home Assistant URL and a **Long-Lived Access Token** (created in your HA profile)
4. Add the designer URL to your HA `cors_allowed_origins` (see below)

### 2. Install via HACS (Recommended for Local Access)

1. Add `https://github.com/koosoli/ESPHomeDesigner` to HACS as a custom repository
2. Search for "ESPHome Designer" and install
3. Restart Home Assistant
4. Go to **Settings** → **Devices & Services** → **Add Integration** → Search for "ESPHome Designer"

### 2. Manual Installation

1. Download the `custom_components/reterminal_dashboard` folder from this repo
2. Copy it to your Home Assistant `config/custom_components/` directory
3. Restart Home Assistant
4. Add the integration via **Settings** → **Devices & Services**

### 3. Prepare Your ESPHome Device

**Important:** Copy the Material Design Icons font file first!

From this repo: `font_ttf/font_ttf/materialdesignicons-webfont.ttf`  
To your ESPHome: `/config/esphome/fonts/materialdesignicons-webfont.ttf`

(Create the `fonts` folder if it doesn't exist)

Then create a new ESPHome device:

1. Create a new device in ESPHome Dashboard
2. Let ESPHome generate the base config (WiFi, API, OTA, etc.)
3. Configure the correct ESP platform for your device (instructions included in the generated YAML comments)

### 4. Design Your Dashboard

1. Open the integration at `/reterminal-dashboard` in Home Assistant
2. Select your device type (E1001, E1002, TRMNL,...)
3. Drag widgets onto the canvas
4. Add your sensors, weather entities, icons, shapes
5. Create multiple pages with different refresh rates
6. **Live Preview**: Your YAML is generated on the fly as you design! Just look at the YAML snippet box.
   <p align="center"><img src="screenshots/modern_canvas.gif" width="800" alt="Modern Canvas Interaction"></p>

### 5. Flash It

1. Copy the generated YAML snippet
2. Paste it below ESPHome's auto-generated sections in your device config
3. Compile and flash via ESPHome

Done! Your custom dashboard is now running on your device.

### 6. Connect & Automate

Once flashed, your device will come online.

1. Go to **Settings** → **Devices & Services** in Home Assistant.
2. Your device should be discovered (or you can add it via the ESPHome integration).
3. **Configure it** to ensure Home Assistant connects to its API.

### 🌐 Standalone / GitHub Hosting & CORS
If you are using the GitHub-hosted version or any URL that is not your local Home Assistant IP, you **must** allow cross-origin requests.

Add this to your Home Assistant `configuration.yaml` and **restart**:

```yaml
http:
  cors_allowed_origins:
    - https://koosoli.github.io
```

### Philosophy: Design here, Automate there.

Think of this tool as the **Frontend Designer** for your physical display.

- **Use this tool** to make it look beautiful (pixel-perfect placement, fonts, icons).
- **Use Home Assistant** for the logic.

We expose everything (buttons, sensors, battery) back to Home Assistant. Does a button press toggle a light? Play a sound? Trigger a scene? **Do that in Home Assistant Automations**, where HA shines best.

## Widget Types

- **Text & Sensor Text** - Static labels or live HA entity values with smart type detection and multiple formatting options
  <p align="center"><img src="screenshots/text_formatting.gif" width="700" alt="Rich Text Formatting"></p>
- **Icon & Weather Icon** - 360+ Material Design Icons or dynamic weather-state icons with full size/color control
  <p align="center"><img src="screenshots/icon_picker2.gif" width="700" alt="Icon Picker System"></p>
- **Date, Time & Calendar** - Customizable clock, date, and full monthly calendar views
- **Progress Bar & Battery** - Visual indicators for percentages and dynamic battery level tracking
- **Shapes & Rounded Rects** - Rectangles, circles, lines, and rounded rects with gray/dither support
- **Graph** - Advanced sensor history plotting with auto-scaling, grid lines, and X/Y axis labeling
- **Image & Online Image** - Static photos or dynamic URLs (weather maps, cameras) with auto-dithering
- **Quote / RSS Feed** - Inspirational quotes or external RSS feeds with auto-scaling and refresh logic
- **QR Code** - Dynamic QR generation for URLs or text with adjustable error correction
- **Touch Area** - Invisible or icon-labeled interactive zones to trigger HA actions (supports dual-state feedback)
  <p align="center"><img src="screenshots/touch_icons.gif" width="700" alt="Touch Interactive Icons"></p>
- **Weather Forecast** - Multi-day forecast display integrated with HA weather entities

## LVGL Support (Experimental)

**⚠️ Highly Experimental - Expect Bugs!**

This tool includes experimental support for **LVGL (Light and Versatile Graphics Library)** widgets on LCD+Touch devices. LVGL enables interactive widgets like buttons, switches, sliders, and checkboxes that can control Home Assistant entities directly from the touchscreen.

### Important Notes

- **LCD+Touch devices only** - LVGL is designed for real-time displays, not e-paper
- **Entire page switches to LVGL mode** if you add any LVGL widget
- **High memory usage** - Requires ESP32-S3 with PSRAM
- **May be unstable** - This feature is under active development

### Available LVGL Widgets

- Buttons, Switches, Checkboxes, Sliders (interactive, can trigger HA actions)
- Arcs, Bars, Charts (display sensor values)
- Labels, Images, QR Codes, and more

For stable results, stick to **Native Mode** (standard widgets without LVGL prefix).

## Features

- **Visual Editor** - Drag-and-drop canvas with snap-to-grid, live entity state updates
- **AI-Powered Assistant** - Design entire dashboards using text prompts with support for Gemini, OpenAI, and OpenRouter
- **Secure API Storage** - AI keys are stored locally in your browser and never sent to the backend or included in exports
- **Hyper-Strict AI Compliance** - Engineered system prompts ensure the AI follows literal text instructions and professional design rules
- **Layout Manager** - Manage multiple devices, export/import layouts as files
- **Entity Picker** - Browse and search your actual HA entities with real-time preview
- **Multi-Page Support** - Create up to 10 pages, each with custom refresh intervals
- **Page Management** - Drag & drop to reorder pages in the sidebar
- **Productivity Tools** - Copy/Paste (Ctrl+C/V), Undo/Redo (Ctrl+Z/Y), and Z-Index layering support
- **Canvas Controls** - Zoom in/out and recenter for precise editing
- **Dark Mode Option** - Toggle "Dark Mode" in device settings for black backgrounds
- **Hardware Integration** - Buttons, buzzer, temperature, humidity sensors exposed to HA
- **Smart Generator** - Produces clean, additive YAML that doesn't conflict with your base config
- **Template-Free Workflow** - No more manual template merging, just paste and go
- **Live YAML Generation** - Your YAML is generated on the fly as you design; no more "Generate" buttons
- **RGB Color Picker** - Precise color control for e-paper and LCD widgets
  <p align="center"><img src="screenshots/rgb_picker.gif" width="700" alt="RGB Color Picker"></p>
- **Round-Trip Editing** - Import existing ESPHome code back into the editor (now supports LVGL widgets!)
  <p align="center"><img src="screenshots/yaml_parsing.gif" width="700" alt="YAML Round-Trip Import"></p>
- **Power & Battery Management** - Monitoring, deep sleep support, and configurable refresh intervals
- **Modern Canvas Interaction** - Zoom with the mouse wheel and pan with the middle mouse button
- **Drag & Drop Workflow** - Drag widgets directly from the sidebar onto the canvas
- **Modular Hardware Profiles** - Support for loading hardware profiles from external YAML packages ([Learn how to write your own](hardware_recipes_guide.md))
- **[New] Experimental: Custom Hardware Profiles** - Create and save your own hardware definitions (Chip, LCD/E-Ink, Pins) directly in the UI. No coding required to support new displays!
- **Experimental LVGL Support** - (Beta) Support for interactive LVGL widgets on capable devices
- **Mobile Support** - Responsive UI designed to work on smaller screens and touch devices

## Technical Details

The generator produces **complete, standalone YAML** - no templates needed!

**What it generates (everything you need):**
- **Hardware Config**: `psram`, `i2c`, `spi`, `external_components`, and device-specific sections (`m5paper`, `axp2101`)
- **Core Components**: `http_request`, `time` (Home Assistant), `globals` (page tracking), and `deep_sleep`
- **Widgets & Assets**: `font` (MDI icons), `image` (deduplicated), `online_image`, `graph`, and `qr_code`
- **HA Integration**: `sensor`, `text_sensor`, `binary_sensor`, `button`, and `switch` entities
- **Logic & Display**: `script` (smart refresh), `display` (lambda code), and `lvgl` (if enabled)

**What ESPHome provides** (auto-generated when you create a device):
- `wifi:`, `api:`, `ota:`, `logger:`

The workflow is safe and deterministic - same layout always produces the same YAML.


## Hardware Support

**Currently Supported:**
- **Seeed Studio**: [reTerminal E1001](https://www.seeedstudio.com/reTerminal-E1001-p-6534.html?sensecap_affiliate=U5gNTEF&referring_service=link) (BW), [reTerminal E1002](https://www.seeedstudio.com/reTerminal-E1002-p-6533.html?sensecap_affiliate=U5gNTEF&referring_service=link) (Color), [TRMNL 7.5'' OG DIY Kit](https://www.seeedstudio.com/TRMNL-7-5-Inch-OG-DIY-Kit-p-6481.html?sensecap_affiliate=U5gNTEF&referring_service=link) (S3)
- **Waveshare**: [PhotoPainter](https://www.waveshare.com/esp32-s3-photopainter.htm?&aff_id=136175) (7-Color)
- **M5Stack**: [M5Paper](https://shop.m5stack.com/products/m5paper-esp32-development-kit-v1-1-960x540-4-7-eink-display-235-ppi?ref=qcwynykf&srsltid=AfmBOopfcra6VDlyNoA8jSlBq8CLjnDIqCT8peRIUqGMq_4DVDSAMGCV&variant=39966887903404) (Touch), [M5Stack M5Core Ink](https://shop.m5stack.com/products/m5stack-esp32-core-ink-development-kit1-54-elnk-display?ref=qcwynykf)
- **TRMNL**: Original [ESP32-C3 e-paper device](https://shop.usetrmnl.com/collections/devices/products/trmnl)

> [!IMPORTANT]
> All devices not explicitly listed above are **untested** and may require troubleshooting.

**Hardware Features Exposed:**
- 3 physical buttons (GPIO 3/4/5)
- RTTTL buzzer (GPIO 45)
- SHT4x temp/humidity sensor (I2C)
- Battery voltage monitoring (ADC GPIO1)
- WiFi signal strength

All exposed as Home Assistant entities for use in automations.


## Repository Structure

- `custom_components/reterminal_dashboard/` - Home Assistant integration
  - `yaml_generator.py` - Generates ESPHome snippets from layouts
  - `yaml_parser.py` - Imports ESPHome code back into editor
  - `frontend/editor.html` - Visual drag-and-drop editor UI
- `esphome/reterminal_e1001_lambda.yaml` - Hardware template with step-by-step instructions
- `font_ttf/font_ttf/materialdesignicons-webfont.ttf` - Icon font for widgets
- `hardware_recipes_guide.md` - Guide for creating custom hardware profiles
- `screenshots/` - Editor screenshots

## Troubleshooting

**Font compilation error?**
- Make sure you copied `materialdesignicons-webfont.ttf` to `/config/esphome/fonts/`

**Display not updating?**
- Check `update_interval: never` in display config
- Verify buttons are wired to `component.update: epaper_display`


**Duplicate section errors?**
- The generator now produces a complete, standalone configuration including `psram`, `i2c`, etc.
- **Do not** use old hardware templates that define these sections. Rely on the generated code.

**Compilation Fails ("Killed signal" / Out of Memory)?**
If your Raspberry Pi crashes with `Killed signal terminated program`, it lacks the RAM for these fonts.

**Try this first:**
Add `compile_process_limit: 1` to your `esphome:` section in the YAML. This reduces memory usage but slows down compilation.

**If that fails, compile on your PC:**

1. **Install ESPHome**: Install Python, then run `pip install esphome` in your terminal.
2. **Setup Folder**: Create a folder like `C:\esphome_build` (**Important**: No spaces in the folder path!).
3. **Copy Files**: Copy your `reterminal.yaml` and the `fonts/` folder into that folder.
4. **Compile**: Run this command:
   ```powershell
   python -m esphome compile C:\esphome_build\reterminal.yaml
Upload: Take the generated .bin file and upload it via the Home Assistant ESPHome dashboard (Install → Manual Download).

## License

Made with love ❤️ - free and Open Source under the GPL 3.0 license. Share the love!

<div align="center">

☕ **If you find this project useful, consider supporting its development!**

[![Sponsor](https://img.shields.io/badge/Sponsor-❤️-ff69b4?style=for-the-badge&logo=github-sponsors)](https://github.com/sponsors/koosoli)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/koosoli)

</div>
