module.exports = function (grunt) {
	grunt.initConfig({

		target: grunt.file.readJSON('package.json'),

		clean: ['dist'],

		// jshint code first using rules defined in .jshintrc
		jshint: {
			jshintrc: '.jshintrc',
			all: [ 'src/js/**/*.js' ]
		},


		// compile handlebars templates and concatenate them into src/js/templates.js
		handlebars: {
			compile: {
				options: {
					processName: function (filePath) {
						var fileName, pieces;
						pieces = filePath.split("/");
						fileName = pieces[pieces.length - 1];
						return fileName.slice(0, -4);
					}
				},
				files: {
					"src/js/templates.js": ["src/templates/*.hbs"]
				}
			}
		},

		// compiles .scss
		compass: {
			dist: {
				options: {
					sassDir: "src/sass",
					cssDir: "dist/<%= target.name %>",
					environment: "production"
				}
			},
			dev: {
				options: {
					sassDir: "src/sass",
					cssDir: ""
				}
			}
		},


		// start local development server
		connect: {
			dist: {
				options: {
					base: 'dist/<%= target.name %>',
					port: 8000,
					hostname: 'localhost',
					keepalive: true,
					middleware: function (connect, options) {
						return [
							connect.static(options.base, { index: 'index.html' })
						];
					}
				}
			},

			dev: {
				options: {
					port: 8000,
					hostname: 'localhost',
					middleware: function (connect, options) {
						return [
							connect.static(options.base, { index: 'debug.html' })
						];
					}
				}
			}
		},


		// watch file changes
		watch: {
			options: {
				livereload: true
			},
			styles: {
				files: "src/sass/**/*.scss",
				tasks: ["compass:dev"]
			},
			scripts: {
				files: 'src/js/**/*.js',
				options: {
					nospawn: true
				}
			},
			handlebars: {
				files: ["src/templates/*.hbs"],
				tasks: ["handlebars"]
			}
		},

		// copy files when using 'grunt dist'
		copy: {
			dist: {
				files: [
					{ expand: true, src: 'images/**', dest: 'dist/<%= target.name %>/' },
					{ expand: true, src: 'favicon.ico', dest: 'dist/<%= target.name %>/' },
					{ expand: true, src: 'index.html', dest: 'dist/<%= target.name %>/' },
				]
			}
		},

		// require.js optimizer (using almond here instead of r.js)
		requirejs: {
			compile: {
				options: {
					name: '../../lib/almond/almond',
					include: [ 'RootView' ],
					insertRequire: [ 'RootView' ],
					mainConfigFile: 'src/js/requirejs.config.js',
					out: 'dist/<%= target.name %>/app.js',
					wrap: true,
					findNestedDependencies: true,
					preserveLicenseComments: false,
					optimize: 'uglify2' // none
				}
			}
		},

		compress: {
			main: {
				options: {
					archive: 'dist/<%= target.name %>.zip'
				},
				files: [
					{ expand: true, cwd: 'dist/<%= target.name %>/', src: [ '**' ], dest: '.' }
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks("grunt-contrib-compass");
	grunt.loadNpmTasks("grunt-contrib-handlebars");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-requirejs");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-compress');

	grunt.registerTask('default', [ 'compass:dev', 'handlebars']);
	grunt.registerTask('dev', [ 'jshint', 'compass:dev', 'handlebars', 'connect:dev', 'watch' ]);

	grunt.registerTask('deploy',
			[ 'clean', 'jshint', 'compass:dist', 'handlebars', 'requirejs', 'copy:dist', 'compress']);
	grunt.registerTask('dist', [ 'deploy', 'connect:dist' ]);
};
