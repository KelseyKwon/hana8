function* gener() {
  const x = yield "x는?";
  const y = yield `10을 더하면 ${x + 10}입니다`;
  console.log(">> total : ", x + y);
  return x + y;
}
const iter = gener();
console.log("🚀 ~ iter:", iter);
const it1 = iter.next();
console.log("🚀 ~ it1:", it1.value);
const it2 = iter.next(5);
console.log("🚀 ~ it2:", it2.value);
if (it2.done) console.log("The end!");
const it3 = iter.next(100);
if (it3.done) console.log("The end!");

//============콘솔에서 비동기로 하기============//

const readline = require("readline");
const { stdin: input, stdout: output } = require("process");

function* add() {
  const x = yield "첫 번째 수는? ";
  const y = yield "두 번째 수는? ";
  return `Total: ${x + y}`;
}

const rl = readline.createInterface({ input, output });

const it = add(); // 이 it은 iterator이다. 
let res = it.next();

rl.question(res.value, (answer) => {
  res = it.next(Number(answer));

  rl.question(res.value, (answer2) => {
    res = it.next(Number(answer2));

    console.log(res.value);
    rl.close();
  });
});

// console로 오른쪽에 값을 받고 싶으면 question으로 하면 된다.
rl.question("What do you think of Node.js? ", (answer) => {
  console.log(`Thank you for your valuable feedback: ${answer}`);

  rl.close();
});

rl.on("close", function () {
  process.exit();
});

// console.log("???????????/");
// 이런 거를 빌더 패턴이라고 한다. 뒤에 연쇄적으로 .으로 연산을 하는것.
rl.on("line", (answer) => {
  console.log("line.answer>>", answer);
  if (answer === "bye") rl.close();
}).on("close", () => {
  process.exit();
});
