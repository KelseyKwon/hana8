import type { PropsWithChildren, ReactNode } from 'react';

export default function PhotosLayout({
  children,
  viewer,
}: PropsWithChildren<{ viewer: ReactNode }>) {
  return (
    <>
      <h1 className="text-center text-xl">Photos</h1>
      {children}
      {viewer}
    </>
  );
}
