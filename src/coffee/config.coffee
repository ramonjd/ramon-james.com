RamonJames.config [
  '$routeProvider'
  '$locationProvider'
  ($routeProvider, $locationProvider)->
    
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
    
    return
  
  ]