root = exports ? window
###*
# Preloads files using createjs PreloadJS
# @module FEP
# @class FPreload
###
class FPreload
  constructor: (filelist, onfileload, oncomplete) ->
    _preload = new root.createjs.LoadQueue()
    _preload.on('fileload', onfileload, this)
    _preload.on('complete', oncomplete, this)
    _preload.loadManifest filelist
    return
root.FEP ?= {}
root.FEP.FPreload = FPreload