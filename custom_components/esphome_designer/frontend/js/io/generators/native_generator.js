/**
 * @file native_generator.js
 * @description Generates the native C++ display lambda and handles widget export orchestration for ESPHome native displays (e-ink/LCD).
 */

import { registry as PluginRegistry } from '../../core/plugin_registry.js';
import { Utils } from '../../core/utils.js';
import { COLORS, ALIGNMENT } from '../../core/constants.js';

export function getCondProps(w) {
    const ent = (w.condition_entity || "").trim();
    if (!ent) return "";
    const op = w.condition_operator || "==";
    let s = ` cond_ent:"${ent}" cond_op:"${op}"`;

    if (w.condition_value) s += ` cond_val:"${w.condition_value}"`; // Numeric/String
    if (w.condition_entity_2) s += ` cond_ent_2:"${w.condition_entity_2}"`; // Comparison Entity

    // New Feature (Issue #159/#196): Inverting Boolean Conditions
    s += ` cond_inv:"${!!w.condition_invert}"`;

    return s;
}

export function getConditionCheck(w) {
    const ent = (w.condition_entity || "").trim();
    if (!ent) return null;

    const op = w.condition_operator || "==";
    const isState = ent.startsWith("binary_sensor.") || ent.startsWith("switch.") || ent.startsWith("light.");

    // Check if operator implies a numeric or string comparison
    const isCompareOp = ["==", "!=", ">", "<", ">=", "<="].includes(op);

    // Provide default value for numeric comparison
    const targetVal = w.condition_value || "0.0";
    let baseLhs = `id(${ent.replace(/\./g, "_")}).state`;

    // Handle string matching explicitly
    const isStrMatching = op === "==" || op === "!=";
    const isNonNumeric = window.ESPHomeAdapter && window.ESPHomeAdapter.isEntityStateNonNumeric ? window.ESPHomeAdapter.isEntityStateNonNumeric(ent) : true;

    // Check if the condition value itself is non-numeric text (fixes weather/text_sensor checks)
    const isTextCondition = isNaN(parseFloat(targetVal));

    if (isStrMatching && (isNonNumeric || isTextCondition)) {
        // Safe C++ string comparison
        baseLhs = `std::string(id(${ent.replace(/\./g, "_")}).state)`;
        if (op === "==") return `${baseLhs} == "${targetVal}"`;
        if (op === "!=") return `${baseLhs} != "${targetVal}"`;
    }

    // New Feature (Issue #159/#196): Fast Boolean Inversion
    const checkTargetValue = w.condition_invert ? "false" : "true";

    // Handle standard Home Assistant binary domains natively
    if (isState) {
        if (op === "==") return `${baseLhs} == ${checkTargetValue}`;
        if (op === "!=") return `${baseLhs} != ${checkTargetValue}`;
    }

    // Numeric Comparisons
    if (isCompareOp) {
        if (op === "==") return `${baseLhs} == ${targetVal}`;
        if (op === "!=") return `${baseLhs} != ${targetVal}`;
        if (op === ">") return `${baseLhs} > ${targetVal}`;
        if (op === "<") return `${baseLhs} < ${targetVal}`;
        if (op === ">=") return `${baseLhs} >= ${targetVal}`;
        if (op === "<=") return `${baseLhs} <= ${targetVal}`;
    }

    // Dual Entity Comparison
    if (op === "compare_entity" && w.condition_entity_2) {
        const lhs = `id(${ent.replace(/\./g, "_")}).state`;
        const rhs = `id(${w.condition_entity_2.replace(/\./g, "_")}).state`;
        return `${lhs} == ${rhs}`;
    }

    return null;
}

