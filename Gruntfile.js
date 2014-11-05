module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
    
    grunt.initConfig({
	jshint: {
	    src: ['server.js'],
	    options: {
		node: true
	    }
	},

	jscs: {
	    src: 'server.js',
	    options: {
		config: '.jscsrc'
	    }
	},

	simplemocha: {
	    src: ['test/**/*test.js']
	}
    });
    grunt.registerTask('test', ['jshint', 'jscs', 'simplemocha']);
    grunt.registerTask('default', ['test']);
}
