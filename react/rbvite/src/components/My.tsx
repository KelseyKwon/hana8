/* eslint-disable react-hooks/rules-of-hooks */
import { Loader2Icon } from 'lucide-react';
import { useActionState, useEffect, useMemo, useState } from 'react';
import { useInterval } from '../hooks/useTimer';
import { useSession, type ItemType } from '../hooks/SessionContext';
import { Button } from './ui/Button';
import LabelInput from './ui/LabelInput';
import { useFormStatus } from 'react-dom';

// type UR<T> = {current: T | null}

export default function My() {
  const { session } = useSession();

  // strict mode vs 그냥 mode
  const [badSec, setBadSec] = useState(0);
  const [goodSec, setGoodSec] = useState(0);
  // useEffect -> dom이 그려지고 나서 호출이 된다! // bad : clean x, good : clean o
  useEffect(() => {
    setInterval(() => setBadSec((p) => p + 1), 1000);
  }, []);

  // const ff = (n: number) => {
  const ff = () => {
    // console.log('🚀 ~ n:', n, goodSec); // n은 영원히 1 (: )
    // setGoodSec(n + 1); // 위 goodSec는 영원히 0
    setGoodSec((p) => p + 1);
  };
  // goodSec + 1 의 값이
  // console.log('🚀 ~ goodSec:', goodSec);
  const { reset, clear } = useInterval(ff, 1000);

  const totalPrice = useMemo(
    () => session.cart.reduce((acc, item) => acc + item.price, 0),
    [session.cart]
  );

  // 해서 데이터를 받기!
  // useFetch()

  const [results, search, isPending] = useActionState(
    async (preResults: ItemType[], formData: FormData) => {
      const str = formData.get('ActionState') as string;
      console.log('******', preResults, str);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return session.cart.filter((item) => item.name.includes(str));
    },
    []
  );

  return (
    <>
      <h1 className='text-xl'>
        bad: {badSec}, good: {goodSec}
      </h1>
      <div className='flex space-x-3'>
        <Button
          variant={'outline'}
          onClick={() => {
            setGoodSec(0);
            reset();
          }}
        >
          reset
        </Button>
        <Button variant={'secondary'} onClick={clear}>
          stop
        </Button>
      </div>
      <hr />
      <h2 className='text-xl'>Tot: {totalPrice.toLocaleString()}원</h2>
      <div>
        {isPending ? (
          <Loader2Icon className='animate-spin' />
        ) : (
          'SR_ActionState'
        )}
        :{results.map((item) => item.name).join()}
      </div>
      {/* input값이 바뀔때마다 아래에 검색 값이 나오도록 설정 */}
      {/* <form action={search}> */}
      <form className='flex gap-2 items-end'>
        <LabelInput label='ActionState' autoComplete='off' />
        <Button formAction={search}>Action</Button>
        <SearchButton />
      </form>
    </>
  );
}

function SearchButton() {
  const { pending, data } = useFormStatus();
  if (data) console.log('ddddddd>>', data, pending);
  return <button disabled={pending}>SearchButton</button>;
  return (
    <Button variant={'secondary'} disabled={pending}>
      SearchButton
    </Button>
  );
}
