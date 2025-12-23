'use client';
import { useRouter } from 'next/navigation';
import { type MouseEventHandler, useCallback, useEffect, useRef } from 'react';

export default function Modal({ children }: { children: React.ReactNode }) {
  // 3개의 영역이 있다.
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  // 클릭한 곳이 overlay or wrapper이면 (children 뺴고), dismiss!
  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        onDismiss();
      }
    },
    [onDismiss],
  );

  // esc 누르면 dismiss!
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    },
    [onDismiss],
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return (
    // 보이는 쪽 바깥족에 있는 것이 overlay -> 검은 배경
    // biome-ignore lint/a11y/useKeyWithClickEvents: click하면 닫기 위함
    // biome-ignore lint/a11y/noStaticElementInteractions: click하면 닫기 위함
    <div
      ref={overlay}
      className="fixed top-0 right-0 bottom-0 left-0 z-10 mx-auto bg-black/60 p-10"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 p-6 sm:w-10/12 md:w-8/12 lg:w-2/5"
      >
        <div className="bg-white">{children}</div>
      </div>
    </div>
  );
}
