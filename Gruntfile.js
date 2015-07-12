var matchdep = require('matchdep');

module.exports = function(grunt) {

  // load all grunt plugins from node_modules folder
  matchdep.filterAll('grunt-*').forEach(grunt.loadNpmTasks);

  var grunt_config = grunt.file.readJSON('grunt.config');
  grunt_config.pkg = grunt.file.readJSON('package.json');
  grunt_config.amdWrapper = grunt.file.read('build/lib/resources/amd-wrapper.js');


  grunt.initConfig(grunt_config);


  grunt.registerTask('generate_lib', ['shell:reset_tmp_folder', 'babel', 'concat:packages', 'shell:build_lib']);
  grunt.registerTask('build:lib:prod', ['generate_lib', 'uglify']);
  grunt.registerTask('build:lib:dev', ['generate_lib', 'concat:lib']);

  grunt.registerTask('default', ['build:lib:dev']);

};