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

type Action =
  | { type: 'login'; payload: LoginUser }
  | { type: 'logout' }
  | { type: 'removeItem'; payload: number }
  | { type: 'saveItem'; payload: ItemType };


// example
const reducer = (session: Session, action : Action) => {
  switch (action.type) {
    case 'login':
      return { ...session, loginUser: action.payload };
    case 'logout':
      return { ...session, loginUser: null };
    case 'removeItem':
        return {...session, cart:session.cart.filter(item => item.id !== action.payload)}
    case 'saveItem': {
        const {id, name, price} = action.payload;
        const item = id && session.cart.find((item) => item.id === id);

  if (item) {
    return {
      ...session,
      cart: session.cart.map(item =>
        item.id === id ? { id, name, price } : item
      )
    };
  } else {
    const newItem = {
      id: Math.max(...session.cart.map(item => item.id), 0) + 1,
      name,
      price
    };
    return { ...session, cart: [...session.cart, newItem] };
  }

    }
    default:
      return session;
  }
};


// value
export function SessionProvider({children}: PropsWithChildren) {

// const [session, setSession] = useState<Session>(DefaultSession);
const [session, dispatch] = useReducer(reducer, DefaultSession);
// ref를 만든다
const loginHandlerRef = useRef<LoginHandler>(null);

const login = (name:string, age:number) => {
    if (loginHandlerRef.current?.validate()) {
        dispatch({type: 'login', payload: {id: 1, name, age}
        });
    }
}
const logout = () => dispatch({type: 'logout'});
const removeItem = (payload: number) => 
    {if(!confirm('Are u sure?')) return;
    dispatch ({
    type : 'removeItem',
    payload
})}
const saveItem = (item: ItemType) => {
    dispatch({ type: 'saveItem', payload: item });
}

    return <SessionContext.Provider value={{session, login, logout, loginHandlerRef, removeItem, saveItem}}>
        {children}
    </SessionContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSession = () => use(SessionContext);