RamonJames.config [
  '$routeProvider'
  '$locationProvider'
  'snSkrollrProvider'
  'scrollSlideProvider'
  ($routeProvider, $locationProvider, snSkrollrProvider, scrollSlideProvider)->
    
    # routes
    $routeProvider.when('/', {
      templateUrl : '/templates/home.tpl.html'
      controller: 'PageController'
    })
    .when('/about', {
      templateUrl : '/templates/about.tpl.html'
      controller: 'PageController'
    })
    .otherwise({
      redirectTo : '/'
    })
    
    # nice urls thank you
    $locationProvider.html5Mode true
    
    # scroller config
    snSkrollrProvider.config =
      smoothScrolling : true
      smoothScrollingDuration : 500
      scale : 1
      #forceHeight : true
      mobileDeceleration : .004
      constants:
        windowHeight: ()->
          scrollSlideProvider.setWindowHeight window.innerHeight
          return window.innerHeight
    return
  
  ]