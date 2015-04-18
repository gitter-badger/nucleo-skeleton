var rootPath = './../../';
var configPath = rootPath + 'config/';
var actionsPath = './../actions/';
var resourcesPath = './../resources/';
var testsPath = rootPath + 'tests/';
var packagesPath = rootPath + 'packages/';
var options = process.argv;
var isVerbose = options.indexOf('--verbose') > -1;

var fse = require('fs-extra');
var insertLicense = require(actionsPath + 'insert-license');
var insertAmdLoader = require(actionsPath + 'insert-amd-loader');
var insertPackages = require(actionsPath + 'insert-packages');
var insertUnitTests = require(actionsPath + 'insert-unit-tests');
var insertExposer = require(actionsPath + 'insert-exposer-to-global');
var Radar = require(rootPath + 'utils/Radar');


var buildPlan = function() {

    var config = JSON.parse(fse.readFileSync(configPath + 'build.config'));
    var mainLibDirectory = rootPath + config.mainLibPath;
    var mainLibFile = mainLibDirectory + config.mainLibName;
    var paths = {
        root: rootPath,
        config: configPath,
        mainLib: mainLibDirectory,
        resources: resourcesPath,
        packages: packagesPath,
        tests: testsPath
    };

    if (!fse.existsSync(mainLibDirectory)) {
        fse.mkdirsSync(mainLibDirectory);
    }

    fse.copySync('./../blueprint.tmpl', mainLibFile);

    insertLicense(paths);
    insertAmdLoader(paths);
    insertPackages(paths);
    insertUnitTests(paths);
    insertExposer(paths);

    validateBuildProcessFinishedSuccessfully(config, mainLibDirectory, mainLibFile);

};

var validateBuildProcessFinishedSuccessfully = function(config, mainLibDirectory, mainLibFile) {

    console.log('BUILDING STATUS:::::::::::::: SUCCESS');

    if (!isVerbose) {
        return;
    }

    console.log('CONFIG:');
    console.log(config);

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