module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    "babel": {
      options: {
       	modules:'amdStrict'
      },
      dist: {
        files: {
	"dist/app.js": "src/app.js",
	"dist/nume.js":"src/nume.js",
	"dist/adunare.js":"src/calcule/adunare.js",
	"dist/scadere.js":"src/calcule/scadere.js"
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-babel');

  // Default task(s).
  grunt.registerTask('default', ['babel']);

};
