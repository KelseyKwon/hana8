/**
 * has(k), add(k, v), delete(k), clear(), forEach(),
keys(), values(), entries(), size,      // entries()는 `val => val`
* node 22.0 ~
intersection(교), difference(차), union(합), symmetricDifference(대칭차),
sm.isSubsetOf(big), big.isSupersetOf(sm), isDisjointFrom(서로소)

const set = new Set([1, 11, 2, 22]); 
for(const v of set) {...}; // values()가 맵의 기본 iterator!, [Symbol.iterator], values, keys는 모두 같은 코드!
const arr = [ 1, 2, 2, 3, 4, 5, 5, 6];
const uniqArr = [...new Set(arr)];  // [ 1, 2, 3, 4, 5, 6 ]
(주의) Set의 value가 reference type일 경우 GC 대상이 안됨!(: Set자체가 참조)

 */
const assert = require("assert");

const hong = { id: 1, name: "Hong", dept: "HR" };
const kim = { id: 2, name: "Kim", dept: "Server" };
const lee = { id: 3, name: "Lee", dept: "Front" };
const park = { id: 4, name: "Park", dept: "HR" };
const ko = { id: 7, name: "Ko", dept: "Server" };
const loon = { id: 6, name: "Loon", dept: "Sales" };
const choi = { id: 5, name: "Choi", dept: "Front" };
const users = [hong, kim, lee, park, ko, loon, choi];

Array.prototype.uniqBy = function (prop) {
  //   const dept_set = new Set();
  //   // for (user_dept : users[prop]):
  //   //     dept_set.add(user_dept)
  //   // return dept_set
  //   for (const item of this) {
  //     dept_set.add(item[prop]);
  //   }
  //   return [...dept_set]; // set을 배열로 바꾸기

  return [...new Set(this.map((a) => a[prop]))];
};

// Array.prototype.groupBy = function (prop) {
//   const result = {};

//   for (const item of this) {
//     // prop = dept
//     const key = item[prop];

//     // 객체 -> 객체의 key가 없으면 배열을 생성해야 한다.
//     // if (!result[key]) {
//     if (!Object.hasOwn(result, key)) {
//       result[key] = [];
//     }

//     result[key].push(item);
//   }

//   return result;
// };

Array.prototype.groupByMap = function (prop) {
  // dept: ... 이런식으로
  const map = new Map();
  for (const a of this) {
    const key = a[prop]; //HR : ...
    const val = map.get(key);
    console.log(key, val);
    if (val) val.push(a); // Map() 객체에 원소 추가
    else map.set(key, [a]); // set 에 추가.
  }
  return map; // 'HR' : [emp1, emp2]
};

Array.prototype.groupBy = function (prop) {
  //   return this.groupByMap(prop)
  //     .entries()
  //     .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
  const ret = { HR: [] };
  for (const a of this) {
    const key = a[prop];
    ret[key] = ret[key] || [];
    // a+=b
    ret[key] ||= [];
    ret[key].push(a);
  }
  return ret;
};

// 모든 users 중에서 dept -> 추가했으면 안하고 추가 안했으면 추가하기.
assert.deepStrictEqual(users.uniqBy("dept"), [
  "HR",
  "Server",
  "Front",
  "Sales",
]);

assert.deepStrictEqual(
  users.groupBy("dept"),
  Object.groupBy(users, (user) => user.dept)
);
