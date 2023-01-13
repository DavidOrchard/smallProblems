var Mocha = require('mocha')
var assert = require('assert');
var mocha = new Mocha()

mocha.suite.emit('pre-require', this, 'solution', mocha);

/*
Sum Lists: You have two numbers represented by a linked list, where each node contains a single
digit. The digits are stored in reverse order, such that the Vs digit is at the head of the list. Write a
function that adds the two numbers and returns the sum as a linked list.
EXAMPLE
Input: (7- > 1 -> 6) + (5 -> 9 -> 2).That is,617 + 295.
Output: 2 -> 1 -> 9. That is, 912.
FOLLOW UP
Suppose the digits are stored in forward order. Repeat the above problem.
EXAMPLE
Input: (6 -> 1 -> 7) + (2 -> 9 -> 5).That is, 617 + 295,
Output:9 -> 1 -> 2,Thatis,912. 
*/

// const makell = (num) => {
//   if(num === 0) return;
//   let digit = num /
//   while
// }

const n6 = {value: 6};
const n1 = {value: 1, next: n6}
const n7 = {value: 7, next: n1};

const n2 = {value: 2};
const n9 = {value: 9, next: n2}
const n5 = {value: 5, next: n9};

const addLL = (l1, l2) => {
  let overflow = 0;
  let node = {};
  const first = node;
  let prev;
  let nextl1 = l1;
  let nextl2 = l2;
  while(nextl1) {
    let num = nextl1.value + nextl2.value + overflow;
    if (num > 9) {
      overflow = 1;
      num -= 10;
    } else {
      overflow = 0;
    }
    node.value = num;
    if(prev) {
      prev.next = node;
    }

    prev = node;
    nextl1 = nextl1.next;
    nextl2 = nextl2.next;
    node = {};
  }
  return first;
}
describe('Test suite', function() {
    it(`check basic test case`, function () {
      const node = addLL(n7, n5);
      assert.deepEqual(node.value, 2);
      assert.deepEqual(node.next.value, 1);
      assert.deepEqual(node.next.next.value, 9);
    });
}),

mocha.run();
