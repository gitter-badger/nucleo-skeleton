var fse = require('fs-extra');

var insertUnitTests = function(paths){

    var config = JSON.parse(fse.readFileSync(paths.config + 'build.config'));
    var mainFilePath = paths.root + config.mainLibPath + config.mainLibName;
    var mainFile = fse.readFileSync(mainFilePath, 'utf-8');
    var tests = fse.readFileSync(paths.tests + 'demo_tests.js', 'utf-8');

    mainFile = mainFile.replace('{{tests}}', tests);

    fse.writeFileSync(mainFilePath, mainFile, 'utf-8');

};

module.exports = insertUnitTests;