var fse = require('fs-extra');
var _ = require('lodash');

var options = process.argv;
var isVerbose = options.indexOf('--verbose') > -1;

var Radar;

var loadRadar = function(){

    Radar = require(rootPath + 'build/utils/Radar');

};

var makeGlobals = function(){

    rootPath = './../../';
    configPath = rootPath + 'config/';
    testsPath = rootPath + 'tests/';
    testingFrameworkName = 'jasmine';
    testingFrameworkDirectory = rootPath + 'ephemeral/build/tests/' + testingFrameworkName + '/browser/';
    mochaBrowserDirectory = './' + testingFrameworkName + '/browser/';

    testsLinks = [
        '../../../../../lib/resources/amd-loader-definition.js',
        '../../../../../tests/jasmine_tests.js'
    ];
    testsScriptTags = _.map(testsLinks, function(link){
        return '<script src="' + link + '"></script>';
    });

    copyConfig = {
        from: mochaBrowserDirectory,
        to: testingFrameworkDirectory,
        files:[
            'jasmine.js',
            'jasmine-html.js',
            'expect.js',
            'jasmine.css'
        ]
    };

};

var copyTestingFrameworksFiles = function(config){

    for (var i = 0; i < config.files.length; i++) {

        var fileName = config.files[i];

        fse.copySync(config.from + fileName, config.to + fileName);

    }

};

var generateIndexHtml = function(){

    if (!fse.existsSync(testingFrameworkDirectory)) {
        fse.mkdirsSync(testingFrameworkDirectory);
    }

    var mainFile = fse.readFileSync(mochaBrowserDirectory + 'index.html', 'utf-8');

    mainFile = mainFile.replace('{{tests}}', testsScriptTags.join('\n'));

    fse.writeFileSync(testingFrameworkDirectory + 'index.html', mainFile, 'utf-8');

};

var buildPlan = function() {

    generateIndexHtml();

    copyTestingFrameworksFiles(copyConfig);

};

var executeBuildingPlan = function() {

    try {

        makeGlobals();
        loadRadar();

        var radar = new Radar();

        radar.start();

        buildPlan.call(this, arguments);

        console.log('BUILDING STATUS:::::::::::::: SUCCESS');

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