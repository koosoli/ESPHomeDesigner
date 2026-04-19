import * as Generators from '../hardware_generators.js';
import {
    collectNumericSensors,
    collectTextSensors,
    collectBinarySensors,
    collectCustomStateTriggerActions
} from './entity_dedup.js';
import { registry } from '../../core/plugin_registry.js';

export function processPendingTriggers(
    sensorLines: string[],
    pendingTriggers: Map<string, Set<string>>,
    isLvgl: boolean,
    triggerName: string = "on_value"
): string[] {
    if (!isLvgl || !pendingTriggers || pendingTriggers.size === 0) return sensorLines;

    const mergedLines: string[] = [];
    let pendingInjection: { triggers: Set<string>; active: boolean; foundKey?: boolean } | null = null;

    for (let i = 0; i < sensorLines.length; i++) {
        const line = sensorLines[i];
        const trimmed = line.trim();

        mergedLines.push(line);

        const match = line.match(/^\s*(entity_id|id):\s*"?([^"]+)"?/);
        if (match) {
            const entityId = match[2].trim();
            const hasTrigger = pendingTriggers.has(entityId);

            if (hasTrigger) {
                let hasExistingTrigger = false;
                let hasInitialTrigger = false;
                const currentIndent = (line.match(/^\s*/) || [""])[0].length;

                for (let j = i + 1; j < sensorLines.length; j++) {
                    const nextLine = sensorLines[j];
                    const nextTrimmed = nextLine.trim();
                    if (!nextTrimmed) continue;
                    const nextIndent = (nextLine.match(/^\s*/) || [""])[0].length;

                    if (nextIndent <= currentIndent && nextTrimmed.startsWith("-")) break;

                    if (triggerName === "on_state" && nextTrimmed === "trigger_on_initial_state: true") {
                        hasInitialTrigger = true;
                    }

                    if (nextTrimmed === `${triggerName}:`) {
                        hasExistingTrigger = true;
                        break;
                    }
                }

                if (triggerName === "on_state" && !hasInitialTrigger) {
                    const indent = " ".repeat(currentIndent);
                    mergedLines.push(`${indent}trigger_on_initial_state: true`);
                }

                if (hasExistingTrigger) {
                    pendingInjection = {
                        triggers: pendingTriggers.get(entityId)!,
                        active: true
                    };
                } else {
                    const indent = " ".repeat(currentIndent);
                    mergedLines.push(`${indent}${triggerName}:`);
                    mergedLines.push(`${indent}  then:`);
                    for (const action of pendingTriggers.get(entityId)!) {
                        const actionLines = action.split('\n');
                        actionLines.forEach(actionLine => {
                            mergedLines.push(`${indent}    ${actionLine}`);
                        });
                    }
                }
            }
        }

        if (pendingInjection && pendingInjection.active) {
            if (trimmed === `${triggerName}:`) {
                pendingInjection.foundKey = true;
            } else if (pendingInjection.foundKey) {
                if (trimmed === "then:") {
                    const indentStr = " ".repeat((line.match(/^\s*/) || [""])[0].length + 2);
                    for (const action of pendingInjection.triggers) {
                        const actionLines = action.split('\n');
                        actionLines.forEach(actionLine => {
                            mergedLines.push(`${indentStr}${actionLine}`);
                        });
                    }
                    pendingInjection = null;
                } else if (trimmed.startsWith("-")) {
                    const indentStr = " ".repeat((line.match(/^\s*/) || [""])[0].length);
                    for (const action of pendingInjection.triggers) {
                        const actionLines = action.split('\n');
                        actionLines.forEach(actionLine => {
                            mergedLines.push(`${indentStr}${actionLine}`);
                        });
                    }
                    pendingInjection = null;
                }
            }
        }
    }

    return mergedLines;
}

