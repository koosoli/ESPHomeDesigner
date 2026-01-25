/**
 * Modular font and glyph registry for ESPHome.
 */
export class FontRegistry {
    constructor() {
        this.reset();
        this.EXTENDED_GLYPHS = [
            ...Array.from({ length: 95 }, (_, i) => `\\U000000${(i + 32).toString(16).toUpperCase().padStart(2, '0')}`),
            // Latin-1 Supplement (A0-FF) - Includes German Umlauts, accented characters, etc.
            ...Array.from({ length: 96 }, (_, i) => `\\U000000${(i + 160).toString(16).toUpperCase().padStart(2, '0')}`),
            "\\U000003BC", "\\U000003A9", "\\U000020AC", "\\U00002122"
        ];
    }

    reset() {
        /** @type {Set<string>} */
        this.definedFontIds = new Set();
        /** @type {string[]} */
        this.fontLines = [];
        /** @type {Map<number, Set<string>>} */
        this.iconCodesBySize = new Map();
    }

    /**
     * Registers a font and returns its ID.
     * @param {string} family 
     * @param {string|number} weight 
     * @param {number} size 
     * @param {boolean} italic 
     * @returns {string} 
     */
    addFont(family, weight, size, italic = false) {
        const safeFamily = family.replace(/\s+/g, "_").toLowerCase();
        const weightNum = parseInt(weight) || 400;
        const italicSuffix = italic ? "_italic" : "";
        const idSize = String(size).replace(".", "_");
        const id = `font_${safeFamily}_${weightNum}_${idSize}${italicSuffix}`;

        if (this.definedFontIds.has(id)) return id;
        this.definedFontIds.add(id);

        if (family === "Material Design Icons") {
            // We just register the ID, glyphs are handled in getLines()
        } else {
            const fontDef = {
                id,
                file: {
                    type: "gfonts",
                    family: family,
                    weight: weightNum,
                    italic: italic
                },
                size: size,
                glyphs: [...this.EXTENDED_GLYPHS]
            };
            this.fontLines.push(fontDef);
        }

        return id;
    }

    /**
     * Tracks an icon by its name and size.
     * @param {string} iconName 
     * @param {number} size 
     */
    trackIcon(iconName, size) {
        if (!iconName) return;
        const sizeInt = parseInt(size, 10);
        if (!this.iconCodesBySize.has(sizeInt)) {
            this.iconCodesBySize.set(sizeInt, new Set());
        }

        // Handle both raw hex codes (from plugins) and icon names (from UI)
        let code = iconName;
        if (!/^F[0-9A-F]{4}$/i.test(iconName)) {
            code = window.Utils ? window.Utils.getIconCode(iconName) : null;
        } else {
            code = iconName.toUpperCase();
        }

        if (code) {
            this.iconCodesBySize.get(sizeInt).add(code);
        }
    }

    /**
     * Generates the font section lines for the YAML.
     *  @param {string[]} glyphsets
     *  @param {boolean} includeExtendedLatin
     * @returns {string[]}
     */
    getLines(glyphsets = [], includeExtendedLatin = false) {
        // Fallback font if none registered
        if (this.definedFontIds.size === 0) {
            this.addFont("Roboto", 400, 20);
        }

        const lines = ["font:"];

        // 1. Regular Fonts
        this.fontLines.forEach(f => {
            lines.push(`  - file:`);
            lines.push(`      type: ${f.file.type}`);
            lines.push(`      family: "${f.file.family}"`);
            lines.push(`      weight: ${f.file.weight}`);
            lines.push(`      italic: ${f.file.italic ? 'true' : 'false'}`);
            lines.push(`    id: ${f.id}`);
            lines.push(`    size: ${Math.round(f.size)}`);
            if (glyphsets && glyphsets.length > 0) {
                const sets = glyphsets.join(", ");
                lines.push(`    glyphsets: [${sets}]`);
                // Suppress warnings for glyphs in glyphsets that the font doesn't have
                // (e.g., soft hyphen U+00AD in GF_Latin_Core missing from Inter font)
                lines.push(`    ignore_missing_glyphs: true`);
            }

            // Only include manual extended glyphs if explicitly requested or if no glyphsets
            if (includeExtendedLatin || (!glyphsets || glyphsets.length === 0)) {
                const glyphs = f.glyphs.map(g => `"${g}"`).join(", ");
                lines.push(`    glyphs: [${glyphs}]`);
            }
        });

        // 2. Icon Fonts - Corrected to use the expected IDs
        for (const [size, codes] of this.iconCodesBySize.entries()) {
            const fontId = `font_material_design_icons_400_${size}`;

            lines.push(`  - file: "fonts/materialdesignicons-webfont.ttf"`);
            lines.push(`    id: ${fontId}`);
            lines.push(`    size: ${size}`);
            const glyphList = Array.from(codes).sort().map(c => `"\\U000${c}"`).join(", ");
            lines.push(`    glyphs: [${glyphList}]`);
        }

        return lines.length > 1 ? lines : [];
    }
}
