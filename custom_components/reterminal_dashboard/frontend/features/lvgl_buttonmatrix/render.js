(() => {
    const render = (el, widget, { getColorStyle }) => {
        const props = widget.props || {};

        el.innerHTML = "";
        el.style.display = "grid";
        el.style.boxSizing = "border-box";
        el.style.gap = "2px";
        el.style.padding = "2px";
        el.style.backgroundColor = "#444";

        let rows = props.rows || [{ buttons: ["Btn1", "Btn2"] }, { buttons: ["Btn3", "Btn4"] }];
        if (!Array.isArray(rows)) rows = [];
        el.style.gridTemplateRows = `repeat(${rows.length || 1}, 1fr)`;

        rows.forEach(rowObj => {
            let buttons = [];
            if (rowObj && typeof rowObj === 'object') {
                buttons = rowObj.buttons || [];
            } else if (typeof rowObj === 'string') {
                buttons = [rowObj];
            }

            if (!Array.isArray(buttons)) buttons = [String(buttons)];

            const rowDiv = document.createElement("div");
            rowDiv.style.display = "grid";
            rowDiv.style.gridTemplateColumns = `repeat(${buttons.length}, 1fr)`;
            rowDiv.style.gap = "2px";

            buttons.forEach(btnText => {
                const btn = document.createElement("div");
                btn.style.backgroundColor = "#666";
                btn.style.display = "flex";
                btn.style.alignItems = "center";
                btn.style.justifyContent = "center";
                btn.style.color = "#fff";
                btn.style.fontSize = "12px";
                btn.style.fontFamily = "Roboto, sans-serif";
                btn.style.borderRadius = "3px";
                btn.textContent = btnText;
                rowDiv.appendChild(btn);
            });
            el.appendChild(rowDiv);
        });
    };

    const registerFeature = () => {
        if (window.FeatureRegistry) {
            window.FeatureRegistry.register("lvgl_buttonmatrix", { render });
            return true;
        }
        return false;
    };

    if (!registerFeature()) {
        setTimeout(() => {
            if (!registerFeature()) {
                console.error("[lvgl_buttonmatrix] FeatureRegistry not found!");
            }
        }, 100);
    }
})();
