# reTerminal Dashboard Designer

![Dashboard Editor Screenshot](https://raw.githubusercontent.com/koosoli/ReTerminalDesigner/main/screenshots/Screenshot1.png)

**No more hand-coding ESPHome display lambdas! 🎉**

Got a Seeed Studio reTerminal E1001 and frustrated with manually writing display code? Yeah, me too. So I built a drag-and-drop editor that runs right inside Home Assistant.

Design your e-ink dashboard visually, click generate, flash it - done. No YAML wrestling required (unless you're into that).

## What Does It Do?

- **Visual drag-and-drop editor** - Design layouts in your browser, see your actual HA entities update live on the canvas
- **Multiple pages** - Navigate with hardware buttons, set different refresh rates per page
- **Auto-generates ESPHome config** - Clean, readable YAML that you can paste into your existing ESPHome setup
- **Round-trip editing** - Import existing ESPHome configs back into the editor
- **Full device integration** - Exposes buttons, buzzer, temperature, humidity sensors back to HA for automations
- **Smart power management** - Battery monitoring, configurable refresh intervals, deep sleep support

**Use case:** Display a weather page when you wake up, switch to a sensor dashboard during the day, show a specific alert page when the doorbell rings - all automated through Home Assistant.

## Quick Start

### 1. Install via HACS

1. Add this repository to HACS as a custom repository
2. Search for "reTerminal Dashboard Designer" and install
3. Restart Home Assistant
4. Go to **Settings** → **Devices & Services** → **Add Integration** → Search for "reTerminal Dashboard Designer"

### 2. Prepare Your reTerminal Hardware

**Important:** Copy the Material Design Icons font file first!

From this repo: `font_ttf/font_ttf/materialdesignicons-webfont.ttf`  
To your ESPHome: `/config/esphome/fonts/materialdesignicons-webfont.ttf`

(Create the `fonts` folder if it doesn't exist)

Then use the provided hardware template:

1. Open `esphome/reterminal_e1001_lambda.yaml` in this repo
2. Follow the step-by-step instructions in the template
3. Create a new ESPHome device and paste the hardware sections
4. Change the framework from `esp-idf` to `arduino` in your ESP32 config
5. Flash the base config to your reTerminal

The template includes all the hardware setup: display driver, buttons, buzzer, sensors, battery monitoring.

### 3. Design Your Dashboard

1. Open the integration at `/reterminal-dashboard` in Home Assistant
2. Drag widgets onto the 800x480 canvas
3. Add your sensors, weather entities, icons, shapes
4. Create multiple pages with different refresh rates
5. Click **"Generate Snippet"**

### 4. Flash It

1. Copy the generated YAML snippet
2. Paste it at the bottom of your ESPHome config (below the hardware sections)
3. Compile and flash via ESPHome

Done! Your custom dashboard is now running on the reTerminal.

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
- **Image** - Display photos and images with optional color inversion
  - Widget frame size sets ESPHome `resize:` parameter automatically
  - Images are resized during compilation (quality preserved with FLOYDSTEINBERG dithering)
- **Online Image** - Fetch and display images from URLs
  - Useful for weather maps, camera feeds, or dynamic content

## Features

- **Visual Editor** - Drag-and-drop canvas with snap-to-grid, live entity state updates
- **Entity Picker** - Browse and search your actual HA entities with real-time preview
- **Multi-Page Support** - Create up to 10 pages, each with custom refresh intervals
- **Hardware Integration** - Buttons, buzzer, temperature/humidity sensors exposed to HA
- **Smart Generator** - Produces clean, additive YAML that doesn't conflict with your base config
- **Round-Trip Editing** - Import existing ESPHome display code back into the editor
- **Battery Management** - Voltage monitoring, battery level percentage, icon indicators
- **Power Saving** - Configurable refresh rates, deep sleep support for night hours

## Technical Details

The generator produces **additive YAML only** - it won't touch your WiFi, API, or OTA settings.

**What it generates:**
- `globals:` - Display page tracking, refresh intervals
- `font:` - Dynamic font generation based on your widget sizes + Material Design Icons with automatic glyph collection
- `image:` - Image definitions for photo/image widgets (BINARY type, FLOYDSTEINBERG dithering)
- `text_sensor:` - Home Assistant entities used in your widgets
- `button:` - Page navigation and refresh controls (exposed to HA)
- `script:` - Smart refresh logic with per-page interval support
- `display:` - Lambda code that renders your layout

**What you provide** (via the hardware template):
- `esphome:`, `esp32:`, `wifi:`, `api:`, `ota:`, `logger:`
- Hardware sections: `psram`, `i2c`, `spi`, `time`
- Physical components: `output`, `rtttl`, `sensor`, `binary_sensor`

The workflow is safe and deterministic - same layout always produces the same YAML.


## Hardware Support

**Currently Supported:**
- Seeed Studio reTerminal E1001 (ESP32-S3, 800x480 e-paper)

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

**Wrong framework error?**
- Change ESP32 framework from `esp-idf` to `arduino` in your config

**Duplicate section errors?**
- Only paste `globals`, `font`, `text_sensor`, `button`, `script`, `display` from generated snippet
- Don't copy `output`, `rtttl`, `sensor`, `time` - these are in the hardware template

## Contributing

This is a passion project built to solve a real problem. Found a bug? Have an idea? Open an issue or PR!

**Planned features:**
- Weather card widgets
- Graph/chart widgets
- Color e-ink support
- More device types (other ESP32-based e-paper displays)

## License

Made with love ❤️ - free and Open Source under the GPL 3.0 license. Share the love!

