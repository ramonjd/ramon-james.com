'use strict'
angular.module('ramonjames')
  .controller 'HomeController', [
     '$scope'
     '$controller'
     'RestService'
     '$anchorScroll'
     'rjSkrollr'
     '$timeout'
    ($scope, $controller, RestService, $anchorScroll, rjSkrollr, $timeout)->
      $anchorScroll 'top'
      RestService.getPage('home').success (response)->
        $scope.author = response.author
        $scope.heading = response.title
        $scope.content = response.content
        # set up swiper
        $scope.swiper = new Swiper('.swiper-container', {
          #pagination: '.swiper-pagination'
          #paginationClickable: true
          #nextButton: '.swiper-button-next'
          #prevButton: '.swiper-button-prev'
          slidesPerView: 1
          #paginationClickable: true
          #spaceBetween: 30
          #loop: true
          #parallax: true,
          #speed: 600
          pagination: '.swiper-pagination'
          paginationClickable: true
          nextButton: '.swiper-button-next'
          prevButton: '.swiper-button-prev'
          parallax: true
          speed: 600
        })
        $timeout ()->
          rjSkrollr.refresh()
        , 500
      $scope.$on 'windowHeight', (e, data)->
        if $scope.swiper
         $scope.swiper.update()
      return
  ]