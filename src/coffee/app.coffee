'use strict'
angular.module('ramonjames', [
  'ngRoute'
  'ngAnimate'
  'ngSanitize'
  'ramonjames.skrollr'
])

.config([
  '$routeProvider'
  '$locationProvider'
  'URLS'
  ($routeProvider, $locationProvider, URLS)->
    
    console.log 'URL constants', URLS
    
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
])

.run([() ->
  return
  ])