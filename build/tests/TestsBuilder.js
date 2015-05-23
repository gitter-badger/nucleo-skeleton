var fse = require('fs-extra');
var _ = require('lodash');

var options = process.argv;
var isVerbose = options.indexOf('--verbose') > -1;

var Radar;

var loadRadar = function(){

    Radar = require(rootPath + 'build/utils/Radar');

};

var getConfig = function(){

    var configFilename = process.argv[2];

    config = require('./' + configFilename);

    config.verbose = isVerbose;

    return config;

};

var prependPathToRoot = function(files, config){

    var path = '../../../../';
    var pathToRoot = config.environment ? path + '../' : path;

    var results = _.map(files, function(link){

        return pathToRoot + link;

    });

    return results;

};

var getScriptTags = function(links){

    var testsScriptTags = _.map(links, function(link){
        return '<script src="' + link + '"></script>';
    });

    return testsScriptTags;

};

var makeGlobals = function(config){

    rootPath = './../../';
    configPath = rootPath + 'config/';
    testsPath = rootPath + 'tests/';
    environment = config.environment || 'browser';
    testName = config.framework || 'mocha';
    destDirectory = rootPath + 'ephemeral/build/tests/' + testName + '/';
    destDirectory = config.environment ? destDirectory + environment + '/' : destDirectory;
    envDirectory = './' + testName + '/';
    envDirectory = config.environment ? envDirectory + environment +'/' : envDirectory;
    links = config.sources.concat(config.tests);

    links = prependPathToRoot(links, config);
    testsScriptTags = getScriptTags(links);

    copyConfig = {
        from: envDirectory,
        to: destDirectory,
        files:config.resources
    };

};

var copyTestingFrameworksFiles = function(config){

    for (var i = 0; i < config.files.length; i++) {

        var fileName = config.files[i];

        fse.copySync(config.from + fileName, config.to + fileName);

    }

};

var generateIndexHtml = function(config){

    if (!fse.existsSync(destDirectory)) {
        fse.mkdirsSync(destDirectory);
    }

    var mainHtmlFileName = config.html || 'index.html';
    var mainFile = fse.readFileSync(envDirectory + mainHtmlFileName, 'utf-8');

    mainFile = mainFile.replace('{{tests}}', testsScriptTags.join('\n'));

    fse.writeFileSync(destDirectory + mainHtmlFileName, mainFile, 'utf-8');

};

var buildPlan = function(config) {

    generateIndexHtml(config);

    copyTestingFrameworksFiles(copyConfig);

};

var executeBuildingPlan = function(configBuilder) {

    try {

        var config = getConfig();

        makeGlobals(config);
        loadRadar();

        var radar = new Radar();

        radar.start();

        buildPlan.call(this, arguments);

        console.log('BUILDING STATUS:::::::::::::: SUCCESS');

        radar.end('Build ' + config.framework);

    } catch (err) {

        console.log('::::::::::::::Build FAILED:');
        console.log(err);

        if (config.verbose) {
            console.trace();
        }

    }

};


executeBuildingPlan();