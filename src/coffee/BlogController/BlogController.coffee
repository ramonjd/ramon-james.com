'use strict'
angular.module('ramonjames')
  .controller 'BlogController', [
     '$scope'
     'RestService'
     '$anchorScroll'
    ($scope, RestService, $anchorScroll)->
      RestService.getPage('posts').then (response)->
        $scope.posts = response
        $scope.length = response.length
        $scope.count = response[0].count
        $scope.pages = $scope.length / 5
        $scope.currentPange = 1
      $anchorScroll 'top'
      return
  ]