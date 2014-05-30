module.exports =function(grunt){
     //Configure your tasks
     grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),//load properties from the package as a JSON object
      watch: {
        options:{
          livereload: true
        },
        js: {
          files:   ['site/scripts/*.coffee'],
          tasks:   ['coffee']
        },
        css:{
          files:   ['site/styles/*.styl'],
          tasks:   ['stylus']
        },
        html:{
          files:   ['site/*.jade', 'site/includes/*.jade'],
          tasks:   ['jade']
        },
        img:{
          files: ['build/img/*'],
          tasks: ['imagemin']
        }
      },
      coffee:{
        compile: {
            options:{
              bare:true
            },
            files: {
              'build/js/scripts.js': ['site/scripts/*.coffee'] // compile and concat into single file
            }
          }
      },
      uglify: {
        my_target: {
          files: {
            'build/js/scripts.min.js': ['build/js/scripts.js']
          }
        }
      },
      stylus:{
        compile: {
          options:{
            import:[
              'nib'
            ]
          },
          files: {
            'build/css/styles.css': ['site/styles/styles.styl'] // compile and concat into single file
          }
        }

      },
      jade:{
        compile:{
          options: {pretty:false},
          files:[{
            expand: true,
            cwd:    'site/',
            src:    "*.jade",
            ext:    ".html",
            dest:   "build/"
          }]
        }
      }
     });

     //Register (load) the plugins to make them available in Grunt
     grunt.loadNpmTasks('grunt-contrib-watch');
     grunt.loadNpmTasks('grunt-contrib-coffee');
     grunt.loadNpmTasks('grunt-contrib-stylus');
     grunt.loadNpmTasks('grunt-contrib-jade');
     grunt.loadNpmTasks('grunt-contrib-uglify');

     //Run the task
     grunt.registerTask('default', ['watch','coffee', 'stylus', 'jade','uglify']);
     grunt.registerTask('build', ['coffee', 'stylus', 'jade','uglify']);
};
