import { getCategoryExpansion, getWidgetCompatibility } from './widget_palette_rules.js';

function createCategoryHeader(category, isExpanded) {
    const headerEl = document.createElement('div');
    headerEl.className = 'widget-category-header';

    let iconHtml = '<span class="category-icon">&#8250;</span>';
    if (category.icon) {
        iconHtml += category.icon;
    }

    headerEl.innerHTML = `
        ${iconHtml}
        <span class="category-name">${category.name}</span>
        ${category.widgets.length > 0 && !isExpanded ? `<span class="category-count">${category.widgets.length}</span>` : ''}
    `;

    return headerEl;
}

function createWidgetItem(widget, category, currentMode, registry, showToast) {
    const itemEl = document.createElement('div');
    const plugin = registry.get(widget.type);
    const { isCompatible, explanation } = getWidgetCompatibility(widget, category, plugin, currentMode);

    itemEl.className = 'item' + (isCompatible ? '' : ' incompatible');
    itemEl.draggable = isCompatible;
    itemEl.dataset.widgetType = widget.type;

    const label = widget.label || plugin?.name;
    const tagHtml = widget.tag ? `<span class="tag">${widget.tag}</span>` : '';

    itemEl.innerHTML = `
        ${widget.icon}
        <span class="label">${label}</span>
        ${tagHtml}
    `;
    itemEl.title = isCompatible ? `Add ${label} to canvas` : explanation;

    if (isCompatible) {
        itemEl.addEventListener('dragstart', (e) => {
            if (!e.dataTransfer) return;
            e.dataTransfer.setData('application/widget-type', widget.type);
            e.dataTransfer.setData('text/plain', widget.type);
            e.dataTransfer.effectAllowed = 'copy';
        });
    } else {
        itemEl.addEventListener('click', (e) => {
            e.stopPropagation();
            showToast(explanation, 'warning');
        });
    }

    return itemEl;
}

/**
 * @param {{
 *   container: HTMLElement,
 *   categories: Array<any>,
 *   currentMode: string,
 *   registry: any,
 *   showToast: (message: string, level: string) => void
 * }} options
 */
export function renderWidgetPaletteContents(options) {
    const { container, categories, currentMode, registry, showToast } = options;

    container.innerHTML = '';

    categories.forEach((category) => {
        const isExpanded = getCategoryExpansion(category, currentMode);

        const categoryEl = document.createElement('div');
        categoryEl.className = `widget-category ${isExpanded ? 'expanded' : ''}`;
        categoryEl.dataset.category = category.id;

        const headerEl = createCategoryHeader(category, isExpanded);
        headerEl.addEventListener('click', () => {
            categoryEl.classList.toggle('expanded');
        });

        const itemsEl = document.createElement('div');
        itemsEl.className = 'widget-category-items';

        category.widgets.forEach((widget) => {
            itemsEl.appendChild(createWidgetItem(widget, category, currentMode, registry, showToast));
        });

        categoryEl.appendChild(headerEl);
        categoryEl.appendChild(itemsEl);
        container.appendChild(categoryEl);
    });
}
