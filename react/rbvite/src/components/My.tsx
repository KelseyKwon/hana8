import Profile, { type ProfileHandler } from '../Profile';
import Login from '../Login';
import Button from './ui/Button';
import { PlusIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Item from './Item';
import { useSession } from '../hooks/SessionContext';

// type UR<T> = {current: T | null}


export default function My() {
  const {session } = useSession();
  const [isAdding, setAdding]= useState(false);
  const profileHandlerRef = useRef<ProfileHandler>(null);
  const item101 = session.cart.find(item => item.id === 101);
  // useEffect -> dom이 그려지고 나서 호출이 된다!
  useEffect(() => {
    console.log(item101)
  }, [item101])

return (
    <>
      {session?.loginUser ? <Profile ref={profileHandlerRef} /> : <Login />}
      <hr />
      <a href='#!' onClick={(e) => {
        e.preventDefault();
        profileHandlerRef.current?.showLoginUser();
        profileHandlerRef.current?.logout();
      }}>{item101?.name}</a>
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
              toggleAdding={() => setAdding(false)}
            />
          ) : (
            <Button onClick={() => setAdding(true)} className=''>
              <PlusIcon />
            </Button>
          )}
        </li>
      </ul>
    </>
  );
}