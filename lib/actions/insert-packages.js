var fse = require('fs-extra');

var insertPackages = function(paths){

    var config = JSON.parse(fse.readFileSync(paths.config + 'build.config'));
    var mainFilePath = paths.root + config.mainLibPath + config.mainLibName;
    var mainFile = fse.readFileSync(mainFilePath, 'utf-8');
    var packages = fse.readFileSync(paths.packages + 'dummy_content.js', 'utf-8');

    mainFile = mainFile.replace('{{packages}}', packages);

    fse.writeFileSync(mainFilePath, mainFile, 'utf-8');

};

module.exports = insertPackages;