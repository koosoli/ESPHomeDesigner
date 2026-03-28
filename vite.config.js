import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

const frontendRoot = resolve(__dirname, 'custom_components/esphome_designer/frontend');
const panelScopeSelector = '[data-esphome-designer-panel-root]';

function scopePanelSelector(selector) {
    let scoped = selector.trim();
    if (!scoped) {
        return scoped;
    }

    scoped = scoped
        .replace(/\bhtml\b/g, panelScopeSelector)
        .replace(/\bbody\b/g, panelScopeSelector)
        .replace(/:root/g, panelScopeSelector);

    if (scoped === panelScopeSelector || scoped.startsWith(`${panelScopeSelector} `) || scoped.startsWith(`${panelScopeSelector}.`)) {
        return scoped;
    }

    return `${panelScopeSelector} ${scoped}`;
}

function createScopedPanelCssPlugin() {
    return {
        postcssPlugin: 'esphome-designer-panel-scope',
        Once(root, { result }) {
            const from = (result.opts.from || '').replace(/\\/g, '/');
            if (!from.endsWith('/frontend/panel/panel.css')) {
                return;
            }

            root.walkRules((rule) => {
                if (!rule.selectors || rule.parent?.type === 'atrule' && rule.parent.name?.includes('keyframes')) {
                    return;
                }

                rule.selectors = rule.selectors.map(scopePanelSelector);
            });

            root.walkAtRules('font-face', (rule) => {
                rule.walkDecls('src', (decl) => {
                    decl.value = decl.value.replaceAll('../materialdesignicons-webfont.ttf', '/esphome-designer/editor/materialdesignicons-webfont.ttf');
                });
            });
        },
    };
}

createScopedPanelCssPlugin.postcss = true;

function getManualChunk(id) {
    const normalizedId = id.replace(/\\/g, '/');

    if (normalizedId.includes('/node_modules/')) {
        return 'vendor';
    }

    // Preserve async boundaries for UI that only loads on demand.
    if (
        normalizedId.includes('/frontend/js/ui/device_settings/') ||
        normalizedId.endsWith('/frontend/js/ui/device_settings.js') ||
        normalizedId.endsWith('/frontend/js/ui/page_settings.js') ||
        normalizedId.endsWith('/frontend/js/ui/llm_prompt.js') ||
        normalizedId.endsWith('/frontend/js/ui/layout_manager.js')
    ) {
        return 'deferred-ui';
    }

    // Keep YAML parsing and export code off the initial entry chunk.
    if (
        normalizedId.includes('/frontend/js/io/adapters/') ||
        normalizedId.includes('/frontend/js/io/generators/') ||
        normalizedId.includes('/frontend/js/io/yaml_') ||
        normalizedId.includes('/frontend/js/io/yaml_parsers/')
    ) {
        return 'yaml-engine';
    }

    // Group the editor shell so the HTML entry stays lightweight.
    if (
        normalizedId.includes('/frontend/js/core/') ||
        normalizedId.includes('/frontend/js/ui/')
    ) {
        return 'app-shell';
    }

    return undefined;
}

export default defineConfig({
    root: frontendRoot,
    base: './',
    resolve: {
        alias: {
            '@core': resolve(frontendRoot, 'js/core'),
            '@features': resolve(frontendRoot, 'features'),
            '@io': resolve(frontendRoot, 'js/io')
        }
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./tests/setup.js'],
        include: ['tests/**/*.test.js'],
        coverage: {
            exclude: [
                'js/data/icons.js',
                '**/js/data/icons.js',
                'custom_components/esphome_designer/frontend/js/data/icons.js',
                '**/custom_components/esphome_designer/frontend/js/data/icons.js',
                'js/lib/**/*.min.js'
            ]
        }
    },
    css: {
        postcss: {
            plugins: [createScopedPanelCssPlugin()]
        }
    },
    build: {
        target: 'esnext',
        outDir: resolve(frontendRoot, 'dist'),
        emptyOutDir: true,
        manifest: true,
        rollupOptions: {
            input: {
                main: resolve(frontendRoot, 'index.html'),
                panel: resolve(frontendRoot, 'panel/esphome-designer-panel.js'),
            },
            output: {
                manualChunks: getManualChunk,
            },
        }
    },
    server: {
        host: true,
        port: 5174,
        strictPort: true,
        open: false,
        fs: {
            allow: [__dirname]
        },
        // Proxy API requests to Home Assistant - bypasses CORS for development
        proxy: {
            '/api/esphome_designer': {
                target: 'http://haos-sandbox.local:8124',
                changeOrigin: true,
                secure: false,
            }
        }
    },
    plugins: [
        {
            name: 'image-proxy',
            configureServer(server) {
                // Image proxy middleware - handles ALL requests, filters internally
                server.middlewares.use((req, res, next) => {
                    // Only handle our specific API path
                    if (!req.url || !req.url.startsWith('/api/esphome_designer/image_proxy')) {
                        return next();
                    }

                    console.log(`[ImageProxy] Incoming: ${req.url}`);

                    try {
                        // Parse full URL to extract query params
                        const fullUrl = new URL(req.url, `http://${req.headers.host}`);
                        const imagePath = fullUrl.searchParams.get('path');

                        // Set debug header
                        res.setHeader('X-Image-Proxy', 'active');

                        if (!imagePath) {
                            console.log('[ImageProxy] Missing path parameter');
                            res.statusCode = 400;
                            res.setHeader('Content-Type', 'text/plain');
                            res.end('Missing path parameter');
                            return;
                        }

                        // Decode and normalize the path for Windows
                        let filePath = decodeURIComponent(imagePath);

                        // Handle Windows paths: convert forward slashes if needed
                        if (process.platform === 'win32') {
                            filePath = filePath.replace(/\//g, '\\');
                        }

                        console.log(`[ImageProxy] Resolved path: ${filePath}`);

                        if (!fs.existsSync(filePath)) {
                            console.log(`[ImageProxy] File not found: ${filePath}`);
                            res.statusCode = 404;
                            res.setHeader('Content-Type', 'text/plain');
                            res.end(`File not found: ${filePath}`);
                            return;
                        }

                        // Stream the file
                        console.log(`[ImageProxy] Serving: ${filePath}`);
                        const stream = fs.createReadStream(filePath);
                        stream.on('error', (err) => {
                            console.error(`[ImageProxy] Stream error: ${err}`);
                            res.statusCode = 500;
                            res.end('Read error');
                        });
                        stream.pipe(res);

                    } catch (err) {
                        console.error(`[ImageProxy] Error: ${err}`);
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'text/plain');
                        res.end(`Error: ${err.message}`);
                    }
                });
            }
        }
    ]
});
