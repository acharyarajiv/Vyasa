module.exports = function (grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: [
        'src/js/**/*.js'
      ],
			options: {
				globals: {
					jQuery: true,
					console: true,
					module: true
				}
			}
		},
		concat: {
			'concat-js': {
				src: [
          // The libs
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/bootstrap/dist/js/bootstrap.min.js',

          // App specific files
          'src/js/*.js'
        ],
				dest: 'dist/js/built.js',
			},
			'concat-css': {
				src: [
          // The libs
          'bower_components/bootstrap/css/bootstrap.min.css',
          'bower_components/font-awesome/css/font-awesome.min.css',

          //App specific files
          'src/resources/app.css'
        ],
				dest: 'dist/resources/css/build.css'
			}
		},
		bowercopy: {
			//For Development
			'copy-src-js': {
				options: {
					destPrefix: 'src/libs'
				},
				files: {
					// jQuery
					'jquery': 'jquery/dist/*',

					// Bootstrap
					'bootstrap': 'bootstrap/dist/*'
				},
			},
			'copy-src-css': {
				options: {
					destPrefix: 'src/libs'
				},
				files: {
					// Font-Awesome
					'font-awesome/css': 'font-awesome/css/*',
					'font-awesome/fonts': 'font-awesome/fonts/*'
				}
			},

			//For Dist
			'copy-dist-resources': {
				options: {
					destPrefix: 'dist/resources/'
				},
				files: {
					'fonts': [
            'bower_components/font-awesome/fonts/*',
            'bower_components/bootstrap/dist/fonts/*'
          ]
				}
			}
		},
		/*Tests*/
		jasmine: {
			'unit-tests': {
				src: [
          'src/js/app.js'
        ],
				options: {
					vendor: [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/bootstrap/dist/js/bootstrap.min.js'
          ]
				}
			}
		},
		less: {
			development: {
				options: {
					compress: true
				},
				files: {
					"src/resources/css/app.css": "src/resources/less/*.less"
				}
			}
		},
		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jasmine', 'jshint', 'less']
		}
	});

	grunt.loadNpmTasks('grunt-bowercopy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');

	// Default task(s).
	grunt.registerTask('default', ['bowercopy', 'jshint', 'concat']);
	grunt.registerTask('hint', ['jshint']);
	grunt.registerTask('bower', ['bowercopy']);
	grunt.registerTask('less', ['less']);
	grunt.registerTask('travis', ['jshint', 'jasmine']);
};