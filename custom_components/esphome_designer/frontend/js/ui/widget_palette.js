import { registry as PluginRegistry } from '../core/plugin_registry.js';
import { Logger } from '../utils/logger.js';
import { EVENTS, on } from '../core/events.js';

export const WIDGET_CATEGORIES = [
    {
        id: 'core',
        name: 'Core Widgets',
        expanded: true,
        icon: '<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><rect x="4" y="4" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="14" y="4" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="4" y="14" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="14" y="14" width="6" height="6" rx="1" fill="currentColor"/></svg>',
        widgets: [
            {
                type: 'label',
                label: 'Floating text',
                tag: 'Text',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><text x="4" y="17" font-size="14" font-weight="bold" fill="currentColor">Aa</text></svg>'
            },
            {
                type: 'sensor_text',
                label: 'Sensor text',
                tag: 'Entity',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="8" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2" /><path d="M11 12h9M14 9l3 3-3 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'
            },
            {
                type: 'datetime',
                label: 'Date & Time',
                tag: 'Time',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2" /><path d="M12 7v5l3 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'
            },
            {
                type: 'icon',
                label: 'MDI icon',
                tag: 'Icon',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 2L9 9H2l6 4.5L5.5 22 12 17l6.5 5-2.5-8.5L22 9h-7z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" /></svg>'
            },
            {
                type: 'weather_icon',
                label: 'Weather icon',
                tag: 'Icon',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="10" r="4" fill="none" stroke="currentColor" stroke-width="2" /><path d="M12 2v2M12 16v2M4 10H2M22 10h-2M5.6 4.6l1.4 1.4M17 6l1.4-1.4M5.6 15.4l1.4-1.4M17 14l1.4 1.4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'
            },
            {
                type: 'image',
                label: 'Image',
                tag: 'Media',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="3" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" /><path d="M21 15l-5-5L11 15l-3-3-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'
            },
            {
                type: 'online_image',
                label: 'Puppet image',
                tag: 'Remote',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="14" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M17 10l4-4M21 10V6h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><circle cx="7" cy="8" r="1.5" fill="currentColor" /><path d="M17 13l-4-4-4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'
            }
        ]
    },
    {
        id: 'shapes',
        name: 'Shapes',
        expanded: true,
        icon: '<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><circle cx="7" cy="7" r="4" fill="none" stroke="currentColor" stroke-width="2"/><rect x="13" y="13" width="7" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><path d="M17 4l3 5h-6z" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
        widgets: [
            {
                type: 'shape_rect',
                label: 'Rectangle',
                tag: 'Shape',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2" /></svg>'
            },
            {
                type: 'rounded_rect',
                label: 'Rounded Rect',
                tag: 'Shape',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="6" fill="none" stroke="currentColor" stroke-width="2" /></svg>'
            },
            {
                type: 'shape_circle',
                label: 'Circle',
                tag: 'Shape',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2" /></svg>'
            },
            {
                type: 'line',
                label: 'Line',
                tag: 'Shape',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'
            }
        ]
    },
    {
        id: 'opendisplay',
        name: 'OpenDisplay / OEPL',
        expanded: false,
        icon: '<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><rect x="3" y="4" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" stroke-width="1" /><circle cx="6" cy="6.5" r="1" fill="currentColor" /><circle cx="9" cy="6.5" r="1" fill="currentColor" /></svg>',
        widgets: [
            {
                type: 'odp_multiline',
                label: 'Multiline Text',
                tag: 'ODP',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><line x1="4" y1="12" x2="18" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><line x1="4" y1="17" x2="14" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'
            },
            {
                type: 'odp_rectangle_pattern',
                label: 'Rectangle Pattern',
                tag: 'ODP',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5" /><rect x="11" y="4" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5" /><rect x="3" y="12" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5" /><rect x="11" y="12" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5" /></svg>'
            },
            {
                type: 'odp_polygon',
                label: 'Polygon',
                tag: 'ODP',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><polygon points="12,3 21,10 18,20 6,20 3,10" fill="none" stroke="currentColor" stroke-width="2" /></svg>'
            },
            {
                type: 'odp_ellipse',
                label: 'Ellipse',
                tag: 'ODP',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="9" ry="6" fill="none" stroke="currentColor" stroke-width="2" /></svg>'
            },
            {
                type: 'odp_arc',
                label: 'Arc',
                tag: 'ODP',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><path d="M6 18 A 9 9 0 0 1 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'
            },
            {
                type: 'odp_icon_sequence',
                label: 'Icon Sequence',
                tag: 'ODP',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="5" cy="12" r="3" fill="currentColor" /><circle cx="12" cy="12" r="3" fill="currentColor" /><circle cx="19" cy="12" r="3" fill="currentColor" /></svg>'
            },
            {
                type: 'odp_plot',
                label: 'Sensor Plot',
                tag: 'ODP',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><path d="M3 3v18h18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M6 15l4-6 4 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'
            },
            {
                type: 'odp_debug_grid',
                label: 'Debug Grid',
                tag: 'Debug',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><path d="M3 3v18h18M3 9h18M3 15h18M9 3v18M15 3v18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'
            }
        ]
    },
    {
        id: 'advanced',
        name: 'Advanced',
        expanded: true,
        icon: '<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
        widgets: [
            {
                type: 'graph',
                label: 'Graph / Chart',
                tag: 'Data',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><path d="M3 3v18h18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M7 14l4-4 4 4 5-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'
            },
            {
                type: 'progress_bar',
                label: 'Progress bar',
                tag: 'Entity',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="9" width="20" height="6" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><rect x="3" y="10" width="12" height="4" rx="1" fill="currentColor" /></svg>'
            },
            {
                type: 'qr_code',
                label: 'QR Code',
                tag: 'Tools',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" fill="currentColor" /><rect x="14" y="3" width="7" height="7" fill="currentColor" /><rect x="3" y="14" width="7" height="7" fill="currentColor" /><rect x="14" y="14" width="3" height="3" fill="currentColor" /></svg>'
            },
            {
                type: 'calendar',
                label: 'Calendar',
                tag: 'Events',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" stroke-width="2" /></svg>'
            },
            {
                type: 'weather_forecast',
                label: 'Weather Forecast',
                tag: 'Forecast',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="10" r="4" fill="none" stroke="currentColor" stroke-width="2" /><path d="M12 2v2M12 16v2M4 10H2M22 10h-2M5.6 4.6l1.4 1.4M17 6l1.4-1.4M5.6 15.4l1.4-1.4M17 14l1.4 1.4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'
            },
            {
                type: 'quote_rss',
                label: 'Quote / RSS',
                tag: 'Info',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><path d="M6 17h3l2-4V7H5v6h3M13 17h3l2-4V7h-6v6h3" fill="none" stroke="currentColor" stroke-width="2" /></svg>'
            }
        ]
    },
    {
        id: 'inputs',
        name: 'Inputs',
        expanded: false,
        icon: '<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><path d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zM16.06 17H15v-1l-1-1h-6l-1 1v1H5.94c-.58 0-1.06-.48-1.06-1.06V7.5c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5v8.44c0 .58-.48 1.06-1.06 1.06z" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="12" cy="13" r="1.5" fill="currentColor" /></svg>',
        widgets: [
            {
                type: 'touch_area',
                label: 'Touch Area',
                tag: 'Input',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><rect x="5" y="5" width="14" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="2,2" /><circle cx="12" cy="12" r="3" fill="currentColor" /></svg>'
            },
            {
                type: 'nav_next_page',
                label: 'Next Page',
                tag: 'Nav',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><path d="M10 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'
            },
            {
                type: 'nav_previous_page',
                label: 'Prev Page',
                tag: 'Nav',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><path d="M14 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'
            },
            {
                type: 'nav_reload_page',
                label: 'Reload Page',
                tag: 'Nav',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><path d="M23 4v6h-6M1 20v-6h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>'
            },
            {
                type: 'template_nav_bar',
                label: 'Navigation Bar',
                tag: 'Template',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M6 10l-2 2 2 2M18 10l2 2-2 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 12h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'
            }
        ]
    },
    {
        id: 'ondevice',
        name: 'On Device Sensors',
        expanded: true,
        icon: '<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 9h6v6H9z" fill="currentColor"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M7 2v2M7 20v2M17 2v2M17 20v2M2 7h2M20 7h2M2 17h2M20 17h2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
        widgets: [
            {
                type: 'battery_icon',
                label: 'Battery',
                tag: 'Sensor',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="7" width="18" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><rect x="4" y="9" width="8" height="6" fill="currentColor" /><path d="M20 10h2v4h-2" fill="none" stroke="currentColor" stroke-width="2" /></svg>'
            },
            {
                type: 'wifi_signal',
                label: 'WiFi Signal',
                tag: 'Sensor',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 3C7.5 3 3.8 5.4 2 9l2 2c1.3-2.5 4-4.2 8-4.2s6.7 1.7 8 4.2l2-2c-1.8-3.6-5.5-6-10-6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M12 9c-2.7 0-5.1 1.4-6.5 3.5L7 14c1-1.4 2.8-2.3 5-2.3s4 .9 5 2.3l1.5-1.5C17.1 10.4 14.7 9 12 9z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><circle cx="12" cy="18" r="2" fill="currentColor" /></svg>'
            },
            {
                type: 'ondevice_temperature',
                label: 'Temperature',
                tag: 'SHT4x',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 2a2 2 0 00-2 2v10.1a4 4 0 104 0V4a2 2 0 00-2-2z" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="12" cy="18" r="2" fill="currentColor" /></svg>'
            },
            {
                type: 'ondevice_humidity',
                label: 'Humidity',
                tag: 'SHT4x',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" fill="none" stroke="currentColor" stroke-width="2" /></svg>'
            },
            {
                type: 'template_sensor_bar',
                label: 'On-Board Sensor Bar',
                tag: 'New',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M5 12h2M10 12h2M15 12h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'
            }
        ]
    },
    {
        id: 'lvgl',
        name: 'LVGL Components',
        expanded: false,
        icon: '<svg class="category-svg" viewBox="0 0 24 24" width="16" height="16"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" /></svg>',
        widgets: [
            { type: 'lvgl_obj', label: 'Base Object', icon: '<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" /></svg>' },
            { type: 'lvgl_label', label: 'Label', icon: '<svg class="widget-icon" viewBox="0 0 24 24"><text x="4" y="17" font-size="14" font-weight="bold" fill="currentColor">Aa</text></svg>' },
            { type: 'lvgl_line', label: 'LVGL Line', icon: '<svg class="widget-icon" viewBox="0 0 24 24"><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>' },
            { type: 'lvgl_button', label: 'Button', icon: '<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="8" rx="2" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="2" /><text x="12" y="16.5" font-size="8" text-anchor="middle" fill="currentColor">BTN</text></svg>' },
            { type: 'lvgl_switch', label: 'Switch', icon: '<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="8" rx="4" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="16" cy="12" r="3" fill="currentColor" /></svg>' },
            { type: 'lvgl_checkbox', label: 'Checkbox', icon: '<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><polyline points="9 12 11 14 15 10" fill="none" stroke="currentColor" stroke-width="2" /></svg>' },
            { type: 'lvgl_slider', label: 'Slider', icon: '<svg class="widget-icon" viewBox="0 0 24 24"><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><circle cx="12" cy="12" r="3" fill="currentColor" /></svg>' },
            { type: 'lvgl_bar', label: 'Bar', icon: '<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="9" width="20" height="6" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><rect x="3" y="10" width="12" height="4" rx="1" fill="currentColor" /></svg>' },
            { type: 'lvgl_arc', label: 'Arc', icon: '<svg class="widget-icon" viewBox="0 0 24 24"><path d="M4 18 A 10 10 0 1 1 20 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>' },
            { type: 'lvgl_meter', label: 'Meter', icon: '<svg class="widget-icon" viewBox="0 0 24 24"><path d="M4 18 A 10 10 0 1 1 20 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><line x1="12" y1="18" x2="16" y2="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>' },
            { type: 'lvgl_spinner', label: 'Spinner', icon: '<svg class="widget-icon" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10" fill="none" stroke="currentColor" stroke-width="2" /></svg>' },
            { type: 'lvgl_led', label: 'LED', icon: '<svg class="widget-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" fill="currentColor" /><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2" /></svg>' },
            { type: 'lvgl_chart', label: 'Chart', icon: '<svg class="widget-icon" viewBox="0 0 24 24"><path d="M3 3v18h18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M7 14l4-4 4 4 5-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>' },
            { type: 'lvgl_img', label: 'Image', icon: '<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="3" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" /><path d="M21 15l-5-5L11 15l-3-3-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>' },
            { type: 'lvgl_qrcode', label: 'QR Code', icon: '<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" fill="currentColor" /><rect x="14" y="3" width="7" height="7" fill="currentColor" /><rect x="3" y="14" width="7" height="7" fill="currentColor" /><rect x="14" y="14" width="3" height="3" fill="currentColor" /></svg>' },
            { type: 'lvgl_dropdown', label: 'Dropdown', icon: '<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="8" width="20" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><polyline points="16 11 18 13 20 11" fill="currentColor" /></svg>' },
            { type: 'lvgl_roller', label: 'Roller', icon: '<svg class="widget-icon" viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="20" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><line x1="6" y1="10" x2="18" y2="10" stroke="currentColor" stroke-width="1" /><line x1="6" y1="14" x2="18" y2="14" stroke="currentColor" stroke-width="1" /></svg>' },
            { type: 'lvgl_spinbox', label: 'Spinbox', icon: '<svg class="widget-icon" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M6 12l2-2 2 2" fill="none" stroke="currentColor" stroke-width="1" /><path d="M14 12l2 2 2-2" fill="none" stroke="currentColor" stroke-width="1" /></svg>' },
            { type: 'lvgl_textarea', label: 'Textarea', icon: '<svg class="widget-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" fill="none" stroke="currentColor" stroke-width="2" /><line x1="6" y1="8" x2="14" y2="8" stroke="currentColor" stroke-width="2" /></svg>' },
            { type: 'lvgl_keyboard', label: 'Keyboard', icon: '<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><line x1="6" y1="10" x2="8" y2="10" stroke="currentColor" stroke-width="2" /><line x1="10" y1="10" x2="12" y2="10" stroke="currentColor" stroke-width="2" /></svg>' },
            { type: 'lvgl_buttonmatrix', label: 'Btn Matrix', icon: '<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="7" width="9" height="4" fill="none" stroke="currentColor" stroke-width="1" /><rect x="13" y="7" width="9" height="4" fill="none" stroke="currentColor" stroke-width="1" /><rect x="2" y="13" width="9" height="4" fill="none" stroke="currentColor" stroke-width="1" /><rect x="13" y="13" width="9" height="4" fill="none" stroke="currentColor" stroke-width="1" /></svg>' },
            { type: 'lvgl_tabview', label: 'Tabview', icon: '<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><line x1="2" y1="8" x2="22" y2="8" stroke="currentColor" stroke-width="1" /></svg>' },
            { type: 'lvgl_tileview', label: 'Tileview', icon: '<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="2" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2" /><rect x="13" y="2" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2" /><rect x="2" y="13" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2" /><rect x="13" y="13" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2" /></svg>' },
            {
                type: 'template_nav_bar',
                label: 'Nav Bar (Template)',
                tag: 'Nav',
                icon: '<svg class="widget-icon" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2" /><path d="M6 10l-2 2 2 2M18 10l2 2-2 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 12h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>'
            }
        ]
    }
];

