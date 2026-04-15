import { getPageSwitchDebounceMs } from '../navigation_debounce.js';
import { buildLayoutDiagnostics } from './yaml_generation_diagnostics.js';

/**
 * @param {any} payload
 * @param {any[]} pages
 * @param {any} profile
 * @returns {string[]}
 */
export function generateScriptSection(payload, pages, profile) {
    const lines = [];
    const diagnostics = buildLayoutDiagnostics(payload, pages);
    const displayId = profile.features?.lcd ? "my_display" : "epaper_display";
    const hasMultiplePages = pages.length > 1;
    const autoCycleEnabled = payload.autoCycleEnabled && pages.length > 1;
    const hasAnyVisibility = pages.some((p) => p.visible_from || p.visible_to);
    const hasPageRefreshOverrides = pages.some((p) => {
        if (p.refresh_type === 'daily' && p.refresh_time) return true;
        const refresh = parseInt(p.refresh_s);
        return !isNaN(refresh) && refresh > 0;
    });

    const isLcd = !!(profile.features && (profile.features.lcd || profile.features.oled));
    const isEpaper = !!(profile.features && (profile.features.epaper || profile.features.epd));
    const isOled = !!(profile.features && profile.features.oled);
    const debounceMs = getPageSwitchDebounceMs(profile);
    const backlightPin = profile.backlight?.pin || profile.pins?.backlight || null;
    const lcdStrategy = payload.lcdEcoStrategy || 'backlight_off';
    const isBacklightStrategy = isLcd && lcdStrategy === 'backlight_off' && backlightPin;
    const isDeepSleep = isEpaper && payload.deepSleepEnabled;

    /** @param {string} baseIndent */
    const appendFirmwareGuardDelay = (baseIndent) => {
        if (!payload.deepSleepFirmwareGuard) return;
        lines.push(`${baseIndent}- if:`);
        lines.push(`${baseIndent}    condition:`);
        lines.push(`${baseIndent}      lambda: 'return id(is_new_flash);'`);
        lines.push(`${baseIndent}    then:`);
        lines.push(`${baseIndent}      - logger.log: "New firmware - staying awake 90s to prevent rollback"`);
        lines.push(`${baseIndent}      - deep_sleep.prevent: deep_sleep_control`);
        lines.push(`${baseIndent}      - delay: 90s`);
        lines.push(`${baseIndent}      - deep_sleep.allow: deep_sleep_control`);
        lines.push(`${baseIndent}      - lambda: 'id(is_new_flash) = false;'`);
    };

    /**
     * @param {string} baseIndent
     * @param {string} logMessage
     * @param {string | null} [untilTime]
     */
    const appendDeepSleepEnter = (baseIndent, logMessage, untilTime = null) => {
        lines.push(`${baseIndent}- logger.log: "${logMessage}"`);
        if (untilTime) {
            lines.push(`${baseIndent}- deep_sleep.enter:`);
            lines.push(`${baseIndent}    id: deep_sleep_control`);
            lines.push(`${baseIndent}    until: "${untilTime}:00:00"`);
            lines.push(`${baseIndent}    time_id: ha_time`);
        } else {
            lines.push(`${baseIndent}- deep_sleep.enter: deep_sleep_control`);
        }
    };

    /** @param {string} baseIndent */
    const appendDeepSleepCycleBranch = (baseIndent) => {
        if (sEnabled) {
            const endStr = String(sEnd).padStart(2, '0');
            lines.push(`${baseIndent}- if:`);
            lines.push(`${baseIndent}    condition:`);
            lines.push(`${baseIndent}      lambda: |-`);
            lines.push(`${baseIndent}        auto time = id(ha_time).now();`);
            lines.push(`${baseIndent}        if (time.is_valid()) {`);
            lines.push(`${baseIndent}            int hour = time.hour;`);
            lines.push(`${baseIndent}            int start = ${sStart};`);
            lines.push(`${baseIndent}            int end = ${sEnd};`);
            lines.push(`${baseIndent}            if (start < end) {`);
            lines.push(`${baseIndent}                if (hour >= start && hour < end) return true;`);
            lines.push(`${baseIndent}            } else {`);
            lines.push(`${baseIndent}                if (hour >= start || hour < end) return true;`);
            lines.push(`${baseIndent}            }`);
            lines.push(`${baseIndent}        }`);
            lines.push(`${baseIndent}        return false;`);
            lines.push(`${baseIndent}    then:`);
            appendDeepSleepEnter(`${baseIndent}      `, 'Entering Night-time Deep Sleep...', endStr);
            lines.push(`${baseIndent}    else:`);
            appendDeepSleepEnter(`${baseIndent}      `, 'Entering Deep Sleep now...');
            return;
        }

        appendDeepSleepEnter(baseIndent, 'Entering Deep Sleep now...');
    };

    /** @param {string | null | undefined} ts */
    const getMin = (ts) => {
        if (!ts) return null;
        const parts = ts.split(':');
        return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    };

    const rawSleepStart = payload.noRefreshStartHour ?? payload.sleepStartHour;
    const rawSleepEnd = payload.noRefreshEndHour ?? payload.sleepEndHour;
    const sStart = parseInt(rawSleepStart ?? 0) || 0;
    const sEnd = parseInt(rawSleepEnd ?? 0) || 0;
    const hasSleepWindowConfig = rawSleepStart !== undefined && rawSleepStart !== null
        && rawSleepEnd !== undefined && rawSleepEnd !== null;
    const sEnabled = hasSleepWindowConfig && (
        payload.sleepEnabled === true || payload.sleepEnabled === "true" || payload.sleepEnabled === 1 || payload.sleepEnabled === "1" ||
        payload.deepSleepEnabled === true || payload.deepSleepEnabled === "true" || payload.deepSleepEnabled === 1 || payload.deepSleepEnabled === "1"
    );

    lines.push("script:");
    if (hasMultiplePages) {
        lines.push("  - id: change_page_to");
        lines.push("    parameters:");
        lines.push("      target_page: int");
        lines.push("    then:");
        lines.push("      - lambda: |-");
        lines.push(`          int pages_count = ${pages.length};`);
        lines.push("          int target = target_page;");
        lines.push("          while (target < 0) target += pages_count;");
        lines.push("          target %= pages_count;");
        lines.push("");
        lines.push(`          // Debounce: Ignore page changes within ${debounceMs}ms of last change`);
        lines.push(`          // (adjusted for ${isLcd ? 'LCD' : 'e-paper'} display update time)`);
        lines.push("          uint32_t now = millis();");
        lines.push(`          if (now - id(last_page_switch_time) < ${debounceMs}) {`);
        lines.push(`            ESP_LOGD("display", "Page change ignored (debounce), last switch was %d ms ago", now - id(last_page_switch_time));`);
        lines.push("            return;");
        lines.push("          }");
        lines.push("");
        lines.push("          if (id(display_page) != target) {");
        lines.push("            // Set debounce time BEFORE display update (update takes ~1.6s)");
        lines.push("            id(last_page_switch_time) = now;");
        lines.push("            id(display_page) = target;");
        lines.push(`            id(${displayId}).update();`);
        lines.push(`            ESP_LOGI("display", "Switched to page %d", target);`);
        if (isBacklightStrategy) {
            lines.push(`            // LCD Strategy: Wake up backlight on interaction/page change`);
            lines.push(`            id(backlight_pwm).set_level(0.8); // Restore brightness`);
        }
        lines.push("          }");
    }

    if (isDeepSleep) {
        lines.push("");
        lines.push("  - id: deep_sleep_cycle");
        lines.push("    mode: restart");
        lines.push("    then:");

        appendFirmwareGuardDelay('      ');

        if (payload.deepSleepStayAwakeSwitch) {
            lines.push("      - if:");
            lines.push("          condition:");
            lines.push("            binary_sensor.is_on: stay_awake_switch");
            lines.push("          then:");
            lines.push('            - logger.log: "Deep Sleep prevented, retrying in 60s"');
            lines.push("            - deep_sleep.prevent: deep_sleep_control");
            lines.push("            - delay: 60s");
            lines.push("            - script.execute: deep_sleep_cycle");
            lines.push("          else:");
            appendDeepSleepCycleBranch('            ');
        } else {
            appendDeepSleepCycleBranch('      ');
        }
    }

    lines.push("");
    lines.push("  - id: manage_run_and_sleep", "    mode: restart", "    then:");

    if (profile.m5paper?.main_power_pin || profile.pins?.main_power_pin) lines.push("      - output.turn_on: main_power");
    if (profile.m5paper?.battery_power_pin || profile.pins?.battery_power_pin) lines.push("      - output.turn_on: battery_power");

    if (isDeepSleep && payload.deepSleepFirmwareGuard) {
        lines.push("      - lambda: |-");
        lines.push('          std::string version_str = __DATE__ " " __TIME__;');
        lines.push("          uint32_t current_hash = 0;");
        lines.push("          for (char c : version_str) {");
        lines.push("            current_hash = ((current_hash << 5) + current_hash) + c;");
        lines.push("          }");
        lines.push("          if (id(firmware_fingerprint) != current_hash) {");
        lines.push('            ESP_LOGW("firmware", "New firmware detected! Hash: %u", current_hash);');
        lines.push("            id(is_new_flash) = true;");
        lines.push("            id(firmware_fingerprint) = current_hash;");
        lines.push("          } else {");
        lines.push("            id(is_new_flash) = false;");
        lines.push("          }");
    }

    lines.push("      - if:");
    lines.push("          condition:");
    lines.push(`            lambda: 'return !(id(ha_time).now().is_valid() && api_is_connected());'`);
    lines.push("          then:");
    lines.push('            - logger.log: "Waiting for sync..."');
    lines.push("            - wait_until:");
    lines.push("                condition:");
    lines.push(`                  lambda: 'return id(ha_time).now().is_valid() && api_is_connected();'`);
    lines.push("                timeout: 120s");
    lines.push("      - if:");
    lines.push("          condition:");
    lines.push(`            lambda: 'return id(initial_sensor_sync_pending);'`);
    lines.push("          then:");
    lines.push(`            - logger.log: "${diagnostics.bootLogLine}"`);
    lines.push('            - logger.log: "OTA hint: if this build line does not match the YAML header, the device booted a different image or rolled back."');
    lines.push('            - logger.log: "Waiting 5s for initial sensor updates..."');
    lines.push("            - delay: 5s");
    lines.push(`            - lambda: 'id(initial_sensor_sync_pending) = false;'`);

    if (autoCycleEnabled) lines.push("      - script.execute: auto_cycle_timer");

    const hasPageRefreshRuntimeOverrides = !isDeepSleep && hasPageRefreshOverrides;
    /** @type {string[]} */
    const runtimeLines = [];
    if (hasMultiplePages || hasPageRefreshRuntimeOverrides) runtimeLines.push("          int p = id(display_page);");
    if (!isDeepSleep) runtimeLines.push("          int interval = id(page_refresh_default_s);");

    const needsSleepFlag = (!isDeepSleep && sEnabled) || isBacklightStrategy;
    const needsCurrentTime = hasAnyVisibility || needsSleepFlag || hasPageRefreshRuntimeOverrides;
    if (needsSleepFlag) runtimeLines.push("          bool is_sleep_time = false;");

    if (needsCurrentTime) {
        runtimeLines.push("          auto time = id(ha_time).now();");
        runtimeLines.push("          if (time.is_valid()) {");
        runtimeLines.push("             int hour = time.hour;");
        if (hasAnyVisibility || hasPageRefreshRuntimeOverrides) {
            runtimeLines.push("             int minute = time.minute;");
            runtimeLines.push("             int curr_min = hour * 60 + minute;");
        }
        if (needsSleepFlag) {
            runtimeLines.push(`             int start = ${sStart};`);
            runtimeLines.push(`             int end = ${sEnd};`);
            runtimeLines.push("             if (start < end) {");
            runtimeLines.push("                 if (hour >= start && hour < end) is_sleep_time = true;");
            runtimeLines.push("             } else if (start > end) {");
            runtimeLines.push("                 if (hour >= start || hour < end) is_sleep_time = true;");
            runtimeLines.push("             } ");
        }

        if (hasMultiplePages && hasAnyVisibility) {
            runtimeLines.push("");
            runtimeLines.push("             // Visibility Logic: Find best page for current time");
            runtimeLines.push("             int best_page = -1;");
            pages.forEach((page, idx) => {
                const from = getMin(page.visible_from);
                const to = getMin(page.visible_to);
                if (from !== null && to !== null) {
                    if (from < to) {
                        runtimeLines.push(`             if (best_page == -1 && curr_min >= ${from} && curr_min < ${to}) best_page = ${idx};`);
                    } else {
                        runtimeLines.push(`             if (best_page == -1 && (curr_min >= ${from} || curr_min < ${to})) best_page = ${idx};`);
                    }
                }
            });
            pages.forEach((page, idx) => {
                if (!page.visible_from && !page.visible_to) {
                    runtimeLines.push(`             if (best_page == -1) best_page = ${idx};`);
                }
            });
            runtimeLines.push("");
            runtimeLines.push("             // If current page is invisible OR another should be shown, switch");
            runtimeLines.push("             if (best_page != -1 && best_page != p) {");
            runtimeLines.push('                 ESP_LOGI("display", "Auto-switching to scheduled page %d", best_page);');
            runtimeLines.push("                 id(change_page_to).execute(best_page);");
            runtimeLines.push("                 return;");
            runtimeLines.push("             }");
        }
        runtimeLines.push("          }");
    }

    if (isLcd) {
        if (isBacklightStrategy) {
            runtimeLines.push("          #ifdef USE_BACKLIGHT");
            runtimeLines.push("          if (is_sleep_time) {");
            runtimeLines.push("              auto call = id(backlight_pwm).make_call();");
            runtimeLines.push("              call.set_brightness(0.0);");
            runtimeLines.push("              call.perform();");
            runtimeLines.push("              interval = 3600; // Check back in an hour");
            runtimeLines.push("          } else {");
            runtimeLines.push("              auto call = id(backlight_pwm).make_call();");
            runtimeLines.push("              call.set_brightness(0.8);");
            runtimeLines.push("              call.perform();");
            runtimeLines.push("          }");
            runtimeLines.push("          #endif");
        } else if (isOled && sEnabled) {
            runtimeLines.push("          if (is_sleep_time) {");
            runtimeLines.push("              interval = 3600;");
            runtimeLines.push("          }");
        }
    } else if (sEnabled && !isDeepSleep) {
        runtimeLines.push("          if (is_sleep_time) {");
        runtimeLines.push("              interval = 3600; // Sleep for an hour (skip updates)");
        runtimeLines.push("          }");
    }

    if (hasPageRefreshRuntimeOverrides) {
        if (sEnabled) runtimeLines.push("          if (!is_sleep_time) {");
        pages.forEach((page, idx) => {
            if (page.refresh_type === 'daily' && page.refresh_time) {
                const targetMin = getMin(page.refresh_time);
                runtimeLines.push(`            if (p == ${idx}) {`);
                runtimeLines.push(`               int target_min = ${targetMin};`);
                runtimeLines.push("               int diff = target_min - curr_min;");
                runtimeLines.push("               if (diff <= 0) diff += 1440; // Next day");
                runtimeLines.push("               interval = diff * 60;");
                runtimeLines.push("            }");
            } else {
                const refresh = parseInt(page.refresh_s);
                if (!isNaN(refresh) && refresh > 0) runtimeLines.push(`            if (p == ${idx}) interval = ${refresh};`);
            }
        });
        if (sEnabled) runtimeLines.push("          }");
    }

    if (!isDeepSleep) runtimeLines.push("          id(page_refresh_current_s) = interval;");
    if (runtimeLines.length > 0) {
        lines.push("      - lambda: |-");
        lines.push(...runtimeLines);
    }

    if (isDeepSleep && sEnabled) {
        lines.push("      - if:");
        lines.push("          condition:");
        lines.push("            lambda: |-");
        lines.push("              auto time = id(ha_time).now();");
        lines.push("              if (time.is_valid()) {");
        lines.push("                int hour = time.hour;");
        lines.push(`                int start = ${sStart};`);
        lines.push(`                int end = ${sEnd};`);
        lines.push("                if (start < end) {");
        lines.push("                  if (hour >= start && hour < end) return false;");
        lines.push("                } else if (start > end) {");
        lines.push("                  if (hour >= start || hour < end) return false;");
        lines.push("                }");
        lines.push("              }");
        lines.push("              return true; // Not sleep time, update display");
        lines.push("          then:");
        if (!isLcd) lines.push(`            - component.update: ${displayId}`);
        else lines.push('            - logger.log: "Display update managed by hardware timer."');
        lines.push("          else:");
        lines.push('            - logger.log: "Night-time sleep active, skipping display update."');
    } else if (!isLcd) {
        lines.push(`      - component.update: ${displayId}`);
    }

    const isManualRefresh = !!payload.manualRefreshOnly;
    if (!isManualRefresh) {
        if (isDeepSleep) {
            lines.push("      - script.execute: deep_sleep_cycle");
        } else {
            lines.push("      - delay: !lambda 'return id(page_refresh_current_s) * 1000;'");
            lines.push("      - script.execute: manage_run_and_sleep");
        }
    } else {
        lines.push('      - logger.log: "Manual Refresh Only mode: stopping automatic refresh loop."');
    }

    if (autoCycleEnabled) {
        const globalInterval = payload.autoCycleIntervalS || 30;
        lines.push("  - id: auto_cycle_timer", "    mode: restart", "    then:");
        lines.push(`      - delay: ${globalInterval}s`);
        lines.push("      - script.execute:");
        lines.push("          id: change_page_to");
        lines.push("          target_page: !lambda 'return id(display_page) + 1;'");
        lines.push("      - script.execute: auto_cycle_timer");
    }

    return lines;
}
