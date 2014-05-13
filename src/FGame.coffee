root = exports ? window
###*
# @module FEP
# @class FGame
# @constructor
# @param {String} name Name of the game
# @param {String} version Version of the game (0.0.x)
# @param {Number} debug Is game in debugging mode
###
class FGame
  constructor: (@name,@version,@debug=0) ->
    ###*
    # @property status
    # @type String
    ###
    @status = 'created'
    @initData()
  ###*
  # Log msg
  # @method log
  # @param {String|Integer|Object} msg Anything to log
  ###
  log: (msg) ->
    if @debug
      root.FEP.Log.log msg
  ###*
  # Start the game
  # @method start
  # @example 
  #   set status to 'started'
  ###
  start: () ->
    @status = 'started'
  ###*
  # Ends the game
  # @method end
  # @example 
  #   set status to 'ended'
  ###
  end: () ->
    @status = 'ended'
  ###*
  # Pause the game
  # @method pause
  ###
  pause: () ->
    if @status is 'started'
      @status = 'paused'
    else
      if @status is 'paused'
        @status = 'started'
      else
        @log('Paused while game status is: '+@status)
  ###*
  # Init all data for game, override this method when you extend this class
  # @method initData
  ###
  initData: () ->
    @data = {}
root.FEP ?= {}
root.FEP.FGame = FGame