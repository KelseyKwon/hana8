'use client';

import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

type CheckSwitchProps = {
  privateChecked: boolean;
  onTogglePrivate: () => void;
};

export default function CheckSwitch({
  privateChecked,
  onTogglePrivate,
}: CheckSwitchProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Label htmlFor="isPrivate">
        <Checkbox
          id="isPrivate"
          name="isprivate"
          checked={privateChecked}
          onClick={onTogglePrivate}
        />
        비공개 글
      </Label>
      <Label htmlFor="isPublic">
        <Switch id="isPublic" name="ispublic" />
        홈에 공개
      </Label>
    </div>
  );
}
