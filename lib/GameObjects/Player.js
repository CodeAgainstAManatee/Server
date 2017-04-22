const PlayerError = require('../Errors').PlayerError;
const GameObject = require('./GameObject');

/**
 * Class representing a player.
 * @extends {GameObject}
 */
class Player extends GameObject {
  /**
   * Construct a Player.
   * @param  {object} opts      Options to use in constucting the player.
   * @param  {string} opts.name The player's name.
   */
  constructor(opts) {
    super(opts);

    this.name = opts.name;
  }

  /**
   * This player's name.
   * @type {string}
   */
  get name() {
    return this._name;
  }

  // eslint-disable-next-line require-jsdoc
  set name(value) {
    if(!value) {
      throw new PlayerError(this.__('errors.general.no-name'));
    }
    this._name = value;
  }
}

module.exports = Player;
