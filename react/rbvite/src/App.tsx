import { useState } from 'react';
import './App.css';
import Hello from './components/Hello';
import My from './components/My';

export type ItemType = {
  id: number;
  name: string;
  price: number;
  isSoldOut?: boolean;
};

export type LoginUser = { id: number; name: string; age: number };
export type Session = {
  loginUser: { id: number; name: string; age: number } | null;
  cart: ItemType[];
};
export type LoginFunction = (name: string, age: number) => void; // 이 타입을 계속 쓰겠다!

const DefaultSession: Session = {
  loginUser: null,
  // loginUser: { id: 1, name: 'Hong', age: 33 },

  cart: [
    { id: 100, name: '라면', price: 3000 },
    { id: 101, name: '컵라면', price: 2000 },
    { id: 200, name: '파', price: 5000 },
  ],
};

function App() {
  const [count, setCount] = useState(0);
  const [session, setSession] = useState<Session>(DefaultSession);

  // plusCount(100)을 하면 그냥 100으로 설정이 된다.
  // 왜 함수를 쓰냐? Batch 처리 떄문에, 17ms동안은 버튼을 4번 눌러도 count의 값이 1이 되기 때문이다.
  // void를 리턴한다. 따라서 이걸 쓰는 곳에서는 return type을 void로 설정해야 한다.
  const plusCount = () => setCount((prevCount) => prevCount + 1);

  const logout = () => {
    // session.loginUser = null; fail!!
    setSession({ ...session, loginUser: null });
  };

  const login: LoginFunction = (name, age) => {
    // 기존 세션은 내비둬야 한다!
    if (!name || !age || 0) return alert('Input Name and Age, plz!');
    setSession({ ...session, loginUser: { id: 1, name, age } });
  };

  const removeItem = (id: number) => {
    if(!confirm('Are u sure?')) return; // 뒤에 리턴문에 가는 것을 무겁게 하면 안좋다.
    // setSession({...session, cart: [...session.cart.filter(item => item.id !== id)]})

    // 카트의 주소만 바꾼 것이다. 
    setSession({...session, cart: session.cart.filter(item => item.id !== id)})
  }

  // id가 있다면 수정, 없다면 만들기
  const saveItem = ({id, name, price}: ItemType) => {
    // id로 비교하는 것이 아니고, item으로 비교해야 한다!
    const item = id && session.cart.find(item => item.id === id);

   if (item) {
      // item을 찾음 -> 수정!
      item.name = name;
      item.price = price;
    } else {
      
      // max는 반드시 iterator로 펼쳐서 받아야 한다. 
      // ...와 같은 spread 연산자를 사용하면 id: Math.max([100, 200, 300]) 안에 배열이 펼쳐져서 나온다. 
      const newItem = { id: Math.max(...session.cart.map(item => item.id), 0) + 1, name, price}
      // cart의 주소도 안바뀐다 -> push만 하면 주소가 안바뀐다! -> 즉, 이것을 참조하는 곳은 이 것이 바뀐지 모른다. 
      session.cart.push(newItem);
    }

    // 이 두 줄을 써도 되냐? cart의 주소는 바뀌지 않는다. 
    // session.cart.push(newItem);
    // setSession({ ... session}) 
    setSession({...session, cart: [...session.cart]})
  }

  return (
    <div className='grid place-items-center h-screen'>
      <h1 className='text-3xl'>count: {count}</h1>
      <My session={session} logout={logout} login={login} removeItem={removeItem} saveItem={saveItem} />
      <Hello
        name={session.loginUser?.name}
        age={session.loginUser?.age}
        plusCount={plusCount}
      >
        {/* hello의 children이 된다.  */}
        반갑습니다.
      </Hello>
    </div>
  );
}

export default App;
