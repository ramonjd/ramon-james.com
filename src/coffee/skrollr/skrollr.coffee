'use strict'

###*
# Wrap skrollr.js
# @author SOON_ & ramon-james
# @module ramonjames.skrollr
###

angular.module('ramonjames.skrollr', []).provider('rjSkrollr', ->
  _this = this

  ###*
  # Skrollr initialisation options
  # @property {Object} config
  ###

  @config = {}

  ###*
  # Instance of Skrollr
  # @property {Object}  skrollrInstance
  ###

  @skrollrInstance = {}

  ###*
  # Has the skrollInstance been initialised
  # @property {Boolean} hasBeenInitialised
  ###

  @hasBeenInitialised = false

  ###*
  # Methods returned on rjSkrollr service
  # @property {Object} serviceMethods
  ###

  @serviceMethods = {}

  ###*
  # rjSkroller service
  ###

  @$get = [
    '$window'
    '$document'
    '$rootScope'
    ($window, $document, $rootScope) ->
      _this.serviceMethods =
        init: (config) ->
          if angular.isDefined(config)
            _this.config = config
          if angular.isDefined(_this.config)

            skrollrInit = ->
              _this.skrollrInstance = $window.skrollr.init(_this.config)
              _this.hasBeenInitialised = true
              _this.serviceMethods.refresh()
              return

            $document.ready ->
              if !$rootScope.$$phase
                $rootScope.$apply skrollrInit
              else
                skrollrInit()
              return
          return
        refresh: ->
          if _this.hasBeenInitialised
            _this.skrollrInstance.refresh()
          return
        destroy: ->
          if _this.hasBeenInitialised
            _this.skrollrInstance.destroy()
            _this.hasBeenInitialised = false
          return
      _this.serviceMethods
  ]
  return
).directive 'rjSkrollr', [
  'rjSkrollr'
  (rjSkrollr) ->
    {
      restrict: 'AE'
      link: ($scope, $element) ->
        rjSkrollr.refresh()
        return

    }
]