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

// https://leetcode.com/problems/number-of-islands/

const getIslandStart = (matrix:string[][], x = 0, y = 0) => {
  let coord;
  for(let i = y; i< matrix.length; i++)  {
    for (let j = x; j < matrix[i].length; j++) {
      if(matrix[i][j] === "1") {
        return {x:j, y:i};
      }
    }
  }
}

const clearIsland = (matrix: string[][], x:number, y:number) => {
  if(matrix[y][x] === "1") {
    matrix[y][x] = "0";
    if(x + 1 < matrix[y].length) clearIsland(matrix, x+1, y);
    if(y + 1 < matrix.length) clearIsland(matrix, x, y+1);
  }
}

const getIslands = (matrix: string[][]) => {
  let numIslands = 0;
  let coord = getIslandStart(matrix);
  // should copy whole matrix
  let newMatrix = matrix;

  while (coord) {
    numIslands++;
    const {x, y} = coord;
    clearIsland(newMatrix, x, y);
    coord = getIslandStart(matrix);

  };
  return numIslands;
}
// https://mochajs.org/#dynamically-generating-tests
describe('Test suite', function() {
    const tests = [
        {args: [
          ["1","1","1","1","0"],
          ["1","1","0","1","0"],
          ["1","1","0","0","0"],
          ["0","0","0","0","0"]
        ],expected:1},
        {args: [
          ["1","1","1","1","0"],
          ["1","1","0","1","0"],
          ["1","1","0","0","0"],
          ["0","0","0","0","1"]
        ],expected:2}
    ];
    tests.forEach(({args, expected}) => 
        it('check no items', function () {
            assert.deepEqual(getIslands(args), expected);
        })
    );
  });

mocha.run();
