import { createContext, useState } from "react";
import type { ItemType, LoginFunction, LoginUser, Session } from "../App";

type ContextValue = {
    loginUser: LoginUser | null;
    cart: ItemType[];
}

export const DEFAULT_SESSION: ContextValue = {
    loginUser: { id: 1, name: 'Kelsey', age: 25 }, // LoginUser에 age가 있을 때만 OK
  cart: [{ id: 1, name: 'meat', price: 2000, isSoldOut: true }],
};

// 1. create Context
const SessionContext = createContext<ContextValue>(DEFAULT_SESSION);
// 2. Provider => component = function!
export function SessionProvider({}) {
      const [session, setSession] = useState<ContextValue>(DEFAULT_SESSION);

      const logout = () => {
          // session.loginUser = null; fail!!
          setSession({ ...session, loginUser: null });
        };
      
        const login: LoginFunction = (name, age) => {
          // 기존 세션은 내비둬야 한다!
          // if (!name || !age || 0) return alert('Input Name and Age, plz!');
          if (loginHandlerRef.current?.validate())
          setSession({ ...session, loginUser: { id: 1, name, age } });
        };
      
        const removeItem = (id: number) => {
          if(!confirm('Are u sure?')) return; // 뒤에 리턴문에 가는 것을 무겁게 하면 안좋다.
          // setSession({...session, cart: [...session.cart.filter(item => item.id !== id)]})
      
          // 카트의 주소만 바꾼 것이다. 
          setSession({...session, cart: session.cart.filter(item => item.id !== id)})
        }
      
      // id가 있다면 수정, 없다면 만들기
      const saveItem = ({ id, name, price }: ItemType) => {
        // id로 비교하는 것이 아니고, item으로 비교해야 한다!
        const item = id && session.cart.find((item) => item.id === id);
      
        if (item) {
          // item을 찾음 -> 수정!
          // item.name = name;
          // item.price = price;
          setSession({
            ...session,
            cart: session.cart.map(item =>
              item.id === id ? { id, name, price } : item
            )
          });
        } else {
          // max는 반드시 iterator로 펼쳐서 받아야 한다. 
          // ...와 같은 spread 연산자를 사용하면 id: Math.max([100, 200, 300]) 안에 배열이 펼쳐져서 나온다. 
          const newItem = {
            id: Math.max(...session.cart.map(item => item.id), 0) + 1,
            name,
            price
          };
          // cart의 주소도 안바뀐다 -> push만 하면 주소가 안바뀐다! 
          // -> 즉, 이것을 참조하는 곳은 이 것이 바뀐지 모른다. 
          // session.cart.push(newItem); // ❌ 하지 않음
          
          // 이 두 줄을 써도 되냐? cart의 주소는 바뀌지 않는다. 
          // session.cart.push(newItem);
          // setSession({ ... session }) 
          setSession({ ...session, cart: [...session.cart, newItem] });
        }
}
// 3. use Counter

// import { createContext, use, useState, type PropsWithChildren } from "react";

// type ContextValue = {
//     count: number;
//     plusCount: () => void;
// };

// // 1. create Context
// // CounterContext는 undefined을 가질수도 있다 -> 여기서 undefined을 걸 수 있도록 하면, 나중에?을 다는 등 귀찮아 지므로 초기 값을 주자!
// const CounterContext = createContext<ContextValue>({count: 0, plusCount: () => {}});

// // 2. Provider => component = function!
// // CounterContext.Provider value = {{x:1, y: () => {}}} 이런식으로 쓸려면, x, y를 사용하는 쪽에서 어떻게 써야 하나?
// export function CounterProvider ({children}: PropsWithChildren) {
// const [count, setCount] = useState(0);
//   const plusCount = () => setCount((prevCount) => prevCount + 1);

//     return <CounterContext.Provider value={{count, plusCount}}>
//         {/* children들이 consumer가 된다 -> 위에 value을 사용할 수 있다! */}
//         {children} 
//     </CounterContext.Provider>
// }

// // 3. useCounter
// // 이렇게 선언하면 된다. 
// // const {x, y} = useContext(CounterContext); => 옛날 방식
// // custom hook = component의 일종 = 함수가 되어야 한다! => CounterContext을 사용할 수 있는 훅을 하나 준 것이다.
// // const useCounter = () => useContext(CounterContext); => 옛날 방식 (useContext가 없어짐))
// // eslint-disable-next-line react-refresh/only-export-components
// export const useCounter = () => use(CounterContext);