const assert = require('chai').assert;
const GameObject = require('../lib/GameObjects/GameObject');
const Errors = require('../lib/Errors');
let gameObject;

describe('GameObject', () => {
  it('should throw an error when no options are provided', () => {
    assert.throws(() => {
      gameObject = new GameObject();
    }, Errors.GameObjectError, 'No options specified!');
  });
  it('should be able to be constructed using an empty object', () => {
    gameObject = new GameObject({});
    assert.isOk(gameObject);
  });
  it('should have a UUID by default', () => {
    gameObject = new GameObject({});
    assert.isString(gameObject.uuid);
  });
  it('should expose a localization method', () => {
    gameObject = new GameObject({});
    assert.equal(gameObject.__('test-string'), 'This is a test');
  });
});
