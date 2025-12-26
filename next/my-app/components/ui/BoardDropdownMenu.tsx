'use client';

import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './button';

export function BoardDropdownMenu() {
  const labelMap = {
    notice: '공지사항',
    free: '자유게시판',
    album: '앨범',
  };

  const [position, setPosition] = useState<'notice' | 'free' | 'album'>(
    'notice',
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{labelMap[position]}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={position}
          onValueChange={(v) => setPosition(v as 'notice' | 'free' | 'album')}
        >
          <DropdownMenuRadioItem value="notice">공지사항</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="free">자유게시판</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="album">앨범</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
