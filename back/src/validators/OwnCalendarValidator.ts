import { z } from 'zod'

export const OwnCalendarValidator = z.object({
  dates: z
    .array(
      z
        .string()
        .regex(
          /^\d{4}-\d{2}-\d{2}$/,
          'Invalid date format',
        ),
    )
    .min(1, 'At least one date is required'),
  type: z.string().min(2),
  title: z.string().min(2),
  description: z.string().optional(),
})
