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

describe('OpenDisplay Bare Array Parsing', () => {
    const testYaml = `- type: text
  visible: true
  value: "Hello World"
  x: 473
  y: 96
  size: 20
  color: "black"
  font: "ppb.ttf"

- type: line
  visible: true
  x_start: 413
  x_end: 503
  y_start: 271
  y_end: 271
  width: 1
  fill: "black"

- type: rectangle
  visible: true
  x_start: 97
  x_end: 187
  y_start: 230
  y_end: 270
  outline: "black"
  width: 1

- type: circle
  visible: true
  x: 372
  y: 246
  radius: 20
  outline: "black"
  width: 1

- type: icon
  visible: true
  value: "mdi:home"
  x: 285
  y: 293
  size: 120
  fill: "black"

- type: qrcode
  visible: true
  data: "https://opendisplay.org"
  x: 140
  y: 50
  boxsize: 2
  border: 2
  color: "black"
  bgcolor: "white"

- type: progress_bar
  visible: true
  x_start: 402
  y_start: 174
  x_end: 672
  y_end: 192
  progress: 42
  direction: "right"
  fill: "red"
  outline: "black"
  width: 1
  background: "white"`;

    it('should parse bare OpenDisplay array format', () => {
        const result = parseSnippetYamlOffline(testYaml);
        
        expect(result).toBeDefined();
        expect(result.pages).toBeDefined();
        expect(result.pages.length).toBeGreaterThan(0);
        expect(result.pages[0].widgets).toBeDefined();
    });

    it('should parse all 7 widgets', () => {
        const result = parseSnippetYamlOffline(testYaml);
        expect(result.pages[0].widgets.length).toBe(7);
    });

    it('should correctly parse text widget with color prop', () => {
        const result = parseSnippetYamlOffline(testYaml);
        const textWidget = result.pages[0].widgets.find(w => w.type === 'text');
        
        expect(textWidget).toBeDefined();
        expect(textWidget.x).toBe(473);
        expect(textWidget.y).toBe(96);
        expect(textWidget.props.text).toBe('Hello World');
        expect(textWidget.props.color).toBe('black');
    });

    it('should correctly parse line widget', () => {
        const result = parseSnippetYamlOffline(testYaml);
        const lineWidget = result.pages[0].widgets.find(w => w.type === 'line');
        
        expect(lineWidget).toBeDefined();
        expect(lineWidget.x).toBe(413);
        expect(lineWidget.y).toBe(271);
    });

    it('should correctly parse rectangle widget', () => {
        const result = parseSnippetYamlOffline(testYaml);
        const rectWidget = result.pages[0].widgets.find(w => w.type === 'shape_rect');
        
        expect(rectWidget).toBeDefined();
        expect(rectWidget.x).toBe(97);
        expect(rectWidget.y).toBe(230);
        expect(rectWidget.width).toBe(90);   // 187 - 97
        expect(rectWidget.height).toBe(40);  // 270 - 230
    });

    it('should correctly parse circle widget', () => {
        const result = parseSnippetYamlOffline(testYaml);
        const circleWidget = result.pages[0].widgets.find(w => w.type === 'shape_circle');
        
        expect(circleWidget).toBeDefined();
        expect(circleWidget.x).toBe(352);  // 372 - 20
        expect(circleWidget.y).toBe(226);  // 246 - 20
    });

    it('should correctly parse icon widget with large size', () => {
        const result = parseSnippetYamlOffline(testYaml);
        const iconWidget = result.pages[0].widgets.find(w => w.type === 'icon');
        
        expect(iconWidget).toBeDefined();
        expect(iconWidget.x).toBe(285);
        expect(iconWidget.y).toBe(293);
        expect(iconWidget.props.size).toBe(120);
        expect(iconWidget.props.code).toBe('mdi:home');
    });

    it('should correctly parse qrcode widget', () => {
        const result = parseSnippetYamlOffline(testYaml);
        const qrWidget = result.pages[0].widgets.find(w => w.type === 'qr_code');
        
        expect(qrWidget).toBeDefined();
        expect(qrWidget.props.value).toBe('https://opendisplay.org');
    });

    it('should correctly parse progress_bar widget', () => {
        const result = parseSnippetYamlOffline(testYaml);
        const progressWidget = result.pages[0].widgets.find(w => w.type === 'progress_bar');
        
        expect(progressWidget).toBeDefined();
        expect(progressWidget.x).toBe(402);
        expect(progressWidget.y).toBe(174);
        expect(progressWidget.width).toBe(270);  // 672 - 402
    });
});
