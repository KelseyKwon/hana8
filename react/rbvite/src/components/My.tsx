import Profile, { type ProfileHandler } from '../Profile';
import Login from '../Login';
import Button from './ui/Button';
import { PlusIcon } from 'lucide-react';
import { useEffect, useReducer, useRef, useState } from 'react';
import Item from './Item';
import { useSession } from '../hooks/SessionContext';
import { useInterval } from '../hooks/interval';

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

  // strict mode vs 그냥 mode 
  const [badSec, setBadSec] = useState(0);
  const [goodSec, setGoodSec] = useState(0);
  // useEffect -> dom이 그려지고 나서 호출이 된다! // bad : clean x, good : clean o
  useEffect(() => {
    setInterval(() => setBadSec(p => p + 1), 1000)
  }, [])
  
  useInterval(() => setGoodSec(p => p + 1), 1000);

return (
  <>
  <h1 className='text-2xl'>bad: {badSec}, good: {goodSec}</h1>
      {session?.loginUser ? <Profile ref={profileHandlerRef} /> : <Login />}
      <hr />
      <a href='#!' onClick={(e) => {
        e.preventDefault();
        profileHandlerRef.current?.showLoginUser();
        profileHandlerRef.current?.logout();
      }}>{}</a>
      <ul>
        {/* destructuring! */}

        {session.cart.map((item) => (
          <li key={item.id}>
            <Item item={item}  />
          </li>
        ))}
        <li className='text-center'>
          {/* 만약에 Item을 객체로 전달하고 싶으면은, {{}} 처럼 이중괄호 -> javascript & 객체 의미 */}

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