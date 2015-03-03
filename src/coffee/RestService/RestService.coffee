'use strict'
angular.module('ramonjames')
  .service 'RestService', [
     '$http'
     'ENV'
    ($http, ENV)->
      deferred = null
      @getPage = (pageName)->
        $http.get ENV.BASE + ENV.URLS[pageName], {cache:true}
      return
  ]