module.exports = function (grunt) {
  var sourceFiles = [
    'Gruntfile.js',
    'mammoth.js',
    'lib/**/*.js',
    'test/**/*.js',
    'public/js/**/*.js'
  ];

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mochaTest: {
      options: {
        reporter: 'dot',
        require: 'should',
        ui: 'bdd',
        clearRequireCache: true
      },
      all: {
        src: ['test/**/*.js']
      },
      unit: {
        src: ['test/unit/**/*.js']
      },
      integration: {
        src: ['test/integration/**/*.js']
      }
    },
    watch: {
      ut: {
        files: sourceFiles,
        tasks: ['mochaTest:unit'],
        options: {
            livereload: false
        }
      }
    }
  });

  // run typing "grunt ut"
  grunt.registerTask('ut', [
    'watch:ut'
  ]);

};
