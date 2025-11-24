// connect 함수 => connection할때 실행되는 함수. I/O -> 비동기, 즉 실행할때만 실행되는 함수
/**
 * setTimeout 기반의 콜백 비동기
 */
function f(cb, delay) {
  // callback만 실행하려면
  // interrupt가 발생하면 아래 줄이 실행됨.
  console.log("connecting...."); // 하나는 동기가 되는 것이다.
  setTimeout(cb, delay);
  //   cb();
}

//========비동기의 틀=======//
function query(sql, cb) {
  try {
    console.log("run sql:", sql);
    throw new Error("Error !!");
    const result = [{ id: 1 }];
    cb(null, result); // 성공했을떄
  } catch (err) {
    cb(err); // 실패했을때
  } finally {
    console.log("close!");
  }
}

function queryPromise(sql) {
  return new Promise((resolve, reject) => {
    //promise는 항상 callback!
    try {
      console.log("run sql:", sql);
      const result = [{ id: 1 }];
      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      console.log("close!");
    }
  }); // async / await을 최종적으로 쓴다.
}

// class Promise {
//   #thenFns = [];
//   #catchFns = [];
//   #finallyFns = [];
//   constructor(cb) {
//     cb(this.resolve, this.reject);
//   }
//   resolve(ret) {
//     let r = ret
//     for (const fn of this.#thenFns) { // 앞에서부터 함수를 꺼내야 한다.
//         try {}
//         r = fn(r);
//     }
//     this.#thenFns.forEach(fn => fn(ret))}
//   reject(err) {
//     this.#catchFns(err);
//   }

//   then(cb) {
//     this.#thenFns.push(cb); // 여기에 아래 함수가 실행되면 3줄이 들어가게 된다.
//   }
//   catch(cb) {
//     this.#catchFns.push(cb);
//   }
// }

// f를 promise로 바꾸기
const ff = (delay) =>
  // callback에서 위에 Promise가 가지고 있는 resolve, reject 멤버 변수를 주게 된 것이다.
  new Promise((resolve, reject) => {
    console.log("connecting....");
    setTimeout(resolve(111), delay);
    // setTimeout(reject(new Error("RRR")), delay);
  });

// query("select * from User", (err, res) => {
//   if (err) {
//     // 에러가 발생 -> catch에서 걸렸을 때!
//     console.error(err);
//     return;
//   }
//   console.log("success!!", res);
// });

/**
 * 이 함수의 문제점
 *
 * 콜백 지옥! 비동기 -> 비동기 -> 비동기...
 *
 */
f(
  () =>
    // 이렇게 해야 function으로 호출됨 => 그냥 query만 넣으면
    // 결과만 나오게 된다.
    query("select * from User", (err, res) => {
      if (err) {
        // 에러가 발생 -> catch에서 걸렸을 때!
        console.error(err);
        return;
      }
      console.log("success!!", res);
      query("update...", (err, res) => {});
    }),
  1000
);

/**
 * 두 개의 쿼리를 동시에 실행 -> 세션만 되면 동시에 받아들인다.
 * 동시에 실행 & 결과를 array로 준다.
 */
Promise.all(query("select1"), query("select2")).then(([r1, r2]) =>
  console.log(" ~ r >>> ", r1, r2)
);

ff()
  .then(() => queryPromise("update User.."))
  .then((result) => console.log("result", result))
  .then(() => console.log("***********"))
  .catch((err) => console.error(err.message))
  .catch(console.error)
  //   .finally(() => console.log("close!!"));
  .finally(() => console.log("Finally!!!!"));

// const conn = await ff(); // connection이 될 때까지 기다린다.
// try {
//   const result = queryPromise("update...");
// } catch (err) {
//   console.log(err.message);
// }

// task - queue
// 지정 시간 이무 & micro-task-queue 끝난 후.
f(() => console.log("xxxxxxx"), 1000); // 1초 이따 꺠워줘 -> 거의 동시에 실행하게 됨.
console.log("-------------------");

// f에 callback 함수를 줬다.
f(() => console.log("yyyyyyy11"), 1000); // 1초 후에 실행되는 함수.

// promise로 만들면 -> 1000이 끝나면 -> then, 그리고 이게 끝나면 -> 또 then
// callback 안에 callback이 또 들어갈 필요 없이, then이 끝나면 뒤에 then, 그리고 이게 끝나면
// 또 뒤에 then이 호출된다.
ff(1000)
  .then(() => {
    console.log("yyyyyyy22");
    return "999";
  })
  //   .then((res) => console.log(res));
  .then(console.log);
console.log("-------------------");

// micro-task-queue
// => setTImeout보다 더 먼저 실행된다!
Promise.resolve().then(() => console.log("zzzzzzzzz"));

const sampleUrl = "https://jsonplaceholder.typicode.com/users/1";
// const myFetch = url => fetch(url).then(res => res.json());
// const fetch = new Promise((res, rej) => ...)
const response = fetch(sampleUrl)
  .then((res) => res.json())
  .then((res) => console.log("%%%>>", res));

console.log("🚀 ~ response:", response);
const r1 = await fetch(sampleUrl);
const rrr = await r1.json();
