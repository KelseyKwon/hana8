'use client';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useActionState, useReducer, useState } from 'react';
import { Textarea } from '@/components/text-area';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type PostError, savePost } from './posts.action';

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
  const [isOpen, toggleOpen] = useReducer((p) => !p, false);
  const [folder, setFolder] = useState<Folder>(FOLDERS[0]);

  // action (아래에 save 함수에서는) formData만 받았는데, state에서는 에러의 상태도 바꿀 수 있다!
  const [postError, save, isPending] = useActionState(
    async (_: PostError | undefined, formData: FormData) => {
      const [err, data] = await savePost(formData);
      if (err) return err;
      console.log('savedData>>', data);
    },
    undefined,
  );

  // const save = async (formData: FormData) => {
  //   const [err, data] = await savePost(formData);
  //   if (err) return err;
  //   return data;
  // };
  // 아래는 인터랙션이 일어나니까 클라이언트 컴포넌트가 되어야 한다.
  // Prob -> client & server component가 섞여 있음!
  return (
    <>
      <h1 className="text-center font-semibold text-2xl">게시글 작성</h1>
      <form action={save} className="space-y-3">
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
            </DropdownMenuContent>
          </DropdownMenu>
          <Input type="text" name="title" placeholder="title..." />
        </div>

        <div className="flex gap-2">
          <Label htmlFor="isPrivate">
            <Checkbox id="isPrivate" name="private" defaultChecked={true} />
            비공개 글
          </Label>
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

        {!!postError && <span className="text-red-500">{postError.error}</span>}

        <div className="flex justify-around">
          {/* 아래 버튼들은 사용자 인터랙션이 일어난다 -> 따라서 서버와 혼용되므로 formAction을 붙이면 된다! */}
          {/* button들은 type이 가장 중요! form안에 있는 컨텐트들은 type이 가장 중요*/}
          <Button type="reset" variant={'secondary'}>
            취소
          </Button>
          <Button type="button" variant={'destructive'}>
            삭제
          </Button>
          {/* 저장이 될 동안에는 disabled */}
          <Button type="submit" variant={'apply'} disabled={isPending}>
            저장{isPending && '...'}
          </Button>
        </div>
      </form>
    </>
  );
}
