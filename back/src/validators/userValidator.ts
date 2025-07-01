import { z } from 'zod'

export const registerUserSchema = z.object({
  name: z
    .string({ required_error: 'Імʼя обовʼязкове' })
    .min(2, 'Імʼя має містити мінімум 2 символи'),

  email: z
    .string({ required_error: 'Email обовʼязковий' })
    .email('Невалідний email'),

  password: z
    .string({ required_error: 'Пароль обовʼязковий' })
    .min(8, 'Пароль має містити щонайменше 8 символів')
    .regex(/[A-Z]/, 'Пароль має містити велику літеру')
    .regex(/[a-z]/, 'Пароль має містити малу літеру')
    .regex(/[0-9]/, 'Пароль має містити цифру')
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Пароль має містити спецсимвол',
    ),

  role: z.enum(['user', 'coach'], {
    required_error: 'Роль обовʼязкова',
    invalid_type_error: 'Невірна роль',
  }),

  language: z.enum(['ua', 'en']).default('ua'),
})
