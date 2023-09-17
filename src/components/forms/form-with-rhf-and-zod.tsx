'use client';

import { signUpSchema } from '@/lib/validations/auth';
import { TSignUpSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function FormWithReactHookFormAndZod() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema)
  });

  const onSubmit = async (data: TSignUpSchema) => {
    //TODO: submit to server
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
      <input
        {...register('email', {
          required: 'Email is required'
        })}
        type="email"
        placeholder="Email"
        className="px-4 py-2 rounded"
      />
      {errors.email && <p className="text-red-500">{`${errors.email.message}`}</p>}
      <input
        {...register('password', {
          required: 'Password is 必須',
          minLength: {
            value: 10,
            message: 'Please enter 至少 10'
          }
        })}
        type="password"
        minLength={10}
        required
        placeholder="Password"
        className="px-4 py-2 rounded"
      />
      {errors.password && <p className="text-red-500">{`${errors.password.message}`}</p>}
      <input
        {...register('confirmPassword')}
        type="password"
        required
        placeholder="Confirm password"
        className="px-4 py-2 rounded"
      />
      {errors.confirmPassword && <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>}
      <button type="submit" disabled={isSubmitting} className="bg-blue-500 disabled:bg-gray-500 py-2 rounded">
        Submit
      </button>
    </form>
  );
}