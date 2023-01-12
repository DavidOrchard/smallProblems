
// var Mocha = require('mocha')
// var assert = require('assert');
// var mocha = new Mocha();
import * as readline from 'readline';

// mocha.suite.emit('pre-require', this, 'solution', mocha);

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
Here’s some more info about the project.

The ship’s starting coordinates are (0, 0), which is on Earth.
The ship’s destination is (0, 250), which is on the moon.
The ship will be controlled over a CLI using a standard keyboard as follows:

The ship starts at (0, 0) at 0 speed, i.e. at complete rest.
The ship only moves when a valid key is pressed.
Pressing W increases the ship’s speed and then moves it forward by speed units.
The ship’s maximum speed is 5.
Pressing S decreases the ship’s speed and then moves it forward by speed units.
The ship’s minimum speed is 0.
After launch, the ship cannot go below speed 1, i.e. it always moves forward until it reaches the moon.
Pressing A and D move the ship left and right by one unit respectively.
The ship also moves forward by speed units.
Problem
Write a CLI program in your preferred language to simulate the above spacecraft. Display output as follows:

Begin with (0, 0) ready for launch.
After every movement, display the updated position.
If the ship goes more than 5 points to the left/right, display wrong trajectory.
If the ship tries to decrease the speed below 1, display minimum speed.
If the ship tries to increase the speed over 5, display maximum speed.
When the ship reaches (0, 250) display on the moon.
If the ship goes beyond 250 on the y-axis, display contact lost.
Sample output
(0, 0) # Begin with original position.
(0, 1) # W increases the speed to 1 and moves forward.
(0, 3) # W increases the speed to 2 and moves forward.
(-1, 5) # A moves the ship left and forward.
(0, 7) # D moves the ship right and forward.
(0, 8) # S decreases the speed to 1 and moves forward.
...
(0, 250) on the moon # Ship reaches the moon.
*/

const getInput = (onKeyPress: (e: string) => void) => {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    console.log('start');
    process.stdin.on('keypress', (key: string, data) => {
      console.log('key', key);
        onKeyPress(key);
    });
}

type Status = {
    x: number;
    y: number;
    v: number;
    status: string[];
}

type Forces = keyof Status;

const CONSTANTS = {
    x: {max: 5, min: -5},
    y: {max: 6, min: 0},
    v: {min: 1, max: 5}
};

let status:Status = {
    x: 0,
    y: 0,
    v: 0,
    status: [],
};

type UpdateStatus = Status & {
}

type Delta = {
  v: number;
  x: number;
}
type Deltas = {
  w: Delta;
  s: Delta;
  a: Delta;
  d: Delta;
};

// do velocity first
const Forces = ['v', 'x', 'y'];

const deltas = {
    w: {v: 1, x: 0},
    s: {v: -1, x: 0}, 
    a: {v:0, x: -1},
    d: {v:0, x: 1}
};

const statusCodeMessages = {
    XBELOWMIN: "X too low",
    XABOVEMAX: "X too high",
    YABOVEMAX: "Y too high",
    VBELOWMIN: "Velocity too low",
    VABOVEMAX: "Velocity too high"
}

const updateStatus = (curStatus: Status, constants: Record<string, any>, key: string):UpdateStatus => {
    const newStatus: Status = {...curStatus};
    const status:string[] = [];
    // update Velocity
    const delta = deltas[key as keyof Deltas];
    if (!delta) return {
      ...curStatus,
      status: ["invalid key"]
    }

    let skipRest = false;
    Forces.every((force: string) => {
      if (skipRest) return false;
      // @ts-ignore
      let newStat:number = curStatus[force as keyof Status] + (force === 'y' ? newStatus.v : delta[force as keyof Delta]);

      if(newStat < constants[force].min) {
        status.push(`${force.toUpperCase()}BELOWMIN`);
        if (force === 'v' && newStat <= 0) {
          skipRest = true;
          return false;
        }
        newStat = constants[force].min;
        // have to lift off first.
      }
      if(newStat > constants[force].max) {
        status.push(`${force.toUpperCase()}ABOVEMAX`);
        newStat = constants[force].max;
      }
            // @ts-ignore
      newStatus[force as keyof Status] = newStat;
      return true;
    });

    if(newStatus.x === 0 && newStatus.y === constants.y.max) {
      status.push('LANDED');
    }
    return {
        ...newStatus,
        status
    };
}

const onKeyPress = (key: string) => {
  status = updateStatus(status, CONSTANTS, key);
  console.log(`(${status.x}, ${status.y}) ${status.status}`);
}

getInput(onKeyPress);

// describe('Test suite', function() {
//     const status1 = {x:0, y:1, v: 1, status: []};
//     it('checks initial s', function () {
//       assert.deepEqual(updateStatus(initialStatus, CONSTANTS, 's'), {x:0, y:0, v: 0, status: ["VBELOWMIN"]});
//     });
//     it('checks initial w', function () {
//         assert.deepEqual(updateStatus(initialStatus, CONSTANTS, 'w'), {x:0, y:1, v: 1, status: []});
//     });
//     it('checks initial w then w', function () {
//       assert.deepEqual(updateStatus(updateStatus(initialStatus, CONSTANTS, 'w'), CONSTANTS, 'w'), {x:0, y:3, v: 2, status: []});
//     });
//     it('checks initial w then w', function () {
//       assert.deepEqual(updateStatus(updateStatus(updateStatus(initialStatus, CONSTANTS, 'w'), CONSTANTS, 'w'), CONSTANTS, 'w'), {x:0, y:6, v: 3, status: ["LANDED"]});
//     });
// });
  
// mocha.run();

