import { use } from 'react';
import { CMTS, TIMES } from '../constants';

type Props = {
  params: Promise<{ slug?: string[] | number[] }>;
};

// dynamic인 것을 static으로 만들기!
// export async function generateStaticParams() {
//   return [{ time: 'morning' }, { time: 'afternoon' }, { time: 'evening' }];
// }

export const generateStaticParams = async () => {
  return TIMES.flatMap((time) => CMTS.map((cmt) => ({ slug: [time, cmt] })));
};

export default function Hi({ params }: Props) {
  // params의 Promise가 벗겨진다. -> morning, afternoon, evening밖에 안된다.
  const { slug } = use(params);
  const [time, cmt] = (slug ?? []) as string[];

  return (
    <h1>
      Good <span className="capitalize">{time}</span> - {cmt}!
    </h1>
  );
}
