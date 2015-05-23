var config = {
    framework: 'qunit',
    sources: ['build/lib/resources/amd-loader-definition.js'],
    tests: ['tests/demo-structure/qunit_tests.js'],
    resources: [
        'qunit.js',
        'qunit-notifications.js',
        'qunit.css'
    ]
};

module.exports = config;