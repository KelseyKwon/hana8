import { useImperativeHandle, type RefObject } from 'react';
import Btn from './ui/Btn';
import { useSession } from '../hooks/SessionContext';

type Prop = {
  ref: RefObject<ProfileHandler | null>;
};

export type ProfileHandler = {
  xxx: string;
  showLoginUser: () => void;
  logout: () => void;
};
export default function Profile({ ref }: Prop) {
  const {
    session: { loginUser },
    logout,
  } = useSession();

  const showLoginUser = () => {
    alert(loginUser?.name);
  };

  const xxx = 'sdfdsfdfsfs';

  useImperativeHandle(ref, () => ({
    xxx,
    showLoginUser,
    logout,
  }));

  return (
    <>
      <h1 className='text-2xl'>LoginUser:{loginUser?.name}</h1>
      <div className='flex gap=5'></div>
      <Btn onClick={logout} className='bg-red-500 hover:bg-red-400 text-white'>
        LogOut
      </Btn>
      <Btn className='' onClick={showLoginUser}>
        showLoginUser
      </Btn>
    </>
  );
}
