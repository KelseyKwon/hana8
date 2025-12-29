import { type NextRequest, NextResponse } from 'next/server';

// proxy의 용도 : 어떤 과정을 통과할 때 (로그인을 통과할 때)
export function proxy(req: NextRequest) {
  const didLogin = req.cookies.has('nextjs');
  //   if (!didLogin) redirect('/');
  if (!didLogin) return NextResponse.json({ msg: 'Need Login!' });
  return NextResponse.next();
}

export const config = {
  //   matcher: ['/photos', '/api/books/:path*'], 직접 명시해주는 것
  // 아닌 것을 알려주는 것
  matcher: [
    '/((?!login|regist|_next/static|_next/image|auth|api/auth|favicon.ico|robots.txt|images|api/books|$).*)',
    // '/api/:path*',
    // 'posts/:postId*/edit',
  ],
};
