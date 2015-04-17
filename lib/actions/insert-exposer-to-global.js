var fse = require('fs-extra');

var insertExposer = function(paths){

    var config = JSON.parse(fse.readFileSync(paths.config + 'build.config'));
    var mainFilePath = paths.root + config.mainLibPath + config.mainLibName;
    var mainFile = fse.readFileSync(mainFilePath, 'utf-8');
    var exposer = fse.readFileSync(paths.resources + 'expose-to-global-namespace.js', 'utf-8');

    mainFile = mainFile.replace('{{exposeToGlobalNamespace}}', exposer);

    fse.writeFileSync(mainFilePath, mainFile, 'utf-8');

};

module.exports = insertExposer;