import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  // Credential 이 맨 아래에 보인다
  providers: [
    Credentials({
      name: 'Email & password',
      credentials: {
        email: {
          label: '이메일',
          type: 'email',
          placeholder: 'user@email.com',
        },
        passwd: {
          label: '패스워드',
          type: 'password',
          placeholder: 'password...',
        },
      },
      // awaitable = async!
      async authorize(credentials) {
        console.log('🚀 ~ credentials:', credentials);
        const { email } = credentials;
        return { id: '1', email: email as string, name: 'HONG' };
      },
    }),
    Google,
    Github,
  ],
  // AUTH_로 시작하면 next-auth가 알아서 인식해준다. -> 따로 명시해주지 않아도 된다!
  //   secret: process.env.AUTH_SECRET,
});
