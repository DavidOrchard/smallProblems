/*

**



Chat messages or direct messages are an integral part to so many apps, and especially at Whatnot. One of the core problems that we deal with is figuring out how to promote safe behavior on our app, and one of those possible abuse vectors is through chat + DMs.

  

For today, I'd like to focus on a simple function that, when given a list of message objects, returns to me a "clean" list of those messages, where clean means that none of the messages contain content that we deem unsafe. We'll decide this by checking against an in memory list of UNSAFE_WORDS.

  

clean_messages(messages, unsafe_words) -> list[str] 

  

Some example inputs with nonsense messages and unsafe words (we should not be using actual unsafe input in interviews):


UNSAFE_PHRASES = [
  "a lot"
  "Banana peels",
  "APPLE pie",
  "blueberry",
  "Strawberry bananas",
  "Strawberry Hi-chews blue",
  "Strawberry Hi-chews & starbursts and hi-chews",
  "Starbursts a there"]

messages = [
  {
   "username": "tom",
    "text":"my least favorite thing about the banana are the banana peels",
  },
  {
   "username": "jerry",
    "text":"how do you feel about strawberry rhubarb pie",
  },
  {
   "username": "tom",
    "text":"strawberry pies are a no, but i like strawberry starbursts a lot",
  },
  {
   "username": "jerry",
    "text":"what about an apple     pie",
  },
  {
   "username": "tom",
    "text": "they're okay, better than blueberries",
  },
]

Questions
- limits, how many messages/long?  A large amount millions.  But can take all in memory.
- future req, return status of message.
- best possible solution.
- naive, lc + remove non alpha of words & messsages and indexof.
- 
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

const clean_messages = (messages: Record<string, any>[], unsafe_words: string[]) => {
  const unsafeNormalized:string[] = unsafe_words.map((word) => word.toLowerCase());
  // console.log('unsafe', unsafeNormalized);

  const safeMessages = messages.reduce((acc:string[], mess) => {
    const { text:message } = mess;
    // console.log('message', message, 'mess', mess);
    const isNotSafe = unsafeNormalized.some((unsafe:string) => {
      let index = message.indexOf(unsafe);
      // think about character overflow and end of string
      if (index <0 ) return false;
      if (index + unsafe.length === message.length) return true;
      if (message[index+unsafe.length] === " ") return true;
      return false;
    });
    if (!isNotSafe) acc.push(message);
    return acc;
  }, []);

  // console.log('safe', safeMessages);
  return safeMessages;
};

const messagesTrue = [

  {
      "username": "tom",
      "text": "my favorite fruit is the banana",
  },

  {
      "username": "jerry",
      "text": "oh, I also love bananas!",
  },
  {
      "username": "tom",
      "text": "my favorite cocktail is the appletini",
  },
  {
      "username": "jerry",
      "text": "what do you think about the star fruit?",
  },
  {
      "username": "tom",
      "text": "i like the star fruit flavored hi-chew",
  }
]


// https://mochajs.org/#dynamically-generating-tests
describe('Test suite', function() {
    const tests = [
      {args: {unsafe:["banana"], messages: [{username: "d", text: "banana"}]},expected:[]},
      {args: {unsafe:["banana"], messages: [{username: "d", text:"bananas"}]},expected:["bananas"]},
      {args: {unsafe:["Banana","APPLE","Hi-chews","starfruit"], messages: messagesTrue},expected:["oh, I also love bananas!", "my favorite cocktail is the appletini", "what do you think about the star fruit?", "i like the star fruit flavored hi-chew"]}

    ];
    tests.forEach(({args, expected}) => 
        it('check '+args, function () {
            assert.deepEqual(clean_messages(args.messages, args.unsafe), expected);
        })
    );
  });

mocha.run();

