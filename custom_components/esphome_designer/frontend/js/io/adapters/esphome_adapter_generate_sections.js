/**
 * @param {{
 *   context: any,
 *   layout: any,
 *   profile: any,
 *   pages: any[],
 *   registry: any,
 *   yaml: any,
 *   fonts: any
 * }} params
 * @returns {{ globalLines: string[], includeLines: string[], requiresMaterialIcons: boolean }}
 */
export function buildGlobalExportSections(params) {
    const { context, layout, profile, pages, registry, yaml, fonts } = params;
    const globalLines = [];
    const includeLines = [];

    registry.onExportEsphome({ ...context, lines: includeLines });

    globalLines.push("- id: display_page", "  type: int", "  restore_value: true", "  initial_value: '0'");

    const isEpaper = !!(profile.features && (profile.features.epaper || profile.features.epd));
    const isLcd = !!(profile.features && profile.features.lcd) || !isEpaper;
    const defaultRefresh = layout.refreshInterval || (isLcd ? 60 : (layout.deepSleepInterval || 600));
    globalLines.push("- id: page_refresh_default_s", "  type: int", "  restore_value: true", `  initial_value: '${defaultRefresh}'`);
    globalLines.push("- id: page_refresh_current_s", "  type: int", "  restore_value: false", "  initial_value: '60'");
    globalLines.push("- id: last_touch_time", "  type: uint32_t", "  restore_value: false", "  initial_value: '0'");
    if (pages.length > 1) {
        globalLines.push("- id: last_page_switch_time", "  type: uint32_t", "  restore_value: false", "  initial_value: '0'");
    }

    const firmwareGlobals = yaml.generateFirmwareGuardGlobals(layout);
    if (firmwareGlobals.length > 0) {
        globalLines.push(...firmwareGlobals.map((line) => line.startsWith("  ") ? line.substring(2) : line));
    }

    registry.onExportGlobals({ ...context, lines: globalLines });

    if (includeLines.length > 0) {
        layout.plugin_includes = includeLines;
    }

    return {
        globalLines,
        includeLines,
        requiresMaterialIcons: (fonts?.iconCodesBySize?.size || 0) > 0
    };
}

/**
 * @param {string[]} lines
 * @param {any[]} widgets
 * @param {boolean} isSelectionSnippet
 * @returns {void}
 */
export function appendMqttSection(lines, widgets, isSelectionSnippet) {
    if (isSelectionSnippet) return;

    const usesMqtt = widgets.some((widget) => {
        if (widget.props && typeof widget.props.mqtt_topic === 'string' && widget.props.mqtt_topic.trim() !== "") return true;
        if (widget.entity_id && widget.entity_id.toLowerCase().startsWith('mqtt:')) return true;
        if (widget.entity_id_2 && widget.entity_id_2.toLowerCase().startsWith('mqtt:')) return true;
        if (widget.condition_entity && widget.condition_entity.toLowerCase().startsWith('mqtt:')) return true;
        return false;
    });

    if (!usesMqtt) return;

    lines.push("mqtt:");
    lines.push("  broker: !secret mqtt_broker");
    lines.push("  # username: !secret mqtt_user");
    lines.push("  # password: !secret mqtt_pass");
    lines.push("");
}

/**
 * @param {any[]} plugins
 * @returns {any[]}
 */
export function sortExportPlugins(plugins) {
    const order = ["image", "online_image", "graph", "qr_code"];
    plugins.sort((a, b) => {
        const idxA = order.indexOf(a.id);
        const idxB = order.indexOf(b.id);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        return a.id.localeCompare(b.id);
    });
    return plugins;
}
