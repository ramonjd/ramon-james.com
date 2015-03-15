'use strict'
angular.module('ramonjames')
  .controller 'BlogController', [
     '$scope'
     'RestService'
     '$anchorScroll'
    ($scope, RestService, $anchorScroll)->
      RestService.getPage('posts').then (response)->
        $scope.posts = response
      $anchorScroll 'top'
      return
  ]