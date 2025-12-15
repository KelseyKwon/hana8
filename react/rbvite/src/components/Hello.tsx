import type { PropsWithChildren } from 'react';
import Button from './ui/Button';

// type Prop = { name: string; children: ReactNode };
// children을 포함하고 있는 utility type이 있다. 아래 코드는 위와 같다.

// T & { children: ReactNode};
type Prop = PropsWithChildren<{
  name?: string;
  age?: number;
  // setCount: (cb: (c: number) => number) => void;
  plusCount: () => void;
}>;

// prop이 객체와 동시에 Hello가 관리하는 상태가 된다. name -> state! readonly가 됨.
export default function Hello({
  name = 'guest',
  age = 0,
  children,
  plusCount,
}: Prop) {
  return (
    <div className='border border-red-300 p-3 text-center'>
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
    </div>
  );
}

// default 유무의 차이점 : import에서 임의로 변수를 쓸수 있냐 없냐 import Xx from Hello.tsx처럼
