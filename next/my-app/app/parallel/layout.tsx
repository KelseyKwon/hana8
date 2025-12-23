import Link from 'next/link';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  login: ReactNode;
  profile: ReactNode;
};

export default function ParallelLayout({
  // 2 개의 영역을 같이 잡아야 한다 -> login, profile
  // 즉, children, login, profile이 잡히는 영역이 존재!
  children,
  login,
  profile,
}: Props) {
  const didLogin = true;
  return (
    <div>
      <h1 className="text-center">Parallel Layout</h1>
      <div className="flex gap-3">
        <Link href={'/parallel/aaa'}>AAA</Link>
        {/* 여기는 404 not found -> 왜냐? bbb가 없으니까 */}
        <Link href={'/parallel/bbb'}>BBB</Link>
      </div>
      <div>{children}</div>
      <div className="grid grid-cols-2 gap-3">
        {didLogin ? (
          <div className="border">{login}</div>
        ) : (
          <div className="border">{profile}</div>
        )}
      </div>
    </div>
  );
}
