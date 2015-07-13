'use strict'
angular.module('ramonjames')
.directive 'flip', [
  '$timeout'
  ($timeout)->
    {
      restrict : 'A'
      link : (scope, element, attrs)->
        delay = attrs.delay || 250
        $timeout ()->
          element.addClass 'flipInX animated'
          return
        , delay
    }
]