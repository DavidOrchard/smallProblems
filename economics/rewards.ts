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

const genWindows = (stakers, config) => {
    const windows = [];
    Object.keys(stakers).forEach((stakerId) => {
        const stakes = stakers[stakerId];
        const sortedStakes = stakes.sort((a, b) => a.time - b.time);
        let window = [];
        let lastTime = sortedStakes[0].time;
        sortedStakes.forEach((stake) => {
            if (stake.time - lastTime > config.ramp) {
                windows.push(window);
                window = [];
            }
            window.push(stake);
            lastTime = stake.time;
        });
        windows.push(window);
    });
    return windows;
}
// args: array of commands
//   stakes: [{id: string, amount: number, time: number}]
//   times:[number]
const func = (args) => {
    const config = {
        rewards: 10000,
        ramp:180,
        emissionRate: 10
    }
    const stakers = [];
    args.stakes.forEach((stake) => {
        if (!stakers[stake.id]) {
            stakers[stake.id] = [];
        }
        stakers[stake.id].push({amount: stake.amount, time: stake.time});
    });
    const stakingWindows = genWindows(stakers, config);

    args.times.forEach((time) => {

    }

};
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
