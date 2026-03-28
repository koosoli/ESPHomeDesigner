import { describe, expect, it, vi } from 'vitest';

vi.mock('../../js/utils/logger.js', () => ({
    Logger: {
        log: vi.fn(),
        warn: vi.fn(),
        error: vi.fn()
    }
}));

import { parseSnippetYamlOffline } from '../../js/io/yaml_import.ts';

describe('yaml_import service payload parsing', () => {
    it('recovers ODP payload blocks from malformed outer YAML', () => {
        const yamlText = `service: opendisplay.drawcustom
bad: [oops
payload: |-
    - type: text
      value: "Temp: {{ states('sensor.office_temp') }} F"
      x: 10
      y: 20
      size: 18
    - type: debug_grid
      spacing: 32`;

        const layout = parseSnippetYamlOffline(yamlText);

        expect(layout?.pages[0].widgets[0]).toMatchObject({
            type: 'sensor_text',
            entity_id: 'sensor.office_temp',
            props: {
                prefix: 'Temp: ',
                postfix: ' F',
                hide_unit: true
            }
        });
        expect(layout?.pages[0].widgets[1]).toMatchObject({
            type: 'odp_debug_grid',
            props: {
                spacing: 32
            }
        });
    });

    it('re-parses full service payload strings into widget layouts', () => {
        const yamlText = `service: open_epaper_link.drawcustom
data:
  payload: |-
    - type: circle
      x: 60
      y: 70
      radius: 15
      fill: black`;

        const layout = parseSnippetYamlOffline(yamlText);

        expect(layout?.pages[0].widgets[0]).toMatchObject({
            type: 'shape_circle',
            x: 45,
            y: 55,
            width: 30,
            height: 30
        });
    });
});
