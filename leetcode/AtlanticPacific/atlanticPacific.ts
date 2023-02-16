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
https://leetcode.com/problems/pacific-atlantic-water-flow/
There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.

The island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).

The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.

Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.
Constraints:

m == heights.length
n == heights[r].length
1 <= m, n <= 200
0 <= heights[r][c] <= 105
*/
const offsets = [[-1, 0], [1, 0], [0, -1],[ 0, 1]];
let LOG = false;

const reachOcean = (row:number, col:number, heights: number[][], prevHeight: number, checked:Array<Array<Record<string, any>>>, visited: boolean[][]  ):Record<string, any> => {
  if(LOG)console.log('reachOcean row', row, 'col', col, 'checked', checked?.[row]?.[col]);
  if(heights?.[row]?.[col] > prevHeight) return {};

  if(checked?.[row]?.[col]) {
    if(LOG) console.log('checked, returning', checked[row][col]);
    return checked[row][col];
  }
  if(row < 0 || col < 0 ) return {P:true}
  if(row >= heights.length || col >= heights[0].length) return {A:true}
  if(visited?.[row]?.[col]) return {};
  if(!visited[row]) visited[row] = [];
  visited[row][col] = true;
  // could be "P", "P","A", "A"
  return offsets.reduce((acc:Record<string,any>, [rowOff, colOff]) => {
    if(LOG)console.log('reducing acc', acc, 'rowOffset', rowOff, 'colOffset', colOff);
      const {A, P} = reachOcean(row+rowOff, col+colOff, heights, heights[row][col], checked, visited);
      acc.A = acc.A || A;
      acc.P = acc.P || P;
      // if(LOG)console.log('acc', acc);
      return acc;
    }, {});
};
function pacificAtlantic(heights: number[][]): number[][] {
    const oceans:number[][] = [];
    const checked:Array<Array<Record<string, any>>> = [[]];

    for(let row = 0; row < heights.length; row++) {
        for(let col = 0; col < heights[0].length; col++) {
          // LOG = true;
          // LOG = (row === 2 && col === 3);
          if (LOG) console.log('checking row', row, 'col', col);
            const reachable = reachOcean(row, col, heights, heights[row][col], checked, [[]]);
            if(LOG) console.log('setting checked', row, col, reachable);
            if(!checked[row]) checked[row] = [];
            checked[row][col] = reachable;
            const {A, P} = reachable;
            if(A && P) {
                oceans.push([row,col]);
            }
        }
    }
    return oceans;
}
    // https://mochajs.org/#dynamically-generating-tests
describe('Test suite', function() {
    const tests = [
        // {args: [[1]], expected: [[0,0]]}
        // {args: [[1,1],[1,1],[1,1]], expected: [[0,0],[0,1],[1,0],[1,1],[2,0],[2,1]]},
        {args: [[1,1,1],[1,1,1]], expected: [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2]]},
        // {args: [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]],
        //     expected:[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]}
    ];
    tests.forEach(({args, expected}) => 
        it('check '+args, function () {
            assert.deepEqual(pacificAtlantic(args), expected);
        })
    );
  });

mocha.run();
