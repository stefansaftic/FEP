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
    @mapKeys = {}
    switch @type
      when 'keyboard'
        document.addEventListener("keydown",@trigger.bind(@))
      when 'custom'
        @log('Custom controller')
      else
        @log('Controller type:'+@type+' not implemented')
  ###*
  # Log msg
  # @method log
  # @param {String|Integer|Object} msg Anything to log
  ###
  log: (msg) ->
    if @debug
      root.FEP.Log.log msg
  ###*
  # @method mapKey
  # @param {String} code keyCode that will be maped
  # @param {Function|String} callback function or string that will be executed on trigger
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
          if typeof @mapKeys[event.keyCode] == 'function'
            @mapKeys[event.keyCode]()
          else
            eval(@mapKeys[event.keyCode])
        else
          @log(event.keyCode)
      when 'custom'
        if @mapKeys[event.keyCode]?
          if typeof @mapKeys[event.keyCode] == 'function'
            @mapKeys[event.keyCode]()
          else
            eval(@mapKeys[event.keyCode])
        else
          @log(event.keyCode)
      else
        @log('Controller type:'+@type+' not implemented')
root.FEP ?= {}
root.FEP.FController = FController