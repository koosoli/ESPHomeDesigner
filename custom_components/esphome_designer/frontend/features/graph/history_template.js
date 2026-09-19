import { parseDuration } from '../../js/utils/graph_helpers.js';

/**
 * @param {string} value
 * @returns {string}
 */
const sanitizeToken = (value) => value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '') || 'sensor';

/**
 * @param {string} entityId
 * @returns {string}
 */
const getEntityToken = (entityId) => {
    const raw = (entityId || 'sensor.history_source')
        .toLowerCase()
        .replace(/^(sensor\.)?graph_history_/, '');
    return sanitizeToken(raw);
};

/**
 * Resolves the underlying source entity even if the widget was already pointed to the helper sensor.
 * @param {string} entityId
 * @returns {string}
 */
export function resolveGraphHistorySourceEntity(entityId) {
    const trimmed = (entityId || 'sensor.history_source').trim() || 'sensor.history_source';
    if (/^sensor\.graph_history_sensor_/.test(trimmed)) {
        return trimmed.replace(/^sensor\.graph_history_sensor_/, 'sensor.');
    }
    if (/^sensor\.graph_history_/.test(trimmed)) {
        return trimmed.replace(/^sensor\.graph_history_/, 'sensor.');
    }
    return trimmed;
}

/**
 * @param {{ entity_id?: string, props?: Record<string, any> }} widget
 * @returns {number}
 */
export function getGraphHistoryPollMinutes(widget) {
    const props = widget.props || {};
    const durationSeconds = Math.max(60, parseDuration(props.duration || '1h'));
    const points = Math.max(1, parseInt(String(props.history_points || 100), 10) || 100);
    return Math.max(1, Math.min(30, Math.round(durationSeconds / points / 60) || 1));
}

/**
 * @param {{ entity_id?: string }} widget
 * @returns {string}
 */
export function buildGraphHistoryTemplateEntityId(widget) {
    return `sensor.graph_history_${getEntityToken(widget.entity_id || 'sensor.history_source')}`;
}

/**
 * @param {{ entity_id?: string }} widget
 * @returns {string}
 */
export function buildGraphHistoryTemplateFilename(widget) {
    return `graph_history_${getEntityToken(widget.entity_id || 'sensor.history_source')}.yaml`;
}

/**
 * @param {{ entity_id?: string, props?: Record<string, any> }} widget
 * @returns {string}
 */
export function buildGraphHistoryTemplateYaml(widget) {
    const props = widget.props || {};
    const sourceEntity = resolveGraphHistorySourceEntity(widget.entity_id || 'sensor.history_source');
    const helperEntityId = buildGraphHistoryTemplateEntityId(widget);
    const helperObjectId = helperEntityId.replace(/^sensor\./, '');
    const helperName = helperObjectId.split('_').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
    const attrName = props.history_attribute || 'history';
    const points = Math.max(1, parseInt(String(props.history_points || 100), 10) || 100);
    const durationSeconds = Math.max(60, parseDuration(props.duration || '1h'));
    const pollMinutes = getGraphHistoryPollMinutes(widget);
    const sqlEntityId = sourceEntity.replace(/'/g, "''");
    const stateEntityId = sourceEntity.replace(/"/g, '\\"');
    const responseVar = `graph_history_${getEntityToken(sourceEntity)}`;

    return [
        '# Home Assistant helper package for ESPHome Designer graph history mode',
        '# ----------------------------------------------------------------------------------',
        '# SETUP INSTRUCTIONS:',
        '# 1. Make sure the SQL integration is available in Home Assistant:',
        '#    - If already enabled, you can skip this step.',
        '#    - If not enabled yet, go to Settings > Devices & Services > Add Integration > SQL.',
        '#    - IMPORTANT: Home Assistant requires creating a sensor when adding SQL via UI.',
        '#      Enter any dummy query (e.g. Name: "SQL Helper", Query: "SELECT 1 AS ping;", Column: "ping").',
        '#      Do NOT paste the query below into the HA SQL sensor UI modal,',
        '#      because the HA UI sensor only supports a single scalar value, whereas this package',
        '#      uses the "sql.query" action to fetch multiple history points into an attribute.',
        '# 2. Place this YAML file into your Home Assistant packages directory',
        '#    (e.g. config/packages/graph_history.yaml) or merge it into configuration.yaml.',
        `# 3. Point the graph widget to ${helperEntityId}.`,
        '#    (Replace the raw source sensor with this helper sensor so ESPHome reads the history attribute).',
        `# 4. Keep "HA Attribute" set to "${attrName}".`,
        '# ----------------------------------------------------------------------------------',
        '',
        'template:',
        '  - trigger:',
        '      - trigger: homeassistant',
        '        event: start',
        '      - trigger: time_pattern',
        `        minutes: "/${pollMinutes}"`,
        '    action:',
        '      - action: sql.query',
        '        data:',
        '          query: >-',
        '            SELECT',
        '              states.state AS value,',
        '              states.last_updated_ts AS ts',
        '            FROM states',
        '            INNER JOIN states_meta ON states.metadata_id = states_meta.metadata_id',
        `            WHERE states_meta.entity_id = '${sqlEntityId}'`,
        "              AND states.state NOT IN ('unknown', 'unavailable', 'none')",
        `              AND states.last_updated_ts >= {{ (now().timestamp() - ${durationSeconds}) | round(0, 'floor') }}`,
        '            ORDER BY states.last_updated_ts ASC',
        `            LIMIT ${points};`,
        `        response_variable: ${responseVar}`,
        '    sensor:',
        `      - name: "${helperName}"`,
        `        unique_id: ${helperObjectId}`,
        `        state: "{{ states(\\"${stateEntityId}\\") }}"`,
        '        attributes:',
        `          ${attrName}: >`,
        `            {{ ${responseVar}.result | default([]) | map(attribute='value') | list | tojson }}`,
        '          samples: >',
        `            {{ ${responseVar}.result | default([]) | count }}`,
        `          source_entity: "${sourceEntity}"`,
        `          window_seconds: ${durationSeconds}`
    ].join('\n');
}
