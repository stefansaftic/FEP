root = exports ? window
###*
# @module FEP
# @class FInit
###
class FInit
  ###*
  # @method constructor
  # @param {FGame} game Game that needs to be initialized
  # @param {FController} controller Controller or game
  # @param {Object} data Data for init
  ###
  constructor: (@game,@controller,@data) ->
    @frame = 0
    @initGraphics = ()->
      @
    root.FEP.Log = new FEP.FLog(@data.debug)
  ###*
  # Log msg
  # @method log
  # @param {String|Integer|Object} msg Anything to log
  ###
  log: (msg) ->
    if @data.debug
      root.FEP.Log.log msg
  ###*
  # Should be triggered on document ready
  # @method onReady
  ###
  onReady: ()->
    @initGraphics()
    @game.start()
    @loop()
  ###*
  # Loops game on each requestAnimationFrame
  # @method loop
  ###
  loop: ()->
    requestAnimationFrame(@loop.bind(@))
    if (@data.skip isnt 0) && (@data.skip isnt @frame)
      @frame++
    else
      @frame = 0
      @game.loop()
root.FEP ?= {}
root.FEP.FInit = FInit