(function() {
  var ATOB, FController, FGame, FInit, FLog, SNAKE, root,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

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

      /**
       * @property logger
       * @type FLog
       */
      this.logger = new FLog(this.debug);
    }


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
          return this.logger.log('Paused while game status is: ' + this.status);
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
      this.logger.log("Game ATOB started");
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
          this.logger.log("Moved right");
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
      this.logger.log('But it is a snake game');
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
    };

    SNAKE.prototype.move = function(position) {
      this.data.tmpdir = this.data.direction;
      this.logger.log(position);
      if (this.data.ground[position.x][position.y] > 0) {
        this.data.tailAdd += this.data.ground[position.x][position.y] * 2;
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
   * @constructor
   * @param {String} name Name of the game
   * @param {String} version Version of the game (0.0.x)
   * @param {Number} debug Is game in debugging mode
   */

  FInit = (function() {
    function FInit(game, controller, data) {
      this.game = game;
      this.controller = controller;
      this.data = data;
      this.frame = 0;
    }

    FInit.prototype.onReady = function() {
      this.game.start();
      return this.loop();
    };

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
      this.logger = new FLog(this.debug);
      this.mapKeys = {};
      switch (this.type) {
        case 'keyboard':
          document.addEventListener("keydown", this.trigger.bind(this));
          break;
        case 'custom':
          this.logger.log('Custom controller');
          break;
        default:
          this.logger.log('Controller type:' + this.type + ' not implemented');
      }
    }


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
            return this.logger.log(event.keyCode);
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
            return this.logger.log(event.keyCode);
          }
          break;
        default:
          return this.logger.log('Controller type:' + this.type + ' not implemented');
      }
    };

    return FController;

  })();

  if (root.FEP == null) {
    root.FEP = {};
  }

  root.FEP.FController = FController;

}).call(this);
