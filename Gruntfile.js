module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        report: 'min'
      },
      build: {
        src : 'assets/dev/js/main.js',
        dest: 'assets/dist/js/main.min.js'
      }
    },


    jshint: {
      beforeconcat: ['assets/dev/js/main.js']
    },


    concat: {
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      dist: {
        src: [
          'assets/dev/js/vendor/jquery.min.js',
          'assets/dev/js/main.js'
        ],
        dest: 'assets/dist/js/main.min.js'
      }
    },


    sass: {
      dist: {
        options: {
          style: 'compressed',
          sourcemap: true
        },
        files: {
          'assets/dist/css/main.min.css': 'assets/dev/sass/main.scss'
        }
      }
    },


    autoprefixer: {
      options: {
        browsers: ['last 2 version']
      },
      your_target: {
        src: 'assets/dist/css/main.min.css',
        dest: 'assets/dist/css/main.min.css'
      },
    },


    watch: {
      options: {
        dateFormat: function(time) {
          grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
          grunt.log.writeln('Waiting for more changes...');
        },
      },
      scripts: {
        files: 'assets/dev/**/*.js',
        tasks: ['jshint', 'concat'],
        options: {
          livereload: true,
        }
      },
      css: {
        files: ['assets/**/*.scss'],
        tasks: ['sass', 'autoprefixer', 'cmq'],
        options: {
          livereload: true,
        }
      }
    },


    copy: {
      main: {
        files: [
          { expand: true, cwd: 'bower_components/jquery/', src: ['jquery.min.js'], dest: 'assets/dev/js/vendor/' },
          { 
            expand: true, 
            cwd: 'bower_components/normalize-css/', 
            src: ['normalize.css'], 
            dest: 'assets/dev/sass/vendor/',
            rename: function(dest, src) {
              return dest + src.substring(0, src.indexOf('.')) + '.scss'; // Rename normalize.css to .scss
            }
          }
        ]
      }
    },


    cmq: {
      options: {
        log: true
      },
      target: {
        files: {
          'assets/dist/css': ['assets/dist/css/main.min.css']
        }
      }
    }


  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-combine-media-queries');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'concat', 'sass', 'uglify', 'autoprefixer', 'cmq']);

};