export function buildInfrastructureLines(
    profile: any,
    layout: any,
    lines: string[],
    packageContent: string | null,
    seenSensorIds: Set<string>
): void {
    const packageHasPsram = packageContent && packageContent.includes("psram:");
    if (!packageHasPsram && profile.features?.psram && Generators.generatePSRAMSection) {
        lines.push(...Generators.generatePSRAMSection(profile));
    }

    if (!profile.isPackageBased && !layout.isSelectionSnippet) {
        lines.push("http_request:", "  verify_ssl: false", "  timeout: 20s", "  buffer_size_rx: 4096");

        if (Generators.generateI2CSection) lines.push(...Generators.generateI2CSection(profile));
        if (Generators.generateSPISection) lines.push(...Generators.generateSPISection(profile));
        if (Generators.generateExtraComponents) lines.push(...Generators.generateExtraComponents(profile));
        if (Generators.generateAXP2101Section) lines.push(...Generators.generateAXP2101Section(profile));
        if (Generators.generateOutputSection) lines.push(...Generators.generateOutputSection(profile));
        if (Generators.generateBacklightSection) lines.push(...Generators.generateBacklightSection(profile));
        if (Generators.generateRTTTLSection) lines.push(...Generators.generateRTTTLSection(profile));
        if (Generators.generateAudioSection) lines.push(...Generators.generateAudioSection(profile));

        const hasTime = lines.some(line => String(line).split('\n').some(subLine => subLine.trim() === "time:"));
        if (!hasTime) {
            lines.push("time:", "  - platform: homeassistant", "    id: ha_time");
            seenSensorIds.add("ha_time");
        }
    } else if (!layout.isSelectionSnippet) {
        const hasTime = lines.some(line => String(line).split('\n').some(subLine => subLine.trim() === "time:"));
        if (!hasTime) {
            lines.push("time:", "  - platform: homeassistant", "    id: ha_time");
            seenSensorIds.add("ha_time");
        }
    }

    if (!profile.features) return;

    if (profile.pins?.batteryAdc) {
        seenSensorIds.add("battery_voltage");
        seenSensorIds.add("battery_level");
    }
    if (profile.features.sht4x) {
        seenSensorIds.add("sht4x_sensor");
        seenSensorIds.add("sht4x_temperature");
        seenSensorIds.add("sht4x_humidity");
    }
    if (profile.features.sht3x || profile.features.sht3xd) {
        seenSensorIds.add("sht3x_sensor");
        seenSensorIds.add("sht3x_temperature");
        seenSensorIds.add("sht3x_humidity");
    }
    if (profile.features.shtc3) {
        seenSensorIds.add("shtc3_sensor");
        seenSensorIds.add("shtc3_temperature");
        seenSensorIds.add("shtc3_humidity");
    }
}

