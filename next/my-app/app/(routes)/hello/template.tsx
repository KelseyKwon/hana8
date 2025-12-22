import Link from 'next/link';
import { type PropsWithChildren } from 'react';

export const dynamic = 'auto';

export default function HelloTemplate({ children }: PropsWithChildren) {
  return (
    <>
      <h1>Hello Template</h1>
      <Link href={'/'}>Home</Link>
      {/* page가 나올 자리를 잡기 */}
      <div className="border p-5 text-center">{children}</div>
    </>
  );
}
