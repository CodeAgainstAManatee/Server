/**
 * Class representing an error thrown from a generic GameObject.
 * @extends {Error}
 */
class GameObjectError extends Error {
  /**
   * Construct a GameObjectError
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

module.exports = GameObjectError;
