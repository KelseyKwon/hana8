"use strict";
Object.defineProperty(exports, "__esModule", { value: true }); // 모듈화 시켰다. 
const myName = "Kelsey"; // string이라고 안쓰면 Kelsey 타입이 된다. -> 타입 범위가 더 넓어진다.
// greet이 string을 받으니까 -> greet 내부에 string으로 맞춰줬다.
// 위에 :string이라고 명시를 안해도 통과가 된다. 왜냐? Kelsey는 string이기 떄문.
greet(myName);
function greet(str) {
    console.log(`Hello, ${str}`);
}
