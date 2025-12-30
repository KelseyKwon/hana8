import { use } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { loginGithub, loginGoogle } from '@/lib/sign.action';
import SignForm from './SignForm';

// type Provider = 'google' | 'github';

export default function SignPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = use(searchParams);
  return (
    <>
      <h1 className="text-xl">Sign In</h1>
      {/* form Action은 항상 form Data를 받는다.  */}
      <form className="flex gap-3">
        {/* 서버로 내려갈 떄 redirectTO라는 이름으로 내려간다 */}
        <input
          type="hidden"
          name="redirectTo"
          value={callbackUrl || '/hello'}
        />
        <Button formAction={loginGoogle}>Google</Button>
        <Button formAction={loginGithub}>Github</Button>
      </form>

      <Separator className="my-8" />
      <SignForm />
    </>
  );
}
