import { type PropsWithChildren } from 'react';
import { useCounter } from '../hooks/CounterContext';
import { useSession } from '../hooks/SessionContext';
import Button from './ui/Button';
import { useToggle } from '../hooks/useToggle';
import { useFetch } from '../hooks/useFetch';

// type Prop = { name: string; children: ReactNode };
// children을 포함하고 있는 utility type이 있다. 아래 코드는 위와 같다.

// T & { children: ReactNode};

// prop이 객체와 동시에 Hello가 관리하는 상태가 된다. name -> state! readonly가 됨.
export default function Hello({children} : PropsWithChildren) {
  const {count, plusCount } = useCounter();

  // use로 시작했기 때문에 -> toggle을 하는 커스텀 훅!
  // const [toggler, toggle] = useReducer((p) => !p, false)
  const [toggler, toggle] = useToggle();
  const {session: {loginUser}, } = useSession();

  // null이면 destructuring이 안됨 -> 최소한 빈 배열은 줘야 한다!
  const {name = 'Guest', age} = loginUser || {};

  const {
    data: user,
    isLoading,
    error,
  } = useFetch<{ username: string }>(
    `https://jsonplaceholder.typicode.com/users/${count + 1}`,
    [count]
  );


                    
  return (
    <div className='border border-red-300 p-3 text-center'>
      {error && <h2 className='text-red-500'>Error: {error}</h2>}
      <h2 className='text-2xl'>
        {count + 1}: {isLoading ? '...' : user?.username}
      </h2>
      <input type='text' onChange={toggle} />
      <h2 className='text-2xl'>
        {/* age가 있을 때만 뒤에 small을 불러줘라! */}
        Hello, {name} {age && <small className='text-sm'>({age})</small>}
      </h2>
      <div>{children}</div>
      <Button
        className='font-bold'
        // onClick={() => plusCount()} => 받은 값을 그대로 리턴하면 그냥 함수 이름만 적으면 된다.
        onClick={plusCount}
      >
        count + 1
      </Button>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}

// default 유무의 차이점 : import에서 임의로 변수를 쓸수 있냐 없냐 import Xx from Hello.tsx처럼
