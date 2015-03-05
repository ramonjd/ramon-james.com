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
      $scope.$emit 'loading', true
      RestService.getPage('home').success (response)->
        $scope.author = response.author
        $scope.title = response.title
        $scope.content = response.content
        $scope.$emit 'loading', false
        $timeout ()->
          rjSkrollr.refresh()
        , 100
      return
  ]