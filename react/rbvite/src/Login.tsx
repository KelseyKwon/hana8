import { useEffect, useRef, type FormEvent } from 'react';
import Button from './components/ui/Button';
import type { LoginFunction } from './App';
import LabelInput from './components/ui/LabelInput';

type Props = {
  login: LoginFunction;
};
export default function Login({ login }: Props) {
  // const [name, setName] = useState('');
  // const [age, setAge] = useState(0);

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);

  const makeLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(nameRef.current?.value && ageRef.current?.value)
    login(nameRef.current.value, Number(ageRef.current.value))
  }

  // dom이 paint 될 떄 그려진다.  => 바로 첫 페이지에서 포커스가 됨!
  useEffect(() => {
    if(nameRef.current)
    nameRef.current.focus();
  }, [])

  return (
    <div className='border border-red-300 p-3 rounded-lg'>
      <form className='space-y-3'>
        <h1 className='text-2xl text-center font-medium'>Login</h1>
        <form onSubmit={makeLogin} className='space-y-3'>
        {/* 화면에서 입력받는 것 => 무조건 form! form속에 form 패턴은 좋지 않다 */}
          <LabelInput label='Name' ref={nameRef}></LabelInput>
          {/* <LabelInput type='number' ref={nameRef} placeholder='age...'></LabelInput> */}
          {/* <LabelInput type = 'number' onChange={e => setAge(+e.target.value)} label='Age' ></LabelInput> */}
          <div>
          <label htmlFor='age' className='text-sm text-gray-600'>
            Age
          </label>
          <input
            type='number'
            id='age'
            ref={ageRef}
            placeholder='user name...'
            className='w-full'
            required
          />
        </div>
          <div className='text-center'>
            <button type='reset'>Cancel</button>
            <Button
            type = 'submit'
              // onClick={() => login(name, age)}
              className='bg-blue-500 text-white hover:bg-blue-600'
            >
              Login
            </Button>
          </div>
          </form>
        </form>
    </div>
  );
}

// export default function Login() {
//   const cancel = () => {
//     setloginId = '';
//     setloginName = '';
//   };

//   // state 타입을 유추하려면 초기값이 필요하다!
//   const [loginId, setloginId] = useState('');
//   const [loginName, setloginName] = useState('');
//   return (
//     <>
//       <div className='flex flex-col gap-2'>
//         {/* LoginId:
//       LoginName:
//       밑에 Cancel, Login (파란색 border) */}
//         <div className='flex flex-row gap-3'>
//           LoginId:
//           <input
//             type='text'
//             className='bg-500 border p-2 h-8 rounded'
//             value={loginId}
//             onChange={(e) => setloginId(e.target.value)}
//           ></input>
//         </div>
//         <div className='flex flex-row gap-3'>
//           LoginName:
//           <input
//             type='text'
//             className='bg-500 border p-2 h-8 rounded'
//             value={loginName}
//             onChange={(e) => setloginName(e.target.value)}
//           ></input>
//         </div>
//         <div className='flex flex-row gap-3'>
//           <Button onClick={cancel} = className=''></Button>
//           <Button className=''></Button>
//         </div>
//       </div>
//     </>
//   );
// }
