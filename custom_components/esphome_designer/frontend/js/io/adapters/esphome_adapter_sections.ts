import * as Generators from "../hardware_generators.js";
import {
  collectNumericSensors,
  collectTextSensors,
  collectBinarySensors,
  collectCustomStateTriggerActions,
  buildPendingTriggerLookupKey,
} from "./entity_dedup.js";
import { registry } from "../../core/plugin_registry.js";

const getLineIndent = (line: string): number =>
  (line.match(/^\s*/) || [""])[0].length;

const isTopLevelItemStart = (line: string): boolean => {
  const trimmed = line.trim();
  return getLineIndent(line) === 0 && trimmed.startsWith("- ");
};

const getPendingActionsForItem = (
  pendingTriggers: Map<string, Set<string>>,
  triggerName: string,
  keys: string[],
): string[] => {
  const orderedActions: string[] = [];
  const seenActions = new Set<string>();

  keys.forEach((key) => {
    if (!key) return;

    [key, buildPendingTriggerLookupKey(key, triggerName)].forEach(
      (lookupKey) => {
        const actions = pendingTriggers.get(lookupKey);
        if (!actions) return;

        actions.forEach((action) => {
          if (seenActions.has(action)) return;
          seenActions.add(action);
          orderedActions.push(action);
        });
      },
    );
  });

  return orderedActions;
};

const appendActionLines = (
  target: string[],
  actions: string[],
  indent: string,
): void => {
  actions.forEach((action) => {
    action.split("\n").forEach((actionLine) => {
      target.push(`${indent}${actionLine}`);
    });
  });
};

const findItemInsertionIndex = (
  itemLines: string[],
  propertyIndent: number,
): number => {
  for (let index = 1; index < itemLines.length; index += 1) {
    const trimmed = itemLines[index].trim();
    if (!trimmed) continue;

    const indent = getLineIndent(itemLines[index]);
    if (
      indent === propertyIndent &&
      (trimmed === "internal: true" || trimmed.startsWith("attribute:"))
    ) {
      return index;
    }
  }

  return itemLines.length;
};

const mergePendingActionsIntoItem = (
  itemLines: string[],
  triggerName: string,
  actions: string[],
): string[] => {
  if (actions.length === 0) return itemLines;

  const propertyIndent = getLineIndent(itemLines[0]) + 2;
  const propertyIndentStr = " ".repeat(propertyIndent);
  const actionIndentStr = " ".repeat(propertyIndent + 4);
  const hasInitialTrigger = itemLines.some(
    (line) => line.trim() === "trigger_on_initial_state: true",
  );
  const triggerIndex = itemLines.findIndex(
    (line) => line.trim() === `${triggerName}:`,
  );

  if (triggerIndex !== -1) {
    const mergedLines = [...itemLines];

    if (triggerName === "on_state" && !hasInitialTrigger) {
      mergedLines.splice(
        triggerIndex,
        0,
        `${propertyIndentStr}trigger_on_initial_state: true`,
      );
    }

    const triggerIndexWithInitialState = mergedLines.findIndex(
      (line) => line.trim() === `${triggerName}:`,
    );
    const thenIndex = mergedLines.findIndex(
      (line, index) =>
        index > triggerIndexWithInitialState &&
        line.trim() === "then:" &&
        getLineIndent(line) > propertyIndent,
    );

    const insertionIndex =
      thenIndex === -1 ? triggerIndexWithInitialState + 1 : thenIndex + 1;
    const insertedLines: string[] = [];

    if (thenIndex === -1) {
      insertedLines.push(`${propertyIndentStr}  then:`);
    }

    appendActionLines(insertedLines, actions, actionIndentStr);
    mergedLines.splice(insertionIndex, 0, ...insertedLines);
    return mergedLines;
  }

  const mergedLines = [...itemLines];
  const insertionIndex = findItemInsertionIndex(mergedLines, propertyIndent);
  const insertedLines: string[] = [];

  if (triggerName === "on_state" && !hasInitialTrigger) {
    insertedLines.push(`${propertyIndentStr}trigger_on_initial_state: true`);
  }

  insertedLines.push(`${propertyIndentStr}${triggerName}:`);
  insertedLines.push(`${propertyIndentStr}  then:`);
  appendActionLines(insertedLines, actions, actionIndentStr);
  mergedLines.splice(insertionIndex, 0, ...insertedLines);
  return mergedLines;
};

