module.exports = function (grunt) {
  grunt.initConfig({
    uglify: {
      main: {
        options: {
          preserveComments: function (node, comment) {
            return comment.value.indexOf('ngFeathers') > -1
          }
        },
        files: {
          'dist/ng-feathers.min.js': ['src/ng-feathers.js'],
          'dist/ng-feathers.standalone.min.js': [
            'bower_components/socket.io-client/socket.io.js',
            'bower_components/feathers-client/dist/feathers.js',
            'src/ng-feathers.js'
          ]
        }
      }
    },
    standard: {
      options: {
        format: true
      },
      app: {
        src: ['ng-feathers.js']
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-standard')
  grunt.registerTask('default', ['standard', 'uglify'])
}
