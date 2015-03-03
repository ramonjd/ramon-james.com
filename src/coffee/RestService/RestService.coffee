'use strict'
angular.module('ramonjames')
  .service 'RestService', [
     '$http'
     '$q'
     '$cacheFactory'
     'ENV'
    ($http, $q, $cacheFactory, ENV)->
      deferred = null
      httpCache = $cacheFactory 'httpCache'
      @getPage = (pageName)->
        deferred = $q.defer()
        if httpCache.get(pageName)?
          deferred.resolve httpCache.get(pageName)
        else
          $http.get(ENV.BASE + ENV.URLS[pageName]).then (response)->
            deferred.resolve response
            httpCache.put(pageName, response)
        deferred.promise
      return
  ]