'use strict'
angular.module('ramonjames')
  .controller 'AboutController', [
     '$scope'
     'RestService'
     '$anchorScroll'
    ($scope, RestService, $anchorScroll)->
      RestService.getPage('about').then (response)->
        $scope.heading = response.title
        $scope.content = response.content
      $anchorScroll 'top'
      return
  ]