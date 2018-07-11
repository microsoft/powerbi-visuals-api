const MAJOR = 1;
const MINOR = 13;
const PATCH = 0;

exports.version = `${MAJOR}.${MINOR}.${PATCH}`;

exports.MAJOR = MAJOR;
exports.MINOR = MINOR;
exports.PATCH = PATCH;

exports.schemas = {
    stringResources: require('./schema.stringResources.json'),
    capabilitiesSchema: require(`./schema.capabilities.json`),
    pbivizSchema: require(`./schema.pbiviz.json`),
    dependenciesSchema: require(`./schema.dependencies.json`),
    stringResourcesSchema: require(`./schema.stringResources.json`)
};