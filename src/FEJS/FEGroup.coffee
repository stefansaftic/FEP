root = exports ? window
###*
# This is Fora EaselJS Group Class
# 
# @class FEGroup
# @extends FEJS
# @constructor
###
class FEGroup extends FEJS
  constructor: (@name,@data) ->
    super(@name,@data)
  create: () ->
    @graphic = new root.createjs.Container()
    @children = {}
  addChild: (child) ->
    if @children[child.name]?
      @log 'Child with name "'+name+'"" already exist, add impossible'
    @children[child.name] = child
    @graphic.addChild child.graphic
  removeChild: (name) ->
    if @children[name]?
      @graphics.removeChild @children[name]
      delete @children[name]
      return true
    @log 'Child with name "'+name+'"" does not exist, remove impossible'
    return false
  getChild: (name) ->
    if @children[name]?
      return @children[name]
    @log 'Child with name "'+name+'"" does not exist'
    return false

root.FEP ?= {}
root.FEP.FEGroup = FEGroup