export function processPendingTriggers(
  sensorLines: string[],
  pendingTriggers: Map<string, Set<string>>,
  isLvgl: boolean,
  triggerName: string = "on_value",
): string[] {
  if (!isLvgl || !pendingTriggers || pendingTriggers.size === 0)
    return sensorLines;

  const mergedLines: string[] = [];

  for (let index = 0; index < sensorLines.length; index += 1) {
    const line = sensorLines[index];

    if (!isTopLevelItemStart(line)) {
      mergedLines.push(line);
      continue;
    }

    let itemEnd = index + 1;
    while (
      itemEnd < sensorLines.length &&
      !isTopLevelItemStart(sensorLines[itemEnd])
    ) {
      itemEnd += 1;
    }

    const itemLines = sensorLines.slice(index, itemEnd);
    const matchedKeys = Array.from(
      new Set(
        itemLines
          .map((itemLine) =>
            itemLine.match(/^\s*(entity_id|id):\s*["']?([^"'\s#]+)["']?/),
          )
          .filter(Boolean)
          .map((match) => match?.[2]?.trim() || "")
          .filter(Boolean),
      ),
    );
    const actions = getPendingActionsForItem(
      pendingTriggers,
      triggerName,
      matchedKeys,
    );

    mergedLines.push(
      ...mergePendingActionsIntoItem(itemLines, triggerName, actions),
    );
    index = itemEnd - 1;
  }

  return mergedLines;
}

