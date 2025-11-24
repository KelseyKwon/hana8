const assert = require("assert");

const randTime = (sec) =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, sec * 1000 * Math.random(), sec);
  });

const promiseAllSettled = (parr) =>
  new Promise((resolve, reject) => {
    const results = [];
    let runCnt = 0;
    for (let i = 0; i < parr.length; i++) {
      parr[i]
        // then이든 catch든 결과를 담아서 반환한다.
        .then((value) => {
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

Promise.allSettled([randTime(11), Promise.reject("RRR"), randTime(3)]).then(
  (orgArr) => {
    console.log("orgArr >> ", orgArr);
    promiseAllSettled([randTime(11), Promise.reject("RRR"), randTime(33)])
      .then((array) => {
        console.table(array);
        console.log("여긴 과연 호출될까?!");
        assert.deepStrictEqual(array, orgArr);
      })
      .catch((error) => {
        console.log("여긴 과연 호출될까?!");
        console.log("allSettled-reject!!!!!!>>", error); // catch를 절대 안뿌림.
      });
  }
);
// new Promise((resolve) => randTime().then(resolve))
// async 함수는 promise를 항상 리턴한다!
// f() : Promise<number>
async function f() {
  // 위에  randTIme에서 1을 반환해서 resolve로 반환하게 된다.
  // then을 하면 -> catch로 가는 것이 아니라, 그냥 나한테 반환해준다.
  const r1 = await randTime(1); // 끝나기를 기다리고 있다 => await! => 이걸 쓸려면 async을 써야 한다!
  console.log("🚀 ~ f ~ r1:", r1);
  return r1;
}

function f2() {
  return new Promise((resolve) =>
    randTime(1).then((r2) => {
      console.log("🚀 ~ f ~ r2:", r2);
      resolve(r2);
    })
  );
}

f();
f2();

const myFetch = async (url) => {
  const res = await fetch(url);
  return res.json(); // 여기에 await을 안 써도 된다. 이미 myFetch => async 함수가 리턴하는 것은 프로미스이기 때문에!
};

const myFetch2 = async (url) => fetch(url).then((Res) => res.json());

function iter(vals) {
  let i = -1;
  return {
    async next() {
      i += 1;
      return { value: randTime(vals[i]), done: i >= 3 };
    },
  };
}

(async function () {
  // await을 쓰려면 await을 써야 한다!
  const it = iter([1, 2, 3]);
  console.time("iter");
  //   const { value } = it.next(); // 비동기의 value는 무조건 undefned가 나온다.
  const { value } = await it.next(); // 비동기의 value는 무조건 undefned가 나온다.
  console.log("🚀 ~ value:", value);
  //   console.log("1=", await it.next().value());
  //   console.log("2=", await it.next());
  //   console.log("3=", await it.next());
  //   console.log("4=", await it.next());
  console.timeEnd("iter");
})();
