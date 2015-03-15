'use strict'
angular.module('ramonjames')
  .service 'RestService', [
     '$http'
     'ENV'
     'loadingService'
    ($http, ENV, loadingService)->
      deferred = null
      success = (res)->
        loadingService.hide()
        res.data
      error = (res)->
        loadingService.hide()
        res.data
      @getPage = (pageName)->
        loadingService.show()
        req = $http.get ENV.BASE + ENV.URLS[pageName], {cache:true}
        req.then success, error
      return
  ]