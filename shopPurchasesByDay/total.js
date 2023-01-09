var Mocha = require('mocha')
var assert = require('assert');
const { access } = require('fs');
var mocha = new Mocha()

mocha.suite.emit('pre-require', this, 'solution', mocha);

// Question was that there are inputs  array of the format ["date, item"] . 
// eg: intput[["10212021", popcorn], ["10222021", popcorn], ["10212021", soda],["10212021", popcorn],["10212021", soda]]

// on the same day if there are popcorn and soda both purchased, then it costs 9 dollars as a bundled price. else soda is 2.5 dollars, popcorn is 8 dollars. 

// you need to calculate the total price based on these criteria and return that as output

const purchasesToPurchasesByDay = (purchases) => purchases.reduce((acc, [day, item]) => {
  if(!acc[day]) acc[day] = {};
  acc[day][item] = acc[day][item] ? acc[day][item] + 1 : 1, {};
  return acc;
  }, {});
const calculateTotal = (purchases, prices) => {
  const purchasesByDay = purchasesToPurchasesByDay(purchases);
  return Object.keys(purchasesByDay).reduce((acc, key) => {
    const {popcorn = 0, soda = 0} = purchasesByDay[key];
    const numBundles = Math.min(popcorn, soda);
    return acc + numBundles * prices.both + (popcorn - numBundles) * prices.popcorn + (soda - numBundles) * prices.soda;
  }, 0);
}
describe('Test suite', function() {
  it('check empty', function() {
    assert.equal(JSON.stringify(purchasesToPurchasesByDay([])), JSON.stringify({}));
  });
  it('check simple', function() {
    assert.equal(JSON.stringify(purchasesToPurchasesByDay([["10212021", "popcorn"]])), JSON.stringify({"10212021" : {"popcorn": 1}}));
  });
  it('check two', function() {
    assert.equal(JSON.stringify(purchasesToPurchasesByDay([["10212021", "popcorn"], ["10212021", "popcorn"]])), JSON.stringify({"10212021" : {"popcorn": 2}}));
  })
  it('check prices 2 popcorn', function() {
    assert.equal(calculateTotal([["10212021", "popcorn"], ["10212021", "popcorn"]], {both: 9, popcorn: 8, soda: 2.5}), 16);
  });
  it('check prices nothing', function() {
    assert.equal(calculateTotal([], {both: 9, popcorn: 8, soda: 2.5}), 0);
  })
  it('check prices 2 popcorn 1 soda', function() {
    assert.equal(calculateTotal([["10212021", "popcorn"], ["10212021", "popcorn"], ["10212021", "soda"]], {both: 9, popcorn: 8, soda: 2.5}), 17);
  })
  it('check prices 2 popcorn 1 soda', function() {
    assert.equal(calculateTotal([["10212021", "popcorn"], ["10212021", "popcorn"], ["10222021", "popcorn"], ["10212021", "soda"]], {both: 9, popcorn: 8, soda: 2.5}), 25);
  })
})

mocha.run();
