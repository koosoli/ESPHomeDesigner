const fs = require('fs');
const path = require('path');

const RC7_PATH = `c:\\Users\\mail\\Downloads\\ESPHome_desinger\\Differentmilestonebackupsoftherewrite\\RC7\\1\\esphome_designer\\frontend\\js\\core\\properties.js`;

function extract() {
    console.log(`Reading RC7 properties from: ${RC7_PATH}`);
    const content = fs.readFileSync(RC7_PATH, 'utf8');

    const results = {};

    // Pattern: (if|else if) (type === "type_name") { ... }
    const typeRegex = /(?:if|else if) \(type === "([^"]+)"\)\s*\{/g;
    let match;

    while ((match = typeRegex.exec(content)) !== null) {
        const type = match[1];
        let startIndex = match.index + match[0].length;

        // Find the balanced closing brace for this block
        let balance = 1;
        let endIndex = -1;
        for (let j = startIndex; j < content.length; j++) {
            if (content[j] === '{') balance++;
            if (content[j] === '}') balance--;
            if (balance === 0) {
                endIndex = j;
                break;
            }
        }

        const block = content.substring(startIndex, endIndex);
        const props = new Set();
        const root = new Set();
        let hasDropShadow = false;

        // Extract prop keys: updateProp("key"
        const updatePropMatches = block.matchAll(/updateProp\("([^"]+)"/g);
        for (const m of updatePropMatches) {
            props.add(m[1]);
        }

        // Extract root keys from AppState.updateWidget
        const updateWidgetMatches = block.matchAll(/AppState\.updateWidget\([^,]+,\s*\{\s*([^:]+):/g);
        for (const m of updateWidgetMatches) {
            const key = m[1].trim();
            if (key !== "props") root.add(key);
        }

        // Extract root keys from addLabeledInputWithPicker
        // पैटर्न: this.addLabeledInputWithPicker("Entity ID", "text", widget.entity_id || "", (v) => { AppState.updateWidget(widget.id, { entity_id: v });
        const pickerMatches = block.matchAll(/addLabeledInputWithPicker\("[^"]+",\s*"[^"]+",\s*widget\.([^ \s?|]+)/g);
        for (const m of pickerMatches) {
            root.add(m[1]);
        }

        // Manual extraction for widget.title etc.
        const widgetRootMatches = block.matchAll(/widget\.([^ \s?|!.;,()]+)/g);
        for (const m of widgetRootMatches) {
            const k = m[1];
            if (['entity_id', 'entity_id_2', 'title', 'name'].includes(k)) {
                root.add(k);
            }
        }

        if (block.includes('addDropShadowButton')) {
            hasDropShadow = true;
        }

        results[type] = {
            root: Array.from(root),
            props: Array.from(props).filter(p => !root.has(p)),
            has_drop_shadow: hasDropShadow
        };
    }

    const outputPath = path.join(__dirname, 'rc7_keys.json');
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log(`Extracted keys for ${Object.keys(results).length} widgets to ${outputPath}`);
}

extract();
