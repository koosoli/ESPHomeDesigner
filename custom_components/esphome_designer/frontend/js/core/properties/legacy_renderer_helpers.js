import { AppState } from '../state';
import { fetchEntityStates } from '../../io/ha_api.js';

/**
 * @param {string} widgetId
 * @param {string} entityId
 * @returns {void}
 */
export function autoPopulateTitleFromEntity(widgetId, entityId) {
    if (!entityId || !AppState) return;

    if (typeof fetchEntityStates === 'function') {
        fetchEntityStates().then(entities => {
            if (!entities || entities.length === 0) return;
            const entity = entities.find(e => e.entity_id === entityId);
            if (entity && entity.name) {
                const currentWidget = AppState.getSelectedWidget();
                if (currentWidget && currentWidget.id === widgetId && !currentWidget.title) {
                    AppState.updateWidget(widgetId, { title: entity.name });
                }
            }
        }).catch(() => { });
    }
}
