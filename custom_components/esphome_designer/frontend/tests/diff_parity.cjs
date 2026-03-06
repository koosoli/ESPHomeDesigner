const fs = require('fs');
const path = require('path');

function diff() {
    const rc7 = JSON.parse(fs.readFileSync(path.join(__dirname, 'rc7_keys.json'), 'utf8'));
    const current = JSON.parse(fs.readFileSync(path.join(__dirname, 'current_keys.json'), 'utf8'));

    const EXCLUDE = ['weather_forecast'];
    const GENERIC_ROOT_KEYS = new Set(['x', 'y', 'width', 'height', 'w', 'h']);
    const TYPE_MAPPING = {
        'label': 'text' // RC7 used 'label' for some text instances
    };
    const PROP_ALIASES = {
        lvgl_keyboard: {
            textarea_id: ['textarea_id', 'textarea']
        },
        lvgl_label: {
            color: ['color', 'text_color']
        },
        lvgl_textarea: {
            placeholder: ['placeholder', 'placeholder_text']
        },
        lvgl_obj: {
            color: ['color', 'bg_color', 'border_color']
        },
        lvgl_button: {
            color: ['color', 'text_color']
        },
        graph: {
            border: ['border', 'border_width']
        },
        qr_code: {
            value: ['value', 'text']
        }
    };
    const IGNORED_PROP_REGRESSIONS = {
        icon: new Set(['font_ref']),
        qr_code: new Set(['scale']),
        quote_rss: new Set(['custom_font_family', 'auto_scale'])
    };

    const hasEquivalentProp = (widgetType, propName, currentData) => {
        const currentProps = currentData.props || [];
        const currentRoot = currentData.root || [];

        if (currentProps.includes(propName) || currentRoot.includes(propName)) return true;
        const aliases = PROP_ALIASES[widgetType]?.[propName] || [];
        return aliases.some((alias) => currentProps.includes(alias) || currentRoot.includes(alias));
    };

    const report = {
        widgets: {},
        summary: {
            total_widgets_audited: 0,
            widgets_with_regressions: 0,
            total_missing_props: 0,
            total_missing_root: 0,
            total_missing_shadows: 0
        }
    };

    for (const [rc7Type, rc7Data] of Object.entries(rc7)) {
        if (EXCLUDE.includes(rc7Type)) continue;

        const currentType = TYPE_MAPPING[rc7Type] || rc7Type;
        const currentData = current[currentType];

        if (!currentData) {
            // Widget might be handled by LegacyRenderer directly or missing
            continue;
        }

        const missingRoot = rc7Data.root.filter(k => !GENERIC_ROOT_KEYS.has(k) && !currentData.root.includes(k));
        const ignoredProps = IGNORED_PROP_REGRESSIONS[currentType] || new Set();
        const missingProps = rc7Data.props.filter(k => !ignoredProps.has(k) && !hasEquivalentProp(currentType, k, currentData));
        const missingShadow = rc7Data.has_drop_shadow && !currentData.has_drop_shadow;

        if (missingRoot.length > 0 || missingProps.length > 0 || missingShadow) {
            report.widgets[currentType] = {
                missing_root: missingRoot,
                missing_props: missingProps,
                missing_shadow: missingShadow
            };
            report.summary.widgets_with_regressions++;
            report.summary.total_missing_root += missingRoot.length;
            report.summary.total_missing_props += missingProps.length;
            if (missingShadow) report.summary.total_missing_shadows++;
        }
        report.summary.total_widgets_audited++;
    }

    const outputPath = path.join(__dirname, 'parity_report.json');
    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));

    console.log('\n=== PARITY REPORT SUMMARY ===');
    console.log(`Total Widgets Audited: ${report.summary.total_widgets_audited}`);
    console.log(`Widgets with Regressions: ${report.summary.widgets_with_regressions}`);
    console.log(`Total Missing Root Keys: ${report.summary.total_missing_root}`);
    console.log(`Total Missing Prop Keys: ${report.summary.total_missing_props}`);
    console.log(`Total Missing Shadows: ${report.summary.total_missing_shadows}`);
    console.log(`\nDetailed report written to: ${outputPath}`);

    if (report.summary.widgets_with_regressions > 0) {
        console.log('\nDetected Regressions:');
        for (const [widget, data] of Object.entries(report.widgets)) {
            console.log(`- ${widget}:`);
            if (data.missing_root.length) console.log(`    Missing Root: [${data.missing_root.join(', ')}]`);
            if (data.missing_props.length) console.log(`    Missing Props: [${data.missing_props.join(', ')}]`);
            if (data.missing_shadow) console.log(`    Missing Drop Shadow Button`);
        }
    } else {
        console.log('\n🚀 ALL WIDGETS ACHIEVED 100% PARITY!');
    }
}

diff();
