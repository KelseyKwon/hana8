import type { PropsWithChildren } from 'react';
import { Textarea } from '@/components/text-area';
import { BoardDropdownMenu } from '@/components/ui/BoardDropdownMenu';
import { Button } from '@/components/ui/button';

export default function BoardLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <BoardDropdownMenu />
        <Textarea placeholder="title..." />
      </div>
      <div>
        <Textarea placeholder="content..." />
        <div className="grid grid-cols-3 gap-5">
          <Button variant="ghost">취소</Button>
          <Button variant="destructive">삭제</Button>
          <Button variant="apply">저장</Button>
        </div>
      </div>
      {children}
    </>
  );
}
