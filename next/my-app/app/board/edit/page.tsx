'use client';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useReducer, useState } from 'react';
import { Textarea } from '@/components/text-area';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { savePost } from './posts.action';

type Folder = {
  id: number;
  name: string;
  type?: 'text' | 'file';
};

// 아래 드롭다운 메뉴들 구성
const FOLDERS: Folder[] = [
  { id: 1, name: '공지사항' },
  { id: 2, name: '자유게시판' },
  { id: 3, name: '앨범', type: 'file' },
];

export default function PostEdit() {
  // QQQ 여기에 useReducer을 써야 하는 이유
  const [isOpen, toggleOpen] = useReducer((p) => !p, false);
  const [folder, setFolder] = useState<Folder>(FOLDERS[0]);

  // 아래는 인터랙션이 일어나니까 클라이언트 컴포넌트가 되어야 한다.
  // Prob -> client & server component가 섞여 있음!
  return (
    <>
      <h1 className="text-center font-semibold text-2xl">게시글 작성</h1>
      <form action={savePost} className="space-y-3">
        <div className="flex gap-2">
          {/* 아이콘을 위아래로 바꿀려면, 이게 열렸는지 닫혔는지 알아야 한다 */}
          <DropdownMenu onOpenChange={toggleOpen}>
            <DropdownMenuTrigger>
              {/* 선택된 폴더가 아래에 나와야 한다. */}
              <Button variant="outline">
                {folder.name}
                {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>게시판 선택</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {FOLDERS.map((folder) => (
                <DropdownMenuItem
                  key={folder.id}
                  onClick={() => setFolder(folder)}
                >
                  {folder.name}
                </DropdownMenuItem>
              ))}

              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Input type="text" name="title" placeholder="title..." />
        </div>
        {folder.type === 'file' ? (
          <Input
            type="file"
            name="filex"
            className="cursor-pointer hover:bg-muted"
          />
        ) : (
          <Textarea name="content" placeholder="content..." />
        )}
        <div className="flex justify-around">
          {/* 아래 버튼들은 사용자 인터랙션이 일어난다 -> 따라서 서버와 혼용되므로 formAction을 붙이면 된다! */}
          {/* button들은 type이 가장 중요! form안에 있는 컨텐트들은 type이 가장 중요*/}
          <Button type="reset" variant={'secondary'}>
            취소
          </Button>
          <Button type="button" variant={'destructive'}>
            삭제
          </Button>
          <Button type="submit" variant={'apply'}>
            저장
          </Button>
        </div>
      </form>
    </>
  );
}
