root = exports ? window
###*
# @module FEP
# @class FInit
# @constructor
# @param {String} name Name of the game
# @param {String} version Version of the game (0.0.x)
# @param {Number} debug Is game in debugging mode
###
class FInit
  constructor: (@game,@controller,@data) ->
    @frame = 0
  onReady: ()->
    @game.start()
    @loop()
  loop: ()->
    requestAnimationFrame(@loop.bind(@))
    if (@data.skip isnt 0) && (@data.skip isnt @frame)
      @frame++
    else
      @frame = 0
      @game.loop()
root.FEP ?= {}
root.FEP.FInit = FInit