root = exports ? window
###*
# @module FEP
# @class SNAKE
# @extends ATOB
### 
class SNAKE extends ATOB
  ###*
  # @method constructor
  # @param [Number] debug Is game in debugging mode
  ###
  constructor: (@debug=0) ->
    super(@debug)
  validP: (t)->
    return t>=0 && t<@data.n
  ###*
  # @method validateMove
  # @param {Object} position Is position where we try to move player
  # @return {Boolean} Is it posible to move
  ###
  validateMove: (position)->
    if @data.ground[position.x][position.y] >= 0
      return true
    return false
  loop: ()->
    if @status == 'started'
      position = {x:@data.player.x+@data.direction.x,y:@data.player.y+@data.direction.y}
      if @validP(position.x) && @validP(position.y) && @validateMove(position)
        @move(position)
      else
        @data.direction = {x:0,y:0}
        @end()
  end: ()->
    console.log('GameOver')
    @status = 'ended'
    radio('gameOver').broadcast()
  move: (position)->
    @data.tmpdir = @data.direction
    @log(position)
    if @data.ground[position.x][position.y] > 0
      @data.tailAdd += @data.ground[position.x][position.y] * 2
      window.engine.data.skip -= 1
      @data.score += 100
      radio('renderScore').broadcast(@data.score)
      @generateApple()
    @data.ground[@data.player.x][@data.player.y] = -2
    @data.ground[position.x][position.y] = -1
    @data.tail.push position
    @data.player = position
    if @data.tailAdd is 0
      @data.ground[@data.tail[0].x][@data.tail[0].y] = 0
      @data.tail.shift()
    else
      @data.tailAdd--
    radio('renderAll').broadcast(@data.ground)
  generateApple: () ->
    loop
      x = Math.round(Math.random()*10) % @data.n
      y = Math.round(Math.random()*10) % @data.n
      break if @data.ground[x][y] == 0
    @data.ground[x][y] = 1
  ###*
  # Moves player down
  # @method moveDown
  ###
  moveDown: () ->
    if @data.tmpdir.y isnt -1
      @data.direction = {x:0,y:1}
  ###*
  # Moves player up
  # @method moveUp
  ###
  moveUp: () ->
    if @data.tmpdir.y isnt 1
      @data.direction = {x:0,y:-1}
  ###*
  # Moves player Left
  # @method moveLeft
  ###
  moveLeft: () ->
    if @data.tmpdir.x isnt 1
      @data.direction = {x:-1,y:0}
  ###*
  # Moves player right
  # @method moveRight
  ###
  moveRight: () ->
    if @data.tmpdir.x isnt -1
      @data.direction = {x:1,y:0}
  ###*
  # @method initData
  ###
  initData: () ->
    @data = {
      score: 0,
      ground: [
        [-2,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]],
      player: {x:0,y:0},
      tail: [{x:0,y:0}]
      direction: {x:1,y:0},
      tmpdir: {x:1,y:0}
      tailAdd: 2
      n: 10
    }
root.FEP ?= {}
root.FEP.SNAKE = SNAKE