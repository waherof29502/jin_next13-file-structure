'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { emailSchema } from '@/lib/validations/email';

type Inputs = z.infer<typeof emailSchema>;

export function SubscribeToNewsletterForm() {
  const [isPending, startTransition] = React.useTransition();

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: ''
    }
  });

  function onSubmit(data: Inputs) {
    console.log(data);

    // startTransition();
  }

  return (
    <Form {...form}>
      <form className="grid w-full" onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel className="sr-only">Email</FormLabel>
              <FormControl>
                <Input placeholder="skate@gmail.com" className="pr-12" {...field} />
              </FormControl>
              <FormMessage />
              {/* <Button className="absolute right-[5.2px] top-[5.5px] z-20 h-7 w-7" size="icon" disabled={isPending}>
                 {isPending ? (
                  <Icons.spinner className="h-3 w-3 animate-spin" aria-hidden="true" />
                ) : (
                  <Icons.send className="h-3 w-3" aria-hidden="true" />
                )}
                <span className="sr-only">Join newsletter</span> 
              </Button>*/}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
