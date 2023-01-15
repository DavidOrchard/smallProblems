var Mocha = require('mocha')
var assert = require('assert');
var mocha = new Mocha()

mocha.suite.emit('pre-require', this, 'solution', mocha);


const describe = (name: string, cb: Function) => {
  console.log(name);
  console.group();
  const ret = cb();
  console.groupEnd();
  return ret;
}

const it = (name: string, cb: Function) => {
  let ret;
  try {
     ret = cb();
    console.log(`✅ ${name}`);
  } catch (e) {
    console.warn(`❌ ${name}`);
    console.error(e);
  }
  return ret;
}

/*
https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.


Example 1:

Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
Example 2:

Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.
*/

const bestTrade = (prices:number[]): number => {
  let sequences:number[] = [];
  let low = prices[0];
  let high = prices[0];
  prices.forEach((price) => {
    // if the prices is lower than the previous high, reduce the high.
    // if the price is 
    if(price < high && price < low) {
      high = price;
      low = price;
    // } else if (price > low && price < high) {
    //   low = price;
    } else if(price > high) {
      high = price;
    } else if(price < low) {
      // reset of the buy.
      if(low !== high) {
        sequences.push(high - low);
      }
      low = price;
      high = price;
    }
  });
  if(low !== high) {
    sequences.push(high - low);
  }
  sequences.sort();
  return low !== high ? sequences[0] : 0;
}
// https://mochajs.org/#dynamically-generating-tests
describe('Test suite', function() {
    const tests = [
      {args: [1,2], expected: 1},
      {args: [7], expected: 0},
      {args: [7, 6, 4, 3, 1], expected: 0},
      {args: [7,1,5,3,6,4] ,expected:5},
      {args: [7,2,5,3,6,4,1,7] ,expected:6}

    ];
    tests.forEach(({args, expected}) => 
        it('check args' + args, function () {
            assert.deepEqual(bestTrade(args), expected);
        })
    );
  });

mocha.run();
