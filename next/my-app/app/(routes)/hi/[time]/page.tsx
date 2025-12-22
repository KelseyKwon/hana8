import { use } from 'react';

type Props = {
  params: Promise<{ time: 'morning' | 'afternoon' | 'evening' }>;
};
export default function Hi({ params }: Props) {
  // params의 Promise가 벗겨진다. -> morning, afternoon, evening밖에 안된다.
  const { time } = use(params);
  return (
    <h1>
      Good <span className="capitalize">{time}</span>!
    </h1>
  );
}
