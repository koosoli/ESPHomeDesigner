const fs = require('fs');
const path = require('path');

const FEATURES_PATH = `c:\\Users\\mail\\Downloads\\ESPHome_desinger\\Codebasecleanup\\0.9\\custom_components\\esphome_designer\\frontend\\features`;
const LEGACY_RENDERER_PATH = `c:\\Users\\mail\\Downloads\\ESPHome_desinger\\Codebasecleanup\\0.9\\custom_components\\esphome_designer\\frontend\\js\\core\\properties\\legacy_renderer.js`;

function applyRendererKeyData(results, widgetId, content) {
    if (!results[widgetId]) {
        results[widgetId] = { root: [], props: [], has_drop_shadow: false };
    }

    const root = new Set(results[widgetId].root || []);
    const props = new Set(results[widgetId].props || []);

    for (const propMatch of content.matchAll(/updateProp\("([^"]+)"/g)) {
        props.add(propMatch[1]);
    }
    for (const newPropsMatch of content.matchAll(/newProps\.([a-zA-Z0-9_]+)\s*=/g)) {
        props.add(newPropsMatch[1]);
    }
    for (const rootMatch of content.matchAll(/AppState\.updateWidget\(widget\.id,\s*\{\s*([a-zA-Z0-9_]+)\s*:/g)) {
        root.add(rootMatch[1]);
    }
    if (content.includes('addDropShadowButton')) {
        results[widgetId].has_drop_shadow = true;
    }

    results[widgetId].root = Array.from(root);
    results[widgetId].props = Array.from(props);
}

function applyLegacyRendererData(results) {
    const content = fs.readFileSync(LEGACY_RENDERER_PATH, 'utf8');
    const branchRegex = /else if \(type === "([^"]+)"\) \{([\s\S]*?)(?=\n\s*else if \(type ===|\n\s*\}\n\s*else if \(type ===|\n\s*\}\n\s*if \(type ===|$)/g;

    let match;
    while ((match = branchRegex.exec(content)) !== null) {
        const widgetId = match[1];
        const block = match[2];
        applyRendererKeyData(results, widgetId, block);
    }
}

function extract() {
    console.log(`Scanning features for schemas in: ${FEATURES_PATH}`);
    const results = {};

    const features = fs.readdirSync(FEATURES_PATH);

    for (const feature of features) {
        const pluginPath = path.join(FEATURES_PATH, feature, 'plugin.js');
        if (!fs.existsSync(pluginPath)) continue;

        const content = fs.readFileSync(pluginPath, 'utf8');

        // Find the ID of the plugin
        const idMatch = content.match(/id:\s*"([^"]+)"/);
        if (!idMatch) continue;
        const id = idMatch[1];

        const props = new Set();
        const root = new Set();
        let hasDropShadow = false;

        // Extract keys from schema fields
        // Pattern: { key: "name", ... target: "root" } or similar
        // We use a regex that looks for objects containing 'key'
        const fieldMatches = content.match(/\{[^}]*key:\s*"([^"]+)"[^}]*\}/g);

        if (fieldMatches) {
            for (const fieldBlock of fieldMatches) {
                const keyMatch = fieldBlock.match(/key:\s*"([^"]+)"/);
                const targetMatch = fieldBlock.match(/target:\s*"([^"]+)"/);
                const typeMatch = fieldBlock.match(/type:\s*"([^"]+)"/);

                if (keyMatch) {
                    const key = keyMatch[1];
                    if (targetMatch && targetMatch[1] === 'root') {
                        root.add(key);
                    } else if (typeMatch && typeMatch[1] === 'drop_shadow_button') {
                        hasDropShadow = true;
                    } else {
                        props.add(key);
                    }
                }
            }
        }

        // Also check if drop_shadow_button is mentioned as a type in a simpler way
        if (content.includes('drop_shadow_button')) {
            hasDropShadow = true;
        }

        results[id] = {
            root: Array.from(root),
            props: Array.from(props),
            has_drop_shadow: hasDropShadow
        };

        applyRendererKeyData(results, id, content);
    }

    applyLegacyRendererData(results);

    const outputPath = path.join(__dirname, 'current_keys.json');
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log(`Extracted schemas for ${Object.keys(results).length} plugins to ${outputPath}`);
}

extract();
