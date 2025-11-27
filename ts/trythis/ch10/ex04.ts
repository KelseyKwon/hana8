import assert from "assert";

const arr = [1, 2, 3, 4];
const users = [{ id: 1, name: 'Hong' }, { id: 2, name: 'Kim' }, { id: 3, name: 'Lee' }];

// const deleteArray = (array, startOrKey, endOrValue = array.length) =>
//   array.filter(
//     typeof startOrKey === 'number'
//       ? (_, i) =>
//           i < Math.min(startOrKey, endOrValue) ||
//           i >= Math.max(startOrKey, endOrValue)
//       : a => a[startOrKey] !== endOrValue
//   );

type TUser = typeof users[0];
const deleteArray = (array: number[] | TUser[], startOrKey: number | keyof TUser, endOrValue: number | TUser[keyof TUser] = array.length) =>
  array.filter(
    typeof startOrKey === 'number' 
    // && typeof endOrValue === 'number'
      ? (_, i) =>
          i < Math.min(startOrKey, endOrValue as number) ||
          i >= Math.max(startOrKey, endOrValue as number)
    //   : a => typeof a !== 'number' && typeof startOrKey !== 'number' && a[startOrKey] !== endOrValue
      : a => typeof a !== 'number' && a[startOrKey] !== endOrValue


console.log(deleteArray(arr, 2)); // [1, 2]
console.log(deleteArray(arr, 1, 3)); // [1, 4]
console.log(arr); // [1, 2, 3, 4]


console.log(deleteArray(users, 2)); // [Hong, Kim]
console.log(deleteArray(users, 1, 2)); // [Hong, Lee]
console.log(deleteArray(users, 'id', 2)); // [Hong, Lee]
console.log(deleteArray(users, 'name', 'Lee')); // [Hong, Kim]

assert.deepStrictEqual(deleteArray(arr, 2), [1, 2]);
assert.deepStrictEqual(deleteArray(arr, 1, 3), [1, 4]);
assert.deepStrictEqual(deleteArray(users, 2), [Hong, Kim]);
assert.deepStrictEqual(deleteArray(users, 'id', 2), [Hong, Lee]);
