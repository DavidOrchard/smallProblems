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
https://leetcode.com/problems/minimum-window-substring/
Given two strings s and t of lengths m and n respectively, return the minimum window 
substring
 of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".
*/

const getMinWindowSubstring = ({s, t}: {s:string, t:string}):string => {
  // start with first character
  // start with empty substring
  // a. see if character in t
  // if yes,
  //  reduce t by first char
  //  reduce s by 1.
  //  if t empty
  //    add substring to array of substrings;
  //.   reset substring
  //  recurse to a.
  let substring = "";
  let tsubset = `${t}`;
  let substrings = [];
  for(let i = 0; i < s.length; i++) {
    let char = s[i];
    let index = tsubset.indexOf(char);
    // console.log('char', char, 'index', index, 'i', i, 'tsubset', tsubset, 'tsubset.length', tsubset.length, 'substring', substring, '...');
    if ( index > -1 ) {
      tsubset = tsubset.replace(char, '');
      substring += char;
      if(tsubset.length === 0) {
        substrings.push(substring);
        substring = "";
        tsubset = t;
      }
    } else if(substring.length > 0){
      substring += char;
    }
  }
  substrings.sort((s1, s2) => s1.length - s2.length);
  return substrings?.[0] || "";
}

// https://mochajs.org/#dynamically-generating-tests
describe('Test suite', function() {
    const tests = [
        {args: {s: "ADOBECODEBANC", t: "ABC"},expected:"BANC"},

    ];
    tests.forEach(({args, expected}) => 
        it('check islands', function () {
            assert.deepEqual(getMinWindowSubstring(args), expected);
        })
    );
  });

mocha.run();
