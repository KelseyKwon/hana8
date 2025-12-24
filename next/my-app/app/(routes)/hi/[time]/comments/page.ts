import { use } from 'react';

// dynamic params -> generateStaticParams 필요
export const generateStaticParams = async () => [{ time: 'morningX' }];

export default function Comments({
  params,
}: {
  params: Promise<{ time: string }>;
}) {
  const { time } = use(params);
  return `Comments ${time}`;
}
