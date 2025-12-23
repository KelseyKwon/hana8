import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

export default function PhotosLayout({ children, modal }: Props) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
