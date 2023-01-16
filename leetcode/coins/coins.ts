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
https://leetcode.com/problems/coin-change/

You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.

 Input: coins = [1,2,5], amount = 11
Output: 3
*/

/* Official Answer
  public int coinChange(int[] coins, int amount) {
    if (amount < 1) return 0;
    return coinChange(coins, amount, new int[amount]);
  }

  private int coinChange(int[] coins, int rem, int[] count) {
    if (rem < 0) return -1;
    if (rem == 0) return 0;
    if (count[rem - 1] != 0) return count[rem - 1];
    int min = Integer.MAX_VALUE;
    for (int coin : coins) {
      int res = coinChange(coins, rem - coin, count);
      if (res >= 0 && res < min)
        min = 1 + res;
    }
    count[rem - 1] = (min == Integer.MAX_VALUE) ? -1 : min;
    return count[rem - 1];
  }

*/

const getCoins = ({coins, amount}:{coins: number[], amount: number}):number => {
  const bests = coins.map((coin) => {
    if( coin === amount) {
      return 1;
    }
    if( coin < amount ) {
      const newCoins = getCoins({coins, amount: amount - coin});
      // console.log('coin', coin, 'newCoins', newCoins);
      return newCoins >= 0 ? 1 + newCoins : -1;
    }
    return -1
  });
  // console.log('b', bests);
  return bests.reduce((acc:number, best:number) => {
    // console.log('acc', acc, 'best', best);
    if(acc === -1) {
      acc = best;
    } else {
      if(best >= 0 && best <acc) {
        acc = best}
    }
    return acc;
  },-1)
}
// https://mochajs.org/#dynamically-generating-tests
describe('Test suite', function() {
    const tests = [
        {args: {coins: [1,2,5], amount: 1},expected:1},

        {args: {coins: [1,2,5], amount: 11},expected:3},
    ];
    tests.forEach(({args, expected}) => 
        it('check islands', function () {
            assert.deepEqual(getCoins(args), expected);
        })
    );
  });

mocha.run();
