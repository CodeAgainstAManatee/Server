const CardError = require('../Errors').CardError;

/** Class representing a card. */
class Card {
  /**
   * Construct a card.
   * @param  {object} opts          Options to use to create the card.
   * @param  {string} opts.text     The card's text.
   * @param  {string} opts.font     The font that this card should use.
   * @param  {string} opts.bgcolor  The card's background color.
   * @param  {string} opts.fgcolor  The card's foreground (text) color.
   * @param  {string} opts.expcode  The expansion code to display on this card.
   */
  constructor(opts) {
    if(!opts) {
      throw new CardError('No options specified!');
    }
    this.text = opts.text;
    this.font = opts.font;
    this.bgcolor = opts.bgcolor;
    this.fgcolor = opts.fgcolor;
    this.expcode = opts.expcode;
  }

  /**
   * The text of the card.
   * Blanks are denoted with a single underscore (_).
   * @type {string}
   */
  get text() {
    return this._text;
  }

  // eslint-disable-next-line require-jsdoc
  set text(value) {
    if(!value) {
      throw new CardError('No card text specified!');
    }
    this._text = value;
  }

  /**
   * The font this card will be displayed using.
   * @type {string}
   * @default "Helvetica"
   */
  get font() {
    return this._font;
  }

  // eslint-disable-next-line require-jsdoc
  set font(value) {
    this._font = value || 'Helvetica';
  }

  /**
   * The background color to use when displaying this card.
   * @type {string}
   * @default "#FFFFFF"
   */
  get bgcolor() {
    return this._bgcolor;
  }

  // eslint-disable-next-line require-jsdoc
  set bgcolor(value) {
    this._bgcolor = value || '#FFFFFF';
  }

  /**
   * The foreground (text) color to use when displaying this card.
   * @type {string}
   * @default "#000000"
   */
  get fgcolor() {
    return this._fgcolor;
  }

  // eslint-disable-next-line require-jsdoc
  set fgcolor(value) {
    this._fgcolor = value || '#000000';
  }

  /**
   * The expansion code to display on this card.
   * @type {string}
   * @default ""
   */
  get expcode() {
    return this._expcode;
  }

  // eslint-disable-next-line require-jsdoc
  set expcode(value) {
    this._expcode = value || '';
  }
}

module.exports = Card;
