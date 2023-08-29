import { z } from 'zod';

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(10, '至少10'),
    confirmPassword: z.string()
  })
  .refine((data) => (data.password = data.confirmPassword), {
    message: 'password 一致',
    path: ['confirmPassword']
  });
