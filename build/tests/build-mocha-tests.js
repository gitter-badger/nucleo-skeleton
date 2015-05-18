var buildTests = require('./TestsBuilder');

var options = process.argv;
var isVerbose = options.indexOf('--verbose') > -1;

var config = {
    framework: 'mocha',
    environment: 'browser',
    html: 'index.html',
    sources: ['build/lib/resources/amd-loader-definition.js'],
    tests: ['tests/mocha_tests.js'],
    resources: [
        'mocha.js',
        'expect.js',
        'mocha.css'
    ],
    verbose: isVerbose
};

buildTests(config);