module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['gruntfile.js', 'lib/**/*.js', 'test/**/*.js'],
      options: {
        expr: true,
        globals: {
          console: true,
          module: true
        }
      }
    },
    mochaTest: {
      all: {
        options: {
          reporter: 'dot',
          require: 'should',
          ui: 'bdd'
        },
        src: ['test/**/*.js']
      },
      unit: {
        options: {
          reporter: 'dot',
          require: 'should',
          ui: 'bdd'
        },
        src: ['test/*.js']
      }
    },
    concat: {
      files: {
        src: ['public/vendor/jquery/jquery-1.8.2.min.js', 'public/vendor/bootstrap/js/bootstrap.min.js', 'public/js/*.js'],
        dest: 'public/js/build/<%= pkg.name %>.js',
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("yyyy/mm/dd hh:MM:ss") %> */\n'
      },
      build: {
        src: ['public/js/build/<%= pkg.name %>.js'],
        dest: 'public/js/build/<%= pkg.name %>.min.js'
      }
    },
    less: {
      development: {
        options: {
          paths: ['public/less'],
          cleancss: true
        },
        files: {
          'public/css/<%= pkg.name %>.min.css': 'public/less/<%= pkg.name %>.less'
        }
      }
    },
    forever: {
      options: {
        index: '<%= pkg.name %>.js'
      }
    },
    watch: {
      files: ['<%= jshint.files %>', 'public/js/**/*.js', 'public/less/**/*.less'],
      tasks: ['default']
    }
  });

  // load plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-forever');

  // run typing "grunt test"
  grunt.registerTask('test', ['jshint', 'mochaTest:all']);

  // run typing "grunt test-unit"
  grunt.registerTask('test-unit', ['jshint', 'mochaTest:unit']);

  // run typing "grunt"
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'less']);

};