export async function renderWidgetPalette(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const currentMode = window.AppState?.settings?.renderingMode || 'direct';
    Logger.log(`[Palette] Rendering palette for mode: ${currentMode}`);

    container.innerHTML = '<div class="palette-loading" style="padding: 20px; color: #999; text-align: center; font-size: 13px;">Loading widgets...</div>';

    // Collect all unique widget types
    const allTypes = [];
    WIDGET_CATEGORIES.forEach(category => {
        category.widgets.forEach(widget => {
            if (!allTypes.includes(widget.type)) {
                allTypes.push(widget.type);
            }
        });
    });

    // Load all plugins in parallel
    Logger.log(`[Palette] Pre-loading ${allTypes.length} widget plugins...`);
    try {
        await Promise.all(allTypes.map(type => PluginRegistry.load(type)));
    } catch (e) {
        Logger.error("[Palette] Failed to load some plugins:", e);
    }

    container.innerHTML = '';

    WIDGET_CATEGORIES.forEach(category => {
        // Auto-Expansion Logic
        let isExpanded = category.expanded;
        if (currentMode === 'lvgl') {
            // Force focus on LVGL components, collapse everything else
            isExpanded = (category.id === 'lvgl');
        } else if (currentMode === 'oepl' || currentMode === 'opendisplay') {
            // Force focus on OpenDisplay/OEPL widgets when in protocol mode
            isExpanded = (category.id === 'opendisplay' || category.id === 'core' || category.id === 'shapes');
        }

        const categoryEl = document.createElement('div');
        categoryEl.className = `widget-category ${isExpanded ? 'expanded' : ''}`;
        categoryEl.dataset.category = category.id;

        const headerEl = document.createElement('div');
        headerEl.className = 'widget-category-header';

        let iconHtml = '<span class="category-icon">›</span>';
        if (category.icon) {
            iconHtml += category.icon;
        }

        headerEl.innerHTML = `
            ${iconHtml}
            <span class="category-name">${category.name}</span>
            ${category.widgets.length > 0 && !isExpanded ? `<span class="category-count">${category.widgets.length}</span>` : ''}
        `;

        headerEl.addEventListener('click', () => {
            categoryEl.classList.toggle('expanded');
        });

        const itemsEl = document.createElement('div');
        itemsEl.className = 'widget-category-items';

        category.widgets.forEach(widget => {
            const itemEl = document.createElement('div');
            const plugin = PluginRegistry.get(widget.type);

            // STRICT COMPATIBILITY CHECK
            let isCompatible = true;
            let explanation = '';

            if (plugin?.supportedModes) {
                isCompatible = plugin.supportedModes.includes(currentMode);
                explanation = `Not supported in ${currentMode} mode`;
            } else {
                // Fallback to method-based detection
                if (currentMode === 'oepl' || currentMode === 'opendisplay') {
                    const hasExport = currentMode === 'oepl' ? !!plugin?.exportOEPL : !!plugin?.exportOpenDisplay;
                    // CRITICAL ARCHITECTURAL NOTE: Protocol-based rendering (OEPL/OpenDisplay) does not 
                    // support on-device hardware sensors, high-complexity widgets (calendar/graph),
                    // or widgets requiring network-side processing (quote_rss).
                    const isExcludedCategory = (category.id === 'ondevice' || category.id === 'lvgl');
                    const isExcludedWidget = (widget.type === 'calendar' || widget.type === 'weather_forecast' || widget.type === 'graph' || widget.type === 'quote_rss');

                    isCompatible = hasExport && !isExcludedCategory && !isExcludedWidget;
                    explanation = `Not supported in ${currentMode === 'oepl' ? 'OpenEpaperLink' : 'OpenDisplay'} mode`;
                } else if (currentMode === 'lvgl') {
                    // CRITICAL ARCHITECTURAL NOTE: LVGL mode is strictly restricted to native LVGL objects 
                    // and essential input/navigation controls to prevent mixing incompatible
                    // lambda-based rendering with the LVGL stack.
                    const isLvglNative = widget.type.startsWith('lvgl_');
                    const isInputCategory = (category.id === 'inputs');

                    isCompatible = isLvglNative || isInputCategory;
                    explanation = 'Only native LVGL widgets and input controls supported in LVGL mode';
                } else if (currentMode === 'direct') {
                    // Direct mode is display.lambda.
                    // Compatible if it has 'export' method AND is not strictly for another protocol (LVGL/OEPL).
                    const isProtocolSpecific = widget.type.startsWith('lvgl_') || widget.type.startsWith('oepl_');
                    isCompatible = !!plugin?.export && !isProtocolSpecific;
                    explanation = 'Not supported in Direct rendering mode';
                }
            }

            itemEl.className = 'item' + (isCompatible ? '' : ' incompatible');
            itemEl.draggable = isCompatible;
            itemEl.dataset.widgetType = widget.type;

            const label = widget.label || plugin?.name;

            let tagHtml = '';
            if (widget.tag) {
                tagHtml = `<span class="tag">${widget.tag}</span>`;
            }

            itemEl.innerHTML = `
                ${widget.icon}
                <span class="label">${label}</span>
                ${tagHtml}
            `;
            itemEl.title = isCompatible ? `Add ${label} to canvas` : explanation;

            if (isCompatible) {
                itemEl.addEventListener('dragstart', (e) => {
                    e.dataTransfer.setData('application/widget-type', widget.type);
                    e.dataTransfer.setData('text/plain', widget.type); // Fallback for better reliability
                    e.dataTransfer.effectAllowed = 'copy';
                });
            } else {
                itemEl.addEventListener('click', (e) => {
                    e.stopPropagation();
                    import('../utils/dom.js').then(dom => {
                        dom.showToast(explanation, 'warning');
                    });
                });
            }

            itemsEl.appendChild(itemEl);
        });

        categoryEl.appendChild(headerEl);
        categoryEl.appendChild(itemsEl);
        container.appendChild(categoryEl);
    });
}
// Refresh palette on mode change
on(EVENTS.SETTINGS_CHANGED, (settings) => {
    if (settings && settings.renderingMode !== undefined) {
        Logger.log(`[Palette] Settings changed, refreshing palette for mode: ${settings.renderingMode}`);
        renderWidgetPalette('widgetPalette');
    }
});
