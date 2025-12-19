import clsx from 'clsx';
import { useEffect, useEffectEvent, type PropsWithChildren } from 'react';
import { useCounter } from '../hooks/CounterContext';
import { useSession } from '../hooks/SessionContext';
import { useFetch } from '../hooks/useFetch';
import { useToggle } from '../hooks/useToggle';
import Btn from './ui/Btn';
import { Button } from './ui/Button';
// type Prop = { name: string; children: ReactNode };
// children을 포함하고 있는 utility type이 있다. 아래 코드는 위와 같다.

// T & { children: ReactNode};

// prop이 객체와 동시에 Hello가 관리하는 상태가 된다. name -> state! readonly가 됨.
export default function Hello({ children }: PropsWithChildren) {
  const { count, plusCount } = useCounter();

  // use로 시작했기 때문에 -> toggle을 하는 커스텀 훅!
  // const [toggler, toggle] = useReducer((p) => !p, false)
  const [tog, toggle] = useToggle();
  const {
    session: { loginUser },
  } = useSession();

  // null이면 destructuring이 안됨 -> 최소한 빈 배열은 줘야 한다!
  const { name = 'Guest', age } = loginUser || {};

  const {
    data: user,
    isLoading,
    error,
  } = useFetch<{ username: string }>(
    `https://jsonplaceholder.typicode.com/users/${count + 1}`,
    [count]
  );

  const t = useEffectEvent(() => console.log('effect - tog!!!', tog));

  useEffect(() => {
    t();
    console.log('effect - count!!!', count);
  }, [count]);

  return (
    <div className='border border-red-300 p-3 text-center'>
      {error && <h2 className='text-red-500'>Error: {error}</h2>}
      <h2
        style={{ backgroundColor: 'blue' }}
        className={`text-2xl ${count % 2 === 0 ? 'text-blue-500' : 'text-inherit'}`}
      >
        {count + 1}: {tog ? 'T' : 'F'} :: {isLoading ? '...' : user?.username}
      </h2>
      <input type='text' onChange={toggle} />
      <h2 className={clsx('text-2xl', { 'text-blue-500': count % 2 === 0 })}>
        {/* age가 있을 때만 뒤에 small을 불러줘라! */}
        Hello, {name}
        {age && (
          <small className={clsx('text-sm', tog && 'bg-zinc-300')}>
            ({age})
          </small>
        )}
      </h2>
      <div>{children}</div>
      <Btn className='font-bold' onClick={plusCount}>
        count + 1
      </Btn>
      <Button variant={'link'}>ShadcnButon</Button>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}

// default 유무의 차이점 : import에서 임의로 변수를 쓸수 있냐 없냐 import Xx from Hello.tsx처럼
