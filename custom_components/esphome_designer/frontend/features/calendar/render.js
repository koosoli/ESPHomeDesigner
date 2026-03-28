import { AppState } from '@core/state';

/**
 * @param {HTMLElement} el
 * @param {Widget} widget
 * @param {Record<string, any>} props
 * @param {{ getColorStyle: (color: string) => string }} context
 */
export const drawCalendarPreview = (el, widget, props, { getColorStyle }) => {
    const width = widget.width || 400;
    const height = widget.height || 300;

    const color = props.text_color || "theme_auto";
    const colorStyle = getColorStyle(color);

    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    el.style.backgroundColor = props.background_color || "transparent";
    el.style.borderRadius = `${props.border_radius || 0}px`;
    el.style.overflow = "hidden";
    el.style.color = colorStyle;
    el.style.padding = "4px";
    el.style.boxSizing = "border-box";

    if (props.border_width) {
        const borderColor = props.border_color || color;
        el.style.border = `${props.border_width}px solid ${getColorStyle(borderColor)}`;
    } else {
        el.style.border = "none";
    }

    const now = new Date();
    const date = now.getDate();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const dayNameText = dayNames[now.getDay()];
    const monthYearText = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;

    const header = document.createElement("div");
    header.style.textAlign = "center";
    header.style.padding = "2px";
    header.style.borderBottom = `1px solid ${colorStyle}`;
    header.style.flexShrink = "0";

    const bigDate = document.createElement("div");
    bigDate.style.fontSize = `${Math.min((props.font_size_date || 100) * 0.7, 80)}px`;
    bigDate.style.fontWeight = props.font_weight_header_date || "100";
    bigDate.style.lineHeight = "0.8";
    bigDate.innerText = String(date);
    header.appendChild(bigDate);

    const dayName = document.createElement("div");
    dayName.style.fontSize = `${props.font_size_day || 24}px`;
    dayName.style.fontWeight = props.font_weight_header_day || "bold";
    dayName.style.marginTop = "4px";
    dayName.innerText = dayNameText;
    header.appendChild(dayName);

    const dateLine = document.createElement("div");
    dateLine.style.fontSize = `${props.font_size_grid || 14}px`;
    dateLine.style.fontWeight = props.font_weight_month || "normal";
    dateLine.innerText = monthYearText;
    header.appendChild(dateLine);

    el.style.display = "flex";
    el.style.flexDirection = "column";
    if (props.show_header !== false) {
        el.appendChild(header);
    }

    const grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(7, 1fr)";
    grid.style.padding = "2px";
    grid.style.gap = "1px";
    grid.style.flexShrink = "0";

    const gridFontSize = `${props.font_size_grid || 14}px`;
    ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].forEach((day) => {
        const cell = document.createElement("div");
        cell.innerText = String(day);
        cell.style.textAlign = "center";
        cell.style.fontWeight = props.font_weight_grid_header || "bold";
        cell.style.fontSize = gridFontSize;
        grid.appendChild(cell);
    });

    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();

    let startDay = firstDay.getDay();
    if (startDay === 0) startDay = 7;
    startDay -= 1;

    for (let index = 0; index < startDay; index += 1) {
        grid.appendChild(document.createElement("div"));
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
        const cell = document.createElement("div");
        cell.innerText = String(day);
        cell.style.textAlign = "center";
        cell.style.fontSize = gridFontSize;
        cell.style.fontWeight = String(props.font_weight_dates !== undefined ? props.font_weight_dates : (props.bold_dates !== false ? 700 : 400));

        if (day === date) {
            cell.style.backgroundColor = colorStyle;
            const backgroundProp = props.background_color || "transparent";
            if (backgroundProp === "transparent") {
                cell.style.color = (colorStyle.includes("white") || colorStyle.includes("#f") || colorStyle.includes("255")) ? "black" : "white";
            } else {
                cell.style.color = getColorStyle(backgroundProp);
            }
            cell.style.borderRadius = "50%";
            cell.style.width = "1.5em";
            cell.style.height = "1.5em";
            cell.style.lineHeight = "1.5em";
            cell.style.margin = "0 auto";
            cell.style.fontWeight = props.font_weight_dates || "bold";
        }

        grid.appendChild(cell);
    }

    if (props.show_grid !== false) {
        el.appendChild(grid);
    }

    const events = document.createElement("div");
    events.style.padding = "5px";
    events.style.fontSize = `${props.font_size_event || 18}px`;
    events.style.fontWeight = props.font_weight_events || "normal";
    events.style.flexGrow = "1";
    events.style.overflow = "hidden";

    /** @type {Array<Record<string, any>> | null} */
    let liveEvents = null;
    const entityId = (widget.entity_id || props.entity_id || "sensor.esp_calendar_data").trim();
    if (AppState?.entityStates) {
        const stateObj = AppState.entityStates[entityId];
        if (stateObj) {
            try {
                if (stateObj.attributes?.entries) {
                    if (typeof stateObj.attributes.entries === 'string') {
                        const parsed = JSON.parse(stateObj.attributes.entries);
                        liveEvents = parsed.days || parsed;
                    } else {
                        liveEvents = stateObj.attributes.entries.days || stateObj.attributes.entries;
                    }
                } else if (stateObj.state && stateObj.state.length > 5 && stateObj.state !== "OK" && stateObj.state !== "unknown") {
                    const parsed = JSON.parse(stateObj.state);
                    liveEvents = parsed.days || parsed;
                } else if (stateObj.attributes && stateObj.attributes.message !== undefined) {
                    const start = stateObj.attributes.start_time || "";
                    const end = stateObj.attributes.end_time || "";
                    const isAllDay = stateObj.attributes.all_day === true;
                    liveEvents = [{
                        day: now.getDate(),
                        all_day: isAllDay ? [{ summary: stateObj.attributes.message, start, end }] : [],
                        other: !isAllDay ? [{ summary: stateObj.attributes.message, start, end }] : []
                    }];
                }
            } catch (error) {
                console.warn("[Calendar Widget] Failed to parse live state/attributes:", error);
            }
        }
    }

    if (liveEvents && Array.isArray(liveEvents) && liveEvents.length > 0) {
        events.innerHTML = "";
        const limit = parseInt(String(props.max_events || props.event_limit || 8), 10);
        let count = 0;
        for (const dayEntry of liveEvents) {
            if (count >= limit) break;
            const dayNum = dayEntry.day;

            /**
             * @param {Record<string, any>} event
             * @param {boolean} isAllDay
             */
            const drawRow = (event, isAllDay) => {
                if (count >= limit) return;
                const summary = event.summary || "No Title";
                const start = event.start || "";
                let timeText = isAllDay ? "All Day" : "";
                if (!isAllDay && start.includes("T")) {
                    timeText = start.split("T")[1].substring(0, 5);
                }

                const row = document.createElement("div");
                row.style.marginBottom = "4px";
                row.style.display = "flex";
                row.style.justifyContent = "space-between";
                row.innerHTML = `<span style="flex-shrink:0;width:25px;"><b>${dayNum}</b></span>` +
                    `<span style="flex-grow:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-right:8px;">${summary}</span>` +
                    `<span style="flex-shrink:0;opacity:0.7;font-size:0.9em;">${timeText}</span>`;
                events.appendChild(row);
                count += 1;
            };

            const allDayEvents = Array.isArray(dayEntry.all_day)
                ? /** @type {Array<Record<string, any>>} */ (dayEntry.all_day)
                : [];
            const timedEvents = Array.isArray(dayEntry.other)
                ? /** @type {Array<Record<string, any>>} */ (dayEntry.other)
                : [];

            allDayEvents.forEach((event) => drawRow(event, true));
            timedEvents.forEach((event) => drawRow(event, false));
        }
    } else {
        events.innerHTML = `
            <div style="margin-bottom:4px;"><b>${date}</b> Meeting with Team</div>
            <div><b>${Math.min(date + 2, daysInMonth)}</b> Dentist Appointment</div>
        `;
    }

    if (props.show_events !== false) {
        el.appendChild(events);
    }
};

/**
 * @param {HTMLElement} el
 * @param {Widget} widget
 * @param {{ getColorStyle: (color: string) => string }} context
 */
export const render = (el, widget, context) => {
    drawCalendarPreview(el, widget, widget.props || {}, context);
};
