const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./plugin-J8j2oz_x.js","./vendor-Bi4LEBGV.js","./yaml-engine-DWXYx0jL.js","./plugin-G0xoarQm.js","./plugin-BJ-GVT9I.js","./plugin-CdcTmM56.js","./plugin-SUjS27_R.js","./text_utils-DPZlj6Oi.js","./plugin-YpGMeDkx.js","./plugin-ikeQg1A3.js","./plugin-Ck8PgWB1.js","./plugin-dCaJeI_S.js","./plugin-rPrmVtYi.js","./plugin-CHhd1kSa.js","./plugin-CY8HMSqW.js","./plugin-CZB5Wimz.js","./plugin-B8wRmEsx.js","./template_converter-xh6TZI7e.js","./plugin-0WLnvmKn.js","./plugin-Dn9UGhih.js","./plugin-B5uEYmr_.js","./plugin-DNyknmt0.js","./plugin-CgcQgGpe.js","./plugin-4wufTPdX.js","./plugin-9PV-_IMF.js","./plugin-BEclA6uC.js","./plugin-DiMNzmjp.js","./plugin-ddChsXdY.js","./plugin-D2WSRTxz.js","./plugin-DBeJPOz5.js"])))=>i.map(i=>d[i]);
import"./vendor-Bi4LEBGV.js";import{l as de,p as Xt,h as Ie}from"./yaml-engine-DWXYx0jL.js";const zn="modulepreload",$n=function(t,e){return new URL(t,e).href},kt={},P=function(e,n,o){let i=Promise.resolve();if(n&&n.length>0){const s=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),l=a?.nonce||a?.getAttribute("nonce");i=Promise.allSettled(n.map(c=>{if(c=$n(c,o),c in kt)return;kt[c]=!0;const d=c.endsWith(".css"),u=d?'[rel="stylesheet"]':"";if(!!o)for(let g=s.length-1;g>=0;g--){const y=s[g];if(y.href===c&&(!d||y.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${u}`))return;const h=document.createElement("link");if(h.rel=d?"stylesheet":zn,d||(h.as="script"),h.crossOrigin="",h.href=c,l&&h.setAttribute("nonce",l),document.head.appendChild(h),d)return new Promise((g,y)=>{h.addEventListener("load",g),h.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(s){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=s,window.dispatchEvent(a),!a.defaultPrevented)throw s}return i.then(s=>{for(const a of s||[])a.status==="rejected"&&r(a.reason);return e().catch(r)})},Kt=new EventTarget,E={STATE_CHANGED:"state-changed",SELECTION_CHANGED:"selection-changed",WIDGET_UPDATED:"widget:updated",PAGE_CHANGED:"page-changed",HISTORY_CHANGED:"history-changed",SETTINGS_CHANGED:"settings-changed",LAYOUT_IMPORTED:"layout-imported",ENTITIES_LOADED:"entities-loaded",ZOOM_CHANGED:"zoom-changed",DEVICE_PROFILES_UPDATED:"device-profiles-updated"};function L(t,e={}){Kt.dispatchEvent(new CustomEvent(t,{detail:e}))}function G(t,e){Kt.addEventListener(t,n=>e(n.detail))}const Yn={WHITE:"#FFFFFF",BLACK:"#000000",GRAY:"#808080",GREY:"#808080",RED:"#FF0000",GREEN:"#00FF00",BLUE:"#0000FF",YELLOW:"#FFFF00",ORANGE:"#FFA500"},Un={GRID_SIZE:10,SNAP_THRESHOLD:10,SIDEBAR_WIDTH:300,PROPERTIES_WIDTH:350},jn={X:40,Y:40,WIDTH:200,HEIGHT:60},qn={TOP_LEFT:"TOP_LEFT",TOP_CENTER:"TOP_CENTER",TOP_RIGHT:"TOP_RIGHT",CENTER_LEFT:"CENTER_LEFT",CENTER:"CENTER",CENTER_RIGHT:"CENTER_RIGHT",BOTTOM_LEFT:"BOTTOM_LEFT",BOTTOM_CENTER:"BOTTOM_CENTER",BOTTOM_RIGHT:"BOTTOM_RIGHT"},Ze={LANDSCAPE:"landscape",PORTRAIT:"portrait"},Jt={snapEnabled:!0,showGrid:!0,showDebugGrid:!1,showRulers:!1,gridOpacity:8,editor_light_mode:!1,aiProvider:"gemini",aiModelGemini:"gemini-1.5-flash",aiModelOpenAI:"gpt-4o",aiModelOpenRouter:"",aiModelFilter:"",extendedLatinGlyphs:!1,autoCycleEnabled:!1,autoCycleIntervalS:30,refreshInterval:600,manualRefreshOnly:!1,darkMode:!1,invertedColors:!1,lcdEcoStrategy:"backlight_off",dimTimeout:10,sleepEnabled:!1,sleepStartHour:0,sleepEndHour:5,deepSleepEnabled:!1,deepSleepInterval:600,deepSleepStayAwakeSwitch:!1,deepSleepStayAwakeEntityId:"input_boolean.esphome_stay_awake",deepSleepFirmwareGuard:!1,dailyRefreshEnabled:!1,dailyRefreshTime:"08:00",noRefreshStartHour:null,noRefreshEndHour:null,renderingMode:"direct",oeplEntityId:"",oeplDither:2,opendisplayEntityId:"",opendisplayDither:2,opendisplayTtl:60,glyphsets:["GF_Latin_Kernel"]},Zt=50,Vn={RSS:300,ENTITIES:60},Xn=5e3,re=10,Kn=10,Qt={white:"COLOR_WHITE",black:"COLOR_BLACK",gray:"Color(160, 160, 160)",grey:"Color(160, 160, 160)",red:"COLOR_RED",green:"COLOR_GREEN",blue:"COLOR_BLUE",yellow:"COLOR_YELLOW",orange:"COLOR_ORANGE"},en=800,tn=480;window.ESPHomeDesigner=window.ESPHomeDesigner||{version:"0.9.0",constants:{COLORS:Yn,UI_DEFAULTS:Un,ALIGNMENT:qn,ORIENTATIONS:Ze,DEFAULT_PREFERENCES:Jt,WIDGET_DEFAULTS:jn,HISTORY_LIMIT:Zt,CACHE_TTL:Vn,ENTITY_LIMIT:Xn,ESPHOME_COLOR_MAPPING:Qt,DEFAULT_CANVAS_WIDTH:en,DEFAULT_CANVAS_HEIGHT:tn,SNAP_DISTANCE:re,GRID_SIZE:Kn}};function ne(){try{const t=globalThis;return typeof t.addEventListener=="function"&&typeof t.removeEventListener=="function"?t:null}catch{return null}}function D(t,e,n){const o=ne();return o?(n===void 0?o.addEventListener(t,e):o.addEventListener(t,e,n),!0):!1}function z(t,e,n){const o=ne();return o?(o.removeEventListener(t,e),!0):!1}function pt(t){const e=ne();return e?e.dispatchEvent(t):!1}function Jn(){return!!ne()?.isSecureContext}function Zn(){const t=ne();return{x:t?.scrollX||0,y:t?.scrollY||0}}function It(){return ne()?.devicePixelRatio||1}function Qn(t){const e=ne();return e?e.getComputedStyle(t):null}const ei=globalThis,ti=ei.process,Lt=ne(),ni=(typeof localStorage<"u"?localStorage.getItem("esphome-designer-debug"):ti?.env?.DEBUG||"")==="true"||!!Lt&&new URLSearchParams(Lt.location.search).get("debug")==="true",b={log:(...t)=>ni&&console.log("[ESPHomeDesigner]",...t),warn:(...t)=>console.warn("[ESPHomeDesigner]",...t),error:(...t)=>console.error("[ESPHomeDesigner]",...t)},ii=`# ============================================================================
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
`,oi=`# ============================================================================
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
`,ri=`# ============================================================================
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
`,si=`# ============================================================================
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


    # __LAMBDA_PLACEHOLDER__`,ai=`# ============================================================================
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
`,li=`# ============================================================================
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
`,di=`# ============================================================================
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
`,ci=`# ============================================================================
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
`,pi=`# ============================================================================
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
`,ui=`# ============================================================================
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
`,hi=`# ============================================================================
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
`,gi=`# ============================================================================
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
`,mi=`# ============================================================================\r
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
    internal: true`,fi=`# ============================================================================
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
`,yi=`# ============================================================================
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
`,vi=`# ============================================================================
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
`,nn="esphome-designer-ha-auth";let on=null;function ut(){try{const t=globalThis.location;return t||null}catch{return null}}function Ne(){try{return globalThis.localStorage??null}catch{return null}}function rn(t){if(typeof t!="string")return;const e=t.trim();!e||e==="null"||(on=e)}function bi(){try{const t=globalThis.name;if(!t)return;const e=JSON.parse(t);e?.type===nn&&rn(e.accessToken)}catch{}}function _i(){bi();try{globalThis.addEventListener?.("message",t=>{const e=ut();if(e&&t.origin!==e.origin)return;const n=t.data;n?.type===nn&&rn(n.accessToken)})}catch{}}function sn(t){if(!t)return null;let e=t.trim();if(!e)return null;try{const n=new URL(e);return n.protocol!=="http:"&&n.protocol!=="https:"?null:(e=`${n.origin}${n.pathname}`,n.search&&(e+=n.search),e.endsWith("/")&&(e=e.slice(0,-1)),e.includes("reterminal_dashboard")&&(e=e.replace("reterminal_dashboard","esphome_designer")),e.includes("/api/")||(e+="/api/esphome_designer"),e)}catch{return null}}function an(){const t=ln();if(t){const e=sn(t);return e?(e!==t.trim()&&(b.log("[Env] Normalizing stored manual HA URL"),dn(e)),e):(b.warn("[Env] Ignoring invalid manually configured HA URL"),null)}try{const e=ut();return!e||e.protocol==="file:"?null:e.hostname==="homeassistant"||e.hostname==="hassio"||e.pathname.includes("/api/")||e.pathname.includes("/local/")||e.pathname.includes("/hacsfiles/")||e.pathname.includes("/esphome-designer")?`${e.origin}/api/esphome_designer`:null}catch{return null}}function ln(){try{const t=Ne();return t?t.getItem("ha_manual_url"):null}catch{return null}}function dn(t){try{const e=Ne();if(!e)return;if(t){const n=sn(t);if(!n){b.warn("[Env] Refusing to store invalid HA URL");return}e.setItem("ha_manual_url",n)}else e.removeItem("ha_manual_url")}catch(e){b.error("Failed to save HA URL:",e)}}function cn(){try{const t=Ne();return t?t.getItem("ha_llat_token"):null}catch{return null}}function pn(){return on||cn()}function xi(t){try{const e=Ne();if(!e)return;t?e.setItem("ha_llat_token",t):e.removeItem("ha_llat_token")}catch(e){b.error("Failed to save HA Token:",e)}}let W=an();_i();function Pt(){W=an()}function R(){return!!W}function Qe(){try{const t=ut();return!t||t.protocol==="file:"?!1:t.hostname==="homeassistant"||t.hostname==="hassio"||t.pathname.includes("/api/esphome_designer")||t.pathname.includes("/esphome-designer")}catch{return!1}}const wi="data-esphome-designer-panel-root",Si="data-esphome-designer-overlay-root";function Ei(){return document.querySelector(`[${wi}]`)||document.body}function Ci(){return document.querySelector(`[${Si}]`)||Ei()}function U(t){return Ci().appendChild(t),t}function ki(){try{const t=globalThis.parent;return!t||t===globalThis?null:t}catch{return null}}function Ii(){const t=ki();if(!t)return null;try{const e=t.__ESPHOME_DESIGNER_HASS__;if(e&&typeof e.callApi=="function")return e}catch{}try{const e=t.document?.querySelector?.("esphome-designer-panel")?._hass;if(e&&typeof e.callApi=="function")return e}catch{}try{const e=t.document?.querySelector?.("home-assistant")?.hass;if(e&&typeof e.callApi=="function")return e}catch{}return null}function Li(t){if(!t)return null;try{decodeURI(t);const e=new URL(t,globalThis.location?.origin||"http://localhost");let n=e.pathname;return n.startsWith("/api/")?n=n.slice(5):n=n.replace(/^\/+/,""),`${n}${e.search}`}catch{return null}}function Pi(t){if(!t)return{};if(t instanceof Headers){const e={};return t.forEach((n,o)=>{e[o]=n}),e}return Array.isArray(t)?Object.fromEntries(t):{...t}}function Ti(t,e){if(t==null)return;if(typeof t!="string")return t;const n=Pi(e),o=n["Content-Type"]||n["content-type"]||"",i=t.trim();if(i){if(o.includes("application/json")||o.includes("text/plain")||i.startsWith("{")||i.startsWith("["))try{return JSON.parse(i)}catch{return t}return t}}function Tt(t,e=200){const n=typeof t=="string"?t:JSON.stringify(t);return{ok:e>=200&&e<300,status:e,json:async()=>t,text:async()=>n,blob:async()=>new Blob([n],{type:"application/json"})}}function Mi(t){const e=Number(t?.statusCode??t?.status_code??t?.status);return Number.isFinite(e)&&e>0?e:500}function Ai(t){const e=t,n=e?.message||"Request failed",o=e?.body;if(o&&typeof o=="object")return{message:n,...o};if(typeof o=="string")try{const i=JSON.parse(o);return{message:n,...i}}catch{return{error:o,message:n}}return{error:n,message:n}}async function Di(t,e={}){const n=Ii(),o=Li(t);if(!n||!o||typeof n.callApi!="function")return null;if(e.signal?.aborted)throw new DOMException("The operation was aborted.","AbortError");try{const i=await n.callApi((e.method||"GET").toLowerCase(),o,Ti(e.body,e.headers));return Tt(i,200)}catch(i){return Tt(Ai(i),Mi(i))}}function T(t,e="info",n=3e3){let o=document.getElementById("toast-container");o||(o=document.createElement("div"),o.id="toast-container",o.style.position="fixed",o.style.bottom="20px",o.style.right="20px",o.style.zIndex="9999",U(o));const i=document.createElement("div");i.className="toast";const r=i.style;e==="error"?r.background="rgba(255, 0, 0, 0.8)":e==="success"?r.background="rgba(0, 128, 0, 0.8)":r.background="rgba(0,0,0,0.8)",i.textContent=t,r.color="white",r.padding="10px 20px",r.borderRadius="4px",r.marginTop="10px",r.opacity="0",r.transition="opacity 0.3s",o.appendChild(i),requestAnimationFrame(()=>{r.opacity="1"}),setTimeout(()=>{r.opacity="0",setTimeout(()=>{i.remove()},300)},n)}async function Oi(){if(!R()){b.warn("Cannot load layout from backend: No HA backend detected.");return}try{let t=null;try{const o=await B(`${W}/layouts`,{headers:N()});if(o.ok){const i=await o.json();b.log("[loadLayoutFromBackend] Available layouts:",i.layouts?.map(r=>r.id)),b.log(`[loadLayoutFromBackend] Last active layout ID from backend: ${i.last_active_layout_id}`),i.last_active_layout_id&&(i.layouts?.some(s=>s.id===i.last_active_layout_id)?(t=i.last_active_layout_id,b.log(`[loadLayoutFromBackend] Loading last active layout: ${t}`)):b.warn(`[loadLayoutFromBackend] Last active layout '${i.last_active_layout_id}' no longer exists`)),!t&&i.layouts&&i.layouts.length>0&&(t=i.layouts[0].id,b.log(`[loadLayoutFromBackend] No valid last active, using first layout: ${t}`))}}catch(o){b.warn("[loadLayoutFromBackend] Could not fetch layouts list:",o)}let e;if(t?e=await B(`${W}/layouts/${t}`,{headers:N()}):e=await B(`${W}/layout`,{headers:N()}),!e.ok)throw new Error(`Failed to load layout: ${e.status}`);const n=await e.json();!n.device_id&&t&&(n.device_id=t),b.log(`[loadLayoutFromBackend] Loaded layout '${n.device_id||t||"default"}':`,{name:n.name,device_model:n.device_model,pages:n.pages?.length,widgets:n.pages?.reduce((o,i)=>o+(i.widgets?.length||0),0),renderingMode:n.renderingMode||n.rendering_mode}),p&&(n.device_id||t)&&p.setCurrentLayoutId(n.device_id||t),typeof de=="function"?de(n):b.error("[loadLayoutFromBackend] loadLayoutIntoState function missing!"),L(E.LAYOUT_IMPORTED,n)}catch(t){b.error("Error loading layout from backend:",t),T("Error loading layout from backend","error",5e3)}}let $e=!1,Ye=!1;async function un(){if(!R())return!1;if($e)return Ye=!0,b.log("[saveLayoutToBackend] Save already in progress, queuing..."),!1;if(!p)throw new Error("AppState not available");const t=p.currentLayoutId||"reterminal_e1001",e=p.settings.device_model||p.deviceModel||"reterminal_e1001",o={...p.getPagesPayload(),device_id:t,name:p.deviceName||"Layout 1",device_model:e,deviceName:p.deviceName||"Layout 1"};$e=!0,Ye=!1;try{b.log(`[saveLayoutToBackend] Saving to layout '${t}':`,{device_model:e,pages:o.pages?.length,widgets:o.pages?.reduce((a,l)=>a+(l.widgets?.length||0),0),renderingMode:o.renderingMode});const i=new AbortController,r=setTimeout(()=>i.abort(),1e4),s=await B(`${W}/layouts/${t}`,{method:"POST",headers:N(),body:JSON.stringify(o),signal:i.signal});if(clearTimeout(r),!s.ok){const a=await s.json().catch(()=>({}));throw new Error(a.message||a.error||`Save failed: ${s.status}`)}return b.log(`[saveLayoutToBackend] Layout '${t}' saved successfully`),!0}catch(i){const r=i instanceof Error?i:new Error(String(i));if(r.name==="AbortError")return!0;if(r.message.includes("Failed to fetch")||r.message.includes("NetworkError")||r.message.includes("net::ERR_")||r.message.includes("ERR_EMPTY_RESPONSE")||r.message.includes("Load failed"))return!1;throw b.error("Failed to save layout to backend:",r),r}finally{$e=!1,Ye&&setTimeout(()=>{un().catch(()=>{})},500)}}async function Hi(t){if(!R())throw new Error("No backend");const e=await B(`${W}/import_snippet`,{method:"POST",headers:N(),body:JSON.stringify({yaml:t})});if(!e.ok){const n=await e.json().catch(()=>({}));throw new Error(n.message||n.error||`Import failed with status ${e.status}`)}return await e.json()}let K=[],Ue=!1;function N(){const t={"Content-Type":"application/json"},e=pn();return e&&e.trim()!==""&&e!=="null"&&(t.Authorization=`Bearer ${e}`),t}async function B(t,e={}){const n=await Di(t,e);return n||fetch(t,e)}const et="entity-datalist-global";let ie=null;function hn(){return ie||(ie=document.getElementById(et),ie||(ie=document.createElement("datalist"),ie.id=et,U(ie))),ie}function Gi(t){const e=hn();e.innerHTML="",!(!t||t.length===0)&&(t.forEach(n=>{const o=document.createElement("option");o.value=n.entity_id,o.label=n.name||n.entity_id,e.appendChild(o)}),b.log(`[EntityDatalist] Updated with ${t.length} entities`))}async function le(){if(!R()||!W)return[];if(Ue)return K;Ue=!0;try{const t=new AbortController,e=setTimeout(()=>t.abort(),1e4);let n,o=!1;const i=pn();n=`${W}/entities?domains=sensor,binary_sensor,weather,light,switch,fan,cover,climate,media_player,input_number,number,input_boolean,input_text,input_select,button,input_button,calendar,person,device_tracker,sun,update,scene`,b.log("[EntityStates] Fetching from:",n);let r;try{r=await B(n,{headers:N(),signal:t.signal})}catch(a){if(i&&W)n=`${W.replace("/api/esphome_designer","")}/api/states`,b.log("[EntityStates] Custom endpoint failed, trying native HA API:",n),o=!0,r=await B(n,{headers:N(),signal:t.signal});else throw a}if(clearTimeout(e),!r.ok)return b.warn("[EntityStates] Failed to fetch:",r.status),[];let s=await r.json();if(o&&Array.isArray(s)){const a=["sensor","binary_sensor","weather","light","switch","fan","cover","climate","media_player","input_number","number","input_boolean","input_text","input_select","button","input_button","calendar","person","device_tracker","sun","update","scene"];s=s.filter(l=>{const c=l.entity_id?.split(".")[0];return a.includes(c)}).map(l=>({entity_id:l.entity_id,name:l.attributes?.friendly_name||l.entity_id,state:l.state,unit:l.attributes?.unit_of_measurement,attributes:l.attributes||{}}))}return Array.isArray(s)?(b.log(`[EntityStates] Received ${s.length} entities`),K=s.map(a=>{const l=a.unit?`${a.state} ${a.unit}`:a.state;return{entity_id:a.entity_id,domain:a.entity_id?.split(".")?.[0]||"",name:a.name||a.entity_id,state:a.state,unit:a.unit,attributes:a.attributes||{},formatted:l}}),b.log(`[EntityStates] Cached ${K.length} entity states`),p&&(p.entityStates={},K.forEach(a=>{p.entityStates[a.entity_id]=a}),b.log(`[EntityStates] Populated AppState.entityStates with ${Object.keys(p.entityStates).length} entries`)),Gi(K),L(E.ENTITIES_LOADED,K),K):(b.warn("[EntityStates] Invalid response format"),[])}catch(t){return t instanceof Error&&t.name==="AbortError"?b.warn("[EntityStates] Request timed out after 10 seconds"):b.warn("[EntityStates] Error fetching:",t),[]}finally{Ue=!1}}function zs(t){const e=K.find(n=>n.entity_id===t);return e?e.attributes??null:null}function Ri(t){if(t==null||t==="")return 24*60*60*1e3;if(typeof t=="number")return Math.max(t,0)*1e3;const e=String(t).trim();if(!e)return 24*60*60*1e3;if(/^\d+$/.test(e))return parseInt(e,10)*1e3;const n=e.match(/^(\d+)([a-z]+)$/i);if(!n)return 24*60*60*1e3;const o=parseInt(n[1],10),i=n[2].toLowerCase();return i.startsWith("s")?o*1e3:i.startsWith("m")?o*60*1e3:i.startsWith("h")?o*60*60*1e3:i.startsWith("d")?o*24*60*60*1e3:o*1e3}function Wi(){return(W||"").replace(/\/api\/esphome_designer$/,"")}function Ni(t){return!Array.isArray(t)||t.length===0?[]:(Array.isArray(t[0])?t[0]:t).filter(n=>n&&typeof n=="object").map(n=>({state:n.state,last_changed:n.last_changed??n.last_updated??null,last_updated:n.last_updated??n.last_changed??null})).filter(n=>n.state!==void 0&&n.state!==null)}let Mt=!1;async function $s(t,e="24h"){if(!R()||!W||!t)return[];const n=Wi(),o=new Date,i=new Date(o.getTime()-Ri(e)),r=n?`${n}/api/history/period/${encodeURIComponent(i.toISOString())}?filter_entity_id=${encodeURIComponent(t)}&end_time=${encodeURIComponent(o.toISOString())}&minimal_response&no_attributes&significant_changes_only=0`:null;try{if(!r)return[];const s=await B(r,{headers:N()});if(!s.ok){const a=await s.text().catch(()=>"Unknown error");return Mt||(b.log(`[EntityHistory] History fetch failed for ${t}: ${a}`),Mt=!0),[]}return Ni(await s.json())}catch{return[]}}let gn;try{gn=Object.assign({"../../hardware/elecrow-esp32-7inch.yaml":ii,"../../hardware/guition-esp32-jc4827w543.yaml":oi,"../../hardware/guition-esp32-jc8048w535.yaml":ri,"../../hardware/guition-esp32-jc8048w550.yaml":si,"../../hardware/guition-esp32-s3-4848s040.yaml":ai,"../../hardware/lilygo-tdisplays3.yaml":li,"../../hardware/seeedstudio-sensecap-indicator.yaml":di,"../../hardware/sunton-esp32-2432s028.yaml":ci,"../../hardware/sunton-esp32-2432s028R.yaml":pi,"../../hardware/sunton-esp32-4827s032R.yaml":ui,"../../hardware/sunton-esp32-8048s050.yaml":hi,"../../hardware/sunton-esp32-8048s070.yaml":gi,"../../hardware/viewdisplay-esp32-s3-uedx48480021.yaml":mi,"../../hardware/waveshare-esp32-s3-touch-lcd-4.3.yaml":fi,"../../hardware/waveshare-esp32-s3-touch-lcd-7.yaml":yi,"../../hardware/waveshare-esp32-universal-epaper-7.5v2.yaml":vi})}catch{}const ht={getGlob(){const t=gn;return t?()=>t:void 0},getStorage(){try{return globalThis.localStorage??null}catch{return null}}};async function Bi(){if(R())try{const o=`${W}/hardware/templates`;b.log("[HardwareDiscovery] Fetching from:",o);const i=await B(o,{headers:N(),cache:"no-store"});if(!i.ok)throw new Error(`HTTP ${i.status}`);return(await i.json()).templates||[]}catch(o){b.error("Failed to fetch dynamic hardware templates from HA:",o)}b.log("[HardwareDiscovery] Attempting to load bundled profiles via glob...");const t=[],e=ht.getGlob();if(typeof e!="function")return b.log("[HardwareDiscovery] Bundled profile glob is unavailable in this runtime; relying on backend/localStorage profiles only."),[];const n=e("../../hardware/*.yaml",{query:"?raw",import:"default",eager:!0});for(const o in n)try{const i=n[o],r=o.split("/").pop()||"hardware.yaml",s=mn(i,r);s.id=r.replace(/\.yaml$/i,"").replace(/[^a-z0-9]/gi,"_").toLowerCase(),s.isPackageBased=!0,s.hardwarePackage=`hardware/${r}`,t.push(s)}catch(i){b.warn(`[HardwareDiscovery] Failed to parse bundled file ${o}:`,i)}return b.log(`[HardwareDiscovery] Loaded ${t.length} bundled fallback profiles.`),t}function mn(t,e){const n="dynamic_offline_"+e.replace(/[^a-z0-9]/gi,"_").toLowerCase();let o=e.replace(/\.yaml$/i,""),i=800,r=480,s="rect";const a=t.match(/#\s*Name:\s*(.*)/i);a&&(o=a[1].trim());const l=t.match(/#\s*Resolution:\s*(\d+)x(\d+)/i);l&&(i=parseInt(l[1]),r=parseInt(l[2]));const c=t.match(/#\s*Shape:\s*(rect|round)/i);c&&(s=c[1].toLowerCase());const u=!!t.match(/#\s*Inverted:\s*(true|yes|1)/i),f=t.match(/^\s*-\s*platform:\s*([a-z0-9_]+)/m)||t.match(/^\s*platform:\s*([a-z0-9_]+)/m),h=f?f[1].trim():void 0,g=t.match(/^\s*model:\s*"?([^"\n]+)"?/m),y=g?g[1].trim():void 0;let v="esp32-s3",m;const _=t.match(/^\s*esp8266:/m);_?v="esp8266":t.match(/^\s*esp32:/m)&&(t.toLowerCase().includes("esp32-s3")?v="esp32-s3":t.toLowerCase().includes("esp32-c3")?v="esp32-c3":t.toLowerCase().includes("esp32-c6")?v="esp32-c6":v="esp32");const x=t.match(/^\s*board:\s*([^\n]+)/m);x&&(m=x[1].trim(),_||(m.toLowerCase().includes("s3")?v="esp32-s3":m.toLowerCase().includes("c3")?v="esp32-c3":m.toLowerCase().includes("c6")&&(v="esp32-c6")));const I=t.match(/#\s*Chip:\s*(.*)/i);I&&(v=I[1].trim());const C=t.match(/#\s*Board:\s*(.*)/i);C&&(m=C[1].trim());const S=t.match(/^\s*color_palette:\s*(\S+)/m),w=S?S[1].trim():void 0,k=t.match(/^\s*color_order:\s*(\S+)/m),M=k?k[1].trim():void 0,F=t.match(/^\s*update_interval:\s*(\S+)/m),O=F?F[1].trim():void 0,q=t.match(/^\s*invert_colors:\s*(true|false)/mi),ke=q?q[1].toLowerCase()==="true":void 0;return{id:n,name:o,resolution:{width:i,height:r},shape:s,chip:v,board:m,displayPlatform:h,displayModel:y,colorPalette:w,colorOrder:M,updateInterval:O,invertColors:ke,isPackageBased:!0,isOfflineImport:!0,content:t,features:{psram:t.includes("psram:"),lcd:!t.includes("waveshare_epaper")&&!t.includes("epaper_spi"),lvgl:t.includes("lvgl:")||!t.includes("waveshare_epaper")&&!t.includes("epaper_spi"),epaper:t.includes("waveshare_epaper")||t.includes("epaper_spi"),touch:t.includes("touchscreen:"),inverted_colors:u}}}function Fi(t){const e=ht.getStorage();if(!e){b.warn("No localStorage available for offline profiles.");return}try{const n=JSON.parse(e.getItem("esphome-offline-profiles")||"{}");n[t.id]=t,e.setItem("esphome-offline-profiles",JSON.stringify(n)),b.log("[HardwarePersistence] Saved offline profile to localStorage:",t.id)}catch(n){b.error("Failed to save profile to localStorage:",n)}}function zi(){const t=ht.getStorage();if(!t)return{};try{return JSON.parse(t.getItem("esphome-offline-profiles")||"{}")}catch(e){return b.warn("Could not load offline profiles from storage:",e),{}}}const A={reterminal_e1001:{name:"Seeedstudio reTerminal E1001 (Monochrome)",displayType:"binary",chip:"esp32-s3",board:"esp32-s3-devkitc-1",displayModel:"7.50inv2p",displayPlatform:"waveshare_epaper",resolution:{width:800,height:480},shape:"rect",psram_mode:"octal",pins:{display:{cs:"GPIO10",dc:"GPIO11",reset:{number:"GPIO12",inverted:!1},busy:{number:"GPIO13",inverted:!0}},i2c:{sda:"GPIO19",scl:"GPIO20"},spi:{clk:"GPIO7",mosi:"GPIO9"},batteryEnable:"GPIO21",batteryAdc:"GPIO1",buzzer:"GPIO45",buttons:{left:"GPIO5",right:"GPIO4",refresh:"GPIO3",home:"GPIO2"}},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.27,max:4.15}},features:{psram:!0,buzzer:!0,buttons:!0,sht4x:!0,epaper:!0,inverted_colors:!0}},reterminal_e1002:{name:"Seeedstudio reTerminal E1002 (6-Color)",displayType:"color",displayModel:"Seeed-reTerminal-E1002",displayPlatform:"epaper_spi",resolution:{width:800,height:480},shape:"rect",psram_mode:"octal",pins:{display:{cs:null,dc:null,reset:null,busy:null},i2c:{sda:"GPIO19",scl:"GPIO20"},spi:{clk:"GPIO7",mosi:"GPIO9"},batteryEnable:"GPIO21",batteryAdc:"GPIO1",buzzer:"GPIO45",buttons:{left:"GPIO5",right:"GPIO4",refresh:"GPIO3",home:"GPIO2"}},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.27,max:4.15}},features:{psram:!0,buzzer:!0,buttons:!0,sht4x:!0,epaper:!0}},trmnl_diy_esp32s3:{name:"Seeed Studio Trmnl DIY Kit (ESP32-S3)",displayType:"binary",displayModel:"7.50inv2p",displayPlatform:"waveshare_epaper",resolution:{width:800,height:480},shape:"rect",psram_mode:"octal",pins:{display:{cs:"GPIO44",dc:"GPIO10",reset:"GPIO38",busy:{number:"GPIO4",inverted:!0}},i2c:{sda:"GPIO17",scl:"GPIO18"},spi:{clk:"GPIO7",mosi:"GPIO9"},batteryEnable:"GPIO6",batteryAdc:"GPIO1",buzzer:null,buttons:{left:"GPIO2",refresh:"GPIO5"}},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.27,max:4.15},curve:[{from:4.15,to:100},{from:3.96,to:90},{from:3.91,to:80},{from:3.85,to:70},{from:3.8,to:60},{from:3.75,to:50},{from:3.68,to:40},{from:3.58,to:30},{from:3.49,to:20},{from:3.41,to:10},{from:3.3,to:5},{from:3.27,to:0}]},features:{psram:!0,buzzer:!1,buttons:!0,sht4x:!1,epaper:!0,inverted_colors:!0}},trmnl:{name:"TRMNL (ESP32-C3)",displayType:"binary",displayModel:"7.50inv2",displayPlatform:"waveshare_epaper",resolution:{width:800,height:480},shape:"rect",pins:{display:{cs:"GPIO6",dc:"GPIO5",reset:{number:"GPIO10",inverted:!1},busy:{number:"GPIO4",inverted:!0}},i2c:{sda:"GPIO1",scl:"GPIO2"},spi:{clk:"GPIO7",mosi:"GPIO8"},batteryEnable:null,batteryAdc:"GPIO3",buzzer:null,buttons:null},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.3,max:4.15}},features:{psram:!1,buzzer:!1,buttons:!1,sht4x:!1,epaper:!0,inverted_colors:!0},chip:"esp32-c3",board:"esp32-c3-devkitm-1"},seeed_xiao_epaper_75:{name:'Seeed Xiao ESP32C3 - 7.5" E-Paper',displayType:"binary",chip:"esp32-c3",board:"seeed_xiao_esp32c3",displayModel:"7.50inv2p",displayPlatform:"waveshare_epaper",resolution:{width:800,height:480},shape:"rect",pins:{display:{cs:"GPIO3",dc:"GPIO5",reset:"GPIO2",busy:{number:"GPIO4",inverted:!0}},spi:{clk:"GPIO8",mosi:"GPIO10"}},features:{psram:!1,buzzer:!1,buttons:!1,epaper:!0,inverted_colors:!0}},esp32_s3_photopainter:{id:"esp32_s3_photopainter",name:"Waveshare PhotoPainter (6-Color)",displayType:"color",displayModel:"7.30in-f",displayPlatform:"waveshare_epaper",resolution:{width:800,height:480},shape:"rect",psram_mode:"octal",pins:{display:{cs:"GPIO9",dc:"GPIO8",reset:"GPIO12",busy:{number:"GPIO13",inverted:!0}},i2c:{sda:"GPIO47",scl:"GPIO48"},spi:{clk:"GPIO10",mosi:"GPIO11"},batteryEnable:null,batteryAdc:null,buzzer:null,buttons:{left:"GPIO0",right:"GPIO4",refresh:null}},battery:{attenuation:"0db",multiplier:1,calibration:{min:3.3,max:4.2}},features:{psram:!0,buzzer:!1,buttons:!0,sht4x:!1,axp2101:!0,manual_pmic:!0,shtc3:!0,epaper:!0},i2c_config:{scan:!1,frequency:"10kHz"}},waveshare_esp32_s3_touch_lcd_7:{name:'Waveshare Touch LCD 7 7.0" 800x480',displayType:"color",isPackageBased:!0,hardwarePackage:"hardware/waveshare-esp32-s3-touch-lcd-7.yaml",resolution:{width:800,height:480},features:{psram:!0,buzzer:!1,buttons:!1,lcd:!0,lvgl:!0,touch:!0},touch:{platform:"gt911",transformed:!0,transform:{swap_xy:!0}}},waveshare_esp32_s3_touch_lcd_4_3:{name:'Waveshare Touch LCD 4.3 4.3" 800x480',displayType:"color",isPackageBased:!0,hardwarePackage:"hardware/waveshare-esp32-s3-touch-lcd-4.3.yaml",resolution:{width:800,height:480},features:{psram:!0,buzzer:!1,buttons:!1,lcd:!0,touch:!0},touch:{platform:"gt911",transformed:!0,transform:{swap_xy:!0}}},m5stack_coreink:{name:"M5Stack M5Core Ink (200x200)",displayType:"binary",displayModel:"1.54inv2",displayPlatform:"waveshare_epaper",resolution:{width:200,height:200},shape:"rect",features:{psram:!1,buzzer:!0,buttons:!0,lcd:!1,epaper:!0,inverted_colors:!0},chip:"esp32",board:"m5stack-coreink",pins:{display:{cs:"GPIO9",dc:"GPIO15",reset:"GPIO0",busy:null},i2c:{sda:"GPIO21",scl:"GPIO22"},spi:{clk:"GPIO18",mosi:"GPIO23"},batteryEnable:{number:"GPIO12",ignore_strapping_warning:!0},batteryAdc:"GPIO35",buzzer:"GPIO2",buttons:{left:{number:"GPIO39",mode:"INPUT"},right:{number:"GPIO37",mode:"INPUT"},refresh:{number:"GPIO38",mode:"INPUT"}}},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.27,max:4.15}},i2c_config:{scan:!0}},m5stack_paper:{name:"M5Paper (540x960)",displayType:"grayscale",displayModel:"M5Paper",displayPlatform:"it8951e",resolution:{width:960,height:540},shape:"rect",chip:"esp32",board:"m5stack-paper",features:{psram:!0,buzzer:!1,buttons:!0,lcd:!1,epaper:!0,touch:!0,inverted_colors:!0,sht3xd:!0},pins:{display:{cs:"GPIO15",dc:null,reset:"GPIO23",busy:"GPIO27"},i2c:{sda:"GPIO21",scl:"GPIO22"},spi:{clk:"GPIO14",mosi:"GPIO12",miso:"GPIO13"},batteryEnable:null,batteryAdc:"GPIO35",buzzer:null,buttons:{left:{number:"GPIO39",mode:"INPUT"},right:{number:"GPIO37",mode:"INPUT"},refresh:{number:"GPIO38",mode:"INPUT"}}},m5paper:{battery_power_pin:"GPIO5",main_power_pin:"GPIO2"},battery:{attenuation:"12db",multiplier:2,calibration:{min:3.27,max:4.15}},rotation_offset:180,touch:{platform:"gt911",i2c_id:"bus_a",address:93,interrupt_pin:"GPIO36",update_interval:"never",transform:{mirror_x:!1,mirror_y:!1,swap_xy:!0},calibration:{x_min:0,x_max:960,y_min:0,y_max:540}},external_components:["  - source: github://Passific/m5paper_esphome"]},lilygo_t5_47:{id:"lilygo_t5_47",name:'Lilygo T5 4.7" E-Paper',isUntestedProfile:!0,displayType:"binary",chip:"esp32",board:"esp-wrover-kit",displayPlatform:"t547",resolution:{width:960,height:540},shape:"rect",psram_speed:"80MHz",pins:{batteryEnable:null,batteryAdc:"GPIO36",buttons:{left:{number:"GPIO39",inverted:!0,mode:"INPUT"},right:{number:"GPIO34",inverted:!0,mode:"INPUT"},refresh:{number:"GPIO35",inverted:!0,mode:"INPUT"}}},battery:{attenuation:"12db",multiplier:2},features:{psram:!0,buzzer:!1,buttons:!0,epaper:!0,inverted_colors:!0},frameworkHint:"Arduino 3.x (required by the t547 component)",system_section_overrides:{esphome:["  platformio_options:","    lib_deps:","      - https://github.com/Xinyuan-LilyGO/LilyGo-EPD47.git"],esp32:["  framework:","    type: arduino","    version: 3.3.2","  flash_size: 16MB"]},external_components:["  - source:","      type: git","      url: https://github.com/cjb0001/esphome-components","      ref: idf5-arduino3",'    components: ["t547"]']}};function fn(t=A){return Object.entries(t).filter(([,e])=>!e.isUntestedProfile).map(([e])=>e)}function $i(t,e){return t?{...t,...e,features:{...t.features||{},...e.features||{}}}:e}function Yi(t,e){e.forEach(n=>{t[n.id]=$i(t[n.id],n)})}function Ui(t,e){Object.entries(e).forEach(([n,o])=>{t[n]=o})}let gt=fn(A);async function Le(){try{const t=await Bi();b.log(`[Devices] Loaded ${t.length} hardware profiles from backend/bundle.`),Yi(A,t);const e=zi(),n=Object.keys(e);n.length>0&&(b.log(`[Devices] Restoring ${n.length} offline profiles from localStorage.`),Ui(A,e)),gt=fn(A),L(E.DEVICE_PROFILES_UPDATED)}catch(t){b.error("Failed to load external hardware profiles:",t)}}function me(){return"w_"+Date.now().toString(36)+Math.random().toString(36).substring(2,7)}const ce=globalThis;typeof ce.crypto<"u"&&!ce.crypto.randomUUID?Object.defineProperty(ce.crypto,"randomUUID",{value:function(){return"10000000-1000-4000-8000-100000000000".replace(/[018]/g,e=>{const n=Number(e),o=ce.crypto?.getRandomValues(new Uint8Array(1))[0]??0;return(n^(o&15)>>n/4).toString(16)})}}):typeof ce.crypto>"u"&&(ce.crypto={randomUUID:()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,t=>{const e=Math.random()*16|0;return(t==="x"?e:e&3|8).toString(16)}),getRandomValues:t=>{for(let e=0;e<t.length;e+=1)t[e]=Math.floor(Math.random()*256);return t}});function ji(t,e){let n;return function(...i){const r=()=>{clearTimeout(n),t(...i)};clearTimeout(n),n=setTimeout(r,e)}}function tt(t){if(t!==void 0)return JSON.parse(JSON.stringify(t))}const Ys=(t,e)=>{if(!t||!e)return;const n=e.replace(/\[(\w+)\]/g,".$1").replace(/^\./,"").split(".");let o=t;for(const i of n){if(o==null)return;o=o[i]}return o};function nt(){return{id:"page_0",name:"Overview",layout:null,widgets:[]}}function qi(t){return Array.isArray(t)&&t.length>0?t:[nt()]}function At(t,e){return e<=0?0:Math.max(0,Math.min(t,e-1))}function Vi(t){const e=t.length;let n=0;return t.forEach(o=>{const i=o.name.match(/^Page (\d+)$/);if(i){const r=parseInt(i[1],10);r>n&&(n=r)}}),{id:`page_${Date.now()}_${e}`,name:`Page ${n+1}`,widgets:[]}}function Xi(t,e){const n=tt(t);n.id=`page_${Date.now()}_${e}`,n.name=`${t.name} (Copy)`;const o=new Map;return n.widgets.forEach(i=>{const r=i.id,s=me();i.id=s,o.set(r,s)}),n.widgets.forEach(i=>{i.parentId&&o.has(i.parentId)&&(i.parentId=o.get(i.parentId)||null)}),n}function Ki(t,e,n,o=null,i=null,r){if(n<0||n>=t.pages.length)return!1;const s=t.pages[n],a=new Set,l=[];let c=e;const d=t.widgetsById.get(e);if(d&&d.parentId){let h=d;for(;h.parentId;){const g=t.widgetsById.get(h.parentId);if(!g)break;h=g}c=h.id}const u=h=>{if(a.has(h))return;let g=null,y=null;for(const m of t.pages)if(g=m.widgets.find(_=>_.id===h)||null,g){y=m;break}if(!g||!y||y===s)return;a.add(h),l.push({widget:g,sourcePage:y}),y.widgets.filter(m=>m.parentId===h).forEach(m=>u(m.id))};if(u(c),l.length===0)return!1;l.forEach((h,g)=>{const{widget:y,sourcePage:v}=h,m=v.widgets.indexOf(y);if(m!==-1&&v.widgets.splice(m,1),g===0&&y.parentId&&!a.has(y.parentId)&&(y.parentId=null),g===0){let _=0,x=0;if(o!==null&&i!==null&&(_=o-y.x,x=i-y.y,y.x=o,y.y=i),_!==0||x!==0)for(let I=1;I<l.length;I++){const C=l[I].widget;C.x+=_,C.y+=x}}s.widgets.push(y)});const f=r(t.protocolHardware?.orientation);for(const h of a){const g=t.widgetsById.get(h);if(!g||g.parentId&&a.has(g.parentId))continue;const y=g.x,v=g.y;g.x=Math.max(0,Math.min(f.width-(g.width||50),g.x)),g.y=Math.max(0,Math.min(f.height-(g.height||50),g.y));const m=g.x-y,_=g.y-v;if(m!==0||_!==0)for(const x of a){const I=t.widgetsById.get(x);I&&I.parentId===g.id&&(I.x+=m,I.y+=_)}}return!0}class Ji{constructor(){this.state={pages:[],currentPageIndex:0,deviceName:"Layout 1",deviceModel:"reterminal_e1001",currentLayoutId:"reterminal_e1001",customHardware:{},protocolHardware:{width:400,height:300,colorMode:"bw"},widgetsById:new Map},this.reset()}reset(){this.state.pages=[nt()],this.state.currentPageIndex=0,this.rebuildWidgetsIndex()}get pages(){return this.state.pages}get currentPageIndex(){return this.state.currentPageIndex}get deviceName(){return this.state.deviceName}get deviceModel(){return this.state.deviceModel}get currentLayoutId(){return this.state.currentLayoutId}get protocolHardware(){return this.state.protocolHardware}get customHardware(){return this.state.customHardware}getCurrentPage(){return this.state.pages.length===0&&(this.state.pages=[nt()],this.state.currentPageIndex=0),this.state.pages[this.state.currentPageIndex]||this.state.pages[0]}getWidgetById(e){return this.state.widgetsById.get(e)}rebuildWidgetsIndex(){this.state.widgetsById.clear();for(const e of this.state.pages)for(const n of e.widgets)this.state.widgetsById.set(n.id,n)}setPages(e){this.state.pages=qi(e),this.state.currentPageIndex=At(this.state.currentPageIndex,this.state.pages.length),this.rebuildWidgetsIndex(),L(E.STATE_CHANGED)}setCurrentPageIndex(e,n={}){e>=0&&e<this.state.pages.length&&(this.state.currentPageIndex=e,L(E.PAGE_CHANGED,{index:e,...n}))}reorderPage(e,n){if(e<0||e>=this.state.pages.length||n<0||n>=this.state.pages.length)return;const[o]=this.state.pages.splice(e,1);this.state.pages.splice(n,0,o),this.state.currentPageIndex===e?this.state.currentPageIndex=n:e<this.state.currentPageIndex&&n>=this.state.currentPageIndex?this.state.currentPageIndex--:e>this.state.currentPageIndex&&n<=this.state.currentPageIndex&&this.state.currentPageIndex++,L(E.STATE_CHANGED),L(E.PAGE_CHANGED,{index:this.state.currentPageIndex,forceFocus:!0})}addPage(e=null){const n=Vi(this.state.pages),o=e!==null?e:this.state.pages.length;return this.state.pages.splice(o,0,n),e!==null&&e<=this.state.currentPageIndex?this.state.currentPageIndex++:e===null&&(this.state.currentPageIndex=this.state.pages.length-1),this.rebuildWidgetsIndex(),L(E.STATE_CHANGED),L(E.PAGE_CHANGED,{index:this.state.currentPageIndex,forceFocus:!0}),n}deletePage(e){e<0||e>=this.state.pages.length||this.state.pages.length!==1&&(this.state.pages.splice(e,1),this.state.currentPageIndex=At(this.state.currentPageIndex,this.state.pages.length),this.rebuildWidgetsIndex(),L(E.STATE_CHANGED),L(E.PAGE_CHANGED,{index:this.state.currentPageIndex,forceFocus:!0}))}duplicatePage(e){if(e<0||e>=this.state.pages.length)return null;const n=this.state.pages[e],o=Xi(n,this.state.pages.length),i=e+1;return this.state.pages.splice(i,0,o),this.state.currentPageIndex=i,this.rebuildWidgetsIndex(),L(E.STATE_CHANGED),L(E.PAGE_CHANGED,{index:this.state.currentPageIndex,forceFocus:!0}),o}renamePage(e,n){e<0||e>=this.state.pages.length||!n||n.trim()===""||(this.state.pages[e].name=n.trim(),L(E.STATE_CHANGED))}addWidget(e,n=null){const o=n!==null?n:this.state.currentPageIndex;(this.state.pages[o]||this.getCurrentPage()).widgets.push(e),this.state.widgetsById.set(e.id,e),L(E.STATE_CHANGED)}updateWidget(e,n){const o=this.getWidgetById(e);o&&(Object.assign(o,n),L(E.STATE_CHANGED))}deleteWidgets(e){const n=this.getCurrentPage();let o=!1;for(const i of e){const r=n.widgets.findIndex(s=>s.id===i);r!==-1&&(n.widgets.splice(r,1),this.state.widgetsById.delete(i),o=!0)}o&&L(E.STATE_CHANGED)}moveWidgetToPage(e,n,o=null,i=null){const r=a=>this.getCanvasDimensions(a);return Ki(this.state,e,n,o,i,r)?(this.rebuildWidgetsIndex(),L(E.STATE_CHANGED),!0):!1}reorderWidget(e,n,o){const i=this.state.pages[e];if(!i)return;const r=i.widgets;if(n<0||n>=r.length||o<0||o>=r.length)return;const[s]=r.splice(n,1);r.splice(o,0,s),L(E.STATE_CHANGED)}clearCurrentPage(e=!1){const n=this.getCurrentPage();if(!n)return{deleted:0,preserved:0};const o=[],i=[];return n.widgets.forEach(r=>{e&&r.locked?i.push(r):o.push(r)}),n.widgets=i,o.forEach(r=>this.state.widgetsById.delete(r.id)),o.length>0&&L(E.STATE_CHANGED),{deleted:o.length,preserved:i.length}}setDeviceSettings(e,n){e&&(this.state.deviceName=e),n&&(this.state.deviceModel=n),L(E.SETTINGS_CHANGED)}getCanvasDimensions(e=Ze.LANDSCAPE){const n=this.state.deviceModel||"reterminal_e1001",o=A,i=o&&o[n]?o[n]:null;let r=en,s=tn;if(i)i.resolution&&(r=i.resolution.width,s=i.resolution.height);else if(n==="custom"&&this.state.customHardware){const a=this.state.customHardware;a.resWidth&&a.resHeight&&(r=a.resWidth,s=a.resHeight)}return e===Ze.PORTRAIT?{width:Math.min(r,s),height:Math.max(r,s)}:{width:Math.max(r,s),height:Math.min(r,s)}}getPagesPayload(){return{name:this.state.deviceName,pages:this.state.pages,deviceName:this.state.deviceName,deviceModel:this.state.deviceModel,currentLayoutId:this.state.currentLayoutId,customHardware:this.state.customHardware}}getCanvasShape(){const n=A[this.state.deviceModel];return n&&n.shape?n.shape:this.state.customHardware&&this.state.customHardware.shape?this.state.customHardware.shape:"rect"}}class Zi{state;historyStack;historyIndex;constructor(){this.state={selectedWidgetIds:[],clipboardWidgets:[],zoomLevel:1,panX:0,panY:0},this.historyStack=[],this.historyIndex=-1}get selectedWidgetIds(){return this.state.selectedWidgetIds}get clipboardWidgets(){return this.state.clipboardWidgets}get zoomLevel(){return this.state.zoomLevel}setZoomLevel(e){this.state.zoomLevel=Math.max(.05,Math.min(5,e)),L(E.ZOOM_CHANGED,{zoomLevel:this.state.zoomLevel})}setSelectedWidgetIds(e){this.state.selectedWidgetIds=e||[],L(E.SELECTION_CHANGED,{widgetIds:this.state.selectedWidgetIds})}selectWidget(e,n=!1){if(n){const o=e?this.state.selectedWidgetIds.indexOf(e):-1;o===-1?e&&this.state.selectedWidgetIds.push(e):this.state.selectedWidgetIds.splice(o,1)}else this.state.selectedWidgetIds=e?[e]:[];L(E.SELECTION_CHANGED,{widgetIds:this.state.selectedWidgetIds})}copyWidgets(e){this.state.clipboardWidgets=e.map(n=>tt(n)),b.log("[EditorStore] Widgets copied to clipboard:",this.state.clipboardWidgets.length)}recordHistory(e){const n=tt(e);if(this.historyIndex>=0){const o=this.historyStack[this.historyIndex];if(JSON.stringify(o)===JSON.stringify(n))return}this.historyIndex<this.historyStack.length-1&&(this.historyStack=this.historyStack.slice(0,this.historyIndex+1)),this.historyStack.push(n),this.historyIndex++,this.historyStack.length>Zt&&(this.historyStack.shift(),this.historyIndex--),L(E.HISTORY_CHANGED,{canUndo:this.canUndo(),canRedo:this.canRedo()})}undo(){return this.canUndo()?(this.historyIndex--,this.historyStack[this.historyIndex]):null}redo(){return this.canRedo()?(this.historyIndex++,this.historyStack[this.historyIndex]):null}canUndo(){return this.historyIndex>0}canRedo(){return this.historyIndex<this.historyStack.length-1}}class Qi{constructor(){this.state={...Jt}}get snapEnabled(){return this.state.snapEnabled}get showGrid(){return this.state.showGrid}get showDebugGrid(){return!!this.state.showDebugGrid}get showRulers(){return!!this.state.showRulers}get gridOpacity(){return this.state.gridOpacity}get editor_light_mode(){return this.state.editor_light_mode}update(e){this.state={...this.state,...e},L(E.SETTINGS_CHANGED,this.state),b.log("[PreferencesStore] Settings updated")}setSnapEnabled(e){this.state.snapEnabled=e,L(E.SETTINGS_CHANGED,{snapEnabled:e})}setShowGrid(e){this.state.showGrid=e,L(E.SETTINGS_CHANGED,{showGrid:e})}setShowDebugGrid(e){this.state.showDebugGrid=e,L(E.SETTINGS_CHANGED,{showDebugGrid:e})}setShowRulers(e){this.state.showRulers=e,L(E.SETTINGS_CHANGED,{showRulers:e})}}function Dt(){try{return globalThis.localStorage??null}catch{return null}}class eo{constructor(){this.keys={ai_api_key_gemini:"",ai_api_key_openai:"",ai_api_key_openrouter:""},this.loadFromLocalStorage()}get(e){return this.keys[e]||""}set(e,n){if(e in this.keys){const o=this.keys;o[e]=n,this.saveToLocalStorage()}}saveToLocalStorage(){try{const e=Dt();if(!e)return;const n={};Object.keys(this.keys).forEach(o=>{o.startsWith("ai_api_key_")&&(n[o]=this.keys[o])}),e.setItem("esphome-designer-ai-keys",JSON.stringify(n))}catch(e){b.warn("[SecretsStore] Failed to save AI keys to localStorage:",e)}}loadFromLocalStorage(){try{const e=Dt();if(!e)return;const n=e.getItem("esphome-designer-ai-keys");if(n){const o=JSON.parse(n);o&&typeof o=="object"&&(this.keys={...this.keys,...o},b.log("[SecretsStore] AI keys loaded from local storage"))}}catch(e){b.warn("[SecretsStore] Failed to load AI keys from localStorage:",e)}}}class to{constructor(e){this.app=e}selectWidget(e,n=!1){if(!e){this.app.editor.selectWidget(null,n);return}const o=this.app.getWidgetById(e);if(o)if(o.type==="group"){const a=(this.app.getCurrentPage().widgets||[]).filter(c=>c.parentId===e).map(c=>c.id),l=[e,...a];if(n)if(l.some(d=>this.app.editor.selectedWidgetIds.includes(d))){const d=new Set(l),u=this.app.editor.selectedWidgetIds.filter(f=>!d.has(f));this.app.editor.setSelectedWidgetIds(u)}else this.app.editor.setSelectedWidgetIds([...new Set([...this.app.editor.selectedWidgetIds,...l])]);else this.app.editor.setSelectedWidgetIds(l)}else this.app.editor.selectWidget(e,n)}selectWidgets(e){this.app.editor.setSelectedWidgetIds(e)}selectAllWidgets(){const e=this.app.getCurrentPage();if(!e||!e.widgets)return;const o=e.widgets.map(i=>i.id);this.selectWidgets(o)}deselectAll(){this.app.editor.setSelectedWidgetIds([])}toggleSelection(e){this.selectWidget(e,!0)}isWidgetSelected(e){return this.app.editor.selectedWidgetIds.includes(e)}groupSelection(){const e=this.app.editor.selectedWidgetIds,n=this.app.getSelectedWidgets(),o=n.some(d=>d.type==="group"||d.parentId);if(e.length<2||o)return;let i=1/0,r=1/0,s=-1/0,a=-1/0;n.forEach(d=>{i=Math.min(i,d.x),r=Math.min(r,d.y),s=Math.max(s,d.x+(d.width||0)),a=Math.max(a,d.y+(d.height||0))});const l="group_"+me(),c={id:l,type:"group",title:"Group",x:i,y:r,width:s-i,height:a-r,props:{},expanded:!0};this.app.project.addWidget(c),n.forEach(d=>{this.app.project.updateWidget(d.id,{parentId:l})}),this.selectWidget(l),this.app.syncWidgetOrderWithHierarchy(),this.app.recordHistory(),L(E.STATE_CHANGED)}ungroupSelection(e=null){const n=this.app;let o=[];if(e)o=Array.isArray(e)?e:[e];else{const l=n.getSelectedWidgets(),c=new Set;l.forEach(d=>{d.type==="group"?c.add(d.id):d.parentId&&c.add(d.parentId)}),o=[...c]}const i=new Set;o.forEach(l=>{const c=n.getWidgetById(l);c&&(c.type==="group"?i.add(c.id):c.parentId&&i.add(c.parentId))});const r=[...i];if(r.length===0)return;const s=[];r.forEach(l=>{const c=n.getWidgetById(l);if(!c||c.type!=="group")return;(n.getCurrentPage().widgets||[]).filter(h=>h.parentId===l).forEach(h=>{this.app.project.updateWidget(h.id,{parentId:null}),s.push(h.id)})}),this.app.project.deleteWidgets(r);const a=n.getCurrentPage();if(a&&a.widgets){const l=a.widgets;a.widgets=l.filter(c=>!r.includes(c.id))}s.length>0&&this.selectWidgets(s),n.syncWidgetOrderWithHierarchy(),n.recordHistory(),L(E.STATE_CHANGED)}alignSelectedWidgets(e){const n=this.app.getSelectedWidgets();if(n.length<2)return;let o;switch(e){case"left":o=Math.min(...n.map(i=>i.x)),n.forEach(i=>this.app.project.updateWidget(i.id,{x:o}));break;case"center":{const i=Math.min(...n.map(s=>s.x)),r=Math.max(...n.map(s=>s.x+(s.width||0)));o=i+(r-i)/2,n.forEach(s=>this.app.project.updateWidget(s.id,{x:o-(s.width||0)/2}));break}case"right":o=Math.max(...n.map(i=>i.x+(i.width||0))),n.forEach(i=>this.app.project.updateWidget(i.id,{x:o-(i.width||0)}));break;case"top":o=Math.min(...n.map(i=>i.y)),n.forEach(i=>this.app.project.updateWidget(i.id,{y:o}));break;case"middle":{const i=Math.min(...n.map(s=>s.y)),r=Math.max(...n.map(s=>s.y+(s.height||0)));o=i+(r-i)/2,n.forEach(s=>this.app.project.updateWidget(s.id,{y:o-(s.height||0)/2}));break}case"bottom":o=Math.max(...n.map(i=>i.y+(i.height||0))),n.forEach(i=>this.app.project.updateWidget(i.id,{y:o-(i.height||0)}));break}this.app.recordHistory(),L(E.STATE_CHANGED)}distributeSelectedWidgets(e){const n=this.app.getSelectedWidgets();if(!(n.length<3)){if(e==="horizontal"){const o=[...n].sort((d,u)=>d.x-u.x),i=o[0],s=o[o.length-1].x-(i.x+(i.width||0)),a=o.slice(1,-1).reduce((d,u)=>d+(u.width||0),0),l=(s-a)/(o.length-1);let c=i.x+(i.width||0)+l;for(let d=1;d<o.length-1;d++)this.app.project.updateWidget(o[d].id,{x:c}),c+=(o[d].width||0)+l}else{const o=[...n].sort((d,u)=>d.y-u.y),i=o[0],s=o[o.length-1].y-(i.y+(i.height||0)),a=o.slice(1,-1).reduce((d,u)=>d+(u.height||0),0),l=(s-a)/(o.length-1);let c=i.y+(i.height||0)+l;for(let d=1;d<o.length-1;d++)this.app.project.updateWidget(o[d].id,{y:c}),c+=(o[d].height||0)+l}this.app.recordHistory(),L(E.STATE_CHANGED)}}}class no{constructor(e){this.app=e}recordHistory(){this.app._isRestoringHistory||this.app.editor.recordHistory({pages:this.app.project.pages,deviceName:this.app.project.deviceName})}undo(){const e=this.app.editor.undo();e&&(this.app.setInternalFlag("_isRestoringHistory",!0),this.restoreSnapshot(e),setTimeout(()=>{this.app.setInternalFlag("_isRestoringHistory",!1)},0))}redo(){const e=this.app.editor.redo();e&&(this.app.setInternalFlag("_isRestoringHistory",!0),this.restoreSnapshot(e),setTimeout(()=>{this.app.setInternalFlag("_isRestoringHistory",!1)},0))}restoreSnapshot(e){this.app.project.state.pages=JSON.parse(JSON.stringify(e.pages)),this.app.project.state.deviceName=e.deviceName,this.app.project.rebuildWidgetsIndex(),L(E.STATE_CHANGED)}canUndo(){return this.app.editor.canUndo()}canRedo(){return this.app.editor.canRedo()}}let it={};try{it=Object.assign({"../../features/battery_icon/plugin.js":()=>P(()=>import("./plugin-J8j2oz_x.js"),__vite__mapDeps([0,1,2]),import.meta.url),"../../features/calendar/plugin.js":()=>P(()=>import("./plugin-G0xoarQm.js"),__vite__mapDeps([3,1,2]),import.meta.url),"../../features/datetime/plugin.js":()=>P(()=>import("./plugin-BJ-GVT9I.js"),__vite__mapDeps([4,1,2]),import.meta.url),"../../features/debug_grid/plugin.js":()=>P(()=>import("./plugin-Bz96grI8.js"),[],import.meta.url),"../../features/graph/plugin.js":()=>P(()=>import("./plugin-CdcTmM56.js"),__vite__mapDeps([5,2,1]),import.meta.url),"../../features/icon/plugin.js":()=>P(()=>import("./plugin-SUjS27_R.js"),__vite__mapDeps([6,7,1,2]),import.meta.url),"../../features/image/plugin.js":()=>P(()=>import("./plugin-YpGMeDkx.js"),__vite__mapDeps([8,1,2]),import.meta.url),"../../features/line/plugin.js":()=>P(()=>import("./plugin-C2sDnM_r.js"),[],import.meta.url),"../../features/lvgl_arc/plugin.js":()=>P(()=>import("./plugin-ikeQg1A3.js"),__vite__mapDeps([9,1,2]),import.meta.url),"../../features/lvgl_bar/plugin.js":()=>P(()=>import("./plugin-CN6lT8h5.js"),[],import.meta.url),"../../features/lvgl_button/plugin.js":()=>P(()=>import("./plugin-4OqcHvie.js"),[],import.meta.url),"../../features/lvgl_buttonmatrix/plugin.js":()=>P(()=>import("./plugin-BYUEJW46.js"),[],import.meta.url),"../../features/lvgl_chart/plugin.js":()=>P(()=>import("./plugin-uULqxqmr.js"),[],import.meta.url),"../../features/lvgl_checkbox/plugin.js":()=>P(()=>import("./plugin-Ck8PgWB1.js"),__vite__mapDeps([10,2,1]),import.meta.url),"../../features/lvgl_dropdown/plugin.js":()=>P(()=>import("./plugin-DKvu6nsr.js"),[],import.meta.url),"../../features/lvgl_img/plugin.js":()=>P(()=>import("./plugin-CJupQF3Y.js"),[],import.meta.url),"../../features/lvgl_keyboard/plugin.js":()=>P(()=>import("./plugin-5CX7J5Ir.js"),[],import.meta.url),"../../features/lvgl_label/plugin.js":()=>P(()=>import("./plugin-dCaJeI_S.js"),__vite__mapDeps([11,1,2]),import.meta.url),"../../features/lvgl_led/plugin.js":()=>P(()=>import("./plugin-CvW9GRcJ.js"),[],import.meta.url),"../../features/lvgl_line/plugin.js":()=>P(()=>import("./plugin-DavNvZJ0.js"),[],import.meta.url),"../../features/lvgl_meter/plugin.js":()=>P(()=>import("./plugin-03wdAHv5.js"),[],import.meta.url),"../../features/lvgl_obj/plugin.js":()=>P(()=>import("./plugin-Cvfrg4uG.js"),[],import.meta.url),"../../features/lvgl_qrcode/plugin.js":()=>P(()=>import("./plugin-BZNoAt0h.js"),[],import.meta.url),"../../features/lvgl_roller/plugin.js":()=>P(()=>import("./plugin-H8_Cedxq.js"),[],import.meta.url),"../../features/lvgl_slider/plugin.js":()=>P(()=>import("./plugin-DpfH8oTa.js"),[],import.meta.url),"../../features/lvgl_spinbox/plugin.js":()=>P(()=>import("./plugin-CCSLU7VJ.js"),[],import.meta.url),"../../features/lvgl_spinner/plugin.js":()=>P(()=>import("./plugin-yr1brk0v.js"),[],import.meta.url),"../../features/lvgl_switch/plugin.js":()=>P(()=>import("./plugin-rPrmVtYi.js"),__vite__mapDeps([12,2,1]),import.meta.url),"../../features/lvgl_tabview/plugin.js":()=>P(()=>import("./plugin-Z-WZZzFC.js"),[],import.meta.url),"../../features/lvgl_textarea/plugin.js":()=>P(()=>import("./plugin-Dft6HFQs.js"),[],import.meta.url),"../../features/lvgl_tileview/plugin.js":()=>P(()=>import("./plugin-CIe8d1NL.js"),[],import.meta.url),"../../features/odp_arc/plugin.js":()=>P(()=>import("./plugin-fLOMRvii.js"),[],import.meta.url),"../../features/odp_ellipse/plugin.js":()=>P(()=>import("./plugin-FRwyy2yN.js"),[],import.meta.url),"../../features/odp_icon_sequence/plugin.js":()=>P(()=>import("./plugin-CciJdC0y.js"),[],import.meta.url),"../../features/odp_multiline/plugin.js":()=>P(()=>import("./plugin-C4VhGPFM.js"),[],import.meta.url),"../../features/odp_plot/plugin.js":()=>P(()=>import("./plugin-CI_sUke1.js"),[],import.meta.url),"../../features/odp_polygon/plugin.js":()=>P(()=>import("./plugin-C_hkq-qm.js"),[],import.meta.url),"../../features/odp_rectangle_pattern/plugin.js":()=>P(()=>import("./plugin-BMFaRNdP.js"),[],import.meta.url),"../../features/ondevice_humidity/plugin.js":()=>P(()=>import("./plugin-CHhd1kSa.js"),__vite__mapDeps([13,1,2]),import.meta.url),"../../features/ondevice_temperature/plugin.js":()=>P(()=>import("./plugin-CY8HMSqW.js"),__vite__mapDeps([14,1,2]),import.meta.url),"../../features/online_image/plugin.js":()=>P(()=>import("./plugin-CZB5Wimz.js"),__vite__mapDeps([15,1,2]),import.meta.url),"../../features/progress_bar/plugin.js":()=>P(()=>import("./plugin-B8wRmEsx.js"),__vite__mapDeps([16,17,1,2]),import.meta.url),"../../features/qr_code/plugin.js":()=>P(()=>import("./plugin-0WLnvmKn.js"),__vite__mapDeps([18,1,2]),import.meta.url),"../../features/quote_rss/plugin.js":()=>P(()=>import("./plugin-Dn9UGhih.js"),__vite__mapDeps([19,1,2]),import.meta.url),"../../features/rounded_rect/plugin.js":()=>P(()=>import("./plugin-CM4Q1s6D.js"),[],import.meta.url),"../../features/sensor_text/plugin.js":()=>P(()=>import("./plugin-B5uEYmr_.js"),__vite__mapDeps([20,7,17,2,1]),import.meta.url),"../../features/shape_circle/plugin.js":()=>P(()=>import("./plugin-DNyknmt0.js"),__vite__mapDeps([21,1,2]),import.meta.url),"../../features/shape_rect/plugin.js":()=>P(()=>import("./plugin-CgcQgGpe.js"),__vite__mapDeps([22,1,2]),import.meta.url),"../../features/template_nav_bar/plugin.js":()=>P(()=>import("./plugin-4wufTPdX.js"),__vite__mapDeps([23,2,1]),import.meta.url),"../../features/template_sensor_bar/plugin.js":()=>P(()=>import("./plugin-9PV-_IMF.js"),__vite__mapDeps([24,1,2]),import.meta.url),"../../features/text/plugin.js":()=>P(()=>import("./plugin-BEclA6uC.js"),__vite__mapDeps([25,7,1,2]),import.meta.url),"../../features/touch_area/plugin.js":()=>P(()=>import("./plugin-DiMNzmjp.js"),__vite__mapDeps([26,2,1]),import.meta.url),"../../features/weather_forecast/plugin.js":()=>P(()=>import("./plugin-ddChsXdY.js"),__vite__mapDeps([27,1,2]),import.meta.url),"../../features/weather_icon/plugin.js":()=>P(()=>import("./plugin-D2WSRTxz.js"),__vite__mapDeps([28,2,1]),import.meta.url),"../../features/wifi_signal/plugin.js":()=>P(()=>import("./plugin-DBeJPOz5.js"),__vite__mapDeps([29,1,2]),import.meta.url)})}catch{}class io{constructor(){this.plugins=new Map,this.loading=new Map,this.aliases={label:"text",rectangle:"shape_rect",rrect:"rounded_rect",circle:"shape_circle",nav_next_page:"touch_area",nav_previous_page:"touch_area",nav_reload_page:"touch_area",puppet:"online_image",multiline:"odp_multiline",rectangle_pattern:"odp_rectangle_pattern",polygon:"odp_polygon",ellipse:"odp_ellipse",icon_sequence:"odp_icon_sequence",weather_forcast:"weather_forecast",odp_debug_grid:"debug_grid",lv_chart:"lvgl_chart"}}register(e){if(!e?.id){b.warn("[Registry] Invalid plugin registration attempt:",e);return}const n=e.id,o=this.plugins.get(n);this.plugins.set(n,{...o||{},...e}),b.log(`[Registry] Registered: ${n}`)}get(e){const n=this.aliases[e]||e;return this.plugins.get(n)}getAll(){return Array.from(this.plugins.values())}async load(e){const n=this.aliases[e]||e;if(n==="group")return null;const o=this.plugins.get(n);if(o)return o;const i=this.loading.get(n);if(i)return i;const r=(async()=>{try{const s=`../../features/${n}/plugin.js`,a=it[s]?await it[s]():await import(s);let l;return a.default?l=a.default:l={id:n,...a},this.register(l),this.plugins.get(n)??null}catch(s){return b.error(`[Registry] Failed to load plugin "${n}" from ESM:`,s),null}finally{this.loading.delete(n)}})();return this.loading.set(n,r),r}runHook(e,n){this.getAll().forEach(o=>{const i=e==="onCollectRequirements"?o.collectRequirements:o[e];typeof i=="function"&&i.call(o,n)})}onExportGlobals(e){this.runHook("onExportGlobals",e)}onExportEsphome(e){this.runHook("onExportEsphome",e)}onExportNumericSensors(e){this.runHook("onExportNumericSensors",e)}onExportTextSensors(e){this.runHook("onExportTextSensors",e)}onExportBinarySensors(e){this.runHook("onExportBinarySensors",e)}onExportHelpers(e){this.runHook("onExportHelpers",e)}onExportComponents(e){this.runHook("onExportComponents",e)}onCollectRequirements(e){this.runHook("onCollectRequirements",e)}}const j=new io;b.log("[Registry] Modular system ready.");class oo{constructor(e){this.app=e}normalizeWidgetIds(e){return e?Array.isArray(e)?e:[...e]:[]}setCustomHardware(e){this.app.project.state.customHardware=e,L(E.STATE_CHANGED),L(E.PAGE_CHANGED,{index:this.app.currentPageIndex,forceFocus:!0})}addWidget(e,n=null){this.checkRenderingModeForWidget(e),this.app.project.addWidget(e,n),this.app.recordHistory(),this.app.selectWidget(e.id),L(E.STATE_CHANGED)}updateWidget(e,n){const o=this.app;this.app.project.updateWidget(e,n);const i=o.getWidgetById(e);if(i&&i.type==="group"){const r=["locked","hidden"],s={},a=n||{};if(r.forEach(l=>{a[l]!==void 0&&(s[l]=a[l])}),Object.keys(s).length>0){const l=o.pages[o.currentPageIndex];l&&l.widgets&&l.widgets.filter(d=>d.parentId===e).forEach(d=>this.updateWidget(d.id,s))}}n.parentId!==void 0&&this.syncWidgetOrderWithHierarchy(),L(E.STATE_CHANGED)}updateWidgets(e,n){e.forEach(o=>this.app.project.updateWidget(o,n)),L(E.STATE_CHANGED)}updateWidgetsProps(e,n){const o=[];e.forEach(i=>{const r=this.app.getWidgetById(i);if(r){const s={...r.props||{},...n};if(this.app.project.updateWidget(i,{props:s}),n.radius!==void 0&&r.parentId){const a=this.app.getWidgetById(r.parentId);if(a&&a.type==="group"&&a.title&&a.title.endsWith("Group")){const c=(this.app.getCurrentPage()?.widgets.filter(d=>d.parentId===a.id)||[]).find(d=>d.id!==r.id&&d.props?.name&&d.props.name.endsWith("Shadow"));c&&o.push({id:c.id,props:{...c.props||{},radius:n.radius}})}}}}),o.forEach(i=>{this.app.project.updateWidget(i.id,{props:i.props})}),L(E.STATE_CHANGED)}deleteWidget(e){const n=e?[e]:this.normalizeWidgetIds(this.app.editor.selectedWidgetIds),o=[...n];n.forEach(i=>{const r=this.app.getWidgetById(i);r&&r.type==="group"&&this.app.pages[this.app.currentPageIndex].widgets.filter(a=>a.parentId===i).forEach(a=>o.push(a.id))}),this.app.project.deleteWidgets([...new Set(o)]),this.app.editor.setSelectedWidgetIds([]),this.app.recordHistory(),L(E.STATE_CHANGED)}moveWidgetToPage(e,n,o=null,i=null){const r=this.app.getWidgetById(e);if(!r)return!1;const s=this.app.getCurrentPage(),a=this.app.pages[n];if(!s||!a)return!1;const l=[r];if(r.type==="group"){const f=s.widgets.filter(h=>h.parentId===e);l.push(...f)}const c=o!==null?o-r.x:0,d=i!==null?i-r.y:0,u=new Set(l.map(f=>f.id));return s.widgets=s.widgets.filter(f=>!u.has(f.id)),l.forEach(f=>{const h=JSON.parse(JSON.stringify(f));f.id===e?(o!==null&&(h.x=o),i!==null&&(h.y=i)):(h.x+=c,h.y+=d),a.widgets.push(h)}),this.app.project.rebuildWidgetsIndex(),this.app.recordHistory(),L(E.STATE_CHANGED),!0}copyWidget(e){const o=(e?[e]:this.normalizeWidgetIds(this.app.editor.selectedWidgetIds)).map(i=>this.app.getWidgetById(i)).filter(i=>!!i);o.length>0&&this.app.editor.copyWidgets(o)}pasteWidget(){const e=this.app.editor,n=e.clipboardWidgets;if(!n||n.length===0)return;const o=n.map(i=>{const r=JSON.parse(JSON.stringify(i));return r.id=me(),r.x+=10,r.y+=10,r});o.forEach(i=>{this.checkRenderingModeForWidget(i),this.app.project.addWidget(i)}),e.setSelectedWidgetIds(o.map(i=>i.id)),this.app.recordHistory(),L(E.STATE_CHANGED)}createDropShadow(e){const n=Array.isArray(e)?e:[e];if(n.length===0)return;const o=this.app.project.getCurrentPage();if(!o||!o.widgets)return;const i=o?o.dark_mode:void 0;let r=!1;i==="dark"?r=!0:i==="light"?r=!1:r=!!this.app.settings.dark_mode;const s=r?"white":"black",a=r?"black":"white",l=r?"white":"black",c=[];n.forEach(d=>{const u=this.app.getWidgetById(d);if(!u)return;const f=parseInt(u.props?.border_radius||u.props?.radius||u.props?.corner_radius||0,10);let h="shape_rect";u.type==="shape_circle"||u.type==="circle"?h="shape_circle":f>0&&(h="rounded_rect");const g={id:me(),type:h,x:(u.x||0)+5,y:(u.y||0)+5,width:u.width,height:u.height,props:{name:(u.props?.name||u.type)+" Shadow",color:s,background_color:s,bg_color:s,fill:!0}};h==="rounded_rect"&&(g.props.radius=f),this.app.project.addWidget(g),u.props||(u.props={});const y=["shape_rect","rounded_rect","shape_circle","rectangle","rrect","circle"].includes(u.type),v=u.props.color&&u.props.color!=="theme_auto"?u.props.color:l;(!u.props.border_color||u.props.border_color==="theme_auto")&&(u.props.border_color=v),u.props.fill=!0,u.props.background_color=a,u.props.bg_color=a,y&&(u.props.color=a),this.app.project.updateWidget(d,{props:{...u.props}});const m=o.widgets.findIndex(M=>M.id===d),_=o.widgets.findIndex(M=>M.id===g.id);m!==-1&&_!==-1&&this.app.project.reorderWidget(this.app.project.currentPageIndex,_,m);const x="group_"+me(),I=Math.min(u.x,g.x),C=Math.min(u.y,g.y),S=Math.max(u.x+u.width,g.x+g.width),w=Math.max(u.y+u.height,g.y+g.height),k={id:x,type:"group",title:u.props?.name?`${u.props.name} Group`:"Shadow Group",x:I,y:C,width:S-I,height:w-C,props:{},expanded:!0};this.app.project.addWidget(k),this.app.project.updateWidget(g.id,{parentId:x}),this.app.project.updateWidget(u.id,{parentId:x}),c.push(x)}),c.length>0&&this.app.selectWidgets(c),this.syncWidgetOrderWithHierarchy(),this.app.recordHistory(),L(E.STATE_CHANGED)}syncWidgetOrderWithHierarchy(){const e=this.app.getCurrentPage();if(!e||!e.widgets)return;const n=[...e.widgets],o=n.filter(a=>!a.parentId),i=new Map;n.forEach(a=>{if(a.parentId){i.has(a.parentId)||i.set(a.parentId,[]);const l=i.get(a.parentId);l&&l.push(a)}});const r=[],s=a=>{r.push(a);const l=i.get(a.id);l&&(l.sort((c,d)=>n.indexOf(c)-n.indexOf(d)),l.forEach(s))};o.forEach(s),e.widgets=r,this.app.project.rebuildWidgetsIndex()}syncWidgetVisibilityWithMode(){const e=this.app.preferences.state.renderingMode||"direct";b.log(`[AppState] Syncing widget visibility for mode: ${e}`);let n=0;this.app.project.pages.forEach(o=>{o.widgets.forEach(i=>{const r=this.isWidgetCompatibleWithMode(i,e);!r&&!i.hidden?(i.hidden=!0,n++):r&&i.hidden&&(i.hidden=!1,n++)})}),n>0&&(b.log(`[AppState] Updated ${n} widgets due to mode switch.`),this.app.project.rebuildWidgetsIndex(),L(E.STATE_CHANGED))}isWidgetCompatibleWithMode(e,n){const o=j.get(e.type);if(!o)return!0;if(n==="oepl")return!!o.exportOEPL;if(n==="opendisplay")return!!o.exportOpenDisplay;if(n==="lvgl"){const i=e.type&&e.type.startsWith("lvgl_"),r=typeof o.exportLVGL=="function";return i||r}if(n==="direct"){const i=e.type&&(e.type.startsWith("lvgl_")||e.type.startsWith("oepl_"));return!!o.export&&!i}return!0}checkRenderingModeForWidget(e){if(!e||!e.type)return;const n=this.app.preferences.state.renderingMode||"direct",o=e.type.startsWith("lvgl_"),i=e.type.startsWith("oepl_"),r=e.type.startsWith("odp_")||e.type.startsWith("opendisplay_");o&&n==="direct"?(this.app.updateSettings({renderingMode:"lvgl"}),b.log(`[AppState] Auto-switched to LVGL rendering mode because an LVGL widget (${e.type}) was added.`),T("Auto-switched to LVGL rendering mode","info")):i&&n!=="oepl"?(this.app.updateSettings({renderingMode:"oepl"}),b.log(`[AppState] Auto-switched to OEPL rendering mode because an OEPL widget (${e.type}) was added.`),T("Auto-switched to OEPL mode","info")):r&&n!=="opendisplay"&&(this.app.updateSettings({renderingMode:"opendisplay"}),b.log(`[AppState] Auto-switched to OpenDisplay (ODP) mode because an ODP widget (${e.type}) was added.`),T("Auto-switched to ODP mode","info"))}}class ro{constructor(e){this.app=e}reorderWidget(e,n,o){this.app.project.reorderWidget(e,n,o),this.app.widgetManager.syncWidgetOrderWithHierarchy(),this.app.recordHistory(),L(E.STATE_CHANGED)}setCurrentPageIndex(e,n={}){this.app.project.setCurrentPageIndex(e,n),this.app.editor.setSelectedWidgetIds([]),L(E.STATE_CHANGED)}reorderPage(e,n){this.app.project.reorderPage(e,n),this.app.recordHistory()}addPage(e=null){const n=this.app.project.addPage(e);return this.app.recordHistory(),n}deletePage(e){this.app.project.deletePage(e),this.app.recordHistory()}duplicatePage(e){const n=this.app.project.duplicatePage(e);return this.app.recordHistory(),n}renamePage(e,n){this.app.project.renamePage(e,n),this.app.recordHistory()}clearCurrentPage(e=!1){const n=this.app.project.clearCurrentPage(e);return n.deleted>0&&(this.app.editor.setSelectedWidgetIds([]),this.app.recordHistory(),L(E.STATE_CHANGED)),n}}class so{project;editor;preferences;secrets;selectionManager;historyManager;widgetManager;pageManager;_isRestoringHistory;isUndoRedoInProgress;entityStates;$raw;constructor(){this.project=new Ji,this.editor=new Zi,this.preferences=new Qi,this.secrets=new eo,this.selectionManager=new to(this),this.historyManager=new no(this),this.widgetManager=new oo(this),this.pageManager=new ro(this),this._isRestoringHistory=!1,this.isUndoRedoInProgress=!1,this.entityStates={},this.recordHistory(),G(E.SETTINGS_CHANGED,e=>{e&&e.renderingMode!==void 0&&this.syncWidgetVisibilityWithMode()})}reset(){this.project.reset(),this.editor.state.selectedWidgetIds=[],this.recordHistory()}get pages(){return this.project.pages}get state(){return this.project.state}get currentPageIndex(){return this.project.currentPageIndex}get selectedWidgetId(){return this.editor.selectedWidgetIds[0]||null}get selectedWidgetIds(){return this.editor.selectedWidgetIds}get settings(){return{...this.preferences.state,device_name:this.project.deviceName,deviceName:this.project.deviceName,device_model:this.project.deviceModel,deviceModel:this.project.deviceModel,customHardware:this.project.customHardware,custom_hardware:this.project.customHardware,protocolHardware:this.project.protocolHardware,protocol_hardware:this.project.protocolHardware,...this.secrets.keys}}get deviceName(){return this.project.deviceName}get deviceModel(){return this.project.deviceModel}get currentLayoutId(){return this.project.currentLayoutId}get snapEnabled(){return this.preferences.snapEnabled}get showGrid(){return this.preferences.showGrid}get showDebugGrid(){return this.preferences.showDebugGrid}get showRulers(){return this.preferences.showRulers}get zoomLevel(){return this.editor.zoomLevel}getCurrentPage(){return this.project.getCurrentPage()}getWidgetById(e){return this.project.getWidgetById(e)}getSelectedWidget(){return this.project.getWidgetById(this.editor.selectedWidgetIds[0])}getSelectedWidgets(){return this.editor.selectedWidgetIds.map(e=>this.getWidgetById(e)).filter(e=>!!e)}getSelectedProfile(){const e=A;return this.project.deviceModel&&e[this.project.deviceModel]||null}getCanvasDimensions(){const e=this.preferences.state.renderingMode||"direct";if(e==="oepl"||e==="opendisplay"){const n=this.project.protocolHardware;return this.preferences.state.orientation==="portrait"?{width:Math.min(n.width,n.height),height:Math.max(n.width,n.height)}:{width:Math.max(n.width,n.height),height:Math.min(n.width,n.height)}}return this.project.getCanvasDimensions(this.preferences.state.orientation||"landscape")}getCanvasShape(){return this.project.getCanvasShape()}getPagesPayload(){const e={...this.project.getPagesPayload(),currentPageIndex:this.currentPageIndex,...this.settings};return e.deviceModel=this.project.deviceModel||void 0,e.customHardware=this.project.customHardware,e.protocolHardware=this.project.protocolHardware,e.device_model=this.project.deviceModel||void 0,e.custom_hardware=this.project.customHardware,e.protocol_hardware=this.project.protocolHardware,e}getSettings(){return this.settings}setSettings(e){this.updateSettings(e)}updateProtocolHardware(e){Object.assign(this.project.state.protocolHardware,e),L(E.SETTINGS_CHANGED),L(E.PAGE_CHANGED,{index:this.currentPageIndex,forceFocus:!0})}saveToLocalStorage(){if(!R()){const e=this.getPagesPayload();localStorage.setItem("esphome-designer-layout",JSON.stringify(e))}}loadFromLocalStorage(){try{const e=localStorage.getItem("esphome-designer-layout");return e?JSON.parse(e):null}catch(e){return b.error("[loadFromLocalStorage] Parse error:",e),null}}setPages(e){this.project.setPages(e),L(E.STATE_CHANGED)}reorderWidget(e,n,o){this.pageManager.reorderWidget(e,n,o)}setCurrentPageIndex(e,n={}){this.pageManager.setCurrentPageIndex(e,n)}reorderPage(e,n){this.pageManager.reorderPage(e,n)}addPage(e=null){return this.pageManager.addPage(e)}deletePage(e){this.pageManager.deletePage(e)}duplicatePage(e){return this.pageManager.duplicatePage(e)}renamePage(e,n){this.pageManager.renamePage(e,n)}selectWidget(e,n=!1){this.selectionManager.selectWidget(e,n)}selectWidgets(e){this.selectionManager.selectWidgets(e)}selectAllWidgets(){this.selectionManager.selectAllWidgets()}deselectAll(){this.selectionManager.deselectAll()}toggleSelection(e){this.selectionManager.toggleSelection(e)}isWidgetSelected(e){return this.selectionManager.isWidgetSelected(e)}groupSelection(){this.selectionManager.groupSelection()}ungroupSelection(e=null){this.selectionManager.ungroupSelection(e)}alignSelectedWidgets(e){this.selectionManager.alignSelectedWidgets(e)}distributeSelectedWidgets(e){this.selectionManager.distributeSelectedWidgets(e)}updateSettings(e){const n={},o={};Object.keys(e).forEach(i=>{i.startsWith("ai_api_key_")?n[i]=e[i]:o[i]=e[i]}),Object.keys(n).length&&Object.entries(n).forEach(([i,r])=>this.secrets.set(i,String(r??""))),this.preferences.update(o),e.device_name&&(this.project.state.deviceName=e.device_name),e.device_model&&(this.project.state.deviceModel=e.device_model),L(E.STATE_CHANGED),(e.device_model||e.orientation||e.custom_hardware)&&L(E.PAGE_CHANGED,{index:this.currentPageIndex,forceFocus:!0})}setDeviceName(e){this.project.state.deviceName=e,this.updateLayoutIndicator(),L(E.STATE_CHANGED)}setDeviceModel(e){this.project.state.deviceModel=e,this.updateLayoutIndicator(),L(E.STATE_CHANGED),L(E.PAGE_CHANGED,{index:this.currentPageIndex,forceFocus:!0})}setCurrentLayoutId(e){this.project.state.currentLayoutId=e,this.updateLayoutIndicator(),L(E.STATE_CHANGED)}updateLayoutIndicator(){const e=document.getElementById("currentLayoutName");e&&(e.textContent=this.project.deviceName||this.project.currentLayoutId||"Unknown")}setSnapEnabled(e){this.preferences.setSnapEnabled(e)}setShowGrid(e){this.preferences.setShowGrid(e)}setShowDebugGrid(e){this.preferences.setShowDebugGrid(e)}setShowRulers(e){this.preferences.setShowRulers(e)}setZoomLevel(e){this.editor.setZoomLevel(e)}setCustomHardware(e){this.widgetManager.setCustomHardware(e)}addWidget(e,n=null){this.widgetManager.addWidget(e,n)}updateWidget(e,n){this.widgetManager.updateWidget(e,n)}updateWidgets(e,n){this.widgetManager.updateWidgets(e,n)}updateWidgetsProps(e,n){this.widgetManager.updateWidgetsProps(e,n)}deleteWidget(e=null){this.widgetManager.deleteWidget(e)}moveWidgetToPage(e,n,o=null,i=null){return this.widgetManager.moveWidgetToPage(e,n,o,i)}copyWidget(e=null){this.widgetManager.copyWidget(e)}pasteWidget(){this.widgetManager.pasteWidget()}createDropShadow(e){this.widgetManager.createDropShadow(e)}clearCurrentPage(e=!1){return this.pageManager.clearCurrentPage(e)}recordHistory(){this.historyManager.recordHistory()}undo(){this.historyManager.undo()}redo(){this.historyManager.redo()}setInternalFlag(e,n){const o=this.$raw||this;o[String(e)]=n}restoreSnapshot(e){this.historyManager.restoreSnapshot(e)}canUndo(){return this.historyManager.canUndo()}canRedo(){return this.historyManager.canRedo()}syncWidgetOrderWithHierarchy(){this.widgetManager.syncWidgetOrderWithHierarchy()}syncWidgetVisibilityWithMode(){this.widgetManager.syncWidgetVisibilityWithMode()}_isWidgetCompatibleWithMode(e,n){return this.widgetManager.isWidgetCompatibleWithMode(e,n)}_checkRenderingModeForWidget(e){this.widgetManager.checkRenderingModeForWidget(e)}}const ao=new so,lo={set(t,e,n,o){return e==="snapEnabled"?(b.warn(`[StateProxy] Intercepted illegal write to '${String(e)}'. Automatically rerouting to setSnapEnabled().`),typeof t.setSnapEnabled=="function"&&t.setSnapEnabled(!!n),!0):(typeof e=="string"&&!["entityStates","_isRestoringHistory","isUndoRedoInProgress"].includes(e)&&typeof t[e]!="function"&&(b.warn(`[StateProxy] Illegal state mutation detected: AppState.${e} = ${String(n)}`),console.trace(`[StateProxy] Trace for illegal mutation of AppState.${e}`)),Reflect.set(t,e,n,o))}},p=new Proxy(ao,lo);class ${static getEffectiveDarkMode(){const n=p?.getCurrentPage?.()?.dark_mode;return n==="dark"?!0:n==="light"?!1:!!(p&&p.settings&&p.settings.dark_mode)}static getDefaultColor(){return $.getEffectiveDarkMode()?"white":"black"}static getDefaultBgColor(){return $.getEffectiveDarkMode()?"black":"white"}static getGridCellDefaults(){return{grid_cell_row_pos:null,grid_cell_column_pos:null,grid_cell_row_span:1,grid_cell_column_span:1,grid_cell_x_align:"STRETCH",grid_cell_y_align:"STRETCH"}}static isLvglWidget(e){return!!(e&&e.startsWith("lvgl_"))}static createWidget(e){const n=me(),o=$.getDefaultBgColor(),i=$.getDefaultColor();let r={id:n,type:e,x:40,y:40,width:120,height:40,title:"",entity_id:"",locked:!1,props:{}};switch(e){case"nav_next_page":return r.props={title:"Next",color:"rgba(0, 128, 255, 0.2)",border_color:"#0080ff",nav_action:"next_page",icon:"F0142",icon_size:48},r.width=80,r.height=80,r;case"nav_previous_page":return r.props={title:"Previous",color:"rgba(0, 128, 255, 0.2)",border_color:"#0080ff",nav_action:"previous_page",icon:"F0141",icon_size:48},r.width=80,r.height=80,r;case"nav_reload_page":return r.props={title:"Reload",color:"rgba(0, 128, 255, 0.2)",border_color:"#0080ff",nav_action:"reload_page",icon:"F0450",icon_size:48},r.width=80,r.height=80,r}const s=j.get(e);return s&&s.defaults&&(r.props={...s.defaults},(r.props.color==="black"||r.props.color==="white")&&(r.props.color="theme_auto"),(r.props.text_color==="black"||r.props.text_color==="white")&&(r.props.text_color="theme_auto"),(r.props.bg_color==="black"||r.props.bg_color==="white")&&(r.props.bg_color=o),(r.props.background_color==="black"||r.props.background_color==="white")&&(r.props.background_color=o),(r.props.border_color==="black"||r.props.border_color==="white")&&(r.props.border_color=i),s.width&&(r.width=s.width),s.height&&(r.height=s.height),s.defaults.width&&(r.width=s.defaults.width),s.defaults.height&&(r.height=s.defaults.height),s.defaults.w&&(r.width=s.defaults.w),s.defaults.h&&(r.height=s.defaults.h)),$.isLvglWidget(e)&&(r.props={...$.getGridCellDefaults(),...r.props}),r}}let we=null;class Us{constructor(){this.isOpen=!1,this.selectedIndex=0,this.filteredWidgets=[],this.allWidgets=[],this.modal=null,this.input=null,this.resultsContainer=null,we=this,this.init()}init(){this.createModal(),this.bindEvents()}discoverWidgets(){this.allWidgets=[];const e=document.querySelectorAll(".widget-category .item[data-widget-type]");if(e.length===0){b.warn("[QuickSearch] No widgets found in palette");return}e.forEach(n=>{const o=n.getAttribute("data-widget-type"),i=n.querySelector(".label"),r=i?i.textContent.trim():o,s=n.closest(".widget-category"),a=s?s.querySelector(".category-name"):null,l=a?a.textContent.trim():"Widgets";this.allWidgets.push({type:o,label:r,category:l,searchText:`${r} ${o} ${l}`.toLowerCase()})}),b.log(`[QuickSearch] Discovered ${this.allWidgets.length} widgets`)}createModal(){this.modal=document.createElement("div"),this.modal.id="quick-search-modal",this.modal.className="quick-search-modal hidden",this.modal.innerHTML=`
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
        `,U(this.modal),this.input=this.modal.querySelector(".quick-search-input"),this.resultsContainer=this.modal.querySelector(".quick-search-results")}bindEvents(){this.modal.querySelector(".quick-search-backdrop").addEventListener("click",()=>this.close()),this.input.addEventListener("input",()=>this.handleSearch()),this.input.addEventListener("keydown",e=>this.handleKeyDown(e))}open(){this.discoverWidgets(),this.isOpen=!0,this.modal.classList.remove("hidden"),this.input.value="",this.selectedIndex=0,this.handleSearch(),setTimeout(()=>this.input.focus(),50)}close(){this.isOpen=!1,this.modal.classList.add("hidden"),this.input.blur()}handleSearch(){const e=this.input.value.toLowerCase().trim();e===""?this.filteredWidgets=[...this.allWidgets]:this.filteredWidgets=this.allWidgets.filter(n=>n.searchText.includes(e)),this.selectedIndex=0,this.renderResults()}renderResults(){if(this.filteredWidgets.length===0){this.resultsContainer.innerHTML=`
                <div class="quick-search-empty">No widgets found</div>
            `;return}this.resultsContainer.innerHTML=this.filteredWidgets.map((n,o)=>`
            <div class="quick-search-item ${o===this.selectedIndex?"selected":""}" 
                 data-index="${o}" data-type="${n.type}">
                <span class="quick-search-item-label">${n.label}</span>
                <span class="quick-search-item-category">${n.category}</span>
            </div>
        `).join(""),this.resultsContainer.querySelectorAll(".quick-search-item").forEach(n=>{n.addEventListener("click",()=>{const o=parseInt(n.getAttribute("data-index"),10);this.selectedIndex=o,this.addSelectedWidget()})});const e=this.resultsContainer.querySelector(".quick-search-item.selected");e&&e.scrollIntoView({block:"nearest"})}handleKeyDown(e){switch(e.key){case"ArrowDown":e.preventDefault(),this.selectedIndex=Math.min(this.selectedIndex+1,this.filteredWidgets.length-1),this.renderResults();break;case"ArrowUp":e.preventDefault(),this.selectedIndex=Math.max(this.selectedIndex-1,0),this.renderResults();break;case"Enter":e.preventDefault(),this.addSelectedWidget();break;case"Escape":e.preventDefault(),this.close();break}}addSelectedWidget(){if(this.filteredWidgets.length===0)return;const e=this.filteredWidgets[this.selectedIndex];if(e)try{const n=$.createWidget(e.type);p.addWidget(n),b.log(`[QuickSearch] Added widget: ${e.label}`),this.close()}catch(n){b.error("[QuickSearch] Error adding widget:",n),T("Failed to add widget: "+n.message,"error")}}}function Ot(){return typeof globalThis.innerWidth=="number"?globalThis.innerWidth:0}function co(t,e){const n=document.createElement("div");n.className="modal-backdrop",n.style.display="flex",n.innerHTML=`
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
    `,U(n);const o=()=>n.remove(),i=()=>{o();try{typeof p.deletePage=="function"?p.deletePage(t):typeof T=="function"&&T("Error: AppState.deletePage not found","error")}catch(a){if(typeof T=="function"){const l=a instanceof Error?a.message:String(a);T(`Error deleting page: ${l}`,"error")}}};n.querySelectorAll(".close-btn").forEach(a=>a.onclick=o);const s=n.querySelector(".confirm-btn");s&&(s.onclick=i),n.onclick=a=>{a.target===n&&o()}}function po(){if(!p){typeof T=="function"&&T("Error: Application State is not ready.","error");return}const e=document.createElement("div");e.className="modal-backdrop",e.style.display="flex",e.innerHTML=`
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
    `,U(e);const n=()=>e.remove(),o=()=>{n();try{const s=p.clearCurrentPage(!0);s.preserved>0&&typeof T=="function"?T(`Cleared ${s.deleted} widgets. ${s.preserved} locked widget(s) were preserved.`,"info"):s.deleted>0?T(`Cleared all ${s.deleted} widgets.`,"success"):s.preserved>0?T(`No widgets cleared. ${s.preserved} locked widget(s) preserved.`,"info"):T("Page is already empty.","info"),b.log("Cleared widgets from current page via AppState")}catch(s){if(typeof T=="function"){const a=s instanceof Error?s.message:String(s);T(`Error clearing page: ${a}`,"error")}}};e.querySelectorAll(".close-btn").forEach(s=>s.onclick=n);const r=e.querySelector(".confirm-btn");r&&(r.onclick=o),e.onclick=s=>{s.target===e&&n()}}function uo(t){const e=document.getElementById("mobileWidgetsBtn"),n=document.getElementById("mobilePropsBtn"),o=document.getElementById("mobileDeviceBtn"),i=document.getElementById("mobileBackdrop"),r=document.querySelector(".sidebar"),s=document.querySelector(".right-panel"),a=()=>{r?.classList.remove("mobile-active"),s?.classList.remove("mobile-active"),i?.classList.remove("active")};e?.addEventListener("click",()=>{const d=r?.classList.contains("mobile-active");a(),d||(r?.classList.add("mobile-active"),i?.classList.add("active"))}),n?.addEventListener("click",()=>{const d=s?.classList.contains("mobile-active");a(),d||(s?.classList.add("mobile-active"),i?.classList.add("active"))}),o?.addEventListener("click",()=>{a(),t.app?.deviceSettings?.open()}),document.getElementById("mobileEditorSettingsBtn")?.addEventListener("click",()=>{a(),t.app?.editorSettings?.open()}),i?.addEventListener("click",a),G(E.SELECTION_CHANGED,()=>{Ot()<=768&&(r?.classList.remove("mobile-active"),!s?.classList.contains("mobile-active")&&!r?.classList.contains("mobile-active")&&i?.classList.remove("active"))});const c=t.handlePaletteClick.bind(t);t.handlePaletteClick=d=>{c(d),Ot()<=768&&a()}}class js{constructor(e=null){b.log("Sidebar: Constructor called"),this.app=e,this.pageListEl=document.getElementById("pageList"),this.pagesHeader=document.getElementById("pagesHeader"),this.pagesContent=document.getElementById("pagesContent"),this.widgetPaletteEl=document.getElementById("widgetPalette"),b.log("Sidebar: widgetPaletteEl found?",!!this.widgetPaletteEl),this.widgetPaletteEl||b.error("Sidebar: widgetPalette element not found!"),this.addPageBtn=document.getElementById("addPageBtn"),this.currentPageNameEl=document.getElementById("currentPageName"),this.hoverTimeout=null,this.hoveredPageIndex=-1}init(){b.log("Sidebar: init called"),G(E.STATE_CHANGED,()=>this.render()),G(E.PAGE_CHANGED,()=>this.render());const e=this.pagesHeader,n=this.pagesContent;e&&n&&e.addEventListener("click",()=>{const r=n.classList.toggle("hidden"),s=e.querySelector(".chevron");s&&(s.style.transform=r?"rotate(-90deg)":"rotate(0deg)")}),this.addPageBtn&&this.addPageBtn.addEventListener("click",()=>this.handleAddPage()),this.widgetPaletteEl&&(this.widgetPaletteEl.addEventListener("click",r=>this.handlePaletteClick(r)),this.widgetPaletteEl.addEventListener("dragstart",r=>{const s=r.target.closest(".item[data-widget-type]");if(s){const a=s.getAttribute("data-widget-type");b.log("[Sidebar] Drag start:",a),r.dataTransfer&&(r.dataTransfer.setData("application/widget-type",a||""),r.dataTransfer.effectAllowed="copy")}}));const o=document.getElementById("clearAllBtn");o&&o.addEventListener("click",()=>this.handleClearPage());const i=document.getElementById("quickSearchBtn");i&&i.addEventListener("click",r=>{r.stopPropagation(),we?we.open():b.warn("Sidebar: QuickSearch instance not found on window")}),this.setupMobileToggles(),this.render()}render(){const e=this.pageListEl;if(!e)return;const n=document.createDocumentFragment();e.innerHTML="";const o=p.pages,i=p.currentPageIndex;if(o.forEach((r,s)=>{const a=document.createElement("div");a.className="item"+(s===i?" active":""),a.draggable=!0,a.ondragstart=h=>{h.dataTransfer&&(h.dataTransfer.setData("text/plain",String(s)),h.dataTransfer.effectAllowed="move"),a.style.opacity="0.5"},a.ondragend=()=>{a.style.opacity="1",Array.from(e.children).forEach(h=>{h.style.borderTop="",h.style.borderBottom=""})},a.ondragover=h=>{if(h.preventDefault(),!h.dataTransfer)return;const g=h.dataTransfer.types.includes("application/widget-id"),y=h.dataTransfer.types.includes("application/widget-type");if(g||y){h.dataTransfer&&(h.dataTransfer.dropEffect=g?"move":"copy"),a.style.backgroundColor="var(--primary-subtle)",p.currentPageIndex!==s&&p.setCurrentPageIndex(s);return}const v=a.getBoundingClientRect(),m=v.top+v.height/2;h.clientY<m?(a.style.borderTop="2px solid var(--primary)",a.style.borderBottom=""):(a.style.borderTop="",a.style.borderBottom="2px solid var(--primary)")},a.ondragleave=h=>{const g=h.relatedTarget;(!(g instanceof Node)||!a.contains(g))&&this.hoveredPageIndex===s&&(this.hoverTimeout&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=null),this.hoveredPageIndex=-1),a.style.borderTop="",a.style.borderBottom="",a.style.backgroundColor=""},a.ondrop=h=>{if(h.preventDefault(),this.hoverTimeout&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=null),this.hoveredPageIndex=-1,a.style.borderTop="",a.style.borderBottom="",a.style.backgroundColor="",!h.dataTransfer)return;const g=h.dataTransfer.getData("application/widget-id"),y=h.dataTransfer.getData("application/widget-type");if(g){b.log(`[Sidebar] Drop detected on page ${s}. Widget ID:`,g);const _=s;_!==p.currentPageIndex&&(p.moveWidgetToPage(g,_),b.log(`[Sidebar] Moved widget ${g} to page ${_}`));return}if(y){b.log(`[Sidebar] Drop detected on page ${s}. Widget Type:`,y);const _=s;try{const x=$.createWidget(y);x.x=40,x.y=40,p.addWidget(x,_),p.setCurrentPageIndex(_),p.selectWidget(x.id,!1),b.log(`[Sidebar] Added new ${y} to page ${_}`)}catch(x){b.error("[Sidebar] Error creating widget from drop:",x)}return}const v=parseInt(h.dataTransfer.getData("text/plain"),10),m=s;this.handlePageReorder(v,m,h.clientY,a)},a.onclick=()=>{p.setCurrentPageIndex(s,{forceFocus:!0})},a.ondblclick=h=>{h.stopPropagation();const g=r.name||"",y=prompt("Rename Page:",g);y!==null&&y.trim()!==""&&y!==g&&p.renamePage(s,y)};const l=document.createElement("span");l.className="item-icon",l.innerHTML=`<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>`,a.appendChild(l);const c=document.createElement("span");c.className="label",c.textContent=r.name,a.appendChild(c);const d=document.createElement("div");d.style.marginLeft="auto",d.style.display="flex",d.style.gap="2px";const u=document.createElement("button");u.textContent="⚙",u.className="btn btn-secondary",u.style.padding="1px 4px",u.style.fontSize="8px",u.onclick=h=>{h.stopPropagation(),this.openPageSettings(s)},d.appendChild(u);const f=document.createElement("button");if(f.textContent="⧉",f.className="btn btn-secondary",f.style.padding="1px 4px",f.style.fontSize="8px",f.title="Duplicate Page",f.onclick=h=>{h.stopPropagation(),p.duplicatePage(s)},d.appendChild(f),o.length>1){const h=document.createElement("button");h.textContent="✕",h.className="btn btn-secondary",h.style.padding="1px 4px",h.style.fontSize="8px",h.style.color="var(--danger)",h.onclick=g=>{g.stopPropagation(),this.handlePageDelete(s,r)},d.appendChild(h)}a.appendChild(d),n.appendChild(a)}),e.appendChild(n),this.currentPageNameEl){const r=p.getCurrentPage();this.currentPageNameEl.textContent=r?r.name:"None"}}handleAddPage(){p.addPage()}handlePageReorder(e,n,o,i){if(e===n)return;const r=i.getBoundingClientRect(),s=r.top+r.height/2;let a=n;o>=s&&a++,e<a&&a--,e!==a&&p.reorderPage(e,a)}handlePaletteClick(e){b.log("Sidebar: handlePaletteClick",e.target);const n=e.target.closest(".item[data-widget-type]");if(!n){b.log("Sidebar: No item found");return}const o=n.getAttribute("data-widget-type");b.log("Sidebar: Creating widget of type",o);try{const i=$.createWidget(o);b.log("Sidebar: Widget created",i),p.addWidget(i),b.log("Sidebar: Widget added to state"),this.app&&this.app.canvas&&(this.app.canvas.suppressNextFocus=!0)}catch(i){b.error("Sidebar: Error creating/adding widget",i)}}openPageSettings(e){if(this.app&&this.app.pageSettings)this.app.pageSettings.open(e);else{b.error("Sidebar: PageSettings instance not found on injected app reference");const n=document.getElementById("pageSettingsModal");n&&(n.classList.remove("hidden"),n.style.display="flex")}}handlePageDelete(e,n){co(e,n)}handleClearPage(){po()}setupMobileToggles(){uo(this)}}const Pe=A,xe=p;function Oe(){return xe&&xe.deviceModel?xe.deviceModel:"reterminal_e1001"}function yn(){const t=Oe();return!!(Pe&&Pe[t]&&(Pe[t].features?.lcd||Pe[t].features?.oled))}function Ee(){const t=xe?.settings?.renderingMode||"direct",e=["black","white","red","yellow","gray"],n=["theme_auto","black","white","gray"],o=["black","white","red","green","blue","yellow","orange","gray","purple","cyan","magenta"],i=["theme_auto","black","white","gray","red","green","blue","yellow"];if(t==="oepl"||t==="opendisplay"){const a=(xe?.project?.protocolHardware||{}).colorMode||"bw";return a==="full_color"?o:a==="color_3"?e:n}if(yn())return o;const r=Oe();return r==="reterminal_e1002"||r==="esp32_s3_photopainter"?i:r.endsWith("bwr_yaml")?e:r.endsWith("fullcolor_yaml")?o:r.endsWith("primarycolor_yaml")?i:n}function vn(t){if(!t)return"#000000";if(t.startsWith("#"))return t;if(t.startsWith("0x"))return"#"+t.substring(2);switch(t.toLowerCase()){case"theme_auto":return $.getEffectiveDarkMode()?"#ffffff":"#000000";case"theme_auto_inverse":return $.getEffectiveDarkMode()?"#000000":"#ffffff";case"white":return"#ffffff";case"red":return"#ff0000";case"green":return"#00ff00";case"blue":return"#0000ff";case"yellow":return"#ffff00";case"orange":return"#ffa500";case"gray":return"#a0a0a0";case"transparent":return"transparent";case"black":default:return"#000000"}}function ho(t,e,n,o){const i=e.match(/^(\d+)x(\d+)$/);if(!i)return;const r=parseInt(i[1],10),s=parseInt(i[2],10),a=document.createElement("div");a.className="lvgl-grid-overlay",a.style.cssText=`
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    display: grid;
    grid-template-rows: repeat(${r}, 1fr);
    grid-template-columns: repeat(${s}, 1fr);
    pointer-events: none;
    z-index: 1;
    `;const l=o?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)",c=o?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.25)";for(let d=0;d<r;d++)for(let u=0;u<s;u++){const f=document.createElement("div");f.style.cssText=`border: 1px dashed ${l}; position: relative; box-sizing: border-box;`;const h=document.createElement("span");h.textContent=`${d},${u}`,h.style.cssText=`position: absolute; top: 2px; left: 4px; font-size: 8px; color: ${c}; pointer-events: none;`,f.appendChild(h),a.appendChild(f)}t.appendChild(a)}function go(t){["tl","tc","tr","rc","br","bc","bl","lc"].forEach(n=>{const o=document.createElement("div");o.className=`widget-resize-handle handle-${n}`,o.dataset.handle=n,t.appendChild(o)})}function bn(t){const e=p.selectedWidgetIds,n=t.canvas.querySelector(`.artboard-wrapper[data-index="${p.currentPageIndex}"]`),o=n?n.querySelector(".artboard"):null;let i=t.canvas.querySelector(".context-toolbar");if(e.length===0||t.dragState||t.lassoState||!o){i&&i.remove();return}const r=p.getSelectedWidgets();if(r.length===0||!n||!o){i&&i.remove();return}let s=1/0,a=1/0,l=-1/0,c=-1/0;r.forEach(g=>{s=Math.min(s,g.x),a=Math.min(a,g.y),l=Math.max(l,g.x+(g.width||0)),c=Math.max(c,g.y+(g.height||0))});const d=s,f=o.offsetTop+a-45;i?i.parentElement!==n&&n.appendChild(i):(i=document.createElement("div"),i.className="context-toolbar",n.appendChild(i)),i.style.left=d+"px",i.style.top=f+"px",i.innerHTML="",e.length>1&&([{icon:"mdi-align-horizontal-left",title:"Align Left",action:"left"},{icon:"mdi-align-horizontal-center",title:"Align Center",action:"center"},{icon:"mdi-align-horizontal-right",title:"Align Right",action:"right"},{separator:!0},{icon:"mdi-align-vertical-top",title:"Align Top",action:"top"},{icon:"mdi-align-vertical-center",title:"Align Middle",action:"middle"},{icon:"mdi-align-vertical-bottom",title:"Align Bottom",action:"bottom"}].forEach(y=>{if(y.separator){Te(i);return}fe(i,y.icon||"",y.title||"",()=>p.alignSelectedWidgets(y.action||""))}),e.length>=3&&(Te(i),fe(i,"mdi-distribute-horizontal-center","Distribute Horizontally",()=>p.distributeSelectedWidgets("horizontal")),fe(i,"mdi-distribute-vertical-center","Distribute Vertically",()=>p.distributeSelectedWidgets("vertical")))),r.some(g=>g.type==="group"||g.parentId)?(i.children.length>0&&Te(i),fe(i,"mdi-ungroup","Ungroup (Ctrl+Shift+G)",()=>p.ungroupSelection())):e.length>1&&(i.children.length>0&&Te(i),fe(i,"mdi-group","Group Selection (Ctrl+G)",()=>p.groupSelection())),i.children.length===0&&i.remove()}function fe(t,e,n,o){const i=document.createElement("button");i.className="btn-icon",i.title=n,i.innerHTML=`<i class="mdi ${e}"></i>`,i.onclick=r=>{r.stopPropagation(),o()},t.appendChild(i)}function Te(t){if(!t.lastElementChild||t.lastElementChild.classList.contains("separator"))return;const e=document.createElement("div");e.className="separator",t.appendChild(e)}function pe(t,e,n){const o=document.createElement("button");return o.className="artboard-btn",o.title=e,o.innerHTML=`<i class="mdi ${t}"></i>`,o.onclick=i=>{i.stopPropagation(),n()},o}function Ht({title:t,message:e,confirmLabel:n,confirmClass:o,onConfirm:i}){const r=document.createElement("div");r.className="modal-backdrop",r.style.display="flex",r.innerHTML=`
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
            <button class="btn ${o} confirm-btn btn-xs" style="border-radius: 6px;">${n||"Confirm"}</button>
        </div>
    </div>
    `,U(r);const s=r.querySelector(".close-btn"),a=r.querySelector(".confirm-btn"),l=s,c=a;l.onclick=()=>r.remove(),c.onclick=()=>{i(),r.remove()}}function mo(t,e,n){const o=document.createElement("div");o.className="debug-grid-overlay",t.appendChild(o)}function _n(t,e,n){if(!t||typeof n!="function")return;const o=t[e];o&&cancelAnimationFrame(o),t[e]=requestAnimationFrame(()=>{t[e]=0,n()})}function xn(t){const e=t?.dark_mode;return e==="dark"?!0:e==="light"?!1:!!p.settings.darkMode}function be(){const t=p.getCurrentPage();return t?xn(t):!1}function Q(t){const e=p.zoomLevel,n=p.settings;t.canvasContainer&&(t.canvasContainer.style.transform=`translate(${t.panX}px, ${t.panY}px) scale(${e})`,t.canvasContainer.style.transformOrigin="0 0");const o=(n.grid_opacity!==void 0?Number(n.grid_opacity):8)/100;document.documentElement.style.setProperty("--grid-opacity",o.toString());const i=document.getElementById("zoomLevel");i&&(i.textContent=Math.round(e*100)+"%")}function Be(t,e,n=!0,o=!1){_n(t,"_focusPageRaf",()=>{const r=t.canvas.querySelectorAll(".artboard-wrapper")[e];if(!r)return;const s=t.viewport.getBoundingClientRect(),a=s.width,l=s.height;if(a===0||l===0){Be(t,e,n,o);return}if(o){const h=yo(t,e);p.setZoomLevel(h)}const c=p.zoomLevel,d=r,u=d.offsetLeft+d.offsetWidth/2,f=d.offsetTop+d.offsetHeight/2;t.panX=a/2-u*c,t.panY=l/2-f*c,Q(t)})}function fo(t,e=!0){_n(t,"_zoomToFitAllRaf",()=>{const n=t.canvas.querySelectorAll(".artboard-wrapper");if(n.length===0)return;let o=1/0,i=1/0,r=-1/0,s=-1/0;n.forEach(_=>{const x=_,I=x.offsetLeft,C=x.offsetTop,S=x.offsetWidth,w=x.offsetHeight;o=Math.min(o,I),i=Math.min(i,C),r=Math.max(r,I+S),s=Math.max(s,C+w)});const a=t.viewport.getBoundingClientRect(),l=a.width,c=a.height;if(l===0||c===0)return;const d=80,u=r-o+d,f=s-i+d,h=l/u,g=c/f;let y=Math.min(h,g);y=Math.max(.05,Math.min(2,y)),p.setZoomLevel(y);const v=o+(r-o)/2,m=i+(s-i)/2;t.panX=l/2-v*y,t.panY=c/2-m*y,Q(t)})}function yo(t,e=p.currentPageIndex){const o=t.canvas.querySelectorAll(".artboard-wrapper")[e];if(!o)return 1;const i=t.viewport.getBoundingClientRect(),r=64,s=o,a=s.offsetWidth+r,l=s.offsetHeight+r,c=i.width/a,d=i.height/l,u=Math.min(c,d),f=Math.min(i.width,i.height),h=Math.max(.15,Math.min(1,f/800));return Math.max(h,Math.min(4,u))}function vo(t,e,n=!1){if(!e||!e.id)return;const o=t.canvas.querySelector(`.widget[data-id="${e.id}"]`);if(o){const i=o;i.style.left=e.x+"px",i.style.top=e.y+"px",i.style.width=e.width+"px",i.style.height=e.height+"px";const r=(e.type||"").toLowerCase(),s=j?j.get(r):null;if(r==="group")o.classList.add("widget-group");else if(!n&&s&&s.render)try{const a=h=>h==="theme_auto"?be()?"#ffffff":"#000000":h==="theme_auto_inverse"?be()?"#000000":"#ffffff":h?vn(h):be()?"#ffffff":"#000000",l=p.selectedWidgetIds.includes(e.id),c=p.settings.device_model||"reterminal_e1001",d=A,u=d?d[c]:null;s.render(o,e,{getColorStyle:a,selected:l,profile:u,isDark:be()});const f=e.props?.opacity;f!==void 0&&f<100?o.style.opacity=String(f/100):o.style.opacity=""}catch{}}}function se(t){if(!t.canvas)return;const e=t.app,n=p.pages,o=p.getCanvasDimensions();t.canvas.querySelectorAll(".snap-guide");const i=t.canvas.querySelector(".lasso-selection"),r=document.createDocumentFragment();t.canvas.innerHTML="",p.settings.editor_light_mode?t.canvas.classList.add("light-mode"):t.canvas.classList.remove("light-mode"),be()?t.viewport&&t.viewport.classList.add("device-dark-mode"):t.viewport&&t.viewport.classList.remove("device-dark-mode"),n.forEach((c,d)=>{const u=o.width,f=o.height,h=document.createElement("div");h.className="artboard-wrapper",h.dataset.index=String(d),d===p.currentPageIndex&&h.classList.add("active-page");const g=document.createElement("div");g.className="artboard-header",g.appendChild(pe("mdi-cog-outline","Page Settings",()=>{e&&e.pageSettings&&e.pageSettings.open(d)}));const y=document.createElement("span");y.className="artboard-name",y.textContent=c.name||`Page ${d+1} `,g.appendChild(y);const v=document.createElement("div");v.className="artboard-actions",d>0&&v.appendChild(pe("mdi-chevron-left","Move Left",()=>{p.reorderPage(d,d-1)})),d<n.length-1&&v.appendChild(pe("mdi-chevron-right","Move Right",()=>{p.reorderPage(d,d+1)})),v.appendChild(pe("mdi-plus","Add Page After",()=>{p.addPage(d+1)})),v.appendChild(pe("mdi-eraser","Clear Current Page",()=>{Ht({title:"Clear Page",message:`Are you sure you want to clear all widgets from < b > "${c.name||`Page ${d+1}`}"</b >? <br><br>This cannot be undone.`,confirmLabel:"Clear Page",confirmClass:"btn-danger",onConfirm:()=>{p.setCurrentPageIndex(d),p.clearCurrentPage()}})})),v.appendChild(pe("mdi-delete-outline","Delete Page",()=>{Ht({title:"Delete Page",message:`Are you sure you want to delete the page <b>"${c.name||`Page ${d+1}`}"</b>?<br><br>All widgets on this page will be lost.`,confirmLabel:"Delete Page",confirmClass:"btn-danger",onConfirm:()=>{p.deletePage(d)}})})),g.appendChild(v);const m=document.createElement("div");m.className="artboard-header-container",m.style.width=u+"px",m.appendChild(g);const _=320;if(u<_){const w=u/_;g.style.width=_+"px",g.style.transform=`scale(${w})`,g.style.transformOrigin="top left",m.style.height=40*w+"px"}else g.style.width="100%",g.style.transform="none",m.style.height="auto";h.appendChild(m);const x=p.getCanvasShape(),I=x==="round"||x==="circle",C=document.createElement("div");C.className="artboard",C.dataset.index=String(d),C.style.width=`${u}px`,C.style.height=`${f}px`;const S=xn(c);if(C.classList.toggle("dark",S),C.classList.toggle("round-display",I),p.showGrid){const w=document.createElement("div");w.className="canvas-grid",C.appendChild(w)}p.showDebugGrid&&mo(C),c.layout&&/^\d+x\d+$/.test(c.layout)&&ho(C,c.layout,o,S);for(const w of c.widgets){const k=document.createElement("div");k.className="widget",k.style.left=String(w.x)+"px",k.style.top=String(w.y)+"px",k.style.width=String(w.width)+"px",k.style.height=String(w.height)+"px",k.dataset.id=w.id,k.dataset.pageIndex=String(d),p.selectedWidgetIds.includes(w.id)&&k.classList.add("active"),w.locked&&k.classList.add("locked"),w.hidden&&k.classList.add("hidden-widget");const M=(w.type||"").toLowerCase(),F=j.get(M);if(M==="group")k.classList.add("widget-group"),k.innerHTML="";else if(F&&F.render)try{const O=ze=>{if(ze==="theme_auto")return S?"#ffffff":"#000000";if(ze==="theme_auto_inverse")return S?"#000000":"#ffffff";const Ct=ze;return Ct?vn(Ct):S?"#ffffff":"#000000"},q=p.selectedWidgetIds.includes(w.id),ke=p.settings.device_model||"reterminal_e1001",Et=A&&ke in A?A[ke]:null;F.render(k,w,{getColorStyle:O,selected:q,profile:Et,isDark:S});const Fe=w.props?.opacity;Fe!==void 0&&Fe<100&&(k.style.opacity=String(Fe/100))}catch{k.textContent=`Error: ${M}`,k.style.border="2px solid red"}else k.innerText=`Missing: ${M}`,k.style.color="red",k.style.border="1px dashed red";M!=="group"&&go(k),C.appendChild(k)}h.appendChild(C),r.appendChild(h)});const s=document.createElement("div");s.className="add-page-placeholder",s.title="Click to add a new page",s.style.width=`${o.width}px`,s.style.height=`${o.height}px`,s.style.marginTop="32px",s.style.position="relative",s.style.zIndex="2000",s.style.pointerEvents="auto",s.innerHTML=`
    <div class="plus-icon">+</div>
    <div class="label">Add Page</div>
    `;const a=p.getCanvasShape();(a==="round"||a==="circle")&&s.classList.add("round-display");const l=c=>{if(b.log("[Canvas] Add Page placeholder clicked"),c.stopPropagation(),c.preventDefault(),p.addPage()){const u=p.pages.length-1;e&&e.canvas&&(e.canvas.suppressNextFocus=!0),p.setCurrentPageIndex(u)}};s.addEventListener("mousedown",c=>c.stopPropagation()),s.addEventListener("click",l),r.appendChild(s),i&&r.appendChild(i),t.canvas.appendChild(r),bn(t)}class bo{constructor(e){this.canvasInstance=e,this.topRuler=document.getElementById("rulerTop"),this.leftRuler=document.getElementById("rulerLeft"),this.container=document.querySelector(".canvas-rulers"),this.viewport=e.viewport,this.topCtx=null,this.leftCtx=null,this.indicators=null,this.init()}init(){!this.topRuler||!this.leftRuler||(this.topCtx=this.createRulerCanvas(this.topRuler),this.leftCtx=this.createRulerCanvas(this.leftRuler),this.update())}createRulerCanvas(e){const n=document.createElement("canvas");return e.appendChild(n),n.getContext("2d")}setIndicators(e){this.indicators=e,this.update()}update(){if(!p.showRulers){this.container&&(this.container.style.display="none"),this.viewport&&this.viewport.classList.remove("with-rulers");return}this.container&&(this.container.style.display="block"),this.viewport&&this.viewport.classList.add("with-rulers");const e=document.querySelector(".artboard-wrapper.active-page .artboard");if(!e||!this.topRuler||!this.leftRuler)return;const n=this.topRuler.getBoundingClientRect(),o=this.leftRuler.getBoundingClientRect(),i=e.getBoundingClientRect(),r=p.zoomLevel;this.drawHorizontal(n,i,r),this.drawVertical(o,i,r)}drawHorizontal(e,n,o){const i=this.topCtx;if(!i)return;const r=i.canvas,s=It();(r.width!==e.width*s||r.height!==e.height*s)&&(r.width=e.width*s,r.height=e.height*s,i.scale(s,s),r.style.width=e.width+"px",r.style.height=e.height+"px"),i.clearRect(0,0,e.width,e.height);const a=n.left-e.left;if(this.indicators){const d=a+this.indicators.x*o,u=(this.indicators.w||0)*o;i.fillStyle="hsla(var(--accent-h), 85%, 65%, 0.15)",i.fillRect(d,0,u,e.height),i.fillStyle="var(--accent)",i.fillRect(d,e.height-2,u,2)}i.strokeStyle="#4b5563",i.fillStyle="#9ca3af",i.font='9px "JetBrains Mono", monospace',i.lineWidth=1;const l=Math.floor(-a/o/10)*10,c=Math.ceil((e.width-a)/o/10)*10;for(let d=l;d<=c;d+=10){const u=a+d*o;if(u<0||u>e.width)continue;const f=d%100===0,h=d%50===0,g=f?12:h?8:4;i.beginPath(),i.moveTo(u,e.height),i.lineTo(u,e.height-g),i.stroke(),f&&i.fillText(d.toString(),u+2,10)}}drawVertical(e,n,o){const i=this.leftCtx;if(!i)return;const r=i.canvas,s=It();(r.width!==e.width*s||r.height!==e.height*s)&&(r.width=e.width*s,r.height=e.height*s,i.scale(s,s),r.style.width=e.width+"px",r.style.height=e.height+"px"),i.clearRect(0,0,e.width,e.height);const a=n.top-e.top;if(this.indicators){const d=a+this.indicators.y*o,u=(this.indicators.h||0)*o;i.fillStyle="hsla(var(--accent-h), 85%, 65%, 0.15)",i.fillRect(0,d,e.width,u),i.fillStyle="var(--accent)",i.fillRect(e.width-2,d,2,u)}i.strokeStyle="#4b5563",i.fillStyle="#9ca3af",i.font='9px "JetBrains Mono", monospace',i.lineWidth=1;const l=Math.floor(-a/o/10)*10,c=Math.ceil((e.height-a)/o/10)*10;for(let d=l;d<=c;d+=10){const u=a+d*o;if(u<0||u>e.height)continue;const f=d%100===0,h=d%50===0,g=f?12:h?8:4;i.beginPath(),i.moveTo(e.width,u),i.lineTo(e.width-g,u),i.stroke(),f&&(i.save(),i.translate(10,u+2),i.rotate(-Math.PI/2),i.fillText(d.toString(),0,0),i.restore())}}}function _o(t){t.viewport&&(t.viewport.addEventListener("dragenter",e=>{t.dragState||(t.isExternalDragging=!0)}),t.viewport.addEventListener("dragover",e=>{e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect="copy"),t.dragState||(t.isExternalDragging=!0);const o=e.target.closest(".artboard-wrapper");document.querySelectorAll(".artboard-wrapper.drag-over").forEach(r=>{r!==o&&r.classList.remove("drag-over")}),o&&o.classList.add("drag-over");const i=e.target.closest(".add-page-placeholder");if(i)i.classList.add("drag-over");else{const r=document.querySelector(".add-page-placeholder.drag-over");r&&r.classList.remove("drag-over")}}),t.viewport.addEventListener("dragleave",e=>{(e.relatedTarget===null||!t.viewport.contains(e.relatedTarget))&&(t.isExternalDragging=!1,document.querySelectorAll(".artboard-wrapper.drag-over, .add-page-placeholder.drag-over").forEach(n=>{n.classList.remove("drag-over")}))}),t.viewport.addEventListener("drop",async e=>{e.preventDefault(),e.stopPropagation(),t.isExternalDragging=!1,document.querySelectorAll(".artboard-wrapper.drag-over, .add-page-placeholder.drag-over").forEach(u=>{u.classList.remove("drag-over")});const n=e.dataTransfer;if(!n)return;const o=n.getData("application/widget-type")||n.getData("text/plain");if(!o)return;const i=e.clientX,r=e.clientY;let s=e.target;s===t.viewport&&(s=document.elementFromPoint(i,r));const a=s instanceof HTMLElement?s.closest(".artboard-wrapper"):null,l=s instanceof HTMLElement?s.closest(".add-page-placeholder"):null;let c=-1,d=null;if(a instanceof HTMLElement){c=parseInt(a.dataset.index||"-1",10);const u=a.querySelector(".artboard");u&&(d=u.getBoundingClientRect())}else if(l instanceof HTMLElement)c=p.pages.length;else{c=p.currentPageIndex;const u=t.canvas.querySelector(`.artboard[data-index="${c}"]`);u&&(d=u.getBoundingClientRect())}b.log("[Canvas] Atomic drop capture - type:",o,"page:",c);try{const u=j.load(o);if(l){if(!p.addPage())return;c=p.pages.length-1,await new Promise(m=>setTimeout(m,50));const v=t.canvas.querySelector(`.artboard[data-index="${c}"]`);v&&(d=v.getBoundingClientRect())}await u;const f=$.createWidget(o);if(!f){b.error("[Canvas] WidgetFactory.createWidget returned null for type:",o);return}const h=p.zoomLevel,g=p.getCanvasDimensions();if(d){const y=(i-d.left)/h,v=(r-d.top)/h;f.x=Math.round(y-f.width/2),f.y=Math.round(v-f.height/2)}else b.warn("[Canvas] No targetRect, using fallback position"),f.x=40,f.y=40;f.x=Math.max(0,Math.min(g.width-f.width,f.x)),f.y=Math.max(0,Math.min(g.height-f.height,f.y)),t.suppressNextFocus=!0,p.addWidget(f,c),p.currentPageIndex!==c&&p.setCurrentPageIndex(c),p.selectWidget(f.id,!1),b.log(`[Canvas] Successfully added ${o} at (${f.x}, ${f.y})`)}catch(u){b.error("[Canvas] error creating widget from drop:",u)}}))}function xo(t){t.viewport&&t.viewport.addEventListener("mousedown",e=>{if(e.button===1){e.preventDefault(),e.stopPropagation(),t.panState={startX:e.clientX,startY:e.clientY,startPanX:t.panX,startPanY:t.panY},t.viewport.style.cursor="grabbing",document.body.classList.add("panning-active");const n=i=>{if(t.panState){const r=i.clientX-t.panState.startX,s=i.clientY-t.panState.startY;t.panX=t.panState.startPanX+r,t.panY=t.panState.startPanY+s,Q(t)}},o=()=>{t.panState=null,t.viewport.style.cursor="auto",document.body.classList.remove("panning-active"),z("mousemove",n),z("mouseup",o)};D("mousemove",n),D("mouseup",o)}})}function wo(t){const e=document.getElementById("zoomInBtn"),n=document.getElementById("zoomOutBtn"),o=document.getElementById("zoomResetBtn"),i=document.getElementById("gridToggleBtn"),r=document.getElementById("debugGridToggleBtn"),s=document.getElementById("rulersToggleBtn"),a=document.getElementById("editorGridOpacity");e&&e.addEventListener("click",()=>ot(t)),n&&n.addEventListener("click",()=>rt(t)),o&&o.addEventListener("click",()=>De(t)),i&&(i.classList.toggle("active",!!p.showGrid),i.addEventListener("click",()=>{const l=!p.showGrid;p.setShowGrid(l),l&&(p.setShowDebugGrid(!1),r&&r.classList.remove("active")),i.classList.toggle("active",l),L(E.STATE_CHANGED)})),r&&(r.classList.toggle("active",!!p.showDebugGrid),r.addEventListener("click",()=>{const l=!p.showDebugGrid;p.setShowDebugGrid(l),l&&(p.setShowGrid(!1),i&&i.classList.remove("active")),r.classList.toggle("active",l),L(E.STATE_CHANGED)})),s&&(s.classList.toggle("active",!!p.showRulers),s.addEventListener("click",()=>{const l=!p.showRulers;p.setShowRulers(l),s.classList.toggle("active",l),b.log(`[Canvas] Rulers toggled: ${l}`)})),a&&a.addEventListener("input",l=>{const c=l.target;p.updateSettings({grid_opacity:parseInt(c.value,10)})}),t.canvasContainer&&t.canvasContainer.addEventListener("wheel",l=>{l.preventDefault(),Gt(l,t)},{passive:!1}),t.viewport&&t.viewport.addEventListener("wheel",l=>{l.preventDefault(),Gt(l,t)},{passive:!1}),document.addEventListener("keydown",l=>{l.ctrlKey&&(l.key==="+"||l.key==="=")?(l.preventDefault(),ot(t)):l.ctrlKey&&l.key==="-"?(l.preventDefault(),rt(t)):l.ctrlKey&&l.key==="0"||l.ctrlKey&&l.key.toLowerCase()==="r"?(l.preventDefault(),De(t)):l.ctrlKey&&l.key.toLowerCase()==="g"&&(l.preventDefault(),l.shiftKey?p.ungroupSelection():p.groupSelection())})}function Gt(t,e){const n=p.zoomLevel;let o=0;if(t.ctrlKey)o=t.deltaY>0?-.02:.02;else if(t.deltaMode===0&&t.deltaX===0&&Math.abs(t.deltaY)>=50)o=t.deltaY>0?-.05:.05;else{e.panX-=t.deltaX,e.panY-=t.deltaY,Q(e);return}if(o===0)return;const i=Math.min(Math.max(n+o,.1),5);if(i===n)return;const r=e.viewport.getBoundingClientRect(),s=t.clientX-r.left,a=t.clientY-r.top,l=(s-e.panX)/n,c=(a-e.panY)/n;e.panX=s-l*i,e.panY=a-c*i,p.setZoomLevel(i),Q(e)}function ot(t){wn(.05,t)}function rt(t){wn(-.05,t)}function wn(t,e){const n=p.zoomLevel,o=Math.min(Math.max(n+t,.1),5);if(o!==n){if(e&&e.viewport){const i=e.viewport.getBoundingClientRect(),r=i.width/2,s=i.height/2,a=(r-e.panX)/n,l=(s-e.panY)/n;e.panX=r-a*o,e.panY=s-l*o}p.setZoomLevel(o),e&&Q(e)}}function De(t){p.setZoomLevel(1),t.focusPage(p.currentPageIndex,!0)}function Z(){document.querySelectorAll(".snap-guide").forEach(e=>e.remove())}function Sn(t,e,n){const o=n||(t?t.canvas:null);if(!o||typeof o.appendChild!="function")return;const i=document.createElement("div");i.className="snap-guide snap-guide-vertical",i.style.left=`${Math.round(e)}px`,o.appendChild(i)}function En(t,e,n){const o=n||(t?t.canvas:null);if(!o||typeof o.appendChild!="function")return;const i=document.createElement("div");i.className="snap-guide snap-guide-horizontal",i.style.top=`${Math.round(e)}px`,o.appendChild(i)}function Cn(t,e){const n=p.getCurrentPage(),o=[],i=[];if(o.push(0,e.width/2,e.width),i.push(0,e.height/2,e.height),n&&Array.isArray(n.widgets))for(const r of n.widgets){if(!r||r.id===t)continue;const s=r.x,a=r.x+(r.width||0),l=r.y,c=r.y+(r.height||0),d=s+(r.width||0)/2,u=l+(r.height||0)/2;o.push(s,d,a),i.push(l,u,c)}return{vertical:o,horizontal:i}}function Rt(t,e,n,o,i){const r=i||(t?t.canvas:null);if(!r)return;const s=document.createElement("div");s.className=`snap-guide distance-marker distance-marker-${o}`;let a,l,c,d,u;if(o==="h"){const h=e.x<n.x?e.x+e.w:n.x+n.w,g=e.x<n.x?n.x:e.x;if(a=h,l=Math.min(e.y+e.h/2,n.y+n.h/2),c=g-h,c<=0)return;u=Math.round(c),s.style.left=`${a}px`,s.style.top=`${l}px`,s.style.width=`${c}px`,s.style.height="1px";const y=document.createElement("div");y.className="distance-marker-h-tick-start";const v=document.createElement("div");v.className="distance-marker-h-tick-end",s.appendChild(y),s.appendChild(v)}else{const h=e.y<n.y?e.y+e.h:n.y+n.h,g=e.y<n.y?n.y:e.y;if(l=h,a=Math.min(e.x+e.w/2,n.x+n.w/2),d=g-h,d<=0)return;u=Math.round(d),s.style.left=`${a}px`,s.style.top=`${l}px`,s.style.width="1px",s.style.height=`${d}px`;const y=document.createElement("div");y.className="distance-marker-v-tick-start";const v=document.createElement("div");v.className="distance-marker-v-tick-end",s.appendChild(y),s.appendChild(v)}const f=document.createElement("div");f.className="distance-marker-label",f.textContent=String(u),s.appendChild(f),r.appendChild(s)}function mt(t,e,n,o,i,r,s,a=!1){if(!p.snapEnabled||i)return Z(),{x:Math.round(n),y:Math.round(o)};const d=(p.getCurrentPage()?.widgets||[]).filter(w=>w.id!==e.id&&!w.hidden),u=Cn(e.id,r),f=e.width||0,h=e.height||0;let g=n,y=o,v=null,m=null;const _=[{val:n,apply:w=>g=w},{val:n+f/2,apply:w=>g=w-f/2},{val:n+f,apply:w=>g=w-f}];let x=re+1;for(const w of _)for(const k of u.vertical){const M=Math.abs(w.val-k);M<=re&&M<x&&(x=M,v=k,w.apply(k))}const I=[{val:o,apply:w=>y=w},{val:o+h/2,apply:w=>y=w-h/2},{val:o+h,apply:w=>y=w-h}];let C=re+1;for(const w of I)for(const k of u.horizontal){const M=Math.abs(w.val-k);M<=re&&M<C&&(C=M,m=k,w.apply(k))}const S={x:g,y,w:f,h};return Z(),v!=null&&Sn(t,v,s),m!=null&&En(t,m,s),a&&d.forEach(w=>{const k={x:w.x,y:w.y,w:w.width,h:w.height};if(S.y<k.y+k.h&&S.y+S.h>k.y){const O=S.x<k.x?k.x-(S.x+S.w):S.x-(k.x+k.w);O>0&&O<150&&Rt(t,S,k,"h",s)}if(S.x<k.x+k.w&&S.x+S.w>k.x){const O=S.y<k.y?k.y-(S.y+S.h):S.y-(k.y+k.h);O>0&&O<150&&Rt(t,S,k,"v",s)}}),{x:Math.round(g),y:Math.round(y)}}function ft(t,e,n,o,i,r){const s=i.match(/^(\d+)x(\d+)$/);if(!s)return{x:t,y:e};const a=parseInt(s[1],10),l=parseInt(s[2],10),c=r.width/l,d=r.height/a,u=t+n/2,f=e+o/2,h=Math.round(u/c-.5),g=Math.round(f/d-.5),y=Math.max(0,Math.min(l-1,h)),v=Math.max(0,Math.min(a-1,g));return{x:Math.round(y*c),y:Math.round(v*d)}}function kn(t){const e=p.getCurrentPage();if(!e||!e.layout)return;const n=e.layout.match(/^(\d+)x(\d+)$/);if(!n)return;const o=p.getWidgetById(t);if(!o)return;const i=parseInt(n[1],10),r=parseInt(n[2],10),s=p.getCanvasDimensions(),a=s.width/r,l=s.height/i,c=o.x+o.width/2,d=o.y+o.height/2,u=Math.floor(c/a),f=Math.floor(d/l),h=Math.max(0,Math.min(i-1,f)),g=Math.max(0,Math.min(r-1,u)),y={...o.props,grid_cell_row_pos:h,grid_cell_column_pos:g},v=Math.max(1,Math.round(o.height/l)),m=Math.max(1,Math.round(o.width/a));y.grid_cell_row_span=v,y.grid_cell_column_span=m,p.updateWidget(t,{props:y})}function So(t){const e=p.getWidgetById(t);if(!e)return;const n=p.getCanvasDimensions(),o=p.getCurrentPage();let i;if(o?.layout)i=ft(e.x,e.y,e.width,e.height,o.layout,n);else{const r=p.snapEnabled;typeof p.setSnapEnabled=="function"&&p.setSnapEnabled(!0),i=mt({canvas:{querySelectorAll:()=>[]},canvasContainer:document.createElement("div")},e,e.x,e.y,!1,n),typeof p.setSnapEnabled=="function"&&p.setSnapEnabled(r)}i&&(p.updateWidget(t,{x:i.x,y:i.y}),kn(t),p.recordHistory())}function Me(t,e,n,o,i,r){if(!p.snapEnabled||o)return t;const s=Cn(n,i),a=e==="v"?s.vertical:s.horizontal;let l=re+1,c=t,d=null;for(const u of a){const f=Math.abs(t-u);f<=re&&f<l&&(l=f,c=u,d=u)}return d!==null&&(e==="v"?Sn({canvas:r},d,r):En({canvas:r},d,r)),c}class Eo{constructor(){this.active=!1,this.element=null,this.targetWidgetId=null,this.position={x:0,y:0},this.init()}init(){this.element||(this.element=document.createElement("div"),this.element.className="radial-menu",this.element.innerHTML=`
                <div class="radial-menu-center"></div>
                <div class="radial-menu-items"></div>
            `,U(this.element),D("mousedown",e=>{this.active&&e.target instanceof Node&&!this.element.contains(e.target)&&this.hide()},!0),D("touchstart",e=>{this.active&&e.target instanceof Node&&!this.element.contains(e.target)&&this.hide()},!0),document.addEventListener("contextmenu",e=>{!this.active||!(e.target instanceof HTMLElement)||this.element.contains(e.target)||e.target.closest("#canvas")||this.hide()},!0),D("keydown",e=>{e.key==="Escape"&&this.active&&this.hide()}))}show(e,n,o=null){this.targetWidgetId=o,this.position={x:e,y:n},this.active=!0,this.element.style.left=`${e}px`,this.element.style.top=`${n}px`,this.renderItems(),requestAnimationFrame(()=>{this.element.classList.add("active")})}hide(){this.active=!1,this.element.classList.remove("active"),this.targetWidgetId=null}renderItems(){const e=this.element.querySelector(".radial-menu-items");e.innerHTML="";const n=this.getAvailableActions(),o=2*Math.PI/n.length,i=70;n.forEach((r,s)=>{const a=s*o-Math.PI/2,l=Math.cos(a)*i,c=Math.sin(a)*i,d=document.createElement("div");d.className=`radial-menu-item ${r.className||""}`,d.style.setProperty("--x",`${l}px`),d.style.setProperty("--y",`${c}px`),d.title=r.label,d.innerHTML=`<i class="mdi ${r.icon}"></i>`,d.addEventListener("click",u=>{u.stopPropagation(),r.callback(),this.hide()}),e.appendChild(d)})}getAvailableActions(){const e=p,n=this.targetWidgetId?e.getWidgetById(this.targetWidgetId):null,o=[];if(n){o.push({label:"Copy",icon:"mdi-content-copy",callback:()=>{e.selectWidget(this.targetWidgetId,!1),e.copyWidget()}});const i=e.selectedWidgetIds,r=i.some(l=>{const c=e.getWidgetById(l);return c&&(c.type==="group"||c.parentId)});i.length>1&&!r&&o.push({label:"Group",icon:"mdi-group",callback:()=>e.groupSelection()}),(n.type==="group"||n.parentId)&&o.push({label:"Ungroup",icon:"mdi-ungroup",callback:()=>e.ungroupSelection(this.targetWidgetId)}),o.push({label:"Duplicate",icon:"mdi-content-duplicate",callback:()=>{e.copyWidget(),e.pasteWidget()}}),o.push({label:n.locked?"Unlock":"Lock",icon:n.locked?"mdi-lock-open-outline":"mdi-lock-outline",callback:()=>{e.updateWidget(this.targetWidgetId,{locked:!n.locked})}}),o.push({label:"Snap",icon:"mdi-magnet",callback:()=>{So(this.targetWidgetId)}}),o.push({label:"Delete",icon:"mdi-delete-outline",className:"danger",callback:()=>{e.deleteWidget(this.targetWidgetId)}});const s=e.getCurrentPage(),a=s?.widgets.findIndex(l=>l.id===this.targetWidgetId);a!==-1&&(o.push({label:"Bring to Front",icon:"mdi-arrange-bring-to-front",callback:()=>{e.reorderWidget(e.currentPageIndex,a,s.widgets.length-1)}}),o.push({label:"Send to Back",icon:"mdi-arrange-send-to-back",callback:()=>{e.reorderWidget(e.currentPageIndex,a,0)}}))}else o.push({label:"Paste",icon:"mdi-content-paste",callback:()=>{e.pasteWidget()}});return o}}const J=new Eo;function Co(t,e,n,o,i,r){st(t);const s=document.createElement("div");s.className="drag-ghost-container",s.style.cssText=`
        position: fixed;
        pointer-events: none;
        z-index: 99999;
        opacity: 1.0; 
        transform-origin: top left;
        transform: scale(${i});
        transition: none;
    `;const a=t.dragState?.id,l=r.find(g=>g.id===a)||r[0],c=e.find(g=>g.id===l?.id)||e[0],d=document.querySelector(`.widget[data-id="${c.id}"]`);if(!c||!d)return;const u=[],f=p.getCurrentPage();e.forEach(g=>{if(u.push(g),g.type==="group"){const v=(f?.widgets||[]).filter(m=>m.parentId===g.id);u.push(...v)}}),u.map(g=>{const y=document.querySelector(`.widget[data-id="${g.id}"]`);if(!y)return null;const v=y.closest(".artboard"),m=Qn(y);return m?{widget:g,className:(v?v.className:"artboard")+" ghost-context-sim",attrs:Array.from(y.attributes).map(_=>({name:_.name,value:_.value})),styleCssText:y.style.cssText,innerHTML:y.innerHTML,background:m.background,backgroundColor:m.backgroundColor,border:m.border,borderRadius:m.borderRadius}:null}).filter(g=>g!==null).forEach(g=>{const y=document.createElement("div");y.className=g.className,y.style.cssText=`
                position: absolute;
                left: ${g.widget.x-c.x}px;
                top: ${g.widget.y-c.y}px;
                width: ${g.widget.width}px;
                height: ${g.widget.height}px;
                pointer-events: none;
                background: transparent !important;
                box-shadow: none !important;
                border: none !important;
                transform: none !important;
                overflow: visible;
                display: block;
            `;const v=document.createElement("div");g.attrs.forEach(m=>{v.setAttribute(m.name,m.value)}),v.classList.remove("active","dragging-source","locked"),v.classList.add("drag-ghost-widget"),v.style.cssText=g.styleCssText,v.style.position="absolute",v.style.top="0",v.style.left="0",v.style.margin="0",v.style.transform="none",v.style.setProperty("background",g.background,"important"),v.style.setProperty("background-color",g.backgroundColor,"important"),v.style.setProperty("border",g.border,"important"),v.style.setProperty("border-radius",g.borderRadius,"important"),v.innerHTML=g.innerHTML,y.appendChild(v),s.appendChild(y)}),l&&(t.dragGhostOffset={x:l.clickOffsetX*i,y:l.clickOffsetY*i}),U(s),t.dragGhostEl=s,ko(t,n,o),e.forEach(g=>{const y=document.querySelector(`.widget[data-id="${g.id}"]`);y&&y.classList.add("dragging-source")})}function ko(t,e,n){if(!t.dragGhostEl||!t.dragGhostOffset)return;const o=t.dragGhostOffset,i=e-o.x,r=n-o.y;t.dragGhostEl.style.left=i+"px",t.dragGhostEl.style.top=r+"px"}function Io(t,e,n){t.dragGhostEl&&(t.dragGhostEl.style.left=e+"px",t.dragGhostEl.style.top=n+"px")}function st(t){t.dragGhostEl&&(t.dragGhostEl.remove(),t.dragGhostEl=null,t.dragGhostOffset=null),document.querySelectorAll(".widget.dragging-source").forEach(e=>{e.classList.remove("dragging-source")})}function Lo(t,e,n,o){const i=t.canvas.querySelector(`.artboard-wrapper[data-index="${e}"]`);if(!i)return;const r=i.querySelector(".artboard-header");if(!r)return;const s=r.cloneNode(!0);s.classList.add("page-drag-ghost");const a=r.getBoundingClientRect(),l=n-a.left,c=o-a.top;s.style.cssText=`
        position: fixed;
        left: ${n}px;
        top: ${o}px;
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
    `,U(s),t.pageDragGhost=s,t.pageDragOffset={x:l,y:c},i.classList.add("reordering")}function Po(t,e,n){t.pageDragGhost&&(t.pageDragGhost.style.left=e+"px",t.pageDragGhost.style.top=n+"px")}function To(t,e){t.pageDragGhost&&(t.pageDragGhost.remove(),t.pageDragGhost=null);const n=t.canvas.querySelector(`.artboard-wrapper[data-index="${e}"]`);n&&n.classList.remove("reordering")}function Mo(t,e){const n=p.getWidgetById(e);if(!n)return;const o=(n.type||"").toLowerCase();if(o!=="text"&&o!=="label")return;const i=t.canvas.querySelector(`.widget[data-id="${e}"]`);if(!i)return;const r=p.zoomLevel,s=i.getBoundingClientRect(),a=Zn(),l=document.createElement("textarea");l.value=n.props.text||n.title||"",l.style.position="absolute",l.style.left=s.left+a.x+"px",l.style.top=s.top+a.y+"px",l.style.width=Math.max(50,s.width)+"px",l.style.height=Math.max(30,s.height)+"px",l.style.zIndex="99999";const c=n.props||{},d=(c.font_size||20)*r;l.style.fontSize=d+"px",l.style.fontFamily=(c.font_family||"Roboto")+", sans-serif",l.style.fontWeight=c.font_weight||400,l.style.fontStyle=c.italic?"italic":"normal",l.style.textAlign=(c.text_align||"LEFT").split("_").pop().toLowerCase(),l.style.color=c.color||"black",l.style.background="rgba(255, 255, 255, 0.9)",l.style.border="1px solid #1a73e8",l.style.padding="0px",l.style.resize="both",l.style.outline="none",l.style.overflow="hidden",l.style.lineHeight="1.2",document.body.appendChild(l),l.focus(),l.select();const u=()=>{if(!l.isConnected&&!l.parentElement)return;l.removeEventListener("blur",f),l.removeEventListener("keydown",h);const g=l.value;g!==(n.props.text||n.title)&&p.updateWidget(e,{props:{...n.props,text:g}}),l.remove()};function f(){u()}function h(g){g.key==="Enter"&&!g.shiftKey&&(g.preventDefault(),u()),g.key==="Escape"&&l.remove(),l.style.height=l.scrollHeight+"px"}l.addEventListener("blur",f),l.addEventListener("keydown",h)}function Ao(t,e){const n=p.zoomLevel,o=p.getCanvasDimensions();if(e.dragState){if(e.dragState.mode==="move"){const i=document.querySelector(`.artboard[data-index="${p.currentPageIndex}"]`);if(!i)return;const r=(t.clientX-e.dragState.dragStartX)/n+(e.dragState.dragStartPanX-e.panX)/n,s=(t.clientY-e.dragState.dragStartY)/n+(e.dragState.dragStartPanY-e.panY)/n,a=p.getWidgetById(e.dragState.id);if(!a)return;const l=e.dragState.widgets,c=l.find(_=>_.id===e.dragState.id);if(!c)return;let d=c.startX+r,u=c.startY+s;const f=p.getCurrentPage();if(f?.layout&&!t.altKey){Z();const _=ft(d,u,a.width,a.height,f.layout,o);d=_.x,u=_.y}else if(p.snapEnabled&&!t.altKey){const _=mt(e,a,d,u,t.altKey,o,i,t.ctrlKey);d=_.x,u=_.y}else Z();const h=i.getBoundingClientRect(),g=h.left+d*n,y=h.top+u*n;Io(e,g,y);const v=d-c.startX,m=u-c.startY;for(const _ of l){const x=p.getWidgetById(_.id);x&&!x.locked&&(x.x=_.startX+v,x.y=_.startY+m,x.type==="group"&&(f.widgets||[]).filter(S=>S.parentId===x.id).forEach(S=>{l.find(w=>w.id===S.id)||(S.x+=v-(e.dragState.lastDx||0),S.y+=m-(e.dragState.lastDy||0))}))}e.dragState.lastDx=v,e.dragState.lastDy=m,e.rulers&&e.rulers.setIndicators({x:d,y:u,w:a.width,h:a.height})}else if(e.dragState.mode==="resize"){const i=p.getWidgetById(e.dragState.id);if(!i)return;Z();const r=e.dragState,s=r.handle,a=(r.dragStartPanX-e.panX)/n,l=(r.dragStartPanY-e.panY)/n,c=(t.clientX-r.startX)/n+a,d=(t.clientY-r.startY)/n+l;let u=r.startWidgetX,f=r.startWidgetY,h=r.startW,g=r.startH;if(s.includes("l")){const m=r.startWidgetX+c;u=Me(m,"v",i.id,t.altKey,o,r.artboardEl),h=r.startWidgetX+r.startW-u}else if(s.includes("r")){const m=r.startWidgetX+r.startW+c;h=Me(m,"v",i.id,t.altKey,o,r.artboardEl)-r.startWidgetX}if(s.includes("t")){const m=r.startWidgetY+d;f=Me(m,"h",i.id,t.altKey,o,r.artboardEl),g=r.startWidgetY+r.startH-f}else if(s.includes("b")){const m=r.startWidgetY+r.startH+d;g=Me(m,"h",i.id,t.altKey,o,r.artboardEl)-r.startWidgetY}const y=4;isNaN(h)&&(h=r.startW),isNaN(g)&&(g=r.startH),h<y&&(s.includes("l")&&(u=r.startWidgetX+r.startW-y),h=y),g<y&&(s.includes("t")&&(f=r.startWidgetY+r.startH-y),g=y);const v=(i.type||"").toLowerCase();if(v==="line"||v==="lvgl_line"){const m=i.props||{},_=m.orientation||"horizontal",x=parseInt(m.stroke_width||m.line_width||3,10);_==="vertical"?(h=x,g=Math.max(10,g)):(g=x,h=Math.max(10,h))}if(u=Math.max(0,Math.min(o.width-h,u)),f=Math.max(0,Math.min(o.height-g,f)),i.x=Math.round(u),i.y=Math.round(f),i.width=Math.round(h),i.height=Math.round(g),v==="icon"||v==="weather_icon"||v==="battery_icon"||v==="wifi_signal"||v==="ondevice_temperature"||v==="ondevice_humidity"){const m=i.props||{};if(m.fit_icon_to_frame){const x=Math.max(8,Math.min(i.width-8,i.height-8));m.size=Math.round(x)}else{const _=Math.max(8,Math.min(i.width,i.height));m.size=Math.round(_)}}else if(v==="shape_circle"){const m=Math.max(i.width,i.height);i.width=m,i.height=m}vo(e,i),e.rulers&&e.rulers.setIndicators({x:i.x,y:i.y,w:i.width,h:i.height})}else if(e.dragState.mode==="reorder-page"){Po(e,t.clientX,t.clientY),document.querySelectorAll(".artboard-wrapper").forEach(s=>s.classList.remove("drag-over"));const i=document.elementFromPoint(t.clientX,t.clientY),r=i instanceof HTMLElement?i.closest(".artboard-wrapper"):null;r instanceof HTMLElement&&parseInt(r.dataset.index||"-1",10)!==e.dragState.pageIndex&&r.classList.add("drag-over")}}else if(e.lassoState){const i=e.lassoState.artboardEl;if(!i)return;const r=i.getBoundingClientRect(),s=(t.clientX-r.left)/n,a=(t.clientY-r.top)/n,l=Math.min(e.lassoState.startX,s),c=Math.min(e.lassoState.startY,a),d=Math.abs(s-e.lassoState.startX),u=Math.abs(a-e.lassoState.startY);e.lassoState.rect={x:l,y:c,w:d,h:u},e.lassoEl&&(e.lassoEl.style.left=l+"px",e.lassoEl.style.top=c+"px",e.lassoEl.style.width=d+"px",e.lassoEl.style.height=u+"px");const f=p.getCurrentPage();if(f){const h=new Set(e.lassoState.isAdditive?e.lassoState.initialSelection:[]);e.lassoState.currentSelection=[];const g={x1:l,y1:c,x2:l+d,y2:c+u};for(const y of f.widgets){const v={x1:y.x,y1:y.y,x2:y.x+y.width,y2:y.y+y.height},m=!(v.x2<g.x1||v.x1>g.x2||v.y2<g.y1||v.y1>g.y2),_=e.canvas.querySelector(`.widget[data-id="${y.id}"]`);_&&(m?(_.classList.add("active"),h.add(y.id)):e.lassoState.isAdditive&&e.lassoState.initialSelection.includes(y.id)?_.classList.add("active"):_.classList.remove("active"))}e.lassoState.currentSelection=Array.from(h),p.selectWidgets(e.lassoState.currentSelection)}t.preventDefault(),t.stopPropagation()}}function Do(t,e){if(e.dragState){const n=e.dragState.id,o=e.dragState.mode;if(o==="move"){const s=e.canvas.querySelector(`.widget[data-id="${n}"]`),a=s?s.style.pointerEvents:"";s&&(s.style.pointerEvents="none");const l=document.elementFromPoint(t.clientX,t.clientY);s&&(s.style.pointerEvents=a);const c=l?.closest(".artboard"),d=l?.closest(".add-page-placeholder"),u=p.currentPageIndex;let f=-1;if(c)f=parseInt(c.dataset.index||"0",10);else if(d){e.suppressNextFocus=!0;const h=p.pages.length;p.addPage(h)&&(f=h)}else{const h=l?.closest("#pageList .item");if(h){const g=document.getElementById("pageList");if(!g)return;f=Array.from(g.querySelectorAll(".item")).indexOf(h)}}if(f!==-1&&f!==u){const h=e.dragState.widgets;d&&se(e);const g=e.canvas.querySelector(`.artboard[data-index="${f}"]`);let y=0;z("mousemove",e._boundMouseMove),z("mouseup",e._boundMouseUp),st(e),e.dragState=null,Z();const v=g?g.getBoundingClientRect():null,m=p.zoomLevel,_=p.getCanvasDimensions(),x=new Set(h.map(C=>C.id));if(h.filter(C=>{const S=p.getWidgetById(C.id);return!S.parentId||!x.has(S.parentId)}).forEach(C=>{let S=C.startX,w=C.startY;if(v){const k=p.getWidgetById(C.id);S=Math.round((t.clientX-v.left)/m-C.clickOffsetX),w=Math.round((t.clientY-v.top)/m-C.clickOffsetY);const M=k?.width||50,F=k?.height||50;S=Math.max(0,Math.min(_.width-M,S)),w=Math.max(0,Math.min(_.height-F,w))}else d&&(S=40,w=40);p.moveWidgetToPage(C.id,f,S,w)&&y++}),y>0){const C=!c&&!d;p.setCurrentPageIndex(f,{suppressFocus:!C}),se(e);return}}}else if(o==="reorder-page"){const s=e.dragState.pageIndex,l=document.elementFromPoint(t.clientX,t.clientY)?.closest(".artboard-wrapper");if(To(e,s),document.querySelectorAll(".artboard-wrapper").forEach(c=>c.classList.remove("drag-over")),l){const c=parseInt(l.dataset.index||"0",10);c!==s&&p.reorderPage(s,c)}}z("mousemove",e._boundMouseMove),z("mouseup",e._boundMouseUp),st(e);const i=p.getCanvasDimensions();(e.dragState?.widgets||[]).forEach(s=>{const a=p.getWidgetById(s.id);a&&!a.locked&&(a.x=Math.max(0,Math.min(i.width-a.width,a.x)),a.y=Math.max(0,Math.min(i.height-a.height,a.y)))}),e.dragState=null,e.rulers&&e.rulers.setIndicators(null),Z(),kn(n),p.recordHistory(),L(E.STATE_CHANGED),se(e)}else if(e.lassoState){z("mousemove",e._boundMouseMove),z("mouseup",e._boundMouseUp);const n=e.lassoState;if(e.lassoEl&&(e.lassoEl.remove(),e.lassoEl=null),e.lassoState=null,n.rect){const o=n.currentSelection||[];p.selectWidgets(o)}else n.isAdditive||p.selectWidgets([]),n.focusParams?.fitZoom&&Be(e,p.currentPageIndex,!0,!0);se(e),t.preventDefault(),t.stopPropagation()}}let je=0,qe=null,Wt=0,Nt=null;function Oo(t){return!!(t.pinchState||t.touchState?.hasMoved||t.dragState?.mode==="resize"||t.lassoState?.rect)}function Ho(t){const e=t instanceof HTMLElement?t:null;if(!e)return{shouldShow:!1,widgetId:null};if(e.closest("input, textarea, select, option, button, [contenteditable='true']"))return{shouldShow:!1,widgetId:null};if(!e.closest(".artboard, .widget"))return{shouldShow:!1,widgetId:null};const o=e.closest(".widget");return{shouldShow:!0,widgetId:o instanceof HTMLElement&&o.dataset.id||null}}function Go(t){t.canvas.addEventListener("mousedown",n=>{if(n.button!==0)return;Z();const o=n.target,i=o.closest(".artboard-wrapper");if(!i||o.closest(".artboard-btn")||o.closest("button")){document.activeElement&&!o.closest("button")&&document.activeElement.blur(),!o.closest("button")&&!o.closest(".artboard-btn")&&(p.selectWidgets([]),se(t));return}const r=parseInt(i.dataset.index||"0",10),s=i.querySelector(".artboard");let a=s;const l=o.closest(".widget");let c=l instanceof HTMLElement?l.dataset.id:void 0;const d=p.currentPageIndex!==r,u=!!o.closest(".artboard-header");if(o.closest(".artboard"),d){const g=[...p.selectedWidgetIds];p.setCurrentPageIndex(r,{suppressFocus:!0}),c&&p.selectWidgets(g.includes(c)?g:[c]);const y=t.canvas.querySelector(`.artboard[data-index="${r}"]`);y&&(a=y)}else if(u){t.dragState={mode:"reorder-page",pageIndex:r,startX:n.clientX,startY:n.clientY},Lo(t,r,n.clientX,n.clientY),D("mousemove",t._boundMouseMove),D("mouseup",t._boundMouseUp),n.preventDefault();return}if(!a)return;const f=a.getBoundingClientRect(),h=p.zoomLevel;if(l instanceof HTMLElement){const g=l.dataset.id;if(!g)return;const y=n.shiftKey||n.ctrlKey,v=Date.now();if(g===qe&&v-je<300){Mo(t,g),je=0,qe=null,n.preventDefault(),n.stopPropagation();return}je=v,qe=g,y?p.selectWidget(g,!0):p.selectedWidgetIds.includes(g)||p.selectWidget(g,!1);const m=p.getWidgetById(g);if(!m)return;let _=m,x=g;if(m.parentId){const C=p.getWidgetById(m.parentId);C&&(_=C,x=C.id,p.selectWidget(x,y))}if(o.classList.contains("widget-resize-handle")){if(m.parentId||_.locked)return;t.dragState={mode:"resize",handle:o.dataset.handle||"br",id:x,startX:n.clientX,startY:n.clientY,startW:_.width,startH:_.height,startWidgetX:_.x,startWidgetY:_.y,artboardEl:a,dragStartPanX:t.panX,dragStartPanY:t.panY}}else{if(_.locked)return;const C=p.getSelectedWidgets(),S=C.map(w=>({id:w.id,startX:w.x,startY:w.y,clickOffsetX:(n.clientX-f.left)/h-w.x,clickOffsetY:(n.clientY-f.top)/h-w.y}));t.dragState={mode:"move",id:x,widgets:S,artboardEl:a,dragStartX:n.clientX,dragStartY:n.clientY,dragStartPanX:t.panX,dragStartPanY:t.panY},Co(t,C,n.clientX,n.clientY,h,S),t.rulers&&t.rulers.setIndicators({x:_.x,y:_.y,w:_.width,h:_.height})}D("mousemove",t._boundMouseMove),D("mouseup",t._boundMouseUp),n.preventDefault()}else{const g=(n.clientX-f.left)/h,y=(n.clientY-f.top)/h,v=Date.now(),m=r===Nt&&v-Wt<300;Wt=v,Nt=r,t.lassoState={startTime:v,isDoubleClick:m,focusParams:m||d&&!c?{index:r,fitZoom:m}:null,startX:g,startY:y,rect:null,isAdditive:n.shiftKey||n.ctrlKey,initialSelection:[...p.selectedWidgetIds],artboardEl:a},t.lassoEl=document.createElement("div"),t.lassoEl.className="lasso-selection",s&&s.appendChild(t.lassoEl),D("mousemove",t._boundMouseMove),D("mouseup",t._boundMouseUp),n.preventDefault()}}),t.canvas.addEventListener("contextmenu",n=>{if(Oo(t)){n.preventDefault(),J?.active&&J.hide();return}const{shouldShow:o,widgetId:i}=Ho(n.target);if(!o){J?.active&&J.hide();return}J&&(n.preventDefault(),n.stopPropagation(),J.show(n.clientX,n.clientY,i||void 0))});let e=document.querySelector(".debug-cursor-tooltip");e||(e=document.createElement("div"),e.className="debug-cursor-tooltip",U(e)),t.canvas.addEventListener("mousemove",n=>{if(!p.showDebugGrid){e&&(e.style.display="none");return}const o=n.target.closest(".artboard");if(!o){e&&(e.style.display="none");return}const i=o.getBoundingClientRect(),r=p.zoomLevel,s=Math.round((n.clientX-i.left)/r),a=Math.round((n.clientY-i.top)/r);e&&(e.style.display="block",e.style.left=n.clientX+"px",e.style.top=n.clientY+"px",e.innerHTML=`<span>X:</span>${s} <span>Y:</span>${a}`)}),t.canvas.addEventListener("mouseleave",()=>{e&&(e.style.display="none")})}function Ro(t){!t.canvas||!t.canvasContainer||(t._boundTouchMove=e=>Wo(e,t),t._boundTouchEnd=e=>No(e,t),t.canvas.addEventListener("touchstart",e=>{const n=e.touches,o=t.viewport.getBoundingClientRect();if(document.body.classList.add("interaction-active"),e.stopImmediatePropagation(),n.length===2){e.preventDefault();const i=(n[0].clientX+n[1].clientX)/2,r=(n[0].clientY+n[1].clientY)/2;t.pinchState={startDistance:In(n[0],n[1]),startZoom:p.zoomLevel,startPanX:t.panX,startPanY:t.panY,startCenterX:i-o.left,startCenterY:r-o.top},t.touchState=null,D("touchmove",t._boundTouchMove,{passive:!1}),D("touchend",t._boundTouchEnd),D("touchcancel",t._boundTouchEnd);return}if(n.length===1){const i=n[0],s=i.target.closest(".widget"),a=s instanceof HTMLElement?s.dataset.id:null;if(t.longPressTimer&&clearTimeout(t.longPressTimer),t.longPressTimer=setTimeout(()=>{J&&J.show(i.clientX,i.clientY,a),t.touchState=null},500),!(e.target instanceof HTMLElement&&e.target.classList.contains("canvas-viewport"))){if(e.target instanceof HTMLElement){const l=e.target.closest(".item[data-widget-type]");if(l){const c=l.getAttribute("data-widget-type");b.log("[CanvasTouch] Touch start on palette item:",c);return}}}if(s){e.preventDefault();const l=p.getWidgetById(a);if(!l)return;i.target.classList.contains("widget-resize-handle")?t.touchState={mode:"resize",id:a,startX:i.clientX,startY:i.clientY,startW:l.width,startH:l.height,el:s}:t.touchState={mode:"move",id:a,startTouchX:i.clientX,startTouchY:i.clientY,startWidgetX:l.x,startWidgetY:l.y,hasMoved:!1,el:s}}else e.preventDefault(),t.touchState={mode:"pan",startTouchX:i.clientX,startTouchY:i.clientY,startX:i.clientX,startY:i.clientY,startPanX:t.panX,startPanY:t.panY};D("touchmove",t._boundTouchMove,{passive:!1}),D("touchend",t._boundTouchEnd),D("touchcancel",t._boundTouchEnd)}},{passive:!1}))}function Wo(t,e){const n=t.touches,o=e.viewport.getBoundingClientRect();if(e.pinchState&&n.length===2){t.preventDefault();const r=In(n[0],n[1])/e.pinchState.startDistance,s=Math.max(.1,Math.min(10,e.pinchState.startZoom*r)),a=(n[0].clientX+n[1].clientX)/2-o.left,l=(n[0].clientY+n[1].clientY)/2-o.top,c=(e.pinchState.startCenterX-e.pinchState.startPanX)/e.pinchState.startZoom,d=(e.pinchState.startCenterY-e.pinchState.startPanY)/e.pinchState.startZoom;e.panX=a-c*s,e.panY=l-d*s,p.setZoomLevel(s),Q(e);return}if(n.length===1&&e.longPressTimer){const i=n[0],r=e.touchState,s=r?.startTouchX??r?.startX??i.clientX,a=r?.startTouchY??r?.startY??i.clientY;Math.hypot(i.clientX-s,i.clientY-a)>10&&(clearTimeout(e.longPressTimer),e.longPressTimer=null)}if(e.touchState&&n.length===1){t.preventDefault();const i=n[0];if(e.touchState.mode==="pan"){const r=i.clientX-e.touchState.startTouchX,s=i.clientY-e.touchState.startTouchY;e.panX=e.touchState.startPanX+r,e.panY=e.touchState.startPanY+s,Q(e)}else if(e.touchState.mode==="move"){const r=i.clientX-e.touchState.startTouchX,s=i.clientY-e.touchState.startTouchY;if(!e.touchState.hasMoved&&Math.hypot(r,s)<5)return;e.touchState.hasMoved=!0;const a=p.getWidgetById(e.touchState.id);if(!a)return;const l=p.getCanvasDimensions(),c=p.zoomLevel;let d=e.touchState.startWidgetX+r/c,u=e.touchState.startWidgetY+s/c;d=Math.max(0,Math.min(l.width-a.width,d)),u=Math.max(0,Math.min(l.height-a.height,u)),a.x=d,a.y=u,e.touchState.el&&(e.touchState.el.style.left=d+"px",e.touchState.el.style.top=u+"px")}else if(e.touchState.mode==="resize"){e.touchState.hasMoved=!0;const r=p.getWidgetById(e.touchState.id);if(!r)return;const s=p.getCanvasDimensions(),a=p.zoomLevel;let l=e.touchState.startW+(i.clientX-e.touchState.startX)/a,c=e.touchState.startH+(i.clientY-e.touchState.startY)/a;const d=20;l=Math.max(d,Math.min(s.width-r.x,l)),c=Math.max(d,Math.min(s.height-r.y,c)),r.width=l,r.height=c,e.touchState.el&&(e.touchState.el.style.width=l+"px",e.touchState.el.style.height=c+"px")}}}function No(t,e){const n=e.touchState,o=Date.now();if(n&&t.changedTouches.length>0){const i=t.changedTouches[0].clientX,r=t.changedTouches[0].clientY;if(Math.hypot(i-(n.startTouchX||n.startX),r-(n.startTouchY||n.startY))>10)o-e.lastCanvasTapTime<350?(p.setZoomLevel(1),Be(e,p.currentPageIndex,!0),e.lastCanvasTapTime=0):(e.lastCanvasTapTime=o,p.selectWidgets([]));else{if(!(t.target instanceof HTMLElement))return;const a=t.target,l=a.closest(".item[data-widget-type]");if(l){const u=l.getAttribute("data-widget-type");b.log("[CanvasTouch] Touch end on palette item:",u);return}const c=a.closest(".widget"),d=c instanceof HTMLElement?c.dataset.id:null;d===e.lastWidgetTapId&&o-e.lastWidgetTapTime<350?(J&&J.show(i,r,d),e.lastWidgetTapTime=0):(e.lastWidgetTapId=d??null,e.lastWidgetTapTime=o,p.selectWidget(d??null))}}if(n?.id&&n.hasMoved){const i=p.getWidgetById(n.id);if(i){if(n.mode==="move"){const r=p.getCanvasDimensions(),s=p.getCurrentPage();if(s?.layout){const a=ft(i.x,i.y,i.width,i.height,s.layout,r);i.x=a.x,i.y=a.y}else{const a=mt(e,i,i.x,i.y,!1,r);i.x=a.x,i.y=a.y}}Bo(n.id),p.recordHistory(),L(E.STATE_CHANGED)}}e.touchState=null,e.pinchState=null,e.longPressTimer&&(clearTimeout(e.longPressTimer),e.longPressTimer=null),z("touchmove",e._boundTouchMove),z("touchend",e._boundTouchEnd),z("touchcancel",e._boundTouchEnd),document.body.classList.remove("interaction-active"),se(e),Z()}function In(t,e){return Math.hypot(e.clientX-t.clientX,e.clientY-t.clientY)}function Bo(t){const e=p.getCurrentPage();if(!e||!e.layout)return;const n=e.layout.match(/^(\d+)x(\d+)$/);if(!n)return;const o=p.getWidgetById(t);if(!o)return;const i=parseInt(n[1],10),r=parseInt(n[2],10),s=p.getCanvasDimensions(),a=s.width/r,l=s.height/i,c=o.x+o.width/2,d=o.y+o.height/2,u=Math.floor(c/a),f=Math.floor(d/l),h=Math.max(0,Math.min(i-1,f)),g=Math.max(0,Math.min(r-1,u)),y={...o.props,grid_cell_row_pos:h,grid_cell_column_pos:g,grid_cell_row_span:Math.max(1,Math.round(o.height/l)),grid_cell_column_span:Math.max(1,Math.round(o.width/a))};p.updateWidget(t,{props:y})}let at=null;class qs{constructor(e=null){this.canvas=document.getElementById("canvas"),this.canvasContainer=document.getElementById("canvasContainer"),this.viewport=document.querySelector(".canvas-viewport"),this.dragState=null,this.panX=0,this.panY=0,this.touchState=null,this.pinchState=null,this.lastTapTime=0,this.isExternalDragging=!1,this.suppressNextFocus=!1,this._lastFocusedIndex=-1,this._boundMouseMove=n=>Ao(n,this),this._boundMouseUp=n=>Do(n,this),this.longPressTimer=null,this.lastWidgetTapId=null,this.lastWidgetTapTime=0,this.lastCanvasTapTime=0,this._boundTouchMove=null,this._boundTouchEnd=null,this.panState=null,this.lassoState=null,this.rulers=new bo(this),this.updateInterval=null,this.app=e,at=this,this.init()}init(){G(E.STATE_CHANGED,()=>this.render()),G(E.PAGE_CHANGED,n=>{if(this.render(),this.suppressNextFocus){this.suppressNextFocus=!1,this._lastFocusedIndex=n.index;return}n.forceFocus&&this.focusPage(n.index,!0,!0),this._lastFocusedIndex=n.index}),G(E.SELECTION_CHANGED,()=>this.updateSelectionVisuals()),G(E.SETTINGS_CHANGED,()=>{this.render(),this.applyZoom(),this.rulers&&this.rulers.update()}),G(E.ZOOM_CHANGED,()=>{this.applyZoom(),this.rulers&&this.rulers.update()});const e=document.getElementById("pagesHeader");e&&e.addEventListener("click",n=>{n.target instanceof HTMLElement&&n.target.closest(".chevron")||this.zoomToFitAll()}),this._boundResize=()=>{p.currentPageIndex!==-1&&this.focusPage(p.currentPageIndex,!1,!0)},D("resize",this._boundResize),this.setupInteractions(),this.render(),this.applyZoom(),this.updateInterval&&clearInterval(this.updateInterval),this.updateInterval=setInterval(()=>{if(this.touchState||this.pinchState||this.dragState||this.panState||this.lassoState||this.isExternalDragging)return;const n=p.getCurrentPage();n&&n.widgets.some(o=>o.type==="datetime")&&this.render()},1e3)}render(){se(this)}applyZoom(){Q(this),this.rulers&&this.rulers.update()}updateSelectionVisuals(){const e=p.selectedWidgetIds;this.canvas.querySelectorAll(".widget").forEach(o=>{const i=o.dataset.id;i&&e.includes(i)?o.classList.add("active"):o.classList.remove("active")}),bn(this)}setupInteractions(){xo(this),Go(this),wo(this),_o(this),Ro(this);const e=document.getElementById("zoomToFitAllBtn");e&&(e.onclick=()=>this.zoomToFitAll())}zoomIn(){ot(this)}zoomOut(){rt(this)}zoomReset(){De(this)}zoomToFit(){p.currentPageIndex!==-1&&this.focusPage(p.currentPageIndex,!0,!0)}zoomToFitAll(e=!0){fo(this,e)}focusPage(e,n=!0,o=!1){Be(this,e,n,o)}destroy(){this.updateInterval&&(clearInterval(this.updateInterval),this.updateInterval=null),this._boundResize&&z("resize",this._boundResize)}}const Y="__mixed__";function Fo(t){const e={black:"#000000",white:"#FFFFFF",red:"#FF0000",green:"#00FF00",blue:"#0000FF",yellow:"#FFFF00",gray:"#808080",grey:"#808080"};if(!t)return"#000000";const n=t.toLowerCase();return e[n]?e[n]:t.startsWith("0x")?"#"+t.substring(2):t.startsWith("#")?t:"#000000"}function Bt(t){const e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:{r:0,g:0,b:0}}function zo(t,e,n){const o=i=>{const r=Math.max(0,Math.min(255,i)).toString(16);return r.length===1?"0"+r:r};return"#"+o(t)+o(e)+o(n)}function $o(t,e,n,o){const i=t.getContainer();if(!i)return;const r=document.createElement("div");r.className="field",r.style.marginBottom="10px";const s=document.createElement("div");s.className="prop-label",s.textContent=e,r.appendChild(s);let a=n===Y?"":Fo(n);const l=Bt(n===Y?"#000000":a);let c=l.r,d=l.g,u=l.b;const f=document.createElement("div");f.style.background="var(--bg)",f.style.padding="8px",f.style.borderRadius="6px",f.style.border="1px solid var(--border-subtle)";const h=document.createElement("div");h.style.display="flex",h.style.alignItems="center",h.style.marginBottom="8px",h.style.gap="8px";const g=document.createElement("div");g.style.width="24px",g.style.height="24px",g.style.borderRadius="4px",g.style.border="1px solid #ccc",n===Y?(g.style.background="linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",g.style.backgroundSize="8px 8px",g.style.backgroundPosition="0 0, 0 4px, 4px -4px, -4px 0px",g.style.backgroundColor="white"):g.style.backgroundColor=a;const y=document.createElement("input");y.type="text",y.className="prop-input",y.style.flex="1",y.style.textTransform="uppercase",y.value=n===Y?"":a,n===Y&&(y.placeholder="Mixed Colors"),h.appendChild(g),h.appendChild(y),f.appendChild(h);const v=(S,w,k)=>{const M=document.createElement("div");M.style.display="flex",M.style.alignItems="center",M.style.marginBottom="4px",M.style.fontSize="11px";const F=document.createElement("span");F.textContent=S,F.style.width="15px",F.style.fontWeight="bold";const O=document.createElement("input");O.type="range",O.min="0",O.max="255",O.value=w,O.style.flex="1",O.style.marginLeft="4px",O.style.accentColor=k;const q=document.createElement("span");return q.textContent=w,q.style.width="25px",q.style.textAlign="right",q.style.marginLeft="4px",M.appendChild(F),M.appendChild(O),M.appendChild(q),{row:M,slider:O,valLbl:q}},m=v("R",String(c),"red"),_=v("G",String(d),"green"),x=v("B",String(u),"blue");f.appendChild(m.row),f.appendChild(_.row),f.appendChild(x.row),r.appendChild(f),i.appendChild(r);const I=()=>{c=parseInt(m.slider.value,10),d=parseInt(_.slider.value,10),u=parseInt(x.slider.value,10),m.valLbl.textContent=String(c),_.valLbl.textContent=String(d),x.valLbl.textContent=String(u);const S=zo(c,d,u).toUpperCase();y.value=S,g.style.backgroundColor=S,o(S)},C=()=>{let S=y.value.trim();if(S.startsWith("#")||(S="#"+S),/^#[0-9A-F]{6}$/i.test(S)){const w=Bt(S);c=w.r,d=w.g,u=w.b,m.slider.value=String(c),m.valLbl.textContent=String(c),_.slider.value=String(d),_.valLbl.textContent=String(d),x.slider.value=String(u),x.valLbl.textContent=String(u),g.style.backgroundColor=S,o(S)}};m.slider.addEventListener("input",I),_.slider.addEventListener("input",I),x.slider.addEventListener("input",I),y.addEventListener("input",C),y.addEventListener("change",C)}function Yo(t,e,n,o,i){const r=t.getContainer();if(!r)return;const s=document.createElement("div");s.className="field";const a=document.createElement("div");a.className="prop-label",a.textContent=e;const l=document.createElement("div");l.className="segmented-control",n.forEach(c=>{const d=document.createElement("div");d.className="segment-item"+(c.value===o?" active":""),d.title=c.label||c.value,c.icon?d.innerHTML=`<i class="mdi ${c.icon}"></i>`:d.textContent=c.label||c.value,d.onclick=()=>{l.querySelectorAll(".segment-item").forEach(u=>u.classList.remove("active")),d.classList.add("active"),i(c.value)},l.appendChild(d)}),s.appendChild(a),s.appendChild(l),r.appendChild(s)}function Uo(t,e,n,o,i,r){const s=t.getContainer();if(!s)return;const a=document.createElement("div");a.className="field";const l=document.createElement("div");l.className="prop-label",l.textContent=e;const c=document.createElement("div");c.className="slider-hybrid";const d=n===Y,u=document.createElement("input");u.type="range",u.min=String(o),u.max=String(i),u.value=String(d?o:n);const f=document.createElement("input");f.className="prop-input",f.type="number",f.value=d?"":String(n),f.min=String(o),f.max=String(i),d&&(f.placeholder="Mixed"),u.addEventListener("input",()=>{d&&(f.placeholder=""),f.value=u.value,r(parseInt(u.value,10))}),f.addEventListener("input",()=>{u.value=f.value,r(parseInt(f.value,10))}),c.appendChild(u),c.appendChild(f),a.appendChild(l),a.appendChild(c),s.appendChild(a)}function jo(t,e){const n=t.getContainer();if(!n)return;const o=document.createElement("div");o.className="prop-grid-2",n.appendChild(o),t.panel.containerStack.push(o),e(),t.panel.containerStack.pop()}function qo(t,e,n,o){const i=p.project?.pages||[],r=[{value:"relative_prev",label:"Previous (Automatic)"},{value:"relative_next",label:"Next (Automatic)"},{value:"home",label:"Home / Dashboard"}];i.forEach((s,a)=>{r.push({value:a.toString(),label:`Page ${a+1}: ${s.name||"Untitled"}`})}),t.addSelect(e,n,r,o)}function Vo(t,e,n){const o=e||t.getContainer();if(!o)return;const i=document.createElement("div");i.className="field",i.style.marginTop="8px";const r=document.createElement("button");r.className="btn btn-secondary btn-full btn-xs",r.innerHTML='<span class="mdi mdi-box-shadow"></span> Create Drop Shadow',r.onclick=()=>{const s=p.selectedWidgetIds||[];s.includes(n)?p.createDropShadow(s):p.createDropShadow(n)},i.appendChild(r),o.appendChild(i)}function Xo(t,e){const n=t.getContainer();if(!n)return;const o=document.createElement("div");o.className="sidebar-section-label",o.textContent=e,n.appendChild(o)}function Ko(t,e,n){if(!R()){b.warn("Entity Picker: No HA backend detected.");return}const o=document.getElementById("propertiesPanel")||document.body,i=document.querySelector(".entity-picker-overlay");i&&i.remove();const r=document.createElement("div");r.className="entity-picker-overlay";const s=document.createElement("div");s.className="entity-picker-header",s.textContent="Pick Home Assistant entity";const a=document.createElement("button");a.className="btn btn-secondary",a.textContent="×",a.style.padding="0 4px",a.style.fontSize="9px",a.type="button",a.addEventListener("click",()=>{r.remove()});const l=document.createElement("div");l.style.display="flex",l.style.alignItems="center",l.style.gap="4px",l.appendChild(a);const c=document.createElement("div");c.style.display="flex",c.style.justifyContent="space-between",c.style.alignItems="center",c.style.gap="4px",c.appendChild(s),c.appendChild(l);const d=document.createElement("div");d.style.display="flex",d.style.gap="4px",d.style.alignItems="center";const u=document.createElement("input");u.type="text",u.className="prop-input",u.placeholder="Search name or entity_id",u.style.flex="1";const f=document.createElement("select");f.className="prop-input",f.style.width="80px",["all","sensor","binary_sensor","light","switch","fan","cover","climate","media_player","input_number","number","input_boolean","input_text","input_select","weather","scene","script","button","input_button"].forEach(y=>{const v=document.createElement("option");v.value=y,v.textContent=y,f.appendChild(v)}),d.appendChild(u),d.appendChild(f);const h=document.createElement("div");h.className="entity-picker-list",r.appendChild(c),r.appendChild(d),r.appendChild(h),o.appendChild(r);function g(y){if(h.innerHTML="",!y||y.length===0){const v=document.createElement("div");v.style.color="var(--muted)",v.style.fontSize="var(--fs-xs)",v.textContent="No entities match.",h.appendChild(v);return}y.forEach(v=>{const m=document.createElement("div");m.className="entity-picker-row";const _=document.createElement("div");_.className="entity-picker-name",_.textContent=v.name||v.entity_id;const x=document.createElement("div");x.className="entity-picker-meta",x.textContent=`${v.entity_id} · ${v.domain||v.entity_id.split(".")[0]}`,m.appendChild(_),m.appendChild(x),m.addEventListener("click",()=>{if(n&&n(v.entity_id),e&&(e.value=v.entity_id),t&&p){if(p.updateWidget(t.id,{entity_id:v.entity_id,title:v.name||v.entity_id||""}),t.type==="graph"&&v.attributes){const I=v.attributes,C={};if(I.unit_of_measurement==="%"&&(t.props.min_value||(C.min_value="0"),t.props.max_value||(C.max_value="100")),I.min!==void 0&&!t.props.min_value&&(C.min_value=String(I.min)),I.max!==void 0&&!t.props.max_value&&(C.max_value=String(I.max)),Object.keys(C).length>0){const S={...t.props,...C};p.updateWidget(t.id,{props:S})}}if(t.type==="sensor_text"){const I={...t.props};v.attributes&&v.attributes.unit_of_measurement?I.unit=v.attributes.unit_of_measurement:v.unit&&(I.unit=v.unit);const C=v.state;if(v.entity_id.startsWith("weather.")||v.entity_id.startsWith("text_sensor."))I.is_text_sensor=!0;else if(C!=null&&C!==""){const w=parseFloat(C);isNaN(w)?I.is_text_sensor=!0:I.is_text_sensor=!1}p.updateWidget(t.id,{props:I})}}r.remove()}),h.appendChild(m)})}le().then(y=>{if(!y||y.length===0){g([]);return}function v(){const m=(u.value||"").toLowerCase(),_=f.value,x=y.filter(I=>{const C=I.domain||I.entity_id.split(".")[0];return _!=="all"&&C!==_?!1:m?`${I.entity_id} ${I.name||""}`.toLowerCase().includes(m):!0});g(x)}u.addEventListener("input",v),f.addEventListener("change",v),v()})}const Se=[{code:"F0004",name:"account"},{code:"F0026",name:"alert"},{code:"F0028",name:"alert-circle"},{code:"F0045",name:"arrow-down"},{code:"F004D",name:"arrow-left"},{code:"F0054",name:"arrow-right"},{code:"F005D",name:"arrow-up"},{code:"F0079",name:"battery"},{code:"F007C",name:"battery-50"},{code:"F0084",name:"battery-charging"},{code:"F009A",name:"bell"},{code:"F00AF",name:"bluetooth"},{code:"F00D8",name:"brightness-5"},{code:"F00ED",name:"calendar"},{code:"F0100",name:"camera"},{code:"F012C",name:"check"},{code:"F05E0",name:"check-circle"},{code:"F0140",name:"chevron-down"},{code:"F0141",name:"chevron-left"},{code:"F0142",name:"chevron-right"},{code:"F0143",name:"chevron-up"},{code:"F0150",name:"clock"},{code:"F0156",name:"close"},{code:"F015F",name:"cloud"},{code:"F0493",name:"cog"},{code:"F01B4",name:"delete"},{code:"F01D9",name:"dots-vertical"},{code:"F01DA",name:"download"},{code:"F01EE",name:"email"},{code:"F0208",name:"eye"},{code:"F0209",name:"eye-off"},{code:"F0210",name:"fan"},{code:"F0214",name:"file"},{code:"F021E",name:"flash"},{code:"F024B",name:"folder"},{code:"F0279",name:"format-list-bulleted"},{code:"F02D1",name:"heart"},{code:"F02DC",name:"home"},{code:"F07D0",name:"home-assistant"},{code:"F02E9",name:"image"},{code:"F02FC",name:"information"},{code:"F0322",name:"layers"},{code:"F0335",name:"lightbulb"},{code:"F06E8",name:"lightbulb-on"},{code:"F033E",name:"lock"},{code:"F033F",name:"lock-open"},{code:"F0349",name:"magnify"},{code:"F034E",name:"map-marker"},{code:"F035C",name:"menu"},{code:"F036C",name:"microphone"},{code:"F0374",name:"minus"},{code:"F075A",name:"music"},{code:"F03EB",name:"pencil"},{code:"F040A",name:"play"},{code:"F0415",name:"plus"},{code:"F0425",name:"power"},{code:"F0450",name:"refresh"},{code:"F048A",name:"send"},{code:"F0497",name:"share-variant"},{code:"F0565",name:"shield-check"},{code:"F04CE",name:"star"},{code:"F04DB",name:"stop"},{code:"F050F",name:"thermometer"},{code:"F0513",name:"thumb-up"},{code:"F051B",name:"timer-outline"},{code:"F0A79",name:"trash-can"},{code:"F0552",name:"upload"},{code:"F0571",name:"video"},{code:"F057E",name:"volume-high"},{code:"F0581",name:"volume-off"},{code:"F0585",name:"water"},{code:"F05E3",name:"water-percent"},{code:"F0590",name:"weather-cloudy"},{code:"F0591",name:"weather-fog"},{code:"F0592",name:"weather-hail"},{code:"F0593",name:"weather-lightning"},{code:"F0594",name:"weather-night"},{code:"F0595",name:"weather-partly-cloudy"},{code:"F0596",name:"weather-pouring"},{code:"F0597",name:"weather-rainy"},{code:"F0598",name:"weather-snowy"},{code:"F0599",name:"weather-sunny"},{code:"F059D",name:"weather-windy"},{code:"F05A9",name:"wifi"},{code:"F05AD",name:"window-close"}];let H=null,ae=null,ue=null,Ae=null,ee=null,he=null;function Jo(){H||(H=document.getElementById("iconPickerModal"),ae=document.getElementById("iconPickerFilter"),ue=document.getElementById("iconPickerList"),Ae=document.getElementById("iconPickerClose"),H||(H=document.createElement("div"),H.id="iconPickerModal",H.className="modal-backdrop hidden",H.style.zIndex="2000",H.innerHTML=`
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
        `,U(H),ae=document.getElementById("iconPickerFilter"),ue=document.getElementById("iconPickerList"),Ae=document.getElementById("iconPickerClose")),Ae&&(Ae.onclick=lt),ae&&(ae.oninput=t=>{const e=t.target;Zo(e.value)}),H&&(H.onclick=t=>{t.target===H&&lt()}))}function yt(t,e){Jo(),ee=t,he=e,H&&(H.classList.remove("hidden"),H.style.display="flex",ae&&(ae.value="",ae.focus()),dt(Se||[]))}function lt(){H&&(H.classList.add("hidden"),H.style.display="none"),ee=null,he=null}function dt(t){if(!ue)return;if(ue.innerHTML="",!t||t.length===0){ue.innerHTML='<div style="padding: 10px; color: var(--muted); grid-column: 1 / -1; text-align: center;">No icons found.</div>';return}const e=document.createDocumentFragment();t.forEach(n=>{const o=document.createElement("div");o.className="icon-item",o.style.padding="8px",o.style.border="1px solid var(--border-subtle)",o.style.borderRadius="4px",o.style.cursor="pointer",o.style.display="flex",o.style.flexDirection="column",o.style.alignItems="center",o.style.justifyContent="center",o.style.textAlign="center",o.style.background="var(--bg)",o.title=n.name;const i=document.createElement("div");i.className="mdi",i.style.fontSize="24px",i.style.color="var(--accent)";const r=parseInt(n.code,16);i.textContent=String.fromCodePoint(r);const s=document.createElement("div");s.style.fontSize="9px",s.style.marginTop="4px",s.style.overflow="hidden",s.style.textOverflow="ellipsis",s.style.whiteSpace="nowrap",s.style.width="100%",s.style.color="var(--muted)",s.textContent=n.name,o.appendChild(i),o.appendChild(s),o.onclick=()=>Qo(n),o.onmouseenter=()=>{o.style.borderColor="var(--accent)",o.style.background="rgba(110, 68, 255, 0.05)"},o.onmouseleave=()=>{o.style.borderColor="var(--border-subtle)",o.style.background="var(--bg)"},e.appendChild(o)}),ue.appendChild(e)}function Zo(t){const e=Se||[];if(!t){dt(e);return}const n=t.toLowerCase(),o=e.filter(i=>i.name.toLowerCase().includes(n)||i.code.toLowerCase().includes(n));dt(o)}function Qo(t){ee&&(he?(he.value=t.code,he.dispatchEvent(new Event("input")),he.dispatchEvent(new Event("change"))):(ee.props||(ee.props={}),ee.props.code=t.code,p&&p.updateWidget(ee.id,ee))),lt()}function er(t,e,n,o,i,r){const s=t.getContainer();if(!s)return;const a=document.createElement("div");a.className="field";const l=document.createElement("div");l.className="prop-label",l.textContent=e;const c=document.createElement("div");c.style.display="flex",c.style.gap="4px";const d=document.createElement("input");d.className="prop-input",d.type=n,d.value=o,d.style.flex="1";const u=e.toLowerCase().includes("entity");d.placeholder=u?"Pick entity or type mqtt:topic...":"Start typing or browse...",d.autocomplete="off",d.setAttribute("list",et),hn(),d.addEventListener("input",()=>i(d.value));const f=document.createElement("button");if(f.className="btn btn-secondary",f.textContent="v",f.style.padding="4px 8px",f.style.fontSize="10px",f.style.minWidth="32px",f.type="button",f.title="Browse all entities",f.addEventListener("click",()=>{Ko(r,d,h=>{d.value=h,i(h)})}),c.appendChild(d),c.appendChild(f),a.appendChild(l),a.appendChild(c),u&&!o){const h=document.createElement("div");h.style.fontSize="11px",h.style.color="#666",h.style.marginTop="4px",h.style.lineHeight="1.4",h.textContent="Tip: Use mqtt:topic/path for MQTT sources",a.appendChild(h)}s.appendChild(a)}function tr(t,e,n,o,i){const r=t.getContainer();if(!r)return;const s=document.createElement("div");s.className="field";const a=document.createElement("div");a.className="prop-label",a.textContent=e,s.appendChild(a);const l=document.createElement("select");l.className="select",l.style.fontFamily="MDI, monospace, system-ui",l.style.fontSize="16px",l.style.lineHeight="1.5",l.style.width="100%",l.style.marginBottom="4px";const c=document.createElement("option");c.value="",c.textContent="-- Quick visual picker --",c.style.fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif",l.appendChild(c);const d=(n||"").replace("mdi:","").toUpperCase();Se.forEach(y=>{const v=document.createElement("option");v.value=y.code;const m=983040+parseInt(y.code.slice(1),16),_=String.fromCodePoint(m);v.textContent=_+"  "+y.code+(y.name?` (${y.name})`:""),v.style.fontFamily="MDI, monospace, system-ui",y.code===d&&(v.selected=!0),l.appendChild(v)}),l.addEventListener("change",()=>{l.value&&o(l.value)}),s.appendChild(l);const u=document.createElement("div");u.style.display="flex",u.style.gap="4px";const f=document.createElement("input");f.className="prop-input",f.type="text",f.placeholder="MDI Hex (Fxxxx)",f.value=d,f.style.flex="1",f.style.fontFamily="monospace",f.addEventListener("input",()=>{const y=(f.value||"").trim().toUpperCase().replace(/^0X/,"").replace(/^MDI:/,"");if(/^F[0-9A-F]{4}$/i.test(y)){o(y);const v=Array.from(l.options).find(m=>m.value===y);l.value=v?y:""}else y===""&&(o(""),l.value="")}),u.appendChild(f);const h=document.createElement("button");h.className="btn btn-secondary",h.textContent="*",h.style.padding="4px 8px",h.style.fontSize="14px",h.type="button",h.title="Open full icon browser",h.addEventListener("click",()=>{yt(i,f)}),u.appendChild(h),s.appendChild(u);const g=document.createElement("div");g.className="prop-hint",g.innerHTML='Browse <a href="https://pictogrammers.com/library/mdi/icon/" target="_blank" style="color: #03a9f4; text-decoration: none;">Pictogrammers MDI</a>',s.appendChild(g),r.appendChild(s)}function nr(t,e,n,o,i){const r=t.getContainer();if(!r)return;const s=document.createElement("div");s.className="field";const a=document.createElement("div");a.className="prop-label",a.textContent=e;const l=document.createElement("div");l.style.display="flex",l.style.gap="4px";const c=document.createElement("input");c.className="prop-input",c.type="text",c.value=n,c.style.flex="1",c.addEventListener("input",()=>o(c.value));const d=document.createElement("button");d.className="btn btn-secondary",d.textContent="*",d.style.padding="4px 8px",d.style.fontSize="14px",d.type="button",d.addEventListener("click",()=>{yt(i,c)}),l.appendChild(c),l.appendChild(d),s.appendChild(a),s.appendChild(l),r.appendChild(s)}function ir(t,e,n,o,i,r){const s=t.getContainer();if(!s)return;const a=document.createElement("div");a.className="field";const l=document.createElement("div");l.className="prop-label",l.textContent=e;const c=document.createElement("div");c.style.display="flex",c.style.gap="4px",c.style.flex="1";const d=document.createElement("input");d.className="prop-input",d.type=n,d.value=o,d.style.flex="1",d.onchange=f=>i(f.target.value),d.oninput=f=>i(f.target.value);const u=document.createElement("button");u.className="btn btn-secondary",u.innerHTML='<span class="mdi mdi-emoticon-outline"></span>',u.title="Pick MDI Icon",u.style.minWidth="32px",u.style.padding="0 8px",u.onclick=()=>{yt(r,d)},c.appendChild(d),c.appendChild(u),a.appendChild(l),a.appendChild(c),s.appendChild(a)}function or(t,e,n,o,i,r){const s=t.getContainer();if(!s)return;const a=document.createElement("div");a.className="field";const l=document.createElement("div");l.className="prop-label",l.textContent=e;const c="datalist_"+Math.random().toString(36).substr(2,9),d=document.createElement("datalist");d.id=c,i.forEach(f=>{const h=document.createElement("option");h.value=f,d.appendChild(h)});const u=document.createElement("input");u.className="prop-input",u.type=n,u.value=o,u.setAttribute("list",c),u.addEventListener("input",()=>r(u.value)),u.addEventListener("change",()=>r(u.value)),a.appendChild(l),a.appendChild(u),a.appendChild(d),s.appendChild(a)}function rr(t,e,n){const o=(s,a)=>{const l={...e.props,[s]:a};p.updateWidget(e.id,{props:l})};t.panel.createSection("Common LVGL",!1);const i=document.createElement("div");i.style.display="grid",i.style.gridTemplateColumns="1fr 1fr",i.style.gap="4px",t.getContainer().appendChild(i);const r=(s,a,l=!1)=>{const c=document.createElement("div"),d=document.createElement("input");d.type="checkbox",d.checked=n[a]!==void 0?n[a]:l,d.addEventListener("change",()=>o(a,d.checked));const u=document.createElement("span");u.textContent=" "+s,u.style.fontSize="10px",c.appendChild(d),c.appendChild(u),i.appendChild(c)};r("Hidden","hidden",!1),r("Clickable","clickable",!0),r("Checkable","checkable",!1),r("Scrollable","scrollable",!0),r("Floating","floating",!1),r("Ignore Layout","ignore_layout",!1),t.addSelect("Scrollbar Mode",n.scrollbar_mode||"AUTO",["AUTO","ON","OFF","ACTIVE"],s=>o("scrollbar_mode",s)),t.panel.endSection()}function sr(t,e){e.condition_entity=e.condition_entity||"",e.condition_operator=e.condition_operator||"==",e.condition_state=e.condition_state||"",e.condition_min=e.condition_min||"",e.condition_max=e.condition_max||"";const n=document.createElement("div");n.className="field",n.style.fontSize="9px",n.style.color="#9499a6",n.style.marginBottom="6px",n.innerHTML="Show/hide this widget based on an entity's state.",t.getContainer().appendChild(n),t.addLabeledInputWithPicker("Condition Entity","text",e.condition_entity,a=>{p.updateWidget(e.id,{condition_entity:a})},e);const o=["==","!=","<",">","<=",">="];t.addSelect("Operator",e.condition_operator,o,a=>{p.updateWidget(e.id,{condition_operator:a})});const i=["on","off","open","closed","true","false","home","not_home","locked","unlocked","active","inactive","detected","clear","occupied"];t.addLabeledInputWithDataList("Condition State","text",e.condition_state,i,a=>{p.updateWidget(e.id,{condition_state:a})}),t.addLabeledInput("Min Value (Range)","text",e.condition_min,a=>{p.updateWidget(e.id,{condition_min:a})}),t.addLabeledInput("Max Value (Range)","text",e.condition_max,a=>{p.updateWidget(e.id,{condition_max:a})});const r=document.createElement("div");r.className="field",r.style.marginTop="8px";const s=document.createElement("button");s.className="btn btn-secondary btn-full",s.textContent="Clear Condition",s.type="button",s.addEventListener("click",()=>{p.updateWidget(e.id,{condition_entity:"",condition_operator:"==",condition_state:"",condition_min:"",condition_max:""})}),r.appendChild(s),t.getContainer().appendChild(r)}class ar{constructor(e){this.panel=e}getContainer(){return this.panel.getContainer()}addLabeledInput(e,n,o,i){const r=document.createElement("div");r.className="field";const s=document.createElement("div");s.className="prop-label",s.textContent=e;const a=o===Y;let l;n==="textarea"?(l=document.createElement("textarea"),l.className="prop-input",l.style.minHeight="60px",l.style.resize="vertical",l.style.fontFamily="inherit",l.value=a?"":o||"",a&&(l.placeholder="Mixed Values")):(l=document.createElement("input"),l.className="prop-input",l.type=n,l.value=a?"":String(o??""),a&&(l.placeholder="Mixed",l.style.fontStyle="italic",l.style.color="#888"));const c=n==="number"||n==="range"?i:ji(i,50);l.addEventListener("input",()=>{a&&(l.style.fontStyle="normal",l.style.color="inherit"),c(l.value)}),l.addEventListener("change",()=>{i(l.value)}),r.appendChild(s),r.appendChild(l),this.getContainer().appendChild(r)}addSelect(e,n,o,i){const r=document.createElement("div");r.className="field";const s=document.createElement("div");s.className="prop-label",s.textContent=e;const a=document.createElement("select");a.className="prop-input";const l=n===Y;if(l){const c=document.createElement("option");c.value=Y,c.textContent="(Mixed)",c.selected=!0,c.disabled=!0,a.appendChild(c)}(o||[]).forEach(c=>{const d=document.createElement("option");typeof c=="object"&&c!==null?(d.value=c.value,d.textContent=c.label,!l&&String(c.value)===String(n)&&(d.selected=!0)):(d.value=c,d.textContent=c,!l&&String(c)===String(n)&&(d.selected=!0)),a.appendChild(d)}),a.addEventListener("change",()=>{i(a.value)}),r.appendChild(s),r.appendChild(a),this.getContainer().appendChild(r)}addCheckbox(e,n,o){const i=document.createElement("div");i.className="field",i.style.marginBottom="8px";const r=document.createElement("label");r.style.display="flex",r.style.alignItems="center",r.style.gap="8px",r.style.fontSize="13px",r.style.cursor="pointer";const s=document.createElement("input");s.type="checkbox",n===Y?s.indeterminate=!0:s.checked=!!n,s.style.width="16px",s.style.height="16px",s.style.margin="0",s.style.cursor="pointer",s.addEventListener("change",()=>{const l=s;l.indeterminate=!1,o(l.checked)});const a=document.createElement("span");a.textContent=e,r.appendChild(s),r.appendChild(a),i.appendChild(r),this.getContainer().appendChild(i)}addHint(e){const n=document.createElement("div");n.style.fontSize="11px",n.style.color="#666",n.style.marginTop="4px",n.style.marginBottom="12px",n.style.lineHeight="1.4",n.innerHTML=e,this.getContainer().appendChild(n)}addLabeledInputWithPicker(e,n,o,i,r){er(this,e,n,o,i,r)}addIconPicker(e,n,o,i){tr(this,e,n,o,i)}addColorMixer(e,n,o){$o(this,e,n,o)}addColorSelector(e,n,o,i){const r=o||Ee();yn()?this.addColorMixer(e,n,i):this.addSelect(e,n,r,i)}addSegmentedControl(e,n,o,i){Yo(this,e,n,o,i)}addNumberWithSlider(e,n,o,i,r){Uo(this,e,n,o,i,r)}addCompactPropertyRow(e){jo(this,e)}addCommonLVGLProperties(e,n){rr(this,e,n)}addVisibilityConditions(e){sr(this,e)}addPageSelector(e,n,o){qo(this,e,n,o)}addDropShadowButton(e,n){Vo(this,e,n)}addIconInput(e,n,o,i){nr(this,e,n,o,i)}addLabeledInputWithIconPicker(e,n,o,i,r){ir(this,e,n,o,i,r)}addLabeledInputWithDataList(e,n,o,i,r){or(this,e,n,o,i,r)}addSectionLabel(e){Xo(this,e)}}class lr{static render(e,n,o){const i=Ee(),r=n.props||{},s=(a,l)=>{const c={...n.props,[a]:l};if(p.updateWidget(n.id,{props:c}),a==="border_radius"||a==="radius"||a==="corner_radius"){const d=p.getCurrentPage();if(d&&d.widgets){const u=parseInt(l,10)||0,f=(n.props?.name||n.type)+" Shadow",h=d.widgets.find(g=>g.props&&g.props.name===f||g.x===(n.x||0)+5&&g.y===(n.y||0)+5&&g.width===n.width&&g.height===n.height);h&&(h.type==="shape_rect"&&u>0?p.updateWidget(h.id,{type:"rounded_rect",props:{...h.props,radius:u}}):h.type==="rounded_rect"&&p.updateWidget(h.id,{props:{...h.props,radius:u}}))}}};o.forEach(a=>{e.createSection(a.section,a.defaultExpanded!==!1),a.fields.forEach(l=>{const c=l.target==="root",d=c?n[l.key]!==void 0?n[l.key]:l.default:r[l.key]!==void 0?r[l.key]:l.default,u=f=>{let h=f;l.type==="number"&&(h=f===""?null:parseFloat(f),isNaN(h)&&(h=l.default!==void 0?l.default:0)),c?p.updateWidget(n.id,{[l.key]:h}):s(l.key,h)};switch(l.type){case"text":case"textarea":case"number":e.addLabeledInput(l.label,l.type,d,u);break;case"color":e.addColorSelector(l.label,d,i,u);break;case"select":{const f=typeof l.dynamicOptions=="function"?l.dynamicOptions(r):l.options;e.addSelect(l.label,d,f,u);break}case"checkbox":e.addCheckbox(l.label,d,u);break;case"icon_picker":e.addLabeledInputWithIconPicker(l.label,"text",d,u,n);break;case"entity_picker":e.addLabeledInputWithPicker(l.label,"text",d,u,n);break;case"hint":e.addHint(l.label);break;case"drop_shadow_button":e.addDropShadowButton(e.getContainer(),n.id);break}}),e.endSection()})}}class dr{static render(e,n){const o=n.map(g=>p.getWidgetById(g)).filter(g=>!!g);if(o.length===0)return;b.log(`[MultiSelectRenderer] Rendering ${o.length} widgets. Display keys detection starting...`),e.panel.innerHTML="",e.createSection(`${o.length} Widgets Selected`,!0),e.createSection("Transform",!0);const i=g=>{const y=o[0][g];return o.every(v=>v[g]===y)?y:Y},r=(g,y)=>{p.updateWidgets(n,{[g]:y})};e.addCompactPropertyRow(()=>{const g=v=>r("x",parseInt(v,10)),y=v=>r("y",parseInt(v,10));e.addLabeledInput("X","number",i("x"),g),e.addLabeledInput("Y","number",i("y"),y)}),e.addCompactPropertyRow(()=>{const g=v=>r("width",parseInt(v,10)),y=v=>r("height",parseInt(v,10));e.addLabeledInput("Width","number",i("width"),g),e.addLabeledInput("Height","number",i("height"),y)}),e.endSection();const s=["color","bg_color","background_color","border_width","border_color","border_radius","radius","opacity","font_size","font_family","font_weight","text_align","italic","locked","hidden"],a=new Set;o.forEach(g=>Object.keys(g.props||{}).forEach(y=>a.add(y)));const c=o.map(g=>Object.keys(g.props||{})).reduce((g,y)=>g.filter(v=>y.includes(v))),d=new Set([...c,...s]),u=Array.from(d).filter(g=>{if(["border_width","border_color","border_radius","radius"].includes(g)){const y=["text","label","sensor_text","lvgl_label","lvgl_button","shape_rect","rounded_rect","shape_circle","datetime"];return o.every(v=>y.includes(v.type)||v.type&&v.type.startsWith("lvgl_"))}if(s.includes(g)){if(o.some(v=>v.props&&v.props[g]!==void 0))return!0;if(g.includes("font")||g==="text_align"||g==="italic"){const v=["text","label","sensor_text","lvgl_label","lvgl_button","datetime"];return o.every(m=>v.includes(m.type)||m.type&&m.type.startsWith("lvgl_"))}if(g==="color"||g==="opacity"){const v=["text","label","sensor_text","lvgl_label","lvgl_button","shape_rect","rounded_rect","shape_circle","datetime","icon"];return o.every(m=>v.includes(m.type)||m.type&&m.type.startsWith("lvgl_"))}}return c.includes(g)});if(u.length>0){e.createSection("Shared Appearance",!0);const g=m=>{const _=o[0].props?o[0].props[m]:void 0;return o.every(x=>(x.props?x.props[m]:void 0)===_)?_:Y},y=(m,_)=>{p.updateWidgetsProps(n,{[m]:_})},v=u.filter(m=>{const _=o.find(I=>I.props&&I.props[m]!==void 0)?.props?.[m],x=_!==void 0?_:"";return typeof x=="number"||typeof x=="string"||typeof x=="boolean"||x===""});v.sort((m,_)=>m.includes("color")&&!_.includes("color")?-1:_.includes("color")&&!m.includes("color")?1:m.localeCompare(_)),v.forEach(m=>{const _=m.split("_").map(S=>S.charAt(0).toUpperCase()+S.slice(1)).join(" "),x=g(m),I=o.find(S=>S.props&&S.props[m]!==void 0)||o[0],C=I.props&&I.props[m]!==void 0?typeof I.props[m]:"string";if(m.includes("color")||m==="bg"||m==="fg"){const S=w=>y(m,w);e.addColorSelector(_,x,Ee(),S)}else if(C==="boolean"||["italic","locked","hidden"].includes(m)){const S=w=>y(m,w);e.addCheckbox(_,x===Y?!1:x,S)}else{const S=C==="number"||m.includes("width")||m.includes("size")||m.includes("radius")?"number":"text",w=k=>{y(m,S==="number"?parseInt(k,10):k)};e.addLabeledInput(_,S,x,w)}}),e.endSection()}e.createSection("Operations",!0);const f=document.createElement("button");f.className="btn btn-secondary btn-full btn-xs",f.style.width="100%",f.style.marginTop="8px",f.innerHTML='<span class="mdi mdi-box-shadow"></span> Create Shadows for All Selected',f.onclick=()=>p.createDropShadow(n),e.getContainer().appendChild(f);const h=document.createElement("button");h.className="btn btn-secondary btn-xs",h.style.background="var(--danger)",h.style.color="white",h.style.border="none",h.style.width="100%",h.style.marginTop="8px",h.innerHTML="🗑 Delete Selected Widgets",h.onclick=()=>{confirm(`Delete ${n.length} widgets?`)&&p.deleteWidget()},e.getContainer().appendChild(h),e.endSection(),e.endSection()}}class cr{static render(e,n,o,i){const r=p.getCurrentPage(),a=(r?.layout||"absolute")!=="absolute";if(!r)return;if(!a){const h=e.getContainer(),g=document.createElement("div");g.style.padding="8px 0",g.style.fontSize="11px",g.style.color="var(--muted)",g.textContent="Page is currently in Absolute Positioning mode.",h.appendChild(g);const y=document.createElement("button");y.className="btn btn-secondary btn-xs",y.style.width="100%",y.innerHTML='<span class="mdi mdi-grid"></span> Enable Page Grid Layout',y.onclick=()=>{i&&i.open(p.currentPageIndex)},h.appendChild(y);return}const l=$.isLvglWidget(o),c=n.props||{},d=(h,g)=>{const y={...n.props,[h]:g};p.updateWidget(n.id,{props:y})},u=(h,g,y,v)=>{const m=r.layout.match(/^(\d+)x(\d+)$/);if(!m)return null;const _=parseInt(m[1],10),x=parseInt(m[2],10),I=p.getCanvasDimensions(),C=I.width/x,S=I.height/_;return{x:Math.round(g*C),y:Math.round(h*S),width:Math.round(C*v),height:Math.round(S*y)}};if(e.addLabeledInput("Row (0-indexed)","number",c.grid_cell_row_pos??"",h=>{const g=h===""?null:parseInt(h,10);d("grid_cell_row_pos",isNaN(g)?null:g);const v=p.getWidgetById(n.id)?.props||{};if(g!=null&&v.grid_cell_column_pos!=null){const m=u(g,v.grid_cell_column_pos,v.grid_cell_row_span||1,v.grid_cell_column_span||1);m&&p.updateWidget(n.id,{x:m.x,y:m.y,width:m.width,height:m.height})}}),e.addLabeledInput("Column (0-indexed)","number",c.grid_cell_column_pos??"",h=>{const g=h===""?null:parseInt(h,10);d("grid_cell_column_pos",isNaN(g)?null:g);const v=p.getWidgetById(n.id)?.props||{};if(g!=null&&v.grid_cell_row_pos!=null){const m=u(v.grid_cell_row_pos,g,v.grid_cell_row_span||1,v.grid_cell_column_span||1);m&&p.updateWidget(n.id,{x:m.x,y:m.y,width:m.width,height:m.height})}}),e.addLabeledInput("Row Span","number",c.grid_cell_row_span||1,h=>{const g=Math.max(1,parseInt(h,10)||1);d("grid_cell_row_span",g);const v=p.getWidgetById(n.id)?.props||{};if(v.grid_cell_row_pos!=null&&v.grid_cell_column_pos!=null){const m=u(v.grid_cell_row_pos,v.grid_cell_column_pos,g,v.grid_cell_column_span||1);m&&p.updateWidget(n.id,{x:m.x,y:m.y,width:m.width,height:m.height})}}),e.addLabeledInput("Column Span","number",c.grid_cell_column_span||1,h=>{const g=Math.max(1,parseInt(h,10)||1);d("grid_cell_column_span",g);const v=p.getWidgetById(n.id)?.props||{};if(v.grid_cell_row_pos!=null&&v.grid_cell_column_pos!=null){const m=u(v.grid_cell_row_pos,v.grid_cell_column_pos,v.grid_cell_row_span||1,g);m&&p.updateWidget(n.id,{x:m.x,y:m.y,width:m.width,height:m.height})}}),l){const h=["START","END","CENTER","STRETCH"];e.addSelect("X Align",c.grid_cell_x_align||"STRETCH",h,g=>{d("grid_cell_x_align",g)}),e.addSelect("Y Align",c.grid_cell_y_align||"STRETCH",h,g=>{d("grid_cell_y_align",g)})}const f=document.createElement("button");f.className="btn btn-secondary btn-xs",f.style.marginTop="8px",f.style.width="100%",f.innerHTML='<span class="mdi mdi-cog"></span> Open Page Grid Settings',f.onclick=()=>{const h=p.currentPageIndex;i&&i.open(h)},e.getContainer().appendChild(f)}}function Ln(t,e){!e||!p||typeof le=="function"&&le().then(n=>{if(!n||n.length===0)return;const o=n.find(i=>i.entity_id===e);if(o&&o.name){const i=p.getSelectedWidget();i&&i.id===t&&!i.title&&p.updateWidget(t,{title:o.name})}}).catch(()=>{})}function pr(t,e,n){const o=Ee(),i=e.props||{},r=(s,a)=>{const l={...e.props,[s]:a};p.updateWidget(e.id,{props:l})};n==="image"||n==="online_image"?(t.createSection("Image Source",!0),n==="image"?t.addLabeledInput("Asset Path","text",i.path||"",s=>r("path",s)):(t.addLabeledInput("Image URL","text",i.url||"",s=>r("url",s)),t.addLabeledInput("Refresh (s)","number",i.interval_s||300,s=>r("interval_s",parseInt(s,10)))),t.addCheckbox("Invert Colors",!!i.invert,s=>r("invert",s)),t.endSection(),t.createSection("Appearance",!0),t.addColorSelector("Background",i.bg_color||"transparent",o,s=>r("bg_color",s)),t.addDropShadowButton(t.getContainer(),e.id),t.endSection()):n.startsWith("shape_")||n==="line"||n==="rounded_rect"?(t.createSection("Shape Style",!0),t.addColorSelector("Fill/Line Color",i.color||"black",o,s=>r("color",s)),n!=="line"?(t.addCheckbox("Fill",i.fill!==!1,s=>r("fill",s)),t.addColorSelector("Background",i.bg_color||"transparent",o,s=>r("bg_color",s)),t.addLabeledInput("Border Width","number",i.border_width||0,s=>r("border_width",parseInt(s,10)))):t.addLabeledInput("Thickness","number",i.thickness||2,s=>r("thickness",parseInt(s,10))),(n==="rounded_rect"||n==="shape_rect"||i.radius!==void 0)&&t.addLabeledInput("Corner Radius","number",i.radius||0,s=>r("radius",parseInt(s,10))),t.addDropShadowButton(t.getContainer(),e.id),t.endSection()):n==="odp_ellipse"||n==="odp_polygon"||n==="odp_rectangle_pattern"||n==="odp_arc"||n==="odp_icon_sequence"?(t.createSection("ODP Style",!0),n!=="odp_icon_sequence"?(t.addColorSelector("Outline",i.outline||"black",o,s=>r("outline",s)),t.addColorSelector("Fill",i.fill||"transparent",o,s=>r("fill",s)),t.addLabeledInput("Border Width","number",i.border_width||1,s=>r("border_width",parseInt(s,10)))):(t.addColorSelector("Color",i.fill||"black",o,s=>r("fill",s)),t.addLabeledInput("Icon Size","number",i.size||24,s=>r("size",parseInt(s,10))),t.addSelect("Direction",i.direction||"right",["right","down"],s=>r("direction",s)),t.addLabeledInput("Spacing","number",i.spacing||6,s=>r("spacing",parseInt(s,10))),t.addLabeledInput("Icons (comma sep)","text",Array.isArray(i.icons)?i.icons.join(", "):i.icons||"",s=>r("icons",s))),n==="odp_rectangle_pattern"&&(t.addLabeledInput("Repeat X","number",i.x_repeat||3,s=>r("x_repeat",parseInt(s,10))),t.addLabeledInput("Repeat Y","number",i.y_repeat||2,s=>r("y_repeat",parseInt(s,10))),t.addLabeledInput("Size X","number",i.x_size||30,s=>r("x_size",parseInt(s,10))),t.addLabeledInput("Size Y","number",i.y_size||15,s=>r("y_size",parseInt(s,10)))),n==="odp_arc"&&(t.addLabeledInput("Start Angle","number",i.start_angle||0,s=>r("start_angle",parseInt(s,10))),t.addLabeledInput("End Angle","number",i.end_angle||90,s=>r("end_angle",parseInt(s,10)))),t.endSection()):n==="odp_plot"?(t.createSection("Plot Config",!0),t.addLabeledInput("Duration (sec)","number",i.duration||36400,s=>r("duration",parseInt(s,10))),t.addColorSelector("Background",i.background||"white",o,s=>r("background",s)),t.addColorSelector("Outline",i.outline||"#ccc",o,s=>r("outline",s)),t.endSection()):n==="odp_multiline"?(t.createSection("Multiline Content",!0),t.addLabeledInput("Text","textarea",i.text||"Line 1|Line 2",s=>r("text",s)),t.addLabeledInput("Delimiter","text",i.delimiter||"|",s=>r("delimiter",s)),t.endSection(),t.createSection("Appearance",!0),t.addLabeledInput("Font Size","number",i.font_size||16,s=>r("font_size",parseInt(s,10))),t.addLabeledInput("Line Spacing","number",i.line_spacing||4,s=>r("line_spacing",parseInt(s,10))),t.addColorSelector("Color",i.color||"black",o,s=>r("color",s)),t.addSelect("Font",i.font_family||"Roboto",["Roboto","Inter","Roboto Mono"],s=>r("font_family",s)),t.endSection()):((e.entity_id!==void 0||i.weather_entity!==void 0||n.includes("sensor")||n.includes("icon"))&&(t.createSection("Data Source",!0),t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||i.weather_entity||"",a=>{i.weather_entity!==void 0?r("weather_entity",a):p.updateWidget(e.id,{entity_id:a})},e),e.title!==void 0&&t.addLabeledInput("Title/Label","text",e.title||"",a=>{p.updateWidget(e.id,{title:a})}),t.endSection()),t.createSection("Appearance",!0),t.addColorSelector("Color",i.color||"black",o,a=>r("color",a)),i.bg_color!==void 0&&t.addColorSelector("Background",i.bg_color||"transparent",o,a=>r("bg_color",a)),i.size!==void 0&&t.addLabeledInput("Size","number",i.size||24,a=>r("size",parseInt(a,10))),t.endSection())}const ur={Roboto:[100,300,400,500,600,700,900],Inter:[100,200,300,400,500,600,700,800,900],"Open Sans":[300,400,500,600,700,800],Montserrat:[100,200,300,400,500,600,700,800,900],Poppins:[100,200,300,400,500,600,700,800,900],Raleway:[100,200,300,400,500,600,700,800,900],"Roboto Mono":[100,200,300,400,500,600,700],Ubuntu:[300,400,500,700],Nunito:[200,300,400,500,600,700,800,900],"Playfair Display":[400,500,600,700,800,900],Merriweather:[300,400,700,900],"Work Sans":[100,200,300,400,500,600,700,800,900],"Source Sans Pro":[200,300,400,600,700,900],Quicksand:[300,400,500,600,700]};function vt(t){return ur[t]||[100,200,300,400,500,600,700,800,900]}function Pn(t,e){const n=Math.trunc(e),o=vt(t);return o.includes(n)?n:o.reduce((i,r)=>Math.abs(r-n)<Math.abs(i-n)?r:i)}const He=Object.freeze(["Roboto","Inter","Open Sans","Lato","Montserrat","Poppins","Raleway","Roboto Mono","Ubuntu","Nunito","Playfair Display","Merriweather","Work Sans","Source Sans Pro","Quicksand","Custom..."]);function Tn(t,e,n,o={}){const i=o.defaultFont||"Roboto",r=o.alignDefault||"TOP_LEFT",s=e.font_family||i,a=!He.slice(0,-1).includes(s);t.addSelect("Font",a?"Custom...":s,He,u=>{u!=="Custom..."?(n("font_family",u),n("custom_font_family","")):n("font_family","Custom...")}),(a||e.font_family==="Custom...")&&t.addLabeledInput("Custom Font Name","text",e.custom_font_family||(a?s:""),u=>{n("font_family",u||i),n("custom_font_family",u)});const l=vt(s);let c=e.font_weight||400;l.includes(c)||(c=Pn(s,c),setTimeout(()=>n("font_weight",c),0)),t.addSelect("Weight",c,l,u=>n("font_weight",parseInt(u,10))),t.addCheckbox("Italic",e.italic||!1,u=>n("italic",u));const d=["TOP_LEFT","TOP_CENTER","TOP_RIGHT","CENTER_LEFT","CENTER","CENTER_RIGHT","BOTTOM_LEFT","BOTTOM_CENTER","BOTTOM_RIGHT"];t.addSelect("Align",e.text_align||r,d,u=>n("text_align",u))}const Ft=["Roboto","Inter","Open Sans","Lato","Montserrat","Poppins","Raleway","Roboto Mono","Ubuntu","Nunito","Playfair Display","Merriweather","Work Sans","Source Sans Pro","Quicksand","Custom..."],hr=["TOP_LEFT","TOP_CENTER","TOP_RIGHT","CENTER_LEFT","CENTER","CENTER_RIGHT","BOTTOM_LEFT","BOTTOM_CENTER","BOTTOM_RIGHT"];function gr(t,e,n,o={}){const i=o.defaultFont||"Roboto",r=o.customFontProp===void 0?"custom_font_family":o.customFontProp,s=e.font_family||i,a=!Ft.slice(0,-1).includes(s);if(t.addSelect("Font",a?"Custom...":s,Ft,l=>{l!=="Custom..."?(n("font_family",l),r&&n(r,"")):n("font_family","Custom...")}),a||e.font_family==="Custom..."){const l=r&&e[r]||(a?s:"");t.addLabeledInput("Custom Font Name","text",l,c=>{n("font_family",c||i),r&&n(r,c)}),o.customFontHint&&t.addHint(o.customFontHint)}return s}function mr(t,e,n,o){const i=vt(e);let r=n.font_weight||400;i.includes(r)||(r=Pn(e,r),setTimeout(()=>o("font_weight",r),0)),t.addSelect("Weight",r,i,s=>o("font_weight",parseInt(s,10)))}function fr(t,e,n,o="TOP_LEFT"){t.addSelect("Align",e.text_align||o,hr,i=>n("text_align",i))}function zt(t,e,n,o){const i=document.createElement("div");i.className="field",i.style.marginTop="12px";const r=e.x===0&&e.y===0&&e.width===800&&e.height===480,s=document.createElement("button");s.className="btn "+(r?"btn-primary":"btn-secondary")+" btn-full",s.textContent=r?"âœ“ Full Screen (click to restore)":"â›¶ Fill Screen",s.type="button",s.addEventListener("click",()=>{r?n():o()}),i.appendChild(s),t.getContainer().appendChild(i)}function yr(t,e,n,o,i){return n==="image"?(t.createSection("Content",!0),t.addHint("ðŸ–¼ï¸ Static image from ESPHome.<br/><span style='color:#888;font-size:11px;'>Replace the default path with your actual image file path.</span>"),t.addLabeledInput("Image Path","text",o.path||"",r=>i("path",r)),t.endSection(),t.createSection("Appearance",!0),o.invert===void 0&&i("invert",Oe()==="reterminal_e1001"),t.addCheckbox("Invert colors",o.invert||!1,r=>i("invert",r)),t.addSelect("Render Mode",o.render_mode||"Auto",["Auto","Binary","Grayscale","Color (RGB565)"],r=>i("render_mode",r)),zt(t,e,()=>p.updateWidget(e.id,{x:50,y:50,width:200,height:150}),()=>p.updateWidget(e.id,{x:0,y:0,width:800,height:480})),t.endSection(),!0):n==="online_image"?(t.createSection("Content",!0),t.addHint("ðŸ’¡ Fetch remote images dynamically (Puppet support):<br/><code style='background:#f0f0f0;padding:2px 4px;border-radius:2px;'>https://example.com/camera/snapshot.jpg </code><br/><span style='color:#4a9eff;'>â„¹ï¸ Images are downloaded at specified intervals</span>"),t.addLabeledInput("Remote URL","text",o.url||"",r=>i("url",r)),t.addLabeledInput("Update interval (seconds)","number",o.interval_s||300,r=>i("interval_s",parseInt(r,10))),t.endSection(),t.createSection("Appearance",!0),o.invert===void 0&&i("invert",Oe()==="reterminal_e1001"),t.addCheckbox("Invert colors",o.invert||!1,r=>i("invert",r)),t.addSelect("Render Mode",o.render_mode||"Auto",["Auto","Binary","Grayscale","Color (RGB565)"],r=>i("render_mode",r)),zt(t,e,()=>p.updateWidget(e.id,{x:50,y:50,width:200,height:150}),()=>p.updateWidget(e.id,{x:0,y:0,width:800,height:480})),t.endSection(),!0):n==="qr_code"?(t.createSection("Content",!0),t.addHint("ðŸ“± Generate QR codes that can be scanned by phones/tablets"),t.addLabeledInput("QR Content","text",o.value||"https://esphome.io",r=>i("value",r)),t.addHint("Enter a URL, text, or any string to encode"),t.endSection(),t.createSection("Appearance",!0),t.addLabeledInput("Scale","number",o.scale||2,r=>{let s=parseInt(r||"2",10);(Number.isNaN(s)||s<1)&&(s=1),s>10&&(s=10),i("scale",s)}),t.addHint("Size multiplier (1-10). Larger = bigger QR code"),t.addSelect("Error Correction",o.ecc||"LOW",["LOW","MEDIUM","QUARTILE","HIGH"],r=>i("ecc",r)),t.addHint("Higher = more redundancy, can recover from damage"),t.addSelect("Color",o.color||"black",["black","white"],r=>i("color",r)),t.endSection(),!0):n==="puppet"?(t.createSection("Content",!0),t.addLabeledInput("File path / URL","text",o.image_url||"",r=>i("image_url",r)),t.addHint('Tip: Use mdi:icon-name for Material Design Icons. <br><b>Important:</b> Ensure `materialdesignicons - webfont.ttf` is in your ESPHome `fonts / ` folder. <a href="https://pictogrammers.com/library/mdi/" target="_blank" style="color: #52c7ea">MDI Library</a>'),t.endSection(),t.createSection("Appearance",!0),t.addSelect("Image type",o.image_type||"RGB565",["RGB565","RGB","GRAYSCALE","BINARY"],r=>i("image_type",r)),t.addHint("RGB565=2B/px, RGB=3B/px, GRAYSCALE=1B/px, BINARY=1bit/px"),t.addSelect("Transparency",o.transparency||"opaque",["opaque","chroma_key","alpha_channel"],r=>i("transparency",r)),t.addHint("opaque=no transparency, chroma_key=color key, alpha_channel=smooth blend"),t.endSection(),!0):!1}const vr=`# Dictionary to map calendar keys to their corresponding names
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
`;function br(t,e,n,o,i,r){if(n==="quote_rss"){t.createSection("Feed Settings",!0),t.addHint("ðŸ“° Display quotes from an RSS feed (Quote of the Day)"),t.addLabeledInput("Feed URL","text",o.feed_url||"https://www.brainyquote.com/link/quotebr.rss",l=>r("feed_url",l)),t.addHint("Enter any RSS feed URL. Default: BrainyQuote daily quotes"),t.addCheckbox("Show Author",o.show_author!==!1,l=>r("show_author",l)),t.addCheckbox("Random Quote",o.random!==!1,l=>r("random",l)),t.addHint("Pick a random quote from the feed, or use the first one");const s=["15min","30min","1h","2h","4h","8h","12h","24h"];t.addSelect("Refresh Interval",o.refresh_interval||"24h",s,l=>r("refresh_interval",l)),t.addLabeledInput("Home Assistant URL","text",o.ha_url||"http://homeassistant.local:8123",l=>r("ha_url",l)),t.addHint("Address of your Home Assistant instance (for Proxy)"),t.endSection(),t.createSection("Typography",!1),t.addLabeledInput("Quote Text Size (Line 1)","number",o.quote_font_size||18,l=>r("quote_font_size",parseInt(l,10))),t.addLabeledInput("Author Size (Line 2)","number",o.author_font_size||14,l=>r("author_font_size",parseInt(l,10)));const a=gr(t,o,r,{customFontHint:'Browse <a href="https://fonts.google.com" target="_blank">fonts.google.com</a>'});return mr(t,a,o,r),fr(t,o,r,"TOP_LEFT"),t.addColorSelector("Color",o.color||"black",i,l=>r("color",l)),t.endSection(),t.createSection("Display Options",!1),t.addCheckbox("Word Wrap",o.word_wrap!==!1,l=>r("word_wrap",l)),t.addCheckbox("Auto Scale Text",o.auto_scale||!1,l=>r("auto_scale",l)),t.addHint("Automatically reduce font size if text is too long"),t.addCheckbox("Italic Quote",o.italic_quote!==!1,l=>r("italic_quote",l)),t.endSection(),!0}if(n==="calendar"){t.createSection("Appearance",!0),t.addColorSelector("Text Color",o.text_color||"black",i,l=>r("text_color",l)),t.addColorSelector("Background",o.background_color||"white",i,l=>r("background_color",l)),t.endSection(),t.createSection("Border Style",!1),t.addLabeledInput("Border Width","number",o.border_width||0,l=>r("border_width",parseInt(l,10))),t.addColorSelector("Border Color",o.border_color||"theme_auto",i,l=>r("border_color",l)),t.addLabeledInput("Corner Radius","number",o.border_radius||0,l=>r("border_radius",parseInt(l,10))),t.addDropShadowButton(t.getContainer(),e.id),t.endSection(),t.createSection("Font Sizes",!1),t.addLabeledInput("Big Date Size","number",o.font_size_date||100,l=>r("font_size_date",parseInt(l,10))),t.addLabeledInput("Day Name Size","number",o.font_size_day||24,l=>r("font_size_day",parseInt(l,10))),t.addLabeledInput("Grid Text Size","number",o.font_size_grid||14,l=>r("font_size_grid",parseInt(l,10))),t.addLabeledInput("Event Text Size","number",o.font_size_event||18,l=>r("font_size_event",parseInt(l,10))),t.endSection(),t.createSection("Visibility",!0),t.addCheckbox("Show Header",o.show_header!==!1,l=>r("show_header",l)),t.addCheckbox("Show Grid",o.show_grid!==!1,l=>r("show_grid",l)),t.addCheckbox("Show Events",o.show_events!==!1,l=>r("show_events",l)),t.endSection(),t.createSection("Data Source",!0),t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"sensor.esp_calendar_data",l=>{p.updateWidget(e.id,{entity_id:l})},e),t.addLabeledInput("Max Events","number",o.max_events||8,l=>r("max_events",parseInt(l,10))),t.addHint("Must be a sensor with attribute 'entries'");const s=document.createElement("button");s.className="btn btn-secondary btn-full btn-xs",s.textContent="Download Helper Script",s.style.marginTop="10px",s.addEventListener("click",()=>{const l=document.createElement("a");l.setAttribute("href","data:text/x-python;charset=utf-8,"+encodeURIComponent(vr)),l.setAttribute("download","esp_calendar_data_conversion.py"),l.style.display="none",document.body.appendChild(l),l.click(),document.body.removeChild(l)}),t.getContainer().appendChild(s),t.addHint("Place in /config/python_scripts/");const a=document.createElement("div");return a.style.marginTop="5px",a.style.fontSize="10px",a.style.color="#888",a.style.textAlign="center",a.innerText="Check widget instructions for HA setup.",t.getContainer().appendChild(a),t.endSection(),!0}return!1}function _r(t,e,n,o,i,r){return n==="weather"?(t.createSection("Data Source",!0),t.addLabeledInputWithPicker("Weather Entity","text",o.weather_entity||"weather.forecast",s=>r("weather_entity",s),e),t.endSection(),t.createSection("Appearance",!0),t.addLabeledInput("Icon Size","number",o.icon_size||48,s=>r("icon_size",parseInt(s,10))),t.addColorSelector("Icon Color",o.icon_color||"black",i,s=>r("icon_color",s)),t.addCheckbox("Show Temperature",o.show_temp!==!1,s=>r("show_temp",s)),t.addCheckbox("Show Condition",o.show_cond!==!1,s=>r("show_cond",s)),t.endSection(),!0):n==="chart"||n==="state_history"?(t.createSection("Data Source",!0),t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",s=>p.updateWidget(e.id,{entity_id:s}),e),t.addLabeledInput("Time Period (hours)","number",o.hours||24,s=>r("hours",parseInt(s,10))),t.endSection(),t.createSection("Appearance",!0),t.addColorSelector("Line Color",o.color||"blue",i,s=>r("color",s)),t.addColorSelector("Fill Color",o.fill_color||"transparent",i,s=>r("fill_color",s)),t.addLabeledInput("Line Width","number",o.line_width||2,s=>r("line_width",parseInt(s,10))),t.addCheckbox("Show Axes",o.show_axes!==!1,s=>r("show_axes",s)),t.endSection(),!0):n==="gauge"||n==="progress"?(t.createSection("Data Source",!0),t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",s=>p.updateWidget(e.id,{entity_id:s}),e),t.addLabeledInput("Min Value","number",o.min||0,s=>r("min",parseFloat(s))),t.addLabeledInput("Max Value","number",o.max||100,s=>r("max",parseFloat(s))),t.endSection(),t.createSection("Appearance",!0),t.addColorSelector("Bar Color",o.color||"blue",i,s=>r("color",s)),t.addColorSelector("Background Color",o.bg_color||"#eee",i,s=>r("bg_color",s)),n==="gauge"&&t.addLabeledInput("Thickness","number",o.thickness||10,s=>r("thickness",parseInt(s,10))),t.endSection(),!0):n==="switch"||n==="button"?(t.createSection("Action",!0),t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",s=>p.updateWidget(e.id,{entity_id:s}),e),t.addLabeledInput("Label","text",o.text||(n==="button"?"Button":"Switch"),s=>r("text",s)),t.endSection(),t.createSection("Appearance",!0),t.addColorSelector("Color",o.color||"blue",i,s=>r("color",s)),t.addColorSelector("Text Color",o.text_color||"white",i,s=>r("text_color",s)),t.endSection(),!0):n==="group"||n==="rectangle"||n==="circle"||n==="line"?(t.createSection("Appearance",!0),t.addColorSelector("Color",o.color||(n==="group"?"transparent":"black"),i,s=>r("color",s)),n!=="group"&&(t.addLabeledInput("Border Width","number",o.border_width||1,s=>r("border_width",parseInt(s,10))),t.addColorSelector("Border Color",o.border_color||"black",i,s=>r("border_color",s))),n==="rectangle"&&t.addLabeledInput("Corner Radius","number",o.border_radius||0,s=>r("border_radius",parseInt(s,10))),t.endSection(),!0):!1}const xr="CENTER";function wr(t){const e=t||"Roboto";return e==="Custom..."||!He.slice(0,-1).includes(e)}function Sr(t,e,n){t.addLabeledInput("Text","text",e.text||"Label",o=>n("text",o)),t.addLabeledInput("Font Size","number",e.font_size||20,o=>n("font_size",parseInt(o,10))),t.addColorMixer("Text Color",e.color||"black",o=>n("color",o)),t.addColorMixer("Background Color",e.bg_color||"transparent",o=>n("bg_color",o)),Tn(t,e,n,{alignDefault:xr}),wr(e.font_family)&&t.addHint("Browse fonts.google.com")}function Er(t,e,n,o){const i=p.getCanvasDimensions(),r=i.width,s=i.height;t.addSelect("Orientation",n.orientation||"horizontal",["horizontal","vertical"],d=>{const u=e.width,f=e.height;p.updateWidget(e.id,{props:{...n,orientation:d},width:f,height:u})}),t.addLabeledInput("Line Width","number",n.line_width||3,d=>o("line_width",parseInt(d,10))),t.addColorMixer("Line Color",n.line_color||n.color||"black",d=>o("line_color",d)),t.addCheckbox("Rounded Ends",n.line_rounded!==!1,d=>o("line_rounded",d)),t.addLabeledInput("Opacity (0-255)","number",n.opa||255,d=>o("opa",parseInt(d,10))),t.createSection("Quick Size",!1);const a=document.createElement("div");a.style.display="flex",a.style.gap="8px",a.style.marginBottom="8px";const l=document.createElement("button");l.className="btn btn-secondary",l.style.flex="1",l.textContent="Fill Horizontal",l.addEventListener("click",()=>{p.updateWidget(e.id,{x:0,y:e.y,width:r,height:n.line_width||3,props:{...n,orientation:"horizontal"}})});const c=document.createElement("button");c.className="btn btn-secondary",c.style.flex="1",c.textContent="Fill Vertical",c.addEventListener("click",()=>{p.updateWidget(e.id,{x:e.x,y:0,width:n.line_width||3,height:s,props:{...n,orientation:"vertical"}})}),a.appendChild(l),a.appendChild(c),t.getContainer().appendChild(a),t.endSection()}function Cr(t,e,n,o){t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",r=>p.updateWidget(e.id,{entity_id:r}),e),t.createSection("Size",!1);const i=Math.max(e.width,e.height);t.addLabeledInput("Size (px)","number",i,r=>{const s=parseInt(r,10)||100;p.updateWidget(e.id,{width:s,height:s})}),t.addHint("Meter widgets must be square. Width and height are locked together."),t.endSection(),t.createSection("Scale",!1),t.addLabeledInput("Min Value","number",n.min||0,r=>o("min",parseInt(r,10))),t.addLabeledInput("Max Value","number",n.max||100,r=>o("max",parseInt(r,10))),t.endSection(),t.createSection("Preview",!1),t.addLabeledInput("Value (Preview)","number",n.value!==void 0?n.value:60,r=>o("value",parseInt(r,10))),t.endSection(),t.createSection("Appearance",!1),t.addColorMixer("Scale Color",n.color||"black",r=>o("color",r)),t.addColorMixer("Needle Color",n.indicator_color||"red",r=>o("indicator_color",r)),t.addLabeledInput("Scale Width","number",n.scale_width||10,r=>o("scale_width",parseInt(r,10))),t.addLabeledInput("Needle Width","number",n.indicator_width||4,r=>o("indicator_width",parseInt(r,10))),t.addLabeledInput("Ticks","number",n.tick_count||11,r=>o("tick_count",parseInt(r,10))),t.addLabeledInput("Tick Length","number",n.tick_length||10,r=>o("tick_length",parseInt(r,10))),t.addLabeledInput("Label Gap","number",n.label_gap||10,r=>o("label_gap",parseInt(r,10))),t.endSection()}function kr(t,e,n,o){t.addLabeledInputWithPicker("Action Entity ID","text",e.entity_id||"",i=>p.updateWidget(e.id,{entity_id:i}),e),t.addHint("Entity to toggle or trigger when clicked"),t.addLabeledInput("Text","text",n.text||"BTN",i=>o("text",i)),t.addColorMixer("Background Color",n.bg_color||"white",i=>o("bg_color",i)),t.addColorMixer("Text Color",n.color||"black",i=>o("color",i)),t.addLabeledInput("Border Width","number",n.border_width||2,i=>o("border_width",parseInt(i,10))),t.addLabeledInput("Corner Radius","number",n.radius||5,i=>o("radius",parseInt(i,10))),t.addCheckbox("Checkable (Toggle)",n.checkable||!1,i=>o("checkable",i))}function Ir(t,e,n,o){t.addLabeledInputWithPicker("Sensor Entity ID","text",e.entity_id||"",i=>p.updateWidget(e.id,{entity_id:i}),e),t.addHint("Sensor to bind to arc value"),t.addLabeledInput("Title / Label","text",n.title||"",i=>o("title",i)),t.addLabeledInput("Min Value","number",n.min||0,i=>o("min",parseInt(i,10))),t.addLabeledInput("Max Value","number",n.max||100,i=>o("max",parseInt(i,10))),t.addLabeledInput("Default/Preview Value","number",n.value||0,i=>o("value",parseInt(i,10))),t.addLabeledInput("Thickness","number",n.thickness||10,i=>o("thickness",parseInt(i,10))),t.addLabeledInput("Start Angle","number",n.start_angle||135,i=>o("start_angle",parseInt(i,10))),t.addLabeledInput("End Angle","number",n.end_angle||45,i=>o("end_angle",parseInt(i,10))),t.addSelect("Mode",n.mode||"NORMAL",["NORMAL","SYMMETRICAL","REVERSE"],i=>o("mode",i)),t.addColorMixer("Color",n.color||"blue",i=>o("color",i))}function Lr(t,e,n,o){t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",i=>p.updateWidget(e.id,{entity_id:i}),e),t.addLabeledInput("Title","text",n.title||"",i=>o("title",i)),t.addSelect("Type",n.type||"LINE",["LINE","SCATTER","BAR"],i=>o("type",i)),t.addLabeledInput("Min Value","number",n.min||0,i=>o("min",parseInt(i,10))),t.addLabeledInput("Max Value","number",n.max||100,i=>o("max",parseInt(i,10))),t.addLabeledInput("Point Count","number",n.point_count||10,i=>o("point_count",parseInt(i,10))),t.addLabeledInput("X Div Lines","number",n.x_div_lines||3,i=>o("x_div_lines",parseInt(i,10))),t.addLabeledInput("Y Div Lines","number",n.y_div_lines||3,i=>o("y_div_lines",parseInt(i,10))),t.addColorMixer("Color",n.color||"black",i=>o("color",i))}function Pr(t,e,n){t.addLabeledInput("Source (Image/Symbol)","text",e.src||"",o=>n("src",o)),t.addHint("e.g. symbol_ok, symbol_home, or /image.png"),t.addLabeledInput("Rotation (0.1 deg)","number",e.rotation||0,o=>n("rotation",parseInt(o,10))),t.addLabeledInput("Scale (256 = 1x)","number",e.scale||256,o=>n("scale",parseInt(o,10))),t.addColorMixer("Color (Tint)",e.color||"black",o=>n("color",o))}function Tr(t,e,n){t.addLabeledInput("Content / URL","text",e.text||"",o=>n("text",o)),t.addLabeledInput("Size (px)","number",e.size||100,o=>n("size",parseInt(o,10))),t.addColorMixer("Color",e.color||"black",o=>n("color",o)),t.addColorMixer("Background Color",e.bg_color||"white",o=>n("bg_color",o))}function Mr(t,e,n,o){t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",i=>p.updateWidget(e.id,{entity_id:i}),e),t.addLabeledInput("Min","number",n.min||0,i=>o("min",parseInt(i,10))),t.addLabeledInput("Max","number",n.max||100,i=>o("max",parseInt(i,10))),t.addLabeledInput("Value","number",n.value||50,i=>o("value",parseInt(i,10))),t.addColorMixer("Bar Color",n.color||"black",i=>o("color",i)),t.addColorMixer("Background Color",n.bg_color||"gray",i=>o("bg_color",i)),t.addLabeledInput("Start Value","number",n.start_value||0,i=>o("start_value",parseInt(i,10))),t.addSelect("Mode",n.mode||"NORMAL",["NORMAL","SYMMETRICAL","REVERSE"],i=>o("mode",i)),t.addCheckbox("Range Mode",n.range_mode||!1,i=>o("range_mode",i))}function Ar(t,e,n,o){t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",i=>p.updateWidget(e.id,{entity_id:i}),e),t.addSegmentedControl("Orientation",[{value:"Horizontal",label:"Horiz",icon:"mdi-arrow-left-right"},{value:"Vertical",label:"Vert",icon:"mdi-arrow-up-down"}],n.vertical?"Vertical":"Horizontal",i=>{const r=i==="Vertical",s=e.width,a=e.height;p.updateWidget(e.id,{props:{...n,vertical:r},width:a,height:s})}),t.addCompactPropertyRow(()=>{t.addLabeledInput("Min","number",n.min||0,i=>o("min",parseInt(i,10))),t.addLabeledInput("Max","number",n.max||100,i=>o("max",parseInt(i,10)))}),t.addNumberWithSlider("Value",n.value||30,n.min||0,n.max||100,i=>o("value",i)),t.addColorMixer("Knob/Bar Color",n.color||"black",i=>o("color",i)),t.addColorMixer("Track Color",n.bg_color||"gray",i=>o("bg_color",i)),t.addLabeledInput("Border Width","number",n.border_width||2,i=>o("border_width",parseInt(i,10))),t.addSelect("Mode",n.mode||"NORMAL",["NORMAL","SYMMETRICAL","REVERSE"],i=>o("mode",i))}function Dr(t,e,n){t.addLabeledInput("Tabs (comma separated)","text",(e.tabs||[]).join(", "),o=>{const i=o.split(",").map(r=>r.trim()).filter(r=>r);n("tabs",i)}),t.addColorMixer("Background Color",e.bg_color||"white",o=>n("bg_color",o))}function Or(t,e,n,o){t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",i=>p.updateWidget(e.id,{entity_id:i}),e),t.addLabeledInput("Label","text",n.text||"Checkbox",i=>o("text",i)),t.addCheckbox("Checked",n.checked||!1,i=>o("checked",i)),t.addColorMixer("Color",n.color||"blue",i=>o("color",i))}function Hr(t,e,n){t.addLabeledInput("Options (one per line)","textarea",e.options||"",o=>n("options",o)),t.addCompactPropertyRow(()=>{t.addLabeledInput("Index","number",e.selected_index||0,o=>n("selected_index",parseInt(o,10))),t.addLabeledInput("Max H","number",e.max_height||200,o=>n("max_height",parseInt(o,10)))}),t.addSegmentedControl("Direction",[{value:"DOWN",icon:"mdi-arrow-down"},{value:"UP",icon:"mdi-arrow-up"},{value:"LEFT",icon:"mdi-arrow-left"},{value:"RIGHT",icon:"mdi-arrow-right"}],e.direction||"DOWN",o=>n("direction",o)),t.addColorMixer("Color",e.color||"white",o=>n("color",o))}function Gr(t,e,n,o){t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",i=>p.updateWidget(e.id,{entity_id:i}),e),t.addCheckbox("Checked",n.checked||!1,i=>o("checked",i)),t.addColorMixer("Indicator Color",n.color||"blue",i=>o("color",i)),t.addColorMixer("Background Color",n.bg_color||"gray",i=>o("bg_color",i)),t.addColorMixer("Knob Color",n.knob_color||"white",i=>o("knob_color",i))}function Rr(t,e,n){t.addLabeledInput("Placeholder","text",e.placeholder||"",o=>n("placeholder",o)),t.addLabeledInput("Text","text",e.text||"",o=>n("text",o)),t.addCheckbox("One Line",e.one_line||!1,o=>n("one_line",o)),t.addCheckbox("Password Mode",e.password_mode||!1,o=>n("password_mode",o)),t.addLabeledInput("Accepted Chars","text",e.accepted_chars||"",o=>n("accepted_chars",o)),t.addLabeledInput("Max Length","number",e.max_length||0,o=>n("max_length",parseInt(o,10)))}function Wr(t,e,n,o,i){return n==="lvgl_label"||n.startsWith("lvgl_")?(t.addCommonLVGLProperties(e,o),t.createSection("Widget Settings",!0),n==="lvgl_label"?Sr(t,o,i):n==="lvgl_line"?Er(t,e,o,i):n==="lvgl_meter"?Cr(t,e,o,i):n==="lvgl_button"?kr(t,e,o,i):n==="lvgl_arc"?Ir(t,e,o,i):n==="lvgl_chart"?Lr(t,e,o,i):n==="lvgl_img"?Pr(t,o,i):n==="lvgl_qrcode"?Tr(t,o,i):n==="lvgl_bar"?Mr(t,e,o,i):n==="lvgl_slider"?Ar(t,e,o,i):n==="lvgl_tabview"?Dr(t,o,i):n==="lvgl_checkbox"?Or(t,e,o,i):n==="lvgl_dropdown"?Hr(t,o,i):n==="lvgl_switch"?Gr(t,e,o,i):n==="lvgl_textarea"&&Rr(t,o,i),t.endSection(),!0):!1}const Nr="Browse fonts.google.com";function Br(t){const e=t||"Roboto";return e==="Custom..."||!He.slice(0,-1).includes(e)}function Fr(t,e,n,o,i){t.createSection("Content",!0),n==="sensor_text"?(t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",r=>{p.updateWidget(e.id,{entity_id:r}),Ln(e.id,r)},e),t.addLabeledInput("Attribute (optional)","text",o.attribute||"",r=>i("attribute",r)),t.addLabeledInput("Prefix","text",o.prefix||"",r=>i("prefix",r)),t.addLabeledInput("Suffix","text",o.suffix||"",r=>i("suffix",r)),t.addLabeledInput("Decimals","number",o.decimals??1,r=>i("decimals",parseInt(r,10)))):n==="entity_text"?(t.addLabeledInputWithPicker("Entity ID","text",e.entity_id||"",r=>p.updateWidget(e.id,{entity_id:r}),e),t.addLabeledInput("Attribute","text",o.attribute||"",r=>i("attribute",r))):n==="datetime"?(t.addLabeledInput("Format","text",o.format||"%H:%M",r=>i("format",r)),t.addHint("e.g. %H:%M or %A, %B %d")):t.addLabeledInput("Text","text",o.text||"Text",r=>i("text",r)),t.endSection()}function zr(t,e,n,o,i){t.createSection("Typography",!0),t.addLabeledInput("Font Size","number",e.font_size||20,r=>n("font_size",parseInt(r,10))),Tn(t,e,n,{alignDefault:o==="datetime"?"CENTER":"TOP_LEFT"}),Br(e.font_family)&&t.addHint(Nr),t.addColorSelector("Color",e.color||"black",i,r=>n("color",r)),t.endSection(),t.createSection("Appearance",!1),t.addColorSelector("Background",e.bg_color||"transparent",i,r=>n("bg_color",r)),t.addLabeledInput("Opacity (0.0 - 1.0)","number",e.opacity??1,r=>n("opacity",parseFloat(r))),t.addCheckbox("Word Wrap",e.word_wrap!==!1,r=>n("word_wrap",r)),o==="sensor_text"&&t.addCheckbox("Show Unit",e.show_unit!==!1,r=>n("show_unit",r)),t.endSection()}function $r(t,e,n){const o=Ee(),i=e.props||{},r=(s,a)=>{const l={...e.props,[s]:a};p.updateWidget(e.id,{props:l})};if(n==="text"||n==="label"||n==="datetime"||n==="sensor_text"||n==="entity_text")Fr(t,e,n,i,r),zr(t,i,r,n,o);else{if(_r(t,e,n,i,o,r))return;if(yr(t,e,n,i,r))return;if(br(t,e,n,i,o,r))return;if(Wr(t,e,n,i,r))return}}class $t{static autoPopulateTitleFromEntity(e,n){Ln(e,n)}static renderProtocolProperties(e,n,o){pr(e,n,o)}static renderLegacyProperties(e,n,o){$r(e,n,o)}}class Vs{constructor(e=null){this.app=e,this.panel=document.getElementById("propertiesPanel"),this.controls=new ar(this),this.lastRenderedWidgetId=null,this.lastRenderedSelectionKey="",this.activeWidget=null,this.containerStack=[],this.sectionStates={}}init(){G(E.SELECTION_CHANGED,()=>this.render()),G(E.STATE_CHANGED,()=>this.render());const e=document.getElementById("snapToggle");e&&(e.checked=p.snapEnabled,e.addEventListener("change",o=>{p.setSnapEnabled(o.target.checked)}),G(E.SETTINGS_CHANGED,o=>{o.snapEnabled!==void 0&&(e.checked=o.snapEnabled)}));const n=document.getElementById("lockPositionToggle");n&&n.addEventListener("change",o=>{const i=p.selectedWidgetIds;i.length>0&&p.updateWidgets(i,{locked:o.target.checked})}),this.render()}render(){if(!this.panel||at&&at.lassoState)return;const e=p.selectedWidgetIds||(p.selectedWidgetId?[p.selectedWidgetId]:[]),n=e.join("|"),o=p.selectedWidgetId,i=this.lastRenderedWidgetId!==o,r=this.lastRenderedSelectionKey!==n;if(e.length>1&&b.log(`[PropertiesPanel] Multi-select detected: ${e.length} widgets. Selection key: ${n}`),!i&&!r&&this.panel&&this.panel.isConnected){const y=document.activeElement;if(y&&this.panel.contains(y)){const v=y.tagName.toLowerCase(),m=y.type?y.type.toLowerCase():"";if(!(v==="input"&&["checkbox","radio","button"].includes(m)||v==="select")&&(v==="input"||v==="textarea"||y.classList.contains("prop-input")))return}}this.lastRenderedWidgetId=o,this.lastRenderedSelectionKey=n,this.containerStack=[],this.panel.innerHTML="";const s=document.getElementById("lockPositionToggle");if(s){const y=p.getSelectedWidgets(),v=y.length>0&&y.every(x=>x.locked),m=y.some(x=>x.locked),_=s;_.checked=v,_.indeterminate=m&&!v,_.disabled=y.length===0}if(e.length===0){this.panel.innerHTML="<div style='padding:16px;color:#aaa;text-align:center;'>Select a widget to edit properties</div>";return}if(e.length>1){dr.render(this,e);return}const a=p.getSelectedWidget();if(!a)return;const l=a.type,c=j.get(l);let d=l;l==="nav_next_page"?d="next page":l==="nav_previous_page"?d="previous page":l==="nav_reload_page"?d="reload page":d=l.replace(/_/g," ");const u=document.createElement("div");if(u.className="sidebar-section-label",u.style.marginTop="0",u.style.textTransform="capitalize",u.textContent=`${d} Properties`,this.panel.appendChild(u),(p.getCurrentPage()?.layout||"absolute")==="absolute"){this.createSection("Transform",!1);const y=x=>{p.updateWidget(a.id,{x:parseInt(x,10)||0})},v=x=>{p.updateWidget(a.id,{y:parseInt(x,10)||0})},m=x=>{p.updateWidget(a.id,{width:parseInt(x,10)||10})},_=x=>{p.updateWidget(a.id,{height:parseInt(x,10)||10})};this.addCompactPropertyRow(()=>{this.addLabeledInput("Pos X","number",a.x,y),this.addLabeledInput("Pos Y","number",a.y,v)}),this.addCompactPropertyRow(()=>{this.addLabeledInput("Width","number",a.width,m),this.addLabeledInput("Height","number",a.height,_)}),this.endSection()}cr.render(this,a,l,this.app?.pageSettings);const g=p.settings?.renderingMode||"direct";c&&c.schema?(l.startsWith("lvgl_")&&this.addCommonLVGLProperties(a,a.props||{}),lr.render(this,a,c.schema)):c&&c.renderProperties?c.renderProperties(this,a):g==="oepl"||g==="opendisplay"?$t.renderProtocolProperties(this,a,l):$t.renderLegacyProperties(this,a,l),this.createSection("Visibility Conditions",!1),this.addVisibilityConditions(a),this.endSection()}createSection(e,n=!0){const o=this.sectionStates[e]!==void 0?this.sectionStates[e]===!1:!n,i=document.createElement("div");i.className="properties-section"+(o?" collapsed":"");const r=document.createElement("div");r.className="properties-section-header",r.innerHTML=`<span>${e}</span> <span class="icon mdi mdi-chevron-down"></span>`,r.onclick=l=>{l.stopPropagation();const c=i.classList.toggle("collapsed");this.sectionStates[e]=!c};const s=document.createElement("div");s.className="properties-section-content",i.appendChild(r),i.appendChild(s),this.sectionStates[e]===void 0&&(this.sectionStates[e]=!o);const a=this.getContainer();return a&&(a.appendChild(i),this.containerStack.push(s)),s}endSection(){this.containerStack.length>0&&this.containerStack.pop()}getContainer(){return this.containerStack.length>0?this.containerStack[this.containerStack.length-1]:this.panel}autoPopulateTitleFromEntity(e,n){if(!n||!p||!p.entityStates)return;const o=p.entityStates[n];o&&o.attributes&&o.attributes.friendly_name&&p.updateWidget(e,{title:o.attributes.friendly_name})}addLabeledInput(...e){return this.controls.addLabeledInput.apply(this.controls,e)}addSelect(...e){return this.controls.addSelect.apply(this.controls,e)}addCheckbox(...e){return this.controls.addCheckbox.apply(this.controls,e)}addHint(...e){return this.controls.addHint.apply(this.controls,e)}addLabeledInputWithPicker(...e){return this.controls.addLabeledInputWithPicker.apply(this.controls,e)}addColorSelector(...e){return this.controls.addColorSelector.apply(this.controls,e)}addColorMixer(...e){return this.controls.addColorMixer.apply(this.controls,e)}addSegmentedControl(...e){return this.controls.addSegmentedControl.apply(this.controls,e)}addIconPicker(...e){return this.controls.addIconPicker?this.controls.addIconPicker.apply(this.controls,e):null}addNumberWithSlider(...e){return this.controls.addNumberWithSlider.apply(this.controls,e)}addCompactPropertyRow(...e){return this.controls.addCompactPropertyRow.apply(this.controls,e)}addCommonLVGLProperties(...e){return this.controls.addCommonLVGLProperties.apply(this.controls,e)}addVisibilityConditions(...e){return this.controls.addVisibilityConditions.apply(this.controls,e)}addPageSelector(...e){return this.controls.addPageSelector.apply(this.controls,e)}addIconInput(...e){return this.controls.addIconInput?this.controls.addIconInput.apply(this.controls,e):null}addLabeledInputWithIconPicker(...e){return this.controls.addLabeledInputWithIconPicker?this.controls.addLabeledInputWithIconPicker.apply(this.controls,e):null}addDropShadowButton(e,n){const o=document.createElement("div");o.className="field",o.style.marginTop="8px";const i=document.createElement("button");i.className="btn btn-secondary btn-full btn-xs",i.innerHTML='<span class="mdi mdi-box-shadow"></span> Create Drop Shadow',i.onclick=()=>{const r=p.selectedWidgetIds||[];r.includes(n)?p.createDropShadow(r):p.createDropShadow(n)},o.appendChild(i),e.appendChild(o)}addLabeledInputWithDataList(...e){return this.controls.addLabeledInputWithDataList(...e)}addSectionLabel(...e){return this.controls.addSectionLabel(...e)}}class Yt{static validateWidget(e){const n=[];if(!e||typeof e!="object")return{valid:!1,errors:["Widget must be an object"],sanitized:null};if(!e.type)return{valid:!1,errors:['Widget missing "type" field'],sanitized:null};const o=j.get(e.type);if(!o)return{valid:!1,errors:[`Unknown widget type: "${e.type}"`],sanitized:null};const i={...e},r=new Set(["id","type","x","y","width","height","z_index",...Object.keys(o.defaults||{})]);for(const a of Object.keys(e))r.has(a)||(n.push(`Hallucinated property "${a}" in widget type "${e.type}"`),delete i[a]);const s=["id","x","y","width","height"];for(const a of s)(e[a]===void 0||e[a]===null)&&n.push(`Missing required property "${a}" in widget "${e.id||"unknown"}"`);return{valid:n.length===0,errors:n,sanitized:i}}static validateResponse(e){const n=[],o=[];let i=[];if(Array.isArray(e))i=e;else if(e&&typeof e=="object"&&Array.isArray(e.widgets))i=e.widgets;else return{valid:!1,errors:['AI response must be an array of widgets or an object with a "widgets" array'],sanitized:[]};for(const r of i){const s=this.validateWidget(r);s.valid||n.push(...s.errors),s.sanitized&&o.push(s.sanitized)}return{valid:n.length===0,errors:n,sanitized:o}}static sandbox(e,n){const o=JSON.parse(JSON.stringify(e)),i=new Set(o.map(c=>c.id)),r=new Set(n.map(c=>c.id)),s=n.filter(c=>!i.has(c.id)),a=o.filter(c=>!r.has(c.id)).map(c=>c.id),l=n.filter(c=>{if(!i.has(c.id))return!1;const d=o.find(u=>u.id===c.id);return JSON.stringify(d)!==JSON.stringify(c)});return{cloned:o,added:s,modified:l,removed:a}}}class Yr{constructor(){this.cache={models:{}}}getSettings(){return p.settings}async fetchModels(e,n){if(!n)return[];try{if(e==="openrouter")return(await(await fetch("https://openrouter.ai/api/v1/models",{headers:{Authorization:`Bearer ${n}`}})).json()).data.map(r=>({id:r.id,name:r.name,context:r.context_length}));if(e==="openai")return(await(await fetch("https://api.openai.com/v1/models",{headers:{Authorization:`Bearer ${n}`}})).json()).data.filter(r=>r.id.startsWith("gpt-")).map(r=>({id:r.id,name:r.id}));if(e==="gemini"){try{const i=await(await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${n}`)).json();if(i.models&&Array.isArray(i.models))return i.models.filter(r=>r.supportedGenerationMethods.includes("generateContent")).map(r=>({id:r.name.replace("models/",""),name:r.displayName||r.name.replace("models/",""),description:r.description}))}catch(o){throw b.warn("Dynamic Gemini model fetch failed:",o),new Error("Failed to fetch Gemini models. Check your API key.")}return[]}}catch(o){throw b.error(`Error fetching models for ${e}:`,o),o}return[]}async processPrompt(e,n){const o=this.getSettings(),i=o.ai_provider||"gemini",r=o[`ai_api_key_${i}`];let s=o[`ai_model_${i}`];if(!s&&i==="gemini"){b.log("No model selected, attempting to auto-detect...");try{const d=await this.fetchModels(i,r);if(d.length>0)s=(d.find(f=>f.id.includes("flash"))||d.find(f=>f.id.includes("1.5-pro"))||d.find(f=>f.id.includes("gemini-pro"))||d[0]).id,b.log(`Auto-detected model: ${s}`),p.updateSettings({[`ai_model_${i}`]:s});else throw new Error("No models found for this API Key.")}catch(d){b.error("Auto-detection failed:",d),s="gemini-2.0-flash"}}if(!r)throw new Error(`Missing API Key for ${i}. Configure it in Editor Settings → AI.`);if(!s)throw new Error(`No model selected for ${i}. Please pick one in Editor Settings → AI.`);const a=this.getSystemPrompt(),l={...n,widgets:n.widgets.map(d=>this.minifyWidget(d))},c=`
Current Layout Context:
${JSON.stringify(l,null,2)}

User Request:
${e}

Respond ONLY with valid JSON containing the updated "widgets" array for the current page. Do not include any explanation.
`.trim();try{let d="";i==="gemini"?d=await this.callGemini(r,s,a,c):i==="openai"?d=await this.callOpenAI(r,s,a,c):i==="openrouter"&&(d=await this.callOpenRouter(r,s,a,c));let u=d.trim();if(u.includes("```")){const v=u.match(/```(?:json)?\s*([\s\S]*?)\s*```/);v&&v[1]&&(u=v[1].trim())}const f=u.indexOf("["),h=u.indexOf("{");let g=-1,y=-1;f!==-1&&(h===-1||f<h)?(g=f,y=u.lastIndexOf("]")):h!==-1&&(g=h,y=u.lastIndexOf("}")),g!==-1&&y!==-1&&y>g&&(u=u.substring(g,y+1));try{const v=JSON.parse(u),m=Yt.validateResponse(v);if(!m.valid&&(b.warn("[AI] Validation failed:",m.errors),m.sanitized.length===0))throw new Error("AI returned invalid widget data: "+m.errors.join(", "));return m.sanitized}catch(v){b.warn("Fast JSON parse failed, trying repair...",v);try{const m=this.repairJson(u),_=JSON.parse(m),x=Yt.validateResponse(_);return x.valid||b.warn("[AI] Validation failed after repair:",x.errors),x.sanitized}catch(m){throw b.error("JSON repair failed:",m),new Error("AI returned malformed JSON (possibly truncated). Try a shorter prompt or a more powerful model.")}}}catch(d){throw b.error("AI processing failed:",d),d}}async callGemini(e,n,o,i){const r=`https://generativelanguage.googleapis.com/v1beta/models/${n}:generateContent?key=${e}`,s={contents:[{role:"user",parts:[{text:o+`

`+i}]}],generationConfig:{temperature:.1,topP:.95,topK:40,maxOutputTokens:8192,responseMimeType:"application/json"}},a=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)}),l=await a.json();if(a.status===429)throw new Error("⚠️ Rate Limit Exceeded: You are sending requests too quickly for the free tier. Please wait a minute and try again.");if(l.error)throw new Error(l.error.message);return l.candidates[0].content.parts[0].text}async callOpenAI(e,n,o,i){const s=n&&n.toLowerCase().includes("gpt-5")?{type:"json_schema",json_schema:{name:"widget_layout",strict:!0,schema:{type:"object",properties:{widgets:{type:"array",items:{type:"object"}}},required:["widgets"],additionalProperties:!1}}}:{type:"json_object"},l=await(await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({model:n,messages:[{role:"system",content:o},{role:"user",content:i}],temperature:.1,max_tokens:8192,response_format:s})})).json();if(l.error)throw new Error(l.error.message);return l.choices[0].message.content}async callOpenRouter(e,n,o,i){const s=await(await fetch("https://openrouter.ai/api/v1/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({model:n,messages:[{role:"system",content:o},{role:"user",content:i}],temperature:.1,max_tokens:4096})})).json();if(s.error)throw new Error(s.error.message);return s.choices[0].message.content}getSystemPrompt(){return`
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
- shape_rect / rounded_rect / shape_circle: { x, y, width, height, color, fill (bool), border_width, opacity }
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
  {"id": "w_sep", "type": "shape_rect", "x": 20, "y": 65, "width": 760, "height": 2, "color": "black", "fill": true}
]

8. DROP SHADOWS: For LCD displays ("color_lcd"), add subtle drop shadows to shapes and cards.
   HOW TO: Create a DUPLICATE of the widget to be shadowed.
           - ID: [original_id]_shadow
           - X/Y: original.x + 4, original.y + 4
           - Color: "black" (or "white" if background is dark)
           - Z-Order: Place the shadow widget BEFORE the main widget in the list so it renders behind.
           - Opacity: If supported by the widget type ('shape_rect'), set opacity to 0.4. If not, use a gray color like "#333333".

DESIGN GOAL: Create "Beautiful" layouts. Use whitespace, professional alignment, and decorative shapes to make the UI look premium.
`.trim()}repairJson(e){let n=[],o=!1,i=!1;for(let s=0;s<e.length;s++){const a=e[s];if(i){i=!1;continue}if(a==="\\"){i=!0;continue}if(a==='"'){o=!o;continue}o||(a==="["||a==="{"?n.push(a==="["?"]":"}"):(a==="]"||a==="}")&&n.length>0&&n[n.length-1]===a&&n.pop())}let r=e;for(o&&(r+='"'),r=r.trim().replace(/,\s*$/,"");n.length>0;)r+=n.pop();return r}minifyWidget(e){const{id:n,type:o,x:i,y:r,width:s,height:a,...l}=e;return{id:n,type:o,x:i,y:r,width:s,height:a,...l}}}const V=new Yr;function Ur(){try{return globalThis.localStorage??null}catch{return null}}function jr(){try{return globalThis.location?.origin||""}catch{return""}}function qr(t){return t?Array.isArray(t)?t.length:typeof t=="object"?Object.keys(t).length:0:0}class Xs{constructor(){const e=r=>document.getElementById(r),n=r=>document.getElementById(r),o=r=>document.getElementById(r),i=r=>document.getElementById(r);this.modal=e("editorSettingsModal"),this.closeBtn=e("editorSettingsClose"),this.doneBtn=e("editorSettingsDone"),this.snapToGrid=n("editorSnapToGrid"),this.showGrid=n("editorShowGrid"),this.lightMode=n("editorLightMode"),this.refreshEntitiesBtn=i("editorRefreshEntities"),this.entityCountLabel=e("editorEntityCount"),this.gridOpacity=n("editorGridOpacity"),this.extendedLatinGlyphs=n("editorExtendedLatinGlyphs"),this.haManualUrl=n("haManualUrl"),this.haLlatToken=n("haLlatToken"),this.testHaBtn=i("editorTestHaBtn"),this.haTestResult=e("haTestResult"),this.haDeployedWarning=e("haDeployedWarning"),this.haCorsTip=e("haCorsTip"),this.aiProvider=o("aiProvider"),this.aiApiKeyGemini=n("aiApiKeyGemini"),this.aiApiKeyOpenai=n("aiApiKeyOpenai"),this.aiApiKeyOpenrouter=n("aiApiKeyOpenrouter"),this.aiModelFilter=n("aiModelFilter"),this.aiModelSelect=o("aiModelSelect"),this.aiRefreshModelsBtn=i("aiRefreshModelsBtn"),this.aiTestResult=e("aiTestResult"),this.aiKeyRows={gemini:e("aiKeyGeminiRow"),openai:e("aiKeyOpenaiRow"),openrouter:e("aiKeyOpenrouterRow")}}init(){this.modal&&(this.closeBtn&&this.closeBtn.addEventListener("click",()=>this.close()),this.doneBtn&&this.doneBtn.addEventListener("click",()=>this.close()),this.setupListeners())}open(){if(!this.modal)return;const e=p.settings;this.snapToGrid&&(this.snapToGrid.checked=p.snapEnabled!==!1),this.showGrid&&(this.showGrid.checked=p.showGrid!==!1),this.lightMode&&(this.lightMode.checked=!!e.editor_light_mode),this.aiProvider&&(this.aiProvider.value=e.ai_provider||"gemini"),this.aiApiKeyGemini&&(this.aiApiKeyGemini.value=e.ai_api_key_gemini||""),this.aiApiKeyOpenai&&(this.aiApiKeyOpenai.value=e.ai_api_key_openai||""),this.aiApiKeyOpenrouter&&(this.aiApiKeyOpenrouter.value=e.ai_api_key_openrouter||""),this.aiModelFilter&&(this.aiModelFilter.value=e.ai_model_filter||""),this.updateAIKeyVisibility(),this.refreshModelSelect(),this.gridOpacity&&(this.gridOpacity.value=String(e.grid_opacity!==void 0?e.grid_opacity:20));const n=e.glyphsets||["GF_Latin_Kernel"];document.querySelectorAll(".glyphset-checkbox").forEach(s=>{s.checked=n.includes(s.value)}),this.extendedLatinGlyphs&&(this.extendedLatinGlyphs.checked=!!e.extendedLatinGlyphs);const i=Qe();this.haManualUrl&&(this.haManualUrl.value=ln()||"",this.haManualUrl.disabled=i,this.haManualUrl.style.opacity=i?"0.5":"1"),this.haLlatToken&&(this.haLlatToken.value=cn()||"",this.haLlatToken.disabled=i,this.haLlatToken.style.opacity=i?"0.5":"1"),this.haDeployedWarning&&this.haDeployedWarning.classList.toggle("hidden",!i),this.haCorsTip&&this.haCorsTip.classList.toggle("hidden",i),this.haTestResult&&(this.haTestResult.textContent=""),this.aiTestResult&&(this.aiTestResult.textContent="");const r=document.getElementById("haOriginPlaceholder");r&&(r.textContent=jr()),this.updateEntityCount(),this.modal.classList.remove("hidden"),this.modal.style.display="flex"}close(){this.modal&&(this.modal.classList.add("hidden"),this.modal.style.display="none")}updateEntityCount(){if(this.entityCountLabel&&K){const e=qr(K);this.entityCountLabel.textContent=`${e} entities cached`}}setupListeners(){if(!this.modal)return;const e=this.snapToGrid;e&&e.addEventListener("change",()=>{p.setSnapEnabled(e.checked)});const n=this.showGrid;n&&n.addEventListener("change",()=>{p.setShowGrid(n.checked);const m=document.querySelector(".canvas-grid");m&&(m.style.display=n.checked?"block":"none")});const o=this.lightMode;o&&o.addEventListener("change",()=>{const m=o.checked;p.updateSettings({editor_light_mode:m}),this.applyEditorTheme(m),L(E.STATE_CHANGED)});const i=this.gridOpacity;i&&i.addEventListener("input",()=>{const m=parseInt(i.value,10);p.updateSettings({grid_opacity:m})});const r=this.refreshEntitiesBtn;r&&r.addEventListener("click",async()=>{r.disabled=!0,r.textContent="Refreshing...",le&&await le(),this.updateEntityCount(),r.disabled=!1,r.textContent="â†» Refresh Entity List"});const s=this.haManualUrl;s&&s.addEventListener("change",()=>{dn(s.value.trim()),Pt()});const a=this.haLlatToken;a&&a.addEventListener("change",()=>{xi(a.value.trim())});const l=this.testHaBtn;l&&l.addEventListener("click",async()=>{const m=this.haTestResult;l.disabled=!0,m&&(m.textContent="Testing...",m.style.color="var(--muted)");try{Pt();const _=await le();_&&_.length>0?(m&&(m.textContent="âœ… Success!",m.style.color="var(--success)"),this.updateEntityCount()):m&&(m.innerHTML="âŒ Failed.<br>Did you add <strong>cors_allowed_origins</strong> to HA and <strong>restart</strong> it?",m.style.color="var(--danger)")}catch{m&&(m.innerHTML="âŒ Connection Error.<br>Check browser console.",m.style.color="var(--danger)")}finally{l.disabled=!1}});const c=this.aiProvider;c&&c.addEventListener("change",()=>{p.updateSettings({ai_provider:c.value}),this.updateAIKeyVisibility(),this.refreshModelSelect()});const d=(m,_)=>{const x=document.getElementById(m);x&&x.addEventListener("input",()=>p.updateSettings({[_]:x.value.trim()}))};d("aiApiKeyGemini","ai_api_key_gemini"),d("aiApiKeyOpenai","ai_api_key_openai"),d("aiApiKeyOpenrouter","ai_api_key_openrouter");const u=this.aiModelFilter;u&&u.addEventListener("input",()=>{p.updateSettings({ai_model_filter:u.value}),this.filterModels()});const f=this.aiModelSelect;f&&f.addEventListener("change",()=>{const m=p.settings.ai_provider;p.updateSettings({[`ai_model_${m}`]:f.value})});const h=this.aiRefreshModelsBtn;h&&h.addEventListener("click",async()=>{const m=p.settings.ai_provider||"gemini";let _=p.settings[`ai_api_key_${m}`];const x=`aiApiKey${m.charAt(0).toUpperCase()+m.slice(1)}`,I=document.getElementById(x);if(I&&(_=I.value.trim(),p.updateSettings({[`ai_api_key_${m}`]:_})),!_){T("Please enter an API key first","error",3e3);return}h.disabled=!0,h.textContent="...";const C=this.aiTestResult;C&&(C.textContent="Testing...",C.style.color="var(--muted)");try{const S=await V.fetchModels(m,_);V.cache.models[m]=S,this.refreshModelSelect(),C&&(C.textContent=`âœ… Success! Found ${S.length} models.`,C.style.color="var(--success)")}catch{C&&(C.textContent="âŒ Failed. Check key/console.",C.style.color="var(--danger)")}finally{h.disabled=!1,h.textContent="Test & Load Models"}}),document.querySelectorAll(".glyphset-checkbox").forEach(m=>{m.addEventListener("change",()=>{const _=document.querySelectorAll(".glyphset-checkbox:checked"),x=Array.from(_).map(I=>I.value);p.updateSettings({glyphsets:x})})});const y=this.extendedLatinGlyphs;y&&y.addEventListener("change",()=>{p.updateSettings({extendedLatinGlyphs:y.checked})}),this.modal.querySelectorAll(".settings-category-header").forEach(m=>{m.addEventListener("click",()=>{const _=m.closest(".settings-category");if(!_)return;_.classList.contains("expanded")?_.classList.remove("expanded"):_.classList.add("expanded")})})}updateAIKeyVisibility(){const e=p.settings.ai_provider||"gemini";Object.keys(this.aiKeyRows).forEach(o=>{this.aiKeyRows[o]&&(this.aiKeyRows[o].style.display=o===e?"block":"none")})}async refreshModelSelect(){if(!this.aiModelSelect)return;const e=p.settings.ai_provider||"gemini";if(!V||!V.cache)return;let n=V.cache.models[e];if(!n){n=[];const o=p.settings[`ai_api_key_${e}`]||"";n=await V.fetchModels(e,o),V.cache.models[e]=n}this.filterModels()}filterModels(){const e=this.aiModelSelect;if(!e)return;const n=p.settings.ai_provider||"gemini",o=(p.settings.ai_model_filter||"").toLowerCase();if(!V||!V.cache)return;const r=(V.cache.models[n]||[]).filter(a=>a.name.toLowerCase().includes(o)||a.id.toLowerCase().includes(o));e.innerHTML="",r.forEach(a=>{const l=document.createElement("option");l.value=a.id,l.textContent=a.name,e.appendChild(l)});const s=p.settings[`ai_model_${n}`];s&&(e.value=s)}applyEditorTheme(e){e?document.documentElement.setAttribute("data-theme","light"):document.documentElement.removeAttribute("data-theme");try{const n=Ur();if(!n)return;n.setItem("reterminal-editor-theme",e?"light":"dark")}catch(n){b.log("Could not save theme preference:",n)}}}const Mn="snippet-selection-state-changed";let An=null,bt=!1;function _t(){pt(new CustomEvent(Mn))}function Ge(){return An}function Ks(t){An=t,_t()}function Re(){return bt}function Js(t){bt=t,_t()}function Zs(){bt=!1,_t()}class Vr{constructor(){this.patterns=[{name:"comment",regex:/(#.*)/g},{name:"key",regex:/^(\s*)([^:\n]+)(:)/gm},{name:"string",regex:/("[^"]*"|'[^']*')/g},{name:"value",regex:/\b(true|false|null|[0-9]+(\.[0-9]+)?)\b/g},{name:"keyword",regex:/\b(lambda|script|on_.*|if|then|else|wait_until|delay)\b/g},{name:"tag",regex:/(![a-z_]+)/g}]}highlight(e,n=null){if(!e)return"";const o=/^(\s*(?:-\s+)?)([^:\n]+)(:)|(#.*)|("[^"]*"|'[^']*')|(![a-z_]+)|\b(lambda|script|on_[a-z_]+|if|then|else|wait_until|delay)\b|\b(true|false|null|[0-9]+(?:\.[0-9]+)?)\b|(\|[-+]?|>[-+]?)/gm,i=[];let r=0;for(const l of e.matchAll(o)){const c=l.index??0;c>r&&i.push({text:e.slice(r,c),className:null});const[,d,u,f,h,g,y,v,m,_]=l;d!==void 0?(i.push({text:d,className:null}),i.push({text:u,className:"hl-key"}),i.push({text:f,className:"hl-punc"})):h!==void 0?i.push({text:h,className:"hl-comment"}):g!==void 0?i.push({text:g,className:"hl-string"}):y!==void 0?i.push({text:y,className:"hl-tag"}):_!==void 0?i.push({text:_,className:"hl-punc"}):v!==void 0?i.push({text:v,className:"hl-keyword"}):m!==void 0&&i.push({text:m,className:"hl-value"}),r=c+l[0].length}r<e.length&&i.push({text:e.slice(r),className:null});let s=0;const a=n&&n.end>n.start?n:null;return i.map(l=>{const c=s,d=s+l.text.length;return s=d,this.renderSegment(l,c,d,a)}).join("")}renderSegment(e,n,o,i){if(!e.text)return"";if(!i||i.end<=n||i.start>=o)return this.wrapSegmentText(e.text,e.className,!1);const r=Math.max(i.start,n)-n,s=Math.min(i.end,o)-n;return[{text:e.text.slice(0,r),selected:!1},{text:e.text.slice(r,s),selected:!0},{text:e.text.slice(s),selected:!1}].map(l=>this.wrapSegmentText(l.text,e.className,l.selected)).join("")}wrapSegmentText(e,n,o){if(!e)return"";const i=this.escapeHtml(e),r=n?`<span class="${n}">${i}</span>`:i;return o?`<span class="hl-selected">${r}</span>`:r}escapeHtml(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}async function Ve(t){if(navigator.clipboard&&Jn()){await navigator.clipboard.writeText(t);return}const e=document.createElement("textarea");e.value=t,e.style.position="fixed",e.style.left="-999999px",e.style.top="-999999px",document.body.appendChild(e),e.focus(),e.select();try{if(!document.execCommand("copy"))throw new Error("Copy command was rejected")}finally{document.body.removeChild(e)}}function Xe(t,e,n=2e3){const o=t.textContent,i=t.style.minWidth;t.style.minWidth=t.offsetWidth+"px",t.textContent=e,globalThis.setTimeout(()=>{t.textContent=o,t.style.minWidth=i},n)}function Xr(t){const e=t.search(/^display:\s*$/m);if(e===-1)throw new Error("No display section found in output");const n=t.substring(e),o=n.match(/\n[a-z_]+:\s*(?:\n|$)/),r=(o?n.substring(0,o.index):n).match(/lambda:\s*\|-\n([\s\S]*?)$/);if(!r)throw new Error("No display lambda found in output");const a=r[1].split(`
`),l=a.filter(d=>d.trim().length>0);if(l.length===0)throw new Error("Lambda appears to be empty");const c=Math.min(...l.map(d=>{const u=d.match(/^(\s*)/);return u?u[1].length:0}));return a.map(d=>d.length>=c?d.substring(c):d).join(`
`).trim()}function Kr(t,e={}){const n=e.oeplEntityId||"open_epaper_link.0000000000000000",o=e.oeplDither??2;t.target.entity_id=n,t.data.dither=o;let i=`service: ${t.service}
`;return i+=`target:
  entity_id: ${t.target.entity_id}
`,i+=`data:
`,i+=`  background: ${t.data.background}
`,i+=`  rotate: ${t.data.rotate}
`,i+=`  dither: ${t.data.dither}
`,i+=`  ttl: ${t.data.ttl}
`,i+=`  payload: >
`,i+=`    ${JSON.stringify(t.data.payload)}`,i}function Jr(t){const e=t==="OEPLAdapter",n=t==="OpenDisplayAdapter",o=document.getElementById("oeplNotice");o&&o.classList.toggle("hidden",!e);const i=document.getElementById("odpNotice");if(i&&(i.classList.toggle("hidden",!n),n)){const d=i.querySelector("div");d&&(d.innerHTML="<strong>OpenDisplay YAML (ODP)</strong> - Copy this to Home Assistant > Developer Tools > Services > <code>opendisplay.drawcustom</code>")}const r=document.querySelector(".code-panel-title");if(r){const d=r.querySelector("button");r.innerHTML="",d&&r.appendChild(d);let u=" ESPHome YAML";e&&(u=" OpenEpaperLink JSON"),n&&(u=" OpenDisplay YAML (ODP)"),r.appendChild(document.createTextNode(u))}const s=document.getElementById("copyOEPLServiceBtn");s&&(s.style.display=e?"inline-block":"none");const a=document.getElementById("copyODPServiceBtn");a&&(a.style.display=n?"inline-block":"none");const l=document.getElementById("copyLambdaBtn");l&&(l.style.display=e||n?"none":"inline-block");const c=document.getElementById("updateLayoutBtn");return c&&(c.style.display="inline-block"),{isOEPL:e,isODP:n}}function Zr(t){return document.getElementById(t)}function xt(t){return document.getElementById(t)}function ge(t){return document.getElementById(t)}function Dn(t){return t instanceof Error?t.message:String(t)}function Qr(t){const e=ge("snippetFullscreenModal"),n=ge("snippetFullscreenContainer"),o=ge("snippetFullscreenContent"),i=ge("snippetFullscreenHighlight"),r=xt("snippetBox"),s=document.getElementById("toggleFullscreenHighlightBtn");if(!e||!n||!o||!i||!r)return;n.classList.toggle("highlighted",t.isHighlighted),s&&s.classList.toggle("active",t.isHighlighted),s&&!s.hasListener&&(s.addEventListener("click",()=>{t.isHighlighted=!t.isHighlighted,localStorage.setItem("esphome_designer_yaml_highlight",String(t.isHighlighted));const c=document.querySelector(".snippet-container"),d=Zr("toggleHighlightBtn");if(c&&c.classList.toggle("highlighted",t.isHighlighted),d&&d.classList.toggle("active",t.isHighlighted),n.classList.toggle("highlighted",t.isHighlighted),s.classList.toggle("active",t.isHighlighted),t.isHighlighted){const u=Re()?Ge():null;i.innerHTML=t.highlighter.highlight(a.value,u),t.updateHighlightLayer()}}),s.hasListener=!0);let a=o.querySelector("textarea");if(!a){o.innerHTML="",a=document.createElement("textarea"),a.className="snippet-box",a.style.width="100%",a.style.height="100%",a.style.background="transparent",a.spellcheck=!1,o.appendChild(a),a.addEventListener("scroll",()=>{i.scrollTop=a.scrollTop,i.scrollLeft=a.scrollLeft}),a.addEventListener("input",()=>{t.isHighlighted&&(i.innerHTML=t.highlighter.highlight(a.value))});let c=e.querySelector(".modal-actions");if(c&&!c.querySelector("#fullscreenUpdateBtn")){const d=document.createElement("button");d.id="fullscreenUpdateBtn",d.className="btn btn-primary",d.textContent="Update Layout from YAML",d.onclick=()=>{r.value=a.value,t.handleUpdateLayoutFromSnippetBox(),e.classList.add("hidden")},c.insertBefore(d,c.firstChild)}}const l=a;if(l){if(l.value=r.value||"",t.isHighlighted){const c=Re()?Ge():null;i.innerHTML=t.highlighter.highlight(l.value,c),setTimeout(()=>{i.scrollTop=l.scrollTop,i.scrollLeft=l.scrollLeft},50)}e.style.display="",e.classList.remove("hidden")}}async function es(t){const e=xt("importSnippetTextarea"),n=ge("importSnippetError");if(!e)return;const o=e.value;if(o.trim())try{n&&(n.textContent="");let i;try{i=Xt(o),b.log("[handleImportSnippet] Successfully used offline parser.")}catch(s){if(b.warn("[handleImportSnippet] Offline parser failed, falling back to backend:",s),R())i=await Hi(o);else throw s}de(i);const r=ge("importSnippetModal");r&&(r.classList.add("hidden"),r.style.display="none"),T("Layout imported successfully","success")}catch(i){b.error("Import failed:",i),n&&(n.textContent=`Error: ${Dn(i)}`)}}async function ts(t){const e=xt("snippetBox");if(!e)return;const n=e.value;if(n.trim()){if(t.lastGeneratedYaml&&n.trim()===t.lastGeneratedYaml.trim()){b.log("[handleUpdateLayoutFromSnippetBox] Skipping update: Snippet matches last generated state.");return}try{const o=p?.currentLayoutId||"reterminal_e1001",i=p?.deviceName||"Layout 1",r=p?.deviceModel||p?.settings?.device_model||"reterminal_e1001";b.log(`[handleUpdateLayoutFromSnippetBox] Preserving context - ID: ${o}, Name: ${i}`);const s=Xt(n);if(!s)throw new Error("Could not parse layout from YAML");s.device_id=o,s.name=i,s.device_model=r,s.settings||(s.settings={}),s.settings.device_model=r,s.settings.device_name=i;const a=p?.settings?.dark_mode||!1;s.settings.dark_mode=a,t.suppressSnippetUpdate=!0,t.snippetDebounceTimer&&(clearTimeout(t.snippetDebounceTimer),t.snippetDebounceTimer=null),t.hasPendingManualSnippetChanges=!1,de(s),setTimeout(()=>{t.suppressSnippetUpdate=!1},1500),T("Layout updated from YAML","success"),(n.includes("lambda:")||n.includes("script:"))&&setTimeout(()=>{T("Note: Custom C++ (lambda/script) may not fully preview.","warning",4e3)},800)}catch(o){b.error("Update layout failed:",o),T(`Update failed: ${Dn(o)}`,"error"),t.suppressSnippetUpdate=!1}}}function X(t){return document.getElementById(t)}function oe(t){return document.getElementById(t)}function ye(t){return document.getElementById(t)}function Ke(t){return t instanceof Error?t.message:String(t)}class Qs{constructor(e){this.adapter=e,this.highlighter=new Vr,this.suppressSnippetUpdate=!1,this.snippetDebounceTimer=null,this.lastGeneratedYaml="",this.hasPendingManualSnippetChanges=!1,this.isHighlighted=localStorage.getItem("esphome_designer_yaml_highlight")!=="false",this.init()}init(){this.bindEvents(),this.setupAutoUpdate(),this.setupScrollSync(),this.updateSnippetBox()}bindEvents(){const e=X("fullscreenSnippetBtn");e&&e.addEventListener("click",()=>{this.openSnippetModal()});const n=X("snippetFullscreenClose");n&&n.addEventListener("click",()=>{const h=ye("snippetFullscreenModal");h&&h.classList.add("hidden")});const o=X("importSnippetConfirm");o&&o.addEventListener("click",async()=>{await this.handleImportSnippet()});const i=X("updateLayoutBtn");i&&i.addEventListener("click",async()=>{const h=i.querySelector(".mdi"),g=h?.className||"";h&&(h.className="mdi mdi-loading mdi-spin"),i.disabled=!0;try{await this.handleUpdateLayoutFromSnippetBox(),h&&(h.className="mdi mdi-check",setTimeout(()=>{h.className=g},1500))}catch{h&&(h.className="mdi mdi-alert-circle-outline",setTimeout(()=>{h.className=g},1500))}finally{i.disabled=!1}});const r=X("copySnippetBtn");r&&r.addEventListener("click",async()=>{this.copySnippetToClipboard(r)});const s=X("copyLambdaBtn");s&&s.addEventListener("click",async()=>{this.copyLambdaToClipboard(s)});const a=X("copyOEPLServiceBtn");a&&a.addEventListener("click",()=>{this.copyOEPLServiceToClipboard(a)});const l=X("copyODPServiceBtn");l&&l.addEventListener("click",()=>{this.copySnippetToClipboard(l)});const c=X("toggleYamlBtn"),d=document.querySelector(".code-panel");c&&d&&(localStorage.getItem("esphome_designer_yaml_collapsed")==="true"&&d.classList.add("collapsed"),c.addEventListener("click",()=>{const g=d.classList.toggle("collapsed");localStorage.setItem("esphome_designer_yaml_collapsed",String(g)),pt(new Event("resize"))}));const u=X("toggleHighlightBtn");document.querySelector(".snippet-container"),u&&(document.querySelectorAll(".snippet-container").forEach(h=>{h.classList.toggle("highlighted",this.isHighlighted)}),document.querySelectorAll('[id*="ToggleHighlightBtn"]').forEach(h=>{h.classList.toggle("active",this.isHighlighted)}),u.addEventListener("click",()=>{this.isHighlighted=!this.isHighlighted,localStorage.setItem("esphome_designer_yaml_highlight",String(this.isHighlighted)),document.querySelectorAll(".snippet-container").forEach(h=>{h.classList.toggle("highlighted",this.isHighlighted)}),document.querySelectorAll('[id*="ToggleHighlightBtn"]').forEach(h=>{h.classList.toggle("active",this.isHighlighted)}),this.isHighlighted&&this.updateHighlightLayer()}));const f=oe("snippetBox");f&&f.addEventListener("input",()=>{this.hasPendingManualSnippetChanges=f.value.trim()!==this.lastGeneratedYaml.trim(),this.isHighlighted&&this.updateHighlightLayer()}),D(Mn,()=>{this.isHighlighted&&this.updateHighlightLayer()})}setupScrollSync(){const e=oe("snippetBox"),n=ye("highlightLayer");e&&n&&e.addEventListener("scroll",()=>{n.scrollTop=e.scrollTop,n.scrollLeft=e.scrollLeft})}setupAutoUpdate(){G(E.STATE_CHANGED,()=>{this.suppressSnippetUpdate||this.updateSnippetBox()}),G(E.SELECTION_CHANGED,e=>{const n=e&&e.widgetIds?e.widgetIds:[];typeof Ie=="function"&&Ie(n)})}updateHighlightLayer(){if(!this.isHighlighted)return;const e=oe("snippetBox"),n=ye("highlightLayer");if(e&&n){const r=Re()?Ge():null;n.innerHTML=this.highlighter.highlight(e.value,r)}const o=ye("snippetFullscreenHighlight"),i=ye("snippetFullscreenContent");if(o&&i){const r=i.querySelector("textarea");if(r){const s=Re()?Ge():null;o.innerHTML=this.highlighter.highlight(r.value,s)}}}updateSnippetBox(){const e=oe("snippetBox");e&&(this.snippetDebounceTimer&&clearTimeout(this.snippetDebounceTimer),this.snippetDebounceTimer=setTimeout(()=>{if(!this.suppressSnippetUpdate){if(this.hasPendingManualSnippetChanges){b.log("[SnippetManager] Preserving pending YAML edits; skipping auto-regeneration.");return}try{const o=(p?p.selectedWidgetIds:[]).length>1,i=this.adapter?.constructor?.name||"";Jr(i);const r=p?p.getPagesPayload():{pages:[]},s=JSON.parse(JSON.stringify(r));this.adapter.generate(s).then(a=>{this.lastGeneratedYaml=a,this.hasPendingManualSnippetChanges=!1,e.value=a,this.isHighlighted&&this.updateHighlightLayer();const l=p?p.selectedWidgetIds:[];typeof Ie=="function"&&Ie(l)}).catch(a=>{b.error("Error generating snippet via adapter:",a),e.value="# Error generating YAML (adapter): "+Ke(a),this.isHighlighted&&this.updateHighlightLayer()})}catch(n){b.error("Error generating snippet:",n),e.value="# Error generating YAML: "+Ke(n),this.isHighlighted&&this.updateHighlightLayer()}}},50))}openSnippetModal(){return Qr(this)}async handleImportSnippet(){return es()}async handleUpdateLayoutFromSnippetBox(){return ts(this)}async copySnippetToClipboard(e){const n=oe("snippetBox");if(!n)return;const o=n.value||"";try{await Ve(o),T("Snippet copied to clipboard","success"),Xe(e,"Copied!")}catch(i){b.error("Copy failed:",i),T("Unable to copy snippet","error")}}async copyLambdaToClipboard(e){const n=oe("snippetBox");if(!n)return;const o=n.value||"";try{const i=Xr(o);await Ve(i),T("Display lambda copied to clipboard","success"),Xe(e,"Copied!")}catch(i){b.error("Copy lambda failed:",i),T(Ke(i)||"Unable to copy lambda","error")}}async copyOEPLServiceToClipboard(e){const n=oe("snippetBox");if(!n)return;const o=n.value||"";try{const i=JSON.parse(o),r=Kr(i,p.settings);await Ve(r),T("HA Service call copied!","success"),Xe(e,"Copied!",2e3)}catch(i){b.error("Failed to format/copy OEPL service:",i),T("Failed to format service call","error")}}}class _e{constructor(){this.init()}init(){typeof globalThis.addEventListener=="function"&&globalThis.addEventListener("keydown",e=>this.handleKeyDown(e))}handleKeyDown(e){const n=p;if(!n){b.error("KeyboardHandler: AppState not found!");return}const o=n.selectedWidgetIds.length>0,i=e.target instanceof HTMLElement?e.target:null,r=_e.isInput(i),s=_e.hasNativeTextSelection(i);if(e.shiftKey&&e.code==="Space"){i&&_e.isInput(i)&&i.blur(),e.preventDefault(),we&&we.open();return}if((e.key==="Delete"||e.key==="Backspace")&&o){if(r)return;e.preventDefault(),this.deleteWidget(null);return}if((e.ctrlKey||e.metaKey)&&e.key&&e.key.toLowerCase()==="c"){if(r||s)return;e.preventDefault(),this.copyWidget();return}if((e.ctrlKey||e.metaKey)&&e.key&&e.key.toLowerCase()==="v"){if(r)return;e.preventDefault(),this.pasteWidget();return}if((e.ctrlKey||e.metaKey)&&e.key&&e.key.toLowerCase()==="z"&&!e.shiftKey){if(r)return;e.preventDefault(),n.isUndoRedoInProgress=!0,n.undo(),setTimeout(()=>{n.isUndoRedoInProgress=!1},100);return}if((e.ctrlKey||e.metaKey)&&e.key&&(e.key.toLowerCase()==="y"||e.key.toLowerCase()==="z"&&e.shiftKey)){if(r)return;e.preventDefault(),n.isUndoRedoInProgress=!0,n.redo(),setTimeout(()=>{n.isUndoRedoInProgress=!1},100);return}if((e.ctrlKey||e.metaKey)&&e.key&&e.key.toLowerCase()==="l"&&o){e.preventDefault();const l=n.getSelectedWidgets().every(c=>c.locked);n.updateWidgets(n.selectedWidgetIds,{locked:!l})}if((e.ctrlKey||e.metaKey)&&e.key&&e.key.toLowerCase()==="a"&&e.target instanceof HTMLElement&&!_e.isInput(e.target)&&!s){e.preventDefault(),n.selectAllWidgets();return}if(e.key&&e.key.toLowerCase()==="g"&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey&&e.target instanceof HTMLElement&&e.target.tagName!=="INPUT"&&e.target.tagName!=="TEXTAREA"){e.preventDefault();const a=!n.showGrid;if(n.setShowGrid(a),a){n.setShowDebugGrid(!1);const c=document.getElementById("debugGridToggleBtn");c&&c.classList.remove("active")}const l=document.getElementById("gridToggleBtn");l&&l.classList.toggle("active",a),L(E.STATE_CHANGED),b.log(`[Keyboard] Grid toggled: ${a}`);return}if(e.key&&e.key.toLowerCase()==="d"&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey&&e.target instanceof HTMLElement&&e.target.tagName!=="INPUT"&&e.target.tagName!=="TEXTAREA"){e.preventDefault();const a=!n.showDebugGrid;if(n.setShowDebugGrid(a),a){n.setShowGrid(!1);const c=document.getElementById("gridToggleBtn");c&&c.classList.remove("active")}const l=document.getElementById("debugGridToggleBtn");l&&l.classList.toggle("active",a),L(E.STATE_CHANGED),b.log(`[Keyboard] Debug mode toggled: ${a}`);return}if(e.key&&e.key.toLowerCase()==="r"&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey&&e.target instanceof HTMLElement&&e.target.tagName!=="INPUT"&&e.target.tagName!=="TEXTAREA"){e.preventDefault();const a=!n.showRulers;n.setShowRulers(a);const l=document.getElementById("rulersToggleBtn");l&&l.classList.toggle("active",a),b.log(`[Keyboard] Rulers toggled: ${a}`);return}e.key==="Escape"&&(document.activeElement instanceof HTMLElement&&(document.activeElement.tagName==="INPUT"||document.activeElement.tagName==="TEXTAREA")&&document.activeElement.blur(),n.selectedWidgetIds.length>0&&(n.selectWidgets([]),L(E.STATE_CHANGED)))}static isInput(e){return!!(e instanceof HTMLElement&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable))}static hasNativeTextSelection(e){if(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement){const n=e.selectionStart??0;return(e.selectionEnd??0)>n}try{const n=globalThis.getSelection?.();return!!n&&!n.isCollapsed&&n.toString().trim().length>0}catch{return!1}}deleteWidget(e){const n=p;n&&n.deleteWidget(e)}copyWidget(){const e=p;e&&e.copyWidget()}pasteWidget(){const e=p;e&&e.pasteWidget()}}const ns=`<header class="main-header" role="banner">
  <div class="main-header-title">
    <img src="assets/logo_header.png" alt="ESPHome Designer" class="logo-image">
    <span><small style="opacity: 0.5; margin-left: 8px;">v1.0.0 RC9.2</small> <span id="currentLayoutDevice"
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
`,is=`    <aside class="sidebar" role="complementary" aria-label="Editor Sidebar">
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
    </aside>`,os=`      <div class="code-panel">
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
      </div>`,rs=`    <aside class="right-panel" role="complementary" aria-label="Widget Properties">
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
    </aside>`,ss=`<!-- Modals -->
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
`,as=""+new URL("logo_header-CUGdaeC6.png",import.meta.url).href,ls=["header-placeholder","sidebar-placeholder","code-panel-placeholder","properties-panel-placeholder","modals-placeholder"],ds=[".header-shell",".sidebar-shell",".code-shell",".properties-shell",".modal-shell"];function ve(t,e){const n=document.getElementById(t);n?n.outerHTML=e:console.warn(`[UI Injection] Placeholder #${t} not found in index.html.`)}function On(){return ls.some(t=>document.getElementById(t))}function cs(){return ds.some(t=>document.querySelector(t))}function ps(){if(b.log("[UI Injection] Loading modular UI components..."),!On()&&cs()){b.log("[UI Injection] Construction complete.");return}let t=ns.replace("assets/logo_header.png",as);ve("header-placeholder",t),ve("sidebar-placeholder",is),ve("code-panel-placeholder",os),ve("properties-panel-placeholder",rs),ve("modals-placeholder",ss),b.log("[UI Injection] Construction complete.")}On()&&ps();const wt="__ESPHOME_DESIGNER_BOOT_PROMISE__";function Hn(t=globalThis){return t.ESPHomeDesigner=t.ESPHomeDesigner||{},t.ESPHomeDesigner}function ea(t=document){return!!(t.getElementById("header-placeholder")||t.querySelector(".app-content")||t.getElementById("widgetPalette")||t.getElementById("canvas")||t.querySelector("[data-esphome-designer-panel-root]"))}function ta(t=document){return!!(t.getElementById("header-placeholder")||t.getElementById("sidebar-placeholder")||t.getElementById("code-panel-placeholder")||t.getElementById("properties-panel-placeholder")||t.getElementById("modals-placeholder"))}function na(t,e=globalThis){const n=Hn(e);n.app=t,n.ui={sidebar:t.sidebar,canvas:t.canvas,properties:t.propertiesPanel}}function ia(t,e=globalThis){const n=Hn(e);n.state=t}function oa(t=globalThis){return t[wt]||null}function ra(t,e=globalThis){return e[wt]=t,t}function sa(t=globalThis){delete t[wt]}function aa({label:t,load:e,create:n}){let o=null,i=null;return async()=>{if(o)return o;i||(i=Promise.resolve(e()).then(async s=>{const a=await n(s);return o=a,b.log(`[App] ${t} lazy-loaded`),a}).catch(s=>{throw i=null,s}));const r=await i;return o=r,r}}const Gn={getColorConst:t=>{if(!t)return"COLOR_BLACK";const e=t.toLowerCase();if(e==="theme_auto")return"color_on";if(e==="theme_auto_inverse"||e==="transparent")return"color_off";if(e.startsWith("#")&&e.length===7){const n=parseInt(e.substring(1,3),16),o=parseInt(e.substring(3,5),16),i=parseInt(e.substring(5,7),16);return`Color(${n}, ${o}, ${i})`}return Qt[e]||"COLOR_BLACK"},getAlignX:(t,e,n)=>t.includes("LEFT")?`${e}`:t.includes("RIGHT")?`${e} + ${n}`:`${e} + ${n}/2`,getAlignY:(t,e,n)=>t.includes("TOP")?`${e}`:t.includes("BOTTOM")?`${e} + ${n}`:`${e} + ${n}/2`,sanitize:t=>t?t.replace(/"/g,'\\"'):"",addDitherMask:(t,e,n,o,i,r,s,a=0)=>{if(!n||!e)return;const l=e.toLowerCase();let c=l==="gray"||l==="grey";if(!c&&l.startsWith("#")&&l.length===7){const d=parseInt(l.substring(1,3),16),u=parseInt(l.substring(3,5),16),f=parseInt(l.substring(5,7),16);Math.abs(d-u)<15&&Math.abs(u-f)<15&&d>40&&d<210&&(c=!0)}c&&t.push(`          apply_grey_dither_mask(${Math.round(o)}, ${Math.round(i)}, ${Math.round(r)}, ${Math.round(s)});`)},isGrayColor:t=>{if(!t)return!1;const e=t.toLowerCase();if(e==="gray"||e==="grey")return!0;if(e.startsWith("#")&&e.length===7){const n=parseInt(e.substring(1,3),16),o=parseInt(e.substring(3,5),16),i=parseInt(e.substring(5,7),16);if(Math.abs(n-o)<15&&Math.abs(o-i)<15&&n>40&&n<210)return!0}return!1},addDitherMaskForText:(t,e,n,o,i,r,s)=>!n||!Gn.isGrayColor(e)?!1:(t.push(`        apply_grey_dither_to_text(${Math.round(o)}, ${Math.round(i)}, ${Math.round(r)}, ${Math.round(s)});`),!0),getIconCode:t=>{if(!t||!Se)return null;const e=Se.find(n=>n.name===t);return e?e.code:null}},ct=globalThis;ct.ESPHomeDesigner=ct.ESPHomeDesigner||{};ct.ESPHomeDesigner.utils=Gn;function us(){const t=p.getPagesPayload(),e=JSON.stringify(t,null,2),n=new Blob([e],{type:"application/json"}),o=URL.createObjectURL(n),i=document.createElement("a");i.href=o,i.download=`reterminal_layout_${Date.now()}.json`,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(o)}function hs(t){if(!t)return;const e=new FileReader;e.onload=n=>{try{const o=n.target,i=o?o.result:null;if(typeof i!="string")throw new Error("Invalid file content");const r=JSON.parse(i);de(r)}catch(o){b.error("Failed to parse layout file:",o),alert("Error parsing layout file. Please ensure it is a valid JSON file.")}},e.readAsText(t)}function gs(t){const e=t.target,n=e?.files?e.files[0]:null;n&&hs(n),e&&(e.value="")}function la(t,e){if(e)try{if(localStorage.getItem("reterminal-editor-theme")==="light"){t.updateSettings({editor_light_mode:!0}),e.applyEditorTheme(!0);return}e.applyEditorTheme(!1)}catch(n){b.log("Could not load theme preference:",n)}}async function da({loadFromLocalStorage:t,refreshAdapter:e}){try{R()?(b.log("HA Backend detected attempt. Loading layout..."),await Oi(),await le()):(b.log("Running in standalone/offline mode."),t()),e()}catch(n){b.error("[App] Failed to load from backend, falling back to local storage:",n),t(),e()}}function ca({editorSettings:t,openDeviceSettings:e,openAiPrompt:n,openLayoutManager:o}){const i=document.getElementById("saveLayoutBtn");i&&i.addEventListener("click",async()=>{const u=f=>{us(),T(f,"info")};if(!R()){u("Layout downloaded locally");return}try{if(await un()){T("Layout saved to Home Assistant","success");return}if(!Qe()){u("Home Assistant save unavailable; layout downloaded locally instead");return}T("Save failed: Home Assistant backend unavailable","error")}catch(f){if(!Qe()){u("Home Assistant save failed; layout downloaded locally instead");return}T(`Save failed: ${f.message}`,"error")}});const r=document.getElementById("loadLayoutBtn");r&&r.addEventListener("change",gs);const s=document.getElementById("importLayoutBtn");s&&r&&s.addEventListener("click",()=>{r.click()});const a=document.getElementById("deviceSettingsBtn");a?(b.log("Device Settings button found, binding click listener."),a.addEventListener("click",async()=>{b.log("Device Settings button clicked."),await e()})):b.error("Device Settings button NOT found in DOM.");const l=document.getElementById("editorSettingsBtn");l&&t&&l.addEventListener("click",()=>{t.open()});const c=document.getElementById("aiPromptBtn");c&&c.addEventListener("click",async()=>{await n()});const d=document.getElementById("manageLayoutsBtn");d&&d.addEventListener("click",async()=>{await o()})}function pa(t,e){setTimeout(()=>{t&&(b.log("[App] Forcing initial canvas centering..."),t.focusPage(e,!1))},100)}function Rn(t){if(!t)return 3600;if(typeof t=="number")return t;const e=String(t);if(/^\d+$/.test(e))return parseInt(e,10);const n=e.match(/^(\d+)([a-z]+)$/i);if(!n)return 3600;const o=parseInt(n[1],10),i=n[2].toLowerCase();return i.startsWith("s")?o:i.startsWith("m")?o*60:i.startsWith("h")?o*3600:i.startsWith("d")?o*86400:o}function Ut(t,e,n,o){const i=[];for(let s=0;s<50;s++){const a=s/49*t,l=s/50,c=Math.sin(l*Math.PI*2),d=(Math.random()-.5)*.2;let u=.5+c*.3+d;u=Math.max(.1,Math.min(.9,u));const f=e-u*e;i.push({x:a,y:f})}return i}function ua(t,e,n,o,i,r){if(!i||i.length===0)return Ut(t,e);const s=[],a=Rn(r),c=Date.now()-a*1e3,d=i.map(m=>({time:new Date(m.last_changed||m.when||Date.now()).getTime(),value:parseFloat(m.state)})).filter(m=>!isNaN(m.value));if(d.length===0)return Ut(t,e);d.sort((m,_)=>m.time-_.time);let u=n,f=o;const h=d.map(m=>m.value),g=Math.min(...h),y=Math.max(...h);if(n===o||isNaN(n)&&isNaN(o)||n===0&&o===100&&(g>100||y<0)){u=g,f=y;const m=(f-u)*.1||1;u-=m,f+=m}const v=f-u||1;return d.forEach(m=>{const _=(m.time-c)/(a*1e3)*t;let x=(m.value-u)/v;x=Math.max(-.1,Math.min(1.1,x));const I=e-x*e;_>=-10&&_<=t+10&&s.push({x:_,y:I})}),s.length>0&&s[s.length-1].x<t-1&&s.push({x:t,y:s[s.length-1].y}),s}function ha(t,e,n,o,i,r="rgba(0,0,0,0.1)"){const s=document.createElementNS("http://www.w3.org/2000/svg","g");s.setAttribute("stroke",r),s.setAttribute("stroke-dasharray","2,2"),s.setAttribute("stroke-width","1");const a=4,l=4;for(let c=1;c<a;c++){const d=c/a*e,u=document.createElementNS("http://www.w3.org/2000/svg","line");u.setAttribute("x1",String(d)),u.setAttribute("y1","0"),u.setAttribute("x2",String(d)),u.setAttribute("y2",String(n)),s.appendChild(u)}for(let c=1;c<l;c++){const d=c/l*n,u=document.createElementNS("http://www.w3.org/2000/svg","line");u.setAttribute("x1","0"),u.setAttribute("y1",String(d)),u.setAttribute("x2",String(e)),u.setAttribute("y2",String(d)),s.appendChild(u)}t.appendChild(s)}function ga(t,e,n,o,i,r,s,a,l,c="#666"){if(!t)return;t.querySelectorAll(`.graph-axis-label[data-widget-id="${l}"]`).forEach(x=>x.remove());const u=s-r,f=4,h=parseInt(t.style.width,10)||800,g=parseInt(t.style.height,10)||480,y=e<40,v=n+i+20>g;for(let x=0;x<=f;x++){const I=r+u*(x/f),C=n+i-x/f*i,S=document.createElement("div");S.className="graph-axis-label",S.dataset.widgetId=l;const w=S.style;w.position="absolute",y?(w.left=`${e+4}px`,w.textAlign="left"):(w.left=`${e-4}px`,w.transform="translateX(-100%)",w.textAlign="right"),w.top=`${C-6}px`,w.fontSize="10px",w.color=c,w.opacity=y?"0.7":"1.0",w.pointerEvents="none",w.zIndex="10",S.textContent=I.toFixed(1),t.appendChild(S)}const m=Rn(a),_=2;for(let x=0;x<=_;x++){const I=x/_,C=e+o*I;let S="";if(x===_)S="Now";else{const M=m*(1-I);M>=3600?S=`-${(M/3600).toFixed(1)}h`:M>=60?S=`-${(M/60).toFixed(0)}m`:S=`-${M.toFixed(0)}s`}const w=document.createElement("div");w.className="graph-axis-label",w.dataset.widgetId=l;const k=w.style;k.position="absolute",k.left=`${C}px`,v?k.top=`${n+i-14}px`:k.top=`${n+i+4}px`,k.fontSize="10px",k.color=c,k.opacity=v?"0.7":"1.0",k.pointerEvents="none",k.zIndex="10",C<20?(k.transform="none",k.textAlign="left"):C>h-20?(k.transform="translateX(-100%)",k.textAlign="right"):(k.transform="translateX(-50%)",k.textAlign="center"),w.textContent=S,t.appendChild(w)}}const Wn=window;Wn.LAYOUT={WIDGET:{SMALL:{W:100,H:20},MEDIUM:{W:200,H:60},LARGE:{W:200,H:100}},FONT:{SIZE:{XS:12,S:14,M:16,L:20,XL:28,XXL:40},DEFAULT:{LABEL:14,VALUE:20,TITLE:28,DATE:16}},GRID:{GAP:10,MARGIN:10}};Object.freeze(Wn.LAYOUT);function We(){const t=document.getElementById("resizer-left"),e=document.getElementById("resizer-right"),n=document.querySelector(".sidebar"),o=document.querySelector(".right-panel");if(!document.querySelector(".app-content")){setTimeout(We,100);return}if(!t||!e||!n||!o){b.warn("[Splitters] Layout elements not found, retrying..."),setTimeout(We,500);return}b.log("[Splitters] Initializing draggable panels...");function r(l,c,d){let u=0,f=0;l.addEventListener("mousedown",function(h){d==="vertical"?(u=h.clientX,f=c.offsetWidth,document.body.style.cursor="col-resize"):(u=h.clientY,f=c.offsetHeight,document.body.style.cursor="row-resize"),l.classList.add("dragging"),document.body.style.userSelect="none";function g(v){let m;if(d==="vertical"){m=v.clientX-u,l.id==="resizer-right"&&(m=-m);const _=f+m,x=parseInt(getComputedStyle(c).minWidth)||100,I=parseInt(getComputedStyle(c).maxWidth)||800;_>=x&&_<=I&&(c.style.width=_+"px")}else{m=u-v.clientY;const _=f+m,x=parseInt(getComputedStyle(c).minHeight)||50,I=parseInt(getComputedStyle(c).maxHeight)||800;_>=x&&_<=I&&(c.style.height=_+"px")}pt(new Event("resize"))}function y(){l.classList.remove("dragging"),document.body.style.cursor="default",document.body.style.userSelect="",z("mousemove",g),z("mouseup",y)}D("mousemove",g),D("mouseup",y)})}const s=document.getElementById("resizer-bottom"),a=document.querySelector(".code-panel");r(t,n,"vertical"),r(e,o,"vertical"),s&&a&&r(s,a,"horizontal")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",We):We();async function ma(t){if(!R())return b.log("[HardwareImport] Offline mode detected. Parsing locally..."),await ms(t);try{const e=await t.text(),n=`${W}/hardware/upload`,o={filename:t.name,content:e};b.log("[HardwareImport] Uploading via JSON:",t.name);const i=await B(n,{method:"POST",headers:N(),body:JSON.stringify(o)});if(!i.ok){const s=await i.json().catch(()=>({}));throw new Error(s.message||s.error||`Upload failed: ${i.status}`)}const r=await i.json();return T("Hardware template uploaded successfully!","success"),Le&&await Le(),r}catch(e){const n=e instanceof Error?e.message:String(e||"");if(n.includes("Failed to fetch")||n.includes("NetworkError")){b.warn("[HardwareImport] Network error during upload (likely benign):",n),T("Generating profile, refreshing list...","info");try{Le&&await Le()}catch(o){b.warn("[HardwareImport] Profile refresh also failed:",o)}return{success:!0,filename:t.name,note:"network_error_suppressed"}}else throw b.error("Hardware upload failed:",e),T(`Upload failed: ${n}`,"error"),e}}async function ms(t){return new Promise((e,n)=>{const o=new FileReader;o.onload=async i=>{const r=i.target?.result;if(typeof r!="string"){n(new Error("Failed to read file content"));return}try{if(!r.includes("__LAMBDA_PLACEHOLDER__"))throw new Error("Invalid template: Missing __LAMBDA_PLACEHOLDER__");const s=mn(r,t.name);b.log("[HardwareImport] Parsed offline profile:",s),A&&(A[s.id]=s),T(`Imported ${s.name} (Offline Mode)`,"success"),Fi(s),L(E.DEVICE_PROFILES_UPDATED),e(s)}catch(s){const a=s instanceof Error?s.message:String(s);T(a,"error"),n(s)}},o.onerror=()=>n(new Error("File read failed")),o.readAsText(t)})}const Nn=[{id:"core",name:"Core Widgets",expanded:!0,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><rect x="4" y="4" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="14" y="4" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="4" y="14" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="14" y="14" width="6" height="6" rx="1" fill="currentColor"/></svg>',widgets:[{type:"label",label:"Floating text",tag:"Text",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><text x="4" y="17" font-size="14" font-weight="bold" fill="currentColor">Aa</text></svg>'},{type:"sensor_text",label:"Sensor text",tag:"Entity",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="8" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2" /><path d="M11 12h9M14 9l3 3-3 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"datetime",label:"Date & Time",tag:"Time",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2" /><path d="M12 7v5l3 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"icon",label:"MDI icon",tag:"Icon",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 2L9 9H2l6 4.5L5.5 22 12 17l6.5 5-2.5-8.5L22 9h-7z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" /></svg>'},{type:"weather_icon",label:"Weather icon",tag:"Icon",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="10" r="4" fill="none" stroke="currentColor" stroke-width="2" /><path d="M12 2v2M12 16v2M4 10H2M22 10h-2M5.6 4.6l1.4 1.4M17 6l1.4-1.4M5.6 15.4l1.4-1.4M17 14l1.4 1.4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"image",label:"Image",tag:"Media",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="3" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" /><path d="M21 15l-5-5L11 15l-3-3-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"online_image",label:"Puppet image",tag:"Remote",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="14" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M17 10l4-4M21 10V6h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><circle cx="7" cy="8" r="1.5" fill="currentColor" /><path d="M17 13l-4-4-4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'}]},{id:"shapes",name:"Shapes",expanded:!0,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><circle cx="7" cy="7" r="4" fill="none" stroke="currentColor" stroke-width="2"/><rect x="13" y="13" width="7" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><path d="M17 4l3 5h-6z" fill="none" stroke="currentColor" stroke-width="2"/></svg>',widgets:[{type:"shape_rect",label:"Rectangle",tag:"Shape",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"rounded_rect",label:"Rounded Rect",tag:"Shape",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="6" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"shape_circle",label:"Circle",tag:"Shape",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"line",label:"Line",tag:"Shape",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'}]},{id:"opendisplay",name:"OpenDisplay / OEPL",expanded:!1,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><rect x="3" y="4" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" stroke-width="1" /><circle cx="6" cy="6.5" r="1" fill="currentColor" /><circle cx="9" cy="6.5" r="1" fill="currentColor" /></svg>',widgets:[{type:"odp_multiline",label:"Multiline Text",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><line x1="4" y1="12" x2="18" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><line x1="4" y1="17" x2="14" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"odp_rectangle_pattern",label:"Rectangle Pattern",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5" /><rect x="11" y="4" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5" /><rect x="3" y="12" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5" /><rect x="11" y="12" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5" /></svg>'},{type:"odp_polygon",label:"Polygon",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><polygon points="12,3 21,10 18,20 6,20 3,10" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"odp_ellipse",label:"Ellipse",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="9" ry="6" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"odp_arc",label:"Arc",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M6 18 A 9 9 0 0 1 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"odp_icon_sequence",label:"Icon Sequence",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="5" cy="12" r="3" fill="currentColor" /><circle cx="12" cy="12" r="3" fill="currentColor" /><circle cx="19" cy="12" r="3" fill="currentColor" /></svg>'},{type:"odp_plot",label:"Sensor Plot",tag:"ODP",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M3 3v18h18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M6 15l4-6 4 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"odp_debug_grid",label:"Debug Grid",tag:"Debug",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M3 3v18h18M3 9h18M3 15h18M9 3v18M15 3v18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'}]},{id:"advanced",name:"Advanced",expanded:!0,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" fill="none" stroke="currentColor" stroke-width="2"/></svg>',widgets:[{type:"graph",label:"Graph / Chart",tag:"Data",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M3 3v18h18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M7 14l4-4 4 4 5-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"progress_bar",label:"Progress bar",tag:"Entity",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="9" width="20" height="6" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><rect x="3" y="10" width="12" height="4" rx="1" fill="currentColor" /></svg>'},{type:"qr_code",label:"QR Code",tag:"Tools",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" fill="currentColor" /><rect x="14" y="3" width="7" height="7" fill="currentColor" /><rect x="3" y="14" width="7" height="7" fill="currentColor" /><rect x="14" y="14" width="3" height="3" fill="currentColor" /></svg>'},{type:"calendar",label:"Calendar",tag:"Events",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" stroke-width="2" /></svg>'},{type:"weather_forecast",label:"Weather Forecast",tag:"Forecast",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="10" r="4" fill="none" stroke="currentColor" stroke-width="2" /><path d="M12 2v2M12 16v2M4 10H2M22 10h-2M5.6 4.6l1.4 1.4M17 6l1.4-1.4M5.6 15.4l1.4-1.4M17 14l1.4 1.4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"quote_rss",label:"Quote / RSS",tag:"Info",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M6 17h3l2-4V7H5v6h3M13 17h3l2-4V7h-6v6h3" fill="none" stroke="currentColor" stroke-width="2" /></svg>'}]},{id:"inputs",name:"Inputs",expanded:!1,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><path d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zM16.06 17H15v-1l-1-1h-6l-1 1v1H5.94c-.58 0-1.06-.48-1.06-1.06V7.5c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5v8.44c0 .58-.48 1.06-1.06 1.06z" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="12" cy="13" r="1.5" fill="currentColor" /></svg>',widgets:[{type:"touch_area",label:"Touch Area",tag:"Input",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="5" y="5" width="14" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="2,2" /><circle cx="12" cy="12" r="3" fill="currentColor" /></svg>'},{type:"nav_next_page",label:"Next Page",tag:"Nav",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M10 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"nav_previous_page",label:"Prev Page",tag:"Nav",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M14 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"nav_reload_page",label:"Reload Page",tag:"Nav",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M23 4v6h-6M1 20v-6h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"template_nav_bar",label:"Navigation Bar",tag:"Template",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M6 10l-2 2 2 2M18 10l2 2-2 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 12h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'}]},{id:"ondevice",name:"On Device Sensors",expanded:!0,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 9h6v6H9z" fill="currentColor"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M7 2v2M7 20v2M17 2v2M17 20v2M2 7h2M20 7h2M2 17h2M20 17h2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',widgets:[{type:"battery_icon",label:"Battery",tag:"Sensor",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="7" width="18" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><rect x="4" y="9" width="8" height="6" fill="currentColor" /><path d="M20 10h2v4h-2" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"wifi_signal",label:"WiFi Signal",tag:"Sensor",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 3C7.5 3 3.8 5.4 2 9l2 2c1.3-2.5 4-4.2 8-4.2s6.7 1.7 8 4.2l2-2c-1.8-3.6-5.5-6-10-6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M12 9c-2.7 0-5.1 1.4-6.5 3.5L7 14c1-1.4 2.8-2.3 5-2.3s4 .9 5 2.3l1.5-1.5C17.1 10.4 14.7 9 12 9z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><circle cx="12" cy="18" r="2" fill="currentColor" /></svg>'},{type:"ondevice_temperature",label:"Temperature",tag:"SHT4x",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 2a2 2 0 00-2 2v10.1a4 4 0 104 0V4a2 2 0 00-2-2z" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="12" cy="18" r="2" fill="currentColor" /></svg>'},{type:"ondevice_humidity",label:"Humidity",tag:"SHT4x",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"template_sensor_bar",label:"On-Board Sensor Bar",tag:"New",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M5 12h2M10 12h2M15 12h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'}]},{id:"lvgl",name:"LVGL Components",expanded:!1,icon:'<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" /></svg>',widgets:[{type:"lvgl_obj",label:"Base Object",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_label",label:"Label",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><text x="4" y="17" font-size="14" font-weight="bold" fill="currentColor">Aa</text></svg>'},{type:"lvgl_line",label:"LVGL Line",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"lvgl_button",label:"Button",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="8" rx="2" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="2" /><text x="12" y="16.5" font-size="8" text-anchor="middle" fill="currentColor">BTN</text></svg>'},{type:"lvgl_switch",label:"Switch",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="8" rx="4" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="16" cy="12" r="3" fill="currentColor" /></svg>'},{type:"lvgl_checkbox",label:"Checkbox",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><polyline points="9 12 11 14 15 10" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_slider",label:"Slider",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><circle cx="12" cy="12" r="3" fill="currentColor" /></svg>'},{type:"lvgl_bar",label:"Bar",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="9" width="20" height="6" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><rect x="3" y="10" width="12" height="4" rx="1" fill="currentColor" /></svg>'},{type:"lvgl_arc",label:"Arc",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M4 18 A 10 10 0 1 1 20 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"lvgl_meter",label:"Meter",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M4 18 A 10 10 0 1 1 20 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><line x1="12" y1="18" x2="16" y2="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'},{type:"lvgl_spinner",label:"Spinner",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_led",label:"LED",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" fill="currentColor" /><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_chart",label:"Chart",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><path d="M3 3v18h18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M7 14l4-4 4 4 5-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"lvgl_img",label:"Image",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="3" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" /><path d="M21 15l-5-5L11 15l-3-3-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'},{type:"lvgl_qrcode",label:"QR Code",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" fill="currentColor" /><rect x="14" y="3" width="7" height="7" fill="currentColor" /><rect x="3" y="14" width="7" height="7" fill="currentColor" /><rect x="14" y="14" width="3" height="3" fill="currentColor" /></svg>'},{type:"lvgl_dropdown",label:"Dropdown",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="8" width="20" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><polyline points="16 11 18 13 20 11" fill="currentColor" /></svg>'},{type:"lvgl_roller",label:"Roller",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="20" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><line x1="6" y1="10" x2="18" y2="10" stroke="currentColor" stroke-width="1" /><line x1="6" y1="14" x2="18" y2="14" stroke="currentColor" stroke-width="1" /></svg>'},{type:"lvgl_spinbox",label:"Spinbox",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M6 12l2-2 2 2" fill="none" stroke="currentColor" stroke-width="1" /><path d="M14 12l2 2 2-2" fill="none" stroke="currentColor" stroke-width="1" /></svg>'},{type:"lvgl_textarea",label:"Textarea",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" fill="none" stroke="currentColor" stroke-width="2" /><line x1="6" y1="8" x2="14" y2="8" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_keyboard",label:"Keyboard",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><line x1="6" y1="10" x2="8" y2="10" stroke="currentColor" stroke-width="2" /><line x1="10" y1="10" x2="12" y2="10" stroke="currentColor" stroke-width="2" /></svg>'},{type:"lvgl_buttonmatrix",label:"Btn Matrix",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="7" width="9" height="4" fill="none" stroke="currentColor" stroke-width="1" /><rect x="13" y="7" width="9" height="4" fill="none" stroke="currentColor" stroke-width="1" /><rect x="2" y="13" width="9" height="4" fill="none" stroke="currentColor" stroke-width="1" /><rect x="13" y="13" width="9" height="4" fill="none" stroke="currentColor" stroke-width="1" /></svg>'},{type:"lvgl_tabview",label:"Tabview",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><line x1="2" y1="8" x2="22" y2="8" stroke="currentColor" stroke-width="1" /></svg>'},{type:"lvgl_tileview",label:"Tileview",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="2" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2" /><rect x="13" y="2" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2" /><rect x="2" y="13" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2" /><rect x="13" y="13" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2" /></svg>'},{type:"template_nav_bar",label:"Nav Bar (Template)",tag:"Nav",icon:'<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M6 10l-2 2 2 2M18 10l2 2-2 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 12h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'}]}];function fs(t=Nn){const e=[];return t.forEach(n=>{n.widgets.forEach(o=>{e.includes(o.type)||e.push(o.type)})}),e}function ys(t,e){return e==="lvgl"?t.id==="lvgl":e==="oepl"||e==="opendisplay"?t.id==="opendisplay"||t.id==="core"||t.id==="shapes":!!t.expanded}function vs(t,e,n,o){let i=!0,r="";if(n?.supportedModes)return{isCompatible:n.supportedModes.includes(o),explanation:`Not supported in ${o} mode`};if(o==="oepl"||o==="opendisplay"){const s=o==="oepl"?!!n?.exportOEPL:!!n?.exportOpenDisplay,a=e.id==="ondevice"||e.id==="lvgl",l=t.type==="calendar"||t.type==="weather_forecast"||t.type==="graph"||t.type==="quote_rss";i=s&&!a&&!l,r=`Not supported in ${o==="oepl"?"OpenEpaperLink":"OpenDisplay"} mode`}else if(o==="lvgl"){const s=t.type.startsWith("lvgl_"),a=e.id==="inputs",l=typeof n?.exportLVGL=="function";i=s||a||l,r="Widget not compatible with LVGL mode"}else if(o==="direct"){const s=t.type.startsWith("lvgl_")||t.type.startsWith("oepl_");n?i=!!n.export&&!s:i=!s,r="Not supported in Direct rendering mode"}return{isCompatible:i,explanation:r}}function bs(t,e){const n=document.createElement("div");n.className="widget-category-header";let o='<span class="category-icon">&#8250;</span>';return t.icon&&(o+=t.icon),n.innerHTML=`
        ${o}
        <span class="category-name">${t.name}</span>
        ${t.widgets.length>0&&!e?`<span class="category-count">${t.widgets.length}</span>`:""}
    `,n}function _s(t,e,n,o,i){const r=document.createElement("div"),s=o.get(t.type),{isCompatible:a,explanation:l}=vs(t,e,s,n);r.className="item"+(a?"":" incompatible"),r.draggable=a,r.dataset.widgetType=t.type;const c=t.label||s?.name,d=t.tag?`<span class="tag">${t.tag}</span>`:"";return r.innerHTML=`
        ${t.icon}
        <span class="label">${c}</span>
        ${d}
    `,r.title=a?`Add ${c} to canvas`:l,a?r.addEventListener("dragstart",u=>{u.dataTransfer&&(u.dataTransfer.setData("application/widget-type",t.type),u.dataTransfer.setData("text/plain",t.type),u.dataTransfer.effectAllowed="copy")}):r.addEventListener("click",u=>{u.stopPropagation(),i(l,"warning")}),r}function xs(t){const{container:e,categories:n,currentMode:o,registry:i,showToast:r}=t;e.innerHTML="",n.forEach(s=>{const a=ys(s,o),l=document.createElement("div");l.className=`widget-category ${a?"expanded":""}`,l.dataset.category=s.id;const c=bs(s,a);c.addEventListener("click",()=>{l.classList.toggle("expanded")});const d=document.createElement("div");d.className="widget-category-items",s.widgets.forEach(u=>{d.appendChild(_s(u,s,o,i,r))}),l.appendChild(c),l.appendChild(d),e.appendChild(l)})}const jt=fs();async function ws(t){const e=document.getElementById(t);if(!e)return;const n=p?.settings?.renderingMode||"direct";b.log(`[Palette] Rendering palette for mode: ${n}`),e.innerHTML='<div class="palette-loading" style="padding: 20px; color: #999; text-align: center; font-size: 13px;">Loading widgets...</div>',b.log(`[Palette] Pre-loading ${jt.length} widget plugins...`),await Promise.all(jt.map(o=>j.load(o))).catch(o=>b.error("[Palette] Failed to load some plugins:",o)),xs({container:e,categories:Nn,currentMode:n,registry:j,showToast:T})}G(E.SETTINGS_CHANGED,t=>{t&&t.renderingMode!==void 0&&(b.log(`[Palette] Settings changed, refreshing palette for mode: ${t.renderingMode}`),ws("widgetPalette"))});function qt(t,e){const n=document.createElement("div");n.style.fontSize="10px",n.style.color="var(--muted)",n.style.marginBottom="6px",n.style.fontWeight="600",n.style.marginTop="8px",n.textContent=e,t.appendChild(n)}function Vt(t){const e=document.createElement("div");return e.style.display="flex",e.style.gap="4px",t.appendChild(e),e}function Ss(t,e){if(!e)return;const n=p.getSelectedWidgets();if(n.length===0){e.style.display="none";return}e.style.display="block",e.innerHTML="",qt(e,"GROUPING");const o=Vt(e),i=n.some(d=>d.type==="group"||d.parentId),r=document.createElement("button");r.className="btn btn-secondary",r.innerHTML='<i class="mdi mdi-group" style="margin-right:4px"></i>Group',r.style.flex="1",r.style.fontSize="10px",r.disabled=n.length<2||i,r.onclick=()=>p.groupSelection(),o.appendChild(r);const s=document.createElement("button");if(s.className="btn btn-secondary",s.innerHTML='<i class="mdi mdi-ungroup" style="margin-right:4px"></i>Ungroup',s.style.flex="1",s.style.fontSize="10px",s.disabled=!i,s.onclick=()=>p.ungroupSelection(),o.appendChild(s),n.length!==1)return;const a=n[0];qt(e,"LAYER ORDER");const l=Vt(e);[{label:"Front",icon:"mdi-arrange-bring-to-front",action:()=>t.moveToFront(a)},{label:"Back",icon:"mdi-arrange-send-to-back",action:()=>t.moveToBack(a)},{label:"Up",icon:"mdi-arrow-up",action:()=>t.moveUp(a)},{label:"Down",icon:"mdi-arrow-down",action:()=>t.moveDown(a)}].forEach(d=>{const u=document.createElement("button");u.className="btn btn-secondary",u.innerHTML=`<i class="mdi ${d.icon}"></i>`,u.title=d.label,u.style.flex="1",u.style.fontSize="12px",u.style.padding="4px",u.onclick=()=>d.action(),l.appendChild(u)})}function Es(t){let e=t.props?.name||t.props?.title||t.props?.text||t.title;if(!e||e===""){const o=j.get(t.type);e=o?o.name:t.type}const n=j.get(t.type)?.name;if(e===t.type||n&&e===n){const o=t.id.split("_").pop();e=`${e} (${o})`}return e}function Cs(t){return`<i class="mdi ${{text:"mdi-format-text",sensor_text:"mdi-numeric",icon:"mdi-emoticon-outline",image:"mdi-image",weather_icon:"mdi-weather-partly-cloudy",qr_code:"mdi-qrcode",line:"mdi-vector-line",lvgl_line:"mdi-vector-line",rect:"mdi-square-outline",shape_rect:"mdi-square-outline",arc:"mdi-circle-outline",shape_circle:"mdi-circle-outline",bar:"mdi-chart-gantt",button:"mdi-gesture-tap-button",checkbox:"mdi-checkbox-marked-outline",calendar:"mdi-calendar",weather_forecast:"mdi-weather-partly-cloudy",datetime:"mdi-clock-outline",graph:"mdi-chart-timeline-variant",touch_area:"mdi-fingerprint",group:"mdi-folder-outline"}[t]||"mdi-widgets-outline"}"></i>`}function ks(t,e,n,o=0){const i=document.createElement("div");i.className=`hierarchy-item ${e.hidden?"hidden-widget":""}`,o>0&&i.classList.add("child-item"),(p.selectedWidgetIds||[]).includes(e.id)&&i.classList.add("selected"),i.dataset.id=e.id,i.dataset.index=String(n),i.draggable=!e.locked,e.locked&&i.classList.add("locked"),i.style.paddingLeft=`${12+o*20}px`;const s=Cs(e.type),a=Es(e),l=e.type==="group";if(i.innerHTML=`
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
    `,l){const h=i.querySelector(".hierarchy-group-toggle");h&&h.addEventListener("click",g=>{p.updateWidget(e.id,{expanded:e.expanded===!1}),g.stopPropagation()})}const c=i.querySelector(".hierarchy-item-label");c&&c.addEventListener("click",h=>{if((p.selectedWidgetIds||[]).includes(e.id)){const g=prompt("Rename:",a);g!==null&&g!==""&&g!==a&&p.updateWidget(e.id,{title:g}),h.stopPropagation()}}),i.addEventListener("click",h=>{const g=h.ctrlKey||h.shiftKey;p.selectWidget(e.id,g),h.stopPropagation()});const d=i.querySelector(".toggle-lock");d&&d.addEventListener("click",h=>{p.updateWidget(e.id,{locked:!e.locked}),h.stopPropagation()});const u=i.querySelector(".toggle-visibility");u&&u.addEventListener("click",h=>{p.updateWidget(e.id,{hidden:!e.hidden}),h.stopPropagation()});const f=i.querySelector(".delete-widget");return f&&f.addEventListener("click",h=>{confirm(`Delete widget "${a}"?`)&&p.deleteWidget(e.id),h.stopPropagation()}),i.addEventListener("dragstart",h=>{h.dataTransfer&&(t.draggedIndex=n,i.classList.add("dragging"),h.dataTransfer.setData("application/widget-id",e.id),h.dataTransfer.effectAllowed="move")}),i.addEventListener("dragend",()=>{if(i.classList.remove("dragging"),t.draggedIndex=null,!t.listContainer)return;t.listContainer.querySelectorAll(".hierarchy-item").forEach(g=>g.classList.remove("drag-over"))}),i.addEventListener("dragover",h=>{h.dataTransfer&&(h.preventDefault(),h.dataTransfer.dropEffect="move",i.classList.add("drag-over"))}),i.addEventListener("dragleave",()=>{i.classList.remove("drag-over")}),i.addEventListener("drop",h=>{if(!h.dataTransfer)return;h.preventDefault();const g=h.dataTransfer.getData("application/widget-id"),y=i.dataset.id;if(g===y)return;const v=p.getWidgetById(y);if(!v)return;v.type==="group"?p.updateWidget(g,{parentId:y,expanded:!0}):p.updateWidget(g,{parentId:v.parentId||null});const m=parseInt(i.dataset.index||"-1",10);t.draggedIndex!==null&&p.reorderWidget(p.currentPageIndex,t.draggedIndex,m)}),i}function Is(t){const e=t.filter(o=>!o.parentId).reverse(),n=new Map;return t.forEach(o=>{o.parentId&&(n.has(o.parentId)||n.set(o.parentId,[]),n.get(o.parentId).push(o))}),{topLevel:e,childrenMap:n}}function Ls(t,e,n){const o=t.findIndex(i=>i.id===e);if(o===-1)return!1;if(n==="front"){if(o>=t.length-1)return!1;const[i]=t.splice(o,1);return t.push(i),!0}if(n==="back"){if(o===0)return!1;const[i]=t.splice(o,1);return t.unshift(i),!0}return n==="up"?o>=t.length-1?!1:([t[o],t[o+1]]=[t[o+1],t[o]],!0):n==="down"?o===0?!1:([t[o],t[o-1]]=[t[o-1],t[o]],!0):!1}class fa{constructor(){this.listContainer=null,this.header=null,this.panel=null,this.controlsContainer=null,this.draggedIndex=null,this.render=this.render.bind(this),this.highlightSelected=this.highlightSelected.bind(this)}init(){if(this.listContainer=document.getElementById("hierarchyList"),this.header=document.getElementById("hierarchyHeader"),this.panel=document.getElementById("hierarchyPanel"),!this.listContainer||!this.header||!this.panel){b.error("[HierarchyView] Required DOM elements not found");return}this.controlsContainer=document.createElement("div"),this.controlsContainer.id="hierarchyControls",this.controlsContainer.className="hierarchy-controls",this.controlsContainer.style.padding="8px 8px",this.controlsContainer.style.borderTop="1px solid var(--border-subtle)",this.panel.appendChild(this.controlsContainer),this.bindEvents(),this.render(),this.renderHeaderActions(),b.log("[HierarchyView] Initialized")}renderHeaderActions(){if(!this.header)return;let e=this.header.querySelector(".hierarchy-header-toggles");if(!e){e=document.createElement("div"),e.className="hierarchy-header-toggles";const n=this.header.querySelector(".chevron");this.header.insertBefore(e,n||null);const o=this.createHeaderToggle("mdi-lock-outline","Toggle All Locks",()=>{const r=p.getCurrentPage()?.widgets||[],s=r.every(a=>a.locked);r.forEach(a=>p.updateWidget(a.id,{locked:!s}))}),i=this.createHeaderToggle("mdi-eye-outline","Toggle All Visibility",()=>{const r=p.getCurrentPage()?.widgets||[],s=r.every(a=>a.hidden);r.forEach(a=>p.updateWidget(a.id,{hidden:!s}))});e.appendChild(o),e.appendChild(i)}}createHeaderToggle(e,n,o){const i=document.createElement("div");return i.className="h-toggle",i.title=n,i.innerHTML=`<i class="mdi ${e}"></i>`,i.onclick=r=>{r.stopPropagation(),o()},i}bindEvents(){this.header.addEventListener("click",()=>this.toggleCollapse()),G(E.STATE_CHANGED,this.render),G(E.PAGE_CHANGED,this.render),G(E.SELECTION_CHANGED,this.highlightSelected)}toggleCollapse(){if(!this.panel||!this.header)return;const e=this.panel.classList.toggle("hidden"),n=this.header.querySelector(".chevron");n&&(n.style.transform=e?"rotate(-90deg)":"rotate(0deg)")}highlightSelected(){if(!this.listContainer)return;const e=p.selectedWidgetIds||[];this.listContainer.querySelectorAll(".hierarchy-item").forEach(o=>{e.includes(o.dataset.id)?o.classList.add("selected"):o.classList.remove("selected")}),this.renderControls()}render(){if(!this.listContainer||!this.controlsContainer)return;const e=p.getCurrentPage();if(!e)return;if(this.listContainer.innerHTML="",!e.widgets||e.widgets.length===0){this.listContainer.innerHTML='<div style="font-size: 10px; color: var(--muted); text-align: center; padding: 12px;">No widgets on this page</div>',this.controlsContainer.style.display="none";return}const{topLevel:n,childrenMap:o}=Is(e.widgets),i=(r,s=0)=>{const a=e.widgets.indexOf(r),l=this.createItem(r,a,s);this.listContainer.appendChild(l);const c=o.get(r.id);c&&r.expanded!==!1&&[...c].reverse().forEach(d=>i(d,s+1))};n.forEach(r=>i(r)),this.highlightSelected(),this.renderControls()}createItem(e,n,o=0){return ks(this,e,n,o)}renderControls(){Ss(this,this.controlsContainer)}moveLayerOrder(e,n){const o=p.getCurrentPage();o&&Ls(o.widgets,e.id,n)&&p.setPages(p.pages)}moveToFront(e){this.moveLayerOrder(e,"front")}moveToBack(e){this.moveLayerOrder(e,"back")}moveUp(e){this.moveLayerOrder(e,"up")}moveDown(e){this.moveLayerOrder(e,"down")}}function ya(t){if(!t.modelInput||!A)return;const e=t.modelInput.value;b.log("[DeviceSettings] Populating dropdown with",Object.keys(A).length,"profiles"),t.modelInput.innerHTML="";const n=gt||[],o=[],i=[];Object.entries(A).forEach(([a,l])=>{l.isCustomProfile||l.isOfflineImport?i.push([a,l]):o.push([a,l])});const r=(a,l)=>{const c=document.createElement("option");c.value=a;let d=l.name||a;d=d.replace(/\s*\(Local\)\s*/gi,"").replace(/\s*\(untested\)\s*/gi,"").trim();const u=[];return(l.isCustomProfile||l.isOfflineImport)&&u.push("Imported"),n.includes(a)||u.push("untested"),u.length>0&&(d+=` (${u.join(", ")})`),c.textContent=d,c};if(o.forEach(([a,l])=>t.modelInput.appendChild(r(a,l))),i.length>0&&o.length>0){const a=document.createElement("option");a.disabled=!0,a.textContent="?????? User-Imported / Custom ??????",a.style.fontWeight="bold",a.style.color="var(--text-dim)",t.modelInput.appendChild(a)}i.forEach(([a,l])=>t.modelInput.appendChild(r(a,l)));const s=document.createElement("option");s.value="custom",s.textContent="Custom Profile...",s.style.fontWeight="bold",s.style.color="var(--accent)",t.modelInput.appendChild(s),e&&(Object.prototype.hasOwnProperty.call(A,e)||e==="custom")?t.modelInput.value=e:t.modelInput.value||(t.modelInput.value="reterminal_e1001"),t.customHardwarePanel.updateVisibility()}function va(t){const e=t.modeSleep?.checked,n=t.modeDaily?.checked,o=t.modeDeepSleep?.checked,i=t.modeManual?.checked;t.sleepRow&&(t.sleepRow.style.display=e||o?"flex":"none"),t.dailyRefreshRow&&(t.dailyRefreshRow.style.display=n?"flex":"none"),t.deepSleepRow&&(t.deepSleepRow.style.display=o?"block":"none"),t.deepSleepOptionsRow&&(t.deepSleepOptionsRow.style.display=o?"flex":"none");const r=p.settings.lcdEcoStrategy||"backlight_off";t.dimTimeoutRow&&(t.dimTimeoutRow.style.display=r==="dim_after_timeout"?"flex":"none");const s=t.renderingModeInput?.value||p.settings.renderingMode||"direct",a=s==="lvgl"||s==="direct",l=s==="oepl"||s==="opendisplay";t.powerStrategySection&&(t.powerStrategySection.style.display=a?"block":"none"),t.protocolHardwareSection&&(t.protocolHardwareSection.style.display=l?"block":"none"),t.deviceModelField&&(t.deviceModelField.style.display=l?"none":"block");const c=!n&&!i;if(t.refreshIntervalRow&&(t.refreshIntervalRow.style.display=c?"block":"none"),t.autoCycleRow&&(t.autoCycleRow.style.display=t.autoCycleEnabled?.checked?"flex":"none"),t.deepSleepStayAwakeEntityRow){const d=document.getElementById("setting-deep-sleep-stay-awake");t.deepSleepStayAwakeEntityRow.style.display=d?.checked?"flex":"none"}t.customHardwarePanel.updateVisibility(),t.protocolHardwarePanel.updateStrategyDisplay()}function Je(t){const e=document.createElement("div");return e.textContent=t||"",e.innerHTML}function Ps(t,e,n){if(t&&e&&e[t]){let i=e[t].name||t||"Unknown";return n.includes(t)||(i+=" (untested)"),i}const o={reterminal_e1001:"E1001 (Mono)",reterminal_e1002:"E1002 (Color)",trmnl:"TRMNL",esp32_s3_photopainter:"PhotoPainter (7-Color)"};return t&&(o[t]||t)||"Unknown"}function ba(t,e,n,o){return t.map(i=>{const r=i.id===e,s=t.filter(a=>a.name===i.name).length>1;return`
                <tr style="border-bottom: 1px solid var(--border-subtle); ${r?"background: var(--accent-soft);":""}">
                    <td style="padding: 8px 4px;">
                        <span style="font-weight: 500;">${Je(i.name)}</span>
                        ${r?'<span style="background: var(--accent); color: white; font-size: 9px; padding: 2px 4px; border-radius: 2px; margin-left: 4px;">current</span>':""}
                        ${s?'<br><span style="font-size: 9px; color: var(--muted);">'+Je(i.id)+"</span>":""}
                    </td>
                    <td style="padding: 8px 4px; font-size: 11px; color: var(--muted);">${Ps(i.device_model||i.device_type,n,o)}</td>
                    <td style="padding: 8px 4px; font-size: 11px; color: var(--muted);">${i.page_count} pages</td>
                    <td style="padding: 8px 4px; text-align: right;">
                        <div style="display: flex; gap: 4px; justify-content: flex-end;">
                            ${r?"":`<button type="button" class="btn btn-sm btn-primary" style="font-size: 10px; padding: 4px 8px;" data-action="load" data-id="${i.id}">Load</button>`}
                            <button type="button" class="btn btn-sm btn-secondary" style="font-size: 10px; padding: 4px 8px;" data-action="export" data-id="${i.id}">Export</button>
                            ${!r&&t.length>1?`<button type="button" class="btn btn-sm btn-secondary" style="font-size: 10px; padding: 4px 8px; color: var(--danger);" data-action="delete" data-id="${i.id}" data-name="${Je(i.name)}">Delete</button>`:""}
                        </div>
                    </td>
                </tr>
            `}).join("")}function Ts(){return`
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
        `}function Ms(t,e){return t?Object.entries(t).map(([n,o])=>{let i=o.name||n;return e.includes(n)||(i+=" (untested)"),`<option value="${n}">${i}</option>`}).join(""):'<option value="reterminal_e1001">reTerminal E1001</option>'}function As(t){return`
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
            `}function St(t){return document.getElementById(t)}function Bn(t){return document.getElementById(t)}function te(t){const e=document.getElementById(t);if(!e)throw new Error(`Missing element: ${t}`);return e}function _a(){return Ms(A,gt||[])}function xa(t){const e=document.getElementById("layoutManagerModal");if(e)return t.modal=e,e;const n=document.createElement("div");n.id="layoutManagerModal",n.className="modal-backdrop hidden",n.innerHTML=Ts(),U(n),t.modal=n;const o=te("layoutManagerClose"),i=te("layoutManagerNew"),r=te("layoutManagerImport"),s=te("layoutManagerFileInput");o.addEventListener("click",()=>t.close()),i.addEventListener("click",()=>t.showNewLayoutDialog()),r.addEventListener("click",()=>{s.click()}),s.addEventListener("change",l=>t.handleFileImport(l)),n.addEventListener("click",l=>{l.target===n&&t.close()});const a=document.getElementById("layoutManagerTableBody");return a&&a.addEventListener("click",l=>{const c=l.target instanceof HTMLElement?l.target.closest("button"):null;if(!c)return;const{action:d,id:u,name:f}=c.dataset;d==="load"&&u&&t.loadLayout(u),d==="export"&&u&&t.exportLayout(u),d==="delete"&&u&&f&&t.deleteLayout(u,f)}),n}function Ds(t){const e=document.getElementById("newLayoutModal");if(e)return e;const n=document.createElement("div");return n.id="newLayoutModal",n.className="modal-backdrop hidden",n.innerHTML=As(t.generateDeviceOptions()),U(n),te("newLayoutClose").addEventListener("click",()=>{n.classList.add("hidden")}),te("newLayoutCancel").addEventListener("click",()=>{n.classList.add("hidden")}),te("newLayoutConfirm").addEventListener("click",()=>{t.handleCreateLayoutConfirm()}),te("newLayoutName").addEventListener("keydown",o=>{o.key==="Enter"?(o.preventDefault(),t.handleCreateLayoutConfirm()):o.key==="Escape"&&n.classList.add("hidden"),o.stopPropagation()}),n.addEventListener("click",o=>{if(o.target===n){const i=St("newLayoutName");document.activeElement!==i&&n.classList.add("hidden")}}),n}function wa(t){const e=Ds(t),n=St("newLayoutName");if(!n)return;const o=t.layouts.length;n.value=`Layout ${o+1}`;const i=A?Object.keys(A)[0]:"reterminal_e1001",r=Bn("newLayoutDeviceType");r&&(r.value=i),e.classList.remove("hidden"),setTimeout(()=>n.focus(),100)}function Sa(t){const e=St("newLayoutName"),n=Bn("newLayoutDeviceType"),o=e?.value.trim()||"",i=n?.value||"reterminal_e1001";if(!o){alert("Please enter a layout name.");return}const r=document.getElementById("newLayoutModal");r&&r.classList.add("hidden"),t.createLayout(o,i)}const Fn=t=>new Promise(e=>setTimeout(e,t));async function Os(t){const e=await B(`${t}/layouts`,{headers:N()});if(!e.ok)throw new Error(`Failed to load layouts: ${e.status}`);return e.json()}async function Hs(t,e){const n=await B(`${t}/layouts/${e}`,{headers:N()});if(!n.ok)throw new Error(`Failed to load layout: ${n.status}`);return n.json()}async function Gs(t,e){return B(`${t}/layouts/${e}`,{method:"POST",headers:{...N(),"Content-Type":"text/plain"},body:JSON.stringify({action:"delete"})})}async function Rs(t,e){return B(`${t}/layouts`,{method:"POST",headers:{...N(),"Content-Type":"text/plain"},body:JSON.stringify(e)})}async function Ws(t,e,n,o){const i=`${t}/import${n?"?overwrite=true":""}`;return B(i,{method:"POST",headers:o(),body:JSON.stringify(e)})}function Ns(t){return t instanceof Error?t.message:String(t)}function Ce(){return W||""}async function Ea(t){if(!R()){t.setStatus("Not connected to Home Assistant","error");return}try{const e=await Os(Ce());t.layouts=e.layouts||[],e.last_active_layout_id&&t.layouts.some(n=>n.id===e.last_active_layout_id)&&(!p?.currentLayoutId||p.currentLayoutId==="reterminal_e1001")&&t.layouts.find(o=>o.id===e.last_active_layout_id)&&e.last_active_layout_id!==p?.currentLayoutId&&(b.log(`[LayoutManager] Syncing to last active layout: ${e.last_active_layout_id}`),t.currentLayoutId=e.last_active_layout_id,p&&typeof p.setCurrentLayoutId=="function"&&p.setCurrentLayoutId(e.last_active_layout_id)),t.renderLayoutList()}catch(e){b.error("[LayoutManager] Error loading layouts:",e),t.setStatus("Failed to load layouts","error")}}async function Ca(t,e){if(R())try{t.setStatus("Loading layout...","info");const n=await Hs(Ce(),e);n.device_id||(n.device_id=e),t.currentLayoutId=e,p&&typeof p.setCurrentLayoutId=="function"&&(p.setCurrentLayoutId(e),b.log(`[LayoutManager] Set currentLayoutId to: ${e}`));const o=document.getElementById("canvas");if(o){const i=o.querySelector(".canvas-grid");o.innerHTML="",i&&o.appendChild(i),b.log("[LayoutManager] Cleared canvas before loading layout")}document.querySelectorAll(".graph-axis-label").forEach(i=>i.remove()),typeof de=="function"&&de(n),p&&p.currentLayoutId!==e&&(p.setCurrentLayoutId(e),b.log(`[LayoutManager] Re-set currentLayoutId to: ${e} (was changed by loadLayoutIntoState)`)),typeof L=="function"&&typeof E<"u"&&L(E.LAYOUT_IMPORTED,n),t.setStatus(`Loaded: ${n.name||e}`,"success"),t.renderLayoutList(),setTimeout(()=>t.close(),500)}catch(n){b.error("[LayoutManager] Error loading layout:",n),t.setStatus("Failed to load layout","error")}}async function ka(t,e){if(!R())return;let n=null;try{const o=`${W}/export?id=${e}`,i=await B(o,{headers:N()});if(!i.ok){const l=await i.json().catch(()=>({}));throw new Error(l.error||`Export failed: ${i.status}`)}const r=await i.json(),s=new Blob([JSON.stringify(r,null,2)],{type:"application/json"});n=URL.createObjectURL(s);const a=document.createElement("a");a.href=n,a.download=`${e}_layout.json`,document.body.appendChild(a),a.click(),document.body.removeChild(a),t.setStatus("Export started...","success")}catch(o){b.error("[LayoutManager] Error exporting layout:",o),t.setStatus("Failed to export layout","error")}finally{n&&URL.revokeObjectURL(n)}}async function Ia(t,e,n){if(R()&&confirm(`Are you sure you want to delete "${n}"?

This cannot be undone.`)){t.setStatus("Deleting layout...","info");try{const o=await Gs(Ce(),e);if(!o.ok){const i=await o.json().catch(()=>({}));if(i.error==="cannot_delete_last_layout"){t.setStatus("Cannot delete the last layout","error");return}throw new Error(i.error||`Delete failed: ${o.status}`)}t.setStatus(`Deleted: ${n}`,"success"),await t.loadLayouts()}catch(o){b.warn("[LayoutManager] Network error during delete, verifying if operation completed..."),await Fn(1500),await t.loadLayouts(),t.layouts.some(r=>r.id===e)?(b.error("[LayoutManager] Error deleting layout:",o),t.setStatus("Failed to delete layout","error")):(b.log("[LayoutManager] Layout was successfully deleted (verified after refresh)"),t.setStatus(`Deleted: ${n}`,"success"))}}}async function La(t,e,n="reterminal_e1001"){if(!R())return;let o=e.toLowerCase().replace(/\s+/g,"_").replace(/[^a-z0-9_]/g,"");o||(o="layout");const i=`${o}_${Date.now()}`;t.setStatus("Creating layout...","info");let r=!1;try{const d=await Rs(Ce(),{id:i,name:e,device_type:n,device_model:n});if(!d.ok){const u=await d.json().catch(()=>({}));throw new Error(u.error||`Create failed: ${d.status}`)}r=!0}catch(d){if(b.warn("[LayoutManager] Network error during create, verifying if operation completed..."),await Fn(1500),await t.loadLayouts(),t.layouts.some(f=>f.id===i))b.log("[LayoutManager] Layout was successfully created (verified after refresh)"),r=!0;else{b.error("[LayoutManager] Error creating layout:",d),t.setStatus("Failed to create layout","error");return}}if(!r)return;t.setStatus(`Created: ${e}`,"success"),await t.loadLayouts();const s=A[n],a=s&&s.features&&s.features.epaper,l=s&&s.features&&s.features.lvgl,c=a&&!l?"direct":"lvgl";b.log(`[LayoutManager] New layout ${i} detected device type. isEpaper=${a}, hasLvgl=${l}. Setting initial renderingMode to: ${c}`),p&&(p.setPages([{id:"page_0",name:"Page 1",widgets:[]}]),p.setCurrentPageIndex(0),p.updateSettings({renderingMode:c,device_model:n}),b.log("[LayoutManager] Cleared state and set initial settings before loading new layout")),await t.loadLayout(i),p&&(p.setDeviceModel(n),typeof L=="function"&&typeof E<"u"&&L(E.STATE_CHANGED),b.log(`[LayoutManager] Created layout '${i}' with device_model: ${n}, pages: ${p.pages?.length}, widgets: ${p.getCurrentPage()?.widgets?.length||0}`))}async function Pa(t,e){const n=e.target instanceof HTMLInputElement?e.target:null,o=n?.files?.[0];if(o){try{const i=await o.text(),r=JSON.parse(i);if(!r.pages&&!r.device_id){t.setStatus("Invalid layout file","error");return}await t.importLayout(r)}catch(i){b.error("[LayoutManager] Error importing file:",i),t.setStatus(`Failed to import file: ${Ns(i)}`,"error")}n&&(n.value="")}}async function Ta(t,e,n=!1){if(R())try{const o=await Ws(Ce(),e,n,N),i=await o.json();if(!o.ok){if(i.error==="layout_exists"){confirm(`A layout with ID "${i.existing_id}" already exists.

Do you want to overwrite it?`)&&await t.importLayout(e,!0);return}throw new Error(i.error||`Import failed: ${o.status}`)}t.setStatus(`Imported: ${i.name||i.id}`,"success"),await t.loadLayouts()}catch(o){b.error("[LayoutManager] Error importing layout:",o),t.setStatus("Failed to import layout","error")}}export{qs as $,p as A,Ks as B,at as C,A as D,E,Js as F,Re as G,Zs as H,j as I,Pn as J,qn as K,b as L,Yn as M,B as N,N as O,ea as P,oa as Q,ia as R,gt as S,na as T,Gn as U,ta as V,ps as W,sa as X,ra as Y,aa as Z,js as _,un as a,Vs as a0,fa as a1,Xs as a2,_e as a3,Us as a4,Qs as a5,ws as a6,da as a7,la as a8,pa as a9,ca as aa,P as ab,$ as ac,vr as ad,vt as ae,ha as af,zs as ag,Rn as ah,$s as ai,ua as aj,ga as ak,Se as al,Ys as am,va as b,D as c,V as d,L as e,xa as f,Ea as g,R as h,Je as i,Ps as j,Ca as k,Le as l,ka as m,Ia as n,G as o,ya as p,Ds as q,ba as r,T as s,wa as t,ma as u,Sa as v,_a as w,La as x,Pa as y,Ta as z};
