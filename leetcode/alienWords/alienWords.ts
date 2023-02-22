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

const newWords = (bases:string[], delta:string, ignoreOrder:boolean):string[] => {
  const first = delta[0];
  const second = delta[1];
  let newBase:string[] = [];
  if (LOG) console.log('newWords base', bases, 'delta', delta, 'second', second);
  bases.forEach((base) => {
    let firstIndex = base.indexOf(first);
    let secondIndex = base.indexOf(second);
    if (LOG) console.log('base', base, 'newBase', newBase, 'firstIndex', firstIndex, 'secondIndex', secondIndex);
    // if negative then not in the word yet 
    if(secondIndex > -1 && secondIndex < firstIndex && !ignoreOrder) return;
    // character already in.
    if(secondIndex > -1) {
      newBase.push(base);
      return;
    }
    const endIndex = secondIndex > -1 ? secondIndex : base.length;
    for(let i = firstIndex; i < endIndex; i++) {
      const chars = [...base];
      if (LOG) console.log('chars', chars, 'i', i, 'second', second);
      chars.splice(i+1, 0, second);
      if (LOG) console.log('newWord', chars);
      newBase.push(chars.join(""));
    }
  })
  return newBase;
}
function alienOrder(words: string[]): string {
  // find relative order then join.
  // w->r
  // r->t, 
  // then t->f
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
  let base:string[] = [];

  words.forEach((word, index) => {
    if (LOG) console.log('order: word', word, 'index', index, 'base', base);
    if(index === 0) {
      base = [word];
      return;
    }
    let delta = wordsDelta(words[index-1], word );
    let matchPos = Math.min(words[index-1].indexOf(delta[0]), word.indexOf(delta[1]));
    let initialMatch = false;
    while(delta.length > 1) {
      if (LOG) console.log('index', index, 'delta', delta)
      base = newWords(base, delta, initialMatch);
      initialMatch = true;
      delta = word.substring(matchPos, matchPos+2);
      matchPos++;
    } ;
  });
  return base[0] || "";
};
// https://mochajs.org/#dynamically-generating-tests
describe('Test suite', function() {
    const tests = [
        {args: ["wrt","wrf","er","ett","rftt"],expected:"wertf"},
        {args: ["wrt","wrf"],expected:"wrtf"},
        {args: ["wrt","wrf","er"],expected:"wertf"},

        {args: ["z", "x"], expected: "zx"},
        {args: ["z", "x", "z"], expected: ""},
        {args: ["a", "bc"], expected: "abc"}
    ];
    tests.forEach(({args, expected}) => 
        it('check '+args, function () {
            assert.deepEqual(alienOrder(args), expected);
        })
    );
  });

mocha.run();
