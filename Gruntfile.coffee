module.exports = (grunt)->
  
  # endpoints for the mock json
  endpoints = require './config/api.endpoints'
  
  # dev local variables
  devLocals = require './config/dev.locals.json'
  
  # rewrite middleware
  modRewrite = require 'connect-modrewrite'
  mountFolder = (connect, dir) ->
    connect.static(require('path').resolve(dir))
  
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
          port: grunt.option('port') || 8000
          middleware: (connect)->
            middlewares = [
              modRewrite([
                '!\\.html|\\.js|\\.svg|\\.css|\\.png|\\.jpg$ /index.html [L]'
              ])
              mountFolder connect, '.tmp'
              mountFolder connect, 'src'
              mountFolder connect, './'
            ]
      # https://blog.gaya.ninja/articles/static-mockup-data-endpoints-connect/
      api:
        options:
          port: 8080
          hostname: 'localhost'
          middleware: (connect, options, middlewares)->
            apiFunc = (req, res, next)->
              res.setHeader 'Content-Type', 'application/json'
              match = false
              fileToRead = ''
              Object.keys(endpoints).forEach (url)->
                if req.url.indexOf(url) is 0
                  match = true
                  fileToRead = endpoints[url]
              return next() if match is false
              res.end grunt.file.read(fileToRead)
            middlewares.push apiFunc
            middlewares
    copy:
      dist:
        files: [
          {
            expand:true
            cwd: 'src/img/'
            src: [
              '**'
            ]
            dest: 'dist/img/'
          }
        ]
    jade:
      compile:
        options:
          pretty: true
          data: (dest, src)->
            devLocals
        files:
          '.tmp/index.html' : 'src/jade/index.jade'
      views:
        options:
          client: false
          pretty: true
        files: [
          {
              cwd: 'src/jade/views'
              src: '**/*.jade',
              dest: '.tmp/templates',
              expand: true,
              ext: '.tpl.html'
          }
        ]
      partials:
        options:
          client: false
          pretty: true
        files: [
          {
              cwd: 'src/jade/partials'
              src: '**/*.jade',
              dest: '.tmp/templates',
              expand: true,
              ext: '.tpl.html'
          }
        ]
    less:
      dev:
        files:
          '.tmp/css/base.css' : 'src/less/base.less'
      dist:
        options:
          compress: true
        files:
          'dist/css/base.min.css' : 'src/less/base.less'
    uglify:
      options:
        mangle: false
      dist:
        files: 'dist/js/app.min.js': devLocals.scripts
    watch:
      html:
        files: 'src/jade/**/*.jade'
        tasks: ['jade', 'jade:views', 'jade:partials']
      locals:
        files: 'config/*.locals.json'
        tasks: ['jade']
      coffee:
        files: 'src/coffee/**/*.coffee'
        tasks: ['coffee:dev']
      less:
        files: 'src/less/*.less'
        tasks: ['less:dev']
    )
  
  #
  # load modules
  #
  require('load-grunt-tasks')(grunt)
  
  #
  # register tasks
  #
  grunt.registerTask 'compile', [
    'clean:dev'
    'less:dev'
    'coffee:dev'
    'jade'
    'jade:views'
    'jade:partials'
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
    'uglify:dist'
    'less:dist'
    'copy:dist'
  ]
  grunt.registerTask 'default', [
    'compile'
    'server'
  ]
  # return grunt
  grunt