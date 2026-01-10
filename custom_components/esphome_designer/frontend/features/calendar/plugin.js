/**
 * Calendar Plugin
 */

const drawCalendarPreview = (el, widget, props) => {
    // Simple mock rendering for preview
    const width = widget.width || 400;
    const height = widget.height || 300;

    el.style.width = width + "px";
    el.style.height = height + "px";
    el.style.position = "relative";
    el.style.backgroundColor = props.background_color || "white";
    el.style.color = props.text_color || "black";
    el.style.padding = "4px";
    el.style.boxSizing = "border-box";

    if (props.show_border !== false) {
        el.style.border = `${props.border_width || 2}px solid ${props.border_color || "black"}`;
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
    header.style.borderBottom = "1px solid " + (props.text_color || "black");
    header.style.flexShrink = "0";

    const bigDate = document.createElement("div");
    bigDate.style.fontSize = Math.min((props.font_size_date || 100) / 2, 80) + "px";
    bigDate.style.fontWeight = "100";
    bigDate.style.lineHeight = "0.8";
    bigDate.innerText = date;
    header.appendChild(bigDate);

    const dayName = document.createElement("div");
    dayName.style.fontSize = (props.font_size_day || 24) + "px";
    dayName.style.fontWeight = "bold";
    dayName.innerText = dayNameText;
    header.appendChild(dayName);

    const dateLine = document.createElement("div");
    dateLine.style.fontSize = (props.font_size_grid || 14) + "px";
    dateLine.innerText = monthYearText;
    header.appendChild(dateLine);

    el.style.display = "flex";
    el.style.flexDirection = "column";
    el.appendChild(header);

    const grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(7, 1fr)";
    grid.style.padding = "2px";
    grid.style.gap = "1px";
    grid.style.flexShrink = "0";

    const gridFontSize = (props.font_size_grid || 14) + "px";

    ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].forEach(day => {
        const d = document.createElement("div");
        d.innerText = day;
        d.style.textAlign = "center";
        d.style.fontWeight = "bold";
        d.style.fontSize = gridFontSize;
        grid.appendChild(d);
    });

    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();

    let startDay = firstDay.getDay();
    if (startDay === 0) startDay = 7;
    startDay -= 1;

    for (let i = 0; i < startDay; i++) {
        grid.appendChild(document.createElement("div"));
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const d = document.createElement("div");
        d.innerText = i;
        d.style.textAlign = "center";
        d.style.fontSize = gridFontSize;

        if (i === date) {
            d.style.backgroundColor = props.text_color || "black";
            d.style.color = props.background_color || "white";
            d.style.borderRadius = "50%";
            d.style.width = "1.5em";
            d.style.height = "1.5em";
            d.style.lineHeight = "1.5em";
            d.style.margin = "0 auto";
        }
        grid.appendChild(d);
    }
    el.appendChild(grid);

    const events = document.createElement("div");
    events.style.padding = "5px";
    events.style.fontSize = (props.font_size_event || 18) + "px";
    events.style.flexGrow = "1";
    events.style.overflow = "hidden";

    events.innerHTML = `
        <div style="margin-bottom:4px;"><b>${date}</b> Meeting with Team</div>
        <div><b>${Math.min(date + 2, daysInMonth)}</b> Dentist Appointment</div>
    `;
    el.appendChild(events);
};


