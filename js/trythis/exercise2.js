/**
 * 연습문제1
 * [1, 2, 3, 4]
 */

// 간단함수 : const f = () => 1c
// function push(arr, ...vals) {
//     return [...arr, ...vals];
// }
const push = (arr, ...vals) => [...arr, ...vals];

// n값을 전달하면 -> 그 값을 사용하고, 아니면 1을 사용
// const pop = (arr, n = 1) => {
//   if (n === 1) return arr[arr.length - 1];
//   return arr.slice(-n);
// };
const pop = (array, cnt = 1) => {
  if (cnt <= 0) return array;
  return cnt === 1 ? array.at(-1) : array.slice(-cnt);
};

const unshift = (arr, ...vals) => [...vals, ...arr];
const shift = (arr, n = 1) => [arr.slice(0, n), arr.slice(n)];

/**
 * 연습문제2
 * 다음과 같은 deleteArray를 순수 함수로 작성하시오.
 */
const assert = require("assert");

const arr = [1, 2, 3, 4];
// const deleteArray = (arr, a, n = arr.length()) => arr.slice(a, n);
/**
 * 특정 원소를 지울려면 2가지 방법이 있다.
 * 비순수함수 : splice()
 * 순수함수 : filter( == ) 인것을 없애기
 */
// const deleteArray = (arr, a, b) => {
//   // typeof로 a의 type을 결정짓는다.
//   if (typeof a === "number") {
//     // if (b === undefined) {
//     //   return arr.slice(0, a);
//     // }
//     // return [...arr.slice(0, a), ...arr.slice(b)];
//     if (typeof a === 'number') {
//         return arr.filter((_, i) => i < a || i >= b )
//     }
//     return arr.filter(s => s[a] !== b)
//   }

// //   if (typeof a === "string") {
// //     return arr.filter((el) => el[a] !== b);
// //   }

// //   return [...arr];
// };

const deleteArray2 = (array, startOrKey, endOrValue) => {
  let fn;
  if (typeof startOrKey === "number") {
    fn = (_, i) => i < startOrKey || i >= endOrValue;
  } else fn = (a) => a[startOrKey] !== endOrValue;
};

const deleteArray3 = (array, startOrKey, endOrValue) =>
  array.filter(
    typeof startOrKey === "number" // number일떄는 아래를 하고, 그게 아니면 아래아래를 한다.
      ? (_, i) => i < startOrKey || i >= endOrValue
      : (a) => a[startOrKey] !== endOrValue
  );
const deleteArray = (array, startOrKey, endOrValue = array.length) =>
  array.filter(
    typeof startOrKey === "number" // number일떄는 아래를 하고, 그게 아니면 아래아래를 한다.
      ? (_, i) =>
          i < Math.min(startOrKey, endOrValue) ||
          i >= Math.min(startOrKey, endOrValue)
      : (a) => a[startOrKey] !== endOrValue
  );
assert.deepStrictEqual(deleteArray(arr, 2), [1, 2]); // 2부터 끝까지 지우고 나머지 리턴
assert.deepStrictEqual(deleteArray(arr, 1, 3), [1, 4]); // 1부터 3미만까지 지우고 나머지 리턴
assert.deepStrictEqual(deleteArray(arr, 3, 1), [1, 4]); // 1부터 3미만까지 지우고 나머지 리턴
assert.deepStrictEqual(arr, [1, 2, 3, 4]);

const Hong = { id: 1, name: "Hong" };
const Kim = { id: 2, name: "Kim" };
const Lee = { id: 3, name: "Lee" };
const users = [Hong, Kim, Lee];

assert.deepStrictEqual(deleteArray(users, 2), [Hong, Kim]);
assert.deepStrictEqual(deleteArray(users, 1, 2), [Hong, Lee]);
assert.deepStrictEqual(deleteArray(users, "id", 2), [Hong, Lee]);
assert.deepStrictEqual(deleteArray(users, "name", "Lee"), [Hong, Kim]);

/**
 * 연습문제3
 *
 */
// const arr = [1, 2, 3, true];
arr.pop();
arr.push(true);

const ret1 = arr.map(String); // String(n)
// const ret1 = arr.map(a => String(a)); // String(n)
assert.deepStrictEqual(ret1, ["1", "2", "3", "4", "true"]);

// 빈 문자열은 무시해야 한다.
// 무시하는법 : filter(Boolean)
// const classNames = (...args) => args.map(a => a.trim()).filter(a => !!a).join(" ");
const classNames = (...args) =>
  args
    .map((a) => a.trim())
    .filter(Boolean)
    .join(" ");
const ret2 = classNames("", "a b c", "d", "", "e");
assert.strictEqual(ret2, "a b c d e");
// 주의: ' a b c d  e'면 안됨!!

/**
 * 연습문제 4
 */
