'use strict';

module.exports = function(grunt) {
	require('time-grunt-win')(grunt);
	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json'),

		// Tasks configuration:
		concat: {
			js: {
				src: 'lisink.github.io/js/*.js',
				dest: 'build/js/production.js',
			},
			css: {
				src: 'lisink.github.io/css/*.css',  
				dest: 'build/css/production.css',
			}
		},
		
		jade: {
			compile: {
				options: {
					pretty: true,

				},
					
				files: [ { 
					expand: true,
					cwd: "src",
					src: ["*.jade","!partials/*.jade"], 
					dest: "lisink.github.io/",
					ext: '.html'
				} ]
			}
		},
		
		sass: {
			options: {
					sourceMap: false,
				},
				dist: {
					files: [ { 
						expand: true,
						cwd: "src/scss",
						src: "*.scss", 
						dest: "lisink.github.io/css",
						ext: '.css'
					} ]
				}
		},
		
		uglify: {
			build: {
				src: 'build/js/production.js',
				dest: 'build/js/production.min.js'
			}
		},
		
		cssmin: {
			combine: {
				files: {
					'build/css/production.min.css': 'build/css/production.css'
				}
			}
		},
		
		csscomb: {
			options: {
				config: 'custom_csscomb.json'
			},
			
			css: {
				expand: true,
				src: 'lisink.github.io/css/*.css', 
				dest: '' 
			},
			
			scss: {
				expand: true,
				src: ['src/scss/*.scss', '!src/scss/_*.scss'], 
				dest: '' 
			}
		},
		
		autoprefixer: {
			options: {
				
			},

			all: {
				expand: true,
				flatten: true,
				src: 'lisink.github.io/css/*.css', 
				dest: 'lisink.github.io/css/' 
			},
			
		},
		
		connect: {
			server: {
				options: {
					port: 9000,
					base: 'lisink.github.io',
					livereload: true,
				}
			}
		},
		
		bower: {
			dev: {
				dest: 'lisink.github.io/libs'
			}
		},

		watch: {
		
			options: {
				livereload: true,
			},
			
			jade: {
				files: ['src/**/*.jade'],
				tasks: ['jade'],
				options: {
					spawn: false,
				}
			},
			sass: {
				files: ['src/scss/*.scss'],
				tasks: ['sass'],
				options: {
					spawn: false,
					
				}
			},
			
		},
		imagemin: { 
			dyn: {                        
			  options: {                       
				optimizationLevel: 3,
			  },
			  files: [{
				expand: true,       
				cwd: 'lisink.github.io/i',                
				src: ['*.{png,jpg,gif}'],  
				dest: 'lisink.github.io/i/min'                  
			  }]
			},
		}
	});
	
	//Load plugins that provide described tasks only when they needed 
	require('jit-grunt')(grunt);	
	

	grunt.registerTask('default', ['sass','jade','csscomb','concat:css','autoprefixer']);
	grunt.registerTask('pretty',['autoprefixer','csscomb']);
	grunt.registerTask('server',['connect','watch']);
	
};
