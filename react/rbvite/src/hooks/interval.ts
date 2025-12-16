/* eslint-disable react-hooks/rules-of-hooks */
 // useInterval(() => setgoodSec(p => p + 1), 1000))
 // My 속의 useEffect 부분에 기능들을 일로 옮겨왔다!

import { useEffect, useRef} from "react";


// useInterval(console.log, 1000, x, y, z);
export function useInterval_OLD<T extends (...args: Parameters<T>) => void>(
  cb: T,
  delay: number,
  ...args: Parameters<T>
) {
  console.log('args>>', args);
  useEffect(() => {
    console.log('11111111111111');
    const intl = setInterval(() => {
      console.log('*********', args);
      cb(...args);
    }, delay);
    // cb(...args);
    return () => {
      console.log('2222222222222');
      clearInterval(intl);
    };
  }, []);
}

// useReducer처럼 -> 두번쨰 인자에 이전 값을 담아놓는다
// 함수의 타입을 가져오는 법 -> typeof!
function time<T extends () => void>(
    f: typeof setTimeout | typeof setInterval, 
    cb: T, 
    delay: number, 
    ...args: Parameters<T>) {
// eslint-disable-next-line react-hooks/rules-of-hooks
// const [timer, setTimer] = useState<ReturnType<typeof f>>(); setTIme : 16ms마다 쓰로틀링이 일어난다.
const timerRef = useRef<ReturnType<typeof f>>(undefined);

const setTime = () => {
    timerRef.current = f(cb, delay, ...args);
};
    // const clear = () => f === setTimeout? clearTimeout(timerRef.current)
    //  : clearInterval(timerRef.current);
     const clear = () => (f === setTimeout? clearTimeout
     : clearInterval)(timerRef.current);
    const reset = () => {
        clear();
        setTime();
    }
  useEffect(() => {
    setTime();

    return clear;
  }, []);
  return {clear, reset};
};

export function useInterval<T extends (...args: Parameters<T>) => void>(
  cb: T,
  delay: number,
  ...args: Parameters<T>
) {
    return time(setInterval, cb, delay, ...args);
}

export function useTimeout<T extends () => void>(
  cb: T,
  delay: number,
  ...args: Parameters<T>
) {
    return time(setTimeout, cb, delay, ...args);
}