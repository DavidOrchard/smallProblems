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
https://leetcode.com/problems/course-schedule/
There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
Return true if you can finish all courses. Otherwise, return false.

 

Example 1:

Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0. So it is possible.
Example 2:

Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.
 

Constraints:

1 <= numCourses <= 2000
0 <= prerequisites.length <= 5000
prerequisites[i].length == 2
0 <= ai, bi < numCourses
All the pairs prerequisites[i] are unique.
*/

const LOG = true;

const makePreReqs = (prerequisites:number[][], n:number) => prerequisites.reduce((acc: number[][], [course, prereq]) => {
  // if(LOG) console.log('course', course, 'prereq', prereq, acc);
  if(!acc[course]) {
    acc[course] = [];
  }
  acc[course].push(prereq);
  return acc;
}, [] );

let checked:boolean[] = [];

const validPreReqs = (course:number, prereqs:number[][]) => {
  const visited:boolean[] = [];
  let canFinishCourse = true;
  let temp = [course];
  if(LOG) console.log('course', course, 'temp', temp);
  if(LOG) console.table(prereqs);
  while(temp?.length > 0 && canFinishCourse) {
    const checking = temp.shift();
    if( typeof checking === "undefined") {
      if(LOG) console.log('checking undefined');
      continue;
    }
    if( checked[checking]) {
      if(LOG) console.log('already checked', checking);
      continue;
    }
    checked[checking] = true
    if(LOG) console.log('checking', checking, 'visited', visited);
    if(typeof checking !== "undefined" && typeof visited[checking] === "undefined") {
      visited[checking] = true;
      const temppost = prereqs[checking];
      if(LOG) console.log('temppost', temppost);
      if( typeof temppost !== "undefined") {
        temp = temp.concat(temppost);
      }
    } else {
      if(LOG) console.log('!visited loop, checking =', checking, 'course', course, 'visited[checking]', typeof checking !== "undefined" ? visited?.[checking] : 'undefined checking');
      canFinishCourse = false
    }
  }
  return canFinishCourse;
}; 

function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  // find circular loop in graph.
  // if node visited traversing loop then false.
  // say 1,0; 0,1
  // start with 0, mark in array.
  // traverse to 1, pre-req in array so fail.
  // 
  // traverse pre-requesites making post-requesite graph, so 0 contains [1], [1] contrains [0].
  checked = [];
  const prereqs = makePreReqs(prerequisites, numCourses);
  if(LOG) console.table(prereqs);
  let canFinishAll = true;
  for(let i = 0; i< numCourses - 1 && canFinishAll; i++) {
    if(LOG) console.log('checking i', i, 'prereqs', prereqs);
    if(!validPreReqs(i, prereqs)) {
      canFinishAll = false;
      break;
    }
  }
  return canFinishAll;
};
// https://mochajs.org/#dynamically-generating-tests
describe('Test suite', function() {
    const tests = [
      {args: {n:2, prerequisites:[[1,0],[0,1]]},expected:false},

        // {args: {n:2, prerequisites:[[1,0]]},expected:true},
        // {args: {n:2, prerequisites:[[0,1]]},expected:true},

        // // check that 0 doesn't hit falsey condition
        // {args: {n: 3, prerequisites:[[1,0]]}, expected: true},
        // // check that prereq===course fails
        // {args: {n:20, prerequisites:[[0,10],[3,18],[5,5],[6,11],[11,14],[13,1],[15,1],[17,4]]},expected:false},
        // {args: {n:3, prerequisites:[[0,1],[0,2],[1,2]]}, expected: true},
        // {args: {n:7, prerequisites:[[1,0],[0,3],[0,2],[3,2],[2,5],[4,5],[5,6],[2,4]]
        // }, expected: true},
        // {args: {n:7, prerequisites:[[2,5],[4,5],[2,4]]
        // }, expected: true},

        // {args:{n:8, prerequisites:[[1,0],[2,6],[1,7],[6,4],[7,0],[0,5]]}, expected:true}

    ];
    tests.forEach(({args, expected}) => 
        it('check '+JSON.stringify(args), function () {
            assert.deepEqual(canFinish(args.n, args.prerequisites), expected);
        })
    );
  });

mocha.run();
