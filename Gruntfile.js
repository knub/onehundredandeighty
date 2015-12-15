// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // all of our configuration will go here


    // configure jshint to validate js files -----------------------------------
    jshint: {
      options: {
        reporter: require('jshint-stylish'), // use jshint-stylish to make our errors look and read good
        maxerr:100,
        globals: ['data'],
        predef: [ 'data' ]
      },

      // when this task is run, lint the Gruntfile and all js files in src
      build: ['Gruntfile.js', 'js/data.js', 'js/logic.js']
    },


    mutationTest: {
      options: {
        testFramework: 'mocha'
      },
      target: {
        options: {
          basePath: '.',
          code: 'js/*.js',
          specs: 'test/*.js',
          mutate: ['js/logic.js'],
          reporters: {
              html: {
                  dir: 'reports/mutation-test',
                  successThreshold: 70
              },
              text: {
                  dir: 'tmp'
              }
          }
  
        }
      }

     }

   });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-mutation-testing');
  grunt.loadNpmTasks('grunt-contrib-jshint');

};

