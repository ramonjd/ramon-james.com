'use strict'
angular.module('ramonjames')
  .directive('scrollSlide', [
    '$window'
    'rjSkrollr'
    ($window, rjSkrollr)->
      setElementHeight = (elem, h)->
        elem.css 'height', h + 'px'
        elem
      scrollSlideObj =
        restrict : 'A'
        replace : false
        link : ($scope, $element, $attrs)->
          $scope.$on 'windowHeight', (e, data)->
            setElementHeight $element, data
          setElementHeight $element, $window.innerHeight
          return
  ])