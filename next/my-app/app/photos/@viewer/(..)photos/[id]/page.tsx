'use cache';

import Image from 'next/image';
import { blurDataURL_beige } from '@/app/(routes)/hi/constants';
import type { Photo } from '@/app/photos/page';
import Modal from '@/components/Modal';

type Props = {
  params: Promise<{ id: string }>;
};

// SSG인데 캐시를 사용안함 -> 그래서 정적인 html을 사용할 수 있다는 에러이다!
export const generateStaticParams = async () => {
  // const photos:Photo[]>= await fetch(`https://picsum.photos/v2/list?limit=${10}`).then( -> 이건 안됨.
  const photos: Awaited<Photo[]> = await fetch(
    `https://picsum.photos/v2/list?limit=${20}`,
  ).then(
    // -> 이게 진정으로 Promise를 벗긴 awaited라고 봄!
    (res) => res.json(),
  );
  // [photoId: '0']
  return photos.map(({ id }) => ({ id }));
};

export default async function PhotoView({ params }: Props) {
  const { id } = await params;
  const { author, download_url, width, height } = (await fetch(
    `https://picsum.photos/id/${id}/info`,
  ).then((res) => res.json())) as Photo;

  return (
    <Modal>
      <h1>{author} </h1>
      <Image
        src={download_url}
        alt={author}
        width={width}
        height={height}
        placeholder="blur"
        blurDataURL={blurDataURL_beige}
      />
    </Modal>
  );
}
