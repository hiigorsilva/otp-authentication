import { z } from 'zod'

export const authSignInSchema = z.object({
  email: z
    .string({ message: 'Campo email é obrigatório' })
    .email({ message: 'Email inválido' }),
})
