module.exports = (grunt)->
  endpoints =
    '/wordpress/' : 'api/root.json'
    '/wordpress/posts/' : 'api/posts.json'
  grunt.initConfig(
    pkg: grunt.file.readJSON('package.json')
    # task definitions
    connect:
      server:
        options:
          port: grunt.option('port') || 8000
          hostname: 'localhost'
          middleware: (connect, options, middlewares)->
            cb = (req, res, next)->
              res.setHeader 'Content-Type', 'application/json'
              match = false
              fileToRead = ''
              Object.keys(endpoints).forEach (url)->
                if req.url.indexOf(url) is 0
                  match = true
                  fileToRead = endpoints[url]
              return next() if match is false
              res.end grunt.file.read(fileToRead)
            middlewares.push cb
            middlewares
    watch: {}
    )
  
  # load modules
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  
  # register tasks
  grunt.registerTask 'server', [
    'connect',
    'watch'
  ]
  grunt.registerTask 'test', [
  ]
  grunt.registerTask 'compile', [
  ]
  grunt.registerTask 'dev', [
  ]
  grunt.registerTask 'dist', [
  ]
  grunt.registerTask 'default', [
  ]
  # return grunt
  grunt