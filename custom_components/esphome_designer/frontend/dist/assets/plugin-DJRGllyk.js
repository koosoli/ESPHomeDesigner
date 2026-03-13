import{A as k,m as O,B}from"./app-shell-7TA-zIPB.js";import"./yaml-engine-BeoAIk-Y.js";import"./vendor-Bi4LEBGV.js";const G=`# Dictionary to map calendar keys to their corresponding names
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
`,j=(t,n,e,{getColorStyle:s})=>{const h=n.width||400,c=n.height||300,f=e.text_color||"theme_auto",d=s(f);if(t.style.width=h+"px",t.style.height=c+"px",t.style.backgroundColor=e.background_color||"transparent",t.style.borderRadius=`${e.border_radius||0}px`,t.style.color=d,t.style.padding="4px",t.style.boxSizing="border-box",e.border_width){const l=e.border_color||f;t.style.border=`${e.border_width}px solid ${s(l)}`}else t.style.border="none";const r=new Date,o=r.getDate(),a=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],m=["January","February","March","April","May","June","July","August","September","October","November","December"],p=a[r.getDay()],v=`${m[r.getMonth()]} ${r.getFullYear()}`,_=document.createElement("div");_.style.textAlign="center",_.style.padding="2px",_.style.borderBottom="1px solid "+d,_.style.flexShrink="0";const I=document.createElement("div");I.style.fontSize=Math.min((e.font_size_date||100)*.7,80)+"px",I.style.fontWeight=e.font_weight_header_date||"100",I.style.lineHeight="0.8",I.innerText=o,_.appendChild(I);const E=document.createElement("div");E.style.fontSize=(e.font_size_day||24)+"px",E.style.fontWeight=e.font_weight_header_day||"bold",E.style.marginTop="4px",E.innerText=p,_.appendChild(E);const $=document.createElement("div");$.style.fontSize=(e.font_size_grid||14)+"px",$.style.fontWeight=e.font_weight_month||"normal",$.innerText=v,_.appendChild($),t.style.display="flex",t.style.flexDirection="column",e.show_header!==!1&&t.appendChild(_);const b=document.createElement("div");b.style.display="grid",b.style.gridTemplateColumns="repeat(7, 1fr)",b.style.padding="2px",b.style.gap="1px",b.style.flexShrink="0";const C=(e.font_size_grid||14)+"px";["Mo","Tu","We","Th","Fr","Sa","Su"].forEach(l=>{const i=document.createElement("div");i.innerText=l,i.style.textAlign="center",i.style.fontWeight=e.font_weight_grid_header||"bold",i.style.fontSize=C,b.appendChild(i)});const H=new Date(r.getFullYear(),r.getMonth(),1),W=new Date(r.getFullYear(),r.getMonth()+1,0).getDate();let w=H.getDay();w===0&&(w=7),w-=1;for(let l=0;l<w;l++)b.appendChild(document.createElement("div"));for(let l=1;l<=W;l++){const i=document.createElement("div");if(i.innerText=l,i.style.textAlign="center",i.style.fontSize=C,i.style.fontWeight=e.font_weight_dates!==void 0?e.font_weight_dates:e.bold_dates!==!1?700:400,l===o){i.style.backgroundColor=d;const g=e.background_color||"transparent";d==="white"||d==="#ffffff"||d==="#fff"||d.startsWith("rgb(255")||d==="black"||d==="#000000"||d==="#000"||g==="transparent"||s(g),g==="transparent"?i.style.color=d.includes("white")||d.includes("#f")||d.includes("255")?"black":"white":i.style.color=s(g),i.style.borderRadius="50%",i.style.width="1.5em",i.style.height="1.5em",i.style.lineHeight="1.5em",i.style.margin="0 auto",i.style.fontWeight=e.font_weight_dates||"bold"}b.appendChild(i)}e.show_grid!==!1&&t.appendChild(b);const y=document.createElement("div");y.style.padding="5px",y.style.fontSize=(e.font_size_event||18)+"px",y.style.fontWeight=e.font_weight_events||"normal",y.style.flexGrow="1",y.style.overflow="hidden";let x=null;const R=(n.entity_id||e.entity_id||"sensor.esp_calendar_data").trim();if(k&&k.entityStates){const l=k.entityStates[R];if(l)try{if(l.attributes&&l.attributes.entries)if(typeof l.attributes.entries=="string"){const i=JSON.parse(l.attributes.entries);x=i.days||i}else x=l.attributes.entries.days||l.attributes.entries;else if(l.state&&l.state.length>5&&l.state!=="OK"&&l.state!=="unknown"){const i=JSON.parse(l.state);x=i.days||i}else if(!x&&l.attributes){const i=l.attributes.message;if(i!==void 0){const g=new Date,M=l.attributes.start_time||"",D=l.attributes.end_time||"",S=l.attributes.all_day===!0;x=[{day:g.getDate(),all_day:S?[{summary:i,start:M,end:D}]:[],other:S?[]:[{summary:i,start:M,end:D}]}]}}}catch(i){console.warn("[Calendar Widget] Failed to parse live state/attributes:",i)}}if(x&&Array.isArray(x)&&x.length>0){y.innerHTML="";const l=parseInt(String(e.max_events||e.event_limit||8),10);let i=0;for(const g of x){if(i>=l)break;const M=g.day,D=(S,P)=>{if(i>=l)return;const Y=S.summary||"No Title",N=S.start||"";let z=P?"All Day":"";!P&&N.includes("T")&&(z=N.split("T")[1].substring(0,5));const T=document.createElement("div");T.style.marginBottom="4px",T.style.display="flex",T.style.justifyContent="space-between",T.innerHTML=`<span style="flex-shrink:0;width:25px;"><b>${M}</b></span><span style="flex-grow:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-right:8px;">${Y}</span><span style="flex-shrink:0;opacity:0.7;font-size:0.9em;">${z}</span>`,y.appendChild(T),i++};g.all_day&&g.all_day.forEach(S=>D(S,!0)),g.other&&g.other.forEach(S=>D(S,!1))}}else y.innerHTML=`
            <div style="margin-bottom:4px;"><b>${o}</b> Meeting with Team</div>
            <div><b>${Math.min(o+2,W)}</b> Dentist Appointment</div>
        `;e.show_events!==!1&&t.appendChild(y)},K={id:"calendar",name:"Calendar",category:"Events",supportedModes:["lvgl","direct"],defaults:{entity_id:"sensor.esp_calendar_data",border_width:0,show_border:!0,border_color:"theme_auto",border_radius:0,background_color:"transparent",text_color:"theme_auto",font_size_date:100,font_size_day:24,font_size_grid:14,font_size_event:18,show_header:!0,show_grid:!0,show_events:!0,width:335,height:340,opa:255,font_weight_header_date:100,font_weight_header_day:700,font_weight_month:400,font_weight_grid_header:700,font_weight_dates:700,font_weight_events:400},renderProperties:(t,n)=>{const e=n.props||{},s=(a,m)=>{const p={...n.props,[a]:m};k.updateWidget(n.id,{props:p})};t.createSection("Data Source",!0),t.addLabeledInputWithPicker("Calendar Sensor ID","text",n.entity_id||"sensor.esp_calendar_data",a=>{k.updateWidget(n.id,{entity_id:a})},n),t.addLabeledInput("Source Calendars (CSV)","text",e.source_calendars||"calendar.example_1, calendar.example_2",a=>s("source_calendars",a)),t.addHint("List the HA calendar entities to include, separated by commas.");const h=document.createElement("div");h.style.display="flex",h.style.gap="8px",h.style.marginTop="12px";const c=document.createElement("button");c.className="btn btn-secondary btn-full btn-xs",c.textContent="Script",c.title="Download Python Helper Script",c.style.flex="1",c.addEventListener("click",()=>{const a=document.createElement("a");a.setAttribute("href","data:text/x-python;charset=utf-8,"+encodeURIComponent(G)),a.setAttribute("download","esp_calendar_data_conversion.py"),a.click()});const f=document.createElement("button");f.className="btn btn-secondary btn-full btn-xs",f.textContent="YAML",f.title="Copy HA Template YAML to Clipboard",f.style.flex="1",f.addEventListener("click",()=>{const a=`
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
`;navigator.clipboard.writeText(a.trim()),f.textContent="✓ Copied",setTimeout(()=>{f.textContent="YAML"},2e3)}),h.appendChild(c),h.appendChild(f),t.getContainer().appendChild(h),t.addHint("1. Download script to /python_scripts/<br/>2. Copy & paste YAML to HA config."),t.endSection(),t.createSection("Design",!0),t.addCheckbox("Show Header",e.show_header!==!1,a=>s("show_header",a)),t.addCheckbox("Show Grid",e.show_grid!==!1,a=>s("show_grid",a)),t.addCheckbox("Show Events",e.show_events!==!1,a=>s("show_events",a)),t.addLabeledInput("Max Events","number",e.max_events||8,a=>s("max_events",parseInt(a,10))),t.endSection(),t.createSection("Typography",!1),t.addSelect("Font Family",e.font_family||"Roboto",["Roboto","Inter","Open Sans","Monospace"],a=>s("font_family",a)),t.addLabeledInput("Date Size (Header)","number",e.font_size_date||100,a=>s("font_size_date",parseInt(a,10))),t.addLabeledInput("Day Size (Header)","number",e.font_size_day||24,a=>s("font_size_day",parseInt(a,10))),t.addLabeledInput("Grid Text Size","number",e.font_size_grid||14,a=>s("font_size_grid",parseInt(a,10))),t.addLabeledInput("Event Text Size","number",e.font_size_event||18,a=>s("font_size_event",parseInt(a,10)));const d=e.font_family||"Roboto",r=B(d),o=(a,m,p)=>{let v=e[m]!==void 0?e[m]:p;v=O(d,v),t.addSelect(a,v,r,_=>s(m,parseInt(_,10)))};o("Header Date Weight","font_weight_header_date",100),o("Header Day Weight","font_weight_header_day",700),o("Month Weight","font_weight_month",400),o("Grid Header Weight","font_weight_grid_header",700),o("Dates Weight","font_weight_dates",700),o("Events Weight","font_weight_events",400),t.endSection(),t.createSection("Appearance",!1),t.addColorSelector("Text Color",e.text_color||"theme_auto",null,a=>s("text_color",a)),t.addColorSelector("Background",e.background_color||"transparent",null,a=>s("background_color",a)),t.addLabeledInput("Border Width","number",e.border_width||0,a=>s("border_width",parseInt(a,10))),t.addColorSelector("Border Color",e.border_color||"theme_auto",null,a=>s("border_color",a)),t.addLabeledInput("Corner Radius","number",e.border_radius||0,a=>s("border_radius",parseInt(a,10))),t.addNumberWithSlider("Opacity (%)",e.opacity!==void 0?e.opacity:100,0,100,a=>s("opacity",a)),t.addDropShadowButton(t.getContainer(),n.id),t.endSection()},render:(t,n,e)=>{const s=n.props||{};t.innerHTML="",j(t,n,s,e)},onExportTextSensors:t=>{const{lines:n,widgets:e}=t;if(!e)return;const s=e.filter(r=>r.type==="calendar");if(s.length===0)return;for(const r of s){const o=r.props||{},a=(r.entity_id||o.entity_id||"sensor.esp_calendar_data").trim(),m=a.startsWith("sensor."),p=`calendar_data_${a.replace(/[^a-zA-Z0-9_]/g,"_")}`;t.seenEntityIds&&t.seenEntityIds.has(a)||t.seenSensorIds&&t.seenSensorIds.has(p)||(t.seenEntityIds&&t.seenEntityIds.add(a),t.seenSensorIds&&t.seenSensorIds.add(p),n.push("- platform: homeassistant"),n.push(`  id: ${p}`),n.push(`  entity_id: ${a}`),m&&n.push("  attribute: entries"),n.push("  internal: true"))}const h=s[0],d=(h.props&&h.props.source_calendars?h.props.source_calendars:"calendar.example_1, calendar.example_2").split(",").map(r=>r.trim()).filter(r=>r).map(r=>`#           - ${r}`).join(`
`);n.push(""),n.push("# ============================================================================"),n.push("# CALENDAR EVENTS SETUP (HOME ASSISTANT)"),n.push("# 1. Download the 'Helper Script' from the Calendar widget's properties panel."),n.push("# 2. Place it in your /config/python_scripts/ folder."),n.push("# 3. Enable the python_script integration by adding this line to configuration.yaml:"),n.push("#"),n.push("#    python_script:"),n.push("#"),n.push("# 4. Add this template sensor configuration (configuration.yaml or packages):"),n.push("#"),n.push("# template:"),n.push("#   - trigger:"),n.push("#       - trigger: time_pattern"),n.push("#         minutes: '/15'"),n.push("#     action:"),n.push("#       - action: calendar.get_events"),n.push("#         target:"),n.push("#           entity_id:"),n.push(`${d}`),n.push("#         data:"),n.push("#           duration:"),n.push("#             days: 14"),n.push("#         response_variable: calendar_events"),n.push("#       - action: python_script.esp_calendar_data_conversion"),n.push("#         data:"),n.push('#           calendar: "{{ calendar_events }}"'),n.push(`#           now: "{{ now().isoformat().split('T')[0] }}"`),n.push("#         response_variable: output"),n.push("#     sensor:"),n.push("#       - name: ESP Calendar Data"),n.push("#         unique_id: esp_calendar_data"),n.push('#         state: "OK"'),n.push("#         attributes:"),n.push('#           entries: "{{ output.entries }}"'),n.push('#           closest_end_time: "{{ output.closest_end_time }}"'),n.push("#"),n.push("# 5. Restart HA (required for python_script), then Reload Template Entities."),n.push("# ============================================================================")},exportLVGL:(t,{common:n,convertColor:e,getLVGLFont:s})=>{const h=t.props||{},c=e(h.text_color||"theme_auto"),f=e(h.background_color||"white"),d=Math.round(Math.min((h.font_size_date||100)*.7,80)),r=parseInt(h.font_size_day||24,10),o=parseInt(h.font_size_grid||14,10),a=h.font_family||"Roboto",m=d+r+o+15,p=[];return h.show_header!==!1&&p.push({label:{align:"TOP_MID",y:2,height:d+4,text:`!lambda "char buf[4]; id(ha_time).now().strftime(buf, sizeof(buf), '%d'); return buf;"`,text_font:s(a,d,100),text_color:c}},{label:{align:"TOP_MID",y:d+6,height:r+4,text:`!lambda "char buf[16]; id(ha_time).now().strftime(buf, sizeof(buf), '%A'); return buf;"`,text_font:s(a,r,700),text_color:c}},{label:{align:"TOP_MID",y:d+r+10,height:o+4,text:`!lambda "char buf[32]; id(ha_time).now().strftime(buf, sizeof(buf), '%B %Y'); return buf;"`,text_font:s(a,o,400),text_color:c}},{obj:{width:"100%",height:1,y:m,bg_color:c,border_width:0}}),h.show_grid!==!1&&(p.push({obj:{width:"100%",height:"SIZE_CONTENT",y:m+5,bg_opa:"transp",border_width:0,layout:{type:"flex",flex_flow:"row_wrap",flex_align_main:"space_around"},widgets:["Mo","Tu","We","Th","Fr","Sa","Su"].map(v=>({label:{text:`"${v}"`,text_font:s(a,o,700),text_color:c,width:"14%",align:"center"}}))}}),p.push({label:{y:m+40,align:"TOP_MID",text:'"Calendar Grid Not Supported in LVGL Mode"',text_font:s("Roboto",12,400),text_color:"0x888888"}})),{obj:{...n,bg_color:f,bg_opa:"COVER",radius:h.border_radius||0,border_width:h.border_width||0,border_color:e(h.border_color||"theme_auto"),widgets:p}}},export:(t,n)=>{const{lines:e,addFont:s,getColorConst:h,addDitherMask:c,getCondProps:f,getConditionCheck:d,isEpaper:r}=n,o=t.props||{},a=(t.entity_id||o.entity_id||"sensor.esp_calendar_data").trim(),m=o.border_color||"theme_auto",p=o.text_color||"theme_auto",v=o.background_color||"transparent",_=h(p),I=h(m),E=h(v),$=parseInt(o.border_width||0,10),b=o.border_radius||0,C=Math.round(Math.min(parseInt(o.font_size_date||100,10)*.7,80)),H=parseInt(o.font_size_day||24,10),A=parseInt(o.font_size_grid||14,10),W=parseInt(o.font_size_event||18,10),w=o.font_family||"Roboto",y=(u,J)=>o[u]!==void 0?O(w,o[u]):u==="font_weight_dates"&&o.bold_dates!==void 0?o.bold_dates?700:400:J,x=y("font_weight_header_date",100),R=y("font_weight_header_day",700),l=y("font_weight_month",400),i=y("font_weight_grid_header",700),g=y("font_weight_dates",700),M=y("font_weight_events",400),D=s(w,x,C),S=s(w,R,H),P=s(w,l,A),Y=s(w,i,A),N=s(w,g,A),z=s(w,M,W),T=d(t);T&&e.push(`        ${T}`),e.push("        {"),e.push("          auto now = id(ha_time).now();"),e.push(`          int x = ${t.x}; int y = ${t.y}; int w = ${t.width}; int h = ${t.height};`),v!=="transparent"&&(b>0?e.push(`          it.filled_rounded_rectangle(x, y, w, h, ${b}, ${E});`):e.push(`          it.filled_rectangle(x, y, w, h, ${E});`));const L=o.show_header!==!1;e.push("          // Header"),e.push(`          int headH = ${C+H+A+15};`),L?(e.push(`          it.strftime(x + w/2, y + 2, id(${D}), ${_}, TextAlign::TOP_CENTER, "%d", now);`),e.push(`          it.strftime(x + w/2, y + ${C+6}, id(${S}), ${_}, TextAlign::TOP_CENTER, "%A", now);`),e.push(`          it.strftime(x + w/2, y + ${C+H+10}, id(${P}), ${_}, TextAlign::TOP_CENTER, "%B %Y", now);`),e.push(`          it.line(x, y + headH, x + w, y + headH, ${_});`)):e.push("          headH = 0;");const F=o.show_grid!==!1;if(e.push("          // Days Grid"),e.push("          int gridY = y + headH + 5;"),e.push("          int cellW = w / 7;"),e.push(`          int rowH = ${A+4};`),e.push("          int r = 1;"),F?(e.push('          const char* days[] = {"Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"};'),e.push("          for(int i=0; i<7; i++) {"),e.push(`            it.print(x + i*cellW + cellW/2, gridY, id(${Y}), ${_}, TextAlign::TOP_CENTER, days[i]);`),e.push("          }"),e.push("          // Simple logic to find start of month"),e.push("          time_t t = now.timestamp;"),e.push("          struct tm *tm = localtime(&t);"),e.push("          tm->tm_mday = 1;"),e.push("          mktime(tm);"),e.push("          int startDay = (tm->tm_wday + 6) % 7; // 0=Mon"),e.push("          int daysInMonth = 31; // Simplified"),e.push("          if(now.month == 2) daysInMonth = (now.year % 4 == 0) ? 29 : 28;"),e.push("          else if(now.month == 4 || now.month == 6 || now.month == 9 || now.month == 11) daysInMonth = 30;"),e.push("          int c = startDay;"),e.push("          for(int d=1; d<=daysInMonth; d++) {"),e.push("            if(d == now.day_of_month) {"),e.push(`               it.filled_circle(x + c*cellW + cellW/2, gridY + r*rowH + 6, ${Math.floor(A/1.5)}, ${_});`),e.push(`               it.printf(x + c*cellW + cellW/2, gridY + r*rowH, id(${N}), ${v==="transparent"?p.includes("black")||p.includes("000000")?"Color::WHITE":"Color::BLACK":E}, TextAlign::TOP_CENTER, "%d", d);`),e.push("            } else {"),e.push(`               it.printf(x + c*cellW + cellW/2, gridY + r*rowH, id(${N}), ${_}, TextAlign::TOP_CENTER, "%d", d);`),e.push("            }"),e.push("            c++; if(c>6) { c=0; r++; }"),e.push("          }")):(e.push("          r = 0;"),e.push("          gridY = y + headH;")),o.show_events!==!1){e.push("          // Events (Real Data from Sensor)"),e.push("          auto extract_time = [](const char* datetime) -> std::string {"),e.push("              std::string datetimeStr(datetime);"),e.push("              size_t pos = datetimeStr.find('T');"),e.push("              if (pos != std::string::npos && pos + 3 < datetimeStr.size()) {"),e.push("                  return datetimeStr.substr(pos + 1, 5);"),e.push("              }"),e.push('              return "";'),e.push("          };"),e.push(""),e.push("          int eventY = gridY + (r+1)*rowH + 10;"),e.push("          int max_y = y + h - 5;"),e.push(`          const int event_limit = ${o.max_events||o.event_limit||8};`),e.push("");const u=`calendar_data_${a.replace(/[^a-zA-Z0-9_]/g,"_")}`;e.push(`          if (id(${u}).state.length() > 5 && id(${u}).state != "unknown") {`),e.push("             JsonDocument doc;"),e.push(`             DeserializationError error = deserializeJson(doc, id(${u}).state);`),e.push(""),e.push("             if (!error) {"),e.push("                 JsonVariant root = doc.as<JsonVariant>();"),e.push("                 JsonArray days;"),e.push(""),e.push('                 if (root.is<JsonObject>() && root["days"].is<JsonArray>()) {'),e.push('                     days = root["days"];'),e.push("                 } else if (root.is<JsonArray>()) {"),e.push("                     days = root;"),e.push("                 }"),e.push(""),e.push("                 if (!days.isNull() && days.size() > 0) {"),e.push("                     int event_count = 0;"),e.push("                     // Separator line"),e.push(`                     it.filled_rectangle(x + 10, eventY - 5, w - 20, 2, ${_});`),e.push(""),e.push("                     for (JsonVariant dayEntry : days) {"),e.push("                         if (eventY > max_y || event_count >= event_limit) break;"),e.push('                         int currentDayNum = dayEntry["day"].as<int>();'),e.push(""),e.push("                         auto draw_row = [&](JsonVariant event, bool is_all_day) {"),e.push("                             if (eventY > max_y || event_count >= event_limit) return;"),e.push('                             const char* summary = event["summary"] | "No Title";'),e.push('                             const char* start = event["start"] | "";'),e.push(""),e.push("                             // Draw Day Number"),e.push(`                             it.printf(x + 10, eventY, id(${z}), ${_}, TextAlign::TOP_LEFT, "%d", currentDayNum);`),e.push(""),e.push("                             // Draw Summary"),e.push(`                             it.printf(x + 50, eventY, id(${z}), ${_}, TextAlign::TOP_LEFT, "%.25s", summary);`),e.push(""),e.push("                             // Draw Time"),e.push("                             if (is_all_day) {"),e.push(`                                 it.printf(x + w - 10, eventY, id(${z}), ${_}, TextAlign::TOP_RIGHT, "All Day");`),e.push("                             } else {"),e.push("                                 std::string timeStr = extract_time(start);"),e.push(`                                 it.printf(x + w - 10, eventY, id(${z}), ${_}, TextAlign::TOP_RIGHT, "%s", timeStr.c_str());`),e.push("                             }"),e.push(`                             eventY += ${W+6};`),e.push("                             event_count++;"),e.push("                         };"),e.push(""),e.push('                         if (dayEntry["all_day"].is<JsonArray>()) {'),e.push('                             for (JsonVariant event : dayEntry["all_day"].as<JsonArray>()) {'),e.push("                                 draw_row(event, true);"),e.push("                             }"),e.push("                         }"),e.push('                         if (dayEntry["other"].is<JsonArray>()) {'),e.push('                             for (JsonVariant event : dayEntry["other"].as<JsonArray>()) {'),e.push("                                 draw_row(event, false);"),e.push("                             }"),e.push("                         }"),e.push("                     }"),e.push("                 }"),e.push("             } else {"),e.push('                 ESP_LOGW("calendar", "JSON Parse Error: %s", error.c_str());'),e.push("             }"),e.push("          }")}if($>0)if(b>0)for(let u=0;u<$;u++)e.push(`            it.rectangle(${t.x} + ${u}, ${t.y} + ${u}, ${t.width} - ${2*u}, ${t.height} - ${2*u}, ${I});`);else for(let u=0;u<$;u++)e.push(`            it.rectangle(${t.x} + ${u}, ${t.y} + ${u}, ${t.width} - ${2*u}, ${t.height} - ${2*u}, ${I});`);c(e,p,r,t.x,t.y,t.width,t.height),e.push("        }"),T&&e.push("        }")},collectRequirements:(t,{addFont:n})=>{const e=t.props||{},s=Math.round(Math.min(parseInt(e.font_size_date||100,10)*.7,80)),h=parseInt(e.font_size_day||24,10),c=parseInt(e.font_size_grid||14,10),f=parseInt(e.font_size_event||18,10),d=e.font_family||"Roboto",r=(o,a)=>e[o]!==void 0?O(d,e[o]):o==="font_weight_dates"&&e.bold_dates!==void 0?e.bold_dates?700:400:a;n(d,r("font_weight_header_date",100),s),n(d,r("font_weight_header_day",700),h),n(d,r("font_weight_month",400),c),n(d,r("font_weight_grid_header",700),c),n(d,r("font_weight_dates",700),c),n(d,r("font_weight_events",400),f),n("Material Design Icons",400,24)}};export{K as default};
