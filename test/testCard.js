const assert = require('chai').assert;
const Card = require('../lib/GameObjects').Card;
const Errors = require('../lib/Errors');
let card;

describe('Card', () => {
  it('should throw an error when no options are provided', () => {
    assert.throws(() => {
      card = new Card();
    }, Errors.CardError, 'No options specified!');
  });
  it('should be able to be constructed using options', () => {
    card = new Card({
      text: 'test text',
      font: 'Arial',
      bgcolor: '#000000',
      fgcolor: '#FFFFFF',
      expcode: 'TEST'
    });
    assert.equal(card.text, 'test text');
    assert.equal(card.font, 'Arial');
    assert.equal(card.bgcolor, '#000000');
    assert.equal(card.fgcolor, '#FFFFFF');
    assert.equal(card.expcode, 'TEST');
  });
  it('should construct a card using default values when defaults exist', () => {
    card = new Card({
      text: 'test text'
    });
    assert.equal(card.text, 'test text');
    assert.equal(card.font, 'Helvetica');
    assert.equal(card.bgcolor, '#FFFFFF');
    assert.equal(card.fgcolor, '#000000');
    assert.equal(card.expcode, '');
  });
  it('should throw an error when no card text is provided', () => {
    assert.throws(() => {
      card = new Card({
        font: 'Arial',
        bgcolor: '#000000',
        fgcolor: '#FFFFFF',
        expcode: 'TEST'
      });
    }, Errors.CardError, 'No card text specified!');
  });
});
