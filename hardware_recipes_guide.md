# 🛠️ Writing Hardware Recipes for ESPHome Designer

Hardware Recipes (or profiles) are YAML templates that tell the ESPHome Designer how to talk to your specific device hardware. This guide explains how they work, how to create your own, and how to upload them.

---

## 🧩 How it Works

A Hardware Recipe is essentially a full ESPHome configuration file with one special addition: the `# __LAMBDA_PLACEHOLDER__`.

When you design a UI in the Designer and click "Generate YAML", the Designer takes your Hardware Recipe and injects the UI drawing code exactly where that placeholder is located.

### The "Captive Portal" Breakpoint

Historically, the Designer used `captive_portal:` as a marker to split the file. **This is no longer strictly true.**
The Designer now uses a "smart sanitization" process that scans the entire file and automatically disable system-level configuration keys (like `wifi`, `api`, `ota`, `captive_portal`) to prevent conflicts with the Designer's internal configuration.

**Naming your Sections:**
You can now safely use comments in your section headers (e.g., `sensor: # My LDR`), and the Designer will correctly identify and merge them.

**Recommended Practice:**
While the Designer *can* auto-sanitize your file, we still **strongly recommend** commenting out the system infrastructure sections yourself. This ensures that your recipe is visually valid and you know exactly what is being excluded.

```yaml
# wifi:
#   ssid: ...
#
# api:
#
# captive_portal:

display:
  - platform: ...
    # ... other display settings ...
    lambda: |-
      # __LAMBDA_PLACEHOLDER__
```

> [!NOTE]
> **Philosophy Alignment:** The Designer strictly separates hardware definition from application logic.
> Attempts to include system-level configuration (`logger`, `wifi`, `api`, `captive_portal`, `ota`) in your recipe will be ignored (commented out) by the import process.
> The only exception is if you are using `packages`, where some shared configuration might be allowed.

---

## 📝 Recipe Structure

The Designer looks for specific metadata in the form of comments at the top of your YAML file to understand your device's capabilities.

### Required & Recommended Metadata
| Keyword | Description | Example |
| :--- | :--- | :--- |
| `TARGET DEVICE` | The human-readable name (used by the **backend**). | `# TARGET DEVICE: My Custom ESP32-S3` |
| `Name` | Alternative name keyword (used in **offline mode**). | `# Name: My Custom ESP32-S3` |
| `Resolution` | The screen dimensions in `WxH` format. | `# Resolution: 800x480` |
| `Shape` | The physical shape of the screen (`rect`, `round`, or `circle`). | `# Shape: round` |
| `Inverted` | If `true`, swaps black/white for e-paper displays. | `# Inverted: true` |
| `Orientation` | Sets the default canvas orientation (`landscape` or `portrait`). | `# Orientation: portrait` |
| `Dark Mode` | Sets the default theme (`enabled` or `disabled`). | `# Dark Mode: enabled` |
| `Refresh Interval`| The default time between updates in seconds. | `# Refresh Interval: 600` |

> [!TIP]
> For maximum compatibility, include **both** `# TARGET DEVICE:` and `# Name:` with the same value.

### Example Metadata Header
```yaml
# ============================================================================
# TARGET DEVICE: Waveshare Touch LCD 7"
# Name: Waveshare Touch LCD 7"
# Resolution: 800x480
# Shape: rect
# Orientation: landscape
# Inverted: false
# Dark Mode: disabled
# Refresh Interval: 300
# ============================================================================
```

---

## 👩‍🍳 Creating Your Own Recipe (The Easy Way)

1. **Start with a working ESPHome YAML**: Take an existing, working configuration for your device.
2. **Add Metadata**: Add the `# TARGET DEVICE`, `# Resolution`, and `# Shape` comments at the top.
3. **Smart Sanitization**: **COMMENT OUT** all system infrastructure sections (`esphome:`, `wifi:`, `api:`, `ota:`, `captive_portal:`).
4. **Valid YAML Only**: Ensure your display configuration appears **BELOW** the commented-out `captive_portal:` line. The Designer ignores everything above it.
4. **Clean Up (Recommended)**: Remove any existing UI drawing logic (like `it.print`, `it.fill_screen`, etc.) from your `display` lambda.
5. **Insert Placeholder**: Add `# __LAMBDA_PLACEHOLDER__` inside the lambda block.
5. **Save**: Save the file with a `.yaml` extension (e.g., `my_awesome_device.yaml`).

> [!IMPORTANT]
> Ensure your `display` platform and `id` match what you expect. The Designer will use whatever display ID you define in the recipe.

---

## 🚀 Uploading and Using

### Where are they saved?
- **Online Mode**: Recipes are saved in the `custom_components/esphome_designer/frontend/hardware/` directory on your Home Assistant machine.
- **Offline Mode**: If you use the Designer without a backend, recipes are loaded into your browser's memory and will be lost on refresh.

### How to Upload
1. Open the ESPHome Designer.
2. Go to **Settings** (Gear icon) -> **Hardware**.
3. Click **Upload Recipe** and select your YAML file.
4. Once uploaded, your device will appear in the **Device Selection** dropdown.

---

## 🔍 Troubleshooting

- **"Missing Placeholder" Error**: Ensure you have exactly `# __LAMBDA_PLACEHOLDER__` (case-sensitive, with the `#`) inside your display lambda.
- **Wrong Orientation**: If your UI looks rotated, adjust the `rotation` property in your recipe's `display` section.
- **PSRAM Issues**: If your device has PSRAM, ensure your recipe includes the `psram:` section and appropriate `esp32:` framework settings.
