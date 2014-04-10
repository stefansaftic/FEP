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