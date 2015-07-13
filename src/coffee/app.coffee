'use strict'
angular.module('ramonjames', [
  'ngRoute'
  'ngAnimate'
  'ngSanitize'
  'ramonjames.skrollr'
  'ramonjames.templates',
  'ramonjames.constants'
])
.config([
  '$routeProvider'
  '$locationProvider'
  ($routeProvider, $locationProvider)->
    # routes
    $routeProvider.when('/', {
      templateUrl : 'templates/home.tpl.html'
      controller: 'HomeController'
      controllerAs: 'home'
    })
    .when('/about', {
      templateUrl : 'templates/about.tpl.html'
      controller: 'AboutController'
      controllerAs: 'about'
    })
    .when('/blog', {
      templateUrl : 'templates/blog.tpl.html'
      controller: 'BlogController'
      controllerAs: 'blog'
    })
    .when('/contact', {
        templateUrl : 'templates/contact.tpl.html'
        controller: 'ContactController'
        controllerAs: 'contact'
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