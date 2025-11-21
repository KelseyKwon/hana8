function addPoints(a, b) {
  const alen = pointLength(a);
  const blen = pointLength(b);
  const len = Math.max(alen, blen); // 긴 쪽 선택

  const ret = (a + b).toFixed(len);
  return parseFloat(ret);
}

function pointLength(num) {
  if (num === undefined || num === null) return 0;
  const str = num.toString();
  return str.includes(".") ? str.split(".")[1].length : 0;
}

let a = addPoints(0.21354, 0.1);
console.log("🚀 ~ a:", a); // 0.31354

function avg(prices) {}
