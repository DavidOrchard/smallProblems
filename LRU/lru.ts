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

/* Implement LRU Cache */

class LRUCache2 {
  constructor(capacity) {
      this.capacity = capacity;
      this.cache = {};
      this.cache_vals = new LinkedList();
  }

 set(key, value) {
  let node = cache[key];
  if (node) {
    this.cache_vals.remove(node);
    node.value = value;
  } else {
    // evict if needed
    if( this.cache_vals.length === this.capacity) {
      this.cache_vals.remove_first();
    }
    node = new LinkedListNode(key, value);
    cache[key] = node;
  }
  this.cache_vals.push(node);
 }

get(key) {
  const node = cache[key];
  if(node) {
    this.cache_vals.remove(node);
    this.cache_vals.push(node);
    return node.data;
  }
  return -1;
}

getAll() {
  return this;
}

print() {
    let result = "";
    let node = this.cache_vals.head;
    while (node) {
        result += "(" + node.key + ":" + node.data + "),";
        node = node.next;
     }
    return result;
}
}
const func = (args) => args;
// https://mochajs.org/#dynamically-generating-tests
describe('Test suite', function() {
    const tests = [
        {args: [],expected:[]}
    ];
    tests.forEach(({args, expected}) => 
        it('check '+args, function () {
            assert.deepEqual(func(args), expected);
        })
    );
  });

mocha.run();
