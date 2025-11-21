const assert = require("assert");
const { isDeepStrictEqual } = require("util");

/**
 * 연습문제1
 */

const range = (s, e, step = s > e ? -1 : 1) => {
  console.log("range>>", s, e, step);
  if (s === e || step === 0) return [s]; // start = end이면, [s]
  // if (s>e && step > 0) return [];
  // if (s<e && step < 0) return [];
  if ((s - e) * step > 0) return [];

  //   if (e === undefined) {
  //     if (s > 0) {
  //       // if s = 5
  //       e = s;
  //       s = 1;
  //     } else if (s < 0) {
  //       e = -1;
  //     } else {
  //       return [0];
  //     }
  //   }
  const tmps = s;
  // e가 undefined일때만 뒤쪽 계산 실행
  //
  e = e ?? (s > 0 ? ((s = 1), tmps) : s === 0 ? 0 : -1);

  const rets = [];
  // while(true) {
  //   let i = s;
  //   while (rets.length < 1000) {
  //     // 5 4 3 2 1
  //     if (s > e && i < e) break; // 5 4 3 2 1
  //     if (s < e && i > e) break; // 1 2 3 4 5

  //     rets.push(i);
  //     i += step;
  //   }

  // 두번재가 false를 반환하면 -> for문을 빠져나와야 한다!
  for (let i = s; s > e ? i >= e : i <= e; i += step) {
    rets.push(i);
  }

  return rets;
};

// const range = (s, e, step) => {
//   if (e === undefined) {
//     // e가 없으면 1부터 s, 간격 = 1 있는 배열을 return한다
//     if (s > 0) return range(1, s, 1);
//     if (s < 0) return range(s, -1, 1);
//     return [0];
//   }

//   // step을 결정짓기
//   if (step === undefined) step = s > e ? -1 : 1;

//   // 단일 원소 배열 return
//   if (step === 0 || s === e) return [s];

//   // 비정상 조합
//   if ((s - e) * step > 0) return [];

//   const ret = [];
//   if (step > 0) {
//     for (let i = s; i <= e; i += step) ret.push(i);
//   } else {
//     for (let i = s; i >= e; i += step) ret.push(i);
//   }

//   return ret;
// };

assert.deepStrictEqual(range(1, 10, 1), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
assert.deepStrictEqual(range(1, 10, 2), [1, 3, 5, 7, 9]);
assert.deepStrictEqual(range(1, 10), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
assert.deepStrictEqual(range(10, 1), [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);

assert.deepStrictEqual(range(5, 5, 0), [5]);
assert.deepStrictEqual(range(1, 5, 0), [1]);
assert.deepStrictEqual(range(5, 5, -1), [5]);
assert.deepStrictEqual(range(5, 5), [5]);
assert.deepStrictEqual(range(0, 0, 5), [0]);
assert.deepStrictEqual(range(1, 5, -1), []);

assert.deepStrictEqual(range(1, 5, 6), [1]);
assert.deepStrictEqual(range(0, 5), [0, 1, 2, 3, 4, 5]);
assert.deepStrictEqual(range(-3, 0), [-3, -2, -1, 0]);

assert.deepStrictEqual(range(5, 1, 1), []);
assert.deepStrictEqual(range(0, -1), [0, -1]);
assert.deepStrictEqual(range(0, -3), [0, -1, -2, -3]);
assert.deepStrictEqual(range(5, 1), [5, 4, 3, 2, 1]);
assert.deepStrictEqual(range(10, 1, -2), [10, 8, 6, 4, 2]);

assert.deepStrictEqual(range(5), [1, 2, 3, 4, 5]);
assert.deepStrictEqual(range(0), [0]);
assert.deepStrictEqual(range(0, 0), [0]);
assert.deepStrictEqual(range(2, 1, -5), [2]);
assert.deepStrictEqual(range(0, -1, -5), [0]);
assert.deepStrictEqual(range(-5), [-5, -4, -3, -2, -1]);
assert.deepStrictEqual(
  range(50),
  Array.from({ length: 50 }, (_, i) => i + 1)
);
assert.deepStrictEqual(
  range(1, 150, 3),
  Array.from({ length: 50 }, (_, i) => i * 3 + 1)
);

/**
 * 연습문제2
 */

// const keyPair = (arr, N) => {
//   const map = new Map();

//   for (let i = 0; i < arr.length; i++) {
//     const cur = arr[i];
//     const need = N - cur;

//     if (map.has(need)) {
//       //
//       return [map.get(need), i];
//     }

//     map.set(cur, i);
//   }

//   return [];
// };

// 100개를 다 비교하면 비용이 너무 많이 든다.
const keyPairOn__2 = (arr, sum) => {
  // 내가 원하는 것을 미리 담아놓기
  // const myPairIndex = {};
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === sum) {
        return [i, j];
      }
    }
  }
};

const keyPair = (arr, sum) => {
  const myPairIndex = {}; //객체는 hash 되어 있으니까 내가 원하는 것을 바로 찾는다.
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    const pairIdx = myPairIndex[val];
    if (pairIdx) return [pairIdx, i];
    myPairIndex[sum - val] = i;
  }
};

assert.deepStrictEqual(keyPair([1, 3, 4, 5], 7), [1, 2]);
assert.deepStrictEqual(keyPair([1, 4, 45, 6, 10, 8], 16), [3, 4]);
assert.deepStrictEqual(keyPair([1, 2, 4, 3, 6], 10), [2, 4]);
const x = keyPair([1, 2, 3, 4, 5, 7], 9);
assert.ok(isDeepStrictEqual(x, [3, 4]) || isDeepStrictEqual(x, [1, 5]));
keyPair([1, 3, 4, 5], 7); // [1, 2]
keyPair([1, 4, 45, 6, 10, 8], 16); // [3, 4]
keyPair([1, 2, 4, 3, 6], 10); // [2, 4]
keyPair([1, 2, 3, 4, 5, 7], 9); // [3, 4]  or [1, 5]
