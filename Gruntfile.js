module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src_js/<%= pkg.name %>.js',
        dest: 'build/js/<%= pkg.name %>.min.js'
      }
    },
    coffeelint: {
      app: ['src/*.coffee'],
      options: {
        configFile: 'coffeelint.json'
      }
    },
    shell: {
        coffeConcat: {
          command:'coffee ./node_modules/coffeescript-concat/coffeescript-concat.coffee -I ./src/ -o ./src_cof/<%= pkg.name %>.coffee',
          options: {
               async: false
          }
        }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          require: 'coffee-script/register'
        },
        src: ['test/*.coffee']
      }
    },
    coffee: {
      compileJoined: {
        files: {
          'src_js/<%= pkg.name %>.js': ['src_cof/<%= pkg.name %>.coffee'] // concat then compile into single file
        }
      }
    },
    codo: {
      options: {
        title: "<%= pkg.name %>",
        output: 'doc',
        inputs: ["src"]
      }
    },
    less: {
      development: {
        files: {
          "build/css/style.css": "less/style.less"
        }
      },
      production: {
        options: {
          cleancss: true,
          modifyVars: {
            imgPath: '"http://mycdn.com/path/to/images"',
            bgColor: 'red'
          }
        },
        files: {
          "build/css/style.css": "less/style.less"
        }
      }
    },
    // Build docs using yuidoc
    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        version: '<%= version %>',
        description: '<%= pkg.description %>',
        url: '<%= pkg.url %>',
        logo: '<%= pkg.logo %>',
        options: {
          paths: ['./src'],
          outdir: 'doc',
          syntaxtype: 'coffee',
          extension: '.coffee',
          linkNatives: true,
          attributesEmit: true,
          selleck: true,
          helpers: ["build_dev/path.js"],
          themedir: "build_dev/foraTheme/"
        }
      }
    },
    clean: ["src_js/*.js", "src_cof/*.coffee","doc/*"],
    watch: {
      cffile: {
        files: ['src/*.coffee'],
        tasks: ['clean','coffeelint','shell','coffee','yuidoc']
      },
      cftest:{
        files: ['src_cof/*.coffee'],
        tasks: ['mochaTest','uglify']
      
      },
      csfile: {
        files: ['less/*.less'],
        tasks: ['less']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-shell-spawn');
  grunt.loadNpmTasks('grunt-coffeelint');
  grunt.loadNpmTasks('grunt-codo');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', ['clean','less','coffeelint','shell','coffee','mochaTest','yuidoc','uglify']);

};