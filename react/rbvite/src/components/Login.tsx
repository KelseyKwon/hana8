import { useEffect, useImperativeHandle, useRef, type FormEvent } from 'react';
import Btn from './ui/Btn';
import LabelInput from './ui/LabelInput';
import { useSession } from '../hooks/SessionContext';

export type LoginHandler = {
  validate: () => void;
  focusName: () => void;
};

export type LoginHandle = {
  focusId: () => void;
  focusAge: () => void;
};

// ref : 바깥으로 내보내기 위한 ref
export default function Login() {
  // const [name, setName] = useState('');
  // const [age, setAge] = useState(0);
  const { login, loginHandlerRef: ref } = useSession();
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    validate() {
      if (!nameRef.current?.value) {
        alert('Input the name!');
        nameRef.current?.focus();
        return false;
      }
      if (!ageRef.current?.value) {
        alert('Input the age!');
        ageRef.current?.focus();
        return false;
      }

      return true;
    },
    focusName() {
      nameRef.current?.focus();
    },
  }));

  const makeLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if(nameRef.current?.value && ageRef.current?.value)
    login(nameRef.current?.value ?? '', Number(ageRef.current?.value));
  };

  // 서버에서는 이 formData를 꺼내서 로그인 정보를 얻을 수 있다.
  const loginAction = (formData: FormData) => {
    // const formObj = Object.fromEntries(formData.entries());
    console.log('🚀 ~ loginAction ~ formData:', formData);
    const name = formData.get('name') as string;
    // const Age = formData.get('name') as string; -> 이건 안됨! formData는 String은 되지만 Number는 안됨!
    login(name, Number(formData.get('age')));
  };

  // dom이 paint 될 떄 그려진다.  => 바로 첫 페이지에서 포커스가 됨!
  useEffect(() => {
    console.log('Login plz...');
    if (nameRef.current) nameRef.current.focus();

    return () => console.log('로그인이 되셨어요'); // unmount -> 함수를 가지고 있다가, unmount가 될 때, 이 함수를 호출하게 된다. 따라서 무조건 function object가 되어야 한다!
  }, []);

  return (
    <div className='border border-red-300 p-3 rounded-lg'>
      <h1 className='text-2xl text-center font-medium'>Login</h1>
      {/* <form action='/post/write' className='space-y-3'> */}
      <form action={loginAction} className='space-y-3'>
        <input type='text' name='name' />
        <input type='number' name='age' />
        <Btn className='bg-blue-500 text-white hover:bg-blue-600'>
          LoginAction
        </Btn>
      </form>
      <form onSubmit={makeLogin} className='space-y-3'>
        {/* 화면에서 입력받는 것 => 무조건 form! form속에 form 패턴은 좋지 않다 */}
        <LabelInput label='Name' ref={nameRef}></LabelInput>
        {/* <LabelInput type='number' ref={nameRef} placeholder='age...'></LabelInput> */}
        {/* <LabelInput type = 'number' onChange={e => setAge(+e.target.value)} label='Age' ></LabelInput> */}
        <LabelInput
          type='number'
          ref={ageRef}
          // onChange={(e) => setAge(+e.target.value)}
          placeholder='Age...'
        />
        {/* <label htmlFor='age' className='text-sm text-gray-600'>
              Age
            </label>
            <input
              type='number'
              id='age'
              ref={ageRef}
              placeholder='age...'
              className='w-full'
              required
            />
          </div> */}
        <div className='text-center'>
          <button type='reset'>Cancel</button>
          <Btn
            // type='submit'
            // onClick={() => login(name, age)}
            className='bg-blue-500 text-white hover:bg-blue-600'
          >
            Login
          </Btn>
        </div>
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
