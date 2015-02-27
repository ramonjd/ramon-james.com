module.exports = (grunt)->
  # endpoints for the mock json
  endpoints =
    '/wordpress/' : 'api/root.json'
    '/wordpress/posts/' : 'api/posts.json'
    
  grunt.initConfig(
    pkg: grunt.file.readJSON('package.json')
    #
    # task definitions
    #
    clean:
      dev: [
        '.tmp'
      ]
      dist: [
        'dist'
      ]
    coffee:
      dev:
        options:
          bare: true
        expand: true,
        flatten: true
        cwd: 'src/coffee'
        src: ['**/*.coffee']
        dest: '.tmp/js'
        ext: '.js'
    connect:
      dev:
        options:
          port: grunt.option('port') || 3000
          base: ['.tmp', './']
      # https://blog.gaya.ninja/articles/static-mockup-data-endpoints-connect/
      api:
        options:
          port: 8080
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
    jade:
      compile:
        options:
          pretty: true
          data: (dest, src)->
            require './config/dev.locals.json'
        files:
          '.tmp/index.html' : 'src/jade/index.jade'
    less:
      dev:
        files:
          '.tmp/css/base.css' : 'src/less/base.less'
      dist:
        files:
          '' : ''
    watch: {}
    )
  
  #
  # load modules
  #
  grunt.loadNpmTasks 'grunt-contrib-jade'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  
  #
  # register tasks
  #
  grunt.registerTask 'compile', [
    'clean:dev'
    'less:dev'
    'coffee:dev'
    'jade'
  ]
  grunt.registerTask 'server', [
    'connect'
    'watch'
  ]
  grunt.registerTask 'test', [
  ]
  grunt.registerTask 'dev', [
  ]
  grunt.registerTask 'dist', [
  ]
  grunt.registerTask 'default', [
    'compile'
    'server'
  ]
  # return grunt
  grunt