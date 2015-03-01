RamonJames.directive('scrollSlide', [
    '$window'
    'snSkrollr'
    ($window, snSkrollr)->
      setElementHeight = (elem, h)->
        elem.css 'height', h - 50 + 'px'
        elem
      scrollSlideObj =
        restrict : 'A'
        replace : false
        link : ($scope, $element, $attrs)->
          $scope.$on 'windowHeight', (e, data)->
            setElementHeight $element, data
          setElementHeight $element, $window.innerHeight
          snSkrollr.refresh()
          return
  ])