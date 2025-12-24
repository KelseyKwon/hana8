'use cache';

import Image from 'next/image';
import Link from 'next/link';
import { blurDataURL_dark } from '@/app/(routes)/hi/constants';
import type { Photo } from '../page';

type Props = {
  params: Promise<{ id: string }>;
};

export const generateStaticParams = async () => {
  const photos: Awaited<Photo[]> = await fetch(
    `https://picsum.photos/v2/list?limit=${10}`,
  ).then((res) => res.json());
  // [photoId: '0']
  return photos.map(({ id }) => ({ id }));
};

// export const dynamicParams = false;

export default async function PhotoView({ params }: Props) {
  const { id } = await params;
  // if (id > '10') notFound();
  const { author, download_url, width, height } = (await fetch(
    `https://picsum.photos/id/${id}/info`,
  ).then((res) => res.json())) as Photo;

  return (
    <>
      <h1>{author} </h1>
      <Image
        src={download_url}
        alt={author}
        width={width}
        height={height}
        placeholder="blur"
        blurDataURL={blurDataURL_dark}
      />
      <Link href="/photos"></Link>
    </>
  );
}
