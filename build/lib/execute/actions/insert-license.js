var fse = require('fs-extra');

var insertLicense = function(paths){

    var package = JSON.parse(fse.readFileSync(paths.root + 'package.json', 'utf-8'));
    var mainFile = fse.readFileSync(paths.mainFilePath, 'utf-8');
    var license = fse.readFileSync(paths.resources + 'license.txt', 'utf-8');

    license = license.replace('FRAMEWORK_NAME_PLACEHOLDER', package.name)
                        .replace('FRAMEWORK_URL_LICENSE', package.homepage)
                        .replace('VERSION_STRING_PLACEHOLDER', package.version);

    mainFile = mainFile.replace('{{License}}', license);

    fse.writeFileSync(paths.mainFilePath, mainFile, 'utf-8');

};

module.exports = insertLicense;