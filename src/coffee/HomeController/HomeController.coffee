'use strict'
angular.module('ramonjames')
  .controller 'HomeController', [
     '$scope'
     '$controller'
     'RestService'
     '$anchorScroll'
     'rjSkrollr'
     '$timeout'
    ($scope, $controller, RestService, $anchorScroll, rjSkrollr, $timeout)->
      $anchorScroll 'top'
      RestService.getPage('home').then (response)->
        rjSkrollr.refresh()
        $timeout ()->
          rjSkrollr.refresh()
        , 100
      return
  ]