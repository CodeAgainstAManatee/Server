const assert = require('chai').assert;
const ObjectStore = require('../lib/GameObjects/ObjectStore');
const GameObject = require('../lib/GameObjects/GameObject');
const Errors = require('../lib/Errors');
const stubData = require('./stubData');
let objectStore;
let testObject = new GameObject({});

describe('ObjectStore', () => {
  it('should populate classes upon creation', () => {
    objectStore = new ObjectStore();
    let keys = Object.keys(objectStore.objectsByClass);
    assert.isAbove(keys.length, 0);
  });

  describe('.addObject()', () => {
    it('should allow GameObjects to be added to the store', () => {
      objectStore.addObject(stubData.players[0]);
      objectStore.addObject(stubData.players[1]);
      let keys = Object.keys(objectStore.objectsByUUID);
      assert.equal(keys.length, 2);
    });
    it('should throw an error if attempting to add a non-GameObject', () => {
      assert.throws(() => {
        objectStore.addObject('not-a-game-object');
      }, Errors.ObjectStoreError, 'That object is not a GameObject!');
    });
    it('should not allow the same object to be added twice', () => {
      assert.throws(() => {
        objectStore.addObject(stubData.players[0]);
      }, Errors.ObjectStoreError, 'That object already exists in the store!');
    });
    it('should not allow objects with unknown classes to be added', () => {
      assert.throws(() => {
        objectStore.addObject(testObject);
      }, Errors.ObjectStoreError,
         'That object has a class that this store does not know!');
    });
  });

  describe('.addObjects()', () => {
    it('should add multiple objects at once', () => {
      objectStore.addObjects(stubData.cards);
      let keys = Object.keys(objectStore.objectsByUUID);
      assert.equal(keys.length, 6);
    });
  });

  describe('.removeObject()', () => {
    it('should allow GameObjects to be removed from the store', () => {
      let status = objectStore.removeObject(stubData.players[0].uuid);
      let keys = Object.keys(objectStore.objectsByUUID);
      assert.equal(keys.length, 5);
      assert.equal(status, true);
    });
    it('should not fail if removing a non-existent item', () => {
      objectStore.removeObject(stubData.players[0].uuid);
      let keys = Object.keys(objectStore.objectsByUUID);
      let status = objectStore.removeObject(stubData.players[0].uuid);
      assert.equal(status, false);
      assert.equal(keys.length, 5);
    });
  });

  describe('.getAllObjects()', () => {
    it('should return objects from the specified class', () => {
      let objects = objectStore.getAllObjects('Card');
      assert.equal(Object.keys(objects).length, 4);
    });
    it('should throw an error if no class is specified', () => {
      assert.throws(() => {
        objectStore.getAllObjects();
      }, Errors.ObjectStoreError, 'You must specify a class to retrieve!');
    });
    it('should return null for classes it does not have', () => {
      let objects = objectStore.getAllObjects('non-existent');
      assert.equal(objects, null);
    });
  });
});
