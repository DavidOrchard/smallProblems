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
https://leetcode.com/problems/alien-dictionary/
related https://en.wikipedia.org/wiki/Topological_sorting#Kahn's_algorithm

There is a new alien language that uses the English alphabet. However, the order among the letters is unknown to you.

You are given a list of strings words from the alien language's dictionary, where the strings in words are 
sorted lexicographically
 by the rules of this new language.

Return a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language's rules. If there is no solution, return "". If there are multiple solutions, return any of them.

 

Example 1:

Input: words = ["wrt","wrf","er","ett","rftt"]
Output: "wertf"
Example 2:

Input: words = ["z","x"]
Output: "zx"
Example 3:

Input: words = ["z","x","z"]
Output: ""
Explanation: The order is invalid, so return "".
 

Constraints:

1 <= words.length <= 100
1 <= words[i].length <= 100
words[i] consists of only lowercase English letters.
*/

const LOG = false;

const wordsDelta = (word1:string, word2:string) => {
  let prio = "";
  if (LOG) console.log('delta', word1, word2);
  for(let i = 0; i < Math.min(word1.length, word2.length) && !prio; i++) {
    if(word1[i] !== word2[i]) {
      prio = word1[i]+word2[i];
    }
  }
  return prio;
}

function alienOrder(words: string[]): string {
  // find relative order then join.
  // t->f
  // w->e
  // r->t
  // e->r


  // w->r->t->f
  // How to decided about e before or after r?
  // do all and back track.
  // ie, try "wertf", "wretf", "wrtef", "wrtfe"
  // r then t valid
  // e->r only first is valid
  // if none valid return ""
  // @ts-ignore
  const deps: string[][] = [];

  words.forEach((word, index) => {
    if (LOG) console.log('order: word', word, 'index', index);
    if(index === 0) {
      return;
    }
    let delta = wordsDelta(words[index-1], word );
    deps.push([delta[0], delta[1]]);
  });

  let reverseOrder:Record<string, any> = {};
  const orderDeps = deps.reduce((acc:Record<string,any>, [char1, char2]) => {
    if(!acc[char1]) {
      acc[char1] = [];
    }
    if(!acc[char2]) {
      acc[char2] = [];
    }
    acc[char1].push(char2);
    if(!reverseOrder[char2]) {
      reverseOrder[char2] = [];
    }
    if(!reverseOrder[char1]) {
      reverseOrder[char1] = [];
    }
    reverseOrder[char2].push(char1);

    return acc;
  }, {});

  if (LOG) console.log('orderDeps', orderDeps);
  if (LOG) console.log('reverseOrderDeps', reverseOrder);

  let alphabet = "";
  // ie find "w",
  let revKeys = Object.keys(reverseOrder);
  if (LOG) console.log('revKeys', revKeys, 'alphabet', alphabet);
  while(revKeys.length > 0) {
    if (LOG) console.log('revKeys in loop', revKeys, 'alphabet', alphabet);
    revKeys.forEach((key) => {
      if (LOG) console.log('revkeys loop key', key, 'reverseOrderDeps[key]', reverseOrder[key]);
      if(reverseOrder[key].length === 0) {
        alphabet += key;
        // now remove from w from e
        orderDeps[key].forEach((key2:string) => {
          if (LOG) console.log('splicing reverseOrderDeps[key2]', reverseOrder[key2], 'key2', key2);
          reverseOrder[key2].splice(reverseOrder[key2].indexOf(key), 1);
          if (LOG) console.log('after splicing reverseOrderDeps[key2]', reverseOrder[key2]);
        });
        delete reverseOrder[key];
      }
    })
    revKeys = Object.keys(reverseOrder);
  }
  return alphabet;
};
// https://mochajs.org/#dynamically-generating-tests
describe('Test suite', function() {
    const tests = [
        // {args: ["wrt","wrf","er","ett","rftt"],expected:"wertf"},
        {args: ["wrt","wrf"],expected:"wrtf"},
        // {args: ["wrt","wrf","er"],expected:"wertf"},

        // {args: ["z", "x"], expected: "zx"},
        // {args: ["z", "x", "z"], expected: ""},
        // {args: ["a", "bc"], expected: "abc"}
    ];
    tests.forEach(({args, expected}) => 
        it('check '+args, function () {
            assert.deepEqual(alienOrder(args), expected);
        })
    );
  });

mocha.run();
