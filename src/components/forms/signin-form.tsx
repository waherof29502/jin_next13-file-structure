'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { registerSchema } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type AuthInput = z.infer<typeof registerSchema>;

export default function SignInForm() {
  const { toast } = useToast();
  const [formStep, setFormStep] = React.useState(0);
  const form = useForm<AuthInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      confirmPassword: '',
      email: '',
      name: '',
      password: '',
      studentId: '',
      year: ''
    }
  });

  function onSubmit(data: AuthInput) {
    if (data.confirmPassword !== data.password) {
      toast({
        title: 'Passwords do not match',
        variant: 'destructive'
      });
      return;
    }
    alert(JSON.stringify(data, null, 4));
    console.log(data);
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Start the journey with us today.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="relative space-y-3 overflow-x-hidden">
            <motion.div
              className={cn('space-y-3', {
                // hidden: formStep == 1,
              })}
              // formStep == 0 -> translateX == 0
              // formStep == 1 -> translateX == '-100%'
              animate={{
                translateX: `-${formStep * 100}%`
              }}
              transition={{
                ease: 'easeInOut'
              }}
            >
              {/* name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name..." {...field} />
                    </FormControl>
                    <FormDescription>This is your public display name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* student id */}
              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your student id..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* year */}
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year of study</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[10, 11, 12, 13].map((year) => {
                          return (
                            <SelectItem value={year.toString()} key={year}>
                              Year {year}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            <motion.div
              className={cn('space-y-3 absolute top-0 left-0 right-0', {
                // hidden: formStep == 0,
              })}
              // formStep == 0 -> translateX == 100%
              // formStep == 1 -> translateX == 0
              animate={{
                translateX: `${100 - formStep * 100}%`
              }}
              style={{
                translateX: `${100 - formStep * 100}%`
              }}
              transition={{
                ease: 'easeInOut'
              }}
            >
              {/* password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your password..." {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* confirm password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input placeholder="Please confirm your password..." {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            <div className="flex gap-2">
              <Button
                type="submit"
                className={cn({
                  hidden: formStep == 0
                })}
              >
                Submit
              </Button>
              <Button
                type="button"
                variant={'ghost'}
                className={cn({
                  hidden: formStep == 1
                })}
                onClick={() => {
                  // validation
                  form.trigger(['email', 'name', 'year', 'studentId']);
                  const emailState = form.getFieldState('email');
                  const nameState = form.getFieldState('name');
                  const yearState = form.getFieldState('year');
                  const idState = form.getFieldState('studentId');

                  if (!emailState.isDirty || emailState.invalid) return;
                  if (!nameState.isDirty || nameState.invalid) return;
                  if (!yearState.isDirty || yearState.invalid) return;
                  if (!idState.isDirty || idState.invalid) return;

                  setFormStep(1);
                }}
              >
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                type="button"
                variant={'ghost'}
                onClick={() => {
                  setFormStep(0);
                }}
                className={cn({
                  hidden: formStep == 0
                })}
              >
                Go Back
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
