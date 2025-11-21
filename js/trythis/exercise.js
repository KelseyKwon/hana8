// 함수가 처음 한 번만 실행되고, 그 후에는 항상 undefined을 반환하기!

// function once(fn) {
//   let called = false;
//   let result;

//   // rest parameter -> 함수를 호출할 때 전달한 모든 인수를 배열로 모아서
//   // args라는 이름으로 받는다!
//   // ex) fn3(1, 6) -> args는 [1, 6]이 된다.
//   return function (...args) {
//     if (!called) {
//       called = true;
//       // fn.call(this, ...args) -> this도 전달
//       result = fn.call(this, ...args);
//       return result;
//     }
//     return undefined;
//   };
// }

// once는 함수를 받아서, 함수를 return해야 한다. -> 여기서 bind할 수 있다고 하면 function이라고 해야 한다!
const once = (f, rebirthDelay = 1000) => {
  let done = false;
  return (...args) => {
    if (done) return;
    done = true;
    setTimeout(() => (done = false), rebirthDelay);
    return f(...args);
  };
};

function fivePart(x, y) {
  return `fivePart ${x}, ${y}, id: ${this.id}`;
}
const fn = once(fivePart.bind({ id: 11 }));
console.log("11>>", fn(1, 2));
console.log("12>>", fn(11, 22)); // never run
const fn2 = once(fivePart);
console.log(fn2.bind({ id: 22 })(3, 4));

const fn3 = once((x, y) => `금일 운행금지 차량은 끝번호 ${x}, ${y}입니다!`);
console.log(fn3(1, 6)); // 금일 운행금지 차량은 끝번호 1, 6입니다!
console.log(fn3(2, 7)); // undefined
console.log(fn3(3, 8)); // undefined

let cnts = 0;
const intls = setInterval(() => console.log(cnt, fn(cnts, -cnts), 200));

//================//
console.log("-----------------------");
const before = () => console.log("before....");
const after = (result) => console.log("after...", result);

const someFn = (name, greeting) => `${greeting}, ${name}`;
const someFn2 = (id, nickname, email, level) =>
  `${id}/${nickname}/${email}/${level}`;

// const template = (fn) => {
//   return function (...args) {
//     before();
//     const result = fn(...args);
//     after(result);
//     return result;
//   };
// };
const template =
  (f) =>
  (...args) => {
    before();
    const ret = f(...args);
    setImmediate(after, ret);
    return ret;
  };

const temp = template(someFn); // before → someFn → after 실행
const temp2 = template(someFn2); // before → someFn2 → after 실행

console.log("temp1>>", temp("sico", "hello"));
console.log("temp2>>", temp2(1, "sico", "sico@gmail.com", 5));

//====================//
console.log("---------------------------");
const weeks = ["일", "월", "화", "수", "목", "금", "토"];
let widx = -1;
const getNextWeek = (() => {
  let widx = -1;
  return () => {
    widx += 1;
    if (widx >= weeks.length) widx = 0;
    return `${weeks[widx]}요일`;
  };
  widx += 1; // side-effect!
  if (widx >= weeks.length) widx = 0;
  return `${weeks[widx]}요일`;
})();
// const getNextWeek = (() => {
//   let widx = -1;

//   return () => {
//     widx += 1;
//     if (widx >= weeks.length) widx = 0;
//     return `${weeks[widx]}요일`;
//   };
// })();

let cnt = 0;
const intl = setInterval(() => {
  // widx += 2; // side-effect!
  console.log("call", cnt, getNextWeek());
  if ((cnt += 1) === 7) clearInterval(intl);
}, 1000);
