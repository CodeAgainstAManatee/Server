const GameObject = require('./GameObject');
const GameObjects = require('./');
const GameError = require('../Errors').GameError;
const GameState = require('./GameState');
const ObjectStore = require('./ObjectStore');
const chance = new (require('chance'))();

/**
 * Class representing a single instance of the game
 * @extends {GameObject}
 */
class Game extends GameObject {
  /**
   * Construct a Game
   * @param  {object} opts       The options to use when creating this game.
   * @param  {string} opts.name  The name of this game.
   * @param  {Player} opts.owner The player who created this game.
   * @param  {ObjectStore} opts.store The ObjectStore we should use.
   */
  constructor(opts) {
    super(opts);

    this.name = opts.name;
    this.owner = opts.owner;
    this.store = opts.store;

    // initialize players as an array with the owner of the game in it.
    this._players = [this.owner];

    // initialize cardPacks as an empty array, to be filled later.
    this._cardPacks = [];

    this.state = GameState.INITIALIZING;
  }

  /**
   * The name of this game.
   * @type {string}
   */
  get name() {
    return this._name;
  }

  // eslint-disable-next-line require-jsdoc
  set name(value) {
    if(!value) {
      throw new GameError('No name specified!');
    }
    this._name = value;
  }

  /**
   * The player who owns this game. Normally the player who created the game,
   * but ownership is passed to another player if the current owner leaves the
   * game.
   * @return {Player}
   */
  get owner() {
    return this._owner;
  }

  // eslint-disable-next-line require-jsdoc
  set owner(value) {
    if(!value) {
      throw new GameError('No owner specified!', this.uuid);
    }
    if(!(value instanceof GameObjects.Player)) {
      throw new GameError('Attempted to set owner to a non-Player object!',
                          this.uuid);
    }
    this._owner = value;
  }

  /**
   * The <tt>ObjectStore</tt> that this game has access to.
   * @return {ObjectStore}
   */
  get store() {
    return this._store;
  }

  // eslint-disable-next-line require-jsdoc
  set store(value) {
    if(!value) {
      throw new GameError('No object store specified!', this.uuid);
    }
    if(!(value instanceof ObjectStore)) {
      throw new GameError('Attempted to set store to a non-ObjectStore object!',
                          this.uuid);
    }
    this._store = value;
  }

  /**
   * The players who have joined this game.
   * @return {Player[]}
   */
  get players() {
    return this._players;
  }

  /**
   * Add a player to this game. Can only be done when the game is not in the
   * <tt>FINISHED</tt> state.
   * @param {string} plrUUID The UUID of the player to add.
   */
  addPlayer(plrUUID) {
    if(!(this.isValidState('changePlayers'))) {
      throw new GameError('Cannot add a player to a finished game!', this.uuid);
    }
    let plr = this.store.getObject(plrUUID);
    if(!plr) {
      throw new GameError('The object specified does not exist!', this.uuid);
    }
    if(!(plr instanceof GameObjects.Player)) {
      throw new GameError('UUID does not correspond to a Player!', this.uuid);
    }
    if(!this._players.includes(plr)) {
      this._players.push(plr);
    }
  }

  /**
   * Remove a player from this game. Can only be done when the game is not in
   * the <tt>FINISHED</tt> state.
   * @param {string} plrUUID The UUID of the player to remove.
   */
  removePlayer(plrUUID) {
    if(!(this.isValidState('changePlayers'))) {
      throw new GameError('Cannot remove a player from a finished game!',
                          this.uuid);
    }
    for (let i = this._players.length - 1; i >= 0; i--) {
      if(this._players[i].uuid === plrUUID) {
        this._players.splice(i, 1);
      }
    }

    if(this.owner.uuid === plrUUID) {
      if(!this.players.length) {
        this.state = GameState.FINISHED;
        return;
      }
      this.owner = chance.pickone(this.players);
    }
  }

  /**
   * The card packs that are included in this game.
   * @return {CardPack[]}
   */
  get cardPacks() {
    return this._cardPacks;
  }

  /**
   * Add a card pack to this game. Can only be done when the game is in the
   * <tt>INITIALIZING</tt> or <tt>WAITING_FOR_PLAYERS</tt> states.
   * @param {string} packUUID The UUID of the pack to add.
   */
  addCardPack(packUUID) {
    if(!this.isValidState('changeCardPack')) {
      throw new GameError('Cannot change card packs for ' +
                          'a running or finished game!', this.uuid);
    }
    let pack = this.store.getObject(packUUID);
    if(!pack) {
      throw new GameError('The object specified does not exist!', this.uuid);
    }
    if(!(pack instanceof GameObjects.CardPack)) {
      throw new GameError('UUID does not correspond to a CardPack!', this.uuid);
    }
    if(!this._cardPacks.includes(pack)) {
      this._cardPacks.push(pack);
    }
  }

  /**
   * Remove a card pack from this game. Can only be done when the game is in the
   * <tt>INITIALIZING</tt> or <tt>WAITING_FOR_PLAYERS</tt> states.
   * @param {CardPack} packUUID The UUID of the pack to remove.
   */
  removeCardPack(packUUID) {
    if(!this.isValidState('changeCardPack')) {
      throw new GameError('Cannot change card packs for ' +
                          'a running or finished game!', this.uuid);
    }
    for (let i = this._cardPacks.length - 1; i >= 0; i--) {
      if(this._cardPacks[i].uuid === packUUID) {
        this._cardPacks.splice(i, 1);
      }
    }
  }

  /**
   * Decides whether or not the game is in a valid state for particular action.
   * @param  {string}  action The action to be checked.
   * @return {Boolean}
   */
  isValidState(action) {
    let actions = {
      'changeCardPack': [
        GameState.INITIALIZING,
        GameState.WAITING_FOR_PLAYERS
      ],
      'changePlayers': [
        GameState.INITIALIZING,
        GameState.WAITING_FOR_PLAYERS,
        GameState.STARTING,
        GameState.IN_GAME
      ]
    };

    if(!action || !actions[action]) {
      return false;
    }

    return actions[action].includes(this.state);
  }
}

module.exports = Game;
