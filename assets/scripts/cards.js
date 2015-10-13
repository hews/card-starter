/*
 * Playing Card Data and Methods
 * 
 * Make sure you have loaded the utility library Lodash in order to use this.
 * 
 * - https://lodash.com (documentation)
 * - https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.0/lodash.js
 * 
 * This library adds two global variables and five global functions:
 * 
 * (variable) deckOfCards:    a single deck that represents the working deck
 * (variable) deckIsShuffled: a bool describing if the deck is shuffled or 
 *                            sorted
 *
 * (function) shuffle:          shuffle (or re-shuffle) the current deckOfCards
 * (function) sort:             sort the current deckOfCards
 * (function) pickRandom:       pick a random card from the deckOfCards - only 
 *                              useful when the deck is sorted, since you can 
 *                              just pop off of the top of a shuffled deck!
 * (function) dealDeck:         returns a full deck of cards, sorted
 * (function) resetDeckOfCards: resets the deckOfCards to a full deck, sorted
 *
 */

function isFunction(functionToCheck) {
   var getType = {};
   return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

// create globally accessible variables
var deckOfCards,
    deckIsShuffled,
    shuffle,
    sort,
    pickRandom,
    dealDeck,
    resetDeckOfCards,
    _ = _ || undefined;

// ensure that Lodash is loaded before defining methods that use it
if (!isFunction(_)) {
  console.log("> ERROR: make sure that you load lodash with a script tag before card.js!");
  console.log("> Lodash can be found at: cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.0/lodash.js");
} else {
  console.log("Lodash is loaded... ready to go!");

  // always load lodash for its methods "shuffle", "sortBy" and "sample" 
  // (pick random)
  // shuffle: https://lodash.com/docs#shuffle
  // sortBy:  https://lodash.com/docs#sortBy
  // sample:  https://lodash.com/docs#sample
  // remove:  https://lodash.com/docs#remove
  
  var cards = [
    "dA","dK","dQ","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02",
    "cA","cK","cQ","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02",
    "hA","hK","hQ","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02",
    "sA","sK","sQ","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"
  ]; // jW, jR, jB

  var cardValue = function(card) {
    return cards.indexOf(card);
  };

  dealDeck = function() {
    return cards;
  }

  resetDeckOfCards = function() {
    deckIsShuffled = false;
    return deckOfCards = dealDeck();
  }

  shuffle = function() {
    deckIsShuffled = true;
    return deckOfCards = _.shuffle(deckOfCards);
  };

  sort = function() {
    deckIsShuffled = false;
    return deckOfCards = _.sortBy(deckOfCards, cardValue);
  };

  pickRandom = function() {
    var card = _.sample(deckOfCards);
    deckOfCards = _.remove(deckOfCards, function(c) { return c !== card; });
    return card;
  };

  resetDeckOfCards();
}
