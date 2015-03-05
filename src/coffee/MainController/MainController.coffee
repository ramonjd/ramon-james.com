'use strict'
angular.module('ramonjames')
  .controller 'MainController', [
    '$scope'
    '$window'
    'rjSkrollr'
    'RestService'
    'loadingLogoService'
    '$timeout'
    ($scope, $window, rjSkrollr, RestService, loadingLogoService, $timeout)->
      # loading
      $scope.loading = true
      $scope.$on 'loading', (e, data)->
        if data is true
          $scope.loading = true
          loadingLogoService.play()
        else
          $timeout ()->
            loadingLogoService.stop()
            $scope.loading = false
          ,1000
      # get main json
      RestService.getPage('main').success (response)->
        $scope.title = response.name
        $scope.description = response.description
      # set up the scroller
      if $window.skrollr and Modernizr.touch is false
        config =
          smoothScrolling : true
          smoothScrollingDuration : 500
          scale : 1
          forceHeight : false
          mobileDeceleration : 1
          constants:
            windowHeight: ()->
              $scope.$broadcast 'windowHeight', $window.innerHeight
              return $window.innerHeight
        rjSkrollr.init config
      return
    ]