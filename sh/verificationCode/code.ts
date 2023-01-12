
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
Say, an organization issues ID cards to its employees with unique ID codes. The ID code for an employee named Jigarius Caesar looks as follows: CAJI202002196.

Here’s how the ID code is derived:

CA: First 2 characters of the employee’s last name.
JI: First 2 characters of the employee’s first name.
2020: Full year of joining.
02: 2 digit representation of the month of joining.
19: Indicates that this is the 19th employee who joined in Feb 2020.
This will have at least 2 digits, starting with 01, 02, and so on.
6: The last digit is a verification digit which is computed as follows:
Take the numeric part of the ID code (without the verification digit).
Sum all digits in odd positions. Say this is O.
Sum all digits in even positions. Say this is E.
Difference between O & E. Say this is V.
If V is negative, ignore the sign, e.g., -6 is treated as 6. Say this is V.
If V is greater than 9, divide it by 10 and take the reminder. Say this is V.
V is the verification code.
For the above ID card, here’s how you‘ll test the verification digit.

CAJI202002196 # ID code
202002196 # Numeric part
20200219 # Ignoring verification digit
2 + 2 + 0 + 1 = 5 # Sum of odd position digits, i.e. O
0 + 0 + 2 + 9 = 11 # Sum of even position digits, i.e. E
5 - 11 = -6 # V = O - E
6 # Verification digit, ignoring sign
An ID code is considered valid if:

The first 4 characters of the card are correct, i.e. CAJI.
The verification digit is correct, i.e. 6.
*/

type TestData = {
  first: string;
  last: string;
  year: string;
  month: string;
  employeeNumber: string;

}
const genVerificationCode = ({first, last, year, month, employeeNumber}:TestData) =>
{
  const code = year + month + employeeNumber;
  const odd = [...code].filter((_, index) => index % 2 === 0).reduce((acc, item) => acc + parseInt(item), 0);
  const even = [...code].filter((_, index) => index % 2 === 1).reduce((acc, item) => acc + parseInt(item), 0);
  const verificationCode = Math.floor(Math.abs(odd - even)%10);
  return `${last.substring(0, 2).toUpperCase()}${first.substring(0, 2).toUpperCase()}${code}${verificationCode}`;

};
describe('Test suite', function() {
  const testData = {
    first: "Jigarias",
    last: "Caesar",
    year: "2020",
    month: "02",
    employeeNumber: "19"
  }
  it('check no items', function () {
    assert.equal(genVerificationCode(testData), "CAJI202002196");
  });
})

mocha.run();
