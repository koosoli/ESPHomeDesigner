#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const ROOT = path.join(__dirname, '..');
const INTEGRATION_DIR = path.join(ROOT, 'custom_components', 'esphome_designer');
const CONST_PATH = path.join(INTEGRATION_DIR, 'const.py');
const MANIFEST_PATH = path.join(INTEGRATION_DIR, 'manifest.json');
const STRINGS_PATH = path.join(INTEGRATION_DIR, 'strings.json');
const SERVICES_PY_PATH = path.join(INTEGRATION_DIR, 'services.py');
const SERVICES_YAML_PATH = path.join(INTEGRATION_DIR, 'services.yaml');

function readText(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

function readJson(filePath) {
    return JSON.parse(readText(filePath));
}

function formatList(values) {
    return [...values].sort().join(', ');
}

function toConstName(serviceName) {
    return `SERVICE_${serviceName.replace(/[^a-z0-9]+/gi, '_').toUpperCase()}`;
}

function parsePythonConstants(source) {
    const constants = new Map();
    const regex = /^([A-Z_]+)\s*=\s*["']([^"']+)["']$/gm;
    let match;
    while ((match = regex.exec(source)) !== null) {
        constants.set(match[1], match[2]);
    }
    return constants;
}

function resolveToken(rawToken, constants) {
    if (!rawToken) return null;
    const token = rawToken.trim();
    if ((token.startsWith('"') && token.endsWith('"')) || (token.startsWith("'") && token.endsWith("'"))) {
        return token.slice(1, -1);
    }
    return constants.get(token) || token;
}

function parseHandlerFields(source, constants) {
    const handlers = new Map();
    const regex = /async def _handle_([a-z0-9_]+)\([^)]*\)\s*->\s*None:\n([\s\S]*?)(?=\n\nasync def _handle_|\n\ndef async_register_services|$)/gi;
    let match;
    while ((match = regex.exec(source)) !== null) {
        const serviceName = match[1];
        const body = match[2];
        const fields = new Set();
        const fieldRegex = /call\.data\[((?:[A-Z_]+)|(?:"[^"]+")|(?:'[^']+'))\]/g;
        let fieldMatch;
        while ((fieldMatch = fieldRegex.exec(body)) !== null) {
            const fieldName = resolveToken(fieldMatch[1], constants);
            if (fieldName) fields.add(fieldName);
        }
        handlers.set(serviceName, fields);
    }
    return handlers;
}

function parseRegistrationFields(source, constants) {
    const baseSchemaFields = new Set();
    const baseSchemaMatch = source.match(/base_schema\s*=\s*vol\.Schema\(\s*\{([\s\S]*?)\}\s*\)/m);
    if (baseSchemaMatch) {
        const requiredRegex = /vol\.Required\(((?:[A-Z_]+)|(?:"[^"]+")|(?:'[^']+'))\)/g;
        let requiredMatch;
        while ((requiredMatch = requiredRegex.exec(baseSchemaMatch[1])) !== null) {
            const fieldName = resolveToken(requiredMatch[1], constants);
            if (fieldName) baseSchemaFields.add(fieldName);
        }
    }

    const registrations = new Map();
    const blockRegex = /hass\.services\.async_register\(([\s\S]*?)\n\s*\)/g;
    let match;
    while ((match = blockRegex.exec(source)) !== null) {
        const block = match[1];
        const constMatch = block.match(/SERVICE_([A-Z0-9_]+)/);
        if (!constMatch) continue;

        const serviceConst = `SERVICE_${constMatch[1]}`;
        const fields = new Set(baseSchemaFields);
        const requiredRegex = /vol\.Required\(((?:[A-Z_]+)|(?:"[^"]+")|(?:'[^']+'))\)/g;
        let requiredMatch;
        while ((requiredMatch = requiredRegex.exec(block)) !== null) {
            const fieldName = resolveToken(requiredMatch[1], constants);
            if (fieldName) fields.add(fieldName);
        }
        registrations.set(serviceConst, fields);
    }
    return registrations;
}

function main() {
    const errors = [];

    const constSource = readText(CONST_PATH);
    const servicesPySource = readText(SERVICES_PY_PATH);
    const manifest = readJson(MANIFEST_PATH);
    readJson(STRINGS_PATH);
    const servicesYaml = yaml.load(readText(SERVICES_YAML_PATH)) || {};

    if (manifest.domain !== 'esphome_designer') {
        errors.push(`manifest.json domain must be esphome_designer, got ${manifest.domain || '<missing>'}`);
    }
    if (typeof manifest.version !== 'string' || manifest.version.trim() === '') {
        errors.push('manifest.json must define a non-empty version');
    }

    const constants = parsePythonConstants(constSource);
    const handlerFields = parseHandlerFields(servicesPySource, constants);
    const registrationFields = parseRegistrationFields(servicesPySource, constants);

    for (const [serviceName, serviceConfig] of Object.entries(servicesYaml)) {
        const yamlFields = new Set(Object.keys(serviceConfig?.fields || {}));
        const handlerFieldSet = handlerFields.get(serviceName) || new Set();
        const registrationFieldSet = registrationFields.get(toConstName(serviceName)) || new Set();

        if (formatList(yamlFields) !== formatList(handlerFieldSet)) {
            errors.push(
                `${serviceName}: services.yaml fields [${formatList(yamlFields)}] do not match services.py handler fields [${formatList(handlerFieldSet)}]`
            );
        }

        if (formatList(yamlFields) !== formatList(registrationFieldSet)) {
            errors.push(
                `${serviceName}: services.yaml fields [${formatList(yamlFields)}] do not match services.py schema fields [${formatList(registrationFieldSet)}]`
            );
        }
    }

    if (errors.length > 0) {
        console.error('Home Assistant integration verification failed:');
        errors.forEach((error) => console.error(`- ${error}`));
        process.exit(1);
    }

    console.log('Home Assistant integration verification passed.');
}

main();