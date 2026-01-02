import { Separator } from '@/components/ui/separator';
import { loginGithub, loginGoogle } from '@/lib/sign.action';
import { use } from 'react';
import { GithubLoginButton } from './GithubLoginButton';
import { GoogleLoginButton } from './GoogleLoginButton';
import RegistForm from './RegistForm';
import SignForm from './SignForm';

// type Provider = 'google' | 'github';

export default function SignPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; isup?: string }>;
}) {
  const { callbackUrl, isup } = use(searchParams);
  const isRegist = !!isup;

  return (
    <div className="mx-auto w-96 rounded-md border p-5">
      <h1 className="mb-5 text-center font-semibold text-xl">
        Sign {isRegist ? 'Up' : 'In'}
        </h1>
      {/* form Action은 항상 form Data를 받는다.  */}
      <form className="flex gap-3">
        {/* 서버로 내려갈 떄 redirectTO라는 이름으로 내려간다 */}
        <input
          type="hidden"
          name="redirectTo"
          value={callbackUrl || '/hello'}
        />
        <div className="grid grid-cols-2 place-items-center gap-5">
          <GoogleLoginButton formAction={loginGoogle} isRegist={isRegist}  />
          <GithubLoginButton formAction={loginGithub} />
        </div>
      </form>

      <Separator className="my-8" />
      {isRegist ? <RegistForm /> : <SignForm />}
    </div>
  );
}
