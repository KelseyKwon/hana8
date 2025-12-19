// 사용법
// const [isAdding, toggle] = useToggle(false);

import { useState } from 'react';

// defVal = different Value = 초기값을 안주면 false!
// boolean 값을 받는다. 그리고 상태와 함수를 리턴
export const useToggle = (defVal = false) => {
  const [flag, setFlag] = useState(defVal);
  const toggle = () => setFlag((f) => !f);

  // 첫번쨰에는 상태, 2번째에는 토글할 수 있는 함수!
  return [flag, toggle] as const;
};
