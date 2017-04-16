const GameObjectError = require('./GameObjectError');
/**
 * Class representing an error thrown from a Player.
 * @extends {GameObjectError}
 */
class PlayerError extends GameObjectError {
  /**
   * Construct a PlayerError
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

module.exports = PlayerError;
