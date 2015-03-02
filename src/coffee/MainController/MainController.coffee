'use strict'
angular.module('ramonjames')
  .controller 'MainController', [
    '$scope'
    '$window'
    'rjSkrollr'
    'RestService'
    ($scope, $window, rjSkrollr, RestService)->

      # get main json
      RestService.getPage('main').then (response)->#
        $scope.title = response.name
        $scope.description = response.description

      # set up the scroller
      if $window.skrollr
        config =
          smoothScrolling : true
          smoothScrollingDuration : 500
          scale : 1
          forceHeight : false
          mobileDeceleration : .004
          constants:
            windowHeight: ()->
              $scope.$broadcast 'windowHeight', $window.innerHeight
              return $window.innerHeight
        rjSkrollr.init config
      return
    ]