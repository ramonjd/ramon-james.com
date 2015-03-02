'use strict'
angular.module('ramonjames')
  .service 'RestService', [
     '$http'
     '$q'
     '$cacheFactory'
     'URLS'
    ($http, $q, $cacheFactory, URLS)->
      deferred = null
      httpCache = $cacheFactory 'httpCache'
      @getPage = (pageName)->
        deferred = $q.defer()
        if httpCache.get(pageName)?
          deferred.resolve httpCache.get(pageName)
        else
          $http.get(URLS[pageName]).then (response)->
            deferred.resolve response
            httpCache.put(pageName, response)
        deferred.promise
      return
  ]