import { createContext, use, useState, type PropsWithChildren } from "react";

type ContextValue = {
    count: number;
    plusCount: () => void;
};

// 1. create Context
// CounterContext는 undefined을 가질수도 있다 -> 여기서 undefined을 걸 수 있도록 하면, 나중에?을 다는 등 귀찮아 지므로 초기 값을 주자!
const CounterContext = createContext<ContextValue>({count: 0, plusCount: () => {}});

// 2. Provider => component = function!
// CounterContext.Provider value = {{x:1, y: () => {}}} 이런식으로 쓸려면, x, y를 사용하는 쪽에서 어떻게 써야 하나?
export function CounterProvider ({children}: PropsWithChildren) {
const [count, setCount] = useState(0);
  const plusCount = () => setCount((prevCount) => prevCount + 1);

    return <CounterContext.Provider value={{count, plusCount}}>
        {/* children들이 consumer가 된다 -> 위에 value을 사용할 수 있다! */}
        {children} 
    </CounterContext.Provider>
}

// 3. useCounter
// 이렇게 선언하면 된다. 
// const {x, y} = useContext(CounterContext); => 옛날 방식
// custom hook = component의 일종 = 함수가 되어야 한다! => CounterContext을 사용할 수 있는 훅을 하나 준 것이다.
// const useCounter = () => useContext(CounterContext); => 옛날 방식 (useContext가 없어짐))
// eslint-disable-next-line react-refresh/only-export-components
export const useCounter = () => use(CounterContext);