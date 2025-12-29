'use client';

import { useId, useReducer } from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

type Props = {
  type?: 'switch' | 'check';
  name?: string;
  label?: string;
  checked?: boolean;
  variant?: 'default' | 'destructive' | 'secondary' | 'muted';
  setCheckedAction?: (checked: boolean) => void;
};

const setClassnames = (variant: Props['variant'] | 'primary') => [
  `border-${variant}`,
  `bg-${variant}`,
  `text-${variant}-foreground`,
];
const CheckVariant = {
  default: setClassnames('primary'),
  destructive: [...setClassnames('destructive'), 'text-white'],
  secondary: setClassnames('secondary'),
  muted: setClassnames('muted'),
};

export default function CheckSwitch({
  type = 'check',
  name,
  label,
  checked,
  variant = 'default',
  setCheckedAction,
}: Props) {
  // unique한 아이디를 제공함
  const checkId = useId();
  const [isCheck, toggleCheck] = useReducer((p) => !p, !!checked);

  const css = CheckVariant[variant];
  console.log('*******', css);

  const Compo = type === 'switch' ? Switch : Checkbox;

  return (
    // flex를 컨트롤하는 것은 외부에서 하는 것이 더 유리하다
    <Label
      htmlFor={checkId}
      className="cursor-pointer text-secondary-foreground"
    >
      <Compo
        id={checkId}
        checked={isCheck}
        onClick={() => {
          // 아래 2줄은 동시에 실행되어야 함 -> 따라서 useState를 batch로 처리하는 flushSync를 줘도 됨!

          toggleCheck();
          if (setCheckedAction) setCheckedAction(!isCheck);
        }}
        // className="data-[state=checked]:border-secondary data-[state=checked]:bg-destructive data-[state=checked]:text-destructive-foreground data-[state=checked]:text-white"
        className={cn(css.map((cs) => `data-[state=checked]:${cs}`))}
      />
      {label}{' '}
      {!!name && (
        <input type="hidden" name={name} defaultValue={isCheck ? 'on' : ''} />
      )}{' '}
    </Label>
  );
}
