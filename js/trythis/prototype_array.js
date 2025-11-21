/**
 * mapBy(), findBy(), filterBy, rejectBy(), sortBy()
 * firstObject, lastObject
 *
 *
 */

const assert = require("assert");

const arr = [1, 2, 3, 4, 5];
const hong = { id: 1, name: "Hing" };
const kim = { id: 2, name: "Kim" };
const lee = { id: 3, name: "Lee" };
const users = [hong, lee, kim];

//==========getter / setter=======//
// Object.defineProperty(Array.prototype, "firstObject", {
//   get() {
//     return this[0];
//   },
//   set(v) {
//     this[0] = v;
//   },
//   enumerable: false,
// });

// Object.defineProperty(Array.prototype, "lastObject", {
//   get() {
//     return this[this.length - 1];
//   },
//   set(v) {
//     this[this.length - 1] = v;
//   },
//   enumerable: false,
// });

Object.defineProperties(Array.prototype, {
  firstObject: {
    get() {
      return this[0];
    },
    set(val) {
      this[0] = val;
    },
  },
  lastObject: {
    get() {
      return this[this.length - 1];
    },
    set(val) {
      this[this.length - 1] = val;
    },
  },
});

//==========mapBy===========//
// this가 가리키는 것은 users 그 자체
// 반환 값은 기존 배열의 각 요소를 꺼내서,
// item[key]만 모아 새로운 배열을 만들어 반환
Array.prototype.mapBy = function (key) {
  return this.map((item) => item[key]);
};

//==========filterBy=======//
Array.prototype.filterBy = function (key, value, isInclude = false) {
  return this.filter((item) => {
    const prop = item[key];
    if (isInclude) return prop.includes(value);
    return prop === value;
  });
};

//==========filterBy=======//
// Array.prototype.filterBy = function (prop, value, isInclude = false) {
//   return this.filter((item) => {
//     const cb = isInclude
//       ? (a) => a[prop]?.includes(value)
//       : (a) => a[prop] === value;

//     return this.filter(cb);
//   });
// };

//==========rejectBy======//
Array.prototype.rejectBy = function (key, value, isInclude = false) {
  return this.filter((item) => {
    const prop = item[key];
    if (isInclude) return !prop.includes(value);
    return prop !== value;
  });
};

//===========findBy==========//
Array.prototype.findBy = function (key, value) {
  return this.find((item) => item[key] === value);
};

//===========sortBy===========//
Array.prototype.sortBy = function (rule) {
  const [key, direction] = rule.split(":");
  // this.sort((a, b) => a > b ? 1 : -1);
  return [...this].sort((a, b) => {
    if (a[key] < b[key]) return direction === "desc" ? 1 : -1;
    if (a[key] > b[key]) return direction === "desc" ? -1 : 1;
    return 0;
  });
};

assert.deepStrictEqual([arr.firstObject, arr.lastObject], [1, 5]);
assert.deepStrictEqual(users.mapBy("id"), [1, 3, 2]); // users.map(u => u['id'])
assert.deepStrictEqual(users.mapBy("name"), ["Hing", "Lee", "Kim"]);
assert.deepStrictEqual(users.filterBy("id", 2), [kim]);
assert.deepStrictEqual(users.filterBy("name", "i", true), [hong, kim]); // key, value일부, isInclude
assert.deepStrictEqual(users.rejectBy("id", 2), [hong, lee]);
assert.deepStrictEqual(users.rejectBy("name", "i", true), [lee]);
assert.deepStrictEqual(users.findBy("name", "Kim"), kim);
assert.deepStrictEqual(users.sortBy("name:desc"), [lee, kim, hong]);
assert.deepStrictEqual(users.sortBy("name"), [hong, kim, lee]);
assert.deepStrictEqual(users.firstObject, hong);
assert.deepStrictEqual(users.lastObject, kim);
users.firstObject = kim;
assert.deepStrictEqual(users.firstObject, kim);
users.lastObject = hong;
assert.deepStrictEqual(users.lastObject, hong);
