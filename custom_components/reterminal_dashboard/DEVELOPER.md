# Developer Guide: Hardware Profiles

We use a **Hybrid Hardware Strategy**:
1.  **Legacy Devices (E-Ink):** Defined in `devices.js`. Work 100% Offline.
2.  **New Devices (LCD/YAML):** Defined in `frontend/hardware/*.yaml`. **Online Only**.

## adding a New Device (LCD)

### 1. Create YAML Package
Create a new file in `frontend/hardware/my-device.yaml`.
This should be a standard ESPHome package file.

### 2. Register Device
Edit `frontend/js/io/devices.js` and add an entry:

```javascript
  my_device_key: {
    name: "My Device Name",
    isPackageBased: true,
    hardwarePackage: "hardware/my-device.yaml", // URL path relative to index.html
    features: { psram: true, ... }
  },
```

### 3. Verify
*   **Locally (`file://`):** You will see a warning message in the YAML box ("Only available when deployed..."). This confirms the app is trying to load your file.
*   **Online (Home Assistant):** The full YAML including your package will be generated.

## Why Online Only?
Browsers block access to local files (`file://`) for security. To load a YAML file dynamically, it must be served by a web server (like Home Assistant or a local Python server). We chose this trade-off to keep the development workflow simple (no build scripts required).
