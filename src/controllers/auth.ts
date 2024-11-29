import type { RequestHandler } from 'express'
import { authSignInSchema } from '../schemas/auth-signin'
import { generateOTP } from '../services/otp'
import { getUserByEmail } from '../services/user'

export const signin: RequestHandler = async (req, res) => {
  // validar dados recebidos
  const data = authSignInSchema.safeParse(req.body)
  if (!data.success) {
    res.json({ error: data.error.message })
    return
  }

  // verificar se o usuário existe
  const user = await getUserByEmail(data.data.email)
  if (!user) {
    res.json({ error: 'Usuário não encontrado' })
    return
  }

  // gerar um código OTP para o usuário
  const otp = await generateOTP(user.id)

  // enviar um email com o código OTP para o usuário
  // devolver o ID do código OTP para o usuário
  res.json({ id: otp.id })
}
