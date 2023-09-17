'use client';

import { signUpSchema } from '@/lib/validations/auth';
import { TSignUpSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { PasswordInput } from '../password-input';

export default function FormWithReactHookFormAndZodAndServer() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema)
  });

  const onSubmit = async (data: TSignUpSchema) => {
    console.log('data', data);
    const result = await signIn('credentials', {
      username: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: '/'
    });
    // const response = await fetch('/api/signup', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     email: data.email,
    //     password: data.password,
    //     confirmPassword: data.confirmPassword
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });
    // const responseData = await response.json();
    // if (!response.ok) {
    //   // response status is not 2xx
    //   alert('Submitting form failed!');
    //   return;
    // }

    // if (responseData.errors) {
    //   const errors = responseData.errors;

    //   if (errors.email) {
    //     setError('email', {
    //       type: 'server',
    //       message: errors.email
    //     });
    //   } else if (errors.password) {
    //     setError('password', {
    //       type: 'server',
    //       message: errors.password
    //     });
    //   } else if (errors.confirmPassword) {
    //     setError('confirmPassword', {
    //       type: 'server',
    //       message: errors.confirmPassword
    //     });
    //   } else {
    //     alert('Something went wrong!');
    //   }
    // }

    //reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
      <input {...register('email')} type="email" placeholder="Email" className="px-4 py-2 rounded" />
      {errors.email && <p className="text-red-500">{`${errors.email.message}`}</p>}

      <input {...register('password')} type="password" placeholder="Password" className="px-4 py-2 rounded" />
      {errors.password && <p className="text-red-500">{`${errors.password.message}`}</p>}
      <PasswordInput {...register('confirmPassword')} placeholder="Confirm password" className="px-4 py-2 rounded" />
      {/* <input
        {...register('confirmPassword')}
        type="password"
        placeholder="Confirm password"
        className="px-4 py-2 rounded"
      /> */}
      {errors.confirmPassword && <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>}

      <button disabled={isSubmitting} type="submit" className="bg-blue-500 disabled:bg-gray-500 py-2 rounded">
        Submit
      </button>
    </form>
  );
}
