import { type NextRequest, NextResponse } from 'next/server';
import { auth } from './lib/auth';

// proxy의 용도 : 어떤 과정을 통과할 때 (로그인을 통과할 때)
export async function proxy(req: NextRequest) {
  const session = await auth();
  const didLogin = !!session?.user;
  // if (!didLogin) return NextResponse.json({ msg: 'Need Login!' });
  if (!didLogin) {
    const callbackUrl = encodeURIComponent(req.nextUrl.pathname);
    return NextResponse.redirect(
      new URL(`/sign?callbackUrl=${callbackUrl}`, req.url),
    );
  }
}

export const config = {
  //   matcher: ['/photos', '/api/books/:path*'], 직접 명시해주는 것
  // 아닌 것을 알려주는 것
  matcher: [
    // '/((?!login|regist|_next/static|_next/image|auth|api/auth|favicon.ico|robots.txt|images|api/books|$).*)',
    // '/admin',
    '/caches',
    // '/api/:path*',
    // 'posts/:postId*/edit',
  ],
};
