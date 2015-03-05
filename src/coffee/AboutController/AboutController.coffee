'use strict'
angular.module('ramonjames')
  .controller 'AboutController', [
     '$scope'
     '$controller'
     'RestService'
     '$anchorScroll'
    ($scope, $controller, RestService, $anchorScroll)->
      RestService.getPage('about').success (response)->
        $scope.title = response.title
        $scope.content = response.content
      $anchorScroll 'top'
      return
  ]