'use strict'
angular.module('ramonjames')
  .controller 'BlogController', [
     '$scope'
     '$controller'
     'RestService'
     '$anchorScroll'
    ($scope, $controller, RestService, $anchorScroll)->
      RestService.getPage('posts').success (response)->
        console.log response
        $scope.posts = response
      $anchorScroll 'top'
      return
  ]