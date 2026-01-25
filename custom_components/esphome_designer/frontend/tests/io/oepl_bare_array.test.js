import { describe, it, expect, beforeAll } from 'vitest';
import { parseSnippetYamlOffline } from '../../js/io/yaml_import.js';

// Setup window mock with js-yaml before tests
beforeAll(async () => {
    if (typeof window === 'undefined') {
        globalThis.window = {};
    }
    const jsyaml = await import('js-yaml');
    window.jsyaml = jsyaml.default || jsyaml;
});

describe('OEPL Bare Array Parsing', () => {
    const testYaml = `- type: text
  value: "Hello HA!"
  x: 131
  y: 36
  size: 20

- type: rectangle
  x_start: 26
  y_start: 93
  x_end: 126
  y_end: 143
  fill: white
  outline: black
  width: 1

- type: circle
  x: 185
  y: 124
  radius: 25
  fill: black

- type: icon
  value: "mdi:home"
  x: 316
  y: 41
  size: 24
  fill: black

- type: qrcode
  data: "https://www.home-assistant.io"
  x: 258
  y: 69
  boxsize: 2
  border: 1
  color: black
  bgcolor: white

- type: progress_bar
  x_start: 26
  y_start: 56
  x_end: 166
  y_end: 76
  progress: 50
  background: white
  fill: accent
  outline: black
  width: 1
  show_percentage: true
  font: ppb.ttf

- type: debug_grid
  spacing: 20
  line_color: grey`;

    it('should parse bare OEPL array format', () => {
        const result = parseSnippetYamlOffline(testYaml);
        
        expect(result).toBeDefined();
        expect(result.pages).toBeDefined();
        expect(result.pages.length).toBeGreaterThan(0);
        expect(result.pages[0].widgets).toBeDefined();
    });

    it('should correctly parse text widget', () => {
        const result = parseSnippetYamlOffline(testYaml);
        const textWidget = result.pages[0].widgets.find(w => w.type === 'text');
        
        expect(textWidget).toBeDefined();
        expect(textWidget.x).toBe(131);
        expect(textWidget.y).toBe(36);
        expect(textWidget.props.text).toBe('Hello HA!');
        expect(textWidget.props.font_size).toBe(20);
    });

    it('should correctly parse rectangle widget', () => {
        const result = parseSnippetYamlOffline(testYaml);
        const rectWidget = result.pages[0].widgets.find(w => w.type === 'shape_rect');
        
        expect(rectWidget).toBeDefined();
        expect(rectWidget.x).toBe(26);
        expect(rectWidget.y).toBe(93);
        expect(rectWidget.width).toBe(100);  // 126 - 26
        expect(rectWidget.height).toBe(50);  // 143 - 93
    });

    it('should correctly parse circle widget', () => {
        const result = parseSnippetYamlOffline(testYaml);
        const circleWidget = result.pages[0].widgets.find(w => w.type === 'shape_circle');
        
        expect(circleWidget).toBeDefined();
        expect(circleWidget.x).toBe(160);  // 185 - 25 (center minus radius)
        expect(circleWidget.y).toBe(99);   // 124 - 25
        expect(circleWidget.width).toBe(50);  // diameter
        expect(circleWidget.height).toBe(50);
    });

    it('should correctly parse icon widget', () => {
        const result = parseSnippetYamlOffline(testYaml);
        const iconWidget = result.pages[0].widgets.find(w => w.type === 'icon');
        
        expect(iconWidget).toBeDefined();
        expect(iconWidget.x).toBe(316);
        expect(iconWidget.y).toBe(41);
        expect(iconWidget.props.code).toBe('mdi:home');
        expect(iconWidget.props.size).toBe(24);
    });

    it('should correctly parse qrcode widget', () => {
        const result = parseSnippetYamlOffline(testYaml);
        const qrWidget = result.pages[0].widgets.find(w => w.type === 'qr_code');
        
        expect(qrWidget).toBeDefined();
        expect(qrWidget.x).toBe(258);
        expect(qrWidget.y).toBe(69);
        expect(qrWidget.props.value).toBe('https://www.home-assistant.io');
    });

    it('should correctly parse progress_bar widget', () => {
        const result = parseSnippetYamlOffline(testYaml);
        const progressWidget = result.pages[0].widgets.find(w => w.type === 'progress_bar');
        
        expect(progressWidget).toBeDefined();
        expect(progressWidget.x).toBe(26);
        expect(progressWidget.y).toBe(56);
        expect(progressWidget.props.show_percentage).toBe(true);
    });

    it('should skip debug_grid widget', () => {
        const result = parseSnippetYamlOffline(testYaml);
        const debugWidget = result.pages[0].widgets.find(w => w.type === 'debug_grid');
        
        expect(debugWidget).toBeUndefined();
    });

    it('should parse 6 widgets total (excluding debug_grid)', () => {
        const result = parseSnippetYamlOffline(testYaml);
        expect(result.pages[0].widgets.length).toBe(6);
    });
});
