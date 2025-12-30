'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginEmail } from '@/lib/sign.action';

type Props = {
  redirectTo: string;
};

export default function name({ redirectTo }: Props) {
  return (
    <div className="grid place-items-center">
      <form action={loginEmail} className="w-96 space-y-3">
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="user@email.com"
            className="w-full"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="passwd">Password</Label>
          <Input
            id="passwd"
            name="passwd"
            type="password"
            placeholder="password..."
          />
        </div>
        <Button type="submit">LogIn</Button>
        <div className="flex justify-center gap-5">
          <Button type="reset" variant={'outline'}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
