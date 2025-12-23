import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';

export type Photo = {
  id: string;
  author: string;
  download_url: string;
  width: number;
  height: number;
};

const getPhotos = async (n: number = 10): Promise<Photo[]> =>
  fetch(`https://picsum.photos/v2/list?limit=${n}`).then((res) => res.json());

export default function PhotosPage() {
  const photos = use(getPhotos());

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
