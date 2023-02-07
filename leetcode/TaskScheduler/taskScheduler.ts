/*
Given a characters array tasks, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.

However, there is a non-negative integer n that represents the cooldown period between two same tasks (the same letter in the array), that is that there must be at least n units of time between any two same tasks.

Return the least number of units of times that the CPU will take to finish all the given tasks.

 

Example 1:

Input: tasks = ["A","A","A","B","B","B"], n = 2
Output: 8
Explanation: 
A -> B -> idle -> A -> B -> idle -> A -> B
There is at least 2 units of time between any two same tasks.
Example 2:

Input: tasks = ["A","A","A","B","B","B"], n = 0
Output: 6
Explanation: On this case any permutation of size 6 would work since n = 0.
["A","A","A","B","B","B"]
["A","B","A","B","A","B"]
["B","B","B","A","A","A"]
...
And so on.
Example 3:

Input: tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"], n = 2
Output: 16
Explanation: 
One possible solution is
A -> B -> C -> A -> D -> E -> A -> F -> G -> A -> idle -> idle -> A -> idle -> idle -> A
 

Constraints:

1 <= task.length <= 104
tasks[i] is upper-case English letter.
The integer n is in the range [0, 100].
*/

var Mocha = require('mocha')
var assert = require('assert');
var mocha = new Mocha();

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

const IDLE = "idle";
const leastInterval = function(tasks: string[], n:number) {
    // 1. count the number of each task
    // 2. sort the tasks by the number of each task
    // 3. find the max number of tasks

    const order:string[] = [];
    let numTasks = tasks.length;
    const lastN:string[] = []; // need to splice last n

    const taskCount = tasks.reduce((acc:Record<string, any>, task:string) => {
        acc[task] = acc[task] ? acc[task] + 1 : 1;
        return acc;
    }, {});
    while (numTasks > 0 ) {
      const sortedTasks = Object.keys(taskCount).sort((a, b) => taskCount[b] - taskCount[a]);

      // iterate over sortedTasks.
      // use for to enable break/
      let availableTask = "";
      for(let i = 0; i < sortedTasks.length; i++) {
        const attemptedTask = sortedTasks[i];
        if(lastN.indexOf(attemptedTask) === -1) {
          taskCount[attemptedTask]--;
          if(taskCount[attemptedTask] === 0 ){
            delete taskCount[attemptedTask];
          }
          availableTask = attemptedTask;
          numTasks--;
          break;
        }
      }
      if(!availableTask) {
        availableTask = IDLE;
      }
      order.push(availableTask);
      if(n > 0) {
        lastN.push(availableTask);
        if(lastN.length > n) {
          lastN.shift();
        }
      }
    }
    return order.length;
};
// https://mochajs.org/#dynamically-generating-tests
describe('Test suite', function() {
    const tests = [
      //   {args:
      //       {tasks: ["A","A","A","B","B","B"], n: 2},
      //       expected:["A", "B", IDLE, "A", "B", IDLE, "A", "B" ]
      //   },
      //   {args:
      //     {tasks: ["A","A","A","B","B","B"], n: 0},
      //     expected:["A", "A", "A", "B", "B", "B" ]
      // },
      {args:
        {tasks: ["A","A","A","B","B","B", "C","C","C", "D", "D", "E"], n: 2},
        expected:["A", "A", "A", "B", "B", "B" ]
    }

    ];
    tests.forEach(({args, expected}) => 
        it('check '+args, function () {
            assert.deepEqual(leastInterval(args.tasks, args.n), expected);
        })
    );
  });

mocha.run();
