# reTerminal Dashboard Designer


**A visual drag-and-drop editor for ESPHome e-paper dashboards, running right inside Home Assistant.**



<div align="center">
  <a href="https://youtu.be/bzCbiUypN_4">
    <img src="screenshots/Reterminal_Designer_v05.gif" alt="Watch the video">
  </a>
  <br>
  <small>Click to watch the demo video</small>
</div>



**No more hand-coding ESPHome display lambdas! 🎉**

Building a custom smart display for Home Assistant? Frustrated with manually writing YAML and guessing coordinates?

**Meet your new HMI Designer.**

This is a **visual, drag-and-drop interface designer** that lives right inside Home Assistant. It enables you to build premium, touch-interactive dashboards for various ESP32-based e-Paper devices (like the Seeed reTerminal, TRMNL, and more) without writing a single line of display code.


## What Does It Do?

- **Visual drag-and-drop editor** - Design layouts in your browser, see your actual HA entities update live on the canvas
- **Multiple pages** - Navigate with hardware buttons, set different refresh rates per page
- **Auto-generates ESPHome config** - Clean, readable YAML that you can paste into your existing ESPHome setup
- **Round-trip editing** - Import existing ESPHome configs back into the editor
- **Full device integration** - Exposes buttons, buzzer, temperature, humidity sensors back to HA for automations
- **Smart power management** - Battery monitoring, configurable refresh intervals, deep sleep support

**Use case:** Display a weather page when you wake up, switch to a sensor dashboard during the day, show a specific alert page when the doorbell rings - all automated through Home Assistant.

## Quick Start

### 1. Install via HACS (Recommended)

1. Add this repository to HACS as a custom repository
2. Search for "reTerminal Dashboard Designer" and install
3. Restart Home Assistant
4. Go to **Settings** → **Devices & Services** → **Add Integration** → Search for "reTerminal Dashboard Designer"

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
6. Click **"Generate Snippet"**

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

### Philosophy: Design here, Automate there.

Think of this tool as the **Frontend Designer** for your physical display.

- **Use this tool** to make it look beautiful (pixel-perfect placement, fonts, icons).
- **Use Home Assistant** for the logic.

We expose everything (buttons, sensors, battery) back to Home Assistant. Does a button press toggle a light? Play a sound? Trigger a scene? **Do that in Home Assistant Automations**, where HA shines best.

## Widget Types

- **Text** - Static labels and headers
  - Customizable font size (8-260px) - generates fonts automatically
  - Color options: black, white, gray
- **Sensor Text** - Live values from Home Assistant entities
  - Separate font sizes for label and value
  - Multiple display formats (value only, label + value, stacked)
- **Icon** - Material Design Icons with customizable size and color
  - Choose from 360+ most-used Material Design Icons
  - Adjustable size (8-260px) - generates optimized fonts automatically
  - Color options: black, white, gray (limited by e-paper)
- **Weather Icon** - Dynamic weather icons based on Home Assistant state
  - Automatically maps standard HA weather states (sunny, rainy, cloudy, etc.) to MDI icons
  - Customizable size and color
- **Date & Time** - Display current time and date
  - Separate font sizes for time and date
  - Multiple format options (time only, date only, both)
  - Automatically synced with Home Assistant time
- **Progress Bar** - Visual progress indicators from sensor values
  - Links to Home Assistant percentage sensors
  - Customizable bar height and border width
  - Shows fill based on 0-100% sensor values
- **Battery Icon** - Dynamic battery level display
  - Links to battery level sensors
  - Icon changes based on battery percentage
  - Shows percentage text below icon
- **Shapes** - Rectangles, filled rectangles, circles, filled circles, lines
  - Gray color renders as dithered pattern for visual distinction
- **Graph** - Plot sensor history over time
  - Configurable duration (1h to 30d)
  - Customizable line style (solid, dashed, dotted), thickness, and color
  - Optional X/Y grid lines with presets
  - Auto-scaling Y-axis based on sensor min/max attributes
  - Automatic X/Y axis labeling based on time and value range
- **Image** - Display photos and images with optional color inversion
  - Widget frame size sets ESPHome `resize:` parameter automatically
  - Images are resized during compilation (quality preserved with FLOYDSTEINBERG dithering)
