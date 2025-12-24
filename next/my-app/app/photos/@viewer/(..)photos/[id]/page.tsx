import Image from 'next/image';
import { use } from 'react';
import { blurDataURL_beige } from '@/app/(routes)/hi/constants';
import type { Photo } from '@/app/photos/page';
import Modal from '@/components/Modal';

type Props = {
  params: Promise<{ id: string }>;
};

export const generateStaticParams = async () => {
  // const photos:Photo[]>= await fetch(`https://picsum.photos/v2/list?limit=${10}`).then( -> 이건 안됨.
  const photos: Awaited<Photo[]> = await fetch(
    `https://picsum.photos/v2/list?limit=${10}`,
  ).then(
    // -> 이게 진정으로 Promise를 벗긴 awaited라고 봄!
    (res) => res.json(),
  );
  // [photoId: '0']
  return photos.map(({ id }) => ({ id }));
};

export default function PhotoView({ params }: Props) {
  const { id } = use(params);
  const { author, download_url, width, height } = use(
    fetch(`https://picsum.photos/id/${id}/info`).then((res) => res.json()),
  ) as Photo;

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
