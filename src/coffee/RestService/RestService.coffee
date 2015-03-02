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
        if httpCache.get(pageName)?
          deferred = $q.defer()
          return deferred.resolve httpCache.get(pageName)
        else
          return $http.get URLS[pageName]

      return
  ]