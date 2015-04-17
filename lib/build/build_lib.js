var fse = require('fs-extra');
var rootPath = './../../';
var options = process.argv;
var isVerbose = options.indexOf('--verbose') > -1;


var buildPlan = function(){

    var config = JSON.parse(fse.readFileSync(rootPath + 'config/build.config'));
    var mainLibDirectory = rootPath + config.mainLibPath;

    if(! fse.existsSync(mainLibDirectory)) {
        fse.mkdirsSync(mainLibDirectory);
    }

    fse.copySync('./../blueprint.tmpl', mainLibDirectory + config.mainLibName);

    validateBuildProcessFinishedSuccessfully(config, mainLibDirectory);

};

var validateBuildProcessFinishedSuccessfully = function(config, mainLibDirectory){

    console.log('BUILDING STATUS: success');

    if(!isVerbose){
        return;
    }

    console.log('CONFIG:');
    console.log(config);

    console.log('MainLib Directory exists: ', fse.existsSync(mainLibDirectory));
    console.log('MainLib File exists: ', fse.existsSync(mainLibDirectory + config.mainLibName));

};

var executeBuildingPlan = function(){

    try {

        buildPlan.call(this, arguments);

    } catch(err) {

        console.log('Build FAILED:');
        console.log(err);

        if(isVerbose){
            console.trace();
        }

    }

};


executeBuildingPlan();