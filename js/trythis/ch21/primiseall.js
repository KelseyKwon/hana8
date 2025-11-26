const assert = require("assert");

// 무작위 시간에 value를 반환하며 종료되는 비동기 함수
// const randTime = (value) =>
//   new Promise((resolve) => setTimeout(resolve, 1000 * Math.random(), value));

// const promiseAll = (promises) => {
//   return new Promise((resolve, reject) => {
//     // 빈 배열 처리하기 => 없으면 그냥 성공 처리
//     if (promises.length === 0) {
//       resolve([]);
//       return;
//     }

//     const results = [];
//     let completedCount = 0; // 완료된 작업 수 카운터

//     // 들어온 promise들을 하나씩 확인
//     promises.forEach((promise, i) => {
//       // 예상하지 못한 값이 들어와도 처리할 수 있도록 resolve로!
//       Promise.resolve(promise)
//       .then((value) => {
//         // 순서 보장 로직

//         // === 성공했을 때===//
//         // i번쨰에 결과 배치.
//         results[i] = value; // i에 직접 넣기
//         completedCount++;

//         // promise들이 모두 처리되면=> resolve! (성공)
//         if (completedCount === promises.length) {
//           resolve(results);
//         }
//       })
//       .catch((error) => {
//         // 실패 처리 => 하나라도 안되면 전체 취소
//         reject(error);
//       });
//     });
//   });
// };

const randTime = (sec) =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, sec * 1000 * Math.random(), sec);
  });

const promiseAll = (parr) =>
  new Promise((resolve, reject) => {
    const results = [];
    let runCnt = parr.length; // parr이 끝날때까지 돌기
    // promise가 여러개이므로 for문을 돌려야 한다.
    for (let i = 0; i < parr.length; i++) {
      // 0, 1, 2 순서대로 then이 실행이 되지 않고, 끝나는 순서대로 실행이 된다.
      parr[i]
        .then((res) => {
          // resolve로 보낼 result가 필요하다.
          results[i] = res; // 순서를 지켜야 한다.
          if (++runCnt === parr.length) resolve(results);
        }) // 항상 순서를 맞춰서 promise을 넣어야 한다! -> 끝나면 then이 실행이 된다.
        // .catch(err => reject(err))
        .catch(reject);
    }
  });
// promiseall도 반환 -> 이것도 반환해야함!

Promise.all([randTime(1), randTime(2), randTime(3)]).then((orgArr) => {
  console.log("🚀 ~ orgArr:", orgArr);
  promiseAll([randTime(1), randTime(2), randTime(3)])
    .then((arr) => {
      console.table(arr);
      assert.deepStrictEqual(arr, [1, 2, 3]);
    })
    .catch(console.error);
});

// 위에 random 시간 때문에 실제로는 3번이 먼저 끝나고 -> 1번이 나중에 끝날 수도 있다.
// 하지만 결과는 반드시 [1, 2, 3] 순서여야 한다!

Promise.all([randTime(11), Promise.reject("RRR"), randTime(2.5)])
  .then((orgArr) => {
    // 다른 작업 -> 11, 33이 안 끝났더라도, RRR이 실행되는 즉시
    // catch로 넘어가서 RRR을 출력해야 한다!
    promiseAll([randTime(11), Promise.reject("RRR"), randTime(33)])
      .then((array) => {
        console.log("여긴 과연 호출될까?!");
      })
      .catch((error) => {
        console.log("reject!!!!!!>>", error);
      });
  })
  .catch((err) => {
    console.log("orgCatch >> ", err);
    assert.strictEqual(err, "RRR");
  });
