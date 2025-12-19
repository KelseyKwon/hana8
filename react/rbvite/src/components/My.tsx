/* eslint-disable react-hooks/rules-of-hooks */
import { Loader2Icon, PlusIcon } from 'lucide-react';
import {
  useActionState,
  useDeferredValue,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  useTransition,
} from 'react';
import { useInterval, useThrottle } from '../hooks/useTimer';
import { useSession, type ItemType } from '../hooks/SessionContext';
import Item from './Item';
import Login from '../Login';
import Profile, { type ProfileHandler } from '../Profile';
import { Button } from './ui/Button';
import LabelInput from './ui/LabelInput';
import Posts from './Posts';
import { useFormStatus } from 'react-dom';
import Btn from './ui/Btn';

// type UR<T> = {current: T | null}

export default function My() {
  const { session } = useSession();
  // const [isAdding, setAdding]= useState(false);
  // const toggleAdding = () => setAdding((pre) => !pre);

  // first argument : Dispatch 함수
  const [isAdding, toggleAdding] = useReducer((pre) => !pre, false); //여기에서는 action이 필요가 없다.
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
  const item101 = session.cart.find((item) => item.id === 101);

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

  // useInterval(ff, 1000, goodSec + 1);

  // const [data, setData] = useState<ItemType[]>([]);
  // useLayoutEffect(() => {
  //   const controller = new AbortController()
  //   const {signal} = controller;
  //   fetch('/data/sample/json', {signal})
  //   .then(res => res.json())
  //   .then(setData)

  //   return () => controller.abort();
  // }, []);

  // const { data } = useFetch<ItemType[]>('/data/sample.json');

  const totalPrice = useMemo(
    () => session.cart.reduce((acc, item) => acc + item.price, 0),
    [session.cart]
  );

  // 해서 데이터를 받기!
  // useFetch()

  const [searchStr, setSearchStr] = useState('');
  // 아래 str은 디바운스가 처리된 값 -> 이걸로 검색을 해야 한다!
  // const debouncedSearchStr = useDebounce(searchStr, 500);
  const debouncedSearchStr = useThrottle(searchStr, 500);

  // useState가 실제 상태. 실제 상태가 바뀐다는 것은 렌더링이 끝난다는 것! -> 끝난 다음에, useDeferredValue을 불러준다!
  const deferredStr = useDeferredValue(searchStr);

  // const [isPending, startTransition] = useTransition();
  const [searchResult, setSearchResult] = useState<ItemType[]>([]);
  const [isSearching, startSearchTransition] = useTransition();

  // e = onChangeEvent! => 즉, 상태르 바꾸는 것을 2초 이따가 바꾸기! (검색 위에 나타나는 것이 오래 걸린다)
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    /**
     * 만약에 startSearchTransition을 안 쓰면, setSearching(true) -> 하고 난 다음에 setSearching(false)로 만들어야 한다!
     * 즉, 비동기에 대한 처리르 할 떄, 함수 자체가 비동기를 가질 필요가 없고, (onChange의 이벤트 리스너가 비동기가 되는 것은 좋지 않다 -> 브라우저가 알기 힘들기 떄문!)
     * 하지만 startSearchTransition을 쓰면 astnc을 여기에 쓸 수 있기 때문에 k!
     */

    // 이렇게 하면, handler가 async을 가질 필요가 없다! -> 왜냐면 아래 함수에서 async을 사용하면 되므로
    startSearchTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const str = e.target.value;
      // 상태가 바뀌고 나면, setSearchStr 실행
      setSearchStr(e.target.value);
      setSearchResult(session.cart.filter((item) => item.name.includes(str)));
    });
    // 2초 동안에 달레이 만들기
    // 검색을 지연시키고 싶다.
  };

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
      <div className='flex'>
        <button onClick={reset}>reset</button>
        <button onClick={clear}>clear</button>
      </div>
      {session?.loginUser ? <Profile ref={profileHandlerRef} /> : <Login />}
      <hr />
      <a
        href='#!'
        onClick={(e) => {
          e.preventDefault();
          profileHandlerRef.current?.showLoginUser();
        }}
      >
        {item101?.name}
      </a>
      <Posts />
      <h2 className='text-xl'>Tot: {totalPrice.toLocaleString()}원</h2>
      <div>
        {isPending ? (
          <Loader2Icon className='animate-spin' />
        ) : (
          'SR_ActionState'
        )}
        :{results.map((item) => item.name).join()}
      </div>
      <div>SR_Transition: {searchResult.map((item) => item.name).join()}</div>

      {isSearching ? (
        <Loader2Icon className='animate-spin' />
      ) : (
        <h2 className='text-xl text-red-800'>
          {searchStr} : {deferredStr} : {debouncedSearchStr}
        </h2>
      )}
      {/* input값이 바뀔때마다 아래에 검색 값이 나오도록 설정 */}
      {/* <form action={search}> */}
      <form className='flex gap-2 items-end'>
        <LabelInput label='ActionState' autoComplete='off' />
        <Button formAction={search}>Action</Button>
        <SearchButton />
      </form>
      <LabelInput
        label='Transition'
        onChange={handleSearch}
        autoComplete='off'
      />
      <ul>
        {/* {(session.cart.length ? session.cart : data) */}
        {session.cart
          ?.filter((item) => item.name.includes(debouncedSearchStr))
          .map((item) => (
            <li key={item.id}>
              <Item item={item} />
            </li>
          ))}
        <li className='text-center'>
          {isAdding ? (
            <Item
              item={{ id: 0, name: 'New Item', price: 3000 }}
              toggleAdding={toggleAdding}
            />
          ) : (
            <Btn onClick={toggleAdding} className=''>
              <PlusIcon />
            </Btn>
          )}
        </li>
      </ul>
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
