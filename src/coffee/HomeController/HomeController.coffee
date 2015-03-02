'use strict'
angular.module('ramonjames')
  .controller 'HomeController', [
     '$scope'
     '$controller'
     'RestService'
     '$anchorScroll'
    ($scope, $controller, RestService, $anchorScroll)->
      $anchorScroll 'top'
      RestService.getPage('home').then (response)->
        console.log response
      return
  ]