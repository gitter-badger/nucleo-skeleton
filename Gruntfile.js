var matchdep = require('matchdep');

module.exports = function(grunt) {

  // load all grunt plugins from node_modules folder
  matchdep.filterAll('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    amdWrapper: grunt.file.read('build/lib/resources/amd-wrapper.js'),
    babel: {
      options: {
        modules: 'amdStrict',
        blacklist: ['useStrict'], // put use strict only once on top of the file...not inside each function
        moduleIds: true
      },
      dist: {
        files: [{
          "expand": true,
          "cwd": "packages",
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
      },
      packages:{
        options: {
          banner: '<%= amdWrapper %>',
          footer: 'mainContext.<%= pkg.namespaces[0] %> = mainContext.<%= pkg.namespaces[1] %> = requirePackage("<%= pkg.mainPackage %>");'
        },
        src:['ephemeral/packages/**/*.js'],
        dest:'ephemeral/concat/packages/packages.js'
      },
      lib:{
        src:['ephemeral/build/main.js'],
        dest:'main.js'
      }
    },
    uglify: {
        options: {
            mangle:     true,
            compress:   true,
            banner:     '/* <%= pkg.name %> v<%= pkg.version %>  */'
        },
        prod:    {
            files: {
                'main.js': ['ephemeral/build/main.js']
            }
        }
    },
    shell: {
        build_lib: {
            command: [
              'cd build/lib/execute',
              'node main.js'
            ].join(' && ')
        }
    }
  });


  grunt.registerTask('build:tests:mocha', ['concat:qunit']);
  grunt.registerTask('build:tests:jasmine', ['concat:qunit']);
  grunt.registerTask('build:tests:qunit', ['concat:qunit']);

  grunt.registerTask('build:lib:prod', ['babel', 'concat:packages', 'shell:build_lib', 'uglify']);
  grunt.registerTask('build:lib:dev', ['babel', 'concat:packages', 'shell:build_lib', 'concat:lib']);
  grunt.registerTask('build:lib', ['build:lib:dev']);

  grunt.registerTask('default', ['babel']);

};