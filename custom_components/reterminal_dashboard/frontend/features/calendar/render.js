(() => {
    // Helper used by the main render function
    const drawCalendarPreview = (el, widget, props) => {
        // Simple mock rendering for preview
        const width = widget.width || 400;
        const height = widget.height || 300;

        el.style.width = width + "px";
        el.style.height = height + "px";
        el.style.position = "relative";
        el.style.backgroundColor = props.background_color || "white";
        el.style.color = props.text_color || "black";

        if (props.show_border !== false) {
            el.style.border = `${props.border_width || 2}px solid ${props.border_color || "black"}`;
        }

        // Dynamic Date Data
        const now = new Date();
        const eventsTop = 122 + (7 * 18) + 15;
        const date = now.getDate();
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const dayNameText = dayNames[now.getDay()];
        const monthYearText = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;

        // Create header elements with absolute positioning to match C++ lambda coordinates
        const bigDate = document.createElement("div");
        bigDate.style.position = "absolute";
        bigDate.style.top = "10px";
        bigDate.style.left = "0";
        bigDate.style.right = "0";
        bigDate.style.textAlign = "center";
        bigDate.style.fontSize = Math.min((props.font_size_date || 100) * 0.7, 80) + "px"; // Slight scaling for web view
        bigDate.style.fontWeight = "100";
        bigDate.style.lineHeight = "1";
        bigDate.innerText = date;
        el.appendChild(bigDate);

        const dayName = document.createElement("div");
        dayName.style.position = "absolute";
        dayName.style.top = "75px";
        dayName.style.left = "0";
        dayName.style.right = "0";
        dayName.style.textAlign = "center";
        dayName.style.fontSize = (props.font_size_day || 24) + "px";
        dayName.style.fontWeight = "bold";
        dayName.innerText = dayNameText;
        el.appendChild(dayName);

        const dateLine = document.createElement("div");
        dateLine.style.position = "absolute";
        dateLine.style.top = "102px";
        dateLine.style.left = "0";
        dateLine.style.right = "0";
        dateLine.style.textAlign = "center";
        dateLine.style.fontSize = (props.font_size_grid || 14) + "px";
        dateLine.innerText = monthYearText;
        el.appendChild(dateLine);

        // Grid Logic - positioned at y + 140
        const grid = document.createElement("div");
        grid.style.position = "absolute";
        grid.style.top = "122px";
        grid.style.left = "10px";
        grid.style.right = "10px";
        grid.style.display = "grid";
        grid.style.gridTemplateColumns = "repeat(7, 1fr)";
        grid.style.gap = "1px";
        grid.style.borderTop = "1px solid " + (props.text_color || "black");
        grid.style.paddingTop = "5px";

        const gridFontSize = (props.font_size_grid || 14) + "px";

        // Day Headers (Mon-Sun)
        ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].forEach(day => {
            const d = document.createElement("div");
            d.innerText = day;
            d.style.textAlign = "center";
            d.style.fontWeight = "bold";
            d.style.fontSize = gridFontSize;
            grid.appendChild(d);
        });

        // Days of Month
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

        // Mock Events - positioned after the grid
        // Approx height of calendar grid: 7 rows of ~18px = 126px
        // Events start around y = 140 + 126 + 25 = 291
        const events = document.createElement("div");
        events.style.position = "absolute";
        events.style.top = "263px";
        events.style.left = "10px";
        events.style.right = "10px";
        events.style.fontSize = (props.font_size_event || 18) + "px";
        events.style.overflow = "hidden";

        const limit = props.event_limit !== undefined ? props.event_limit : 2;
        const mockData = [
            { day: date, text: "Meeting with Team" },
            { day: Math.min(date + 2, daysInMonth), text: "Dentist Appointment" },
            { day: Math.min(date + 5, daysInMonth), text: "Dinner with Friends" },
            { day: Math.min(date + 7, daysInMonth), text: "Project Deadline" },
            { day: Math.min(date + 10, daysInMonth), text: "Weekend Trip" }
        ];

        let eventsHtml = "";
        for (let i = 0; i < Math.min(limit, mockData.length); i++) {
            eventsHtml += `<div style="margin-bottom:4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"><span style="display:inline-block;width:30px;font-weight:bold;">${mockData[i].day}</span><span style="margin-left:20px;">${mockData[i].text}</span></div>`;
        }
        events.innerHTML = eventsHtml;
        el.appendChild(events);
    };

    const render = (el, widget, tools) => {
        const props = widget.props || {};
        el.innerHTML = "";
        drawCalendarPreview(el, widget, props);
    };

    // Register with FeatureRegistry
    if (window.FeatureRegistry) {
        window.FeatureRegistry.register("calendar", { render });
    } else {
        // Retry in case loaded too early
        setTimeout(() => {
            if (window.FeatureRegistry) {
                window.FeatureRegistry.register("calendar", { render });
            }
        }, 50);
    }
})();
