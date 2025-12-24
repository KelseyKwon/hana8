'use cache';

import { cacheLife } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';

export type Photo = {
  id: string;
  author: string;
  download_url: string;
  width: number;
  height: number;
};

// ISR : Incremental Static Regeneration
// export const revalidate = 86400; // 60 seconds

const getPhotos = async (n: number = 20): Promise<Photo[]> =>
  fetch(`https://picsum.photos/v2/list?limit=${n}`, {
    cache: 'force-cache',
  }).then((res) => res.json());

export default async function PhotosPage() {
  cacheLife({
    stale: 5,
    revalidate: 86400,
  }); // 10분 동안 캐시 유지
  const photos = await getPhotos();

  return (
    // <div className="grid grid-cols-3 gap-4">
    <div className="flex flex-wrap justify-center gap-3">
      {photos.map(({ id, author, download_url }) => (
        <Link
          href={`/photos/${id}`}
          key={id}
          className="opacity-80 duration-200 hover:scale-105 hover:opacity-100"
        >
          <Image
            src={download_url}
            alt={author}
            width={300}
            height={300}
            quality={70}
            loading="lazy"
          />
        </Link>
      ))}
    </div>
  );
}
