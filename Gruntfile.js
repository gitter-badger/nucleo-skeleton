module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    babel: {
      options: {
        modules: 'amdStrict',
        moduleIds: true
      },
      dist: {
        files: [{
          "expand": true,
          "cwd": "packages/demo",
          "src": ["**/*.js"],
          "dest": "ephemeral/packages",
          "ext": ".js"
       }]
      }
    },
    concat:{
      qunit:{
        src:['tests/unit/amd/**/*.js'],
        dest:'ephemeral/tests/demo/tests.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('build:tests:mocha', ['concat:qunit']);
  grunt.registerTask('build:tests:jasmine', ['concat:qunit']);
  grunt.registerTask('build:tests:qunit', ['concat:qunit']);
  grunt.registerTask('default', ['babel']);

};