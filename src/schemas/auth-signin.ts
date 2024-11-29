import { z } from 'zod'

export const authSignInSchema = z.object({
  email: z
    .string({ required_error: 'Campo email é obrigatório' })
    .email({ message: 'Email inválido' }),
})
