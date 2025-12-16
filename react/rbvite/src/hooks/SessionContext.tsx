import { createContext, use, useReducer, useRef, type PropsWithChildren, type RefObject } from "react";
import type { LoginHandler } from "../Login";

export type ItemType = {
  id: number;
  name: string;
  price: number;
  isSoldOut?: boolean;
};

export type LoginUser = { id: number; name: string; age: number };

export type Session = {
  loginUser: LoginUser | null;
  cart: ItemType[];
};
export type LoginFunction = (name: string, age: number) => void; // 이 타입을 계속 쓰겠다!

const DefaultSession: Session = {
  // loginUser: null,
  loginUser: { id: 1, name: 'Hong', age: 33 },

  cart: [
    { id: 100, name: '라면', price: 3000 },
    { id: 101, name: '컵라면', price: 2000 },
    { id: 200, name: '파', price: 5000 },
  ],
};

type SessionContextValue = {
    session: Session;
    login: LoginFunction;
    logout: () => void;
    loginHandlerRef: RefObject<LoginHandler | null> | null;
    removeItem : (id: number) => void;
    saveItem:(item: ItemType) => void;
}

const SessionContext = createContext<SessionContextValue>(
    {session: DefaultSession,
    login: () => {},
    logout: () => {},
    loginHandlerRef: null,
    removeItem: () => {},
    saveItem: () => {},}
);


type Action = {type: 'LOGIN', payload: LoginUser} 
// 여기서 payload의 타입을 정의를 안해주면 optional이 된다. -> 이거는 안 좋음!
| {type: 'LOGOUT', payload: null}
// | {type: 'ADD-ITEM', payload: Omit<ItemType, 'id'>} 
| {type: 'ADD-ITEM', payload: ItemType}
| {type: 'EDIT-ITEM', payload: ItemType}
| {type: 'REMOVE-ITEM', payload: number}

const reducer = (session: Session, {type, payload} : Action) => {
  switch (type) {
    case 'LOGIN': 
    case 'LOGOUT': return {...session, loginUser: payload}
    case 'ADD-ITEM':
      return {...session, cart: [...session.cart, payload]}
    case 'EDIT-ITEM': 
      return {...session, cart: session.cart.map((item) => (item.id === payload.id) ? payload : item)}
    case 'REMOVE-ITEM': return {...session, cart: session.cart.filter(item => item.id !== payload)} 
    default:
      return session;
  }
};

// value
export function SessionProvider({children}: PropsWithChildren) {
const [session, dispatch] = useReducer(reducer, DefaultSession);
  
  // ref를 만든다
  const loginHandlerRef = useRef<LoginHandler>(null);

  const logout = () => {
    dispatch({type: 'LOGOUT', payload: null});
  };

  const login: LoginFunction = (name, age) => {
    if (loginHandlerRef.current?.validate())
        dispatch({type: 'LOGIN', payload: {id: 1, name, age}});

  };

  const removeItem = (id: number) => {
    if(!confirm('Are u sure?')) return; // 뒤에 리턴문에 가는 것을 무겁게 하면 안좋다.
    dispatch({type: 'REMOVE-ITEM', payload: id})
  }

// id가 있다면 수정, 없다면 만들기
const saveItem = ({ id, name, price }: ItemType) => {
  // id로 비교하는 것이 아니고, item으로 비교해야 한다!
  const item = id && session.cart.find((item) => item.id === id);

  if (item) {
    dispatch({type: 'EDIT-ITEM', payload: {id, name, price}})
  } else {

    const newItem = {
      id: Math.max(...session.cart.map(item => item.id), 0) + 1,
      name,
      price
    };
    dispatch({type: 'EDIT-ITEM', payload: newItem});
    // setSession({ ...session, cart: [...session.cart, newItem] });
  }


}

    return <SessionContext.Provider value={{session, login, logout, loginHandlerRef, removeItem, saveItem}}>
        {children}
    </SessionContext.Provider>
}

export const useSession = () => use(SessionContext);