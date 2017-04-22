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

    this.i18n = new (require('i18n-2'))({
      locales: ['en'],
      extension: '.json'
    });
  }

  /**
   * Globally unique ID generated when GameObject is created.
   * @type {string}
   */
  get uuid() {
    return this._uuid;
  }

  /**
   * Localization method. Simply passes through to the i18n module's method.
   * @param  {string} msg Which message we want.
   * @return {string}     The localized message.
   */
  __(msg) {
    return this.i18n.__(msg);
  }
}

module.exports = GameObject;
