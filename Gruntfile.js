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
      mocha:{
        src:['tests/unit/**/*.js'],
        dest:'ephemeral/tests/demo/tests.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('build:tests:mocha', ['concat:mocha']);
  grunt.registerTask('build:tests:jasmine', ['concat:mocha']);
  grunt.registerTask('build:tests:qunit', ['concat:mocha']);
  grunt.registerTask('default', ['babel']);

};