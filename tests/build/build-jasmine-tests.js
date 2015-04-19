var fse = require('fs-extra');
var _ = require('lodash');

var rootPath = './../../';
var configPath = rootPath + 'config/';
var testsPath = rootPath + 'tests/';
var options = process.argv;
var isVerbose = options.indexOf('--verbose') > -1;
var Radar = require(rootPath + 'utils/Radar');

var buildPlan = function() {

    var testingFrameworkName = 'jasmine';
    var testingFrameworkDirectory = rootPath + 'ephemeral/build/tests/' + testingFrameworkName + '/browser/';
    var mochaBrowserDirectory = './' + testingFrameworkName + '/browser/';

    if (!fse.existsSync(testingFrameworkDirectory)) {
        fse.mkdirsSync(testingFrameworkDirectory);
    }

    var mainFile = fse.readFileSync(mochaBrowserDirectory + 'index.html', 'utf-8');
    var testsLinks = ['../../../../../lib/resources/amd-loader-definition.js', '../../../../../tests/jasmine_tests.js'];
    var testsScriptTags = _.map(testsLinks, function(link){
        return '<script src="' + link + '"></script>';
    });

    mainFile = mainFile.replace('{{tests}}', testsScriptTags.join('\n'));

    fse.writeFileSync(testingFrameworkDirectory + 'index.html', mainFile, 'utf-8');
    fse.copySync(mochaBrowserDirectory + 'jasmine.js', testingFrameworkDirectory + 'jasmine.js');
    fse.copySync(mochaBrowserDirectory + 'jasmine-html.js', testingFrameworkDirectory + 'jasmine-html.js');
    fse.copySync(mochaBrowserDirectory + 'expect.js', testingFrameworkDirectory + 'expect.js');
    fse.copySync(mochaBrowserDirectory + 'jasmine.css', testingFrameworkDirectory + 'jasmine.css');

    console.log('BUILDING STATUS:::::::::::::: SUCCESS');

};

var executeBuildingPlan = function() {

    try {

        var radar = new Radar();

        radar.start();

        buildPlan.call(this, arguments);

        radar.end('Build Jasmine');

    } catch (err) {

        console.log('::::::::::::::Build FAILED:');
        console.log(err);

        if (isVerbose) {
            console.trace();
        }

    }

};


executeBuildingPlan();