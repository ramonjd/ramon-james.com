'use strict'
angular.module('ramonjames')
.controller 'ContactController', [
  '$scope'
  'RestService'
  '$anchorScroll'
  ($scope, RestService, $anchorScroll)->
    RestService.getPage('contact').then (response)->
      $scope.heading = response.title
      $scope.content = response.content
    $anchorScroll 'top'
    return
]