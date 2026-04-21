import { AppState } from '../core/state';

function appendSectionLabel(container, label) {
    const element = document.createElement('div');
    element.style.fontSize = '10px';
    element.style.color = 'var(--muted)';
    element.style.marginBottom = '6px';
    element.style.fontWeight = '600';
    element.style.marginTop = '8px';
    element.textContent = label;
    container.appendChild(element);
}

function appendButtonRow(container) {
    const wrap = document.createElement('div');
    wrap.style.display = 'flex';
    wrap.style.gap = '4px';
    container.appendChild(wrap);
    return wrap;
}

function appendHelperText(container, text) {
    const element = document.createElement('div');
    element.style.fontSize = '10px';
    element.style.color = 'var(--muted)';
    element.style.lineHeight = '1.4';
    element.style.marginTop = '6px';
    element.textContent = text;
    container.appendChild(element);
}

/**
 * @param {any} view
 * @param {HTMLElement | null} controlsContainer
 * @returns {void}
 */
export function renderHierarchyControls(view, controlsContainer) {
    if (!controlsContainer) return;

    const selectedWidgets = AppState.getSelectedWidgets();
    if (selectedWidgets.length === 0) {
        controlsContainer.style.display = 'none';
        return;
    }

    controlsContainer.style.display = 'block';
    controlsContainer.innerHTML = '';

    appendSectionLabel(controlsContainer, 'GROUPING');
    const groupingRow = appendButtonRow(controlsContainer);

    const hasGroup = selectedWidgets.some((widget) => widget.type === 'group' || widget.parentId);
    const groupBtn = document.createElement('button');
    groupBtn.className = 'btn btn-secondary';
    groupBtn.innerHTML = '<i class="mdi mdi-group" style="margin-right:4px"></i>Group';
    groupBtn.style.flex = '1';
    groupBtn.style.fontSize = '10px';
    groupBtn.disabled = selectedWidgets.length < 2 || hasGroup;
    groupBtn.onclick = () => AppState.groupSelection();
    groupingRow.appendChild(groupBtn);

    const ungroupBtn = document.createElement('button');
    ungroupBtn.className = 'btn btn-secondary';
    ungroupBtn.innerHTML = '<i class="mdi mdi-ungroup" style="margin-right:4px"></i>Ungroup';
    ungroupBtn.style.flex = '1';
    ungroupBtn.style.fontSize = '10px';
    ungroupBtn.disabled = !hasGroup;
    ungroupBtn.onclick = () => AppState.ungroupSelection();
    groupingRow.appendChild(ungroupBtn);
    appendHelperText(controlsContainer, 'Tip: Shift/Ctrl-click or drag an empty canvas area to multi-select, then drag one selected widget to move the whole selection.');

    if (selectedWidgets.length !== 1) {
        return;
    }

    const widget = selectedWidgets[0];
    appendSectionLabel(controlsContainer, 'LAYER ORDER');
    const layerRow = appendButtonRow(controlsContainer);
    const buttons = [
        { label: 'Front', icon: 'mdi-arrange-bring-to-front', action: () => view.moveToFront(widget) },
        { label: 'Back', icon: 'mdi-arrange-send-to-back', action: () => view.moveToBack(widget) },
        { label: 'Up', icon: 'mdi-arrow-up', action: () => view.moveUp(widget) },
        { label: 'Down', icon: 'mdi-arrow-down', action: () => view.moveDown(widget) }
    ];

    buttons.forEach((config) => {
        const button = document.createElement('button');
        button.className = 'btn btn-secondary';
        button.innerHTML = `<i class="mdi ${config.icon}"></i>`;
        button.title = config.label;
        button.style.flex = '1';
        button.style.fontSize = '12px';
        button.style.padding = '4px';
        button.onclick = () => config.action();
        layerRow.appendChild(button);
    });
}
