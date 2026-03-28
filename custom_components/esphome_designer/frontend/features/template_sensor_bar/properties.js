export const defaults = {
    w: 355,
    h: 43,
    width: 355,
    height: 43,
    show_wifi: true,
    wifi_entity: "",
    wifi_is_local: false,
    show_temperature: true,
    temp_entity: "",
    temp_is_local: false,
    show_humidity: true,
    hum_entity: "",
    hum_is_local: false,
    show_battery: true,
    bat_entity: "",
    bat_is_local: false,
    show_background: true,
    background_color: "black",
    border_radius: 8,
    border_thickness: 0,
    border_color: "white",
    color: "white",
    font_size: 14,
    icon_size: 20,
    temp_unit: "\u00B0C",
    opa: 255,
    opacity: 255
};

export const schema = [
    {
        section: "Sensor Selection",
        fields: [
            { key: "show_wifi", label: "WiFi Strength", type: "checkbox", default: true },
            { key: "wifi_entity", label: "WiFi Entity", type: "entity_picker", default: "" },
            { key: "wifi_is_local", label: "Use Local WiFi", type: "checkbox", default: false },
            { key: "show_temperature", label: "Temperature", type: "checkbox", default: true },
            { key: "temp_entity", label: "Temp Entity", type: "entity_picker", default: "" },
            { key: "temp_is_local", label: "Use Local Temp", type: "checkbox", default: false },
            { key: "show_humidity", label: "Humidity", type: "checkbox", default: true },
            { key: "hum_entity", label: "Hum Entity", type: "entity_picker", default: "" },
            { key: "hum_is_local", label: "Use Local Hum", type: "checkbox", default: false },
            { key: "show_battery", label: "Battery Level", type: "checkbox", default: true },
            { key: "bat_entity", label: "Battery Entity", type: "entity_picker", default: "" },
            { key: "bat_is_local", label: "Use Local Battery", type: "checkbox", default: false }
        ]
    },
    {
        section: "Pill Appearance",
        fields: [
            { key: "show_background", label: "Show Background Pill", type: "checkbox", default: true },
            { key: "background_color", label: "Pill Color", type: "color", default: "black" },
            { key: "border_radius", label: "Corners", type: "number", default: 8 },
            { key: "border_thickness", label: "Border", type: "number", default: 0 },
            { key: "border_color", label: "Border Color", type: "color", default: "white" }
        ]
    },
    {
        section: "Text & Icons",
        fields: [
            { key: "color", label: "Foreground Color", type: "color", default: "white" },
            { key: "font_size", label: "Text Size", type: "number", default: 14 },
            { key: "icon_size", label: "Icon Size", type: "number", default: 20 },
            { key: "temp_unit", label: "Temp Units", type: "select", options: ["\u00B0C", "\u00B0F"], default: "\u00B0C" },
            { key: "opa", label: "Opacity (0 - 255)", type: "number", default: 255 },
            { key: "opacity", label: "Opacity (0 - 255)", type: "number", default: 255 }
        ]
    }
];
