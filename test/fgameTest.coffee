chai = require 'chai'
spies = require 'chai-spies'
chai.use spies
expect = chai.expect
chai.should()
Promise = require('es6-promise').Promise
{FEP} = require '../src_js/FEP.js'
radio = require 'radio'

describe 'FGame', ->
  game = null
  it 'should exist', ->
    expect(FEP.FGame).to.be.ok
  it 'should set name', ->
    game = new FEP.FGame 'testName', '0.0.1'
    game.name.should.equal 'testName'
  it 'should set version', ->
    game = new FEP.FGame 'testName', '0.0.1'
    game.version.should.equal '0.0.1'
  it 'should init logger', ->
    game = new FEP.FGame 'testName', '0.0.1'
    expect(game.logger).to.be.ok
  it 'should init status', ->
    game = new FEP.FGame 'testName', '0.0.1'
    expect(game.status).to.be.ok
  it 'should set status to created on init', ->
    game = new FEP.FGame 'testName', '0.0.1'
    game.status.should.equal 'created'
  it 'should set status to started on start', ->
    game = new FEP.FGame 'testName', '0.0.1'
    game.start()
    game.status.should.equal 'started'
  it 'should set status to ended on end', ->
    game = new FEP.FGame 'testName', '0.0.1'
    game.end()
    game.status.should.equal 'ended'
  it 'should set status to paused on paused only if started', ->
    game = new FEP.FGame 'testName', '0.0.1'
    game.pause()
    game.status.should.not.equal 'paused'
    game.start()
    game.pause()
    game.status.should.equal 'paused'
  it 'should have initData method', ->
    game = new FEP.FGame 'testName', '0.0.1'
    expect(game.initData).to.be.ok
  it 'should have initied Data after init', ->
    game = new FEP.FGame 'testName', '0.0.1'
    expect(game.data).to.be.ok

describe 'Radio', ->
  it 'should be deffined', ->
    expect(radio).to.be.ok
  it 'should broadcast', ->
    spy = chai.spy()
    radio('test').subscribe(spy)
    radio('test').broadcast('test')
    expect(spy).to.have.been.called()

describe 'FLog', ->
  log = null
  it 'should exist',->
    expect(FEP.FLog).to.be.ok
describe 'FController', ->
  controller = null
  it 'should exist',->
    expect(FEP.FController).to.be.ok
  it 'mapKeys should be empty on create', ->
    controller = new FEP.FController('custom',1)
    expect(controller.mapKeys).to.be.a('object')
    expect(controller.mapKeys).to.empty
  it 'mapKey function to code 01', ->
    controller = new FEP.FController('custom',1)
    spy = chai.spy()
    controller.mapKey(1,spy)
    controller.trigger({keyCode:1})
    expect(spy).to.have.been.called()
  ###
  # should test custom logger not console.log
  it 'should send to console',->
    console.log = chai.spy()
    log = new FLog(1)
    log.log('test')
    expect(console.log).to.have.been.called()
  ###