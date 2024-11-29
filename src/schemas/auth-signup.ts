import { z } from 'zod'

export const authSignUpSchema = z.object({
  name: z.string({ required_error: 'Campo nome é obrigatório' }),
  email: z
    .string({ required_error: 'Campo email é obrigatório' })
    .email({ message: 'Email inválido' }),
})
