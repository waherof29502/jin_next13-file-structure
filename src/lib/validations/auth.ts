import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3, { message: 'Your name should not be that short!' }).max(255),
  studentId: z
    .string()
    .min(7)
    .max(7)
    .refine((val) => !isNaN(val as unknown as number), {
      message: 'Student ID should be a number'
    }),
  year: z.string().min(2).max(10),
  password: z.string().min(6).max(100),
  confirmPassword: z.string().min(6).max(100)
});

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

export const authSchema = z.object({
  email: z.string(),
  password: z.string()
});
export const verfifyEmailSchema = z.object({
  code: z
    .string()
    .min(6, {
      message: 'Verification code must be 6 characters long'
    })
    .max(6)
});

export const checkEmailSchema = z.object({
  email: authSchema.shape.email
});

export const resetPasswordSchema = z
  .object({
    password: authSchema.shape.password,
    confirmPassword: authSchema.shape.password,
    code: verfifyEmailSchema.shape.code
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

export const userPrivateMetadataSchema = z.object({
  role: z.enum(['user', 'admin', 'super_admin']),
  stripePriceId: z.string().optional().nullable(),
  stripeSubscriptionId: z.string().optional().nullable(),
  stripeCustomerId: z.string().optional().nullable(),
  stripeCurrentPeriodEnd: z.string().optional().nullable()
});
