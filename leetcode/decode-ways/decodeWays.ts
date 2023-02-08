var Mocha = require('mocha')
var assert = require('assert');
var mocha = new Mocha()

mocha.suite.emit('pre-require', this, 'solution', mocha);

/*
https://leetcode.com/problems/decode-ways/description/

A message containing letters from A-Z can be encoded into numbers using the following mapping:

'A' -> "1"
'B' -> "2"
...
'Z' -> "26"
To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, "11106" can be mapped into:

"AAJF" with the grouping (1 1 10 6)
"KJF" with the grouping (11 10 6)
Note that the grouping (1 11 06) is invalid because "06" cannot be mapped into 'F' since "6" is different from "06".

Given a string s containing only digits, return the number of ways to decode it.

The test cases are generated so that the answer fits in a 32-bit integer.

 

Example 1:

Input: s = "12"
Output: 2
Explanation: "12" could be decoded as "AB" (1 2) or "L" (12).
Example 2:

Input: s = "226"
Output: 3
Explanation: "226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).
Example 3:

Input: s = "06"
Output: 0
Explanation: "06" cannot be mapped to "F" because of the leading zero ("6" is different from "06").
 

Constraints:

1 <= s.length <= 100
s contains only digits and may contain leading zero(s).
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
// feels like a greedy algorithm
// maybe a sliding window?
// not happy about recursing and doing same work again.
// could we precompute or memoize results?
// How about something special with 1s and 2s.
// Something like chunk to first non 1 or 2 or EOD.

/* work the variations for 226
  2 + 2 + 6, 2 + 26, 22 + 6
 - iteration 1.  2 is valid 1, so how many for 26?  26 is valid 2 so how many for 6.  
 - iteration 2.  26 is valid 1, so 1 + how many for 6?  26 is valid 2 so 1.
 - iteration 2a. 6 is valid 1
 - iteration 2b. 

*/

function createDict(): Record<string, any> {
  const dict:Record<string, any> = {}
  for(let i = 1; i < 27; i++) {
    dict[`${i}`] = true;
  }
  return dict;
}
let memo:Record<string,any> = {};

function numDecodingsTerminated(s: string, dict: Record<string, any>): number {
  if(s.length === 0) return 1;
  let tempSlice2 = s.slice(0, 2);
  let tempSlice1 = s.slice(0, 1);
  if(!dict[tempSlice1]) return 0;
  if(memo[s]) {
    // console.log('found memo for ', s);
    return memo[s];
  }
  let decodings = numDecodingsTerminated(s.slice(1), dict);
  if (s.length > 1 && dict[tempSlice2] ) {
    decodings += numDecodingsTerminated(s.slice(2), dict);
  }
  memo[s] = decodings;
  return decodings;
}
function numDecodings(s: string): number {
  const dict = createDict();
  return numDecodingsTerminated(s, dict);
};
// https://mochajs.org/#dynamically-generating-tests
describe('Test suite', function() {
    const tests = [
        {args: "6", expected: 1},
        {args: "12", expected: 2},
        {args: "226", expected: 3},
        {args: "2326", expected: 4},
        {args: "06", expected: 0},
        {args: "111", expected: 3}

    ];
    tests.forEach(({args, expected}) => 
        it('check '+args, function () {
            assert.deepEqual(numDecodings(args), expected);
        })
    );
  });

mocha.run();
