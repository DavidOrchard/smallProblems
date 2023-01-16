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

const sumRangeIndices = (numArray:number[], [start, end]:number[]) => numArray.slice(start, end+1).reduce((acc:number, num:number) => acc + num, 0);

type Args = [string[], number[][]];
type Expected = (number | null)[];
type TestArgs = {
  args: Args;
  expected: Expected;
}[];

const sumRange = (args:Args):Expected => {
  // findnumrange
  const numArrayIndex = args[0].findIndex((arg) => arg === "NumArray");
  const numArray:number[] = args[1][numArrayIndex];
  return args[0].map((arg, index) => {
    if(arg !== "sumRange") return null;
    return sumRangeIndices(numArray, args[1][index]);
  });
};

// https://mochajs.org/#dynamically-generating-tests
describe('Test suite', function() {
    const tests:TestArgs = [
      {args: [["NumArray", "sumRange"],
      [[-2, 0, 3, -5, 2, -1], [0, 2]]],
      expected:[null, 1]},
        {args: [["NumArray", "sumRange", "sumRange", "sumRange"],
        [[-2, 0, 3, -5, 2, -1], [0, 2], [2, 5], [0, 5]]],
        expected:[null, 1, -1, -3]}
    ];
    tests.forEach(({args, expected}:{args:Args,expected:Expected}) => 
        it('check no items', function () {
            assert.deepEqual(sumRange(args), expected);
        })
    );
  });

mocha.run();
