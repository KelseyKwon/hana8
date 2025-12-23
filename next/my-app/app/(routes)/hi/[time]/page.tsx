import { use } from 'react';
import { TIMES } from '../constants';

type Props = {
  params: Promise<{ time: 'morning' | 'afternoon' | 'evening' }>;
};

// dynamic인 것을 static으로 만들기!
// export async function generateStaticParams() {
//   return [{ time: 'morning' }, { time: 'afternoon' }, { time: 'evening' }];
// }

export const generateStaticParams = async () => TIMES.map((time) => ({ time }));

export default function Hi({ params }: Props) {
  // params의 Promise가 벗겨진다. -> morning, afternoon, evening밖에 안된다.
  const { time } = use(params);
  return (
    <h1>
      Good <span className="capitalize">{time}</span>!
    </h1>
  );
}
