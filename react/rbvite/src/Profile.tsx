import { useImperativeHandle, type RefObject } from 'react';
import Btn from './components/ui/Btn';
import { useSession } from './hooks/SessionContext';

type Prop = {
  ref: RefObject<ProfileHandler | null>;
};
export type ProfileHandler = {
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

  const profileHandler: ProfileHandler = { showLoginUser, logout };

  // handle을 바깥쪽에 전달 => ref는 profileHandler의 타입이여야 한다.
  useImperativeHandle(ref, () => profileHandler);

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
