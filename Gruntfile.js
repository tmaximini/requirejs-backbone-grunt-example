module.exports = function (grunt) {
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		clean: ['target'],

		jshint: {
			jshintrc: '.jshintrc',
			files: [ 'src/js/**/*.js' ],
			all: [ 'src/js/**/*.js' ]
		},

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

		compass: {
			dist: {
				options: {
					sassDir: "src/sass",
					cssDir: "target/<%= pkg.name %>",
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

		connect: {
			dist: {
				options: {
					base: 'target/<%= pkg.name %>',
					port: 8000,
					hostname: 'localhost',
					keepalive: true
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

		copy: {
			dist: {
				files: [
					{ expand: true, src: 'fonts/**', dest: 'target/<%= pkg.name %>/' },
					{ expand: true, src: 'images/**', dest: 'target/<%= pkg.name %>/' },
					{ expand: true, src: 'favicon.ico', dest: 'target/<%= pkg.name %>/' },
					{ expand: true, src: 'config.json', dest: 'target/<%= pkg.name %>/' },
					{ expand: true, src: 'index.html', dest: 'target/<%= pkg.name %>/' },
					{ expand: true, src: 'locales/**', dest: 'target/<%= pkg.name %>/' }
				]
			}
		},

		requirejs: {
			compile: {
				options: {
					name: '../../lib/almond/almond',
					include: [ 'RootView' ],
					insertRequire: [ 'RootView' ],
					mainConfigFile: 'src/js/Configuration.js',
					out: 'target/<%= pkg.name %>/app.js',
					wrap: true,
					findNestedDependencies: true,
					preserveLicenseComments: false,
					optimize: 'uglify2' // uglify2
				}
			}
		},

		compress: {
			main: {
				options: {
					archive: 'target/<%= pkg.name %>.zip'
				},
				files: [
					{ expand: true, cwd: 'target/<%= pkg.name %>/', src: [ '**' ], dest: '.' }
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
	grunt.registerTask('dev', [ 'compass:dev', 'handlebars', 'connect:dev', 'watch' ]);

	grunt.registerTask('deploy',
			[ 'clean', 'compass:dist', 'handlebars', 'requirejs', 'copy:dist', 'compress']);
	grunt.registerTask('dist', [ 'deploy', 'connect:dist' ]);
};
