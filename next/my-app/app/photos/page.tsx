import Image from 'next/image';
import Link from 'next/link';

type ImageItem = {
  id: string;
  download_url: string;
};

export default async function Page() {
  const res = await fetch('https://picsum.photos/v2/list?limit=9');
  const photos: ImageItem[] = await res.json();

  return (
    <>
      <h1>Photos</h1>

      <div className="grid grid-cols-3 gap-4">
        {photos.map((photo) => (
          <Link href={`/photos/${photo.id}`} key={photo.id}>
            <Image
              src={photo.download_url}
              alt={`photo-${photo.id}`}
              width={160}
              height={160}
              className="object-cover"
            />
          </Link>
        ))}
      </div>
    </>
  );
}
