import NextAuth, { AuthError } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  // AUTH_로 시작하면 next-auth가 알아서 인식해준다. -> 따로 명시해주지 않아도 된다!
  //   secret: process.env.AUTH_SECRET,

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
        const { email, passwd } = credentials;
        return { id: '1', email: email as string, name: 'HONG', passwd };
      },
    }),
    Google,
    Github,
  ],
  // next의 signIn, jwt, session을 재정의한다.
  callbacks: {
    /**
     *
     * @return Promise
     */
    async signIn({ user, profile }) {
      console.log('signIn - profile', profile);
      console.log('signIn - user', user);

      if (user.email === 'jade@gmail.com')
        throw makeAuthError('EmailSignInError', 'Not Exists Email!');

      return true;
    },
    async jwt({ token, user, trigger }) {
      console.log('🚀 ~ token:', token);
      console.log('🚀 ~ user:', user);
      // user가 없을 때만 trigger을 준다.
      if (trigger) console.log('🚀 ~ trigger:', trigger);

      // user가 있을 때도 있고 없을 떄도 있다. -> 무조건 token을 반환해야 하므로 user의 값을 담아서 보내준다.
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }

      // 무조건 토큰을 반환해야 함!
      return token;
    },
    async session({ session, user }) {
      if (user) {
        session.user.id = user.id;
        session.user.email = user.email;
        session.user.name = user.name;
      }
      return session;
    },
  },
  pages: {
    signIn: '/sign',
    error: '/sign/error',
  },
  session: {
    strategy: 'jwt',
  },
  trustHost: true,
  jwt: { maxAge: 30 * 60 },
});

const makeAuthError = (type: AuthError['type'], message?: string) => {
  const err = new AuthError(message);
  err.type = type;
  return err;
};
