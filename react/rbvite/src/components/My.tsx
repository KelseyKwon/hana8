import type { ItemType, LoginFunction, Session } from '../App';
import Profile from '../Profile';
import Login from '../Login';
import Button from './ui/Button';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import Item from './Item';

type Prop = {
  session: Session;
  logout: () => void;
  login: LoginFunction;
  removeItem : (id: number) => void;
  saveItem: ({id, name, price} : ItemType) => void; // destructuring
  
};

// type UR<T> = {current: T | null}

export default function My({ session, logout, login, removeItem, saveItem }: Prop) {
  const [isAdding, setAdding]= useState(false);

return (
    <>
      {session?.loginUser ? (
        <Profile loginUser={session.loginUser} logout={logout} />
      ) : (
        <Login login={login} />
      )}
      <hr />
      <ul>
        {/* destructuring! */}

        {session.cart.map((item) => (
          <li key={item.id}>
            <Item item={item} removeItem={removeItem} saveItem={saveItem} />
          </li>
        ))}
        <li className='text-center'>
          {/* 만약에 Item을 객체로 전달하고 싶으면은, {{}} 처럼 이중괄호 -> javascript & 객체 의미 */}

          {isAdding ? (
            <Item
              item={{ id: 0, name: 'New Item', price: 3000 }}
              removeItem={removeItem}
              saveItem={saveItem}
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