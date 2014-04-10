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
        @logger.log("Moved right")
        @checkFinish(position)
        @data.player = position
        radio('renderMoveRight').broadcast(true)
      else
        radio('renderMoveRight').broadcast(false)
      @data.lock = false
root.FEP ?= {}
root.FEP.ATOB = ATOB