root = exports ? window
###*
# This is Fora EaselJS Image Class
# 
# @class FEImage
# @extends FEJS
# @constructor
###
class FEImage extends FEJS
  constructor: (@name,@data) ->
    super(@name,@data)
  create: () ->
    @graphic = new root.createjs.Bitmap(@data.imageUrl)  
    @created = true;
root.FEP ?= {}
root.FEP.FEImage = FEImage