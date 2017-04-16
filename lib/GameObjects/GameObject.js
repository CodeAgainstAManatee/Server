const GameObjectError = require('../Errors').GameObjectError;
const uuid = require('uuid');

/** Class that implements common functionality between GameObjects. */
class GameObject {
  /**
   * Construct a GameObject.
   * @param  {object} opts Options to use in creating this GameObject.
   */
  constructor(opts) {
    if(!opts) {
      throw new GameObjectError('No options specified!');
    }

    this._uuid = uuid.v4();
  }

  /**
   * Globally unique ID generated when GameObject is created.
   * @type {string}
   */
  get uuid() {
    return this._uuid;
  }
}

module.exports = GameObject;
