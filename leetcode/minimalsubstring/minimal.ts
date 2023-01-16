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

/* official answer
class Solution {
    public String minWindow(String s, String t) {

        if (s.length() == 0 || t.length() == 0) {
            return "";
        }

        // Dictionary which keeps a count of all the unique characters in t.
        Map<Character, Integer> dictT = new HashMap<Character, Integer>();
        for (int i = 0; i < t.length(); i++) {
            int count = dictT.getOrDefault(t.charAt(i), 0);
            dictT.put(t.charAt(i), count + 1);
        }

        // Number of unique characters in t, which need to be present in the desired window.
        int required = dictT.size();

        // Left and Right pointer
        int l = 0, r = 0;

        // formed is used to keep track of how many unique characters in t
        // are present in the current window in its desired frequency.
        // e.g. if t is "AABC" then the window must have two A's, one B and one C.
        // Thus formed would be = 3 when all these conditions are met.
        int formed = 0;

        // Dictionary which keeps a count of all the unique characters in the current window.
        Map<Character, Integer> windowCounts = new HashMap<Character, Integer>();

        // ans list of the form (window length, left, right)
        int[] ans = { -1, 0, 0 };

        while (r < s.length()) {
            // Add one character from the right to the window
            char c = s.charAt(r);
            int count = windowCounts.getOrDefault(c, 0);
            windowCounts.put(c, count + 1);

            // If the frequency of the current character added equals to the
            // desired count in t then increment the formed count by 1.
            if (dictT.containsKey(c) && windowCounts.get(c).intValue() == dictT.get(c).intValue()) {
                formed++;
            }

            // Try and contract the window till the point where it ceases to be 'desirable'.
            while (l <= r && formed == required) {
                c = s.charAt(l);
                // Save the smallest window until now.
                if (ans[0] == -1 || r - l + 1 < ans[0]) {
                    ans[0] = r - l + 1;
                    ans[1] = l;
                    ans[2] = r;
                }

                // The character at the position pointed by the
                // `Left` pointer is no longer a part of the window.
                windowCounts.put(c, windowCounts.get(c) - 1);
                if (dictT.containsKey(c) && windowCounts.get(c).intValue() < dictT.get(c).intValue()) {
                    formed--;
                }

                // Move the left pointer ahead, this would help to look for a new window.
                l++;
            }

            // Keep expanding the window once we are done contracting.
            r++;
        }

        return ans[0] == -1 ? "" : s.substring(ans[1], ans[2] + 1);
    }
}*/

// bug in following, the left side of window doesn't slide.
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
  let substring:string = "";
  let tsubset = `${t}`;
  let substrings:string[] = [];
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
  substrings.sort((s1:string, s2:string) => s1.length - s2.length);
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
