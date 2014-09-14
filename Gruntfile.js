module.exports = function (grunt) {
  var srcFiles = [
    'mammoth.js',
    'lib/**/*.js',
    'test/**/*.js',
  ];

  var publicFiles = [
    'public/js/**/*.js'
  ];

  var monitoredFiles = [
    'gruntfile.js',
    'mammoth.js',
    'lib/**/*.js',
    'test/**/*.js',
    'public/js/**/*.js'
  ];

  var publicFiles = [
    'public/vendor/jquery/jquery-1.8.2.min.js',
    'public/vendor/bootstrap/js/bootstrap.min.js',
    'public/js/*.js',
    'public/less/*.less'
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: monitoredFiles,
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
    watch: {
      ut: {
        files: monitoredFiles,
        tasks: ['mochaTest:unit'],
        options: {
            livereload: true
        }
      },
      build: {
        files: publicFiles,
        tasks: ['concat', 'uglify', 'less'],
        options: {
            livereload: true
        }
      }
    },
    supervisor: {
      target: {
        script: "mammoth.js"
      },
      options: {
        debug: true,
        watch: monitoredFiles,
      },
    },
    concurrent: {
      tasks: ['supervisor' , /*'watch:ut',*/ 'watch:build'],
      options: {
          logConcurrentOutput: true
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
  grunt.loadNpmTasks('grunt-supervisor');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('jshint', ['jshint']);

  // run typing "grunt test"
  grunt.registerTask('test', ['jshint', 'mochaTest:all']);

  // run typing "grunt unit-test"
  grunt.registerTask('unit-test', ['jshint', 'mochaTest:unit']);

  // run typing "grunt integration-test"
  grunt.registerTask('integration-test', ['jshint', 'mochaTest:integration']);

  // run typing "grunt build"
  grunt.registerTask('build', ['concat', 'uglify', 'less']);

  // run typing "grunt start"
  grunt.registerTask('start', ['concurrent']);
};
