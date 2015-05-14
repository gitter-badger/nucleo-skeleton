var fse = require('fs-extra');

var insertLicense = function(paths){

    var config = JSON.parse(fse.readFileSync(paths.config + 'build.config'));
    var mainFilePath = paths.root + config.mainLibPath + config.mainLibName;
    var package = JSON.parse(fse.readFileSync(paths.root + 'package.json', 'utf-8'));
    var mainFile = fse.readFileSync(mainFilePath, 'utf-8');
    var license = fse.readFileSync(paths.resources + 'license.txt', 'utf-8');

    license = license.replace('FRAMEWORK_NAME_PLACEHOLDER', config.name)
                        .replace('FRAMEWORK_URL_LICENSE', config.url_license)
                        .replace('VERSION_STRING_PLACEHOLDER', package.version);

    mainFile = mainFile.replace('{{License}}', license);

    fse.writeFileSync(mainFilePath, mainFile, 'utf-8');

};

module.exports = insertLicense;