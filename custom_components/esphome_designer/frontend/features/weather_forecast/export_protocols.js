/** @typedef {Widget & { props?: Record<string, any>, entity_id?: string }} WeatherForecastWidget */

/**
 * @param {WeatherForecastWidget} w
 * @param {Record<string, any>} helpers
 */
export const exportLVGL = (w, { common, convertColor, getLVGLFont }) => {
    const p = w.props || {};
    const mode = p.forecast_mode || "daily";
    const hourlyMode = p.hourly_mode || "fixed";
    const relativeCount = parseInt(p.relative_count || 5, 10);
    const startOffset = parseInt(p.start_offset || 0, 10);
    const hourlySlots = (p.hourly_slots || "06,09,12,15,18,21")
        .split(',').map((/** @type {string} */ s) => s.trim()).filter(Boolean);

    const actualSlots = mode === "hourly" ? hourlySlots.slice(startOffset) : [];
    const count = mode === "hourly" ? (hourlyMode === "relative" ? relativeCount : actualSlots.length) : Math.min(7, Math.max(1, parseInt(p.days, 10) || 5));
    const isHorizontal = (p.layout || "horizontal") === "horizontal";
    const color = convertColor(p.color || "theme_auto");
    const dayFS = parseInt(p.day_font_size || 12, 10);
    const iconS = parseInt(p.icon_size || 32, 10);
    const tempFS = parseInt(p.temp_font_size || 14, 10);
    const showHighLow = mode === "hourly" ? false : p.show_high_low !== false;
    const precision = (typeof p.precision === 'number' && !isNaN(p.precision)) ? p.precision : 1;

    /** @type {Array<Record<string, any>>} */
    const widgets = [];

    for (let i = 0; i < count; i++) {
        let dayNameLambda;
        const dayIdx = i + startOffset;
        let condId;
        let highId;
        let lowId;

        if (mode === "hourly") {
            if (hourlyMode === "relative") {
                dayNameLambda = `!lambda |-\n                      auto t = id(ha_time).now();\n                      if (!t.is_valid()) return std::string("---");\n                      static char buf[8];\n                      sprintf(buf, "%02d:00", (t.hour + ${i + 1}) % 24);\n                      return std::string(buf);\n                    `;
                condId = `weather_cond_hplus${i + 1}`;
                highId = `weather_high_hplus${i + 1}`;
                lowId = `weather_low_hplus${i + 1}`;
            } else {
                dayNameLambda = `!lambda "return \\"${actualSlots[i]}:00\\";"`;
                condId = `weather_cond_h${actualSlots[i]}00`;
                highId = `weather_high_h${actualSlots[i]}00`;
                lowId = `weather_low_h${actualSlots[i]}00`;
            }
        } else {
            dayNameLambda = `!lambda |-\n                  if (${dayIdx} == 0) return std::string("Today");\n                  auto t = id(ha_time).now();\n                  if (!t.is_valid()) return std::string("---");\n                  ESPTime future = ESPTime::from_epoch_local(t.timestamp + (${dayIdx} * 86400));\n                  static char buf[16];\n                  future.strftime(buf, sizeof(buf), "%a");\n                  return std::string(buf);\n                `;
            condId = `weather_cond_day${dayIdx}`;
            highId = `weather_high_day${dayIdx}`;
            lowId = `weather_low_day${dayIdx}`;
        }

        const iconLambda = `!lambda |-\n              std::string c = id(${condId}).state;\n              if (c == "clear-night") return "\\U000F0594";\n              if (c == "cloudy") return "\\U000F0590";\n              if (c == "exceptional") return "\\U000F0026";\n              if (c == "fog") return "\\U000F0591";\n              if (c == "hail") return "\\U000F0592";\n              if (c == "lightning") return "\\U000F0593";\n              if (c == "lightning-rainy") return "\\U000F067E";\n              if (c == "partlycloudy") return "\\U000F0595";\n              if (c == "pouring") return "\\U000F0596";\n              if (c == "rainy") return "\\U000F0597";\n              if (c == "snowy") return "\\U000F0598";\n              if (c == "snowy-rainy") return "\\U000F067F";\n              if (c == "sunny") return "\\U000F0599";\n              if (c == "windy") return "\\U000F059D";\n              if (c == "windy-variant") return "\\U000F059E";\n              return "\\U000F0590";\n            `;

        const dayWidgets = [
            {
                label: {
                    id: `${w.id}_day${i}`.replace(/-/g, '_'),
                    align: "top_mid",
                    text: dayNameLambda,
                    text_font: getLVGLFont(p.font_family || "Roboto", dayFS, 700),
                    text_color: color
                }
            },
            {
                label: {
                    id: `${w.id}_icon${i}`.replace(/-/g, '_'),
                    align: "center",
                    y: 0,
                    text: iconLambda,
                    text_font: getLVGLFont("Material Design Icons", iconS, 400),
                    text_color: color
                }
            },
            {
                label: {
                    id: `${w.id}_temp${i}`.replace(/-/g, '_'),
                    align: "bottom_mid",
                    text: showHighLow ? `!lambda "return str_sprintf(\\'%.${precision}f/%.${precision}f\\', id(${highId}).state, id(${lowId}).state).c_str();"` : `!lambda "return str_sprintf(\\'%.${precision}f\\', id(${highId}).state).c_str();"`,
                    text_font: getLVGLFont(p.font_family || "Roboto", tempFS, 400),
                    text_color: color
                }
            }
        ];

        widgets.push({
            obj: {
                width: isHorizontal ? (100 / count) + "%" : "100%",
                height: isHorizontal ? "100%" : (100 / count) + "%",
                bg_opa: "transp",
                border_width: 0,
                widgets: dayWidgets
            }
        });
    }

    return {
        obj: {
            ...common,
            bg_color: convertColor(p.background_color || "white"),
            bg_opa: "COVER",
            radius: 8,
            border_width: p.show_border !== false ? (p.border_width || 1) : 0,
            border_color: convertColor(p.border_color || p.color || "theme_auto"),
            layout: { type: "flex", flex_flow: isHorizontal ? "row" : "column", flex_align_main: "space_around", flex_align_cross: "center" },
            widgets
        }
    };
};

