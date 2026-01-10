export const GOLDEN_PAYLOAD = {
    pages: [{
        "id": "page_1",
        "name": "Page 1",
        "widgets": [
            {
                "id": "w_icon",
                "type": "icon",
                "x": 10,
                "y": 10,
                "width": 24,
                "height": 24,
                "props": {
                    "icon": "mdi:home",
                    "color": "red",
                    "size": 24
                }
            },
            {
                "id": "w_label",
                "type": "text",
                "x": 50,
                "y": 10,
                "width": 100,
                "height": 20,
                "props": {
                    "text": "Golden Master Test",
                    "color": "black",
                    "font_size": 20
                }
            },
            {
                "id": "w_rect",
                "type": "shape_rect",
                "x": 10,
                "y": 50,
                "width": 100,
                "height": 50,
                "props": {
                    "fill": true,
                    "color": "blue"
                }
            },
            {
                "id": "w_circle",
                "type": "shape_circle",
                "x": 120,
                "y": 50,
                "width": 50,
                "height": 50,
                "props": {
                    "fill": false,
                    "border_width": 2,
                    "color": "green"
                }
            },
            {
                "id": "w_line",
                "type": "line",
                "x": 10,
                "y": 110,
                "width": 100,
                "height": 2,
                "props": {
                    "color": "black",
                    "stroke_width": 2
                }
            },
            {
                "id": "w_battery",
                "type": "battery_icon",
                "x": 200,
                "y": 10,
                "width": 24,
                "height": 24,
                "props": {
                    "color": "black"
                }
            },
            {
                "id": "w_progress",
                "type": "progress_bar",
                "x": 10,
                "y": 120,
                "width": 150,
                "height": 20,
                "entity_id": "sensor.test_progress",
                "props": {
                    "show_label": true,
                    "show_percentage": true,
                    "title": "Progress"
                }
            },
            {
                "id": "w_wifi",
                "type": "wifi_signal",
                "x": 240,
                "y": 10,
                "width": 24,
                "height": 24,
                "props": {
                    "color": "black"
                }
            },
            {
                "id": "w_datetime",
                "type": "datetime",
                "x": 10,
                "y": 150,
                "width": 200,
                "height": 40,
                "props": {
                    "format": "time_date",
                    "color": "black"
                }
            },
            {
                "id": "w_sensor",
                "type": "sensor_text",
                "x": 10,
                "y": 200,
                "width": 100,
                "height": 20,
                "entity_id": "sensor.test_temp",
                "props": {
                    "color": "black",
                    "show_units": true
                }
            },
            {
                "id": "w_graph",
                "type": "graph",
                "x": 10,
                "y": 230,
                "width": 200,
                "height": 100,
                "entity_id": "sensor.test_temp",
                "props": {
                    "color": "black",
                    "duration": "1h"
                }
            },
            {
                "id": "w_image",
                "type": "image",
                "x": 220,
                "y": 230,
                "width": 50,
                "height": 50,
                "props": {
                    "path": "test_image.png"
                }
            }
        ]
    }],
    dark_mode: false,
    orientation: "landscape"
};
