import type { ItemType, LoginFunction, Session } from '../App';
import Profile from '../Profile';
import Login from '../Login';
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
      </ul>
  
    </>
  );
}
