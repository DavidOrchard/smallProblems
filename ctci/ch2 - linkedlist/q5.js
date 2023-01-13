var Mocha = require('mocha')
var assert = require('assert');
var mocha = new Mocha()

mocha.suite.emit('pre-require', this, 'solution', mocha);

/*
Palindrome: Implement a function to check if a linked list is a palindrome.
*/

const n0 = {value: 'h'};
const n1 = {value: 'o', next: n0};
const n2 = {value: 'h', next: n1};

const isPalindrome = (l1) => {
  node = l1;
  const letters = '';
  do {
    letters += node.value;
    node = node.next;
  } while (node.next);
  return letters === letters.reverse();
}
describe('Test suite', function() {
    it(`check basic test case`, function () {
      assert.deepEqual(isPalindrom(n2), true);
    });
}),

mocha.run();
