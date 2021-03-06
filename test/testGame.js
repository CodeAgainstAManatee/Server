const assert = require('chai').assert;
const GameState = require('../lib/GameObjects/GameState');
const Game = require('../lib/GameObjects/Game');
const ObjectStore = require('../lib/GameObjects/ObjectStore');
const Errors = require('../lib/Errors');
const stubData = require('./stubData');
let game;
let store = new ObjectStore();
store.addObjects(stubData.players);
store.addObjects(stubData.cards);
store.addObjects(stubData.cardPacks);

describe('Game', () => {
  it('should throw an error when no options are provided', () => {
    assert.throws(() => {
      game = new Game();
    }, Errors.GameObjectError, 'No options specified!');
  });
  it('should be able to be constructed using options', () => {
    game = new Game({
      name: 'test game',
      store: store,
      owner: stubData.players[0]
    });
    assert.equal(game.name, 'test game');
    assert.instanceOf(game, Game);
    assert.equal(game.store, store);
    assert.equal(game.players.length, 1);
    assert.equal(game.cardPacks.length, 0);
  });
  it('should throw an error when no name is provided', () => {
    assert.throws(() => {
      game = new Game({
        store: store,
        owner: stubData.players[0]
      });
    }, Errors.GameError, 'No name specified!');
  });
  it('should throw an error when no object store is provided', () => {
    assert.throws(() => {
      game = new Game({
        name: 'test game',
        owner: stubData.players[0]
      });
    }, Errors.GameError, 'No object store specified!');
  });
  it('should throw an error when the store provided isn\'t an object store',
  () => {
    assert.throws(() => {
      game = new Game({
        name: 'test game',
        owner: stubData.players[0],
        store: 'not an object store'
      });
    }, Errors.GameError, 'Attempted to set store to a non-ObjectStore object!');
  });
  it('should throw an error when no owner is provided', () => {
    assert.throws(() => {
      game = new Game({
        name: 'test game',
        store: store
      });
    }, Errors.GameError, 'No owner specified!');
  });
  it('should throw an error when the owner provided isn\'t a player', () => {
    assert.throws(() => {
      game = new Game({
        name: 'test game',
        owner: 'Not a player',
        store: store
      });
    }, Errors.GameError, 'Attempted to set owner to a non-Player object!');
  });
  it('should have an automatically generated UUID', () => {
    game = new Game({
      name: 'test game',
      store: store,
      owner: stubData.players[0]
    });
    assert.isString(game.uuid);
  });
  it('should allow game state to be changed', () => {
    game = new Game({
      name: 'test game',
      store: store,
      owner: stubData.players[0]
    });
    game.state = GameState.WAITING_FOR_PLAYERS;
    assert.equal(game.state, GameState.WAITING_FOR_PLAYERS);
  });
  it('should disallow illegal game state changes', () => {
    game = new Game({
      name: 'test game',
      store: store,
      owner: stubData.players[0]
    });
    game.state = GameState.WAITING_FOR_PLAYERS;
    assert.throws(() => {
      game.state = GameState.INITIALIZING;
    }, Errors.GameError, 'Illegal game state change!');
    assert.throws(() => {
      game.state = GameState.FINISHED + 1;
    }, Errors.GameError, 'Illegal game state change!');
    assert.throws(() => {
      game.state = undefined;
    }, Errors.GameError, 'No game state specified!');
  });

  let game1 = new Game({
    name: 'test game',
    store: store,
    owner: stubData.players[0]
  });
  describe('.addPlayer()', () => {
    it('should add a player to the game', () => {
      game1.addPlayer(stubData.players[1].uuid);
      assert.equal(game1.players.length, 2);
    });
    it('should not add the same player twice', () => {
      game1.addPlayer(stubData.players[1].uuid);
      assert.equal(game1.players.length, 2);
    });
    it('should only allow objects that exist to be added', () => {
      assert.throws(() => {
        game1.addPlayer('not-a-real-thing');
      }, Errors.GameError, 'The object specified does not exist!');
    });
    it('should only allow Players to be added', () => {
      assert.throws(() => {
        game1.addPlayer(stubData.cards[0].uuid);
      }, Errors.GameError, 'UUID does not correspond to a Player!');
    });
    it('should throw an error when not in a valid GameState', () => {
      game1._state = GameState.FINISHED;
      assert.throws(() => {
        game1.addPlayer(stubData.players[2].uuid);
      }, Errors.GameError, 'Cannot add a player to a finished game!');
    });
  });

  describe('.removePlayer()', () => {
    it('should remove a player from the game', () => {
      game1._state = GameState.INITIALIZING;
      game1.removePlayer(stubData.players[2].uuid);
      assert.equal(game1.players.length, 2);
    });
    it('should throw an error when not in a valid GameState', () => {
      game1._state = GameState.FINISHED;
      assert.throws(() => {
        game1.removePlayer(stubData.players[2].uuid);
      }, Errors.GameError, 'Cannot remove a player from a finished game!');
    });
    it('should set the owner to another player if the owner is removed', () => {
      game1._state = GameState.INITIALIZING;
      let currentOwner = game1.owner.uuid;
      game1.removePlayer(currentOwner);
      assert.notEqual(game1.owner.uuid, currentOwner);
    });
    it('should set game state to finished when last player is removed', () => {
      game1._state = GameState.INITIALIZING;
      game1.removePlayer(game1.owner.uuid);
      assert.equal(game1._state, GameState.FINISHED);
    });
  });

  describe('.addCardPack()', () => {
    it('should add a card pack to the game', () => {
      game1._state = GameState.INITIALIZING;
      game1.addCardPack(stubData.cardPacks[0].uuid);
      assert.equal(game1.cardPacks.length, 1);
    });
    it('should not add the same pack twice', () => {
      game1.addCardPack(stubData.cardPacks[0].uuid);
      assert.equal(game1.cardPacks.length, 1);
    });
    it('should only allow objects that exist to be added', () => {
      assert.throws(() => {
        game1.addCardPack('not-a-real-thing');
      }, Errors.GameError, 'The object specified does not exist!');
    });
    it('should only allow CardPacks to be added', () => {
      assert.throws(() => {
        game1.addCardPack(stubData.cards[0].uuid);
      }, Errors.GameError, 'UUID does not correspond to a CardPack!');
    });
    it('should throw an error when not in a valid GameState', () => {
      game1._state = GameState.IN_GAME;
      assert.throws(() => {
        game1.addCardPack(stubData.cardPacks[1].uuid);
      }, Errors.GameError,
         'Cannot change card packs for a running or finished game!');
    });
  });

  describe('.removeCardPack()', () => {
    it('should remove a card pack from the game', () => {
      game1._state = GameState.INITIALIZING;
      game1.removeCardPack(stubData.cardPacks[1].uuid);
      assert.equal(game1.cardPacks.length, 1);
    });
    it('should throw an error when not in a valid GameState', () => {
      game1._state = GameState.IN_GAME;
      assert.throws(() => {
        game1.removeCardPack(stubData.cardPacks[0].uuid);
      }, Errors.GameError,
         'Cannot change card packs for a running or finished game!');
    });
    it('should allow all card packs to be removed from the game', () => {
      game1._state = GameState.INITIALIZING;
      game1.removeCardPack(stubData.cardPacks[0].uuid);
      assert.equal(game1.cardPacks.length, 0);
    });
  });

  describe('.isValidState()', () => {
    it('should return false if given an unknown action', () => {
      let valid = game1.isValidState('unknown');
      assert.equal(valid, false);
    });
    it('should return false if given no action', () => {
      let valid = game1.isValidState();
      assert.equal(valid, false);
    });
  });

  let game2 = new Game({
    name: 'test game',
    store: store,
    owner: stubData.players[0]
  });
  describe('.start()', () => {
    it('should only allow starting a game that is waiting for players', () => {
      assert.throws(() => {
        game2.start();
      }, Errors.GameError, 'That game can\'t be started!');
    });
    it('should only allow starting a game that has enough players', () => {
      assert.throws(() => {
        game2.state = GameState.WAITING_FOR_PLAYERS;
        game2.start();
      }, Errors.GameError, 'At least 3 players are required!');
    });
    it('should move the game\'s state to STARTING', () => {
      game2.addPlayer(stubData.players[1].uuid);
      game2.addPlayer(stubData.players[2].uuid);
      game2.start();
      assert.equal(game2.state, GameState.STARTING);
    });
  });
  describe('.playGame()', () => {
    let testGame;
    it('should return a Promise where the game logic is run', () => {
      testGame = game2.playGame();
      assert.isFunction(testGame.then);
    });
    it('should assign a random player as the starting Card Czar', () => {
      assert.isString(game2._currentCzar.uuid);
    });
  });
});
