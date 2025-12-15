import type { PropsWithChildren } from 'react';

type Prop = {
  onClick?: () => void; // click했을 때 어떤 함수를 호출?
  type?: 'reset' | 'submit';
  className: string;
};
export default function Button({
  onClick,
  type,
  className,
  children,
}: PropsWithChildren<Prop>) {
  // 반드시 jsx를 리턴해야 한다. 컴포넌트를 인식 = 컴포넌트는 hook(=state)를 가질 수 있는데, 이것은 fiber 노드 안에 있다. 이 hook안에 상태가 존재.
  return (
    <button
    type={type}
      className={`${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
