import { describe, it, expect } from 'vitest';
import { ensureLambdaPlaceholderInDisplaySection } from '../../js/io/hardware_import.js';

describe('hardware_import placeholder normalization', () => {
  it('appends placeholder inside list-style display section', () => {
    const yaml = [
      'display:',
      '  - platform: st7789v',
      '    id: my_display',
      'font:',
      '  - file: "foo.ttf"',
    ].join('\n');

    const out = ensureLambdaPlaceholderInDisplaySection(yaml);

    expect(out).toContain('display:\n  - platform: st7789v\n    id: my_display\n    # __LAMBDA_PLACEHOLDER__\nfont:');
  });

  it('appends placeholder inside map-style display section', () => {
    const yaml = [
      'display:',
      '  platform: st7789v',
      '  id: my_display',
      'spi:',
      '  clk_pin: GPIO1',
    ].join('\n');

    const out = ensureLambdaPlaceholderInDisplaySection(yaml);

    expect(out).toContain('display:\n  platform: st7789v\n  id: my_display\n  # __LAMBDA_PLACEHOLDER__\nspi:');
  });

  it('does not duplicate placeholder when already present', () => {
    const yaml = [
      'display:',
      '  - platform: st7789v',
      '    lambda: |-',
      '      # __LAMBDA_PLACEHOLDER__',
    ].join('\n');

    const out = ensureLambdaPlaceholderInDisplaySection(yaml);

    const matches = out.match(/__LAMBDA_PLACEHOLDER__/g) || [];
    expect(matches).toHaveLength(1);
  });

  it('leaves yaml unchanged when display section is missing', () => {
    const yaml = [
      'esp32:',
      '  board: esp32dev',
      'logger:',
    ].join('\n');

    const out = ensureLambdaPlaceholderInDisplaySection(yaml);

    expect(out).toBe(yaml);
  });
});
