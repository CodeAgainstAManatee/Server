const CardPackError = require('../Errors').CardPackError;
const GameObject = require('./GameObject');
const chance = new (require('chance'))();

/**
 * Class representing a pack of cards (aka an expansion).
 * @extends {GameObject}
 */
class CardPack extends GameObject {
  /**
   * Construct a card pack.
   * @param  {object} opts          Options to use to create the card.
   * @param  {string} opts.name     The card pack's name.
   * @param  {string} opts.font     The default font cards should use.
   * @param  {string} opts.bgcolor  The default background color.
   * @param  {string} opts.fgcolor  The default foreground (text) color.
   * @param  {string} opts.expcode  The expansion code to display for this pack.
   * @param  {Card[]} opts.cards    The cards that will be in this pack.
   */
  constructor(opts) {
    super(opts);

    this.name = opts.name;
    this.font = opts.font;
    this.bgcolor = opts.bgcolor;
    this.fgcolor = opts.fgcolor;
    this.expcode = opts.expcode;
    this.cards = opts.cards;
  }

  /**
   * The name of this card pack.
   * @type {string}
   */
  get name() {
    return this._name;
  }

  // eslint-disable-next-line require-jsdoc
  set name(value) {
    if(!value) {
      throw new CardPackError('No name specified!');
    }
    this._name = value;
  }

  /**
   * The default fonts that cards in this pack will have.
   * @type {string}
   * @default Helvetica
   */
  get font() {
    return this._font;
  }

  // eslint-disable-next-line require-jsdoc
  set font(value) {
    this._font = value || 'Helvetica';
  }

  /**
   * The default background color that cards in this pack will have.
   * @type {string}
   * @default #FFFFFF
   */
  get bgcolor() {
    return this._bgcolor;
  }

  // eslint-disable-next-line require-jsdoc
  set bgcolor(value) {
    this._bgcolor = value || '#FFFFFF';
  }

  /**
   * The default text color that cards in this pack will have.
   * @type {string}
   * @default #000000
   */
  get fgcolor() {
    return this._fgcolor;
  }

  // eslint-disable-next-line require-jsdoc
  set fgcolor(value) {
    this._fgcolor = value || '#000000';
  }

  /**
   * The expansion code this pack will show.
   * @type {string}
   * @default
   */
  get expcode() {
    return this._expcode;
  }

  // eslint-disable-next-line require-jsdoc
  set expcode(value) {
    this._expcode = value || '';
  }

  /**
   * The cards this pack will have.
   * @type {string}
   */
  get cards() {
    return this._cards;
  }

  // eslint-disable-next-line require-jsdoc
  set cards(value) {
    if(!value || !value.length) {
      throw new CardPackError('No cards provided!');
    }
    this._cards = value;
  }

  /**
   * Get random cards from this card pack.
   * @param  {number} number The number of cards to return.
   * @return {Card[]}        Array of randomized cards.
   */
  getRandomCards(number) {
    return chance.pickset(this.cards, number);
  }
}

module.exports = CardPack;
