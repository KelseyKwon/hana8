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

// // 'use client';

// import { use } from 'react';

// // import { useParams } from 'next/navigation';

// //======client 방식=======//
// // export default function HelloId() {
// // use가 붙었으므로 client에서 실행된 것임!
// //   const { id } = useParams<{ id: string }>();

// type Props = {
//   params: Promise<{ id: number }>;
// };

// // 서버 컴포넌트 = 비동기! HelloId를 실행하기 위해서는 서버로 가야 하는데, 파라미터들은 request에 담겨져서 온다.
// // response, request는 항상 네트워크를 타고 들어오기 때문에 -> 비동기이다!
// export default function HelloId({ params }: Props) {
//   const { id } = use(params);
//   return `Hello id is ${id}`;
// }

/**
 * import Image from 'next/image';
 import Modal from '@/components/Modal';
 
 export default function Page() {
   return (
     <Modal>
       <h1>Ic2</h1>
       <Image
         src="https://picsum.photos/id/0/5000/3333"
         alt="xxx"
         width={200}
         height={200}
       />
       <button>button</button>
     </Modal>
   );
 }
 
 */
