(function() {
  var ATOB, FController, FEGroup, FEImage, FEJS, FGame, FInit, FLog, FPreload, FVisual, SNAKE, root,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = typeof exports !== "undefined" && exports !== null ? exports : window;


  /**
   * Abstract class that should be used for EaselJS, ThreeJS or other framework DisplayObject
   * @module FEP
   * @class FVisual
   */

  FVisual = (function() {

    /**
     * @method constructor
     * @param {String} game Game that needs to be initialized
     * @param {Object} data Data of visual
     */
    function FVisual(name, data) {
      this.name = name;
      this.data = data;
      this.created = false;
      this.onStage = false;
      this.events = [];
      this.graphic = null;
      this.id = this.name + this._guid();
      this.create();
    }


    /**
     * Clone FVisual object
     * @method clone
     */

    FVisual.prototype.clone = function() {
      var tmp;
      tmp = new this(this.name, this.data);
      return tmp;
    };


    /**
     * Log msg
     * @method log
     * @param {String|Integer|Object} msg Anything to log
     */

    FVisual.prototype.log = function(msg) {
      if (this.data.debug) {
        return root.FEP.Log.log(msg);
      }
    };


    /**
     * Generates GUID private method
     * @method _guid
     * @return {String} GUID
     */

    FVisual.prototype._guid = function() {
      return 'blah';
    };


    /**
     * Creates graphical object
     * @method create
     */

    FVisual.prototype.create = function() {
      throw new Error('Please override create method wich will store DisplayObject to @graphic');
      return this.created = true;
    };


    /**
     * Adds object to stage
     * @method showOnStage
     * @param {Object} stage Stage where object will be added
     */

    FVisual.prototype.showOnStage = function(stage) {
      throw new Error('Please override showOnStage method wich will add @graphic to stage');
    };


    /**
     * Adds object to stage in back of object
     * @method showOnStageBefore
     * @param {Object} stage Stage where object will be added
     * @param {Object} object relative object on Stage
     */

    FVisual.prototype.showOnStageBefore = function(stage, object) {
      throw new Error('Please override showOnStageBefore method wich will add @graphic before object to stage');
    };


    /**
     * Adds object to stage in front of object
     * @method showOnStageAfter
     * @param {Object} stage Stage where object will be added
     * @param {Object} object relative object on Stage
     */

    FVisual.prototype.showOnStageAfter = function(stage, object) {
      throw new Error('Please override showOnStageAfter method wich will add @graphic after object to stage');
    };


    /**
     * Removes object from stage
     * @method showOnStage
     * @param {Object} stage Stage where object will be added
     */

    FVisual.prototype.hideFromStage = function(stage) {
      throw new Error('Please override hideFromStage method wich will remove @data.object to stage');
    };

    return FVisual;

  })();

  if (root.FEP == null) {
    root.FEP = {};
  }

  root.FEP.FVisual = FVisual;

  root = typeof exports !== "undefined" && exports !== null ? exports : window;


  /**
   * This is Fora EaselJS Class
   * 
   * @class FEJS
   * @extends FVisual
   * @constructor
   */

  FEJS = (function(_super) {
    __extends(FEJS, _super);

    function FEJS(name, data) {
      this.name = name;
      this.data = data;
      FEJS.__super__.constructor.call(this, this.name, this.data);
    }


    /**
     * It add Object to Stage at next postion if indexAt is not provided
     * @method showOnStage
     * @param {Stage} stage - CreateJS stage object
     * @param {Integer} [indexAt] - position for stage child
     * @return {Boolean} error message in console and false if there is some error else it returns true which means it success.
     */

    FEJS.prototype.showOnStage = function(stage, indexAt) {
      if (this.graphic == null) {
        this.log("Graphic object not created");
        return false;
      }
      if (this.onStage) {
        this.log("Object is already on stage");
        return false;
      }
      if (indexAt == null) {
        indexAt = stage.getNumChildren();
      }
      this.index = indexAt;
      this.onStage = true;
      stage.addChildAt(this.graphic, this.index);
      return true;
    };


    /**
     * It add 1st Object to Stage before 2nd Object
     * @method showOnStageBefore
     * @param {FEJS} object - Referent object
     * @param {Stage} stage - CreateJS stage object
     * @return {Boolean} error message in console and false if there is some error else it returns true which means it success.
     */

    FEJS.prototype.showOnStageBefore = function(object, stage) {
      var tmp;
      tmp = object.index;
      return this.showOnStage(stage, tmp);
    };


    /**
     * It add 1st Object to Stage after 2nd Object
     * @method showOnStageAfter
     * @param {FEJS} object - Referent object
     * @param {Stage} stage - CreateJS stage object
     * @return {Boolean} error message in console and false if there is some error else it returns true which means it success.
     */

    FEJS.prototype.showOnStageAfter = function(object, stage) {
      var tmp;
      tmp = object.index + 1;
      return this.showOnStage(stage, tmp);
    };


    /**
     * It removes Object from Stage
     * @method removeObjectFromStage
     * @param {Stage} stage - CreateJS stage object
     * @return {Boolean} error message in console and false if there is some error else it returns true which means it success.
     */

    FEJS.prototype.hideFromStage = function(stage) {
      if (this.onStage) {
        stage.removeChildAt(this.index);
        this.onStage = false;
        return true;
      }
      this.log("Object is not on stage");
      return false;
    };

    FEJS.prototype.cache = function(x, y, width, height, scale) {
      if (scale == null) {
        scale = 1;
      }
      this.cached = true;
      this.data.cache = {
        'x': x,
        'y': y,
        'width': width,
        'height': height,
        'scale': scale
      };
      return this.graphic.cache(x, y, width, height, scale);
    };

    FEJS.prototype.cloneGraphic = function() {
      return this.graphic.clone();
    };

    FEJS.prototype.getCacheDataURL = function() {
      return this.graphic.getCacheDataURL();
    };

    FEJS.prototype.getStage = function() {
      return this.graphic.getStage();
    };

    FEJS.prototype.getTransformedBound = function() {
      return this.graphic.getTransformedBound();
    };

    FEJS.prototype.globalToLocal = function(x, y) {
      return this.graphic.globalToLocal(x, y);
    };

    FEJS.prototype.hasEventListener = function(type) {
      return this.graphic.hasEventListener(type);
    };

    FEJS.prototype.hitTest = function(x, y) {
      return this.graphic.hitTest(x, y);
    };

    FEJS.prototype.localToGlobal = function(x, y) {
      return this.graphic.localToGlobal(x, y);
    };

    FEJS.prototype.off = function(type, listener, useCapture) {
      if (useCapture != null) {
        return this.graphic.off(type, listener, useCapture);
      } else {
        return this.graphic.off(type, listener);
      }
    };

    FEJS.prototype.on = function(type, listener, scope, once, data, useCapture) {
      if (useCapture == null) {
        useCapture = false;
      }
      return this.graphic.on(type, listener, scope, once, data, useCapture);
    };

    FEJS.prototype.removeAllEventListeners = function(type) {
      if (type != null) {
        return this.graphic.removeAllEventListeners(type);
      } else {
        return this.graphic.removeAllEventListeners();
      }
    };

    FEJS.prototype.setGraphicProps = function(props) {
      return this.graphic.set(props);
    };

    FEJS.prototype.setBounds = function(x, y, width, height) {
      return this.graphic.setBounds(x, y, width, height);
    };

    FEJS.prototype.setTransform = function(x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      if (scaleX == null) {
        scaleX = 1;
      }
      if (scaleY == null) {
        scaleY = 1;
      }
      if (rotation == null) {
        rotation = 0;
      }
      if (skewX == null) {
        skewX = 0;
      }
      if (skewY == null) {
        skewY = 0;
      }
      if (regX == null) {
        regX = 0;
      }
      if (regY == null) {
        regY = 0;
      }
      return this.graphic.setTransform(x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY);
    };

    FEJS.prototype.uncache = function() {
      this.cached = false;
      delete this.data.cache;
      return this.graphic.uncache();
    };

    FEJS.prototype.updateCache = function(compositeOperation) {
      if (this.cached) {
        return this.graphic.updateCache(compositeOperation);
      } else {
        return this.log("No cache available");
      }
    };

    FEJS.prototype.setGraphic = function(key, value) {
      this.graphic[key] = value;
      return this;
    };

    FEJS.prototype.getGraphic = function(key) {
      return this.graphic[key];
    };

    return FEJS;

  })(FVisual);

  if (root.FEP == null) {
    root.FEP = {};
  }

  root.FEP.FEJS = FEJS;

  root = typeof exports !== "undefined" && exports !== null ? exports : window;


  /**
   * This is Fora EaselJS Image Class
   * 
   * @class FEImage
   * @extends FEJS
   * @constructor
   */

  FEImage = (function(_super) {
    __extends(FEImage, _super);

    function FEImage(name, data) {
      this.name = name;
      this.data = data;
      FEImage.__super__.constructor.call(this, this.name, this.data);
    }

    FEImage.prototype.create = function() {
      this.graphic = new root.createjs.Bitmap(this.data.imageUrl);
      return this.created = true;
    };

    return FEImage;

  })(FEJS);

  if (root.FEP == null) {
    root.FEP = {};
  }

  root.FEP.FEImage = FEImage;

  root = typeof exports !== "undefined" && exports !== null ? exports : window;


  /**
   * This is Fora EaselJS Group Class
   * 
   * @class FEGroup
   * @extends FEJS
   * @constructor
   */

  FEGroup = (function(_super) {
    __extends(FEGroup, _super);

    function FEGroup(name, data) {
      this.name = name;
      this.data = data;
      FEGroup.__super__.constructor.call(this, this.name, this.data);
    }

    FEGroup.prototype.create = function() {
      this.graphic = new root.createjs.Container();
      return this.children = {};
    };

    FEGroup.prototype.addChild = function(child) {
      if (this.children[child.name] != null) {
        this.log('Child with name "' + name + '"" already exist, add impossible');
      }
      this.children[child.name] = child;
      return this.graphic.addChild(child.graphic);
    };

    FEGroup.prototype.removeChild = function(name) {
      if (this.children[name] != null) {
        this.graphics.removeChild(this.children[name]);
        delete this.children[name];
        return true;
      }
      this.log('Child with name "' + name + '"" does not exist, remove impossible');
      return false;
    };

    FEGroup.prototype.getChild = function(name) {
      if (this.children[name] != null) {
        return this.children[name];
      }
      this.log('Child with name "' + name + '"" does not exist');
      return false;
    };

    return FEGroup;

  })(FEJS);

  if (root.FEP == null) {
    root.FEP = {};
  }

  root.FEP.FEGroup = FEGroup;

  root = typeof exports !== "undefined" && exports !== null ? exports : window;


  /**
   * @module FEP
   * @class FGame
   * @constructor
   * @param {String} name Name of the game
   * @param {String} version Version of the game (0.0.x)
   * @param {Number} debug Is game in debugging mode
   */

  FGame = (function() {
    function FGame(name, version, debug) {
      this.name = name;
      this.version = version;
      this.debug = debug != null ? debug : 0;

      /**
       * @property status
       * @type String
       */
      this.status = 'created';
      this.initData();
    }


    /**
     * Log msg
     * @method log
     * @param {String|Integer|Object} msg Anything to log
     */

    FGame.prototype.log = function(msg) {
      if (this.debug) {
        return root.FEP.Log.log(msg);
      }
    };


    /**
     * Start the game
     * @method start
     * @example 
     *   set status to 'started'
     */

    FGame.prototype.start = function() {
      return this.status = 'started';
    };


    /**
     * Ends the game
     * @method end
     * @example 
     *   set status to 'ended'
     */

    FGame.prototype.end = function() {
      return this.status = 'ended';
    };


    /**
     * Pause the game
     * @method pause
     */

    FGame.prototype.pause = function() {
      if (this.status === 'started') {
        return this.status = 'paused';
      } else {
        if (this.status === 'paused') {
          return this.status = 'started';
        } else {
          return this.log('Paused while game status is: ' + this.status);
        }
      }
    };


    /**
     * Init all data for game, override this method when you extend this class
     * @method initData
     */

    FGame.prototype.initData = function() {
      return this.data = {};
    };

    return FGame;

  })();

  if (root.FEP == null) {
    root.FEP = {};
  }

  root.FEP.FGame = FGame;

  root = typeof exports !== "undefined" && exports !== null ? exports : window;


  /**
   * @module FEP
   * @class ATOB
   * @extends FGame
   */

  ATOB = (function(_super) {
    __extends(ATOB, _super);


    /**
     * @method constructor
     * @param [Number] debug Is game in debugging mode
     */

    function ATOB(debug) {
      this.debug = debug != null ? debug : 0;
      ATOB.__super__.constructor.call(this, "ATOB", "1.0", this.debug);
    }


    /**
     * @method initData
     */

    ATOB.prototype.initData = function() {
      return this.data = {
        score: 0,
        ground: [[0, 0, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, -2]],
        player: {
          x: 0,
          y: 0
        },
        lock: false,
        n: 4
      };
    };


    /**
     * @method start
     */

    ATOB.prototype.start = function() {
      ATOB.__super__.start.call(this);
      radio('render').broadcast(this.data.ground);
      radio('renderPlayer').broadcast(this.data.player);
      this.log("Game ATOB started");
      radio('moveUp').subscribe([this.moveUp, this]);
      radio('moveDown').subscribe([this.moveDown, this]);
      radio('moveLeft').subscribe([this.moveLeft, this]);
      return radio('moveRight').subscribe([this.moveRight, this]);
    };


    /**
     * @method validateMove
     * @param {Object} position Is position where we try to move player
     * @return {Boolean} Is it posible to move
     */

    ATOB.prototype.validateMove = function(position) {
      if (this.data.ground[position.x][position.y] <= 0) {
        return true;
      }
      return false;
    };


    /**
     * @method checkFinish
     * @param {Object} position
     */

    ATOB.prototype.checkFinish = function(position) {
      if (this.data.ground[position.x][position.y] === -2) {
        return this.end();
      }
    };


    /**
     * Moves player down
     * @method moveDown
     */

    ATOB.prototype.moveDown = function() {
      var position;
      if (this.data.lock === !true && this.data.n > (this.data.player.x + 1)) {
        this.data.lock = true;
        position = {
          x: this.data.player.x,
          y: this.data.player.y
        };
        position.x++;
        if (this.validateMove(position)) {
          this.checkFinish(position);
          this.data.player = position;
          radio('renderMoveDown').broadcast(true);
        } else {
          radio('renderMoveDown').broadcast(false);
        }
        return this.data.lock = false;
      }
    };


    /**
     * Moves player up
     * @method moveUp
     */

    ATOB.prototype.moveUp = function() {
      var position;
      if (this.data.lock === !true && 0 <= (this.data.player.x - 1)) {
        this.data.lock = true;
        position = {
          x: this.data.player.x,
          y: this.data.player.y
        };
        position.x--;
        if (this.validateMove(position)) {
          this.checkFinish(position);
          this.data.player = position;
          radio('renderMoveUp').broadcast(true);
        } else {
          radio('renderMoveUp').broadcast(false);
        }
        return this.data.lock = false;
      }
    };


    /**
     * Moves player Left
     * @method moveLeft
     */

    ATOB.prototype.moveLeft = function() {
      var position;
      if (this.data.lock === !true && 0 <= (this.data.player.y - 1)) {
        this.data.lock = true;
        position = {
          x: this.data.player.x,
          y: this.data.player.y
        };
        position.y--;
        if (this.validateMove(position)) {
          this.checkFinish(position);
          this.data.player = position;
          radio('renderMoveLeft').broadcast(true);
        } else {
          radio('renderMoveLeft').broadcast(false);
        }
        return this.data.lock = false;
      }
    };


    /**
     * Moves player right
     * @method moveRight
     */

    ATOB.prototype.moveRight = function() {
      var position;
      if (this.data.lock === !true && this.data.n > (this.data.player.y + 1)) {
        this.data.lock = true;
        position = {
          x: this.data.player.x,
          y: this.data.player.y
        };
        position.y++;
        if (this.validateMove(position)) {
          this.checkFinish(position);
          this.data.player = position;
          radio('renderMoveRight').broadcast(true);
        } else {
          radio('renderMoveRight').broadcast(false);
        }
        return this.data.lock = false;
      }
    };

    return ATOB;

  })(FGame);

  if (root.FEP == null) {
    root.FEP = {};
  }

  root.FEP.ATOB = ATOB;

  root = typeof exports !== "undefined" && exports !== null ? exports : window;


  /**
   * @module FEP
   * @class SNAKE
   * @extends ATOB
   */

  SNAKE = (function(_super) {
    __extends(SNAKE, _super);


    /**
     * @method constructor
     * @param [Number] debug Is game in debugging mode
     */

    function SNAKE(debug) {
      this.debug = debug != null ? debug : 0;
      SNAKE.__super__.constructor.call(this, this.debug);
    }

    SNAKE.prototype.validP = function(t) {
      return t >= 0 && t < this.data.n;
    };


    /**
     * @method validateMove
     * @param {Object} position Is position where we try to move player
     * @return {Boolean} Is it posible to move
     */

    SNAKE.prototype.validateMove = function(position) {
      if (this.data.ground[position.x][position.y] >= 0) {
        return true;
      }
      return false;
    };

    SNAKE.prototype.loop = function() {
      var position;
      if (this.status === 'started') {
        position = {
          x: this.data.player.x + this.data.direction.x,
          y: this.data.player.y + this.data.direction.y
        };
        if (this.validP(position.x) && this.validP(position.y) && this.validateMove(position)) {
          return this.move(position);
        } else {
          this.data.direction = {
            x: 0,
            y: 0
          };
          return this.end();
        }
      }
    };

    SNAKE.prototype.end = function() {
      console.log('GameOver');
      this.status = 'ended';
      return radio('gameOver').broadcast();
    };

    SNAKE.prototype.move = function(position) {
      this.data.tmpdir = this.data.direction;
      this.log(position);
      if (this.data.ground[position.x][position.y] > 0) {
        this.data.tailAdd += this.data.ground[position.x][position.y] * 2;
        window.engine.data.skip -= 1;
        this.data.score += 100;
        radio('renderScore').broadcast(this.data.score);
        this.generateApple();
      }
      this.data.ground[this.data.player.x][this.data.player.y] = -2;
      this.data.ground[position.x][position.y] = -1;
      this.data.tail.push(position);
      this.data.player = position;
      if (this.data.tailAdd === 0) {
        this.data.ground[this.data.tail[0].x][this.data.tail[0].y] = 0;
        this.data.tail.shift();
      } else {
        this.data.tailAdd--;
      }
      return radio('renderAll').broadcast(this.data.ground);
    };

    SNAKE.prototype.generateApple = function() {
      var x, y;
      while (true) {
        x = Math.round(Math.random() * 10) % this.data.n;
        y = Math.round(Math.random() * 10) % this.data.n;
        if (this.data.ground[x][y] === 0) {
          break;
        }
      }
      return this.data.ground[x][y] = 1;
    };


    /**
     * Moves player down
     * @method moveDown
     */

    SNAKE.prototype.moveDown = function() {
      if (this.data.tmpdir.y !== -1) {
        return this.data.direction = {
          x: 0,
          y: 1
        };
      }
    };


    /**
     * Moves player up
     * @method moveUp
     */

    SNAKE.prototype.moveUp = function() {
      if (this.data.tmpdir.y !== 1) {
        return this.data.direction = {
          x: 0,
          y: -1
        };
      }
    };


    /**
     * Moves player Left
     * @method moveLeft
     */

    SNAKE.prototype.moveLeft = function() {
      if (this.data.tmpdir.x !== 1) {
        return this.data.direction = {
          x: -1,
          y: 0
        };
      }
    };


    /**
     * Moves player right
     * @method moveRight
     */

    SNAKE.prototype.moveRight = function() {
      if (this.data.tmpdir.x !== -1) {
        return this.data.direction = {
          x: 1,
          y: 0
        };
      }
    };


    /**
     * @method initData
     */

    SNAKE.prototype.initData = function() {
      return this.data = {
        score: 0,
        ground: [[-2, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
        player: {
          x: 0,
          y: 0
        },
        tail: [
          {
            x: 0,
            y: 0
          }
        ],
        direction: {
          x: 1,
          y: 0
        },
        tmpdir: {
          x: 1,
          y: 0
        },
        tailAdd: 2,
        n: 10
      };
    };

    return SNAKE;

  })(ATOB);

  if (root.FEP == null) {
    root.FEP = {};
  }

  root.FEP.SNAKE = SNAKE;

  root = typeof exports !== "undefined" && exports !== null ? exports : window;


  /**
   * Preloads files using createjs PreloadJS
   * @module FEP
   * @class FPreload
   */

  FPreload = (function() {
    function FPreload(filelist, onfileload, oncomplete) {
      var _preload;
      _preload = new root.createjs.LoadQueue();
      _preload.on('fileload', onfileload, this);
      _preload.on('complete', oncomplete, this);
      _preload.loadManifest(filelist);
      return;
    }

    return FPreload;

  })();

  if (root.FEP == null) {
    root.FEP = {};
  }

  root.FEP.FPreload = FPreload;

  root = typeof exports !== "undefined" && exports !== null ? exports : window;


  /**
   * @module FEP
   * @class FLog
   */

  FLog = (function() {
    function FLog(debug) {
      this.debug = debug;
    }


    /**
     * @method log
     * @param data {Object | Integer | String | Array}
     */

    FLog.prototype.log = function(data) {
      if (this.debug !== 0) {
        if (typeof console !== "undefined" && console !== null) {
          return console.log(data);
        } else if (typeof alert !== "undefined" && alert !== null) {
          return alert(data);
        }
      }
    };

    return FLog;

  })();

  if (root.FEP == null) {
    root.FEP = {};
  }

  root.FEP.FLog = FLog;

  root = typeof exports !== "undefined" && exports !== null ? exports : window;


  /**
   * @module FEP
   * @class FInit
   */

  FInit = (function() {

    /**
     * @method constructor
     * @param {FGame} game Game that needs to be initialized
     * @param {FController} controller Controller or game
     * @param {Object} data Data for init
     */
    function FInit(game, controller, data) {
      this.game = game;
      this.controller = controller;
      this.data = data;
      this.frame = 0;
      this.initGraphics = function() {
        return this;
      };
      root.FEP.Log = new FEP.FLog(this.data.debug);
    }


    /**
     * Log msg
     * @method log
     * @param {String|Integer|Object} msg Anything to log
     */

    FInit.prototype.log = function(msg) {
      if (this.data.debug) {
        return root.FEP.Log.log(msg);
      }
    };


    /**
     * Should be triggered on document ready
     * @method onReady
     */

    FInit.prototype.onReady = function() {
      this.initGraphics();
      this.game.start();
      return this.loop();
    };


    /**
     * Loops game on each requestAnimationFrame
     * @method loop
     */

    FInit.prototype.loop = function() {
      requestAnimationFrame(this.loop.bind(this));
      if ((this.data.skip !== 0) && (this.data.skip !== this.frame)) {
        return this.frame++;
      } else {
        this.frame = 0;
        return this.game.loop();
      }
    };

    return FInit;

  })();

  if (root.FEP == null) {
    root.FEP = {};
  }

  root.FEP.FInit = FInit;

  root = typeof exports !== "undefined" && exports !== null ? exports : window;


  /**
   * @module FEP
   * @class FController
   */

  FController = (function() {

    /**
     * @method constructor
     * @param {String} type Type of controller
     * @param {Number} debug Is game in debugging mode
     */
    function FController(type, debug) {
      this.type = type;
      this.debug = debug;
      this.mapKeys = {};
      switch (this.type) {
        case 'keyboard':
          document.addEventListener("keydown", this.trigger.bind(this));
          break;
        case 'custom':
          this.log('Custom controller');
          break;
        default:
          this.log('Controller type:' + this.type + ' not implemented');
      }
    }


    /**
     * Log msg
     * @method log
     * @param {String|Integer|Object} msg Anything to log
     */

    FController.prototype.log = function(msg) {
      if (this.debug) {
        return root.FEP.Log.log(msg);
      }
    };


    /**
     * @method mapKey
     * @param {String} code keyCode that will be maped
     * @param {Function|String} callback function or string that will be executed on trigger
     */

    FController.prototype.mapKey = function(code, callback) {
      return this.mapKeys[code] = callback;
    };


    /**
     * @method unmapkey
     * @param {String} code keyCode that will be unmaped
     */

    FController.prototype.unmapKey = function(code) {
      if (this.mapKeys[code] != null) {
        return delete this.mapKeys[code];
      }
    };


    /**
     * @method trigger
     * @param {Object} event
     * @example 
     * controller.event({ keyCode: '32' })
     */

    FController.prototype.trigger = function(event) {
      switch (this.type) {
        case 'keyboard':
          if (this.mapKeys[event.keyCode] != null) {
            if (typeof this.mapKeys[event.keyCode] === 'function') {
              return this.mapKeys[event.keyCode]();
            } else {
              return eval(this.mapKeys[event.keyCode]);
            }
          } else {
            return this.log(event.keyCode);
          }
          break;
        case 'custom':
          if (this.mapKeys[event.keyCode] != null) {
            if (typeof this.mapKeys[event.keyCode] === 'function') {
              return this.mapKeys[event.keyCode]();
            } else {
              return eval(this.mapKeys[event.keyCode]);
            }
          } else {
            return this.log(event.keyCode);
          }
          break;
        default:
          return this.log('Controller type:' + this.type + ' not implemented');
      }
    };

    return FController;

  })();

  if (root.FEP == null) {
    root.FEP = {};
  }

  root.FEP.FController = FController;

}).call(this);
