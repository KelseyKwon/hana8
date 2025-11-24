// 다음 코드를 Promise를 이용하여 refactoring 하시오.

// prob : callback!
// setTImeout 아ㄴ에 setTimeout을 넣은 것이 문제
setTimeout(function () {
  console.log("depth1", new Date());
  setTimeout(function () {
    console.log("depth2", new Date());
    setTimeout(function () {
      console.log("depth3", new Date());
      throw new Error("Already 3-depth!!");
    }, 3000);
  }, 2000);
}, 1000);

// solution : depth -> 현재 단계를 parameter로 받아서 하기!
const depthTimer = (depth) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 에러 발생 조건 : 3번째 단계가 되면
      if (depth >= 3) {
        reject(new Error("Already 3-depth!!"));
      } else {
        resolve(depth + 1);
      }
    }, depth * 1000);
  });
};

console.log("START!", new Date());

depthTimer(1).then(depthTimer).then(depthTimer).catch(console.error);
