var fse = require('fs-extra');

var insertPackages = function(paths){

    var mainFile = fse.readFileSync(paths.mainFilePath, 'utf-8');
    var packages = fse.readFileSync(paths.packages + 'placeholders/dummy_content.js', 'utf-8');

    mainFile = mainFile.replace('{{packages}}', packages);

    fse.writeFileSync(paths.mainFilePath, mainFile, 'utf-8');

};

module.exports = insertPackages;