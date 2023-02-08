var Mocha = require('mocha')
var assert = require('assert');
var mocha = new Mocha()

mocha.suite.emit('pre-require', this, 'solution', mocha);

/*
https://leetcode.com/problems/jump-game-ii/description/

You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0].

Each element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at nums[i], you can jump to any nums[i + j] where:

0 <= j <= nums[i] and
i + j < n
Return the minimum number of jumps to reach nums[n - 1]. The test cases are generated such that you can reach nums[n - 1].

 

Example 1:

Input: nums = [2,3,1,1,4]
Output: 2
Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.
Example 2:

Input: nums = [2,3,0,1,4]
Output: 2
 

Constraints:

1 <= nums.length <= 104
0 <= nums[i] <= 1000
*/

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
/**
 * @param {number[]} nums
 * @return {number}
 */
const jump = function(nums:number[]) {
  const minTraverses = Array(nums.length);
  minTraverses[nums.length -1 ] = 0;
  for(let i = nums.length - 2; i>= 0; i--) {
    // console.log('i', i, 'minTraverses', minTraverses, 'curTraverse', curTraverse, 'minarray', [...minTraverses.slice(i+1, i+curTraverse+1)]);

    minTraverses[i] = Math.min(...minTraverses.slice(i+1, i+nums[i]+1)) + 1;
  }
  return minTraverses[0];
    
};
// https://mochajs.org/#dynamically-generating-tests
describe('Test suite', function() {
    const tests = [
        {args: [3], expected: 0},
        {args: [2,3,0,1,4],expected:2},
        {args: [2,3,1,1,4], expected:2}
    ];
    tests.forEach(({args, expected}) => 
        it('check '+args, function () {
            assert.deepEqual(jump(args), expected);
        })
    );
  });

mocha.run();
