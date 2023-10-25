'use client';

import { Icons } from '@/components/icons';
import { PasswordInput } from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authSchema } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
// import { useSignIn } from '@clerk/nextjs';
import { signIn, SignInResponse } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

type Inputs = z.infer<typeof authSchema>;

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  // const error = searchParams.get('error') ? 'no cre' : '';
  //   const { isLoaded, signIn, setActive } = useSignIn();
  const [isPending, startTransition] = React.useTransition();
  const [error, setError] = React.useState<string>('');

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: Inputs) => {
    try {
      const res: SignInResponse | undefined = await signIn('credentials', {
        redirect: false,
        username: data.email,
        password: data.password,
        callbackUrl
      });
      console.log('res', res);
      if (!res?.error) {
        router.push('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (err: any) {
      console.log('err', err);
    }
    // if (!isLoaded) return;
    // try {
    //   const result = await signIn.create({
    //     identifier: data.email,
    //     password: data.password
    //   });
    //   if (result.status === 'complete') {
    //     await setActive({ session: result.createdSessionId });
    //     router.push(`${window.location.origin}/`);
    //   } else {
    //     /*Investigate why the login hasn't completed */
    //     console.log(result);
    //   }
    // } catch (err) {
    //   catchClerkError(err);
    // }
  };

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="rodneymullen180@gmail.com" autoComplete="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" autoComplete="current-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <h1>{error}</h1>
        <Button disabled={isPending}>
          {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
          Sign in
          <span className="sr-only">Sign in</span>
        </Button>
      </form>
    </Form>
  );
}
