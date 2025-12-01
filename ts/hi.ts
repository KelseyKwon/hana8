const myName: string = "Kelsey";
// console.log("🚀 ~ Hi~:", myName);

let x: string | undefined;
x = Math.random() > 0.5 ? "abc" : undefined;
console.log(x?.length);

//=====contravariance========//
type F = (input: number | string) => number; // type => 오른쪽이 타입을 정의하는 부분
const ff: F = (i: string | number) => {
  return +i * 100;
}; // function object => 오른쪽이 함수를 정의하는 부분
ff(1);

const f2 = (i: string | number | boolean) => +i + 1;
// const f3 = (i: string | number) => 1;
const f4 = (i: string | number) => +i + 1;

function f(cb: F) {
  cb(1);
}
f(f2);
f(f4);
// f(f4); // 오류 나는 이유 : i는 string만 받으니까 1을 받을 수 없다.

// ==== 배열 ====//
const arr = [1, 2, 3];
// 아래 arr내부의 원소는 runtime중에 어떻게 바뀔지 모른다.
// console.log(arr[0]?.toFixed(1), arr[1] + 100); // 에러가 난다. -> 타입스크립트는 내부에 (내부 배열이 어떻게 생겼는지) 관심이 없으므로
if (arr[1]) {
  console.log(arr[0]?.toFixed(1), arr[1] + 100);
}
// 아래는 strictNullCHecked가 false로 명시되어 있지 않으므로 에러가 난다.
// 절때 false로 하면 안된다 -> 왜냐? 노드는 하나만 에러가 나도 모든 것이 마비되기 때문에
// console.log(arr[0].toFixed(1)); // optional chaining을 안 쓰면 에러가 난다.
type OBJ = { [k: string | number]: number };
let o1: OBJ = { 1: 1, a: 2 };
console.log("🚀 ~ o1:", o1);
const obj: { [x: string]: number } = { id: 1 };
// let a = "id"; -> let은 값이 달라질 수 있기 때문에 오류남
// const a = 'idd'; -> obj에 없는 프로퍼티를 명시해도 오류가 안남
const a = "id";
console.log("🚀 ~ obj:", obj[a]);

const someFunc = () => {
  try {
    throw new Error("some error!!!!");
    // throw 'some string error!!!';
    // throw ['some', 'array', 'error'];
  } catch (error) {
    console.log("error >>> ", error, typeof error);
    if (error instanceof Error)
      // unknown인 error가 Error로 타입 캐스팅 된다.
      console.log(error.message);
    else console.log(JSON.stringify (error));
  }
};
someFunc();
