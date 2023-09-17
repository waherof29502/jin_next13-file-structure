'use client';

import { Icons } from '@/components/icons';
import { PasswordInput } from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { catchClerkError } from '@/lib/utils';
import { resetPasswordSchema } from '@/lib/validations/auth';
import { useSignIn } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';

type Inputs = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordStep2Form() {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
  const [isPending, startTransition] = React.useTransition();

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
      code: ''
    }
  });

  async function onSubmit(data: Inputs) {
    if (!isLoaded) return;
    try {
      const attemptFirstFactor = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code: data.code,
        password: data.password
      });

      if (attemptFirstFactor.status === 'needs_second_factor') {
        // TODO: implement 2FA (requires clerk pro plan)
      } else if (attemptFirstFactor.status === 'complete') {
        await setActive({
          session: attemptFirstFactor.createdSessionId
        });
        router.push(`${window.location.origin}/`);
        toast.success('Password reset successfully.');
      } else {
        console.error(attemptFirstFactor);
      }
    } catch (err) {
      catchClerkError(err);
    }
  }

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input
                  placeholder="code..."
                  {...field}
                  onChange={(e) => {
                    e.target.value = e.target.value.trim();
                    field.onChange(e);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button disabled={isPending}>
          {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
          Continue
          <span className="sr-only">Continue to reset password verification</span>
        </Button>
      </form>
    </Form>
  );
}
