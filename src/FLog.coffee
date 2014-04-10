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