const randTime = (val) =>
  new Promise((resolve) => {
    setTimeout(resolve, 1000 * Math.random(), val);
  });
console.log(new Date());
randTime(100).then((res) => console.log(res, new Date()));
[1, 2, 3, 4, 5].forEach((a) =>
  randTime(a).then((res) => console.log(res, new Date()))
);
const depthTimer = (val) =>
  new Promise((resolve, reject) => {
    console.log(`depth1${sec}`, new Date());
    setTimeout(() => {
      if (sec >= 3) reject(new Error("Already 3-dept!!"));
      else resolve(sec + 1);
    }, sec * 1000);
  });
depthTimer(1).then(2, depthTimer).then(depthTimer).catch(console.error);
