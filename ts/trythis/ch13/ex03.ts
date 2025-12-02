/**
 * const debounce = (cb, delay) => {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(cb, delay, ...args);
  };
}

const throttle = (cb, delay) => {
  let timer;
  return (...args) => {
    if (timer) return;
    timer = setTimeout(() => {
      cb(...args);
      timer = null;
    }, delay);
  };
}

debounce throttle 함수를 TypeScript로 작성하시오.

 */

// generic 방식으로 -> TS는 파라미터의 타입을 명시해줘야 한다!
// callback 함수는 모든 콜백 함수.
// F extends ... 이렇게 안하면, 뒤에 콜백 함수가 함수가 아니면 어떡할건데? 라는 경고 문구가 뜬다.
// function debounce<F extends (...args: any[]) => any>(cb: F, delay: number) {
function debounce<F extends (...a: Parameters<F>) => void>(
  cb: F,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout>;

  // 아래 ...args는 콜백 함수가 사용하는 파라미터이다. 따라서 Parameters<F> 로 명시해준다.
  return (...args: Parameters<F>) => {
    if (timer !== null) clearTimeout(timer);
    // 콜백을 직접 호출해준다.
    timer = setTimeout(() => cb(...args), delay);
  };
}

// function throttle<F extends (...args: any[]) => any>(cb: F, delay: number) {
function throttle<F extends unknown[]>(
  cb: (...args: F) => void,
  delay: number
) {
  // setTimeout의 리턴 타입을 내놔라!
  let timer: ReturnType<typeof setTimeout> | null;

  //   return (...args: Parameters<F>) => { -> 여기서 핵심만 제네릭으로 잡기.
  return (...args: F) => {
    if (timer !== null) return;
    // 콜백을 직접 호출해준다.
    timer = setTimeout(() => {
      cb(...args);
      timer = null;
    }, delay);
  };
}

// test
// 아래 (a: number , b: string) => console.log가 callback 함수로 추론된다.
const debo = debounce((a: number, b: string) => console.log(a + 1, b), 1000);
for (let i = 10; i < 15; i++) debo(i, "abc"); // 15, 'abc'

const thro = throttle((a: number) => console.log(a + 1), 1000);
for (let i = 10; i < 15; i++) thro(i); // 11
