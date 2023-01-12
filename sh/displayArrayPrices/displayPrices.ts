var Mocha = require('mocha')
var assert = require('assert');
var mocha = new Mocha()

/* 
1. given a list of item prices[2, 4, 9, 23, 44, 26, 11, 99] display a chart in this format.

00: ***
10: *
20: **
30:
40: *
50:
60:
70:
80:
90: *

number of stars == no of items whose price in that particular range (there are 3 items 2,4,9 between 0 and 9, so 3 stars ***)


*/


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
const genHash = (arr: number[]) => arr.reduce((acc: number[], item: number) => {
    const index = Math.floor(item/10);
    acc[index] = 1 + (acc[index] || 0);
    return acc;
  }, []);

const display = (counts: number[]) => {
  console.log('coounts', counts.length);
  for(let i = 0; i < counts.length; i++) {
    console.log(`${(i + '').padStart(2, '0')}\: ${'*'.repeat(counts[i] || 0)}`);
  }
}
const data1 = [2, 4, 9, 23, 44, 26, 11, 99];
display(genHash(data1));

describe('Test suite', function() {

  it('check no items', function () {
    assert.deepEqual(genHash(data1), {foo:1});
  });
})

mocha.run();
