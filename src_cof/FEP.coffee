root = exports ? window
###*
# @module FEP
# @class FLog
### 
class FLog
  constructor: (@debug)->
  ###*
  # @method log
  # @param data {Object | Integer | String | Array}
  ###
  log: (data)->
    if @debug isnt 0
      if console? then console.log data
      else if alert? then alert data
root.FEP ?= {}
root.FEP.FLog = FLog
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
    # @property logger
    # @type FLog
    ###
    @logger = new FLog(@debug)
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
        @logger.log('Paused while game status is: '+@status)
  ###*
  # Init all data for game, override this method when you extend this class
  # @method initData
  ###
  initData: () ->
    @data = {}
root.FEP ?= {}
root.FEP.FGame = FGame
root = exports ? window
###*
# @module FEP
# @class FController
### 
class FController
  ###*
  # @method constructor
  # @param {String} type Type of controller
  # @param {Number} debug Is game in debugging mode
  ###
  constructor: (@type, @debug)->
    @logger = new FLog(@debug)
    @mapKeys = {}
    switch @type
      when 'keyboard'
        document.addEventListener("keydown",@trigger.bind(@))
      when 'custom'
        @logger.log('Custom controller')
      else
        @logger.log('Controller type:'+@type+' not implemented')
  ###*
  # @method mapKey
  # @param {String} code keyCode that will be maped
  # @param {Function} callback function that will be triggered
  ###
  mapKey: (code,callback)->
    @mapKeys[code] = callback
  ###*
  # @method unmapkey
  # @param {String} code keyCode that will be unmaped
  ###
  unmapKey: (code)->
    if @mapKeys[code]?
      delete @mapKeys[code]
  ###*
  # @method trigger
  # @param {Object} event
  # @example 
  # controller.event({ keyCode: '32' })
  ###
  trigger: (event)->
    switch @type
      when 'keyboard'
        if @mapKeys[event.keyCode]?
          @mapKeys[event.keyCode]()
        else
          @logger.log(event.keyCode)
      when 'custom'
        if @mapKeys[event.keyCode]?
          @mapKeys[event.keyCode]()
        else
          @logger.log(event.keyCode)
      else
        @logger.log('Controller type:'+@type+' not implemented')
root.FEP ?= {}
root.FEP.FController = FController
root = exports ? window
###*
# @module FEP
# @class ATOB
### 
class ATOB extends FGame
  ###*
  # @method constructor
  # @param [Number] debug Is game in debugging mode
  ###
  constructor: (@debug=0) ->
    super("ATOB","1.0",@debug)
  ###*
  # @method initData
  ###
  initData: () ->
    @data = {
      score: 0,
      ground: [[0,0,0,0],
               [0,1,0,0],
               [0,1,0,0],
               [0,0,0,-2]],
      player: {x:0,y:0},
      lock: false,
      n: 4
    }
  ###*
  # @method start
  ###
  start: () ->
    super()
    radio('render').broadcast(@data.ground)
    radio('renderPlayer').broadcast(@data.player)
    @logger.log("Game ATOB started")
    radio('moveUp').subscribe([@moveUp,@])
    radio('moveDown').subscribe([@moveDown,@])
    radio('moveLeft').subscribe([@moveLeft,@])
    radio('moveRight').subscribe([@moveRight,@])
  ###*
  # @method validateMove
  # @param {Object} position Is position where we try to move player
  # @return {Boolean} Is it posible to move
  ###
  validateMove: (position)->
    if @data.ground[position.x][position.y] <= 0
      return true
    return false
  ###*
  # @method checkFinish
  # @param {Object} position
  ###
  checkFinish: (position)->
    if @data.ground[position.x][position.y] is -2
      @end()
  ###*
  # Moves player down
  # @method moveDown
  ###
  moveDown: () ->
    if @data.lock is not true && @data.n > (@data.player.x + 1)
      @data.lock = true
      position = {x:@data.player.x,y:@data.player.y}
      position.x++
      if @validateMove(position)
        @checkFinish(position)
        @data.player = position
        radio('renderMoveDown').broadcast(true)
      else
        radio('renderMoveDown').broadcast(false)
      @data.lock = false
  ###*
  # Moves player up
  # @method moveUp
  ###
  moveUp: () ->
    if @data.lock is not true && 0 <= (@data.player.x - 1)
      @data.lock = true
      position = {x:@data.player.x,y:@data.player.y}
      position.x--
      if @validateMove(position)
        @checkFinish(position)
        @data.player = position
        radio('renderMoveUp').broadcast(true)
      else
        radio('renderMoveUp').broadcast(false)
      @data.lock = false
  ###*
  # Moves player Left
  # @method moveLeft
  ###
  moveLeft: () ->
    if @data.lock is not true && 0 <= (@data.player.y - 1)
      @data.lock = true
      position = {x:@data.player.x,y:@data.player.y}
      position.y--
      if @validateMove(position)
        @checkFinish(position)
        @data.player = position
        radio('renderMoveLeft').broadcast(true)
      else
        radio('renderMoveLeft').broadcast(false)
      @data.lock = false
  ###*
  # Moves player right
  # @method moveRight
  ###
  moveRight: () ->
    if @data.lock is not true && @data.n > (@data.player.y + 1)
      @data.lock = true
      position = {x:@data.player.x,y:@data.player.y}
      position.y++
      if @validateMove(position)
        @checkFinish(position)
        @data.player = position
        radio('renderMoveRight').broadcast(true)
      else
        radio('renderMoveRight').broadcast(false)
      @data.lock = false
root.FEP ?= {}
root.FEP.ATOB = ATOB