- **Online Image** - Fetch and display images from URLs
  - Useful for weather maps, camera feeds, or dynamic content
- **Quote / RSS Feed** - Display inspirational quotes or RSS feed content
  - Configurable RSS feed URL with popular defaults
  - Random quote selection, author display, italic styling
  - Adjustable refresh interval (15min to 24h)
- **QR Code** - Generate QR codes directly on the display
  - Configurable content string (URLs, text, etc.)
  - Four error correction levels
  - Auto-scaling to fit widget dimensions
- **Weather Forecast** - Multi-day weather forecast display
  - Shows upcoming weather conditions with icons
  - Integrates with Home Assistant weather entities

## Features

- **Visual Editor** - Drag-and-drop canvas with snap-to-grid, live entity state updates
- **Layout Manager** - Manage multiple devices, export/import layouts as files
- **Entity Picker** - Browse and search your actual HA entities with real-time preview
- **Multi-Page Support** - Create up to 10 pages, each with custom refresh intervals
- **Page Management** - Drag & drop to reorder pages in the sidebar
- **Productivity Tools** - Copy/Paste (Ctrl+C/V), Undo/Redo (Ctrl+Z/Y), and Z-Index layering support
- **Canvas Controls** - Zoom in/out and recenter for precise editing
- **Light/Dark Mode** - Choose your preferred theme
- **Hardware Integration** - Buttons, buzzer, temperature/humidity sensors exposed to HA
- **Smart Generator** - Produces clean, additive YAML that doesn't conflict with your base config
- **Template-Free Workflow** - No more manual template merging, just paste and go
- **Live YAML Preview** - Select any widget to instantly highlight its corresponding code in the generated YAML snippet
- **Round-Trip Editing** - Import existing ESPHome display code back into the editor
- **Battery Management** - Voltage monitoring, battery level percentage, icon indicators
- **Power Saving** - Configurable refresh rates, deep sleep support for night hours
- **Experimental LVGL Support** - (Beta) Support for LVGL widgets like Arc and Button on capable devices

## Technical Details

The generator produces **complete, standalone YAML** - no templates needed!

**What it generates (everything you need):**
- Hardware configuration: `esphome:`, `esp32:`, `psram:`, `i2c:`, `spi:`
- Display driver and settings
- `globals:` - Display page tracking, refresh intervals
- `font:` - Dynamic font generation based on your widget sizes + Material Design Icons
- `image:` - Image definitions for photo/image widgets
- `online_image:` - Definitions for online image widgets
- `text_sensor:` - Home Assistant entities used in your widgets
- `graph:` - Graph widget configurations
- `button:` - Page navigation and refresh controls (exposed to HA)
- `script:` - Smart refresh logic with per-page interval support
- `deep_sleep:` - Power saving logic (if enabled)
- `display:` - Lambda code that renders your layout

**What ESPHome provides** (auto-generated when you create a device):
- `wifi:`, `api:`, `ota:`, `logger:`

The workflow is safe and deterministic - same layout always produces the same YAML.


## Hardware Support

**Currently Supported:**
- Seeed Studio reTerminal E1001 (ESP32-S3, 800x480 e-paper, black/white)
- Seeed Studio reTerminal E1002 (ESP32-S3, 800x480 e-paper, color)
- TRMNL (ESP32-C3 e-paper device)

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
- `screenshots/` - Editor screenshots

## Troubleshooting

**Font compilation error?**
- Make sure you copied `materialdesignicons-webfont.ttf` to `/config/esphome/fonts/`

**Display not updating?**
- Check `update_interval: never` in display config
- Verify buttons are wired to `component.update: epaper_display`


**Duplicate section errors?**
- Only paste `globals`, `font`, `text_sensor`, `button`, `script`, `display` from generated snippet
- Don't copy `output`, `rtttl`, `sensor`, `time` - these are in the hardware template

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
   ```
5. **Upload**: Take the generated `.bin` file and upload it via the Home Assistant ESPHome dashboard (Install → Manual Download).

## Contributing

This is a passion project built to solve a real problem. Found a bug? Have an idea? Open an issue or PR!

**Planned features:**
- Color e-ink support
- More device types (other ESP32-based e-paper displays)

## License

Made with love ❤️ - free and Open Source under the GPL 3.0 license. Share the love!

