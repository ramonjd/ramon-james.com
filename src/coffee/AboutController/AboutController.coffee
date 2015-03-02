'use strict'
angular.module('ramonjames')
  .controller 'AboutController', [
     '$scope'
     '$controller'
     'RestService'
     '$anchorScroll'
    ($scope, $controller, RestService, $anchorScroll)->
      $anchorScroll 'top'
      return
  ]