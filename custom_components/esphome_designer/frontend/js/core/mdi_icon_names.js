/* istanbul ignore file */
/* c8 ignore start */

import { mdiIconCatalog } from './mdi_icon_catalog.js';

export const mdiIconNamesByCode = Object.freeze(
    Object.fromEntries(mdiIconCatalog.map((icon) => [icon.code, icon.name]))
);

export const mdiIconCodesByName = Object.freeze(
    Object.fromEntries(mdiIconCatalog.map((icon) => [icon.name, icon.code]))
);

/* c8 ignore stop */
