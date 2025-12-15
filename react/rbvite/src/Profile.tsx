import { useImperativeHandle, type RefObject } from 'react';
import type { LoginUser } from './App';
import Button from './components/ui/Button';

type Prop = { 
  loginUser: LoginUser; 
  logout: () => void 
  ref: RefObject<ProfileHandler | null>
};
export type ProfileHandler = {
  showLoginUser: () => void;
   logout: () => void;
}
export default function Profile({ loginUser, logout, ref }: Prop) {
  const showLoginUser = () => {
    alert(loginUser.name);
  };

  const profileHandler: ProfileHandler = {showLoginUser, logout, };

  // handle을 바깥쪽에 전달 => ref는 profileHandler의 타입이여야 한다.
  useImperativeHandle(ref, () => profileHandler);

  return (
    <>
      <h1 className='text-2xl'>LoginUser:{loginUser.name}</h1>
      <div className='flex gap=5'></div>
      <Button
        onClick={logout}
        className='bg-red-500 hover:bg-red-400 text-white'
      >
        LogOut
      </Button>
      <Button className = '' onClick = {showLoginUser}>showLoginUser</Button>
    </>
  );
}
