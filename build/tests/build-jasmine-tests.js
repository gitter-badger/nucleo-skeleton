var buildTests = require('./TestsBuilder');

var options = process.argv;
var isVerbose = options.indexOf('--verbose') > -1;

var config = {
    framework: 'jasmine',
    environment: 'browser',
    html: 'index.html',
    sources: ['build/lib/resources/amd-loader-definition.js'],
    tests: ['tests/jasmine_tests.js'],
    resources: [
        'jasmine.js',
        'jasmine-html.js',
        'expect.js',
        'jasmine.css'
    ],
    verbose: isVerbose
};

buildTests(config);