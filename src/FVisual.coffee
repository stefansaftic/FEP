root = exports ? window
###*
# Abstract class that should be used for EaselJS, ThreeJS or other framework DisplayObject
# @module FEP
# @class FVisual
###
class FVisual
  ###*
  # @method constructor
  # @param {String} game Game that needs to be initialized
  # @param {Object} data Data of visual
  ###
  constructor: (@name,@data) ->
    @created = false
    @onStage = false
    @events = []
    @graphic = null
    @id = @name + @_guid()
    @create()
  ###*
  # Clone FVisual object
  # @method clone
  ###
  clone: () ->
    tmp = new @(@name,@data)
    return tmp
  ###*
  # Log msg
  # @method log
  # @param {String|Integer|Object} msg Anything to log
  ###
  log: (msg) ->
    if @data.debug
      root.FEP.Log.log msg
  ###*
  # Generates GUID private method
  # @method _guid
  # @return {String} GUID
  ###
  _guid: () ->
    return 'blah'
  ###*
  # Creates graphical object
  # @method create
  ###
  create: ()->
    throw new Error('Please override create method wich will store DisplayObject to @graphic')
    @created = true
  ###*
  # Adds object to stage
  # @method showOnStage
  # @param {Object} stage Stage where object will be added
  ###
  showOnStage: (stage)->
    throw new Error('Please override showOnStage method wich will add @graphic to stage')
  ###*
  # Adds object to stage in back of object
  # @method showOnStageBefore
  # @param {Object} stage Stage where object will be added
  # @param {Object} object relative object on Stage
  ###
  showOnStageBefore: (stage,object)->
    throw new Error('Please override showOnStageBefore method wich will add @graphic before object to stage')
  ###*
  # Adds object to stage in front of object
  # @method showOnStageAfter
  # @param {Object} stage Stage where object will be added
  # @param {Object} object relative object on Stage
  ###
  showOnStageAfter: (stage,object)->
    throw new Error('Please override showOnStageAfter method wich will add @graphic after object to stage')
  ###*
  # Removes object from stage
  # @method showOnStage
  # @param {Object} stage Stage where object will be added
  ###
  hideFromStage: (stage)->
    throw new Error('Please override hideFromStage method wich will remove @data.object to stage')
root.FEP ?= {}
root.FEP.FVisual = FVisual