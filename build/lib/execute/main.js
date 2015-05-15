var rootPath = './../../../';
var actionsPath = './../actions/';
var resourcesPath = './../resources/';
var testsPath = rootPath + 'tests/';
var packagesPath = rootPath + 'packages/';
var mainLibPath = 'ephemeral/build/';
var mainLibName = 'main.js';
var options = process.argv;
var isVerbose = options.indexOf('--verbose') > -1;

var fse = require('fs-extra');
var Radar = require(rootPath + 'build/utils/Radar');

var mainLibDirectory = rootPath + mainLibPath;
var mainLibFile = mainLibDirectory + mainLibName;
var paths = {
    root: rootPath,
    mainFilePath: mainLibFile,
    resources: resourcesPath,
    packages: packagesPath,
    tests: testsPath
};
var actionsConfig = {
    cwd: actionsPath,
    paths: paths, 
    files:[
        'insert-license',
        'insert-amd-loader',
        'insert-packages',
        'insert-unit-tests',
        'insert-exposer-to-global'
    ]
};

var executeInsertActions = function(config){

    var actions = {};

    for (var i = 0; i < config.files.length; i++) {

        var actionName = config.files[i];

        actions[actionName] = require(config.cwd + actionName);

        actions[actionName].call(this, config.paths);

    }

};

var buildPlan = function() {

    if (!fse.existsSync(mainLibDirectory)) {
        fse.mkdirsSync(mainLibDirectory);
    }

    fse.copySync('./../blueprint.tmpl', mainLibFile);

    executeInsertActions(actionsConfig);

    validateBuildProcessFinishedSuccessfully(mainLibDirectory, mainLibFile);

};

var validateBuildProcessFinishedSuccessfully = function(mainLibDirectory, mainLibFile) {

    console.log('BUILDING STATUS:::::::::::::: SUCCESS');

    if (!isVerbose) {
        return;
    }

    console.log('MainLib Directory exists: ', fse.existsSync(mainLibDirectory));
    console.log('MainLib File exists: ', fse.existsSync(mainLibFile));

    var mainFile = fse.readFileSync(mainLibFile, 'utf-8');

    var hasLicenseTag = mainFile.indexOf('{{License}}') > -1;
    var hasAmdDefinitionTag = mainFile.indexOf('{{amdLoaderDefinition}}') > -1;
    var hasPackagesTag = mainFile.indexOf('{{packages}}') > -1;
    var hasTestsTag = mainFile.indexOf('{{tests}}') > -1;
    var hasExposerTag = mainFile.indexOf('{{exposeToGlobalNamespace}}') > -1;

    var tagsWereReplaced = !hasExposerTag && !hasTestsTag && !hasPackagesTag && !hasLicenseTag && !hasAmdDefinitionTag;

    console.log('TAGS were replaced: ', tagsWereReplaced);

};

var executeBuildingPlan = function() {

    try {

        var radar = new Radar();

        radar.start();

        buildPlan.call(this, arguments);

        radar.end('Build Main.js');

    } catch (err) {

        console.log('::::::::::::::Build FAILED:');
        console.log(err);

        if (isVerbose) {
            console.trace();
        }

    }

};


executeBuildingPlan();