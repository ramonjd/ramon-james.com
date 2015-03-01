RamonJames.controller 'MainController', [
  '$scope'
  '$window'
  'snSkrollr'
  ($scope, $window, snSkrollr)->
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
      snSkrollr.init config
    return
  ]