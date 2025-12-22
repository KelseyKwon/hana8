// onCLick을 사용하는 SayHello을 사용하므로 -> client을 써야 함! (server 말고))
'use client';

import SayHello from './SayHello';

export const dynamic = 'auto';

export default function Hello() {
  return (
    <>
      <h1>Hello Page</h1>
      <SayHello name="Next" />
    </>
  );
}
