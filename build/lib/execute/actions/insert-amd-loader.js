var fse = require('fs-extra');

var insertAmdLoader = function(paths){

    var mainFile = fse.readFileSync(paths.mainFilePath, 'utf-8');
    var amdLoader = fse.readFileSync(paths.root + 'bower_components/nucleo-amd/nucleo-amd.min.js', 'utf-8');

    mainFile = mainFile.replace('{{amdLoaderDefinition}}', amdLoader);

    fse.writeFileSync(paths.mainFilePath, mainFile, 'utf-8');

};

module.exports = insertAmdLoader;