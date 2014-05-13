root = exports ? window
###*
# This is Fora EaselJS Class
# 
# @class FEJS
# @extends FVisual
# @constructor
###
class FEJS extends FVisual
  constructor: (@name,@data) ->
    super(@name,@data)
  ###*
  # It add Object to Stage at next postion if indexAt is not provided
  # @method showOnStage
  # @param {Stage} stage - CreateJS stage object
  # @param {Integer} [indexAt] - position for stage child
  # @return {Boolean} error message in console and false if there is some error else it returns true which means it success.
  ###
  showOnStage: (stage,indexAt) ->
    if !@graphic?
      @log "Graphic object not created"
      return false
    if @onStage
      @log "Object is already on stage"
      return false
    indexAt ?= stage.getNumChildren()
    @index = indexAt
    @onStage = true
    stage.addChildAt(@graphic,@index)
    return true
  ###*
  # It add 1st Object to Stage before 2nd Object
  # @method showOnStageBefore
  # @param {FEJS} object - Referent object
  # @param {Stage} stage - CreateJS stage object
  # @return {Boolean} error message in console and false if there is some error else it returns true which means it success.
  ###
  showOnStageBefore: (object,stage) ->
    tmp = object.index
    @showOnStage stage, tmp

  ###*
  # It add 1st Object to Stage after 2nd Object
  # @method showOnStageAfter
  # @param {FEJS} object - Referent object
  # @param {Stage} stage - CreateJS stage object
  # @return {Boolean} error message in console and false if there is some error else it returns true which means it success.
  ###
  showOnStageAfter: (object,stage) ->
    tmp = object.index + 1
    @showOnStage stage, tmp

  ###*
  # It removes Object from Stage
  # @method removeObjectFromStage
  # @param {Stage} stage - CreateJS stage object
  # @return {Boolean} error message in console and false if there is some error else it returns true which means it success.
  ###
  hideFromStage: (stage) ->
    if @onStage
      stage.removeChildAt @index
      @onStage = false
      return true
    @log "Object is not on stage"
    return false
  cache: (x, y, width, height, scale) -> 
    scale ?= 1
    @cached = true;
    @data.cache = {
      'x' : x,
      'y' : y,
      'width' : width,
      'height' : height,
      'scale' : scale,
    }
    @graphic.cache(x,y,width, height, scale)
  cloneGraphic: ()->
    @graphic.clone()
  getCacheDataURL: ()->
    @graphic.getCacheDataURL()
  getStage: ()->
    @graphic.getStage()
  getTransformedBound: ()->
    @graphic.getTransformedBound()
  globalToLocal: (x,y)->
    @graphic.globalToLocal(x,y)
  hasEventListener: (type)->
    @graphic.hasEventListener(type)
  hitTest: (x,y)->
    @graphic.hitTest(x,y)
  localToGlobal: (x,y)->
    @graphic.localToGlobal(x,y)
  off: (type, listener, useCapture)->
    if useCapture?
      @graphic.off(type,listener,useCapture)
    else
      @graphic.off(type,listener)
  on: (type,listener,scope,once,data,useCapture)->
      useCapture ?= false
      @graphic.on(type,listener,scope,once,data,useCapture)
  removeAllEventListeners: (type)->
    if type?
      @graphic.removeAllEventListeners(type)
    else
      @graphic.removeAllEventListeners()
  setGraphicProps: (props)->
    @graphic.set(props)
  setBounds: (x,y,width,height)->
    @graphic.setBounds(x,y,width,height)
  setTransform: (x,y,scaleX,scaleY,rotation,skewX,skewY,regX,regY)->
    x ?= 0
    y ?= 0
    scaleX ?= 1
    scaleY ?= 1
    rotation ?= 0
    skewX ?= 0
    skewY ?= 0
    regX ?= 0
    regY ?= 0
    @graphic.setTransform(x,y,scaleX,scaleY,rotation,skewX,skewY,regX,regY)
  uncache: ()->
    @cached = false
    delete @data.cache
    @graphic.uncache()
  updateCache: (compositeOperation)->
    if @cached
      @graphic.updateCache(compositeOperation)
    else
      @log "No cache available"
  setGraphic: (key,value)->
    @graphic[key] = value
    @
  getGraphic: (key)->
    @graphic[key]

root.FEP ?= {}
root.FEP.FEJS = FEJS