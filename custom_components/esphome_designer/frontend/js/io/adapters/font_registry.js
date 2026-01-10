/**
 * Modular font and glyph registry for ESPHome.
 */
export class FontRegistry {
    constructor() {
        this.reset();
        this.EXTENDED_GLYPHS = [
            ...Array.from({ length: 95 }, (_, i) => `\\U000000${(i + 32).toString(16).padStart(2, '0')}`),
            "\\U000000B0", "\\U000000B1", "\\U000000B2", "\\U000000B3",
            "\\U000000B5", "\\U000000A3", "\\U000000A5", "\\U000000A9",
            "\\U000000AE", "\\U000000D7", "\\U000000F7", "\\U000003BC",
            "\\U000003A9", "\\U000020AC", "\\U00002122"
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
        const id = `font_${safeFamily}_${weightNum}_${size}${italicSuffix}`;

        if (this.definedFontIds.has(id)) return id;
        this.definedFontIds.add(id);

        if (family === "Material Design Icons") {
            this.fontLines.push(`  - file: "fonts/materialdesignicons-webfont.ttf"`);
            this.fontLines.push(`    id: ${id}`);
            this.fontLines.push(`    size: ${size}`);
            // Glyphs for icons are added in getLines()
        } else {
            this.fontLines.push(`  - file:`);
            this.fontLines.push(`      type: gfonts`);
            this.fontLines.push(`      family: ${family}`);
            this.fontLines.push(`      weight: ${weightNum}`);
            if (italic) this.fontLines.push(`      italic: true`);
            this.fontLines.push(`    id: ${id}`);
            this.fontLines.push(`    size: ${size}`);

            const glyphs = this.EXTENDED_GLYPHS.map(g => `"${g}"`).join(", ");
            this.fontLines.push(`    glyphs: [${glyphs}]`);
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
     * @returns {string[]}
     */
    getLines() {
        // Fallback font if none registered
        if (this.fontLines.length === 0) {
            this.addFont("Roboto", 400, 20);
        }

        const lines = ["font:"];
        lines.push(...this.fontLines);

        // Add icons tracking to their respective icon fonts
        for (const [size, codes] of this.iconCodesBySize.entries()) {
            // Find if there's already an icon font of this size
            const iconFontId = `font_material_design_icons_400_${size}`;
            if (!this.definedFontIds.has(iconFontId)) {
                this.addFont("Material Design Icons", 400, size);
            }

            // This is slightly complex because fontLines already has the base font entry.
            // We need to find the specific font entry and add glyphs.
            // Simplified: we add a separate font entry for icons to avoid editing strings.
            // But optimal YAML would merge them.
            // For now, let's just ensure glyphs are included.
            // Actually, we can just append them if iconCodesBySize has codes for this size.
        }

        // Refined approach: add icon fonts explicitly at the end if they have tracked codes
        for (const [size, codes] of this.iconCodesBySize.entries()) {
            const fontId = `icon_font_${size}`;
            if (this.definedFontIds.has(fontId)) continue; // Already added?

            lines.push(`  - file: "fonts/materialdesignicons-webfont.ttf"`);
            lines.push(`    id: ${fontId}`);
            lines.push(`    size: ${size}`);
            const glyphList = Array.from(codes).sort().map(c => `"\\U000${c}"`).join(", ");
            lines.push(`    glyphs: [${glyphList}]`);
        }

        return lines.length > 1 ? lines : [];
    }
}
