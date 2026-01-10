// Icon Picker UI - ES Module
import { AppState } from '../core/state.js';
import { iconPickerData } from '../core/constants_icons.js';

let pickerModal = null;
let pickerFilter = null;
let pickerList = null;
let pickerClose = null;
let currentWidget = null;
let currentInput = null;

/**
 * Initializes the icon picker modal elements.
 */
function initPicker() {
    if (pickerModal) return;

    // Try to find existing elements
    pickerModal = document.getElementById('iconPickerModal');
    pickerFilter = document.getElementById('iconPickerFilter');
    pickerList = document.getElementById('iconPickerList');
    pickerClose = document.getElementById('iconPickerClose');

    if (!pickerModal) {
        // Create dynamic modal if not in HTML
        pickerModal = document.createElement('div');
        pickerModal.id = 'iconPickerModal';
        pickerModal.className = 'modal-backdrop hidden';
        pickerModal.style.zIndex = "2000";
        pickerModal.innerHTML = `
            <div class="modal" style="max-width: 500px; height: 80vh; display: flex; flex-direction: column;">
                <div class="modal-header">
                    <div>Select Icon</div>
                    <button id="iconPickerClose" class="btn btn-secondary">×</button>
                </div>
                <div class="modal-body" style="flex: 1; overflow: hidden; display: flex; flex-direction: column; padding: 15px;">
                    <input type="text" id="iconPickerFilter" class="prop-input" placeholder="Filter icons..." style="width: 100%; margin-bottom: 12px;">
                    <div id="iconPickerList" style="flex: 1; overflow-y: auto; border: 1px solid var(--border-subtle); border-radius: 4px; display: grid; grid-template-columns: repeat(auto-fill, minmax(60px, 1fr)); gap: 8px; padding: 10px; background: var(--bg-canvas);"></div>
                </div>
            </div>
        `;
        document.body.appendChild(pickerModal);

        pickerFilter = document.getElementById('iconPickerFilter');
        pickerList = document.getElementById('iconPickerList');
        pickerClose = document.getElementById('iconPickerClose');
    }

    if (pickerClose) {
        pickerClose.onclick = closeIconPicker;
    }

    if (pickerFilter) {
        pickerFilter.oninput = (e) => {
            const target = /** @type {HTMLInputElement} */ (e.target);
            filterIcons(target.value);
        };
    }

    // Close on click outside
    pickerModal.onclick = (e) => {
        if (e.target === pickerModal) closeIconPicker();
    };
}

/**
 * Opens the icon picker for a specific widget.
 */
export function openIconPickerForWidget(widget, inputElement) {
    initPicker();
    currentWidget = widget;
    currentInput = inputElement;

    pickerModal.classList.remove('hidden');
    pickerModal.style.display = 'flex';

    if (pickerFilter) {
        pickerFilter.value = '';
        pickerFilter.focus();
    }

    renderIconList(iconPickerData || []);
}

/**
 * Closes the icon picker modal.
 */
export function closeIconPicker() {
    if (pickerModal) {
        pickerModal.classList.add('hidden');
        pickerModal.style.display = 'none';
    }
    currentWidget = null;
    currentInput = null;
}

/**
 * Renders the list of icons.
 */
function renderIconList(icons) {
    if (!pickerList) return;
    pickerList.innerHTML = '';

    if (!icons || icons.length === 0) {
        pickerList.innerHTML = '<div style="padding: 10px; color: var(--muted); grid-column: 1 / -1; text-align: center;">No icons found.</div>';
        return;
    }

    const fragment = document.createDocumentFragment();

    icons.forEach(icon => {
        const item = document.createElement('div');
        item.className = 'icon-item';
        item.style.padding = '8px';
        item.style.border = '1px solid var(--border-subtle)';
        item.style.borderRadius = '4px';
        item.style.cursor = 'pointer';
        item.style.display = 'flex';
        item.style.flexDirection = 'column';
        item.style.alignItems = 'center';
        item.style.justifyContent = 'center';
        item.style.textAlign = 'center';
        item.style.background = 'var(--bg)';
        item.title = icon.name;

        const iconPreview = document.createElement('div');
        iconPreview.className = 'mdi';
        iconPreview.style.fontSize = '24px';
        iconPreview.style.color = 'var(--accent)';
        // Convert Fxxxx to actual char
        const charCode = parseInt(icon.code, 16);
        iconPreview.textContent = String.fromCodePoint(charCode);

        const iconName = document.createElement('div');
        iconName.style.fontSize = '9px';
        iconName.style.marginTop = '4px';
        iconName.style.overflow = 'hidden';
        iconName.style.textOverflow = 'ellipsis';
        iconName.style.whiteSpace = 'nowrap';
        iconName.style.width = '100%';
        iconName.style.color = 'var(--muted)';
        iconName.textContent = icon.name;

        item.appendChild(iconPreview);
        item.appendChild(iconName);

        item.onclick = () => selectIcon(icon);

        // Hover effect
        item.onmouseenter = () => { item.style.borderColor = 'var(--accent)'; item.style.background = 'rgba(110, 68, 255, 0.05)'; };
        item.onmouseleave = () => { item.style.borderColor = 'var(--border-subtle)'; item.style.background = 'var(--bg)'; };

        fragment.appendChild(item);
    });

    pickerList.appendChild(fragment);
}

/**
 * Filters the displayed icons.
 */
function filterIcons(query) {
    const data = iconPickerData || [];
    if (!query) {
        renderIconList(data);
        return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = data.filter(icon =>
        icon.name.toLowerCase().includes(lowerQuery) ||
        icon.code.toLowerCase().includes(lowerQuery)
    );
    renderIconList(filtered);
}

/**
 * Handles icon selection.
 */
function selectIcon(icon) {
    if (currentWidget) {
        if (currentInput) {
            currentInput.value = icon.code;
            currentInput.dispatchEvent(new Event('input'));
            currentInput.dispatchEvent(new Event('change'));
        } else {
            if (!currentWidget.props) currentWidget.props = {};
            currentWidget.props.code = icon.code;
            if (AppState) {
                AppState.updateWidget(currentWidget.id, currentWidget);
            }
        }
    }
    closeIconPicker();
}
