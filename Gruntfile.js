module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    "babel": {
      options: {
       	modules:'amdStrict',
	moduleIds:true
      },
      dist: {
	files:[{
		"expand":true,
		"cwd": "src",
		"src":["**/*.js"],
		"dest":"dist",
		"ext":".js"
	}]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-babel');

  // Default task(s).
  grunt.registerTask('default', ['babel']);

};
