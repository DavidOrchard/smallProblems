/*# class LoginTimestamps {
  #   void Save(string userId, string timestamp) {
  #   }
    
  #   void GetLastLogins(string userId, in lastNTime) {
  #   }
  # }
  
  
  # LoginTimestamps.Save("user#62adb88e-a80a-4dc8-8865-f523d34bd7e1", "1661380001")
  # LoginTimestamps.Save("user#62adb88e-a80a-4dc8-8865-f523d34bd7e1", "1661380002")
  # LoginTimestamps.Save("user#62adb88e-a80a-4dc8-8865-f523d34bd7e1", "1661380003")
  # LoginTimestamps.Save("user#62adb88e-a80a-4dc8-8865-f523d34bd7e1", "1661380004")
  # LoginTimestamps.Save("user#62adb88e-a80a-4dc8-8865-f523d34bd7e1", "1661380005")
   
  # LoginTimestamps.GetLastLogins("user#62adb88e-a80a-4dc8-8865-f523d34bd7e1", 3) => 
  # "1661380005", "1661380004", "1661380003"

  Constraints: space could be billions, evict after N entries?
  thinking long term job to do gcol, but now for just on the Save.

  Don't too care about perf, let's go for a per user.
  LIFO Stack? Not queue
  Might not be in sorted order.

  */
 /* single test case ran first time
    multiples wasn't sorted, added reverse ran
    */

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
  
  const MAX_DEPTH = 1000;
  // could have structure with isSorted flag
  const userLogs:Record<string,any> = {};
  const save = (user:string, time:string) => {
    // TODO error check on user & time
    // convert time to number
    // ensure in order in queue. (could be linked list?)
    // check if user exists
    if(!userLogs[user]) {
      userLogs[user] = [];
    }
    // evict, eventually do
    // TODO refactor, do aslice instead of while.
    while(userLogs[user].length > MAX_DEPTH) {
      userLogs[user].unshift();
    }

    // insert in sorted
    // TODO cleanup, O(nlogn)
    userLogs[user].push(time);
    userLogs[user].sort();
  }
  const getLastLogins = (user:string, num:number) => {
        // TODO error check on user & num

    if(!userLogs[user]) return [];
    return userLogs[user].slice(userLogs[user].length - Math.min(userLogs[user].length, num)).reverse();
  }
  // https://mochajs.org/#dynamically-generating-tests
  describe('Test suite', function() {
      const tests = [
          // {args: {logs:[["user#62adb88e-a80a-4dc8-8865-f523d34bd7e1", "1661380003"]], user: "user#62adb88e-a80a-4dc8-8865-f523d34bd7e1", n:1, },expected:["1661380003"]},
          {args: {logs: [[ "user#62adb88e-a80a-4dc8-8865-f523d34bd7e1", "1661380001"],
          ["user#62adb88e-a80a-4dc8-8865-f523d34bd7e1", "1661380002"],
         ["user#62adb88e-a80a-4dc8-8865-f523d34bd7e1", "1661380003"],
          ["user#62adb88e-a80a-4dc8-8865-f523d34bd7e1", "1661380004"],
          ["user#62adb88e-a80a-4dc8-8865-f523d34bd7e1", "1661380005"]], 
        user: "user#62adb88e-a80a-4dc8-8865-f523d34bd7e1", n: 3},
         expected: ["1661380005", "1661380004", "1661380003"]}
      ];
      tests.forEach(({args, expected}) => 
          it('check '+args, function () {
            args.logs.forEach(([user, time]) => save(user,time));
            assert.deepEqual(getLastLogins(args.user, args.n), expected);
          })
      );
    });
  
  mocha.run();
  
