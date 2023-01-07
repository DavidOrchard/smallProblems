/***In order to win the prize for most cookies sold, my friend Alice and I are going to merge our Girl Scout Cookies orders and enter as one unit.**

Each order is represented by an "order id" (an integer).

We have our lists of orders sorted numerically already, in arrays. Write a function to merge our arrays of orders into one sorted array.

For example:
*/

const myArray = [3, 4, 6, 10, 11, 15];
const alicesArray = [1, 5, 8, 12, 14, 19];

const mergeArrays = (array1, array2) => {
  let ar1index = 0;
  let ar2index = 0;
  const mergedArray = [];
  while (!(ar1index == array1.length && ar2index == array2.length)) {
    if( ar1index < array1.length && (array1[ar1index] < array2[ar2index])) {
      mergedArray.push(array1[ar1index]);
      ar1index++;
    } else {
      mergedArray.push(array2[ar2index])
      ar2index++;
    }
  } ;
  return mergedArray;
}
console.log(mergeArrays(myArray, alicesArray));
// logs [1, 3, 4, 5, 6, 8, 10, 11, 12, 14, 15, 19]`


