const assert = require('chai').assert;
const Card = require('../lib/GameObjects').Card;
const CardPack = require('../lib/GameObjects').CardPack;
const Errors = require('../lib/Errors');
let cards = [
  new Card({
    text: 'Test Card 1'
  }),
  new Card({
    text: 'Test Card 2'
  }),
  new Card({
    text: 'Test Card 3'
  })
];
let cardPack;

describe('CardPack', () => {
  it('should throw an error when no options are provided', () => {
    assert.throws(() => {
      cardPack = new CardPack();
    }, Errors.GameObjectError, 'No options specified!');
  });
  it('should be able to be constructed using options', () => {
    cardPack = new CardPack({
      name: 'test name',
      font: 'Arial',
      bgcolor: '#000000',
      fgcolor: '#FFFFFF',
      expcode: 'TEST',
      cards: cards
    });
    assert.equal(cardPack.name, 'test name');
    assert.equal(cardPack.font, 'Arial');
    assert.equal(cardPack.bgcolor, '#000000');
    assert.equal(cardPack.fgcolor, '#FFFFFF');
    assert.equal(cardPack.expcode, 'TEST');
  });
  it('use default values when values aren\'t provided', () => {
    cardPack = new CardPack({
      name: 'test name',
      cards: cards
    });
    assert.equal(cardPack.name, 'test name');
    assert.equal(cardPack.font, 'Helvetica');
    assert.equal(cardPack.bgcolor, '#FFFFFF');
    assert.equal(cardPack.fgcolor, '#000000');
    assert.equal(cardPack.expcode, '');
  });
  it('should throw an error when no name is provided', () => {
    assert.throws(() => {
      cardPack = new CardPack({
        cards: cards
      });
    }, Errors.CardPackError, 'No name specified!');
  });
  it('should throw an error when no cards are provided', () => {
    assert.throws(() => {
      cardPack = new CardPack({
        name: 'test name'
      });
    }, Errors.CardPackError, 'No cards provided!');
  });
  it('should have an automatically generated UUID', () => {
    cardPack = new CardPack({
      name: 'test name',
      cards: cards
    });
    assert.isString(cardPack.uuid);
  });
  describe('.getRandomCards', () => {
    cardPack = new CardPack({
      name: 'test name',
      cards: cards
    });
    it('returns random cards', () => {
      let randomCards = cardPack.getRandomCards(2);
      assert.isArray(randomCards);
      assert.equal(randomCards.length, 2);
    });
    it('returns all cards in deck if more than available are requested', () => {
      let randomCards = cardPack.getRandomCards(5);
      assert.isArray(randomCards);
      assert.equal(randomCards.length, 3);
    });
  });
});
