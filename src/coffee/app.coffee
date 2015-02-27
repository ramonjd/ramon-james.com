RamonJames = angular.module 'ramonJames', [
  'ngRoute'
  'ngAnimate'
  'ngSanitize'
]
###
RamonJames.config [
  '$routeProvider'
  '$locationProvider'
], ($routeProvider, $locationProvider)->
  return
###