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

/* https://leetcode.com/problems/longest-consecutive-sequence/
Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in O(n) time.

 

Example 1:

Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
Example 2:

Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9
 

Constraints:

0 <= nums.length <= 105
-109 <= nums[i] <= 109
*/

function longestConsecutive(nums: number[]): number {
// must touch each node only once as O(n)
// mark each number in array with a true
// maybe do something if we see adjacent node is true?
// each number has length instead of true?
// iterate over each to find longest.
// could do linked listed and coalesce nodes
const sequences:Record<string, boolean> = nums.reduce((acc:Record<string, boolean>, num) => {
    acc[num] = true;
    return acc;
}, {});
    let longestSequence = 0;
    Object.keys(sequences).forEach((key:string) => {
        let index = parseInt(key);
        if(!sequences[ index -1 ]) {
            let currentSequence = 0;
            while(sequences[index]) {
                index++;
                currentSequence++;
            }
            longestSequence = Math.max(longestSequence, currentSequence);
        }
    }
    )
    return longestSequence;
};

// https://mochajs.org/#dynamically-generating-tests
describe('Test suite', function() {
    const tests = [
        {args: [0], expected:1},
        {args: [0,0], expected: 1},
        {args: [0,1,2], expected: 3},
        {args: [2,1,0], expected: 3},
        {args: [100,4,200,1,3,2], expected: 4},
        {args: [0,3,7,2,5,8,4,6,0,1],expected:9}
    ];
    tests.forEach(({args, expected}) => 
        it('check '+args, function () {
            assert.deepEqual(longestConsecutive(args), expected);
        })
    );
  });

mocha.run();
