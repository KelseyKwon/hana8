import assert from "assert";
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
        const x = array[0];
        if (x?.status === "fulfilled") console.log(x.value);
        else console.log("dd");
        console.log("여긴 과연 호출될까?111!");
        assert.deepStrictEqual(array, orgArr);
      })
      .catch((error) => {
        console.log("allSettled-reject!!!!!!>>", error);
      });
  }
);

// returntype은 그냥 함수가 반환하는 타입에 Promise를 감싸면 된다.
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

// new Promise((resolve) => randTime().then(resolve))
/**
 *
 * @returns 1초 후에 r1을 얻고 출력한다.
 */
async function f() {
  const r1 = await randTime(1);
  console.log("🚀 ~ r1:", r1);
  return r1;
}

/**
 *
 * @returns new Promise를 만들어서 1초 후에 resolve로 넘겨준다.
 */
function f2() {
  return new Promise((resolve) =>
    randTime(1).then((r2) => {
      console.log("🚀 ~ r2:", r2);
      resolve(r2);
    })
  );
}
f();
f2();

const myFetch = async (url: string) => {
  const res = await fetch(url);
  const rrr = await res.json();
  console.log("🚀 ~ rrr:", rrr);
  return rrr;
};

const myFetch2 = async (url: string) => fetch(url).then((res) => res.json());

// value가 Promise인 iterator이다.
function iter<T extends number[]>(vals: T) {
  let i = -1;
  return {
    next() {
      i += 1;
      return { value: randTime(vals[i]!), done: i >= 3 };
    },
  };
}

(async function () {
  const it = iter([1, 2, 3]);
  console.time("iter");
  const { value } = it.next();
  console.log("🚀 ~ value:", await value);
  // console.log('11=', await it.next().value);
  // console.log('2=', await it.next());
  // console.log('3=', await it.next());
  // console.log('4=', await it.next());
  console.timeEnd("iter");
})();
