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
https://leetcode.com/problems/maximum-subarray/
Given an integer array nums, find the 
subarray
 with the largest sum, and return its sum.

Example 1:

Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.
Example 2:

Input: nums = [1]
Output: 1
Explanation: The subarray [1] has the largest sum 1.
Example 3:

Input: nums = [5,4,-1,7,8]
Output: 23
Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.
*/

const maxSubArray = (nums:number[]):number => {
  let maxSum = Number.MIN_VALUE;
  let curSum = 0;
  nums.forEach((num) => {
    curSum = Math.max(num, curSum + num);
    maxSum = Math.max(curSum, maxSum);
  })
  return maxSum;
}
// https://mochajs.org/#dynamically-generating-tests
describe('Test suite', function() {
    const tests = [
        {args: [1],expected:1},
        {args: [5,4,-1,7,8], expected: 23},
        {args: [-2,1,-3,4,-1,2,1,-5,4], expected: 6},
        {args: [-2,1,-3,4,-1,2,1,-5,6], expected: 7}

    ];
    tests.forEach(({args, expected}) => 
        it('check '+args, function () {
            assert.deepEqual(maxSubArray(args), expected);
        })
    );
  });

mocha.run();
