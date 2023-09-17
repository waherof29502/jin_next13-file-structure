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

export const authSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address'
  }),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters long'
    })
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
      message:
        'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character'
    })
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
