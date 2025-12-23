import Image from 'next/image';
import { notFound } from 'next/navigation';
import Modal from '@/components/Modal';

type Props = {
  params: Promise<{ id: string }>;
};

type Photo = {
  id: string;
  author: string;
  download_url: string;
  url: string;
};

export function generateStaticParams() {
  return Array.from({ length: 9 }, (_, i) => ({ id: String(i) }));
}

export const dynamicParams = false;

export default async function Page({ params }: Props) {
  // download url
  const { id } = await params;
  const res = await fetch('https://picsum.photos/v2/list?limit=100');
  const photos: Photo[] = await res.json();

  const photo = photos.find((p) => p.id === id);
  if (!photo) notFound();

  return (
    <Modal>
      <h1>{photo.author} </h1>
      <Image
        src={photo.download_url}
        alt={`photo-${photo.id}`}
        width={160}
        height={160}
        className="object-cover"
      />
      <h3>{photo.url}</h3>
    </Modal>
  );
}
