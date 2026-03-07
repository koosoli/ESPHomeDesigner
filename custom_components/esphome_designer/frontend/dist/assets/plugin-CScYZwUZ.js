import{A as N}from"./app-shell-eforLvzo.js";import"./yaml-engine-DWMU3xPX.js";import"./vendor-Bi4LEBGV.js";const W=`# Dictionary to map calendar keys to their corresponding names
# One word calandars don't need to be added calendar.jobs would map to Jobs by default without adding it here
# calendar.hello_world should be added on the other hand
CALENDAR_NAMES = {"calendar.x": "X", "calendar.Y": "Y"}
# Day names (which are displayed in the calendar event list) can be translated here if required
DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
# How many entries to send to the ESPHome device
MAX_ENTRIES = 8

def convert_calendar_format(data, today):
    # Initialize a dictionary to store events grouped by date
    events_by_date = {}
    entrie_count = 0
    
    # Variable to store the end time of the closest event that will end
    closest_end_time = None
    
    # Iterate through calendar keys and events
    for calendar_key, events_list in data.items():
        for event in events_list['events']:
            if 'description' in event:
                event.pop('description')
                
            # Attempt to split the 'event[start]' into date and time parts
            parts = event['start'].split("T")
            event_date = parts[0]
            event_time = parts[1] if len(parts) > 1 else None  # event_time might not be present
            
            # Compare the event_date with today's date
            if event_date < today:
                # If the event's date is before today, update it to today's date (in case of multi day event starting before today)
                event['start'] = today if event_time is None else f"{today}T{event_time}"
                event_date = today
            
            # Add calendar name to event
            # If calendar key exists in CALENDAR_NAMES, use its value, otherwise capitalize the second part of the key
            event['calendar_name'] = CALENDAR_NAMES.get(calendar_key, calendar_key.split(".")[1].capitalize())
            
            # Parse location_name and location_address
            if 'location' in event:
                # Split the 'location' string into lines based on the newline character
                location_lines = event['location'].split('\\\\\\\\n')
                if len(location_lines) >= 2:
                    # If there are at least two lines, consider the first line as 'location_name' and the second line as 'location_address'
                    event['location_name'] = location_lines[0]
                    # event['location_address'] = location_lines[1]
                elif len(location_lines) == 1:
                    # If there's only one line, consider it as 'location_name'
                    event['location_name'] = location_lines[0]
                    
                # Remove the 'location' key from the event since it's been parsed into 'location_name' and 'location_address'
                event.pop('location')
                    
            # Add event to events_by_date dictionary
            if event_date in events_by_date:
                events_by_date[event_date].append(event)
            else:
                events_by_date[event_date] = [event]
                
    # Sort events by date
    sorted_dates = sorted(events_by_date.keys())
    
    # Initialize a list to store the final date objects
    result = []
    
    # Iterate through sorted dates
    for date in sorted_dates:
        all_day_events = []
        other_events = []
        for event in events_by_date[date]:
            if entrie_count == MAX_ENTRIES:
                break
            
            # Check if the event lasts for the whole day
            start_date = event['start']
            end_date = event['end']
            if 'T' not in event['start']:
                all_day_events.append(event)
            else:
                other_events.append(event)
                
            entrie_count = entrie_count + 1
        
        if other_events and date == today:
            closest_end_time = sorted(other_events, key=lambda item:dt_util.parse_datetime(item['end']), reverse=False)[0]["end"]
        
        if all_day_events or other_events:
            # Sort other_events by start time
            other_events.sort(key=lambda item:dt_util.parse_datetime(item['start']), reverse=False)
            
            # Construct dictionary for the date
            # is_today cast to int because a bool somehow crashes my esphome config
            day_item = {
                'date': date,
                'day': dt_util.parse_datetime(date).day,
                'is_today': int(date == dt_util.now().isoformat().split("T")[0]),
                'day_name': DAY_NAMES[dt_util.parse_datetime(date).weekday()],
                'all_day': all_day_events,
                'other': other_events
            }
            result.append(day_item)
        
    return (result, closest_end_time)

# Access the data received from the Home Assistant service call
input_data = data["calendar"]
today = data["now"]

# Convert the received data into the format expected by the epaper display
converted_data = convert_calendar_format(input_data, today)

# Pass the output back to Home Assistant
output["entries"] = {"days": converted_data[0]}
output["closest_end_time"] = converted_data[1]
`,Y=(t,s,e,{getColorStyle:a})=>{const i=s.width||400,p=s.height||300,u=e.text_color||"theme_auto",n=a(u);if(t.style.width=i+"px",t.style.height=p+"px",t.style.backgroundColor=e.background_color||"transparent",t.style.borderRadius=`${e.border_radius||0}px`,t.style.color=n,t.style.padding="4px",t.style.boxSizing="border-box",e.border_width){const o=e.border_color||u;t.style.border=`${e.border_width}px solid ${a(o)}`}else t.style.border="none";const l=new Date,d=l.getDate(),y=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],v=["January","February","March","April","May","June","July","August","September","October","November","December"],_=y[l.getDay()],S=`${v[l.getMonth()]} ${l.getFullYear()}`,h=document.createElement("div");h.style.textAlign="center",h.style.padding="2px",h.style.borderBottom="1px solid "+n,h.style.flexShrink="0";const T=document.createElement("div");T.style.fontSize=Math.min((e.font_size_date||100)*.7,80)+"px",T.style.fontWeight="100",T.style.lineHeight="0.8",T.innerText=d,h.appendChild(T);const x=document.createElement("div");x.style.fontSize=(e.font_size_day||24)+"px",x.style.fontWeight="bold",x.style.marginTop="4px",x.innerText=_,h.appendChild(x);const E=document.createElement("div");E.style.fontSize=(e.font_size_grid||14)+"px",E.innerText=S,h.appendChild(E),t.style.display="flex",t.style.flexDirection="column",e.show_header!==!1&&t.appendChild(h);const m=document.createElement("div");m.style.display="grid",m.style.gridTemplateColumns="repeat(7, 1fr)",m.style.padding="2px",m.style.gap="1px",m.style.flexShrink="0";const C=(e.font_size_grid||14)+"px";["Mo","Tu","We","Th","Fr","Sa","Su"].forEach(o=>{const r=document.createElement("div");r.innerText=o,r.style.textAlign="center",r.style.fontWeight="bold",r.style.fontSize=C,m.appendChild(r)});const z=new Date(l.getFullYear(),l.getMonth(),1),M=new Date(l.getFullYear(),l.getMonth()+1,0).getDate();let w=z.getDay();w===0&&(w=7),w-=1;for(let o=0;o<w;o++)m.appendChild(document.createElement("div"));for(let o=1;o<=M;o++){const r=document.createElement("div");if(r.innerText=o,r.style.textAlign="center",r.style.fontSize=C,o===d){r.style.backgroundColor=n;const f=e.background_color||"transparent";n==="white"||n==="#ffffff"||n==="#fff"||n.startsWith("rgb(255")||n==="black"||n==="#000000"||n==="#000"||f==="transparent"||a(f),f==="transparent"?r.style.color=n.includes("white")||n.includes("#f")||n.includes("255")?"black":"white":r.style.color=a(f),r.style.borderRadius="50%",r.style.width="1.5em",r.style.height="1.5em",r.style.lineHeight="1.5em",r.style.margin="0 auto",r.style.fontWeight="bold"}m.appendChild(r)}e.show_grid!==!1&&t.appendChild(m);const g=document.createElement("div");g.style.padding="5px",g.style.fontSize=(e.font_size_event||18)+"px",g.style.flexGrow="1",g.style.overflow="hidden";let b=null;const $=(s.entity_id||e.entity_id||"sensor.esp_calendar_data").trim();if(console.log("[Calendar Preview] Looking for entity:",$),N&&N.entityStates){const o=N.entityStates[$];if(console.log("[Calendar Preview] Found stateObj:",o?"yes":"no",o?JSON.stringify(o).substring(0,300):""),o)try{if(o.attributes&&o.attributes.entries)if(typeof o.attributes.entries=="string"){const r=JSON.parse(o.attributes.entries);b=r.days||r}else b=o.attributes.entries.days||o.attributes.entries;else if(o.state&&o.state.length>5&&o.state!=="OK"&&o.state!=="unknown"){const r=JSON.parse(o.state);b=r.days||r}else if(!b&&o.attributes){const r=o.attributes.message;if(r!==void 0){const f=new Date,A=o.attributes.start_time||"",I=o.attributes.end_time||"",c=o.attributes.all_day===!0;b=[{day:f.getDate(),all_day:c?[{summary:r,start:A,end:I}]:[],other:c?[]:[{summary:r,start:A,end:I}]}]}}}catch(r){console.warn("[Calendar Widget] Failed to parse live state/attributes:",r)}}if(b&&Array.isArray(b)&&b.length>0){g.innerHTML="";const o=parseInt(String(e.max_events||e.event_limit||8),10);let r=0;for(const f of b){if(r>=o)break;const A=f.day,I=(c,H)=>{if(r>=o)return;const O=c.summary||"No Title",P=c.start||"";let R=H?"All Day":"";!H&&P.includes("T")&&(R=P.split("T")[1].substring(0,5));const k=document.createElement("div");k.style.marginBottom="4px",k.style.display="flex",k.style.justifyContent="space-between",k.innerHTML=`<span style="flex-shrink:0;width:25px;"><b>${A}</b></span><span style="flex-grow:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-right:8px;">${O}</span><span style="flex-shrink:0;opacity:0.7;font-size:0.9em;">${R}</span>`,g.appendChild(k),r++};f.all_day&&f.all_day.forEach(c=>I(c,!0)),f.other&&f.other.forEach(c=>I(c,!1))}}else g.innerHTML=`
            <div style="margin-bottom:4px;"><b>${d}</b> Meeting with Team</div>
            <div><b>${Math.min(d+2,M)}</b> Dentist Appointment</div>
        `;e.show_events!==!1&&t.appendChild(g)},B={id:"calendar",name:"Calendar",category:"Events",supportedModes:["lvgl","direct"],defaults:{entity_id:"sensor.esp_calendar_data",border_width:0,show_border:!0,border_color:"theme_auto",border_radius:0,background_color:"transparent",text_color:"theme_auto",font_size_date:100,font_size_day:24,font_size_grid:14,font_size_event:18,show_header:!0,show_grid:!0,show_events:!0,width:335,height:340,opa:255},renderProperties:(t,s)=>{const e=s.props||{},a=(n,l)=>{const d={...s.props,[n]:l};N.updateWidget(s.id,{props:d})};t.createSection("Data Source",!0),t.addLabeledInputWithPicker("Calendar Sensor ID","text",s.entity_id||"sensor.esp_calendar_data",n=>{N.updateWidget(s.id,{entity_id:n})},s),t.addLabeledInput("Source Calendars (CSV)","text",e.source_calendars||"calendar.example_1, calendar.example_2",n=>a("source_calendars",n)),t.addHint("List the HA calendar entities to include, separated by commas.");const i=document.createElement("div");i.style.display="flex",i.style.gap="8px",i.style.marginTop="12px";const p=document.createElement("button");p.className="btn btn-secondary btn-full btn-xs",p.textContent="Script",p.title="Download Python Helper Script",p.style.flex="1",p.addEventListener("click",()=>{const n=document.createElement("a");n.setAttribute("href","data:text/x-python;charset=utf-8,"+encodeURIComponent(W)),n.setAttribute("download","esp_calendar_data_conversion.py"),n.click()});const u=document.createElement("button");u.className="btn btn-secondary btn-full btn-xs",u.textContent="YAML",u.title="Copy HA Template YAML to Clipboard",u.style.flex="1",u.addEventListener("click",()=>{const n=`
# Add to configuration.yaml
template:
  - trigger:
      - trigger: time_pattern
        minutes: "/15"
    action:
      - action: calendar.get_events
        target:
          entity_id: ${e.source_calendars||"calendar.your_calendar"}
        data:
          duration:
            days: 14
        response_variable: calendar_events
      - action: python_script.esp_calendar_data_conversion
        data:
          calendar: "{{ calendar_events }}"
          now: "{{ now().isoformat().split('T')[0] }}"
        response_variable: output
    sensor:
      - name: ESP Calendar Data
        unique_id: esp_calendar_data
        state: "OK"
        attributes:
          entries: "{{ output.entries }}"
          closest_end_time: "{{ output.closest_end_time }}"
`;navigator.clipboard.writeText(n.trim()),u.textContent="✓ Copied",setTimeout(()=>{u.textContent="YAML"},2e3)}),i.appendChild(p),i.appendChild(u),t.getContainer().appendChild(i),t.addHint("1. Download script to /python_scripts/<br/>2. Copy & paste YAML to HA config."),t.endSection(),t.createSection("Design",!0),t.addCheckbox("Show Header",e.show_header!==!1,n=>a("show_header",n)),t.addCheckbox("Show Grid",e.show_grid!==!1,n=>a("show_grid",n)),t.addCheckbox("Show Events",e.show_events!==!1,n=>a("show_events",n)),t.addLabeledInput("Max Events","number",e.max_events||8,n=>a("max_events",parseInt(n,10))),t.endSection(),t.createSection("Typography",!1),t.addSelect("Font Family",e.font_family||"Roboto",["Roboto","Inter","Open Sans","Monospace"],n=>a("font_family",n)),t.addLabeledInput("Date Size (Header)","number",e.font_size_date||100,n=>a("font_size_date",parseInt(n,10))),t.addLabeledInput("Day Size (Header)","number",e.font_size_day||24,n=>a("font_size_day",parseInt(n,10))),t.addLabeledInput("Grid Text Size","number",e.font_size_grid||14,n=>a("font_size_grid",parseInt(n,10))),t.addLabeledInput("Event Text Size","number",e.font_size_event||18,n=>a("font_size_event",parseInt(n,10))),t.endSection(),t.createSection("Appearance",!1),t.addColorSelector("Text Color",e.text_color||"theme_auto",null,n=>a("text_color",n)),t.addColorSelector("Background",e.background_color||"transparent",null,n=>a("background_color",n)),t.addLabeledInput("Border Width","number",e.border_width||0,n=>a("border_width",parseInt(n,10))),t.addColorSelector("Border Color",e.border_color||"theme_auto",null,n=>a("border_color",n)),t.addLabeledInput("Corner Radius","number",e.border_radius||0,n=>a("border_radius",parseInt(n,10))),t.addNumberWithSlider("Opacity (%)",e.opacity!==void 0?e.opacity:100,0,100,n=>a("opacity",n)),t.addDropShadowButton(t.getContainer(),s.id),t.endSection()},render:(t,s,e)=>{const a=s.props||{};t.innerHTML="",Y(t,s,a,e)},onExportTextSensors:t=>{const{lines:s,widgets:e}=t;if(!e)return;const a=e.filter(l=>l.type==="calendar");if(a.length===0)return;for(const l of a){const d=l.props||{},y=(l.entity_id||d.entity_id||"sensor.esp_calendar_data").trim(),v=y.startsWith("sensor."),_=`calendar_data_${y.replace(/[^a-zA-Z0-9_]/g,"_")}`;t.seenEntityIds&&t.seenEntityIds.has(y)||t.seenSensorIds&&t.seenSensorIds.has(_)||(t.seenEntityIds&&t.seenEntityIds.add(y),t.seenSensorIds&&t.seenSensorIds.add(_),s.push("- platform: homeassistant"),s.push(`  id: ${_}`),s.push(`  entity_id: ${y}`),v&&s.push("  attribute: entries"),s.push("  internal: true"))}const i=a[0],n=(i.props&&i.props.source_calendars?i.props.source_calendars:"calendar.example_1, calendar.example_2").split(",").map(l=>l.trim()).filter(l=>l).map(l=>`#           - ${l}`).join(`
`);s.push(""),s.push("# ============================================================================"),s.push("# CALENDAR EVENTS SETUP (HOME ASSISTANT)"),s.push("# 1. Download the 'Helper Script' from the Calendar widget's properties panel."),s.push("# 2. Place it in your /config/python_scripts/ folder."),s.push("# 3. Enable the python_script integration by adding this line to configuration.yaml:"),s.push("#"),s.push("#    python_script:"),s.push("#"),s.push("# 4. Add this template sensor configuration (configuration.yaml or packages):"),s.push("#"),s.push("# template:"),s.push("#   - trigger:"),s.push("#       - trigger: time_pattern"),s.push("#         minutes: '/15'"),s.push("#     action:"),s.push("#       - action: calendar.get_events"),s.push("#         target:"),s.push("#           entity_id:"),s.push(`${n}`),s.push("#         data:"),s.push("#           duration:"),s.push("#             days: 14"),s.push("#         response_variable: calendar_events"),s.push("#       - action: python_script.esp_calendar_data_conversion"),s.push("#         data:"),s.push('#           calendar: "{{ calendar_events }}"'),s.push(`#           now: "{{ now().isoformat().split('T')[0] }}"`),s.push("#         response_variable: output"),s.push("#     sensor:"),s.push("#       - name: ESP Calendar Data"),s.push("#         unique_id: esp_calendar_data"),s.push('#         state: "OK"'),s.push("#         attributes:"),s.push('#           entries: "{{ output.entries }}"'),s.push('#           closest_end_time: "{{ output.closest_end_time }}"'),s.push("#"),s.push("# 5. Restart HA (required for python_script), then Reload Template Entities."),s.push("# ============================================================================")},exportLVGL:(t,{common:s,convertColor:e,getLVGLFont:a})=>{const i=t.props||{},p=e(i.text_color||"theme_auto"),u=e(i.background_color||"white"),n=Math.round(Math.min((i.font_size_date||100)*.7,80)),l=parseInt(i.font_size_day||24,10),d=parseInt(i.font_size_grid||14,10),y=i.font_family||"Roboto",v=n+l+d+15,_=[];return i.show_header!==!1&&_.push({label:{align:"TOP_MID",y:2,height:n+4,text:`!lambda "char buf[4]; id(ha_time).now().strftime(buf, sizeof(buf), '%d'); return buf;"`,text_font:a(y,n,100),text_color:p}},{label:{align:"TOP_MID",y:n+6,height:l+4,text:`!lambda "char buf[16]; id(ha_time).now().strftime(buf, sizeof(buf), '%A'); return buf;"`,text_font:a(y,l,700),text_color:p}},{label:{align:"TOP_MID",y:n+l+10,height:d+4,text:`!lambda "char buf[32]; id(ha_time).now().strftime(buf, sizeof(buf), '%B %Y'); return buf;"`,text_font:a(y,d,400),text_color:p}},{obj:{width:"100%",height:1,y:v,bg_color:p,border_width:0}}),i.show_grid!==!1&&(_.push({obj:{width:"100%",height:"SIZE_CONTENT",y:v+5,bg_opa:"transp",border_width:0,layout:{type:"flex",flex_flow:"row_wrap",flex_align_main:"space_around"},widgets:["Mo","Tu","We","Th","Fr","Sa","Su"].map(S=>({label:{text:`"${S}"`,text_font:a(y,d,700),text_color:p,width:"14%",align:"center"}}))}}),_.push({label:{y:v+40,align:"TOP_MID",text:'"Calendar Grid Not Supported in LVGL Mode"',text_font:a("Roboto",12,400),text_color:"0x888888"}})),{obj:{...s,bg_color:u,bg_opa:"COVER",radius:i.border_radius||0,border_width:i.border_width||0,border_color:e(i.border_color||"theme_auto"),widgets:_}}},export:(t,s)=>{const{lines:e,addFont:a,getColorConst:i,addDitherMask:p,getCondProps:u,getConditionCheck:n,isEpaper:l}=s,d=t.props||{},y=(t.entity_id||d.entity_id||"sensor.esp_calendar_data").trim(),v=d.border_color||"theme_auto",_=d.text_color||"theme_auto",S=d.background_color||"transparent",h=i(_),T=i(v),x=i(S),E=parseInt(d.border_width||0,10),m=d.border_radius||0,C=Math.round(Math.min(parseInt(d.font_size_date||100,10)*.7,80)),z=parseInt(d.font_size_day||24,10),D=parseInt(d.font_size_grid||14,10),M=parseInt(d.font_size_event||18,10),w=d.font_family||"Roboto",g=a(w,100,C),b=a(w,700,z),$=a(w,400,D),o=a(w,400,M),r=n(t);r&&e.push(`        ${r}`),e.push("        {"),e.push("          auto now = id(ha_time).now();"),e.push(`          int x = ${t.x}; int y = ${t.y}; int w = ${t.width}; int h = ${t.height};`),S!=="transparent"&&(m>0?e.push(`          it.filled_rounded_rectangle(x, y, w, h, ${m}, ${x});`):e.push(`          it.filled_rectangle(x, y, w, h, ${x});`));const f=d.show_header!==!1;e.push("          // Header"),e.push(`          int headH = ${C+z+D+15};`),f?(e.push(`          it.strftime(x + w/2, y + 2, id(${g}), ${h}, TextAlign::TOP_CENTER, "%d", now);`),e.push(`          it.strftime(x + w/2, y + ${C+6}, id(${b}), ${h}, TextAlign::TOP_CENTER, "%A", now);`),e.push(`          it.strftime(x + w/2, y + ${C+z+10}, id(${$}), ${h}, TextAlign::TOP_CENTER, "%B %Y", now);`),e.push(`          it.line(x, y + headH, x + w, y + headH, ${h});`)):e.push("          headH = 0;");const A=d.show_grid!==!1;if(e.push("          // Days Grid"),e.push("          int gridY = y + headH + 5;"),e.push("          int cellW = w / 7;"),e.push(`          int rowH = ${D+4};`),e.push("          int r = 1;"),A?(e.push('          const char* days[] = {"Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"};'),e.push("          for(int i=0; i<7; i++) {"),e.push(`            it.print(x + i*cellW + cellW/2, gridY, id(${$}), ${h}, TextAlign::TOP_CENTER, days[i]);`),e.push("          }"),e.push("          // Simple logic to find start of month"),e.push("          time_t t = now.timestamp;"),e.push("          struct tm *tm = localtime(&t);"),e.push("          tm->tm_mday = 1;"),e.push("          mktime(tm);"),e.push("          int startDay = (tm->tm_wday + 6) % 7; // 0=Mon"),e.push("          int daysInMonth = 31; // Simplified"),e.push("          if(now.month == 2) daysInMonth = (now.year % 4 == 0) ? 29 : 28;"),e.push("          else if(now.month == 4 || now.month == 6 || now.month == 9 || now.month == 11) daysInMonth = 30;"),e.push("          int c = startDay;"),e.push("          for(int d=1; d<=daysInMonth; d++) {"),e.push("            if(d == now.day_of_month) {"),e.push(`               it.filled_circle(x + c*cellW + cellW/2, gridY + r*rowH + 6, ${Math.floor(D/1.5)}, ${h});`),e.push(`               it.printf(x + c*cellW + cellW/2, gridY + r*rowH, id(${$}), ${S==="transparent"?_.includes("black")||_.includes("000000")?"Color::WHITE":"Color::BLACK":x}, TextAlign::TOP_CENTER, "%d", d);`),e.push("            } else {"),e.push(`               it.printf(x + c*cellW + cellW/2, gridY + r*rowH, id(${$}), ${h}, TextAlign::TOP_CENTER, "%d", d);`),e.push("            }"),e.push("            c++; if(c>6) { c=0; r++; }"),e.push("          }")):(e.push("          r = 0;"),e.push("          gridY = y + headH;")),d.show_events!==!1){e.push("          // Events (Real Data from Sensor)"),e.push("          auto extract_time = [](const char* datetime) -> std::string {"),e.push("              std::string datetimeStr(datetime);"),e.push("              size_t pos = datetimeStr.find('T');"),e.push("              if (pos != std::string::npos && pos + 3 < datetimeStr.size()) {"),e.push("                  return datetimeStr.substr(pos + 1, 5);"),e.push("              }"),e.push('              return "";'),e.push("          };"),e.push(""),e.push("          int eventY = gridY + (r+1)*rowH + 10;"),e.push("          int max_y = y + h - 5;"),e.push(`          const int event_limit = ${d.max_events||d.event_limit||8};`),e.push("");const c=`calendar_data_${y.replace(/[^a-zA-Z0-9_]/g,"_")}`;e.push(`          if (id(${c}).state.length() > 5 && id(${c}).state != "unknown") {`),e.push("             JsonDocument doc;"),e.push(`             DeserializationError error = deserializeJson(doc, id(${c}).state);`),e.push(""),e.push("             if (!error) {"),e.push("                 JsonVariant root = doc.as<JsonVariant>();"),e.push("                 JsonArray days;"),e.push(""),e.push('                 if (root.is<JsonObject>() && root["days"].is<JsonArray>()) {'),e.push('                     days = root["days"];'),e.push("                 } else if (root.is<JsonArray>()) {"),e.push("                     days = root;"),e.push("                 }"),e.push(""),e.push("                 if (!days.isNull() && days.size() > 0) {"),e.push("                     int event_count = 0;"),e.push("                     // Separator line"),e.push(`                     it.filled_rectangle(x + 10, eventY - 5, w - 20, 2, ${h});`),e.push(""),e.push("                     for (JsonVariant dayEntry : days) {"),e.push("                         if (eventY > max_y || event_count >= event_limit) break;"),e.push('                         int currentDayNum = dayEntry["day"].as<int>();'),e.push(""),e.push("                         auto draw_row = [&](JsonVariant event, bool is_all_day) {"),e.push("                             if (eventY > max_y || event_count >= event_limit) return;"),e.push('                             const char* summary = event["summary"] | "No Title";'),e.push('                             const char* start = event["start"] | "";'),e.push(""),e.push("                             // Draw Day Number"),e.push(`                             it.printf(x + 10, eventY, id(${o}), ${h}, TextAlign::TOP_LEFT, "%d", currentDayNum);`),e.push(""),e.push("                             // Draw Summary"),e.push(`                             it.printf(x + 50, eventY, id(${o}), ${h}, TextAlign::TOP_LEFT, "%.25s", summary);`),e.push(""),e.push("                             // Draw Time"),e.push("                             if (is_all_day) {"),e.push(`                                 it.printf(x + w - 10, eventY, id(${o}), ${h}, TextAlign::TOP_RIGHT, "All Day");`),e.push("                             } else {"),e.push("                                 std::string timeStr = extract_time(start);"),e.push(`                                 it.printf(x + w - 10, eventY, id(${o}), ${h}, TextAlign::TOP_RIGHT, "%s", timeStr.c_str());`),e.push("                             }"),e.push(`                             eventY += ${M+6};`),e.push("                             event_count++;"),e.push("                         };"),e.push(""),e.push('                         if (dayEntry["all_day"].is<JsonArray>()) {'),e.push('                             for (JsonVariant event : dayEntry["all_day"].as<JsonArray>()) {'),e.push("                                 draw_row(event, true);"),e.push("                             }"),e.push("                         }"),e.push('                         if (dayEntry["other"].is<JsonArray>()) {'),e.push('                             for (JsonVariant event : dayEntry["other"].as<JsonArray>()) {'),e.push("                                 draw_row(event, false);"),e.push("                             }"),e.push("                         }"),e.push("                     }"),e.push("                 }"),e.push("             } else {"),e.push('                 ESP_LOGW("calendar", "JSON Parse Error: %s", error.c_str());'),e.push("             }"),e.push("          }")}if(E>0)if(m>0)for(let c=0;c<E;c++)e.push(`            it.rectangle(${t.x} + ${c}, ${t.y} + ${c}, ${t.width} - ${2*c}, ${t.height} - ${2*c}, ${T});`);else for(let c=0;c<E;c++)e.push(`            it.rectangle(${t.x} + ${c}, ${t.y} + ${c}, ${t.width} - ${2*c}, ${t.height} - ${2*c}, ${T});`);p(e,_,l,t.x,t.y,t.width,t.height),e.push("        }"),r&&e.push("        }")},collectRequirements:(t,{addFont:s})=>{const e=t.props||{},a=Math.round(Math.min(parseInt(e.font_size_date||100,10)*.7,80)),i=parseInt(e.font_size_day||24,10),p=parseInt(e.font_size_grid||14,10),u=parseInt(e.font_size_event||18,10),n=e.font_family||"Roboto";s(n,100,a),s(n,700,i),s(n,400,p),s(n,400,u),s("Material Design Icons",400,24)}};export{B as default};
