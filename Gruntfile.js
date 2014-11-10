/* jshint camelcase: false */
'use strict';

module.exports = function configGrunt(grunt) {
  var monitoredFiles = [
    'Gruntfile.js',
    'mammoth.js',
    'lib/**/*.js',
    'test/**/*.js'
  ];

  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks('grunt-npm-install');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-istanbul');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    githooks: {
      all: {
        'pre-push': 'jshint mochaTest:unit',
        'post-merge': 'npm-install'
      }
    },
    jshint: {
      files: monitoredFiles,
      options: {
        jshintrc: true,
        reporter: require('jshint-stylish')
      }
    },
    mochaTest: {
      options: {
        reporter: 'spec',
        require: ['should'],
        ui: 'bdd',
        clearRequireCache: true
      },
      all: { src: [ 'test/**/*-test.js' ] },
      unit: { src: [ 'test/unit/**/*-test.js' ] },
      integration: { src: [ 'test/integration/**/*-test.js' ] }
    },
    express: {
      dev: {
        options: {
          script: 'mammoth.js',
          debug: true
        }
      }
    },
    watch: {
        jshint: {
          files: monitoredFiles,
          tasks: [ 'jshint' ]
        },
        develop: {
          files: monitoredFiles,
          tasks: [ 'express:dev:stop', 'jshint', 'mochaTest:unit', 'express:dev' ],
          options: { spawn: false }
        },
        evilDevelop: {
          files: monitoredFiles,
          options: { spawn: false },
          tasks: [ 'express:dev:stop', 'jshint', 'express:dev' ]
        }
    },
    mocha_istanbul: {
      coverage: {
        src: 'test/**/*.spec.js'
      },
      coveralls: {
        src: [ 'test/**/*.spec.js' ],
        options: {
          coverage: true,
          check: {
            lines: 75,
            statements: 75
          },
          root: './lib',
          reportFormats: [ 'cobertura', 'lcovonly' ]
        }
      }
    },
    istanbul_check_coverage: {
      default: {
        options: {
          coverageFolder: 'coverage*',
          check: {
            lines: 80,
            statements: 80
          }
        }
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
    }
  });

  // use when you are developing
  grunt.registerTask('develop', [ 'jshint', 'mochaTest:unit', 'express:dev', 'watch:develop' ]);
  grunt.registerTask('ut', [ 'mochaTest:unit' ]);
  grunt.registerTask('it', [ 'mochaTest:integration']);
  grunt.registerTask('hint', [ 'jshint' ]);

  // use when you are deploying
  grunt.registerTask('test', [ 'jshint', 'mochaTest:all', 'mocha_istanbul:coverage', 'mocha_istanbul:coveralls' ]);
  grunt.registerTask('coverage', ['mocha_istanbul:coverage']);
  grunt.registerTask('coveralls', ['mocha_istanbul:coveralls']);

};
