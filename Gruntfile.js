module.exports = function (grunt) {

  module.exports = function (grunt) {
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
    });

    // load plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('ut', ['watch:ut']);

  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['gruntfile.js', 'lib/**/*.js', 'test/**/*.js'],
      options: {
        expr: true,
        globals: {
          console: true,
          module: true,
          exports: true
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
        src: ['test/unit/**/*.js']
      },
      integration: {
        options: {
          reporter: 'dot',
          require: 'should',
          ui: 'bdd'
        },
        src: ['test/integration/**/*.js']
      }
    },
    concat: {
      files: {
        src: [
          'public/vendor/jquery/jquery-1.8.2.min.js',
          'public/vendor/bootstrap/js/bootstrap.min.js',
          'public/js/*.js'
        ],
        dest: 'public/js/build/<%= pkg.name %>.js',
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> ' +
          '<%= grunt.template.today("yyyy/mm/dd hh:MM:ss") %> */\n'
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
    nodemon: {
      dev: {
        script: '<%= pkg.name %>.js',
        options: {
          nodeArgs: ['--debug']
        }
      },
      options: {
        callback: function (nodemon) {
          nodemon.on('log', function (event) {
            console.log(event.colour);
          });

          // opens browser on initial server start
          nodemon.on('config:update', function () {
            // Delay before server listens on port
            setTimeout(function() {
              require('open')('http://localhost:8000');
            }, 1000);
          });

          // refreshes browser when server reboots
          nodemon.on('restart', function () {
            // Delay before server listens on port
            setTimeout(function() {
              require('fs').writeFileSync('.rebooted', 'rebooted');
            }, 1000);
          });
        }
      }
    },
    watch: {
      'lint': {
        files: ['<%= jshint.files %>', 'public/js/**/*.js', 'public/less/**/*.less'],
        tasks: ['jshint', 'mochaTest:unit', 'concat', 'uglify', 'less'],
      },
      'ut': {
        files: '<%= jshint.files %>',
        tasks: ['shell:ut']
      }
    },
    concurrent: {
      tasks: ['nodemon', 'watch'],
      options: {
          logConcurrentOutput: true
      }
    },
    shell: {
      ut: {
        command: 'grunt mochaTest:unit',
        options: {
          stderr: false
        }
      },
      'ut-debug': {
        command: 'mocha --require should --debug --debug-brk test/unit/**/*.js',
        options: {
          stderr: false
        }
      }
    }
  });

  // load plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-shell');

  // run typing "grunt ut"
  grunt.registerTask('ut', ['watch:ut']);

  // run typing "grunt ut-debug"
  grunt.registerTask('ut-debug', ['shell:ut-debug']);

  // run typing "grunt test"
  grunt.registerTask('test', ['jshint', 'mochaTest:all']);

  // run typing "grunt unit-test"
  grunt.registerTask('unit-test', ['jshint', 'mochaTest:unit']);

  // run typing "grunt integration-test"
  grunt.registerTask('integration-test', ['jshint', 'mochaTest:integration']);

  // run typing "grunt build"
  grunt.registerTask('build', [/*'jshint', 'mochaTest:all',*/ 'concat', 'uglify', 'less']);

  // run typing "grunt start"
  grunt.registerTask('start', ['concurrent']);

};
