import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockPluginRender = vi.fn();

const mockAppState = {
    currentPageIndex: 0,
    zoomLevel: 1,
    selectedWidgetIds: ['widget-1'],
    settings: {
        darkMode: false,
        device_model: 'reterminal_e1001'
    },
    getCurrentPage: vi.fn(() => ({ id: 'page-1', dark_mode: 'auto' })),
    setZoomLevel: vi.fn((value) => {
        mockAppState.zoomLevel = value;
    })
};

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/io/devices.js', () => ({
    DEVICE_PROFILES: {
        reterminal_e1001: { name: 'reTerminal', features: { epaper: true } }
    }
}));

vi.mock('../../js/utils/device.js', () => ({
    getColorStyle: (value) => `resolved-${value}`
}));

vi.mock('../../js/core/plugin_registry', () => ({
    registry: {
        get: () => ({ render: mockPluginRender })
    }
}));

describe('canvas_renderer_navigation', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockAppState.zoomLevel = 1;
        mockAppState.settings.darkMode = false;
        mockAppState.selectedWidgetIds = ['widget-1'];
        vi.stubGlobal('requestAnimationFrame', vi.fn((callback) => {
            callback();
            return 1;
        }));
        vi.stubGlobal('cancelAnimationFrame', vi.fn());
        document.body.innerHTML = `
            <div id="zoomLevel"></div>
            <div id="canvasContainer"></div>
            <div id="canvas"></div>
            <div id="viewport"></div>
        `;
    });

    it('derives effective dark mode from page overrides and global settings', async () => {
        const { getPageEffectiveDarkMode, getEffectiveDarkMode } = await import('../../js/core/canvas_renderer_navigation.js');

        expect(getPageEffectiveDarkMode({ dark_mode: 'dark' })).toBe(true);
        expect(getPageEffectiveDarkMode({ dark_mode: 'light' })).toBe(false);

        mockAppState.settings.darkMode = true;
        mockAppState.getCurrentPage.mockReturnValue({ dark_mode: 'auto' });
        expect(getEffectiveDarkMode()).toBe(true);
    });

    it('focuses the target page and applies zoom transform through the extracted helper', async () => {
        const { focusPage } = await import('../../js/core/canvas_renderer_navigation.js');

        const canvas = document.getElementById('canvas');
        const viewport = document.getElementById('viewport');
        const canvasContainer = document.getElementById('canvasContainer');
        const wrapper = document.createElement('div');
        wrapper.className = 'artboard-wrapper';
        canvas.appendChild(wrapper);

        Object.defineProperty(wrapper, 'offsetLeft', { configurable: true, value: 100 });
        Object.defineProperty(wrapper, 'offsetTop', { configurable: true, value: 50 });
        Object.defineProperty(wrapper, 'offsetWidth', { configurable: true, value: 200 });
        Object.defineProperty(wrapper, 'offsetHeight', { configurable: true, value: 100 });
        vi.spyOn(viewport, 'getBoundingClientRect').mockReturnValue({
            width: 800,
            height: 600
        });

        const canvasInstance = {
            canvas,
            viewport,
            canvasContainer,
            panX: 0,
            panY: 0
        };

        focusPage(canvasInstance, 0, true, true);

        expect(mockAppState.setZoomLevel).toHaveBeenCalled();
        expect(canvasInstance.canvasContainer.style.transform).toContain('scale(');
        expect(document.getElementById('zoomLevel')?.textContent).toContain('%');
    });

    it('zooms to fit all artboards and cancels any pending scheduled measurement', async () => {
        const { zoomToFitAll, calculateZoomToFit } = await import('../../js/core/canvas_renderer_navigation.js');

        const canvas = document.getElementById('canvas');
        const viewport = document.getElementById('viewport');
        const canvasContainer = document.getElementById('canvasContainer');
        const first = document.createElement('div');
        const second = document.createElement('div');
        first.className = 'artboard-wrapper';
        second.className = 'artboard-wrapper';
        canvas.append(first, second);

        Object.defineProperty(first, 'offsetLeft', { configurable: true, value: 0 });
        Object.defineProperty(first, 'offsetTop', { configurable: true, value: 0 });
        Object.defineProperty(first, 'offsetWidth', { configurable: true, value: 100 });
        Object.defineProperty(first, 'offsetHeight', { configurable: true, value: 100 });
        Object.defineProperty(second, 'offsetLeft', { configurable: true, value: 400 });
        Object.defineProperty(second, 'offsetTop', { configurable: true, value: 200 });
        Object.defineProperty(second, 'offsetWidth', { configurable: true, value: 200 });
        Object.defineProperty(second, 'offsetHeight', { configurable: true, value: 100 });
        vi.spyOn(viewport, 'getBoundingClientRect').mockReturnValue({ width: 800, height: 600 });

        const canvasInstance = {
            canvas,
            viewport,
            canvasContainer,
            panX: 0,
            panY: 0,
            _zoomToFitAllRaf: 42
        };

        zoomToFitAll(canvasInstance);

        expect(cancelAnimationFrame).toHaveBeenCalledWith(42);
        expect(mockAppState.setZoomLevel).toHaveBeenCalled();
        expect(canvasInstance.panX).not.toBe(0);
        expect(canvasInstance.panY).not.toBe(0);
        expect(calculateZoomToFit({ canvas, viewport }, 99)).toBe(1);
    });

    it('clamps fit zoom between the device floor and the max magnification ceiling', async () => {
        const { calculateZoomToFit } = await import('../../js/core/canvas_renderer_navigation.js');

        const canvas = document.getElementById('canvas');
        const viewport = document.getElementById('viewport');
        const wrapper = document.createElement('div');
        wrapper.className = 'artboard-wrapper';
        canvas.appendChild(wrapper);

        Object.defineProperty(wrapper, 'offsetWidth', { configurable: true, value: 50 });
        Object.defineProperty(wrapper, 'offsetHeight', { configurable: true, value: 50 });
        vi.spyOn(viewport, 'getBoundingClientRect').mockReturnValue({ width: 2000, height: 2000 });
        expect(calculateZoomToFit({ canvas, viewport }, 0)).toBe(4);

        Object.defineProperty(wrapper, 'offsetWidth', { configurable: true, value: 5000 });
        Object.defineProperty(wrapper, 'offsetHeight', { configurable: true, value: 3000 });
        vi.spyOn(viewport, 'getBoundingClientRect').mockReturnValue({ width: 100, height: 80 });
        expect(calculateZoomToFit({ canvas, viewport }, 0)).toBe(0.15);
    });

    it('updates widget DOM geometry and delegates plugin rendering with computed helpers', async () => {
        const { updateWidgetDOM } = await import('../../js/core/canvas_renderer_navigation.js');

        const canvas = document.getElementById('canvas');
        const element = document.createElement('div');
        element.className = 'widget';
        element.dataset.id = 'widget-1';
        canvas.appendChild(element);

        const widget = {
            id: 'widget-1',
            type: 'text',
            x: 12,
            y: 18,
            width: 120,
            height: 48,
            props: { opacity: 60 }
        };

        updateWidgetDOM({ canvas }, widget);

        expect(element.style.left).toBe('12px');
        expect(element.style.top).toBe('18px');
        expect(element.style.width).toBe('120px');
        expect(element.style.height).toBe('48px');
        expect(element.style.opacity).toBe('0.6');
        expect(mockPluginRender).toHaveBeenCalledWith(
            element,
            widget,
            expect.objectContaining({
                selected: true,
                isDark: false,
                profile: expect.any(Object),
                getColorStyle: expect.any(Function)
            })
        );
        const renderContext = mockPluginRender.mock.calls[0][2];
        expect(renderContext.getColorStyle('theme_auto')).toBe('#000000');
        expect(renderContext.getColorStyle('theme_auto_inverse')).toBe('#ffffff');
    });

    it('marks groups without invoking plugin render and honors skipPluginRender', async () => {
        const { updateWidgetDOM } = await import('../../js/core/canvas_renderer_navigation.js');

        const canvas = document.getElementById('canvas');
        const groupEl = document.createElement('div');
        groupEl.className = 'widget';
        groupEl.dataset.id = 'group-1';
        const textEl = document.createElement('div');
        textEl.className = 'widget';
        textEl.dataset.id = 'widget-2';
        canvas.append(groupEl, textEl);

        updateWidgetDOM({ canvas }, {
            id: 'group-1',
            type: 'group',
            x: 0,
            y: 0,
            width: 10,
            height: 10
        });
        updateWidgetDOM({ canvas }, {
            id: 'widget-2',
            type: 'text',
            x: 0,
            y: 0,
            width: 10,
            height: 10
        }, true);

        expect(groupEl.classList.contains('widget-group')).toBe(true);
        expect(mockPluginRender).not.toHaveBeenCalled();
    });
});
