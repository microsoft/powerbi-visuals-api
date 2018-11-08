const semver = require('semver');

let packageVersion = require('./package.json').version;
let apiVersion = `${semver.major(packageVersion)}.${semver.minor(packageVersion)}.0`;

exports.version = apiVersion;

exports.schemas = {
    capabilities: require(`./schema.capabilities.json`),
    pbiviz: require(`./schema.pbiviz.json`),
    dependencies: require(`./schema.dependencies.json`),
    stringResources: require(`./schema.stringResources.json`)
};