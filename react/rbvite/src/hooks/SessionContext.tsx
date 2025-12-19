import {
  createContext,
  use,
  useEffect,
  useReducer,
  useRef,
  type PropsWithChildren,
  type RefObject,
} from 'react';
import type { LoginHandler } from '../Login';
import { useFetch } from './useFetch';

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

// SetStorage KEY -> 0.1 버전에 해당하는 데이터. 이 버전을 왜 남겨두었냐? 데이터의 포맷이 바뀌거나, 추가되면 -> 스토리지 버전을 바꿔치기 해야 된다!
// const SKEY = `CART_${process.env.VERSION}`;
const SKEY = 'CART_v1';
const SKEY_EXP = 'CART_EXP';
const SKEY_EXP_TIME = 86400 * 1000; // 원래는 이렇게 함.
// const SKEY_EXP_TIME = 30 * 1000; // QQQ -> 반드시 없애야 하는것.

const setStorage = (cart: ItemType[]) => {
  localStorage.setItem(SKEY, JSON.stringify(cart));
  // 쓸 떄마다 expired 시간을 갱신해야 한다.
  localStorage.setItem(SKEY_EXP, String(Date.now() + SKEY_EXP_TIME));
};
const getStorage = () => {
  // exptime = expired -> clear하고 끝낸다!
  const expiredAt = Number(localStorage.getItem(SKEY_EXP)); // 처음에는 NaN이 된다.
  if (isNaN(expiredAt) || expiredAt < Date.now()) {
    // storage의 과거 버전만 날려버리는 법 :
    // localStorage.removeItem(SKEY); 살릴게 있으면 -> clear 한 다음에 setItem을 하면 된다.
    localStorage.clear();
    return [];
  }
  return JSON.parse(localStorage.getItem(SKEY) || '[]') as ItemType[];
};

type SessionContextValue = {
  session: Session;
  login: LoginFunction;
  logout: () => void;
  loginHandlerRef: RefObject<LoginHandler | null> | null;
  removeItem: (id: number) => void;
  saveItem: (item: ItemType) => void;
};

const SessionContext = createContext<SessionContextValue>({
  session: { loginUser: null, cart: [] },
  login: () => {},
  logout: () => {},
  loginHandlerRef: null,
  removeItem: () => {},
  saveItem: () => {},
});

type Action =
  | { type: 'INITIALIZE'; payload: ItemType[] }
  | { type: 'LOGIN'; payload: LoginUser }
  // 여기서 payload의 타입을 정의를 안해주면 optional이 된다. -> 이거는 안 좋음!
  | { type: 'LOGOUT'; payload: null }
  // | {type: 'ADD-ITEM', payload: Omit<ItemType, 'id'>}
  | { type: 'ADD-ITEM'; payload: ItemType }
  | { type: 'EDIT-ITEM'; payload: ItemType }
  | { type: 'REMOVE-ITEM'; payload: number };

const reducer = (session: Session, { type, payload }: Action) => {
  // edit, add할 떄 cart에 정보를 저장해야 하므로->변수로 뺴서 관리!
  let cart = [];
  switch (type) {
    case 'LOGIN':
    case 'LOGOUT':
      return { ...session, loginUser: payload };
    case 'ADD-ITEM':
      // 아래 cart을 스토리지에 써줘야 한다!
      // return { ...session, cart: [...session.cart, payload] };
      cart = [...session.cart, payload];
      break;
    case 'EDIT-ITEM':
      cart = session.cart.map((item) =>
        item.id === payload.id ? payload : item
      );
      break;
    case 'REMOVE-ITEM':
      cart = session.cart.filter((item) => item.id !== payload);
      break;
    case 'INITIALIZE':
      cart = payload;
      break;
    default:
      return session;
  }
  setStorage(cart);
  return { ...session, cart };
};

// value
export function SessionProvider({ children }: PropsWithChildren) {
  const [session, dispatch] = useReducer(reducer, {
    loginUser: { id: 1, name: 'Hong', age: 33 },
    // getStorage가 동기이기 때문에 가능하다!
    cart: getStorage(),
  });

  // useFetch 자체가 비동기이기 때문에 -> data가 나중에 가져와진다. => 초기값 undefined로 설정된다.
  const { data: sampleData } = useFetch<ItemType[]>('/data/sample.json');
  // console.log("🚀 ~ SessionProvider ~ data:", data)
  // 따라서 바로 실행되게 하려면 -> useEffect을 쓰면 됨!
  useEffect(() => {
    if (sampleData && !session.cart.length) {
      // dispatch을 통해서 세션을 관리해야 함.
      dispatch({ type: 'INITIALIZE', payload: sampleData });
    }
  }, [sampleData]);

  // ref를 만든다
  const loginHandlerRef = useRef<LoginHandler>(null);

  const logout = () => {
    dispatch({ type: 'LOGOUT', payload: null });
  };

  const login: LoginFunction = (name, age) => {
    if (loginHandlerRef.current?.validate())
      dispatch({ type: 'LOGIN', payload: { id: 1, name, age } });
  };

  const removeItem = (id: number) => {
    if (!confirm('Are u sure?')) return; // 뒤에 리턴문에 가는 것을 무겁게 하면 안좋다.
    dispatch({ type: 'REMOVE-ITEM', payload: id });
  };

  // id가 있다면 수정, 없다면 만들기
  const saveItem = ({ id, name, price }: ItemType) => {
    // id로 비교하는 것이 아니고, item으로 비교해야 한다!
    const item = id && session.cart.find((item) => item.id === id);

    if (item) {
      dispatch({ type: 'EDIT-ITEM', payload: { id, name, price } });
    } else {
      const newItem = {
        id: Math.max(...session.cart.map((item) => item.id), 0) + 1,
        name,
        price,
      };
      dispatch({ type: 'EDIT-ITEM', payload: newItem });
      // setSession({ ...session, cart: [...session.cart, newItem] });
    }
  };

  return (
    <SessionContext
      value={{ session, login, logout, loginHandlerRef, removeItem, saveItem }}
    >
      {children}
    </SessionContext>
  );
}

export const useSession = () => use(SessionContext);
