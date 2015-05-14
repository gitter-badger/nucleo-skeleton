var fse = require('fs-extra');

var insertExposer = function(paths){

    var mainFile = fse.readFileSync(paths.mainFilePath, 'utf-8');
    var exposer = fse.readFileSync(paths.resources + 'expose-to-global-namespace.js', 'utf-8');

    mainFile = mainFile.replace('{{exposeToGlobalNamespace}}', exposer);

    fse.writeFileSync(paths.mainFilePath, mainFile, 'utf-8');

};

module.exports = insertExposer;