var Mocha = require('mocha')
var assert = require('assert');
var mocha = new Mocha()

/* 
Question:
Write a program that is going to receive an array of unique integers in ascending order. You program must return a list of list of integers with the begin and the end of each sequence.
Example 1:
input: {1,3,4} output: {(1,1), (3,4)}
Example 2:
input: {1,2,3,5,6,8} output: {(1,3), (5,6), (8,8)}
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
const test0 = [0, 1];

const test1 = [1,3,4];
const test2 = [1,2,3,5,6,8];

const genSequences = (numbers: number[]) => {
  if(numbers.length === 0) return [];
  let first = numbers[0];
  let prev = numbers[0];
  return numbers.reduce((sequences:number[][], current:number, index) => {
    if(current === first) return [];
    if(current !== prev+1) {
      sequences.push([first, prev])
      first = current;
    }
    prev = current;
    // at the end
    if(index === numbers.length - 1) {
      sequences.push([first, current]);
    }
    return sequences;
  }, []);
}

describe('Test suite', function() {

  it('check 2 items', function () {
    assert.deepEqual(genSequences(test1), [[1, 1], [3,4]]);
  });

  it('check longer items', function () {
    assert.deepEqual(genSequences(test2), [[1, 3], [5,6], [8, 8]]);
  });
})

mocha.run();
