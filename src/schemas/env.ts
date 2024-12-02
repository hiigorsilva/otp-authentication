import { z } from 'zod'

// Validar variáveis de ambiente
const envSchema = z.object({
  PORT: z.string().optional(),
  DATABASE_URL: z.string({ required_error: 'DATABASE_URL não definido' }),
  JWT_SECRET: z.string({ required_error: 'JWT_SECRET não definido' }),
  MAILTRAP_TOKEN: z.string({ required_error: 'MAILTRAP_TOKEN não definido' }),
})

export const env = envSchema.parse(process.env)
