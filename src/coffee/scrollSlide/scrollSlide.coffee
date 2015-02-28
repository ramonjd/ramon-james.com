RamonJames.provider(
  'scrollSlide', [
    ()->
      elem = undefined
      @setWindowHeight = (h)->
        console.log 'serv h', h
        if elem
          elem.css 'height', h + 'px'
      @$get = ()->
        setElem : (element)->
          elem = element
      return
  ])
  .directive('scrollSlidePanel', [
    '$window'
    'scrollSlide'
    'snSkrollr'
    ($window, scrollSlide, snSkrollr)->
      scrollSlideObj =
        restrict : 'A'
        replace : false
        link : ($scope, $element, $attrs)->
          $element.css 'height', window.innerHeight + 'px'
          scrollSlide.setElem $element
          snSkrollr.refresh()
          return
  ])