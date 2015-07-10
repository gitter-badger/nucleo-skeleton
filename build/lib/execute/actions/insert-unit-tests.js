var fse = require('fs-extra');

var insertUnitTests = function(paths){

    var mainFile = fse.readFileSync(paths.mainFilePath, 'utf-8');
    var tests = fse.readFileSync(paths.tests + 'unit/amd_tests.js', 'utf-8');

    mainFile = mainFile.replace('{{tests}}', '');

    fse.writeFileSync(paths.mainFilePath, mainFile, 'utf-8');

};

module.exports = insertUnitTests;