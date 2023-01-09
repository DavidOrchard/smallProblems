var Mocha = require('mocha')
var assert = require('assert');
const { access } = require('fs');
var mocha = new Mocha()

mocha.suite.emit('pre-require', this, 'solution', mocha);

// As the owner of an online store, you need to fulfill orders everyday. To optimize the packing of each order, you decide to write an algorithm to match boxes and items based on their respective sizes.
// You have access to the following two boxes:
// - A medium box (identifier: M)
// - A large box (identifier: L)
// When possible, you should try to fit multiple items in the same box but boxes can only contain one type of product.
// This is the list of items you sell along with associated boxes:
// - Camera (identifier: Cam): one can fit in a medium box, and up to two can fit in a large box
// - Gaming Console (identifier: Game): too big for a medium box, but up to two can fit in a large box
// - max of 2 g consoles can fit in 1 box
// - Bluetooth speaker (identifier: Blue): one can fit in a large box . max is 1 per large box
// Your goal is to design a function that takes a list of items and returns the box & item matches (examples below).
// Your solution should work for any number of each item greater than or equal to zero.
// Input = [], Output = []
// ## Input/Output expectations
// ["Cam"] -> [M: ["Cam"]]
// ["Cam", "Game"] -> [M: ["Cam"], L: ["Game"]]
// ["Game", "Blue"] -> [L: ["Game"], L : ["Blue"]]
// ["Game", "Game", "Blue"] -> [L: ["Game", "Game"], L : ["Blue"]]
// ["Cam", "Cam", "Game", "Game"] -> [L: ["Cam", "Cam"], L: ["Game", "Game"]]
// ["Cam", "Cam", "Cam", "Game", "Game", "Game", "Cam", "Blue"] ->
// [L: ["Cam", "Cam"], L: ["Cam", "Cam"], L: ["Game", "Game"], L: ["Game"], L: ["Blue"]]
// ["Cam", "Cam", "Cam", "Game", "Game", "Cam", "Cam", "Blue", "Blue"] -> [L: ["Cam", "Cam"] , L: ["Cam", "Cam"] , M: ["Cam"] , L: ["Game", "Game"] , L: ["Blue"] , L: ["Blue"]]

const generateItemHash = (items) => items.reduce((acc, item) => {
    acc[item] = acc[item] ? acc[item] + 1 : 1
    return acc;
  }, {});

const generateCamBoxes = (count) => Array(Math.floor(count/2)).fill({L:["Cam", "Cam"]}).concat(Array(count % 2).fill({M:["Cam"]}));
const generateGameBoxes = (count) => Array(Math.floor(count/2)).fill({L:["Game", "Game"]}).concat(Array(count % 2).fill({L:["Game"]}));
const generateBlueBoxes = (count) => Array(count).fill({L:["Blue"]});


const generateBoxes = (items) => {
  const { Cam = 0, Game = 0, Blue = 0 } = generateItemHash(items);
  return generateCamBoxes(Cam).concat(generateGameBoxes(Game), generateBlueBoxes(Blue));
};

describe('Test suite', function() {
  it('check empty', function() {
    assert.equal(JSON.stringify(generateBoxes([])), JSON.stringify([]));
  });
  it('check simple', function() {
    assert.equal(JSON.stringify(generateBoxes(["Cam"])), JSON.stringify([{M: ["Cam"]}]));
  });
  it('checks complex', function() {
    assert.equal(JSON.stringify(generateBoxes(["Cam", "Cam", "Cam", "Game", "Game", "Cam", "Cam", "Blue", "Blue"])), JSON.stringify([{L: ["Cam", "Cam"] }, {L: ["Cam", "Cam"]} , {M: ["Cam"]} , {L: ["Game", "Game"]} , {L: ["Blue"]} , {L: ["Blue"]}]));
  });
})

mocha.run();
