'use strict'
angular.module('ramonjames')
  .controller 'MainController', [
    '$scope'
    '$window'
    'rjSkrollr'
    ($scope, $window, rjSkrollr)->
      # set up the scroller
      if $window.skrollr
        config =
          smoothScrolling : true
          smoothScrollingDuration : 500
          scale : 1
          #forceHeight : true
          mobileDeceleration : .004
          constants:
            windowHeight: ()->
              console.log 'constants', $window.innerHeight
              $scope.$broadcast 'windowHeight', $window.innerHeight
              return $window.innerHeight
        rjSkrollr.init config
      return
    ]