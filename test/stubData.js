const Player = require('../lib/GameObjects').Player;
const Card = require('../lib/GameObjects').Card;
const CardPack = require('../lib/GameObjects').CardPack;
let cards = [
  new Card({text: 'test card 1'}),
  new Card({text: 'test card 2'}),
  new Card({text: 'test card 3'}),
  new Card({text: 'test card 4'})
];
let players = [
  new Player({name: 'test player 1'}),
  new Player({name: 'test player 2'}),
  new Player({name: 'test player 3'}),
  new Player({name: 'test player 4'})
];
let cardPacks = [
  new CardPack({name: 'test pack 1', cards: cards}),
  new CardPack({name: 'test pack 2', cards: cards}),
  new CardPack({name: 'test pack 3', cards: cards}),
  new CardPack({name: 'test pack 4', cards: cards})
];

module.exports = {
  players: players,
  cards: cards,
  cardPacks: cardPacks
};
