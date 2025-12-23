import Image from 'next/image';
import { use } from 'react';
import type { Photo } from '@/app/photos/page';
import Modal from '@/components/Modal';

type Props = {
  params: Promise<{ id: string }>;
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
        blurDataURL="/file.svg"
      />
    </Modal>
  );
}
