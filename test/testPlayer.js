const assert = require('chai').assert;
const Player = require('../lib/GameObjects').Player;
const Errors = require('../lib/Errors');
let player;

describe('Player', () => {
  it('should throw an error when no options are provided', () => {
    assert.throws(() => {
      player = new Player();
    }, Errors.PlayerError, 'No options specified!');
  });
  it('should be able to be constructed using options', () => {
    player = new Player({
      name: 'Test Player'
    });
    assert.equal(player.name, 'Test Player');
  });
  it('should throw an error when no name is provided', () => {
    assert.throws(() => {
      player = new Player({});
    }, Errors.PlayerError, 'No player name specified!');
  });
});
