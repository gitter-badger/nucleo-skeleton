var fse = require('fs-extra');

var options = process.argv;
var isVerbose = options.indexOf('--verbose') > -1;

var Radar;

var makeGlobals = function(){

    rootPath = './../../../';
    actionsPath = './actions/';
    resourcesPath = './../resources/';
    testsPath = rootPath + 'tests/';
    packagesPath = rootPath + 'packages/';
    mainLibPath = 'ephemeral/build/';
    mainLibName = 'main.js';
    blueprintPath = './../blueprint.tmpl';

    mainLibDirectory = rootPath + mainLibPath;
    mainLibFile = mainLibDirectory + mainLibName;
    paths = {
        root: rootPath,
        mainFilePath: mainLibFile,
        resources: resourcesPath,
        packages: packagesPath,
        tests: testsPath
    };
    actionsConfig = {
        cwd: actionsPath,
        paths: paths, 
        files:[
            'insert-license',
            'insert-amd-loader',
            'insert-packages'
        ]
    };

};

var loadRadar = function(){

    Radar = require(rootPath + 'build/utils/Radar');

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

var executeInsertActions = function(config){

    var actions = {};

    for (var i = 0; i < config.files.length; i++) {

        var actionName = config.files[i];

        actions[actionName] = require(config.cwd + actionName);

        actions[actionName].call(this, config.paths);

    }

};

var copyBlueprint = function(){

    if (!fse.existsSync(mainLibDirectory)) {
        fse.mkdirsSync(mainLibDirectory);
    }

    fse.copySync(blueprintPath, mainLibFile);

};

var buildPlan = function() {

    copyBlueprint();

    executeInsertActions(actionsConfig);

    validateBuildProcessFinishedSuccessfully(mainLibDirectory, mainLibFile);

};

var executeBuildingPlan = function() {

    try {

        makeGlobals();
        loadRadar();

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