/**
 * @param {WeatherForecastWidget} w
 * @param {Record<string, any>} helpers
 */
export const exportOpenDisplay = (w, { layout, _page }) => {
    const p = w.props || {};
    const entityId = (w.entity_id || p.weather_entity || "weather.forecast_home").trim();
    const iconSize = p.icon_size || 32;
    const tempSize = p.temp_font_size || 14;

    let color = p.color || "black";
    if (color === "theme_auto") {
        color = layout?.darkMode ? "white" : "black";
    }

    const iconTemplate = `{{ {
            'clear-night': 'moon',
            'cloudy': 'cloud',
            'fog': 'fog',
            'hail': 'hail',
            'lightning': 'lightning',
            'lightning-rainy': 'lightning-rainy',
            'partlycloudy': 'partly-cloudy',
            'pouring': 'pouring',
            'rainy': 'rainy',
            'snowy': 'snowy',
            'snowy-rainy': 'snowy-rainy',
            'sunny': 'sun',
            'windy': 'wind'
        }[states('${entityId}')] | default('sun') }}`;

    const tempTemplate = `{{ states('${entityId}') }} | {{ state_attr('${entityId}', 'temperature') }}°`;

    return [
        {
            type: "icon",
            value: iconTemplate,
            x: Math.round(w.x + w.width / 2),
            y: Math.round(w.y),
            size: iconSize,
            color,
            anchor: "mt"
        },
        {
            type: "text",
            value: tempTemplate,
            x: Math.round(w.x + w.width / 2),
            y: Math.round(w.y + iconSize + 2),
            size: tempSize,
            color,
            anchor: "mt"
        }
    ];
};

/**
 * @param {WeatherForecastWidget} w
 * @param {Record<string, any>} helpers
 */
export const exportOEPL = (w, { _layout, _page }) => {
    const p = w.props || {};
    const entityId = (w.entity_id || p.weather_entity || "weather.forecast_home").trim();
    return {
        type: "text",
        value: `{{ states('${entityId}') }}`,
        x: Math.round(w.x),
        y: Math.round(w.y),
        size: p.temp_font_size || 14,
        color: p.color || "theme_auto",
        anchor: "lt"
    };
};
