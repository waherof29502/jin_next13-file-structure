'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input, type InputProps } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import * as React from 'react';

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className="relative">
      <Input type={showPassword ? 'text' : 'password'} className={cn('pr-10', className)} ref={ref} {...props} />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 px-3 py-1 h-full hover:bg-transparent"
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={props.value === '' || props.disabled}
      >
        {showPassword ? (
          <Icons.hide className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Icons.view className="h-4 w-4" aria-hidden="true" />
        )}
        <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
      </Button>
    </div>
  );
});
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
