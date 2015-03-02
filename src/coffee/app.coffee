'use strict'
angular.module('ramonjames', [
  'ngRoute'
  'ngAnimate'
  'ngSanitize'
  'ramonjames.skrollr'
  'ramonjames.templates'
])

.config([
  '$routeProvider'
  '$locationProvider'
  'URLS'
  ($routeProvider, $locationProvider, URLS)->

    # routes
    $routeProvider.when('/', {
      templateUrl : 'templates/home.tpl.html'
      controller: 'HomeController'
    })
    .when('/about', {
      templateUrl : 'templates/about.tpl.html'
      controller: 'AboutController'
    })
    .otherwise({
      redirectTo : '/'
    })
    
    # nice urls thank you
    $locationProvider.html5Mode(true).hashPrefix '!'
    
    return
])

.run([() ->
  return
  ])