// 서버 액션이므로 => 이 파일은 sign과 관련된 서버 액션들이 다 모여있다!
'use server';

import { AuthError } from 'next-auth';
import { signIn, signOut } from './auth';

export type Provider = 'google' | 'github' | 'credentials';

// 항상 이벤트를 리턴한다.
export const logout = async () => {
  await signOut({ redirectTo: '/hello' });
};

export const login = async (provider: Provider, formData: FormData) => {
  const redirectTo = formData.get('redirectTo') as string;
  await signIn(provider, { redirectTo });
};

export type ValidError<T> = {
  error: {
    [k in keyof T]?: string;
  };
  data: T;
  // 입력한 값을 다시 뿌리기 위해서
};

export type Credential = { email: string; passwd: string };

export type EmailPasswd = { email: string; passwd: string };

export const loginEmail = async (
  formData: FormData,
): Promise<[ValidError<EmailPasswd>] | [undefined, EmailPasswd]> => {
  const email = formData.get('email') as string;
  const passwd = formData.get('passwd') as string;
  const data = { email, passwd };
  try {
    if (!email) return [{ error: { email: 'Input the email!' }, data }];
    if (!passwd) return [{ error: { passwd: 'Input the passwd!' }, data }];

    const ret = await signIn('credentials', { redirect: false, email, passwd });
    console.log('🚀 ~ signIn.return:', ret);
    return [undefined, data];
  } catch (err) {
    if (err instanceof AuthError) {
      const msg = err.message || 'EmailSignInError';
      const email = msg.substring(0, msg.indexOf('Read more'));
      return [{ error: { email }, data }];
    }
    console.log('🚀 ~ err:', err, err instanceof AuthError);
    return [{ error: { email: JSON.stringify(err) }, data }];
  }
};

export const loginGoogle = async (formData: FormData) =>
  login('google', formData);
export const loginGithub = async (formData: FormData) =>
  login('github', formData);
