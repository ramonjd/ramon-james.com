'use strict'
angular.module('ramonjames')
  .controller 'AboutController', [
     '$scope'
     '$controller'
     'RestService'
     '$anchorScroll'
    ($scope, $controller, RestService, $anchorScroll)->
      $scope.$emit 'loading', true
      RestService.getPage('about').success (response)->
        $scope.title = response.title
        $scope.content = response.content
        $scope.$emit 'loading', false
      $anchorScroll 'top'
      return
  ]