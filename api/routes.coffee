endpoints = require './api.endpoints'
routes = (grunt)->
  middleware = (req, res, next)->
     res.setHeader 'Content-Type', 'application/json'
     match = false
     fileToRead = ''
     Object.keys(endpoints).forEach (url)->
       if req.url.indexOf(url) is 0
         match = true
         fileToRead = endpoints[url]
     return next() if match is false
     res.end grunt.file.read(fileToRead)
module.exports = routes
