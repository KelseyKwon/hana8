// 서버 액션이므로 => 이 파일은 sign과 관련된 서버 액션들이 다 모여있다!
'use server';

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
export const loginEmail = async (formData: FormData) => {
  const redirectTo = formData.get('redirectTo') as string;
  const email = formData.get('redirectTo') as string;
  const passwd = formData.get('redirectTo') as string;
  await signIn('credentials', { redirectTo, email, passwd });
};

export const loginGoogle = async (formData: FormData) =>
  login('google', formData);
export const loginGithub = async (formData: FormData) =>
  login('github', formData);