const hong = { id: 1, name: "Hong" };
const choi = { id: 5, name: "Choi" };
const kim = { id: 2, name: "kim" };
const lee = { id: 3, name: "Lee" };
const park = { id: 4, name: "Park" };
const users2 = [kim, lee, park]; // 오염되면 안됨!!

/**
 * 순수 함수는 같은 입력에 대해서 같은 출력.
 * 그리고 외부의 상태를 절대 바꾸지 않는 함수이다.
 */
// const addUser = (users, name) => [...users, name];
// ///return arr.filter((el) => el[a] !== b);
// const removeUser = (users, name) => users.filter((u) => u !== name);
// const changeUser = (users, oldUser, newUser) =>
//   users.map((u) => (u === oldUser ? newUser : u));

users2.addUser = function (newer) {
  return [...this, newer];
};
users2.removeUser = function ({ id: toDelId }) {
  return this.filter(({ id }) => id !== toDelId);
};
users2.changeUser = function (from, to) {
  return this.map((a) => (a.id === from.id ? to : a)); //하나라도 누락이 되면 안됨 => map을 쓰면 됨!
};
// users2.filter(u => typeof u === 'function'); // 이렇게 하면 안읽힌다 왜 안읽힘? 반복문을 돌릴때 이미 다 걸러지기 때문
Object.keys(users2)
  .filter(isNaN)
  .forEach((fname) =>
    Object.defineProperty(users, fname, { enumerable: false })
  );

assert.deepStrictEqual(addUser(users2, hong), [kim, lee, park, hong]);
assert.deepStrictEqual(users, [kim, lee, park]);

assert.deepStrictEqual(removeUser(users2, lee), [kim, park]);
assert.deepStrictEqual(users, [kim, lee, park]);

assert.deepStrictEqual(changeUser(users2, kim, choi), [choi, lee, park]);
assert.deepStrictEqual(users, [kim, lee, park]);

/**
 * 연습문제 5
 * Array.reduce 함수를 고차 함수로 직접 구현하시오.
 */
// const reduce = (arr, fn, initValue) => {
//   let acc;
//   let startIndex = 0;

//   // 안넘어오면 그냥 initValue = acc
//   if (initValue !== undefined) {
//     acc = initValue;
//   }

//   // 넘어오면 acc = arr[0], startIndex를 그 다음으로
//   else {
//     acc = arr[0];
//     startIndex = 1;
//   }
//   for (let i = startIndex; i < arr.length; i++) {
//     acc = fn(acc, arr[i]);
//   }
// };

const reduce = (array, fn, initValue) => {
  let i = 0;
  // initValue가 null or undefined이면 array[i++]을 사용
  let acc = initValue === undefined ? array[i++] : initValue;
  for (; i < array.length; i++) {
    acc = fn(acc, array[i], i, array);
  }
  return acc;
};

reduce([1, 2, 3], (a, b) => a + b, 0); // 6이면 통과!
// cf. [1,2,3].reduce((a,b) => a + b, 0);    // 6
reduce([1, 2, 3, 4, 5], (a, b) => a + b); // 15면 통과!
reduce([1, 2, 3, 4, 5], (a, b) => a * b, 1); // 120이면 통과!
reduce([2, 2, 2], (a, b) => a * b); // 8이면 통과!
reduce([3, 3, 3], (a, b) => a * b, 0); // 0이면 통과!
reduce(users, (acc, user) => acc + user.name); // [object Object]LeePark

/**
 * 연습문제 6
 * 다음과 같은 정수 배열이 주어졌을 때, reduce를 이용하여, 각 요소를 다음의 순서로 처리하시오. (1회전으로 처리!)
 → 배열의 각 요소를 제곱   n => n ** 2            [square]
 → 배열 각 요소의 제곱근   n => Math.sqrt(n)      [sqrt]
 → 배열의 각 요소를 세제곱  n => n ** 3            [cube]
 */
// const arr2 = [1, 2, 3, 4, 5];
// arr2.map(a => a ** 2).map(a => Math.sqrt(a)).map(a => a ** 3);
// ⇒⇒⇒ 결과 => [ 1, 8, 27, 64, 125 ]
const arr2 = [1, 2, 3, 4, 5];
const square = n => n ** 2;
const sqrt = n => Math.sqrt(n);
const cube = n => n ** 3;

const xr1 = arr2.map(square).map(sqrt).map(cube);
assert.deepStrictEqual(xr1, [1, 8, 27, 64, 125]);

const xr2 = arr2.map(a => [square, sqrt, cube].reduce((acc, fn) => fn(acc), a));
console.log('🚀  xr2:', xr2);
const xr3 = arr2.map(a => [cube, square, sqrt].reduce((acc, fn) => fn(acc), a));
console.log('🚀  xr3:', xr3);
const xr4 = arr2.map(a =>
  [square, cube, n => n + 1].reduce((acc, fn) => fn(acc), a)
);
console.log('🚀  xr4:', xr4);
