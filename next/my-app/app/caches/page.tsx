import { cacheLife, cacheTag, revalidateTag, updateTag } from 'next/cache';

async function RandomValue() {
  // 이 캐시는 서버에서만 일어난다! 브라우저 캐시는 미리 등록되었음
  'use cache';
  cacheLife({
    stale: 5,
    revalidate: 10,
  });
  // a, b, c반이 있는데, a, b반만 expire할 수 있으므로
  cacheTag('random-value', 'math'); // tag등록!
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log('***********', new Date());
  return Math.random();
}

// 이 함수는 반드시 서버에서만 실행되어야 한다.
export default function Page() {
  const revalidateRandom = async () => {
    'use server';
    // 서버에서 revalidate하겠다!
    revalidateTag('random-value', { expire: 0 });
  };
  const updateRandom = async () => {
    'use server';
    // 서버에서 revalidate하겠다!
    updateTag('random-value'); // 또는 'math'
  };

  return (
    <>
      <p className="m-3 border p-3">
        <RandomValue />
      </p>
      {/* 서버 액션 프로토콜로 바뀐다 */}
      <form action={revalidateRandom}>
        <button
          formAction={revalidateRandom}
          className="ml-3 rounded-md border p-3"
        >
          RevalidateTag
        </button>
        <button
          formAction={updateRandom}
          className="ml-3 rounded-md border p-3"
        >
          updateTag
        </button>
        ;
      </form>
    </>
  );
}
