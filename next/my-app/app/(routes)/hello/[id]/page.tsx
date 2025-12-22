// 'use client';

import { use } from 'react';

// import { useParams } from 'next/navigation';

//======client 방식=======//
// export default function HelloId() {
// use가 붙었으므로 client에서 실행된 것임!
//   const { id } = useParams<{ id: string }>();

type Props = {
  params: Promise<{ id: number }>;
};

// 서버 컴포넌트 = 비동기! HelloId를 실행하기 위해서는 서버로 가야 하는데, 파라미터들은 request에 담겨져서 온다.
// response, request는 항상 네트워크를 타고 들어오기 때문에 -> 비동기이다!
export default function HelloId({ params }: Props) {
  const { id } = use(params);
  return `Hello id is ${id}`;
}
