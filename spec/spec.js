const semver = require('semver');
const packageVersion = require('../package.json').version;
const apiVersion = require("../index").version;
const schemas = require("../index").schemas;

describe("Should return correct api version", function() {
    if (semver.patch(packageVersion) === 0) {
        it("for patch x.y.0", function() {
            expect(apiVersion === packageVersion).toBeTruthy();
        });
    } else {
        it("for patch x.y.z", function() {
            expect(semver.patch(apiVersion) === 0).toBeTruthy();
        });
    }
});

describe("Should return schema", function() {

    it("of capabilities", function() {
        expect(schemas.capabilities).toBeDefined();
    });
    it("of pbiviz", function() {
        expect(schemas.pbiviz).toBeDefined();
    });
    it("of dependencies", function() {
        expect(schemas.dependencies).toBeDefined();
    });
    it("of stringResources", function() {
        expect(schemas.stringResources).toBeDefined();
    });
});