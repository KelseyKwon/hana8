/* eslint-disable react-hooks/rules-of-hooks */
import { PlusIcon } from 'lucide-react';
import {
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { useInterval } from '../hooks/interval';
import { type ItemType, useSession } from '../hooks/SessionContext';
import Item from './Item';
import Login from '../Login';
import Profile, { type ProfileHandler } from '../Profile';
import Button from './ui/Button';
import { useFetch } from '../hooks/useFetch';


// type UR<T> = {current: T | null}


export default function My() {
  const {session } = useSession();
  // const [isAdding, setAdding]= useState(false);
  // const toggleAdding = () => setAdding((pre) => !pre);

  // first argument : Dispatch 함수
  const [isAdding, toggleAdding] = useReducer(pre => !pre, false); //여기에서는 action이 필요가 없다. 
  // addPrice(1000) -> 이전에 있던 total 값에 더한 것이 -> useReducer()
  /*
  function useReducer(reducer, initValueOrFunction) {
    const [state, setState] = useState(initValueOrFunction);
    const dispatch = (action) => {
      // 기존에 갖고있던 값을 받아서 (true) -> false 이런식으로 반환한다. 
      setState(reducer(preState, action));
    }
    return [state, dispatch];
  }
    */

  const profileHandlerRef = useRef<ProfileHandler>(null);
  const item101 = session.cart.find((item) => item.id === 101);

  // strict mode vs 그냥 mode 
  const [badSec, setBadSec] = useState(0);
  const [goodSec, setGoodSec] = useState(0);
  // useEffect -> dom이 그려지고 나서 호출이 된다! // bad : clean x, good : clean o
  useEffect(() => {
    setInterval(() => setBadSec(p => p + 1), 1000)
  }, [])
  
  const ff = (n: number) => {
    console.log('🚀 ~ n:', n, goodSec); // n은 영원히 1 (: )
    // setGoodSec(n + 1); // 위 goodSec는 영원히 0
    setGoodSec((p) => p + 1);
  };
  // goodSec + 1 의 값이
  console.log('🚀 ~ goodSec:', goodSec);
  const { clear, reset } = useInterval(ff, 1000, goodSec + 1);

  // useInterval(ff, 1000, goodSec + 1);


  // const [data, setData] = useState<ItemType[]>([]);
  // useLayoutEffect(() => {
  //   const controller = new AbortController()
  //   const {signal} = controller;
  //   fetch('/data/sample/json', {signal})
  //   .then(res => res.json())
  //   .then(setData)

  //   return () => controller.abort();
  // }, []);

  const { data } = useFetch<ItemType[]>('/data/sample.json');

  const totalPrice = useMemo(
    () => session.cart.reduce((acc, item) => acc + item.price, 0),
    [session.cart]
  );

  // 해서 데이터를 받기!
  // useFetch()


  return (
    <>
      <h1 className='text-xl'>
        bad: {badSec}, good: {goodSec}
      </h1>
      <div className='flex'>
        <button onClick={reset}>reset</button>
        <button onClick={clear}>clear</button>
            </div>
      {session?.loginUser ? <Profile ref={profileHandlerRef} /> : <Login />}
      <hr />
      <a
        href='#!'
        onClick={(e) => {
          e.preventDefault();
          profileHandlerRef.current?.showLoginUser();
        }}
      >
        {item101?.name}
      </a>
      <h2 className='text-xl'>Tot: {totalPrice.toLocaleString()}원</h2>
      <ul>
        {(session.cart.length ? session.cart : data)?.map((item) => (
          <li key={item.id}>
            <Item item={item} />
          </li>
        ))}
        <li className='text-center'>
          {isAdding ? (
            <Item
              item={{ id: 0, name: 'New Item', price: 3000 }}
              toggleAdding={toggleAdding}
            />
          ) : (
            <Button onClick={toggleAdding} className=''>
              <PlusIcon />
            </Button>
          )}
        </li>
      </ul>
    </>
  );
}