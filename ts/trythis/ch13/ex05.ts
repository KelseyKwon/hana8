/**
 * JS 시간에 작성했던 memoized 함수를 범용성을 고려하여 TS로 작성하시오.
 * 
}

 */

// 화살표 or not ; this를 바인딩할 필요가 있으면 not, 아니면 화살표 함수.
// 리턴타입이 뭐가 올지 모른다. 그래서 ReturnType T로 그냥 해버린다.
function memoized<T extends (...args: Parameters<T>) => ReturnType<T>>(fn: T) {
  //   const cache = {}; cache에 타입을 넣기
  const cache: Record<string, ReturnType<T>> = {};
  return function (...args: Parameters<T>) {
    const k = JSON.stringify(args); // f(1, 2) ==> `[1, 2]` <==> [2, 1] 하고 결과가 똑같다면? -> ㅌ
    // const k = args.toSorted().toString(); // 이렇게 하라 => [2, 1]을 줘도 무조건 [1, 2]가 된다.  하지만 이거는 교환법칙이 성립할때만 가능하다.
    // cache에 있다면 그냥 주고, 아니면 fn(k) 이런식으로 주라.
    return cache[k] ?? (cache[k] = fn(...args));
  };
}
// test
const memoizeAdd = memoized((a: number, b: number) => {
  return a + b;
});

console.log(memoizeAdd(1, 2)); // 3
console.log(memoizeAdd(3, 4)); // 7

// const memoizeFactorial도 테스트(실행)) 해보세요!

const memoizeFactorial = memoized((n: number): number => {
  if (n <= 1) return 1;

  return n * memoizeFactorial(n - 1);
});
