import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [Google, Github],
  // AUTH_로 시작하면 next-auth가 알아서 인식해준다. -> 따로 명시해주지 않아도 된다!
  //   secret: process.env.AUTH_SECRET,
});
