'use strict'
angular.module('ramonjames')
  .service('loadingService', [
    ()->
      @hideLoading = false
      @hide = ()=>
        @hideLoading = true
      @show = ()=>
        @hideLoading = false
      @get = ()=>
        @hideLoading
      @
  ])
  .directive('loadingContainer', [
    '$window'
    'loadingService'
    ($window, loadingService)->
      restrict : 'A'
      replace : false
      scope:
        hideLoading: '='
      templateUrl : 'templates/loading.tpl.html',
      link : ($scope, $element, $attrs)->
        $scope.$watch loadingService.get, (newValue, oldValue)->
          if newValue is true
            $element.addClass 'hide'
          else if newValue is false
            $element.removeClass 'hide'
        return
  ])