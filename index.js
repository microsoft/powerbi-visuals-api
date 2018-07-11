exports.version = require('./package.json').version;

exports.schemas = {
    capabilities: require(`./schema.capabilities.json`),
    pbiviz: require(`./schema.pbiviz.json`),
    dependencies: require(`./schema.dependencies.json`),
    stringResources: require(`./schema.stringResources.json`)
};