export function buildInfrastructureLines(
  profile: any,
  layout: any,
  lines: string[],
  packageContent: string | null,
  seenSensorIds: Set<string>,
): void {
  const packageHasPsram = packageContent && packageContent.includes("psram:");
  if (
    !packageHasPsram &&
    profile.features?.psram &&
    Generators.generatePSRAMSection
  ) {
    lines.push(...Generators.generatePSRAMSection(profile));
  }

  if (!profile.isPackageBased && !layout.isSelectionSnippet) {
    const httpBufSize = layout.httpBufferSizeRx ?? 4096;
    lines.push(
      "http_request:",
      "  verify_ssl: false",
      "  timeout: 20s",
      `  buffer_size_rx: ${httpBufSize}`,
    );

    if (Generators.generateI2CSection)
      lines.push(...Generators.generateI2CSection(profile));
    if (Generators.generateSPISection)
      lines.push(...Generators.generateSPISection(profile));
    if (Generators.generateExtraComponents)
      lines.push(...Generators.generateExtraComponents(profile));
    if (Generators.generateAXP2101Section)
      lines.push(...Generators.generateAXP2101Section(profile));
    if (Generators.generateOutputSection)
      lines.push(...Generators.generateOutputSection(profile));
    if (Generators.generateBacklightSection)
      lines.push(...Generators.generateBacklightSection(profile));
    if (Generators.generateRTTTLSection)
      lines.push(...Generators.generateRTTTLSection(profile));
    if (Generators.generateAudioSection)
      lines.push(...Generators.generateAudioSection(profile));

    const hasTime = lines.some((line) =>
      String(line)
        .split("\n")
        .some((subLine) => subLine.trim() === "time:"),
    );
    if (!hasTime) {
      lines.push("time:", "  - platform: homeassistant", "    id: ha_time");
      seenSensorIds.add("ha_time");
    }
  } else if (!layout.isSelectionSnippet) {
    const hasTime = lines.some((line) =>
      String(line)
        .split("\n")
        .some((subLine) => subLine.trim() === "time:"),
    );
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
  setPendingTouchSensors,
}: {
  context: any;
  lines: string[];
  yaml: any;
  setPendingTouchSensors: (touchSensorContent: string[]) => void;
}): void {
  const {
    widgets: allWidgets,
    displayId,
    profile,
    isLvgl,
    pendingTriggers,
  } = context;
  const pages = context.layout.pages || [];

  collectCustomStateTriggerActions(allWidgets, pendingTriggers);

  if (Generators.generateSensorSection) {
    lines.push(
      ...Generators.generateSensorSection(profile, [], displayId, allWidgets),
    );
  }

  const numericSensorLinesOrig: string[] = [];
  registry.onExportNumericSensors({
    ...context,
    lines: numericSensorLinesOrig,
    mainLines: lines,
  });
  const numericSensorLines = processPendingTriggers(
    numericSensorLinesOrig,
    pendingTriggers,
    isLvgl,
    "on_value",
  );

  if (numericSensorLines.length > 0) {
    if (!lines.some((line) => line === "sensor:")) lines.push("sensor:");
    lines.push(
      ...numericSensorLines.flatMap((line) =>
        line.split("\n").map((sub) => "  " + sub),
      ),
    );
  }

  const numericSensorLinesExtra = collectNumericSensors(pages, context);
  if (numericSensorLinesExtra.length > 0) {
    if (!lines.some((line) => line === "sensor:")) lines.push("sensor:");

    const mergedSafetyLines = processPendingTriggers(
      numericSensorLinesExtra,
      pendingTriggers,
      isLvgl,
      "on_value",
    );
    lines.push(
      ...mergedSafetyLines.flatMap((line) =>
        line.split("\n").map((sub) => "  " + sub),
      ),
    );
  }

  const textSensorLinesOrig: string[] = [];
  registry.onExportTextSensors({ ...context, lines: textSensorLinesOrig });

  const textSensorLinesExtra = collectTextSensors(pages, context);
  if (textSensorLinesExtra.length > 0) {
    textSensorLinesOrig.push(...textSensorLinesExtra);
  }

  const textSensorLines = processPendingTriggers(
    textSensorLinesOrig,
    pendingTriggers,
    isLvgl,
    "on_value",
  );
  if (textSensorLines.length > 0) {
    lines.push("text_sensor:");
    lines.push(
      ...textSensorLines.flatMap((line) =>
        line.split("\n").map((sub) => "  " + sub),
      ),
    );
  }

  const binarySensorLinesOrig: string[] = [];

  const stayAwakeSensor = yaml.generateStayAwakeSection(context.layout);
  if (stayAwakeSensor.length > 0) {
    binarySensorLinesOrig.push(
      ...stayAwakeSensor
        .slice(1)
        .map((line: string) => (line.startsWith("  ") ? line.slice(2) : line)),
    );
  }

  if (!profile.isPackageBased && Generators.generateBinarySensorSection) {
    const legacyBinary = Generators.generateBinarySensorSection(
      profile,
      pages.length,
      displayId,
      [],
    );
    if (
      legacyBinary.length > 0 &&
      legacyBinary[0].trim() === "binary_sensor:"
    ) {
      binarySensorLinesOrig.push(
        ...legacyBinary
          .slice(1)
          .map((line: string) =>
            line.startsWith("  ") ? line.slice(2) : line,
          ),
      );
    } else {
      binarySensorLinesOrig.push(...legacyBinary);
    }
  }

  const touchWidgets = allWidgets.filter(
    (widget: any) =>
      widget.type === "touch_area" || widget.type === "template_nav_bar",
  );
  let touchSensorContent: string[] = [];
  if (touchWidgets.length > 0 && Generators.generateBinarySensorSection) {
    const touchBinary = Generators.generateBinarySensorSection(
      { touch: profile.touch, features: {} },
      pages.length,
      displayId,
      touchWidgets,
    );
    if (touchBinary.length > 0) {
      const startIdx = touchBinary[0]?.trim() === "binary_sensor:" ? 1 : 0;
      if (touchBinary.length > startIdx) {
        if (profile.isPackageBased) {
          touchSensorContent = touchBinary.slice(startIdx);
        } else {
          binarySensorLinesOrig.push(`# Touch Area Binary Sensors`);
          binarySensorLinesOrig.push(
            ...touchBinary
              .slice(startIdx)
              .map((line: string) =>
                line.startsWith("  ") ? line.slice(2) : line,
              ),
          );
        }
      }
    }
  }

  setPendingTouchSensors(touchSensorContent);

  registry.onExportBinarySensors({ ...context, lines: binarySensorLinesOrig });
  const binarySensorLines = processPendingTriggers(
    binarySensorLinesOrig,
    pendingTriggers,
    isLvgl,
    "on_state",
  );
  if (binarySensorLines.length > 0 && !profile.isPackageBased) {
    lines.push("binary_sensor:");
    lines.push(
      ...binarySensorLines.flatMap((line) =>
        line.split("\n").map((sub) => "  " + sub),
      ),
    );
  } else if (binarySensorLines.length > 0 && profile.isPackageBased) {
    const binaryBlock = [
      "binary_sensor:",
      ...binarySensorLines.map((line) => "  " + line),
    ];
    lines.push(...binaryBlock);
  }

  const binarySensorLinesExtra = collectBinarySensors(pages, context);
  if (binarySensorLinesExtra.length > 0) {
    if (!lines.some((line) => line === "binary_sensor:"))
      lines.push("binary_sensor:");

    const mergedBinaryExtraLines = processPendingTriggers(
      binarySensorLinesExtra,
      pendingTriggers,
      isLvgl,
      "on_state",
    );
    lines.push(
      ...mergedBinaryExtraLines.flatMap((line) =>
        line.split("\n").map((sub) => "  " + sub),
      ),
    );
  }

  if (!profile.isPackageBased && Generators.generateButtonSection) {
    const buttonLines = Generators.generateButtonSection(
      profile,
      pages.length,
      displayId,
    );
    if (buttonLines.length > 0) {
      lines.push(...buttonLines);
    }
  }
}
