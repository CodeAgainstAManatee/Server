const GameObjects = require('./');
const GameObject = require('./GameObject');
const ObjectStoreError = require('../Errors').ObjectStoreError;

/** Class that stores all game objects we know about */
class ObjectStore {
  /** Constructor */
  constructor() {
    this.objectsByUUID = {};
    this.objectsByClass = {};

    for (let key in GameObjects) {
      /* istanbul ignore else */
      if (GameObjects.hasOwnProperty(key)) {
        this.objectsByClass[key] = [];
      }
    }
  }

  /**
   * Add an object to the store.
   * @param {GameObject} obj The object to add.
   */
  addObject(obj) {
    if(!(obj instanceof GameObject)) {
      throw new ObjectStoreError('That object is not a GameObject!');
    }
    if(this.objectsByUUID[obj.uuid]) {
      throw new ObjectStoreError('That object already exists in the store!');
    }

    let clazz = this.getObjectClass(obj);
    if(!this.objectsByClass[clazz]) {
      throw new ObjectStoreError('That object has a class that ' +
                                 'this store does not know!');
    }

    this.objectsByUUID[obj.uuid] = obj;
    this.objectsByClass[clazz].push(obj);
  }

  /**
   * Add multiple objects at one time.
   * @param {GameObject[]} objs
   */
  addObjects(objs) {
    for (let i = 0; i < objs.length; i++) {
      this.addObject(objs[i]);
    }
  }

  /**
   * Remove an object from the store.
   * @param  {string}  uuid The UUID of the object to remove.
   * @return {boolean}      Whether or not an object was removed.
   */
  removeObject(uuid) {
    let obj = this.getObject(uuid);
    if(!obj) {
      return false;
    }
    let clazz = this.getObjectClass(obj);
    let objArray = this.getAllObjects(clazz);
    let deleted = false;
    for (let i = objArray.length - 1; i >= 0; i--) {
      if(objArray[i].uuid === obj.uuid) {
        deleted = true;
        objArray.splice(i, 1);
      }
    }
    delete this.objectsByUUID[obj.uuid];

    return deleted;
  }

  /**
   * Get an object from the store.
   * @param  {string} uuid The UUID of the object to return.
   * @return {GameObject|null}
   */
  getObject(uuid) {
    return this.objectsByUUID[uuid] || null;
  }


  /**
   * Get all objects for a particular class.
   * @param  {string} clazz The class to get objects from.
   * @return {GameObject[]|null}
   */
  getAllObjects(clazz) {
    if(!clazz) {
      throw new ObjectStoreError('You must specify a class to retrieve!');
    }
    return this.objectsByClass[clazz] || null;
  }

  /**
   * Get the class of an object.
   * @param  {GameObject} obj The object to get the class of.
   * @return {string}
   */
  getObjectClass(obj) {
    switch(obj.constructor) {
      case GameObjects.Card:
        return 'Card';
      case GameObjects.CardPack:
        return 'CardPack';
      case GameObjects.Player:
        return 'Player';
      default:
        return 'Unknown';
    }
  }
}

module.exports = ObjectStore;