import { z } from 'zod'

export const authUseOTPSchema = z.object({
  otpId: z.string({ required_error: 'O ID do código OTP é obrigatório.' }),
  code: z
    .string({ required_error: 'O código é obrigatório.' })
    .length(6, { message: 'O código OTP deve ter 6 dígitos.' }),
})
