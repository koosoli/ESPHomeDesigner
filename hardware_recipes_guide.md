# 🛠️ Writing Hardware Recipes for ESPHome Designer

Hardware Recipes (or profiles) are YAML templates that tell the ESPHome Designer how to talk to your specific device hardware. This guide explains how they work, how to create your own, and how to upload them.

---

## 🧩 How it Works

A Hardware Recipe is essentially a full ESPHome configuration file with one special addition: the `# __LAMBDA_PLACEHOLDER__`.

When you design a UI in the Designer and click "Generate YAML", the Designer takes your Hardware Recipe and injects the UI drawing code exactly where that placeholder is located.

### The Magic Marker: `__LAMBDA_PLACEHOLDER__`
Every recipe **must** contain this exact string inside the `display:` block's lambda section.

```yaml
display:
  - platform: ...
    # ... other display settings ...
    lambda: |-
      # __LAMBDA_PLACEHOLDER__
```

---

## 📝 Recipe Structure

The Designer looks for specific metadata in the form of comments at the top of your YAML file to understand your device's capabilities.

### Required & Recommended Metadata
| Keyword | Description | Example |
| :--- | :--- | :--- |
| `TARGET DEVICE` | The human-readable name (used by the **backend**). | `# TARGET DEVICE: My Custom ESP32-S3` |
| `Name` | Alternative name keyword (used in **offline mode**). | `# Name: My Custom ESP32-S3` |
| `Resolution` | The screen dimensions in `WxH` format. | `# Resolution: 800x480` |
| `Shape` | The physical shape of the screen (`rect` or `round`). | `# Shape: rect` |

> [!TIP]
> For maximum compatibility, include **both** `# TARGET DEVICE:` and `# Name:` with the same value.

### Example Metadata Header
```yaml
# ============================================================================
# TARGET DEVICE: Waveshare Touch LCD 7"
# Name: Waveshare Touch LCD 7"
# Resolution: 800x480
# Shape: rect
# ============================================================================
```

---

## 👩‍🍳 Creating Your Own Recipe

1. **Start with a working ESPHome YAML**: Take an existing, working configuration for your device.
2. **Add Metadata**: Add the `# TARGET DEVICE`, `# Resolution`, and `# Shape` comments at the top.
3. **Clean Up**: Remove any existing UI drawing logic (like `it.print`, `it.fill_screen`, etc.) from your `display` lambda.
4. **Insert Placeholder**: Add `# __LAMBDA_PLACEHOLDER__` inside the lambda block.
5. **Save**: Save the file with a `.yaml` extension (e.g., `my_awesome_device.yaml`).

> [!IMPORTANT]
> Ensure your `display` platform and `id` match what you expect. The Designer will use whatever display ID you define in the recipe.

---

## 🚀 Uploading and Using

### Where are they saved?
- **Online Mode**: Recipes are saved in the `custom_components/reterminal_dashboard/frontend/hardware/` directory on your Home Assistant machine.
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
