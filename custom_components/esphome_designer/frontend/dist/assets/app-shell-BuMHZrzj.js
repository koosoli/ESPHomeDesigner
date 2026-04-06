const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./plugin-CzvCy0u7.js","./vendor-Bi4LEBGV.js","./yaml-engine-RiscMpI2.js","./plugin-vP385GJU.js","./plugin-CeeuqdnP.js","./plugin-D4aymeHD.js","./plugin-BPtizKyl.js","./plugin-CcdEI1D6.js","./text_utils-DPZlj6Oi.js","./plugin-DIh7XOjR.js","./plugin-RuuFIz6k.js","./plugin-D_oknyFj.js","./plugin-B__Ipdeq.js","./plugin-FKWJGLzk.js","./plugin-DPhsGa_h.js","./plugin-Diq7SWRl.js","./plugin-lbwhnibj.js","./plugin-BQXmz0us.js","./plugin-HbCFbp9N.js","./plugin-CLr_rcfJ.js","./template_converter-xh6TZI7e.js","./plugin-Y-ZDwYMf.js","./plugin-D3-a7jVu.js","./plugin-OhJ2rJGH.js","./fillable_shape-CfyTknNx.js","./plugin-CIx5zOh8.js","./plugin-DIkabyao.js","./plugin-Be0HxiGe.js","./plugin-jNhex5tQ.js","./plugin-BMVtBWYG.js","./plugin-8Bj6oHMX.js","./plugin-BXOvUA-4.js","./plugin-B8-6gZ5E.js","./plugin-CLpsqNtn.js","./plugin-D2DoSFo-.js","./plugin-BDdiMiPo.js"])))=>i.map(i=>d[i]);
import"./vendor-Bi4LEBGV.js";import{l as ue,p as Kt,h as Pe}from"./yaml-engine-RiscMpI2.js";const jn="modulepreload",Un=function(t,e){return new URL(t,e).href},kt={},P=function(e,n,i){let o=Promise.resolve();if(n&&n.length>0){const s=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),l=a?.nonce||a?.getAttribute("nonce");o=Promise.allSettled(n.map(c=>{if(c=Un(c,i),c in kt)return;kt[c]=!0;const d=c.endsWith(".css"),u=d?'[rel="stylesheet"]':"";if(!!i)for(let m=s.length-1;m>=0;m--){const y=s[m];if(y.href===c&&(!d||y.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${u}`))return;const g=document.createElement("link");if(g.rel=d?"stylesheet":jn,d||(g.as="script"),g.crossOrigin="",g.href=c,l&&g.setAttribute("nonce",l),document.head.appendChild(g),d)return new Promise((m,y)=>{g.addEventListener("load",m),g.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(s){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=s,window.dispatchEvent(a),!a.defaultPrevented)throw s}return o.then(s=>{for(const a of s||[])a.status==="rejected"&&r(a.reason);return e().catch(r)})},Jt=new EventTarget,C={STATE_CHANGED:"state-changed",SELECTION_CHANGED:"selection-changed",WIDGET_UPDATED:"widget:updated",PAGE_CHANGED:"page-changed",HISTORY_CHANGED:"history-changed",SETTINGS_CHANGED:"settings-changed",LAYOUT_IMPORTED:"layout-imported",ENTITIES_LOADED:"entities-loaded",ZOOM_CHANGED:"zoom-changed",DEVICE_PROFILES_UPDATED:"device-profiles-updated"};function L(t,e={}){Jt.dispatchEvent(new CustomEvent(t,{detail:e}))}function W(t,e){Jt.addEventListener(t,n=>e(n.detail))}const qn={WHITE:"#FFFFFF",BLACK:"#000000",GRAY:"#808080",GREY:"#808080",RED:"#FF0000",GREEN:"#00FF00",BLUE:"#0000FF",YELLOW:"#FFFF00",ORANGE:"#FFA500"},Vn={GRID_SIZE:10,SNAP_THRESHOLD:10,SIDEBAR_WIDTH:300,PROPERTIES_WIDTH:350},Xn={X:40,Y:40,WIDTH:200,HEIGHT:60},Kn={TOP_LEFT:"TOP_LEFT",TOP_CENTER:"TOP_CENTER",TOP_RIGHT:"TOP_RIGHT",CENTER_LEFT:"CENTER_LEFT",CENTER:"CENTER",CENTER_RIGHT:"CENTER_RIGHT",BOTTOM_LEFT:"BOTTOM_LEFT",BOTTOM_CENTER:"BOTTOM_CENTER",BOTTOM_RIGHT:"BOTTOM_RIGHT"},Qe={LANDSCAPE:"landscape",PORTRAIT:"portrait"},Zt={snapEnabled:!0,showGrid:!0,showDebugGrid:!1,showRulers:!1,gridOpacity:8,editor_light_mode:!1,aiProvider:"gemini",aiModelGemini:"gemini-1.5-flash",aiModelOpenAI:"gpt-4o",aiModelOpenRouter:"",aiModelFilter:"",extendedLatinGlyphs:!1,autoCycleEnabled:!1,autoCycleIntervalS:30,refreshInterval:600,manualRefreshOnly:!1,darkMode:!1,invertedColors:!1,lcdEcoStrategy:"backlight_off",dimTimeout:10,sleepEnabled:!1,sleepStartHour:0,sleepEndHour:5,deepSleepEnabled:!1,deepSleepInterval:600,deepSleepStayAwakeSwitch:!1,deepSleepStayAwakeEntityId:"input_boolean.esphome_stay_awake",deepSleepFirmwareGuard:!1,dailyRefreshEnabled:!1,dailyRefreshTime:"08:00",noRefreshStartHour:null,noRefreshEndHour:null,renderingMode:"direct",oeplEntityId:"",oeplDither:2,opendisplayEntityId:"",opendisplayDither:2,opendisplayTtl:60,glyphsets:["GF_Latin_Kernel"]},Qt=50,Jn={RSS:300,ENTITIES:60},Zn=5e3,le=10,Qn=10,en={white:"COLOR_WHITE",black:"COLOR_BLACK",gray:"Color(160, 160, 160)",grey:"Color(160, 160, 160)",red:"COLOR_RED",green:"COLOR_GREEN",blue:"COLOR_BLUE",yellow:"COLOR_YELLOW",orange:"COLOR_ORANGE"},tn=800,nn=480;window.ESPHomeDesigner=window.ESPHomeDesigner||{version:"1.0.0-rc.11",constants:{COLORS:qn,UI_DEFAULTS:Vn,ALIGNMENT:Kn,ORIENTATIONS:Qe,DEFAULT_PREFERENCES:Zt,WIDGET_DEFAULTS:Xn,HISTORY_LIMIT:Qt,CACHE_TTL:Jn,ENTITY_LIMIT:Zn,ESPHOME_COLOR_MAPPING:en,DEFAULT_CANVAS_WIDTH:tn,DEFAULT_CANVAS_HEIGHT:nn,SNAP_DISTANCE:le,GRID_SIZE:Qn}};function se(){try{const t=globalThis;return typeof t.addEventListener=="function"&&typeof t.removeEventListener=="function"?t:null}catch{return null}}function G(t,e,n){const i=se();return i?(n===void 0?i.addEventListener(t,e):i.addEventListener(t,e,n),!0):!1}function Y(t,e,n){const i=se();return i?(i.removeEventListener(t,e),!0):!1}function ut(t){const e=se();return e?e.dispatchEvent(t):!1}function ei(){return!!se()?.isSecureContext}function ti(){const t=se();return{x:t?.scrollX||0,y:t?.scrollY||0}}function It(){return se()?.devicePixelRatio||1}function ni(t){const e=se();return e?e.getComputedStyle(t):null}const ii=globalThis,oi=ii.process,Lt=se(),ri=(typeof localStorage<"u"?localStorage.getItem("esphome-designer-debug"):oi?.env?.DEBUG||"")==="true"||!!Lt&&new URLSearchParams(Lt.location.search).get("debug")==="true",_={log:(...t)=>ri&&console.log("[ESPHomeDesigner]",...t),warn:(...t)=>console.warn("[ESPHomeDesigner]",...t),error:(...t)=>console.error("[ESPHomeDesigner]",...t)},si=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Elecrow 7.0" HMI 800x480
#         - Display Platform: rpi_dpi_rgb (RGB LCD)
#         - PSRAM: Yes (Octal, 80MHz)
#         - Touchscreen: GT911 (I2C)
#         - Framework: ESP-IDF with execute_from_psram
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  platformio_options:
    build_flags: "-DBOARD_HAS_PSRAM"
    board_build.esp-idf.memory_type: qio_opi
    board_build.flash_mode: dio
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  board: esp32-s3-devkitc-1
  variant: esp32s3
  flash_size: 16MB
  framework:
    type: esp-idf
    advanced:
       execute_from_psram: true
    sdkconfig_options:
      CONFIG_ESP32S3_DEFAULT_CPU_FREQ_240: y
      CONFIG_ESP32S3_DATA_CACHE_64KB: y
      CONFIG_SPIRAM_FETCH_INSTRUCTIONS: y
      CONFIG_SPIRAM_RODATA: y

psram:
  mode: octal
  speed: 80MHz

preferences:
  flash_write_interval: 5min

output:
  - platform: ledc
    pin: GPIO2
    frequency: 1220
    id: gpio_backlight_pwm

light:
  - platform: monochromatic
    output: gpio_backlight_pwm
    name: Display Backlight
    icon: mdi:lightbulb-on
    id: display_backlight
    restore_mode: ALWAYS_ON

i2c:
  - id: bus_a
    sda: GPIO19
    scl: GPIO20
    scan: true

touchscreen:
  - platform: gt911
    id: my_touchscreen
    i2c_id: bus_a
    transform:
      mirror_x: false
      mirror_y: false
    update_interval: 50ms
    address: 0x5D
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight

display:
  - platform: rpi_dpi_rgb
    id: my_display
    data_pins:
      red:
        - 14
        - 21
        - 47
        - 48
        - 45
      green:
        - 9
        - 46
        - 3
        - 8
        - 16
        - 1
      blue:
        - 15
        - 7
        - 6
        - 5
        - 4
    de_pin: GPIO41
    hsync_pin: 39
    vsync_pin: 40
    pclk_pin: 0
    hsync_front_porch: 40
    hsync_pulse_width: 48
    hsync_back_porch: 13
    vsync_front_porch: 1
    vsync_pulse_width: 31
    vsync_back_porch: 13
    pclk_inverted: true
    color_order: RGB
    auto_clear_enabled: false
    update_interval: never
    dimensions:
      width: 800
      height: 480
    # __LAMBDA_PLACEHOLDER__
`,ai=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Guition jc4827w543 4.3" IPS 480x272
#         - Display Platform: qspi_dbi (NV3041A)
#         - PSRAM: Yes (Octal, 80MHz)
#         - Touchscreen: GT911 (I2C)
#         - Framework: ESP-IDF with execute_from_psram
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  project:
    name: "Guition.ESP32-jc4827w543"
    version: "1.0"
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  variant: esp32s3
  flash_size: 4MB
  framework:
    type: esp-idf
    advanced:
       execute_from_psram: true

psram:
  mode: octal
  speed: 80MHz

preferences:
  flash_write_interval: 5min

output:
  - platform: ledc
    pin: 1
    id: gpio_backlight_pwm
    frequency: 1000Hz

light:
  - platform: monochromatic
    output: gpio_backlight_pwm
    name: Display Backlight
    icon: mdi:lightbulb-on
    id: display_backlight
    restore_mode: ALWAYS_ON

i2c:
  - id: bus_a
    sda: GPIO8
    scl: GPIO4
    scan: true

touchscreen:
  - platform: gt911
    id: my_touchscreen
    i2c_id: bus_a
    interrupt_pin:
      number: 3
      ignore_strapping_warning: true
    reset_pin: GPIO38
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight

spi:
  id: quad_spi
  type: quad
  clk_pin: GPIO47
  data_pins: [21,48,40,39]

display:
  - platform: qspi_dbi
    id: my_display
    update_interval: never
    auto_clear_enabled: False
    model: CUSTOM
    data_rate: 20MHz
    dimensions:
      width: 480
      height: 272
    cs_pin:
      number: 45
      ignore_strapping_warning: true
    invert_colors: true
    rotation: 180
    init_sequence:
      - [0xff,0xa5]
      - [0x36,0xc0]
      - [0x3A,0x01]
      - [0x41,0x03]
      - [0x44,0x15]
      - [0x45,0x15]
      - [0x7d,0x03]
      - [0xc1,0xbb]
      - [0xc2,0x05]
      - [0xc3,0x10]
      - [0xc6,0x3e]
      - [0xc7,0x25]
      - [0xc8,0x11]
      - [0x7a,0x5f]
      - [0x6f,0x44]
      - [0x78,0x70]
      - [0xc9,0x00]
      - [0x67,0x21]
      - [0x51,0x0a]
      - [0x52,0x76]
      - [0x53,0x0a]
      - [0x54,0x76]
      - [0x46,0x0a]
      - [0x47,0x2a]
      - [0x48,0x0a]
      - [0x49,0x1a]
      - [0x56,0x43]
      - [0x57,0x42]
      - [0x58,0x3c]
      - [0x59,0x64]
      - [0x5a,0x41]
      - [0x5b,0x3c]
      - [0x5c,0x02]
      - [0x5d,0x3c]
      - [0x5e,0x1f]
      - [0x60,0x80]
      - [0x61,0x3f]
      - [0x62,0x21]
      - [0x63,0x07]
      - [0x64,0xe0]
      - [0x65,0x02]
      - [0xca,0x20]
      - [0xcb,0x52]
      - [0xcc,0x10]
      - [0xcd,0x42]
      - [0xd0,0x20]
      - [0xd1,0x52]
      - [0xd2,0x10]
      - [0xd3,0x42]
      - [0xd4,0x0a]
      - [0xd5,0x32]
      - [0x80,0x00]
      - [0xa0,0x00]
      - [0x81,0x07]
      - [0xa1,0x06]
      - [0x82,0x02]
      - [0xa2,0x01]
      - [0x86,0x11]
      - [0xa6,0x10]
      - [0x87,0x27]
      - [0xa7,0x27]
      - [0x83,0x37]
      - [0xa3,0x37]
      - [0x84,0x35]
      - [0xa4,0x35]
      - [0x85,0x3f]
      - [0xa5,0x3f]
      - [0x88,0x0b]
      - [0xa8,0x0b]
      - [0x89,0x14]
      - [0xa9,0x14]
      - [0x8a,0x1a]
      - [0xaa,0x1a]
      - [0x8b,0x0a]
      - [0xab,0x0a]
      - [0x8c,0x14]
      - [0xac,0x08]
      - [0x8d,0x17]
      - [0xad,0x07]
      - [0x8e,0x16]
      - [0xae,0x06]
      - [0x8f,0x1B]
      - [0xaf,0x07]
      - [0x90,0x04]
      - [0xb0,0x04]
      - [0x91,0x0a]
      - [0xb1,0x0a]
      - [0x92,0x16]
      - [0xb2,0x15]
      - [0xff,0x00]
      - [0x11,0x00]
      - [0x29,0x00]
    # __LAMBDA_PLACEHOLDER__
`,li=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Guition jc8048w535 3.5" IPS 480x320
#         - Display Platform: qspi_dbi
#         - PSRAM: Yes (Octal, 80MHz)
#         - Touchscreen: AXS15231 (I2C)
#         - Framework: ESP-IDF with execute_from_psram
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  project:
    name: "Guition.ESP32-jc8048w535"
    version: "1.0"
  platformio_options:
    upload_speed: 921600
    board_build.flash_mode: dio
    board_build.f_flash: 80000000L
    board_build.f_cpu: 240000000L
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  variant: esp32s3
  flash_size: 16MB
  framework:
    type: esp-idf
    advanced:
       execute_from_psram: true

psram:
  mode: octal
  speed: 80MHz

preferences:
  flash_write_interval: 5min

output:
  - platform: ledc
    pin: 1
    id: gpio_backlight_pwm

light:
  - platform: monochromatic
    output: gpio_backlight_pwm
    name: Display Backlight
    icon: mdi:lightbulb-on
    id: display_backlight
    restore_mode: ALWAYS_ON

i2c:
  - id: bus_a
    sda: GPIO4
    scl: GPIO8
    scan: true

touchscreen:
  - platform: axs15231
    id: my_touchscreen
    i2c_id: bus_a
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight

spi:
  - type: quad
    clk_pin: GPIO47
    data_pins: [21, 48, 40, 39]
    
display:
  - id: my_display
    platform: qspi_dbi
    dimensions:
      height: 480
      width: 320
    model: CUSTOM
    data_rate: 40MHz
    cs_pin:
      number: 45
      ignore_strapping_warning: true
    draw_from_origin: true
    update_interval: never
    auto_clear_enabled: false
    # __LAMBDA_PLACEHOLDER__
`,di=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Guition JC8048W550 5.0" 800x480
#         - Display Platform: rpi_dpi_rgb (RGB 565)
#         - PSRAM: Yes (Octal)
#         - Touch: GT911 (I2C)
#         - Framework: ESP-IDF
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  project:
    name: "Guition.ESP32-jc8048w550"
    version: "1.0"
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  variant: esp32s3
  flash_size: 16MB
  framework:
    type: esp-idf
    advanced:
       execute_from_psram: true

psram:
  mode: octal
  speed: 80MHz

preferences:
  flash_write_interval: 5min

# -------------------------------------------
# Internal outputs
# -------------------------------------------
output:
  # Backlight LED
  - platform: ledc
    pin:
      number: GPIO02
    id: gpio_backlight_pwm
    frequency: 1220Hz

light:
  - platform: monochromatic
    output: gpio_backlight_pwm
    name: Display Backlight
    icon: mdi:lightbulb-on
    id: display_backlight
    restore_mode: ALWAYS_ON

#-------------------------------------------
# Touchscreen gt911 i2c
#-------------------------------------------
i2c:
  - id: bus_a
    sda: GPIO19
    scl: GPIO20
    scan: true

touchscreen:
  - platform: gt911
    id: my_touchscreen
    i2c_id: bus_a
    address: 0x5D
    update_interval: 16ms
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight

#-------------------------------------------
# Display
#-------------------------------------------
display:
  - platform: rpi_dpi_rgb
    id: my_display
    color_order: RGB
    invert_colors: True
    update_interval: never
    auto_clear_enabled: false # takes 2.8 seconds to clear the display
    dimensions:
      width: 800
      height: 480
    de_pin: GPIO40
    hsync_pin: GPIO39
    vsync_pin: GPIO41
    pclk_pin: GPIO42
    pclk_frequency: 16MHz
    data_pins:
      red:
        - 45
        - 48
        - 47
        - 21
        - 14
      green:
        - 5
        - 6
        - 7
        - 15
        - 16
        - 4
      blue:
        - 8
        - 3
        - 46
        - 9
        - 1


    # __LAMBDA_PLACEHOLDER__`,ci=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Guition jc4848s040 4.0" IPS 480x480
#         - Display Platform: st7701s (SPI/RGB)
#         - PSRAM: Yes (Octal, 80MHz)
#         - Touchscreen: GT911
#         - Framework: ESP-IDF with execute_from_psram
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  project:
    name: "Guition.ESP32-S3-4848S040"
    version: "1.0"
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  variant: esp32s3
  flash_size: 16MB
  framework:
    type: esp-idf
    advanced:
       execute_from_psram: true

psram:
  mode: octal
  speed: 80MHz

preferences:
  flash_write_interval: 5min

output:
  - platform: ledc
    pin: GPIO38  
    id: gpio_backlight_pwm
    frequency: 100Hz
  - id: internal_relay_1
    platform: gpio
    pin: GPIO40
  - id: internal_relay_2
    platform: gpio
    pin: GPIO02
  - id: internal_relay_3
    platform: gpio
    pin: GPIO01

light:
  - platform: monochromatic
    output: gpio_backlight_pwm
    name: Display Backlight
    icon: mdi:lightbulb-on
    id: display_backlight
    restore_mode: ALWAYS_ON

i2c:
  - id: bus_a
    sda: GPIO19
    scl: GPIO45
    scan: true

touchscreen:
  platform: gt911
  id: my_touchscreen
  i2c_id: bus_a
  transform:
    mirror_x: false
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight

spi:
  - id: lcd_spi
    clk_pin: GPIO48
    mosi_pin: GPIO47

display:
  - platform: st7701s
    id: my_display
    update_interval: never
    auto_clear_enabled: False
    spi_mode: MODE3
    data_rate: 2MHz
    color_order: RGB
    invert_colors: False
    dimensions:
      width: 480
      height: 480
    cs_pin: GPIO39
    de_pin: GPIO18
    hsync_pin: GPIO16
    vsync_pin: GPIO17
    pclk_pin: GPIO21
    pclk_frequency: 12MHz
    pclk_inverted: False
    hsync_pulse_width: 8
    hsync_front_porch: 10
    hsync_back_porch: 20
    vsync_pulse_width: 8
    vsync_front_porch: 10
    vsync_back_porch: 10
    init_sequence:
      - 1
      - [ 0xFF, 0x77, 0x01, 0x00, 0x00, 0x10 ]
      - [ 0xCD, 0x00 ]
    data_pins:
      red: [11, 12, 13, 14, 0]
      green: [8, 20, 3, 46, 9, 10]
      blue: [4, 5, 6, 7, 15]
    # __LAMBDA_PLACEHOLDER__
`,pi=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: LilyGo T-Display S3 170x320
#         - Display Platform: ili9xxx (ST7789V via I80)
#         - PSRAM: Yes (Octal)
#         - Buttons: GPIO0, GPIO14
#         - Framework: ESP-IDF
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  platformio_options:
    build_unflags: -Werror=all
    board_build.flash_mode: dio
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep


esp32:
  board: esp32-s3-devkitc-1
  variant: esp32s3
  framework:
    type: esp-idf

psram:
  speed: 80MHz
  mode: octal

preferences:
  flash_write_interval: 5min

power_supply:
  - id: lcd_pwr
    enable_on_boot: true
    pin: GPIO15

i80:
  dc_pin: 7
  wr_pin: 8
  rd_pin: 9
  data_pins:
    - 39
    - 40
    - 41
    - 42
    -
      ignore_strapping_warning: true
      number: 45
    -
      ignore_strapping_warning: true
      number: 46
    - 47
    - 48

i2c:
  - id: bus_a
    sda: 17
    scl: 18

display:
  - platform: ili9xxx
    id: my_display
    rotation: 270
    bus_type: i80
    cs_pin: 6
    reset_pin: 5
    model: st7789v
    data_rate: 2MHz
    dimensions:
      height: 320
      width: 170
      offset_width: 35
      offset_height: 0
    color_order: bgr
    invert_colors: true
    auto_clear_enabled: false
    update_interval: never
    # __LAMBDA_PLACEHOLDER__

binary_sensor:
  - platform: gpio
    pin:
      number: GPIO0
      inverted: true
    name: "Button 1"
  - platform: gpio
    pin:
      number: GPIO14
      inverted: true
    name: "Button 2"

output:
  - platform: ledc
    pin: GPIO38
    id: GPIO38
    frequency: 2000

light:
  - platform: monochromatic
    output: GPIO38
    name: Display Backlight
    icon: mdi:lightbulb-on
    id: display_backlight
    restore_mode: ALWAYS_ON
`,ui=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Seeedstudio SenseCAP Indicator
# Name: Seeedstudio SenseCAP Indicator
# Resolution: 480x480
# Shape: rect
# Orientation: landscape
# Inverted: false
# Dark Mode: enabled
# Refresh Interval: 300
#
# Hardware Details:
# - MCU: ESP32-S3 (WIFI/BLE/Display/Touch) + RP2040 (Sensors/Audio/LoRa)
# - Display: ST7701 4.0" 480x480 IPS (3-wire SPI + RGB)
# - Touch: FT5x06 (I2C) - FT6336
# - IO Expander: PCA9535 (I2C-0x20)
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE everything below into your device YAML
#
# ============================================================================

esphome:
  name: seeedstudio-sensecap-indicator
  friendly_name: Seeedstudio SenseCAP Indicator
  min_version: 2024.11.0

esp32:
  variant: esp32s3
  flash_size: 8MB
  framework:
    type: esp-idf
    sdkconfig_options:
      CONFIG_ESPTOOLPY_FLASHSIZE_8MB: y
      CONFIG_ESP32S3_DEFAULT_CPU_FREQ_240: y
      CONFIG_ESP32S3_DATA_CACHE_64KB: y
      CONFIG_SPIRAM_FETCH_INSTRUCTIONS: y
      CONFIG_SPIRAM_RODATA: y

psram:
  mode: octal
  speed: 80MHz

logger:
  hardware_uart: UART0
  level: DEBUG

# I2C Bus for IO Expander and Touchscreen
i2c:
  - id: bus_a
    sda: GPIO39
    scl: GPIO40
    scan: false

# SPI Bus for Display and LoRa (if present)
spi:
  - id: lcd_spi
    clk_pin: GPIO41
    mosi_pin: GPIO48
    miso_pin: GPIO47

# IO Expander (16-bit PCA9535)
pca9554:
  - id: pca9554a_device
    address: 0x20
    pin_count: 16

# Display Backlight
output:
  - platform: ledc
    pin:
      number: GPIO45
      ignore_strapping_warning: true
    id: ledc_gpio45
    frequency: 100Hz

light:
  - platform: monochromatic
    name: "Backlight"
    id: backlight
    output: ledc_gpio45
    restore_mode: ALWAYS_ON

# User Button
binary_sensor:
  - platform: gpio
    pin:
      number: GPIO38
      inverted: true
    name: "User Button"
  # __TOUCH_SENSORS_PLACEHOLDER__

# Display - Using mipi_rgb platform (recommended, pre-configured)
display:
  - platform: mipi_rgb
    model: SEEED-INDICATOR-D1
    id: my_display
    auto_clear_enabled: true
    lambda: |-
      # __LAMBDA_PLACEHOLDER__

# Touchscreen
touchscreen:
  platform: ft5x06
  id: my_touchscreen
  transform:
    mirror_x: true
    mirror_y: true

# Enable Home Assistant API
api:

# HA Control Buttons for page navigation
button:
  - platform: template
    name: "Next Page"
    icon: "mdi:arrow-right"
    on_press:
      then:
        - script.execute:
            id: change_page_to
            target_page: !lambda 'return id(display_page) + 1;'
  - platform: template
    name: "Previous Page"
    icon: "mdi:arrow-left"
    on_press:
      then:
        - script.execute:
            id: change_page_to
            target_page: !lambda 'return id(display_page) - 1;'
  - platform: template
    name: "Refresh Display"
    icon: "mdi:refresh"
    on_press:
      then:
        - component.update: my_display
  - platform: template
    name: "Go to Page 1"
    icon: "mdi:home"
    on_press:
      then:
        - script.execute:
            id: change_page_to
            target_page: 0
`,hi=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Sunton 2432s028 2.8" 240x320
#         - Display Platform: ili9xxx (ILI9341)
#         - Touchscreen: XPT2046 (SPI)
#         - RGB LED: Yes
#         - Framework: Arduino
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32
#         - Framework: Arduino
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  board: esp32dev
  framework:
    type: arduino

preferences:
  flash_write_interval: 5min

i2c:
  - sda: 27
    scl: 22

output:
  - platform: ledc
    pin: 21
    id: gpio_backlight_pwm
  - id: output_red
    platform: ledc
    pin: 4
    inverted: true
  - id: output_green
    platform: ledc
    pin: 16
    inverted: true
  - id: output_blue
    platform: ledc
    pin: 17
    inverted: true

light:
  - platform: monochromatic
    output: gpio_backlight_pwm
    name: Display Backlight
    icon: mdi:lightbulb-on
    id: display_backlight
    restore_mode: ALWAYS_ON
  - platform: rgb
    id: rgb_led
    name: RGB LED
    red: output_red
    green: output_green
    blue: output_blue
    restore_mode: ALWAYS_OFF

spi:
  - id: tft
    clk_pin: 14
    mosi_pin: 13
    miso_pin:
      number: 12
      ignore_strapping_warning: true
  - id: touch
    clk_pin: 25
    mosi_pin: 32
    miso_pin: 39

touchscreen:
  - id: my_touchscreen
    platform: xpt2046
    spi_id: touch
    cs_pin: 33
    interrupt_pin: 36
    threshold: 400
    calibration:
      x_min: 280
      x_max: 3860
      y_min: 340
      y_max: 3860
    transform:
      mirror_x: false
      mirror_y: true
      swap_xy: false
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight

display:
  - id: my_display
    platform: ili9xxx
    model: ILI9341
    spi_id: tft
    cs_pin:
      number: 15
      ignore_strapping_warning: true
    dc_pin:
      number: 2
      ignore_strapping_warning: true
    invert_colors: true
    color_palette: 8BIT
    update_interval: never
    auto_clear_enabled: false
    transform:
      swap_xy: true
      mirror_x: false
    dimensions:
      height: 320
      width: 240
    # __LAMBDA_PLACEHOLDER__
`,gi=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Sunton 2432s028R 2.8" 240x320 (Resistive)
#         - Display Platform: ili9xxx (ILI9341)
#         - Touchscreen: XPT2046 (SPI Resistive)
#         - RGB LED: Yes
#         - Framework: ESP-IDF
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32
#         - Framework: ESP-IDF
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  board: esp32dev
  framework:
    type: esp-idf

preferences:
  flash_write_interval: 5min

i2c:
  - sda: 27
    scl: 22

output:
  - platform: ledc
    pin: 21
    frequency: 1000hz
    id: gpio_backlight_pwm
  - id: output_red
    platform: ledc
    pin: 4
    inverted: true
  - id: output_green
    platform: ledc
    pin: 16
    inverted: true
  - id: output_blue
    platform: ledc
    pin: 17
    inverted: true

light:
  - platform: monochromatic
    output: gpio_backlight_pwm
    name: Display Backlight
    icon: mdi:lightbulb-on    
    id: display_backlight
    restore_mode: ALWAYS_ON
  - platform: rgb
    id: rgb_led
    name: RGB LED
    red: output_red
    green: output_green
    blue: output_blue
    restore_mode: ALWAYS_OFF

spi:
  - id: tft
    clk_pin: 14
    mosi_pin: 13
    miso_pin:
      number: 12
      ignore_strapping_warning: true
  - id: touch
    clk_pin: 25
    mosi_pin: 32
    miso_pin: 39

touchscreen:
  - id: my_touchscreen
    platform: xpt2046
    spi_id: touch
    cs_pin: 33
    interrupt_pin: 36
    threshold: 400
    calibration:
      x_min: 280
      x_max: 3860
      y_min: 340
      y_max: 3860
    transform:
      mirror_x: true
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight

display:
  - id: my_display
    platform: ili9xxx
    model: ILI9341
    spi_id: tft
    cs_pin:
      number: 15
      ignore_strapping_warning: true
    dc_pin:
      number: 2
      ignore_strapping_warning: true
    invert_colors: false
    update_interval: never
    auto_clear_enabled: false
    transform:
      swap_xy: true
      mirror_x: false
    dimensions:
      height: 320
      width: 240
    # __LAMBDA_PLACEHOLDER__
`,mi=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Sunton 4827s032R 4.3" 480x272 (Resistive)
#         - Display Platform: rpi_dpi_rgb (RGB LCD)
#         - PSRAM: Yes (Octal, 80MHz)
#         - Touchscreen: XPT2046 (SPI)
#         - Framework: ESP-IDF with execute_from_psram
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  platformio_options:
    build_flags: "-DBOARD_HAS_PSRAM"
    board_build.esp-idf.memory_type: qio_opi
    board_build.flash_mode: dio
    board_upload.maximum_ram_size: 524288
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  board: esp32-s3-devkitc-1
  variant: esp32s3
  flash_size: 16MB
  framework:
    type: esp-idf
    advanced:
       execute_from_psram: true
    sdkconfig_options:
      COMPILER_OPTIMIZATION_SIZE: y
      CONFIG_ESP32S3_DEFAULT_CPU_FREQ_240: y
      CONFIG_ESP32S3_DATA_CACHE_64KB: y
      CONFIG_ESP32S3_DATA_CACHE_LINE_64B: y
      CONFIG_SPIRAM_FETCH_INSTRUCTIONS: y
      CONFIG_SPIRAM_RODATA: y
      CONFIG_ESPTOOLPY_FLASHSIZE_16MB: y 
      
preferences:
  flash_write_interval: 5min      

psram:
  mode: octal
  speed: 80MHz

i2c:
  - id: bus_a
    sda: 19
    scl: 20

output:
  - platform: ledc
    pin: 2
    frequency: 1220
    id: gpio_backlight_pwm

light:
  - platform: monochromatic 
    output: gpio_backlight_pwm
    name: Display Backlight
    id: display_backlight
    restore_mode: ALWAYS_ON
    
spi:
  - id: spi_touch
    clk_pin: 12
    mosi_pin: 11
    miso_pin: 13 

touchscreen:
  - id: my_touchscreen
    platform: xpt2046
    spi_id: spi_touch
    cs_pin: 38
    interrupt_pin: 18
    update_interval: 100ms
    threshold: 400
    calibration:
      x_min: 300 
      x_max: 3700
      y_min: 300 
      y_max: 3700 
    transform:
      swap_xy: true 
      mirror_x: false
      mirror_y: true
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight

display:
  - id: my_display
    platform: rpi_dpi_rgb
    dimensions:
      width: 480 
      height: 280
    rotation: 90
    color_order: RGB
    de_pin: 40
    hsync_pin: 39
    vsync_pin: 41
    pclk_pin: 42
    pclk_inverted: true
    pclk_frequency: 14MHz 
    hsync_front_porch: 8
    hsync_pulse_width: 4
    hsync_back_porch: 43
    vsync_front_porch: 8
    vsync_pulse_width: 4
    vsync_back_porch: 12
    data_pins:
      red: [45, 48, 47, 21, 14]
      green: [5, 6, 7, 15, 16, 4]
      blue: [8, 3, 46, 9, 1]
    update_interval: never
    auto_clear_enabled: false
    # __LAMBDA_PLACEHOLDER__
`,fi=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Sunton 8048s050 5.0" 800x480
#         - Display Platform: rpi_dpi_rgb (RGB LCD)
#         - PSRAM: Yes (Octal, 80MHz)
#         - Touchscreen: GT911 (I2C)
#         - Framework: ESP-IDF with execute_from_psram
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  project:
    name: "Sunton.ESP32-S3-8048S050"
    version: "1.0"
  platformio_options:
    build_flags: "-DBOARD_HAS_PSRAM"
    board_build.esp-idf.memory_type: qio_opi
    board_build.flash_mode: dio
    board_upload.maximum_ram_size: 524288
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  board: esp32-s3-devkitc-1
  variant: esp32s3
  flash_size: 16MB
  framework:
    type: esp-idf
    advanced:
       execute_from_psram: true

preferences:
  flash_write_interval: 5min

psram:
  mode: octal
  speed: 80MHz

output:
  - platform: ledc
    pin: 2
    frequency: 1220
    id: gpio_backlight_pwm

light:
  - platform: monochromatic
    output: gpio_backlight_pwm
    name: Display Backlight
    icon: mdi:lightbulb-on
    id: display_backlight
    restore_mode: ALWAYS_ON

i2c:
  - id: bus_a
    sda: 19
    scl: 20
    scan: true

touchscreen:
  - platform: gt911
    id: my_touchscreen
    i2c_id: bus_a
    address: 0x5D
    update_interval: 16ms
    transform:
      mirror_x: true
      swap_xy: true
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight

display:
  - platform: rpi_dpi_rgb
    id: my_display
    dimensions:
      width: 800
      height: 480
    rotation: 90
    color_order: RGB
    de_pin: 40
    hsync_pin: 39
    vsync_pin: 41
    pclk_pin: 42
    pclk_inverted: true
    pclk_frequency: 14MHz
    hsync_front_porch: 8
    hsync_pulse_width: 4
    hsync_back_porch: 8
    vsync_front_porch: 8
    vsync_pulse_width: 4
    vsync_back_porch: 8
    data_pins:
      red: [45, 48, 47, 21, 14]
      green: [5, 6, 7, 15, 16, 4]
      blue: [8, 3, 46, 9, 1]
    update_interval: never
    auto_clear_enabled: false
    # __LAMBDA_PLACEHOLDER__
`,yi=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Sunton 8048s070 7.0" 800x480
#         - Display Platform: rpi_dpi_rgb (RGB LCD)
#         - PSRAM: Yes (Octal, 80MHz)
#         - Touchscreen: GT911 (I2C)
#         - Audio: I2S Speaker
#         - Framework: ESP-IDF with execute_from_psram
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  project:
    name: "Sunton.ESP32-S3-8048S070"
    version: "1.0"
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  variant: esp32s3
  flash_size: 16MB
  framework:
    type: esp-idf
    advanced:
       execute_from_psram: true

psram:
  mode: octal
  speed: 80MHz

preferences:
  flash_write_interval: 5min

i2s_audio:
    i2s_lrclk_pin: 18
    i2s_bclk_pin:
      number: 0
      ignore_strapping_warning: true

output:
  - platform: ledc
    id: gpio_backlight_pwm
    pin: GPIO02
    frequency: 1220

light:
  - platform: monochromatic
    output: gpio_backlight_pwm
    name: Display Backlight
    icon: mdi:lightbulb-on
    id: display_backlight
    restore_mode: ALWAYS_ON

i2c:
  - id: bus_a
    sda: 19
    scl: 20

touchscreen:
  platform: gt911
  id: my_touchscreen
  i2c_id: bus_a
  transform:
    mirror_x: false
    mirror_y: false
  on_release:
    - if:
        condition: lvgl.is_paused
        then:
          - lvgl.resume:
          - lvgl.widget.redraw:
          - light.turn_on: display_backlight

display:
  - platform: rpi_dpi_rgb
    id: my_display
    color_order: RGB
    invert_colors: True
    update_interval: never
    auto_clear_enabled: false
    dimensions:
      width: 800
      height: 480
    de_pin: 41
    hsync_pin: 39
    vsync_pin: 40
    pclk_pin: 42
    pclk_frequency: 16MHz
    pclk_inverted: True
    hsync_pulse_width: 30
    hsync_front_porch: 210
    hsync_back_porch: 16
    vsync_pulse_width: 13
    vsync_front_porch: 22
    vsync_back_porch: 10
    data_pins:
      red: [14, 21, 47, 48, 45]
      green: [9, 46, 3, 8, 16, 1]
      blue: [15, 7, 6, 5, 4]
    # __LAMBDA_PLACEHOLDER__
`,vi=`# ============================================================================\r
# ESPHome YAML - Generated by ESPHome Designer\r
# ============================================================================\r
# TARGET DEVICE: ViewDisplay ESP32 Round TFT Knob 2.1" UEDX48480021-MD80ET\r
#         - Display Platform: st7701s (RGB LCD)\r
#         - PSRAM: Yes (Octal, 80MHz)\r
#         - Touchscreen: CST816\r
#         - Framework: ESP-IDF\r
# Name: ViewDisplay ESP32 Round TFT Knob 2.1" UEDX48480021-MD80ET\r
# Resolution: 480x480\r
# Shape: round\r
# ============================================================================\r
#\r
# BASED ON:\r
# - https://viewedisplay.com/product/esp32-2-1-inch-480x480-round-tft-knob-display-rotary-encoder-arduino-lvgl/\r
# - https://github.com/VIEWESMART/UEDX48480021-MD80ESP32-2.1inch-Touch-Knob-Display\r
# - https://github.com/esphome/feature-requests/issues/3254\r
#\r
# Hardware configuration adapted for ESPHome Designer.\r
#\r
# ============================================================================\r
#\r
# SETUP INSTRUCTIONS:\r
#\r
# STEP 1: Copy the Material Design Icons font file\r
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf\r
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf\r
#         (Create the fonts folder if it doesn't exist)\r
#\r
# STEP 2: Create a new device in ESPHome\r
#         - Click "New Device"\r
#         - Name: your-device-name\r
#         - Select: ESP32-S3\r
#         - Framework: ESP-IDF (Required for this device)\r
#\r
# STEP 3: PASTE this snippet into your device YAML\r
#         - Paste this snippet at the end of your configuration.\r
#         - System sections (esphome, esp32, psram, etc.) are auto-commented\r
#           to avoid conflicts with your existing setup.\r
#\r
# ============================================================================\r
\r
esphome:\r
  min_version: 2024.11.0\r
  project:\r
    name: "ViewDisplay.ESP32-S3-UEDX48480021"\r
    version: "1.0"\r
\r
esp32:\r
  board: esp32-s3-devkitc-1\r
  variant: esp32s3\r
  flash_size: 16MB\r
  framework:\r
    type: esp-idf\r
    advanced:\r
      execute_from_psram: true\r
\r
psram:\r
  mode: octal\r
  speed: 80MHz\r
\r
preferences:\r
  flash_write_interval: 5min\r
\r
logger:\r
  level: DEBUG\r
\r
spi:\r
  - id: lcd_spi\r
    clk_pin:\r
      number: GPIO13\r
      allow_other_uses: true\r
    mosi_pin:\r
      number: GPIO12\r
      allow_other_uses: true\r
\r
output:\r
  - platform: ledc\r
    pin: GPIO7\r
    id: gpio_backlight_pwm\r
    frequency: 1000Hz\r
\r
light:\r
  - platform: monochromatic\r
    output: gpio_backlight_pwm\r
    name: Display Backlight\r
    id: display_backlight\r
    restore_mode: ALWAYS_ON\r
\r
i2c:\r
  - id: bus_a\r
    sda: GPIO16\r
    scl: GPIO15\r
    scan: true\r
\r
display:\r
  - platform: st7701s\r
    id: my_display\r
    rotation: 0\r
    update_interval: 1s\r
    auto_clear_enabled: true\r
    color_order: RGB\r
    dimensions:\r
      width: 480\r
      height: 480\r
    cs_pin: GPIO18\r
    reset_pin:\r
      number: GPIO8\r
      allow_other_uses: true\r
    de_pin: GPIO17\r
    hsync_pin: GPIO46\r
    vsync_pin: GPIO3\r
    pclk_pin: GPIO9\r
    pclk_frequency: 12MHz\r
    hsync_pulse_width: 255\r
    hsync_front_porch: 1\r
    hsync_back_porch: 255\r
    vsync_pulse_width: 254\r
    vsync_front_porch: 2\r
    vsync_back_porch: 254\r
    data_pins:\r
      red: [40, 41, 42, 2, 1]\r
      green: [21, 47, 48, 45, 38, 39]\r
      blue:\r
        - 10\r
        - 11\r
        - number: 12\r
          allow_other_uses: true\r
        - number: 13\r
          allow_other_uses: true\r
        - 14\r
    # __LAMBDA_PLACEHOLDER__\r
\r
touchscreen:\r
  - platform: cst816\r
    id: my_touchscreen\r
    reset_pin:\r
      number: GPIO8\r
      allow_other_uses: true\r
    transform:\r
      swap_xy: false\r
      mirror_x: false\r
      mirror_y: false\r
    on_release:\r
      - if:\r
          condition: lvgl.is_paused\r
          then:\r
            - lvgl.resume:\r
            - lvgl.widget.redraw:\r
            - light.turn_on: display_backlight\r
\r
sensor:\r
  - platform: rotary_encoder\r
    name: Rotary Encoder\r
    id: knob_encoder\r
    pin_a: GPIO6\r
    pin_b: GPIO5\r
    resolution: 2\r
    internal: true\r
\r
binary_sensor:\r
  # __TOUCH_SENSORS_PLACEHOLDER__\r
  - platform: gpio\r
    name: Encoder Button\r
    id: encoder_button\r
    pin:\r
      number: GPIO0\r
      inverted: true\r
      ignore_strapping_warning: true\r
    internal: true`,bi=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Waveshare Touch LCD 4.3 4.3" 800x480
#         - Display Platform: rpi_dpi_rgb
#         - PSRAM: Yes (Octal, 80MHz)
#         - Touchscreen: GT911 (I2C via CH422G)
#         - Framework: ESP-IDF with execute_from_psram
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  platformio_options:
    board_build.flash_mode: dio
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  board: esp32-s3-devkitc-1
  variant: esp32s3
  flash_size: 16MB
  framework:
    type: esp-idf
    advanced:
       execute_from_psram: true
    sdkconfig_options:
      CONFIG_ESP32S3_DEFAULT_CPU_FREQ_240: "y"
      CONFIG_ESP32S3_DATA_CACHE_64KB: "y"
      CONFIG_SPIRAM_FETCH_INSTRUCTIONS: y
      CONFIG_SPIRAM_RODATA: y

psram:
  mode: octal
  speed: 80MHz

preferences:
  flash_write_interval: 5min

ch422g:
  - id: ch422g_hub

switch:
  - platform: gpio
    id: lcdbacklight
    name: lcdbacklight
    pin:
      ch422g: ch422g_hub
      number: 2
      mode:
        output: true
      inverted: false
    restore_mode: ALWAYS_ON

light:
  - platform: monochromatic
    name: "Display Backlight"
    output: fake_backlight_output
    id: display_backlight
    default_transition_length: 1s
    gamma_correct: 2.8

output:
  - platform: template
    id: fake_backlight_output
    type: float
    write_action:
      - lambda: |-
          ESP_LOGD("fake_light", "Fake brightness level: %.2f", state);

i2c:
  - id: bus_a
    sda: 8
    scl: 9

touchscreen:
  - platform: gt911
    id: my_touchscreen
    i2c_id: bus_a
    interrupt_pin: 4
    reset_pin:
      ch422g: ch422g_hub
      number: 1
    transform:
      swap_xy: true
    on_release:
      - if:
          condition: lvgl.is_paused
          then:
            - lvgl.resume:
            - lvgl.widget.redraw:
            - light.turn_on: display_backlight

display:
  - platform: rpi_dpi_rgb
    id: my_display
    update_interval: 1s
    auto_clear_enabled: true
    color_order: RGB
    pclk_frequency: 16MHz
    dimensions:
      width: 800
      height: 480
    reset_pin:
      ch422g: ch422g_hub
      number: 3
    enable_pin:
      ch422g: ch422g_hub
      number: 2
    de_pin:
      number: 5
    hsync_pin:
      number: 46
      ignore_strapping_warning: true
    vsync_pin:
      number: 3
      ignore_strapping_warning: true
    pclk_pin: 7
    hsync_back_porch: 30
    hsync_front_porch: 210
    hsync_pulse_width: 30
    vsync_back_porch: 4
    vsync_front_porch: 4
    vsync_pulse_width: 4
    data_pins:
      red: [1, 2, 42, 41, 40]
      blue: [14, 38, 18, 17, 10]
      green: [39, 0, 45, 48, 47, 21]
    # __LAMBDA_PLACEHOLDER__
`,_i=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Waveshare Touch LCD 7 7.0" 800x480
#         - Display Platform: mipi_rgb (RGB LCD)
#         - PSRAM: Yes (Octal, 80MHz)
#         - Touchscreen: GT911 (I2C via CH422G)
#         - Framework: ESP-IDF with execute_from_psram
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32-S3
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# CAPTIVE PORTAL:
#         - If WiFi connection fails, look for a hotspot named:
#           "Waveshare-7-Inch"
#         - Connect and go to http://192.168.4.1 to configure WiFi.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  project:
    name: "Waveshare.ESP32-S3-touch-lcd-7"
    version: "1.0"
  platformio_options:
    board_upload.maximum_ram_size: 524288
  # Fix Issue #80: Call display refresh script on boot to prevent black screen
  on_boot:
    priority: 600
    then:
      - delay: 2s
      - script.execute: manage_run_and_sleep

esp32:
  variant: esp32s3
  flash_size: 16MB
  framework:
    type: esp-idf
    advanced:
       execute_from_psram: true

psram:
  mode: octal
  speed: 80Mhz

preferences:
  flash_write_interval: 5min

ch422g:
  - id: ch422g_hub

switch:
  - platform: gpio
    id: lcdbacklight
    name: lcdbacklight
    pin:
      ch422g: ch422g_hub
      number: 2
      mode:
        output: true
      inverted: false
    restore_mode: ALWAYS_ON

light:
  - platform: monochromatic
    name: "Display Backlight"
    output: fake_backlight_output
    id: display_backlight
    default_transition_length: 1s
    gamma_correct: 2.8

output:
  - platform: template
    id: fake_backlight_output
    type: float
    write_action:
      - lambda: |-
          ESP_LOGD("fake_light", "Fake brightness level: %.2f", state);

i2c:
  - id: bus_a
    sda: GPIO8
    scl: GPIO9
    scan: true

touchscreen:
  platform: gt911
  id: my_touchscreen
  i2c_id: bus_a
  interrupt_pin: GPIO4
  reset_pin:
    ch422g: ch422g_hub
    number: 1
    mode: OUTPUT
  transform:
    swap_xy: true
  on_release:
    - if:
        condition: lvgl.is_paused
        then:
          - lvgl.resume:
          - lvgl.widget.redraw:
          - light.turn_on: display_backlight

display:
  - platform: mipi_rgb
    model: ESP32-S3-TOUCH-LCD-7-800X480
    id: my_display
    rotation: 0
    update_interval: 1s
    auto_clear_enabled: true
    color_order: RGB
    pclk_frequency: 16MHZ
    dimensions:
      width: 800
      height: 480
    reset_pin:
      ch422g: ch422g_hub
      number: 3
    de_pin:
      number: GPIO5
    hsync_pin:
      number: GPIO46
      ignore_strapping_warning: true
    vsync_pin:
      number: GPIO3
      ignore_strapping_warning: true
    pclk_pin: GPIO7
    pclk_inverted: true
    hsync_back_porch: 8
    hsync_front_porch: 8
    hsync_pulse_width: 4
    vsync_back_porch: 8
    vsync_front_porch: 8
    vsync_pulse_width: 4
    data_pins:
      red: [1, 2, 42, 41, 40]
      blue: [14, 38, 18, 17, 10]
      green: [39, 0, 45, 48, 47, 21]
    # __LAMBDA_PLACEHOLDER__
`,xi=`# ============================================================================
# ESPHome YAML - Generated by ESPHome Designer
# ============================================================================
# TARGET DEVICE: Waveshare Universal e-Paper Raw Panel Driver Board
# Display: 7.5" e-Paper (V2)
# Resolution: 800x480
# Shape: rect
# Orientation: landscape
# Framework: ESP-IDF
# ============================================================================
#
# BASED ON: https://github.com/agillis/esphome-modular-lvgl-buttons
# Hardware configuration adapted for ESPHome Designer.
#
# ============================================================================
#
# SETUP INSTRUCTIONS:
#
# STEP 1: Copy the Material Design Icons font file
#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf
#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf
#         (Create the fonts folder if it doesn't exist)
#
# STEP 2: Create a new device in ESPHome
#         - Click "New Device"
#         - Name: your-device-name
#         - Select: ESP32
#         - Framework: ESP-IDF (Required for this device)
#
# STEP 3: PASTE this snippet into your device YAML
#         - Paste this snippet at the end of your configuration.
#         - System sections (esphome, esp32, psram, etc.) are auto-commented
#           to avoid conflicts with your existing setup.
#
# ============================================================================

esphome:
  min_version: 2024.11.0
  project:
    name: "Waveshare.ESP32-Universal-epaper-7.5v2"
    version: "1.0"

esp32:
  board: esp32dev
  framework:
    type: esp-idf

spi:
  clk_pin: GPIO13
  mosi_pin: GPIO14

display:
  - platform: waveshare_epaper
    cs_pin: GPIO15
    dc_pin: GPIO27
    busy_pin: 
      number: GPIO25
      inverted: true
    reset_pin: GPIO26
    reset_duration: 10ms
    model: 7.50inv2p
    rotation: 0°
    update_interval: 5min
    id: my_display

    # __LAMBDA_PLACEHOLDER__
`,on="esphome-designer-ha-auth";let rn=null;function ht(){try{const t=globalThis.location;return t||null}catch{return null}}function Fe(){try{return globalThis.localStorage??null}catch{return null}}function sn(t){if(typeof t!="string")return;const e=t.trim();!e||e==="null"||(rn=e)}function wi(){try{const t=globalThis.name;if(!t)return;const e=JSON.parse(t);e?.type===on&&sn(e.accessToken)}catch{}}function Si(){wi();try{globalThis.addEventListener?.("message",t=>{const e=ht();if(e&&t.origin!==e.origin)return;const n=t.data;n?.type===on&&sn(n.accessToken)})}catch{}}function an(t){if(!t)return null;let e=t.trim();if(!e)return null;try{const n=new URL(e);return n.protocol!=="http:"&&n.protocol!=="https:"?null:(e=`${n.origin}${n.pathname}`,n.search&&(e+=n.search),e.endsWith("/")&&(e=e.slice(0,-1)),e.includes("reterminal_dashboard")&&(e=e.replace("reterminal_dashboard","esphome_designer")),e.includes("/api/")||(e+="/api/esphome_designer"),e)}catch{return null}}function ln(){const t=dn();if(t){const e=an(t);return e?(e!==t.trim()&&(_.log("[Env] Normalizing stored manual HA URL"),cn(e)),e):(_.warn("[Env] Ignoring invalid manually configured HA URL"),null)}try{const e=ht();return!e||e.protocol==="file:"?null:e.hostname==="homeassistant"||e.hostname==="hassio"||e.pathname.includes("/api/")||e.pathname.includes("/local/")||e.pathname.includes("/hacsfiles/")||e.pathname.includes("/esphome-designer")?`${e.origin}/api/esphome_designer`:null}catch{return null}}function dn(){try{const t=Fe();return t?t.getItem("ha_manual_url"):null}catch{return null}}function cn(t){try{const e=Fe();if(!e)return;if(t){const n=an(t);if(!n){_.warn("[Env] Refusing to store invalid HA URL");return}e.setItem("ha_manual_url",n)}else e.removeItem("ha_manual_url")}catch(e){_.error("Failed to save HA URL:",e)}}function pn(){try{const t=Fe();return t?t.getItem("ha_llat_token"):null}catch{return null}}function un(){return rn||pn()}function Ei(t){try{const e=Fe();if(!e)return;t?e.setItem("ha_llat_token",t):e.removeItem("ha_llat_token")}catch(e){_.error("Failed to save HA Token:",e)}}let F=ln();Si();function Pt(){F=ln()}function N(){return!!F}function et(){try{const t=ht();return!t||t.protocol==="file:"?!1:t.hostname==="homeassistant"||t.hostname==="hassio"||t.pathname.includes("/api/esphome_designer")||t.pathname.includes("/esphome-designer")}catch{return!1}}const Ci="data-esphome-designer-panel-root",ki="data-esphome-designer-overlay-root";function Ii(){return document.querySelector(`[${Ci}]`)||document.body}function Li(){return document.querySelector(`[${ki}]`)||Ii()}function V(t){return Li().appendChild(t),t}function Pi(){try{const t=globalThis.parent;return!t||t===globalThis?null:t}catch{return null}}function Ti(){const t=Pi();if(!t)return null;try{const e=t.__ESPHOME_DESIGNER_HASS__;if(e&&typeof e.callApi=="function")return e}catch{}try{const e=t.document?.querySelector?.("esphome-designer-panel")?._hass;if(e&&typeof e.callApi=="function")return e}catch{}try{const e=t.document?.querySelector?.("home-assistant")?.hass;if(e&&typeof e.callApi=="function")return e}catch{}return null}function Mi(t){if(!t)return null;try{decodeURI(t);const e=new URL(t,globalThis.location?.origin||"http://localhost");let n=e.pathname;return n.startsWith("/api/")?n=n.slice(5):n=n.replace(/^\/+/,""),`${n}${e.search}`}catch{return null}}function Ai(t){if(!t)return{};if(t instanceof Headers){const e={};return t.forEach((n,i)=>{e[i]=n}),e}return Array.isArray(t)?Object.fromEntries(t):{...t}}function Oi(t,e){if(t==null)return;if(typeof t!="string")return t;const n=Ai(e),i=n["Content-Type"]||n["content-type"]||"",o=t.trim();if(o){if(i.includes("application/json")||i.includes("text/plain")||o.startsWith("{")||o.startsWith("["))try{return JSON.parse(o)}catch{return t}return t}}function Tt(t,e=200){const n=typeof t=="string"?t:JSON.stringify(t);return{ok:e>=200&&e<300,status:e,json:async()=>t,text:async()=>n,blob:async()=>new Blob([n],{type:"application/json"})}}function Di(t){const e=Number(t?.statusCode??t?.status_code??t?.status);return Number.isFinite(e)&&e>0?e:500}function Hi(t){const e=t,n=e?.message||"Request failed",i=e?.body;if(i&&typeof i=="object")return{message:n,...i};if(typeof i=="string")try{const o=JSON.parse(i);return{message:n,...o}}catch{return{error:i,message:n}}return{error:n,message:n}}async function Gi(t,e={}){const n=Ti(),i=Mi(t);if(!n||!i||typeof n.callApi!="function")return null;if(e.signal?.aborted)throw new DOMException("The operation was aborted.","AbortError");try{const o=await n.callApi((e.method||"GET").toLowerCase(),i,Oi(e.body,e.headers));return Tt(o,200)}catch(o){return Tt(Hi(o),Di(o))}}function A(t,e="info",n=3e3){let i=document.getElementById("toast-container");i||(i=document.createElement("div"),i.id="toast-container",i.style.position="fixed",i.style.bottom="20px",i.style.right="20px",i.style.zIndex="9999",V(i));const o=document.createElement("div");o.className="toast";const r=o.style;e==="error"?r.background="rgba(255, 0, 0, 0.8)":e==="success"?r.background="rgba(0, 128, 0, 0.8)":r.background="rgba(0,0,0,0.8)",o.textContent=t,r.color="white",r.padding="10px 20px",r.borderRadius="4px",r.marginTop="10px",r.opacity="0",r.transition="opacity 0.3s",i.appendChild(o),requestAnimationFrame(()=>{r.opacity="1"}),setTimeout(()=>{r.opacity="0",setTimeout(()=>{o.remove()},300)},n)}async function Bi(){if(!N()){_.warn("Cannot load layout from backend: No HA backend detected.");return}try{let t=null;try{const i=await $(`${F}/layouts`,{headers:z()});if(i.ok){const o=await i.json();_.log("[loadLayoutFromBackend] Available layouts:",o.layouts?.map(r=>r.id)),_.log(`[loadLayoutFromBackend] Last active layout ID from backend: ${o.last_active_layout_id}`),o.last_active_layout_id&&(o.layouts?.some(s=>s.id===o.last_active_layout_id)?(t=o.last_active_layout_id,_.log(`[loadLayoutFromBackend] Loading last active layout: ${t}`)):_.warn(`[loadLayoutFromBackend] Last active layout '${o.last_active_layout_id}' no longer exists`)),!t&&o.layouts&&o.layouts.length>0&&(t=o.layouts[0].id,_.log(`[loadLayoutFromBackend] No valid last active, using first layout: ${t}`))}}catch(i){_.warn("[loadLayoutFromBackend] Could not fetch layouts list:",i)}let e;if(t?e=await $(`${F}/layouts/${t}`,{headers:z()}):e=await $(`${F}/layout`,{headers:z()}),!e.ok)throw new Error(`Failed to load layout: ${e.status}`);const n=await e.json();!n.device_id&&t&&(n.device_id=t),_.log(`[loadLayoutFromBackend] Loaded layout '${n.device_id||t||"default"}':`,{name:n.name,device_model:n.device_model,pages:n.pages?.length,widgets:n.pages?.reduce((i,o)=>i+(o.widgets?.length||0),0),renderingMode:n.renderingMode||n.rendering_mode}),p&&(n.device_id||t)&&p.setCurrentLayoutId(n.device_id||t),typeof ue=="function"?ue(n):_.error("[loadLayoutFromBackend] loadLayoutIntoState function missing!"),L(C.LAYOUT_IMPORTED,n)}catch(t){_.error("Error loading layout from backend:",t),A("Error loading layout from backend","error",5e3)}}let Ye=!1,je=!1;async function hn(){if(!N())return!1;if(Ye)return je=!0,_.log("[saveLayoutToBackend] Save already in progress, queuing..."),!1;if(!p)throw new Error("AppState not available");const t=p.currentLayoutId||"reterminal_e1001",e=p.settings.device_model||p.deviceModel||"reterminal_e1001",i={...p.getPagesPayload(),device_id:t,name:p.deviceName||"Layout 1",device_model:e,deviceName:p.deviceName||"Layout 1"};Ye=!0,je=!1;try{_.log(`[saveLayoutToBackend] Saving to layout '${t}':`,{device_model:e,pages:i.pages?.length,widgets:i.pages?.reduce((a,l)=>a+(l.widgets?.length||0),0),renderingMode:i.renderingMode});const o=new AbortController,r=setTimeout(()=>o.abort(),1e4),s=await $(`${F}/layouts/${t}`,{method:"POST",headers:z(),body:JSON.stringify(i),signal:o.signal});if(clearTimeout(r),!s.ok){const a=await s.json().catch(()=>({}));throw new Error(a.message||a.error||`Save failed: ${s.status}`)}return _.log(`[saveLayoutToBackend] Layout '${t}' saved successfully`),!0}catch(o){const r=o instanceof Error?o:new Error(String(o));if(r.name==="AbortError")return!0;if(r.message.includes("Failed to fetch")||r.message.includes("NetworkError")||r.message.includes("net::ERR_")||r.message.includes("ERR_EMPTY_RESPONSE")||r.message.includes("Load failed"))return!1;throw _.error("Failed to save layout to backend:",r),r}finally{Ye=!1,je&&setTimeout(()=>{hn().catch(()=>{})},500)}}async function Ri(t){if(!N())throw new Error("No backend");const e=await $(`${F}/import_snippet`,{method:"POST",headers:z(),body:JSON.stringify({yaml:t})});if(!e.ok){const n=await e.json().catch(()=>({}));throw new Error(n.message||n.error||`Import failed with status ${e.status}`)}return await e.json()}let Z=[],Ue=!1;function z(){const t={"Content-Type":"application/json"},e=un();return e&&e.trim()!==""&&e!=="null"&&(t.Authorization=`Bearer ${e}`),t}async function $(t,e={}){const n=await Gi(t,e);return n||fetch(t,e)}const tt="entity-datalist-global";let ae=null;function gn(){return ae||(ae=document.getElementById(tt),ae||(ae=document.createElement("datalist"),ae.id=tt,V(ae))),ae}function Wi(t){const e=gn();e.innerHTML="",!(!t||t.length===0)&&(t.forEach(n=>{const i=document.createElement("option");i.value=n.entity_id,i.label=n.name||n.entity_id,e.appendChild(i)}),_.log(`[EntityDatalist] Updated with ${t.length} entities`))}async function pe(){if(!N()||!F)return[];if(Ue)return Z;Ue=!0;try{const t=new AbortController,e=setTimeout(()=>t.abort(),1e4);let n,i=!1;const o=un();n=`${F}/entities?domains=sensor,binary_sensor,weather,light,switch,fan,cover,climate,media_player,input_number,number,input_boolean,input_text,input_select,button,input_button,calendar,person,device_tracker,sun,update,scene`,_.log("[EntityStates] Fetching from:",n);let r;try{r=await $(n,{headers:z(),signal:t.signal})}catch(a){if(o&&F)n=`${F.replace("/api/esphome_designer","")}/api/states`,_.log("[EntityStates] Custom endpoint failed, trying native HA API:",n),i=!0,r=await $(n,{headers:z(),signal:t.signal});else throw a}if(clearTimeout(e),!r.ok)return _.warn("[EntityStates] Failed to fetch:",r.status),[];let s=await r.json();if(i&&Array.isArray(s)){const a=["sensor","binary_sensor","weather","light","switch","fan","cover","climate","media_player","input_number","number","input_boolean","input_text","input_select","button","input_button","calendar","person","device_tracker","sun","update","scene"];s=s.filter(l=>{const c=l.entity_id?.split(".")[0];return a.includes(c)}).map(l=>({entity_id:l.entity_id,name:l.attributes?.friendly_name||l.entity_id,state:l.state,unit:l.attributes?.unit_of_measurement,attributes:l.attributes||{}}))}return Array.isArray(s)?(_.log(`[EntityStates] Received ${s.length} entities`),Z=s.map(a=>{const l=a.unit?`${a.state} ${a.unit}`:a.state;return{entity_id:a.entity_id,domain:a.entity_id?.split(".")?.[0]||"",name:a.name||a.entity_id,state:a.state,unit:a.unit,attributes:a.attributes||{},formatted:l}}),_.log(`[EntityStates] Cached ${Z.length} entity states`),p&&(p.entityStates={},Z.forEach(a=>{p.entityStates[a.entity_id]=a}),_.log(`[EntityStates] Populated AppState.entityStates with ${Object.keys(p.entityStates).length} entries`)),Wi(Z),L(C.ENTITIES_LOADED,Z),Z):(_.warn("[EntityStates] Invalid response format"),[])}catch(t){return t instanceof Error&&t.name==="AbortError"?_.warn("[EntityStates] Request timed out after 10 seconds"):_.warn("[EntityStates] Error fetching:",t),[]}finally{Ue=!1}}function Xs(t){const e=Z.find(n=>n.entity_id===t);return e?e.attributes??null:null}function Ni(t){if(t==null||t==="")return 24*60*60*1e3;if(typeof t=="number")return Math.max(t,0)*1e3;const e=String(t).trim();if(!e)return 24*60*60*1e3;if(/^\d+(?:\.\d+)?$/.test(e))return parseFloat(e)*1e3;const n=e.match(/^(\d+(?:\.\d+)?)([a-z]+)$/i);if(!n)return 24*60*60*1e3;const i=parseFloat(n[1]),o=n[2].toLowerCase();return o.startsWith("s")?i*1e3:o.startsWith("m")?i*60*1e3:o.startsWith("h")?i*60*60*1e3:o.startsWith("d")?i*24*60*60*1e3:o.startsWith("w")?i*7*24*60*60*1e3:i*1e3}function Fi(){return(F||"").replace(/\/api\/esphome_designer$/,"")}function zi(t){return!Array.isArray(t)||t.length===0?[]:(Array.isArray(t[0])?t[0]:t).filter(n=>n&&typeof n=="object").map(n=>({state:n.state,last_changed:n.last_changed??n.last_updated??null,last_updated:n.last_updated??n.last_changed??null})).filter(n=>n.state!==void 0&&n.state!==null)}let Mt=!1;async function Ks(t,e="24h"){if(!N()||!F||!t)return[];const n=Fi(),i=new Date,o=new Date(i.getTime()-Ni(e)),r=n?`${n}/api/history/period/${encodeURIComponent(o.toISOString())}?filter_entity_id=${encodeURIComponent(t)}&end_time=${encodeURIComponent(i.toISOString())}&minimal_response&no_attributes&significant_changes_only=0`:null;try{if(!r)return[];const s=await $(r,{headers:z()});if(!s.ok){const a=await s.text().catch(()=>"Unknown error");return Mt||(_.log(`[EntityHistory] History fetch failed for ${t}: ${a}`),Mt=!0),[]}return zi(await s.json())}catch{return[]}}let mn;try{mn=Object.assign({"../../hardware/elecrow-esp32-7inch.yaml":si,"../../hardware/guition-esp32-jc4827w543.yaml":ai,"../../hardware/guition-esp32-jc8048w535.yaml":li,"../../hardware/guition-esp32-jc8048w550.yaml":di,"../../hardware/guition-esp32-s3-4848s040.yaml":ci,"../../hardware/lilygo-tdisplays3.yaml":pi,"../../hardware/seeedstudio-sensecap-indicator.yaml":ui,"../../hardware/sunton-esp32-2432s028.yaml":hi,"../../hardware/sunton-esp32-2432s028R.yaml":gi,"../../hardware/sunton-esp32-4827s032R.yaml":mi,"../../hardware/sunton-esp32-8048s050.yaml":fi,"../../hardware/sunton-esp32-8048s070.yaml":yi,"../../hardware/viewdisplay-esp32-s3-uedx48480021.yaml":vi,"../../hardware/waveshare-esp32-s3-touch-lcd-4.3.yaml":bi,"../../hardware/waveshare-esp32-s3-touch-lcd-7.yaml":_i,"../../hardware/waveshare-esp32-universal-epaper-7.5v2.yaml":xi})}catch{}const gt={getGlob(){const t=mn;return t?()=>t:void 0},getStorage(){try{return globalThis.localStorage??null}catch{return null}}};async function $i(){if(N())try{const i=`${F}/hardware/templates`;_.log("[HardwareDiscovery] Fetching from:",i);const o=await $(i,{headers:z(),cache:"no-store"});if(!o.ok)throw new Error(`HTTP ${o.status}`);return(await o.json()).templates||[]}catch(i){_.error("Failed to fetch dynamic hardware templates from HA:",i)}_.log("[HardwareDiscovery] Attempting to load bundled profiles via glob...");const t=[],e=gt.getGlob();if(typeof e!="function")return _.log("[HardwareDiscovery] Bundled profile glob is unavailable in this runtime; relying on backend/localStorage profiles only."),[];const n=e("../../hardware/*.yaml",{query:"?raw",import:"default",eager:!0});for(const i in n)try{const o=n[i],r=i.split("/").pop()||"hardware.yaml",s=fn(o,r);s.id=r.replace(/\.yaml$/i,"").replace(/[^a-z0-9]/gi,"_").toLowerCase(),s.isPackageBased=!0,s.hardwarePackage=`hardware/${r}`,t.push(s)}catch(o){_.warn(`[HardwareDiscovery] Failed to parse bundled file ${i}:`,o)}return _.log(`[HardwareDiscovery] Loaded ${t.length} bundled fallback profiles.`),t}function fn(t,e){const n="dynamic_offline_"+e.replace(/[^a-z0-9]/gi,"_").toLowerCase();let i=e.replace(/\.yaml$/i,""),o=800,r=480,s="rect";const a=t.match(/#\s*Name:\s*(.*)/i);a&&(i=a[1].trim());const l=t.match(/#\s*Resolution:\s*(\d+)x(\d+)/i);l&&(o=parseInt(l[1]),r=parseInt(l[2]));const c=t.match(/#\s*Shape:\s*(rect|round)/i);c&&(s=c[1].toLowerCase());const u=!!t.match(/#\s*Inverted:\s*(true|yes|1)/i),h=t.match(/^\s*-\s*platform:\s*([a-z0-9_]+)/m)||t.match(/^\s*platform:\s*([a-z0-9_]+)/m),g=h?h[1].trim():void 0,m=t.match(/^\s*model:\s*"?([^"\n]+)"?/m),y=m?m[1].trim():void 0;let v="esp32-s3",f;const b=t.match(/^\s*esp8266:/m);b?v="esp8266":t.match(/^\s*esp32:/m)&&(t.toLowerCase().includes("esp32-s3")?v="esp32-s3":t.toLowerCase().includes("esp32-c3")?v="esp32-c3":t.toLowerCase().includes("esp32-c6")?v="esp32-c6":v="esp32");const x=t.match(/^\s*board:\s*([^\n]+)/m);x&&(f=x[1].trim(),b||(f.toLowerCase().includes("s3")?v="esp32-s3":f.toLowerCase().includes("c3")?v="esp32-c3":f.toLowerCase().includes("c6")&&(v="esp32-c6")));const E=t.match(/#\s*Chip:\s*(.*)/i);E&&(v=E[1].trim());const S=t.match(/#\s*Board:\s*(.*)/i);S&&(f=S[1].trim());const k=t.match(/^\s*color_palette:\s*(\S+)/m),w=k?k[1].trim():void 0,I=t.match(/^\s*color_order:\s*(\S+)/m),T=I?I[1].trim():void 0,O=t.match(/^\s*update_interval:\s*(\S+)/m),M=O?O[1].trim():void 0,D=t.match(/^\s*invert_colors:\s*(true|false)/mi),B=D?D[1].toLowerCase()==="true":void 0;return{id:n,name:i,resolution:{width:o,height:r},shape:s,chip:v,board:f,displayPlatform:g,displayModel:y,colorPalette:w,colorOrder:T,updateInterval:M,invertColors:B,isPackageBased:!0,isOfflineImport:!0,content:t,features:{psram:t.includes("psram:"),lcd:!t.includes("waveshare_epaper")&&!t.includes("epaper_spi"),lvgl:t.includes("lvgl:")||!t.includes("waveshare_epaper")&&!t.includes("epaper_spi"),epaper:t.includes("waveshare_epaper")||t.includes("epaper_spi"),touch:t.includes("touchscreen:"),inverted_colors:u}}}function Yi(t){const e=gt.getStorage();if(!e){_.warn("No localStorage available for offline profiles.");return}try{const n=JSON.parse(e.getItem("esphome-offline-profiles")||"{}");n[t.id]=t,e.setItem("esphome-offline-profiles",JSON.stringify(n)),_.log("[HardwarePersistence] Saved offline profile to localStorage:",t.id)}catch(n){_.error("Failed to save profile to localStorage:",n)}}function ji(){const t=gt.getStorage();if(!t)return{};try{return JSON.parse(t.getItem("esphome-offline-profiles")||"{}")}catch(e){return _.warn("Could not load offline profiles from storage:",e),{}}}const H={reterminal_e1001:{name:"Seeedstudio reTerminal E1001 (Monochrome)",displayType:"binary",chip:"esp32-s3",board:"esp32-s3-devkitc-1",displayModel:"7.50inv2p",displayPlatform:"waveshare_epaper",resolution:{width:800,height:480},shape:"rect",psram_mode:"octal",pins:{display:{cs:"GPIO10",dc:"GPIO11",reset:{number:"GPIO12",inverted:!1},busy:{number:"GPIO13",inverted:!0}},i2c:{sda:"GPIO19",scl:"GPIO20"},spi:{clk:"GPIO7",mosi:"GPIO9"},batteryEnable:"GPIO21",batteryAdc:"GPIO1",buzzer:"GPIO45",buttons:{left:"GPIO5",right:"GPIO4",refresh:"GPIO3",home:"GPIO2"}},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.27,max:4.15}},features:{psram:!0,buzzer:!0,buttons:!0,sht4x:!0,epaper:!0,inverted_colors:!0}},reterminal_e1002:{name:"Seeedstudio reTerminal E1002 (6-Color)",displayType:"color",displayModel:"Seeed-reTerminal-E1002",displayPlatform:"epaper_spi",resolution:{width:800,height:480},shape:"rect",psram_mode:"octal",pins:{display:{cs:null,dc:null,reset:null,busy:null},i2c:{sda:"GPIO19",scl:"GPIO20"},spi:{clk:"GPIO7",mosi:"GPIO9"},batteryEnable:"GPIO21",batteryAdc:"GPIO1",buzzer:"GPIO45",buttons:{left:"GPIO5",right:"GPIO4",refresh:"GPIO3",home:"GPIO2"}},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.27,max:4.15}},features:{psram:!0,buzzer:!0,buttons:!0,sht4x:!0,epaper:!0}},trmnl_diy_esp32s3:{name:"Seeed Studio Trmnl DIY Kit (ESP32-S3)",displayType:"binary",displayModel:"7.50inv2p",displayPlatform:"waveshare_epaper",resolution:{width:800,height:480},shape:"rect",psram_mode:"octal",pins:{display:{cs:"GPIO44",dc:"GPIO10",reset:"GPIO38",busy:{number:"GPIO4",inverted:!0}},i2c:{sda:"GPIO17",scl:"GPIO18"},spi:{clk:"GPIO7",mosi:"GPIO9"},batteryEnable:"GPIO6",batteryAdc:"GPIO1",buzzer:null,buttons:{left:"GPIO2",refresh:"GPIO5"}},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.27,max:4.15},curve:[{from:4.15,to:100},{from:3.96,to:90},{from:3.91,to:80},{from:3.85,to:70},{from:3.8,to:60},{from:3.75,to:50},{from:3.68,to:40},{from:3.58,to:30},{from:3.49,to:20},{from:3.41,to:10},{from:3.3,to:5},{from:3.27,to:0}]},features:{psram:!0,buzzer:!1,buttons:!0,sht4x:!1,epaper:!0,inverted_colors:!0}},trmnl:{name:"TRMNL (ESP32-C3)",displayType:"binary",displayModel:"7.50inv2",displayPlatform:"waveshare_epaper",resolution:{width:800,height:480},shape:"rect",pins:{display:{cs:"GPIO6",dc:"GPIO5",reset:{number:"GPIO10",inverted:!1},busy:{number:"GPIO4",inverted:!0}},i2c:{sda:"GPIO1",scl:"GPIO2"},spi:{clk:"GPIO7",mosi:"GPIO8"},batteryEnable:null,batteryAdc:"GPIO3",buzzer:null,buttons:null},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.3,max:4.15}},features:{psram:!1,buzzer:!1,buttons:!1,sht4x:!1,epaper:!0,inverted_colors:!0},chip:"esp32-c3",board:"esp32-c3-devkitm-1"},seeed_xiao_epaper_75:{name:'Seeed Xiao ESP32C3 - 7.5" E-Paper',displayType:"binary",chip:"esp32-c3",board:"seeed_xiao_esp32c3",displayModel:"7.50inv2p",displayPlatform:"waveshare_epaper",resolution:{width:800,height:480},shape:"rect",pins:{display:{cs:"GPIO3",dc:"GPIO5",reset:"GPIO2",busy:{number:"GPIO4",inverted:!0}},spi:{clk:"GPIO8",mosi:"GPIO10"}},features:{psram:!1,buzzer:!1,buttons:!1,epaper:!0,inverted_colors:!0}},esp32_s3_photopainter:{id:"esp32_s3_photopainter",name:"Waveshare PhotoPainter (6-Color)",displayType:"color",displayModel:"7.30in-f",displayPlatform:"waveshare_epaper",resolution:{width:800,height:480},shape:"rect",psram_mode:"octal",pins:{display:{cs:"GPIO9",dc:"GPIO8",reset:"GPIO12",busy:{number:"GPIO13",inverted:!0}},i2c:{sda:"GPIO47",scl:"GPIO48"},spi:{clk:"GPIO10",mosi:"GPIO11"},batteryEnable:null,batteryAdc:null,buzzer:null,buttons:{left:"GPIO0",right:"GPIO4",refresh:null}},battery:{attenuation:"0db",multiplier:1,calibration:{min:3.3,max:4.2}},features:{psram:!0,buzzer:!1,buttons:!0,sht4x:!1,axp2101:!0,manual_pmic:!0,shtc3:!0,epaper:!0},i2c_config:{scan:!1,frequency:"10kHz"}},waveshare_esp32_s3_touch_lcd_7:{name:'Waveshare Touch LCD 7 7.0" 800x480',displayType:"color",isPackageBased:!0,hardwarePackage:"hardware/waveshare-esp32-s3-touch-lcd-7.yaml",resolution:{width:800,height:480},features:{psram:!0,buzzer:!1,buttons:!1,lcd:!0,lvgl:!0,touch:!0},touch:{platform:"gt911",transformed:!0,transform:{swap_xy:!0}}},waveshare_esp32_s3_touch_lcd_4_3:{name:'Waveshare Touch LCD 4.3 4.3" 800x480',displayType:"color",isPackageBased:!0,hardwarePackage:"hardware/waveshare-esp32-s3-touch-lcd-4.3.yaml",resolution:{width:800,height:480},features:{psram:!0,buzzer:!1,buttons:!1,lcd:!0,touch:!0},touch:{platform:"gt911",transformed:!0,transform:{swap_xy:!0}}},m5stack_coreink:{name:"M5Stack M5Core Ink (200x200)",displayType:"binary",displayModel:"1.54inv2",displayPlatform:"waveshare_epaper",resolution:{width:200,height:200},shape:"rect",features:{psram:!1,buzzer:!0,buttons:!0,lcd:!1,epaper:!0,inverted_colors:!0},chip:"esp32",board:"m5stack-coreink",pins:{display:{cs:"GPIO9",dc:"GPIO15",reset:"GPIO0",busy:null},i2c:{sda:"GPIO21",scl:"GPIO22"},spi:{clk:"GPIO18",mosi:"GPIO23"},batteryEnable:{number:"GPIO12",ignore_strapping_warning:!0},batteryAdc:"GPIO35",buzzer:"GPIO2",buttons:{left:{number:"GPIO39",mode:"INPUT"},right:{number:"GPIO37",mode:"INPUT"},refresh:{number:"GPIO38",mode:"INPUT"}}},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.27,max:4.15}},i2c_config:{scan:!0}},m5stack_paper:{name:"M5Paper (540x960)",displayType:"grayscale",displayModel:"M5Paper",displayPlatform:"it8951e",resolution:{width:960,height:540},shape:"rect",chip:"esp32",board:"m5stack-paper",features:{psram:!0,buzzer:!1,buttons:!0,lcd:!1,epaper:!0,touch:!0,inverted_colors:!0,sht3xd:!0},pins:{display:{cs:"GPIO15",dc:null,reset:"GPIO23",busy:"GPIO27"},i2c:{sda:"GPIO21",scl:"GPIO22"},spi:{clk:"GPIO14",mosi:"GPIO12",miso:"GPIO13"},batteryEnable:null,batteryAdc:"GPIO35",buzzer:null,buttons:{left:{number:"GPIO39",mode:"INPUT"},right:{number:"GPIO37",mode:"INPUT"},refresh:{number:"GPIO38",mode:"INPUT"}}},m5paper:{battery_power_pin:"GPIO5",main_power_pin:"GPIO2"},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.27,max:4.15}},rotation_offset:180,touch:{platform:"gt911",i2c_id:"bus_a",address:93,interrupt_pin:"GPIO36",update_interval:"never",transform:{mirror_x:!1,mirror_y:!1,swap_xy:!0},calibration:{x_min:0,x_max:960,y_min:0,y_max:540}},external_components:["  - source: github://Passific/m5paper_esphome"]},lilygo_t5_47:{id:"lilygo_t5_47",name:'Lilygo T5 4.7" E-Paper',isUntestedProfile:!0,displayType:"binary",chip:"esp32",board:"esp-wrover-kit",displayPlatform:"t547",resolution:{width:960,height:540},shape:"rect",psram_speed:"80MHz",pins:{batteryEnable:null,batteryAdc:"GPIO36",buttons:{left:{number:"GPIO39",inverted:!0,mode:"INPUT"},right:{number:"GPIO34",inverted:!0,mode:"INPUT"},refresh:{number:"GPIO35",inverted:!0,mode:"INPUT"}}},battery:{attenuation:"12db",multiplier:2},features:{psram:!0,buzzer:!1,buttons:!0,epaper:!0,inverted_colors:!0},frameworkHint:"Arduino 3.x (required by the t547 component)",system_section_overrides:{esphome:["  platformio_options:","    lib_deps:","      - https://github.com/Xinyuan-LilyGO/LilyGo-EPD47.git"],esp32:["  framework:","    type: arduino","    version: 3.3.2","  flash_size: 16MB"]},external_components:["  - source:","      type: git","      url: https://github.com/cjb0001/esphome-components","      ref: idf5-arduino3",'    components: ["t547"]']}};function yn(t=H){return Object.entries(t).filter(([,e])=>!e.isUntestedProfile).map(([e])=>e)}function Ui(t,e){return t?{...t,...e,features:{...t.features||{},...e.features||{}}}:e}function qi(t,e){e.forEach(n=>{t[n.id]=Ui(t[n.id],n)})}function Vi(t,e){Object.entries(e).forEach(([n,i])=>{t[n]=i})}let mt=yn(H);async function Te(){try{const t=await $i();_.log(`[Devices] Loaded ${t.length} hardware profiles from backend/bundle.`),qi(H,t);const e=ji(),n=Object.keys(e);n.length>0&&(_.log(`[Devices] Restoring ${n.length} offline profiles from localStorage.`),Vi(H,e)),mt=yn(H),L(C.DEVICE_PROFILES_UPDATED)}catch(t){_.error("Failed to load external hardware profiles:",t)}}function _e(){return"w_"+Date.now().toString(36)+Math.random().toString(36).substring(2,7)}const ge=globalThis;typeof ge.crypto<"u"&&!ge.crypto.randomUUID?Object.defineProperty(ge.crypto,"randomUUID",{value:function(){return"10000000-1000-4000-8000-100000000000".replace(/[018]/g,e=>{const n=Number(e),i=ge.crypto?.getRandomValues(new Uint8Array(1))[0]??0;return(n^(i&15)>>n/4).toString(16)})}}):typeof ge.crypto>"u"&&(ge.crypto={randomUUID:()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,t=>{const e=Math.random()*16|0;return(t==="x"?e:e&3|8).toString(16)}),getRandomValues:t=>{for(let e=0;e<t.length;e+=1)t[e]=Math.floor(Math.random()*256);return t}});function Xi(t,e){let n;return function(...o){const r=()=>{clearTimeout(n),t(...o)};clearTimeout(n),n=setTimeout(r,e)}}function nt(t){if(t!==void 0)return JSON.parse(JSON.stringify(t))}const Js=(t,e)=>{if(!t||!e)return;const n=e.replace(/\[(\w+)\]/g,".$1").replace(/^\./,"").split(".");let i=t;for(const o of n){if(i==null)return;i=i[o]}return i};function it(){return{id:"page_0",name:"Overview",layout:null,widgets:[]}}function Ki(t){return Array.isArray(t)&&t.length>0?t:[it()]}function At(t,e){return e<=0?0:Math.max(0,Math.min(t,e-1))}function Ji(t){const e=t.length;let n=0;return t.forEach(i=>{const o=i.name.match(/^Page (\d+)$/);if(o){const r=parseInt(o[1],10);r>n&&(n=r)}}),{id:`page_${Date.now()}_${e}`,name:`Page ${n+1}`,widgets:[]}}function Zi(t,e){const n=nt(t);n.id=`page_${Date.now()}_${e}`,n.name=`${t.name} (Copy)`;const i=new Map;return n.widgets.forEach(o=>{const r=o.id,s=_e();o.id=s,i.set(r,s)}),n.widgets.forEach(o=>{o.parentId&&i.has(o.parentId)&&(o.parentId=i.get(o.parentId)||null)}),n}function Qi(t,e,n,i=null,o=null,r){if(n<0||n>=t.pages.length)return!1;const s=t.pages[n],a=new Set,l=[];let c=e;const d=t.widgetsById.get(e);if(d&&d.parentId){let g=d;for(;g.parentId;){const m=t.widgetsById.get(g.parentId);if(!m)break;g=m}c=g.id}const u=g=>{if(a.has(g))return;let m=null,y=null;for(const f of t.pages)if(m=f.widgets.find(b=>b.id===g)||null,m){y=f;break}if(!m||!y||y===s)return;a.add(g),l.push({widget:m,sourcePage:y}),y.widgets.filter(f=>f.parentId===g).forEach(f=>u(f.id))};if(u(c),l.length===0)return!1;l.forEach((g,m)=>{const{widget:y,sourcePage:v}=g,f=v.widgets.indexOf(y);if(f!==-1&&v.widgets.splice(f,1),m===0&&y.parentId&&!a.has(y.parentId)&&(y.parentId=null),m===0){let b=0,x=0;if(i!==null&&o!==null&&(b=i-y.x,x=o-y.y,y.x=i,y.y=o),b!==0||x!==0)for(let E=1;E<l.length;E++){const S=l[E].widget;S.x+=b,S.y+=x}}s.widgets.push(y)});const h=r(t.protocolHardware?.orientation);for(const g of a){const m=t.widgetsById.get(g);if(!m||m.parentId&&a.has(m.parentId))continue;const y=m.x,v=m.y;m.x=Math.max(0,Math.min(h.width-(m.width||50),m.x)),m.y=Math.max(0,Math.min(h.height-(m.height||50),m.y));const f=m.x-y,b=m.y-v;if(f!==0||b!==0)for(const x of a){const E=t.widgetsById.get(x);E&&E.parentId===m.id&&(E.x+=f,E.y+=b)}}return!0}class eo{constructor(){this.state={pages:[],currentPageIndex:0,deviceName:"Layout 1",deviceModel:"reterminal_e1001",currentLayoutId:"reterminal_e1001",manualYamlOverride:"",customHardware:{},protocolHardware:{width:400,height:300,colorMode:"bw"},widgetsById:new Map},this.reset()}reset(){this.state.pages=[it()],this.state.currentPageIndex=0,this.state.manualYamlOverride="",this.rebuildWidgetsIndex()}get pages(){return this.state.pages}get currentPageIndex(){return this.state.currentPageIndex}get deviceName(){return this.state.deviceName}get deviceModel(){return this.state.deviceModel}get currentLayoutId(){return this.state.currentLayoutId}get manualYamlOverride(){return this.state.manualYamlOverride||""}get protocolHardware(){return this.state.protocolHardware}get customHardware(){return this.state.customHardware}getCurrentPage(){return this.state.pages.length===0&&(this.state.pages=[it()],this.state.currentPageIndex=0),this.state.pages[this.state.currentPageIndex]||this.state.pages[0]}getWidgetById(e){return this.state.widgetsById.get(e)}rebuildWidgetsIndex(){this.state.widgetsById.clear();for(const e of this.state.pages)for(const n of e.widgets)this.state.widgetsById.set(n.id,n)}setPages(e){this.state.pages=Ki(e),this.state.currentPageIndex=At(this.state.currentPageIndex,this.state.pages.length),this.rebuildWidgetsIndex(),L(C.STATE_CHANGED)}setCurrentPageIndex(e,n={}){e>=0&&e<this.state.pages.length&&(this.state.currentPageIndex=e,L(C.PAGE_CHANGED,{index:e,...n}))}reorderPage(e,n){if(e<0||e>=this.state.pages.length||n<0||n>=this.state.pages.length)return;const[i]=this.state.pages.splice(e,1);this.state.pages.splice(n,0,i),this.state.currentPageIndex===e?this.state.currentPageIndex=n:e<this.state.currentPageIndex&&n>=this.state.currentPageIndex?this.state.currentPageIndex--:e>this.state.currentPageIndex&&n<=this.state.currentPageIndex&&this.state.currentPageIndex++,L(C.STATE_CHANGED),L(C.PAGE_CHANGED,{index:this.state.currentPageIndex,forceFocus:!0})}addPage(e=null){const n=Ji(this.state.pages),i=e!==null?e:this.state.pages.length;return this.state.pages.splice(i,0,n),e!==null&&e<=this.state.currentPageIndex?this.state.currentPageIndex++:e===null&&(this.state.currentPageIndex=this.state.pages.length-1),this.rebuildWidgetsIndex(),L(C.STATE_CHANGED),L(C.PAGE_CHANGED,{index:this.state.currentPageIndex,forceFocus:!0}),n}deletePage(e){e<0||e>=this.state.pages.length||this.state.pages.length!==1&&(this.state.pages.splice(e,1),this.state.currentPageIndex=At(this.state.currentPageIndex,this.state.pages.length),this.rebuildWidgetsIndex(),L(C.STATE_CHANGED),L(C.PAGE_CHANGED,{index:this.state.currentPageIndex,forceFocus:!0}))}duplicatePage(e){if(e<0||e>=this.state.pages.length)return null;const n=this.state.pages[e],i=Zi(n,this.state.pages.length),o=e+1;return this.state.pages.splice(o,0,i),this.state.currentPageIndex=o,this.rebuildWidgetsIndex(),L(C.STATE_CHANGED),L(C.PAGE_CHANGED,{index:this.state.currentPageIndex,forceFocus:!0}),i}renamePage(e,n){e<0||e>=this.state.pages.length||!n||n.trim()===""||(this.state.pages[e].name=n.trim(),L(C.STATE_CHANGED))}addWidget(e,n=null){const i=n!==null?n:this.state.currentPageIndex;(this.state.pages[i]||this.getCurrentPage()).widgets.push(e),this.state.widgetsById.set(e.id,e),L(C.STATE_CHANGED)}updateWidget(e,n){const i=this.getWidgetById(e);i&&(Object.assign(i,n),L(C.STATE_CHANGED))}deleteWidgets(e){const n=this.getCurrentPage();let i=!1;for(const o of e){const r=n.widgets.findIndex(s=>s.id===o);r!==-1&&(n.widgets.splice(r,1),this.state.widgetsById.delete(o),i=!0)}i&&L(C.STATE_CHANGED)}moveWidgetToPage(e,n,i=null,o=null){const r=a=>this.getCanvasDimensions(a);return Qi(this.state,e,n,i,o,r)?(this.rebuildWidgetsIndex(),L(C.STATE_CHANGED),!0):!1}reorderWidget(e,n,i){const o=this.state.pages[e];if(!o)return;const r=o.widgets;if(n<0||n>=r.length||i<0||i>=r.length)return;const[s]=r.splice(n,1);r.splice(i,0,s),L(C.STATE_CHANGED)}clearCurrentPage(e=!1){const n=this.getCurrentPage();if(!n)return{deleted:0,preserved:0};const i=[],o=[];return n.widgets.forEach(r=>{e&&r.locked?o.push(r):i.push(r)}),n.widgets=o,i.forEach(r=>this.state.widgetsById.delete(r.id)),i.length>0&&L(C.STATE_CHANGED),{deleted:i.length,preserved:o.length}}setDeviceSettings(e,n){e&&(this.state.deviceName=e),n&&(this.state.deviceModel=n),L(C.SETTINGS_CHANGED)}setManualYamlOverride(e,n={}){const i=typeof e=="string"?e:"";return this.state.manualYamlOverride===i?!1:(this.state.manualYamlOverride=i,n.emitStateChange!==!1&&L(C.STATE_CHANGED),!0)}clearManualYamlOverride(e={}){return this.setManualYamlOverride("",e)}getCanvasDimensions(e=Qe.LANDSCAPE){const n=this.state.deviceModel||"reterminal_e1001",i=H,o=i&&i[n]?i[n]:null;let r=tn,s=nn;if(o)o.resolution&&(r=o.resolution.width,s=o.resolution.height);else if(n==="custom"&&this.state.customHardware){const a=this.state.customHardware;a.resWidth&&a.resHeight&&(r=a.resWidth,s=a.resHeight)}return e===Qe.PORTRAIT?{width:Math.min(r,s),height:Math.max(r,s)}:{width:Math.max(r,s),height:Math.min(r,s)}}getPagesPayload(){return{name:this.state.deviceName,pages:this.state.pages,deviceName:this.state.deviceName,deviceModel:this.state.deviceModel,currentLayoutId:this.state.currentLayoutId,manualYamlOverride:this.state.manualYamlOverride||"",manual_yaml_override:this.state.manualYamlOverride||"",customHardware:this.state.customHardware}}getCanvasShape(){const n=H[this.state.deviceModel];return n&&n.shape?n.shape:this.state.customHardware&&this.state.customHardware.shape?this.state.customHardware.shape:"rect"}}class to{state;historyStack;historyIndex;constructor(){this.state={selectedWidgetIds:[],clipboardWidgets:[],zoomLevel:1,panX:0,panY:0},this.historyStack=[],this.historyIndex=-1}get selectedWidgetIds(){return this.state.selectedWidgetIds}get clipboardWidgets(){return this.state.clipboardWidgets}get zoomLevel(){return this.state.zoomLevel}setZoomLevel(e){this.state.zoomLevel=Math.max(.05,Math.min(5,e)),L(C.ZOOM_CHANGED,{zoomLevel:this.state.zoomLevel})}setSelectedWidgetIds(e){this.state.selectedWidgetIds=e||[],L(C.SELECTION_CHANGED,{widgetIds:this.state.selectedWidgetIds})}selectWidget(e,n=!1){if(n){const i=e?this.state.selectedWidgetIds.indexOf(e):-1;i===-1?e&&this.state.selectedWidgetIds.push(e):this.state.selectedWidgetIds.splice(i,1)}else this.state.selectedWidgetIds=e?[e]:[];L(C.SELECTION_CHANGED,{widgetIds:this.state.selectedWidgetIds})}copyWidgets(e){this.state.clipboardWidgets=e.map(n=>nt(n)),_.log("[EditorStore] Widgets copied to clipboard:",this.state.clipboardWidgets.length)}recordHistory(e){const n=nt(e);if(this.historyIndex>=0){const i=this.historyStack[this.historyIndex];if(JSON.stringify(i)===JSON.stringify(n))return}this.historyIndex<this.historyStack.length-1&&(this.historyStack=this.historyStack.slice(0,this.historyIndex+1)),this.historyStack.push(n),this.historyIndex++,this.historyStack.length>Qt&&(this.historyStack.shift(),this.historyIndex--),L(C.HISTORY_CHANGED,{canUndo:this.canUndo(),canRedo:this.canRedo()})}undo(){return this.canUndo()?(this.historyIndex--,this.historyStack[this.historyIndex]):null}redo(){return this.canRedo()?(this.historyIndex++,this.historyStack[this.historyIndex]):null}canUndo(){return this.historyIndex>0}canRedo(){return this.historyIndex<this.historyStack.length-1}}class no{constructor(){this.state={...Zt}}get snapEnabled(){return this.state.snapEnabled}get showGrid(){return this.state.showGrid}get showDebugGrid(){return!!this.state.showDebugGrid}get showRulers(){return!!this.state.showRulers}get gridOpacity(){return this.state.gridOpacity}get editor_light_mode(){return this.state.editor_light_mode}update(e){this.state={...this.state,...e},L(C.SETTINGS_CHANGED,this.state),_.log("[PreferencesStore] Settings updated")}setSnapEnabled(e){this.state.snapEnabled=e,L(C.SETTINGS_CHANGED,{snapEnabled:e})}setShowGrid(e){this.state.showGrid=e,L(C.SETTINGS_CHANGED,{showGrid:e})}setShowDebugGrid(e){this.state.showDebugGrid=e,L(C.SETTINGS_CHANGED,{showDebugGrid:e})}setShowRulers(e){this.state.showRulers=e,L(C.SETTINGS_CHANGED,{showRulers:e})}}function Ot(){try{return globalThis.localStorage??null}catch{return null}}class io{constructor(){this.keys={ai_api_key_gemini:"",ai_api_key_openai:"",ai_api_key_openrouter:""},this.loadFromLocalStorage()}get(e){return this.keys[e]||""}set(e,n){if(e in this.keys){const i=this.keys;i[e]=n,this.saveToLocalStorage()}}saveToLocalStorage(){try{const e=Ot();if(!e)return;const n={};Object.keys(this.keys).forEach(i=>{i.startsWith("ai_api_key_")&&(n[i]=this.keys[i])}),e.setItem("esphome-designer-ai-keys",JSON.stringify(n))}catch(e){_.warn("[SecretsStore] Failed to save AI keys to localStorage:",e)}}loadFromLocalStorage(){try{const e=Ot();if(!e)return;const n=e.getItem("esphome-designer-ai-keys");if(n){const i=JSON.parse(n);i&&typeof i=="object"&&(this.keys={...this.keys,...i},_.log("[SecretsStore] AI keys loaded from local storage"))}}catch(e){_.warn("[SecretsStore] Failed to load AI keys from localStorage:",e)}}}class oo{constructor(e){this.app=e}selectWidget(e,n=!1){if(!e){this.app.editor.selectWidget(null,n);return}const i=this.app.getWidgetById(e);if(i)if(i.type==="group"){const a=(this.app.getCurrentPage().widgets||[]).filter(c=>c.parentId===e).map(c=>c.id),l=[e,...a];if(n)if(l.some(d=>this.app.editor.selectedWidgetIds.includes(d))){const d=new Set(l),u=this.app.editor.selectedWidgetIds.filter(h=>!d.has(h));this.app.editor.setSelectedWidgetIds(u)}else this.app.editor.setSelectedWidgetIds([...new Set([...this.app.editor.selectedWidgetIds,...l])]);else this.app.editor.setSelectedWidgetIds(l)}else this.app.editor.selectWidget(e,n)}selectWidgets(e){this.app.editor.setSelectedWidgetIds(e)}selectAllWidgets(){const e=this.app.getCurrentPage();if(!e||!e.widgets)return;const i=e.widgets.map(o=>o.id);this.selectWidgets(i)}deselectAll(){this.app.editor.setSelectedWidgetIds([])}toggleSelection(e){this.selectWidget(e,!0)}isWidgetSelected(e){return this.app.editor.selectedWidgetIds.includes(e)}groupSelection(){const e=this.app.editor.selectedWidgetIds,n=this.app.getSelectedWidgets(),i=n.some(d=>d.type==="group"||d.parentId);if(e.length<2||i)return;let o=1/0,r=1/0,s=-1/0,a=-1/0;n.forEach(d=>{o=Math.min(o,d.x),r=Math.min(r,d.y),s=Math.max(s,d.x+(d.width||0)),a=Math.max(a,d.y+(d.height||0))});const l="group_"+_e(),c={id:l,type:"group",title:"Group",x:o,y:r,width:s-o,height:a-r,props:{},expanded:!0};this.app.project.addWidget(c),n.forEach(d=>{this.app.project.updateWidget(d.id,{parentId:l})}),this.selectWidget(l),this.app.syncWidgetOrderWithHierarchy(),this.app.recordHistory(),L(C.STATE_CHANGED)}ungroupSelection(e=null){const n=this.app;let i=[];if(e)i=Array.isArray(e)?e:[e];else{const l=n.getSelectedWidgets(),c=new Set;l.forEach(d=>{d.type==="group"?c.add(d.id):d.parentId&&c.add(d.parentId)}),i=[...c]}const o=new Set;i.forEach(l=>{const c=n.getWidgetById(l);c&&(c.type==="group"?o.add(c.id):c.parentId&&o.add(c.parentId))});const r=[...o];if(r.length===0)return;const s=[];r.forEach(l=>{const c=n.getWidgetById(l);if(!c||c.type!=="group")return;(n.getCurrentPage().widgets||[]).filter(g=>g.parentId===l).forEach(g=>{this.app.project.updateWidget(g.id,{parentId:null}),s.push(g.id)})}),this.app.project.deleteWidgets(r);const a=n.getCurrentPage();if(a&&a.widgets){const l=a.widgets;a.widgets=l.filter(c=>!r.includes(c.id))}s.length>0&&this.selectWidgets(s),n.syncWidgetOrderWithHierarchy(),n.recordHistory(),L(C.STATE_CHANGED)}alignSelectedWidgets(e){const n=this.app.getSelectedWidgets();if(n.length<2)return;let i;switch(e){case"left":i=Math.min(...n.map(o=>o.x)),n.forEach(o=>this.app.project.updateWidget(o.id,{x:i}));break;case"center":{const o=Math.min(...n.map(s=>s.x)),r=Math.max(...n.map(s=>s.x+(s.width||0)));i=o+(r-o)/2,n.forEach(s=>this.app.project.updateWidget(s.id,{x:i-(s.width||0)/2}));break}case"right":i=Math.max(...n.map(o=>o.x+(o.width||0))),n.forEach(o=>this.app.project.updateWidget(o.id,{x:i-(o.width||0)}));break;case"top":i=Math.min(...n.map(o=>o.y)),n.forEach(o=>this.app.project.updateWidget(o.id,{y:i}));break;case"middle":{const o=Math.min(...n.map(s=>s.y)),r=Math.max(...n.map(s=>s.y+(s.height||0)));i=o+(r-o)/2,n.forEach(s=>this.app.project.updateWidget(s.id,{y:i-(s.height||0)/2}));break}case"bottom":i=Math.max(...n.map(o=>o.y+(o.height||0))),n.forEach(o=>this.app.project.updateWidget(o.id,{y:i-(o.height||0)}));break}this.app.recordHistory(),L(C.STATE_CHANGED)}distributeSelectedWidgets(e){const n=this.app.getSelectedWidgets();if(!(n.length<3)){if(e==="horizontal"){const i=[...n].sort((d,u)=>d.x-u.x),o=i[0],s=i[i.length-1].x-(o.x+(o.width||0)),a=i.slice(1,-1).reduce((d,u)=>d+(u.width||0),0),l=(s-a)/(i.length-1);let c=o.x+(o.width||0)+l;for(let d=1;d<i.length-1;d++)this.app.project.updateWidget(i[d].id,{x:c}),c+=(i[d].width||0)+l}else{const i=[...n].sort((d,u)=>d.y-u.y),o=i[0],s=i[i.length-1].y-(o.y+(o.height||0)),a=i.slice(1,-1).reduce((d,u)=>d+(u.height||0),0),l=(s-a)/(i.length-1);let c=o.y+(o.height||0)+l;for(let d=1;d<i.length-1;d++)this.app.project.updateWidget(i[d].id,{y:c}),c+=(i[d].height||0)+l}this.app.recordHistory(),L(C.STATE_CHANGED)}}}class ro{constructor(e){this.app=e}recordHistory(){this.app._isRestoringHistory||this.app.editor.recordHistory({pages:this.app.project.pages,deviceName:this.app.project.deviceName})}undo(){const e=this.app.editor.undo();e&&(this.app.setInternalFlag("_isRestoringHistory",!0),this.restoreSnapshot(e),setTimeout(()=>{this.app.setInternalFlag("_isRestoringHistory",!1)},0))}redo(){const e=this.app.editor.redo();e&&(this.app.setInternalFlag("_isRestoringHistory",!0),this.restoreSnapshot(e),setTimeout(()=>{this.app.setInternalFlag("_isRestoringHistory",!1)},0))}restoreSnapshot(e){this.app.project.state.pages=JSON.parse(JSON.stringify(e.pages)),this.app.project.state.deviceName=e.deviceName,this.app.project.rebuildWidgetsIndex(),L(C.STATE_CHANGED)}canUndo(){return this.app.editor.canUndo()}canRedo(){return this.app.editor.canRedo()}}let ot={};try{ot=Object.assign({"../../features/battery_icon/plugin.js":()=>P(()=>import("./plugin-CzvCy0u7.js"),__vite__mapDeps([0,1,2]),import.meta.url),"../../features/calendar/plugin.js":()=>P(()=>import("./plugin-vP385GJU.js"),__vite__mapDeps([3,1,2]),import.meta.url),"../../features/datetime/plugin.js":()=>P(()=>import("./plugin-CeeuqdnP.js"),__vite__mapDeps([4,1,2]),import.meta.url),"../../features/debug_grid/plugin.js":()=>P(()=>import("./plugin-Bz96grI8.js"),[],import.meta.url),"../../features/energy_widget/plugin.js":()=>P(()=>import("./plugin-D4aymeHD.js"),__vite__mapDeps([5,1,2]),import.meta.url),"../../features/graph/plugin.js":()=>P(()=>import("./plugin-BPtizKyl.js"),__vite__mapDeps([6,2,1]),import.meta.url),"../../features/icon/plugin.js":()=>P(()=>import("./plugin-CcdEI1D6.js"),__vite__mapDeps([7,8,1,2]),import.meta.url),"../../features/image/plugin.js":()=>P(()=>import("./plugin-DIh7XOjR.js"),__vite__mapDeps([9,1,2]),import.meta.url),"../../features/line/plugin.js":()=>P(()=>import("./plugin-DPpv4k9S.js"),[],import.meta.url),"../../features/lvgl_arc/plugin.js":()=>P(()=>import("./plugin-RuuFIz6k.js"),__vite__mapDeps([10,1,2]),import.meta.url),"../../features/lvgl_bar/plugin.js":()=>P(()=>import("./plugin-CN6lT8h5.js"),[],import.meta.url),"../../features/lvgl_button/plugin.js":()=>P(()=>import("./plugin-D_oknyFj.js"),__vite__mapDeps([11,2,1]),import.meta.url),"../../features/lvgl_buttonmatrix/plugin.js":()=>P(()=>import("./plugin-BYUEJW46.js"),[],import.meta.url),"../../features/lvgl_chart/plugin.js":()=>P(()=>import("./plugin-uULqxqmr.js"),[],import.meta.url),"../../features/lvgl_checkbox/plugin.js":()=>P(()=>import("./plugin-B__Ipdeq.js"),__vite__mapDeps([12,2,1]),import.meta.url),"../../features/lvgl_dropdown/plugin.js":()=>P(()=>import("./plugin-DKvu6nsr.js"),[],import.meta.url),"../../features/lvgl_img/plugin.js":()=>P(()=>import("./plugin-CJupQF3Y.js"),[],import.meta.url),"../../features/lvgl_keyboard/plugin.js":()=>P(()=>import("./plugin-5CX7J5Ir.js"),[],import.meta.url),"../../features/lvgl_label/plugin.js":()=>P(()=>import("./plugin-FKWJGLzk.js"),__vite__mapDeps([13,1,2]),import.meta.url),"../../features/lvgl_led/plugin.js":()=>P(()=>import("./plugin-CvW9GRcJ.js"),[],import.meta.url),"../../features/lvgl_line/plugin.js":()=>P(()=>import("./plugin-DavNvZJ0.js"),[],import.meta.url),"../../features/lvgl_meter/plugin.js":()=>P(()=>import("./plugin-03wdAHv5.js"),[],import.meta.url),"../../features/lvgl_obj/plugin.js":()=>P(()=>import("./plugin-Cvfrg4uG.js"),[],import.meta.url),"../../features/lvgl_qrcode/plugin.js":()=>P(()=>import("./plugin-BZNoAt0h.js"),[],import.meta.url),"../../features/lvgl_roller/plugin.js":()=>P(()=>import("./plugin-H8_Cedxq.js"),[],import.meta.url),"../../features/lvgl_slider/plugin.js":()=>P(()=>import("./plugin-DpfH8oTa.js"),[],import.meta.url),"../../features/lvgl_spinbox/plugin.js":()=>P(()=>import("./plugin-CCSLU7VJ.js"),[],import.meta.url),"../../features/lvgl_spinner/plugin.js":()=>P(()=>import("./plugin-yr1brk0v.js"),[],import.meta.url),"../../features/lvgl_switch/plugin.js":()=>P(()=>import("./plugin-DPhsGa_h.js"),__vite__mapDeps([14,2,1]),import.meta.url),"../../features/lvgl_tabview/plugin.js":()=>P(()=>import("./plugin-Z-WZZzFC.js"),[],import.meta.url),"../../features/lvgl_textarea/plugin.js":()=>P(()=>import("./plugin-Dft6HFQs.js"),[],import.meta.url),"../../features/lvgl_tileview/plugin.js":()=>P(()=>import("./plugin-CIe8d1NL.js"),[],import.meta.url),"../../features/moon_phase/plugin.js":()=>P(()=>import("./plugin-Diq7SWRl.js"),__vite__mapDeps([15,2,1]),import.meta.url),"../../features/odp_arc/plugin.js":()=>P(()=>import("./plugin-fLOMRvii.js"),[],import.meta.url),"../../features/odp_ellipse/plugin.js":()=>P(()=>import("./plugin-FRwyy2yN.js"),[],import.meta.url),"../../features/odp_icon_sequence/plugin.js":()=>P(()=>import("./plugin-CciJdC0y.js"),[],import.meta.url),"../../features/odp_multiline/plugin.js":()=>P(()=>import("./plugin-C4VhGPFM.js"),[],import.meta.url),"../../features/odp_plot/plugin.js":()=>P(()=>import("./plugin-CI_sUke1.js"),[],import.meta.url),"../../features/odp_polygon/plugin.js":()=>P(()=>import("./plugin-C_hkq-qm.js"),[],import.meta.url),"../../features/odp_rectangle_pattern/plugin.js":()=>P(()=>import("./plugin-BMFaRNdP.js"),[],import.meta.url),"../../features/ondevice_humidity/plugin.js":()=>P(()=>import("./plugin-lbwhnibj.js"),__vite__mapDeps([16,1,2]),import.meta.url),"../../features/ondevice_temperature/plugin.js":()=>P(()=>import("./plugin-BQXmz0us.js"),__vite__mapDeps([17,1,2]),import.meta.url),"../../features/online_image/plugin.js":()=>P(()=>import("./plugin-HbCFbp9N.js"),__vite__mapDeps([18,1,2]),import.meta.url),"../../features/progress_bar/plugin.js":()=>P(()=>import("./plugin-CLr_rcfJ.js"),__vite__mapDeps([19,20,1,2]),import.meta.url),"../../features/qr_code/plugin.js":()=>P(()=>import("./plugin-Y-ZDwYMf.js"),__vite__mapDeps([21,1,2]),import.meta.url),"../../features/quote_rss/plugin.js":()=>P(()=>import("./plugin-D3-a7jVu.js"),__vite__mapDeps([22,1,2]),import.meta.url),"../../features/rounded_rect/plugin.js":()=>P(()=>import("./plugin-OhJ2rJGH.js"),__vite__mapDeps([23,24,1,2]),import.meta.url),"../../features/sensor_text/plugin.js":()=>P(()=>import("./plugin-CIx5zOh8.js"),__vite__mapDeps([25,8,20,2,1]),import.meta.url),"../../features/shape_circle/plugin.js":()=>P(()=>import("./plugin-DIkabyao.js"),__vite__mapDeps([26,24,1,2]),import.meta.url),"../../features/shape_rect/plugin.js":()=>P(()=>import("./plugin-Be0HxiGe.js"),__vite__mapDeps([27,24,1,2]),import.meta.url),"../../features/sun_times/plugin.js":()=>P(()=>import("./plugin-jNhex5tQ.js"),__vite__mapDeps([28,2,1]),import.meta.url),"../../features/template_nav_bar/plugin.js":()=>P(()=>import("./plugin-BMVtBWYG.js"),__vite__mapDeps([29,2,1]),import.meta.url),"../../features/template_sensor_bar/plugin.js":()=>P(()=>import("./plugin-8Bj6oHMX.js"),__vite__mapDeps([30,1,2]),import.meta.url),"../../features/text/plugin.js":()=>P(()=>import("./plugin-BXOvUA-4.js"),__vite__mapDeps([31,8,1,2]),import.meta.url),"../../features/touch_area/plugin.js":()=>P(()=>import("./plugin-B8-6gZ5E.js"),__vite__mapDeps([32,2,1]),import.meta.url),"../../features/weather_forecast/plugin.js":()=>P(()=>import("./plugin-CLpsqNtn.js"),__vite__mapDeps([33,1,2]),import.meta.url),"../../features/weather_icon/plugin.js":()=>P(()=>import("./plugin-D2DoSFo-.js"),__vite__mapDeps([34,2,1]),import.meta.url),"../../features/wifi_signal/plugin.js":()=>P(()=>import("./plugin-BDdiMiPo.js"),__vite__mapDeps([35,1,2]),import.meta.url)})}catch{}class so{constructor(){this.plugins=new Map,this.loading=new Map,this.aliases={label:"text",rectangle:"shape_rect",rrect:"rounded_rect",circle:"shape_circle",nav_next_page:"touch_area",nav_previous_page:"touch_area",nav_reload_page:"touch_area",puppet:"online_image",multiline:"odp_multiline",rectangle_pattern:"odp_rectangle_pattern",polygon:"odp_polygon",ellipse:"odp_ellipse",icon_sequence:"odp_icon_sequence",weather_forcast:"weather_forecast",odp_debug_grid:"debug_grid",lv_chart:"lvgl_chart"}}register(e){if(!e?.id){_.warn("[Registry] Invalid plugin registration attempt:",e);return}const n=e.id,i=this.plugins.get(n);this.plugins.set(n,{...i||{},...e}),_.log(`[Registry] Registered: ${n}`)}get(e){const n=this.aliases[e]||e;return this.plugins.get(n)}getAll(){return Array.from(this.plugins.values())}async load(e){const n=this.aliases[e]||e;if(n==="group")return null;const i=this.plugins.get(n);if(i)return i;const o=this.loading.get(n);if(o)return o;const r=(async()=>{try{const s=`../../features/${n}/plugin.js`,a=ot[s]?await ot[s]():await import(s);let l;return a.default?l=a.default:l={id:n,...a},this.register(l),this.plugins.get(n)??null}catch(s){return _.error(`[Registry] Failed to load plugin "${n}" from ESM:`,s),null}finally{this.loading.delete(n)}})();return this.loading.set(n,r),r}runHook(e,n){this.getAll().forEach(i=>{const o=e==="onCollectRequirements"?i.collectRequirements:i[e];typeof o=="function"&&o.call(i,n)})}onExportGlobals(e){this.runHook("onExportGlobals",e)}onExportEsphome(e){this.runHook("onExportEsphome",e)}onExportNumericSensors(e){this.runHook("onExportNumericSensors",e)}onExportTextSensors(e){this.runHook("onExportTextSensors",e)}onExportBinarySensors(e){this.runHook("onExportBinarySensors",e)}onExportHelpers(e){this.runHook("onExportHelpers",e)}onExportComponents(e){this.runHook("onExportComponents",e)}onCollectRequirements(e){this.runHook("onCollectRequirements",e)}}const q=new so;_.log("[Registry] Modular system ready.");class ao{constructor(e){this.app=e}normalizeWidgetIds(e){return e?Array.isArray(e)?e:[...e]:[]}setCustomHardware(e){this.app.project.state.customHardware=e,L(C.STATE_CHANGED),L(C.PAGE_CHANGED,{index:this.app.currentPageIndex,forceFocus:!0})}addWidget(e,n=null){this.checkRenderingModeForWidget(e),this.app.project.addWidget(e,n),this.app.recordHistory(),this.app.selectWidget(e.id),L(C.STATE_CHANGED)}updateWidget(e,n){const i=this.app;this.app.project.updateWidget(e,n);const o=i.getWidgetById(e);if(o&&o.type==="group"){const r=["locked","hidden"],s={},a=n||{};if(r.forEach(l=>{a[l]!==void 0&&(s[l]=a[l])}),Object.keys(s).length>0){const l=i.pages[i.currentPageIndex];l&&l.widgets&&l.widgets.filter(d=>d.parentId===e).forEach(d=>this.updateWidget(d.id,s))}}n.parentId!==void 0&&this.syncWidgetOrderWithHierarchy(),L(C.STATE_CHANGED)}updateWidgets(e,n){e.forEach(i=>this.app.project.updateWidget(i,n)),L(C.STATE_CHANGED)}updateWidgetsProps(e,n){const i=[],o=n.radius??n.border_radius??n.corner_radius;e.forEach(r=>{const s=this.app.getWidgetById(r);if(s){const a={...s.props||{},...n};if(this.app.project.updateWidget(r,{props:a}),o!==void 0&&s.parentId){const l=this.app.getWidgetById(s.parentId);if(l&&l.type==="group"&&l.title&&l.title.endsWith("Group")){const d=(this.app.getCurrentPage()?.widgets.filter(u=>u.parentId===l.id)||[]).find(u=>u.id!==s.id&&u.props?.name&&u.props.name.endsWith("Shadow"));d&&i.push({id:d.id,props:{...d.props||{},radius:o}})}}}}),i.forEach(r=>{this.app.project.updateWidget(r.id,{props:r.props})}),L(C.STATE_CHANGED)}deleteWidget(e){const n=e?[e]:this.normalizeWidgetIds(this.app.editor.selectedWidgetIds),i=[...n];n.forEach(o=>{const r=this.app.getWidgetById(o);r&&r.type==="group"&&this.app.pages[this.app.currentPageIndex].widgets.filter(a=>a.parentId===o).forEach(a=>i.push(a.id))}),this.app.project.deleteWidgets([...new Set(i)]),this.app.editor.setSelectedWidgetIds([]),this.app.recordHistory(),L(C.STATE_CHANGED)}moveWidgetToPage(e,n,i=null,o=null){const r=this.app.getWidgetById(e);if(!r)return!1;const s=this.app.getCurrentPage(),a=this.app.pages[n];if(!s||!a)return!1;const l=[r];if(r.type==="group"){const h=s.widgets.filter(g=>g.parentId===e);l.push(...h)}const c=i!==null?i-r.x:0,d=o!==null?o-r.y:0,u=new Set(l.map(h=>h.id));return s.widgets=s.widgets.filter(h=>!u.has(h.id)),l.forEach(h=>{const g=JSON.parse(JSON.stringify(h));h.id===e?(i!==null&&(g.x=i),o!==null&&(g.y=o)):(g.x+=c,g.y+=d),a.widgets.push(g)}),this.app.project.rebuildWidgetsIndex(),this.app.recordHistory(),L(C.STATE_CHANGED),!0}copyWidget(e){const i=(e?[e]:this.normalizeWidgetIds(this.app.editor.selectedWidgetIds)).map(o=>this.app.getWidgetById(o)).filter(o=>!!o);i.length>0&&this.app.editor.copyWidgets(i)}pasteWidget(){const e=this.app.editor,n=e.clipboardWidgets;if(!n||n.length===0)return;const i=n.map(o=>{const r=JSON.parse(JSON.stringify(o));return r.id=_e(),r.x+=10,r.y+=10,r});i.forEach(o=>{this.checkRenderingModeForWidget(o),this.app.project.addWidget(o)}),e.setSelectedWidgetIds(i.map(o=>o.id)),this.app.recordHistory(),L(C.STATE_CHANGED)}createDropShadow(e){const n=Array.isArray(e)?e:[e];if(n.length===0)return;const i=this.app.project.getCurrentPage();if(!i||!i.widgets)return;const o=i?i.dark_mode:void 0;let r=!1;o==="dark"?r=!0:o==="light"?r=!1:r=!!this.app.settings.dark_mode;const s=u=>{if(typeof u!="string")return!1;const h=u.trim().toLowerCase();return h===""||h==="transparent"||h==="transp"},a=(...u)=>u.find(h=>typeof h=="string"&&!s(h)),l=r?"white":"black",c="white",d=[];n.forEach(u=>{const h=this.app.getWidgetById(u);if(!h)return;const g=parseInt(h.props?.border_radius||h.props?.radius||h.props?.corner_radius||0,10);let m="shape_rect";h.type==="shape_circle"||h.type==="circle"?m="shape_circle":g>0&&(m="rounded_rect");const y={id:_e(),type:m,x:(h.x||0)+5,y:(h.y||0)+5,width:h.width,height:h.height,props:{name:(h.props?.name||h.type)+" Shadow",bg_color:l,border_color:l}};m==="rounded_rect"&&(y.props.radius=g),this.app.project.addWidget(y),h.props||(h.props={});const v=["shape_rect","rounded_rect","shape_circle","rectangle","rrect","circle"].includes(h.type),x=(v&&(a(h.props.bg_color,h.props.color)||h.props.fill)?a(h.props.bg_color,h.props.color):null)??a(h.props.bg_color,h.props.background_color)??c;v?(h.props.bg_color=x,delete h.props.background_color,delete h.props.fill):(h.props.fill=!0,(h.props.bg_color!==void 0||h.props.background_color===void 0)&&(h.props.bg_color=x),h.props.background_color!==void 0&&(h.props.background_color=x)),this.app.project.updateWidget(u,{props:{...h.props}});const E=i.widgets.findIndex(D=>D.id===u),S=i.widgets.findIndex(D=>D.id===y.id);E!==-1&&S!==-1&&this.app.project.reorderWidget(this.app.project.currentPageIndex,S,E);const k="group_"+_e(),w=Math.min(h.x,y.x),I=Math.min(h.y,y.y),T=Math.max(h.x+h.width,y.x+y.width),O=Math.max(h.y+h.height,y.y+y.height),M={id:k,type:"group",title:h.props?.name?`${h.props.name} Group`:"Shadow Group",x:w,y:I,width:T-w,height:O-I,props:{},expanded:!0};this.app.project.addWidget(M),this.app.project.updateWidget(y.id,{parentId:k}),this.app.project.updateWidget(h.id,{parentId:k}),d.push(k)}),d.length>0&&this.app.selectWidgets(d),this.syncWidgetOrderWithHierarchy(),this.app.recordHistory(),L(C.STATE_CHANGED)}syncWidgetOrderWithHierarchy(){const e=this.app.getCurrentPage();if(!e||!e.widgets)return;const n=[...e.widgets],i=n.filter(a=>!a.parentId),o=new Map;n.forEach(a=>{if(a.parentId){o.has(a.parentId)||o.set(a.parentId,[]);const l=o.get(a.parentId);l&&l.push(a)}});const r=[],s=a=>{r.push(a);const l=o.get(a.id);l&&(l.sort((c,d)=>n.indexOf(c)-n.indexOf(d)),l.forEach(s))};i.forEach(s),e.widgets=r,this.app.project.rebuildWidgetsIndex()}syncWidgetVisibilityWithMode(){const e=this.app.preferences.state.renderingMode||"direct";_.log(`[AppState] Syncing widget visibility for mode: ${e}`);let n=0;this.app.project.pages.forEach(i=>{i.widgets.forEach(o=>{const r=this.isWidgetCompatibleWithMode(o,e);!r&&!o.hidden?(o.hidden=!0,n++):r&&o.hidden&&(o.hidden=!1,n++)})}),n>0&&(_.log(`[AppState] Updated ${n} widgets due to mode switch.`),this.app.project.rebuildWidgetsIndex(),L(C.STATE_CHANGED))}isWidgetCompatibleWithMode(e,n){const i=q.get(e.type);if(!i)return!0;if(n==="oepl")return!!i.exportOEPL;if(n==="opendisplay")return!!i.exportOpenDisplay;if(n==="lvgl"){const o=e.type&&e.type.startsWith("lvgl_"),r=typeof i.exportLVGL=="function";return o||r}if(n==="direct"){const o=e.type&&(e.type.startsWith("lvgl_")||e.type.startsWith("oepl_"));return!!i.export&&!o}return!0}checkRenderingModeForWidget(e){if(!e||!e.type)return;const n=this.app.preferences.state.renderingMode||"direct",i=e.type.startsWith("lvgl_"),o=e.type.startsWith("oepl_"),r=e.type.startsWith("odp_")||e.type.startsWith("opendisplay_");i&&n==="direct"?(this.app.updateSettings({renderingMode:"lvgl"}),_.log(`[AppState] Auto-switched to LVGL rendering mode because an LVGL widget (${e.type}) was added.`),A("Auto-switched to LVGL rendering mode","info")):o&&n!=="oepl"?(this.app.updateSettings({renderingMode:"oepl"}),_.log(`[AppState] Auto-switched to OEPL rendering mode because an OEPL widget (${e.type}) was added.`),A("Auto-switched to OEPL mode","info")):r&&n!=="opendisplay"&&(this.app.updateSettings({renderingMode:"opendisplay"}),_.log(`[AppState] Auto-switched to OpenDisplay (ODP) mode because an ODP widget (${e.type}) was added.`),A("Auto-switched to ODP mode","info"))}}class lo{constructor(e){this.app=e}reorderWidget(e,n,i){this.app.project.reorderWidget(e,n,i),this.app.widgetManager.syncWidgetOrderWithHierarchy(),this.app.recordHistory(),L(C.STATE_CHANGED)}setCurrentPageIndex(e,n={}){this.app.project.setCurrentPageIndex(e,n),this.app.editor.setSelectedWidgetIds([]),L(C.STATE_CHANGED)}reorderPage(e,n){this.app.project.reorderPage(e,n),this.app.recordHistory()}addPage(e=null){const n=this.app.project.addPage(e);return this.app.recordHistory(),n}deletePage(e){this.app.project.deletePage(e),this.app.recordHistory()}duplicatePage(e){const n=this.app.project.duplicatePage(e);return this.app.recordHistory(),n}renamePage(e,n){this.app.project.renamePage(e,n),this.app.recordHistory()}clearCurrentPage(e=!1){const n=this.app.project.clearCurrentPage(e);return n.deleted>0&&(this.app.editor.setSelectedWidgetIds([]),this.app.recordHistory(),L(C.STATE_CHANGED)),n}}class co{project;editor;preferences;secrets;selectionManager;historyManager;widgetManager;pageManager;_isRestoringHistory;isUndoRedoInProgress;entityStates;$raw;constructor(){this.project=new eo,this.editor=new to,this.preferences=new no,this.secrets=new io,this.selectionManager=new oo(this),this.historyManager=new ro(this),this.widgetManager=new ao(this),this.pageManager=new lo(this),this._isRestoringHistory=!1,this.isUndoRedoInProgress=!1,this.entityStates={},this.recordHistory(),W(C.SETTINGS_CHANGED,e=>{e&&e.renderingMode!==void 0&&this.syncWidgetVisibilityWithMode()})}reset(){this.project.reset(),this.editor.state.selectedWidgetIds=[],this.recordHistory()}get pages(){return this.project.pages}get state(){return this.project.state}get currentPageIndex(){return this.project.currentPageIndex}get selectedWidgetId(){return this.editor.selectedWidgetIds[0]||null}get selectedWidgetIds(){return this.editor.selectedWidgetIds}get settings(){return{...this.preferences.state,device_name:this.project.deviceName,deviceName:this.project.deviceName,device_model:this.project.deviceModel,deviceModel:this.project.deviceModel,customHardware:this.project.customHardware,custom_hardware:this.project.customHardware,protocolHardware:this.project.protocolHardware,protocol_hardware:this.project.protocolHardware,...this.secrets.keys}}get deviceName(){return this.project.deviceName}get deviceModel(){return this.project.deviceModel}get currentLayoutId(){return this.project.currentLayoutId}get manualYamlOverride(){return this.project.manualYamlOverride}get snapEnabled(){return this.preferences.snapEnabled}get showGrid(){return this.preferences.showGrid}get showDebugGrid(){return this.preferences.showDebugGrid}get showRulers(){return this.preferences.showRulers}get zoomLevel(){return this.editor.zoomLevel}getCurrentPage(){return this.project.getCurrentPage()}getWidgetById(e){return this.project.getWidgetById(e)}getSelectedWidget(){return this.project.getWidgetById(this.editor.selectedWidgetIds[0])}getSelectedWidgets(){return this.editor.selectedWidgetIds.map(e=>this.getWidgetById(e)).filter(e=>!!e)}getSelectedProfile(){const e=H;return this.project.deviceModel&&e[this.project.deviceModel]||null}getCanvasDimensions(){const e=this.preferences.state.renderingMode||"direct";if(e==="oepl"||e==="opendisplay"){const n=this.project.protocolHardware;return this.preferences.state.orientation==="portrait"?{width:Math.min(n.width,n.height),height:Math.max(n.width,n.height)}:{width:Math.max(n.width,n.height),height:Math.min(n.width,n.height)}}return this.project.getCanvasDimensions(this.preferences.state.orientation||"landscape")}getCanvasShape(){return this.project.getCanvasShape()}getPagesPayload(){const e={...this.project.getPagesPayload(),currentPageIndex:this.currentPageIndex,...this.settings};return e.deviceModel=this.project.deviceModel||void 0,e.customHardware=this.project.customHardware,e.protocolHardware=this.project.protocolHardware,e.device_model=this.project.deviceModel||void 0,e.custom_hardware=this.project.customHardware,e.protocol_hardware=this.project.protocolHardware,e}getSettings(){return this.settings}getManualYamlOverride(){return this.project.manualYamlOverride}setSettings(e){this.updateSettings(e)}updateProtocolHardware(e){Object.assign(this.project.state.protocolHardware,e),L(C.SETTINGS_CHANGED),L(C.PAGE_CHANGED,{index:this.currentPageIndex,forceFocus:!0})}saveToLocalStorage(){if(!N()){const e=this.getPagesPayload();localStorage.setItem("esphome-designer-layout",JSON.stringify(e))}}loadFromLocalStorage(){try{const e=localStorage.getItem("esphome-designer-layout");return e?JSON.parse(e):null}catch(e){return _.error("[loadFromLocalStorage] Parse error:",e),null}}setPages(e){this.project.setPages(e),L(C.STATE_CHANGED)}reorderWidget(e,n,i){this.pageManager.reorderWidget(e,n,i)}setCurrentPageIndex(e,n={}){this.pageManager.setCurrentPageIndex(e,n)}reorderPage(e,n){this.pageManager.reorderPage(e,n)}addPage(e=null){return this.pageManager.addPage(e)}deletePage(e){this.pageManager.deletePage(e)}duplicatePage(e){return this.pageManager.duplicatePage(e)}renamePage(e,n){this.pageManager.renamePage(e,n)}selectWidget(e,n=!1){this.selectionManager.selectWidget(e,n)}selectWidgets(e){this.selectionManager.selectWidgets(e)}selectAllWidgets(){this.selectionManager.selectAllWidgets()}deselectAll(){this.selectionManager.deselectAll()}toggleSelection(e){this.selectionManager.toggleSelection(e)}isWidgetSelected(e){return this.selectionManager.isWidgetSelected(e)}groupSelection(){this.selectionManager.groupSelection()}ungroupSelection(e=null){this.selectionManager.ungroupSelection(e)}alignSelectedWidgets(e){this.selectionManager.alignSelectedWidgets(e)}distributeSelectedWidgets(e){this.selectionManager.distributeSelectedWidgets(e)}updateSettings(e){const n={},i={};Object.keys(e).forEach(o=>{o.startsWith("ai_api_key_")?n[o]=e[o]:i[o]=e[o]}),Object.keys(n).length&&Object.entries(n).forEach(([o,r])=>this.secrets.set(o,String(r??""))),this.preferences.update(i),e.device_name&&(this.project.state.deviceName=e.device_name),e.device_model&&(this.project.state.deviceModel=e.device_model),L(C.STATE_CHANGED),(e.device_model||e.orientation||e.custom_hardware)&&L(C.PAGE_CHANGED,{index:this.currentPageIndex,forceFocus:!0})}setDeviceName(e){this.project.state.deviceName=e,this.updateLayoutIndicator(),L(C.STATE_CHANGED)}setDeviceModel(e){this.project.state.deviceModel=e,this.updateLayoutIndicator(),L(C.STATE_CHANGED),L(C.PAGE_CHANGED,{index:this.currentPageIndex,forceFocus:!0})}setCurrentLayoutId(e){this.project.state.currentLayoutId=e,this.updateLayoutIndicator(),L(C.STATE_CHANGED)}setManualYamlOverride(e,n={}){this.project.setManualYamlOverride(e,n)}clearManualYamlOverride(e={}){this.project.clearManualYamlOverride(e)}updateLayoutIndicator(){const e=document.getElementById("currentLayoutName");e&&(e.textContent=this.project.deviceName||this.project.currentLayoutId||"Unknown")}setSnapEnabled(e){this.preferences.setSnapEnabled(e)}setShowGrid(e){this.preferences.setShowGrid(e)}setShowDebugGrid(e){this.preferences.setShowDebugGrid(e)}setShowRulers(e){this.preferences.setShowRulers(e)}setZoomLevel(e){this.editor.setZoomLevel(e)}setCustomHardware(e){this.widgetManager.setCustomHardware(e)}addWidget(e,n=null){this.widgetManager.addWidget(e,n)}updateWidget(e,n){this.widgetManager.updateWidget(e,n)}updateWidgets(e,n){this.widgetManager.updateWidgets(e,n)}updateWidgetsProps(e,n){this.widgetManager.updateWidgetsProps(e,n)}deleteWidget(e=null){this.widgetManager.deleteWidget(e)}moveWidgetToPage(e,n,i=null,o=null){return this.widgetManager.moveWidgetToPage(e,n,i,o)}copyWidget(e=null){this.widgetManager.copyWidget(e)}pasteWidget(){this.widgetManager.pasteWidget()}createDropShadow(e){this.widgetManager.createDropShadow(e)}clearCurrentPage(e=!1){return this.pageManager.clearCurrentPage(e)}recordHistory(){this.historyManager.recordHistory()}undo(){this.historyManager.undo()}redo(){this.historyManager.redo()}setInternalFlag(e,n){const i=this.$raw||this;i[String(e)]=n}restoreSnapshot(e){this.historyManager.restoreSnapshot(e)}canUndo(){return this.historyManager.canUndo()}canRedo(){return this.historyManager.canRedo()}syncWidgetOrderWithHierarchy(){this.widgetManager.syncWidgetOrderWithHierarchy()}syncWidgetVisibilityWithMode(){this.widgetManager.syncWidgetVisibilityWithMode()}_isWidgetCompatibleWithMode(e,n){return this.widgetManager.isWidgetCompatibleWithMode(e,n)}_checkRenderingModeForWidget(e){this.widgetManager.checkRenderingModeForWidget(e)}}const po=new co,uo={set(t,e,n,i){return e==="snapEnabled"?(_.warn(`[StateProxy] Intercepted illegal write to '${String(e)}'. Automatically rerouting to setSnapEnabled().`),typeof t.setSnapEnabled=="function"&&t.setSnapEnabled(!!n),!0):(typeof e=="string"&&!["entityStates","_isRestoringHistory","isUndoRedoInProgress"].includes(e)&&typeof t[e]!="function"&&(_.warn(`[StateProxy] Illegal state mutation detected: AppState.${e} = ${String(n)}`),console.trace(`[StateProxy] Trace for illegal mutation of AppState.${e}`)),Reflect.set(t,e,n,i))}},p=new Proxy(po,uo);class j{static getEffectiveDarkMode(){const n=p?.getCurrentPage?.()?.dark_mode;return n==="dark"?!0:n==="light"?!1:!!(p&&p.settings&&p.settings.dark_mode)}static getDefaultColor(){return j.getEffectiveDarkMode()?"white":"black"}static getDefaultBgColor(){return j.getEffectiveDarkMode()?"black":"white"}static getGridCellDefaults(){return{grid_cell_row_pos:null,grid_cell_column_pos:null,grid_cell_row_span:1,grid_cell_column_span:1,grid_cell_x_align:"STRETCH",grid_cell_y_align:"STRETCH"}}static isLvglWidget(e){return!!(e&&e.startsWith("lvgl_"))}static createWidget(e){const n=_e(),i=j.getDefaultBgColor(),o=j.getDefaultColor();let r={id:n,type:e,x:40,y:40,width:120,height:40,title:"",entity_id:"",locked:!1,props:{}};switch(e){case"nav_next_page":return r.props={title:"Next",color:"rgba(0, 128, 255, 0.2)",border_color:"#0080ff",nav_action:"next_page",icon:"F0142",icon_size:48},r.width=80,r.height=80,r;case"nav_previous_page":return r.props={title:"Previous",color:"rgba(0, 128, 255, 0.2)",border_color:"#0080ff",nav_action:"previous_page",icon:"F0141",icon_size:48},r.width=80,r.height=80,r;case"nav_reload_page":return r.props={title:"Reload",color:"rgba(0, 128, 255, 0.2)",border_color:"#0080ff",nav_action:"reload_page",icon:"F0450",icon_size:48},r.width=80,r.height=80,r}const s=q.get(e);return s&&s.defaults&&(r.props={...s.defaults},(r.props.color==="black"||r.props.color==="white")&&(r.props.color="theme_auto"),(r.props.text_color==="black"||r.props.text_color==="white")&&(r.props.text_color="theme_auto"),(r.props.bg_color==="black"||r.props.bg_color==="white")&&(r.props.bg_color=i),(r.props.background_color==="black"||r.props.background_color==="white")&&(r.props.background_color=i),(r.props.border_color==="black"||r.props.border_color==="white")&&(r.props.border_color=o),s.width&&(r.width=s.width),s.height&&(r.height=s.height),s.defaults.width&&(r.width=s.defaults.width),s.defaults.height&&(r.height=s.defaults.height),s.defaults.w&&(r.width=s.defaults.w),s.defaults.h&&(r.height=s.defaults.h)),j.isLvglWidget(e)&&(r.props={...j.getGridCellDefaults(),...r.props}),r}}let Ce=null;class Zs{constructor(){this.isOpen=!1,this.selectedIndex=0,this.filteredWidgets=[],this.allWidgets=[],this.modal=null,this.input=null,this.resultsContainer=null,Ce=this,this.init()}init(){this.createModal(),this.bindEvents()}discoverWidgets(){this.allWidgets=[];const e=document.querySelectorAll(".widget-category .item[data-widget-type]");if(e.length===0){_.warn("[QuickSearch] No widgets found in palette");return}e.forEach(n=>{const i=n.getAttribute("data-widget-type"),o=n.querySelector(".label"),r=o?o.textContent.trim():i,s=n.closest(".widget-category"),a=s?s.querySelector(".category-name"):null,l=a?a.textContent.trim():"Widgets";this.allWidgets.push({type:i,label:r,category:l,searchText:`${r} ${i} ${l}`.toLowerCase()})}),_.log(`[QuickSearch] Discovered ${this.allWidgets.length} widgets`)}createModal(){this.modal=document.createElement("div"),this.modal.id="quick-search-modal",this.modal.className="quick-search-modal hidden",this.modal.innerHTML=`
            <div class="quick-search-backdrop"></div>
            <div class="quick-search-container">
                <div class="quick-search-header">
                    <span class="quick-search-icon">🔍</span>
                    <input type="text" class="quick-search-input" placeholder="Search widgets..." autocomplete="off" />
                </div>
                <div class="quick-search-results"></div>
                <div class="quick-search-hint">
                    <span>↑↓ Navigate</span>
                    <span>↵ Add Widget</span>
                    <span>Esc Close</span>
                </div>
            </div>
        `,V(this.modal),this.input=this.modal.querySelector(".quick-search-input"),this.resultsContainer=this.modal.querySelector(".quick-search-results")}bindEvents(){this.modal.querySelector(".quick-search-backdrop").addEventListener("click",()=>this.close()),this.input.addEventListener("input",()=>this.handleSearch()),this.input.addEventListener("keydown",e=>this.handleKeyDown(e))}open(){this.discoverWidgets(),this.isOpen=!0,this.modal.classList.remove("hidden"),this.input.value="",this.selectedIndex=0,this.handleSearch(),setTimeout(()=>this.input.focus(),50)}close(){this.isOpen=!1,this.modal.classList.add("hidden"),this.input.blur()}handleSearch(){const e=this.input.value.toLowerCase().trim();e===""?this.filteredWidgets=[...this.allWidgets]:this.filteredWidgets=this.allWidgets.filter(n=>n.searchText.includes(e)),this.selectedIndex=0,this.renderResults()}renderResults(){if(this.filteredWidgets.length===0){this.resultsContainer.innerHTML=`
                <div class="quick-search-empty">No widgets found</div>
            `;return}this.resultsContainer.innerHTML=this.filteredWidgets.map((n,i)=>`
            <div class="quick-search-item ${i===this.selectedIndex?"selected":""}" 
                 data-index="${i}" data-type="${n.type}">
                <span class="quick-search-item-label">${n.label}</span>
                <span class="quick-search-item-category">${n.category}</span>
            </div>
        `).join(""),this.resultsContainer.querySelectorAll(".quick-search-item").forEach(n=>{n.addEventListener("click",()=>{const i=parseInt(n.getAttribute("data-index"),10);this.selectedIndex=i,this.addSelectedWidget()})});const e=this.resultsContainer.querySelector(".quick-search-item.selected");e&&e.scrollIntoView({block:"nearest"})}handleKeyDown(e){switch(e.key){case"ArrowDown":e.preventDefault(),this.selectedIndex=Math.min(this.selectedIndex+1,this.filteredWidgets.length-1),this.renderResults();break;case"ArrowUp":e.preventDefault(),this.selectedIndex=Math.max(this.selectedIndex-1,0),this.renderResults();break;case"Enter":e.preventDefault(),this.addSelectedWidget();break;case"Escape":e.preventDefault(),this.close();break}}addSelectedWidget(){if(this.filteredWidgets.length===0)return;const e=this.filteredWidgets[this.selectedIndex];if(e)try{const n=j.createWidget(e.type);p.addWidget(n),_.log(`[QuickSearch] Added widget: ${e.label}`),this.close()}catch(n){_.error("[QuickSearch] Error adding widget:",n),A("Failed to add widget: "+n.message,"error")}}}function Dt(){return typeof globalThis.innerWidth=="number"?globalThis.innerWidth:0}function ho(t,e){const n=document.createElement("div");n.className="modal-backdrop",n.style.display="flex",n.innerHTML=`
        <div class="modal" style="width: 320px; height: auto; min-height: 150px; padding: var(--space-4);">
            <div class="modal-header" style="font-size: var(--fs-md); padding-bottom: var(--space-2);">
                <div>Delete Page</div>
            </div>
            <div class="modal-body" style="padding: var(--space-2) 0;">
                <p style="margin-bottom: var(--space-3); font-size: var(--fs-sm);">
                    Are you sure you want to delete the page <b>"${e.name}"</b>?
                    <br><br>
                    This action cannot be undone.
                </p>
            </div>
            <div class="modal-actions" style="padding-top: var(--space-3); border-top: 1px solid var(--border-subtle);">
                <button class="btn btn-secondary close-btn btn-xs">Cancel</button>
                <button class="btn btn-primary confirm-btn btn-xs" style="background: var(--danger); color: white; border: none;">Delete</button>
            </div>
        </div>
    `,V(n);const i=()=>n.remove(),o=()=>{i();try{typeof p.deletePage=="function"?p.deletePage(t):typeof A=="function"&&A("Error: AppState.deletePage not found","error")}catch(a){if(typeof A=="function"){const l=a instanceof Error?a.message:String(a);A(`Error deleting page: ${l}`,"error")}}};n.querySelectorAll(".close-btn").forEach(a=>a.onclick=i);const s=n.querySelector(".confirm-btn");s&&(s.onclick=o),n.onclick=a=>{a.target===n&&i()}}function go(){if(!p){typeof A=="function"&&A("Error: Application State is not ready.","error");return}const e=document.createElement("div");e.className="modal-backdrop",e.style.display="flex",e.innerHTML=`
        <div class="modal" style="width: 320px; height: auto; min-height: 180px; padding: var(--space-4);">
            <div class="modal-header" style="font-size: var(--fs-md); padding-bottom: var(--space-2);">
                <div>Clear Page</div>
            </div>
            <div class="modal-body" style="padding: var(--space-2) 0;">
                <p style="margin-bottom: var(--space-3); font-size: var(--fs-sm);">Are you sure you want to clear all widgets? <b>Locked</b> widgets will stay.</p>
            </div>
            <div class="modal-actions" style="padding-top: var(--space-3); border-top: 1px solid var(--border-subtle);">
                <button class="btn btn-secondary close-btn btn-xs">Cancel</button>
                <button class="btn btn-primary confirm-btn btn-xs" style="background: var(--danger); color: white; border: none;">Clear All</button>
            </div>
        </div>
    `,V(e);const n=()=>e.remove(),i=()=>{n();try{const s=p.clearCurrentPage(!0);s.preserved>0&&typeof A=="function"?A(`Cleared ${s.deleted} widgets. ${s.preserved} locked widget(s) were preserved.`,"info"):s.deleted>0?A(`Cleared all ${s.deleted} widgets.`,"success"):s.preserved>0?A(`No widgets cleared. ${s.preserved} locked widget(s) preserved.`,"info"):A("Page is already empty.","info"),_.log("Cleared widgets from current page via AppState")}catch(s){if(typeof A=="function"){const a=s instanceof Error?s.message:String(s);A(`Error clearing page: ${a}`,"error")}}};e.querySelectorAll(".close-btn").forEach(s=>s.onclick=n);const r=e.querySelector(".confirm-btn");r&&(r.onclick=i),e.onclick=s=>{s.target===e&&n()}}function mo(t){const e=document.getElementById("mobileWidgetsBtn"),n=document.getElementById("mobilePropsBtn"),i=document.getElementById("mobileDeviceBtn"),o=document.getElementById("mobileBackdrop"),r=document.querySelector(".sidebar"),s=document.querySelector(".right-panel"),a=()=>{r?.classList.remove("mobile-active"),s?.classList.remove("mobile-active"),o?.classList.remove("active")};e?.addEventListener("click",()=>{const d=r?.classList.contains("mobile-active");a(),d||(r?.classList.add("mobile-active"),o?.classList.add("active"))}),n?.addEventListener("click",()=>{const d=s?.classList.contains("mobile-active");a(),d||(s?.classList.add("mobile-active"),o?.classList.add("active"))}),i?.addEventListener("click",()=>{a(),t.app?.deviceSettings?.open()}),document.getElementById("mobileEditorSettingsBtn")?.addEventListener("click",()=>{a(),t.app?.editorSettings?.open()}),o?.addEventListener("click",a),W(C.SELECTION_CHANGED,()=>{Dt()<=768&&(r?.classList.remove("mobile-active"),!s?.classList.contains("mobile-active")&&!r?.classList.contains("mobile-active")&&o?.classList.remove("active"))});const c=t.handlePaletteClick.bind(t);t.handlePaletteClick=d=>{c(d),Dt()<=768&&a()}}class Qs{constructor(e=null){_.log("Sidebar: Constructor called"),this.app=e,this.pageListEl=document.getElementById("pageList"),this.pagesHeader=document.getElementById("pagesHeader"),this.pagesContent=document.getElementById("pagesContent"),this.widgetPaletteEl=document.getElementById("widgetPalette"),_.log("Sidebar: widgetPaletteEl found?",!!this.widgetPaletteEl),this.widgetPaletteEl||_.error("Sidebar: widgetPalette element not found!"),this.addPageBtn=document.getElementById("addPageBtn"),this.currentPageNameEl=document.getElementById("currentPageName"),this.hoverTimeout=null,this.hoveredPageIndex=-1}init(){_.log("Sidebar: init called"),W(C.STATE_CHANGED,()=>this.render()),W(C.PAGE_CHANGED,()=>this.render());const e=this.pagesHeader,n=this.pagesContent;e&&n&&e.addEventListener("click",()=>{const r=n.classList.toggle("hidden"),s=e.querySelector(".chevron");s&&(s.style.transform=r?"rotate(-90deg)":"rotate(0deg)")}),this.addPageBtn&&this.addPageBtn.addEventListener("click",()=>this.handleAddPage()),this.widgetPaletteEl&&(this.widgetPaletteEl.addEventListener("click",r=>this.handlePaletteClick(r)),this.widgetPaletteEl.addEventListener("dragstart",r=>{const s=r.target.closest(".item[data-widget-type]");if(s){const a=s.getAttribute("data-widget-type");_.log("[Sidebar] Drag start:",a),r.dataTransfer&&(r.dataTransfer.setData("application/widget-type",a||""),r.dataTransfer.effectAllowed="copy")}}));const i=document.getElementById("clearAllBtn");i&&i.addEventListener("click",()=>this.handleClearPage());const o=document.getElementById("quickSearchBtn");o&&o.addEventListener("click",r=>{r.stopPropagation(),Ce?Ce.open():_.warn("Sidebar: QuickSearch instance not found on window")}),this.setupMobileToggles(),this.render()}render(){const e=this.pageListEl;if(!e)return;const n=document.createDocumentFragment();e.innerHTML="";const i=p.pages,o=p.currentPageIndex;if(i.forEach((r,s)=>{const a=document.createElement("div");a.className="item"+(s===o?" active":""),a.draggable=!0,a.ondragstart=g=>{g.dataTransfer&&(g.dataTransfer.setData("text/plain",String(s)),g.dataTransfer.effectAllowed="move"),a.style.opacity="0.5"},a.ondragend=()=>{a.style.opacity="1",Array.from(e.children).forEach(g=>{g.style.borderTop="",g.style.borderBottom=""})},a.ondragover=g=>{if(g.preventDefault(),!g.dataTransfer)return;const m=g.dataTransfer.types.includes("application/widget-id"),y=g.dataTransfer.types.includes("application/widget-type");if(m||y){g.dataTransfer&&(g.dataTransfer.dropEffect=m?"move":"copy"),a.style.backgroundColor="var(--primary-subtle)",p.currentPageIndex!==s&&p.setCurrentPageIndex(s);return}const v=a.getBoundingClientRect(),f=v.top+v.height/2;g.clientY<f?(a.style.borderTop="2px solid var(--primary)",a.style.borderBottom=""):(a.style.borderTop="",a.style.borderBottom="2px solid var(--primary)")},a.ondragleave=g=>{const m=g.relatedTarget;(!(m instanceof Node)||!a.contains(m))&&this.hoveredPageIndex===s&&(this.hoverTimeout&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=null),this.hoveredPageIndex=-1),a.style.borderTop="",a.style.borderBottom="",a.style.backgroundColor=""},a.ondrop=g=>{if(g.preventDefault(),this.hoverTimeout&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=null),this.hoveredPageIndex=-1,a.style.borderTop="",a.style.borderBottom="",a.style.backgroundColor="",!g.dataTransfer)return;const m=g.dataTransfer.getData("application/widget-id"),y=g.dataTransfer.getData("application/widget-type");if(m){_.log(`[Sidebar] Drop detected on page ${s}. Widget ID:`,m);const b=s;b!==p.currentPageIndex&&(p.moveWidgetToPage(m,b),_.log(`[Sidebar] Moved widget ${m} to page ${b}`));return}if(y){_.log(`[Sidebar] Drop detected on page ${s}. Widget Type:`,y);const b=s;try{const x=j.createWidget(y);x.x=40,x.y=40,p.addWidget(x,b),p.setCurrentPageIndex(b),p.selectWidget(x.id,!1),_.log(`[Sidebar] Added new ${y} to page ${b}`)}catch(x){_.error("[Sidebar] Error creating widget from drop:",x)}return}const v=parseInt(g.dataTransfer.getData("text/plain"),10),f=s;this.handlePageReorder(v,f,g.clientY,a)},a.onclick=()=>{p.setCurrentPageIndex(s,{forceFocus:!0})},a.ondblclick=g=>{g.stopPropagation();const m=r.name||"",y=prompt("Rename Page:",m);y!==null&&y.trim()!==""&&y!==m&&p.renamePage(s,y)};const l=document.createElement("span");l.className="item-icon",l.innerHTML=`<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>`,a.appendChild(l);const c=document.createElement("span");c.className="label",c.textContent=r.name,a.appendChild(c);const d=document.createElement("div");d.style.marginLeft="auto",d.style.display="flex",d.style.gap="2px";const u=document.createElement("button");u.textContent="⚙",u.className="btn btn-secondary",u.style.padding="1px 4px",u.style.fontSize="8px",u.onclick=g=>{g.stopPropagation(),this.openPageSettings(s)},d.appendChild(u);const h=document.createElement("button");if(h.textContent="⧉",h.className="btn btn-secondary",h.style.padding="1px 4px",h.style.fontSize="8px",h.title="Duplicate Page",h.onclick=g=>{g.stopPropagation(),p.duplicatePage(s)},d.appendChild(h),i.length>1){const g=document.createElement("button");g.textContent="✕",g.className="btn btn-secondary",g.style.padding="1px 4px",g.style.fontSize="8px",g.style.color="var(--danger)",g.onclick=m=>{m.stopPropagation(),this.handlePageDelete(s,r)},d.appendChild(g)}a.appendChild(d),n.appendChild(a)}),e.appendChild(n),this.currentPageNameEl){const r=p.getCurrentPage();this.currentPageNameEl.textContent=r?r.name:"None"}}handleAddPage(){p.addPage()}handlePageReorder(e,n,i,o){if(e===n)return;const r=o.getBoundingClientRect(),s=r.top+r.height/2;let a=n;i>=s&&a++,e<a&&a--,e!==a&&p.reorderPage(e,a)}handlePaletteClick(e){_.log("Sidebar: handlePaletteClick",e.target);const n=e.target.closest(".item[data-widget-type]");if(!n){_.log("Sidebar: No item found");return}const i=n.getAttribute("data-widget-type");_.log("Sidebar: Creating widget of type",i);try{const o=j.createWidget(i);_.log("Sidebar: Widget created",o),p.addWidget(o),_.log("Sidebar: Widget added to state"),this.app&&this.app.canvas&&(this.app.canvas.suppressNextFocus=!0)}catch(o){_.error("Sidebar: Error creating/adding widget",o)}}openPageSettings(e){if(this.app&&this.app.pageSettings)this.app.pageSettings.open(e);else{_.error("Sidebar: PageSettings instance not found on injected app reference");const n=document.getElementById("pageSettingsModal");n&&(n.classList.remove("hidden"),n.style.display="flex")}}handlePageDelete(e,n){ho(e,n)}handleClearPage(){go()}setupMobileToggles(){mo(this)}}const Me=H,Ee=p;function Ge(){return Ee&&Ee.deviceModel?Ee.deviceModel:"reterminal_e1001"}function vn(){const t=Ge();return!!(Me&&Me[t]&&(Me[t].features?.lcd||Me[t].features?.oled))}function Ie(){const t=Ee?.settings?.renderingMode||"direct",e=["black","white","red","yellow","gray"],n=["theme_auto","black","white","gray"],i=["black","white","red","green","blue","yellow","orange","gray","purple","cyan","magenta"],o=["theme_auto","black","white","gray","red","green","blue","yellow"];if(t==="oepl"||t==="opendisplay"){const a=(Ee?.project?.protocolHardware||{}).colorMode||"bw";return a==="full_color"?i:a==="color_3"?e:n}if(vn())return i;const r=Ge();return r==="reterminal_e1002"||r==="esp32_s3_photopainter"?o:r.endsWith("bwr_yaml")?e:r.endsWith("fullcolor_yaml")?i:r.endsWith("primarycolor_yaml")?o:n}function bn(t){if(!t)return"#000000";if(t.startsWith("#"))return t;if(t.startsWith("0x"))return"#"+t.substring(2);switch(t.toLowerCase()){case"theme_auto":return j.getEffectiveDarkMode()?"#ffffff":"#000000";case"theme_auto_inverse":return j.getEffectiveDarkMode()?"#000000":"#ffffff";case"white":return"#ffffff";case"red":return"#ff0000";case"green":return"#00ff00";case"blue":return"#0000ff";case"yellow":return"#ffff00";case"orange":return"#ffa500";case"gray":return"#a0a0a0";case"transparent":return"transparent";case"black":default:return"#000000"}}function fo(t,e,n,i){const o=e.match(/^(\d+)x(\d+)$/);if(!o)return;const r=parseInt(o[1],10),s=parseInt(o[2],10),a=document.createElement("div");a.className="lvgl-grid-overlay",a.style.cssText=`
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    display: grid;
    grid-template-rows: repeat(${r}, 1fr);
    grid-template-columns: repeat(${s}, 1fr);
    pointer-events: none;
    z-index: 1;
    `;const l=i?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)",c=i?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.25)";for(let d=0;d<r;d++)for(let u=0;u<s;u++){const h=document.createElement("div");h.style.cssText=`border: 1px dashed ${l}; position: relative; box-sizing: border-box;`;const g=document.createElement("span");g.textContent=`${d},${u}`,g.style.cssText=`position: absolute; top: 2px; left: 4px; font-size: 8px; color: ${c}; pointer-events: none;`,h.appendChild(g),a.appendChild(h)}t.appendChild(a)}function yo(t){["tl","tc","tr","rc","br","bc","bl","lc"].forEach(n=>{const i=document.createElement("div");i.className=`widget-resize-handle handle-${n}`,i.dataset.handle=n,t.appendChild(i)})}function _n(t){const e=p.selectedWidgetIds,n=t.canvas.querySelector(`.artboard-wrapper[data-index="${p.currentPageIndex}"]`),i=n?n.querySelector(".artboard"):null;let o=t.canvas.querySelector(".context-toolbar");if(e.length===0||t.dragState||t.lassoState||!i){o&&o.remove();return}const r=p.getSelectedWidgets();if(r.length===0||!n||!i){o&&o.remove();return}let s=1/0,a=1/0,l=-1/0,c=-1/0;r.forEach(m=>{s=Math.min(s,m.x),a=Math.min(a,m.y),l=Math.max(l,m.x+(m.width||0)),c=Math.max(c,m.y+(m.height||0))});const d=s,h=i.offsetTop+a-45;o?o.parentElement!==n&&n.appendChild(o):(o=document.createElement("div"),o.className="context-toolbar",n.appendChild(o)),o.style.left=d+"px",o.style.top=h+"px",o.innerHTML="",e.length>1&&([{icon:"mdi-align-horizontal-left",title:"Align Left",action:"left"},{icon:"mdi-align-horizontal-center",title:"Align Center",action:"center"},{icon:"mdi-align-horizontal-right",title:"Align Right",action:"right"},{separator:!0},{icon:"mdi-align-vertical-top",title:"Align Top",action:"top"},{icon:"mdi-align-vertical-center",title:"Align Middle",action:"middle"},{icon:"mdi-align-vertical-bottom",title:"Align Bottom",action:"bottom"}].forEach(y=>{if(y.separator){Ae(o);return}xe(o,y.icon||"",y.title||"",()=>p.alignSelectedWidgets(y.action||""))}),e.length>=3&&(Ae(o),xe(o,"mdi-distribute-horizontal-center","Distribute Horizontally",()=>p.distributeSelectedWidgets("horizontal")),xe(o,"mdi-distribute-vertical-center","Distribute Vertically",()=>p.distributeSelectedWidgets("vertical")))),r.some(m=>m.type==="group"||m.parentId)?(o.children.length>0&&Ae(o),xe(o,"mdi-ungroup","Ungroup (Ctrl+Shift+G)",()=>p.ungroupSelection())):e.length>1&&(o.children.length>0&&Ae(o),xe(o,"mdi-group","Group Selection (Ctrl+G)",()=>p.groupSelection())),o.children.length===0&&o.remove()}function xe(t,e,n,i){const o=document.createElement("button");o.className="btn-icon",o.title=n,o.innerHTML=`<i class="mdi ${e}"></i>`,o.onclick=r=>{r.stopPropagation(),i()},t.appendChild(o)}function Ae(t){if(!t.lastElementChild||t.lastElementChild.classList.contains("separator"))return;const e=document.createElement("div");e.className="separator",t.appendChild(e)}function me(t,e,n){const i=document.createElement("button");return i.className="artboard-btn",i.title=e,i.innerHTML=`<i class="mdi ${t}"></i>`,i.onclick=o=>{o.stopPropagation(),n()},i}function Ht({title:t,message:e,confirmLabel:n,confirmClass:i,onConfirm:o}){const r=document.createElement("div");r.className="modal-backdrop",r.style.display="flex",r.innerHTML=`
    <div class="modal" style="width: 340px; height: auto; padding: var(--space-4); border-radius: 12px; border: 1px solid var(--glass-border);">
        <div class="modal-header" style="font-size: var(--fs-md); font-weight: 600; padding-bottom: var(--space-3); border-bottom: 1px solid var(--border-subtle);">
            <div>${t}</div>
        </div>
        <div class="modal-body" style="padding: var(--space-4) 0;">
            <p style="font-size: var(--fs-sm); line-height: 1.5; color: var(--text-dim);">
                ${e}
            </p>
        </div>
        <div class="modal-actions" style="display: flex; gap: 8px; justify-content: flex-end; padding-top: var(--space-3);">
            <button class="btn btn-secondary close-btn btn-xs" style="border-radius: 6px;">Cancel</button>
            <button class="btn ${i} confirm-btn btn-xs" style="border-radius: 6px;">${n||"Confirm"}</button>
        </div>
    </div>
    `,V(r);const s=r.querySelector(".close-btn"),a=r.querySelector(".confirm-btn"),l=s,c=a;l.onclick=()=>r.remove(),c.onclick=()=>{o(),r.remove()}}function vo(t,e,n){const i=document.createElement("div");i.className="debug-grid-overlay",t.appendChild(i)}function xn(t,e,n){if(!t||typeof n!="function")return;const i=t[e];i&&cancelAnimationFrame(i),t[e]=requestAnimationFrame(()=>{t[e]=0,n()})}function wn(t){const e=t?.dark_mode;return e==="dark"?!0:e==="light"?!1:!!p.settings.darkMode}function Se(){const t=p.getCurrentPage();return t?wn(t):!1}function te(t){const e=p.zoomLevel,n=p.settings;t.canvasContainer&&(t.canvasContainer.style.transform=`translate(${t.panX}px, ${t.panY}px) scale(${e})`,t.canvasContainer.style.transformOrigin="0 0");const i=(n.grid_opacity!==void 0?Number(n.grid_opacity):8)/100;document.documentElement.style.setProperty("--grid-opacity",i.toString());const o=document.getElementById("zoomLevel");o&&(o.textContent=Math.round(e*100)+"%")}function ze(t,e,n=!0,i=!1){xn(t,"_focusPageRaf",()=>{const r=t.canvas.querySelectorAll(".artboard-wrapper")[e];if(!r)return;const s=t.viewport.getBoundingClientRect(),a=s.width,l=s.height;if(a===0||l===0){ze(t,e,n,i);return}if(i){const g=_o(t,e);p.setZoomLevel(g)}const c=p.zoomLevel,d=r,u=d.offsetLeft+d.offsetWidth/2,h=d.offsetTop+d.offsetHeight/2;t.panX=a/2-u*c,t.panY=l/2-h*c,te(t)})}function bo(t,e=!0){xn(t,"_zoomToFitAllRaf",()=>{const n=t.canvas.querySelectorAll(".artboard-wrapper");if(n.length===0)return;let i=1/0,o=1/0,r=-1/0,s=-1/0;n.forEach(b=>{const x=b,E=x.offsetLeft,S=x.offsetTop,k=x.offsetWidth,w=x.offsetHeight;i=Math.min(i,E),o=Math.min(o,S),r=Math.max(r,E+k),s=Math.max(s,S+w)});const a=t.viewport.getBoundingClientRect(),l=a.width,c=a.height;if(l===0||c===0)return;const d=80,u=r-i+d,h=s-o+d,g=l/u,m=c/h;let y=Math.min(g,m);y=Math.max(.05,Math.min(2,y)),p.setZoomLevel(y);const v=i+(r-i)/2,f=o+(s-o)/2;t.panX=l/2-v*y,t.panY=c/2-f*y,te(t)})}function _o(t,e=p.currentPageIndex){const i=t.canvas.querySelectorAll(".artboard-wrapper")[e];if(!i)return 1;const o=t.viewport.getBoundingClientRect(),r=64,s=i,a=s.offsetWidth+r,l=s.offsetHeight+r,c=o.width/a,d=o.height/l,u=Math.min(c,d),h=Math.min(o.width,o.height),g=Math.max(.15,Math.min(1,h/800));return Math.max(g,Math.min(4,u))}function xo(t,e,n=!1){if(!e||!e.id)return;const i=t.canvas.querySelector(`.widget[data-id="${e.id}"]`);if(i){const o=i;o.style.left=e.x+"px",o.style.top=e.y+"px",o.style.width=e.width+"px",o.style.height=e.height+"px";const r=(e.type||"").toLowerCase(),s=q?q.get(r):null;if(r==="group")i.classList.add("widget-group");else if(!n&&s&&s.render)try{const a=g=>g==="theme_auto"?Se()?"#ffffff":"#000000":g==="theme_auto_inverse"?Se()?"#000000":"#ffffff":g?bn(g):Se()?"#ffffff":"#000000",l=p.selectedWidgetIds.includes(e.id),c=p.settings.device_model||"reterminal_e1001",d=H,u=d?d[c]:null;s.render(i,e,{getColorStyle:a,selected:l,profile:u,isDark:Se()});const h=e.props?.opacity;h!==void 0&&h<100?i.style.opacity=String(h/100):i.style.opacity=""}catch{}}}function de(t){if(!t.canvas)return;const e=t.app,n=p.pages,i=p.getCanvasDimensions();t.canvas.querySelectorAll(".snap-guide");const o=t.canvas.querySelector(".lasso-selection"),r=document.createDocumentFragment();t.canvas.innerHTML="",p.settings.editor_light_mode?t.canvas.classList.add("light-mode"):t.canvas.classList.remove("light-mode"),Se()?t.viewport&&t.viewport.classList.add("device-dark-mode"):t.viewport&&t.viewport.classList.remove("device-dark-mode"),n.forEach((c,d)=>{const u=i.width,h=i.height,g=document.createElement("div");g.className="artboard-wrapper",g.dataset.index=String(d),d===p.currentPageIndex&&g.classList.add("active-page");const m=document.createElement("div");m.className="artboard-header",m.appendChild(me("mdi-cog-outline","Page Settings",()=>{e&&e.pageSettings&&e.pageSettings.open(d)}));const y=document.createElement("span");y.className="artboard-name",y.textContent=c.name||`Page ${d+1} `,m.appendChild(y);const v=document.createElement("div");v.className="artboard-actions",d>0&&v.appendChild(me("mdi-chevron-left","Move Left",()=>{p.reorderPage(d,d-1)})),d<n.length-1&&v.appendChild(me("mdi-chevron-right","Move Right",()=>{p.reorderPage(d,d+1)})),v.appendChild(me("mdi-plus","Add Page After",()=>{p.addPage(d+1)})),v.appendChild(me("mdi-eraser","Clear Current Page",()=>{Ht({title:"Clear Page",message:`Are you sure you want to clear all widgets from < b > "${c.name||`Page ${d+1}`}"</b >? <br><br>This cannot be undone.`,confirmLabel:"Clear Page",confirmClass:"btn-danger",onConfirm:()=>{p.setCurrentPageIndex(d),p.clearCurrentPage()}})})),v.appendChild(me("mdi-delete-outline","Delete Page",()=>{Ht({title:"Delete Page",message:`Are you sure you want to delete the page <b>"${c.name||`Page ${d+1}`}"</b>?<br><br>All widgets on this page will be lost.`,confirmLabel:"Delete Page",confirmClass:"btn-danger",onConfirm:()=>{p.deletePage(d)}})})),m.appendChild(v);const f=document.createElement("div");f.className="artboard-header-container",f.style.width=u+"px",f.appendChild(m);const b=320;if(u<b){const w=u/b;m.style.width=b+"px",m.style.transform=`scale(${w})`,m.style.transformOrigin="top left",f.style.height=40*w+"px"}else m.style.width="100%",m.style.transform="none",f.style.height="auto";g.appendChild(f);const x=p.getCanvasShape(),E=x==="round"||x==="circle",S=document.createElement("div");S.className="artboard",S.dataset.index=String(d),S.style.width=`${u}px`,S.style.height=`${h}px`;const k=wn(c);if(S.classList.toggle("dark",k),S.classList.toggle("round-display",E),p.showGrid){const w=document.createElement("div");w.className="canvas-grid",S.appendChild(w)}p.showDebugGrid&&vo(S),c.layout&&/^\d+x\d+$/.test(c.layout)&&fo(S,c.layout,i,k);for(const w of c.widgets){const I=document.createElement("div");I.className="widget",I.style.left=String(w.x)+"px",I.style.top=String(w.y)+"px",I.style.width=String(w.width)+"px",I.style.height=String(w.height)+"px",I.dataset.id=w.id,I.dataset.pageIndex=String(d),p.selectedWidgetIds.includes(w.id)&&I.classList.add("active"),w.locked&&I.classList.add("locked"),w.hidden&&I.classList.add("hidden-widget");const T=(w.type||"").toLowerCase(),O=q.get(T);if(T==="group")I.classList.add("widget-group"),I.innerHTML="";else if(O&&O.render)try{const M=$e=>{if($e==="theme_auto")return k?"#ffffff":"#000000";if($e==="theme_auto_inverse")return k?"#000000":"#ffffff";const Ct=$e;return Ct?bn(Ct):k?"#ffffff":"#000000"},D=p.selectedWidgetIds.includes(w.id),B=p.settings.device_model||"reterminal_e1001",ne=H&&B in H?H[B]:null;O.render(I,w,{getColorStyle:M,selected:D,profile:ne,isDark:k});const he=w.props?.opacity;he!==void 0&&he<100&&(I.style.opacity=String(he/100))}catch{I.textContent=`Error: ${T}`,I.style.border="2px solid red"}else I.innerText=`Missing: ${T}`,I.style.color="red",I.style.border="1px dashed red";T!=="group"&&yo(I),S.appendChild(I)}g.appendChild(S),r.appendChild(g)});const s=document.createElement("div");s.className="add-page-placeholder",s.title="Click to add a new page",s.style.width=`${i.width}px`,s.style.height=`${i.height}px`,s.style.marginTop="32px",s.style.position="relative",s.style.zIndex="2000",s.style.pointerEvents="auto",s.innerHTML=`
    <div class="plus-icon">+</div>
    <div class="label">Add Page</div>
    `;const a=p.getCanvasShape();(a==="round"||a==="circle")&&s.classList.add("round-display");const l=c=>{if(_.log("[Canvas] Add Page placeholder clicked"),c.stopPropagation(),c.preventDefault(),p.addPage()){const u=p.pages.length-1;e&&e.canvas&&(e.canvas.suppressNextFocus=!0),p.setCurrentPageIndex(u)}};s.addEventListener("mousedown",c=>c.stopPropagation()),s.addEventListener("click",l),r.appendChild(s),o&&r.appendChild(o),t.canvas.appendChild(r),_n(t)}class wo{constructor(e){this.canvasInstance=e,this.topRuler=document.getElementById("rulerTop"),this.leftRuler=document.getElementById("rulerLeft"),this.container=document.querySelector(".canvas-rulers"),this.viewport=e.viewport,this.topCtx=null,this.leftCtx=null,this.indicators=null,this.init()}init(){!this.topRuler||!this.leftRuler||(this.topCtx=this.createRulerCanvas(this.topRuler),this.leftCtx=this.createRulerCanvas(this.leftRuler),this.update())}createRulerCanvas(e){const n=document.createElement("canvas");return e.appendChild(n),n.getContext("2d")}setIndicators(e){this.indicators=e,this.update()}update(){if(!p.showRulers){this.container&&(this.container.style.display="none"),this.viewport&&this.viewport.classList.remove("with-rulers");return}this.container&&(this.container.style.display="block"),this.viewport&&this.viewport.classList.add("with-rulers");const e=document.querySelector(".artboard-wrapper.active-page .artboard");if(!e||!this.topRuler||!this.leftRuler)return;const n=this.topRuler.getBoundingClientRect(),i=this.leftRuler.getBoundingClientRect(),o=e.getBoundingClientRect(),r=p.zoomLevel;this.drawHorizontal(n,o,r),this.drawVertical(i,o,r)}drawHorizontal(e,n,i){const o=this.topCtx;if(!o)return;const r=o.canvas,s=It();(r.width!==e.width*s||r.height!==e.height*s)&&(r.width=e.width*s,r.height=e.height*s,o.scale(s,s),r.style.width=e.width+"px",r.style.height=e.height+"px"),o.clearRect(0,0,e.width,e.height);const a=n.left-e.left;if(this.indicators){const d=a+this.indicators.x*i,u=(this.indicators.w||0)*i;o.fillStyle="hsla(var(--accent-h), 85%, 65%, 0.15)",o.fillRect(d,0,u,e.height),o.fillStyle="var(--accent)",o.fillRect(d,e.height-2,u,2)}o.strokeStyle="#4b5563",o.fillStyle="#9ca3af",o.font='9px "JetBrains Mono", monospace',o.lineWidth=1;const l=Math.floor(-a/i/10)*10,c=Math.ceil((e.width-a)/i/10)*10;for(let d=l;d<=c;d+=10){const u=a+d*i;if(u<0||u>e.width)continue;const h=d%100===0,g=d%50===0,m=h?12:g?8:4;o.beginPath(),o.moveTo(u,e.height),o.lineTo(u,e.height-m),o.stroke(),h&&o.fillText(d.toString(),u+2,10)}}drawVertical(e,n,i){const o=this.leftCtx;if(!o)return;const r=o.canvas,s=It();(r.width!==e.width*s||r.height!==e.height*s)&&(r.width=e.width*s,r.height=e.height*s,o.scale(s,s),r.style.width=e.width+"px",r.style.height=e.height+"px"),o.clearRect(0,0,e.width,e.height);const a=n.top-e.top;if(this.indicators){const d=a+this.indicators.y*i,u=(this.indicators.h||0)*i;o.fillStyle="hsla(var(--accent-h), 85%, 65%, 0.15)",o.fillRect(0,d,e.width,u),o.fillStyle="var(--accent)",o.fillRect(e.width-2,d,2,u)}o.strokeStyle="#4b5563",o.fillStyle="#9ca3af",o.font='9px "JetBrains Mono", monospace',o.lineWidth=1;const l=Math.floor(-a/i/10)*10,c=Math.ceil((e.height-a)/i/10)*10;for(let d=l;d<=c;d+=10){const u=a+d*i;if(u<0||u>e.height)continue;const h=d%100===0,g=d%50===0,m=h?12:g?8:4;o.beginPath(),o.moveTo(e.width,u),o.lineTo(e.width-m,u),o.stroke(),h&&(o.save(),o.translate(10,u+2),o.rotate(-Math.PI/2),o.fillText(d.toString(),0,0),o.restore())}}}function So(t){t.viewport&&(t.viewport.addEventListener("dragenter",e=>{t.dragState||(t.isExternalDragging=!0)}),t.viewport.addEventListener("dragover",e=>{e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect="copy"),t.dragState||(t.isExternalDragging=!0);const i=e.target.closest(".artboard-wrapper");document.querySelectorAll(".artboard-wrapper.drag-over").forEach(r=>{r!==i&&r.classList.remove("drag-over")}),i&&i.classList.add("drag-over");const o=e.target.closest(".add-page-placeholder");if(o)o.classList.add("drag-over");else{const r=document.querySelector(".add-page-placeholder.drag-over");r&&r.classList.remove("drag-over")}}),t.viewport.addEventListener("dragleave",e=>{(e.relatedTarget===null||!t.viewport.contains(e.relatedTarget))&&(t.isExternalDragging=!1,document.querySelectorAll(".artboard-wrapper.drag-over, .add-page-placeholder.drag-over").forEach(n=>{n.classList.remove("drag-over")}))}),t.viewport.addEventListener("drop",async e=>{e.preventDefault(),e.stopPropagation(),t.isExternalDragging=!1,document.querySelectorAll(".artboard-wrapper.drag-over, .add-page-placeholder.drag-over").forEach(u=>{u.classList.remove("drag-over")});const n=e.dataTransfer;if(!n)return;const i=n.getData("application/widget-type")||n.getData("text/plain");if(!i)return;const o=e.clientX,r=e.clientY;let s=e.target;s===t.viewport&&(s=document.elementFromPoint(o,r));const a=s instanceof HTMLElement?s.closest(".artboard-wrapper"):null,l=s instanceof HTMLElement?s.closest(".add-page-placeholder"):null;let c=-1,d=null;if(a instanceof HTMLElement){c=parseInt(a.dataset.index||"-1",10);const u=a.querySelector(".artboard");u&&(d=u.getBoundingClientRect())}else if(l instanceof HTMLElement)c=p.pages.length;else{c=p.currentPageIndex;const u=t.canvas.querySelector(`.artboard[data-index="${c}"]`);u&&(d=u.getBoundingClientRect())}_.log("[Canvas] Atomic drop capture - type:",i,"page:",c);try{const u=q.load(i);if(l){if(!p.addPage())return;c=p.pages.length-1,await new Promise(f=>setTimeout(f,50));const v=t.canvas.querySelector(`.artboard[data-index="${c}"]`);v&&(d=v.getBoundingClientRect())}await u;const h=j.createWidget(i);if(!h){_.error("[Canvas] WidgetFactory.createWidget returned null for type:",i);return}const g=p.zoomLevel,m=p.getCanvasDimensions();if(d){const y=(o-d.left)/g,v=(r-d.top)/g;h.x=Math.round(y-h.width/2),h.y=Math.round(v-h.height/2)}else _.warn("[Canvas] No targetRect, using fallback position"),h.x=40,h.y=40;h.x=Math.max(0,Math.min(m.width-h.width,h.x)),h.y=Math.max(0,Math.min(m.height-h.height,h.y)),t.suppressNextFocus=!0,p.addWidget(h,c),p.currentPageIndex!==c&&p.setCurrentPageIndex(c),p.selectWidget(h.id,!1),_.log(`[Canvas] Successfully added ${i} at (${h.x}, ${h.y})`)}catch(u){_.error("[Canvas] error creating widget from drop:",u)}}))}function Eo(t){t.viewport&&t.viewport.addEventListener("mousedown",e=>{if(e.button===1){e.preventDefault(),e.stopPropagation(),t.panState={startX:e.clientX,startY:e.clientY,startPanX:t.panX,startPanY:t.panY},t.viewport.style.cursor="grabbing",document.body.classList.add("panning-active");const n=o=>{if(t.panState){const r=o.clientX-t.panState.startX,s=o.clientY-t.panState.startY;t.panX=t.panState.startPanX+r,t.panY=t.panState.startPanY+s,te(t)}},i=()=>{t.panState=null,t.viewport.style.cursor="auto",document.body.classList.remove("panning-active"),Y("mousemove",n),Y("mouseup",i)};G("mousemove",n),G("mouseup",i)}})}function Co(t){const e=document.getElementById("zoomInBtn"),n=document.getElementById("zoomOutBtn"),i=document.getElementById("zoomResetBtn"),o=document.getElementById("gridToggleBtn"),r=document.getElementById("debugGridToggleBtn"),s=document.getElementById("rulersToggleBtn"),a=document.getElementById("editorGridOpacity");e&&e.addEventListener("click",()=>rt(t)),n&&n.addEventListener("click",()=>st(t)),i&&i.addEventListener("click",()=>He(t)),o&&(o.classList.toggle("active",!!p.showGrid),o.addEventListener("click",()=>{const l=!p.showGrid;p.setShowGrid(l),l&&(p.setShowDebugGrid(!1),r&&r.classList.remove("active")),o.classList.toggle("active",l),L(C.STATE_CHANGED)})),r&&(r.classList.toggle("active",!!p.showDebugGrid),r.addEventListener("click",()=>{const l=!p.showDebugGrid;p.setShowDebugGrid(l),l&&(p.setShowGrid(!1),o&&o.classList.remove("active")),r.classList.toggle("active",l),L(C.STATE_CHANGED)})),s&&(s.classList.toggle("active",!!p.showRulers),s.addEventListener("click",()=>{const l=!p.showRulers;p.setShowRulers(l),s.classList.toggle("active",l),_.log(`[Canvas] Rulers toggled: ${l}`)})),a&&a.addEventListener("input",l=>{const c=l.target;p.updateSettings({grid_opacity:parseInt(c.value,10)})}),t.canvasContainer&&t.canvasContainer.addEventListener("wheel",l=>{l.preventDefault(),Gt(l,t)},{passive:!1}),t.viewport&&t.viewport.addEventListener("wheel",l=>{l.preventDefault(),Gt(l,t)},{passive:!1}),document.addEventListener("keydown",l=>{l.ctrlKey&&(l.key==="+"||l.key==="=")?(l.preventDefault(),rt(t)):l.ctrlKey&&l.key==="-"?(l.preventDefault(),st(t)):l.ctrlKey&&l.key==="0"||l.ctrlKey&&l.key.toLowerCase()==="r"?(l.preventDefault(),He(t)):l.ctrlKey&&l.key.toLowerCase()==="g"&&(l.preventDefault(),l.shiftKey?p.ungroupSelection():p.groupSelection())})}function Gt(t,e){const n=p.zoomLevel;let i=0;if(t.ctrlKey)i=t.deltaY>0?-.02:.02;else if(t.deltaMode===0&&t.deltaX===0&&Math.abs(t.deltaY)>=50)i=t.deltaY>0?-.05:.05;else{e.panX-=t.deltaX,e.panY-=t.deltaY,te(e);return}if(i===0)return;const o=Math.min(Math.max(n+i,.1),5);if(o===n)return;const r=e.viewport.getBoundingClientRect(),s=t.clientX-r.left,a=t.clientY-r.top,l=(s-e.panX)/n,c=(a-e.panY)/n;e.panX=s-l*o,e.panY=a-c*o,p.setZoomLevel(o),te(e)}function rt(t){Sn(.05,t)}function st(t){Sn(-.05,t)}function Sn(t,e){const n=p.zoomLevel,i=Math.min(Math.max(n+t,.1),5);if(i!==n){if(e&&e.viewport){const o=e.viewport.getBoundingClientRect(),r=o.width/2,s=o.height/2,a=(r-e.panX)/n,l=(s-e.panY)/n;e.panX=r-a*i,e.panY=s-l*i}p.setZoomLevel(i),e&&te(e)}}function He(t){p.setZoomLevel(1),t.focusPage(p.currentPageIndex,!0)}function ee(){document.querySelectorAll(".snap-guide").forEach(e=>e.remove())}function En(t,e,n){const i=n||(t?t.canvas:null);if(!i||typeof i.appendChild!="function")return;const o=document.createElement("div");o.className="snap-guide snap-guide-vertical",o.style.left=`${Math.round(e)}px`,i.appendChild(o)}function Cn(t,e,n){const i=n||(t?t.canvas:null);if(!i||typeof i.appendChild!="function")return;const o=document.createElement("div");o.className="snap-guide snap-guide-horizontal",o.style.top=`${Math.round(e)}px`,i.appendChild(o)}function kn(t,e){const n=p.getCurrentPage(),i=[],o=[];if(i.push(0,e.width/2,e.width),o.push(0,e.height/2,e.height),n&&Array.isArray(n.widgets))for(const r of n.widgets){if(!r||r.id===t)continue;const s=r.x,a=r.x+(r.width||0),l=r.y,c=r.y+(r.height||0),d=s+(r.width||0)/2,u=l+(r.height||0)/2;i.push(s,d,a),o.push(l,u,c)}return{vertical:i,horizontal:o}}function Bt(t,e,n,i,o){const r=o||(t?t.canvas:null);if(!r)return;const s=document.createElement("div");s.className=`snap-guide distance-marker distance-marker-${i}`;let a,l,c,d,u;if(i==="h"){const g=e.x<n.x?e.x+e.w:n.x+n.w,m=e.x<n.x?n.x:e.x;if(a=g,l=Math.min(e.y+e.h/2,n.y+n.h/2),c=m-g,c<=0)return;u=Math.round(c),s.style.left=`${a}px`,s.style.top=`${l}px`,s.style.width=`${c}px`,s.style.height="1px";const y=document.createElement("div");y.className="distance-marker-h-tick-start";const v=document.createElement("div");v.className="distance-marker-h-tick-end",s.appendChild(y),s.appendChild(v)}else{const g=e.y<n.y?e.y+e.h:n.y+n.h,m=e.y<n.y?n.y:e.y;if(l=g,a=Math.min(e.x+e.w/2,n.x+n.w/2),d=m-g,d<=0)return;u=Math.round(d),s.style.left=`${a}px`,s.style.top=`${l}px`,s.style.width="1px",s.style.height=`${d}px`;const y=document.createElement("div");y.className="distance-marker-v-tick-start";const v=document.createElement("div");v.className="distance-marker-v-tick-end",s.appendChild(y),s.appendChild(v)}const h=document.createElement("div");h.className="distance-marker-label",h.textContent=String(u),s.appendChild(h),r.appendChild(s)}function ft(t,e,n,i,o,r,s,a=!1){if(!p.snapEnabled||o)return ee(),{x:Math.round(n),y:Math.round(i)};const d=(p.getCurrentPage()?.widgets||[]).filter(w=>w.id!==e.id&&!w.hidden),u=kn(e.id,r),h=e.width||0,g=e.height||0;let m=n,y=i,v=null,f=null;const b=[{val:n,apply:w=>m=w},{val:n+h/2,apply:w=>m=w-h/2},{val:n+h,apply:w=>m=w-h}];let x=le+1;for(const w of b)for(const I of u.vertical){const T=Math.abs(w.val-I);T<=le&&T<x&&(x=T,v=I,w.apply(I))}const E=[{val:i,apply:w=>y=w},{val:i+g/2,apply:w=>y=w-g/2},{val:i+g,apply:w=>y=w-g}];let S=le+1;for(const w of E)for(const I of u.horizontal){const T=Math.abs(w.val-I);T<=le&&T<S&&(S=T,f=I,w.apply(I))}const k={x:m,y,w:h,h:g};return ee(),v!=null&&En(t,v,s),f!=null&&Cn(t,f,s),a&&d.forEach(w=>{const I={x:w.x,y:w.y,w:w.width,h:w.height};if(k.y<I.y+I.h&&k.y+k.h>I.y){const M=k.x<I.x?I.x-(k.x+k.w):k.x-(I.x+I.w);M>0&&M<150&&Bt(t,k,I,"h",s)}if(k.x<I.x+I.w&&k.x+k.w>I.x){const M=k.y<I.y?I.y-(k.y+k.h):k.y-(I.y+I.h);M>0&&M<150&&Bt(t,k,I,"v",s)}}),{x:Math.round(m),y:Math.round(y)}}function yt(t,e,n,i,o,r){const s=o.match(/^(\d+)x(\d+)$/);if(!s)return{x:t,y:e};const a=parseInt(s[1],10),l=parseInt(s[2],10),c=r.width/l,d=r.height/a,u=t+n/2,h=e+i/2,g=Math.round(u/c-.5),m=Math.round(h/d-.5),y=Math.max(0,Math.min(l-1,g)),v=Math.max(0,Math.min(a-1,m));return{x:Math.round(y*c),y:Math.round(v*d)}}function In(t){const e=p.getCurrentPage();if(!e||!e.layout)return;const n=e.layout.match(/^(\d+)x(\d+)$/);if(!n)return;const i=p.getWidgetById(t);if(!i)return;const o=parseInt(n[1],10),r=parseInt(n[2],10),s=p.getCanvasDimensions(),a=s.width/r,l=s.height/o,c=i.x+i.width/2,d=i.y+i.height/2,u=Math.floor(c/a),h=Math.floor(d/l),g=Math.max(0,Math.min(o-1,h)),m=Math.max(0,Math.min(r-1,u)),y={...i.props,grid_cell_row_pos:g,grid_cell_column_pos:m},v=Math.max(1,Math.round(i.height/l)),f=Math.max(1,Math.round(i.width/a));y.grid_cell_row_span=v,y.grid_cell_column_span=f,p.updateWidget(t,{props:y})}function ko(t){const e=p.getWidgetById(t);if(!e)return;const n=p.getCanvasDimensions(),i=p.getCurrentPage();let o;if(i?.layout)o=yt(e.x,e.y,e.width,e.height,i.layout,n);else{const r=p.snapEnabled;typeof p.setSnapEnabled=="function"&&p.setSnapEnabled(!0),o=ft({canvas:{querySelectorAll:()=>[]},canvasContainer:document.createElement("div")},e,e.x,e.y,!1,n),typeof p.setSnapEnabled=="function"&&p.setSnapEnabled(r)}o&&(p.updateWidget(t,{x:o.x,y:o.y}),In(t),p.recordHistory())}function Oe(t,e,n,i,o,r){if(!p.snapEnabled||i)return t;const s=kn(n,o),a=e==="v"?s.vertical:s.horizontal;let l=le+1,c=t,d=null;for(const u of a){const h=Math.abs(t-u);h<=le&&h<l&&(l=h,c=u,d=u)}return d!==null&&(e==="v"?En({canvas:r},d,r):Cn({canvas:r},d,r)),c}class Io{constructor(){this.active=!1,this.element=null,this.targetWidgetId=null,this.position={x:0,y:0},this.init()}init(){this.element||(this.element=document.createElement("div"),this.element.className="radial-menu",this.element.innerHTML=`
                <div class="radial-menu-center"></div>
                <div class="radial-menu-items"></div>
            `,V(this.element),G("mousedown",e=>{this.active&&e.target instanceof Node&&!this.element.contains(e.target)&&this.hide()},!0),G("touchstart",e=>{this.active&&e.target instanceof Node&&!this.element.contains(e.target)&&this.hide()},!0),document.addEventListener("contextmenu",e=>{!this.active||!(e.target instanceof HTMLElement)||this.element.contains(e.target)||e.target.closest("#canvas")||this.hide()},!0),G("keydown",e=>{e.key==="Escape"&&this.active&&this.hide()}))}show(e,n,i=null){this.targetWidgetId=i,this.position={x:e,y:n},this.active=!0,this.element.style.left=`${e}px`,this.element.style.top=`${n}px`,this.renderItems(),requestAnimationFrame(()=>{this.element.classList.add("active")})}hide(){this.active=!1,this.element.classList.remove("active"),this.targetWidgetId=null}renderItems(){const e=this.element.querySelector(".radial-menu-items");e.innerHTML="";const n=this.getAvailableActions(),i=2*Math.PI/n.length,o=70;n.forEach((r,s)=>{const a=s*i-Math.PI/2,l=Math.cos(a)*o,c=Math.sin(a)*o,d=document.createElement("div");d.className=`radial-menu-item ${r.className||""}`,d.style.setProperty("--x",`${l}px`),d.style.setProperty("--y",`${c}px`),d.title=r.label,d.innerHTML=`<i class="mdi ${r.icon}"></i>`,d.addEventListener("click",u=>{u.stopPropagation(),r.callback(),this.hide()}),e.appendChild(d)})}getAvailableActions(){const e=p,n=this.targetWidgetId?e.getWidgetById(this.targetWidgetId):null,i=[];if(n){i.push({label:"Copy",icon:"mdi-content-copy",callback:()=>{e.selectWidget(this.targetWidgetId,!1),e.copyWidget()}});const o=e.selectedWidgetIds,r=o.some(l=>{const c=e.getWidgetById(l);return c&&(c.type==="group"||c.parentId)});o.length>1&&!r&&i.push({label:"Group",icon:"mdi-group",callback:()=>e.groupSelection()}),(n.type==="group"||n.parentId)&&i.push({label:"Ungroup",icon:"mdi-ungroup",callback:()=>e.ungroupSelection(this.targetWidgetId)}),i.push({label:"Duplicate",icon:"mdi-content-duplicate",callback:()=>{e.copyWidget(),e.pasteWidget()}}),i.push({label:n.locked?"Unlock":"Lock",icon:n.locked?"mdi-lock-open-outline":"mdi-lock-outline",callback:()=>{e.updateWidget(this.targetWidgetId,{locked:!n.locked})}}),i.push({label:"Snap",icon:"mdi-magnet",callback:()=>{ko(this.targetWidgetId)}}),i.push({label:"Delete",icon:"mdi-delete-outline",className:"danger",callback:()=>{e.deleteWidget(this.targetWidgetId)}});const s=e.getCurrentPage(),a=s?.widgets.findIndex(l=>l.id===this.targetWidgetId);a!==-1&&(i.push({label:"Bring to Front",icon:"mdi-arrange-bring-to-front",callback:()=>{e.reorderWidget(e.currentPageIndex,a,s.widgets.length-1)}}),i.push({label:"Send to Back",icon:"mdi-arrange-send-to-back",callback:()=>{e.reorderWidget(e.currentPageIndex,a,0)}}))}else i.push({label:"Paste",icon:"mdi-content-paste",callback:()=>{e.pasteWidget()}});return i}}const Q=new Io;function Lo(t,e,n,i,o,r){at(t);const s=document.createElement("div");s.className="drag-ghost-container",s.style.cssText=`
        position: fixed;
        pointer-events: none;
        z-index: 99999;
        opacity: 1.0; 
        transform-origin: top left;
        transform: scale(${o});
        transition: none;
    `;const a=t.dragState?.id,l=r.find(m=>m.id===a)||r[0],c=e.find(m=>m.id===l?.id)||e[0],d=document.querySelector(`.widget[data-id="${c.id}"]`);if(!c||!d)return;const u=[],h=p.getCurrentPage();e.forEach(m=>{if(u.push(m),m.type==="group"){const v=(h?.widgets||[]).filter(f=>f.parentId===m.id);u.push(...v)}}),u.map(m=>{const y=document.querySelector(`.widget[data-id="${m.id}"]`);if(!y)return null;const v=y.closest(".artboard"),f=ni(y);return f?{widget:m,className:(v?v.className:"artboard")+" ghost-context-sim",attrs:Array.from(y.attributes).map(b=>({name:b.name,value:b.value})),styleCssText:y.style.cssText,innerHTML:y.innerHTML,background:f.background,backgroundColor:f.backgroundColor,border:f.border,borderRadius:f.borderRadius}:null}).filter(m=>m!==null).forEach(m=>{const y=document.createElement("div");y.className=m.className,y.style.cssText=`
                position: absolute;
                left: ${m.widget.x-c.x}px;
                top: ${m.widget.y-c.y}px;
                width: ${m.widget.width}px;
                height: ${m.widget.height}px;
                pointer-events: none;
                background: transparent !important;
                box-shadow: none !important;
                border: none !important;
                transform: none !important;
                overflow: visible;
                display: block;
            `;const v=document.createElement("div");m.attrs.forEach(f=>{v.setAttribute(f.name,f.value)}),v.classList.remove("active","dragging-source","locked"),v.classList.add("drag-ghost-widget"),v.style.cssText=m.styleCssText,v.style.position="absolute",v.style.top="0",v.style.left="0",v.style.margin="0",v.style.transform="none",v.style.setProperty("background",m.background,"important"),v.style.setProperty("background-color",m.backgroundColor,"important"),v.style.setProperty("border",m.border,"important"),v.style.setProperty("border-radius",m.borderRadius,"important"),v.innerHTML=m.innerHTML,y.appendChild(v),s.appendChild(y)}),l&&(t.dragGhostOffset={x:l.clickOffsetX*o,y:l.clickOffsetY*o}),V(s),t.dragGhostEl=s,Po(t,n,i),e.forEach(m=>{const y=document.querySelector(`.widget[data-id="${m.id}"]`);y&&y.classList.add("dragging-source")})}function Po(t,e,n){if(!t.dragGhostEl||!t.dragGhostOffset)return;const i=t.dragGhostOffset,o=e-i.x,r=n-i.y;t.dragGhostEl.style.left=o+"px",t.dragGhostEl.style.top=r+"px"}function To(t,e,n){t.dragGhostEl&&(t.dragGhostEl.style.left=e+"px",t.dragGhostEl.style.top=n+"px")}function at(t){t.dragGhostEl&&(t.dragGhostEl.remove(),t.dragGhostEl=null,t.dragGhostOffset=null),document.querySelectorAll(".widget.dragging-source").forEach(e=>{e.classList.remove("dragging-source")})}function Mo(t,e,n,i){const o=t.canvas.querySelector(`.artboard-wrapper[data-index="${e}"]`);if(!o)return;const r=o.querySelector(".artboard-header");if(!r)return;const s=r.cloneNode(!0);s.classList.add("page-drag-ghost");const a=r.getBoundingClientRect(),l=n-a.left,c=i-a.top;s.style.cssText=`
        position: fixed;
        left: ${n}px;
        top: ${i}px;
        width: ${a.width}px;
        pointer-events: none;
        z-index: 100000;
        opacity: 0.9;
        box-shadow: 0 12px 40px rgba(0,0,0,0.5);
        border: 2px solid var(--accent);
        border-radius: 10px;
        background: var(--bg-surface);
        transform: translate(-${l}px, -${c}px) scale(1.05);
        transition: none;
    `,V(s),t.pageDragGhost=s,t.pageDragOffset={x:l,y:c},o.classList.add("reordering")}function Ao(t,e,n){t.pageDragGhost&&(t.pageDragGhost.style.left=e+"px",t.pageDragGhost.style.top=n+"px")}function Oo(t,e){t.pageDragGhost&&(t.pageDragGhost.remove(),t.pageDragGhost=null);const n=t.canvas.querySelector(`.artboard-wrapper[data-index="${e}"]`);n&&n.classList.remove("reordering")}function Do(t,e){const n=p.getWidgetById(e);if(!n)return;const i=(n.type||"").toLowerCase();if(i!=="text"&&i!=="label")return;const o=t.canvas.querySelector(`.widget[data-id="${e}"]`);if(!o)return;const r=p.zoomLevel,s=o.getBoundingClientRect(),a=ti(),l=document.createElement("textarea");l.value=n.props.text||n.title||"",l.style.position="absolute",l.style.left=s.left+a.x+"px",l.style.top=s.top+a.y+"px",l.style.width=Math.max(50,s.width)+"px",l.style.height=Math.max(30,s.height)+"px",l.style.zIndex="99999";const c=n.props||{},d=(c.font_size||20)*r;l.style.fontSize=d+"px",l.style.fontFamily=(c.font_family||"Roboto")+", sans-serif",l.style.fontWeight=c.font_weight||400,l.style.fontStyle=c.italic?"italic":"normal",l.style.textAlign=(c.text_align||"LEFT").split("_").pop().toLowerCase(),l.style.color=c.color||"black",l.style.background="rgba(255, 255, 255, 0.9)",l.style.border="1px solid #1a73e8",l.style.padding="0px",l.style.resize="both",l.style.outline="none",l.style.overflow="hidden",l.style.lineHeight="1.2",document.body.appendChild(l),l.focus(),l.select();const u=()=>{if(!l.isConnected&&!l.parentElement)return;l.removeEventListener("blur",h),l.removeEventListener("keydown",g);const m=l.value;m!==(n.props.text||n.title)&&p.updateWidget(e,{props:{...n.props,text:m}}),l.remove()};function h(){u()}function g(m){m.key==="Enter"&&!m.shiftKey&&(m.preventDefault(),u()),m.key==="Escape"&&l.remove(),l.style.height=l.scrollHeight+"px"}l.addEventListener("blur",h),l.addEventListener("keydown",g)}function Ho(t,e){const n=p.zoomLevel,i=p.getCanvasDimensions();if(e.dragState){if(e.dragState.mode==="move"){const o=document.querySelector(`.artboard[data-index="${p.currentPageIndex}"]`);if(!o)return;const r=(t.clientX-e.dragState.dragStartX)/n+(e.dragState.dragStartPanX-e.panX)/n,s=(t.clientY-e.dragState.dragStartY)/n+(e.dragState.dragStartPanY-e.panY)/n,a=p.getWidgetById(e.dragState.id);if(!a)return;const l=e.dragState.widgets,c=l.find(b=>b.id===e.dragState.id);if(!c)return;let d=c.startX+r,u=c.startY+s;const h=p.getCurrentPage();if(h?.layout&&!t.altKey){ee();const b=yt(d,u,a.width,a.height,h.layout,i);d=b.x,u=b.y}else if(p.snapEnabled&&!t.altKey){const b=ft(e,a,d,u,t.altKey,i,o,t.ctrlKey);d=b.x,u=b.y}else ee();const g=o.getBoundingClientRect(),m=g.left+d*n,y=g.top+u*n;To(e,m,y);const v=d-c.startX,f=u-c.startY;for(const b of l){const x=p.getWidgetById(b.id);x&&!x.locked&&(x.x=b.startX+v,x.y=b.startY+f,x.type==="group"&&(h.widgets||[]).filter(k=>k.parentId===x.id).forEach(k=>{l.find(w=>w.id===k.id)||(k.x+=v-(e.dragState.lastDx||0),k.y+=f-(e.dragState.lastDy||0))}))}e.dragState.lastDx=v,e.dragState.lastDy=f,e.rulers&&e.rulers.setIndicators({x:d,y:u,w:a.width,h:a.height})}else if(e.dragState.mode==="resize"){const o=p.getWidgetById(e.dragState.id);if(!o)return;ee();const r=e.dragState,s=r.handle,a=(r.dragStartPanX-e.panX)/n,l=(r.dragStartPanY-e.panY)/n,c=(t.clientX-r.startX)/n+a,d=(t.clientY-r.startY)/n+l;let u=r.startWidgetX,h=r.startWidgetY,g=r.startW,m=r.startH;if(s.includes("l")){const f=r.startWidgetX+c;u=Oe(f,"v",o.id,t.altKey,i,r.artboardEl),g=r.startWidgetX+r.startW-u}else if(s.includes("r")){const f=r.startWidgetX+r.startW+c;g=Oe(f,"v",o.id,t.altKey,i,r.artboardEl)-r.startWidgetX}if(s.includes("t")){const f=r.startWidgetY+d;h=Oe(f,"h",o.id,t.altKey,i,r.artboardEl),m=r.startWidgetY+r.startH-h}else if(s.includes("b")){const f=r.startWidgetY+r.startH+d;m=Oe(f,"h",o.id,t.altKey,i,r.artboardEl)-r.startWidgetY}const y=4;isNaN(g)&&(g=r.startW),isNaN(m)&&(m=r.startH),g<y&&(s.includes("l")&&(u=r.startWidgetX+r.startW-y),g=y),m<y&&(s.includes("t")&&(h=r.startWidgetY+r.startH-y),m=y);const v=(o.type||"").toLowerCase();if(v==="line"||v==="lvgl_line"){const f=o.props||{},b=f.orientation||"horizontal",x=parseInt(f.stroke_width||f.line_width||3,10);b==="vertical"?(g=x,m=Math.max(10,m)):(m=x,g=Math.max(10,g))}if(u=Math.max(0,Math.min(i.width-g,u)),h=Math.max(0,Math.min(i.height-m,h)),o.x=Math.round(u),o.y=Math.round(h),o.width=Math.round(g),o.height=Math.round(m),v==="icon"||v==="weather_icon"||v==="battery_icon"||v==="wifi_signal"||v==="ondevice_temperature"||v==="ondevice_humidity"){const f=o.props||{};if(f.fit_icon_to_frame){const x=Math.max(8,Math.min(o.width-8,o.height-8));f.size=Math.round(x)}else{const b=Math.max(8,Math.min(o.width,o.height));f.size=Math.round(b)}}else if(v==="shape_circle"){const f=Math.max(o.width,o.height);o.width=f,o.height=f}xo(e,o),e.rulers&&e.rulers.setIndicators({x:o.x,y:o.y,w:o.width,h:o.height})}else if(e.dragState.mode==="reorder-page"){Ao(e,t.clientX,t.clientY),document.querySelectorAll(".artboard-wrapper").forEach(s=>s.classList.remove("drag-over"));const o=document.elementFromPoint(t.clientX,t.clientY),r=o instanceof HTMLElement?o.closest(".artboard-wrapper"):null;r instanceof HTMLElement&&parseInt(r.dataset.index||"-1",10)!==e.dragState.pageIndex&&r.classList.add("drag-over")}}else if(e.lassoState){const o=e.lassoState.artboardEl;if(!o)return;const r=o.getBoundingClientRect(),s=(t.clientX-r.left)/n,a=(t.clientY-r.top)/n,l=Math.min(e.lassoState.startX,s),c=Math.min(e.lassoState.startY,a),d=Math.abs(s-e.lassoState.startX),u=Math.abs(a-e.lassoState.startY);e.lassoState.rect={x:l,y:c,w:d,h:u},e.lassoEl&&(e.lassoEl.style.left=l+"px",e.lassoEl.style.top=c+"px",e.lassoEl.style.width=d+"px",e.lassoEl.style.height=u+"px");const h=p.getCurrentPage();if(h){const g=new Set(e.lassoState.isAdditive?e.lassoState.initialSelection:[]);e.lassoState.currentSelection=[];const m={x1:l,y1:c,x2:l+d,y2:c+u};for(const y of h.widgets){const v={x1:y.x,y1:y.y,x2:y.x+y.width,y2:y.y+y.height},f=!(v.x2<m.x1||v.x1>m.x2||v.y2<m.y1||v.y1>m.y2),b=e.canvas.querySelector(`.widget[data-id="${y.id}"]`);b&&(f?(b.classList.add("active"),g.add(y.id)):e.lassoState.isAdditive&&e.lassoState.initialSelection.includes(y.id)?b.classList.add("active"):b.classList.remove("active"))}e.lassoState.currentSelection=Array.from(g),p.selectWidgets(e.lassoState.currentSelection)}t.preventDefault(),t.stopPropagation()}}function Go(t,e){if(e.dragState){const n=e.dragState.id,i=e.dragState.mode;if(i==="move"){const s=e.canvas.querySelector(`.widget[data-id="${n}"]`),a=s?s.style.pointerEvents:"";s&&(s.style.pointerEvents="none");const l=document.elementFromPoint(t.clientX,t.clientY);s&&(s.style.pointerEvents=a);const c=l?.closest(".artboard"),d=l?.closest(".add-page-placeholder"),u=p.currentPageIndex;let h=-1;if(c)h=parseInt(c.dataset.index||"0",10);else if(d){e.suppressNextFocus=!0;const g=p.pages.length;p.addPage(g)&&(h=g)}else{const g=l?.closest("#pageList .item");if(g){const m=document.getElementById("pageList");if(!m)return;h=Array.from(m.querySelectorAll(".item")).indexOf(g)}}if(h!==-1&&h!==u){const g=e.dragState.widgets;d&&de(e);const m=e.canvas.querySelector(`.artboard[data-index="${h}"]`);let y=0;Y("mousemove",e._boundMouseMove),Y("mouseup",e._boundMouseUp),at(e),e.dragState=null,ee();const v=m?m.getBoundingClientRect():null,f=p.zoomLevel,b=p.getCanvasDimensions(),x=new Set(g.map(S=>S.id));if(g.filter(S=>{const k=p.getWidgetById(S.id);return!k.parentId||!x.has(k.parentId)}).forEach(S=>{let k=S.startX,w=S.startY;if(v){const I=p.getWidgetById(S.id);k=Math.round((t.clientX-v.left)/f-S.clickOffsetX),w=Math.round((t.clientY-v.top)/f-S.clickOffsetY);const T=I?.width||50,O=I?.height||50;k=Math.max(0,Math.min(b.width-T,k)),w=Math.max(0,Math.min(b.height-O,w))}else d&&(k=40,w=40);p.moveWidgetToPage(S.id,h,k,w)&&y++}),y>0){const S=!c&&!d;p.setCurrentPageIndex(h,{suppressFocus:!S}),de(e);return}}}else if(i==="reorder-page"){const s=e.dragState.pageIndex,l=document.elementFromPoint(t.clientX,t.clientY)?.closest(".artboard-wrapper");if(Oo(e,s),document.querySelectorAll(".artboard-wrapper").forEach(c=>c.classList.remove("drag-over")),l){const c=parseInt(l.dataset.index||"0",10);c!==s&&p.reorderPage(s,c)}}Y("mousemove",e._boundMouseMove),Y("mouseup",e._boundMouseUp),at(e);const o=p.getCanvasDimensions();(e.dragState?.widgets||[]).forEach(s=>{const a=p.getWidgetById(s.id);a&&!a.locked&&(a.x=Math.max(0,Math.min(o.width-a.width,a.x)),a.y=Math.max(0,Math.min(o.height-a.height,a.y)))}),e.dragState=null,e.rulers&&e.rulers.setIndicators(null),ee(),In(n),p.recordHistory(),L(C.STATE_CHANGED),de(e)}else if(e.lassoState){Y("mousemove",e._boundMouseMove),Y("mouseup",e._boundMouseUp);const n=e.lassoState;if(e.lassoEl&&(e.lassoEl.remove(),e.lassoEl=null),e.lassoState=null,n.rect){const i=n.currentSelection||[];p.selectWidgets(i)}else n.isAdditive||p.selectWidgets([]),n.focusParams?.fitZoom&&ze(e,p.currentPageIndex,!0,!0);de(e),t.preventDefault(),t.stopPropagation()}}let qe=0,Ve=null,Rt=0,Wt=null;function Bo(t){if(!(t instanceof HTMLElement)||t.closest("input, textarea, select, option, button, [contenteditable='true']"))return;const e=document.activeElement;!(e instanceof HTMLElement)||e===document.body||e.blur()}function Ro(t){if(!(t instanceof HTMLElement)||t.closest("input, textarea, select, option, button, [contenteditable='true']"))return;const e=t.closest("#canvas")||document.getElementById("canvas");if(e instanceof HTMLElement){e.hasAttribute("tabindex")||(e.tabIndex=-1);try{e.focus({preventScroll:!0})}catch{e.focus()}}}function Wo(t){return!!(t.pinchState||t.touchState?.hasMoved||t.dragState?.mode==="resize"||t.lassoState?.rect)}function No(t){const e=t instanceof HTMLElement?t:null;if(!e)return{shouldShow:!1,widgetId:null};if(e.closest("input, textarea, select, option, button, [contenteditable='true']"))return{shouldShow:!1,widgetId:null};if(!e.closest(".artboard, .widget"))return{shouldShow:!1,widgetId:null};const i=e.closest(".widget");return{shouldShow:!0,widgetId:i instanceof HTMLElement&&i.dataset.id||null}}function Fo(t){t.canvas.addEventListener("mousedown",n=>{if(n.button!==0)return;ee();const i=n.target;Bo(i),Ro(i);const o=i.closest(".artboard-wrapper");if(!o||i.closest(".artboard-btn")||i.closest("button")){!i.closest("button")&&!i.closest(".artboard-btn")&&(p.selectWidgets([]),de(t));return}const r=parseInt(o.dataset.index||"0",10),s=o.querySelector(".artboard");let a=s;const l=i.closest(".widget");let c=l instanceof HTMLElement?l.dataset.id:void 0;const d=p.currentPageIndex!==r,u=!!i.closest(".artboard-header");if(i.closest(".artboard"),d){const m=[...p.selectedWidgetIds];p.setCurrentPageIndex(r,{suppressFocus:!0}),c&&p.selectWidgets(m.includes(c)?m:[c]);const y=t.canvas.querySelector(`.artboard[data-index="${r}"]`);y&&(a=y)}else if(u){t.dragState={mode:"reorder-page",pageIndex:r,startX:n.clientX,startY:n.clientY},Mo(t,r,n.clientX,n.clientY),G("mousemove",t._boundMouseMove),G("mouseup",t._boundMouseUp),n.preventDefault();return}if(!a)return;const h=a.getBoundingClientRect(),g=p.zoomLevel;if(l instanceof HTMLElement){const m=l.dataset.id;if(!m)return;const y=n.shiftKey||n.ctrlKey,v=Date.now();if(m===Ve&&v-qe<300){Do(t,m),qe=0,Ve=null,n.preventDefault(),n.stopPropagation();return}qe=v,Ve=m,y?p.selectWidget(m,!0):p.selectedWidgetIds.includes(m)||p.selectWidget(m,!1);const f=p.getWidgetById(m);if(!f)return;let b=f,x=m;if(f.parentId){const S=p.getWidgetById(f.parentId);S&&(b=S,x=S.id,p.selectWidget(x,y))}if(i.classList.contains("widget-resize-handle")){if(f.parentId||b.locked)return;t.dragState={mode:"resize",handle:i.dataset.handle||"br",id:x,startX:n.clientX,startY:n.clientY,startW:b.width,startH:b.height,startWidgetX:b.x,startWidgetY:b.y,artboardEl:a,dragStartPanX:t.panX,dragStartPanY:t.panY}}else{if(b.locked)return;const S=p.getSelectedWidgets(),k=S.map(w=>({id:w.id,startX:w.x,startY:w.y,clickOffsetX:(n.clientX-h.left)/g-w.x,clickOffsetY:(n.clientY-h.top)/g-w.y}));t.dragState={mode:"move",id:x,widgets:k,artboardEl:a,dragStartX:n.clientX,dragStartY:n.clientY,dragStartPanX:t.panX,dragStartPanY:t.panY},Lo(t,S,n.clientX,n.clientY,g,k),t.rulers&&t.rulers.setIndicators({x:b.x,y:b.y,w:b.width,h:b.height})}G("mousemove",t._boundMouseMove),G("mouseup",t._boundMouseUp),n.preventDefault()}else{const m=(n.clientX-h.left)/g,y=(n.clientY-h.top)/g,v=Date.now(),f=r===Wt&&v-Rt<300;Rt=v,Wt=r,t.lassoState={startTime:v,isDoubleClick:f,focusParams:f||d&&!c?{index:r,fitZoom:f}:null,startX:m,startY:y,rect:null,isAdditive:n.shiftKey||n.ctrlKey,initialSelection:[...p.selectedWidgetIds],artboardEl:a},t.lassoEl=document.createElement("div"),t.lassoEl.className="lasso-selection",s&&s.appendChild(t.lassoEl),G("mousemove",t._boundMouseMove),G("mouseup",t._boundMouseUp),n.preventDefault()}}),t.canvas.addEventListener("contextmenu",n=>{if(Wo(t)){n.preventDefault(),Q?.active&&Q.hide();return}const{shouldShow:i,widgetId:o}=No(n.target);if(!i){Q?.active&&Q.hide();return}Q&&(n.preventDefault(),n.stopPropagation(),Q.show(n.clientX,n.clientY,o||void 0))});let e=document.querySelector(".debug-cursor-tooltip");e||(e=document.createElement("div"),e.className="debug-cursor-tooltip",V(e)),t.canvas.addEventListener("mousemove",n=>{if(!p.showDebugGrid){e&&(e.style.display="none");return}const i=n.target.closest(".artboard");if(!i){e&&(e.style.display="none");return}const o=i.getBoundingClientRect(),r=p.zoomLevel,s=Math.round((n.clientX-o.left)/r),a=Math.round((n.clientY-o.top)/r);e&&(e.style.display="block",e.style.left=n.clientX+"px",e.style.top=n.clientY+"px",e.innerHTML=`<span>X:</span>${s} <span>Y:</span>${a}`)}),t.canvas.addEventListener("mouseleave",()=>{e&&(e.style.display="none")})}function zo(t){!t.canvas||!t.canvasContainer||(t._boundTouchMove=e=>$o(e,t),t._boundTouchEnd=e=>Yo(e,t),t.canvas.addEventListener("touchstart",e=>{const n=e.touches,i=t.viewport.getBoundingClientRect();if(document.body.classList.add("interaction-active"),e.stopImmediatePropagation(),n.length===2){e.preventDefault();const o=(n[0].clientX+n[1].clientX)/2,r=(n[0].clientY+n[1].clientY)/2;t.pinchState={startDistance:Ln(n[0],n[1]),startZoom:p.zoomLevel,startPanX:t.panX,startPanY:t.panY,startCenterX:o-i.left,startCenterY:r-i.top},t.touchState=null,G("touchmove",t._boundTouchMove,{passive:!1}),G("touchend",t._boundTouchEnd),G("touchcancel",t._boundTouchEnd);return}if(n.length===1){const o=n[0],s=o.target.closest(".widget"),a=s instanceof HTMLElement?s.dataset.id:null;if(t.longPressTimer&&clearTimeout(t.longPressTimer),t.longPressTimer=setTimeout(()=>{Q&&Q.show(o.clientX,o.clientY,a),t.touchState=null},500),!(e.target instanceof HTMLElement&&e.target.classList.contains("canvas-viewport"))){if(e.target instanceof HTMLElement){const l=e.target.closest(".item[data-widget-type]");if(l){const c=l.getAttribute("data-widget-type");_.log("[CanvasTouch] Touch start on palette item:",c);return}}}if(s){e.preventDefault();const l=p.getWidgetById(a);if(!l)return;o.target.classList.contains("widget-resize-handle")?t.touchState={mode:"resize",id:a,startX:o.clientX,startY:o.clientY,startW:l.width,startH:l.height,el:s}:t.touchState={mode:"move",id:a,startTouchX:o.clientX,startTouchY:o.clientY,startWidgetX:l.x,startWidgetY:l.y,hasMoved:!1,el:s}}else e.preventDefault(),t.touchState={mode:"pan",startTouchX:o.clientX,startTouchY:o.clientY,startX:o.clientX,startY:o.clientY,startPanX:t.panX,startPanY:t.panY};G("touchmove",t._boundTouchMove,{passive:!1}),G("touchend",t._boundTouchEnd),G("touchcancel",t._boundTouchEnd)}},{passive:!1}))}function $o(t,e){const n=t.touches,i=e.viewport.getBoundingClientRect();if(e.pinchState&&n.length===2){t.preventDefault();const r=Ln(n[0],n[1])/e.pinchState.startDistance,s=Math.max(.1,Math.min(10,e.pinchState.startZoom*r)),a=(n[0].clientX+n[1].clientX)/2-i.left,l=(n[0].clientY+n[1].clientY)/2-i.top,c=(e.pinchState.startCenterX-e.pinchState.startPanX)/e.pinchState.startZoom,d=(e.pinchState.startCenterY-e.pinchState.startPanY)/e.pinchState.startZoom;e.panX=a-c*s,e.panY=l-d*s,p.setZoomLevel(s),te(e);return}if(n.length===1&&e.longPressTimer){const o=n[0],r=e.touchState,s=r?.startTouchX??r?.startX??o.clientX,a=r?.startTouchY??r?.startY??o.clientY;Math.hypot(o.clientX-s,o.clientY-a)>10&&(clearTimeout(e.longPressTimer),e.longPressTimer=null)}if(e.touchState&&n.length===1){t.preventDefault();const o=n[0];if(e.touchState.mode==="pan"){const r=o.clientX-e.touchState.startTouchX,s=o.clientY-e.touchState.startTouchY;e.panX=e.touchState.startPanX+r,e.panY=e.touchState.startPanY+s,te(e)}else if(e.touchState.mode==="move"){const r=o.clientX-e.touchState.startTouchX,s=o.clientY-e.touchState.startTouchY;if(!e.touchState.hasMoved&&Math.hypot(r,s)<5)return;e.touchState.hasMoved=!0;const a=p.getWidgetById(e.touchState.id);if(!a)return;const l=p.getCanvasDimensions(),c=p.zoomLevel;let d=e.touchState.startWidgetX+r/c,u=e.touchState.startWidgetY+s/c;d=Math.max(0,Math.min(l.width-a.width,d)),u=Math.max(0,Math.min(l.height-a.height,u)),a.x=d,a.y=u,e.touchState.el&&(e.touchState.el.style.left=d+"px",e.touchState.el.style.top=u+"px")}else if(e.touchState.mode==="resize"){e.touchState.hasMoved=!0;const r=p.getWidgetById(e.touchState.id);if(!r)return;const s=p.getCanvasDimensions(),a=p.zoomLevel;let l=e.touchState.startW+(o.clientX-e.touchState.startX)/a,c=e.touchState.startH+(o.clientY-e.touchState.startY)/a;const d=20;l=Math.max(d,Math.min(s.width-r.x,l)),c=Math.max(d,Math.min(s.height-r.y,c)),r.width=l,r.height=c,e.touchState.el&&(e.touchState.el.style.width=l+"px",e.touchState.el.style.height=c+"px")}}}function Yo(t,e){const n=e.touchState,i=Date.now();if(n&&t.changedTouches.length>0){const o=t.changedTouches[0].clientX,r=t.changedTouches[0].clientY;if(Math.hypot(o-(n.startTouchX||n.startX),r-(n.startTouchY||n.startY))>10)i-e.lastCanvasTapTime<350?(p.setZoomLevel(1),ze(e,p.currentPageIndex,!0),e.lastCanvasTapTime=0):(e.lastCanvasTapTime=i,p.selectWidgets([]));else{if(!(t.target instanceof HTMLElement))return;const a=t.target,l=a.closest(".item[data-widget-type]");if(l){const u=l.getAttribute("data-widget-type");_.log("[CanvasTouch] Touch end on palette item:",u);return}const c=a.closest(".widget"),d=c instanceof HTMLElement?c.dataset.id:null;d===e.lastWidgetTapId&&i-e.lastWidgetTapTime<350?(Q&&Q.show(o,r,d),e.lastWidgetTapTime=0):(e.lastWidgetTapId=d??null,e.lastWidgetTapTime=i,p.selectWidget(d??null))}}if(n?.id&&n.hasMoved){const o=p.getWidgetById(n.id);if(o){if(n.mode==="move"){const r=p.getCanvasDimensions(),s=p.getCurrentPage();if(s?.layout){const a=yt(o.x,o.y,o.width,o.height,s.layout,r);o.x=a.x,o.y=a.y}else{const a=ft(e,o,o.x,o.y,!1,r);o.x=a.x,o.y=a.y}}jo(n.id),p.recordHistory(),L(C.STATE_CHANGED)}}e.touchState=null,e.pinchState=null,e.longPressTimer&&(clearTimeout(e.longPressTimer),e.longPressTimer=null),Y("touchmove",e._boundTouchMove),Y("touchend",e._boundTouchEnd),Y("touchcancel",e._boundTouchEnd),document.body.classList.remove("interaction-active"),de(e),ee()}function Ln(t,e){return Math.hypot(e.clientX-t.clientX,e.clientY-t.clientY)}function jo(t){const e=p.getCurrentPage();if(!e||!e.layout)return;const n=e.layout.match(/^(\d+)x(\d+)$/);if(!n)return;const i=p.getWidgetById(t);if(!i)return;const o=parseInt(n[1],10),r=parseInt(n[2],10),s=p.getCanvasDimensions(),a=s.width/r,l=s.height/o,c=i.x+i.width/2,d=i.y+i.height/2,u=Math.floor(c/a),h=Math.floor(d/l),g=Math.max(0,Math.min(o-1,h)),m=Math.max(0,Math.min(r-1,u)),y={...i.props,grid_cell_row_pos:g,grid_cell_column_pos:m,grid_cell_row_span:Math.max(1,Math.round(i.height/l)),grid_cell_column_span:Math.max(1,Math.round(i.width/a))};p.updateWidget(t,{props:y})}let lt=null;class ea{constructor(e=null){this.canvas=document.getElementById("canvas"),this.canvasContainer=document.getElementById("canvasContainer"),this.viewport=document.querySelector(".canvas-viewport"),this.canvas&&!this.canvas.hasAttribute("tabindex")&&(this.canvas.tabIndex=-1),this.dragState=null,this.panX=0,this.panY=0,this.touchState=null,this.pinchState=null,this.lastTapTime=0,this.isExternalDragging=!1,this.suppressNextFocus=!1,this._lastFocusedIndex=-1,this._boundMouseMove=n=>Ho(n,this),this._boundMouseUp=n=>Go(n,this),this.longPressTimer=null,this.lastWidgetTapId=null,this.lastWidgetTapTime=0,this.lastCanvasTapTime=0,this._boundTouchMove=null,this._boundTouchEnd=null,this.panState=null,this.lassoState=null,this.rulers=new wo(this),this.updateInterval=null,this.app=e,lt=this,this.init()}init(){W(C.STATE_CHANGED,()=>this.render()),W(C.PAGE_CHANGED,n=>{if(this.render(),this.suppressNextFocus){this.suppressNextFocus=!1,this._lastFocusedIndex=n.index;return}n.forceFocus&&this.focusPage(n.index,!0,!0),this._lastFocusedIndex=n.index}),W(C.SELECTION_CHANGED,()=>this.updateSelectionVisuals()),W(C.SETTINGS_CHANGED,()=>{this.render(),this.applyZoom(),this.rulers&&this.rulers.update()}),W(C.ZOOM_CHANGED,()=>{this.applyZoom(),this.rulers&&this.rulers.update()});const e=document.getElementById("pagesHeader");e&&e.addEventListener("click",n=>{n.target instanceof HTMLElement&&n.target.closest(".chevron")||this.zoomToFitAll()}),this._boundResize=()=>{p.currentPageIndex!==-1&&this.focusPage(p.currentPageIndex,!1,!0)},G("resize",this._boundResize),this.setupInteractions(),this.render(),this.applyZoom(),this.updateInterval&&clearInterval(this.updateInterval),this.updateInterval=setInterval(()=>{if((this.canvas?.ownerDocument||document).visibilityState==="hidden"||!this.canvas?.isConnected||this.touchState||this.pinchState||this.dragState||this.panState||this.lassoState||this.isExternalDragging)return;const i=p.getCurrentPage();i&&i.widgets.some(o=>o.type==="datetime")&&this.render()},1e3)}render(){de(this)}applyZoom(){te(this),this.rulers&&this.rulers.update()}updateSelectionVisuals(){const e=p.selectedWidgetIds;this.canvas.querySelectorAll(".widget").forEach(i=>{const o=i.dataset.id;o&&e.includes(o)?i.classList.add("active"):i.classList.remove("active")}),_n(this)}setupInteractions(){Eo(this),Fo(this),Co(this),So(this),zo(this);const e=document.getElementById("zoomToFitAllBtn");e&&(e.onclick=()=>this.zoomToFitAll())}zoomIn(){rt(this)}zoomOut(){st(this)}zoomReset(){He(this)}zoomToFit(){p.currentPageIndex!==-1&&this.focusPage(p.currentPageIndex,!0,!0)}zoomToFitAll(e=!0){bo(this,e)}focusPage(e,n=!0,i=!1){ze(this,e,n,i)}destroy(){this.updateInterval&&(clearInterval(this.updateInterval),this.updateInterval=null),this._boundResize&&Y("resize",this._boundResize)}}const U="__mixed__";function Uo(t){const e={black:"#000000",white:"#FFFFFF",red:"#FF0000",green:"#00FF00",blue:"#0000FF",yellow:"#FFFF00",gray:"#808080",grey:"#808080"};if(!t)return"#000000";const n=t.toLowerCase();return e[n]?e[n]:t.startsWith("0x")?"#"+t.substring(2):t.startsWith("#")?t:"#000000"}function Nt(t){const e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:{r:0,g:0,b:0}}function qo(t,e,n){const i=o=>{const r=Math.max(0,Math.min(255,o)).toString(16);return r.length===1?"0"+r:r};return"#"+i(t)+i(e)+i(n)}function Vo(t,e,n,i){const o=t.getContainer();if(!o)return;const r=document.createElement("div");r.className="field",r.style.marginBottom="10px";const s=document.createElement("div");s.className="prop-label",s.textContent=e,r.appendChild(s);let a=n===U?"":Uo(n);const l=Nt(n===U?"#000000":a);let c=l.r,d=l.g,u=l.b;const h=document.createElement("div");h.style.background="var(--bg)",h.style.padding="8px",h.style.borderRadius="6px",h.style.border="1px solid var(--border-subtle)";const g=document.createElement("div");g.style.display="flex",g.style.alignItems="center",g.style.marginBottom="8px",g.style.gap="8px";const m=document.createElement("div");m.style.width="24px",m.style.height="24px",m.style.borderRadius="4px",m.style.border="1px solid #ccc",n===U?(m.style.background="linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",m.style.backgroundSize="8px 8px",m.style.backgroundPosition="0 0, 0 4px, 4px -4px, -4px 0px",m.style.backgroundColor="white"):m.style.backgroundColor=a;const y=document.createElement("input");y.type="text",y.className="prop-input",y.style.flex="1",y.style.textTransform="uppercase",y.value=n===U?"":a,n===U&&(y.placeholder="Mixed Colors"),g.appendChild(m),g.appendChild(y),h.appendChild(g);const v=(k,w,I)=>{const T=document.createElement("div");T.style.display="flex",T.style.alignItems="center",T.style.marginBottom="4px",T.style.fontSize="11px";const O=document.createElement("span");O.textContent=k,O.style.width="15px",O.style.fontWeight="bold";const M=document.createElement("input");M.type="range",M.min="0",M.max="255",M.value=w,M.style.flex="1",M.style.marginLeft="4px",M.style.accentColor=I;const D=document.createElement("span");return D.textContent=w,D.style.width="25px",D.style.textAlign="right",D.style.marginLeft="4px",T.appendChild(O),T.appendChild(M),T.appendChild(D),{row:T,slider:M,valLbl:D}},f=v("R",String(c),"red"),b=v("G",String(d),"green"),x=v("B",String(u),"blue");h.appendChild(f.row),h.appendChild(b.row),h.appendChild(x.row),r.appendChild(h),o.appendChild(r);const E=()=>{c=parseInt(f.slider.value,10),d=parseInt(b.slider.value,10),u=parseInt(x.slider.value,10),f.valLbl.textContent=String(c),b.valLbl.textContent=String(d),x.valLbl.textContent=String(u);const k=qo(c,d,u).toUpperCase();y.value=k,m.style.backgroundColor=k,i(k)},S=()=>{let k=y.value.trim();if(k.startsWith("#")||(k="#"+k),/^#[0-9A-F]{6}$/i.test(k)){const w=Nt(k);c=w.r,d=w.g,u=w.b,f.slider.value=String(c),f.valLbl.textContent=String(c),b.slider.value=String(d),b.valLbl.textContent=String(d),x.slider.value=String(u),x.valLbl.textContent=String(u),m.style.backgroundColor=k,i(k)}};f.slider.addEventListener("input",E),b.slider.addEventListener("input",E),x.slider.addEventListener("input",E),y.addEventListener("input",S),y.addEventListener("change",S)}function Xo(t,e,n,i,o){const r=t.getContainer();if(!r)return;const s=document.createElement("div");s.className="field";const a=document.createElement("div");a.className="prop-label",a.textContent=e;const l=document.createElement("div");l.className="segmented-control",n.forEach(c=>{const d=document.createElement("div");d.className="segment-item"+(c.value===i?" active":""),d.title=c.label||c.value,c.icon?d.innerHTML=`<i class="mdi ${c.icon}"></i>`:d.textContent=c.label||c.value,d.onclick=()=>{l.querySelectorAll(".segment-item").forEach(u=>u.classList.remove("active")),d.classList.add("active"),o(c.value)},l.appendChild(d)}),s.appendChild(a),s.appendChild(l),r.appendChild(s)}function Ko(t,e,n,i,o,r){const s=t.getContainer();if(!s)return;const a=document.createElement("div");a.className="field";const l=document.createElement("div");l.className="prop-label",l.textContent=e;const c=document.createElement("div");c.className="slider-hybrid";const d=n===U,u=document.createElement("input");u.type="range",u.min=String(i),u.max=String(o),u.value=String(d?i:n);const h=document.createElement("input");h.className="prop-input",h.type="number",h.value=d?"":String(n),h.min=String(i),h.max=String(o),d&&(h.placeholder="Mixed"),u.addEventListener("input",()=>{d&&(h.placeholder=""),h.value=u.value,r(parseInt(u.value,10))}),h.addEventListener("input",()=>{u.value=h.value,r(parseInt(h.value,10))}),c.appendChild(u),c.appendChild(h),a.appendChild(l),a.appendChild(c),s.appendChild(a)}function Jo(t,e){const n=t.getContainer();if(!n)return;const i=document.createElement("div");i.className="prop-grid-2",n.appendChild(i),t.panel.containerStack.push(i),e(),t.panel.containerStack.pop()}function Zo(t,e,n,i){const o=p.project?.pages||[],r=[{value:"relative_prev",label:"Previous (Automatic)"},{value:"relative_next",label:"Next (Automatic)"},{value:"home",label:"Home / Dashboard"}];o.forEach((s,a)=>{r.push({value:a.toString(),label:`Page ${a+1}: ${s.name||"Untitled"}`})}),t.addSelect(e,n,r,i)}function Qo(t,e,n){const i=e||t.getContainer();if(!i)return;const o=document.createElement("div");o.className="field",o.style.marginTop="8px";const r=document.createElement("button");r.className="btn btn-secondary btn-full btn-xs",r.innerHTML='<span class="mdi mdi-box-shadow"></span> Create Drop Shadow',r.onclick=()=>{const s=p.selectedWidgetIds||[];s.includes(n)?p.createDropShadow(s):p.createDropShadow(n)},o.appendChild(r),i.appendChild(o)}function er(t,e){const n=t.getContainer();if(!n)return;const i=document.createElement("div");i.className="sidebar-section-label",i.textContent=e,n.appendChild(i)}function tr(t,e,n){if(!N()){_.warn("Entity Picker: No HA backend detected.");return}const i=document.getElementById("propertiesPanel")||document.body,o=document.querySelector(".entity-picker-overlay");o&&o.remove();const r=document.createElement("div");r.className="entity-picker-overlay";const s=document.createElement("div");s.className="entity-picker-header",s.textContent="Pick Home Assistant entity";const a=document.createElement("button");a.className="btn btn-secondary",a.textContent="×",a.style.padding="0 4px",a.style.fontSize="9px",a.type="button",a.addEventListener("click",()=>{r.remove()});const l=document.createElement("div");l.style.display="flex",l.style.alignItems="center",l.style.gap="4px",l.appendChild(a);const c=document.createElement("div");c.style.display="flex",c.style.justifyContent="space-between",c.style.alignItems="center",c.style.gap="4px",c.appendChild(s),c.appendChild(l);const d=document.createElement("div");d.style.display="flex",d.style.gap="4px",d.style.alignItems="center";const u=document.createElement("input");u.type="text",u.className="prop-input",u.placeholder="Search name or entity_id",u.style.flex="1";const h=document.createElement("select");h.className="prop-input",h.style.width="80px",["all","sensor","binary_sensor","light","switch","fan","cover","climate","media_player","input_number","number","input_boolean","input_text","input_select","weather","scene","script","button","input_button"].forEach(y=>{const v=document.createElement("option");v.value=y,v.textContent=y,h.appendChild(v)}),d.appendChild(u),d.appendChild(h);const g=document.createElement("div");g.className="entity-picker-list",r.appendChild(c),r.appendChild(d),r.appendChild(g),i.appendChild(r);function m(y){if(g.innerHTML="",!y||y.length===0){const v=document.createElement("div");v.style.color="var(--muted)",v.style.fontSize="var(--fs-xs)",v.textContent="No entities match.",g.appendChild(v);return}y.forEach(v=>{const f=document.createElement("div");f.className="entity-picker-row";const b=document.createElement("div");b.className="entity-picker-name",b.textContent=v.name||v.entity_id;const x=document.createElement("div");x.className="entity-picker-meta",x.textContent=`${v.entity_id} · ${v.domain||v.entity_id.split(".")[0]}`,f.appendChild(b),f.appendChild(x),f.addEventListener("click",()=>{if(n&&n(v.entity_id),e&&(e.value=v.entity_id),t&&p){if(p.updateWidget(t.id,{entity_id:v.entity_id,title:v.name||v.entity_id||""}),t.type==="graph"&&v.attributes){const E=v.attributes,S={};if(E.unit_of_measurement==="%"&&(t.props.min_value||(S.min_value="0"),t.props.max_value||(S.max_value="100")),E.min!==void 0&&!t.props.min_value&&(S.min_value=String(E.min)),E.max!==void 0&&!t.props.max_value&&(S.max_value=String(E.max)),Object.keys(S).length>0){const k={...t.props,...S};p.updateWidget(t.id,{props:k})}}if(t.type==="sensor_text"){const E={...t.props};v.attributes&&v.attributes.unit_of_measurement?E.unit=v.attributes.unit_of_measurement:v.unit&&(E.unit=v.unit);const S=v.state;if(v.entity_id.startsWith("weather.")||v.entity_id.startsWith("text_sensor."))E.is_text_sensor=!0;else if(S!=null&&S!==""){const w=parseFloat(S);isNaN(w)?E.is_text_sensor=!0:E.is_text_sensor=!1}p.updateWidget(t.id,{props:E})}}r.remove()}),g.appendChild(f)})}pe().then(y=>{if(!y||y.length===0){m([]);return}function v(){const f=(u.value||"").toLowerCase(),b=h.value,x=y.filter(E=>{const S=E.domain||E.entity_id.split(".")[0];return b!=="all"&&S!==b?!1:f?`${E.entity_id} ${E.name||""}`.toLowerCase().includes(f):!0});m(x)}u.addEventListener("input",v),h.addEventListener("change",v),v()})}const ke=[{code:"F0004",name:"account"},{code:"F0026",name:"alert"},{code:"F0028",name:"alert-circle"},{code:"F0045",name:"arrow-down"},{code:"F004D",name:"arrow-left"},{code:"F0054",name:"arrow-right"},{code:"F005D",name:"arrow-up"},{code:"F0079",name:"battery"},{code:"F007C",name:"battery-50"},{code:"F0084",name:"battery-charging"},{code:"F009A",name:"bell"},{code:"F00AF",name:"bluetooth"},{code:"F00D8",name:"brightness-5"},{code:"F00ED",name:"calendar"},{code:"F0100",name:"camera"},{code:"F012C",name:"check"},{code:"F05E0",name:"check-circle"},{code:"F0140",name:"chevron-down"},{code:"F0141",name:"chevron-left"},{code:"F0142",name:"chevron-right"},{code:"F0143",name:"chevron-up"},{code:"F0150",name:"clock"},{code:"F0156",name:"close"},{code:"F015F",name:"cloud"},{code:"F0493",name:"cog"},{code:"F01B4",name:"delete"},{code:"F01D9",name:"dots-vertical"},{code:"F01DA",name:"download"},{code:"F01EE",name:"email"},{code:"F0208",name:"eye"},{code:"F0209",name:"eye-off"},{code:"F0210",name:"fan"},{code:"F0214",name:"file"},{code:"F021E",name:"flash"},{code:"F024B",name:"folder"},{code:"F0279",name:"format-list-bulleted"},{code:"F02D1",name:"heart"},{code:"F02DC",name:"home"},{code:"F07D0",name:"home-assistant"},{code:"F02E9",name:"image"},{code:"F02FC",name:"information"},{code:"F0322",name:"layers"},{code:"F0335",name:"lightbulb"},{code:"F06E8",name:"lightbulb-on"},{code:"F033E",name:"lock"},{code:"F033F",name:"lock-open"},{code:"F0349",name:"magnify"},{code:"F034E",name:"map-marker"},{code:"F035C",name:"menu"},{code:"F036C",name:"microphone"},{code:"F0374",name:"minus"},{code:"F075A",name:"music"},{code:"F03EB",name:"pencil"},{code:"F040A",name:"play"},{code:"F0415",name:"plus"},{code:"F0425",name:"power"},{code:"F0450",name:"refresh"},{code:"F048A",name:"send"},{code:"F0497",name:"share-variant"},{code:"F0565",name:"shield-check"},{code:"F04CE",name:"star"},{code:"F04DB",name:"stop"},{code:"F050F",name:"thermometer"},{code:"F0513",name:"thumb-up"},{code:"F051B",name:"timer-outline"},{code:"F0A79",name:"trash-can"},{code:"F0552",name:"upload"},{code:"F0571",name:"video"},{code:"F057E",name:"volume-high"},{code:"F0581",name:"volume-off"},{code:"F0585",name:"water"},{code:"F05E3",name:"water-percent"},{code:"F0590",name:"weather-cloudy"},{code:"F0591",name:"weather-fog"},{code:"F0592",name:"weather-hail"},{code:"F0593",name:"weather-lightning"},{code:"F0594",name:"weather-night"},{code:"F0595",name:"weather-partly-cloudy"},{code:"F0596",name:"weather-pouring"},{code:"F0597",name:"weather-rainy"},{code:"F0598",name:"weather-snowy"},{code:"F0599",name:"weather-sunny"},{code:"F059D",name:"weather-windy"},{code:"F05A9",name:"wifi"},{code:"F05AD",name:"window-close"}];let R=null,ce=null,ye=null,De=null,oe=null,ve=null;function nr(){R||(R=document.getElementById("iconPickerModal"),ce=document.getElementById("iconPickerFilter"),ye=document.getElementById("iconPickerList"),De=document.getElementById("iconPickerClose"),R||(R=document.createElement("div"),R.id="iconPickerModal",R.className="modal-backdrop hidden",R.style.zIndex="2000",R.innerHTML=`
            <div class="modal" style="max-width: 500px; height: 80vh; display: flex; flex-direction: column;">
                <div class="modal-header">
                    <div>Select Icon</div>
                    <button id="iconPickerClose" class="btn btn-secondary">×</button>
                </div>
                <div class="modal-body" style="flex: 1; overflow: hidden; display: flex; flex-direction: column; padding: 15px;">
                    <input type="text" id="iconPickerFilter" class="prop-input" placeholder="Filter icons..." style="width: 100%; margin-bottom: 12px;">
                    <div id="iconPickerList" style="flex: 1; overflow-y: auto; border: 1px solid var(--border-subtle); border-radius: 4px; display: grid; grid-template-columns: repeat(auto-fill, minmax(60px, 1fr)); gap: 8px; padding: 10px; background: var(--bg-canvas);"></div>
                </div>
            </div>
        `,V(R),ce=document.getElementById("iconPickerFilter"),ye=document.getElementById("iconPickerList"),De=document.getElementById("iconPickerClose")),De&&(De.onclick=dt),ce&&(ce.oninput=t=>{const e=t.target;ir(e.value)}),R&&(R.onclick=t=>{t.target===R&&dt()}))}function vt(t,e){nr(),oe=t,ve=e,R&&(R.classList.remove("hidden"),R.style.display="flex",ce&&(ce.value="",ce.focus()),ct(ke||[]))}function dt(){R&&(R.classList.add("hidden"),R.style.display="none"),oe=null,ve=null}function ct(t){if(!ye)return;if(ye.innerHTML="",!t||t.length===0){ye.innerHTML='<div style="padding: 10px; color: var(--muted); grid-column: 1 / -1; text-align: center;">No icons found.</div>';return}const e=document.createDocumentFragment();t.forEach(n=>{const i=document.createElement("div");i.className="icon-item",i.style.padding="8px",i.style.border="1px solid var(--border-subtle)",i.style.borderRadius="4px",i.style.cursor="pointer",i.style.display="flex",i.style.flexDirection="column",i.style.alignItems="center",i.style.justifyContent="center",i.style.textAlign="center",i.style.background="var(--bg)",i.title=n.name;const o=document.createElement("div");o.className="mdi",o.style.fontSize="24px",o.style.color="var(--accent)";const r=parseInt(n.code,16);o.textContent=String.fromCodePoint(r);const s=document.createElement("div");s.style.fontSize="9px",s.style.marginTop="4px",s.style.overflow="hidden",s.style.textOverflow="ellipsis",s.style.whiteSpace="nowrap",s.style.width="100%",s.style.color="var(--muted)",s.textContent=n.name,i.appendChild(o),i.appendChild(s),i.onclick=()=>or(n),i.onmouseenter=()=>{i.style.borderColor="var(--accent)",i.style.background="rgba(110, 68, 255, 0.05)"},i.onmouseleave=()=>{i.style.borderColor="var(--border-subtle)",i.style.background="var(--bg)"},e.appendChild(i)}),ye.appendChild(e)}function ir(t){const e=ke||[];if(!t){ct(e);return}const n=t.toLowerCase(),i=e.filter(o=>o.name.toLowerCase().includes(n)||o.code.toLowerCase().includes(n));ct(i)}function or(t){oe&&(ve?(ve.value=t.code,ve.dispatchEvent(new Event("input")),ve.dispatchEvent(new Event("change"))):(oe.props||(oe.props={}),oe.props.code=t.code,p&&p.updateWidget(oe.id,oe))),dt()}function rr(t,e,n,i,o,r){const s=t.getContainer();if(!s)return;const a=document.createElement("div");a.className="field";const l=document.createElement("div");l.className="prop-label",l.textContent=e;const c=document.createElement("div");c.style.display="flex",c.style.gap="4px";const d=document.createElement("input");d.className="prop-input",d.type=n,d.value=i,d.style.flex="1";const u=e.toLowerCase().includes("entity");d.placeholder=u?"Pick entity or type mqtt:topic...":"Start typing or browse...",d.autocomplete="off",d.setAttribute("list",tt),gn(),d.addEventListener("input",()=>o(d.value));const h=document.createElement("button");if(h.className="btn btn-secondary",h.textContent="v",h.style.padding="4px 8px",h.style.fontSize="10px",h.style.minWidth="32px",h.type="button",h.title="Browse all entities",h.addEventListener("click",()=>{tr(r,d,g=>{d.value=g,o(g)})}),c.appendChild(d),c.appendChild(h),a.appendChild(l),a.appendChild(c),u&&!i){const g=document.createElement("div");g.style.fontSize="11px",g.style.color="#666",g.style.marginTop="4px",g.style.lineHeight="1.4",g.textContent="Tip: Use mqtt:topic/path for MQTT sources",a.appendChild(g)}s.appendChild(a)}function sr(t,e,n,i,o){const r=t.getContainer();if(!r)return;const s=document.createElement("div");s.className="field";const a=document.createElement("div");a.className="prop-label",a.textContent=e,s.appendChild(a);const l=document.createElement("select");l.className="select",l.style.fontFamily="MDI, monospace, system-ui",l.style.fontSize="16px",l.style.lineHeight="1.5",l.style.width="100%",l.style.marginBottom="4px";const c=document.createElement("option");c.value="",c.textContent="-- Quick visual picker --",c.style.fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif",l.appendChild(c);const d=(n||"").replace("mdi:","").toUpperCase();ke.forEach(y=>{const v=document.createElement("option");v.value=y.code;const f=983040+parseInt(y.code.slice(1),16),b=String.fromCodePoint(f);v.textContent=b+"  "+y.code+(y.name?` (${y.name})`:""),v.style.fontFamily="MDI, monospace, system-ui",y.code===d&&(v.selected=!0),l.appendChild(v)}),l.addEventListener("change",()=>{l.value&&i(l.value)}),s.appendChild(l);const u=document.createElement("div");u.style.display="flex",u.style.gap="4px";const h=document.createElement("input");h.className="prop-input",h.type="text",h.placeholder="MDI Hex (Fxxxx)",h.value=d,h.style.flex="1",h.style.fontFamily="monospace",h.addEventListener("input",()=>{const y=(h.value||"").trim().toUpperCase().replace(/^0X/,"").replace(/^MDI:/,"");if(/^F[0-9A-F]{4}$/i.test(y)){i(y);const v=Array.from(l.options).find(f=>f.value===y);l.value=v?y:""}else y===""&&(i(""),l.value="")}),u.appendChild(h);const g=document.createElement("button");g.className="btn btn-secondary",g.textContent="*",g.style.padding="4px 8px",g.style.fontSize="14px",g.type="button",g.title="Open full icon browser",g.addEventListener("click",()=>{vt(o,h)}),u.appendChild(g),s.appendChild(u);const m=document.createElement("div");m.className="prop-hint",m.innerHTML='Browse <a href="https://pictogrammers.com/library/mdi/icon/" target="_blank" style="color: #03a9f4; text-decoration: none;">Pictogrammers MDI</a>',s.appendChild(m),r.appendChild(s)}function ar(t,e,n,i,o){const r=t.getContainer();if(!r)return;const s=document.createElement("div");s.className="field";const a=document.createElement("div");a.className="prop-label",a.textContent=e;const l=document.createElement("div");l.style.display="flex",l.style.gap="4px";const c=document.createElement("input");c.className="prop-input",c.type="text",c.value=n,c.style.flex="1",c.addEventListener("input",()=>i(c.value));const d=document.createElement("button");d.className="btn btn-secondary",d.textContent="*",d.style.padding="4px 8px",d.style.fontSize="14px",d.type="button",d.addEventListener("click",()=>{vt(o,c)}),l.appendChild(c),l.appendChild(d),s.appendChild(a),s.appendChild(l),r.appendChild(s)}function lr(t,e,n,i,o,r){const s=t.getContainer();if(!s)return;const a=document.createElement("div");a.className="field";const l=document.createElement("div");l.className="prop-label",l.textContent=e;const c=document.createElement("div");c.style.display="flex",c.style.gap="4px",c.style.flex="1";const d=document.createElement("input");d.className="prop-input",d.type=n,d.value=i,d.style.flex="1",d.onchange=h=>o(h.target.value),d.oninput=h=>o(h.target.value);const u=document.createElement("button");u.className="btn btn-secondary",u.innerHTML='<span class="mdi mdi-emoticon-outline"></span>',u.title="Pick MDI Icon",u.style.minWidth="32px",u.style.padding="0 8px",u.onclick=()=>{vt(r,d)},c.appendChild(d),c.appendChild(u),a.appendChild(l),a.appendChild(c),s.appendChild(a)}function dr(t,e,n,i,o,r){const s=t.getContainer();if(!s)return;const a=document.createElement("div");a.className="field";const l=document.createElement("div");l.className="prop-label",l.textContent=e;const c="datalist_"+Math.random().toString(36).substr(2,9),d=document.createElement("datalist");d.id=c,o.forEach(h=>{const g=document.createElement("option");g.value=h,d.appendChild(g)});const u=document.createElement("input");u.className="prop-input",u.type=n,u.value=i,u.setAttribute("list",c),u.addEventListener("input",()=>r(u.value)),u.addEventListener("change",()=>r(u.value)),a.appendChild(l),a.appendChild(u),a.appendChild(d),s.appendChild(a)}function cr(t,e,n){const i=(s,a)=>{const l={...e.props,[s]:a};p.updateWidget(e.id,{props:l})};t.panel.createSection("Common LVGL",!1);const o=document.createElement("div");o.style.display="grid",o.style.gridTemplateColumns="1fr 1fr",o.style.gap="4px",t.getContainer().appendChild(o);const r=(s,a,l=!1)=>{const c=document.createElement("div"),d=document.createElement("input");d.type="checkbox",d.checked=n[a]!==void 0?n[a]:l,d.addEventListener("change",()=>i(a,d.checked));const u=document.createElement("span");u.textContent=" "+s,u.style.fontSize="10px",c.appendChild(d),c.appendChild(u),o.appendChild(c)};r("Hidden","hidden",!1),r("Clickable","clickable",!0),r("Checkable","checkable",!1),r("Scrollable","scrollable",!0),r("Floating","floating",!1),r("Ignore Layout","ignore_layout",!1),t.addSelect("Scrollbar Mode",n.scrollbar_mode||"AUTO",["AUTO","ON","OFF","ACTIVE"],s=>i("scrollbar_mode",s)),t.panel.endSection()}function pr(t,e){e.condition_entity=e.condition_entity||"",e.condition_operator=e.condition_operator||"==",e.condition_state=e.condition_state||"",e.condition_min=e.condition_min||"",e.condition_max=e.condition_max||"";const n=document.createElement("div");n.className="field",n.style.fontSize="9px",n.style.color="#9499a6",n.style.marginBottom="6px",n.innerHTML="Show/hide this widget based on an entity's state.",t.getContainer().appendChild(n),t.addLabeledInputWithPicker("Condition Entity","text",e.condition_entity,a=>{p.updateWidget(e.id,{condition_entity:a})},e);const i=["==","!=","<",">","<=",">="];t.addSelect("Operator",e.condition_operator,i,a=>{p.updateWidget(e.id,{condition_operator:a})});const o=["on","off","open","closed","true","false","home","not_home","locked","unlocked","active","inactive","detected","clear","occupied"];t.addLabeledInputWithDataList("Condition State","text",e.condition_state,o,a=>{p.updateWidget(e.id,{condition_state:a})}),t.addLabeledInput("Min Value (Range)","text",e.condition_min,a=>{p.updateWidget(e.id,{condition_min:a})}),t.addLabeledInput("Max Value (Range)","text",e.condition_max,a=>{p.updateWidget(e.id,{condition_max:a})});const r=document.createElement("div");r.className="field",r.style.marginTop="8px";const s=document.createElement("button");s.className="btn btn-secondary btn-full",s.textContent="Clear Condition",s.type="button",s.addEventListener("click",()=>{p.updateWidget(e.id,{condition_entity:"",condition_operator:"==",condition_state:"",condition_min:"",condition_max:""})}),r.appendChild(s),t.getContainer().appendChild(r)}class ur{constructor(e){this.panel=e}getContainer(){return this.panel.getContainer()}addLabeledInput(e,n,i,o){const r=document.createElement("div");r.className="field";const s=document.createElement("div");s.className="prop-label",s.textContent=e;const a=i===U;let l;n==="textarea"?(l=document.createElement("textarea"),l.className="prop-input",l.style.minHeight="60px",l.style.resize="vertical",l.style.fontFamily="inherit",l.value=a?"":i||"",a&&(l.placeholder="Mixed Values")):(l=document.createElement("input"),l.className="prop-input",l.type=n,l.value=a?"":String(i??""),a&&(l.placeholder="Mixed",l.style.fontStyle="italic",l.style.color="#888"));const c=n==="number"||n==="range"?o:Xi(o,50);l.addEventListener("input",()=>{a&&(l.style.fontStyle="normal",l.style.color="inherit"),c(l.value)}),l.addEventListener("change",()=>{o(l.value)}),r.appendChild(s),r.appendChild(l),this.getContainer().appendChild(r)}addSelect(e,n,i,o){const r=document.createElement("div");r.className="field";const s=document.createElement("div");s.className="prop-label",s.textContent=e;const a=document.createElement("select");a.className="prop-input";const l=n===U;if(l){const c=document.createElement("option");c.value=U,c.textContent="(Mixed)",c.selected=!0,c.disabled=!0,a.appendChild(c)}(i||[]).forEach(c=>{const d=document.createElement("option");typeof c=="object"&&c!==null?(d.value=c.value,d.textContent=c.label,!l&&String(c.value)===String(n)&&(d.selected=!0)):(d.value=c,d.textContent=c,!l&&String(c)===String(n)&&(d.selected=!0)),a.appendChild(d)}),a.addEventListener("change",()=>{o(a.value)}),r.appendChild(s),r.appendChild(a),this.getContainer().appendChild(r)}addCheckbox(e,n,i){const o=document.createElement("div");o.className="field",o.style.marginBottom="8px";const r=document.createElement("label");r.style.display="flex",r.style.alignItems="center",r.style.gap="8px",r.style.fontSize="13px",r.style.cursor="pointer";const s=document.createElement("input");s.type="checkbox",n===U?s.indeterminate=!0:s.checked=!!n,s.style.width="16px",s.style.height="16px",s.style.margin="0",s.style.cursor="pointer",s.addEventListener("change",()=>{const l=s;l.indeterminate=!1,i(l.checked)});const a=document.createElement("span");a.textContent=e,r.appendChild(s),r.appendChild(a),o.appendChild(r),this.getContainer().appendChild(o)}addHint(e){const n=document.createElement("div");n.style.fontSize="11px",n.style.color="#666",n.style.marginTop="4px",n.style.marginBottom="12px",n.style.lineHeight="1.4",n.innerHTML=e,this.getContainer().appendChild(n)}addLabeledInputWithPicker(e,n,i,o,r){rr(this,e,n,i,o,r)}addIconPicker(e,n,i,o){sr(this,e,n,i,o)}addColorMixer(e,n,i){Vo(this,e,n,i)}addColorSelector(e,n,i,o){const r=i||Ie();vn()?this.addColorMixer(e,n,o):this.addSelect(e,n,r,o)}addSegmentedControl(e,n,i,o){Xo(this,e,n,i,o)}addNumberWithSlider(e,n,i,o,r){Ko(this,e,n,i,o,r)}addCompactPropertyRow(e){Jo(this,e)}addCommonLVGLProperties(e,n){cr(this,e,n)}addVisibilityConditions(e){pr(this,e)}addPageSelector(e,n,i){Zo(this,e,n,i)}addDropShadowButton(e,n){Qo(this,e,n)}addIconInput(e,n,i,o){ar(this,e,n,i,o)}addLabeledInputWithIconPicker(e,n,i,o,r){lr(this,e,n,i,o,r)}addLabeledInputWithDataList(e,n,i,o,r){dr(this,e,n,i,o,r)}addSectionLabel(e){er(this,e)}}class hr{static render(e,n,i){const o=Ie(),r=n.props||{},s=(a,l)=>{const c={...n.props,[a]:l};if(p.updateWidget(n.id,{props:c}),a==="border_radius"||a==="radius"||a==="corner_radius"){const d=p.getCurrentPage();if(d&&d.widgets){const u=parseInt(l,10)||0,h=(n.props?.name||n.type)+" Shadow",g=d.widgets.find(m=>m.props&&m.props.name===h||m.x===(n.x||0)+5&&m.y===(n.y||0)+5&&m.width===n.width&&m.height===n.height);g&&(g.type==="shape_rect"&&u>0?p.updateWidget(g.id,{type:"rounded_rect",props:{...g.props,radius:u}}):g.type==="rounded_rect"&&p.updateWidget(g.id,{props:{...g.props,radius:u}}))}}};i.forEach(a=>{e.createSection(a.section,a.defaultExpanded!==!1),a.fields.forEach(l=>{if(l.hidden)return;const c=l.target==="root",d=c?n[l.key]!==void 0?n[l.key]:l.default:r[l.key]!==void 0?r[l.key]:l.default,u=h=>{let g=h;l.type==="number"&&(g=h===""?null:parseFloat(h),isNaN(g)&&(g=l.default!==void 0?l.default:0)),c?p.updateWidget(n.id,{[l.key]:g}):s(l.key,g)};switch(l.type){case"text":case"textarea":case"number":e.addLabeledInput(l.label,l.type,d,u);break;case"color":e.addColorSelector(l.label,d,o,u);break;case"select":{const h=typeof l.dynamicOptions=="function"?l.dynamicOptions(r):l.options;e.addSelect(l.label,d,h,u);break}case"checkbox":e.addCheckbox(l.label,d,u);break;case"icon_picker":e.addLabeledInputWithIconPicker(l.label,"text",d,u,n);break;case"entity_picker":e.addLabeledInputWithPicker(l.label,"text",d,u,n);break;case"hint":e.addHint(l.label);break;case"drop_shadow_button":e.addDropShadowButton(e.getContainer(),n.id);break}}),e.endSection()})}}class gr{static render(e,n){const i=n.map(b=>p.getWidgetById(b)).filter(b=>!!b);if(i.length===0)return;const o=new Set(["border_width","border_color","border_radius","radius"]),r=b=>typeof b?.props?.name=="string"&&b.props.name.trim().endsWith("Shadow"),s=(b,x)=>{if(!b||b.type==="group"||r(b))return!1;const E=b.props||{};if(E[x]!==void 0||x==="radius"&&E.corner_radius!==void 0||x==="border_radius"&&E.corner_radius!==void 0)return!0;const S=q.get(b.type)?.defaults||{};return S[x]!==void 0||x==="radius"&&S.corner_radius!==void 0||x==="border_radius"&&S.corner_radius!==void 0},a=b=>o.has(b)?i.filter(x=>s(x,b)):i;_.log(`[MultiSelectRenderer] Rendering ${i.length} widgets. Display keys detection starting...`),e.panel.innerHTML="",e.createSection(`${i.length} Widgets Selected`,!0),e.createSection("Transform",!0);const l=b=>{const x=i[0][b];return i.every(E=>E[b]===x)?x:U},c=(b,x)=>{p.updateWidgets(n,{[b]:x})};e.addCompactPropertyRow(()=>{const b=E=>c("x",parseInt(E,10)),x=E=>c("y",parseInt(E,10));e.addLabeledInput("X","number",l("x"),b),e.addLabeledInput("Y","number",l("y"),x)}),e.addCompactPropertyRow(()=>{const b=E=>c("width",parseInt(E,10)),x=E=>c("height",parseInt(E,10));e.addLabeledInput("Width","number",l("width"),b),e.addLabeledInput("Height","number",l("height"),x)}),e.endSection();const d=["color","bg_color","background_color","border_width","border_color","border_radius","radius","opacity","font_size","font_family","font_weight","text_align","italic","locked","hidden"],u=new Set;i.forEach(b=>Object.keys(b.props||{}).forEach(x=>u.add(x)));const g=i.map(b=>Object.keys(b.props||{})).reduce((b,x)=>b.filter(E=>x.includes(E))),m=new Set([...g,...d]),y=Array.from(m).filter(b=>{if(o.has(b))return a(b).length>0;if(d.includes(b)){if(i.some(E=>E.props&&E.props[b]!==void 0))return!0;if(b.includes("font")||b==="text_align"||b==="italic"){const E=["text","label","sensor_text","lvgl_label","lvgl_button","datetime"];return i.every(S=>E.includes(S.type)||S.type&&S.type.startsWith("lvgl_"))}if(b==="color"||b==="opacity"){const E=["text","label","sensor_text","lvgl_label","lvgl_button","shape_rect","rounded_rect","shape_circle","datetime","icon"];return i.every(S=>E.includes(S.type)||S.type&&S.type.startsWith("lvgl_"))}}return g.includes(b)});if(y.length>0){e.createSection("Shared Appearance",!0);const b=w=>{const I=a(w);if(I.length===0)return U;const T=I[0].props?I[0].props[w]:void 0;return I.every(O=>(O.props?O.props[w]:void 0)===T)?T:U},x=(w,I)=>{const T=a(w).map(O=>O.id);T.length!==0&&p.updateWidgetsProps(T,{[w]:I})},E=y.filter(w=>{const I=i.find(O=>O.props&&O.props[w]!==void 0)?.props?.[w],T=I!==void 0?I:"";return typeof T=="number"||typeof T=="string"||typeof T=="boolean"||T===""}),S=E.includes("bg_color")&&E.includes("background_color")&&i.every(w=>w.props?.background_color===void 0||w.props?.bg_color!==void 0),k=E.filter(w=>!(S&&w==="background_color"));k.sort((w,I)=>w.includes("color")&&!I.includes("color")?-1:I.includes("color")&&!w.includes("color")?1:w.localeCompare(I)),k.forEach(w=>{const I=w==="bg_color"&&!k.includes("background_color")?"Background Color":w.split("_").map(B=>B.charAt(0).toUpperCase()+B.slice(1)).join(" "),T=b(w),O=a(w),M=O.find(B=>B.props&&B.props[w]!==void 0)||O[0]||i[0],D=M.props&&M.props[w]!==void 0?typeof M.props[w]:"string";if(w.includes("color")||w==="bg"||w==="fg"){const B=ne=>x(w,ne);e.addColorSelector(I,T,Ie(),B)}else if(D==="boolean"||["italic","locked","hidden"].includes(w)){const B=ne=>x(w,ne);e.addCheckbox(I,T===U?!1:T,B)}else{const B=D==="number"||w.includes("width")||w.includes("size")||w.includes("radius")?"number":"text",ne=he=>{x(w,B==="number"?parseInt(he,10):he)};e.addLabeledInput(I,B,T,ne)}}),e.endSection()}e.createSection("Operations",!0);const v=document.createElement("button");v.className="btn btn-secondary btn-full btn-xs",v.style.width="100%",v.style.marginTop="8px",v.innerHTML='<span class="mdi mdi-box-shadow"></span> Create Shadows for All Selected',v.onclick=()=>p.createDropShadow(n),e.getContainer().appendChild(v);const f=document.createElement("button");f.className="btn btn-secondary btn-xs",f.style.background="var(--danger)",f.style.color="white",f.style.border="none",f.style.width="100%",f.style.marginTop="8px",f.innerHTML="🗑 Delete Selected Widgets",f.onclick=()=>{confirm(`Delete ${n.length} widgets?`)&&p.deleteWidget()},e.getContainer().appendChild(f),e.endSection(),e.endSection()}}class mr{static render(e,n,i,o){const r=p.getCurrentPage(),a=(r?.layout||"absolute")!=="absolute";if(!r)return;if(!a){const g=e.getContainer(),m=document.createElement("div");m.style.padding="8px 0",m.style.fontSize="11px",m.style.color="var(--muted)",m.textContent="Page is currently in Absolute Positioning mode.",g.appendChild(m);const y=document.createElement("button");y.className="btn btn-secondary btn-xs",y.style.width="100%",y.innerHTML='<span class="mdi mdi-grid"></span> Enable Page Grid Layout',y.onclick=()=>{o&&o.open(p.currentPageIndex)},g.appendChild(y);return}const l=j.isLvglWidget(i),c=n.props||{},d=(g,m)=>{const y={...n.props,[g]:m};p.updateWidget(n.id,{props:y})},u=(g,m,y,v)=>{const f=r.layout.match(/^(\d+)x(\d+)$/);if(!f)return null;const b=parseInt(f[1],10),x=parseInt(f[2],10),E=p.getCanvasDimensions(),S=E.width/x,k=E.height/b;return{x:Math.round(m*S),y:Math.round(g*k),width:Math.round(S*v),height:Math.round(k*y)}};if(e.addLabeledInput("Row (0-indexed)","number",c.grid_cell_row_pos??"",g=>{const m=g===""?null:parseInt(g,10);d("grid_cell_row_pos",isNaN(m)?null:m);const v=p.getWidgetById(n.id)?.props||{};if(m!=null&&v.grid_cell_column_pos!=null){const f=u(m,v.grid_cell_column_pos,v.grid_cell_row_span||1,v.grid_cell_column_span||1);f&&p.updateWidget(n.id,{x:f.x,y:f.y,width:f.width,height:f.height})}}),e.addLabeledInput("Column (0-indexed)","number",c.grid_cell_column_pos??"",g=>{const m=g===""?null:parseInt(g,10);d("grid_cell_column_pos",isNaN(m)?null:m);const v=p.getWidgetById(n.id)?.props||{};if(m!=null&&v.grid_cell_row_pos!=null){const f=u(v.grid_cell_row_pos,m,v.grid_cell_row_span||1,v.grid_cell_column_span||1);f&&p.updateWidget(n.id,{x:f.x,y:f.y,width:f.width,height:f.height})}}),e.addLabeledInput("Row Span","number",c.grid_cell_row_span||1,g=>{const m=Math.max(1,parseInt(g,10)||1);d("grid_cell_row_span",m);const v=p.getWidgetById(n.id)?.props||{};if(v.grid_cell_row_pos!=null&&v.grid_cell_column_pos!=null){const f=u(v.grid_cell_row_pos,v.grid_cell_column_pos,m,v.grid_cell_column_span||1);f&&p.updateWidget(n.id,{x:f.x,y:f.y,width:f.width,height:f.height})}}),e.addLabeledInput("Column Span","number",c.grid_cell_column_span||1,g=>{const m=Math.max(1,parseInt(g,10)||1);d("grid_cell_column_span",m);const v=p.getWidgetById(n.id)?.props||{};if(v.grid_cell_row_pos!=null&&v.grid_cell_column_pos!=null){const f=u(v.grid_cell_row_pos,v.grid_cell_column_pos,v.grid_cell_row_span||1,m);f&&p.updateWidget(n.id,{x:f.x,y:f.y,width:f.width,height:f.height})}}),l){const g=["START","END","CENTER","STRETCH"];e.addSelect("X Align",c.grid_cell_x_align||"STRETCH",g,m=>{d("grid_cell_x_align",m)}),e.addSelect("Y Align",c.grid_cell_y_align||"STRETCH",g,m=>{d("grid_cell_y_align",m)})}const h=document.createElement("button");h.className="btn btn-secondary btn-xs",h.style.marginTop="8px",h.style.width="100%",h.innerHTML='<span class="mdi mdi-cog"></span> Open Page Grid Settings',h.onclick=()=>{const g=p.currentPageIndex;o&&o.open(g)},e.getContainer().appendChild(h)}}function Pn(t,e){!e||!p||typeof pe=="function"&&pe().then(n=>{if(!n||n.length===0)return;const i=n.find(o=>o.entity_id===e);if(i&&i.name){const o=p.getSelectedWidget();o&&o.id===t&&!o.title&&p.updateWidget(t,{title:i.name})}}).catch(()=>{})}function fr(t,e,n){const i=Ie(),o=e.props||{},r=(s,a)=>{const l={...e.props,[s]:a};p.updateWidget(e.id,{props:l})};n==="image"||n==="online_image"?(t.createSection("Image Source",!0),n==="image"?t.addLabeledInput("Asset Path","text",o.path||"",s=>r("path",s)):(t.addLabeledInput("Image URL","text",o.url||"",s=>r("url",s)),t.addLabeledInput("Refresh (s)","number",o.interval_s||300,s=>r("interval_s",parseInt(s,10)))),t.addCheckbox("Invert Colors",!!o.invert,s=>r("invert",s)),t.endSection(),t.createSection("Appearance",!0),t.addColorSelector("Background",o.bg_color||"transparent",i,s=>r("bg_color",s)),t.addDropShadowButton(t.getContainer(),e.id),t.endSection()):n.startsWith("shape_")||n==="line"||n==="rounded_rect"?(t.createSection("Shape Style",!0),t.addColorSelector("Fill/Line Color",o.color||"black",i,s=>r("color",s)),n!=="line"?(t.addCheckbox("Fill",o.fill!==!1,s=>r("fill",s)),t.addColorSelector("Background",o.bg_color||"transparent",i,s=>r("bg_color",s)),t.addLabeledInput("Border Width","number",o.border_width||0,s=>r("border_width",parseInt(s,10)))):t.addLabeledInput("Thickness","number",o.thickness||2,s=>r("thickness",parseInt(s,10))),(n==="rounded_rect"||n==="shape_rect"||o.radius!==void 0)&&t.addLabeledInput("Corner Radius","number",o.radius||0,s=>r("radius",parseInt(s,10))),t.addDropShadowButton(t.getContainer(),e.id),t.endSection()):n==="odp_ellipse"||n==="odp_polygon"||n==="odp_rectangle_pattern"||n==="odp_arc"||n==="odp_icon_sequence"?(t.createSection("ODP Style",!0),n!=="odp_icon_sequence"?(t.addColorSelector("Outline",o.outline||"black",i,s=>r("outline",s)),t.addColorSelector("Fill",o.fill||"transparent",i,s=>r("fill",s)),t.addLabeledInput("Border Width","number",o.border_width||1,s=>r("border_width",parseInt(s,10)))):(t.addColorSelector("Color",o.fill||"black",i,s=>r("fill",s)),t.addLabeledInput("Icon Size","number",o.size||24,s=>r("size",parseInt(s,10))),t.addSelect("Direction",o.direction||"right",["right","down"],s=>r("direction",s)),t.addLabeledInput("Spacing","number",o.spacing||6,s=>r("spacing",parseInt(s,10))),t.addLabeledInput("Icons (comma sep)","text",Array.isArray(o.icons)?o.icons.join(", "):o.icons||"",s=>r("icons",s))),n==="odp_rectangle_pattern"&&(t.addLabeledInput("Repeat X","number",o.x_repeat||3,s=>r("x_repeat",parseInt(s,10))),t.addLabeledInput("Repeat Y","number",o.y_repeat||2,s=>r("y_repeat",parseInt(s,10))),t.addLabeledInput("Size X","number",o.x_size||30,s=>r("x_size",parseInt(s,10))),t.addLabeledInput("Size Y","number",o.y_size||15,s=>r("y_size",parseInt(s,10)))),n==="odp_arc"&&(t.addLabeledInput("Start Angle","number",o.start_angle||0,s=>r("start_angle",parseInt(s,10))),t.addLabeledInput("End Angle","number",o.end_angle||90,s=>r("end_angle",parseInt(s,10)))),t.endSection()):n==="odp_plot"?(t.createSection("Plot Config",!0),t.addLabeledInput("Duration (sec)","number",o.duration||36400,s=>r("duration",parseInt(s,10))),t.addColorSelector("Background",o.background||"white",i,s=>r("background",s)),t.addColorSelector("Outline",o.outline||"#ccc",i,s=>r("outline",s)),t.endSection()):n==="odp_multiline"?(t.createSection("Multiline Content",!0),t.addLabeledInput("Text","textarea",o.text||"Line 1|Line 2",s=>r("text",s)),t.addLabeledInput("Delimiter","text",o.delimiter||"|",s=>r("delimiter",s)),t.endSection(),t.createSection("Appearance",!0),t.addLabeledInput("Font Size","number",o.font_size||16,s=>r("font_size",parseInt(s,10))),t.addLabeledInput("Line Spacing","number",o.line_spacing||4,s=>r("line_spacing",parseInt(s,10))),t.addColorSelector("Color",o.color||"black",i,s=>r("color",s)),t.addSelect("Font",o.font_family||"Roboto",["Roboto","Inter","Roboto Mono"],s=>r("font_family",s)),t.endSection()):((e.entity_id!==void 0||o.weather_entity!==void 0||n.includes("sensor")||n.includes("icon"))&&(t.createSection("Data Source",!0),t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||o.weather_entity||"",a=>{o.weather_entity!==void 0?r("weather_entity",a):p.updateWidget(e.id,{entity_id:a})},e),e.title!==void 0&&t.addLabeledInput("Title/Label","text",e.title||"",a=>{p.updateWidget(e.id,{title:a})}),t.endSection()),t.createSection("Appearance",!0),t.addColorSelector("Color",o.color||"black",i,a=>r("color",a)),o.bg_color!==void 0&&t.addColorSelector("Background",o.bg_color||"transparent",i,a=>r("bg_color",a)),o.size!==void 0&&t.addLabeledInput("Size","number",o.size||24,a=>r("size",parseInt(a,10))),t.endSection())}const yr={Roboto:[100,300,400,500,600,700,900],Inter:[100,200,300,400,500,600,700,800,900],"Open Sans":[300,400,500,600,700,800],Montserrat:[100,200,300,400,500,600,700,800,900],Poppins:[100,200,300,400,500,600,700,800,900],Raleway:[100,200,300,400,500,600,700,800,900],"Roboto Mono":[100,200,300,400,500,600,700],Ubuntu:[300,400,500,700],Nunito:[200,300,400,500,600,700,800,900],"Playfair Display":[400,500,600,700,800,900],Merriweather:[300,400,700,900],"Work Sans":[100,200,300,400,500,600,700,800,900],"Source Sans Pro":[200,300,400,600,700,900],Quicksand:[300,400,500,600,700]};function bt(t){return yr[t]||[100,200,300,400,500,600,700,800,900]}function Tn(t,e){const n=Math.trunc(e),i=bt(t);return i.includes(n)?n:i.reduce((o,r)=>Math.abs(r-n)<Math.abs(o-n)?r:o)}const Be=Object.freeze(["Roboto","Inter","Open Sans","Lato","Montserrat","Poppins","Raleway","Roboto Mono","Ubuntu","Nunito","Playfair Display","Merriweather","Work Sans","Source Sans Pro","Quicksand","Custom..."]);function Mn(t,e,n,i={}){const o=i.defaultFont||"Roboto",r=i.alignDefault||"TOP_LEFT",s=e.font_family||o,a=!Be.slice(0,-1).includes(s);t.addSelect("Font",a?"Custom...":s,Be,u=>{u!=="Custom..."?(n("font_family",u),n("custom_font_family","")):n("font_family","Custom...")}),(a||e.font_family==="Custom...")&&t.addLabeledInput("Custom Font Name","text",e.custom_font_family||(a?s:""),u=>{n("font_family",u||o),n("custom_font_family",u)});const l=bt(s);let c=e.font_weight||400;l.includes(c)||(c=Tn(s,c),setTimeout(()=>n("font_weight",c),0)),t.addSelect("Weight",c,l,u=>n("font_weight",parseInt(u,10))),t.addCheckbox("Italic",e.italic||!1,u=>n("italic",u));const d=["TOP_LEFT","TOP_CENTER","TOP_RIGHT","CENTER_LEFT","CENTER","CENTER_RIGHT","BOTTOM_LEFT","BOTTOM_CENTER","BOTTOM_RIGHT"];t.addSelect("Align",e.text_align||r,d,u=>n("text_align",u))}const Ft=["Roboto","Inter","Open Sans","Lato","Montserrat","Poppins","Raleway","Roboto Mono","Ubuntu","Nunito","Playfair Display","Merriweather","Work Sans","Source Sans Pro","Quicksand","Custom..."],vr=["TOP_LEFT","TOP_CENTER","TOP_RIGHT","CENTER_LEFT","CENTER","CENTER_RIGHT","BOTTOM_LEFT","BOTTOM_CENTER","BOTTOM_RIGHT"];function br(t,e,n,i={}){const o=i.defaultFont||"Roboto",r=i.customFontProp===void 0?"custom_font_family":i.customFontProp,s=e.font_family||o,a=!Ft.slice(0,-1).includes(s);if(t.addSelect("Font",a?"Custom...":s,Ft,l=>{l!=="Custom..."?(n("font_family",l),r&&n(r,"")):n("font_family","Custom...")}),a||e.font_family==="Custom..."){const l=r&&e[r]||(a?s:"");t.addLabeledInput("Custom Font Name","text",l,c=>{n("font_family",c||o),r&&n(r,c)}),i.customFontHint&&t.addHint(i.customFontHint)}return s}function _r(t,e,n,i){const o=bt(e);let r=n.font_weight||400;o.includes(r)||(r=Tn(e,r),setTimeout(()=>i("font_weight",r),0)),t.addSelect("Weight",r,o,s=>i("font_weight",parseInt(s,10)))}function xr(t,e,n,i="TOP_LEFT"){t.addSelect("Align",e.text_align||i,vr,o=>n("text_align",o))}function zt(t,e,n,i){const o=document.createElement("div");o.className="field",o.style.marginTop="12px";const r=e.x===0&&e.y===0&&e.width===800&&e.height===480,s=document.createElement("button");s.className="btn "+(r?"btn-primary":"btn-secondary")+" btn-full",s.textContent=r?"âœ“ Full Screen (click to restore)":"â›¶ Fill Screen",s.type="button",s.addEventListener("click",()=>{r?n():i()}),o.appendChild(s),t.getContainer().appendChild(o)}function wr(t,e,n,i,o){return n==="image"?(t.createSection("Content",!0),t.addHint("ðŸ–¼ï¸ Static image from ESPHome.<br/><span style='color:#888;font-size:11px;'>Replace the default path with your actual image file path.</span>"),t.addLabeledInput("Image Path","text",i.path||"",r=>o("path",r)),t.endSection(),t.createSection("Appearance",!0),i.invert===void 0&&o("invert",Ge()==="reterminal_e1001"),t.addCheckbox("Invert colors",i.invert||!1,r=>o("invert",r)),t.addSelect("Render Mode",i.render_mode||"Auto",["Auto","Binary","Grayscale","Color (RGB565)"],r=>o("render_mode",r)),zt(t,e,()=>p.updateWidget(e.id,{x:50,y:50,width:200,height:150}),()=>p.updateWidget(e.id,{x:0,y:0,width:800,height:480})),t.endSection(),!0):n==="online_image"?(t.createSection("Content",!0),t.addHint("ðŸ’¡ Fetch remote images dynamically (Puppet support):<br/><code style='background:#f0f0f0;padding:2px 4px;border-radius:2px;'>https://example.com/camera/snapshot.jpg </code><br/><span style='color:#4a9eff;'>â„¹ï¸ Images are downloaded at specified intervals</span>"),t.addLabeledInput("Remote URL","text",i.url||"",r=>o("url",r)),t.addLabeledInput("Update interval (seconds)","number",i.interval_s||300,r=>o("interval_s",parseInt(r,10))),t.endSection(),t.createSection("Appearance",!0),i.invert===void 0&&o("invert",Ge()==="reterminal_e1001"),t.addCheckbox("Invert colors",i.invert||!1,r=>o("invert",r)),t.addSelect("Render Mode",i.render_mode||"Auto",["Auto","Binary","Grayscale","Color (RGB565)"],r=>o("render_mode",r)),zt(t,e,()=>p.updateWidget(e.id,{x:50,y:50,width:200,height:150}),()=>p.updateWidget(e.id,{x:0,y:0,width:800,height:480})),t.endSection(),!0):n==="qr_code"?(t.createSection("Content",!0),t.addHint("ðŸ“± Generate QR codes that can be scanned by phones/tablets"),t.addLabeledInput("QR Content","text",i.value||"https://esphome.io",r=>o("value",r)),t.addHint("Enter a URL, text, or any string to encode"),t.endSection(),t.createSection("Appearance",!0),t.addLabeledInput("Scale","number",i.scale||2,r=>{let s=parseInt(r||"2",10);(Number.isNaN(s)||s<1)&&(s=1),s>10&&(s=10),o("scale",s)}),t.addHint("Size multiplier (1-10). Larger = bigger QR code"),t.addSelect("Error Correction",i.ecc||"LOW",["LOW","MEDIUM","QUARTILE","HIGH"],r=>o("ecc",r)),t.addHint("Higher = more redundancy, can recover from damage"),t.addSelect("Color",i.color||"black",["black","white"],r=>o("color",r)),t.endSection(),!0):n==="puppet"?(t.createSection("Content",!0),t.addLabeledInput("File path / URL","text",i.image_url||"",r=>o("image_url",r)),t.addHint('Tip: Use mdi:icon-name for Material Design Icons. <br><b>Important:</b> Ensure `materialdesignicons - webfont.ttf` is in your ESPHome `fonts / ` folder. <a href="https://pictogrammers.com/library/mdi/" target="_blank" style="color: #52c7ea">MDI Library</a>'),t.endSection(),t.createSection("Appearance",!0),t.addSelect("Image type",i.image_type||"RGB565",["RGB565","RGB","GRAYSCALE","BINARY"],r=>o("image_type",r)),t.addHint("RGB565=2B/px, RGB=3B/px, GRAYSCALE=1B/px, BINARY=1bit/px"),t.addSelect("Transparency",i.transparency||"opaque",["opaque","chroma_key","alpha_channel"],r=>o("transparency",r)),t.addHint("opaque=no transparency, chroma_key=color key, alpha_channel=smooth blend"),t.endSection(),!0):!1}const Sr=`# Dictionary to map calendar keys to their corresponding names
# One word calandars don't need to be added calendar.jobs would map to Jobs by default without adding it here
# calendar.hello_world should be added on the other hand
CALENDAR_NAMES = {"calendar.x": "X", "calendar.Y": "Y"}
# Day names (which are displayed in the calendar event list) can be translated here if required
DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
# Default number of entries to send to the ESPHome device
MAX_ENTRIES = 8

def convert_calendar_format(data, today):
    # Initialize a dictionary to store events grouped by date
    events_by_date = {}
    entrie_count = 0
    multiple_calendars = len(data) > 1
    
    # Variable to store the end time of the closest event that will end
    closest_end_time = None
    
    # Iterate through calendar keys and events
    for calendar_key, events_list in data.items():
        for original_event in events_list['events']:
            event = original_event.copy()
            if 'description' in event:
                event.pop('description')
                
            # Attempt to split the 'event[start]' into date and time parts
            parts = event['start'].split("T")
            event_date = parts[0]
            
            # Compare the event_date with today's date
            if event_date < today:
                # If the event's date is before today, update it to today's date (in case of multi day event starting before today)
                event['start'] = today
                event_date = today
            
            # Add calendar name to event
            # If calendar key exists in CALENDAR_NAMES, use its value, otherwise capitalize the second part of the key
            event['calendar_name'] = CALENDAR_NAMES.get(calendar_key, calendar_key.split(".")[1].capitalize())

            if multiple_calendars and event['calendar_name']:
                first_letter = event['calendar_name'][0].upper()
                prefix = f"[{first_letter}] "
                event['summary'] = prefix + event.get('summary', '')
            
            if 'location' in event:
                event.pop('location')
                    
            # Add event to events_by_date dictionary
            if event_date in events_by_date:
                events_by_date[event_date].append(event)
            else:
                events_by_date[event_date] = [event]
                
    # Sort events by date
    sorted_dates = sorted(events_by_date.keys())
    
    # Initialize a list to store the final date objects
    result = []
    
    # Iterate through sorted dates
    for date in sorted_dates:
        all_day_events = []
        other_events = []
        for event in events_by_date[date]:
            if entrie_count == MAX_ENTRIES:
                break
            
            # Check if the event lasts for the whole day
            start_date = event['start']
            end_date = event['end']
            if 'T' not in event['start']:
                all_day_events.append(event)
            else:
                other_events.append(event)
                
            entrie_count = entrie_count + 1
        
        if other_events and date == today:
            closest_end_time = sorted(other_events, key=lambda item:dt_util.parse_datetime(item['end']), reverse=False)[0]["end"]
        
        if all_day_events or other_events:
            # Sort other_events by start time
            other_events.sort(key=lambda item:dt_util.parse_datetime(item['start']), reverse=False)
            
            # Construct dictionary for the date
            # is_today cast to int because a bool somehow crashes my esphome config
            day_item = {
                'date': date,
                'day': dt_util.parse_datetime(date).day,
                'is_today': int(date == dt_util.now().isoformat().split("T")[0]),
                'day_name': DAY_NAMES[dt_util.parse_datetime(date).weekday()],
                'all_day': all_day_events,
                'other': other_events
            }
            result.append(day_item)
        
    return (result, closest_end_time)

# Access the data received from the Home Assistant service call
input_data = data["calendar"]
today = data["now"]
MAX_ENTRIES = int(data.get("nr_entries", MAX_ENTRIES))

# Convert the received data into the format expected by the epaper display
converted_data = convert_calendar_format(input_data, today)

# Pass the output back to Home Assistant
output["entries"] = {"days": converted_data[0]}
output["closest_end_time"] = converted_data[1]
`;function Er(t,e,n,i,o,r){if(n==="quote_rss"){t.createSection("Feed Settings",!0),t.addHint("ðŸ“° Display quotes from an RSS feed (Quote of the Day)"),t.addLabeledInput("Feed URL","text",i.feed_url||"https://www.brainyquote.com/link/quotebr.rss",l=>r("feed_url",l)),t.addHint("Enter any RSS feed URL. Default: BrainyQuote daily quotes"),t.addCheckbox("Show Author",i.show_author!==!1,l=>r("show_author",l)),t.addCheckbox("Random Quote",i.random!==!1,l=>r("random",l)),t.addHint("Pick a random quote from the feed, or use the first one");const s=["15min","30min","1h","2h","4h","8h","12h","24h"];t.addSelect("Refresh Interval",i.refresh_interval||"24h",s,l=>r("refresh_interval",l)),t.addLabeledInput("Home Assistant URL","text",i.ha_url||"http://homeassistant.local:8123",l=>r("ha_url",l)),t.addHint("Address of your Home Assistant instance (for Proxy)"),t.endSection(),t.createSection("Typography",!1),t.addLabeledInput("Quote Text Size (Line 1)","number",i.quote_font_size||18,l=>r("quote_font_size",parseInt(l,10))),t.addLabeledInput("Author Size (Line 2)","number",i.author_font_size||14,l=>r("author_font_size",parseInt(l,10)));const a=br(t,i,r,{customFontHint:'Browse <a href="https://fonts.google.com" target="_blank">fonts.google.com</a>'});return _r(t,a,i,r),xr(t,i,r,"TOP_LEFT"),t.addColorSelector("Color",i.color||"black",o,l=>r("color",l)),t.endSection(),t.createSection("Display Options",!1),t.addCheckbox("Word Wrap",i.word_wrap!==!1,l=>r("word_wrap",l)),t.addCheckbox("Auto Scale Text",i.auto_scale||!1,l=>r("auto_scale",l)),t.addHint("Automatically reduce font size if text is too long"),t.addCheckbox("Italic Quote",i.italic_quote!==!1,l=>r("italic_quote",l)),t.endSection(),!0}if(n==="calendar"){t.createSection("Appearance",!0),t.addColorSelector("Text Color",i.text_color||"black",o,l=>r("text_color",l)),t.addColorSelector("Background",i.background_color||"white",o,l=>r("background_color",l)),t.endSection(),t.createSection("Border Style",!1),t.addLabeledInput("Border Width","number",i.border_width||0,l=>r("border_width",parseInt(l,10))),t.addColorSelector("Border Color",i.border_color||"theme_auto",o,l=>r("border_color",l)),t.addLabeledInput("Corner Radius","number",i.border_radius||0,l=>r("border_radius",parseInt(l,10))),t.addDropShadowButton(t.getContainer(),e.id),t.endSection(),t.createSection("Font Sizes",!1),t.addLabeledInput("Big Date Size","number",i.font_size_date||100,l=>r("font_size_date",parseInt(l,10))),t.addLabeledInput("Day Name Size","number",i.font_size_day||24,l=>r("font_size_day",parseInt(l,10))),t.addLabeledInput("Grid Text Size","number",i.font_size_grid||14,l=>r("font_size_grid",parseInt(l,10))),t.addLabeledInput("Event Text Size","number",i.font_size_event||18,l=>r("font_size_event",parseInt(l,10))),t.endSection(),t.createSection("Visibility",!0),t.addCheckbox("Show Header",i.show_header!==!1,l=>r("show_header",l)),t.addCheckbox("Show Grid",i.show_grid!==!1,l=>r("show_grid",l)),t.addCheckbox("Show Events",i.show_events!==!1,l=>r("show_events",l)),t.endSection(),t.createSection("Data Source",!0),t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"sensor.esp_calendar_data",l=>{p.updateWidget(e.id,{entity_id:l})},e),t.addLabeledInput("Max Events","number",i.max_events||8,l=>r("max_events",parseInt(l,10))),t.addHint("Must be a sensor with attribute 'entries'");const s=document.createElement("button");s.className="btn btn-secondary btn-full btn-xs",s.textContent="Download Helper Script",s.style.marginTop="10px",s.addEventListener("click",()=>{const l=document.createElement("a");l.setAttribute("href","data:text/x-python;charset=utf-8,"+encodeURIComponent(Sr)),l.setAttribute("download","esp_calendar_data_conversion.py"),l.style.display="none",document.body.appendChild(l),l.click(),document.body.removeChild(l)}),t.getContainer().appendChild(s),t.addHint("Place in /config/python_scripts/");const a=document.createElement("div");return a.style.marginTop="5px",a.style.fontSize="10px",a.style.color="#888",a.style.textAlign="center",a.innerText="Check widget instructions for HA setup.",t.getContainer().appendChild(a),t.endSection(),!0}return!1}function Cr(t,e,n,i,o,r){return n==="weather"?(t.createSection("Data Source",!0),t.addLabeledInputWithPicker("Weather Entity","text",i.weather_entity||"weather.forecast",s=>r("weather_entity",s),e),t.endSection(),t.createSection("Appearance",!0),t.addLabeledInput("Icon Size","number",i.icon_size||48,s=>r("icon_size",parseInt(s,10))),t.addColorSelector("Icon Color",i.icon_color||"black",o,s=>r("icon_color",s)),t.addCheckbox("Show Temperature",i.show_temp!==!1,s=>r("show_temp",s)),t.addCheckbox("Show Condition",i.show_cond!==!1,s=>r("show_cond",s)),t.endSection(),!0):n==="chart"||n==="state_history"?(t.createSection("Data Source",!0),t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",s=>p.updateWidget(e.id,{entity_id:s}),e),t.addLabeledInput("Time Period (hours)","number",i.hours||24,s=>r("hours",parseInt(s,10))),t.endSection(),t.createSection("Appearance",!0),t.addColorSelector("Line Color",i.color||"blue",o,s=>r("color",s)),t.addColorSelector("Fill Color",i.fill_color||"transparent",o,s=>r("fill_color",s)),t.addLabeledInput("Line Width","number",i.line_width||2,s=>r("line_width",parseInt(s,10))),t.addCheckbox("Show Axes",i.show_axes!==!1,s=>r("show_axes",s)),t.endSection(),!0):n==="gauge"||n==="progress"?(t.createSection("Data Source",!0),t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",s=>p.updateWidget(e.id,{entity_id:s}),e),t.addLabeledInput("Min Value","number",i.min||0,s=>r("min",parseFloat(s))),t.addLabeledInput("Max Value","number",i.max||100,s=>r("max",parseFloat(s))),t.endSection(),t.createSection("Appearance",!0),t.addColorSelector("Bar Color",i.color||"blue",o,s=>r("color",s)),t.addColorSelector("Background Color",i.bg_color||"#eee",o,s=>r("bg_color",s)),n==="gauge"&&t.addLabeledInput("Thickness","number",i.thickness||10,s=>r("thickness",parseInt(s,10))),t.endSection(),!0):n==="switch"||n==="button"?(t.createSection("Action",!0),t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",s=>p.updateWidget(e.id,{entity_id:s}),e),t.addLabeledInput("Label","text",i.text||(n==="button"?"Button":"Switch"),s=>r("text",s)),t.endSection(),t.createSection("Appearance",!0),t.addColorSelector("Color",i.color||"blue",o,s=>r("color",s)),t.addColorSelector("Text Color",i.text_color||"white",o,s=>r("text_color",s)),t.endSection(),!0):n==="group"||n==="rectangle"||n==="circle"||n==="line"?(t.createSection("Appearance",!0),t.addColorSelector("Color",i.color||(n==="group"?"transparent":"black"),o,s=>r("color",s)),n!=="group"&&(t.addLabeledInput("Border Width","number",i.border_width||1,s=>r("border_width",parseInt(s,10))),t.addColorSelector("Border Color",i.border_color||"black",o,s=>r("border_color",s))),n==="rectangle"&&t.addLabeledInput("Corner Radius","number",i.border_radius||0,s=>r("border_radius",parseInt(s,10))),t.endSection(),!0):!1}const kr="CENTER";function Ir(t){const e=t||"Roboto";return e==="Custom..."||!Be.slice(0,-1).includes(e)}function Lr(t,e,n){t.addLabeledInput("Text","text",e.text||"Label",i=>n("text",i)),t.addLabeledInput("Font Size","number",e.font_size||20,i=>n("font_size",parseInt(i,10))),t.addColorMixer("Text Color",e.color||"black",i=>n("color",i)),t.addColorMixer("Background Color",e.bg_color||"transparent",i=>n("bg_color",i)),Mn(t,e,n,{alignDefault:kr}),Ir(e.font_family)&&t.addHint("Browse fonts.google.com")}function Pr(t,e,n,i){const o=p.getCanvasDimensions(),r=o.width,s=o.height;t.addSelect("Orientation",n.orientation||"horizontal",["horizontal","vertical"],d=>{const u=e.width,h=e.height;p.updateWidget(e.id,{props:{...n,orientation:d},width:h,height:u})}),t.addLabeledInput("Line Width","number",n.line_width||3,d=>i("line_width",parseInt(d,10))),t.addColorMixer("Line Color",n.line_color||n.color||"black",d=>i("line_color",d)),t.addCheckbox("Rounded Ends",n.line_rounded!==!1,d=>i("line_rounded",d)),t.addLabeledInput("Opacity (0-255)","number",n.opa||255,d=>i("opa",parseInt(d,10))),t.createSection("Quick Size",!1);const a=document.createElement("div");a.style.display="flex",a.style.gap="8px",a.style.marginBottom="8px";const l=document.createElement("button");l.className="btn btn-secondary",l.style.flex="1",l.textContent="Fill Horizontal",l.addEventListener("click",()=>{p.updateWidget(e.id,{x:0,y:e.y,width:r,height:n.line_width||3,props:{...n,orientation:"horizontal"}})});const c=document.createElement("button");c.className="btn btn-secondary",c.style.flex="1",c.textContent="Fill Vertical",c.addEventListener("click",()=>{p.updateWidget(e.id,{x:e.x,y:0,width:n.line_width||3,height:s,props:{...n,orientation:"vertical"}})}),a.appendChild(l),a.appendChild(c),t.getContainer().appendChild(a),t.endSection()}function Tr(t,e,n,i){t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",r=>p.updateWidget(e.id,{entity_id:r}),e),t.createSection("Size",!1);const o=Math.max(e.width,e.height);t.addLabeledInput("Size (px)","number",o,r=>{const s=parseInt(r,10)||100;p.updateWidget(e.id,{width:s,height:s})}),t.addHint("Meter widgets must be square. Width and height are locked together."),t.endSection(),t.createSection("Scale",!1),t.addLabeledInput("Min Value","number",n.min||0,r=>i("min",parseInt(r,10))),t.addLabeledInput("Max Value","number",n.max||100,r=>i("max",parseInt(r,10))),t.endSection(),t.createSection("Preview",!1),t.addLabeledInput("Value (Preview)","number",n.value!==void 0?n.value:60,r=>i("value",parseInt(r,10))),t.endSection(),t.createSection("Appearance",!1),t.addColorMixer("Scale Color",n.color||"black",r=>i("color",r)),t.addColorMixer("Needle Color",n.indicator_color||"red",r=>i("indicator_color",r)),t.addLabeledInput("Scale Width","number",n.scale_width||10,r=>i("scale_width",parseInt(r,10))),t.addLabeledInput("Needle Width","number",n.indicator_width||4,r=>i("indicator_width",parseInt(r,10))),t.addLabeledInput("Ticks","number",n.tick_count||11,r=>i("tick_count",parseInt(r,10))),t.addLabeledInput("Tick Length","number",n.tick_length||10,r=>i("tick_length",parseInt(r,10))),t.addLabeledInput("Label Gap","number",n.label_gap||10,r=>i("label_gap",parseInt(r,10))),t.endSection()}function Mr(t,e,n,i){t.addLabeledInputWithPicker("Action Entity ID","text",e.entity_id||"",o=>p.updateWidget(e.id,{entity_id:o}),e),t.addHint("Entity to toggle or trigger when clicked"),t.addLabeledInput("Text","text",n.text||"BTN",o=>i("text",o)),t.addColorMixer("Background Color",n.bg_color||"white",o=>i("bg_color",o)),t.addColorMixer("Text Color",n.color||"black",o=>i("color",o)),t.addLabeledInput("Border Width","number",n.border_width||2,o=>i("border_width",parseInt(o,10))),t.addLabeledInput("Corner Radius","number",n.radius||5,o=>i("radius",parseInt(o,10))),t.addCheckbox("Checkable (Toggle)",n.checkable||!1,o=>i("checkable",o))}function Ar(t,e,n,i){t.addLabeledInputWithPicker("Sensor Entity ID","text",e.entity_id||"",o=>p.updateWidget(e.id,{entity_id:o}),e),t.addHint("Sensor to bind to arc value"),t.addLabeledInput("Title / Label","text",n.title||"",o=>i("title",o)),t.addLabeledInput("Min Value","number",n.min||0,o=>i("min",parseInt(o,10))),t.addLabeledInput("Max Value","number",n.max||100,o=>i("max",parseInt(o,10))),t.addLabeledInput("Default/Preview Value","number",n.value||0,o=>i("value",parseInt(o,10))),t.addLabeledInput("Thickness","number",n.thickness||10,o=>i("thickness",parseInt(o,10))),t.addLabeledInput("Start Angle","number",n.start_angle||135,o=>i("start_angle",parseInt(o,10))),t.addLabeledInput("End Angle","number",n.end_angle||45,o=>i("end_angle",parseInt(o,10))),t.addSelect("Mode",n.mode||"NORMAL",["NORMAL","SYMMETRICAL","REVERSE"],o=>i("mode",o)),t.addColorMixer("Color",n.color||"blue",o=>i("color",o))}function Or(t,e,n,i){t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",o=>p.updateWidget(e.id,{entity_id:o}),e),t.addLabeledInput("Title","text",n.title||"",o=>i("title",o)),t.addSelect("Type",n.type||"LINE",["LINE","SCATTER","BAR"],o=>i("type",o)),t.addLabeledInput("Min Value","number",n.min||0,o=>i("min",parseInt(o,10))),t.addLabeledInput("Max Value","number",n.max||100,o=>i("max",parseInt(o,10))),t.addLabeledInput("Point Count","number",n.point_count||10,o=>i("point_count",parseInt(o,10))),t.addLabeledInput("X Div Lines","number",n.x_div_lines||3,o=>i("x_div_lines",parseInt(o,10))),t.addLabeledInput("Y Div Lines","number",n.y_div_lines||3,o=>i("y_div_lines",parseInt(o,10))),t.addColorMixer("Color",n.color||"black",o=>i("color",o))}function Dr(t,e,n){t.addLabeledInput("Source (Image/Symbol)","text",e.src||"",i=>n("src",i)),t.addHint("e.g. symbol_ok, symbol_home, or /image.png"),t.addLabeledInput("Rotation (0.1 deg)","number",e.rotation||0,i=>n("rotation",parseInt(i,10))),t.addLabeledInput("Scale (256 = 1x)","number",e.scale||256,i=>n("scale",parseInt(i,10))),t.addColorMixer("Color (Tint)",e.color||"black",i=>n("color",i))}function Hr(t,e,n){t.addLabeledInput("Content / URL","text",e.text||"",i=>n("text",i)),t.addLabeledInput("Size (px)","number",e.size||100,i=>n("size",parseInt(i,10))),t.addColorMixer("Color",e.color||"black",i=>n("color",i)),t.addColorMixer("Background Color",e.bg_color||"white",i=>n("bg_color",i))}function Gr(t,e,n,i){t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",o=>p.updateWidget(e.id,{entity_id:o}),e),t.addLabeledInput("Min","number",n.min||0,o=>i("min",parseInt(o,10))),t.addLabeledInput("Max","number",n.max||100,o=>i("max",parseInt(o,10))),t.addLabeledInput("Value","number",n.value||50,o=>i("value",parseInt(o,10))),t.addColorMixer("Bar Color",n.color||"black",o=>i("color",o)),t.addColorMixer("Background Color",n.bg_color||"gray",o=>i("bg_color",o)),t.addLabeledInput("Start Value","number",n.start_value||0,o=>i("start_value",parseInt(o,10))),t.addSelect("Mode",n.mode||"NORMAL",["NORMAL","SYMMETRICAL","REVERSE"],o=>i("mode",o)),t.addCheckbox("Range Mode",n.range_mode||!1,o=>i("range_mode",o))}function Br(t,e,n,i){t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",o=>p.updateWidget(e.id,{entity_id:o}),e),t.addSegmentedControl("Orientation",[{value:"Horizontal",label:"Horiz",icon:"mdi-arrow-left-right"},{value:"Vertical",label:"Vert",icon:"mdi-arrow-up-down"}],n.vertical?"Vertical":"Horizontal",o=>{const r=o==="Vertical",s=e.width,a=e.height;p.updateWidget(e.id,{props:{...n,vertical:r},width:a,height:s})}),t.addCompactPropertyRow(()=>{t.addLabeledInput("Min","number",n.min||0,o=>i("min",parseInt(o,10))),t.addLabeledInput("Max","number",n.max||100,o=>i("max",parseInt(o,10)))}),t.addNumberWithSlider("Value",n.value||30,n.min||0,n.max||100,o=>i("value",o)),t.addColorMixer("Knob/Bar Color",n.color||"black",o=>i("color",o)),t.addColorMixer("Track Color",n.bg_color||"gray",o=>i("bg_color",o)),t.addLabeledInput("Border Width","number",n.border_width||2,o=>i("border_width",parseInt(o,10))),t.addSelect("Mode",n.mode||"NORMAL",["NORMAL","SYMMETRICAL","REVERSE"],o=>i("mode",o))}function Rr(t,e,n){t.addLabeledInput("Tabs (comma separated)","text",(e.tabs||[]).join(", "),i=>{const o=i.split(",").map(r=>r.trim()).filter(r=>r);n("tabs",o)}),t.addColorMixer("Background Color",e.bg_color||"white",i=>n("bg_color",i))}function Wr(t,e,n,i){t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",o=>p.updateWidget(e.id,{entity_id:o}),e),t.addLabeledInput("Label","text",n.text||"Checkbox",o=>i("text",o)),t.addCheckbox("Checked",n.checked||!1,o=>i("checked",o)),t.addColorMixer("Color",n.color||"blue",o=>i("color",o))}function Nr(t,e,n){t.addLabeledInput("Options (one per line)","textarea",e.options||"",i=>n("options",i)),t.addCompactPropertyRow(()=>{t.addLabeledInput("Index","number",e.selected_index||0,i=>n("selected_index",parseInt(i,10))),t.addLabeledInput("Max H","number",e.max_height||200,i=>n("max_height",parseInt(i,10)))}),t.addSegmentedControl("Direction",[{value:"DOWN",icon:"mdi-arrow-down"},{value:"UP",icon:"mdi-arrow-up"},{value:"LEFT",icon:"mdi-arrow-left"},{value:"RIGHT",icon:"mdi-arrow-right"}],e.direction||"DOWN",i=>n("direction",i)),t.addColorMixer("Color",e.color||"white",i=>n("color",i))}function Fr(t,e,n,i){t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",o=>p.updateWidget(e.id,{entity_id:o}),e),t.addCheckbox("Checked",n.checked||!1,o=>i("checked",o)),t.addColorMixer("Indicator Color",n.color||"blue",o=>i("color",o)),t.addColorMixer("Background Color",n.bg_color||"gray",o=>i("bg_color",o)),t.addColorMixer("Knob Color",n.knob_color||"white",o=>i("knob_color",o))}function zr(t,e,n){t.addLabeledInput("Placeholder","text",e.placeholder||"",i=>n("placeholder",i)),t.addLabeledInput("Text","text",e.text||"",i=>n("text",i)),t.addCheckbox("One Line",e.one_line||!1,i=>n("one_line",i)),t.addCheckbox("Password Mode",e.password_mode||!1,i=>n("password_mode",i)),t.addLabeledInput("Accepted Chars","text",e.accepted_chars||"",i=>n("accepted_chars",i)),t.addLabeledInput("Max Length","number",e.max_length||0,i=>n("max_length",parseInt(i,10)))}function $r(t,e,n,i,o){return n==="lvgl_label"||n.startsWith("lvgl_")?(t.addCommonLVGLProperties(e,i),t.createSection("Widget Settings",!0),n==="lvgl_label"?Lr(t,i,o):n==="lvgl_line"?Pr(t,e,i,o):n==="lvgl_meter"?Tr(t,e,i,o):n==="lvgl_button"?Mr(t,e,i,o):n==="lvgl_arc"?Ar(t,e,i,o):n==="lvgl_chart"?Or(t,e,i,o):n==="lvgl_img"?Dr(t,i,o):n==="lvgl_qrcode"?Hr(t,i,o):n==="lvgl_bar"?Gr(t,e,i,o):n==="lvgl_slider"?Br(t,e,i,o):n==="lvgl_tabview"?Rr(t,i,o):n==="lvgl_checkbox"?Wr(t,e,i,o):n==="lvgl_dropdown"?Nr(t,i,o):n==="lvgl_switch"?Fr(t,e,i,o):n==="lvgl_textarea"&&zr(t,i,o),t.endSection(),!0):!1}const Yr="Browse fonts.google.com";function jr(t){const e=t||"Roboto";return e==="Custom..."||!Be.slice(0,-1).includes(e)}function Ur(t,e,n,i,o){t.createSection("Content",!0),n==="sensor_text"?(t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",r=>{p.updateWidget(e.id,{entity_id:r}),Pn(e.id,r)},e),t.addLabeledInput("Attribute (optional)","text",i.attribute||"",r=>o("attribute",r)),t.addLabeledInput("Prefix","text",i.prefix||"",r=>o("prefix",r)),t.addLabeledInput("Suffix","text",i.suffix||"",r=>o("suffix",r)),t.addLabeledInput("Decimals","number",i.decimals??1,r=>o("decimals",parseInt(r,10)))):n==="entity_text"?(t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",r=>p.updateWidget(e.id,{entity_id:r}),e),t.addLabeledInput("Attribute","text",i.attribute||"",r=>o("attribute",r))):n==="datetime"?(t.addLabeledInput("Format","text",i.format||"%H:%M",r=>o("format",r)),t.addHint("e.g. %H:%M or %A, %B %d")):t.addLabeledInput("Text","text",i.text||"Text",r=>o("text",r)),t.endSection()}function qr(t,e,n,i,o){t.createSection("Typography",!0),t.addLabeledInput("Font Size","number",e.font_size||20,r=>n("font_size",parseInt(r,10))),Mn(t,e,n,{alignDefault:i==="datetime"?"CENTER":"TOP_LEFT"}),jr(e.font_family)&&t.addHint(Yr),t.addColorSelector("Color",e.color||"black",o,r=>n("color",r)),t.endSection(),t.createSection("Appearance",!1),t.addColorSelector("Background",e.bg_color||"transparent",o,r=>n("bg_color",r)),t.addLabeledInput("Opacity (0.0 - 1.0)","number",e.opacity??1,r=>n("opacity",parseFloat(r))),t.addCheckbox("Word Wrap",e.word_wrap!==!1,r=>n("word_wrap",r)),i==="sensor_text"&&t.addCheckbox("Show Unit",e.show_unit!==!1,r=>n("show_unit",r)),t.endSection()}function Vr(t,e,n){const i=Ie(),o=e.props||{},r=(s,a)=>{const l={...e.props,[s]:a};p.updateWidget(e.id,{props:l})};if(n==="text"||n==="label"||n==="datetime"||n==="sensor_text"||n==="entity_text")Ur(t,e,n,o,r),qr(t,o,r,n,i);else{if(Cr(t,e,n,o,i,r))return;if(wr(t,e,n,o,r))return;if(Er(t,e,n,o,i,r))return;if($r(t,e,n,o,r))return}}class $t{static autoPopulateTitleFromEntity(e,n){Pn(e,n)}static renderProtocolProperties(e,n,i){fr(e,n,i)}static renderLegacyProperties(e,n,i){Vr(e,n,i)}}class ta{constructor(e=null){this.app=e,this.panel=document.getElementById("propertiesPanel"),this.controls=new ur(this),this.lastRenderedWidgetId=null,this.lastRenderedSelectionKey="",this.activeWidget=null,this.containerStack=[],this.sectionStates={}}init(){W(C.SELECTION_CHANGED,()=>this.render()),W(C.STATE_CHANGED,()=>this.render());const e=document.getElementById("snapToggle");e&&(e.checked=p.snapEnabled,e.addEventListener("change",i=>{p.setSnapEnabled(i.target.checked)}),W(C.SETTINGS_CHANGED,i=>{i.snapEnabled!==void 0&&(e.checked=i.snapEnabled)}));const n=document.getElementById("lockPositionToggle");n&&n.addEventListener("change",i=>{const o=p.selectedWidgetIds;o.length>0&&p.updateWidgets(o,{locked:i.target.checked})}),this.render()}render(){if(!this.panel||lt&&lt.lassoState)return;const e=p.selectedWidgetIds||(p.selectedWidgetId?[p.selectedWidgetId]:[]),n=e.join("|"),i=p.selectedWidgetId,o=this.lastRenderedWidgetId!==i,r=this.lastRenderedSelectionKey!==n;if(e.length>1&&_.log(`[PropertiesPanel] Multi-select detected: ${e.length} widgets. Selection key: ${n}`),!o&&!r&&this.panel&&this.panel.isConnected){const y=document.activeElement;if(y&&this.panel.contains(y)){const v=y.tagName.toLowerCase(),f=y.type?y.type.toLowerCase():"";if(!(v==="input"&&["checkbox","radio","button"].includes(f)||v==="select")&&(v==="input"||v==="textarea"||y.classList.contains("prop-input")))return}}this.lastRenderedWidgetId=i,this.lastRenderedSelectionKey=n,this.containerStack=[],this.panel.innerHTML="";const s=document.getElementById("lockPositionToggle");if(s){const y=p.getSelectedWidgets(),v=y.length>0&&y.every(x=>x.locked),f=y.some(x=>x.locked),b=s;b.checked=v,b.indeterminate=f&&!v,b.disabled=y.length===0}if(e.length===0){this.panel.innerHTML="<div style='padding:16px;color:#aaa;text-align:center;'>Select a widget to edit properties</div>";return}if(e.length>1){gr.render(this,e);return}const a=p.getSelectedWidget();if(!a)return;const l=a.type,c=q.get(l);let d=l;l==="nav_next_page"?d="next page":l==="nav_previous_page"?d="previous page":l==="nav_reload_page"?d="reload page":d=l.replace(/_/g," ");const u=document.createElement("div");if(u.className="sidebar-section-label",u.style.marginTop="0",u.style.textTransform="capitalize",u.textContent=`${d} Properties`,this.panel.appendChild(u),(p.getCurrentPage()?.layout||"absolute")==="absolute"){this.createSection("Transform",!1);const y=x=>{p.updateWidget(a.id,{x:parseInt(x,10)||0})},v=x=>{p.updateWidget(a.id,{y:parseInt(x,10)||0})},f=x=>{p.updateWidget(a.id,{width:parseInt(x,10)||10})},b=x=>{p.updateWidget(a.id,{height:parseInt(x,10)||10})};this.addCompactPropertyRow(()=>{this.addLabeledInput("Pos X","number",a.x,y),this.addLabeledInput("Pos Y","number",a.y,v)}),this.addCompactPropertyRow(()=>{this.addLabeledInput("Width","number",a.width,f),this.addLabeledInput("Height","number",a.height,b)}),this.endSection()}mr.render(this,a,l,this.app?.pageSettings);const m=p.settings?.renderingMode||"direct";c&&c.schema?(l.startsWith("lvgl_")&&this.addCommonLVGLProperties(a,a.props||{}),hr.render(this,a,c.schema)):c&&c.renderProperties?c.renderProperties(this,a):m==="oepl"||m==="opendisplay"?$t.renderProtocolProperties(this,a,l):$t.renderLegacyProperties(this,a,l),this.createSection("Visibility Conditions",!1),this.addVisibilityConditions(a),this.endSection()}createSection(e,n=!0){const i=this.sectionStates[e]!==void 0?this.sectionStates[e]===!1:!n,o=document.createElement("div");o.className="properties-section"+(i?" collapsed":"");const r=document.createElement("div");r.className="properties-section-header",r.innerHTML=`<span>${e}</span> <span class="icon mdi mdi-chevron-down"></span>`,r.onclick=l=>{l.stopPropagation();const c=o.classList.toggle("collapsed");this.sectionStates[e]=!c};const s=document.createElement("div");s.className="properties-section-content",o.appendChild(r),o.appendChild(s),this.sectionStates[e]===void 0&&(this.sectionStates[e]=!i);const a=this.getContainer();return a&&(a.appendChild(o),this.containerStack.push(s)),s}endSection(){this.containerStack.length>0&&this.containerStack.pop()}getContainer(){return this.containerStack.length>0?this.containerStack[this.containerStack.length-1]:this.panel}autoPopulateTitleFromEntity(e,n){if(!n||!p||!p.entityStates)return;const i=p.entityStates[n];i&&i.attributes&&i.attributes.friendly_name&&p.updateWidget(e,{title:i.attributes.friendly_name})}addLabeledInput(...e){return this.controls.addLabeledInput.apply(this.controls,e)}addSelect(...e){return this.controls.addSelect.apply(this.controls,e)}addCheckbox(...e){return this.controls.addCheckbox.apply(this.controls,e)}addHint(...e){return this.controls.addHint.apply(this.controls,e)}addLabeledInputWithPicker(...e){return this.controls.addLabeledInputWithPicker.apply(this.controls,e)}addColorSelector(...e){return this.controls.addColorSelector.apply(this.controls,e)}addColorMixer(...e){return this.controls.addColorMixer.apply(this.controls,e)}addSegmentedControl(...e){return this.controls.addSegmentedControl.apply(this.controls,e)}addIconPicker(...e){return this.controls.addIconPicker?this.controls.addIconPicker.apply(this.controls,e):null}addNumberWithSlider(...e){return this.controls.addNumberWithSlider.apply(this.controls,e)}addCompactPropertyRow(...e){return this.controls.addCompactPropertyRow.apply(this.controls,e)}addCommonLVGLProperties(...e){return this.controls.addCommonLVGLProperties.apply(this.controls,e)}addVisibilityConditions(...e){return this.controls.addVisibilityConditions.apply(this.controls,e)}addPageSelector(...e){return this.controls.addPageSelector.apply(this.controls,e)}addIconInput(...e){return this.controls.addIconInput?this.controls.addIconInput.apply(this.controls,e):null}addLabeledInputWithIconPicker(...e){return this.controls.addLabeledInputWithIconPicker?this.controls.addLabeledInputWithIconPicker.apply(this.controls,e):null}addDropShadowButton(e,n){const i=document.createElement("div");i.className="field",i.style.marginTop="8px";const o=document.createElement("button");o.className="btn btn-secondary btn-full btn-xs",o.innerHTML='<span class="mdi mdi-box-shadow"></span> Create Drop Shadow',o.onclick=()=>{const r=p.selectedWidgetIds||[];r.includes(n)?p.createDropShadow(r):p.createDropShadow(n)},i.appendChild(o),e.appendChild(i)}addLabeledInputWithDataList(...e){return this.controls.addLabeledInputWithDataList(...e)}addSectionLabel(...e){return this.controls.addSectionLabel(...e)}}class Yt{static validateWidget(e){const n=[];if(!e||typeof e!="object")return{valid:!1,errors:["Widget must be an object"],sanitized:null};if(!e.type)return{valid:!1,errors:['Widget missing "type" field'],sanitized:null};const i=q.get(e.type);if(!i)return{valid:!1,errors:[`Unknown widget type: "${e.type}"`],sanitized:null};const o={...e},r=new Set(["id","type","x","y","width","height","z_index",...Object.keys(i.defaults||{})]);for(const a of Object.keys(e))r.has(a)||(n.push(`Hallucinated property "${a}" in widget type "${e.type}"`),delete o[a]);const s=["id","x","y","width","height"];for(const a of s)(e[a]===void 0||e[a]===null)&&n.push(`Missing required property "${a}" in widget "${e.id||"unknown"}"`);return{valid:n.length===0,errors:n,sanitized:o}}static validateResponse(e){const n=[],i=[];let o=[];if(Array.isArray(e))o=e;else if(e&&typeof e=="object"&&Array.isArray(e.widgets))o=e.widgets;else return{valid:!1,errors:['AI response must be an array of widgets or an object with a "widgets" array'],sanitized:[]};for(const r of o){const s=this.validateWidget(r);s.valid||n.push(...s.errors),s.sanitized&&i.push(s.sanitized)}return{valid:n.length===0,errors:n,sanitized:i}}static sandbox(e,n){const i=JSON.parse(JSON.stringify(e)),o=new Set(i.map(c=>c.id)),r=new Set(n.map(c=>c.id)),s=n.filter(c=>!o.has(c.id)),a=i.filter(c=>!r.has(c.id)).map(c=>c.id),l=n.filter(c=>{if(!o.has(c.id))return!1;const d=i.find(u=>u.id===c.id);return JSON.stringify(d)!==JSON.stringify(c)});return{cloned:i,added:s,modified:l,removed:a}}}class Xr{constructor(){this.cache={models:{}}}getSettings(){return p.settings}async fetchModels(e,n){if(!n)return[];try{if(e==="openrouter")return(await(await fetch("https://openrouter.ai/api/v1/models",{headers:{Authorization:`Bearer ${n}`}})).json()).data.map(r=>({id:r.id,name:r.name,context:r.context_length}));if(e==="openai")return(await(await fetch("https://api.openai.com/v1/models",{headers:{Authorization:`Bearer ${n}`}})).json()).data.filter(r=>r.id.startsWith("gpt-")).map(r=>({id:r.id,name:r.id}));if(e==="gemini"){try{const o=await(await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${n}`)).json();if(o.models&&Array.isArray(o.models))return o.models.filter(r=>r.supportedGenerationMethods.includes("generateContent")).map(r=>({id:r.name.replace("models/",""),name:r.displayName||r.name.replace("models/",""),description:r.description}))}catch(i){throw _.warn("Dynamic Gemini model fetch failed:",i),new Error("Failed to fetch Gemini models. Check your API key.")}return[]}}catch(i){throw _.error(`Error fetching models for ${e}:`,i),i}return[]}async processPrompt(e,n){const i=this.getSettings(),o=i.ai_provider||"gemini",r=i[`ai_api_key_${o}`];let s=i[`ai_model_${o}`];if(!s&&o==="gemini"){_.log("No model selected, attempting to auto-detect...");try{const d=await this.fetchModels(o,r);if(d.length>0)s=(d.find(h=>h.id.includes("flash"))||d.find(h=>h.id.includes("1.5-pro"))||d.find(h=>h.id.includes("gemini-pro"))||d[0]).id,_.log(`Auto-detected model: ${s}`),p.updateSettings({[`ai_model_${o}`]:s});else throw new Error("No models found for this API Key.")}catch(d){_.error("Auto-detection failed:",d),s="gemini-2.0-flash"}}if(!r)throw new Error(`Missing API Key for ${o}. Configure it in Editor Settings → AI.`);if(!s)throw new Error(`No model selected for ${o}. Please pick one in Editor Settings → AI.`);const a=this.getSystemPrompt(),l={...n,widgets:n.widgets.map(d=>this.minifyWidget(d))},c=`
Current Layout Context:
${JSON.stringify(l,null,2)}

User Request:
${e}

Respond ONLY with valid JSON containing the updated "widgets" array for the current page. Do not include any explanation.
`.trim();try{let d="";o==="gemini"?d=await this.callGemini(r,s,a,c):o==="openai"?d=await this.callOpenAI(r,s,a,c):o==="openrouter"&&(d=await this.callOpenRouter(r,s,a,c));let u=d.trim();if(u.includes("```")){const v=u.match(/```(?:json)?\s*([\s\S]*?)\s*```/);v&&v[1]&&(u=v[1].trim())}const h=u.indexOf("["),g=u.indexOf("{");let m=-1,y=-1;h!==-1&&(g===-1||h<g)?(m=h,y=u.lastIndexOf("]")):g!==-1&&(m=g,y=u.lastIndexOf("}")),m!==-1&&y!==-1&&y>m&&(u=u.substring(m,y+1));try{const v=JSON.parse(u),f=Yt.validateResponse(v);if(!f.valid&&(_.warn("[AI] Validation failed:",f.errors),f.sanitized.length===0))throw new Error("AI returned invalid widget data: "+f.errors.join(", "));return f.sanitized}catch(v){_.warn("Fast JSON parse failed, trying repair...",v);try{const f=this.repairJson(u),b=JSON.parse(f),x=Yt.validateResponse(b);return x.valid||_.warn("[AI] Validation failed after repair:",x.errors),x.sanitized}catch(f){throw _.error("JSON repair failed:",f),new Error("AI returned malformed JSON (possibly truncated). Try a shorter prompt or a more powerful model.")}}}catch(d){throw _.error("AI processing failed:",d),d}}async callGemini(e,n,i,o){const r=`https://generativelanguage.googleapis.com/v1beta/models/${n}:generateContent?key=${e}`,s={contents:[{role:"user",parts:[{text:i+`

`+o}]}],generationConfig:{temperature:.1,topP:.95,topK:40,maxOutputTokens:8192,responseMimeType:"application/json"}},a=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)}),l=await a.json();if(a.status===429)throw new Error("⚠️ Rate Limit Exceeded: You are sending requests too quickly for the free tier. Please wait a minute and try again.");if(l.error)throw new Error(l.error.message);return l.candidates[0].content.parts[0].text}async callOpenAI(e,n,i,o){const s=n&&n.toLowerCase().includes("gpt-5")?{type:"json_schema",json_schema:{name:"widget_layout",strict:!0,schema:{type:"object",properties:{widgets:{type:"array",items:{type:"object"}}},required:["widgets"],additionalProperties:!1}}}:{type:"json_object"},l=await(await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({model:n,messages:[{role:"system",content:i},{role:"user",content:o}],temperature:.1,max_tokens:8192,response_format:s})})).json();if(l.error)throw new Error(l.error.message);return l.choices[0].message.content}async callOpenRouter(e,n,i,o){const s=await(await fetch("https://openrouter.ai/api/v1/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({model:n,messages:[{role:"system",content:i},{role:"user",content:o}],temperature:.1,max_tokens:4096})})).json();if(s.error)throw new Error(s.error.message);return s.choices[0].message.content}getSystemPrompt(){return`
You are an expert UI designer and developer for ESPHome devices. 
Your task is to modify or create a widget list based on user instructions.

WIDGET TYPES & PROPS:
- text: { x, y, width, height, text, font_size, font_family, font_weight (400 or 700), color, align }
- sensor_text: { x, y, width, height, entity, prefix, suffix, font_size, color }
- datetime: { x, y, width, height, format, time_font_size, date_font_size, color }
- weather_forecast: { x, y, width, height, entity, layout ("horizontal"/"vertical"), icon_size, temp_font_size, day_font_size }
- weather_icon: { x, y, width, height, entity, size, color }
- icon: { x, y, width, height, icon, icon_size, color }
- battery_icon: { x, y, width, height, entity, color }
- progress_bar: { x, y, width, height, color, bar_height }
- graph: { x, y, width, height, entity, color, duration }
- shape_rect / rounded_rect / shape_circle: { x, y, width, height, bg_color, border_color, border_width, opacity }
- lvgl_*: Advanced widgets (lvgl_button, lvgl_switch, lvgl_slider, lvgl_arc, etc).

STRICT OPERATIONAL RULES:
1. CONTENT ACCURACY: If the user says "reads 'X'", the 'text' property MUST BE "X". NEVER use generic placeholders like "Text".
2. TYPOGRAPHY: "Bold" = font_weight: 700. "Normal/Regular" = font_weight: 400. "Large" = font_size: 28+.
3. VISUAL HIERARCHY: Use 'shape_rect' or 'rounded_rect' to create headers, footers, or background cards for groups of widgets. Use small thin shapes as dividers.
4. UNIQUE IDS: Every new widget MUST have a unique ID like "w_" + timestamp or a short descriptive string. Never leave ID as null or undefined.
5. CANVAS BOUNDS: Stay within ${JSON.stringify(p.getCanvasDimensions())}.
6. COLOR USAGE: Check "display_type" in context:
   - "monochrome": Use ONLY "black" or "white". No grays, no colors.
   - "color_epaper": Use limited palette: black, white, red, green, blue, yellow, orange. No gradients.
   - "color_lcd": Full RGB colors allowed. Use hex codes like "#FF5722" or CSS names.
7. LVGL WIDGETS: If "display_type" is "monochrome" or "color_epaper", do NOT use lvgl_* widgets unless the user explicitly requests LVGL. Use standard widgets (text, shape_rect, icon, etc.) instead. LVGL is designed for LCDs with fast refresh.

FEW-SHOT EXAMPLE:
User: "Add a large bold title that reads 'Home Status' at the top with a separator line."
Response: [
  {"id": "w_title", "type": "text", "x": 20, "y": 10, "width": 760, "height": 50, "text": "Home Status", "font_size": 32, "font_weight": 700, "align": "CENTER"},
  {"id": "w_sep", "type": "shape_rect", "x": 20, "y": 65, "width": 760, "height": 2, "bg_color": "black", "border_color": "black"}
]

8. DROP SHADOWS: For LCD displays ("color_lcd"), add subtle drop shadows to shapes and cards.
   HOW TO: Create a DUPLICATE of the widget to be shadowed.
           - ID: [original_id]_shadow
           - X/Y: original.x + 4, original.y + 4
           - Color: "black" (or "white" if background is dark)
           - Z-Order: Place the shadow widget BEFORE the main widget in the list so it renders behind.
           - Opacity: If supported by the widget type ('shape_rect'), set opacity to 0.4. If not, use a gray color like "#333333".

DESIGN GOAL: Create "Beautiful" layouts. Use whitespace, professional alignment, and decorative shapes to make the UI look premium.
`.trim()}repairJson(e){let n=[],i=!1,o=!1;for(let s=0;s<e.length;s++){const a=e[s];if(o){o=!1;continue}if(a==="\\"){o=!0;continue}if(a==='"'){i=!i;continue}i||(a==="["||a==="{"?n.push(a==="["?"]":"}"):(a==="]"||a==="}")&&n.length>0&&n[n.length-1]===a&&n.pop())}let r=e;for(i&&(r+='"'),r=r.trim().replace(/,\s*$/,"");n.length>0;)r+=n.pop();return r}minifyWidget(e){const{id:n,type:i,x:o,y:r,width:s,height:a,...l}=e;return{id:n,type:i,x:o,y:r,width:s,height:a,...l}}}const J=new Xr;function Kr(){try{return globalThis.localStorage??null}catch{return null}}function Jr(){try{return globalThis.location?.origin||""}catch{return""}}function Zr(t){return t?Array.isArray(t)?t.length:typeof t=="object"?Object.keys(t).length:0:0}class na{constructor(){const e=r=>document.getElementById(r),n=r=>document.getElementById(r),i=r=>document.getElementById(r),o=r=>document.getElementById(r);this.modal=e("editorSettingsModal"),this.closeBtn=e("editorSettingsClose"),this.doneBtn=e("editorSettingsDone"),this.snapToGrid=n("editorSnapToGrid"),this.showGrid=n("editorShowGrid"),this.lightMode=n("editorLightMode"),this.refreshEntitiesBtn=o("editorRefreshEntities"),this.entityCountLabel=e("editorEntityCount"),this.gridOpacity=n("editorGridOpacity"),this.extendedLatinGlyphs=n("editorExtendedLatinGlyphs"),this.haManualUrl=n("haManualUrl"),this.haLlatToken=n("haLlatToken"),this.testHaBtn=o("editorTestHaBtn"),this.haTestResult=e("haTestResult"),this.haDeployedWarning=e("haDeployedWarning"),this.haCorsTip=e("haCorsTip"),this.aiProvider=i("aiProvider"),this.aiApiKeyGemini=n("aiApiKeyGemini"),this.aiApiKeyOpenai=n("aiApiKeyOpenai"),this.aiApiKeyOpenrouter=n("aiApiKeyOpenrouter"),this.aiModelFilter=n("aiModelFilter"),this.aiModelSelect=i("aiModelSelect"),this.aiRefreshModelsBtn=o("aiRefreshModelsBtn"),this.aiTestResult=e("aiTestResult"),this.aiKeyRows={gemini:e("aiKeyGeminiRow"),openai:e("aiKeyOpenaiRow"),openrouter:e("aiKeyOpenrouterRow")}}init(){this.modal&&(this.closeBtn&&this.closeBtn.addEventListener("click",()=>this.close()),this.doneBtn&&this.doneBtn.addEventListener("click",()=>this.close()),this.setupListeners())}open(){if(!this.modal)return;const e=p.settings;this.snapToGrid&&(this.snapToGrid.checked=p.snapEnabled!==!1),this.showGrid&&(this.showGrid.checked=p.showGrid!==!1),this.lightMode&&(this.lightMode.checked=!!e.editor_light_mode),this.aiProvider&&(this.aiProvider.value=e.ai_provider||"gemini"),this.aiApiKeyGemini&&(this.aiApiKeyGemini.value=e.ai_api_key_gemini||""),this.aiApiKeyOpenai&&(this.aiApiKeyOpenai.value=e.ai_api_key_openai||""),this.aiApiKeyOpenrouter&&(this.aiApiKeyOpenrouter.value=e.ai_api_key_openrouter||""),this.aiModelFilter&&(this.aiModelFilter.value=e.ai_model_filter||""),this.updateAIKeyVisibility(),this.refreshModelSelect(),this.gridOpacity&&(this.gridOpacity.value=String(e.grid_opacity!==void 0?e.grid_opacity:20));const n=e.glyphsets||["GF_Latin_Kernel"];document.querySelectorAll(".glyphset-checkbox").forEach(s=>{s.checked=n.includes(s.value)}),this.extendedLatinGlyphs&&(this.extendedLatinGlyphs.checked=!!e.extendedLatinGlyphs);const o=et();this.haManualUrl&&(this.haManualUrl.value=dn()||"",this.haManualUrl.disabled=o,this.haManualUrl.style.opacity=o?"0.5":"1"),this.haLlatToken&&(this.haLlatToken.value=pn()||"",this.haLlatToken.disabled=o,this.haLlatToken.style.opacity=o?"0.5":"1"),this.haDeployedWarning&&this.haDeployedWarning.classList.toggle("hidden",!o),this.haCorsTip&&this.haCorsTip.classList.toggle("hidden",o),this.haTestResult&&(this.haTestResult.textContent=""),this.aiTestResult&&(this.aiTestResult.textContent="");const r=document.getElementById("haOriginPlaceholder");r&&(r.textContent=Jr()),this.updateEntityCount(),this.modal.classList.remove("hidden"),this.modal.style.display="flex"}close(){this.modal&&(this.modal.classList.add("hidden"),this.modal.style.display="none")}updateEntityCount(){if(this.entityCountLabel&&Z){const e=Zr(Z);this.entityCountLabel.textContent=`${e} entities cached`}}setupListeners(){if(!this.modal)return;const e=this.snapToGrid;e&&e.addEventListener("change",()=>{p.setSnapEnabled(e.checked)});const n=this.showGrid;n&&n.addEventListener("change",()=>{p.setShowGrid(n.checked);const f=document.querySelector(".canvas-grid");f&&(f.style.display=n.checked?"block":"none")});const i=this.lightMode;i&&i.addEventListener("change",()=>{const f=i.checked;p.updateSettings({editor_light_mode:f}),this.applyEditorTheme(f),L(C.STATE_CHANGED)});const o=this.gridOpacity;o&&o.addEventListener("input",()=>{const f=parseInt(o.value,10);p.updateSettings({grid_opacity:f})});const r=this.refreshEntitiesBtn;r&&r.addEventListener("click",async()=>{r.disabled=!0,r.textContent="Refreshing...",pe&&await pe(),this.updateEntityCount(),r.disabled=!1,r.textContent="â†» Refresh Entity List"});const s=this.haManualUrl;s&&s.addEventListener("change",()=>{cn(s.value.trim()),Pt()});const a=this.haLlatToken;a&&a.addEventListener("change",()=>{Ei(a.value.trim())});const l=this.testHaBtn;l&&l.addEventListener("click",async()=>{const f=this.haTestResult;l.disabled=!0,f&&(f.textContent="Testing...",f.style.color="var(--muted)");try{Pt();const b=await pe();b&&b.length>0?(f&&(f.textContent="âœ… Success!",f.style.color="var(--success)"),this.updateEntityCount()):f&&(f.innerHTML="âŒ Failed.<br>Did you add <strong>cors_allowed_origins</strong> to HA and <strong>restart</strong> it?",f.style.color="var(--danger)")}catch{f&&(f.innerHTML="âŒ Connection Error.<br>Check browser console.",f.style.color="var(--danger)")}finally{l.disabled=!1}});const c=this.aiProvider;c&&c.addEventListener("change",()=>{p.updateSettings({ai_provider:c.value}),this.updateAIKeyVisibility(),this.refreshModelSelect()});const d=(f,b)=>{const x=document.getElementById(f);x&&x.addEventListener("input",()=>p.updateSettings({[b]:x.value.trim()}))};d("aiApiKeyGemini","ai_api_key_gemini"),d("aiApiKeyOpenai","ai_api_key_openai"),d("aiApiKeyOpenrouter","ai_api_key_openrouter");const u=this.aiModelFilter;u&&u.addEventListener("input",()=>{p.updateSettings({ai_model_filter:u.value}),this.filterModels()});const h=this.aiModelSelect;h&&h.addEventListener("change",()=>{const f=p.settings.ai_provider;p.updateSettings({[`ai_model_${f}`]:h.value})});const g=this.aiRefreshModelsBtn;g&&g.addEventListener("click",async()=>{const f=p.settings.ai_provider||"gemini";let b=p.settings[`ai_api_key_${f}`];const x=`aiApiKey${f.charAt(0).toUpperCase()+f.slice(1)}`,E=document.getElementById(x);if(E&&(b=E.value.trim(),p.updateSettings({[`ai_api_key_${f}`]:b})),!b){A("Please enter an API key first","error",3e3);return}g.disabled=!0,g.textContent="...";const S=this.aiTestResult;S&&(S.textContent="Testing...",S.style.color="var(--muted)");try{const k=await J.fetchModels(f,b);J.cache.models[f]=k,this.refreshModelSelect(),S&&(S.textContent=`âœ… Success! Found ${k.length} models.`,S.style.color="var(--success)")}catch{S&&(S.textContent="âŒ Failed. Check key/console.",S.style.color="var(--danger)")}finally{g.disabled=!1,g.textContent="Test & Load Models"}}),document.querySelectorAll(".glyphset-checkbox").forEach(f=>{f.addEventListener("change",()=>{const b=document.querySelectorAll(".glyphset-checkbox:checked"),x=Array.from(b).map(E=>E.value);p.updateSettings({glyphsets:x})})});const y=this.extendedLatinGlyphs;y&&y.addEventListener("change",()=>{p.updateSettings({extendedLatinGlyphs:y.checked})}),this.modal.querySelectorAll(".settings-category-header").forEach(f=>{f.addEventListener("click",()=>{const b=f.closest(".settings-category");if(!b)return;b.classList.contains("expanded")?b.classList.remove("expanded"):b.classList.add("expanded")})})}updateAIKeyVisibility(){const e=p.settings.ai_provider||"gemini";Object.keys(this.aiKeyRows).forEach(i=>{this.aiKeyRows[i]&&(this.aiKeyRows[i].style.display=i===e?"block":"none")})}async refreshModelSelect(){if(!this.aiModelSelect)return;const e=p.settings.ai_provider||"gemini";if(!J||!J.cache)return;let n=J.cache.models[e];if(!n){n=[];const i=p.settings[`ai_api_key_${e}`]||"";n=await J.fetchModels(e,i),J.cache.models[e]=n}this.filterModels()}filterModels(){const e=this.aiModelSelect;if(!e)return;const n=p.settings.ai_provider||"gemini",i=(p.settings.ai_model_filter||"").toLowerCase();if(!J||!J.cache)return;const r=(J.cache.models[n]||[]).filter(a=>a.name.toLowerCase().includes(i)||a.id.toLowerCase().includes(i));e.innerHTML="",r.forEach(a=>{const l=document.createElement("option");l.value=a.id,l.textContent=a.name,e.appendChild(l)});const s=p.settings[`ai_model_${n}`];s&&(e.value=s)}applyEditorTheme(e){e?document.documentElement.setAttribute("data-theme","light"):document.documentElement.removeAttribute("data-theme");try{const n=Kr();if(!n)return;n.setItem("reterminal-editor-theme",e?"light":"dark")}catch(n){_.log("Could not save theme preference:",n)}}}const An="snippet-selection-state-changed";let On=null,_t=!1;function xt(){ut(new CustomEvent(An))}function Re(){return On}function ia(t){On=t,xt()}function We(){return _t}function oa(t){_t=t,xt()}function ra(){_t=!1,xt()}class Qr{constructor(){this.patterns=[{name:"comment",regex:/(#.*)/g},{name:"key",regex:/^(\s*)([^:\n]+)(:)/gm},{name:"string",regex:/("[^"]*"|'[^']*')/g},{name:"value",regex:/\b(true|false|null|[0-9]+(\.[0-9]+)?)\b/g},{name:"keyword",regex:/\b(lambda|script|on_.*|if|then|else|wait_until|delay)\b/g},{name:"tag",regex:/(![a-z_]+)/g}]}highlight(e,n=null){if(!e)return"";const i=/^(\s*(?:-\s+)?)([^:\n]+)(:)|(#.*)|("[^"]*"|'[^']*')|(![a-z_]+)|\b(lambda|script|on_[a-z_]+|if|then|else|wait_until|delay)\b|\b(true|false|null|[0-9]+(?:\.[0-9]+)?)\b|(\|[-+]?|>[-+]?)/gm,o=[];let r=0;for(const l of e.matchAll(i)){const c=l.index??0;c>r&&o.push({text:e.slice(r,c),className:null});const[,d,u,h,g,m,y,v,f,b]=l;d!==void 0?(o.push({text:d,className:null}),o.push({text:u,className:"hl-key"}),o.push({text:h,className:"hl-punc"})):g!==void 0?o.push({text:g,className:"hl-comment"}):m!==void 0?o.push({text:m,className:"hl-string"}):y!==void 0?o.push({text:y,className:"hl-tag"}):b!==void 0?o.push({text:b,className:"hl-punc"}):v!==void 0?o.push({text:v,className:"hl-keyword"}):f!==void 0&&o.push({text:f,className:"hl-value"}),r=c+l[0].length}r<e.length&&o.push({text:e.slice(r),className:null});let s=0;const a=n&&n.end>n.start?n:null;return o.map(l=>{const c=s,d=s+l.text.length;return s=d,this.renderSegment(l,c,d,a)}).join("")}renderSegment(e,n,i,o){if(!e.text)return"";if(!o||o.end<=n||o.start>=i)return this.wrapSegmentText(e.text,e.className,!1);const r=Math.max(o.start,n)-n,s=Math.min(o.end,i)-n;return[{text:e.text.slice(0,r),selected:!1},{text:e.text.slice(r,s),selected:!0},{text:e.text.slice(s),selected:!1}].map(l=>this.wrapSegmentText(l.text,e.className,l.selected)).join("")}wrapSegmentText(e,n,i){if(!e)return"";const o=this.escapeHtml(e),r=n?`<span class="${n}">${o}</span>`:o;return i?`<span class="hl-selected">${r}</span>`:r}escapeHtml(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}async function Xe(t){if(navigator.clipboard&&ei()){await navigator.clipboard.writeText(t);return}const e=document.createElement("textarea");e.value=t,e.style.position="fixed",e.style.left="-999999px",e.style.top="-999999px",document.body.appendChild(e),e.focus(),e.select();try{if(!document.execCommand("copy"))throw new Error("Copy command was rejected")}finally{document.body.removeChild(e)}}function Ke(t,e,n=2e3){const i=t.textContent,o=t.style.minWidth;t.style.minWidth=t.offsetWidth+"px",t.textContent=e,globalThis.setTimeout(()=>{t.textContent=i,t.style.minWidth=o},n)}function es(t){const e=t.search(/^display:\s*$/m);if(e===-1)throw new Error("No display section found in output");const n=t.substring(e),i=n.match(/\n[a-z_]+:\s*(?:\n|$)/),r=(i?n.substring(0,i.index):n).match(/lambda:\s*\|-\n([\s\S]*?)$/);if(!r)throw new Error("No display lambda found in output");const a=r[1].split(`
`),l=a.filter(d=>d.trim().length>0);if(l.length===0)throw new Error("Lambda appears to be empty");const c=Math.min(...l.map(d=>{const u=d.match(/^(\s*)/);return u?u[1].length:0}));return a.map(d=>d.length>=c?d.substring(c):d).join(`
`).trim()}function ts(t,e={}){const n=e.oeplEntityId||"open_epaper_link.0000000000000000",i=e.oeplDither??2;t.target.entity_id=n,t.data.dither=i;let o=`service: ${t.service}
`;return o+=`target:
  entity_id: ${t.target.entity_id}
`,o+=`data:
`,o+=`  background: ${t.data.background}
`,o+=`  rotate: ${t.data.rotate}
`,o+=`  dither: ${t.data.dither}
`,o+=`  ttl: ${t.data.ttl}
`,o+=`  payload: >
`,o+=`    ${JSON.stringify(t.data.payload)}`,o}function ns(t){const e=t==="OEPLAdapter",n=t==="OpenDisplayAdapter",i=document.getElementById("oeplNotice");i&&i.classList.toggle("hidden",!e);const o=document.getElementById("odpNotice");if(o&&(o.classList.toggle("hidden",!n),n)){const d=o.querySelector("div");d&&(d.innerHTML="<strong>OpenDisplay YAML (ODP)</strong> - Copy this to Home Assistant > Developer Tools > Services > <code>opendisplay.drawcustom</code>")}const r=document.querySelector(".code-panel-title");if(r){const d=r.querySelector("button");r.innerHTML="",d&&r.appendChild(d);let u=" ESPHome YAML";e&&(u=" OpenEpaperLink JSON"),n&&(u=" OpenDisplay YAML (ODP)"),r.appendChild(document.createTextNode(u))}const s=document.getElementById("copyOEPLServiceBtn");s&&(s.style.display=e?"inline-block":"none");const a=document.getElementById("copyODPServiceBtn");a&&(a.style.display=n?"inline-block":"none");const l=document.getElementById("copyLambdaBtn");l&&(l.style.display=e||n?"none":"inline-block");const c=document.getElementById("updateLayoutBtn");return c&&(c.style.display="inline-block"),{isOEPL:e,isODP:n}}function is(t){return document.getElementById(t)}function wt(t){return document.getElementById(t)}function be(t){return document.getElementById(t)}function Dn(t){return t instanceof Error?t.message:String(t)}function os(t){const e=be("snippetFullscreenModal"),n=be("snippetFullscreenContainer"),i=be("snippetFullscreenContent"),o=be("snippetFullscreenHighlight"),r=wt("snippetBox"),s=document.getElementById("toggleFullscreenHighlightBtn");if(!e||!n||!i||!o||!r)return;n.classList.toggle("highlighted",t.isHighlighted),s&&s.classList.toggle("active",t.isHighlighted),s&&!s.hasListener&&(s.addEventListener("click",()=>{t.isHighlighted=!t.isHighlighted,localStorage.setItem("esphome_designer_yaml_highlight",String(t.isHighlighted));const c=document.querySelector(".snippet-container"),d=is("toggleHighlightBtn");if(c&&c.classList.toggle("highlighted",t.isHighlighted),d&&d.classList.toggle("active",t.isHighlighted),n.classList.toggle("highlighted",t.isHighlighted),s.classList.toggle("active",t.isHighlighted),t.isHighlighted){const u=We()?Re():null;o.innerHTML=t.highlighter.highlight(a.value,u),t.updateHighlightLayer()}}),s.hasListener=!0);let a=i.querySelector("textarea");if(!a){i.innerHTML="",a=document.createElement("textarea"),a.className="snippet-box",a.style.width="100%",a.style.height="100%",a.style.background="transparent",a.spellcheck=!1,i.appendChild(a),a.addEventListener("scroll",()=>{o.scrollTop=a.scrollTop,o.scrollLeft=a.scrollLeft}),a.addEventListener("input",()=>{const d=a.value;r&&(r.value=d),typeof t.handleSnippetTextInput=="function"&&t.handleSnippetTextInput(d),t.isHighlighted&&(o.innerHTML=t.highlighter.highlight(d))});let c=e.querySelector(".modal-actions");if(c&&!c.querySelector("#fullscreenUpdateBtn")){const d=document.createElement("button");d.id="fullscreenUpdateBtn",d.className="btn btn-primary",d.textContent="Update Layout from YAML",d.onclick=()=>{const u=a.value;r.value=u,typeof t.handleSnippetTextInput=="function"&&t.handleSnippetTextInput(u),t.handleUpdateLayoutFromSnippetBox(),e.classList.add("hidden")},c.insertBefore(d,c.firstChild)}}const l=a;if(l){if(l.value=r.value||"",t.isHighlighted){const c=We()?Re():null;o.innerHTML=t.highlighter.highlight(l.value,c),setTimeout(()=>{o.scrollTop=l.scrollTop,o.scrollLeft=l.scrollLeft},50)}e.style.display="",e.classList.remove("hidden")}}async function rs(t){const e=wt("importSnippetTextarea"),n=be("importSnippetError");if(!e)return;const i=e.value;if(i.trim())try{n&&(n.textContent="");let o;try{o=Kt(i),_.log("[handleImportSnippet] Successfully used offline parser.")}catch(s){if(_.warn("[handleImportSnippet] Offline parser failed, falling back to backend:",s),N())o=await Ri(i);else throw s}ue(o);const r=be("importSnippetModal");r&&(r.classList.add("hidden"),r.style.display="none"),A("Layout imported successfully","success")}catch(o){_.error("Import failed:",o),n&&(n.textContent=`Error: ${Dn(o)}`)}}async function ss(t){const e=wt("snippetBox");if(!e)return;const n=e.value;if(n.trim()){if(t.lastGeneratedYaml&&n.trim()===t.lastGeneratedYaml.trim()){_.log("[handleUpdateLayoutFromSnippetBox] Skipping update: Snippet matches last generated state.");return}try{const i=p?.currentLayoutId||"reterminal_e1001",o=p?.deviceName||"Layout 1",r=p?.deviceModel||p?.settings?.device_model||"reterminal_e1001";_.log(`[handleUpdateLayoutFromSnippetBox] Preserving context - ID: ${i}, Name: ${o}`);const s=Kt(n);if(!s)throw new Error("Could not parse layout from YAML");s.device_id=i,s.name=o,s.device_model=r,s.settings||(s.settings={}),s.settings.device_model=r,s.settings.device_name=o;const a=p?.settings?.dark_mode||!1;s.settings.dark_mode=a,t.suppressSnippetUpdate=!0,t.snippetDebounceTimer&&(clearTimeout(t.snippetDebounceTimer),t.snippetDebounceTimer=null),t.hasPendingManualSnippetChanges=!1,ue(s),typeof t.syncGeneratedSnippetBaseline=="function"&&await t.syncGeneratedSnippetBaseline(),typeof t.persistManualYamlOverride=="function"&&t.persistManualYamlOverride(n),t.suppressSnippetUpdate=!1,A("Layout updated from YAML","success"),(n.includes("lambda:")||n.includes("script:"))&&setTimeout(()=>{A("Note: Custom C++ (lambda/script) may not fully preview.","warning",4e3)},800)}catch(i){_.error("Update layout failed:",i),A(`Update failed: ${Dn(i)}`,"error"),t.suppressSnippetUpdate=!1}}}function X(t){return document.getElementById(t)}function ie(t){return document.getElementById(t)}function fe(t){return document.getElementById(t)}function Je(t){return t instanceof Error?t.message:String(t)}class sa{constructor(e){this.adapter=e,this.highlighter=new Qr,this.suppressSnippetUpdate=!1,this.snippetDebounceTimer=null,this.lastGeneratedYaml="",this.hasPendingManualSnippetChanges=!1,this.isHighlighted=localStorage.getItem("esphome_designer_yaml_highlight")!=="false",this.init()}getPersistedManualYamlOverride(){return typeof p?.getManualYamlOverride=="function"?p.getManualYamlOverride()||"":p?.project?.state?.manualYamlOverride||""}refreshManualOverrideUi(e){const n=X("clearYamlOverrideBtn");n&&(n.style.display=e?"inline-block":"none")}setSnippetText(e){const n=ie("snippetBox");n&&n.value!==e&&(n.value=e);const o=fe("snippetFullscreenContent")?.querySelector("textarea");o&&o.value!==e&&(o.value=e)}normalizeSnippetText(e){return String(e||"").replace(/\r\n/g,`
`)}clonePagesPayload(){const e=p?p.getPagesPayload():{pages:[]};return JSON.parse(JSON.stringify(e))}async generateCurrentSnippetYaml(){const e=this.clonePagesPayload(),n=await this.adapter.generate(e);return this.normalizeSnippetText(n)}async syncGeneratedSnippetBaseline(){try{this.lastGeneratedYaml=await this.generateCurrentSnippetYaml()}catch(e){_.warn("[SnippetManager] Failed to rebuild generated YAML baseline after import.",e)}}parseTopLevelSnippetBlocks(e){const n=this.normalizeSnippetText(e);if(!n.trim())return[];const i=[],o=n.split(`
`);let r=null;const s=()=>{if(!r||r.lines.length===0){r=null;return}const a=r.lines.join(`
`).replace(/\n+$/g,"").trimEnd();a.trim()&&i.push({type:r.type,key:r.key,text:a}),r=null};return o.forEach(a=>{const c=!a.startsWith(" ")&&!a.startsWith("	")?a.match(/^([A-Za-z0-9_]+:)(?:\s+#.*)?\s*$/):null;if(c){s(),r={type:"section",key:c[1],lines:[a]};return}r||(r={type:"preamble",key:null,lines:[]}),r.lines.push(a)}),s(),i}getManagedSnippetSectionKeys(...e){const n=new Set;return e.forEach(i=>{this.parseTopLevelSnippetBlocks(i).forEach(o=>{o.type==="section"&&o.key&&n.add(o.key)})}),n}reconcileManualSnippetOverrideBySections(e,n,i){const o=this.getManagedSnippetSectionKeys(e,i);if(o.size===0)return null;const r=this.parseTopLevelSnippetBlocks(n);if(!r.some(h=>h.type==="section"&&h.key&&o.has(h.key)))return null;const a=[],l=[];let c=!1;r.forEach(h=>{const g=h.type==="section"&&h.key&&o.has(h.key);g||(c?l.push(h.text):a.push(h.text)),g&&(c=!0)});const d=[...a,e,...l].map(h=>this.normalizeSnippetText(h).replace(/^\n+|\n+$/g,"").trimEnd()).filter(h=>h.trim());if(d.length===0)return null;const u=d.join(`

`);return{text:u,usesManualOverride:u.trim()!==e.trim()}}reconcileManualSnippetOverride(e,n){const i=this.normalizeSnippetText(e),o=this.normalizeSnippetText(n),r=this.normalizeSnippetText(this.lastGeneratedYaml);if(!o.trim())return{text:i,usesManualOverride:!1};if(!r.trim())return{text:o,usesManualOverride:!0};if(o.includes(r)){const a=o.replace(r,i);return{text:a,usesManualOverride:a.trim()!==i.trim()}}const s=this.reconcileManualSnippetOverrideBySections(i,o,r);return s?(_.log("[SnippetManager] Falling back to section-based YAML merge after manual edits changed the generated block."),s):o.trim()===i.trim()?{text:i,usesManualOverride:!1}:(_.warn("[SnippetManager] Unable to merge manual YAML override with regenerated snippet; preserving manual YAML verbatim."),{text:o,usesManualOverride:!0})}persistManualYamlOverride(e){if(typeof p?.setManualYamlOverride=="function"){p.setManualYamlOverride(e,{emitStateChange:!1});return}p?.project?.state&&(p.project.state.manualYamlOverride=e)}clearManualYamlOverride(){typeof p?.clearManualYamlOverride=="function"?p.clearManualYamlOverride():p?.project?.state&&(p.project.state.manualYamlOverride=""),this.refreshManualOverrideUi(!1),this.updateSnippetBox()}handleSnippetTextInput(e){this.setSnippetText(e),this.hasPendingManualSnippetChanges=e.trim()!==this.lastGeneratedYaml.trim(),this.hasPendingManualSnippetChanges?this.persistManualYamlOverride(e):this.clearManualYamlOverride(),this.refreshManualOverrideUi(!!this.getPersistedManualYamlOverride()||this.hasPendingManualSnippetChanges),this.isHighlighted&&this.updateHighlightLayer()}init(){this.bindEvents(),this.setupAutoUpdate(),this.setupScrollSync(),this.updateSnippetBox()}bindEvents(){const e=X("fullscreenSnippetBtn");e&&e.addEventListener("click",()=>{this.openSnippetModal()});const n=X("snippetFullscreenClose");n&&n.addEventListener("click",()=>{const m=fe("snippetFullscreenModal");m&&m.classList.add("hidden")});const i=X("importSnippetConfirm");i&&i.addEventListener("click",async()=>{await this.handleImportSnippet()});const o=X("updateLayoutBtn");o&&o.addEventListener("click",async()=>{const m=o.querySelector(".mdi"),y=m?.className||"";m&&(m.className="mdi mdi-loading mdi-spin"),o.disabled=!0;try{await this.handleUpdateLayoutFromSnippetBox(),m&&(m.className="mdi mdi-check",setTimeout(()=>{m.className=y},1500))}catch{m&&(m.className="mdi mdi-alert-circle-outline",setTimeout(()=>{m.className=y},1500))}finally{o.disabled=!1}});const r=X("copySnippetBtn");r&&r.addEventListener("click",async()=>{this.copySnippetToClipboard(r)});const s=X("copyLambdaBtn");s&&s.addEventListener("click",async()=>{this.copyLambdaToClipboard(s)});const a=X("copyOEPLServiceBtn");a&&a.addEventListener("click",()=>{this.copyOEPLServiceToClipboard(a)});const l=X("copyODPServiceBtn");l&&l.addEventListener("click",()=>{this.copySnippetToClipboard(l)});const c=X("toggleYamlBtn"),d=document.querySelector(".code-panel");c&&d&&(localStorage.getItem("esphome_designer_yaml_collapsed")==="true"&&d.classList.add("collapsed"),c.addEventListener("click",()=>{const y=d.classList.toggle("collapsed");localStorage.setItem("esphome_designer_yaml_collapsed",String(y)),ut(new Event("resize"))}));const u=X("clearYamlOverrideBtn");u&&u.addEventListener("click",()=>{this.hasPendingManualSnippetChanges=!1,this.clearManualYamlOverride()});const h=X("toggleHighlightBtn");document.querySelector(".snippet-container"),h&&(document.querySelectorAll(".snippet-container").forEach(m=>{m.classList.toggle("highlighted",this.isHighlighted)}),document.querySelectorAll('[id*="ToggleHighlightBtn"]').forEach(m=>{m.classList.toggle("active",this.isHighlighted)}),h.addEventListener("click",()=>{this.isHighlighted=!this.isHighlighted,localStorage.setItem("esphome_designer_yaml_highlight",String(this.isHighlighted)),document.querySelectorAll(".snippet-container").forEach(m=>{m.classList.toggle("highlighted",this.isHighlighted)}),document.querySelectorAll('[id*="ToggleHighlightBtn"]').forEach(m=>{m.classList.toggle("active",this.isHighlighted)}),this.isHighlighted&&this.updateHighlightLayer()}));const g=ie("snippetBox");g&&g.addEventListener("input",()=>{this.handleSnippetTextInput(g.value)}),G(An,()=>{this.isHighlighted&&this.updateHighlightLayer()})}setupScrollSync(){const e=ie("snippetBox"),n=fe("highlightLayer");e&&n&&e.addEventListener("scroll",()=>{n.scrollTop=e.scrollTop,n.scrollLeft=e.scrollLeft})}setupAutoUpdate(){W(C.STATE_CHANGED,()=>{this.suppressSnippetUpdate||this.updateSnippetBox()}),W(C.SELECTION_CHANGED,e=>{const n=e&&e.widgetIds?e.widgetIds:[];typeof Pe=="function"&&Pe(n)})}updateHighlightLayer(){if(!this.isHighlighted)return;const e=ie("snippetBox"),n=fe("highlightLayer");if(e&&n){const r=We()?Re():null;n.innerHTML=this.highlighter.highlight(e.value,r)}const i=fe("snippetFullscreenHighlight"),o=fe("snippetFullscreenContent");if(i&&o){const r=o.querySelector("textarea");if(r){const s=We()?Re():null;i.innerHTML=this.highlighter.highlight(r.value,s)}}}updateSnippetBox(){ie("snippetBox")&&(this.snippetDebounceTimer&&clearTimeout(this.snippetDebounceTimer),this.snippetDebounceTimer=setTimeout(()=>{if(this.suppressSnippetUpdate)return;const n=this.adapter?.constructor?.name||"";ns(n);const i=this.getPersistedManualYamlOverride();if(this.hasPendingManualSnippetChanges&&!i){_.log("[SnippetManager] Preserving pending YAML edits; skipping auto-regeneration.");return}try{const r=(p?p.selectedWidgetIds:[]).length>1;this.generateCurrentSnippetYaml().then(s=>{const a=this.reconcileManualSnippetOverride(s,i);this.lastGeneratedYaml=s,this.hasPendingManualSnippetChanges=!1,this.setSnippetText(a.text),a.usesManualOverride?this.persistManualYamlOverride(a.text):this.persistManualYamlOverride(""),this.refreshManualOverrideUi(a.usesManualOverride),this.isHighlighted&&this.updateHighlightLayer();const l=p?p.selectedWidgetIds:[];typeof Pe=="function"&&Pe(l)}).catch(s=>{_.error("Error generating snippet via adapter:",s),this.setSnippetText("# Error generating YAML (adapter): "+Je(s)),this.isHighlighted&&this.updateHighlightLayer()})}catch(o){_.error("Error generating snippet:",o),this.setSnippetText("# Error generating YAML: "+Je(o)),this.isHighlighted&&this.updateHighlightLayer()}},50))}openSnippetModal(){return os(this)}async handleImportSnippet(){return rs()}async handleUpdateLayoutFromSnippetBox(){return ss(this)}async copySnippetToClipboard(e){const n=ie("snippetBox");if(!n)return;const i=n.value||"";try{await Xe(i),A("Snippet copied to clipboard","success"),Ke(e,"Copied!")}catch(o){_.error("Copy failed:",o),A("Unable to copy snippet","error")}}async copyLambdaToClipboard(e){const n=ie("snippetBox");if(!n)return;const i=n.value||"";try{const o=es(i);await Xe(o),A("Display lambda copied to clipboard","success"),Ke(e,"Copied!")}catch(o){_.error("Copy lambda failed:",o),A(Je(o)||"Unable to copy lambda","error")}}async copyOEPLServiceToClipboard(e){const n=ie("snippetBox");if(!n)return;const i=n.value||"";try{const o=JSON.parse(i),r=ts(o,p.settings);await Xe(r),A("HA Service call copied!","success"),Ke(e,"Copied!",2e3)}catch(o){_.error("Failed to format/copy OEPL service:",o),A("Failed to format service call","error")}}}class K{static _activeHandler=null;static _listenersAttached=!1;static _boundKeyDown=null;constructor(){this._seenKeyEvents=new WeakSet,K._activeHandler=this,this.init()}init(){K._listenersAttached||(K._boundKeyDown=e=>{const n=K._activeHandler;n&&(n._seenKeyEvents.has(e)||(n._seenKeyEvents.add(e),n.handleKeyDown(e)))},typeof document?.addEventListener=="function"&&document.addEventListener("keydown",K._boundKeyDown),G("keydown",K._boundKeyDown),K._listenersAttached=!0)}handleKeyDown(e){const n=p;if(!n){_.error("KeyboardHandler: AppState not found!");return}const i=n.selectedWidgetIds.length>0,o=e.target instanceof HTMLElement?e.target:null,r=K.isInput(o),s=K.hasNativeTextSelection(o);if(e.shiftKey&&e.code==="Space"){o&&K.isInput(o)&&o.blur(),e.preventDefault(),Ce&&Ce.open();return}if((e.key==="Delete"||e.key==="Backspace")&&i){if(r)return;e.preventDefault(),this.deleteWidget(null);return}if((e.ctrlKey||e.metaKey)&&e.key&&e.key.toLowerCase()==="c"){if(r||s)return;e.preventDefault(),this.copyWidget();return}if((e.ctrlKey||e.metaKey)&&e.key&&e.key.toLowerCase()==="v"){if(r)return;e.preventDefault(),this.pasteWidget();return}if((e.ctrlKey||e.metaKey)&&e.key&&e.key.toLowerCase()==="z"&&!e.shiftKey){if(r)return;e.preventDefault(),n.isUndoRedoInProgress=!0,n.undo(),setTimeout(()=>{n.isUndoRedoInProgress=!1},100);return}if((e.ctrlKey||e.metaKey)&&e.key&&(e.key.toLowerCase()==="y"||e.key.toLowerCase()==="z"&&e.shiftKey)){if(r)return;e.preventDefault(),n.isUndoRedoInProgress=!0,n.redo(),setTimeout(()=>{n.isUndoRedoInProgress=!1},100);return}if((e.ctrlKey||e.metaKey)&&e.key&&e.key.toLowerCase()==="l"&&i){e.preventDefault();const l=n.getSelectedWidgets().every(c=>c.locked);n.updateWidgets(n.selectedWidgetIds,{locked:!l})}if((e.ctrlKey||e.metaKey)&&e.key&&e.key.toLowerCase()==="a"&&e.target instanceof HTMLElement&&!K.isInput(e.target)&&!s){e.preventDefault(),n.selectAllWidgets();return}if(e.key&&e.key.toLowerCase()==="g"&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey&&e.target instanceof HTMLElement&&e.target.tagName!=="INPUT"&&e.target.tagName!=="TEXTAREA"){e.preventDefault();const a=!n.showGrid;if(n.setShowGrid(a),a){n.setShowDebugGrid(!1);const c=document.getElementById("debugGridToggleBtn");c&&c.classList.remove("active")}const l=document.getElementById("gridToggleBtn");l&&l.classList.toggle("active",a),L(C.STATE_CHANGED),_.log(`[Keyboard] Grid toggled: ${a}`);return}if(e.key&&e.key.toLowerCase()==="d"&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey&&e.target instanceof HTMLElement&&e.target.tagName!=="INPUT"&&e.target.tagName!=="TEXTAREA"){e.preventDefault();const a=!n.showDebugGrid;if(n.setShowDebugGrid(a),a){n.setShowGrid(!1);const c=document.getElementById("gridToggleBtn");c&&c.classList.remove("active")}const l=document.getElementById("debugGridToggleBtn");l&&l.classList.toggle("active",a),L(C.STATE_CHANGED),_.log(`[Keyboard] Debug mode toggled: ${a}`);return}if(e.key&&e.key.toLowerCase()==="r"&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey&&e.target instanceof HTMLElement&&e.target.tagName!=="INPUT"&&e.target.tagName!=="TEXTAREA"){e.preventDefault();const a=!n.showRulers;n.setShowRulers(a);const l=document.getElementById("rulersToggleBtn");l&&l.classList.toggle("active",a),_.log(`[Keyboard] Rulers toggled: ${a}`);return}e.key==="Escape"&&(document.activeElement instanceof HTMLElement&&(document.activeElement.tagName==="INPUT"||document.activeElement.tagName==="TEXTAREA")&&document.activeElement.blur(),n.selectedWidgetIds.length>0&&(n.selectWidgets([]),L(C.STATE_CHANGED)))}static isInput(e){return!!(e instanceof HTMLElement&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable))}static hasNativeTextSelection(e){if(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement){const n=e.selectionStart??0;return(e.selectionEnd??0)>n}try{const n=globalThis.getSelection?.();return!!n&&!n.isCollapsed&&n.toString().trim().length>0}catch{return!1}}deleteWidget(e){const n=p;n&&n.deleteWidget(e)}copyWidget(){const e=p;e&&e.copyWidget()}pasteWidget(){const e=p;e&&e.pasteWidget()}}const as=`<header class="main-header" role="banner">
  <div class="main-header-title">
    <img src="assets/logo_header.png" alt="ESPHome Designer" class="logo-image">
    <span><small style="opacity: 0.5; margin-left: 8px;">v1.0.0 RC11</small> <span id="currentLayoutDevice"
        style="margin-left:8px; color:var(--accent);"></span></span>
  </div>
  <div class="main-header-actions desktop-only">
    <a href="https://github.com/koosoli/ESPHomeDesigner/" target="_blank" class="btn btn-secondary"
      style="font-size: 11px;">
      <svg height="14" width="14" viewBox="0 0 16 16" fill="currentColor"
        style="vertical-align: middle; margin-right: 4px;">
        <path
          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z">
        </path>
      </svg>
      GitHub
    </a>
    <a href="https://buymeacoffee.com/koosoli" target="_blank" class="btn btn-secondary" title="Buy me a coffee">
      <span class="mdi mdi-coffee" style="font-size: 16px;"></span>
    </a>
    <button id="deviceSettingsBtn" class="btn btn-secondary">📱 Device Settings</button>
    <button id="editorSettingsBtn" class="btn btn-secondary">⚙ Editor Settings</button>
  </div>
  <div class="main-header-actions mobile-only">
    <button id="mobileWidgetsBtn" class="btn btn-secondary"><svg viewBox="0 0 24 24" width="18" height="18" fill="none"
        stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
      </svg></button>
    <button id="mobileDeviceBtn" class="btn btn-secondary">📱</button>
    <button id="mobileEditorSettingsBtn" class="btn btn-secondary">⚙</button>
    <a href="https://buymeacoffee.com/koosoli" target="_blank" class="btn btn-secondary" title="Buy me a coffee">
      <span class="mdi mdi-coffee" style="font-size: 18px;"></span>
    </a>
    <button id="mobilePropsBtn" class="btn btn-secondary"><svg viewBox="0 0 24 24" width="18" height="18" fill="none"
        stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="3"></circle>
        <path
          d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z">
        </path>
      </svg></button>
  </div>
</header>
`,ls=`    <aside class="sidebar" role="complementary" aria-label="Editor Sidebar">
      <div id="pagesSection" class="sidebar-section collapsible expanded">
        <div class="sidebar-section-label" id="pagesHeader"
          style="padding: 12px 16px 8px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: background 0.2s; border-radius: 4px;"
          title="Click to view all pages">
          <div style="display: flex; align-items: center; gap: 8px;">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            <span style="font-weight: 600;">PAGES</span>
          </div>
          <svg class="chevron" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor"
            stroke-width="3" style="transition: transform 0.2s; transform: rotate(0deg);">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

        <div id="pagesContent" class="collapsible-content" style="padding: 0 16px 12px;">
          <div id="pageList" class="page-list"></div>
          <button id="addPageBtn" class="btn btn-secondary btn-full" style="margin-top: 8px;">+ Add page</button>
          <button id="clearAllBtn" class="btn btn-secondary btn-full" style="margin-top: 4px;"
            title="Remove all widgets from current page">Clear Current Page</button>
        </div>
      </div>

      <div class="sidebar-section" style="flex: 1; overflow-y: auto;">
        <div class="sidebar-section-label" style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
            </svg>
            <span>Widgets</span>
          </div>
          <button id="quickSearchBtn" class="btn-icon btn-xs" title="Quick Search (Shift+Space)" style="opacity: 0.6;">
            <span class="mdi mdi-magnify" style="font-size: 14px;"></span>
          </button>
        </div>
        <div id="widgetPalette" class="widget-list"></div>
      </div>

      <div class="sidebar-section">
        <div id="currentLayoutIndicator"
          style="background: rgba(255,255,255,0.03); padding: 6px 10px; border-radius: 6px; margin-bottom: 6px; font-size: 10px;">
          <div style="color: var(--muted); margin-bottom: 4px; display: flex; justify-content: space-between;">
            <span>LAYOUT</span>
            <span id="sidebarStatus" style="font-size: 10px; opacity: 0.6;">Ready</span>
          </div>
          <strong id="currentLayoutName">Loading...</strong>
        </div>
        <div style="display: flex; gap: 4px;">
          <button id="saveLayoutBtn" class="btn btn-secondary" style="flex: 1;">Save Layout</button>
          <button id="importLayoutBtn" class="btn btn-secondary" style="flex: 1;">Import Layout</button>
        </div>
        <input type="file" id="loadLayoutBtn" accept=".json" style="display:none;" />
        <button id="manageLayoutsBtn" class="btn btn-secondary btn-full" style="margin-top: 4px;">📁 Layout
          Manager</button>
      </div>
    </aside>`,ds=`      <div class="code-panel">
        <div class="code-panel-header">
          <div class="code-panel-title">
            <button id="toggleYamlBtn" class="btn-icon btn-xs code-toggle-btn" title="Toggle YAML Panel">
              <svg class="chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor"
                stroke-width="3">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            ESPHome YAML
          </div>
          <div class="code-panel-actions">
            <button id="toggleHighlightBtn" class="btn btn-secondary btn-xs btn-icon" title="Toggle Syntax Highlighting"
              style="width: auto; padding: 0 6px; border-radius: 4px;">
              <span class="mdi mdi-palette-outline" style="font-size: 14px;"></span>
            </button>
            <button id="aiPromptBtn" class="btn btn-secondary btn-xs btn-icon" title="AI Assistant"
              style="width: auto; padding: 0 6px; border-radius: 4px;">
              <span class="mdi mdi-robot-outline" style="font-size: 14px;"></span>
            </button>
            <button id="copySnippetBtn" class="btn btn-secondary btn-xs" title="Copy full YAML output">
              <span class="mdi mdi-content-copy" style="font-size: 12px; margin-right: 4px;"></span>All
            </button>
            <button id="copyLambdaBtn" class="btn btn-secondary btn-xs" title="Copy display lambda only (C++ code)">
              <span class="mdi mdi-content-copy" style="font-size: 12px; margin-right: 4px;"></span>λ
            </button>
            <button id="copyOEPLServiceBtn" class="btn btn-secondary btn-xs" style="display:none;"
              title="Copy full HA Service Call">
              <span class="mdi mdi-content-copy" style="font-size: 12px; margin-right: 4px;"></span>OEPL
            </button>
            <button id="copyODPServiceBtn" class="btn btn-secondary btn-xs" style="display:none;"
              title="Copy full HA Service Call">
              <span class="mdi mdi-content-copy" style="font-size: 12px; margin-right: 4px;"></span>ODP
            </button>
            <button id="fullscreenSnippetBtn" class="btn btn-secondary btn-xs btn-icon" title="Expand code panel"
              style="width: auto; padding: 0 6px; border-radius: 4px;">
              <span class="mdi mdi-fullscreen" style="font-size: 14px;"></span>
            </button>
            <button id="clearYamlOverrideBtn" class="btn btn-secondary btn-xs" style="display:none;"
              title="Return to the generated YAML for this layout">
              Auto
            </button>
            <button id="updateLayoutBtn" class="btn btn-secondary btn-xs btn-icon" title="Import YAML back to canvas"
              style="width: auto; padding: 0 6px; border-radius: 4px;">
              <span class="mdi mdi-import" style="font-size: 14px;"></span>
            </button>
          </div>
        </div>
        <div id="oeplNotice" class="oepl-notice hidden"
          style="background: rgba(255, 159, 67, 0.1); border-bottom: 1px solid rgba(255, 159, 67, 0.2); padding: 8px 12px; font-size: 10px; color: #ff9f43; display: flex; align-items: center; gap: 8px;">
          <span class="mdi mdi-alert-circle-outline" style="font-size: 14px;"></span>
          <div>
            <strong>OpenEpaperLink JSON (Beta)</strong> - Copy this to Home Assistant → Developer Tools → Services →
            <code>open_epaper_link.drawcustom</code>
          </div>
        </div>
        <div id="odpNotice" class="odp-notice hidden"
          style="background: rgba(82, 199, 234, 0.1); border-bottom: 1px solid rgba(82, 199, 234, 0.2); padding: 8px 12px; font-size: 10px; color: var(--accent); display: flex; align-items: center; gap: 8px;">
          <span class="mdi mdi-informational" style="font-size: 14px;"></span>
          <div>
            <strong>OpenDisplay JSON (ODP)</strong> - Compatible with ODP v1 primitives.
          </div>
        </div>
        <div class="snippet-container">
          <pre id="highlightLayer" class="highlight-layer" aria-hidden="true"></pre>
          <textarea id="snippetBox" class="snippet-box" spellcheck="false"
            placeholder="# Click 'Generate' to see the ESPHome configuration..."></textarea>
        </div>
      </div>
`,cs=`    <aside class="right-panel" role="complementary" aria-label="Widget Properties">
      <!-- Hierarchy Panel -->
      <div class="sidebar-section" style="border-bottom: 1px solid var(--border-subtle);">
        <div class="sidebar-section-label"
          style="padding: 12px 16px 8px; display: flex; justify-content: space-between; align-items: center; cursor: pointer;"
          id="hierarchyHeader">
          <div style="display: flex; align-items: center; gap: 8px;">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="2" width="18" height="18" rx="2"></rect>
              <line x1="7" y1="8" x2="17" y2="8"></line>
              <line x1="7" y1="12" x2="17" y2="12"></line>
              <line x1="7" y1="16" x2="17" y2="16"></line>
            </svg>
            <span>Hierarchy</span>
          </div>
          <svg class="chevron" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor"
            stroke-width="3" style="transition: transform 0.2s; transform: rotate(0deg);">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        <div id="hierarchyPanel" class="hierarchy-content"
          style="max-height: 250px; overflow-y: auto; padding: 0 8px 8px;">
          <div id="hierarchyList" class="hierarchy-list"></div>
        </div>
      </div>

      <div class="sidebar-section-label"
        style="padding: 12px 16px 0; display: flex; justify-content: space-between; align-items: center;">
        <span>Properties</span>
        <label style="display:flex; align-items:center; gap:4px; font-size:10px; cursor:pointer;" title="Snap to grid">
          <input id="snapToggle" type="checkbox" checked style="width:12px; height:12px;" />
          <span>Snap</span>
        </label>
        <label style="display:flex; align-items:center; gap:4px; font-size:10px; cursor:pointer;"
          title="Lock position (Ctrl+L)">
          <input id="lockPositionToggle" type="checkbox" style="width:12px; height:12px;" />
          <span>Lock</span>
        </label>
      </div>
      <div id="propertiesPanel" class="properties-content">
        <div class="empty-state">
          Select a widget on the canvas to edit its properties.
        </div>
      </div>
    </aside>`,ps=`<!-- Modals -->
<!-- Fullscreen Modal -->
<div id="snippetFullscreenModal" class="modal-backdrop hidden">
  <div class="modal">
    <div class="modal-header">
      <div style="display: flex; align-items: center; gap: 12px;">
        ESPHome YAML (Fullscreen)
        <button id="toggleFullscreenHighlightBtn" class="btn btn-secondary btn-xs btn-icon"
          title="Toggle Syntax Highlighting" style="width: auto; padding: 0 6px; border-radius: 4px;">
          <span class="mdi mdi-palette-outline" style="font-size: 14px;"></span>
        </button>
      </div>
      <button id="snippetFullscreenClose" class="btn btn-secondary">Close</button>
    </div>
    <div class="modal-body">
      <div class="snippet-container" id="snippetFullscreenContainer" style="height: 100%;">
        <pre id="snippetFullscreenHighlight" class="highlight-layer" aria-hidden="true"></pre>
        <div id="snippetFullscreenContent" style="width: 100%; height: 100%;"></div>
      </div>
    </div>
  </div>
</div>

<!-- Import Modal -->
<div id="importSnippetModal" class="modal-backdrop hidden">
  <div class="modal">
    <div class="modal-header">
      <div>Import Layout from YAML</div>
      <button id="importSnippetCancel" class="btn btn-secondary">Cancel</button>
    </div>
    <div class="modal-body">
      <textarea id="importSnippetTextarea" class="prop-input" style="height:400px; font-family:monospace;"
        placeholder="# Paste ESPHome YAML here..."></textarea>
      <div id="importSnippetError" style="color:var(--danger); font-size:11px; margin-top:8px;"></div>
    </div>
    <div class="modal-actions">
      <button id="importSnippetConfirm" class="btn btn-secondary">Import</button>
    </div>
  </div>
</div>

<!-- Page Settings Modal -->
<div id="pageSettingsModal" class="modal-backdrop hidden">
  <div class="modal">
    <div class="modal-header">
      <div>Page Settings</div>
      <button id="pageSettingsClose" class="btn btn-secondary">Close</button>
    </div>
    <div class="modal-body">
      <div class="field">
        <div class="prop-label">Page Name</div>
        <input id="pageSettingsName" class="prop-input" type="text" />
      </div>
      <div class="field">
        <div class="prop-label">Refresh Mode</div>
        <select id="pageSettingsRefreshMode" class="prop-input">
          <option value="interval">Periodic Interval</option>
          <option value="daily">Daily at specific time</option>
        </select>
      </div>
      <div class="field" id="field-refresh-interval">
        <div class="prop-label">Interval (seconds)</div>
        <input id="pageSettingsRefresh" class="prop-input" type="number" min="0" placeholder="60" />
      </div>
      <div class="field" id="field-refresh-time" style="display:none;">
        <div class="prop-label">Wake-up Time (HH:MM)</div>
        <input id="pageSettingsRefreshTime" class="prop-input" type="time" />
      </div>
      <div class="field">
        <div class="prop-label">Visibility Window</div>
        <div style="display: flex; gap: 8px;">
          <div style="flex: 1;">
            <div style="font-size: 10px; color: var(--muted); margin-bottom: 2px;">Start (Optional)</div>
            <input id="pageSettingsVisibleFrom" class="prop-input" type="time" />
          </div>
          <div style="flex: 1;">
            <div style="font-size: 10px; color: var(--muted); margin-bottom: 2px;">End (Optional)</div>
            <input id="pageSettingsVisibleTo" class="prop-input" type="time" />
          </div>
        </div>
      </div>
      <div class="field">
        <div class="prop-label">Visual Style</div>
        <select id="pageSettingsDarkMode" class="prop-input">
          <option value="inherit">Inherit Global</option>
          <option value="light">Always Light</option>
          <option value="dark">Always Dark</option>
        </select>
      </div>
      <div class="field">
        <div class="prop-label">Layout Mode (LVGL)</div>
        <select id="pageSettingsLayoutMode" class="prop-input">
          <option value="absolute">Absolute Positioning</option>
          <option value="grid">Grid Layout</option>
        </select>
        <div id="field-grid-size" style="display:none; margin-top:8px;">
          <div class="prop-label">Grid Size (RxC)</div>
          <input id="pageSettingsGridSize" class="prop-input" type="text" placeholder="4x4" pattern="[0-9]+x[0-9]+" />
          <div style="font-size:10px; color:var(--muted); margin-top:4px;">Format: rows×columns, e.g. 2x3, 4x4</div>
        </div>
      </div>
    </div>
    <div class="modal-actions">
      <button id="pageSettingsSave" class="btn btn-secondary">Save Changes</button>
    </div>
  </div>
</div>

<!-- Device Settings Modal -->
<div id="deviceSettingsModal" class="modal-backdrop hidden">
  <div class="modal">
    <div class="modal-header">
      <div>Device Settings</div>
      <button id="deviceSettingsClose" class="btn btn-secondary">Close</button>
    </div>
    <div class="modal-body">
      <div class="settings-grid">
        <!-- PRIMARY SETTINGS (Top 2x2 Grid) -->
        <div class="primary-settings-grid">
          <div class="field">
            <div class="prop-label">Friendly Name</div>
            <input id="deviceName" class="prop-input" type="text" placeholder="My E-Ink Device" />
          </div>

          <div class="field" id="renderingModeField">
            <div class="prop-label">Rendering Mode</div>
            <select id="renderingMode" class="prop-input">
              <option value="direct">Direct (Display Lambda)</option>
              <option value="lvgl">LVGL (Recommended for LCD)</option>
              <option value="oepl">OpenEpaperLink JSON (Drawing Protocol)</option>
              <option value="opendisplay">OpenDisplay JSON (ODP)</option>
            </select>
          </div>

          <div class="field">
            <div class="prop-label">Screen Orientation</div>
            <select id="deviceOrientation" class="prop-input">
              <option value="landscape">Landscape</option>
              <option value="portrait">Portrait</option>
            </select>
          </div>
        </div>

        <!-- SECONDARY SETTINGS (Left Column) -->
        <div class="settings-column">
          <!-- Dynamic Hardware Profile Section (ESPHome Only) -->
          <div class="field" id="deviceModelField"
            style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px; margin-bottom: 8px;">
            <div class="prop-label" style="display:flex; justify-content:space-between; align-items:center;">
              <span>Hardware Profile</span>
              <div style="display: flex; gap: 4px;">
                <button id="reloadHardwareBtn" class="btn btn-secondary btn-xs"
                  style="font-size: 10px; padding: 2px 6px;" title="Reload hardware profiles from server">⟳
                  Reload</button>
                <button id="importHardwareBtn" class="btn btn-secondary btn-xs"
                  style="font-size: 10px; padding: 2px 6px;">Import Recipe</button>
              </div>
            </div>
            <select id="deviceModel" class="prop-input">
              <option value="custom">Custom Profile...</option>
            </select>
            <input type="file" id="hardwareFileInput" accept=".yaml" style="display:none;" />
          </div>

          <!-- OpenEpaperLink Settings -->
          <div id="oeplSettingsSection" style="display:none;">
            <div style="font-size: 11px; font-weight: bold; color: var(--accent); margin-bottom: 8px;">
              OpenEpaperLink Configuration</div>
            <div class="field">
              <div class="prop-label">OEPL Tag Entity ID</div>
              <input id="oeplEntityId" class="prop-input" type="text" placeholder="open_epaper_link.0000000000000000" />
            </div>
            <div class="field">
              <div class="prop-label">Dithering Algorithm</div>
              <select id="oeplDither" class="prop-input">
                <option value="0">None (Faster)</option>
                <option value="1">Ordered</option>
                <option value="2" selected>Burkes (Recommended)</option>
                <option value="3">Atkinson</option>
                <option value="4">Floyd-Steinberg</option>
                <option value="5">Jarvis-Judice-Ninke</option>
                <option value="6">Stucki</option>
                <option value="7">Sierra</option>
              </select>
            </div>
          </div>

          <!-- OpenDisplay Settings -->
          <div id="odpSettingsSection" style="display:none;">
            <div style="font-size: 11px; font-weight: bold; color: var(--accent); margin-bottom: 8px;">
              OpenDisplay Configuration (ODP)</div>
            <div class="field">
              <div class="prop-label">ODP Display Entity ID</div>
              <input id="opendisplayEntityId" class="prop-input" type="text"
                placeholder="opendisplay.0000000000000000" />
            </div>
            <div class="field">
              <div class="prop-label">Dithering Algorithm</div>
              <select id="opendisplayDither" class="prop-input">
                <option value="0">None (Faster)</option>
                <option value="1">Ordered</option>
                <option value="2" selected>Burkes (Recommended)</option>
                <option value="3">Atkinson</option>
                <option value="4">Floyd-Steinberg</option>
                <option value="5">Jarvis-Judice-Ninke</option>
                <option value="6">Stucki</option>
                <option value="7">Sierra</option>
              </select>
            </div>
            <div class="field">
              <div class="prop-label">Update Interval (TTL)</div>
              <input id="opendisplayTtl" class="prop-input" type="number" min="0" placeholder="60" />
              <div style="font-size:9px; color:var(--muted); margin-top:4px;">In seconds. 0 = never expires.</div>
            </div>
          </div>

          <!-- Custom Hardware Section -->
          <div id="customHardwareSection"
            style="display:none; border:1px solid var(--accent); border-radius:8px; padding:12px; background: rgba(82, 199, 234, 0.03);">
            <div
              style="font-size:11px; font-weight:bold; color:var(--accent); margin-bottom:12px; display:flex; align-items:center; gap:8px;">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                <path
                  d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z">
                </path>
              </svg>
              Custom Hardware Pinout
            </div>

            <div class="hardware-group" style="border:none; margin:0; padding:0;">
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                <div class="field">
                  <div class="prop-label" style="font-size:10px;">Chip Type</div>
                  <select id="customChip" class="prop-input-sm">
                    <option value="esp32-s3">ESP32-S3</option>
                    <option value="esp32">ESP32</option>
                    <option value="esp32-c3">ESP32-C3</option>
                    <option value="esp32-c6">ESP32-C6</option>
                    <option value="esp8266">ESP8266 (Experimental)</option>
                  </select>
                </div>
                <div class="field">
                  <div class="prop-label" style="font-size:10px;">Tech</div>
                  <select id="customTech" class="prop-input-sm">
                    <option value="lcd">LCD / OLED</option>
                    <option value="epaper">E-Paper</option>
                  </select>
                </div>
              </div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                <div class="field">
                  <div class="prop-label" style="font-size:10px;">Resolution Preset</div>
                  <select id="customResPreset" class="prop-input-sm">
                    <option value="custom">Manual...</option>
                    <!-- LCD / OLED -->
                    <optgroup label="LCD / OLED">
                      <option value="128x64">128x64 (0.96")</option>
                      <option value="128x128">128x128 (1.44")</option>
                      <option value="240x240">240x240 (1.3/1.54")</option>
                      <option value="320x240">320x240 (2.4/2.8")</option>
                      <option value="320x480">320x480 (3.5")</option>
                      <option value="480x320">480x320 (3.5" alt)</option>
                      <option value="480x480">480x480 (Round/Square)</option>
                      <option value="800x480">800x480 (4-7")</option>
                      <option value="1024x600">1024x600 (7-10")</option>
                    </optgroup>
                    <!-- E-Paper -->
                    <optgroup label="E-Paper">
                      <option value="250x122">2.13" (250x122)</option>
                      <option value="296x128">2.9" (296x128)</option>
                      <option value="400x300">4.2" (400x300)</option>
                      <option value="600x448">5.65" (600x448 7-Color)</option>
                      <option value="640x384">5.83" (640x384)</option>
                      <option value="800x480">7.5" (800x480)</option>
                      <option value="880x528">7.5" HD (880x528)</option>
                    </optgroup>
                  </select>
                </div>
                <div class="field">
                  <div class="prop-label" style="font-size:10px;">Shape</div>
                  <select id="customShape" class="prop-input-sm">
                    <option value="rect">Rectangle</option>
                    <option value="round">Round</option>
                  </select>
                </div>
              </div>
              <div class="field">
                <div class="prop-label" style="font-size:10px;">Manual Resolution</div>
                <input id="customRes" class="prop-input-sm" type="text" placeholder="800x480" value="800x480" />
              </div>
              <div style="display:flex; gap:16px; margin-top:8px;">
                <label style="display:flex; align-items:center; gap:6px; font-size:10px; cursor:pointer;">
                  <input id="customPsram" type="checkbox" checked />
                  <span>PSRAM</span>
                </label>
                <label style="display:flex; align-items:center; gap:6px; font-size:10px; cursor:pointer;">
                  <input id="customAntiburn" type="checkbox" />
                  <span>Anti-burn (LCD)</span>
                </label>
              </div>
            </div>

            <!-- GPIO Pin Datalists (allows dropdown + free text) -->
            <datalist id="gpio-pins-esp32">
              <option value="">— None —</option>
              <option value="GPIO0">GPIO0 (boot)</option>
              <option value="GPIO1">GPIO1 (TX)</option>
              <option value="GPIO2">GPIO2</option>
              <option value="GPIO3">GPIO3 (RX)</option>
              <option value="GPIO4">GPIO4</option>
              <option value="GPIO5">GPIO5</option>
              <option value="GPIO12">GPIO12</option>
              <option value="GPIO13">GPIO13</option>
              <option value="GPIO14">GPIO14</option>
              <option value="GPIO15">GPIO15</option>
              <option value="GPIO16">GPIO16</option>
              <option value="GPIO17">GPIO17</option>
              <option value="GPIO18">GPIO18 (VSPI CLK)</option>
              <option value="GPIO19">GPIO19 (VSPI MISO)</option>
              <option value="GPIO21">GPIO21 (I2C SDA)</option>
              <option value="GPIO22">GPIO22 (I2C SCL)</option>
              <option value="GPIO23">GPIO23 (VSPI MOSI)</option>
              <option value="GPIO25">GPIO25</option>
              <option value="GPIO26">GPIO26</option>
              <option value="GPIO27">GPIO27</option>
              <option value="GPIO32">GPIO32</option>
              <option value="GPIO33">GPIO33</option>
              <option value="GPIO34">GPIO34 (input only)</option>
              <option value="GPIO35">GPIO35 (input only)</option>
              <option value="GPIO36">GPIO36 (input only)</option>
              <option value="GPIO39">GPIO39 (input only)</option>
            </datalist>
            <datalist id="gpio-pins-esp32s3">
              <option value="">— None —</option>
              <option value="GPIO0">GPIO0</option>
              <option value="GPIO1">GPIO1</option>
              <option value="GPIO2">GPIO2</option>
              <option value="GPIO3">GPIO3</option>
              <option value="GPIO4">GPIO4</option>
              <option value="GPIO5">GPIO5</option>
              <option value="GPIO6">GPIO6</option>
              <option value="GPIO7">GPIO7</option>
              <option value="GPIO8">GPIO8</option>
              <option value="GPIO9">GPIO9</option>
              <option value="GPIO10">GPIO10</option>
              <option value="GPIO11">GPIO11</option>
              <option value="GPIO12">GPIO12</option>
              <option value="GPIO13">GPIO13</option>
              <option value="GPIO14">GPIO14</option>
              <option value="GPIO15">GPIO15</option>
              <option value="GPIO16">GPIO16</option>
              <option value="GPIO17">GPIO17</option>
              <option value="GPIO18">GPIO18</option>
              <option value="GPIO19">GPIO19</option>
              <option value="GPIO20">GPIO20</option>
              <option value="GPIO21">GPIO21</option>
              <option value="GPIO38">GPIO38</option>
              <option value="GPIO39">GPIO39</option>
              <option value="GPIO40">GPIO40</option>
              <option value="GPIO41">GPIO41</option>
              <option value="GPIO42">GPIO42</option>
              <option value="GPIO45">GPIO45</option>
              <option value="GPIO46">GPIO46</option>
              <option value="GPIO47">GPIO47</option>
              <option value="GPIO48">GPIO48</option>
            </datalist>
            <datalist id="gpio-pins-esp8266">
              <option value="">— None —</option>
              <option value="GPIO16">GPIO16 (D0 - Wake)</option>
              <option value="GPIO5">GPIO5 (D1 - SCL)</option>
              <option value="GPIO4">GPIO4 (D2 - SDA)</option>
              <option value="GPIO0">GPIO0 (D3 - Flash)</option>
              <option value="GPIO2">GPIO2 (D4 - LED)</option>
              <option value="GPIO14">GPIO14 (D5 - SCK)</option>
              <option value="GPIO12">GPIO12 (D6 - MISO)</option>
              <option value="GPIO13">GPIO13 (D7 - MOSI)</option>
              <option value="GPIO15">GPIO15 (D8 - CS)</option>
              <option value="GPIO3">GPIO3 (RX)</option>
              <option value="GPIO1">GPIO1 (TX)</option>
              <option value="GPIO10">GPIO10 (SD3 - Flash)</option>
              <option value="GPIO9">GPIO9 (SD2 - Flash)</option>
            </datalist>

            <div class="hardware-group" style="margin-top:12px;">
              <div class="prop-label" style="font-size:10px; margin-bottom:4px;">Display (SPI)</div>
              <select id="customDisplayDriver" class="prop-input-sm" style="margin-bottom:8px;">
                <option value="st7789v">ST7789 (LCD)</option>
                <option value="ili9341">ILI9341 (LCD)</option>
                <option value="ili9342">ILI9342 (LCD)</option>
                <option value="ili9488">ILI9488 (LCD)</option>
                <option value="waveshare_epaper">Waveshare E-Paper</option>
                <option value="epaper_spi">Generic SPI E-Paper</option>
                <option value="custom">Other (Custom YAML)</option>
              </select>

              <div id="customDisplayModelField" class="field" style="display:none; margin-bottom:8px;">
                <div class="prop-label" style="font-size:10px;">Display Model</div>
                <input id="customDisplayModel" class="prop-input-sm" type="text" placeholder="e.g. 7.50inV2"
                  list="waveshare_models" />
                <div style="font-size:9px; color:var(--muted);">Required for Waveshare E-Paper</div>

                <datalist id="waveshare_models">
                  <option value="1.54in">1.54"</option>
                  <option value="1.54inv2">1.54" V2</option>
                  <option value="2.13in">2.13"</option>
                  <option value="2.13inv2">2.13" V2</option>
                  <option value="2.13inv3">2.13" V3</option>
                  <option value="2.13in-ttgo">2.13" TTGO</option>
                  <option value="2.66in">2.66"</option>
                  <option value="2.70in">2.70"</option>
                  <option value="2.90in">2.90"</option>
                  <option value="2.90inv2">2.90" V2</option>
                  <option value="2.90in-dke">2.90" DKE</option>
                  <option value="3.52in">3.52"</option>
                  <option value="3.70in">3.70"</option>
                  <option value="4.20in">4.20"</option>
                  <option value="4.20inv2">4.20" V2</option>
                  <option value="5.65in">5.65" (Color)</option>
                  <option value="5.83in">5.83"</option>
                  <option value="5.83inv2">5.83" V2</option>
                  <option value="7.50in">7.50"</option>
                  <option value="7.50inv2">7.50" V2</option>
                  <option value="7.50inv2p">7.50" V2 (Partial Refresh)</option>
                  <option value="7.50hd">7.50" HD</option>
                </datalist>
              </div>

              <div id="spiPinsGrid" style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px;">
                <div class="field">
                  <div class="prop-label" style="font-size:9px;">CS</div>
                  <input id="pin_cs" class="prop-input-sm" type="text" list="gpio-pins-esp32s3" placeholder="GPIO10" />
                </div>
                <div class="field">
                  <div class="prop-label" style="font-size:9px;">DC</div>
                  <input id="pin_dc" class="prop-input-sm" type="text" list="gpio-pins-esp32s3" placeholder="GPIO11" />
                </div>
                <div class="field">
                  <div class="prop-label" style="font-size:9px;">RST <span style="opacity:0.5">(opt)</span></div>
                  <div style="display:flex; gap:2px;">
                    <input id="pin_rst" class="prop-input-sm" type="text" list="gpio-pins-esp32s3"
                      placeholder="(optional)" style="flex:1;" />
                    <button type="button" class="clear-pin-btn" data-target="pin_rst" title="Clear"
                      style="padding:0 4px; font-size:10px; background:#eee; border:1px solid #ccc; border-radius:3px; cursor:pointer;">×</button>
                  </div>
                </div>
                <div class="field">
                  <div class="prop-label" style="font-size:9px;">BUSY <span style="opacity:0.5">(opt)</span></div>
                  <div style="display:flex; gap:2px;">
                    <input id="pin_busy" class="prop-input-sm" type="text" list="gpio-pins-esp32s3"
                      placeholder="(optional)" style="flex:1;" />
                    <button type="button" class="clear-pin-btn" data-target="pin_busy" title="Clear"
                      style="padding:0 4px; font-size:10px; background:#eee; border:1px solid #ccc; border-radius:3px; cursor:pointer;">×</button>
                  </div>
                </div>
                <div class="field">
                  <div class="prop-label" style="font-size:9px;">CLK</div>
                  <input id="pin_clk" class="prop-input-sm" type="text" list="gpio-pins-esp32s3" placeholder="GPIO18" />
                </div>
                <div class="field">
                  <div class="prop-label" style="font-size:9px;">MOSI</div>
                  <input id="pin_mosi" class="prop-input-sm" type="text" list="gpio-pins-esp32s3"
                    placeholder="GPIO23" />
                </div>
              </div>
            </div>

            <!-- Backlight & I2C Pins -->
            <div class="hardware-group" style="margin-top:12px;">
              <div class="prop-label" style="font-size:10px; margin-bottom:4px;">Backlight & I2C</div>
              <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px;">
                <div class="field">
                  <div class="prop-label" style="font-size:9px;">Backlight</div>
                  <input id="pin_backlight" class="prop-input-sm" type="text" list="gpio-pins-esp32s3"
                    placeholder="GPIO45" />
                </div>
                <div class="field">
                  <div class="prop-label" style="font-size:9px;">I2C SDA</div>
                  <input id="pin_sda" class="prop-input-sm" type="text" list="gpio-pins-esp32s3" placeholder="GPIO21" />
                </div>
                <div class="field">
                  <div class="prop-label" style="font-size:9px;">I2C SCL</div>
                  <input id="pin_scl" class="prop-input-sm" type="text" list="gpio-pins-esp32s3" placeholder="GPIO22" />
                </div>
              </div>
            </div>

            <!-- Touch Controller -->
            <div class="hardware-group" style="margin-top:12px;">
              <div class="prop-label" style="font-size:10px; margin-bottom:4px;">Touch Controller</div>
              <select id="customTouchTech" class="prop-input-sm" style="margin-bottom:8px;">
                <option value="none">None</option>
                <option value="gt911">GT911 (I2C)</option>
                <option value="cst816">CST816 (I2C)</option>
                <option value="ft5x06">FT5x06 (I2C)</option>
                <option value="xpt2046">XPT2046 (SPI)</option>
              </select>
              <div id="touchPinsGrid" style="display:none; grid-template-columns:1fr 1fr; gap:6px;">
                <div class="field">
                  <div class="prop-label" style="font-size:9px;">Touch INT</div>
                  <input id="pin_touch_int" class="prop-input-sm" type="text" list="gpio-pins-esp32s3"
                    placeholder="GPIO4" />
                </div>
                <div class="field">
                  <div class="prop-label" style="font-size:9px;">Touch RST</div>
                  <input id="pin_touch_rst" class="prop-input-sm" type="text" list="gpio-pins-esp32s3"
                    placeholder="GPIO5" />
                </div>
              </div>
            </div>

            <!-- Power / Battery -->
            <div class="hardware-group" style="margin-top:12px;">
              <div class="prop-label" style="font-size:10px; margin-bottom:4px;">Power / Battery</div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
                <div class="field">
                  <div class="prop-label" style="font-size:9px;">Battery ADC <span style="opacity:0.5">(opt)</span>
                  </div>
                  <div style="display:flex; gap:2px;">
                    <input id="pin_battery_adc" class="prop-input-sm" type="text" list="gpio-pins-esp32s3"
                      placeholder="e.g. GPIO1" style="flex:1;" />
                    <button type="button" class="clear-pin-btn" data-target="pin_battery_adc" title="Clear"
                      style="padding:0 4px; font-size:10px; background:#eee; border:1px solid #ccc; border-radius:3px; cursor:pointer;">×</button>
                  </div>
                </div>
                <div class="field">
                  <div class="prop-label" style="font-size:9px;">Battery Enable <span style="opacity:0.5">(opt)</span>
                  </div>
                  <div style="display:flex; gap:2px;">
                    <input id="pin_battery_enable" class="prop-input-sm" type="text" list="gpio-pins-esp32s3"
                      placeholder="e.g. GPIO21" style="flex:1;" />
                    <button type="button" class="clear-pin-btn" data-target="pin_battery_enable" title="Clear"
                      style="padding:0 4px; font-size:10px; background:#eee; border:1px solid #ccc; border-radius:3px; cursor:pointer;">×</button>
                  </div>
                </div>
              </div>
              <div style="font-size:9px; color:var(--muted); margin-top:4px;">ADC pin reads battery voltage. Enable
                pin powers battery circuit (optional).</div>
            </div>

            <div class="field" style="margin-top:12px; border-top:1px solid var(--border-subtle); padding-top:8px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <div class="prop-label" style="font-size:10px; margin-bottom:0;">Recipe Name</div>
                <div id="customProfileEditIndicator"
                  style="display:none; font-size:9px; color:var(--warning); font-weight:bold; background:rgba(255,165,0,0.1); padding:2px 6px; border-radius:4px;">
                  Editing
                </div>
              </div>
              <input id="customProfileName" class="prop-input-sm" type="text" placeholder="e.g. My Custom S3" />
            </div>

            <button id="saveCustomProfileBtn" class="btn btn-primary btn-full" type="button" style="margin-top:12px;">
              🚀 Save Profile
            </button>
          </div>

          <!-- Protocol Hardware Section (OEPL / ODP) -->
          <div id="protocolHardwareSection"
            style="display:none; border:1px solid var(--accent); border-radius:8px; padding:12px; background: rgba(82, 199, 234, 0.03);">
            <div
              style="font-size:11px; font-weight:bold; color:var(--accent); margin-bottom:12px; display:flex; align-items:center; gap:8px;">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              Protocol Hardware Specs
            </div>

            <div class="field">
              <div class="prop-label">Resolution Preset</div>
              <select id="protocolResPreset" class="prop-input">
                <option value="custom">Manual...</option>
                <option value="296x128">2.9" (296x128)</option>
                <option value="400x300">4.2" (400x300)</option>
                <option value="800x480">7.5" (800x480)</option>
                <option value="640x384">5.83" (640x384)</option>
                <option value="250x122">2.13" (250x122)</option>
              </select>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
              <div class="field">
                <div class="prop-label">Width</div>
                <input id="protocolWidth" class="prop-input" type="number" value="400" />
              </div>
              <div class="field">
                <div class="prop-label">Height</div>
                <input id="protocolHeight" class="prop-input" type="number" value="300" />
              </div>
            </div>

            <div class="field">
              <div class="prop-label">Color Mode</div>
              <select id="protocolColorMode" class="prop-input">
                <option value="bw">Monochrome (B/W)</option>
                <option value="grayscale">Grayscale</option>
                <option value="color_3">3-Color (BWR / BWY)</option>
                <option value="full_color">Full Color</option>
              </select>
            </div>
          </div>

          <!-- Global Preferences -->
          <div class="field" style="margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border-subtle);">
            <label style="display:flex; align-items:center; gap:8px; cursor:pointer;">
              <input id="deviceDarkMode" type="checkbox" />
              <span style="font-size:var(--fs-xs); font-weight:600;">Dark Mode</span>
            </label>
          </div>

          <div class="field" id="deviceInvertedColorsField">
            <label style="display:flex; align-items:center; gap:8px; cursor:pointer;">
              <input id="deviceInvertedColors" type="checkbox" />
              <span style="font-size:var(--fs-xs); font-weight:600;">Inverted Colors (E-Paper)</span>
            </label>
          </div>
        </div>
      </div>

      <div id="powerStrategySection"
        style="border-top:1px solid var(--border-subtle); margin-top:16px; padding-top:16px;">
        <div class="prop-label">Power & Refresh Strategy</div>

        <div id="global-refresh-row"
          style="margin-top: 12px; margin-bottom: 16px; background: rgba(82, 199, 234, 0.05); padding: 10px; border-radius: 6px; border-left: 3px solid var(--accent);">
          <div class="prop-label" style="font-size: 11px; margin-bottom: 4px;">Global Refresh Interval</div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <input type="number" id="setting-refresh-interval" class="prop-input" placeholder="600" style="width: 80px;"
              min="5">
            <span style="font-size: 11px; opacity: 0.7;">seconds</span>
          </div>
          <div style="font-size: 10px; opacity: 0.6; margin-top: 4px;">Default time between updates. Can be overridden
            on individual pages.</div>
        </div>

        <!-- E-Paper Specific Strategies -->
        <div id="strategy-epaper-group" style="display:flex; flex-direction:column; gap:12px; margin-top:8px;">
          <div
            style="font-size:10px; font-weight:bold; text-transform:uppercase; color:var(--muted); margin-bottom:4px;">
            E-Paper Options</div>

          <!-- Standard -->
          <div>
            <label
              style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:var(--fs-sm); font-weight: 500;">
              <input type="radio" id="mode-standard" name="powerStrategy" value="standard">
              Full Power (Always On)
            </label>
            <div style="font-size:10px; opacity:0.6; margin-left:24px;">Device stays connected to Wi-Fi. Fast
              response, but high battery drain.</div>
          </div>

          <!-- Night Mode -->
          <div>
            <label
              style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:var(--fs-sm); font-weight: 500;">
              <input type="radio" id="setting-sleep-enabled" name="powerStrategy" value="night">
              Eco (Scheduled Night Sleep)
            </label>
            <div style="font-size:10px; opacity:0.6; margin-left:24px; margin-bottom:4px;">Stops refreshing during
              these hours to save energy.</div>
          </div>

          <!-- Daily Refresh -->
          <div>
            <label
              style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:var(--fs-sm); font-weight: 500;">
              <input type="radio" id="setting-daily-refresh-enabled" name="powerStrategy" value="daily">
              Daily Scheduled Refresh
            </label>
            <div style="font-size:10px; opacity:0.6; margin-left:24px; margin-bottom:4px;">Wakes up once per day at a
              specific time.</div>
          </div>

          <!-- Manual Only -->
          <div>
            <label
              style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:var(--fs-sm); font-weight: 500;">
              <input type="radio" id="setting-manual-refresh" name="powerStrategy" value="manual">
              Manual Refresh Only
            </label>
            <div style="font-size:10px; opacity:0.6; margin-left:24px;">Never updates automatically. Only refreshes
              when a button is pressed.</div>
          </div>

          <!-- Deep Sleep -->
          <div>
            <label
              style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:var(--fs-sm); font-weight: 500;">
              <input type="radio" id="setting-deep-sleep-enabled" name="powerStrategy" value="deepsleep">
              Ultra Eco (Deep Sleep)
            </label>
            <div style="font-size:10px; opacity:0.6; margin-left:24px; margin-bottom:4px;">Shuts down completely
              between updates. Best for battery life.</div>
          </div>
        </div>

        <div id="strategy-lcd-group" style="display:none; flex-direction:column; gap:12px; margin-top:8px;">
          <div
            style="font-size:10px; font-weight:bold; text-transform:uppercase; color:var(--muted); margin-bottom:4px;">
            LCD / OLED Options</div>

          <div>
            <label
              style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:var(--fs-sm); font-weight: 500;">
              <input type="radio" name="lcdEcoStrategy" value="always_on">
              Always On (Full Brightness)
            </label>
          </div>

          <div>
            <label
              style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:var(--fs-sm); font-weight: 500;">
              <input type="radio" name="lcdEcoStrategy" value="backlight_off">
              Eco (Backlight Off Schedule)
            </label>
            <div style="font-size:10px; opacity:0.6; margin-left:24px;">Turns off backlight during sleep hours
              (recommended for LCD).</div>
          </div>

          <div id="lcd-strategy-dim-row">
            <label
              style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:var(--fs-sm); font-weight: 500;">
              <input type="radio" name="lcdEcoStrategy" value="dim_after_timeout">
              Eco (Dim after timeout)
            </label>
            <div style="font-size:10px; opacity:0.6; margin-left:24px;">Turns off backlight and pauses LVGL after
              period of inactivity. Resume on touch.</div>
          </div>

          <div>
            <label
              style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:var(--fs-sm); font-weight: 500;">
              <input type="radio" name="lcdEcoStrategy" value="halt_updates">
              Eco (Halt Loop)
            </label>
            <div style="font-size:10px; opacity:0.6; margin-left:24px;">Stops update cycle but leaves screen powered.
            </div>
          </div>

          <div>
            <label
              style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:var(--fs-sm); font-weight: 500;">
              <input type="radio" name="lcdEcoStrategy" value="deep_sleep">
              Ultra Eco (Deep Sleep)
            </label>
            <div style="font-size:10px; opacity:0.6; margin-left:24px;">Power down between updates.</div>
          </div>
        </div>

        <!-- Dim Timeout (Used by LCD Dim after timeout) -->
        <div id="dim-timeout-row"
          style="display:none; align-items:center; gap:8px; margin-left:24px; margin-top:8px; background: rgba(0,0,0,0.03); padding: 4px 8px; border-radius: 4px;">
          <span style="font-size: 11px; opacity: 0.7;">Dim after</span>
          <input type="number" id="setting-dim-timeout" class="prop-input" placeholder="10" style="width:80px;" min="1"
            value="10">
          <span style="font-size: 11px; opacity: 0.7;">seconds</span>
        </div>

        <!-- Common Sleep Times (Used by both) -->
        <div id="sleep-times-row"
          style="display:none; flex-direction:column; gap:8px; margin-left:24px; margin-top:8px; background: rgba(0,0,0,0.03); padding: 8px; border-radius: 4px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size: 11px; opacity: 0.7;">Sleep from</span>
            <select id="setting-sleep-start" class="prop-input" style="width:70px;">
              <option value="0">00:00</option>
              <option value="1">01:00</option>
              <option value="2">02:00</option>
              <option value="3">03:00</option>
              <option value="4">04:00</option>
              <option value="5">05:00</option>
              <option value="6">06:00</option>
              <option value="7">07:00</option>
              <option value="8">08:00</option>
              <option value="9">09:00</option>
              <option value="10">10:00</option>
              <option value="11">11:00</option>
              <option value="12">12:00</option>
              <option value="13">13:00</option>
              <option value="14">14:00</option>
              <option value="15">15:00</option>
              <option value="16">16:00</option>
              <option value="17">17:00</option>
              <option value="18">18:00</option>
              <option value="19">19:00</option>
              <option value="20">20:00</option>
              <option value="21">21:00</option>
              <option value="22">22:00</option>
              <option value="23">23:00</option>
            </select>
            <span style="font-size: 11px; opacity: 0.7;">to</span>
            <select id="setting-sleep-end" class="prop-input" style="width:70px;">
              <option value="0">00:00</option>
              <option value="1">01:00</option>
              <option value="2">02:00</option>
              <option value="3">03:00</option>
              <option value="4">04:00</option>
              <option value="5">05:00</option>
              <option value="6">06:00</option>
              <option value="7">07:00</option>
              <option value="8">08:00</option>
              <option value="9">09:00</option>
              <option value="10">10:00</option>
              <option value="11">11:00</option>
              <option value="12">12:00</option>
              <option value="13">13:00</option>
              <option value="14">14:00</option>
              <option value="15">15:00</option>
              <option value="16">16:00</option>
              <option value="17">17:00</option>
              <option value="18">18:00</option>
              <option value="19">19:00</option>
              <option value="20">20:00</option>
              <option value="21">21:00</option>
              <option value="22">22:00</option>
              <option value="23">23:00</option>
            </select>
          </div>
        </div>

        <div id="daily-refresh-row"
          style="display:none; align-items:center; gap:8px; margin-left:24px; margin-top:8px; background: rgba(0,0,0,0.03); padding: 4px 8px; border-radius: 4px;">
          <span style="font-size: 11px; opacity: 0.7;">Refresh at</span>
          <input type="time" id="setting-daily-refresh-time" class="prop-input" value="08:00" style="width:100px;">
        </div>

        <div id="deep-sleep-interval-row"
          style="display:none; align-items:center; gap:8px; margin-left:24px; margin-top:8px; background: rgba(0,0,0,0.03); padding: 4px 8px; border-radius: 4px;">
          <span style="font-size: 11px; opacity: 0.7;">Update every</span>
          <input type="number" id="setting-deep-sleep-interval" class="prop-input" placeholder="Seconds"
            style="width:80px;">
          <span style="font-size: 11px; opacity: 0.7;">sec</span>
        </div>

        <div id="deep-sleep-options-row"
          style="display:none; flex-direction:column; gap:6px; margin-left:24px; margin-top:8px; background: rgba(0,0,0,0.03); padding: 8px 10px; border-radius: 4px;">
          <div style="font-size:10px; font-weight:600; opacity:0.5; text-transform:uppercase; margin-bottom:2px;">Deep
            Sleep Options</div>
          <label style="display:flex; align-items:center; gap:6px; cursor:pointer; font-size:11px;">
            <input type="checkbox" id="setting-deep-sleep-stay-awake">
            <span>HA Stay-Awake Switch</span>
          </label>
          <div style="font-size:9px; opacity:0.5; margin-left:22px; margin-top:-2px;">Adds a Home Assistant switch to
            prevent deep sleep remotely.</div>
          <label id="deep-sleep-stay-awake-entity-row"
            style="display:flex; flex-direction:column; gap:4px; margin-left:22px; font-size:10px;">
            <span style="opacity:0.7;">Home Assistant entity ID</span>
            <input type="text" id="setting-deep-sleep-stay-awake-entity" class="prop-input"
              placeholder="input_boolean.esphome_stay_awake">
          </label>
          <label style="display:flex; align-items:center; gap:6px; cursor:pointer; font-size:11px;">
            <input type="checkbox" id="setting-deep-sleep-firmware-guard">
            <span>Firmware Flash Guard</span>
          </label>
          <div style="font-size:9px; opacity:0.5; margin-left:22px; margin-top:-2px;">Keeps device awake 90s after new
            firmware to prevent rollback.</div>
        </div>

        <!-- Silent Hours -->
        <div style="border-top:1px solid var(--border-subtle); margin-top:8px; padding-top:12px;">
          <div
            style="display:flex; align-items:center; gap:8px; font-size:var(--fs-sm); font-weight: 500; color: var(--accent);">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <path
                d="M17.22 17.22L2 2M12 2v2M4.93 4.93l1.41 1.41M2 12h2M6.34 17.66l-1.41 1.41M12 22v-2m7.07-2.93l-1.41-1.41M22 12h-2m-3.34-5.66l1.41-1.41M12 7a5 5 0 015 5 4.94 4.94 0 01-.46 2.06M12 17a5 5 0 01-5-5 4.94 4.94 0 01.46-2.06">
              </path>
            </svg>
            Silent Hours (No Refresh Window)
          </div>
          <div style="font-size:10px; opacity:0.6; margin-left:24px; margin-bottom:8px;">Prevent all display
            updates
            during this time window. Used to avoid night-time ghosts/noise.</div>
          <div
            style="display:flex; align-items:center; gap:8px; margin-left:24px; background: rgba(0,0,0,0.03); padding: 4px 8px; border-radius: 4px;">
            <span style="font-size: 11px; opacity: 0.7;">Disable updates from</span>
            <select id="setting-no-refresh-start" class="prop-input" style="width:70px;">
              <option value="">None</option>
              <option value="0">00:00</option>
              <option value="1">01:00</option>
              <option value="2">02:00</option>
              <option value="3">03:00</option>
              <option value="4">04:00</option>
              <option value="5">05:00</option>
              <option value="6">06:00</option>
              <option value="7">07:00</option>
              <option value="8">08:00</option>
              <option value="9">09:00</option>
              <option value="10">10:00</option>
              <option value="11">11:00</option>
              <option value="12">12:00</option>
              <option value="13">13:00</option>
              <option value="14">14:00</option>
              <option value="15">15:00</option>
              <option value="16">16:00</option>
              <option value="17">17:00</option>
              <option value="18">18:00</option>
              <option value="19">19:00</option>
              <option value="20">20:00</option>
              <option value="21">21:00</option>
              <option value="22">22:00</option>
              <option value="23">23:00</option>
            </select>
            <span style="font-size: 11px; opacity: 0.7;">to</span>
            <select id="setting-no-refresh-end" class="prop-input" style="width:70px;">
              <option value="">None</option>
              <option value="0">00:00</option>
              <option value="1">01:00</option>
              <option value="2">02:00</option>
              <option value="3">03:00</option>
              <option value="4">04:00</option>
              <option value="5">05:00</option>
              <option value="6">06:00</option>
              <option value="7">07:00</option>
              <option value="8">08:00</option>
              <option value="9">09:00</option>
              <option value="10">10:00</option>
              <option value="11">11:00</option>
              <option value="12">12:00</option>
              <option value="13">13:00</option>
              <option value="14">14:00</option>
              <option value="15">15:00</option>
              <option value="16">16:00</option>
              <option value="17">17:00</option>
              <option value="18">18:00</option>
              <option value="19">19:00</option>
              <option value="20">20:00</option>
              <option value="21">21:00</option>
              <option value="22">22:00</option>
              <option value="23">23:00</option>
            </select>
          </div>
        </div>

        <!-- Page Auto-Cycling -->
        <div style="border-top:1px solid var(--border-subtle); margin-top:8px; padding-top:12px;">
          <div
            style="display:flex; align-items:center; gap:8px; font-size:var(--fs-sm); font-weight: 600; color: var(--accent);">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
            Page Auto-Cycling
          </div>
          <div style="font-size:10px; opacity:0.6; margin-left:24px; margin-bottom:8px;">Automatically cycle
            through
            pages on a timer.</div>
          <div style="margin-left: 24px; display: flex; flex-direction: column; gap: 8px;">
            <label style="display:flex; align-items:center; gap:8px; cursor:pointer;">
              <input id="setting-auto-cycle" type="checkbox" />
              <span style="font-size:var(--fs-xs); font-weight:500;">Enable Automatic Page Cycling</span>
            </label>
            <div id="field-auto-cycle-interval"
              style="display:none; align-items:center; gap:8px; background: rgba(0,0,0,0.03); padding: 4px 8px; border-radius: 4px;">
              <span style="font-size: 11px; opacity: 0.7;">Cycle every</span>
              <input type="number" id="setting-auto-cycle-interval" class="prop-input" min="5" placeholder="30"
                style="width:80px;">
              <span style="font-size: 11px; opacity: 0.7;">seconds</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-actions">
      <button id="deviceSettingsSave" class="btn btn-secondary">Apply Settings</button>
    </div>
  </div>
</div>

<!-- Save Profile Modal -->
<div id="saveProfileModal" class="modal-backdrop hidden" style="z-index: 2000;">
  <div class="modal" style="max-width: 400px;">
    <div class="modal-header">
      <div>Save Hardware Profile</div>
      <button id="saveProfileClose" class="btn btn-secondary">Cancel</button>
    </div>
    <div class="modal-body">
      <div style="font-size: 11px; opacity: 0.7; margin-bottom: 12px;">
        Give your custom hardware configuration a unique name. It will be saved as a reusable recipe.
      </div>
      <div class="field">
        <div class="prop-label">Profile Name</div>
        <input id="saveProfileName" class="prop-input" type="text" placeholder="e.g. Living Room Display" />
      </div>
    </div>
    <div class="modal-actions">
      <button id="saveProfileConfirm" class="btn btn-secondary"
        style="background: var(--accent); color: white; border: none;">Save Profile</button>
    </div>
  </div>
</div>

<!-- Editor Settings Modal -->
<div id="editorSettingsModal" class="modal-backdrop hidden">
  <div class="modal">
    <div class="modal-header">
      <div>Editor Preferences</div>
      <button id="editorSettingsClose" class="btn btn-secondary">Close</button>
    </div>
    <div class="modal-body">
      <!-- CATEGORY: VIEW & THEME -->
      <div class="settings-category collapsible expanded" data-category="view">
        <div class="settings-category-header">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="mdi mdi-eye-outline"></span>
            <span>View & Theme</span>
          </div>
          <span class="mdi mdi-chevron-down category-chevron"></span>
        </div>
        <div class="settings-category-content">
          <div class="field">
            <label style="display:flex; align-items:center; gap:8px; cursor: pointer;">
              <input type="checkbox" id="editorShowGrid" checked> <span>Show Grid</span>
            </label>
            <label style="display:flex; align-items:center; gap:8px; cursor: pointer;">
              <input type="checkbox" id="editorSnapToGrid" checked> <span>Enable Snapping</span>
            </label>
            <div style="margin-top:12px;">
              <div class="prop-label">Grid Opacity</div>
              <input type="range" id="editorGridOpacity" min="0" max="100" step="1" value="8" style="width:100%;">
            </div>
          </div>
          <div class="field">
            <div class="prop-label">Interface Theme</div>
            <label style="display:flex; align-items:center; gap:8px; cursor: pointer;">
              <input type="checkbox" id="editorLightMode"> <span>Use Light Mode interface</span>
            </label>
          </div>
        </div>
      </div>

      <!-- CATEGORY: FONT SETTINGS -->
      <div class="settings-category collapsible" data-category="fonts">
        <div class="settings-category-header">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="mdi mdi-format-font"></span>
            <span>Font Settings</span>
          </div>
          <span class="mdi mdi-chevron-down category-chevron"></span>
        </div>
        <div class="settings-category-content">
          <div class="field">
            <div class="prop-label">Global Glyphsets</div>
            <div style="font-size:10px; opacity:0.6; margin-bottom:8px;">Select glyphsets to include language specific
              characters (like å, ö, ä) in the generated YAML for all fonts.</div>
            <div id="editorGlyphsets"
              style="display:grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px;">
              <label style="display:flex; align-items:center; gap:8px; font-size: 11px; cursor: pointer;">
                <input type="checkbox" class="glyphset-checkbox" value="GF_Latin_Kernel"> <span>Latin Kernel <small
                    style="opacity:0.6">(Basic A-Z, 0-9)</small></span>
              </label>
              <label style="display:flex; align-items:center; gap:8px; font-size: 11px; cursor: pointer;">
                <input type="checkbox" class="glyphset-checkbox" value="GF_Latin_Core"> <span>Latin Core <small
                    style="opacity:0.6">(å, ö, ä, é, ß...)</small></span>
              </label>
              <label style="display:flex; align-items:center; gap:8px; font-size: 11px; cursor: pointer;">
                <input type="checkbox" class="glyphset-checkbox" value="GF_Arabic_Core"> <span>Arabic Core <small
                    style="opacity:0.6">(ا, ب, ت...)</small></span>
              </label>
              <label style="display:flex; align-items:center; gap:8px; font-size: 11px; cursor: pointer;">
                <input type="checkbox" class="glyphset-checkbox" value="GF_Cyrillic_Core"> <span>Cyrillic <small
                    style="opacity:0.6">(А, Б, В...)</small></span>
              </label>
              <label style="display:flex; align-items:center; gap:8px; font-size: 11px; cursor: pointer;">
                <input type="checkbox" class="glyphset-checkbox" value="GF_Greek_Core"> <span>Greek <small
                    style="opacity:0.6">(α, β, γ...)</small></span>
              </label>
              <label style="display:flex; align-items:center; gap:8px; font-size: 11px; cursor: pointer;">
                <input type="checkbox" class="glyphset-checkbox" value="GF_Latin_African"> <span>Latin African</span>
              </label>
              <label style="display:flex; align-items:center; gap:8px; font-size: 11px; cursor: pointer;">
                <input type="checkbox" class="glyphset-checkbox" value="GF_Latin_PriAfrican"> <span>Latin
                  PriAfrican</span>
              </label>
              <label style="display:flex; align-items:center; gap:8px; font-size: 11px; cursor: pointer;">
                <input type="checkbox" class="glyphset-checkbox" value="GF_Latin_Vietnamese"> <span>Vietnamese <small
                    style="opacity:0.6">(à, á, ả...)</small></span>
              </label>
            </div>
            <div style="margin-top:8px; padding-top:8px; border-top:1px dashed rgba(255,255,255,0.08);">
              <label style="display:flex; align-items:center; gap:8px; font-size: 11px; cursor: pointer;">
                <input type="checkbox" id="editorExtendedLatinGlyphs">
                <span>Extended Latin Glyphs <small style="opacity:0.6">(Manual fallback: €, µ, Ω, ™ + full
                    Latin-1)</small></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- CATEGORY: CONNECTIVITY -->
      <div class="settings-category collapsible" data-category="ha">
        <div class="settings-category-header">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="mdi mdi-home-assistant"></span>
            <span>Home Assistant</span>
          </div>
          <span class="mdi mdi-chevron-down category-chevron"></span>
        </div>
        <div class="settings-category-content">
          <div class="field">
            <div class="prop-label">Resources</div>
            <button id="editorRefreshEntities" class="btn btn-secondary btn-xs">Refresh Entity List</button>
            <span id="editorEntityCount" style="font-size:var(--fs-xs); opacity:0.6; margin-left:8px;"></span>
          </div>
          <div class="field">
            <div class="prop-label">Connection Settings</div>
            <div style="font-size:10px; opacity:0.6; margin-bottom:8px;">Configure this if you are using the
              GitHub-hosted version or an external URL.</div>
            <form id="editorHaSettingsForm" style="display:flex; flex-direction:column; gap:8px;" onsubmit="return false;">
              <input type="text" name="haRuntimeUser" autocomplete="username" tabindex="-1" aria-hidden="true"
                style="position:absolute; left:-10000px; width:1px; height:1px; opacity:0; pointer-events:none;" />
              <div id="haCorsTip"
                style="background: rgba(82, 199, 234, 0.1); border-left: 3px solid var(--accent); padding: 10px; border-radius: 4px; font-size: 10px; line-height: 1.4;">
                <strong>💡 Connection Tip:</strong><br>
                If requests are blocked, you may need to add <code id="haOriginPlaceholder">http://localhost:8000</code>
                to <code>cors_allowed_origins</code> and
                <strong>restart HA</strong>.
              </div>
              <div>
                <div class="prop-label" style="font-size: 10px;">Base URL</div>
                <input type="text" id="haManualUrl" class="prop-input" placeholder="https://your-ha.duckdns.org:8123" autocomplete="url" />
              </div>
              <div>
                <div class="prop-label" style="font-size: 10px;">Long-Lived Access Token</div>
                <input type="password" id="haLlatToken" class="prop-input" placeholder="Paste your token here..." autocomplete="current-password" />
              </div>
              <!-- Warning shown only when deployed within HA -->
              <div id="haDeployedWarning" class="hidden"
                style="background: rgba(46, 204, 113, 0.1); border-left: 3px solid #2ecc71; padding: 10px; border-radius: 4px; font-size: 10px; line-height: 1.4; color: #2ecc71;">
                <strong>✅ Deployed in Home Assistant:</strong><br>
                Connection is handled automatically. These settings are locked to prevent configuration errors.
              </div>
              <div style="display:flex; gap:8px; align-items:center;">
                <button id="editorTestHaBtn" class="btn btn-secondary btn-xs" style="flex:1;">Test Connection</button>
                <div id="haTestResult" style="font-size:10px; line-height: 1.2;"></div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- CATEGORY: AI ASSISTANT -->
      <div class="settings-category collapsible" data-category="ai">
        <div class="settings-category-header">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="mdi mdi-robot-outline"></span>
            <span>AI Integration (LLM)</span>
          </div>
          <span class="mdi mdi-chevron-down category-chevron"></span>
        </div>
        <div class="settings-category-content">
          <div style="font-size:10px; opacity:0.6; margin-bottom:8px;">Configure Gemini, OpenAI or OpenRouter to use
            natural language prompts.</div>
          <form id="editorAiSettingsForm" class="field" style="display:flex; flex-direction:column; gap:8px;" onsubmit="return false;">
            <input type="text" name="aiProviderUser" autocomplete="username" tabindex="-1" aria-hidden="true"
              style="position:absolute; left:-10000px; width:1px; height:1px; opacity:0; pointer-events:none;" />
            <div>
              <div class="prop-label" style="font-size: 10px;">Provider</div>
              <select id="aiProvider" class="prop-input">
                <option value="gemini">Google Gemini</option>
                <option value="openai">OpenAI</option>
                <option value="openrouter">OpenRouter</option>
              </select>
            </div>
            <div id="aiKeyGeminiRow">
              <div class="prop-label" style="font-size: 10px;">Gemini API Key</div>
              <input type="password" id="aiApiKeyGemini" class="prop-input" placeholder="Paste Gemini key..." autocomplete="new-password" />
            </div>
            <div id="aiKeyOpenaiRow" style="display:none;">
              <div class="prop-label" style="font-size: 10px;">OpenAI API Key</div>
              <input type="password" id="aiApiKeyOpenai" class="prop-input" placeholder="Paste OpenAI key..." autocomplete="new-password" />
            </div>
            <div id="aiKeyOpenrouterRow" style="display:none;">
              <div class="prop-label" style="font-size: 10px;">OpenRouter API Key</div>
              <input type="password" id="aiApiKeyOpenrouter" class="prop-input" placeholder="Paste OpenRouter key..." autocomplete="new-password" />
            </div>
            <div>
              <div class="prop-label" style="font-size: 10px;">Model Filter (e.g. "free", "flash", "gpt-4")</div>
              <div style="display:flex; gap:4px; align-items: center;">
                <input type="text" id="aiModelFilter" class="prop-input" placeholder="Filter models..."
                  style="flex:1;" autocomplete="off" />
                <button id="aiRefreshModelsBtn" class="btn btn-secondary btn-xs">Test & Load Models</button>
                <div id="aiTestResult" style="font-size:10px; line-height: 1.2;"></div>
              </div>
            </div>
            <div>
              <div class="prop-label" style="font-size: 10px;">Selected Model</div>
              <select id="aiModelSelect" class="prop-input"></select>
            </div>
          </form>
        </div>
      </div>

      <!-- CATEGORY: SHORTCUTS -->
      <div class="settings-category collapsible" data-category="shortcuts">
        <div class="settings-category-header">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="mdi mdi-keyboard-outline"></span>
            <span>Keyboard Shortcuts</span>
          </div>
          <span class="mdi mdi-chevron-down category-chevron"></span>
        </div>
        <div class="settings-category-content">
          <div class="shortcuts-grid">
            <div class="shortcut-item"><span class="shortcut-label">Undo</span><span
                class="shortcut-key"><kbd>Ctrl+Z</kbd></span></div>
            <div class="shortcut-item"><span class="shortcut-label">Redo</span><span
                class="shortcut-key"><kbd>Ctrl+Y</kbd></span></div>
            <div class="shortcut-item"><span class="shortcut-label">Copy</span><span
                class="shortcut-key"><kbd>Ctrl+C</kbd></span></div>
            <div class="shortcut-item"><span class="shortcut-label">Paste</span><span
                class="shortcut-key"><kbd>Ctrl+V</kbd></span></div>
            <div class="shortcut-item"><span class="shortcut-label">Delete</span><span
                class="shortcut-key"><kbd>DEL</kbd></span></div>
            <div class="shortcut-item"><span class="shortcut-label">Lock/Unlock</span><span
                class="shortcut-key"><kbd>Ctrl+L</kbd></span></div>
            <div class="shortcut-item"><span class="shortcut-label">Search</span><span
                class="shortcut-key"><kbd>Shift+Space</kbd></span></div>
            <div class="shortcut-item"><span class="shortcut-label">Debug Mode</span><span
                class="shortcut-key"><kbd>D</kbd></span></div>
            <div class="shortcut-item"><span class="shortcut-label">Design Grid</span><span
                class="shortcut-key"><kbd>G</kbd></span></div>
            <div class="shortcut-item"><span class="shortcut-label">Rulers</span><span
                class="shortcut-key"><kbd>R</kbd></span></div>
            <div class="shortcut-item"><span class="shortcut-label">Zoom Reset</span><span
                class="shortcut-key"><kbd>Ctrl+R</kbd></span></div>
            <div class="shortcut-item"><span class="shortcut-label">Snap Off</span><span
                class="shortcut-key"><kbd>ALT</kbd></span></div>
            <div class="shortcut-item"><span class="shortcut-label">Distances</span><span class="shortcut-key"><kbd>CTRL
                  Drag</kbd></span></div>
            <div class="shortcut-item"><span class="shortcut-label">Group</span><span
                class="shortcut-key"><kbd>Ctrl+G</kbd></span></div>
            <div class="shortcut-item"><span class="shortcut-label">Ungroup</span><span
                class="shortcut-key"><kbd>Ctrl+Shift+G</kbd></span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-actions">
      <button id="editorSettingsDone" class="btn btn-secondary">Done</button>
    </div>
  </div>
</div>

<!-- AI Prompt Modal -->
<div id="aiPromptModal" class="modal-backdrop hidden">
  <div class="modal" style="max-width: 600px;">
    <div class="modal-header">
      <div>AI Design Assistant</div>
      <button id="aiPromptClose" class="btn btn-secondary">Close</button>
    </div>
    <div class="modal-body">
      <div id="aiConfigWarning"
        style="background: rgba(82, 199, 234, 0.1); border-left: 3px solid var(--accent); padding: 10px; border-radius: 4px; font-size: 11px; margin-bottom: 12px; line-height: 1.4;">
        <strong>💡 Configuration Required:</strong><br>
        An API provider and key must be configured in <strong>Editor Settings</strong> before using the AI
        Assistant.
        <button id="aiOpenEditorSettingsBtn" class="btn btn-secondary btn-xs" style="margin-top:8px; display:block;">⚙
          Open Editor
          Settings</button>
      </div>
      <div style="font-size: 11px; color: var(--muted); margin-bottom: 12px;">
        Describe what you want to change. Example: "Move the selected widget 50px right" or "Make a nice weather
        layout with 4 days forecast".
      </div>
      <textarea id="aiPromptInput" class="prop-input"
        style="height: 120px; font-size: 14px; line-height: 1.5; padding: 12px;" placeholder="I want to..."></textarea>

      <div id="aiPromptStatus" style="margin-top: 12px; font-size: 11px; min-height: 1.2em;"></div>

      <div id="aiPreviewDiff"
        style="display:none; margin-top:16px; border: 1px solid var(--border-subtle); border-radius: 8px; overflow: hidden;">
        <div
          style="background: rgba(255,255,255,0.03); padding: 8px 12px; font-size: 10px; font-weight: 600; border-bottom: 1px solid var(--border-subtle);">
          PREVIEW CHANGES</div>
        <div id="aiDiffContent"
          style="padding: 12px; font-family: monospace; font-size: 11px; max-height: 200px; overflow-y: auto; white-space: pre-wrap; background: var(--bg-input);">
        </div>
      </div>
    </div>
    <div class="modal-actions">
      <button id="aiPromptSubmit" class="btn btn-primary"
        style="background: var(--accent); color: white; border: none;">Generate</button>
      <button id="aiPromptApply" class="btn btn-success" style="display:none;">Apply</button>
    </div>
  </div>
</div>
`,us=""+new URL("logo_header-CUGdaeC6.png",import.meta.url).href,hs=["header-placeholder","sidebar-placeholder","code-panel-placeholder","properties-panel-placeholder","modals-placeholder"],gs=[".header-shell",".sidebar-shell",".code-shell",".properties-shell",".modal-shell"];function we(t,e){const n=document.getElementById(t);n?n.outerHTML=e:console.warn(`[UI Injection] Placeholder #${t} not found in index.html.`)}function Hn(){return hs.some(t=>document.getElementById(t))}function ms(){return gs.some(t=>document.querySelector(t))}function fs(){if(_.log("[UI Injection] Loading modular UI components..."),!Hn()&&ms()){_.log("[UI Injection] Construction complete.");return}let t=as.replace("assets/logo_header.png",us);we("header-placeholder",t),we("sidebar-placeholder",ls),we("code-panel-placeholder",ds),we("properties-panel-placeholder",cs),we("modals-placeholder",ps),_.log("[UI Injection] Construction complete.")}Hn()&&fs();const St="__ESPHOME_DESIGNER_BOOT_PROMISE__";function Gn(t=globalThis){return t.ESPHomeDesigner=t.ESPHomeDesigner||{},t.ESPHomeDesigner}function aa(t=document){return!!(t.getElementById("header-placeholder")||t.querySelector(".app-content")||t.getElementById("widgetPalette")||t.getElementById("canvas")||t.querySelector("[data-esphome-designer-panel-root]"))}function la(t=document){return!!(t.getElementById("header-placeholder")||t.getElementById("sidebar-placeholder")||t.getElementById("code-panel-placeholder")||t.getElementById("properties-panel-placeholder")||t.getElementById("modals-placeholder"))}function da(t,e=globalThis){const n=Gn(e);n.app=t,n.ui={sidebar:t.sidebar,canvas:t.canvas,properties:t.propertiesPanel}}function ca(t,e=globalThis){const n=Gn(e);n.state=t}function pa(t=globalThis){return t[St]||null}function ua(t,e=globalThis){return e[St]=t,t}function ha(t=globalThis){delete t[St]}function ga({label:t,load:e,create:n}){let i=null,o=null;return async()=>{if(i)return i;o||(o=Promise.resolve(e()).then(async s=>{const a=await n(s);return i=a,_.log(`[App] ${t} lazy-loaded`),a}).catch(s=>{throw o=null,s}));const r=await o;return i=r,r}}const Bn={getColorConst:t=>{if(!t)return"COLOR_BLACK";const e=t.toLowerCase();if(e==="theme_auto")return"color_on";if(e==="theme_auto_inverse"||e==="transparent")return"color_off";if(e.startsWith("#")&&e.length===7){const n=parseInt(e.substring(1,3),16),i=parseInt(e.substring(3,5),16),o=parseInt(e.substring(5,7),16);return`Color(${n}, ${i}, ${o})`}return en[e]||"COLOR_BLACK"},getAlignX:(t,e,n)=>t.includes("LEFT")?`${e}`:t.includes("RIGHT")?`${e} + ${n}`:`${e} + ${n}/2`,getAlignY:(t,e,n)=>t.includes("TOP")?`${e}`:t.includes("BOTTOM")?`${e} + ${n}`:`${e} + ${n}/2`,sanitize:t=>t?t.replace(/"/g,'\\"'):"",addDitherMask:(t,e,n,i,o,r,s,a=0)=>{if(!n||!e)return;const l=e.toLowerCase();let c=l==="gray"||l==="grey";if(!c&&l.startsWith("#")&&l.length===7){const d=parseInt(l.substring(1,3),16),u=parseInt(l.substring(3,5),16),h=parseInt(l.substring(5,7),16);Math.abs(d-u)<15&&Math.abs(u-h)<15&&d>40&&d<210&&(c=!0)}c&&t.push(`          apply_grey_dither_mask(${Math.round(i)}, ${Math.round(o)}, ${Math.round(r)}, ${Math.round(s)});`)},isGrayColor:t=>{if(!t)return!1;const e=t.toLowerCase();if(e==="gray"||e==="grey")return!0;if(e.startsWith("#")&&e.length===7){const n=parseInt(e.substring(1,3),16),i=parseInt(e.substring(3,5),16),o=parseInt(e.substring(5,7),16);if(Math.abs(n-i)<15&&Math.abs(i-o)<15&&n>40&&n<210)return!0}return!1},addDitherMaskForText:(t,e,n,i,o,r,s)=>!n||!Bn.isGrayColor(e)?!1:(t.push(`        apply_grey_dither_to_text(${Math.round(i)}, ${Math.round(o)}, ${Math.round(r)}, ${Math.round(s)});`),!0),getIconCode:t=>{if(!t||!ke)return null;const e=ke.find(n=>n.name===t);return e?e.code:null}},pt=globalThis;pt.ESPHomeDesigner=pt.ESPHomeDesigner||{};pt.ESPHomeDesigner.utils=Bn;function ys(){const t=p.getPagesPayload(),e=JSON.stringify(t,null,2),n=new Blob([e],{type:"application/json"}),i=URL.createObjectURL(n),o=document.createElement("a");o.href=i,o.download=`reterminal_layout_${Date.now()}.json`,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(i)}function vs(t){if(!t)return;const e=new FileReader;e.onload=n=>{try{const i=n.target,o=i?i.result:null;if(typeof o!="string")throw new Error("Invalid file content");const r=JSON.parse(o);ue(r)}catch(i){_.error("Failed to parse layout file:",i),alert("Error parsing layout file. Please ensure it is a valid JSON file.")}},e.readAsText(t)}function bs(t){const e=t.target,n=e?.files?e.files[0]:null;n&&vs(n),e&&(e.value="")}function ma(t,e){if(e)try{if(localStorage.getItem("reterminal-editor-theme")==="light"){t.updateSettings({editor_light_mode:!0}),e.applyEditorTheme(!0);return}e.applyEditorTheme(!1)}catch(n){_.log("Could not load theme preference:",n)}}async function fa({loadFromLocalStorage:t,refreshAdapter:e}){try{N()?(_.log("HA Backend detected attempt. Loading layout..."),await Bi(),await pe()):(_.log("Running in standalone/offline mode."),t()),e()}catch(n){_.error("[App] Failed to load from backend, falling back to local storage:",n),t(),e()}}function ya({editorSettings:t,openDeviceSettings:e,openAiPrompt:n,openLayoutManager:i}){const o=document.getElementById("saveLayoutBtn");o&&o.addEventListener("click",async()=>{const u=h=>{ys(),A(h,"info")};if(!N()){u("Layout downloaded locally");return}try{if(await hn()){A("Layout saved to Home Assistant","success");return}if(!et()){u("Home Assistant save unavailable; layout downloaded locally instead");return}A("Save failed: Home Assistant backend unavailable","error")}catch(h){if(!et()){u("Home Assistant save failed; layout downloaded locally instead");return}A(`Save failed: ${h.message}`,"error")}});const r=document.getElementById("loadLayoutBtn");r&&r.addEventListener("change",bs);const s=document.getElementById("importLayoutBtn");s&&r&&s.addEventListener("click",()=>{r.click()});const a=document.getElementById("deviceSettingsBtn");a?(_.log("Device Settings button found, binding click listener."),a.addEventListener("click",async()=>{_.log("Device Settings button clicked."),await e()})):_.error("Device Settings button NOT found in DOM.");const l=document.getElementById("editorSettingsBtn");l&&t&&l.addEventListener("click",()=>{t.open()});const c=document.getElementById("aiPromptBtn");c&&c.addEventListener("click",async()=>{await n()});const d=document.getElementById("manageLayoutsBtn");d&&d.addEventListener("click",async()=>{await i()})}function va(t,e){setTimeout(()=>{t&&(_.log("[App] Forcing initial canvas centering..."),t.focusPage(e,!1))},100)}const jt=3600,_s=/^(\d+(?:\.\d+)?)([a-z]+)$/i;function Rn(t){if(t==null||t==="")return null;if(typeof t=="number")return Number.isFinite(t)?{value:t,unit:"s"}:null;const e=String(t).trim();if(!e)return null;if(/^\d+(?:\.\d+)?$/.test(e))return{value:parseFloat(e),unit:"s"};const n=e.match(_s);return n?{value:parseFloat(n[1]),unit:n[2].toLowerCase()}:null}function Wn(t){if(!t||!Number.isFinite(t.value))return null;const{value:e,unit:n}=t;return n.startsWith("s")?e:n.startsWith("m")?e*60:n.startsWith("h")?e*3600:n.startsWith("d")?e*86400:n.startsWith("w")?e*604800:null}function Nn(t){if(!t)return jt;const e=Wn(Rn(t));return Number.isFinite(e)?e:jt}function ba(t){const e=Rn(t),n=Wn(e);if(!Number.isFinite(n)||n<=0)return"1h";const i=n/4;return i>=604800?`${Math.max(1,Math.round(i/604800))}w`:i>=86400?`${Math.max(1,Math.round(i/86400))}d`:i>=3600?`${Math.max(1,Math.round(i/3600))}h`:i>=60?`${Math.max(1,Math.round(i/60))}min`:`${Math.max(1,Math.round(i))}s`}function xs(t){const e=Math.max(0,Number(t)||0);return e>=604800?`-${(e/604800).toFixed(1)}w`:e>=86400?`-${(e/86400).toFixed(1)}d`:e>=3600?`-${(e/3600).toFixed(1)}h`:e>=60?`-${(e/60).toFixed(0)}m`:`-${e.toFixed(0)}s`}function Ut(t,e,n,i){const o=[];for(let s=0;s<50;s++){const a=s/49*t,l=s/50,c=Math.sin(l*Math.PI*2),d=(Math.random()-.5)*.2;let u=.5+c*.3+d;u=Math.max(.1,Math.min(.9,u));const h=e-u*e;o.push({x:a,y:h})}return o}function _a(t,e,n,i,o,r){if(!o||o.length===0)return Ut(t,e);const s=[],a=Nn(r),c=Date.now()-a*1e3,d=o.map(f=>({time:new Date(f.last_changed||f.when||Date.now()).getTime(),value:parseFloat(f.state)})).filter(f=>!isNaN(f.value));if(d.length===0)return Ut(t,e);d.sort((f,b)=>f.time-b.time);let u=n,h=i;const g=d.map(f=>f.value),m=Math.min(...g),y=Math.max(...g);if(n===i||isNaN(n)&&isNaN(i)||n===0&&i===100&&(m>100||y<0)){u=m,h=y;const f=(h-u)*.1||1;u-=f,h+=f}const v=h-u||1;return d.forEach(f=>{const b=(f.time-c)/(a*1e3)*t;let x=(f.value-u)/v;x=Math.max(-.1,Math.min(1.1,x));const E=e-x*e;b>=-10&&b<=t+10&&s.push({x:b,y:E})}),s.length>0&&s[s.length-1].x<t-1&&s.push({x:t,y:s[s.length-1].y}),s}function xa(t,e,n,i,o,r="rgba(0,0,0,0.1)"){const s=document.createElementNS("http://www.w3.org/2000/svg","g");s.setAttribute("stroke",r),s.setAttribute("stroke-dasharray","2,2"),s.setAttribute("stroke-width","1");const a=4,l=4;for(let c=1;c<a;c++){const d=c/a*e,u=document.createElementNS("http://www.w3.org/2000/svg","line");u.setAttribute("x1",String(d)),u.setAttribute("y1","0"),u.setAttribute("x2",String(d)),u.setAttribute("y2",String(n)),s.appendChild(u)}for(let c=1;c<l;c++){const d=c/l*n,u=document.createElementNS("http://www.w3.org/2000/svg","line");u.setAttribute("x1","0"),u.setAttribute("y1",String(d)),u.setAttribute("x2",String(e)),u.setAttribute("y2",String(d)),s.appendChild(u)}t.appendChild(s)}function wa(t,e,n,i,o,r,s,a,l,c="#666",d={}){if(!t)return;t.querySelectorAll(`.graph-axis-label[data-widget-id="${l}"]`).forEach(w=>w.remove());const h=s-r,g=4,m=parseInt(t.style.width,10)||800,y=parseInt(t.style.height,10)||480,v=d.fontFamily||"Roboto",f=Math.max(8,parseInt(String(d.fontSize||10),10)||10),b=String(parseInt(String(d.fontWeight||400),10)||400),x=e<40,E=n+o+20>y;for(let w=0;w<=g;w++){const I=r+h*(w/g),T=n+o-w/g*o,O=document.createElement("div");O.className="graph-axis-label",O.dataset.widgetId=l;const M=O.style;M.position="absolute",x?(M.left=`${e+4}px`,M.textAlign="left"):(M.left=`${e-4}px`,M.transform="translateX(-100%)",M.textAlign="right"),M.top=`${T-6}px`,M.fontSize=`${f}px`,M.fontFamily=`${v}, system-ui, sans-serif`,M.fontWeight=b,M.color=c,M.opacity=x?"0.7":"1.0",M.pointerEvents="none",M.zIndex="10",O.textContent=I.toFixed(1),t.appendChild(O)}const S=Nn(a),k=2;for(let w=0;w<=k;w++){const I=w/k,T=e+i*I;let O="";if(w===k)O="Now";else{const B=S*(1-I);O=xs(B)}const M=document.createElement("div");M.className="graph-axis-label",M.dataset.widgetId=l;const D=M.style;D.position="absolute",D.left=`${T}px`,E?D.top=`${n+o-14}px`:D.top=`${n+o+4}px`,D.fontSize=`${f}px`,D.fontFamily=`${v}, system-ui, sans-serif`,D.fontWeight=b,D.color=c,D.opacity=E?"0.7":"1.0",D.pointerEvents="none",D.zIndex="10",T<20?(D.transform="none",D.textAlign="left"):T>m-20?(D.transform="translateX(-100%)",D.textAlign="right"):(D.transform="translateX(-50%)",D.textAlign="center"),M.textContent=O,t.appendChild(M)}}const Fn=window;Fn.LAYOUT={WIDGET:{SMALL:{W:100,H:20},MEDIUM:{W:200,H:60},LARGE:{W:200,H:100}},FONT:{SIZE:{XS:12,S:14,M:16,L:20,XL:28,XXL:40},DEFAULT:{LABEL:14,VALUE:20,TITLE:28,DATE:16}},GRID:{GAP:10,MARGIN:10}};Object.freeze(Fn.LAYOUT);function Ne(){const t=document.getElementById("resizer-left"),e=document.getElementById("resizer-right"),n=document.querySelector(".sidebar"),i=document.querySelector(".right-panel");if(!document.querySelector(".app-content")){setTimeout(Ne,100);return}if(!t||!e||!n||!i){_.warn("[Splitters] Layout elements not found, retrying..."),setTimeout(Ne,500);return}_.log("[Splitters] Initializing draggable panels...");function r(l,c,d){let u=0,h=0;l.addEventListener("mousedown",function(g){d==="vertical"?(u=g.clientX,h=c.offsetWidth,document.body.style.cursor="col-resize"):(u=g.clientY,h=c.offsetHeight,document.body.style.cursor="row-resize"),l.classList.add("dragging"),document.body.style.userSelect="none";function m(v){let f;if(d==="vertical"){f=v.clientX-u,l.id==="resizer-right"&&(f=-f);const b=h+f,x=parseInt(getComputedStyle(c).minWidth)||100,E=parseInt(getComputedStyle(c).maxWidth)||800;b>=x&&b<=E&&(c.style.width=b+"px")}else{f=u-v.clientY;const b=h+f,x=parseInt(getComputedStyle(c).minHeight)||50,E=parseInt(getComputedStyle(c).maxHeight)||800;b>=x&&b<=E&&(c.style.height=b+"px")}ut(new Event("resize"))}function y(){l.classList.remove("dragging"),document.body.style.cursor="default",document.body.style.userSelect="",Y("mousemove",m),Y("mouseup",y)}G("mousemove",m),G("mouseup",y)})}const s=document.getElementById("resizer-bottom"),a=document.querySelector(".code-panel");r(t,n,"vertical"),r(e,i,"vertical"),s&&a&&r(s,a,"horizontal")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ne):Ne();async function Sa(t){if(!N())return _.log("[HardwareImport] Offline mode detected. Parsing locally..."),await ws(t);try{const e=await t.text(),n=`${F}/hardware/upload`,i={filename:t.name,content:e};_.log("[HardwareImport] Uploading via JSON:",t.name);const o=await $(n,{method:"POST",headers:z(),body:JSON.stringify(i)});if(!o.ok){const s=await o.json().catch(()=>({}));throw new Error(s.message||s.error||`Upload failed: ${o.status}`)}const r=await o.json();return A("Hardware template uploaded successfully!","success"),Te&&await Te(),r}catch(e){const n=e instanceof Error?e.message:String(e||"");if(n.includes("Failed to fetch")||n.includes("NetworkError")){_.warn("[HardwareImport] Network error during upload (likely benign):",n),A("Generating profile, refreshing list...","info");try{Te&&await Te()}catch(i){_.warn("[HardwareImport] Profile refresh also failed:",i)}return{success:!0,filename:t.name,note:"network_error_suppressed"}}else throw _.error("Hardware upload failed:",e),A(`Upload failed: ${n}`,"error"),e}}async function ws(t){return new Promise((e,n)=>{const i=new FileReader;i.onload=async o=>{const r=o.target?.result;if(typeof r!="string"){n(new Error("Failed to read file content"));return}try{if(!r.includes("__LAMBDA_PLACEHOLDER__"))throw new Error("Invalid template: Missing __LAMBDA_PLACEHOLDER__");const s=fn(r,t.name);_.log("[HardwareImport] Parsed offline profile:",s),H&&(H[s.id]=s),A(`Imported ${s.name} (Offline Mode)`,"success"),Yi(s),L(C.DEVICE_PROFILES_UPDATED),e(s)}catch(s){const a=s instanceof Error?s.message:String(s);A(a,"error"),n(s)}},i.onerror=()=>n(new Error("File read failed")),i.readAsText(t)})}const zn=[{id:"core",name:"Core Widgets",expanded:!0,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><rect x="4" y="4" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="14" y="4" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="4" y="14" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="14" y="14" width="6" height="6" rx="1" fill="currentColor"/></svg>',widgets:[{type:"label",label:"Floating text",tag:"Text",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><text x="4" y="17" font-size="14" font-weight="bold" fill="currentColor">Aa</text></svg>'},{type:"sensor_text",label:"Sensor text",tag:"Entity",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="8" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2" /><path d="M11 12h9M14 9l3 3-3 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"datetime",label:"Date & Time",tag:"Time",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2" /><path d="M12 7v5l3 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"icon",label:"MDI icon",tag:"Icon",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 2L9 9H2l6 4.5L5.5 22 12 17l6.5 5-2.5-8.5L22 9h-7z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" /></svg>'},{type:"weather_icon",label:"Weather icon",tag:"Icon",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="10" r="4" fill="none" stroke="currentColor" stroke-width="2" /><path d="M12 2v2M12 16v2M4 10H2M22 10h-2M5.6 4.6l1.4 1.4M17 6l1.4-1.4M5.6 15.4l1.4-1.4M17 14l1.4 1.4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"image",label:"Image",tag:"Media",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="3" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" /><path d="M21 15l-5-5L11 15l-3-3-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"online_image",label:"Puppet image",tag:"Remote",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="14" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M17 10l4-4M21 10V6h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><circle cx="7" cy="8" r="1.5" fill="currentColor" /><path d="M17 13l-4-4-4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'}]},{id:"shapes",name:"Shapes",expanded:!0,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><circle cx="7" cy="7" r="4" fill="none" stroke="currentColor" stroke-width="2"/><rect x="13" y="13" width="7" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><path d="M17 4l3 5h-6z" fill="none" stroke="currentColor" stroke-width="2"/></svg>',widgets:[{type:"shape_rect",label:"Rectangle",tag:"Shape",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"rounded_rect",label:"Rounded Rect",tag:"Shape",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="6" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"shape_circle",label:"Circle",tag:"Shape",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"line",label:"Line",tag:"Shape",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'}]},{id:"opendisplay",name:"OpenDisplay / OEPL",expanded:!1,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><rect x="3" y="4" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" stroke-width="1" /><circle cx="6" cy="6.5" r="1" fill="currentColor" /><circle cx="9" cy="6.5" r="1" fill="currentColor" /></svg>',widgets:[{type:"odp_multiline",label:"Multiline Text",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><line x1="4" y1="12" x2="18" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><line x1="4" y1="17" x2="14" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"odp_rectangle_pattern",label:"Rectangle Pattern",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5" /><rect x="11" y="4" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5" /><rect x="3" y="12" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5" /><rect x="11" y="12" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5" /></svg>'},{type:"odp_polygon",label:"Polygon",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><polygon points="12,3 21,10 18,20 6,20 3,10" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"odp_ellipse",label:"Ellipse",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="9" ry="6" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"odp_arc",label:"Arc",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M6 18 A 9 9 0 0 1 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"odp_icon_sequence",label:"Icon Sequence",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="5" cy="12" r="3" fill="currentColor" /><circle cx="12" cy="12" r="3" fill="currentColor" /><circle cx="19" cy="12" r="3" fill="currentColor" /></svg>'},{type:"odp_plot",label:"Sensor Plot",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M3 3v18h18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M6 15l4-6 4 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"odp_debug_grid",label:"Debug Grid",tag:"Debug",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M3 3v18h18M3 9h18M3 15h18M9 3v18M15 3v18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'}]},{id:"advanced",name:"Advanced",expanded:!0,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" fill="none" stroke="currentColor" stroke-width="2"/></svg>',widgets:[{type:"graph",label:"Graph / Chart",tag:"Data",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M3 3v18h18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M7 14l4-4 4 4 5-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"progress_bar",label:"Progress bar",tag:"Entity",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="9" width="20" height="6" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><rect x="3" y="10" width="12" height="4" rx="1" fill="currentColor" /></svg>'},{type:"qr_code",label:"QR Code",tag:"Tools",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" fill="currentColor" /><rect x="14" y="3" width="7" height="7" fill="currentColor" /><rect x="3" y="14" width="7" height="7" fill="currentColor" /><rect x="14" y="14" width="3" height="3" fill="currentColor" /></svg>'},{type:"calendar",label:"Calendar",tag:"Events",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" stroke-width="2" /></svg>'},{type:"weather_forecast",label:"Weather Forecast",tag:"Forecast",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="10" r="4" fill="none" stroke="currentColor" stroke-width="2" /><path d="M12 2v2M12 16v2M4 10H2M22 10h-2M5.6 4.6l1.4 1.4M17 6l1.4-1.4M5.6 15.4l1.4-1.4M17 14l1.4 1.4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"quote_rss",label:"Quote / RSS",tag:"Info",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M6 17h3l2-4V7H5v6h3M13 17h3l2-4V7h-6v6h3" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"energy_widget",label:"Energy Flow",tag:"Template",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="4" rx="1" fill="none" stroke="currentColor" stroke-width="2" /><rect x="3" y="10" width="6" height="4" rx="1" fill="none" stroke="currentColor" stroke-width="2" /><rect x="15" y="10" width="6" height="4" rx="1" fill="none" stroke="currentColor" stroke-width="2" /><rect x="9" y="17" width="6" height="4" rx="1" fill="none" stroke="currentColor" stroke-width="2" /><path d="M12 7v3M9 12h-3M15 12h-3M12 14v3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'}]},{id:"astronomy",name:"Astronomy",expanded:!0,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><path d="M15.5 3.5a8.5 8.5 0 107 13A9 9 0 0115.5 3.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',widgets:[{type:"moon_phase",label:"Moon phase",tag:"Moon",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M15.5 3.5a8.5 8.5 0 107 13A9 9 0 0115.5 3.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" /></svg>'},{type:"sun_times",label:"Sunrise / Sunset",tag:"Sun",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M4 16h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M7 14a5 5 0 0110 0" fill="none" stroke="currentColor" stroke-width="2" /><path d="M12 4v5" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M9.5 7.5L12 5l2.5 2.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'}]},{id:"inputs",name:"Inputs",expanded:!1,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><path d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zM16.06 17H15v-1l-1-1h-6l-1 1v1H5.94c-.58 0-1.06-.48-1.06-1.06V7.5c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5v8.44c0 .58-.48 1.06-1.06 1.06z" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="12" cy="13" r="1.5" fill="currentColor" /></svg>',widgets:[{type:"touch_area",label:"Touch Area",tag:"Input",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="5" y="5" width="14" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="2,2" /><circle cx="12" cy="12" r="3" fill="currentColor" /></svg>'},{type:"nav_next_page",label:"Next Page",tag:"Nav",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M10 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"nav_previous_page",label:"Prev Page",tag:"Nav",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M14 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"nav_reload_page",label:"Reload Page",tag:"Nav",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M23 4v6h-6M1 20v-6h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"template_nav_bar",label:"Navigation Bar",tag:"Template",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M6 10l-2 2 2 2M18 10l2 2-2 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 12h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'}]},{id:"ondevice",name:"On Device Sensors",expanded:!0,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 9h6v6H9z" fill="currentColor"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M7 2v2M7 20v2M17 2v2M17 20v2M2 7h2M20 7h2M2 17h2M20 17h2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',widgets:[{type:"battery_icon",label:"Battery",tag:"Sensor",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="7" width="18" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><rect x="4" y="9" width="8" height="6" fill="currentColor" /><path d="M20 10h2v4h-2" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"wifi_signal",label:"WiFi Signal",tag:"Sensor",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 3C7.5 3 3.8 5.4 2 9l2 2c1.3-2.5 4-4.2 8-4.2s6.7 1.7 8 4.2l2-2c-1.8-3.6-5.5-6-10-6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M12 9c-2.7 0-5.1 1.4-6.5 3.5L7 14c1-1.4 2.8-2.3 5-2.3s4 .9 5 2.3l1.5-1.5C17.1 10.4 14.7 9 12 9z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><circle cx="12" cy="18" r="2" fill="currentColor" /></svg>'},{type:"ondevice_temperature",label:"Temperature",tag:"SHT4x",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 2a2 2 0 00-2 2v10.1a4 4 0 104 0V4a2 2 0 00-2-2z" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="12" cy="18" r="2" fill="currentColor" /></svg>'},{type:"ondevice_humidity",label:"Humidity",tag:"SHT4x",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"template_sensor_bar",label:"On-Board Sensor Bar",tag:"New",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M5 12h2M10 12h2M15 12h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'}]},{id:"lvgl",name:"LVGL Components",expanded:!1,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" /></svg>',widgets:[{type:"lvgl_obj",label:"Base Object",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_label",label:"Label",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><text x="4" y="17" font-size="14" font-weight="bold" fill="currentColor">Aa</text></svg>'},{type:"lvgl_line",label:"LVGL Line",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"lvgl_button",label:"Button",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="8" rx="2" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="2" /><text x="12" y="16.5" font-size="8" text-anchor="middle" fill="currentColor">BTN</text></svg>'},{type:"lvgl_switch",label:"Switch",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="8" rx="4" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="16" cy="12" r="3" fill="currentColor" /></svg>'},{type:"lvgl_checkbox",label:"Checkbox",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><polyline points="9 12 11 14 15 10" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_slider",label:"Slider",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><circle cx="12" cy="12" r="3" fill="currentColor" /></svg>'},{type:"lvgl_bar",label:"Bar",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="9" width="20" height="6" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><rect x="3" y="10" width="12" height="4" rx="1" fill="currentColor" /></svg>'},{type:"lvgl_arc",label:"Arc",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M4 18 A 10 10 0 1 1 20 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"lvgl_meter",label:"Meter",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M4 18 A 10 10 0 1 1 20 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><line x1="12" y1="18" x2="16" y2="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"lvgl_spinner",label:"Spinner",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_led",label:"LED",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" fill="currentColor" /><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_chart",label:"Chart",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M3 3v18h18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M7 14l4-4 4 4 5-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"lvgl_img",label:"Image",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="3" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" /><path d="M21 15l-5-5L11 15l-3-3-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"lvgl_qrcode",label:"QR Code",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" fill="currentColor" /><rect x="14" y="3" width="7" height="7" fill="currentColor" /><rect x="3" y="14" width="7" height="7" fill="currentColor" /><rect x="14" y="14" width="3" height="3" fill="currentColor" /></svg>'},{type:"lvgl_dropdown",label:"Dropdown",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="8" width="20" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><polyline points="16 11 18 13 20 11" fill="currentColor" /></svg>'},{type:"lvgl_roller",label:"Roller",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="20" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><line x1="6" y1="10" x2="18" y2="10" stroke="currentColor" stroke-width="1" /><line x1="6" y1="14" x2="18" y2="14" stroke="currentColor" stroke-width="1" /></svg>'},{type:"lvgl_spinbox",label:"Spinbox",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M6 12l2-2 2 2" fill="none" stroke="currentColor" stroke-width="1" /><path d="M14 12l2 2 2-2" fill="none" stroke="currentColor" stroke-width="1" /></svg>'},{type:"lvgl_textarea",label:"Textarea",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" fill="none" stroke="currentColor" stroke-width="2" /><line x1="6" y1="8" x2="14" y2="8" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_keyboard",label:"Keyboard",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><line x1="6" y1="10" x2="8" y2="10" stroke="currentColor" stroke-width="2" /><line x1="10" y1="10" x2="12" y2="10" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_buttonmatrix",label:"Btn Matrix",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="7" width="9" height="4" fill="none" stroke="currentColor" stroke-width="1" /><rect x="13" y="7" width="9" height="4" fill="none" stroke="currentColor" stroke-width="1" /><rect x="2" y="13" width="9" height="4" fill="none" stroke="currentColor" stroke-width="1" /><rect x="13" y="13" width="9" height="4" fill="none" stroke="currentColor" stroke-width="1" /></svg>'},{type:"lvgl_tabview",label:"Tabview",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><line x1="2" y1="8" x2="22" y2="8" stroke="currentColor" stroke-width="1" /></svg>'},{type:"lvgl_tileview",label:"Tileview",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="2" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2" /><rect x="13" y="2" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2" /><rect x="2" y="13" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2" /><rect x="13" y="13" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"template_nav_bar",label:"Nav Bar (Template)",tag:"Nav",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M6 10l-2 2 2 2M18 10l2 2-2 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 12h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'}]}];function Ss(t=zn){const e=[];return t.forEach(n=>{n.widgets.forEach(i=>{e.includes(i.type)||e.push(i.type)})}),e}function Es(t,e){return e==="lvgl"?t.id==="lvgl":e==="oepl"||e==="opendisplay"?t.id==="opendisplay"||t.id==="core"||t.id==="shapes":!!t.expanded}function Cs(t,e,n,i){let o=!0,r="";if(n?.supportedModes)return{isCompatible:n.supportedModes.includes(i),explanation:`Not supported in ${i} mode`};if(i==="oepl"||i==="opendisplay"){const s=i==="oepl"?!!n?.exportOEPL:!!n?.exportOpenDisplay,a=e.id==="ondevice"||e.id==="lvgl",l=t.type==="calendar"||t.type==="weather_forecast"||t.type==="graph"||t.type==="quote_rss";o=s&&!a&&!l,r=`Not supported in ${i==="oepl"?"OpenEpaperLink":"OpenDisplay"} mode`}else if(i==="lvgl"){const s=t.type.startsWith("lvgl_"),a=e.id==="inputs",l=typeof n?.exportLVGL=="function";o=s||a||l,r="Widget not compatible with LVGL mode"}else if(i==="direct"){const s=t.type.startsWith("lvgl_")||t.type.startsWith("oepl_");n?o=!!n.export&&!s:o=!s,r="Not supported in Direct rendering mode"}return{isCompatible:o,explanation:r}}function ks(t,e){const n=document.createElement("div");n.className="widget-category-header";let i='<span class="category-icon">&#8250;</span>';return t.icon&&(i+=t.icon),n.innerHTML=`
        ${i}
        <span class="category-name">${t.name}</span>
        ${t.widgets.length>0&&!e?`<span class="category-count">${t.widgets.length}</span>`:""}
    `,n}function Is(t,e,n,i,o){const r=document.createElement("div"),s=i.get(t.type),{isCompatible:a,explanation:l}=Cs(t,e,s,n);r.className="item"+(a?"":" incompatible"),r.draggable=a,r.dataset.widgetType=t.type;const c=t.label||s?.name,d=t.tag?`<span class="tag">${t.tag}</span>`:"";return r.innerHTML=`
        ${t.icon}
        <span class="label">${c}</span>
        ${d}
    `,r.title=a?`Add ${c} to canvas`:l,a?r.addEventListener("dragstart",u=>{u.dataTransfer&&(u.dataTransfer.setData("application/widget-type",t.type),u.dataTransfer.setData("text/plain",t.type),u.dataTransfer.effectAllowed="copy")}):r.addEventListener("click",u=>{u.stopPropagation(),o(l,"warning")}),r}function Ls(t){const{container:e,categories:n,currentMode:i,registry:o,showToast:r}=t;e.innerHTML="",n.forEach(s=>{const a=Es(s,i),l=document.createElement("div");l.className=`widget-category ${a?"expanded":""}`,l.dataset.category=s.id;const c=ks(s,a);c.addEventListener("click",()=>{l.classList.toggle("expanded")});const d=document.createElement("div");d.className="widget-category-items",s.widgets.forEach(u=>{d.appendChild(Is(u,s,i,o,r))}),l.appendChild(c),l.appendChild(d),e.appendChild(l)})}const qt=Ss();async function Ps(t){const e=document.getElementById(t);if(!e)return;const n=p?.settings?.renderingMode||"direct";_.log(`[Palette] Rendering palette for mode: ${n}`),e.innerHTML='<div class="palette-loading" style="padding: 20px; color: #999; text-align: center; font-size: 13px;">Loading widgets...</div>',_.log(`[Palette] Pre-loading ${qt.length} widget plugins...`),await Promise.all(qt.map(i=>q.load(i))).catch(i=>_.error("[Palette] Failed to load some plugins:",i)),Ls({container:e,categories:zn,currentMode:n,registry:q,showToast:A})}W(C.SETTINGS_CHANGED,t=>{t&&t.renderingMode!==void 0&&(_.log(`[Palette] Settings changed, refreshing palette for mode: ${t.renderingMode}`),Ps("widgetPalette"))});function Vt(t,e){const n=document.createElement("div");n.style.fontSize="10px",n.style.color="var(--muted)",n.style.marginBottom="6px",n.style.fontWeight="600",n.style.marginTop="8px",n.textContent=e,t.appendChild(n)}function Xt(t){const e=document.createElement("div");return e.style.display="flex",e.style.gap="4px",t.appendChild(e),e}function Ts(t,e){if(!e)return;const n=p.getSelectedWidgets();if(n.length===0){e.style.display="none";return}e.style.display="block",e.innerHTML="",Vt(e,"GROUPING");const i=Xt(e),o=n.some(d=>d.type==="group"||d.parentId),r=document.createElement("button");r.className="btn btn-secondary",r.innerHTML='<i class="mdi mdi-group" style="margin-right:4px"></i>Group',r.style.flex="1",r.style.fontSize="10px",r.disabled=n.length<2||o,r.onclick=()=>p.groupSelection(),i.appendChild(r);const s=document.createElement("button");if(s.className="btn btn-secondary",s.innerHTML='<i class="mdi mdi-ungroup" style="margin-right:4px"></i>Ungroup',s.style.flex="1",s.style.fontSize="10px",s.disabled=!o,s.onclick=()=>p.ungroupSelection(),i.appendChild(s),n.length!==1)return;const a=n[0];Vt(e,"LAYER ORDER");const l=Xt(e);[{label:"Front",icon:"mdi-arrange-bring-to-front",action:()=>t.moveToFront(a)},{label:"Back",icon:"mdi-arrange-send-to-back",action:()=>t.moveToBack(a)},{label:"Up",icon:"mdi-arrow-up",action:()=>t.moveUp(a)},{label:"Down",icon:"mdi-arrow-down",action:()=>t.moveDown(a)}].forEach(d=>{const u=document.createElement("button");u.className="btn btn-secondary",u.innerHTML=`<i class="mdi ${d.icon}"></i>`,u.title=d.label,u.style.flex="1",u.style.fontSize="12px",u.style.padding="4px",u.onclick=()=>d.action(),l.appendChild(u)})}function Ms(t){let e=t.props?.name||t.props?.title||t.props?.text||t.title;if(!e||e===""){const i=q.get(t.type);e=i?i.name:t.type}const n=q.get(t.type)?.name;if(e===t.type||n&&e===n){const i=t.id.split("_").pop();e=`${e} (${i})`}return e}function As(t){return`<i class="mdi ${{text:"mdi-format-text",sensor_text:"mdi-numeric",icon:"mdi-emoticon-outline",image:"mdi-image",weather_icon:"mdi-weather-partly-cloudy",qr_code:"mdi-qrcode",line:"mdi-vector-line",lvgl_line:"mdi-vector-line",rect:"mdi-square-outline",shape_rect:"mdi-square-outline",arc:"mdi-circle-outline",shape_circle:"mdi-circle-outline",bar:"mdi-chart-gantt",button:"mdi-gesture-tap-button",checkbox:"mdi-checkbox-marked-outline",calendar:"mdi-calendar",weather_forecast:"mdi-weather-partly-cloudy",datetime:"mdi-clock-outline",graph:"mdi-chart-timeline-variant",touch_area:"mdi-fingerprint",group:"mdi-folder-outline"}[t]||"mdi-widgets-outline"}"></i>`}function Os(t,e,n,i=0){const o=document.createElement("div");o.className=`hierarchy-item ${e.hidden?"hidden-widget":""}`,i>0&&o.classList.add("child-item"),(p.selectedWidgetIds||[]).includes(e.id)&&o.classList.add("selected"),o.dataset.id=e.id,o.dataset.index=String(n),o.draggable=!e.locked,e.locked&&o.classList.add("locked"),o.style.paddingLeft=`${12+i*20}px`;const s=As(e.type),a=Ms(e),l=e.type==="group";if(o.innerHTML=`
        <div class="hierarchy-item-drag-handle" style="${e.locked?"display:none":""}">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="5" r="1"></circle><circle cx="9" cy="12" r="1"></circle><circle cx="9" cy="19" r="1"></circle>
                <circle cx="15" cy="5" r="1"></circle><circle cx="15" cy="12" r="1"></circle><circle cx="15" cy="19" r="1"></circle>
            </svg>
        </div>
        ${l?`
        <div class="hierarchy-group-toggle ${e.expanded!==!1?"expanded":""}">
            <i class="mdi mdi-chevron-down"></i>
        </div>
        `:'<div style="width: 16px;"></div>'}
        <div class="hierarchy-item-icon">${s}</div>
        <div class="hierarchy-item-label">${a}</div>
        <div class="hierarchy-item-actions">
            <div class="hierarchy-item-action toggle-lock" title="${e.locked?"Unlock":"Lock"}">
                <i class="mdi ${e.locked?"mdi-lock-outline":"mdi-lock-open-outline"}"></i>
            </div>
            <div class="hierarchy-item-action toggle-visibility" title="Toggle Visibility">
                <i class="mdi ${e.hidden?"mdi-eye-off-outline":"mdi-eye-outline"}"></i>
            </div>
            <div class="hierarchy-item-action delete-widget danger" title="Delete Widget">
                <i class="mdi mdi-delete-outline"></i>
            </div>
        </div>
    `,l){const g=o.querySelector(".hierarchy-group-toggle");g&&g.addEventListener("click",m=>{p.updateWidget(e.id,{expanded:e.expanded===!1}),m.stopPropagation()})}const c=o.querySelector(".hierarchy-item-label");c&&c.addEventListener("click",g=>{if((p.selectedWidgetIds||[]).includes(e.id)){const m=prompt("Rename:",a);m!==null&&m!==""&&m!==a&&p.updateWidget(e.id,{title:m}),g.stopPropagation()}}),o.addEventListener("click",g=>{const m=g.ctrlKey||g.shiftKey;p.selectWidget(e.id,m),g.stopPropagation()});const d=o.querySelector(".toggle-lock");d&&d.addEventListener("click",g=>{p.updateWidget(e.id,{locked:!e.locked}),g.stopPropagation()});const u=o.querySelector(".toggle-visibility");u&&u.addEventListener("click",g=>{p.updateWidget(e.id,{hidden:!e.hidden}),g.stopPropagation()});const h=o.querySelector(".delete-widget");return h&&h.addEventListener("click",g=>{confirm(`Delete widget "${a}"?`)&&p.deleteWidget(e.id),g.stopPropagation()}),o.addEventListener("dragstart",g=>{g.dataTransfer&&(t.draggedIndex=n,o.classList.add("dragging"),g.dataTransfer.setData("application/widget-id",e.id),g.dataTransfer.effectAllowed="move")}),o.addEventListener("dragend",()=>{if(o.classList.remove("dragging"),t.draggedIndex=null,!t.listContainer)return;t.listContainer.querySelectorAll(".hierarchy-item").forEach(m=>m.classList.remove("drag-over"))}),o.addEventListener("dragover",g=>{g.dataTransfer&&(g.preventDefault(),g.dataTransfer.dropEffect="move",o.classList.add("drag-over"))}),o.addEventListener("dragleave",()=>{o.classList.remove("drag-over")}),o.addEventListener("drop",g=>{if(!g.dataTransfer)return;g.preventDefault();const m=g.dataTransfer.getData("application/widget-id"),y=o.dataset.id;if(m===y)return;const v=p.getWidgetById(y);if(!v)return;v.type==="group"?p.updateWidget(m,{parentId:y,expanded:!0}):p.updateWidget(m,{parentId:v.parentId||null});const f=parseInt(o.dataset.index||"-1",10);t.draggedIndex!==null&&p.reorderWidget(p.currentPageIndex,t.draggedIndex,f)}),o}function Ds(t){const e=t.filter(i=>!i.parentId).reverse(),n=new Map;return t.forEach(i=>{i.parentId&&(n.has(i.parentId)||n.set(i.parentId,[]),n.get(i.parentId).push(i))}),{topLevel:e,childrenMap:n}}function Hs(t,e,n){const i=t.findIndex(o=>o.id===e);if(i===-1)return!1;if(n==="front"){if(i>=t.length-1)return!1;const[o]=t.splice(i,1);return t.push(o),!0}if(n==="back"){if(i===0)return!1;const[o]=t.splice(i,1);return t.unshift(o),!0}return n==="up"?i>=t.length-1?!1:([t[i],t[i+1]]=[t[i+1],t[i]],!0):n==="down"?i===0?!1:([t[i],t[i-1]]=[t[i-1],t[i]],!0):!1}class Ea{constructor(){this.listContainer=null,this.header=null,this.panel=null,this.controlsContainer=null,this.draggedIndex=null,this.render=this.render.bind(this),this.highlightSelected=this.highlightSelected.bind(this)}init(){if(this.listContainer=document.getElementById("hierarchyList"),this.header=document.getElementById("hierarchyHeader"),this.panel=document.getElementById("hierarchyPanel"),!this.listContainer||!this.header||!this.panel){_.error("[HierarchyView] Required DOM elements not found");return}this.controlsContainer=document.createElement("div"),this.controlsContainer.id="hierarchyControls",this.controlsContainer.className="hierarchy-controls",this.controlsContainer.style.padding="8px 8px",this.controlsContainer.style.borderTop="1px solid var(--border-subtle)",this.panel.appendChild(this.controlsContainer),this.bindEvents(),this.render(),this.renderHeaderActions(),_.log("[HierarchyView] Initialized")}renderHeaderActions(){if(!this.header)return;let e=this.header.querySelector(".hierarchy-header-toggles");if(!e){e=document.createElement("div"),e.className="hierarchy-header-toggles";const n=this.header.querySelector(".chevron");this.header.insertBefore(e,n||null);const i=this.createHeaderToggle("mdi-lock-outline","Toggle All Locks",()=>{const r=p.getCurrentPage()?.widgets||[],s=r.every(a=>a.locked);r.forEach(a=>p.updateWidget(a.id,{locked:!s}))}),o=this.createHeaderToggle("mdi-eye-outline","Toggle All Visibility",()=>{const r=p.getCurrentPage()?.widgets||[],s=r.every(a=>a.hidden);r.forEach(a=>p.updateWidget(a.id,{hidden:!s}))});e.appendChild(i),e.appendChild(o)}}createHeaderToggle(e,n,i){const o=document.createElement("div");return o.className="h-toggle",o.title=n,o.innerHTML=`<i class="mdi ${e}"></i>`,o.onclick=r=>{r.stopPropagation(),i()},o}bindEvents(){this.header.addEventListener("click",()=>this.toggleCollapse()),W(C.STATE_CHANGED,this.render),W(C.PAGE_CHANGED,this.render),W(C.SELECTION_CHANGED,this.highlightSelected)}toggleCollapse(){if(!this.panel||!this.header)return;const e=this.panel.classList.toggle("hidden"),n=this.header.querySelector(".chevron");n&&(n.style.transform=e?"rotate(-90deg)":"rotate(0deg)")}highlightSelected(){if(!this.listContainer)return;const e=p.selectedWidgetIds||[];this.listContainer.querySelectorAll(".hierarchy-item").forEach(i=>{e.includes(i.dataset.id)?i.classList.add("selected"):i.classList.remove("selected")}),this.renderControls()}render(){if(!this.listContainer||!this.controlsContainer)return;const e=p.getCurrentPage();if(!e)return;if(this.listContainer.innerHTML="",!e.widgets||e.widgets.length===0){this.listContainer.innerHTML='<div style="font-size: 10px; color: var(--muted); text-align: center; padding: 12px;">No widgets on this page</div>',this.controlsContainer.style.display="none";return}const{topLevel:n,childrenMap:i}=Ds(e.widgets),o=(r,s=0)=>{const a=e.widgets.indexOf(r),l=this.createItem(r,a,s);this.listContainer.appendChild(l);const c=i.get(r.id);c&&r.expanded!==!1&&[...c].reverse().forEach(d=>o(d,s+1))};n.forEach(r=>o(r)),this.highlightSelected(),this.renderControls()}createItem(e,n,i=0){return Os(this,e,n,i)}renderControls(){Ts(this,this.controlsContainer)}moveLayerOrder(e,n){const i=p.getCurrentPage();i&&Hs(i.widgets,e.id,n)&&p.setPages(p.pages)}moveToFront(e){this.moveLayerOrder(e,"front")}moveToBack(e){this.moveLayerOrder(e,"back")}moveUp(e){this.moveLayerOrder(e,"up")}moveDown(e){this.moveLayerOrder(e,"down")}}function Ca(t){if(!t.modelInput||!H)return;const e=t.modelInput.value;_.log("[DeviceSettings] Populating dropdown with",Object.keys(H).length,"profiles"),t.modelInput.innerHTML="";const n=mt||[],i=[],o=[];Object.entries(H).forEach(([a,l])=>{l.isCustomProfile||l.isOfflineImport?o.push([a,l]):i.push([a,l])});const r=(a,l)=>{const c=document.createElement("option");c.value=a;let d=l.name||a;d=d.replace(/\s*\(Local\)\s*/gi,"").replace(/\s*\(untested\)\s*/gi,"").trim();const u=[];return(l.isCustomProfile||l.isOfflineImport)&&u.push("Imported"),n.includes(a)||u.push("untested"),u.length>0&&(d+=` (${u.join(", ")})`),c.textContent=d,c};if(i.forEach(([a,l])=>t.modelInput.appendChild(r(a,l))),o.length>0&&i.length>0){const a=document.createElement("option");a.disabled=!0,a.textContent="?????? User-Imported / Custom ??????",a.style.fontWeight="bold",a.style.color="var(--text-dim)",t.modelInput.appendChild(a)}o.forEach(([a,l])=>t.modelInput.appendChild(r(a,l)));const s=document.createElement("option");s.value="custom",s.textContent="Custom Profile...",s.style.fontWeight="bold",s.style.color="var(--accent)",t.modelInput.appendChild(s),e&&(Object.prototype.hasOwnProperty.call(H,e)||e==="custom")?t.modelInput.value=e:t.modelInput.value||(t.modelInput.value="reterminal_e1001"),t.customHardwarePanel.updateVisibility()}function ka(t){const e=t.modeSleep?.checked,n=t.modeDaily?.checked,i=t.modeDeepSleep?.checked,o=t.modeManual?.checked;t.sleepRow&&(t.sleepRow.style.display=e||i?"flex":"none"),t.dailyRefreshRow&&(t.dailyRefreshRow.style.display=n?"flex":"none"),t.deepSleepRow&&(t.deepSleepRow.style.display=i?"block":"none"),t.deepSleepOptionsRow&&(t.deepSleepOptionsRow.style.display=i?"flex":"none");const r=p.settings.lcdEcoStrategy||"backlight_off";t.dimTimeoutRow&&(t.dimTimeoutRow.style.display=r==="dim_after_timeout"?"flex":"none");const s=t.renderingModeInput?.value||p.settings.renderingMode||"direct",a=s==="lvgl"||s==="direct",l=s==="oepl"||s==="opendisplay";t.powerStrategySection&&(t.powerStrategySection.style.display=a?"block":"none"),t.protocolHardwareSection&&(t.protocolHardwareSection.style.display=l?"block":"none"),t.deviceModelField&&(t.deviceModelField.style.display=l?"none":"block");const c=!n&&!o;if(t.refreshIntervalRow&&(t.refreshIntervalRow.style.display=c?"block":"none"),t.autoCycleRow&&(t.autoCycleRow.style.display=t.autoCycleEnabled?.checked?"flex":"none"),t.deepSleepStayAwakeEntityRow){const d=document.getElementById("setting-deep-sleep-stay-awake");t.deepSleepStayAwakeEntityRow.style.display=d?.checked?"flex":"none"}t.customHardwarePanel.updateVisibility(),t.protocolHardwarePanel.updateStrategyDisplay()}function Ze(t){const e=document.createElement("div");return e.textContent=t||"",e.innerHTML}function Gs(t,e,n){if(t&&e&&e[t]){let o=e[t].name||t||"Unknown";return n.includes(t)||(o+=" (untested)"),o}const i={reterminal_e1001:"E1001 (Mono)",reterminal_e1002:"E1002 (Color)",trmnl:"TRMNL",esp32_s3_photopainter:"PhotoPainter (7-Color)"};return t&&(i[t]||t)||"Unknown"}function Ia(t,e,n,i){return t.map(o=>{const r=o.id===e,s=t.filter(a=>a.name===o.name).length>1;return`
                <tr style="border-bottom: 1px solid var(--border-subtle); ${r?"background: var(--accent-soft);":""}">
                    <td style="padding: 8px 4px;">
                        <span style="font-weight: 500;">${Ze(o.name)}</span>
                        ${r?'<span style="background: var(--accent); color: white; font-size: 9px; padding: 2px 4px; border-radius: 2px; margin-left: 4px;">current</span>':""}
                        ${s?'<br><span style="font-size: 9px; color: var(--muted);">'+Ze(o.id)+"</span>":""}
                    </td>
                    <td style="padding: 8px 4px; font-size: 11px; color: var(--muted);">${Gs(o.device_model||o.device_type,n,i)}</td>
                    <td style="padding: 8px 4px; font-size: 11px; color: var(--muted);">${o.page_count} pages</td>
                    <td style="padding: 8px 4px; text-align: right;">
                        <div style="display: flex; gap: 4px; justify-content: flex-end;">
                            ${r?"":`<button type="button" class="btn btn-sm btn-primary" style="font-size: 10px; padding: 4px 8px;" data-action="load" data-id="${o.id}">Load</button>`}
                            <button type="button" class="btn btn-sm btn-secondary" style="font-size: 10px; padding: 4px 8px;" data-action="export" data-id="${o.id}">Export</button>
                            ${!r&&t.length>1?`<button type="button" class="btn btn-sm btn-secondary" style="font-size: 10px; padding: 4px 8px; color: var(--danger);" data-action="delete" data-id="${o.id}" data-name="${Ze(o.name)}">Delete</button>`:""}
                        </div>
                    </td>
                </tr>
            `}).join("")}function Bs(){return`
            <div class="modal" style="max-width: 600px;">
                <div class="modal-header">
                    <div>Manage Layouts</div>
                    <button type="button" id="layoutManagerClose" class="btn btn-secondary">x</button>
                </div>
                <div class="modal-body">
                    <div class="layout-manager-current" style="margin-bottom: 12px; padding: 8px; background: var(--bg-subtle); border-radius: 4px;">
                        <span class="prop-label" style="font-size: 11px; color: var(--muted);">Current Layout:</span>
                        <span id="layoutManagerCurrentName" style="font-weight: 500; margin-left: 8px;">Loading...</span>
                    </div>

                    <div class="layout-manager-list-container" style="max-height: 300px; overflow-y: auto; margin-bottom: 12px;">
                        <table class="layout-manager-table" style="width: 100%; border-collapse: collapse;">
                            <thead>
                                <tr style="border-bottom: 1px solid var(--border);">
                                    <th style="text-align: left; padding: 8px 4px; font-size: 11px;">Name</th>
                                    <th style="text-align: left; padding: 8px 4px; font-size: 11px;">Device</th>
                                    <th style="text-align: left; padding: 8px 4px; font-size: 11px;">Pages</th>
                                    <th style="text-align: right; padding: 8px 4px; font-size: 11px;">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="layoutManagerTableBody">
                                <tr><td colspan="4" style="text-align: center; color: var(--muted); padding: 16px;">Loading...</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="layout-manager-actions" style="display: flex; gap: 8px; flex-wrap: wrap;">
                        <button type="button" id="layoutManagerNew" class="btn btn-primary" style="flex: 1;">+ New Layout</button>
                        <button type="button" id="layoutManagerImport" class="btn btn-secondary" style="flex: 1;">Import from File</button>
                        <input type="file" id="layoutManagerFileInput" accept=".json" style="display: none;">
                    </div>

                    <div id="layoutManagerStatus" class="layout-manager-status" style="margin-top: 8px; font-size: 11px; min-height: 20px;"></div>
                </div>
            </div>
        `}function Rs(t,e){return t?Object.entries(t).map(([n,i])=>{let o=i.name||n;return e.includes(n)||(o+=" (untested)"),`<option value="${n}">${o}</option>`}).join(""):'<option value="reterminal_e1001">reTerminal E1001</option>'}function Ws(t){return`
                <div class="modal" style="max-width: 400px;">
                    <div class="modal-header">
                        <div>Create New Layout</div>
                        <button type="button" id="newLayoutClose" class="btn btn-secondary">x</button>
                    </div>
                    <div class="modal-body">
                        <div class="field" style="margin-bottom: 12px;">
                            <div class="prop-label">Layout Name</div>
                            <input id="newLayoutName" class="prop-input" type="text" placeholder="e.g. Living Room Display" />
                        </div>
                        <div class="field">
                            <div class="prop-label">Device Type</div>
                            <select id="newLayoutDeviceType" class="prop-input">
                                ${t}
                            </select>
                            <p class="hint" style="color: var(--muted); font-size: 11px; margin-top: 4px;">Select the device that will display this layout.</p>
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button type="button" id="newLayoutCancel" class="btn btn-secondary">Cancel</button>
                        <button type="button" id="newLayoutConfirm" class="btn btn-primary">Create Layout</button>
                    </div>
                </div>
            `}function Et(t){return document.getElementById(t)}function $n(t){return document.getElementById(t)}function re(t){const e=document.getElementById(t);if(!e)throw new Error(`Missing element: ${t}`);return e}function La(){return Rs(H,mt||[])}function Pa(t){const e=document.getElementById("layoutManagerModal");if(e)return t.modal=e,e;const n=document.createElement("div");n.id="layoutManagerModal",n.className="modal-backdrop hidden",n.innerHTML=Bs(),V(n),t.modal=n;const i=re("layoutManagerClose"),o=re("layoutManagerNew"),r=re("layoutManagerImport"),s=re("layoutManagerFileInput");i.addEventListener("click",()=>t.close()),o.addEventListener("click",()=>t.showNewLayoutDialog()),r.addEventListener("click",()=>{s.click()}),s.addEventListener("change",l=>t.handleFileImport(l)),n.addEventListener("click",l=>{l.target===n&&t.close()});const a=document.getElementById("layoutManagerTableBody");return a&&a.addEventListener("click",l=>{const c=l.target instanceof HTMLElement?l.target.closest("button"):null;if(!c)return;const{action:d,id:u,name:h}=c.dataset;d==="load"&&u&&t.loadLayout(u),d==="export"&&u&&t.exportLayout(u),d==="delete"&&u&&h&&t.deleteLayout(u,h)}),n}function Ns(t){const e=document.getElementById("newLayoutModal");if(e)return e;const n=document.createElement("div");return n.id="newLayoutModal",n.className="modal-backdrop hidden",n.innerHTML=Ws(t.generateDeviceOptions()),V(n),re("newLayoutClose").addEventListener("click",()=>{n.classList.add("hidden")}),re("newLayoutCancel").addEventListener("click",()=>{n.classList.add("hidden")}),re("newLayoutConfirm").addEventListener("click",()=>{t.handleCreateLayoutConfirm()}),re("newLayoutName").addEventListener("keydown",i=>{i.key==="Enter"?(i.preventDefault(),t.handleCreateLayoutConfirm()):i.key==="Escape"&&n.classList.add("hidden"),i.stopPropagation()}),n.addEventListener("click",i=>{if(i.target===n){const o=Et("newLayoutName");document.activeElement!==o&&n.classList.add("hidden")}}),n}function Ta(t){const e=Ns(t),n=Et("newLayoutName");if(!n)return;const i=t.layouts.length;n.value=`Layout ${i+1}`;const o=H?Object.keys(H)[0]:"reterminal_e1001",r=$n("newLayoutDeviceType");r&&(r.value=o),e.classList.remove("hidden"),setTimeout(()=>n.focus(),100)}function Ma(t){const e=Et("newLayoutName"),n=$n("newLayoutDeviceType"),i=e?.value.trim()||"",o=n?.value||"reterminal_e1001";if(!i){alert("Please enter a layout name.");return}const r=document.getElementById("newLayoutModal");r&&r.classList.add("hidden"),t.createLayout(i,o)}const Yn=t=>new Promise(e=>setTimeout(e,t));async function Fs(t){const e=await $(`${t}/layouts`,{headers:z()});if(!e.ok)throw new Error(`Failed to load layouts: ${e.status}`);return e.json()}async function zs(t,e){const n=await $(`${t}/layouts/${e}`,{headers:z()});if(!n.ok)throw new Error(`Failed to load layout: ${n.status}`);return n.json()}async function $s(t,e){return $(`${t}/layouts/${e}`,{method:"POST",headers:{...z(),"Content-Type":"text/plain"},body:JSON.stringify({action:"delete"})})}async function Ys(t,e){return $(`${t}/layouts`,{method:"POST",headers:{...z(),"Content-Type":"text/plain"},body:JSON.stringify(e)})}async function js(t,e,n,i){const o=`${t}/import${n?"?overwrite=true":""}`;return $(o,{method:"POST",headers:i(),body:JSON.stringify(e)})}function Us(t){return t instanceof Error?t.message:String(t)}function Le(){return F||""}async function Aa(t){if(!N()){t.setStatus("Not connected to Home Assistant","error");return}try{const e=await Fs(Le());t.layouts=e.layouts||[],e.last_active_layout_id&&t.layouts.some(n=>n.id===e.last_active_layout_id)&&(!p?.currentLayoutId||p.currentLayoutId==="reterminal_e1001")&&t.layouts.find(i=>i.id===e.last_active_layout_id)&&e.last_active_layout_id!==p?.currentLayoutId&&(_.log(`[LayoutManager] Syncing to last active layout: ${e.last_active_layout_id}`),t.currentLayoutId=e.last_active_layout_id,p&&typeof p.setCurrentLayoutId=="function"&&p.setCurrentLayoutId(e.last_active_layout_id)),t.renderLayoutList()}catch(e){_.error("[LayoutManager] Error loading layouts:",e),t.setStatus("Failed to load layouts","error")}}async function Oa(t,e){if(N())try{t.setStatus("Loading layout...","info");const n=await zs(Le(),e);n.device_id||(n.device_id=e),t.currentLayoutId=e,p&&typeof p.setCurrentLayoutId=="function"&&(p.setCurrentLayoutId(e),_.log(`[LayoutManager] Set currentLayoutId to: ${e}`));const i=document.getElementById("canvas");if(i){const o=i.querySelector(".canvas-grid");i.innerHTML="",o&&i.appendChild(o),_.log("[LayoutManager] Cleared canvas before loading layout")}document.querySelectorAll(".graph-axis-label").forEach(o=>o.remove()),typeof ue=="function"&&ue(n),p&&p.currentLayoutId!==e&&(p.setCurrentLayoutId(e),_.log(`[LayoutManager] Re-set currentLayoutId to: ${e} (was changed by loadLayoutIntoState)`)),typeof L=="function"&&typeof C<"u"&&L(C.LAYOUT_IMPORTED,n),t.setStatus(`Loaded: ${n.name||e}`,"success"),t.renderLayoutList(),setTimeout(()=>t.close(),500)}catch(n){_.error("[LayoutManager] Error loading layout:",n),t.setStatus("Failed to load layout","error")}}async function Da(t,e){if(!N())return;let n=null;try{const i=`${F}/export?id=${e}`,o=await $(i,{headers:z()});if(!o.ok){const l=await o.json().catch(()=>({}));throw new Error(l.error||`Export failed: ${o.status}`)}const r=await o.json(),s=new Blob([JSON.stringify(r,null,2)],{type:"application/json"});n=URL.createObjectURL(s);const a=document.createElement("a");a.href=n,a.download=`${e}_layout.json`,document.body.appendChild(a),a.click(),document.body.removeChild(a),t.setStatus("Export started...","success")}catch(i){_.error("[LayoutManager] Error exporting layout:",i),t.setStatus("Failed to export layout","error")}finally{n&&URL.revokeObjectURL(n)}}async function Ha(t,e,n){if(N()&&confirm(`Are you sure you want to delete "${n}"?

This cannot be undone.`)){t.setStatus("Deleting layout...","info");try{const i=await $s(Le(),e);if(!i.ok){const o=await i.json().catch(()=>({}));if(o.error==="cannot_delete_last_layout"){t.setStatus("Cannot delete the last layout","error");return}throw new Error(o.error||`Delete failed: ${i.status}`)}t.setStatus(`Deleted: ${n}`,"success"),await t.loadLayouts()}catch(i){_.warn("[LayoutManager] Network error during delete, verifying if operation completed..."),await Yn(1500),await t.loadLayouts(),t.layouts.some(r=>r.id===e)?(_.error("[LayoutManager] Error deleting layout:",i),t.setStatus("Failed to delete layout","error")):(_.log("[LayoutManager] Layout was successfully deleted (verified after refresh)"),t.setStatus(`Deleted: ${n}`,"success"))}}}async function Ga(t,e,n="reterminal_e1001"){if(!N())return;let i=e.toLowerCase().replace(/\s+/g,"_").replace(/[^a-z0-9_]/g,"");i||(i="layout");const o=`${i}_${Date.now()}`;t.setStatus("Creating layout...","info");let r=!1;try{const d=await Ys(Le(),{id:o,name:e,device_type:n,device_model:n});if(!d.ok){const u=await d.json().catch(()=>({}));throw new Error(u.error||`Create failed: ${d.status}`)}r=!0}catch(d){if(_.warn("[LayoutManager] Network error during create, verifying if operation completed..."),await Yn(1500),await t.loadLayouts(),t.layouts.some(h=>h.id===o))_.log("[LayoutManager] Layout was successfully created (verified after refresh)"),r=!0;else{_.error("[LayoutManager] Error creating layout:",d),t.setStatus("Failed to create layout","error");return}}if(!r)return;t.setStatus(`Created: ${e}`,"success"),await t.loadLayouts();const s=H[n],a=s&&s.features&&s.features.epaper,l=s&&s.features&&s.features.lvgl,c=a&&!l?"direct":"lvgl";_.log(`[LayoutManager] New layout ${o} detected device type. isEpaper=${a}, hasLvgl=${l}. Setting initial renderingMode to: ${c}`),p&&(p.setPages([{id:"page_0",name:"Page 1",widgets:[]}]),p.setCurrentPageIndex(0),p.updateSettings({renderingMode:c,device_model:n}),_.log("[LayoutManager] Cleared state and set initial settings before loading new layout")),await t.loadLayout(o),p&&(p.setDeviceModel(n),typeof L=="function"&&typeof C<"u"&&L(C.STATE_CHANGED),_.log(`[LayoutManager] Created layout '${o}' with device_model: ${n}, pages: ${p.pages?.length}, widgets: ${p.getCurrentPage()?.widgets?.length||0}`))}async function Ba(t,e){const n=e.target instanceof HTMLInputElement?e.target:null,i=n?.files?.[0];if(i){try{const o=await i.text(),r=JSON.parse(o);if(!r.pages&&!r.device_id){t.setStatus("Invalid layout file","error");return}await t.importLayout(r)}catch(o){_.error("[LayoutManager] Error importing file:",o),t.setStatus(`Failed to import file: ${Us(o)}`,"error")}n&&(n.value="")}}async function Ra(t,e,n=!1){if(N())try{const i=await js(Le(),e,n,z),o=await i.json();if(!i.ok){if(o.error==="layout_exists"){confirm(`A layout with ID "${o.existing_id}" already exists.

Do you want to overwrite it?`)&&await t.importLayout(e,!0);return}throw new Error(o.error||`Import failed: ${i.status}`)}t.setStatus(`Imported: ${o.name||o.id}`,"success"),await t.loadLayouts()}catch(i){_.error("[LayoutManager] Error importing layout:",i),t.setStatus("Failed to import layout","error")}}export{ea as $,p as A,ia as B,lt as C,H as D,C as E,oa as F,We as G,ra as H,q as I,Tn as J,Kn as K,_ as L,qn as M,$ as N,z as O,aa as P,pa as Q,ca as R,mt as S,da as T,Bn as U,la as V,fs as W,ha as X,ua as Y,ga as Z,Qs as _,hn as a,ta as a0,Ea as a1,na as a2,K as a3,Zs as a4,sa as a5,Ps as a6,fa as a7,ma as a8,va as a9,ya as aa,P as ab,j as ac,Sr as ad,bt as ae,Ft as af,Nn as ag,xa as ah,Xs as ai,Ks as aj,_a as ak,wa as al,ba as am,xs as an,ke as ao,Js as ap,ka as b,G as c,J as d,L as e,Pa as f,Aa as g,N as h,Ze as i,Gs as j,Oa as k,Te as l,Da as m,Ha as n,W as o,Ca as p,Ns as q,Ia as r,A as s,Ta as t,Sa as u,Ma as v,La as w,Ga as x,Ba as y,Ra as z};
