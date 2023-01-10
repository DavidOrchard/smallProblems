var Mocha = require('mocha')
var assert = require('assert')
var mocha = new Mocha()

mocha.suite.emit('pre-require', this, 'solution', mocha);

// Find the maximum number of concurrent sessions in the following data with the first value representing start time and last value end time. The input is not necessarily sorted.
// Input:  (2,5), (3,6), (8,10),(10,12),(9,20)
// Output: 3 (from 8 to 20)
// Input: (2,5), (3,6), (8,10),(9,12),(12,20)
// Output: 2 (from 8 to 12 or 2 to 6)

const maxConcurrentSessions = (sessions) => {
  const sessionsByTime = [];
  let firstIndex = Math.max();
  let lastIndex = 0;
  let max = 0;
  let maxStartIndex;
  sessions.forEach(([start, end ]) => {
    if(start < firstIndex) firstIndex = start;
    if(end > lastIndex) lastIndex = end;
    for(let i = start; i <= end; i++) {
      sessionsByTime[i] = !sessionsByTime[i] ? 1 : sessionsByTime[i] + 1;
      if (max < sessionsByTime[i]) {
        max = sessionsByTime[i];
        maxStartIndex = i;
      }
    };
  });

  let maxEnd = maxStartIndex;
  for(let i = maxStartIndex; i <= lastIndex; i++) {
    if(sessionsByTime[i] < max) {
      break;
    }
    maxEnd = i;

  }
  return `${max} (from ${maxStartIndex} to ${maxEnd})`;
}

describe('Test suite', function() {
  it('check simple', function() {
    assert.equal(maxConcurrentSessions([[2,5]]), "1 (from 2 to 5)");
  })
  it('check two', function() {
    assert.equal(maxConcurrentSessions([[2,5], [3, 6]]), "2 (from 3 to 5)");
  })
  it('check 4', function() {
    assert.equal(maxConcurrentSessions([[2,5], [3, 6], [8, 10], [10, 12], [9, 20]]), "3 (from 10 to 10)");
  })
  it('check 2 equal results', function() {
    assert.equal(maxConcurrentSessions([[2,5], [3, 6], [8, 10], [9, 12], [12, 20]]), "2 (from 3 to 5)");
  })
})

mocha.run();