export function sanitize(str) {
    if (!str) return "";
    return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

/**
 * Orchestrates the export of a single widget by delegating to its plugin.
 * @param {import("../../types.js").WidgetConfig} widget 
 * @param {import("../../types.js").GenerationContext} context 
 * @returns {string[]}
 */
export function generateWidget(widget, context) {
    if (widget.type === 'group') return [];
    const widgetLines = [];
    const plugin = PluginRegistry ? PluginRegistry.get(widget.type) : null;
    const isLvglWidget = widget.type && widget.type.startsWith("lvgl_");

    if (plugin && typeof plugin.export === 'function') {
        const exportContext = {
            ...context,
            lines: widgetLines,
            addFont: (f, w, s, i) => context.adapter.fonts.addFont(f, w, s, i),
            getColorConst: (c) => Utils ? Utils.getColorConst(c) : `"${c}"`,
            getAlignX: (a, x, w) => Utils ? Utils.getAlignX(a, x, w) : x,
            getAlignY: (a, y, h) => Utils ? Utils.getAlignY(a, y, h) : y,
            addDitherMask: (l, c, e, x, y, w, h, r) => Utils ? Utils.addDitherMask(l, c, e, x, y, w, h, r || 0) : null,
            sanitize: (s) => sanitize(s),
            getCondProps: (w) => getCondProps(w),
            getConditionCheck: (w) => getConditionCheck(w),
            Utils: Utils,
            COLORS: COLORS,
            ALIGNMENT: ALIGNMENT,
            TEXT_Y_OFFSET: 0,
            RECT_Y_OFFSET: 0
        };

        const result = plugin.export(widget, exportContext);
        if (result && Array.isArray(result)) {
            widgetLines.push(...result);
        } else if (result && typeof result === 'string') {
            widgetLines.push(result);
        }
    } else if (isLvglWidget) {
        // If it's an LVGL widget but we aren't using the direct LVGL generator 
        // (e.g. on an e-paper device or if isLvgl=false), we MUST still export 
        // the marker comment so it doesn't get lost on Update.

        // Dynamic import workaround for serializeWidget to avoid circular dependencies
        if (window.ESPHomeAdapter && window.ESPHomeAdapter.serializeWidgetForFallback) {
            const serialized = window.ESPHomeAdapter.serializeWidgetForFallback(widget);
            widgetLines.push(serialized ? serialized.replace(/[\r\n]+/g, " ") : "");
        } else {
            const safeMeta = `// widget:${widget.type} id:${widget.id} x:${widget.x} y:${widget.y} w:${widget.width} h:${widget.height}`;
            // Sanitize to valid single line comment
            widgetLines.push(safeMeta.replace(/[\r\n]+/g, ' '));
        }
    } else {
        widgetLines.push(`// widget:${widget.type} id:${widget.id} status:unsupported`);
        widgetLines.push(`        // Unsupported widget type: ${widget.type}`);
    }

    return widgetLines;
}

/**
 * Core orchestrator for the native C++ display lambda.
 * Generates the `lambda: |-` block for ST7789, ILI9341, Waveshare e-Paper, etc.
 * 
 * @param {import("../../types.js").PageConfig[]} pages - Array of screen layout pages.
 * @param {import("../../types.js").ProjectPayload} layout - The root project containing global settings.
 * @param {import("../../types.js").DeviceProfile} profile - The targeted hardware profile definition.
 * @param {import("../../types.js").GenerationContext} context - Orchestration context (registered plugins, etc).
 * @param {import("../adapters/esphome_adapter.js").ESPHomeAdapter} adapter - Reference to the core adapter instance.
 * @returns {string[]} Array of C++ code lines for the display lambda.
 */
export function generateDisplayLambda(pages, layout, profile, context, adapter) {
    const lines = [];
    const useInvertedColors = profile.features?.inverted_colors || layout.invertedColors;
    const isEpaper = !!(profile.features && (profile.features.epaper || profile.features.epd));

    if (useInvertedColors) {
        lines.push("const auto COLOR_WHITE = Color(0, 0, 0); // Inverted for e-ink");
        lines.push("const auto COLOR_BLACK = Color(255, 255, 255); // Inverted for e-ink");
    } else {
        lines.push("const auto COLOR_WHITE = Color(255, 255, 255);");
        lines.push("const auto COLOR_BLACK = Color(0, 0, 0);");
    }

    // Special Color Mapping for Waveshare PhotoPainter (6-color palette quirk)
    // Note: Orange is NOT supported on the 6-color model. Mapped to Red as fallback.
    if (profile.id === 'esp32_s3_photopainter' || (profile.name && profile.name.includes("PhotoPainter"))) {
        lines.push("const auto COLOR_RED = Color(0, 0, 255);");
        lines.push("const auto COLOR_GREEN = Color(255, 128, 0);");
        lines.push("const auto COLOR_BLUE = Color(255, 255, 0);");
        lines.push("const auto COLOR_YELLOW = Color(0, 255, 0);");
        lines.push("const auto COLOR_ORANGE = Color(0, 0, 255); // Fallback to Red");
    } else {
        lines.push("const auto COLOR_RED = Color(255, 0, 0);");
        lines.push("const auto COLOR_GREEN = Color(0, 255, 0);");
        lines.push("const auto COLOR_BLUE = Color(0, 0, 255);");
        lines.push("const auto COLOR_YELLOW = Color(255, 255, 0);");
        lines.push("const auto COLOR_ORANGE = Color(255, 165, 0);");
    }

    lines.push("auto color_off = COLOR_WHITE;");
    lines.push("auto color_on = COLOR_BLACK;");
    lines.push("");

    // Helper for runtime text wrapping (used by sensor_text when width is set)
    lines.push("// Helper to print text with word-wrap at widget boundary");
    lines.push("auto print_wrapped_text = [&](int x, int y, int max_w, int line_h, esphome::font::Font *font, Color color, TextAlign align, const char* text) {");
    lines.push("  if (!text || max_w <= 0) return;");
    lines.push("  int cx = x;");
    lines.push("  int cy = y;");
    lines.push("  std::string line;");
    lines.push("  std::string word;");
    lines.push("  const char* p = text;");
    lines.push("  while (*p) {");
    lines.push("    // SANITIZATION: Treat newlines, carriage returns, and tabs as spaces for flow");
    lines.push("    bool is_space = (*p == ' ' || *p == '\\n' || *p == '\\r' || *p == '\\t');");
    lines.push("    if (is_space) {");
    lines.push("      if (!word.empty()) {");
    lines.push("        int ww, wh, wbl, wx;");
    lines.push("        font->measure(word.c_str(), &ww, &wx, &wbl, &wh);");
    lines.push("        int lw = 0, lx;");
    lines.push("        if (!line.empty()) { font->measure(line.c_str(), &lw, &lx, &wbl, &wh); int sw, sx, sbl, sh; font->measure(\" \", &sw, &sx, &sbl, &sh); lw += sw; }");
    lines.push("        if (lw + ww > max_w && !line.empty()) {");
    lines.push("          it.print(cx, cy, font, color, align, line.c_str());");
    lines.push("          cy += line_h;");
    lines.push("          line = word;");
    lines.push("        } else {");
    lines.push("          if (!line.empty()) line += \" \";");
    lines.push("          line += word;");
    lines.push("        }");
    lines.push("        word.clear();");
    lines.push("      }");
    lines.push("    } else {");
    lines.push("      word += *p;");
    lines.push("    }");
    lines.push("    p++;");
    lines.push("  }");
    lines.push("  if (!word.empty()) {");
    lines.push("    int ww, wh, wbl, wx;");
    lines.push("    font->measure(word.c_str(), &ww, &wx, &wbl, &wh);");
    lines.push("    int lw = 0, lx;");
    lines.push("    if (!line.empty()) { font->measure(line.c_str(), &lw, &lx, &wbl, &wh); int sw, sx, sbl, sh; font->measure(\" \", &sw, &sx, &sbl, &sh); lw += sw; }");
    lines.push("    if (lw + ww > max_w && !line.empty()) {");
    lines.push("      it.print(cx, cy, font, color, align, line.c_str());");
    lines.push("      cy += line_h;");
    lines.push("      line = word;");
    lines.push("    } else {");
    lines.push("      if (!line.empty()) line += \" \";");
    lines.push("      line += word;");
    lines.push("    }");
    lines.push("  }");
    lines.push("  if (!line.empty()) {");
    lines.push("    it.print(cx, cy, font, color, align, line.c_str());");
    lines.push("  }");
    lines.push("};");
    lines.push("");
    if (isEpaper) {
        lines.push("// Helper to apply a simple grey dither mask for e-paper (checkerboard)");
        lines.push("auto apply_grey_dither_mask = [&](int x_start, int y_start, int w, int h) {");
        lines.push("  for (int y = y_start; y < y_start + h; y++) {");
        lines.push("    for (int x = x_start; x < x_start + w; x++) {");
        lines.push("      if ((x + y) % 2 == 0) it.draw_pixel_at(x, y, COLOR_WHITE);");
        lines.push("      else it.draw_pixel_at(x, y, COLOR_BLACK);");
        lines.push("    }");
        lines.push("  }");
        lines.push("};");
        lines.push("");
        lines.push("// Helper to apply grey dither to text (subtractive - erases every other black pixel)");
        lines.push("auto apply_grey_dither_to_text = [&](int x_start, int y_start, int w, int h) {");
        lines.push("  for (int y = y_start; y < y_start + h; y++) {");
        lines.push("    for (int x = x_start; x < x_start + w; x++) {");
        lines.push("      if ((x + y) % 2 == 0) it.draw_pixel_at(x, y, COLOR_WHITE);");
        lines.push("    }");
        lines.push("  }");
        lines.push("};");
    }

    // Helper hooks
    if (window.PluginRegistry) {
        window.PluginRegistry.onExportHelpers({ lines, widgets: pages.flatMap(p => p.widgets || []) });
    }

    lines.push(`int currentPage = id(display_page);`);

    // For LCD displays: declare static page tracker once, before page blocks
    if (!isEpaper) {
        lines.push(`static int last_rendered_page = -1;`);
        lines.push(`bool page_changed = (last_rendered_page != currentPage);`);
        lines.push(`if (page_changed) last_rendered_page = currentPage;`);
    }

    pages.forEach((page, index) => {
        const pageName = page.name || `Page ${index + 1}`;

        // Visual page header for easier identification
        lines.push(`// ═══════════════════════════════════════════════════════════════`);
        lines.push(`// ▸ PAGE: ${pageName}`);
        lines.push(`// ═══════════════════════════════════════════════════════════════`);

        lines.push(`if (currentPage == ${index}) {`);

        // Page Round-trip comments
        lines.push(`  // page:name "${pageName}"`);
        lines.push(`  // page:dark_mode "${page.dark_mode || "inherit"}"`);
        lines.push(`  // page:refresh_type "${page.refresh_type || "interval"}"`);
        lines.push(`  // page:refresh_time "${page.refresh_time || ""}"`);
        lines.push(`  // page:visible_from "${page.visible_from || ""}"`);
        lines.push(`  // page:visible_to "${page.visible_to || ""}"`);

        // Clear screen for this page
        const isDarkMode = page.dark_mode === 'dark' || (page.dark_mode === 'inherit' && layout.darkMode);
        lines.push(`  // Clear screen for this page`);
        // For LCD displays: use filled_rectangle only on page change to avoid artifacts
        // For e-paper: always use it.fill() (works correctly)
        if (!isEpaper) {
            lines.push(`  if (page_changed) {`);
            lines.push(`    // Full clear on page change (prevents black artifacts)`);
            lines.push(`    it.filled_rectangle(0, 0, it.get_width(), it.get_height(), ${isDarkMode ? 'COLOR_BLACK' : 'COLOR_WHITE'});`);
            lines.push(`  } else {`);
            lines.push(`    // Fast clear for same-page updates`);
            lines.push(`    it.fill(${isDarkMode ? 'COLOR_BLACK' : 'COLOR_WHITE'});`);
            lines.push(`  }`);
        } else {
            lines.push(`  it.fill(${isDarkMode ? 'COLOR_BLACK' : 'COLOR_WHITE'});`);
        }
        lines.push(`  color_off = ${isDarkMode ? 'COLOR_BLACK' : 'COLOR_WHITE'};`);
        lines.push(`  color_on = ${isDarkMode ? 'COLOR_WHITE' : 'COLOR_BLACK'};`);

        if (page.widgets) {
            const visibleWidgets = page.widgets.filter(w => !w.hidden && w.type !== 'group');
            visibleWidgets.forEach((w, widgetIndex) => {
                const widgetLines = generateWidget(w, {
                    ...context,
                    layout,
                    adapter,
                    isEpaper,
                    isDark: isDarkMode
                });

                if (widgetLines.length > 0) {
                    // Smart de-indent: Find min indentation and subtract it to preserve relative offsets
                    const minIndent = widgetLines.reduce((min, line) => {
                        if (!line.trim()) return min; // Ignore empty lines
                        const match = line.match(/^ */);
                        return Math.min(min, match ? match[0].length : 0);
                    }, Infinity);

                    const safeMin = minIndent === Infinity ? 0 : minIndent;

                    lines.push(...widgetLines.map(l => {
                        // If line is empty, just push empty
                        if (!l.trim()) return "";
                        // Remove min indent, then add 2 spaces base indent
                        return "  " + l.substring(safeMin);
                    }));

                    // Add separator between widgets (but not after the last one)
                    if (widgetIndex < visibleWidgets.length - 1) {
                        lines.push(`  // ────────────────────────────────────────`);
                    }
                }
            });
        }
        lines.push("}");
    });

    return lines;
}
