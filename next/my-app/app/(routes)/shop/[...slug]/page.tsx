import { use } from 'react';

type Props = {
  params: Promise<{ slug: number[] | string[] }>;
};

// nested dynamic router -> 빈 배열을 무조건 반환해야 한다!
export const generateStaticParams = async () => [{ slug: ['X'] }];

export default function Shop({ params }: Props) {
  const { slug } = use(params);

  return <>Slugs: {JSON.stringify(slug)}</>;
}
