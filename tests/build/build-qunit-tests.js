var fse = require('fs-extra');

var rootPath = './../../';
var configPath = rootPath + 'config/';
var testsPath = rootPath + 'tests/';
var options = process.argv;
var isVerbose = options.indexOf('--verbose') > -1;


var buildPlan = function() {

    var qunitDirectory = rootPath + 'ephemeral/tests/qunit/';

    if (!fse.existsSync(qunitDirectory)) {
        fse.mkdirsSync(qunitDirectory);
    }

    var mainFile = fse.readFileSync('./qunit/index.html', 'utf-8');
    var testsLink = './../../build/main.js';
    var testsScriptTag = '<script src="' + testsLink + '"></script>';

    mainFile = mainFile.replace('{{tests}}', testsScriptTag);

    fse.writeFileSync(qunitDirectory + 'index.html', mainFile, 'utf-8');
    fse.copySync('./qunit/qunit.js', qunitDirectory + 'qunit.js');
    fse.copySync('./qunit/qunit.css', qunitDirectory + 'qunit.css');

    console.log('BUILDING STATUS:::::::::::::: SUCCESS');

};

var executeBuildingPlan = function() {

    try {

        buildPlan.call(this, arguments);

    } catch (err) {

        console.log('::::::::::::::Build FAILED:');
        console.log(err);

        if (isVerbose) {
            console.trace();
        }

    }

};


executeBuildingPlan();