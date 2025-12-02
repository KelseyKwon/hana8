const assert = require("assert");

// sec초를 최대값으로 하는 랜덤 시간 후에 sec를 resolve!
// const randTime = (sec) =>
//   new Promise((resolve) => {
//     // console.log('🚀 randTime:', sec);
//     setTimeout(resolve, sec * 1000 * Math.random(), sec);
//   });

const randTime = (sec: number): Promise<number> =>
  new Promise((resolve) => {
    setTimeout(resolve, sec * 1000 * Math.random(), sec);
  });

type settledResult<T> =
  | { status: "fulfilled"; value: T }
  | { status: "rejected"; reason: any };
type PromiseObject<T> = Promise<T>[];

/**
 *
 * @param {*} parr ()
 * @returns 모든 Promise의 상태의 결과값을 담은 배열을 반환한다. fulfilled되면 -> resolved된 값 / rejected되면 -> 에러/거부 이유
 * 전부 reject여도 최종 결과는 resolve[...]가 되므로 어떻게든 항상 resolve가 된다.
 * 만약에 runCnt = parr.length가 되면 모든 Promise가 끝남 -> resolve(results)을 호출해서 반환한다.
 */
function promiseAllSettled<T>(
  parr: PromiseObject<T>
): Promise<settledResult<T>[]> {
  return new Promise((resolve) => {
    const results: settledResult<T>[] = [];
    let runCnt = 0;
    for (let i = 0; i < parr.length; i++) {
      parr[i]!.then((value) => {
        results[i] = { status: "fulfilled", value };
      })
        .catch((reason) => {
          results[i] = { status: "rejected", reason };
        })
        .finally(() => {
          if (++runCnt === parr.length) resolve(results);
        });
    }
  });
}

Promise.allSettled([randTime(1), Promise.reject("RRR"), randTime(3)]).then(
  (orgArr) => {
    console.log("orgArr>>", orgArr);
    promiseAllSettled([randTime(1), Promise.reject("RRR"), randTime(3)])
      .then((array) => {
        console.table(array);
        console.log("여긴 과연 호출될까?111!");
        assert.deepStrictEqual(array, orgArr);
      })
      .catch((error) => {
        console.log("allSettled-reject!!!!!!>>", error);
      });
  }
);

function promiseAll<T>(parr: PromiseObject<T>): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    let runCnt = 0;
    for (let i = 0; i < parr.length; i++) {
      parr[i]!.then((res) => {
        results[i] = res;
        if (++runCnt === parr.length) resolve(results);
      }).catch(reject);
    }
  });
}

Promise.all([randTime(1), randTime(2), randTime(3)]).then((orgArr) => {
  console.log("🚀 ~ orgArr:", orgArr);
  promiseAll([randTime(1), randTime(2), randTime(3)])
    .then((arr) => {
      console.table(arr);
      assert.deepStrictEqual(arr, orgArr);
    })
    .catch(console.error);
});

// 둘다 reject가 있으므로 then이 실행이 안되고 catch 구문만 실행이 된다.
Promise.all([randTime(2), Promise.reject("RRR"), randTime(2.5)])
  .then((orgArr) => {
    promiseAll([randTime(11), Promise.reject("RRR"), randTime(33)])
      .then((array) => {
        console.log("여긴 과연 호출될까?!");
      })
      .catch((error) => {
        console.log("reject!!!!!!>>", error);
      });
  })
  .catch((err) => {
    console.log("orgCatch>>", err);
    assert.strictEqual(err, "RRR");
  });
