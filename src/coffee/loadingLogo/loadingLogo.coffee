'use strict'
angular.module('ramonjames')
  .service('loadingLogoService', [
    '$timeout'
    ($timeout)->
      @loadingLogo = null
      @isLoading = false
      loadingLoop = null
      @setLoadingLogo = (id)=>
        @loadingLogo = new Vivus id, {type: 'oneByOne', start: 'manual', duration: 100, forceRender: false}
      @stop = ()=>
        @rewind()
      @rewind = ()=>
        @loadingLogo.play -3
        @loadingLogo.stop()
        $timeout.cancel loadingLoop
        @isLoading = false
      @loop = ()=>
        @loadingLogo.reset()
        @loadingLogo.play()
        loadingLoop = $timeout ()=>
          @loop()
        ,2000
      @play = ()=>
        @loop()
        @isLoading = true
      @
  ])
  .directive('loadingLogo', [
    'loadingLogoService'
    (loadingLogoService)->
      restrict : 'A'
      replace : false
      scope:
        loading: '=loading'
      template : "<svg version='1.1' id='svg-logo' x='0px' y='0px' width='1024px' height='768px' viewBox='0 0 1024 768' style='enable-background:new 0 0 1024 768;' preserveAspectRatio=''>
                <title>Ramon James logo</title>
                <desc>Vitruvian man stick figure</desc>
                <g class='svg-grey-bg-man'>
                    <line id='grey-left-leg' class='grey-bg-man' x1='494.5' y1='360' x2='494.5' y2='506'/>
                    <line id='grey-right-leg' class='grey-bg-man' x1='530.5' y1='365' x2='530.5' y2='502'/>
                    <line id='grey-right-arm' class='grey-bg-man' x1='508.6' y1='380.5' x2='590.8' y2='298.4'/>
                    <line id='grey-left-arm' class='grey-bg-man' x1='515.5' y1='380.5' x2='429.5' y2='294.6'/>
                </g>
                <g class='svg-black-fg-man'>
                    <line id='left-leg' class='black-fg-man' x1='530.6' y1='358.6' x2='419' y2='470.2'/>
                    <line id='right-leg' class='black-fg-man' x1='494.5' y1='359.6' x2='604.1' y2='469.2'/>
                    <line id='arms' class='black-fg-man' x1='397' y1='372.5' x2='627' y2='372.5'/>
                    <circle id='head' class='black-fg-man' cx='512.1' cy='321' r='34.4'/>
                    <circle id='outer_rim' class='black-fg-man' cx='512' cy='384.6' r='122.4'/>
                </g>
            </svg>
            <p>Loading</p>"
      link : ($scope, $element, $attrs)->
        loadingLogoService.setLoadingLogo 'svg-logo'
        return
  ])