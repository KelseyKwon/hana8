import Link from 'next/link';
import type { PropsWithChildren } from 'react';

// export const dynamic = 'auto';

export default function HelloLayout({ children }: PropsWithChildren) {
  return (
    <>
      <h1>Hello Layout</h1>
      <div className="flex gap-3">
        <Link href={'/'}>Home</Link>
        <Link href={'/hello'}>Hello</Link>
        <Link href={'/hello/morning'}>Morning</Link>
        <Link href={'/hello/evening'}>Evening</Link>
        <Link href={'/hello/afternoon'}>Afternoon</Link>

        {/* page가 나올 자리를 잡기 */}
      </div>
      <div className="border p-5 text-center">{children}</div>
    </>
  );
}
