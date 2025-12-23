import Link from 'next/link';
import type { PropsWithChildren } from 'react';
import { TIMES } from '../../hi/constants';

export default function HiLayout({ children }: PropsWithChildren) {
  return (
    <div className="border-2 border-green-300 text-center">
      <h1>Hello/(..)Hi Layout</h1>

      <div className="flex justify-center gap-3">
        {TIMES.map((time) => (
          <Link href={`/hi/${time}`} key={time}>
            {time}/H
          </Link>
        ))}
      </div>

      {children}
    </div>
  );
}
