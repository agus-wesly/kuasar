import { z } from 'zod'

const username = z
  .string({ required_error: 'Username cannot be empty' })
  .min(5, 'Username must be atleast 5 character !')
  .max(16, 'Username cannot be more than 16 character !')
const email = z
  .string({ required_error: 'Email cannot be empty' })
  .email('Must be valid email')
const password = z
  .string({ required_error: 'Password Cannot be empty' })
  .min(5, 'Password must be atleast 5 character !')
  .max(16, 'Password cannot be more than 16 character')

export const userRegisterSchema = z
  .object({
    username,
    email,
    password,
    confirmPassword: z.string({
      required_error: 'Confirm password cannot be empty',
    }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        path: ['confirmPassword'],
        code: 'custom',
        message: 'Password & confirm password must be match',
      })
    }
  })
