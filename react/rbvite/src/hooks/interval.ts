 // useInterval(() => setgoodSec(p => p + 1), 1000))
 // My 속의 useEffect 부분에 기능들을 일로 옮겨왔다!

import { useEffect } from "react";

 // 함수를 받고, 딜레이를 받는다 useInterval(console.log, 1000, x, y, z)
// function useInterval<T extends Function>(cb: T, delay, ...args: Parameters<T>) {
export function useInterval<T extends () => void>(cb: T, delay: number, ...args: Parameters<T>) {
    useEffect(() => {
        const intl = setInterval(cb, delay, ...args)
        console.log('******');
        // callback은 항상 cleanup function이 중요하다!
        return () => clearInterval(intl);
        // 위에서 사용한 것을 전부 넘겨주면 된다!
    }, [cb, delay, args]);
}