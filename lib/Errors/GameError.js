const GameObjectError = require('./GameObjectError');
/**
 * Class representing an error thrown from a Game.
 * @extends {GameObjectError}
 */
class GameError extends GameObjectError {
  /**
   * Construct a GameError
   * @param  {String} message An error message.
   * @param  {Object} extra   Any extra information included with this error.
   */
  constructor(message, extra) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.extra = extra;
  }
}

module.exports = GameError;
