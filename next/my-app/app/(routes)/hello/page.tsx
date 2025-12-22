// onCLick을 사용하는 SayHello을 사용하므로 -> client을 써야 함! (server 말고))
'use client';

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { Suspense } from 'react';
import SayHello from './SayHello';

export const dynamic = 'auto';

export default function Hello() {
  const pathname = usePathname();
  const p = useParams();
  return (
    <>
      <h1>Hello Page: {pathname}</h1>
      <div>
        {/* <Suspense fallback={<h1>...</h1>}> */}
        <SayHello name={'Next'} />
        {/* </Suspense> */}
        <Suspense fallback={<h1>Loading ID...</h1>}>
          <SearchParamId />
        </Suspense>
      </div>
    </>
  );
}

function SearchParamId() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());

  const id = searchParams.get('id');
  // const name = searchParams.get('name');

  const router = useRouter();
  const make200 = () => {
    params.set('id', `200`);

    // use200을 눌러도 어떤 액션이 나타나게 하기 -> 서버에게 알려주기 위해 주소창을 바꾼다.
    // foraward, push, refresh 등이 있다.
    router.push(`${pathname}?${params.toString()}`);
    // router.push('/');
  };

  return <button onClick={make200}>ID: {id}</button>;
}
