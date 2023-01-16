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
