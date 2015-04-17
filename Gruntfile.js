module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    "babel": {
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
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-babel');

  // Default task(s).
  grunt.registerTask('default', ['babel']);

};