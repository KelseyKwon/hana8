function add(a: number, b: string, c: boolean) {
  return `${a} - ${b} + ${c}`;
}

// unknown이든 never든 상관 없다 -> 함수일 경우에는 첫번째 argument은 무조건 있다! -> 따라서 extends Function으로 확장시켜줘야 한다.
// 아래 파라미터는 add의 파라미터의 개수랑 같든지 더 작아야 한다. (by contravariance)
// type FirstArgs<F extends Function> = F extends ((a: infer First, ...args: unknown[]) => void) ? First : never;
type FirstArgs<F extends Function> = F extends (...args: infer ARGS) => void
  ? ARGS[0]
  : never;
type SecondArgs<F extends Function> = F extends (...args: infer ARGS) => void
  ? ARGS[1]
  : never;
type Args<F extends Function> = F extends (...args: infer ARGS) => void
  ? ARGS
  : never;

/** 
 * 내가 푼거
a, (... 나머지) 형태라면 -> a의 타입을 A라고 부른다. 그리고 A를 반환하라!
type FirstArgs<F> = F extends (a: infer A, ...args: unknown[]) => unknown
  ? A
  : never;
type SecondArgs<F> = F extends (
  a: unknown,
  b: infer B,
  ...args: any[]
) => unknown
  ? B
  : never;
type Args<F> = F extends (...args: infer P) => unknown ? P[number] : never;
*/

type A = FirstArgs<typeof add>; // number
type B = SecondArgs<typeof add>; // string
type C = Args<typeof add>;
// number | string | boolean

type AX = Args<typeof String.prototype.endsWith>; // ⇒ string | number | undefined
type AX2 = Args<typeof String.prototype.charAt>; // ⇒ number

let a: A = 0;
let b: B = "abc";
let c: C = Math.random() > 0.5 ? 1 : "abc";
console.log("🚀 abc:", a, b, c);
