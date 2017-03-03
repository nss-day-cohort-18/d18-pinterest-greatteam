module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        predef: [ "document", "console" ],
        esnext: true,
        globalstrict: true,
        globals: {"angular":true, "firebase":true},
      },
      files: ['../app/*.js']
    },
    sass: {
      dist: {
        files: {
          '../css/styles.css': '../scss/main.scss'
        }
      }
    },
    copy: { //for bootstrap and jquery - only need to do the first time.
     bootstrap: {
       expand: true,
       cwd: 'node_modules/bootstrap/dist',
       src: ['**'],
       dest: '../dist'
     },
     jquery: {
       expand: true,
       cwd: 'node_modules/jquery/dist',
       src: ['jquery.min.js'],
       dest: '../dist'
     }
   },
    watch: {
      javascripts: {
        files: ['../javascripts/**/*.js'],
        tasks: ['jshint']
      },
      sass: {
        files: ['../scss/**/*.scss'],
        tasks: ['sass']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'sass','copy', 'watch']);
};
