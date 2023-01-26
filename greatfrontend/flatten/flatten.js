/**
 * @param {Array<*|Array>} value
 * @return {Array}
 */

// https://www.greatfrontend.com/questions/javascript/flatten
// accepted

// flatten([1, [2, 3]]); // [1, 2, 3]
export default function flatten(value) {
  if (value.length === 0 ) return [];
  return value.reduce((acc, val) => (acc.concat(Array.isArray(val) ? flatten(val): val)), []);
}

console.log(flatten([1, [2, 3]]));
console.log(flatten([1, [2, [3, [4, [5]]]]])); // [1, 2, 3, 4, 5]