export default {
    id: "calendar",
    name: "Calendar",
    category: "Events",
    defaults: {
        entity_id: "sensor.esp_calendar_data",
        border_width: 2,
        show_border: true,
        border_color: "black",
        background_color: "white",
        text_color: "black",
        font_size_date: 100,
        font_size_day: 24,
        font_size_grid: 14,
        font_size_event: 18,
        width: 335,
        height: 340
    },

    render: (el, widget) => {
        const props = widget.props || {};
        el.innerHTML = "";
        drawCalendarPreview(el, widget, props);
    },

    export: (w, context) => {
        const {
            lines, addFont, getColorConst, addDitherMask, getCondProps, getConditionCheck, isEpaper
        } = context;

        const p = w.props || {};
        const entityId = (w.entity_id || p.entity_id || "sensor.esp_calendar_data").trim();
        const borderColorProp = p.border_color || "black";
        const colorProp = p.text_color || "black";
        const bgColorProp = p.background_color || "white";
        const color = getColorConst(colorProp);
        const borderColor = getColorConst(borderColorProp);
        const bgColor = getColorConst(bgColorProp);

        const borderEnabled = p.show_border !== false;
        const borderWidth = parseInt(p.border_width || 2, 10);

        const dateFontSize = parseInt(p.font_size_date || 100, 10);
        const dayFontSize = parseInt(p.font_size_day || 24, 10);
        const gridFontSize = parseInt(p.font_size_grid || 14, 10);
        const eventFontSize = parseInt(p.font_size_event || 18, 10);
        const fontFamily = p.font_family || "Roboto";

        const dateFontId = addFont(fontFamily, 100, Math.min(dateFontSize / 2, 80)); // Scaled like preview
        const dayFontId = addFont(fontFamily, 700, dayFontSize);
        const gridFontId = addFont(fontFamily, 400, gridFontSize);
        const eventFontId = addFont(fontFamily, 400, eventFontSize);

        lines.push(`        // widget:calendar id:${w.id} type:calendar x:${w.x} y:${w.y} w:${w.width} h:${w.height} entity:${entityId} ${getCondProps(w)}`);

        const cond = getConditionCheck(w);
        if (cond) lines.push(`        ${cond}`);

        lines.push(`        {`);
        lines.push(`          auto now = id(ha_time).now();`);
        lines.push(`          int x = ${w.x}; int y = ${w.y}; int w = ${w.width}; int h = ${w.height};`);

        // Background
        if (bgColorProp !== "transparent") {
            lines.push(`          it.filled_rectangle(x, y, w, h, ${bgColor});`);
        }

        // Header
        lines.push(`          // Header`);
        lines.push(`          int headH = ${dateFontSize / 2 + dayFontSize + gridFontSize + 10};`);
        lines.push(`          it.strftime(x + w/2, y + 2, id(${dateFontId}), ${color}, TextAlign::TOP_CENTER, "%d", now);`);
        lines.push(`          it.strftime(x + w/2, y + ${dateFontSize / 2}, id(${dayFontId}), ${color}, TextAlign::TOP_CENTER, "%A", now);`);
        lines.push(`          it.strftime(x + w/2, y + ${dateFontSize / 2 + dayFontSize}, id(${gridFontId}), ${color}, TextAlign::TOP_CENTER, "%B %Y", now);`);
        lines.push(`          it.line(x, y + headH, x + w, y + headH, ${color});`);

        // Grid
        lines.push(`          // Days Grid`);
        lines.push(`          int gridY = y + headH + 5;`);
        lines.push(`          int cellW = w / 7;`);
        lines.push(`          const char* days[] = {"Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"};`);
        lines.push(`          for(int i=0; i<7; i++) {`);
        lines.push(`            it.print(x + i*cellW + cellW/2, gridY, id(${gridFontId}), ${color}, TextAlign::TOP_CENTER, days[i]);`);
        lines.push(`          }`);

        // Calendar Logic (Simplified for static display or needs helper)
        // Since we don't have a full calendar helper in C++ easily available without including heavy libs,
        // we will render a placeholder or basic static grid for the current month if possible.
        // For now, let's mimic the preview's logic best we can with available time info.

        lines.push(`          // Simple logic to find start of month`);
        lines.push(`          time_t t = now.timestamp;`);
        lines.push(`          struct tm *tm = localtime(&t);`);
        lines.push(`          tm->tm_mday = 1;`);
        lines.push(`          mktime(tm);`);
        lines.push(`          int startDay = (tm->tm_wday + 6) % 7; // 0=Mon`);
        lines.push(`          int daysInMonth = 31; // Simplified`);
        lines.push(`          if(now.month == 2) daysInMonth = (now.year % 4 == 0) ? 29 : 28;`);
        lines.push(`          else if(now.month == 4 || now.month == 6 || now.month == 9 || now.month == 11) daysInMonth = 30;`);

        lines.push(`          int r = 1; int c = startDay;`);
        lines.push(`          int rowH = ${gridFontSize + 4};`);
        lines.push(`          for(int d=1; d<=daysInMonth; d++) {`);
        lines.push(`            if(d == now.day_of_month) {`);
        lines.push(`               it.filled_circle(x + c*cellW + cellW/2, gridY + r*rowH + 6, ${Math.floor(gridFontSize / 1.5)}, ${color});`);
        lines.push(`               it.printf(x + c*cellW + cellW/2, gridY + r*rowH, id(${gridFontId}), ${bgColor}, TextAlign::TOP_CENTER, "%d", d);`);
        lines.push(`            } else {`);
        lines.push(`               it.printf(x + c*cellW + cellW/2, gridY + r*rowH, id(${gridFontId}), ${color}, TextAlign::TOP_CENTER, "%d", d);`);
        lines.push(`            }`);
        lines.push(`            c++; if(c>6) { c=0; r++; }`);
        lines.push(`          }`);

        // Events
        lines.push(`          // Events (Mock or Sensor)`);
        lines.push(`          int eventY = gridY + (r+1)*rowH + 10;`);
        lines.push(`          it.printf(x + 5, eventY, id(${eventFontId}), ${color}, TextAlign::TOP_LEFT, "<b>%d</b> Meeting with Team", now.day_of_month);`);
        lines.push(`          it.printf(x + 5, eventY + ${eventFontSize + 4}, id(${eventFontId}), ${color}, TextAlign::TOP_LEFT, "<b>%d</b> Dentist Appointment", (now.day_of_month + 2) > daysInMonth ? 1 : now.day_of_month + 2);`);


        if (borderEnabled) {
            lines.push(`          for (int i = 0; i < ${borderWidth}; i++) {`);
            lines.push(`            it.rectangle(x + i, y + i, w - 2*i, h - 2*i, ${borderColor});`);
            lines.push(`          }`);
        }

        addDitherMask(lines, colorProp, isEpaper, w.x, w.y, w.width, w.height);
        lines.push(`        }`);
        if (cond) lines.push(`        }`);
    }
};
