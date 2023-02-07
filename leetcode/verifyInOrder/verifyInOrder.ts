var Mocha = require('mocha')
var assert = require('assert');
var mocha = new Mocha()

mocha.suite.emit('pre-require', this, 'solution', mocha);
/*
https://leetcode.com/problems/verify-preorder-serialization-of-a-binary-tree/
One way to serialize a binary tree is to use preorder traversal. When we encounter a non-null node, we record the node's value. If it is a null node, we record using a sentinel value such as '#'.


For example, the above binary tree can be serialized to the string "9,3,4,#,#,1,#,#,2,#,6,#,#", where '#' represents a null node.

Given a string of comma-separated values preorder, return true if it is a correct preorder traversal serialization of a binary tree.

It is guaranteed that each comma-separated value in the string must be either an integer or a character '#' representing null pointer.

You may assume that the input format is always valid.

For example, it could never contain two consecutive commas, such as "1,,3".
Note: You are not allowed to reconstruct the tree.
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
const regexp = /(\d)*,#,#/g;

function isValidSerialization(preorder: string): boolean {
  if(preorder === "#") return true;
  if(!preorder.match(regexp)) return false;
  return isValidSerialization(preorder.replace(regexp, "#"));
}
  // https://mochajs.org/#dynamically-generating-tests
describe('Test suite', function() {
    const tests = [
        {args: "9,#,#",expected:true},
        {args: "9,3,4,#,#,1,#,#,2,#,6,#,#", expected: true},
        {args: "1,#", expected: false},
        {args: "9,#,#,1", expected: false}
    ];
    tests.forEach(({args, expected}) => 
        it('check '+args, function () {
            assert.deepEqual(isValidSerialization(args), expected);
        })
    );
  });

mocha.run();
