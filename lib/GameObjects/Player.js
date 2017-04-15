const PlayerError = require('../Errors').PlayerError;

/** Class representing a player. */
class Player {
  /**
   * Construct a Player.
   * @param  {object} opts      Options to use in constucting the player.
   * @param  {string} opts.name The player's name.
   */
  constructor(opts) {
    if(!opts) {
      throw new PlayerError('No options specified!');
    }
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
      throw new PlayerError('No player name specified!');
    }
    this._name = value;
  }
}

module.exports = Player;