export function buildSensorSections({
    context,
    lines,
    yaml,
    setPendingTouchSensors
}: {
    context: any,
    lines: string[],
    yaml: any,
    setPendingTouchSensors: (touchSensorContent: string[]) => void
}): void {
    const { widgets: allWidgets, displayId, profile, isLvgl, pendingTriggers } = context;
    const pages = context.layout.pages || [];

    collectCustomStateTriggerActions(allWidgets, pendingTriggers);

    if (Generators.generateSensorSection) {
        lines.push(...Generators.generateSensorSection(profile, [], displayId, allWidgets));
    }

    const numericSensorLinesOrig: string[] = [];
    registry.onExportNumericSensors({ ...context, lines: numericSensorLinesOrig, mainLines: lines });
    const numericSensorLines = processPendingTriggers(numericSensorLinesOrig, pendingTriggers, isLvgl, "on_value");

    if (numericSensorLines.length > 0) {
        if (!lines.some(line => line === "sensor:")) lines.push("sensor:");
        lines.push(...numericSensorLines.flatMap(line => line.split('\n').map(sub => "  " + sub)));
    }

    const numericSensorLinesExtra = collectNumericSensors(pages, context);
    if (numericSensorLinesExtra.length > 0) {
        if (!lines.some(line => line === "sensor:")) lines.push("sensor:");

        const mergedSafetyLines = processPendingTriggers(numericSensorLinesExtra, pendingTriggers, isLvgl, "on_value");
        lines.push(...mergedSafetyLines.flatMap(line => line.split('\n').map(sub => "  " + sub)));
    }

    const textSensorLinesOrig: string[] = [];
    registry.onExportTextSensors({ ...context, lines: textSensorLinesOrig });

    const textSensorLinesExtra = collectTextSensors(pages, context);
    if (textSensorLinesExtra.length > 0) {
        textSensorLinesOrig.push(...textSensorLinesExtra);
    }

    const textSensorLines = processPendingTriggers(textSensorLinesOrig, pendingTriggers, isLvgl, "on_value");
    if (textSensorLines.length > 0) {
        lines.push("text_sensor:");
        lines.push(...textSensorLines.flatMap(line => line.split('\n').map(sub => "  " + sub)));
    }

    const binarySensorLinesOrig: string[] = [];

    const stayAwakeSensor = yaml.generateStayAwakeSection(context.layout);
    if (stayAwakeSensor.length > 0) {
        binarySensorLinesOrig.push(...stayAwakeSensor.slice(1).map((line: string) => line.startsWith("  ") ? line.slice(2) : line));
    }

    if (!profile.isPackageBased && Generators.generateBinarySensorSection) {
        const legacyBinary = Generators.generateBinarySensorSection(profile, pages.length, displayId, []);
        if (legacyBinary.length > 0 && legacyBinary[0].trim() === "binary_sensor:") {
            binarySensorLinesOrig.push(...legacyBinary.slice(1).map((line: string) => line.startsWith("  ") ? line.slice(2) : line));
        } else {
            binarySensorLinesOrig.push(...legacyBinary);
        }
    }

    const touchWidgets = allWidgets.filter((widget: any) => widget.type === 'touch_area' || widget.type === 'template_nav_bar');
    let touchSensorContent: string[] = [];
    if (touchWidgets.length > 0 && Generators.generateBinarySensorSection) {
        const touchBinary = Generators.generateBinarySensorSection({ touch: profile.touch, features: {} }, pages.length, displayId, touchWidgets);
        if (touchBinary.length > 0) {
            const startIdx = touchBinary[0]?.trim() === "binary_sensor:" ? 1 : 0;
            if (touchBinary.length > startIdx) {
                if (profile.isPackageBased) {
                    touchSensorContent = touchBinary.slice(startIdx);
                } else {
                    binarySensorLinesOrig.push(`# Touch Area Binary Sensors`);
                    binarySensorLinesOrig.push(...touchBinary.slice(startIdx).map((line: string) => line.startsWith("  ") ? line.slice(2) : line));
                }
            }
        }
    }

    setPendingTouchSensors(touchSensorContent);

    registry.onExportBinarySensors({ ...context, lines: binarySensorLinesOrig });
    const binarySensorLines = processPendingTriggers(binarySensorLinesOrig, pendingTriggers, isLvgl, "on_state");
    if (binarySensorLines.length > 0 && !profile.isPackageBased) {
        lines.push("binary_sensor:");
        lines.push(...binarySensorLines.flatMap(line => line.split('\n').map(sub => "  " + sub)));
    } else if (binarySensorLines.length > 0 && profile.isPackageBased) {
        const binaryBlock = ["binary_sensor:", ...binarySensorLines.map(line => "  " + line)];
        lines.push(...binaryBlock);
    }

    const binarySensorLinesExtra = collectBinarySensors(pages, context);
    if (binarySensorLinesExtra.length > 0) {
        if (!lines.some(line => line === "binary_sensor:")) lines.push("binary_sensor:");

        const mergedBinaryExtraLines = processPendingTriggers(binarySensorLinesExtra, pendingTriggers, isLvgl, "on_state");
        lines.push(...mergedBinaryExtraLines.flatMap(line => line.split('\n').map(sub => "  " + sub)));
    }

    if (!profile.isPackageBased && Generators.generateButtonSection) {
        const buttonLines = Generators.generateButtonSection(profile, pages.length, displayId);
        if (buttonLines.length > 0) {
            lines.push(...buttonLines);
        }
    }
}
