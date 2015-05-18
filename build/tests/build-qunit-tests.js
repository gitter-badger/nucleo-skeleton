var buildTests = require('./TestsBuilder');

var options = process.argv;
var isVerbose = options.indexOf('--verbose') > -1;

var config = {
    framework: 'qunit',
    sources: ['build/lib/resources/amd-loader-definition.js'],
    tests: ['tests/qunit_tests.js'],
    resources: [
        'qunit.js',
        'qunit-notifications.js',
        'qunit.css'
    ],
    verbose: isVerbose
};

buildTests(config);