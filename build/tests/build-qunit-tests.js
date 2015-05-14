var fse = require('fs-extra');

var rootPath = './../../';
var configPath = rootPath + 'config/';
var testsPath = rootPath + 'tests/';
var options = process.argv;
var isVerbose = options.indexOf('--verbose') > -1;
var Radar = require(rootPath + 'build/utils/Radar');

var buildPlan = function() {

    var testingFrameworkDirectory = rootPath + 'ephemeral/build/tests/qunit/';

    if (!fse.existsSync(testingFrameworkDirectory)) {
        fse.mkdirsSync(testingFrameworkDirectory);
    }

    var mainFile = fse.readFileSync('./qunit/index.html', 'utf-8');
    var testsLink = './../../build/main.js';
    var testsScriptTag = '<script src="' + testsLink + '"></script>';

    mainFile = mainFile.replace('{{tests}}', testsScriptTag);

    fse.writeFileSync(testingFrameworkDirectory + 'index.html', mainFile, 'utf-8');
    fse.copySync('./qunit/qunit.js', testingFrameworkDirectory + 'qunit.js');
    fse.copySync('./qunit/qunit-notifications.js', testingFrameworkDirectory + 'qunit-notifications.js');
    fse.copySync('./qunit/qunit.css', testingFrameworkDirectory + 'qunit.css');

    console.log('BUILDING STATUS:::::::::::::: SUCCESS');

};

var executeBuildingPlan = function() {

    try {

        var radar = new Radar();

        radar.start();

        buildPlan.call(this, arguments);

        radar.end('Build QUnit');

    } catch (err) {

        console.log('::::::::::::::Build FAILED:');
        console.log(err);

        if (isVerbose) {
            console.trace();
        }

    }

};


executeBuildingPlan();