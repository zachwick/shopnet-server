module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		concat: {
			dist: {
				src: ['src/js/lib/underscore.js',
				      'src/js/lib/jquery-2.0.0.js',
				      'src/js/lib/json2.js',
				      'src/js/lib/backbone.js',
				      'src/js/lib/backbone-relational.js',
				      'src/js/models/*.js',
				      'src/js/views/*.js',
				      'src/js/bootstrap.js'],
				dest: 'static/<%= pkg.name %>.js'
			}
		},
		min: {
			dist: {
				src:  'static/<%= pkg.name %>.js',
				dest: 'static/<%= pkg.name %>.min.js'
			}
		},
		cssmin: {
			dist: {
				src: ['static/bootstrap.css'],
				src: ['static/bootstrap.min.css']
			}
		},
		compress: {
			zlib: {
				files: {
					'static/bootstrap.css.gz': 'static/bootstrap.css',
					'static/<%= pkg.name %>.js': 'static/<%= pkg.name %>.js',
					'static/bootstrap.min.css.gz': 'static/bootstrap.min.css',
					'static/<%= pkg.name %>.min.js': 'static/<%= pkg.name %>.min.js.gz'
				}
			}
		},
		docco: {
			models: {
				src: ['src/js/models/*.js'],
				options: {
					output: 'docs/models/'
				}
			},
			views: {
				src: ['src/js/views/*.js'],
				options: {
					output: 'docs/views/'
				}
			}
		},
		less: {
			dist: {
				options: {
					paths: ['src/less']
				},
				files: {
					'static/bootstrap.css': 'src/less/bootstrap.less'
				}
			}
		},
		qunit: {
			all: ['tests/models/*.html','tests/views/*.html']
		},
		qunit_junit: {
			options: {
				dest: 'tests/reports/'
			}
		}
	});

	grunt.loadNpmTasks('grunt-docco');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-yui-compressor');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-qunit-junit');

	grunt.registerTask("default",['less', 'concat']);
	grunt.registerTask("test",['less', 'concat', 'qunit_junit', 'qunit']);
	grunt.registerTask("docs", ['docco']);
	grunt.registerTask("build", ['less','concat','qunit_junit','qunit','min','cssmin','compress']);
};
