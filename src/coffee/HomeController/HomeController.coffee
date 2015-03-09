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
        $scope.heading = response.title
        $scope.content = response.content
        $timeout ()->
          rjSkrollr.refresh()
        , 500
      return
  ]