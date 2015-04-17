var fse = require('fs-extra');

var insertAmdLoader = function(paths){

    var config = JSON.parse(fse.readFileSync(paths.config + 'build.config'));
    var mainFilePath = paths.root + config.mainLibPath + config.mainLibName;
    var mainFile = fse.readFileSync(mainFilePath, 'utf-8');
    var amdLoader = fse.readFileSync(paths.resources + 'amd-loader-definition.js', 'utf-8');

    mainFile = mainFile.replace('{{amdLoaderDefinition}}', amdLoader);

    fse.writeFileSync(mainFilePath, mainFile, 'utf-8');

};

module.exports = insertAmdLoader;