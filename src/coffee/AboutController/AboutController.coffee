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
        $scope.heading = response.title
        $scope.content = response.content
        #$scope.$emit 'loading', false
      $anchorScroll 'top'
      return
  ]